import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { event } from "../ts/interfaces-type";
import { type } from "../types/types";

export const addEventNewDB = (event: event) => { 
    return async(dispatch: Function, getState: any) => { 
        const auth = getState().auth
        try {
            const response = await fetchConToken('events', event, 'POST');
            const body = await response.json();
            if(body.ok){
                event.id = body.event.id
                event.user ={
                    uid: auth.uid,
                    name: auth.name
                }
                dispatch(addEventNew(event));
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const addEventNew = (event: event): object =>({
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

export const eventStartLoading = () => {
    return async (dispatch: Function, getState: any) => {
        const {uid} = getState().auth;
        try {
            const response = await fetchConToken('events');
            const body = await response.json();
            if (body.ok) {
                const events = prepareEvents(body.events, uid);
                 dispatch( eventLoaded(events));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventLoaded = (events: event[]): object => ({
    type: type.eventLoaded,
    payload: events
});

export const clearListEvents = () =>({ type: type.eventClear});