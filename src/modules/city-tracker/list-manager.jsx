import React from 'react';
import Fuse from 'fuse.js';
import CityList from './city-list';

const OPTIONS = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "name",
    ]
};

export default class ListManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            searchText: ''
        };
    }

    handleChange(event) {
        this.setState({
            filter: event.target.value,
            searchText: event.target.value
        });
    }

    handleClear() {
        this.setState({
            searchText: '',
            filter: ''
        });
    }

    render() {
        const {list, title, showAll, handleSelect, manualMove} = this.props;
        const {filter, searchText} = this.state;

        const filteredList = filter !== '' ? new Fuse(list, OPTIONS).search(filter): list;
        const body = showAll || filter !== '' ? (
            <CityList cities={filteredList} handleSelect={handleSelect} manualMove={manualMove}/>
        ) : null;

        return (
            <div className="list-manager">
                <div className="list-title">{title}</div>
                <input type="text" placeholder="Search" value={searchText} name={`search-${title}`} onChange={this.handleChange.bind(this)}/>
                <label htmlFor={`search-${title}`} onClick={this.handleClear.bind(this)}>clear</label>
                {body}
            </div>
        );
    }
}
