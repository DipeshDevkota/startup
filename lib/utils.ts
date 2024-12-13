import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string) {
  let parsedDate: Date;

  if (date.toLowerCase() === 'yesterday') {
    parsedDate = new Date();
    parsedDate.setDate(parsedDate.getDate() - 1);  // Subtract one day
  } else if (date.toLowerCase() === 'tomorrow') {
    parsedDate = new Date();
    parsedDate.setDate(parsedDate.getDate() + 1);  // Add one day
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getTime())) {
    return 'Invalid Date'; // Return fallback string for invalid date
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
