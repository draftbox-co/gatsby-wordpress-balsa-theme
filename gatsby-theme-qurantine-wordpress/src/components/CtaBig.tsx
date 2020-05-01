import React, { useState } from "react";
import bigCta from "../images/mobile_login.svg";
import { useForm } from "../hook/useForm";
import checkMark from "../images/check.svg";
import { graphql, useStaticQuery } from "gatsby";

const CtaBig = () => {
  const {
    ghostSettings: { title },
  } = useStaticQuery(graphql`
    query {
      ghostSettings {
        title
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
              <h2 className="text-2xl font-heading text-center flex items-center">
                <img className="mr-2 h-6 mt-1" src={checkMark} alt="" />
                You've successfully subscribed to {title}.{" "}
              </h2>
            </div>
          </div>
        </section>
      )}
      {!succeeded && (
        <section className="px-4 py-12 bg-gray-200">
          <div className="flex flex-wrap items-center text-center md:text-left -mx-2">
            <div className="lg:w-1/2 px-2 lg:pl-16 mt-10 lg:mt-0 order-1 lg:order-none mx-auto">
              <h2 className="text-4xl mb-6 font-heading">
                Subscribe to {title}
              </h2>
              <form
                onSubmit={(e) => onSubmit(e)}
                className="w-full max-w-lg mx-auto sm:mx-0"
              >
                <div className="flex flex-wrap">
                  <div className="w-full md:w-2/3 mb-4">
                    <label className="hidden" htmlFor="email"></label>
                    <input
                      id="email"
                      onChange={(e: any) => setEmail(e.target.value)}
                      className="appearance-none block w-full py-3 px-4 leading-snug text-gray-700 bg-white focus:bg-white border border-white focus:border-gray-500 rounded md:rounded-r-none focus:outline-none"
                      type="email"
                      required
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div className="w-full md:w-1/3 mb-4">
                    <button className="inline-block w-full py-4 px-8 leading-none text-white bg-indigo-500 hover:bg-indigo-600 rounded md:rounded-l-none">
                      {submitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Get the latest posts delivered right to your inbox.
                  </p>
                </div>
              </form>
            </div>
            <div className="lg:w-1/2 px-2 mx-auto">
              <img src={bigCta} alt="" />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CtaBig;
