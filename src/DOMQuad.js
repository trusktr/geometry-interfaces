import { _ } from './utilities'

export
class DOMQuad {
    constructor(p1, p2, p3, p4) {
        _(this).p1 = (p1 !== undefined) ? new DOMPoint(p1.x, p1.y, p1.z, p1.w) : new DOMPoint()
        _(this).p2 = (p2 !== undefined) ? new DOMPoint(p2.x, p2.y, p2.z, p2.w) : new DOMPoint()
        _(this).p3 = (p3 !== undefined) ? new DOMPoint(p3.x, p3.y, p3.z, p3.w) : new DOMPoint()
        _(this).p4 = (p4 !== undefined) ? new DOMPoint(p4.x, p4.y, p4.z, p4.w) : new DOMPoint()
    }

    get p1() { return _(this).p1 }
    get p2() { return _(this).p2 }
    get p3() { return _(this).p3 }
    get p4() { return _(this).p4 }

    static fromRect(other) {
        return (other === undefined) ? new this() : new this(
            new DOMPoint(other.x, other.y, 0, 1),
            new DOMPoint(other.x + other.width, other.y, 0, 1),
            new DOMPoint(other.x + other.width, other.y + other.height, 0, 1),
            new DOMPoint(other.x, other.y + other.height, 0, 1)
        )
    }

    static fromQuad(other) {
        return (other === undefined) ? new this() : new this(other.p1, other.p2, other.p3, other.p4)
    }

    getBounds() {
        const p1 = _(this).p1, p2 = _(this).p2, p3 = _(this).p3, p4 = _(this).p4  
        const left = Math.min(p1.x, p2.x, p3.x, p4.x)
        const top = Math.min(p1.y, p2.y, p3.y, p4.y)
        const right = Math.max(p1.x, p2.x, p3.x, p4.x)
        const bottom = Math.max(p1.y, p2.y, p3.y, p4.y)
        const width = right - left
        const height = bottom - top
        return new DOMRect(left, top, width, height)
    }

    toJSON() { return Object.assign({}, _(this)) }

}

export
class DOMQuad extends DOMQuadReadOnly {
    get p1() { return super.p1 }
    get p2() { return super.p2 }
    get p3() { return super.p3 }
    get p4() { return super.p4 }

    set p1(value) { _(this).p1 = value }
    set p2(value) { _(this).p2 = value }
    set p3(value) { _(this).p3 = value }
    set p4(value) { _(this).p4 = value }
}

export default DOMQuad
