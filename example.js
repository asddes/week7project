let mongoose = require("mongoose");
let express = require("express");

let Warehouse = require("./models/task");
let Item = require("./models/item");

mongoose.connect("mongoose://localhost:27017/warehouseDB", function (err) {
    if (err) throw err;
    console.log("connected");
});

app.get("/addwarehouse/:name/:capacity/:address", function (req, res){
    Warehouse.create({
        name: req.name,
        capacity: req.capacity,
        address: req.address,
    }, function (err) {
        if (err) console.log(err);
        res.send("warehouse created")
    })
});

app.get("/getwarehouse", function (req, res) {
    Warehouse.find(). exec(function (err, data) {
        res.send(data);
    })
});

app.get("/additem/:warehouseID/:name/:capacity/:address", function (req, res) {
    Item.create({
        name: req.params.name,
        cost: req.params.cost,
        quantity: req.params.quantity,
        warehouse: mongoose.Types.ObjectId(req.params.warehouseID)
    }, function (err) {
        if (err) console.log(err);
        res.redirect("/getwarehouses");
    })
});