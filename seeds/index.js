const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// let DB_URL = 'mongodb://localhost:27017/yelp-camp';
let DB_URL = 'mongodb://our-first-user:2gVJHmqTeWiDy8TC@ac-8squill-shard-00-00.3er2y43.mongodb.net:27017,ac-8squill-shard-00-01.3er2y43.mongodb.net:27017,ac-8squill-shard-00-02.3er2y43.mongodb.net:27017/?ssl=true&replicaSet=atlas-30x16n-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "62eb7cf105fc68381467d5b1",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drvm18pkj/image/upload/v1659594238/YelpCamp/ytvpno38xuxcsimhj4ml.jpg',
                    filename: 'YelpCamp/ytvpno38xuxcsimhj4ml' 
                },
                {
                    url: 'https://res.cloudinary.com/drvm18pkj/image/upload/v1659189428/YelpCamp/kdeohkvkdulyd7onwq0w.jpg',
                    filename: 'YelpCamp/kdeohkvkdulyd7onwq0w'
                   
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})