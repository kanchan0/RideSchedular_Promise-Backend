const Promise           =   require("bluebird");
const bcrypt            =   require("bcrypt");
const driverServices    =   require("../../Driver/services/driverServices");
const joi               =   require("../../Driver/Validator/driverValidator")

const signUpPage = (req) => {
   return new Promise((resolve,reject)=>{
        Promise.coroutine(function* (){
        
            
            const {name,email,password,phone,age,address}=req.body;
            const driverData={
                name,
                email,
                password,
                phone,
                age,
                address
            }  
            const {error}=joi.validateUser(driverData);
            
            if(error){  
                res.status(400).send({status:400,message:`${error.details[0].message}`}); 
                return; 
                }
                
                        driverData.password = bcrypt.hashSync(password,10)
                        const users = yield driverServices.checkForDuplicate(email,phone);

            if(users.length===0){
                resolve(yield driverServices.signUp(driverData))    
            } else {
                resolve({status:false,message:"driver is already registered with us"})
            }

        })().then((result)=>{result})
            .catch((err)=>reject(err))
        
    })   
}



const login = (req)=> {
    return new Promise((resolve,reject)=>{
            Promise.coroutine(function* (){
                let phone       =   req.body.phone;
                let password    =   req.body.password
    
                const user = yield driverServices.Authorization_For_phone(phone)

                if(user.length ===0){
                    resolve({status:false,message:"driver is not registred with us,please signup"})
                }else{
                    bcrypt.compare(password,user[0].password,(err,result)=>{
            
                        if(result){
                            resolve({status:true,message:"Authentication suceesfull,logged In"})
                        } else {
                            resolve({status:false,message:"Password is incorrect,please try again"})
                        }
                    })
                 }
             })().then((result)=>{result})
                 .catch((error)=>reject(error))
    })
}
    

module.exports          =   { signUpPage, login}

