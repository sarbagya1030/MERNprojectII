import React from "react";
import styles from "../styles/dashboard.module.css";
import Profile from "../components/Profile.js";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div className="h-64 dark:text-slate-200">
        <header class="container mx-auto flex w-full items-center justify-between py-4 px-6">
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

              <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li class="group relative">
                <a
                  class="block whitespace-nowrap px-2 py-2 text-sm text-slate-900 no-underline transition hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
                  href="/contact"
                >
                  Contact
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
                    <a
                      class="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      href="#"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <nav class="fixed -right-2/3 top-0 z-20 h-full w-2/3 transform overflow-y-auto bg-white py-4 text-base transition dark:bg-slate-900 sm:hidden">
            <ul class="flex flex-col space-y-2">
              <li class="text-right">
                <button class="px-6 py-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    width="1.2em"
                    height="1.2em"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14m-4 4l4-4m-4-4l4 4"
                    ></path>
                  </svg>
                </button>
              </li>
              <li class="group relative w-full overflow-x-visible text-right">
                <a
                  class="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li class="group relative w-full overflow-x-visible text-right">
                <a
                  class="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="#"
                >
                  Solutions
                </a>
                <ul class="h-0 space-y-2 overflow-y-hidden bg-slate-50 px-4 py-0 transition-all delay-75 ease-in-out group-hover:h-full group-hover:py-4 dark:bg-slate-800">
                  <li>
                    <a
                      class="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      href="#"
                    >
                      Business Line of Credit
                    </a>
                  </li>
                  <li>
                    <a
                      class="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      href="#"
                    >
                      SBA Loan
                    </a>
                  </li>
                  <li>
                    <a
                      class="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      href="#"
                    >
                      Revenue Based Financing
                    </a>
                  </li>
                  <li>
                    <a
                      class="undefined block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                      href="#"
                    >
                      Invoice Factoring
                    </a>
                  </li>
                </ul>
              </li>
              <li class="group relative w-full overflow-x-visible text-right">
                <a
                  class="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-400 no-underline transition hover:text-slate-900 dark:hover:text-slate-50"
                  href="/about"
                >
                  About
                </a>
              </li>
              <li class="group relative w-full overflow-x-visible text-right">
                <a
                  class="mx-4 block whitespace-nowrap px-2 py-2 text-sm text-slate-900 no-underline transition hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
                  href="/contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="products">
        <section class="container mx-auto px-8 py-28 sm:px-12">
          <h1 class="sm:mb-18 mb-24 w-full text-center text-4xl font-extrabold dark:text-slate-50 sm:mx-auto sm:w-4/5">
            We offer a diverse range of options for
            <span class="text-violet-500"> trading and purchasing </span>
            all types of accessories.
          </h1>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div class="flex cursor-pointer flex-col items-center justify-start rounded-lg bg-white py-5 px-6 text-center text-slate-800 shadow-lg shadow-slate-200 transition dark:bg-slate-700 dark:text-slate-200 dark:shadow-slate-700">
              <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
                class="h-8 w-8"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"
                ></path>
              </svg>
              <div class="mt-3 text-sm font-semibold">
                Business Line of Credit
              </div>
            </div>
            <div class="flex cursor-pointer flex-col items-center justify-start rounded-lg bg-slate-50 py-5 px-6 text-center text-slate-800 shadow-slate-200 transition hover:bg-white hover:shadow-lg hover:shadow-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:shadow-slate-700 dark:hover:shadow-slate-800">
              <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
                class="h-8 w-8"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 21h18M3 10h18M5 6l7-3l7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"
                ></path>
              </svg>
              <div class="mt-3 text-sm font-semibold">SBA Loan</div>
            </div>
            <div class="flex cursor-pointer flex-col items-center justify-start rounded-lg bg-slate-50 py-5 px-6 text-center text-slate-800 shadow-slate-200 transition hover:bg-white hover:shadow-lg hover:shadow-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:shadow-slate-700 dark:hover:shadow-slate-800">
              <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
                class="h-8 w-8"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                  <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm5 6h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10m2 0v1m0-8v1"></path>
                </g>
              </svg>
              <div class="mt-3 text-sm font-semibold">
                Revenue Based Financing
              </div>
            </div>
            <div class="flex cursor-pointer flex-col items-center justify-start rounded-lg bg-slate-50 py-5 px-6 text-center text-slate-800 shadow-slate-200 transition hover:bg-white hover:shadow-lg hover:shadow-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:shadow-slate-700 dark:hover:shadow-slate-800">
              <svg
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                width="1.2em"
                height="1.2em"
                class="h-8 w-8"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 7h1m-1 6h6m-2 4h2"></path>
                </g>
              </svg>
              <div class="mt-3 text-sm font-semibold">Invoice Factoring</div>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-1 items-center gap-4 rounded-lg bg-violet-500 py-12 px-14 md:grid-cols-2">
            <div class="text-center md:text-left">
              <div class="text-4xl font-extrabold text-white">
                TradeAccessory
              </div>
              <div class="mt-2 text-sm text-violet-100">
                Pay interest only on what you use
              </div>
              <ul class="mt-6 mb-8 text-sm text-violet-100 md:mb-0">
                <li class="flex items-center justify-center md:justify-start">
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    width="1.2em"
                    height="1.2em"
                    class="mr-3"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m5 12l5 5L20 7"
                    ></path>
                  </svg>
                  High credit limit
                </li>

                <li class="flex items-center justify-center md:justify-start">
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    width="1.2em"
                    height="1.2em"
                    class="mr-3"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m5 12l5 5L20 7"
                    ></path>
                  </svg>
                  Fast disbursement, anytime
                </li>
              </ul>
            </div>
            <form class="flex flex-col md:ml-8">
              <input
                class="mb-4 rounded-md px-4 py-3 font-light"
                min="0"
                placeholder="How much do you need?"
                type="number"
              />
              <button
                class="flex items-center justify-center rounded-md bg-violet-900 px-4 py-3 font-semibold text-white shadow-md shadow-violet-700 transition hover:bg-slate-900"
                type="submit"
              >
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  width="1.2em"
                  height="1.2em"
                  class="mr-2"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                  ></path>
                </svg>
                Find the best limit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
