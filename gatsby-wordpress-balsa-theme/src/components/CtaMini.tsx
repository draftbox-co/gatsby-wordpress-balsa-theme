import React, { useState } from "react";
import { useForm } from "../hook/useForm";
import checkMark from "../images/check.svg";
import { useStaticQuery, graphql } from "gatsby";

const CtaMini = () => {
  const {
    site: {
      siteMetadata: { subscribeWidget, siteTitle },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          subscribeWidget {
            title
            helpText
            successMessage
          }
          siteTitle
        }
      }
    }
  `);
  const [{ handleSubmit, submitForm, submitting, succeeded }] = useForm(
    "subscribe"
  );

  const [email, setEmail] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ email });
  };

  return (
    <>
      {succeeded && (
        <section className="py-8 px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="px-12 py-6 mb-8 lg:mb-0 text-center bg-green-200 text-green-900 mx-auto rounded">
              <h2 className="text-2xl font-sansMedium text-center flex items-center">
                <img className="mr-2 h-6 mt-1" src={checkMark} alt="" />
                {subscribeWidget.successMessage && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: subscribeWidget.successMessage,
                    }}
                  ></span>
                )}
                {!subscribeWidget.successMessage && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `You've successfully subscribed to ${siteTitle}.`,
                    }}
                  ></span>
                )}
              </h2>
            </div>
          </div>
        </section>
      )}
      {!succeeded && (
        <section className="px-4 py-8 bg-gray-200" id="subscribe">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h2 className="text-3xl mt-4 mb-8 leading-tight font-sansNomal">
              <span
                dangerouslySetInnerHTML={{
                  __html: `${
                    subscribeWidget.title
                      ? subscribeWidget.title
                      : "Subscribe to " + siteTitle
                  }`,
                }}
              ></span>
            </h2>
            <form
              onSubmit={(e) => onSubmit(e)}
              className="w-full max-w-xl mx-auto"
            >
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-2/3 mb-4">
                  <label className="fixed opacity-0 h-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    onChange={(e: any) => setEmail(e.target.value)}
                    className="appearance-none block w-full py-3 px-4 leading-snug text-gray-700 bg-white focus:bg-white border border-white focus:border-gray-500 rounded md:rounded-r-none focus:outline-none"
                    type="email"
                    required
                    placeholder="hello@example.com"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <button className="inline-block w-full py-4 px-8 leading-none text-white bg-primary hover:bg-primaryActive rounded md:rounded-l-none">
                    {submitting ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {subscribeWidget.helpText
                  ? subscribeWidget.helpText
                  : `Get the latest posts delivered right to your inbox.`}
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default CtaMini;
