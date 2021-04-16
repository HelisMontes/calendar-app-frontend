import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import { customStyles } from '../../helpers/centerModal'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '../../style.css'
Modal.setAppElement('#root')
export const CalendarModal = () => {
  const dateStart = moment().toDate();
  const dateEnd = moment().add(5, 'minutes').toDate();
  
  const [startDate, setStartDate] = useState(dateStart);
  const [endDate, setEndDate] = useState(dateEnd)
  
  const filterPassedTime = (time:Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);    
    return currentDate.getTime() < selectedDate.getTime();
  }
  
  const handleStartDate = (date:Date) =>{
    setStartDate(date)
  }
  const handleEndDate = (date:Date) =>{
    setEndDate(date)
  }
  const closeModal = () => {
  
  }
  return (
    <Modal
      isOpen={true}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">

      <div className="form-group">
        <div>
          <label>Fecha y hora inicio</label>
        </div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy HH:mm"
          filterTime={filterPassedTime}
          minDate={dateStart}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <div>
          <label>Fecha y hora fin</label>
        </div>
        <DatePicker
          selected={endDate}
          onChange={handleEndDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy HH:mm"
          //filterTime={filterPassedTime}
          minDate={startDate}
          className="form-control"
        />
      </div>

      <hr />
      <div className="form-group">
        <label>Titulo y notas</label>
        <input 
          type="text" 
          className="form-control"
          placeholder="Título del evento"
          name="title"
          autoComplete="off"
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
      </div>

      <div className="form-group">
        <textarea  
          className="form-control"
          placeholder="Notas"
          rows={5}
          name="notes"
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary btn-block"
      >
        <i className="far fa-save"></i>
        <span> Guardar</span>
      </button>
    </form>
    </Modal>
  )
}
