const colorette = require('colorette');

async function connectToAtlas() {
  const mongoose = await require('mongoose');
  mongoose.set('strictQuery', false);
  //* mongoose.connect(urlParam,{options to resolve depricated warninigs })
  let a = await mongoose
    .connect(
      'mongodb://yourschoolsoftware:Buddha123@ac-xj38pzw-shard-00-00.tcnkljr.mongodb.net:27017,ac-xj38pzw-shard-00-01.tcnkljr.mongodb.net:27017,ac-xj38pzw-shard-00-02.tcnkljr.mongodb.net:27017/?ssl=true&replicaSet=atlas-eae8ut-shard-0&authSource=admin&retryWrites=true&w=majority&appName=SchoolCluster',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log('db connected');
      console.log(
        colorette.bold(
          `Success ${colorette.bgGreen(
            colorette.white(' Database ')
          )} Connected ✔️`
        )
      );
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}

module.exports = connectToAtlas;

//? useCase direction
// const connectDB = require('./configs/database');
// const DATABASE_URL = process.env.DATABASE_URL;
// connectDB(DATABASE_URL);
