import React from 'react';
import ScatterPlot from './scatterplot';
import { selectAll } from 'd3-selection';
export default class Circles extends React.Component {
    constructor(props) {
        super(props);
        this.createCircles = this.createCircles.bind(this);
    }

    componentDidMount() {
        this.createCircles();
        console.log(this.props.node);
    }

    createCircles() {
            // selectAll('scatter-dots')
            // .data(this.props.data)
            // .enter().append('circle')
            // .attr('cx', obj => {return obj.start_time})
            // .attr('cy', obj => {return obj.duration/60;})
            // .attr('r', 10)
            // .style('fill', 'pink');
  

    }
    render() {
        return (
            <svg ref={node => this.node = node}></svg>
        );
    }
}