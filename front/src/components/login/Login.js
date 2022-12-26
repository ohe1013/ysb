import { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const LOGIN_URL = "user/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({ id: "qwe", password: "1q2w3e4r" }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(res?.data));
      const accessToken = res?.data[0];
      const roles = res?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });

      setEmail("");
      setPwd("");
      setSuccess(true);
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
      {success ? (
        <section>
          <h1>로그인 되었습니다.</h1>
          <br />
          <p>
            <a href="#">홈으로 돌아가기</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>YSB</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">password:</label>
            <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            <button>이메일 로그인</button>
          </form>
          <div>
            <span className="line">이메일</span>
            <span className="line">/</span>
            <span className="line">비밀번호 찾기</span>
            <span> | </span>
            <span>
              <a href="#">회원가입</a>
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
