import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = props => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const res = await axios.get("/auth", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setUser(res.data);
    };

    // we are calling the getUser function
    useEffect(() => {
        getUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push("/login");
    };

    //User can go visit Home page with a token, else login page
    if (!localStorage.getItem("token")) {
        props.history.push("/login");
    }

    return (
        <div>
            <p>Welcome {user && user.name}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home;