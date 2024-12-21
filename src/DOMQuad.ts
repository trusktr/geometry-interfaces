const p1 = Symbol('p1')
const p2 = Symbol('p2')
const p3 = Symbol('p3')
const p4 = Symbol('p4')

export class DOMQuad {
	[p1]!: DOMPoint;
	[p2]!: DOMPoint;
	[p3]!: DOMPoint;
	[p4]!: DOMPoint

	constructor(point1?: DOMPointInit, point2?: DOMPointInit, point3?: DOMPointInit, point4?: DOMPointInit) {
		this[p1] = point1 !== undefined ? new DOMPoint(point1.x, point1.y, point1.z, point1.w) : new DOMPoint()
		this[p2] = point2 !== undefined ? new DOMPoint(point2.x, point2.y, point2.z, point2.w) : new DOMPoint()
		this[p3] = point3 !== undefined ? new DOMPoint(point3.x, point3.y, point3.z, point3.w) : new DOMPoint()
		this[p4] = point4 !== undefined ? new DOMPoint(point4.x, point4.y, point4.z, point4.w) : new DOMPoint()
	}

	get p1() {
		return this[p1]
	}
	get p2() {
		return this[p2]
	}
	get p3() {
		return this[p3]
	}
	get p4() {
		return this[p4]
	}

	static fromRect(other: DOMRectReadOnly) {
		return other === undefined
			? new this()
			: new this(
					new DOMPoint(other.x, other.y, 0, 1),
					new DOMPoint(other.x + other.width, other.y, 0, 1),
					new DOMPoint(other.x + other.width, other.y + other.height, 0, 1),
					new DOMPoint(other.x, other.y + other.height, 0, 1),
			  )
	}

	static fromQuad(other: DOMQuad) {
		return other === undefined ? new this() : new this(other.p1, other.p2, other.p3, other.p4)
	}

	getBounds() {
		const _p1 = this[p1]
		const _p2 = this[p2]
		const _p3 = this[p3]
		const _p4 = this[p4]
		const left = Math.min(_p1.x, _p2.x, _p3.x, _p4.x)
		const top = Math.min(_p1.y, _p2.y, _p3.y, _p4.y)
		const right = Math.max(_p1.x, _p2.x, _p3.x, _p4.x)
		const bottom = Math.max(_p1.y, _p2.y, _p3.y, _p4.y)
		const width = right - left
		const height = bottom - top
		return new DOMRect(left, top, width, height)
	}

	toJSON() {
		return {
			p1: this[p1].toJSON(),
			p2: this[p2].toJSON(),
			p3: this[p3].toJSON(),
			p4: this[p4].toJSON(),
		}
	}
}
