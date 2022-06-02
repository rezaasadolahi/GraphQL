const { Schema, model } = require('mongoose')


const LessonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  group: String,
  teacherId: String
})


const LessonModel = model('Lessons', LessonSchema)
module.exports = LessonModel