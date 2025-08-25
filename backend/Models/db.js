const { default: mongoose } = require('mongoose');
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('Mongodb conected');
    }).catch((err)=>{
        console.log('error',err)
    })