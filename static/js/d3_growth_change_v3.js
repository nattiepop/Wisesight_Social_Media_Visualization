// set the dimensions and margins of the graph
var growth_change_container = document.getElementById('d3_growth_change'),
    growth_change_width       = 450,
    growth_change_height      = 70,
    growth_change_margin = {top: 20, right: 30, bottom: 20, left: 40};


//Read the data
d3.csv("static/data/pivot_post_change_rate.csv", 
    // When reading the csv, I must format variables: created_month
    function(d){
        return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook: d.facebook, ig:d.instagram, twitter: d.twitter, youtube: d.youtube,all_platforms: d.all_platforms}
    },
    function(data) {bar_growth(data,"all_platforms")})

function bar_growth(data, selectedGroup){
    // append the svg object to the body of the page       
    var growth_change_svg = d3.select("#d3_growth_change")
        .append("svg")
            .attr("width", growth_change_width + growth_change_margin.left + growth_change_margin.right)
            .attr("height", growth_change_height + growth_change_margin.top + growth_change_margin.bottom)
        .append("g")
        .attr("transform","translate(" + growth_change_margin.left + "," + growth_change_margin.top + ")");
    // add X axis    
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.date;})) // Get min/max date
        .range([0,growth_change_width]);

    growth_change_svg.append("g")
        .attr("id", "x_bar_axis")
        .attr("transform","translate(0,"+(growth_change_height)/2+")")
        // .call(d3.axisBottom(x).tickFormat("d3.timeFormat("%b%y")").tickSizeOuter(0));
        .call(d3.axisBottom(x).tickFormat("").tickSizeOuter(0)
        .tickSizeInner(0));
   
    var formatPercent = d3.format(".1%");
    // add y1 axis
    var y = d3.scaleLinear()
        .domain([-0.3,0.3])
        .range([(growth_change_height),0]);

    growth_change_svg.append("g")
        .attr("id", "y_bar_axis")
        .call(d3.axisLeft(y).tickFormat(formatPercent).tickValues([-0.2,-0.1,0.0,0.1,0.2])
        .tickSizeOuter(0)
        .tickSizeInner(0))
        .call(g => g.select(".domain").remove())
        ;
    // Add Bar Chart 
    var bar = growth_change_svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar_growth")
        .attr("x", function (d) {return x(+d.date)-10;})
        .attr("y", function(d) {if(d[selectedGroup]<0){return (growth_change_height/2)} else {return y(+d[selectedGroup])}})
        .attr("width", 15)
        .attr("height",function(d) {if(d[selectedGroup]<0){return y(+d[selectedGroup])-(growth_change_height/2)} else {return (growth_change_height/2)-y(+d[selectedGroup])} })
        // .attr("height", function(d) { return growth_change_height - y(d[selectedGroup]); })
        .style("fill", function(d){ if(d[selectedGroup]<0){return "#ff6961"} else {return "#69b3a2"}});
    
    // Add Bar Labels
    growth_change_svg.selectAll(".x_bar_label")       
        .data(data)
        .enter()
        .append("text")
        .attr('class','x_bar_label')  
            .text(function(d) {return formatPercent(d[selectedGroup]);})
                .attr("x", function (d) {return x(+d.date);})
                .attr("y", function(d) {if(d[selectedGroup]>0.5){return  y(+0.34) } else if (d[selectedGroup] < -0.5) {return y(-0.35) } else {return y(+d[selectedGroup])}})
                .attr("font-family" , "sans-serif")
                .attr("font-size" , "12px")
                .attr("fill" , "white")
                .attr("text-anchor", "middle")
                .attr("dy",function(d)  {if(d[selectedGroup]<0) {return  "1em" } else {return "-0.3em"}});

}

// A function that update the chart
function update_bar(data,selectedGroup) {
    // Create New Data with the selection
    var dataFilter1 = data.map(function(d) {return {date: d.date, selectedGroup:+d[selectedGroup]}})

    // Select SVG
    var growth_change_svg = d3.select("#d3_growth_change").selectAll("svg")

    var bar = growth_change_svg.selectAll(".bar_growth")

    var formatPercent = d3.format(".1%");

    // Update y1 axis
    var y = d3.scaleLinear()
        .domain([-0.3,0.3])
        .range([(growth_change_height),0]);

    // Update X axis    
    var x = d3.scaleTime()
        .domain(d3.extent(dataFilter1, function(d) {return d.date;})) // Get min/max date
        .range([0,growth_change_width]);


    // Give these new data to update bar
    bar.data(dataFilter1)
        .transition()
        .duration(800)
        .attr("y", function(d) {if(d.selectedGroup<0){return (growth_change_height/2)} else {return y(+d.selectedGroup)}})
        .attr("height",function(d) {if(d.selectedGroup<0){return y(+d.selectedGroup)-(growth_change_height/2)} else {return (growth_change_height/2)-y(+d.selectedGroup)} })
        .style("fill", function(d){ if(d.selectedGroup<0){return "#ff6961"} else {return "#69b3a2"}});
        
        
    // Update Bar Labels
    var label = growth_change_svg.selectAll(".x_bar_label")

    label.transition()
        .duration(500)
        .style('opacity',0);
    
    label.select(".x_bar_label")         
        .data(dataFilter1)
        .enter()
        .append("text")
        .attr("class", "x_bar_label")
            .text(function(d) {return formatPercent(+d.selectedGroup);})
                .attr("x", function (d) {return x(+d.date)-20;})
                .attr("y", function(d) {if(d.selectedGroup>0.5){return  y(+0.34) } else if (d.selectedGroup < -0.5) {return y(-0.35) } else {return y(+d.selectedGroup)}})
                .attr("font-family" , "sans-serif")
                .attr("font-size" , "12px")
                .attr("fill" , "white")
                .style('opacity',0)
                .attr("text-anchor", "middle")
                .attr("dy",function(d)  {if(d.selectedGroup<0) {return  "1em" } else {return "-0.5em"}})
                .attr("transform","translate(60,20)")
                .transition()
                .duration(1200)
                .style('opacity',1);
}  


