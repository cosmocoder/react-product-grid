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
        this.makeAPIRequest()
        window.addEventListener('scroll', this.handleScroll)
    },

    componentWillReceiveProps (nextProps) {
        this.setState({
            productsData: [],
            page: 1
        }, () => this.makeAPIRequest())
    },

    shouldComponentUpdate (nextProps, nextState) {
        if ((nextState.isLoading !== this.state.isLoading) ||
            (nextState.isAppending !== this.state.isLoading) ||
            (nextState.isEnd !== this.state.isEnd) ||
            (nextState.productsData.length !== this.state.productsData.length)) {
            return true
        }
        else {
            return false
        }
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

        if (!this.state.isPreloading && !this.state.preloadedData.length) {
            this.setState({
                isPreloading: true
            })
            this.makeAPIRequest(true)
        }

        const gridElem = ReactDOM.findDOMNode(this)

        if (window.pageYOffset + window.innerHeight + 400 >= gridElem.getBoundingClientRect().top + window.pageYOffset + gridElem.clientHeight) {
            this.isAtBottom = true

            if (!this.state.isPreloading && this.state.preloadedData.length) {
                this.setState({
                    productsData: this.state.productsData.concat(this.state.preloadedData),
                    preloadedData: []
                })
            }
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
