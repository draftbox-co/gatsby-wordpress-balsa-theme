import React from "react";
import ContactForm from "../components/ContactForm";
import Layout from "./../components/Layout";
import ContactMeta from "../components/meta/contact-meta";
const Contact = ({ location }) => {
  return (
    <Layout>
      <ContactMeta location={location} />
      <ContactForm />
    </Layout>
  );
};

export default Contact;
