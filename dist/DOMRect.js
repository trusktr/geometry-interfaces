const x_ = Symbol('x');
const y_ = Symbol('y');
const width_ = Symbol('width');
const height_ = Symbol('height');
export class DOMRectReadOnly {
    [x_] = 0;
    [y_] = 0;
    [width_] = 0;
    [height_] = 0;
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this[x_] = Number(x);
        this[y_] = Number(y);
        this[width_] = Number(width);
        this[height_] = Number(height);
    }
    get x() {
        return this[x_];
    }
    get y() {
        return this[y_];
    }
    get width() {
        return this[width_];
    }
    get height() {
        return this[height_];
    }
    get top() {
        return Math.min(this[y_], this[y_] + this[height_]);
    }
    get right() {
        return Math.max(this[x_], this[x_] + this[width_]);
    }
    get bottom() {
        return Math.max(this[y_], this[y_] + this[height_]);
    }
    get left() {
        return Math.min(this[x_], this[x_] + this[width_]);
    }
    toJSON() {
        return {
            x: this[x_],
            y: this[y_],
            width: this[width_],
            height: this[height_],
        };
    }
    static fromRect(other) {
        return new this(other[x_], other[y_], other[width_], other[height_]);
    }
}
export class DOMRect extends DOMRectReadOnly {
    get x() {
        return this[x_];
    }
    get y() {
        return this[y_];
    }
    get width() {
        return this[width_];
    }
    get height() {
        return this[height_];
    }
    set x(value) {
        this[x_] = Number(value);
    }
    set y(value) {
        this[y_] = Number(value);
    }
    set width(value) {
        this[width_] = Number(value);
    }
    set height(value) {
        this[height_] = Number(value);
    }
}
//# sourceMappingURL=DOMRect.js.map