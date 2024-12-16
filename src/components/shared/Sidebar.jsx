import React from "react";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/consts/navigation";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import logoImage from "../../assets/img/Logo.jpg";

const linkClass =
  "flex m-auto items-center gap-2 font-light w-fit p-4 hover:text-white hover:no-underline active:bg-customPrimary rounded text-base transition-all duration-500";

export default function Sidebar({ setIsLoggedIn }) {
  return (
    <div className="flex flex-col bg-customDark1 w-1/12 py-3 text-white">
      <div className="flex justify-center items-center">
        <div
          className="rounded-full bg-cover bg-center"
          style={{
            width: "48px",
            height: "48px",
            backgroundImage: `url(${logoImage})`,
          }}
        ></div>
      </div>
      <div className="my-8 flex flex-1 flex-col items-center gap-y-2 scrollbar-none overflow-y-scroll">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={() => setIsLoggedIn(false)}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();
  const isActive = pathname === link.path;

  return (
    <div
      className={classNames(
        "relative group overflow-hidden w-full py-4",
        isActive && "active" // Thêm class "active" nếu link hiện tại trùng với pathname
      )}
    >
      <span
        class={classNames(
          "absolute bottom-0 right-0 w-full h-full transition-all duration-500 ease-in-out delay-200 bg-customDark2 rounded-s-md",
          isActive ? "translate-x-[12px]" : "translate-x-full"
        )}
      ></span>
      <span class="relative w-full gap-x-2 justify-center text-white">
        <Link
          to={link.path}
          className={classNames(
            pathname === link.path
              ? "bg-customPrimary text-white hover:bg-customPrimary drop-shadow-[0_2px_8px_rgba(234,124,105,0.32)]"
              : "text-customPrimary hover:bg-slate-800",
            linkClass
          )}
        >
          <span className="text-2xl">{link.icon}</span>
        </Link>
      </span>
    </div>
  );
}
