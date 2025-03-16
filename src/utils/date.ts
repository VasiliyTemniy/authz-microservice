/**
 * returns current ISO 8601 timestamp
 */
export const getTimestamp = (date?: number | string | Date) => {
  const ts = new Date(date ?? Date.now());
  return ts.toISOString();
};

// /**
//  * format date as DD.MM.YYYY__HH:mm:ss.SSS
//  * @param {number | string | Date} [date] if not provided, current datetime will be used
//  */
// export const getTimestamp = (date?: number | string | Date) => {
//   const ts = new Date(date ?? Date.now());
//   const dd = `${ts.getDate()}`.padStart(2, '0');
//   const mm = `${ts.getMonth() + 1}`.padStart(2, '0');
//   const yyyy = `${ts.getFullYear()}`.padStart(4, '0');
//   const hours = `${ts.getHours()}`.padStart(2, '0');
//   const minutes = `${ts.getMinutes()}`.padStart(2, '0');
//   const seconds = `${ts.getSeconds()}`.padStart(2, '0');
//   const milliseconds = `${ts.getMilliseconds()}`.padEnd(3, '0');
//   return `${dd}.${mm}.${yyyy}__${hours}:${minutes}:${seconds}.${milliseconds}`;
// };