import React from 'react';
import { scaleLinear, scaleTime, nice, tickFormat, scaleOrdinal, schemeCategory10} from 'd3-scale';
import { format } from 'd3-format';
import { ticks } from 'd3-time';
import { max, min, range, domain } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import { select, selectAll } from 'd3-selection';
import { timeFormat } from 'd3-time-format';
import Circles from './circles';
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
        let margin = {top: 100, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        const node = this.refs.node; //reference to actual DOM node'

        let xarr = this.props.data.map(obj => {
            //    return formatTime(Date.parse(obj.start_time));
            return new Date(Date.parse(obj.start_time));
        });
        
        let formatTime = timeFormat("%b %d"); //format time as month and day

        const xMin = min(xarr);
        const xMax = max(xarr);
        const xScale = scaleTime().domain([xMin, xMax]).range([margin.left, width - margin.left]),
            xAxis = axisBottom().scale(xScale),
            xValue = d => {return d;}
        
            let yarr = this.props.data.map(obj => {
            return Math.round(+obj.duration/60);
        });
        
        const yMax = max(yarr);
        const yScale = scaleLinear().domain([5, 0]).range([0, height - margin.top]),
            yAxis = axisLeft().scale(yScale).tickFormat(format("d")).ticks(6),
            yValue = d => {return d;}
        const cValue = d => {return d.status;},
            color = scaleOrdinal(schemeCategory10);    
            this.props.data.forEach( d => {
                d["Duration"] = +d.duration
                // xScale.domain([min(xarr, xValue)-1, max(xarr, xValue)+1]);
                // yScale.domain([max(yarr, yValue)+1, min(yarr, yValue)-1]);

                select(node) //format svg
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top +")")
            //draw y-axis
            .append("g")
            .attr("class", "y axis")
            .call(yAxis)
        //draw x-axis
        select(node)
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis)
          
        });
        select(node).
        selectAll('scatter-dots')
        .data(this.props.data)
        .enter().append('circle')
        .attr('cx', obj => {return xScale(Date.parse(obj.start_time));})
        .attr('cy', obj => {return yScale(obj.duration/60);})
        .attr('r', 7)
        .style('fill', d => (color(cValue(d))));


    }

    render() {
        return (
        <svg ref="node">
        <Circles data={this.props.data}/>
        </svg>

        );
    }
}