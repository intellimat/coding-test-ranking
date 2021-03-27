const express = require('express')
const router = express.Router()
const controller = require('../data/dataController')

// Calculate score and send a response back
router.get('/', (req, res, next) => {
  JSON_response = {
    status: '',
    message: ''
  }

  outcome = controller.calculateScore()

  if (outcome === true){
    JSON_response.status = 'SUCCESS'
    JSON_response.message = 'Scores successfully calculated'
    res.statusCode = 200
  }else {
    JSON_response.status = 'FAILED'
    JSON_response.message = 'Scores could not be calculated'
    res.statusCode = 500
  }
  
  res.json(JSON_response)
  
})

module.exports = router
