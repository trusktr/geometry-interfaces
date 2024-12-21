export * from './DOMMatrix.js'
export * from './DOMMatrixReadOnly.js'
export * from './DOMPoint.js'
export * from './DOMQuad.js'
export * from './DOMRect.js'

import {DOMMatrixReadOnly} from './DOMMatrixReadOnly.js'
import {DOMMatrix} from './DOMMatrix.js'
import {DOMPoint, DOMPointReadOnly} from './DOMPoint.js'
import {DOMQuad} from './DOMQuad.js'
import {DOMRect, DOMRectReadOnly} from './DOMRect.js'

let _global: typeof globalThis | null = null

// browser
if (typeof globalThis != 'undefined') {
	_global = globalThis
} else if (typeof window != 'undefined') {
	_global = window
}
// @ts-ignore `global` is from older NodeJS (in case we run this in Node)
else if (typeof global != 'undefined') {
	// @ts-ignore `global` is from older NodeJS (in case we run this in Node)
	_global = global
}

if (_global) {
	_global.DOMMatrix = DOMMatrix
	_global.DOMMatrixReadOnly = DOMMatrixReadOnly
	_global.DOMPoint = DOMPoint
	_global.DOMPointReadOnly = DOMPointReadOnly
	_global.DOMQuad = DOMQuad
	_global.DOMRect = DOMRect
	_global.DOMRectReadOnly = DOMRectReadOnly
}
