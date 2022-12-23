require('dotenv/config');

const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require("./routes/Auth.routes");
const reviewRoutes = require("./routes/Review.routes")
const bookingRoutes = require("./routes/Bookings.routes")
const app = express();


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
.then(x =>{
 console.log('connected to database name:', x.connections[0].name);
})
.catch(err => console.log('error connecting to db', err));

app.set('trust proxy', 1);

app.use(
    cors({
      credentials: true,
      origin: '*',
    //   origin: [process.env.FRONTEND_URL]
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use("/user", reviewRoutes);
app.use("/event", bookingRoutes)



app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
});