var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Employee = require('./models/employee');


//get all employee data from db
app.get('/api/employees',async function (req, res) {
    // use mongoose to get all todos in the database
    try {
        // await Employee.find.exec(function (err, employees) {
        //     // if there is an error retrieving, send the error otherwise send data
        //     res.json(employees); // return all employees in JSON format
            
        // });
        const employees = await Employee.find().exec();
        res.json(employees);
    } catch (error) {
        res.status(500).send(error.message);

    }
 
});

// get a employee with ID of 1
app.get('/api/employees/:employee_id',async function (req, res) {
    let id = req.params.employee_id;
    try {
        const employees = await Employee.findById(id);
        res.json(employees);
    } catch (error) {
        res.status(500).send(error.message);

    }
  
 

});


// create employee and send back all employees after creation
app.post('/api/employees',async function (req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

    console.log(Employee);

    try {
            await Employee.create({
            name: req.body.name,
            salary: req.body.salary,
            age: req.body.age
        });

        const employees = await Employee.find();

        res.json(employees);
    } catch (error) {
        res.status(500).send(err.message);

    }
    // Employee.create({
    //     name: req.body.name,
    //     salary: req.body.salary,
    //     age: req.body.age
    // }, function (err, employee) {
    //     if (err)
    //         res.send(err);
 
    //     // get and return all the employees after newly created employe record
    //     Employee.find(function (err, employees) {
    //         if (err)
    //             res.send(err)
    //         res.json(employees);
    //     });
    // });

});


// create employee and send back all employees after creation
app.put('/api/employees/:employee_id',async function (req, res) {
    // create mongose method to update an existing record into collection
    console.log(req.body);

    let id = req.params.employee_id;
    var data = {
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    }
    try {
        const employe  = await Employee.findByIdAndUpdate(id,data);
        res.send('Successfully! Employee updated - ' + employe.name);

    } catch (error) {
        throw error;
    }


    // save the user
    // Employee.findByIdAndUpdate(id, data, function (err, employee) {
    //     if (err) throw err;

    // });
});

// delete a employee by id
app.delete('/api/employees/:employee_id',async function (req, res) {
    console.log(req.params.employee_id);
    let id = req.params.employee_id;

    try {
        const employe = await Employee.deleteOne({_id :id});
        res.send('Successfully! Employee has been Deleted.');

    } catch (error) {
        res.send(error);
        console.log(error);
    }

    // Employee.remove({
    //     _id: id
    // }, function (err) {
    //     if (err)
    //         res.send(err);
    //     else
    //         res.send('Successfully! Employee has been Deleted.');
    // });
});

app.listen(port);
console.log("App listening on port : " + port);
