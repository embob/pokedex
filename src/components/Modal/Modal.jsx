import React, { useContext } from "react";
import ReactDom from "react-dom";
import { PokedexContext } from "../Pokedex/Pokedex";

const Modal = ({ isShowing, hide, id }) => {
  // const { filteredList } = useContext(PokedexContext);
  return isShowing
    ? ReactDom.createPortal(
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <button onClick={hide}>
                  <span>x</span>
                </button>
              </div>
              <div>{id}</div>
              <p>Hello I'm a modal</p>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};

export default Modal;
