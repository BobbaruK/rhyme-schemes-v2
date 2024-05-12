import { Database } from "@/types/supabase";

type DB_Date = Database["public"]["Tables"]["albums"]["Row"]["release_date"]; // all dates are the same type (string | null)

interface Options {
  output: "year" | "YYYY-MM-DD" | "DD-MM-YYYY";
  namedMonths?: boolean;
  separator?: "/" | "-";
}

export const dateFormatter = (date: DB_Date, options?: Options) => {
  if (!date) return;

  const newDate = new Date(date);
  const fullYear = newDate.getFullYear();
  const monthIndex = newDate.getMonth();
  const monthNo = monthIndex + 1;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[monthIndex];
  const returnMonth = () => {
    if (options?.namedMonths) return monthName;
    return monthNo < 10 ? `0${monthNo}` : monthNo;
  };
  const month = returnMonth();
  const day = newDate.getDay() < 10 ? `0${newDate.getDay()}` : newDate.getDay();
  const separator = options?.separator || "/";

  switch (options?.output) {
    case "year":
      return fullYear;

    case "YYYY-MM-DD":
      return `${fullYear}${separator}${month}${separator}${day}`;

    case "DD-MM-YYYY":
      return `${day}${separator}${month}${separator}${fullYear}`;

    default:
      return fullYear;
  }
};
