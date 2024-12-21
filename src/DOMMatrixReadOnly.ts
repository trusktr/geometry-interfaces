import {DOMMatrix} from './DOMMatrix.js'
import {applyArrayValuesToDOMMatrix} from './utilities.js'

// This matrix is represented internally in row-major format so that it is easy
// to look at visually. In a pair of coordinates (as in "m23") the first number
// is the column and the second is the row (so "m23" means column 2 row 3).
// prettier-ignore
const identity = [
	/*m11*/ 1, /*m21*/ 0, /*m31*/ 0, /*m41*/ 0,
	/*m12*/ 0, /*m22*/ 1, /*m32*/ 0, /*m42*/ 0,
	/*m13*/ 0, /*m23*/ 0, /*m33*/ 1, /*m43*/ 0,
	/*m14*/ 0, /*m24*/ 0, /*m34*/ 0, /*m44*/ 1,
]

// Hack to export a `unique symbol` type as a `var` so that we can hoist it
// and use it in the DOMMatrix class. This is a workaround for a circular
// dependency between DOMMatrix and DOMMatrixReadOnly.
declare const _matrix: unique symbol
const symbols = getMatrixSymbols()
export var matrix: typeof _matrix = symbols[0] as typeof _matrix
declare const _is2D: unique symbol
export var is2D: typeof _is2D = symbols[1] as typeof _is2D

let accessCount = 0

export function getMatrixSymbols() {
	accessCount++
	if (accessCount > 2) throw new Error('The matrix symbol is internal only.')
	if (!matrix) matrix = Symbol('matrix') as typeof _matrix
	if (!is2D) matrix = Symbol('matrix') as typeof _matrix
	return [matrix, is2D]
}

// This pattern used in scenarios with a circular dependency. In this case,
// DOMMatrix depends on DOMMatrixReadOnly, and DOMMatrixReadOnly depends on
// DOMMatrix. The solution is to create a function that returns the class, and
// then call it in the dependent file.  Because functions in JavaScript modules
// are hoisted, the function can be called before its source modules is even
// executed. This function is used in the following files:
//
// - src/DOMMatrixReadOnly.ts
// - src/DOMMatrix.ts
//
// Without defining DOMMatrixReadOnly this way, a runtime error may occur
// depending on the order modules are imported.
export var DOMMatrixReadOnly = initDOMMatrixReadOnly()

