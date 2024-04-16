import React from "react";
import { Link } from "react-router-dom";

export default function SortingList() {
  return (
    <div>
      <section className="container mx-auto px-8 py-28 sm:px-12">
        <h1 className="sm:mb-18 mb-24 w-full text-center text-4xl font-extrabold dark:text-slate-50 sm:mx-auto sm:w-4/5">
          We offer a diverse range of options for
          <span className="text-violet-500"> trading and purchasing </span>
          all types of accessories.
        </h1>
        <div className="flex justify-center items-center gap-4">
          <Link
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
            to="/post"
          >
            Create Post
          </Link>
        </div>
      </section>
    </div>
  );
}
