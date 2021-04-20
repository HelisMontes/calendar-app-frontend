import { event } from "../ts/interfaces-type";
import { type } from "../types/types";

export const addEventNew = (event: event): object =>({
    type: type.eventAddNew,
    payload: event,
});

export const eventActive = (event: event): object =>({
    type: type.eventSetActive,
    payload: event,
});

export const clearEventActive = (): object => ({
    type: type.eventClearEventActive
});

export const eventUpdated =(event: event): object =>({
    type: type.eventUpdated,
    payload:event
});

export const eventDeleted =(id: string | number): object =>({
    type: type.eventDeleted,
    payload:{id}
});