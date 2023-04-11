
// set the dimensions and margins of the graph
var heatmap_margin = {top: 0, right: 0, bottom: 40, left: 35},
    heatmap_width = 230 ,
    heatmap_height = 320 - heatmap_margin.top - heatmap_margin.bottom;


//Read the data
d3.csv("static/data/pivot_post_ratios.csv",
  // When reading the csv, I must format variables: created_month
  function(d){
      // return {group : d.month_name,variable:d.day_name, facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
      return {group : d.day_name,variable:d.month_name, facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
  },
  
  function(data) {heatmap(data, "all_platforms")});

function heatmap(data, selectedGroup){
  // append the svg object to the body of the page
  var heatmap_svg = d3.select("#d3_heatmap")
    .append("svg")
      .attr("class","heatmap")
      .attr("width", heatmap_width + heatmap_margin.left + heatmap_margin.right)
      .attr("height", heatmap_height + heatmap_margin.top + heatmap_margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + heatmap_margin.left + "," + heatmap_margin.top + ")");
            
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.group;}).keys()
  var myVars = d3.map(data, function(d){return d.variable;}).keys()

  // Build X scales and axis:
  var x = d3.scaleBand()
    .range([ 0, heatmap_width])
    // .domain(['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug','Sep', 'Oct','Nov', 'Dec' ])
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    .padding(0.05);
    
  heatmap_svg.append("g")
    .attr("id", "x_heatmap_axis")
    .style("font-size", 12)
    .attr("transform", "translate(0," + heatmap_height + ")")
    .call(d3.axisBottom(x).tickSize(0))

    .selectAll("text")	
      .style("text-anchor", "right")
      .style("font-size", 14)
      .attr("dx", "-1.5em")
      .attr("dy", "0.1em")
      .attr("transform", "rotate(-90)")
    .select(".domain").remove();

  // Build Y scales and axis:
  var y = d3.scaleBand()
    .range([ heatmap_height, 0 ])
    // .domain(['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'])
    .domain(['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'])
    .padding(0.05);

  heatmap_svg.append("g")
    .attr("id", "y_heatmap_axis")
    .style("font-size", 14)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleSequential()
    // .domain([0,d3.max(data, function(d) {return d[selectedGroup]})])
    .domain([5,20])
    .interpolator(d3.interpolateGreens);

    // .interpolator(d3.interpolateHsl("white", "#69b3a2"));
    // interpolateGreens
    // interpolateBlues
    // interpolateOrRd
    // interpolateReds

  // create a tooltip
  var tooltip = d3.select("#d3_heatmap")
    .append("text")
    .style("opacity", 0)
    .attr("class", "heatmap_tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "1px")
    .style("font-size", "16px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var heatmap_mouseover = function(d) {
    tooltip
      .style("opacity", 1)

    d3.select(this)
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("opacity", 1)
  }
  var heatmap_mousemove = function(d) {
    tooltip
      .html(d[selectedGroup]+"%")
      .style("left", (d3.event.pageX - 25)  + "px")
      .style("top", (d3.event.pageY - 30) + "px")
      .style("color", "black")
  };

  var heatmap_mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.9)
  };

  // add the squares
  var heatmap = heatmap_svg.selectAll(".heatmap")
      .data(data, function(d) {return d.group+':'+d.variable;})
      .enter()
      .append("rect")
        .attr("class","heatmap_tile")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d[selectedGroup])} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.9)
      .on("mouseover", heatmap_mouseover)
      .on("mousemove", heatmap_mousemove)
      .on("mouseleave", heatmap_mouseleave);

        
}


// A function that update the chart
function update_heatmap(data,selectedGroup) {
  // Create New Data with the selection
  var new_data = data.map(function(d) {return {group : d.group,variable:d.variable, selectedGroup:+d[selectedGroup]}})

  var heatmap_svg = d3.select("#d3_heatmap")
  // Assign Color to each Source
  var heatmap_color = d3.scaleOrdinal()
      .domain(["all_platforms","facebook","ig","youtube","twitter"])
      .range([d3.interpolateGreens,d3.interpolateBlues,d3.interpolateBuPu, d3.interpolateReds,d3.interpolateBlues]);
  var myColor = d3.scaleSequential()
    // .domain([0,d3.max(new_data, function(d) {return d.selectedGroup})])
    .domain([5,20])
    .interpolator(heatmap_color(selectedGroup));


  // create a tooltip
  var tooltip = d3.selectAll(".heatmap_tooltip");

  var heatmap_mouseover = function(d) {
    tooltip
      .style("opacity", 1)

    d3.select(this)
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("opacity", 1)
  }

  var heatmap_mousemove = function(d) {
  tooltip
      .html(+d.selectedGroup+"%")
      .style("left", (d3.event.pageX - 25)  + "px")
      .style("top", (d3.event.pageY - 30) + "px")
      .style("color", "black");    
  }

  var heatmap_mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.9)
  }

  // Remove previous tiles
  heatmap_svg.selectAll(".heatmap_tile")
    .transition()
    .duration(100)
      .style("opacity", 0.5)

  heatmap_svg.selectAll('rect')
    .data(new_data)
    .on("mouseover", heatmap_mouseover)
    .on("mousemove", heatmap_mousemove)
    .on("mouseleave", heatmap_mouseleave)      
      .transition()
      .duration(500)
          .style("opacity", 1)
          .style("fill", function(d) { return myColor(d.selectedGroup)} )
          .style("opacity", 0.9);
  }
 