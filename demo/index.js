window.onload = function() {
  var config = {
    xs: 480,
    sm: 767,
    md: 992,
    lg: 1199,
    xl: 10000
  };
  responsiveClasses(config, true);

  var currentClasses = document.getElementById('current-classes');
  displayCurrentClasses();

  window.onresize = function() {
    displayCurrentClasses();
  };

  setTimeout(function() {
    document.body.classList.add('added-later');
  }, 4000);

  function formatCurrentClasses() {
    var classNames = document.body.className.split(' ');
    classNames.splice(classNames.indexOf('initial'), 1);
    var addedLater = classNames.indexOf('added-later');
    if (addedLater > -1) {
      classNames.splice(addedLater, 1);
    }
    return classNames.join(' ');
  }

  function displayCurrentClasses() {
    currentClasses.innerHTML = formatCurrentClasses();
  }
};
