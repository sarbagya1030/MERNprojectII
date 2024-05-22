import React from "react";
import styles from "../styles/dashboard.module.css";
import Profile from "../components/Profile.js";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./productcard.js";
import sortinglist from "./line.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(token);
  //LOGOUT HANDLER FUNCTION
  function userLogout() {
    localStorage.removeItem("token");

    navigate("/");
  }

  if (token === null) {
    console.log("1");
    navigate("/startpage");
  }

  return (
    <div>
      <div className="h-64 dark:text-slate-200">
        <header className="container mx-auto flex w-full items-center justify-between py-4 px-6">
          <a href="#">
            <div class="w-full text-center text-lg font-extrabold sm:w-fit sm:text-left">
              <span class="text-violet-500">Trade</span>
              <span class="dark:text-slate-400">Accessory</span>
            </div>
          </a>
          <nav class="hidden bg-white text-base dark:bg-slate-900 sm:block">
            <ul class="flex items-center space-x-2">
              <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="/dashboard"
                >
                  Home
                </a>
              </li>

              <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="/view"
                >
                  My Products
                </a>
              </li>

              {/* profile */}
              <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="#"
                >
                  Profile
                </a>
                <ul class="invisible absolute z-30 space-y-2 rounded-lg border border-slate-50 bg-white p-4 opacity-0 shadow-xl transition-opacity delay-75 ease-in-out group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900 flex flex-col">
                  <li>
                    <Link
                      className="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      to="/profile"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={userLogout} className="text-purple-600">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}
