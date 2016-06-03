import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ProductsGrid } from 'components'
import { getProducts } from 'utils/productHelper'
import { debounce } from 'throttle-debounce'

const ProductsGridContainer = React.createClass({
    propTypes: {
        limit: PropTypes.number
    },

    getDefaultProps () {
        return {
            limit: 20
        }
    },

    getInitialState () {
        return {
            isLoading: true,
            isAppending: false,
            productsData: [],
            page: 1
        }
    },

    componentDidMount () {
        this.makeAPIRequest()
        this.handleScroll = debounce(250, this.handleScroll)
        window.addEventListener('scroll', this.handleScroll)
    },

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    },

    handleScroll () {
        const gridElem = ReactDOM.findDOMNode(this)

        if (window.pageYOffset + window.innerHeight >= gridElem.getBoundingClientRect().top + window.pageYOffset + gridElem.clientHeight) {
            this.setState({
                isAppending: true
            }, () => this.makeAPIRequest())
        }
    },

    makeAPIRequest () {
        getProducts(this.props.limit, this.state.page)
            .then((data) => (
                this.setState({
                    isLoading: false,
                    isAppending: false,
                    productsData: this.state.productsData.concat(data),
                    page: this.state.page + 1
                })
            ))
    },

    render () {
        return (
            <ProductsGrid
                productsData={this.state.productsData}
                isLoading={this.state.isLoading}
                isAppending={this.state.isAppending} />
        )
    }
})

export default ProductsGridContainer
