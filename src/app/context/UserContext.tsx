"use client"
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  token: string;
  image?: string;
  attractions_want: Attraction[] ;
  attractions_gone: Attraction[];
}

interface UserAuth {
  token: string;
  user: User;
}

export interface Attraction {
  id: string;
  name: string;
  area: string;
  image: string;
  rating?: number | null;
  times?: number | null
}

interface UserContextProps {
  user: UserAuth | null;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
  fetchUser: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: UserContextProps = {
  user: null,
  setUser: () => {},
  fetchUser: async () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

export const UserDataContext = createContext<UserContextProps>(initialState);

export const useAuth = () => {
  const context = useContext(UserDataContext);
  console.log('useAuth context:', context); 
  if (!context) {
    throw new Error('useAuth must be used within an EventsProvider');
  }
  return context;
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const token = user?.token;

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      if (!token) {
        return;
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,        
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Invalid authentication credentials");
      }
  
      const fetchedUser = await response.json();
      console.log("FETCHED USER", fetchedUser)
  
      setUser((prevUserData) => ({
        ...prevUserData,
        token: prevUserData?.token || "",
        user: fetchedUser,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  

  const router = useRouter();


  const register = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, image: "/black.png",  }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      setUser({ token: data.access_token, user: data });
      router.push('/login');

    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      setUser({ token: data.access_token, user: { ...data, id: data._id } });
      router.push('/dashboard');

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const sharedState = {
    user,
    setUser,
    fetchUser,
    register,
    login,
    logout
  };

  return (
    <UserDataContext.Provider value={sharedState}>
      {children}
    </UserDataContext.Provider>
  );
};
