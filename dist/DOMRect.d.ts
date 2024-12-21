declare const x_: unique symbol;
declare const y_: unique symbol;
declare const width_: unique symbol;
declare const height_: unique symbol;
export declare class DOMRectReadOnly {
    [x_]: number;
    [y_]: number;
    [width_]: number;
    [height_]: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    get top(): number;
    get right(): number;
    get bottom(): number;
    get left(): number;
    toJSON(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    static fromRect(other: DOMRectReadOnly): DOMRectReadOnly;
}
export declare class DOMRect extends DOMRectReadOnly {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    set x(value: number);
    set y(value: number);
    set width(value: number);
    set height(value: number);
}
export {};
//# sourceMappingURL=DOMRect.d.ts.map