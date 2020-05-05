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
          <span className="block md:inline-block md:mb-0">
            {name} © {new Date().getFullYear()}
          </span>
        </div>
        <div className="w-full lg:w-4/5 mt-4 lg:mt-0 text-center lg:text-right">
          <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/"
          >
            Home
          </Link>
          <a
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            href="/sitemap.xml"
          >
            Sitemap
          </a>
          <a
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            href="/rss.xml"
          >
            RSS
          </a>
          <Link
            className="inline-block mx-4 mb-4 lg:mb-0 text-blue-900 hover:text-blue-700"
            to="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="py-4 flex justify-center">
        <a href="https://draftbox.co" target="_blank" rel="noopener noreferrer" className="text-blue-500 uppercase">Published with DraftBox</a>
      </div>
    </footer>
  );
};

export default Footer;
