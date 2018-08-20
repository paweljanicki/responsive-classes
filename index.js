module.exports = responsiveClasses;

var breakpoints = {
  xs: 544,
  sm: 767,
  md: 992,
  lg: 1199,
  xl: 10000
};

var availableClasses = [];

function responsiveClasses(configBreakpoints, helperClasses) {
  if (configBreakpoints) {
    validateBreakpoints(configBreakpoints);
    checkHelperClassesValueType(helperClasses);
    breakpoints = configBreakpoints;
  }

  formatBreakpoints();

  addClasses(document.body.clientWidth, helperClasses);

  window.addEventListener("resize", resizeThrottler, false);

  function resizeThrottler() {
    var resizeTimeout;
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        addClasses(document.body.clientWidth, helperClasses)
        resizeTimeout = null;
       }, 66);
    }
  }
}

function validateBreakpoints(configBreakpoints) {
  checkBreakpointsType(configBreakpoints);
  checkIfUniqueBreakpointsProvided(configBreakpoints);
}

function checkBreakpointsType(configBreakpoints) {
  if (typeof configBreakpoints !== 'object' || configBreakpoints instanceof Array) {
    throw new TypeError("Config is not an object. Please provide an object")
  }
}

function checkIfUniqueBreakpointsProvided(configBreakpoints) {
  var values = [];

  for (var breakpoint in configBreakpoints) {
    if (configBreakpoints.hasOwnProperty(breakpoint)) {
      checkBreakpointValueType(configBreakpoints[breakpoint]);
      values.push(configBreakpoints[breakpoint]);
    } 
  }

  values.forEach(function(value) {
    var testAgainst = values.filter(function(item) {
      return item !== value;
    })

    if (testAgainst.length !== values.length - 1) {
      throw new Error("All breakpoints should have unique values");
    }
  })
}

function checkBreakpointValueType(breakpoint) {
  if (isNaN(breakpoint)) {
    throw new TypeError("All breakpoints should have numeric values");
  } else if (breakpoint < 1) {
    throw new Error("All breakpoints should have positive values");
  }
}

function checkHelperClassesValueType(helperClasses) {
  if (helperClasses !== undefined && helperClasses !== true && helperClasses !== false) {
    throw new TypeError("Second argument should be a boolean");
  }
}

function formatBreakpoints() {
  var values = [];
  var formatted = [];

  for (var breakpoint in breakpoints) {
    if (breakpoints.hasOwnProperty(breakpoint)) {
      values.push(breakpoints[breakpoint])
      availableClasses.push(breakpoint);
    }
  }

  values.sort(function(a, b) {
    return a - b;
  })

  for (var breakpoint in breakpoints) {
    if (breakpoints.hasOwnProperty(breakpoint)) {
      formatted.push({
        name: breakpoint,
        maxWidth: values.find(function(value) {
          return value === breakpoints[breakpoint];
        }),
        minWidth: values[values.indexOf(breakpoints[breakpoint]) - 1] ? 
          values[values.indexOf(breakpoints[breakpoint]) - 1] : 0
      })
    }
  }

  breakpoints = formatted; 
}

function addClasses(windowWidth, helperClasses) {
  var className = breakpoints.find(function(breakpoint) {
    return (breakpoint.minWidth < windowWidth && breakpoint.maxWidth >= windowWidth);
  }).name

  availableClasses.forEach(function(availableClass) {
    document.body.classList.remove(availableClass);
  });
  document.body.classList.add(className);
}
