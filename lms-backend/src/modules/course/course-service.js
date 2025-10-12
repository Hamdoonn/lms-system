import Course from "./course-model.js";

class CourseService {
  async createCourse(courseData) {
    const newCourse = new Course(courseData);
    return await newCourse.save();
  }

  async getAllCourses() {
    return await Course.find();
  }

  async getCourseById(courseId) {
    return await Course.findById(courseId);
  }

  async updateCourse(courseId, updateData) {
    return await Course.findByIdAndUpdate(courseId, updateData, { new: true });
  }

  async deleteCourse(courseId) {
    return await Course.findByIdAndDelete(courseId);
  }
}

export default new CourseService();
