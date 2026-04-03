import Course from "../models/Course.js";
import User from "../models/User.js";

export const createCourse = async (req, res) => {
  try {
    
    const { name, level, description, image } = req.body;
    
    const course = await Course.create({
      name,
      level,
      description,
      image
    });
  
    res.status(201).json(course);
  } catch (error) {
    console.log(error)
  }
};

export const getInstructors = async (req, res) => {
  try {
    
    const instructors = await User.find({ role: "instructor" });
    res.json(instructors);
  } catch (error) {
    console.log(error)
  }
};

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};