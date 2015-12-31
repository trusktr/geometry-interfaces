import DOMMatrixReadOnly from './DOMMatrixReadOnly'
import {
    multiplyToArray,
    applyArrayValuesToDOMMatrix,
    matrixToArray,
} from './utilities'

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
                super(matrixToArray(other))
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

        let resultArray = multiplyToArray(this, other)
        applyArrayValuesToDOMMatrix(resultArray, this)

        if (!other.is2D) this._is2D = false

        return this
    }

    preMultiplySelf (other) {
        if (! other instanceof DOMMatrixReadOnly)
            throw new Error('The argument to multiplySelf must be an instance of DOMMatrixReadOnly or DOMMatrix')

        let resultArray = multiplyToArray(other, this)
        applyArrayValuesToDOMMatrix(resultArray, this)

        if (!other.is2D) this._is2D = false

        return this
    }

    translateSelf (tx, ty, tz = 0) {
        // TODO: check args are numbers

        if (arguments.length === 1)
            throw new Error('The first two arguments (X and Y translation values) are required (the third, Z translation, is optional).')

        // http://www.w3.org/TR/2012/WD-css3-transforms-20120911/#Translate3dDefined
        let translationMatrix = new DOMMatrix([
            // column-major:
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx,ty,tz,1,
        ])

        this.multiplySelf(translationMatrix)

        if (tz != 0) {
            this._is2D = false
        }

        return this
    }

    scaleSelf (scale, originX = 0, originY = 0) {
        this.translateSelf(originX, originY)

        this.multiplySelf(new DOMMatrix([
            // 2D:
            /*a*/scale, /*b*/0,
            /*c*/0,     /*d*/scale,
            /*e*/0,     /*f*/0,
        ]))

        this.translateSelf(-originX, -originY)
        return this
    }

    scale3dSelf (scale, originX = 0, originY = 0, originZ = 0) {
        this.translateSelf(originX, originY, originZ)

        this.multiplySelf(new DOMMatrix([
            // 3D
            scale, 0,     0,     0,
            0,     scale, 0,     0,
            0,     0,     scale, 0,
            0,     0,     0,     1,
        ]))

        this.translateSelf(-originX, -originY, -originZ)
        return this
    }

    scaleNonUniformSelf (scaleX, scaleY = 1, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        this.translateSelf(originX, originY, originZ)

        this.multiplySelf(new DOMMatrix([
            // 3D
            scaleX, 0,      0,      0,
            0,      scaleY, 0,      0,
            0,      0,      scaleZ, 0,
            0,      0,      0,      1,
        ]))

        this.translateSelf(-originX, -originY, -originZ)

        if (scaleZ !== 1 || originZ !== 0) this._is2D = false

        return this
    }

    rotateSelf (angle, originX = 0, originY = 0) {
        this.translateSelf(originX, originY)

        // axis of rotation
        let [x,y,z] = [0,0,1] // We're rotating around the Z axis.

        let {sin, cos} = Math

        this.multiplySelf(new DOMMatrix([
            // TODO: should we provide a 6-item array here to signify 2D?
            // TODO: angle is supplied in degrees. Do we need to convert to radians?
            1-2*(y*y + z*z)*sin(angle/2)**2,                       2*(x*y*sin(angle/2)**2 + z*sin(angle/2)*cos(angle/2)), 2*(x*z*sin(angle/2)**2 - y*sin(angle/2)*cos(angle/2)), 0,
            2*(x*y*sin(angle/2)**2 - z*sin(angle/2)*cos(angle/2)), 1-2*(x*x + z*z)*sin(angle/2)**2,                       2*(y*z*sin(angle/2)**2 + x*sin(angle/2)*cos(angle/2)), 0,
            2*(x*z*sin(angle/2)**2 + y*sin(angle/2)*cos(angle/2)), 2*(y*z*sin(angle/2)**2 - x*sin(angle/2)*cos(angle/2)), 1-2*(x*x + y*y)*sin(angle/2)**2,                       0,
            0,                                                     0,                                                     0,                                                     1,
        ]))

        this.translateSelf(-originX, -originY)
        return this
    }

    rotateFromVectorSelf (x, y) {}

    rotateAxisAngleSelf (x, y, z, angle) {

    }

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

