export function expectNumberArraysEqual(arr1: ArrayLike<number>, arr2: ArrayLike<number>, epsilon = 0) {
	expect(arr1.length).toBe(arr2.length)
	for (let i = 0; i < arr1.length; i++) {
		expect(arr1[i]! - arr2[i]!).toBeLessThanOrEqual(epsilon)
	}
}

export function expectMatricesEqual(
	mat1: DOMMatrixReadOnly,
	mat2: DOMMatrixReadOnly,
	epsilon = 0,
	skipIsIdentityCheck = false,
	skipStringCheck = false,
) {
	expectNumberArraysEqual(mat1.toFloat32Array(), mat2.toFloat32Array(), epsilon)
	expectNumberArraysEqual(mat1.toFloat32Array(), mat2.toFloat32Array(), epsilon)
	expectNumbersEqual(mat1.a, mat2.a, epsilon)
	expectNumbersEqual(mat1.b, mat2.b, epsilon)
	expectNumbersEqual(mat1.c, mat2.c, epsilon)
	expectNumbersEqual(mat1.d, mat2.d, epsilon)
	expectNumbersEqual(mat1.e, mat2.e, epsilon)
	expectNumbersEqual(mat1.f, mat2.f, epsilon)
	expectNumbersEqual(mat1.m11, mat2.m11, epsilon)
	expectNumbersEqual(mat1.m12, mat2.m12, epsilon)
	expectNumbersEqual(mat1.m13, mat2.m13, epsilon)
	expectNumbersEqual(mat1.m14, mat2.m14, epsilon)
	expectNumbersEqual(mat1.m21, mat2.m21, epsilon)
	expectNumbersEqual(mat1.m22, mat2.m22, epsilon)
	expectNumbersEqual(mat1.m23, mat2.m23, epsilon)
	expectNumbersEqual(mat1.m24, mat2.m24, epsilon)
	expectNumbersEqual(mat1.m31, mat2.m31, epsilon)
	expectNumbersEqual(mat1.m32, mat2.m32, epsilon)
	expectNumbersEqual(mat1.m33, mat2.m33, epsilon)
	expectNumbersEqual(mat1.m34, mat2.m34, epsilon)
	expectNumbersEqual(mat1.m41, mat2.m41, epsilon)
	expectNumbersEqual(mat1.m42, mat2.m42, epsilon)
	expectNumbersEqual(mat1.m43, mat2.m43, epsilon)
	expectNumbersEqual(mat1.m44, mat2.m44, epsilon)
	expect(mat1.is2D).toBe(mat2.is2D)
	if (!skipIsIdentityCheck) expect(mat1.isIdentity).toBe(mat2.isIdentity)
	if (!epsilon && !skipStringCheck) expect(mat1.toString()).toEqual(mat2.toString())
}

export function expectPointsEqual(
	point1: DOMPointReadOnly,
	point2: DOMPointReadOnly,
	epsilon = 0,
	skipJsonCheck = false,
) {
	expectNumbersEqual(point1.x, point2.x, epsilon)
	expectNumbersEqual(point1.y, point2.y, epsilon)
	expectNumbersEqual(point1.z, point2.z, epsilon)
	expectNumbersEqual(point1.w, point2.w, epsilon)
	if (!epsilon && !skipJsonCheck) expect(point1.toJSON()).toEqual(point2.toJSON())
}

export function expectNumbersEqual(num1: number, num2: number, epsilon = 0) {
	expect(Math.abs(num1 - num2)).toBeLessThanOrEqual(epsilon)
}
