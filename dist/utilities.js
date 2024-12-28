// A reusable array, to avoid allocating new arrays during multiplication.
let scratch = null;
function getScratch() {
    if (!scratch)
        scratch = new DOMMatrix();
    return scratch;
}
export function multiplyAndApply(A, B, target) {
    const scratch = getScratch();
    //XXX: Are the following calculations faster hard coded (current), or as a loop?
    scratch.m11 = A.m11 * B.m11 + A.m21 * B.m12 + A.m31 * B.m13 + A.m41 * B.m14;
    scratch.m21 = A.m11 * B.m21 + A.m21 * B.m22 + A.m31 * B.m23 + A.m41 * B.m24;
    scratch.m31 = A.m11 * B.m31 + A.m21 * B.m32 + A.m31 * B.m33 + A.m41 * B.m34;
    scratch.m41 = A.m11 * B.m41 + A.m21 * B.m42 + A.m31 * B.m43 + A.m41 * B.m44;
    scratch.m12 = A.m12 * B.m11 + A.m22 * B.m12 + A.m32 * B.m13 + A.m42 * B.m14;
    scratch.m22 = A.m12 * B.m21 + A.m22 * B.m22 + A.m32 * B.m23 + A.m42 * B.m24;
    scratch.m32 = A.m12 * B.m31 + A.m22 * B.m32 + A.m32 * B.m33 + A.m42 * B.m34;
    scratch.m42 = A.m12 * B.m41 + A.m22 * B.m42 + A.m32 * B.m43 + A.m42 * B.m44;
    scratch.m13 = A.m13 * B.m11 + A.m23 * B.m12 + A.m33 * B.m13 + A.m43 * B.m14;
    scratch.m23 = A.m13 * B.m21 + A.m23 * B.m22 + A.m33 * B.m23 + A.m43 * B.m24;
    scratch.m33 = A.m13 * B.m31 + A.m23 * B.m32 + A.m33 * B.m33 + A.m43 * B.m34;
    scratch.m43 = A.m13 * B.m41 + A.m23 * B.m42 + A.m33 * B.m43 + A.m43 * B.m44;
    scratch.m14 = A.m14 * B.m11 + A.m24 * B.m12 + A.m34 * B.m13 + A.m44 * B.m14;
    scratch.m24 = A.m14 * B.m21 + A.m24 * B.m22 + A.m34 * B.m23 + A.m44 * B.m24;
    scratch.m34 = A.m14 * B.m31 + A.m24 * B.m32 + A.m34 * B.m33 + A.m44 * B.m34;
    scratch.m44 = A.m14 * B.m41 + A.m24 * B.m42 + A.m34 * B.m43 + A.m44 * B.m44;
    copyMatrix(scratch, target);
}
export function copyMatrix(from, to) {
    if (from.is2D) {
        to.m11 = from.m11;
        to.m12 = from.m12;
        to.m21 = from.m21;
        to.m22 = from.m22;
        to.m41 = from.m41;
        to.m42 = from.m42;
    }
    else {
        to.m11 = from.m11;
        to.m12 = from.m12;
        to.m13 = from.m13;
        to.m14 = from.m14;
        to.m21 = from.m21;
        to.m22 = from.m22;
        to.m23 = from.m23;
        to.m24 = from.m24;
        to.m31 = from.m31;
        to.m32 = from.m32;
        to.m33 = from.m33;
        to.m34 = from.m34;
        to.m41 = from.m41;
        to.m42 = from.m42;
        to.m43 = from.m43;
        to.m44 = from.m44;
    }
}
// The `array` is column major for 3D matrices, so the first 4 elements are the first column, etc.
export function applyArrayValuesToDOMMatrix(array, matrix) {
    const length = array.length;
    if (length === 6) {
        toIdentity(matrix);
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
export function toAxisRotation(mat, x, y, z, angle) {
    const { sin, cos } = Math;
    const halfAngle = degreesToRadians(angle / 2);
    const sinHalfAngle = sin(halfAngle);
    const cosHalfAngle = cos(halfAngle);
    const sinHalfAngleSq = sinHalfAngle ** 2;
    const sinHalfAngleCosHalfAngle = sinHalfAngle * cosHalfAngle;
    // TODO: Maybe performance can be improved by first detecting when x, y, or z of
    // the axis are zero or 1, and using a pre-simplified version of the
    // folowing math based on that condition.
    // TODO: Maybe performance can be improved by using different equations (use trig
    // identities to find alternate formulas, I recall Famo.us using less operations).
    mat.m11 = 1 - 2 * (y ** 2 + z ** 2) * sinHalfAngleSq;
    mat.m12 = 2 * (x * y * sinHalfAngleSq + z * sinHalfAngleCosHalfAngle);
    mat.m13 = 2 * (x * z * sinHalfAngleSq - y * sinHalfAngleCosHalfAngle);
    mat.m14 = 0;
    mat.m21 = 2 * (x * y * sinHalfAngleSq - z * sinHalfAngleCosHalfAngle);
    mat.m22 = 1 - 2 * (x ** 2 + z ** 2) * sinHalfAngleSq;
    mat.m23 = 2 * (y * z * sinHalfAngleSq + x * sinHalfAngleCosHalfAngle);
    mat.m24 = 0;
    mat.m31 = 2 * (x * z * sinHalfAngleSq + y * sinHalfAngleCosHalfAngle);
    mat.m32 = 2 * (y * z * sinHalfAngleSq - x * sinHalfAngleCosHalfAngle);
    mat.m33 = 1 - 2 * (x ** 2 + y ** 2) * sinHalfAngleSq;
    mat.m34 = 0;
    mat.m41 = 0;
    mat.m42 = 0;
    mat.m43 = 0;
    mat.m44 = 1;
}
function degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees;
}
// In a pair of coordinates (as in "m23") the first number
// is the column and the second is the row (so "m23" means column 2 row 3).
// prettier-ignore
export const identityValues = Object.freeze([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
]);
/* Set the given matrix to identity. */
export function toIdentity(mat) {
    mat.m11 = 1;
    mat.m12 = 0;
    mat.m13 = 0;
    mat.m14 = 0;
    mat.m21 = 0;
    mat.m22 = 1;
    mat.m23 = 0;
    mat.m24 = 0;
    mat.m31 = 0;
    mat.m32 = 0;
    mat.m33 = 1;
    mat.m34 = 0;
    mat.m41 = 0;
    mat.m42 = 0;
    mat.m43 = 0;
    mat.m44 = 1;
}
export function toArray(mat, target = []) {
    if (mat.is2D) {
        target[0] = mat.m11;
        target[1] = mat.m12;
        target[2] = mat.m21;
        target[3] = mat.m22;
        target[4] = mat.m41;
        target[5] = mat.m42;
    }
    else {
        target[0] = mat.m11;
        target[1] = mat.m12;
        target[2] = mat.m13;
        target[3] = mat.m14;
        target[4] = mat.m21;
        target[5] = mat.m22;
        target[6] = mat.m23;
        target[7] = mat.m24;
        target[8] = mat.m31;
        target[9] = mat.m32;
        target[10] = mat.m33;
        target[11] = mat.m34;
        target[12] = mat.m41;
        target[13] = mat.m42;
        target[14] = mat.m43;
        target[15] = mat.m44;
    }
    return target;
}
/** Normalize a DOMPoint into a unit vector. */
export function normalizePoint(point) {
    const { x, y, z, w } = point;
    const length = Math.hypot(x, y, z, w);
    point.x = x / length;
    point.y = y / length;
    point.z = z / length;
    point.w = w / length;
}
//# sourceMappingURL=utilities.js.map