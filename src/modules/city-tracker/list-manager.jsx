import React from 'react';
import Fuse from 'fuse.js';
import TextField from 'material-ui/TextField';
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
        "color"
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
        const displayList = showAll || filter !== '' ? filteredList : [];
        const body = (<CityList cities={displayList} handleSelect={handleSelect} manualMove={manualMove} showAll={showAll}/>);

        return (
            <div className="list-manager">
                <div className="list-title">{title}</div>
                <div className="search-bar">
                    <TextField
                        type="text"
                        hintText="Search"
                        value={searchText}
                        name={`search-${title}`}
                        fullWidth={true}
                        onChange={this.handleChange.bind(this)}/>
                </div>
                <label className="search-clear" htmlFor={`search-${title}`} onClick={this.handleClear.bind(this)}><i className="fa fa-window-close"/></label>
                {body}
            </div>
        );
    }
}
