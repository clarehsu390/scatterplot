import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { ticks } from 'd3-time';

import { max, min, range, domain } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
// import Circles from './circles';
const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
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

        let xarr = this.props.data.map(obj => {
            //    return formatTime(Date.parse(obj.start_time));
            return new Date(Date.parse(obj.start_time));
        });
        
        let formatTime = timeFormat("%b %d"); //format time as month and day

        const xMin = min(xarr);
        const xMax = max(xarr);
        const xScale = scaleTime().domain([xMin, xMax]).range([margin.left, width - margin.left * 2]),
            xAxis = axisBottom().scale(xScale);
        
            let yarr = this.props.data.map(obj => {
            return +obj.duration
        });
        
        const yMax = max(yarr);
        const yScale = scaleLinear().domain([300, 0]).range([0, height - margin.top]),
            yAxis = axisLeft().scale(yScale);
            
            this.props.data.forEach( d => {
                d["Duration"] = +d.duration
                
                select(node) //format svg
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top +")")
            //draw y-axis
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)

        select(node)
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis)
           // draw y-axis
           
        });
    }

    render() {
        return (
        <svg ref={node => this.node = node}>
            {/* <Circles data={this.props.data}/> */}
        </svg>

        )
    }
}