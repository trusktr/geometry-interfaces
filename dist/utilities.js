// A reusable array, to avoid allocating new arrays during multiplication.
// in column-major order:
// prettier-ignore
const scratch = [
    /*m11*/ 1, /*m21*/ 0, /*m31*/ 0, /*m41*/ 0,
    /*m12*/ 0, /*m22*/ 1, /*m32*/ 0, /*m42*/ 0,
    /*m13*/ 0, /*m23*/ 0, /*m33*/ 1, /*m43*/ 0,
    /*m14*/ 0, /*m24*/ 0, /*m34*/ 0, /*m44*/ 1,
];
export function multiplyAndApply(A, B, target) {
    //XXX: Are the following calculations faster hard coded (current), or as a loop?
    scratch[0] = A.m11 * B.m11 + A.m21 * B.m12 + A.m31 * B.m13 + A.m41 * B.m14;
    scratch[4] = A.m11 * B.m21 + A.m21 * B.m22 + A.m31 * B.m23 + A.m41 * B.m24;
    scratch[8] = A.m11 * B.m31 + A.m21 * B.m32 + A.m31 * B.m33 + A.m41 * B.m34;
    scratch[12] = A.m11 * B.m41 + A.m21 * B.m42 + A.m31 * B.m43 + A.m41 * B.m44;
    scratch[1] = A.m12 * B.m11 + A.m22 * B.m12 + A.m32 * B.m13 + A.m42 * B.m14;
    scratch[5] = A.m12 * B.m21 + A.m22 * B.m22 + A.m32 * B.m23 + A.m42 * B.m24;
    scratch[9] = A.m12 * B.m31 + A.m22 * B.m32 + A.m32 * B.m33 + A.m42 * B.m34;
    scratch[13] = A.m12 * B.m41 + A.m22 * B.m42 + A.m32 * B.m43 + A.m42 * B.m44;
    scratch[2] = A.m13 * B.m11 + A.m23 * B.m12 + A.m33 * B.m13 + A.m43 * B.m14;
    scratch[6] = A.m13 * B.m21 + A.m23 * B.m22 + A.m33 * B.m23 + A.m43 * B.m24;
    scratch[10] = A.m13 * B.m31 + A.m23 * B.m32 + A.m33 * B.m33 + A.m43 * B.m34;
    scratch[14] = A.m13 * B.m41 + A.m23 * B.m42 + A.m33 * B.m43 + A.m43 * B.m44;
    scratch[3] = A.m14 * B.m11 + A.m24 * B.m12 + A.m34 * B.m13 + A.m44 * B.m14;
    scratch[7] = A.m14 * B.m21 + A.m24 * B.m22 + A.m34 * B.m23 + A.m44 * B.m24;
    scratch[11] = A.m14 * B.m31 + A.m24 * B.m32 + A.m34 * B.m33 + A.m44 * B.m34;
    scratch[15] = A.m14 * B.m41 + A.m24 * B.m42 + A.m34 * B.m43 + A.m44 * B.m44;
    applyArrayValuesToDOMMatrix(scratch, target);
}
export function applyArrayValuesToDOMMatrix(array, matrix) {
    const length = array.length;
    if (length === 6) {
        matrix.m11 = array[0];
        matrix.m12 = array[1];
        matrix.m21 = array[2];
        matrix.m22 = array[3];
        matrix.m41 = array[4];
        matrix.m42 = array[5];
    }
    else if (length === 16) {
        matrix.m11 = array[0];
        matrix.m12 = array[1];
        matrix.m13 = array[2];
        matrix.m14 = array[3];
        matrix.m21 = array[4];
        matrix.m22 = array[5];
        matrix.m23 = array[6];
        matrix.m24 = array[7];
        matrix.m31 = array[8];
        matrix.m32 = array[9];
        matrix.m33 = array[10];
        matrix.m34 = array[11];
        matrix.m41 = array[12];
        matrix.m42 = array[13];
        matrix.m43 = array[14];
        matrix.m44 = array[15];
    }
}
export function rotateAxisAngleArray(x, y, z, angle) {
    const { sin, cos } = Math;
    const halfAngle = degreesToRadians(angle / 2);
    const sinHalfAngle = sin(halfAngle);
    const cosHalfAngle = cos(halfAngle);
    const sinHalfAngleSq = sinHalfAngle ** 2;
    const sinHalfAngleCosHalfAngle = sinHalfAngle * cosHalfAngle;
    // TODO: should we provide a 6-item array here to signify 2D when the
    // rotation is about the Z axis (for example when calling rotateSelf)?
    // TODO: Performance can be improved by first detecting when x, y, or z of
    // the axis are zero or 1, and using a pre-simplified version of the
    // folowing math based on that condition.
    // TODO: Performance can be improved by using different equations (use trig
    // identities to find alternate formulas, I recall Famo.us using less operations).
    // prettier-ignore
    return [
        1 - 2 * (y * y + z * z) * sinHalfAngleSq, 2 * (x * y * sinHalfAngleSq + z * sinHalfAngleCosHalfAngle), 2 * (x * z * sinHalfAngleSq - y * sinHalfAngleCosHalfAngle), 0,
        2 * (x * y * sinHalfAngleSq - z * sinHalfAngleCosHalfAngle), 1 - 2 * (x * x + z * z) * sinHalfAngleSq, 2 * (y * z * sinHalfAngleSq + x * sinHalfAngleCosHalfAngle), 0,
        2 * (x * z * sinHalfAngleSq + y * sinHalfAngleCosHalfAngle), 2 * (y * z * sinHalfAngleSq - x * sinHalfAngleCosHalfAngle), 1 - 2 * (x * x + y * y) * sinHalfAngleSq, 0,
        0, 0, 0, 1,
    ];
}
function degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees;
}
//# sourceMappingURL=utilities.js.map