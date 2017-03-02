# postcss-place [![Build Status](https://travis-ci.org/malyw/postcss-place.svg)](https://travis-ci.org/malyw/postcss-place)

> PostCSS plugin to polyfill the CSS Box Alignment shorthands: place-\<content|self|items\>

## Spec

[place-content](https://drafts.csswg.org/css-align-3/#propdef-place-content)

[place-self](https://drafts.csswg.org/css-align-3/#place-self-property)

[place-items](https://drafts.csswg.org/css-align-3/#place-items-property) 

## How to use

Using this:

```css
.single {
    place-content: space-between;
    place-self: flex-end;
    place-items: center;
}

.double {
    place-content: space-between unset;
    place-self: flex-start baseline;
    place-items: center stretch;
}
```

you will get (empty lines added for readability):

```css
.single {
    align-content: space-between;
    justify-content: space-between;
    place-content: space-between;
    
    align-self: flex-end;
    justify-self: flex-end;
    place-self: flex-end;
    
    align-items: center;
    justify-items: center;
    place-items: center;
}

.double {
    align-content: space-between;
    justify-content: unset;
    place-content: space-between unset;
    
    align-self: flex-start;
    justify-self: baseline;
    place-self: flex-start baseline;
    
    align-items: center;
    justify-items: stretch;
    place-items: center stretch;
}
```

## Installation

```console
$ npm install postcss-place
```

## Usage

```js
postcss([ require('postcss-place') ])
````

Check how to use with [Gulp](https://github.com/postcss/gulp-postcss),
[Grunt](https://github.com/nDmitry/grunt-postcss),
[Webpack, Node.js etc](https://github.com/postcss/postcss)

## [Changelog](CHANGELOG.md)

## License

MIT
