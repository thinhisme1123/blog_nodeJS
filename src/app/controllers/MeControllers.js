//chứa function handler
const Course =  require('../models/Courses')
const {mongoosesObject} = require('../../util/mongoose')
// lí do phải có lean() cho hai method bên dưới là phiên bản mới của nodeJS đã thay đổi thi dùng 
// find hoặc các method khác thì phải thêm lean() vào mới có thể chạy bình thường

class MeControllers {
    // [POST] stored/course
    storedCourse(req, res,next) {
        let courseQuery = Course.find({}).lean()
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted:true})])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-course', {
                    deletedCount,
                    courses
                })
            })
            .catch(next) 
    }

    // [POST] trash/course
    trashCourse(req, res,next) {
        Course.findWithDeleted({ deleted: true }).lean()
            .then(courses => {
                res.render('me/trash-course', {courses})
            })
            .catch(next)
    }


}

module.exports = new MeControllers();