export function initDOMMatrixReadOnly() {
	return class _DOMMatrixReadOnly {
		[matrix] = new Float64Array(identity);
		[is2D] = length === 6 ? true : false

		/**
		 * @param {Array.number} init An array of numbers. If the array
		 * has 6 items, then those items set the values of m11, m12, m21, m22, m41,
		 * m42 in that order (or the values a, b, c, d, e, f if you're using those
		 * aliases) and this.is2D is true. If the array has 16 items (in
		 * column-major order), then they set all the values of the underlying
		 * matrix (m11 to m44) and this.is2D is set false. Arrays of other lengths
		 * throw an error.
		 */
		constructor(init: string | ArrayLike<number> = []) {
			if (!(this instanceof DOMMatrix))
				throw new TypeError(`DOMMatrixReadOnly can't be instantiated directly. Use DOMMatrix instead.`)

			if (typeof init === 'string') throw new Error('CSS transform string not supported yet.')

			const {length} = init

			if (length === undefined || !(length === 6 || length === 16))
				throw new TypeError(
					`Failed to construct '${
						new.target === DOMMatrixReadOnly ? 'DOMMatrixReadOnly' : 'DOMMatrix'
					}': The sequence must contain 6 elements for a 2D matrix or 16 elements for a 3D matrix.'`,
				)

			applyArrayValuesToDOMMatrix(init, this)
		}

		// Immutable transform methods -------------------------------------------

		translate(tx = 0, ty = 0, tz = 0): DOMMatrix {
			return new DOMMatrix(this).translateSelf(tx, ty, tz)
		}

		scale(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0): DOMMatrix {
			return new DOMMatrix(this).scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ)
		}

		scale3d(scale = 1, originX = 0, originY = 0, originZ = 0): DOMMatrix {
			return new DOMMatrix(this).scale3dSelf(scale, originX, originY, originZ)
		}

		/** @deprecated use `matrix.scale()` */
		scaleNonUniform(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
			return this.scale(scaleX, scaleY, scaleZ, originX, originY, originZ)
		}

		rotate(angle = 0, originX = 0, originY = 0): DOMMatrix {
			return new DOMMatrix(this).rotateSelf(angle, originX, originY)
		}

		// TODO
		rotateFromVector(_x = 0, _y = 0): DOMMatrix {
			throw new Error('rotateFromVector is not implemented yet.')
		}

		rotateAxisAngle(x = 0, y = 0, z = 0, angle = 0): DOMMatrix {
			return new DOMMatrix(this).rotateAxisAngleSelf(x, y, z, angle)
		}

		skewX(_sx = 0): DOMMatrix {
			throw new Error('skewX is not implemented yet.')
		}
		skewY(_sy = 0): DOMMatrix {
			throw new Error('skewY is not implemented yet.')
		}

		multiply(other: DOMMatrixReadOnly): DOMMatrix {
			return new DOMMatrix(this).multiplySelf(other)
		}

		flipX(): DOMMatrix {
			throw new Error('flipX is not implemented yet.')
		}
		flipY(): DOMMatrix {
			throw new Error('flipY is not implemented yet.')
		}
		inverse(): DOMMatrix {
			throw new Error('inverse is not implemented yet.')
		}

		transformPoint(_point: DOMPointInit): DOMPoint {
			throw new Error('transformPoint is not implemented yet.')
		}

		toFloat32Array() {
			return Float32Array.from(this[matrix])
		}
		toFloat64Array() {
			return Float64Array.from(this[matrix])
		}

		// stringifier
		// https://drafts.fxtf.org/geometry/#dommatrixreadonly-stringification-behavior
		toString(): string {
			throw new Error('Not implemented yet: return a CSS transform string.')
		}

		get is2D() {
			return this[is2D]
		}

		/*
		 * TODO: make sure this matches the spec.
		 * TODO: Instead of calculating here, perhaps calculate and set
		 * this._isIdentity in other operations, and simply return the internal one
		 * here.
		 */
		get isIdentity() {
			for (var i = 0, len = this[matrix].length; i < len; i += 1) {
				if (this[matrix][i] != identity[i]) return false
			}

			return true
		}

		get a() {
			return this.m11
		}
		get b() {
			return this.m12
		}
		get c() {
			return this.m21
		}
		get d() {
			return this.m22
		}
		get e() {
			return this.m41
		}
		get f() {
			return this.m42
		}

		get m11() {
			return this[matrix][0]!
		}
		get m12() {
			return this[matrix][4]!
		}
		get m13() {
			return this[matrix][8]!
		}
		get m14() {
			return this[matrix][12]!
		}

		get m21() {
			return this[matrix][1]!
		}
		get m22() {
			return this[matrix][5]!
		}
		get m23() {
			return this[matrix][9]!
		}
		get m24() {
			return this[matrix][13]!
		}

		get m31() {
			return this[matrix][2]!
		}
		get m32() {
			return this[matrix][6]!
		}
		get m33() {
			return this[matrix][10]!
		}
		get m34() {
			return this[matrix][14]!
		}

		get m41() {
			return this[matrix][3]!
		}
		get m42() {
			return this[matrix][7]!
		}
		get m43() {
			return this[matrix][11]!
		}
		get m44() {
			return this[matrix][15]!
		}

		toJSON() {
			return {
				a: this.a,
				b: this.b,
				c: this.c,
				d: this.d,
				e: this.e,
				f: this.f,

				m11: this.m11,
				m12: this.m12,
				m13: this.m13,
				m14: this.m14,
				m21: this.m21,
				m22: this.m22,
				m23: this.m23,
				m24: this.m24,
				m31: this.m31,
				m32: this.m32,
				m33: this.m33,
				m34: this.m34,
				m41: this.m41,
				m42: this.m42,
				m43: this.m43,
				m44: this.m44,
			}
		}

		static fromMatrix(other: DOMMatrixReadOnly) {
			const mat = other[matrix as unknown as keyof typeof other] as unknown as number[]
			return new this(mat)
		}

		static fromFloat32Array(array: Float32Array) {
			return new this(array)
		}

		static fromFloat64Array(array: Float64Array) {
			return new this(array)
		}
	}
}
