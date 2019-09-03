const classModels = require('../models/classModels')
const lessonModels = require('../models/lessonModels')
const {formatTime} = require('../utils/formatDate');
const {formatDate} = require('../utils/formatDate');
const userClassModels = require('../models/user_classModels')
const userLessonModels = require('../models/user_LessonModels')

const classController ={
    //增加班级
    insert: async function(req,res,next){
        let name = req.body.name;
        let description = req.body.description || '';
        let course_id = req.body.course_id;
        let price = req.body.price;
        let lesson_count = req.body.lesson_count;
        let status = req.body.status;
        let start_at = req.body.start_at;
        let end_at = req.body.end_at;
        if(!name || !course_id || !price || !lesson_count || !status || !start_at || !end_at){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            let classes = await classModels.insert({name,description,course_id,price,lesson_count,status,start_at,end_at})
            let classID = classes[0]
            let lessonPrice = price/lesson_count;
            lessonNum=Number(lesson_count);
            let newlesson = new Array(lessonNum).fill({class_ID:classID,price:lessonPrice});
            await lessonModels.insert(newlesson)
            res.json({
                code:200,
                massage:'添加成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'添加失败'
            })
        }
    },
    // 查找全部班级 不翻页
    allClass:async function(req,res,next){
        try{
            let allClass = await classModels.whole()
            allClass.forEach(data => {
                data.created_at = formatDate(data.created_at)
                data.start_at = formatDate(data.start_at)
                data.end_at = formatDate(data.end_at)
            })
            res.json({
                code:200,
                data:allClass,
            })
        }catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'查找失败'
            })
        }
    },
    // 查找全部班级
    all: async function(req,res,next){
        let name = req.query.name;   //查找班级名称
        let course_id = req.query.course_id // 查找课程名称
        let status = req.query.status // 查找班级状态
        // 查找的每页显示多少数据
        let pageSize = req.query.page_size || 20;
        // 查找页数
        let nowPage = req.query.now_page || 1;
        //查找结束时间
        let startAt = req.query.start_at;
        let endAt = req.query.end_at; 
        let filterColumn = endAt ? 'class.end_at' : ''
        let params ={};
        if(name)params['class.name'] = name
        if(course_id)params.course_id = course_id
        if(status)params. status= status
        try{
            let all = await classModels
                .pagination(pageSize,nowPage,params,{
                    column:filterColumn,
                    startAt: startAt,
                    endAt: endAt,
                })
                //匹配 课程表 和 课表
                .leftJoin('course','class.course_id','course.id')
                .column('class.id',{class_name:'class.name'},'class.course_id',{course_name:'course.name'},'class.price','class.lesson_count','class.status','class.start_at','class.end_at')
                .orderBy('id','desc');
            //格式化时间 
            all.forEach(data => {
                data.start_at = formatDate(data.start_at)
                data.end_at = formatDate(data.end_at)
            })
            //
            let allCount = await classModels.count(params,{
                column: filterColumn,
                startAt: startAt,
                endAt :endAt
            })
            let total = allCount[0].total;
            res.json({
                code:200,
                data:{
                    datas:all,
                    pagination:{
                        total:total,  //总共数据量
                        page_size:pageSize, //当页数据量
                        now_page:nowPage  //页数
                    }
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
    // 修改班级
    update: async function(req,res,next){
        let name = req.body.name;
        let description = req.body.description || '';
        let course_id = req.body.course_id;
        let status = req.body.status;
        let start_at = req.body.start_at;
        let end_at = req.body.end_at;
        let id = req.params.id;
        if(!name || !course_id || !status || !start_at || !end_at){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            await classModels.update(id,{name,description,course_id,status,start_at,end_at})
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
    // 查找班级
    single: async function(req,res,next){
        let id = req.params.id;
        try{
            let single = await classModels.where({'class.id':id})
                //匹配 课程表 和 课表
                .leftJoin('course','class.course_id','course.id')
                .column({class_id:'class.id'},{class_name:'class.name'},'class.course_id',{course_name:'course.name'},'class.price','class.description','class.lesson_count','class.status','class.created_at','class.start_at','class.end_at')
                .orderBy('class.id','desc');
            single.forEach(data => {
                data.created_at = formatDate(data.created_at)
                data.start_at = formatDate(data.start_at)
                data.end_at = formatDate(data.end_at)
            })
            let class_user = await userClassModels.where({'class_id':id})
                .leftJoin('user','user_class.user_id','user.id')
                .column('user.id','user.name','user.phone','user.sms_phone','user_class.created_at')
            class_user.forEach(data => {
                data.created_at = formatDate(data.created_at)
            })    
            let lesson = await lessonModels.where({'class_ID':id})
            lesson.forEach(data => {
                data.date ? data.date=formatDate(data.date) : '' 
            })
            res.json({
                code:200,
                class:single,
                user:class_user,
                lesson:lesson,
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
    //用户报班
    addUser: async function(req,res,next){
        let id = req.params.id;
        let user_id = req.body.user_id;
        if(!user_id){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            let userClasses = await userClassModels.where({user_id,class_id:id})
            let userClass = userClasses.length > 0 
            if(userClass){
                res.json({
                    code:0,
                    message:'该用户已报课'
                })
                return
            }
            let idNum = Number(id)
            let classMaxs = await classModels.where({id:idNum})
            let classMax = classMaxs.length <= 0
            if(classMax){
                res.json({
                    code:0,
                    message: '没有找到该班级'
                })
                return
            }
            let userLessons = await lessonModels.where({class_ID:id})
            let userLesson= userLessons.map(data =>{
                return{
                    user_id : user_id,
                    class_id : id,
                    lesson_id : data.id
                }
            })
            await userClassModels.insert({user_id,class_id:id})
            await userLessonModels.insert(userLesson)
            res.json({
                code:200,
                message:'报课成功',
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'报课成功'
            })
        }
    }
}
module.exports = classController;