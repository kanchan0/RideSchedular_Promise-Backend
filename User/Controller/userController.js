const Promise           =   require("bluebird");
const bcrypt            =   require("bcrypt");
const userServices      =   require("../services/userServices");
const joi               =   require("../Validator/userValidator")

const signUpPage = (req) => {
   return new Promise((resolve,reject)=>{
        Promise.coroutine(function* (){
            const { name, email, password, phone } = req.body;

            if(name===undefined||email===undefined||password===undefined||phone===undefined){
                resolve({status:false,Error_mesage:"Required fields are empty"});
                return 
            }

            const userData = { name, email, password, phone } 
            const {error}=joi.validateUser(userData);
 
            if(error){  
                resolve({status:400,message:`${error.details[0].message}`}); 
                return; 
            }
    
            userData.password = bcrypt.hashSync(password,10)
            const users = yield userServices.checkForDuplicate(email,phone);

            if(users.length===0){
                resolve(yield userServices.signUp(userData))    
            } else {
                resolve({status:false,message:"user is already registered with us"})
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
    
                if(password===undefined||phone===undefined){
                    resolve({status:false,Error_mesage:"Required fields are empty"});
                    return 
                }

                const user = yield userServices.Authorization_For_phone(phone)

                if(user.length ===0){
                    resolve({status:false,message:"user is not registred with us,please signup"})
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
    

const showbooking = (req) => {
    return new Promise((resolve,reject)=>{
        Promise.coroutine(function*(){
            return yield userServices.getbooking(req)
        })().then((data)=>{
            resolve(data);
        },(err)=>reject(err));
    })
}


const createbooking = (req)=>{
    return new Promise((resolve,reject)=>{
        Promise.coroutine(function* (){
            const {date_time,source,destination,location,phone,job_token}=req.body;
            if(date_time===undefined||source===undefined||destination===undefined||location===undefined||phone===undefined||job_token===undefined){
                resolve({status:false,Error_mesage:"Required fields are empty"});
                return 
            }

            let RideData={
                
                date_time,
                source,
                destination,
                foreign_user_id:null,
                job_token
            }  
            let location1 = location.split(" ")
            let latitude = location1[0];
            let longitude=location1[1];

            const {error}=joi.validateUser({phone});
 
            if(error){  
                resolve({status:400,message:`${error.details[0].message}`}); 
                return; 
            }

            let user = yield userServices.Authorization_For_phone(phone)
            if(user.length!== 0){
                RideData['foreign_user_id'] = user[0].id;
            }

            if(RideData['foreign_user_id']!==null){
                let result = joi.timeValidator(date_time)
                console.log("result",result)
                if(result){
                    let admin = yield userServices.Extracting_Admindetails()
                    if(admin.length!==0){
                        var admin_id = admin[0].id
                        resolve(yield userServices.creatingRides(RideData,admin_id,latitude,longitude))
                    }else{
                        throw "No admin is there";
                    }
                }else{
                    resolve({status :false,message:"date or time is invalid"})
                }
            }else{
                resolve({status:false,message:"user not registered"})
            }


        })().then((data)=>data)
            .catch(err=>reject(err))
     })
}





module.exports          =   { signUpPage, showbooking, login, createbooking }

