import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

export const authRoutes = [
	{
		path: '/sign-up',
		component: SignUp,
		exact: true
	},
	{
		path: '/sign-in',
		component: SignIn,
		exact: true
	},
];