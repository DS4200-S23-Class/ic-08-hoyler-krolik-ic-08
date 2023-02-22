const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// create frame for bar chart

console.log("hi");


const FRAME2 = d3.select('.bar-chart')
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "bars");


// with scale function
const BAR_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const BAR_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// read in bar chart data
d3.csv("data/data.csv").then((data) => {

    console.log((data));

    const xScaleBar = d3.scaleBand().range([0, BAR_WIDTH]).padding(0.2);
    const yScaleBar = d3.scaleLinear().range([BAR_HEIGHT, 0]);

    xScaleBar.domain(data.map((d) => {
        return d.Category
    }));
    yScaleBar.domain([0, d3.max(data, (d) => {
        return d.Value
    })])

    FRAME2.selectAll("bars")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => {
            return (xScaleBar(d.Category) + MARGINS.left)
        })
        .attr("y", (d) => {
            return ( MARGINS.left + yScaleBar(d.Value))
        })
        .attr("width", xScaleBar.bandwidth())
        .attr("height", (d) => {
            return BAR_HEIGHT - yScaleBar(d.Value)
        });

    FRAME2.append("g")
        .attr("transform", "translate(" + MARGINS.top + "," +
            (BAR_HEIGHT + MARGINS.top) + ")")
        .call(d3.axisBottom(xScaleBar).ticks(11))
        .attr("font-size", "15px");

    FRAME2.append("g")
        .attr("transform", "translate(" +
            (MARGINS.left) + "," + (MARGINS.top) + ")")
        .call(d3.axisLeft(yScaleBar).ticks(11))
        .attr("font-size", "15px");

    const TOOLTIP2 = d3.select(".bar-chart")
        .append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0);

    // mouse over
    function handleMouseOver(event, d){
        TOOLTIP2.style("opacity", 1);
    }

    // mouse move
    function handleMouseMove(event, d){
        TOOLTIP2.html("Category: " + d.Vategory + "<br>Amount: " + d.Value)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 50) + "px");
    }

    // mouse leave
    function handleMouseLeave(event, d){
        TOOLTIP2.style("opacity", 0);
    }

    // add event listeners
    FRAME2.selectAll(".bar")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseleave", handleMouseLeave);


});