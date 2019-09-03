const managerModels = require('../models/managerModels')

const managerController ={
    //增加管理员
    insert: async function(req,res,next){
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        if(!name || !phone || !password){
            res.json({
                code:0, 
                message:'缺少参数'
            })
            return
        }
        try{
            await managerModels.insert({name,phone,password})
            res.json({
                code:200,
                massage: '添加成功'
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
    // 查找管理员
    single: async function(req,res,next){
        let id = req.params.id;
        try{
            const single = await managerModels.single(id)
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
    //查找全部管理员
    all: async function(req,res,next){
        try{
            const all = await managerModels.all()
            res.json({
                code:200,
                data:all,
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
    //修改管理员
    update: async function(req,res,next){
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        let id = req.params.id;
        if(!name || !phone || !password){
            res.json({
                code:0, 
                massage:'缺少参数'
            })
            return
        }
        try{
            await managerModels.update(id,{name,phone,password})
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
    // 删除管理员
    delete:async function(req,res,next){
        let id = req.params.id;
        let isdeleted = 1;
        try{
            await managerModels.update(id,{isdeleted})
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
module.exports = managerController;
