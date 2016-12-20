import React from 'react';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import ListManager from './list-manager';

import {cities} from '../../cities';

export default class CityTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            drawCities: this.cities,
            redrawCities: [],
            discardCities: []
        };
    }

    get cities() {
        return cities;
    }

    handleDraw(city) {
        this.setState({
            drawCities: _.without(this.state.drawCities, city),
            redrawCities: _.without(this.state.redrawCities, city),
            discardCities: _.concat(this.state.discardCities, [city])
        });
    }

    handleRedraw() {
        this.setState({
            redrawCities: _.concat(this.state.redrawCities, this.state.discardCities),
            discardCities: []
        })
    }

    handleManualMove(city, destination) {
        const {drawCities, redrawCities, discardCities} = this.state;

        if (destination === 'Draw') {
            this.setState({
                drawCities: _.concat(drawCities, [city]),
                redrawCities: _.without(redrawCities, city),
                discardCities: _.without(discardCities, city)
            });
        } else if (destination === 'Redraw') {
            this.setState({
                drawCities: _.without(drawCities, city),
                redrawCities: _.concat(redrawCities, [city]),
                discardCities: _.without(discardCities, city)
            });
        } else if (destination === 'Discard') {
            this.setState({
                drawCities: _.without(drawCities, city),
                redrawCities: _.without(redrawCities, city),
                discardCities: _.concat(discardCities, [city])
            });
        } else {
            return;
        }
    }

    reset() {
        this.setState(this.initialState);
    }

    render() {
        const {
            drawCities,
            redrawCities,
            discardCities
        } = this.state;

        const redrawList = !_.isEmpty(redrawCities) ? (
            <Col sm={3}>
                <ListManager
                    title="Redraw"
                    showAll
                    list={redrawCities}
                    handleSelect={this.handleDraw.bind(this)}
                />
            </Col>
        ) : null;
        return (
            <div>
                <AppBar title="Pandegacy"/>
                <div className="container">
                    <Paper zDepth={2} >
                        <div className="container">
                            <Row>
                                <Col sm={3}>
                                    <ListManager
                                        title="Draw"
                                        list={drawCities}
                                        handleSelect={this.handleDraw.bind(this)}
                                    />
                                </Col>
                                {redrawList}
                                <Col sm={3} smOffset={redrawList ? 0 : 3}>
                                    <ListManager
                                        title="Discard"
                                        showAll
                                        list={discardCities}
                                        manualMove={this.handleManualMove.bind(this)}
                                    />
                                </Col>
                                <Col sm={3}>
                                    <div onClick={this.handleRedraw.bind(this)}>EPIDEMIC!</div>
                                    <div onClick={this.reset.bind(this)}>RESET</div>
                                </Col>
                            </Row>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}
