import React from "react";
import "../styles/style.css";
import "../styles/prism.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArmadaFormsProvider } from "../context/form-context";
import { useStaticQuery, graphql } from "gatsby";
import { SettingsAndSlugs } from "../models/settings-and-page-slugs.model";

const Layout: React.FC = ({ children }) => {
  // client test = https://drafbox-backend-dev.herokuapp.com/api/project/5ea1575f8c9344001f9a89ff/forms

  const data = useStaticQuery<SettingsAndSlugs>(graphql`
    query {
      ghostSettings {
        title
        navigation {
          label
          url
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return (
    <ArmadaFormsProvider client={process.env.GATSBY_FORM_URL}>
      <div>
        <Navbar navbarData={data} />
        <hr />
        {children}
        <Footer footerData={data} />
      </div>
    </ArmadaFormsProvider>
  );
};

export default Layout;
