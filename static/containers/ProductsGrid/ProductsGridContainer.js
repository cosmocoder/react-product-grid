import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { ProductsGrid } from 'components'
import { getProducts } from 'utils/productHelper'
import getAd from 'utils/adHelper'
import { debounce } from 'throttle-debounce'

const ProductsGridContainer = React.createClass({
    propTypes: {

        // distance from the bottom of the grid at which to start inserting new items
        threshold: PropTypes.number,

        // number of items to get in each call to the api
        limit: PropTypes.number,

        // the parameter to sort items by
        sortBy: PropTypes.string.isRequired
    },

    getDefaultProps () {
        return {
            threshold: 500,
            limit: 20
        }
    },

    getInitialState () {
        return {
            isLoading: true,
            isAppending: false,
            isPreloading: false,
            isEnd: false,
            productsData: [],
            preloadedData: [],
            page: 1
        }
    },

    componentWillMount () {
        this.handleScroll = debounce(150, this.handleScroll)
    },

    componentDidMount () {
        this.gridElem = ReactDOM.findDOMNode(this)
        this.makeAPIRequest()
        window.addEventListener('scroll', this.handleScroll)
    },

    componentWillReceiveProps (nextProps) {
        this.setState({
            isLoading: true,
            isEnd: false,
            productsData: [],
            page: 1
        }, () => this.makeAPIRequest())
    },

    shouldComponentUpdate (nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    },

    componentDidUpdate (prevProps, prevState) {
        if (this.state.productsData.length > prevState.productsData.length) {
            this.isAtBottom = false
        }
    },

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll)
    },

    handleScroll () {
        if (this.state.isLoading || this.state.isAppending || this.state.isEnd) {
            return
        }

        // start preloading the next batch of products data
        if (!this.state.isPreloading && !this.state.preloadedData.length) {
            this.setState({
                isPreloading: true
            })
            this.makeAPIRequest(true)
        }

        // when the bottom threshold is reached
        if (window.innerHeight + this.props.threshold >=
            this.gridElem.getBoundingClientRect().top + this.gridElem.clientHeight) {
            this.isAtBottom = true

            // append new items if the data is already available
            if (!this.state.isPreloading && this.state.preloadedData.length) {
                this.setState({
                    productsData: this.state.productsData.concat(this.state.preloadedData),
                    preloadedData: []
                })
            }

            // else show the loading spinner
            else {
                this.setState({
                    isAppending: true
                })
            }
        }
    },

    makeAPIRequest (isPreloading = false) {
        getProducts(this.props.sortBy, this.props.limit, this.state.page)
            .then((data) => {
                // add an advertisement with each batch of products
                data = data.length ? data.concat({'ad': true, src: getAd()}) : data

                this.setState({
                    isLoading: false,
                    isAppending: false,
                    isPreloading: false,
                    isEnd: !data.length,
                    page: data.length ? this.state.page + 1 : this.state.page,
                    productsData: this.state.isLoading || (isPreloading && this.isAtBottom) ? this.state.productsData.concat(data) : this.state.productsData,
                    preloadedData: isPreloading && !this.isAtBottom ? data : []
                })
            })
            .catch((error) => console.warn('Error in loading prducts data', error))
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
