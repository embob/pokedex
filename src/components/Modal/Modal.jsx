import React from "react";
import ReactDom from "react-dom";
import useFetch from "../../hooks/useFetch";
import DetailCard from "../DetailCard/DetailCard";
import "./modal.scss";

// const ModalContext = React.createContext();

const Modal = ({ isShowing, hide, id }) => {
  console.log('id', id);
  const url = id && `/.netlify/functions/pokemon/${id}`;
  console.log('url', url);
  const { data, status} = useFetch(url);

  return (
    <>
      {isShowing
        ? ReactDom.createPortal(
            <>
              <div className="modal-overlay" />
              <div className="modal-wrapper">
                <div className="modal">
                  <button
                    className="modal__close-button"
                    aria-label="Close modal"
                    type="button"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <DetailCard data={data} status={status} />
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </>
  );
};

export { Modal };
