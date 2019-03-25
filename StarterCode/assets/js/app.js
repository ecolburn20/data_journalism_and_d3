function makeResponsive() {

  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  var svgArea = d3.select("#scatter").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // SVG wrapper dimensions are determined by the current width
  // and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    right: 600,
    bottom: 100,
    left: 100
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

    // append svg and group
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  
  d3.csv("data.csv").then(function(fulldata) {
    //if (error) throw error;
  
    console.log(fulldata);
  
    // Format data
    fulldata.forEach(function(data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
 
    });
  var x_data = d => d.poverty
  var y_data = d => d.healthcare
  
  var xScale = d3.scaleLinear()
    .domain([0,  d3.max(fulldata, x_data)])
    .range([0, width]);
   
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(fulldata, y_data)])
    .range([height, 0]);
    
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);


chartGroup.append("g").call(leftAxis);

  // append circles to data points
  var circlesGroup = chartGroup.selectAll("circle")
    .data(fulldata)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "lightblue")
  
  
  var y_axis_1 = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Lacks Healthcare (%)")
    .on("click",function() {
     x_data = d => d.healthcare;
    })

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .text("In Poverty (%)");

 
  var toolTip = d3.select("#scatter").append("div")
    .attr("class", "tooltip");


    circlesGroup.on("mouseover", function(d, i) {
      toolTip.style("display", "block");
      toolTip.html(`Did this work`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })

    .on("mouseout", function() {
     toolTip.style("display", "none");
    });
  
    console.log(text)
  })}


makeResponsive();

d3.select(window).on("resize", makeResponsive);
