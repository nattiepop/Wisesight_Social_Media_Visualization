// Create "div" for each chart
// d3.select("body")
//   .append("div")
//     .attr("class", "Facebook");
// d3.select("body")    
//   .append("div")
//     .attr("class", "Instagram");
// d3.select("body")   
//   .append("div")
//     .attr("class", "Twitter");
// d3.select("body")
//   .append("div")
//     .attr("class", "Youtube");
// d3.select("body")
//     .append("div")
//     .attr("class", "Legend");
// set the dimensions and margins of the graph
var growth_change_container = document.getElementById('d3_growth_change'),
        cat_pie_legend_width       = 860,
        cat_pie_legend_height      = 200,
        cat_pie_width       = 150,
        cat_pie_height      = 350,
         cat_pie_margin = {top: 10, right: 30, bottom: 10, left: 50};

// function of data conversion
var dataConversion = function (d) {
        return {
          category : d.category,
          nFBid : +d.facebook_id_cor,
          nIGid : +d.instagram_id,
          nTTid : +d.twitter_id_cor,
          nYTid : +d.youtube_id,
          fbIDp : +d.fbIDp,
          igIDp : +d.igIDp,
          ttIDp : +d.ttIDp,
          ytIDp : +d.ytIDp,
        };
}

// data load
d3.csv("static/data/dfCatID.csv", dataConversion, function (data) {
        var formatPercent = d3.format(".1%");
        // var dataset = data;
        var category = data.map (function (d) {return d.category});
        var nFBid = data.map (function (d) {return +d.nFBid});
        var nIGid = data.map (function (d) {return +d.nIGid});
        var nTTid = data.map (function (d) {return +d.nTTid});
        var nYTid = data.map (function (d) {return +d.nYTid});        
        var fbIDp = data.map (function (d) {return formatPercent(+d.fbIDp)}); 
        var igIDp = data.map (function (d) {return formatPercent(+d.igIDp)}); 
        var ttIDp = data.map (function (d) {return formatPercent(+d.ttIDp)});
        var ytIDp = data.map (function (d) {return formatPercent(+d.ytIDp)}); 
        console.log(ytIDp);
        var w = 180;
        var h = 180;

        var outerRadius = w/2;
        var innerRadius = w/4;

        var legend_r = 8;

        var arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
        
        var pie = d3.pie().sort(null);

        var color = d3.scaleOrdinal()
                      .domain(category)
                      .range(d3.schemeCategory20b);
//! Facebook Pie
        var svgFB = d3.select("#facebook_pie")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);
        
        var arcsFB = svgFB.selectAll("g.arc")
                          .data(pie(nFBid))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
        
        var pathFB = arcsFB.append("path")
                           .attr("fill", function(d,i) {
                                 return color(i);
                           })
                           .attr("d", arc)
                           .on("mouseover", function(d,i) {
                                arcsFB.append("text")
                                .style("left", w/2  + "px")
                                .style("top", h/2 + "px")
                                     .style("text-anchor", "middle")
                                     .attr("class", "label")
                                     .style("fill", "white")
                                     .style('font-family',"Helvetica, sans-serif")
                                     .style('font-size',"14px")
                                     .text(category[i] + ":" + "\n" + nFBid[i]);

                                // Percentage
                                arcsFB.append("text")
                                        .style("left", w/2  + "px")
                                        .style("top", h/2 + "px")
                                        .style("text-anchor", "middle")
                                        .attr("class", "sublabel")
                                        .style("fill", "white")
                                        .style('font-family',"Helvetica, sans-serif")
                                        .style('font-size',"14px")
                                        .attr("dy", "1.2em")
                                        .text("(" + fbIDp[i] +")");       

                                svgFB.select(".logo").style('opacity',0);
                           })
                           .on("mouseout", function(d,i) {
                                  arcsFB.select(".label").remove();                            
                                  arcsFB.select(".sublabel").remove();
                                  svgFB.select(".logo").style('opacity',1);
                           });

        var logoFB = svgFB.append("svg:image")
                         .attr("xlink:href", "static/images/facebook_2.png")
                         .attr("class","logo")
                         .attr("x",w/2 -20)
                         .attr("y",h/2 -20)
                         .attr("width", 40)
                         .attr("hieght", 40); 

//! Instagram Pie
        var svgIG = d3.select("#ig_pie")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h);

        var arcsIG = svgIG.selectAll("g.arc")
                          .data(pie(nIGid))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var pathIG = arcsIG.append("path")
                        .attr("fill", function(d,i) {
                                return color(i);
                        })
                        .attr("d", arc)
                        .on("mouseover", function(d,i) {
                        arcsIG.append("text")
                                .style("left", w/2  + "px")
                                .style("top", h/2 + "px")
                                        .style("text-anchor", "middle")
                                        .attr("class", "label")
                                        .style("fill", "white")
                                        .style('font-family',"Helvetica, sans-serif")
                                        .style('font-size',"14px")
                                        .text(category[i] + ":" + "\n" + nIGid[i]);
                        console.log(igIDp);
                        // Percentage
                        arcsIG.append("text")
                                .style("left", w/2  + "px")
                                .style("top", h/2 + "px")
                                .style("text-anchor", "middle")
                                .attr("class", "sublabel")
                                .style("fill", "white")
                                .style('font-family',"Helvetica, sans-serif")
                                .style('font-size',"14px")
                                .attr("dy", "1.2em")
                                .text("(" + igIDp[i] +")");         

                        svgIG.select(".logo").style('opacity',0);
                       })
                       .on("mouseout", function(d,i) {
                              arcsIG.select(".label").remove();                            
                              arcsIG.select(".sublabel").remove();
                              svgIG.select(".logo").style('opacity',1);
                       });


        var logoIG = svgIG.append("svg:image")
                         .attr("xlink:href", "static/images/instagram_2.png")
                         .attr("class","logo")
                         .attr("x",w/2 -20)
                         .attr("y",h/2 -20)
                         .attr("width", 40)
                         .attr("hieght", 40); 

