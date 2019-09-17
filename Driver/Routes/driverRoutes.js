const driverController = require("../../Driver/Controller/driverController")



const responseLogin = (req,res) => {
    driverController.login(req).then((result)=>{
        res.send(result)
    }).catch(err=>err)
}

const responseSignup = (req,res) => {
    driverController.signUpPage(req).then((result)=>{
        res.send(result)
    }).catch(err=>err)
}

module.exports ={
    responseSignup, 
    responseLogin
}