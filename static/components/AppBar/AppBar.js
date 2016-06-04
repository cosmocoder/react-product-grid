import React, { PropTypes } from 'react'
import './styles.scss'

const menuData = [
    {
        sortBy: '',
        displayName: 'Original'
    },
    {
        sortBy: 'size',
        displayName: 'Size'
    },
    {
        sortBy: 'price',
        displayName: 'Price'
    },
    {
        sortBy: 'id',
        displayName: 'ID'
    }
]

function SortMenuItem ({onSortChange, isActive, sortBy, sortByDisplayName}) {
    return (
        <li className={isActive ? 'active' : null}>
            <button className='ripple-effect' onClick={onSortChange}>{sortByDisplayName}</button>
        </li>
    )
}

SortMenuItem.propTypes = {
    onSortChange: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortByDisplayName: PropTypes.string.isRequired
}

AppBar.propTypes = {
    sortBy: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired
}

export default function AppBar ({sortBy, onSortChange}) {
    const menuItems = menuData.map((item) => (
        <SortMenuItem
            key={item.displayName}
            onSortChange={onSortChange.bind(null, item.sortBy)}
            isActive={sortBy === item.sortBy}
            sortBy={item.sortBy}
            sortByDisplayName={item.displayName} />
    ))

    return (
        <div className='mui-appbar products-menu'>
            <ul>
                <li className='products-menu__sort dropdown-button'>
                    <button className='mui--appbar-line-height ripple-effect'>
                        <span>{'Sort'}</span>
                        <i className='material-icons right icon-dropdown'>{'arrow_drop_down'}</i>
                        <i className='material-icons mui--appbar-line-height icon-sort'>{'sort'}</i>
                    </button>
                    <ul className='dropdown'>
                        {menuItems}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
