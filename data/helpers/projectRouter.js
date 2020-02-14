const express = require('express');
const Projects = require('./projectModel');
const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
})

router.post('/', (req, res) => {
  Projects.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" })
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(() => {
      res.status(202).json({ message: "project successfully removed" });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  Projects.update(id, payload)
    .then(() => {
      res.status(201).json({message: "user updated"})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on our end, sorry" });
    })
})


function validateProjectId(req, res, next){
  const { id } = req.params;

  Projects.get(id)
    .then(project => {
      req.project = project

      !project
        ? res.status(404).json({error: "That project does not exist"})
        : next()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "error on our side, sorry"});
    })
}

module.exports = router;