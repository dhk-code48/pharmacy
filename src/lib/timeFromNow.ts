export function timeFromNow(dateInput: string | Date) {
  const now = new Date();
  const date = new Date(dateInput);
  const diff = now.getTime() - date.getTime();

  const units = [
    { name: "year", value: 365 * 24 * 60 * 60 * 1000 },
    { name: "month", value: 30 * 24 * 60 * 60 * 1000 },
    { name: "day", value: 24 * 60 * 60 * 1000 },
    { name: "hour", value: 60 * 60 * 1000 },
    { name: "minute", value: 60 * 1000 },
    { name: "second", value: 1000 },
  ];

  for (const unit of units) {
    const elapsed = Math.abs(diff) / unit.value;
    if (elapsed >= 1) {
      const rounded = Math.floor(elapsed);
      return `${rounded}${unit.name}${rounded > 1 ? "s" : ""}`;
    }
  }

  return "just now"; // fallback for cases where time difference is very small
}

// Example usage:
