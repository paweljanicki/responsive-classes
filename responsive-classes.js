(function(window, exportName){
  // breakpoint which are used if user defined breakpoints are not specified
  var breakpoints = {
    xs: 544,
    sm: 767,
    md: 992,
    lg: 1199,
    xl: 10000
  };
  var availableClasses = [];
  var resizeTimeout;

  // main function which is exported
  function responsiveClasses(configBreakpoints, helperClasses) {
    if (configBreakpoints) {
      // Validate arguments
      validateBreakpoints(configBreakpoints);
      checkHelperClassesValueType(helperClasses);
      breakpoints = configBreakpoints;
    }

    // Formats breakpoints to a collection that is used later on
    formatBreakpoints();

    // Fires function that add classes for the first time
    addClasses(document.body.clientWidth, helperClasses);
    // Update classes on resize with throttling, 15 times per second
    window.addEventListener("resize", function() {
      if ( !resizeTimeout ) {
        resizeTimeout = setTimeout(function() {
          addClasses(document.body.clientWidth, helperClasses);
          resizeTimeout = null;
        }, 66);
      }
    });
  }

  function formatBreakpoints() {
    // values array will consist of breakpoints values, 0 is for the minWidth of first (smallest) breakpoint
    var values = [0];
    var formatted = [];

    // Get values and class names of all breakpoints
    for (var breakpoint in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpoint)) {
        values.push(breakpoints[breakpoint]);
        availableClasses.push(breakpoint);
      }
    }

    // Sort the values to correctly specify minWidth for each breakpoint later on
    values.sort(function(a, b) {
      return a - b;
    });

    // Create an object for each breakpoint with name, maxWidth and minWidth, and store them in termporaty formatted array
    for (var breakpoint in breakpoints) {
      if (breakpoints.hasOwnProperty(breakpoint)) {
        var maxWidth = breakpoints[breakpoint];
        formatted.push({
          name: breakpoint,
          maxWidth: maxWidth,
          minWidth: values[values.indexOf(maxWidth) - 1]
        });
      }
    }

    // Sort breakpoints based on maxWidth value, so they will be in order needed later on
    formatted.sort(function (a, b) {
      return a.maxWidth - b.maxWidth;
    });

    breakpoints = formatted; 
  }

  function addClasses(windowWidth, helperClasses) {
    var className = breakpoints.find(function(breakpoint) {
      return (breakpoint.minWidth < windowWidth && breakpoint.maxWidth >= windowWidth);
    }).name;
    
    if (helperClasses) {
      // remove all helper classes currently added to the body
      document.body.classList.forEach(function(className) {
        if (className.indexOf('-up') || className.indexOf('-down')) {
          document.body.classList.remove(className);
        }
      });
      
      // prepers new helper classes and adds them to the body
      buildHelperClasses(breakpoints, windowWidth);
    }

    // IE support
    availableClasses.forEach(function(className) {
      document.body.classList.remove(className);
    });
    document.body.classList.add(className);
  }

  function buildHelperClasses(breakpoints, windowWidth) {
    var helperClasses = [];
    breakpoints.forEach(function(breakpoint) {
      if (breakpoint.minWidth < windowWidth) {
        helperClasses.push(breakpoint.name + '-up');
      }
      if (breakpoint.maxWidth >= windowWidth) {
        helperClasses.push(breakpoint.name + '-down');
      }
    });

    // IE support
    helperClasses.forEach(function(className) {
      document.body.classList.add(className);
    });
  }


  /**
   * Validation 
   */
  function validateBreakpoints(configBreakpoints) {
    checkBreakpointsType(configBreakpoints);
    checkIfUniqueBreakpointsProvided(configBreakpoints);
  }

  function checkBreakpointsType(configBreakpoints) {
    if (typeof configBreakpoints !== 'object' || configBreakpoints instanceof Array) {
      throw new TypeError("Config is not an object. Please provide an object");
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
      });

      if (testAgainst.length !== values.length - 1) {
        throw new Error("All breakpoints should have unique values");
      }
    });
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

  /**
   *  Exports
   */
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return responsiveClasses;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = responsiveClasses;
  } else {
    window[exportName] = responsiveClasses;
  }
})(window, 'responsiveClasses');