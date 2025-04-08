import { createContext } from "react";

interface AuthContextType {
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	setIsAuth: () => { },
});