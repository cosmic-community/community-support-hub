import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, isValid, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined, formatStr: string = "MMM yyyy"): string {
  if (!date) return "Unknown"
  
  let dateObj: Date
  
  if (typeof date === 'string') {
    // Try to parse ISO string first
    dateObj = parseISO(date)
    
    // If that fails, try new Date()
    if (!isValid(dateObj)) {
      dateObj = new Date(date)
    }
  } else {
    dateObj = date
  }
  
  // Final validation
  if (!isValid(dateObj)) {
    return "Invalid date"
  }
  
  return format(dateObj, formatStr)
}

export function formatTimeAgo(date: string | Date | null | undefined): string {
  if (!date) return "Unknown time"
  
  let dateObj: Date
  
  if (typeof date === 'string') {
    // Try to parse ISO string first
    dateObj = parseISO(date)
    
    // If that fails, try new Date()
    if (!isValid(dateObj)) {
      dateObj = new Date(date)
    }
  } else {
    dateObj = date
  }
  
  // Final validation
  if (!isValid(dateObj)) {
    return "Invalid date"
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true })
}