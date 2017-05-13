(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GeometryInterfaces"] = factory();
	else
		root["GeometryInterfaces"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _DOMMatrix = __webpack_require__(1);

	var _DOMMatrix2 = _interopRequireDefault(_DOMMatrix);

	var _DOMMatrixReadOnly = __webpack_require__(2);

	var _DOMMatrixReadOnly2 = _interopRequireDefault(_DOMMatrixReadOnly);

	var _DOMPoint = __webpack_require__(4);

	var _global = null;

	// browser
	if (typeof window != 'undefined') {
	    _global = window;
	} else if (typeof global != 'undefined') {
	    _global = global;
	}

	if (_global) {
	    _global.DOMMatrix = _DOMMatrix2['default'];
	    _global.DOMMatrixReadOnly = _DOMMatrixReadOnly2['default'];
	    _global.DOMPoint = _DOMPoint.DOMPoint;
	    _global.DOMPointReadOnly = _DOMPoint.DOMPointReadOnly;
	}

	exports.DOMMatrix = _DOMMatrix2['default'];
	exports.DOMMatrixReadOnly = _DOMMatrixReadOnly2['default'];
	exports.DOMPoint = _DOMPoint.DOMPoint;
	exports.DOMPointReadOnly = _DOMPoint.DOMPointReadOnly;
	//# sourceMappingURL=index.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x14, _x15, _x16) { var _again = true; _function: while (_again) { var object = _x14, property = _x15, receiver = _x16; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x14 = parent; _x15 = property; _x16 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _DOMMatrixReadOnly2 = __webpack_require__(2);

	var _DOMMatrixReadOnly3 = _interopRequireDefault(_DOMMatrixReadOnly2);

	var _utilities = __webpack_require__(3);

	var DOMMatrix = (function (_DOMMatrixReadOnly) {
	    _inherits(DOMMatrix, _DOMMatrixReadOnly);

	    function DOMMatrix(arg) {
	        _classCallCheck(this, DOMMatrix);

	        var numArgs = arguments.length;
	        if (numArgs === 0) {
	            _get(Object.getPrototypeOf(DOMMatrix.prototype), 'constructor', this).call(this, [1, 0, 0, 1, 0, 0]);
	        } else if (numArgs === 1) {
	            if (typeof arg == 'string') {
	                throw new Error('CSS transformList arg not yet implemented.');
	                // TODO validate that syntax of transformList matches transform-list (http://www.w3.org/TR/css-transforms-1/#typedef-transform-list).
	            } else if (arg instanceof DOMMatrix) {
	                    _get(Object.getPrototypeOf(DOMMatrix.prototype), 'constructor', this).call(this, arg._matrix);
	                } else if (arg instanceof Float32Array || arg instanceof Float64Array || arg instanceof Array) {
	                    _get(Object.getPrototypeOf(DOMMatrix.prototype), 'constructor', this).call(this, arg);
	                }
	        } else {
	            throw new Error('Wrong number of arguments to DOMMatrix constructor.');
	        }
	    }

	    // Mutable transform methods

	    _createClass(DOMMatrix, [{
	        key: 'multiplySelf',
	        value: function multiplySelf(other) {
	            if (!(other instanceof DOMMatrix)) throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');

	            // TODO: avoid creating a new array, just apply values directly.
	            (0, _utilities.multiplyAndApply)(this, other, this);

	            if (!other.is2D) this._is2D = false;

	            return this;
	        }
	    }, {
	        key: 'preMultiplySelf',
	        value: function preMultiplySelf(other) {
	            if (!(other instanceof DOMMatrix)) throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');

	            // TODO: avoid creating a new array, just apply values directly.
	            (0, _utilities.multiplyAndApply)(other, this, this);

	            if (!other.is2D) this._is2D = false;

	            return this;
	        }
	    }, {
	        key: 'translateSelf',
	        value: function translateSelf(tx, ty) {
	            var tz = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            // TODO: check args are numbers

	            if (arguments.length === 1) throw new Error('The first two arguments (X and Y translation values) are required (the third, Z translation, is optional).');

	            // http://www.w3.org/TR/2012/WD-css3-transforms-20120911/#Translate3dDefined
	            var translationMatrix = new DOMMatrix([
	            // column-major:
	            1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1]);

	            this.multiplySelf(translationMatrix);

	            if (tz != 0) {
	                this._is2D = false;
	            }

	            return this;
	        }
	    }, {
	        key: 'scaleSelf',
	        value: function scaleSelf(scale) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            this.translateSelf(originX, originY);

	            this.multiplySelf(new DOMMatrix([
	            // 2D:
	            /*a*/scale, /*b*/0,
	            /*c*/0, /*d*/scale,
	            /*e*/0, /*f*/0]));

	            this.translateSelf(-originX, -originY);
	            return this;
	        }
	    }, {
	        key: 'scale3dSelf',
	        value: function scale3dSelf(scale) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var originZ = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	            this.translateSelf(originX, originY, originZ);

	            this.multiplySelf(new DOMMatrix([
	            // 3D
	            scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, scale, 0, 0, 0, 0, 1]));

	            this.translateSelf(-originX, -originY, -originZ);
	            return this;
	        }
	    }, {
	        key: 'scaleNonUniformSelf',
	        value: function scaleNonUniformSelf(scaleX) {
	            var scaleY = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	            var scaleZ = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	            var originX = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	            var originY = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	            var originZ = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

	            this.translateSelf(originX, originY, originZ);

	            this.multiplySelf(new DOMMatrix([
	            // 3D
	            scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1]));

	            this.translateSelf(-originX, -originY, -originZ);

	            if (scaleZ !== 1 || originZ !== 0) this._is2D = false;

	            return this;
	        }
	    }, {
	        key: 'rotateSelf',
	        value: function rotateSelf(angle) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            this.translateSelf(originX, originY);

	            // axis of rotation
	            var x = 0;
	            var y = 0;
	            var z = 1;
	            // We're rotating around the Z axis.

	            this.rotateAxisAngleSelf(x, y, z, angle);

	            this.translateSelf(-originX, -originY);
	            return this;
	        }

	        // TODO
	    }, {
	        key: 'rotateFromVectorSelf',
	        value: function rotateFromVectorSelf(x, y) {
	            throw new Error('rotateFromVectorSelf is not implemented yet.');
	        }
	    }, {
	        key: 'rotateAxisAngleSelf',
	        value: function rotateAxisAngleSelf(x, y, z, angle) {
	            var rotationMatrix = new DOMMatrix((0, _utilities.rotateAxisAngleArray)(x, y, z, angle));
	            this.multiplySelf(rotationMatrix);
	            return this;
	        }
	    }, {
	        key: 'skewXSelf',
	        value: function skewXSelf(sx) {
	            throw new Error('skewXSelf is not implemented yet.');
	        }
	    }, {
	        key: 'skewYSelf',
	        value: function skewYSelf(sy) {
	            throw new Error('skewYSelf is not implemented yet.');
	        }
	    }, {
	        key: 'invertSelf',
	        value: function invertSelf() {
	            throw new Error('invertSelf is not implemented yet.');
	        }
	    }, {
	        key: 'setMatrixValue',
	        value: function setMatrixValue( /*DOMString*/transformList) {
	            throw new Error('setMatrixValue is not implemented yet.');
	        }
	    }, {
	        key: 'a',
	        get: function get() {
	            return this.m11;
	        },
	        set: function set(value) {
	            this.m11 = value;
	        }
	    }, {
	        key: 'b',
	        get: function get() {
	            return this.m12;
	        },
	        set: function set(value) {
	            this.m12 = value;
	        }
	    }, {
	        key: 'c',
	        get: function get() {
	            return this.m21;
	        },
	        set: function set(value) {
	            this.m21 = value;
	        }
	    }, {
	        key: 'd',
	        get: function get() {
	            return this.m22;
	        },
	        set: function set(value) {
	            this.m22 = value;
	        }
	    }, {
	        key: 'e',
	        get: function get() {
	            return this.m41;
	        },
	        set: function set(value) {
	            this.m41 = value;
	        }
	    }, {
	        key: 'f',
	        get: function get() {
	            return this.m42;
	        },
	        set: function set(value) {
	            this.m42 = value;
	        }
	    }, {
	        key: 'm11',
	        get: function get() {
	            return this._matrix[0];
	        },
	        set: function set(value) {
	            this._matrix[0] = value;
	        }
	    }, {
	        key: 'm12',
	        get: function get() {
	            return this._matrix[4];
	        },
	        set: function set(value) {
	            this._matrix[4] = value;
	        }
	    }, {
	        key: 'm13',
	        get: function get() {
	            return this._matrix[8];
	        },
	        set: function set(value) {
	            this._matrix[8] = value;
	        }
	    }, {
	        key: 'm14',
	        get: function get() {
	            return this._matrix[12];
	        },
	        set: function set(value) {
	            this._matrix[12] = value;
	        }
	    }, {
	        key: 'm21',
	        get: function get() {
	            return this._matrix[1];
	        },
	        set: function set(value) {
	            this._matrix[1] = value;
	        }
	    }, {
	        key: 'm22',
	        get: function get() {
	            return this._matrix[5];
	        },
	        set: function set(value) {
	            this._matrix[5] = value;
	        }
	    }, {
	        key: 'm23',
	        get: function get() {
	            return this._matrix[9];
	        },
	        set: function set(value) {
	            this._matrix[9] = value;
	        }
	    }, {
	        key: 'm24',
	        get: function get() {
	            return this._matrix[13];
	        },
	        set: function set(value) {
	            this._matrix[13] = value;
	        }
	    }, {
	        key: 'm31',
	        get: function get() {
	            return this._matrix[2];
	        },
	        set: function set(value) {
	            this._matrix[2] = value;
	        }
	    }, {
	        key: 'm32',
	        get: function get() {
	            return this._matrix[6];
	        },
	        set: function set(value) {
	            this._matrix[6] = value;
	        }
	    }, {
	        key: 'm33',
	        get: function get() {
	            return this._matrix[10];
	        },
	        set: function set(value) {
	            this._matrix[10] = value;
	        }
	    }, {
	        key: 'm34',
	        get: function get() {
	            return this._matrix[14];
	        },
	        set: function set(value) {
	            this._matrix[14] = value;
	        }
	    }, {
	        key: 'm41',
	        get: function get() {
	            return this._matrix[3];
	        },
	        set: function set(value) {
	            this._matrix[3] = value;
	        }
	    }, {
	        key: 'm42',
	        get: function get() {
	            return this._matrix[7];
	        },
	        set: function set(value) {
	            this._matrix[7] = value;
	        }
	    }, {
	        key: 'm43',
	        get: function get() {
	            return this._matrix[11];
	        },
	        set: function set(value) {
	            this._matrix[11] = value;
	        }
	    }, {
	        key: 'm44',
	        get: function get() {
	            return this._matrix[15];
	        },
	        set: function set(value) {
	            this._matrix[15] = value;
	        }
	    }]);

	    return DOMMatrix;
	})(_DOMMatrixReadOnly3['default']);

	exports['default'] = DOMMatrix;
	module.exports = exports['default'];
	//# sourceMappingURL=DOMMatrix.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _DOMMatrix = __webpack_require__(1);

	var _DOMMatrix2 = _interopRequireDefault(_DOMMatrix);

	var _utilities = __webpack_require__(3);

	// This matrix is represented internally in row-major format so that it is easy
	// to look at visually. In a pair of coordinates (as in "m23") the first number
	// is the column and the second is the row (so "m23" means column 2 row 3).
	var identity = [
	/*m11*/1, /*m21*/0, /*m31*/0, /*m41*/0,
	/*m12*/0, /*m22*/1, /*m32*/0, /*m42*/0,
	/*m13*/0, /*m23*/0, /*m33*/1, /*m43*/0,
	/*m14*/0, /*m24*/0, /*m34*/0, /*m44*/1];

	var DOMMatrixReadOnly = (function () {

	    /**
	     * @param {Array.number} numberSequence An array of numbers. If the array
	     * has 6 items, then those items set the values of m11, m12, m21, m22, m41,
	     * m42 in that order (or the values a, b, c, d, e, f if you're using those
	     * aliases) and this.is2D is true. If the array has 16 items (in
	     * column-major order), then they set all the values of the underlying
	     * matrix (m11 to m44) and this.is2D is set false. Arrays of other lengths
	     * throw an error.
	     */

	    function DOMMatrixReadOnly() {
	        var numberSequence = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        _classCallCheck(this, DOMMatrixReadOnly);

	        if (!(this instanceof _DOMMatrix2['default'])) throw new TypeError('DOMMatrixReadOnly can\'t be instantiated directly. Use DOMMatrix instead.');

	        var length = numberSequence.length;

	        if (length === undefined || !(length === 6 || length === 16)) throw new TypeError('DOMMatrix constructor argument "numberSequence" must be an array-like with 6 or 16 numbers.');

	        this._matrix = new Float64Array(identity);
	        this._isIdentity = true;
	        this._is2D = length === 6 ? true : false;

	        (0, _utilities.applyArrayValuesToDOMMatrix)(numberSequence, this);
	    }

	    // Immutable transform methods -------------------------------------------

	    _createClass(DOMMatrixReadOnly, [{
	        key: 'translate',
	        value: function translate(tx, ty) {
	            var tz = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            return new _DOMMatrix2['default'](this).translateSelf(tx, ty, tz);
	        }
	    }, {
	        key: 'scale',
	        value: function scale(_scale) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            return new _DOMMatrix2['default'](this).scaleSelf(_scale, originX, originY);
	        }
	    }, {
	        key: 'scale3d',
	        value: function scale3d(scale) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var originZ = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	            return new _DOMMatrix2['default'](this).scale3dSelf(scale, originX, originY, originZ);
	        }
	    }, {
	        key: 'scaleNonUniform',
	        value: function scaleNonUniform(scaleX) {
	            var scaleY = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
	            var scaleZ = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	            var originX = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	            var originY = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	            var originZ = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

	            return new _DOMMatrix2['default'](this).scaleNonUniformSelf(scaleX, scaleY, scaleZ, originX, originY, originZ);
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(angle) {
	            var originX = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var originY = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            return new _DOMMatrix2['default'](this).rotateSelf(angle, originX, originY);
	        }

	        // TODO
	    }, {
	        key: 'rotateFromVector',
	        value: function rotateFromVector(x, y) {
	            throw new Error('rotateFromVector is not implemented yet.');
	        }
	    }, {
	        key: 'rotateAxisAngle',
	        value: function rotateAxisAngle(x, y, z, angle) {
	            return new _DOMMatrix2['default'](this).rotateAxisAngleSelf(x, y, z, angle);
	        }
	    }, {
	        key: 'skewX',
	        value: function skewX(sx) {
	            throw new Error('skewX is not implemented yet.');
	        }
	    }, {
	        key: 'skewY',
	        value: function skewY(sy) {
	            throw new Error('skewY is not implemented yet.');
	        }
	    }, {
	        key: 'multiply',
	        value: function multiply(other) {
	            return new _DOMMatrix2['default'](this).multiplySelf(other);
	        }
	    }, {
	        key: 'flipX',
	        value: function flipX() {
	            throw new Error('flipX is not implemented yet.');
	        }
	    }, {
	        key: 'flipY',
	        value: function flipY() {
	            throw new Error('flipY is not implemented yet.');
	        }
	    }, {
	        key: 'inverse',
	        value: function inverse() {
	            throw new Error('inverse is not implemented yet.');
	        }
	    }, {
	        key: 'transformPoint',
	        value: function transformPoint( /*optional DOMPointInit*/point) {
	            throw new Error('transformPoint is not implemented yet.');
	        }
	    }, {
	        key: 'toFloat32Array',
	        value: function toFloat32Array() {
	            throw new Error('toFloat32Array is not implemented yet.');
	        }
	    }, {
	        key: 'toFloat64Array',
	        value: function toFloat64Array() {
	            throw new Error('toFloat64Array is not implemented yet.');
	        }

	        //stringifier() {} // What's this?

	    }, {
	        key: 'is2D',
	        get: function get() {
	            return this._is2D;
	        }

	        /*
	         * TODO: make sure this matches the spec.
	         * TODO: Instead of calculating here, perhaps calculate and set
	         * this._isIdentity in other operations, and simply return the internal one
	         * here.
	         */
	    }, {
	        key: 'isIdentity',
	        get: function get() {
	            for (var i = 0, len = this._matrix.length; i < len; i += 1) {
	                if (this._matrix[i] != identity[i]) return this._isIdentity = false;
	            }

	            return this._isIdentity = true;
	        }
	    }, {
	        key: 'a',
	        get: function get() {
	            return this.m11;
	        }
	    }, {
	        key: 'b',
	        get: function get() {
	            return this.m12;
	        }
	    }, {
	        key: 'c',
	        get: function get() {
	            return this.m21;
	        }
	    }, {
	        key: 'd',
	        get: function get() {
	            return this.m22;
	        }
	    }, {
	        key: 'e',
	        get: function get() {
	            return this.m41;
	        }
	    }, {
	        key: 'f',
	        get: function get() {
	            return this.m42;
	        }
	    }, {
	        key: 'm11',
	        get: function get() {
	            return this._matrix[0];
	        }
	    }, {
	        key: 'm12',
	        get: function get() {
	            return this._matrix[4];
	        }
	    }, {
	        key: 'm13',
	        get: function get() {
	            return this._matrix[8];
	        }
	    }, {
	        key: 'm14',
	        get: function get() {
	            return this._matrix[12];
	        }
	    }, {
	        key: 'm21',
	        get: function get() {
	            return this._matrix[1];
	        }
	    }, {
	        key: 'm22',
	        get: function get() {
	            return this._matrix[5];
	        }
	    }, {
	        key: 'm23',
	        get: function get() {
	            return this._matrix[9];
	        }
	    }, {
	        key: 'm24',
	        get: function get() {
	            return this._matrix[13];
	        }
	    }, {
	        key: 'm31',
	        get: function get() {
	            return this._matrix[2];
	        }
	    }, {
	        key: 'm32',
	        get: function get() {
	            return this._matrix[6];
	        }
	    }, {
	        key: 'm33',
	        get: function get() {
	            return this._matrix[10];
	        }
	    }, {
	        key: 'm34',
	        get: function get() {
	            return this._matrix[14];
	        }
	    }, {
	        key: 'm41',
	        get: function get() {
	            return this._matrix[3];
	        }
	    }, {
	        key: 'm42',
	        get: function get() {
	            return this._matrix[7];
	        }
	    }, {
	        key: 'm43',
	        get: function get() {
	            return this._matrix[11];
	        }
	    }, {
	        key: 'm44',
	        get: function get() {
	            return this._matrix[15];
	        }
	    }]);

	    return DOMMatrixReadOnly;
	})();

	exports['default'] = DOMMatrixReadOnly;
	module.exports = exports['default'];
	//# sourceMappingURL=DOMMatrixReadOnly.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	
	// A reusable array, to avoid allocating new arrays during multiplication.
	// in column-major order:
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.multiplyAndApply = multiplyAndApply;
	exports.applyArrayValuesToDOMMatrix = applyArrayValuesToDOMMatrix;
	exports.rotateAxisAngleArray = rotateAxisAngleArray;
	var scratch = [
	/*m11*/0, /*m12*/0, /*m13*/0, /*m14*/0,
	/*m21*/0, /*m22*/0, /*m23*/0, /*m24*/0,
	/*m31*/0, /*m32*/0, /*m33*/0, /*m34*/0,
	/*m41*/0, /*m42*/0, /*m43*/0, /*m44*/0];

	function multiplyAndApply(A, B, target) {

	    //XXX: Are the following calculations faster hard coded (current), or as a loop?

	    scratch[0] = A.m11 * B.m11 + A.m21 * B.m12 + A.m31 * B.m13 + A.m41 * B.m14;
	    scratch[4] = A.m11 * B.m21 + A.m21 * B.m22 + A.m31 * B.m23 + A.m41 * B.m24;
	    scratch[8] = A.m11 * B.m31 + A.m21 * B.m32 + A.m31 * B.m33 + A.m41 * B.m34;
	    scratch[12] = A.m11 * B.m41 + A.m21 * B.m42 + A.m31 * B.m43 + A.m41 * B.m44;

	    scratch[1] = A.m12 * B.m11 + A.m22 * B.m12 + A.m32 * B.m13 + A.m42 * B.m14;
	    scratch[5] = A.m12 * B.m21 + A.m22 * B.m22 + A.m32 * B.m23 + A.m42 * B.m24;
	    scratch[9] = A.m12 * B.m31 + A.m22 * B.m32 + A.m32 * B.m33 + A.m42 * B.m34;
	    scratch[13] = A.m12 * B.m41 + A.m22 * B.m42 + A.m32 * B.m43 + A.m42 * B.m44;

	    scratch[2] = A.m13 * B.m11 + A.m23 * B.m12 + A.m33 * B.m13 + A.m43 * B.m14;
	    scratch[6] = A.m13 * B.m21 + A.m23 * B.m22 + A.m33 * B.m23 + A.m43 * B.m24;
	    scratch[10] = A.m13 * B.m31 + A.m23 * B.m32 + A.m33 * B.m33 + A.m43 * B.m34;
	    scratch[14] = A.m13 * B.m41 + A.m23 * B.m42 + A.m33 * B.m43 + A.m43 * B.m44;

	    scratch[3] = A.m14 * B.m11 + A.m24 * B.m12 + A.m34 * B.m13 + A.m44 * B.m14;
	    scratch[7] = A.m14 * B.m21 + A.m24 * B.m22 + A.m34 * B.m23 + A.m44 * B.m24;
	    scratch[11] = A.m14 * B.m31 + A.m24 * B.m32 + A.m34 * B.m33 + A.m44 * B.m34;
	    scratch[15] = A.m14 * B.m41 + A.m24 * B.m42 + A.m34 * B.m43 + A.m44 * B.m44;

	    applyArrayValuesToDOMMatrix(scratch, target);
	}

	function applyArrayValuesToDOMMatrix(array, matrix) {
	    var length = array.length;

	    if (length === 6) {
	        matrix.m11 = array[0];
	        matrix.m12 = array[1];
	        matrix.m21 = array[2];
	        matrix.m22 = array[3];
	        matrix.m41 = array[4];
	        matrix.m42 = array[5];
	    } else if (length === 16) {
	        matrix.m11 = array[0];
	        matrix.m12 = array[1];
	        matrix.m13 = array[2];
	        matrix.m14 = array[3];
	        matrix.m21 = array[4];
	        matrix.m22 = array[5];
	        matrix.m23 = array[6];
	        matrix.m24 = array[7];
	        matrix.m31 = array[8];
	        matrix.m32 = array[9];
	        matrix.m33 = array[10];
	        matrix.m34 = array[11];
	        matrix.m41 = array[12];
	        matrix.m42 = array[13];
	        matrix.m43 = array[14];
	        matrix.m44 = array[15];
	    }
	}

	function rotateAxisAngleArray(x, y, z, angle) {
	    var sin = Math.sin;
	    var cos = Math.cos;
	    var pow = Math.pow;

	    var halfAngle = degreesToRadians(angle / 2);

	    // TODO: should we provide a 6-item array here to signify 2D when the
	    // rotation is about the Z axis (for example when calling rotateSelf)?
	    // TODO: Performance can be improved by first detecting when x, y, or z of
	    // the axis are zero or 1, and using a pre-simplified version of the
	    // folowing math based on that condition.
	    // TODO: Performance can be improved by using different equations (use trig
	    // identities to find alternate formulas).
	    return [1 - 2 * (y * y + z * z) * pow(sin(halfAngle), 2), 2 * (x * y * pow(sin(halfAngle), 2) + z * sin(halfAngle) * cos(halfAngle)), 2 * (x * z * pow(sin(halfAngle), 2) - y * sin(halfAngle) * cos(halfAngle)), 0, 2 * (x * y * pow(sin(halfAngle), 2) - z * sin(halfAngle) * cos(halfAngle)), 1 - 2 * (x * x + z * z) * pow(sin(halfAngle), 2), 2 * (y * z * pow(sin(halfAngle), 2) + x * sin(halfAngle) * cos(halfAngle)), 0, 2 * (x * z * pow(sin(halfAngle), 2) + y * sin(halfAngle) * cos(halfAngle)), 2 * (y * z * pow(sin(halfAngle), 2) - x * sin(halfAngle) * cos(halfAngle)), 1 - 2 * (x * x + y * y) * pow(sin(halfAngle), 2), 0, 0, 0, 0, 1];
	}

	function degreesToRadians(degrees) {
	    return Math.PI / 180 * degrees;
	}
	//# sourceMappingURL=utilities.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var privatesMap = undefined;
	var _ = function _(o) {
	    if (!privatesMap) {
	        privatesMap = new WeakMap();
	        var privates = {};
	        privatesMap.set(o, privates);
	        return privates;
	    } else {
	        var privates = privatesMap.get(o);

	        if (privates === undefined) {
	            privates = {};
	            privatesMap.set(o, privates);
	        }

	        return privates;
	    }
	};

	var DOMPointReadOnly = (function () {
	    function DOMPointReadOnly(x, y, z, w) {
	        _classCallCheck(this, DOMPointReadOnly);

	        if (arguments.length === 1) {
	            if (!isDOMPointInit(x)) throw new TypeError('Expected an object with x, y, z, and w properties');

	            _(this).x = x.x;
	            _(this).y = x.y;
	            _(this).z = x.z;
	            _(this).w = x.w;
	        } else if (arguments.length === 4) {
	            _(this).x = x || 0;
	            _(this).y = y || 0;
	            _(this).z = z || 0;
	            _(this).w = w || 0;
	        } else {
	            throw new TypeError('Expected 1 or 4 arguments');
	        }
	    }

	    _createClass(DOMPointReadOnly, [{
	        key: 'matrixTransform',
	        value: function matrixTransform(matrix) {
	            var result = new this.constructor(this);
	            // TODO
	            //const x
	            //const y
	            //const z
	            //const w

	            return result;
	        }
	    }, {
	        key: 'x',
	        get: function get() {
	            return _(this).x;
	        }
	    }, {
	        key: 'y',
	        get: function get() {
	            return _(this).y;
	        }
	    }, {
	        key: 'z',
	        get: function get() {
	            return _(this).z;
	        }
	    }, {
	        key: 'w',
	        get: function get() {
	            return _(this).w;
	        }
	    }], [{
	        key: 'fromPoint',
	        value: function fromPoint(other) {
	            return new this(other);
	        }
	    }]);

	    return DOMPointReadOnly;
	})();

	exports.DOMPointReadOnly = DOMPointReadOnly;

	var DOMPoint = (function (_DOMPointReadOnly) {
	    _inherits(DOMPoint, _DOMPointReadOnly);

	    function DOMPoint() {
	        _classCallCheck(this, DOMPoint);

	        _get(Object.getPrototypeOf(DOMPoint.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(DOMPoint, [{
	        key: 'x',
	        set: function set(value) {
	            _(this).x = value;
	        }
	    }, {
	        key: 'y',
	        set: function set(value) {
	            _(this).y = value;
	        }
	    }, {
	        key: 'z',
	        set: function set(value) {
	            _(this).z = value;
	        }
	    }, {
	        key: 'w',
	        set: function set(value) {
	            _(this).w = value;
	        }
	    }]);

	    return DOMPoint;
	})(DOMPointReadOnly);

	exports.DOMPoint = DOMPoint;
	exports['default'] = DOMPoint;

	function isDOMPointInit(o) {
	    if (typeof o != 'object') return false;

	    if ('x' in o && 'y' in o && 'z' in o && 'w' in o) return true;

	    return false;
	}
	//# sourceMappingURL=DOMPoint.js.map

/***/ })
/******/ ])
});
;