import {DOMMatrixReadOnly} from './DOMMatrix.js'

const x_ = Symbol('x')
const y_ = Symbol('y')
const z_ = Symbol('z')
const w_ = Symbol('w')

export class DOMPointReadOnly {
	[x_] = 0;
	[y_] = 0;
	[z_] = 0;
	[w_] = 1

	constructor(x = 0, y = 0, z = 0, w = 1) {
		this[x_] = Number(x)
		this[y_] = Number(y)
		this[z_] = Number(z)
		this[w_] = Number(w)
	}

	get x() {
		return this[x_]
	}
	get y() {
		return this[y_]
	}
	get z() {
		return this[z_]
	}
	get w() {
		return this[w_]
	}

	matrixTransform(matrix: DOMMatrixInit = new DOMMatrixReadOnly()): DOMPoint {
		if (!(matrix instanceof DOMMatrixReadOnly))
			throw new Error('The argument to matrixTransform must be an instance of DOMMatrixReadOnly')

		const m = matrix
		const x = this[x_]
		const y = this[y_]
		const z = this[z_]
		const w = this[w_]

		return new DOMPoint(
			m.m11 * x + m.m21 * y + m.m31 * z + m.m41 * w,
			m.m12 * x + m.m22 * y + m.m32 * z + m.m42 * w,
			m.m13 * x + m.m23 * y + m.m33 * z + m.m43 * w,
			m.m14 * x + m.m24 * y + m.m34 * z + m.m44 * w,
		)
	}

	toJSON() {
		return {
			x: this[x_],
			y: this[y_],
			z: this[z_],
			w: this[w_],
		}
	}

	static fromPoint(other?: DOMPointInit) {
		if (!other) {
			return new this()
		}
		return new this(other.x, other.y, other.z, other.w)
	}
}

export class DOMPoint extends DOMPointReadOnly {
	override get x() {
		return this[x_]
	}
	override get y() {
		return this[y_]
	}
	override get z() {
		return this[z_]
	}
	override get w() {
		return this[w_]
	}

	override set x(value) {
		this[x_] = Number(value)
	}
	override set y(value) {
		this[y_] = Number(value)
	}
	override set z(value) {
		this[z_] = Number(value)
	}
	override set w(value) {
		this[w_] = Number(value)
	}
}
