const express = require('express');
const router = express.Router();

const Translation = require('../models/Translation');

router.post('/', (req, res) => {
  Translation.create(req.body, (err, translation) =>{
    res.status(err ? 400 : 200).send(err || translation);
  });
});

router.get('/', (req, res) => {
  Translation.find({}, (err, translations) =>{
    res.status(err ? 400 : 200).send(err || translations);
  });
});

router.get('/:id', (req, res) => {
  Translation.findById(req.params.id, (err, translation) =>{
    res.status(err ? 400 : 200).send(err || translation);
  });
});

router.put('/:id', (req, res) => {
  Translation.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, translation) =>{
    res.status(err ? 400 : 200).send(err || translation);
  });
});

router.delete('/:id', (req, res) => {
  Translation.findByIdAndRemove(req.params.id, (err, translation) =>{
    res.status(err ? 400 : 200).send(err || translation);
  });
});

module.exports = router;
