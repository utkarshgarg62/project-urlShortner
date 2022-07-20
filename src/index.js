const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose= require('mongoose');


const app = express();
app.use(bodyParser.json());

//===================================================[Data-Base Connection]=================================================================

mongoose.connect("mongodb+srv://lavverma:8573007234@cluster0.hdldl.mongodb.net/group23Database?retryWrites=true&w=majority", { 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected succsessfully"))
.catch ( err => console.log(err) )


//===================================================[Data-Base Connection]=================================================================


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});