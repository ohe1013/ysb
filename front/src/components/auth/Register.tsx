import React, { FormEvent, useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import styles from './Auth.module.css'

const EMAIL_REGEX =
    /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = "/user/signup";

const Register = () => {
    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLParagraphElement>();

    const [username, setUsername] = useState("");
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [username, email, pwd, matchPwd]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(
                "/user/login",
                JSON.stringify({ id: "gosu", password: "1q2w3e4r" }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response?.data);
            console.log(response?.data?.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            setUsername("");
            setEmail("");
            setPwd("");
            setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section className={styles.section}>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className={styles.section}>
                    <p
                        ref={errRef}
                        className={errMsg ? styles.errMsg : styles.offscreen }
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Register</h1>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="username">이름:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p
                            id="uidnote"
                            className={usernameFocus && username ? styles.instructions : styles.offscreen}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            실명을 입력해주세요.
                        </p>
                        <label htmlFor="email">
                            이메일:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validEmail ? styles.valid : styles.hide}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={validEmail || !email ? styles.hide : styles.invalid}
                            />
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p
                            id="emailnote"
                            className={
                                emailFocus && email && !validEmail ? styles.instructions : styles.offscreen
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            올바른 이메일 주소를 입력해주세요.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPwd ? styles.valid : styles.hide}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={validPwd || !pwd ? styles.hide : styles.invalid}
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p
                            id="pwdnote"
                            className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            비밀번호 형식이 잘못되었습니다. 영문+숫자 조합 8자리 이상 입력해주세요.
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validMatch && matchPwd ? styles.valid : styles.hide}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={validMatch || !matchPwd ? styles.hide : styles.invalid}
                            />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p
                            id="confirmnote"
                            className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            비밀번호가 일치하지 않습니다.
                        </p>

                        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>
                            Sign Up
                        </button>
                    </form>
                    <span>
                        이미 회원이신가요?
                        <span className={styles.line}>
                            {/*put router link here*/}
                            <Link to='/login'>로그인</Link>
                        </span>
                    </span>
                </section>
            )}
        </>
    );
};

export default Register;
