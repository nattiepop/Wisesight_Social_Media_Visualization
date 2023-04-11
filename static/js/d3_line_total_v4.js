// set the dimensions and margins of the graph
var line_total_container = document.getElementById('d3_line_total'),
    line_total_width = 450,
    line_total_height = 160,
    line_total_margin = {top: 10, right: 30, bottom: 30, left: 40};

// append the svg object to the body of the page   
// var line_total_svg = d3.select("#d3_line_total")
//     .append("svg")
//         .attr("width", line_total_width + line_total_margin.left + line_total_margin.right)
//         .attr("height", line_total_height + line_total_margin.top + line_total_margin.bottom)
//     .append("g")
//     .attr("transform","translate(" + line_total_margin.left + "," + line_total_margin.top + ")");


//Read the data
d3.csv("static/data/pivot_post_total.csv",
    // When reading the csv, I must format variables: created_month
    function(d){
        return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
    },
    function(data) { line_total(data,"all_platforms")}
    )


function line_total(data, selectedGroup) {
    // append the svg object to the body of the page   
    var line_total_svg = d3.select("#d3_line_total")
        .append("svg")
            .attr("width", line_total_width + line_total_margin.left + line_total_margin.right)
            .attr("height", line_total_height + line_total_margin.top + line_total_margin.bottom)
        .append("g")
        .attr("transform","translate(" + line_total_margin.left + "," + line_total_margin.top + ")");
    // List of groups
    var allGroup = ["all_platforms","facebook", "ig", "twitter","youtube"];
    
    // add X axis
    var x_line = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.date;})) // Get min/max date
        .range([0,line_total_width]);
    line_total_svg.append("g")
        .attr("id", "x_line_axis")
        .attr("transform","translate(0,"+line_total_height+")")
        .call(d3.axisBottom(x_line).tickFormat(d3.timeFormat("%b%y")));
    // add y axis
    var formatThousand =  d3.format(".2s");
    var y_line = d3.scaleLinear()
        .domain([d3.min(data, function(d) {return d[selectedGroup]/1.8;}),d3.max(data, function(d) {return d[selectedGroup]*1.1;})])
        .range([line_total_height,0]);
    line_total_svg.append("g")
        .attr("id", "y_line_axis")
        .call(d3.axisLeft(y_line).tickFormat(formatThousand));

    // Tooltip
    var Tooltip = d3.select("#d3_line_total")
        .append("div")
        // .style("opacity", 0)
        .style("visibility", "hidden")
        .attr("class", "line_total_tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "1px") 

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
        // .style("opacity", 1)
        .style("visibility", "visible")
         
        d3.select(this)
            .style("stroke", "white")
            .style("opacity", 1)
    }
    var mousemove = function(d) {
        Tooltip
        .html("Month: " + d3.timeFormat("%b%y")(d.date) + "<br> Value: "  + d3.format(',')(+d[selectedGroup]) )
        .style("color","black")
        .style("font-family","Helvetica, sans-serif")
        .style("font-size","12px")
        .style("left", (d3.mouse(this)[0]+60) + "px")
        .style("top", (d3.mouse(this)[1]+80) + "px")
    }
    var mouseleave = function(d) {
        Tooltip
        // .style("opacity", 0)
        .style("visibility", "hidden")

        d3.select(this)
            .style("stroke", "none")
    }

    // Initialize line with group a
    var line = line_total_svg
        .append("g")
        .append("path")
        .attr("class", "line_total")
            .datum(data)
            .attr("d",d3.line()
                .x(function(d) {return x_line(+d.date)})
                .y(function(d) {return y_line(+d[selectedGroup])}))
            .attr("stroke","#69b3a2")
            .style("stroke-width",4)
            .style("fill","none")

    var dot = line_total_svg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr("class", "dot_total")
            .attr("cx",function(d) {return x_line(+d.date)})
            .attr("cy",function(d) {return y_line(+d[selectedGroup])})
            .attr("r",7)
            .style("fill","#69b3a2")
            // .attr("stroke","#69b3a2")
            .style("stroke-width",2)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    
}
// A function that update the chart
function update_line(data,selectedGroup) {    

    // Assign Color to each Source
    var color = d3.scaleOrdinal()
        .domain(["all_platforms","facebook","ig","youtube","twitter"])
        .range(["#69b3a2","#4267B2","#8a3ab9", "#FF0000","#1DA1F2"]);

    // Create New Data with the selection
    var dataFilter = data.map(function(d) {return {date: d.date, selectedGroup:d[selectedGroup]}});
    
    // Select svg
    var line_total_svg = d3.select("#d3_line_total")
    var x_line = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.date;})) // Get min/max date
        .range([0,line_total_width]);
   // Update y axis
   var formatThousand =  d3.format(".2s");
   var y_line = d3.scaleLinear()
        .domain([d3.min(data, function(d) {return d[selectedGroup]/1.8;}),d3.max(data, function(d) {return d[selectedGroup]*1.1;})])
        .range([line_total_height,0]);

        
    line_total_svg.select("#y_line_axis")
        .transition().duration(800).call(d3.axisLeft(y_line).tickFormat(formatThousand))
    
    // Remove Previous tooltip
    // d3.selectAll(".line_total_tooltip").remove();

    // Tooltip
    var Tooltip = d3.selectAll(".line_total_tooltip");
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
        // .style("opacity", 1)
        .style("visibility", "visible")
        
        d3.select(this)
            .style("stroke", "white")
            .style("opacity", 1)
    }
    var mousemove = function(d) {
        Tooltip
        .html("Month: " + d3.timeFormat("%b%y")(d.date) + "<br> Value: "  + d3.format(',')(+d.selectedGroup) )
        .style("color","black")
        .style("font-family","Helvetica, sans-serif")
        .style("font-size","12px")
        .style("left", (d3.mouse(this)[0]+50) + "px")
        .style("top", (d3.mouse(this)[1]+80) + "px")
    }

    var mouseleave = function(d) {
        Tooltip
        // .style("opacity", 0)
        .style("visibility", "hidden")

        d3.select(this)
            .style("stroke", "none")
    }
    // Give these new data to update line and dot
    line_total_svg.select('.line_total')
        .datum(dataFilter)
        .transition()
        .duration(800)
        .attr("d",d3.line()
            .x(function(d) {return x_line(+d.date)})
            .y(function(d) {return y_line(+d.selectedGroup)})
        )
        .attr("stroke", function(d) {return color(selectedGroup);})
    
    var dot = line_total_svg.selectAll('circle')
        .data(dataFilter)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .duration(800)
            .attr("cx", function(d) { return x_line(+d.date) })
            .attr("cy", function(d) { return y_line(+d.selectedGroup) })
            .style("fill", function(d) {return color(selectedGroup);})
        

    }