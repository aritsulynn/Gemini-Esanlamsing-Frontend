import { useState, useEffect, useContext } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // if (Cookies.get("isLoggedIn") !== "true") {
    //   navigate("/login");
    // }
    console.log(Cookies.get("isLoggedIn"));
    const fetchData = async () => {
      const res = await axios
        .get("http://localhost:3030/sp")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      if (Cookies.get("isLoggedIn") === "true") {
        setIsLoggedIn(true);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="container mx-auto p-4 my-3">
      <h1 className="text-2xl font-semibold">All Science Plans</h1>
      {isLoggedIn ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{item.starSystem}</h2>
              <p className="text-sm text-gray-500">PlanNO: {item.planNo}</p>
              <p className="text-sm text-gray-500">STATUS: {item.status}</p>
              <p className="text-sm text-gray-500">{item.telescopeLocation}</p>
              <p className="text-sm text-gray-500">{item.creator}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </div>
  );
}
