import React, { FormEvent, useEffect, useRef, useState } from "react";
import useSignUp from "../../hooks/useSignUp";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ErrorMessage, Form, Input, Label, ValidationInput, ValidationMessage } from "../../styles/form";
import { validateEmail, validateMatchPassword, validatePassword } from "../../utils/validate";
import { getErrorMessage } from "../../utils/getErrorMessage";

const Register = () => {
    const userRef = useRef<HTMLInputElement>();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [pwd, setPwd] = useState("");

    const [matchPwd, setMatchPwd] = useState("");

    const { mutate: signUpMutate, isError: isErrorSignUp, error: signUpError } = useSignUp();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {}, [username, email, pwd, matchPwd]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signUpMutate({ email, password: pwd, username });
    };

    return (
        <>
            <SignUpForm onSubmit={handleSubmit}>
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-12 text-gray-900">회원가입</h1>

                <div className="flex-wrap -m-2">
                    <InputContainer>
                        <Label htmlFor="username">이름</Label>
                        <Input type="text" id="username" ref={userRef} autoComplete="off" required />
                    </InputContainer>
                    <InputContainer>
                        <Label htmlFor="email">이메일</Label>
                        <ValidationInput
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
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
                    <InputContainer>
                        <Label htmlFor="matchPwd">비밀번호 확인</Label>
                        <ValidationInput
                            type="password"
                            id="matchPwd"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            isValid={validateMatchPassword(pwd, matchPwd)}
                            required
                        />
                    </InputContainer>
                    {!validateMatchPassword(pwd, matchPwd) && (
                        <ValidationMessage>패스워드가 같은지 확인해주세요</ValidationMessage>
                    )}
                    {isErrorSignUp && <ErrorMessage>{getErrorMessage(signUpError)}</ErrorMessage>}
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
            </SignUpForm>
            <div className="mt-2">
                <span>
                    <span>이미 회원이시라면 </span>
                    <span className="inline-block font-bold hover:text-red-300">
                        <Link to="/login">로그인</Link>
                    </span>
                </span>
            </div>
        </>
    );
};

export default Register;
const SignUpForm = styled(Form)`
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
