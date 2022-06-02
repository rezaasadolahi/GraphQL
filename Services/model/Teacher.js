const { Schema, model } = require('mongoose')


const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
})


const TeacherModel = model('Teachers', TeacherSchema)
module.exports = TeacherModel