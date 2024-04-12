import React, { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } =
    useContext(UserContext);

  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      // try {
      //   const res = await axios.get("http://localhost:3030/api/protected", {
      //     withCredentials: true,
      //   });
      //   setIsLoggedIn(true);
      //   setUserInfo(res.data);
      // } catch (error) {
      //   setIsLoggedIn(false);
      // }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const res = await axios.post("http://localhost:3030/api/logout", {
      //   withCredentials: true,
    });
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login");
    // Cookies.remove("token");
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="container mx-auto p-4 my-3">
      <div className="flex items-center justify-between">
        <div className="text-black text-2xl font-medium">
          <Link to="/">Gemini System</Link>
        </div>
        {/* Button */}
        <div className="md:hidden">
          <button onClick={handleToggle} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        {/* PC Screen */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/validate">Validate Science Plan</Link>
              </li>
              <li>
                <Link to="/install">Install New config</Link>
              </li>
              <li>
                <Link to="/submit">Submit Science Plan</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
        {/* Mobile Screen */}
      </div>
      <div>
        {isToggle && (
          <ul
            className={`mt-4 flex-col md:hidden space-y-4 transform transition-all duration-500 ${
              isToggle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <li>
              <a href="/">Home</a>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>ออกจากระบบ</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/validate">Validate Science Plan</Link>
                </li>
                <li>
                  <Link to="/install">Install New config</Link>
                </li>
                <li>
                  <Link to="/submit">Submit Science Plan</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
