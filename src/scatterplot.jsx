import React from 'react';
import { scaleLinear } from 'd3-scale';

export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.createScatterPlot = this.createScatterPlot.bind(this);
    }

    componentDidMount() {
        this.createScatterPlot();
    }

    createScatterPlot() {
        const node = this.node;
    }

    render() {
        return <svg ref={node => this.node = node}
        width={960} height={500}>
        </svg>
    }
}