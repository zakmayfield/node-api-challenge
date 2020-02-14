const express = require('express');
const Actions = require('./actionModel');
const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body, project_id: id }

  Actions.insert(payload)
    .then(action => {
      req.action = action;
      res.status(201).json(req.action);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.delete('/:id', (req, res) => {
  Actions.get()
    .then()
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.put('/:id', (req, res) => {
  Actions.get()
    .then()
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

module.exports = router;