import {DOMMatrix} from './DOMMatrix.js'
import {expectMatricesEqual} from './test-utils.js'
import {toIdentity} from './utilities.js'

// TODO move type def to @lume/cli, map @types/jest's `expect` type into the
// global env.
declare global {
	function expect(...args: any[]): any
}

// An epsilon for checking our JavaScript DOMMatrix values vs those of
// Chrome's DOMMatrix in some cases, as there is a small precision
// difference for some reason (maybe slightly different math formulas in one
// of the other).
const epsilon = 0.000000000000001

describe('DOMMatrixReadOnly', () => {
	it('multiply', () => {
		let polyfillMat = new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		let nativeMat = new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

		polyfillMat = polyfillMat.multiply(new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
		nativeMat = nativeMat.multiply(new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))

		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('translate', () => {
		let polyfillMat = new DOMMatrixReadOnly()
		let nativeMat = new window.DOMMatrixReadOnly()

		polyfillMat = polyfillMat.translate(10)
		nativeMat = nativeMat.translate(10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.translate(0, 10)
		nativeMat = nativeMat.translate(0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.translate(0, 0, 10)
		nativeMat = nativeMat.translate(0, 0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.translate(10, 20, 30)
		nativeMat = nativeMat.translate(10, 20, 30)

		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('scale', () => {
		let polyfillMat = new DOMMatrixReadOnly()
		let nativeMat = new window.DOMMatrixReadOnly()

		polyfillMat = polyfillMat.scale(10)
		nativeMat = nativeMat.scale(10)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.scale(0, 10)
		nativeMat = nativeMat.scale(0, 10)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.scale(0, 0, 10)
		nativeMat = nativeMat.scale(0, 0, 10)

		expect(polyfillMat.is2D).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrixReadOnly()
		nativeMat = new window.DOMMatrixReadOnly()
		polyfillMat = polyfillMat.scale(10, 20, 30)
		nativeMat = nativeMat.scale(10, 20, 30)

		expect(polyfillMat.is2D).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		// ensure internal scaleMatrix does not cause incorrect is2D value.
		let polyfillMat2 = new DOMMatrixReadOnly()
		let nativeMat2 = new window.DOMMatrixReadOnly()

		polyfillMat2 = polyfillMat2.scale(10)
		nativeMat2 = nativeMat2.scale(10)

		expect(polyfillMat2.is2D).toBe(true)
		expectMatricesEqual(polyfillMat2, nativeMat2)
	})

	it('scale3d', () => {
		let polyfillMat = new DOMMatrix()
		let nativeMat = new window.DOMMatrix()

		polyfillMat = polyfillMat.scale3d(1)
		nativeMat = nativeMat.scale3d(1)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = polyfillMat.scale3d(10)
		nativeMat = nativeMat.scale3d(10)

		expect(polyfillMat.is2D).toBe(false)
		expect(polyfillMat.isIdentity).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = polyfillMat.scale3d(1 / 10)
		nativeMat = nativeMat.scale3d(1 / 10)

		const isChromeOrEdge = navigator.userAgent.indexOf('Chrome') !== -1

		expect(polyfillMat.is2D).toBe(false)
		expect(polyfillMat.isIdentity).toBe(true)
		// Chrome/Edge has an issue where scaling by X then by 1/X does
		// not result in an identity matrix. So we need to check for an
		// epsilon difference in this case.
		if (isChromeOrEdge) expect(nativeMat.isIdentity).toBe(false)
		else expect(nativeMat.isIdentity).toBe(true)
		// Skip the identity and string checks on this case for now due to the
		// Chrome issue.
		expectMatricesEqual(polyfillMat, nativeMat, 0, true, true)

		// ensure internal scaleMatrix does not cause incorrect is2D value.
		const polyfillMat2 = new DOMMatrix()
		const nativeMat2 = new window.DOMMatrix()

		polyfillMat2.scale3d(1)
		nativeMat2.scale3d(1)

		expect(polyfillMat2.is2D).toBe(true)
		expectMatricesEqual(polyfillMat2, nativeMat2)
	})

	it('rotateAxisAngle', () => {
		// Firefox behavior is different from Chrome and Safari.
		// https://github.com/webcompat/web-bugs/issues/145666

		let polyfillMat = new DOMMatrix()
		let nativeMat = new window.DOMMatrix()

		polyfillMat = polyfillMat.rotateAxisAngleSelf(1, 0, 0, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(1, 0, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(0, 1, 0, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(0, 1, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(0, 0, 1, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(0, 0, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(1, 0, 1, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(1, 0, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(1, 1, 0, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(1, 1, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(1, 1, 1, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(1, 1, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateAxisAngleSelf(1, 2, 3, 4)
		nativeMat = nativeMat.rotateAxisAngleSelf(1, 2, 3, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)
	})

	it('rotate', () => {
		let polyfillMat = new DOMMatrix()
		let nativeMat = new window.DOMMatrix()

		polyfillMat = polyfillMat.rotateSelf(10)
		nativeMat = nativeMat.rotateSelf(10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateSelf(0, 10)
		nativeMat = nativeMat.rotateSelf(0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateSelf(10, 0, 0)
		nativeMat = nativeMat.rotateSelf(10, 0, 0)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateSelf(0, 10, 0)
		nativeMat = nativeMat.rotateSelf(0, 10, 0)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateSelf(0, 0, 10)
		nativeMat = nativeMat.rotateSelf(0, 0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat = new DOMMatrix()
		nativeMat = new window.DOMMatrix()
		polyfillMat = polyfillMat.rotateSelf(10, 20, 30)
		nativeMat = nativeMat.rotateSelf(10, 20, 30)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)
	})
})

describe('DOMMatrix', () => {
	it('isIdentity and is2D', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.rotateAxisAngleSelf(1, 2, 3, 4)
		nativeMat.rotateAxisAngleSelf(1, 2, 3, 4)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)

		expectMatricesEqual(polyfillMat, nativeMat)

		// ensure internal axisRotationMatrix does not cause incorrect is2D value.

		const polyfillMat2 = new DOMMatrix()
		const nativeMat2 = new window.DOMMatrix()

		polyfillMat2.rotateSelf(10)
		nativeMat2.rotateSelf(10)

		expect(polyfillMat2.isIdentity).toBe(false)
		expect(polyfillMat2.isIdentity).toBe(nativeMat2.isIdentity)
		expect(polyfillMat2.is2D).toBe(true)
		expect(polyfillMat2.is2D).toBe(nativeMat2.is2D)
		expectMatricesEqual(polyfillMat2, nativeMat2)

		toIdentity(polyfillMat2)
		toIdentity(nativeMat2)

		expect(polyfillMat2.isIdentity).toBe(true)
		expect(polyfillMat2.isIdentity).toBe(nativeMat2.isIdentity)
		expect(polyfillMat2.is2D).toBe(true)
		expect(polyfillMat2.is2D).toBe(nativeMat2.is2D)

		const polyfillMat3 = new DOMMatrix()
		const nativeMat3 = new window.DOMMatrix()

		polyfillMat3.rotateSelf(10, 20, 30)
		nativeMat3.rotateSelf(10, 20, 30)

		expect(polyfillMat3.isIdentity).toBe(false)
		expect(polyfillMat3.isIdentity).toBe(nativeMat3.isIdentity)
		expect(polyfillMat3.is2D).toBe(false)
		expect(polyfillMat3.is2D).toBe(nativeMat3.is2D)
		expectMatricesEqual(polyfillMat3, nativeMat3, epsilon)

		toIdentity(polyfillMat3)
		toIdentity(nativeMat3)

		expect(polyfillMat3.isIdentity).toBe(true)
		expect(polyfillMat3.isIdentity).toBe(nativeMat3.isIdentity)
		expect(polyfillMat3.is2D).toBe(false) // It would be great if it went back to is2D https://github.com/w3c/fxtf-drafts/issues/584
		expect(polyfillMat3.is2D).toBe(nativeMat3.is2D)
	})

	it('toString', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		let string = polyfillMat.toString()
		expect(string).toBe('matrix(1, 0, 0, 1, 0, 0)')
		expect(string).toBe(nativeMat.toString())

		polyfillMat.rotateSelf(10)
		nativeMat.rotateSelf(10)

		string = polyfillMat.toString()
		expect(string).not.toBe('matrix(1, 0, 0, 1, 0, 0)')
		expect(string).not.toBe('matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)')
		expect(string).toBe(nativeMat.toString())
		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('multiplySelf', () => {
		const polyfillMat = new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		const nativeMat = new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

		polyfillMat.multiplySelf(new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
		nativeMat.multiplySelf(new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))

		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('preMultiplySelf', () => {
		const polyfillMat = new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
		const nativeMat = new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

		polyfillMat.preMultiplySelf(new DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
		nativeMat.preMultiplySelf(new window.DOMMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))

		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('translateSelf', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.translateSelf(10)
		nativeMat.translateSelf(10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.translateSelf(0, 10)
		nativeMat.translateSelf(0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.translateSelf(0, 0, 10)
		nativeMat.translateSelf(0, 0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.translateSelf(10, 20, 30)
		nativeMat.translateSelf(10, 20, 30)

		expectMatricesEqual(polyfillMat, nativeMat)
	})

	it('scaleSelf', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.scaleSelf(10)
		nativeMat.scaleSelf(10)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.scaleSelf(0, 10)
		nativeMat.scaleSelf(0, 10)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.scaleSelf(0, 0, 10)
		nativeMat.scaleSelf(0, 0, 10)

		expect(polyfillMat.is2D).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.scaleSelf(10, 20, 30)
		nativeMat.scaleSelf(10, 20, 30)

		expect(polyfillMat.is2D).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		// ensure internal scaleMatrix does not cause incorrect is2D value.

		const polyfillMat2 = new DOMMatrix()
		const nativeMat2 = new window.DOMMatrix()

		polyfillMat2.scaleSelf(10)
		nativeMat2.scaleSelf(10)

		expect(polyfillMat2.is2D).toBe(true)
		expectMatricesEqual(polyfillMat2, nativeMat2)
	})

	it('scale3dSelf', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.scale3dSelf(1)
		nativeMat.scale3dSelf(1)

		expect(polyfillMat.is2D).toBe(true)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat.scale3dSelf(10)
		nativeMat.scale3dSelf(10)

		expect(polyfillMat.is2D).toBe(false)
		expect(polyfillMat.isIdentity).toBe(false)
		expectMatricesEqual(polyfillMat, nativeMat)

		polyfillMat.scale3dSelf(1 / 10)
		nativeMat.scale3dSelf(1 / 10)

		const isChromeOrEdge = navigator.userAgent.indexOf('Chrome') !== -1

		expect(polyfillMat.is2D).toBe(false)
		expect(polyfillMat.isIdentity).toBe(true)
		// Chrome/Edge has an issue where scaling by X then by 1/X does
		// not result in an identity matrix. So we need to check for an
		// epsilon difference in this case.
		if (isChromeOrEdge) expect(nativeMat.isIdentity).toBe(false)
		else expect(nativeMat.isIdentity).toBe(true)
		// Skip the identity and string checks on this case for now due to the
		// Chrome issue.
		expectMatricesEqual(polyfillMat, nativeMat, 0, true, true)

		// ensure internal scaleMatrix does not cause incorrect is2D value.
		const polyfillMat2 = new DOMMatrix()
		const nativeMat2 = new window.DOMMatrix()

		polyfillMat2.scale3dSelf(1)
		nativeMat2.scale3dSelf(1)

		expect(polyfillMat2.is2D).toBe(true)
		expectMatricesEqual(polyfillMat2, nativeMat2)
	})

	it('rotateAxisAngleSelf', () => {
		// Firefox behavior is different from Chrome and Safari.
		// https://github.com/webcompat/web-bugs/issues/145666

		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.rotateAxisAngleSelf(1, 0, 0, 4)
		nativeMat.rotateAxisAngleSelf(1, 0, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(0, 1, 0, 4)
		nativeMat.rotateAxisAngleSelf(0, 1, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(0, 0, 1, 4)
		nativeMat.rotateAxisAngleSelf(0, 0, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(1, 0, 1, 4)
		nativeMat.rotateAxisAngleSelf(1, 0, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(1, 1, 0, 4)
		nativeMat.rotateAxisAngleSelf(1, 1, 0, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(1, 1, 1, 4)
		nativeMat.rotateAxisAngleSelf(1, 1, 1, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateAxisAngleSelf(1, 2, 3, 4)
		nativeMat.rotateAxisAngleSelf(1, 2, 3, 4)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)
	})

	it('rotateSelf', () => {
		const polyfillMat = new DOMMatrix()
		const nativeMat = new window.DOMMatrix()

		polyfillMat.rotateSelf(10)
		nativeMat.rotateSelf(10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateSelf(0, 10)
		nativeMat.rotateSelf(0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateSelf(10, 0, 0)
		nativeMat.rotateSelf(10, 0, 0)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateSelf(0, 10, 0)
		nativeMat.rotateSelf(0, 10, 0)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateSelf(0, 0, 10)
		nativeMat.rotateSelf(0, 0, 10)

		expectMatricesEqual(polyfillMat, nativeMat)

		toIdentity(polyfillMat)
		toIdentity(nativeMat)
		polyfillMat.rotateSelf(10, 20, 30)
		nativeMat.rotateSelf(10, 20, 30)

		expectMatricesEqual(polyfillMat, nativeMat, epsilon)
	})
})
