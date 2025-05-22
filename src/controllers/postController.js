import {
  fetchAllPost,
  fetchPostById,
  addNewPost,
  modifyPostById,
  removePostById,
  addAnswerToPost,
  modifyAnswer,
  removeAnswer,
} from "../services/postService.js";
import { postSchema, answerSchema } from "../utils/validators.js";

export const getAllPost = async (req, res, next) => {
  try {
    const entries = await fetchAllPost();
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await fetchPostById(id);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const errors = [];
      for (const item of data) {
        const { error } = postSchema.validate(item, {
          abortEarly: false,
        });
        if (error) {
          errors.push(...error.details.map((err) => err.message));
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const created = await Promise.all(data.map(addNewPost));
      return res.status(201).json({ created });
    } else {
      const { error } = postSchema.validate(data, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((err) => err.message) });
      }

      const newEntry = await addNewPost(data);
      return res.status(201).json({ newEntry });
    }
  } catch (error) {
    next(error);
  }
};

export const getPostByTargetId = async (req, res) => {
  const { targetId } = req.params;

  try {
    const posts = await fetchPostByTarget(targetId);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEntry = await modifyPostById(id, req.body);
    const status =
      updatedEntry.createdAt === updatedEntry.updatedAt ? 201 : 200;
    res.status(status).json({ updatedEntry });
  } catch (error) {
    next(error);
  }
};

export const updatePostByTargetId = async (req, res) => {
  const { targetId } = req.params;
  const data = req.body;

  try {
    const updatedPost = await modifyPostByTarget(targetId, data);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await removePostById(id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const addAnswer = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { error } = answerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const updatedPost = await addAnswerToPost(postId, req.body);
    res.status(201).json({ updatedPost });
  } catch (error) {
    next(error);
  }
};

export const updateAnswer = async (req, res, next) => {
  try {
    const { postId, answerId } = req.params;
    const { error } = answerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const updatedPost = await modifyAnswer(postId, answerId, req.body);
    res.status(200).json({ updatedPost });
  } catch (error) {
    next(error);
  }
};

export const deleteAnswer = async (req, res, next) => {
  try {
    const { postId, answerId } = req.params;
    const result = await removeAnswer(postId, answerId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
