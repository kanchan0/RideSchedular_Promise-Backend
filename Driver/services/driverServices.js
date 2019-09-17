const Promise       = require("bluebird");
const db            = require("../../Database/database")

module.exports={
    checkForDuplicate,
    signUp,
    Authorization_For_phone
};

function checkForDuplicate(email,phone){
    return new Promise((resolve,reject)=>{
       
        let sql1 = `select * from driverdetails where email= ? OR phone = ? ;`
        db.queryAsync(sql1,[email,phone])
            .then((users)=>{
                resolve(users)
            },(error)=>{
                reject(error)
            })
    })
}

function signUp(driverData){
    return new Promise((resolve,reject)=>{

        let sql ="INSERT INTO driverdetails set ?;"
        db.queryAsync(sql,driverData)
             .then((result)=>{
                resolve({status:true,message:"User is successfully created"})
            },(error)=>{
                reject(error)
            })  
    })
}

function Authorization_For_phone(phone) {
    return new Promise((resolve,reject)=>{
        let sql =`select * from driverdetails where phone=${phone};`
        db.queryAsync(sql)
        .then((users)=>resolve(users),
        (error)=>reject(error))
    })
}

