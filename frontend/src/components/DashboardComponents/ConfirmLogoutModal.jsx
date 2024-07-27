import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function ConfirmLogoutModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Logout"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Are you sure you want to logout?</h2>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}

export default ConfirmLogoutModal;
