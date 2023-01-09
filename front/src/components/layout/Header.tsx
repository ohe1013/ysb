import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import classNames from "classnames";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { auth } = useContext(AuthContext);
  const logout = useLogout();

  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700">
                <span className="font-bold">Home</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/todos" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                Todos
              </Link>
            </div>
          </div>

          {auth.accessToken !== "null" ? (
            <button onClick={logout}>로그아웃</button>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              <Link to={"auth"} className="py-5 px-3">
                로그인
              </Link>
              <Link
                to="register"
                className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >
                회원가입
              </Link>
            </div>
          )}

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <Link to="todos" className="block py-2 px-4 text-sm hover:bg-gray-200">
          todos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
