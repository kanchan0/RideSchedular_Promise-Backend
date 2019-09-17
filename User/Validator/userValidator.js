const Joi = require("joi")
let validateUser=(data)=>{

    const schema=Joi.object().keys({
        name:Joi.string().min(3).max(30),
        email:Joi.string().email({minDomainSegments:2}),
        password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        phone:Joi.string().regex(/^[0-9]{10}$/).required(),
        age:Joi.number().min(18).max(65),
        address:Joi.string()
    })
   return Joi.validate(data,schema);
}


const timeValidator=(date_time)=>{

    let userDate = new Date(date_time)
    let today = new Date()
    let today1 = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds())

    if(userDate>=today1){
        return true;
    }  else{
        return false
    }     

}

module.exports={
    validateUser,
    timeValidator
}
