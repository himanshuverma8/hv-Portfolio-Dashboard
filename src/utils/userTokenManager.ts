// Utility functions for managing user tokens in localStorage and cookies

export const generateUserId = (): string => {
  return crypto.randomUUID();
};

export const setUserToken = (userId: string): void => {
  // Save to localStorage
  localStorage.setItem("userId", userId);
  
  // Also set a cookie (backup) - 1 year expiry
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `userId=${userId}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`;
};

export const getUserToken = (): string | null => {
  // First try localStorage
  const localToken = localStorage.getItem("userId");
  if (localToken) {
    return localToken;
  }
  
  // Fallback to cookie
  const cookieToken = getCookieValue("userId");
  if (cookieToken) {
    // Restore to localStorage for future use
    localStorage.setItem("userId", cookieToken);
    return cookieToken;
  }
  
  return null;
};

export const clearUserToken = (): void => {
  localStorage.removeItem("userId");
  document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};
