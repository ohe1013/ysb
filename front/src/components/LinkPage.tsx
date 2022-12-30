import { Link } from "react-router-dom";
import React from "react";
const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">홈</Link>
            <Link to="/editor">edit</Link>
            <Link to="/admin">관리자페이지</Link>
        </section>
    );
};

export default LinkPage;
