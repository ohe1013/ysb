import React, { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import styled from "styled-components";
import { ErrorMessage, Form, Input, Label, ValidationInput, ValidationMessage } from "../../styles/form";
import { validateEmail, validateEmailAndPassword, validatePassword } from "../../utils/validate";
import useLogin from "../../hooks/auth/useLogin";
import { getErrorMessage } from "../../utils/getErrorMessage";

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
    const [check, toggleCheck] = useToggle("persist", false);

    const { mutate: loginMutate, isError: isErrorLogin, error: loginError } = useLogin();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateEmailAndPassword(email, pwd)) {
            loginMutate({ email, password: pwd });
        }
    };

    return (
        <LoginForm onSubmit={handleSubmit}>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-12 text-gray-900">로그인</h1>

            <div className="flex-wrap -m-2">
                <InputContainer>
                    <Label htmlFor="email">이메일</Label>
                    <ValidationInput
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        {...emailAttribute}
                        required
                        isValid={validateEmail(email)}
                    />
                </InputContainer>
                {!validateEmail(email) && <ValidationMessage>이메일 형식을 확인해주세요</ValidationMessage>}
                <InputContainer>
                    <Label htmlFor="password">비밀번호</Label>
                    <ValidationInput
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        isValid={validatePassword(pwd)}
                        required
                    />
                </InputContainer>
                {!validatePassword(pwd) && <ValidationMessage>패스워드 형식을 확인해주세요</ValidationMessage>}
                {isErrorLogin && <ErrorMessage>{getErrorMessage(loginError)}</ErrorMessage>}
                <ButtonContainer>
                    <button
                        className={
                            "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        }
                    >
                        로그인
                    </button>
                </ButtonContainer>
            </div>
            <div className="mt-2">
                <span>
                    <span>뭔가를 찾기 </span>
                    <span className="text-gray-300"> | </span>
                    <span className="inline-block font-bold hover:text-red-300">
                        <Link to="/register">회원가입</Link>
                    </span>
                </span>
            </div>
        </LoginForm>
    );
};
export default Login;

const LoginForm = styled(Form)`
    width: fit-content;
    padding: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContainer = styled.div`
    padding: 1rem 0;
`;

const ButtonContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;
