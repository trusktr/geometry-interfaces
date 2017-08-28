(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define([],b):'object'==typeof exports?exports.GeometryInterfaces=b():a.GeometryInterfaces=b()})(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=3)}([function(a,b,c){'use strict';var d=c(1),e=c(2),f=function(a){function b(c){const d=arguments.length;if(0===d)a.call(this,[1,0,0,1,0,0]);else if(1!==d)throw new Error('Wrong number of arguments to DOMMatrix constructor.');else if('string'==typeof c)throw new Error('CSS transformList arg not yet implemented.');else c instanceof b?a.call(this,c._matrix):(c instanceof Float32Array||c instanceof Float64Array||c instanceof Array)&&a.call(this,c)}a&&(b.__proto__=a),b.prototype=Object.create(a&&a.prototype),b.prototype.constructor=b;var c={a:{},b:{},c:{},d:{},e:{},f:{},m11:{},m12:{},m13:{},m14:{},m21:{},m22:{},m23:{},m24:{},m31:{},m32:{},m33:{},m34:{},m41:{},m42:{},m43:{},m44:{}};return b.prototype.multiplySelf=function(a){if(!(a instanceof b))throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');return Object(e.b)(this,a,this),a.is2D||(this._is2D=!1),this},b.prototype.preMultiplySelf=function(a){if(!(a instanceof b))throw new Error('The argument to multiplySelf must be an instance of DOMMatrix');return Object(e.b)(a,this,this),a.is2D||(this._is2D=!1),this},b.prototype.translateSelf=function(a,c,d){if(void 0===d&&(d=0),1===arguments.length)throw new Error('The first two arguments (X and Y translation values) are required (the third, Z translation, is optional).');const e=new b([1,0,0,0,0,1,0,0,0,0,1,0,a,c,d,1]);return this.multiplySelf(e),0!=d&&(this._is2D=!1),this},b.prototype.scaleSelf=function(a,c,d){return void 0===c&&(c=0),void 0===d&&(d=0),this.translateSelf(c,d),this.multiplySelf(new b([a,0,0,a,0,0])),this.translateSelf(-c,-d),this},b.prototype.scale3dSelf=function(a,c,d,e){return void 0===c&&(c=0),void 0===d&&(d=0),void 0===e&&(e=0),this.translateSelf(c,d,e),this.multiplySelf(new b([a,0,0,0,0,a,0,0,0,0,a,0,0,0,0,1])),this.translateSelf(-c,-d,-e),this},b.prototype.scaleNonUniformSelf=function(a,c,d,e,f,g){return void 0===c&&(c=1),void 0===d&&(d=1),void 0===e&&(e=0),void 0===f&&(f=0),void 0===g&&(g=0),this.translateSelf(e,f,g),this.multiplySelf(new b([a,0,0,0,0,c,0,0,0,0,d,0,0,0,0,1])),this.translateSelf(-e,-f,-g),(1!==d||0!==g)&&(this._is2D=!1),this},b.prototype.rotateSelf=function(a,b,c){void 0===b&&(b=0),void 0===c&&(c=0),this.translateSelf(b,c);var d=[0,0,1],e=d[0],f=d[1],g=d[2];return this.rotateAxisAngleSelf(e,f,g,a),this.translateSelf(-b,-c),this},b.prototype.rotateFromVectorSelf=function(){throw new Error('rotateFromVectorSelf is not implemented yet.')},b.prototype.rotateAxisAngleSelf=function(a,c,d,f){const g=new b(Object(e.c)(a,c,d,f));return this.multiplySelf(g),this},b.prototype.skewXSelf=function(){throw new Error('skewXSelf is not implemented yet.')},b.prototype.skewYSelf=function(){throw new Error('skewYSelf is not implemented yet.')},b.prototype.invertSelf=function(){throw new Error('invertSelf is not implemented yet.')},b.prototype.setMatrixValue=function(){throw new Error('setMatrixValue is not implemented yet.')},c.a.get=function(){return this.m11},c.b.get=function(){return this.m12},c.c.get=function(){return this.m21},c.d.get=function(){return this.m22},c.e.get=function(){return this.m41},c.f.get=function(){return this.m42},c.m11.get=function(){return this._matrix[0]},c.m12.get=function(){return this._matrix[4]},c.m13.get=function(){return this._matrix[8]},c.m14.get=function(){return this._matrix[12]},c.m21.get=function(){return this._matrix[1]},c.m22.get=function(){return this._matrix[5]},c.m23.get=function(){return this._matrix[9]},c.m24.get=function(){return this._matrix[13]},c.m31.get=function(){return this._matrix[2]},c.m32.get=function(){return this._matrix[6]},c.m33.get=function(){return this._matrix[10]},c.m34.get=function(){return this._matrix[14]},c.m41.get=function(){return this._matrix[3]},c.m42.get=function(){return this._matrix[7]},c.m43.get=function(){return this._matrix[11]},c.m44.get=function(){return this._matrix[15]},c.a.set=function(a){this.m11=a},c.b.set=function(a){this.m12=a},c.c.set=function(a){this.m21=a},c.d.set=function(a){this.m22=a},c.e.set=function(a){this.m41=a},c.f.set=function(a){this.m42=a},c.m11.set=function(a){this._matrix[0]=a},c.m12.set=function(a){this._matrix[4]=a},c.m13.set=function(a){this._matrix[8]=a},c.m14.set=function(a){this._matrix[12]=a},c.m21.set=function(a){this._matrix[1]=a},c.m22.set=function(a){this._matrix[5]=a},c.m23.set=function(a){this._matrix[9]=a},c.m24.set=function(a){this._matrix[13]=a},c.m31.set=function(a){this._matrix[2]=a},c.m32.set=function(a){this._matrix[6]=a},c.m33.set=function(a){this._matrix[10]=a},c.m34.set=function(a){this._matrix[14]=a},c.m41.set=function(a){this._matrix[3]=a},c.m42.set=function(a){this._matrix[7]=a},c.m43.set=function(a){this._matrix[11]=a},c.m44.set=function(a){this._matrix[15]=a},Object.defineProperties(b.prototype,c),b}(d.a);b.a=f},function(a,b,c){'use strict';var d=c(0),e=c(2);const f=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];var g=function(a){if(void 0===a&&(a=[]),!(this instanceof d.a))throw new TypeError('DOMMatrixReadOnly can\'t be instantiated directly. Use DOMMatrix instead.');var b=a.length;if(void 0===b||6!==b&&16!==b)throw new TypeError('DOMMatrix constructor argument "numberSequence" must be an array-like with 6 or 16 numbers.');this._matrix=new Float64Array(f),this._isIdentity=!0,this._is2D=6===b,Object(e.a)(a,this)},h={is2D:{},isIdentity:{},a:{},b:{},c:{},d:{},e:{},f:{},m11:{},m12:{},m13:{},m14:{},m21:{},m22:{},m23:{},m24:{},m31:{},m32:{},m33:{},m34:{},m41:{},m42:{},m43:{},m44:{}};g.prototype.translate=function(a,b,c){return void 0===c&&(c=0),new d.a(this).translateSelf(a,b,c)},g.prototype.scale=function(a,b,c){return void 0===b&&(b=0),void 0===c&&(c=0),new d.a(this).scaleSelf(a,b,c)},g.prototype.scale3d=function(a,b,c,e){return void 0===b&&(b=0),void 0===c&&(c=0),void 0===e&&(e=0),new d.a(this).scale3dSelf(a,b,c,e)},g.prototype.scaleNonUniform=function(a,b,c,e,f,g){return void 0===b&&(b=1),void 0===c&&(c=1),void 0===e&&(e=0),void 0===f&&(f=0),void 0===g&&(g=0),new d.a(this).scaleNonUniformSelf(a,b,c,e,f,g)},g.prototype.rotate=function(a,b,c){return void 0===b&&(b=0),void 0===c&&(c=0),new d.a(this).rotateSelf(a,b,c)},g.prototype.rotateFromVector=function(){throw new Error('rotateFromVector is not implemented yet.')},g.prototype.rotateAxisAngle=function(a,b,c,e){return new d.a(this).rotateAxisAngleSelf(a,b,c,e)},g.prototype.skewX=function(){throw new Error('skewX is not implemented yet.')},g.prototype.skewY=function(){throw new Error('skewY is not implemented yet.')},g.prototype.multiply=function(a){return new d.a(this).multiplySelf(a)},g.prototype.flipX=function(){throw new Error('flipX is not implemented yet.')},g.prototype.flipY=function(){throw new Error('flipY is not implemented yet.')},g.prototype.inverse=function(){throw new Error('inverse is not implemented yet.')},g.prototype.transformPoint=function(){throw new Error('transformPoint is not implemented yet.')},g.prototype.toFloat32Array=function(){return Float32Array.from(this._matrix)},g.prototype.toFloat64Array=function(){return Float64Array.from(this._matrix)},h.is2D.get=function(){return this._is2D},h.isIdentity.get=function(){for(var a=this,b=0,c=this._matrix.length;b<c;b+=1)if(a._matrix[b]!=f[b])return a._isIdentity=!1;return this._isIdentity=!0},h.a.get=function(){return this.m11},h.b.get=function(){return this.m12},h.c.get=function(){return this.m21},h.d.get=function(){return this.m22},h.e.get=function(){return this.m41},h.f.get=function(){return this.m42},h.m11.get=function(){return this._matrix[0]},h.m12.get=function(){return this._matrix[4]},h.m13.get=function(){return this._matrix[8]},h.m14.get=function(){return this._matrix[12]},h.m21.get=function(){return this._matrix[1]},h.m22.get=function(){return this._matrix[5]},h.m23.get=function(){return this._matrix[9]},h.m24.get=function(){return this._matrix[13]},h.m31.get=function(){return this._matrix[2]},h.m32.get=function(){return this._matrix[6]},h.m33.get=function(){return this._matrix[10]},h.m34.get=function(){return this._matrix[14]},h.m41.get=function(){return this._matrix[3]},h.m42.get=function(){return this._matrix[7]},h.m43.get=function(){return this._matrix[11]},h.m44.get=function(){return this._matrix[15]},Object.defineProperties(g.prototype,h),b.a=g},function(a,b){'use strict';function c(a,b){const c=a.length;6===c?(b.m11=a[0],b.m12=a[1],b.m21=a[2],b.m22=a[3],b.m41=a[4],b.m42=a[5]):16===c&&(b.m11=a[0],b.m12=a[1],b.m13=a[2],b.m14=a[3],b.m21=a[4],b.m22=a[5],b.m23=a[6],b.m24=a[7],b.m31=a[8],b.m32=a[9],b.m33=a[10],b.m34=a[11],b.m41=a[12],b.m42=a[13],b.m43=a[14],b.m44=a[15])}function d(a){return Math.PI/180*a}b.b=function(a,b,d){e[0]=a.m11*b.m11+a.m21*b.m12+a.m31*b.m13+a.m41*b.m14,e[4]=a.m11*b.m21+a.m21*b.m22+a.m31*b.m23+a.m41*b.m24,e[8]=a.m11*b.m31+a.m21*b.m32+a.m31*b.m33+a.m41*b.m34,e[12]=a.m11*b.m41+a.m21*b.m42+a.m31*b.m43+a.m41*b.m44,e[1]=a.m12*b.m11+a.m22*b.m12+a.m32*b.m13+a.m42*b.m14,e[5]=a.m12*b.m21+a.m22*b.m22+a.m32*b.m23+a.m42*b.m24,e[9]=a.m12*b.m31+a.m22*b.m32+a.m32*b.m33+a.m42*b.m34,e[13]=a.m12*b.m41+a.m22*b.m42+a.m32*b.m43+a.m42*b.m44,e[2]=a.m13*b.m11+a.m23*b.m12+a.m33*b.m13+a.m43*b.m14,e[6]=a.m13*b.m21+a.m23*b.m22+a.m33*b.m23+a.m43*b.m24,e[10]=a.m13*b.m31+a.m23*b.m32+a.m33*b.m33+a.m43*b.m34,e[14]=a.m13*b.m41+a.m23*b.m42+a.m33*b.m43+a.m43*b.m44,e[3]=a.m14*b.m11+a.m24*b.m12+a.m34*b.m13+a.m44*b.m14,e[7]=a.m14*b.m21+a.m24*b.m22+a.m34*b.m23+a.m44*b.m24,e[11]=a.m14*b.m31+a.m24*b.m32+a.m34*b.m33+a.m44*b.m34,e[15]=a.m14*b.m41+a.m24*b.m42+a.m34*b.m43+a.m44*b.m44,c(e,d)},b.a=c,b.c=function(a,b,c,e){var f=Math.sin,g=Math.cos,h=Math.pow;const i=d(e/2);return[1-2*(b*b+c*c)*h(f(i),2),2*(a*b*h(f(i),2)+c*f(i)*g(i)),2*(a*c*h(f(i),2)-b*f(i)*g(i)),0,2*(a*b*h(f(i),2)-c*f(i)*g(i)),1-2*(a*a+c*c)*h(f(i),2),2*(b*c*h(f(i),2)+a*f(i)*g(i)),0,2*(a*c*h(f(i),2)+b*f(i)*g(i)),2*(b*c*h(f(i),2)-a*f(i)*g(i)),1-2*(a*a+b*b)*h(f(i),2),0,0,0,0,1]};const e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},function(a,b,c){a.exports=c(4)},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0}),function(a){var d=c(0),e=c(1),f=c(6);c.d(b,'DOMMatrix',function(){return d.a}),c.d(b,'DOMMatrixReadOnly',function(){return e.a}),c.d(b,'DOMPoint',function(){return f.a}),c.d(b,'DOMPointReadOnly',function(){return f.b});let g=null;'undefined'==typeof window?'undefined'!=typeof a&&(g=a):g=window,g&&(g.DOMMatrix=d.a,g.DOMMatrixReadOnly=e.a,g.DOMPoint=f.a,g.DOMPointReadOnly=f.b)}.call(b,c(5))},function(a){var b=function(){return this}();try{b=b||Function('return this')()||(1,eval)('this')}catch(a){'object'==typeof window&&(b=window)}a.exports=b},function(a,b,c){'use strict';function d(a){return!('object'!=typeof a)&&'x'in a&&'y'in a&&'z'in a&&'w'in a}c.d(b,'b',function(){return g}),c.d(b,'a',function(){return i});let e;const f=function(a){if(!e){e=new WeakMap;let b={};return e.set(a,b),b}let b=e.get(a);return void 0===b&&(b={},e.set(a,b)),b};var g=function(a,b,c,e){if(1===arguments.length){if(!d(a))throw new TypeError('Expected an object with x, y, z, and w properties');f(this).x=a.x,f(this).y=a.y,f(this).z=a.z,f(this).w=a.w}else if(4===arguments.length)f(this).x=a||0,f(this).y=b||0,f(this).z=c||0,f(this).w=e||0;else throw new TypeError('Expected 1 or 4 arguments')},h={x:{},y:{},z:{},w:{}};h.x.get=function(){return f(this).x},h.y.get=function(){return f(this).y},h.z.get=function(){return f(this).z},h.w.get=function(){return f(this).w},g.prototype.matrixTransform=function(){let a=new this.constructor(this);return a},g.fromPoint=function(a){return new this(a)},Object.defineProperties(g.prototype,h);var i=function(a){function b(){a.apply(this,arguments)}a&&(b.__proto__=a),b.prototype=Object.create(a&&a.prototype),b.prototype.constructor=b;var c={x:{},y:{},z:{},w:{}};return c.x.set=function(a){f(this).x=a},c.y.set=function(a){f(this).y=a},c.z.set=function(a){f(this).z=a},c.w.set=function(a){f(this).w=a},Object.defineProperties(b.prototype,c),b}(g)}])});
//# sourceMappingURL=global.js.map