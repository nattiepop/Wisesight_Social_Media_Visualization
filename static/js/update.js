
// console.log(heatmap_data)

// When the button is changed, run the updateChart function
d3.selectAll(".summary_btn").on("click", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // Data Input Setting
    var select = document.getElementById('overall_selector')
    var value = select.options[select.selectedIndex].value
    
    let line_data;
    let bar_data;
    let heatmap_data;
    if (value == "post") {
        line_data = "static/data/pivot_post_total.csv"
        bar_data = "static/data/pivot_post_change_rate.csv"
        heatmap_data = "static/data/pivot_post_ratios.csv"
    } else {
        line_data = "static/data/pivot_engage_total.csv"
        bar_data = "static/data/pivot_engage_change_rate.csv"
        heatmap_data = "static/data/pivot_engage_ratios.csv"
    }
// Line Total Update 
    // run the updateChart function with this selected option
    d3.csv(line_data,
    // When reading the csv, I must format variables: created_month
    function(d){
        return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
    },
    function(data) { update_line(data,selectedOption)}
    );
// Bar Growth Update 
    // run the updateChart function with this selected option
    d3.csv(bar_data,
    // When reading the csv, I must format variables: created_month
    function(d){
        return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
    },
    function(data) { update_bar(data,selectedOption)}
    );
// Heatmap Update 
    // run the updateChart function with this selected option
    d3.csv(heatmap_data,
    // When reading the csv, I must format variables: created_month
    function(d){
        return {group : d.month_name,variable:d.day_name, facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
    },
    function(data) { update_heatmap(data,selectedOption)}
    );

}).on("blur", function(d) {
    // Data Input Setting
    var select = document.getElementById('overall_selector')
    var value = select.options[select.selectedIndex].value
    let line_data;
    let bar_data;
    let heatmap_data;

    if (value == "post") {
        line_data = "static/data/pivot_post_total.csv"
        bar_data = "static/data/pivot_post_change_rate.csv"
        heatmap_data = "static/data/pivot_post_ratios.csv"
    } else {
        line_data = "static/data/pivot_engage_total.csv"
        bar_data = "static/data/pivot_engage_change_rate.csv"
        heatmap_data = "static/data/pivot_engage_ratios.csv"
    }

    // Line Total Update 
        // run the updateChart function with this selected option
        d3.csv(line_data,
        // When reading the csv, I must format variables: created_month
        function(d){
            return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
        },
        function(data) { update_line(data,"all_platforms")}
        );
    // Bar Growth Update 
        // run the updateChart function with this selected option
        d3.csv(bar_data,
        // When reading the csv, I must format variables: created_month
        function(d){
            return {date : d3.timeParse("%Y-%m-%d")(d.created_month), facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
        },
        function(data) { update_bar(data,"all_platforms")}
        );
    // Heatmap Update 
         // run the updateChart function with this selected option
        d3.csv(heatmap_data,
        // When reading the csv, I must format variables: created_month
        function(d){
            return {group : d.month_name,variable:d.day_name, facebook:d.facebook, ig:d.instagram, twitter:d.twitter, youtube:d.youtube,all_platforms:d.all_platforms}
        },
        function(data) { update_heatmap(data,"all_platforms")}
        );
})