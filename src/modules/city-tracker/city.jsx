import React from 'react';
import {ListItem} from 'material-ui/List';
import {blue300 as blue, yellow600 as yellow, grey400, grey900 as black, red700 as red} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import CityMenu from './city-menu';

const COLORS = {
    blue: blue,
    yellow: yellow,
    black: black,
    red: red
}

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="move"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

export default class City extends React.Component {

    move(destination) {
        this.props.manualMove(this.props.city, destination);
    }

    render() {
        const {city, handleSelect} = this.props;
        const handleClick = handleSelect || (() => {});

        const menu = this.props.manualMove ?
            CityMenu({move: this.move.bind(this), iconButtonElement: iconButtonElement})
        : null;
        return (
            <ListItem
                className="city"
                onClick={ () => {handleClick(city);} }
                leftAvatar={
                    <Avatar icon={<EditorInsertChart />}backgroundColor={COLORS[city.color]} />
                }
                rightIconButton={menu}
                primaryText={city.name}
            >
            </ListItem>
        );
    }
}
