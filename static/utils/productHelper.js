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

export function getProducts (limit, page) {
    const url = `/api/products?limit=${limit}&skip=${limit * (page - 1)}`
    return axios.get(url, {responseType: 'stream'})
        .then(({data}) => {
            const ndjson = data.split('\n').slice(0, -1)
            const json = ndjson.map((item, i) => JSON.parse(item))
            return json
        })
}

export function formatPrice (priceInCents) {
    return '$' + (priceInCents / 100).toFixed(2)
}

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
