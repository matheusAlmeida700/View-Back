import User from "../models/User.js";
import { calculateStreakUpdate } from "../utils/streakUtils.js";

export const addCompletedLesson = async (userId, lessonId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const alreadyCompleted = user.progress.includes(lessonId);
  if (alreadyCompleted) return user.progress;

  user.progress.push(lessonId);
  await user.save();
  return user.progress;
};

export const updateStreak = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!user.streak) {
    user.streak = { current: 1, lastUpdate: new Date() };
  } else {
    if (!user.streak.current || user.streak.current <= 0) {
      user.streak.current = 1;
      user.streak.lastUpdate = new Date();
    } else {
      const action = calculateStreakUpdate(user.streak.lastUpdate);

      if (action === "increment") {
        user.streak.current += 1;
        user.streak.lastUpdate = new Date();
      } else if (action === "reset") {
        user.streak.current = 1;
        user.streak.lastUpdate = new Date();
      }
    }
  }

  await user.save();
  return user.streak;
};

export const updateAchievements = async (userId, achievements) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.achievements = achievements;
  await user.save();
  return user.achievements;
};

export const addXP = async (userId, amount) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.xp += amount;
  await user.save();

  return user.xp;
};
