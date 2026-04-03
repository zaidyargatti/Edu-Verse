import Lecture from "../models/Lecture.js";

export const createLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date } = req.body;

    const selectedDate = new Date(date);

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const existingLecture = await Lecture.findOne({
      instructorId,
      date: {
        $gte: start,
        $lte: end
      }
    });

    if (existingLecture) {
      return res.status(400).json({
        message: "Instructor already assigned on this date"
      });
    }

    const lecture = await Lecture.create({
      courseId,
      instructorId,
      date: selectedDate
    });

    res.status(201).json(lecture);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};