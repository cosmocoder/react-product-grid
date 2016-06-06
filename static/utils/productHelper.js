import axios from 'axios'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

/**
 * Make ajax call to get products data from api
 * @param {string} sortBy - the sorting parameter
 * @param {number} limit - number of products to get
 * @param {number} page - used for determining the next batch of products to get
 * @return {Object} Promise object
 */
export function getProducts (sortBy, limit, page) {
    let url = `/api/products?limit=${limit}&skip=${limit * (page - 1)}`
    url = sortBy ? `${url}&sort=${sortBy}` : url

    return axios.get(url, {responseType: 'stream'})
        .then(({data}) => {
            const ndjson = data.split('\n').slice(0, -1)
            const json = ndjson.map((item, i) => JSON.parse(item))
            return json
        })
}

/**
 * Format price in cents as dollars with two decimal places
 * @param {number} priceInCents
 * @return {string}
 */
export function formatPrice (priceInCents) {
    return '$' + (priceInCents / 100).toFixed(2)
}

/**
 * Format a ISO date string into a relative time if older than 1 week, else human readable full date
 * @param {string} dateString - the ISO date string
 * @return {string}
 */
export function formatDate (dateString) {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerWeek = msPerDay * 7
    const timestamp = Date.parse(dateString)
    const now = Date.now()
    const elapsed = now - timestamp
    const weeks = Math.floor(elapsed / msPerWeek)

    if (weeks < 1) {
        if (elapsed < msPerMinute) {
            return Math.floor(elapsed / 1000) + ' seconds ago'
        }

        else if (elapsed < msPerHour) {
            return Math.floor(elapsed / msPerMinute) + ' minutes ago'
        }

        else if (elapsed < msPerDay) {
            return Math.floor(elapsed / msPerHour) + ' hours ago'
        }

        else if (elapsed < msPerWeek) {
            let returnDate = Math.floor(elapsed / msPerDay)
            let unit = returnDate === 1 ? ' day' : ' days'
            return returnDate + unit + ' ago'
        }
    }
    else {
        let date = new Date(timestamp)
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }
}
