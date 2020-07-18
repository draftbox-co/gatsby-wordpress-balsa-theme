import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import { PaginationContext } from "../models/pagination.model";

type PaginationProps = {
  pageContext: PaginationContext;
};

const Pagination: React.FC<PaginationProps> = ({ pageContext }) => {
  return (
    <div className="flex justify-center">
      <ul className="my-8 overflow-hidden inline-flex mx-auto list-reset border border-grey-light rounded">
        {pageContext.previousPagePath && (
          <li>
            <Link
              className={classNames(
                "block px-3 py-2 text-blue-700 hover:text-white hover:bg-blue-700",
                { "border-r border-grey-light": pageContext.nextPagePath }
              )}
              to={`${pageContext.previousPagePath}`}
              data-config-id="prev"
            >
             ← Newer Posts
            </Link>
          </li>
        )}

        <li>
          {pageContext.nextPagePath && (
            <Link
              className="block px-3 py-2 text-blue-700 hover:text-white hover:bg-blue-700"
              to={`${pageContext.nextPagePath}`}
              data-config-id="next"
            >
              Older Posts →
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
