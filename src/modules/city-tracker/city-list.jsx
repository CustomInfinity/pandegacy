import React from 'react';
import City from './city';


function NoCity() {
    return (
        <div className="city-name no-city">No Cities</div>
    );
}

export default function CityList({cities, handleSelect}) {
    const cityComponents = cities.map((city) => {
        return (<City city={city} key={city.name} handleSelect={handleSelect}/>);
    });

    const noCities = cityComponents.length === 0 ? (
        <NoCity/>
    ) : null;
    return (
        <div className="city-list">
            {cityComponents}
            {noCities}
        </div>
    );
}
