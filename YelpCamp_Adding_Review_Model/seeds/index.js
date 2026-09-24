const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('Database connected');
        await seedDB();
        await mongoose.connection.close();
        console.log('Seed complete');
    })
    .catch(err => {
        console.log('Mongo connection error:');
        console.log(err);
        process.exit(1);
    });

const db = mongoose.connection;

db.on('error', err => {
    console.log('Connection error:');
    console.log(err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const images = [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'
];

const seedDB = async () => {
    try {
        await Campground.deleteMany({});
        for (let i = 0; i < 50; i++) {
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const camp = new Campground({
                location: `${cities[random1000].city}, ${cities[random1000].state}`,
                title: `${sample(descriptors)} ${sample(places)}`,
                image: sample(images),
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
                price
            });
            await camp.save();
        }
    } catch (err) {
        console.log('Seeding failed:');
        console.log(err);
        process.exit(1);
    }
};