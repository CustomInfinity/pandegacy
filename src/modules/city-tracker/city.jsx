import React from 'react';

export default function City({city, handleSelect}) {
    const handleClick = handleSelect || (() => {});
    return (
       <div className="city-name" onClick={ () => {handleClick(city);} }>{city.name}</div>
    );
}
