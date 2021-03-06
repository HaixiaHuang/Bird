(function( win ) {
var FlyObj = {};
FlyObj.toRadian = function( angle ) {
	return angle / 180 * Math.PI;
};
FlyObj.toAngle = function( radian ) {
	return radian / Math.PI * 180;
};
FlyObj.loadImages = function( imgSrc, callback ) {
  var count = 0,
    len = imgSrc.length,
    imgList = {};
	
  imgSrc.forEach(function(src) {
    var img = new Image();
    img.src = '../imgs/' + src + '.png';
    img.addEventListener('load', function() {
      count++;
      imgList[src] = img;
      if(count >= len) {
        callback( imgList );
      }
    });
  });
  };

// 创建canvas标签
FlyObj.createCV = function( id ) {
  var dv = document.getElementById(id);
  var cv = document.createElement('canvas');
  cv.height = 600;
  cv.width = 800;
  dv.appendChild( cv );
  return cv;
};
win.Fly = FlyObj;
})( window );