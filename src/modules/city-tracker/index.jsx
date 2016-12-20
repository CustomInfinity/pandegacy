import React from 'react';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
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
            <Col md={3}><ListManager title="Redraw" showAll list={redrawCities} handleSelect={this.handleDraw.bind(this)}/></Col>
        ) : null;
        return (
            <div className="box">
                <Row>
                    <Col md={3}><ListManager title="Draw" list={drawCities} handleSelect={this.handleDraw.bind(this)}/></Col>
                    {redrawList}
                    <Col md={3}><ListManager title="Discard" showAll list={discardCities}/></Col>
                    <div onClick={this.handleRedraw.bind(this)}>EPIDEMIC!</div>
                    <div onClick={this.reset.bind(this)}>RESET</div>
                </Row>
            </div>
        );
    }
}
