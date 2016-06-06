var lastAdID

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
