const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql')
const lodash = require('lodash')




// Data Sample
const Data_Teacher = [
  { id: "1", name: "Reza", age: 23 },
  { id: "2", name: "Arash", age: 24 },
  { id: "3", name: "Zamiar", age: 25 }
]
const Data_Lesson = [
  { id: "1", name: "React", group: "Front", teacherId: "1" },
  { id: "2", name: "Node", group: "Back", teacherId: "3" },
  { id: "3", name: "Flutter", group: "Android", teacherId: "2" },
  { id: "4", name: "PHP", group: "Back", teacherId: "1" },
  { id: "5", name: "Java", group: "Android", teacherId: "3" },
  { id: "6", name: "TS", group: "Front", teacherId: "3" },
  { id: "7", name: "Swift", group: "iphone", teacherId: "2" }
]



const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    lesson: {
      type: new GraphQLList(LessonType),
      resolve(parent, args) {
        return lodash.filter(Data_Lesson, { teacherId: parent.id })
      }
    }
  })
})

const LessonType = new GraphQLObjectType({
  name: 'Lesson',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    group: { type: GraphQLString },
    teacherId: { type: GraphQLID },
    teacher: {
      type: TeacherType,
      resolve(parent, args) {
        return lodash.find(Data_Teacher, { id: parent.id })
      }
    }
  })
})



const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    Teacher: {
      type: TeacherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(Data_Teacher, { id: args.id })
      }
    },
    Lesson: {
      type: LessonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(Data_Lesson, { id: args.id })
      }
    },
    allTeachers: {
      type: new GraphQLList(TeacherType),
      resolve() {
        return Data_Teacher
      }
    },
    allLessons: {
      type: new GraphQLList(LessonType),
      resolve() {
        return Data_Teacher
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})