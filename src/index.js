import DOMMatrix from './DOMMatrix'
import DOMMatrixReadOnly from './DOMMatrixReadOnly'

// hack needed for global build:
if (typeof __webpack_require__ != 'undefined') {
    let _global = null

    // browser
    if (typeof window != 'undefined') {
        _global = window
    }
    else if (typeof global != 'undefined') {
        _global = global
    }

    if (_global) {
        _global.DOMMatrix = DOMMatrix
        _global.DOMMatrixReadOnly = DOMMatrixReadOnly
    }
}

export {
    DOMMatrix,
    DOMMatrixReadOnly,
}
