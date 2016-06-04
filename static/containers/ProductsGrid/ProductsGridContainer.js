import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ProductsGrid } from 'components'
import { getProducts } from 'utils/productHelper'
import { debounce } from 'throttle-debounce'

const ProductsGridContainer = React.createClass({
    propTypes: {
        limit: PropTypes.number,
        sortBy: PropTypes.string.isRequired
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
            page: 1,
            isEnd: false
        }
    },

    componentDidMount () {
        this.makeAPIRequest()
        this.handleScroll = debounce(250, this.handleScroll)
        window.addEventListener('scroll', this.handleScroll)
    },

    componentWillReceiveProps (nextProps) {
        this.setState({
            productsData: [],
            page: 1
        }, () => this.makeAPIRequest())
    },

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    },

    handleScroll () {
        if (this.state.isEnd) {
            return
        }

        const gridElem = ReactDOM.findDOMNode(this)

        if (window.pageYOffset + window.innerHeight >= gridElem.getBoundingClientRect().top + window.pageYOffset + gridElem.clientHeight) {
            this.setState({
                isAppending: true
            }, () => this.makeAPIRequest())
        }
    },

    makeAPIRequest () {
        getProducts(this.props.sortBy, this.props.limit, this.state.page)
            .then((data) => {
                if (!data.length) {
                    this.setState({
                        isLoading: false,
                        isAppending: false,
                        isEnd: true
                    })
                }
                else {
                    this.setState({
                        isLoading: false,
                        isAppending: false,
                        productsData: this.state.productsData.concat(data),
                        page: this.state.page + 1
                    })
                }
            })
    },

    render () {
        return (
            <ProductsGrid
                productsData={this.state.productsData}
                isLoading={this.state.isLoading}
                isAppending={this.state.isAppending}
                isEnd={this.state.isEnd} />
        )
    }
})

export default ProductsGridContainer
