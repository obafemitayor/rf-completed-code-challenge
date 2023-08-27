const nock = require('nock')

const createMockRequest = (mockRequests) => {
    const nockRequest = nock('https://www.letsrevolutionizetesting.com/challenge.json')
    mockRequests.forEach(mockRequest => {
        nockRequest
            .get(mockRequest.path)
            .reply(200, mockRequest.response)
    })
}

module.exports = {
    createMockRequest
}