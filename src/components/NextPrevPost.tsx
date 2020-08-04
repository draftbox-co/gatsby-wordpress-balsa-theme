import React from "react";

import classNames from "classnames";
import { PostDescription } from "../models/all-post-description.model";

type NextPrevPostProps = {
  prevPost: PostDescription;
  nextPost: PostDescription;
};
const NextPrevPost: React.FC<NextPrevPostProps> = ({ prevPost, nextPost }) => {
  return (
    <>
      <aside className="px-4 max-w-4xl mx-auto flex flex-wrap mt-10">
        <a
          className={classNames(
            "w-full md:w-1/2 px-4 relative py-4 border-t border-b",
            {
              "pointer-events-none hidden md:block": !nextPost,
              "py-4": nextPost,
            }
          )}
          href={nextPost?.slug ? nextPost.slug : "#"}
        >
          {nextPost && (
            <section className="h-full flex flex-col">
              <i className="icon icon-arrow-left"></i>
              <h2 className="text-xl font-sansBold mb-2 text-gray-800">
                {nextPost.plainTitle}
              </h2>
              <p className="mb-2 prev-next-post text-gray-600 font-serifLight break-words">
                {nextPost.plainExcerpt}&hellip;
              </p>
              <p className="text-gray-600 text-xs mt-auto">
                <time dateTime="{{date format='DD-MM-YYYY'}}">
                  {nextPost.date}
                </time>
              </p>
            </section>
          )}
        </a>

        <a
          className={classNames(
            "w-full md:w-1/2 px-4 relative md:border-l md:border-t border-b",
            {
              "pointer-events-none hidden md:block": !prevPost,
              "py-4": prevPost,
              "border-t": !nextPost,
            }
          )}
          href={prevPost?.slug ? prevPost.slug : "#"}
        >
          {prevPost && (
            <section className="h-full flex flex-col">
              <i className="icon icon-arrow-right"></i>
              <h2 className="text-xl font-sansBold mb-2 text-gray-800">
                {prevPost.plainTitle}
              </h2>
              <p className="mb-2 prev-next-post text-gray-600 font-serifLight break-words">
                {prevPost.plainExcerpt}&hellip;
              </p>
              <p className="text-gray-600 text-xs mt-auto">
                <time dateTime="{{date format='DD-MM-YYYY'}}">
                  {prevPost.date}
                </time>
              </p>
            </section>
          )}
        </a>
      </aside>
    </>
  );
};

export default NextPrevPost;
