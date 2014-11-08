// start slingin' some d3 here.

// var width = 500;
// var height = 1000;
var gameOptions = {
  height: 450,
  width: 700,
  numberOfEnemies: 30,
  padding: 20
};
var axez = {
  x: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.width]),
  y: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.height])
  };
var gameBoard = d3.select("body").append("svg")
            .attr("width", gameOptions.width)
            .attr("height", gameOptions.height);


var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'indianred'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'crimson'); });

var player = gameBoard.selectAll('.draggableCircle')
                .data([{ x: (gameOptions.width / 2), y: (gameOptions.height / 2), r: 10 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'crimson');



var createEnemies = function (numberOfEnemies){
  console.log("called");
  var array = [];
  for(var i = 0; i < numberOfEnemies; i++){
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random()*100;
    enemy.y = Math.random()*100;
    array.push(enemy);
  }
  return array;
};



var renderEnemies = function(enemy_data){
  var enemies = gameBoard.selectAll("circle.enemy").data(enemy_data, function(d){

    return d.id
  })

  // console.log(enemies)
  // enemies.attr("cx", Math.random()*100;).attr("cy", 250);
  enemies.transition().duration(1500)
    .attr('cx', function(){
      return axez.x(Math.random()*100)
    })
    .attr('cy', function(){
      return axez.y(Math.random()*100)
    })

  enemies.enter()
    .append('svg:circle')
    .attr('class','enemy')
    .attr('cx', function(enemy){

      return axez.x(enemy.x)

    }).attr('cy',function(enemy){
      return axez.y(enemy.y)
    }).attr('r',10);

  // enemies.exit().remove();

}

// renderEnemies(createEnemies(30));

setInterval(function(){

  renderEnemies(createEnemies(30))}, 1500);