//! Twitter Pie
        var svgTT = d3.select("#twitter_pie")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

        var arcsTT = svgTT.selectAll("g.arc")
                          .data(pie(nTTid))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var pathTT = arcsTT.append("path")
                           .attr("fill", function(d,i) {
                                   return color(i);
                           })
                           .attr("d", arc)
                           .on("mouseover", function(d,i) {
                            arcsTT.append("text")
                                .style("left", w/2  + "px")
                                .style("top", h/2 + "px")
                                 .style("text-anchor", "middle")
                                 .attr("class", "label")
                                 .style("fill", "white")
                                 .style('font-family',"Helvetica, sans-serif")
                                 .style('font-size',"14px")
                                 .text(category[i] + ":" + "\n" + nTTid[i]);

                                // Percentage
                                arcsTT.append("text")
                                .style("left", w/2  + "px")
                                .style("top", h/2 + "px")
                                .style("text-anchor", "middle")
                                .attr("class", "sublabel")
                                .style("fill", "white")
                                .style('font-family',"Helvetica, sans-serif")
                                .style('font-size',"14px")
                                .attr("dy", "1.2em")
                                .text("(" + ttIDp[i] +")");

                                 svgTT.select(".logo").style('opacity',0);
                       })
                       .on("mouseout", function(d,i) {
                              arcsTT.select(".label").remove();                             
                              arcsTT.select(".sublabel").remove();
                              svgTT.select(".logo").style('opacity',1);
                       });


        var logoTT = svgTT.append("svg:image")
                         .attr("xlink:href", "static/images/twitter_2.png")
                         .attr("class","logo")
                         .attr("x",w/2 -20)
                         .attr("y",h/2 -20)
                         .attr("width", 40)
                         .attr("hieght", 40);     

