declare const x_: unique symbol;
declare const y_: unique symbol;
declare const z_: unique symbol;
declare const w_: unique symbol;
export declare class DOMPointReadOnly {
    [x_]: number;
    [y_]: number;
    [z_]: number;
    [w_]: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    matrixTransform(_matrix: DOMMatrixInit): DOMPoint;
    toJSON(): {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    static fromPoint(other: DOMPointReadOnly): DOMPointReadOnly;
}
export declare class DOMPoint extends DOMPointReadOnly {
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set w(value: number);
}
export {};
//# sourceMappingURL=DOMPoint.d.ts.map