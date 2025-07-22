import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import bcrypt from 'bcryptjs'

interface UserObject {
  id: string
  metadata: {
    username: string
    email: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, password } = body

    if (!user || !password) {
      return NextResponse.json(
        { message: 'User data and password are required' },
        { status: 400 }
      )
    }

    // Basic validation
    if (!user.metadata.name || !user.metadata.username || !user.metadata.email) {
      return NextResponse.json(
        { message: 'Name, username, and email are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if username or email already exists
    try {
      const existingUser = await cosmic.objects
        .find({ type: 'users' })
        .props(['id', 'metadata'])

      const users = existingUser.objects as UserObject[]
      const existingUsername = users.find((u: UserObject) => u.metadata.username === user.metadata.username)
      const existingEmail = users.find((u: UserObject) => u.metadata.email === user.metadata.email)

      if (existingUsername) {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 409 }
        )
      }

      if (existingEmail) {
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 409 }
        )
      }
    } catch (error) {
      // If no users exist yet, that's fine, continue
      console.log('No existing users found, continuing with signup')
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Add hashed password to user metadata
    const userWithPassword = {
      ...user,
      metadata: {
        ...user.metadata,
        password_hash: hashedPassword
      }
    }

    // Create user in Cosmic CMS
    const response = await cosmic.objects.insertOne(userWithPassword)

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: response.object.id,
          name: response.object.metadata.name,
          username: response.object.metadata.username,
          email: response.object.metadata.email
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}