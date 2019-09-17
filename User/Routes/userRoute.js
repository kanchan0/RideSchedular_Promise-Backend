const userController = require("../Controller/userController")

const responseBooking = (req,res) =>{
    userController.showbooking(req).then((result)=>{
        res.send({status:200,message:"success",data:result})
    }).catch(err=>err);
    
}

const responseLogin = (req,res) => {
    userController.login(req).then((result)=>{
        res.send(result)
    }).catch(err=>err)
}

const responseSignup = (req,res) => {
    userController.signUpPage(req).then((result)=>{
        res.send(result)
    }).catch(err=>err)
}

const responseCreateBooking = (req,res) => {
    userController.createbooking(req).then((result)=>{
        res.send(result)
    }).catch(Err=>Err)

}

module.exports ={
    responseBooking,
    responseSignup, 
    responseLogin,
    responseCreateBooking
}