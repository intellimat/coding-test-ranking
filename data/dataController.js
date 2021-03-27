const filesUtils = require('../utils/filesUtils')

const getQualityAds = () => {
    calculateScore()
    ads = filesUtils.readJSON(__dirname + '/ads.json')
    filteredAds = ads.filter( ad => ad.score !== null && ad.score >= 40 ).sort( (firstEl, secondEl) => (firstEl.score < secondEl.score) ? 1 : -1)
    return filteredAds      // filtered ads
}


const getAds = () => {
    calculateScore()
    ads = filesUtils.readJSON(__dirname + '/ads.json')
    return ads
}

const calculateScore = () => {
    try {
        ads = filesUtils.readJSON(__dirname + '/ads.json')

        for (const ad of ads) {
            score = 0   // Initialize score
            score += getPicturesScore(ad)
            score += getDescriptionScore(ad)
            score += isAdComplete(ad) ? 40 : 0

            ad.score = getNormalizedScore(score)

            if (ad.score < 40)
                ad.irrelevantSince = new Date().toISOString()
            else
                ad.irrelevantSince = ''
        }

        filesUtils.writeJSON(__dirname + '/ads.json', ads)      // write synchronously the updated data

        return true

    } catch (err) { return false } // file system error
}

/* Helpers for calculating score */

// Returns true if the ad is complete, false otherwise
const isAdComplete = (ad) => {
    hasPictures = (ad.pictures.length > 0) ? true : false

    switch(ad.typology) {
        case 'FLAT':
            hasDescription = (ad.description.length > 0) ? true : false
            hasHouseSize   = (ad.houseSize !== null && ad.houseSize > 0) ? true : false
            return hasPictures && hasDescription && hasHouseSize

        case 'CHALET':
            hasDescription = (ad.description.length > 0) ? true : false
            hasHouseSize   = (ad.houseSize !== null && ad.houseSize > 0) ? true : false
            hasGardenSize  = (ad.gardenSize !== null && ad.gardenSize > 0) ? true : false
            return hasPictures && hasDescription && hasHouseSize && hasGardenSize

        case 'GARAGE':
            return hasPictures
    }

}

// Returns pictures score
const getPicturesScore = (ad) => {
    score = {
        noPicture: -10,
        sdPicture: 10,
        hdPicture: 20
    }

    if (ad.pictures.length === 0)   // ad has no pictures
        return score.noPicture

    pictures_score = 0
    for (const pic of ad.pictures) {
        if (pic.quality === 'HD')
            pictures_score += score.hdPicture
        else
            pictures_score += score.sdPicture
    }

    return pictures_score
}

// Returns description score
const getDescriptionScore = (ad) => {
    score = {
        noTextPresent: 0,
        textPresent: 5,
        keywordPresent: 5,
        flat: {
            shortDescription: 10,
            longDescription: 30
        },
        chalet: {
            longDescription: 20
        }
    }

    if (ad.description.length === 0)
        return score.noTextPresent

    descriptionScore = score.textPresent  // Initialize score

    words = ad.description.split(' ')   // Get all the words in the description

    switch(ad.typology) {
        case 'FLAT':
            if (words.length >= 20 && words.length <= 49)
                descriptionScore += score.flat.shortDescription
            else if (words.length >= 50)
                descriptionScore += score.flat.longDescription
            break
        case 'CHALET':
            if (words.length > 50)
                descriptionScore += score.chalet.longDescription
            break
    }

    keywords = ['Luminoso', 'Nuevo', 'Céntrico', 'Reformado', 'Ático']

    for (const word of keywords) 
        if (ad.description.toLowerCase().includes(word.toLowerCase()))
            descriptionScore += score.keywordPresent

    return descriptionScore
    
}

// 
const getNormalizedScore = (score) => {
    if (score > 100)
        return 100

    if (score < 0)
        return 0
    
    return score
}

/* exports */
module.exports = { getAds, getQualityAds, calculateScore }