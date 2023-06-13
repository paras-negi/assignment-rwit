import React from "react";

export default function buttons({ text, onClickBtn, className, type="button" }) {
  return (
    <button onClick={onClickBtn} className={"btn"} type={type}>
      {text || "Next step"}
    </button>
  );
}
