const Promise       = require("bluebird");
const db            = require("../../Database/database")

module.exports={
    getbooking,
    checkForDuplicate,
    signUp,
    Authorization_For_phone,
    Extracting_Admindetails,
    creatingRides
};


function getbooking(req){
    return new Promise((resolve,reject)=>{

        const sql=`select userdata.name,userdata.email,userdata.phone ,userrides.source,userrides.destination,userrides.date_time 
        from userrides 
        inner join userdata 
        on userrides.foreign_user_id=userdata.id limit ${req.query.limit} offset ${req.query.offset};`;

        
        db.queryAsync(sql)
            .then((result)=>{
                resolve(result)
            },(error)=>{
                reject(error);
            });
    });
}

function checkForDuplicate(email,phone){
    return new Promise((resolve,reject)=>{
       
        let sql1 = `select * from userdata where email= ? OR phone = ? ;`
        db.queryAsync(sql1,[email,phone])
            .then((users)=>{
                resolve(users)
            },(error)=>{
                reject(error)
            })
    })
}

function signUp(userData){
    return new Promise((resolve,reject)=>{

        let sql ="INSERT INTO userdata set ?;"
        db.queryAsync(sql,userData)
             .then((result)=>{
                resolve({status:true,message:"User is successfully created"})
            },(error)=>{
                reject(error)
            })  
    })
}

function Authorization_For_phone(phone) {
    return new Promise((resolve,reject)=>{
        let sql =`select * from userdata where phone=${phone};`
        db.queryAsync(sql)
        .then((users)=>resolve(users),
        (error)=>reject(error))
    })
}

function Extracting_Admindetails(){
    return new Promise((resolve,reject)=>{
        let sql = "select * from Admin;"
        db.queryAsync(sql)
        .then((admin)=>resolve(admin),
        (error)=>reject(error))
    })
}

function creatingRides(RideData,admin_id,latitude,longitude){
    return new Promise((resolve,reject)=>{

        let sql=`INSERT INTO userrides (location,source,destination,date_time,foreign_user_id,foreign_admin_id,job_token) 
                VALUES (ST_GeomFromText('POINT(${latitude} ${longitude})'),
                '${RideData.source}','${RideData.destination}',
                '${RideData.date_time}',${RideData.foreign_user_id},${admin_id},${RideData.job_token});`;

        db.queryAsync(sql).then((result)=>{
            console.log("1 record entered successfully in rideData")
            resolve({status:true,message:"data inserted for ride details successfully"})
        },
        (error)=>reject(error))
    })
}