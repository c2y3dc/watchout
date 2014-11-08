// start slingin' some d3 here.

// var width = 500;
// var height = 1000;
var gameOptions = {
  height: 450,
  width: 700,
  numberOfEnemies: 30,
  padding: 20
};
var axes = {
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
// var circle = gameBoard.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 11).attr("fill", "red");

var createEnemies = function (numberOfEnemies){
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

  enemies.enter()
    .append('svg:circle')
    .attr('class','enemy')
    .attr('cx', function(enemy){
      return axes.x(enemy.x)
    }).attr('cy',function(enemy){
      return axes.y(enemy.y)
    }).attr('r',0);

}

renderEnemies(createEnemies(30));
