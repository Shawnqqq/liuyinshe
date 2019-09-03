const authcode = require('../utils/authcode');
const managerModels = require('../models/managerModels')

var middleAuth = async function(req,res,next){
    try{
        // let token = req.headers.token
        // if(!token){
        //     res.json({
        //         code:0,
        //         message:'未登录，请先登录'
        //     })
        //     return
        // }
        // // 解密
        // let manageres = authcode(token,'DECODE');
        // if(manageres.length<1){
        //     res.json({
        //         code:200,
        //         message:'该管理员账号无效'
        //     })
        //     return
        // }
        // let manager = manageres.split('/t')
        // // 与数据库账号比对
        // let clock = await managerModels
        //     .where({phone:manager[0],name:manager[1],id:manager[2]})
        // let clockes = clock.length>0
        // if(!clockes){
        //     res.json({
        //         code:0,
        //         message:'该管理员账号不存在'
        //     })
        //     return
        // }
        // res.locals.managerID = clock[0].id
        next()
    }
    catch(err){
        res.json({
            code:0,
            message:'服务器错误'
        })
    }
}
    

module.exports =  middleAuth;