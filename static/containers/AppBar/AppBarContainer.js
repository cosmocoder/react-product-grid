import React, { PropTypes } from 'react'
import { AppBar } from 'components'

const AppBarContainer = React.createClass({
    propTypes: {
        sortBy: PropTypes.string.isRequired,
        onSortChange: PropTypes.func.isRequired
    },

    render () {
        return (
            <AppBar sortBy={this.props.sortBy} onSortChange={this.props.onSortChange} />
        )
    }
})

export default AppBarContainer
