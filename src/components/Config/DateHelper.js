import { format } from "date-fns";

export const formatUtcToDate = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "dd.MM.yyyy. hh:mm:ss");
};

export const formatUtcToDateNoTime = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "dd.MM.yyyy.");
};

export const formatUtcToDateApi = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "yyyy-MM-dd hh:mm:ss");
};

export const formatUtcToDateApiMiliSec = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "yyyy-MM-dd hh:mm:ss.sss");
};

export const formatUtcToDateApiNoTime = (date) => {
  if (!date) return date;

  const gtmDate = new Date(date);
  return format(gtmDate, "yyyy-MM-dd");
};
