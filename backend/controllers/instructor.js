import Lecture from "../models/lecture.js";

export const getMyLectures = async (req, res) => {
  const lectures = await Lecture.find({
    instructorId: req.user.id
  }).populate("courseId");

  res.json(lectures);
};