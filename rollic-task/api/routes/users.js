//Include necessary modules and files
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

//Put function for create new users
router.put('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(result => {
        console.log(result);
        res.status(200).json({
            _id: result._id,
            name: result.name,
            email: result.email
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Get function for list all users
router.get('/', (req, res, next) => {
    User.find()
        .select("name email")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: docs.name,
                        email: docs.email,
                        password: docs.password,
                        _id: docs._id,
                    }
                })
            };
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

//Get function for list specific users with user id
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.findById(id, function (err, docs) {
        if (err){
            res.status(404).json({message:'User with that id does not exist'});
        }
        else{
            User.findById(id)
                .select("_id name email")
                .exec()
                .then(doc => {
                    console.log(doc);
                        res.status(200).json({
                            _id: doc._id,
                            name: doc.name,
                            email: doc.email
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                });
        }
    })
});

//Patch function for change some properties of existing user
router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updates = req.body
    
    User.findById(id, function (err, docs) {
        if (err){
            res.status(404).json({message:'User with that id does not exist'});
        }
        else{
            User.updateOne({_id: id}, { $set: updates })
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    _id: updates._id,
                    name: updates.name,
                    email: updates.email
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        }
    })
});

//Delete function for delete specified user with id
router.delete('/:userId', async(req, res, next) => {
    const id = req.params.userId;
    User.findById(id, function (err, docs) {
        if (err){
            res.status(404).json({message:'User with that id does not exist'});
        }
        else{
            User.remove({_id: id})
            .then(result => {res.status(200).json({message: 'Deleted'})})
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
        }
    })
});

module.exports = router;