# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2018-09-13 Pikon

### Added
- Helper classes
- Encapsulate library code
- Export as AMD module
- Allow direct script import in HTML
- Add comments to the code
- UglifyJS to minify and compress the library
- NPM script to run UglifyJS
- Add minified version
- New sections added to readme

### Fixed
- Fix throttling resize event

### Changed
- Refactor code
- Change main file name to `responsive-classes.js`
- Improve demo


## [0.1.0] - 2018-08-21

### Added
- Export as a Node.js module
- Throttle resize event and set it to 15 times per second
- Add README
- Add .gitignore

### Changed
- Change default classes
- Body width is used for calculations instead of window width

### Fixed
- Change ES6 spread operator to ES5 forEach method

## [0.0.1] - 2018-08-08
### Added
- Option to add one responsive class at the time to the body
- Arguments validation