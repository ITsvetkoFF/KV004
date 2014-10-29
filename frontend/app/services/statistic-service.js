define(['./module'], function (services) {
    'use strict';
    /**
     * - getStatistic4
     * - getStatistic3
     * - getChart
     * - getPie
     */

    services.factory('StatisticService', function ($http, ipCookie) {
        return{
            getStatistic4:function(){
                return $http.get('/api/getStats4');

            },
            getStatistic3:function(){
                return $http.get('/api/getStats3');

            },
            getChart:function(val){
                var now = new Date();
                var lanes = [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7}];
                var colors = ["#095B0F", "#231F20", "#98442B", "#1B9AD6", "#71BF44", "#FFAB09", "#50095B"];
                var color = ["#f00", "", "#00f"]
                d3.xhr('api/getStats1')
                    .get(function(error, data) {
                        if (error) throw error;
                        var items = JSON.parse(data.response);
                        items.forEach(function(d) {
                            d.start = new Date(d.start);
                            d.class = "past";
                        });
var margin = {top: 20, right: 0, bottom: 15, left: 0}
var padding = {left: 40}
  , width = window.innerWidth - 100 - margin.right
  , height = 500 - margin.top - margin.bottom

  , miniHeight = lanes.length * 12 + 50
  , mainHeight = height - miniHeight - 50;

var x = d3.time.scale()
  .domain([d3.time.sunday(d3.min(items, function(d) { return d.start; })),
       d3.max(items, function(d) { return d.start.addHours(10); })])
  .range([0, width]);
var x1 = d3.time.scale().range([0, width]);

var ext = d3.extent(lanes, function(d) { return d.id; });
var y1 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, mainHeight]);
var y2 = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, miniHeight]);

var chart = d3.select('#el1')
  .attr('width', width + margin.right + padding.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart');

chart.append('defs').append('clipPath')
  .attr('id', 'clip')
  .append('rect')
    .attr('width', width)
    .attr('height', mainHeight);

var main = chart.append('g')
  .attr('transform', 'translate(' + padding.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', mainHeight)
  .attr('class', 'main');

var mini = chart.append('g')
  .attr('transform', 'translate(' + padding.left + ',' + (mainHeight + 60) + ')')
  .attr('width', width)
  .attr('height', miniHeight)
  .attr('class', 'mini');

// draw the lanes for the main chart
                        main.append('g').selectAll('.laneLines')
                            .data(lanes)
                            .enter().append('line')
                            .attr('x1', 0)
                            .attr('y1', function(d) { return d3.round(y1(d.id)) + 0.5; })
                            .attr('x2', width)
                            .attr('y2', function(d) { return d3.round(y1(d.id)) + 0.5; })
                            .attr('stroke', function(d) { return 'lightgray' });

                        main.selectAll('.laneText')
                            .data(lanes)
                            .enter().append("svg:image")
                            .attr("xlink:href", function(d) { return 'images/markers/' + d.id + '.png';})
                            .attr("height", 50)
                            .attr("width", 20)
                            .attr("x", -35)
                            .attr('y', function(d) { return d3.round(y1(d.id)) - 3; });
// draw the lanes for the mini chart
                        mini.append('g').selectAll('.laneLines')
                            .data(lanes)
                            .enter().append('line')
                            .attr('x1', 0)
                            .attr('y1', function(d) { return d3.round(y2(d.id)) + 10; })
                            .attr('x2', width)
                            .attr('y2', function(d) { return d3.round(y2(d.id)) + 10; })
                            .attr('stroke', function(d) { return 'lightgray' });

                        mini.append('g').selectAll('.laneText')
                            .data(lanes)
                            .enter().append("circle")
                            .attr("cx", function (d) { return -25; })
                            .attr("cy", function (d) { return d3.round(y1(d.id/2.1)) + 32; })
                            .attr("r", function (d) { return 5; })
                            .style("fill", function(d) { return colors[d.id-1]; });

// draw the x axis
                        var xDateAxis = d3.svg.axis()
                            .scale(x1)
                            .orient('bottom')
                            .ticks(d3.time.years, 1)
                            .tickFormat('')
                            .tickSize(0, 0, 0);

                        var x1DateAxis = d3.svg.axis()
                            .scale(x1)
                            .orient('bottom')
                            .ticks(d3.time.years, 1)
                            .tickFormat('')
                            .tickSize(0, 0, 0);

                        var xMonthAxis = d3.svg.axis()
                            .scale(x)
                            .orient('top')
                            .ticks(d3.time.months, 1)
                            .tickFormat(d3.time.format('%b %Y'))
                            .tickSize(8, 0, 0);

                        var x1MonthAxis = d3.svg.axis()
                            .scale(x1)
                            .orient('top')
                            .ticks(d3.time.mondays, 1)
                            .tickFormat(d3.time.format('%b - Week %W'))
                            .tickSize(-8, 0, 0);

                        main.append('g')
                            .attr('transform', 'translate(0,' + mainHeight + ')')
                            .attr('class', 'main axis date')
                            .call(x1DateAxis);

                        main.append('g')
                            .attr('transform', 'translate(0,0.5)')
                            .attr('class', 'main axis month')
                            .call(x1MonthAxis)
                            .selectAll('text')
                            .attr('dx', 5)
                            .attr('dy', 0);

                        mini.append('g')
                            .attr('transform', 'translate(0,' + miniHeight + ')')
                            .attr('class', 'axis date')
                            .call(xDateAxis);

                        mini.append('g')
                            .attr('transform', 'translate(0,0.5)')
                            .attr('class', 'axis month')
                            .call(xMonthAxis)
                            .selectAll('text')
                            .attr('dx', 5)
                            .attr('dy', 0);

// draw the items
                        var itemRects = main.append('g')
                            .attr('clip-path', 'url(#clip)');

                        mini.append('g').selectAll('miniItems')
                            .data(getPaths(items))
                            .enter().append('path')
                            .attr('stroke', function(d) { return "#000"; })
                            .attr('d', function(d) { return d.path; })
                            .attr('opacity', function() { return  0.5; })
                            .attr('stroke-width', function(d) { return 8; });

// invisible hit area to move around the selection window
                        mini.append('rect')
                            .attr('pointer-events', 'painted')
                            .attr('width', width)
                            .attr('height', miniHeight)
                            .attr('visibility', 'hidden')
                            .on('mouseup', moveBrush);

// draw the selection area
                        var brush = d3.svg.brush()
                            .x(x)
                            .extent([d3.time.monday(now),d3.time.saturday(now)])
                            .on("brush", display);

                        mini.append('g')
                            .attr('class', 'x brush')
                            .call(brush)
                            .selectAll('rect')
                            .attr('y', 1)
                            .attr('height', miniHeight - 1);

                        mini.selectAll('rect.background').remove();
                        display();
                        function display () {

                            var rects, labels
                                , minExtent = d3.time.day(brush.extent()[0])
                                , maxExtent = d3.time.day(brush.extent()[1])
                                , visItems = items.filter(function (d) { return d.start < maxExtent && d.start.addHours(5) > minExtent});
                            mini.select('.brush').call(brush.extent([minExtent, maxExtent]));

                            x1.domain([minExtent, maxExtent]);
                            if ((maxExtent - minExtent) > 100000000000) {
                                x1MonthAxis.ticks(d3.time.years, 1).tickFormat(d3.time.format('%b %Y'))
                            }
                            else if ((maxExtent - minExtent) > 6822000000) {
                                x1MonthAxis.ticks(d3.time.months, 1).tickFormat(d3.time.format('%B %Y'))
                            }
                            else if ((maxExtent - minExtent) > 1382400000) {
                                x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b %d'))
                            }
                            else {
                                x1MonthAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%b %e'))
                            }


                            //x1Offset.range([0, x1(d3.time.day.ceil(now) - x1(d3.time.day.floor(now)))]);

                            // shift the today line
                            main.select('.main.todayLine')
                                .attr('x1', x1(now) + 0.5)
                                .attr('x2', x1(now) + 0.5);

                            // update the axis
                            main.select('.main.axis.date').call(x1DateAxis);
                            main.select('.main.axis.month').call(x1MonthAxis)
                                .selectAll('text')
                                .attr('dx', 5)
                                .attr('dy', 0);

                            // upate the item rects
                            rects = itemRects.selectAll('rect')
                                .data(visItems, function (d) { return d.Id; })
                                .attr('x', function(d) { return x1(d.start); })
                                .attr('width', function(d) { return 5; });

                            rects.enter().append('rect')
                                .attr('x', function(d) { return x1(d.start); })
                                .attr('y', function(d) { return y1(d.lane) + 1; })
                                .attr('width', function(d) { return 5; })
                                .attr('height', function(d) { return 38; })
                                .attr('fill', function(d) { return color[d.act-1]; })
                                .attr("fill-opacity", function(d) {return "0.2";})

                            rects.exit().remove();

                            // update the item labels
                            labels = itemRects.selectAll('text')
                                .data(visItems, function (d) { return d.id; })
                                .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2; });

                            labels.enter().append('text')
                                //  .text(function (d) { return d.Id; })
                                //  .attr('x', function(d) { return x1(Math.max(d.start, minExtent)) + 2; })
                                //  .attr('y', function(d) { return y1(d.lane-1) + 25; })
                                //  .attr('text-anchor', 'start')
                                .attr('class', 'itemLabel');

                            labels.exit().remove();
                        }
                        function moveBrush () {
                            var origin = d3.mouse(this)
                                , point = x.invert(origin[0])
                                , halfExtent = (brush.extent()[1].getTime() - brush.extent()[0].getTime()) / 2
                                , start = new Date(point.getTime() - halfExtent)
                            // , end = start;
                            //end.setDate(end.getDate()+7);
                                , end = new Date(point.getTime() + halfExtent);

                            brush.extent([start,end]);
                            display();
                        }
// generates a single path for each item class in the mini display
// ugly - but draws mini 2x faster than append lines or line generator
// is there a better way to do a bunch of lines as a single path with d3?
                        function getPaths(items) {
                            var paths = {}, d, offset = .5 * y2(1) + 10, result = [];
                            for (var i = 0; i < items.length; i++) {
                                d = items[i];
                                if (!paths[d.class]) paths[d.class] = '';
                                paths[d.class] += ['M',x(d.start),(y2(d.lane) + offset),'H',x(d.start.addHours(5))].join(' ');
                            }
                            for (var className in paths) {
                                result.push({class: className, path: paths[className]});
                            }
                            return result;
                        }
                    });
            },
            getPie:function(val){

                d3.selectAll("#el2 > *").remove();
                var width = 300,
                    height = 300,
                    radius = Math.min(width, height) / 2;

                var color = ["#095B0F", "#231F20", "#98442B", "#1B9AD6", "#71BF44", "#FFAB09", "#50095B"];

                var arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.value; });
                var svg = d3.select('#el2')
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                d3.xhr('api/getStats2/'+val)
                    .get(function(error, data) {
                        if (error) throw error;
                        data = JSON.parse(data.response);
                        data.forEach(function(d) {
                            d.value = +d.value;
                        });
                        var g = svg.selectAll(".arc")
                            .data(pie(data))
                            .enter().append("g")
                            .attr("class", "arc");

                        g.append("path")
                            .attr("d", arc)
                            .style("fill", function(d, i) { return color[d.data.id-1]; });

                        g.append("text")
                            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                            .attr("dy", ".35em")
                            .style("text-anchor", "middle")
                            .style("fill", "#fff")
                            .text(function(d) { return d.data.value; });

                    });
            }




        }


    });

});