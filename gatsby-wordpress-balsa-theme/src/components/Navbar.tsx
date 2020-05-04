import React, { useState } from "react";
import classNames from "classnames";
import { Link, graphql, useStaticQuery } from "gatsby";
import { SettingsAndSlugs } from "../models/settings-and-page-slugs.model";

type NavbarProps = {
  navbarData: SettingsAndSlugs;
};

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const {
    wordpressSiteMetadata: { name },
  } = navbarData;

  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 container mx-auto">
      <div className="flex flex-shrink-0 mr-6">
        <Link
          className="text-2xl text-blue-700 font-semibold font-serif"
          to="/"
        >
          {name}
        </Link>
      </div>
      <div className="block lg:hidden">
        {" "}
        <button
          onClick={(e) => setIsMenuToggled(!isMenuToggled)}
          className="navbar-burger flex items-center py-2 px-3 text-blue-700 rounded border border-blue-700"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>{" "}
      </div>
      <div
        className={classNames(
          "navbar-menu lg:flex lg:flex-grow lg:items-center lg:justify-end w-full lg:w-auto",
          { hidden: !isMenuToggled }
        )}
      >
        <div>
          <Link
            className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
            to="/contact"
          >
            Contact Us
          </Link>
          {/* <Link
            className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
            to="/tags"
          >
            Tags
          </Link>

          <Link
            className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
            to="/authors"
          >
            Authors
          </Link>
          <Link
            className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
            to="/contact"
          >
            Contact Us
          </Link> */}
          {/* {navigation.map(({ label, url }, i) => {
            return url.startsWith("/") || url.startsWith(siteUrl) ? (
              <Link
                key={i}
                className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
                to={`${
                  url.startsWith("/")
                    ? "/" + url
                    : "/" + url.slice(siteUrl.length, url.length)
                }`}
              >
                {label}
              </Link>
            ) : (
              <a
                href={url}
                target="_blank"
                className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-blue-900 hover:text-blue-700"
              >
                {label}
              </a>
            );
          })} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
