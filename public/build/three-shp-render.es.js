import * as Ht from "three";
import { Shape as Ys, Vector2 as nr, ExtrudeGeometry as to, Path as eo, BufferGeometry as xe, BufferAttribute as ve, Object3D as Ee, Color as _e, Vector3 as ar, PointsMaterial as ro, Points as Kr, Mesh as rr, DoubleSide as io, AdditiveBlending as Qr, NormalBlending as Yr, TextureLoader as ti, SRGBColorSpace as no, Box3 as ei } from "three";
class ao {
  constructor() {
    this.promise = new Promise((I, b) => {
      this.r = I, this.j = b;
    });
  }
  resolve() {
    this.r(...arguments);
  }
  reject() {
    this.j(...arguments);
  }
}
var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function so(Z) {
  return Z && Z.__esModule && Object.prototype.hasOwnProperty.call(Z, "default") ? Z.default : Z;
}
function ir(Z) {
  throw new Error('Could not dynamically require "' + Z + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var oi = { exports: {} };
(function(Z, I) {
  (function(b) {
    Z.exports = b();
  })(function() {
    return (/* @__PURE__ */ function() {
      function b(rt, ct, nt) {
        function O(J, M) {
          if (!ct[J]) {
            if (!rt[J]) {
              var m = typeof ir == "function" && ir;
              if (!M && m)
                return m(J, !0);
              if (dt)
                return dt(J, !0);
              var ot = new Error("Cannot find module '" + J + "'");
              throw ot.code = "MODULE_NOT_FOUND", ot;
            }
            var K = ct[J] = { exports: {} };
            rt[J][0].call(K.exports, function(tt) {
              var W = rt[J][1][tt];
              return O(W || tt);
            }, K, K.exports, b, rt, ct, nt);
          }
          return ct[J].exports;
        }
        for (var dt = typeof ir == "function" && ir, vt = 0; vt < nt.length; vt++)
          O(nt[vt]);
        return O;
      }
      return b;
    }())({ 1: [function(b, rt, ct) {
      const nt = b("lie"), O = b("./combine"), dt = b("buffer").Buffer;
      rt.exports = vt;
      function vt(J, M) {
        return new nt(function(m, ot) {
          const K = O(J, M), tt = new XMLHttpRequest();
          tt.open("GET", K, !0), M !== "prj" && M !== "cpg" && (tt.responseType = "arraybuffer"), tt.addEventListener("load", function() {
            return tt.status > 399 ? M === "prj" || M === "cpg" ? m(!1) : ot(new Error(tt.status)) : m(M !== "prj" && M !== "cpg" ? dt.from(tt.response) : tt.response);
          }, !1), tt.send();
        });
      }
    }, { "./combine": 3, buffer: 8, lie: 12 }], 2: [function(b, rt, ct) {
      (function(nt) {
        (function() {
          const O = b("./binaryajax-browser"), dt = b("./combine"), vt = b("buffer").Buffer;
          rt.exports = async function(M, m) {
            if (!nt.fetch)
              return O(M, m);
            const ot = dt(M, m), K = m === "prj" || m === "cpg";
            try {
              const tt = await fetch(ot);
              if (tt.status > 399)
                throw new Error(tt.statusText);
              if (K)
                return tt.text();
              const W = await tt.arrayBuffer();
              return vt.from(W);
            } catch (tt) {
              if (console.log("ERROR", tt, m), K || m === "dbf")
                return !1;
              throw tt;
            }
          };
        }).call(this);
      }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { "./binaryajax-browser": 1, "./combine": 3, buffer: 8 }], 3: [function(b, rt, ct) {
      (function(nt) {
        (function() {
          const O = nt.URL;
          rt.exports = (dt, vt) => {
            if (!vt)
              return dt;
            const J = new O(dt);
            return J.pathname = `${J.pathname}.${vt}`, J.href;
          };
        }).call(this);
      }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 4: [function(b, rt, ct) {
      function nt(M) {
        let m = 0, ot = 1;
        const K = M.length;
        let tt, W;
        for (; ot < K; )
          tt = W || M[0], W = M[ot], m += (W[0] - tt[0]) * (W[1] + tt[1]), ot++;
        return m > 0;
      }
      function O(M, m) {
        return nt(m) || !M.length ? M.push([m]) : M[M.length - 1].push(m), M;
      }
      J.prototype.parsePoint = function(M) {
        return {
          type: "Point",
          coordinates: this.parseCoord(M, 0)
        };
      }, J.prototype.parseZPoint = function(M) {
        const m = this.parsePoint(M);
        return m.coordinates.push(M.readDoubleLE(16)), m;
      }, J.prototype.parsePointArray = function(M, m, ot) {
        const K = [];
        let tt = 0;
        for (; tt < ot; )
          K.push(this.parseCoord(M, m)), m += 16, tt++;
        return K;
      }, J.prototype.parseZPointArray = function(M, m, ot, K) {
        let tt = 0;
        for (; tt < ot; )
          K[tt].push(M.readDoubleLE(m)), tt++, m += 8;
        return K;
      }, J.prototype.parseArrayGroup = function(M, m, ot, K, tt) {
        const W = [];
        let xt = 0, j, ht = 0, H;
        for (; xt < K; )
          xt++, ot += 4, j = ht, xt === K ? ht = tt : ht = M.readInt32LE(ot), H = ht - j, H && (W.push(this.parsePointArray(M, m, H)), m += H << 4);
        return W;
      }, J.prototype.parseZArrayGroup = function(M, m, ot, K) {
        let tt = 0;
        for (; tt < ot; )
          K[tt] = this.parseZPointArray(M, m, K[tt].length, K[tt]), m += K[tt].length << 3, tt++;
        return K;
      }, J.prototype.parseMultiPoint = function(M) {
        const m = {}, ot = M.readInt32LE(32, !0);
        if (!ot)
          return null;
        const K = this.parseCoord(M, 0), tt = this.parseCoord(M, 16);
        m.bbox = [
          K[0],
          K[1],
          tt[0],
          tt[1]
        ];
        const W = 36;
        return ot === 1 ? (m.type = "Point", m.coordinates = this.parseCoord(M, W)) : (m.type = "MultiPoint", m.coordinates = this.parsePointArray(M, W, ot)), m;
      }, J.prototype.parseZMultiPoint = function(M) {
        const m = this.parseMultiPoint(M);
        if (!m)
          return null;
        let ot;
        if (m.type === "Point")
          return m.coordinates.push(M.readDoubleLE(72)), m;
        ot = m.coordinates.length;
        const K = 52 + (ot << 4);
        return m.coordinates = this.parseZPointArray(M, K, ot, m.coordinates), m;
      }, J.prototype.parsePolyline = function(M) {
        const m = {}, ot = M.readInt32LE(32);
        if (!ot)
          return null;
        const K = this.parseCoord(M, 0), tt = this.parseCoord(M, 16);
        m.bbox = [
          K[0],
          K[1],
          tt[0],
          tt[1]
        ];
        const W = M.readInt32LE(36);
        let xt, j;
        return ot === 1 ? (m.type = "LineString", xt = 44, m.coordinates = this.parsePointArray(M, xt, W)) : (m.type = "MultiLineString", xt = 40 + (ot << 2), j = 40, m.coordinates = this.parseArrayGroup(M, xt, j, ot, W)), m;
      }, J.prototype.parseZPolyline = function(M) {
        const m = this.parsePolyline(M);
        if (!m)
          return null;
        const ot = m.coordinates.length;
        let K;
        return m.type === "LineString" ? (K = 60 + (ot << 4), m.coordinates = this.parseZPointArray(M, K, ot, m.coordinates), m) : (K = 56 + (m.coordinates.reduce(function(W, xt) {
          return W + xt.length;
        }, 0) << 4) + (ot << 2), m.coordinates = this.parseZArrayGroup(M, K, ot, m.coordinates), m);
      }, J.prototype.polyFuncs = function(M) {
        return M && (M.type === "LineString" ? (M.type = "Polygon", M.coordinates = [M.coordinates], M) : (M.coordinates = M.coordinates.reduce(O, []), M.coordinates.length === 1 ? (M.type = "Polygon", M.coordinates = M.coordinates[0], M) : (M.type = "MultiPolygon", M)));
      }, J.prototype.parsePolygon = function(M) {
        return this.polyFuncs(this.parsePolyline(M));
      }, J.prototype.parseZPolygon = function(M) {
        return this.polyFuncs(this.parseZPolyline(M));
      };
      const dt = {
        1: "parsePoint",
        3: "parsePolyline",
        5: "parsePolygon",
        8: "parseMultiPoint",
        11: "parseZPoint",
        13: "parseZPolyline",
        15: "parseZPolygon",
        18: "parseZMultiPoint"
      };
      function vt(M) {
        return M ? function(m, ot) {
          const K = [m.readDoubleLE(ot), m.readDoubleLE(ot + 8)];
          return M.inverse(K);
        } : function(m, ot) {
          return [m.readDoubleLE(ot), m.readDoubleLE(ot + 8)];
        };
      }
      function J(M, m) {
        if (!(this instanceof J))
          return new J(M, m);
        this.buffer = M, this.headers = this.parseHeader(), this.headers.length < this.buffer.byteLength && (this.buffer = this.buffer.slice(0, this.headers.length)), this.shpFuncs(m), this.rows = this.getRows();
      }
      J.prototype.shpFuncs = function(M) {
        let m = this.headers.shpCode;
        if (m > 20 && (m -= 20), !(m in dt))
          throw new Error("I don't know that shp type");
        this.parseFunc = this[dt[m]], this.parseCoord = vt(M);
      }, J.prototype.getShpCode = function() {
        return this.parseHeader().shpCode;
      }, J.prototype.parseHeader = function() {
        const M = this.buffer.slice(0, 100);
        return {
          length: M.readInt32BE(24) << 1,
          version: M.readInt32LE(28),
          shpCode: M.readInt32LE(32),
          bbox: [
            M.readDoubleLE(36),
            M.readDoubleLE(44),
            M.readDoubleLE(52),
            M.readDoubleLE(52)
          ]
        };
      }, J.prototype.getRows = function() {
        let M = 100;
        const m = this.buffer.byteLength, ot = [];
        let K;
        for (; M < m && (K = this.getRow(M), !!K); )
          M += 8, M += K.len, K.type ? ot.push(this.parseFunc(K.data)) : ot.push(null);
        return ot;
      }, J.prototype.getRow = function(M) {
        const m = this.buffer.slice(M, M + 12), ot = m.readInt32BE(4) << 1, K = m.readInt32BE(0);
        return ot === 0 ? {
          id: K,
          len: ot,
          type: 0
        } : {
          id: K,
          len: ot,
          data: this.buffer.slice(M + 12, M + ot + 8),
          type: m.readInt32LE(8)
        };
      }, rt.exports = function(M, m) {
        return new J(M, m).rows;
      };
    }, {}], 5: [function(b, rt, ct) {
      const nt = b("jszip");
      rt.exports = async (O) => {
        const dt = new nt();
        await dt.loadAsync(O);
        const vt = dt.file(/.+/), J = {};
        return await Promise.all(vt.map(async (M) => {
          let m;
          M.name.slice(-3).toLowerCase() === "shp" || M.name.slice(-3).toLowerCase() === "dbf" ? m = await M.async("nodebuffer") : m = await M.async("text"), J[M.name] = m;
        })), J;
      };
    }, { jszip: 11 }], 6: [function(b, rt, ct) {
      ct.byteLength = ot, ct.toByteArray = tt, ct.fromByteArray = j;
      for (var nt = [], O = [], dt = typeof Uint8Array < "u" ? Uint8Array : Array, vt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", J = 0, M = vt.length; J < M; ++J)
        nt[J] = vt[J], O[vt.charCodeAt(J)] = J;
      O[45] = 62, O[95] = 63;
      function m(ht) {
        var H = ht.length;
        if (H % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var mt = ht.indexOf("=");
        mt === -1 && (mt = H);
        var ft = mt === H ? 0 : 4 - mt % 4;
        return [mt, ft];
      }
      function ot(ht) {
        var H = m(ht), mt = H[0], ft = H[1];
        return (mt + ft) * 3 / 4 - ft;
      }
      function K(ht, H, mt) {
        return (H + mt) * 3 / 4 - mt;
      }
      function tt(ht) {
        var H, mt = m(ht), ft = mt[0], P = mt[1], $ = new dt(K(ht, ft, P)), lt = 0, Et = P > 0 ? ft - 4 : ft, kt;
        for (kt = 0; kt < Et; kt += 4)
          H = O[ht.charCodeAt(kt)] << 18 | O[ht.charCodeAt(kt + 1)] << 12 | O[ht.charCodeAt(kt + 2)] << 6 | O[ht.charCodeAt(kt + 3)], $[lt++] = H >> 16 & 255, $[lt++] = H >> 8 & 255, $[lt++] = H & 255;
        return P === 2 && (H = O[ht.charCodeAt(kt)] << 2 | O[ht.charCodeAt(kt + 1)] >> 4, $[lt++] = H & 255), P === 1 && (H = O[ht.charCodeAt(kt)] << 10 | O[ht.charCodeAt(kt + 1)] << 4 | O[ht.charCodeAt(kt + 2)] >> 2, $[lt++] = H >> 8 & 255, $[lt++] = H & 255), $;
      }
      function W(ht) {
        return nt[ht >> 18 & 63] + nt[ht >> 12 & 63] + nt[ht >> 6 & 63] + nt[ht & 63];
      }
      function xt(ht, H, mt) {
        for (var ft, P = [], $ = H; $ < mt; $ += 3)
          ft = (ht[$] << 16 & 16711680) + (ht[$ + 1] << 8 & 65280) + (ht[$ + 2] & 255), P.push(W(ft));
        return P.join("");
      }
      function j(ht) {
        for (var H, mt = ht.length, ft = mt % 3, P = [], $ = 16383, lt = 0, Et = mt - ft; lt < Et; lt += $)
          P.push(xt(ht, lt, lt + $ > Et ? Et : lt + $));
        return ft === 1 ? (H = ht[mt - 1], P.push(
          nt[H >> 2] + nt[H << 4 & 63] + "=="
        )) : ft === 2 && (H = (ht[mt - 2] << 8) + ht[mt - 1], P.push(
          nt[H >> 10] + nt[H >> 4 & 63] + nt[H << 2 & 63] + "="
        )), P.join("");
      }
    }, {}], 7: [function(b, rt, ct) {
    }, {}], 8: [function(b, rt, ct) {
      (function(nt) {
        (function() {
          var O = b("base64-js"), dt = b("ieee754");
          ct.Buffer = m, ct.SlowBuffer = ft, ct.INSPECT_MAX_BYTES = 50;
          var vt = 2147483647;
          ct.kMaxLength = vt, m.TYPED_ARRAY_SUPPORT = J(), !m.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          );
          function J() {
            try {
              var n = new Uint8Array(1);
              return n.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
                return 42;
              } }, n.foo() === 42;
            } catch {
              return !1;
            }
          }
          Object.defineProperty(m.prototype, "parent", {
            enumerable: !0,
            get: function() {
              if (m.isBuffer(this))
                return this.buffer;
            }
          }), Object.defineProperty(m.prototype, "offset", {
            enumerable: !0,
            get: function() {
              if (m.isBuffer(this))
                return this.byteOffset;
            }
          });
          function M(n) {
            if (n > vt)
              throw new RangeError('The value "' + n + '" is invalid for option "size"');
            var r = new Uint8Array(n);
            return r.__proto__ = m.prototype, r;
          }
          function m(n, r, a) {
            if (typeof n == "number") {
              if (typeof r == "string")
                throw new TypeError(
                  'The "string" argument must be of type string. Received type number'
                );
              return W(n);
            }
            return ot(n, r, a);
          }
          typeof Symbol < "u" && Symbol.species != null && m[Symbol.species] === m && Object.defineProperty(m, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1
          }), m.poolSize = 8192;
          function ot(n, r, a) {
            if (typeof n == "string")
              return xt(n, r);
            if (ArrayBuffer.isView(n))
              return j(n);
            if (n == null)
              throw TypeError(
                "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n
              );
            if (U(n, ArrayBuffer) || n && U(n.buffer, ArrayBuffer))
              return ht(n, r, a);
            if (typeof n == "number")
              throw new TypeError(
                'The "value" argument must not be of type number. Received type number'
              );
            var s = n.valueOf && n.valueOf();
            if (s != null && s !== n)
              return m.from(s, r, a);
            var p = H(n);
            if (p)
              return p;
            if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof n[Symbol.toPrimitive] == "function")
              return m.from(
                n[Symbol.toPrimitive]("string"),
                r,
                a
              );
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof n
            );
          }
          m.from = function(n, r, a) {
            return ot(n, r, a);
          }, m.prototype.__proto__ = Uint8Array.prototype, m.__proto__ = Uint8Array;
          function K(n) {
            if (typeof n != "number")
              throw new TypeError('"size" argument must be of type number');
            if (n < 0)
              throw new RangeError('The value "' + n + '" is invalid for option "size"');
          }
          function tt(n, r, a) {
            return K(n), n <= 0 ? M(n) : r !== void 0 ? typeof a == "string" ? M(n).fill(r, a) : M(n).fill(r) : M(n);
          }
          m.alloc = function(n, r, a) {
            return tt(n, r, a);
          };
          function W(n) {
            return K(n), M(n < 0 ? 0 : mt(n) | 0);
          }
          m.allocUnsafe = function(n) {
            return W(n);
          }, m.allocUnsafeSlow = function(n) {
            return W(n);
          };
          function xt(n, r) {
            if ((typeof r != "string" || r === "") && (r = "utf8"), !m.isEncoding(r))
              throw new TypeError("Unknown encoding: " + r);
            var a = P(n, r) | 0, s = M(a), p = s.write(n, r);
            return p !== a && (s = s.slice(0, p)), s;
          }
          function j(n) {
            for (var r = n.length < 0 ? 0 : mt(n.length) | 0, a = M(r), s = 0; s < r; s += 1)
              a[s] = n[s] & 255;
            return a;
          }
          function ht(n, r, a) {
            if (r < 0 || n.byteLength < r)
              throw new RangeError('"offset" is outside of buffer bounds');
            if (n.byteLength < r + (a || 0))
              throw new RangeError('"length" is outside of buffer bounds');
            var s;
            return r === void 0 && a === void 0 ? s = new Uint8Array(n) : a === void 0 ? s = new Uint8Array(n, r) : s = new Uint8Array(n, r, a), s.__proto__ = m.prototype, s;
          }
          function H(n) {
            if (m.isBuffer(n)) {
              var r = mt(n.length) | 0, a = M(r);
              return a.length === 0 || n.copy(a, 0, 0, r), a;
            }
            if (n.length !== void 0)
              return typeof n.length != "number" || _t(n.length) ? M(0) : j(n);
            if (n.type === "Buffer" && Array.isArray(n.data))
              return j(n.data);
          }
          function mt(n) {
            if (n >= vt)
              throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + vt.toString(16) + " bytes");
            return n | 0;
          }
          function ft(n) {
            return +n != n && (n = 0), m.alloc(+n);
          }
          m.isBuffer = function(r) {
            return r != null && r._isBuffer === !0 && r !== m.prototype;
          }, m.compare = function(r, a) {
            if (U(r, Uint8Array) && (r = m.from(r, r.offset, r.byteLength)), U(a, Uint8Array) && (a = m.from(a, a.offset, a.byteLength)), !m.isBuffer(r) || !m.isBuffer(a))
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            if (r === a)
              return 0;
            for (var s = r.length, p = a.length, d = 0, F = Math.min(s, p); d < F; ++d)
              if (r[d] !== a[d]) {
                s = r[d], p = a[d];
                break;
              }
            return s < p ? -1 : p < s ? 1 : 0;
          }, m.isEncoding = function(r) {
            switch (String(r).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }, m.concat = function(r, a) {
            if (!Array.isArray(r))
              throw new TypeError('"list" argument must be an Array of Buffers');
            if (r.length === 0)
              return m.alloc(0);
            var s;
            if (a === void 0)
              for (a = 0, s = 0; s < r.length; ++s)
                a += r[s].length;
            var p = m.allocUnsafe(a), d = 0;
            for (s = 0; s < r.length; ++s) {
              var F = r[s];
              if (U(F, Uint8Array) && (F = m.from(F)), !m.isBuffer(F))
                throw new TypeError('"list" argument must be an Array of Buffers');
              F.copy(p, d), d += F.length;
            }
            return p;
          };
          function P(n, r) {
            if (m.isBuffer(n))
              return n.length;
            if (ArrayBuffer.isView(n) || U(n, ArrayBuffer))
              return n.byteLength;
            if (typeof n != "string")
              throw new TypeError(
                'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof n
              );
            var a = n.length, s = arguments.length > 2 && arguments[2] === !0;
            if (!s && a === 0)
              return 0;
            for (var p = !1; ; )
              switch (r) {
                case "ascii":
                case "latin1":
                case "binary":
                  return a;
                case "utf8":
                case "utf-8":
                  return At(n).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return a * 2;
                case "hex":
                  return a >>> 1;
                case "base64":
                  return zt(n).length;
                default:
                  if (p)
                    return s ? -1 : At(n).length;
                  r = ("" + r).toLowerCase(), p = !0;
              }
          }
          m.byteLength = P;
          function $(n, r, a) {
            var s = !1;
            if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((a === void 0 || a > this.length) && (a = this.length), a <= 0) || (a >>>= 0, r >>>= 0, a <= r))
              return "";
            for (n || (n = "utf8"); ; )
              switch (n) {
                case "hex":
                  return _(this, r, a);
                case "utf8":
                case "utf-8":
                  return k(this, r, a);
                case "ascii":
                  return X(this, r, a);
                case "latin1":
                case "binary":
                  return Q(this, r, a);
                case "base64":
                  return y(this, r, a);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return R(this, r, a);
                default:
                  if (s)
                    throw new TypeError("Unknown encoding: " + n);
                  n = (n + "").toLowerCase(), s = !0;
              }
          }
          m.prototype._isBuffer = !0;
          function lt(n, r, a) {
            var s = n[r];
            n[r] = n[a], n[a] = s;
          }
          m.prototype.swap16 = function() {
            var r = this.length;
            if (r % 2 !== 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var a = 0; a < r; a += 2)
              lt(this, a, a + 1);
            return this;
          }, m.prototype.swap32 = function() {
            var r = this.length;
            if (r % 4 !== 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var a = 0; a < r; a += 4)
              lt(this, a, a + 3), lt(this, a + 1, a + 2);
            return this;
          }, m.prototype.swap64 = function() {
            var r = this.length;
            if (r % 8 !== 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var a = 0; a < r; a += 8)
              lt(this, a, a + 7), lt(this, a + 1, a + 6), lt(this, a + 2, a + 5), lt(this, a + 3, a + 4);
            return this;
          }, m.prototype.toString = function() {
            var r = this.length;
            return r === 0 ? "" : arguments.length === 0 ? k(this, 0, r) : $.apply(this, arguments);
          }, m.prototype.toLocaleString = m.prototype.toString, m.prototype.equals = function(r) {
            if (!m.isBuffer(r))
              throw new TypeError("Argument must be a Buffer");
            return this === r ? !0 : m.compare(this, r) === 0;
          }, m.prototype.inspect = function() {
            var r = "", a = ct.INSPECT_MAX_BYTES;
            return r = this.toString("hex", 0, a).replace(/(.{2})/g, "$1 ").trim(), this.length > a && (r += " ... "), "<Buffer " + r + ">";
          }, m.prototype.compare = function(r, a, s, p, d) {
            if (U(r, Uint8Array) && (r = m.from(r, r.offset, r.byteLength)), !m.isBuffer(r))
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
              );
            if (a === void 0 && (a = 0), s === void 0 && (s = r ? r.length : 0), p === void 0 && (p = 0), d === void 0 && (d = this.length), a < 0 || s > r.length || p < 0 || d > this.length)
              throw new RangeError("out of range index");
            if (p >= d && a >= s)
              return 0;
            if (p >= d)
              return -1;
            if (a >= s)
              return 1;
            if (a >>>= 0, s >>>= 0, p >>>= 0, d >>>= 0, this === r)
              return 0;
            for (var F = d - p, v = s - a, G = Math.min(F, v), wt = this.slice(p, d), E = r.slice(a, s), D = 0; D < G; ++D)
              if (wt[D] !== E[D]) {
                F = wt[D], v = E[D];
                break;
              }
            return F < v ? -1 : v < F ? 1 : 0;
          };
          function Et(n, r, a, s, p) {
            if (n.length === 0)
              return -1;
            if (typeof a == "string" ? (s = a, a = 0) : a > 2147483647 ? a = 2147483647 : a < -2147483648 && (a = -2147483648), a = +a, _t(a) && (a = p ? 0 : n.length - 1), a < 0 && (a = n.length + a), a >= n.length) {
              if (p)
                return -1;
              a = n.length - 1;
            } else if (a < 0)
              if (p)
                a = 0;
              else
                return -1;
            if (typeof r == "string" && (r = m.from(r, s)), m.isBuffer(r))
              return r.length === 0 ? -1 : kt(n, r, a, s, p);
            if (typeof r == "number")
              return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? p ? Uint8Array.prototype.indexOf.call(n, r, a) : Uint8Array.prototype.lastIndexOf.call(n, r, a) : kt(n, [r], a, s, p);
            throw new TypeError("val must be string, number or Buffer");
          }
          function kt(n, r, a, s, p) {
            var d = 1, F = n.length, v = r.length;
            if (s !== void 0 && (s = String(s).toLowerCase(), s === "ucs2" || s === "ucs-2" || s === "utf16le" || s === "utf-16le")) {
              if (n.length < 2 || r.length < 2)
                return -1;
              d = 2, F /= 2, v /= 2, a /= 2;
            }
            function G(it, z) {
              return d === 1 ? it[z] : it.readUInt16BE(z * d);
            }
            var wt;
            if (p) {
              var E = -1;
              for (wt = a; wt < F; wt++)
                if (G(n, wt) === G(r, E === -1 ? 0 : wt - E)) {
                  if (E === -1 && (E = wt), wt - E + 1 === v)
                    return E * d;
                } else
                  E !== -1 && (wt -= wt - E), E = -1;
            } else
              for (a + v > F && (a = F - v), wt = a; wt >= 0; wt--) {
                for (var D = !0, h = 0; h < v; h++)
                  if (G(n, wt + h) !== G(r, h)) {
                    D = !1;
                    break;
                  }
                if (D)
                  return wt;
              }
            return -1;
          }
          m.prototype.includes = function(r, a, s) {
            return this.indexOf(r, a, s) !== -1;
          }, m.prototype.indexOf = function(r, a, s) {
            return Et(this, r, a, s, !0);
          }, m.prototype.lastIndexOf = function(r, a, s) {
            return Et(this, r, a, s, !1);
          };
          function qt(n, r, a, s) {
            a = Number(a) || 0;
            var p = n.length - a;
            s ? (s = Number(s), s > p && (s = p)) : s = p;
            var d = r.length;
            s > d / 2 && (s = d / 2);
            for (var F = 0; F < s; ++F) {
              var v = parseInt(r.substr(F * 2, 2), 16);
              if (_t(v))
                return F;
              n[a + F] = v;
            }
            return F;
          }
          function N(n, r, a, s) {
            return Gt(At(r, n.length - a), n, a, s);
          }
          function yt(n, r, a, s) {
            return Gt(Bt(r), n, a, s);
          }
          function V(n, r, a, s) {
            return yt(n, r, a, s);
          }
          function A(n, r, a, s) {
            return Gt(zt(r), n, a, s);
          }
          function S(n, r, a, s) {
            return Gt(gt(r, n.length - a), n, a, s);
          }
          m.prototype.write = function(r, a, s, p) {
            if (a === void 0)
              p = "utf8", s = this.length, a = 0;
            else if (s === void 0 && typeof a == "string")
              p = a, s = this.length, a = 0;
            else if (isFinite(a))
              a = a >>> 0, isFinite(s) ? (s = s >>> 0, p === void 0 && (p = "utf8")) : (p = s, s = void 0);
            else
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            var d = this.length - a;
            if ((s === void 0 || s > d) && (s = d), r.length > 0 && (s < 0 || a < 0) || a > this.length)
              throw new RangeError("Attempt to write outside buffer bounds");
            p || (p = "utf8");
            for (var F = !1; ; )
              switch (p) {
                case "hex":
                  return qt(this, r, a, s);
                case "utf8":
                case "utf-8":
                  return N(this, r, a, s);
                case "ascii":
                  return yt(this, r, a, s);
                case "latin1":
                case "binary":
                  return V(this, r, a, s);
                case "base64":
                  return A(this, r, a, s);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return S(this, r, a, s);
                default:
                  if (F)
                    throw new TypeError("Unknown encoding: " + p);
                  p = ("" + p).toLowerCase(), F = !0;
              }
          }, m.prototype.toJSON = function() {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };
          function y(n, r, a) {
            return r === 0 && a === n.length ? O.fromByteArray(n) : O.fromByteArray(n.slice(r, a));
          }
          function k(n, r, a) {
            a = Math.min(n.length, a);
            for (var s = [], p = r; p < a; ) {
              var d = n[p], F = null, v = d > 239 ? 4 : d > 223 ? 3 : d > 191 ? 2 : 1;
              if (p + v <= a) {
                var G, wt, E, D;
                switch (v) {
                  case 1:
                    d < 128 && (F = d);
                    break;
                  case 2:
                    G = n[p + 1], (G & 192) === 128 && (D = (d & 31) << 6 | G & 63, D > 127 && (F = D));
                    break;
                  case 3:
                    G = n[p + 1], wt = n[p + 2], (G & 192) === 128 && (wt & 192) === 128 && (D = (d & 15) << 12 | (G & 63) << 6 | wt & 63, D > 2047 && (D < 55296 || D > 57343) && (F = D));
                    break;
                  case 4:
                    G = n[p + 1], wt = n[p + 2], E = n[p + 3], (G & 192) === 128 && (wt & 192) === 128 && (E & 192) === 128 && (D = (d & 15) << 18 | (G & 63) << 12 | (wt & 63) << 6 | E & 63, D > 65535 && D < 1114112 && (F = D));
                }
              }
              F === null ? (F = 65533, v = 1) : F > 65535 && (F -= 65536, s.push(F >>> 10 & 1023 | 55296), F = 56320 | F & 1023), s.push(F), p += v;
            }
            return Y(s);
          }
          var q = 4096;
          function Y(n) {
            var r = n.length;
            if (r <= q)
              return String.fromCharCode.apply(String, n);
            for (var a = "", s = 0; s < r; )
              a += String.fromCharCode.apply(
                String,
                n.slice(s, s += q)
              );
            return a;
          }
          function X(n, r, a) {
            var s = "";
            a = Math.min(n.length, a);
            for (var p = r; p < a; ++p)
              s += String.fromCharCode(n[p] & 127);
            return s;
          }
          function Q(n, r, a) {
            var s = "";
            a = Math.min(n.length, a);
            for (var p = r; p < a; ++p)
              s += String.fromCharCode(n[p]);
            return s;
          }
          function _(n, r, a) {
            var s = n.length;
            (!r || r < 0) && (r = 0), (!a || a < 0 || a > s) && (a = s);
            for (var p = "", d = r; d < a; ++d)
              p += Ft(n[d]);
            return p;
          }
          function R(n, r, a) {
            for (var s = n.slice(r, a), p = "", d = 0; d < s.length; d += 2)
              p += String.fromCharCode(s[d] + s[d + 1] * 256);
            return p;
          }
          m.prototype.slice = function(r, a) {
            var s = this.length;
            r = ~~r, a = a === void 0 ? s : ~~a, r < 0 ? (r += s, r < 0 && (r = 0)) : r > s && (r = s), a < 0 ? (a += s, a < 0 && (a = 0)) : a > s && (a = s), a < r && (a = r);
            var p = this.subarray(r, a);
            return p.__proto__ = m.prototype, p;
          };
          function B(n, r, a) {
            if (n % 1 !== 0 || n < 0)
              throw new RangeError("offset is not uint");
            if (n + r > a)
              throw new RangeError("Trying to access beyond buffer length");
          }
          m.prototype.readUIntLE = function(r, a, s) {
            r = r >>> 0, a = a >>> 0, s || B(r, a, this.length);
            for (var p = this[r], d = 1, F = 0; ++F < a && (d *= 256); )
              p += this[r + F] * d;
            return p;
          }, m.prototype.readUIntBE = function(r, a, s) {
            r = r >>> 0, a = a >>> 0, s || B(r, a, this.length);
            for (var p = this[r + --a], d = 1; a > 0 && (d *= 256); )
              p += this[r + --a] * d;
            return p;
          }, m.prototype.readUInt8 = function(r, a) {
            return r = r >>> 0, a || B(r, 1, this.length), this[r];
          }, m.prototype.readUInt16LE = function(r, a) {
            return r = r >>> 0, a || B(r, 2, this.length), this[r] | this[r + 1] << 8;
          }, m.prototype.readUInt16BE = function(r, a) {
            return r = r >>> 0, a || B(r, 2, this.length), this[r] << 8 | this[r + 1];
          }, m.prototype.readUInt32LE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
          }, m.prototype.readUInt32BE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
          }, m.prototype.readIntLE = function(r, a, s) {
            r = r >>> 0, a = a >>> 0, s || B(r, a, this.length);
            for (var p = this[r], d = 1, F = 0; ++F < a && (d *= 256); )
              p += this[r + F] * d;
            return d *= 128, p >= d && (p -= Math.pow(2, 8 * a)), p;
          }, m.prototype.readIntBE = function(r, a, s) {
            r = r >>> 0, a = a >>> 0, s || B(r, a, this.length);
            for (var p = a, d = 1, F = this[r + --p]; p > 0 && (d *= 256); )
              F += this[r + --p] * d;
            return d *= 128, F >= d && (F -= Math.pow(2, 8 * a)), F;
          }, m.prototype.readInt8 = function(r, a) {
            return r = r >>> 0, a || B(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
          }, m.prototype.readInt16LE = function(r, a) {
            r = r >>> 0, a || B(r, 2, this.length);
            var s = this[r] | this[r + 1] << 8;
            return s & 32768 ? s | 4294901760 : s;
          }, m.prototype.readInt16BE = function(r, a) {
            r = r >>> 0, a || B(r, 2, this.length);
            var s = this[r + 1] | this[r] << 8;
            return s & 32768 ? s | 4294901760 : s;
          }, m.prototype.readInt32LE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
          }, m.prototype.readInt32BE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
          }, m.prototype.readFloatLE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), dt.read(this, r, !0, 23, 4);
          }, m.prototype.readFloatBE = function(r, a) {
            return r = r >>> 0, a || B(r, 4, this.length), dt.read(this, r, !1, 23, 4);
          }, m.prototype.readDoubleLE = function(r, a) {
            return r = r >>> 0, a || B(r, 8, this.length), dt.read(this, r, !0, 52, 8);
          }, m.prototype.readDoubleBE = function(r, a) {
            return r = r >>> 0, a || B(r, 8, this.length), dt.read(this, r, !1, 52, 8);
          };
          function g(n, r, a, s, p, d) {
            if (!m.isBuffer(n))
              throw new TypeError('"buffer" argument must be a Buffer instance');
            if (r > p || r < d)
              throw new RangeError('"value" argument is out of bounds');
            if (a + s > n.length)
              throw new RangeError("Index out of range");
          }
          m.prototype.writeUIntLE = function(r, a, s, p) {
            if (r = +r, a = a >>> 0, s = s >>> 0, !p) {
              var d = Math.pow(2, 8 * s) - 1;
              g(this, r, a, s, d, 0);
            }
            var F = 1, v = 0;
            for (this[a] = r & 255; ++v < s && (F *= 256); )
              this[a + v] = r / F & 255;
            return a + s;
          }, m.prototype.writeUIntBE = function(r, a, s, p) {
            if (r = +r, a = a >>> 0, s = s >>> 0, !p) {
              var d = Math.pow(2, 8 * s) - 1;
              g(this, r, a, s, d, 0);
            }
            var F = s - 1, v = 1;
            for (this[a + F] = r & 255; --F >= 0 && (v *= 256); )
              this[a + F] = r / v & 255;
            return a + s;
          }, m.prototype.writeUInt8 = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 1, 255, 0), this[a] = r & 255, a + 1;
          }, m.prototype.writeUInt16LE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 2, 65535, 0), this[a] = r & 255, this[a + 1] = r >>> 8, a + 2;
          }, m.prototype.writeUInt16BE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 2, 65535, 0), this[a] = r >>> 8, this[a + 1] = r & 255, a + 2;
          }, m.prototype.writeUInt32LE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 4, 4294967295, 0), this[a + 3] = r >>> 24, this[a + 2] = r >>> 16, this[a + 1] = r >>> 8, this[a] = r & 255, a + 4;
          }, m.prototype.writeUInt32BE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 4, 4294967295, 0), this[a] = r >>> 24, this[a + 1] = r >>> 16, this[a + 2] = r >>> 8, this[a + 3] = r & 255, a + 4;
          }, m.prototype.writeIntLE = function(r, a, s, p) {
            if (r = +r, a = a >>> 0, !p) {
              var d = Math.pow(2, 8 * s - 1);
              g(this, r, a, s, d - 1, -d);
            }
            var F = 0, v = 1, G = 0;
            for (this[a] = r & 255; ++F < s && (v *= 256); )
              r < 0 && G === 0 && this[a + F - 1] !== 0 && (G = 1), this[a + F] = (r / v >> 0) - G & 255;
            return a + s;
          }, m.prototype.writeIntBE = function(r, a, s, p) {
            if (r = +r, a = a >>> 0, !p) {
              var d = Math.pow(2, 8 * s - 1);
              g(this, r, a, s, d - 1, -d);
            }
            var F = s - 1, v = 1, G = 0;
            for (this[a + F] = r & 255; --F >= 0 && (v *= 256); )
              r < 0 && G === 0 && this[a + F + 1] !== 0 && (G = 1), this[a + F] = (r / v >> 0) - G & 255;
            return a + s;
          }, m.prototype.writeInt8 = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[a] = r & 255, a + 1;
          }, m.prototype.writeInt16LE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 2, 32767, -32768), this[a] = r & 255, this[a + 1] = r >>> 8, a + 2;
          }, m.prototype.writeInt16BE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 2, 32767, -32768), this[a] = r >>> 8, this[a + 1] = r & 255, a + 2;
          }, m.prototype.writeInt32LE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 4, 2147483647, -2147483648), this[a] = r & 255, this[a + 1] = r >>> 8, this[a + 2] = r >>> 16, this[a + 3] = r >>> 24, a + 4;
          }, m.prototype.writeInt32BE = function(r, a, s) {
            return r = +r, a = a >>> 0, s || g(this, r, a, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[a] = r >>> 24, this[a + 1] = r >>> 16, this[a + 2] = r >>> 8, this[a + 3] = r & 255, a + 4;
          };
          function C(n, r, a, s, p, d) {
            if (a + s > n.length)
              throw new RangeError("Index out of range");
            if (a < 0)
              throw new RangeError("Index out of range");
          }
          function T(n, r, a, s, p) {
            return r = +r, a = a >>> 0, p || C(n, r, a, 4), dt.write(n, r, a, s, 23, 4), a + 4;
          }
          m.prototype.writeFloatLE = function(r, a, s) {
            return T(this, r, a, !0, s);
          }, m.prototype.writeFloatBE = function(r, a, s) {
            return T(this, r, a, !1, s);
          };
          function at(n, r, a, s, p) {
            return r = +r, a = a >>> 0, p || C(n, r, a, 8), dt.write(n, r, a, s, 52, 8), a + 8;
          }
          m.prototype.writeDoubleLE = function(r, a, s) {
            return at(this, r, a, !0, s);
          }, m.prototype.writeDoubleBE = function(r, a, s) {
            return at(this, r, a, !1, s);
          }, m.prototype.copy = function(r, a, s, p) {
            if (!m.isBuffer(r))
              throw new TypeError("argument should be a Buffer");
            if (s || (s = 0), !p && p !== 0 && (p = this.length), a >= r.length && (a = r.length), a || (a = 0), p > 0 && p < s && (p = s), p === s || r.length === 0 || this.length === 0)
              return 0;
            if (a < 0)
              throw new RangeError("targetStart out of bounds");
            if (s < 0 || s >= this.length)
              throw new RangeError("Index out of range");
            if (p < 0)
              throw new RangeError("sourceEnd out of bounds");
            p > this.length && (p = this.length), r.length - a < p - s && (p = r.length - a + s);
            var d = p - s;
            if (this === r && typeof Uint8Array.prototype.copyWithin == "function")
              this.copyWithin(a, s, p);
            else if (this === r && s < a && a < p)
              for (var F = d - 1; F >= 0; --F)
                r[F + a] = this[F + s];
            else
              Uint8Array.prototype.set.call(
                r,
                this.subarray(s, p),
                a
              );
            return d;
          }, m.prototype.fill = function(r, a, s, p) {
            if (typeof r == "string") {
              if (typeof a == "string" ? (p = a, a = 0, s = this.length) : typeof s == "string" && (p = s, s = this.length), p !== void 0 && typeof p != "string")
                throw new TypeError("encoding must be a string");
              if (typeof p == "string" && !m.isEncoding(p))
                throw new TypeError("Unknown encoding: " + p);
              if (r.length === 1) {
                var d = r.charCodeAt(0);
                (p === "utf8" && d < 128 || p === "latin1") && (r = d);
              }
            } else
              typeof r == "number" && (r = r & 255);
            if (a < 0 || this.length < a || this.length < s)
              throw new RangeError("Out of range index");
            if (s <= a)
              return this;
            a = a >>> 0, s = s === void 0 ? this.length : s >>> 0, r || (r = 0);
            var F;
            if (typeof r == "number")
              for (F = a; F < s; ++F)
                this[F] = r;
            else {
              var v = m.isBuffer(r) ? r : m.from(r, p), G = v.length;
              if (G === 0)
                throw new TypeError('The value "' + r + '" is invalid for argument "value"');
              for (F = 0; F < s - a; ++F)
                this[F + a] = v[F % G];
            }
            return this;
          };
          var ut = /[^+/0-9A-Za-z-_]/g;
          function et(n) {
            if (n = n.split("=")[0], n = n.trim().replace(ut, ""), n.length < 2)
              return "";
            for (; n.length % 4 !== 0; )
              n = n + "=";
            return n;
          }
          function Ft(n) {
            return n < 16 ? "0" + n.toString(16) : n.toString(16);
          }
          function At(n, r) {
            r = r || 1 / 0;
            for (var a, s = n.length, p = null, d = [], F = 0; F < s; ++F) {
              if (a = n.charCodeAt(F), a > 55295 && a < 57344) {
                if (!p) {
                  if (a > 56319) {
                    (r -= 3) > -1 && d.push(239, 191, 189);
                    continue;
                  } else if (F + 1 === s) {
                    (r -= 3) > -1 && d.push(239, 191, 189);
                    continue;
                  }
                  p = a;
                  continue;
                }
                if (a < 56320) {
                  (r -= 3) > -1 && d.push(239, 191, 189), p = a;
                  continue;
                }
                a = (p - 55296 << 10 | a - 56320) + 65536;
              } else
                p && (r -= 3) > -1 && d.push(239, 191, 189);
              if (p = null, a < 128) {
                if ((r -= 1) < 0)
                  break;
                d.push(a);
              } else if (a < 2048) {
                if ((r -= 2) < 0)
                  break;
                d.push(
                  a >> 6 | 192,
                  a & 63 | 128
                );
              } else if (a < 65536) {
                if ((r -= 3) < 0)
                  break;
                d.push(
                  a >> 12 | 224,
                  a >> 6 & 63 | 128,
                  a & 63 | 128
                );
              } else if (a < 1114112) {
                if ((r -= 4) < 0)
                  break;
                d.push(
                  a >> 18 | 240,
                  a >> 12 & 63 | 128,
                  a >> 6 & 63 | 128,
                  a & 63 | 128
                );
              } else
                throw new Error("Invalid code point");
            }
            return d;
          }
          function Bt(n) {
            for (var r = [], a = 0; a < n.length; ++a)
              r.push(n.charCodeAt(a) & 255);
            return r;
          }
          function gt(n, r) {
            for (var a, s, p, d = [], F = 0; F < n.length && !((r -= 2) < 0); ++F)
              a = n.charCodeAt(F), s = a >> 8, p = a % 256, d.push(p), d.push(s);
            return d;
          }
          function zt(n) {
            return O.toByteArray(et(n));
          }
          function Gt(n, r, a, s) {
            for (var p = 0; p < s && !(p + a >= r.length || p >= n.length); ++p)
              r[p + a] = n[p];
            return p;
          }
          function U(n, r) {
            return n instanceof r || n != null && n.constructor != null && n.constructor.name != null && n.constructor.name === r.name;
          }
          function _t(n) {
            return n !== n;
          }
        }).call(this);
      }).call(this, b("buffer").Buffer);
    }, { "base64-js": 6, buffer: 8, ieee754: 9 }], 9: [function(b, rt, ct) {
      /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
      ct.read = function(nt, O, dt, vt, J) {
        var M, m, ot = J * 8 - vt - 1, K = (1 << ot) - 1, tt = K >> 1, W = -7, xt = dt ? J - 1 : 0, j = dt ? -1 : 1, ht = nt[O + xt];
        for (xt += j, M = ht & (1 << -W) - 1, ht >>= -W, W += ot; W > 0; M = M * 256 + nt[O + xt], xt += j, W -= 8)
          ;
        for (m = M & (1 << -W) - 1, M >>= -W, W += vt; W > 0; m = m * 256 + nt[O + xt], xt += j, W -= 8)
          ;
        if (M === 0)
          M = 1 - tt;
        else {
          if (M === K)
            return m ? NaN : (ht ? -1 : 1) * (1 / 0);
          m = m + Math.pow(2, vt), M = M - tt;
        }
        return (ht ? -1 : 1) * m * Math.pow(2, M - vt);
      }, ct.write = function(nt, O, dt, vt, J, M) {
        var m, ot, K, tt = M * 8 - J - 1, W = (1 << tt) - 1, xt = W >> 1, j = J === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, ht = vt ? 0 : M - 1, H = vt ? 1 : -1, mt = O < 0 || O === 0 && 1 / O < 0 ? 1 : 0;
        for (O = Math.abs(O), isNaN(O) || O === 1 / 0 ? (ot = isNaN(O) ? 1 : 0, m = W) : (m = Math.floor(Math.log(O) / Math.LN2), O * (K = Math.pow(2, -m)) < 1 && (m--, K *= 2), m + xt >= 1 ? O += j / K : O += j * Math.pow(2, 1 - xt), O * K >= 2 && (m++, K /= 2), m + xt >= W ? (ot = 0, m = W) : m + xt >= 1 ? (ot = (O * K - 1) * Math.pow(2, J), m = m + xt) : (ot = O * Math.pow(2, xt - 1) * Math.pow(2, J), m = 0)); J >= 8; nt[dt + ht] = ot & 255, ht += H, ot /= 256, J -= 8)
          ;
        for (m = m << J | ot, tt += J; tt > 0; nt[dt + ht] = m & 255, ht += H, m /= 256, tt -= 8)
          ;
        nt[dt + ht - H] |= mt * 128;
      };
    }, {}], 10: [function(b, rt, ct) {
      (function(nt) {
        (function() {
          var O = nt.MutationObserver || nt.WebKitMutationObserver, dt;
          if (O) {
            var vt = 0, J = new O(tt), M = nt.document.createTextNode("");
            J.observe(M, {
              characterData: !0
            }), dt = function() {
              M.data = vt = ++vt % 2;
            };
          } else if (!nt.setImmediate && typeof nt.MessageChannel < "u") {
            var m = new nt.MessageChannel();
            m.port1.onmessage = tt, dt = function() {
              m.port2.postMessage(0);
            };
          } else
            "document" in nt && "onreadystatechange" in nt.document.createElement("script") ? dt = function() {
              var xt = nt.document.createElement("script");
              xt.onreadystatechange = function() {
                tt(), xt.onreadystatechange = null, xt.parentNode.removeChild(xt), xt = null;
              }, nt.document.documentElement.appendChild(xt);
            } : dt = function() {
              setTimeout(tt, 0);
            };
          var ot, K = [];
          function tt() {
            ot = !0;
            for (var xt, j, ht = K.length; ht; ) {
              for (j = K, K = [], xt = -1; ++xt < ht; )
                j[xt]();
              ht = K.length;
            }
            ot = !1;
          }
          rt.exports = W;
          function W(xt) {
            K.push(xt) === 1 && !ot && dt();
          }
        }).call(this);
      }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 11: [function(b, rt, ct) {
      (function(nt, O, dt) {
        (function() {
          /*!
          
          	JSZip v3.6.0 - A JavaScript class for generating and reading zip files
          	<http://stuartk.com/jszip>
          
          	(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
          	Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.
          
          	JSZip uses the library pako released under the MIT license :
          	https://github.com/nodeca/pako/blob/master/LICENSE
          	*/
          (function(vt) {
            typeof ct == "object" && typeof rt < "u" ? rt.exports = vt() : (typeof window < "u" ? window : typeof nt < "u" ? nt : typeof self < "u" ? self : this).JSZip = vt();
          })(function() {
            return function vt(J, M, m) {
              function ot(W, xt) {
                if (!M[W]) {
                  if (!J[W]) {
                    var j = typeof b == "function" && b;
                    if (!xt && j)
                      return j(W, !0);
                    if (K)
                      return K(W, !0);
                    var ht = new Error("Cannot find module '" + W + "'");
                    throw ht.code = "MODULE_NOT_FOUND", ht;
                  }
                  var H = M[W] = { exports: {} };
                  J[W][0].call(H.exports, function(mt) {
                    var ft = J[W][1][mt];
                    return ot(ft || mt);
                  }, H, H.exports, vt, J, M, m);
                }
                return M[W].exports;
              }
              for (var K = typeof b == "function" && b, tt = 0; tt < m.length; tt++)
                ot(m[tt]);
              return ot;
            }({ 1: [function(vt, J, M) {
              (function(m) {
                (function(ot) {
                  typeof M == "object" && J !== void 0 ? J.exports = ot() : (typeof window < "u" ? window : m !== void 0 ? m : typeof self < "u" ? self : this).JSZip = ot();
                })(function() {
                  return function ot(K, tt, W) {
                    function xt(H, mt) {
                      if (!tt[H]) {
                        if (!K[H]) {
                          var ft = typeof vt == "function" && vt;
                          if (!mt && ft)
                            return ft(H, !0);
                          if (j)
                            return j(H, !0);
                          var P = new Error("Cannot find module '" + H + "'");
                          throw P.code = "MODULE_NOT_FOUND", P;
                        }
                        var $ = tt[H] = { exports: {} };
                        K[H][0].call($.exports, function(lt) {
                          return xt(K[H][1][lt] || lt);
                        }, $, $.exports, ot, K, tt, W);
                      }
                      return tt[H].exports;
                    }
                    for (var j = typeof vt == "function" && vt, ht = 0; ht < W.length; ht++)
                      xt(W[ht]);
                    return xt;
                  }({ 1: [function(ot, K, tt) {
                    (function(W) {
                      (function(xt) {
                        typeof tt == "object" && K !== void 0 ? K.exports = xt() : (typeof window < "u" ? window : W !== void 0 ? W : typeof self < "u" ? self : this).JSZip = xt();
                      })(function() {
                        return function xt(j, ht, H) {
                          function mt($, lt) {
                            if (!ht[$]) {
                              if (!j[$]) {
                                var Et = typeof ot == "function" && ot;
                                if (!lt && Et)
                                  return Et($, !0);
                                if (ft)
                                  return ft($, !0);
                                var kt = new Error("Cannot find module '" + $ + "'");
                                throw kt.code = "MODULE_NOT_FOUND", kt;
                              }
                              var qt = ht[$] = { exports: {} };
                              j[$][0].call(qt.exports, function(N) {
                                return mt(j[$][1][N] || N);
                              }, qt, qt.exports, xt, j, ht, H);
                            }
                            return ht[$].exports;
                          }
                          for (var ft = typeof ot == "function" && ot, P = 0; P < H.length; P++)
                            mt(H[P]);
                          return mt;
                        }({ 1: [function(xt, j, ht) {
                          (function(H) {
                            (function(mt) {
                              typeof ht == "object" && j !== void 0 ? j.exports = mt() : (typeof window < "u" ? window : H !== void 0 ? H : typeof self < "u" ? self : this).JSZip = mt();
                            })(function() {
                              return function mt(ft, P, $) {
                                function lt(qt, N) {
                                  if (!P[qt]) {
                                    if (!ft[qt]) {
                                      var yt = typeof xt == "function" && xt;
                                      if (!N && yt)
                                        return yt(qt, !0);
                                      if (Et)
                                        return Et(qt, !0);
                                      var V = new Error("Cannot find module '" + qt + "'");
                                      throw V.code = "MODULE_NOT_FOUND", V;
                                    }
                                    var A = P[qt] = { exports: {} };
                                    ft[qt][0].call(A.exports, function(S) {
                                      return lt(ft[qt][1][S] || S);
                                    }, A, A.exports, mt, ft, P, $);
                                  }
                                  return P[qt].exports;
                                }
                                for (var Et = typeof xt == "function" && xt, kt = 0; kt < $.length; kt++)
                                  lt($[kt]);
                                return lt;
                              }({ 1: [function(mt, ft, P) {
                                (function($) {
                                  (function(lt) {
                                    typeof P == "object" && ft !== void 0 ? ft.exports = lt() : (typeof window < "u" ? window : $ !== void 0 ? $ : typeof self < "u" ? self : this).JSZip = lt();
                                  })(function() {
                                    return function lt(Et, kt, qt) {
                                      function N(A, S) {
                                        if (!kt[A]) {
                                          if (!Et[A]) {
                                            var y = typeof mt == "function" && mt;
                                            if (!S && y)
                                              return y(A, !0);
                                            if (yt)
                                              return yt(A, !0);
                                            var k = new Error("Cannot find module '" + A + "'");
                                            throw k.code = "MODULE_NOT_FOUND", k;
                                          }
                                          var q = kt[A] = { exports: {} };
                                          Et[A][0].call(q.exports, function(Y) {
                                            return N(Et[A][1][Y] || Y);
                                          }, q, q.exports, lt, Et, kt, qt);
                                        }
                                        return kt[A].exports;
                                      }
                                      for (var yt = typeof mt == "function" && mt, V = 0; V < qt.length; V++)
                                        N(qt[V]);
                                      return N;
                                    }({ 1: [function(lt, Et, kt) {
                                      (function(qt) {
                                        (function(N) {
                                          typeof kt == "object" && Et !== void 0 ? Et.exports = N() : (typeof window < "u" ? window : qt !== void 0 ? qt : typeof self < "u" ? self : this).JSZip = N();
                                        })(function() {
                                          return function N(yt, V, A) {
                                            function S(q, Y) {
                                              if (!V[q]) {
                                                if (!yt[q]) {
                                                  var X = typeof lt == "function" && lt;
                                                  if (!Y && X)
                                                    return X(q, !0);
                                                  if (y)
                                                    return y(q, !0);
                                                  var Q = new Error("Cannot find module '" + q + "'");
                                                  throw Q.code = "MODULE_NOT_FOUND", Q;
                                                }
                                                var _ = V[q] = { exports: {} };
                                                yt[q][0].call(_.exports, function(R) {
                                                  return S(yt[q][1][R] || R);
                                                }, _, _.exports, N, yt, V, A);
                                              }
                                              return V[q].exports;
                                            }
                                            for (var y = typeof lt == "function" && lt, k = 0; k < A.length; k++)
                                              S(A[k]);
                                            return S;
                                          }({ 1: [function(N, yt, V) {
                                            var A = N("./utils"), S = N("./support"), y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                                            V.encode = function(k) {
                                              for (var q, Y, X, Q, _, R, B, g = [], C = 0, T = k.length, at = T, ut = A.getTypeOf(k) !== "string"; C < k.length; )
                                                at = T - C, X = ut ? (q = k[C++], Y = C < T ? k[C++] : 0, C < T ? k[C++] : 0) : (q = k.charCodeAt(C++), Y = C < T ? k.charCodeAt(C++) : 0, C < T ? k.charCodeAt(C++) : 0), Q = q >> 2, _ = (3 & q) << 4 | Y >> 4, R = 1 < at ? (15 & Y) << 2 | X >> 6 : 64, B = 2 < at ? 63 & X : 64, g.push(y.charAt(Q) + y.charAt(_) + y.charAt(R) + y.charAt(B));
                                              return g.join("");
                                            }, V.decode = function(k) {
                                              var q, Y, X, Q, _, R, B = 0, g = 0;
                                              if (k.substr(0, 5) === "data:")
                                                throw new Error("Invalid base64 input, it looks like a data url.");
                                              var C, T = 3 * (k = k.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
                                              if (k.charAt(k.length - 1) === y.charAt(64) && T--, k.charAt(k.length - 2) === y.charAt(64) && T--, T % 1 != 0)
                                                throw new Error("Invalid base64 input, bad content length.");
                                              for (C = S.uint8array ? new Uint8Array(0 | T) : new Array(0 | T); B < k.length; )
                                                q = y.indexOf(k.charAt(B++)) << 2 | (Q = y.indexOf(k.charAt(B++))) >> 4, Y = (15 & Q) << 4 | (_ = y.indexOf(k.charAt(B++))) >> 2, X = (3 & _) << 6 | (R = y.indexOf(k.charAt(B++))), C[g++] = q, _ !== 64 && (C[g++] = Y), R !== 64 && (C[g++] = X);
                                              return C;
                                            };
                                          }, { "./support": 30, "./utils": 32 }], 2: [function(N, yt, V) {
                                            var A = N("./external"), S = N("./stream/DataWorker"), y = N("./stream/Crc32Probe"), k = N("./stream/DataLengthProbe");
                                            function q(Y, X, Q, _, R) {
                                              this.compressedSize = Y, this.uncompressedSize = X, this.crc32 = Q, this.compression = _, this.compressedContent = R;
                                            }
                                            q.prototype = { getContentWorker: function() {
                                              var Y = new S(A.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new k("data_length")), X = this;
                                              return Y.on("end", function() {
                                                if (this.streamInfo.data_length !== X.uncompressedSize)
                                                  throw new Error("Bug : uncompressed data size mismatch");
                                              }), Y;
                                            }, getCompressedWorker: function() {
                                              return new S(A.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
                                            } }, q.createWorkerFrom = function(Y, X, Q) {
                                              return Y.pipe(new y()).pipe(new k("uncompressedSize")).pipe(X.compressWorker(Q)).pipe(new k("compressedSize")).withStreamInfo("compression", X);
                                            }, yt.exports = q;
                                          }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(N, yt, V) {
                                            var A = N("./stream/GenericWorker");
                                            V.STORE = { magic: "\0\0", compressWorker: function(S) {
                                              return new A("STORE compression");
                                            }, uncompressWorker: function() {
                                              return new A("STORE decompression");
                                            } }, V.DEFLATE = N("./flate");
                                          }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(N, yt, V) {
                                            var A = N("./utils"), S = function() {
                                              for (var y, k = [], q = 0; q < 256; q++) {
                                                y = q;
                                                for (var Y = 0; Y < 8; Y++)
                                                  y = 1 & y ? 3988292384 ^ y >>> 1 : y >>> 1;
                                                k[q] = y;
                                              }
                                              return k;
                                            }();
                                            yt.exports = function(y, k) {
                                              return y !== void 0 && y.length ? A.getTypeOf(y) !== "string" ? function(q, Y, X) {
                                                var Q = S, _ = 0 + X;
                                                q ^= -1;
                                                for (var R = 0; R < _; R++)
                                                  q = q >>> 8 ^ Q[255 & (q ^ Y[R])];
                                                return -1 ^ q;
                                              }(0 | k, y, y.length) : function(q, Y, X) {
                                                var Q = S, _ = 0 + X;
                                                q ^= -1;
                                                for (var R = 0; R < _; R++)
                                                  q = q >>> 8 ^ Q[255 & (q ^ Y.charCodeAt(R))];
                                                return -1 ^ q;
                                              }(0 | k, y, y.length) : 0;
                                            };
                                          }, { "./utils": 32 }], 5: [function(N, yt, V) {
                                            V.base64 = !1, V.binary = !1, V.dir = !1, V.createFolders = !0, V.date = null, V.compression = null, V.compressionOptions = null, V.comment = null, V.unixPermissions = null, V.dosPermissions = null;
                                          }, {}], 6: [function(N, yt, V) {
                                            var A;
                                            A = typeof Promise < "u" ? Promise : N("lie"), yt.exports = { Promise: A };
                                          }, { lie: 37 }], 7: [function(N, yt, V) {
                                            var A = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", S = N("pako"), y = N("./utils"), k = N("./stream/GenericWorker"), q = A ? "uint8array" : "array";
                                            function Y(X, Q) {
                                              k.call(this, "FlateWorker/" + X), this._pako = null, this._pakoAction = X, this._pakoOptions = Q, this.meta = {};
                                            }
                                            V.magic = "\b\0", y.inherits(Y, k), Y.prototype.processChunk = function(X) {
                                              this.meta = X.meta, this._pako === null && this._createPako(), this._pako.push(y.transformTo(q, X.data), !1);
                                            }, Y.prototype.flush = function() {
                                              k.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
                                            }, Y.prototype.cleanUp = function() {
                                              k.prototype.cleanUp.call(this), this._pako = null;
                                            }, Y.prototype._createPako = function() {
                                              this._pako = new S[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
                                              var X = this;
                                              this._pako.onData = function(Q) {
                                                X.push({ data: Q, meta: X.meta });
                                              };
                                            }, V.compressWorker = function(X) {
                                              return new Y("Deflate", X);
                                            }, V.uncompressWorker = function() {
                                              return new Y("Inflate", {});
                                            };
                                          }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(N, yt, V) {
                                            function A(_, R) {
                                              var B, g = "";
                                              for (B = 0; B < R; B++)
                                                g += String.fromCharCode(255 & _), _ >>>= 8;
                                              return g;
                                            }
                                            function S(_, R, B, g, C, T) {
                                              var at, ut, et = _.file, Ft = _.compression, At = T !== q.utf8encode, Bt = y.transformTo("string", T(et.name)), gt = y.transformTo("string", q.utf8encode(et.name)), zt = et.comment, Gt = y.transformTo("string", T(zt)), U = y.transformTo("string", q.utf8encode(zt)), _t = gt.length !== et.name.length, n = U.length !== zt.length, r = "", a = "", s = "", p = et.dir, d = et.date, F = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
                                              R && !B || (F.crc32 = _.crc32, F.compressedSize = _.compressedSize, F.uncompressedSize = _.uncompressedSize);
                                              var v = 0;
                                              R && (v |= 8), At || !_t && !n || (v |= 2048);
                                              var G, wt = 0, E = 0;
                                              p && (wt |= 16), C === "UNIX" ? (E = 798, wt |= ((G = et.unixPermissions) || (G = p ? 16893 : 33204), (65535 & G) << 16)) : (E = 20, wt |= 63 & (et.dosPermissions || 0)), at = d.getUTCHours(), at <<= 6, at |= d.getUTCMinutes(), at <<= 5, at |= d.getUTCSeconds() / 2, ut = d.getUTCFullYear() - 1980, ut <<= 4, ut |= d.getUTCMonth() + 1, ut <<= 5, ut |= d.getUTCDate(), _t && (r += "up" + A((a = A(1, 1) + A(Y(Bt), 4) + gt).length, 2) + a), n && (r += "uc" + A((s = A(1, 1) + A(Y(Gt), 4) + U).length, 2) + s);
                                              var D = "";
                                              return D += `
\0`, D += A(v, 2), D += Ft.magic, D += A(at, 2), D += A(ut, 2), D += A(F.crc32, 4), D += A(F.compressedSize, 4), D += A(F.uncompressedSize, 4), D += A(Bt.length, 2), D += A(r.length, 2), { fileRecord: X.LOCAL_FILE_HEADER + D + Bt + r, dirRecord: X.CENTRAL_FILE_HEADER + A(E, 2) + D + A(Gt.length, 2) + "\0\0\0\0" + A(wt, 4) + A(g, 4) + Bt + r + Gt };
                                            }
                                            var y = N("../utils"), k = N("../stream/GenericWorker"), q = N("../utf8"), Y = N("../crc32"), X = N("../signature");
                                            function Q(_, R, B, g) {
                                              k.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = R, this.zipPlatform = B, this.encodeFileName = g, this.streamFiles = _, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
                                            }
                                            y.inherits(Q, k), Q.prototype.push = function(_) {
                                              var R = _.meta.percent || 0, B = this.entriesCount, g = this._sources.length;
                                              this.accumulate ? this.contentBuffer.push(_) : (this.bytesWritten += _.data.length, k.prototype.push.call(this, { data: _.data, meta: { currentFile: this.currentFile, percent: B ? (R + 100 * (B - g - 1)) / B : 100 } }));
                                            }, Q.prototype.openedSource = function(_) {
                                              this.currentSourceOffset = this.bytesWritten, this.currentFile = _.file.name;
                                              var R = this.streamFiles && !_.file.dir;
                                              if (R) {
                                                var B = S(_, R, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                                this.push({ data: B.fileRecord, meta: { percent: 0 } });
                                              } else
                                                this.accumulate = !0;
                                            }, Q.prototype.closedSource = function(_) {
                                              this.accumulate = !1;
                                              var R, B = this.streamFiles && !_.file.dir, g = S(_, B, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                              if (this.dirRecords.push(g.dirRecord), B)
                                                this.push({ data: (R = _, X.DATA_DESCRIPTOR + A(R.crc32, 4) + A(R.compressedSize, 4) + A(R.uncompressedSize, 4)), meta: { percent: 100 } });
                                              else
                                                for (this.push({ data: g.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
                                                  this.push(this.contentBuffer.shift());
                                              this.currentFile = null;
                                            }, Q.prototype.flush = function() {
                                              for (var _ = this.bytesWritten, R = 0; R < this.dirRecords.length; R++)
                                                this.push({ data: this.dirRecords[R], meta: { percent: 100 } });
                                              var B, g, C, T, at, ut, et = this.bytesWritten - _, Ft = (B = this.dirRecords.length, g = et, C = _, T = this.zipComment, at = this.encodeFileName, ut = y.transformTo("string", at(T)), X.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(B, 2) + A(B, 2) + A(g, 4) + A(C, 4) + A(ut.length, 2) + ut);
                                              this.push({ data: Ft, meta: { percent: 100 } });
                                            }, Q.prototype.prepareNextSource = function() {
                                              this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
                                            }, Q.prototype.registerPrevious = function(_) {
                                              this._sources.push(_);
                                              var R = this;
                                              return _.on("data", function(B) {
                                                R.processChunk(B);
                                              }), _.on("end", function() {
                                                R.closedSource(R.previous.streamInfo), R._sources.length ? R.prepareNextSource() : R.end();
                                              }), _.on("error", function(B) {
                                                R.error(B);
                                              }), this;
                                            }, Q.prototype.resume = function() {
                                              return !!k.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
                                            }, Q.prototype.error = function(_) {
                                              var R = this._sources;
                                              if (!k.prototype.error.call(this, _))
                                                return !1;
                                              for (var B = 0; B < R.length; B++)
                                                try {
                                                  R[B].error(_);
                                                } catch {
                                                }
                                              return !0;
                                            }, Q.prototype.lock = function() {
                                              k.prototype.lock.call(this);
                                              for (var _ = this._sources, R = 0; R < _.length; R++)
                                                _[R].lock();
                                            }, yt.exports = Q;
                                          }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(N, yt, V) {
                                            var A = N("../compressions"), S = N("./ZipFileWorker");
                                            V.generateWorker = function(y, k, q) {
                                              var Y = new S(k.streamFiles, q, k.platform, k.encodeFileName), X = 0;
                                              try {
                                                y.forEach(function(Q, _) {
                                                  X++;
                                                  var R = function(T, at) {
                                                    var ut = T || at, et = A[ut];
                                                    if (!et)
                                                      throw new Error(ut + " is not a valid compression method !");
                                                    return et;
                                                  }(_.options.compression, k.compression), B = _.options.compressionOptions || k.compressionOptions || {}, g = _.dir, C = _.date;
                                                  _._compressWorker(R, B).withStreamInfo("file", { name: Q, dir: g, date: C, comment: _.comment || "", unixPermissions: _.unixPermissions, dosPermissions: _.dosPermissions }).pipe(Y);
                                                }), Y.entriesCount = X;
                                              } catch (Q) {
                                                Y.error(Q);
                                              }
                                              return Y;
                                            };
                                          }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(N, yt, V) {
                                            function A() {
                                              if (!(this instanceof A))
                                                return new A();
                                              if (arguments.length)
                                                throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                                              this.files = {}, this.comment = null, this.root = "", this.clone = function() {
                                                var S = new A();
                                                for (var y in this)
                                                  typeof this[y] != "function" && (S[y] = this[y]);
                                                return S;
                                              };
                                            }
                                            (A.prototype = N("./object")).loadAsync = N("./load"), A.support = N("./support"), A.defaults = N("./defaults"), A.version = "3.5.0", A.loadAsync = function(S, y) {
                                              return new A().loadAsync(S, y);
                                            }, A.external = N("./external"), yt.exports = A;
                                          }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(N, yt, V) {
                                            var A = N("./utils"), S = N("./external"), y = N("./utf8"), k = N("./zipEntries"), q = N("./stream/Crc32Probe"), Y = N("./nodejsUtils");
                                            function X(Q) {
                                              return new S.Promise(function(_, R) {
                                                var B = Q.decompressed.getContentWorker().pipe(new q());
                                                B.on("error", function(g) {
                                                  R(g);
                                                }).on("end", function() {
                                                  B.streamInfo.crc32 !== Q.decompressed.crc32 ? R(new Error("Corrupted zip : CRC32 mismatch")) : _();
                                                }).resume();
                                              });
                                            }
                                            yt.exports = function(Q, _) {
                                              var R = this;
                                              return _ = A.extend(_ || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: y.utf8decode }), Y.isNode && Y.isStream(Q) ? S.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : A.prepareContent("the loaded zip file", Q, !0, _.optimizedBinaryString, _.base64).then(function(B) {
                                                var g = new k(_);
                                                return g.load(B), g;
                                              }).then(function(B) {
                                                var g = [S.Promise.resolve(B)], C = B.files;
                                                if (_.checkCRC32)
                                                  for (var T = 0; T < C.length; T++)
                                                    g.push(X(C[T]));
                                                return S.Promise.all(g);
                                              }).then(function(B) {
                                                for (var g = B.shift(), C = g.files, T = 0; T < C.length; T++) {
                                                  var at = C[T];
                                                  R.file(at.fileNameStr, at.decompressed, { binary: !0, optimizedBinaryString: !0, date: at.date, dir: at.dir, comment: at.fileCommentStr.length ? at.fileCommentStr : null, unixPermissions: at.unixPermissions, dosPermissions: at.dosPermissions, createFolders: _.createFolders });
                                                }
                                                return g.zipComment.length && (R.comment = g.zipComment), R;
                                              });
                                            };
                                          }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(N, yt, V) {
                                            var A = N("../utils"), S = N("../stream/GenericWorker");
                                            function y(k, q) {
                                              S.call(this, "Nodejs stream input adapter for " + k), this._upstreamEnded = !1, this._bindStream(q);
                                            }
                                            A.inherits(y, S), y.prototype._bindStream = function(k) {
                                              var q = this;
                                              (this._stream = k).pause(), k.on("data", function(Y) {
                                                q.push({ data: Y, meta: { percent: 0 } });
                                              }).on("error", function(Y) {
                                                q.isPaused ? this.generatedError = Y : q.error(Y);
                                              }).on("end", function() {
                                                q.isPaused ? q._upstreamEnded = !0 : q.end();
                                              });
                                            }, y.prototype.pause = function() {
                                              return !!S.prototype.pause.call(this) && (this._stream.pause(), !0);
                                            }, y.prototype.resume = function() {
                                              return !!S.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
                                            }, yt.exports = y;
                                          }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(N, yt, V) {
                                            var A = N("readable-stream").Readable;
                                            function S(y, k, q) {
                                              A.call(this, k), this._helper = y;
                                              var Y = this;
                                              y.on("data", function(X, Q) {
                                                Y.push(X) || Y._helper.pause(), q && q(Q);
                                              }).on("error", function(X) {
                                                Y.emit("error", X);
                                              }).on("end", function() {
                                                Y.push(null);
                                              });
                                            }
                                            N("../utils").inherits(S, A), S.prototype._read = function() {
                                              this._helper.resume();
                                            }, yt.exports = S;
                                          }, { "../utils": 32, "readable-stream": 16 }], 14: [function(N, yt, V) {
                                            yt.exports = { isNode: typeof O < "u", newBufferFrom: function(A, S) {
                                              if (O.from && O.from !== Uint8Array.from)
                                                return O.from(A, S);
                                              if (typeof A == "number")
                                                throw new Error('The "data" argument must not be a number');
                                              return new O(A, S);
                                            }, allocBuffer: function(A) {
                                              if (O.alloc)
                                                return O.alloc(A);
                                              var S = new O(A);
                                              return S.fill(0), S;
                                            }, isBuffer: function(A) {
                                              return O.isBuffer(A);
                                            }, isStream: function(A) {
                                              return A && typeof A.on == "function" && typeof A.pause == "function" && typeof A.resume == "function";
                                            } };
                                          }, {}], 15: [function(N, yt, V) {
                                            function A(ut, et, Ft) {
                                              var At, Bt = k.getTypeOf(et), gt = k.extend(Ft || {}, X);
                                              gt.date = gt.date || /* @__PURE__ */ new Date(), gt.compression !== null && (gt.compression = gt.compression.toUpperCase()), typeof gt.unixPermissions == "string" && (gt.unixPermissions = parseInt(gt.unixPermissions, 8)), gt.unixPermissions && 16384 & gt.unixPermissions && (gt.dir = !0), gt.dosPermissions && 16 & gt.dosPermissions && (gt.dir = !0), gt.dir && (ut = S(ut)), gt.createFolders && (At = function(_t) {
                                                _t.slice(-1) === "/" && (_t = _t.substring(0, _t.length - 1));
                                                var n = _t.lastIndexOf("/");
                                                return 0 < n ? _t.substring(0, n) : "";
                                              }(ut)) && C.call(this, At, !0);
                                              var zt, Gt = Bt === "string" && gt.binary === !1 && gt.base64 === !1;
                                              Ft && Ft.binary !== void 0 || (gt.binary = !Gt), (et instanceof Q && et.uncompressedSize === 0 || gt.dir || !et || et.length === 0) && (gt.base64 = !1, gt.binary = !0, et = "", gt.compression = "STORE", Bt = "string"), zt = et instanceof Q || et instanceof q ? et : B.isNode && B.isStream(et) ? new g(ut, et) : k.prepareContent(ut, et, gt.binary, gt.optimizedBinaryString, gt.base64);
                                              var U = new _(ut, zt, gt);
                                              this.files[ut] = U;
                                            }
                                            function S(ut) {
                                              return ut.slice(-1) !== "/" && (ut += "/"), ut;
                                            }
                                            var y = N("./utf8"), k = N("./utils"), q = N("./stream/GenericWorker"), Y = N("./stream/StreamHelper"), X = N("./defaults"), Q = N("./compressedObject"), _ = N("./zipObject"), R = N("./generate"), B = N("./nodejsUtils"), g = N("./nodejs/NodejsStreamInputAdapter"), C = function(ut, et) {
                                              return et = et !== void 0 ? et : X.createFolders, ut = S(ut), this.files[ut] || A.call(this, ut, null, { dir: !0, createFolders: et }), this.files[ut];
                                            };
                                            function T(ut) {
                                              return Object.prototype.toString.call(ut) === "[object RegExp]";
                                            }
                                            var at = { load: function() {
                                              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                            }, forEach: function(ut) {
                                              var et, Ft, At;
                                              for (et in this.files)
                                                this.files.hasOwnProperty(et) && (At = this.files[et], (Ft = et.slice(this.root.length, et.length)) && et.slice(0, this.root.length) === this.root && ut(Ft, At));
                                            }, filter: function(ut) {
                                              var et = [];
                                              return this.forEach(function(Ft, At) {
                                                ut(Ft, At) && et.push(At);
                                              }), et;
                                            }, file: function(ut, et, Ft) {
                                              if (arguments.length !== 1)
                                                return ut = this.root + ut, A.call(this, ut, et, Ft), this;
                                              if (T(ut)) {
                                                var At = ut;
                                                return this.filter(function(gt, zt) {
                                                  return !zt.dir && At.test(gt);
                                                });
                                              }
                                              var Bt = this.files[this.root + ut];
                                              return Bt && !Bt.dir ? Bt : null;
                                            }, folder: function(ut) {
                                              if (!ut)
                                                return this;
                                              if (T(ut))
                                                return this.filter(function(Bt, gt) {
                                                  return gt.dir && ut.test(Bt);
                                                });
                                              var et = this.root + ut, Ft = C.call(this, et), At = this.clone();
                                              return At.root = Ft.name, At;
                                            }, remove: function(ut) {
                                              ut = this.root + ut;
                                              var et = this.files[ut];
                                              if (et || (ut.slice(-1) !== "/" && (ut += "/"), et = this.files[ut]), et && !et.dir)
                                                delete this.files[ut];
                                              else
                                                for (var Ft = this.filter(function(Bt, gt) {
                                                  return gt.name.slice(0, ut.length) === ut;
                                                }), At = 0; At < Ft.length; At++)
                                                  delete this.files[Ft[At].name];
                                              return this;
                                            }, generate: function(ut) {
                                              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                            }, generateInternalStream: function(ut) {
                                              var et, Ft = {};
                                              try {
                                                if ((Ft = k.extend(ut || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: y.utf8encode })).type = Ft.type.toLowerCase(), Ft.compression = Ft.compression.toUpperCase(), Ft.type === "binarystring" && (Ft.type = "string"), !Ft.type)
                                                  throw new Error("No output type specified.");
                                                k.checkSupport(Ft.type), Ft.platform !== "darwin" && Ft.platform !== "freebsd" && Ft.platform !== "linux" && Ft.platform !== "sunos" || (Ft.platform = "UNIX"), Ft.platform === "win32" && (Ft.platform = "DOS");
                                                var At = Ft.comment || this.comment || "";
                                                et = R.generateWorker(this, Ft, At);
                                              } catch (Bt) {
                                                (et = new q("error")).error(Bt);
                                              }
                                              return new Y(et, Ft.type || "string", Ft.mimeType);
                                            }, generateAsync: function(ut, et) {
                                              return this.generateInternalStream(ut).accumulate(et);
                                            }, generateNodeStream: function(ut, et) {
                                              return (ut = ut || {}).type || (ut.type = "nodebuffer"), this.generateInternalStream(ut).toNodejsStream(et);
                                            } };
                                            yt.exports = at;
                                          }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(N, yt, V) {
                                            yt.exports = N("stream");
                                          }, { stream: void 0 }], 17: [function(N, yt, V) {
                                            var A = N("./DataReader");
                                            function S(y) {
                                              A.call(this, y);
                                              for (var k = 0; k < this.data.length; k++)
                                                y[k] = 255 & y[k];
                                            }
                                            N("../utils").inherits(S, A), S.prototype.byteAt = function(y) {
                                              return this.data[this.zero + y];
                                            }, S.prototype.lastIndexOfSignature = function(y) {
                                              for (var k = y.charCodeAt(0), q = y.charCodeAt(1), Y = y.charCodeAt(2), X = y.charCodeAt(3), Q = this.length - 4; 0 <= Q; --Q)
                                                if (this.data[Q] === k && this.data[Q + 1] === q && this.data[Q + 2] === Y && this.data[Q + 3] === X)
                                                  return Q - this.zero;
                                              return -1;
                                            }, S.prototype.readAndCheckSignature = function(y) {
                                              var k = y.charCodeAt(0), q = y.charCodeAt(1), Y = y.charCodeAt(2), X = y.charCodeAt(3), Q = this.readData(4);
                                              return k === Q[0] && q === Q[1] && Y === Q[2] && X === Q[3];
                                            }, S.prototype.readData = function(y) {
                                              if (this.checkOffset(y), y === 0)
                                                return [];
                                              var k = this.data.slice(this.zero + this.index, this.zero + this.index + y);
                                              return this.index += y, k;
                                            }, yt.exports = S;
                                          }, { "../utils": 32, "./DataReader": 18 }], 18: [function(N, yt, V) {
                                            var A = N("../utils");
                                            function S(y) {
                                              this.data = y, this.length = y.length, this.index = 0, this.zero = 0;
                                            }
                                            S.prototype = { checkOffset: function(y) {
                                              this.checkIndex(this.index + y);
                                            }, checkIndex: function(y) {
                                              if (this.length < this.zero + y || y < 0)
                                                throw new Error("End of data reached (data length = " + this.length + ", asked index = " + y + "). Corrupted zip ?");
                                            }, setIndex: function(y) {
                                              this.checkIndex(y), this.index = y;
                                            }, skip: function(y) {
                                              this.setIndex(this.index + y);
                                            }, byteAt: function(y) {
                                            }, readInt: function(y) {
                                              var k, q = 0;
                                              for (this.checkOffset(y), k = this.index + y - 1; k >= this.index; k--)
                                                q = (q << 8) + this.byteAt(k);
                                              return this.index += y, q;
                                            }, readString: function(y) {
                                              return A.transformTo("string", this.readData(y));
                                            }, readData: function(y) {
                                            }, lastIndexOfSignature: function(y) {
                                            }, readAndCheckSignature: function(y) {
                                            }, readDate: function() {
                                              var y = this.readInt(4);
                                              return new Date(Date.UTC(1980 + (y >> 25 & 127), (y >> 21 & 15) - 1, y >> 16 & 31, y >> 11 & 31, y >> 5 & 63, (31 & y) << 1));
                                            } }, yt.exports = S;
                                          }, { "../utils": 32 }], 19: [function(N, yt, V) {
                                            var A = N("./Uint8ArrayReader");
                                            function S(y) {
                                              A.call(this, y);
                                            }
                                            N("../utils").inherits(S, A), S.prototype.readData = function(y) {
                                              this.checkOffset(y);
                                              var k = this.data.slice(this.zero + this.index, this.zero + this.index + y);
                                              return this.index += y, k;
                                            }, yt.exports = S;
                                          }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(N, yt, V) {
                                            var A = N("./DataReader");
                                            function S(y) {
                                              A.call(this, y);
                                            }
                                            N("../utils").inherits(S, A), S.prototype.byteAt = function(y) {
                                              return this.data.charCodeAt(this.zero + y);
                                            }, S.prototype.lastIndexOfSignature = function(y) {
                                              return this.data.lastIndexOf(y) - this.zero;
                                            }, S.prototype.readAndCheckSignature = function(y) {
                                              return y === this.readData(4);
                                            }, S.prototype.readData = function(y) {
                                              this.checkOffset(y);
                                              var k = this.data.slice(this.zero + this.index, this.zero + this.index + y);
                                              return this.index += y, k;
                                            }, yt.exports = S;
                                          }, { "../utils": 32, "./DataReader": 18 }], 21: [function(N, yt, V) {
                                            var A = N("./ArrayReader");
                                            function S(y) {
                                              A.call(this, y);
                                            }
                                            N("../utils").inherits(S, A), S.prototype.readData = function(y) {
                                              if (this.checkOffset(y), y === 0)
                                                return new Uint8Array(0);
                                              var k = this.data.subarray(this.zero + this.index, this.zero + this.index + y);
                                              return this.index += y, k;
                                            }, yt.exports = S;
                                          }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(N, yt, V) {
                                            var A = N("../utils"), S = N("../support"), y = N("./ArrayReader"), k = N("./StringReader"), q = N("./NodeBufferReader"), Y = N("./Uint8ArrayReader");
                                            yt.exports = function(X) {
                                              var Q = A.getTypeOf(X);
                                              return A.checkSupport(Q), Q !== "string" || S.uint8array ? Q === "nodebuffer" ? new q(X) : S.uint8array ? new Y(A.transformTo("uint8array", X)) : new y(A.transformTo("array", X)) : new k(X);
                                            };
                                          }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(N, yt, V) {
                                            V.LOCAL_FILE_HEADER = "PK", V.CENTRAL_FILE_HEADER = "PK", V.CENTRAL_DIRECTORY_END = "PK", V.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", V.ZIP64_CENTRAL_DIRECTORY_END = "PK", V.DATA_DESCRIPTOR = "PK\x07\b";
                                          }, {}], 24: [function(N, yt, V) {
                                            var A = N("./GenericWorker"), S = N("../utils");
                                            function y(k) {
                                              A.call(this, "ConvertWorker to " + k), this.destType = k;
                                            }
                                            S.inherits(y, A), y.prototype.processChunk = function(k) {
                                              this.push({ data: S.transformTo(this.destType, k.data), meta: k.meta });
                                            }, yt.exports = y;
                                          }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(N, yt, V) {
                                            var A = N("./GenericWorker"), S = N("../crc32");
                                            function y() {
                                              A.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
                                            }
                                            N("../utils").inherits(y, A), y.prototype.processChunk = function(k) {
                                              this.streamInfo.crc32 = S(k.data, this.streamInfo.crc32 || 0), this.push(k);
                                            }, yt.exports = y;
                                          }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(N, yt, V) {
                                            var A = N("../utils"), S = N("./GenericWorker");
                                            function y(k) {
                                              S.call(this, "DataLengthProbe for " + k), this.propName = k, this.withStreamInfo(k, 0);
                                            }
                                            A.inherits(y, S), y.prototype.processChunk = function(k) {
                                              if (k) {
                                                var q = this.streamInfo[this.propName] || 0;
                                                this.streamInfo[this.propName] = q + k.data.length;
                                              }
                                              S.prototype.processChunk.call(this, k);
                                            }, yt.exports = y;
                                          }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(N, yt, V) {
                                            var A = N("../utils"), S = N("./GenericWorker");
                                            function y(k) {
                                              S.call(this, "DataWorker");
                                              var q = this;
                                              this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, k.then(function(Y) {
                                                q.dataIsReady = !0, q.data = Y, q.max = Y && Y.length || 0, q.type = A.getTypeOf(Y), q.isPaused || q._tickAndRepeat();
                                              }, function(Y) {
                                                q.error(Y);
                                              });
                                            }
                                            A.inherits(y, S), y.prototype.cleanUp = function() {
                                              S.prototype.cleanUp.call(this), this.data = null;
                                            }, y.prototype.resume = function() {
                                              return !!S.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, A.delay(this._tickAndRepeat, [], this)), !0);
                                            }, y.prototype._tickAndRepeat = function() {
                                              this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (A.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
                                            }, y.prototype._tick = function() {
                                              if (this.isPaused || this.isFinished)
                                                return !1;
                                              var k = null, q = Math.min(this.max, this.index + 16384);
                                              if (this.index >= this.max)
                                                return this.end();
                                              switch (this.type) {
                                                case "string":
                                                  k = this.data.substring(this.index, q);
                                                  break;
                                                case "uint8array":
                                                  k = this.data.subarray(this.index, q);
                                                  break;
                                                case "array":
                                                case "nodebuffer":
                                                  k = this.data.slice(this.index, q);
                                              }
                                              return this.index = q, this.push({ data: k, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
                                            }, yt.exports = y;
                                          }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(N, yt, V) {
                                            function A(S) {
                                              this.name = S || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
                                            }
                                            A.prototype = { push: function(S) {
                                              this.emit("data", S);
                                            }, end: function() {
                                              if (this.isFinished)
                                                return !1;
                                              this.flush();
                                              try {
                                                this.emit("end"), this.cleanUp(), this.isFinished = !0;
                                              } catch (S) {
                                                this.emit("error", S);
                                              }
                                              return !0;
                                            }, error: function(S) {
                                              return !this.isFinished && (this.isPaused ? this.generatedError = S : (this.isFinished = !0, this.emit("error", S), this.previous && this.previous.error(S), this.cleanUp()), !0);
                                            }, on: function(S, y) {
                                              return this._listeners[S].push(y), this;
                                            }, cleanUp: function() {
                                              this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
                                            }, emit: function(S, y) {
                                              if (this._listeners[S])
                                                for (var k = 0; k < this._listeners[S].length; k++)
                                                  this._listeners[S][k].call(this, y);
                                            }, pipe: function(S) {
                                              return S.registerPrevious(this);
                                            }, registerPrevious: function(S) {
                                              if (this.isLocked)
                                                throw new Error("The stream '" + this + "' has already been used.");
                                              this.streamInfo = S.streamInfo, this.mergeStreamInfo(), this.previous = S;
                                              var y = this;
                                              return S.on("data", function(k) {
                                                y.processChunk(k);
                                              }), S.on("end", function() {
                                                y.end();
                                              }), S.on("error", function(k) {
                                                y.error(k);
                                              }), this;
                                            }, pause: function() {
                                              return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
                                            }, resume: function() {
                                              if (!this.isPaused || this.isFinished)
                                                return !1;
                                              var S = this.isPaused = !1;
                                              return this.generatedError && (this.error(this.generatedError), S = !0), this.previous && this.previous.resume(), !S;
                                            }, flush: function() {
                                            }, processChunk: function(S) {
                                              this.push(S);
                                            }, withStreamInfo: function(S, y) {
                                              return this.extraStreamInfo[S] = y, this.mergeStreamInfo(), this;
                                            }, mergeStreamInfo: function() {
                                              for (var S in this.extraStreamInfo)
                                                this.extraStreamInfo.hasOwnProperty(S) && (this.streamInfo[S] = this.extraStreamInfo[S]);
                                            }, lock: function() {
                                              if (this.isLocked)
                                                throw new Error("The stream '" + this + "' has already been used.");
                                              this.isLocked = !0, this.previous && this.previous.lock();
                                            }, toString: function() {
                                              var S = "Worker " + this.name;
                                              return this.previous ? this.previous + " -> " + S : S;
                                            } }, yt.exports = A;
                                          }, {}], 29: [function(N, yt, V) {
                                            var A = N("../utils"), S = N("./ConvertWorker"), y = N("./GenericWorker"), k = N("../base64"), q = N("../support"), Y = N("../external"), X = null;
                                            if (q.nodestream)
                                              try {
                                                X = N("../nodejs/NodejsStreamOutputAdapter");
                                              } catch {
                                              }
                                            function Q(_, R, B) {
                                              var g = R;
                                              switch (R) {
                                                case "blob":
                                                case "arraybuffer":
                                                  g = "uint8array";
                                                  break;
                                                case "base64":
                                                  g = "string";
                                              }
                                              try {
                                                this._internalType = g, this._outputType = R, this._mimeType = B, A.checkSupport(g), this._worker = _.pipe(new S(g)), _.lock();
                                              } catch (C) {
                                                this._worker = new y("error"), this._worker.error(C);
                                              }
                                            }
                                            Q.prototype = { accumulate: function(_) {
                                              return R = this, B = _, new Y.Promise(function(g, C) {
                                                var T = [], at = R._internalType, ut = R._outputType, et = R._mimeType;
                                                R.on("data", function(Ft, At) {
                                                  T.push(Ft), B && B(At);
                                                }).on("error", function(Ft) {
                                                  T = [], C(Ft);
                                                }).on("end", function() {
                                                  try {
                                                    var Ft = function(At, Bt, gt) {
                                                      switch (At) {
                                                        case "blob":
                                                          return A.newBlob(A.transformTo("arraybuffer", Bt), gt);
                                                        case "base64":
                                                          return k.encode(Bt);
                                                        default:
                                                          return A.transformTo(At, Bt);
                                                      }
                                                    }(ut, function(At, Bt) {
                                                      var gt, zt = 0, Gt = null, U = 0;
                                                      for (gt = 0; gt < Bt.length; gt++)
                                                        U += Bt[gt].length;
                                                      switch (At) {
                                                        case "string":
                                                          return Bt.join("");
                                                        case "array":
                                                          return Array.prototype.concat.apply([], Bt);
                                                        case "uint8array":
                                                          for (Gt = new Uint8Array(U), gt = 0; gt < Bt.length; gt++)
                                                            Gt.set(Bt[gt], zt), zt += Bt[gt].length;
                                                          return Gt;
                                                        case "nodebuffer":
                                                          return O.concat(Bt);
                                                        default:
                                                          throw new Error("concat : unsupported type '" + At + "'");
                                                      }
                                                    }(at, T), et);
                                                    g(Ft);
                                                  } catch (At) {
                                                    C(At);
                                                  }
                                                  T = [];
                                                }).resume();
                                              });
                                              var R, B;
                                            }, on: function(_, R) {
                                              var B = this;
                                              return _ === "data" ? this._worker.on(_, function(g) {
                                                R.call(B, g.data, g.meta);
                                              }) : this._worker.on(_, function() {
                                                A.delay(R, arguments, B);
                                              }), this;
                                            }, resume: function() {
                                              return A.delay(this._worker.resume, [], this._worker), this;
                                            }, pause: function() {
                                              return this._worker.pause(), this;
                                            }, toNodejsStream: function(_) {
                                              if (A.checkSupport("nodestream"), this._outputType !== "nodebuffer")
                                                throw new Error(this._outputType + " is not supported by this method");
                                              return new X(this, { objectMode: this._outputType !== "nodebuffer" }, _);
                                            } }, yt.exports = Q;
                                          }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(N, yt, V) {
                                            if (V.base64 = !0, V.array = !0, V.string = !0, V.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", V.nodebuffer = typeof O < "u", V.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u")
                                              V.blob = !1;
                                            else {
                                              var A = new ArrayBuffer(0);
                                              try {
                                                V.blob = new Blob([A], { type: "application/zip" }).size === 0;
                                              } catch {
                                                try {
                                                  var S = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                                  S.append(A), V.blob = S.getBlob("application/zip").size === 0;
                                                } catch {
                                                  V.blob = !1;
                                                }
                                              }
                                            }
                                            try {
                                              V.nodestream = !!N("readable-stream").Readable;
                                            } catch {
                                              V.nodestream = !1;
                                            }
                                          }, { "readable-stream": 16 }], 31: [function(N, yt, V) {
                                            for (var A = N("./utils"), S = N("./support"), y = N("./nodejsUtils"), k = N("./stream/GenericWorker"), q = new Array(256), Y = 0; Y < 256; Y++)
                                              q[Y] = 252 <= Y ? 6 : 248 <= Y ? 5 : 240 <= Y ? 4 : 224 <= Y ? 3 : 192 <= Y ? 2 : 1;
                                            function X() {
                                              k.call(this, "utf-8 decode"), this.leftOver = null;
                                            }
                                            function Q() {
                                              k.call(this, "utf-8 encode");
                                            }
                                            q[254] = q[254] = 1, V.utf8encode = function(_) {
                                              return S.nodebuffer ? y.newBufferFrom(_, "utf-8") : function(R) {
                                                var B, g, C, T, at, ut = R.length, et = 0;
                                                for (T = 0; T < ut; T++)
                                                  (64512 & (g = R.charCodeAt(T))) == 55296 && T + 1 < ut && (64512 & (C = R.charCodeAt(T + 1))) == 56320 && (g = 65536 + (g - 55296 << 10) + (C - 56320), T++), et += g < 128 ? 1 : g < 2048 ? 2 : g < 65536 ? 3 : 4;
                                                for (B = S.uint8array ? new Uint8Array(et) : new Array(et), T = at = 0; at < et; T++)
                                                  (64512 & (g = R.charCodeAt(T))) == 55296 && T + 1 < ut && (64512 & (C = R.charCodeAt(T + 1))) == 56320 && (g = 65536 + (g - 55296 << 10) + (C - 56320), T++), g < 128 ? B[at++] = g : (g < 2048 ? B[at++] = 192 | g >>> 6 : (g < 65536 ? B[at++] = 224 | g >>> 12 : (B[at++] = 240 | g >>> 18, B[at++] = 128 | g >>> 12 & 63), B[at++] = 128 | g >>> 6 & 63), B[at++] = 128 | 63 & g);
                                                return B;
                                              }(_);
                                            }, V.utf8decode = function(_) {
                                              return S.nodebuffer ? A.transformTo("nodebuffer", _).toString("utf-8") : function(R) {
                                                var B, g, C, T, at = R.length, ut = new Array(2 * at);
                                                for (B = g = 0; B < at; )
                                                  if ((C = R[B++]) < 128)
                                                    ut[g++] = C;
                                                  else if (4 < (T = q[C]))
                                                    ut[g++] = 65533, B += T - 1;
                                                  else {
                                                    for (C &= T === 2 ? 31 : T === 3 ? 15 : 7; 1 < T && B < at; )
                                                      C = C << 6 | 63 & R[B++], T--;
                                                    1 < T ? ut[g++] = 65533 : C < 65536 ? ut[g++] = C : (C -= 65536, ut[g++] = 55296 | C >> 10 & 1023, ut[g++] = 56320 | 1023 & C);
                                                  }
                                                return ut.length !== g && (ut.subarray ? ut = ut.subarray(0, g) : ut.length = g), A.applyFromCharCode(ut);
                                              }(_ = A.transformTo(S.uint8array ? "uint8array" : "array", _));
                                            }, A.inherits(X, k), X.prototype.processChunk = function(_) {
                                              var R = A.transformTo(S.uint8array ? "uint8array" : "array", _.data);
                                              if (this.leftOver && this.leftOver.length) {
                                                if (S.uint8array) {
                                                  var B = R;
                                                  (R = new Uint8Array(B.length + this.leftOver.length)).set(this.leftOver, 0), R.set(B, this.leftOver.length);
                                                } else
                                                  R = this.leftOver.concat(R);
                                                this.leftOver = null;
                                              }
                                              var g = function(T, at) {
                                                var ut;
                                                for ((at = at || T.length) > T.length && (at = T.length), ut = at - 1; 0 <= ut && (192 & T[ut]) == 128; )
                                                  ut--;
                                                return ut < 0 || ut === 0 ? at : ut + q[T[ut]] > at ? ut : at;
                                              }(R), C = R;
                                              g !== R.length && (S.uint8array ? (C = R.subarray(0, g), this.leftOver = R.subarray(g, R.length)) : (C = R.slice(0, g), this.leftOver = R.slice(g, R.length))), this.push({ data: V.utf8decode(C), meta: _.meta });
                                            }, X.prototype.flush = function() {
                                              this.leftOver && this.leftOver.length && (this.push({ data: V.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
                                            }, V.Utf8DecodeWorker = X, A.inherits(Q, k), Q.prototype.processChunk = function(_) {
                                              this.push({ data: V.utf8encode(_.data), meta: _.meta });
                                            }, V.Utf8EncodeWorker = Q;
                                          }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(N, yt, V) {
                                            var A = N("./support"), S = N("./base64"), y = N("./nodejsUtils"), k = N("set-immediate-shim"), q = N("./external");
                                            function Y(g) {
                                              return g;
                                            }
                                            function X(g, C) {
                                              for (var T = 0; T < g.length; ++T)
                                                C[T] = 255 & g.charCodeAt(T);
                                              return C;
                                            }
                                            V.newBlob = function(g, C) {
                                              V.checkSupport("blob");
                                              try {
                                                return new Blob([g], { type: C });
                                              } catch {
                                                try {
                                                  var T = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                                  return T.append(g), T.getBlob(C);
                                                } catch {
                                                  throw new Error("Bug : can't construct the Blob.");
                                                }
                                              }
                                            };
                                            var Q = { stringifyByChunk: function(g, C, T) {
                                              var at = [], ut = 0, et = g.length;
                                              if (et <= T)
                                                return String.fromCharCode.apply(null, g);
                                              for (; ut < et; )
                                                C === "array" || C === "nodebuffer" ? at.push(String.fromCharCode.apply(null, g.slice(ut, Math.min(ut + T, et)))) : at.push(String.fromCharCode.apply(null, g.subarray(ut, Math.min(ut + T, et)))), ut += T;
                                              return at.join("");
                                            }, stringifyByChar: function(g) {
                                              for (var C = "", T = 0; T < g.length; T++)
                                                C += String.fromCharCode(g[T]);
                                              return C;
                                            }, applyCanBeUsed: { uint8array: function() {
                                              try {
                                                return A.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
                                              } catch {
                                                return !1;
                                              }
                                            }(), nodebuffer: function() {
                                              try {
                                                return A.nodebuffer && String.fromCharCode.apply(null, y.allocBuffer(1)).length === 1;
                                              } catch {
                                                return !1;
                                              }
                                            }() } };
                                            function _(g) {
                                              var C = 65536, T = V.getTypeOf(g), at = !0;
                                              if (T === "uint8array" ? at = Q.applyCanBeUsed.uint8array : T === "nodebuffer" && (at = Q.applyCanBeUsed.nodebuffer), at)
                                                for (; 1 < C; )
                                                  try {
                                                    return Q.stringifyByChunk(g, T, C);
                                                  } catch {
                                                    C = Math.floor(C / 2);
                                                  }
                                              return Q.stringifyByChar(g);
                                            }
                                            function R(g, C) {
                                              for (var T = 0; T < g.length; T++)
                                                C[T] = g[T];
                                              return C;
                                            }
                                            V.applyFromCharCode = _;
                                            var B = {};
                                            B.string = { string: Y, array: function(g) {
                                              return X(g, new Array(g.length));
                                            }, arraybuffer: function(g) {
                                              return B.string.uint8array(g).buffer;
                                            }, uint8array: function(g) {
                                              return X(g, new Uint8Array(g.length));
                                            }, nodebuffer: function(g) {
                                              return X(g, y.allocBuffer(g.length));
                                            } }, B.array = { string: _, array: Y, arraybuffer: function(g) {
                                              return new Uint8Array(g).buffer;
                                            }, uint8array: function(g) {
                                              return new Uint8Array(g);
                                            }, nodebuffer: function(g) {
                                              return y.newBufferFrom(g);
                                            } }, B.arraybuffer = { string: function(g) {
                                              return _(new Uint8Array(g));
                                            }, array: function(g) {
                                              return R(new Uint8Array(g), new Array(g.byteLength));
                                            }, arraybuffer: Y, uint8array: function(g) {
                                              return new Uint8Array(g);
                                            }, nodebuffer: function(g) {
                                              return y.newBufferFrom(new Uint8Array(g));
                                            } }, B.uint8array = { string: _, array: function(g) {
                                              return R(g, new Array(g.length));
                                            }, arraybuffer: function(g) {
                                              return g.buffer;
                                            }, uint8array: Y, nodebuffer: function(g) {
                                              return y.newBufferFrom(g);
                                            } }, B.nodebuffer = { string: _, array: function(g) {
                                              return R(g, new Array(g.length));
                                            }, arraybuffer: function(g) {
                                              return B.nodebuffer.uint8array(g).buffer;
                                            }, uint8array: function(g) {
                                              return R(g, new Uint8Array(g.length));
                                            }, nodebuffer: Y }, V.transformTo = function(g, C) {
                                              if (C = C || "", !g)
                                                return C;
                                              V.checkSupport(g);
                                              var T = V.getTypeOf(C);
                                              return B[T][g](C);
                                            }, V.getTypeOf = function(g) {
                                              return typeof g == "string" ? "string" : Object.prototype.toString.call(g) === "[object Array]" ? "array" : A.nodebuffer && y.isBuffer(g) ? "nodebuffer" : A.uint8array && g instanceof Uint8Array ? "uint8array" : A.arraybuffer && g instanceof ArrayBuffer ? "arraybuffer" : void 0;
                                            }, V.checkSupport = function(g) {
                                              if (!A[g.toLowerCase()])
                                                throw new Error(g + " is not supported by this platform");
                                            }, V.MAX_VALUE_16BITS = 65535, V.MAX_VALUE_32BITS = -1, V.pretty = function(g) {
                                              var C, T, at = "";
                                              for (T = 0; T < (g || "").length; T++)
                                                at += "\\x" + ((C = g.charCodeAt(T)) < 16 ? "0" : "") + C.toString(16).toUpperCase();
                                              return at;
                                            }, V.delay = function(g, C, T) {
                                              k(function() {
                                                g.apply(T || null, C || []);
                                              });
                                            }, V.inherits = function(g, C) {
                                              function T() {
                                              }
                                              T.prototype = C.prototype, g.prototype = new T();
                                            }, V.extend = function() {
                                              var g, C, T = {};
                                              for (g = 0; g < arguments.length; g++)
                                                for (C in arguments[g])
                                                  arguments[g].hasOwnProperty(C) && T[C] === void 0 && (T[C] = arguments[g][C]);
                                              return T;
                                            }, V.prepareContent = function(g, C, T, at, ut) {
                                              return q.Promise.resolve(C).then(function(et) {
                                                return A.blob && (et instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(et)) !== -1) && typeof FileReader < "u" ? new q.Promise(function(Ft, At) {
                                                  var Bt = new FileReader();
                                                  Bt.onload = function(gt) {
                                                    Ft(gt.target.result);
                                                  }, Bt.onerror = function(gt) {
                                                    At(gt.target.error);
                                                  }, Bt.readAsArrayBuffer(et);
                                                }) : et;
                                              }).then(function(et) {
                                                var Ft, At = V.getTypeOf(et);
                                                return At ? (At === "arraybuffer" ? et = V.transformTo("uint8array", et) : At === "string" && (ut ? et = S.decode(et) : T && at !== !0 && (et = X(Ft = et, A.uint8array ? new Uint8Array(Ft.length) : new Array(Ft.length)))), et) : q.Promise.reject(new Error("Can't read the data of '" + g + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                                              });
                                            };
                                          }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54 }], 33: [function(N, yt, V) {
                                            var A = N("./reader/readerFor"), S = N("./utils"), y = N("./signature"), k = N("./zipEntry"), q = (N("./utf8"), N("./support"));
                                            function Y(X) {
                                              this.files = [], this.loadOptions = X;
                                            }
                                            Y.prototype = { checkSignature: function(X) {
                                              if (!this.reader.readAndCheckSignature(X)) {
                                                this.reader.index -= 4;
                                                var Q = this.reader.readString(4);
                                                throw new Error("Corrupted zip or bug: unexpected signature (" + S.pretty(Q) + ", expected " + S.pretty(X) + ")");
                                              }
                                            }, isSignature: function(X, Q) {
                                              var _ = this.reader.index;
                                              this.reader.setIndex(X);
                                              var R = this.reader.readString(4) === Q;
                                              return this.reader.setIndex(_), R;
                                            }, readBlockEndOfCentral: function() {
                                              this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                                              var X = this.reader.readData(this.zipCommentLength), Q = q.uint8array ? "uint8array" : "array", _ = S.transformTo(Q, X);
                                              this.zipComment = this.loadOptions.decodeFileName(_);
                                            }, readBlockZip64EndOfCentral: function() {
                                              this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                                              for (var X, Q, _, R = this.zip64EndOfCentralSize - 44; 0 < R; )
                                                X = this.reader.readInt(2), Q = this.reader.readInt(4), _ = this.reader.readData(Q), this.zip64ExtensibleData[X] = { id: X, length: Q, value: _ };
                                            }, readBlockZip64EndOfCentralLocator: function() {
                                              if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
                                                throw new Error("Multi-volumes zip are not supported");
                                            }, readLocalFiles: function() {
                                              var X, Q;
                                              for (X = 0; X < this.files.length; X++)
                                                Q = this.files[X], this.reader.setIndex(Q.localHeaderOffset), this.checkSignature(y.LOCAL_FILE_HEADER), Q.readLocalPart(this.reader), Q.handleUTF8(), Q.processAttributes();
                                            }, readCentralDir: function() {
                                              var X;
                                              for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(y.CENTRAL_FILE_HEADER); )
                                                (X = new k({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(X);
                                              if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
                                                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                                            }, readEndOfCentral: function() {
                                              var X = this.reader.lastIndexOfSignature(y.CENTRAL_DIRECTORY_END);
                                              if (X < 0)
                                                throw this.isSignature(0, y.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                                              this.reader.setIndex(X);
                                              var Q = X;
                                              if (this.checkSignature(y.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === S.MAX_VALUE_16BITS || this.diskWithCentralDirStart === S.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === S.MAX_VALUE_16BITS || this.centralDirRecords === S.MAX_VALUE_16BITS || this.centralDirSize === S.MAX_VALUE_32BITS || this.centralDirOffset === S.MAX_VALUE_32BITS) {
                                                if (this.zip64 = !0, (X = this.reader.lastIndexOfSignature(y.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
                                                  throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                                if (this.reader.setIndex(X), this.checkSignature(y.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, y.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(y.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
                                                  throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                                this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(y.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                                              }
                                              var _ = this.centralDirOffset + this.centralDirSize;
                                              this.zip64 && (_ += 20, _ += 12 + this.zip64EndOfCentralSize);
                                              var R = Q - _;
                                              if (0 < R)
                                                this.isSignature(Q, y.CENTRAL_FILE_HEADER) || (this.reader.zero = R);
                                              else if (R < 0)
                                                throw new Error("Corrupted zip: missing " + Math.abs(R) + " bytes.");
                                            }, prepareReader: function(X) {
                                              this.reader = A(X);
                                            }, load: function(X) {
                                              this.prepareReader(X), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
                                            } }, yt.exports = Y;
                                          }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utf8": 31, "./utils": 32, "./zipEntry": 34 }], 34: [function(N, yt, V) {
                                            var A = N("./reader/readerFor"), S = N("./utils"), y = N("./compressedObject"), k = N("./crc32"), q = N("./utf8"), Y = N("./compressions"), X = N("./support");
                                            function Q(_, R) {
                                              this.options = _, this.loadOptions = R;
                                            }
                                            Q.prototype = { isEncrypted: function() {
                                              return (1 & this.bitFlag) == 1;
                                            }, useUTF8: function() {
                                              return (2048 & this.bitFlag) == 2048;
                                            }, readLocalPart: function(_) {
                                              var R, B;
                                              if (_.skip(22), this.fileNameLength = _.readInt(2), B = _.readInt(2), this.fileName = _.readData(this.fileNameLength), _.skip(B), this.compressedSize === -1 || this.uncompressedSize === -1)
                                                throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                                              if ((R = function(g) {
                                                for (var C in Y)
                                                  if (Y.hasOwnProperty(C) && Y[C].magic === g)
                                                    return Y[C];
                                                return null;
                                              }(this.compressionMethod)) === null)
                                                throw new Error("Corrupted zip : compression " + S.pretty(this.compressionMethod) + " unknown (inner file : " + S.transformTo("string", this.fileName) + ")");
                                              this.decompressed = new y(this.compressedSize, this.uncompressedSize, this.crc32, R, _.readData(this.compressedSize));
                                            }, readCentralPart: function(_) {
                                              this.versionMadeBy = _.readInt(2), _.skip(2), this.bitFlag = _.readInt(2), this.compressionMethod = _.readString(2), this.date = _.readDate(), this.crc32 = _.readInt(4), this.compressedSize = _.readInt(4), this.uncompressedSize = _.readInt(4);
                                              var R = _.readInt(2);
                                              if (this.extraFieldsLength = _.readInt(2), this.fileCommentLength = _.readInt(2), this.diskNumberStart = _.readInt(2), this.internalFileAttributes = _.readInt(2), this.externalFileAttributes = _.readInt(4), this.localHeaderOffset = _.readInt(4), this.isEncrypted())
                                                throw new Error("Encrypted zip are not supported");
                                              _.skip(R), this.readExtraFields(_), this.parseZIP64ExtraField(_), this.fileComment = _.readData(this.fileCommentLength);
                                            }, processAttributes: function() {
                                              this.unixPermissions = null, this.dosPermissions = null;
                                              var _ = this.versionMadeBy >> 8;
                                              this.dir = !!(16 & this.externalFileAttributes), _ == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), _ == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
                                            }, parseZIP64ExtraField: function(_) {
                                              if (this.extraFields[1]) {
                                                var R = A(this.extraFields[1].value);
                                                this.uncompressedSize === S.MAX_VALUE_32BITS && (this.uncompressedSize = R.readInt(8)), this.compressedSize === S.MAX_VALUE_32BITS && (this.compressedSize = R.readInt(8)), this.localHeaderOffset === S.MAX_VALUE_32BITS && (this.localHeaderOffset = R.readInt(8)), this.diskNumberStart === S.MAX_VALUE_32BITS && (this.diskNumberStart = R.readInt(4));
                                              }
                                            }, readExtraFields: function(_) {
                                              var R, B, g, C = _.index + this.extraFieldsLength;
                                              for (this.extraFields || (this.extraFields = {}); _.index + 4 < C; )
                                                R = _.readInt(2), B = _.readInt(2), g = _.readData(B), this.extraFields[R] = { id: R, length: B, value: g };
                                              _.setIndex(C);
                                            }, handleUTF8: function() {
                                              var _ = X.uint8array ? "uint8array" : "array";
                                              if (this.useUTF8())
                                                this.fileNameStr = q.utf8decode(this.fileName), this.fileCommentStr = q.utf8decode(this.fileComment);
                                              else {
                                                var R = this.findExtraFieldUnicodePath();
                                                if (R !== null)
                                                  this.fileNameStr = R;
                                                else {
                                                  var B = S.transformTo(_, this.fileName);
                                                  this.fileNameStr = this.loadOptions.decodeFileName(B);
                                                }
                                                var g = this.findExtraFieldUnicodeComment();
                                                if (g !== null)
                                                  this.fileCommentStr = g;
                                                else {
                                                  var C = S.transformTo(_, this.fileComment);
                                                  this.fileCommentStr = this.loadOptions.decodeFileName(C);
                                                }
                                              }
                                            }, findExtraFieldUnicodePath: function() {
                                              var _ = this.extraFields[28789];
                                              if (_) {
                                                var R = A(_.value);
                                                return R.readInt(1) !== 1 || k(this.fileName) !== R.readInt(4) ? null : q.utf8decode(R.readData(_.length - 5));
                                              }
                                              return null;
                                            }, findExtraFieldUnicodeComment: function() {
                                              var _ = this.extraFields[25461];
                                              if (_) {
                                                var R = A(_.value);
                                                return R.readInt(1) !== 1 || k(this.fileComment) !== R.readInt(4) ? null : q.utf8decode(R.readData(_.length - 5));
                                              }
                                              return null;
                                            } }, yt.exports = Q;
                                          }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(N, yt, V) {
                                            function A(R, B, g) {
                                              this.name = R, this.dir = g.dir, this.date = g.date, this.comment = g.comment, this.unixPermissions = g.unixPermissions, this.dosPermissions = g.dosPermissions, this._data = B, this._dataBinary = g.binary, this.options = { compression: g.compression, compressionOptions: g.compressionOptions };
                                            }
                                            var S = N("./stream/StreamHelper"), y = N("./stream/DataWorker"), k = N("./utf8"), q = N("./compressedObject"), Y = N("./stream/GenericWorker");
                                            A.prototype = { internalStream: function(R) {
                                              var B = null, g = "string";
                                              try {
                                                if (!R)
                                                  throw new Error("No output type specified.");
                                                var C = (g = R.toLowerCase()) === "string" || g === "text";
                                                g !== "binarystring" && g !== "text" || (g = "string"), B = this._decompressWorker();
                                                var T = !this._dataBinary;
                                                T && !C && (B = B.pipe(new k.Utf8EncodeWorker())), !T && C && (B = B.pipe(new k.Utf8DecodeWorker()));
                                              } catch (at) {
                                                (B = new Y("error")).error(at);
                                              }
                                              return new S(B, g, "");
                                            }, async: function(R, B) {
                                              return this.internalStream(R).accumulate(B);
                                            }, nodeStream: function(R, B) {
                                              return this.internalStream(R || "nodebuffer").toNodejsStream(B);
                                            }, _compressWorker: function(R, B) {
                                              if (this._data instanceof q && this._data.compression.magic === R.magic)
                                                return this._data.getCompressedWorker();
                                              var g = this._decompressWorker();
                                              return this._dataBinary || (g = g.pipe(new k.Utf8EncodeWorker())), q.createWorkerFrom(g, R, B);
                                            }, _decompressWorker: function() {
                                              return this._data instanceof q ? this._data.getContentWorker() : this._data instanceof Y ? this._data : new y(this._data);
                                            } };
                                            for (var X = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], Q = function() {
                                              throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                            }, _ = 0; _ < X.length; _++)
                                              A.prototype[X[_]] = Q;
                                            yt.exports = A;
                                          }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(N, yt, V) {
                                            (function(A) {
                                              var S, y, k = A.MutationObserver || A.WebKitMutationObserver;
                                              if (k) {
                                                var q = 0, Y = new k(R), X = A.document.createTextNode("");
                                                Y.observe(X, { characterData: !0 }), S = function() {
                                                  X.data = q = ++q % 2;
                                                };
                                              } else if (A.setImmediate || A.MessageChannel === void 0)
                                                S = "document" in A && "onreadystatechange" in A.document.createElement("script") ? function() {
                                                  var B = A.document.createElement("script");
                                                  B.onreadystatechange = function() {
                                                    R(), B.onreadystatechange = null, B.parentNode.removeChild(B), B = null;
                                                  }, A.document.documentElement.appendChild(B);
                                                } : function() {
                                                  setTimeout(R, 0);
                                                };
                                              else {
                                                var Q = new A.MessageChannel();
                                                Q.port1.onmessage = R, S = function() {
                                                  Q.port2.postMessage(0);
                                                };
                                              }
                                              var _ = [];
                                              function R() {
                                                var B, g;
                                                y = !0;
                                                for (var C = _.length; C; ) {
                                                  for (g = _, _ = [], B = -1; ++B < C; )
                                                    g[B]();
                                                  C = _.length;
                                                }
                                                y = !1;
                                              }
                                              yt.exports = function(B) {
                                                _.push(B) !== 1 || y || S();
                                              };
                                            }).call(this, qt !== void 0 ? qt : typeof self < "u" ? self : typeof window < "u" ? window : {});
                                          }, {}], 37: [function(N, yt, V) {
                                            var A = N("immediate");
                                            function S() {
                                            }
                                            var y = {}, k = ["REJECTED"], q = ["FULFILLED"], Y = ["PENDING"];
                                            function X(C) {
                                              if (typeof C != "function")
                                                throw new TypeError("resolver must be a function");
                                              this.state = Y, this.queue = [], this.outcome = void 0, C !== S && B(this, C);
                                            }
                                            function Q(C, T, at) {
                                              this.promise = C, typeof T == "function" && (this.onFulfilled = T, this.callFulfilled = this.otherCallFulfilled), typeof at == "function" && (this.onRejected = at, this.callRejected = this.otherCallRejected);
                                            }
                                            function _(C, T, at) {
                                              A(function() {
                                                var ut;
                                                try {
                                                  ut = T(at);
                                                } catch (et) {
                                                  return y.reject(C, et);
                                                }
                                                ut === C ? y.reject(C, new TypeError("Cannot resolve promise with itself")) : y.resolve(C, ut);
                                              });
                                            }
                                            function R(C) {
                                              var T = C && C.then;
                                              if (C && (typeof C == "object" || typeof C == "function") && typeof T == "function")
                                                return function() {
                                                  T.apply(C, arguments);
                                                };
                                            }
                                            function B(C, T) {
                                              var at = !1;
                                              function ut(At) {
                                                at || (at = !0, y.reject(C, At));
                                              }
                                              function et(At) {
                                                at || (at = !0, y.resolve(C, At));
                                              }
                                              var Ft = g(function() {
                                                T(et, ut);
                                              });
                                              Ft.status === "error" && ut(Ft.value);
                                            }
                                            function g(C, T) {
                                              var at = {};
                                              try {
                                                at.value = C(T), at.status = "success";
                                              } catch (ut) {
                                                at.status = "error", at.value = ut;
                                              }
                                              return at;
                                            }
                                            (yt.exports = X).prototype.finally = function(C) {
                                              if (typeof C != "function")
                                                return this;
                                              var T = this.constructor;
                                              return this.then(function(at) {
                                                return T.resolve(C()).then(function() {
                                                  return at;
                                                });
                                              }, function(at) {
                                                return T.resolve(C()).then(function() {
                                                  throw at;
                                                });
                                              });
                                            }, X.prototype.catch = function(C) {
                                              return this.then(null, C);
                                            }, X.prototype.then = function(C, T) {
                                              if (typeof C != "function" && this.state === q || typeof T != "function" && this.state === k)
                                                return this;
                                              var at = new this.constructor(S);
                                              return this.state !== Y ? _(at, this.state === q ? C : T, this.outcome) : this.queue.push(new Q(at, C, T)), at;
                                            }, Q.prototype.callFulfilled = function(C) {
                                              y.resolve(this.promise, C);
                                            }, Q.prototype.otherCallFulfilled = function(C) {
                                              _(this.promise, this.onFulfilled, C);
                                            }, Q.prototype.callRejected = function(C) {
                                              y.reject(this.promise, C);
                                            }, Q.prototype.otherCallRejected = function(C) {
                                              _(this.promise, this.onRejected, C);
                                            }, y.resolve = function(C, T) {
                                              var at = g(R, T);
                                              if (at.status === "error")
                                                return y.reject(C, at.value);
                                              var ut = at.value;
                                              if (ut)
                                                B(C, ut);
                                              else {
                                                C.state = q, C.outcome = T;
                                                for (var et = -1, Ft = C.queue.length; ++et < Ft; )
                                                  C.queue[et].callFulfilled(T);
                                              }
                                              return C;
                                            }, y.reject = function(C, T) {
                                              C.state = k, C.outcome = T;
                                              for (var at = -1, ut = C.queue.length; ++at < ut; )
                                                C.queue[at].callRejected(T);
                                              return C;
                                            }, X.resolve = function(C) {
                                              return C instanceof this ? C : y.resolve(new this(S), C);
                                            }, X.reject = function(C) {
                                              var T = new this(S);
                                              return y.reject(T, C);
                                            }, X.all = function(C) {
                                              var T = this;
                                              if (Object.prototype.toString.call(C) !== "[object Array]")
                                                return this.reject(new TypeError("must be an array"));
                                              var at = C.length, ut = !1;
                                              if (!at)
                                                return this.resolve([]);
                                              for (var et = new Array(at), Ft = 0, At = -1, Bt = new this(S); ++At < at; )
                                                gt(C[At], At);
                                              return Bt;
                                              function gt(zt, Gt) {
                                                T.resolve(zt).then(function(U) {
                                                  et[Gt] = U, ++Ft !== at || ut || (ut = !0, y.resolve(Bt, et));
                                                }, function(U) {
                                                  ut || (ut = !0, y.reject(Bt, U));
                                                });
                                              }
                                            }, X.race = function(C) {
                                              if (Object.prototype.toString.call(C) !== "[object Array]")
                                                return this.reject(new TypeError("must be an array"));
                                              var T = C.length, at = !1;
                                              if (!T)
                                                return this.resolve([]);
                                              for (var ut, et = -1, Ft = new this(S); ++et < T; )
                                                ut = C[et], this.resolve(ut).then(function(At) {
                                                  at || (at = !0, y.resolve(Ft, At));
                                                }, function(At) {
                                                  at || (at = !0, y.reject(Ft, At));
                                                });
                                              return Ft;
                                            };
                                          }, { immediate: 36 }], 38: [function(N, yt, V) {
                                            var A = {};
                                            (0, N("./lib/utils/common").assign)(A, N("./lib/deflate"), N("./lib/inflate"), N("./lib/zlib/constants")), yt.exports = A;
                                          }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(N, yt, V) {
                                            var A = N("./zlib/deflate"), S = N("./utils/common"), y = N("./utils/strings"), k = N("./zlib/messages"), q = N("./zlib/zstream"), Y = Object.prototype.toString, X = 0, Q = -1, _ = 0, R = 8;
                                            function B(C) {
                                              if (!(this instanceof B))
                                                return new B(C);
                                              this.options = S.assign({ level: Q, method: R, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: _, to: "" }, C || {});
                                              var T = this.options;
                                              T.raw && 0 < T.windowBits ? T.windowBits = -T.windowBits : T.gzip && 0 < T.windowBits && T.windowBits < 16 && (T.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new q(), this.strm.avail_out = 0;
                                              var at = A.deflateInit2(this.strm, T.level, T.method, T.windowBits, T.memLevel, T.strategy);
                                              if (at !== X)
                                                throw new Error(k[at]);
                                              if (T.header && A.deflateSetHeader(this.strm, T.header), T.dictionary) {
                                                var ut;
                                                if (ut = typeof T.dictionary == "string" ? y.string2buf(T.dictionary) : Y.call(T.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(T.dictionary) : T.dictionary, (at = A.deflateSetDictionary(this.strm, ut)) !== X)
                                                  throw new Error(k[at]);
                                                this._dict_set = !0;
                                              }
                                            }
                                            function g(C, T) {
                                              var at = new B(T);
                                              if (at.push(C, !0), at.err)
                                                throw at.msg || k[at.err];
                                              return at.result;
                                            }
                                            B.prototype.push = function(C, T) {
                                              var at, ut, et = this.strm, Ft = this.options.chunkSize;
                                              if (this.ended)
                                                return !1;
                                              ut = T === ~~T ? T : T === !0 ? 4 : 0, typeof C == "string" ? et.input = y.string2buf(C) : Y.call(C) === "[object ArrayBuffer]" ? et.input = new Uint8Array(C) : et.input = C, et.next_in = 0, et.avail_in = et.input.length;
                                              do {
                                                if (et.avail_out === 0 && (et.output = new S.Buf8(Ft), et.next_out = 0, et.avail_out = Ft), (at = A.deflate(et, ut)) !== 1 && at !== X)
                                                  return this.onEnd(at), !(this.ended = !0);
                                                et.avail_out !== 0 && (et.avail_in !== 0 || ut !== 4 && ut !== 2) || (this.options.to === "string" ? this.onData(y.buf2binstring(S.shrinkBuf(et.output, et.next_out))) : this.onData(S.shrinkBuf(et.output, et.next_out)));
                                              } while ((0 < et.avail_in || et.avail_out === 0) && at !== 1);
                                              return ut === 4 ? (at = A.deflateEnd(this.strm), this.onEnd(at), this.ended = !0, at === X) : ut !== 2 || (this.onEnd(X), !(et.avail_out = 0));
                                            }, B.prototype.onData = function(C) {
                                              this.chunks.push(C);
                                            }, B.prototype.onEnd = function(C) {
                                              C === X && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = S.flattenChunks(this.chunks)), this.chunks = [], this.err = C, this.msg = this.strm.msg;
                                            }, V.Deflate = B, V.deflate = g, V.deflateRaw = function(C, T) {
                                              return (T = T || {}).raw = !0, g(C, T);
                                            }, V.gzip = function(C, T) {
                                              return (T = T || {}).gzip = !0, g(C, T);
                                            };
                                          }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(N, yt, V) {
                                            var A = N("./zlib/inflate"), S = N("./utils/common"), y = N("./utils/strings"), k = N("./zlib/constants"), q = N("./zlib/messages"), Y = N("./zlib/zstream"), X = N("./zlib/gzheader"), Q = Object.prototype.toString;
                                            function _(B) {
                                              if (!(this instanceof _))
                                                return new _(B);
                                              this.options = S.assign({ chunkSize: 16384, windowBits: 0, to: "" }, B || {});
                                              var g = this.options;
                                              g.raw && 0 <= g.windowBits && g.windowBits < 16 && (g.windowBits = -g.windowBits, g.windowBits === 0 && (g.windowBits = -15)), !(0 <= g.windowBits && g.windowBits < 16) || B && B.windowBits || (g.windowBits += 32), 15 < g.windowBits && g.windowBits < 48 && !(15 & g.windowBits) && (g.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Y(), this.strm.avail_out = 0;
                                              var C = A.inflateInit2(this.strm, g.windowBits);
                                              if (C !== k.Z_OK)
                                                throw new Error(q[C]);
                                              this.header = new X(), A.inflateGetHeader(this.strm, this.header);
                                            }
                                            function R(B, g) {
                                              var C = new _(g);
                                              if (C.push(B, !0), C.err)
                                                throw C.msg || q[C.err];
                                              return C.result;
                                            }
                                            _.prototype.push = function(B, g) {
                                              var C, T, at, ut, et, Ft, At = this.strm, Bt = this.options.chunkSize, gt = this.options.dictionary, zt = !1;
                                              if (this.ended)
                                                return !1;
                                              T = g === ~~g ? g : g === !0 ? k.Z_FINISH : k.Z_NO_FLUSH, typeof B == "string" ? At.input = y.binstring2buf(B) : Q.call(B) === "[object ArrayBuffer]" ? At.input = new Uint8Array(B) : At.input = B, At.next_in = 0, At.avail_in = At.input.length;
                                              do {
                                                if (At.avail_out === 0 && (At.output = new S.Buf8(Bt), At.next_out = 0, At.avail_out = Bt), (C = A.inflate(At, k.Z_NO_FLUSH)) === k.Z_NEED_DICT && gt && (Ft = typeof gt == "string" ? y.string2buf(gt) : Q.call(gt) === "[object ArrayBuffer]" ? new Uint8Array(gt) : gt, C = A.inflateSetDictionary(this.strm, Ft)), C === k.Z_BUF_ERROR && zt === !0 && (C = k.Z_OK, zt = !1), C !== k.Z_STREAM_END && C !== k.Z_OK)
                                                  return this.onEnd(C), !(this.ended = !0);
                                                At.next_out && (At.avail_out !== 0 && C !== k.Z_STREAM_END && (At.avail_in !== 0 || T !== k.Z_FINISH && T !== k.Z_SYNC_FLUSH) || (this.options.to === "string" ? (at = y.utf8border(At.output, At.next_out), ut = At.next_out - at, et = y.buf2string(At.output, at), At.next_out = ut, At.avail_out = Bt - ut, ut && S.arraySet(At.output, At.output, at, ut, 0), this.onData(et)) : this.onData(S.shrinkBuf(At.output, At.next_out)))), At.avail_in === 0 && At.avail_out === 0 && (zt = !0);
                                              } while ((0 < At.avail_in || At.avail_out === 0) && C !== k.Z_STREAM_END);
                                              return C === k.Z_STREAM_END && (T = k.Z_FINISH), T === k.Z_FINISH ? (C = A.inflateEnd(this.strm), this.onEnd(C), this.ended = !0, C === k.Z_OK) : T !== k.Z_SYNC_FLUSH || (this.onEnd(k.Z_OK), !(At.avail_out = 0));
                                            }, _.prototype.onData = function(B) {
                                              this.chunks.push(B);
                                            }, _.prototype.onEnd = function(B) {
                                              B === k.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = S.flattenChunks(this.chunks)), this.chunks = [], this.err = B, this.msg = this.strm.msg;
                                            }, V.Inflate = _, V.inflate = R, V.inflateRaw = function(B, g) {
                                              return (g = g || {}).raw = !0, R(B, g);
                                            }, V.ungzip = R;
                                          }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(N, yt, V) {
                                            var A = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
                                            V.assign = function(k) {
                                              for (var q = Array.prototype.slice.call(arguments, 1); q.length; ) {
                                                var Y = q.shift();
                                                if (Y) {
                                                  if (typeof Y != "object")
                                                    throw new TypeError(Y + "must be non-object");
                                                  for (var X in Y)
                                                    Y.hasOwnProperty(X) && (k[X] = Y[X]);
                                                }
                                              }
                                              return k;
                                            }, V.shrinkBuf = function(k, q) {
                                              return k.length === q ? k : k.subarray ? k.subarray(0, q) : (k.length = q, k);
                                            };
                                            var S = { arraySet: function(k, q, Y, X, Q) {
                                              if (q.subarray && k.subarray)
                                                k.set(q.subarray(Y, Y + X), Q);
                                              else
                                                for (var _ = 0; _ < X; _++)
                                                  k[Q + _] = q[Y + _];
                                            }, flattenChunks: function(k) {
                                              var q, Y, X, Q, _, R;
                                              for (q = X = 0, Y = k.length; q < Y; q++)
                                                X += k[q].length;
                                              for (R = new Uint8Array(X), q = Q = 0, Y = k.length; q < Y; q++)
                                                _ = k[q], R.set(_, Q), Q += _.length;
                                              return R;
                                            } }, y = { arraySet: function(k, q, Y, X, Q) {
                                              for (var _ = 0; _ < X; _++)
                                                k[Q + _] = q[Y + _];
                                            }, flattenChunks: function(k) {
                                              return [].concat.apply([], k);
                                            } };
                                            V.setTyped = function(k) {
                                              k ? (V.Buf8 = Uint8Array, V.Buf16 = Uint16Array, V.Buf32 = Int32Array, V.assign(V, S)) : (V.Buf8 = Array, V.Buf16 = Array, V.Buf32 = Array, V.assign(V, y));
                                            }, V.setTyped(A);
                                          }, {}], 42: [function(N, yt, V) {
                                            var A = N("./common"), S = !0, y = !0;
                                            try {
                                              String.fromCharCode.apply(null, [0]);
                                            } catch {
                                              S = !1;
                                            }
                                            try {
                                              String.fromCharCode.apply(null, new Uint8Array(1));
                                            } catch {
                                              y = !1;
                                            }
                                            for (var k = new A.Buf8(256), q = 0; q < 256; q++)
                                              k[q] = 252 <= q ? 6 : 248 <= q ? 5 : 240 <= q ? 4 : 224 <= q ? 3 : 192 <= q ? 2 : 1;
                                            function Y(X, Q) {
                                              if (Q < 65537 && (X.subarray && y || !X.subarray && S))
                                                return String.fromCharCode.apply(null, A.shrinkBuf(X, Q));
                                              for (var _ = "", R = 0; R < Q; R++)
                                                _ += String.fromCharCode(X[R]);
                                              return _;
                                            }
                                            k[254] = k[254] = 1, V.string2buf = function(X) {
                                              var Q, _, R, B, g, C = X.length, T = 0;
                                              for (B = 0; B < C; B++)
                                                (64512 & (_ = X.charCodeAt(B))) == 55296 && B + 1 < C && (64512 & (R = X.charCodeAt(B + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (R - 56320), B++), T += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
                                              for (Q = new A.Buf8(T), B = g = 0; g < T; B++)
                                                (64512 & (_ = X.charCodeAt(B))) == 55296 && B + 1 < C && (64512 & (R = X.charCodeAt(B + 1))) == 56320 && (_ = 65536 + (_ - 55296 << 10) + (R - 56320), B++), _ < 128 ? Q[g++] = _ : (_ < 2048 ? Q[g++] = 192 | _ >>> 6 : (_ < 65536 ? Q[g++] = 224 | _ >>> 12 : (Q[g++] = 240 | _ >>> 18, Q[g++] = 128 | _ >>> 12 & 63), Q[g++] = 128 | _ >>> 6 & 63), Q[g++] = 128 | 63 & _);
                                              return Q;
                                            }, V.buf2binstring = function(X) {
                                              return Y(X, X.length);
                                            }, V.binstring2buf = function(X) {
                                              for (var Q = new A.Buf8(X.length), _ = 0, R = Q.length; _ < R; _++)
                                                Q[_] = X.charCodeAt(_);
                                              return Q;
                                            }, V.buf2string = function(X, Q) {
                                              var _, R, B, g, C = Q || X.length, T = new Array(2 * C);
                                              for (_ = R = 0; _ < C; )
                                                if ((B = X[_++]) < 128)
                                                  T[R++] = B;
                                                else if (4 < (g = k[B]))
                                                  T[R++] = 65533, _ += g - 1;
                                                else {
                                                  for (B &= g === 2 ? 31 : g === 3 ? 15 : 7; 1 < g && _ < C; )
                                                    B = B << 6 | 63 & X[_++], g--;
                                                  1 < g ? T[R++] = 65533 : B < 65536 ? T[R++] = B : (B -= 65536, T[R++] = 55296 | B >> 10 & 1023, T[R++] = 56320 | 1023 & B);
                                                }
                                              return Y(T, R);
                                            }, V.utf8border = function(X, Q) {
                                              var _;
                                              for ((Q = Q || X.length) > X.length && (Q = X.length), _ = Q - 1; 0 <= _ && (192 & X[_]) == 128; )
                                                _--;
                                              return _ < 0 || _ === 0 ? Q : _ + k[X[_]] > Q ? _ : Q;
                                            };
                                          }, { "./common": 41 }], 43: [function(N, yt, V) {
                                            yt.exports = function(A, S, y, k) {
                                              for (var q = 65535 & A | 0, Y = A >>> 16 & 65535 | 0, X = 0; y !== 0; ) {
                                                for (y -= X = 2e3 < y ? 2e3 : y; Y = Y + (q = q + S[k++] | 0) | 0, --X; )
                                                  ;
                                                q %= 65521, Y %= 65521;
                                              }
                                              return q | Y << 16 | 0;
                                            };
                                          }, {}], 44: [function(N, yt, V) {
                                            yt.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
                                          }, {}], 45: [function(N, yt, V) {
                                            var A = function() {
                                              for (var S, y = [], k = 0; k < 256; k++) {
                                                S = k;
                                                for (var q = 0; q < 8; q++)
                                                  S = 1 & S ? 3988292384 ^ S >>> 1 : S >>> 1;
                                                y[k] = S;
                                              }
                                              return y;
                                            }();
                                            yt.exports = function(S, y, k, q) {
                                              var Y = A, X = q + k;
                                              S ^= -1;
                                              for (var Q = q; Q < X; Q++)
                                                S = S >>> 8 ^ Y[255 & (S ^ y[Q])];
                                              return -1 ^ S;
                                            };
                                          }, {}], 46: [function(N, yt, V) {
                                            var A, S = N("../utils/common"), y = N("./trees"), k = N("./adler32"), q = N("./crc32"), Y = N("./messages"), X = 0, Q = 0, _ = -2, R = 2, B = 8, g = 286, C = 30, T = 19, at = 2 * g + 1, ut = 15, et = 3, Ft = 258, At = Ft + et + 1, Bt = 42, gt = 113;
                                            function zt(h, it) {
                                              return h.msg = Y[it], it;
                                            }
                                            function Gt(h) {
                                              return (h << 1) - (4 < h ? 9 : 0);
                                            }
                                            function U(h) {
                                              for (var it = h.length; 0 <= --it; )
                                                h[it] = 0;
                                            }
                                            function _t(h) {
                                              var it = h.state, z = it.pending;
                                              z > h.avail_out && (z = h.avail_out), z !== 0 && (S.arraySet(h.output, it.pending_buf, it.pending_out, z, h.next_out), h.next_out += z, it.pending_out += z, h.total_out += z, h.avail_out -= z, it.pending -= z, it.pending === 0 && (it.pending_out = 0));
                                            }
                                            function n(h, it) {
                                              y._tr_flush_block(h, 0 <= h.block_start ? h.block_start : -1, h.strstart - h.block_start, it), h.block_start = h.strstart, _t(h.strm);
                                            }
                                            function r(h, it) {
                                              h.pending_buf[h.pending++] = it;
                                            }
                                            function a(h, it) {
                                              h.pending_buf[h.pending++] = it >>> 8 & 255, h.pending_buf[h.pending++] = 255 & it;
                                            }
                                            function s(h, it) {
                                              var z, x, It = h.max_chain_length, Mt = h.strstart, Nt = h.prev_length, Rt = h.nice_match, Ct = h.strstart > h.w_size - At ? h.strstart - (h.w_size - At) : 0, Lt = h.window, $t = h.w_mask, jt = h.prev, Jt = h.strstart + Ft, Wt = Lt[Mt + Nt - 1], Dt = Lt[Mt + Nt];
                                              h.prev_length >= h.good_match && (It >>= 2), Rt > h.lookahead && (Rt = h.lookahead);
                                              do
                                                if (Lt[(z = it) + Nt] === Dt && Lt[z + Nt - 1] === Wt && Lt[z] === Lt[Mt] && Lt[++z] === Lt[Mt + 1]) {
                                                  Mt += 2, z++;
                                                  do
                                                    ;
                                                  while (Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Lt[++Mt] === Lt[++z] && Mt < Jt);
                                                  if (x = Ft - (Jt - Mt), Mt = Jt - Ft, Nt < x) {
                                                    if (h.match_start = it, Rt <= (Nt = x))
                                                      break;
                                                    Wt = Lt[Mt + Nt - 1], Dt = Lt[Mt + Nt];
                                                  }
                                                }
                                              while ((it = jt[it & $t]) > Ct && --It != 0);
                                              return Nt <= h.lookahead ? Nt : h.lookahead;
                                            }
                                            function p(h) {
                                              var it, z, x, It, Mt, Nt, Rt, Ct, Lt, $t, jt = h.w_size;
                                              do {
                                                if (It = h.window_size - h.lookahead - h.strstart, h.strstart >= jt + (jt - At)) {
                                                  for (S.arraySet(h.window, h.window, jt, jt, 0), h.match_start -= jt, h.strstart -= jt, h.block_start -= jt, it = z = h.hash_size; x = h.head[--it], h.head[it] = jt <= x ? x - jt : 0, --z; )
                                                    ;
                                                  for (it = z = jt; x = h.prev[--it], h.prev[it] = jt <= x ? x - jt : 0, --z; )
                                                    ;
                                                  It += jt;
                                                }
                                                if (h.strm.avail_in === 0)
                                                  break;
                                                if (Nt = h.strm, Rt = h.window, Ct = h.strstart + h.lookahead, $t = void 0, (Lt = It) < ($t = Nt.avail_in) && ($t = Lt), z = $t === 0 ? 0 : (Nt.avail_in -= $t, S.arraySet(Rt, Nt.input, Nt.next_in, $t, Ct), Nt.state.wrap === 1 ? Nt.adler = k(Nt.adler, Rt, $t, Ct) : Nt.state.wrap === 2 && (Nt.adler = q(Nt.adler, Rt, $t, Ct)), Nt.next_in += $t, Nt.total_in += $t, $t), h.lookahead += z, h.lookahead + h.insert >= et)
                                                  for (Mt = h.strstart - h.insert, h.ins_h = h.window[Mt], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[Mt + 1]) & h.hash_mask; h.insert && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[Mt + et - 1]) & h.hash_mask, h.prev[Mt & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = Mt, Mt++, h.insert--, !(h.lookahead + h.insert < et)); )
                                                    ;
                                              } while (h.lookahead < At && h.strm.avail_in !== 0);
                                            }
                                            function d(h, it) {
                                              for (var z, x; ; ) {
                                                if (h.lookahead < At) {
                                                  if (p(h), h.lookahead < At && it === X)
                                                    return 1;
                                                  if (h.lookahead === 0)
                                                    break;
                                                }
                                                if (z = 0, h.lookahead >= et && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + et - 1]) & h.hash_mask, z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), z !== 0 && h.strstart - z <= h.w_size - At && (h.match_length = s(h, z)), h.match_length >= et)
                                                  if (x = y._tr_tally(h, h.strstart - h.match_start, h.match_length - et), h.lookahead -= h.match_length, h.match_length <= h.max_lazy_match && h.lookahead >= et) {
                                                    for (h.match_length--; h.strstart++, h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + et - 1]) & h.hash_mask, z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart, --h.match_length != 0; )
                                                      ;
                                                    h.strstart++;
                                                  } else
                                                    h.strstart += h.match_length, h.match_length = 0, h.ins_h = h.window[h.strstart], h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + 1]) & h.hash_mask;
                                                else
                                                  x = y._tr_tally(h, 0, h.window[h.strstart]), h.lookahead--, h.strstart++;
                                                if (x && (n(h, !1), h.strm.avail_out === 0))
                                                  return 1;
                                              }
                                              return h.insert = h.strstart < et - 1 ? h.strstart : et - 1, it === 4 ? (n(h, !0), h.strm.avail_out === 0 ? 3 : 4) : h.last_lit && (n(h, !1), h.strm.avail_out === 0) ? 1 : 2;
                                            }
                                            function F(h, it) {
                                              for (var z, x, It; ; ) {
                                                if (h.lookahead < At) {
                                                  if (p(h), h.lookahead < At && it === X)
                                                    return 1;
                                                  if (h.lookahead === 0)
                                                    break;
                                                }
                                                if (z = 0, h.lookahead >= et && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + et - 1]) & h.hash_mask, z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), h.prev_length = h.match_length, h.prev_match = h.match_start, h.match_length = et - 1, z !== 0 && h.prev_length < h.max_lazy_match && h.strstart - z <= h.w_size - At && (h.match_length = s(h, z), h.match_length <= 5 && (h.strategy === 1 || h.match_length === et && 4096 < h.strstart - h.match_start) && (h.match_length = et - 1)), h.prev_length >= et && h.match_length <= h.prev_length) {
                                                  for (It = h.strstart + h.lookahead - et, x = y._tr_tally(h, h.strstart - 1 - h.prev_match, h.prev_length - et), h.lookahead -= h.prev_length - 1, h.prev_length -= 2; ++h.strstart <= It && (h.ins_h = (h.ins_h << h.hash_shift ^ h.window[h.strstart + et - 1]) & h.hash_mask, z = h.prev[h.strstart & h.w_mask] = h.head[h.ins_h], h.head[h.ins_h] = h.strstart), --h.prev_length != 0; )
                                                    ;
                                                  if (h.match_available = 0, h.match_length = et - 1, h.strstart++, x && (n(h, !1), h.strm.avail_out === 0))
                                                    return 1;
                                                } else if (h.match_available) {
                                                  if ((x = y._tr_tally(h, 0, h.window[h.strstart - 1])) && n(h, !1), h.strstart++, h.lookahead--, h.strm.avail_out === 0)
                                                    return 1;
                                                } else
                                                  h.match_available = 1, h.strstart++, h.lookahead--;
                                              }
                                              return h.match_available && (x = y._tr_tally(h, 0, h.window[h.strstart - 1]), h.match_available = 0), h.insert = h.strstart < et - 1 ? h.strstart : et - 1, it === 4 ? (n(h, !0), h.strm.avail_out === 0 ? 3 : 4) : h.last_lit && (n(h, !1), h.strm.avail_out === 0) ? 1 : 2;
                                            }
                                            function v(h, it, z, x, It) {
                                              this.good_length = h, this.max_lazy = it, this.nice_length = z, this.max_chain = x, this.func = It;
                                            }
                                            function G() {
                                              this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = B, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new S.Buf16(2 * at), this.dyn_dtree = new S.Buf16(2 * (2 * C + 1)), this.bl_tree = new S.Buf16(2 * (2 * T + 1)), U(this.dyn_ltree), U(this.dyn_dtree), U(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new S.Buf16(ut + 1), this.heap = new S.Buf16(2 * g + 1), U(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new S.Buf16(2 * g + 1), U(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
                                            }
                                            function wt(h) {
                                              var it;
                                              return h && h.state ? (h.total_in = h.total_out = 0, h.data_type = R, (it = h.state).pending = 0, it.pending_out = 0, it.wrap < 0 && (it.wrap = -it.wrap), it.status = it.wrap ? Bt : gt, h.adler = it.wrap === 2 ? 0 : 1, it.last_flush = X, y._tr_init(it), Q) : zt(h, _);
                                            }
                                            function E(h) {
                                              var it, z = wt(h);
                                              return z === Q && ((it = h.state).window_size = 2 * it.w_size, U(it.head), it.max_lazy_match = A[it.level].max_lazy, it.good_match = A[it.level].good_length, it.nice_match = A[it.level].nice_length, it.max_chain_length = A[it.level].max_chain, it.strstart = 0, it.block_start = 0, it.lookahead = 0, it.insert = 0, it.match_length = it.prev_length = et - 1, it.match_available = 0, it.ins_h = 0), z;
                                            }
                                            function D(h, it, z, x, It, Mt) {
                                              if (!h)
                                                return _;
                                              var Nt = 1;
                                              if (it === -1 && (it = 6), x < 0 ? (Nt = 0, x = -x) : 15 < x && (Nt = 2, x -= 16), It < 1 || 9 < It || z !== B || x < 8 || 15 < x || it < 0 || 9 < it || Mt < 0 || 4 < Mt)
                                                return zt(h, _);
                                              x === 8 && (x = 9);
                                              var Rt = new G();
                                              return (h.state = Rt).strm = h, Rt.wrap = Nt, Rt.gzhead = null, Rt.w_bits = x, Rt.w_size = 1 << Rt.w_bits, Rt.w_mask = Rt.w_size - 1, Rt.hash_bits = It + 7, Rt.hash_size = 1 << Rt.hash_bits, Rt.hash_mask = Rt.hash_size - 1, Rt.hash_shift = ~~((Rt.hash_bits + et - 1) / et), Rt.window = new S.Buf8(2 * Rt.w_size), Rt.head = new S.Buf16(Rt.hash_size), Rt.prev = new S.Buf16(Rt.w_size), Rt.lit_bufsize = 1 << It + 6, Rt.pending_buf_size = 4 * Rt.lit_bufsize, Rt.pending_buf = new S.Buf8(Rt.pending_buf_size), Rt.d_buf = 1 * Rt.lit_bufsize, Rt.l_buf = 3 * Rt.lit_bufsize, Rt.level = it, Rt.strategy = Mt, Rt.method = z, E(h);
                                            }
                                            A = [new v(0, 0, 0, 0, function(h, it) {
                                              var z = 65535;
                                              for (z > h.pending_buf_size - 5 && (z = h.pending_buf_size - 5); ; ) {
                                                if (h.lookahead <= 1) {
                                                  if (p(h), h.lookahead === 0 && it === X)
                                                    return 1;
                                                  if (h.lookahead === 0)
                                                    break;
                                                }
                                                h.strstart += h.lookahead, h.lookahead = 0;
                                                var x = h.block_start + z;
                                                if ((h.strstart === 0 || h.strstart >= x) && (h.lookahead = h.strstart - x, h.strstart = x, n(h, !1), h.strm.avail_out === 0) || h.strstart - h.block_start >= h.w_size - At && (n(h, !1), h.strm.avail_out === 0))
                                                  return 1;
                                              }
                                              return h.insert = 0, it === 4 ? (n(h, !0), h.strm.avail_out === 0 ? 3 : 4) : (h.strstart > h.block_start && (n(h, !1), h.strm.avail_out), 1);
                                            }), new v(4, 4, 8, 4, d), new v(4, 5, 16, 8, d), new v(4, 6, 32, 32, d), new v(4, 4, 16, 16, F), new v(8, 16, 32, 32, F), new v(8, 16, 128, 128, F), new v(8, 32, 128, 256, F), new v(32, 128, 258, 1024, F), new v(32, 258, 258, 4096, F)], V.deflateInit = function(h, it) {
                                              return D(h, it, B, 15, 8, 0);
                                            }, V.deflateInit2 = D, V.deflateReset = E, V.deflateResetKeep = wt, V.deflateSetHeader = function(h, it) {
                                              return h && h.state ? h.state.wrap !== 2 ? _ : (h.state.gzhead = it, Q) : _;
                                            }, V.deflate = function(h, it) {
                                              var z, x, It, Mt;
                                              if (!h || !h.state || 5 < it || it < 0)
                                                return h ? zt(h, _) : _;
                                              if (x = h.state, !h.output || !h.input && h.avail_in !== 0 || x.status === 666 && it !== 4)
                                                return zt(h, h.avail_out === 0 ? -5 : _);
                                              if (x.strm = h, z = x.last_flush, x.last_flush = it, x.status === Bt)
                                                if (x.wrap === 2)
                                                  h.adler = 0, r(x, 31), r(x, 139), r(x, 8), x.gzhead ? (r(x, (x.gzhead.text ? 1 : 0) + (x.gzhead.hcrc ? 2 : 0) + (x.gzhead.extra ? 4 : 0) + (x.gzhead.name ? 8 : 0) + (x.gzhead.comment ? 16 : 0)), r(x, 255 & x.gzhead.time), r(x, x.gzhead.time >> 8 & 255), r(x, x.gzhead.time >> 16 & 255), r(x, x.gzhead.time >> 24 & 255), r(x, x.level === 9 ? 2 : 2 <= x.strategy || x.level < 2 ? 4 : 0), r(x, 255 & x.gzhead.os), x.gzhead.extra && x.gzhead.extra.length && (r(x, 255 & x.gzhead.extra.length), r(x, x.gzhead.extra.length >> 8 & 255)), x.gzhead.hcrc && (h.adler = q(h.adler, x.pending_buf, x.pending, 0)), x.gzindex = 0, x.status = 69) : (r(x, 0), r(x, 0), r(x, 0), r(x, 0), r(x, 0), r(x, x.level === 9 ? 2 : 2 <= x.strategy || x.level < 2 ? 4 : 0), r(x, 3), x.status = gt);
                                                else {
                                                  var Nt = B + (x.w_bits - 8 << 4) << 8;
                                                  Nt |= (2 <= x.strategy || x.level < 2 ? 0 : x.level < 6 ? 1 : x.level === 6 ? 2 : 3) << 6, x.strstart !== 0 && (Nt |= 32), Nt += 31 - Nt % 31, x.status = gt, a(x, Nt), x.strstart !== 0 && (a(x, h.adler >>> 16), a(x, 65535 & h.adler)), h.adler = 1;
                                                }
                                              if (x.status === 69)
                                                if (x.gzhead.extra) {
                                                  for (It = x.pending; x.gzindex < (65535 & x.gzhead.extra.length) && (x.pending !== x.pending_buf_size || (x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), _t(h), It = x.pending, x.pending !== x.pending_buf_size)); )
                                                    r(x, 255 & x.gzhead.extra[x.gzindex]), x.gzindex++;
                                                  x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), x.gzindex === x.gzhead.extra.length && (x.gzindex = 0, x.status = 73);
                                                } else
                                                  x.status = 73;
                                              if (x.status === 73)
                                                if (x.gzhead.name) {
                                                  It = x.pending;
                                                  do {
                                                    if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), _t(h), It = x.pending, x.pending === x.pending_buf_size)) {
                                                      Mt = 1;
                                                      break;
                                                    }
                                                    Mt = x.gzindex < x.gzhead.name.length ? 255 & x.gzhead.name.charCodeAt(x.gzindex++) : 0, r(x, Mt);
                                                  } while (Mt !== 0);
                                                  x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), Mt === 0 && (x.gzindex = 0, x.status = 91);
                                                } else
                                                  x.status = 91;
                                              if (x.status === 91)
                                                if (x.gzhead.comment) {
                                                  It = x.pending;
                                                  do {
                                                    if (x.pending === x.pending_buf_size && (x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), _t(h), It = x.pending, x.pending === x.pending_buf_size)) {
                                                      Mt = 1;
                                                      break;
                                                    }
                                                    Mt = x.gzindex < x.gzhead.comment.length ? 255 & x.gzhead.comment.charCodeAt(x.gzindex++) : 0, r(x, Mt);
                                                  } while (Mt !== 0);
                                                  x.gzhead.hcrc && x.pending > It && (h.adler = q(h.adler, x.pending_buf, x.pending - It, It)), Mt === 0 && (x.status = 103);
                                                } else
                                                  x.status = 103;
                                              if (x.status === 103 && (x.gzhead.hcrc ? (x.pending + 2 > x.pending_buf_size && _t(h), x.pending + 2 <= x.pending_buf_size && (r(x, 255 & h.adler), r(x, h.adler >> 8 & 255), h.adler = 0, x.status = gt)) : x.status = gt), x.pending !== 0) {
                                                if (_t(h), h.avail_out === 0)
                                                  return x.last_flush = -1, Q;
                                              } else if (h.avail_in === 0 && Gt(it) <= Gt(z) && it !== 4)
                                                return zt(h, -5);
                                              if (x.status === 666 && h.avail_in !== 0)
                                                return zt(h, -5);
                                              if (h.avail_in !== 0 || x.lookahead !== 0 || it !== X && x.status !== 666) {
                                                var Rt = x.strategy === 2 ? function(Ct, Lt) {
                                                  for (var $t; ; ) {
                                                    if (Ct.lookahead === 0 && (p(Ct), Ct.lookahead === 0)) {
                                                      if (Lt === X)
                                                        return 1;
                                                      break;
                                                    }
                                                    if (Ct.match_length = 0, $t = y._tr_tally(Ct, 0, Ct.window[Ct.strstart]), Ct.lookahead--, Ct.strstart++, $t && (n(Ct, !1), Ct.strm.avail_out === 0))
                                                      return 1;
                                                  }
                                                  return Ct.insert = 0, Lt === 4 ? (n(Ct, !0), Ct.strm.avail_out === 0 ? 3 : 4) : Ct.last_lit && (n(Ct, !1), Ct.strm.avail_out === 0) ? 1 : 2;
                                                }(x, it) : x.strategy === 3 ? function(Ct, Lt) {
                                                  for (var $t, jt, Jt, Wt, Dt = Ct.window; ; ) {
                                                    if (Ct.lookahead <= Ft) {
                                                      if (p(Ct), Ct.lookahead <= Ft && Lt === X)
                                                        return 1;
                                                      if (Ct.lookahead === 0)
                                                        break;
                                                    }
                                                    if (Ct.match_length = 0, Ct.lookahead >= et && 0 < Ct.strstart && (jt = Dt[Jt = Ct.strstart - 1]) === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt]) {
                                                      Wt = Ct.strstart + Ft;
                                                      do
                                                        ;
                                                      while (jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && jt === Dt[++Jt] && Jt < Wt);
                                                      Ct.match_length = Ft - (Wt - Jt), Ct.match_length > Ct.lookahead && (Ct.match_length = Ct.lookahead);
                                                    }
                                                    if (Ct.match_length >= et ? ($t = y._tr_tally(Ct, 1, Ct.match_length - et), Ct.lookahead -= Ct.match_length, Ct.strstart += Ct.match_length, Ct.match_length = 0) : ($t = y._tr_tally(Ct, 0, Ct.window[Ct.strstart]), Ct.lookahead--, Ct.strstart++), $t && (n(Ct, !1), Ct.strm.avail_out === 0))
                                                      return 1;
                                                  }
                                                  return Ct.insert = 0, Lt === 4 ? (n(Ct, !0), Ct.strm.avail_out === 0 ? 3 : 4) : Ct.last_lit && (n(Ct, !1), Ct.strm.avail_out === 0) ? 1 : 2;
                                                }(x, it) : A[x.level].func(x, it);
                                                if (Rt !== 3 && Rt !== 4 || (x.status = 666), Rt === 1 || Rt === 3)
                                                  return h.avail_out === 0 && (x.last_flush = -1), Q;
                                                if (Rt === 2 && (it === 1 ? y._tr_align(x) : it !== 5 && (y._tr_stored_block(x, 0, 0, !1), it === 3 && (U(x.head), x.lookahead === 0 && (x.strstart = 0, x.block_start = 0, x.insert = 0))), _t(h), h.avail_out === 0))
                                                  return x.last_flush = -1, Q;
                                              }
                                              return it !== 4 ? Q : x.wrap <= 0 ? 1 : (x.wrap === 2 ? (r(x, 255 & h.adler), r(x, h.adler >> 8 & 255), r(x, h.adler >> 16 & 255), r(x, h.adler >> 24 & 255), r(x, 255 & h.total_in), r(x, h.total_in >> 8 & 255), r(x, h.total_in >> 16 & 255), r(x, h.total_in >> 24 & 255)) : (a(x, h.adler >>> 16), a(x, 65535 & h.adler)), _t(h), 0 < x.wrap && (x.wrap = -x.wrap), x.pending !== 0 ? Q : 1);
                                            }, V.deflateEnd = function(h) {
                                              var it;
                                              return h && h.state ? (it = h.state.status) !== Bt && it !== 69 && it !== 73 && it !== 91 && it !== 103 && it !== gt && it !== 666 ? zt(h, _) : (h.state = null, it === gt ? zt(h, -3) : Q) : _;
                                            }, V.deflateSetDictionary = function(h, it) {
                                              var z, x, It, Mt, Nt, Rt, Ct, Lt, $t = it.length;
                                              if (!h || !h.state || (Mt = (z = h.state).wrap) === 2 || Mt === 1 && z.status !== Bt || z.lookahead)
                                                return _;
                                              for (Mt === 1 && (h.adler = k(h.adler, it, $t, 0)), z.wrap = 0, $t >= z.w_size && (Mt === 0 && (U(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0), Lt = new S.Buf8(z.w_size), S.arraySet(Lt, it, $t - z.w_size, z.w_size, 0), it = Lt, $t = z.w_size), Nt = h.avail_in, Rt = h.next_in, Ct = h.input, h.avail_in = $t, h.next_in = 0, h.input = it, p(z); z.lookahead >= et; ) {
                                                for (x = z.strstart, It = z.lookahead - (et - 1); z.ins_h = (z.ins_h << z.hash_shift ^ z.window[x + et - 1]) & z.hash_mask, z.prev[x & z.w_mask] = z.head[z.ins_h], z.head[z.ins_h] = x, x++, --It; )
                                                  ;
                                                z.strstart = x, z.lookahead = et - 1, p(z);
                                              }
                                              return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = et - 1, z.match_available = 0, h.next_in = Rt, h.input = Ct, h.avail_in = Nt, z.wrap = Mt, Q;
                                            }, V.deflateInfo = "pako deflate (from Nodeca project)";
                                          }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(N, yt, V) {
                                            yt.exports = function() {
                                              this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
                                            };
                                          }, {}], 48: [function(N, yt, V) {
                                            yt.exports = function(A, S) {
                                              var y, k, q, Y, X, Q, _, R, B, g, C, T, at, ut, et, Ft, At, Bt, gt, zt, Gt, U, _t, n, r;
                                              y = A.state, k = A.next_in, n = A.input, q = k + (A.avail_in - 5), Y = A.next_out, r = A.output, X = Y - (S - A.avail_out), Q = Y + (A.avail_out - 257), _ = y.dmax, R = y.wsize, B = y.whave, g = y.wnext, C = y.window, T = y.hold, at = y.bits, ut = y.lencode, et = y.distcode, Ft = (1 << y.lenbits) - 1, At = (1 << y.distbits) - 1;
                                              t:
                                                do {
                                                  at < 15 && (T += n[k++] << at, at += 8, T += n[k++] << at, at += 8), Bt = ut[T & Ft];
                                                  e:
                                                    for (; ; ) {
                                                      if (T >>>= gt = Bt >>> 24, at -= gt, (gt = Bt >>> 16 & 255) == 0)
                                                        r[Y++] = 65535 & Bt;
                                                      else {
                                                        if (!(16 & gt)) {
                                                          if (!(64 & gt)) {
                                                            Bt = ut[(65535 & Bt) + (T & (1 << gt) - 1)];
                                                            continue e;
                                                          }
                                                          if (32 & gt) {
                                                            y.mode = 12;
                                                            break t;
                                                          }
                                                          A.msg = "invalid literal/length code", y.mode = 30;
                                                          break t;
                                                        }
                                                        zt = 65535 & Bt, (gt &= 15) && (at < gt && (T += n[k++] << at, at += 8), zt += T & (1 << gt) - 1, T >>>= gt, at -= gt), at < 15 && (T += n[k++] << at, at += 8, T += n[k++] << at, at += 8), Bt = et[T & At];
                                                        r:
                                                          for (; ; ) {
                                                            if (T >>>= gt = Bt >>> 24, at -= gt, !(16 & (gt = Bt >>> 16 & 255))) {
                                                              if (!(64 & gt)) {
                                                                Bt = et[(65535 & Bt) + (T & (1 << gt) - 1)];
                                                                continue r;
                                                              }
                                                              A.msg = "invalid distance code", y.mode = 30;
                                                              break t;
                                                            }
                                                            if (Gt = 65535 & Bt, at < (gt &= 15) && (T += n[k++] << at, (at += 8) < gt && (T += n[k++] << at, at += 8)), _ < (Gt += T & (1 << gt) - 1)) {
                                                              A.msg = "invalid distance too far back", y.mode = 30;
                                                              break t;
                                                            }
                                                            if (T >>>= gt, at -= gt, (gt = Y - X) < Gt) {
                                                              if (B < (gt = Gt - gt) && y.sane) {
                                                                A.msg = "invalid distance too far back", y.mode = 30;
                                                                break t;
                                                              }
                                                              if (_t = C, (U = 0) === g) {
                                                                if (U += R - gt, gt < zt) {
                                                                  for (zt -= gt; r[Y++] = C[U++], --gt; )
                                                                    ;
                                                                  U = Y - Gt, _t = r;
                                                                }
                                                              } else if (g < gt) {
                                                                if (U += R + g - gt, (gt -= g) < zt) {
                                                                  for (zt -= gt; r[Y++] = C[U++], --gt; )
                                                                    ;
                                                                  if (U = 0, g < zt) {
                                                                    for (zt -= gt = g; r[Y++] = C[U++], --gt; )
                                                                      ;
                                                                    U = Y - Gt, _t = r;
                                                                  }
                                                                }
                                                              } else if (U += g - gt, gt < zt) {
                                                                for (zt -= gt; r[Y++] = C[U++], --gt; )
                                                                  ;
                                                                U = Y - Gt, _t = r;
                                                              }
                                                              for (; 2 < zt; )
                                                                r[Y++] = _t[U++], r[Y++] = _t[U++], r[Y++] = _t[U++], zt -= 3;
                                                              zt && (r[Y++] = _t[U++], 1 < zt && (r[Y++] = _t[U++]));
                                                            } else {
                                                              for (U = Y - Gt; r[Y++] = r[U++], r[Y++] = r[U++], r[Y++] = r[U++], 2 < (zt -= 3); )
                                                                ;
                                                              zt && (r[Y++] = r[U++], 1 < zt && (r[Y++] = r[U++]));
                                                            }
                                                            break;
                                                          }
                                                      }
                                                      break;
                                                    }
                                                } while (k < q && Y < Q);
                                              k -= zt = at >> 3, T &= (1 << (at -= zt << 3)) - 1, A.next_in = k, A.next_out = Y, A.avail_in = k < q ? q - k + 5 : 5 - (k - q), A.avail_out = Y < Q ? Q - Y + 257 : 257 - (Y - Q), y.hold = T, y.bits = at;
                                            };
                                          }, {}], 49: [function(N, yt, V) {
                                            var A = N("../utils/common"), S = N("./adler32"), y = N("./crc32"), k = N("./inffast"), q = N("./inftrees"), Y = 1, X = 2, Q = 0, _ = -2, R = 1, B = 852, g = 592;
                                            function C(U) {
                                              return (U >>> 24 & 255) + (U >>> 8 & 65280) + ((65280 & U) << 8) + ((255 & U) << 24);
                                            }
                                            function T() {
                                              this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new A.Buf16(320), this.work = new A.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
                                            }
                                            function at(U) {
                                              var _t;
                                              return U && U.state ? (_t = U.state, U.total_in = U.total_out = _t.total = 0, U.msg = "", _t.wrap && (U.adler = 1 & _t.wrap), _t.mode = R, _t.last = 0, _t.havedict = 0, _t.dmax = 32768, _t.head = null, _t.hold = 0, _t.bits = 0, _t.lencode = _t.lendyn = new A.Buf32(B), _t.distcode = _t.distdyn = new A.Buf32(g), _t.sane = 1, _t.back = -1, Q) : _;
                                            }
                                            function ut(U) {
                                              var _t;
                                              return U && U.state ? ((_t = U.state).wsize = 0, _t.whave = 0, _t.wnext = 0, at(U)) : _;
                                            }
                                            function et(U, _t) {
                                              var n, r;
                                              return U && U.state ? (r = U.state, _t < 0 ? (n = 0, _t = -_t) : (n = 1 + (_t >> 4), _t < 48 && (_t &= 15)), _t && (_t < 8 || 15 < _t) ? _ : (r.window !== null && r.wbits !== _t && (r.window = null), r.wrap = n, r.wbits = _t, ut(U))) : _;
                                            }
                                            function Ft(U, _t) {
                                              var n, r;
                                              return U ? (r = new T(), (U.state = r).window = null, (n = et(U, _t)) !== Q && (U.state = null), n) : _;
                                            }
                                            var At, Bt, gt = !0;
                                            function zt(U) {
                                              if (gt) {
                                                var _t;
                                                for (At = new A.Buf32(512), Bt = new A.Buf32(32), _t = 0; _t < 144; )
                                                  U.lens[_t++] = 8;
                                                for (; _t < 256; )
                                                  U.lens[_t++] = 9;
                                                for (; _t < 280; )
                                                  U.lens[_t++] = 7;
                                                for (; _t < 288; )
                                                  U.lens[_t++] = 8;
                                                for (q(Y, U.lens, 0, 288, At, 0, U.work, { bits: 9 }), _t = 0; _t < 32; )
                                                  U.lens[_t++] = 5;
                                                q(X, U.lens, 0, 32, Bt, 0, U.work, { bits: 5 }), gt = !1;
                                              }
                                              U.lencode = At, U.lenbits = 9, U.distcode = Bt, U.distbits = 5;
                                            }
                                            function Gt(U, _t, n, r) {
                                              var a, s = U.state;
                                              return s.window === null && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new A.Buf8(s.wsize)), r >= s.wsize ? (A.arraySet(s.window, _t, n - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : (r < (a = s.wsize - s.wnext) && (a = r), A.arraySet(s.window, _t, n - r, a, s.wnext), (r -= a) ? (A.arraySet(s.window, _t, n - r, r, 0), s.wnext = r, s.whave = s.wsize) : (s.wnext += a, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += a))), 0;
                                            }
                                            V.inflateReset = ut, V.inflateReset2 = et, V.inflateResetKeep = at, V.inflateInit = function(U) {
                                              return Ft(U, 15);
                                            }, V.inflateInit2 = Ft, V.inflate = function(U, _t) {
                                              var n, r, a, s, p, d, F, v, G, wt, E, D, h, it, z, x, It, Mt, Nt, Rt, Ct, Lt, $t, jt, Jt = 0, Wt = new A.Buf8(4), Dt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                                              if (!U || !U.state || !U.output || !U.input && U.avail_in !== 0)
                                                return _;
                                              (n = U.state).mode === 12 && (n.mode = 13), p = U.next_out, a = U.output, F = U.avail_out, s = U.next_in, r = U.input, d = U.avail_in, v = n.hold, G = n.bits, wt = d, E = F, Lt = Q;
                                              t:
                                                for (; ; )
                                                  switch (n.mode) {
                                                    case R:
                                                      if (n.wrap === 0) {
                                                        n.mode = 13;
                                                        break;
                                                      }
                                                      for (; G < 16; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if (2 & n.wrap && v === 35615) {
                                                        Wt[n.check = 0] = 255 & v, Wt[1] = v >>> 8 & 255, n.check = y(n.check, Wt, 2, 0), G = v = 0, n.mode = 2;
                                                        break;
                                                      }
                                                      if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & v) << 8) + (v >> 8)) % 31) {
                                                        U.msg = "incorrect header check", n.mode = 30;
                                                        break;
                                                      }
                                                      if ((15 & v) != 8) {
                                                        U.msg = "unknown compression method", n.mode = 30;
                                                        break;
                                                      }
                                                      if (G -= 4, Ct = 8 + (15 & (v >>>= 4)), n.wbits === 0)
                                                        n.wbits = Ct;
                                                      else if (Ct > n.wbits) {
                                                        U.msg = "invalid window size", n.mode = 30;
                                                        break;
                                                      }
                                                      n.dmax = 1 << Ct, U.adler = n.check = 1, n.mode = 512 & v ? 10 : 12, G = v = 0;
                                                      break;
                                                    case 2:
                                                      for (; G < 16; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if (n.flags = v, (255 & n.flags) != 8) {
                                                        U.msg = "unknown compression method", n.mode = 30;
                                                        break;
                                                      }
                                                      if (57344 & n.flags) {
                                                        U.msg = "unknown header flags set", n.mode = 30;
                                                        break;
                                                      }
                                                      n.head && (n.head.text = v >> 8 & 1), 512 & n.flags && (Wt[0] = 255 & v, Wt[1] = v >>> 8 & 255, n.check = y(n.check, Wt, 2, 0)), G = v = 0, n.mode = 3;
                                                    case 3:
                                                      for (; G < 32; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      n.head && (n.head.time = v), 512 & n.flags && (Wt[0] = 255 & v, Wt[1] = v >>> 8 & 255, Wt[2] = v >>> 16 & 255, Wt[3] = v >>> 24 & 255, n.check = y(n.check, Wt, 4, 0)), G = v = 0, n.mode = 4;
                                                    case 4:
                                                      for (; G < 16; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      n.head && (n.head.xflags = 255 & v, n.head.os = v >> 8), 512 & n.flags && (Wt[0] = 255 & v, Wt[1] = v >>> 8 & 255, n.check = y(n.check, Wt, 2, 0)), G = v = 0, n.mode = 5;
                                                    case 5:
                                                      if (1024 & n.flags) {
                                                        for (; G < 16; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        n.length = v, n.head && (n.head.extra_len = v), 512 & n.flags && (Wt[0] = 255 & v, Wt[1] = v >>> 8 & 255, n.check = y(n.check, Wt, 2, 0)), G = v = 0;
                                                      } else
                                                        n.head && (n.head.extra = null);
                                                      n.mode = 6;
                                                    case 6:
                                                      if (1024 & n.flags && (d < (D = n.length) && (D = d), D && (n.head && (Ct = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), A.arraySet(n.head.extra, r, s, D, Ct)), 512 & n.flags && (n.check = y(n.check, r, D, s)), d -= D, s += D, n.length -= D), n.length))
                                                        break t;
                                                      n.length = 0, n.mode = 7;
                                                    case 7:
                                                      if (2048 & n.flags) {
                                                        if (d === 0)
                                                          break t;
                                                        for (D = 0; Ct = r[s + D++], n.head && Ct && n.length < 65536 && (n.head.name += String.fromCharCode(Ct)), Ct && D < d; )
                                                          ;
                                                        if (512 & n.flags && (n.check = y(n.check, r, D, s)), d -= D, s += D, Ct)
                                                          break t;
                                                      } else
                                                        n.head && (n.head.name = null);
                                                      n.length = 0, n.mode = 8;
                                                    case 8:
                                                      if (4096 & n.flags) {
                                                        if (d === 0)
                                                          break t;
                                                        for (D = 0; Ct = r[s + D++], n.head && Ct && n.length < 65536 && (n.head.comment += String.fromCharCode(Ct)), Ct && D < d; )
                                                          ;
                                                        if (512 & n.flags && (n.check = y(n.check, r, D, s)), d -= D, s += D, Ct)
                                                          break t;
                                                      } else
                                                        n.head && (n.head.comment = null);
                                                      n.mode = 9;
                                                    case 9:
                                                      if (512 & n.flags) {
                                                        for (; G < 16; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        if (v !== (65535 & n.check)) {
                                                          U.msg = "header crc mismatch", n.mode = 30;
                                                          break;
                                                        }
                                                        G = v = 0;
                                                      }
                                                      n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), U.adler = n.check = 0, n.mode = 12;
                                                      break;
                                                    case 10:
                                                      for (; G < 32; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      U.adler = n.check = C(v), G = v = 0, n.mode = 11;
                                                    case 11:
                                                      if (n.havedict === 0)
                                                        return U.next_out = p, U.avail_out = F, U.next_in = s, U.avail_in = d, n.hold = v, n.bits = G, 2;
                                                      U.adler = n.check = 1, n.mode = 12;
                                                    case 12:
                                                      if (_t === 5 || _t === 6)
                                                        break t;
                                                    case 13:
                                                      if (n.last) {
                                                        v >>>= 7 & G, G -= 7 & G, n.mode = 27;
                                                        break;
                                                      }
                                                      for (; G < 3; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      switch (n.last = 1 & v, G -= 1, 3 & (v >>>= 1)) {
                                                        case 0:
                                                          n.mode = 14;
                                                          break;
                                                        case 1:
                                                          if (zt(n), n.mode = 20, _t !== 6)
                                                            break;
                                                          v >>>= 2, G -= 2;
                                                          break t;
                                                        case 2:
                                                          n.mode = 17;
                                                          break;
                                                        case 3:
                                                          U.msg = "invalid block type", n.mode = 30;
                                                      }
                                                      v >>>= 2, G -= 2;
                                                      break;
                                                    case 14:
                                                      for (v >>>= 7 & G, G -= 7 & G; G < 32; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if ((65535 & v) != (v >>> 16 ^ 65535)) {
                                                        U.msg = "invalid stored block lengths", n.mode = 30;
                                                        break;
                                                      }
                                                      if (n.length = 65535 & v, G = v = 0, n.mode = 15, _t === 6)
                                                        break t;
                                                    case 15:
                                                      n.mode = 16;
                                                    case 16:
                                                      if (D = n.length) {
                                                        if (d < D && (D = d), F < D && (D = F), D === 0)
                                                          break t;
                                                        A.arraySet(a, r, s, D, p), d -= D, s += D, F -= D, p += D, n.length -= D;
                                                        break;
                                                      }
                                                      n.mode = 12;
                                                      break;
                                                    case 17:
                                                      for (; G < 14; ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if (n.nlen = 257 + (31 & v), v >>>= 5, G -= 5, n.ndist = 1 + (31 & v), v >>>= 5, G -= 5, n.ncode = 4 + (15 & v), v >>>= 4, G -= 4, 286 < n.nlen || 30 < n.ndist) {
                                                        U.msg = "too many length or distance symbols", n.mode = 30;
                                                        break;
                                                      }
                                                      n.have = 0, n.mode = 18;
                                                    case 18:
                                                      for (; n.have < n.ncode; ) {
                                                        for (; G < 3; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        n.lens[Dt[n.have++]] = 7 & v, v >>>= 3, G -= 3;
                                                      }
                                                      for (; n.have < 19; )
                                                        n.lens[Dt[n.have++]] = 0;
                                                      if (n.lencode = n.lendyn, n.lenbits = 7, $t = { bits: n.lenbits }, Lt = q(0, n.lens, 0, 19, n.lencode, 0, n.work, $t), n.lenbits = $t.bits, Lt) {
                                                        U.msg = "invalid code lengths set", n.mode = 30;
                                                        break;
                                                      }
                                                      n.have = 0, n.mode = 19;
                                                    case 19:
                                                      for (; n.have < n.nlen + n.ndist; ) {
                                                        for (; x = (Jt = n.lencode[v & (1 << n.lenbits) - 1]) >>> 16 & 255, It = 65535 & Jt, !((z = Jt >>> 24) <= G); ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        if (It < 16)
                                                          v >>>= z, G -= z, n.lens[n.have++] = It;
                                                        else {
                                                          if (It === 16) {
                                                            for (jt = z + 2; G < jt; ) {
                                                              if (d === 0)
                                                                break t;
                                                              d--, v += r[s++] << G, G += 8;
                                                            }
                                                            if (v >>>= z, G -= z, n.have === 0) {
                                                              U.msg = "invalid bit length repeat", n.mode = 30;
                                                              break;
                                                            }
                                                            Ct = n.lens[n.have - 1], D = 3 + (3 & v), v >>>= 2, G -= 2;
                                                          } else if (It === 17) {
                                                            for (jt = z + 3; G < jt; ) {
                                                              if (d === 0)
                                                                break t;
                                                              d--, v += r[s++] << G, G += 8;
                                                            }
                                                            G -= z, Ct = 0, D = 3 + (7 & (v >>>= z)), v >>>= 3, G -= 3;
                                                          } else {
                                                            for (jt = z + 7; G < jt; ) {
                                                              if (d === 0)
                                                                break t;
                                                              d--, v += r[s++] << G, G += 8;
                                                            }
                                                            G -= z, Ct = 0, D = 11 + (127 & (v >>>= z)), v >>>= 7, G -= 7;
                                                          }
                                                          if (n.have + D > n.nlen + n.ndist) {
                                                            U.msg = "invalid bit length repeat", n.mode = 30;
                                                            break;
                                                          }
                                                          for (; D--; )
                                                            n.lens[n.have++] = Ct;
                                                        }
                                                      }
                                                      if (n.mode === 30)
                                                        break;
                                                      if (n.lens[256] === 0) {
                                                        U.msg = "invalid code -- missing end-of-block", n.mode = 30;
                                                        break;
                                                      }
                                                      if (n.lenbits = 9, $t = { bits: n.lenbits }, Lt = q(Y, n.lens, 0, n.nlen, n.lencode, 0, n.work, $t), n.lenbits = $t.bits, Lt) {
                                                        U.msg = "invalid literal/lengths set", n.mode = 30;
                                                        break;
                                                      }
                                                      if (n.distbits = 6, n.distcode = n.distdyn, $t = { bits: n.distbits }, Lt = q(X, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, $t), n.distbits = $t.bits, Lt) {
                                                        U.msg = "invalid distances set", n.mode = 30;
                                                        break;
                                                      }
                                                      if (n.mode = 20, _t === 6)
                                                        break t;
                                                    case 20:
                                                      n.mode = 21;
                                                    case 21:
                                                      if (6 <= d && 258 <= F) {
                                                        U.next_out = p, U.avail_out = F, U.next_in = s, U.avail_in = d, n.hold = v, n.bits = G, k(U, E), p = U.next_out, a = U.output, F = U.avail_out, s = U.next_in, r = U.input, d = U.avail_in, v = n.hold, G = n.bits, n.mode === 12 && (n.back = -1);
                                                        break;
                                                      }
                                                      for (n.back = 0; x = (Jt = n.lencode[v & (1 << n.lenbits) - 1]) >>> 16 & 255, It = 65535 & Jt, !((z = Jt >>> 24) <= G); ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if (x && !(240 & x)) {
                                                        for (Mt = z, Nt = x, Rt = It; x = (Jt = n.lencode[Rt + ((v & (1 << Mt + Nt) - 1) >> Mt)]) >>> 16 & 255, It = 65535 & Jt, !(Mt + (z = Jt >>> 24) <= G); ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        v >>>= Mt, G -= Mt, n.back += Mt;
                                                      }
                                                      if (v >>>= z, G -= z, n.back += z, n.length = It, x === 0) {
                                                        n.mode = 26;
                                                        break;
                                                      }
                                                      if (32 & x) {
                                                        n.back = -1, n.mode = 12;
                                                        break;
                                                      }
                                                      if (64 & x) {
                                                        U.msg = "invalid literal/length code", n.mode = 30;
                                                        break;
                                                      }
                                                      n.extra = 15 & x, n.mode = 22;
                                                    case 22:
                                                      if (n.extra) {
                                                        for (jt = n.extra; G < jt; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        n.length += v & (1 << n.extra) - 1, v >>>= n.extra, G -= n.extra, n.back += n.extra;
                                                      }
                                                      n.was = n.length, n.mode = 23;
                                                    case 23:
                                                      for (; x = (Jt = n.distcode[v & (1 << n.distbits) - 1]) >>> 16 & 255, It = 65535 & Jt, !((z = Jt >>> 24) <= G); ) {
                                                        if (d === 0)
                                                          break t;
                                                        d--, v += r[s++] << G, G += 8;
                                                      }
                                                      if (!(240 & x)) {
                                                        for (Mt = z, Nt = x, Rt = It; x = (Jt = n.distcode[Rt + ((v & (1 << Mt + Nt) - 1) >> Mt)]) >>> 16 & 255, It = 65535 & Jt, !(Mt + (z = Jt >>> 24) <= G); ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        v >>>= Mt, G -= Mt, n.back += Mt;
                                                      }
                                                      if (v >>>= z, G -= z, n.back += z, 64 & x) {
                                                        U.msg = "invalid distance code", n.mode = 30;
                                                        break;
                                                      }
                                                      n.offset = It, n.extra = 15 & x, n.mode = 24;
                                                    case 24:
                                                      if (n.extra) {
                                                        for (jt = n.extra; G < jt; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        n.offset += v & (1 << n.extra) - 1, v >>>= n.extra, G -= n.extra, n.back += n.extra;
                                                      }
                                                      if (n.offset > n.dmax) {
                                                        U.msg = "invalid distance too far back", n.mode = 30;
                                                        break;
                                                      }
                                                      n.mode = 25;
                                                    case 25:
                                                      if (F === 0)
                                                        break t;
                                                      if (D = E - F, n.offset > D) {
                                                        if ((D = n.offset - D) > n.whave && n.sane) {
                                                          U.msg = "invalid distance too far back", n.mode = 30;
                                                          break;
                                                        }
                                                        h = D > n.wnext ? (D -= n.wnext, n.wsize - D) : n.wnext - D, D > n.length && (D = n.length), it = n.window;
                                                      } else
                                                        it = a, h = p - n.offset, D = n.length;
                                                      for (F < D && (D = F), F -= D, n.length -= D; a[p++] = it[h++], --D; )
                                                        ;
                                                      n.length === 0 && (n.mode = 21);
                                                      break;
                                                    case 26:
                                                      if (F === 0)
                                                        break t;
                                                      a[p++] = n.length, F--, n.mode = 21;
                                                      break;
                                                    case 27:
                                                      if (n.wrap) {
                                                        for (; G < 32; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v |= r[s++] << G, G += 8;
                                                        }
                                                        if (E -= F, U.total_out += E, n.total += E, E && (U.adler = n.check = n.flags ? y(n.check, a, E, p - E) : S(n.check, a, E, p - E)), E = F, (n.flags ? v : C(v)) !== n.check) {
                                                          U.msg = "incorrect data check", n.mode = 30;
                                                          break;
                                                        }
                                                        G = v = 0;
                                                      }
                                                      n.mode = 28;
                                                    case 28:
                                                      if (n.wrap && n.flags) {
                                                        for (; G < 32; ) {
                                                          if (d === 0)
                                                            break t;
                                                          d--, v += r[s++] << G, G += 8;
                                                        }
                                                        if (v !== (4294967295 & n.total)) {
                                                          U.msg = "incorrect length check", n.mode = 30;
                                                          break;
                                                        }
                                                        G = v = 0;
                                                      }
                                                      n.mode = 29;
                                                    case 29:
                                                      Lt = 1;
                                                      break t;
                                                    case 30:
                                                      Lt = -3;
                                                      break t;
                                                    case 31:
                                                      return -4;
                                                    case 32:
                                                    default:
                                                      return _;
                                                  }
                                              return U.next_out = p, U.avail_out = F, U.next_in = s, U.avail_in = d, n.hold = v, n.bits = G, (n.wsize || E !== U.avail_out && n.mode < 30 && (n.mode < 27 || _t !== 4)) && Gt(U, U.output, U.next_out, E - U.avail_out) ? (n.mode = 31, -4) : (wt -= U.avail_in, E -= U.avail_out, U.total_in += wt, U.total_out += E, n.total += E, n.wrap && E && (U.adler = n.check = n.flags ? y(n.check, a, E, U.next_out - E) : S(n.check, a, E, U.next_out - E)), U.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === 12 ? 128 : 0) + (n.mode === 20 || n.mode === 15 ? 256 : 0), (wt == 0 && E === 0 || _t === 4) && Lt === Q && (Lt = -5), Lt);
                                            }, V.inflateEnd = function(U) {
                                              if (!U || !U.state)
                                                return _;
                                              var _t = U.state;
                                              return _t.window && (_t.window = null), U.state = null, Q;
                                            }, V.inflateGetHeader = function(U, _t) {
                                              var n;
                                              return U && U.state && 2 & (n = U.state).wrap ? ((n.head = _t).done = !1, Q) : _;
                                            }, V.inflateSetDictionary = function(U, _t) {
                                              var n, r = _t.length;
                                              return U && U.state ? (n = U.state).wrap !== 0 && n.mode !== 11 ? _ : n.mode === 11 && S(1, _t, r, 0) !== n.check ? -3 : Gt(U, _t, r, r) ? (n.mode = 31, -4) : (n.havedict = 1, Q) : _;
                                            }, V.inflateInfo = "pako inflate (from Nodeca project)";
                                          }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(N, yt, V) {
                                            var A = N("../utils/common"), S = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], y = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], k = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], q = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                                            yt.exports = function(Y, X, Q, _, R, B, g, C) {
                                              var T, at, ut, et, Ft, At, Bt, gt, zt, Gt = C.bits, U = 0, _t = 0, n = 0, r = 0, a = 0, s = 0, p = 0, d = 0, F = 0, v = 0, G = null, wt = 0, E = new A.Buf16(16), D = new A.Buf16(16), h = null, it = 0;
                                              for (U = 0; U <= 15; U++)
                                                E[U] = 0;
                                              for (_t = 0; _t < _; _t++)
                                                E[X[Q + _t]]++;
                                              for (a = Gt, r = 15; 1 <= r && E[r] === 0; r--)
                                                ;
                                              if (r < a && (a = r), r === 0)
                                                return R[B++] = 20971520, R[B++] = 20971520, C.bits = 1, 0;
                                              for (n = 1; n < r && E[n] === 0; n++)
                                                ;
                                              for (a < n && (a = n), U = d = 1; U <= 15; U++)
                                                if (d <<= 1, (d -= E[U]) < 0)
                                                  return -1;
                                              if (0 < d && (Y === 0 || r !== 1))
                                                return -1;
                                              for (D[1] = 0, U = 1; U < 15; U++)
                                                D[U + 1] = D[U] + E[U];
                                              for (_t = 0; _t < _; _t++)
                                                X[Q + _t] !== 0 && (g[D[X[Q + _t]]++] = _t);
                                              if (At = Y === 0 ? (G = h = g, 19) : Y === 1 ? (G = S, wt -= 257, h = y, it -= 257, 256) : (G = k, h = q, -1), U = n, Ft = B, p = _t = v = 0, ut = -1, et = (F = 1 << (s = a)) - 1, Y === 1 && 852 < F || Y === 2 && 592 < F)
                                                return 1;
                                              for (; ; ) {
                                                for (Bt = U - p, zt = g[_t] < At ? (gt = 0, g[_t]) : g[_t] > At ? (gt = h[it + g[_t]], G[wt + g[_t]]) : (gt = 96, 0), T = 1 << U - p, n = at = 1 << s; R[Ft + (v >> p) + (at -= T)] = Bt << 24 | gt << 16 | zt | 0, at !== 0; )
                                                  ;
                                                for (T = 1 << U - 1; v & T; )
                                                  T >>= 1;
                                                if (T !== 0 ? (v &= T - 1, v += T) : v = 0, _t++, --E[U] == 0) {
                                                  if (U === r)
                                                    break;
                                                  U = X[Q + g[_t]];
                                                }
                                                if (a < U && (v & et) !== ut) {
                                                  for (p === 0 && (p = a), Ft += n, d = 1 << (s = U - p); s + p < r && !((d -= E[s + p]) <= 0); )
                                                    s++, d <<= 1;
                                                  if (F += 1 << s, Y === 1 && 852 < F || Y === 2 && 592 < F)
                                                    return 1;
                                                  R[ut = v & et] = a << 24 | s << 16 | Ft - B | 0;
                                                }
                                              }
                                              return v !== 0 && (R[Ft + v] = U - p << 24 | 64 << 16 | 0), C.bits = a, 0;
                                            };
                                          }, { "../utils/common": 41 }], 51: [function(N, yt, V) {
                                            yt.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
                                          }, {}], 52: [function(N, yt, V) {
                                            var A = N("../utils/common");
                                            function S(E) {
                                              for (var D = E.length; 0 <= --D; )
                                                E[D] = 0;
                                            }
                                            var y = 15, k = 16, q = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], Y = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], X = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], Q = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], _ = new Array(576);
                                            S(_);
                                            var R = new Array(60);
                                            S(R);
                                            var B = new Array(512);
                                            S(B);
                                            var g = new Array(256);
                                            S(g);
                                            var C = new Array(29);
                                            S(C);
                                            var T, at, ut, et = new Array(30);
                                            function Ft(E, D, h, it, z) {
                                              this.static_tree = E, this.extra_bits = D, this.extra_base = h, this.elems = it, this.max_length = z, this.has_stree = E && E.length;
                                            }
                                            function At(E, D) {
                                              this.dyn_tree = E, this.max_code = 0, this.stat_desc = D;
                                            }
                                            function Bt(E) {
                                              return E < 256 ? B[E] : B[256 + (E >>> 7)];
                                            }
                                            function gt(E, D) {
                                              E.pending_buf[E.pending++] = 255 & D, E.pending_buf[E.pending++] = D >>> 8 & 255;
                                            }
                                            function zt(E, D, h) {
                                              E.bi_valid > k - h ? (E.bi_buf |= D << E.bi_valid & 65535, gt(E, E.bi_buf), E.bi_buf = D >> k - E.bi_valid, E.bi_valid += h - k) : (E.bi_buf |= D << E.bi_valid & 65535, E.bi_valid += h);
                                            }
                                            function Gt(E, D, h) {
                                              zt(E, h[2 * D], h[2 * D + 1]);
                                            }
                                            function U(E, D) {
                                              for (var h = 0; h |= 1 & E, E >>>= 1, h <<= 1, 0 < --D; )
                                                ;
                                              return h >>> 1;
                                            }
                                            function _t(E, D, h) {
                                              var it, z, x = new Array(y + 1), It = 0;
                                              for (it = 1; it <= y; it++)
                                                x[it] = It = It + h[it - 1] << 1;
                                              for (z = 0; z <= D; z++) {
                                                var Mt = E[2 * z + 1];
                                                Mt !== 0 && (E[2 * z] = U(x[Mt]++, Mt));
                                              }
                                            }
                                            function n(E) {
                                              var D;
                                              for (D = 0; D < 286; D++)
                                                E.dyn_ltree[2 * D] = 0;
                                              for (D = 0; D < 30; D++)
                                                E.dyn_dtree[2 * D] = 0;
                                              for (D = 0; D < 19; D++)
                                                E.bl_tree[2 * D] = 0;
                                              E.dyn_ltree[512] = 1, E.opt_len = E.static_len = 0, E.last_lit = E.matches = 0;
                                            }
                                            function r(E) {
                                              8 < E.bi_valid ? gt(E, E.bi_buf) : 0 < E.bi_valid && (E.pending_buf[E.pending++] = E.bi_buf), E.bi_buf = 0, E.bi_valid = 0;
                                            }
                                            function a(E, D, h, it) {
                                              var z = 2 * D, x = 2 * h;
                                              return E[z] < E[x] || E[z] === E[x] && it[D] <= it[h];
                                            }
                                            function s(E, D, h) {
                                              for (var it = E.heap[h], z = h << 1; z <= E.heap_len && (z < E.heap_len && a(D, E.heap[z + 1], E.heap[z], E.depth) && z++, !a(D, it, E.heap[z], E.depth)); )
                                                E.heap[h] = E.heap[z], h = z, z <<= 1;
                                              E.heap[h] = it;
                                            }
                                            function p(E, D, h) {
                                              var it, z, x, It, Mt = 0;
                                              if (E.last_lit !== 0)
                                                for (; it = E.pending_buf[E.d_buf + 2 * Mt] << 8 | E.pending_buf[E.d_buf + 2 * Mt + 1], z = E.pending_buf[E.l_buf + Mt], Mt++, it === 0 ? Gt(E, z, D) : (Gt(E, (x = g[z]) + 256 + 1, D), (It = q[x]) !== 0 && zt(E, z -= C[x], It), Gt(E, x = Bt(--it), h), (It = Y[x]) !== 0 && zt(E, it -= et[x], It)), Mt < E.last_lit; )
                                                  ;
                                              Gt(E, 256, D);
                                            }
                                            function d(E, D) {
                                              var h, it, z, x = D.dyn_tree, It = D.stat_desc.static_tree, Mt = D.stat_desc.has_stree, Nt = D.stat_desc.elems, Rt = -1;
                                              for (E.heap_len = 0, E.heap_max = 573, h = 0; h < Nt; h++)
                                                x[2 * h] !== 0 ? (E.heap[++E.heap_len] = Rt = h, E.depth[h] = 0) : x[2 * h + 1] = 0;
                                              for (; E.heap_len < 2; )
                                                x[2 * (z = E.heap[++E.heap_len] = Rt < 2 ? ++Rt : 0)] = 1, E.depth[z] = 0, E.opt_len--, Mt && (E.static_len -= It[2 * z + 1]);
                                              for (D.max_code = Rt, h = E.heap_len >> 1; 1 <= h; h--)
                                                s(E, x, h);
                                              for (z = Nt; h = E.heap[1], E.heap[1] = E.heap[E.heap_len--], s(E, x, 1), it = E.heap[1], E.heap[--E.heap_max] = h, E.heap[--E.heap_max] = it, x[2 * z] = x[2 * h] + x[2 * it], E.depth[z] = (E.depth[h] >= E.depth[it] ? E.depth[h] : E.depth[it]) + 1, x[2 * h + 1] = x[2 * it + 1] = z, E.heap[1] = z++, s(E, x, 1), 2 <= E.heap_len; )
                                                ;
                                              E.heap[--E.heap_max] = E.heap[1], function(Ct, Lt) {
                                                var $t, jt, Jt, Wt, Dt, Pe, fe = Lt.dyn_tree, We = Lt.max_code, re = Lt.stat_desc.static_tree, ur = Lt.stat_desc.has_stree, qe = Lt.stat_desc.extra_bits, $e = Lt.stat_desc.extra_base, we = Lt.stat_desc.max_length, Ae = 0;
                                                for (Wt = 0; Wt <= y; Wt++)
                                                  Ct.bl_count[Wt] = 0;
                                                for (fe[2 * Ct.heap[Ct.heap_max] + 1] = 0, $t = Ct.heap_max + 1; $t < 573; $t++)
                                                  we < (Wt = fe[2 * fe[2 * (jt = Ct.heap[$t]) + 1] + 1] + 1) && (Wt = we, Ae++), fe[2 * jt + 1] = Wt, We < jt || (Ct.bl_count[Wt]++, Dt = 0, $e <= jt && (Dt = qe[jt - $e]), Pe = fe[2 * jt], Ct.opt_len += Pe * (Wt + Dt), ur && (Ct.static_len += Pe * (re[2 * jt + 1] + Dt)));
                                                if (Ae !== 0) {
                                                  do {
                                                    for (Wt = we - 1; Ct.bl_count[Wt] === 0; )
                                                      Wt--;
                                                    Ct.bl_count[Wt]--, Ct.bl_count[Wt + 1] += 2, Ct.bl_count[we]--, Ae -= 2;
                                                  } while (0 < Ae);
                                                  for (Wt = we; Wt !== 0; Wt--)
                                                    for (jt = Ct.bl_count[Wt]; jt !== 0; )
                                                      We < (Jt = Ct.heap[--$t]) || (fe[2 * Jt + 1] !== Wt && (Ct.opt_len += (Wt - fe[2 * Jt + 1]) * fe[2 * Jt], fe[2 * Jt + 1] = Wt), jt--);
                                                }
                                              }(E, D), _t(x, Rt, E.bl_count);
                                            }
                                            function F(E, D, h) {
                                              var it, z, x = -1, It = D[1], Mt = 0, Nt = 7, Rt = 4;
                                              for (It === 0 && (Nt = 138, Rt = 3), D[2 * (h + 1) + 1] = 65535, it = 0; it <= h; it++)
                                                z = It, It = D[2 * (it + 1) + 1], ++Mt < Nt && z === It || (Mt < Rt ? E.bl_tree[2 * z] += Mt : z !== 0 ? (z !== x && E.bl_tree[2 * z]++, E.bl_tree[32]++) : Mt <= 10 ? E.bl_tree[34]++ : E.bl_tree[36]++, x = z, Rt = (Mt = 0) === It ? (Nt = 138, 3) : z === It ? (Nt = 6, 3) : (Nt = 7, 4));
                                            }
                                            function v(E, D, h) {
                                              var it, z, x = -1, It = D[1], Mt = 0, Nt = 7, Rt = 4;
                                              for (It === 0 && (Nt = 138, Rt = 3), it = 0; it <= h; it++)
                                                if (z = It, It = D[2 * (it + 1) + 1], !(++Mt < Nt && z === It)) {
                                                  if (Mt < Rt)
                                                    for (; Gt(E, z, E.bl_tree), --Mt != 0; )
                                                      ;
                                                  else
                                                    z !== 0 ? (z !== x && (Gt(E, z, E.bl_tree), Mt--), Gt(E, 16, E.bl_tree), zt(E, Mt - 3, 2)) : Mt <= 10 ? (Gt(E, 17, E.bl_tree), zt(E, Mt - 3, 3)) : (Gt(E, 18, E.bl_tree), zt(E, Mt - 11, 7));
                                                  x = z, Rt = (Mt = 0) === It ? (Nt = 138, 3) : z === It ? (Nt = 6, 3) : (Nt = 7, 4);
                                                }
                                            }
                                            S(et);
                                            var G = !1;
                                            function wt(E, D, h, it) {
                                              var z, x, It;
                                              zt(E, 0 + (it ? 1 : 0), 3), x = D, It = h, r(z = E), gt(z, It), gt(z, ~It), A.arraySet(z.pending_buf, z.window, x, It, z.pending), z.pending += It;
                                            }
                                            V._tr_init = function(E) {
                                              G || (function() {
                                                var D, h, it, z, x, It = new Array(y + 1);
                                                for (z = it = 0; z < 28; z++)
                                                  for (C[z] = it, D = 0; D < 1 << q[z]; D++)
                                                    g[it++] = z;
                                                for (g[it - 1] = z, z = x = 0; z < 16; z++)
                                                  for (et[z] = x, D = 0; D < 1 << Y[z]; D++)
                                                    B[x++] = z;
                                                for (x >>= 7; z < 30; z++)
                                                  for (et[z] = x << 7, D = 0; D < 1 << Y[z] - 7; D++)
                                                    B[256 + x++] = z;
                                                for (h = 0; h <= y; h++)
                                                  It[h] = 0;
                                                for (D = 0; D <= 143; )
                                                  _[2 * D + 1] = 8, D++, It[8]++;
                                                for (; D <= 255; )
                                                  _[2 * D + 1] = 9, D++, It[9]++;
                                                for (; D <= 279; )
                                                  _[2 * D + 1] = 7, D++, It[7]++;
                                                for (; D <= 287; )
                                                  _[2 * D + 1] = 8, D++, It[8]++;
                                                for (_t(_, 287, It), D = 0; D < 30; D++)
                                                  R[2 * D + 1] = 5, R[2 * D] = U(D, 5);
                                                T = new Ft(_, q, 257, 286, y), at = new Ft(R, Y, 0, 30, y), ut = new Ft(new Array(0), X, 0, 19, 7);
                                              }(), G = !0), E.l_desc = new At(E.dyn_ltree, T), E.d_desc = new At(E.dyn_dtree, at), E.bl_desc = new At(E.bl_tree, ut), E.bi_buf = 0, E.bi_valid = 0, n(E);
                                            }, V._tr_stored_block = wt, V._tr_flush_block = function(E, D, h, it) {
                                              var z, x, It = 0;
                                              0 < E.level ? (E.strm.data_type === 2 && (E.strm.data_type = function(Mt) {
                                                var Nt, Rt = 4093624447;
                                                for (Nt = 0; Nt <= 31; Nt++, Rt >>>= 1)
                                                  if (1 & Rt && Mt.dyn_ltree[2 * Nt] !== 0)
                                                    return 0;
                                                if (Mt.dyn_ltree[18] !== 0 || Mt.dyn_ltree[20] !== 0 || Mt.dyn_ltree[26] !== 0)
                                                  return 1;
                                                for (Nt = 32; Nt < 256; Nt++)
                                                  if (Mt.dyn_ltree[2 * Nt] !== 0)
                                                    return 1;
                                                return 0;
                                              }(E)), d(E, E.l_desc), d(E, E.d_desc), It = function(Mt) {
                                                var Nt;
                                                for (F(Mt, Mt.dyn_ltree, Mt.l_desc.max_code), F(Mt, Mt.dyn_dtree, Mt.d_desc.max_code), d(Mt, Mt.bl_desc), Nt = 18; 3 <= Nt && Mt.bl_tree[2 * Q[Nt] + 1] === 0; Nt--)
                                                  ;
                                                return Mt.opt_len += 3 * (Nt + 1) + 5 + 5 + 4, Nt;
                                              }(E), z = E.opt_len + 3 + 7 >>> 3, (x = E.static_len + 3 + 7 >>> 3) <= z && (z = x)) : z = x = h + 5, h + 4 <= z && D !== -1 ? wt(E, D, h, it) : E.strategy === 4 || x === z ? (zt(E, 2 + (it ? 1 : 0), 3), p(E, _, R)) : (zt(E, 4 + (it ? 1 : 0), 3), function(Mt, Nt, Rt, Ct) {
                                                var Lt;
                                                for (zt(Mt, Nt - 257, 5), zt(Mt, Rt - 1, 5), zt(Mt, Ct - 4, 4), Lt = 0; Lt < Ct; Lt++)
                                                  zt(Mt, Mt.bl_tree[2 * Q[Lt] + 1], 3);
                                                v(Mt, Mt.dyn_ltree, Nt - 1), v(Mt, Mt.dyn_dtree, Rt - 1);
                                              }(E, E.l_desc.max_code + 1, E.d_desc.max_code + 1, It + 1), p(E, E.dyn_ltree, E.dyn_dtree)), n(E), it && r(E);
                                            }, V._tr_tally = function(E, D, h) {
                                              return E.pending_buf[E.d_buf + 2 * E.last_lit] = D >>> 8 & 255, E.pending_buf[E.d_buf + 2 * E.last_lit + 1] = 255 & D, E.pending_buf[E.l_buf + E.last_lit] = 255 & h, E.last_lit++, D === 0 ? E.dyn_ltree[2 * h]++ : (E.matches++, D--, E.dyn_ltree[2 * (g[h] + 256 + 1)]++, E.dyn_dtree[2 * Bt(D)]++), E.last_lit === E.lit_bufsize - 1;
                                            }, V._tr_align = function(E) {
                                              var D;
                                              zt(E, 2, 3), Gt(E, 256, _), (D = E).bi_valid === 16 ? (gt(D, D.bi_buf), D.bi_buf = 0, D.bi_valid = 0) : 8 <= D.bi_valid && (D.pending_buf[D.pending++] = 255 & D.bi_buf, D.bi_buf >>= 8, D.bi_valid -= 8);
                                            };
                                          }, { "../utils/common": 41 }], 53: [function(N, yt, V) {
                                            yt.exports = function() {
                                              this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
                                            };
                                          }, {}], 54: [function(N, yt, V) {
                                            yt.exports = typeof dt == "function" ? dt : function() {
                                              var A = [].slice.apply(arguments);
                                              A.splice(1, 0, 0), setTimeout.apply(null, A);
                                            };
                                          }, {}] }, {}, [10])(10);
                                        });
                                      }).call(this, $ !== void 0 ? $ : typeof self < "u" ? self : typeof window < "u" ? window : {});
                                    }, {}] }, {}, [1])(1);
                                  });
                                }).call(this, H !== void 0 ? H : typeof self < "u" ? self : typeof window < "u" ? window : {});
                              }, {}] }, {}, [1])(1);
                            });
                          }).call(this, W !== void 0 ? W : typeof self < "u" ? self : typeof window < "u" ? window : {});
                        }, {}] }, {}, [1])(1);
                      });
                    }).call(this, m !== void 0 ? m : typeof self < "u" ? self : typeof window < "u" ? window : {});
                  }, {}] }, {}, [1])(1);
                });
              }).call(this, typeof nt < "u" ? nt : typeof self < "u" ? self : typeof window < "u" ? window : {});
            }, {}] }, {}, [1])(1);
          });
        }).call(this);
      }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {}, b("buffer").Buffer, b("timers").setImmediate);
    }, { buffer: 8, timers: 22 }], 12: [function(b, rt, ct) {
      var nt = b("immediate");
      function O() {
      }
      var dt = {}, vt = ["REJECTED"], J = ["FULFILLED"], M = ["PENDING"];
      rt.exports = m;
      function m(ft) {
        if (typeof ft != "function")
          throw new TypeError("resolver must be a function");
        this.state = M, this.queue = [], this.outcome = void 0, ft !== O && W(this, ft);
      }
      m.prototype.finally = function(ft) {
        if (typeof ft != "function")
          return this;
        var P = this.constructor;
        return this.then($, lt);
        function $(Et) {
          function kt() {
            return Et;
          }
          return P.resolve(ft()).then(kt);
        }
        function lt(Et) {
          function kt() {
            throw Et;
          }
          return P.resolve(ft()).then(kt);
        }
      }, m.prototype.catch = function(ft) {
        return this.then(null, ft);
      }, m.prototype.then = function(ft, P) {
        if (typeof ft != "function" && this.state === J || typeof P != "function" && this.state === vt)
          return this;
        var $ = new this.constructor(O);
        if (this.state !== M) {
          var lt = this.state === J ? ft : P;
          K($, lt, this.outcome);
        } else
          this.queue.push(new ot($, ft, P));
        return $;
      };
      function ot(ft, P, $) {
        this.promise = ft, typeof P == "function" && (this.onFulfilled = P, this.callFulfilled = this.otherCallFulfilled), typeof $ == "function" && (this.onRejected = $, this.callRejected = this.otherCallRejected);
      }
      ot.prototype.callFulfilled = function(ft) {
        dt.resolve(this.promise, ft);
      }, ot.prototype.otherCallFulfilled = function(ft) {
        K(this.promise, this.onFulfilled, ft);
      }, ot.prototype.callRejected = function(ft) {
        dt.reject(this.promise, ft);
      }, ot.prototype.otherCallRejected = function(ft) {
        K(this.promise, this.onRejected, ft);
      };
      function K(ft, P, $) {
        nt(function() {
          var lt;
          try {
            lt = P($);
          } catch (Et) {
            return dt.reject(ft, Et);
          }
          lt === ft ? dt.reject(ft, new TypeError("Cannot resolve promise with itself")) : dt.resolve(ft, lt);
        });
      }
      dt.resolve = function(ft, P) {
        var $ = xt(tt, P);
        if ($.status === "error")
          return dt.reject(ft, $.value);
        var lt = $.value;
        if (lt)
          W(ft, lt);
        else {
          ft.state = J, ft.outcome = P;
          for (var Et = -1, kt = ft.queue.length; ++Et < kt; )
            ft.queue[Et].callFulfilled(P);
        }
        return ft;
      }, dt.reject = function(ft, P) {
        ft.state = vt, ft.outcome = P;
        for (var $ = -1, lt = ft.queue.length; ++$ < lt; )
          ft.queue[$].callRejected(P);
        return ft;
      };
      function tt(ft) {
        var P = ft && ft.then;
        if (ft && (typeof ft == "object" || typeof ft == "function") && typeof P == "function")
          return function() {
            P.apply(ft, arguments);
          };
      }
      function W(ft, P) {
        var $ = !1;
        function lt(N) {
          $ || ($ = !0, dt.reject(ft, N));
        }
        function Et(N) {
          $ || ($ = !0, dt.resolve(ft, N));
        }
        function kt() {
          P(Et, lt);
        }
        var qt = xt(kt);
        qt.status === "error" && lt(qt.value);
      }
      function xt(ft, P) {
        var $ = {};
        try {
          $.value = ft(P), $.status = "success";
        } catch (lt) {
          $.status = "error", $.value = lt;
        }
        return $;
      }
      m.resolve = j;
      function j(ft) {
        return ft instanceof this ? ft : dt.resolve(new this(O), ft);
      }
      m.reject = ht;
      function ht(ft) {
        var P = new this(O);
        return dt.reject(P, ft);
      }
      m.all = H;
      function H(ft) {
        var P = this;
        if (Object.prototype.toString.call(ft) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var $ = ft.length, lt = !1;
        if (!$)
          return this.resolve([]);
        for (var Et = new Array($), kt = 0, qt = -1, N = new this(O); ++qt < $; )
          yt(ft[qt], qt);
        return N;
        function yt(V, A) {
          P.resolve(V).then(S, function(y) {
            lt || (lt = !0, dt.reject(N, y));
          });
          function S(y) {
            Et[A] = y, ++kt === $ && !lt && (lt = !0, dt.resolve(N, Et));
          }
        }
      }
      m.race = mt;
      function mt(ft) {
        var P = this;
        if (Object.prototype.toString.call(ft) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var $ = ft.length, lt = !1;
        if (!$)
          return this.resolve([]);
        for (var Et = -1, kt = new this(O); ++Et < $; )
          qt(ft[Et]);
        return kt;
        function qt(N) {
          P.resolve(N).then(function(yt) {
            lt || (lt = !0, dt.resolve(kt, yt));
          }, function(yt) {
            lt || (lt = !0, dt.reject(kt, yt));
          });
        }
      }
    }, { immediate: 10 }], 13: [function(b, rt, ct) {
      (function() {
        typeof rt == "object" && rt.exports ? rt.exports = J : this.LRUCache = J;
        function nt(j, ht) {
          return Object.prototype.hasOwnProperty.call(j, ht);
        }
        function O() {
          return 1;
        }
        var dt = !1;
        function vt(j) {
          !dt && typeof j != "string" && typeof j != "number" && (dt = !0, console.error(new TypeError("LRU: key must be a string or number. Almost certainly a bug! " + typeof j).stack));
        }
        function J(j) {
          if (!(this instanceof J))
            return new J(j);
          typeof j == "number" && (j = { max: j }), j || (j = {}), this._max = j.max, (!this._max || typeof this._max != "number" || this._max <= 0) && (this._max = 1 / 0), this._lengthCalculator = j.length || O, typeof this._lengthCalculator != "function" && (this._lengthCalculator = O), this._allowStale = j.stale || !1, this._maxAge = j.maxAge || null, this._dispose = j.dispose, this.reset();
        }
        Object.defineProperty(
          J.prototype,
          "max",
          {
            set: function(j) {
              (!j || typeof j != "number" || j <= 0) && (j = 1 / 0), this._max = j, this._length > this._max && K(this);
            },
            get: function() {
              return this._max;
            },
            enumerable: !0
          }
        ), Object.defineProperty(
          J.prototype,
          "lengthCalculator",
          {
            set: function(j) {
              if (typeof j != "function") {
                this._lengthCalculator = O, this._length = this._itemCount;
                for (var ht in this._cache)
                  this._cache[ht].length = 1;
              } else {
                this._lengthCalculator = j, this._length = 0;
                for (var ht in this._cache)
                  this._cache[ht].length = this._lengthCalculator(this._cache[ht].value), this._length += this._cache[ht].length;
              }
              this._length > this._max && K(this);
            },
            get: function() {
              return this._lengthCalculator;
            },
            enumerable: !0
          }
        ), Object.defineProperty(
          J.prototype,
          "length",
          {
            get: function() {
              return this._length;
            },
            enumerable: !0
          }
        ), Object.defineProperty(
          J.prototype,
          "itemCount",
          {
            get: function() {
              return this._itemCount;
            },
            enumerable: !0
          }
        ), J.prototype.forEach = function(j, ht) {
          ht = ht || this;
          for (var H = 0, mt = this._itemCount, ft = this._mru - 1; ft >= 0 && H < mt; ft--)
            if (this._lruList[ft]) {
              H++;
              var P = this._lruList[ft];
              m(this, P) && (W(this, P), this._allowStale || (P = void 0)), P && j.call(ht, P.value, P.key, this);
            }
        }, J.prototype.keys = function() {
          for (var j = new Array(this._itemCount), ht = 0, H = this._mru - 1; H >= 0 && ht < this._itemCount; H--)
            if (this._lruList[H]) {
              var mt = this._lruList[H];
              j[ht++] = mt.key;
            }
          return j;
        }, J.prototype.values = function() {
          for (var j = new Array(this._itemCount), ht = 0, H = this._mru - 1; H >= 0 && ht < this._itemCount; H--)
            if (this._lruList[H]) {
              var mt = this._lruList[H];
              j[ht++] = mt.value;
            }
          return j;
        }, J.prototype.reset = function() {
          if (this._dispose && this._cache)
            for (var j in this._cache)
              this._dispose(j, this._cache[j].value);
          this._cache = /* @__PURE__ */ Object.create(null), this._lruList = /* @__PURE__ */ Object.create(null), this._mru = 0, this._lru = 0, this._length = 0, this._itemCount = 0;
        }, J.prototype.dump = function() {
          for (var j = [], ht = 0, H = this._mru - 1; H >= 0 && ht < this._itemCount; H--)
            if (this._lruList[H]) {
              var mt = this._lruList[H];
              m(this, mt) || (++ht, j.push({
                k: mt.key,
                v: mt.value,
                e: mt.now + (mt.maxAge || 0)
              }));
            }
          return j;
        }, J.prototype.dumpLru = function() {
          return this._lruList;
        }, J.prototype.set = function(j, ht, H) {
          H = H || this._maxAge, vt(j);
          var mt = H ? Date.now() : 0, ft = this._lengthCalculator(ht);
          if (nt(this._cache, j))
            return ft > this._max ? (W(this, this._cache[j]), !1) : (this._dispose && this._dispose(j, this._cache[j].value), this._cache[j].now = mt, this._cache[j].maxAge = H, this._cache[j].value = ht, this._length += ft - this._cache[j].length, this._cache[j].length = ft, this.get(j), this._length > this._max && K(this), !0);
          var P = new xt(j, ht, this._mru++, ft, mt, H);
          return P.length > this._max ? (this._dispose && this._dispose(j, ht), !1) : (this._length += P.length, this._lruList[P.lu] = this._cache[j] = P, this._itemCount++, this._length > this._max && K(this), !0);
        }, J.prototype.has = function(j) {
          if (vt(j), !nt(this._cache, j))
            return !1;
          var ht = this._cache[j];
          return !m(this, ht);
        }, J.prototype.get = function(j) {
          return vt(j), M(this, j, !0);
        }, J.prototype.peek = function(j) {
          return vt(j), M(this, j, !1);
        }, J.prototype.pop = function() {
          var j = this._lruList[this._lru];
          return W(this, j), j || null;
        }, J.prototype.del = function(j) {
          vt(j), W(this, this._cache[j]);
        }, J.prototype.load = function(j) {
          this.reset();
          for (var ht = Date.now(), H = j.length - 1; H >= 0; H--) {
            var mt = j[H];
            vt(mt.k);
            var ft = mt.e || 0;
            if (ft === 0)
              this.set(mt.k, mt.v);
            else {
              var P = ft - ht;
              P > 0 && this.set(mt.k, mt.v, P);
            }
          }
        };
        function M(j, ht, H) {
          vt(ht);
          var mt = j._cache[ht];
          return mt && (m(j, mt) ? (W(j, mt), j._allowStale || (mt = void 0)) : H && ot(j, mt), mt && (mt = mt.value)), mt;
        }
        function m(j, ht) {
          if (!ht || !ht.maxAge && !j._maxAge)
            return !1;
          var H = !1, mt = Date.now() - ht.now;
          return ht.maxAge ? H = mt > ht.maxAge : H = j._maxAge && mt > j._maxAge, H;
        }
        function ot(j, ht) {
          tt(j, ht), ht.lu = j._mru++, j._lruList[ht.lu] = ht;
        }
        function K(j) {
          for (; j._lru < j._mru && j._length > j._max; )
            W(j, j._lruList[j._lru]);
        }
        function tt(j, ht) {
          for (delete j._lruList[ht.lu]; j._lru < j._mru && !j._lruList[j._lru]; )
            j._lru++;
        }
        function W(j, ht) {
          ht && (j._dispose && j._dispose(ht.key, ht.value), j._length -= ht.length, j._itemCount--, delete j._cache[ht.key], tt(j, ht));
        }
        function xt(j, ht, H, mt, ft, P) {
          this.key = j, this.value = ht, this.lu = H, this.length = mt, this.now = ft, P && (this.maxAge = P);
        }
      })();
    }, {}], 14: [function(b, rt, ct) {
      b("text-encoding-polyfill");
      var nt = b("string_decoder").StringDecoder;
      function O(J) {
        var M = new nt(), m = M.write(J) + M.end();
        return m.replace(/\0/g, "").trim();
      }
      rt.exports = vt;
      var dt = /^(?:ANSI\s)?(\d+)$/m;
      function vt(J, M) {
        if (!J)
          return O;
        try {
          new TextDecoder(J.trim());
        } catch {
          var m = dt.exec(J);
          return m && !M ? vt("windows-" + m[1], !0) : O;
        }
        return ot;
        function ot(K) {
          var tt = new TextDecoder(J), W = tt.decode(K, {
            stream: !0
          }) + tt.decode();
          return W.replace(/\0/g, "").trim();
        }
      }
    }, { string_decoder: 19, "text-encoding-polyfill": 20 }], 15: [function(b, rt, ct) {
      var nt = b("./decoder");
      function O(M) {
        var m = {};
        return m.lastUpdated = new Date(M.readUInt8(1) + 1900, M.readUInt8(2), M.readUInt8(3)), m.records = M.readUInt32LE(4), m.headerLen = M.readUInt16LE(8), m.recLen = M.readUInt16LE(10), m;
      }
      function dt(M, m, ot) {
        for (var K = [], tt = 32; tt < m && (K.push({
          name: ot(M.slice(tt, tt + 11)),
          dataType: String.fromCharCode(M.readUInt8(tt + 11)),
          len: M.readUInt8(tt + 16),
          decimal: M.readUInt8(tt + 17)
        }), M.readUInt8(tt + 32) !== 13); )
          tt += 32;
        return K;
      }
      function vt(M, m, ot, K, tt) {
        var W = M.slice(m, m + ot), xt = tt(W);
        switch (K) {
          case "N":
          case "F":
          case "O":
            return parseFloat(xt, 10);
          case "D":
            return new Date(xt.slice(0, 4), parseInt(xt.slice(4, 6), 10) - 1, xt.slice(6, 8));
          case "L":
            return xt.toLowerCase() === "y" || xt.toLowerCase() === "t";
          default:
            return xt;
        }
      }
      function J(M, m, ot, K) {
        for (var tt = {}, W = 0, xt = ot.length, j, ht; W < xt; )
          ht = ot[W], j = vt(M, m, ht.len, ht.dataType, K), m += ht.len, typeof j < "u" && (tt[ht.name] = j), W++;
        return tt;
      }
      rt.exports = function(M, m) {
        for (var ot = nt(m), K = O(M), tt = dt(M, K.headerLen - 1, ot), W = (tt.length + 1 << 5) + 2, xt = K.recLen, j = K.records, ht = []; j; )
          ht.push(J(M, W, tt, ot)), W += xt, j--;
        return ht;
      };
    }, { "./decoder": 14 }], 16: [function(b, rt, ct) {
      var nt = rt.exports = {}, O, dt;
      function vt() {
        throw new Error("setTimeout has not been defined");
      }
      function J() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          typeof setTimeout == "function" ? O = setTimeout : O = vt;
        } catch {
          O = vt;
        }
        try {
          typeof clearTimeout == "function" ? dt = clearTimeout : dt = J;
        } catch {
          dt = J;
        }
      })();
      function M(mt) {
        if (O === setTimeout)
          return setTimeout(mt, 0);
        if ((O === vt || !O) && setTimeout)
          return O = setTimeout, setTimeout(mt, 0);
        try {
          return O(mt, 0);
        } catch {
          try {
            return O.call(null, mt, 0);
          } catch {
            return O.call(this, mt, 0);
          }
        }
      }
      function m(mt) {
        if (dt === clearTimeout)
          return clearTimeout(mt);
        if ((dt === J || !dt) && clearTimeout)
          return dt = clearTimeout, clearTimeout(mt);
        try {
          return dt(mt);
        } catch {
          try {
            return dt.call(null, mt);
          } catch {
            return dt.call(this, mt);
          }
        }
      }
      var ot = [], K = !1, tt, W = -1;
      function xt() {
        !K || !tt || (K = !1, tt.length ? ot = tt.concat(ot) : W = -1, ot.length && j());
      }
      function j() {
        if (!K) {
          var mt = M(xt);
          K = !0;
          for (var ft = ot.length; ft; ) {
            for (tt = ot, ot = []; ++W < ft; )
              tt && tt[W].run();
            W = -1, ft = ot.length;
          }
          tt = null, K = !1, m(mt);
        }
      }
      nt.nextTick = function(mt) {
        var ft = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var P = 1; P < arguments.length; P++)
            ft[P - 1] = arguments[P];
        ot.push(new ht(mt, ft)), ot.length === 1 && !K && M(j);
      };
      function ht(mt, ft) {
        this.fun = mt, this.array = ft;
      }
      ht.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, nt.title = "browser", nt.browser = !0, nt.env = {}, nt.argv = [], nt.version = "", nt.versions = {};
      function H() {
      }
      nt.on = H, nt.addListener = H, nt.once = H, nt.off = H, nt.removeListener = H, nt.removeAllListeners = H, nt.emit = H, nt.prependListener = H, nt.prependOnceListener = H, nt.listeners = function(mt) {
        return [];
      }, nt.binding = function(mt) {
        throw new Error("process.binding is not supported");
      }, nt.cwd = function() {
        return "/";
      }, nt.chdir = function(mt) {
        throw new Error("process.chdir is not supported");
      }, nt.umask = function() {
        return 0;
      };
    }, {}], 17: [function(b, rt, ct) {
      (function(nt, O) {
        typeof ct == "object" && typeof rt < "u" ? rt.exports = O() : nt.proj4 = O();
      })(this, function() {
        var nt = function(t) {
          t("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), t("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), t("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), t.WGS84 = t["EPSG:4326"], t["EPSG:3785"] = t["EPSG:3857"], t.GOOGLE = t["EPSG:3857"], t["EPSG:900913"] = t["EPSG:3857"], t["EPSG:102113"] = t["EPSG:3857"];
        }, O = 1, dt = 2, vt = 3, J = 4, M = 5, m = 6378137, ot = 6356752314e-3, K = 0.0066943799901413165, tt = 484813681109536e-20, W = Math.PI / 2, xt = 0.16666666666666666, j = 0.04722222222222222, ht = 0.022156084656084655, H = 1e-10, mt = 0.017453292519943295, ft = 57.29577951308232, P = Math.PI / 4, $ = Math.PI * 2, lt = 3.14159265359, Et = {};
        Et.greenwich = 0, Et.lisbon = -9.131906111111, Et.paris = 2.337229166667, Et.bogota = -74.080916666667, Et.madrid = -3.687938888889, Et.rome = 12.452333333333, Et.bern = 7.439583333333, Et.jakarta = 106.807719444444, Et.ferro = -17.666666666667, Et.brussels = 4.367975, Et.stockholm = 18.058277777778, Et.athens = 23.7163375, Et.oslo = 10.722916666667;
        var kt = {
          ft: { to_meter: 0.3048 },
          "us-ft": { to_meter: 1200 / 3937 }
        }, qt = /[\s_\-\/\(\)]/g;
        function N(t, e) {
          if (t[e])
            return t[e];
          for (var i = Object.keys(t), u = e.toLowerCase().replace(qt, ""), o = -1, f, c; ++o < i.length; )
            if (f = i[o], c = f.toLowerCase().replace(qt, ""), c === u)
              return t[f];
        }
        var yt = function(t) {
          var e = {}, i = t.split("+").map(function(l) {
            return l.trim();
          }).filter(function(l) {
            return l;
          }).reduce(function(l, w) {
            var L = w.split("=");
            return L.push(!0), l[L[0].toLowerCase()] = L[1], l;
          }, {}), u, o, f, c = {
            proj: "projName",
            datum: "datumCode",
            rf: function(l) {
              e.rf = parseFloat(l);
            },
            lat_0: function(l) {
              e.lat0 = l * mt;
            },
            lat_1: function(l) {
              e.lat1 = l * mt;
            },
            lat_2: function(l) {
              e.lat2 = l * mt;
            },
            lat_ts: function(l) {
              e.lat_ts = l * mt;
            },
            lon_0: function(l) {
              e.long0 = l * mt;
            },
            lon_1: function(l) {
              e.long1 = l * mt;
            },
            lon_2: function(l) {
              e.long2 = l * mt;
            },
            alpha: function(l) {
              e.alpha = parseFloat(l) * mt;
            },
            gamma: function(l) {
              e.rectified_grid_angle = parseFloat(l);
            },
            lonc: function(l) {
              e.longc = l * mt;
            },
            x_0: function(l) {
              e.x0 = parseFloat(l);
            },
            y_0: function(l) {
              e.y0 = parseFloat(l);
            },
            k_0: function(l) {
              e.k0 = parseFloat(l);
            },
            k: function(l) {
              e.k0 = parseFloat(l);
            },
            a: function(l) {
              e.a = parseFloat(l);
            },
            b: function(l) {
              e.b = parseFloat(l);
            },
            r_a: function() {
              e.R_A = !0;
            },
            zone: function(l) {
              e.zone = parseInt(l, 10);
            },
            south: function() {
              e.utmSouth = !0;
            },
            towgs84: function(l) {
              e.datum_params = l.split(",").map(function(w) {
                return parseFloat(w);
              });
            },
            to_meter: function(l) {
              e.to_meter = parseFloat(l);
            },
            units: function(l) {
              e.units = l;
              var w = N(kt, l);
              w && (e.to_meter = w.to_meter);
            },
            from_greenwich: function(l) {
              e.from_greenwich = l * mt;
            },
            pm: function(l) {
              var w = N(Et, l);
              e.from_greenwich = (w || parseFloat(l)) * mt;
            },
            nadgrids: function(l) {
              l === "@null" ? e.datumCode = "none" : e.nadgrids = l;
            },
            axis: function(l) {
              var w = "ewnsud";
              l.length === 3 && w.indexOf(l.substr(0, 1)) !== -1 && w.indexOf(l.substr(1, 1)) !== -1 && w.indexOf(l.substr(2, 1)) !== -1 && (e.axis = l);
            },
            approx: function() {
              e.approx = !0;
            }
          };
          for (u in i)
            o = i[u], u in c ? (f = c[u], typeof f == "function" ? f(o) : e[f] = o) : e[u] = o;
          return typeof e.datumCode == "string" && e.datumCode !== "WGS84" && (e.datumCode = e.datumCode.toLowerCase()), e;
        }, V = 1, A = 2, S = 3, y = 4, k = 5, q = -1, Y = /\s/, X = /[A-Za-z]/, Q = /[A-Za-z84]/, _ = /[,\]]/, R = /[\d\.E\-\+]/;
        function B(t) {
          if (typeof t != "string")
            throw new Error("not a string");
          this.text = t.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = V;
        }
        B.prototype.readCharicter = function() {
          var t = this.text[this.place++];
          if (this.state !== y)
            for (; Y.test(t); ) {
              if (this.place >= this.text.length)
                return;
              t = this.text[this.place++];
            }
          switch (this.state) {
            case V:
              return this.neutral(t);
            case A:
              return this.keyword(t);
            case y:
              return this.quoted(t);
            case k:
              return this.afterquote(t);
            case S:
              return this.number(t);
            case q:
              return;
          }
        }, B.prototype.afterquote = function(t) {
          if (t === '"') {
            this.word += '"', this.state = y;
            return;
          }
          if (_.test(t)) {
            this.word = this.word.trim(), this.afterItem(t);
            return;
          }
          throw new Error(`havn't handled "` + t + '" in afterquote yet, index ' + this.place);
        }, B.prototype.afterItem = function(t) {
          if (t === ",") {
            this.word !== null && this.currentObject.push(this.word), this.word = null, this.state = V;
            return;
          }
          if (t === "]") {
            this.level--, this.word !== null && (this.currentObject.push(this.word), this.word = null), this.state = V, this.currentObject = this.stack.pop(), this.currentObject || (this.state = q);
            return;
          }
        }, B.prototype.number = function(t) {
          if (R.test(t)) {
            this.word += t;
            return;
          }
          if (_.test(t)) {
            this.word = parseFloat(this.word), this.afterItem(t);
            return;
          }
          throw new Error(`havn't handled "` + t + '" in number yet, index ' + this.place);
        }, B.prototype.quoted = function(t) {
          if (t === '"') {
            this.state = k;
            return;
          }
          this.word += t;
        }, B.prototype.keyword = function(t) {
          if (Q.test(t)) {
            this.word += t;
            return;
          }
          if (t === "[") {
            var e = [];
            e.push(this.word), this.level++, this.root === null ? this.root = e : this.currentObject.push(e), this.stack.push(this.currentObject), this.currentObject = e, this.state = V;
            return;
          }
          if (_.test(t)) {
            this.afterItem(t);
            return;
          }
          throw new Error(`havn't handled "` + t + '" in keyword yet, index ' + this.place);
        }, B.prototype.neutral = function(t) {
          if (X.test(t)) {
            this.word = t, this.state = A;
            return;
          }
          if (t === '"') {
            this.word = "", this.state = y;
            return;
          }
          if (R.test(t)) {
            this.word = t, this.state = S;
            return;
          }
          if (_.test(t)) {
            this.afterItem(t);
            return;
          }
          throw new Error(`havn't handled "` + t + '" in neutral yet, index ' + this.place);
        }, B.prototype.output = function() {
          for (; this.place < this.text.length; )
            this.readCharicter();
          if (this.state === q)
            return this.root;
          throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
        };
        function g(t) {
          var e = new B(t);
          return e.output();
        }
        function C(t, e, i) {
          Array.isArray(e) && (i.unshift(e), e = null);
          var u = e ? {} : t, o = i.reduce(function(f, c) {
            return T(c, f), f;
          }, u);
          e && (t[e] = o);
        }
        function T(t, e) {
          if (!Array.isArray(t)) {
            e[t] = !0;
            return;
          }
          var i = t.shift();
          if (i === "PARAMETER" && (i = t.shift()), t.length === 1) {
            if (Array.isArray(t[0])) {
              e[i] = {}, T(t[0], e[i]);
              return;
            }
            e[i] = t[0];
            return;
          }
          if (!t.length) {
            e[i] = !0;
            return;
          }
          if (i === "TOWGS84") {
            e[i] = t;
            return;
          }
          if (i === "AXIS") {
            i in e || (e[i] = []), e[i].push(t);
            return;
          }
          Array.isArray(i) || (e[i] = {});
          var u;
          switch (i) {
            case "UNIT":
            case "PRIMEM":
            case "VERT_DATUM":
              e[i] = {
                name: t[0].toLowerCase(),
                convert: t[1]
              }, t.length === 3 && T(t[2], e[i]);
              return;
            case "SPHEROID":
            case "ELLIPSOID":
              e[i] = {
                name: t[0],
                a: t[1],
                rf: t[2]
              }, t.length === 4 && T(t[3], e[i]);
              return;
            case "PROJECTEDCRS":
            case "PROJCRS":
            case "GEOGCS":
            case "GEOCCS":
            case "PROJCS":
            case "LOCAL_CS":
            case "GEODCRS":
            case "GEODETICCRS":
            case "GEODETICDATUM":
            case "EDATUM":
            case "ENGINEERINGDATUM":
            case "VERT_CS":
            case "VERTCRS":
            case "VERTICALCRS":
            case "COMPD_CS":
            case "COMPOUNDCRS":
            case "ENGINEERINGCRS":
            case "ENGCRS":
            case "FITTED_CS":
            case "LOCAL_DATUM":
            case "DATUM":
              t[0] = ["name", t[0]], C(e, i, t);
              return;
            default:
              for (u = -1; ++u < t.length; )
                if (!Array.isArray(t[u]))
                  return T(t, e[i]);
              return C(e, i, t);
          }
        }
        var at = 0.017453292519943295;
        function ut(t, e) {
          var i = e[0], u = e[1];
          !(i in t) && u in t && (t[i] = t[u], e.length === 3 && (t[i] = e[2](t[i])));
        }
        function et(t) {
          return t * at;
        }
        function Ft(t) {
          if (t.type === "GEOGCS" ? t.projName = "longlat" : t.type === "LOCAL_CS" ? (t.projName = "identity", t.local = !0) : typeof t.PROJECTION == "object" ? t.projName = Object.keys(t.PROJECTION)[0] : t.projName = t.PROJECTION, t.AXIS) {
            for (var e = "", i = 0, u = t.AXIS.length; i < u; ++i) {
              var o = [t.AXIS[i][0].toLowerCase(), t.AXIS[i][1].toLowerCase()];
              o[0].indexOf("north") !== -1 || (o[0] === "y" || o[0] === "lat") && o[1] === "north" ? e += "n" : o[0].indexOf("south") !== -1 || (o[0] === "y" || o[0] === "lat") && o[1] === "south" ? e += "s" : o[0].indexOf("east") !== -1 || (o[0] === "x" || o[0] === "lon") && o[1] === "east" ? e += "e" : (o[0].indexOf("west") !== -1 || (o[0] === "x" || o[0] === "lon") && o[1] === "west") && (e += "w");
            }
            e.length === 2 && (e += "u"), e.length === 3 && (t.axis = e);
          }
          t.UNIT && (t.units = t.UNIT.name.toLowerCase(), t.units === "metre" && (t.units = "meter"), t.UNIT.convert && (t.type === "GEOGCS" ? t.DATUM && t.DATUM.SPHEROID && (t.to_meter = t.UNIT.convert * t.DATUM.SPHEROID.a) : t.to_meter = t.UNIT.convert));
          var f = t.GEOGCS;
          t.type === "GEOGCS" && (f = t), f && (f.DATUM ? t.datumCode = f.DATUM.name.toLowerCase() : t.datumCode = f.name.toLowerCase(), t.datumCode.slice(0, 2) === "d_" && (t.datumCode = t.datumCode.slice(2)), (t.datumCode === "new_zealand_geodetic_datum_1949" || t.datumCode === "new_zealand_1949") && (t.datumCode = "nzgd49"), (t.datumCode === "wgs_1984" || t.datumCode === "world_geodetic_system_1984") && (t.PROJECTION === "Mercator_Auxiliary_Sphere" && (t.sphere = !0), t.datumCode = "wgs84"), t.datumCode.slice(-6) === "_ferro" && (t.datumCode = t.datumCode.slice(0, -6)), t.datumCode.slice(-8) === "_jakarta" && (t.datumCode = t.datumCode.slice(0, -8)), ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"), f.DATUM && f.DATUM.SPHEROID && (t.ellps = f.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), t.ellps.toLowerCase().slice(0, 13) === "international" && (t.ellps = "intl"), t.a = f.DATUM.SPHEROID.a, t.rf = parseFloat(f.DATUM.SPHEROID.rf, 10)), f.DATUM && f.DATUM.TOWGS84 && (t.datum_params = f.DATUM.TOWGS84), ~t.datumCode.indexOf("osgb_1936") && (t.datumCode = "osgb36"), ~t.datumCode.indexOf("osni_1952") && (t.datumCode = "osni52"), (~t.datumCode.indexOf("tm65") || ~t.datumCode.indexOf("geodetic_datum_of_1965")) && (t.datumCode = "ire65"), t.datumCode === "ch1903+" && (t.datumCode = "ch1903"), ~t.datumCode.indexOf("israel") && (t.datumCode = "isr93")), t.b && !isFinite(t.b) && (t.b = t.a);
          function c(L) {
            var pt = t.to_meter || 1;
            return L * pt;
          }
          var l = function(L) {
            return ut(t, L);
          }, w = [
            ["standard_parallel_1", "Standard_Parallel_1"],
            ["standard_parallel_1", "Latitude of 1st standard parallel"],
            ["standard_parallel_2", "Standard_Parallel_2"],
            ["standard_parallel_2", "Latitude of 2nd standard parallel"],
            ["false_easting", "False_Easting"],
            ["false_easting", "False easting"],
            ["false-easting", "Easting at false origin"],
            ["false_northing", "False_Northing"],
            ["false_northing", "False northing"],
            ["false_northing", "Northing at false origin"],
            ["central_meridian", "Central_Meridian"],
            ["central_meridian", "Longitude of natural origin"],
            ["central_meridian", "Longitude of false origin"],
            ["latitude_of_origin", "Latitude_Of_Origin"],
            ["latitude_of_origin", "Central_Parallel"],
            ["latitude_of_origin", "Latitude of natural origin"],
            ["latitude_of_origin", "Latitude of false origin"],
            ["scale_factor", "Scale_Factor"],
            ["k0", "scale_factor"],
            ["latitude_of_center", "Latitude_Of_Center"],
            ["latitude_of_center", "Latitude_of_center"],
            ["lat0", "latitude_of_center", et],
            ["longitude_of_center", "Longitude_Of_Center"],
            ["longitude_of_center", "Longitude_of_center"],
            ["longc", "longitude_of_center", et],
            ["x0", "false_easting", c],
            ["y0", "false_northing", c],
            ["long0", "central_meridian", et],
            ["lat0", "latitude_of_origin", et],
            ["lat0", "standard_parallel_1", et],
            ["lat1", "standard_parallel_1", et],
            ["lat2", "standard_parallel_2", et],
            ["azimuth", "Azimuth"],
            ["alpha", "azimuth", et],
            ["srsCode", "name"]
          ];
          w.forEach(l), !t.long0 && t.longc && (t.projName === "Albers_Conic_Equal_Area" || t.projName === "Lambert_Azimuthal_Equal_Area") && (t.long0 = t.longc), !t.lat_ts && t.lat1 && (t.projName === "Stereographic_South_Pole" || t.projName === "Polar Stereographic (variant B)") && (t.lat0 = et(t.lat1 > 0 ? 90 : -90), t.lat_ts = t.lat1);
        }
        var At = function(t) {
          var e = g(t), i = e.shift(), u = e.shift();
          e.unshift(["name", u]), e.unshift(["type", i]);
          var o = {};
          return T(e, o), Ft(o), o;
        };
        function Bt(t) {
          var e = this;
          if (arguments.length === 2) {
            var i = arguments[1];
            typeof i == "string" ? i.charAt(0) === "+" ? Bt[t] = yt(arguments[1]) : Bt[t] = At(arguments[1]) : Bt[t] = i;
          } else if (arguments.length === 1) {
            if (Array.isArray(t))
              return t.map(function(u) {
                Array.isArray(u) ? Bt.apply(e, u) : Bt(u);
              });
            if (typeof t == "string") {
              if (t in Bt)
                return Bt[t];
            } else
              "EPSG" in t ? Bt["EPSG:" + t.EPSG] = t : "ESRI" in t ? Bt["ESRI:" + t.ESRI] = t : "IAU2000" in t ? Bt["IAU2000:" + t.IAU2000] = t : console.log(t);
            return;
          }
        }
        nt(Bt);
        function gt(t) {
          return typeof t == "string";
        }
        function zt(t) {
          return t in Bt;
        }
        var Gt = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
        function U(t) {
          return Gt.some(function(e) {
            return t.indexOf(e) > -1;
          });
        }
        var _t = ["3857", "900913", "3785", "102113"];
        function n(t) {
          var e = N(t, "authority");
          if (e) {
            var i = N(e, "epsg");
            return i && _t.indexOf(i) > -1;
          }
        }
        function r(t) {
          var e = N(t, "extension");
          if (e)
            return N(e, "proj4");
        }
        function a(t) {
          return t[0] === "+";
        }
        function s(t) {
          if (gt(t)) {
            if (zt(t))
              return Bt[t];
            if (U(t)) {
              var e = At(t);
              if (n(e))
                return Bt["EPSG:3857"];
              var i = r(e);
              return i ? yt(i) : e;
            }
            if (a(t))
              return yt(t);
          } else
            return t;
        }
        var p = function(t, e) {
          t = t || {};
          var i, u;
          if (!e)
            return t;
          for (u in e)
            i = e[u], i !== void 0 && (t[u] = i);
          return t;
        }, d = function(t, e, i) {
          var u = t * e;
          return i / Math.sqrt(1 - u * u);
        }, F = function(t) {
          return t < 0 ? -1 : 1;
        }, v = function(t) {
          return Math.abs(t) <= lt ? t : t - F(t) * $;
        }, G = function(t, e, i) {
          var u = t * i, o = 0.5 * t;
          return u = Math.pow((1 - u) / (1 + u), o), Math.tan(0.5 * (W - e)) / u;
        }, wt = function(t, e) {
          for (var i = 0.5 * t, u, o, f = W - 2 * Math.atan(e), c = 0; c <= 15; c++)
            if (u = t * Math.sin(f), o = W - 2 * Math.atan(e * Math.pow((1 - u) / (1 + u), i)) - f, f += o, Math.abs(o) <= 1e-10)
              return f;
          return -9999;
        };
        function E() {
          var t = this.b / this.a;
          this.es = 1 - t * t, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = d(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
        }
        function D(t) {
          var e = t.x, i = t.y;
          if (i * ft > 90 && i * ft < -90 && e * ft > 180 && e * ft < -180)
            return null;
          var u, o;
          if (Math.abs(Math.abs(i) - W) <= H)
            return null;
          if (this.sphere)
            u = this.x0 + this.a * this.k0 * v(e - this.long0), o = this.y0 + this.a * this.k0 * Math.log(Math.tan(P + 0.5 * i));
          else {
            var f = Math.sin(i), c = G(this.e, i, f);
            u = this.x0 + this.a * this.k0 * v(e - this.long0), o = this.y0 - this.a * this.k0 * Math.log(c);
          }
          return t.x = u, t.y = o, t;
        }
        function h(t) {
          var e = t.x - this.x0, i = t.y - this.y0, u, o;
          if (this.sphere)
            o = W - 2 * Math.atan(Math.exp(-i / (this.a * this.k0)));
          else {
            var f = Math.exp(-i / (this.a * this.k0));
            if (o = wt(this.e, f), o === -9999)
              return null;
          }
          return u = v(this.long0 + e / (this.a * this.k0)), t.x = u, t.y = o, t;
        }
        var it = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"], z = {
          init: E,
          forward: D,
          inverse: h,
          names: it
        };
        function x() {
        }
        function It(t) {
          return t;
        }
        var Mt = ["longlat", "identity"], Nt = {
          init: x,
          forward: It,
          inverse: It,
          names: Mt
        }, Rt = [z, Nt], Ct = {}, Lt = [];
        function $t(t, e) {
          var i = Lt.length;
          return t.names ? (Lt[i] = t, t.names.forEach(function(u) {
            Ct[u.toLowerCase()] = i;
          }), this) : (console.log(e), !0);
        }
        function jt(t) {
          if (!t)
            return !1;
          var e = t.toLowerCase();
          if (typeof Ct[e] < "u" && Lt[Ct[e]])
            return Lt[Ct[e]];
        }
        function Jt() {
          Rt.forEach($t);
        }
        var Wt = {
          start: Jt,
          add: $t,
          get: jt
        }, Dt = {};
        Dt.MERIT = {
          a: 6378137,
          rf: 298.257,
          ellipseName: "MERIT 1983"
        }, Dt.SGS85 = {
          a: 6378136,
          rf: 298.257,
          ellipseName: "Soviet Geodetic System 85"
        }, Dt.GRS80 = {
          a: 6378137,
          rf: 298.257222101,
          ellipseName: "GRS 1980(IUGG, 1980)"
        }, Dt.IAU76 = {
          a: 6378140,
          rf: 298.257,
          ellipseName: "IAU 1976"
        }, Dt.airy = {
          a: 6377563396e-3,
          b: 635625691e-2,
          ellipseName: "Airy 1830"
        }, Dt.APL4 = {
          a: 6378137,
          rf: 298.25,
          ellipseName: "Appl. Physics. 1965"
        }, Dt.NWL9D = {
          a: 6378145,
          rf: 298.25,
          ellipseName: "Naval Weapons Lab., 1965"
        }, Dt.mod_airy = {
          a: 6377340189e-3,
          b: 6356034446e-3,
          ellipseName: "Modified Airy"
        }, Dt.andrae = {
          a: 637710443e-2,
          rf: 300,
          ellipseName: "Andrae 1876 (Den., Iclnd.)"
        }, Dt.aust_SA = {
          a: 6378160,
          rf: 298.25,
          ellipseName: "Australian Natl & S. Amer. 1969"
        }, Dt.GRS67 = {
          a: 6378160,
          rf: 298.247167427,
          ellipseName: "GRS 67(IUGG 1967)"
        }, Dt.bessel = {
          a: 6377397155e-3,
          rf: 299.1528128,
          ellipseName: "Bessel 1841"
        }, Dt.bess_nam = {
          a: 6377483865e-3,
          rf: 299.1528128,
          ellipseName: "Bessel 1841 (Namibia)"
        }, Dt.clrk66 = {
          a: 63782064e-1,
          b: 63565838e-1,
          ellipseName: "Clarke 1866"
        }, Dt.clrk80 = {
          a: 6378249145e-3,
          rf: 293.4663,
          ellipseName: "Clarke 1880 mod."
        }, Dt.clrk58 = {
          a: 6378293645208759e-9,
          rf: 294.2606763692654,
          ellipseName: "Clarke 1858"
        }, Dt.CPM = {
          a: 63757387e-1,
          rf: 334.29,
          ellipseName: "Comm. des Poids et Mesures 1799"
        }, Dt.delmbr = {
          a: 6376428,
          rf: 311.5,
          ellipseName: "Delambre 1810 (Belgium)"
        }, Dt.engelis = {
          a: 637813605e-2,
          rf: 298.2566,
          ellipseName: "Engelis 1985"
        }, Dt.evrst30 = {
          a: 6377276345e-3,
          rf: 300.8017,
          ellipseName: "Everest 1830"
        }, Dt.evrst48 = {
          a: 6377304063e-3,
          rf: 300.8017,
          ellipseName: "Everest 1948"
        }, Dt.evrst56 = {
          a: 6377301243e-3,
          rf: 300.8017,
          ellipseName: "Everest 1956"
        }, Dt.evrst69 = {
          a: 6377295664e-3,
          rf: 300.8017,
          ellipseName: "Everest 1969"
        }, Dt.evrstSS = {
          a: 6377298556e-3,
          rf: 300.8017,
          ellipseName: "Everest (Sabah & Sarawak)"
        }, Dt.fschr60 = {
          a: 6378166,
          rf: 298.3,
          ellipseName: "Fischer (Mercury Datum) 1960"
        }, Dt.fschr60m = {
          a: 6378155,
          rf: 298.3,
          ellipseName: "Fischer 1960"
        }, Dt.fschr68 = {
          a: 6378150,
          rf: 298.3,
          ellipseName: "Fischer 1968"
        }, Dt.helmert = {
          a: 6378200,
          rf: 298.3,
          ellipseName: "Helmert 1906"
        }, Dt.hough = {
          a: 6378270,
          rf: 297,
          ellipseName: "Hough"
        }, Dt.intl = {
          a: 6378388,
          rf: 297,
          ellipseName: "International 1909 (Hayford)"
        }, Dt.kaula = {
          a: 6378163,
          rf: 298.24,
          ellipseName: "Kaula 1961"
        }, Dt.lerch = {
          a: 6378139,
          rf: 298.257,
          ellipseName: "Lerch 1979"
        }, Dt.mprts = {
          a: 6397300,
          rf: 191,
          ellipseName: "Maupertius 1738"
        }, Dt.new_intl = {
          a: 63781575e-1,
          b: 63567722e-1,
          ellipseName: "New International 1967"
        }, Dt.plessis = {
          a: 6376523,
          rf: 6355863,
          ellipseName: "Plessis 1817 (France)"
        }, Dt.krass = {
          a: 6378245,
          rf: 298.3,
          ellipseName: "Krassovsky, 1942"
        }, Dt.SEasia = {
          a: 6378155,
          b: 63567733205e-4,
          ellipseName: "Southeast Asia"
        }, Dt.walbeck = {
          a: 6376896,
          b: 63558348467e-4,
          ellipseName: "Walbeck"
        }, Dt.WGS60 = {
          a: 6378165,
          rf: 298.3,
          ellipseName: "WGS 60"
        }, Dt.WGS66 = {
          a: 6378145,
          rf: 298.25,
          ellipseName: "WGS 66"
        }, Dt.WGS7 = {
          a: 6378135,
          rf: 298.26,
          ellipseName: "WGS 72"
        };
        var Pe = Dt.WGS84 = {
          a: 6378137,
          rf: 298.257223563,
          ellipseName: "WGS 84"
        };
        Dt.sphere = {
          a: 6370997,
          b: 6370997,
          ellipseName: "Normal Sphere (r=6370997)"
        };
        function fe(t, e, i, u) {
          var o = t * t, f = e * e, c = (o - f) / o, l = 0;
          u ? (t *= 1 - c * (xt + c * (j + c * ht)), o = t * t, c = 0) : l = Math.sqrt(c);
          var w = (o - f) / f;
          return {
            es: c,
            e: l,
            ep2: w
          };
        }
        function We(t, e, i, u, o) {
          if (!t) {
            var f = N(Dt, u);
            f || (f = Pe), t = f.a, e = f.b, i = f.rf;
          }
          return i && !e && (e = (1 - 1 / i) * t), (i === 0 || Math.abs(t - e) < H) && (o = !0, e = t), {
            a: t,
            b: e,
            rf: i,
            sphere: o
          };
        }
        var re = {};
        re.wgs84 = {
          towgs84: "0,0,0",
          ellipse: "WGS84",
          datumName: "WGS84"
        }, re.ch1903 = {
          towgs84: "674.374,15.056,405.346",
          ellipse: "bessel",
          datumName: "swiss"
        }, re.ggrs87 = {
          towgs84: "-199.87,74.79,246.62",
          ellipse: "GRS80",
          datumName: "Greek_Geodetic_Reference_System_1987"
        }, re.nad83 = {
          towgs84: "0,0,0",
          ellipse: "GRS80",
          datumName: "North_American_Datum_1983"
        }, re.nad27 = {
          nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
          ellipse: "clrk66",
          datumName: "North_American_Datum_1927"
        }, re.potsdam = {
          towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
          ellipse: "bessel",
          datumName: "Potsdam Rauenberg 1950 DHDN"
        }, re.carthage = {
          towgs84: "-263.0,6.0,431.0",
          ellipse: "clark80",
          datumName: "Carthage 1934 Tunisia"
        }, re.hermannskogel = {
          towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
          ellipse: "bessel",
          datumName: "Hermannskogel"
        }, re.osni52 = {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "airy",
          datumName: "Irish National"
        }, re.ire65 = {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "mod_airy",
          datumName: "Ireland 1965"
        }, re.rassadiran = {
          towgs84: "-133.63,-157.5,-158.62",
          ellipse: "intl",
          datumName: "Rassadiran"
        }, re.nzgd49 = {
          towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
          ellipse: "intl",
          datumName: "New Zealand Geodetic Datum 1949"
        }, re.osgb36 = {
          towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
          ellipse: "airy",
          datumName: "Airy 1830"
        }, re.s_jtsk = {
          towgs84: "589,76,480",
          ellipse: "bessel",
          datumName: "S-JTSK (Ferro)"
        }, re.beduaram = {
          towgs84: "-106,-87,188",
          ellipse: "clrk80",
          datumName: "Beduaram"
        }, re.gunung_segara = {
          towgs84: "-403,684,41",
          ellipse: "bessel",
          datumName: "Gunung Segara Jakarta"
        }, re.rnb72 = {
          towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
          ellipse: "intl",
          datumName: "Reseau National Belge 1972"
        };
        function ur(t, e, i, u, o, f, c) {
          var l = {};
          return t === void 0 || t === "none" ? l.datum_type = M : l.datum_type = J, e && (l.datum_params = e.map(parseFloat), (l.datum_params[0] !== 0 || l.datum_params[1] !== 0 || l.datum_params[2] !== 0) && (l.datum_type = O), l.datum_params.length > 3 && (l.datum_params[3] !== 0 || l.datum_params[4] !== 0 || l.datum_params[5] !== 0 || l.datum_params[6] !== 0) && (l.datum_type = dt, l.datum_params[3] *= tt, l.datum_params[4] *= tt, l.datum_params[5] *= tt, l.datum_params[6] = l.datum_params[6] / 1e6 + 1)), c && (l.datum_type = vt, l.grids = c), l.a = i, l.b = u, l.es = o, l.ep2 = f, l;
        }
        var qe = {};
        function $e(t, e) {
          var i = new DataView(e), u = ci(i), o = di(i, u);
          o.nSubgrids > 1 && console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored");
          var f = pi(i, o, u), c = { header: o, subgrids: f };
          return qe[t] = c, c;
        }
        function we(t) {
          if (t === void 0)
            return null;
          var e = t.split(",");
          return e.map(Ae);
        }
        function Ae(t) {
          if (t.length === 0)
            return null;
          var e = t[0] === "@";
          return e && (t = t.slice(1)), t === "null" ? { name: "null", mandatory: !e, grid: null, isNull: !0 } : {
            name: t,
            mandatory: !e,
            grid: qe[t] || null,
            isNull: !1
          };
        }
        function Ce(t) {
          return t / 3600 * Math.PI / 180;
        }
        function ci(t) {
          var e = t.getInt32(8, !1);
          return e === 11 ? !1 : (e = t.getInt32(8, !0), e !== 11 && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0);
        }
        function di(t, e) {
          return {
            nFields: t.getInt32(8, e),
            nSubgridFields: t.getInt32(24, e),
            nSubgrids: t.getInt32(40, e),
            shiftType: lr(t, 56, 64).trim(),
            fromSemiMajorAxis: t.getFloat64(120, e),
            fromSemiMinorAxis: t.getFloat64(136, e),
            toSemiMajorAxis: t.getFloat64(152, e),
            toSemiMinorAxis: t.getFloat64(168, e)
          };
        }
        function lr(t, e, i) {
          return String.fromCharCode.apply(null, new Uint8Array(t.buffer.slice(e, i)));
        }
        function pi(t, e, i) {
          for (var u = 176, o = [], f = 0; f < e.nSubgrids; f++) {
            var c = vi(t, u, i), l = yi(t, u, c, i), w = Math.round(
              1 + (c.upperLongitude - c.lowerLongitude) / c.longitudeInterval
            ), L = Math.round(
              1 + (c.upperLatitude - c.lowerLatitude) / c.latitudeInterval
            );
            o.push({
              ll: [Ce(c.lowerLongitude), Ce(c.lowerLatitude)],
              del: [Ce(c.longitudeInterval), Ce(c.latitudeInterval)],
              lim: [w, L],
              count: c.gridNodeCount,
              cvs: mi(l)
            });
          }
          return o;
        }
        function mi(t) {
          return t.map(function(e) {
            return [Ce(e.longitudeShift), Ce(e.latitudeShift)];
          });
        }
        function vi(t, e, i) {
          return {
            name: lr(t, e + 8, e + 16).trim(),
            parent: lr(t, e + 24, e + 24 + 8).trim(),
            lowerLatitude: t.getFloat64(e + 72, i),
            upperLatitude: t.getFloat64(e + 88, i),
            lowerLongitude: t.getFloat64(e + 104, i),
            upperLongitude: t.getFloat64(e + 120, i),
            latitudeInterval: t.getFloat64(e + 136, i),
            longitudeInterval: t.getFloat64(e + 152, i),
            gridNodeCount: t.getInt32(e + 168, i)
          };
        }
        function yi(t, e, i, u) {
          for (var o = e + 176, f = 16, c = [], l = 0; l < i.gridNodeCount; l++) {
            var w = {
              latitudeShift: t.getFloat32(o + l * f, u),
              longitudeShift: t.getFloat32(o + l * f + 4, u),
              latitudeAccuracy: t.getFloat32(o + l * f + 8, u),
              longitudeAccuracy: t.getFloat32(o + l * f + 12, u)
            };
            c.push(w);
          }
          return c;
        }
        function de(t, e) {
          if (!(this instanceof de))
            return new de(t);
          e = e || function(L) {
            if (L)
              throw L;
          };
          var i = s(t);
          if (typeof i != "object") {
            e(t);
            return;
          }
          var u = de.projections.get(i.projName);
          if (!u) {
            e(t);
            return;
          }
          if (i.datumCode && i.datumCode !== "none") {
            var o = N(re, i.datumCode);
            o && (i.datum_params = i.datum_params || (o.towgs84 ? o.towgs84.split(",") : null), i.ellps = o.ellipse, i.datumName = o.datumName ? o.datumName : i.datumCode);
          }
          i.k0 = i.k0 || 1, i.axis = i.axis || "enu", i.ellps = i.ellps || "wgs84", i.lat1 = i.lat1 || i.lat0;
          var f = We(i.a, i.b, i.rf, i.ellps, i.sphere), c = fe(f.a, f.b, f.rf, i.R_A), l = we(i.nadgrids), w = i.datum || ur(
            i.datumCode,
            i.datum_params,
            f.a,
            f.b,
            c.es,
            c.ep2,
            l
          );
          p(this, i), p(this, u), this.a = f.a, this.b = f.b, this.rf = f.rf, this.sphere = f.sphere, this.es = c.es, this.e = c.e, this.ep2 = c.ep2, this.datum = w, this.init(), e(null, this);
        }
        de.projections = Wt, de.projections.start();
        function gi(t, e) {
          return t.datum_type !== e.datum_type || t.a !== e.a || Math.abs(t.es - e.es) > 5e-11 ? !1 : t.datum_type === O ? t.datum_params[0] === e.datum_params[0] && t.datum_params[1] === e.datum_params[1] && t.datum_params[2] === e.datum_params[2] : t.datum_type === dt ? t.datum_params[0] === e.datum_params[0] && t.datum_params[1] === e.datum_params[1] && t.datum_params[2] === e.datum_params[2] && t.datum_params[3] === e.datum_params[3] && t.datum_params[4] === e.datum_params[4] && t.datum_params[5] === e.datum_params[5] && t.datum_params[6] === e.datum_params[6] : !0;
        }
        function br(t, e, i) {
          var u = t.x, o = t.y, f = t.z ? t.z : 0, c, l, w, L;
          if (o < -W && o > -1.001 * W)
            o = -W;
          else if (o > W && o < 1.001 * W)
            o = W;
          else {
            if (o < -W)
              return { x: -1 / 0, y: -1 / 0, z: t.z };
            if (o > W)
              return { x: 1 / 0, y: 1 / 0, z: t.z };
          }
          return u > Math.PI && (u -= 2 * Math.PI), l = Math.sin(o), L = Math.cos(o), w = l * l, c = i / Math.sqrt(1 - e * w), {
            x: (c + f) * L * Math.cos(u),
            y: (c + f) * L * Math.sin(u),
            z: (c * (1 - e) + f) * l
          };
        }
        function Er(t, e, i, u) {
          var o = 1e-12, f = o * o, c = 30, l, w, L, pt, st, bt, Tt, St, Ot, Pt, Ut, Zt, Xt, Yt = t.x, Vt = t.y, Qt = t.z ? t.z : 0, se, ee, pe;
          if (l = Math.sqrt(Yt * Yt + Vt * Vt), w = Math.sqrt(Yt * Yt + Vt * Vt + Qt * Qt), l / i < o) {
            if (se = 0, w / i < o)
              return ee = W, pe = -u, {
                x: t.x,
                y: t.y,
                z: t.z
              };
          } else
            se = Math.atan2(Vt, Yt);
          L = Qt / w, pt = l / w, st = 1 / Math.sqrt(1 - e * (2 - e) * pt * pt), St = pt * (1 - e) * st, Ot = L * st, Xt = 0;
          do
            Xt++, Tt = i / Math.sqrt(1 - e * Ot * Ot), pe = l * St + Qt * Ot - Tt * (1 - e * Ot * Ot), bt = e * Tt / (Tt + pe), st = 1 / Math.sqrt(1 - bt * (2 - bt) * pt * pt), Pt = pt * (1 - bt) * st, Ut = L * st, Zt = Ut * St - Pt * Ot, St = Pt, Ot = Ut;
          while (Zt * Zt > f && Xt < c);
          return ee = Math.atan(Ut / Math.abs(Pt)), {
            x: se,
            y: ee,
            z: pe
          };
        }
        function _i(t, e, i) {
          if (e === O)
            return {
              x: t.x + i[0],
              y: t.y + i[1],
              z: t.z + i[2]
            };
          if (e === dt) {
            var u = i[0], o = i[1], f = i[2], c = i[3], l = i[4], w = i[5], L = i[6];
            return {
              x: L * (t.x - w * t.y + l * t.z) + u,
              y: L * (w * t.x + t.y - c * t.z) + o,
              z: L * (-l * t.x + c * t.y + t.z) + f
            };
          }
        }
        function xi(t, e, i) {
          if (e === O)
            return {
              x: t.x - i[0],
              y: t.y - i[1],
              z: t.z - i[2]
            };
          if (e === dt) {
            var u = i[0], o = i[1], f = i[2], c = i[3], l = i[4], w = i[5], L = i[6], pt = (t.x - u) / L, st = (t.y - o) / L, bt = (t.z - f) / L;
            return {
              x: pt + w * st - l * bt,
              y: -w * pt + st + c * bt,
              z: l * pt - c * st + bt
            };
          }
        }
        function Ze(t) {
          return t === O || t === dt;
        }
        var wi = function(t, e, i) {
          if (gi(t, e) || t.datum_type === M || e.datum_type === M)
            return i;
          var u = t.a, o = t.es;
          if (t.datum_type === vt) {
            var f = Ar(t, !1, i);
            if (f !== 0)
              return;
            u = m, o = K;
          }
          var c = e.a, l = e.b, w = e.es;
          if (e.datum_type === vt && (c = m, l = ot, w = K), o === w && u === c && !Ze(t.datum_type) && !Ze(e.datum_type))
            return i;
          if (i = br(i, o, u), Ze(t.datum_type) && (i = _i(i, t.datum_type, t.datum_params)), Ze(e.datum_type) && (i = xi(i, e.datum_type, e.datum_params)), i = Er(i, w, c, l), e.datum_type === vt) {
            var L = Ar(e, !0, i);
            if (L !== 0)
              return;
          }
          return i;
        };
        function Ar(t, e, i) {
          if (t.grids === null || t.grids.length === 0)
            return console.log("Grid shift grids not found"), -1;
          for (var u = { x: -i.x, y: i.y }, o = { x: Number.NaN, y: Number.NaN }, f = [], c = 0; c < t.grids.length; c++) {
            var l = t.grids[c];
            if (f.push(l.name), l.isNull) {
              o = u;
              break;
            }
            if (l.grid === null) {
              if (l.mandatory)
                return console.log("Unable to find mandatory grid '" + l.name + "'"), -1;
              continue;
            }
            var w = l.grid.subgrids[0], L = (Math.abs(w.del[1]) + Math.abs(w.del[0])) / 1e4, pt = w.ll[0] - L, st = w.ll[1] - L, bt = w.ll[0] + (w.lim[0] - 1) * w.del[0] + L, Tt = w.ll[1] + (w.lim[1] - 1) * w.del[1] + L;
            if (!(st > u.y || pt > u.x || Tt < u.y || bt < u.x) && (o = Mi(u, e, w), !isNaN(o.x)))
              break;
          }
          return isNaN(o.x) ? (console.log("Failed to find a grid shift table for location '" + -u.x * ft + " " + u.y * ft + " tried: '" + f + "'"), -1) : (i.x = -o.x, i.y = o.y, 0);
        }
        function Mi(t, e, i) {
          var u = { x: Number.NaN, y: Number.NaN };
          if (isNaN(t.x))
            return u;
          var o = { x: t.x, y: t.y };
          o.x -= i.ll[0], o.y -= i.ll[1], o.x = v(o.x - Math.PI) + Math.PI;
          var f = Cr(o, i);
          if (e) {
            if (isNaN(f.x))
              return u;
            f.x = o.x - f.x, f.y = o.y - f.y;
            var c = 9, l = 1e-12, w, L;
            do {
              if (L = Cr(f, i), isNaN(L.x)) {
                console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
                break;
              }
              w = { x: o.x - (L.x + f.x), y: o.y - (L.y + f.y) }, f.x += w.x, f.y += w.y;
            } while (c-- && Math.abs(w.x) > l && Math.abs(w.y) > l);
            if (c < 0)
              return console.log("Inverse grid shift iterator failed to converge."), u;
            u.x = v(f.x + i.ll[0]), u.y = f.y + i.ll[1];
          } else
            isNaN(f.x) || (u.x = t.x + f.x, u.y = t.y + f.y);
          return u;
        }
        function Cr(t, e) {
          var i = { x: t.x / e.del[0], y: t.y / e.del[1] }, u = { x: Math.floor(i.x), y: Math.floor(i.y) }, o = { x: i.x - 1 * u.x, y: i.y - 1 * u.y }, f = { x: Number.NaN, y: Number.NaN }, c;
          if (u.x < 0 || u.x >= e.lim[0] || u.y < 0 || u.y >= e.lim[1])
            return f;
          c = u.y * e.lim[0] + u.x;
          var l = { x: e.cvs[c][0], y: e.cvs[c][1] };
          c++;
          var w = { x: e.cvs[c][0], y: e.cvs[c][1] };
          c += e.lim[0];
          var L = { x: e.cvs[c][0], y: e.cvs[c][1] };
          c--;
          var pt = { x: e.cvs[c][0], y: e.cvs[c][1] }, st = o.x * o.y, bt = o.x * (1 - o.y), Tt = (1 - o.x) * (1 - o.y), St = (1 - o.x) * o.y;
          return f.x = Tt * l.x + bt * w.x + St * pt.x + st * L.x, f.y = Tt * l.y + bt * w.y + St * pt.y + st * L.y, f;
        }
        var Sr = function(t, e, i) {
          var u = i.x, o = i.y, f = i.z || 0, c, l, w, L = {};
          for (w = 0; w < 3; w++)
            if (!(e && w === 2 && i.z === void 0))
              switch (w === 0 ? (c = u, "ew".indexOf(t.axis[w]) !== -1 ? l = "x" : l = "y") : w === 1 ? (c = o, "ns".indexOf(t.axis[w]) !== -1 ? l = "y" : l = "x") : (c = f, l = "z"), t.axis[w]) {
                case "e":
                  L[l] = c;
                  break;
                case "w":
                  L[l] = -c;
                  break;
                case "n":
                  L[l] = c;
                  break;
                case "s":
                  L[l] = -c;
                  break;
                case "u":
                  i[l] !== void 0 && (L.z = c);
                  break;
                case "d":
                  i[l] !== void 0 && (L.z = -c);
                  break;
                default:
                  return null;
              }
          return L;
        }, kr = function(t) {
          var e = {
            x: t[0],
            y: t[1]
          };
          return t.length > 2 && (e.z = t[2]), t.length > 3 && (e.m = t[3]), e;
        }, bi = function(t) {
          Ir(t.x), Ir(t.y);
        };
        function Ir(t) {
          if (typeof Number.isFinite == "function") {
            if (Number.isFinite(t))
              return;
            throw new TypeError("coordinates must be finite numbers");
          }
          if (typeof t != "number" || t !== t || !isFinite(t))
            throw new TypeError("coordinates must be finite numbers");
        }
        function Ei(t, e) {
          return (t.datum.datum_type === O || t.datum.datum_type === dt) && e.datumCode !== "WGS84" || (e.datum.datum_type === O || e.datum.datum_type === dt) && t.datumCode !== "WGS84";
        }
        function He(t, e, i) {
          var u;
          if (Array.isArray(i) && (i = kr(i)), bi(i), t.datum && e.datum && Ei(t, e) && (u = new de("WGS84"), i = He(t, u, i), t = u), t.axis !== "enu" && (i = Sr(t, !1, i)), t.projName === "longlat")
            i = {
              x: i.x * mt,
              y: i.y * mt,
              z: i.z || 0
            };
          else if (t.to_meter && (i = {
            x: i.x * t.to_meter,
            y: i.y * t.to_meter,
            z: i.z || 0
          }), i = t.inverse(i), !i)
            return;
          if (t.from_greenwich && (i.x += t.from_greenwich), i = wi(t.datum, e.datum, i), !!i)
            return e.from_greenwich && (i = {
              x: i.x - e.from_greenwich,
              y: i.y,
              z: i.z || 0
            }), e.projName === "longlat" ? i = {
              x: i.x * ft,
              y: i.y * ft,
              z: i.z || 0
            } : (i = e.forward(i), e.to_meter && (i = {
              x: i.x / e.to_meter,
              y: i.y / e.to_meter,
              z: i.z || 0
            })), e.axis !== "enu" ? Sr(e, !0, i) : i;
        }
        var Tr = de("WGS84");
        function fr(t, e, i) {
          var u, o, f;
          return Array.isArray(i) ? (u = He(t, e, i) || { x: NaN, y: NaN }, i.length > 2 ? typeof t.name < "u" && t.name === "geocent" || typeof e.name < "u" && e.name === "geocent" ? typeof u.z == "number" ? [u.x, u.y, u.z].concat(i.splice(3)) : [u.x, u.y, i[2]].concat(i.splice(3)) : [u.x, u.y].concat(i.splice(2)) : [u.x, u.y]) : (o = He(t, e, i), f = Object.keys(i), f.length === 2 || f.forEach(function(c) {
            if (typeof t.name < "u" && t.name === "geocent" || typeof e.name < "u" && e.name === "geocent") {
              if (c === "x" || c === "y" || c === "z")
                return;
            } else if (c === "x" || c === "y")
              return;
            o[c] = i[c];
          }), o);
        }
        function Fr(t) {
          return t instanceof de ? t : t.oProj ? t.oProj : de(t);
        }
        function ue(t, e, i) {
          t = Fr(t);
          var u = !1, o;
          return typeof e > "u" ? (e = t, t = Tr, u = !0) : (typeof e.x < "u" || Array.isArray(e)) && (i = e, e = t, t = Tr, u = !0), e = Fr(e), i ? fr(t, e, i) : (o = {
            forward: function(f) {
              return fr(t, e, f);
            },
            inverse: function(f) {
              return fr(e, t, f);
            }
          }, u && (o.oProj = e), o);
        }
        var Br = 6, Or = "AJSAJS", Pr = "AFAFAF", Se = 65, he = 73, le = 79, Ne = 86, Re = 90, Ai = {
          forward: Nr,
          inverse: Ci,
          toPoint: Rr
        };
        function Nr(t, e) {
          return e = e || 5, Ii(Si({
            lat: t[1],
            lon: t[0]
          }), e);
        }
        function Ci(t) {
          var e = dr(Dr(t.toUpperCase()));
          return e.lat && e.lon ? [e.lon, e.lat, e.lon, e.lat] : [e.left, e.bottom, e.right, e.top];
        }
        function Rr(t) {
          var e = dr(Dr(t.toUpperCase()));
          return e.lat && e.lon ? [e.lon, e.lat] : [(e.left + e.right) / 2, (e.top + e.bottom) / 2];
        }
        function cr(t) {
          return t * (Math.PI / 180);
        }
        function zr(t) {
          return 180 * (t / Math.PI);
        }
        function Si(t) {
          var e = t.lat, i = t.lon, u = 6378137, o = 669438e-8, f = 0.9996, c, l, w, L, pt, st, bt, Tt = cr(e), St = cr(i), Ot, Pt;
          Pt = Math.floor((i + 180) / 6) + 1, i === 180 && (Pt = 60), e >= 56 && e < 64 && i >= 3 && i < 12 && (Pt = 32), e >= 72 && e < 84 && (i >= 0 && i < 9 ? Pt = 31 : i >= 9 && i < 21 ? Pt = 33 : i >= 21 && i < 33 ? Pt = 35 : i >= 33 && i < 42 && (Pt = 37)), c = (Pt - 1) * 6 - 180 + 3, Ot = cr(c), l = o / (1 - o), w = u / Math.sqrt(1 - o * Math.sin(Tt) * Math.sin(Tt)), L = Math.tan(Tt) * Math.tan(Tt), pt = l * Math.cos(Tt) * Math.cos(Tt), st = Math.cos(Tt) * (St - Ot), bt = u * ((1 - o / 4 - 3 * o * o / 64 - 5 * o * o * o / 256) * Tt - (3 * o / 8 + 3 * o * o / 32 + 45 * o * o * o / 1024) * Math.sin(2 * Tt) + (15 * o * o / 256 + 45 * o * o * o / 1024) * Math.sin(4 * Tt) - 35 * o * o * o / 3072 * Math.sin(6 * Tt));
          var Ut = f * w * (st + (1 - L + pt) * st * st * st / 6 + (5 - 18 * L + L * L + 72 * pt - 58 * l) * st * st * st * st * st / 120) + 5e5, Zt = f * (bt + w * Math.tan(Tt) * (st * st / 2 + (5 - L + 9 * pt + 4 * pt * pt) * st * st * st * st / 24 + (61 - 58 * L + L * L + 600 * pt - 330 * l) * st * st * st * st * st * st / 720));
          return e < 0 && (Zt += 1e7), {
            northing: Math.round(Zt),
            easting: Math.round(Ut),
            zoneNumber: Pt,
            zoneLetter: ki(e)
          };
        }
        function dr(t) {
          var e = t.northing, i = t.easting, u = t.zoneLetter, o = t.zoneNumber;
          if (o < 0 || o > 60)
            return null;
          var f = 0.9996, c = 6378137, l = 669438e-8, w, L = (1 - Math.sqrt(1 - l)) / (1 + Math.sqrt(1 - l)), pt, st, bt, Tt, St, Ot, Pt, Ut, Zt, Xt = i - 5e5, Yt = e;
          u < "N" && (Yt -= 1e7), Pt = (o - 1) * 6 - 180 + 3, w = l / (1 - l), Ot = Yt / f, Ut = Ot / (c * (1 - l / 4 - 3 * l * l / 64 - 5 * l * l * l / 256)), Zt = Ut + (3 * L / 2 - 27 * L * L * L / 32) * Math.sin(2 * Ut) + (21 * L * L / 16 - 55 * L * L * L * L / 32) * Math.sin(4 * Ut) + 151 * L * L * L / 96 * Math.sin(6 * Ut), pt = c / Math.sqrt(1 - l * Math.sin(Zt) * Math.sin(Zt)), st = Math.tan(Zt) * Math.tan(Zt), bt = w * Math.cos(Zt) * Math.cos(Zt), Tt = c * (1 - l) / Math.pow(1 - l * Math.sin(Zt) * Math.sin(Zt), 1.5), St = Xt / (pt * f);
          var Vt = Zt - pt * Math.tan(Zt) / Tt * (St * St / 2 - (5 + 3 * st + 10 * bt - 4 * bt * bt - 9 * w) * St * St * St * St / 24 + (61 + 90 * st + 298 * bt + 45 * st * st - 252 * w - 3 * bt * bt) * St * St * St * St * St * St / 720);
          Vt = zr(Vt);
          var Qt = (St - (1 + 2 * st + bt) * St * St * St / 6 + (5 - 2 * bt + 28 * st - 3 * bt * bt + 8 * w + 24 * st * st) * St * St * St * St * St / 120) / Math.cos(Zt);
          Qt = Pt + zr(Qt);
          var se;
          if (t.accuracy) {
            var ee = dr({
              northing: t.northing + t.accuracy,
              easting: t.easting + t.accuracy,
              zoneLetter: t.zoneLetter,
              zoneNumber: t.zoneNumber
            });
            se = {
              top: ee.lat,
              right: ee.lon,
              bottom: Vt,
              left: Qt
            };
          } else
            se = {
              lat: Vt,
              lon: Qt
            };
          return se;
        }
        function ki(t) {
          var e = "Z";
          return 84 >= t && t >= 72 ? e = "X" : 72 > t && t >= 64 ? e = "W" : 64 > t && t >= 56 ? e = "V" : 56 > t && t >= 48 ? e = "U" : 48 > t && t >= 40 ? e = "T" : 40 > t && t >= 32 ? e = "S" : 32 > t && t >= 24 ? e = "R" : 24 > t && t >= 16 ? e = "Q" : 16 > t && t >= 8 ? e = "P" : 8 > t && t >= 0 ? e = "N" : 0 > t && t >= -8 ? e = "M" : -8 > t && t >= -16 ? e = "L" : -16 > t && t >= -24 ? e = "K" : -24 > t && t >= -32 ? e = "J" : -32 > t && t >= -40 ? e = "H" : -40 > t && t >= -48 ? e = "G" : -48 > t && t >= -56 ? e = "F" : -56 > t && t >= -64 ? e = "E" : -64 > t && t >= -72 ? e = "D" : -72 > t && t >= -80 && (e = "C"), e;
        }
        function Ii(t, e) {
          var i = "00000" + t.easting, u = "00000" + t.northing;
          return t.zoneNumber + t.zoneLetter + Ti(t.easting, t.northing, t.zoneNumber) + i.substr(i.length - 5, e) + u.substr(u.length - 5, e);
        }
        function Ti(t, e, i) {
          var u = Lr(i), o = Math.floor(t / 1e5), f = Math.floor(e / 1e5) % 20;
          return Fi(o, f, u);
        }
        function Lr(t) {
          var e = t % Br;
          return e === 0 && (e = Br), e;
        }
        function Fi(t, e, i) {
          var u = i - 1, o = Or.charCodeAt(u), f = Pr.charCodeAt(u), c = o + t - 1, l = f + e, w = !1;
          c > Re && (c = c - Re + Se - 1, w = !0), (c === he || o < he && c > he || (c > he || o < he) && w) && c++, (c === le || o < le && c > le || (c > le || o < le) && w) && (c++, c === he && c++), c > Re && (c = c - Re + Se - 1), l > Ne ? (l = l - Ne + Se - 1, w = !0) : w = !1, (l === he || f < he && l > he || (l > he || f < he) && w) && l++, (l === le || f < le && l > le || (l > le || f < le) && w) && (l++, l === he && l++), l > Ne && (l = l - Ne + Se - 1);
          var L = String.fromCharCode(c) + String.fromCharCode(l);
          return L;
        }
        function Dr(t) {
          if (t && t.length === 0)
            throw "MGRSPoint coverting from nothing";
          for (var e = t.length, i = null, u = "", o, f = 0; !/[A-Z]/.test(o = t.charAt(f)); ) {
            if (f >= 2)
              throw "MGRSPoint bad conversion from: " + t;
            u += o, f++;
          }
          var c = parseInt(u, 10);
          if (f === 0 || f + 3 > e)
            throw "MGRSPoint bad conversion from: " + t;
          var l = t.charAt(f++);
          if (l <= "A" || l === "B" || l === "Y" || l >= "Z" || l === "I" || l === "O")
            throw "MGRSPoint zone letter " + l + " not handled: " + t;
          i = t.substring(f, f += 2);
          for (var w = Lr(c), L = Bi(i.charAt(0), w), pt = Oi(i.charAt(1), w); pt < Pi(l); )
            pt += 2e6;
          var st = e - f;
          if (st % 2 !== 0)
            throw `MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters` + t;
          var bt = st / 2, Tt = 0, St = 0, Ot, Pt, Ut, Zt, Xt;
          return bt > 0 && (Ot = 1e5 / Math.pow(10, bt), Pt = t.substring(f, f + bt), Tt = parseFloat(Pt) * Ot, Ut = t.substring(f + bt), St = parseFloat(Ut) * Ot), Zt = Tt + L, Xt = St + pt, {
            easting: Zt,
            northing: Xt,
            zoneLetter: l,
            zoneNumber: c,
            accuracy: Ot
          };
        }
        function Bi(t, e) {
          for (var i = Or.charCodeAt(e - 1), u = 1e5, o = !1; i !== t.charCodeAt(0); ) {
            if (i++, i === he && i++, i === le && i++, i > Re) {
              if (o)
                throw "Bad character: " + t;
              i = Se, o = !0;
            }
            u += 1e5;
          }
          return u;
        }
        function Oi(t, e) {
          if (t > "V")
            throw "MGRSPoint given invalid Northing " + t;
          for (var i = Pr.charCodeAt(e - 1), u = 0, o = !1; i !== t.charCodeAt(0); ) {
            if (i++, i === he && i++, i === le && i++, i > Ne) {
              if (o)
                throw "Bad character: " + t;
              i = Se, o = !0;
            }
            u += 1e5;
          }
          return u;
        }
        function Pi(t) {
          var e;
          switch (t) {
            case "C":
              e = 11e5;
              break;
            case "D":
              e = 2e6;
              break;
            case "E":
              e = 28e5;
              break;
            case "F":
              e = 37e5;
              break;
            case "G":
              e = 46e5;
              break;
            case "H":
              e = 55e5;
              break;
            case "J":
              e = 64e5;
              break;
            case "K":
              e = 73e5;
              break;
            case "L":
              e = 82e5;
              break;
            case "M":
              e = 91e5;
              break;
            case "N":
              e = 0;
              break;
            case "P":
              e = 8e5;
              break;
            case "Q":
              e = 17e5;
              break;
            case "R":
              e = 26e5;
              break;
            case "S":
              e = 35e5;
              break;
            case "T":
              e = 44e5;
              break;
            case "U":
              e = 53e5;
              break;
            case "V":
              e = 62e5;
              break;
            case "W":
              e = 7e6;
              break;
            case "X":
              e = 79e5;
              break;
            default:
              e = -1;
          }
          if (e >= 0)
            return e;
          throw "Invalid zone letter: " + t;
        }
        function ke(t, e, i) {
          if (!(this instanceof ke))
            return new ke(t, e, i);
          if (Array.isArray(t))
            this.x = t[0], this.y = t[1], this.z = t[2] || 0;
          else if (typeof t == "object")
            this.x = t.x, this.y = t.y, this.z = t.z || 0;
          else if (typeof t == "string" && typeof e > "u") {
            var u = t.split(",");
            this.x = parseFloat(u[0], 10), this.y = parseFloat(u[1], 10), this.z = parseFloat(u[2], 10) || 0;
          } else
            this.x = t, this.y = e, this.z = i || 0;
          console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
        }
        ke.fromMGRS = function(t) {
          return new ke(Rr(t));
        }, ke.prototype.toMGRS = function(t) {
          return Nr([this.x, this.y], t);
        };
        var Ni = 1, Ri = 0.25, Ur = 0.046875, jr = 0.01953125, Gr = 0.01068115234375, zi = 0.75, Li = 0.46875, Di = 0.013020833333333334, Ui = 0.007120768229166667, ji = 0.3645833333333333, Gi = 0.005696614583333333, Wi = 0.3076171875, Wr = function(t) {
          var e = [];
          e[0] = Ni - t * (Ri + t * (Ur + t * (jr + t * Gr))), e[1] = t * (zi - t * (Ur + t * (jr + t * Gr)));
          var i = t * t;
          return e[2] = i * (Li - t * (Di + t * Ui)), i *= t, e[3] = i * (ji - t * Gi), e[4] = i * t * Wi, e;
        }, Je = function(t, e, i, u) {
          return i *= e, e *= e, u[0] * t - i * (u[1] + e * (u[2] + e * (u[3] + e * u[4])));
        }, qi = 20, qr = function(t, e, i) {
          for (var u = 1 / (1 - e), o = t, f = qi; f; --f) {
            var c = Math.sin(o), l = 1 - e * c * c;
            if (l = (Je(o, c, Math.cos(o), i) - t) * (l * Math.sqrt(l)) * u, o -= l, Math.abs(l) < H)
              return o;
          }
          return o;
        };
        function $i() {
          this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.es && (this.en = Wr(this.es), this.ml0 = Je(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
        }
        function Zi(t) {
          var e = t.x, i = t.y, u = v(e - this.long0), o, f, c, l = Math.sin(i), w = Math.cos(i);
          if (this.es) {
            var pt = w * u, st = Math.pow(pt, 2), bt = this.ep2 * Math.pow(w, 2), Tt = Math.pow(bt, 2), St = Math.abs(w) > H ? Math.tan(i) : 0, Ot = Math.pow(St, 2), Pt = Math.pow(Ot, 2);
            o = 1 - this.es * Math.pow(l, 2), pt = pt / Math.sqrt(o);
            var Ut = Je(i, l, w, this.en);
            f = this.a * (this.k0 * pt * (1 + st / 6 * (1 - Ot + bt + st / 20 * (5 - 18 * Ot + Pt + 14 * bt - 58 * Ot * bt + st / 42 * (61 + 179 * Pt - Pt * Ot - 479 * Ot))))) + this.x0, c = this.a * (this.k0 * (Ut - this.ml0 + l * u * pt / 2 * (1 + st / 12 * (5 - Ot + 9 * bt + 4 * Tt + st / 30 * (61 + Pt - 58 * Ot + 270 * bt - 330 * Ot * bt + st / 56 * (1385 + 543 * Pt - Pt * Ot - 3111 * Ot)))))) + this.y0;
          } else {
            var L = w * Math.sin(u);
            if (Math.abs(Math.abs(L) - 1) < H)
              return 93;
            if (f = 0.5 * this.a * this.k0 * Math.log((1 + L) / (1 - L)) + this.x0, c = w * Math.cos(u) / Math.sqrt(1 - Math.pow(L, 2)), L = Math.abs(c), L >= 1) {
              if (L - 1 > H)
                return 93;
              c = 0;
            } else
              c = Math.acos(c);
            i < 0 && (c = -c), c = this.a * this.k0 * (c - this.lat0) + this.y0;
          }
          return t.x = f, t.y = c, t;
        }
        function Hi(t) {
          var e, i, u, o, f = (t.x - this.x0) * (1 / this.a), c = (t.y - this.y0) * (1 / this.a);
          if (this.es)
            if (e = this.ml0 + c / this.k0, i = qr(e, this.es, this.en), Math.abs(i) < W) {
              var st = Math.sin(i), bt = Math.cos(i), Tt = Math.abs(bt) > H ? Math.tan(i) : 0, St = this.ep2 * Math.pow(bt, 2), Ot = Math.pow(St, 2), Pt = Math.pow(Tt, 2), Ut = Math.pow(Pt, 2);
              e = 1 - this.es * Math.pow(st, 2);
              var Zt = f * Math.sqrt(e) / this.k0, Xt = Math.pow(Zt, 2);
              e = e * Tt, u = i - e * Xt / (1 - this.es) * 0.5 * (1 - Xt / 12 * (5 + 3 * Pt - 9 * St * Pt + St - 4 * Ot - Xt / 30 * (61 + 90 * Pt - 252 * St * Pt + 45 * Ut + 46 * St - Xt / 56 * (1385 + 3633 * Pt + 4095 * Ut + 1574 * Ut * Pt)))), o = v(this.long0 + Zt * (1 - Xt / 6 * (1 + 2 * Pt + St - Xt / 20 * (5 + 28 * Pt + 24 * Ut + 8 * St * Pt + 6 * St - Xt / 42 * (61 + 662 * Pt + 1320 * Ut + 720 * Ut * Pt)))) / bt);
            } else
              u = W * F(c), o = 0;
          else {
            var l = Math.exp(f / this.k0), w = 0.5 * (l - 1 / l), L = this.lat0 + c / this.k0, pt = Math.cos(L);
            e = Math.sqrt((1 - Math.pow(pt, 2)) / (1 + Math.pow(w, 2))), u = Math.asin(e), c < 0 && (u = -u), w === 0 && pt === 0 ? o = 0 : o = v(Math.atan2(w, pt) + this.long0);
          }
          return t.x = o, t.y = u, t;
        }
        var Ji = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"], Xe = {
          init: $i,
          forward: Zi,
          inverse: Hi,
          names: Ji
        }, $r = function(t) {
          var e = Math.exp(t);
          return e = (e - 1 / e) / 2, e;
        }, Ve = function(t, e) {
          t = Math.abs(t), e = Math.abs(e);
          var i = Math.max(t, e), u = Math.min(t, e) / (i || 1);
          return i * Math.sqrt(1 + Math.pow(u, 2));
        }, Xi = function(t) {
          var e = 1 + t, i = e - 1;
          return i === 0 ? t : t * Math.log(e) / i;
        }, Vi = function(t) {
          var e = Math.abs(t);
          return e = Xi(e * (1 + e / (Ve(1, e) + 1))), t < 0 ? -e : e;
        }, pr = function(t, e) {
          for (var i = 2 * Math.cos(2 * e), u = t.length - 1, o = t[u], f = 0, c; --u >= 0; )
            c = -f + i * o + t[u], f = o, o = c;
          return e + c * Math.sin(2 * e);
        }, Ki = function(t, e) {
          for (var i = 2 * Math.cos(e), u = t.length - 1, o = t[u], f = 0, c; --u >= 0; )
            c = -f + i * o + t[u], f = o, o = c;
          return Math.sin(e) * c;
        }, Qi = function(t) {
          var e = Math.exp(t);
          return e = (e + 1 / e) / 2, e;
        }, Zr = function(t, e, i) {
          for (var u = Math.sin(e), o = Math.cos(e), f = $r(i), c = Qi(i), l = 2 * o * c, w = -2 * u * f, L = t.length - 1, pt = t[L], st = 0, bt = 0, Tt = 0, St, Ot; --L >= 0; )
            St = bt, Ot = st, bt = pt, st = Tt, pt = -St + l * bt - w * st + t[L], Tt = -Ot + w * bt + l * st;
          return l = u * c, w = o * f, [l * pt - w * Tt, l * Tt + w * pt];
        };
        function Yi() {
          if (!this.approx && (isNaN(this.es) || this.es <= 0))
            throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
          this.approx && (Xe.init.apply(this), this.forward = Xe.forward, this.inverse = Xe.inverse), this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
          var t = this.es / (1 + Math.sqrt(1 - this.es)), e = t / (2 - t), i = e;
          this.cgb[0] = e * (2 + e * (-2 / 3 + e * (-2 + e * (116 / 45 + e * (26 / 45 + e * (-2854 / 675)))))), this.cbg[0] = e * (-2 + e * (2 / 3 + e * (4 / 3 + e * (-82 / 45 + e * (32 / 45 + e * (4642 / 4725)))))), i = i * e, this.cgb[1] = i * (7 / 3 + e * (-8 / 5 + e * (-227 / 45 + e * (2704 / 315 + e * (2323 / 945))))), this.cbg[1] = i * (5 / 3 + e * (-16 / 15 + e * (-13 / 9 + e * (904 / 315 + e * (-1522 / 945))))), i = i * e, this.cgb[2] = i * (56 / 15 + e * (-136 / 35 + e * (-1262 / 105 + e * (73814 / 2835)))), this.cbg[2] = i * (-26 / 15 + e * (34 / 21 + e * (8 / 5 + e * (-12686 / 2835)))), i = i * e, this.cgb[3] = i * (4279 / 630 + e * (-332 / 35 + e * (-399572 / 14175))), this.cbg[3] = i * (1237 / 630 + e * (-12 / 5 + e * (-24832 / 14175))), i = i * e, this.cgb[4] = i * (4174 / 315 + e * (-144838 / 6237)), this.cbg[4] = i * (-734 / 315 + e * (109598 / 31185)), i = i * e, this.cgb[5] = i * (601676 / 22275), this.cbg[5] = i * (444337 / 155925), i = Math.pow(e, 2), this.Qn = this.k0 / (1 + e) * (1 + i * (1 / 4 + i * (1 / 64 + i / 256))), this.utg[0] = e * (-0.5 + e * (2 / 3 + e * (-37 / 96 + e * (1 / 360 + e * (81 / 512 + e * (-96199 / 604800)))))), this.gtu[0] = e * (0.5 + e * (-2 / 3 + e * (5 / 16 + e * (41 / 180 + e * (-127 / 288 + e * (7891 / 37800)))))), this.utg[1] = i * (-1 / 48 + e * (-1 / 15 + e * (437 / 1440 + e * (-46 / 105 + e * (1118711 / 3870720))))), this.gtu[1] = i * (13 / 48 + e * (-3 / 5 + e * (557 / 1440 + e * (281 / 630 + e * (-1983433 / 1935360))))), i = i * e, this.utg[2] = i * (-17 / 480 + e * (37 / 840 + e * (209 / 4480 + e * (-5569 / 90720)))), this.gtu[2] = i * (61 / 240 + e * (-103 / 140 + e * (15061 / 26880 + e * (167603 / 181440)))), i = i * e, this.utg[3] = i * (-4397 / 161280 + e * (11 / 504 + e * (830251 / 7257600))), this.gtu[3] = i * (49561 / 161280 + e * (-179 / 168 + e * (6601661 / 7257600))), i = i * e, this.utg[4] = i * (-4583 / 161280 + e * (108847 / 3991680)), this.gtu[4] = i * (34729 / 80640 + e * (-3418889 / 1995840)), i = i * e, this.utg[5] = i * (-20648693 / 638668800), this.gtu[5] = i * (212378941 / 319334400);
          var u = pr(this.cbg, this.lat0);
          this.Zb = -this.Qn * (u + Ki(this.gtu, 2 * u));
        }
        function tn(t) {
          var e = v(t.x - this.long0), i = t.y;
          i = pr(this.cbg, i);
          var u = Math.sin(i), o = Math.cos(i), f = Math.sin(e), c = Math.cos(e);
          i = Math.atan2(u, c * o), e = Math.atan2(f * o, Ve(u, o * c)), e = Vi(Math.tan(e));
          var l = Zr(this.gtu, 2 * i, 2 * e);
          i = i + l[0], e = e + l[1];
          var w, L;
          return Math.abs(e) <= 2.623395162778 ? (w = this.a * (this.Qn * e) + this.x0, L = this.a * (this.Qn * i + this.Zb) + this.y0) : (w = 1 / 0, L = 1 / 0), t.x = w, t.y = L, t;
        }
        function en(t) {
          var e = (t.x - this.x0) * (1 / this.a), i = (t.y - this.y0) * (1 / this.a);
          i = (i - this.Zb) / this.Qn, e = e / this.Qn;
          var u, o;
          if (Math.abs(e) <= 2.623395162778) {
            var f = Zr(this.utg, 2 * i, 2 * e);
            i = i + f[0], e = e + f[1], e = Math.atan($r(e));
            var c = Math.sin(i), l = Math.cos(i), w = Math.sin(e), L = Math.cos(e);
            i = Math.atan2(c * L, Ve(w, L * l)), e = Math.atan2(w, L * l), u = v(e + this.long0), o = pr(this.cgb, i);
          } else
            u = 1 / 0, o = 1 / 0;
          return t.x = u, t.y = o, t;
        }
        var rn = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"], Ke = {
          init: Yi,
          forward: tn,
          inverse: en,
          names: rn
        }, nn = function(t, e) {
          if (t === void 0) {
            if (t = Math.floor((v(e) + Math.PI) * 30 / Math.PI) + 1, t < 0)
              return 0;
            if (t > 60)
              return 60;
          }
          return t;
        }, an = "etmerc";
        function sn() {
          var t = nn(this.zone, this.long0);
          if (t === void 0)
            throw new Error("unknown utm zone");
          this.lat0 = 0, this.long0 = (6 * Math.abs(t) - 183) * mt, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = 0.9996, Ke.init.apply(this), this.forward = Ke.forward, this.inverse = Ke.inverse;
        }
        var on = ["Universal Transverse Mercator System", "utm"], hn = {
          init: sn,
          names: on,
          dependsOn: an
        }, mr = function(t, e) {
          return Math.pow((1 - t) / (1 + t), e);
        }, un = 20;
        function ln() {
          var t = Math.sin(this.lat0), e = Math.cos(this.lat0);
          e *= e, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t), this.C = Math.sqrt(1 + this.es * e * e / (1 - this.es)), this.phic0 = Math.asin(t / this.C), this.ratexp = 0.5 * this.C * this.e, this.K = Math.tan(0.5 * this.phic0 + P) / (Math.pow(Math.tan(0.5 * this.lat0 + P), this.C) * mr(this.e * t, this.ratexp));
        }
        function fn(t) {
          var e = t.x, i = t.y;
          return t.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * i + P), this.C) * mr(this.e * Math.sin(i), this.ratexp)) - W, t.x = this.C * e, t;
        }
        function cn(t) {
          for (var e = 1e-14, i = t.x / this.C, u = t.y, o = Math.pow(Math.tan(0.5 * u + P) / this.K, 1 / this.C), f = un; f > 0 && (u = 2 * Math.atan(o * mr(this.e * Math.sin(t.y), -0.5 * this.e)) - W, !(Math.abs(u - t.y) < e)); --f)
            t.y = u;
          return f ? (t.x = i, t.y = u, t) : null;
        }
        var dn = ["gauss"], vr = {
          init: ln,
          forward: fn,
          inverse: cn,
          names: dn
        };
        function pn() {
          vr.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
        }
        function mn(t) {
          var e, i, u, o;
          return t.x = v(t.x - this.long0), vr.forward.apply(this, [t]), e = Math.sin(t.y), i = Math.cos(t.y), u = Math.cos(t.x), o = this.k0 * this.R2 / (1 + this.sinc0 * e + this.cosc0 * i * u), t.x = o * i * Math.sin(t.x), t.y = o * (this.cosc0 * e - this.sinc0 * i * u), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t;
        }
        function vn(t) {
          var e, i, u, o, f;
          if (t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, f = Math.sqrt(t.x * t.x + t.y * t.y)) {
            var c = 2 * Math.atan2(f, this.R2);
            e = Math.sin(c), i = Math.cos(c), o = Math.asin(i * this.sinc0 + t.y * e * this.cosc0 / f), u = Math.atan2(t.x * e, f * this.cosc0 * i - t.y * this.sinc0 * e);
          } else
            o = this.phic0, u = 0;
          return t.x = u, t.y = o, vr.inverse.apply(this, [t]), t.x = v(t.x + this.long0), t;
        }
        var yn = ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"], gn = {
          init: pn,
          forward: mn,
          inverse: vn,
          names: yn
        };
        function _n(t, e, i) {
          return e *= i, Math.tan(0.5 * (W + t)) * Math.pow((1 - e) / (1 + e), 0.5 * i);
        }
        function xn() {
          this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= H && (this.k0 = 0.5 * (1 + F(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= H && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= H && (this.k0 = 0.5 * this.cons * d(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / G(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = d(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - W, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
        }
        function wn(t) {
          var e = t.x, i = t.y, u = Math.sin(i), o = Math.cos(i), f, c, l, w, L, pt, st = v(e - this.long0);
          return Math.abs(Math.abs(e - this.long0) - Math.PI) <= H && Math.abs(i + this.lat0) <= H ? (t.x = NaN, t.y = NaN, t) : this.sphere ? (f = 2 * this.k0 / (1 + this.sinlat0 * u + this.coslat0 * o * Math.cos(st)), t.x = this.a * f * o * Math.sin(st) + this.x0, t.y = this.a * f * (this.coslat0 * u - this.sinlat0 * o * Math.cos(st)) + this.y0, t) : (c = 2 * Math.atan(this.ssfn_(i, u, this.e)) - W, w = Math.cos(c), l = Math.sin(c), Math.abs(this.coslat0) <= H ? (L = G(this.e, i * this.con, this.con * u), pt = 2 * this.a * this.k0 * L / this.cons, t.x = this.x0 + pt * Math.sin(e - this.long0), t.y = this.y0 - this.con * pt * Math.cos(e - this.long0), t) : (Math.abs(this.sinlat0) < H ? (f = 2 * this.a * this.k0 / (1 + w * Math.cos(st)), t.y = f * l) : (f = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * l + this.cosX0 * w * Math.cos(st))), t.y = f * (this.cosX0 * l - this.sinX0 * w * Math.cos(st)) + this.y0), t.x = f * w * Math.sin(st) + this.x0, t));
        }
        function Mn(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e, i, u, o, f, c = Math.sqrt(t.x * t.x + t.y * t.y);
          if (this.sphere) {
            var l = 2 * Math.atan(c / (2 * this.a * this.k0));
            return e = this.long0, i = this.lat0, c <= H ? (t.x = e, t.y = i, t) : (i = Math.asin(Math.cos(l) * this.sinlat0 + t.y * Math.sin(l) * this.coslat0 / c), Math.abs(this.coslat0) < H ? this.lat0 > 0 ? e = v(this.long0 + Math.atan2(t.x, -1 * t.y)) : e = v(this.long0 + Math.atan2(t.x, t.y)) : e = v(this.long0 + Math.atan2(t.x * Math.sin(l), c * this.coslat0 * Math.cos(l) - t.y * this.sinlat0 * Math.sin(l))), t.x = e, t.y = i, t);
          } else if (Math.abs(this.coslat0) <= H) {
            if (c <= H)
              return i = this.lat0, e = this.long0, t.x = e, t.y = i, t;
            t.x *= this.con, t.y *= this.con, u = c * this.cons / (2 * this.a * this.k0), i = this.con * wt(this.e, u), e = this.con * v(this.con * this.long0 + Math.atan2(t.x, -1 * t.y));
          } else
            o = 2 * Math.atan(c * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), e = this.long0, c <= H ? f = this.X0 : (f = Math.asin(Math.cos(o) * this.sinX0 + t.y * Math.sin(o) * this.cosX0 / c), e = v(this.long0 + Math.atan2(t.x * Math.sin(o), c * this.cosX0 * Math.cos(o) - t.y * this.sinX0 * Math.sin(o)))), i = -1 * wt(this.e, Math.tan(0.5 * (W + f)));
          return t.x = e, t.y = i, t;
        }
        var bn = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"], En = {
          init: xn,
          forward: wn,
          inverse: Mn,
          names: bn,
          ssfn_: _n
        };
        function An() {
          var t = this.lat0;
          this.lambda0 = this.long0;
          var e = Math.sin(t), i = this.a, u = this.rf, o = 1 / u, f = 2 * o - Math.pow(o, 2), c = this.e = Math.sqrt(f);
          this.R = this.k0 * i * Math.sqrt(1 - f) / (1 - f * Math.pow(e, 2)), this.alpha = Math.sqrt(1 + f / (1 - f) * Math.pow(Math.cos(t), 4)), this.b0 = Math.asin(e / this.alpha);
          var l = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), w = Math.log(Math.tan(Math.PI / 4 + t / 2)), L = Math.log((1 + c * e) / (1 - c * e));
          this.K = l - this.alpha * w + this.alpha * c / 2 * L;
        }
        function Cn(t) {
          var e = Math.log(Math.tan(Math.PI / 4 - t.y / 2)), i = this.e / 2 * Math.log((1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))), u = -this.alpha * (e + i) + this.K, o = 2 * (Math.atan(Math.exp(u)) - Math.PI / 4), f = this.alpha * (t.x - this.lambda0), c = Math.atan(Math.sin(f) / (Math.sin(this.b0) * Math.tan(o) + Math.cos(this.b0) * Math.cos(f))), l = Math.asin(Math.cos(this.b0) * Math.sin(o) - Math.sin(this.b0) * Math.cos(o) * Math.cos(f));
          return t.y = this.R / 2 * Math.log((1 + Math.sin(l)) / (1 - Math.sin(l))) + this.y0, t.x = this.R * c + this.x0, t;
        }
        function Sn(t) {
          for (var e = t.x - this.x0, i = t.y - this.y0, u = e / this.R, o = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4), f = Math.asin(Math.cos(this.b0) * Math.sin(o) + Math.sin(this.b0) * Math.cos(o) * Math.cos(u)), c = Math.atan(Math.sin(u) / (Math.cos(this.b0) * Math.cos(u) - Math.sin(this.b0) * Math.tan(o))), l = this.lambda0 + c / this.alpha, w = 0, L = f, pt = -1e3, st = 0; Math.abs(L - pt) > 1e-7; ) {
            if (++st > 20)
              return;
            w = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + f / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(L)) / 2)), pt = L, L = 2 * Math.atan(Math.exp(w)) - Math.PI / 2;
          }
          return t.x = l, t.y = L, t;
        }
        var kn = ["somerc"], In = {
          init: An,
          forward: Cn,
          inverse: Sn,
          names: kn
        }, Ie = 1e-7;
        function Tn(t) {
          var e = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"], i = typeof t.PROJECTION == "object" ? Object.keys(t.PROJECTION)[0] : t.PROJECTION;
          return "no_uoff" in t || "no_off" in t || e.indexOf(i) !== -1;
        }
        function Fn() {
          var t, e, i, u, o, f, c, l, w, L, pt = 0, st, bt = 0, Tt = 0, St = 0, Ot = 0, Pt = 0, Ut = 0;
          this.no_off = Tn(this), this.no_rot = "no_rot" in this;
          var Zt = !1;
          "alpha" in this && (Zt = !0);
          var Xt = !1;
          if ("rectified_grid_angle" in this && (Xt = !0), Zt && (Ut = this.alpha), Xt && (pt = this.rectified_grid_angle * mt), Zt || Xt)
            bt = this.longc;
          else if (Tt = this.long1, Ot = this.lat1, St = this.long2, Pt = this.lat2, Math.abs(Ot - Pt) <= Ie || (t = Math.abs(Ot)) <= Ie || Math.abs(t - W) <= Ie || Math.abs(Math.abs(this.lat0) - W) <= Ie || Math.abs(Math.abs(Pt) - W) <= Ie)
            throw new Error();
          var Yt = 1 - this.es;
          e = Math.sqrt(Yt), Math.abs(this.lat0) > H ? (l = Math.sin(this.lat0), i = Math.cos(this.lat0), t = 1 - this.es * l * l, this.B = i * i, this.B = Math.sqrt(1 + this.es * this.B * this.B / Yt), this.A = this.B * this.k0 * e / t, u = this.B * e / (i * Math.sqrt(t)), o = u * u - 1, o <= 0 ? o = 0 : (o = Math.sqrt(o), this.lat0 < 0 && (o = -o)), this.E = o += u, this.E *= Math.pow(G(this.e, this.lat0, l), this.B)) : (this.B = 1 / e, this.A = this.k0, this.E = u = o = 1), Zt || Xt ? (Zt ? (st = Math.asin(Math.sin(Ut) / u), Xt || (pt = Ut)) : (st = pt, Ut = Math.asin(u * Math.sin(st))), this.lam0 = bt - Math.asin(0.5 * (o - 1 / o) * Math.tan(st)) / this.B) : (f = Math.pow(G(this.e, Ot, Math.sin(Ot)), this.B), c = Math.pow(G(this.e, Pt, Math.sin(Pt)), this.B), o = this.E / f, w = (c - f) / (c + f), L = this.E * this.E, L = (L - c * f) / (L + c * f), t = Tt - St, t < -Math.pi ? St -= $ : t > Math.pi && (St += $), this.lam0 = v(0.5 * (Tt + St) - Math.atan(L * Math.tan(0.5 * this.B * (Tt - St)) / w) / this.B), st = Math.atan(2 * Math.sin(this.B * v(Tt - this.lam0)) / (o - 1 / o)), pt = Ut = Math.asin(u * Math.sin(st))), this.singam = Math.sin(st), this.cosgam = Math.cos(st), this.sinrot = Math.sin(pt), this.cosrot = Math.cos(pt), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(u * u - 1) / Math.cos(Ut))), this.lat0 < 0 && (this.u_0 = -this.u_0)), o = 0.5 * st, this.v_pole_n = this.ArB * Math.log(Math.tan(P - o)), this.v_pole_s = this.ArB * Math.log(Math.tan(P + o));
        }
        function Bn(t) {
          var e = {}, i, u, o, f, c, l, w, L;
          if (t.x = t.x - this.lam0, Math.abs(Math.abs(t.y) - W) > H) {
            if (c = this.E / Math.pow(G(this.e, t.y, Math.sin(t.y)), this.B), l = 1 / c, i = 0.5 * (c - l), u = 0.5 * (c + l), f = Math.sin(this.B * t.x), o = (i * this.singam - f * this.cosgam) / u, Math.abs(Math.abs(o) - 1) < H)
              throw new Error();
            L = 0.5 * this.ArB * Math.log((1 - o) / (1 + o)), l = Math.cos(this.B * t.x), Math.abs(l) < Ie ? w = this.A * t.x : w = this.ArB * Math.atan2(i * this.cosgam + f * this.singam, l);
          } else
            L = t.y > 0 ? this.v_pole_n : this.v_pole_s, w = this.ArB * t.y;
          return this.no_rot ? (e.x = w, e.y = L) : (w -= this.u_0, e.x = L * this.cosrot + w * this.sinrot, e.y = w * this.cosrot - L * this.sinrot), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
        }
        function On(t) {
          var e, i, u, o, f, c, l, w = {};
          if (t.x = (t.x - this.x0) * (1 / this.a), t.y = (t.y - this.y0) * (1 / this.a), this.no_rot ? (i = t.y, e = t.x) : (i = t.x * this.cosrot - t.y * this.sinrot, e = t.y * this.cosrot + t.x * this.sinrot + this.u_0), u = Math.exp(-this.BrA * i), o = 0.5 * (u - 1 / u), f = 0.5 * (u + 1 / u), c = Math.sin(this.BrA * e), l = (c * this.cosgam + o * this.singam) / f, Math.abs(Math.abs(l) - 1) < H)
            w.x = 0, w.y = l < 0 ? -W : W;
          else {
            if (w.y = this.E / Math.sqrt((1 + l) / (1 - l)), w.y = wt(this.e, Math.pow(w.y, 1 / this.B)), w.y === 1 / 0)
              throw new Error();
            w.x = -this.rB * Math.atan2(o * this.cosgam - c * this.singam, Math.cos(this.BrA * e));
          }
          return w.x += this.lam0, w;
        }
        var Pn = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"], Nn = {
          init: Fn,
          forward: Bn,
          inverse: On,
          names: Pn
        };
        function Rn() {
          if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < H)) {
            var t = this.b / this.a;
            this.e = Math.sqrt(1 - t * t);
            var e = Math.sin(this.lat1), i = Math.cos(this.lat1), u = d(this.e, e, i), o = G(this.e, this.lat1, e), f = Math.sin(this.lat2), c = Math.cos(this.lat2), l = d(this.e, f, c), w = G(this.e, this.lat2, f), L = G(this.e, this.lat0, Math.sin(this.lat0));
            Math.abs(this.lat1 - this.lat2) > H ? this.ns = Math.log(u / l) / Math.log(o / w) : this.ns = e, isNaN(this.ns) && (this.ns = e), this.f0 = u / (this.ns * Math.pow(o, this.ns)), this.rh = this.a * this.f0 * Math.pow(L, this.ns), this.title || (this.title = "Lambert Conformal Conic");
          }
        }
        function zn(t) {
          var e = t.x, i = t.y;
          Math.abs(2 * Math.abs(i) - Math.PI) <= H && (i = F(i) * (W - 2 * H));
          var u = Math.abs(Math.abs(i) - W), o, f;
          if (u > H)
            o = G(this.e, i, Math.sin(i)), f = this.a * this.f0 * Math.pow(o, this.ns);
          else {
            if (u = i * this.ns, u <= 0)
              return null;
            f = 0;
          }
          var c = this.ns * v(e - this.long0);
          return t.x = this.k0 * (f * Math.sin(c)) + this.x0, t.y = this.k0 * (this.rh - f * Math.cos(c)) + this.y0, t;
        }
        function Ln(t) {
          var e, i, u, o, f, c = (t.x - this.x0) / this.k0, l = this.rh - (t.y - this.y0) / this.k0;
          this.ns > 0 ? (e = Math.sqrt(c * c + l * l), i = 1) : (e = -Math.sqrt(c * c + l * l), i = -1);
          var w = 0;
          if (e !== 0 && (w = Math.atan2(i * c, i * l)), e !== 0 || this.ns > 0) {
            if (i = 1 / this.ns, u = Math.pow(e / (this.a * this.f0), i), o = wt(this.e, u), o === -9999)
              return null;
          } else
            o = -W;
          return f = v(w / this.ns + this.long0), t.x = f, t.y = o, t;
        }
        var Dn = [
          "Lambert Tangential Conformal Conic Projection",
          "Lambert_Conformal_Conic",
          "Lambert_Conformal_Conic_1SP",
          "Lambert_Conformal_Conic_2SP",
          "lcc"
        ], Un = {
          init: Rn,
          forward: zn,
          inverse: Ln,
          names: Dn
        };
        function jn() {
          this.a = 6377397155e-3, this.es = 0.006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = 0.863937979737193), this.long0 || (this.long0 = 0.7417649320975901 - 0.308341501185665), this.k0 || (this.k0 = 0.9999), this.s45 = 0.785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
        }
        function Gn(t) {
          var e, i, u, o, f, c, l, w = t.x, L = t.y, pt = v(w - this.long0);
          return e = Math.pow((1 + this.e * Math.sin(L)) / (1 - this.e * Math.sin(L)), this.alfa * this.e / 2), i = 2 * (Math.atan(this.k * Math.pow(Math.tan(L / 2 + this.s45), this.alfa) / e) - this.s45), u = -pt * this.alfa, o = Math.asin(Math.cos(this.ad) * Math.sin(i) + Math.sin(this.ad) * Math.cos(i) * Math.cos(u)), f = Math.asin(Math.cos(i) * Math.sin(u) / Math.cos(o)), c = this.n * f, l = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(o / 2 + this.s45), this.n), t.y = l * Math.cos(c) / 1, t.x = l * Math.sin(c) / 1, this.czech || (t.y *= -1, t.x *= -1), t;
        }
        function Wn(t) {
          var e, i, u, o, f, c, l, w, L = t.x;
          t.x = t.y, t.y = L, this.czech || (t.y *= -1, t.x *= -1), c = Math.sqrt(t.x * t.x + t.y * t.y), f = Math.atan2(t.y, t.x), o = f / Math.sin(this.s0), u = 2 * (Math.atan(Math.pow(this.ro0 / c, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), e = Math.asin(Math.cos(this.ad) * Math.sin(u) - Math.sin(this.ad) * Math.cos(u) * Math.cos(o)), i = Math.asin(Math.cos(u) * Math.sin(o) / Math.cos(e)), t.x = this.long0 - i / this.alfa, l = e, w = 0;
          var pt = 0;
          do
            t.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(e / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l)), this.e / 2)) - this.s45), Math.abs(l - t.y) < 1e-10 && (w = 1), l = t.y, pt += 1;
          while (w === 0 && pt < 15);
          return pt >= 15 ? null : t;
        }
        var qn = ["Krovak", "krovak"], $n = {
          init: jn,
          forward: Gn,
          inverse: Wn,
          names: qn
        }, oe = function(t, e, i, u, o) {
          return t * o - e * Math.sin(2 * o) + i * Math.sin(4 * o) - u * Math.sin(6 * o);
        }, ze = function(t) {
          return 1 - 0.25 * t * (1 + t / 16 * (3 + 1.25 * t));
        }, Le = function(t) {
          return 0.375 * t * (1 + 0.25 * t * (1 + 0.46875 * t));
        }, De = function(t) {
          return 0.05859375 * t * t * (1 + 0.75 * t);
        }, Ue = function(t) {
          return t * t * t * (35 / 3072);
        }, Te = function(t, e, i) {
          var u = e * i;
          return t / Math.sqrt(1 - u * u);
        }, Fe = function(t) {
          return Math.abs(t) < W ? t : t - F(t) * Math.PI;
        }, Qe = function(t, e, i, u, o) {
          var f, c;
          f = t / e;
          for (var l = 0; l < 15; l++)
            if (c = (t - (e * f - i * Math.sin(2 * f) + u * Math.sin(4 * f) - o * Math.sin(6 * f))) / (e - 2 * i * Math.cos(2 * f) + 4 * u * Math.cos(4 * f) - 6 * o * Math.cos(6 * f)), f += c, Math.abs(c) <= 1e-10)
              return f;
          return NaN;
        };
        function Zn() {
          this.sphere || (this.e0 = ze(this.es), this.e1 = Le(this.es), this.e2 = De(this.es), this.e3 = Ue(this.es), this.ml0 = this.a * oe(this.e0, this.e1, this.e2, this.e3, this.lat0));
        }
        function Hn(t) {
          var e, i, u = t.x, o = t.y;
          if (u = v(u - this.long0), this.sphere)
            e = this.a * Math.asin(Math.cos(o) * Math.sin(u)), i = this.a * (Math.atan2(Math.tan(o), Math.cos(u)) - this.lat0);
          else {
            var f = Math.sin(o), c = Math.cos(o), l = Te(this.a, this.e, f), w = Math.tan(o) * Math.tan(o), L = u * Math.cos(o), pt = L * L, st = this.es * c * c / (1 - this.es), bt = this.a * oe(this.e0, this.e1, this.e2, this.e3, o);
            e = l * L * (1 - pt * w * (1 / 6 - (8 - w + 8 * st) * pt / 120)), i = bt - this.ml0 + l * f / c * pt * (0.5 + (5 - w + 6 * st) * pt / 24);
          }
          return t.x = e + this.x0, t.y = i + this.y0, t;
        }
        function Jn(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e = t.x / this.a, i = t.y / this.a, u, o;
          if (this.sphere) {
            var f = i + this.lat0;
            u = Math.asin(Math.sin(f) * Math.cos(e)), o = Math.atan2(Math.tan(e), Math.cos(f));
          } else {
            var c = this.ml0 / this.a + i, l = Qe(c, this.e0, this.e1, this.e2, this.e3);
            if (Math.abs(Math.abs(l) - W) <= H)
              return t.x = this.long0, t.y = W, i < 0 && (t.y *= -1), t;
            var w = Te(this.a, this.e, Math.sin(l)), L = w * w * w / this.a / this.a * (1 - this.es), pt = Math.pow(Math.tan(l), 2), st = e * this.a / w, bt = st * st;
            u = l - w * Math.tan(l) / L * st * st * (0.5 - (1 + 3 * pt) * st * st / 24), o = st * (1 - bt * (pt / 3 + (1 + 3 * pt) * pt * bt / 15)) / Math.cos(l);
          }
          return t.x = v(o + this.long0), t.y = Fe(u), t;
        }
        var Xn = ["Cassini", "Cassini_Soldner", "cass"], Vn = {
          init: Zn,
          forward: Hn,
          inverse: Jn,
          names: Xn
        }, ye = function(t, e) {
          var i;
          return t > 1e-7 ? (i = t * e, (1 - t * t) * (e / (1 - i * i) - 0.5 / t * Math.log((1 - i) / (1 + i)))) : 2 * e;
        }, Kn = 1, Qn = 2, Yn = 3, ta = 4;
        function ea() {
          var t = Math.abs(this.lat0);
          if (Math.abs(t - W) < H ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(t) < H ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) {
            var e;
            switch (this.qp = ye(this.e, 1), this.mmf = 0.5 / (1 - this.es), this.apa = la(this.es), this.mode) {
              case this.N_POLE:
                this.dd = 1;
                break;
              case this.S_POLE:
                this.dd = 1;
                break;
              case this.EQUIT:
                this.rq = Math.sqrt(0.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = 0.5 * this.qp;
                break;
              case this.OBLIQ:
                this.rq = Math.sqrt(0.5 * this.qp), e = Math.sin(this.lat0), this.sinb1 = ye(this.e, e) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * e * e) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
                break;
            }
          } else
            this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
        }
        function ra(t) {
          var e, i, u, o, f, c, l, w, L, pt, st = t.x, bt = t.y;
          if (st = v(st - this.long0), this.sphere) {
            if (f = Math.sin(bt), pt = Math.cos(bt), u = Math.cos(st), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              if (i = this.mode === this.EQUIT ? 1 + pt * u : 1 + this.sinph0 * f + this.cosph0 * pt * u, i <= H)
                return null;
              i = Math.sqrt(2 / i), e = i * pt * Math.sin(st), i *= this.mode === this.EQUIT ? f : this.cosph0 * f - this.sinph0 * pt * u;
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE && (u = -u), Math.abs(bt + this.lat0) < H)
                return null;
              i = P - bt * 0.5, i = 2 * (this.mode === this.S_POLE ? Math.cos(i) : Math.sin(i)), e = i * Math.sin(st), i *= u;
            }
          } else {
            switch (l = 0, w = 0, L = 0, u = Math.cos(st), o = Math.sin(st), f = Math.sin(bt), c = ye(this.e, f), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (l = c / this.qp, w = Math.sqrt(1 - l * l)), this.mode) {
              case this.OBLIQ:
                L = 1 + this.sinb1 * l + this.cosb1 * w * u;
                break;
              case this.EQUIT:
                L = 1 + w * u;
                break;
              case this.N_POLE:
                L = W + bt, c = this.qp - c;
                break;
              case this.S_POLE:
                L = bt - W, c = this.qp + c;
                break;
            }
            if (Math.abs(L) < H)
              return null;
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                L = Math.sqrt(2 / L), this.mode === this.OBLIQ ? i = this.ymf * L * (this.cosb1 * l - this.sinb1 * w * u) : i = (L = Math.sqrt(2 / (1 + w * u))) * l * this.ymf, e = this.xmf * L * w * o;
                break;
              case this.N_POLE:
              case this.S_POLE:
                c >= 0 ? (e = (L = Math.sqrt(c)) * o, i = u * (this.mode === this.S_POLE ? L : -L)) : e = i = 0;
                break;
            }
          }
          return t.x = this.a * e + this.x0, t.y = this.a * i + this.y0, t;
        }
        function ia(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e = t.x / this.a, i = t.y / this.a, u, o, f, c, l, w, L;
          if (this.sphere) {
            var pt = 0, st, bt = 0;
            if (st = Math.sqrt(e * e + i * i), o = st * 0.5, o > 1)
              return null;
            switch (o = 2 * Math.asin(o), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (bt = Math.sin(o), pt = Math.cos(o)), this.mode) {
              case this.EQUIT:
                o = Math.abs(st) <= H ? 0 : Math.asin(i * bt / st), e *= bt, i = pt * st;
                break;
              case this.OBLIQ:
                o = Math.abs(st) <= H ? this.lat0 : Math.asin(pt * this.sinph0 + i * bt * this.cosph0 / st), e *= bt * this.cosph0, i = (pt - Math.sin(o) * this.sinph0) * st;
                break;
              case this.N_POLE:
                i = -i, o = W - o;
                break;
              case this.S_POLE:
                o -= W;
                break;
            }
            u = i === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(e, i);
          } else {
            if (L = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              if (e /= this.dd, i *= this.dd, w = Math.sqrt(e * e + i * i), w < H)
                return t.x = this.long0, t.y = this.lat0, t;
              c = 2 * Math.asin(0.5 * w / this.rq), f = Math.cos(c), e *= c = Math.sin(c), this.mode === this.OBLIQ ? (L = f * this.sinb1 + i * c * this.cosb1 / w, l = this.qp * L, i = w * this.cosb1 * f - i * this.sinb1 * c) : (L = i * c / w, l = this.qp * L, i = w * f);
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE && (i = -i), l = e * e + i * i, !l)
                return t.x = this.long0, t.y = this.lat0, t;
              L = 1 - l / this.qp, this.mode === this.S_POLE && (L = -L);
            }
            u = Math.atan2(e, i), o = fa(Math.asin(L), this.apa);
          }
          return t.x = v(this.long0 + u), t.y = o, t;
        }
        var na = 0.3333333333333333, aa = 0.17222222222222222, sa = 0.10257936507936508, oa = 0.06388888888888888, ha = 0.0664021164021164, ua = 0.016415012942191543;
        function la(t) {
          var e, i = [];
          return i[0] = t * na, e = t * t, i[0] += e * aa, i[1] = e * oa, e *= t, i[0] += e * sa, i[1] += e * ha, i[2] = e * ua, i;
        }
        function fa(t, e) {
          var i = t + t;
          return t + e[0] * Math.sin(i) + e[1] * Math.sin(i + i) + e[2] * Math.sin(i + i + i);
        }
        var ca = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"], da = {
          init: ea,
          forward: ra,
          inverse: ia,
          names: ca,
          S_POLE: Kn,
          N_POLE: Qn,
          EQUIT: Yn,
          OBLIQ: ta
        }, ge = function(t) {
          return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t);
        };
        function pa() {
          Math.abs(this.lat1 + this.lat2) < H || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = d(this.e3, this.sin_po, this.cos_po), this.qs1 = ye(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = d(this.e3, this.sin_po, this.cos_po), this.qs2 = ye(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = ye(this.e3, this.sin_po), Math.abs(this.lat1 - this.lat2) > H ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
        }
        function ma(t) {
          var e = t.x, i = t.y;
          this.sin_phi = Math.sin(i), this.cos_phi = Math.cos(i);
          var u = ye(this.e3, this.sin_phi), o = this.a * Math.sqrt(this.c - this.ns0 * u) / this.ns0, f = this.ns0 * v(e - this.long0), c = o * Math.sin(f) + this.x0, l = this.rh - o * Math.cos(f) + this.y0;
          return t.x = c, t.y = l, t;
        }
        function va(t) {
          var e, i, u, o, f, c;
          return t.x -= this.x0, t.y = this.rh - t.y + this.y0, this.ns0 >= 0 ? (e = Math.sqrt(t.x * t.x + t.y * t.y), u = 1) : (e = -Math.sqrt(t.x * t.x + t.y * t.y), u = -1), o = 0, e !== 0 && (o = Math.atan2(u * t.x, u * t.y)), u = e * this.ns0 / this.a, this.sphere ? c = Math.asin((this.c - u * u) / (2 * this.ns0)) : (i = (this.c - u * u) / this.ns0, c = this.phi1z(this.e3, i)), f = v(o / this.ns0 + this.long0), t.x = f, t.y = c, t;
        }
        function ya(t, e) {
          var i, u, o, f, c, l = ge(0.5 * e);
          if (t < H)
            return l;
          for (var w = t * t, L = 1; L <= 25; L++)
            if (i = Math.sin(l), u = Math.cos(l), o = t * i, f = 1 - o * o, c = 0.5 * f * f / u * (e / (1 - w) - i / f + 0.5 / t * Math.log((1 - o) / (1 + o))), l = l + c, Math.abs(c) <= 1e-7)
              return l;
          return null;
        }
        var ga = ["Albers_Conic_Equal_Area", "Albers", "aea"], _a = {
          init: pa,
          forward: ma,
          inverse: va,
          names: ga,
          phi1z: ya
        };
        function xa() {
          this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
        }
        function wa(t) {
          var e, i, u, o, f, c, l, w, L = t.x, pt = t.y;
          return u = v(L - this.long0), e = Math.sin(pt), i = Math.cos(pt), o = Math.cos(u), c = this.sin_p14 * e + this.cos_p14 * i * o, f = 1, c > 0 || Math.abs(c) <= H ? (l = this.x0 + this.a * f * i * Math.sin(u) / c, w = this.y0 + this.a * f * (this.cos_p14 * e - this.sin_p14 * i * o) / c) : (l = this.x0 + this.infinity_dist * i * Math.sin(u), w = this.y0 + this.infinity_dist * (this.cos_p14 * e - this.sin_p14 * i * o)), t.x = l, t.y = w, t;
        }
        function Ma(t) {
          var e, i, u, o, f, c;
          return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, (e = Math.sqrt(t.x * t.x + t.y * t.y)) ? (o = Math.atan2(e, this.rc), i = Math.sin(o), u = Math.cos(o), c = ge(u * this.sin_p14 + t.y * i * this.cos_p14 / e), f = Math.atan2(t.x * i, e * this.cos_p14 * u - t.y * this.sin_p14 * i), f = v(this.long0 + f)) : (c = this.phic0, f = 0), t.x = f, t.y = c, t;
        }
        var ba = ["gnom"], Ea = {
          init: xa,
          forward: wa,
          inverse: Ma,
          names: ba
        }, Aa = function(t, e) {
          var i = 1 - (1 - t * t) / (2 * t) * Math.log((1 - t) / (1 + t));
          if (Math.abs(Math.abs(e) - i) < 1e-6)
            return e < 0 ? -1 * W : W;
          for (var u = Math.asin(0.5 * e), o, f, c, l, w = 0; w < 30; w++)
            if (f = Math.sin(u), c = Math.cos(u), l = t * f, o = Math.pow(1 - l * l, 2) / (2 * c) * (e / (1 - t * t) - f / (1 - l * l) + 0.5 / t * Math.log((1 - l) / (1 + l))), u += o, Math.abs(o) <= 1e-10)
              return u;
          return NaN;
        };
        function Ca() {
          this.sphere || (this.k0 = d(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
        }
        function Sa(t) {
          var e = t.x, i = t.y, u, o, f = v(e - this.long0);
          if (this.sphere)
            u = this.x0 + this.a * f * Math.cos(this.lat_ts), o = this.y0 + this.a * Math.sin(i) / Math.cos(this.lat_ts);
          else {
            var c = ye(this.e, Math.sin(i));
            u = this.x0 + this.a * this.k0 * f, o = this.y0 + this.a * c * 0.5 / this.k0;
          }
          return t.x = u, t.y = o, t;
        }
        function ka(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e, i;
          return this.sphere ? (e = v(this.long0 + t.x / this.a / Math.cos(this.lat_ts)), i = Math.asin(t.y / this.a * Math.cos(this.lat_ts))) : (i = Aa(this.e, 2 * t.y * this.k0 / this.a), e = v(this.long0 + t.x / (this.a * this.k0))), t.x = e, t.y = i, t;
        }
        var Ia = ["cea"], Ta = {
          init: Ca,
          forward: Sa,
          inverse: ka,
          names: Ia
        };
        function Fa() {
          this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
        }
        function Ba(t) {
          var e = t.x, i = t.y, u = v(e - this.long0), o = Fe(i - this.lat0);
          return t.x = this.x0 + this.a * u * this.rc, t.y = this.y0 + this.a * o, t;
        }
        function Oa(t) {
          var e = t.x, i = t.y;
          return t.x = v(this.long0 + (e - this.x0) / (this.a * this.rc)), t.y = Fe(this.lat0 + (i - this.y0) / this.a), t;
        }
        var Pa = ["Equirectangular", "Equidistant_Cylindrical", "eqc"], Na = {
          init: Fa,
          forward: Ba,
          inverse: Oa,
          names: Pa
        }, Hr = 20;
        function Ra() {
          this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ze(this.es), this.e1 = Le(this.es), this.e2 = De(this.es), this.e3 = Ue(this.es), this.ml0 = this.a * oe(this.e0, this.e1, this.e2, this.e3, this.lat0);
        }
        function za(t) {
          var e = t.x, i = t.y, u, o, f, c = v(e - this.long0);
          if (f = c * Math.sin(i), this.sphere)
            Math.abs(i) <= H ? (u = this.a * c, o = -1 * this.a * this.lat0) : (u = this.a * Math.sin(f) / Math.tan(i), o = this.a * (Fe(i - this.lat0) + (1 - Math.cos(f)) / Math.tan(i)));
          else if (Math.abs(i) <= H)
            u = this.a * c, o = -1 * this.ml0;
          else {
            var l = Te(this.a, this.e, Math.sin(i)) / Math.tan(i);
            u = l * Math.sin(f), o = this.a * oe(this.e0, this.e1, this.e2, this.e3, i) - this.ml0 + l * (1 - Math.cos(f));
          }
          return t.x = u + this.x0, t.y = o + this.y0, t;
        }
        function La(t) {
          var e, i, u, o, f, c, l, w, L;
          if (u = t.x - this.x0, o = t.y - this.y0, this.sphere)
            if (Math.abs(o + this.a * this.lat0) <= H)
              e = v(u / this.a + this.long0), i = 0;
            else {
              c = this.lat0 + o / this.a, l = u * u / this.a / this.a + c * c, w = c;
              var pt;
              for (f = Hr; f; --f)
                if (pt = Math.tan(w), L = -1 * (c * (w * pt + 1) - w - 0.5 * (w * w + l) * pt) / ((w - c) / pt - 1), w += L, Math.abs(L) <= H) {
                  i = w;
                  break;
                }
              e = v(this.long0 + Math.asin(u * Math.tan(w) / this.a) / Math.sin(i));
            }
          else if (Math.abs(o + this.ml0) <= H)
            i = 0, e = v(this.long0 + u / this.a);
          else {
            c = (this.ml0 + o) / this.a, l = u * u / this.a / this.a + c * c, w = c;
            var st, bt, Tt, St, Ot;
            for (f = Hr; f; --f)
              if (Ot = this.e * Math.sin(w), st = Math.sqrt(1 - Ot * Ot) * Math.tan(w), bt = this.a * oe(this.e0, this.e1, this.e2, this.e3, w), Tt = this.e0 - 2 * this.e1 * Math.cos(2 * w) + 4 * this.e2 * Math.cos(4 * w) - 6 * this.e3 * Math.cos(6 * w), St = bt / this.a, L = (c * (st * St + 1) - St - 0.5 * st * (St * St + l)) / (this.es * Math.sin(2 * w) * (St * St + l - 2 * c * St) / (4 * st) + (c - St) * (st * Tt - 2 / Math.sin(2 * w)) - Tt), w -= L, Math.abs(L) <= H) {
                i = w;
                break;
              }
            st = Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) * Math.tan(i), e = v(this.long0 + Math.asin(u * st / this.a) / Math.sin(i));
          }
          return t.x = e, t.y = i, t;
        }
        var Da = ["Polyconic", "poly"], Ua = {
          init: Ra,
          forward: za,
          inverse: La,
          names: Da
        };
        function ja() {
          this.A = [], this.A[1] = 0.6399175073, this.A[2] = -0.1358797613, this.A[3] = 0.063294409, this.A[4] = -0.02526853, this.A[5] = 0.0117879, this.A[6] = -55161e-7, this.A[7] = 26906e-7, this.A[8] = -1333e-6, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = 0.7557853228, this.B_im[1] = 0, this.B_re[2] = 0.249204646, this.B_im[2] = 3371507e-9, this.B_re[3] = -1541739e-9, this.B_im[3] = 0.04105856, this.B_re[4] = -0.10162907, this.B_im[4] = 0.01727609, this.B_re[5] = -0.26623489, this.B_im[5] = -0.36249218, this.B_re[6] = -0.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -0.577245789, this.C_im[2] = -7809598e-9, this.C_re[3] = 0.508307513, this.C_im[3] = -0.112208952, this.C_re[4] = -0.15094762, this.C_im[4] = 0.18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = 0.5185406398, this.D[3] = -0.03333098, this.D[4] = -0.1052906, this.D[5] = -0.0368594, this.D[6] = 7317e-6, this.D[7] = 0.0122, this.D[8] = 394e-5, this.D[9] = -13e-4;
        }
        function Ga(t) {
          var e, i = t.x, u = t.y, o = u - this.lat0, f = i - this.long0, c = o / tt * 1e-5, l = f, w = 1, L = 0;
          for (e = 1; e <= 10; e++)
            w = w * c, L = L + this.A[e] * w;
          var pt = L, st = l, bt = 1, Tt = 0, St, Ot, Pt = 0, Ut = 0;
          for (e = 1; e <= 6; e++)
            St = bt * pt - Tt * st, Ot = Tt * pt + bt * st, bt = St, Tt = Ot, Pt = Pt + this.B_re[e] * bt - this.B_im[e] * Tt, Ut = Ut + this.B_im[e] * bt + this.B_re[e] * Tt;
          return t.x = Ut * this.a + this.x0, t.y = Pt * this.a + this.y0, t;
        }
        function Wa(t) {
          var e, i = t.x, u = t.y, o = i - this.x0, f = u - this.y0, c = f / this.a, l = o / this.a, w = 1, L = 0, pt, st, bt = 0, Tt = 0;
          for (e = 1; e <= 6; e++)
            pt = w * c - L * l, st = L * c + w * l, w = pt, L = st, bt = bt + this.C_re[e] * w - this.C_im[e] * L, Tt = Tt + this.C_im[e] * w + this.C_re[e] * L;
          for (var St = 0; St < this.iterations; St++) {
            var Ot = bt, Pt = Tt, Ut, Zt, Xt = c, Yt = l;
            for (e = 2; e <= 6; e++)
              Ut = Ot * bt - Pt * Tt, Zt = Pt * bt + Ot * Tt, Ot = Ut, Pt = Zt, Xt = Xt + (e - 1) * (this.B_re[e] * Ot - this.B_im[e] * Pt), Yt = Yt + (e - 1) * (this.B_im[e] * Ot + this.B_re[e] * Pt);
            Ot = 1, Pt = 0;
            var Vt = this.B_re[1], Qt = this.B_im[1];
            for (e = 2; e <= 6; e++)
              Ut = Ot * bt - Pt * Tt, Zt = Pt * bt + Ot * Tt, Ot = Ut, Pt = Zt, Vt = Vt + e * (this.B_re[e] * Ot - this.B_im[e] * Pt), Qt = Qt + e * (this.B_im[e] * Ot + this.B_re[e] * Pt);
            var se = Vt * Vt + Qt * Qt;
            bt = (Xt * Vt + Yt * Qt) / se, Tt = (Yt * Vt - Xt * Qt) / se;
          }
          var ee = bt, pe = Tt, Me = 1, be = 0;
          for (e = 1; e <= 9; e++)
            Me = Me * ee, be = be + this.D[e] * Me;
          var er = this.lat0 + be * tt * 1e5, Qs = this.long0 + pe;
          return t.x = Qs, t.y = er, t;
        }
        var qa = ["New_Zealand_Map_Grid", "nzmg"], $a = {
          init: ja,
          forward: Ga,
          inverse: Wa,
          names: qa
        };
        function Za() {
        }
        function Ha(t) {
          var e = t.x, i = t.y, u = v(e - this.long0), o = this.x0 + this.a * u, f = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
          return t.x = o, t.y = f, t;
        }
        function Ja(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e = v(this.long0 + t.x / this.a), i = 2.5 * (Math.atan(Math.exp(0.8 * t.y / this.a)) - Math.PI / 4);
          return t.x = e, t.y = i, t;
        }
        var Xa = ["Miller_Cylindrical", "mill"], Va = {
          init: Za,
          forward: Ha,
          inverse: Ja,
          names: Xa
        }, Ka = 20;
        function Qa() {
          this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = Wr(this.es);
        }
        function Ya(t) {
          var e, i, u = t.x, o = t.y;
          if (u = v(u - this.long0), this.sphere) {
            if (!this.m)
              o = this.n !== 1 ? Math.asin(this.n * Math.sin(o)) : o;
            else
              for (var f = this.n * Math.sin(o), c = Ka; c; --c) {
                var l = (this.m * o + Math.sin(o) - f) / (this.m + Math.cos(o));
                if (o -= l, Math.abs(l) < H)
                  break;
              }
            e = this.a * this.C_x * u * (this.m + Math.cos(o)), i = this.a * this.C_y * o;
          } else {
            var w = Math.sin(o), L = Math.cos(o);
            i = this.a * Je(o, w, L, this.en), e = this.a * u * L / Math.sqrt(1 - this.es * w * w);
          }
          return t.x = e, t.y = i, t;
        }
        function ts(t) {
          var e, i, u, o;
          return t.x -= this.x0, u = t.x / this.a, t.y -= this.y0, e = t.y / this.a, this.sphere ? (e /= this.C_y, u = u / (this.C_x * (this.m + Math.cos(e))), this.m ? e = ge((this.m * e + Math.sin(e)) / this.n) : this.n !== 1 && (e = ge(Math.sin(e) / this.n)), u = v(u + this.long0), e = Fe(e)) : (e = qr(t.y / this.a, this.es, this.en), o = Math.abs(e), o < W ? (o = Math.sin(e), i = this.long0 + t.x * Math.sqrt(1 - this.es * o * o) / (this.a * Math.cos(e)), u = v(i)) : o - H < W && (u = this.long0)), t.x = u, t.y = e, t;
        }
        var es = ["Sinusoidal", "sinu"], rs = {
          init: Qa,
          forward: Ya,
          inverse: ts,
          names: es
        };
        function is() {
        }
        function ns(t) {
          for (var e = t.x, i = t.y, u = v(e - this.long0), o = i, f = Math.PI * Math.sin(i); ; ) {
            var c = -(o + Math.sin(o) - f) / (1 + Math.cos(o));
            if (o += c, Math.abs(c) < H)
              break;
          }
          o /= 2, Math.PI / 2 - Math.abs(i) < H && (u = 0);
          var l = 0.900316316158 * this.a * u * Math.cos(o) + this.x0, w = 1.4142135623731 * this.a * Math.sin(o) + this.y0;
          return t.x = l, t.y = w, t;
        }
        function as(t) {
          var e, i;
          t.x -= this.x0, t.y -= this.y0, i = t.y / (1.4142135623731 * this.a), Math.abs(i) > 0.999999999999 && (i = 0.999999999999), e = Math.asin(i);
          var u = v(this.long0 + t.x / (0.900316316158 * this.a * Math.cos(e)));
          u < -Math.PI && (u = -Math.PI), u > Math.PI && (u = Math.PI), i = (2 * e + Math.sin(2 * e)) / Math.PI, Math.abs(i) > 1 && (i = 1);
          var o = Math.asin(i);
          return t.x = u, t.y = o, t;
        }
        var ss = ["Mollweide", "moll"], os = {
          init: is,
          forward: ns,
          inverse: as,
          names: ss
        };
        function hs() {
          Math.abs(this.lat1 + this.lat2) < H || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ze(this.es), this.e1 = Le(this.es), this.e2 = De(this.es), this.e3 = Ue(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = d(this.e, this.sinphi, this.cosphi), this.ml1 = oe(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < H ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = d(this.e, this.sinphi, this.cosphi), this.ml2 = oe(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = oe(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
        }
        function us(t) {
          var e = t.x, i = t.y, u;
          if (this.sphere)
            u = this.a * (this.g - i);
          else {
            var o = oe(this.e0, this.e1, this.e2, this.e3, i);
            u = this.a * (this.g - o);
          }
          var f = this.ns * v(e - this.long0), c = this.x0 + u * Math.sin(f), l = this.y0 + this.rh - u * Math.cos(f);
          return t.x = c, t.y = l, t;
        }
        function ls(t) {
          t.x -= this.x0, t.y = this.rh - t.y + this.y0;
          var e, i, u, o;
          this.ns >= 0 ? (i = Math.sqrt(t.x * t.x + t.y * t.y), e = 1) : (i = -Math.sqrt(t.x * t.x + t.y * t.y), e = -1);
          var f = 0;
          if (i !== 0 && (f = Math.atan2(e * t.x, e * t.y)), this.sphere)
            return o = v(this.long0 + f / this.ns), u = Fe(this.g - i / this.a), t.x = o, t.y = u, t;
          var c = this.g - i / this.a;
          return u = Qe(c, this.e0, this.e1, this.e2, this.e3), o = v(this.long0 + f / this.ns), t.x = o, t.y = u, t;
        }
        var fs = ["Equidistant_Conic", "eqdc"], cs = {
          init: hs,
          forward: us,
          inverse: ls,
          names: fs
        };
        function ds() {
          this.R = this.a;
        }
        function ps(t) {
          var e = t.x, i = t.y, u = v(e - this.long0), o, f;
          Math.abs(i) <= H && (o = this.x0 + this.R * u, f = this.y0);
          var c = ge(2 * Math.abs(i / Math.PI));
          (Math.abs(u) <= H || Math.abs(Math.abs(i) - W) <= H) && (o = this.x0, i >= 0 ? f = this.y0 + Math.PI * this.R * Math.tan(0.5 * c) : f = this.y0 + Math.PI * this.R * -Math.tan(0.5 * c));
          var l = 0.5 * Math.abs(Math.PI / u - u / Math.PI), w = l * l, L = Math.sin(c), pt = Math.cos(c), st = pt / (L + pt - 1), bt = st * st, Tt = st * (2 / L - 1), St = Tt * Tt, Ot = Math.PI * this.R * (l * (st - St) + Math.sqrt(w * (st - St) * (st - St) - (St + w) * (bt - St))) / (St + w);
          u < 0 && (Ot = -Ot), o = this.x0 + Ot;
          var Pt = w + st;
          return Ot = Math.PI * this.R * (Tt * Pt - l * Math.sqrt((St + w) * (w + 1) - Pt * Pt)) / (St + w), i >= 0 ? f = this.y0 + Ot : f = this.y0 - Ot, t.x = o, t.y = f, t;
        }
        function ms(t) {
          var e, i, u, o, f, c, l, w, L, pt, st, bt, Tt;
          return t.x -= this.x0, t.y -= this.y0, st = Math.PI * this.R, u = t.x / st, o = t.y / st, f = u * u + o * o, c = -Math.abs(o) * (1 + f), l = c - 2 * o * o + u * u, w = -2 * c + 1 + 2 * o * o + f * f, Tt = o * o / w + (2 * l * l * l / w / w / w - 9 * c * l / w / w) / 27, L = (c - l * l / 3 / w) / w, pt = 2 * Math.sqrt(-L / 3), st = 3 * Tt / L / pt, Math.abs(st) > 1 && (st >= 0 ? st = 1 : st = -1), bt = Math.acos(st) / 3, t.y >= 0 ? i = (-pt * Math.cos(bt + Math.PI / 3) - l / 3 / w) * Math.PI : i = -(-pt * Math.cos(bt + Math.PI / 3) - l / 3 / w) * Math.PI, Math.abs(u) < H ? e = this.long0 : e = v(this.long0 + Math.PI * (f - 1 + Math.sqrt(1 + 2 * (u * u - o * o) + f * f)) / 2 / u), t.x = e, t.y = i, t;
        }
        var vs = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"], ys = {
          init: ds,
          forward: ps,
          inverse: ms,
          names: vs
        };
        function gs() {
          this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0);
        }
        function _s(t) {
          var e = t.x, i = t.y, u = Math.sin(t.y), o = Math.cos(t.y), f = v(e - this.long0), c, l, w, L, pt, st, bt, Tt, St, Ot, Pt, Ut, Zt, Xt, Yt, Vt, Qt, se, ee, pe, Me, be, er;
          return this.sphere ? Math.abs(this.sin_p12 - 1) <= H ? (t.x = this.x0 + this.a * (W - i) * Math.sin(f), t.y = this.y0 - this.a * (W - i) * Math.cos(f), t) : Math.abs(this.sin_p12 + 1) <= H ? (t.x = this.x0 + this.a * (W + i) * Math.sin(f), t.y = this.y0 + this.a * (W + i) * Math.cos(f), t) : (se = this.sin_p12 * u + this.cos_p12 * o * Math.cos(f), Vt = Math.acos(se), Qt = Vt ? Vt / Math.sin(Vt) : 1, t.x = this.x0 + this.a * Qt * o * Math.sin(f), t.y = this.y0 + this.a * Qt * (this.cos_p12 * u - this.sin_p12 * o * Math.cos(f)), t) : (c = ze(this.es), l = Le(this.es), w = De(this.es), L = Ue(this.es), Math.abs(this.sin_p12 - 1) <= H ? (pt = this.a * oe(c, l, w, L, W), st = this.a * oe(c, l, w, L, i), t.x = this.x0 + (pt - st) * Math.sin(f), t.y = this.y0 - (pt - st) * Math.cos(f), t) : Math.abs(this.sin_p12 + 1) <= H ? (pt = this.a * oe(c, l, w, L, W), st = this.a * oe(c, l, w, L, i), t.x = this.x0 + (pt + st) * Math.sin(f), t.y = this.y0 + (pt + st) * Math.cos(f), t) : (bt = u / o, Tt = Te(this.a, this.e, this.sin_p12), St = Te(this.a, this.e, u), Ot = Math.atan((1 - this.es) * bt + this.es * Tt * this.sin_p12 / (St * o)), Pt = Math.atan2(Math.sin(f), this.cos_p12 * Math.tan(Ot) - this.sin_p12 * Math.cos(f)), Pt === 0 ? ee = Math.asin(this.cos_p12 * Math.sin(Ot) - this.sin_p12 * Math.cos(Ot)) : Math.abs(Math.abs(Pt) - Math.PI) <= H ? ee = -Math.asin(this.cos_p12 * Math.sin(Ot) - this.sin_p12 * Math.cos(Ot)) : ee = Math.asin(Math.sin(f) * Math.cos(Ot) / Math.sin(Pt)), Ut = this.e * this.sin_p12 / Math.sqrt(1 - this.es), Zt = this.e * this.cos_p12 * Math.cos(Pt) / Math.sqrt(1 - this.es), Xt = Ut * Zt, Yt = Zt * Zt, pe = ee * ee, Me = pe * ee, be = Me * ee, er = be * ee, Vt = Tt * ee * (1 - pe * Yt * (1 - Yt) / 6 + Me / 8 * Xt * (1 - 2 * Yt) + be / 120 * (Yt * (4 - 7 * Yt) - 3 * Ut * Ut * (1 - 7 * Yt)) - er / 48 * Xt), t.x = this.x0 + Vt * Math.sin(Pt), t.y = this.y0 + Vt * Math.cos(Pt), t));
        }
        function xs(t) {
          t.x -= this.x0, t.y -= this.y0;
          var e, i, u, o, f, c, l, w, L, pt, st, bt, Tt, St, Ot, Pt, Ut, Zt, Xt, Yt, Vt, Qt, se, ee;
          return this.sphere ? (e = Math.sqrt(t.x * t.x + t.y * t.y), e > 2 * W * this.a ? void 0 : (i = e / this.a, u = Math.sin(i), o = Math.cos(i), f = this.long0, Math.abs(e) <= H ? c = this.lat0 : (c = ge(o * this.sin_p12 + t.y * u * this.cos_p12 / e), l = Math.abs(this.lat0) - W, Math.abs(l) <= H ? this.lat0 >= 0 ? f = v(this.long0 + Math.atan2(t.x, -t.y)) : f = v(this.long0 - Math.atan2(-t.x, t.y)) : f = v(this.long0 + Math.atan2(t.x * u, e * this.cos_p12 * o - t.y * this.sin_p12 * u))), t.x = f, t.y = c, t)) : (w = ze(this.es), L = Le(this.es), pt = De(this.es), st = Ue(this.es), Math.abs(this.sin_p12 - 1) <= H ? (bt = this.a * oe(w, L, pt, st, W), e = Math.sqrt(t.x * t.x + t.y * t.y), Tt = bt - e, c = Qe(Tt / this.a, w, L, pt, st), f = v(this.long0 + Math.atan2(t.x, -1 * t.y)), t.x = f, t.y = c, t) : Math.abs(this.sin_p12 + 1) <= H ? (bt = this.a * oe(w, L, pt, st, W), e = Math.sqrt(t.x * t.x + t.y * t.y), Tt = e - bt, c = Qe(Tt / this.a, w, L, pt, st), f = v(this.long0 + Math.atan2(t.x, t.y)), t.x = f, t.y = c, t) : (e = Math.sqrt(t.x * t.x + t.y * t.y), Pt = Math.atan2(t.x, t.y), St = Te(this.a, this.e, this.sin_p12), Ut = Math.cos(Pt), Zt = this.e * this.cos_p12 * Ut, Xt = -Zt * Zt / (1 - this.es), Yt = 3 * this.es * (1 - Xt) * this.sin_p12 * this.cos_p12 * Ut / (1 - this.es), Vt = e / St, Qt = Vt - Xt * (1 + Xt) * Math.pow(Vt, 3) / 6 - Yt * (1 + 3 * Xt) * Math.pow(Vt, 4) / 24, se = 1 - Xt * Qt * Qt / 2 - Vt * Qt * Qt * Qt / 6, Ot = Math.asin(this.sin_p12 * Math.cos(Qt) + this.cos_p12 * Math.sin(Qt) * Ut), f = v(this.long0 + Math.asin(Math.sin(Pt) * Math.sin(Qt) / Math.cos(Ot))), ee = Math.sin(Ot), c = Math.atan2((ee - this.es * se * this.sin_p12) * Math.tan(Ot), ee * (1 - this.es)), t.x = f, t.y = c, t));
        }
        var ws = ["Azimuthal_Equidistant", "aeqd"], Ms = {
          init: gs,
          forward: _s,
          inverse: xs,
          names: ws
        };
        function bs() {
          this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0);
        }
        function Es(t) {
          var e, i, u, o, f, c, l, w, L = t.x, pt = t.y;
          return u = v(L - this.long0), e = Math.sin(pt), i = Math.cos(pt), o = Math.cos(u), c = this.sin_p14 * e + this.cos_p14 * i * o, f = 1, (c > 0 || Math.abs(c) <= H) && (l = this.a * f * i * Math.sin(u), w = this.y0 + this.a * f * (this.cos_p14 * e - this.sin_p14 * i * o)), t.x = l, t.y = w, t;
        }
        function As(t) {
          var e, i, u, o, f, c, l;
          return t.x -= this.x0, t.y -= this.y0, e = Math.sqrt(t.x * t.x + t.y * t.y), i = ge(e / this.a), u = Math.sin(i), o = Math.cos(i), c = this.long0, Math.abs(e) <= H ? (l = this.lat0, t.x = c, t.y = l, t) : (l = ge(o * this.sin_p14 + t.y * u * this.cos_p14 / e), f = Math.abs(this.lat0) - W, Math.abs(f) <= H ? (this.lat0 >= 0 ? c = v(this.long0 + Math.atan2(t.x, -t.y)) : c = v(this.long0 - Math.atan2(-t.x, t.y)), t.x = c, t.y = l, t) : (c = v(this.long0 + Math.atan2(t.x * u, e * this.cos_p14 * o - t.y * this.sin_p14 * u)), t.x = c, t.y = l, t));
        }
        var Cs = ["ortho"], Ss = {
          init: bs,
          forward: Es,
          inverse: As,
          names: Cs
        }, te = {
          FRONT: 1,
          RIGHT: 2,
          BACK: 3,
          LEFT: 4,
          TOP: 5,
          BOTTOM: 6
        }, Kt = {
          AREA_0: 1,
          AREA_1: 2,
          AREA_2: 3,
          AREA_3: 4
        };
        function ks() {
          this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= W - P / 2 ? this.face = te.TOP : this.lat0 <= -(W - P / 2) ? this.face = te.BOTTOM : Math.abs(this.long0) <= P ? this.face = te.FRONT : Math.abs(this.long0) <= W + P ? this.face = this.long0 > 0 ? te.RIGHT : te.LEFT : this.face = te.BACK, this.es !== 0 && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
        }
        function Is(t) {
          var e = { x: 0, y: 0 }, i, u, o, f, c, l, w = { value: 0 };
          if (t.x -= this.long0, this.es !== 0 ? i = Math.atan(this.one_minus_f_squared * Math.tan(t.y)) : i = t.y, u = t.x, this.face === te.TOP)
            f = W - i, u >= P && u <= W + P ? (w.value = Kt.AREA_0, o = u - W) : u > W + P || u <= -(W + P) ? (w.value = Kt.AREA_1, o = u > 0 ? u - lt : u + lt) : u > -(W + P) && u <= -P ? (w.value = Kt.AREA_2, o = u + W) : (w.value = Kt.AREA_3, o = u);
          else if (this.face === te.BOTTOM)
            f = W + i, u >= P && u <= W + P ? (w.value = Kt.AREA_0, o = -u + W) : u < P && u >= -P ? (w.value = Kt.AREA_1, o = -u) : u < -P && u >= -(W + P) ? (w.value = Kt.AREA_2, o = -u - W) : (w.value = Kt.AREA_3, o = u > 0 ? -u + lt : -u - lt);
          else {
            var L, pt, st, bt, Tt, St, Ot;
            this.face === te.RIGHT ? u = Be(u, +W) : this.face === te.BACK ? u = Be(u, +lt) : this.face === te.LEFT && (u = Be(u, -W)), bt = Math.sin(i), Tt = Math.cos(i), St = Math.sin(u), Ot = Math.cos(u), L = Tt * Ot, pt = Tt * St, st = bt, this.face === te.FRONT ? (f = Math.acos(L), o = Ye(f, st, pt, w)) : this.face === te.RIGHT ? (f = Math.acos(pt), o = Ye(f, st, -L, w)) : this.face === te.BACK ? (f = Math.acos(-L), o = Ye(f, st, -pt, w)) : this.face === te.LEFT ? (f = Math.acos(-pt), o = Ye(f, st, L, w)) : (f = o = 0, w.value = Kt.AREA_0);
          }
          return l = Math.atan(12 / lt * (o + Math.acos(Math.sin(o) * Math.cos(P)) - W)), c = Math.sqrt((1 - Math.cos(f)) / (Math.cos(l) * Math.cos(l)) / (1 - Math.cos(Math.atan(1 / Math.cos(o))))), w.value === Kt.AREA_1 ? l += W : w.value === Kt.AREA_2 ? l += lt : w.value === Kt.AREA_3 && (l += 1.5 * lt), e.x = c * Math.cos(l), e.y = c * Math.sin(l), e.x = e.x * this.a + this.x0, e.y = e.y * this.a + this.y0, t.x = e.x, t.y = e.y, t;
        }
        function Ts(t) {
          var e = { lam: 0, phi: 0 }, i, u, o, f, c, l, w, L, pt, st = { value: 0 };
          if (t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, u = Math.atan(Math.sqrt(t.x * t.x + t.y * t.y)), i = Math.atan2(t.y, t.x), t.x >= 0 && t.x >= Math.abs(t.y) ? st.value = Kt.AREA_0 : t.y >= 0 && t.y >= Math.abs(t.x) ? (st.value = Kt.AREA_1, i -= W) : t.x < 0 && -t.x >= Math.abs(t.y) ? (st.value = Kt.AREA_2, i = i < 0 ? i + lt : i - lt) : (st.value = Kt.AREA_3, i += W), pt = lt / 12 * Math.tan(i), c = Math.sin(pt) / (Math.cos(pt) - 1 / Math.sqrt(2)), l = Math.atan(c), o = Math.cos(i), f = Math.tan(u), w = 1 - o * o * f * f * (1 - Math.cos(Math.atan(1 / Math.cos(l)))), w < -1 ? w = -1 : w > 1 && (w = 1), this.face === te.TOP)
            L = Math.acos(w), e.phi = W - L, st.value === Kt.AREA_0 ? e.lam = l + W : st.value === Kt.AREA_1 ? e.lam = l < 0 ? l + lt : l - lt : st.value === Kt.AREA_2 ? e.lam = l - W : e.lam = l;
          else if (this.face === te.BOTTOM)
            L = Math.acos(w), e.phi = L - W, st.value === Kt.AREA_0 ? e.lam = -l + W : st.value === Kt.AREA_1 ? e.lam = -l : st.value === Kt.AREA_2 ? e.lam = -l - W : e.lam = l < 0 ? -l - lt : -l + lt;
          else {
            var bt, Tt, St;
            bt = w, pt = bt * bt, pt >= 1 ? St = 0 : St = Math.sqrt(1 - pt) * Math.sin(l), pt += St * St, pt >= 1 ? Tt = 0 : Tt = Math.sqrt(1 - pt), st.value === Kt.AREA_1 ? (pt = Tt, Tt = -St, St = pt) : st.value === Kt.AREA_2 ? (Tt = -Tt, St = -St) : st.value === Kt.AREA_3 && (pt = Tt, Tt = St, St = -pt), this.face === te.RIGHT ? (pt = bt, bt = -Tt, Tt = pt) : this.face === te.BACK ? (bt = -bt, Tt = -Tt) : this.face === te.LEFT && (pt = bt, bt = Tt, Tt = -pt), e.phi = Math.acos(-St) - W, e.lam = Math.atan2(Tt, bt), this.face === te.RIGHT ? e.lam = Be(e.lam, -W) : this.face === te.BACK ? e.lam = Be(e.lam, -lt) : this.face === te.LEFT && (e.lam = Be(e.lam, +W));
          }
          if (this.es !== 0) {
            var Ot, Pt, Ut;
            Ot = e.phi < 0 ? 1 : 0, Pt = Math.tan(e.phi), Ut = this.b / Math.sqrt(Pt * Pt + this.one_minus_f_squared), e.phi = Math.atan(Math.sqrt(this.a * this.a - Ut * Ut) / (this.one_minus_f * Ut)), Ot && (e.phi = -e.phi);
          }
          return e.lam += this.long0, t.x = e.lam, t.y = e.phi, t;
        }
        function Ye(t, e, i, u) {
          var o;
          return t < H ? (u.value = Kt.AREA_0, o = 0) : (o = Math.atan2(e, i), Math.abs(o) <= P ? u.value = Kt.AREA_0 : o > P && o <= W + P ? (u.value = Kt.AREA_1, o -= W) : o > W + P || o <= -(W + P) ? (u.value = Kt.AREA_2, o = o >= 0 ? o - lt : o + lt) : (u.value = Kt.AREA_3, o += W)), o;
        }
        function Be(t, e) {
          var i = t + e;
          return i < -lt ? i += $ : i > +lt && (i -= $), i;
        }
        var Fs = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"], Bs = {
          init: ks,
          forward: Is,
          inverse: Ts,
          names: Fs
        }, yr = [
          [1, 22199e-21, -715515e-10, 31103e-10],
          [0.9986, -482243e-9, -24897e-9, -13309e-10],
          [0.9954, -83103e-8, -448605e-10, -986701e-12],
          [0.99, -135364e-8, -59661e-9, 36777e-10],
          [0.9822, -167442e-8, -449547e-11, -572411e-11],
          [0.973, -214868e-8, -903571e-10, 18736e-12],
          [0.96, -305085e-8, -900761e-10, 164917e-11],
          [0.9427, -382792e-8, -653386e-10, -26154e-10],
          [0.9216, -467746e-8, -10457e-8, 481243e-11],
          [0.8962, -536223e-8, -323831e-10, -543432e-11],
          [0.8679, -609363e-8, -113898e-9, 332484e-11],
          [0.835, -698325e-8, -640253e-10, 934959e-12],
          [0.7986, -755338e-8, -500009e-10, 935324e-12],
          [0.7597, -798324e-8, -35971e-9, -227626e-11],
          [0.7186, -851367e-8, -701149e-10, -86303e-10],
          [0.6732, -986209e-8, -199569e-9, 191974e-10],
          [0.6213, -0.010418, 883923e-10, 624051e-11],
          [0.5722, -906601e-8, 182e-6, 624051e-11],
          [0.5322, -677797e-8, 275608e-9, 624051e-11]
        ], je = [
          [-520417e-23, 0.0124, 121431e-23, -845284e-16],
          [0.062, 0.0124, -126793e-14, 422642e-15],
          [0.124, 0.0124, 507171e-14, -160604e-14],
          [0.186, 0.0123999, -190189e-13, 600152e-14],
          [0.248, 0.0124002, 710039e-13, -224e-10],
          [0.31, 0.0123992, -264997e-12, 835986e-13],
          [0.372, 0.0124029, 988983e-12, -311994e-12],
          [0.434, 0.0123893, -369093e-11, -435621e-12],
          [0.4958, 0.0123198, -102252e-10, -345523e-12],
          [0.5571, 0.0121916, -154081e-10, -582288e-12],
          [0.6176, 0.0119938, -241424e-10, -525327e-12],
          [0.6769, 0.011713, -320223e-10, -516405e-12],
          [0.7346, 0.0113541, -397684e-10, -609052e-12],
          [0.7903, 0.0109107, -489042e-10, -104739e-11],
          [0.8435, 0.0103431, -64615e-9, -140374e-14],
          [0.8936, 969686e-8, -64636e-9, -8547e-9],
          [0.9394, 840947e-8, -192841e-9, -42106e-10],
          [0.9761, 616527e-8, -256e-6, -42106e-10],
          [1, 328947e-8, -319159e-9, -42106e-10]
        ], Jr = 0.8487, Xr = 1.3523, Vr = ft / 5, Os = 1 / Vr, Oe = 18, tr = function(t, e) {
          return t[0] + e * (t[1] + e * (t[2] + e * t[3]));
        }, Ps = function(t, e) {
          return t[1] + e * (2 * t[2] + e * 3 * t[3]);
        };
        function Ns(t, e, i, u) {
          for (var o = e; u; --u) {
            var f = t(o);
            if (o -= f, Math.abs(f) < i)
              break;
          }
          return o;
        }
        function Rs() {
          this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
        }
        function zs(t) {
          var e = v(t.x - this.long0), i = Math.abs(t.y), u = Math.floor(i * Vr);
          u < 0 ? u = 0 : u >= Oe && (u = Oe - 1), i = ft * (i - Os * u);
          var o = {
            x: tr(yr[u], i) * e,
            y: tr(je[u], i)
          };
          return t.y < 0 && (o.y = -o.y), o.x = o.x * this.a * Jr + this.x0, o.y = o.y * this.a * Xr + this.y0, o;
        }
        function Ls(t) {
          var e = {
            x: (t.x - this.x0) / (this.a * Jr),
            y: Math.abs(t.y - this.y0) / (this.a * Xr)
          };
          if (e.y >= 1)
            e.x /= yr[Oe][0], e.y = t.y < 0 ? -W : W;
          else {
            var i = Math.floor(e.y * Oe);
            for (i < 0 ? i = 0 : i >= Oe && (i = Oe - 1); ; )
              if (je[i][0] > e.y)
                --i;
              else if (je[i + 1][0] <= e.y)
                ++i;
              else
                break;
            var u = je[i], o = 5 * (e.y - u[0]) / (je[i + 1][0] - u[0]);
            o = Ns(function(f) {
              return (tr(u, f) - e.y) / Ps(u, f);
            }, o, H, 100), e.x /= tr(yr[i], o), e.y = (5 * i + o) * mt, t.y < 0 && (e.y = -e.y);
          }
          return e.x = v(e.x + this.long0), e;
        }
        var Ds = ["Robinson", "robin"], Us = {
          init: Rs,
          forward: zs,
          inverse: Ls,
          names: Ds
        };
        function js() {
          this.name = "geocent";
        }
        function Gs(t) {
          var e = br(t, this.es, this.a);
          return e;
        }
        function Ws(t) {
          var e = Er(t, this.es, this.a, this.b);
          return e;
        }
        var qs = ["Geocentric", "geocentric", "geocent", "Geocent"], $s = {
          init: js,
          forward: Gs,
          inverse: Ws,
          names: qs
        }, ae = {
          N_POLE: 0,
          S_POLE: 1,
          EQUIT: 2,
          OBLIQ: 3
        }, Ge = {
          h: { def: 1e5, num: !0 },
          // default is Karman line, no default in PROJ.7
          azi: { def: 0, num: !0, degrees: !0 },
          // default is North
          tilt: { def: 0, num: !0, degrees: !0 },
          // default is Nadir
          long0: { def: 0, num: !0 },
          // default is Greenwich, conversion to rad is automatic
          lat0: { def: 0, num: !0 }
          // default is Equator, conversion to rad is automatic
        };
        function Zs() {
          if (Object.keys(Ge).forEach((function(i) {
            if (typeof this[i] > "u")
              this[i] = Ge[i].def;
            else {
              if (Ge[i].num && isNaN(this[i]))
                throw new Error("Invalid parameter value, must be numeric " + i + " = " + this[i]);
              Ge[i].num && (this[i] = parseFloat(this[i]));
            }
            Ge[i].degrees && (this[i] = this[i] * mt);
          }).bind(this)), Math.abs(Math.abs(this.lat0) - W) < H ? this.mode = this.lat0 < 0 ? ae.S_POLE : ae.N_POLE : Math.abs(this.lat0) < H ? this.mode = ae.EQUIT : (this.mode = ae.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10)
            throw new Error("Invalid height");
          this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
          var t = this.tilt, e = this.azi;
          this.cg = Math.cos(e), this.sg = Math.sin(e), this.cw = Math.cos(t), this.sw = Math.sin(t);
        }
        function Hs(t) {
          t.x -= this.long0;
          var e = Math.sin(t.y), i = Math.cos(t.y), u = Math.cos(t.x), o, f;
          switch (this.mode) {
            case ae.OBLIQ:
              f = this.sinph0 * e + this.cosph0 * i * u;
              break;
            case ae.EQUIT:
              f = i * u;
              break;
            case ae.S_POLE:
              f = -e;
              break;
            case ae.N_POLE:
              f = e;
              break;
          }
          switch (f = this.pn1 / (this.p - f), o = f * i * Math.sin(t.x), this.mode) {
            case ae.OBLIQ:
              f *= this.cosph0 * e - this.sinph0 * i * u;
              break;
            case ae.EQUIT:
              f *= e;
              break;
            case ae.N_POLE:
              f *= -(i * u);
              break;
            case ae.S_POLE:
              f *= i * u;
              break;
          }
          var c, l;
          return c = f * this.cg + o * this.sg, l = 1 / (c * this.sw * this.h1 + this.cw), o = (o * this.cg - f * this.sg) * this.cw * l, f = c * l, t.x = o * this.a, t.y = f * this.a, t;
        }
        function Js(t) {
          t.x /= this.a, t.y /= this.a;
          var e = { x: t.x, y: t.y }, i, u, o;
          o = 1 / (this.pn1 - t.y * this.sw), i = this.pn1 * t.x * o, u = this.pn1 * t.y * this.cw * o, t.x = i * this.cg + u * this.sg, t.y = u * this.cg - i * this.sg;
          var f = Ve(t.x, t.y);
          if (Math.abs(f) < H)
            e.x = 0, e.y = t.y;
          else {
            var c, l;
            switch (l = 1 - f * f * this.pfact, l = (this.p - Math.sqrt(l)) / (this.pn1 / f + f / this.pn1), c = Math.sqrt(1 - l * l), this.mode) {
              case ae.OBLIQ:
                e.y = Math.asin(c * this.sinph0 + t.y * l * this.cosph0 / f), t.y = (c - this.sinph0 * Math.sin(e.y)) * f, t.x *= l * this.cosph0;
                break;
              case ae.EQUIT:
                e.y = Math.asin(t.y * l / f), t.y = c * f, t.x *= l;
                break;
              case ae.N_POLE:
                e.y = Math.asin(c), t.y = -t.y;
                break;
              case ae.S_POLE:
                e.y = -Math.asin(c);
                break;
            }
            e.x = Math.atan2(t.x, t.y);
          }
          return t.x = e.x + this.long0, t.y = e.y, t;
        }
        var Xs = ["Tilted_Perspective", "tpers"], Vs = {
          init: Zs,
          forward: Hs,
          inverse: Js,
          names: Xs
        }, Ks = function(t) {
          t.Proj.projections.add(Xe), t.Proj.projections.add(Ke), t.Proj.projections.add(hn), t.Proj.projections.add(gn), t.Proj.projections.add(En), t.Proj.projections.add(In), t.Proj.projections.add(Nn), t.Proj.projections.add(Un), t.Proj.projections.add($n), t.Proj.projections.add(Vn), t.Proj.projections.add(da), t.Proj.projections.add(_a), t.Proj.projections.add(Ea), t.Proj.projections.add(Ta), t.Proj.projections.add(Na), t.Proj.projections.add(Ua), t.Proj.projections.add($a), t.Proj.projections.add(Va), t.Proj.projections.add(rs), t.Proj.projections.add(os), t.Proj.projections.add(cs), t.Proj.projections.add(ys), t.Proj.projections.add(Ms), t.Proj.projections.add(Ss), t.Proj.projections.add(Bs), t.Proj.projections.add(Us), t.Proj.projections.add($s), t.Proj.projections.add(Vs);
        };
        return ue.defaultDatum = "WGS84", ue.Proj = de, ue.WGS84 = new ue.Proj("WGS84"), ue.Point = ke, ue.toPoint = kr, ue.defs = Bt, ue.nadgrid = $e, ue.transform = He, ue.mgrs = Ai, ue.version = "2.7.4", Ks(ue), ue;
      });
    }, {}], 18: [function(b, rt, ct) {
      /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
      var nt = b("buffer"), O = nt.Buffer;
      function dt(J, M) {
        for (var m in J)
          M[m] = J[m];
      }
      O.from && O.alloc && O.allocUnsafe && O.allocUnsafeSlow ? rt.exports = nt : (dt(nt, ct), ct.Buffer = vt);
      function vt(J, M, m) {
        return O(J, M, m);
      }
      vt.prototype = Object.create(O.prototype), dt(O, vt), vt.from = function(J, M, m) {
        if (typeof J == "number")
          throw new TypeError("Argument must not be a number");
        return O(J, M, m);
      }, vt.alloc = function(J, M, m) {
        if (typeof J != "number")
          throw new TypeError("Argument must be a number");
        var ot = O(J);
        return M !== void 0 ? typeof m == "string" ? ot.fill(M, m) : ot.fill(M) : ot.fill(0), ot;
      }, vt.allocUnsafe = function(J) {
        if (typeof J != "number")
          throw new TypeError("Argument must be a number");
        return O(J);
      }, vt.allocUnsafeSlow = function(J) {
        if (typeof J != "number")
          throw new TypeError("Argument must be a number");
        return nt.SlowBuffer(J);
      };
    }, { buffer: 8 }], 19: [function(b, rt, ct) {
      var nt = b("safe-buffer").Buffer, O = nt.isEncoding || function(P) {
        switch (P = "" + P, P && P.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
      function dt(P) {
        if (!P)
          return "utf8";
        for (var $; ; )
          switch (P) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return P;
            default:
              if ($)
                return;
              P = ("" + P).toLowerCase(), $ = !0;
          }
      }
      function vt(P) {
        var $ = dt(P);
        if (typeof $ != "string" && (nt.isEncoding === O || !O(P)))
          throw new Error("Unknown encoding: " + P);
        return $ || P;
      }
      ct.StringDecoder = J;
      function J(P) {
        this.encoding = vt(P);
        var $;
        switch (this.encoding) {
          case "utf16le":
            this.text = xt, this.end = j, $ = 4;
            break;
          case "utf8":
            this.fillLast = K, $ = 4;
            break;
          case "base64":
            this.text = ht, this.end = H, $ = 3;
            break;
          default:
            this.write = mt, this.end = ft;
            return;
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = nt.allocUnsafe($);
      }
      J.prototype.write = function(P) {
        if (P.length === 0)
          return "";
        var $, lt;
        if (this.lastNeed) {
          if ($ = this.fillLast(P), $ === void 0)
            return "";
          lt = this.lastNeed, this.lastNeed = 0;
        } else
          lt = 0;
        return lt < P.length ? $ ? $ + this.text(P, lt) : this.text(P, lt) : $ || "";
      }, J.prototype.end = W, J.prototype.text = tt, J.prototype.fillLast = function(P) {
        if (this.lastNeed <= P.length)
          return P.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        P.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, P.length), this.lastNeed -= P.length;
      };
      function M(P) {
        return P <= 127 ? 0 : P >> 5 === 6 ? 2 : P >> 4 === 14 ? 3 : P >> 3 === 30 ? 4 : P >> 6 === 2 ? -1 : -2;
      }
      function m(P, $, lt) {
        var Et = $.length - 1;
        if (Et < lt)
          return 0;
        var kt = M($[Et]);
        return kt >= 0 ? (kt > 0 && (P.lastNeed = kt - 1), kt) : --Et < lt || kt === -2 ? 0 : (kt = M($[Et]), kt >= 0 ? (kt > 0 && (P.lastNeed = kt - 2), kt) : --Et < lt || kt === -2 ? 0 : (kt = M($[Et]), kt >= 0 ? (kt > 0 && (kt === 2 ? kt = 0 : P.lastNeed = kt - 3), kt) : 0));
      }
      function ot(P, $, lt) {
        if (($[0] & 192) !== 128)
          return P.lastNeed = 0, "�";
        if (P.lastNeed > 1 && $.length > 1) {
          if (($[1] & 192) !== 128)
            return P.lastNeed = 1, "�";
          if (P.lastNeed > 2 && $.length > 2 && ($[2] & 192) !== 128)
            return P.lastNeed = 2, "�";
        }
      }
      function K(P) {
        var $ = this.lastTotal - this.lastNeed, lt = ot(this, P);
        if (lt !== void 0)
          return lt;
        if (this.lastNeed <= P.length)
          return P.copy(this.lastChar, $, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        P.copy(this.lastChar, $, 0, P.length), this.lastNeed -= P.length;
      }
      function tt(P, $) {
        var lt = m(this, P, $);
        if (!this.lastNeed)
          return P.toString("utf8", $);
        this.lastTotal = lt;
        var Et = P.length - (lt - this.lastNeed);
        return P.copy(this.lastChar, 0, Et), P.toString("utf8", $, Et);
      }
      function W(P) {
        var $ = P && P.length ? this.write(P) : "";
        return this.lastNeed ? $ + "�" : $;
      }
      function xt(P, $) {
        if ((P.length - $) % 2 === 0) {
          var lt = P.toString("utf16le", $);
          if (lt) {
            var Et = lt.charCodeAt(lt.length - 1);
            if (Et >= 55296 && Et <= 56319)
              return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = P[P.length - 2], this.lastChar[1] = P[P.length - 1], lt.slice(0, -1);
          }
          return lt;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = P[P.length - 1], P.toString("utf16le", $, P.length - 1);
      }
      function j(P) {
        var $ = P && P.length ? this.write(P) : "";
        if (this.lastNeed) {
          var lt = this.lastTotal - this.lastNeed;
          return $ + this.lastChar.toString("utf16le", 0, lt);
        }
        return $;
      }
      function ht(P, $) {
        var lt = (P.length - $) % 3;
        return lt === 0 ? P.toString("base64", $) : (this.lastNeed = 3 - lt, this.lastTotal = 3, lt === 1 ? this.lastChar[0] = P[P.length - 1] : (this.lastChar[0] = P[P.length - 2], this.lastChar[1] = P[P.length - 1]), P.toString("base64", $, P.length - lt));
      }
      function H(P) {
        var $ = P && P.length ? this.write(P) : "";
        return this.lastNeed ? $ + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : $;
      }
      function mt(P) {
        return P.toString(this.encoding);
      }
      function ft(P) {
        return P && P.length ? this.write(P) : "";
      }
    }, { "safe-buffer": 18 }], 20: [function(b, rt, ct) {
      rt.exports = b("./lib/encoding.js");
    }, { "./lib/encoding.js": 21 }], 21: [function(b, rt, ct) {
      (function(nt) {
        typeof rt < "u" && rt.exports && !nt["encoding-indexes"] && b("./encoding-indexes.js");
        function O(r, a, s) {
          return a <= r && r <= s;
        }
        function dt(r, a) {
          return r.indexOf(a) !== -1;
        }
        var vt = Math.floor;
        function J(r) {
          if (r === void 0)
            return {};
          if (r === Object(r))
            return r;
          throw TypeError("Could not convert argument to dictionary");
        }
        function M(r) {
          for (var a = String(r), s = a.length, p = 0, d = []; p < s; ) {
            var F = a.charCodeAt(p);
            if (F < 55296 || F > 57343)
              d.push(F);
            else if (56320 <= F && F <= 57343)
              d.push(65533);
            else if (55296 <= F && F <= 56319)
              if (p === s - 1)
                d.push(65533);
              else {
                var v = a.charCodeAt(p + 1);
                if (56320 <= v && v <= 57343) {
                  var G = F & 1023, wt = v & 1023;
                  d.push(65536 + (G << 10) + wt), p += 1;
                } else
                  d.push(65533);
              }
            p += 1;
          }
          return d;
        }
        function m(r) {
          for (var a = "", s = 0; s < r.length; ++s) {
            var p = r[s];
            p <= 65535 ? a += String.fromCharCode(p) : (p -= 65536, a += String.fromCharCode(
              (p >> 10) + 55296,
              (p & 1023) + 56320
            ));
          }
          return a;
        }
        function ot(r) {
          return 0 <= r && r <= 127;
        }
        var K = ot, tt = -1;
        function W(r) {
          this.tokens = [].slice.call(r), this.tokens.reverse();
        }
        W.prototype = {
          /**
           * @return {boolean} True if end-of-stream has been hit.
           */
          endOfStream: function() {
            return !this.tokens.length;
          },
          /**
           * When a token is read from a stream, the first token in the
           * stream must be returned and subsequently removed, and
           * end-of-stream must be returned otherwise.
           *
           * @return {number} Get the next token from the stream, or
           * end_of_stream.
           */
          read: function() {
            return this.tokens.length ? this.tokens.pop() : tt;
          },
          /**
           * When one or more tokens are prepended to a stream, those tokens
           * must be inserted, in given order, before the first token in the
           * stream.
           *
           * @param {(number|!Array.<number>)} token The token(s) to prepend to the
           * stream.
           */
          prepend: function(r) {
            if (Array.isArray(r))
              for (var a = (
                /**@type {!Array.<number>}*/
                r
              ); a.length; )
                this.tokens.push(a.pop());
            else
              this.tokens.push(r);
          },
          /**
           * When one or more tokens are pushed to a stream, those tokens
           * must be inserted, in given order, after the last token in the
           * stream.
           *
           * @param {(number|!Array.<number>)} token The tokens(s) to push to the
           * stream.
           */
          push: function(r) {
            if (Array.isArray(r))
              for (var a = (
                /**@type {!Array.<number>}*/
                r
              ); a.length; )
                this.tokens.unshift(a.shift());
            else
              this.tokens.unshift(r);
          }
        };
        var xt = -1;
        function j(r, a) {
          if (r)
            throw TypeError("Decoder error");
          return a || 65533;
        }
        function ht(r) {
          throw TypeError("The code point " + r + " could not be encoded.");
        }
        function H(r) {
          return r = String(r).trim().toLowerCase(), Object.prototype.hasOwnProperty.call(ft, r) ? ft[r] : null;
        }
        var mt = [
          {
            encodings: [
              {
                labels: [
                  "unicode-1-1-utf-8",
                  "utf-8",
                  "utf8"
                ],
                name: "UTF-8"
              }
            ],
            heading: "The Encoding"
          },
          {
            encodings: [
              {
                labels: [
                  "866",
                  "cp866",
                  "csibm866",
                  "ibm866"
                ],
                name: "IBM866"
              },
              {
                labels: [
                  "csisolatin2",
                  "iso-8859-2",
                  "iso-ir-101",
                  "iso8859-2",
                  "iso88592",
                  "iso_8859-2",
                  "iso_8859-2:1987",
                  "l2",
                  "latin2"
                ],
                name: "ISO-8859-2"
              },
              {
                labels: [
                  "csisolatin3",
                  "iso-8859-3",
                  "iso-ir-109",
                  "iso8859-3",
                  "iso88593",
                  "iso_8859-3",
                  "iso_8859-3:1988",
                  "l3",
                  "latin3"
                ],
                name: "ISO-8859-3"
              },
              {
                labels: [
                  "csisolatin4",
                  "iso-8859-4",
                  "iso-ir-110",
                  "iso8859-4",
                  "iso88594",
                  "iso_8859-4",
                  "iso_8859-4:1988",
                  "l4",
                  "latin4"
                ],
                name: "ISO-8859-4"
              },
              {
                labels: [
                  "csisolatincyrillic",
                  "cyrillic",
                  "iso-8859-5",
                  "iso-ir-144",
                  "iso8859-5",
                  "iso88595",
                  "iso_8859-5",
                  "iso_8859-5:1988"
                ],
                name: "ISO-8859-5"
              },
              {
                labels: [
                  "arabic",
                  "asmo-708",
                  "csiso88596e",
                  "csiso88596i",
                  "csisolatinarabic",
                  "ecma-114",
                  "iso-8859-6",
                  "iso-8859-6-e",
                  "iso-8859-6-i",
                  "iso-ir-127",
                  "iso8859-6",
                  "iso88596",
                  "iso_8859-6",
                  "iso_8859-6:1987"
                ],
                name: "ISO-8859-6"
              },
              {
                labels: [
                  "csisolatingreek",
                  "ecma-118",
                  "elot_928",
                  "greek",
                  "greek8",
                  "iso-8859-7",
                  "iso-ir-126",
                  "iso8859-7",
                  "iso88597",
                  "iso_8859-7",
                  "iso_8859-7:1987",
                  "sun_eu_greek"
                ],
                name: "ISO-8859-7"
              },
              {
                labels: [
                  "csiso88598e",
                  "csisolatinhebrew",
                  "hebrew",
                  "iso-8859-8",
                  "iso-8859-8-e",
                  "iso-ir-138",
                  "iso8859-8",
                  "iso88598",
                  "iso_8859-8",
                  "iso_8859-8:1988",
                  "visual"
                ],
                name: "ISO-8859-8"
              },
              {
                labels: [
                  "csiso88598i",
                  "iso-8859-8-i",
                  "logical"
                ],
                name: "ISO-8859-8-I"
              },
              {
                labels: [
                  "csisolatin6",
                  "iso-8859-10",
                  "iso-ir-157",
                  "iso8859-10",
                  "iso885910",
                  "l6",
                  "latin6"
                ],
                name: "ISO-8859-10"
              },
              {
                labels: [
                  "iso-8859-13",
                  "iso8859-13",
                  "iso885913"
                ],
                name: "ISO-8859-13"
              },
              {
                labels: [
                  "iso-8859-14",
                  "iso8859-14",
                  "iso885914"
                ],
                name: "ISO-8859-14"
              },
              {
                labels: [
                  "csisolatin9",
                  "iso-8859-15",
                  "iso8859-15",
                  "iso885915",
                  "iso_8859-15",
                  "l9"
                ],
                name: "ISO-8859-15"
              },
              {
                labels: [
                  "iso-8859-16"
                ],
                name: "ISO-8859-16"
              },
              {
                labels: [
                  "cskoi8r",
                  "koi",
                  "koi8",
                  "koi8-r",
                  "koi8_r"
                ],
                name: "KOI8-R"
              },
              {
                labels: [
                  "koi8-ru",
                  "koi8-u"
                ],
                name: "KOI8-U"
              },
              {
                labels: [
                  "csmacintosh",
                  "mac",
                  "macintosh",
                  "x-mac-roman"
                ],
                name: "macintosh"
              },
              {
                labels: [
                  "dos-874",
                  "iso-8859-11",
                  "iso8859-11",
                  "iso885911",
                  "tis-620",
                  "windows-874"
                ],
                name: "windows-874"
              },
              {
                labels: [
                  "cp1250",
                  "windows-1250",
                  "x-cp1250"
                ],
                name: "windows-1250"
              },
              {
                labels: [
                  "cp1251",
                  "windows-1251",
                  "x-cp1251"
                ],
                name: "windows-1251"
              },
              {
                labels: [
                  "ansi_x3.4-1968",
                  "ascii",
                  "cp1252",
                  "cp819",
                  "csisolatin1",
                  "ibm819",
                  "iso-8859-1",
                  "iso-ir-100",
                  "iso8859-1",
                  "iso88591",
                  "iso_8859-1",
                  "iso_8859-1:1987",
                  "l1",
                  "latin1",
                  "us-ascii",
                  "windows-1252",
                  "x-cp1252"
                ],
                name: "windows-1252"
              },
              {
                labels: [
                  "cp1253",
                  "windows-1253",
                  "x-cp1253"
                ],
                name: "windows-1253"
              },
              {
                labels: [
                  "cp1254",
                  "csisolatin5",
                  "iso-8859-9",
                  "iso-ir-148",
                  "iso8859-9",
                  "iso88599",
                  "iso_8859-9",
                  "iso_8859-9:1989",
                  "l5",
                  "latin5",
                  "windows-1254",
                  "x-cp1254"
                ],
                name: "windows-1254"
              },
              {
                labels: [
                  "cp1255",
                  "windows-1255",
                  "x-cp1255"
                ],
                name: "windows-1255"
              },
              {
                labels: [
                  "cp1256",
                  "windows-1256",
                  "x-cp1256"
                ],
                name: "windows-1256"
              },
              {
                labels: [
                  "cp1257",
                  "windows-1257",
                  "x-cp1257"
                ],
                name: "windows-1257"
              },
              {
                labels: [
                  "cp1258",
                  "windows-1258",
                  "x-cp1258"
                ],
                name: "windows-1258"
              },
              {
                labels: [
                  "x-mac-cyrillic",
                  "x-mac-ukrainian"
                ],
                name: "x-mac-cyrillic"
              }
            ],
            heading: "Legacy single-byte encodings"
          },
          {
            encodings: [
              {
                labels: [
                  "chinese",
                  "csgb2312",
                  "csiso58gb231280",
                  "gb2312",
                  "gb_2312",
                  "gb_2312-80",
                  "gbk",
                  "iso-ir-58",
                  "x-gbk"
                ],
                name: "GBK"
              },
              {
                labels: [
                  "gb18030"
                ],
                name: "gb18030"
              }
            ],
            heading: "Legacy multi-byte Chinese (simplified) encodings"
          },
          {
            encodings: [
              {
                labels: [
                  "big5",
                  "big5-hkscs",
                  "cn-big5",
                  "csbig5",
                  "x-x-big5"
                ],
                name: "Big5"
              }
            ],
            heading: "Legacy multi-byte Chinese (traditional) encodings"
          },
          {
            encodings: [
              {
                labels: [
                  "cseucpkdfmtjapanese",
                  "euc-jp",
                  "x-euc-jp"
                ],
                name: "EUC-JP"
              },
              {
                labels: [
                  "csiso2022jp",
                  "iso-2022-jp"
                ],
                name: "ISO-2022-JP"
              },
              {
                labels: [
                  "csshiftjis",
                  "ms932",
                  "ms_kanji",
                  "shift-jis",
                  "shift_jis",
                  "sjis",
                  "windows-31j",
                  "x-sjis"
                ],
                name: "Shift_JIS"
              }
            ],
            heading: "Legacy multi-byte Japanese encodings"
          },
          {
            encodings: [
              {
                labels: [
                  "cseuckr",
                  "csksc56011987",
                  "euc-kr",
                  "iso-ir-149",
                  "korean",
                  "ks_c_5601-1987",
                  "ks_c_5601-1989",
                  "ksc5601",
                  "ksc_5601",
                  "windows-949"
                ],
                name: "EUC-KR"
              }
            ],
            heading: "Legacy multi-byte Korean encodings"
          },
          {
            encodings: [
              {
                labels: [
                  "csiso2022kr",
                  "hz-gb-2312",
                  "iso-2022-cn",
                  "iso-2022-cn-ext",
                  "iso-2022-kr"
                ],
                name: "replacement"
              },
              {
                labels: [
                  "utf-16be"
                ],
                name: "UTF-16BE"
              },
              {
                labels: [
                  "utf-16",
                  "utf-16le"
                ],
                name: "UTF-16LE"
              },
              {
                labels: [
                  "x-user-defined"
                ],
                name: "x-user-defined"
              }
            ],
            heading: "Legacy miscellaneous encodings"
          }
        ], ft = {};
        mt.forEach(function(r) {
          r.encodings.forEach(function(a) {
            a.labels.forEach(function(s) {
              ft[s] = a;
            });
          });
        });
        var P = {}, $ = {};
        function lt(r, a) {
          return a && a[r] || null;
        }
        function Et(r, a) {
          var s = a.indexOf(r);
          return s === -1 ? null : s;
        }
        function kt(r) {
          if (!("encoding-indexes" in nt))
            throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?");
          return nt["encoding-indexes"][r];
        }
        function qt(r) {
          if (r > 39419 && r < 189e3 || r > 1237575)
            return null;
          if (r === 7457)
            return 59335;
          var a = 0, s = 0, p = kt("gb18030-ranges"), d;
          for (d = 0; d < p.length; ++d) {
            var F = p[d];
            if (F[0] <= r)
              a = F[0], s = F[1];
            else
              break;
          }
          return s + r - a;
        }
        function N(r) {
          if (r === 59335)
            return 7457;
          var a = 0, s = 0, p = kt("gb18030-ranges"), d;
          for (d = 0; d < p.length; ++d) {
            var F = p[d];
            if (F[1] <= r)
              a = F[1], s = F[0];
            else
              break;
          }
          return s + r - a;
        }
        function yt(r) {
          V = V || kt("jis0208").map(function(s, p) {
            return O(p, 8272, 8835) ? null : s;
          });
          var a = V;
          return a.indexOf(r);
        }
        var V;
        function A(r) {
          S = S || kt("big5").map(function(s, p) {
            return p < 32 * 157 ? null : s;
          });
          var a = S;
          return r === 9552 || r === 9566 || r === 9569 || r === 9578 || r === 21313 || r === 21317 ? a.lastIndexOf(r) : Et(r, a);
        }
        var S, y = "utf-8";
        function k(r, a) {
          if (!(this instanceof k))
            throw TypeError("Called as a function. Did you forget 'new'?");
          r = r !== void 0 ? String(r) : y, a = J(a), this._encoding = null, this._decoder = null, this._ignoreBOM = !1, this._BOMseen = !1, this._error_mode = "replacement", this._do_not_flush = !1;
          var s = H(r);
          if (s === null || s.name === "replacement")
            throw RangeError("Unknown encoding: " + r);
          if (!$[s.name])
            throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
          var p = this;
          return p._encoding = s, a.fatal && (p._error_mode = "fatal"), a.ignoreBOM && (p._ignoreBOM = !0), Object.defineProperty || (this.encoding = p._encoding.name.toLowerCase(), this.fatal = p._error_mode === "fatal", this.ignoreBOM = p._ignoreBOM), p;
        }
        Object.defineProperty && (Object.defineProperty(k.prototype, "encoding", {
          /** @this {TextDecoder} */
          get: function() {
            return this._encoding.name.toLowerCase();
          }
        }), Object.defineProperty(k.prototype, "fatal", {
          /** @this {TextDecoder} */
          get: function() {
            return this._error_mode === "fatal";
          }
        }), Object.defineProperty(k.prototype, "ignoreBOM", {
          /** @this {TextDecoder} */
          get: function() {
            return this._ignoreBOM;
          }
        })), k.prototype.decode = function(a, s) {
          var p;
          typeof a == "object" && a instanceof ArrayBuffer ? p = new Uint8Array(a) : typeof a == "object" && "buffer" in a && a.buffer instanceof ArrayBuffer ? p = new Uint8Array(
            a.buffer,
            a.byteOffset,
            a.byteLength
          ) : p = new Uint8Array(0), s = J(s), this._do_not_flush || (this._decoder = $[this._encoding.name]({
            fatal: this._error_mode === "fatal"
          }), this._BOMseen = !1), this._do_not_flush = !!s.stream;
          for (var d = new W(p), F = [], v; ; ) {
            var G = d.read();
            if (G === tt || (v = this._decoder.handler(d, G), v === xt))
              break;
            v !== null && (Array.isArray(v) ? F.push.apply(
              F,
              /**@type {!Array.<number>}*/
              v
            ) : F.push(v));
          }
          if (!this._do_not_flush) {
            do {
              if (v = this._decoder.handler(d, d.read()), v === xt)
                break;
              v !== null && (Array.isArray(v) ? F.push.apply(
                F,
                /**@type {!Array.<number>}*/
                v
              ) : F.push(v));
            } while (!d.endOfStream());
            this._decoder = null;
          }
          function wt(E) {
            return dt(["UTF-8", "UTF-16LE", "UTF-16BE"], this._encoding.name) && !this._ignoreBOM && !this._BOMseen && (E.length > 0 && E[0] === 65279 ? (this._BOMseen = !0, E.shift()) : E.length > 0 && (this._BOMseen = !0)), m(E);
          }
          return wt.call(this, F);
        };
        function q(r, a) {
          if (!(this instanceof q))
            throw TypeError("Called as a function. Did you forget 'new'?");
          a = J(a), this._encoding = null, this._encoder = null, this._do_not_flush = !1, this._fatal = a.fatal ? "fatal" : "replacement";
          var s = this;
          if (a.NONSTANDARD_allowLegacyEncoding) {
            r = r !== void 0 ? String(r) : y;
            var p = H(r);
            if (p === null || p.name === "replacement")
              throw RangeError("Unknown encoding: " + r);
            if (!P[p.name])
              throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
            s._encoding = p;
          } else
            s._encoding = H("utf-8"), r !== void 0 && "console" in nt && console.warn("TextEncoder constructor called with encoding label, which is ignored.");
          return Object.defineProperty || (this.encoding = s._encoding.name.toLowerCase()), s;
        }
        Object.defineProperty && Object.defineProperty(q.prototype, "encoding", {
          /** @this {TextEncoder} */
          get: function() {
            return this._encoding.name.toLowerCase();
          }
        }), q.prototype.encode = function(a, s) {
          a = a === void 0 ? "" : String(a), s = J(s), this._do_not_flush || (this._encoder = P[this._encoding.name]({
            fatal: this._fatal === "fatal"
          })), this._do_not_flush = !!s.stream;
          for (var p = new W(M(a)), d = [], F; ; ) {
            var v = p.read();
            if (v === tt || (F = this._encoder.handler(p, v), F === xt))
              break;
            Array.isArray(F) ? d.push.apply(
              d,
              /**@type {!Array.<number>}*/
              F
            ) : d.push(F);
          }
          if (!this._do_not_flush) {
            for (; F = this._encoder.handler(p, p.read()), F !== xt; )
              Array.isArray(F) ? d.push.apply(
                d,
                /**@type {!Array.<number>}*/
                F
              ) : d.push(F);
            this._encoder = null;
          }
          return new Uint8Array(d);
        };
        function Y(r) {
          var a = r.fatal, s = 0, p = 0, d = 0, F = 128, v = 191;
          this.handler = function(G, wt) {
            if (wt === tt && d !== 0)
              return d = 0, j(a);
            if (wt === tt)
              return xt;
            if (d === 0) {
              if (O(wt, 0, 127))
                return wt;
              if (O(wt, 194, 223))
                d = 1, s = wt & 31;
              else if (O(wt, 224, 239))
                wt === 224 && (F = 160), wt === 237 && (v = 159), d = 2, s = wt & 15;
              else if (O(wt, 240, 244))
                wt === 240 && (F = 144), wt === 244 && (v = 143), d = 3, s = wt & 7;
              else
                return j(a);
              return null;
            }
            if (!O(wt, F, v))
              return s = d = p = 0, F = 128, v = 191, G.prepend(wt), j(a);
            if (F = 128, v = 191, s = s << 6 | wt & 63, p += 1, p !== d)
              return null;
            var E = s;
            return s = d = p = 0, E;
          };
        }
        function X(r) {
          this.handler = function(a, s) {
            if (s === tt)
              return xt;
            if (K(s))
              return s;
            var p, d;
            O(s, 128, 2047) ? (p = 1, d = 192) : O(s, 2048, 65535) ? (p = 2, d = 224) : O(s, 65536, 1114111) && (p = 3, d = 240);
            for (var F = [(s >> 6 * p) + d]; p > 0; ) {
              var v = s >> 6 * (p - 1);
              F.push(128 | v & 63), p -= 1;
            }
            return F;
          };
        }
        P["UTF-8"] = function(r) {
          return new X();
        }, $["UTF-8"] = function(r) {
          return new Y(r);
        };
        function Q(r, a) {
          var s = a.fatal;
          this.handler = function(p, d) {
            if (d === tt)
              return xt;
            if (ot(d))
              return d;
            var F = r[d - 128];
            return F === null ? j(s) : F;
          };
        }
        function _(r, a) {
          this.handler = function(s, p) {
            if (p === tt)
              return xt;
            if (K(p))
              return p;
            var d = Et(p, r);
            return d === null && ht(p), d + 128;
          };
        }
        (function() {
          "encoding-indexes" in nt && mt.forEach(function(r) {
            r.heading === "Legacy single-byte encodings" && r.encodings.forEach(function(a) {
              var s = a.name, p = kt(s.toLowerCase());
              $[s] = function(d) {
                return new Q(p, d);
              }, P[s] = function(d) {
                return new _(p);
              };
            });
          });
        })(), $.GBK = function(r) {
          return new R(r);
        }, P.GBK = function(r) {
          return new B(r, !0);
        };
        function R(r) {
          var a = r.fatal, s = 0, p = 0, d = 0;
          this.handler = function(F, v) {
            if (v === tt && s === 0 && p === 0 && d === 0)
              return xt;
            v === tt && (s !== 0 || p !== 0 || d !== 0) && (s = 0, p = 0, d = 0, j(a));
            var G;
            if (d !== 0) {
              G = null, O(v, 48, 57) && (G = qt(
                (((s - 129) * 10 + p - 48) * 126 + d - 129) * 10 + v - 48
              ));
              var wt = [p, d, v];
              return s = 0, p = 0, d = 0, G === null ? (F.prepend(wt), j(a)) : G;
            }
            if (p !== 0)
              return O(v, 129, 254) ? (d = v, null) : (F.prepend([p, v]), s = 0, p = 0, j(a));
            if (s !== 0) {
              if (O(v, 48, 57))
                return p = v, null;
              var E = s, D = null;
              s = 0;
              var h = v < 127 ? 64 : 65;
              return (O(v, 64, 126) || O(v, 128, 254)) && (D = (E - 129) * 190 + (v - h)), G = D === null ? null : lt(D, kt("gb18030")), G === null && ot(v) && F.prepend(v), G === null ? j(a) : G;
            }
            return ot(v) ? v : v === 128 ? 8364 : O(v, 129, 254) ? (s = v, null) : j(a);
          };
        }
        function B(r, a) {
          this.handler = function(s, p) {
            if (p === tt)
              return xt;
            if (K(p))
              return p;
            if (p === 58853)
              return ht(p);
            if (a && p === 8364)
              return 128;
            var d = Et(p, kt("gb18030"));
            if (d !== null) {
              var F = vt(d / 190) + 129, v = d % 190, G = v < 63 ? 64 : 65;
              return [F, v + G];
            }
            if (a)
              return ht(p);
            d = N(p);
            var wt = vt(d / 10 / 126 / 10);
            d = d - wt * 10 * 126 * 10;
            var E = vt(d / 10 / 126);
            d = d - E * 10 * 126;
            var D = vt(d / 10), h = d - D * 10;
            return [
              wt + 129,
              E + 48,
              D + 129,
              h + 48
            ];
          };
        }
        P.gb18030 = function(r) {
          return new B();
        }, $.gb18030 = function(r) {
          return new R(r);
        };
        function g(r) {
          var a = r.fatal, s = 0;
          this.handler = function(p, d) {
            if (d === tt && s !== 0)
              return s = 0, j(a);
            if (d === tt && s === 0)
              return xt;
            if (s !== 0) {
              var F = s, v = null;
              s = 0;
              var G = d < 127 ? 64 : 98;
              switch ((O(d, 64, 126) || O(d, 161, 254)) && (v = (F - 129) * 157 + (d - G)), v) {
                case 1133:
                  return [202, 772];
                case 1135:
                  return [202, 780];
                case 1164:
                  return [234, 772];
                case 1166:
                  return [234, 780];
              }
              var wt = v === null ? null : lt(v, kt("big5"));
              return wt === null && ot(d) && p.prepend(d), wt === null ? j(a) : wt;
            }
            return ot(d) ? d : O(d, 129, 254) ? (s = d, null) : j(a);
          };
        }
        function C(r) {
          this.handler = function(a, s) {
            if (s === tt)
              return xt;
            if (K(s))
              return s;
            var p = A(s);
            if (p === null)
              return ht(s);
            var d = vt(p / 157) + 129;
            if (d < 161)
              return ht(s);
            var F = p % 157, v = F < 63 ? 64 : 98;
            return [d, F + v];
          };
        }
        P.Big5 = function(r) {
          return new C();
        }, $.Big5 = function(r) {
          return new g(r);
        };
        function T(r) {
          var a = r.fatal, s = !1, p = 0;
          this.handler = function(d, F) {
            if (F === tt && p !== 0)
              return p = 0, j(a);
            if (F === tt && p === 0)
              return xt;
            if (p === 142 && O(F, 161, 223))
              return p = 0, 65216 + F;
            if (p === 143 && O(F, 161, 254))
              return s = !0, p = F, null;
            if (p !== 0) {
              var v = p;
              p = 0;
              var G = null;
              return O(v, 161, 254) && O(F, 161, 254) && (G = lt(
                (v - 161) * 94 + (F - 161),
                kt(s ? "jis0212" : "jis0208")
              )), s = !1, O(F, 161, 254) || d.prepend(F), G === null ? j(a) : G;
            }
            return ot(F) ? F : F === 142 || F === 143 || O(F, 161, 254) ? (p = F, null) : j(a);
          };
        }
        function at(r) {
          this.handler = function(a, s) {
            if (s === tt)
              return xt;
            if (K(s))
              return s;
            if (s === 165)
              return 92;
            if (s === 8254)
              return 126;
            if (O(s, 65377, 65439))
              return [142, s - 65377 + 161];
            s === 8722 && (s = 65293);
            var p = Et(s, kt("jis0208"));
            if (p === null)
              return ht(s);
            var d = vt(p / 94) + 161, F = p % 94 + 161;
            return [d, F];
          };
        }
        P["EUC-JP"] = function(r) {
          return new at();
        }, $["EUC-JP"] = function(r) {
          return new T(r);
        };
        function ut(r) {
          var a = r.fatal, s = {
            ASCII: 0,
            Roman: 1,
            Katakana: 2,
            LeadByte: 3,
            TrailByte: 4,
            EscapeStart: 5,
            Escape: 6
          }, p = s.ASCII, d = s.ASCII, F = 0, v = !1;
          this.handler = function(G, wt) {
            switch (p) {
              default:
              case s.ASCII:
                return wt === 27 ? (p = s.EscapeStart, null) : O(wt, 0, 127) && wt !== 14 && wt !== 15 && wt !== 27 ? (v = !1, wt) : wt === tt ? xt : (v = !1, j(a));
              case s.Roman:
                return wt === 27 ? (p = s.EscapeStart, null) : wt === 92 ? (v = !1, 165) : wt === 126 ? (v = !1, 8254) : O(wt, 0, 127) && wt !== 14 && wt !== 15 && wt !== 27 && wt !== 92 && wt !== 126 ? (v = !1, wt) : wt === tt ? xt : (v = !1, j(a));
              case s.Katakana:
                return wt === 27 ? (p = s.EscapeStart, null) : O(wt, 33, 95) ? (v = !1, 65344 + wt) : wt === tt ? xt : (v = !1, j(a));
              case s.LeadByte:
                return wt === 27 ? (p = s.EscapeStart, null) : O(wt, 33, 126) ? (v = !1, F = wt, p = s.TrailByte, null) : wt === tt ? xt : (v = !1, j(a));
              case s.TrailByte:
                if (wt === 27)
                  return p = s.EscapeStart, j(a);
                if (O(wt, 33, 126)) {
                  p = s.LeadByte;
                  var E = (F - 33) * 94 + wt - 33, D = lt(E, kt("jis0208"));
                  return D === null ? j(a) : D;
                }
                return wt === tt ? (p = s.LeadByte, G.prepend(wt), j(a)) : (p = s.LeadByte, j(a));
              case s.EscapeStart:
                return wt === 36 || wt === 40 ? (F = wt, p = s.Escape, null) : (G.prepend(wt), v = !1, p = d, j(a));
              case s.Escape:
                var h = F;
                F = 0;
                var it = null;
                if (h === 40 && wt === 66 && (it = s.ASCII), h === 40 && wt === 74 && (it = s.Roman), h === 40 && wt === 73 && (it = s.Katakana), h === 36 && (wt === 64 || wt === 66) && (it = s.LeadByte), it !== null) {
                  p = p = it;
                  var z = v;
                  return v = !0, z ? j(a) : null;
                }
                return G.prepend([h, wt]), v = !1, p = d, j(a);
            }
          };
        }
        function et(r) {
          var a = {
            ASCII: 0,
            Roman: 1,
            jis0208: 2
          }, s = a.ASCII;
          this.handler = function(p, d) {
            if (d === tt && s !== a.ASCII)
              return p.prepend(d), s = a.ASCII, [27, 40, 66];
            if (d === tt && s === a.ASCII)
              return xt;
            if ((s === a.ASCII || s === a.Roman) && (d === 14 || d === 15 || d === 27))
              return ht(65533);
            if (s === a.ASCII && K(d))
              return d;
            if (s === a.Roman && (K(d) && d !== 92 && d !== 126 || d == 165 || d == 8254)) {
              if (K(d))
                return d;
              if (d === 165)
                return 92;
              if (d === 8254)
                return 126;
            }
            if (K(d) && s !== a.ASCII)
              return p.prepend(d), s = a.ASCII, [27, 40, 66];
            if ((d === 165 || d === 8254) && s !== a.Roman)
              return p.prepend(d), s = a.Roman, [27, 40, 74];
            d === 8722 && (d = 65293);
            var F = Et(d, kt("jis0208"));
            if (F === null)
              return ht(d);
            if (s !== a.jis0208)
              return p.prepend(d), s = a.jis0208, [27, 36, 66];
            var v = vt(F / 94) + 33, G = F % 94 + 33;
            return [v, G];
          };
        }
        P["ISO-2022-JP"] = function(r) {
          return new et();
        }, $["ISO-2022-JP"] = function(r) {
          return new ut(r);
        };
        function Ft(r) {
          var a = r.fatal, s = 0;
          this.handler = function(p, d) {
            if (d === tt && s !== 0)
              return s = 0, j(a);
            if (d === tt && s === 0)
              return xt;
            if (s !== 0) {
              var F = s, v = null;
              s = 0;
              var G = d < 127 ? 64 : 65, wt = F < 160 ? 129 : 193;
              if ((O(d, 64, 126) || O(d, 128, 252)) && (v = (F - wt) * 188 + d - G), O(v, 8836, 10715))
                return 48508 + v;
              var E = v === null ? null : lt(v, kt("jis0208"));
              return E === null && ot(d) && p.prepend(d), E === null ? j(a) : E;
            }
            return ot(d) || d === 128 ? d : O(d, 161, 223) ? 65216 + d : O(d, 129, 159) || O(d, 224, 252) ? (s = d, null) : j(a);
          };
        }
        function At(r) {
          this.handler = function(a, s) {
            if (s === tt)
              return xt;
            if (K(s) || s === 128)
              return s;
            if (s === 165)
              return 92;
            if (s === 8254)
              return 126;
            if (O(s, 65377, 65439))
              return s - 65377 + 161;
            s === 8722 && (s = 65293);
            var p = yt(s);
            if (p === null)
              return ht(s);
            var d = vt(p / 188), F = d < 31 ? 129 : 193, v = p % 188, G = v < 63 ? 64 : 65;
            return [d + F, v + G];
          };
        }
        P.Shift_JIS = function(r) {
          return new At();
        }, $.Shift_JIS = function(r) {
          return new Ft(r);
        };
        function Bt(r) {
          var a = r.fatal, s = 0;
          this.handler = function(p, d) {
            if (d === tt && s !== 0)
              return s = 0, j(a);
            if (d === tt && s === 0)
              return xt;
            if (s !== 0) {
              var F = s, v = null;
              s = 0, O(d, 65, 254) && (v = (F - 129) * 190 + (d - 65));
              var G = v === null ? null : lt(v, kt("euc-kr"));
              return v === null && ot(d) && p.prepend(d), G === null ? j(a) : G;
            }
            return ot(d) ? d : O(d, 129, 254) ? (s = d, null) : j(a);
          };
        }
        function gt(r) {
          this.handler = function(a, s) {
            if (s === tt)
              return xt;
            if (K(s))
              return s;
            var p = Et(s, kt("euc-kr"));
            if (p === null)
              return ht(s);
            var d = vt(p / 190) + 129, F = p % 190 + 65;
            return [d, F];
          };
        }
        P["EUC-KR"] = function(r) {
          return new gt();
        }, $["EUC-KR"] = function(r) {
          return new Bt(r);
        };
        function zt(r, a) {
          var s = r >> 8, p = r & 255;
          return a ? [s, p] : [p, s];
        }
        function Gt(r, a) {
          var s = a.fatal, p = null, d = null;
          this.handler = function(F, v) {
            if (v === tt && (p !== null || d !== null))
              return j(s);
            if (v === tt && p === null && d === null)
              return xt;
            if (p === null)
              return p = v, null;
            var G;
            if (r ? G = (p << 8) + v : G = (v << 8) + p, p = null, d !== null) {
              var wt = d;
              return d = null, O(G, 56320, 57343) ? 65536 + (wt - 55296) * 1024 + (G - 56320) : (F.prepend(zt(G, r)), j(s));
            }
            return O(G, 55296, 56319) ? (d = G, null) : O(G, 56320, 57343) ? j(s) : G;
          };
        }
        function U(r, a) {
          this.handler = function(s, p) {
            if (p === tt)
              return xt;
            if (O(p, 0, 65535))
              return zt(p, r);
            var d = zt(
              (p - 65536 >> 10) + 55296,
              r
            ), F = zt(
              (p - 65536 & 1023) + 56320,
              r
            );
            return d.concat(F);
          };
        }
        P["UTF-16BE"] = function(r) {
          return new U(!0);
        }, $["UTF-16BE"] = function(r) {
          return new Gt(!0, r);
        }, P["UTF-16LE"] = function(r) {
          return new U(!1);
        }, $["UTF-16LE"] = function(r) {
          return new Gt(!1, r);
        };
        function _t(r) {
          this.handler = function(a, s) {
            return s === tt ? xt : ot(s) ? s : 63360 + s - 128;
          };
        }
        function n(r) {
          this.handler = function(a, s) {
            return s === tt ? xt : K(s) ? s : O(s, 63360, 63487) ? s - 63360 + 128 : ht(s);
          };
        }
        P["x-user-defined"] = function(r) {
          return new n();
        }, $["x-user-defined"] = function(r) {
          return new _t();
        }, nt.TextEncoder || (nt.TextEncoder = q), nt.TextDecoder || (nt.TextDecoder = k), typeof rt < "u" && rt.exports && (rt.exports = {
          TextEncoder: nt.TextEncoder,
          TextDecoder: nt.TextDecoder,
          EncodingIndexes: nt["encoding-indexes"]
        });
      })(this || {});
    }, { "./encoding-indexes.js": 7 }], 22: [function(b, rt, ct) {
      (function(nt, O) {
        (function() {
          var dt = b("process/browser.js").nextTick, vt = Function.prototype.apply, J = Array.prototype.slice, M = {}, m = 0;
          ct.setTimeout = function() {
            return new ot(vt.call(setTimeout, window, arguments), clearTimeout);
          }, ct.setInterval = function() {
            return new ot(vt.call(setInterval, window, arguments), clearInterval);
          }, ct.clearTimeout = ct.clearInterval = function(K) {
            K.close();
          };
          function ot(K, tt) {
            this._id = K, this._clearFn = tt;
          }
          ot.prototype.unref = ot.prototype.ref = function() {
          }, ot.prototype.close = function() {
            this._clearFn.call(window, this._id);
          }, ct.enroll = function(K, tt) {
            clearTimeout(K._idleTimeoutId), K._idleTimeout = tt;
          }, ct.unenroll = function(K) {
            clearTimeout(K._idleTimeoutId), K._idleTimeout = -1;
          }, ct._unrefActive = ct.active = function(K) {
            clearTimeout(K._idleTimeoutId);
            var tt = K._idleTimeout;
            tt >= 0 && (K._idleTimeoutId = setTimeout(function() {
              K._onTimeout && K._onTimeout();
            }, tt));
          }, ct.setImmediate = typeof nt == "function" ? nt : function(K) {
            var tt = m++, W = arguments.length < 2 ? !1 : J.call(arguments, 1);
            return M[tt] = !0, dt(function() {
              M[tt] && (W ? K.apply(null, W) : K.call(null), ct.clearImmediate(tt));
            }), tt;
          }, ct.clearImmediate = typeof O == "function" ? O : function(K) {
            delete M[K];
          };
        }).call(this);
      }).call(this, b("timers").setImmediate, b("timers").clearImmediate);
    }, { "process/browser.js": 16, timers: 22 }], 23: [function(b, rt, ct) {
      (function(nt) {
        (function() {
          let O = b("proj4");
          O.default && (O = O.default);
          const dt = b("./unzip"), vt = b("./binaryajax"), J = b("./parseShp"), M = b("parsedbf"), m = b("lie"), ot = b("lru-cache"), K = b("buffer").Buffer, tt = nt.URL, W = new ot({
            max: 20
          });
          function xt($) {
            if (!$)
              throw new Error("forgot to pass buffer");
            if (K.isBuffer($))
              return $;
            if (j($))
              return K.from($);
            if (j($.buffer))
              return $.BYTES_PER_ELEMENT === 1 ? K.from($) : K.from($.buffer);
          }
          function j($) {
            return $ instanceof nt.ArrayBuffer || Object.prototype.toString.call($) === "[object ArrayBuffer]";
          }
          function ht($, lt) {
            return typeof $ == "string" && W.has($) ? m.resolve(W.get($)) : ht.getShapefile($, lt).then(function(Et) {
              return typeof $ == "string" && W.set($, Et), Et;
            });
          }
          ht.combine = function([$, lt]) {
            const Et = {};
            Et.type = "FeatureCollection", Et.features = [];
            let kt = 0;
            const qt = $.length;
            for (lt || (lt = []); kt < qt; )
              Et.features.push({
                type: "Feature",
                geometry: $[kt],
                properties: lt[kt] || {}
              }), kt++;
            return Et;
          }, ht.parseZip = async function($, lt) {
            let Et;
            $ = xt($);
            const kt = await dt($), qt = [];
            lt = lt || [];
            for (Et in kt)
              Et.indexOf("__MACOSX") === -1 && (Et.slice(-3).toLowerCase() === "shp" ? (qt.push(Et.slice(0, -4)), kt[Et.slice(0, -3) + Et.slice(-3).toLowerCase()] = kt[Et]) : Et.slice(-3).toLowerCase() === "prj" ? kt[Et.slice(0, -3) + Et.slice(-3).toLowerCase()] = O(kt[Et]) : Et.slice(-4).toLowerCase() === "json" || lt.indexOf(Et.split(".").pop()) > -1 ? qt.push(Et.slice(0, -3) + Et.slice(-3).toLowerCase()) : (Et.slice(-3).toLowerCase() === "dbf" || Et.slice(-3).toLowerCase() === "cpg") && (kt[Et.slice(0, -3) + Et.slice(-3).toLowerCase()] = kt[Et]));
            if (!qt.length)
              throw new Error("no layers founds");
            const N = qt.map(function(yt) {
              let V, A;
              const S = yt.lastIndexOf(".");
              return S > -1 && yt.slice(S).indexOf("json") > -1 ? (V = JSON.parse(kt[yt]), V.fileName = yt.slice(0, S)) : lt.indexOf(yt.slice(S + 1)) > -1 ? (V = kt[yt], V.fileName = yt) : (kt[yt + ".dbf"] && (A = M(kt[yt + ".dbf"], kt[yt + ".cpg"])), V = ht.combine([J(kt[yt + ".shp"], kt[yt + ".prj"]), A]), V.fileName = yt), V;
            });
            return N.length === 1 ? N[0] : N;
          };
          async function H($, lt) {
            const Et = await vt($);
            return ht.parseZip(Et, lt);
          }
          const mt = async ($) => {
            const lt = await m.all([
              vt($, "shp"),
              vt($, "prj")
            ]);
            let Et = !1;
            try {
              lt[1] && (Et = O(lt[1]));
            } catch {
              Et = !1;
            }
            return J(lt[0], Et);
          }, ft = async ($) => {
            const [lt, Et] = await m.all([
              vt($, "dbf"),
              vt($, "cpg")
            ]);
            if (lt)
              return M(lt, Et);
          }, P = ($, lt) => new tt($).pathname.slice(-4).toLowerCase() === lt;
          ht.getShapefile = async function($, lt) {
            if (typeof $ != "string")
              return ht.parseZip($);
            if (P($, ".zip"))
              return H($, lt);
            const Et = await m.all([
              mt($),
              ft($)
            ]);
            return ht.combine(Et);
          }, ht.parseShp = function($, lt) {
            if ($ = xt($), K.isBuffer(lt) && (lt = lt.toString()), typeof lt == "string")
              try {
                lt = O(lt);
              } catch {
                lt = !1;
              }
            return J($, lt);
          }, ht.parseDbf = function($, lt) {
            return $ = xt($), M($, lt);
          }, rt.exports = ht;
        }).call(this);
      }).call(this, typeof me < "u" ? me : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { "./binaryajax": 2, "./parseShp": 4, "./unzip": 5, buffer: 8, lie: 12, "lru-cache": 13, parsedbf: 15, proj4: 17 }] }, {}, [23])(23);
  });
})(oi);
var oo = oi.exports;
const ho = /* @__PURE__ */ so(oo);
class ri {
  /**
   * 
   * @param {{type : string , coordinates : Array<Array<[number , number]>>}} geojson 
   */
  static polygonToGeometry(I, b = 1) {
    const rt = new Ys();
    for (let ct = 0; ct < I.coordinates.length; ct++) {
      if (ct === 0) {
        rt.setFromPoints(I.coordinates[ct].map((nt) => new nr().fromArray(nt)));
        continue;
      }
      rt.holes.push(
        this._toRingToBufferGeometry(I.coordinates[ct])
      );
    }
    return new to(rt, {
      depth: b
    });
  }
  /**
   * 
   * @param {{type : string , coordinates : Array<[number , number]>}} geojson 
   */
  static polylineToGeometry(I) {
    const b = [];
    for (let rt = 0; rt < I.coordinates.length; rt++)
      b.push(
        I.coordinates[rt][0],
        I.coordinates[rt][1],
        0
      );
    return b;
  }
  /**
   * 
   * @param {Array<[number , number]>} points 
   */
  static _toRingToBufferGeometry(I) {
    return new eo(I.map((b) => new nr().fromArray(b)));
  }
}
function sr(Z, I = !1) {
  const b = Z[0].index !== null, rt = new Set(Object.keys(Z[0].attributes)), ct = new Set(Object.keys(Z[0].morphAttributes)), nt = {}, O = {}, dt = Z[0].morphTargetsRelative, vt = new xe();
  let J = 0;
  for (let M = 0; M < Z.length; ++M) {
    const m = Z[M];
    let ot = 0;
    if (b !== (m.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const K in m.attributes) {
      if (!rt.has(K))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + '. All geometries must have compatible attributes; make sure "' + K + '" attribute exists among all geometries, or in none of them.'), null;
      nt[K] === void 0 && (nt[K] = []), nt[K].push(m.attributes[K]), ot++;
    }
    if (ot !== rt.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + ". Make sure all geometries have the same number of attributes."), null;
    if (dt !== m.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const K in m.morphAttributes) {
      if (!ct.has(K))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + ".  .morphAttributes must be consistent throughout all geometries."), null;
      O[K] === void 0 && (O[K] = []), O[K].push(m.morphAttributes[K]);
    }
    if (I) {
      let K;
      if (b)
        K = m.index.count;
      else if (m.attributes.position !== void 0)
        K = m.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + M + ". The geometry must have either an index or a position attribute"), null;
      vt.addGroup(J, K, M), J += K;
    }
  }
  if (b) {
    let M = 0;
    const m = [];
    for (let ot = 0; ot < Z.length; ++ot) {
      const K = Z[ot].index;
      for (let tt = 0; tt < K.count; ++tt)
        m.push(K.getX(tt) + M);
      M += Z[ot].attributes.position.count;
    }
    vt.setIndex(m);
  }
  for (const M in nt) {
    const m = ii(nt[M]);
    if (!m)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + M + " attribute."), null;
    vt.setAttribute(M, m);
  }
  for (const M in O) {
    const m = O[M][0].length;
    if (m === 0)
      break;
    vt.morphAttributes = vt.morphAttributes || {}, vt.morphAttributes[M] = [];
    for (let ot = 0; ot < m; ++ot) {
      const K = [];
      for (let W = 0; W < O[M].length; ++W)
        K.push(O[M][W][ot]);
      const tt = ii(K);
      if (!tt)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + M + " morphAttribute."), null;
      vt.morphAttributes[M].push(tt);
    }
  }
  return vt;
}
function ii(Z) {
  let I, b, rt, ct = -1, nt = 0;
  for (let J = 0; J < Z.length; ++J) {
    const M = Z[J];
    if (M.isInterleavedBufferAttribute)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."), null;
    if (I === void 0 && (I = M.array.constructor), I !== M.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (b === void 0 && (b = M.itemSize), b !== M.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (rt === void 0 && (rt = M.normalized), rt !== M.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (ct === -1 && (ct = M.gpuType), ct !== M.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    nt += M.array.length;
  }
  const O = new I(nt);
  let dt = 0;
  for (let J = 0; J < Z.length; ++J)
    O.set(Z[J].array, dt), dt += Z[J].array.length;
  const vt = new ve(O, b, rt);
  return ct !== void 0 && (vt.gpuType = ct), vt;
}
const uo = {
  url: "",
  useWorker: !1,
  style: {
    polygon: {
      extrudeHeight: 1,
      color: "rgb(255 , 255,255)"
    },
    polyline: {
      color: "rgb(255 , 255,255)",
      lineWidth: 1,
      map: null,
      useMap: !1,
      resolution: [window.innerWidth, window.innerHeight],
      sizeAttenuation: !1,
      lineWidth: 1,
      depthWrite: !1,
      depthTest: !1,
      transparent: !1,
      lighting: !0
    },
    point: {
      color: "rgb(255 , 255,255)",
      map: null,
      size: 1e3,
      sizeAttenuation: !0,
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      lighting: !0
    }
  },
  polygonStyleCallBack: () => ({
    extrudeHeight: 1,
    color: "rgb(255 , 255,255)"
  }),
  pointStyleCallBack: () => ({
    size: 1,
    color: "rgb(255 , 255,255)"
  }),
  polylineStyleCallBack: () => ({
    width: 1,
    color: "rgb(255 , 255,255)"
  })
};
class ni extends Ee {
  /**
   * 
   * @param {any} feature 
   * @param {ShapeOption} option 
   */
  constructor(I, b) {
    super(), this.data = I, this.option = b;
  }
  init() {
    const I = this.data.geometry;
    let b = this.option.style.polygon;
    if (this.option.polygonStyleCallBack && (b = this.option.polygonStyleCallBack(this.data)), this.color = b.color || "red", this.height = b.extrudeHeight || 1, I.type === "Polygon") {
      const dt = ri.polygonToGeometry(I, this.height);
      this.geometry = dt;
    } else {
      const dt = I.coordinates.map((vt) => ri.polygonToGeometry({
        type: "Polygon",
        coordinates: vt
      }));
      this.geometry = sr(dt);
    }
    const rt = this.geometry.getAttribute("position"), ct = new _e(this.color), nt = [];
    for (let dt = 0; dt < rt.array.length; dt += 3)
      nt.push(ct.r * 255, ct.g * 255, ct.b * 255);
    const O = new ve(new Float32Array(nt), 3);
    this.geometry.setAttribute("color", O);
  }
  static getPolygonStyle(I, b) {
    let rt = b.style.polygon;
    return b.polygonStyleCallBack && (rt = b.polygonStyleCallBack(I)), rt;
  }
}
function lo(Z, I, b) {
  b === void 0 && (b = {});
  var rt = { type: "Feature" };
  return (b.id === 0 || b.id) && (rt.id = b.id), b.bbox && (rt.bbox = b.bbox), rt.properties = I || {}, rt.geometry = Z, rt;
}
function fo(Z, I, b) {
  if (b === void 0 && (b = {}), !Z)
    throw new Error("coordinates is required");
  if (!Array.isArray(Z))
    throw new Error("coordinates must be an Array");
  if (Z.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!_r(Z[0]) || !_r(Z[1]))
    throw new Error("coordinates must contain numbers");
  var rt = {
    type: "Point",
    coordinates: Z
  };
  return lo(rt, I, b);
}
function _r(Z) {
  return !isNaN(Z) && Z !== null && !Array.isArray(Z);
}
function wr(Z, I, b) {
  if (Z !== null)
    for (var rt, ct, nt, O, dt, vt, J, M = 0, m = 0, ot, K = Z.type, tt = K === "FeatureCollection", W = K === "Feature", xt = tt ? Z.features.length : 1, j = 0; j < xt; j++) {
      J = tt ? Z.features[j].geometry : W ? Z.geometry : Z, ot = J ? J.type === "GeometryCollection" : !1, dt = ot ? J.geometries.length : 1;
      for (var ht = 0; ht < dt; ht++) {
        var H = 0, mt = 0;
        if (O = ot ? J.geometries[ht] : J, O !== null) {
          vt = O.coordinates;
          var ft = O.type;
          switch (M = b && (ft === "Polygon" || ft === "MultiPolygon") ? 1 : 0, ft) {
            case null:
              break;
            case "Point":
              if (I(
                vt,
                m,
                j,
                H,
                mt
              ) === !1)
                return !1;
              m++, H++;
              break;
            case "LineString":
            case "MultiPoint":
              for (rt = 0; rt < vt.length; rt++) {
                if (I(
                  vt[rt],
                  m,
                  j,
                  H,
                  mt
                ) === !1)
                  return !1;
                m++, ft === "MultiPoint" && H++;
              }
              ft === "LineString" && H++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (rt = 0; rt < vt.length; rt++) {
                for (ct = 0; ct < vt[rt].length - M; ct++) {
                  if (I(
                    vt[rt][ct],
                    m,
                    j,
                    H,
                    mt
                  ) === !1)
                    return !1;
                  m++;
                }
                ft === "MultiLineString" && H++, ft === "Polygon" && mt++;
              }
              ft === "Polygon" && H++;
              break;
            case "MultiPolygon":
              for (rt = 0; rt < vt.length; rt++) {
                for (mt = 0, ct = 0; ct < vt[rt].length; ct++) {
                  for (nt = 0; nt < vt[rt][ct].length - M; nt++) {
                    if (I(
                      vt[rt][ct][nt],
                      m,
                      j,
                      H,
                      mt
                    ) === !1)
                      return !1;
                    m++;
                  }
                  mt++;
                }
                H++;
              }
              break;
            case "GeometryCollection":
              for (rt = 0; rt < O.geometries.length; rt++)
                if (wr(O.geometries[rt], I, b) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function co(Z) {
  if (!Z)
    throw new Error("geojson is required");
  switch (Z.type) {
    case "Feature":
      return hi(Z);
    case "FeatureCollection":
      return po(Z);
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
    case "GeometryCollection":
      return Mr(Z);
    default:
      throw new Error("unknown GeoJSON type");
  }
}
function hi(Z) {
  var I = { type: "Feature" };
  return Object.keys(Z).forEach(function(b) {
    switch (b) {
      case "type":
      case "properties":
      case "geometry":
        return;
      default:
        I[b] = Z[b];
    }
  }), I.properties = ui(Z.properties), I.geometry = Mr(Z.geometry), I;
}
function ui(Z) {
  var I = {};
  return Z && Object.keys(Z).forEach(function(b) {
    var rt = Z[b];
    typeof rt == "object" ? rt === null ? I[b] = null : Array.isArray(rt) ? I[b] = rt.map(function(ct) {
      return ct;
    }) : I[b] = ui(rt) : I[b] = rt;
  }), I;
}
function po(Z) {
  var I = { type: "FeatureCollection" };
  return Object.keys(Z).forEach(function(b) {
    switch (b) {
      case "type":
      case "features":
        return;
      default:
        I[b] = Z[b];
    }
  }), I.features = Z.features.map(function(b) {
    return hi(b);
  }), I;
}
function Mr(Z) {
  var I = { type: Z.type };
  return Z.bbox && (I.bbox = Z.bbox), Z.type === "GeometryCollection" ? (I.geometries = Z.geometries.map(function(b) {
    return Mr(b);
  }), I) : (I.coordinates = li(Z.coordinates), I);
}
function li(Z) {
  var I = Z;
  return typeof I[0] != "object" ? I.slice() : I.map(function(b) {
    return li(b);
  });
}
function mo(Z, I) {
  return I === void 0 && (I = {}), vo(Z, "mercator", I);
}
function vo(Z, I, b) {
  b === void 0 && (b = {}), b = b || {};
  var rt = b.mutate;
  if (!Z)
    throw new Error("geojson is required");
  return Array.isArray(Z) && _r(Z[0]) ? Z = I === "mercator" ? ai(Z) : si(Z) : (rt !== !0 && (Z = co(Z)), wr(Z, function(ct) {
    var nt = I === "mercator" ? ai(ct) : si(ct);
    ct[0] = nt[0], ct[1] = nt[1];
  })), Z;
}
function ai(Z) {
  var I = Math.PI / 180, b = 6378137, rt = 20037508342789244e-9, ct = Math.abs(Z[0]) <= 180 ? Z[0] : Z[0] - yo(Z[0]) * 360, nt = [
    b * ct * I,
    b * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * Z[1] * I))
  ];
  return nt[0] > rt && (nt[0] = rt), nt[0] < -rt && (nt[0] = -rt), nt[1] > rt && (nt[1] = rt), nt[1] < -rt && (nt[1] = -rt), nt;
}
function si(Z) {
  var I = 180 / Math.PI, b = 6378137;
  return [
    Z[0] * I / b,
    (Math.PI * 0.5 - 2 * Math.atan(Math.exp(-Z[1] / b))) * I
  ];
}
function yo(Z) {
  return Z < 0 ? -1 : Z > 0 ? 1 : 0;
}
class ce extends Ht.BufferGeometry {
  constructor() {
    super(), this.isMeshLine = !0, this.type = "MeshLine", this.positions = [], this.previous = [], this.next = [], this.side = [], this.width = [], this.indices_array = [], this.uvs = [], this.counters = [], this._points = [], this._geom = null, this.widthCallback = null, this.matrixWorld = new Ht.Matrix4(), Object.defineProperties(this, {
      // this is now a bufferGeometry
      // add getter to support previous api
      geometry: {
        enumerable: !0,
        get: function() {
          return this;
        }
      },
      geom: {
        enumerable: !0,
        get: function() {
          return this._geom;
        },
        set: function(I) {
          this.setGeometry(I, this.widthCallback);
        }
      },
      // for declaritive architectures
      // to return the same value that sets the points
      // eg. this.points = points
      // console.log(this.points) -> points
      points: {
        enumerable: !0,
        get: function() {
          return this._points;
        },
        set: function(I) {
          this.setPoints(I, this.widthCallback);
        }
      }
    });
  }
}
ce.prototype.setMatrixWorld = function(Z) {
  this.matrixWorld = Z;
};
ce.prototype.setGeometry = function(Z, I) {
  this._geometry = Z, this.setPoints(Z.getAttribute("position").array, I);
};
ce.prototype.setPoints = function(Z, I) {
  if (!(Z instanceof Float32Array) && !(Z instanceof Array)) {
    console.error(
      "ERROR: The BufferArray of points is not instancied correctly."
    );
    return;
  }
  if (this._points = Z, this.widthCallback = I, this.positions = [], this.counters = [], Z.length && Z[0] instanceof Ht.Vector3)
    for (var b = 0; b < Z.length; b++) {
      var rt = Z[b], ct = b / Z.length;
      this.positions.push(rt.x, rt.y, rt.z), this.positions.push(rt.x, rt.y, rt.z), this.counters.push(ct), this.counters.push(ct);
    }
  else
    for (var b = 0; b < Z.length; b += 3) {
      var ct = b / Z.length;
      this.positions.push(Z[b], Z[b + 1], Z[b + 2]), this.positions.push(Z[b], Z[b + 1], Z[b + 2]), this.counters.push(ct), this.counters.push(ct);
    }
  this.process();
};
function go(Z, I) {
  var b = new Ht.Matrix4(), rt = new Ht.Ray(), ct = new Ht.Sphere(), nt = new Ht.Vector3(), O = this.geometry;
  if (O.boundingSphere || O.computeBoundingSphere(), ct.copy(O.boundingSphere), ct.applyMatrix4(this.matrixWorld), Z.ray.intersectSphere(ct, nt) !== !1) {
    b.copy(this.matrixWorld).invert(), rt.copy(Z.ray).applyMatrix4(b);
    var dt = new Ht.Vector3(), vt = new Ht.Vector3(), J = new Ht.Vector3(), M = this instanceof Ht.LineSegments ? 2 : 1, m = O.index, ot = O.attributes;
    if (m !== null)
      for (var K = m.array, tt = ot.position.array, W = ot.width.array, xt = 0, j = K.length - 1; xt < j; xt += M) {
        var ht = K[xt], H = K[xt + 1];
        dt.fromArray(tt, ht * 3), vt.fromArray(tt, H * 3);
        var mt = W[Math.floor(xt / 3)] !== void 0 ? W[Math.floor(xt / 3)] : 1, ft = Z.params.Line.threshold + this.material.lineWidth * mt / 2, P = ft * ft, $ = rt.distanceSqToSegment(dt, vt, nt, J);
        if (!($ > P)) {
          nt.applyMatrix4(this.matrixWorld);
          var lt = Z.ray.origin.distanceTo(nt);
          lt < Z.near || lt > Z.far || (I.push({
            distance: lt,
            // What do we want? intersection point on the ray or on the segment??
            // point: raycaster.ray.at( distance ),
            point: J.clone().applyMatrix4(this.matrixWorld),
            index: xt,
            face: null,
            faceIndex: null,
            object: this
          }), xt = j);
        }
      }
  }
}
ce.prototype.raycast = go;
ce.prototype.compareV3 = function(Z, I) {
  var b = Z * 6, rt = I * 6;
  return this.positions[b] === this.positions[rt] && this.positions[b + 1] === this.positions[rt + 1] && this.positions[b + 2] === this.positions[rt + 2];
};
ce.prototype.copyV3 = function(Z) {
  var I = Z * 6;
  return [this.positions[I], this.positions[I + 1], this.positions[I + 2]];
};
ce.prototype.process = function() {
  var Z = this.positions.length / 6;
  this.previous = [], this.next = [], this.side = [], this.width = [], this.indices_array = [], this.uvs = [];
  var I, b;
  this.compareV3(0, Z - 1) ? b = this.copyV3(Z - 2) : b = this.copyV3(0), this.previous.push(b[0], b[1], b[2]), this.previous.push(b[0], b[1], b[2]);
  for (var rt = 0; rt < Z; rt++) {
    if (this.side.push(1), this.side.push(-1), this.widthCallback ? I = this.widthCallback(rt / (Z - 1)) : I = 1, this.width.push(I), this.width.push(I), this.uvs.push(rt / (Z - 1), 0), this.uvs.push(rt / (Z - 1), 1), rt < Z - 1) {
      b = this.copyV3(rt), this.previous.push(b[0], b[1], b[2]), this.previous.push(b[0], b[1], b[2]);
      var ct = rt * 2;
      this.indices_array.push(ct, ct + 1, ct + 2), this.indices_array.push(ct + 2, ct + 1, ct + 3);
    }
    rt > 0 && (b = this.copyV3(rt), this.next.push(b[0], b[1], b[2]), this.next.push(b[0], b[1], b[2]));
  }
  this.compareV3(Z - 1, 0) ? b = this.copyV3(1) : b = this.copyV3(Z - 1), this.next.push(b[0], b[1], b[2]), this.next.push(b[0], b[1], b[2]), !this._attributes || this._attributes.position.count !== this.positions.length ? this._attributes = {
    position: new Ht.BufferAttribute(new Float32Array(this.positions), 3),
    previous: new Ht.BufferAttribute(new Float32Array(this.previous), 3),
    next: new Ht.BufferAttribute(new Float32Array(this.next), 3),
    side: new Ht.BufferAttribute(new Float32Array(this.side), 1),
    width: new Ht.BufferAttribute(new Float32Array(this.width), 1),
    uv: new Ht.BufferAttribute(new Float32Array(this.uvs), 2),
    index: new Ht.BufferAttribute(new Uint16Array(this.indices_array), 1),
    counters: new Ht.BufferAttribute(new Float32Array(this.counters), 1)
  } : (this._attributes.position.copyArray(new Float32Array(this.positions)), this._attributes.position.needsUpdate = !0, this._attributes.previous.copyArray(new Float32Array(this.previous)), this._attributes.previous.needsUpdate = !0, this._attributes.next.copyArray(new Float32Array(this.next)), this._attributes.next.needsUpdate = !0, this._attributes.side.copyArray(new Float32Array(this.side)), this._attributes.side.needsUpdate = !0, this._attributes.width.copyArray(new Float32Array(this.width)), this._attributes.width.needsUpdate = !0, this._attributes.uv.copyArray(new Float32Array(this.uvs)), this._attributes.uv.needsUpdate = !0, this._attributes.index.copyArray(new Uint16Array(this.indices_array)), this._attributes.index.needsUpdate = !0), this.setAttribute("position", this._attributes.position), this.setAttribute("previous", this._attributes.previous), this.setAttribute("next", this._attributes.next), this.setAttribute("side", this._attributes.side), this.setAttribute("width", this._attributes.width), this.setAttribute("uv", this._attributes.uv), this.setAttribute("counters", this._attributes.counters), this.setIndex(this._attributes.index), this.computeBoundingSphere(), this.computeBoundingBox();
};
function gr(Z, I, b, rt, ct) {
  var nt;
  if (Z = Z.subarray || Z.slice ? Z : Z.buffer, b = b.subarray || b.slice ? b : b.buffer, Z = I ? Z.subarray ? Z.subarray(I, ct && I + ct) : Z.slice(I, ct && I + ct) : Z, b.set)
    b.set(Z, rt);
  else
    for (nt = 0; nt < Z.length; nt++)
      b[nt + rt] = Z[nt];
  return b;
}
ce.prototype.advance = function(Z) {
  var I = this._attributes.position.array, b = this._attributes.previous.array, rt = this._attributes.next.array, ct = I.length;
  gr(I, 0, b, 0, ct), gr(I, 6, I, 0, ct - 6), I[ct - 6] = Z.x, I[ct - 5] = Z.y, I[ct - 4] = Z.z, I[ct - 3] = Z.x, I[ct - 2] = Z.y, I[ct - 1] = Z.z, gr(I, 6, rt, 0, ct - 6), rt[ct - 6] = Z.x, rt[ct - 5] = Z.y, rt[ct - 4] = Z.z, rt[ct - 3] = Z.x, rt[ct - 2] = Z.y, rt[ct - 1] = Z.z, this._attributes.position.needsUpdate = !0, this._attributes.previous.needsUpdate = !0, this._attributes.next.needsUpdate = !0;
};
Ht.ShaderChunk.meshline_vert = [
  "",
  Ht.ShaderChunk.logdepthbuf_pars_vertex,
  Ht.ShaderChunk.fog_pars_vertex,
  "",
  "attribute vec3 previous;",
  "attribute vec3 next;",
  "attribute float side;",
  "attribute float width;",
  "attribute float counters;",
  "",
  "uniform vec2 resolution;",
  "uniform float lineWidth;",
  "uniform vec3 color;",
  "uniform float opacity;",
  "uniform float sizeAttenuation;",
  "",
  "varying vec2 vUV;",
  "varying vec4 vColor;",
  "varying float vCounters;",
  "",
  "vec2 fix( vec4 i, float aspect ) {",
  "",
  "    vec2 res = i.xy / i.w;",
  "    res.x *= aspect;",
  "	 vCounters = counters;",
  "    return res;",
  "",
  "}",
  "",
  "void main() {",
  "",
  "    float aspect = resolution.x / resolution.y;",
  "",
  "    vColor = vec4( color, opacity );",
  "    vUV = uv;",
  "",
  "    mat4 m = projectionMatrix * modelViewMatrix;",
  "    vec4 finalPosition = m * vec4( position, 1.0 );",
  "    vec4 prevPos = m * vec4( previous, 1.0 );",
  "    vec4 nextPos = m * vec4( next, 1.0 );",
  "",
  "    vec2 currentP = fix( finalPosition, aspect );",
  "    vec2 prevP = fix( prevPos, aspect );",
  "    vec2 nextP = fix( nextPos, aspect );",
  "",
  "    float w = lineWidth * width;",
  "",
  "    vec2 dir;",
  "    if( nextP == currentP ) dir = normalize( currentP - prevP );",
  "    else if( prevP == currentP ) dir = normalize( nextP - currentP );",
  "    else {",
  "        vec2 dir1 = normalize( currentP - prevP );",
  "        vec2 dir2 = normalize( nextP - currentP );",
  "        dir = normalize( dir1 + dir2 );",
  "",
  "        vec2 perp = vec2( -dir1.y, dir1.x );",
  "        vec2 miter = vec2( -dir.y, dir.x );",
  "        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );",
  "",
  "    }",
  "",
  "    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;",
  "    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );",
  "    normal.xy *= .5 * w;",
  "    normal *= projectionMatrix;",
  "    if( sizeAttenuation == 0. ) {",
  "        normal.xy *= finalPosition.w;",
  "        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;",
  "    }",
  "",
  "    finalPosition.xy += normal.xy * side;",
  "",
  "    gl_Position = finalPosition;",
  "",
  Ht.ShaderChunk.logdepthbuf_vertex,
  Ht.ShaderChunk.fog_vertex && "    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
  Ht.ShaderChunk.fog_vertex,
  "}"
].join(`
`);
Ht.ShaderChunk.meshline_frag = [
  "",
  Ht.ShaderChunk.fog_pars_fragment,
  Ht.ShaderChunk.logdepthbuf_pars_fragment,
  "",
  "uniform sampler2D map;",
  "uniform sampler2D alphaMap;",
  "uniform float useMap;",
  "uniform float useAlphaMap;",
  "uniform float useDash;",
  "uniform float dashArray;",
  "uniform float dashOffset;",
  "uniform float dashRatio;",
  "uniform float visibility;",
  "uniform float alphaTest;",
  "uniform vec2 repeat;",
  "",
  "varying vec2 vUV;",
  "varying vec4 vColor;",
  "varying float vCounters;",
  "",
  "void main() {",
  "",
  Ht.ShaderChunk.logdepthbuf_fragment,
  "",
  "    vec4 c = vColor;",
  "    if( useMap == 1. ) c *= texture2D( map, vUV * repeat );",
  "    if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV * repeat ).a;",
  "    if( c.a < alphaTest ) discard;",
  "    if( useDash == 1. ){",
  "        c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));",
  "    }",
  "    gl_FragColor = c;",
  "    gl_FragColor.a *= step(vCounters, visibility);",
  "",
  Ht.ShaderChunk.fog_fragment,
  "}"
].join(`
`);
class fi extends Ht.ShaderMaterial {
  constructor(I) {
    super({
      uniforms: Object.assign({}, Ht.UniformsLib.fog, {
        lineWidth: { value: 1 },
        map: { value: null },
        useMap: { value: 0 },
        alphaMap: { value: null },
        useAlphaMap: { value: 0 },
        color: { value: new Ht.Color(16777215) },
        opacity: { value: 1 },
        resolution: { value: new Ht.Vector2(1, 1) },
        sizeAttenuation: { value: 1 },
        dashArray: { value: 0 },
        dashOffset: { value: 0 },
        dashRatio: { value: 0.5 },
        useDash: { value: 0 },
        visibility: { value: 1 },
        alphaTest: { value: 0 },
        repeat: { value: new Ht.Vector2(1, 1) }
      }),
      vertexShader: Ht.ShaderChunk.meshline_vert,
      fragmentShader: Ht.ShaderChunk.meshline_frag
    }), this.isMeshLineMaterial = !0, this.type = "MeshLineMaterial", Object.defineProperties(this, {
      lineWidth: {
        enumerable: !0,
        get: function() {
          return this.uniforms.lineWidth.value;
        },
        set: function(b) {
          this.uniforms.lineWidth.value = b;
        }
      },
      map: {
        enumerable: !0,
        get: function() {
          return this.uniforms.map.value;
        },
        set: function(b) {
          this.uniforms.map.value = b;
        }
      },
      useMap: {
        enumerable: !0,
        get: function() {
          return this.uniforms.useMap.value;
        },
        set: function(b) {
          this.uniforms.useMap.value = b;
        }
      },
      alphaMap: {
        enumerable: !0,
        get: function() {
          return this.uniforms.alphaMap.value;
        },
        set: function(b) {
          this.uniforms.alphaMap.value = b;
        }
      },
      useAlphaMap: {
        enumerable: !0,
        get: function() {
          return this.uniforms.useAlphaMap.value;
        },
        set: function(b) {
          this.uniforms.useAlphaMap.value = b;
        }
      },
      color: {
        enumerable: !0,
        get: function() {
          return this.uniforms.color.value;
        },
        set: function(b) {
          this.uniforms.color.value = b;
        }
      },
      opacity: {
        enumerable: !0,
        get: function() {
          return this.uniforms.opacity.value;
        },
        set: function(b) {
          this.uniforms.opacity.value = b;
        }
      },
      resolution: {
        enumerable: !0,
        get: function() {
          return this.uniforms.resolution.value;
        },
        set: function(b) {
          this.uniforms.resolution.value.copy(b);
        }
      },
      sizeAttenuation: {
        enumerable: !0,
        get: function() {
          return this.uniforms.sizeAttenuation.value;
        },
        set: function(b) {
          this.uniforms.sizeAttenuation.value = b;
        }
      },
      dashArray: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashArray.value;
        },
        set: function(b) {
          this.uniforms.dashArray.value = b, this.useDash = b !== 0 ? 1 : 0;
        }
      },
      dashOffset: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashOffset.value;
        },
        set: function(b) {
          this.uniforms.dashOffset.value = b;
        }
      },
      dashRatio: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashRatio.value;
        },
        set: function(b) {
          this.uniforms.dashRatio.value = b;
        }
      },
      useDash: {
        enumerable: !0,
        get: function() {
          return this.uniforms.useDash.value;
        },
        set: function(b) {
          this.uniforms.useDash.value = b;
        }
      },
      visibility: {
        enumerable: !0,
        get: function() {
          return this.uniforms.visibility.value;
        },
        set: function(b) {
          this.uniforms.visibility.value = b;
        }
      },
      alphaTest: {
        enumerable: !0,
        get: function() {
          return this.uniforms.alphaTest.value;
        },
        set: function(b) {
          this.uniforms.alphaTest.value = b;
        }
      },
      repeat: {
        enumerable: !0,
        get: function() {
          return this.uniforms.repeat.value;
        },
        set: function(b) {
          this.uniforms.repeat.value.copy(b);
        }
      }
    }), this.setValues(I);
  }
}
fi.prototype.copy = function(Z) {
  return Ht.ShaderMaterial.prototype.copy.call(this, Z), this.lineWidth = Z.lineWidth, this.map = Z.map, this.useMap = Z.useMap, this.alphaMap = Z.alphaMap, this.useAlphaMap = Z.useAlphaMap, this.color.copy(Z.color), this.opacity = Z.opacity, this.resolution.copy(Z.resolution), this.sizeAttenuation = Z.sizeAttenuation, this.dashArray.copy(Z.dashArray), this.dashOffset.copy(Z.dashOffset), this.dashRatio.copy(Z.dashRatio), this.useDash = Z.useDash, this.visibility = Z.visibility, this.alphaTest = Z.alphaTest, this.repeat.copy(Z.repeat), this;
};
const _o = new _e();
class or extends Ee {
  /**
   * 
   * @param {any} fe 
   * @param {ShapeOption} option 
   */
  constructor(I, b) {
    super(), this.data = I, this.option = b;
  }
  init() {
    const I = this.data.geometry;
    let b, rt;
    this.option.polylineStyleCallBack && (b = or.getPolylineStyle(this.data, this.option), rt = _o.set(b.color).toArray().map((nt) => nt * 255));
    let ct = [];
    if (I.type === "LineString") {
      this.points = [];
      for (let dt = 0; dt < I.coordinates.length; dt++)
        ct.push(I.coordinates[dt][0], I.coordinates[dt][1], 0);
      const nt = new xe();
      nt.setAttribute(
        "position",
        new ve(new Float32Array(ct), 3)
      );
      const O = new ce();
      b ? (O.setGeometry(nt, (dt) => b.width), this.setGeometryColor(O, rt)) : O.setGeometry(nt), this.geometry = O.geometry;
    }
    if (I.type === "MultiLineString")
      if (Array.isArray(I.coordinates[0][0])) {
        const nt = [];
        I.coordinates.forEach((O) => {
          ct = [];
          for (let J = 0; J < O.length; J++)
            ct.push(O[J][0], O[J][1], 0);
          const dt = new xe();
          dt.setAttribute(
            "position",
            new ve(new Float32Array(ct), 3)
          );
          const vt = new ce();
          b ? (vt.setGeometry(dt, () => b.width), this.setGeometryColor(vt, rt)) : vt.setGeometry(dt), nt.push(vt);
        }), this.geometry = sr(nt, !0);
      } else {
        for (let dt = 0; dt < I.coordinates.length; dt++)
          ct.push(I.coordinates[dt][0], I.coordinates[dt][1], 0);
        const nt = new xe();
        nt.setAttribute(
          "position",
          new ve(new Float32Array(ct), 3)
        );
        const O = new ce();
        b ? (O.setGeometry(nt, () => b.width), this.setGeometryColor(O, rt)) : O.setGeometry(nt), this.geometry = O;
      }
  }
  /**
   * 
   * @param {BufferGeometry} geometry 
   * @param {Array<number>} color 
   */
  setGeometryColor(I, b) {
    const rt = I.getAttribute("position"), ct = [];
    for (let O = 0; O < rt.count; O++)
      ct.push(b[0], b[1], b[2]);
    const nt = new ve(new Uint8Array(ct), 3);
    I.setAttribute("acolor", nt);
  }
  static getPolylineStyle(I, b) {
    return b.polylineStyleCallBack(I);
  }
}
const xo = new _e();
class hr extends Ee {
  /**
   * 
   * @param {any} fe 
   * @param {ShapeOption} option 
   */
  constructor(I, b) {
    super(), this.data = I, this.option = b;
  }
  init() {
    const I = this.data.geometry;
    if (I.type === "Point" && (this.points = [
      new ar(I.coordinates[0], I.coordinates[1], 0)
    ]), I.type === "MultiPoint" && (this.points = I.coordinates.map((b) => new ar(b.coordinates[0], b.coordinates[1], 0))), this.option.pointStyleCallBack) {
      const b = hr.getPointStyle(this.data, this.option);
      this.color = xo.setStyle(b.color).toArray().map((rt) => rt * 255), this.size = b.size;
    }
  }
  /**
   * 
   * @param {any} fe 
   * @param {ShapeOption} option 
   */
  static getPointStyle(I, b) {
    return b.pointStyleCallBack(I);
  }
}
function ie(Z) {
  return Z != null;
}
function wo(Z) {
  return new Worker(
    "/assets/shap-worker-OvoOuDwo.js",
    {
      name: Z == null ? void 0 : Z.name
    }
  );
}
const Mo = (
  /* glsl */
  `
#if defined( USE_COLOR_ALPHA )

vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color / 255.0;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`
);
class bo extends Ht.MeshPhongMaterial {
  constructor(I) {
    super(I), this._init();
  }
  _init() {
    this.onBeforeCompile = (I) => (I.vertexShader = I.vertexShader.replace(
      "#include <color_vertex>",
      Mo
    ), I);
  }
}
function xr(Z) {
  var I = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  return wr(Z, function(b) {
    I[0] > b[0] && (I[0] = b[0]), I[1] > b[1] && (I[1] = b[1]), I[2] < b[0] && (I[2] = b[0]), I[3] < b[1] && (I[3] = b[1]);
  }), I;
}
xr.default = xr;
function Eo(Z, I) {
  I === void 0 && (I = {});
  var b = xr(Z), rt = (b[0] + b[2]) / 2, ct = (b[1] + b[3]) / 2;
  return fo([rt, ct], I.properties, I);
}
const Ao = `
#if defined( USE_COLOR_ALPHA )

vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color / 255.0;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`, Co = `
   #include <common>
  attribute float asize; 
`, So = `
  gl_PointSize = size * asize ;
`;
class ko extends ro {
  constructor(I) {
    super(I), this._init();
  }
  _init() {
    this.onBeforeCompile = (I) => (I.vertexShader = I.vertexShader.replace(
      "#include <common>",
      Co
    ), I.vertexShader = I.vertexShader.replace(
      "#include <color_vertex>",
      Ao
    ), I.vertexShader = I.vertexShader.replace(
      "gl_PointSize = size;",
      So
    ), I);
  }
}
const Io = Ht.ShaderChunk.meshline_vert = [
  "",
  "#include <common>",
  Ht.ShaderChunk.logdepthbuf_pars_vertex,
  Ht.ShaderChunk.fog_pars_vertex,
  "",
  "attribute vec3 previous;",
  "attribute vec3 next;",
  "attribute vec3 acolor;",
  "attribute float side;",
  "attribute float width;",
  "attribute float counters;",
  "",
  "uniform vec2 resolution;",
  "uniform float lineWidth;",
  "uniform vec3 color;",
  "uniform float opacity;",
  "uniform float sizeAttenuation;",
  "",
  "varying vec2 vUV;",
  "varying vec4 vColor;",
  "varying float vCounters;",
  "",
  "vec2 fix( vec4 i, float aspect ) {",
  "",
  "    vec2 res = i.xy / i.w;",
  "    res.x *= aspect;",
  "	 vCounters = counters;",
  "    return res;",
  "",
  "}",
  "",
  "void main() {",
  "",
  "    float aspect = resolution.x / resolution.y;",
  "",
  "    vec3 basecolor = color * (acolor / 255.0);",
  "    vColor = vec4( basecolor, opacity );",
  "    vUV = uv;",
  "",
  "    mat4 m = projectionMatrix * modelViewMatrix;",
  "    vec4 finalPosition = m * vec4( position, 1.0 );",
  "    vec4 prevPos = m * vec4( previous, 1.0 );",
  "    vec4 nextPos = m * vec4( next, 1.0 );",
  "",
  "    vec2 currentP = fix( finalPosition, aspect );",
  "    vec2 prevP = fix( prevPos, aspect );",
  "    vec2 nextP = fix( nextPos, aspect );",
  "",
  "    float w = lineWidth * width;",
  "",
  "    vec2 dir;",
  "    if( nextP == currentP ) dir = normalize( currentP - prevP );",
  "    else if( prevP == currentP ) dir = normalize( nextP - currentP );",
  "    else {",
  "        vec2 dir1 = normalize( currentP - prevP );",
  "        vec2 dir2 = normalize( nextP - currentP );",
  "        dir = normalize( dir1 + dir2 );",
  "",
  "        vec2 perp = vec2( -dir1.y, dir1.x );",
  "        vec2 miter = vec2( -dir.y, dir.x );",
  "        //w = clamp( w / dot( miter, perp ), 0., 4. * lineWidth * width );",
  "",
  "    }",
  "",
  "    //vec2 normal = ( cross( vec3( dir, 0. ), vec3( 0., 0., 1. ) ) ).xy;",
  "    vec4 normal = vec4( -dir.y, dir.x, 0., 1. );",
  "    normal.xy *= .5 * w;",
  "    normal *= projectionMatrix;",
  "    if( sizeAttenuation == 0. ) {",
  "        normal.xy *= finalPosition.w;",
  "        normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;",
  "    }",
  "",
  "    finalPosition.xy += normal.xy * side;",
  "",
  "    gl_Position = finalPosition;",
  "",
  Ht.ShaderChunk.logdepthbuf_vertex,
  Ht.ShaderChunk.fog_vertex && "    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
  Ht.ShaderChunk.fog_vertex,
  "}"
].join(`
`);
class To extends fi {
  constructor(I) {
    super(I), this._init();
  }
  _init() {
    this.onBeforeCompile = (I) => (I.vertexShader = Io, I);
  }
}
class ne {
  /**
   * 
   * @param {ShapeOption} option 
   */
  constructor(I) {
    this.url = I.url, this.option = I;
  }
  async initWithShpWoker() {
    const I = new TextDecoder(), b = new wo(), rt = {
      polygon: new Ee(),
      polyline: new Ee(),
      point: new Ee()
    }, ct = new ao();
    let nt = new _e();
    return this.type = null, b.onmessage = (O) => {
      const dt = O.data;
      let vt;
      if (dt.type === "getPolygonStyle") {
        this.type = "polygon";
        const { id: J, geojsons: M } = JSON.parse(I.decode(dt.data)), m = M.map((tt) => (vt = ni.getPolygonStyle(tt, this.option), vt.color = nt.set(vt.color).toArray(), {
          geo: tt.geometry,
          style: vt
        }));
        let ot = JSON.stringify(m);
        const K = new TextEncoder().encode(ot);
        b.postMessage({
          type: "getPolygon",
          data: K
        }, [K.buffer]), ot = null;
      }
      if (dt.type === "getPointStyle") {
        this.type = "point";
        const { id: J, geojsons: M } = JSON.parse(I.decode(dt.data));
        let m;
        const ot = M.map((W) => (m = hr.getPointStyle(W, this.option), m.color = nt.set(m.color).toArray(), {
          geometry: W.geometry,
          style: m
        }));
        let K = JSON.stringify(ot);
        const tt = new TextEncoder().encode(K);
        b.postMessage({
          type: "getPoint",
          data: tt
        }, [tt.buffer]), K = null;
      }
      if (dt.type === "getPolylineStyle") {
        this.type = "polyline";
        const { id: J, geojsons: M } = JSON.parse(I.decode(dt.data));
        let m;
        const ot = M.map((W) => (m = or.getPolylineStyle(W, this.option), m.color = nt.set(m.color).toArray().map((xt) => xt * 255), {
          geometry: W.geometry,
          style: m
        }));
        let K = JSON.stringify(ot);
        const tt = new TextEncoder().encode(K);
        b.postMessage({
          type: "getPolyline",
          data: tt
        }, [tt.buffer]), K = null;
      }
      if (dt.type === "center") {
        const J = dt.data;
        this.center = new ar(J.geometry.coordinates[0], J.geometry.coordinates[1], 0);
      }
      if (dt.type === "point") {
        this.material || this.initPointMaterial();
        let J = O.data.geometry, M = new xe();
        M.setAttribute("position", ne.arrayBufferToAttr(J.position, 3)), M.setAttribute("color", ne.arrayBufferToAttr(J.color, 3)), M.setAttribute("asize", ne.arrayBufferToAttr(J.size, 1)), rt.point.add(
          new Kr(M, this.material)
        ), rt.polygon = null, rt.polyline = null, ct.resolve();
      }
      if (dt.type === "polygon") {
        this.material || this.initPolygonMaterial();
        let J = O.data.geometry, M = J.attributes, m = new xe(), ot = new TextDecoder(), K = JSON.parse(ot.decode(J.groups));
        m.groups = K, m.setAttribute("position", ne.arrayBufferToAttr(M.position.array, M.position.itemSize)), m.setAttribute("uv", ne.arrayBufferToAttr(M.uv.array, M.uv.itemSize)), m.setAttribute("normal", ne.arrayBufferToAttr(M.normal.array, M.normal.itemSize)), m.setAttribute("color", ne.arrayBufferToAttr(M.color.array, M.color.itemSize)), rt.polygon.add(
          new rr(m, this.material)
        ), J = null, rt.point = null, rt.polyline = null, ct.resolve();
      }
      if (dt.type === "polyline") {
        this.material || this.initPolylineMaterial();
        let J = O.data.geometry, M = new xe();
        M.setAttribute("acolor", ne.arrayBufferToAttr(J.acolor, 3)), M.setAttribute("counters", ne.arrayBufferToAttr(J.counters, 1)), M.setAttribute("next", ne.arrayBufferToAttr(J.next, 3)), M.setAttribute("position", ne.arrayBufferToAttr(J.position, 3)), M.setAttribute("previous", ne.arrayBufferToAttr(J.previous, 3)), M.setAttribute("side", ne.arrayBufferToAttr(J.side, 1)), M.setAttribute("uv", ne.arrayBufferToAttr(J.uv, 2)), M.setAttribute("width", ne.arrayBufferToAttr(J.width, 1)), M.setIndex(ne.arrayBufferToAttr(J.index, 1)), rt.point = null, rt.polygon = null, rt.polyline.add(
          new rr(M, this.material)
        ), ct.resolve();
      }
    }, b.postMessage({
      type: "shp",
      data: {
        url: this.url
      }
    }), await ct.promise, rt;
  }
  /**
   * 
   * @param {ArrayBuffer} buffer 
   * @param {number} itemSize 
   */
  static arrayBufferToAttr(I, b) {
    return new ve(I, b);
  }
  async init() {
    const I = await ho(this.url), b = mo(I, { mutate: !0 }), rt = Eo(b);
    this.center = new ar(rt.geometry.coordinates[0], rt.geometry.coordinates[1], 0);
    const ct = {
      polygon: [],
      polyline: [],
      point: []
    };
    b.features.forEach((O) => {
      if (["Polygon", "MultiPolygon"].includes(O.geometry.type)) {
        const dt = new ni(O, this.option);
        dt.init(), ct.polygon.push(dt.geometry);
      }
      if (["LineString", "MultiLineString"].includes(O.geometry.type)) {
        const dt = new or(O, this.option);
        dt.init(), ct.polyline.push(dt.geometry);
      }
      if (["Point", "MultiPoint"].includes(O.geometry.type)) {
        const dt = new hr(O, this.option);
        dt.init(), ct.point.push(dt);
      }
    });
    const nt = {
      polygon: null,
      polyline: null,
      point: null
    };
    if (ct.polygon.length) {
      const O = sr(ct.polygon, !0);
      this.initPolygonMaterial(), nt.polygon = new rr(O, this.material);
    }
    if (ct.polyline.length) {
      const O = sr(ct.polyline, !0);
      this.initPolylineMaterial(), nt.polyline = new rr(O, this.material);
    }
    if (ct.point.length) {
      const O = ct.point.reduce(
        (J, M) => (J.position.push(...M.points), M.color && J.color.push(...M.color), M.size && J.size.push(M.size), J),
        {
          position: [],
          color: [],
          size: []
        }
      ), dt = new xe();
      if (dt.setFromPoints(O.position), O.color.length) {
        const J = new ve(new Uint8Array(O.color), 3), M = new ve(new Uint8Array(O.size), 1);
        dt.setAttribute("asize", M), dt.setAttribute("color", J);
      }
      this.initPointMaterial();
      const vt = new Kr(dt, this.material);
      nt.point = vt;
    }
    return nt;
  }
  /**
   * 
   *  材质
   */
  initPointMaterial() {
    this.material || (this.material = new ko({
      side: io
    }));
    const I = this.option.style.point;
    ie(I) && (I.lighting ? this.material.blending = Qr : this.material.blending = Yr, ie(I.color) && (this.material.color = new _e(I.color)), ie(I.map) && (this.material.map = new ti().load(I.map), this.material.map.colorSpace = no), ie(I.size) && (this.material.size = I.size), ie(I.depthTest) && (this.material.depthTest = I.depthTest), ie(I.depthWrite) && (this.material.depthWrite = I.depthWrite), ie(I.transparent) && (this.material.transparent = I.transparent), this.option.pointStyleCallBack && (this.material.vertexColors = !0));
  }
  initPolygonMaterial() {
    this.material || (this.material = new bo(
      {
        vertexColors: !0
      }
    ));
    const I = this.option.style.polygon;
    ie(I) && ie(I.color) && (this.material.color = new _e(I.color));
  }
  initPolylineMaterial() {
    this.material || (this.material = new To({
      map: null,
      useMap: !1,
      color: new _e("#6495ed"),
      resolution: new nr(window.innerWidth, window.innerHeight),
      sizeAttenuation: !1,
      lineWidth: 1,
      depthWrite: !1,
      depthTest: !1,
      transparent: !1
    }));
    const I = this.option.style.polyline;
    ie(I) && (ie(I.lighting) && (I.lighting ? this.material.blending = Qr : this.material.blending = Yr), ie(I.color) && (this.material.color = new _e(I.color)), ie(I.lineWidth) && (this.material.lineWidth = I.lineWidth), ie(I.useMap) && (this.material.useMap = I.useMap), ie(I.map) && (this.material.map = new ti().load(I.map)), ie(I.depthTest) && (this.material.depthTest = I.depthTest), ie(I.depthWrite) && (this.material.depthWrite = I.depthWrite), ie(I.resolution) && (this.material.resolution = new nr().fromArray(I.resolution)), ie(I.transparent) && (this.material.transparent = I.transparent));
  }
  /**
   * 
   * @param {ShapeOption} option 
   */
  setOption(I) {
    if (ie(I)) {
      if (this.option = {
        ...this.option,
        ...I
      }, this.type === "point") {
        this.initPointMaterial();
        return;
      }
      if (this.type === "polyline") {
        this.initPolylineMaterial();
        return;
      }
      if (this.type === "polygon") {
        this.initPolygonMaterial();
        return;
      }
    }
  }
}
class Bo extends Ee {
  /**
   * 
   * @param {ShapeOption} option 
   */
  constructor(I) {
    super(), this.option = {
      ...uo,
      ...I
    }, this.rotateX(-Math.PI / 2);
  }
  async init() {
    this.shaParse = new ne(this.option);
    const I = this.option.useWorker ? await this.shaParse.initWithShpWoker() : await this.shaParse.init();
    this.center = this.shaParse.center, this.material = this.shaParse.material, I.polygon && (this.geoType = "polygon", this.shp = I.polygon, this.add(I.polygon)), I.point && (this.geoType = "point", this.shp = I.point, this.add(I.point)), I.polyline && (this.geoType = "polyline", this.shp = I.polyline, this.add(I.polyline)), this.box3 = new ei().expandByObject(this);
  }
  computeBox3() {
    this.box3 = new ei().expandByObject(this);
  }
  toOrigin() {
    this.shp.position.copy(this.center.clone().negate());
  }
  update() {
    this.children.forEach((I) => {
      I.update && I.update();
    });
  }
  destroy() {
    this.traverse((I) => {
      var b, rt;
      (b = I == null ? void 0 : I.geometry) == null || b.dispose(), (rt = I == null ? void 0 : I.material) == null || rt.dispose();
    });
  }
}
export {
  hr as Point,
  ni as Polygon,
  or as Polyline,
  ne as ShapParse,
  uo as ShapeOption,
  Bo as ShpFileRender
};
//# sourceMappingURL=three-shp-render.es.js.map
