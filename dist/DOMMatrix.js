import { DOMMatrixReadOnly, initDOMMatrixReadOnly, matrix, is2D, getMatrixSymbols } from './DOMMatrixReadOnly.js';
import { multiplyAndApply, rotateAxisAngleArray } from './utilities.js';
initDOMMatrixReadOnly();
getMatrixSymbols();
export class DOMMatrix extends DOMMatrixReadOnly {
    constructor(arg) {
        const numArgs = arguments.length;
        if (!arg) {
            super([1, 0, 0, 1, 0, 0]);
        }
        else if (numArgs === 1) {
            if (typeof arg == 'string') {
                throw new Error('CSS transformList arg not yet implemented.');
                // TODO validate that syntax of transformList matches transform-list (http://www.w3.org/TR/css-transforms-1/#typedef-transform-list).
            }
            else if (arg instanceof DOMMatrixReadOnly) {
                super(arg[matrix]);
            }
            else if (arg instanceof Float32Array || arg instanceof Float64Array || arg instanceof Array) {
                super(arg);
            }
        }
        else {
            throw new Error('Wrong number of arguments to DOMMatrix constructor.');
        }
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
            throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');
        // TODO: avoid creating a new array, just apply values directly.
        multiplyAndApply(other, this, this);
        if (!other[is2D])
            this[is2D] = false;
        return this;
    }
    translateSelf(tx = 0, ty = 0, tz = 0) {
        // TODO: check args are numbers
        // http://www.w3.org/TR/2012/WD-css3-transforms-20120911/#Translate3dDefined
        // prettier-ignore
        const translationMatrix = new DOMMatrix([
            // column-major:
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ]);
        this.multiplySelf(translationMatrix);
        if (tz != 0) {
            this[is2D] = false;
        }
        return this;
    }
    scaleSelf(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        this.translateSelf(originX, originY, originZ);
        this.multiplySelf(
        // prettier-ignore
        new DOMMatrix([
            // 3D
            scaleX, 0, 0, 0,
            0, scaleY, 0, 0,
            0, 0, scaleZ, 0,
            0, 0, 0, 1,
        ]));
        this.translateSelf(-originX, -originY, -originZ);
        if (scaleZ !== 1)
            this[is2D] = false;
        return this;
    }
    scale3dSelf(scale = 1, originX = 0, originY = 0, originZ = 0) {
        this.translateSelf(originX, originY, originZ);
        this.multiplySelf(
        // prettier-ignore
        new DOMMatrix([
            // 3D
            scale, 0, 0, 0,
            0, scale, 0, 0,
            0, 0, scale, 0,
            0, 0, 0, 1,
        ]));
        this.translateSelf(-originX, -originY, -originZ);
        if (scale !== 1)
            this[is2D] = false;
        return this;
    }
    /** @deprecated use `matrix.scaleSelf()` */
    scaleNonUniformSelf(scaleX = 1, scaleY = scaleX, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        return this.scaleSelf(scaleX, scaleY, scaleZ, originX, originY, originZ);
    }
    // https://drafts.fxtf.org/geometry/#dom-dommatrix-rotateself
    rotateSelf(rotX = 0, rotY, rotZ) {
        if (rotY == null && rotZ == null) {
            rotX = 0;
            rotY = 0;
            rotZ = rotX;
        }
        rotY ??= 0;
        rotZ ??= 0;
        this.rotateAxisAngleSelf(0, 0, 1, rotZ);
        this.rotateAxisAngleSelf(0, 1, 0, rotY);
        this.rotateAxisAngleSelf(1, 0, 0, rotX);
        return this;
    }
    // TODO
    rotateFromVectorSelf(_x = 0, _y = 0) {
        throw new Error('rotateFromVectorSelf is not implemented yet.');
    }
    rotateAxisAngleSelf(x = 0, y = 0, z = 0, angle = 0) {
        const rotationMatrix = new DOMMatrix(rotateAxisAngleArray(x, y, z, angle));
        this.multiplySelf(rotationMatrix);
        if (x !== 0 || y !== 0)
            this[is2D] = false;
        return this;
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
    get b() {
        return this.m12;
    }
    get c() {
        return this.m21;
    }
    get d() {
        return this.m22;
    }
    get e() {
        return this.m41;
    }
    get f() {
        return this.m42;
    }
    set a(value) {
        this.m11 = value;
    }
    set b(value) {
        this.m12 = value;
    }
    set c(value) {
        this.m21 = value;
    }
    set d(value) {
        this.m22 = value;
    }
    set e(value) {
        this.m41 = value;
    }
    set f(value) {
        this.m42 = value;
    }
    get m11() {
        return this[matrix][0];
    }
    get m12() {
        return this[matrix][4];
    }
    get m13() {
        return this[matrix][8];
    }
    get m14() {
        return this[matrix][12];
    }
    get m21() {
        return this[matrix][1];
    }
    get m22() {
        return this[matrix][5];
    }
    get m23() {
        return this[matrix][9];
    }
    get m24() {
        return this[matrix][13];
    }
    get m31() {
        return this[matrix][2];
    }
    get m32() {
        return this[matrix][6];
    }
    get m33() {
        return this[matrix][10];
    }
    get m34() {
        return this[matrix][14];
    }
    get m41() {
        return this[matrix][3];
    }
    get m42() {
        return this[matrix][7];
    }
    get m43() {
        return this[matrix][11];
    }
    get m44() {
        return this[matrix][15];
    }
    set m11(value) {
        this[matrix][0] = value;
    }
    set m12(value) {
        this[matrix][4] = value;
    }
    set m13(value) {
        this[matrix][8] = value;
    }
    set m14(value) {
        this[matrix][12] = value;
    }
    set m21(value) {
        this[matrix][1] = value;
    }
    set m22(value) {
        this[matrix][5] = value;
    }
    set m23(value) {
        this[matrix][9] = value;
    }
    set m24(value) {
        this[matrix][13] = value;
    }
    set m31(value) {
        this[matrix][2] = value;
    }
    set m32(value) {
        this[matrix][6] = value;
    }
    set m33(value) {
        this[matrix][10] = value;
    }
    set m34(value) {
        this[matrix][14] = value;
    }
    set m41(value) {
        this[matrix][3] = value;
    }
    set m42(value) {
        this[matrix][7] = value;
    }
    set m43(value) {
        this[matrix][11] = value;
    }
    set m44(value) {
        this[matrix][15] = value;
    }
    static fromMatrix(other) {
        const mat = other[matrix];
        return new this(mat);
    }
    static fromFloat32Array(array) {
        return new this(array);
    }
    static fromFloat64Array(array) {
        return new this(array);
    }
}
//# sourceMappingURL=DOMMatrix.js.map