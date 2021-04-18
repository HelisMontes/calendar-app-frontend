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