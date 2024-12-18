import React, { useContext, useState } from "react";
import logoImage from "../assets/img/Logo.jpg";
import axios from "axios";
import { Context } from "./shared/Context";

function Login() {
  const [errorVisible, setErrorVisible] = useState(false);
  const { setIsLoggedIn, setIsAdmin } = useContext(Context);
  async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await axios.get("https://localhost:7215/account/check", {
        params: data,
      });
      console.log(res);
      if (res.status === 200) {
        setIsLoggedIn(true);
        setIsAdmin(res.data.isAdmin);
        setErrorVisible(false); // Ensure error is not visible on success
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("isAdmin", res.data.isAdmin);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorVisible(true);
      } else {
        // Handle other errors if necessary
        console.error("An error occurred:", error);
      }
    }
  }
  return (
    <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-400 to-orange-600 h-full w-full flex justify-center items-center">
      <div className="relative w-[500px] h-3/5 bg-white rounded-3xl flex flex-col justify-center items-center">
        <img
          src={logoImage}
          alt="logo"
          className="w-44 aspect-square rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black"
        />
        <div className="text-4xl font-bold w-full h-1/2 flex justify-center items-center">
          Login
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col gap-3 items-center h-1/2"
        >
          <input
            type="text"
            name="username"
            id=""
            placeholder="Username"
            className="border-2 border-gray-500 outline-none w-4/5 h-10 pl-5 rounded-xl"
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            className="border-2 border-gray-500 outline-none w-4/5 h-10 pl-5 rounded-xl"
          />
          <button
            type="submit"
            className="w-4/5 h-10 bg-gradient-to-b hover:bg-gradient-to-t from-amber-400 to-amber-600 rounded-xl text-white font-bold"
            b
          >
            Log in
          </button>
          {errorVisible && (
            <div className="w-4/5 h-10 flex justify-center items-center italic text-red-500 font-bold">
              Username or password is incorrect
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
