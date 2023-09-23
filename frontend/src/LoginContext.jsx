import {createContext} from "react";

const LoginContext = createContext({
	isLoggedIn: false,
	user: {}, // Userdata
	updateLogin: null // Callback function to update context
});

export default LoginContext;
