const express = require('express')
const router = express.Router()
const controller = require('../data/dataController')

router.get('/', (req, res, next) => {
    JSON_response = {
        status: '',
        message: '',
        data: []
    }

    try {
        ads = controller.getAds()
        JSON_response.status = 'SUCCESS'
        JSON_response.message = "Ads have been successfully retrieved, check 'data' property"
        JSON_response.data = ads
        res.statusCode = 200
    } catch (error) {
        JSON_response.status = 'FAILED'
        JSON_response.message = 'Error while reading ads from file'
        res.statusCode = 500
    } finally {
        res.json(JSON_response)
    }

})

module.exports = router
