import React from "react";

const AuthContext = React.createContext({
    currentUser: null,
    setCurrentUser: () => { }
    
});

export default AuthContext;