const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fs = require('fs')
const readline = require('readline');
const app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'))
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pass}@cluster0-----------`, { useNewUrlParser: true })
const mashSchema = new mongoose.Schema({
    id: Number,
    url: String,
    rating: Number,
    votes: Number
})
const Mash = mongoose.model('FaceMash', mashSchema);
const aggregate = Mash.aggregate([
    { $project: { id: 1, url: 1, rating: 1, votes: 1 } }
]);

let totalRecords;
Mash.countDocuments({}, function (err, c) {
    totalRecords = c;
    console.log("Total objects: "+c);
});

app.get('/', function (req, res) {
    let random = Math.floor(Math.random() * (+totalRecords - 1));
    Mash.find({}).limit(1).skip(random).exec((err, result) => {
        if (err) throw err;
        random = Math.floor(Math.random() * (+totalRecords - 1));
        Mash.find({}).limit(1).skip(random).exec((err, result2) => {
            res.render('index', { data: [result[0], result2[0]] });
        });
    });
});

app.post('/', urlencodedParser, function (req, res) {
    Mash.find({ url: req.body.url }).exec(function (err, docs) {
        if (err) throw err;
        console.log(docs);
        docs = docs[0]; 
        Mash.findByIdAndUpdate(docs._id, {
            rating: docs.rating + 1,
            votes: docs.votes + 1
        }, () => { res.send('success'); })
    });
});

const listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/leader', function (req, res) {
    Mash.find({}).sort('-rating').limit(10).exec(function (err, leader) {
      res.render('leader', { data: leader });
    });
});
