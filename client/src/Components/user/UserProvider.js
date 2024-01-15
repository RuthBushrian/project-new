import { useState, useEffect } from "react";
import { Get } from "../../Hooks/fetchWithHook";
import UserContext from './UserContext';

const UserProvider = ({ children, userId }) => {
    const [user, setUser] = useState({});
    const { data, refetch } = Get(`officer/${userId}`);
    
    useEffect(() => {
        if (userId) {
            refetch()
        }
    }, [userId]);

    useEffect(() => {
        if (data) {
            setUser(data)
            localStorage.setItem("user", JSON.stringify(data))
        }
    }, [data])

    return (
        <UserContext.Provider value={{ user, refetch }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;