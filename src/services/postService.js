import Post from "../models/Post.js";

export const fetchAllPost = async () => {
  try {
    const entries = await Post.find();
    return entries;
  } catch (error) {
    throw new Error("Error fetching post: " + error.message);
  }
};

export const fetchPostById = async (id) => {
  try {
    const entry = await Post.findById(id);
    if (!entry) {
      throw new Error("Post entry not found");
    }
    return entry;
  } catch (error) {
    throw new Error("Error fetching post entry by ID: " + error.message);
  }
};

export const fetchPostByTargetId = async (targetId) => {
  try {
    const entries = await Post.find({ targetId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching post by target: " + error.message);
  }
};

export const addNewPost = async (data) => {
  try {
    const entry = new Post(data);
    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error creating post: " + error.message);
  }
};

export const modifyPostById = async (id, data) => {
  try {
    let entry = await Post.findById(id);

    if (!entry) {
      entry = new Post({ _id: id, ...data });
    } else {
      Object.assign(entry, data);
    }

    await entry.save();
    return entry;
  } catch (error) {
    throw new Error("Error modifying/creating post: " + error.message);
  }
};

export const modifyPostByTargetId = async (targetId, data) => {
  try {
    const entry = await Post.findOne({ targetId });

    if (!entry) {
      throw new Error("Post entry not found.");
    }

    Object.assign(entry, data);
    await entry.save();

    return entry;
  } catch (error) {
    throw new Error("Error modifying by targetId: " + error.message);
  }
};

export const removePostById = async (id) => {
  try {
    const entry = await Post.findByIdAndDelete(id);
    if (!entry) {
      throw new Error("Post entry not found");
    }
    return { message: "Post entry deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting post: " + error.message);
  }
};

export const fetchAnswerById = async (postId, answerId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const answer = post.answers.id(answerId);
    if (!answer) throw new Error("Answer not found");

    return answer;
  } catch (error) {
    throw new Error("Error getting answer: " + error.message);
  }
};

export const addAnswerToPost = async (postId, answerData) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    post.answers.push(answerData);
    await post.save();
    return post;
  } catch (error) {
    throw new Error("Error adding answer: " + error.message);
  }
};

export const modifyAnswer = async (postId, answerId, newData) => {
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const answer = post.answers.id(answerId);
    if (!answer) throw new Error("Answer not found");

    Object.assign(answer, newData);
    await post.save();
    return post;
  } catch (error) {
    throw new Error("Error modifying answer: " + error.message);
  }
};

export const removeAnswer = async (postId, answerId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const answer = post.answers.id(answerId);
    if (!answer) throw new Error("Answer not found");

    answer.remove();
    await post.save();
    return { message: "Answer removed successfully" };
  } catch (error) {
    throw new Error("Error removing answer: " + error.message);
  }
};
