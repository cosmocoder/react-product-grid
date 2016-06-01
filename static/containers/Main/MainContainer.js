import React from 'react'
import {AppBar} from 'components'
import {ProductsGridContainer} from 'containers'
import './styles.scss'

const MainContainer = React.createClass({
    render () {
        return (
            <div className="mui-container">
                <AppBar />
                <ProductsGridContainer />
            </div>
        )
    },
})

export default MainContainer