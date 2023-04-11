// Create "div" for each chart
d3.select("body")
  .append("div")
    .attr("class", "Facebook");
d3.select("body")    
  .append("div")
    .attr("class", "Instagram");
d3.select("body")   
  .append("div")
    .attr("class", "Twitter");
d3.select("body")
  .append("div")
    .attr("class", "Youtube");
d3.select("body")
    .append("div")
    .attr("class", "Legend");

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
d3.csv("dataset/dfCatID.csv", dataConversion, function (data) {
        // var dataset = data;
        var category = data.map (function (d) {return d.category});
        var nFBid = data.map (function (d) {return +d.nFBid});
        var nIGid = data.map (function (d) {return +d.nIGid});
        var nTTid = data.map (function (d) {return +d.nTTid});
        var nYTid = data.map (function (d) {return +d.nYTid}); 
        var fbIDp = data.map (function (d) {return +d.fbIDp}); 
        var igIDp = data.map (function (d) {return +d.igIDid}); 
        var ttIDp = data.map (function (d) {return +d.ttIDp});
        var ytIDp = data.map (function (d) {return +d.ytIDp}); 
        
        var w = 400;
        var h = 400;

        var outerRadius = w/4;
        var innerRadius = w/8;

        var arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);
        
        var pie = d3.pie().sort(null);

        var color = d3.scaleOrdinal()
                      .domain(category)
                      .range(d3.schemeCategory20b);

// Facebook Pie
        var svgFB = d3.select("div.Facebook")
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
                                     .attr("transform", function(d,i) {
                                                        return "translate(" + arc.centroid(i) + ")";})
                                     .style("text-anchor", "middle")
                                     .attr("class", "label")
                                     .style("fill", "white")
                                     .text(category[i] + ":" + nFBid[i] + "(" + fbIDp[i]*100 + "%" + ")")
                           })
                           .on("mouseout", function(d,i) {
                                  arcsFB.select(".label").remove();
                           });

        var logoFB = svgFB.append("svg:image")
                         .attr("xlink:href", "logo/facebook_2.png")
                         .attr("x",200-w/4-w/16)
                         .attr("y",350-w/4-w/16)
                         .attr("width", w/8)
                         .attr("hieght", w/8);

// Instagram Pie
        var svgIG = d3.select("div.Instagram")
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
                                 .attr("transform", function(d,i) {
                                                    return "translate(" + arc.centroid(i) + ")";})
                                 .style("text-anchor", "middle")
                                 .attr("class", "label")
                                 .style("fill", "white")
                                 .text(category[i] + ": " + nIGid[i] + "(" + igIDp[i]*100 + "%" + ")")
                       })
                       .on("mouseout", function(d,i) {
                              arcsIG.select(".label").remove();
                       });

            // arcsIG.append("text")
            //       .attr("transform", function(d) {
            //           return "translate(" + arc.centroid(d) + ")";
            //       })
            //       .attr("text-anchor", "middle")
            //       .text(function(d) {
            //               return d.value;
            // });

        var logoIG = svgIG.append("svg:image")
                         .attr("xlink:href", "logo/facebook_2.png")
                         .attr("x",200-w/4-w/16)
                         .attr("y",350-w/4-w/16)
                         .attr("width", w/8)
                         .attr("hieght", w/8);

// Twitter Pie
        var svgTT = d3.select("div.Twitter")
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
                                 .attr("transform", function(d,i) {
                                                    return "translate(" + arc.centroid(i) + ")";})
                                 .style("text-anchor", "middle")
                                 .attr("class", "label")
                                 .style("fill", "white")
                                 .text(category[i] + ": " + nTTid[i] + "(" + ttIDp[i]*100 + "%" + ")")
                       })
                       .on("mouseout", function(d,i) {
                              arcsTT.select(".label").remove();
                       });

            // arcsTT.append("text")
            //       .attr("transform", function(d) {
            //               return "translate(" + arc.centroid(d) + ")";
            //       })
            //       .attr("text-anchor", "middle")
            //       .text(function(d) {
            //       return d.value;
            // });

        var logoTT = svgTT.append("svg:image")
                         .attr("xlink:href", "logo/twitter_2.png")
                         .attr("x",200-w/4-w/16)
                         .attr("y",350-w/4-w/16)
                         .attr("width", w/8)
                         .attr("hieght", w/8);      

// Youtube Pie
        var svgYT = d3.select("div.Youtube")
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
                           .attr("transform", function(d,i) {
                                            return "translate(" + arc.centroid(i) + ")";})
                           .style("text-anchor", "middle")
                           .attr("class", "label")
                           .style("fill", "white")
                           .text(category[i] + ":" + nYTid[i] + "(" + ytIDp[i]*100 + "%" + ")")
                           })
                           .on("mouseout", function(d,i) {
                                arcsYT.select(".label").remove();
                           });

            // arcsYT.append("text")
            //       .attr("transform", function(d) {
            //               return "translate(" + arc.centroid(d) + ")";
            //       })
            //       .attr("text-anchor", "middle")
            //       .text(function(d) {
            //             return d.value;
                  // });

        var logoYT= svgYT.append("svg:image")
                         .attr("xlink:href", "logo/youtube_2.png")
                         .attr("x",200-w/4-w/16)
                         .attr("y",350-w/4-w/16)
                         .attr("width", w/8)
                         .attr("hieght", w/8); 

// Legend
            var svgLegend = d3.select("div.Legend")
                              .append("svg")
                                .attr("width", 1000)
                                .attr("height", 500);

            var mark = svgLegend.selectAll("mark")
                                .data(category)
                                .enter()
                                .append("circle")
//                                  .attr("cx", 50) // if fuction i<4, i<8, i<12 else
                                  .attr("cx", function (d,i) {
                                          if (i<4) {return 50;}
                                          else if (i<8) {return 300;}
                                          else if (i<12) {return 550;}
                                          else {return 800;}
                                  })
//                                  .attr("cy", function(d,i) {return 40 + i*30})
                                  .attr("cy", function (d,i) {
                                          if (i<4) {return 40 + i*30;}
                                          else if (i<8) {return 40 + (i-4)*30;}
                                          else if (i<12) {return 40 + (i-8)*30;}
                                          else {return 40 + (i-12)*30;}
                                  })
                                  .attr("r", 10)
                                  .style("fill", function(d,i) {return color(i)})
        
           var label = svgLegend.selectAll("label")
                              .data(category)
                              .enter()
                              .append("text")
//                                .attr("x", 70) // if function i<4, i<8 i<12 else
                              .attr("x", function (d,i) {
                                      if (i<4) {return 70;}
                                      else if (i<8) {return 320;}
                                      else if (i<12) {return 570;}
                                      else {return 820;}
                              })
//                                .attr("y", function(d,i) {return 40 + i*30})
                              .attr("y", function (d,i) {
                                       if (i<4) {return 40 + i*30;}
                                       else if (i<8) {return 40 + (i-4)*30;}
                                       else if (i<12) {return 40 + (i-8)*30;}
                                       else {return 40 + (i-12)*30;}
                              })        
                              .text(function(d) {return d})
                                .attr("text-anchor", "left")
                                .style("alignment-baseline", "middle")
                                .style("fill", "white")

});