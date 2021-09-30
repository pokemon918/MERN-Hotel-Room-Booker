import moment from "moment";
export function filterByDates(rooms, dates) {
  let temprooms = [];

  let avilability = false;

  for (const room of rooms) {
    if (room.currentbookings.length > 0) {
      for (const booking of room.currentbookings) {
        if (
          !moment(moment(dates.fromDate).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          ) &&
          !moment(moment(dates.toDate).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          )
        ) {
          if (
            dates.fromDate !== booking.fromDate &&
            dates.fromDate !== booking.toDate &&
            dates.toDate !== booking.fromDate &&
            dates.toDate !== booking.toDate
          ) {
            avilability = true;
          }
        }
      }
    }
    if (avilability === true || room.currentbookings.length === 0) {
      temprooms.push(room);
    }
  }
  return temprooms;
}
