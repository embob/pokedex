import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDom.createPortal(
  <>
    <div className="modal-overlay" />
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <button onClick={hide}>
            <span>x</span>
          </button>
        </div>
        <p>Hello I'm a modal</p>
      </div>


    </div>
  </>, document.body) : null;

export default Modal;