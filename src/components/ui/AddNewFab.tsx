import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearEventActive } from '../../actions/eventos';
import {uiOpenModal} from '../../actions/ui';
import { State } from '../../ts/interfaces-type';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const {activeEvent} = useSelector((state: State) => state.calendar)
  
  const handleClickNewEvent = () =>{
    activeEvent.id && dispatch(clearEventActive())
    dispatch(uiOpenModal());
  }
  return (
    <button 
      className="btn btn-primary fab"
      onClick={handleClickNewEvent}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
