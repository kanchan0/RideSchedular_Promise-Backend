const db = require("../Database/database")

function RideAcceptance(rej,res){
    const driver_id=rej.body.driver_id;
    const ride_id = rej.body.ride_id;
    const secret_token = rej.body.secret_token;
    
    db.queryAsync(`select job_token from userrides where id=${ride_id}`)
     .then(function(job_token){
         
            if(secret_token==job_token[0].job_token){
                return db.queryAsync(`update userrides set status="assigned" where status="requesting" and id=${ride_id}`)
            }
    })
    .then((result)=>{
        var result = result.affectedRows;
        if(result===0){
            res.send({status:false,message:"a driver alredy assigned for the ride"})
        }else{

            return db.queryAsync(`update driverdetails set status=0 where id=${driver_id}`)
        }
    })
    .then((result)=>{
        if(result){
            res.send({status:true,message:"you are assigned the ride  with id ${ride_id}"})
        }
    })
    .catch((Err)=>{
        
        res.send({status:101,message:"you are not authorized to request for this ride"})
        
    })
    
}

module.exports={
    RideAcceptance
}