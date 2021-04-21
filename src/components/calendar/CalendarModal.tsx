import React from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import { customStyles } from '../../helpers/centerModal';

import 'react-datepicker/dist/react-datepicker.css';
import '../../style.css';
import { EventsCalendarModal } from '../../events/eventsCalendarModal';

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const {variables, functions}= EventsCalendarModal();
  const {
    openModal,
    activeEvent,
    startDate,
    dateStart,
    endDate,
    formValues,
    titleValid,
  } = variables;
  const {
    closeModal,
    handleSubmit,
    handleStartDate,
    handleEndDate,
    filterTime,
    handleInputChange,
  } = functions;
  
  return (
    <Modal
      isOpen={openModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{activeEvent.id ? 'Editar evento' : 'Nuevo evento'}</h1>
      <hr />
      <form 
        className="container"
        onSubmit={handleSubmit}
      >

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
          filterTime={(date: Date) => filterTime(dateStart, date)}
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
          filterTime={(date: Date) => filterTime(startDate, date)}
          minDate={startDate}
          className="form-control"
        />
      </div>

      <hr />
      <div className="form-group">
        <label>Titulo y notas</label>
        <input 
          type="text" 
          className={`form-control ${!titleValid && 'is-invalid'}`}
          placeholder="Título del evento"
          name="title"
          autoComplete="off"
          value={formValues.title}
          onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
      </div>

      <div className="form-group">
        <textarea  
          className="form-control"
          placeholder="Notas"
          rows={5}
          name="note"
          value={formValues.note}
          onChange={handleInputChange}
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
