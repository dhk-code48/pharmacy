"use client";
export function formatDate(date: Date | string, format = "YYYY-MM-DD"): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const monthNameShort = monthNamesShort[d.getMonth()];
  const monthNameFull = monthNamesFull[d.getMonth()];
  const dayNameShort = dayNamesShort[d.getDay()];
  const dayNameFull = dayNamesFull[d.getDay()];

  return format
    .replace("YYYY", year.toString())
    .replace("DDDD", dayNameFull)
    .replace("MMMM", monthNameFull)
    .replace("MMM", monthNameShort)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("DDD", dayNameShort);
}
