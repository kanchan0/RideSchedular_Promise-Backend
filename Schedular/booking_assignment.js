const scheduler      = require('node-schedule');
const db             = require("../Database/database");
var FCM              = require('fcm-node');
const Promise        = require("bluebird");


var serverKey = 'AAAA1oSX3tQ:APA91bE3F8MPEwiHH1b1DamPWi9VYn7UphmLFAUnpEeTiJ29_VdQN0JQPjocVuJPigAK8yjG0bu3HYWBwvaXuFfFlyr_rHtu5JkiJnQPoY2XDN-8Se1jK-I-Aft3PouNC4AuA9UrLV12'; //put your server key here
var fcm = new FCM(serverKey);
            

const assignBooking = () =>{
    var sql = "select * from userrides;"
    db.queryAsync(sql).then((rides)=>{
        
        for(ride of rides){
            
                let time = new Date(ride.date_time.setMinutes(ride.date_time.getMinutes() - 30));
                scheduler.scheduleJob(time,function(){
                   
                   console.log("notification for ride acceptance is being send to all the free drivers.")
                   sendNotification();

                    // db.queryAsync("select * from driverdetails where status = 1;")
                    // .then((result)=>{
        
                    //     let drive_id = result[0].id;
                    //     db.queryAsync(`update userrides set status="assigned",foreign_driver_id=${drive_id} where id=${ride.id}`)
                    //     return db.queryAsync(`update driverdetails set status=0 where id=${result[0].id} ;`)   
                    
                    // })
                    // .then(result=>{console.log(result);})

  
                })     
        }
    })
    

}



function sendNotification(){
    var message = { 
        to: '', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        return new Promise((resolve,reject)=>{
            if (err) {
                reject("Something has gone wrong!");
            } else {
                resolve("Successfully sent with response: ", response);
            }
        }).then(result=>console.log(result))
            .catch(err=>console.log(err))                    
    })
}


module.exports = {
    assignBooking
}
