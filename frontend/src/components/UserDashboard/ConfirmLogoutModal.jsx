import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ConfirmLogoutModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Logout"
      className="logout-modal"
      overlayClassName="logout-overlay"
    >
      <h2>Are you sure you want to logout?</h2>
      <button className="logout-confirm-button" onClick={onConfirm}>Confirm</button>
      <button className="logout-cancel-button" onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
}

export default ConfirmLogoutModal;
