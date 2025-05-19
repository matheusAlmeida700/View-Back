import {
  addCompletedLesson,
  updateStreak,
  updateAchievements,
  addXP,
} from "../services/userProgressService.js";

export const postLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    if (!lessonId) {
      return res.status(400).json({ message: "lessonId is required" });
    }

    const progress = await addCompletedLesson(req.params.id, lessonId);
    res.json({ progress });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const putStreak = async (req, res) => {
  try {
    const updated = await updateStreak(req.params.id);
    res.json({ streak: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const putAchievements = async (req, res) => {
  try {
    const updated = await updateAchievements(
      req.params.id,
      req.body.achievements
    );
    res.json({ achievements: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const putXP = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "XP amount must be a positive number" });
    }

    const xp = await addXP(req.params.id, amount);
    res.json({ xp });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
