// start slingin' some d3 here.



var gameOptions = {
  height: window.innerHeight,
  width: window.innerWidth,
  numberOfEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
}

var axez = {
  x: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.width*0.8]),
  y: d3.scale.linear()
      .domain([0, 100])
      .range([0, gameOptions.height*0.9])
  };
var gameBoard = d3.select("body").append("svg")
            .attr("width", gameOptions.width)
            .attr("height", gameOptions.height)
            .attr('class','background');


var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'indianred'); })
             .on('drag', function() { player.attr('x', d3.event.x)
                                            .attr('y', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'crimson'); });

var player = gameBoard.selectAll('.player')
                .data([{ x: (gameOptions.width / 2), y: (gameOptions.height / 4)}])
                .enter()
                .append('svg:image')
                .attr('xlink:href', "images/sun.svg")
                .attr('class', 'player')
                .attr('width', '80')
                .attr('height', '80')
                // .style({'top': function(d){ return d.y + 'px'},'left': function(d) { return d.x  + 'px'; }})
                .attr('x', function(d) { return d.x; })
                .attr('y', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                // .style('fill', 'crimson');

                // <object type="image/svg+xml" data="image.svg">Your browser does not support SVG</object>

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


var ran = false;


var renderEnemies = function(enemy_data){
  var enemies = gameBoard.selectAll("image.enemy").data(enemy_data, function(d){

    return d.id
  })



  // console.log(enemies)
  // enemies.attr("cx", Math.random()*100;).attr("cy", 250);
  enemies.transition().ease('bounce').duration(1500).tween('enemies', function(){

      var i = d3.interpolateRound(0, 100);
      return function(t) {

        ran = true;
        if (gameStats.bestScore < gameStats.score){
          gameStats.bestScore = gameStats.score
        }

        enemy = d3.select(this);
        distanceBetweenx = Math.abs(player.attr("x") - enemy.attr("x"))
        distanceBetweeny = Math.abs(player.attr("y") - enemy.attr("y"))

        if (distanceBetweenx<10 && distanceBetweeny<10){
          gameStats.score = 0;
          gameStats.collisions++;



          console.log(distanceBetweenx +" " + distanceBetweeny)
        }
        d3.select(".high > span").text(gameStats.bestScore)
        d3.select(".current > span").text(gameStats.score)
        d3.select(".collisions > span").text(gameStats.collisions)


      // console.log(enemy.attr('cx'));
    };
  }).attr('x', function(){
      return axez.x(Math.random()*100)
    })
    .attr('y', function(){
      return axez.y(Math.random()*100)
    })

  // d3.transition().

  enemies.enter()
    .append('svg:image')
    // .attr('class','enemy')
    .attr('xlink:href', "images/cloud.svg")
    .attr('class', 'enemy')
    .attr('width', '70')
    .attr('height', '70')

    .attr('x', function(enemy){

      return axez.x(enemy.x)

    }).attr('y',function(enemy){
      return axez.y(enemy.y)
    })
    .attr('r',80);

  // enemies.exit().remove();

}

// renderEnemies(createEnemies(30));

setInterval(function(){

  renderEnemies(createEnemies(30))}, 1500);

checkCollision = function(enemy, collidedCallback) {
  return function(player){
  var radiusSum, separation, xDiff, yDiff;
  radiusSum = parseFloat(enemy.attr('r')) + player.r;
  xDiff = parseFloat(enemy.attr('x')) - player.x;
  yDiff = parseFloat(enemy.attr('y')) - player.y;
  separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (separation < radiusSum) {
    return collidedCallback(player, enemy);
  }
  }

};

// d3.timer(function(){return gameStats.score++},100)
setInterval(function(){
  if(ran){
  return gameStats.score++}
},100)
