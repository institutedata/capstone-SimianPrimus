import { createContext, useContext, useState, ReactNode } from "react";

// Define a type for the user data
export interface UserData {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

// Define the context type
export interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// Create the context with default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};

// UserContextProvider props
interface UserContextProviderProps {
  children: ReactNode;
}

// UserContextProvider component to provide the context
export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  // Check if user data is available in local storage
  const initialUserData: UserData | null = JSON.parse(
    localStorage.getItem("userData") || "null"
  );
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  // Update user data and save it to local storage
  const updateUserAndStorage = (newUserData: UserData | null): void => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData: updateUserAndStorage as React.Dispatch<
          React.SetStateAction<UserData | null>
        >,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
