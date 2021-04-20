import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker';
import { stringOrDate } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { event } from '../../ts/interfaces-type';
import { customStyles } from '../../helpers/centerModal';
import {uiClosedModal} from '../../actions/ui'
import { addEventNew, clearEventActive, eventUpdated } from '../../actions/eventos';

import 'react-datepicker/dist/react-datepicker.css';
import '../../style.css';

Modal.setAppElement('#root');

const dateStart: stringOrDate = moment().second(0).add(5, 'minutes').toDate();
const dateEnd: stringOrDate = moment().second(0).add(20, 'minutes').toDate();

const initEvent: event = {
  title: '',
  start: dateStart,
  end: dateEnd,
  note: ''
}

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { openModal }:{openModal: boolean} = useSelector((state: any) => state.ui);
  const {activeEvent}:{activeEvent:event} = useSelector((state:any) => state.calendar)
  
  const [startDate, setStartDate] = useState(dateStart);
  const [endDate, setEndDate] = useState(dateEnd);
  const [titleValid, setTitleValid] = useState(true)
  const [formValues, setFormValues] = useState <event> (initEvent);
  const {title, note} = formValues;
  
  useEffect(() => {
    if(activeEvent.id){
      setFormValues(activeEvent)
      setStartDate(moment(activeEvent.start).toDate())
      setEndDate(moment(activeEvent.end).toDate())
    }else{
      setFormValues(initEvent);
      setStartDate(dateStart)
      setEndDate(dateEnd)
    }
  }, [activeEvent])

  const handleInputChange = (event:any): void =>{
    const target:any = event.target
    setFormValues({
      ...formValues,
      [target.name]:target.value
    });
  }
  const valideteDate = (initial: stringOrDate, end: stringOrDate): boolean => (
    moment(initial).isSameOrBefore(end) ?  true : false
  );
  const filterTime = (initial:Date, time: Date, ): boolean => {
    const validated = valideteDate(initial, time);
    return validated;
  }
  
  const handleStartDate = (date: Date) :void =>{
    setStartDate(date);
    setFormValues({
      ...formValues,
      start: date
    });
  }
  const handleEndDate = (date: Date): void =>{
    setEndDate(date);
    setFormValues({
      ...formValues,
      end: date
    });
  }
  const handleSubmit = (event:React.FormEvent):void => {
    event.preventDefault();
    const fourMinutes: stringOrDate = moment(dateStart).subtract(1, 'minutes').toDate();
    const fifteenPlus: stringOrDate = moment(startDate).add(14, 'minutes').toDate();
    const ValidateDateCurrentWithStart = valideteDate(fourMinutes, startDate);
    const ValidateDateStartWithEnd = valideteDate(fifteenPlus, endDate);
    if (!ValidateDateCurrentWithStart){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El evento debe iniciar 5 minutos después de la hora actual',
      })
      setStartDate(dateStart);
      setEndDate(moment(dateStart).add(15, 'minutes').toDate());
      return
    }
    if (!ValidateDateStartWithEnd){ 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El evento debe finalizar mínimo 15 minutos después de la fecha inicial',
      })
      setEndDate(moment(startDate).add(15, 'minutes').toDate());
      return
    }
    if(title.trim().length === 0) return setTitleValid(false);
    //TODO: Registrar en la DB
    
    if(activeEvent.id){
      dispatch(
        eventUpdated({
          ...formValues,
          id: activeEvent.id,
          user: activeEvent.user
        })
      );
    }else{
      dispatch(addEventNew({
        ...formValues,
        id: Date.now(),
        user:{
          uid: '111',
          name: 'Maximo'
        },
      }));
    } 
    setTitleValid(true);
    closeModal();
  }
  const closeModal = (): void => {
    dispatch(uiClosedModal());
    setFormValues(initEvent);
    setStartDate(dateStart)
    setEndDate(dateEnd)
    dispatch(clearEventActive())
  }
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
          value={title}
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
          value={note}
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
