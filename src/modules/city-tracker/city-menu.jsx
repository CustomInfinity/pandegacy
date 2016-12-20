import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

function CityMenuItem({name, move}) {
    return (
        <MenuItem onClick={() => move(name)}>{name}</MenuItem>
    );
}

export default function CityMenu({close, move, iconButtonElement}) {
    const destinations = ["Draw", "Redraw"];
    const items = destinations.map((dest) => {
        return <CityMenuItem move={move} name={dest} key={dest}/>
    });
    return (
        <IconMenu iconButtonElement={iconButtonElement} autoWidth={false}>
            {items}
        </IconMenu>
    );
}
