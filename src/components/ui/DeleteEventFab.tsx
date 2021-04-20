import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/eventos';

export const DeleteEventFab = ({id}:{id: string| number}) => {
  const dispatch = useDispatch();
  const handleClickDelete = () => {
    console.log(id)
    dispatch(eventDeleted(id));
  }
  return (
    <button 
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
    >
      <i className="fas fa-trash"></i>
      <span>Borrar</span>
    </button>
  )
}