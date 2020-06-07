$.plugin({
    
    name: 'markovSrc',
	init: function() {
		!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).markovChainsText=t()}}(function(){return function(){return function t(r,e,n){function i(u,f){if(!e[u]){if(!r[u]){var a="function"==typeof require&&require;if(!f&&a)return a(u,!0);if(o)return o(u,!0);var s=new Error("Cannot find module '"+u+"'");throw s.code="MODULE_NOT_FOUND",s}var h=e[u]={exports:{}};r[u][0].call(h.exports,function(t){return i(r[u][1][t]||t)},h,h.exports,t,r,e,n)}return e[u].exports}for(var o="function"==typeof require&&require,u=0;u<n.length;u++)i(n[u]);return i}}()({1:[function(t,r,e){"use strict";e.byteLength=function(t){var r=s(t),e=r[0],n=r[1];return 3*(e+n)/4-n},e.toByteArray=function(t){for(var r,e=s(t),n=e[0],u=e[1],f=new o(function(t,r,e){return 3*(r+e)/4-e}(0,n,u)),a=0,h=u>0?n-4:n,l=0;l<h;l+=4)r=i[t.charCodeAt(l)]<<18|i[t.charCodeAt(l+1)]<<12|i[t.charCodeAt(l+2)]<<6|i[t.charCodeAt(l+3)],f[a++]=r>>16&255,f[a++]=r>>8&255,f[a++]=255&r;2===u&&(r=i[t.charCodeAt(l)]<<2|i[t.charCodeAt(l+1)]>>4,f[a++]=255&r);1===u&&(r=i[t.charCodeAt(l)]<<10|i[t.charCodeAt(l+1)]<<4|i[t.charCodeAt(l+2)]>>2,f[a++]=r>>8&255,f[a++]=255&r);return f},e.fromByteArray=function(t){for(var r,e=t.length,i=e%3,o=[],u=0,f=e-i;u<f;u+=16383)o.push(h(t,u,u+16383>f?f:u+16383));1===i?(r=t[e-1],o.push(n[r>>2]+n[r<<4&63]+"==")):2===i&&(r=(t[e-2]<<8)+t[e-1],o.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0,a=u.length;f<a;++f)n[f]=u[f],i[u.charCodeAt(f)]=f;function s(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function h(t,r,e){for(var i,o,u=[],f=r;f<e;f+=3)i=(t[f]<<16&16711680)+(t[f+1]<<8&65280)+(255&t[f+2]),u.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return u.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},{}],2:[function(t,r,e){"use strict";var n=t("base64-js"),i=t("ieee754");e.Buffer=f,e.SlowBuffer=function(t){+t!=t&&(t=0);return f.alloc(+t)},e.INSPECT_MAX_BYTES=50;var o=2147483647;function u(t){if(t>o)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=new Uint8Array(t);return r.__proto__=f.prototype,r}function f(t,r,e){if("number"==typeof t){if("string"==typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return h(t)}return a(t,r,e)}function a(t,r,e){if("string"==typeof t)return function(t,r){"string"==typeof r&&""!==r||(r="utf8");if(!f.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var e=0|p(t,r),n=u(e),i=n.write(t,r);i!==e&&(n=n.slice(0,i));return n}(t,r);if(ArrayBuffer.isView(t))return l(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(J(t,ArrayBuffer)||t&&J(t.buffer,ArrayBuffer))return function(t,r,e){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(e||0))throw new RangeError('"length" is outside of buffer bounds');var n;n=void 0===r&&void 0===e?new Uint8Array(t):void 0===e?new Uint8Array(t,r):new Uint8Array(t,r,e);return n.__proto__=f.prototype,n}(t,r,e);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return f.from(n,r,e);var i=function(t){if(f.isBuffer(t)){var r=0|c(t.length),e=u(r);return 0===e.length?e:(t.copy(e,0,0,r),e)}if(void 0!==t.length)return"number"!=typeof t.length||F(t.length)?u(0):l(t);if("Buffer"===t.type&&Array.isArray(t.data))return l(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return f.from(t[Symbol.toPrimitive]("string"),r,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function h(t){return s(t),u(t<0?0:0|c(t))}function l(t){for(var r=t.length<0?0:0|c(t.length),e=u(r),n=0;n<r;n+=1)e[n]=255&t[n];return e}function c(t){if(t>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes");return 0|t}function p(t,r){if(f.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||J(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var e=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===e)return 0;for(var i=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return D(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return W(t).length;default:if(i)return n?-1:D(t).length;r=(""+r).toLowerCase(),i=!0}}function y(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function g(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),F(e=+e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=f.from(r,n)),f.isBuffer(r))return 0===r.length?-1:v(t,r,e,n,i);if("number"==typeof r)return r&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):v(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function v(t,r,e,n,i){var o,u=1,f=t.length,a=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;u=2,f/=2,a/=2,e/=2}function s(t,r){return 1===u?t[r]:t.readUInt16BE(r*u)}if(i){var h=-1;for(o=e;o<f;o++)if(s(t,o)===s(r,-1===h?0:o-h)){if(-1===h&&(h=o),o-h+1===a)return h*u}else-1!==h&&(o-=o-h),h=-1}else for(e+a>f&&(e=f-a),o=e;o>=0;o--){for(var l=!0,c=0;c<a;c++)if(s(t,o+c)!==s(r,c)){l=!1;break}if(l)return o}return-1}function b(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;n>o/2&&(n=o/2);for(var u=0;u<n;++u){var f=parseInt(r.substr(2*u,2),16);if(F(f))return u;t[e+u]=f}return u}function m(t,r,e,n){return z(D(r,t.length-e),t,e,n)}function w(t,r,e,n){return z(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function A(t,r,e,n){return w(t,r,e,n)}function E(t,r,e,n){return z(W(r),t,e,n)}function S(t,r,e,n){return z(function(t,r){for(var e,n,i,o=[],u=0;u<t.length&&!((r-=2)<0);++u)e=t.charCodeAt(u),n=e>>8,i=e%256,o.push(i),o.push(n);return o}(r,t.length-e),t,e,n)}function _(t,r,e){return 0===r&&e===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(r,e))}function B(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,u,f,a,s=t[i],h=null,l=s>239?4:s>223?3:s>191?2:1;if(i+l<=e)switch(l){case 1:s<128&&(h=s);break;case 2:128==(192&(o=t[i+1]))&&(a=(31&s)<<6|63&o)>127&&(h=a);break;case 3:o=t[i+1],u=t[i+2],128==(192&o)&&128==(192&u)&&(a=(15&s)<<12|(63&o)<<6|63&u)>2047&&(a<55296||a>57343)&&(h=a);break;case 4:o=t[i+1],u=t[i+2],f=t[i+3],128==(192&o)&&128==(192&u)&&128==(192&f)&&(a=(15&s)<<18|(63&o)<<12|(63&u)<<6|63&f)>65535&&a<1114112&&(h=a)}null===h?(h=65533,l=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=l}return function(t){var r=t.length;if(r<=j)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=j));return e}(n)}e.kMaxLength=o,f.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}(),f.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.buffer}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),f.poolSize=8192,f.from=function(t,r,e){return a(t,r,e)},f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,f.alloc=function(t,r,e){return function(t,r,e){return s(t),t<=0?u(t):void 0!==r?"string"==typeof e?u(t).fill(r,e):u(t).fill(r):u(t)}(t,r,e)},f.allocUnsafe=function(t){return h(t)},f.allocUnsafeSlow=function(t){return h(t)},f.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==f.prototype},f.compare=function(t,r){if(J(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),J(r,Uint8Array)&&(r=f.from(r,r.offset,r.byteLength)),!f.isBuffer(t)||!f.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=f.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var o=t[e];if(J(o,Uint8Array)&&(o=f.from(o)),!f.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},f.byteLength=p,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)y(this,r,r+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)y(this,r,r+3),y(this,r+1,r+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)y(this,r,r+7),y(this,r+1,r+6),y(this,r+2,r+5),y(this,r+3,r+4);return this},f.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):function(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return C(this,r,e);case"utf8":case"utf-8":return B(this,r,e);case"ascii":return T(this,r,e);case"latin1":case"binary":return U(this,r,e);case"base64":return _(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},f.prototype.compare=function(t,r,e,n,i){if(J(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(e>>>=0)-(r>>>=0),a=Math.min(o,u),s=this.slice(n,i),h=t.slice(r,e),l=0;l<a;++l)if(s[l]!==h[l]){o=s[l],u=h[l];break}return o<u?-1:u<o?1:0},f.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},f.prototype.indexOf=function(t,r,e){return g(this,t,r,e,!0)},f.prototype.lastIndexOf=function(t,r,e){return g(this,t,r,e,!1)},f.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return b(this,t,r,e);case"utf8":case"utf-8":return m(this,t,r,e);case"ascii":return w(this,t,r,e);case"latin1":case"binary":return A(this,t,r,e);case"base64":return E(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var j=4096;function T(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function U(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function C(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=x(t[o]);return i}function O(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function d(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function k(t,r,e,n,i,o){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function R(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function N(t,r,e,n,o){return r=+r,e>>>=0,o||R(t,0,e,4),i.write(t,r,e,n,23,4),e+4}function L(t,r,e,n,o){return r=+r,e>>>=0,o||R(t,0,e,8),i.write(t,r,e,n,52,8),e+8}f.prototype.slice=function(t,r){var e=this.length;(t=~~t)<0?(t+=e)<0&&(t=0):t>e&&(t=e),(r=void 0===r?e:~~r)<0?(r+=e)<0&&(r=0):r>e&&(r=e),r<t&&(r=t);var n=this.subarray(t,r);return n.__proto__=f.prototype,n},f.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||d(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},f.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||d(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},f.prototype.readUInt8=function(t,r){return t>>>=0,r||d(t,1,this.length),this[t]},f.prototype.readUInt16LE=function(t,r){return t>>>=0,r||d(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUInt16BE=function(t,r){return t>>>=0,r||d(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUInt32LE=function(t,r){return t>>>=0,r||d(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUInt32BE=function(t,r){return t>>>=0,r||d(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||d(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*r)),n},f.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||d(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*r)),o},f.prototype.readInt8=function(t,r){return t>>>=0,r||d(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,r){t>>>=0,r||d(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt16BE=function(t,r){t>>>=0,r||d(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt32LE=function(t,r){return t>>>=0,r||d(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,r){return t>>>=0,r||d(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,r){return t>>>=0,r||d(t,4,this.length),i.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,r){return t>>>=0,r||d(t,4,this.length),i.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,r){return t>>>=0,r||d(t,8,this.length),i.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,r){return t>>>=0,r||d(t,8,this.length),i.read(this,t,!1,52,8)},f.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||k(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},f.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||k(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},f.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,1,255,0),this[r]=255&t,r+1},f.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},f.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);k(this,t,r,e,i-1,-i)}var o=0,u=1,f=0;for(this[r]=255&t;++o<e&&(u*=256);)t<0&&0===f&&0!==this[r+o-1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},f.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);k(this,t,r,e,i-1,-i)}var o=e-1,u=1,f=0;for(this[r+o]=255&t;--o>=0&&(u*=256);)t<0&&0===f&&0!==this[r+o+1]&&(f=1),this[r+o]=(t/u>>0)-f&255;return r+e},f.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},f.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},f.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||k(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeFloatLE=function(t,r,e){return N(this,t,r,!0,e)},f.prototype.writeFloatBE=function(t,r,e){return N(this,t,r,!1,e)},f.prototype.writeDoubleLE=function(t,r,e){return L(this,t,r,!0,e)},f.prototype.writeDoubleBE=function(t,r,e){return L(this,t,r,!1,e)},f.prototype.copy=function(t,r,e,n){if(!f.isBuffer(t))throw new TypeError("argument should be a Buffer");if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i=n-e;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(r,e,n);else if(this===t&&e<r&&r<n)for(var o=i-1;o>=0;--o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,n),r);return i},f.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var i=t.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(t=i)}}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var u=f.isBuffer(t)?t:f.from(t,n),a=u.length;if(0===a)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<e-r;++o)this[o+r]=u[o%a]}return this};var M=/[^+\/0-9A-Za-z-_]/g;function x(t){return t<16?"0"+t.toString(16):t.toString(16)}function D(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],u=0;u<n;++u){if((e=t.charCodeAt(u))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function W(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(M,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function z(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function J(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function F(t){return t!=t}},{"base64-js":1,ieee754:3}],3:[function(t,r,e){e.read=function(t,r,e,n,i){var o,u,f=8*i-n-1,a=(1<<f)-1,s=a>>1,h=-7,l=e?i-1:0,c=e?-1:1,p=t[r+l];for(l+=c,o=p&(1<<-h)-1,p>>=-h,h+=f;h>0;o=256*o+t[r+l],l+=c,h-=8);for(u=o&(1<<-h)-1,o>>=-h,h+=n;h>0;u=256*u+t[r+l],l+=c,h-=8);if(0===o)o=1-s;else{if(o===a)return u?NaN:1/0*(p?-1:1);u+=Math.pow(2,n),o-=s}return(p?-1:1)*u*Math.pow(2,o-n)},e.write=function(t,r,e,n,i,o){var u,f,a,s=8*o-i-1,h=(1<<s)-1,l=h>>1,c=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,y=n?1:-1,g=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(f=isNaN(r)?1:0,u=h):(u=Math.floor(Math.log(r)/Math.LN2),r*(a=Math.pow(2,-u))<1&&(u--,a*=2),(r+=u+l>=1?c/a:c*Math.pow(2,1-l))*a>=2&&(u++,a/=2),u+l>=h?(f=0,u=h):u+l>=1?(f=(r*a-1)*Math.pow(2,i),u+=l):(f=r*Math.pow(2,l-1)*Math.pow(2,i),u=0));i>=8;t[e+p]=255&f,p+=y,f/=256,i-=8);for(u=u<<i|f,s+=i;s>0;t[e+p]=255&u,p+=y,u/=256,s-=8);t[e+p-y]|=128*g}},{}],4:[function(t,r,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},i=function(){function t(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(r,e,n){return e&&t(r.prototype,e),n&&t(r,n),r}}(),o=f(t("sbd")),u=f(t("markov-chains"));function f(t){return t&&t.__esModule?t:{default:t}}function a(t){if(Array.isArray(t)){for(var r=0,e=Array(t.length);r<t.length;r++)e[r]=t[r];return e}return Array.from(t)}var s=2,h=function(){function t(r){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=e.chain,i=e.stateSize,o=void 0===i?s:i;!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t);var f=this.generateCorpus(r);this.rejoinedText=this.joinSentences(f.map(this.joinWords)),this.chain=n||new u.default(f,{stateSize:o})}return i(t,[{key:"toJSON",value:function(){return this.chain.toJSON()}},{key:"generateCorpus",value:function(t){return this.splitSentences(t).filter(this.testSentenceInput).map(this.splitWords)}},{key:"splitWords",value:function(t){return t.split(/\s+/)}},{key:"splitSentences",value:function(t){return o.default.sentences(t,{sanitize:!1})}},{key:"joinWords",value:function(t){return t.join(" ")}},{key:"joinSentences",value:function(t){return t.join(" ")}},{key:"testSentenceInput",value:function(t){return!/(^')|('$)|\s'|'\s|[\"(\(\)\[\])]/.test(t)}},{key:"testSentenceOutput",value:function(t){for(var r=this,e=arguments.length<=1||void 0===arguments[1]?.7:arguments[1],n=arguments.length<=2||void 0===arguments[2]?15:arguments[2],i=Math.round(e*t.length),o=Math.min(i,n),u=o+1,f=Math.max(t.length-o,1),a=new Array(f),s=0;s<f;s++)a[s]=t.slice(s,s+u);return a.every(function(t){var e=r.joinWords(t);return!r.rejoinedText.includes(e)})}},{key:"makeSentence",value:function(t){var r,e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=void 0;Array.isArray(t)?i=t:"string"==typeof t?i=this.splitWords(t):(r=t)&&"object"===(void 0===r?"undefined":n(r))&&!Array.isArray(r)&&Object.assign(e,t);for(var o=e.tries,u=void 0===o?10:o,f=e.maxOverlapRatio,s=e.maxOverlapTotal,h=e.maxChars,l=0;l<u;l++){var c=this.chain.walk(i);if(this.testSentenceOutput(c,f,s)){var p=i?this.joinWords([].concat(a(i),a(c))):this.joinWords(c);if(h&&p.length>h)continue;return p}}return new Error("Unable to create sufficiently original sentence after "+u+" tries")}}],[{key:"fromJSON",value:function(r,e){return new t(e,{chain:u.default.fromJSON(r)})}}]),t}();e.default=h},{"markov-chains":6,sbd:10}],5:[function(t,r,e){(function(n){var i,o;i=this,o=function(){var t=/[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,r={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","'":"\\'",'"':'\\"',"\\":"\\\\"};function e(t){return r[t]||"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}var i={};"break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" ").map(function(t){i[t]=!0});var o=/^[A-Za-z_$][A-Za-z0-9_$]*$/;function u(t){return!i[t]&&o.test(t)}function f(t){return"Function("+c("return this;")+")()"}function a(t){for(var r="",e=0;e<t.length;e++)u(t[e])?r+="."+t[e]:r+="["+c(t[e])+"]";return r}function s(t,r,e){var n=t.map(function(t,n){var i=e(t,n);return void 0===i?String(i):r+i.split("\n").join("\n"+r)}).join(r?",\n":",");return r&&n?"[\n"+n+"\n]":"["+n+"]"}var h={"[object Array]":s,"[object Object]":function(t,r,e){var n=Object.keys(t).reduce(function(n,i){var o=e(t[i],i);return void 0===o?n:(i=u(i)?i:c(i),o=String(o).split("\n").join("\n"+r),n.push(r+i+":"+(r?" ":"")+o),n)},[]).join(r?",\n":",");return r&&n?"{\n"+n+"\n}":"{"+n+"}"},"[object Error]":function(t){return"new Error("+c(t.message)+")"},"[object Date]":function(t){return"new Date("+t.getTime()+")"},"[object String]":function(t){return"new String("+c(t.toString())+")"},"[object Number]":function(t){return"new Number("+t+")"},"[object Boolean]":function(t){return"new Boolean("+t+")"},"[object Uint8Array]":function(t,r){return"new Uint8Array("+s(t)+")"},"[object Set]":function(t,r,e){return"function"==typeof Array.from?"new Set("+c(Array.from(t),r,e)+")":void 0},"[object Map]":function(t,r,e){return"function"==typeof Array.from?"new Map("+c(Array.from(t),r,e)+")":void 0},"[object RegExp]":String,"[object Function]":String,"[object global]":f,"[object Window]":f},l={string:function(r){return"'"+r.replace(t,e)+"'"},number:String,object:String,boolean:String,symbol:String,undefined:String};function c(t,r,e){if(Object(t)!==t)return l[typeof t](t,r,e);if("function"==typeof n&&n.isBuffer(t))return"new Buffer("+e(t.toString())+")";var i=h[Object.prototype.toString.call(t)];return i?i(t,r,e):void 0}return function(t,r,e,n){n=n||{},"string"!=typeof e&&(e=new Array(Math.max(0,0|e)+1).join(" "));var i=Number(n.maxDepth)||100,o=!!n.references,u=!!n.skipUndefinedProperties,f=Number(n.maxValues)||1e5,s=[],h=[],l=[],p=[],y=[];function g(t,r){if(!u||void 0!==t){s.push(r);var e=v(t,c);return s.pop(),e}}var v=o?function(t,r){if(t&&("object"==typeof t||"function"==typeof t)){var n=l.indexOf(t);if(n>-1)return void y.push(s.slice(),p[n]);l.push(t),p.push(s.slice())}if(!(s.length>i||f--<=0))return r(t,e,g)}:function(t,r){if(!(h.indexOf(t)>-1||s.length>i||f--<=0)){h.push(t);t=r(t,e,g);return h.pop(),t}};if("function"==typeof r){var b=v;v=function(t,e){return b(t,function(t,n,i){return r(t,n,function(t){return e(t,n,i)})})}}var m=v(t,c);if(y.length){for(var w=e?"\n":"",A=e?" = ":"=",E=";"+w,S=(b=e?"(function () {":"(function(){",["var x"+A+m]),_=0;_<y.length;_+=2)S.push("x"+a(y[_])+A+"x"+a(y[_+1]));return S.push("return x"),b+w+S.join(E)+E+"}())"}return m}},"function"==typeof t&&"object"==typeof e&&"object"==typeof r?r.exports=o():i.javascriptStringify=o()}).call(this,t("buffer").Buffer)},{buffer:2}],6:[function(t,r,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=function(){return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,r){var e=[],n=!0,i=!1,o=void 0;try{for(var u,f=t[Symbol.iterator]();!(n=(u=f.next()).done)&&(e.push(u.value),!r||e.length!==r);n=!0);}catch(t){i=!0,o=t}finally{try{!n&&f.return&&f.return()}finally{if(i)throw o}}return e}(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=function(){function t(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(r,e,n){return e&&t(r.prototype,e),n&&t(r,n),r}}(),u=t("javascript-stringify"),f=(n=u)&&n.__esModule?n:{default:n};function a(t){if(Array.isArray(t)){for(var r=0,e=Array(t.length);r<t.length;r++)e[r]=t[r];return e}return Array.from(t)}var s="@@MARKOV_CHAIN_BEGIN",h="@@MARKOV_CHAIN_END",l=1,c=function(){function t(r){var e=(arguments.length<=1||void 0===arguments[1]?{}:arguments[1]).stateSize,n=void 0===e?l:e;!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this.stateSize=n,r instanceof Map?this.model=r:this.model=t.build(r,{stateSize:n})}return o(t,[{key:"toJSON",value:function(){var t=[],r=!0,e=!1,n=void 0;try{for(var o,u=this.model[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var f=i(o.value,2),s=f[0],h=f[1];t.push([s,[].concat(a(h))])}}catch(t){e=!0,n=t}finally{try{!r&&u.return&&u.return()}finally{if(e)throw n}}return t}},{key:"move",value:function(t){var r=p(t),e=this.model.get(r);if(e){var n=[],i=[];e.forEach(function(t){n.push(t.value),i.push(t.count)});var o=i.reduce(function(t,r){var e=g(t)||0;return[].concat(a(t),[e+r])},[]),u=function(t,r){var e=arguments.length<=2||void 0===arguments[2]?t.length:arguments[2],n=0,i=e;for(;n<i;){var o=Math.floor((n+i)/2);r<t[o]?i=o:n=o+1}return n}(o,Math.random()*g(o));return n[u]}}},{key:"generate",value:function*(){for(var t=arguments.length<=0||void 0===arguments[0]?y(this.stateSize):arguments[0];;){var r=this.move(t);if(void 0===r||r===h)break;yield r,t=[].concat(a(t.slice(1)),[r])}}},{key:"walk",value:function(t){var r=[],e=!0,n=!1,i=void 0;try{for(var o,u=this.generate(t)[Symbol.iterator]();!(e=(o=u.next()).done);e=!0){var f=o.value;r.push(f)}}catch(t){n=!0,i=t}finally{try{!e&&u.return&&u.return()}finally{if(n)throw i}}return r}}],[{key:"build",value:function(t){var r=(arguments.length<=1||void 0===arguments[1]?{}:arguments[1]).stateSize,e=void 0===r?l:r;if(!Array.isArray(t))throw new Error("Corpus must be a List or an Array");var n=new Map;return t.forEach(function(t){if(!Array.isArray(t))throw new Error("Invalid run in corpus: Must be an array");for(var r=[].concat(a(y(e)),a(t),[h]),i=0;i<t.length+1;i++){var o=i+e,u=p(r.slice(i,o)),s=r[o],l=(0,f.default)(s);n.has(u)||n.set(u,new Map);var c=n.get(u);c.has(l)||c.set(l,{value:s,count:0}),c.get(l).count+=1}}),n}},{key:"fromJSON",value:function(r){var e=void 0,n=JSON.parse(r).map(function(t){var r=i(t,2),n=r[0],o=r[1],u=function(t){return JSON.parse(t).length}(n);if(e){if(u!==e)throw new Error("Inconsistent state size. Expected "+e+" but got "+u+" ("+n+").")}else e=u;var f=new Map,a=!0,s=!1,h=void 0;try{for(var l,c=o[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var p=i(l.value,2),y=p[0],g=p[1];f.set(y,Object.assign({},g))}}catch(t){s=!0,h=t}finally{try{!a&&c.return&&c.return()}finally{if(s)throw h}}return[n,f]});return new t(new Map(n),{stateSize:e})}}]),t}();function p(t){var r=Array.isArray(t)?t:[t];return JSON.stringify(r.map(f.default))}function y(t){for(var r=new Array(t),e=0;e<t;e++)r[e]=s;return r}function g(t){return t[t.length-1]}e.default=c},{"javascript-stringify":5}],7:[function(t,r,e){var n,i=["al","adj","assn","Ave","BSc","MSc","Cell","Ch","Co","cc","Corp","Dem","Dept","ed","eg","Eq","Eqs","est","est","etc","Ex","ext","Fig","fig","Figs","figs","i.e","ie","Inc","inc","Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Sept","Oct","Nov","Dec","jr","mi","Miss","Mrs","Mr","Ms","Mol","mt","mts","no","Nos","PhD","MD","BA","MA","MM","pl","pop","pp","Prof","Dr","pt","Ref","Refs","Rep","repr","rev","Sec","Secs","Sgt","Col","Gen","Rep","Sen","Gov","Lt","Maj","Capt","St","Sr","sr","Jr","jr","Rev","Sun","Mon","Tu","Tue","Tues","Wed","Th","Thu","Thur","Thurs","Fri","Sat","trans","Univ","Viz","Vol","vs","v"];e.setAbbreviations=function(t){n=t||i};var o=e.isCapitalized=function(t){return/^[A-Z][a-z].*/.test(t)||u(t)};e.isSentenceStarter=function(t){return o(t)||/``|"|'/.test(t.substring(0,2))},e.isCommonAbbreviation=function(t){return~n.indexOf(t.replace(/\W+/g,""))},e.isTimeAbbreviation=function(t,r){if(("a.m."===t||"p.m."===t)&&"day"===r.replace(/\W+/g,"").slice(-3).toLowerCase())return!0;return!1},e.isDottedAbbreviation=function(t){var r=t.replace(/[\(\)\[\]\{\}]/g,"").match(/(.\.)*/);return r&&r[0].length>0},e.isCustomAbbreviation=function(t){return t.length<=3||o(t)},e.isNameAbbreviation=function(t,r){return r.length>0&&(!!(t<5&&r[0].length<6&&o(r[0]))||r.filter(function(t){return/[A-Z]/.test(t.charAt(0))}).length>=3)};var u=e.isNumber=function(t,r){return r&&(t=t.slice(r-1,r+2)),!isNaN(t)};e.isPhoneNr=function(t){return t.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/)},e.isURL=function(t){return t.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/)},e.isConcatenated=function(t){var r=0;if(((r=t.indexOf("."))>-1||(r=t.indexOf("!"))>-1||(r=t.indexOf("?"))>-1)&&t.charAt(r+1).match(/[a-zA-Z].*/))return[t.slice(0,r),t.slice(r+1)];return!1},e.isBoundaryChar=function(t){return"."===t||"!"===t||"?"===t}},{}],8:[function(t,r,e){r.exports=function(t,r){if(("string"==typeof t||t instanceof String)&&"undefined"!=typeof document){var e=document.createElement("DIV");e.innerHTML=t,t=(e.textContent||"").trim()}else"object"==typeof t&&t.textContent&&(t=(t.textContent||"").trim());return t}},{}],9:[function(t,r,e){e.endsWithChar=function(t,r){return r.length>1?r.indexOf(t.slice(-1))>-1:t.slice(-1)===r},e.endsWith=function(t,r){return t.slice(t.length-r.length)===r}},{}],10:[function(t,r,e){"use strict";var n=t("sanitize-html"),i=t("./stringHelper"),o=t("./Match"),u=" @~@ ".trim(),f=new RegExp("\\S",""),a=new RegExp("\\n+|[-#=_+*]{4,}","g"),s=new RegExp("\\S+|\\n","g");e.sentences=function(t,r){if(!t||"string"!=typeof t||!t.length)return[];if(!f.test(t))return[];var e,h,l={newline_boundaries:!1,html_boundaries:!1,html_boundaries_tags:["p","div","ul","ol"],sanitize:!1,allowed_tags:!1,preserve_whitespace:!1,abbreviations:null};if("boolean"==typeof r)l.newline_boundaries=!0;else for(var c in r)l[c]=r[c];if(o.setAbbreviations(l.abbreviations),l.newline_boundaries&&(t=t.replace(a," @~@ ")),l.html_boundaries){var p="(<br\\s*\\/?>|<\\/("+l.html_boundaries_tags.join("|")+")>)",y=new RegExp(p,"g");t=t.replace(y,"$1 @~@ ")}(l.sanitize||l.allowed_tags)&&(l.allowed_tags||(l.allowed_tags=[""]),t=n(t,{allowedTags:l.allowed_tags}));var g=0,v=0,b=[],m=[],w=[];if(!(e=l.preserve_whitespace?(h=t.split(/(<br\s*\/?>|\S+|\n+)/)).filter(function(t,r){return r%2}):t.trim().match(s))||!e.length)return[];for(var A=0,E=e.length;A<E;A++)if(g++,w.push(e[A]),~e[A].indexOf(",")&&(g=0),o.isBoundaryChar(e[A])||i.endsWithChar(e[A],"?!")||e[A]===u)(l.newline_boundaries||l.html_boundaries)&&e[A]===u&&w.pop(),m.push(w),g=0,w=[];else if((i.endsWithChar(e[A],'"')||i.endsWithChar(e[A],"”"))&&(e[A]=e[A].slice(0,-1)),i.endsWithChar(e[A],".")){if(A+1<E){if(2===e[A].length&&isNaN(e[A].charAt(0)))continue;if(o.isCommonAbbreviation(e[A]))continue;if(o.isSentenceStarter(e[A+1])){if(o.isTimeAbbreviation(e[A],e[A+1]))continue;if(o.isNameAbbreviation(g,e.slice(A,6)))continue;if(o.isNumber(e[A+1])&&o.isCustomAbbreviation(e[A]))continue}else{if(i.endsWith(e[A],".."))continue;if(o.isDottedAbbreviation(e[A]))continue;if(o.isNameAbbreviation(g,e.slice(A,5)))continue}}m.push(w),w=[],g=0}else{if((v=e[A].indexOf("."))>-1){if(o.isNumber(e[A],v))continue;if(o.isDottedAbbreviation(e[A]))continue;if(o.isURL(e[A])||o.isPhoneNr(e[A]))continue}(b=o.isConcatenated(e[A]))&&(w.pop(),w.push(b[0]),m.push(w),g=0,(w=[]).push(b[1]))}return w.length&&m.push(w),(m=m.filter(function(t){return t.length>0})).slice(1).reduce(function(t,r){var e=t[t.length-1];return 1===e.length&&/^.{1,2}[.]$/.test(e[0])&&!/[.]/.test(r[0])?(t.pop(),t.push(e.concat(r)),t):(t.push(r),t)},[m[0]]).map(function(t,r){if(l.preserve_whitespace&&!l.newline_boundaries&&!l.html_boundaries){var e=2*t.length;return 0===r&&(e+=1),h.splice(0,e).join("")}return t.join(" ")})}},{"./Match":7,"./stringHelper":9,"sanitize-html":8}]},{},[4])(4)});
    }
});