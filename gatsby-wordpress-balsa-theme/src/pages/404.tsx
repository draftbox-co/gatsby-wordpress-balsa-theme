import React from "react";
import { Link } from "gatsby";
import "../styles/style.css";

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center ">
      <div className="max-w-xl px-6 lg:px-12">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <div className="spacer mt-3"></div>
        <p className="text-gray-800 text-lg">
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <div className="spacer mt-3"></div>
        <Link
          className="text-primary hover:underline text-lg font-medium"
          to="/"
        >
          Back to our site →
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
