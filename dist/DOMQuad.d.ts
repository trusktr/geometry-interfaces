declare const p1: unique symbol;
declare const p2: unique symbol;
declare const p3: unique symbol;
declare const p4: unique symbol;
export declare class DOMQuad {
    [p1]: DOMPoint;
    [p2]: DOMPoint;
    [p3]: DOMPoint;
    [p4]: DOMPoint;
    constructor(point1?: DOMPointInit, point2?: DOMPointInit, point3?: DOMPointInit, point4?: DOMPointInit);
    get p1(): DOMPoint;
    get p2(): DOMPoint;
    get p3(): DOMPoint;
    get p4(): DOMPoint;
    static fromRect(other: DOMRectReadOnly): DOMQuad;
    static fromQuad(other: DOMQuad): DOMQuad;
    getBounds(): DOMRect;
    toJSON(): {
        p1: any;
        p2: any;
        p3: any;
        p4: any;
    };
}
export {};
//# sourceMappingURL=DOMQuad.d.ts.map