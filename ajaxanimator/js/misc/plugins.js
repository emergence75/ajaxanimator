/*
* sample macros
* using the macro api
*/

Ax.plugins = {}

Ax.plugins["Wave"] = function(mx,my){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.translate(shape,0,mx*Math.sin(shape.left/shape.width*my))
  })
}

Ax.plugins["Brick Wall"] = function(sx, sy, height, width, brickheight, brickwidth){
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      Ax.api.create.shape({
        type: "rect",
        top: sy+(y*brickheight),
        left: sx+(x*brickwidth),
        width: brickwidth,
        height: brickheight
        });
    }
  }
}



Ax.plugins["Explode"] = function(){
  Ax.api.loop.frame(function(shape){
    return Ax.api.transform.absolute(shape, Math.round(Math.random()*Ax.canvasHeight), Math.round(Math.random()*Ax.canvasWidth));  
  })
}

Ax.plugins["Random Shape"] = function(){
  Ax.api.create.shape({
    type: "rect",
    top: Math.random()*Ax.canvasHeight,
    left: Math.random()*Ax.canvasWidth,
    width: Math.random()*Ax.canvasHeight,
    height: Math.random()*Ax.canvasHeight
  });
}

