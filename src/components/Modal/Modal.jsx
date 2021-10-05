import React, { useContext} from "react";
import ReactDom from "react-dom";
import useFetch from "../../hooks/useFetch";
import DetailCard from "../DetailCard/DetailCard";
import "./modal.scss";
import { PokedexContext } from "../Pokedex/Pokedex";

const ModalContext = React.createContext();

const Modal = () => {
  const { isShowing, toggle: hide, cardClicked: id } = useContext(PokedexContext);
  const url = id && `/.netlify/functions/pokemon/${id}`;
  const { data, status } = useFetch(url);
  return (
    <ModalContext.Provider
      value={{ data, status }} >
    <>
      {isShowing
        ? ReactDom.createPortal(
            <>
              <div className="modal-overlay" />
              <div className="modal-wrapper" >
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
    </>
    </ModalContext.Provider>
  );
};

export { Modal, ModalContext };
