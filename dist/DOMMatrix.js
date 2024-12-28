import { DOMPoint } from './DOMPoint.js';
import { multiplyAndApply, normalizePoint, toAxisRotation } from './utilities.js';
import { identityValues } from './utilities.js';
const default2DValues = Object.freeze([1, 0, 0, 1, 0, 0]);
const elements = Symbol('elements');
const is2D = Symbol('is2D');
export class DOMMatrixReadOnly {
    /** The elements of the matrix, in column-major order. */
    [elements] = new Float64Array(identityValues);
    [is2D] = true;
    /**
     * @param {string | Array<number>} init An array of numbers, or a CSS
     * transform string. If the array has 6 items, then those items set the
     * values of m11, m12, m21, m22, m41, m42 in that order (or the values
     * a, b, c, d, e, f if you're using those aliases) and this.is2D is
     * true. If the array has 16 items (in column-major order), then they
     * set all the values of the underlying matrix (m11 to m44) and
     * this.is2D is set false. Arrays of other lengths throw an error.
     */
    constructor(init = default2DValues) {
        if (typeof init === 'string')
            throw new Error('CSS transform string not supported yet.');
        const { length } = init;
        if (length === undefined || (length !== 6 && length !== 16))
            throw new TypeError(`Failed to construct '${new.target === DOMMatrixReadOnly ? 'DOMMatrixReadOnly' : 'DOMMatrix'}': The sequence must contain 6 elements for a 2D matrix or 16 elements for a 3D matrix.'`);
        this[is2D] = length === 6 ? true : false;
        if (this[is2D]) {
            this[elements][0] = init[0];
            this[elements][1] = init[1];
            this[elements][4] = init[2];
            this[elements][5] = init[3];
            this[elements][12] = init[4];
            this[elements][13] = init[5];
        }
        else {
            this[elements].set(init);
        }
    }
    // Immutable transform methods -------------------------------------------
    multiply(other) {
        return new DOMMatrix(getInit(this)).multiplySelf(other);
    }
    translate(tx = 0, ty = 0, tz = 0) {
        return new DOMMatrix(getInit(this)).translateSelf(tx, ty, tz);
    }
    scale(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        return new DOMMatrix(getInit(this)).scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ);
    }
    scale3d(scale = 1, originX = 0, originY = 0, originZ = 0) {
        return new DOMMatrix(getInit(this)).scale3dSelf(scale, originX, originY, originZ);
    }
    /** @deprecated use `matrix.scale()` */
    scaleNonUniform(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        return this.scale(scaleX, scaleY, scaleZ, originX, originY, originZ);
    }
    rotateAxisAngle(x = 0, y = 0, z = 0, angle = 0) {
        return new DOMMatrix(getInit(this)).rotateAxisAngleSelf(x, y, z, angle);
    }
    rotate(angle = 0, originX = 0, originY = 0) {
        return new DOMMatrix(getInit(this)).rotateSelf(angle, originX, originY);
    }
    // TODO
    rotateFromVector(_x = 0, _y = 0) {
        throw new Error('rotateFromVector is not implemented yet.');
    }
    skewX(_sx = 0) {
        throw new Error('skewX is not implemented yet.');
    }
    skewY(_sy = 0) {
        throw new Error('skewY is not implemented yet.');
    }
    flipX() {
        throw new Error('flipX is not implemented yet.');
    }
    flipY() {
        throw new Error('flipY is not implemented yet.');
    }
    inverse() {
        throw new Error('inverse is not implemented yet.');
    }
    transformPoint(_point) {
        throw new Error('transformPoint is not implemented yet.');
    }
    toFloat32Array() {
        return Float32Array.from(this[elements]);
    }
    toFloat64Array() {
        return Float64Array.from(this[elements]);
    }
    // stringifier
    // https://drafts.fxtf.org/geometry/#dommatrixreadonly-stringification-behavior
    toString() {
        if (this[is2D])
            return `matrix(${this[elements][0]}, ${this[elements][1]}, ${this[elements][4]}, ${this[elements][5]}, ${this[elements][12]}, ${this[elements][13]})`;
        else
            return `matrix3d(${this[elements][0]}, ${this[elements][1]}, ${this[elements][2]}, ${this[elements][3]}, ${this[elements][4]}, ${this[elements][5]}, ${this[elements][6]}, ${this[elements][7]}, ${this[elements][8]}, ${this[elements][9]}, ${this[elements][10]}, ${this[elements][11]}, ${this[elements][12]}, ${this[elements][13]}, ${this[elements][14]}, ${this[elements][15]})`;
    }
    get is2D() {
        return this[is2D];
    }
    /*
     * TODO: make sure this matches the spec.
     * TODO: Instead of calculating here, perhaps calculate and set
     * this._isIdentity in other operations, and simply return the internal one
     * here.
     */
    get isIdentity() {
        for (var i = 0, len = this[elements].length; i < len; i += 1) {
            if (this[elements][i] !== identityValues[i])
                return false;
        }
        return true;
    }
    get a() {
        return this.m11; // elements[0]
    }
    get b() {
        return this.m12; // elements[1]
    }
    get c() {
        return this.m21; // elements[4]
    }
    get d() {
        return this.m22; // elements[5]
    }
    get e() {
        return this.m41; // elements[12]
    }
    get f() {
        return this.m42; // elements[13]
    }
    get m11() {
        return this[elements][0];
    }
    get m12() {
        return this[elements][1];
    }
    get m13() {
        return this[elements][2];
    }
    get m14() {
        return this[elements][3];
    }
    get m21() {
        return this[elements][4];
    }
    get m22() {
        return this[elements][5];
    }
    get m23() {
        return this[elements][6];
    }
    get m24() {
        return this[elements][7];
    }
    get m31() {
        return this[elements][8];
    }
    get m32() {
        return this[elements][9];
    }
    get m33() {
        return this[elements][10];
    }
    get m34() {
        return this[elements][11];
    }
    get m41() {
        return this[elements][12];
    }
    get m42() {
        return this[elements][13];
    }
    get m43() {
        return this[elements][14];
    }
    get m44() {
        return this[elements][15];
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
        };
    }
    static fromMatrix(other) {
        const mat = other[elements];
        return new this(mat);
    }
    static fromFloat32Array(array) {
        return new this(array);
    }
    static fromFloat64Array(array) {
        return new this(array);
    }
}
export class DOMMatrix extends DOMMatrixReadOnly {
    constructor(arg) {
        if (arg === undefined) {
            super();
        }
        else if (typeof arg == 'string') {
            throw new Error('CSS transformList arg not yet implemented.');
            // TODO validate that syntax of transformList matches transform-list (http://www.w3.org/TR/css-transforms-1/#typedef-transform-list).
        }
        else if (isNumberSequence(arg)) {
            super(arg);
        }
        else
            throw new Error('Invalid argument to DOMMatrix constructor.');
    }
    // Mutable transform methods
    multiplySelf(other) {
        if (!(other instanceof DOMMatrix))
            throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');
        // TODO: avoid creating a new array, just apply values directly.
        multiplyAndApply(this, other, this);
        if (!other[is2D])
            this[is2D] = false;
        return this;
    }
    preMultiplySelf(other) {
        if (!(other instanceof DOMMatrix))
            throw new Error('The argument to preMultiplySelf must be an instance of DOMMatrix');
        // TODO: avoid creating a new array, just apply values directly.
        multiplyAndApply(other, this, this);
        if (!other[is2D])
            this[is2D] = false;
        return this;
    }
    translateSelf(tx = 0, ty = 0, tz = 0) {
        if (tx === 0 && ty === 0 && tz === 0)
            return this;
        // http://www.w3.org/TR/2012/WD-css3-transforms-20120911/#Translate3dDefined
        translationMatrix.m41 = tx;
        translationMatrix.m42 = ty;
        translationMatrix.m43 = tz;
        this.multiplySelf(translationMatrix);
        if (tz != 0)
            this[is2D] = false;
        return this;
    }
    scaleSelf(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        this.translateSelf(originX, originY, originZ);
        scaleMatrix[is2D] = true;
        scaleMatrix.m11 = scaleX;
        scaleMatrix.m22 = scaleY;
        scaleMatrix.m33 = scaleZ;
        this.multiplySelf(scaleMatrix);
        this.translateSelf(-originX, -originY, -originZ);
        if (scaleZ !== 1 || originZ !== 0)
            this[is2D] = false;
        return this;
    }
    scale3dSelf(scale = 1, originX = 0, originY = 0, originZ = 0) {
        if (scale === 1)
            return this;
        this.translateSelf(originX, originY, originZ);
        scaleMatrix[is2D] = true;
        scaleMatrix.m11 = scale;
        scaleMatrix.m22 = scale;
        scaleMatrix.m33 = scale;
        this.multiplySelf(scaleMatrix);
        this.translateSelf(-originX, -originY, -originZ);
        if (scale !== 1)
            this[is2D] = false;
        return this;
    }
    rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
        if (angle === 0)
            return this; // Firefox behavior.
        point.x = x;
        point.y = y;
        point.z = z;
        point.w = 0;
        normalizePoint(point);
        axisRotationMatrix[is2D] = true;
        toAxisRotation(axisRotationMatrix, point.x, point.y, point.z, angle);
        this.multiplySelf(axisRotationMatrix);
        if (x !== 0 || y !== 0)
            this[is2D] = false;
        return this;
    }
    // https://drafts.fxtf.org/geometry/#dom-dommatrix-rotateself
    rotateSelf(rotX = 0, rotY, rotZ) {
        if (rotY == null && rotZ == null) {
            rotZ = rotX;
            rotX = 0;
            rotY = 0;
        }
        rotY ??= 0;
        rotZ ??= 0;
        if (rotZ)
            this.rotateAxisAngleSelf(0, 0, 1, rotZ);
        if (rotY)
            this.rotateAxisAngleSelf(0, 1, 0, rotY);
        if (rotX)
            this.rotateAxisAngleSelf(1, 0, 0, rotX);
        return this;
    }
    // TODO
    rotateFromVectorSelf(_x = 0, _y = 0) {
        throw new Error('rotateFromVectorSelf is not implemented yet.');
    }
    skewXSelf(_sx = 0) {
        throw new Error('skewXSelf is not implemented yet.');
    }
    skewYSelf(_sy = 0) {
        throw new Error('skewYSelf is not implemented yet.');
    }
    invertSelf() {
        throw new Error('invertSelf is not implemented yet.');
    }
    setMatrixValue(_transformList) {
        throw new Error('setMatrixValue is not implemented yet.');
    }
    get a() {
        return this.m11;
    }
    set a(value) {
        this.m11 = value;
    }
    get b() {
        return this.m12;
    }
    set b(value) {
        this.m12 = value;
    }
    get c() {
        return this.m21;
    }
    set c(value) {
        this.m21 = value;
    }
    get d() {
        return this.m22;
    }
    set d(value) {
        this.m22 = value;
    }
    get e() {
        return this.m41;
    }
    set e(value) {
        this.m41 = value;
    }
    get f() {
        return this.m42;
    }
    set f(value) {
        this.m42 = value;
    }
    get m11() {
        return this[elements][0];
    }
    set m11(value) {
        this[elements][0] = value;
    }
    get m12() {
        return this[elements][1];
    }
    set m12(value) {
        this[elements][1] = value;
    }
    get m13() {
        return this[elements][2];
    }
    set m13(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][2] = value;
    }
    get m14() {
        return this[elements][3];
    }
    set m14(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][3] = value;
    }
    get m21() {
        return this[elements][4];
    }
    set m21(value) {
        this[elements][4] = value;
    }
    get m22() {
        return this[elements][5];
    }
    set m22(value) {
        this[elements][5] = value;
    }
    get m23() {
        return this[elements][6];
    }
    set m23(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][6] = value;
    }
    get m24() {
        return this[elements][7];
    }
    set m24(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][7] = value;
    }
    get m31() {
        return this[elements][8];
    }
    set m31(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][8] = value;
    }
    get m32() {
        return this[elements][9];
    }
    set m32(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][9] = value;
    }
    get m33() {
        return this[elements][10];
    }
    set m33(value) {
        if (value !== 1)
            this[is2D] = false;
        this[elements][10] = value;
    }
    get m34() {
        return this[elements][11];
    }
    set m34(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][11] = value;
    }
    get m41() {
        return this[elements][12];
    }
    set m41(value) {
        this[elements][12] = value;
    }
    get m42() {
        return this[elements][13];
    }
    set m42(value) {
        this[elements][13] = value;
    }
    get m43() {
        return this[elements][14];
    }
    set m43(value) {
        if (value !== 0)
            this[is2D] = false;
        this[elements][14] = value;
    }
    get m44() {
        return this[elements][15];
    }
    set m44(value) {
        if (value !== 1)
            this[is2D] = false;
        this[elements][15] = value;
    }
    static fromMatrix(other) {
        const mat = other[elements];
        return new this(mat);
    }
    static fromFloat32Array(array) {
        return new this(array);
    }
    static fromFloat64Array(array) {
        return new this(array);
    }
}
const axisRotationMatrix = new DOMMatrix();
const translationMatrix = new DOMMatrix();
const scaleMatrix = new DOMMatrix();
const point = new DOMPoint();
function getInit(mat) {
    return mat.is2D ? [mat.m11, mat.m12, mat.m21, mat.m22, mat.m41, mat.m42] : mat.toFloat64Array();
}
function isNumberSequence(obj) {
    if (obj && typeof obj.length === 'number' && typeof obj[0] === 'number')
        return true;
    return false;
}
//# sourceMappingURL=DOMMatrix.js.map