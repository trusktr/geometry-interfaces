import DOMMatrixReadOnly from './DOMMatrixReadOnly'

export default
class DOMMatrix extends DOMMatrixReadOnly {
    constructor() {
        if (arguments.length === 0) {
            let numberSequence = [1, 0, 0, 1, 0, 0]
            super(numberSequence)
        }
        else if (arguments.length === 1) {
            else if (typeof arguments[0] == 'string') {
                let transformList = arguments[0]
                // TODO validate that syntax of transformList matches transform-list (http://www.w3.org/TR/css-transforms-1/#typedef-transform-list).
                // TODO ...
            }
            else if (arguments[0] instanceof DOMMatrixReadOnly) {
                let other = arguments[0]
                if (other.is2D) {
                    super([
                        other.m11, other.m12,
                        other.m21, other.m22,
                        other.m41, other.m42,
                    ])
                }
                else {
                    super([
                        other.m11, other.m12, other.m13, other.m14,
                        other.m21, other.m22, other.m23, other.m24,
                        other.m31, other.m32, other.m33, other.m34,
                        other.m41, other.m42, other.m43, other.m44,
                    ])
                }
            }
            else if (arguments[0] instanceof Float32Array || arguments[0] instanceof Float64Array) {
                let typedArray = arguments[0]
                if (typedArray.length === 6 || typedArray.length === 16) {
                    super(Array.from(typedArray))
                }
                else {
                    throw new TypeError('The typed array argument to the DOMMatrix constructor has an invalid length.')
                }
            }
            else if (arguments[0] instanceof Array /* TODO && all items are numbers */) {
                let numberSequence = arguments[0]
                if (numberSequence.length === 6 || numberSequence.length === 16) {
                    super(numberSequence)
                }
                else {
                    throw new TypeError('The array argument to the DOMMatrix constructor has an invalid length.')
                }
            }
        }
        else {
            throw new Error('Wrong number of arguments to DOMMatrix constructor.')
        }
    }

    // Mutable transform methods
    multiplySelf (other) {
        if (! other instanceof DOMMatrixReadOnly)
            throw new Error('The argument to multiplySelf must be an instance of DOMMatrixReadOnly or DOMMatrix')

        let m11 = this.m11 * other.m11 + this.m21 * other.m12 + this.m31 * other.m13 + this.m41 * other.m14
        let m21 = this.m11 * other.m21 + this.m21 * other.m22 + this.m31 * other.m23 + this.m41 * other.m24
        let m31 = this.m11 * other.m31 + this.m21 * other.m32 + this.m31 * other.m33 + this.m41 * other.m34
        let m41 = this.m11 * other.m41 + this.m21 * other.m42 + this.m31 * other.m43 + this.m41 * other.m44

        let m12 = this.m12 * other.m11 + this.m22 * other.m12 + this.m32 * other.m13 + this.m42 * other.m14
        let m22 = this.m12 * other.m21 + this.m22 * other.m22 + this.m32 * other.m23 + this.m42 * other.m24
        let m32 = this.m12 * other.m31 + this.m22 * other.m32 + this.m32 * other.m33 + this.m42 * other.m34
        let m42 = this.m12 * other.m41 + this.m22 * other.m42 + this.m32 * other.m43 + this.m42 * other.m44

        let m13 = this.m13 * other.m11 + this.m23 * other.m12 + this.m33 * other.m13 + this.m43 * other.m14
        let m23 = this.m13 * other.m21 + this.m23 * other.m22 + this.m33 * other.m23 + this.m43 * other.m24
        let m33 = this.m13 * other.m31 + this.m23 * other.m32 + this.m33 * other.m33 + this.m43 * other.m34
        let m43 = this.m13 * other.m41 + this.m23 * other.m42 + this.m33 * other.m43 + this.m43 * other.m44

        let m14 = this.m14 * other.m11 + this.m24 * other.m12 + this.m34 * other.m13 + this.m44 * other.m14
        let m24 = this.m14 * other.m21 + this.m24 * other.m22 + this.m34 * other.m23 + this.m44 * other.m24
        let m34 = this.m14 * other.m31 + this.m24 * other.m32 + this.m34 * other.m33 + this.m44 * other.m34
        let m44 = this.m14 * other.m41 + this.m24 * other.m42 + this.m34 * other.m43 + this.m44 * other.m44

        // XXX use setMatrixValue here?
        this.m11 = m11
        this.m12 = m12
        this.m13 = m13
        this.m14 = m14
        this.m21 = m21
        this.m22 = m22
        this.m23 = m23
        this.m24 = m24
        this.m31 = m31
        this.m32 = m32
        this.m33 = m33
        this.m34 = m34
        this.m41 = m41
        this.m42 = m42
        this.m43 = m43
        this.m44 = m44

        if (!other.is2D) this._is2D = false

        return this
    }
    preMultiplySelf (DOMMatrix other) {}

    translateSelf (tx, ty, tz = 0) {
        // TODO: check args are numbers

        if (arguments.length === 1)
            throw new Error('The first two arguments (X and Y translation values) are required (the third, Z translation, is optional).')

        // http://www.w3.org/TR/2012/WD-css3-transforms-20120911/#Translate3dDefined
        let translationMatrix = [
            /*m11*/1, /*m21*/0, /*m31*/0, /*m41*/tx,
            /*m12*/0, /*m22*/1, /*m32*/0, /*m42*/ty,
            /*m13*/0, /*m23*/0, /*m33*/1, /*m43*/tz,
            /*m14*/0, /*m24*/0, /*m34*/0, /*m44*/1,
        ]

        this.multiplySelf(translationMatrix)

        if (tz != 0) {
            this._is2D = false
        }

        return this
    }

    scaleSelf (scale, originX = 0, originY = 0) {}
    scale3dSelf (scale, originX = 0, originY = 0, originZ = 0) {}
    scaleNonUniformSelf (scaleX, scaleY = 1, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {}
    rotateSelf (angle, originX = 0, originY = 0) {}
    rotateFromVectorSelf (x, y) {}
    rotateAxisAngleSelf (x, y, z, angle) {}
    skewXSelf (sx) {}
    skewYSelf (sy) {}
    invertSelf () {}

    setMatrixValue(DOMString transformList)

    set a(value) { this.m11 = value }
    set b(value) { this.m12 = value }
    set c(value) { this.m21 = value }
    set d(value) { this.m22 = value }
    set e(value) { this.m41 = value }
    set f(value) { this.m42 = value }

    set m11(value) { this._matrix[0]  = value }
    set m12(value) { this._matrix[4]  = value }
    set m13(value) { this._matrix[8]  = value }
    set m14(value) { this._matrix[12] = value }

    set m21(value) { this._matrix[1]  = value }
    set m22(value) { this._matrix[5]  = value }
    set m23(value) { this._matrix[9]  = value }
    set m24(value) { this._matrix[13] = value }

    set m31(value) { this._matrix[2]  = value }
    set m32(value) { this._matrix[6]  = value }
    set m33(value) { this._matrix[10] = value }
    set m34(value) { this._matrix[14] = value }

    set m41(value) { this._matrix[3]  = value }
    set m42(value) { this._matrix[7]  = value }
    set m43(value) { this._matrix[11] = value }
    set m44(value) { this._matrix[15] = value }
}

