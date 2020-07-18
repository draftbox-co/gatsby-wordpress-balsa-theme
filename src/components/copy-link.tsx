import React, { useState } from "react";
import copyIcon from "../images/copy.svg";
import copiedIcon from "../images/copied.svg";

type CopyLinkProps = {
  textToCopy: string;
};

const CopyLink: React.FC<CopyLinkProps> = ({ textToCopy }) => {
  const [copiedToClipBoard, setCopiedToClipBoard] = useState(false);

  const copyToClipboard = () => {
    if (window["clipboardData"] && window["clipboardData"].setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      setCopiedToClipBoard(true);

      setTimeout(() => {
        setCopiedToClipBoard(false);
      }, 5000);
      return window["clipboardData"].setData("Text", textToCopy);
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = textToCopy;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        setCopiedToClipBoard(true);

        setTimeout(() => {
          setCopiedToClipBoard(false);
        }, 5000);
        return document.execCommand("copy"); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <div>
      <button
        onClick={(e) => copyToClipboard()}
        className="block p-2 bg-blue-500 hover:bg-blue-700 rounded-full mr-2"
        title="Copy to clipboard"
      >
        <img
          className="h-4"
          src={copiedToClipBoard ? copiedIcon : copyIcon}
          alt="Email Share"
        />
      </button>
    </div>
  );
};

export default CopyLink;
