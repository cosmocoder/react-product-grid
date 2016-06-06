var lastAdID

/**
 * Randomly generate new ad but ensure that the same ad doesn't get generated twice in a row
 * @param {string}
 */
export default function getAd () {
    let newAdID = 0

    if (lastAdID === undefined) {
        newAdID = Math.floor(Math.random() * 1000)
    }
    else {
        newAdID = Math.floor(Math.random() * 999)
        newAdID = newAdID >= lastAdID ? newAdID + 1 : newAdID
    }

    lastAdID = newAdID
    return '/ad/?r=' + newAdID
}
