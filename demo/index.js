var config = {
  xs: 480,
  sm: 767,
  md: 992,
  lg: 1199,
  xl: 10000
};
responsiveClasses(config, true);

var currentClasses = document.getElementById('current-classes');
currentClasses.innerHTML = document.body.className;

window.onresize = function() {
  currentClasses.innerHTML = document.body.className;
};