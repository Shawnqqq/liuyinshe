const courseModels = require('../models/courseModels')

const courseController ={
    //增加课程
    insert: async function(req,res,next){
        let name = req.body.name;
        let description = req.body.description || '';
        let teacher = req.body.teacher;
        let teacher_phone = req.body.teacher_phone;
        if(!name || !teacher || !teacher_phone){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            await courseModels.insert({name,description,teacher,teacher_phone})
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
    // 查找课程
    single: async function(req,res,next){
        let id = req.params.id;
        try{
            const single = await courseModels.single(id)
            res.json({
                code:200,
                data:single,
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
    // 查找全部课程
    all: async function(req,res,next){
        let name = req.query.name;  //查找课程名称
        let teacher = req.query.teacher //查找老师名称
        // 查找的每页显示多少数据
        let pageSize = req.query.page_size || 20;
        // 查找页数
        let nowPage = req.query.now_page || 1;
        let params ={};
        if(name)params.name = name
        if(teacher)params.teacher = teacher
        try{
            let all = await courseModels
                .coursePagination(pageSize,nowPage,params)
                .orderBy('id','desc');
            let allCount = await courseModels.count(params)
            let total = allCount[0].total;
            res.json({
                code:200,
                data:{
                    datas:all,
                    pagination:{
                        total:total, //总共数据量
                        page_size:pageSize, //当页数据量
                        now_page:nowPage //页数
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
    //修改课程
    update: async function(req,res,next){
        let name = req.body.name;
        let description = req.body.description;
        let teacher = req.body.teacher;
        let teacher_phone = req.body.teacher_phone;
        let id = req.params.id;
        if(!name || !description || !teacher || !teacher_phone){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            await courseModels.update(id,{name,description,teacher,teacher_phone})
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
    // 删除课程
    delete:async function(req,res,next){
        let id = req.params.id;
        let isdeleted = 1;
        try{
            await courseModels.update(id,{isdeleted})
            res.json({
                code:200,
                message:'删除成功'
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'删除失败'
            })
        }
    }
}
module.exports = courseController;