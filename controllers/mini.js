const userModels = require('../models/userModels')
const lessonModels = require('../models/lessonModels')
const {formatDate} = require('../utils/formatDate');
const {formatTime} = require('../utils/formatDate');
const userClassModels = require('../models/user_classModels')
const leaveModels = require('../models/leaveModels')
const user_lessonModels = require('../models/user_lessonModels')

const miniController={
  class: async function(req,res,next){
    let user_id = req.params.user_id;  //传用户ID
    try{
      let classInfo = await userClassModels
      .where({user_id:user_id})
      .leftJoin('class','user_class.class_id','class.id')
      .column('class.id','class.name','class.description','class.start_at','class.end_at','class.status')

      classInfo.forEach(data=>{
        data.start_at ?  data.start_at = formatDate(data.start_at) : '-'
        data.end_at ? data.end_at = formatDate(data.end_at) : '-'
      })
      res.json({
        code:200,
        data:{
          classInfo:classInfo
        }
      })
    }catch(err){
      res.json({
        code:0,
        message:'信息获取失败'
      })
    }
  },
  lesson: async function(req,res,next){
    let class_id = req.params.class_id;
    let user_id = req.params.user_id;

    try{
      let lessons = await user_lessonModels.show({ user_id, 'user_lesson.class_id':class_id })
        .leftJoin('lesson', 'user_lesson.lesson_id', 'lesson.id')
        .column('user_lesson.id', 'user_lesson.lesson_id', 'user_lesson.class_id', 'user_lesson.status', 'user_lesson.user_id',
          'lesson.date','lesson.start_time', 'lesson.end_time');
        lessons.forEach(data => {
          data.date = data.date ? formatDate(data.date) : '-';
          data.start_time = data.start_time == null ? '-' : data.start_time ;
          data.end_time = data.end_time == null ? '-' : data.start_time ;
        })
      res.json({code:200, data: { lessons: lessons}})
    }catch(err){
      console.log(err)
      res.json({
        code:0
      })
    }
  },
  leave: async function(req,res,next){
    let id = req.params.id;
    let user_id = req.body.user_id;
    let class_id = req.body.class_id;
    let lesson_id = req.body.lesson_id
    try{
      let userLessons = await user_lessonModels.show({ id });
      if(userLessons[0].status === 2) {
        res.json({code:0, message: '该课时以上课无法请假'});
        return
      }
      if(userLessons[0].status === 1) {
        res.json({code:0, message: '该课时已请假'});
        return
      }
      await leaveModels.insert({ user_id, class_id, lesson_id });
      let finish_at = new Date()
      await user_lessonModels.update(id, { status: 1 ,finish_at});
      res.json({code:200,message: 'success'});
    }catch (e) {
      console.log(e)
      res.json({code:0,message: '服务器错误'});
    }
  }
}

module.exports = miniController;