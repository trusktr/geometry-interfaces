Geometry Interfaces
===================

The W3C [Geometry](http://www.w3.org/TR/cssom-view/#geometry)
[Interfaces](http://www.w3.org/TR/geometry-1/) implemented in JavaScript and
polyfilled.

In the box so far
-----------------

### Interfaces

#### Work in progress

- [DOMMatrixReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrixReadOnly)
- [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)

#### Up next

- [DOMPointReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly)
- [DOMPoint](https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint)

#### Under consideration

- [DOMRectReadOnly](https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly)
- [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)

Usage
-----

If you're using module system, just import the library:

```js
import 'geometry-interfaces'
// or
require('geometry-interfaces')
// or
define(['geometry-interfaces'], () => {})
```

You can also clone this repo, run `npm install`, then you'll see a `global.js`
file in the root of the project that you can copy over to your project and load
with a `<script>` tag, for example:

```html
<script src='global.js'></script>
```

(You can rename the file of course.)

If you don't want to polyfill everything and you're using a module system,
import whatever you need directly.

```js
import DOMMatrix from 'geometry-interfaces/DOMMatrix'
```

Contributing
------------

Disclaimer: I'm implementing these interfaces/APIs on an as-needed basis, so
this project may not currently include *all* of the interfaces or APIs.

Consider bringing the web forward by making a pull request to add missing
interfaces, APIs, or performance improvements (especially on the matrix
calculations). :]

Miscellaneous
-------------

The word "dommetry" is a play on the words "geometry" and "DOMMatrix" put
together.
