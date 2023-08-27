const URL_PATTERN = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

const getIdFromUrl = (url) => new URL(url).searchParams.get('id')

const isValidUrl = (url) => {
    return URL_PATTERN.test(url)
}

module.exports = {
    getIdFromUrl,
    isValidUrl
}