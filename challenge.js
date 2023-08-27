const { isValidUrl, getIdFromUrl } = require('./utils')

const axios = require('axios')

const CHALLENGE_URL = 'https://www.letsrevolutionizetesting.com/challenge.json'

const getChallengeUrl = (id = null) => id ? `${CHALLENGE_URL}?id=${id}` : CHALLENGE_URL

const handleSuccess = async (response) => {
    const { follow, message } = response.data

    // added the log here so there is activity on the console, in case you decide to test it
    console.log('message is',message)
    
    if(!follow || !isValidUrl(follow)) return

    const id = getIdFromUrl(follow)

    if(!id) return
    
    await completeChallenge(id)
}

const completeChallenge = async (id = null)=> {
    try {
        const response = await axios.get(getChallengeUrl(id))
        await handleSuccess(response)
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = {
    completeChallenge
}