//! Youtube Pie
        var svgYT = d3.select("#youtube_pie")
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h);

         var arcsYT = svgYT.selectAll("g.arc")
                              .data(pie(nYTid))
                              .enter()
                              .append("g")
                              .attr("class", "arc")
                              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var pathYT = arcsYT.append("path")
                           .attr("fill", function(d,i) {
                                  return color(i);
                           })
                           .attr("d", arc)
                           .on("mouseover", function(d,i) {
                                arcsYT.append("text")
                                        .style("left", w/2  + "px")
                                        .style("top", h/2 + "px")
                                        .style("text-anchor", "middle")
                                        .attr("class", "label")
                                        .style("fill", "white")
                                        .style('font-family',"Helvetica, sans-serif")
                                        .style('font-size',"14px")
                                        .text(category[i] + ":" + nYTid[i]);
                                        
                                // Percentage
                                arcsYT.append("text")
                                        .style("left", w/2  + "px")
                                        .style("top", h/2 + "px")
                                        .style("text-anchor", "middle")
                                        .attr("class", "sublabel")
                                        .style("fill", "white")
                                        .style('font-family',"Helvetica, sans-serif")
                                        .style('font-size',"14px")
                                        .attr("dy", "1.2em")
                                        .text("(" + ytIDp[i] +")");
                                
                                svgYT.select(".logo").style('opacity',0);
                           })
                           .on("mouseout", function(d,i) {
                                arcsYT.select(".label").remove();                                
                                arcsYT.select(".sublabel").remove();
                                svgYT.select(".logo").style('opacity',1);
                           });


        var logoYT= svgYT.append("svg:image")
                         .attr("xlink:href", "static/images/youtube_2.png")
                         .attr("class","logo")
                         .attr("x",w/2 -20)
                         .attr("y",h/2 -20)
                         .attr("width", 40)
                         .attr("hieght", 40); 

// Legend
            var svgLegend = d3.select("#legend_pie")
                              .append("svg")
                                .attr("width", cat_pie_legend_width)
                                .attr("height", cat_pie_legend_height);           

            var mark = svgLegend.selectAll("mark")
                                .data(category)
                                .enter()
                                .append("circle")
//                                  .attr("cx", 50) // if fuction i<4, i<8, i<12 else
                                  .attr("cx", function (d,i) {
                                          if (i<4) {return 150;}
                                          else if (i<8) {return 320;}
                                          else if (i<12) {return 430;}
                                          else {return 620;}
                                  })
//                                  .attr("cy", function(d,i) {return 40 + i*30})
                                  .attr("cy", function (d,i) {
                                          if (i<4) {return 40 + i*20;}
                                          else if (i<8) {return 40 + (i-4)*20;}
                                          else if (i<12) {return 40 + (i-8)*20;}
                                          else {return 40 + (i-12)*20;}
                                  })
                                  .attr("r", 6)
                                  .style("fill", function(d,i) {return color(i)})
        
           var label = svgLegend.selectAll("label")
                              .data(category)
                              .enter()
                              .append("text")
//                                .attr("x", 70) // if function i<4, i<8 i<12 else
                              .attr("x", function (d,i) {
                                      if (i<4) {return 160;}
                                      else if (i<8) {return 330;}
                                      else if (i<12) {return 440;}
                                      else {return 630;}
                              })
//                                .attr("y", function(d,i) {return 40 + i*30})
                              .attr("y", function (d,i) {
                                       if (i<4) {return 42 + i*20;}
                                       else if (i<8) {return 42 + (i-4)*20;}
                                       else if (i<12) {return 42 + (i-8)*20;}
                                       else {return 42 + (i-12)*20;}
                              })        
                              .text(function(d) {return d})
                                .attr("text-anchor", "left")
                                .style("alignment-baseline", "middle")
                                .style("fill", "white")
                                .style("font-size","14px");

});