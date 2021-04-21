import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Swal from 'sweetalert2'
import { stringOrDate } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';

import { event } from '../ts/interfaces-type';
import {uiClosedModal} from '../actions/ui'
import { addEventNew, clearEventActive, eventUpdated } from '../actions/eventos';

const dateStart: stringOrDate = moment().second(0).add(5, 'minutes').toDate();
const dateEnd: stringOrDate = moment().second(0).add(20, 'minutes').toDate();

const initEvent: event = {
  title: '',
  start: dateStart,
  end: dateEnd,
  note: ''
}
export const EventsCalendarModal = () => {
  const dispatch = useDispatch();
	const { openModal }:{openModal: boolean} = useSelector((state: any) => state.ui);
	const {activeEvent}:{activeEvent:event} = useSelector((state:any) => state.calendar)
	
	const [startDate, setStartDate] = useState(dateStart);
	const [endDate, setEndDate] = useState(dateEnd);
	const [titleValid, setTitleValid] = useState(true)
	const [formValues, setFormValues] = useState <event> (initEvent);
	const {title} = formValues;
	
	useEffect(() => {
		if(activeEvent.id){
			setFormValues(activeEvent);
			setStartDate(moment(activeEvent.start).toDate());
			setEndDate(moment(activeEvent.end).toDate());
		}else{
			claerForm();
		}
	}, [activeEvent]);
	
	const claerForm = () =>{
		setFormValues(initEvent);
		setStartDate(dateStart);
		setEndDate(dateEnd);
	}
	const handleInputChange = (event:any): void =>{
		const target:any = event.target;
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
			});
			setStartDate(dateStart);
			setEndDate(moment(dateStart).add(15, 'minutes').toDate());
			return;
		}
		if (!ValidateDateStartWithEnd){ 
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'El evento debe finalizar mínimo 15 minutos después de la fecha inicial',
			});
			setEndDate(moment(startDate).add(15, 'minutes').toDate());
			return;
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
		dispatch(clearEventActive());
		claerForm();
	}
	return {
		variables:{
			openModal,
			activeEvent,
			startDate,
			dateStart,
			endDate,
			formValues,
			titleValid,
		},
		functions:{
			closeModal,
			handleSubmit,
			handleStartDate,
			handleEndDate,
			filterTime,
			handleInputChange,
		}
	}
}