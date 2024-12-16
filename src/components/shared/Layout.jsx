import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function Layout({ setIsLoggedIn }) {
  return (
    <div className="flex flex-row justify-between bg-customDark2 h-screen w-screen">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1 h-full">{<Outlet />}</div>
    </div>
  );
}
