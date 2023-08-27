const nock = require('nock')

const { createMockRequest } = require('./http-stub')

const { completeChallenge } = require('./challenge')

const { isValidUrl, getIdFromUrl } = require('./utils')

const firstMockRequest = {
    path: '',
    response: {
        follow: 'https://www.letsrevolutionizetesting.com/challenge.json?id=756775492',
        message: 'This is not the end',
      }
}

jest.mock('./utils', () => {
  const originalModule = jest.requireActual('./utils')
  return {
    isValidUrl: jest.fn(originalModule.isValidUrl),
    getIdFromUrl: jest.fn(originalModule.getIdFromUrl),
  }
})


describe('Challenge application', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    nock.cleanAll()
  })

  afterEach((done) => {
    expect(nock.isDone()).toBe(true)
    done()
  })

  it('should complete challenge successfully', async () => {
    const mockRequests = [
        firstMockRequest,
        {
            path: '?id=756775492',
            response: {
                message: 'Congratulations! You\'ve reached the end! Please add the code (or a link to a repo with the code in it) you used to solve it to your application. We\'ll be in touch shortly!'
            }
        }
    ]

    createMockRequest(mockRequests)

    const logSpy = jest.spyOn(console, 'log')

    await completeChallenge()

    expect(logSpy).toHaveBeenLastCalledWith('message is', mockRequests[1].response.message)

    expect(isValidUrl).toHaveBeenCalledTimes(1)

    expect(isValidUrl).toHaveBeenLastCalledWith('https://www.letsrevolutionizetesting.com/challenge.json?id=756775492')

    expect (isValidUrl).toHaveLastReturnedWith(true)

    expect(getIdFromUrl).toHaveBeenCalledTimes(1)

    expect(getIdFromUrl).toHaveBeenLastCalledWith('https://www.letsrevolutionizetesting.com/challenge.json?id=756775492')

    expect (getIdFromUrl).toHaveLastReturnedWith('756775492')

  })

  it('should complete challenge successfully when the response of a request contains an invalid url', async () => {
    const mockRequests = [
        firstMockRequest,
        {
            path: '?id=756775492',
            response: {
                follow: 'xxxxxx',
                message: 'This is not the end',
            }
        }
    ]

    createMockRequest(mockRequests)

    const logSpy = jest.spyOn(console, 'log')

    await completeChallenge()

    expect(isValidUrl).toHaveBeenCalledTimes(2)

    expect(isValidUrl).toHaveReturnedTimes(2)

    expect (isValidUrl).toHaveLastReturnedWith(false)

    expect(getIdFromUrl).toHaveBeenCalledTimes(1)

    expect(getIdFromUrl).toHaveBeenLastCalledWith('https://www.letsrevolutionizetesting.com/challenge.json?id=756775492')

    expect (getIdFromUrl).toHaveLastReturnedWith('756775492')

    expect(logSpy).toHaveBeenLastCalledWith('message is', mockRequests[1].response.message)
  })

  it('should complete the challenge successfully and not enter an infinite loop when the response of a request is the challenge url and does not contain an id', async () => {
    const mockRequests = [
        firstMockRequest,
        {
            path: '?id=756775492',
            response: {
                follow: 'https://www.letsrevolutionizetesting.com/challenge.json',
                message: 'This is not the end',
            }
        }
    ]

    createMockRequest(mockRequests)

    const logSpy = jest.spyOn(console, 'log')

    await completeChallenge()

    expect(isValidUrl).toHaveBeenCalledTimes(2)

    expect(isValidUrl).toHaveReturnedTimes(2)

    expect (isValidUrl).toHaveLastReturnedWith(true)

    expect(getIdFromUrl).toHaveBeenCalledTimes(2)

    expect(getIdFromUrl).toHaveReturnedTimes(2)

    expect (getIdFromUrl).toHaveLastReturnedWith(null)

    expect(logSpy).toHaveBeenLastCalledWith('message is', mockRequests[1].response.message)
  })


})
