import getAd from '../adHelper'

describe('getAd', () => {
    it('should return a string', () => {
        let ad = getAd()
        expect(ad).to.be.a('string')
    })

    it('should return a url of the format "/ad/?r=999"', () => {
        let ad = getAd()
        expect(ad).to.match(/^\/ad\/\?r=\d{1,4}$/)
    })

    it('should not return the same ad twice in a row', () => {
        let adsNotSame = true

        outerLoop: for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 1000; j++) {
                let ad1 = getAd()
                let ad2 = getAd()
                adsNotSame = ad1 !== ad2

                if (!adsNotSame) {
                    break outerLoop
                }
            }
        }

        expect(adsNotSame).to.be.true
    })
})
