import User from "../models/User.js";
import { calculateStreakUpdate } from "../utils/streakUtils.js";

export const addCompletedLesson = async (userId, lessonId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const alreadyCompleted = user.progress.includes(lessonId);
  if (alreadyCompleted) return user.progress;

  user.progress.push(lessonId);

  const completedLessons = user.progress.length;
  const achievementsToCheck = [
    { id: "ten-lessons", required: 10 },
    { id: "fifty-lessons", required: 50 },
    { id: "hundred-lessons", required: 100 },
  ];

  if (!Array.isArray(user.achievements)) {
    user.achievements = [];
  }

  for (const achievement of achievementsToCheck) {
    const hasAchievement = user.achievements.includes(achievement.id);
    if (!hasAchievement && completedLessons >= achievement.required) {
      user.achievements.push(achievement.id);
    }
  }

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

  const achievementsToCheck = {
    1: "first-lesson",
    7: "streak-7",
    30: "streak-30",
    75: "streak-75",
    100: "streak-100",
    365: "streak-365",
    500: "streak-500",
    1000: "streak-1000",
  };

  const achievementId = achievementsToCheck[user.streak.current];

  if (achievementId && !user.achievements.includes(achievementId)) {
    user.achievements.push(achievementId);
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
