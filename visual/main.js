/**
 * Created by rytis on 2015-07-15.
 */

var data = [[1,2,3]];

$(function() {
  var stage = $('#stage')[0];
  var ctx = stage.getContext("2d");

  ctx.fillStyle = "rgba(0,0,0,255)";

  for (var i=0; i< data.length; i++) {

    for (var j=0; j< data[i].length; j++) {
      if (data[i][j]) {
        ctx.fillRect( j*5, i*5, 5, 5 );
      }
    }

  }

});
