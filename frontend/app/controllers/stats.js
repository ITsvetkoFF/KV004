define(['./module'],function(controllers){
    'use strict';
    controllers.controller('statsCtrl',['$scope','$rootScope', '$http' ,function($scope, $rootScope){
       $rootScope.$broadcast('Update', '_full');

    $scope.bar = function(val){
   d3.selectAll("#el1 > *").remove();
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    var svg = d3.select('#el1')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
    d3.xhr('api/getStats1/'+ val)
    .get(function(error, data) {
      if (error) throw error;
      data = JSON.parse(data.response);
    data.forEach(function(d) {
    });
 
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Кількість проблем");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .style("fill", "#0099CC")
      .attr("height", function(d) { return height - y(d.value); });
    });
};

 $scope.bar2 = function(val){
   d3.selectAll("#el5 > *").remove();
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    var svg = d3.select('#el5')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
    d3.xhr('api/getStats5/'+ val)
    .get(function(error, data) {
      if (error) throw error;
      data = JSON.parse(data.response);
    data.forEach(function(d) {
    });
 
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Кількість голосів");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "#000099")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
    });
};

     $scope.pie = function(val){
   d3.selectAll("#el2 > *").remove();
   var width = 500,
    height = 500,
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
      console.log(data);
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
  };
  $scope.pie2 = function(){
   d3.selectAll("#el3 > *").remove();
   var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

var color = ['#449D44', '#D9533F'];

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });
var svg = d3.select('#el3')
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
     d3.xhr('api/getStats3')
    .get(function(error, data) {
      if (error) throw error;
      data = JSON.parse(data.response);
      console.log(data);
  data.forEach(function(d) {
    d.value = +d.value;
  });
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) { return color[d.data.status]; });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text(function(d) { return d.data.value; });

});
  };
    $scope.pie3 = function(){
   d3.selectAll("#el4 > *").remove();
   var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

var color = ["#095B0F", "#231F20", "#98442B", "#1B9AD6", "#71BF44", "#FFAB09", "#50095B"];

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });
var svg = d3.select('#el4')
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
     d3.xhr('api/getStats4')
    .get(function(error, data) {
      if (error) throw error;
      data = JSON.parse(data.response);
      console.log(data);
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
  };

    }]);
});