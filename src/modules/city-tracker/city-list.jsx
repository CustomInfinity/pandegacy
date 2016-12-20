import React from 'react';
import {List, ListItem} from 'material-ui/List';
import City from './city';

function NoCity() {
    return (
        <ListItem className="city-name no-city" disabled>No Cities</ListItem>
    );
}

export default function CityList({cities, handleSelect, manualMove}) {
    console.log(cities);
    const cityComponents = cities.map((city) => {
        return (<City city={city} key={city.name} handleSelect={handleSelect} manualMove={manualMove}/>);
    });

    const noCities = cityComponents.length === 0 ? (
        <NoCity/>
    ) : null;
    return (
        <List className="city-list">
            {cityComponents}
            {noCities}
        </List>
    );
}
