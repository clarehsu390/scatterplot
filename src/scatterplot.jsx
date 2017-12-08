import React from 'react';
import { scaleLinear, scaleTime, nice, tickFormat, scaleOrdinal} from 'd3-scale';
import { format } from 'd3-format';
import { ticks, timeDay } from 'd3-time';
import { max, min, range, domain } from 'd3-array';
import { axisLeft, axisBottom, tickSizeOuter } from 'd3-axis';
import { select, selectAll, classedTrue } from 'd3-selection';
import { timeFormat, timeParse } from 'd3-time-format';



export default class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        this.createScatterPlot = this.createScatterPlot.bind(this);
    }
    
    componentDidMount() {
        this.createScatterPlot();
    }
    
    componentDidUpdate() {
        this.createScatterPlot();
    }
    
    createScatterPlot() {
        let margin = {top: 100, right: 20, bottom: 30, left: 60
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        const node = this.refs.node; //reference to actual DOM node'
        
        let xarr = this.props.data.map(obj => {
            console.log(new Date(obj.start_time) )
            return new Date(obj.start_time)
        });
        
        const xMin = min(xarr);
        console.log(xarr)
        const xMax = max(xarr);
        const xScale = scaleTime().domain([timeDay.floor(xMin), timeDay.ceil(xMax)]).range([margin.left, width]),
            xAxis = axisBottom(xScale).ticks(timeDay.every(1)).tickFormat(timeFormat("%b %d")).tickPadding(10), //format month and date
            xValue = d => {return d;}
        
        let yarr = this.props.data.map(obj => {
            return Math.round(obj.duration/60);
        });
        
        const yMin = min(yarr);
        const yMax = max(yarr);
        const yScale = scaleLinear().domain([yMax + 1, yMin]).range([0, height - margin.top]),
            yAxis = axisLeft(yScale).tickFormat(d => {
                if (d === 0 || d.toString().includes('.5')) {
                    return ''
                }
                return d + " min"}).tickPadding(10),
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
                select(node) //format svg
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top +")")
            //draw y-axis
                    .append("g")
                    .attr("class", "y axis")
                    .call(yAxis.tickSizeInner(-width + margin.left))
                    .style("stroke-dasharray", ("3", "3"))
                    .select(".domain").remove()
                    
                    
            
                    //draw x-axis
                select(node)
                .append("g")
                .attr("transform", "translate(0," + height + ")")
                .attr("class", "x axis")
                .call(xAxis)
                .selectAll(".tick line")
                .attr("transform", "translate(0, 5)");
            
                select(node)
                .selectAll('scatter-dots')
                .data(this.props.data)
                .enter().append('circle')
                .attr('cx', obj => {return xScale(Date.parse(obj.start_time))})
                .attr('cy', obj => {return yScale(obj.duration/60 - 1.75);})
                .attr('r', 7)
                .style('fill', d => circleColors(d))
                .on('click', this.handleClick)
            
        let legend = select(node)
            .selectAll('.legend')
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => { return "translate(" + i * 70+ ",40)";});
            
            legend.append("circle")
            .attr("cx", width - 200)
            .attr('cy', height - 360)
            .attr('r', 7)
            .style("fill", color);
        
            legend.append("text")
            .attr("x", width - 185)
            .attr("y", 4)
            .attr("dy", "9")
            .style("text-anchor", "start")
            .text(d => (d));
            });
    }

    handleClick(e) {
        select(this).classed('selected', select(this).classed('selected') ? false : true);
    }

    render() {
        return (
        <svg ref="node">
        </svg>

        );
    }
}