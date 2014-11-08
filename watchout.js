// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  numberOfEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
}

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
  enemies.transition().duration(1500).tween('enemies', function(){

      var i = d3.interpolateRound(0, 100);
      return function(t) {



        console.log(gameStats.score)
        enemy = d3.select(this);
        distanceBetweenx = Math.abs(player.attr("cx") - enemy.attr("cx"))
        distanceBetweeny = Math.abs(player.attr("cy") - enemy.attr("cy"))

        if (distanceBetweenx<10 && distanceBetweeny<10){
          gameStats.score = 0;

          console.log(distanceBetweenx +" " + distanceBetweeny)
        }


      // console.log(enemy.attr('cx'));
    };
  }).attr('cx', function(){
      return axez.x(Math.random()*100)
    })
    .attr('cy', function(){
      return axez.y(Math.random()*100)
    })

  // d3.transition().

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

checkCollision = function(enemy, collidedCallback) {
  return function(player){
  var radiusSum, separation, xDiff, yDiff;
  radiusSum = parseFloat(enemy.attr('r')) + player.r;
  xDiff = parseFloat(enemy.attr('cx')) - player.x;
  yDiff = parseFloat(enemy.attr('cy')) - player.y;
  separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (separation < radiusSum) {
    return collidedCallback(player, enemy);
  }
  }

};

setInterval(function(){return gameStats.score++},100)

