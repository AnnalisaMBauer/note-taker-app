const router = require('express').Router()
const db = require('../db/index')

router.get("/notes", (req, res) => {
    db.readNotes()
      .then((data) => {
         return res.json(data)

      })
      .catch((err) => res.status(500).json(err));
  });
  
  router.post('/notes', (req, res) => {
    db.addNote(req.body).then((data) => {
        return res.json(data)

     })
     .catch((err) => res.status(500).json(err));

  })
  
  module.exports = router;