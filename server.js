const express           =   require('express');
const bodyParser        =   require('body-parser');
const app               =   express();
const user              =   require("./User/Controller/userController")
const userHandler       =   require("./User/Routes/userRoute")

const driver            =   require("./Driver/Controller/driverController")
const driverHandler     =   require("./Driver/Routes/driverRoutes")
const assignBooking     =   require("./Schedular/booking_assignment")
const accept            =   require("./Schedular/driversRideAcceptance")



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/user/showBookings",userHandler.responseBooking,user.showbooking);
app.post("/user/signup",userHandler.responseSignup,user.signUpPage);
app.post("/user/login",userHandler.responseLogin,user.login);
app.post("/user/create_Booking",userHandler.responseCreateBooking,user.createbooking)


app.post("/driver/signup",driverHandler.responseSignup,driver.signUpPage);
app.post("/driver/login",driverHandler.responseLogin,driver.login);

assignBooking.assignBooking();
app.post("/driver/accept",accept.RideAcceptance)


app.set('port',process.env.PORT||8000);
app.listen(app.get('port'),()=>{
    console.log(`We are up on port number ${app.get('port')} `);
});

