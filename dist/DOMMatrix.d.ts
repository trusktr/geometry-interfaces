import { DOMPoint } from './DOMPoint.js';
declare const elements: unique symbol;
declare const is2D: unique symbol;
export declare class DOMMatrixReadOnly {
    /** The elements of the matrix, in column-major order. */
    [elements]: Float64Array;
    [is2D]: boolean;
    /**
     * @param {string | Array<number>} init An array of numbers, or a CSS
     * transform string. If the array has 6 items, then those items set the
     * values of m11, m12, m21, m22, m41, m42 in that order (or the values
     * a, b, c, d, e, f if you're using those aliases) and this.is2D is
     * true. If the array has 16 items (in column-major order), then they
     * set all the values of the underlying matrix (m11 to m44) and
     * this.is2D is set false. Arrays of other lengths throw an error.
     */
    constructor(init?: string | ArrayLike<number>);
    multiply(other: DOMMatrixReadOnly): DOMMatrix;
    translate(tx?: number, ty?: number, tz?: number): DOMMatrix;
    scale(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    scale3d(scale?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    /** @deprecated use `matrix.scale()` */
    scaleNonUniform(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): DOMMatrix;
    rotateAxisAngle(x?: number, y?: number, z?: number, angle?: number): DOMMatrix;
    rotate(angle?: number, originX?: number, originY?: number): DOMMatrix;
    rotateFromVector(_x?: number, _y?: number): DOMMatrix;
    skewX(_sx?: number): DOMMatrix;
    skewY(_sy?: number): DOMMatrix;
    flipX(): DOMMatrix;
    flipY(): DOMMatrix;
    inverse(): DOMMatrix;
    transformPoint(_point: DOMPointInit): DOMPoint;
    toFloat32Array(): Float32Array;
    toFloat64Array(): Float64Array;
    toString(): string;
    get is2D(): boolean;
    get isIdentity(): boolean;
    get a(): number;
    get b(): number;
    get c(): number;
    get d(): number;
    get e(): number;
    get f(): number;
    get m11(): number;
    get m12(): number;
    get m13(): number;
    get m14(): number;
    get m21(): number;
    get m22(): number;
    get m23(): number;
    get m24(): number;
    get m31(): number;
    get m32(): number;
    get m33(): number;
    get m34(): number;
    get m41(): number;
    get m42(): number;
    get m43(): number;
    get m44(): number;
    toJSON(): {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
        m11: number;
        m12: number;
        m13: number;
        m14: number;
        m21: number;
        m22: number;
        m23: number;
        m24: number;
        m31: number;
        m32: number;
        m33: number;
        m34: number;
        m41: number;
        m42: number;
        m43: number;
        m44: number;
    };
    static fromMatrix(other: DOMMatrixReadOnly): DOMMatrixReadOnly;
    static fromFloat32Array(array: Float32Array): DOMMatrixReadOnly;
    static fromFloat64Array(array: Float64Array): DOMMatrixReadOnly;
}
export declare class DOMMatrix extends DOMMatrixReadOnly {
    constructor(arg?: string | ArrayLike<number>);
    multiplySelf(other: DOMMatrixInit): this;
    preMultiplySelf(other: DOMMatrixReadOnly): this;
    translateSelf(tx?: number, ty?: number, tz?: number): this;
    scaleSelf(scaleX?: number, scaleY?: number, scaleZ?: number, originX?: number, originY?: number, originZ?: number): this;
    scale3dSelf(scale?: number, originX?: number, originY?: number, originZ?: number): this;
    rotateAxisAngleSelf(x?: number, y?: number, z?: number, angle?: number): this;
    rotateSelf(rotX?: number, rotY?: number, rotZ?: number): this;
    rotateFromVectorSelf(_x?: number, _y?: number): this;
    skewXSelf(_sx?: number): this;
    skewYSelf(_sy?: number): this;
    invertSelf(): this;
    setMatrixValue(_transformList: string): this;
    get a(): number;
    set a(value: number);
    get b(): number;
    set b(value: number);
    get c(): number;
    set c(value: number);
    get d(): number;
    set d(value: number);
    get e(): number;
    set e(value: number);
    get f(): number;
    set f(value: number);
    get m11(): number;
    set m11(value: number);
    get m12(): number;
    set m12(value: number);
    get m13(): number;
    set m13(value: number);
    get m14(): number;
    set m14(value: number);
    get m21(): number;
    set m21(value: number);
    get m22(): number;
    set m22(value: number);
    get m23(): number;
    set m23(value: number);
    get m24(): number;
    set m24(value: number);
    get m31(): number;
    set m31(value: number);
    get m32(): number;
    set m32(value: number);
    get m33(): number;
    set m33(value: number);
    get m34(): number;
    set m34(value: number);
    get m41(): number;
    set m41(value: number);
    get m42(): number;
    set m42(value: number);
    get m43(): number;
    set m43(value: number);
    get m44(): number;
    set m44(value: number);
    static fromMatrix(other: DOMMatrixReadOnly): DOMMatrix;
    static fromFloat32Array(array: Float32Array): DOMMatrix;
    static fromFloat64Array(array: Float64Array): DOMMatrix;
}
export {};
//# sourceMappingURL=DOMMatrix.d.ts.map