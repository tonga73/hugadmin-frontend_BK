import React from "react";

export default function Modal({
  htmlFor,
  children,
  openButtonContent,
  openButtonStyles,
  modalAction,
}) {
  return (
    <>
      <label htmlFor={htmlFor} className={openButtonStyles}>
        {openButtonContent}
      </label>

      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {children}
          <div className="modal-action">{modalAction}</div>
        </div>
      </div>
    </>
  );
}
