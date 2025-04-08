import { createContext } from "react";
import { User } from '../types';

interface AuthContextType {
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({
	isAuth: false,
	setIsAuth: () => { },
	user: null,
	setUser: () => { },
});