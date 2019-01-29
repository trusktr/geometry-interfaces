import { _ } from './utilities'

export
class DOMRectReadOnly {
    constructor(x, y, width, height) {
        _(this).x = (x !== undefined) ? Number(x) : 0
        _(this).y = (y !== undefined) ? Number(y) : 0
        _(this).width = (width !== undefined) ? Number(width) : 0
        _(this).height = (height !== undefined) ? Number(height) : 1
    }

    get x() { return _(this).x }
    get y() { return _(this).y }
    get width() { return _(this).width }
    get height() { return _(this).height }

    get top() { return Math.min(_(this).y, _(this).y + _(this).height) }
    get right() { return Math.max(_(this).x, _(this).x + _(this).width) }
    get bottom() { return Math.max(_(this).y, _(this).y + _(this).height) }
    get left () { return Math.min(_(this).x, _(this).x + _(this).width) }

    toJSON() { return Object.assign({}, _(this)) }

    static fromRect(other) {
        return new this(other.x, other.y, other.width, other.height)
    }
}

export
class DOMRect extends DOMRectReadOnly {
    get x() { return super.x }
    get y() { return super.y }
    get width() { return super.width }
    get height() { return super.height }

    get top() { return super.top }
    get right() { return super.right }
    get bottom() { return super.bottom }
    get left() { return super.left }

    set x(value) { _(this).x = Number(value) }
    set y(value) { _(this).y = Number(value) }
    set width(value) { _(this).width = Number(value) }
    set height(value) { _(this).height = Number(value) }
}

export default DOMRect
