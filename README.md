# responsive-classes
A simple library that adds classes which can be used to apply responsive styles. Classes are added to the `<body>` element and they are updated on `resize` event.

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
<script src="./path/to/responsive-classes.js"></script>
````
### Default usage
To use default classes simply call the function
````js
responsiveClasses();
````
### Custom classes
To use custom classes provide an argument to the ``responsiveClasses()`` function like this:
````js
responsiveClasses({
	sm: 767,
	md: 992,
	lg: 1199,
	xl: 3000,
	xxl: 10000
});
````
The argument should be an object where property name is a class name and value is the maximum ``<body>`` width in pixels. Values should be a Number. The order is not important.