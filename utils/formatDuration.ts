const millisecondsToHMS = (
  ms: number
): { hrs: number; mins: number; secs: number } => {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);

  return {
    hrs,
    mins,
    secs,
  };
};

const padHMS = (timeHMS: {
  hrs: number;
  mins: number;
  secs: number;
}): { hrs: string; mins: string; secs: string } => ({
  hrs: String(timeHMS.hrs).padStart(2, "0"),
  mins: String(timeHMS.mins).padStart(2, "0"),
  secs: String(timeHMS.secs).padStart(2, "0"),
});

const formatDuration = (
  duration: number
): { hrs: string; mins: string; secs: string } => {
  const timeHMS = millisecondsToHMS(duration);
  const paddedHMS = padHMS(timeHMS);

  return {
    hrs: `${paddedHMS.hrs}`,
    mins: `${paddedHMS.mins} `,
    secs: `${paddedHMS.secs} `,
  };
};

export default formatDuration;
