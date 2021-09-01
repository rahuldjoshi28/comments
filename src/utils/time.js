export const HOURS_IN_DAY = 24;

const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

const DateUtils = {
  toDays(seconds) {
    return Math.floor(
      seconds / (HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE)
    );
  },
  toHours(seconds) {
    return Math.floor(seconds / (MINUTES_IN_HOUR * SECONDS_IN_MINUTE));
  },
  toMinutes(seconds) {
    return Math.floor(seconds / SECONDS_IN_MINUTE);
  },
  toSeconds(milliseconds) {
    return milliseconds / MILLISECONDS_IN_SECOND;
  },
};

export function formatTimePassed(timestamp) {
  const currentTime = Date.now();

  const differentInSeconds = DateUtils.toSeconds(currentTime - timestamp);

  const days = DateUtils.toDays(differentInSeconds);
  if (days > 0) return `${days} d`;

  const hours = DateUtils.toHours(differentInSeconds);
  if (hours > 0) return `${hours} h`;

  const minutes = DateUtils.toMinutes(differentInSeconds);
  if (minutes > 0) return `${minutes} m`;

  return "a few seconds ago";
}
