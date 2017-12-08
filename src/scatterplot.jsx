import React from 'react';
import { scaleLinear, scaleTime, nice, tickFormat, scaleOrdinal} from 'd3-scale';
import { format } from 'd3-format';
import { ticks, timeDay } from 'd3-time';
import { max, min, range, domain } from 'd3-array';
import { axisLeft, axisBottom, tickArguments } from 'd3-axis';
import { select, selectAll, classedTrue } from 'd3-selection';
import { timeFormat, utcParse } from 'd3-time-format';
import Circles from './circles';


const months = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.createScatterPlot = this.createScatterPlot.bind(this);
        this.state = {
            node: null
        };
        }

    componentDidMount() {
        this.createScatterPlot();
        this.setState({
            node: this.refs.node
        });
        
    }
    
    componentDidUpdate() {
        this.createScatterPlot();
    }

    createScatterPlot() {
        let margin = {top: 100, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        const node = this.refs.node; //reference to actual DOM node'

        let xarr = this.props.data.map(obj => {
            console.log(utcParse(obj.start_time));
            return new Date(utcParse(obj.start_time));
        });

        const xMin = min(xarr);
        console.log(xMin)
        const xMax = max(xarr);
        const xScale = scaleTime().domain([xMin, xMax]).range([margin.left, width - margin.left]),
            xAxis = axisBottom(xScale).ticks(timeDay.every(1)).tickFormat(timeFormat("%b %d")), //format month and date
            xValue = d => {return d;}
        
            let yarr = this.props.data.map(obj => {
            return Math.round(obj.duration/60);
        });
        
        const yMin = min(yarr);
        const yMax = max(yarr);
        const yScale = scaleLinear().domain([yMax, yMin]).nice().range([0, height - margin.top]),
                yAxis = axisLeft(yScale).ticks(5).tickFormat(d => { return d + " min"}),
            yValue = d => {return d.duration;}
 //determine color
        const color = scaleOrdinal()
        .domain(["pass", "error", "fail"])
        .range(["green", "orange", "red"]);

        const circleColors = d => {
            if (d.status === 'pass') {
                return 'green';
            } else if (d.status === 'error') {
                return 'orange';
            } else {
                return 'red';
            }
        };

            this.props.data.forEach( d => {
                // xScale.domain([min(xarr, xValue)-1, max(xarr, xValue)+1]);
                // yScale.domain([max(yarr, yValue), min(yarr, yValue)]);
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
          
            select(node)
            .selectAll('scatter-dots')
            .data(this.props.data)
            .enter().append('circle')
            // .on('click', this.toggleClass)
            .attr('cx', obj => {return xScale(Date.parse(obj.start_time));})
            .attr('cy', obj => {return yScale(obj.duration/60.0);})
            .attr('r', 7)
            .style('fill', d => circleColors(d));
            // .on("click", () => select(this).classed("selected", select(this).classed("selected") ? false : true));
            let legend = select(node)
            .selectAll('.legend')
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => { return "translate(" + i * 70+ ",40)";});

            legend.append("rect")
            .attr("x", width - 200)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", color);
        
            legend.append("text")
            .attr("x", width - 180)
            .attr("y", 5)
            .attr("dy", "5")
            .style("text-anchor", "start")
            .text(d => (d));
            });
    }

    render() {
        return (
        <svg ref="node">
        <Circles data={this.props.data} node={this.state.node}/>
        </svg>

        );
    }
}