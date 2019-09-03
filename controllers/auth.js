const managerModels =  require('../models/managerModels')
const authcode = require('../utils/authcode')

const authController ={
    login: async function(req,res,next){
        let phone = req.body.phone;
        let password = req.body.password;
        if(!phone || !password){
            res.json({
                code:0,
                message:'缺少参数'
            })
            return
        }
        try{
            let manageres= await managerModels
                .where({phone,password})
                .whereNull('isdeleted')
            let manager = manageres.length > 0 
            if(!manager){
                res.json({
                    code:0,
                    message: '手机号或密码错误'
                })
                return
            }
            let encryption = manageres[0].phone+'/t'+manageres[0].name+'/t'+manageres[0].id
            let token = authcode(encryption,'INCODE')
            res.json({
                code:200,
                data: manageres[0],
                token:token
            })
        }
        catch(err){
            console.log(err)
            res.json({
                code:0,
                message:'服务器错误'
            })
        }
    }

}
module.exports = authController;
