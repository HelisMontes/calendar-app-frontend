import React, { useState } from 'react'
import Modal from 'react-modal';
import { customStyles } from '../../helpers/centerModal'

import '../../style.css'
Modal.setAppElement('#root')
export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Hola</h1>
      <hr />
      <samp>Hola de nuevo</samp>
    </Modal>
  )
}
