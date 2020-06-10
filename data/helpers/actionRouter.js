const express = require('express');
const Actions = require('./actionModel');
const Projects = require('./projectModel');
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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Actions.get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body, project_id: id }

  Projects.get(id)
    .then(project => {
      if(project === null){
        res.status(404).json({error: "That project does not exist"});
      } else {
        Actions.insert(payload)
          .then(action => {
            req.action = action;
            res.status(201).json(req.action);
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({ error: "error on our end, sorry" });
          })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "error on our end, sorry"});
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Actions.remove(id)
    .then(() => {
      res.status(202).json({ message: "action removed!" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  
  Actions.update(id, payload)
    .then(() => {
      res.status(201).json({message: "Action Updated!"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

module.exports = router;