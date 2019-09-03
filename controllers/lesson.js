const lessonModels = require('../models/lessonModels')
const userLessonModels = require('../models/user_LessonModels')
const userModels = require('../models/userModels')
const paymentModels = require('../models/paymenyModels')
const {formatDate} = require('../utils/formatDate');
const {formatTime} = require('../utils/formatDate');

const lessonController={
    update: async function(req,res,next){
        let id = req.params.id;
        let date = req.body.date;
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        let status = req.body.status;
        try{
            await lessonModels.update(id,{date,start_time,end_time,status})
            res.json({
                code:200,
                message:'修改成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'修改失败'
            })
        }
    },
    single: async function(req,res,next){
        let id = req.params.id;
        try{
            let lessons = await lessonModels.single(id);
            let lesson = lessons[0];
            lesson.date ? lesson.date=formatDate(lesson.date) : ''
            let userLesson  = await userLessonModels
                .where({lesson_id:id})
                .leftJoin('user','user_lesson.user_id','user.id')
                .column('user.id','user.name','user.phone','user.sms_phone','user_lesson.status','user_lesson.finish_at',{userLesson_id:'user_lesson.id'})
            
            userLesson.forEach( data =>{
                data.finish_at === null ? null : data.finish_at = formatTime(data.finish_at)
            })

            res.json({
                code:200,
                data:{
                    lesson:lesson,
                    user:userLesson
                }
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'查找失败'
            })
        }
    },
    click: async function(req,res,next){
        let id = req.params.id;
        let status = req.body.status;
        let finish_at = new Date()
        if( isNaN(status) || !finish_at){
            res.json({
                code:0,
                message:'缺少参数'
            })
        }
        
        try{
            let statusUseres = await userLessonModels.single(id)
            let statusUser =statusUseres[0]
            if(statusUser.status===2){
                res.json({
                    code:0,
                    message:'该用户已上课'
                })
                return
            }
            let lessones = await lessonModels.where({id:statusUser.lesson_id})
            let lesson = lessones[0]
            let price = -(lesson.price)
            await paymentModels.insert({
                status:2,
                user_id: statusUser.user_id,
                total: price,
                remark: '用户ID  '+statusUser.user_id+'  上课'
            });
            await userLessonModels.update(id,{status,finish_at})
            await userModels
                .where({id: statusUser.user_id})
                .increment({balance:price})
            res.json({
                code:200,
                message:'打卡成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'修改失败'
            })
        }
    }
}

module.exports = lessonController;
