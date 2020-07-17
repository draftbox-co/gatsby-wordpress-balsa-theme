import React from "react";
import { Link } from "gatsby";
import "../styles/style.css";

const OfflinePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center ">
      <div className="max-w-xl px-6 lg:px-12">
        <h1 className="text-2xl font-bold">Offline :(</h1>
        <div className="spacer mt-3"></div>
        <p className="text-gray-800 text-lg">
          Looks like you lost your connection. Please check it and try again.
        </p>
        <div className="spacer mt-3"></div>
        <Link
          className="text-primary hover:underline text-lg font-medium"
          to="/"
        >
          Try again →
        </Link>
      </div>
    </div>
  );
};

export default OfflinePage;
