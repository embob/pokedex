import React from "react";
import ReactDom from "react-dom";
import useFetch from "../../hooks/useFetch";
import DetailCard from "../DetailCard/DetailCard";
import "./modal.scss";

const ModalContext = React.createContext();

const Modal = ({ isShowing, hide, id }) => {
  const url = id && `/.netlify/functions/pokemon/${id}`;
  console.log(url);
  const { data, status, setStatus } = useFetch(url);

  return (
    <ModalContext.Provider value={{ data, status, setStatus }}>
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
                  <DetailCard />
                </div>
              </div>
            </>,
            document.body
          )
        : null}
    </ModalContext.Provider>
  );
};

export { Modal, ModalContext };
