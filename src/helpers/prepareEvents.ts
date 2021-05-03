import moment from 'moment'
import { event } from '../ts/interfaces-type'

export const prepareEvents = (events: event[] = [], id : string) => {
  return events.filter((e: any) => {
    if (e.user_id._id === id){
      e.end = moment(e.end).toDate();
      e.start = moment(e.start).toDate();
      return e
    }
    return false
  });
}
