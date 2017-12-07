import React from 'react';
import { scaleLinear, scale } from 'd3-scale';
import { max, range, domain } from 'd3-array';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.createScatterPlot = this.createScatterPlot.bind(this);
    }

    componentDidMount() {
        this.createScatterPlot();
    }

    componentDidUpdate() {
        this.createScatterPlots();
    }

    createScatterPlot() {
        let margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        const node = this.node; //reference to actual DOM node
        let arr = this.props.data.map(obj => {
            return +obj.duration
        });
        
        const yMax = max(arr);
        const yScale = scaleLinear().domain([0, 300]).range([height, 0]),
     
            yAxis = axisLeft().scale(yScale);
        this.props.data.forEach( d => {
            d["Duration"] = +d.duration

            select(node) //format svg
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top +")")
           // draw y-axis
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("y", 6)
            .attr("dy", "1em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end")
            .text("Duration (s)");
        });
    }

    render() {
        return (
        <svg ref={node => this.node = node}>
        </svg>

        )
    }
}