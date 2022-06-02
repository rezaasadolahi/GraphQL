const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql')
const TeacherModel = require('../model/Teacher')
const LessonModel = require('../model/Lesson')



const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    lesson: {
      type: new GraphQLList(LessonType),
      resolve(parent, args) {
        return LessonModel.find({ teacherId: parent.id })
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
        return TeacherModel.findById(parent.teacherId)
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
        return TeacherModel.findById(args.id)
      }
    },
    Lesson: {
      type: LessonType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return LessonModel.findById(args.id)
      }
    },
    allTeachers: {
      type: new GraphQLList(TeacherType),
      resolve() {
        return TeacherModel.find()
      }
    },
    allLessons: {
      type: new GraphQLList(LessonType),
      resolve() {
        return LessonModel.find()
      }
    }
  }
})



const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTeacher: {
      type: TeacherType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let newTeacher = new TeacherModel({
          name: args.name,
          age: args.age
        })
        return newTeacher.save()
      }
    },
    addLesson: {
      type: LessonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        group: { type: GraphQLString },
        teacherId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newLesson = new LessonModel({
          name: args.name,
          group: args.group,
          teacherId: args.teacherId
        })
        return newLesson.save()
      }
    },
  }
})



module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })