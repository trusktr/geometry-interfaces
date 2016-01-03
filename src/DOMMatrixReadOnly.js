import DOMMatrix from './DOMMatrix'
import {multiplyToArray, applyArrayValuesToDOMMatrix} from './utilities'

export default
class DOMMatrixReadOnly {

    /**
     * @param {Array.number} numberSequence An array of numbers. If the array
     * has 6 items, then those items set the values of m11, m12, m21, m22, m41,
     * m42 in that order (or the values a, b, c, d, e, f if you're using those
     * aliases) and this.is2D is true. If the array has 16 items (in
     * column-major order), then they set all the values of the underlying
     * matrix (m11 to m44) and this.is2D is set false. Arrays of other lengths
     * throw an error.
     */
    constructor(numberSequence) {
        if (!(this instanceof DOMMatrix))
            throw new TypeError(`DOMMatrixReadOnly can't be instantiated directly. Use DOMMatrix instead.`)

        // TODO, make these private: {{

        // `this._matrix` defaults to the identity matrix.
        // `this._matrix` is represented internally in row-major format so that
        // it is easy to look at visually. In a pair of coordinates (as in
        // "m23") the first number is the column and the second is the row (so
        // "m23" means column 2 row 3).
        this._matrix = new Float64Array([
            /*m11*/1, /*m21*/0, /*m31*/0, /*m41*/0,
            /*m12*/0, /*m22*/1, /*m32*/0, /*m42*/0,
            /*m13*/0, /*m23*/0, /*m33*/1, /*m43*/0,
            /*m14*/0, /*m24*/0, /*m34*/0, /*m44*/1,
        ])
        this._is2D = true
        this._isIdentity = true

        // }}

        // TODO
        //if (!Match.test(numberSequence, [Number]))
            //throw new TypeError('DOMMatrixReadOnly constructor argument "numberSequence" must contain numbers.')

        if (numberSequence.length === 6) {
            applyArrayValuesToDOMMatrix(numberSequence, this)
        }
        else if (numberSequence.length === 16) {
            applyArrayValuesToDOMMatrix(numberSequence, this)
            this._is2D = false
        }
        else {
            throw new TypeError('DOMMatrixReadOnly constructor argument "numberSequence" must have length 6 or 16.')
        }
    }

    // Immutable transform methods -------------------------------------------

    translate (tx, ty, tz = 0) {
        return new DOMMatrix(this).translateSelf(tx, ty, tz)
    }

    scale (scale, originX = 0, originY = 0) {
        return new DOMMatrix(this).scaleSelf(scale, originX, originY)
    }

    scale3d (scale, originX = 0, originY = 0, originZ = 0) {
        return new DOMMatrix(this).scale3dSelf(scale, originX, originY, originZ)
    }

    scaleNonUniform (scaleX, scaleY = 1, scaleZ = 1, originX = 0, originY = 0, originZ = 0) {
        return new DOMMatrix(this).scaleNonUniformSelf(scaleX, scaleY, scaleZ, originX, originY, originZ)
    }

    rotate (angle, originX = 0, originY = 0) {
        return new DOMMatrix(this).rotateSelf(angle, originX, originY)
    }

    // TODO
    rotateFromVector (x, y) {
        throw new Error('rotateFromVector is not implemented yet.')
    }

    rotateAxisAngle (x, y, z, angle) {
        return new DOMMatrix(this).rotateAxisAngleSelf(x, y, z, angle)
    }

    skewX (sx) {
        throw new Error('skewX is not implemented yet.')
    }
    skewY (sy) {
        throw new Error('skewY is not implemented yet.')
    }

    multiply (other) {
        return new DOMMatrix(this).multiplySelf(other)
    }

    flipX () {
        throw new Error('flipX is not implemented yet.')
    }
    flipY () {
        throw new Error('flipY is not implemented yet.')
    }
    inverse () {
        throw new Error('inverse is not implemented yet.')
    }

    transformPoint(/*optional DOMPointInit*/ point) {
        throw new Error('transformPoint is not implemented yet.')
    }

    toFloat32Array() {
        throw new Error('toFloat32Array is not implemented yet.')
    }
    toFloat64Array() {
        throw new Error('toFloat64Array is not implemented yet.')
    }

    //stringifier() {} // What's this?

    get is2D() {
        return this._is2D
    }

    /*
     * TODO: make sure this matches the spec.
     * TODO: Instead of calculating here, perhaps calculate and set
     * this._isIdentity in other operations, and simply return the internal one
     * here.
     */
    get isIdentity() {
        let identity = [
            /*m11*/1, /*m21*/0, /*m31*/0, /*m41*/0,
            /*m12*/0, /*m22*/1, /*m32*/0, /*m42*/0,
            /*m13*/0, /*m23*/0, /*m33*/1, /*m43*/0,
            /*m14*/0, /*m24*/0, /*m34*/0, /*m44*/1,
        ]

        this._isIdentity = true

        for (var i = 0, len = this._matrix.length; i < len; i+=1) {
            if (this._matrix[i] != identity[i])
                this._isIdentity = false
        }

        return this._isIdentity
    }

    get a() { return this.m11 }
    get b() { return this.m12 }
    get c() { return this.m21 }
    get d() { return this.m22 }
    get e() { return this.m41 }
    get f() { return this.m42 }

    get m11() { return this._matrix[0]  }
    get m12() { return this._matrix[4]  }
    get m13() { return this._matrix[8]  }
    get m14() { return this._matrix[12] }

    get m21() { return this._matrix[1]  }
    get m22() { return this._matrix[5]  }
    get m23() { return this._matrix[9]  }
    get m24() { return this._matrix[13] }

    get m31() { return this._matrix[2]  }
    get m32() { return this._matrix[6]  }
    get m33() { return this._matrix[10] }
    get m34() { return this._matrix[14] }

    get m41() { return this._matrix[3]  }
    get m42() { return this._matrix[7]  }
    get m43() { return this._matrix[11] }
    get m44() { return this._matrix[15] }
}
