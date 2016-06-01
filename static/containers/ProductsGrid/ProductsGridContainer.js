import React from 'react'
import {Product} from 'components'
import axios from 'axios'
import ndjson from 'ndjson'
import './styles.scss'

const ProductsGridContainer = React.createClass({
    componentDidMount() {
        axios.get('/api/products?limit=2', {responseType: 'stream'})
            .then((products) => {
                const ndjson = products.data.split('\n').slice(0, -1);
                const json = ndjson.map((item, i) => JSON.parse(item))
                console.log(json);
            })
    },

    render () {
        return (
            <div className="products-grid">
                <div className="mui-row">
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>
            </div>
        )
    },
})

export default ProductsGridContainer