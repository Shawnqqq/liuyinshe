const lessonModels = require('../models/lessonModels')
const userModels = require('../models/userModels')
const paymentModels = require('../models/paymenyModels')
const leaveModels = require('../models/leaveModels');
const userLessonModels = require('../models/user_LessonModels')
const {formatDate} = require('../utils/formatDate');
const {formatTime} = require('../utils/formatDate');

const leaveController ={
  index: async function(req,res,next){
    try{
      let leaves = await leaveModels
        .whole()
        .leftJoin('user', 'leave.user_id', 'user.id')
        .leftJoin('lesson', 'leave.lesson_id', 'lesson.id')
        .leftJoin('class', 'leave.class_id', 'class.id')
        .column('leave.id', 'leave.lesson_id', 'leave.class_id', 'leave.user_id', 'leave.status',
          'lesson.date', 'lesson.start_time', 'lesson.end_time', 'class.name', 
          {'user_name': 'user.name'})

        leaves.forEach(data => {
          data.date = data.date ? formatDate(data.date) : '-';
        });

        res.json({
          code:200,
          data:leaves
        })
    }catch(err){
      console.log(err)
    }
  },
  click: async function(req,res,next){
    let id = req.params.id;
    let status = req.body.status;
    let lesson_id = req.body.lesson_id;
    let user_id = req.body.user_id;

    if( isNaN(status) || !lesson_id || !user_id){
      res.json({
          code:0,
          message:'缺少参数'
      })
    }
    try{
      // 检查是否已补课
      let statusleaves = await leaveModels.single(id)
      let statusleave = statusleaves[0]
      console.log(statusleave.status)
      if(statusleave.status == 1){
        res.json({
          code:0,
          message:'该用户已补课'
        })
        return
      }
      //修改补课状态
      await leaveModels.update(id,{status});
      //匹配 课
      let userLessons = await userLessonModels.show({ user_id, lesson_id });
      let userLesson = userLessons[0];
      if(!userLesson) {
        res.json({code:0,messsage: '没匹配到课时'});
        return
      }
      if(userLesson.status === 2) {
        res.json({code:0,messsage: '该课时以上课，无法修改状态'});
        return
      }

      // 新增消费记录
      let lessons = await lessonModels.where({id: lesson_id})
      let lessonInfo = lessons[0];
      let total = -(lessonInfo.price);
      await paymentModels.insert({ 
        user_id: user_id, 
        status: 2, 
        total: total, 
        remark:  '用户ID  '+user_id+'  补课'
      })

      // 更改 渲染状态
      await userLessonModels.update(userLesson.id, { status: 1, finish_at: new Date()});

      // 扣费
      await userModels
        .where({id: user_id})
        .increment({balance:total})
      res.json({
        code:200,
        message:'补课成功'
      })

    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'补课失败'
      })
    }
  }
}

module.exports = leaveController