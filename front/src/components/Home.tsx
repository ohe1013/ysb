import { useNavigate, Link } from "react-router-dom";
import React from "react";
import useLogout from "../hooks/useLogout";
const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const signOut = async () => {
        await logout();
        navigate("/linkpage");
    };

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Editor</Link>
            <br />
            <Link to="/admin">관리자페이지</Link>
            <br />
            <Link to="/lounge">라운지</Link>
            <br />
            <Link to="/linkpage">링크페이지</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    );
};

export default Home;
