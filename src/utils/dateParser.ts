/**
 * Parse various date formats and return a valid Date object
 * Supports formats like:
 * - "25 April 2025"
 * - "1 May 2026"
 * - "2025-04-25"
 * - "04/25/2025"
 * - "April 25, 2025"
 */

export function parseTargetDate(dateString: string): Date {
  if (!dateString || typeof dateString !== 'string') {
    throw new Error('Invalid date string provided');
  }

  // Clean the input string
  const cleanDateString = dateString.trim();
  
  // Try different parsing strategies
  let parsedDate: Date | null = null;
  
  // Strategy 1: Try parsing as ISO date (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDateString)) {
    parsedDate = new Date(cleanDateString);
  }
  
  // Strategy 2: Try parsing as MM/DD/YYYY or DD/MM/YYYY
  else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanDateString)) {
    const parts = cleanDateString.split('/');
    // Assume MM/DD/YYYY format
    parsedDate = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
  }
  
  // Strategy 3: Try parsing natural language dates like "25 April 2025" or "1 May 2026"
  else {
    // Create a mapping of month names
    const monthMap: { [key: string]: number } = {
      'january': 0, 'jan': 0,
      'february': 1, 'feb': 1,
      'march': 2, 'mar': 2,
      'april': 3, 'apr': 3,
      'may': 4,
      'june': 5, 'jun': 5,
      'july': 6, 'jul': 6,
      'august': 7, 'aug': 7,
      'september': 8, 'sep': 8, 'sept': 8,
      'october': 9, 'oct': 9,
      'november': 10, 'nov': 10,
      'december': 11, 'dec': 11
    };
    
    // Try to match patterns like "25 April 2025" or "1 May 2026"
    const naturalDateRegex = /^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/i;
    const match = cleanDateString.match(naturalDateRegex);
    
    if (match) {
      const day = parseInt(match[1]);
      const monthName = match[2].toLowerCase();
      const year = parseInt(match[3]);
      
      if (monthMap[monthName] !== undefined) {
        parsedDate = new Date(year, monthMap[monthName], day);
      }
    }
    
    // Try parsing with Date constructor as fallback
    if (!parsedDate) {
      parsedDate = new Date(cleanDateString);
    }
  }
  
  // Validate the parsed date
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    throw new Error(`Unable to parse date: ${dateString}`);
  }
  
  // Check if the date is in the future
  const now = new Date();
  if (parsedDate <= now) {
  }
  
  return parsedDate;
}

/**
 * Format a date for display in a user-friendly format
 */
export function formatTargetDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * Calculate time remaining until target date
 */
export function calculateTimeRemaining(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  
  if (difference <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      isExpired: true
    };
  }
  
  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10); // Convert to centiseconds
  
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    isExpired: false
  };
}
