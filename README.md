# Geometry Interfaces

Let's do some dommetry!

The W3C [Geometry](http://www.w3.org/TR/cssom-view/#geometry)
[Interfaces](http://www.w3.org/TR/geometry-1/) implemented in JavaScript and
polyfilled.

<h4><code><strong>npm install geometry-interfaces</strong></code></h4>

## In the box so far

- [DOMMatrixReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrixReadOnly) \*
- [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) \*
- [DOMPointReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly) \*
- [DOMPoint](https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint) \*
- [DOMQuad](https://developer.mozilla.org/en-US/docs/Web/API/DOMQuad) \*
- [DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly)
- [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)

\* Some methods are not implemented yet.

## Usage

Just import the library after installing it [from
NPM](https://www.npmjs.com/package/geometry-interfaces) and it will polyfill the
global APIs:

```js
import 'geometry-interfaces' // ES Modules
```

If you're not using a build tool, just plain JS in a browser, you can set up an
[importmap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps):

```html
<script type="importmap">
	{
		"imports": {
			"geometry-interfaces": "/node_modules/geometry-interfaces/dist/index.js"
		}
	}
</script>

<script type="module">
	import 'geometry-interfaces'

	// ... use APIs ...
</script>
```

If you don't want to polyfill the APIs globally, you can import what you need
directly:

```js
import {DOMMatrix} from 'geometry-interfaces/dist/DOMMatrix.js'
import {DOMPoint} from 'geometry-interfaces/dist/DOMPoint.js'
```

## TypeScript

Make sure you have `lib: ["dom"]` in `tsconfig` or DOM types will be missing and
there may be type errors.

## Contributing

To develop the project, run `npm clean-install` after cloning the repo, then
`npm run dev` will build the TS to JS in watch mode, and `npm run build` will
build it without watch mode.

Any help would be greatly appreciated, as this is a purely free time unpaid
project. If you'd like to contribute, a pull request to add missing features,
APIs, tests, or performance improvements would be awesome. :]

## Miscellaneous

The word "dommetry" is a play on the words "geometry" and "DOMMatrix" put
together. :D
