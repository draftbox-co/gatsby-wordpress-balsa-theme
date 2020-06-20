import React, { useState } from "react";
import CtaBig from "./CtaBig";
import { useForm } from "../hook/useForm";
import checkMark from "../images/check.svg";
import { useStaticQuery, graphql } from "gatsby";

const ContactForm = () => {
  const {
    wpSiteMetaData: { name },
    site: {siteMetadata: {contactWidget}}
  } = useStaticQuery(graphql`
    query {
      wpSiteMetaData {
        ...WordpressSiteMetaData
      }
      site {
        siteMetadata {
          contactWidget {
            title
            successMessage
          }
        }
      }
    }
  `);

  const [{ handleSubmit: submitForm, submitting, succeeded }] = useForm(
    "contact"
  );
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formValues);
  };

  const handleChange = (target, value) => {
    switch (target) {
      case "name":
        setFormValues({ ...formValues, name: value });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        break;
      case "message":
        setFormValues({ ...formValues, message: value });
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="spacer my-6"></div>
      {succeeded && (
        <section className="py-8 px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="px-12 py-6 mb-8 lg:mb-0 text-center bg-green-200 text-green-900 mx-auto rounded">
              <h2 className="text-2xl font-heading text-center flex items-center">
                <img className="mr-2 h-6 mt-1" src={checkMark} alt="" />
                {contactWidget.successMessage ? contactWidget.successMessage : `We'll get in touch with you soon.`}
              </h2>
            </div>
          </div>
        </section>
      )}
      {!succeeded && (
        <section className="py-12 px-4">
          <h2 className="text-3xl mb-8 text-center font-heading">
          <span dangerouslySetInnerHTML={{ __html: contactWidget.title ? contactWidget.title : `Contact ` + name }}></span>
          </h2>
          <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex mb-4 -mx-2">
                <div className="w-1/2 px-2">
                  <label className="fixed opacity-0 h-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    name="name"
                    className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                    type="email"
                    id="name"
                    placeholder="Your name (optional)"
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </div>
                <div className="w-1/2 px-2">
                  <label className="fixed opacity-0 h-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                    type="email"
                    id="email"
                    required
                    placeholder="Your email address"
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="fixed opacity-0 h-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                  placeholder="Your message"
                  rows={5}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  id="message"
                ></textarea>
              </div>
              <div>
                <button className="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-900 rounded shadow">
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
      <div className="spacer my-8"></div>
      <CtaBig />
    </>
  );
};

export default ContactForm;
