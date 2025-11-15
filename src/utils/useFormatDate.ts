// src/utils/useFormatDate.ts
import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    ss: "%ds",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    w: "1w",
    ww: "%dw",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export const formatReviewDate = (date: string | Date | null | undefined) => {
  if (!date) {
    return { relative: "Unknown", formatted: "Unknown" };
  }

  const createdAt = moment(date);
  const relative = createdAt.fromNow(); // e.g. "2d ago"
  const formatted = createdAt.format("DD MMM YYYY"); // e.g. "08 Nov 2025"

  return { relative, formatted };
};
