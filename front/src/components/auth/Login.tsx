import React, { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from './Auth.module.css'
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

const LOGIN_URL = "user/login";
const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLParagraphElement>();

    const [email, resetEmail, emailAttribute] = useInput('email','');
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post(LOGIN_URL, JSON.stringify({ user: email, pwd: pwd }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            const roles = [1984, 2001, 5150];
            const accessToken = res?.data?.accessToken;
            setAuth({ email, pwd, roles, accessToken });

            resetEmail("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("이메일 비밀번호를 확인해주세요");
            } else if (err.response?.status === 401) {
                setErrMsg("인증오류");
            } else {
                setErrMsg("로그인에 실패했습니다.");
            }
        }
    };

    return (
        <section className={styles.section}>
            <p ref={errRef} className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`} aria-live="assertive">
                {errMsg}
            </p>
            <h1>YSB</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    {...emailAttribute}
                    required
                />
                <label htmlFor="password">password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>이메일 로그인</button>
                <div className={styles.persistCheck}>
                    <input 
                        type="checkbox"  
                        id="togglePersist"
                        checked={check}
                        onChange={toggleCheck}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <div>
                <span className={styles.line}>이메일</span>
                <span className={styles.line}>/</span>
                <span className={styles.line}>비밀번호 찾기</span>
                <span> | </span>
                <span>
                    <Link to="/register">회원가입</Link>
                </span>
            </div>
        </section>
    );
};
export default Login;
