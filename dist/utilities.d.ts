export declare function multiplyAndApply(A: DOMMatrixReadOnly, B: DOMMatrixReadOnly, target: DOMMatrix): void;
export declare function copyMatrix(from: DOMMatrixReadOnly, to: DOMMatrix): void;
export declare function applyArrayValuesToDOMMatrix(array: ArrayLike<number>, matrix: DOMMatrix): void;
export declare function toAxisRotation(mat: DOMMatrix, x: number, y: number, z: number, angle: number): void;
export declare const identityValues: readonly number[];
export declare function toIdentity(mat: DOMMatrix): void;
type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array | Uint8ClampedArray;
export declare function toArray(mat: DOMMatrixReadOnly, target?: TypedArray | Array<number>): number[] | TypedArray;
/** Normalize a DOMPoint into a unit vector. */
export declare function normalizePoint(point: DOMPoint): void;
export {};
//# sourceMappingURL=utilities.d.ts.map