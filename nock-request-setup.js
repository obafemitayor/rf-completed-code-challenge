const nock = require('nock')

const createNockRequest = (nockRequests) => {
    const nockBaseRequest = nock('https://www.letsrevolutionizetesting.com/challenge.json')
    nockRequests.forEach(nockRequest => {
        nockBaseRequest
            .get(nockRequest.path)
            .reply(200, nockRequest.response)
    })
}

module.exports = {
    createNockRequest
}