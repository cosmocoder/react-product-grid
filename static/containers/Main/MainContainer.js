import React from 'react'
import { AppBarContainer, ProductsGridContainer } from 'containers'
import './styles.scss'

const MainContainer = React.createClass({
    getInitialState () {
        return {
            sortBy: ''
        }
    },

    shouldComponentUpdate (nextProps, nextState) {
        return nextState.sortBy !== this.state.sortBy
    },

    handleSortChange (sortBy) {
        this.setState({
            sortBy: sortBy
        })
    },

    render () {
        return (
            <div className='mui-container'>
                <AppBarContainer sortBy={this.state.sortBy} onSortChange={this.handleSortChange} />
                <ProductsGridContainer sortBy={this.state.sortBy} />
            </div>
        )
    }
})

export default MainContainer
