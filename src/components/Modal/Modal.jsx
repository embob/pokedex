import React from "react";
import ReactDom from "react-dom";
import useFetch from "../../hooks/useFetch";
import DetailCard from "../DetailCard/DetailCard";

const ModalContext = React.createContext();

const Modal = ({ isShowing, hide, id }) => {

  const url = id && `/.netlify/functions/pokemon/${id}`;

  const { data, status } = useFetch(url);

  return (
    <ModalContext.Provider value={{ data, status }}>
      { isShowing ? ReactDom.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <button onClick={hide}>
                <span>x</span>
              </button>
            </div>
            <DetailCard />
          </div>
        </div>
      </>
      , document.body ) : null}
    </ModalContext.Provider>
  );
};

export { Modal, ModalContext };
