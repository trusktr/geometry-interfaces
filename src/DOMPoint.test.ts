import {DOMMatrix} from './DOMMatrix.js'
import {DOMPointReadOnly} from './DOMPoint.js'
import {expectPointsEqual} from './test-utils.js'

describe('DOMPointReadOnly', () => {
	it('matrixTransform', () => {
		let polyfillPnt = new DOMPointReadOnly(1, 2, 3, 4)
		let nativePnt = new window.DOMPointReadOnly(1, 2, 3, 4)

		polyfillPnt = polyfillPnt.matrixTransform(new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
		nativePnt = nativePnt.matrixTransform(new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))

		expectPointsEqual(polyfillPnt, nativePnt)

		polyfillPnt = polyfillPnt.matrixTransform()
		nativePnt = nativePnt.matrixTransform()

		expectPointsEqual(polyfillPnt, nativePnt)
	})
})
