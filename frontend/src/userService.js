import { useState, useEffect } from 'react';


// userService.js - Create this as a separate utility file
export async function fetchUserData() {
  try {
    const response = await fetch('http://localhost:3000/api/api/auth/me', {
      credentials: 'include'
    });

    if (response && response.status === 200) {
      const userData = await response.json();
      return { success: true, data: userData };
    } else {
      console.log("Failed to get user:", response.status);
      return { success: false, error: `Status: ${response.status}` };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message };
  }
}

// Hook for user data - Create this in a hooks folder (e.g., useUser.js)

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      const result = await fetchUserData();

      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return { user, loading, error,setError };
}