import React from "react";
import { SettingsAndSlugs } from "../models/settings-and-page-slugs.model";
import { Link } from "gatsby";
import rssLogo from "../images/rss.svg";

type FooterProps = {
  footerData: SettingsAndSlugs;
};

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  const {
    wordpressSiteMetadata: { name },
  } = footerData;
  return (
    <footer className="bg-gray-100">
      <div className="flex flex-wrap items-center py-4 px-4 border-b container mx-auto">
        <div className="w-full lg:w-1/5 text-center lg:text-left">
          <a className="text-xl text-indigo-500 font-semibold" href="#">
            {name}
          </a>
        </div>
        <div className="w-full lg:w-4/5 mt-4 lg:mt-0 text-center lg:text-right">
          <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/contact"
          >
            Contact Us
          </Link>
          {/* <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/tags"
          >
            Tags
          </Link>
          <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/authors"
          >
            Authors
          </Link>
          <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/contact"
          >
            Contact Us
          </Link> */}
          {/* {navigation.map(({ label, url }, i) => {
            return url.startsWith("/") || url.startsWith(siteUrl) ? (
              <Link
                key={i}
                className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
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
                className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
              >
                {label}
              </a>
            );
          })} */}
        </div>
      </div>
      <div className="py-4 flex justify-center">
        <span className="block md:inline-block md:mb-0">
          © {new Date().getFullYear()} {name}
        </span>
        <span className="mx-2">&bull;</span>
        <a href="/rss" className="flex items-center">
          RSS <img className="ml-2 h-3" src={rssLogo} alt="" />{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
