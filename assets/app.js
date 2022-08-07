(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop() {
                progressTimerId = window2.requestAnimationFrame(loop);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // vendor/konva.js
  var require_konva = __commonJS({
    "vendor/konva.js"(exports, module) {
      !function(t, e) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).Konva = e();
      }(exports, function() {
        "use strict";
        var t = Math.PI / 180;
        const e = typeof global != "undefined" ? global : typeof window != "undefined" ? window : typeof WorkerGlobalScope != "undefined" ? self : {}, i = { _global: e, version: "8.3.5", isBrowser: typeof window != "undefined" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]"), isUnminified: /param/.test(function(t2) {
        }.toString()), dblClickWindow: 400, getAngle: (e2) => i.angleDeg ? e2 * t : e2, enableTrace: false, pointerEventsEnabled: true, autoDrawEnabled: true, hitOnDragEnabled: false, capturePointerEventsEnabled: false, _mouseListenClick: false, _touchListenClick: false, _pointerListenClick: false, _mouseInDblClickWindow: false, _touchInDblClickWindow: false, _pointerInDblClickWindow: false, _mouseDblClickPointerId: null, _touchDblClickPointerId: null, _pointerDblClickPointerId: null, pixelRatio: typeof window != "undefined" && window.devicePixelRatio || 1, dragDistance: 3, angleDeg: true, showWarnings: true, dragButtons: [0, 1], isDragging: () => i.DD.isDragging, isDragReady: () => !!i.DD.node, document: e.document, _injectGlobal(t2) {
          e.Konva = t2;
        } }, r = (t2) => {
          i[t2.prototype.getClassName()] = t2;
        };
        i._injectGlobal(i);
        class a {
          constructor(t2 = [1, 0, 0, 1, 0, 0]) {
            this.dirty = false, this.m = t2 && t2.slice() || [1, 0, 0, 1, 0, 0];
          }
          reset() {
            this.m[0] = 1, this.m[1] = 0, this.m[2] = 0, this.m[3] = 1, this.m[4] = 0, this.m[5] = 0;
          }
          copy() {
            return new a(this.m);
          }
          copyInto(t2) {
            t2.m[0] = this.m[0], t2.m[1] = this.m[1], t2.m[2] = this.m[2], t2.m[3] = this.m[3], t2.m[4] = this.m[4], t2.m[5] = this.m[5];
          }
          point(t2) {
            var e2 = this.m;
            return { x: e2[0] * t2.x + e2[2] * t2.y + e2[4], y: e2[1] * t2.x + e2[3] * t2.y + e2[5] };
          }
          translate(t2, e2) {
            return this.m[4] += this.m[0] * t2 + this.m[2] * e2, this.m[5] += this.m[1] * t2 + this.m[3] * e2, this;
          }
          scale(t2, e2) {
            return this.m[0] *= t2, this.m[1] *= t2, this.m[2] *= e2, this.m[3] *= e2, this;
          }
          rotate(t2) {
            var e2 = Math.cos(t2), i2 = Math.sin(t2), r2 = this.m[0] * e2 + this.m[2] * i2, a2 = this.m[1] * e2 + this.m[3] * i2, n2 = this.m[0] * -i2 + this.m[2] * e2, s2 = this.m[1] * -i2 + this.m[3] * e2;
            return this.m[0] = r2, this.m[1] = a2, this.m[2] = n2, this.m[3] = s2, this;
          }
          getTranslation() {
            return { x: this.m[4], y: this.m[5] };
          }
          skew(t2, e2) {
            var i2 = this.m[0] + this.m[2] * e2, r2 = this.m[1] + this.m[3] * e2, a2 = this.m[2] + this.m[0] * t2, n2 = this.m[3] + this.m[1] * t2;
            return this.m[0] = i2, this.m[1] = r2, this.m[2] = a2, this.m[3] = n2, this;
          }
          multiply(t2) {
            var e2 = this.m[0] * t2.m[0] + this.m[2] * t2.m[1], i2 = this.m[1] * t2.m[0] + this.m[3] * t2.m[1], r2 = this.m[0] * t2.m[2] + this.m[2] * t2.m[3], a2 = this.m[1] * t2.m[2] + this.m[3] * t2.m[3], n2 = this.m[0] * t2.m[4] + this.m[2] * t2.m[5] + this.m[4], s2 = this.m[1] * t2.m[4] + this.m[3] * t2.m[5] + this.m[5];
            return this.m[0] = e2, this.m[1] = i2, this.m[2] = r2, this.m[3] = a2, this.m[4] = n2, this.m[5] = s2, this;
          }
          invert() {
            var t2 = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]), e2 = this.m[3] * t2, i2 = -this.m[1] * t2, r2 = -this.m[2] * t2, a2 = this.m[0] * t2, n2 = t2 * (this.m[2] * this.m[5] - this.m[3] * this.m[4]), s2 = t2 * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
            return this.m[0] = e2, this.m[1] = i2, this.m[2] = r2, this.m[3] = a2, this.m[4] = n2, this.m[5] = s2, this;
          }
          getMatrix() {
            return this.m;
          }
          setAbsolutePosition(t2, e2) {
            var i2 = this.m[0], r2 = this.m[1], a2 = this.m[2], n2 = this.m[3], s2 = this.m[4], o2 = (i2 * (e2 - this.m[5]) - r2 * (t2 - s2)) / (i2 * n2 - r2 * a2), h2 = (t2 - s2 - a2 * o2) / i2;
            return this.translate(h2, o2);
          }
          decompose() {
            var t2 = this.m[0], e2 = this.m[1], i2 = this.m[2], r2 = this.m[3], a2 = t2 * r2 - e2 * i2;
            let n2 = { x: this.m[4], y: this.m[5], rotation: 0, scaleX: 0, scaleY: 0, skewX: 0, skewY: 0 };
            if (t2 != 0 || e2 != 0) {
              var s2 = Math.sqrt(t2 * t2 + e2 * e2);
              n2.rotation = e2 > 0 ? Math.acos(t2 / s2) : -Math.acos(t2 / s2), n2.scaleX = s2, n2.scaleY = a2 / s2, n2.skewX = (t2 * i2 + e2 * r2) / a2, n2.skewY = 0;
            } else if (i2 != 0 || r2 != 0) {
              var o2 = Math.sqrt(i2 * i2 + r2 * r2);
              n2.rotation = Math.PI / 2 - (r2 > 0 ? Math.acos(-i2 / o2) : -Math.acos(i2 / o2)), n2.scaleX = a2 / o2, n2.scaleY = o2, n2.skewX = 0, n2.skewY = (t2 * i2 + e2 * r2) / a2;
            }
            return n2.rotation = g._getRotation(n2.rotation), n2;
          }
        }
        var n = Math.PI / 180, s = 180 / Math.PI, o = "Konva error: ", h = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 132, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 255, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 203], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [119, 128, 144], slategrey: [119, 128, 144], snow: [255, 255, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], transparent: [255, 255, 255, 0], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 5] }, l = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, d = [];
        const c = typeof requestAnimationFrame != "undefined" && requestAnimationFrame || function(t2) {
          setTimeout(t2, 60);
        }, g = { _isElement: (t2) => !(!t2 || t2.nodeType != 1), _isFunction: (t2) => !!(t2 && t2.constructor && t2.call && t2.apply), _isPlainObject: (t2) => !!t2 && t2.constructor === Object, _isArray: (t2) => Object.prototype.toString.call(t2) === "[object Array]", _isNumber: (t2) => Object.prototype.toString.call(t2) === "[object Number]" && !isNaN(t2) && isFinite(t2), _isString: (t2) => Object.prototype.toString.call(t2) === "[object String]", _isBoolean: (t2) => Object.prototype.toString.call(t2) === "[object Boolean]", isObject: (t2) => t2 instanceof Object, isValidSelector(t2) {
          if (typeof t2 != "string")
            return false;
          var e2 = t2[0];
          return e2 === "#" || e2 === "." || e2 === e2.toUpperCase();
        }, _sign: (t2) => t2 === 0 || t2 > 0 ? 1 : -1, requestAnimFrame(t2) {
          d.push(t2), d.length === 1 && c(function() {
            const t3 = d;
            d = [], t3.forEach(function(t4) {
              t4();
            });
          });
        }, createCanvasElement() {
          var t2 = document.createElement("canvas");
          try {
            t2.style = t2.style || {};
          } catch (t3) {
          }
          return t2;
        }, createImageElement: () => document.createElement("img"), _isInDocument(t2) {
          for (; t2 = t2.parentNode; )
            if (t2 == document)
              return true;
          return false;
        }, _urlToImage(t2, e2) {
          var i2 = g.createImageElement();
          i2.onload = function() {
            e2(i2);
          }, i2.src = t2;
        }, _rgbToHex: (t2, e2, i2) => ((1 << 24) + (t2 << 16) + (e2 << 8) + i2).toString(16).slice(1), _hexToRgb(t2) {
          t2 = t2.replace("#", "");
          var e2 = parseInt(t2, 16);
          return { r: e2 >> 16 & 255, g: e2 >> 8 & 255, b: 255 & e2 };
        }, getRandomColor() {
          for (var t2 = (16777215 * Math.random() << 0).toString(16); t2.length < 6; )
            t2 = "0" + t2;
          return "#" + t2;
        }, getRGB(t2) {
          var e2;
          return t2 in h ? { r: (e2 = h[t2])[0], g: e2[1], b: e2[2] } : t2[0] === "#" ? this._hexToRgb(t2.substring(1)) : t2.substr(0, 4) === "rgb(" ? (e2 = l.exec(t2.replace(/ /g, "")), { r: parseInt(e2[1], 10), g: parseInt(e2[2], 10), b: parseInt(e2[3], 10) }) : { r: 0, g: 0, b: 0 };
        }, colorToRGBA: (t2) => (t2 = t2 || "black", g._namedColorToRBA(t2) || g._hex3ColorToRGBA(t2) || g._hex6ColorToRGBA(t2) || g._rgbColorToRGBA(t2) || g._rgbaColorToRGBA(t2) || g._hslColorToRGBA(t2)), _namedColorToRBA(t2) {
          var e2 = h[t2.toLowerCase()];
          return e2 ? { r: e2[0], g: e2[1], b: e2[2], a: 1 } : null;
        }, _rgbColorToRGBA(t2) {
          if (t2.indexOf("rgb(") === 0) {
            var e2 = (t2 = t2.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
            return { r: e2[0], g: e2[1], b: e2[2], a: 1 };
          }
        }, _rgbaColorToRGBA(t2) {
          if (t2.indexOf("rgba(") === 0) {
            var e2 = (t2 = t2.match(/rgba\(([^)]+)\)/)[1]).split(/ *, */).map((t3, e3) => t3.slice(-1) === "%" ? e3 === 3 ? parseInt(t3) / 100 : parseInt(t3) / 100 * 255 : Number(t3));
            return { r: e2[0], g: e2[1], b: e2[2], a: e2[3] };
          }
        }, _hex6ColorToRGBA(t2) {
          if (t2[0] === "#" && t2.length === 7)
            return { r: parseInt(t2.slice(1, 3), 16), g: parseInt(t2.slice(3, 5), 16), b: parseInt(t2.slice(5, 7), 16), a: 1 };
        }, _hex3ColorToRGBA(t2) {
          if (t2[0] === "#" && t2.length === 4)
            return { r: parseInt(t2[1] + t2[1], 16), g: parseInt(t2[2] + t2[2], 16), b: parseInt(t2[3] + t2[3], 16), a: 1 };
        }, _hslColorToRGBA(t2) {
          if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t2)) {
            const [e2, ...i2] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t2), r2 = Number(i2[0]) / 360, a2 = Number(i2[1]) / 100, n2 = Number(i2[2]) / 100;
            let s2, o2, h2;
            if (a2 === 0)
              return h2 = 255 * n2, { r: Math.round(h2), g: Math.round(h2), b: Math.round(h2), a: 1 };
            s2 = n2 < 0.5 ? n2 * (1 + a2) : n2 + a2 - n2 * a2;
            const l2 = 2 * n2 - s2, d2 = [0, 0, 0];
            for (let t3 = 0; t3 < 3; t3++)
              o2 = r2 + 1 / 3 * -(t3 - 1), o2 < 0 && o2++, o2 > 1 && o2--, h2 = 6 * o2 < 1 ? l2 + 6 * (s2 - l2) * o2 : 2 * o2 < 1 ? s2 : 3 * o2 < 2 ? l2 + (s2 - l2) * (2 / 3 - o2) * 6 : l2, d2[t3] = 255 * h2;
            return { r: Math.round(d2[0]), g: Math.round(d2[1]), b: Math.round(d2[2]), a: 1 };
          }
        }, haveIntersection: (t2, e2) => !(e2.x > t2.x + t2.width || e2.x + e2.width < t2.x || e2.y > t2.y + t2.height || e2.y + e2.height < t2.y), cloneObject(t2) {
          var e2 = {};
          for (var i2 in t2)
            this._isPlainObject(t2[i2]) ? e2[i2] = this.cloneObject(t2[i2]) : this._isArray(t2[i2]) ? e2[i2] = this.cloneArray(t2[i2]) : e2[i2] = t2[i2];
          return e2;
        }, cloneArray: (t2) => t2.slice(0), degToRad: (t2) => t2 * n, radToDeg: (t2) => t2 * s, _degToRad: (t2) => (g.warn("Util._degToRad is removed. Please use public Util.degToRad instead."), g.degToRad(t2)), _radToDeg: (t2) => (g.warn("Util._radToDeg is removed. Please use public Util.radToDeg instead."), g.radToDeg(t2)), _getRotation: (t2) => i.angleDeg ? g.radToDeg(t2) : t2, _capitalize: (t2) => t2.charAt(0).toUpperCase() + t2.slice(1), throw(t2) {
          throw new Error(o + t2);
        }, error(t2) {
          console.error(o + t2);
        }, warn(t2) {
          i.showWarnings && console.warn("Konva warning: " + t2);
        }, each(t2, e2) {
          for (var i2 in t2)
            e2(i2, t2[i2]);
        }, _inRange: (t2, e2, i2) => e2 <= t2 && t2 < i2, _getProjectionToSegment(t2, e2, i2, r2, a2, n2) {
          var s2, o2, h2, l2 = (t2 - i2) * (t2 - i2) + (e2 - r2) * (e2 - r2);
          if (l2 == 0)
            s2 = t2, o2 = e2, h2 = (a2 - i2) * (a2 - i2) + (n2 - r2) * (n2 - r2);
          else {
            var d2 = ((a2 - t2) * (i2 - t2) + (n2 - e2) * (r2 - e2)) / l2;
            d2 < 0 ? (s2 = t2, o2 = e2, h2 = (t2 - a2) * (t2 - a2) + (e2 - n2) * (e2 - n2)) : d2 > 1 ? (s2 = i2, o2 = r2, h2 = (i2 - a2) * (i2 - a2) + (r2 - n2) * (r2 - n2)) : h2 = ((s2 = t2 + d2 * (i2 - t2)) - a2) * (s2 - a2) + ((o2 = e2 + d2 * (r2 - e2)) - n2) * (o2 - n2);
          }
          return [s2, o2, h2];
        }, _getProjectionToLine(t2, e2, i2) {
          var r2 = g.cloneObject(t2), a2 = Number.MAX_VALUE;
          return e2.forEach(function(n2, s2) {
            if (i2 || s2 !== e2.length - 1) {
              var o2 = e2[(s2 + 1) % e2.length], h2 = g._getProjectionToSegment(n2.x, n2.y, o2.x, o2.y, t2.x, t2.y), l2 = h2[0], d2 = h2[1], c2 = h2[2];
              c2 < a2 && (r2.x = l2, r2.y = d2, a2 = c2);
            }
          }), r2;
        }, _prepareArrayForTween(t2, e2, i2) {
          var r2, a2 = [], n2 = [];
          if (t2.length > e2.length) {
            var s2 = e2;
            e2 = t2, t2 = s2;
          }
          for (r2 = 0; r2 < t2.length; r2 += 2)
            a2.push({ x: t2[r2], y: t2[r2 + 1] });
          for (r2 = 0; r2 < e2.length; r2 += 2)
            n2.push({ x: e2[r2], y: e2[r2 + 1] });
          var o2 = [];
          return n2.forEach(function(t3) {
            var e3 = g._getProjectionToLine(t3, a2, i2);
            o2.push(e3.x), o2.push(e3.y);
          }), o2;
        }, _prepareToStringify(t2) {
          var e2;
          for (var i2 in t2.visitedByCircularReferenceRemoval = true, t2)
            if (t2.hasOwnProperty(i2) && t2[i2] && typeof t2[i2] == "object") {
              if (e2 = Object.getOwnPropertyDescriptor(t2, i2), t2[i2].visitedByCircularReferenceRemoval || g._isElement(t2[i2])) {
                if (!e2.configurable)
                  return null;
                delete t2[i2];
              } else if (g._prepareToStringify(t2[i2]) === null) {
                if (!e2.configurable)
                  return null;
                delete t2[i2];
              }
            }
          return delete t2.visitedByCircularReferenceRemoval, t2;
        }, _assign(t2, e2) {
          for (var i2 in e2)
            t2[i2] = e2[i2];
          return t2;
        }, _getFirstPointerId: (t2) => t2.touches ? t2.changedTouches[0].identifier : t2.pointerId || 999 };
        function u(t2) {
          return g._isString(t2) ? '"' + t2 + '"' : Object.prototype.toString.call(t2) === "[object Number]" || g._isBoolean(t2) ? t2 : Object.prototype.toString.call(t2);
        }
        function f(t2) {
          return t2 > 255 ? 255 : t2 < 0 ? 0 : Math.round(t2);
        }
        function p() {
          if (i.isUnminified)
            return function(t2, e2) {
              return g._isNumber(t2) || g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a number.'), t2;
            };
        }
        function v(t2) {
          if (i.isUnminified)
            return function(e2, i2) {
              let r2 = g._isNumber(e2), a2 = g._isArray(e2) && e2.length == t2;
              return r2 || a2 || g.warn(u(e2) + ' is a not valid value for "' + i2 + '" attribute. The value should be a number or Array<number>(' + t2 + ")"), e2;
            };
        }
        function m() {
          if (i.isUnminified)
            return function(t2, e2) {
              return g._isNumber(t2) || t2 === "auto" || g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a number or "auto".'), t2;
            };
        }
        function _() {
          if (i.isUnminified)
            return function(t2, e2) {
              return g._isString(t2) || g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a string.'), t2;
            };
        }
        function y() {
          if (i.isUnminified)
            return function(t2, e2) {
              const i2 = g._isString(t2), r2 = Object.prototype.toString.call(t2) === "[object CanvasGradient]" || t2 && t2.addColorStop;
              return i2 || r2 || g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a string or a native gradient.'), t2;
            };
        }
        function x() {
          if (i.isUnminified)
            return function(t2, e2) {
              return t2 === true || t2 === false || g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a boolean.'), t2;
            };
        }
        var b = "get", S = "set";
        const w = { addGetterSetter(t2, e2, i2, r2, a2) {
          w.addGetter(t2, e2, i2), w.addSetter(t2, e2, r2, a2), w.addOverloadedGetterSetter(t2, e2);
        }, addGetter(t2, e2, i2) {
          var r2 = b + g._capitalize(e2);
          t2.prototype[r2] = t2.prototype[r2] || function() {
            var t3 = this.attrs[e2];
            return t3 === void 0 ? i2 : t3;
          };
        }, addSetter(t2, e2, i2, r2) {
          var a2 = S + g._capitalize(e2);
          t2.prototype[a2] || w.overWriteSetter(t2, e2, i2, r2);
        }, overWriteSetter(t2, e2, i2, r2) {
          var a2 = S + g._capitalize(e2);
          t2.prototype[a2] = function(t3) {
            return i2 && t3 != null && (t3 = i2.call(this, t3, e2)), this._setAttr(e2, t3), r2 && r2.call(this), this;
          };
        }, addComponentsGetterSetter(t2, e2, r2, a2, n2) {
          var s2, o2, h2 = r2.length, l2 = g._capitalize, d2 = b + l2(e2), c2 = S + l2(e2);
          t2.prototype[d2] = function() {
            var t3 = {};
            for (s2 = 0; s2 < h2; s2++)
              t3[o2 = r2[s2]] = this.getAttr(e2 + l2(o2));
            return t3;
          };
          var f2 = function(t3) {
            if (i.isUnminified)
              return function(e3, i2) {
                return g.isObject(e3) || g.warn(u(e3) + ' is a not valid value for "' + i2 + '" attribute. The value should be an object with properties ' + t3), e3;
              };
          }(r2);
          t2.prototype[c2] = function(t3) {
            var i2, r3 = this.attrs[e2];
            for (i2 in a2 && (t3 = a2.call(this, t3)), f2 && f2.call(this, t3, e2), t3)
              t3.hasOwnProperty(i2) && this._setAttr(e2 + l2(i2), t3[i2]);
            return this._fireChangeEvent(e2, r3, t3), n2 && n2.call(this), this;
          }, w.addOverloadedGetterSetter(t2, e2);
        }, addOverloadedGetterSetter(t2, e2) {
          var i2 = g._capitalize(e2), r2 = S + i2, a2 = b + i2;
          t2.prototype[e2] = function() {
            return arguments.length ? (this[r2](arguments[0]), this) : this[a2]();
          };
        }, addDeprecatedGetterSetter(t2, e2, i2, r2) {
          g.error("Adding deprecated " + e2);
          var a2 = b + g._capitalize(e2), n2 = e2 + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
          t2.prototype[a2] = function() {
            g.error(n2);
            var t3 = this.attrs[e2];
            return t3 === void 0 ? i2 : t3;
          }, w.addSetter(t2, e2, r2, function() {
            g.error(n2);
          }), w.addOverloadedGetterSetter(t2, e2);
        }, backCompat(t2, e2) {
          g.each(e2, function(e3, i2) {
            var r2 = t2.prototype[i2], a2 = b + g._capitalize(e3), n2 = S + g._capitalize(e3);
            function s2() {
              r2.apply(this, arguments), g.error('"' + e3 + '" method is deprecated and will be removed soon. Use ""' + i2 + '" instead.');
            }
            t2.prototype[e3] = s2, t2.prototype[a2] = s2, t2.prototype[n2] = s2;
          });
        }, afterSetFilter() {
          this._filterUpToDate = false;
        } };
        function C(t2) {
          var e2, i2, r2 = [], a2 = t2.length, n2 = g;
          for (e2 = 0; e2 < a2; e2++)
            i2 = t2[e2], n2._isNumber(i2) ? i2 = Math.round(1e3 * i2) / 1e3 : n2._isString(i2) || (i2 += ""), r2.push(i2);
          return r2;
        }
        var P = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createPattern", "createRadialGradient", "drawImage", "ellipse", "fill", "fillText", "getImageData", "createImageData", "lineTo", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setLineDash", "setTransform", "stroke", "strokeText", "transform", "translate"];
        class k {
          constructor(t2) {
            this.canvas = t2, this._context = t2._canvas.getContext("2d"), i.enableTrace && (this.traceArr = [], this._enableTrace());
          }
          fillShape(t2) {
            t2.fillEnabled() && this._fill(t2);
          }
          _fill(t2) {
          }
          strokeShape(t2) {
            t2.hasStroke() && this._stroke(t2);
          }
          _stroke(t2) {
          }
          fillStrokeShape(t2) {
            t2.attrs.fillAfterStrokeEnabled ? (this.strokeShape(t2), this.fillShape(t2)) : (this.fillShape(t2), this.strokeShape(t2));
          }
          getTrace(t2, e2) {
            var i2, r2, a2, n2, s2 = this.traceArr, o2 = s2.length, h2 = "";
            for (i2 = 0; i2 < o2; i2++)
              (a2 = (r2 = s2[i2]).method) ? (n2 = r2.args, h2 += a2, t2 ? h2 += "()" : g._isArray(n2[0]) ? h2 += "([" + n2.join(",") + "])" : (e2 && (n2 = n2.map((t3) => typeof t3 == "number" ? Math.floor(t3) : t3)), h2 += "(" + n2.join(",") + ")")) : (h2 += r2.property, t2 || (h2 += "=" + r2.val)), h2 += ";";
            return h2;
          }
          clearTrace() {
            this.traceArr = [];
          }
          _trace(t2) {
            var e2 = this.traceArr;
            e2.push(t2), e2.length >= 100 && e2.shift();
          }
          reset() {
            var t2 = this.getCanvas().getPixelRatio();
            this.setTransform(1 * t2, 0, 0, 1 * t2, 0, 0);
          }
          getCanvas() {
            return this.canvas;
          }
          clear(t2) {
            var e2 = this.getCanvas();
            t2 ? this.clearRect(t2.x || 0, t2.y || 0, t2.width || 0, t2.height || 0) : this.clearRect(0, 0, e2.getWidth() / e2.pixelRatio, e2.getHeight() / e2.pixelRatio);
          }
          _applyLineCap(t2) {
            var e2 = t2.getLineCap();
            e2 && this.setAttr("lineCap", e2);
          }
          _applyOpacity(t2) {
            var e2 = t2.getAbsoluteOpacity();
            e2 !== 1 && this.setAttr("globalAlpha", e2);
          }
          _applyLineJoin(t2) {
            var e2 = t2.attrs.lineJoin;
            e2 && this.setAttr("lineJoin", e2);
          }
          setAttr(t2, e2) {
            this._context[t2] = e2;
          }
          arc(t2, e2, i2, r2, a2, n2) {
            this._context.arc(t2, e2, i2, r2, a2, n2);
          }
          arcTo(t2, e2, i2, r2, a2) {
            this._context.arcTo(t2, e2, i2, r2, a2);
          }
          beginPath() {
            this._context.beginPath();
          }
          bezierCurveTo(t2, e2, i2, r2, a2, n2) {
            this._context.bezierCurveTo(t2, e2, i2, r2, a2, n2);
          }
          clearRect(t2, e2, i2, r2) {
            this._context.clearRect(t2, e2, i2, r2);
          }
          clip() {
            this._context.clip();
          }
          closePath() {
            this._context.closePath();
          }
          createImageData(t2, e2) {
            var i2 = arguments;
            return i2.length === 2 ? this._context.createImageData(t2, e2) : i2.length === 1 ? this._context.createImageData(t2) : void 0;
          }
          createLinearGradient(t2, e2, i2, r2) {
            return this._context.createLinearGradient(t2, e2, i2, r2);
          }
          createPattern(t2, e2) {
            return this._context.createPattern(t2, e2);
          }
          createRadialGradient(t2, e2, i2, r2, a2, n2) {
            return this._context.createRadialGradient(t2, e2, i2, r2, a2, n2);
          }
          drawImage(t2, e2, i2, r2, a2, n2, s2, o2, h2) {
            var l2 = arguments, d2 = this._context;
            l2.length === 3 ? d2.drawImage(t2, e2, i2) : l2.length === 5 ? d2.drawImage(t2, e2, i2, r2, a2) : l2.length === 9 && d2.drawImage(t2, e2, i2, r2, a2, n2, s2, o2, h2);
          }
          ellipse(t2, e2, i2, r2, a2, n2, s2, o2) {
            this._context.ellipse(t2, e2, i2, r2, a2, n2, s2, o2);
          }
          isPointInPath(t2, e2) {
            return this._context.isPointInPath(t2, e2);
          }
          fill(t2) {
            t2 ? this._context.fill(t2) : this._context.fill();
          }
          fillRect(t2, e2, i2, r2) {
            this._context.fillRect(t2, e2, i2, r2);
          }
          strokeRect(t2, e2, i2, r2) {
            this._context.strokeRect(t2, e2, i2, r2);
          }
          fillText(t2, e2, i2, r2) {
            r2 ? this._context.fillText(t2, e2, i2, r2) : this._context.fillText(t2, e2, i2);
          }
          measureText(t2) {
            return this._context.measureText(t2);
          }
          getImageData(t2, e2, i2, r2) {
            return this._context.getImageData(t2, e2, i2, r2);
          }
          lineTo(t2, e2) {
            this._context.lineTo(t2, e2);
          }
          moveTo(t2, e2) {
            this._context.moveTo(t2, e2);
          }
          rect(t2, e2, i2, r2) {
            this._context.rect(t2, e2, i2, r2);
          }
          putImageData(t2, e2, i2) {
            this._context.putImageData(t2, e2, i2);
          }
          quadraticCurveTo(t2, e2, i2, r2) {
            this._context.quadraticCurveTo(t2, e2, i2, r2);
          }
          restore() {
            this._context.restore();
          }
          rotate(t2) {
            this._context.rotate(t2);
          }
          save() {
            this._context.save();
          }
          scale(t2, e2) {
            this._context.scale(t2, e2);
          }
          setLineDash(t2) {
            this._context.setLineDash ? this._context.setLineDash(t2) : "mozDash" in this._context ? this._context.mozDash = t2 : "webkitLineDash" in this._context && (this._context.webkitLineDash = t2);
          }
          getLineDash() {
            return this._context.getLineDash();
          }
          setTransform(t2, e2, i2, r2, a2, n2) {
            this._context.setTransform(t2, e2, i2, r2, a2, n2);
          }
          stroke(t2) {
            t2 ? this._context.stroke(t2) : this._context.stroke();
          }
          strokeText(t2, e2, i2, r2) {
            this._context.strokeText(t2, e2, i2, r2);
          }
          transform(t2, e2, i2, r2, a2, n2) {
            this._context.transform(t2, e2, i2, r2, a2, n2);
          }
          translate(t2, e2) {
            this._context.translate(t2, e2);
          }
          _enableTrace() {
            var t2, e2, i2 = this, r2 = P.length, a2 = this.setAttr, n2 = function(t3) {
              var r3, a3 = i2[t3];
              i2[t3] = function() {
                return e2 = C(Array.prototype.slice.call(arguments, 0)), r3 = a3.apply(i2, arguments), i2._trace({ method: t3, args: e2 }), r3;
              };
            };
            for (t2 = 0; t2 < r2; t2++)
              n2(P[t2]);
            i2.setAttr = function() {
              a2.apply(i2, arguments);
              var t3 = arguments[0], e3 = arguments[1];
              t3 !== "shadowOffsetX" && t3 !== "shadowOffsetY" && t3 !== "shadowBlur" || (e3 /= this.canvas.getPixelRatio()), i2._trace({ property: t3, val: e3 });
            };
          }
          _applyGlobalCompositeOperation(t2) {
            const e2 = t2.attrs.globalCompositeOperation;
            !e2 || e2 === "source-over" || this.setAttr("globalCompositeOperation", e2);
          }
        }
        ["fillStyle", "strokeStyle", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "lineCap", "lineDashOffset", "lineJoin", "lineWidth", "miterLimit", "font", "textAlign", "textBaseline", "globalAlpha", "globalCompositeOperation", "imageSmoothingEnabled"].forEach(function(t2) {
          Object.defineProperty(k.prototype, t2, { get() {
            return this._context[t2];
          }, set(e2) {
            this._context[t2] = e2;
          } });
        });
        class T extends k {
          _fillColor(t2) {
            var e2 = t2.fill();
            this.setAttr("fillStyle", e2), t2._fillFunc(this);
          }
          _fillPattern(t2) {
            this.setAttr("fillStyle", t2._getFillPattern()), t2._fillFunc(this);
          }
          _fillLinearGradient(t2) {
            var e2 = t2._getLinearGradient();
            e2 && (this.setAttr("fillStyle", e2), t2._fillFunc(this));
          }
          _fillRadialGradient(t2) {
            var e2 = t2._getRadialGradient();
            e2 && (this.setAttr("fillStyle", e2), t2._fillFunc(this));
          }
          _fill(t2) {
            var e2 = t2.fill(), i2 = t2.getFillPriority();
            if (e2 && i2 === "color")
              this._fillColor(t2);
            else {
              var r2 = t2.getFillPatternImage();
              if (r2 && i2 === "pattern")
                this._fillPattern(t2);
              else {
                var a2 = t2.getFillLinearGradientColorStops();
                if (a2 && i2 === "linear-gradient")
                  this._fillLinearGradient(t2);
                else {
                  var n2 = t2.getFillRadialGradientColorStops();
                  n2 && i2 === "radial-gradient" ? this._fillRadialGradient(t2) : e2 ? this._fillColor(t2) : r2 ? this._fillPattern(t2) : a2 ? this._fillLinearGradient(t2) : n2 && this._fillRadialGradient(t2);
                }
              }
            }
          }
          _strokeLinearGradient(t2) {
            var e2 = t2.getStrokeLinearGradientStartPoint(), i2 = t2.getStrokeLinearGradientEndPoint(), r2 = t2.getStrokeLinearGradientColorStops(), a2 = this.createLinearGradient(e2.x, e2.y, i2.x, i2.y);
            if (r2) {
              for (var n2 = 0; n2 < r2.length; n2 += 2)
                a2.addColorStop(r2[n2], r2[n2 + 1]);
              this.setAttr("strokeStyle", a2);
            }
          }
          _stroke(t2) {
            var e2 = t2.dash(), i2 = t2.getStrokeScaleEnabled();
            if (t2.hasStroke()) {
              if (!i2) {
                this.save();
                var r2 = this.getCanvas().getPixelRatio();
                this.setTransform(r2, 0, 0, r2, 0, 0);
              }
              this._applyLineCap(t2), e2 && t2.dashEnabled() && (this.setLineDash(e2), this.setAttr("lineDashOffset", t2.dashOffset())), this.setAttr("lineWidth", t2.strokeWidth()), t2.getShadowForStrokeEnabled() || this.setAttr("shadowColor", "rgba(0,0,0,0)"), t2.getStrokeLinearGradientColorStops() ? this._strokeLinearGradient(t2) : this.setAttr("strokeStyle", t2.stroke()), t2._strokeFunc(this), i2 || this.restore();
            }
          }
          _applyShadow(t2) {
            var e2, i2, r2, a2 = (e2 = t2.getShadowRGBA()) !== null && e2 !== void 0 ? e2 : "black", n2 = (i2 = t2.getShadowBlur()) !== null && i2 !== void 0 ? i2 : 5, s2 = (r2 = t2.getShadowOffset()) !== null && r2 !== void 0 ? r2 : { x: 0, y: 0 }, o2 = t2.getAbsoluteScale(), h2 = this.canvas.getPixelRatio(), l2 = o2.x * h2, d2 = o2.y * h2;
            this.setAttr("shadowColor", a2), this.setAttr("shadowBlur", n2 * Math.min(Math.abs(l2), Math.abs(d2))), this.setAttr("shadowOffsetX", s2.x * l2), this.setAttr("shadowOffsetY", s2.y * d2);
          }
        }
        class A extends k {
          _fill(t2) {
            this.save(), this.setAttr("fillStyle", t2.colorKey), t2._fillFuncHit(this), this.restore();
          }
          strokeShape(t2) {
            t2.hasHitStroke() && this._stroke(t2);
          }
          _stroke(t2) {
            if (t2.hasHitStroke()) {
              var e2 = t2.getStrokeScaleEnabled();
              if (!e2) {
                this.save();
                var i2 = this.getCanvas().getPixelRatio();
                this.setTransform(i2, 0, 0, i2, 0, 0);
              }
              this._applyLineCap(t2);
              var r2 = t2.hitStrokeWidth(), a2 = r2 === "auto" ? t2.strokeWidth() : r2;
              this.setAttr("lineWidth", a2), this.setAttr("strokeStyle", t2.colorKey), t2._strokeFuncHit(this), e2 || this.restore();
            }
          }
        }
        var M;
        class G {
          constructor(t2) {
            this.pixelRatio = 1, this.width = 0, this.height = 0, this.isCache = false;
            var e2 = (t2 || {}).pixelRatio || i.pixelRatio || function() {
              if (M)
                return M;
              var t3 = g.createCanvasElement().getContext("2d");
              return M = (i._global.devicePixelRatio || 1) / (t3.webkitBackingStorePixelRatio || t3.mozBackingStorePixelRatio || t3.msBackingStorePixelRatio || t3.oBackingStorePixelRatio || t3.backingStorePixelRatio || 1);
            }();
            this.pixelRatio = e2, this._canvas = g.createCanvasElement(), this._canvas.style.padding = "0", this._canvas.style.margin = "0", this._canvas.style.border = "0", this._canvas.style.background = "transparent", this._canvas.style.position = "absolute", this._canvas.style.top = "0", this._canvas.style.left = "0";
          }
          getContext() {
            return this.context;
          }
          getPixelRatio() {
            return this.pixelRatio;
          }
          setPixelRatio(t2) {
            var e2 = this.pixelRatio;
            this.pixelRatio = t2, this.setSize(this.getWidth() / e2, this.getHeight() / e2);
          }
          setWidth(t2) {
            this.width = this._canvas.width = t2 * this.pixelRatio, this._canvas.style.width = t2 + "px";
            var e2 = this.pixelRatio;
            this.getContext()._context.scale(e2, e2);
          }
          setHeight(t2) {
            this.height = this._canvas.height = t2 * this.pixelRatio, this._canvas.style.height = t2 + "px";
            var e2 = this.pixelRatio;
            this.getContext()._context.scale(e2, e2);
          }
          getWidth() {
            return this.width;
          }
          getHeight() {
            return this.height;
          }
          setSize(t2, e2) {
            this.setWidth(t2 || 0), this.setHeight(e2 || 0);
          }
          toDataURL(t2, e2) {
            try {
              return this._canvas.toDataURL(t2, e2);
            } catch (t3) {
              try {
                return this._canvas.toDataURL();
              } catch (t4) {
                return g.error("Unable to get data URL. " + t4.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."), "";
              }
            }
          }
        }
        w.addGetterSetter(G, "pixelRatio", void 0, p());
        class E extends G {
          constructor(t2 = { width: 0, height: 0 }) {
            super(t2), this.context = new T(this), this.setSize(t2.width, t2.height);
          }
        }
        class R extends G {
          constructor(t2 = { width: 0, height: 0 }) {
            super(t2), this.hitCanvas = true, this.context = new A(this), this.setSize(t2.width, t2.height);
          }
        }
        const L = { get isDragging() {
          var t2 = false;
          return L._dragElements.forEach((e2) => {
            e2.dragStatus === "dragging" && (t2 = true);
          }), t2;
        }, justDragged: false, get node() {
          var t2;
          return L._dragElements.forEach((e2) => {
            t2 = e2.node;
          }), t2;
        }, _dragElements: new Map(), _drag(t2) {
          const e2 = [];
          L._dragElements.forEach((i2, r2) => {
            const { node: a2 } = i2, n2 = a2.getStage();
            n2.setPointersPositions(t2), i2.pointerId === void 0 && (i2.pointerId = g._getFirstPointerId(t2));
            const s2 = n2._changedPointerPositions.find((t3) => t3.id === i2.pointerId);
            if (s2) {
              if (i2.dragStatus !== "dragging") {
                var o2 = a2.dragDistance();
                if (Math.max(Math.abs(s2.x - i2.startPointerPos.x), Math.abs(s2.y - i2.startPointerPos.y)) < o2)
                  return;
                if (a2.startDrag({ evt: t2 }), !a2.isDragging())
                  return;
              }
              a2._setDragPosition(t2, i2), e2.push(a2);
            }
          }), e2.forEach((e3) => {
            e3.fire("dragmove", { type: "dragmove", target: e3, evt: t2 }, true);
          });
        }, _endDragBefore(t2) {
          L._dragElements.forEach((e2) => {
            const { node: r2 } = e2, a2 = r2.getStage();
            t2 && a2.setPointersPositions(t2);
            if (!a2._changedPointerPositions.find((t3) => t3.id === e2.pointerId))
              return;
            e2.dragStatus !== "dragging" && e2.dragStatus !== "stopped" || (L.justDragged = true, i._mouseListenClick = false, i._touchListenClick = false, i._pointerListenClick = false, e2.dragStatus = "stopped");
            const n2 = e2.node.getLayer() || e2.node instanceof i.Stage && e2.node;
            n2 && n2.batchDraw();
          });
        }, _endDragAfter(t2) {
          L._dragElements.forEach((e2, i2) => {
            e2.dragStatus === "stopped" && e2.node.fire("dragend", { type: "dragend", target: e2.node, evt: t2 }, true), e2.dragStatus !== "dragging" && L._dragElements.delete(i2);
          });
        } };
        i.isBrowser && (window.addEventListener("mouseup", L._endDragBefore, true), window.addEventListener("touchend", L._endDragBefore, true), window.addEventListener("mousemove", L._drag), window.addEventListener("touchmove", L._drag), window.addEventListener("mouseup", L._endDragAfter, false), window.addEventListener("touchend", L._endDragAfter, false));
        var D = "absoluteOpacity", O = "allEventListeners", I = "absoluteTransform", F = "absoluteScale", N = "canvas", B = "listening", z = "mouseenter", W = "mouseleave", H = "Shape", Y = " ", X = "stage", j = "transform", U = "visible", q = ["xChange.konva", "yChange.konva", "scaleXChange.konva", "scaleYChange.konva", "skewXChange.konva", "skewYChange.konva", "rotationChange.konva", "offsetXChange.konva", "offsetYChange.konva", "transformsEnabledChange.konva"].join(Y);
        let V = 1;
        class K {
          constructor(t2) {
            this._id = V++, this.eventListeners = {}, this.attrs = {}, this.index = 0, this._allEventListeners = null, this.parent = null, this._cache = new Map(), this._attachedDepsListeners = new Map(), this._lastPos = null, this._batchingTransformChange = false, this._needClearTransformCache = false, this._filterUpToDate = false, this._isUnderCache = false, this._dragEventId = null, this._shouldFireChangeEvents = false, this.setAttrs(t2), this._shouldFireChangeEvents = true;
          }
          hasChildren() {
            return false;
          }
          _clearCache(t2) {
            t2 !== j && t2 !== I || !this._cache.get(t2) ? t2 ? this._cache.delete(t2) : this._cache.clear() : this._cache.get(t2).dirty = true;
          }
          _getCache(t2, e2) {
            var i2 = this._cache.get(t2);
            return (i2 === void 0 || (t2 === j || t2 === I) && i2.dirty === true) && (i2 = e2.call(this), this._cache.set(t2, i2)), i2;
          }
          _calculate(t2, e2, i2) {
            if (!this._attachedDepsListeners.get(t2)) {
              const i3 = e2.map((t3) => t3 + "Change.konva").join(Y);
              this.on(i3, () => {
                this._clearCache(t2);
              }), this._attachedDepsListeners.set(t2, true);
            }
            return this._getCache(t2, i2);
          }
          _getCanvasCache() {
            return this._cache.get(N);
          }
          _clearSelfAndDescendantCache(t2) {
            this._clearCache(t2), t2 === I && this.fire("absoluteTransformChange");
          }
          clearCache() {
            return this._cache.delete(N), this._clearSelfAndDescendantCache(), this._requestDraw(), this;
          }
          cache(t2) {
            var e2 = t2 || {}, i2 = {};
            e2.x !== void 0 && e2.y !== void 0 && e2.width !== void 0 && e2.height !== void 0 || (i2 = this.getClientRect({ skipTransform: true, relativeTo: this.getParent() }));
            var r2 = Math.ceil(e2.width || i2.width), a2 = Math.ceil(e2.height || i2.height), n2 = e2.pixelRatio, s2 = e2.x === void 0 ? Math.floor(i2.x) : e2.x, o2 = e2.y === void 0 ? Math.floor(i2.y) : e2.y, h2 = e2.offset || 0, l2 = e2.drawBorder || false, d2 = e2.hitCanvasPixelRatio || 1;
            if (r2 && a2) {
              s2 -= h2, o2 -= h2;
              var c2 = new E({ pixelRatio: n2, width: r2 += 2 * h2 + 1, height: a2 += 2 * h2 + 1 }), u2 = new E({ pixelRatio: n2, width: 0, height: 0 }), f2 = new R({ pixelRatio: d2, width: r2, height: a2 }), p2 = c2.getContext(), v2 = f2.getContext();
              return f2.isCache = true, c2.isCache = true, this._cache.delete(N), this._filterUpToDate = false, e2.imageSmoothingEnabled === false && (c2.getContext()._context.imageSmoothingEnabled = false, u2.getContext()._context.imageSmoothingEnabled = false), p2.save(), v2.save(), p2.translate(-s2, -o2), v2.translate(-s2, -o2), this._isUnderCache = true, this._clearSelfAndDescendantCache(D), this._clearSelfAndDescendantCache(F), this.drawScene(c2, this), this.drawHit(f2, this), this._isUnderCache = false, p2.restore(), v2.restore(), l2 && (p2.save(), p2.beginPath(), p2.rect(0, 0, r2, a2), p2.closePath(), p2.setAttr("strokeStyle", "red"), p2.setAttr("lineWidth", 5), p2.stroke(), p2.restore()), this._cache.set(N, { scene: c2, filter: u2, hit: f2, x: s2, y: o2 }), this._requestDraw(), this;
            }
            g.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
          }
          isCached() {
            return this._cache.has(N);
          }
          getClientRect(t2) {
            throw new Error('abstract "getClientRect" method call');
          }
          _transformedRect(t2, e2) {
            var i2, r2, a2, n2, s2 = [{ x: t2.x, y: t2.y }, { x: t2.x + t2.width, y: t2.y }, { x: t2.x + t2.width, y: t2.y + t2.height }, { x: t2.x, y: t2.y + t2.height }], o2 = this.getAbsoluteTransform(e2);
            return s2.forEach(function(t3) {
              var e3 = o2.point(t3);
              i2 === void 0 && (i2 = a2 = e3.x, r2 = n2 = e3.y), i2 = Math.min(i2, e3.x), r2 = Math.min(r2, e3.y), a2 = Math.max(a2, e3.x), n2 = Math.max(n2, e3.y);
            }), { x: i2, y: r2, width: a2 - i2, height: n2 - r2 };
          }
          _drawCachedSceneCanvas(t2) {
            t2.save(), t2._applyOpacity(this), t2._applyGlobalCompositeOperation(this);
            const e2 = this._getCanvasCache();
            t2.translate(e2.x, e2.y);
            var i2 = this._getCachedSceneCanvas(), r2 = i2.pixelRatio;
            t2.drawImage(i2._canvas, 0, 0, i2.width / r2, i2.height / r2), t2.restore();
          }
          _drawCachedHitCanvas(t2) {
            var e2 = this._getCanvasCache(), i2 = e2.hit;
            t2.save(), t2.translate(e2.x, e2.y), t2.drawImage(i2._canvas, 0, 0, i2.width / i2.pixelRatio, i2.height / i2.pixelRatio), t2.restore();
          }
          _getCachedSceneCanvas() {
            var t2, e2, i2, r2, a2 = this.filters(), n2 = this._getCanvasCache(), s2 = n2.scene, o2 = n2.filter, h2 = o2.getContext();
            if (a2) {
              if (!this._filterUpToDate) {
                var l2 = s2.pixelRatio;
                o2.setSize(s2.width / s2.pixelRatio, s2.height / s2.pixelRatio);
                try {
                  for (t2 = a2.length, h2.clear(), h2.drawImage(s2._canvas, 0, 0, s2.getWidth() / l2, s2.getHeight() / l2), e2 = h2.getImageData(0, 0, o2.getWidth(), o2.getHeight()), i2 = 0; i2 < t2; i2++)
                    typeof (r2 = a2[i2]) == "function" ? (r2.call(this, e2), h2.putImageData(e2, 0, 0)) : g.error("Filter should be type of function, but got " + typeof r2 + " instead. Please check correct filters");
                } catch (t3) {
                  g.error("Unable to apply filter. " + t3.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
                }
                this._filterUpToDate = true;
              }
              return o2;
            }
            return s2;
          }
          on(t2, e2) {
            if (this._cache && this._cache.delete(O), arguments.length === 3)
              return this._delegate.apply(this, arguments);
            var i2, r2, a2, n2, s2 = t2.split(Y), o2 = s2.length;
            for (i2 = 0; i2 < o2; i2++)
              a2 = (r2 = s2[i2].split("."))[0], n2 = r2[1] || "", this.eventListeners[a2] || (this.eventListeners[a2] = []), this.eventListeners[a2].push({ name: n2, handler: e2 });
            return this;
          }
          off(t2, e2) {
            var i2, r2, a2, n2, s2, o2 = (t2 || "").split(Y), h2 = o2.length;
            if (this._cache && this._cache.delete(O), !t2)
              for (r2 in this.eventListeners)
                this._off(r2);
            for (i2 = 0; i2 < h2; i2++)
              if (n2 = (a2 = o2[i2].split("."))[0], s2 = a2[1], n2)
                this.eventListeners[n2] && this._off(n2, s2, e2);
              else
                for (r2 in this.eventListeners)
                  this._off(r2, s2, e2);
            return this;
          }
          dispatchEvent(t2) {
            var e2 = { target: this, type: t2.type, evt: t2 };
            return this.fire(t2.type, e2), this;
          }
          addEventListener(t2, e2) {
            return this.on(t2, function(t3) {
              e2.call(this, t3.evt);
            }), this;
          }
          removeEventListener(t2) {
            return this.off(t2), this;
          }
          _delegate(t2, e2, i2) {
            var r2 = this;
            this.on(t2, function(t3) {
              for (var a2 = t3.target.findAncestors(e2, true, r2), n2 = 0; n2 < a2.length; n2++)
                (t3 = g.cloneObject(t3)).currentTarget = a2[n2], i2.call(a2[n2], t3);
            });
          }
          remove() {
            return this.isDragging() && this.stopDrag(), L._dragElements.delete(this._id), this._remove(), this;
          }
          _clearCaches() {
            this._clearSelfAndDescendantCache(I), this._clearSelfAndDescendantCache(D), this._clearSelfAndDescendantCache(F), this._clearSelfAndDescendantCache(X), this._clearSelfAndDescendantCache(U), this._clearSelfAndDescendantCache(B);
          }
          _remove() {
            this._clearCaches();
            var t2 = this.getParent();
            t2 && t2.children && (t2.children.splice(this.index, 1), t2._setChildrenIndices(), this.parent = null);
          }
          destroy() {
            return this.remove(), this;
          }
          getAttr(t2) {
            var e2 = "get" + g._capitalize(t2);
            return g._isFunction(this[e2]) ? this[e2]() : this.attrs[t2];
          }
          getAncestors() {
            for (var t2 = this.getParent(), e2 = []; t2; )
              e2.push(t2), t2 = t2.getParent();
            return e2;
          }
          getAttrs() {
            return this.attrs || {};
          }
          setAttrs(t2) {
            return this._batchTransformChanges(() => {
              var e2, i2;
              if (!t2)
                return this;
              for (e2 in t2)
                e2 !== "children" && (i2 = "set" + g._capitalize(e2), g._isFunction(this[i2]) ? this[i2](t2[e2]) : this._setAttr(e2, t2[e2]));
            }), this;
          }
          isListening() {
            return this._getCache(B, this._isListening);
          }
          _isListening(t2) {
            if (!this.listening())
              return false;
            const e2 = this.getParent();
            return !e2 || e2 === t2 || this === t2 || e2._isListening(t2);
          }
          isVisible() {
            return this._getCache(U, this._isVisible);
          }
          _isVisible(t2) {
            if (!this.visible())
              return false;
            const e2 = this.getParent();
            return !e2 || e2 === t2 || this === t2 || e2._isVisible(t2);
          }
          shouldDrawHit(t2, e2 = false) {
            if (t2)
              return this._isVisible(t2) && this._isListening(t2);
            var r2 = this.getLayer(), a2 = false;
            L._dragElements.forEach((t3) => {
              t3.dragStatus === "dragging" && (t3.node.nodeType === "Stage" || t3.node.getLayer() === r2) && (a2 = true);
            });
            var n2 = !e2 && !i.hitOnDragEnabled && a2;
            return this.isListening() && this.isVisible() && !n2;
          }
          show() {
            return this.visible(true), this;
          }
          hide() {
            return this.visible(false), this;
          }
          getZIndex() {
            return this.index || 0;
          }
          getAbsoluteZIndex() {
            var t2, e2, i2, r2, a2 = this.getDepth(), n2 = this, s2 = 0;
            return n2.nodeType !== "Stage" && function o2(h2) {
              for (t2 = [], e2 = h2.length, i2 = 0; i2 < e2; i2++)
                r2 = h2[i2], s2++, r2.nodeType !== H && (t2 = t2.concat(r2.getChildren().slice())), r2._id === n2._id && (i2 = e2);
              t2.length > 0 && t2[0].getDepth() <= a2 && o2(t2);
            }(n2.getStage().getChildren()), s2;
          }
          getDepth() {
            for (var t2 = 0, e2 = this.parent; e2; )
              t2++, e2 = e2.parent;
            return t2;
          }
          _batchTransformChanges(t2) {
            this._batchingTransformChange = true, t2(), this._batchingTransformChange = false, this._needClearTransformCache && (this._clearCache(j), this._clearSelfAndDescendantCache(I)), this._needClearTransformCache = false;
          }
          setPosition(t2) {
            return this._batchTransformChanges(() => {
              this.x(t2.x), this.y(t2.y);
            }), this;
          }
          getPosition() {
            return { x: this.x(), y: this.y() };
          }
          getRelativePointerPosition() {
            if (!this.getStage())
              return null;
            var t2 = this.getStage().getPointerPosition();
            if (!t2)
              return null;
            var e2 = this.getAbsoluteTransform().copy();
            return e2.invert(), e2.point(t2);
          }
          getAbsolutePosition(t2) {
            let e2 = false, i2 = this.parent;
            for (; i2; ) {
              if (i2.isCached()) {
                e2 = true;
                break;
              }
              i2 = i2.parent;
            }
            e2 && !t2 && (t2 = true);
            var r2 = this.getAbsoluteTransform(t2).getMatrix(), n2 = new a(), s2 = this.offset();
            return n2.m = r2.slice(), n2.translate(s2.x, s2.y), n2.getTranslation();
          }
          setAbsolutePosition(t2) {
            var e2 = this._clearTransform();
            this.attrs.x = e2.x, this.attrs.y = e2.y, delete e2.x, delete e2.y, this._clearCache(j);
            var i2 = this._getAbsoluteTransform().copy();
            return i2.invert(), i2.translate(t2.x, t2.y), t2 = { x: this.attrs.x + i2.getTranslation().x, y: this.attrs.y + i2.getTranslation().y }, this._setTransform(e2), this.setPosition({ x: t2.x, y: t2.y }), this._clearCache(j), this._clearSelfAndDescendantCache(I), this;
          }
          _setTransform(t2) {
            var e2;
            for (e2 in t2)
              this.attrs[e2] = t2[e2];
          }
          _clearTransform() {
            var t2 = { x: this.x(), y: this.y(), rotation: this.rotation(), scaleX: this.scaleX(), scaleY: this.scaleY(), offsetX: this.offsetX(), offsetY: this.offsetY(), skewX: this.skewX(), skewY: this.skewY() };
            return this.attrs.x = 0, this.attrs.y = 0, this.attrs.rotation = 0, this.attrs.scaleX = 1, this.attrs.scaleY = 1, this.attrs.offsetX = 0, this.attrs.offsetY = 0, this.attrs.skewX = 0, this.attrs.skewY = 0, t2;
          }
          move(t2) {
            var e2 = t2.x, i2 = t2.y, r2 = this.x(), a2 = this.y();
            return e2 !== void 0 && (r2 += e2), i2 !== void 0 && (a2 += i2), this.setPosition({ x: r2, y: a2 }), this;
          }
          _eachAncestorReverse(t2, e2) {
            var i2, r2, a2 = [], n2 = this.getParent();
            if (!e2 || e2._id !== this._id) {
              for (a2.unshift(this); n2 && (!e2 || n2._id !== e2._id); )
                a2.unshift(n2), n2 = n2.parent;
              for (i2 = a2.length, r2 = 0; r2 < i2; r2++)
                t2(a2[r2]);
            }
          }
          rotate(t2) {
            return this.rotation(this.rotation() + t2), this;
          }
          moveToTop() {
            if (!this.parent)
              return g.warn("Node has no parent. moveToTop function is ignored."), false;
            var t2 = this.index;
            return t2 < this.parent.getChildren().length - 1 && (this.parent.children.splice(t2, 1), this.parent.children.push(this), this.parent._setChildrenIndices(), true);
          }
          moveUp() {
            if (!this.parent)
              return g.warn("Node has no parent. moveUp function is ignored."), false;
            var t2 = this.index;
            return t2 < this.parent.getChildren().length - 1 && (this.parent.children.splice(t2, 1), this.parent.children.splice(t2 + 1, 0, this), this.parent._setChildrenIndices(), true);
          }
          moveDown() {
            if (!this.parent)
              return g.warn("Node has no parent. moveDown function is ignored."), false;
            var t2 = this.index;
            return t2 > 0 && (this.parent.children.splice(t2, 1), this.parent.children.splice(t2 - 1, 0, this), this.parent._setChildrenIndices(), true);
          }
          moveToBottom() {
            if (!this.parent)
              return g.warn("Node has no parent. moveToBottom function is ignored."), false;
            var t2 = this.index;
            return t2 > 0 && (this.parent.children.splice(t2, 1), this.parent.children.unshift(this), this.parent._setChildrenIndices(), true);
          }
          setZIndex(t2) {
            if (!this.parent)
              return g.warn("Node has no parent. zIndex parameter is ignored."), this;
            (t2 < 0 || t2 >= this.parent.children.length) && g.warn("Unexpected value " + t2 + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
            var e2 = this.index;
            return this.parent.children.splice(e2, 1), this.parent.children.splice(t2, 0, this), this.parent._setChildrenIndices(), this;
          }
          getAbsoluteOpacity() {
            return this._getCache(D, this._getAbsoluteOpacity);
          }
          _getAbsoluteOpacity() {
            var t2 = this.opacity(), e2 = this.getParent();
            return e2 && !e2._isUnderCache && (t2 *= e2.getAbsoluteOpacity()), t2;
          }
          moveTo(t2) {
            return this.getParent() !== t2 && (this._remove(), t2.add(this)), this;
          }
          toObject() {
            var t2, e2, i2, r2, a2 = {}, n2 = this.getAttrs();
            for (t2 in a2.attrs = {}, n2)
              e2 = n2[t2], g.isObject(e2) && !g._isPlainObject(e2) && !g._isArray(e2) || (i2 = typeof this[t2] == "function" && this[t2], delete n2[t2], r2 = i2 ? i2.call(this) : null, n2[t2] = e2, r2 !== e2 && (a2.attrs[t2] = e2));
            return a2.className = this.getClassName(), g._prepareToStringify(a2);
          }
          toJSON() {
            return JSON.stringify(this.toObject());
          }
          getParent() {
            return this.parent;
          }
          findAncestors(t2, e2, i2) {
            var r2 = [];
            e2 && this._isMatch(t2) && r2.push(this);
            for (var a2 = this.parent; a2; ) {
              if (a2 === i2)
                return r2;
              a2._isMatch(t2) && r2.push(a2), a2 = a2.parent;
            }
            return r2;
          }
          isAncestorOf(t2) {
            return false;
          }
          findAncestor(t2, e2, i2) {
            return this.findAncestors(t2, e2, i2)[0];
          }
          _isMatch(t2) {
            if (!t2)
              return false;
            if (typeof t2 == "function")
              return t2(this);
            var e2, i2, r2 = t2.replace(/ /g, "").split(","), a2 = r2.length;
            for (e2 = 0; e2 < a2; e2++)
              if (i2 = r2[e2], g.isValidSelector(i2) || (g.warn('Selector "' + i2 + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'), g.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'), g.warn("Konva is awesome, right?")), i2.charAt(0) === "#") {
                if (this.id() === i2.slice(1))
                  return true;
              } else if (i2.charAt(0) === ".") {
                if (this.hasName(i2.slice(1)))
                  return true;
              } else if (this.className === i2 || this.nodeType === i2)
                return true;
            return false;
          }
          getLayer() {
            var t2 = this.getParent();
            return t2 ? t2.getLayer() : null;
          }
          getStage() {
            return this._getCache(X, this._getStage);
          }
          _getStage() {
            var t2 = this.getParent();
            return t2 ? t2.getStage() : void 0;
          }
          fire(t2, e2 = {}, i2) {
            return e2.target = e2.target || this, i2 ? this._fireAndBubble(t2, e2) : this._fire(t2, e2), this;
          }
          getAbsoluteTransform(t2) {
            return t2 ? this._getAbsoluteTransform(t2) : this._getCache(I, this._getAbsoluteTransform);
          }
          _getAbsoluteTransform(t2) {
            var e2;
            if (t2)
              return e2 = new a(), this._eachAncestorReverse(function(t3) {
                var i3 = t3.transformsEnabled();
                i3 === "all" ? e2.multiply(t3.getTransform()) : i3 === "position" && e2.translate(t3.x() - t3.offsetX(), t3.y() - t3.offsetY());
              }, t2), e2;
            e2 = this._cache.get(I) || new a(), this.parent ? this.parent.getAbsoluteTransform().copyInto(e2) : e2.reset();
            var i2 = this.transformsEnabled();
            if (i2 === "all")
              e2.multiply(this.getTransform());
            else if (i2 === "position") {
              const t3 = this.attrs.x || 0, i3 = this.attrs.y || 0, r2 = this.attrs.offsetX || 0, a2 = this.attrs.offsetY || 0;
              e2.translate(t3 - r2, i3 - a2);
            }
            return e2.dirty = false, e2;
          }
          getAbsoluteScale(t2) {
            for (var e2 = this; e2; )
              e2._isUnderCache && (t2 = e2), e2 = e2.getParent();
            const i2 = this.getAbsoluteTransform(t2).decompose();
            return { x: i2.scaleX, y: i2.scaleY };
          }
          getAbsoluteRotation() {
            return this.getAbsoluteTransform().decompose().rotation;
          }
          getTransform() {
            return this._getCache(j, this._getTransform);
          }
          _getTransform() {
            var t2, e2, r2 = this._cache.get(j) || new a();
            r2.reset();
            var n2 = this.x(), s2 = this.y(), o2 = i.getAngle(this.rotation()), h2 = (t2 = this.attrs.scaleX) !== null && t2 !== void 0 ? t2 : 1, l2 = (e2 = this.attrs.scaleY) !== null && e2 !== void 0 ? e2 : 1, d2 = this.attrs.skewX || 0, c2 = this.attrs.skewY || 0, g2 = this.attrs.offsetX || 0, u2 = this.attrs.offsetY || 0;
            return n2 === 0 && s2 === 0 || r2.translate(n2, s2), o2 !== 0 && r2.rotate(o2), d2 === 0 && c2 === 0 || r2.skew(d2, c2), h2 === 1 && l2 === 1 || r2.scale(h2, l2), g2 === 0 && u2 === 0 || r2.translate(-1 * g2, -1 * u2), r2.dirty = false, r2;
          }
          clone(t2) {
            var e2, i2, r2, a2, n2, s2 = g.cloneObject(this.attrs);
            for (e2 in t2)
              s2[e2] = t2[e2];
            var o2 = new this.constructor(s2);
            for (e2 in this.eventListeners)
              for (r2 = (i2 = this.eventListeners[e2]).length, a2 = 0; a2 < r2; a2++)
                (n2 = i2[a2]).name.indexOf("konva") < 0 && (o2.eventListeners[e2] || (o2.eventListeners[e2] = []), o2.eventListeners[e2].push(n2));
            return o2;
          }
          _toKonvaCanvas(t2) {
            t2 = t2 || {};
            var e2 = this.getClientRect(), i2 = this.getStage(), r2 = t2.x !== void 0 ? t2.x : Math.floor(e2.x), a2 = t2.y !== void 0 ? t2.y : Math.floor(e2.y), n2 = t2.pixelRatio || 1, s2 = new E({ width: t2.width || Math.ceil(e2.width) || (i2 ? i2.width() : 0), height: t2.height || Math.ceil(e2.height) || (i2 ? i2.height() : 0), pixelRatio: n2 }), o2 = s2.getContext();
            return o2.save(), (r2 || a2) && o2.translate(-1 * r2, -1 * a2), this.drawScene(s2), o2.restore(), s2;
          }
          toCanvas(t2) {
            return this._toKonvaCanvas(t2)._canvas;
          }
          toDataURL(t2) {
            var e2 = (t2 = t2 || {}).mimeType || null, i2 = t2.quality || null, r2 = this._toKonvaCanvas(t2).toDataURL(e2, i2);
            return t2.callback && t2.callback(r2), r2;
          }
          toImage(t2) {
            if (!t2 || !t2.callback)
              throw "callback required for toImage method config argument";
            var e2 = t2.callback;
            delete t2.callback, g._urlToImage(this.toDataURL(t2), function(t3) {
              e2(t3);
            });
          }
          setSize(t2) {
            return this.width(t2.width), this.height(t2.height), this;
          }
          getSize() {
            return { width: this.width(), height: this.height() };
          }
          getClassName() {
            return this.className || this.nodeType;
          }
          getType() {
            return this.nodeType;
          }
          getDragDistance() {
            return this.attrs.dragDistance !== void 0 ? this.attrs.dragDistance : this.parent ? this.parent.getDragDistance() : i.dragDistance;
          }
          _off(t2, e2, i2) {
            var r2, a2, n2, s2 = this.eventListeners[t2];
            for (r2 = 0; r2 < s2.length; r2++)
              if (a2 = s2[r2].name, n2 = s2[r2].handler, !(a2 === "konva" && e2 !== "konva" || e2 && a2 !== e2 || i2 && i2 !== n2)) {
                if (s2.splice(r2, 1), s2.length === 0) {
                  delete this.eventListeners[t2];
                  break;
                }
                r2--;
              }
          }
          _fireChangeEvent(t2, e2, i2) {
            this._fire(t2 + "Change", { oldVal: e2, newVal: i2 });
          }
          addName(t2) {
            if (!this.hasName(t2)) {
              var e2 = this.name(), i2 = e2 ? e2 + " " + t2 : t2;
              this.name(i2);
            }
            return this;
          }
          hasName(t2) {
            if (!t2)
              return false;
            const e2 = this.name();
            return !!e2 && (e2 || "").split(/\s/g).indexOf(t2) !== -1;
          }
          removeName(t2) {
            var e2 = (this.name() || "").split(/\s/g), i2 = e2.indexOf(t2);
            return i2 !== -1 && (e2.splice(i2, 1), this.name(e2.join(" "))), this;
          }
          setAttr(t2, e2) {
            var i2 = this["set" + g._capitalize(t2)];
            return g._isFunction(i2) ? i2.call(this, e2) : this._setAttr(t2, e2), this;
          }
          _requestDraw() {
            if (i.autoDrawEnabled) {
              const t2 = this.getLayer() || this.getStage();
              t2 == null || t2.batchDraw();
            }
          }
          _setAttr(t2, e2) {
            var i2 = this.attrs[t2];
            (i2 !== e2 || g.isObject(e2)) && (e2 == null ? delete this.attrs[t2] : this.attrs[t2] = e2, this._shouldFireChangeEvents && this._fireChangeEvent(t2, i2, e2), this._requestDraw());
          }
          _setComponentAttr(t2, e2, i2) {
            var r2;
            i2 !== void 0 && ((r2 = this.attrs[t2]) || (this.attrs[t2] = this.getAttr(t2)), this.attrs[t2][e2] = i2, this._fireChangeEvent(t2, r2, i2));
          }
          _fireAndBubble(t2, e2, i2) {
            if (e2 && this.nodeType === H && (e2.target = this), !((t2 === z || t2 === W) && (i2 && (this === i2 || this.isAncestorOf && this.isAncestorOf(i2)) || this.nodeType === "Stage" && !i2))) {
              this._fire(t2, e2);
              var r2 = (t2 === z || t2 === W) && i2 && i2.isAncestorOf && i2.isAncestorOf(this) && !i2.isAncestorOf(this.parent);
              (e2 && !e2.cancelBubble || !e2) && this.parent && this.parent.isListening() && !r2 && (i2 && i2.parent ? this._fireAndBubble.call(this.parent, t2, e2, i2) : this._fireAndBubble.call(this.parent, t2, e2));
            }
          }
          _getProtoListeners(t2) {
            let e2 = this._cache.get(O);
            if (!e2) {
              e2 = {};
              let t3 = Object.getPrototypeOf(this);
              for (; t3; )
                if (t3.eventListeners) {
                  for (var i2 in t3.eventListeners) {
                    const r2 = t3.eventListeners[i2], a2 = e2[i2] || [];
                    e2[i2] = r2.concat(a2);
                  }
                  t3 = Object.getPrototypeOf(t3);
                } else
                  t3 = Object.getPrototypeOf(t3);
              this._cache.set(O, e2);
            }
            return e2[t2];
          }
          _fire(t2, e2) {
            (e2 = e2 || {}).currentTarget = this, e2.type = t2;
            const i2 = this._getProtoListeners(t2);
            if (i2)
              for (var r2 = 0; r2 < i2.length; r2++)
                i2[r2].handler.call(this, e2);
            const a2 = this.eventListeners[t2];
            if (a2)
              for (r2 = 0; r2 < a2.length; r2++)
                a2[r2].handler.call(this, e2);
          }
          draw() {
            return this.drawScene(), this.drawHit(), this;
          }
          _createDragElement(t2) {
            var e2 = t2 ? t2.pointerId : void 0, i2 = this.getStage(), r2 = this.getAbsolutePosition(), a2 = i2._getPointerById(e2) || i2._changedPointerPositions[0] || r2;
            L._dragElements.set(this._id, { node: this, startPointerPos: a2, offset: { x: a2.x - r2.x, y: a2.y - r2.y }, dragStatus: "ready", pointerId: e2 });
          }
          startDrag(t2, e2 = true) {
            L._dragElements.has(this._id) || this._createDragElement(t2);
            L._dragElements.get(this._id).dragStatus = "dragging", this.fire("dragstart", { type: "dragstart", target: this, evt: t2 && t2.evt }, e2);
          }
          _setDragPosition(t2, e2) {
            const i2 = this.getStage()._getPointerById(e2.pointerId);
            if (i2) {
              var r2 = { x: i2.x - e2.offset.x, y: i2.y - e2.offset.y }, a2 = this.dragBoundFunc();
              if (a2 !== void 0) {
                const e3 = a2.call(this, r2, t2);
                e3 ? r2 = e3 : g.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
              }
              this._lastPos && this._lastPos.x === r2.x && this._lastPos.y === r2.y || (this.setAbsolutePosition(r2), this._requestDraw()), this._lastPos = r2;
            }
          }
          stopDrag(t2) {
            const e2 = L._dragElements.get(this._id);
            e2 && (e2.dragStatus = "stopped"), L._endDragBefore(t2), L._endDragAfter(t2);
          }
          setDraggable(t2) {
            this._setAttr("draggable", t2), this._dragChange();
          }
          isDragging() {
            const t2 = L._dragElements.get(this._id);
            return !!t2 && t2.dragStatus === "dragging";
          }
          _listenDrag() {
            this._dragCleanup(), this.on("mousedown.konva touchstart.konva", function(t2) {
              if ((!(t2.evt.button !== void 0) || i.dragButtons.indexOf(t2.evt.button) >= 0) && !this.isDragging()) {
                var e2 = false;
                L._dragElements.forEach((t3) => {
                  this.isAncestorOf(t3.node) && (e2 = true);
                }), e2 || this._createDragElement(t2);
              }
            });
          }
          _dragChange() {
            if (this.attrs.draggable)
              this._listenDrag();
            else {
              if (this._dragCleanup(), !this.getStage())
                return;
              const t2 = L._dragElements.get(this._id), e2 = t2 && t2.dragStatus === "dragging", i2 = t2 && t2.dragStatus === "ready";
              e2 ? this.stopDrag() : i2 && L._dragElements.delete(this._id);
            }
          }
          _dragCleanup() {
            this.off("mousedown.konva"), this.off("touchstart.konva");
          }
          isClientRectOnScreen(t2 = { x: 0, y: 0 }) {
            const e2 = this.getStage();
            if (!e2)
              return false;
            const i2 = { x: -t2.x, y: -t2.y, width: e2.width() + 2 * t2.x, height: e2.height() + 2 * t2.y };
            return g.haveIntersection(i2, this.getClientRect());
          }
          static create(t2, e2) {
            return g._isString(t2) && (t2 = JSON.parse(t2)), this._createNode(t2, e2);
          }
          static _createNode(t2, e2) {
            var r2, a2, n2, s2 = K.prototype.getClassName.call(t2), o2 = t2.children;
            e2 && (t2.attrs.container = e2), i[s2] || (g.warn('Can not find a node with class name "' + s2 + '". Fallback to "Shape".'), s2 = "Shape");
            if (r2 = new (0, i[s2])(t2.attrs), o2)
              for (a2 = o2.length, n2 = 0; n2 < a2; n2++)
                r2.add(K._createNode(o2[n2]));
            return r2;
          }
        }
        K.prototype.nodeType = "Node", K.prototype._attrsAffectingSize = [], K.prototype.eventListeners = {}, K.prototype.on.call(K.prototype, q, function() {
          this._batchingTransformChange ? this._needClearTransformCache = true : (this._clearCache(j), this._clearSelfAndDescendantCache(I));
        }), K.prototype.on.call(K.prototype, "visibleChange.konva", function() {
          this._clearSelfAndDescendantCache(U);
        }), K.prototype.on.call(K.prototype, "listeningChange.konva", function() {
          this._clearSelfAndDescendantCache(B);
        }), K.prototype.on.call(K.prototype, "opacityChange.konva", function() {
          this._clearSelfAndDescendantCache(D);
        });
        const Q = w.addGetterSetter;
        Q(K, "zIndex"), Q(K, "absolutePosition"), Q(K, "position"), Q(K, "x", 0, p()), Q(K, "y", 0, p()), Q(K, "globalCompositeOperation", "source-over", _()), Q(K, "opacity", 1, p()), Q(K, "name", "", _()), Q(K, "id", "", _()), Q(K, "rotation", 0, p()), w.addComponentsGetterSetter(K, "scale", ["x", "y"]), Q(K, "scaleX", 1, p()), Q(K, "scaleY", 1, p()), w.addComponentsGetterSetter(K, "skew", ["x", "y"]), Q(K, "skewX", 0, p()), Q(K, "skewY", 0, p()), w.addComponentsGetterSetter(K, "offset", ["x", "y"]), Q(K, "offsetX", 0, p()), Q(K, "offsetY", 0, p()), Q(K, "dragDistance", null, p()), Q(K, "width", 0, p()), Q(K, "height", 0, p()), Q(K, "listening", true, x()), Q(K, "preventDefault", true, x()), Q(K, "filters", null, function(t2) {
          return this._filterUpToDate = false, t2;
        }), Q(K, "visible", true, x()), Q(K, "transformsEnabled", "all", _()), Q(K, "size"), Q(K, "dragBoundFunc"), Q(K, "draggable", false, x()), w.backCompat(K, { rotateDeg: "rotate", setRotationDeg: "setRotation", getRotationDeg: "getRotation" });
        class J extends K {
          constructor() {
            super(...arguments), this.children = [];
          }
          getChildren(t2) {
            if (!t2)
              return this.children || [];
            const e2 = this.children || [];
            var i2 = [];
            return e2.forEach(function(e3) {
              t2(e3) && i2.push(e3);
            }), i2;
          }
          hasChildren() {
            return this.getChildren().length > 0;
          }
          removeChildren() {
            return this.getChildren().forEach((t2) => {
              t2.parent = null, t2.index = 0, t2.remove();
            }), this.children = [], this._requestDraw(), this;
          }
          destroyChildren() {
            return this.getChildren().forEach((t2) => {
              t2.parent = null, t2.index = 0, t2.destroy();
            }), this.children = [], this._requestDraw(), this;
          }
          add(...t2) {
            if (arguments.length > 1) {
              for (var e2 = 0; e2 < arguments.length; e2++)
                this.add(arguments[e2]);
              return this;
            }
            var i2 = t2[0];
            return i2.getParent() ? (i2.moveTo(this), this) : (this._validateAdd(i2), i2.index = this.getChildren().length, i2.parent = this, i2._clearCaches(), this.getChildren().push(i2), this._fire("add", { child: i2 }), this._requestDraw(), this);
          }
          destroy() {
            return this.hasChildren() && this.destroyChildren(), super.destroy(), this;
          }
          find(t2) {
            return this._generalFind(t2, false);
          }
          findOne(t2) {
            var e2 = this._generalFind(t2, true);
            return e2.length > 0 ? e2[0] : void 0;
          }
          _generalFind(t2, e2) {
            var i2 = [];
            return this._descendants((r2) => {
              const a2 = r2._isMatch(t2);
              return a2 && i2.push(r2), !(!a2 || !e2);
            }), i2;
          }
          _descendants(t2) {
            let e2 = false;
            const i2 = this.getChildren();
            for (const r2 of i2) {
              if (e2 = t2(r2), e2)
                return true;
              if (r2.hasChildren() && (e2 = r2._descendants(t2), e2))
                return true;
            }
            return false;
          }
          toObject() {
            var t2 = K.prototype.toObject.call(this);
            return t2.children = [], this.getChildren().forEach((e2) => {
              t2.children.push(e2.toObject());
            }), t2;
          }
          isAncestorOf(t2) {
            for (var e2 = t2.getParent(); e2; ) {
              if (e2._id === this._id)
                return true;
              e2 = e2.getParent();
            }
            return false;
          }
          clone(t2) {
            var e2 = K.prototype.clone.call(this, t2);
            return this.getChildren().forEach(function(t3) {
              e2.add(t3.clone());
            }), e2;
          }
          getAllIntersections(t2) {
            var e2 = [];
            return this.find("Shape").forEach(function(i2) {
              i2.isVisible() && i2.intersects(t2) && e2.push(i2);
            }), e2;
          }
          _clearSelfAndDescendantCache(t2) {
            var e2;
            super._clearSelfAndDescendantCache(t2), this.isCached() || (e2 = this.children) === null || e2 === void 0 || e2.forEach(function(e3) {
              e3._clearSelfAndDescendantCache(t2);
            });
          }
          _setChildrenIndices() {
            var t2;
            (t2 = this.children) === null || t2 === void 0 || t2.forEach(function(t3, e2) {
              t3.index = e2;
            }), this._requestDraw();
          }
          drawScene(t2, e2) {
            var i2 = this.getLayer(), r2 = t2 || i2 && i2.getCanvas(), a2 = r2 && r2.getContext(), n2 = this._getCanvasCache(), s2 = n2 && n2.scene, o2 = r2 && r2.isCache;
            if (!this.isVisible() && !o2)
              return this;
            if (s2) {
              a2.save();
              var h2 = this.getAbsoluteTransform(e2).getMatrix();
              a2.transform(h2[0], h2[1], h2[2], h2[3], h2[4], h2[5]), this._drawCachedSceneCanvas(a2), a2.restore();
            } else
              this._drawChildren("drawScene", r2, e2);
            return this;
          }
          drawHit(t2, e2) {
            if (!this.shouldDrawHit(e2))
              return this;
            var i2 = this.getLayer(), r2 = t2 || i2 && i2.hitCanvas, a2 = r2 && r2.getContext(), n2 = this._getCanvasCache();
            if (n2 && n2.hit) {
              a2.save();
              var s2 = this.getAbsoluteTransform(e2).getMatrix();
              a2.transform(s2[0], s2[1], s2[2], s2[3], s2[4], s2[5]), this._drawCachedHitCanvas(a2), a2.restore();
            } else
              this._drawChildren("drawHit", r2, e2);
            return this;
          }
          _drawChildren(t2, e2, i2) {
            var r2, a2 = e2 && e2.getContext(), n2 = this.clipWidth(), s2 = this.clipHeight(), o2 = this.clipFunc(), h2 = n2 && s2 || o2;
            const l2 = i2 === this;
            if (h2) {
              a2.save();
              var d2 = this.getAbsoluteTransform(i2), c2 = d2.getMatrix();
              if (a2.transform(c2[0], c2[1], c2[2], c2[3], c2[4], c2[5]), a2.beginPath(), o2)
                o2.call(this, a2, this);
              else {
                var g2 = this.clipX(), u2 = this.clipY();
                a2.rect(g2, u2, n2, s2);
              }
              a2.clip(), c2 = d2.copy().invert().getMatrix(), a2.transform(c2[0], c2[1], c2[2], c2[3], c2[4], c2[5]);
            }
            var f2 = !l2 && this.globalCompositeOperation() !== "source-over" && t2 === "drawScene";
            f2 && (a2.save(), a2._applyGlobalCompositeOperation(this)), (r2 = this.children) === null || r2 === void 0 || r2.forEach(function(r3) {
              r3[t2](e2, i2);
            }), f2 && a2.restore(), h2 && a2.restore();
          }
          getClientRect(t2) {
            var e2, i2, r2, a2, n2, s2 = (t2 = t2 || {}).skipTransform, o2 = t2.relativeTo, h2 = { x: 1 / 0, y: 1 / 0, width: 0, height: 0 }, l2 = this;
            (e2 = this.children) === null || e2 === void 0 || e2.forEach(function(e3) {
              if (e3.visible()) {
                var s3 = e3.getClientRect({ relativeTo: l2, skipShadow: t2.skipShadow, skipStroke: t2.skipStroke });
                s3.width === 0 && s3.height === 0 || (i2 === void 0 ? (i2 = s3.x, r2 = s3.y, a2 = s3.x + s3.width, n2 = s3.y + s3.height) : (i2 = Math.min(i2, s3.x), r2 = Math.min(r2, s3.y), a2 = Math.max(a2, s3.x + s3.width), n2 = Math.max(n2, s3.y + s3.height)));
              }
            });
            for (var d2 = this.find("Shape"), c2 = false, g2 = 0; g2 < d2.length; g2++) {
              if (d2[g2]._isVisible(this)) {
                c2 = true;
                break;
              }
            }
            return h2 = c2 && i2 !== void 0 ? { x: i2, y: r2, width: a2 - i2, height: n2 - r2 } : { x: 0, y: 0, width: 0, height: 0 }, s2 ? h2 : this._transformedRect(h2, o2);
          }
        }
        w.addComponentsGetterSetter(J, "clip", ["x", "y", "width", "height"]), w.addGetterSetter(J, "clipX", void 0, p()), w.addGetterSetter(J, "clipY", void 0, p()), w.addGetterSetter(J, "clipWidth", void 0, p()), w.addGetterSetter(J, "clipHeight", void 0, p()), w.addGetterSetter(J, "clipFunc");
        const Z = new Map(), $ = i._global.PointerEvent !== void 0;
        function tt(t2) {
          return Z.get(t2);
        }
        function et(t2) {
          return { evt: t2, pointerId: t2.pointerId };
        }
        function it(t2, e2) {
          return Z.get(t2) === e2;
        }
        function rt(t2, e2) {
          at(t2);
          e2.getStage() && (Z.set(t2, e2), $ && e2._fire("gotpointercapture", et(new PointerEvent("gotpointercapture"))));
        }
        function at(t2, e2) {
          const i2 = Z.get(t2);
          if (!i2)
            return;
          const r2 = i2.getStage();
          r2 && r2.content, Z.delete(t2), $ && i2._fire("lostpointercapture", et(new PointerEvent("lostpointercapture")));
        }
        var nt = "mouseleave", st = "mouseover", ot = "mouseenter", ht = "mousemove", lt = "mousedown", dt = "mouseup", ct = "pointermove", gt = "pointerdown", ut = "pointerup", ft = "pointercancel", pt = "pointerout", vt = "pointerleave", mt = "pointerover", _t = "pointerenter", yt = "contextmenu", xt = "touchstart", bt = "touchend", St = "touchmove", wt = "touchcancel", Ct = "wheel", Pt = [[ot, "_pointerenter"], [lt, "_pointerdown"], [ht, "_pointermove"], [dt, "_pointerup"], [nt, "_pointerleave"], [xt, "_pointerdown"], [St, "_pointermove"], [bt, "_pointerup"], [wt, "_pointercancel"], [st, "_pointerover"], [Ct, "_wheel"], [yt, "_contextmenu"], [gt, "_pointerdown"], [ct, "_pointermove"], [ut, "_pointerup"], [ft, "_pointercancel"], ["lostpointercapture", "_lostpointercapture"]];
        const kt = { mouse: { [pt]: "mouseout", [vt]: nt, [mt]: st, [_t]: ot, [ct]: ht, [gt]: lt, [ut]: dt, [ft]: "mousecancel", pointerclick: "click", pointerdblclick: "dblclick" }, touch: { [pt]: "touchout", [vt]: "touchleave", [mt]: "touchover", [_t]: "touchenter", [ct]: St, [gt]: xt, [ut]: bt, [ft]: wt, pointerclick: "tap", pointerdblclick: "dbltap" }, pointer: { [pt]: pt, [vt]: vt, [mt]: mt, [_t]: _t, [ct]: ct, [gt]: gt, [ut]: ut, [ft]: ft, pointerclick: "pointerclick", pointerdblclick: "pointerdblclick" } }, Tt = (t2) => t2.indexOf("pointer") >= 0 ? "pointer" : t2.indexOf("touch") >= 0 ? "touch" : "mouse", At = (t2) => {
          const e2 = Tt(t2);
          return e2 === "pointer" ? i.pointerEventsEnabled && kt.pointer : e2 === "touch" ? kt.touch : e2 === "mouse" ? kt.mouse : void 0;
        };
        function Mt(t2 = {}) {
          return (t2.clipFunc || t2.clipWidth || t2.clipHeight) && g.warn("Stage does not support clipping. Please use clip for Layers or Groups."), t2;
        }
        const Gt = [];
        class Et extends J {
          constructor(t2) {
            super(Mt(t2)), this._pointerPositions = [], this._changedPointerPositions = [], this._buildDOM(), this._bindContentEvents(), Gt.push(this), this.on("widthChange.konva heightChange.konva", this._resizeDOM), this.on("visibleChange.konva", this._checkVisibility), this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", () => {
              Mt(this.attrs);
            }), this._checkVisibility();
          }
          _validateAdd(t2) {
            const e2 = t2.getType() === "Layer", i2 = t2.getType() === "FastLayer";
            e2 || i2 || g.throw("You may only add layers to the stage.");
          }
          _checkVisibility() {
            if (!this.content)
              return;
            const t2 = this.visible() ? "" : "none";
            this.content.style.display = t2;
          }
          setContainer(t2) {
            if (typeof t2 == "string") {
              if (t2.charAt(0) === ".") {
                var e2 = t2.slice(1);
                t2 = document.getElementsByClassName(e2)[0];
              } else {
                var i2;
                i2 = t2.charAt(0) !== "#" ? t2 : t2.slice(1), t2 = document.getElementById(i2);
              }
              if (!t2)
                throw "Can not find container in document with id " + i2;
            }
            return this._setAttr("container", t2), this.content && (this.content.parentElement && this.content.parentElement.removeChild(this.content), t2.appendChild(this.content)), this;
          }
          shouldDrawHit() {
            return true;
          }
          clear() {
            var t2, e2 = this.children, i2 = e2.length;
            for (t2 = 0; t2 < i2; t2++)
              e2[t2].clear();
            return this;
          }
          clone(t2) {
            return t2 || (t2 = {}), t2.container = typeof document != "undefined" && document.createElement("div"), J.prototype.clone.call(this, t2);
          }
          destroy() {
            super.destroy();
            var t2 = this.content;
            t2 && g._isInDocument(t2) && this.container().removeChild(t2);
            var e2 = Gt.indexOf(this);
            return e2 > -1 && Gt.splice(e2, 1), this;
          }
          getPointerPosition() {
            const t2 = this._pointerPositions[0] || this._changedPointerPositions[0];
            return t2 ? { x: t2.x, y: t2.y } : (g.warn("Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"), null);
          }
          _getPointerById(t2) {
            return this._pointerPositions.find((e2) => e2.id === t2);
          }
          getPointersPositions() {
            return this._pointerPositions;
          }
          getStage() {
            return this;
          }
          getContent() {
            return this.content;
          }
          _toKonvaCanvas(t2) {
            (t2 = t2 || {}).x = t2.x || 0, t2.y = t2.y || 0, t2.width = t2.width || this.width(), t2.height = t2.height || this.height();
            var e2 = new E({ width: t2.width, height: t2.height, pixelRatio: t2.pixelRatio || 1 }), i2 = e2.getContext()._context, r2 = this.children;
            return (t2.x || t2.y) && i2.translate(-1 * t2.x, -1 * t2.y), r2.forEach(function(e3) {
              if (e3.isVisible()) {
                var r3 = e3._toKonvaCanvas(t2);
                i2.drawImage(r3._canvas, t2.x, t2.y, r3.getWidth() / r3.getPixelRatio(), r3.getHeight() / r3.getPixelRatio());
              }
            }), e2;
          }
          getIntersection(t2) {
            if (!t2)
              return null;
            var e2, i2 = this.children;
            for (e2 = i2.length - 1; e2 >= 0; e2--) {
              const r2 = i2[e2].getIntersection(t2);
              if (r2)
                return r2;
            }
            return null;
          }
          _resizeDOM() {
            var t2 = this.width(), e2 = this.height();
            this.content && (this.content.style.width = t2 + "px", this.content.style.height = e2 + "px"), this.bufferCanvas.setSize(t2, e2), this.bufferHitCanvas.setSize(t2, e2), this.children.forEach((i2) => {
              i2.setSize({ width: t2, height: e2 }), i2.draw();
            });
          }
          add(t2, ...e2) {
            if (arguments.length > 1) {
              for (var r2 = 0; r2 < arguments.length; r2++)
                this.add(arguments[r2]);
              return this;
            }
            super.add(t2);
            var a2 = this.children.length;
            return a2 > 5 && g.warn("The stage has " + a2 + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."), t2.setSize({ width: this.width(), height: this.height() }), t2.draw(), i.isBrowser && this.content.appendChild(t2.canvas._canvas), this;
          }
          getParent() {
            return null;
          }
          getLayer() {
            return null;
          }
          hasPointerCapture(t2) {
            return it(t2, this);
          }
          setPointerCapture(t2) {
            rt(t2, this);
          }
          releaseCapture(t2) {
            at(t2);
          }
          getLayers() {
            return this.children;
          }
          _bindContentEvents() {
            i.isBrowser && Pt.forEach(([t2, e2]) => {
              this.content.addEventListener(t2, (t3) => {
                this[e2](t3);
              });
            });
          }
          _pointerenter(t2) {
            this.setPointersPositions(t2);
            const e2 = At(t2.type);
            this._fire(e2.pointerenter, { evt: t2, target: this, currentTarget: this });
          }
          _pointerover(t2) {
            this.setPointersPositions(t2);
            const e2 = At(t2.type);
            this._fire(e2.pointerover, { evt: t2, target: this, currentTarget: this });
          }
          _getTargetShape(t2) {
            let e2 = this[t2 + "targetShape"];
            return e2 && !e2.getStage() && (e2 = null), e2;
          }
          _pointerleave(t2) {
            const e2 = At(t2.type), r2 = Tt(t2.type);
            if (e2) {
              this.setPointersPositions(t2);
              var a2 = this._getTargetShape(r2), n2 = !L.isDragging || i.hitOnDragEnabled;
              a2 && n2 ? (a2._fireAndBubble(e2.pointerout, { evt: t2 }), a2._fireAndBubble(e2.pointerleave, { evt: t2 }), this._fire(e2.pointerleave, { evt: t2, target: this, currentTarget: this }), this[r2 + "targetShape"] = null) : n2 && (this._fire(e2.pointerleave, { evt: t2, target: this, currentTarget: this }), this._fire(e2.pointerout, { evt: t2, target: this, currentTarget: this })), this.pointerPos = void 0, this._pointerPositions = [];
            }
          }
          _pointerdown(t2) {
            const e2 = At(t2.type), r2 = Tt(t2.type);
            if (e2) {
              this.setPointersPositions(t2);
              var a2 = false;
              this._changedPointerPositions.forEach((n2) => {
                var s2 = this.getIntersection(n2);
                L.justDragged = false, i["_" + r2 + "ListenClick"] = true;
                if (!(s2 && s2.isListening()))
                  return;
                i.capturePointerEventsEnabled && s2.setPointerCapture(n2.id), this[r2 + "ClickStartShape"] = s2, s2._fireAndBubble(e2.pointerdown, { evt: t2, pointerId: n2.id }), a2 = true;
                const o2 = t2.type.indexOf("touch") >= 0;
                s2.preventDefault() && t2.cancelable && o2 && t2.preventDefault();
              }), a2 || this._fire(e2.pointerdown, { evt: t2, target: this, currentTarget: this, pointerId: this._pointerPositions[0].id });
            }
          }
          _pointermove(t2) {
            const e2 = At(t2.type), r2 = Tt(t2.type);
            if (!e2)
              return;
            if (L.isDragging && L.node.preventDefault() && t2.cancelable && t2.preventDefault(), this.setPointersPositions(t2), !(!L.isDragging || i.hitOnDragEnabled))
              return;
            var a2 = {};
            let n2 = false;
            var s2 = this._getTargetShape(r2);
            this._changedPointerPositions.forEach((i2) => {
              const o2 = tt(i2.id) || this.getIntersection(i2), h2 = i2.id, l2 = { evt: t2, pointerId: h2 };
              var d2 = s2 !== o2;
              if (d2 && s2 && (s2._fireAndBubble(e2.pointerout, Object.assign({}, l2), o2), s2._fireAndBubble(e2.pointerleave, Object.assign({}, l2), o2)), o2) {
                if (a2[o2._id])
                  return;
                a2[o2._id] = true;
              }
              o2 && o2.isListening() ? (n2 = true, d2 && (o2._fireAndBubble(e2.pointerover, Object.assign({}, l2), s2), o2._fireAndBubble(e2.pointerenter, Object.assign({}, l2), s2), this[r2 + "targetShape"] = o2), o2._fireAndBubble(e2.pointermove, Object.assign({}, l2))) : s2 && (this._fire(e2.pointerover, { evt: t2, target: this, currentTarget: this, pointerId: h2 }), this[r2 + "targetShape"] = null);
            }), n2 || this._fire(e2.pointermove, { evt: t2, target: this, currentTarget: this, pointerId: this._changedPointerPositions[0].id });
          }
          _pointerup(t2) {
            const e2 = At(t2.type), r2 = Tt(t2.type);
            if (!e2)
              return;
            this.setPointersPositions(t2);
            const a2 = this[r2 + "ClickStartShape"], n2 = this[r2 + "ClickEndShape"];
            var s2 = {};
            let o2 = false;
            this._changedPointerPositions.forEach((h2) => {
              const l2 = tt(h2.id) || this.getIntersection(h2);
              if (l2) {
                if (l2.releaseCapture(h2.id), s2[l2._id])
                  return;
                s2[l2._id] = true;
              }
              const d2 = h2.id, c2 = { evt: t2, pointerId: d2 };
              let g2 = false;
              i["_" + r2 + "InDblClickWindow"] ? (g2 = true, clearTimeout(this[r2 + "DblTimeout"])) : L.justDragged || (i["_" + r2 + "InDblClickWindow"] = true, clearTimeout(this[r2 + "DblTimeout"])), this[r2 + "DblTimeout"] = setTimeout(function() {
                i["_" + r2 + "InDblClickWindow"] = false;
              }, i.dblClickWindow), l2 && l2.isListening() ? (o2 = true, this[r2 + "ClickEndShape"] = l2, l2._fireAndBubble(e2.pointerup, Object.assign({}, c2)), i["_" + r2 + "ListenClick"] && a2 && a2 === l2 && (l2._fireAndBubble(e2.pointerclick, Object.assign({}, c2)), g2 && n2 && n2 === l2 && l2._fireAndBubble(e2.pointerdblclick, Object.assign({}, c2)))) : (this[r2 + "ClickEndShape"] = null, i["_" + r2 + "ListenClick"] && this._fire(e2.pointerclick, { evt: t2, target: this, currentTarget: this, pointerId: d2 }), g2 && this._fire(e2.pointerdblclick, { evt: t2, target: this, currentTarget: this, pointerId: d2 }));
            }), o2 || this._fire(e2.pointerup, { evt: t2, target: this, currentTarget: this, pointerId: this._changedPointerPositions[0].id }), i["_" + r2 + "ListenClick"] = false, t2.cancelable && t2.preventDefault();
          }
          _contextmenu(t2) {
            this.setPointersPositions(t2);
            var e2 = this.getIntersection(this.getPointerPosition());
            e2 && e2.isListening() ? e2._fireAndBubble(yt, { evt: t2 }) : this._fire(yt, { evt: t2, target: this, currentTarget: this });
          }
          _wheel(t2) {
            this.setPointersPositions(t2);
            var e2 = this.getIntersection(this.getPointerPosition());
            e2 && e2.isListening() ? e2._fireAndBubble(Ct, { evt: t2 }) : this._fire(Ct, { evt: t2, target: this, currentTarget: this });
          }
          _pointercancel(t2) {
            this.setPointersPositions(t2);
            const e2 = tt(t2.pointerId) || this.getIntersection(this.getPointerPosition());
            e2 && e2._fireAndBubble(ut, et(t2)), at(t2.pointerId);
          }
          _lostpointercapture(t2) {
            at(t2.pointerId);
          }
          setPointersPositions(t2) {
            var e2 = this._getContentPosition(), i2 = null, r2 = null;
            (t2 = t2 || window.event).touches !== void 0 ? (this._pointerPositions = [], this._changedPointerPositions = [], Array.prototype.forEach.call(t2.touches, (t3) => {
              this._pointerPositions.push({ id: t3.identifier, x: (t3.clientX - e2.left) / e2.scaleX, y: (t3.clientY - e2.top) / e2.scaleY });
            }), Array.prototype.forEach.call(t2.changedTouches || t2.touches, (t3) => {
              this._changedPointerPositions.push({ id: t3.identifier, x: (t3.clientX - e2.left) / e2.scaleX, y: (t3.clientY - e2.top) / e2.scaleY });
            })) : (i2 = (t2.clientX - e2.left) / e2.scaleX, r2 = (t2.clientY - e2.top) / e2.scaleY, this.pointerPos = { x: i2, y: r2 }, this._pointerPositions = [{ x: i2, y: r2, id: g._getFirstPointerId(t2) }], this._changedPointerPositions = [{ x: i2, y: r2, id: g._getFirstPointerId(t2) }]);
          }
          _setPointerPosition(t2) {
            g.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'), this.setPointersPositions(t2);
          }
          _getContentPosition() {
            if (!this.content || !this.content.getBoundingClientRect)
              return { top: 0, left: 0, scaleX: 1, scaleY: 1 };
            var t2 = this.content.getBoundingClientRect();
            return { top: t2.top, left: t2.left, scaleX: t2.width / this.content.clientWidth || 1, scaleY: t2.height / this.content.clientHeight || 1 };
          }
          _buildDOM() {
            if (this.bufferCanvas = new E({ width: this.width(), height: this.height() }), this.bufferHitCanvas = new R({ pixelRatio: 1, width: this.width(), height: this.height() }), i.isBrowser) {
              var t2 = this.container();
              if (!t2)
                throw "Stage has no container. A container is required.";
              t2.innerHTML = "", this.content = document.createElement("div"), this.content.style.position = "relative", this.content.style.userSelect = "none", this.content.className = "konvajs-content", this.content.setAttribute("role", "presentation"), t2.appendChild(this.content), this._resizeDOM();
            }
          }
          cache() {
            return g.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."), this;
          }
          clearCache() {
            return this;
          }
          batchDraw() {
            return this.getChildren().forEach(function(t2) {
              t2.batchDraw();
            }), this;
          }
        }
        Et.prototype.nodeType = "Stage", r(Et), w.addGetterSetter(Et, "container");
        var Rt = "hasShadow", Lt = "shadowRGBA", Dt = "patternImage", Ot = "linearGradient", It = "radialGradient";
        let Ft;
        function Nt() {
          return Ft || (Ft = g.createCanvasElement().getContext("2d"), Ft);
        }
        const Bt = {};
        class zt extends K {
          constructor(t2) {
            let e2;
            for (super(t2); e2 = g.getRandomColor(), !e2 || e2 in Bt; )
              ;
            this.colorKey = e2, Bt[e2] = this;
          }
          getContext() {
            return g.warn("shape.getContext() method is deprecated. Please do not use it."), this.getLayer().getContext();
          }
          getCanvas() {
            return g.warn("shape.getCanvas() method is deprecated. Please do not use it."), this.getLayer().getCanvas();
          }
          getSceneFunc() {
            return this.attrs.sceneFunc || this._sceneFunc;
          }
          getHitFunc() {
            return this.attrs.hitFunc || this._hitFunc;
          }
          hasShadow() {
            return this._getCache(Rt, this._hasShadow);
          }
          _hasShadow() {
            return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
          }
          _getFillPattern() {
            return this._getCache(Dt, this.__getFillPattern);
          }
          __getFillPattern() {
            if (this.fillPatternImage()) {
              const t2 = Nt().createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
              if (t2 && t2.setTransform) {
                const e2 = new a();
                e2.translate(this.fillPatternX(), this.fillPatternY()), e2.rotate(i.getAngle(this.fillPatternRotation())), e2.scale(this.fillPatternScaleX(), this.fillPatternScaleY()), e2.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
                const r2 = e2.getMatrix(), n2 = typeof DOMMatrix == "undefined" ? { a: r2[0], b: r2[1], c: r2[2], d: r2[3], e: r2[4], f: r2[5] } : new DOMMatrix(r2);
                t2.setTransform(n2);
              }
              return t2;
            }
          }
          _getLinearGradient() {
            return this._getCache(Ot, this.__getLinearGradient);
          }
          __getLinearGradient() {
            var t2 = this.fillLinearGradientColorStops();
            if (t2) {
              for (var e2 = Nt(), i2 = this.fillLinearGradientStartPoint(), r2 = this.fillLinearGradientEndPoint(), a2 = e2.createLinearGradient(i2.x, i2.y, r2.x, r2.y), n2 = 0; n2 < t2.length; n2 += 2)
                a2.addColorStop(t2[n2], t2[n2 + 1]);
              return a2;
            }
          }
          _getRadialGradient() {
            return this._getCache(It, this.__getRadialGradient);
          }
          __getRadialGradient() {
            var t2 = this.fillRadialGradientColorStops();
            if (t2) {
              for (var e2 = Nt(), i2 = this.fillRadialGradientStartPoint(), r2 = this.fillRadialGradientEndPoint(), a2 = e2.createRadialGradient(i2.x, i2.y, this.fillRadialGradientStartRadius(), r2.x, r2.y, this.fillRadialGradientEndRadius()), n2 = 0; n2 < t2.length; n2 += 2)
                a2.addColorStop(t2[n2], t2[n2 + 1]);
              return a2;
            }
          }
          getShadowRGBA() {
            return this._getCache(Lt, this._getShadowRGBA);
          }
          _getShadowRGBA() {
            if (this.hasShadow()) {
              var t2 = g.colorToRGBA(this.shadowColor());
              return "rgba(" + t2.r + "," + t2.g + "," + t2.b + "," + t2.a * (this.shadowOpacity() || 1) + ")";
            }
          }
          hasFill() {
            return this._calculate("hasFill", ["fillEnabled", "fill", "fillPatternImage", "fillLinearGradientColorStops", "fillRadialGradientColorStops"], () => this.fillEnabled() && !!(this.fill() || this.fillPatternImage() || this.fillLinearGradientColorStops() || this.fillRadialGradientColorStops()));
          }
          hasStroke() {
            return this._calculate("hasStroke", ["strokeEnabled", "strokeWidth", "stroke", "strokeLinearGradientColorStops"], () => this.strokeEnabled() && this.strokeWidth() && !(!this.stroke() && !this.strokeLinearGradientColorStops()));
          }
          hasHitStroke() {
            const t2 = this.hitStrokeWidth();
            return t2 === "auto" ? this.hasStroke() : this.strokeEnabled() && !!t2;
          }
          intersects(t2) {
            var e2 = this.getStage().bufferHitCanvas;
            return e2.getContext().clear(), this.drawHit(e2, null, true), e2.context.getImageData(Math.round(t2.x), Math.round(t2.y), 1, 1).data[3] > 0;
          }
          destroy() {
            return K.prototype.destroy.call(this), delete Bt[this.colorKey], delete this.colorKey, this;
          }
          _useBufferCanvas(t2) {
            var e2;
            if (!this.getStage())
              return false;
            if (!((e2 = this.attrs.perfectDrawEnabled) === null || e2 === void 0 || e2))
              return false;
            const i2 = t2 || this.hasFill(), r2 = this.hasStroke(), a2 = this.getAbsoluteOpacity() !== 1;
            if (i2 && r2 && a2)
              return true;
            const n2 = this.hasShadow(), s2 = this.shadowForStrokeEnabled();
            return !!(i2 && r2 && n2 && s2);
          }
          setStrokeHitEnabled(t2) {
            g.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."), t2 ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
          }
          getStrokeHitEnabled() {
            return this.hitStrokeWidth() !== 0;
          }
          getSelfRect() {
            var t2 = this.size();
            return { x: this._centroid ? -t2.width / 2 : 0, y: this._centroid ? -t2.height / 2 : 0, width: t2.width, height: t2.height };
          }
          getClientRect(t2 = {}) {
            const e2 = t2.skipTransform, i2 = t2.relativeTo, r2 = this.getSelfRect(), a2 = !t2.skipStroke && this.hasStroke() && this.strokeWidth() || 0, n2 = r2.width + a2, s2 = r2.height + a2, o2 = !t2.skipShadow && this.hasShadow(), h2 = o2 ? this.shadowOffsetX() : 0, l2 = o2 ? this.shadowOffsetY() : 0, d2 = n2 + Math.abs(h2), c2 = s2 + Math.abs(l2), g2 = o2 && this.shadowBlur() || 0, u2 = { width: d2 + 2 * g2, height: c2 + 2 * g2, x: -(a2 / 2 + g2) + Math.min(h2, 0) + r2.x, y: -(a2 / 2 + g2) + Math.min(l2, 0) + r2.y };
            return e2 ? u2 : this._transformedRect(u2, i2);
          }
          drawScene(t2, e2) {
            var i2, r2, a2 = this.getLayer(), n2 = t2 || a2.getCanvas(), s2 = n2.getContext(), o2 = this._getCanvasCache(), h2 = this.getSceneFunc(), l2 = this.hasShadow(), d2 = n2.isCache, c2 = e2 === this;
            if (!this.isVisible() && !c2)
              return this;
            if (o2) {
              s2.save();
              var g2 = this.getAbsoluteTransform(e2).getMatrix();
              return s2.transform(g2[0], g2[1], g2[2], g2[3], g2[4], g2[5]), this._drawCachedSceneCanvas(s2), s2.restore(), this;
            }
            if (!h2)
              return this;
            if (s2.save(), this._useBufferCanvas() && !d2) {
              (r2 = (i2 = this.getStage().bufferCanvas).getContext()).clear(), r2.save(), r2._applyLineJoin(this);
              var u2 = this.getAbsoluteTransform(e2).getMatrix();
              r2.transform(u2[0], u2[1], u2[2], u2[3], u2[4], u2[5]), h2.call(this, r2, this), r2.restore();
              var f2 = i2.pixelRatio;
              l2 && s2._applyShadow(this), s2._applyOpacity(this), s2._applyGlobalCompositeOperation(this), s2.drawImage(i2._canvas, 0, 0, i2.width / f2, i2.height / f2);
            } else {
              if (s2._applyLineJoin(this), !c2) {
                u2 = this.getAbsoluteTransform(e2).getMatrix();
                s2.transform(u2[0], u2[1], u2[2], u2[3], u2[4], u2[5]), s2._applyOpacity(this), s2._applyGlobalCompositeOperation(this);
              }
              l2 && s2._applyShadow(this), h2.call(this, s2, this);
            }
            return s2.restore(), this;
          }
          drawHit(t2, e2, i2 = false) {
            if (!this.shouldDrawHit(e2, i2))
              return this;
            var r2 = this.getLayer(), a2 = t2 || r2.hitCanvas, n2 = a2 && a2.getContext(), s2 = this.hitFunc() || this.sceneFunc(), o2 = this._getCanvasCache(), h2 = o2 && o2.hit;
            if (this.colorKey || g.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"), h2) {
              n2.save();
              var l2 = this.getAbsoluteTransform(e2).getMatrix();
              return n2.transform(l2[0], l2[1], l2[2], l2[3], l2[4], l2[5]), this._drawCachedHitCanvas(n2), n2.restore(), this;
            }
            if (!s2)
              return this;
            n2.save(), n2._applyLineJoin(this);
            if (!(this === e2)) {
              var d2 = this.getAbsoluteTransform(e2).getMatrix();
              n2.transform(d2[0], d2[1], d2[2], d2[3], d2[4], d2[5]);
            }
            return s2.call(this, n2, this), n2.restore(), this;
          }
          drawHitFromCache(t2 = 0) {
            var e2, i2, r2, a2, n2, s2 = this._getCanvasCache(), o2 = this._getCachedSceneCanvas(), h2 = s2.hit, l2 = h2.getContext(), d2 = h2.getWidth(), c2 = h2.getHeight();
            l2.clear(), l2.drawImage(o2._canvas, 0, 0, d2, c2);
            try {
              for (r2 = (i2 = (e2 = l2.getImageData(0, 0, d2, c2)).data).length, a2 = g._hexToRgb(this.colorKey), n2 = 0; n2 < r2; n2 += 4)
                i2[n2 + 3] > t2 ? (i2[n2] = a2.r, i2[n2 + 1] = a2.g, i2[n2 + 2] = a2.b, i2[n2 + 3] = 255) : i2[n2 + 3] = 0;
              l2.putImageData(e2, 0, 0);
            } catch (t3) {
              g.error("Unable to draw hit graph from cached scene canvas. " + t3.message);
            }
            return this;
          }
          hasPointerCapture(t2) {
            return it(t2, this);
          }
          setPointerCapture(t2) {
            rt(t2, this);
          }
          releaseCapture(t2) {
            at(t2);
          }
        }
        zt.prototype._fillFunc = function(t2) {
          t2.fill();
        }, zt.prototype._strokeFunc = function(t2) {
          t2.stroke();
        }, zt.prototype._fillFuncHit = function(t2) {
          t2.fill();
        }, zt.prototype._strokeFuncHit = function(t2) {
          t2.stroke();
        }, zt.prototype._centroid = false, zt.prototype.nodeType = "Shape", r(zt), zt.prototype.eventListeners = {}, zt.prototype.on.call(zt.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", function() {
          this._clearCache(Rt);
        }), zt.prototype.on.call(zt.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", function() {
          this._clearCache(Lt);
        }), zt.prototype.on.call(zt.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva", function() {
          this._clearCache(Dt);
        }), zt.prototype.on.call(zt.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", function() {
          this._clearCache(Ot);
        }), zt.prototype.on.call(zt.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", function() {
          this._clearCache(It);
        }), w.addGetterSetter(zt, "stroke", void 0, y()), w.addGetterSetter(zt, "strokeWidth", 2, p()), w.addGetterSetter(zt, "fillAfterStrokeEnabled", false), w.addGetterSetter(zt, "hitStrokeWidth", "auto", m()), w.addGetterSetter(zt, "strokeHitEnabled", true, x()), w.addGetterSetter(zt, "perfectDrawEnabled", true, x()), w.addGetterSetter(zt, "shadowForStrokeEnabled", true, x()), w.addGetterSetter(zt, "lineJoin"), w.addGetterSetter(zt, "lineCap"), w.addGetterSetter(zt, "sceneFunc"), w.addGetterSetter(zt, "hitFunc"), w.addGetterSetter(zt, "dash"), w.addGetterSetter(zt, "dashOffset", 0, p()), w.addGetterSetter(zt, "shadowColor", void 0, _()), w.addGetterSetter(zt, "shadowBlur", 0, p()), w.addGetterSetter(zt, "shadowOpacity", 1, p()), w.addComponentsGetterSetter(zt, "shadowOffset", ["x", "y"]), w.addGetterSetter(zt, "shadowOffsetX", 0, p()), w.addGetterSetter(zt, "shadowOffsetY", 0, p()), w.addGetterSetter(zt, "fillPatternImage"), w.addGetterSetter(zt, "fill", void 0, y()), w.addGetterSetter(zt, "fillPatternX", 0, p()), w.addGetterSetter(zt, "fillPatternY", 0, p()), w.addGetterSetter(zt, "fillLinearGradientColorStops"), w.addGetterSetter(zt, "strokeLinearGradientColorStops"), w.addGetterSetter(zt, "fillRadialGradientStartRadius", 0), w.addGetterSetter(zt, "fillRadialGradientEndRadius", 0), w.addGetterSetter(zt, "fillRadialGradientColorStops"), w.addGetterSetter(zt, "fillPatternRepeat", "repeat"), w.addGetterSetter(zt, "fillEnabled", true), w.addGetterSetter(zt, "strokeEnabled", true), w.addGetterSetter(zt, "shadowEnabled", true), w.addGetterSetter(zt, "dashEnabled", true), w.addGetterSetter(zt, "strokeScaleEnabled", true), w.addGetterSetter(zt, "fillPriority", "color"), w.addComponentsGetterSetter(zt, "fillPatternOffset", ["x", "y"]), w.addGetterSetter(zt, "fillPatternOffsetX", 0, p()), w.addGetterSetter(zt, "fillPatternOffsetY", 0, p()), w.addComponentsGetterSetter(zt, "fillPatternScale", ["x", "y"]), w.addGetterSetter(zt, "fillPatternScaleX", 1, p()), w.addGetterSetter(zt, "fillPatternScaleY", 1, p()), w.addComponentsGetterSetter(zt, "fillLinearGradientStartPoint", ["x", "y"]), w.addComponentsGetterSetter(zt, "strokeLinearGradientStartPoint", ["x", "y"]), w.addGetterSetter(zt, "fillLinearGradientStartPointX", 0), w.addGetterSetter(zt, "strokeLinearGradientStartPointX", 0), w.addGetterSetter(zt, "fillLinearGradientStartPointY", 0), w.addGetterSetter(zt, "strokeLinearGradientStartPointY", 0), w.addComponentsGetterSetter(zt, "fillLinearGradientEndPoint", ["x", "y"]), w.addComponentsGetterSetter(zt, "strokeLinearGradientEndPoint", ["x", "y"]), w.addGetterSetter(zt, "fillLinearGradientEndPointX", 0), w.addGetterSetter(zt, "strokeLinearGradientEndPointX", 0), w.addGetterSetter(zt, "fillLinearGradientEndPointY", 0), w.addGetterSetter(zt, "strokeLinearGradientEndPointY", 0), w.addComponentsGetterSetter(zt, "fillRadialGradientStartPoint", ["x", "y"]), w.addGetterSetter(zt, "fillRadialGradientStartPointX", 0), w.addGetterSetter(zt, "fillRadialGradientStartPointY", 0), w.addComponentsGetterSetter(zt, "fillRadialGradientEndPoint", ["x", "y"]), w.addGetterSetter(zt, "fillRadialGradientEndPointX", 0), w.addGetterSetter(zt, "fillRadialGradientEndPointY", 0), w.addGetterSetter(zt, "fillPatternRotation", 0), w.backCompat(zt, { dashArray: "dash", getDashArray: "getDash", setDashArray: "getDash", drawFunc: "sceneFunc", getDrawFunc: "getSceneFunc", setDrawFunc: "setSceneFunc", drawHitFunc: "hitFunc", getDrawHitFunc: "getHitFunc", setDrawHitFunc: "setHitFunc" });
        var Wt = [{ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }], Ht = Wt.length;
        class Yt extends J {
          constructor(t2) {
            super(t2), this.canvas = new E(), this.hitCanvas = new R({ pixelRatio: 1 }), this._waitingForDraw = false, this.on("visibleChange.konva", this._checkVisibility), this._checkVisibility(), this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled), this._setSmoothEnabled();
          }
          createPNGStream() {
            return this.canvas._canvas.createPNGStream();
          }
          getCanvas() {
            return this.canvas;
          }
          getNativeCanvasElement() {
            return this.canvas._canvas;
          }
          getHitCanvas() {
            return this.hitCanvas;
          }
          getContext() {
            return this.getCanvas().getContext();
          }
          clear(t2) {
            return this.getContext().clear(t2), this.getHitCanvas().getContext().clear(t2), this;
          }
          setZIndex(t2) {
            super.setZIndex(t2);
            var e2 = this.getStage();
            return e2 && e2.content && (e2.content.removeChild(this.getNativeCanvasElement()), t2 < e2.children.length - 1 ? e2.content.insertBefore(this.getNativeCanvasElement(), e2.children[t2 + 1].getCanvas()._canvas) : e2.content.appendChild(this.getNativeCanvasElement())), this;
          }
          moveToTop() {
            K.prototype.moveToTop.call(this);
            var t2 = this.getStage();
            return t2 && t2.content && (t2.content.removeChild(this.getNativeCanvasElement()), t2.content.appendChild(this.getNativeCanvasElement())), true;
          }
          moveUp() {
            if (!K.prototype.moveUp.call(this))
              return false;
            var t2 = this.getStage();
            return !(!t2 || !t2.content) && (t2.content.removeChild(this.getNativeCanvasElement()), this.index < t2.children.length - 1 ? t2.content.insertBefore(this.getNativeCanvasElement(), t2.children[this.index + 1].getCanvas()._canvas) : t2.content.appendChild(this.getNativeCanvasElement()), true);
          }
          moveDown() {
            if (K.prototype.moveDown.call(this)) {
              var t2 = this.getStage();
              if (t2) {
                var e2 = t2.children;
                t2.content && (t2.content.removeChild(this.getNativeCanvasElement()), t2.content.insertBefore(this.getNativeCanvasElement(), e2[this.index + 1].getCanvas()._canvas));
              }
              return true;
            }
            return false;
          }
          moveToBottom() {
            if (K.prototype.moveToBottom.call(this)) {
              var t2 = this.getStage();
              if (t2) {
                var e2 = t2.children;
                t2.content && (t2.content.removeChild(this.getNativeCanvasElement()), t2.content.insertBefore(this.getNativeCanvasElement(), e2[1].getCanvas()._canvas));
              }
              return true;
            }
            return false;
          }
          getLayer() {
            return this;
          }
          remove() {
            var t2 = this.getNativeCanvasElement();
            return K.prototype.remove.call(this), t2 && t2.parentNode && g._isInDocument(t2) && t2.parentNode.removeChild(t2), this;
          }
          getStage() {
            return this.parent;
          }
          setSize({ width: t2, height: e2 }) {
            return this.canvas.setSize(t2, e2), this.hitCanvas.setSize(t2, e2), this._setSmoothEnabled(), this;
          }
          _validateAdd(t2) {
            var e2 = t2.getType();
            e2 !== "Group" && e2 !== "Shape" && g.throw("You may only add groups and shapes to a layer.");
          }
          _toKonvaCanvas(t2) {
            return (t2 = t2 || {}).width = t2.width || this.getWidth(), t2.height = t2.height || this.getHeight(), t2.x = t2.x !== void 0 ? t2.x : this.x(), t2.y = t2.y !== void 0 ? t2.y : this.y(), K.prototype._toKonvaCanvas.call(this, t2);
          }
          _checkVisibility() {
            const t2 = this.visible();
            this.canvas._canvas.style.display = t2 ? "block" : "none";
          }
          _setSmoothEnabled() {
            this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
          }
          getWidth() {
            if (this.parent)
              return this.parent.width();
          }
          setWidth() {
            g.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
          }
          getHeight() {
            if (this.parent)
              return this.parent.height();
          }
          setHeight() {
            g.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
          }
          batchDraw() {
            return this._waitingForDraw || (this._waitingForDraw = true, g.requestAnimFrame(() => {
              this.draw(), this._waitingForDraw = false;
            })), this;
          }
          getIntersection(t2) {
            if (!this.isListening() || !this.isVisible())
              return null;
            for (var e2 = 1, i2 = false; ; ) {
              for (let r2 = 0; r2 < Ht; r2++) {
                const a2 = Wt[r2], n2 = this._getIntersection({ x: t2.x + a2.x * e2, y: t2.y + a2.y * e2 }), s2 = n2.shape;
                if (s2)
                  return s2;
                if (i2 = !!n2.antialiased, !n2.antialiased)
                  break;
              }
              if (!i2)
                return null;
              e2 += 1;
            }
          }
          _getIntersection(t2) {
            const e2 = this.hitCanvas.pixelRatio, i2 = this.hitCanvas.context.getImageData(Math.round(t2.x * e2), Math.round(t2.y * e2), 1, 1).data, r2 = i2[3];
            if (r2 === 255) {
              const t3 = g._rgbToHex(i2[0], i2[1], i2[2]), e3 = Bt["#" + t3];
              return e3 ? { shape: e3 } : { antialiased: true };
            }
            return r2 > 0 ? { antialiased: true } : {};
          }
          drawScene(t2, e2) {
            var i2 = this.getLayer(), r2 = t2 || i2 && i2.getCanvas();
            return this._fire("beforeDraw", { node: this }), this.clearBeforeDraw() && r2.getContext().clear(), J.prototype.drawScene.call(this, r2, e2), this._fire("draw", { node: this }), this;
          }
          drawHit(t2, e2) {
            var i2 = this.getLayer(), r2 = t2 || i2 && i2.hitCanvas;
            return i2 && i2.clearBeforeDraw() && i2.getHitCanvas().getContext().clear(), J.prototype.drawHit.call(this, r2, e2), this;
          }
          enableHitGraph() {
            return this.hitGraphEnabled(true), this;
          }
          disableHitGraph() {
            return this.hitGraphEnabled(false), this;
          }
          setHitGraphEnabled(t2) {
            g.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening(t2);
          }
          getHitGraphEnabled(t2) {
            return g.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead."), this.listening();
          }
          toggleHitCanvas() {
            if (this.parent && this.parent.content) {
              var t2 = this.parent;
              !!this.hitCanvas._canvas.parentNode ? t2.content.removeChild(this.hitCanvas._canvas) : t2.content.appendChild(this.hitCanvas._canvas);
            }
          }
        }
        Yt.prototype.nodeType = "Layer", r(Yt), w.addGetterSetter(Yt, "imageSmoothingEnabled", true), w.addGetterSetter(Yt, "clearBeforeDraw", true), w.addGetterSetter(Yt, "hitGraphEnabled", true, x());
        class Xt extends Yt {
          constructor(t2) {
            super(t2), this.listening(false), g.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
          }
        }
        Xt.prototype.nodeType = "FastLayer", r(Xt);
        class jt extends J {
          _validateAdd(t2) {
            var e2 = t2.getType();
            e2 !== "Group" && e2 !== "Shape" && g.throw("You may only add groups and shapes to groups.");
          }
        }
        jt.prototype.nodeType = "Group", r(jt);
        var Ut = e.performance && e.performance.now ? function() {
          return e.performance.now();
        } : function() {
          return new Date().getTime();
        };
        class qt {
          constructor(t2, e2) {
            this.id = qt.animIdCounter++, this.frame = { time: 0, timeDiff: 0, lastTime: Ut(), frameRate: 0 }, this.func = t2, this.setLayers(e2);
          }
          setLayers(t2) {
            var e2 = [];
            return e2 = t2 ? t2.length > 0 ? t2 : [t2] : [], this.layers = e2, this;
          }
          getLayers() {
            return this.layers;
          }
          addLayer(t2) {
            var e2, i2 = this.layers, r2 = i2.length;
            for (e2 = 0; e2 < r2; e2++)
              if (i2[e2]._id === t2._id)
                return false;
            return this.layers.push(t2), true;
          }
          isRunning() {
            var t2, e2 = qt.animations, i2 = e2.length;
            for (t2 = 0; t2 < i2; t2++)
              if (e2[t2].id === this.id)
                return true;
            return false;
          }
          start() {
            return this.stop(), this.frame.timeDiff = 0, this.frame.lastTime = Ut(), qt._addAnimation(this), this;
          }
          stop() {
            return qt._removeAnimation(this), this;
          }
          _updateFrameObject(t2) {
            this.frame.timeDiff = t2 - this.frame.lastTime, this.frame.lastTime = t2, this.frame.time += this.frame.timeDiff, this.frame.frameRate = 1e3 / this.frame.timeDiff;
          }
          static _addAnimation(t2) {
            this.animations.push(t2), this._handleAnimation();
          }
          static _removeAnimation(t2) {
            var e2, i2 = t2.id, r2 = this.animations, a2 = r2.length;
            for (e2 = 0; e2 < a2; e2++)
              if (r2[e2].id === i2) {
                this.animations.splice(e2, 1);
                break;
              }
          }
          static _runFrames() {
            var t2, e2, i2, r2, a2, n2, s2, o2, h2 = {}, l2 = this.animations;
            for (r2 = 0; r2 < l2.length; r2++)
              if (e2 = (t2 = l2[r2]).layers, i2 = t2.func, t2._updateFrameObject(Ut()), n2 = e2.length, !i2 || i2.call(t2, t2.frame) !== false)
                for (a2 = 0; a2 < n2; a2++)
                  (s2 = e2[a2])._id !== void 0 && (h2[s2._id] = s2);
            for (o2 in h2)
              h2.hasOwnProperty(o2) && h2[o2].batchDraw();
          }
          static _animationLoop() {
            var t2 = qt;
            t2.animations.length ? (t2._runFrames(), g.requestAnimFrame(t2._animationLoop)) : t2.animRunning = false;
          }
          static _handleAnimation() {
            this.animRunning || (this.animRunning = true, g.requestAnimFrame(this._animationLoop));
          }
        }
        qt.animations = [], qt.animIdCounter = 0, qt.animRunning = false;
        var Vt = { node: 1, duration: 1, easing: 1, onFinish: 1, yoyo: 1 }, Kt = 0, Qt = ["fill", "stroke", "shadowColor"];
        class Jt {
          constructor(t2, e2, i2, r2, a2, n2, s2) {
            this.prop = t2, this.propFunc = e2, this.begin = r2, this._pos = r2, this.duration = n2, this._change = 0, this.prevPos = 0, this.yoyo = s2, this._time = 0, this._position = 0, this._startTime = 0, this._finish = 0, this.func = i2, this._change = a2 - this.begin, this.pause();
          }
          fire(t2) {
            var e2 = this[t2];
            e2 && e2();
          }
          setTime(t2) {
            t2 > this.duration ? this.yoyo ? (this._time = this.duration, this.reverse()) : this.finish() : t2 < 0 ? this.yoyo ? (this._time = 0, this.play()) : this.reset() : (this._time = t2, this.update());
          }
          getTime() {
            return this._time;
          }
          setPosition(t2) {
            this.prevPos = this._pos, this.propFunc(t2), this._pos = t2;
          }
          getPosition(t2) {
            return t2 === void 0 && (t2 = this._time), this.func(t2, this.begin, this._change, this.duration);
          }
          play() {
            this.state = 2, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onPlay");
          }
          reverse() {
            this.state = 3, this._time = this.duration - this._time, this._startTime = this.getTimer() - this._time, this.onEnterFrame(), this.fire("onReverse");
          }
          seek(t2) {
            this.pause(), this._time = t2, this.update(), this.fire("onSeek");
          }
          reset() {
            this.pause(), this._time = 0, this.update(), this.fire("onReset");
          }
          finish() {
            this.pause(), this._time = this.duration, this.update(), this.fire("onFinish");
          }
          update() {
            this.setPosition(this.getPosition(this._time)), this.fire("onUpdate");
          }
          onEnterFrame() {
            var t2 = this.getTimer() - this._startTime;
            this.state === 2 ? this.setTime(t2) : this.state === 3 && this.setTime(this.duration - t2);
          }
          pause() {
            this.state = 1, this.fire("onPause");
          }
          getTimer() {
            return new Date().getTime();
          }
        }
        class Zt {
          constructor(t2) {
            var e2, r2, a2 = this, n2 = t2.node, s2 = n2._id, o2 = t2.easing || $t.Linear, h2 = !!t2.yoyo;
            e2 = t2.duration === void 0 ? 0.3 : t2.duration === 0 ? 1e-3 : t2.duration, this.node = n2, this._id = Kt++;
            var l2 = n2.getLayer() || (n2 instanceof i.Stage ? n2.getLayers() : null);
            for (r2 in l2 || g.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."), this.anim = new qt(function() {
              a2.tween.onEnterFrame();
            }, l2), this.tween = new Jt(r2, function(t3) {
              a2._tweenFunc(t3);
            }, o2, 0, 1, 1e3 * e2, h2), this._addListeners(), Zt.attrs[s2] || (Zt.attrs[s2] = {}), Zt.attrs[s2][this._id] || (Zt.attrs[s2][this._id] = {}), Zt.tweens[s2] || (Zt.tweens[s2] = {}), t2)
              Vt[r2] === void 0 && this._addAttr(r2, t2[r2]);
            this.reset(), this.onFinish = t2.onFinish, this.onReset = t2.onReset, this.onUpdate = t2.onUpdate;
          }
          _addAttr(t2, e2) {
            var i2, r2, a2, n2, s2, o2, h2, l2, d2 = this.node, c2 = d2._id;
            if ((a2 = Zt.tweens[c2][t2]) && delete Zt.attrs[c2][a2][t2], i2 = d2.getAttr(t2), g._isArray(e2))
              if (r2 = [], s2 = Math.max(e2.length, i2.length), t2 === "points" && e2.length !== i2.length && (e2.length > i2.length ? (h2 = i2, i2 = g._prepareArrayForTween(i2, e2, d2.closed())) : (o2 = e2, e2 = g._prepareArrayForTween(e2, i2, d2.closed()))), t2.indexOf("fill") === 0)
                for (n2 = 0; n2 < s2; n2++)
                  if (n2 % 2 == 0)
                    r2.push(e2[n2] - i2[n2]);
                  else {
                    var u2 = g.colorToRGBA(i2[n2]);
                    l2 = g.colorToRGBA(e2[n2]), i2[n2] = u2, r2.push({ r: l2.r - u2.r, g: l2.g - u2.g, b: l2.b - u2.b, a: l2.a - u2.a });
                  }
              else
                for (n2 = 0; n2 < s2; n2++)
                  r2.push(e2[n2] - i2[n2]);
            else
              Qt.indexOf(t2) !== -1 ? (i2 = g.colorToRGBA(i2), r2 = { r: (l2 = g.colorToRGBA(e2)).r - i2.r, g: l2.g - i2.g, b: l2.b - i2.b, a: l2.a - i2.a }) : r2 = e2 - i2;
            Zt.attrs[c2][this._id][t2] = { start: i2, diff: r2, end: e2, trueEnd: o2, trueStart: h2 }, Zt.tweens[c2][t2] = this._id;
          }
          _tweenFunc(t2) {
            var e2, i2, r2, a2, n2, s2, o2, h2, l2 = this.node, d2 = Zt.attrs[l2._id][this._id];
            for (e2 in d2) {
              if (r2 = (i2 = d2[e2]).start, a2 = i2.diff, h2 = i2.end, g._isArray(r2))
                if (n2 = [], o2 = Math.max(r2.length, h2.length), e2.indexOf("fill") === 0)
                  for (s2 = 0; s2 < o2; s2++)
                    s2 % 2 == 0 ? n2.push((r2[s2] || 0) + a2[s2] * t2) : n2.push("rgba(" + Math.round(r2[s2].r + a2[s2].r * t2) + "," + Math.round(r2[s2].g + a2[s2].g * t2) + "," + Math.round(r2[s2].b + a2[s2].b * t2) + "," + (r2[s2].a + a2[s2].a * t2) + ")");
                else
                  for (s2 = 0; s2 < o2; s2++)
                    n2.push((r2[s2] || 0) + a2[s2] * t2);
              else
                n2 = Qt.indexOf(e2) !== -1 ? "rgba(" + Math.round(r2.r + a2.r * t2) + "," + Math.round(r2.g + a2.g * t2) + "," + Math.round(r2.b + a2.b * t2) + "," + (r2.a + a2.a * t2) + ")" : r2 + a2 * t2;
              l2.setAttr(e2, n2);
            }
          }
          _addListeners() {
            this.tween.onPlay = () => {
              this.anim.start();
            }, this.tween.onReverse = () => {
              this.anim.start();
            }, this.tween.onPause = () => {
              this.anim.stop();
            }, this.tween.onFinish = () => {
              var t2 = this.node, e2 = Zt.attrs[t2._id][this._id];
              e2.points && e2.points.trueEnd && t2.setAttr("points", e2.points.trueEnd), this.onFinish && this.onFinish.call(this);
            }, this.tween.onReset = () => {
              var t2 = this.node, e2 = Zt.attrs[t2._id][this._id];
              e2.points && e2.points.trueStart && t2.points(e2.points.trueStart), this.onReset && this.onReset();
            }, this.tween.onUpdate = () => {
              this.onUpdate && this.onUpdate.call(this);
            };
          }
          play() {
            return this.tween.play(), this;
          }
          reverse() {
            return this.tween.reverse(), this;
          }
          reset() {
            return this.tween.reset(), this;
          }
          seek(t2) {
            return this.tween.seek(1e3 * t2), this;
          }
          pause() {
            return this.tween.pause(), this;
          }
          finish() {
            return this.tween.finish(), this;
          }
          destroy() {
            var t2, e2 = this.node._id, i2 = this._id, r2 = Zt.tweens[e2];
            for (t2 in this.pause(), r2)
              delete Zt.tweens[e2][t2];
            delete Zt.attrs[e2][i2];
          }
        }
        Zt.attrs = {}, Zt.tweens = {}, K.prototype.to = function(t2) {
          var e2 = t2.onFinish;
          t2.node = this, t2.onFinish = function() {
            this.destroy(), e2 && e2();
          }, new Zt(t2).play();
        };
        const $t = { BackEaseIn(t2, e2, i2, r2) {
          var a2 = 1.70158;
          return i2 * (t2 /= r2) * t2 * ((a2 + 1) * t2 - a2) + e2;
        }, BackEaseOut(t2, e2, i2, r2) {
          var a2 = 1.70158;
          return i2 * ((t2 = t2 / r2 - 1) * t2 * ((a2 + 1) * t2 + a2) + 1) + e2;
        }, BackEaseInOut(t2, e2, i2, r2) {
          var a2 = 1.70158;
          return (t2 /= r2 / 2) < 1 ? i2 / 2 * (t2 * t2 * ((1 + (a2 *= 1.525)) * t2 - a2)) + e2 : i2 / 2 * ((t2 -= 2) * t2 * ((1 + (a2 *= 1.525)) * t2 + a2) + 2) + e2;
        }, ElasticEaseIn(t2, e2, i2, r2, a2, n2) {
          var s2 = 0;
          return t2 === 0 ? e2 : (t2 /= r2) == 1 ? e2 + i2 : (n2 || (n2 = 0.3 * r2), !a2 || a2 < Math.abs(i2) ? (a2 = i2, s2 = n2 / 4) : s2 = n2 / (2 * Math.PI) * Math.asin(i2 / a2), -a2 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * r2 - s2) * (2 * Math.PI) / n2) + e2);
        }, ElasticEaseOut(t2, e2, i2, r2, a2, n2) {
          var s2 = 0;
          return t2 === 0 ? e2 : (t2 /= r2) == 1 ? e2 + i2 : (n2 || (n2 = 0.3 * r2), !a2 || a2 < Math.abs(i2) ? (a2 = i2, s2 = n2 / 4) : s2 = n2 / (2 * Math.PI) * Math.asin(i2 / a2), a2 * Math.pow(2, -10 * t2) * Math.sin((t2 * r2 - s2) * (2 * Math.PI) / n2) + i2 + e2);
        }, ElasticEaseInOut(t2, e2, i2, r2, a2, n2) {
          var s2 = 0;
          return t2 === 0 ? e2 : (t2 /= r2 / 2) == 2 ? e2 + i2 : (n2 || (n2 = r2 * (0.3 * 1.5)), !a2 || a2 < Math.abs(i2) ? (a2 = i2, s2 = n2 / 4) : s2 = n2 / (2 * Math.PI) * Math.asin(i2 / a2), t2 < 1 ? a2 * Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 * r2 - s2) * (2 * Math.PI) / n2) * -0.5 + e2 : a2 * Math.pow(2, -10 * (t2 -= 1)) * Math.sin((t2 * r2 - s2) * (2 * Math.PI) / n2) * 0.5 + i2 + e2);
        }, BounceEaseOut: (t2, e2, i2, r2) => (t2 /= r2) < 1 / 2.75 ? i2 * (7.5625 * t2 * t2) + e2 : t2 < 2 / 2.75 ? i2 * (7.5625 * (t2 -= 1.5 / 2.75) * t2 + 0.75) + e2 : t2 < 2.5 / 2.75 ? i2 * (7.5625 * (t2 -= 2.25 / 2.75) * t2 + 0.9375) + e2 : i2 * (7.5625 * (t2 -= 2.625 / 2.75) * t2 + 0.984375) + e2, BounceEaseIn: (t2, e2, i2, r2) => i2 - $t.BounceEaseOut(r2 - t2, 0, i2, r2) + e2, BounceEaseInOut: (t2, e2, i2, r2) => t2 < r2 / 2 ? 0.5 * $t.BounceEaseIn(2 * t2, 0, i2, r2) + e2 : 0.5 * $t.BounceEaseOut(2 * t2 - r2, 0, i2, r2) + 0.5 * i2 + e2, EaseIn: (t2, e2, i2, r2) => i2 * (t2 /= r2) * t2 + e2, EaseOut: (t2, e2, i2, r2) => -i2 * (t2 /= r2) * (t2 - 2) + e2, EaseInOut: (t2, e2, i2, r2) => (t2 /= r2 / 2) < 1 ? i2 / 2 * t2 * t2 + e2 : -i2 / 2 * (--t2 * (t2 - 2) - 1) + e2, StrongEaseIn: (t2, e2, i2, r2) => i2 * (t2 /= r2) * t2 * t2 * t2 * t2 + e2, StrongEaseOut: (t2, e2, i2, r2) => i2 * ((t2 = t2 / r2 - 1) * t2 * t2 * t2 * t2 + 1) + e2, StrongEaseInOut: (t2, e2, i2, r2) => (t2 /= r2 / 2) < 1 ? i2 / 2 * t2 * t2 * t2 * t2 * t2 + e2 : i2 / 2 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2) + e2, Linear: (t2, e2, i2, r2) => i2 * t2 / r2 + e2 }, te = g._assign(i, { Util: g, Transform: a, Node: K, Container: J, Stage: Et, stages: Gt, Layer: Yt, FastLayer: Xt, Group: jt, DD: L, Shape: zt, shapes: Bt, Animation: qt, Tween: Zt, Easings: $t, Context: k, Canvas: G });
        class ee extends zt {
          _sceneFunc(t2) {
            var e2 = i.getAngle(this.angle()), r2 = this.clockwise();
            t2.beginPath(), t2.arc(0, 0, this.outerRadius(), 0, e2, r2), t2.arc(0, 0, this.innerRadius(), e2, 0, !r2), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.outerRadius();
          }
          getHeight() {
            return 2 * this.outerRadius();
          }
          setWidth(t2) {
            this.outerRadius(t2 / 2);
          }
          setHeight(t2) {
            this.outerRadius(t2 / 2);
          }
          getSelfRect() {
            const t2 = this.innerRadius(), e2 = this.outerRadius(), r2 = this.clockwise(), a2 = i.getAngle(r2 ? 360 - this.angle() : this.angle()), n2 = Math.cos(Math.min(a2, Math.PI)), s2 = Math.sin(Math.min(Math.max(Math.PI, a2), 3 * Math.PI / 2)), o2 = Math.sin(Math.min(a2, Math.PI / 2)), h2 = n2 * (n2 > 0 ? t2 : e2), l2 = s2 * (s2 > 0 ? t2 : e2), d2 = o2 * (o2 > 0 ? e2 : t2);
            return { x: h2, y: r2 ? -1 * d2 : l2, width: 1 * e2 - h2, height: d2 - l2 };
          }
        }
        function ie(t2, e2, i2, r2, a2, n2, s2) {
          var o2 = Math.sqrt(Math.pow(i2 - t2, 2) + Math.pow(r2 - e2, 2)), h2 = Math.sqrt(Math.pow(a2 - i2, 2) + Math.pow(n2 - r2, 2)), l2 = s2 * o2 / (o2 + h2), d2 = s2 * h2 / (o2 + h2);
          return [i2 - l2 * (a2 - t2), r2 - l2 * (n2 - e2), i2 + d2 * (a2 - t2), r2 + d2 * (n2 - e2)];
        }
        function re(t2, e2) {
          var i2, r2, a2 = t2.length, n2 = [];
          for (i2 = 2; i2 < a2 - 2; i2 += 2)
            r2 = ie(t2[i2 - 2], t2[i2 - 1], t2[i2], t2[i2 + 1], t2[i2 + 2], t2[i2 + 3], e2), isNaN(r2[0]) || (n2.push(r2[0]), n2.push(r2[1]), n2.push(t2[i2]), n2.push(t2[i2 + 1]), n2.push(r2[2]), n2.push(r2[3]));
          return n2;
        }
        ee.prototype._centroid = true, ee.prototype.className = "Arc", ee.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], r(ee), w.addGetterSetter(ee, "innerRadius", 0, p()), w.addGetterSetter(ee, "outerRadius", 0, p()), w.addGetterSetter(ee, "angle", 0, p()), w.addGetterSetter(ee, "clockwise", false, x());
        class ae extends zt {
          constructor(t2) {
            super(t2), this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
              this._clearCache("tensionPoints");
            });
          }
          _sceneFunc(t2) {
            var e2, i2, r2, a2 = this.points(), n2 = a2.length, s2 = this.tension(), o2 = this.closed(), h2 = this.bezier();
            if (n2) {
              if (t2.beginPath(), t2.moveTo(a2[0], a2[1]), s2 !== 0 && n2 > 4) {
                for (i2 = (e2 = this.getTensionPoints()).length, r2 = o2 ? 0 : 4, o2 || t2.quadraticCurveTo(e2[0], e2[1], e2[2], e2[3]); r2 < i2 - 2; )
                  t2.bezierCurveTo(e2[r2++], e2[r2++], e2[r2++], e2[r2++], e2[r2++], e2[r2++]);
                o2 || t2.quadraticCurveTo(e2[i2 - 2], e2[i2 - 1], a2[n2 - 2], a2[n2 - 1]);
              } else if (h2)
                for (r2 = 2; r2 < n2; )
                  t2.bezierCurveTo(a2[r2++], a2[r2++], a2[r2++], a2[r2++], a2[r2++], a2[r2++]);
              else
                for (r2 = 2; r2 < n2; r2 += 2)
                  t2.lineTo(a2[r2], a2[r2 + 1]);
              o2 ? (t2.closePath(), t2.fillStrokeShape(this)) : t2.strokeShape(this);
            }
          }
          getTensionPoints() {
            return this._getCache("tensionPoints", this._getTensionPoints);
          }
          _getTensionPoints() {
            return this.closed() ? this._getTensionPointsClosed() : re(this.points(), this.tension());
          }
          _getTensionPointsClosed() {
            var t2 = this.points(), e2 = t2.length, i2 = this.tension(), r2 = ie(t2[e2 - 2], t2[e2 - 1], t2[0], t2[1], t2[2], t2[3], i2), a2 = ie(t2[e2 - 4], t2[e2 - 3], t2[e2 - 2], t2[e2 - 1], t2[0], t2[1], i2), n2 = re(t2, i2);
            return [r2[2], r2[3]].concat(n2).concat([a2[0], a2[1], t2[e2 - 2], t2[e2 - 1], a2[2], a2[3], r2[0], r2[1], t2[0], t2[1]]);
          }
          getWidth() {
            return this.getSelfRect().width;
          }
          getHeight() {
            return this.getSelfRect().height;
          }
          getSelfRect() {
            var t2 = this.points();
            if (t2.length < 4)
              return { x: t2[0] || 0, y: t2[1] || 0, width: 0, height: 0 };
            for (var e2, i2, r2 = (t2 = this.tension() !== 0 ? [t2[0], t2[1], ...this._getTensionPoints(), t2[t2.length - 2], t2[t2.length - 1]] : this.points())[0], a2 = t2[0], n2 = t2[1], s2 = t2[1], o2 = 0; o2 < t2.length / 2; o2++)
              e2 = t2[2 * o2], i2 = t2[2 * o2 + 1], r2 = Math.min(r2, e2), a2 = Math.max(a2, e2), n2 = Math.min(n2, i2), s2 = Math.max(s2, i2);
            return { x: r2, y: n2, width: a2 - r2, height: s2 - n2 };
          }
        }
        ae.prototype.className = "Line", ae.prototype._attrsAffectingSize = ["points", "bezier", "tension"], r(ae), w.addGetterSetter(ae, "closed", false), w.addGetterSetter(ae, "bezier", false), w.addGetterSetter(ae, "tension", 0, p()), w.addGetterSetter(ae, "points", [], function() {
          if (i.isUnminified)
            return function(t2, e2) {
              return g._isArray(t2) ? t2.forEach(function(t3) {
                g._isNumber(t3) || g.warn('"' + e2 + '" attribute has non numeric element ' + t3 + ". Make sure that all elements are numbers.");
              }) : g.warn(u(t2) + ' is a not valid value for "' + e2 + '" attribute. The value should be a array of numbers.'), t2;
            };
        }());
        class ne extends zt {
          constructor(t2) {
            super(t2), this.dataArray = [], this.pathLength = 0, this.dataArray = ne.parsePathData(this.data()), this.pathLength = 0;
            for (var e2 = 0; e2 < this.dataArray.length; ++e2)
              this.pathLength += this.dataArray[e2].pathLength;
            this.on("dataChange.konva", function() {
              this.dataArray = ne.parsePathData(this.data()), this.pathLength = 0;
              for (var t3 = 0; t3 < this.dataArray.length; ++t3)
                this.pathLength += this.dataArray[t3].pathLength;
            });
          }
          _sceneFunc(t2) {
            var e2 = this.dataArray;
            t2.beginPath();
            for (var i2 = false, r2 = 0; r2 < e2.length; r2++) {
              var a2 = e2[r2].command, n2 = e2[r2].points;
              switch (a2) {
                case "L":
                  t2.lineTo(n2[0], n2[1]);
                  break;
                case "M":
                  t2.moveTo(n2[0], n2[1]);
                  break;
                case "C":
                  t2.bezierCurveTo(n2[0], n2[1], n2[2], n2[3], n2[4], n2[5]);
                  break;
                case "Q":
                  t2.quadraticCurveTo(n2[0], n2[1], n2[2], n2[3]);
                  break;
                case "A":
                  var s2 = n2[0], o2 = n2[1], h2 = n2[2], l2 = n2[3], d2 = n2[4], c2 = n2[5], g2 = n2[6], u2 = n2[7], f2 = h2 > l2 ? h2 : l2, p2 = h2 > l2 ? 1 : h2 / l2, v2 = h2 > l2 ? l2 / h2 : 1;
                  t2.translate(s2, o2), t2.rotate(g2), t2.scale(p2, v2), t2.arc(0, 0, f2, d2, d2 + c2, 1 - u2), t2.scale(1 / p2, 1 / v2), t2.rotate(-g2), t2.translate(-s2, -o2);
                  break;
                case "z":
                  i2 = true, t2.closePath();
              }
            }
            i2 || this.hasFill() ? t2.fillStrokeShape(this) : t2.strokeShape(this);
          }
          getSelfRect() {
            var t2 = [];
            this.dataArray.forEach(function(e3) {
              if (e3.command === "A") {
                var i3 = e3.points[4], r3 = e3.points[5], a3 = e3.points[4] + r3, n3 = Math.PI / 180;
                if (Math.abs(i3 - a3) < n3 && (n3 = Math.abs(i3 - a3)), r3 < 0)
                  for (let r4 = i3 - n3; r4 > a3; r4 -= n3) {
                    const i4 = ne.getPointOnEllipticalArc(e3.points[0], e3.points[1], e3.points[2], e3.points[3], r4, 0);
                    t2.push(i4.x, i4.y);
                  }
                else
                  for (let r4 = i3 + n3; r4 < a3; r4 += n3) {
                    const i4 = ne.getPointOnEllipticalArc(e3.points[0], e3.points[1], e3.points[2], e3.points[3], r4, 0);
                    t2.push(i4.x, i4.y);
                  }
              } else if (e3.command === "C")
                for (let i4 = 0; i4 <= 1; i4 += 0.01) {
                  const r4 = ne.getPointOnCubicBezier(i4, e3.start.x, e3.start.y, e3.points[0], e3.points[1], e3.points[2], e3.points[3], e3.points[4], e3.points[5]);
                  t2.push(r4.x, r4.y);
                }
              else
                t2 = t2.concat(e3.points);
            });
            for (var e2, i2, r2 = t2[0], a2 = t2[0], n2 = t2[1], s2 = t2[1], o2 = 0; o2 < t2.length / 2; o2++)
              e2 = t2[2 * o2], i2 = t2[2 * o2 + 1], isNaN(e2) || (r2 = Math.min(r2, e2), a2 = Math.max(a2, e2)), isNaN(i2) || (n2 = Math.min(n2, i2), s2 = Math.max(s2, i2));
            return { x: r2, y: n2, width: a2 - r2, height: s2 - n2 };
          }
          getLength() {
            return this.pathLength;
          }
          getPointAtLength(t2) {
            var e2, i2 = 0, r2 = this.dataArray.length;
            if (!r2)
              return null;
            for (; i2 < r2 && t2 > this.dataArray[i2].pathLength; )
              t2 -= this.dataArray[i2].pathLength, ++i2;
            if (i2 === r2)
              return { x: (e2 = this.dataArray[i2 - 1].points.slice(-2))[0], y: e2[1] };
            if (t2 < 0.01)
              return { x: (e2 = this.dataArray[i2].points.slice(0, 2))[0], y: e2[1] };
            var a2 = this.dataArray[i2], n2 = a2.points;
            switch (a2.command) {
              case "L":
                return ne.getPointOnLine(t2, a2.start.x, a2.start.y, n2[0], n2[1]);
              case "C":
                return ne.getPointOnCubicBezier(t2 / a2.pathLength, a2.start.x, a2.start.y, n2[0], n2[1], n2[2], n2[3], n2[4], n2[5]);
              case "Q":
                return ne.getPointOnQuadraticBezier(t2 / a2.pathLength, a2.start.x, a2.start.y, n2[0], n2[1], n2[2], n2[3]);
              case "A":
                var s2 = n2[0], o2 = n2[1], h2 = n2[2], l2 = n2[3], d2 = n2[4], c2 = n2[5], g2 = n2[6];
                return d2 += c2 * t2 / a2.pathLength, ne.getPointOnEllipticalArc(s2, o2, h2, l2, d2, g2);
            }
            return null;
          }
          static getLineLength(t2, e2, i2, r2) {
            return Math.sqrt((i2 - t2) * (i2 - t2) + (r2 - e2) * (r2 - e2));
          }
          static getPointOnLine(t2, e2, i2, r2, a2, n2, s2) {
            n2 === void 0 && (n2 = e2), s2 === void 0 && (s2 = i2);
            var o2 = (a2 - i2) / (r2 - e2 + 1e-8), h2 = Math.sqrt(t2 * t2 / (1 + o2 * o2));
            r2 < e2 && (h2 *= -1);
            var l2, d2 = o2 * h2;
            if (r2 === e2)
              l2 = { x: n2, y: s2 + d2 };
            else if ((s2 - i2) / (n2 - e2 + 1e-8) === o2)
              l2 = { x: n2 + h2, y: s2 + d2 };
            else {
              var c2, g2, u2 = this.getLineLength(e2, i2, r2, a2), f2 = (n2 - e2) * (r2 - e2) + (s2 - i2) * (a2 - i2);
              c2 = e2 + (f2 /= u2 * u2) * (r2 - e2), g2 = i2 + f2 * (a2 - i2);
              var p2 = this.getLineLength(n2, s2, c2, g2), v2 = Math.sqrt(t2 * t2 - p2 * p2);
              h2 = Math.sqrt(v2 * v2 / (1 + o2 * o2)), r2 < e2 && (h2 *= -1), l2 = { x: c2 + h2, y: g2 + (d2 = o2 * h2) };
            }
            return l2;
          }
          static getPointOnCubicBezier(t2, e2, i2, r2, a2, n2, s2, o2, h2) {
            function l2(t3) {
              return t3 * t3 * t3;
            }
            function d2(t3) {
              return 3 * t3 * t3 * (1 - t3);
            }
            function c2(t3) {
              return 3 * t3 * (1 - t3) * (1 - t3);
            }
            function g2(t3) {
              return (1 - t3) * (1 - t3) * (1 - t3);
            }
            return { x: o2 * l2(t2) + n2 * d2(t2) + r2 * c2(t2) + e2 * g2(t2), y: h2 * l2(t2) + s2 * d2(t2) + a2 * c2(t2) + i2 * g2(t2) };
          }
          static getPointOnQuadraticBezier(t2, e2, i2, r2, a2, n2, s2) {
            function o2(t3) {
              return t3 * t3;
            }
            function h2(t3) {
              return 2 * t3 * (1 - t3);
            }
            function l2(t3) {
              return (1 - t3) * (1 - t3);
            }
            return { x: n2 * o2(t2) + r2 * h2(t2) + e2 * l2(t2), y: s2 * o2(t2) + a2 * h2(t2) + i2 * l2(t2) };
          }
          static getPointOnEllipticalArc(t2, e2, i2, r2, a2, n2) {
            var s2 = Math.cos(n2), o2 = Math.sin(n2), h2 = i2 * Math.cos(a2), l2 = r2 * Math.sin(a2);
            return { x: t2 + (h2 * s2 - l2 * o2), y: e2 + (h2 * o2 + l2 * s2) };
          }
          static parsePathData(t2) {
            if (!t2)
              return [];
            var e2 = t2, i2 = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"];
            e2 = e2.replace(new RegExp(" ", "g"), ",");
            for (var r2 = 0; r2 < i2.length; r2++)
              e2 = e2.replace(new RegExp(i2[r2], "g"), "|" + i2[r2]);
            var a2, n2 = e2.split("|"), s2 = [], o2 = [], h2 = 0, l2 = 0, d2 = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
            for (r2 = 1; r2 < n2.length; r2++) {
              var c2 = n2[r2], g2 = c2.charAt(0);
              for (c2 = c2.slice(1), o2.length = 0; a2 = d2.exec(c2); )
                o2.push(a2[0]);
              for (var u2 = [], f2 = 0, p2 = o2.length; f2 < p2; f2++)
                if (o2[f2] !== "00") {
                  var v2 = parseFloat(o2[f2]);
                  isNaN(v2) ? u2.push(0) : u2.push(v2);
                } else
                  u2.push(0, 0);
              for (; u2.length > 0 && !isNaN(u2[0]); ) {
                var m2, _2, y2, x2, b2, S2, w2, C2, P2, k2, T2 = null, A2 = [], M2 = h2, G2 = l2;
                switch (g2) {
                  case "l":
                    h2 += u2.shift(), l2 += u2.shift(), T2 = "L", A2.push(h2, l2);
                    break;
                  case "L":
                    h2 = u2.shift(), l2 = u2.shift(), A2.push(h2, l2);
                    break;
                  case "m":
                    var E2 = u2.shift(), R2 = u2.shift();
                    if (h2 += E2, l2 += R2, T2 = "M", s2.length > 2 && s2[s2.length - 1].command === "z") {
                      for (var L2 = s2.length - 2; L2 >= 0; L2--)
                        if (s2[L2].command === "M") {
                          h2 = s2[L2].points[0] + E2, l2 = s2[L2].points[1] + R2;
                          break;
                        }
                    }
                    A2.push(h2, l2), g2 = "l";
                    break;
                  case "M":
                    h2 = u2.shift(), l2 = u2.shift(), T2 = "M", A2.push(h2, l2), g2 = "L";
                    break;
                  case "h":
                    h2 += u2.shift(), T2 = "L", A2.push(h2, l2);
                    break;
                  case "H":
                    h2 = u2.shift(), T2 = "L", A2.push(h2, l2);
                    break;
                  case "v":
                    l2 += u2.shift(), T2 = "L", A2.push(h2, l2);
                    break;
                  case "V":
                    l2 = u2.shift(), T2 = "L", A2.push(h2, l2);
                    break;
                  case "C":
                    A2.push(u2.shift(), u2.shift(), u2.shift(), u2.shift()), h2 = u2.shift(), l2 = u2.shift(), A2.push(h2, l2);
                    break;
                  case "c":
                    A2.push(h2 + u2.shift(), l2 + u2.shift(), h2 + u2.shift(), l2 + u2.shift()), h2 += u2.shift(), l2 += u2.shift(), T2 = "C", A2.push(h2, l2);
                    break;
                  case "S":
                    _2 = h2, y2 = l2, (m2 = s2[s2.length - 1]).command === "C" && (_2 = h2 + (h2 - m2.points[2]), y2 = l2 + (l2 - m2.points[3])), A2.push(_2, y2, u2.shift(), u2.shift()), h2 = u2.shift(), l2 = u2.shift(), T2 = "C", A2.push(h2, l2);
                    break;
                  case "s":
                    _2 = h2, y2 = l2, (m2 = s2[s2.length - 1]).command === "C" && (_2 = h2 + (h2 - m2.points[2]), y2 = l2 + (l2 - m2.points[3])), A2.push(_2, y2, h2 + u2.shift(), l2 + u2.shift()), h2 += u2.shift(), l2 += u2.shift(), T2 = "C", A2.push(h2, l2);
                    break;
                  case "Q":
                    A2.push(u2.shift(), u2.shift()), h2 = u2.shift(), l2 = u2.shift(), A2.push(h2, l2);
                    break;
                  case "q":
                    A2.push(h2 + u2.shift(), l2 + u2.shift()), h2 += u2.shift(), l2 += u2.shift(), T2 = "Q", A2.push(h2, l2);
                    break;
                  case "T":
                    _2 = h2, y2 = l2, (m2 = s2[s2.length - 1]).command === "Q" && (_2 = h2 + (h2 - m2.points[0]), y2 = l2 + (l2 - m2.points[1])), h2 = u2.shift(), l2 = u2.shift(), T2 = "Q", A2.push(_2, y2, h2, l2);
                    break;
                  case "t":
                    _2 = h2, y2 = l2, (m2 = s2[s2.length - 1]).command === "Q" && (_2 = h2 + (h2 - m2.points[0]), y2 = l2 + (l2 - m2.points[1])), h2 += u2.shift(), l2 += u2.shift(), T2 = "Q", A2.push(_2, y2, h2, l2);
                    break;
                  case "A":
                    x2 = u2.shift(), b2 = u2.shift(), S2 = u2.shift(), w2 = u2.shift(), C2 = u2.shift(), P2 = h2, k2 = l2, h2 = u2.shift(), l2 = u2.shift(), T2 = "A", A2 = this.convertEndpointToCenterParameterization(P2, k2, h2, l2, w2, C2, x2, b2, S2);
                    break;
                  case "a":
                    x2 = u2.shift(), b2 = u2.shift(), S2 = u2.shift(), w2 = u2.shift(), C2 = u2.shift(), P2 = h2, k2 = l2, h2 += u2.shift(), l2 += u2.shift(), T2 = "A", A2 = this.convertEndpointToCenterParameterization(P2, k2, h2, l2, w2, C2, x2, b2, S2);
                }
                s2.push({ command: T2 || g2, points: A2, start: { x: M2, y: G2 }, pathLength: this.calcLength(M2, G2, T2 || g2, A2) });
              }
              g2 !== "z" && g2 !== "Z" || s2.push({ command: "z", points: [], start: void 0, pathLength: 0 });
            }
            return s2;
          }
          static calcLength(t2, e2, i2, r2) {
            var a2, n2, s2, o2, h2 = ne;
            switch (i2) {
              case "L":
                return h2.getLineLength(t2, e2, r2[0], r2[1]);
              case "C":
                for (a2 = 0, n2 = h2.getPointOnCubicBezier(0, t2, e2, r2[0], r2[1], r2[2], r2[3], r2[4], r2[5]), o2 = 0.01; o2 <= 1; o2 += 0.01)
                  s2 = h2.getPointOnCubicBezier(o2, t2, e2, r2[0], r2[1], r2[2], r2[3], r2[4], r2[5]), a2 += h2.getLineLength(n2.x, n2.y, s2.x, s2.y), n2 = s2;
                return a2;
              case "Q":
                for (a2 = 0, n2 = h2.getPointOnQuadraticBezier(0, t2, e2, r2[0], r2[1], r2[2], r2[3]), o2 = 0.01; o2 <= 1; o2 += 0.01)
                  s2 = h2.getPointOnQuadraticBezier(o2, t2, e2, r2[0], r2[1], r2[2], r2[3]), a2 += h2.getLineLength(n2.x, n2.y, s2.x, s2.y), n2 = s2;
                return a2;
              case "A":
                a2 = 0;
                var l2 = r2[4], d2 = r2[5], c2 = r2[4] + d2, g2 = Math.PI / 180;
                if (Math.abs(l2 - c2) < g2 && (g2 = Math.abs(l2 - c2)), n2 = h2.getPointOnEllipticalArc(r2[0], r2[1], r2[2], r2[3], l2, 0), d2 < 0)
                  for (o2 = l2 - g2; o2 > c2; o2 -= g2)
                    s2 = h2.getPointOnEllipticalArc(r2[0], r2[1], r2[2], r2[3], o2, 0), a2 += h2.getLineLength(n2.x, n2.y, s2.x, s2.y), n2 = s2;
                else
                  for (o2 = l2 + g2; o2 < c2; o2 += g2)
                    s2 = h2.getPointOnEllipticalArc(r2[0], r2[1], r2[2], r2[3], o2, 0), a2 += h2.getLineLength(n2.x, n2.y, s2.x, s2.y), n2 = s2;
                return s2 = h2.getPointOnEllipticalArc(r2[0], r2[1], r2[2], r2[3], c2, 0), a2 += h2.getLineLength(n2.x, n2.y, s2.x, s2.y);
            }
            return 0;
          }
          static convertEndpointToCenterParameterization(t2, e2, i2, r2, a2, n2, s2, o2, h2) {
            var l2 = h2 * (Math.PI / 180), d2 = Math.cos(l2) * (t2 - i2) / 2 + Math.sin(l2) * (e2 - r2) / 2, c2 = -1 * Math.sin(l2) * (t2 - i2) / 2 + Math.cos(l2) * (e2 - r2) / 2, g2 = d2 * d2 / (s2 * s2) + c2 * c2 / (o2 * o2);
            g2 > 1 && (s2 *= Math.sqrt(g2), o2 *= Math.sqrt(g2));
            var u2 = Math.sqrt((s2 * s2 * (o2 * o2) - s2 * s2 * (c2 * c2) - o2 * o2 * (d2 * d2)) / (s2 * s2 * (c2 * c2) + o2 * o2 * (d2 * d2)));
            a2 === n2 && (u2 *= -1), isNaN(u2) && (u2 = 0);
            var f2 = u2 * s2 * c2 / o2, p2 = u2 * -o2 * d2 / s2, v2 = (t2 + i2) / 2 + Math.cos(l2) * f2 - Math.sin(l2) * p2, m2 = (e2 + r2) / 2 + Math.sin(l2) * f2 + Math.cos(l2) * p2, _2 = function(t3) {
              return Math.sqrt(t3[0] * t3[0] + t3[1] * t3[1]);
            }, y2 = function(t3, e3) {
              return (t3[0] * e3[0] + t3[1] * e3[1]) / (_2(t3) * _2(e3));
            }, x2 = function(t3, e3) {
              return (t3[0] * e3[1] < t3[1] * e3[0] ? -1 : 1) * Math.acos(y2(t3, e3));
            }, b2 = x2([1, 0], [(d2 - f2) / s2, (c2 - p2) / o2]), S2 = [(d2 - f2) / s2, (c2 - p2) / o2], w2 = [(-1 * d2 - f2) / s2, (-1 * c2 - p2) / o2], C2 = x2(S2, w2);
            return y2(S2, w2) <= -1 && (C2 = Math.PI), y2(S2, w2) >= 1 && (C2 = 0), n2 === 0 && C2 > 0 && (C2 -= 2 * Math.PI), n2 === 1 && C2 < 0 && (C2 += 2 * Math.PI), [v2, m2, s2, o2, b2, C2, l2, n2];
          }
        }
        ne.prototype.className = "Path", ne.prototype._attrsAffectingSize = ["data"], r(ne), w.addGetterSetter(ne, "data");
        class se extends ae {
          _sceneFunc(t2) {
            super._sceneFunc(t2);
            var e2 = 2 * Math.PI, i2 = this.points(), r2 = i2, a2 = this.tension() !== 0 && i2.length > 4;
            a2 && (r2 = this.getTensionPoints());
            var n2, s2, o2 = this.pointerLength(), h2 = i2.length;
            if (a2) {
              const t3 = [r2[r2.length - 4], r2[r2.length - 3], r2[r2.length - 2], r2[r2.length - 1], i2[h2 - 2], i2[h2 - 1]], e3 = ne.calcLength(r2[r2.length - 4], r2[r2.length - 3], "C", t3), a3 = ne.getPointOnQuadraticBezier(Math.min(1, 1 - o2 / e3), t3[0], t3[1], t3[2], t3[3], t3[4], t3[5]);
              n2 = i2[h2 - 2] - a3.x, s2 = i2[h2 - 1] - a3.y;
            } else
              n2 = i2[h2 - 2] - i2[h2 - 4], s2 = i2[h2 - 1] - i2[h2 - 3];
            var l2 = (Math.atan2(s2, n2) + e2) % e2, d2 = this.pointerWidth();
            this.pointerAtEnding() && (t2.save(), t2.beginPath(), t2.translate(i2[h2 - 2], i2[h2 - 1]), t2.rotate(l2), t2.moveTo(0, 0), t2.lineTo(-o2, d2 / 2), t2.lineTo(-o2, -d2 / 2), t2.closePath(), t2.restore(), this.__fillStroke(t2)), this.pointerAtBeginning() && (t2.save(), t2.beginPath(), t2.translate(i2[0], i2[1]), a2 ? (n2 = (r2[0] + r2[2]) / 2 - i2[0], s2 = (r2[1] + r2[3]) / 2 - i2[1]) : (n2 = i2[2] - i2[0], s2 = i2[3] - i2[1]), t2.rotate((Math.atan2(-s2, -n2) + e2) % e2), t2.moveTo(0, 0), t2.lineTo(-o2, d2 / 2), t2.lineTo(-o2, -d2 / 2), t2.closePath(), t2.restore(), this.__fillStroke(t2));
          }
          __fillStroke(t2) {
            var e2 = this.dashEnabled();
            e2 && (this.attrs.dashEnabled = false, t2.setLineDash([])), t2.fillStrokeShape(this), e2 && (this.attrs.dashEnabled = true);
          }
          getSelfRect() {
            const t2 = super.getSelfRect(), e2 = this.pointerWidth() / 2;
            return { x: t2.x - e2, y: t2.y - e2, width: t2.width + 2 * e2, height: t2.height + 2 * e2 };
          }
        }
        se.prototype.className = "Arrow", r(se), w.addGetterSetter(se, "pointerLength", 10, p()), w.addGetterSetter(se, "pointerWidth", 10, p()), w.addGetterSetter(se, "pointerAtBeginning", false), w.addGetterSetter(se, "pointerAtEnding", true);
        class oe extends zt {
          _sceneFunc(t2) {
            t2.beginPath(), t2.arc(0, 0, this.attrs.radius || 0, 0, 2 * Math.PI, false), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.radius();
          }
          getHeight() {
            return 2 * this.radius();
          }
          setWidth(t2) {
            this.radius() !== t2 / 2 && this.radius(t2 / 2);
          }
          setHeight(t2) {
            this.radius() !== t2 / 2 && this.radius(t2 / 2);
          }
        }
        oe.prototype._centroid = true, oe.prototype.className = "Circle", oe.prototype._attrsAffectingSize = ["radius"], r(oe), w.addGetterSetter(oe, "radius", 0, p());
        class he extends zt {
          _sceneFunc(t2) {
            var e2 = this.radiusX(), i2 = this.radiusY();
            t2.beginPath(), t2.save(), e2 !== i2 && t2.scale(1, i2 / e2), t2.arc(0, 0, e2, 0, 2 * Math.PI, false), t2.restore(), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.radiusX();
          }
          getHeight() {
            return 2 * this.radiusY();
          }
          setWidth(t2) {
            this.radiusX(t2 / 2);
          }
          setHeight(t2) {
            this.radiusY(t2 / 2);
          }
        }
        he.prototype.className = "Ellipse", he.prototype._centroid = true, he.prototype._attrsAffectingSize = ["radiusX", "radiusY"], r(he), w.addComponentsGetterSetter(he, "radius", ["x", "y"]), w.addGetterSetter(he, "radiusX", 0, p()), w.addGetterSetter(he, "radiusY", 0, p());
        class le extends zt {
          constructor(t2) {
            super(t2), this.on("imageChange.konva", () => {
              this._setImageLoad();
            }), this._setImageLoad();
          }
          _setImageLoad() {
            const t2 = this.image();
            t2 && t2.complete || t2 && t2.readyState === 4 || t2 && t2.addEventListener && t2.addEventListener("load", () => {
              this._requestDraw();
            });
          }
          _useBufferCanvas() {
            return super._useBufferCanvas(true);
          }
          _sceneFunc(t2) {
            const e2 = this.getWidth(), i2 = this.getHeight(), r2 = this.attrs.image;
            let a2;
            if (r2) {
              const t3 = this.attrs.cropWidth, n2 = this.attrs.cropHeight;
              a2 = t3 && n2 ? [r2, this.cropX(), this.cropY(), t3, n2, 0, 0, e2, i2] : [r2, 0, 0, e2, i2];
            }
            (this.hasFill() || this.hasStroke()) && (t2.beginPath(), t2.rect(0, 0, e2, i2), t2.closePath(), t2.fillStrokeShape(this)), r2 && t2.drawImage.apply(t2, a2);
          }
          _hitFunc(t2) {
            var e2 = this.width(), i2 = this.height();
            t2.beginPath(), t2.rect(0, 0, e2, i2), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            var t2, e2;
            return (t2 = this.attrs.width) !== null && t2 !== void 0 ? t2 : (e2 = this.image()) === null || e2 === void 0 ? void 0 : e2.width;
          }
          getHeight() {
            var t2, e2;
            return (t2 = this.attrs.height) !== null && t2 !== void 0 ? t2 : (e2 = this.image()) === null || e2 === void 0 ? void 0 : e2.height;
          }
          static fromURL(t2, e2, i2 = null) {
            var r2 = g.createImageElement();
            r2.onload = function() {
              var t3 = new le({ image: r2 });
              e2(t3);
            }, r2.onerror = i2, r2.crossOrigin = "Anonymous", r2.src = t2;
          }
        }
        le.prototype.className = "Image", r(le), w.addGetterSetter(le, "image"), w.addComponentsGetterSetter(le, "crop", ["x", "y", "width", "height"]), w.addGetterSetter(le, "cropX", 0, p()), w.addGetterSetter(le, "cropY", 0, p()), w.addGetterSetter(le, "cropWidth", 0, p()), w.addGetterSetter(le, "cropHeight", 0, p());
        var de = ["fontFamily", "fontSize", "fontStyle", "padding", "lineHeight", "text", "width", "height"], ce = "up", ge = "right", ue = "down", fe = "left", pe = de.length;
        class ve extends jt {
          constructor(t2) {
            super(t2), this.on("add.konva", function(t3) {
              this._addListeners(t3.child), this._sync();
            });
          }
          getText() {
            return this.find("Text")[0];
          }
          getTag() {
            return this.find("Tag")[0];
          }
          _addListeners(t2) {
            var e2, i2 = this, r2 = function() {
              i2._sync();
            };
            for (e2 = 0; e2 < pe; e2++)
              t2.on(de[e2] + "Change.konva", r2);
          }
          getWidth() {
            return this.getText().width();
          }
          getHeight() {
            return this.getText().height();
          }
          _sync() {
            var t2, e2, i2, r2, a2, n2, s2, o2 = this.getText(), h2 = this.getTag();
            if (o2 && h2) {
              switch (t2 = o2.width(), e2 = o2.height(), i2 = h2.pointerDirection(), r2 = h2.pointerWidth(), s2 = h2.pointerHeight(), a2 = 0, n2 = 0, i2) {
                case ce:
                  a2 = t2 / 2, n2 = -1 * s2;
                  break;
                case ge:
                  a2 = t2 + r2, n2 = e2 / 2;
                  break;
                case ue:
                  a2 = t2 / 2, n2 = e2 + s2;
                  break;
                case fe:
                  a2 = -1 * r2, n2 = e2 / 2;
              }
              h2.setAttrs({ x: -1 * a2, y: -1 * n2, width: t2, height: e2 }), o2.setAttrs({ x: -1 * a2, y: -1 * n2 });
            }
          }
        }
        ve.prototype.className = "Label", r(ve);
        class me extends zt {
          _sceneFunc(t2) {
            var e2 = this.width(), i2 = this.height(), r2 = this.pointerDirection(), a2 = this.pointerWidth(), n2 = this.pointerHeight(), s2 = this.cornerRadius();
            let o2 = 0, h2 = 0, l2 = 0, d2 = 0;
            typeof s2 == "number" ? o2 = h2 = l2 = d2 = Math.min(s2, e2 / 2, i2 / 2) : (o2 = Math.min(s2[0] || 0, e2 / 2, i2 / 2), h2 = Math.min(s2[1] || 0, e2 / 2, i2 / 2), d2 = Math.min(s2[2] || 0, e2 / 2, i2 / 2), l2 = Math.min(s2[3] || 0, e2 / 2, i2 / 2)), t2.beginPath(), t2.moveTo(o2, 0), r2 === ce && (t2.lineTo((e2 - a2) / 2, 0), t2.lineTo(e2 / 2, -1 * n2), t2.lineTo((e2 + a2) / 2, 0)), t2.lineTo(e2 - h2, 0), t2.arc(e2 - h2, h2, h2, 3 * Math.PI / 2, 0, false), r2 === ge && (t2.lineTo(e2, (i2 - n2) / 2), t2.lineTo(e2 + a2, i2 / 2), t2.lineTo(e2, (i2 + n2) / 2)), t2.lineTo(e2, i2 - d2), t2.arc(e2 - d2, i2 - d2, d2, 0, Math.PI / 2, false), r2 === ue && (t2.lineTo((e2 + a2) / 2, i2), t2.lineTo(e2 / 2, i2 + n2), t2.lineTo((e2 - a2) / 2, i2)), t2.lineTo(l2, i2), t2.arc(l2, i2 - l2, l2, Math.PI / 2, Math.PI, false), r2 === fe && (t2.lineTo(0, (i2 + n2) / 2), t2.lineTo(-1 * a2, i2 / 2), t2.lineTo(0, (i2 - n2) / 2)), t2.lineTo(0, o2), t2.arc(o2, o2, o2, Math.PI, 3 * Math.PI / 2, false), t2.closePath(), t2.fillStrokeShape(this);
          }
          getSelfRect() {
            var t2 = 0, e2 = 0, i2 = this.pointerWidth(), r2 = this.pointerHeight(), a2 = this.pointerDirection(), n2 = this.width(), s2 = this.height();
            return a2 === ce ? (e2 -= r2, s2 += r2) : a2 === ue ? s2 += r2 : a2 === fe ? (t2 -= 1.5 * i2, n2 += i2) : a2 === ge && (n2 += 1.5 * i2), { x: t2, y: e2, width: n2, height: s2 };
          }
        }
        me.prototype.className = "Tag", r(me), w.addGetterSetter(me, "pointerDirection", "none"), w.addGetterSetter(me, "pointerWidth", 0, p()), w.addGetterSetter(me, "pointerHeight", 0, p()), w.addGetterSetter(me, "cornerRadius", 0, v(4));
        class _e extends zt {
          _sceneFunc(t2) {
            var e2 = this.cornerRadius(), i2 = this.width(), r2 = this.height();
            if (t2.beginPath(), e2) {
              let a2 = 0, n2 = 0, s2 = 0, o2 = 0;
              typeof e2 == "number" ? a2 = n2 = s2 = o2 = Math.min(e2, i2 / 2, r2 / 2) : (a2 = Math.min(e2[0] || 0, i2 / 2, r2 / 2), n2 = Math.min(e2[1] || 0, i2 / 2, r2 / 2), o2 = Math.min(e2[2] || 0, i2 / 2, r2 / 2), s2 = Math.min(e2[3] || 0, i2 / 2, r2 / 2)), t2.moveTo(a2, 0), t2.lineTo(i2 - n2, 0), t2.arc(i2 - n2, n2, n2, 3 * Math.PI / 2, 0, false), t2.lineTo(i2, r2 - o2), t2.arc(i2 - o2, r2 - o2, o2, 0, Math.PI / 2, false), t2.lineTo(s2, r2), t2.arc(s2, r2 - s2, s2, Math.PI / 2, Math.PI, false), t2.lineTo(0, a2), t2.arc(a2, a2, a2, Math.PI, 3 * Math.PI / 2, false);
            } else
              t2.rect(0, 0, i2, r2);
            t2.closePath(), t2.fillStrokeShape(this);
          }
        }
        _e.prototype.className = "Rect", r(_e), w.addGetterSetter(_e, "cornerRadius", 0, v(4));
        class ye extends zt {
          _sceneFunc(t2) {
            const e2 = this._getPoints();
            t2.beginPath(), t2.moveTo(e2[0].x, e2[0].y);
            for (var i2 = 1; i2 < e2.length; i2++)
              t2.lineTo(e2[i2].x, e2[i2].y);
            t2.closePath(), t2.fillStrokeShape(this);
          }
          _getPoints() {
            const t2 = this.attrs.sides, e2 = this.attrs.radius || 0, i2 = [];
            for (var r2 = 0; r2 < t2; r2++)
              i2.push({ x: e2 * Math.sin(2 * r2 * Math.PI / t2), y: -1 * e2 * Math.cos(2 * r2 * Math.PI / t2) });
            return i2;
          }
          getSelfRect() {
            const t2 = this._getPoints();
            var e2 = t2[0].x, i2 = t2[0].y, r2 = t2[0].x, a2 = t2[0].y;
            return t2.forEach((t3) => {
              e2 = Math.min(e2, t3.x), i2 = Math.max(i2, t3.x), r2 = Math.min(r2, t3.y), a2 = Math.max(a2, t3.y);
            }), { x: e2, y: r2, width: i2 - e2, height: a2 - r2 };
          }
          getWidth() {
            return 2 * this.radius();
          }
          getHeight() {
            return 2 * this.radius();
          }
          setWidth(t2) {
            this.radius(t2 / 2);
          }
          setHeight(t2) {
            this.radius(t2 / 2);
          }
        }
        ye.prototype.className = "RegularPolygon", ye.prototype._centroid = true, ye.prototype._attrsAffectingSize = ["radius"], r(ye), w.addGetterSetter(ye, "radius", 0, p()), w.addGetterSetter(ye, "sides", 0, p());
        var xe = 2 * Math.PI;
        class be extends zt {
          _sceneFunc(t2) {
            t2.beginPath(), t2.arc(0, 0, this.innerRadius(), 0, xe, false), t2.moveTo(this.outerRadius(), 0), t2.arc(0, 0, this.outerRadius(), xe, 0, true), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.outerRadius();
          }
          getHeight() {
            return 2 * this.outerRadius();
          }
          setWidth(t2) {
            this.outerRadius(t2 / 2);
          }
          setHeight(t2) {
            this.outerRadius(t2 / 2);
          }
        }
        be.prototype.className = "Ring", be.prototype._centroid = true, be.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], r(be), w.addGetterSetter(be, "innerRadius", 0, p()), w.addGetterSetter(be, "outerRadius", 0, p());
        class Se extends zt {
          constructor(t2) {
            super(t2), this._updated = true, this.anim = new qt(() => {
              var t3 = this._updated;
              return this._updated = false, t3;
            }), this.on("animationChange.konva", function() {
              this.frameIndex(0);
            }), this.on("frameIndexChange.konva", function() {
              this._updated = true;
            }), this.on("frameRateChange.konva", function() {
              this.anim.isRunning() && (clearInterval(this.interval), this._setInterval());
            });
          }
          _sceneFunc(t2) {
            var e2 = this.animation(), i2 = this.frameIndex(), r2 = 4 * i2, a2 = this.animations()[e2], n2 = this.frameOffsets(), s2 = a2[r2 + 0], o2 = a2[r2 + 1], h2 = a2[r2 + 2], l2 = a2[r2 + 3], d2 = this.image();
            if ((this.hasFill() || this.hasStroke()) && (t2.beginPath(), t2.rect(0, 0, h2, l2), t2.closePath(), t2.fillStrokeShape(this)), d2)
              if (n2) {
                var c2 = n2[e2], g2 = 2 * i2;
                t2.drawImage(d2, s2, o2, h2, l2, c2[g2 + 0], c2[g2 + 1], h2, l2);
              } else
                t2.drawImage(d2, s2, o2, h2, l2, 0, 0, h2, l2);
          }
          _hitFunc(t2) {
            var e2 = this.animation(), i2 = this.frameIndex(), r2 = 4 * i2, a2 = this.animations()[e2], n2 = this.frameOffsets(), s2 = a2[r2 + 2], o2 = a2[r2 + 3];
            if (t2.beginPath(), n2) {
              var h2 = n2[e2], l2 = 2 * i2;
              t2.rect(h2[l2 + 0], h2[l2 + 1], s2, o2);
            } else
              t2.rect(0, 0, s2, o2);
            t2.closePath(), t2.fillShape(this);
          }
          _useBufferCanvas() {
            return super._useBufferCanvas(true);
          }
          _setInterval() {
            var t2 = this;
            this.interval = setInterval(function() {
              t2._updateIndex();
            }, 1e3 / this.frameRate());
          }
          start() {
            if (!this.isRunning()) {
              var t2 = this.getLayer();
              this.anim.setLayers(t2), this._setInterval(), this.anim.start();
            }
          }
          stop() {
            this.anim.stop(), clearInterval(this.interval);
          }
          isRunning() {
            return this.anim.isRunning();
          }
          _updateIndex() {
            var t2 = this.frameIndex(), e2 = this.animation();
            t2 < this.animations()[e2].length / 4 - 1 ? this.frameIndex(t2 + 1) : this.frameIndex(0);
          }
        }
        Se.prototype.className = "Sprite", r(Se), w.addGetterSetter(Se, "animation"), w.addGetterSetter(Se, "animations"), w.addGetterSetter(Se, "frameOffsets"), w.addGetterSetter(Se, "image"), w.addGetterSetter(Se, "frameIndex", 0, p()), w.addGetterSetter(Se, "frameRate", 17, p()), w.backCompat(Se, { index: "frameIndex", getIndex: "getFrameIndex", setIndex: "setFrameIndex" });
        class we extends zt {
          _sceneFunc(t2) {
            var e2 = this.innerRadius(), i2 = this.outerRadius(), r2 = this.numPoints();
            t2.beginPath(), t2.moveTo(0, 0 - i2);
            for (var a2 = 1; a2 < 2 * r2; a2++) {
              var n2 = a2 % 2 == 0 ? i2 : e2, s2 = n2 * Math.sin(a2 * Math.PI / r2), o2 = -1 * n2 * Math.cos(a2 * Math.PI / r2);
              t2.lineTo(s2, o2);
            }
            t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.outerRadius();
          }
          getHeight() {
            return 2 * this.outerRadius();
          }
          setWidth(t2) {
            this.outerRadius(t2 / 2);
          }
          setHeight(t2) {
            this.outerRadius(t2 / 2);
          }
        }
        function Ce(t2) {
          return Array.from(t2);
        }
        we.prototype.className = "Star", we.prototype._centroid = true, we.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"], r(we), w.addGetterSetter(we, "numPoints", 5, p()), w.addGetterSetter(we, "innerRadius", 0, p()), w.addGetterSetter(we, "outerRadius", 0, p());
        var Pe, ke = "auto", Te = "justify", Ae = "left", Me = "middle", Ge = "normal", Ee = " ", Re = ["fontFamily", "fontSize", "fontStyle", "fontVariant", "padding", "align", "verticalAlign", "lineHeight", "text", "width", "height", "wrap", "ellipsis", "letterSpacing"], Le = Re.length;
        function De() {
          return Pe || (Pe = g.createCanvasElement().getContext("2d"));
        }
        class Oe extends zt {
          constructor(t2) {
            super(function(t3) {
              return (t3 = t3 || {}).fillLinearGradientColorStops || t3.fillRadialGradientColorStops || t3.fillPatternImage || (t3.fill = t3.fill || "black"), t3;
            }(t2)), this._partialTextX = 0, this._partialTextY = 0;
            for (var e2 = 0; e2 < Le; e2++)
              this.on(Re[e2] + "Change.konva", this._setTextData);
            this._setTextData();
          }
          _sceneFunc(t2) {
            var e2 = this.textArr, i2 = e2.length;
            if (this.text()) {
              var r2, a2 = this.padding(), n2 = this.fontSize(), s2 = this.lineHeight() * n2, o2 = this.verticalAlign(), h2 = 0, l2 = this.align(), d2 = this.getWidth(), c2 = this.letterSpacing(), g2 = this.fill(), u2 = this.textDecoration(), f2 = u2.indexOf("underline") !== -1, p2 = u2.indexOf("line-through") !== -1, v2 = 0, m2 = (v2 = s2 / 2, 0), _2 = 0;
              for (t2.setAttr("font", this._getContextFont()), t2.setAttr("textBaseline", Me), t2.setAttr("textAlign", Ae), o2 === Me ? h2 = (this.getHeight() - i2 * s2 - 2 * a2) / 2 : o2 === "bottom" && (h2 = this.getHeight() - i2 * s2 - 2 * a2), t2.translate(a2, h2 + a2), r2 = 0; r2 < i2; r2++) {
                m2 = 0, _2 = 0;
                var y2, x2, b2, S2 = e2[r2], w2 = S2.text, C2 = S2.width, P2 = S2.lastInParagraph;
                if (t2.save(), l2 === "right" ? m2 += d2 - C2 - 2 * a2 : l2 === "center" && (m2 += (d2 - C2 - 2 * a2) / 2), f2 && (t2.save(), t2.beginPath(), t2.moveTo(m2, v2 + _2 + Math.round(n2 / 2)), x2 = (y2 = w2.split(" ").length - 1) === 0, b2 = l2 === Te && P2 && !x2 ? d2 - 2 * a2 : C2, t2.lineTo(m2 + Math.round(b2), v2 + _2 + Math.round(n2 / 2)), t2.lineWidth = n2 / 15, t2.strokeStyle = g2, t2.stroke(), t2.restore()), p2 && (t2.save(), t2.beginPath(), t2.moveTo(m2, v2 + _2), x2 = (y2 = w2.split(" ").length - 1) === 0, b2 = l2 === Te && P2 && !x2 ? d2 - 2 * a2 : C2, t2.lineTo(m2 + Math.round(b2), v2 + _2), t2.lineWidth = n2 / 15, t2.strokeStyle = g2, t2.stroke(), t2.restore()), c2 !== 0 || l2 === Te) {
                  y2 = w2.split(" ").length - 1;
                  for (var k2 = Ce(w2), T2 = 0; T2 < k2.length; T2++) {
                    var A2 = k2[T2];
                    A2 !== " " || P2 || l2 !== Te || (m2 += (d2 - 2 * a2 - C2) / y2), this._partialTextX = m2, this._partialTextY = v2 + _2, this._partialText = A2, t2.fillStrokeShape(this), m2 += this.measureSize(A2).width + c2;
                  }
                } else
                  this._partialTextX = m2, this._partialTextY = v2 + _2, this._partialText = w2, t2.fillStrokeShape(this);
                t2.restore(), i2 > 1 && (v2 += s2);
              }
            }
          }
          _hitFunc(t2) {
            var e2 = this.getWidth(), i2 = this.getHeight();
            t2.beginPath(), t2.rect(0, 0, e2, i2), t2.closePath(), t2.fillStrokeShape(this);
          }
          setText(t2) {
            var e2 = g._isString(t2) ? t2 : t2 == null ? "" : t2 + "";
            return this._setAttr("text", e2), this;
          }
          getWidth() {
            return this.attrs.width === ke || this.attrs.width === void 0 ? this.getTextWidth() + 2 * this.padding() : this.attrs.width;
          }
          getHeight() {
            return this.attrs.height === ke || this.attrs.height === void 0 ? this.fontSize() * this.textArr.length * this.lineHeight() + 2 * this.padding() : this.attrs.height;
          }
          getTextWidth() {
            return this.textWidth;
          }
          getTextHeight() {
            return g.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
          }
          measureSize(t2) {
            var e2, i2 = De(), r2 = this.fontSize();
            return i2.save(), i2.font = this._getContextFont(), e2 = i2.measureText(t2), i2.restore(), { width: e2.width, height: r2 };
          }
          _getContextFont() {
            return this.fontStyle() + Ee + this.fontVariant() + Ee + (this.fontSize() + "px ") + this.fontFamily().split(",").map((t2) => {
              const e2 = (t2 = t2.trim()).indexOf(" ") >= 0, i2 = t2.indexOf('"') >= 0 || t2.indexOf("'") >= 0;
              return e2 && !i2 && (t2 = `"${t2}"`), t2;
            }).join(", ");
          }
          _addTextLine(t2) {
            this.align() === Te && (t2 = t2.trim());
            var e2 = this._getTextWidth(t2);
            return this.textArr.push({ text: t2, width: e2, lastInParagraph: false });
          }
          _getTextWidth(t2) {
            var e2 = this.letterSpacing(), i2 = t2.length;
            return De().measureText(t2).width + (i2 ? e2 * (i2 - 1) : 0);
          }
          _setTextData() {
            var t2 = this.text().split("\n"), e2 = +this.fontSize(), i2 = 0, r2 = this.lineHeight() * e2, a2 = this.attrs.width, n2 = this.attrs.height, s2 = a2 !== ke && a2 !== void 0, o2 = n2 !== ke && n2 !== void 0, h2 = this.padding(), l2 = a2 - 2 * h2, d2 = n2 - 2 * h2, c2 = 0, g2 = this.wrap(), u2 = g2 !== "none", f2 = g2 !== "char" && u2, p2 = this.ellipsis();
            this.textArr = [], De().font = this._getContextFont();
            for (var v2 = p2 ? this._getTextWidth("\u2026") : 0, m2 = 0, _2 = t2.length; m2 < _2; ++m2) {
              var y2 = t2[m2], x2 = this._getTextWidth(y2);
              if (s2 && x2 > l2)
                for (; y2.length > 0; ) {
                  for (var b2 = 0, S2 = y2.length, w2 = "", C2 = 0; b2 < S2; ) {
                    var P2 = b2 + S2 >>> 1, k2 = y2.slice(0, P2 + 1), T2 = this._getTextWidth(k2) + v2;
                    T2 <= l2 ? (b2 = P2 + 1, w2 = k2, C2 = T2) : S2 = P2;
                  }
                  if (!w2)
                    break;
                  if (f2) {
                    var A2, M2 = y2[w2.length];
                    (A2 = (M2 === Ee || M2 === "-") && C2 <= l2 ? w2.length : Math.max(w2.lastIndexOf(Ee), w2.lastIndexOf("-")) + 1) > 0 && (b2 = A2, w2 = w2.slice(0, b2), C2 = this._getTextWidth(w2));
                  }
                  if (w2 = w2.trimRight(), this._addTextLine(w2), i2 = Math.max(i2, C2), c2 += r2, !u2 || o2 && c2 + r2 > d2) {
                    var G2 = this.textArr[this.textArr.length - 1];
                    if (G2) {
                      if (p2)
                        this._getTextWidth(G2.text + "\u2026") < l2 || (G2.text = G2.text.slice(0, G2.text.length - 3)), this.textArr.splice(this.textArr.length - 1, 1), this._addTextLine(G2.text + "\u2026");
                    }
                    break;
                  }
                  if ((y2 = (y2 = y2.slice(b2)).trimLeft()).length > 0 && (x2 = this._getTextWidth(y2)) <= l2) {
                    this._addTextLine(y2), c2 += r2, i2 = Math.max(i2, x2);
                    break;
                  }
                }
              else
                this._addTextLine(y2), c2 += r2, i2 = Math.max(i2, x2);
              if (o2 && c2 + r2 > d2)
                break;
              this.textArr[this.textArr.length - 1] && (this.textArr[this.textArr.length - 1].lastInParagraph = true);
            }
            this.textHeight = e2, this.textWidth = i2;
          }
          getStrokeScaleEnabled() {
            return true;
          }
        }
        Oe.prototype._fillFunc = function(t2) {
          t2.fillText(this._partialText, this._partialTextX, this._partialTextY);
        }, Oe.prototype._strokeFunc = function(t2) {
          t2.strokeText(this._partialText, this._partialTextX, this._partialTextY);
        }, Oe.prototype.className = "Text", Oe.prototype._attrsAffectingSize = ["text", "fontSize", "padding", "wrap", "lineHeight", "letterSpacing"], r(Oe), w.overWriteSetter(Oe, "width", m()), w.overWriteSetter(Oe, "height", m()), w.addGetterSetter(Oe, "fontFamily", "Arial"), w.addGetterSetter(Oe, "fontSize", 12, p()), w.addGetterSetter(Oe, "fontStyle", Ge), w.addGetterSetter(Oe, "fontVariant", Ge), w.addGetterSetter(Oe, "padding", 0, p()), w.addGetterSetter(Oe, "align", Ae), w.addGetterSetter(Oe, "verticalAlign", "top"), w.addGetterSetter(Oe, "lineHeight", 1, p()), w.addGetterSetter(Oe, "wrap", "word"), w.addGetterSetter(Oe, "ellipsis", false, x()), w.addGetterSetter(Oe, "letterSpacing", 0, p()), w.addGetterSetter(Oe, "text", "", _()), w.addGetterSetter(Oe, "textDecoration", "");
        var Ie = "normal";
        function Fe(t2) {
          t2.fillText(this.partialText, 0, 0);
        }
        function Ne(t2) {
          t2.strokeText(this.partialText, 0, 0);
        }
        class Be extends zt {
          constructor(t2) {
            super(t2), this.dummyCanvas = g.createCanvasElement(), this.dataArray = [], this.dataArray = ne.parsePathData(this.attrs.data), this.on("dataChange.konva", function() {
              this.dataArray = ne.parsePathData(this.attrs.data), this._setTextData();
            }), this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva", this._setTextData), this._setTextData();
          }
          _sceneFunc(t2) {
            t2.setAttr("font", this._getContextFont()), t2.setAttr("textBaseline", this.textBaseline()), t2.setAttr("textAlign", "left"), t2.save();
            var e2 = this.textDecoration(), i2 = this.fill(), r2 = this.fontSize(), a2 = this.glyphInfo;
            e2 === "underline" && t2.beginPath();
            for (var n2 = 0; n2 < a2.length; n2++) {
              t2.save();
              var s2 = a2[n2].p0;
              t2.translate(s2.x, s2.y), t2.rotate(a2[n2].rotation), this.partialText = a2[n2].text, t2.fillStrokeShape(this), e2 === "underline" && (n2 === 0 && t2.moveTo(0, r2 / 2 + 1), t2.lineTo(r2, r2 / 2 + 1)), t2.restore();
            }
            e2 === "underline" && (t2.strokeStyle = i2, t2.lineWidth = r2 / 20, t2.stroke()), t2.restore();
          }
          _hitFunc(t2) {
            t2.beginPath();
            var e2 = this.glyphInfo;
            if (e2.length >= 1) {
              var i2 = e2[0].p0;
              t2.moveTo(i2.x, i2.y);
            }
            for (var r2 = 0; r2 < e2.length; r2++) {
              var a2 = e2[r2].p1;
              t2.lineTo(a2.x, a2.y);
            }
            t2.setAttr("lineWidth", this.fontSize()), t2.setAttr("strokeStyle", this.colorKey), t2.stroke();
          }
          getTextWidth() {
            return this.textWidth;
          }
          getTextHeight() {
            return g.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."), this.textHeight;
          }
          setText(t2) {
            return Oe.prototype.setText.call(this, t2);
          }
          _getContextFont() {
            return Oe.prototype._getContextFont.call(this);
          }
          _getTextSize(t2) {
            var e2 = this.dummyCanvas.getContext("2d");
            e2.save(), e2.font = this._getContextFont();
            var i2 = e2.measureText(t2);
            return e2.restore(), { width: i2.width, height: parseInt(this.attrs.fontSize, 10) };
          }
          _setTextData() {
            var t2 = this, e2 = this._getTextSize(this.attrs.text), i2 = this.letterSpacing(), r2 = this.align(), a2 = this.kerningFunc();
            this.textWidth = e2.width, this.textHeight = e2.height;
            var n2 = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * i2, 0);
            this.glyphInfo = [];
            for (var s2 = 0, o2 = 0; o2 < t2.dataArray.length; o2++)
              t2.dataArray[o2].pathLength > 0 && (s2 += t2.dataArray[o2].pathLength);
            var h2 = 0;
            r2 === "center" && (h2 = Math.max(0, s2 / 2 - n2 / 2)), r2 === "right" && (h2 = Math.max(0, s2 - n2));
            for (var l2, d2, c2, g2 = Ce(this.text()), u2 = this.text().split(" ").length - 1, f2 = -1, p2 = 0, v2 = function() {
              p2 = 0;
              for (var e3 = t2.dataArray, i3 = f2 + 1; i3 < e3.length; i3++) {
                if (e3[i3].pathLength > 0)
                  return f2 = i3, e3[i3];
                e3[i3].command === "M" && (l2 = { x: e3[i3].points[0], y: e3[i3].points[1] });
              }
              return {};
            }, m2 = function(e3) {
              var a3 = t2._getTextSize(e3).width + i2;
              e3 === " " && r2 === "justify" && (a3 += (s2 - n2) / u2);
              var o3 = 0, h3 = 0;
              for (d2 = void 0; Math.abs(a3 - o3) / a3 > 0.01 && h3 < 20; ) {
                h3++;
                for (var g3 = o3; c2 === void 0; )
                  (c2 = v2()) && g3 + c2.pathLength < a3 && (g3 += c2.pathLength, c2 = void 0);
                if (c2 === {} || l2 === void 0)
                  return;
                var f3 = false;
                switch (c2.command) {
                  case "L":
                    ne.getLineLength(l2.x, l2.y, c2.points[0], c2.points[1]) > a3 ? d2 = ne.getPointOnLine(a3, l2.x, l2.y, c2.points[0], c2.points[1], l2.x, l2.y) : c2 = void 0;
                    break;
                  case "A":
                    var m3 = c2.points[4], _3 = c2.points[5], y3 = c2.points[4] + _3;
                    p2 === 0 ? p2 = m3 + 1e-8 : a3 > o3 ? p2 += Math.PI / 180 * _3 / Math.abs(_3) : p2 -= Math.PI / 360 * _3 / Math.abs(_3), (_3 < 0 && p2 < y3 || _3 >= 0 && p2 > y3) && (p2 = y3, f3 = true), d2 = ne.getPointOnEllipticalArc(c2.points[0], c2.points[1], c2.points[2], c2.points[3], p2, c2.points[6]);
                    break;
                  case "C":
                    p2 === 0 ? p2 = a3 > c2.pathLength ? 1e-8 : a3 / c2.pathLength : a3 > o3 ? p2 += (a3 - o3) / c2.pathLength / 2 : p2 = Math.max(p2 - (o3 - a3) / c2.pathLength / 2, 0), p2 > 1 && (p2 = 1, f3 = true), d2 = ne.getPointOnCubicBezier(p2, c2.start.x, c2.start.y, c2.points[0], c2.points[1], c2.points[2], c2.points[3], c2.points[4], c2.points[5]);
                    break;
                  case "Q":
                    p2 === 0 ? p2 = a3 / c2.pathLength : a3 > o3 ? p2 += (a3 - o3) / c2.pathLength : p2 -= (o3 - a3) / c2.pathLength, p2 > 1 && (p2 = 1, f3 = true), d2 = ne.getPointOnQuadraticBezier(p2, c2.start.x, c2.start.y, c2.points[0], c2.points[1], c2.points[2], c2.points[3]);
                }
                d2 !== void 0 && (o3 = ne.getLineLength(l2.x, l2.y, d2.x, d2.y)), f3 && (f3 = false, c2 = void 0);
              }
            }, _2 = h2 / (t2._getTextSize("C").width + i2) - 1, y2 = 0; y2 < _2 && (m2("C"), l2 !== void 0 && d2 !== void 0); y2++)
              l2 = d2;
            for (var x2 = 0; x2 < g2.length && (m2(g2[x2]), l2 !== void 0 && d2 !== void 0); x2++) {
              var b2 = ne.getLineLength(l2.x, l2.y, d2.x, d2.y), S2 = 0;
              if (a2)
                try {
                  S2 = a2(g2[x2 - 1], g2[x2]) * this.fontSize();
                } catch (t3) {
                  S2 = 0;
                }
              l2.x += S2, d2.x += S2, this.textWidth += S2;
              var w2 = ne.getPointOnLine(S2 + b2 / 2, l2.x, l2.y, d2.x, d2.y), C2 = Math.atan2(d2.y - l2.y, d2.x - l2.x);
              this.glyphInfo.push({ transposeX: w2.x, transposeY: w2.y, text: g2[x2], rotation: C2, p0: l2, p1: d2 }), l2 = d2;
            }
          }
          getSelfRect() {
            if (!this.glyphInfo.length)
              return { x: 0, y: 0, width: 0, height: 0 };
            var t2 = [];
            this.glyphInfo.forEach(function(e3) {
              t2.push(e3.p0.x), t2.push(e3.p0.y), t2.push(e3.p1.x), t2.push(e3.p1.y);
            });
            for (var e2, i2, r2 = t2[0] || 0, a2 = t2[0] || 0, n2 = t2[1] || 0, s2 = t2[1] || 0, o2 = 0; o2 < t2.length / 2; o2++)
              e2 = t2[2 * o2], i2 = t2[2 * o2 + 1], r2 = Math.min(r2, e2), a2 = Math.max(a2, e2), n2 = Math.min(n2, i2), s2 = Math.max(s2, i2);
            var h2 = this.fontSize();
            return { x: r2 - h2 / 2, y: n2 - h2 / 2, width: a2 - r2 + h2, height: s2 - n2 + h2 };
          }
        }
        Be.prototype._fillFunc = Fe, Be.prototype._strokeFunc = Ne, Be.prototype._fillFuncHit = Fe, Be.prototype._strokeFuncHit = Ne, Be.prototype.className = "TextPath", Be.prototype._attrsAffectingSize = ["text", "fontSize", "data"], r(Be), w.addGetterSetter(Be, "data"), w.addGetterSetter(Be, "fontFamily", "Arial"), w.addGetterSetter(Be, "fontSize", 12, p()), w.addGetterSetter(Be, "fontStyle", Ie), w.addGetterSetter(Be, "align", "left"), w.addGetterSetter(Be, "letterSpacing", 0, p()), w.addGetterSetter(Be, "textBaseline", "middle"), w.addGetterSetter(Be, "fontVariant", Ie), w.addGetterSetter(Be, "text", ""), w.addGetterSetter(Be, "textDecoration", null), w.addGetterSetter(Be, "kerningFunc", null);
        var ze = "tr-konva", We = ["resizeEnabledChange", "rotateAnchorOffsetChange", "rotateEnabledChange", "enabledAnchorsChange", "anchorSizeChange", "borderEnabledChange", "borderStrokeChange", "borderStrokeWidthChange", "borderDashChange", "anchorStrokeChange", "anchorStrokeWidthChange", "anchorFillChange", "anchorCornerRadiusChange", "ignoreStrokeChange"].map((t2) => t2 + ".tr-konva").join(" "), He = "nodesRect", Ye = ["widthChange", "heightChange", "scaleXChange", "scaleYChange", "skewXChange", "skewYChange", "rotationChange", "offsetXChange", "offsetYChange", "transformsEnabledChange", "strokeWidthChange"], Xe = { "top-left": -45, "top-center": 0, "top-right": 45, "middle-right": -90, "middle-left": 90, "bottom-left": -135, "bottom-center": 180, "bottom-right": 135 };
        const je = "ontouchstart" in i._global;
        var Ue = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];
        function qe(t2, e2, i2) {
          const r2 = i2.x + (t2.x - i2.x) * Math.cos(e2) - (t2.y - i2.y) * Math.sin(e2), a2 = i2.y + (t2.x - i2.x) * Math.sin(e2) + (t2.y - i2.y) * Math.cos(e2);
          return Object.assign(Object.assign({}, t2), { rotation: t2.rotation + e2, x: r2, y: a2 });
        }
        function Ve(t2, e2) {
          const i2 = function(t3) {
            return { x: t3.x + t3.width / 2 * Math.cos(t3.rotation) + t3.height / 2 * Math.sin(-t3.rotation), y: t3.y + t3.height / 2 * Math.cos(t3.rotation) + t3.width / 2 * Math.sin(t3.rotation) };
          }(t2);
          return qe(t2, e2, i2);
        }
        class Ke extends jt {
          constructor(t2) {
            super(t2), this._transforming = false, this._createElements(), this._handleMouseMove = this._handleMouseMove.bind(this), this._handleMouseUp = this._handleMouseUp.bind(this), this.update = this.update.bind(this), this.on(We, this.update), this.getNode() && this.update();
          }
          attachTo(t2) {
            return this.setNode(t2), this;
          }
          setNode(t2) {
            return g.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."), this.setNodes([t2]);
          }
          getNode() {
            return this._nodes && this._nodes[0];
          }
          _getEventNamespace() {
            return ze + this._id;
          }
          setNodes(t2 = []) {
            return this._nodes && this._nodes.length && this.detach(), this._nodes = t2, t2.length === 1 && this.useSingleNodeRotation() ? this.rotation(t2[0].getAbsoluteRotation()) : this.rotation(0), this._nodes.forEach((t3) => {
              const e2 = () => {
                this.nodes().length === 1 && this.useSingleNodeRotation() && this.rotation(this.nodes()[0].getAbsoluteRotation()), this._resetTransformCache(), this._transforming || this.isDragging() || this.update();
              }, i2 = t3._attrsAffectingSize.map((t4) => t4 + "Change." + this._getEventNamespace()).join(" ");
              t3.on(i2, e2), t3.on(Ye.map((t4) => t4 + `.${this._getEventNamespace()}`).join(" "), e2), t3.on(`absoluteTransformChange.${this._getEventNamespace()}`, e2), this._proxyDrag(t3);
            }), this._resetTransformCache(), !!this.findOne(".top-left") && this.update(), this;
          }
          _proxyDrag(t2) {
            let e2;
            t2.on(`dragstart.${this._getEventNamespace()}`, (i2) => {
              e2 = t2.getAbsolutePosition(), this.isDragging() || t2 === this.findOne(".back") || this.startDrag(i2, false);
            }), t2.on(`dragmove.${this._getEventNamespace()}`, (i2) => {
              if (!e2)
                return;
              const r2 = t2.getAbsolutePosition(), a2 = r2.x - e2.x, n2 = r2.y - e2.y;
              this.nodes().forEach((e3) => {
                if (e3 === t2)
                  return;
                if (e3.isDragging())
                  return;
                const r3 = e3.getAbsolutePosition();
                e3.setAbsolutePosition({ x: r3.x + a2, y: r3.y + n2 }), e3.startDrag(i2);
              }), e2 = null;
            });
          }
          getNodes() {
            return this._nodes || [];
          }
          getActiveAnchor() {
            return this._movingAnchorName;
          }
          detach() {
            this._nodes && this._nodes.forEach((t2) => {
              t2.off("." + this._getEventNamespace());
            }), this._nodes = [], this._resetTransformCache();
          }
          _resetTransformCache() {
            this._clearCache(He), this._clearCache("transform"), this._clearSelfAndDescendantCache("absoluteTransform");
          }
          _getNodeRect() {
            return this._getCache(He, this.__getNodeRect);
          }
          __getNodeShape(t2, e2 = this.rotation(), r2) {
            var a2 = t2.getClientRect({ skipTransform: true, skipShadow: true, skipStroke: this.ignoreStroke() }), n2 = t2.getAbsoluteScale(r2), s2 = t2.getAbsolutePosition(r2), o2 = a2.x * n2.x - t2.offsetX() * n2.x, h2 = a2.y * n2.y - t2.offsetY() * n2.y;
            const l2 = (i.getAngle(t2.getAbsoluteRotation()) + 2 * Math.PI) % (2 * Math.PI);
            return qe({ x: s2.x + o2 * Math.cos(l2) + h2 * Math.sin(-l2), y: s2.y + h2 * Math.cos(l2) + o2 * Math.sin(l2), width: a2.width * n2.x, height: a2.height * n2.y, rotation: l2 }, -i.getAngle(e2), { x: 0, y: 0 });
          }
          __getNodeRect() {
            if (!this.getNode())
              return { x: -1e8, y: -1e8, width: 0, height: 0, rotation: 0 };
            const t2 = [];
            this.nodes().map((e3) => {
              const i2 = e3.getClientRect({ skipTransform: true, skipShadow: true, skipStroke: this.ignoreStroke() });
              var r3 = [{ x: i2.x, y: i2.y }, { x: i2.x + i2.width, y: i2.y }, { x: i2.x + i2.width, y: i2.y + i2.height }, { x: i2.x, y: i2.y + i2.height }], a2 = e3.getAbsoluteTransform();
              r3.forEach(function(e4) {
                var i3 = a2.point(e4);
                t2.push(i3);
              });
            });
            const e2 = new a();
            var r2, n2, s2, o2;
            e2.rotate(-i.getAngle(this.rotation())), t2.forEach(function(t3) {
              var i2 = e2.point(t3);
              r2 === void 0 && (r2 = s2 = i2.x, n2 = o2 = i2.y), r2 = Math.min(r2, i2.x), n2 = Math.min(n2, i2.y), s2 = Math.max(s2, i2.x), o2 = Math.max(o2, i2.y);
            }), e2.invert();
            const h2 = e2.point({ x: r2, y: n2 });
            return { x: h2.x, y: h2.y, width: s2 - r2, height: o2 - n2, rotation: i.getAngle(this.rotation()) };
          }
          getX() {
            return this._getNodeRect().x;
          }
          getY() {
            return this._getNodeRect().y;
          }
          getWidth() {
            return this._getNodeRect().width;
          }
          getHeight() {
            return this._getNodeRect().height;
          }
          _createElements() {
            this._createBack(), Ue.forEach(function(t2) {
              this._createAnchor(t2);
            }.bind(this)), this._createAnchor("rotater");
          }
          _createAnchor(t2) {
            var e2 = new _e({ stroke: "rgb(0, 161, 255)", fill: "white", strokeWidth: 1, name: t2 + " _anchor", dragDistance: 0, draggable: true, hitStrokeWidth: je ? 10 : "auto" }), r2 = this;
            e2.on("mousedown touchstart", function(t3) {
              r2._handleMouseDown(t3);
            }), e2.on("dragstart", (t3) => {
              e2.stopDrag(), t3.cancelBubble = true;
            }), e2.on("dragend", (t3) => {
              t3.cancelBubble = true;
            }), e2.on("mouseenter", () => {
              var r3 = i.getAngle(this.rotation()), a2 = function(t3, e3) {
                if (t3 === "rotater")
                  return "crosshair";
                e3 += g.degToRad(Xe[t3] || 0);
                var i2 = (g.radToDeg(e3) % 360 + 360) % 360;
                return g._inRange(i2, 337.5, 360) || g._inRange(i2, 0, 22.5) ? "ns-resize" : g._inRange(i2, 22.5, 67.5) ? "nesw-resize" : g._inRange(i2, 67.5, 112.5) ? "ew-resize" : g._inRange(i2, 112.5, 157.5) ? "nwse-resize" : g._inRange(i2, 157.5, 202.5) ? "ns-resize" : g._inRange(i2, 202.5, 247.5) ? "nesw-resize" : g._inRange(i2, 247.5, 292.5) ? "ew-resize" : g._inRange(i2, 292.5, 337.5) ? "nwse-resize" : (g.error("Transformer has unknown angle for cursor detection: " + i2), "pointer");
              }(t2, r3);
              e2.getStage().content && (e2.getStage().content.style.cursor = a2), this._cursorChange = true;
            }), e2.on("mouseout", () => {
              e2.getStage().content && (e2.getStage().content.style.cursor = ""), this._cursorChange = false;
            }), this.add(e2);
          }
          _createBack() {
            var t2 = new zt({ name: "back", width: 0, height: 0, draggable: true, sceneFunc(t3) {
              var e2 = this.getParent(), i2 = e2.padding();
              t3.beginPath(), t3.rect(-i2, -i2, this.width() + 2 * i2, this.height() + 2 * i2), t3.moveTo(this.width() / 2, -i2), e2.rotateEnabled() && t3.lineTo(this.width() / 2, -e2.rotateAnchorOffset() * g._sign(this.height()) - i2), t3.fillStrokeShape(this);
            }, hitFunc: (t3, e2) => {
              if (this.shouldOverdrawWholeArea()) {
                var i2 = this.padding();
                t3.beginPath(), t3.rect(-i2, -i2, e2.width() + 2 * i2, e2.height() + 2 * i2), t3.fillStrokeShape(e2);
              }
            } });
            this.add(t2), this._proxyDrag(t2), t2.on("dragstart", (t3) => {
              t3.cancelBubble = true;
            }), t2.on("dragmove", (t3) => {
              t3.cancelBubble = true;
            }), t2.on("dragend", (t3) => {
              t3.cancelBubble = true;
            }), this.on("dragmove", (t3) => {
              this.update();
            });
          }
          _handleMouseDown(t2) {
            this._movingAnchorName = t2.target.name().split(" ")[0];
            var e2 = this._getNodeRect(), i2 = e2.width, r2 = e2.height, a2 = Math.sqrt(Math.pow(i2, 2) + Math.pow(r2, 2));
            this.sin = Math.abs(r2 / a2), this.cos = Math.abs(i2 / a2), typeof window != "undefined" && (window.addEventListener("mousemove", this._handleMouseMove), window.addEventListener("touchmove", this._handleMouseMove), window.addEventListener("mouseup", this._handleMouseUp, true), window.addEventListener("touchend", this._handleMouseUp, true)), this._transforming = true;
            var n2 = t2.target.getAbsolutePosition(), s2 = t2.target.getStage().getPointerPosition();
            this._anchorDragOffset = { x: s2.x - n2.x, y: s2.y - n2.y }, this._fire("transformstart", { evt: t2.evt, target: this.getNode() }), this._nodes.forEach((e3) => {
              e3._fire("transformstart", { evt: t2.evt, target: e3 });
            });
          }
          _handleMouseMove(t2) {
            var e2, r2, a2, n2 = this.findOne("." + this._movingAnchorName), s2 = n2.getStage();
            s2.setPointersPositions(t2);
            const o2 = s2.getPointerPosition();
            let h2 = { x: o2.x - this._anchorDragOffset.x, y: o2.y - this._anchorDragOffset.y };
            const l2 = n2.getAbsolutePosition();
            this.anchorDragBoundFunc() && (h2 = this.anchorDragBoundFunc()(l2, h2, t2)), n2.setAbsolutePosition(h2);
            const d2 = n2.getAbsolutePosition();
            if (l2.x !== d2.x || l2.y !== d2.y)
              if (this._movingAnchorName !== "rotater") {
                var c2 = this.keepRatio() || t2.shiftKey, g2 = this.centeredScaling() || t2.altKey;
                if (this._movingAnchorName === "top-left") {
                  if (c2) {
                    var u2 = g2 ? { x: this.width() / 2, y: this.height() / 2 } : { x: this.findOne(".bottom-right").x(), y: this.findOne(".bottom-right").y() };
                    a2 = Math.sqrt(Math.pow(u2.x - n2.x(), 2) + Math.pow(u2.y - n2.y(), 2));
                    var f2 = this.findOne(".top-left").x() > u2.x ? -1 : 1, p2 = this.findOne(".top-left").y() > u2.y ? -1 : 1;
                    e2 = a2 * this.cos * f2, r2 = a2 * this.sin * p2, this.findOne(".top-left").x(u2.x - e2), this.findOne(".top-left").y(u2.y - r2);
                  }
                } else if (this._movingAnchorName === "top-center")
                  this.findOne(".top-left").y(n2.y());
                else if (this._movingAnchorName === "top-right") {
                  if (c2) {
                    u2 = g2 ? { x: this.width() / 2, y: this.height() / 2 } : { x: this.findOne(".bottom-left").x(), y: this.findOne(".bottom-left").y() };
                    a2 = Math.sqrt(Math.pow(n2.x() - u2.x, 2) + Math.pow(u2.y - n2.y(), 2));
                    f2 = this.findOne(".top-right").x() < u2.x ? -1 : 1, p2 = this.findOne(".top-right").y() > u2.y ? -1 : 1;
                    e2 = a2 * this.cos * f2, r2 = a2 * this.sin * p2, this.findOne(".top-right").x(u2.x + e2), this.findOne(".top-right").y(u2.y - r2);
                  }
                  var v2 = n2.position();
                  this.findOne(".top-left").y(v2.y), this.findOne(".bottom-right").x(v2.x);
                } else if (this._movingAnchorName === "middle-left")
                  this.findOne(".top-left").x(n2.x());
                else if (this._movingAnchorName === "middle-right")
                  this.findOne(".bottom-right").x(n2.x());
                else if (this._movingAnchorName === "bottom-left") {
                  if (c2) {
                    u2 = g2 ? { x: this.width() / 2, y: this.height() / 2 } : { x: this.findOne(".top-right").x(), y: this.findOne(".top-right").y() };
                    a2 = Math.sqrt(Math.pow(u2.x - n2.x(), 2) + Math.pow(n2.y() - u2.y, 2));
                    f2 = u2.x < n2.x() ? -1 : 1, p2 = n2.y() < u2.y ? -1 : 1;
                    e2 = a2 * this.cos * f2, r2 = a2 * this.sin * p2, n2.x(u2.x - e2), n2.y(u2.y + r2);
                  }
                  v2 = n2.position(), this.findOne(".top-left").x(v2.x), this.findOne(".bottom-right").y(v2.y);
                } else if (this._movingAnchorName === "bottom-center")
                  this.findOne(".bottom-right").y(n2.y());
                else if (this._movingAnchorName === "bottom-right") {
                  if (c2) {
                    u2 = g2 ? { x: this.width() / 2, y: this.height() / 2 } : { x: this.findOne(".top-left").x(), y: this.findOne(".top-left").y() };
                    a2 = Math.sqrt(Math.pow(n2.x() - u2.x, 2) + Math.pow(n2.y() - u2.y, 2));
                    f2 = this.findOne(".bottom-right").x() < u2.x ? -1 : 1, p2 = this.findOne(".bottom-right").y() < u2.y ? -1 : 1;
                    e2 = a2 * this.cos * f2, r2 = a2 * this.sin * p2, this.findOne(".bottom-right").x(u2.x + e2), this.findOne(".bottom-right").y(u2.y + r2);
                  }
                } else
                  console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
                if (g2 = this.centeredScaling() || t2.altKey) {
                  var m2 = this.findOne(".top-left"), _2 = this.findOne(".bottom-right"), y2 = m2.x(), x2 = m2.y(), b2 = this.getWidth() - _2.x(), S2 = this.getHeight() - _2.y();
                  _2.move({ x: -y2, y: -x2 }), m2.move({ x: b2, y: S2 });
                }
                var w2 = this.findOne(".top-left").getAbsolutePosition();
                e2 = w2.x, r2 = w2.y;
                var C2 = this.findOne(".bottom-right").x() - this.findOne(".top-left").x(), P2 = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
                this._fitNodesInto({ x: e2, y: r2, width: C2, height: P2, rotation: i.getAngle(this.rotation()) }, t2);
              } else {
                var k2 = this._getNodeRect();
                e2 = n2.x() - k2.width / 2, r2 = -n2.y() + k2.height / 2;
                let a3 = Math.atan2(-r2, e2) + Math.PI / 2;
                k2.height < 0 && (a3 -= Math.PI);
                const s3 = i.getAngle(this.rotation()) + a3, o3 = i.getAngle(this.rotationSnapTolerance()), h3 = function(t3, e3, r3) {
                  let a4 = e3;
                  for (let n3 = 0; n3 < t3.length; n3++) {
                    const s4 = i.getAngle(t3[n3]), o4 = Math.abs(s4 - e3) % (2 * Math.PI);
                    Math.min(o4, 2 * Math.PI - o4) < r3 && (a4 = s4);
                  }
                  return a4;
                }(this.rotationSnaps(), s3, o3), l3 = Ve(k2, h3 - k2.rotation);
                this._fitNodesInto(l3, t2);
              }
          }
          _handleMouseUp(t2) {
            this._removeEvents(t2);
          }
          getAbsoluteTransform() {
            return this.getTransform();
          }
          _removeEvents(t2) {
            if (this._transforming) {
              this._transforming = false, typeof window != "undefined" && (window.removeEventListener("mousemove", this._handleMouseMove), window.removeEventListener("touchmove", this._handleMouseMove), window.removeEventListener("mouseup", this._handleMouseUp, true), window.removeEventListener("touchend", this._handleMouseUp, true));
              var e2 = this.getNode();
              this._fire("transformend", { evt: t2, target: e2 }), e2 && this._nodes.forEach((e3) => {
                e3._fire("transformend", { evt: t2, target: e3 });
              }), this._movingAnchorName = null;
            }
          }
          _fitNodesInto(t2, e2) {
            var r2 = this._getNodeRect();
            if (g._inRange(t2.width, 2 * -this.padding() - 1, 1))
              return void this.update();
            if (g._inRange(t2.height, 2 * -this.padding() - 1, 1))
              return void this.update();
            const n2 = this.flipEnabled();
            var s2 = new a();
            if (s2.rotate(i.getAngle(this.rotation())), this._movingAnchorName && t2.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
              const e3 = s2.point({ x: 2 * -this.padding(), y: 0 });
              if (t2.x += e3.x, t2.y += e3.y, t2.width += 2 * this.padding(), this._movingAnchorName = this._movingAnchorName.replace("left", "right"), this._anchorDragOffset.x -= e3.x, this._anchorDragOffset.y -= e3.y, !n2)
                return void this.update();
            } else if (this._movingAnchorName && t2.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
              const e3 = s2.point({ x: 2 * this.padding(), y: 0 });
              if (this._movingAnchorName = this._movingAnchorName.replace("right", "left"), this._anchorDragOffset.x -= e3.x, this._anchorDragOffset.y -= e3.y, t2.width += 2 * this.padding(), !n2)
                return void this.update();
            }
            if (this._movingAnchorName && t2.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
              const e3 = s2.point({ x: 0, y: 2 * -this.padding() });
              if (t2.x += e3.x, t2.y += e3.y, this._movingAnchorName = this._movingAnchorName.replace("top", "bottom"), this._anchorDragOffset.x -= e3.x, this._anchorDragOffset.y -= e3.y, t2.height += 2 * this.padding(), !n2)
                return void this.update();
            } else if (this._movingAnchorName && t2.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
              const e3 = s2.point({ x: 0, y: 2 * this.padding() });
              if (this._movingAnchorName = this._movingAnchorName.replace("bottom", "top"), this._anchorDragOffset.x -= e3.x, this._anchorDragOffset.y -= e3.y, t2.height += 2 * this.padding(), !n2)
                return void this.update();
            }
            if (this.boundBoxFunc()) {
              const e3 = this.boundBoxFunc()(r2, t2);
              e3 ? t2 = e3 : g.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
            }
            const o2 = 1e7, h2 = new a();
            h2.translate(r2.x, r2.y), h2.rotate(r2.rotation), h2.scale(r2.width / o2, r2.height / o2);
            const l2 = new a();
            l2.translate(t2.x, t2.y), l2.rotate(t2.rotation), l2.scale(t2.width / o2, t2.height / o2);
            const d2 = l2.multiply(h2.invert());
            this._nodes.forEach((t3) => {
              var i2;
              const r3 = t3.getParent().getAbsoluteTransform(), n3 = t3.getTransform().copy();
              n3.translate(t3.offsetX(), t3.offsetY());
              const s3 = new a();
              s3.multiply(r3.copy().invert()).multiply(d2).multiply(r3).multiply(n3);
              const o3 = s3.decompose();
              t3.setAttrs(o3), this._fire("transform", { evt: e2, target: t3 }), t3._fire("transform", { evt: e2, target: t3 }), (i2 = t3.getLayer()) === null || i2 === void 0 || i2.batchDraw();
            }), this.rotation(g._getRotation(t2.rotation)), this._resetTransformCache(), this.update(), this.getLayer().batchDraw();
          }
          forceUpdate() {
            this._resetTransformCache(), this.update();
          }
          _batchChangeChild(t2, e2) {
            this.findOne(t2).setAttrs(e2);
          }
          update() {
            var t2, e2 = this._getNodeRect();
            this.rotation(g._getRotation(e2.rotation));
            var i2 = e2.width, r2 = e2.height, a2 = this.enabledAnchors(), n2 = this.resizeEnabled(), s2 = this.padding(), o2 = this.anchorSize();
            this.find("._anchor").forEach((t3) => {
              t3.setAttrs({ width: o2, height: o2, offsetX: o2 / 2, offsetY: o2 / 2, stroke: this.anchorStroke(), strokeWidth: this.anchorStrokeWidth(), fill: this.anchorFill(), cornerRadius: this.anchorCornerRadius() });
            }), this._batchChangeChild(".top-left", { x: 0, y: 0, offsetX: o2 / 2 + s2, offsetY: o2 / 2 + s2, visible: n2 && a2.indexOf("top-left") >= 0 }), this._batchChangeChild(".top-center", { x: i2 / 2, y: 0, offsetY: o2 / 2 + s2, visible: n2 && a2.indexOf("top-center") >= 0 }), this._batchChangeChild(".top-right", { x: i2, y: 0, offsetX: o2 / 2 - s2, offsetY: o2 / 2 + s2, visible: n2 && a2.indexOf("top-right") >= 0 }), this._batchChangeChild(".middle-left", { x: 0, y: r2 / 2, offsetX: o2 / 2 + s2, visible: n2 && a2.indexOf("middle-left") >= 0 }), this._batchChangeChild(".middle-right", { x: i2, y: r2 / 2, offsetX: o2 / 2 - s2, visible: n2 && a2.indexOf("middle-right") >= 0 }), this._batchChangeChild(".bottom-left", { x: 0, y: r2, offsetX: o2 / 2 + s2, offsetY: o2 / 2 - s2, visible: n2 && a2.indexOf("bottom-left") >= 0 }), this._batchChangeChild(".bottom-center", { x: i2 / 2, y: r2, offsetY: o2 / 2 - s2, visible: n2 && a2.indexOf("bottom-center") >= 0 }), this._batchChangeChild(".bottom-right", { x: i2, y: r2, offsetX: o2 / 2 - s2, offsetY: o2 / 2 - s2, visible: n2 && a2.indexOf("bottom-right") >= 0 }), this._batchChangeChild(".rotater", { x: i2 / 2, y: -this.rotateAnchorOffset() * g._sign(r2) - s2, visible: this.rotateEnabled() }), this._batchChangeChild(".back", { width: i2, height: r2, visible: this.borderEnabled(), stroke: this.borderStroke(), strokeWidth: this.borderStrokeWidth(), dash: this.borderDash(), x: 0, y: 0 }), (t2 = this.getLayer()) === null || t2 === void 0 || t2.batchDraw();
          }
          isTransforming() {
            return this._transforming;
          }
          stopTransform() {
            if (this._transforming) {
              this._removeEvents();
              var t2 = this.findOne("." + this._movingAnchorName);
              t2 && t2.stopDrag();
            }
          }
          destroy() {
            return this.getStage() && this._cursorChange && this.getStage().content && (this.getStage().content.style.cursor = ""), jt.prototype.destroy.call(this), this.detach(), this._removeEvents(), this;
          }
          toObject() {
            return K.prototype.toObject.call(this);
          }
        }
        Ke.prototype.className = "Transformer", r(Ke), w.addGetterSetter(Ke, "enabledAnchors", Ue, function(t2) {
          return t2 instanceof Array || g.warn("enabledAnchors value should be an array"), t2 instanceof Array && t2.forEach(function(t3) {
            Ue.indexOf(t3) === -1 && g.warn("Unknown anchor name: " + t3 + ". Available names are: " + Ue.join(", "));
          }), t2 || [];
        }), w.addGetterSetter(Ke, "flipEnabled", true, x()), w.addGetterSetter(Ke, "resizeEnabled", true), w.addGetterSetter(Ke, "anchorSize", 10, p()), w.addGetterSetter(Ke, "rotateEnabled", true), w.addGetterSetter(Ke, "rotationSnaps", []), w.addGetterSetter(Ke, "rotateAnchorOffset", 50, p()), w.addGetterSetter(Ke, "rotationSnapTolerance", 5, p()), w.addGetterSetter(Ke, "borderEnabled", true), w.addGetterSetter(Ke, "anchorStroke", "rgb(0, 161, 255)"), w.addGetterSetter(Ke, "anchorStrokeWidth", 1, p()), w.addGetterSetter(Ke, "anchorFill", "white"), w.addGetterSetter(Ke, "anchorCornerRadius", 0, p()), w.addGetterSetter(Ke, "borderStroke", "rgb(0, 161, 255)"), w.addGetterSetter(Ke, "borderStrokeWidth", 1, p()), w.addGetterSetter(Ke, "borderDash"), w.addGetterSetter(Ke, "keepRatio", true), w.addGetterSetter(Ke, "centeredScaling", false), w.addGetterSetter(Ke, "ignoreStroke", false), w.addGetterSetter(Ke, "padding", 0, p()), w.addGetterSetter(Ke, "node"), w.addGetterSetter(Ke, "nodes"), w.addGetterSetter(Ke, "boundBoxFunc"), w.addGetterSetter(Ke, "anchorDragBoundFunc"), w.addGetterSetter(Ke, "shouldOverdrawWholeArea", false), w.addGetterSetter(Ke, "useSingleNodeRotation", true), w.backCompat(Ke, { lineEnabled: "borderEnabled", rotateHandlerOffset: "rotateAnchorOffset", enabledHandlers: "enabledAnchors" });
        class Qe extends zt {
          _sceneFunc(t2) {
            t2.beginPath(), t2.arc(0, 0, this.radius(), 0, i.getAngle(this.angle()), this.clockwise()), t2.lineTo(0, 0), t2.closePath(), t2.fillStrokeShape(this);
          }
          getWidth() {
            return 2 * this.radius();
          }
          getHeight() {
            return 2 * this.radius();
          }
          setWidth(t2) {
            this.radius(t2 / 2);
          }
          setHeight(t2) {
            this.radius(t2 / 2);
          }
        }
        function Je() {
          this.r = 0, this.g = 0, this.b = 0, this.a = 0, this.next = null;
        }
        Qe.prototype.className = "Wedge", Qe.prototype._centroid = true, Qe.prototype._attrsAffectingSize = ["radius"], r(Qe), w.addGetterSetter(Qe, "radius", 0, p()), w.addGetterSetter(Qe, "angle", 0, p()), w.addGetterSetter(Qe, "clockwise", false), w.backCompat(Qe, { angleDeg: "angle", getAngleDeg: "getAngle", setAngleDeg: "setAngle" });
        var Ze = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259], $e = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
        w.addGetterSetter(K, "blurRadius", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "brightness", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "contrast", 0, p(), w.afterSetFilter);
        function ti(t2, e2, i2, r2, a2) {
          var n2 = i2 - e2, s2 = a2 - r2;
          return n2 === 0 ? r2 + s2 / 2 : s2 === 0 ? r2 : s2 * ((t2 - e2) / n2) + r2;
        }
        w.addGetterSetter(K, "embossStrength", 0.5, p(), w.afterSetFilter), w.addGetterSetter(K, "embossWhiteLevel", 0.5, p(), w.afterSetFilter), w.addGetterSetter(K, "embossDirection", "top-left", null, w.afterSetFilter), w.addGetterSetter(K, "embossBlend", false, null, w.afterSetFilter);
        w.addGetterSetter(K, "enhance", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "hue", 0, p(), w.afterSetFilter), w.addGetterSetter(K, "saturation", 0, p(), w.afterSetFilter), w.addGetterSetter(K, "luminance", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "hue", 0, p(), w.afterSetFilter), w.addGetterSetter(K, "saturation", 0, p(), w.afterSetFilter), w.addGetterSetter(K, "value", 0, p(), w.afterSetFilter);
        function ei(t2, e2, i2) {
          var r2 = 4 * (i2 * t2.width + e2), a2 = [];
          return a2.push(t2.data[r2++], t2.data[r2++], t2.data[r2++], t2.data[r2++]), a2;
        }
        function ii(t2, e2) {
          return Math.sqrt(Math.pow(t2[0] - e2[0], 2) + Math.pow(t2[1] - e2[1], 2) + Math.pow(t2[2] - e2[2], 2));
        }
        w.addGetterSetter(K, "kaleidoscopePower", 2, p(), w.afterSetFilter), w.addGetterSetter(K, "kaleidoscopeAngle", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "threshold", 0, p(), w.afterSetFilter);
        w.addGetterSetter(K, "noise", 0.2, p(), w.afterSetFilter);
        w.addGetterSetter(K, "pixelSize", 8, p(), w.afterSetFilter);
        w.addGetterSetter(K, "levels", 0.5, p(), w.afterSetFilter);
        w.addGetterSetter(K, "red", 0, function(t2) {
          return this._filterUpToDate = false, t2 > 255 ? 255 : t2 < 0 ? 0 : Math.round(t2);
        }), w.addGetterSetter(K, "green", 0, function(t2) {
          return this._filterUpToDate = false, t2 > 255 ? 255 : t2 < 0 ? 0 : Math.round(t2);
        }), w.addGetterSetter(K, "blue", 0, f, w.afterSetFilter);
        w.addGetterSetter(K, "red", 0, function(t2) {
          return this._filterUpToDate = false, t2 > 255 ? 255 : t2 < 0 ? 0 : Math.round(t2);
        }), w.addGetterSetter(K, "green", 0, function(t2) {
          return this._filterUpToDate = false, t2 > 255 ? 255 : t2 < 0 ? 0 : Math.round(t2);
        }), w.addGetterSetter(K, "blue", 0, f, w.afterSetFilter), w.addGetterSetter(K, "alpha", 1, function(t2) {
          return this._filterUpToDate = false, t2 > 1 ? 1 : t2 < 0 ? 0 : t2;
        });
        w.addGetterSetter(K, "threshold", 0.5, p(), w.afterSetFilter);
        return te.Util._assign(te, { Arc: ee, Arrow: se, Circle: oe, Ellipse: he, Image: le, Label: ve, Tag: me, Line: ae, Path: ne, Rect: _e, RegularPolygon: ye, Ring: be, Sprite: Se, Star: we, Text: Oe, TextPath: Be, Transformer: Ke, Wedge: Qe, Filters: { Blur: function(t2) {
          var e2 = Math.round(this.blurRadius());
          e2 > 0 && function(t3, e3) {
            var i2, r2, a2, n2, s2, o2, h2, l2, d2, c2, g2, u2, f2, p2, v2, m2, _2, y2, x2, b2, S2, w2, C2, P2, k2 = t3.data, T2 = t3.width, A2 = t3.height, M2 = e3 + e3 + 1, G2 = T2 - 1, E2 = A2 - 1, R2 = e3 + 1, L2 = R2 * (R2 + 1) / 2, D2 = new Je(), O2 = null, I2 = D2, F2 = null, N2 = null, B2 = Ze[e3], z2 = $e[e3];
            for (a2 = 1; a2 < M2; a2++)
              I2 = I2.next = new Je(), a2 === R2 && (O2 = I2);
            for (I2.next = D2, h2 = o2 = 0, r2 = 0; r2 < A2; r2++) {
              for (m2 = _2 = y2 = x2 = l2 = d2 = c2 = g2 = 0, u2 = R2 * (b2 = k2[o2]), f2 = R2 * (S2 = k2[o2 + 1]), p2 = R2 * (w2 = k2[o2 + 2]), v2 = R2 * (C2 = k2[o2 + 3]), l2 += L2 * b2, d2 += L2 * S2, c2 += L2 * w2, g2 += L2 * C2, I2 = D2, a2 = 0; a2 < R2; a2++)
                I2.r = b2, I2.g = S2, I2.b = w2, I2.a = C2, I2 = I2.next;
              for (a2 = 1; a2 < R2; a2++)
                n2 = o2 + ((G2 < a2 ? G2 : a2) << 2), l2 += (I2.r = b2 = k2[n2]) * (P2 = R2 - a2), d2 += (I2.g = S2 = k2[n2 + 1]) * P2, c2 += (I2.b = w2 = k2[n2 + 2]) * P2, g2 += (I2.a = C2 = k2[n2 + 3]) * P2, m2 += b2, _2 += S2, y2 += w2, x2 += C2, I2 = I2.next;
              for (F2 = D2, N2 = O2, i2 = 0; i2 < T2; i2++)
                k2[o2 + 3] = C2 = g2 * B2 >> z2, C2 !== 0 ? (C2 = 255 / C2, k2[o2] = (l2 * B2 >> z2) * C2, k2[o2 + 1] = (d2 * B2 >> z2) * C2, k2[o2 + 2] = (c2 * B2 >> z2) * C2) : k2[o2] = k2[o2 + 1] = k2[o2 + 2] = 0, l2 -= u2, d2 -= f2, c2 -= p2, g2 -= v2, u2 -= F2.r, f2 -= F2.g, p2 -= F2.b, v2 -= F2.a, n2 = h2 + ((n2 = i2 + e3 + 1) < G2 ? n2 : G2) << 2, l2 += m2 += F2.r = k2[n2], d2 += _2 += F2.g = k2[n2 + 1], c2 += y2 += F2.b = k2[n2 + 2], g2 += x2 += F2.a = k2[n2 + 3], F2 = F2.next, u2 += b2 = N2.r, f2 += S2 = N2.g, p2 += w2 = N2.b, v2 += C2 = N2.a, m2 -= b2, _2 -= S2, y2 -= w2, x2 -= C2, N2 = N2.next, o2 += 4;
              h2 += T2;
            }
            for (i2 = 0; i2 < T2; i2++) {
              for (_2 = y2 = x2 = m2 = d2 = c2 = g2 = l2 = 0, u2 = R2 * (b2 = k2[o2 = i2 << 2]), f2 = R2 * (S2 = k2[o2 + 1]), p2 = R2 * (w2 = k2[o2 + 2]), v2 = R2 * (C2 = k2[o2 + 3]), l2 += L2 * b2, d2 += L2 * S2, c2 += L2 * w2, g2 += L2 * C2, I2 = D2, a2 = 0; a2 < R2; a2++)
                I2.r = b2, I2.g = S2, I2.b = w2, I2.a = C2, I2 = I2.next;
              for (s2 = T2, a2 = 1; a2 <= e3; a2++)
                o2 = s2 + i2 << 2, l2 += (I2.r = b2 = k2[o2]) * (P2 = R2 - a2), d2 += (I2.g = S2 = k2[o2 + 1]) * P2, c2 += (I2.b = w2 = k2[o2 + 2]) * P2, g2 += (I2.a = C2 = k2[o2 + 3]) * P2, m2 += b2, _2 += S2, y2 += w2, x2 += C2, I2 = I2.next, a2 < E2 && (s2 += T2);
              for (o2 = i2, F2 = D2, N2 = O2, r2 = 0; r2 < A2; r2++)
                k2[3 + (n2 = o2 << 2)] = C2 = g2 * B2 >> z2, C2 > 0 ? (C2 = 255 / C2, k2[n2] = (l2 * B2 >> z2) * C2, k2[n2 + 1] = (d2 * B2 >> z2) * C2, k2[n2 + 2] = (c2 * B2 >> z2) * C2) : k2[n2] = k2[n2 + 1] = k2[n2 + 2] = 0, l2 -= u2, d2 -= f2, c2 -= p2, g2 -= v2, u2 -= F2.r, f2 -= F2.g, p2 -= F2.b, v2 -= F2.a, n2 = i2 + ((n2 = r2 + R2) < E2 ? n2 : E2) * T2 << 2, l2 += m2 += F2.r = k2[n2], d2 += _2 += F2.g = k2[n2 + 1], c2 += y2 += F2.b = k2[n2 + 2], g2 += x2 += F2.a = k2[n2 + 3], F2 = F2.next, u2 += b2 = N2.r, f2 += S2 = N2.g, p2 += w2 = N2.b, v2 += C2 = N2.a, m2 -= b2, _2 -= S2, y2 -= w2, x2 -= C2, N2 = N2.next, o2 += T2;
            }
          }(t2, e2);
        }, Brighten: function(t2) {
          var e2, i2 = 255 * this.brightness(), r2 = t2.data, a2 = r2.length;
          for (e2 = 0; e2 < a2; e2 += 4)
            r2[e2] += i2, r2[e2 + 1] += i2, r2[e2 + 2] += i2;
        }, Contrast: function(t2) {
          var e2, i2 = Math.pow((this.contrast() + 100) / 100, 2), r2 = t2.data, a2 = r2.length, n2 = 150, s2 = 150, o2 = 150;
          for (e2 = 0; e2 < a2; e2 += 4)
            n2 = r2[e2], s2 = r2[e2 + 1], o2 = r2[e2 + 2], n2 /= 255, n2 -= 0.5, n2 *= i2, n2 += 0.5, s2 /= 255, s2 -= 0.5, s2 *= i2, s2 += 0.5, o2 /= 255, o2 -= 0.5, o2 *= i2, o2 += 0.5, n2 = (n2 *= 255) < 0 ? 0 : n2 > 255 ? 255 : n2, s2 = (s2 *= 255) < 0 ? 0 : s2 > 255 ? 255 : s2, o2 = (o2 *= 255) < 0 ? 0 : o2 > 255 ? 255 : o2, r2[e2] = n2, r2[e2 + 1] = s2, r2[e2 + 2] = o2;
        }, Emboss: function(t2) {
          var e2 = 10 * this.embossStrength(), i2 = 255 * this.embossWhiteLevel(), r2 = this.embossDirection(), a2 = this.embossBlend(), n2 = 0, s2 = 0, o2 = t2.data, h2 = t2.width, l2 = t2.height, d2 = 4 * h2, c2 = l2;
          switch (r2) {
            case "top-left":
              n2 = -1, s2 = -1;
              break;
            case "top":
              n2 = -1, s2 = 0;
              break;
            case "top-right":
              n2 = -1, s2 = 1;
              break;
            case "right":
              n2 = 0, s2 = 1;
              break;
            case "bottom-right":
              n2 = 1, s2 = 1;
              break;
            case "bottom":
              n2 = 1, s2 = 0;
              break;
            case "bottom-left":
              n2 = 1, s2 = -1;
              break;
            case "left":
              n2 = 0, s2 = -1;
              break;
            default:
              g.error("Unknown emboss direction: " + r2);
          }
          do {
            var u2 = (c2 - 1) * d2, f2 = n2;
            c2 + f2 < 1 && (f2 = 0), c2 + f2 > l2 && (f2 = 0);
            var p2 = (c2 - 1 + f2) * h2 * 4, v2 = h2;
            do {
              var m2 = u2 + 4 * (v2 - 1), _2 = s2;
              v2 + _2 < 1 && (_2 = 0), v2 + _2 > h2 && (_2 = 0);
              var y2 = p2 + 4 * (v2 - 1 + _2), x2 = o2[m2] - o2[y2], b2 = o2[m2 + 1] - o2[y2 + 1], S2 = o2[m2 + 2] - o2[y2 + 2], w2 = x2, C2 = w2 > 0 ? w2 : -w2;
              if ((b2 > 0 ? b2 : -b2) > C2 && (w2 = b2), (S2 > 0 ? S2 : -S2) > C2 && (w2 = S2), w2 *= e2, a2) {
                var P2 = o2[m2] + w2, k2 = o2[m2 + 1] + w2, T2 = o2[m2 + 2] + w2;
                o2[m2] = P2 > 255 ? 255 : P2 < 0 ? 0 : P2, o2[m2 + 1] = k2 > 255 ? 255 : k2 < 0 ? 0 : k2, o2[m2 + 2] = T2 > 255 ? 255 : T2 < 0 ? 0 : T2;
              } else {
                var A2 = i2 - w2;
                A2 < 0 ? A2 = 0 : A2 > 255 && (A2 = 255), o2[m2] = o2[m2 + 1] = o2[m2 + 2] = A2;
              }
            } while (--v2);
          } while (--c2);
        }, Enhance: function(t2) {
          var e2, i2, r2, a2, n2 = t2.data, s2 = n2.length, o2 = n2[0], h2 = o2, l2 = n2[1], d2 = l2, c2 = n2[2], g2 = c2, u2 = this.enhance();
          if (u2 !== 0) {
            for (a2 = 0; a2 < s2; a2 += 4)
              (e2 = n2[a2 + 0]) < o2 ? o2 = e2 : e2 > h2 && (h2 = e2), (i2 = n2[a2 + 1]) < l2 ? l2 = i2 : i2 > d2 && (d2 = i2), (r2 = n2[a2 + 2]) < c2 ? c2 = r2 : r2 > g2 && (g2 = r2);
            var f2, p2, v2, m2, _2, y2, x2, b2, S2;
            for (h2 === o2 && (h2 = 255, o2 = 0), d2 === l2 && (d2 = 255, l2 = 0), g2 === c2 && (g2 = 255, c2 = 0), u2 > 0 ? (p2 = h2 + u2 * (255 - h2), v2 = o2 - u2 * (o2 - 0), _2 = d2 + u2 * (255 - d2), y2 = l2 - u2 * (l2 - 0), b2 = g2 + u2 * (255 - g2), S2 = c2 - u2 * (c2 - 0)) : (p2 = h2 + u2 * (h2 - (f2 = 0.5 * (h2 + o2))), v2 = o2 + u2 * (o2 - f2), _2 = d2 + u2 * (d2 - (m2 = 0.5 * (d2 + l2))), y2 = l2 + u2 * (l2 - m2), b2 = g2 + u2 * (g2 - (x2 = 0.5 * (g2 + c2))), S2 = c2 + u2 * (c2 - x2)), a2 = 0; a2 < s2; a2 += 4)
              n2[a2 + 0] = ti(n2[a2 + 0], o2, h2, v2, p2), n2[a2 + 1] = ti(n2[a2 + 1], l2, d2, y2, _2), n2[a2 + 2] = ti(n2[a2 + 2], c2, g2, S2, b2);
          }
        }, Grayscale: function(t2) {
          var e2, i2, r2 = t2.data, a2 = r2.length;
          for (e2 = 0; e2 < a2; e2 += 4)
            i2 = 0.34 * r2[e2] + 0.5 * r2[e2 + 1] + 0.16 * r2[e2 + 2], r2[e2] = i2, r2[e2 + 1] = i2, r2[e2 + 2] = i2;
        }, HSL: function(t2) {
          var e2, i2, r2, a2, n2, s2 = t2.data, o2 = s2.length, h2 = Math.pow(2, this.saturation()), l2 = Math.abs(this.hue() + 360) % 360, d2 = 127 * this.luminance(), c2 = 1 * h2 * Math.cos(l2 * Math.PI / 180), g2 = 1 * h2 * Math.sin(l2 * Math.PI / 180), u2 = 0.299 + 0.701 * c2 + 0.167 * g2, f2 = 0.587 - 0.587 * c2 + 0.33 * g2, p2 = 0.114 - 0.114 * c2 - 0.497 * g2, v2 = 0.299 - 0.299 * c2 - 0.328 * g2, m2 = 0.587 + 0.413 * c2 + 0.035 * g2, _2 = 0.114 - 0.114 * c2 + 0.293 * g2, y2 = 0.299 - 0.3 * c2 + 1.25 * g2, x2 = 0.587 - 0.586 * c2 - 1.05 * g2, b2 = 0.114 + 0.886 * c2 - 0.2 * g2;
          for (e2 = 0; e2 < o2; e2 += 4)
            i2 = s2[e2 + 0], r2 = s2[e2 + 1], a2 = s2[e2 + 2], n2 = s2[e2 + 3], s2[e2 + 0] = u2 * i2 + f2 * r2 + p2 * a2 + d2, s2[e2 + 1] = v2 * i2 + m2 * r2 + _2 * a2 + d2, s2[e2 + 2] = y2 * i2 + x2 * r2 + b2 * a2 + d2, s2[e2 + 3] = n2;
        }, HSV: function(t2) {
          var e2, i2, r2, a2, n2, s2 = t2.data, o2 = s2.length, h2 = Math.pow(2, this.value()), l2 = Math.pow(2, this.saturation()), d2 = Math.abs(this.hue() + 360) % 360, c2 = h2 * l2 * Math.cos(d2 * Math.PI / 180), g2 = h2 * l2 * Math.sin(d2 * Math.PI / 180), u2 = 0.299 * h2 + 0.701 * c2 + 0.167 * g2, f2 = 0.587 * h2 - 0.587 * c2 + 0.33 * g2, p2 = 0.114 * h2 - 0.114 * c2 - 0.497 * g2, v2 = 0.299 * h2 - 0.299 * c2 - 0.328 * g2, m2 = 0.587 * h2 + 0.413 * c2 + 0.035 * g2, _2 = 0.114 * h2 - 0.114 * c2 + 0.293 * g2, y2 = 0.299 * h2 - 0.3 * c2 + 1.25 * g2, x2 = 0.587 * h2 - 0.586 * c2 - 1.05 * g2, b2 = 0.114 * h2 + 0.886 * c2 - 0.2 * g2;
          for (e2 = 0; e2 < o2; e2 += 4)
            i2 = s2[e2 + 0], r2 = s2[e2 + 1], a2 = s2[e2 + 2], n2 = s2[e2 + 3], s2[e2 + 0] = u2 * i2 + f2 * r2 + p2 * a2, s2[e2 + 1] = v2 * i2 + m2 * r2 + _2 * a2, s2[e2 + 2] = y2 * i2 + x2 * r2 + b2 * a2, s2[e2 + 3] = n2;
        }, Invert: function(t2) {
          var e2, i2 = t2.data, r2 = i2.length;
          for (e2 = 0; e2 < r2; e2 += 4)
            i2[e2] = 255 - i2[e2], i2[e2 + 1] = 255 - i2[e2 + 1], i2[e2 + 2] = 255 - i2[e2 + 2];
        }, Kaleidoscope: function(t2) {
          var e2, i2, r2, a2, n2, s2, o2, h2, l2, d2 = t2.width, c2 = t2.height, u2 = Math.round(this.kaleidoscopePower()), f2 = Math.round(this.kaleidoscopeAngle()), p2 = Math.floor(d2 * (f2 % 360) / 360);
          if (!(u2 < 1)) {
            var v2 = g.createCanvasElement();
            v2.width = d2, v2.height = c2;
            var m2 = v2.getContext("2d").getImageData(0, 0, d2, c2);
            !function(t3, e3, i3) {
              var r3, a3, n3, s3, o3 = t3.data, h3 = e3.data, l3 = t3.width, d3 = t3.height, c3 = i3.polarCenterX || l3 / 2, g2 = i3.polarCenterY || d3 / 2, u3 = 0, f3 = 0, p3 = 0, v3 = 0, m3 = Math.sqrt(c3 * c3 + g2 * g2);
              a3 = l3 - c3, n3 = d3 - g2, m3 = (s3 = Math.sqrt(a3 * a3 + n3 * n3)) > m3 ? s3 : m3;
              var _3, y3, x3, b3, S3 = d3, w2 = l3, C2 = 360 / w2 * Math.PI / 180;
              for (y3 = 0; y3 < w2; y3 += 1)
                for (x3 = Math.sin(y3 * C2), b3 = Math.cos(y3 * C2), _3 = 0; _3 < S3; _3 += 1)
                  a3 = Math.floor(c3 + m3 * _3 / S3 * b3), u3 = o3[0 + (r3 = 4 * ((n3 = Math.floor(g2 + m3 * _3 / S3 * x3)) * l3 + a3))], f3 = o3[r3 + 1], p3 = o3[r3 + 2], v3 = o3[r3 + 3], h3[0 + (r3 = 4 * (y3 + _3 * l3))] = u3, h3[r3 + 1] = f3, h3[r3 + 2] = p3, h3[r3 + 3] = v3;
            }(t2, m2, { polarCenterX: d2 / 2, polarCenterY: c2 / 2 });
            for (var _2 = d2 / Math.pow(2, u2); _2 <= 8; )
              _2 *= 2, u2 -= 1;
            var y2 = _2 = Math.ceil(_2), x2 = 0, b2 = y2, S2 = 1;
            for (p2 + _2 > d2 && (x2 = y2, b2 = 0, S2 = -1), i2 = 0; i2 < c2; i2 += 1)
              for (e2 = x2; e2 !== b2; e2 += S2)
                h2 = 4 * (d2 * i2 + Math.round(e2 + p2) % d2), a2 = m2.data[h2 + 0], n2 = m2.data[h2 + 1], s2 = m2.data[h2 + 2], o2 = m2.data[h2 + 3], l2 = 4 * (d2 * i2 + e2), m2.data[l2 + 0] = a2, m2.data[l2 + 1] = n2, m2.data[l2 + 2] = s2, m2.data[l2 + 3] = o2;
            for (i2 = 0; i2 < c2; i2 += 1)
              for (y2 = Math.floor(_2), r2 = 0; r2 < u2; r2 += 1) {
                for (e2 = 0; e2 < y2 + 1; e2 += 1)
                  h2 = 4 * (d2 * i2 + e2), a2 = m2.data[h2 + 0], n2 = m2.data[h2 + 1], s2 = m2.data[h2 + 2], o2 = m2.data[h2 + 3], l2 = 4 * (d2 * i2 + 2 * y2 - e2 - 1), m2.data[l2 + 0] = a2, m2.data[l2 + 1] = n2, m2.data[l2 + 2] = s2, m2.data[l2 + 3] = o2;
                y2 *= 2;
              }
            !function(t3, e3, i3) {
              var r3, a3, n3, s3, o3, h3, l3 = t3.data, d3 = e3.data, c3 = t3.width, g2 = t3.height, u3 = i3.polarCenterX || c3 / 2, f3 = i3.polarCenterY || g2 / 2, p3 = 0, v3 = 0, m3 = 0, _3 = 0, y3 = Math.sqrt(u3 * u3 + f3 * f3);
              a3 = c3 - u3, n3 = g2 - f3, y3 = (h3 = Math.sqrt(a3 * a3 + n3 * n3)) > y3 ? h3 : y3;
              var x3, b3, S3, w2 = g2, C2 = c3, P2 = i3.polarRotation || 0;
              for (a3 = 0; a3 < c3; a3 += 1)
                for (n3 = 0; n3 < g2; n3 += 1)
                  s3 = a3 - u3, o3 = n3 - f3, x3 = Math.sqrt(s3 * s3 + o3 * o3) * w2 / y3, b3 = (b3 = (180 * Math.atan2(o3, s3) / Math.PI + 360 + P2) % 360) * C2 / 360, S3 = Math.floor(b3), p3 = l3[0 + (r3 = 4 * (Math.floor(x3) * c3 + S3))], v3 = l3[r3 + 1], m3 = l3[r3 + 2], _3 = l3[r3 + 3], d3[0 + (r3 = 4 * (n3 * c3 + a3))] = p3, d3[r3 + 1] = v3, d3[r3 + 2] = m3, d3[r3 + 3] = _3;
            }(m2, t2, { polarRotation: 0 });
          }
        }, Mask: function(t2) {
          var e2 = function(t3, e3) {
            var i2 = ei(t3, 0, 0), r2 = ei(t3, t3.width - 1, 0), a2 = ei(t3, 0, t3.height - 1), n2 = ei(t3, t3.width - 1, t3.height - 1), s2 = e3 || 10;
            if (ii(i2, r2) < s2 && ii(r2, n2) < s2 && ii(n2, a2) < s2 && ii(a2, i2) < s2) {
              for (var o2 = function(t4) {
                for (var e4 = [0, 0, 0], i3 = 0; i3 < t4.length; i3++)
                  e4[0] += t4[i3][0], e4[1] += t4[i3][1], e4[2] += t4[i3][2];
                return e4[0] /= t4.length, e4[1] /= t4.length, e4[2] /= t4.length, e4;
              }([r2, i2, n2, a2]), h2 = [], l2 = 0; l2 < t3.width * t3.height; l2++) {
                var d2 = ii(o2, [t3.data[4 * l2], t3.data[4 * l2 + 1], t3.data[4 * l2 + 2]]);
                h2[l2] = d2 < s2 ? 0 : 255;
              }
              return h2;
            }
          }(t2, this.threshold());
          return e2 && function(t3, e3) {
            for (var i2 = 0; i2 < t3.width * t3.height; i2++)
              t3.data[4 * i2 + 3] = e3[i2];
          }(t2, e2 = function(t3, e3, i2) {
            for (var r2 = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9], a2 = Math.round(Math.sqrt(r2.length)), n2 = Math.floor(a2 / 2), s2 = [], o2 = 0; o2 < i2; o2++)
              for (var h2 = 0; h2 < e3; h2++) {
                for (var l2 = o2 * e3 + h2, d2 = 0, c2 = 0; c2 < a2; c2++)
                  for (var g2 = 0; g2 < a2; g2++) {
                    var u2 = o2 + c2 - n2, f2 = h2 + g2 - n2;
                    if (u2 >= 0 && u2 < i2 && f2 >= 0 && f2 < e3) {
                      var p2 = r2[c2 * a2 + g2];
                      d2 += t3[u2 * e3 + f2] * p2;
                    }
                  }
                s2[l2] = d2;
              }
            return s2;
          }(e2 = function(t3, e3, i2) {
            for (var r2 = [1, 1, 1, 1, 1, 1, 1, 1, 1], a2 = Math.round(Math.sqrt(r2.length)), n2 = Math.floor(a2 / 2), s2 = [], o2 = 0; o2 < i2; o2++)
              for (var h2 = 0; h2 < e3; h2++) {
                for (var l2 = o2 * e3 + h2, d2 = 0, c2 = 0; c2 < a2; c2++)
                  for (var g2 = 0; g2 < a2; g2++) {
                    var u2 = o2 + c2 - n2, f2 = h2 + g2 - n2;
                    if (u2 >= 0 && u2 < i2 && f2 >= 0 && f2 < e3) {
                      var p2 = r2[c2 * a2 + g2];
                      d2 += t3[u2 * e3 + f2] * p2;
                    }
                  }
                s2[l2] = d2 >= 1020 ? 255 : 0;
              }
            return s2;
          }(e2 = function(t3, e3, i2) {
            for (var r2 = [1, 1, 1, 1, 0, 1, 1, 1, 1], a2 = Math.round(Math.sqrt(r2.length)), n2 = Math.floor(a2 / 2), s2 = [], o2 = 0; o2 < i2; o2++)
              for (var h2 = 0; h2 < e3; h2++) {
                for (var l2 = o2 * e3 + h2, d2 = 0, c2 = 0; c2 < a2; c2++)
                  for (var g2 = 0; g2 < a2; g2++) {
                    var u2 = o2 + c2 - n2, f2 = h2 + g2 - n2;
                    if (u2 >= 0 && u2 < i2 && f2 >= 0 && f2 < e3) {
                      var p2 = r2[c2 * a2 + g2];
                      d2 += t3[u2 * e3 + f2] * p2;
                    }
                  }
                s2[l2] = d2 === 2040 ? 255 : 0;
              }
            return s2;
          }(e2, t2.width, t2.height), t2.width, t2.height), t2.width, t2.height)), t2;
        }, Noise: function(t2) {
          var e2, i2 = 255 * this.noise(), r2 = t2.data, a2 = r2.length, n2 = i2 / 2;
          for (e2 = 0; e2 < a2; e2 += 4)
            r2[e2 + 0] += n2 - 2 * n2 * Math.random(), r2[e2 + 1] += n2 - 2 * n2 * Math.random(), r2[e2 + 2] += n2 - 2 * n2 * Math.random();
        }, Pixelate: function(t2) {
          var e2, i2, r2, a2, n2, s2, o2, h2, l2, d2, c2, u2, f2, p2, v2 = Math.ceil(this.pixelSize()), m2 = t2.width, _2 = t2.height, y2 = Math.ceil(m2 / v2), x2 = Math.ceil(_2 / v2), b2 = t2.data;
          if (v2 <= 0)
            g.error("pixelSize value can not be <= 0");
          else
            for (u2 = 0; u2 < y2; u2 += 1)
              for (f2 = 0; f2 < x2; f2 += 1) {
                for (a2 = 0, n2 = 0, s2 = 0, o2 = 0, l2 = (h2 = u2 * v2) + v2, c2 = (d2 = f2 * v2) + v2, p2 = 0, e2 = h2; e2 < l2; e2 += 1)
                  if (!(e2 >= m2))
                    for (i2 = d2; i2 < c2; i2 += 1)
                      i2 >= _2 || (a2 += b2[(r2 = 4 * (m2 * i2 + e2)) + 0], n2 += b2[r2 + 1], s2 += b2[r2 + 2], o2 += b2[r2 + 3], p2 += 1);
                for (a2 /= p2, n2 /= p2, s2 /= p2, o2 /= p2, e2 = h2; e2 < l2; e2 += 1)
                  if (!(e2 >= m2))
                    for (i2 = d2; i2 < c2; i2 += 1)
                      i2 >= _2 || (b2[(r2 = 4 * (m2 * i2 + e2)) + 0] = a2, b2[r2 + 1] = n2, b2[r2 + 2] = s2, b2[r2 + 3] = o2);
              }
        }, Posterize: function(t2) {
          var e2, i2 = Math.round(254 * this.levels()) + 1, r2 = t2.data, a2 = r2.length, n2 = 255 / i2;
          for (e2 = 0; e2 < a2; e2 += 1)
            r2[e2] = Math.floor(r2[e2] / n2) * n2;
        }, RGB: function(t2) {
          var e2, i2, r2 = t2.data, a2 = r2.length, n2 = this.red(), s2 = this.green(), o2 = this.blue();
          for (e2 = 0; e2 < a2; e2 += 4)
            i2 = (0.34 * r2[e2] + 0.5 * r2[e2 + 1] + 0.16 * r2[e2 + 2]) / 255, r2[e2] = i2 * n2, r2[e2 + 1] = i2 * s2, r2[e2 + 2] = i2 * o2, r2[e2 + 3] = r2[e2 + 3];
        }, RGBA: function(t2) {
          var e2, i2, r2 = t2.data, a2 = r2.length, n2 = this.red(), s2 = this.green(), o2 = this.blue(), h2 = this.alpha();
          for (e2 = 0; e2 < a2; e2 += 4)
            i2 = 1 - h2, r2[e2] = n2 * h2 + r2[e2] * i2, r2[e2 + 1] = s2 * h2 + r2[e2 + 1] * i2, r2[e2 + 2] = o2 * h2 + r2[e2 + 2] * i2;
        }, Sepia: function(t2) {
          var e2, i2, r2, a2, n2 = t2.data, s2 = n2.length;
          for (e2 = 0; e2 < s2; e2 += 4)
            i2 = n2[e2 + 0], r2 = n2[e2 + 1], a2 = n2[e2 + 2], n2[e2 + 0] = Math.min(255, 0.393 * i2 + 0.769 * r2 + 0.189 * a2), n2[e2 + 1] = Math.min(255, 0.349 * i2 + 0.686 * r2 + 0.168 * a2), n2[e2 + 2] = Math.min(255, 0.272 * i2 + 0.534 * r2 + 0.131 * a2);
        }, Solarize: function(t2) {
          var e2 = t2.data, i2 = t2.width, r2 = 4 * i2, a2 = t2.height;
          do {
            var n2 = (a2 - 1) * r2, s2 = i2;
            do {
              var o2 = n2 + 4 * (s2 - 1), h2 = e2[o2], l2 = e2[o2 + 1], d2 = e2[o2 + 2];
              h2 > 127 && (h2 = 255 - h2), l2 > 127 && (l2 = 255 - l2), d2 > 127 && (d2 = 255 - d2), e2[o2] = h2, e2[o2 + 1] = l2, e2[o2 + 2] = d2;
            } while (--s2);
          } while (--a2);
        }, Threshold: function(t2) {
          var e2, i2 = 255 * this.threshold(), r2 = t2.data, a2 = r2.length;
          for (e2 = 0; e2 < a2; e2 += 1)
            r2[e2] = r2[e2] < i2 ? 0 : 255;
        } } });
      });
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || global2;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      clearTimeout(this.heartbeatTimer);
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_DISCONNECTED_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      clearTimeout(this.chunkTimer);
      this.uploadChannel.leave();
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      });
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      return cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      let { prefix, suffix } = titleEl.dataset;
      document.title = `${prefix || ""}${str}${suffix || ""}`;
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    discardError(container, el, phxFeedbackFor) {
      let field = el.getAttribute && el.getAttribute(phxFeedbackFor);
      let input = field && container.querySelector(`[id="${field}"], [name="${field}"]`);
      if (!input) {
        return;
      }
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input.form, PHX_HAS_SUBMITTED))) {
        el.classList.add(PHX_NO_FEEDBACK_CLASS);
      }
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let bubbles = opts.bubbles === void 0 ? true : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      LiveUploader.clearFiles(this.fileEl);
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.name = file.name || entry.ref;
        entry.type = file.type;
        entry.size = file.size;
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              fromEl.appendChild(matchingFromEl);
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                fromEl.appendChild(curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      dom_default.all(this.container, "[phx-update=append] > *, [phx-update=prepend] > *", (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform() {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let phxRemove = liveSocket2.binding("remove");
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let pendingRemoves = [];
      let externalFormTriggered = null;
      let diffHTML = liveSocket2.time("premorph container prep", () => {
        return this.buildDiffHTML(container, html, phxUpdate, targetContainer);
      });
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        morphdom_esm_default(targetContainer, diffHTML, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            return dom_default.isPhxDestroyed(node) ? null : node.id;
          },
          onBeforeNodeAdded: (el) => {
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            dom_default.discardError(targetContainer, el, phxFeedbackFor);
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => {
            if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
              liveSocket2.destroyViewByEl(el);
            }
            this.trackAfter("discarded", el);
          },
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentNode !== null && dom_default.isPhxUpdate(el.parentNode, phxUpdate, ["append", "prepend"]) && el.id) {
              return false;
            }
            if (el.getAttribute && el.getAttribute(phxRemove)) {
              pendingRemoves.push(el);
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            dom_default.discardError(targetContainer, toEl, phxFeedbackFor);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
      if (externalFormTriggered) {
        liveSocket2.disconnect();
        externalFormTriggered.submit();
      }
      return true;
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.getAttribute(PHX_SKIP) !== null;
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    buildDiffHTML(container, html, phxUpdate, targetContainer) {
      let isCIDPatch = this.isCIDPatch();
      let isCIDWithSingleRoot = isCIDPatch && targetContainer.getAttribute(PHX_COMPONENT) === this.targetCID.toString();
      if (!isCIDPatch || isCIDWithSingleRoot) {
        return html;
      } else {
        let diffContainer = null;
        let template = document.createElement("template");
        diffContainer = dom_default.cloneNode(targetContainer);
        let [firstComponent, ...rest] = dom_default.findComponentNodeList(diffContainer, this.targetCID);
        template.innerHTML = html;
        rest.forEach((el) => el.remove());
        Array.from(diffContainer.childNodes).forEach((child) => {
          if (child.id && child.nodeType === Node.ELEMENT_NODE && child.getAttribute(PHX_COMPONENT) !== this.targetCID.toString()) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
        });
        Array.from(template.content.childNodes).forEach((el) => diffContainer.insertBefore(el, firstComponent));
        firstComponent.remove();
        return diffContainer.outerHTML;
      }
    }
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      return this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids);
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids };
      this.toOutputBuffer(rendered, null, output);
      return output.buffer;
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 ? cdiff : this.cloneMerge(oldc[cid] || {}, cdiff);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
    }
    cloneMerge(target, source) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val);
        }
      }
      return merged;
    }
    componentToString(cid) {
      return this.recursiveCIDToString(this.rendered[COMPONENTS], cid);
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    toOutputBuffer(rendered, templates, output) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output);
        output.buffer += statics[i];
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output);
          output.buffer += statics[i];
        }
      }
    }
    dynamicToBuffer(rendered, templates, output) {
      if (typeof rendered === "number") {
        output.buffer += this.recursiveCIDToString(output.components, rendered, output.onlyCids);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output);
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let template = document.createElement("template");
      template.innerHTML = this.recursiveToString(component, components, onlyCids);
      let container = template.content;
      let skip = onlyCids && !onlyCids.has(cid);
      let [hasChildNodes, hasChildComponents] = Array.from(container.childNodes).reduce(([hasNodes, hasComponents], child, i) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.getAttribute(PHX_COMPONENT)) {
            return [hasNodes, true];
          }
          child.setAttribute(PHX_COMPONENT, cid);
          if (!child.id) {
            child.id = `${this.parentViewId()}-${cid}-${i}`;
          }
          if (skip) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
          return [true, hasComponents];
        } else {
          if (child.nodeValue.trim() !== "") {
            logError(`only HTML element tags are allowed at the root of components.

got: "${child.nodeValue.trim()}"

within:
`, template.innerHTML.trim());
            child.replaceWith(this.createSpan(child.nodeValue, cid));
            return [true, hasComponents];
          } else {
            child.remove();
            return [hasNodes, hasComponents];
          }
        }
      }, [false, false]);
      if (!hasChildNodes && !hasChildComponents) {
        logError("expected at least one HTML element tag inside a component, but the component is empty:\n", template.innerHTML.trim());
        return this.createSpan("", cid).outerHTML;
      } else if (!hasChildNodes && hasChildComponents) {
        logError("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", template.innerHTML.trim());
        return template.innerHTML;
      } else {
        return template.innerHTML;
      }
    }
    createSpan(text, cid) {
      let span = document.createElement("span");
      span.innerText = text;
      span.setAttribute(PHX_COMPONENT, cid);
      return span;
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view) => view.dispatchUploads(name, files));
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, {}];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      if (!view.isConnected()) {
        return;
      }
      let { event, data, target, page_loading, loading, value, dispatcher } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target, callback } = args;
          _target = _target || (sourceEl instanceof HTMLInputElement ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, pushOpts);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts);
        }
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      let [transition_start, running, transition_end] = transition;
      let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(running), []);
      let onDone = () => this.addOrRemoveClasses(el, transition_end, transition_start.concat(running));
      view.transition(time, onStart, onDone);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      let [transition_run, transition_start, transition_end] = transition || [[], [], []];
      if (transition_run.length > 0) {
        let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(transition_run), []);
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transition_end), removes.concat(transition_run).concat(transition_start));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    }
  };
  var js_default = JS;
  var serializeForm = (form, meta, onlyNames = []) => {
    let formData = new FormData(form);
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash) {
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        return {
          redirect: this.redirect ? this.href : void 0,
          url: this.redirect ? void 0 : this.href || void 0,
          params: this.connectParams(),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.getAttribute(PHX_MAIN) !== null;
    }
    connectParams() {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_DISCONNECTED_CLASS);
      }
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      if (title) {
        dom_default.putTitle(title);
      }
      callback({ diff, reply, events });
      return reply;
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let html = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    applyJoinPatch(live_patch, html, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        let hook = this.addHook(hookEl);
        if (hook) {
          hook.__mounted();
        }
      });
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    performPatch(patch, pruneCids) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let newHook = this.addHook(el);
        if (newHook) {
          newHook.__mounted();
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform();
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && !dom_default.isPhxSticky(this.el)) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let html = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let html = this.rendered.toString(cids);
        return `<${tag}>${html}</${tag}>`;
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let html = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      for (let id in this.root.children[this.id]) {
        this.getChildById(id).destroy();
      }
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    join(callback) {
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        return this.onRedirect({ to: this.href });
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        this.displayError();
      }
    }
    displayError() {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          if (ref !== null) {
            this.undoRefs(ref);
          }
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              let hookReply = this.applyDiff("update", resp.diff, ({ diff, events }) => {
                this.update(diff, events);
              });
              finish(hookReply);
            });
          } else {
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      });
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, { _target: opts._target }, [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, { _target: opts._target });
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && inputEl.getAttribute("data-phx-auto-upload") !== null) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let refGenerator = () => {
        let formElements = Array.from(formEl.elements);
        let disables = formElements.filter(filterDisables);
        let buttons = formElements.filter(filterButton).filter(filterIgnored);
        let inputs = formElements.filter(filterInput).filter(filterIgnored);
        buttons.forEach((button) => {
          button.setAttribute(PHX_DISABLED, button.disabled);
          button.disabled = true;
        });
        inputs.forEach((input) => {
          input.setAttribute(PHX_READONLY, input.readOnly);
          input.readOnly = true;
          if (input.files) {
            input.setAttribute(PHX_DISABLED, input.disabled);
            input.disabled = true;
          }
        });
        formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
        return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
      };
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let formData = serializeForm(formEl, {});
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else {
        let formData = serializeForm(formEl, {});
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(name, filesOrBlobs) {
      let inputs = dom_default.findUploadInputs(this.el).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let input = form.elements[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let push = this.pushWithReply(refGen, "live_patch", { url: href }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${form.getAttribute(phxChange)}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, null, null];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      return el.getAttribute(PHX_PARENT_ID) === this.id || maybe(el.closest(PHX_VIEW_SELECTOR), (node) => node.id) === this.id;
    }
    submitForm(form, targetCtx, phxEvent, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedback));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        }
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          console.log(`simulating ${latency}ms of latency from server to client`);
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      console.log(`simulating ${latency}ms of latency from client to server`);
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.getAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.disconnect();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && requestAnimationFrame(callback);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      elements.forEach((el) => {
        if (document.body.contains(el)) {
          this.execJS(el, el.getAttribute(removeAttr), "remove");
        }
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash) {
      let view = new View(el, this, null, flash);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents() {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      this.bindNav();
      this.bindClicks();
      this.bindForms();
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        if (!eventTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      window.addEventListener("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(e.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null);
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              if (typeof scroll === "number") {
                setTimeout(() => {
                  window.scrollTo(0, scroll);
                }, 0);
              }
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        let wantsNewTab = e.metaKey || e.ctrlKey || e.button === 1;
        if (!type || !this.isConnected() || !this.main || wantsNewTab) {
          return;
        }
        let href = target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
        });
      }, false);
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, () => {
          browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
          this.registerNewLocation(window.location);
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec("submit", phxEvent, view, e.target, ["push", {}]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let phxChange = this.binding("change");
          let input = e.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        }, false);
      }
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = new Set();
      this.pendingOps = [];
      this.reset();
    }
    reset() {
      this.transitions.forEach((timer) => {
        cancelTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        if (this.size() === 0) {
          this.flushPendingOps();
        }
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      this.pendingOps.forEach((op) => op());
      this.pendingOps = [];
    }
  };

  // js/app.js
  var import_topbar = __toModule(require_topbar());

  // js/diagram.js
  var import_konva = __toModule(require_konva());
  var diagram_default = {
    stage: {},
    bounds: {},
    layer: {},
    mounted() {
      this.setup_stage("stage", this.el);
      this.stage.add(this.layer);
    },
    setup_stage(container, el) {
      this.stage = new import_konva.default.Stage({ container });
      this.set_stage_size(this.el);
      this.layer = new import_konva.default.Layer();
      this.stage.add(this.layer);
    },
    set_stage_size(element) {
      var containerWidth = element.clientWidth;
      var containerHeight = element.clientHeight;
      this.stage.width(containerWidth * 0.8);
      this.stage.height(containerHeight * 0.8);
      this.bounds.h = this.stage.height();
      this.bounds.w = this.stage.width();
    }
  };

  // js/datehooks.js
  var datehooks_exports = {};
  __export(datehooks_exports, {
    DisplayLocalDate: () => DisplayLocalDate,
    DisplayLocalDateTime: () => DisplayLocalDateTime,
    DisplayLocalTime: () => DisplayLocalTime,
    SetDateInputLocal: () => SetDateInputLocal,
    SetTimeInputLocal: () => SetTimeInputLocal,
    SetTzInputLocal: () => SetTzInputLocal
  });
  var pad2 = (i) => {
    return i < 10 ? "0" + i : i;
  };
  var pad4 = (i) => {
    if (i < 10) {
      return "000" + 1;
    }
    if (i < 100) {
      return "00" + 1;
    }
    if (i < 1e3) {
      return "0" + 1;
    }
    return i;
  };
  var setLocalTimeInput = (el) => {
    const raw = el.dataset.datetime;
    if (!raw)
      return;
    const dt = new Date(raw);
    const h = pad2(dt.getHours());
    const m = pad2(dt.getMinutes());
    el.value = `${h}:${m}`;
  };
  var SetTimeInputLocal = {
    mounted() {
      setLocalTimeInput(this.el);
    },
    updated() {
      setLocalTimeInput(this.el);
    }
  };
  var setLocalDateInput = (el) => {
    const raw = el.dataset.datetime;
    if (!raw)
      return;
    const dt = new Date(raw);
    const y = pad4(dt.getFullYear());
    const m = pad2(dt.getMonth() + 1);
    const d = pad2(dt.getDate());
    el.value = `${y}-${m}-${d}`;
  };
  var SetDateInputLocal = {
    mounted() {
      setLocalDateInput(this.el);
    },
    updated() {
      setLocalDateInput(this.el);
    }
  };
  var SetTzInputLocal = {
    mounted() {
      this.el.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    updated() {
      this.el.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  };
  var formatDate = (dt) => {
    const y = dt.getFullYear();
    const m = pad2(dt.getMonth() + 1);
    const d = pad2(dt.getDate());
    return `${y}-${m}-${d}`;
  };
  var formatTime = (dt) => {
    const h = pad2(dt.getHours());
    const m = pad2(dt.getMinutes());
    return `${h}:${m}`;
  };
  var setLocalDate = (el) => {
    const raw = el.dataset.datetime;
    if (!raw)
      return;
    const dt = new Date(raw);
    el.innerText = formatDate(dt);
  };
  var setLocalDateTime = (el) => {
    const raw = el.dataset.datetime;
    if (!raw)
      return;
    const dt = new Date(raw);
    el.innerText = `${formatDate(dt)} ${formatTime(dt)}`;
  };
  var setLocalTime = (el) => {
    const raw = el.dataset.datetime;
    if (!raw)
      return;
    const dt = new Date(raw);
    el.innerText = formatTime(dt);
  };
  var DisplayLocalDate = {
    mounted() {
      setLocalDate(this.el);
    },
    updated() {
      setLocalDate(this.el);
    }
  };
  var DisplayLocalDateTime = {
    mounted() {
      setLocalDateTime(this.el);
    },
    updated() {
      setLocalDateTime(this.el);
    }
  };
  var DisplayLocalTime = {
    mounted() {
      setLocalTime(this.el);
    },
    updated() {
      setLocalTime(this.el);
    }
  };

  // js/app.js
  var Hooks2 = __spreadValues({
    Diagram: diagram_default
  }, datehooks_exports);
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    params: { _csrf_token: csrfToken },
    hooks: Hooks2,
    dom: {
      onBeforeElUpdated(from, to) {
        if (from._x_dataStack) {
          window.Alpine.clone(from, to);
        }
      }
    }
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (info) => import_topbar.default.show());
  window.addEventListener("phx:page-loading-stop", (info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/*
   * Konva JavaScript Framework v8.3.5
   * http://konvajs.org/
   * Licensed under the MIT
   * Date: Mon Mar 21 2022
   *
   * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
   * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
   *
   * @license
   */
/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */