import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StartPage() {
  const token = localStorage.getItem("token");
  console.log(token);
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
                  href="/"
                >
                  Home
                </a>
              </li>

              {/* <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-900 no-underline transition hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
                  href="/contact"
                >
                  Contact
                </a>
              </li> */}

              <li class="group relative">
                <Link
                  className="flex justify-center  bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                  to="/username"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className="container mx-auto px-8 py-28 sm:px-12">
          <h1 className="sm:mb-18 mb-24 w-full text-center text-4xl font-extrabold dark:text-slate-50 sm:mx-auto sm:w-4/5">
            We offer a diverse range of options for
            <span className="text-violet-500"> trading and purchasing </span>
            all types of accessories.
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Link
              className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
              to="/username"
            >
              Create Post
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
