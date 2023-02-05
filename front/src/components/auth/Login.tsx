import React, { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { authAxios } from "../../api/axios";

const LOGIN_URL = "user/login";
const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>();
    const errRef = useRef<HTMLParagraphElement>();

    const [email, resetEmail, emailAttribute] = useInput("email", "");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [check, toggleCheck] = useToggle("persist", false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg("");
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await authAxios.post(
                LOGIN_URL,
                { email: email, password: pwd },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            const roles = [1984, 2001, 5150];
            const accessToken = res?.data?.accessToken;
            setAuth({ email, pwd, roles, accessToken });
            localStorage.setItem("accessToken", accessToken);

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
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">로그인</h1>
                    </div>

                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="flex-wrap -m-2">
                                <div className="p-2 w-1/2 mx-auto my-0">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                            이메일
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            ref={userRef}
                                            autoComplete="off"
                                            {...emailAttribute}
                                            required
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        {/* <p
                    className={
                      emailFocus && email && !validEmail
                        ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                        : "hidden"
                    }
                  >
                    유효한 이메일 주소가 아닙니다!
                  </p> */}
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
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                                {/* <p
                className={
                  passwordFocus && password && !validPassword
                    ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                    : "hidden"
                }
              >
                비밀번호는 8자리 이상입니다!
              </p> */}
                                {errMsg !== "" ? (
                                    <div className="flex flex-col text-center w-full ">
                                        <p className="sm:text-l text-l font-medium title-font mb-4 text-red-500">
                                            {errMsg}
                                        </p>
                                    </div>
                                ) : null}
                                <div className="p-2 w-full">
                                    <button
                                        className={
                                            "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            //   : "flex mx-auto text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none rounded text-lg"
                                        }
                                    >
                                        로그인
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-2">
                            <span>
                                <span>뭔가를 찾기 </span>
                                <span className="text-gray-300"> | </span>
                                <span className="inline-block font-bold hover:text-red-300">
                                    <Link to="/register">회원가입</Link>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Login;
