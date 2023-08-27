const nock = require('nock')

const firstMockRequest = {
    path: '',
    response: {
        follow: 'https://www.letsrevolutionizetesting.com/challenge.json?id=756775492',
        message: 'This is not the end',
      }
}

const secondMockRequest = {
  path: '?id=756775492',
  response: {
      message: 'Congratulations! You\'ve reached the end! Please add the code (or a link to a repo with the code in it) you used to solve it to your application. We\'ll be in touch shortly!'
  }
}

const thirdMockRequest = {
    path: '?id=756775492',
    response: {
        follow: 'xxxxxx',
        message: 'This is not the end',
    }
}

const fourthMockRequest = {
  path: '?id=756775492',
  response: {
      follow: 'https://www.letsrevolutionizetesting.com/challenge.json',
      message: 'This is not the end',
  }
}

const createMockRequest = (mockRequests) => {
    const nockRequest = nock('https://www.letsrevolutionizetesting.com/challenge.json')
    mockRequests.forEach(mockRequest => {
        nockRequest
            .get(mockRequest.path)
            .reply(200, mockRequest.response)
    })
}

module.exports = {
    firstMockRequest,
    secondMockRequest,
    thirdMockRequest,
    fourthMockRequest,
    createMockRequest
}