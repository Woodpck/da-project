const margin = { top: 70, right: 40, bottom: 60, left: 175 };
const width = 660 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

function barChart() {
    const svg = d3.select('#bog-body-chart').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //load and process
    d3.csv("../server/uploads/student_data.csv").then(data => {
        data.forEach(d => {
            d.studytime = +d.studytime;
        });
        // console.log(data)

        //set x and y scales
        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) { return d.age; })]);

        const y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1)
            .domain(data.map(function (d) { return d.sex; }))

        // set x and y axes
        const xAxis = d3.axisBottom(x)
        const yAxis = d3.axisLeft(y)

        // add x and y to chart
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('y', function (d) { return y(d.sex); })
            .attr('height', y.bandwidth)
            .attr('x', 0)
            .attr('width', function (d) { return x(d.age); })
            .style('fill', 'skyblue')

        svg.append("g")
            .call(yAxis)

    })

}

function lineChart() {
    const svg = d3.select('#bog-body-chart').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Load and process
    d3.csv("../server/uploads/student_data.csv").then(data => {
        data.forEach(d => {
            d.age = +d.age;
            d.studytime = +d.studytime;
        });

        // Set x and y scales
        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) { return d.age; })]);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function (d) { return d.studytime; })]);

        // Set x and y axes
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        // Add x and y axes to chart
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // Create line
        const line = d3.line()
            .x(d => x(d.age))
            .y(d => y(d.studytime));

        // Add line to svg
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2");

    });
}


function scatterPlot() {
    const svg = d3.select('#bog-body-chart').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Load and process
    d3.csv("../server/uploads/student_data.csv").then(data => {
        data.forEach(d => {
            d.age = +d.age;
            d.studytime = +d.studytime;
        });

        // Set x and y scales
        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) { return d.age; })]);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function (d) { return d.studytime; })]);

        // Set x and y axes
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        // Add x and y axes to chart
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // Add dots
        svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("cx", function (d) { return x(d.age); })
            .attr("cy", function (d) { return y(d.studytime); })
            .attr("r", 5)
            .style("fill", "steelblue");
    });
}