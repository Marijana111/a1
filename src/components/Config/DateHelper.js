import { format } from "date-fns";

export const formatUtcToDate = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "dd.MM.yyyy. hh:mm:ss");
};
