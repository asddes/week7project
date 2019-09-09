let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let mongoose = require("mongoose");
let Task = require("./models/task");
let Developer = require("./models/developer");

const url = "mongodb://localhost:27017/fit2095db";

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(8080);


mongoose.connect(url, function(error) {
    if (!error){
        console.log('MongoDB connection successful. ');
    }else {
        console.log('Mongo error =====>', error);
    }
})

app.get("/", function(req, res) {
    console.log("Homepage");
    res.render('index.html');
});
app.get("/newtask", function(req, res) {
    console.log("Add Task");
    res.render("addTask.html");
});
app.get("/newdeveloper", function(req, res) {
    console.log("Add Developer");
    res.render("addDeveloper.html");
});
app.get("/listtasks", function(req, res) {
    console.log("List all Tasks");
    console.log(req.body);

    Task.find({}, function(err, data){
        if (err) console.log(err);
        console.log(data);
        res.render("listTasks.html", {tasks: data})
    });

});
app.get("/listdevelopers", function(req, res) {
    console.log("List all Developers");
    console.log(req.body);

    Developer.find({}, function(err, data){
        if (err) console.log(err);
        console.log(data);
        res.render("listDevelopers.html", {developers: data})
    });

});
app.get("/delete", function(req, res) {
    console.log("Delete Page")
    res.render("delete.html");
});
app.get("/deleteall", function(req, res) {
    console.log("Delete All");

    Task.deleteMany({"Status": "Complete"}, function(err, data) {
        if (err) console.log(err);
        console.log(data);

    });

    res.redirect("/listtasks");
});
app.get("/update", function(req, res) {
    console.log("Update Task");
    res.render("update.html");
});


app.post("/newtask", function(req, res) {
    console.log(req.body);

    let task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.taskname,
        assign: mongoose.Types.ObjectId(req.body.assign),
        due: new Date(req.body.taskdue),
        status: req.body.taskstatue,
        description: req.body.taskdesc
    });
    task.save(function(err){
        if (err) console.log(err);
        console.log("Task Successfully Add")
    });

    res.redirect("/listtasks")
});
app.post("/newdeveloper", function(req, res) {
    console.log(req.body);

    let developer = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.fname,
            lastName: req.body.lname
        },
        level: req.body.level,
        address: {
            state: req.body.state,
        suburb: req.body.suburb,
        street: req.body.street,
        unit: req.body.unit
        }
    });
    developer.save(function(err){
        if (err) console.log(err);
        console.log("Developer Successfully Add")
    });

    res.redirect("/listdevelopers")
});
app.post("/delete", function(req, res) {

    Task.deleteOne({"_id": mongoose.Types.ObjectId(req.body.delname)}, function(err, data) {
        if (err) console.log(err);
        console.log(data);
    });

    res.redirect("/listtasks")
});
app.post("/update", function(req, res) {
    console.log(req.body);
    Task.updateOne(
        {"_id": mongoose.Types.ObjectId(req.body.taskid)},
        {$set: {"status": req.body.newstatus}}, 
        function(err, data) {
            if (err) console.log(err);
            console.log(data);
        }
    );

    res.redirect("/listtasks");
});