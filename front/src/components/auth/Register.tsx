import React, { FormEvent, useEffect, useRef, useState } from "react";
import axios, { axiosPrivate } from "../../service/config/axios";
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
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
            await axios.post(
                "/users/create",
                { email: email, password: pwd },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
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
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <>
                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-col text-center w-full mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                    회원가입
                                </h1>
                            </div>

                            <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                <form onSubmit={handleSubmit}>
                                    <div className=" -m-2">
                                        <div className="p-2 w-1/2 mx-auto my-0">
                                            <div className="relative">
                                                <label htmlFor="username" className="leading-7 text-sm text-gray-600">
                                                    이름
                                                </label>
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
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                />
                                                <p
                                                    className={
                                                        emailFocus && email && !validEmail
                                                            ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                                                            : "hidden"
                                                    }
                                                >
                                                    유효한 이메일 주소가 아닙니다!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2 mx-auto my-0">
                                            <div className="relative">
                                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                                    이메일
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
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                />
                                                <p
                                                    className={
                                                        emailFocus && email && !validEmail
                                                            ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                                                            : "hidden"
                                                    }
                                                >
                                                    유효한 이메일 주소가 아닙니다!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2 mx-auto my-0">
                                            <div className="relative">
                                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                                                    비밀번호
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
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                />
                                                <p
                                                    className={
                                                        pwdFocus && pwd && !validPwd
                                                            ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                                                            : "hidden"
                                                    }
                                                >
                                                    비밀번호는 8자리 이상입니다!
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2 mx-auto my-0">
                                            <div className="relative">
                                                <label
                                                    htmlFor="matchPassword"
                                                    className="leading-7 text-sm text-gray-600"
                                                >
                                                    비밀번호 확인
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
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                />
                                                <p
                                                    className={
                                                        matchFocus && matchPwd && !validMatch
                                                            ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                                                            : "hidden"
                                                    }
                                                >
                                                    비밀번호가 다릅니다
                                                </p>
                                            </div>
                                        </div>
                                        {errMsg !== "" ? (
                                            <div className="flex flex-col text-center w-full mb-12">
                                                <p className="sm:text-l text-l font-medium title-font mb-4 text-red-500">
                                                    {errMsg}
                                                </p>
                                            </div>
                                        ) : null}
                                        <div className="p-2 w-full">
                                            <button
                                                disabled={validEmail && validPwd && validMatch ? false : true}
                                                className={
                                                    validEmail && validPwd && validMatch
                                                        ? "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                        : "flex mx-auto text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none rounded text-lg"
                                                }
                                            >
                                                이메일로 회원가입
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-2">
                                    <span>
                                        <span>이미 회원이시라면 </span>
                                        <span className="inline-block font-bold hover:text-red-300">
                                            <Link to="/login">로그인</Link>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Register;
