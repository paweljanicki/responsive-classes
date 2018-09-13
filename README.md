# responsive-classes
A Vanilla JS library that adds classes to the `<body>` which can be used to apply responsive styles.
It is lightweight (641B minified and gzipped), has no dependencies and is documented with comments. Check out `responsive-classes.js` file.

## Dafault breakpoints:
| Class name | Maximum width  |
|--|--|
|.xs | 544px |
|.sm | 767px |
|.md | 992px |
|.lg | 1199px |
|.xl | 10000px |

## Usage
### Import
````js
import * as responsiveClasses from 'responsive-classes';
````
or
````html
<script src="./path/to/responsive-classes.min.js"></script>
````
### Default usage
To use default classes simply call the function
````js
responsiveClasses();
````
### Custom classes
To use custom classes provide an argument to the `responsiveClasses()` function like this:
````js
responsiveClasses({
	sm: 767,
	md: 992,
	lg: 1199,
	xl: 3000,
	xxl: 10000
});
````
The argument should be an object where property name is a class name and value is the maximum `<body>` width in pixels. Values should be a Number. The order is not important.

Body width used for calculations doesn't include scrollbar.

### Helper classes
Helper classes allow you to style multiple breakpoints using one class. Two helper classes are created for each breakpoint. One with suffix `-up` is created for screen width bigger than minimun width of a breakpoint, and class with suffix `-down` is created for screen width smaller than maximum width of a breakpoint.

To use helper classes provide `true` as a second argument to `responsiveClasses()`
````js
responsiveClasses(breakpoints, true);
````
You have to provide breakpoints object as the first argument if you want to use helper classes.

Assuming that you use three breakpoint like this:
````js
responsiveClasses({
	sm: 767,
	md: 992,
	lg: 1199
}, true);
````
You will get the following classes:

| Example screen width | Classes  |
|--|--|
| 640px | .sm .sm-down .sm-up .md-down .lg-down |
| 1024px | .md .md-down .md-up .sm-up .lg-down |
| 1600px | .lg .lg-down .lg-up .md-up .sm-up |

Screen width values in the table above are used only for presentation

## About
I was inspired by this [article](https://medium.com/@kelin2025/writing-js-libraries-less-than-1tb-size-6342da0c006a) on writing nano libraries in JavaScript. The code is written in Vanilla JS and has no dependencies. It's not only lightweight (641B minified and gzipped), but it also has a clean interface, extensive validation and is well documented with comments.

## License
MIT
