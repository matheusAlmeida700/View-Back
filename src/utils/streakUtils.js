export const calculateStreakUpdate = (lastUpdate) => {
  const today = new Date();
  const last = new Date(lastUpdate);

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const lastStart = new Date(
    last.getFullYear(),
    last.getMonth(),
    last.getDate()
  );

  const diffTime = todayStart.getTime() - lastStart.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 1) return "increment";
  if (diffDays > 1) return "reset";
  return "same";
};
