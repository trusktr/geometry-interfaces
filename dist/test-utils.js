export function expectNumberArraysEqual(arr1, arr2, epsilon = 0) {
    expect(arr1.length).toBe(arr2.length);
    for (let i = 0; i < arr1.length; i++) {
        expect(arr1[i] - arr2[i]).toBeLessThanOrEqual(epsilon);
    }
}
export function expectMatricesEqual(mat1, mat2, epsilon = 0, skipIsIdentityCheck = false, skipStringCheck = false) {
    expectNumberArraysEqual(mat1.toFloat32Array(), mat2.toFloat32Array(), epsilon);
    expectNumberArraysEqual(mat1.toFloat32Array(), mat2.toFloat32Array(), epsilon);
    expect(mat1.a - mat2.a).toBeLessThanOrEqual(epsilon);
    expect(mat1.b - mat2.b).toBeLessThanOrEqual(epsilon);
    expect(mat1.c - mat2.c).toBeLessThanOrEqual(epsilon);
    expect(mat1.d - mat2.d).toBeLessThanOrEqual(epsilon);
    expect(mat1.e - mat2.e).toBeLessThanOrEqual(epsilon);
    expect(mat1.f - mat2.f).toBeLessThanOrEqual(epsilon);
    expect(mat1.m11 - mat2.m11).toBeLessThanOrEqual(epsilon);
    expect(mat1.m12 - mat2.m12).toBeLessThanOrEqual(epsilon);
    expect(mat1.m13 - mat2.m13).toBeLessThanOrEqual(epsilon);
    expect(mat1.m14 - mat2.m14).toBeLessThanOrEqual(epsilon);
    expect(mat1.m21 - mat2.m21).toBeLessThanOrEqual(epsilon);
    expect(mat1.m22 - mat2.m22).toBeLessThanOrEqual(epsilon);
    expect(mat1.m23 - mat2.m23).toBeLessThanOrEqual(epsilon);
    expect(mat1.m24 - mat2.m24).toBeLessThanOrEqual(epsilon);
    expect(mat1.m31 - mat2.m31).toBeLessThanOrEqual(epsilon);
    expect(mat1.m32 - mat2.m32).toBeLessThanOrEqual(epsilon);
    expect(mat1.m33 - mat2.m33).toBeLessThanOrEqual(epsilon);
    expect(mat1.m34 - mat2.m34).toBeLessThanOrEqual(epsilon);
    expect(mat1.m41 - mat2.m41).toBeLessThanOrEqual(epsilon);
    expect(mat1.m42 - mat2.m42).toBeLessThanOrEqual(epsilon);
    expect(mat1.m43 - mat2.m43).toBeLessThanOrEqual(epsilon);
    expect(mat1.m44 - mat2.m44).toBeLessThanOrEqual(epsilon);
    expect(mat1.is2D).toBe(mat2.is2D);
    if (!skipIsIdentityCheck)
        expect(mat1.isIdentity).toBe(mat2.isIdentity);
    if (!epsilon && !skipStringCheck)
        expect(mat1.toString()).toEqual(mat2.toString());
}
//# sourceMappingURL=test-utils.js.map