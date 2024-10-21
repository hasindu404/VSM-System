// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ title, message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
