
export
function multiplyToArray(A, B) {

    //XXX: Are the following calculations faster hard coded (current), or as a loop?

    let m11 = (A.m11 * B.m11) + (A.m21 * B.m12) + (A.m31 * B.m13) + (A.m41 * B.m14)
    let m21 = (A.m11 * B.m21) + (A.m21 * B.m22) + (A.m31 * B.m23) + (A.m41 * B.m24)
    let m31 = (A.m11 * B.m31) + (A.m21 * B.m32) + (A.m31 * B.m33) + (A.m41 * B.m34)
    let m41 = (A.m11 * B.m41) + (A.m21 * B.m42) + (A.m31 * B.m43) + (A.m41 * B.m44)

    let m12 = (A.m12 * B.m11) + (A.m22 * B.m12) + (A.m32 * B.m13) + (A.m42 * B.m14)
    let m22 = (A.m12 * B.m21) + (A.m22 * B.m22) + (A.m32 * B.m23) + (A.m42 * B.m24)
    let m32 = (A.m12 * B.m31) + (A.m22 * B.m32) + (A.m32 * B.m33) + (A.m42 * B.m34)
    let m42 = (A.m12 * B.m41) + (A.m22 * B.m42) + (A.m32 * B.m43) + (A.m42 * B.m44)

    let m13 = (A.m13 * B.m11) + (A.m23 * B.m12) + (A.m33 * B.m13) + (A.m43 * B.m14)
    let m23 = (A.m13 * B.m21) + (A.m23 * B.m22) + (A.m33 * B.m23) + (A.m43 * B.m24)
    let m33 = (A.m13 * B.m31) + (A.m23 * B.m32) + (A.m33 * B.m33) + (A.m43 * B.m34)
    let m43 = (A.m13 * B.m41) + (A.m23 * B.m42) + (A.m33 * B.m43) + (A.m43 * B.m44)

    let m14 = (A.m14 * B.m11) + (A.m24 * B.m12) + (A.m34 * B.m13) + (A.m44 * B.m14)
    let m24 = (A.m14 * B.m21) + (A.m24 * B.m22) + (A.m34 * B.m23) + (A.m44 * B.m24)
    let m34 = (A.m14 * B.m31) + (A.m24 * B.m32) + (A.m34 * B.m33) + (A.m44 * B.m34)
    let m44 = (A.m14 * B.m41) + (A.m24 * B.m42) + (A.m34 * B.m43) + (A.m44 * B.m44)

    // in column-major order:
    let resultArray = [
        m11, m12, m13, m14,
        m21, m22, m23, m24,
        m31, m31, m31, m31,
        m41, m41, m41, m41,
    ]

    return resultArray
}

export
function applyArrayValuesToDOMMatrix(array, matrix) {
    let length = array.length

    if (length === 6) {
        matrix.m11 = array[0]
        matrix.m12 = array[1]
        matrix.m21 = array[2]
        matrix.m22 = array[3]
        matrix.m41 = array[4]
        matrix.m42 = array[5]
    }
    else if (length === 16) {
        matrix.m11 = array[0]
        matrix.m12 = array[1]
        matrix.m13 = array[2]
        matrix.m14 = array[3]
        matrix.m21 = array[4]
        matrix.m22 = array[5]
        matrix.m23 = array[6]
        matrix.m24 = array[7]
        matrix.m31 = array[8]
        matrix.m32 = array[9]
        matrix.m33 = array[10]
        matrix.m34 = array[11]
        matrix.m41 = array[12]
        matrix.m42 = array[13]
        matrix.m43 = array[14]
        matrix.m44 = array[15]
    }
}

export
function matrixToArray(matrix) {
    let result = null

    if (matrix.is2D) {
        result = [
            matrix.m11, matrix.m12,
            matrix.m21, matrix.m22,
            matrix.m41, matrix.m42,
        ]
    }
    else {
        result = [
            matrix.m11, matrix.m12, matrix.m13, matrix.m14,
            matrix.m21, matrix.m22, matrix.m23, matrix.m24,
            matrix.m31, matrix.m32, matrix.m33, matrix.m34,
            matrix.m41, matrix.m42, matrix.m43, matrix.m44,
        ]
    }

    return result
}
