! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("pdfjs-dist/build/pdf", [], t) : "object" == typeof exports ? exports["pdfjs-dist/build/pdf"] = t() : e["pdfjs-dist/build/pdf"] = e.pdfjsDistBuildPdf = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, t.n = function(e) {
            var n = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 75)
    }([function(e, t, n) {
        "use strict";

        function r(e) {
            g >= v.warnings && console.log("Warning: " + e)
        }

        function i(e) {
            throw new Error(e)
        }

        function a(e, t) {
            e || i(t)
        }

        function o(e) {
            a("string" == typeof e, "Invalid argument for stringToBytes");
            for (var t = e.length, n = new Uint8Array(t), r = 0; r < t; ++r) n[r] = 255 & e.charCodeAt(r);
            return n
        }

        function s(e) {
            return void 0 !== e.length ? e.length : (a(void 0 !== e.byteLength), e.byteLength)
        }

        function l() {
            var e = {};
            return e.promise = new Promise(function(t, n) {
                e.resolve = t, e.reject = n
            }), e
        }

        function u(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            return e ? new Promise(function(r, i) {
                r(e.apply(n, t))
            }) : Promise.resolve(void 0)
        }

        function c(e) {
            if ("object" !== (void 0 === e ? "undefined" : f(e))) return e;
            switch (e.name) {
                case "AbortException":
                    return new k(e.message);
                case "MissingPDFException":
                    return new _(e.message);
                case "UnexpectedResponseException":
                    return new w(e.message, e.status);
                default:
                    return new b(e.message, e.details)
            }
        }

        function h(e, t, n) {
            t ? e.resolve() : e.reject(n)
        }

        function d(e, t, n) {
            var r = this;
            this.sourceName = e, this.targetName = t, this.comObj = n, this.callbackId = 1, this.streamId = 1, this.postMessageTransfers = !0, this.streamSinks = Object.create(null), this.streamControllers = Object.create(null);
            var i = this.callbacksCapabilities = Object.create(null),
                a = this.actionHandler = Object.create(null);
            this._onComObjOnMessage = function(e) {
                var t = e.data;
                if (t.targetName === r.sourceName)
                    if (t.stream) r._processStreamMessage(t);
                    else if (t.isReply) {
                    var o = t.callbackId;
                    if (!(t.callbackId in i)) throw new Error("Cannot resolve callback " + o);
                    var s = i[o];
                    delete i[o], "error" in t ? s.reject(c(t.error)) : s.resolve(t.data)
                } else {
                    if (!(t.action in a)) throw new Error("Unknown action from worker: " + t.action);
                    var l = a[t.action];
                    if (t.callbackId) {
                        var u = r.sourceName,
                            h = t.sourceName;
                        Promise.resolve().then(function() {
                            return l[0].call(l[1], t.data)
                        }).then(function(e) {
                            n.postMessage({
                                sourceName: u,
                                targetName: h,
                                isReply: !0,
                                callbackId: t.callbackId,
                                data: e
                            })
                        }, function(e) {
                            n.postMessage({
                                sourceName: u,
                                targetName: h,
                                isReply: !0,
                                callbackId: t.callbackId,
                                error: function(e) {
                                    return !(e instanceof Error) || e instanceof k || e instanceof _ || e instanceof w || e instanceof b ? e : new b(e.message, e.toString())
                                }(e)
                            })
                        })
                    } else t.streamId ? r._createStreamSink(t) : l[0].call(l[1], t.data)
                }
            }, n.addEventListener("message", this._onComObjOnMessage)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.unreachable = t.warn = t.utf8StringToString = t.stringToUTF8String = t.stringToPDFString = t.stringToBytes = t.string32 = t.shadow = t.setVerbosityLevel = t.ReadableStream = t.removeNullCharacters = t.readUint32 = t.readUint16 = t.readInt8 = t.log2 = t.loadJpegStream = t.isEvalSupported = t.isLittleEndian = t.createValidAbsoluteUrl = t.isSameOrigin = t.isNodeJS = t.isSpace = t.isString = t.isNum = t.isEmptyObj = t.isBool = t.isArrayBuffer = t.info = t.getVerbosityLevel = t.getLookupTableFactory = t.deprecated = t.createObjectURL = t.createPromiseCapability = t.createBlob = t.bytesToString = t.assert = t.arraysToBytes = t.arrayByteLength = t.FormatError = t.XRefParseException = t.Util = t.UnknownErrorException = t.UnexpectedResponseException = t.TextRenderingMode = t.StreamType = t.StatTimer = t.PasswordResponses = t.PasswordException = t.PageViewport = t.NotImplementedException = t.NativeImageDecoding = t.MissingPDFException = t.MissingDataException = t.MessageHandler = t.InvalidPDFException = t.AbortException = t.CMapCompressionType = t.ImageKind = t.FontType = t.AnnotationType = t.AnnotationFlag = t.AnnotationFieldFlag = t.AnnotationBorderStyleType = t.UNSUPPORTED_FEATURES = t.VERBOSITY_LEVELS = t.OPS = t.IDENTITY_MATRIX = t.FONT_IDENTITY_MATRIX = void 0;
        var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        n(76);
        var p = n(115),
            v = {
                errors: 0,
                warnings: 1,
                infos: 5
            },
            g = v.warnings,
            m = function() {
                function e(e, t) {
                    this.name = "PasswordException", this.message = e, this.code = t
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            b = function() {
                function e(e, t) {
                    this.name = "UnknownErrorException", this.message = e, this.details = t
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            y = function() {
                function e(e) {
                    this.name = "InvalidPDFException", this.message = e
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            _ = function() {
                function e(e) {
                    this.name = "MissingPDFException", this.message = e
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            w = function() {
                function e(e, t) {
                    this.name = "UnexpectedResponseException", this.message = e, this.status = t
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            S = function() {
                function e(e) {
                    this.message = e
                }
                return e.prototype = new Error, e.prototype.name = "NotImplementedException", e.constructor = e, e
            }(),
            P = function() {
                function e(e, t) {
                    this.begin = e, this.end = t, this.message = "Missing data [" + e + ", " + t + ")"
                }
                return e.prototype = new Error, e.prototype.name = "MissingDataException", e.constructor = e, e
            }(),
            A = function() {
                function e(e) {
                    this.message = e
                }
                return e.prototype = new Error, e.prototype.name = "XRefParseException", e.constructor = e, e
            }(),
            C = function() {
                function e(e) {
                    this.message = e
                }
                return e.prototype = new Error, e.prototype.name = "FormatError", e.constructor = e, e
            }(),
            k = function() {
                function e(e) {
                    this.name = "AbortException", this.message = e
                }
                return e.prototype = new Error, e.constructor = e, e
            }(),
            T = /\x00/g,
            x = function() {
                function e() {}
                var t = ["rgb(", 0, ",", 0, ",", 0, ")"];
                e.makeCssRgb = function(e, n, r) {
                    return t[1] = e, t[3] = n, t[5] = r, t.join("")
                }, e.transform = function(e, t) {
                    return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]]
                }, e.applyTransform = function(e, t) {
                    return [e[0] * t[0] + e[1] * t[2] + t[4], e[0] * t[1] + e[1] * t[3] + t[5]]
                }, e.applyInverseTransform = function(e, t) {
                    var n = t[0] * t[3] - t[1] * t[2];
                    return [(e[0] * t[3] - e[1] * t[2] + t[2] * t[5] - t[4] * t[3]) / n, (-e[0] * t[1] + e[1] * t[0] + t[4] * t[1] - t[5] * t[0]) / n]
                }, e.getAxialAlignedBoundingBox = function(t, n) {
                    var r = e.applyTransform(t, n),
                        i = e.applyTransform(t.slice(2, 4), n),
                        a = e.applyTransform([t[0], t[3]], n),
                        o = e.applyTransform([t[2], t[1]], n);
                    return [Math.min(r[0], i[0], a[0], o[0]), Math.min(r[1], i[1], a[1], o[1]), Math.max(r[0], i[0], a[0], o[0]), Math.max(r[1], i[1], a[1], o[1])]
                }, e.inverseTransform = function(e) {
                    var t = e[0] * e[3] - e[1] * e[2];
                    return [e[3] / t, -e[1] / t, -e[2] / t, e[0] / t, (e[2] * e[5] - e[4] * e[3]) / t, (e[4] * e[1] - e[5] * e[0]) / t]
                }, e.apply3dTransform = function(e, t) {
                    return [e[0] * t[0] + e[1] * t[1] + e[2] * t[2], e[3] * t[0] + e[4] * t[1] + e[5] * t[2], e[6] * t[0] + e[7] * t[1] + e[8] * t[2]]
                }, e.singularValueDecompose2dScale = function(e) {
                    var t = [e[0], e[2], e[1], e[3]],
                        n = e[0] * t[0] + e[1] * t[2],
                        r = e[0] * t[1] + e[1] * t[3],
                        i = e[2] * t[0] + e[3] * t[2],
                        a = e[2] * t[1] + e[3] * t[3],
                        o = (n + a) / 2,
                        s = Math.sqrt((n + a) * (n + a) - 4 * (n * a - i * r)) / 2,
                        l = o + s || 1,
                        u = o - s || 1;
                    return [Math.sqrt(l), Math.sqrt(u)]
                }, e.normalizeRect = function(e) {
                    var t = e.slice(0);
                    return e[0] > e[2] && (t[0] = e[2], t[2] = e[0]), e[1] > e[3] && (t[1] = e[3], t[3] = e[1]), t
                }, e.intersect = function(t, n) {
                    function r(e, t) {
                        return e - t
                    }
                    var i = [t[0], t[2], n[0], n[2]].sort(r),
                        a = [t[1], t[3], n[1], n[3]].sort(r),
                        o = [];
                    return t = e.normalizeRect(t), n = e.normalizeRect(n), (i[0] === t[0] && i[1] === n[0] || i[0] === n[0] && i[1] === t[0]) && (o[0] = i[1], o[2] = i[2], (a[0] === t[1] && a[1] === n[1] || a[0] === n[1] && a[1] === t[1]) && (o[1] = a[1], o[3] = a[2], o))
                };
                var n = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
                return e.toRoman = function(e, t) {
                    a(Number.isInteger(e) && e > 0, "The number should be a positive integer.");
                    for (var r, i = []; e >= 1e3;) e -= 1e3, i.push("M");
                    r = e / 100 | 0, e %= 100, i.push(n[r]), r = e / 10 | 0, e %= 10, i.push(n[10 + r]), i.push(n[20 + e]);
                    var o = i.join("");
                    return t ? o.toLowerCase() : o
                }, e.appendToArray = function(e, t) {
                    Array.prototype.push.apply(e, t)
                }, e.prependToArray = function(e, t) {
                    Array.prototype.unshift.apply(e, t)
                }, e.extendObj = function(e, t) {
                    for (var n in t) e[n] = t[n]
                }, e.getInheritableProperty = function(e, t, n) {
                    for (; e && !e.has(t);) e = e.get("Parent");
                    return e ? n ? e.getArray(t) : e.get(t) : null
                }, e.inherit = function(e, t, n) {
                    e.prototype = Object.create(t.prototype), e.prototype.constructor = e;
                    for (var r in n) e.prototype[r] = n[r]
                }, e.loadScript = function(e, t) {
                    var n = document.createElement("script"),
                        r = !1;
                    n.setAttribute("src", e), t && (n.onload = function() {
                        r || t(), r = !0
                    }), document.getElementsByTagName("head")[0].appendChild(n)
                }, e
            }(),
            E = function() {
                function e(e, t, n, r, i, a) {
                    this.viewBox = e, this.scale = t, this.rotation = n, this.offsetX = r, this.offsetY = i;
                    var o, s, l, u, c = (e[2] + e[0]) / 2,
                        h = (e[3] + e[1]) / 2;
                    switch (n %= 360, n = n < 0 ? n + 360 : n) {
                        case 180:
                            o = -1, s = 0, l = 0, u = 1;
                            break;
                        case 90:
                            o = 0, s = 1, l = 1, u = 0;
                            break;
                        case 270:
                            o = 0, s = -1, l = -1, u = 0;
                            break;
                        default:
                            o = 1, s = 0, l = 0, u = -1
                    }
                    a && (l = -l, u = -u);
                    var d, f, p, v;
                    0 === o ? (d = Math.abs(h - e[1]) * t + r, f = Math.abs(c - e[0]) * t + i, p = Math.abs(e[3] - e[1]) * t, v = Math.abs(e[2] - e[0]) * t) : (d = Math.abs(c - e[0]) * t + r, f = Math.abs(h - e[1]) * t + i, p = Math.abs(e[2] - e[0]) * t, v = Math.abs(e[3] - e[1]) * t), this.transform = [o * t, s * t, l * t, u * t, d - o * t * c - l * t * h, f - s * t * c - u * t * h], this.width = p, this.height = v, this.fontScale = t
                }
                return e.prototype = {
                    clone: function(t) {
                        var n = "scale" in (t = t || {}) ? t.scale : this.scale,
                            r = "rotation" in t ? t.rotation : this.rotation;
                        return new e(this.viewBox.slice(), n, r, this.offsetX, this.offsetY, t.dontFlip)
                    },
                    convertToViewportPoint: function(e, t) {
                        return x.applyTransform([e, t], this.transform)
                    },
                    convertToViewportRectangle: function(e) {
                        var t = x.applyTransform([e[0], e[1]], this.transform),
                            n = x.applyTransform([e[2], e[3]], this.transform);
                        return [t[0], t[1], n[0], n[1]]
                    },
                    convertToPdfPoint: function(e, t) {
                        return x.applyInverseTransform([e, t], this.transform)
                    }
                }, e
            }(),
            R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 728, 711, 710, 729, 733, 731, 730, 732, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8226, 8224, 8225, 8230, 8212, 8211, 402, 8260, 8249, 8250, 8722, 8240, 8222, 8220, 8221, 8216, 8217, 8218, 8482, 64257, 64258, 321, 338, 352, 376, 381, 305, 322, 339, 353, 382, 0, 8364],
            L = function() {
                function e(e, t, n) {
                    for (; e.length < n;) e += t;
                    return e
                }

                function t() {
                    this.started = Object.create(null), this.times = [], this.enabled = !0
                }
                return t.prototype = {
                    time: function(e) {
                        this.enabled && (e in this.started && r("Timer is already running for " + e), this.started[e] = Date.now())
                    },
                    timeEnd: function(e) {
                        this.enabled && (e in this.started || r("Timer has not been started for " + e), this.times.push({
                            name: e,
                            start: this.started[e],
                            end: Date.now()
                        }), delete this.started[e])
                    },
                    toString: function() {
                        var t, n, r = this.times,
                            i = "",
                            a = 0;
                        for (t = 0, n = r.length; t < n; ++t) {
                            var o = r[t].name;
                            o.length > a && (a = o.length)
                        }
                        for (t = 0, n = r.length; t < n; ++t) {
                            var s = r[t],
                                l = s.end - s.start;
                            i += e(s.name, " ", a) + " " + l + "ms\n"
                        }
                        return i
                    }
                }, t
            }(),
            I = function(e, t) {
                if ("undefined" != typeof Blob) return new Blob([e], {
                    type: t
                });
                throw new Error('The "Blob" constructor is not supported.')
            },
            F = function() {
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                return function(t, n) {
                    if (!(arguments.length > 2 && void 0 !== arguments[2] && arguments[2]) && URL.createObjectURL) {
                        var r = I(t, n);
                        return URL.createObjectURL(r)
                    }
                    for (var i = "data:" + n + ";base64,", a = 0, o = t.length; a < o; a += 3) {
                        var s = 255 & t[a],
                            l = 255 & t[a + 1],
                            u = 255 & t[a + 2];
                        i += e[s >> 2] + e[(3 & s) << 4 | l >> 4] + e[a + 1 < o ? (15 & l) << 2 | u >> 6 : 64] + e[a + 2 < o ? 63 & u : 64]
                    }
                    return i
                }
            }();
        d.prototype = {
            on: function(e, t, n) {
                var r = this.actionHandler;
                if (r[e]) throw new Error('There is already an actionName called "' + e + '"');
                r[e] = [t, n]
            },
            send: function(e, t, n) {
                var r = {
                    sourceName: this.sourceName,
                    targetName: this.targetName,
                    action: e,
                    data: t
                };
                this.postMessage(r, n)
            },
            sendWithPromise: function(e, t, n) {
                var r = this.callbackId++,
                    i = {
                        sourceName: this.sourceName,
                        targetName: this.targetName,
                        action: e,
                        data: t,
                        callbackId: r
                    },
                    a = l();
                this.callbacksCapabilities[r] = a;
                try {
                    this.postMessage(i, n)
                } catch (e) {
                    a.reject(e)
                }
                return a.promise
            },
            sendWithStream: function(e, t, n, r) {
                var i = this,
                    a = this.streamId++,
                    o = this.sourceName,
                    s = this.targetName;
                return new p.ReadableStream({
                    start: function(n) {
                        var r = l();
                        return i.streamControllers[a] = {
                            controller: n,
                            startCall: r,
                            isClosed: !1
                        }, i.postMessage({
                            sourceName: o,
                            targetName: s,
                            action: e,
                            streamId: a,
                            data: t,
                            desiredSize: n.desiredSize
                        }), r.promise
                    },
                    pull: function(e) {
                        var t = l();
                        return i.streamControllers[a].pullCall = t, i.postMessage({
                            sourceName: o,
                            targetName: s,
                            stream: "pull",
                            streamId: a,
                            desiredSize: e.desiredSize
                        }), t.promise
                    },
                    cancel: function(e) {
                        var t = l();
                        return i.streamControllers[a].cancelCall = t, i.streamControllers[a].isClosed = !0, i.postMessage({
                            sourceName: o,
                            targetName: s,
                            stream: "cancel",
                            reason: e,
                            streamId: a
                        }), t.promise
                    }
                }, n)
            },
            _createStreamSink: function(e) {
                var t = this,
                    n = this,
                    r = this.actionHandler[e.action],
                    i = e.streamId,
                    a = e.desiredSize,
                    o = this.sourceName,
                    s = e.sourceName,
                    c = function(e) {
                        var n = e.stream,
                            r = e.chunk,
                            a = e.transfers,
                            l = e.success,
                            u = e.reason;
                        t.postMessage({
                            sourceName: o,
                            targetName: s,
                            stream: n,
                            streamId: i,
                            chunk: r,
                            success: l,
                            reason: u
                        }, a)
                    },
                    h = {
                        enqueue: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                                n = arguments[2];
                            if (!this.isCancelled) {
                                var r = this.desiredSize;
                                this.desiredSize -= t, r > 0 && this.desiredSize <= 0 && (this.sinkCapability = l(), this.ready = this.sinkCapability.promise), c({
                                    stream: "enqueue",
                                    chunk: e,
                                    transfers: n
                                })
                            }
                        },
                        close: function() {
                            this.isCancelled || (this.isCancelled = !0, c({
                                stream: "close"
                            }), delete n.streamSinks[i])
                        },
                        error: function(e) {
                            this.isCancelled || (this.isCancelled = !0, c({
                                stream: "error",
                                reason: e
                            }))
                        },
                        sinkCapability: l(),
                        onPull: null,
                        onCancel: null,
                        isCancelled: !1,
                        desiredSize: a,
                        ready: null
                    };
                h.sinkCapability.resolve(), h.ready = h.sinkCapability.promise, this.streamSinks[i] = h, u(r[0], [e.data, h], r[1]).then(function() {
                    c({
                        stream: "start_complete",
                        success: !0
                    })
                }, function(e) {
                    c({
                        stream: "start_complete",
                        success: !1,
                        reason: e
                    })
                })
            },
            _processStreamMessage: function(e) {
                var t = this,
                    n = this.sourceName,
                    r = e.sourceName,
                    i = e.streamId,
                    o = function(e) {
                        var a = e.stream,
                            o = e.success,
                            s = e.reason;
                        t.comObj.postMessage({
                            sourceName: n,
                            targetName: r,
                            stream: a,
                            success: o,
                            streamId: i,
                            reason: s
                        })
                    },
                    s = function() {
                        Promise.all([t.streamControllers[e.streamId].startCall, t.streamControllers[e.streamId].pullCall, t.streamControllers[e.streamId].cancelCall].map(function(e) {
                            return e && function(e) {
                                return Promise.resolve(e).catch(function() {})
                            }(e.promise)
                        })).then(function() {
                            delete t.streamControllers[e.streamId]
                        })
                    };
                switch (e.stream) {
                    case "start_complete":
                        h(this.streamControllers[e.streamId].startCall, e.success, c(e.reason));
                        break;
                    case "pull_complete":
                        h(this.streamControllers[e.streamId].pullCall, e.success, c(e.reason));
                        break;
                    case "pull":
                        if (!this.streamSinks[e.streamId]) {
                            o({
                                stream: "pull_complete",
                                success: !0
                            });
                            break
                        }
                        this.streamSinks[e.streamId].desiredSize <= 0 && e.desiredSize > 0 && this.streamSinks[e.streamId].sinkCapability.resolve(), this.streamSinks[e.streamId].desiredSize = e.desiredSize, u(this.streamSinks[e.streamId].onPull).then(function() {
                            o({
                                stream: "pull_complete",
                                success: !0
                            })
                        }, function(e) {
                            o({
                                stream: "pull_complete",
                                success: !1,
                                reason: e
                            })
                        });
                        break;
                    case "enqueue":
                        a(this.streamControllers[e.streamId], "enqueue should have stream controller"), this.streamControllers[e.streamId].isClosed || this.streamControllers[e.streamId].controller.enqueue(e.chunk);
                        break;
                    case "close":
                        if (a(this.streamControllers[e.streamId], "close should have stream controller"), this.streamControllers[e.streamId].isClosed) break;
                        this.streamControllers[e.streamId].isClosed = !0, this.streamControllers[e.streamId].controller.close(), s();
                        break;
                    case "error":
                        a(this.streamControllers[e.streamId], "error should have stream controller"), this.streamControllers[e.streamId].controller.error(c(e.reason)), s();
                        break;
                    case "cancel_complete":
                        h(this.streamControllers[e.streamId].cancelCall, e.success, c(e.reason)), s();
                        break;
                    case "cancel":
                        if (!this.streamSinks[e.streamId]) break;
                        u(this.streamSinks[e.streamId].onCancel, [c(e.reason)]).then(function() {
                            o({
                                stream: "cancel_complete",
                                success: !0
                            })
                        }, function(e) {
                            o({
                                stream: "cancel_complete",
                                success: !1,
                                reason: e
                            })
                        }), this.streamSinks[e.streamId].sinkCapability.reject(c(e.reason)), this.streamSinks[e.streamId].isCancelled = !0, delete this.streamSinks[e.streamId];
                        break;
                    default:
                        throw new Error("Unexpected stream case")
                }
            },
            postMessage: function(e, t) {
                t && this.postMessageTransfers ? this.comObj.postMessage(e, t) : this.comObj.postMessage(e)
            },
            destroy: function() {
                this.comObj.removeEventListener("message", this._onComObjOnMessage)
            }
        }, t.FONT_IDENTITY_MATRIX = [.001, 0, 0, .001, 0, 0], t.IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0], t.OPS = {
            dependency: 1,
            setLineWidth: 2,
            setLineCap: 3,
            setLineJoin: 4,
            setMiterLimit: 5,
            setDash: 6,
            setRenderingIntent: 7,
            setFlatness: 8,
            setGState: 9,
            save: 10,
            restore: 11,
            transform: 12,
            moveTo: 13,
            lineTo: 14,
            curveTo: 15,
            curveTo2: 16,
            curveTo3: 17,
            closePath: 18,
            rectangle: 19,
            stroke: 20,
            closeStroke: 21,
            fill: 22,
            eoFill: 23,
            fillStroke: 24,
            eoFillStroke: 25,
            closeFillStroke: 26,
            closeEOFillStroke: 27,
            endPath: 28,
            clip: 29,
            eoClip: 30,
            beginText: 31,
            endText: 32,
            setCharSpacing: 33,
            setWordSpacing: 34,
            setHScale: 35,
            setLeading: 36,
            setFont: 37,
            setTextRenderingMode: 38,
            setTextRise: 39,
            moveText: 40,
            setLeadingMoveText: 41,
            setTextMatrix: 42,
            nextLine: 43,
            showText: 44,
            showSpacedText: 45,
            nextLineShowText: 46,
            nextLineSetSpacingShowText: 47,
            setCharWidth: 48,
            setCharWidthAndBounds: 49,
            setStrokeColorSpace: 50,
            setFillColorSpace: 51,
            setStrokeColor: 52,
            setStrokeColorN: 53,
            setFillColor: 54,
            setFillColorN: 55,
            setStrokeGray: 56,
            setFillGray: 57,
            setStrokeRGBColor: 58,
            setFillRGBColor: 59,
            setStrokeCMYKColor: 60,
            setFillCMYKColor: 61,
            shadingFill: 62,
            beginInlineImage: 63,
            beginImageData: 64,
            endInlineImage: 65,
            paintXObject: 66,
            markPoint: 67,
            markPointProps: 68,
            beginMarkedContent: 69,
            beginMarkedContentProps: 70,
            endMarkedContent: 71,
            beginCompat: 72,
            endCompat: 73,
            paintFormXObjectBegin: 74,
            paintFormXObjectEnd: 75,
            beginGroup: 76,
            endGroup: 77,
            beginAnnotations: 78,
            endAnnotations: 79,
            beginAnnotation: 80,
            endAnnotation: 81,
            paintJpegXObject: 82,
            paintImageMaskXObject: 83,
            paintImageMaskXObjectGroup: 84,
            paintImageXObject: 85,
            paintInlineImageXObject: 86,
            paintInlineImageXObjectGroup: 87,
            paintImageXObjectRepeat: 88,
            paintImageMaskXObjectRepeat: 89,
            paintSolidColorImageMask: 90,
            constructPath: 91
        }, t.VERBOSITY_LEVELS = v, t.UNSUPPORTED_FEATURES = {
            unknown: "unknown",
            forms: "forms",
            javaScript: "javaScript",
            smask: "smask",
            shadingPattern: "shadingPattern",
            font: "font"
        }, t.AnnotationBorderStyleType = {
            SOLID: 1,
            DASHED: 2,
            BEVELED: 3,
            INSET: 4,
            UNDERLINE: 5
        }, t.AnnotationFieldFlag = {
            READONLY: 1,
            REQUIRED: 2,
            NOEXPORT: 4,
            MULTILINE: 4096,
            PASSWORD: 8192,
            NOTOGGLETOOFF: 16384,
            RADIO: 32768,
            PUSHBUTTON: 65536,
            COMBO: 131072,
            EDIT: 262144,
            SORT: 524288,
            FILESELECT: 1048576,
            MULTISELECT: 2097152,
            DONOTSPELLCHECK: 4194304,
            DONOTSCROLL: 8388608,
            COMB: 16777216,
            RICHTEXT: 33554432,
            RADIOSINUNISON: 33554432,
            COMMITONSELCHANGE: 67108864
        }, t.AnnotationFlag = {
            INVISIBLE: 1,
            HIDDEN: 2,
            PRINT: 4,
            NOZOOM: 8,
            NOROTATE: 16,
            NOVIEW: 32,
            READONLY: 64,
            LOCKED: 128,
            TOGGLENOVIEW: 256,
            LOCKEDCONTENTS: 512
        }, t.AnnotationType = {
            TEXT: 1,
            LINK: 2,
            FREETEXT: 3,
            LINE: 4,
            SQUARE: 5,
            CIRCLE: 6,
            POLYGON: 7,
            POLYLINE: 8,
            HIGHLIGHT: 9,
            UNDERLINE: 10,
            SQUIGGLY: 11,
            STRIKEOUT: 12,
            STAMP: 13,
            CARET: 14,
            INK: 15,
            POPUP: 16,
            FILEATTACHMENT: 17,
            SOUND: 18,
            MOVIE: 19,
            WIDGET: 20,
            SCREEN: 21,
            PRINTERMARK: 22,
            TRAPNET: 23,
            WATERMARK: 24,
            THREED: 25,
            REDACT: 26
        }, t.FontType = {
            UNKNOWN: 0,
            TYPE1: 1,
            TYPE1C: 2,
            CIDFONTTYPE0: 3,
            CIDFONTTYPE0C: 4,
            TRUETYPE: 5,
            CIDFONTTYPE2: 6,
            TYPE3: 7,
            OPENTYPE: 8,
            TYPE0: 9,
            MMTYPE1: 10
        }, t.ImageKind = {
            GRAYSCALE_1BPP: 1,
            RGB_24BPP: 2,
            RGBA_32BPP: 3
        }, t.CMapCompressionType = {
            NONE: 0,
            BINARY: 1,
            STREAM: 2
        }, t.AbortException = k, t.InvalidPDFException = y, t.MessageHandler = d, t.MissingDataException = P, t.MissingPDFException = _, t.NativeImageDecoding = {
            NONE: "none",
            DECODE: "decode",
            DISPLAY: "display"
        }, t.NotImplementedException = S, t.PageViewport = E, t.PasswordException = m, t.PasswordResponses = {
            NEED_PASSWORD: 1,
            INCORRECT_PASSWORD: 2
        }, t.StatTimer = L, t.StreamType = {
            UNKNOWN: 0,
            FLATE: 1,
            LZW: 2,
            DCT: 3,
            JPX: 4,
            JBIG: 5,
            A85: 6,
            AHX: 7,
            CCF: 8,
            RL: 9
        }, t.TextRenderingMode = {
            FILL: 0,
            STROKE: 1,
            FILL_STROKE: 2,
            INVISIBLE: 3,
            FILL_ADD_TO_PATH: 4,
            STROKE_ADD_TO_PATH: 5,
            FILL_STROKE_ADD_TO_PATH: 6,
            ADD_TO_PATH: 7,
            FILL_STROKE_MASK: 3,
            ADD_TO_PATH_FLAG: 4
        }, t.UnexpectedResponseException = w, t.UnknownErrorException = b, t.Util = x, t.XRefParseException = A, t.FormatError = C, t.arrayByteLength = s, t.arraysToBytes = function(e) {
            if (1 === e.length && e[0] instanceof Uint8Array) return e[0];
            var t, n, r, i = 0,
                a = e.length;
            for (t = 0; t < a; t++) i += r = s(n = e[t]);
            var l = 0,
                u = new Uint8Array(i);
            for (t = 0; t < a; t++)(n = e[t]) instanceof Uint8Array || (n = "string" == typeof n ? o(n) : new Uint8Array(n)), r = n.byteLength, u.set(n, l), l += r;
            return u
        }, t.assert = a, t.bytesToString = function(e) {
            a(null !== e && "object" === (void 0 === e ? "undefined" : f(e)) && void 0 !== e.length, "Invalid argument for bytesToString");
            var t = e.length;
            if (t < 8192) return String.fromCharCode.apply(null, e);
            for (var n = [], r = 0; r < t; r += 8192) {
                var i = Math.min(r + 8192, t),
                    o = e.subarray(r, i);
                n.push(String.fromCharCode.apply(null, o))
            }
            return n.join("")
        }, t.createBlob = I, t.createPromiseCapability = l, t.createObjectURL = F, t.deprecated = function(e) {
            console.log("Deprecated API usage: " + e)
        }, t.getLookupTableFactory = function(e) {
            var t;
            return function() {
                return e && (t = Object.create(null), e(t), e = null), t
            }
        }, t.getVerbosityLevel = function() {
            return g
        }, t.info = function(e) {
            g >= v.infos && console.log("Info: " + e)
        }, t.isArrayBuffer = function(e) {
            return "object" === (void 0 === e ? "undefined" : f(e)) && null !== e && void 0 !== e.byteLength
        }, t.isBool = function(e) {
            return "boolean" == typeof e
        }, t.isEmptyObj = function(e) {
            for (var t in e) return !1;
            return !0
        }, t.isNum = function(e) {
            return "number" == typeof e
        }, t.isString = function(e) {
            return "string" == typeof e
        }, t.isSpace = function(e) {
            return 32 === e || 9 === e || 13 === e || 10 === e
        }, t.isNodeJS = function() {
            return "object" === ("undefined" == typeof process ? "undefined" : f(process)) && process + "" == "[object process]"
        }, t.isSameOrigin = function(e, t) {
            try {
                var n = new URL(e);
                if (!n.origin || "null" === n.origin) return !1
            } catch (e) {
                return !1
            }
            var r = new URL(t, n);
            return n.origin === r.origin
        }, t.createValidAbsoluteUrl = function(e, t) {
            if (!e) return null;
            try {
                var n = t ? new URL(e, t) : new URL(e);
                if (function(e) {
                        if (!e) return !1;
                        switch (e.protocol) {
                            case "http:":
                            case "https:":
                            case "ftp:":
                            case "mailto:":
                            case "tel:":
                                return !0;
                            default:
                                return !1
                        }
                    }(n)) return n
            } catch (e) {}
            return null
        }, t.isLittleEndian = function() {
            var e = new Uint8Array(4);
            return e[0] = 1, 1 === new Uint32Array(e.buffer, 0, 1)[0]
        }, t.isEvalSupported = function() {
            try {
                return new Function(""), !0
            } catch (e) {
                return !1
            }
        }, t.loadJpegStream = function(e, t, n) {
            var i = new Image;
            i.onload = function() {
                n.resolve(e, i)
            }, i.onerror = function() {
                n.resolve(e, null), r("Error during JPEG image loading")
            }, i.src = t
        }, t.log2 = function(e) {
            for (var t = 1, n = 0; e > t;) t <<= 1, n++;
            return n
        }, t.readInt8 = function(e, t) {
            return e[t] << 24 >> 24
        }, t.readUint16 = function(e, t) {
            return e[t] << 8 | e[t + 1]
        }, t.readUint32 = function(e, t) {
            return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0
        }, t.removeNullCharacters = function(e) {
            return "string" != typeof e ? (r("The argument for removeNullCharacters must be a string."), e) : e.replace(T, "")
        }, t.ReadableStream = p.ReadableStream, t.setVerbosityLevel = function(e) {
            g = e
        }, t.shadow = function(e, t, n) {
            return Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !1
            }), n
        }, t.string32 = function(e) {
            return String.fromCharCode(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e)
        }, t.stringToBytes = o, t.stringToPDFString = function(e) {
            var t, n = e.length,
                r = [];
            if ("þ" === e[0] && "ÿ" === e[1])
                for (t = 2; t < n; t += 2) r.push(String.fromCharCode(e.charCodeAt(t) << 8 | e.charCodeAt(t + 1)));
            else
                for (t = 0; t < n; ++t) {
                    var i = R[e.charCodeAt(t)];
                    r.push(i ? String.fromCharCode(i) : e.charAt(t))
                }
            return r.join("")
        }, t.stringToUTF8String = function(e) {
            return decodeURIComponent(escape(e))
        }, t.utf8StringToString = function(e) {
            return unescape(encodeURIComponent(e))
        }, t.warn = r, t.unreachable = i
    }, function(e, t, n) {
        "use strict";
        var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = r)
    }, function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        e.exports = function(e) {
            return "object" === (void 0 === e ? "undefined" : r(e)) ? null !== e : "function" == typeof e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(51)("wks"),
            i = n(16),
            a = n(1).Symbol,
            o = "function" == typeof a;
        (e.exports = function(e) {
            return r[e] || (r[e] = o && a[e] || (o ? a : i)("Symbol." + e))
        }).store = r
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = n(5),
            a = n(6),
            o = n(15),
            s = n(11),
            l = "prototype",
            u = function e(t, n, u) {
                var c, h, d, f, p = t & e.F,
                    v = t & e.G,
                    g = t & e.P,
                    m = t & e.B,
                    b = v ? r : t & e.S ? r[n] || (r[n] = {}) : (r[n] || {})[l],
                    y = v ? i : i[n] || (i[n] = {}),
                    _ = y[l] || (y[l] = {});
                v && (u = n);
                for (c in u) d = ((h = !p && b && void 0 !== b[c]) ? b : u)[c], f = m && h ? s(d, r) : g && "function" == typeof d ? s(Function.call, d) : d, b && o(b, c, d, t & e.U), y[c] != d && a(y, c, f), g && _[c] != d && (_[c] = d)
            };
        r.core = i, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
    }, function(e, t, n) {
        "use strict";
        var r = e.exports = {
            version: "2.5.1"
        };
        "number" == typeof __e && (__e = r)
    }, function(e, t, n) {
        "use strict";
        var r = n(14),
            i = n(27);
        e.exports = n(9) ? function(e, t, n) {
            return r.f(e, t, i(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2);
        e.exports = function(e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function(e, t, n) {
        "use strict";
        var r = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return r.call(e, t)
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = !n(10)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(21);
        e.exports = function(e, t, n) {
            if (r(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function(n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(17),
            i = Math.min;
        e.exports = function(e) {
            return e > 0 ? i(r(e), 9007199254740991) : 0
        }
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e) {
            var t = s.default.PDFJS;
            switch (e) {
                case "pdfBug":
                    return !!t && t.pdfBug;
                case "disableAutoFetch":
                    return !!t && t.disableAutoFetch;
                case "disableStream":
                    return !!t && t.disableStream;
                case "disableRange":
                    return !!t && t.disableRange;
                case "disableFontFace":
                    return !!t && t.disableFontFace;
                case "disableCreateObjectURL":
                    return !!t && t.disableCreateObjectURL;
                case "disableWebGL":
                    return !t || t.disableWebGL;
                case "cMapUrl":
                    return t ? t.cMapUrl : null;
                case "cMapPacked":
                    return !!t && t.cMapPacked;
                case "postMessageTransfers":
                    return !t || t.postMessageTransfers;
                case "workerPort":
                    return t ? t.workerPort : null;
                case "workerSrc":
                    return t ? t.workerSrc : null;
                case "disableWorker":
                    return !!t && t.disableWorker;
                case "maxImageSize":
                    return t ? t.maxImageSize : -1;
                case "imageResourcesPath":
                    return t ? t.imageResourcesPath : "";
                case "isEvalSupported":
                    return !t || t.isEvalSupported;
                case "externalLinkTarget":
                    if (!t) return m.NONE;
                    switch (t.externalLinkTarget) {
                        case m.NONE:
                        case m.SELF:
                        case m.BLANK:
                        case m.PARENT:
                        case m.TOP:
                            return t.externalLinkTarget
                    }
                    return (0, o.warn)("PDFJS.externalLinkTarget is invalid: " + t.externalLinkTarget), t.externalLinkTarget = m.NONE, m.NONE;
                case "externalLinkRel":
                    return t ? t.externalLinkRel : l;
                case "enableStats":
                    return !(!t || !t.enableStats);
                case "pdfjsNext":
                    return !(!t || !t.pdfjsNext);
                default:
                    throw new Error("Unknown default setting: " + e)
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.SimpleXMLParser = t.DOMSVGFactory = t.DOMCMapReaderFactory = t.DOMCanvasFactory = t.DEFAULT_LINK_REL = t.getDefaultSetting = t.LinkTarget = t.getFilenameFromUrl = t.isValidUrl = t.isExternalLinkTargetSet = t.addLinkAttributes = t.RenderingCancelledException = t.CustomStyle = void 0;
        var a = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            o = n(0),
            s = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(n(20)),
            l = "noopener noreferrer nofollow",
            u = "http://www.w3.org/2000/svg",
            c = function() {
                function e() {
                    r(this, e)
                }
                return a(e, [{
                    key: "create",
                    value: function(e, t) {
                        if (e <= 0 || t <= 0) throw new Error("invalid canvas size");
                        var n = document.createElement("canvas"),
                            r = n.getContext("2d");
                        return n.width = e, n.height = t, {
                            canvas: n,
                            context: r
                        }
                    }
                }, {
                    key: "reset",
                    value: function(e, t, n) {
                        if (!e.canvas) throw new Error("canvas is not specified");
                        if (t <= 0 || n <= 0) throw new Error("invalid canvas size");
                        e.canvas.width = t, e.canvas.height = n
                    }
                }, {
                    key: "destroy",
                    value: function(e) {
                        if (!e.canvas) throw new Error("canvas is not specified");
                        e.canvas.width = 0, e.canvas.height = 0, e.canvas = null, e.context = null
                    }
                }]), e
            }(),
            h = function() {
                function e(t) {
                    var n = t.baseUrl,
                        i = void 0 === n ? null : n,
                        a = t.isCompressed,
                        o = void 0 !== a && a;
                    r(this, e), this.baseUrl = i, this.isCompressed = o
                }
                return a(e, [{
                    key: "fetch",
                    value: function(e) {
                        var t = this,
                            n = e.name;
                        return this.baseUrl ? n ? new Promise(function(e, r) {
                            var i = t.baseUrl + n + (t.isCompressed ? ".bcmap" : ""),
                                a = new XMLHttpRequest;
                            a.open("GET", i, !0), t.isCompressed && (a.responseType = "arraybuffer"), a.onreadystatechange = function() {
                                if (a.readyState === XMLHttpRequest.DONE) {
                                    if (200 === a.status || 0 === a.status) {
                                        var n = void 0;
                                        if (t.isCompressed && a.response ? n = new Uint8Array(a.response) : !t.isCompressed && a.responseText && (n = (0, o.stringToBytes)(a.responseText)), n) return void e({
                                            cMapData: n,
                                            compressionType: t.isCompressed ? o.CMapCompressionType.BINARY : o.CMapCompressionType.NONE
                                        })
                                    }
                                    r(new Error("Unable to load " + (t.isCompressed ? "binary " : "") + "CMap at: " + i))
                                }
                            }, a.send(null)
                        }) : Promise.reject(new Error("CMap name must be specified.")) : Promise.reject(new Error('CMap baseUrl must be specified, see "PDFJS.cMapUrl" (and also "PDFJS.cMapPacked").'))
                    }
                }]), e
            }(),
            d = function() {
                function e() {
                    r(this, e)
                }
                return a(e, [{
                    key: "create",
                    value: function(e, t) {
                        (0, o.assert)(e > 0 && t > 0, "Invalid SVG dimensions");
                        var n = document.createElementNS(u, "svg:svg");
                        return n.setAttribute("version", "1.1"), n.setAttribute("width", e + "px"), n.setAttribute("height", t + "px"), n.setAttribute("preserveAspectRatio", "none"), n.setAttribute("viewBox", "0 0 " + e + " " + t), n
                    }
                }, {
                    key: "createElement",
                    value: function(e) {
                        return (0, o.assert)("string" == typeof e, "Invalid SVG element type"), document.createElementNS(u, e)
                    }
                }]), e
            }(),
            f = function() {
                function e(t, n) {
                    r(this, e), this.nodeName = t, this.nodeValue = n, Object.defineProperty(this, "parentNode", {
                        value: null,
                        writable: !0
                    })
                }
                return a(e, [{
                    key: "hasChildNodes",
                    value: function() {
                        return this.childNodes && this.childNodes.length > 0
                    }
                }, {
                    key: "firstChild",
                    get: function() {
                        return this.childNodes[0]
                    }
                }, {
                    key: "nextSibling",
                    get: function() {
                        var e = this.parentNode.childNodes.indexOf(this);
                        return this.parentNode.childNodes[e + 1]
                    }
                }, {
                    key: "textContent",
                    get: function() {
                        return this.childNodes ? this.childNodes.map(function(e) {
                            return e.textContent
                        }).join("") : this.nodeValue || ""
                    }
                }]), e
            }(),
            p = function() {
                function e() {
                    r(this, e)
                }
                return a(e, [{
                    key: "parseFromString",
                    value: function(e) {
                        var t = this,
                            n = [];
                        e = (e = (e = (e = e.replace(/<\?[\s\S]*?\?>|<!--[\s\S]*?-->/g, "").trim()).replace(/<!DOCTYPE[^>\[]+(\[[^\]]+)?[^>]+>/g, "").trim()).replace(/>([^<][\s\S]*?)</g, function(e, r) {
                            var i = n.length,
                                a = new f("#text", t._decodeXML(r));
                            return n.push(a), 0 === a.textContent.trim().length ? "><" : ">" + i + ",<"
                        })).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, function(e, t) {
                            var r = n.length,
                                i = new f("#text", t);
                            return n.push(i), r + ","
                        });
                        var r = /<([\w\:]+)((?:[\s\w:=]|'[^']*'|"[^"]*")*)(?:\/>|>([\d,]*)<\/[^>]+>)/g,
                            i = void 0;
                        do {
                            i = n.length, e = e.replace(r, function(e, t, r, i) {
                                var a = n.length,
                                    o = new f(t),
                                    s = [];
                                return i && ((i = i.split(",")).pop(), i.forEach(function(e) {
                                    var t = n[+e];
                                    t.parentNode = o, s.push(t)
                                })), o.childNodes = s, n.push(o), a + ","
                            })
                        } while (i < n.length);
                        return {
                            documentElement: n.pop()
                        }
                    }
                }, {
                    key: "_decodeXML",
                    value: function(e) {
                        return e.indexOf("&") < 0 ? e : e.replace(/&(#(x[0-9a-f]+|\d+)|\w+);/gi, function(e, t, n) {
                            if (n) return n = "x" === n[0] ? parseInt(n.substring(1), 16) : +n, String.fromCharCode(n);
                            switch (t) {
                                case "amp":
                                    return "&";
                                case "lt":
                                    return "<";
                                case "gt":
                                    return ">";
                                case "quot":
                                    return '"';
                                case "apos":
                                    return "'"
                            }
                            return "&" + t + ";"
                        })
                    }
                }]), e
            }(),
            v = function() {
                function e() {}
                var t = ["ms", "Moz", "Webkit", "O"],
                    n = Object.create(null);
                return e.getProp = function(e, r) {
                    if (1 === arguments.length && "string" == typeof n[e]) return n[e];
                    var i, a, o = (r = r || document.documentElement).style;
                    if ("string" == typeof o[e]) return n[e] = e;
                    a = e.charAt(0).toUpperCase() + e.slice(1);
                    for (var s = 0, l = t.length; s < l; s++)
                        if (i = t[s] + a, "string" == typeof o[i]) return n[e] = i;
                    return n[e] = "undefined"
                }, e.setProp = function(e, t, n) {
                    var r = this.getProp(e);
                    "undefined" !== r && (t.style[r] = n)
                }, e
            }(),
            g = function() {
                function e(e, t) {
                    this.message = e, this.type = t
                }
                return e.prototype = new Error, e.prototype.name = "RenderingCancelledException", e.constructor = e, e
            }(),
            m = {
                NONE: 0,
                SELF: 1,
                BLANK: 2,
                PARENT: 3,
                TOP: 4
            },
            b = ["", "_self", "_blank", "_parent", "_top"];
        t.CustomStyle = v, t.RenderingCancelledException = g, t.addLinkAttributes = function(e, t) {
            var n = t && t.url;
            if (e.href = e.title = n ? (0, o.removeNullCharacters)(n) : "", n) {
                var r = t.target;
                void 0 === r && (r = i("externalLinkTarget")), e.target = b[r];
                var a = t.rel;
                void 0 === a && (a = i("externalLinkRel")), e.rel = a
            }
        }, t.isExternalLinkTargetSet = function() {
            switch (i("externalLinkTarget")) {
                case m.NONE:
                    return !1;
                case m.SELF:
                case m.BLANK:
                case m.PARENT:
                case m.TOP:
                    return !0
            }
        }, t.isValidUrl = function(e, t) {
            (0, o.deprecated)("isValidUrl(), please use createValidAbsoluteUrl() instead.");
            var n = t ? "http://example.com" : null;
            return null !== (0, o.createValidAbsoluteUrl)(e, n)
        }, t.getFilenameFromUrl = function(e) {
            var t = e.indexOf("#"),
                n = e.indexOf("?"),
                r = Math.min(t > 0 ? t : e.length, n > 0 ? n : e.length);
            return e.substring(e.lastIndexOf("/", r) + 1, r)
        }, t.LinkTarget = m, t.getDefaultSetting = i, t.DEFAULT_LINK_REL = l, t.DOMCanvasFactory = c, t.DOMCMapReaderFactory = h, t.DOMSVGFactory = d, t.SimpleXMLParser = p
    }, function(e, t, n) {
        "use strict";
        var r = n(7),
            i = n(45),
            a = n(33),
            o = Object.defineProperty;
        t.f = n(9) ? Object.defineProperty : function(e, t, n) {
            if (r(e), t = a(t, !0), r(n), i) try {
                return o(e, t, n)
            } catch (e) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = n(6),
            a = n(8),
            o = n(16)("src"),
            s = "toString",
            l = Function[s],
            u = ("" + l).split(s);
        n(5).inspectSource = function(e) {
            return l.call(e)
        }, (e.exports = function(e, t, n, s) {
            var l = "function" == typeof n;
            l && (a(n, "name") || i(n, "name", t)), e[t] !== n && (l && (a(n, o) || i(n, o, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)))
        })(Function.prototype, s, function() {
            return "function" == typeof this && this[o] || l.call(this)
        })
    }, function(e, t, n) {
        "use strict";
        var r = 0,
            i = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + i).toString(36))
        }
    }, function(e, t, n) {
        "use strict";
        var r = Math.ceil,
            i = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? i : r)(e)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(35);
        e.exports = function(e) {
            return Object(r(e))
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = {}
    }, function(e, t, n) {
        "use strict";
        e.exports = "undefined" != typeof window && window.Math === Math ? window : "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : {}
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(15);
        e.exports = function(e, t, n) {
            for (var i in t) r(e, i, t[i], n);
            return e
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e, t, n, r) {
            if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
            return e
        }
    }, function(e, t, n) {
        "use strict";
        var r = {}.toString;
        e.exports = function(e) {
            return r.call(e).slice(8, -1)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(14).f,
            i = n(8),
            a = n(3)("toStringTag");
        e.exports = function(e, t, n) {
            e && !i(e = n ? e : e.prototype, a) && r(e, a, {
                configurable: !0,
                value: t
            })
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = !1
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(34),
            i = n(35);
        e.exports = function(e) {
            return r(i(e))
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(17),
            i = Math.max,
            a = Math.min;
        e.exports = function(e, t) {
            return (e = r(e)) < 0 ? i(e + t, 0) : a(e, t)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(24),
            i = n(3)("toStringTag"),
            a = "Arguments" == r(function() {
                return arguments
            }());
        e.exports = function(e) {
            var t, n, o;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
                try {
                    return e[t]
                } catch (e) {}
            }(t = Object(e), i)) ? n : a ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ? "Arguments" : o
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(11),
            i = n(98),
            a = n(53),
            o = n(7),
            s = n(12),
            l = n(57),
            u = {},
            c = {},
            h = e.exports = function(e, t, n, h, d) {
                var f, p, v, g, m = d ? function() {
                        return e
                    } : l(e),
                    b = r(n, h, t ? 2 : 1),
                    y = 0;
                if ("function" != typeof m) throw TypeError(e + " is not iterable!");
                if (a(m)) {
                    for (f = s(e.length); f > y; y++)
                        if ((g = t ? b(o(p = e[y])[0], p[1]) : b(e[y])) === u || g === c) return g
                } else
                    for (v = m.call(e); !(p = v.next()).done;)
                        if ((g = i(v, b, p.value, t)) === u || g === c) return g
            };
        h.BREAK = u, h.RETURN = c
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            i = n(1).document,
            a = r(i) && r(i.createElement);
        e.exports = function(e) {
            return a ? i.createElement(e) : {}
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2);
        e.exports = function(e, t) {
            if (!r(e)) return e;
            var n, i;
            if (t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
            if ("function" == typeof(n = e.valueOf) && !r(i = n.call(e))) return i;
            if (!t && "function" == typeof(n = e.toString) && !r(i = n.call(e))) return i;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(24);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == r(e) ? e.split("") : Object(e)
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(51)("keys"),
            i = n(16);
        e.exports = function(e) {
            return r[e] || (r[e] = i(e))
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function(e, t, n) {
        "use strict";
        var r = n(49),
            i = n(37);
        e.exports = Object.keys || function(e) {
            return r(e, i)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(11),
            i = n(34),
            a = n(18),
            o = n(12),
            s = n(82);
        e.exports = function(e, t) {
            var n = 1 == e,
                l = 2 == e,
                u = 3 == e,
                c = 4 == e,
                h = 6 == e,
                d = 5 == e || h,
                f = t || s;
            return function(t, s, p) {
                for (var v, g, m = a(t), b = i(m), y = r(s, p, 3), _ = o(b.length), w = 0, S = n ? f(t, _) : l ? f(t, 0) : void 0; _ > w; w++)
                    if ((d || w in b) && (v = b[w], g = y(v, w, m), e))
                        if (n) S[w] = g;
                        else if (g) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return v;
                    case 6:
                        return w;
                    case 2:
                        S.push(v)
                } else if (c) return !1;
                return h ? -1 : u || c ? c : S
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(7),
            i = n(21),
            a = n(3)("species");
        e.exports = function(e, t) {
            var n, o = r(e).constructor;
            return void 0 === o || void 0 == (n = r(o)[a]) ? t : i(n)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(3)("iterator"),
            i = !1;
        try {
            var a = [7][r]();
            a.return = function() {
                i = !0
            }, Array.from(a, function() {
                throw 2
            })
        } catch (e) {}
        e.exports = function(e, t) {
            if (!t && !i) return !1;
            var n = !1;
            try {
                var a = [7],
                    o = a[r]();
                o.next = function() {
                    return {
                        done: n = !0
                    }
                }, a[r] = function() {
                    return o
                }, e(a)
            } catch (e) {}
            return n
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(21);
        e.exports.f = function(e) {
            return new function(e) {
                var t, n;
                this.promise = new e(function(e, r) {
                    if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
                    t = e, n = r
                }), this.resolve = r(t), this.reject = r(n)
            }(e)
        }
    }, function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            i = n(16)("meta"),
            a = n(2),
            o = n(8),
            s = n(14).f,
            l = 0,
            u = Object.isExtensible || function() {
                return !0
            },
            c = !n(10)(function() {
                return u(Object.preventExtensions({}))
            }),
            h = function(e) {
                s(e, i, {
                    value: {
                        i: "O" + ++l,
                        w: {}
                    }
                })
            },
            d = e.exports = {
                KEY: i,
                NEED: !1,
                fastKey: function(e, t) {
                    if (!a(e)) return "symbol" == (void 0 === e ? "undefined" : r(e)) ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!o(e, i)) {
                        if (!u(e)) return "F";
                        if (!t) return "E";
                        h(e)
                    }
                    return e[i].i
                },
                getWeak: function(e, t) {
                    if (!o(e, i)) {
                        if (!u(e)) return !0;
                        if (!t) return !1;
                        h(e)
                    }
                    return e[i].w
                },
                onFreeze: function(e) {
                    return c && d.NEED && u(e) && !o(e, i) && h(e), e
                }
            }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.validateResponseStatus = t.validateRangeRequestCapabilities = t.createResponseStatusError = void 0;
        var r = n(0);
        t.createResponseStatusError = function(e, t) {
            return 404 === e || 0 === e && /^file:/.test(t) ? new r.MissingPDFException('Missing PDF "' + t + '".') : new r.UnexpectedResponseException("Unexpected server response (" + e + ') while retrieving PDF "' + t + '".', e)
        }, t.validateRangeRequestCapabilities = function(e) {
            var t = e.getResponseHeader,
                n = e.isHttp,
                i = e.rangeChunkSize,
                a = e.disableRange;
            (0, r.assert)(i > 0);
            var o = {
                allowRangeRequests: !1,
                suggestedLength: void 0
            };
            if (a || !n) return o;
            if ("bytes" !== t("Accept-Ranges")) return o;
            if ("identity" !== (t("Content-Encoding") || "identity")) return o;
            var s = parseInt(t("Content-Length"), 10);
            return Number.isInteger(s) ? (o.suggestedLength = s, s <= 2 * i ? o : (o.allowRangeRequests = !0, o)) : o
        }, t.validateResponseStatus = function(e) {
            return 200 === e || 206 === e
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = !n(9) && !n(10)(function() {
            return 7 != Object.defineProperty(n(32)("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(e, t, n) {
        "use strict";
        for (var r, i = n(1), a = n(6), o = n(16), s = o("typed_array"), l = o("view"), u = !(!i.ArrayBuffer || !i.DataView), c = u, h = 0, d = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); h < 9;)(r = i[d[h++]]) ? (a(r.prototype, s, !0), a(r.prototype, l, !0)) : c = !1;
        e.exports = {
            ABV: u,
            CONSTR: c,
            TYPED: s,
            VIEW: l
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(17),
            i = n(12);
        e.exports = function(e) {
            if (void 0 === e) return 0;
            var t = r(e),
                n = i(t);
            if (t !== n) throw RangeError("Wrong length!");
            return n
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(49),
            i = n(37).concat("length", "prototype");
        t.f = Object.getOwnPropertyNames || function(e) {
            return r(e, i)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(8),
            i = n(28),
            a = n(50)(!1),
            o = n(36)("IE_PROTO");
        e.exports = function(e, t) {
            var n, s = i(e),
                l = 0,
                u = [];
            for (n in s) n != o && r(s, n) && u.push(n);
            for (; t.length > l;) r(s, n = t[l++]) && (~a(u, n) || u.push(n));
            return u
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(28),
            i = n(12),
            a = n(29);
        e.exports = function(e) {
            return function(t, n, o) {
                var s, l = r(t),
                    u = i(l.length),
                    c = a(o, u);
                if (e && n != n) {
                    for (; u > c;)
                        if ((s = l[c++]) != s) return !0
                } else
                    for (; u > c; c++)
                        if ((e || c in l) && l[c] === n) return e || c || 0; return !e && -1
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = "__core-js_shared__",
            a = r[i] || (r[i] = {});
        e.exports = function(e) {
            return a[e] || (a[e] = {})
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(18),
            i = n(29),
            a = n(12);
        e.exports = function(e) {
            for (var t = r(this), n = a(t.length), o = arguments.length, s = i(o > 1 ? arguments[1] : void 0, n), l = o > 2 ? arguments[2] : void 0, u = void 0 === l ? n : i(l, n); u > s;) t[s++] = e;
            return t
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(19),
            i = n(3)("iterator"),
            a = Array.prototype;
        e.exports = function(e) {
            return void 0 !== e && (r.Array === e || a[i] === e)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(7),
            i = n(81),
            a = n(37),
            o = n(36)("IE_PROTO"),
            s = function() {},
            l = function() {
                var e, t = n(32)("iframe"),
                    r = a.length;
                for (t.style.display = "none", n(55).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), l = e.F; r--;) delete l.prototype[a[r]];
                return l()
            };
        e.exports = Object.create || function(e, t) {
            var n;
            return null !== e ? (s.prototype = r(e), n = new s, s.prototype = null, n[o] = e) : n = l(), void 0 === t ? n : i(n, t)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1).document;
        e.exports = r && r.documentElement
    }, function(e, t, n) {
        "use strict";
        var r = n(8),
            i = n(18),
            a = n(36)("IE_PROTO"),
            o = Object.prototype;
        e.exports = Object.getPrototypeOf || function(e) {
            return e = i(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(30),
            i = n(3)("iterator"),
            a = n(19);
        e.exports = n(5).getIteratorMethod = function(e) {
            if (void 0 != e) return e[i] || e["@@iterator"] || a[r(e)]
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(85),
            i = n(86),
            a = n(19),
            o = n(28);
        e.exports = n(59)(Array, "Array", function(e, t) {
            this._t = o(e), this._i = 0, this._k = t
        }, function() {
            var e = this._t,
                t = this._k,
                n = this._i++;
            return !e || n >= e.length ? (this._t = void 0, i(1)) : "keys" == t ? i(0, n) : "values" == t ? i(0, e[n]) : i(0, [n, e[n]])
        }, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
    }, function(e, t, n) {
        "use strict";
        var r = n(26),
            i = n(4),
            a = n(15),
            o = n(6),
            s = n(8),
            l = n(19),
            u = n(87),
            c = n(25),
            h = n(56),
            d = n(3)("iterator"),
            f = !([].keys && "next" in [].keys()),
            p = function() {
                return this
            };
        e.exports = function(e, t, n, v, g, m, b) {
            u(n, t, v);
            var y, _, w, S = function(e) {
                    if (!f && e in k) return k[e];
                    switch (e) {
                        case "keys":
                        case "values":
                            return function() {
                                return new n(this, e)
                            }
                    }
                    return function() {
                        return new n(this, e)
                    }
                },
                P = t + " Iterator",
                A = "values" == g,
                C = !1,
                k = e.prototype,
                T = k[d] || k["@@iterator"] || g && k[g],
                x = T || S(g),
                E = g ? A ? S("entries") : x : void 0,
                R = "Array" == t ? k.entries || T : T;
            if (R && (w = h(R.call(new e))) !== Object.prototype && w.next && (c(w, P, !0), r || s(w, d) || o(w, d, p)), A && T && "values" !== T.name && (C = !0, x = function() {
                    return T.call(this)
                }), r && !b || !f && !C && k[d] || o(k, d, x), l[t] = x, l[P] = p, g)
                if (y = {
                        values: A ? x : S("values"),
                        keys: m ? x : S("keys"),
                        entries: E
                    }, b)
                    for (_ in y) _ in k || a(k, _, y[_]);
                else i(i.P + i.F * (f || C), t, y);
            return y
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = n(14),
            a = n(9),
            o = n(3)("species");
        e.exports = function(e) {
            var t = r[e];
            a && t && !t[o] && i.f(t, o, {
                configurable: !0,
                get: function() {
                    return this
                }
            })
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(62),
            i = n(27),
            a = n(28),
            o = n(33),
            s = n(8),
            l = n(45),
            u = Object.getOwnPropertyDescriptor;
        t.f = n(9) ? u : function(e, t) {
            if (e = a(e), t = o(t, !0), l) try {
                return u(e, t)
            } catch (e) {}
            if (s(e, t)) return i(!r.f.call(e, t), e[t])
        }
    }, function(e, t, n) {
        "use strict";
        t.f = {}.propertyIsEnumerable
    }, function(e, t, n) {
        "use strict";
        var r = n(30),
            i = {};
        i[n(3)("toStringTag")] = "z", i + "" != "[object z]" && n(15)(Object.prototype, "toString", function() {
            return "[object " + r(this) + "]"
        }, !0)
    }, function(e, t, n) {
        "use strict";
        for (var r = n(58), i = n(38), a = n(15), o = n(1), s = n(6), l = n(19), u = n(3), c = u("iterator"), h = u("toStringTag"), d = l.Array, f = {
                CSSRuleList: !0,
                CSSStyleDeclaration: !1,
                CSSValueList: !1,
                ClientRectList: !1,
                DOMRectList: !1,
                DOMStringList: !1,
                DOMTokenList: !0,
                DataTransferItemList: !1,
                FileList: !1,
                HTMLAllCollection: !1,
                HTMLCollection: !1,
                HTMLFormElement: !1,
                HTMLSelectElement: !1,
                MediaList: !0,
                MimeTypeArray: !1,
                NamedNodeMap: !1,
                NodeList: !0,
                PaintRequestList: !1,
                Plugin: !1,
                PluginArray: !1,
                SVGLengthList: !1,
                SVGNumberList: !1,
                SVGPathSegList: !1,
                SVGPointList: !1,
                SVGStringList: !1,
                SVGTransformList: !1,
                SourceBufferList: !1,
                StyleSheetList: !0,
                TextTrackCueList: !1,
                TextTrackList: !1,
                TouchList: !1
            }, p = i(f), v = 0; v < p.length; v++) {
            var g, m = p[v],
                b = f[m],
                y = o[m],
                _ = y && y.prototype;
            if (_ && (_[c] || s(_, c, d), _[h] || s(_, h, m), l[m] = d, b))
                for (g in r) _[g] || a(_, g, r[g], !0)
        }
    }, function(e, t, n) {
        "use strict";
        var r, i, a, o = n(11),
            s = n(99),
            l = n(55),
            u = n(32),
            c = n(1),
            h = c.process,
            d = c.setImmediate,
            f = c.clearImmediate,
            p = c.MessageChannel,
            v = c.Dispatch,
            g = 0,
            m = {},
            b = "onreadystatechange",
            y = function() {
                var e = +this;
                if (m.hasOwnProperty(e)) {
                    var t = m[e];
                    delete m[e], t()
                }
            },
            _ = function(e) {
                y.call(e.data)
            };
        d && f || (d = function(e) {
            for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
            return m[++g] = function() {
                s("function" == typeof e ? e : Function(e), t)
            }, r(g), g
        }, f = function(e) {
            delete m[e]
        }, "process" == n(24)(h) ? r = function(e) {
            h.nextTick(o(y, e, 1))
        } : v && v.now ? r = function(e) {
            v.now(o(y, e, 1))
        } : p ? (a = (i = new p).port2, i.port1.onmessage = _, r = o(a.postMessage, a, 1)) : c.addEventListener && "function" == typeof postMessage && !c.importScripts ? (r = function(e) {
            c.postMessage(e + "", "*")
        }, c.addEventListener("message", _, !1)) : r = b in u("script") ? function(e) {
            l.appendChild(u("script"))[b] = function() {
                l.removeChild(this), y.call(e)
            }
        } : function(e) {
            setTimeout(o(y, e, 1), 0)
        }), e.exports = {
            set: d,
            clear: f
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
            try {
                return {
                    e: !1,
                    v: e()
                }
            } catch (e) {
                return {
                    e: !0,
                    v: e
                }
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(7),
            i = n(2),
            a = n(42);
        e.exports = function(e, t) {
            if (r(e), i(t) && t.constructor === e) return t;
            var n = a.f(e);
            return (0, n.resolve)(t), n.promise
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2);
        e.exports = function(e, t) {
            if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
            return e
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.build = t.version = t._UnsupportedManager = t.setPDFNetworkStreamClass = t.PDFPageProxy = t.PDFDocumentProxy = t.PDFWorker = t.PDFDataRangeTransport = t.LoopbackPort = t.getDocument = void 0;
        var r, i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = n(0),
            s = n(13),
            l = n(118),
            u = n(119),
            c = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(n(20)),
            h = n(71),
            d = n(121),
            f = 65536,
            p = !1,
            v = !1,
            g = "undefined" != typeof document && document.currentScript ? document.currentScript.src : null,
            m = null,
            b = !1;
        "undefined" == typeof window ? (p = !0, void 0 === require.ensure && (require.ensure = require("node-ensure")), b = !0) : "undefined" != typeof require && "function" == typeof require.ensure && (b = !0), "undefined" != typeof requirejs && requirejs.toUrl && (r = requirejs.toUrl("pdfjs-dist/build/pdf.worker.js"));
        var y = "undefined" != typeof requirejs && requirejs.load;
        m = b ? function(e) {
            require.ensure([], function() {
                var t;
                t = require("./pdf.worker.js"), e(t.WorkerMessageHandler)
            })
        } : y ? function(e) {
            requirejs(["pdfjs-dist/build/pdf.worker"], function(t) {
                e(t.WorkerMessageHandler)
            })
        } : null;
        var _, w = function() {
                function e() {
                    this._capability = (0, o.createPromiseCapability)(), this._transport = null, this._worker = null, this.docId = "d" + t++, this.destroyed = !1, this.onPassword = null, this.onProgress = null, this.onUnsupportedFeature = null
                }
                var t = 0;
                return e.prototype = {get promise() {
                        return this._capability.promise
                    },
                    destroy: function() {
                        var e = this;
                        this.destroyed = !0;
                        return (this._transport ? this._transport.destroy() : Promise.resolve()).then(function() {
                            e._transport = null, e._worker && (e._worker.destroy(), e._worker = null)
                        })
                    },
                    then: function(e, t) {
                        return this.promise.then.apply(this.promise, arguments)
                    }
                }, e
            }(),
            S = function() {
                function e(e, t) {
                    this.length = e, this.initialData = t, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._readyCapability = (0, o.createPromiseCapability)()
                }
                return e.prototype = {
                    addRangeListener: function(e) {
                        this._rangeListeners.push(e)
                    },
                    addProgressListener: function(e) {
                        this._progressListeners.push(e)
                    },
                    addProgressiveReadListener: function(e) {
                        this._progressiveReadListeners.push(e)
                    },
                    onDataRange: function(e, t) {
                        for (var n = this._rangeListeners, r = 0, i = n.length; r < i; ++r) n[r](e, t)
                    },
                    onDataProgress: function(e) {
                        var t = this;
                        this._readyCapability.promise.then(function() {
                            for (var n = t._progressListeners, r = 0, i = n.length; r < i; ++r) n[r](e)
                        })
                    },
                    onDataProgressiveRead: function(e) {
                        var t = this;
                        this._readyCapability.promise.then(function() {
                            for (var n = t._progressiveReadListeners, r = 0, i = n.length; r < i; ++r) n[r](e)
                        })
                    },
                    transportReady: function() {
                        this._readyCapability.resolve()
                    },
                    requestDataRange: function(e, t) {
                        throw new Error("Abstract method PDFDataRangeTransport.requestDataRange")
                    },
                    abort: function() {}
                }, e
            }(),
            P = function() {
                function e(e, t, n) {
                    this.pdfInfo = e, this.transport = t, this.loadingTask = n
                }
                return e.prototype = {get numPages() {
                        return this.pdfInfo.numPages
                    },
                    get fingerprint() {
                        return this.pdfInfo.fingerprint
                    },
                    getPage: function(e) {
                        return this.transport.getPage(e)
                    },
                    getPageIndex: function(e) {
                        return this.transport.getPageIndex(e)
                    },
                    getDestinations: function() {
                        return this.transport.getDestinations()
                    },
                    getDestination: function(e) {
                        return this.transport.getDestination(e)
                    },
                    getPageLabels: function() {
                        return this.transport.getPageLabels()
                    },
                    getPageMode: function() {
                        return this.transport.getPageMode()
                    },
                    getAttachments: function() {
                        return this.transport.getAttachments()
                    },
                    getJavaScript: function() {
                        return this.transport.getJavaScript()
                    },
                    getOutline: function() {
                        return this.transport.getOutline()
                    },
                    getMetadata: function() {
                        return this.transport.getMetadata()
                    },
                    getData: function() {
                        return this.transport.getData()
                    },
                    getDownloadInfo: function() {
                        return this.transport.downloadInfoCapability.promise
                    },
                    getStats: function() {
                        return this.transport.getStats()
                    },
                    cleanup: function() {
                        this.transport.startCleanup()
                    },
                    destroy: function() {
                        return this.loadingTask.destroy()
                    }
                }, e
            }(),
            A = function() {
                function e(e, t, n) {
                    this.pageIndex = e, this.pageInfo = t, this.transport = n, this.stats = new o.StatTimer, this.stats.enabled = (0, s.getDefaultSetting)("enableStats"), this.commonObjs = n.commonObjs, this.objs = new x, this.cleanupAfterRender = !1, this.pendingCleanup = !1, this.intentStates = Object.create(null), this.destroyed = !1
                }
                return e.prototype = {get pageNumber() {
                        return this.pageIndex + 1
                    },
                    get rotate() {
                        return this.pageInfo.rotate
                    },
                    get ref() {
                        return this.pageInfo.ref
                    },
                    get userUnit() {
                        return this.pageInfo.userUnit
                    },
                    get view() {
                        return this.pageInfo.view
                    },
                    getViewport: function(e, t) {
                        return arguments.length < 2 && (t = this.rotate), new o.PageViewport(this.view, e, t, 0, 0)
                    },
                    getAnnotations: function(e) {
                        var t = e && e.intent || null;
                        return this.annotationsPromise && this.annotationsIntent === t || (this.annotationsPromise = this.transport.getAnnotations(this.pageIndex, t), this.annotationsIntent = t), this.annotationsPromise
                    },
                    render: function(e) {
                        var t = this,
                            n = this.stats;
                        n.time("Overall"), this.pendingCleanup = !1;
                        var r = "print" === e.intent ? "print" : "display",
                            i = e.canvasFactory || new s.DOMCanvasFactory;
                        this.intentStates[r] || (this.intentStates[r] = Object.create(null));
                        var a = this.intentStates[r];
                        a.displayReadyCapability || (a.receivingOperatorList = !0, a.displayReadyCapability = (0, o.createPromiseCapability)(), a.operatorList = {
                            fnArray: [],
                            argsArray: [],
                            lastChunk: !1
                        }, this.stats.time("Page Request"), this.transport.messageHandler.send("RenderPageRequest", {
                            pageIndex: this.pageNumber - 1,
                            intent: r,
                            renderInteractiveForms: !0 === e.renderInteractiveForms
                        }));
                        var l = function(e) {
                                var r = a.renderTasks.indexOf(u);
                                r >= 0 && a.renderTasks.splice(r, 1), t.cleanupAfterRender && (t.pendingCleanup = !0), t._tryCleanup(), e ? u.capability.reject(e) : u.capability.resolve(), n.timeEnd("Rendering"), n.timeEnd("Overall")
                            },
                            u = new R(l, e, this.objs, this.commonObjs, a.operatorList, this.pageNumber, i);
                        u.useRequestAnimationFrame = "print" !== r, a.renderTasks || (a.renderTasks = []), a.renderTasks.push(u);
                        var c = u.task;
                        return e.continueCallback && ((0, o.deprecated)("render is used with continueCallback parameter"), c.onContinue = e.continueCallback), a.displayReadyCapability.promise.then(function(e) {
                            t.pendingCleanup ? l() : (n.time("Rendering"), u.initializeGraphics(e), u.operatorListChanged())
                        }).catch(l), c
                    },
                    getOperatorList: function() {
                        function e() {
                            if (n.operatorList.lastChunk) {
                                n.opListReadCapability.resolve(n.operatorList);
                                var e = n.renderTasks.indexOf(t);
                                e >= 0 && n.renderTasks.splice(e, 1)
                            }
                        }
                        this.intentStates.oplist || (this.intentStates.oplist = Object.create(null));
                        var t, n = this.intentStates.oplist;
                        return n.opListReadCapability || ((t = {}).operatorListChanged = e, n.receivingOperatorList = !0, n.opListReadCapability = (0, o.createPromiseCapability)(), n.renderTasks = [], n.renderTasks.push(t), n.operatorList = {
                            fnArray: [],
                            argsArray: [],
                            lastChunk: !1
                        }, this.transport.messageHandler.send("RenderPageRequest", {
                            pageIndex: this.pageIndex,
                            intent: "oplist"
                        })), n.opListReadCapability.promise
                    },
                    streamTextContent: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return this.transport.messageHandler.sendWithStream("GetTextContent", {
                            pageIndex: this.pageNumber - 1,
                            normalizeWhitespace: !0 === e.normalizeWhitespace,
                            combineTextItems: !0 !== e.disableCombineTextItems
                        }, {
                            highWaterMark: 100,
                            size: function(e) {
                                return e.items.length
                            }
                        })
                    },
                    getTextContent: function(e) {
                        e = e || {};
                        var t = this.streamTextContent(e);
                        return new Promise(function(e, n) {
                            function r() {
                                i.read().then(function(t) {
                                    var n = t.value;
                                    t.done ? e(a) : (o.Util.extendObj(a.styles, n.styles), o.Util.appendToArray(a.items, n.items), r())
                                }, n)
                            }
                            var i = t.getReader(),
                                a = {
                                    items: [],
                                    styles: Object.create(null)
                                };
                            r()
                        })
                    },
                    _destroy: function() {
                        this.destroyed = !0, this.transport.pageCache[this.pageIndex] = null;
                        var e = [];
                        return Object.keys(this.intentStates).forEach(function(t) {
                            if ("oplist" !== t) {
                                this.intentStates[t].renderTasks.forEach(function(t) {
                                    var n = t.capability.promise.catch(function() {});
                                    e.push(n), t.cancel()
                                })
                            }
                        }, this), this.objs.clear(), this.annotationsPromise = null, this.pendingCleanup = !1, Promise.all(e)
                    },
                    destroy: function() {
                        (0, o.deprecated)("page destroy method, use cleanup() instead"), this.cleanup()
                    },
                    cleanup: function() {
                        this.pendingCleanup = !0, this._tryCleanup()
                    },
                    _tryCleanup: function() {
                        this.pendingCleanup && !Object.keys(this.intentStates).some(function(e) {
                            var t = this.intentStates[e];
                            return 0 !== t.renderTasks.length || t.receivingOperatorList
                        }, this) && (Object.keys(this.intentStates).forEach(function(e) {
                            delete this.intentStates[e]
                        }, this), this.objs.clear(), this.annotationsPromise = null, this.pendingCleanup = !1)
                    },
                    _startRenderPage: function(e, t) {
                        var n = this.intentStates[t];
                        n.displayReadyCapability && n.displayReadyCapability.resolve(e)
                    },
                    _renderPageChunk: function(e, t) {
                        var n, r, i = this.intentStates[t];
                        for (n = 0, r = e.length; n < r; n++) i.operatorList.fnArray.push(e.fnArray[n]), i.operatorList.argsArray.push(e.argsArray[n]);
                        for (i.operatorList.lastChunk = e.lastChunk, n = 0; n < i.renderTasks.length; n++) i.renderTasks[n].operatorListChanged();
                        e.lastChunk && (i.receivingOperatorList = !1, this._tryCleanup())
                    }
                }, e
            }(),
            C = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._listeners = [], this._defer = t, this._deferred = Promise.resolve(void 0)
                }
                return i(e, [{
                    key: "postMessage",
                    value: function(e, t) {
                        function n(e) {
                            if ("object" !== (void 0 === e ? "undefined" : a(e)) || null === e) return e;
                            if (i.has(e)) return i.get(e);
                            var r, s;
                            if ((s = e.buffer) && (0, o.isArrayBuffer)(s)) {
                                var l = t && t.indexOf(s) >= 0;
                                return r = e === s ? e : l ? new e.constructor(s, e.byteOffset, e.byteLength) : new e.constructor(e), i.set(e, r), r
                            }
                            r = Array.isArray(e) ? [] : {}, i.set(e, r);
                            for (var u in e) {
                                for (var c, h = e; !(c = Object.getOwnPropertyDescriptor(h, u));) h = Object.getPrototypeOf(h);
                                void 0 !== c.value && "function" != typeof c.value && (r[u] = n(c.value))
                            }
                            return r
                        }
                        var r = this;
                        if (this._defer) {
                            var i = new WeakMap,
                                s = {
                                    data: n(e)
                                };
                            this._deferred.then(function() {
                                r._listeners.forEach(function(e) {
                                    e.call(this, s)
                                }, r)
                            })
                        } else this._listeners.forEach(function(t) {
                            t.call(this, {
                                data: e
                            })
                        }, this)
                    }
                }, {
                    key: "addEventListener",
                    value: function(e, t) {
                        this._listeners.push(t)
                    }
                }, {
                    key: "removeEventListener",
                    value: function(e, t) {
                        var n = this._listeners.indexOf(t);
                        this._listeners.splice(n, 1)
                    }
                }, {
                    key: "terminate",
                    value: function() {
                        this._listeners = []
                    }
                }]), e
            }(),
            k = function() {
                function e() {
                    if (void 0 !== r) return r;
                    if ((0, s.getDefaultSetting)("workerSrc")) return (0, s.getDefaultSetting)("workerSrc");
                    if (g) return g.replace(/(\.(?:min\.)?js)(\?.*)?$/i, ".worker$1$2");
                    throw new Error("No PDFJS.workerSrc specified")
                }

                function t(e, t) {
                    if (t && a.has(t)) throw new Error("Cannot use more than one PDFWorker per port");
                    if (this.name = e, this.destroyed = !1, this.postMessageTransfers = !0, this._readyCapability = (0, o.createPromiseCapability)(), this._port = null, this._webWorker = null, this._messageHandler = null, t) return a.set(t, this), void this._initializeFromPort(t);
                    this._initialize()
                }
                var n = 0,
                    i = void 0,
                    a = new WeakMap;
                return t.prototype = {get promise() {
                        return this._readyCapability.promise
                    },
                    get port() {
                        return this._port
                    },
                    get messageHandler() {
                        return this._messageHandler
                    },
                    _initializeFromPort: function(e) {
                        this._port = e, this._messageHandler = new o.MessageHandler("main", "worker", e), this._messageHandler.on("ready", function() {}), this._readyCapability.resolve()
                    },
                    _initialize: function() {
                        var t = this;
                        if (!p && !(0, s.getDefaultSetting)("disableWorker") && "undefined" != typeof Worker) {
                            var n = e();
                            try {
                                (0, o.isSameOrigin)(window.location.href, n) || (n = function(e) {
                                    var t = "importScripts('" + e + "');";
                                    return URL.createObjectURL(new Blob([t]))
                                }(new URL(n, window.location).href));
                                var r = new Worker(n),
                                    i = new o.MessageHandler("main", "worker", r),
                                    a = function() {
                                        r.removeEventListener("error", l), i.destroy(), r.terminate(), t.destroyed ? t._readyCapability.reject(new Error("Worker was destroyed")) : t._setupFakeWorker()
                                    },
                                    l = function() {
                                        t._webWorker || a()
                                    };
                                r.addEventListener("error", l), i.on("test", function(e) {
                                    if (r.removeEventListener("error", l), t.destroyed) a();
                                    else {
                                        e && e.supportTypedArray ? (t._messageHandler = i, t._port = r, t._webWorker = r, e.supportTransfers || (t.postMessageTransfers = !1, v = !0), t._readyCapability.resolve(), i.send("configure", {
                                            verbosity: (0, o.getVerbosityLevel)()
                                        })) : (t._setupFakeWorker(), i.destroy(), r.terminate())
                                    }
                                }), i.on("console_log", function(e) {
                                    console.log.apply(console, e)
                                }), i.on("console_error", function(e) {
                                    console.error.apply(console, e)
                                }), i.on("ready", function(e) {
                                    if (r.removeEventListener("error", l), t.destroyed) a();
                                    else try {
                                        u()
                                    } catch (e) {
                                        t._setupFakeWorker()
                                    }
                                });
                                var u = function() {
                                    var e = (0, s.getDefaultSetting)("postMessageTransfers") && !v,
                                        t = new Uint8Array([e ? 255 : 0]);
                                    try {
                                        i.send("test", t, [t.buffer])
                                    } catch (e) {
                                        (0, o.info)("Cannot use postMessage transfers"), t[0] = 0, i.send("test", t)
                                    }
                                };
                                return void u()
                            } catch (e) {
                                (0, o.info)("The worker has been disabled.")
                            }
                        }
                        this._setupFakeWorker()
                    },
                    _setupFakeWorker: function() {
                        var t = this;
                        p || (0, s.getDefaultSetting)("disableWorker") || ((0, o.warn)("Setting up fake worker."), p = !0), (i ? i.promise : (i = (0, o.createPromiseCapability)(), (m || function(t) {
                            o.Util.loadScript(e(), function() {
                                t(window.pdfjsDistBuildPdfWorker.WorkerMessageHandler)
                            })
                        })(i.resolve), i.promise)).then(function(e) {
                            if (t.destroyed) t._readyCapability.reject(new Error("Worker was destroyed"));
                            else {
                                var r = Uint8Array !== Float32Array,
                                    i = new C(r);
                                t._port = i;
                                var a = "fake" + n++,
                                    s = new o.MessageHandler(a + "_worker", a, i);
                                e.setup(s, i);
                                var l = new o.MessageHandler(a, a + "_worker", i);
                                t._messageHandler = l, t._readyCapability.resolve()
                            }
                        })
                    },
                    destroy: function() {
                        this.destroyed = !0, this._webWorker && (this._webWorker.terminate(), this._webWorker = null), a.delete(this._port), this._port = null, this._messageHandler && (this._messageHandler.destroy(), this._messageHandler = null)
                    }
                }, t.fromPort = function(e) {
                    return a.has(e) ? a.get(e) : new t(null, e)
                }, t
            }(),
            T = function() {
                function e(e, t, n, r) {
                    this.messageHandler = e, this.loadingTask = t, this.commonObjs = new x, this.fontLoader = new l.FontLoader(t.docId), this.CMapReaderFactory = new r({
                        baseUrl: (0, s.getDefaultSetting)("cMapUrl"),
                        isCompressed: (0, s.getDefaultSetting)("cMapPacked")
                    }), this.destroyed = !1, this.destroyCapability = null, this._passwordCapability = null, this._networkStream = n, this._fullReader = null, this._lastProgress = null, this.pageCache = [], this.pagePromises = [], this.downloadInfoCapability = (0, o.createPromiseCapability)(), this.setupMessageHandler()
                }
                return e.prototype = {
                    destroy: function() {
                        var e = this;
                        if (this.destroyCapability) return this.destroyCapability.promise;
                        this.destroyed = !0, this.destroyCapability = (0, o.createPromiseCapability)(), this._passwordCapability && this._passwordCapability.reject(new Error("Worker was destroyed during onPassword callback"));
                        var t = [];
                        this.pageCache.forEach(function(e) {
                            e && t.push(e._destroy())
                        }), this.pageCache = [], this.pagePromises = [];
                        var n = this.messageHandler.sendWithPromise("Terminate", null);
                        return t.push(n), Promise.all(t).then(function() {
                            e.fontLoader.clear(), e._networkStream && e._networkStream.cancelAllRequests(), e.messageHandler && (e.messageHandler.destroy(), e.messageHandler = null), e.destroyCapability.resolve()
                        }, this.destroyCapability.reject), this.destroyCapability.promise
                    },
                    setupMessageHandler: function() {
                        var e = this.messageHandler,
                            t = this.loadingTask;
                        e.on("GetReader", function(e, t) {
                            var n = this;
                            (0, o.assert)(this._networkStream), this._fullReader = this._networkStream.getFullReader(), this._fullReader.onProgress = function(e) {
                                n._lastProgress = {
                                    loaded: e.loaded,
                                    total: e.total
                                }
                            }, t.onPull = function() {
                                n._fullReader.read().then(function(e) {
                                    var n = e.value;
                                    e.done ? t.close() : ((0, o.assert)((0, o.isArrayBuffer)(n)), t.enqueue(new Uint8Array(n), 1, [n]))
                                }).catch(function(e) {
                                    t.error(e)
                                })
                            }, t.onCancel = function(e) {
                                n._fullReader.cancel(e)
                            }
                        }, this), e.on("ReaderHeadersReady", function(e) {
                            var t = this,
                                n = (0, o.createPromiseCapability)(),
                                r = this._fullReader;
                            return r.headersReady.then(function() {
                                if (!r.isStreamingSupported || !r.isRangeSupported) {
                                    if (t._lastProgress) {
                                        var e = t.loadingTask;
                                        e.onProgress && e.onProgress(t._lastProgress)
                                    }
                                    r.onProgress = function(e) {
                                        var n = t.loadingTask;
                                        n.onProgress && n.onProgress({
                                            loaded: e.loaded,
                                            total: e.total
                                        })
                                    }
                                }
                                n.resolve({
                                    isStreamingSupported: r.isStreamingSupported,
                                    isRangeSupported: r.isRangeSupported,
                                    contentLength: r.contentLength
                                })
                            }, n.reject), n.promise
                        }, this), e.on("GetRangeReader", function(e, t) {
                            (0, o.assert)(this._networkStream);
                            var n = this._networkStream.getRangeReader(e.begin, e.end);
                            t.onPull = function() {
                                n.read().then(function(e) {
                                    var n = e.value;
                                    e.done ? t.close() : ((0, o.assert)((0, o.isArrayBuffer)(n)), t.enqueue(new Uint8Array(n), 1, [n]))
                                }).catch(function(e) {
                                    t.error(e)
                                })
                            }, t.onCancel = function(e) {
                                n.cancel(e)
                            }
                        }, this), e.on("GetDoc", function(e) {
                            var t = e.pdfInfo;
                            this.numPages = e.pdfInfo.numPages;
                            var n = this.loadingTask,
                                r = new P(t, this, n);
                            this.pdfDocument = r, n._capability.resolve(r)
                        }, this), e.on("PasswordRequest", function(e) {
                            var n = this;
                            if (this._passwordCapability = (0, o.createPromiseCapability)(), t.onPassword) {
                                var r = function(e) {
                                    n._passwordCapability.resolve({
                                        password: e
                                    })
                                };
                                t.onPassword(r, e.code)
                            } else this._passwordCapability.reject(new o.PasswordException(e.message, e.code));
                            return this._passwordCapability.promise
                        }, this), e.on("PasswordException", function(e) {
                            t._capability.reject(new o.PasswordException(e.message, e.code))
                        }, this), e.on("InvalidPDF", function(e) {
                            this.loadingTask._capability.reject(new o.InvalidPDFException(e.message))
                        }, this), e.on("MissingPDF", function(e) {
                            this.loadingTask._capability.reject(new o.MissingPDFException(e.message))
                        }, this), e.on("UnexpectedResponse", function(e) {
                            this.loadingTask._capability.reject(new o.UnexpectedResponseException(e.message, e.status))
                        }, this), e.on("UnknownError", function(e) {
                            this.loadingTask._capability.reject(new o.UnknownErrorException(e.message, e.details))
                        }, this), e.on("DataLoaded", function(e) {
                            this.downloadInfoCapability.resolve(e)
                        }, this), e.on("PDFManagerReady", function(e) {}, this), e.on("StartRenderPage", function(e) {
                            if (!this.destroyed) {
                                var t = this.pageCache[e.pageIndex];
                                t.stats.timeEnd("Page Request"), t._startRenderPage(e.transparency, e.intent)
                            }
                        }, this), e.on("RenderPageChunk", function(e) {
                            if (!this.destroyed) {
                                this.pageCache[e.pageIndex]._renderPageChunk(e.operatorList, e.intent)
                            }
                        }, this), e.on("commonobj", function(e) {
                            var t = this;
                            if (!this.destroyed) {
                                var n = e[0],
                                    r = e[1];
                                if (!this.commonObjs.hasData(n)) switch (r) {
                                    case "Font":
                                        var i = e[2];
                                        if ("error" in i) {
                                            var a = i.error;
                                            (0, o.warn)("Error during font loading: " + a), this.commonObjs.resolve(n, a);
                                            break
                                        }
                                        var u = null;
                                        (0, s.getDefaultSetting)("pdfBug") && c.default.FontInspector && c.default.FontInspector.enabled && (u = {
                                            registerFont: function(e, t) {
                                                c.default.FontInspector.fontAdded(e, t)
                                            }
                                        });
                                        var h = new l.FontFaceObject(i, {
                                                isEvalSupported: (0, s.getDefaultSetting)("isEvalSupported"),
                                                disableFontFace: (0, s.getDefaultSetting)("disableFontFace"),
                                                fontRegistry: u
                                            }),
                                            d = function(e) {
                                                t.commonObjs.resolve(n, h)
                                            };
                                        this.fontLoader.bind([h], d);
                                        break;
                                    case "FontPath":
                                        this.commonObjs.resolve(n, e[2]);
                                        break;
                                    default:
                                        throw new Error("Got unknown common object type " + r)
                                }
                            }
                        }, this), e.on("obj", function(e) {
                            if (!this.destroyed) {
                                var t, n = e[0],
                                    r = e[1],
                                    i = e[2],
                                    a = this.pageCache[r];
                                if (!a.objs.hasData(n)) switch (i) {
                                    case "JpegStream":
                                        t = e[3], (0, o.loadJpegStream)(n, t, a.objs);
                                        break;
                                    case "Image":
                                        t = e[3], a.objs.resolve(n, t);
                                        t && "data" in t && t.data.length > 8e6 && (a.cleanupAfterRender = !0);
                                        break;
                                    default:
                                        throw new Error("Got unknown object type " + i)
                                }
                            }
                        }, this), e.on("DocProgress", function(e) {
                            if (!this.destroyed) {
                                var t = this.loadingTask;
                                t.onProgress && t.onProgress({
                                    loaded: e.loaded,
                                    total: e.total
                                })
                            }
                        }, this), e.on("PageError", function(e) {
                            if (!this.destroyed) {
                                var t = this.pageCache[e.pageNum - 1].intentStates[e.intent];
                                if (!t.displayReadyCapability) throw new Error(e.error);
                                if (t.displayReadyCapability.reject(e.error), t.operatorList) {
                                    t.operatorList.lastChunk = !0;
                                    for (var n = 0; n < t.renderTasks.length; n++) t.renderTasks[n].operatorListChanged()
                                }
                            }
                        }, this), e.on("UnsupportedFeature", function(e) {
                            if (!this.destroyed) {
                                var t = e.featureId,
                                    n = this.loadingTask;
                                n.onUnsupportedFeature && n.onUnsupportedFeature(t), L.notify(t)
                            }
                        }, this), e.on("JpegDecode", function(e) {
                            if (this.destroyed) return Promise.reject(new Error("Worker was destroyed"));
                            if ("undefined" == typeof document) return Promise.reject(new Error('"document" is not defined.'));
                            var t = e[0],
                                n = e[1];
                            return 3 !== n && 1 !== n ? Promise.reject(new Error("Only 3 components or 1 component can be returned")) : new Promise(function(e, r) {
                                var i = new Image;
                                i.onload = function() {
                                    var t = i.width,
                                        r = i.height,
                                        a = t * r,
                                        o = 4 * a,
                                        s = new Uint8Array(a * n),
                                        l = document.createElement("canvas");
                                    l.width = t, l.height = r;
                                    var u = l.getContext("2d");
                                    u.drawImage(i, 0, 0);
                                    var c, h, d = u.getImageData(0, 0, t, r).data;
                                    if (3 === n)
                                        for (c = 0, h = 0; c < o; c += 4, h += 3) s[h] = d[c], s[h + 1] = d[c + 1], s[h + 2] = d[c + 2];
                                    else if (1 === n)
                                        for (c = 0, h = 0; c < o; c += 4, h++) s[h] = d[c];
                                    e({
                                        data: s,
                                        width: t,
                                        height: r
                                    })
                                }, i.onerror = function() {
                                    r(new Error("JpegDecode failed to load image"))
                                }, i.src = t
                            })
                        }, this), e.on("FetchBuiltInCMap", function(e) {
                            return this.destroyed ? Promise.reject(new Error("Worker was destroyed")) : this.CMapReaderFactory.fetch({
                                name: e.name
                            })
                        }, this)
                    },
                    getData: function() {
                        return this.messageHandler.sendWithPromise("GetData", null)
                    },
                    getPage: function(e, t) {
                        var n = this;
                        if (!Number.isInteger(e) || e <= 0 || e > this.numPages) return Promise.reject(new Error("Invalid page request"));
                        var r = e - 1;
                        if (r in this.pagePromises) return this.pagePromises[r];
                        var i = this.messageHandler.sendWithPromise("GetPage", {
                            pageIndex: r
                        }).then(function(e) {
                            if (n.destroyed) throw new Error("Transport destroyed");
                            var t = new A(r, e, n);
                            return n.pageCache[r] = t, t
                        });
                        return this.pagePromises[r] = i, i
                    },
                    getPageIndex: function(e) {
                        return this.messageHandler.sendWithPromise("GetPageIndex", {
                            ref: e
                        }).catch(function(e) {
                            return Promise.reject(new Error(e))
                        })
                    },
                    getAnnotations: function(e, t) {
                        return this.messageHandler.sendWithPromise("GetAnnotations", {
                            pageIndex: e,
                            intent: t
                        })
                    },
                    getDestinations: function() {
                        return this.messageHandler.sendWithPromise("GetDestinations", null)
                    },
                    getDestination: function(e) {
                        return this.messageHandler.sendWithPromise("GetDestination", {
                            id: e
                        })
                    },
                    getPageLabels: function() {
                        return this.messageHandler.sendWithPromise("GetPageLabels", null)
                    },
                    getPageMode: function() {
                        return this.messageHandler.sendWithPromise("GetPageMode", null)
                    },
                    getAttachments: function() {
                        return this.messageHandler.sendWithPromise("GetAttachments", null)
                    },
                    getJavaScript: function() {
                        return this.messageHandler.sendWithPromise("GetJavaScript", null)
                    },
                    getOutline: function() {
                        return this.messageHandler.sendWithPromise("GetOutline", null)
                    },
                    getMetadata: function() {
                        return this.messageHandler.sendWithPromise("GetMetadata", null).then(function(e) {
                            return {
                                info: e[0],
                                metadata: e[1] ? new h.Metadata(e[1]) : null
                            }
                        })
                    },
                    getStats: function() {
                        return this.messageHandler.sendWithPromise("GetStats", null)
                    },
                    startCleanup: function() {
                        var e = this;
                        this.messageHandler.sendWithPromise("Cleanup", null).then(function() {
                            for (var t = 0, n = e.pageCache.length; t < n; t++) {
                                var r = e.pageCache[t];
                                r && r.cleanup()
                            }
                            e.commonObjs.clear(), e.fontLoader.clear()
                        })
                    }
                }, e
            }(),
            x = function() {
                function e() {
                    this.objs = Object.create(null)
                }
                return e.prototype = {
                    ensureObj: function(e) {
                        if (this.objs[e]) return this.objs[e];
                        var t = {
                            capability: (0, o.createPromiseCapability)(),
                            data: null,
                            resolved: !1
                        };
                        return this.objs[e] = t, t
                    },
                    get: function(e, t) {
                        if (t) return this.ensureObj(e).capability.promise.then(t), null;
                        var n = this.objs[e];
                        if (!n || !n.resolved) throw new Error("Requesting object that isn't resolved yet " + e);
                        return n.data
                    },
                    resolve: function(e, t) {
                        var n = this.ensureObj(e);
                        n.resolved = !0, n.data = t, n.capability.resolve(t)
                    },
                    isResolved: function(e) {
                        var t = this.objs;
                        return !!t[e] && t[e].resolved
                    },
                    hasData: function(e) {
                        return this.isResolved(e)
                    },
                    getData: function(e) {
                        var t = this.objs;
                        return t[e] && t[e].resolved ? t[e].data : null
                    },
                    clear: function() {
                        this.objs = Object.create(null)
                    }
                }, e
            }(),
            E = function() {
                function e(e) {
                    this._internalRenderTask = e, this.onContinue = null
                }
                return e.prototype = {get promise() {
                        return this._internalRenderTask.capability.promise
                    },
                    cancel: function() {
                        this._internalRenderTask.cancel()
                    },
                    then: function(e, t) {
                        return this.promise.then.apply(this.promise, arguments)
                    }
                }, e
            }(),
            R = function() {
                function e(e, t, n, r, i, a, s) {
                    this.callback = e, this.params = t, this.objs = n, this.commonObjs = r, this.operatorListIdx = null, this.operatorList = i, this.pageNumber = a, this.canvasFactory = s, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this.useRequestAnimationFrame = !1, this.cancelled = !1, this.capability = (0, o.createPromiseCapability)(), this.task = new E(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = t.canvasContext.canvas
                }
                var t = new WeakMap;
                return e.prototype = {
                    initializeGraphics: function(e) {
                        if (this._canvas) {
                            if (t.has(this._canvas)) throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
                            t.set(this._canvas, this)
                        }
                        if (!this.cancelled) {
                            (0, s.getDefaultSetting)("pdfBug") && c.default.StepperManager && c.default.StepperManager.enabled && (this.stepper = c.default.StepperManager.create(this.pageNumber - 1), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
                            var n = this.params;
                            this.gfx = new u.CanvasGraphics(n.canvasContext, this.commonObjs, this.objs, this.canvasFactory, n.imageLayer), this.gfx.beginDrawing({
                                transform: n.transform,
                                viewport: n.viewport,
                                transparency: e,
                                background: n.background
                            }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback && this.graphicsReadyCallback()
                        }
                    },
                    cancel: function() {
                        this.running = !1, this.cancelled = !0, this._canvas && t.delete(this._canvas), (0, s.getDefaultSetting)("pdfjsNext") ? this.callback(new s.RenderingCancelledException("Rendering cancelled, page " + this.pageNumber, "canvas")) : this.callback("cancelled")
                    },
                    operatorListChanged: function() {
                        this.graphicsReady ? (this.stepper && this.stepper.updateOperatorList(this.operatorList), this.running || this._continue()) : this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound)
                    },
                    _continue: function() {
                        this.running = !0, this.cancelled || (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext())
                    },
                    _scheduleNext: function() {
                        this.useRequestAnimationFrame && "undefined" != typeof window ? window.requestAnimationFrame(this._nextBound) : Promise.resolve(void 0).then(this._nextBound)
                    },
                    _next: function() {
                        this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), this._canvas && t.delete(this._canvas), this.callback())))
                    }
                }, e
            }(),
            L = function() {
                var e = [];
                return {
                    listen: function(t) {
                        (0, o.deprecated)("Global UnsupportedManager.listen is used:  use PDFDocumentLoadingTask.onUnsupportedFeature instead"), e.push(t)
                    },
                    notify: function(t) {
                        for (var n = 0, r = e.length; n < r; n++) e[n](t)
                    }
                }
            }();
        t.version = "1.10.88", t.build = "c62a1938", t.getDocument = function(e, t, n, r) {
            var i = new w;
            arguments.length > 1 && (0, o.deprecated)("getDocument is called with pdfDataRangeTransport, passwordCallback or progressCallback argument"), t && (t instanceof S || ((t = Object.create(t)).length = e.length, t.initialData = e.initialData, t.abort || (t.abort = function() {})), (e = Object.create(e)).range = t), i.onPassword = n || null, i.onProgress = r || null;
            var l;
            if ("string" == typeof e) l = {
                url: e
            };
            else if ((0, o.isArrayBuffer)(e)) l = {
                data: e
            };
            else if (e instanceof S) l = {
                range: e
            };
            else {
                if ("object" !== (void 0 === e ? "undefined" : a(e))) throw new Error("Invalid parameter in getDocument, need either Uint8Array, string or a parameter object");
                if (!e.url && !e.data && !e.range) throw new Error("Invalid parameter object: need either .data, .range or .url");
                l = e
            }
            var u = {},
                c = null,
                h = null,
                p = s.DOMCMapReaderFactory;
            for (var g in l)
                if ("url" !== g || "undefined" == typeof window)
                    if ("range" !== g)
                        if ("worker" !== g)
                            if ("data" !== g || l[g] instanceof Uint8Array) "CMapReaderFactory" !== g ? u[g] = l[g] : p = l[g];
                            else {
                                var m = l[g];
                                if ("string" == typeof m) u[g] = (0, o.stringToBytes)(m);
                                else if ("object" !== (void 0 === m ? "undefined" : a(m)) || null === m || isNaN(m.length)) {
                                    if (!(0, o.isArrayBuffer)(m)) throw new Error("Invalid PDF binary data: either typed array, string or array-like object is expected in the data property.");
                                    u[g] = new Uint8Array(m)
                                } else u[g] = new Uint8Array(m)
                            } else h = l[g];
            else c = l[g];
            else u[g] = new URL(l[g], window.location).href;
            if (u.rangeChunkSize = u.rangeChunkSize || f, u.ignoreErrors = !0 !== u.stopAtErrors, void 0 !== u.disableNativeImageDecoder && (0, o.deprecated)("parameter disableNativeImageDecoder, use nativeImageDecoderSupport instead"), u.nativeImageDecoderSupport = u.nativeImageDecoderSupport || (!0 === u.disableNativeImageDecoder ? o.NativeImageDecoding.NONE : o.NativeImageDecoding.DECODE), u.nativeImageDecoderSupport !== o.NativeImageDecoding.DECODE && u.nativeImageDecoderSupport !== o.NativeImageDecoding.NONE && u.nativeImageDecoderSupport !== o.NativeImageDecoding.DISPLAY && ((0, o.warn)("Invalid parameter nativeImageDecoderSupport: need a state of enum {NativeImageDecoding}"), u.nativeImageDecoderSupport = o.NativeImageDecoding.DECODE), !h) {
                var b = (0, s.getDefaultSetting)("workerPort");
                h = b ? k.fromPort(b) : new k, i._worker = h
            }
            var y = i.docId;
            return h.promise.then(function() {
                if (i.destroyed) throw new Error("Loading aborted");
                return function(e, t, n, r) {
                    return e.destroyed ? Promise.reject(new Error("Worker was destroyed")) : (t.disableAutoFetch = (0, s.getDefaultSetting)("disableAutoFetch"), t.disableStream = (0, s.getDefaultSetting)("disableStream"), t.chunkedViewerLoading = !!n, n && (t.length = n.length, t.initialData = n.initialData), e.messageHandler.sendWithPromise("GetDocRequest", {
                        docId: r,
                        apiVersion: "1.10.88",
                        source: {
                            data: t.data,
                            url: t.url,
                            password: t.password,
                            disableAutoFetch: t.disableAutoFetch,
                            rangeChunkSize: t.rangeChunkSize,
                            length: t.length
                        },
                        maxImageSize: (0, s.getDefaultSetting)("maxImageSize"),
                        disableFontFace: (0, s.getDefaultSetting)("disableFontFace"),
                        disableCreateObjectURL: (0, s.getDefaultSetting)("disableCreateObjectURL"),
                        postMessageTransfers: (0, s.getDefaultSetting)("postMessageTransfers") && !v,
                        docBaseUrl: t.docBaseUrl,
                        nativeImageDecoderSupport: t.nativeImageDecoderSupport,
                        ignoreErrors: t.ignoreErrors,
                        isEvalSupported: (0, s.getDefaultSetting)("isEvalSupported")
                    }).then(function(t) {
                        if (e.destroyed) throw new Error("Worker was destroyed");
                        return t
                    }))
                }(h, u, c, y).then(function(e) {
                    if (i.destroyed) throw new Error("Loading aborted");
                    var t = void 0;
                    c ? t = new d.PDFDataTransportStream(u, c) : u.data || (t = new _({
                        source: u,
                        disableRange: (0, s.getDefaultSetting)("disableRange")
                    }));
                    var n = new o.MessageHandler(y, e, h.port);
                    n.postMessageTransfers = h.postMessageTransfers;
                    var r = new T(n, i, t, p);
                    i._transport = r, n.send("Ready", null)
                })
            }).catch(i._capability.reject), i
        }, t.LoopbackPort = C, t.PDFDataRangeTransport = S, t.PDFWorker = k, t.PDFDocumentProxy = P, t.PDFPageProxy = A, t.setPDFNetworkStreamClass = function(e) {
            _ = e
        }, t._UnsupportedManager = L, t.version = "1.10.88", t.build = "c62a1938"
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.WebGLUtils = void 0;
        var r = n(13),
            i = n(0),
            a = function() {
                function e(e, t, n) {
                    var r = e.createShader(n);
                    e.shaderSource(r, t), e.compileShader(r);
                    if (!e.getShaderParameter(r, e.COMPILE_STATUS)) {
                        var i = e.getShaderInfoLog(r);
                        throw new Error("Error during shader compilation: " + i)
                    }
                    return r
                }

                function t(t, n) {
                    return e(t, n, t.VERTEX_SHADER)
                }

                function n(t, n) {
                    return e(t, n, t.FRAGMENT_SHADER)
                }

                function a(e, t) {
                    for (var n = e.createProgram(), r = 0, i = t.length; r < i; ++r) e.attachShader(n, t[r]);
                    e.linkProgram(n);
                    if (!e.getProgramParameter(n, e.LINK_STATUS)) {
                        var a = e.getProgramInfoLog(n);
                        throw new Error("Error during program linking: " + a)
                    }
                    return n
                }

                function o(e, t, n) {
                    e.activeTexture(n);
                    var r = e.createTexture();
                    return e.bindTexture(e.TEXTURE_2D, r), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t), r
                }

                function s() {
                    l || (u = document.createElement("canvas"), l = u.getContext("webgl", {
                        premultipliedalpha: !1
                    }))
                }
                var l, u, c = "  attribute vec2 a_position;                                      attribute vec2 a_texCoord;                                                                                                      uniform vec2 u_resolution;                                                                                                      varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_texCoord = a_texCoord;                                      }                                                             ",
                    h = "  precision mediump float;                                                                                                        uniform vec4 u_backdrop;                                        uniform int u_subtype;                                          uniform sampler2D u_image;                                      uniform sampler2D u_mask;                                                                                                       varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec4 imageColor = texture2D(u_image, v_texCoord);               vec4 maskColor = texture2D(u_mask, v_texCoord);                 if (u_backdrop.a > 0.0) {                                         maskColor.rgb = maskColor.rgb * maskColor.a +                                   u_backdrop.rgb * (1.0 - maskColor.a);         }                                                               float lum;                                                      if (u_subtype == 0) {                                             lum = maskColor.a;                                            } else {                                                          lum = maskColor.r * 0.3 + maskColor.g * 0.59 +                        maskColor.b * 0.11;                                     }                                                               imageColor.a *= lum;                                            imageColor.rgb *= imageColor.a;                                 gl_FragColor = imageColor;                                    }                                                             ",
                    d = null,
                    f = "  attribute vec2 a_position;                                      attribute vec3 a_color;                                                                                                         uniform vec2 u_resolution;                                      uniform vec2 u_scale;                                           uniform vec2 u_offset;                                                                                                          varying vec4 v_color;                                                                                                           void main() {                                                     vec2 position = (a_position + u_offset) * u_scale;              vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_color = vec4(a_color / 255.0, 1.0);                         }                                                             ",
                    p = "  precision mediump float;                                                                                                        varying vec4 v_color;                                                                                                           void main() {                                                     gl_FragColor = v_color;                                       }                                                             ",
                    v = null;
                return {get isEnabled() {
                        if ((0, r.getDefaultSetting)("disableWebGL")) return !1;
                        var e = !1;
                        try {
                            s(), e = !!l
                        } catch (e) {}
                        return (0, i.shadow)(this, "isEnabled", e)
                    },
                    composeSMask: function(e, r, i) {
                        var f = e.width,
                            p = e.height;
                        d || function() {
                            var e, r;
                            s(), e = u, u = null, r = l, l = null;
                            var i = a(r, [t(r, c), n(r, h)]);
                            r.useProgram(i);
                            var o = {};
                            o.gl = r, o.canvas = e, o.resolutionLocation = r.getUniformLocation(i, "u_resolution"), o.positionLocation = r.getAttribLocation(i, "a_position"), o.backdropLocation = r.getUniformLocation(i, "u_backdrop"), o.subtypeLocation = r.getUniformLocation(i, "u_subtype");
                            var f = r.getAttribLocation(i, "a_texCoord"),
                                p = r.getUniformLocation(i, "u_image"),
                                v = r.getUniformLocation(i, "u_mask"),
                                g = r.createBuffer();
                            r.bindBuffer(r.ARRAY_BUFFER, g), r.bufferData(r.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), r.STATIC_DRAW), r.enableVertexAttribArray(f), r.vertexAttribPointer(f, 2, r.FLOAT, !1, 0, 0), r.uniform1i(p, 0), r.uniform1i(v, 1), d = o
                        }();
                        var v = d,
                            g = v.canvas,
                            m = v.gl;
                        g.width = f, g.height = p, m.viewport(0, 0, m.drawingBufferWidth, m.drawingBufferHeight), m.uniform2f(v.resolutionLocation, f, p), i.backdrop ? m.uniform4f(v.resolutionLocation, i.backdrop[0], i.backdrop[1], i.backdrop[2], 1) : m.uniform4f(v.resolutionLocation, 0, 0, 0, 0), m.uniform1i(v.subtypeLocation, "Luminosity" === i.subtype ? 1 : 0);
                        var b = o(m, e, m.TEXTURE0),
                            y = o(m, r, m.TEXTURE1),
                            _ = m.createBuffer();
                        return m.bindBuffer(m.ARRAY_BUFFER, _), m.bufferData(m.ARRAY_BUFFER, new Float32Array([0, 0, f, 0, 0, p, 0, p, f, 0, f, p]), m.STATIC_DRAW), m.enableVertexAttribArray(v.positionLocation), m.vertexAttribPointer(v.positionLocation, 2, m.FLOAT, !1, 0, 0), m.clearColor(0, 0, 0, 0), m.enable(m.BLEND), m.blendFunc(m.ONE, m.ONE_MINUS_SRC_ALPHA), m.clear(m.COLOR_BUFFER_BIT), m.drawArrays(m.TRIANGLES, 0, 6), m.flush(), m.deleteTexture(b), m.deleteTexture(y), m.deleteBuffer(_), g
                    },
                    drawFigures: function(e, r, i, o, c) {
                        v || function() {
                            var e, r;
                            s(), e = u, u = null, r = l, l = null;
                            var i = a(r, [t(r, f), n(r, p)]);
                            r.useProgram(i);
                            var o = {};
                            o.gl = r, o.canvas = e, o.resolutionLocation = r.getUniformLocation(i, "u_resolution"), o.scaleLocation = r.getUniformLocation(i, "u_scale"), o.offsetLocation = r.getUniformLocation(i, "u_offset"), o.positionLocation = r.getAttribLocation(i, "a_position"), o.colorLocation = r.getAttribLocation(i, "a_color"), v = o
                        }();
                        var h = v,
                            d = h.canvas,
                            g = h.gl;
                        d.width = e, d.height = r, g.viewport(0, 0, g.drawingBufferWidth, g.drawingBufferHeight), g.uniform2f(h.resolutionLocation, e, r);
                        var m, b, y, _ = 0;
                        for (m = 0, b = o.length; m < b; m++) switch (o[m].type) {
                            case "lattice":
                                _ += ((y = o[m].coords.length / o[m].verticesPerRow | 0) - 1) * (o[m].verticesPerRow - 1) * 6;
                                break;
                            case "triangles":
                                _ += o[m].coords.length
                        }
                        var w = new Float32Array(2 * _),
                            S = new Uint8Array(3 * _),
                            P = c.coords,
                            A = c.colors,
                            C = 0,
                            k = 0;
                        for (m = 0, b = o.length; m < b; m++) {
                            var T = o[m],
                                x = T.coords,
                                E = T.colors;
                            switch (T.type) {
                                case "lattice":
                                    var R = T.verticesPerRow;
                                    y = x.length / R | 0;
                                    for (var L = 1; L < y; L++)
                                        for (var I = L * R + 1, F = 1; F < R; F++, I++) w[C] = P[x[I - R - 1]], w[C + 1] = P[x[I - R - 1] + 1], w[C + 2] = P[x[I - R]], w[C + 3] = P[x[I - R] + 1], w[C + 4] = P[x[I - 1]], w[C + 5] = P[x[I - 1] + 1], S[k] = A[E[I - R - 1]], S[k + 1] = A[E[I - R - 1] + 1], S[k + 2] = A[E[I - R - 1] + 2], S[k + 3] = A[E[I - R]], S[k + 4] = A[E[I - R] + 1], S[k + 5] = A[E[I - R] + 2], S[k + 6] = A[E[I - 1]], S[k + 7] = A[E[I - 1] + 1], S[k + 8] = A[E[I - 1] + 2], w[C + 6] = w[C + 2], w[C + 7] = w[C + 3], w[C + 8] = w[C + 4], w[C + 9] = w[C + 5], w[C + 10] = P[x[I]], w[C + 11] = P[x[I] + 1], S[k + 9] = S[k + 3], S[k + 10] = S[k + 4], S[k + 11] = S[k + 5], S[k + 12] = S[k + 6], S[k + 13] = S[k + 7], S[k + 14] = S[k + 8], S[k + 15] = A[E[I]], S[k + 16] = A[E[I] + 1], S[k + 17] = A[E[I] + 2], C += 12, k += 18;
                                    break;
                                case "triangles":
                                    for (var D = 0, O = x.length; D < O; D++) w[C] = P[x[D]], w[C + 1] = P[x[D] + 1], S[k] = A[E[D]], S[k + 1] = A[E[D] + 1], S[k + 2] = A[E[D] + 2], C += 2, k += 3
                            }
                        }
                        i ? g.clearColor(i[0] / 255, i[1] / 255, i[2] / 255, 1) : g.clearColor(0, 0, 0, 0), g.clear(g.COLOR_BUFFER_BIT);
                        var N = g.createBuffer();
                        g.bindBuffer(g.ARRAY_BUFFER, N), g.bufferData(g.ARRAY_BUFFER, w, g.STATIC_DRAW), g.enableVertexAttribArray(h.positionLocation), g.vertexAttribPointer(h.positionLocation, 2, g.FLOAT, !1, 0, 0);
                        var M = g.createBuffer();
                        return g.bindBuffer(g.ARRAY_BUFFER, M), g.bufferData(g.ARRAY_BUFFER, S, g.STATIC_DRAW), g.enableVertexAttribArray(h.colorLocation), g.vertexAttribPointer(h.colorLocation, 3, g.UNSIGNED_BYTE, !1, 0, 0), g.uniform2f(h.scaleLocation, c.scaleX, c.scaleY), g.uniform2f(h.offsetLocation, c.offsetX, c.offsetY), g.drawArrays(g.TRIANGLES, 0, _), g.flush(), g.deleteBuffer(N), g.deleteBuffer(M), d
                    },
                    clear: function() {
                        d && d.canvas && (d.canvas.width = 0, d.canvas.height = 0), v && v.canvas && (v.canvas.width = 0, v.canvas.height = 0), d = null, v = null
                    }
                }
            }();
        t.WebGLUtils = a
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Metadata = void 0;
        var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            i = n(0),
            a = n(13),
            o = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (0, i.assert)("string" == typeof t, "Metadata: input is not a string"), t = this._repair(t);
                    t = (new a.SimpleXMLParser).parseFromString(t), this._metadata = Object.create(null), this._parse(t)
                }
                return r(e, [{
                    key: "_repair",
                    value: function(e) {
                        return e.replace(/>\\376\\377([^<]+)/g, function(e, t) {
                            for (var n = t.replace(/\\([0-3])([0-7])([0-7])/g, function(e, t, n, r) {
                                    return String.fromCharCode(64 * t + 8 * n + 1 * r)
                                }), r = "", i = 0, a = n.length; i < a; i += 2) {
                                var o = 256 * n.charCodeAt(i) + n.charCodeAt(i + 1);
                                r += o >= 32 && o < 127 && 60 !== o && 62 !== o && 38 !== o ? String.fromCharCode(o) : "&#x" + (65536 + o).toString(16).substring(1) + ";"
                            }
                            return ">" + r
                        })
                    }
                }, {
                    key: "_parse",
                    value: function(e) {
                        var t = e.documentElement;
                        if ("rdf:rdf" !== t.nodeName.toLowerCase())
                            for (t = t.firstChild; t && "rdf:rdf" !== t.nodeName.toLowerCase();) t = t.nextSibling;
                        var n = t ? t.nodeName.toLowerCase() : null;
                        if (t && "rdf:rdf" === n && t.hasChildNodes())
                            for (var r = t.childNodes, i = 0, a = r.length; i < a; i++) {
                                var o = r[i];
                                if ("rdf:description" === o.nodeName.toLowerCase())
                                    for (var s = 0, l = o.childNodes.length; s < l; s++)
                                        if ("#text" !== o.childNodes[s].nodeName.toLowerCase()) {
                                            var u = o.childNodes[s],
                                                c = u.nodeName.toLowerCase();
                                            this._metadata[c] = u.textContent.trim()
                                        }
                            }
                    }
                }, {
                    key: "get",
                    value: function(e) {
                        return this._metadata[e] || null
                    }
                }, {
                    key: "getAll",
                    value: function() {
                        return this._metadata
                    }
                }, {
                    key: "has",
                    value: function(e) {
                        return void 0 !== this._metadata[e]
                    }
                }, {
                    key: "metadata",
                    get: function() {
                        return (0, i.deprecated)("`metadata` getter; use `getAll()` instead."), this.getAll()
                    }
                }]), e
            }();
        t.Metadata = o
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function i(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.AnnotationLayer = void 0;
        var o = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            s = n(13),
            l = n(0),
            u = function() {
                function e() {
                    a(this, e)
                }
                return o(e, null, [{
                    key: "create",
                    value: function(e) {
                        switch (e.data.annotationType) {
                            case l.AnnotationType.LINK:
                                return new h(e);
                            case l.AnnotationType.TEXT:
                                return new d(e);
                            case l.AnnotationType.WIDGET:
                                switch (e.data.fieldType) {
                                    case "Tx":
                                        return new p(e);
                                    case "Btn":
                                        if (e.data.radioButton) return new g(e);
                                        if (e.data.checkBox) return new v(e);
                                        (0, l.warn)("Unimplemented button widget annotation: pushbutton");
                                        break;
                                    case "Ch":
                                        return new m(e)
                                }
                                return new f(e);
                            case l.AnnotationType.POPUP:
                                return new b(e);
                            case l.AnnotationType.LINE:
                                return new _(e);
                            case l.AnnotationType.SQUARE:
                                return new w(e);
                            case l.AnnotationType.CIRCLE:
                                return new S(e);
                            case l.AnnotationType.POLYLINE:
                                return new P(e);
                            case l.AnnotationType.POLYGON:
                                return new A(e);
                            case l.AnnotationType.HIGHLIGHT:
                                return new C(e);
                            case l.AnnotationType.UNDERLINE:
                                return new k(e);
                            case l.AnnotationType.SQUIGGLY:
                                return new T(e);
                            case l.AnnotationType.STRIKEOUT:
                                return new x(e);
                            case l.AnnotationType.STAMP:
                                return new E(e);
                            case l.AnnotationType.FILEATTACHMENT:
                                return new R(e);
                            default:
                                return new c(e)
                        }
                    }
                }]), e
            }(),
            c = function() {
                function e(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    a(this, e), this.isRenderable = n, this.data = t.data, this.layer = t.layer, this.page = t.page, this.viewport = t.viewport, this.linkService = t.linkService, this.downloadManager = t.downloadManager, this.imageResourcesPath = t.imageResourcesPath, this.renderInteractiveForms = t.renderInteractiveForms, this.svgFactory = t.svgFactory, n && (this.container = this._createContainer(r))
                }
                return o(e, [{
                    key: "_createContainer",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                            t = this.data,
                            n = this.page,
                            r = this.viewport,
                            i = document.createElement("section"),
                            a = t.rect[2] - t.rect[0],
                            o = t.rect[3] - t.rect[1];
                        i.setAttribute("data-annotation-id", t.id);
                        var u = l.Util.normalizeRect([t.rect[0], n.view[3] - t.rect[1] + n.view[1], t.rect[2], n.view[3] - t.rect[3] + n.view[1]]);
                        if (s.CustomStyle.setProp("transform", i, "matrix(" + r.transform.join(",") + ")"), s.CustomStyle.setProp("transformOrigin", i, -u[0] + "px " + -u[1] + "px"), !e && t.borderStyle.width > 0) {
                            i.style.borderWidth = t.borderStyle.width + "px", t.borderStyle.style !== l.AnnotationBorderStyleType.UNDERLINE && (a -= 2 * t.borderStyle.width, o -= 2 * t.borderStyle.width);
                            var c = t.borderStyle.horizontalCornerRadius,
                                h = t.borderStyle.verticalCornerRadius;
                            if (c > 0 || h > 0) {
                                var d = c + "px / " + h + "px";
                                s.CustomStyle.setProp("borderRadius", i, d)
                            }
                            switch (t.borderStyle.style) {
                                case l.AnnotationBorderStyleType.SOLID:
                                    i.style.borderStyle = "solid";
                                    break;
                                case l.AnnotationBorderStyleType.DASHED:
                                    i.style.borderStyle = "dashed";
                                    break;
                                case l.AnnotationBorderStyleType.BEVELED:
                                    (0, l.warn)("Unimplemented border style: beveled");
                                    break;
                                case l.AnnotationBorderStyleType.INSET:
                                    (0, l.warn)("Unimplemented border style: inset");
                                    break;
                                case l.AnnotationBorderStyleType.UNDERLINE:
                                    i.style.borderBottomStyle = "solid"
                            }
                            t.color ? i.style.borderColor = l.Util.makeCssRgb(0 | t.color[0], 0 | t.color[1], 0 | t.color[2]) : i.style.borderWidth = 0
                        }
                        return i.style.left = u[0] + "px", i.style.top = u[1] + "px", i.style.width = a + "px", i.style.height = o + "px", i
                    }
                }, {
                    key: "_createPopup",
                    value: function(e, t, n) {
                        t || ((t = document.createElement("div")).style.height = e.style.height, t.style.width = e.style.width, e.appendChild(t));
                        var r = new y({
                            container: e,
                            trigger: t,
                            color: n.color,
                            title: n.title,
                            contents: n.contents,
                            hideWrapper: !0
                        }).render();
                        r.style.left = e.style.width, e.appendChild(r)
                    }
                }, {
                    key: "render",
                    value: function() {
                        throw new Error("Abstract method `AnnotationElement.render` called")
                    }
                }]), e
            }(),
            h = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.url || e.data.dest || e.data.action);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "linkAnnotation";
                        var e = document.createElement("a");
                        return (0, s.addLinkAttributes)(e, {
                            url: this.data.url,
                            target: this.data.newWindow ? s.LinkTarget.BLANK : void 0
                        }), this.data.url || (this.data.action ? this._bindNamedAction(e, this.data.action) : this._bindLink(e, this.data.dest)), this.container.appendChild(e), this.container
                    }
                }, {
                    key: "_bindLink",
                    value: function(e, t) {
                        var n = this;
                        e.href = this.linkService.getDestinationHash(t), e.onclick = function() {
                            return t && n.linkService.navigateTo(t), !1
                        }, t && (e.className = "internalLink")
                    }
                }, {
                    key: "_bindNamedAction",
                    value: function(e, t) {
                        var n = this;
                        e.href = this.linkService.getAnchorUrl(""), e.onclick = function() {
                            return n.linkService.executeNamedAction(t), !1
                        }, e.className = "internalLink"
                    }
                }]), t
            }(),
            d = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "textAnnotation";
                        var e = document.createElement("img");
                        return e.style.height = this.container.style.height, e.style.width = this.container.style.width, e.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", e.alt = "[{{type}} Annotation]", e.dataset.l10nId = "text_annotation_type", e.dataset.l10nArgs = JSON.stringify({
                            type: this.data.name
                        }), this.data.hasPopup || this._createPopup(this.container, e, this.data), this.container.appendChild(e), this.container
                    }
                }]), t
            }(),
            f = function(e) {
                function t() {
                    return a(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container
                    }
                }]), t
            }(),
            p = function(e) {
                function t(e) {
                    a(this, t);
                    var n = e.renderInteractiveForms || !e.data.hasAppearance && !!e.data.fieldValue;
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
                }
                return i(t, f), o(t, [{
                    key: "render",
                    value: function() {
                        var e = ["left", "center", "right"];
                        this.container.className = "textWidgetAnnotation";
                        var t = null;
                        if (this.renderInteractiveForms) {
                            if (this.data.multiLine ? (t = document.createElement("textarea")).textContent = this.data.fieldValue : ((t = document.createElement("input")).type = "text", t.setAttribute("value", this.data.fieldValue)), t.disabled = this.data.readOnly, null !== this.data.maxLen && (t.maxLength = this.data.maxLen), this.data.comb) {
                                var n = (this.data.rect[2] - this.data.rect[0]) / this.data.maxLen;
                                t.classList.add("comb"), t.style.letterSpacing = "calc(" + n + "px - 1ch)"
                            }
                        } else {
                            (t = document.createElement("div")).textContent = this.data.fieldValue, t.style.verticalAlign = "middle", t.style.display = "table-cell";
                            var r = null;
                            this.data.fontRefName && (r = this.page.commonObjs.getData(this.data.fontRefName)), this._setTextStyle(t, r)
                        }
                        return null !== this.data.textAlignment && (t.style.textAlign = e[this.data.textAlignment]), this.container.appendChild(t), this.container
                    }
                }, {
                    key: "_setTextStyle",
                    value: function(e, t) {
                        var n = e.style;
                        if (n.fontSize = this.data.fontSize + "px", n.direction = this.data.fontDirection < 0 ? "rtl" : "ltr", t) {
                            n.fontWeight = t.black ? t.bold ? "900" : "bold" : t.bold ? "bold" : "normal", n.fontStyle = t.italic ? "italic" : "normal";
                            var r = t.loadedName ? '"' + t.loadedName + '", ' : "",
                                i = t.fallbackName || "Helvetica, sans-serif";
                            n.fontFamily = r + i
                        }
                    }
                }]), t
            }(),
            v = function(e) {
                function t(e) {
                    return a(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, e.renderInteractiveForms))
                }
                return i(t, f), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "buttonWidgetAnnotation checkBox";
                        var e = document.createElement("input");
                        return e.disabled = this.data.readOnly, e.type = "checkbox", this.data.fieldValue && "Off" !== this.data.fieldValue && e.setAttribute("checked", !0), this.container.appendChild(e), this.container
                    }
                }]), t
            }(),
            g = function(e) {
                function t(e) {
                    return a(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, e.renderInteractiveForms))
                }
                return i(t, f), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "buttonWidgetAnnotation radioButton";
                        var e = document.createElement("input");
                        return e.disabled = this.data.readOnly, e.type = "radio", e.name = this.data.fieldName, this.data.fieldValue === this.data.buttonValue && e.setAttribute("checked", !0), this.container.appendChild(e), this.container
                    }
                }]), t
            }(),
            m = function(e) {
                function t(e) {
                    return a(this, t), r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, e.renderInteractiveForms))
                }
                return i(t, f), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "choiceWidgetAnnotation";
                        var e = document.createElement("select");
                        e.disabled = this.data.readOnly, this.data.combo || (e.size = this.data.options.length, this.data.multiSelect && (e.multiple = !0));
                        for (var t = 0, n = this.data.options.length; t < n; t++) {
                            var r = this.data.options[t],
                                i = document.createElement("option");
                            i.textContent = r.displayValue, i.value = r.exportValue, this.data.fieldValue.indexOf(r.displayValue) >= 0 && i.setAttribute("selected", !0), e.appendChild(i)
                        }
                        return this.container.appendChild(e), this.container
                    }
                }]), t
            }(),
            b = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !(!e.data.title && !e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        if (this.container.className = "popupAnnotation", ["Line", "Square", "Circle", "PolyLine", "Polygon"].indexOf(this.data.parentType) >= 0) return this.container;
                        var e = '[data-annotation-id="' + this.data.parentId + '"]',
                            t = this.layer.querySelector(e);
                        if (!t) return this.container;
                        var n = new y({
                                container: this.container,
                                trigger: t,
                                color: this.data.color,
                                title: this.data.title,
                                contents: this.data.contents
                            }),
                            r = parseFloat(t.style.left),
                            i = parseFloat(t.style.width);
                        return s.CustomStyle.setProp("transformOrigin", this.container, -(r + i) + "px -" + t.style.top), this.container.style.left = r + i + "px", this.container.appendChild(n.render()), this.container
                    }
                }]), t
            }(),
            y = function() {
                function e(t) {
                    a(this, e), this.container = t.container, this.trigger = t.trigger, this.color = t.color, this.title = t.title, this.contents = t.contents, this.hideWrapper = t.hideWrapper || !1, this.pinned = !1
                }
                return o(e, [{
                    key: "render",
                    value: function() {
                        var e = document.createElement("div");
                        e.className = "popupWrapper", this.hideElement = this.hideWrapper ? e : this.container, this.hideElement.setAttribute("hidden", !0);
                        var t = document.createElement("div");
                        t.className = "popup";
                        var n = this.color;
                        if (n) {
                            var r = .7 * (255 - n[0]) + n[0],
                                i = .7 * (255 - n[1]) + n[1],
                                a = .7 * (255 - n[2]) + n[2];
                            t.style.backgroundColor = l.Util.makeCssRgb(0 | r, 0 | i, 0 | a)
                        }
                        var o = this._formatContents(this.contents),
                            s = document.createElement("h1");
                        return s.textContent = this.title, this.trigger.addEventListener("click", this._toggle.bind(this)), this.trigger.addEventListener("mouseover", this._show.bind(this, !1)), this.trigger.addEventListener("mouseout", this._hide.bind(this, !1)), t.addEventListener("click", this._hide.bind(this, !0)), t.appendChild(s), t.appendChild(o), e.appendChild(t), e
                    }
                }, {
                    key: "_formatContents",
                    value: function(e) {
                        for (var t = document.createElement("p"), n = e.split(/(?:\r\n?|\n)/), r = 0, i = n.length; r < i; ++r) {
                            var a = n[r];
                            t.appendChild(document.createTextNode(a)), r < i - 1 && t.appendChild(document.createElement("br"))
                        }
                        return t
                    }
                }, {
                    key: "_toggle",
                    value: function() {
                        this.pinned ? this._hide(!0) : this._show(!0)
                    }
                }, {
                    key: "_show",
                    value: function() {
                        arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (this.pinned = !0), this.hideElement.hasAttribute("hidden") && (this.hideElement.removeAttribute("hidden"), this.container.style.zIndex += 1)
                    }
                }, {
                    key: "_hide",
                    value: function() {
                        (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && (this.pinned = !1), this.hideElement.hasAttribute("hidden") || this.pinned || (this.hideElement.setAttribute("hidden", !0), this.container.style.zIndex -= 1)
                    }
                }]), e
            }(),
            _ = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "lineAnnotation";
                        var e = this.data,
                            t = e.rect[2] - e.rect[0],
                            n = e.rect[3] - e.rect[1],
                            r = this.svgFactory.create(t, n),
                            i = this.svgFactory.createElement("svg:line");
                        return i.setAttribute("x1", e.rect[2] - e.lineCoordinates[0]), i.setAttribute("y1", e.rect[3] - e.lineCoordinates[1]), i.setAttribute("x2", e.rect[2] - e.lineCoordinates[2]), i.setAttribute("y2", e.rect[3] - e.lineCoordinates[3]), i.setAttribute("stroke-width", e.borderStyle.width), i.setAttribute("stroke", "transparent"), r.appendChild(i), this.container.append(r), this._createPopup(this.container, i, e), this.container
                    }
                }]), t
            }(),
            w = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "squareAnnotation";
                        var e = this.data,
                            t = e.rect[2] - e.rect[0],
                            n = e.rect[3] - e.rect[1],
                            r = this.svgFactory.create(t, n),
                            i = e.borderStyle.width,
                            a = this.svgFactory.createElement("svg:rect");
                        return a.setAttribute("x", i / 2), a.setAttribute("y", i / 2), a.setAttribute("width", t - i), a.setAttribute("height", n - i), a.setAttribute("stroke-width", i), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "none"), r.appendChild(a), this.container.append(r), this._createPopup(this.container, a, e), this.container
                    }
                }]), t
            }(),
            S = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "circleAnnotation";
                        var e = this.data,
                            t = e.rect[2] - e.rect[0],
                            n = e.rect[3] - e.rect[1],
                            r = this.svgFactory.create(t, n),
                            i = e.borderStyle.width,
                            a = this.svgFactory.createElement("svg:ellipse");
                        return a.setAttribute("cx", t / 2), a.setAttribute("cy", n / 2), a.setAttribute("rx", t / 2 - i / 2), a.setAttribute("ry", n / 2 - i / 2), a.setAttribute("stroke-width", i), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "none"), r.appendChild(a), this.container.append(r), this._createPopup(this.container, a, e), this.container
                    }
                }]), t
            }(),
            P = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents),
                        i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0));
                    return i.containerClassName = "polylineAnnotation", i.svgElementName = "svg:polyline", i
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = this.containerClassName;
                        for (var e = this.data, t = e.rect[2] - e.rect[0], n = e.rect[3] - e.rect[1], r = this.svgFactory.create(t, n), i = e.vertices, a = [], o = 0, s = i.length; o < s; o++) {
                            var l = i[o].x - e.rect[0],
                                u = e.rect[3] - i[o].y;
                            a.push(l + "," + u)
                        }
                        a = a.join(" ");
                        var c = e.borderStyle.width,
                            h = this.svgFactory.createElement(this.svgElementName);
                        return h.setAttribute("points", a), h.setAttribute("stroke-width", c), h.setAttribute("stroke", "transparent"), h.setAttribute("fill", "none"), r.appendChild(h), this.container.append(r), this._createPopup(this.container, h, e), this.container
                    }
                }]), t
            }(),
            A = function(e) {
                function t(e) {
                    a(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return n.containerClassName = "polygonAnnotation", n.svgElementName = "svg:polygon", n
                }
                return i(t, P), t
            }(),
            C = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container.className = "highlightAnnotation", this.data.hasPopup || this._createPopup(this.container, null, this.data), this.container
                    }
                }]), t
            }(),
            k = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container.className = "underlineAnnotation", this.data.hasPopup || this._createPopup(this.container, null, this.data), this.container
                    }
                }]), t
            }(),
            T = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container.className = "squigglyAnnotation", this.data.hasPopup || this._createPopup(this.container, null, this.data), this.container
                    }
                }]), t
            }(),
            x = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container.className = "strikeoutAnnotation", this.data.hasPopup || this._createPopup(this.container, null, this.data), this.container
                    }
                }]), t
            }(),
            E = function(e) {
                function t(e) {
                    a(this, t);
                    var n = !!(e.data.hasPopup || e.data.title || e.data.contents);
                    return r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n, !0))
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        return this.container.className = "stampAnnotation", this.data.hasPopup || this._createPopup(this.container, null, this.data), this.container
                    }
                }]), t
            }(),
            R = function(e) {
                function t(e) {
                    a(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, !0)),
                        i = n.data.file;
                    return n.filename = (0, s.getFilenameFromUrl)(i.filename), n.content = i.content, n.linkService.onFileAttachmentAnnotation({
                        id: (0, l.stringToPDFString)(i.filename),
                        filename: i.filename,
                        content: i.content
                    }), n
                }
                return i(t, c), o(t, [{
                    key: "render",
                    value: function() {
                        this.container.className = "fileAttachmentAnnotation";
                        var e = document.createElement("div");
                        return e.style.height = this.container.style.height, e.style.width = this.container.style.width, e.addEventListener("dblclick", this._download.bind(this)), this.data.hasPopup || !this.data.title && !this.data.contents || this._createPopup(this.container, e, this.data), this.container.appendChild(e), this.container
                    }
                }, {
                    key: "_download",
                    value: function() {
                        this.downloadManager ? this.downloadManager.downloadData(this.content, this.filename, "") : (0, l.warn)("Download cannot be started due to unavailable download manager")
                    }
                }]), t
            }(),
            L = function() {
                function e() {
                    a(this, e)
                }
                return o(e, null, [{
                    key: "render",
                    value: function(e) {
                        for (var t = 0, n = e.annotations.length; t < n; t++) {
                            var r = e.annotations[t];
                            if (r) {
                                var i = u.create({
                                    data: r,
                                    layer: e.div,
                                    page: e.page,
                                    viewport: e.viewport,
                                    linkService: e.linkService,
                                    downloadManager: e.downloadManager,
                                    imageResourcesPath: e.imageResourcesPath || (0, s.getDefaultSetting)("imageResourcesPath"),
                                    renderInteractiveForms: e.renderInteractiveForms || !1,
                                    svgFactory: new s.DOMSVGFactory
                                });
                                i.isRenderable && e.div.appendChild(i.render())
                            }
                        }
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        for (var t = 0, n = e.annotations.length; t < n; t++) {
                            var r = e.annotations[t],
                                i = e.div.querySelector('[data-annotation-id="' + r.id + '"]');
                            i && s.CustomStyle.setProp("transform", i, "matrix(" + e.viewport.transform.join(",") + ")")
                        }
                        e.div.removeAttribute("hidden")
                    }
                }]), e
            }();
        t.AnnotationLayer = L
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.renderTextLayer = void 0;
        var r = n(0),
            i = n(13),
            a = function() {
                function e(e, t, n) {
                    var a = document.createElement("div"),
                        o = {
                            style: null,
                            angle: 0,
                            canvasWidth: 0,
                            isWhitespace: !1,
                            originalTransform: null,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: 0,
                            scale: 1
                        };
                    if (e._textDivs.push(a), function(e) {
                            return !l.test(e)
                        }(t.str)) return o.isWhitespace = !0, void e._textDivProperties.set(a, o);
                    var s = r.Util.transform(e._viewport.transform, t.transform),
                        c = Math.atan2(s[1], s[0]),
                        h = n[t.fontName];
                    h.vertical && (c += Math.PI / 2);
                    var d = Math.sqrt(s[2] * s[2] + s[3] * s[3]),
                        f = d;
                    h.ascent ? f = h.ascent * f : h.descent && (f = (1 + h.descent) * f);
                    var p, v;
                    if (0 === c ? (p = s[4], v = s[5] - f) : (p = s[4] + f * Math.sin(c), v = s[5] - f * Math.cos(c)), u[1] = p, u[3] = v, u[5] = d, u[7] = h.fontFamily, o.style = u.join(""), a.setAttribute("style", o.style), a.textContent = t.str, (0, i.getDefaultSetting)("pdfBug") && (a.dataset.fontName = t.fontName), 0 !== c && (o.angle = c * (180 / Math.PI)), t.str.length > 1 && (h.vertical ? o.canvasWidth = t.height * e._viewport.scale : o.canvasWidth = t.width * e._viewport.scale), e._textDivProperties.set(a, o), e._textContentStream && e._layoutText(a), e._enhanceTextSelection) {
                        var g = 1,
                            m = 0;
                        0 !== c && (g = Math.cos(c), m = Math.sin(c));
                        var b, y, _ = (h.vertical ? t.height : t.width) * e._viewport.scale,
                            w = d;
                        0 !== c ? (b = [g, m, -m, g, p, v], y = r.Util.getAxialAlignedBoundingBox([0, 0, _, w], b)) : y = [p, v, p + _, v + w], e._bounds.push({
                            left: y[0],
                            top: y[1],
                            right: y[2],
                            bottom: y[3],
                            div: a,
                            size: [_, w],
                            m: b
                        })
                    }
                }

                function t(e) {
                    if (!e._canceled) {
                        var t = e._textDivs,
                            n = e._capability,
                            r = t.length;
                        if (r > s) return e._renderingDone = !0, void n.resolve();
                        if (!e._textContentStream)
                            for (var i = 0; i < r; i++) e._layoutText(t[i]);
                        e._renderingDone = !0, n.resolve()
                    }
                }

                function n(e) {
                    for (var t = e._bounds, n = e._viewport, i = function(e, t, n) {
                            var r = n.map(function(e, t) {
                                return {
                                    x1: e.left,
                                    y1: e.top,
                                    x2: e.right,
                                    y2: e.bottom,
                                    index: t,
                                    x1New: void 0,
                                    x2New: void 0
                                }
                            });
                            a(e, r);
                            var i = new Array(n.length);
                            return r.forEach(function(e) {
                                var t = e.index;
                                i[t] = {
                                    left: e.x1New,
                                    top: 0,
                                    right: e.x2New,
                                    bottom: 0
                                }
                            }), n.map(function(t, n) {
                                var a = i[n],
                                    o = r[n];
                                o.x1 = t.top, o.y1 = e - a.right, o.x2 = t.bottom, o.y2 = e - a.left, o.index = n, o.x1New = void 0, o.x2New = void 0
                            }), a(t, r), r.forEach(function(e) {
                                var t = e.index;
                                i[t].top = e.x1New, i[t].bottom = e.x2New
                            }), i
                        }(n.width, n.height, t), o = 0; o < i.length; o++) {
                        var s = t[o].div,
                            l = e._textDivProperties.get(s);
                        if (0 !== l.angle) {
                            var u = i[o],
                                c = t[o],
                                h = c.m,
                                d = h[0],
                                f = h[1],
                                p = [
                                    [0, 0],
                                    [0, c.size[1]],
                                    [c.size[0], 0], c.size
                                ],
                                v = new Float64Array(64);
                            p.forEach(function(e, t) {
                                var n = r.Util.applyTransform(e, h);
                                v[t + 0] = d && (u.left - n[0]) / d, v[t + 4] = f && (u.top - n[1]) / f, v[t + 8] = d && (u.right - n[0]) / d, v[t + 12] = f && (u.bottom - n[1]) / f, v[t + 16] = f && (u.left - n[0]) / -f, v[t + 20] = d && (u.top - n[1]) / d, v[t + 24] = f && (u.right - n[0]) / -f, v[t + 28] = d && (u.bottom - n[1]) / d, v[t + 32] = d && (u.left - n[0]) / -d, v[t + 36] = f && (u.top - n[1]) / -f, v[t + 40] = d && (u.right - n[0]) / -d, v[t + 44] = f && (u.bottom - n[1]) / -f, v[t + 48] = f && (u.left - n[0]) / f, v[t + 52] = d && (u.top - n[1]) / -d, v[t + 56] = f && (u.right - n[0]) / f, v[t + 60] = d && (u.bottom - n[1]) / -d
                            });
                            var g = function(e, t, n) {
                                    for (var r = 0, i = 0; i < n; i++) {
                                        var a = e[t++];
                                        a > 0 && (r = r ? Math.min(a, r) : a)
                                    }
                                    return r
                                },
                                m = 1 + Math.min(Math.abs(d), Math.abs(f));
                            l.paddingLeft = g(v, 32, 16) / m, l.paddingTop = g(v, 48, 16) / m, l.paddingRight = g(v, 0, 16) / m, l.paddingBottom = g(v, 16, 16) / m, e._textDivProperties.set(s, l)
                        } else l.paddingLeft = t[o].left - i[o].left, l.paddingTop = t[o].top - i[o].top, l.paddingRight = i[o].right - t[o].right, l.paddingBottom = i[o].bottom - t[o].bottom, e._textDivProperties.set(s, l)
                    }
                }

                function a(e, t) {
                    t.sort(function(e, t) {
                        return e.x1 - t.x1 || e.index - t.index
                    });
                    var n = [{
                        start: -1 / 0,
                        end: 1 / 0,
                        boundary: {
                            x1: -1 / 0,
                            y1: -1 / 0,
                            x2: 0,
                            y2: 1 / 0,
                            index: -1,
                            x1New: 0,
                            x2New: 0
                        }
                    }];
                    t.forEach(function(e) {
                        for (var t = 0; t < n.length && n[t].end <= e.y1;) t++;
                        for (var r = n.length - 1; r >= 0 && n[r].start >= e.y2;) r--;
                        var i, a, o, s, l = -1 / 0;
                        for (o = t; o <= r; o++) {
                            var u;
                            (u = (a = (i = n[o]).boundary).x2 > e.x1 ? a.index > e.index ? a.x1New : e.x1 : void 0 === a.x2New ? (a.x2 + e.x1) / 2 : a.x2New) > l && (l = u)
                        }
                        for (e.x1New = l, o = t; o <= r; o++) void 0 === (a = (i = n[o]).boundary).x2New ? a.x2 > e.x1 ? a.index > e.index && (a.x2New = a.x2) : a.x2New = l : a.x2New > l && (a.x2New = Math.max(l, a.x2));
                        var c = [],
                            h = null;
                        for (o = t; o <= r; o++) {
                            var d = (a = (i = n[o]).boundary).x2 > e.x2 ? a : e;
                            h === d ? c[c.length - 1].end = i.end : (c.push({
                                start: i.start,
                                end: i.end,
                                boundary: d
                            }), h = d)
                        }
                        for (n[t].start < e.y1 && (c[0].start = e.y1, c.unshift({
                                start: n[t].start,
                                end: e.y1,
                                boundary: n[t].boundary
                            })), e.y2 < n[r].end && (c[c.length - 1].end = e.y2, c.push({
                                start: e.y2,
                                end: n[r].end,
                                boundary: n[r].boundary
                            })), o = t; o <= r; o++)
                            if (i = n[o], void 0 === (a = i.boundary).x2New) {
                                var f = !1;
                                for (s = t - 1; !f && s >= 0 && n[s].start >= a.y1; s--) f = n[s].boundary === a;
                                for (s = r + 1; !f && s < n.length && n[s].end <= a.y2; s++) f = n[s].boundary === a;
                                for (s = 0; !f && s < c.length; s++) f = c[s].boundary === a;
                                f || (a.x2New = l)
                            }
                        Array.prototype.splice.apply(n, [t, r - t + 1].concat(c))
                    }), n.forEach(function(t) {
                        var n = t.boundary;
                        void 0 === n.x2New && (n.x2New = Math.max(e, n.x2))
                    })
                }

                function o(e) {
                    var t = e.textContent,
                        n = e.textContentStream,
                        i = e.container,
                        a = e.viewport,
                        o = e.textDivs,
                        s = e.textContentItemsStr,
                        l = e.enhanceTextSelection;
                    this._textContent = t, this._textContentStream = n, this._container = i, this._viewport = a, this._textDivs = o || [], this._textContentItemsStr = s || [], this._enhanceTextSelection = !!l, this._reader = null, this._layoutTextLastFontSize = null, this._layoutTextLastFontFamily = null, this._layoutTextCtx = null, this._textDivProperties = new WeakMap, this._renderingDone = !1, this._canceled = !1, this._capability = (0, r.createPromiseCapability)(), this._renderTimer = null, this._bounds = []
                }
                var s = 1e5,
                    l = /\S/,
                    u = ["left: ", 0, "px; top: ", 0, "px; font-size: ", 0, "px; font-family: ", "", ";"];
                return o.prototype = {get promise() {
                            return this._capability.promise
                        },
                        cancel: function() {
                            this._reader && (this._reader.cancel(new r.AbortException("text layer task cancelled")), this._reader = null), this._canceled = !0, null !== this._renderTimer && (clearTimeout(this._renderTimer), this._renderTimer = null), this._capability.reject("canceled")
                        },
                        _processItems: function(t, n) {
                            for (var r = 0, i = t.length; r < i; r++) this._textContentItemsStr.push(t[r].str), e(this, t[r], n)
                        },
                        _layoutText: function(e) {
                            var t = this._container,
                                n = this._textDivProperties.get(e);
                            if (!n.isWhitespace) {
                                var r = e.style.fontSize,
                                    a = e.style.fontFamily;
                                r === this._layoutTextLastFontSize && a === this._layoutTextLastFontFamily || (this._layoutTextCtx.font = r + " " + a, this._lastFontSize = r, this._lastFontFamily = a);
                                var o = this._layoutTextCtx.measureText(e.textContent).width,
                                    s = "";
                                0 !== n.canvasWidth && o > 0 && (n.scale = n.canvasWidth / o, s = "scaleX(" + n.scale + ")"), 0 !== n.angle && (s = "rotate(" + n.angle + "deg) " + s), "" !== s && (n.originalTransform = s, i.CustomStyle.setProp("transform", e, s)), this._textDivProperties.set(e, n), t.appendChild(e)
                            }
                        },
                        _render: function(e) {
                            var n = this,
                                i = (0, r.createPromiseCapability)(),
                                a = Object.create(null),
                                o = document.createElement("canvas");
                            if (o.mozOpaque = !0, this._layoutTextCtx = o.getContext("2d", {
                                    alpha: !1
                                }), this._textContent) {
                                var s = this._textContent.items,
                                    l = this._textContent.styles;
                                this._processItems(s, l), i.resolve()
                            } else {
                                if (!this._textContentStream) throw new Error('Neither "textContent" nor "textContentStream" parameters specified.');
                                this._reader = this._textContentStream.getReader(),
                                    function e() {
                                        n._reader.read().then(function(t) {
                                            var o = t.value;
                                            t.done ? i.resolve() : (r.Util.extendObj(a, o.styles), n._processItems(o.items, a), e())
                                        }, i.reject)
                                    }()
                            }
                            i.promise.then(function() {
                                a = null, e ? n._renderTimer = setTimeout(function() {
                                    t(n), n._renderTimer = null
                                }, e) : t(n)
                            }, this._capability.reject)
                        },
                        expandTextDivs: function(e) {
                            if (this._enhanceTextSelection && this._renderingDone) {
                                null !== this._bounds && (n(this), this._bounds = null);
                                for (var t = 0, r = this._textDivs.length; t < r; t++) {
                                    var a = this._textDivs[t],
                                        o = this._textDivProperties.get(a);
                                    if (!o.isWhitespace)
                                        if (e) {
                                            var s = "",
                                                l = "";
                                            1 !== o.scale && (s = "scaleX(" + o.scale + ")"), 0 !== o.angle && (s = "rotate(" + o.angle + "deg) " + s), 0 !== o.paddingLeft && (l += " padding-left: " + o.paddingLeft / o.scale + "px;", s += " translateX(" + -o.paddingLeft / o.scale + "px)"), 0 !== o.paddingTop && (l += " padding-top: " + o.paddingTop + "px;", s += " translateY(" + -o.paddingTop + "px)"), 0 !== o.paddingRight && (l += " padding-right: " + o.paddingRight / o.scale + "px;"), 0 !== o.paddingBottom && (l += " padding-bottom: " + o.paddingBottom + "px;"), "" !== l && a.setAttribute("style", o.style + l), "" !== s && i.CustomStyle.setProp("transform", a, s)
                                        } else a.style.padding = 0, i.CustomStyle.setProp("transform", a, o.originalTransform || "")
                                }
                            }
                        }
                    },
                    function(e) {
                        var t = new o({
                            textContent: e.textContent,
                            textContentStream: e.textContentStream,
                            container: e.container,
                            viewport: e.viewport,
                            textDivs: e.textDivs,
                            textContentItemsStr: e.textContentItemsStr,
                            enhanceTextSelection: e.enhanceTextSelection
                        });
                        return t._render(e.timeout), t
                    }
            }();
        t.renderTextLayer = a
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.SVGGraphics = void 0;
        var r = n(0),
            i = n(13),
            a = function() {
                throw new Error("Not implemented: SVGGraphics")
            },
            o = {
                fontStyle: "normal",
                fontWeight: "normal",
                fillColor: "#000000"
            },
            s = function() {
                function e(e, t, n, r) {
                    var i = r,
                        a = t.length;
                    n[i] = a >> 24 & 255, n[i + 1] = a >> 16 & 255, n[i + 2] = a >> 8 & 255, n[i + 3] = 255 & a, n[i += 4] = 255 & e.charCodeAt(0), n[i + 1] = 255 & e.charCodeAt(1), n[i + 2] = 255 & e.charCodeAt(2), n[i + 3] = 255 & e.charCodeAt(3), i += 4, n.set(t, i);
                    var s = function(e, t, n) {
                        for (var r = -1, i = t; i < n; i++) {
                            var a = 255 & (r ^ e[i]);
                            r = r >>> 8 ^ o[a]
                        }
                        return -1 ^ r
                    }(n, r + 4, i += t.length);
                    n[i] = s >> 24 & 255, n[i + 1] = s >> 16 & 255, n[i + 2] = s >> 8 & 255, n[i + 3] = 255 & s
                }

                function t(e) {
                    var t = e.length,
                        n = Math.ceil(t / 65535),
                        r = new Uint8Array(2 + t + 5 * n + 4),
                        i = 0;
                    r[i++] = 120, r[i++] = 156;
                    for (var a = 0; t > 65535;) r[i++] = 0, r[i++] = 255, r[i++] = 255, r[i++] = 0, r[i++] = 0, r.set(e.subarray(a, a + 65535), i), i += 65535, a += 65535, t -= 65535;
                    r[i++] = 1, r[i++] = 255 & t, r[i++] = t >> 8 & 255, r[i++] = 255 & ~t, r[i++] = (65535 & ~t) >> 8 & 255, r.set(e.subarray(a), i), i += e.length - a;
                    var o = function(e, t, n) {
                        for (var r = 1, i = 0, a = t; a < n; ++a) i = (i + (r = (r + (255 & e[a])) % 65521)) % 65521;
                        return i << 16 | r
                    }(e, 0, e.length);
                    return r[i++] = o >> 24 & 255, r[i++] = o >> 16 & 255, r[i++] = o >> 8 & 255, r[i++] = 255 & o, r
                }

                function n(n, o, s) {
                    var l, u, c, h = n.width,
                        d = n.height,
                        f = n.data;
                    switch (o) {
                        case r.ImageKind.GRAYSCALE_1BPP:
                            u = 0, l = 1, c = h + 7 >> 3;
                            break;
                        case r.ImageKind.RGB_24BPP:
                            u = 2, l = 8, c = 3 * h;
                            break;
                        case r.ImageKind.RGBA_32BPP:
                            u = 6, l = 8, c = 4 * h;
                            break;
                        default:
                            throw new Error("invalid format")
                    }
                    var p, v, g = new Uint8Array((1 + c) * d),
                        m = 0,
                        b = 0;
                    for (p = 0; p < d; ++p) g[m++] = 0, g.set(f.subarray(b, b + c), m), b += c, m += c;
                    if (o === r.ImageKind.GRAYSCALE_1BPP)
                        for (m = 0, p = 0; p < d; p++)
                            for (m++, v = 0; v < c; v++) g[m++] ^= 255;
                    var y = new Uint8Array([h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, d >> 24 & 255, d >> 16 & 255, d >> 8 & 255, 255 & d, l, u, 0, 0, 0]),
                        _ = function(e) {
                            if (!(0, r.isNodeJS)()) return t(e);
                            try {
                                var n;
                                n = parseInt(process.versions.node) >= 8 ? e : new Buffer(e);
                                var i = require("zlib").deflateSync(n, {
                                    level: 9
                                });
                                return i instanceof Uint8Array ? i : new Uint8Array(i)
                            } catch (e) {
                                (0, r.warn)("Not compressing PNG because zlib.deflateSync is unavailable: " + e)
                            }
                            return t(e)
                        }(g),
                        w = i.length + 3 * a + y.length + _.length,
                        S = new Uint8Array(w),
                        P = 0;
                    return S.set(i, P), P += i.length, e("IHDR", y, S, P), P += a + y.length, e("IDATA", _, S, P), P += a + _.length, e("IEND", new Uint8Array(0), S, P), (0, r.createObjectURL)(S, "image/png", s)
                }
                for (var i = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), a = 12, o = new Int32Array(256), s = 0; s < 256; s++) {
                    for (var l = s, u = 0; u < 8; u++) l = 1 & l ? 3988292384 ^ l >> 1 & 2147483647 : l >> 1 & 2147483647;
                    o[s] = l
                }
                return function(e, t) {
                    return n(e, void 0 === e.kind ? r.ImageKind.GRAYSCALE_1BPP : e.kind, t)
                }
            }(),
            l = function() {
                function e() {
                    this.fontSizeScale = 1, this.fontWeight = o.fontWeight, this.fontSize = 0, this.textMatrix = r.IDENTITY_MATRIX, this.fontMatrix = r.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRise = 0, this.fillColor = o.fillColor, this.strokeColor = "#000000", this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.lineJoin = "", this.lineCap = "", this.miterLimit = 0, this.dashArray = [], this.dashPhase = 0, this.dependencies = [], this.activeClipUrl = null, this.clipGroup = null, this.maskId = ""
                }
                return e.prototype = {
                    clone: function() {
                        return Object.create(this)
                    },
                    setCurrentPoint: function(e, t) {
                        this.x = e, this.y = t
                    }
                }, e
            }();
        t.SVGGraphics = a = function() {
            function e(e) {
                if (Number.isInteger(e)) return e.toString();
                var t = e.toFixed(10),
                    n = t.length - 1;
                if ("0" !== t[n]) return t;
                do {
                    n--
                } while ("0" === t[n]);
                return t.substr(0, "." === t[n] ? n : n + 1)
            }

            function t(t) {
                if (0 === t[4] && 0 === t[5]) {
                    if (0 === t[1] && 0 === t[2]) return 1 === t[0] && 1 === t[3] ? "" : "scale(" + e(t[0]) + " " + e(t[3]) + ")";
                    if (t[0] === t[3] && t[1] === -t[2]) {
                        return "rotate(" + e(180 * Math.acos(t[0]) / Math.PI) + ")"
                    }
                } else if (1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3]) return "translate(" + e(t[4]) + " " + e(t[5]) + ")";
                return "matrix(" + e(t[0]) + " " + e(t[1]) + " " + e(t[2]) + " " + e(t[3]) + " " + e(t[4]) + " " + e(t[5]) + ")"
            }

            function n(e, t, n) {
                this.svgFactory = new i.DOMSVGFactory, this.current = new l, this.transformMatrix = r.IDENTITY_MATRIX, this.transformStack = [], this.extraStack = [], this.commonObjs = e, this.objs = t, this.pendingClip = null, this.pendingEOFill = !1, this.embedFonts = !1, this.embeddedFonts = Object.create(null), this.cssStyle = null, this.forceDataSchema = !!n
            }
            var a = "http://www.w3.org/1999/xlink",
                u = ["butt", "round", "square"],
                c = ["miter", "round", "bevel"],
                h = 0,
                d = 0;
            return n.prototype = {
                save: function() {
                    this.transformStack.push(this.transformMatrix);
                    var e = this.current;
                    this.extraStack.push(e), this.current = e.clone()
                },
                restore: function() {
                    this.transformMatrix = this.transformStack.pop(), this.current = this.extraStack.pop(), this.pendingClip = null, this.tgrp = null
                },
                group: function(e) {
                    this.save(), this.executeOpTree(e), this.restore()
                },
                loadDependencies: function(e) {
                    for (var t = this, n = e.fnArray, i = n.length, a = e.argsArray, o = 0; o < i; o++)
                        if (r.OPS.dependency === n[o])
                            for (var s = a[o], l = 0, u = s.length; l < u; l++) {
                                var c, h = s[l];
                                c = "g_" === h.substring(0, 2) ? new Promise(function(e) {
                                    t.commonObjs.get(h, e)
                                }) : new Promise(function(e) {
                                    t.objs.get(h, e)
                                }), this.current.dependencies.push(c)
                            }
                        return Promise.all(this.current.dependencies)
                },
                transform: function(e, t, n, i, a, o) {
                    var s = [e, t, n, i, a, o];
                    this.transformMatrix = r.Util.transform(this.transformMatrix, s), this.tgrp = null
                },
                getSVG: function(e, t) {
                    var n = this;
                    this.viewport = t;
                    var i = this._initialize(t);
                    return this.loadDependencies(e).then(function() {
                        n.transformMatrix = r.IDENTITY_MATRIX;
                        var t = n.convertOpList(e);
                        return n.executeOpTree(t), i
                    })
                },
                convertOpList: function(e) {
                    var t = e.argsArray,
                        n = e.fnArray,
                        i = n.length,
                        a = [],
                        o = [];
                    for (var s in r.OPS) a[r.OPS[s]] = s;
                    for (var l = 0; l < i; l++) {
                        var u = n[l];
                        o.push({
                            fnId: u,
                            fn: a[u],
                            args: t[l]
                        })
                    }
                    return function(e) {
                        for (var t = [], n = [], r = e.length, i = 0; i < r; i++) "save" !== e[i].fn ? "restore" === e[i].fn ? t = n.pop() : t.push(e[i]) : (t.push({
                            fnId: 92,
                            fn: "group",
                            items: []
                        }), n.push(t), t = t[t.length - 1].items);
                        return t
                    }(o)
                },
                executeOpTree: function(e) {
                    for (var t = e.length, n = 0; n < t; n++) {
                        var i = e[n].fn,
                            a = e[n].fnId,
                            o = e[n].args;
                        switch (0 | a) {
                            case r.OPS.beginText:
                                this.beginText();
                                break;
                            case r.OPS.setLeading:
                                this.setLeading(o);
                                break;
                            case r.OPS.setLeadingMoveText:
                                this.setLeadingMoveText(o[0], o[1]);
                                break;
                            case r.OPS.setFont:
                                this.setFont(o);
                                break;
                            case r.OPS.showText:
                            case r.OPS.showSpacedText:
                                this.showText(o[0]);
                                break;
                            case r.OPS.endText:
                                this.endText();
                                break;
                            case r.OPS.moveText:
                                this.moveText(o[0], o[1]);
                                break;
                            case r.OPS.setCharSpacing:
                                this.setCharSpacing(o[0]);
                                break;
                            case r.OPS.setWordSpacing:
                                this.setWordSpacing(o[0]);
                                break;
                            case r.OPS.setHScale:
                                this.setHScale(o[0]);
                                break;
                            case r.OPS.setTextMatrix:
                                this.setTextMatrix(o[0], o[1], o[2], o[3], o[4], o[5]);
                                break;
                            case r.OPS.setTextRise:
                                this.setTextRise(o[0]);
                                break;
                            case r.OPS.setLineWidth:
                                this.setLineWidth(o[0]);
                                break;
                            case r.OPS.setLineJoin:
                                this.setLineJoin(o[0]);
                                break;
                            case r.OPS.setLineCap:
                                this.setLineCap(o[0]);
                                break;
                            case r.OPS.setMiterLimit:
                                this.setMiterLimit(o[0]);
                                break;
                            case r.OPS.setFillRGBColor:
                                this.setFillRGBColor(o[0], o[1], o[2]);
                                break;
                            case r.OPS.setStrokeRGBColor:
                                this.setStrokeRGBColor(o[0], o[1], o[2]);
                                break;
                            case r.OPS.setDash:
                                this.setDash(o[0], o[1]);
                                break;
                            case r.OPS.setGState:
                                this.setGState(o[0]);
                                break;
                            case r.OPS.fill:
                                this.fill();
                                break;
                            case r.OPS.eoFill:
                                this.eoFill();
                                break;
                            case r.OPS.stroke:
                                this.stroke();
                                break;
                            case r.OPS.fillStroke:
                                this.fillStroke();
                                break;
                            case r.OPS.eoFillStroke:
                                this.eoFillStroke();
                                break;
                            case r.OPS.clip:
                                this.clip("nonzero");
                                break;
                            case r.OPS.eoClip:
                                this.clip("evenodd");
                                break;
                            case r.OPS.paintSolidColorImageMask:
                                this.paintSolidColorImageMask();
                                break;
                            case r.OPS.paintJpegXObject:
                                this.paintJpegXObject(o[0], o[1], o[2]);
                                break;
                            case r.OPS.paintImageXObject:
                                this.paintImageXObject(o[0]);
                                break;
                            case r.OPS.paintInlineImageXObject:
                                this.paintInlineImageXObject(o[0]);
                                break;
                            case r.OPS.paintImageMaskXObject:
                                this.paintImageMaskXObject(o[0]);
                                break;
                            case r.OPS.paintFormXObjectBegin:
                                this.paintFormXObjectBegin(o[0], o[1]);
                                break;
                            case r.OPS.paintFormXObjectEnd:
                                this.paintFormXObjectEnd();
                                break;
                            case r.OPS.closePath:
                                this.closePath();
                                break;
                            case r.OPS.closeStroke:
                                this.closeStroke();
                                break;
                            case r.OPS.closeFillStroke:
                                this.closeFillStroke();
                                break;
                            case r.OPS.nextLine:
                                this.nextLine();
                                break;
                            case r.OPS.transform:
                                this.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
                                break;
                            case r.OPS.constructPath:
                                this.constructPath(o[0], o[1]);
                                break;
                            case r.OPS.endPath:
                                this.endPath();
                                break;
                            case 92:
                                this.group(e[n].items);
                                break;
                            default:
                                (0, r.warn)("Unimplemented operator " + i)
                        }
                    }
                },
                setWordSpacing: function(e) {
                    this.current.wordSpacing = e
                },
                setCharSpacing: function(e) {
                    this.current.charSpacing = e
                },
                nextLine: function() {
                    this.moveText(0, this.current.leading)
                },
                setTextMatrix: function(t, n, r, i, a, o) {
                    var s = this.current;
                    this.current.textMatrix = this.current.lineMatrix = [t, n, r, i, a, o], this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, s.xcoords = [], s.tspan = this.svgFactory.createElement("svg:tspan"), s.tspan.setAttributeNS(null, "font-family", s.fontFamily), s.tspan.setAttributeNS(null, "font-size", e(s.fontSize) + "px"), s.tspan.setAttributeNS(null, "y", e(-s.y)), s.txtElement = this.svgFactory.createElement("svg:text"), s.txtElement.appendChild(s.tspan)
                },
                beginText: function() {
                    this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, this.current.textMatrix = r.IDENTITY_MATRIX, this.current.lineMatrix = r.IDENTITY_MATRIX, this.current.tspan = this.svgFactory.createElement("svg:tspan"), this.current.txtElement = this.svgFactory.createElement("svg:text"), this.current.txtgrp = this.svgFactory.createElement("svg:g"), this.current.xcoords = []
                },
                moveText: function(t, n) {
                    var r = this.current;
                    this.current.x = this.current.lineX += t, this.current.y = this.current.lineY += n, r.xcoords = [], r.tspan = this.svgFactory.createElement("svg:tspan"), r.tspan.setAttributeNS(null, "font-family", r.fontFamily), r.tspan.setAttributeNS(null, "font-size", e(r.fontSize) + "px"), r.tspan.setAttributeNS(null, "y", e(-r.y))
                },
                showText: function(n) {
                    var i = this.current,
                        a = i.font,
                        s = i.fontSize;
                    if (0 !== s) {
                        var l, u = i.charSpacing,
                            c = i.wordSpacing,
                            h = i.fontDirection,
                            d = i.textHScale * h,
                            f = n.length,
                            p = a.vertical,
                            v = s * i.fontMatrix[0],
                            g = 0;
                        for (l = 0; l < f; ++l) {
                            var m = n[l];
                            if (null !== m)
                                if ((0, r.isNum)(m)) g += -m * s * .001;
                                else {
                                    var b = m.width,
                                        y = m.fontChar,
                                        _ = b * v + ((m.isSpace ? c : 0) + u) * h;
                                    m.isInFont || a.missingFile ? (i.xcoords.push(i.x + g * d), i.tspan.textContent += y, g += _) : g += _
                                } else g += h * c
                        }
                        p ? i.y -= g * d : i.x += g * d, i.tspan.setAttributeNS(null, "x", i.xcoords.map(e).join(" ")), i.tspan.setAttributeNS(null, "y", e(-i.y)), i.tspan.setAttributeNS(null, "font-family", i.fontFamily), i.tspan.setAttributeNS(null, "font-size", e(i.fontSize) + "px"), i.fontStyle !== o.fontStyle && i.tspan.setAttributeNS(null, "font-style", i.fontStyle), i.fontWeight !== o.fontWeight && i.tspan.setAttributeNS(null, "font-weight", i.fontWeight), i.fillColor !== o.fillColor && i.tspan.setAttributeNS(null, "fill", i.fillColor);
                        var w = i.textMatrix;
                        0 !== i.textRise && ((w = w.slice())[5] += i.textRise), i.txtElement.setAttributeNS(null, "transform", t(w) + " scale(1, -1)"), i.txtElement.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), i.txtElement.appendChild(i.tspan), i.txtgrp.appendChild(i.txtElement), this._ensureTransformGroup().appendChild(i.txtElement)
                    }
                },
                setLeadingMoveText: function(e, t) {
                    this.setLeading(-t), this.moveText(e, t)
                },
                addFontStyle: function(e) {
                    this.cssStyle || (this.cssStyle = this.svgFactory.createElement("svg:style"), this.cssStyle.setAttributeNS(null, "type", "text/css"), this.defs.appendChild(this.cssStyle));
                    var t = (0, r.createObjectURL)(e.data, e.mimetype, this.forceDataSchema);
                    this.cssStyle.textContent += '@font-face { font-family: "' + e.loadedName + '"; src: url(' + t + "); }\n"
                },
                setFont: function(t) {
                    var n = this.current,
                        i = this.commonObjs.get(t[0]),
                        a = t[1];
                    this.current.font = i, this.embedFonts && i.data && !this.embeddedFonts[i.loadedName] && (this.addFontStyle(i), this.embeddedFonts[i.loadedName] = i), n.fontMatrix = i.fontMatrix ? i.fontMatrix : r.FONT_IDENTITY_MATRIX;
                    var o = i.black ? i.bold ? "bolder" : "bold" : i.bold ? "bold" : "normal",
                        s = i.italic ? "italic" : "normal";
                    a < 0 ? (a = -a, n.fontDirection = -1) : n.fontDirection = 1, n.fontSize = a, n.fontFamily = i.loadedName, n.fontWeight = o, n.fontStyle = s, n.tspan = this.svgFactory.createElement("svg:tspan"), n.tspan.setAttributeNS(null, "y", e(-n.y)), n.xcoords = []
                },
                endText: function() {},
                setLineWidth: function(e) {
                    this.current.lineWidth = e
                },
                setLineCap: function(e) {
                    this.current.lineCap = u[e]
                },
                setLineJoin: function(e) {
                    this.current.lineJoin = c[e]
                },
                setMiterLimit: function(e) {
                    this.current.miterLimit = e
                },
                setStrokeAlpha: function(e) {
                    this.current.strokeAlpha = e
                },
                setStrokeRGBColor: function(e, t, n) {
                    var i = r.Util.makeCssRgb(e, t, n);
                    this.current.strokeColor = i
                },
                setFillAlpha: function(e) {
                    this.current.fillAlpha = e
                },
                setFillRGBColor: function(e, t, n) {
                    var i = r.Util.makeCssRgb(e, t, n);
                    this.current.fillColor = i, this.current.tspan = this.svgFactory.createElement("svg:tspan"), this.current.xcoords = []
                },
                setDash: function(e, t) {
                    this.current.dashArray = e, this.current.dashPhase = t
                },
                constructPath: function(t, n) {
                    var i = this.current,
                        a = i.x,
                        o = i.y;
                    i.path = this.svgFactory.createElement("svg:path");
                    for (var s = [], l = t.length, u = 0, c = 0; u < l; u++) switch (0 | t[u]) {
                        case r.OPS.rectangle:
                            a = n[c++], o = n[c++];
                            var h = a + n[c++],
                                d = o + n[c++];
                            s.push("M", e(a), e(o), "L", e(h), e(o), "L", e(h), e(d), "L", e(a), e(d), "Z");
                            break;
                        case r.OPS.moveTo:
                            a = n[c++], o = n[c++], s.push("M", e(a), e(o));
                            break;
                        case r.OPS.lineTo:
                            a = n[c++], o = n[c++], s.push("L", e(a), e(o));
                            break;
                        case r.OPS.curveTo:
                            a = n[c + 4], o = n[c + 5], s.push("C", e(n[c]), e(n[c + 1]), e(n[c + 2]), e(n[c + 3]), e(a), e(o)), c += 6;
                            break;
                        case r.OPS.curveTo2:
                            a = n[c + 2], o = n[c + 3], s.push("C", e(a), e(o), e(n[c]), e(n[c + 1]), e(n[c + 2]), e(n[c + 3])), c += 4;
                            break;
                        case r.OPS.curveTo3:
                            a = n[c + 2], o = n[c + 3], s.push("C", e(n[c]), e(n[c + 1]), e(a), e(o), e(a), e(o)), c += 4;
                            break;
                        case r.OPS.closePath:
                            s.push("Z")
                    }
                    i.path.setAttributeNS(null, "d", s.join(" ")), i.path.setAttributeNS(null, "fill", "none"), this._ensureTransformGroup().appendChild(i.path), i.element = i.path, i.setCurrentPoint(a, o)
                },
                endPath: function() {
                    if (this.pendingClip) {
                        var e = this.current,
                            n = "clippath" + h;
                        h++;
                        var r = this.svgFactory.createElement("svg:clipPath");
                        r.setAttributeNS(null, "id", n), r.setAttributeNS(null, "transform", t(this.transformMatrix));
                        var i = e.element.cloneNode();
                        "evenodd" === this.pendingClip ? i.setAttributeNS(null, "clip-rule", "evenodd") : i.setAttributeNS(null, "clip-rule", "nonzero"), this.pendingClip = null, r.appendChild(i), this.defs.appendChild(r), e.activeClipUrl && (e.clipGroup = null, this.extraStack.forEach(function(e) {
                            e.clipGroup = null
                        })), e.activeClipUrl = "url(#" + n + ")", this.tgrp = null
                    }
                },
                clip: function(e) {
                    this.pendingClip = e
                },
                closePath: function() {
                    var e = this.current,
                        t = e.path.getAttributeNS(null, "d");
                    t += "Z", e.path.setAttributeNS(null, "d", t)
                },
                setLeading: function(e) {
                    this.current.leading = -e
                },
                setTextRise: function(e) {
                    this.current.textRise = e
                },
                setHScale: function(e) {
                    this.current.textHScale = e / 100
                },
                setGState: function(e) {
                    for (var t = 0, n = e.length; t < n; t++) {
                        var i = e[t],
                            a = i[0],
                            o = i[1];
                        switch (a) {
                            case "LW":
                                this.setLineWidth(o);
                                break;
                            case "LC":
                                this.setLineCap(o);
                                break;
                            case "LJ":
                                this.setLineJoin(o);
                                break;
                            case "ML":
                                this.setMiterLimit(o);
                                break;
                            case "D":
                                this.setDash(o[0], o[1]);
                                break;
                            case "Font":
                                this.setFont(o);
                                break;
                            case "CA":
                                this.setStrokeAlpha(o);
                                break;
                            case "ca":
                                this.setFillAlpha(o);
                                break;
                            default:
                                (0, r.warn)("Unimplemented graphic state " + a)
                        }
                    }
                },
                fill: function() {
                    var e = this.current;
                    e.element.setAttributeNS(null, "fill", e.fillColor), e.element.setAttributeNS(null, "fill-opacity", e.fillAlpha)
                },
                stroke: function() {
                    var t = this.current;
                    t.element.setAttributeNS(null, "stroke", t.strokeColor), t.element.setAttributeNS(null, "stroke-opacity", t.strokeAlpha), t.element.setAttributeNS(null, "stroke-miterlimit", e(t.miterLimit)), t.element.setAttributeNS(null, "stroke-linecap", t.lineCap), t.element.setAttributeNS(null, "stroke-linejoin", t.lineJoin), t.element.setAttributeNS(null, "stroke-width", e(t.lineWidth) + "px"), t.element.setAttributeNS(null, "stroke-dasharray", t.dashArray.map(e).join(" ")), t.element.setAttributeNS(null, "stroke-dashoffset", e(t.dashPhase) + "px"), t.element.setAttributeNS(null, "fill", "none")
                },
                eoFill: function() {
                    this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fill()
                },
                fillStroke: function() {
                    this.stroke(), this.fill()
                },
                eoFillStroke: function() {
                    this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fillStroke()
                },
                closeStroke: function() {
                    this.closePath(), this.stroke()
                },
                closeFillStroke: function() {
                    this.closePath(), this.fillStroke()
                },
                paintSolidColorImageMask: function() {
                    var e = this.current,
                        t = this.svgFactory.createElement("svg:rect");
                    t.setAttributeNS(null, "x", "0"), t.setAttributeNS(null, "y", "0"), t.setAttributeNS(null, "width", "1px"), t.setAttributeNS(null, "height", "1px"), t.setAttributeNS(null, "fill", e.fillColor), this._ensureTransformGroup().appendChild(t)
                },
                paintJpegXObject: function(t, n, r) {
                    var i = this.objs.get(t),
                        o = this.svgFactory.createElement("svg:image");
                    o.setAttributeNS(a, "xlink:href", i.src), o.setAttributeNS(null, "width", e(n)), o.setAttributeNS(null, "height", e(r)), o.setAttributeNS(null, "x", "0"), o.setAttributeNS(null, "y", e(-r)), o.setAttributeNS(null, "transform", "scale(" + e(1 / n) + " " + e(-1 / r) + ")"), this._ensureTransformGroup().appendChild(o)
                },
                paintImageXObject: function(e) {
                    var t = this.objs.get(e);
                    t ? this.paintInlineImageXObject(t) : (0, r.warn)("Dependent image isn't ready yet")
                },
                paintInlineImageXObject: function(t, n) {
                    var r = t.width,
                        i = t.height,
                        o = s(t, this.forceDataSchema),
                        l = this.svgFactory.createElement("svg:rect");
                    l.setAttributeNS(null, "x", "0"), l.setAttributeNS(null, "y", "0"), l.setAttributeNS(null, "width", e(r)), l.setAttributeNS(null, "height", e(i)), this.current.element = l, this.clip("nonzero");
                    var u = this.svgFactory.createElement("svg:image");
                    u.setAttributeNS(a, "xlink:href", o), u.setAttributeNS(null, "x", "0"), u.setAttributeNS(null, "y", e(-i)), u.setAttributeNS(null, "width", e(r) + "px"), u.setAttributeNS(null, "height", e(i) + "px"), u.setAttributeNS(null, "transform", "scale(" + e(1 / r) + " " + e(-1 / i) + ")"), n ? n.appendChild(u) : this._ensureTransformGroup().appendChild(u)
                },
                paintImageMaskXObject: function(t) {
                    var n = this.current,
                        r = t.width,
                        i = t.height,
                        a = n.fillColor;
                    n.maskId = "mask" + d++;
                    var o = this.svgFactory.createElement("svg:mask");
                    o.setAttributeNS(null, "id", n.maskId);
                    var s = this.svgFactory.createElement("svg:rect");
                    s.setAttributeNS(null, "x", "0"), s.setAttributeNS(null, "y", "0"), s.setAttributeNS(null, "width", e(r)), s.setAttributeNS(null, "height", e(i)), s.setAttributeNS(null, "fill", a), s.setAttributeNS(null, "mask", "url(#" + n.maskId + ")"), this.defs.appendChild(o), this._ensureTransformGroup().appendChild(s), this.paintInlineImageXObject(t, o)
                },
                paintFormXObjectBegin: function(t, n) {
                    if (Array.isArray(t) && 6 === t.length && this.transform(t[0], t[1], t[2], t[3], t[4], t[5]), Array.isArray(n) && 4 === n.length) {
                        var r = n[2] - n[0],
                            i = n[3] - n[1],
                            a = this.svgFactory.createElement("svg:rect");
                        a.setAttributeNS(null, "x", n[0]), a.setAttributeNS(null, "y", n[1]), a.setAttributeNS(null, "width", e(r)), a.setAttributeNS(null, "height", e(i)), this.current.element = a, this.clip("nonzero"), this.endPath()
                    }
                },
                paintFormXObjectEnd: function() {},
                _initialize: function(e) {
                    var n = this.svgFactory.create(e.width, e.height),
                        r = this.svgFactory.createElement("svg:defs");
                    n.appendChild(r), this.defs = r;
                    var i = this.svgFactory.createElement("svg:g");
                    return i.setAttributeNS(null, "transform", t(e.transform)), n.appendChild(i), this.svg = i, n
                },
                _ensureClipGroup: function() {
                    if (!this.current.clipGroup) {
                        var e = this.svgFactory.createElement("svg:g");
                        e.setAttributeNS(null, "clip-path", this.current.activeClipUrl), this.svg.appendChild(e), this.current.clipGroup = e
                    }
                    return this.current.clipGroup
                },
                _ensureTransformGroup: function() {
                    return this.tgrp || (this.tgrp = this.svgFactory.createElement("svg:g"), this.tgrp.setAttributeNS(null, "transform", t(this.transformMatrix)), this.current.activeClipUrl ? this._ensureClipGroup().appendChild(this.tgrp) : this.svg.appendChild(this.tgrp)), this.tgrp
                }
            }, n
        }(), t.SVGGraphics = a
    }, function(e, t, n) {
        "use strict";
        var r = n(0),
            i = n(117),
            a = n(69),
            o = n(73),
            s = n(72),
            l = n(13),
            u = n(74);
        if (r.isNodeJS()) {
            var c = n(122).PDFNodeStream;
            a.setPDFNetworkStreamClass(c)
        } else if ("undefined" != typeof Response && "body" in Response.prototype && "undefined" != typeof ReadableStream) {
            var h = n(123).PDFFetchStream;
            a.setPDFNetworkStreamClass(h)
        } else {
            var d = n(124).PDFNetworkStream;
            a.setPDFNetworkStreamClass(d)
        }
        t.PDFJS = i.PDFJS, t.build = a.build, t.version = a.version, t.getDocument = a.getDocument, t.LoopbackPort = a.LoopbackPort, t.PDFDataRangeTransport = a.PDFDataRangeTransport, t.PDFWorker = a.PDFWorker, t.renderTextLayer = o.renderTextLayer, t.AnnotationLayer = s.AnnotationLayer, t.CustomStyle = l.CustomStyle, t.createPromiseCapability = r.createPromiseCapability, t.PasswordResponses = r.PasswordResponses, t.InvalidPDFException = r.InvalidPDFException, t.MissingPDFException = r.MissingPDFException, t.SVGGraphics = u.SVGGraphics, t.NativeImageDecoding = r.NativeImageDecoding, t.UnexpectedResponseException = r.UnexpectedResponseException, t.OPS = r.OPS, t.UNSUPPORTED_FEATURES = r.UNSUPPORTED_FEATURES, t.isValidUrl = l.isValidUrl, t.createValidAbsoluteUrl = r.createValidAbsoluteUrl, t.createObjectURL = r.createObjectURL, t.removeNullCharacters = r.removeNullCharacters, t.shadow = r.shadow, t.createBlob = r.createBlob, t.RenderingCancelledException = l.RenderingCancelledException, t.getFilenameFromUrl = l.getFilenameFromUrl, t.addLinkAttributes = l.addLinkAttributes, t.StatTimer = r.StatTimer
    }, function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        if ("undefined" == typeof PDFJS || !PDFJS.compatibilityChecked) {
            var i = n(20),
                a = "undefined" != typeof navigator && navigator.userAgent || "",
                o = /Android/.test(a),
                s = /Android\s[0-2][^\d]/.test(a),
                l = /Android\s[0-4][^\d]/.test(a),
                u = a.indexOf("Chrom") >= 0,
                c = /Chrome\/(39|40)\./.test(a),
                h = a.indexOf("CriOS") >= 0,
                d = a.indexOf("Trident") >= 0,
                f = /\b(iPad|iPhone|iPod)(?=;)/.test(a),
                p = a.indexOf("Opera") >= 0,
                v = /Safari\//.test(a) && !/(Chrome\/|Android\s)/.test(a),
                g = "object" === ("undefined" == typeof window ? "undefined" : r(window)) && "object" === ("undefined" == typeof document ? "undefined" : r(document));
            "undefined" == typeof PDFJS && (i.PDFJS = {}), PDFJS.compatibilityChecked = !0,
                function() {
                    function e(e, t) {
                        return new s(this.slice(e, t))
                    }

                    function t(e, t) {
                        arguments.length < 2 && (t = 0);
                        for (var n = 0, r = e.length; n < r; ++n, ++t) this[t] = 255 & e[n]
                    }

                    function a(e, t) {
                        this.buffer = e, this.byteLength = e.length, this.length = t,
                            function(e) {
                                for (; l < e;) Object.defineProperty(a.prototype, l, o(l)), l++
                            }(this.length)
                    }

                    function o(e) {
                        return {
                            get: function() {
                                var t = this.buffer,
                                    n = e << 2;
                                return (t[n] | t[n + 1] << 8 | t[n + 2] << 16 | t[n + 3] << 24) >>> 0
                            },
                            set: function(t) {
                                var n = this.buffer,
                                    r = e << 2;
                                n[r] = 255 & t, n[r + 1] = t >> 8 & 255, n[r + 2] = t >> 16 & 255, n[r + 3] = t >>> 24 & 255
                            }
                        }
                    }

                    function s(n) {
                        var i, a, o;
                        if ("number" == typeof n)
                            for (i = [], a = 0; a < n; ++a) i[a] = 0;
                        else if ("slice" in n) i = n.slice(0);
                        else
                            for (i = [], a = 0, o = n.length; a < o; ++a) i[a] = n[a];
                        return i.subarray = e, i.buffer = i, i.byteLength = i.length, i.set = t, "object" === (void 0 === n ? "undefined" : r(n)) && n.buffer && (i.buffer = n.buffer), i
                    }
                    if ("undefined" == typeof Uint8ClampedArray && (i.Uint8ClampedArray = n(77)), "undefined" != typeof Uint8Array) return void 0 === Uint8Array.prototype.subarray && (Uint8Array.prototype.subarray = function(e, t) {
                        return new Uint8Array(this.slice(e, t))
                    }, Float32Array.prototype.subarray = function(e, t) {
                        return new Float32Array(this.slice(e, t))
                    }), void("undefined" == typeof Float64Array && (i.Float64Array = Float32Array));
                    a.prototype = Object.create(null);
                    var l = 0;
                    i.Uint8Array = s, i.Int8Array = s, i.Int32Array = s, i.Uint16Array = s, i.Float32Array = s, i.Float64Array = s, i.Uint32Array = function() {
                        if (3 === arguments.length) {
                            if (0 !== arguments[1]) throw new Error("offset !== 0 is not supported");
                            return new a(arguments[0], arguments[2])
                        }
                        return s.apply(this, arguments)
                    }
                }(),
                function() {
                    if (g && window.CanvasPixelArray) {
                        var e = window.CanvasPixelArray.prototype;
                        "buffer" in e || (Object.defineProperty(e, "buffer", {
                            get: function() {
                                return this
                            },
                            enumerable: !1,
                            configurable: !0
                        }), Object.defineProperty(e, "byteLength", {
                            get: function() {
                                return this.length
                            },
                            enumerable: !1,
                            configurable: !0
                        }))
                    }
                }(), i.URL || (i.URL = i.webkitURL),
                function() {
                    if (void 0 !== Object.defineProperty) {
                        var e = !0;
                        try {
                            g && Object.defineProperty(new Image, "id", {
                                value: "test"
                            });
                            var t = function() {};
                            t.prototype = {get id() {}
                            }, Object.defineProperty(new t, "id", {
                                value: "",
                                configurable: !0,
                                enumerable: !0,
                                writable: !1
                            })
                        } catch (t) {
                            e = !1
                        }
                        if (e) return
                    }
                    Object.defineProperty = function(e, t, n) {
                        delete e[t], "get" in n && e.__defineGetter__(t, n.get), "set" in n && e.__defineSetter__(t, n.set), "value" in n && (e.__defineSetter__(t, function(e) {
                            return this.__defineGetter__(t, function() {
                                return e
                            }), e
                        }), e[t] = n.value)
                    }
                }(),
                function() {
                    if ("undefined" != typeof XMLHttpRequest) {
                        var e = XMLHttpRequest.prototype,
                            t = new XMLHttpRequest;
                        "overrideMimeType" in t || Object.defineProperty(e, "overrideMimeType", {
                            value: function(e) {}
                        }), "responseType" in t || (Object.defineProperty(e, "responseType", {
                            get: function() {
                                return this._responseType || "text"
                            },
                            set: function(e) {
                                "text" !== e && "arraybuffer" !== e || (this._responseType = e, "arraybuffer" === e && "function" == typeof this.overrideMimeType && this.overrideMimeType("text/plain; charset=x-user-defined"))
                            }
                        }), "undefined" == typeof VBArray ? Object.defineProperty(e, "response", {
                            get: function() {
                                if ("arraybuffer" !== this.responseType) return this.responseText;
                                var e, t = this.responseText,
                                    n = t.length,
                                    r = new Uint8Array(n);
                                for (e = 0; e < n; ++e) r[e] = 255 & t.charCodeAt(e);
                                return r.buffer
                            }
                        }) : Object.defineProperty(e, "response", {
                            get: function() {
                                return "arraybuffer" === this.responseType ? new Uint8Array(new VBArray(this.responseBody).toArray()) : this.responseText
                            }
                        }))
                    }
                }(),
                function() {
                    if (!("btoa" in i)) {
                        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                        i.btoa = function(t) {
                            var n, r, i = "";
                            for (n = 0, r = t.length; n < r; n += 3) {
                                var a = 255 & t.charCodeAt(n),
                                    o = 255 & t.charCodeAt(n + 1),
                                    s = 255 & t.charCodeAt(n + 2),
                                    l = (3 & a) << 4 | o >> 4,
                                    u = n + 1 < r ? (15 & o) << 2 | s >> 6 : 64,
                                    c = n + 2 < r ? 63 & s : 64;
                                i += e.charAt(a >> 2) + e.charAt(l) + e.charAt(u) + e.charAt(c)
                            }
                            return i
                        }
                    }
                }(),
                function() {
                    if (!("atob" in i)) {
                        i.atob = function(e) {
                            if ((e = e.replace(/=+$/, "")).length % 4 == 1) throw new Error("bad atob input");
                            for (var t, n, r = 0, i = 0, a = ""; n = e.charAt(i++); ~n && (t = r % 4 ? 64 * t + n : n, r++ % 4) ? a += String.fromCharCode(255 & t >> (-2 * r & 6)) : 0) n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);
                            return a
                        }
                    }
                }(), void 0 === Function.prototype.bind && (Function.prototype.bind = function(e) {
                    var t = this,
                        n = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        var r = n.concat(Array.prototype.slice.call(arguments));
                        return t.apply(e, r)
                    }
                }),
                function() {
                    if (g) {
                        "dataset" in document.createElement("div") || Object.defineProperty(HTMLElement.prototype, "dataset", {
                            get: function() {
                                if (this._dataset) return this._dataset;
                                for (var e = {}, t = 0, n = this.attributes.length; t < n; t++) {
                                    var r = this.attributes[t];
                                    if ("data-" === r.name.substring(0, 5)) {
                                        e[r.name.substring(5).replace(/\-([a-z])/g, function(e, t) {
                                            return t.toUpperCase()
                                        })] = r.value
                                    }
                                }
                                return Object.defineProperty(this, "_dataset", {
                                    value: e,
                                    writable: !1,
                                    enumerable: !1
                                }), e
                            },
                            enumerable: !0
                        })
                    }
                }(),
                function() {
                    function e(e, t, n, r) {
                        var i = (e.className || "").split(/\s+/g);
                        "" === i[0] && i.shift();
                        var a = i.indexOf(t);
                        return a < 0 && n && i.push(t), a >= 0 && r && i.splice(a, 1), e.className = i.join(" "), a >= 0
                    }
                    if (g) {
                        if (!("classList" in document.createElement("div"))) {
                            var t = {
                                add: function(t) {
                                    e(this.element, t, !0, !1)
                                },
                                contains: function(t) {
                                    return e(this.element, t, !1, !1)
                                },
                                remove: function(t) {
                                    e(this.element, t, !1, !0)
                                },
                                toggle: function(t) {
                                    e(this.element, t, !0, !0)
                                }
                            };
                            Object.defineProperty(HTMLElement.prototype, "classList", {
                                get: function() {
                                    if (this._classList) return this._classList;
                                    var e = Object.create(t, {
                                        element: {
                                            value: this,
                                            writable: !1,
                                            enumerable: !0
                                        }
                                    });
                                    return Object.defineProperty(this, "_classList", {
                                        value: e,
                                        writable: !1,
                                        enumerable: !1
                                    }), e
                                },
                                enumerable: !0
                            })
                        }
                    }
                }(),
                function() {
                    if (!("undefined" == typeof importScripts || "console" in i)) {
                        var e = {},
                            t = {
                                log: function() {
                                    var e = Array.prototype.slice.call(arguments);
                                    i.postMessage({
                                        targetName: "main",
                                        action: "console_log",
                                        data: e
                                    })
                                },
                                error: function() {
                                    var e = Array.prototype.slice.call(arguments);
                                    i.postMessage({
                                        targetName: "main",
                                        action: "console_error",
                                        data: e
                                    })
                                },
                                time: function(t) {
                                    e[t] = Date.now()
                                },
                                timeEnd: function(t) {
                                    var n = e[t];
                                    if (!n) throw new Error("Unknown timer name " + t);
                                    this.log("Timer:", t, Date.now() - n)
                                }
                            };
                        i.console = t
                    }
                }(),
                function() {
                    if (g) {
                        if ("console" in window) return "bind" in console.log ? void 0 : (console.log = function(e) {
                            return function(t) {
                                return e(t)
                            }
                        }(console.log), console.error = function(e) {
                            return function(t) {
                                return e(t)
                            }
                        }(console.error), void(console.warn = function(e) {
                            return function(t) {
                                return e(t)
                            }
                        }(console.warn)));
                        window.console = {
                            log: function() {},
                            error: function() {},
                            warn: function() {}
                        }
                    }
                }(),
                function() {
                    function e(e) {
                        t(e.target) && e.stopPropagation()
                    }

                    function t(e) {
                        return e.disabled || e.parentNode && t(e.parentNode)
                    }
                    p && document.addEventListener("click", e, !0)
                }(), (d || h) && (PDFJS.disableCreateObjectURL = !0), "undefined" != typeof navigator && ("language" in navigator || (PDFJS.locale = navigator.userLanguage || "en-US")), (v || s || c || f) && (PDFJS.disableRange = !0, PDFJS.disableStream = !0), g && (history.pushState && !s || (PDFJS.disableHistory = !0)),
                function() {
                    if (g)
                        if (window.CanvasPixelArray) "function" != typeof window.CanvasPixelArray.prototype.set && (window.CanvasPixelArray.prototype.set = function(e) {
                            for (var t = 0, n = this.length; t < n; t++) this[t] = e[t]
                        });
                        else {
                            var e, t = !1;
                            if (u ? t = (e = a.match(/Chrom(e|ium)\/([0-9]+)\./)) && parseInt(e[2]) < 21 : o ? t = l : v && (t = (e = a.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//)) && parseInt(e[1]) < 6), t) {
                                var n = window.CanvasRenderingContext2D.prototype,
                                    r = n.createImageData;
                                n.createImageData = function(e, t) {
                                    var n = r.call(this, e, t);
                                    return n.data.set = function(e) {
                                        for (var t = 0, n = this.length; t < n; t++) this[t] = e[t]
                                    }, n
                                }, n = null
                            }
                        }
                }(),
                function() {
                    function e() {
                        window.requestAnimationFrame = function(e) {
                            return window.setTimeout(e, 20)
                        }, window.cancelAnimationFrame = function(e) {
                            window.clearTimeout(e)
                        }
                    }
                    g && (f ? e() : "requestAnimationFrame" in window || (window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame, window.requestAnimationFrame || e()))
                }(), (f || o) && (PDFJS.maxCanvasPixels = 5242880), g && d && window.parent !== window && (PDFJS.disableFullscreen = !0), g && ("currentScript" in document || Object.defineProperty(document, "currentScript", {
                    get: function() {
                        var e = document.getElementsByTagName("script");
                        return e[e.length - 1]
                    },
                    enumerable: !0,
                    configurable: !0
                })),
                function() {
                    if (g) {
                        var e = document.createElement("input");
                        try {
                            e.type = "number"
                        } catch (r) {
                            var t = e.constructor.prototype,
                                n = Object.getOwnPropertyDescriptor(t, "type");
                            Object.defineProperty(t, "type", {
                                get: function() {
                                    return n.get.call(this)
                                },
                                set: function(e) {
                                    n.set.call(this, "number" === e ? "text" : e)
                                },
                                enumerable: !0,
                                configurable: !0
                            })
                        }
                    }
                }(),
                function() {
                    if (g && document.attachEvent) {
                        var e = document.constructor.prototype,
                            t = Object.getOwnPropertyDescriptor(e, "readyState");
                        Object.defineProperty(e, "readyState", {
                            get: function() {
                                var e = t.get.call(this);
                                return "interactive" === e ? "loading" : e
                            },
                            set: function(e) {
                                t.set.call(this, e)
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    }
                }(), g && void 0 === Element.prototype.remove && (Element.prototype.remove = function() {
                    this.parentNode && this.parentNode.removeChild(this)
                }), Number.isNaN || (Number.isNaN = n(89)), Number.isInteger || (Number.isInteger = n(91)), i.Promise || (i.Promise = n(94)), i.WeakMap || (i.WeakMap = n(103)),
                function() {
                    function e(e) {
                        return void 0 !== d[e]
                    }

                    function t() {
                        l.call(this), this._isInvalid = !0
                    }

                    function n(e) {
                        return "" === e && t.call(this), e.toLowerCase()
                    }

                    function a(e) {
                        var t = e.charCodeAt(0);
                        return t > 32 && t < 127 && -1 === [34, 35, 60, 62, 63, 96].indexOf(t) ? e : encodeURIComponent(e)
                    }

                    function o(e) {
                        var t = e.charCodeAt(0);
                        return t > 32 && t < 127 && -1 === [34, 35, 60, 62, 96].indexOf(t) ? e : encodeURIComponent(e)
                    }

                    function s(r, i, s) {
                        function l(e) {
                            y.push(e)
                        }
                        var u = i || "scheme start",
                            c = 0,
                            h = "",
                            m = !1,
                            b = !1,
                            y = [];
                        e: for (;
                            (r[c - 1] !== p || 0 === c) && !this._isInvalid;) {
                            var _ = r[c];
                            switch (u) {
                                case "scheme start":
                                    if (!_ || !v.test(_)) {
                                        if (i) {
                                            l("Invalid scheme.");
                                            break e
                                        }
                                        h = "", u = "no scheme";
                                        continue
                                    }
                                    h += _.toLowerCase(), u = "scheme";
                                    break;
                                case "scheme":
                                    if (_ && g.test(_)) h += _.toLowerCase();
                                    else {
                                        if (":" !== _) {
                                            if (i) {
                                                if (_ === p) break e;
                                                l("Code point not allowed in scheme: " + _);
                                                break e
                                            }
                                            h = "", c = 0, u = "no scheme";
                                            continue
                                        }
                                        if (this._scheme = h, h = "", i) break e;
                                        e(this._scheme) && (this._isRelative = !0), u = "file" === this._scheme ? "relative" : this._isRelative && s && s._scheme === this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data"
                                    }
                                    break;
                                case "scheme data":
                                    "?" === _ ? (this._query = "?", u = "query") : "#" === _ ? (this._fragment = "#", u = "fragment") : _ !== p && "\t" !== _ && "\n" !== _ && "\r" !== _ && (this._schemeData += a(_));
                                    break;
                                case "no scheme":
                                    if (s && e(s._scheme)) {
                                        u = "relative";
                                        continue
                                    }
                                    l("Missing scheme."), t.call(this);
                                    break;
                                case "relative or authority":
                                    if ("/" !== _ || "/" !== r[c + 1]) {
                                        l("Expected /, got: " + _), u = "relative";
                                        continue
                                    }
                                    u = "authority ignore slashes";
                                    break;
                                case "relative":
                                    if (this._isRelative = !0, "file" !== this._scheme && (this._scheme = s._scheme), _ === p) {
                                        this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._username = s._username, this._password = s._password;
                                        break e
                                    }
                                    if ("/" === _ || "\\" === _) "\\" === _ && l("\\ is an invalid code point."), u = "relative slash";
                                    else if ("?" === _) this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = "?", this._username = s._username, this._password = s._password, u = "query";
                                    else {
                                        if ("#" !== _) {
                                            var w = r[c + 1],
                                                S = r[c + 2];
                                            ("file" !== this._scheme || !v.test(_) || ":" !== w && "|" !== w || S !== p && "/" !== S && "\\" !== S && "?" !== S && "#" !== S) && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password, this._path = s._path.slice(), this._path.pop()), u = "relative path";
                                            continue
                                        }
                                        this._host = s._host, this._port = s._port, this._path = s._path.slice(), this._query = s._query, this._fragment = "#", this._username = s._username, this._password = s._password, u = "fragment"
                                    }
                                    break;
                                case "relative slash":
                                    if ("/" !== _ && "\\" !== _) {
                                        "file" !== this._scheme && (this._host = s._host, this._port = s._port, this._username = s._username, this._password = s._password), u = "relative path";
                                        continue
                                    }
                                    "\\" === _ && l("\\ is an invalid code point."), u = "file" === this._scheme ? "file host" : "authority ignore slashes";
                                    break;
                                case "authority first slash":
                                    if ("/" !== _) {
                                        l("Expected '/', got: " + _), u = "authority ignore slashes";
                                        continue
                                    }
                                    u = "authority second slash";
                                    break;
                                case "authority second slash":
                                    if (u = "authority ignore slashes", "/" !== _) {
                                        l("Expected '/', got: " + _);
                                        continue
                                    }
                                    break;
                                case "authority ignore slashes":
                                    if ("/" !== _ && "\\" !== _) {
                                        u = "authority";
                                        continue
                                    }
                                    l("Expected authority, got: " + _);
                                    break;
                                case "authority":
                                    if ("@" === _) {
                                        m && (l("@ already seen."), h += "%40"), m = !0;
                                        for (var P = 0; P < h.length; P++) {
                                            var A = h[P];
                                            if ("\t" !== A && "\n" !== A && "\r" !== A)
                                                if (":" !== A || null !== this._password) {
                                                    var C = a(A);
                                                    null !== this._password ? this._password += C : this._username += C
                                                } else this._password = "";
                                            else l("Invalid whitespace in authority.")
                                        }
                                        h = ""
                                    } else {
                                        if (_ === p || "/" === _ || "\\" === _ || "?" === _ || "#" === _) {
                                            c -= h.length, h = "", u = "host";
                                            continue
                                        }
                                        h += _
                                    }
                                    break;
                                case "file host":
                                    if (_ === p || "/" === _ || "\\" === _ || "?" === _ || "#" === _) {
                                        2 !== h.length || !v.test(h[0]) || ":" !== h[1] && "|" !== h[1] ? 0 === h.length ? u = "relative path start" : (this._host = n.call(this, h), h = "", u = "relative path start") : u = "relative path";
                                        continue
                                    }
                                    "\t" === _ || "\n" === _ || "\r" === _ ? l("Invalid whitespace in file host.") : h += _;
                                    break;
                                case "host":
                                case "hostname":
                                    if (":" !== _ || b) {
                                        if (_ === p || "/" === _ || "\\" === _ || "?" === _ || "#" === _) {
                                            if (this._host = n.call(this, h), h = "", u = "relative path start", i) break e;
                                            continue
                                        }
                                        "\t" !== _ && "\n" !== _ && "\r" !== _ ? ("[" === _ ? b = !0 : "]" === _ && (b = !1), h += _) : l("Invalid code point in host/hostname: " + _)
                                    } else if (this._host = n.call(this, h), h = "", u = "port", "hostname" === i) break e;
                                    break;
                                case "port":
                                    if (/[0-9]/.test(_)) h += _;
                                    else {
                                        if (_ === p || "/" === _ || "\\" === _ || "?" === _ || "#" === _ || i) {
                                            if ("" !== h) {
                                                var k = parseInt(h, 10);
                                                k !== d[this._scheme] && (this._port = k + ""), h = ""
                                            }
                                            if (i) break e;
                                            u = "relative path start";
                                            continue
                                        }
                                        "\t" === _ || "\n" === _ || "\r" === _ ? l("Invalid code point in port: " + _) : t.call(this)
                                    }
                                    break;
                                case "relative path start":
                                    if ("\\" === _ && l("'\\' not allowed in path."), u = "relative path", "/" !== _ && "\\" !== _) continue;
                                    break;
                                case "relative path":
                                    if (_ !== p && "/" !== _ && "\\" !== _ && (i || "?" !== _ && "#" !== _)) "\t" !== _ && "\n" !== _ && "\r" !== _ && (h += a(_));
                                    else {
                                        "\\" === _ && l("\\ not allowed in relative path.");
                                        var T;
                                        (T = f[h.toLowerCase()]) && (h = T), ".." === h ? (this._path.pop(), "/" !== _ && "\\" !== _ && this._path.push("")) : "." === h && "/" !== _ && "\\" !== _ ? this._path.push("") : "." !== h && ("file" === this._scheme && 0 === this._path.length && 2 === h.length && v.test(h[0]) && "|" === h[1] && (h = h[0] + ":"), this._path.push(h)), h = "", "?" === _ ? (this._query = "?", u = "query") : "#" === _ && (this._fragment = "#", u = "fragment")
                                    }
                                    break;
                                case "query":
                                    i || "#" !== _ ? _ !== p && "\t" !== _ && "\n" !== _ && "\r" !== _ && (this._query += o(_)) : (this._fragment = "#", u = "fragment");
                                    break;
                                case "fragment":
                                    _ !== p && "\t" !== _ && "\n" !== _ && "\r" !== _ && (this._fragment += _)
                            }
                            c++
                        }
                    }

                    function l() {
                        this._scheme = "", this._schemeData = "", this._username = "", this._password = null, this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", this._isInvalid = !1, this._isRelative = !1
                    }

                    function u(e, t) {
                        void 0 === t || t instanceof u || (t = new u(String(t))), this._url = e, l.call(this);
                        var n = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
                        s.call(this, n, null, t)
                    }
                    var c = !1;
                    try {
                        if ("function" == typeof URL && "object" === r(URL.prototype) && "origin" in URL.prototype) {
                            var h = new URL("b", "http://a");
                            h.pathname = "c%20d", c = "http://a/c%20d" === h.href
                        }
                    } catch (e) {}
                    if (!c) {
                        var d = Object.create(null);
                        d.ftp = 21, d.file = 0, d.gopher = 70, d.http = 80, d.https = 443, d.ws = 80, d.wss = 443;
                        var f = Object.create(null);
                        f["%2e"] = ".", f[".%2e"] = "..", f["%2e."] = "..", f["%2e%2e"] = "..";
                        var p, v = /[a-zA-Z]/,
                            g = /[a-zA-Z0-9\+\-\.]/;
                        u.prototype = {
                            toString: function() {
                                return this.href
                            },
                            get href() {
                                if (this._isInvalid) return this._url;
                                var e = "";
                                return "" === this._username && null === this._password || (e = this._username + (null !== this._password ? ":" + this._password : "") + "@"), this.protocol + (this._isRelative ? "//" + e + this.host : "") + this.pathname + this._query + this._fragment
                            },
                            set href(e) {
                                l.call(this), s.call(this, e)
                            },
                            get protocol() {
                                return this._scheme + ":"
                            },
                            set protocol(e) {
                                this._isInvalid || s.call(this, e + ":", "scheme start")
                            },
                            get host() {
                                return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host
                            },
                            set host(e) {
                                !this._isInvalid && this._isRelative && s.call(this, e, "host")
                            },
                            get hostname() {
                                return this._host
                            },
                            set hostname(e) {
                                !this._isInvalid && this._isRelative && s.call(this, e, "hostname")
                            },
                            get port() {
                                return this._port
                            },
                            set port(e) {
                                !this._isInvalid && this._isRelative && s.call(this, e, "port")
                            },
                            get pathname() {
                                return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData
                            },
                            set pathname(e) {
                                !this._isInvalid && this._isRelative && (this._path = [], s.call(this, e, "relative path start"))
                            },
                            get search() {
                                return this._isInvalid || !this._query || "?" === this._query ? "" : this._query
                            },
                            set search(e) {
                                !this._isInvalid && this._isRelative && (this._query = "?", "?" === e[0] && (e = e.slice(1)), s.call(this, e, "query"))
                            },
                            get hash() {
                                return this._isInvalid || !this._fragment || "#" === this._fragment ? "" : this._fragment
                            },
                            set hash(e) {
                                this._isInvalid || (this._fragment = "#", "#" === e[0] && (e = e.slice(1)), s.call(this, e, "fragment"))
                            },
                            get origin() {
                                var e;
                                if (this._isInvalid || !this._scheme) return "";
                                switch (this._scheme) {
                                    case "data":
                                    case "file":
                                    case "javascript":
                                    case "mailto":
                                        return "null";
                                    case "blob":
                                        try {
                                            return new u(this._schemeData).origin || "null"
                                        } catch (e) {}
                                        return "null"
                                }
                                return (e = this.host) ? this._scheme + "://" + e : ""
                            }
                        };
                        var m = i.URL;
                        m && (u.createObjectURL = function(e) {
                            return m.createObjectURL.apply(m, arguments)
                        }, u.revokeObjectURL = function(e) {
                            m.revokeObjectURL(e)
                        }), i.URL = u
                    }
                }()
        }
    }, function(e, t, n) {
        "use strict";
        n(78), e.exports = n(5).Uint8ClampedArray
    }, function(e, t, n) {
        "use strict";
        n(79)("Uint8", 1, function(e) {
            return function(t, n, r) {
                return e(this, t, n, r)
            }
        }, !0)
    }, function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        if (n(9)) {
            var i = n(26),
                a = n(1),
                o = n(10),
                s = n(4),
                l = n(46),
                u = n(80),
                c = n(11),
                h = n(23),
                d = n(27),
                f = n(6),
                p = n(22),
                v = n(17),
                g = n(12),
                m = n(47),
                b = n(29),
                y = n(33),
                _ = n(8),
                w = n(30),
                S = n(2),
                P = n(18),
                A = n(53),
                C = n(54),
                k = n(56),
                T = n(48).f,
                x = n(57),
                E = n(16),
                R = n(3),
                L = n(39),
                I = n(50),
                F = n(40),
                D = n(58),
                O = n(19),
                N = n(41),
                M = n(60),
                B = n(52),
                j = n(88),
                V = n(14),
                U = n(61),
                q = V.f,
                W = U.f,
                z = a.RangeError,
                H = a.TypeError,
                G = a.Uint8Array,
                X = "ArrayBuffer",
                J = "Shared" + X,
                Y = "BYTES_PER_ELEMENT",
                Q = "prototype",
                K = Array[Q],
                Z = u.ArrayBuffer,
                $ = u.DataView,
                ee = L(0),
                te = L(2),
                ne = L(3),
                re = L(4),
                ie = L(5),
                ae = L(6),
                oe = I(!0),
                se = I(!1),
                le = D.values,
                ue = D.keys,
                ce = D.entries,
                he = K.lastIndexOf,
                de = K.reduce,
                fe = K.reduceRight,
                pe = K.join,
                ve = K.sort,
                ge = K.slice,
                me = K.toString,
                be = K.toLocaleString,
                ye = R("iterator"),
                _e = R("toStringTag"),
                we = E("typed_constructor"),
                Se = E("def_constructor"),
                Pe = l.CONSTR,
                Ae = l.TYPED,
                Ce = l.VIEW,
                ke = "Wrong length!",
                Te = L(1, function(e, t) {
                    return Ie(F(e, e[Se]), t)
                }),
                xe = o(function() {
                    return 1 === new G(new Uint16Array([1]).buffer)[0]
                }),
                Ee = !!G && !!G[Q].set && o(function() {
                    new G(1).set({})
                }),
                Re = function(e, t) {
                    var n = v(e);
                    if (n < 0 || n % t) throw z("Wrong offset!");
                    return n
                },
                Le = function(e) {
                    if (S(e) && Ae in e) return e;
                    throw H(e + " is not a typed array!")
                },
                Ie = function(e, t) {
                    if (!(S(e) && we in e)) throw H("It is not a typed array constructor!");
                    return new e(t)
                },
                Fe = function(e, t) {
                    return De(F(e, e[Se]), t)
                },
                De = function(e, t) {
                    for (var n = 0, r = t.length, i = Ie(e, r); r > n;) i[n] = t[n++];
                    return i
                },
                Oe = function(e, t, n) {
                    q(e, t, {
                        get: function() {
                            return this._d[n]
                        }
                    })
                },
                Ne = function(e) {
                    var t, n, r, i, a, o, s = P(e),
                        l = arguments.length,
                        u = l > 1 ? arguments[1] : void 0,
                        h = void 0 !== u,
                        d = x(s);
                    if (void 0 != d && !A(d)) {
                        for (o = d.call(s), r = [], t = 0; !(a = o.next()).done; t++) r.push(a.value);
                        s = r
                    }
                    for (h && l > 2 && (u = c(u, arguments[2], 2)), t = 0, n = g(s.length), i = Ie(this, n); n > t; t++) i[t] = h ? u(s[t], t) : s[t];
                    return i
                },
                Me = function() {
                    for (var e = 0, t = arguments.length, n = Ie(this, t); t > e;) n[e] = arguments[e++];
                    return n
                },
                Be = !!G && o(function() {
                    be.call(new G(1))
                }),
                je = function() {
                    return be.apply(Be ? ge.call(Le(this)) : Le(this), arguments)
                },
                Ve = {
                    copyWithin: function(e, t) {
                        return j.call(Le(this), e, t, arguments.length > 2 ? arguments[2] : void 0)
                    },
                    every: function(e) {
                        return re(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    fill: function(e) {
                        return B.apply(Le(this), arguments)
                    },
                    filter: function(e) {
                        return Fe(this, te(Le(this), e, arguments.length > 1 ? arguments[1] : void 0))
                    },
                    find: function(e) {
                        return ie(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    findIndex: function(e) {
                        return ae(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    forEach: function(e) {
                        ee(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    indexOf: function(e) {
                        return se(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    includes: function(e) {
                        return oe(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    join: function(e) {
                        return pe.apply(Le(this), arguments)
                    },
                    lastIndexOf: function(e) {
                        return he.apply(Le(this), arguments)
                    },
                    map: function(e) {
                        return Te(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    reduce: function(e) {
                        return de.apply(Le(this), arguments)
                    },
                    reduceRight: function(e) {
                        return fe.apply(Le(this), arguments)
                    },
                    reverse: function() {
                        for (var e, t = this, n = Le(t).length, r = Math.floor(n / 2), i = 0; i < r;) e = t[i], t[i++] = t[--n], t[n] = e;
                        return t
                    },
                    some: function(e) {
                        return ne(Le(this), e, arguments.length > 1 ? arguments[1] : void 0)
                    },
                    sort: function(e) {
                        return ve.call(Le(this), e)
                    },
                    subarray: function(e, t) {
                        var n = Le(this),
                            r = n.length,
                            i = b(e, r);
                        return new(F(n, n[Se]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, g((void 0 === t ? r : b(t, r)) - i))
                    }
                },
                Ue = function(e, t) {
                    return Fe(this, ge.call(Le(this), e, t))
                },
                qe = function(e) {
                    Le(this);
                    var t = Re(arguments[1], 1),
                        n = this.length,
                        r = P(e),
                        i = g(r.length),
                        a = 0;
                    if (i + t > n) throw z(ke);
                    for (; a < i;) this[t + a] = r[a++]
                },
                We = {
                    entries: function() {
                        return ce.call(Le(this))
                    },
                    keys: function() {
                        return ue.call(Le(this))
                    },
                    values: function() {
                        return le.call(Le(this))
                    }
                },
                ze = function(e, t) {
                    return S(e) && e[Ae] && "symbol" != (void 0 === t ? "undefined" : r(t)) && t in e && String(+t) == String(t)
                },
                He = function(e, t) {
                    return ze(e, t = y(t, !0)) ? d(2, e[t]) : W(e, t)
                },
                Ge = function(e, t, n) {
                    return !(ze(e, t = y(t, !0)) && S(n) && _(n, "value")) || _(n, "get") || _(n, "set") || n.configurable || _(n, "writable") && !n.writable || _(n, "enumerable") && !n.enumerable ? q(e, t, n) : (e[t] = n.value, e)
                };
            Pe || (U.f = He, V.f = Ge), s(s.S + s.F * !Pe, "Object", {
                getOwnPropertyDescriptor: He,
                defineProperty: Ge
            }), o(function() {
                me.call({})
            }) && (me = be = function() {
                return pe.call(this)
            });
            var Xe = p({}, Ve);
            p(Xe, We), f(Xe, ye, We.values), p(Xe, {
                slice: Ue,
                set: qe,
                constructor: function() {},
                toString: me,
                toLocaleString: je
            }), Oe(Xe, "buffer", "b"), Oe(Xe, "byteOffset", "o"), Oe(Xe, "byteLength", "l"), Oe(Xe, "length", "e"), q(Xe, _e, {
                get: function() {
                    return this[Ae]
                }
            }), e.exports = function(e, t, n, r) {
                var u = e + ((r = !!r) ? "Clamped" : "") + "Array",
                    c = "get" + e,
                    d = "set" + e,
                    p = a[u],
                    v = p || {},
                    b = p && k(p),
                    y = !p || !l.ABV,
                    _ = {},
                    P = p && p[Q],
                    A = function(e, n) {
                        q(e, n, {
                            get: function() {
                                return function(e, n) {
                                    var r = e._d;
                                    return r.v[c](n * t + r.o, xe)
                                }(this, n)
                            },
                            set: function(e) {
                                return function(e, n, i) {
                                    var a = e._d;
                                    r && (i = (i = Math.round(i)) < 0 ? 0 : i > 255 ? 255 : 255 & i), a.v[d](n * t + a.o, i, xe)
                                }(this, n, e)
                            },
                            enumerable: !0
                        })
                    };
                y ? (p = n(function(e, n, r, i) {
                    h(e, p, u, "_d");
                    var a, o, s, l, c = 0,
                        d = 0;
                    if (S(n)) {
                        if (!(n instanceof Z || (l = w(n)) == X || l == J)) return Ae in n ? De(p, n) : Ne.call(p, n);
                        a = n, d = Re(r, t);
                        var v = n.byteLength;
                        if (void 0 === i) {
                            if (v % t) throw z(ke);
                            if ((o = v - d) < 0) throw z(ke)
                        } else if ((o = g(i) * t) + d > v) throw z(ke);
                        s = o / t
                    } else s = m(n), a = new Z(o = s * t);
                    for (f(e, "_d", {
                            b: a,
                            o: d,
                            l: o,
                            e: s,
                            v: new $(a)
                        }); c < s;) A(e, c++)
                }), P = p[Q] = C(Xe), f(P, "constructor", p)) : o(function() {
                    p(1)
                }) && o(function() {
                    new p(-1)
                }) && N(function(e) {
                    new p, new p(null), new p(1.5), new p(e)
                }, !0) || (p = n(function(e, n, r, i) {
                    h(e, p, u);
                    var a;
                    return S(n) ? n instanceof Z || (a = w(n)) == X || a == J ? void 0 !== i ? new v(n, Re(r, t), i) : void 0 !== r ? new v(n, Re(r, t)) : new v(n) : Ae in n ? De(p, n) : Ne.call(p, n) : new v(m(n))
                }), ee(b !== Function.prototype ? T(v).concat(T(b)) : T(v), function(e) {
                    e in p || f(p, e, v[e])
                }), p[Q] = P, i || (P.constructor = p));
                var x = P[ye],
                    E = !!x && ("values" == x.name || void 0 == x.name),
                    R = We.values;
                f(p, we, !0), f(P, Ae, u), f(P, Ce, !0), f(P, Se, p), (r ? new p(1)[_e] == u : _e in P) || q(P, _e, {
                    get: function() {
                        return u
                    }
                }), _[u] = p, s(s.G + s.W + s.F * (p != v), _), s(s.S, u, {
                    BYTES_PER_ELEMENT: t
                }), s(s.S + s.F * o(function() {
                    v.of.call(p, 1)
                }), u, {
                    from: Ne,
                    of: Me
                }), Y in P || f(P, Y, t), s(s.P, u, Ve), M(u), s(s.P + s.F * Ee, u, {
                    set: qe
                }), s(s.P + s.F * !E, u, We), i || P.toString == me || (P.toString = me), s(s.P + s.F * o(function() {
                    new p(1).slice()
                }), u, {
                    slice: Ue
                }), s(s.P + s.F * (o(function() {
                    return [1, 2].toLocaleString() != new p([1, 2]).toLocaleString()
                }) || !o(function() {
                    P.toLocaleString.call([1, 2])
                })), u, {
                    toLocaleString: je
                }), O[u] = E ? x : R, i || E || f(P, ye, R)
            }
        } else e.exports = function() {}
    }, function(e, t, n) {
        "use strict";

        function r(e, t, n) {
            var r, i, a, o = Array(n),
                s = 8 * n - t - 1,
                l = (1 << s) - 1,
                u = l >> 1,
                c = 23 === t ? V(2, -24) - V(2, -77) : 0,
                h = 0,
                d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for ((e = j(e)) != e || e === M ? (i = e != e ? 1 : 0, r = l) : (r = U(q(e) / W), e * (a = V(2, -r)) < 1 && (r--, a *= 2), (e += r + u >= 1 ? c / a : c * V(2, 1 - u)) * a >= 2 && (r++, a /= 2), r + u >= l ? (i = 0, r = l) : r + u >= 1 ? (i = (e * a - 1) * V(2, t), r += u) : (i = e * V(2, u - 1) * V(2, t), r = 0)); t >= 8; o[h++] = 255 & i, i /= 256, t -= 8);
            for (r = r << t | i, s += t; s > 0; o[h++] = 255 & r, r /= 256, s -= 8);
            return o[--h] |= 128 * d, o
        }

        function i(e, t, n) {
            var r, i = 8 * n - t - 1,
                a = (1 << i) - 1,
                o = a >> 1,
                s = i - 7,
                l = n - 1,
                u = e[l--],
                c = 127 & u;
            for (u >>= 7; s > 0; c = 256 * c + e[l], l--, s -= 8);
            for (r = c & (1 << -s) - 1, c >>= -s, s += t; s > 0; r = 256 * r + e[l], l--, s -= 8);
            if (0 === c) c = 1 - o;
            else {
                if (c === a) return r ? NaN : u ? -M : M;
                r += V(2, t), c -= o
            }
            return (u ? -1 : 1) * r * V(2, c - t)
        }

        function a(e) {
            return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
        }

        function o(e) {
            return [255 & e]
        }

        function s(e) {
            return [255 & e, e >> 8 & 255]
        }

        function l(e) {
            return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
        }

        function u(e) {
            return r(e, 52, 8)
        }

        function c(e) {
            return r(e, 23, 4)
        }

        function h(e, t, n) {
            k(e[L], t, {
                get: function() {
                    return this[n]
                }
            })
        }

        function d(e, t, n, r) {
            var i = A(+n);
            if (i + t > e[G]) throw N(I);
            var a = e[H]._b,
                o = i + e[X],
                s = a.slice(o, o + t);
            return r ? s : s.reverse()
        }

        function f(e, t, n, r, i, a) {
            var o = A(+n);
            if (o + t > e[G]) throw N(I);
            for (var s = e[H]._b, l = o + e[X], u = r(+i), c = 0; c < t; c++) s[l + c] = u[a ? c : t - c - 1]
        }
        var p = n(1),
            v = n(9),
            g = n(26),
            m = n(46),
            b = n(6),
            y = n(22),
            _ = n(10),
            w = n(23),
            S = n(17),
            P = n(12),
            A = n(47),
            C = n(48).f,
            k = n(14).f,
            T = n(52),
            x = n(25),
            E = "ArrayBuffer",
            R = "DataView",
            L = "prototype",
            I = "Wrong index!",
            F = p[E],
            D = p[R],
            O = p.Math,
            N = p.RangeError,
            M = p.Infinity,
            B = F,
            j = O.abs,
            V = O.pow,
            U = O.floor,
            q = O.log,
            W = O.LN2,
            z = "byteLength",
            H = v ? "_b" : "buffer",
            G = v ? "_l" : z,
            X = v ? "_o" : "byteOffset";
        if (m.ABV) {
            if (!_(function() {
                    F(1)
                }) || !_(function() {
                    new F(-1)
                }) || _(function() {
                    return new F, new F(1.5), new F(NaN), F.name != E
                })) {
                for (var J, Y = (F = function(e) {
                        return w(this, F), new B(A(e))
                    })[L] = B[L], Q = C(B), K = 0; Q.length > K;)(J = Q[K++]) in F || b(F, J, B[J]);
                g || (Y.constructor = F)
            }
            var Z = new D(new F(2)),
                $ = D[L].setInt8;
            Z.setInt8(0, 2147483648), Z.setInt8(1, 2147483649), !Z.getInt8(0) && Z.getInt8(1) || y(D[L], {
                setInt8: function(e, t) {
                    $.call(this, e, t << 24 >> 24)
                },
                setUint8: function(e, t) {
                    $.call(this, e, t << 24 >> 24)
                }
            }, !0)
        } else F = function(e) {
            w(this, F, E);
            var t = A(e);
            this._b = T.call(Array(t), 0), this[G] = t
        }, D = function(e, t, n) {
            w(this, D, R), w(e, F, R);
            var r = e[G],
                i = S(t);
            if (i < 0 || i > r) throw N("Wrong offset!");
            if (n = void 0 === n ? r - i : P(n), i + n > r) throw N("Wrong length!");
            this[H] = e, this[X] = i, this[G] = n
        }, v && (h(F, z, "_l"), h(D, "buffer", "_b"), h(D, z, "_l"), h(D, "byteOffset", "_o")), y(D[L], {
            getInt8: function(e) {
                return d(this, 1, e)[0] << 24 >> 24
            },
            getUint8: function(e) {
                return d(this, 1, e)[0]
            },
            getInt16: function(e) {
                var t = d(this, 2, e, arguments[1]);
                return (t[1] << 8 | t[0]) << 16 >> 16
            },
            getUint16: function(e) {
                var t = d(this, 2, e, arguments[1]);
                return t[1] << 8 | t[0]
            },
            getInt32: function(e) {
                return a(d(this, 4, e, arguments[1]))
            },
            getUint32: function(e) {
                return a(d(this, 4, e, arguments[1])) >>> 0
            },
            getFloat32: function(e) {
                return i(d(this, 4, e, arguments[1]), 23, 4)
            },
            getFloat64: function(e) {
                return i(d(this, 8, e, arguments[1]), 52, 8)
            },
            setInt8: function(e, t) {
                f(this, 1, e, o, t)
            },
            setUint8: function(e, t) {
                f(this, 1, e, o, t)
            },
            setInt16: function(e, t) {
                f(this, 2, e, s, t, arguments[2])
            },
            setUint16: function(e, t) {
                f(this, 2, e, s, t, arguments[2])
            },
            setInt32: function(e, t) {
                f(this, 4, e, l, t, arguments[2])
            },
            setUint32: function(e, t) {
                f(this, 4, e, l, t, arguments[2])
            },
            setFloat32: function(e, t) {
                f(this, 4, e, c, t, arguments[2])
            },
            setFloat64: function(e, t) {
                f(this, 8, e, u, t, arguments[2])
            }
        });
        x(F, E), x(D, R), b(D[L], m.VIEW, !0), t[E] = F, t[R] = D
    }, function(e, t, n) {
        "use strict";
        var r = n(14),
            i = n(7),
            a = n(38);
        e.exports = n(9) ? Object.defineProperties : function(e, t) {
            i(e);
            for (var n, o = a(t), s = o.length, l = 0; s > l;) r.f(e, n = o[l++], t[n]);
            return e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(83);
        e.exports = function(e, t) {
            return new(r(e))(t)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            i = n(84),
            a = n(3)("species");
        e.exports = function(e) {
            var t;
            return i(e) && ("function" != typeof(t = e.constructor) || t !== Array && !i(t.prototype) || (t = void 0), r(t) && null === (t = t[a]) && (t = void 0)), void 0 === t ? Array : t
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(24);
        e.exports = Array.isArray || function(e) {
            return "Array" == r(e)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(3)("unscopables"),
            i = Array.prototype;
        void 0 == i[r] && n(6)(i, r, {}), e.exports = function(e) {
            i[r][e] = !0
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(54),
            i = n(27),
            a = n(25),
            o = {};
        n(6)(o, n(3)("iterator"), function() {
            return this
        }), e.exports = function(e, t, n) {
            e.prototype = r(o, {
                next: i(1, n)
            }), a(e, t + " Iterator")
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(18),
            i = n(29),
            a = n(12);
        e.exports = [].copyWithin || function(e, t) {
            var n = r(this),
                o = a(n.length),
                s = i(e, o),
                l = i(t, o),
                u = arguments.length > 2 ? arguments[2] : void 0,
                c = Math.min((void 0 === u ? o : i(u, o)) - l, o - s),
                h = 1;
            for (l < s && s < l + c && (h = -1, l += c - 1, s += c - 1); c-- > 0;) l in n ? n[s] = n[l] : delete n[s], s += h, l += h;
            return n
        }
    }, function(e, t, n) {
        "use strict";
        n(90), e.exports = n(5).Number.isNaN
    }, function(e, t, n) {
        "use strict";
        var r = n(4);
        r(r.S, "Number", {
            isNaN: function(e) {
                return e != e
            }
        })
    }, function(e, t, n) {
        "use strict";
        n(92), e.exports = n(5).Number.isInteger
    }, function(e, t, n) {
        "use strict";
        var r = n(4);
        r(r.S, "Number", {
            isInteger: n(93)
        })
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            i = Math.floor;
        e.exports = function(e) {
            return !r(e) && isFinite(e) && i(e) === e
        }
    }, function(e, t, n) {
        "use strict";
        n(63), n(95), n(64), n(97), n(101), n(102), e.exports = n(5).Promise
    }, function(e, t, n) {
        "use strict";
        var r = n(96)(!0);
        n(59)(String, "String", function(e) {
            this._t = String(e), this._i = 0
        }, function() {
            var e, t = this._t,
                n = this._i;
            return n >= t.length ? {
                value: void 0,
                done: !0
            } : (e = r(t, n), this._i += e.length, {
                value: e,
                done: !1
            })
        })
    }, function(e, t, n) {
        "use strict";
        var r = n(17),
            i = n(35);
        e.exports = function(e) {
            return function(t, n) {
                var a, o, s = String(i(t)),
                    l = r(n),
                    u = s.length;
                return l < 0 || l >= u ? e ? "" : void 0 : (a = s.charCodeAt(l)) < 55296 || a > 56319 || l + 1 === u || (o = s.charCodeAt(l + 1)) < 56320 || o > 57343 ? e ? s.charAt(l) : a : e ? s.slice(l, l + 2) : o - 56320 + (a - 55296 << 10) + 65536
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r, i, a, o, s = n(26),
            l = n(1),
            u = n(11),
            c = n(30),
            h = n(4),
            d = n(2),
            f = n(21),
            p = n(23),
            v = n(31),
            g = n(40),
            m = n(65).set,
            b = n(100)(),
            y = n(42),
            _ = n(66),
            w = n(67),
            S = "Promise",
            P = l.TypeError,
            A = l.process,
            C = l[S],
            k = "process" == c(A),
            T = function() {},
            x = i = y.f,
            E = !! function() {
                try {
                    var e = C.resolve(1),
                        t = (e.constructor = {})[n(3)("species")] = function(e) {
                            e(T, T)
                        };
                    return (k || "function" == typeof PromiseRejectionEvent) && e.then(T) instanceof t
                } catch (e) {}
            }(),
            R = function(e) {
                var t;
                return !(!d(e) || "function" != typeof(t = e.then)) && t
            },
            L = function(e, t) {
                if (!e._n) {
                    e._n = !0;
                    var n = e._c;
                    b(function() {
                        for (var r = e._v, i = 1 == e._s, a = 0, o = function(t) {
                                var n, a, o = i ? t.ok : t.fail,
                                    s = t.resolve,
                                    l = t.reject,
                                    u = t.domain;
                                try {
                                    o ? (i || (2 == e._h && D(e), e._h = 1), !0 === o ? n = r : (u && u.enter(), n = o(r), u && u.exit()), n === t.promise ? l(P("Promise-chain cycle")) : (a = R(n)) ? a.call(n, s, l) : s(n)) : l(r)
                                } catch (e) {
                                    l(e)
                                }
                            }; n.length > a;) o(n[a++]);
                        e._c = [], e._n = !1, t && !e._h && I(e)
                    })
                }
            },
            I = function(e) {
                m.call(l, function() {
                    var t, n, r, i = e._v,
                        a = F(e);
                    if (a && (t = _(function() {
                            k ? A.emit("unhandledRejection", i, e) : (n = l.onunhandledrejection) ? n({
                                promise: e,
                                reason: i
                            }) : (r = l.console) && r.error && r.error("Unhandled promise rejection", i)
                        }), e._h = k || F(e) ? 2 : 1), e._a = void 0, a && t.e) throw t.v
                })
            },
            F = function e(t) {
                if (1 == t._h) return !1;
                for (var n, r = t._a || t._c, i = 0; r.length > i;)
                    if ((n = r[i++]).fail || !e(n.promise)) return !1;
                return !0
            },
            D = function(e) {
                m.call(l, function() {
                    var t;
                    k ? A.emit("rejectionHandled", e) : (t = l.onrejectionhandled) && t({
                        promise: e,
                        reason: e._v
                    })
                })
            },
            O = function(e) {
                var t = this;
                t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), L(t, !0))
            },
            N = function e(t) {
                var n, r = this;
                if (!r._d) {
                    r._d = !0, r = r._w || r;
                    try {
                        if (r === t) throw P("Promise can't be resolved itself");
                        (n = R(t)) ? b(function() {
                            var i = {
                                _w: r,
                                _d: !1
                            };
                            try {
                                n.call(t, u(e, i, 1), u(O, i, 1))
                            } catch (e) {
                                O.call(i, e)
                            }
                        }): (r._v = t, r._s = 1, L(r, !1))
                    } catch (e) {
                        O.call({
                            _w: r,
                            _d: !1
                        }, e)
                    }
                }
            };
        E || (C = function(e) {
            p(this, C, S, "_h"), f(e), r.call(this);
            try {
                e(u(N, this, 1), u(O, this, 1))
            } catch (e) {
                O.call(this, e)
            }
        }, (r = function(e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
        }).prototype = n(22)(C.prototype, {
            then: function(e, t) {
                var n = x(g(this, C));
                return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = k ? A.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && L(this, !1), n.promise
            },
            catch: function(e) {
                return this.then(void 0, e)
            }
        }), a = function() {
            var e = new r;
            this.promise = e, this.resolve = u(N, e, 1), this.reject = u(O, e, 1)
        }, y.f = x = function(e) {
            return e === C || e === o ? new a(e) : i(e)
        }), h(h.G + h.W + h.F * !E, {
            Promise: C
        }), n(25)(C, S), n(60)(S), o = n(5)[S], h(h.S + h.F * !E, S, {
            reject: function(e) {
                var t = x(this);
                return (0, t.reject)(e), t.promise
            }
        }), h(h.S + h.F * (s || !E), S, {
            resolve: function(e) {
                return w(s && this === o ? C : this, e)
            }
        }), h(h.S + h.F * !(E && n(41)(function(e) {
            C.all(e).catch(T)
        })), S, {
            all: function(e) {
                var t = this,
                    n = x(t),
                    r = n.resolve,
                    i = n.reject,
                    a = _(function() {
                        var n = [],
                            a = 0,
                            o = 1;
                        v(e, !1, function(e) {
                            var s = a++,
                                l = !1;
                            n.push(void 0), o++, t.resolve(e).then(function(e) {
                                l || (l = !0, n[s] = e, --o || r(n))
                            }, i)
                        }), --o || r(n)
                    });
                return a.e && i(a.v), n.promise
            },
            race: function(e) {
                var t = this,
                    n = x(t),
                    r = n.reject,
                    i = _(function() {
                        v(e, !1, function(e) {
                            t.resolve(e).then(n.resolve, r)
                        })
                    });
                return i.e && r(i.v), n.promise
            }
        })
    }, function(e, t, n) {
        "use strict";
        var r = n(7);
        e.exports = function(e, t, n, i) {
            try {
                return i ? t(r(n)[0], n[1]) : t(n)
            } catch (t) {
                var a = e.return;
                throw void 0 !== a && r(a.call(e)), t
            }
        }
    }, function(e, t, n) {
        "use strict";
        e.exports = function(e, t, n) {
            var r = void 0 === n;
            switch (t.length) {
                case 0:
                    return r ? e() : e.call(n);
                case 1:
                    return r ? e(t[0]) : e.call(n, t[0]);
                case 2:
                    return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                case 3:
                    return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
                case 4:
                    return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
            }
            return e.apply(n, t)
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = n(65).set,
            a = r.MutationObserver || r.WebKitMutationObserver,
            o = r.process,
            s = r.Promise,
            l = "process" == n(24)(o);
        e.exports = function() {
            var e, t, n, u = function() {
                var r, i;
                for (l && (r = o.domain) && r.exit(); e;) {
                    i = e.fn, e = e.next;
                    try {
                        i()
                    } catch (r) {
                        throw e ? n() : t = void 0, r
                    }
                }
                t = void 0, r && r.enter()
            };
            if (l) n = function() {
                o.nextTick(u)
            };
            else if (a) {
                var c = !0,
                    h = document.createTextNode("");
                new a(u).observe(h, {
                    characterData: !0
                }), n = function() {
                    h.data = c = !c
                }
            } else if (s && s.resolve) {
                var d = s.resolve();
                n = function() {
                    d.then(u)
                }
            } else n = function() {
                i.call(r, u)
            };
            return function(r) {
                var i = {
                    fn: r,
                    next: void 0
                };
                t && (t.next = i), e || (e = i, n()), t = i
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(4),
            i = n(5),
            a = n(1),
            o = n(40),
            s = n(67);
        r(r.P + r.R, "Promise", {
            finally: function(e) {
                var t = o(this, i.Promise || a.Promise),
                    n = "function" == typeof e;
                return this.then(n ? function(n) {
                    return s(t, e()).then(function() {
                        return n
                    })
                } : e, n ? function(n) {
                    return s(t, e()).then(function() {
                        throw n
                    })
                } : e)
            }
        })
    }, function(e, t, n) {
        "use strict";
        var r = n(4),
            i = n(42),
            a = n(66);
        r(r.S, "Promise", {
            try: function(e) {
                var t = i.f(this),
                    n = a(e);
                return (n.e ? t.reject : t.resolve)(n.v), t.promise
            }
        })
    }, function(e, t, n) {
        "use strict";
        n(63), n(64), n(104), n(111), n(113), e.exports = n(5).WeakMap
    }, function(e, t, n) {
        "use strict";
        var r, i = n(39)(0),
            a = n(15),
            o = n(43),
            s = n(105),
            l = n(107),
            u = n(2),
            c = n(10),
            h = n(68),
            d = o.getWeak,
            f = Object.isExtensible,
            p = l.ufstore,
            v = {},
            g = function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            },
            m = {
                get: function(e) {
                    if (u(e)) {
                        var t = d(e);
                        return !0 === t ? p(h(this, "WeakMap")).get(e) : t ? t[this._i] : void 0
                    }
                },
                set: function(e, t) {
                    return l.def(h(this, "WeakMap"), e, t)
                }
            },
            b = e.exports = n(108)("WeakMap", g, m, l, !0, !0);
        c(function() {
            return 7 != (new b).set((Object.freeze || Object)(v), 7).get(v)
        }) && (s((r = l.getConstructor(g, "WeakMap")).prototype, m), o.NEED = !0, i(["delete", "has", "get", "set"], function(e) {
            var t = b.prototype,
                n = t[e];
            a(t, e, function(t, i) {
                if (u(t) && !f(t)) {
                    this._f || (this._f = new r);
                    var a = this._f[e](t, i);
                    return "set" == e ? this : a
                }
                return n.call(this, t, i)
            })
        }))
    }, function(e, t, n) {
        "use strict";
        var r = n(38),
            i = n(106),
            a = n(62),
            o = n(18),
            s = n(34),
            l = Object.assign;
        e.exports = !l || n(10)(function() {
            var e = {},
                t = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach(function(e) {
                t[e] = e
            }), 7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != r
        }) ? function(e, t) {
            for (var n = o(e), l = arguments.length, u = 1, c = i.f, h = a.f; l > u;)
                for (var d, f = s(arguments[u++]), p = c ? r(f).concat(c(f)) : r(f), v = p.length, g = 0; v > g;) h.call(f, d = p[g++]) && (n[d] = f[d]);
            return n
        } : l
    }, function(e, t, n) {
        "use strict";
        t.f = Object.getOwnPropertySymbols
    }, function(e, t, n) {
        "use strict";
        var r = n(22),
            i = n(43).getWeak,
            a = n(7),
            o = n(2),
            s = n(23),
            l = n(31),
            u = n(39),
            c = n(8),
            h = n(68),
            d = u(5),
            f = u(6),
            p = 0,
            v = function(e) {
                return e._l || (e._l = new g)
            },
            g = function() {
                this.a = []
            },
            m = function(e, t) {
                return d(e.a, function(e) {
                    return e[0] === t
                })
            };
        g.prototype = {
            get: function(e) {
                var t = m(this, e);
                if (t) return t[1]
            },
            has: function(e) {
                return !!m(this, e)
            },
            set: function(e, t) {
                var n = m(this, e);
                n ? n[1] = t : this.a.push([e, t])
            },
            delete: function(e) {
                var t = f(this.a, function(t) {
                    return t[0] === e
                });
                return ~t && this.a.splice(t, 1), !!~t
            }
        }, e.exports = {
            getConstructor: function(e, t, n, a) {
                var u = e(function(e, r) {
                    s(e, u, t, "_i"), e._t = t, e._i = p++, e._l = void 0, void 0 != r && l(r, n, e[a], e)
                });
                return r(u.prototype, {
                    delete: function(e) {
                        if (!o(e)) return !1;
                        var n = i(e);
                        return !0 === n ? v(h(this, t)).delete(e) : n && c(n, this._i) && delete n[this._i]
                    },
                    has: function(e) {
                        if (!o(e)) return !1;
                        var n = i(e);
                        return !0 === n ? v(h(this, t)).has(e) : n && c(n, this._i)
                    }
                }), u
            },
            def: function(e, t, n) {
                var r = i(a(t), !0);
                return !0 === r ? v(e).set(t, n) : r[e._i] = n, e
            },
            ufstore: v
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            i = n(4),
            a = n(15),
            o = n(22),
            s = n(43),
            l = n(31),
            u = n(23),
            c = n(2),
            h = n(10),
            d = n(41),
            f = n(25),
            p = n(109);
        e.exports = function(e, t, n, v, g, m) {
            var b = r[e],
                y = b,
                _ = g ? "set" : "add",
                w = y && y.prototype,
                S = {},
                P = function(e) {
                    var t = w[e];
                    a(w, e, "delete" == e ? function(e) {
                        return !(m && !c(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "has" == e ? function(e) {
                        return !(m && !c(e)) && t.call(this, 0 === e ? 0 : e)
                    } : "get" == e ? function(e) {
                        return m && !c(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                    } : "add" == e ? function(e) {
                        return t.call(this, 0 === e ? 0 : e), this
                    } : function(e, n) {
                        return t.call(this, 0 === e ? 0 : e, n), this
                    })
                };
            if ("function" == typeof y && (m || w.forEach && !h(function() {
                    (new y).entries().next()
                }))) {
                var A = new y,
                    C = A[_](m ? {} : -0, 1) != A,
                    k = h(function() {
                        A.has(1)
                    }),
                    T = d(function(e) {
                        new y(e)
                    }),
                    x = !m && h(function() {
                        for (var e = new y, t = 5; t--;) e[_](t, t);
                        return !e.has(-0)
                    });
                T || ((y = t(function(t, n) {
                    u(t, y, e);
                    var r = p(new b, t, y);
                    return void 0 != n && l(n, g, r[_], r), r
                })).prototype = w, w.constructor = y), (k || x) && (P("delete"), P("has"), g && P("get")), (x || C) && P(_), m && w.clear && delete w.clear
            } else y = v.getConstructor(t, e, g, _), o(y.prototype, n), s.NEED = !0;
            return f(y, e), S[e] = y, i(i.G + i.W + i.F * (y != b), S), m || v.setStrong(y, e, g), y
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            i = n(110).set;
        e.exports = function(e, t, n) {
            var a, o = t.constructor;
            return o !== n && "function" == typeof o && (a = o.prototype) !== n.prototype && r(a) && i && i(e, a), e
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(2),
            i = n(7),
            a = function(e, t) {
                if (i(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
            };
        e.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
                try {
                    (r = n(11)(Function.call, n(61).f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
                } catch (e) {
                    t = !0
                }
                return function(e, n) {
                    return a(e, n), t ? e.__proto__ = n : r(e, n), e
                }
            }({}, !1) : void 0),
            check: a
        }
    }, function(e, t, n) {
        "use strict";
        n(112)("WeakMap")
    }, function(e, t, n) {
        "use strict";
        var r = n(4);
        e.exports = function(e) {
            r(r.S, e, {
                of: function() {
                    for (var e = arguments.length, t = Array(e); e--;) t[e] = arguments[e];
                    return new this(t)
                }
            })
        }
    }, function(e, t, n) {
        "use strict";
        n(114)("WeakMap")
    }, function(e, t, n) {
        "use strict";
        var r = n(4),
            i = n(21),
            a = n(11),
            o = n(31);
        e.exports = function(e) {
            r(r.S, e, {
                from: function(e) {
                    var t, n, r, s, l = arguments[1];
                    return i(this), (t = void 0 !== l) && i(l), void 0 == e ? new this : (n = [], t ? (r = 0, s = a(l, arguments[2], 2), o(e, !1, function(e) {
                        n.push(s(e, r++))
                    })) : o(e, !1, n.push, n), new this(n))
                }
            })
        }
    }, function(e, t, n) {
        "use strict";
        var r = !1;
        if ("undefined" != typeof ReadableStream) try {
            new ReadableStream({
                start: function(e) {
                    e.close()
                }
            }), r = !0
        } catch (e) {}
        t.ReadableStream = r ? ReadableStream : n(116).ReadableStream
    }, function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function(e, t) {
            for (var n in t) e[n] = t[n]
        }(t, function(e) {
            function t(r) {
                if (n[r]) return n[r].exports;
                var i = n[r] = {
                    i: r,
                    l: !1,
                    exports: {}
                };
                return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
            }
            var n = {};
            return t.m = e, t.c = n, t.i = function(e) {
                return e
            }, t.d = function(e, n, r) {
                t.o(e, n) || Object.defineProperty(e, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: r
                })
            }, t.n = function(e) {
                var n = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return t.d(n, "a", n), n
            }, t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, t.p = "", t(t.s = 7)
        }([function(e, t, n) {
            function i(e) {
                return "string" == typeof e || "symbol" === (void 0 === e ? "undefined" : o(e))
            }

            function a(e, t, n) {
                if ("function" != typeof e) throw new TypeError("Argument is not a function");
                return Function.prototype.apply.call(e, t, n)
            }
            var o = "function" == typeof Symbol && "symbol" === r(Symbol.iterator) ? function(e) {
                    return void 0 === e ? "undefined" : r(e)
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : r(e)
                },
                s = n(1).assert;
            t.typeIsObject = function(e) {
                return "object" === (void 0 === e ? "undefined" : o(e)) && null !== e || "function" == typeof e
            }, t.createDataProperty = function(e, n, r) {
                s(t.typeIsObject(e)), Object.defineProperty(e, n, {
                    value: r,
                    writable: !0,
                    enumerable: !0,
                    configurable: !0
                })
            }, t.createArrayFromList = function(e) {
                return e.slice()
            }, t.ArrayBufferCopy = function(e, t, n, r, i) {
                new Uint8Array(e).set(new Uint8Array(n, r, i), t)
            }, t.CreateIterResultObject = function(e, t) {
                s("boolean" == typeof t);
                var n = {};
                return Object.defineProperty(n, "value", {
                    value: e,
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                }), Object.defineProperty(n, "done", {
                    value: t,
                    enumerable: !0,
                    writable: !0,
                    configurable: !0
                }), n
            }, t.IsFiniteNonNegativeNumber = function(e) {
                return !Number.isNaN(e) && (e !== 1 / 0 && !(e < 0))
            }, t.InvokeOrNoop = function(e, t, n) {
                s(void 0 !== e), s(i(t)), s(Array.isArray(n));
                var r = e[t];
                if (void 0 !== r) return a(r, e, n)
            }, t.PromiseInvokeOrNoop = function(e, n, r) {
                s(void 0 !== e), s(i(n)), s(Array.isArray(r));
                try {
                    return Promise.resolve(t.InvokeOrNoop(e, n, r))
                } catch (e) {
                    return Promise.reject(e)
                }
            }, t.PromiseInvokeOrPerformFallback = function(e, t, n, r, o) {
                s(void 0 !== e), s(i(t)), s(Array.isArray(n)), s(Array.isArray(o));
                var l = void 0;
                try {
                    l = e[t]
                } catch (e) {
                    return Promise.reject(e)
                }
                if (void 0 === l) return r.apply(null, o);
                try {
                    return Promise.resolve(a(l, e, n))
                } catch (e) {
                    return Promise.reject(e)
                }
            }, t.TransferArrayBuffer = function(e) {
                return e.slice()
            }, t.ValidateAndNormalizeHighWaterMark = function(e) {
                if (e = Number(e), Number.isNaN(e) || e < 0) throw new RangeError("highWaterMark property of a queuing strategy must be non-negative and non-NaN");
                return e
            }, t.ValidateAndNormalizeQueuingStrategy = function(e, n) {
                if (void 0 !== e && "function" != typeof e) throw new TypeError("size property of a queuing strategy must be a function");
                return n = t.ValidateAndNormalizeHighWaterMark(n), {
                    size: e,
                    highWaterMark: n
                }
            }
        }, function(e, t, n) {
            function r(e) {
                this.name = "AssertionError", this.message = e || "", this.stack = (new Error).stack
            }(r.prototype = Object.create(Error.prototype)).constructor = r, e.exports = {
                rethrowAssertionErrorRejection: function(e) {
                    e && e.constructor === r && setTimeout(function() {
                        throw e
                    }, 0)
                },
                AssertionError: r,
                assert: function(e, t) {
                    if (!e) throw new r(t)
                }
            }
        }, function(e, t, n) {
            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e) {
                return new Q(e)
            }

            function a(e) {
                return !!V(e) && !!Object.prototype.hasOwnProperty.call(e, "_writableStreamController")
            }

            function o(e) {
                return q(!0 === a(e), "IsWritableStreamLocked should only be used on known writable streams"), void 0 !== e._writer
            }

            function s(e, t) {
                var n = e._state;
                if ("closed" === n) return Promise.resolve(void 0);
                if ("errored" === n) return Promise.reject(e._storedError);
                var r = new TypeError("Requested to abort");
                if (void 0 !== e._pendingAbortRequest) return Promise.reject(r);
                q("writable" === n || "erroring" === n, "state must be writable or erroring");
                var i = !1;
                "erroring" === n && (i = !0, t = void 0);
                var a = new Promise(function(n, r) {
                    e._pendingAbortRequest = {
                        _resolve: n,
                        _reject: r,
                        _reason: t,
                        _wasAlreadyErroring: i
                    }
                });
                return !1 === i && u(e, r), a
            }

            function l(e, t) {
                var n = e._state;
                "writable" !== n ? (q("erroring" === n), c(e)) : u(e, t)
            }

            function u(e, t) {
                q(void 0 === e._storedError, "stream._storedError === undefined"), q("writable" === e._state, "state must be writable");
                var n = e._writableStreamController;
                q(void 0 !== n, "controller must not be undefined"), e._state = "erroring", e._storedError = t;
                var r = e._writer;
                void 0 !== r && y(r, t), !1 === f(e) && !0 === n._started && c(e)
            }

            function c(e) {
                q("erroring" === e._state, "stream._state === erroring"), q(!1 === f(e), "WritableStreamHasOperationMarkedInFlight(stream) === false"), e._state = "errored", e._writableStreamController.__errorSteps();
                for (var t = e._storedError, n = 0; n < e._writeRequests.length; n++) {
                    e._writeRequests[n]._reject(t)
                }
                if (e._writeRequests = [], void 0 !== e._pendingAbortRequest) {
                    var r = e._pendingAbortRequest;
                    if (e._pendingAbortRequest = void 0, !0 === r._wasAlreadyErroring) return r._reject(t), void p(e);
                    e._writableStreamController.__abortSteps(r._reason).then(function() {
                        r._resolve(), p(e)
                    }, function(t) {
                        r._reject(t), p(e)
                    })
                } else p(e)
            }

            function h(e) {
                q(void 0 !== e._inFlightCloseRequest), e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0;
                var t = e._state;
                q("writable" === t || "erroring" === t), "erroring" === t && (e._storedError = void 0, void 0 !== e._pendingAbortRequest && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
                var n = e._writer;
                void 0 !== n && function(e) {
                    q(void 0 !== e._closedPromise_resolve, "writer._closedPromise_resolve !== undefined"), q(void 0 !== e._closedPromise_reject, "writer._closedPromise_reject !== undefined"), q("pending" === e._closedPromiseState, "writer._closedPromiseState is pending"), e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved"
                }(n), q(void 0 === e._pendingAbortRequest, "stream._pendingAbortRequest === undefined"), q(void 0 === e._storedError, "stream._storedError === undefined")
            }

            function d(e) {
                return void 0 !== e._closeRequest || void 0 !== e._inFlightCloseRequest
            }

            function f(e) {
                return void 0 !== e._inFlightWriteRequest || void 0 !== e._inFlightCloseRequest
            }

            function p(e) {
                q("errored" === e._state, '_stream_.[[state]] is `"errored"`'), void 0 !== e._closeRequest && (q(void 0 === e._inFlightCloseRequest), e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
                var t = e._writer;
                void 0 !== t && (L(t, e._storedError), t._closedPromise.catch(function() {}))
            }

            function v(e, t) {
                q("writable" === e._state), q(!1 === d(e));
                var n = e._writer;
                void 0 !== n && t !== e._backpressure && (!0 === t ? function(e) {
                    q(void 0 === e._readyPromise_resolve, "writer._readyPromise_resolve === undefined"), q(void 0 === e._readyPromise_reject, "writer._readyPromise_reject === undefined"), e._readyPromise = new Promise(function(t, n) {
                        e._readyPromise_resolve = t, e._readyPromise_reject = n
                    }), e._readyPromiseState = "pending"
                }(n) : (q(!1 === t), D(n))), e._backpressure = t
            }

            function g(e) {
                return !!V(e) && !!Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream")
            }

            function m(e) {
                var t = e._ownerWritableStream;
                q(void 0 !== t);
                var n = t._state;
                if ("closed" === n || "errored" === n) return Promise.reject(new TypeError("The stream (in " + n + " state) is not in the writable state and cannot be closed"));
                q("writable" === n || "erroring" === n), q(!1 === d(t));
                var r = new Promise(function(e, n) {
                    var r = {
                        _resolve: e,
                        _reject: n
                    };
                    t._closeRequest = r
                });
                return !0 === t._backpressure && "writable" === n && D(e),
                    function(e) {
                        G(e, "close", 0), P(e)
                    }(t._writableStreamController), r
            }

            function b(e, t) {
                "pending" === e._closedPromiseState ? L(e, t) : function(e, t) {
                    q(void 0 === e._closedPromise_resolve, "writer._closedPromise_resolve === undefined"), q(void 0 === e._closedPromise_reject, "writer._closedPromise_reject === undefined"), q("pending" !== e._closedPromiseState, "writer._closedPromiseState is not pending"), e._closedPromise = Promise.reject(t), e._closedPromiseState = "rejected"
                }(e, t), e._closedPromise.catch(function() {})
            }

            function y(e, t) {
                "pending" === e._readyPromiseState ? function(e, t) {
                    q(void 0 !== e._readyPromise_resolve, "writer._readyPromise_resolve !== undefined"), q(void 0 !== e._readyPromise_reject, "writer._readyPromise_reject !== undefined"), e._readyPromise_reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected"
                }(e, t) : function(e, t) {
                    q(void 0 === e._readyPromise_resolve, "writer._readyPromise_resolve === undefined"), q(void 0 === e._readyPromise_reject, "writer._readyPromise_reject === undefined"), e._readyPromise = Promise.reject(t), e._readyPromiseState = "rejected"
                }(e, t), e._readyPromise.catch(function() {})
            }

            function _(e) {
                var t = e._ownerWritableStream;
                q(void 0 !== t), q(t._writer === e);
                var n = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
                y(e, n), b(e, n), t._writer = void 0, e._ownerWritableStream = void 0
            }

            function w(e, t) {
                var n = e._ownerWritableStream;
                q(void 0 !== n);
                var r = n._writableStreamController,
                    i = function(e, t) {
                        var n = e._strategySize;
                        if (void 0 === n) return 1;
                        try {
                            return n(t)
                        } catch (t) {
                            return A(e, t), 1
                        }
                    }(r, t);
                if (n !== e._ownerWritableStream) return Promise.reject(E("write to"));
                var a = n._state;
                if ("errored" === a) return Promise.reject(n._storedError);
                if (!0 === d(n) || "closed" === a) return Promise.reject(new TypeError("The stream is closing or closed and cannot be written to"));
                if ("erroring" === a) return Promise.reject(n._storedError);
                q("writable" === a);
                var s = function(e) {
                    return q(!0 === o(e)), q("writable" === e._state), new Promise(function(t, n) {
                        var r = {
                            _resolve: t,
                            _reject: n
                        };
                        e._writeRequests.push(r)
                    })
                }(n);
                return function(e, t, n) {
                    var r = {
                        chunk: t
                    };
                    try {
                        G(e, r, n)
                    } catch (t) {
                        return void A(e, t)
                    }
                    var i = e._controlledWritableStream;
                    if (!1 === d(i) && "writable" === i._state) {
                        var a = C(e);
                        v(i, a)
                    }
                    P(e)
                }(r, t, i), s
            }

            function S(e) {
                return e._strategyHWM - e._queueTotalSize
            }

            function P(e) {
                var t = e._controlledWritableStream;
                if (!1 !== e._started && void 0 === t._inFlightWriteRequest) {
                    var n = t._state;
                    if ("closed" !== n && "errored" !== n)
                        if ("erroring" !== n) {
                            if (0 !== e._queue.length) {
                                var r = X(e);
                                "close" === r ? function(e) {
                                    var t = e._controlledWritableStream;
                                    (function(e) {
                                        q(void 0 === e._inFlightCloseRequest), q(void 0 !== e._closeRequest), e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0
                                    })(t), H(e), q(0 === e._queue.length, "queue must be empty once the final write record is dequeued");
                                    B(e._underlyingSink, "close", []).then(function() {
                                        h(t)
                                    }, function(e) {
                                        ! function(e, t) {
                                            q(void 0 !== e._inFlightCloseRequest), e._inFlightCloseRequest._reject(t), e._inFlightCloseRequest = void 0, q("writable" === e._state || "erroring" === e._state), void 0 !== e._pendingAbortRequest && (e._pendingAbortRequest._reject(t), e._pendingAbortRequest = void 0), l(e, t)
                                        }(t, e)
                                    }).catch(W)
                                }(e) : function(e, t) {
                                    var n = e._controlledWritableStream;
                                    ! function(e) {
                                        q(void 0 === e._inFlightWriteRequest, "there must be no pending write request"), q(0 !== e._writeRequests.length, "writeRequests must not be empty"), e._inFlightWriteRequest = e._writeRequests.shift()
                                    }(n);
                                    B(e._underlyingSink, "write", [t, e]).then(function() {
                                        ! function(e) {
                                            q(void 0 !== e._inFlightWriteRequest), e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0
                                        }(n);
                                        var t = n._state;
                                        if (q("writable" === t || "erroring" === t), H(e), !1 === d(n) && "writable" === t) {
                                            var r = C(e);
                                            v(n, r)
                                        }
                                        P(e)
                                    }, function(e) {
                                        ! function(e, t) {
                                            q(void 0 !== e._inFlightWriteRequest), e._inFlightWriteRequest._reject(t), e._inFlightWriteRequest = void 0, q("writable" === e._state || "erroring" === e._state), l(e, t)
                                        }(n, e)
                                    }).catch(W)
                                }(e, r.chunk)
                            }
                        } else c(t)
                }
            }

            function A(e, t) {
                "writable" === e._controlledWritableStream._state && k(e, t)
            }

            function C(e) {
                return S(e) <= 0
            }

            function k(e, t) {
                var n = e._controlledWritableStream;
                q("writable" === n._state), u(n, t)
            }

            function T(e) {
                return new TypeError("WritableStream.prototype." + e + " can only be used on a WritableStream")
            }

            function x(e) {
                return new TypeError("WritableStreamDefaultWriter.prototype." + e + " can only be used on a WritableStreamDefaultWriter")
            }

            function E(e) {
                return new TypeError("Cannot " + e + " a stream using a released writer")
            }

            function R(e) {
                e._closedPromise = new Promise(function(t, n) {
                    e._closedPromise_resolve = t, e._closedPromise_reject = n, e._closedPromiseState = "pending"
                })
            }

            function L(e, t) {
                q(void 0 !== e._closedPromise_resolve, "writer._closedPromise_resolve !== undefined"), q(void 0 !== e._closedPromise_reject, "writer._closedPromise_reject !== undefined"), q("pending" === e._closedPromiseState, "writer._closedPromiseState is pending"), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected"
            }

            function I(e, t) {
                e._readyPromise = Promise.reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected"
            }

            function F(e) {
                e._readyPromise = Promise.resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled"
            }

            function D(e) {
                q(void 0 !== e._readyPromise_resolve, "writer._readyPromise_resolve !== undefined"), q(void 0 !== e._readyPromise_reject, "writer._readyPromise_reject !== undefined"), e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled"
            }
            var O = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                N = n(0),
                M = N.InvokeOrNoop,
                B = N.PromiseInvokeOrNoop,
                j = N.ValidateAndNormalizeQueuingStrategy,
                V = N.typeIsObject,
                U = n(1),
                q = U.assert,
                W = U.rethrowAssertionErrorRejection,
                z = n(3),
                H = z.DequeueValue,
                G = z.EnqueueValueWithSize,
                X = z.PeekQueueValue,
                J = z.ResetQueue,
                Y = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            i = n.size,
                            a = n.highWaterMark,
                            o = void 0 === a ? 1 : a;
                        r(this, e), this._state = "writable", this._storedError = void 0, this._writer = void 0, this._writableStreamController = void 0, this._writeRequests = [], this._inFlightWriteRequest = void 0, this._closeRequest = void 0, this._inFlightCloseRequest = void 0, this._pendingAbortRequest = void 0, this._backpressure = !1;
                        if (void 0 !== t.type) throw new RangeError("Invalid type is specified");
                        this._writableStreamController = new K(this, t, i, o), this._writableStreamController.__startSteps()
                    }
                    return O(e, [{
                        key: "abort",
                        value: function(e) {
                            return !1 === a(this) ? Promise.reject(T("abort")) : !0 === o(this) ? Promise.reject(new TypeError("Cannot abort a stream that already has a writer")) : s(this, e)
                        }
                    }, {
                        key: "getWriter",
                        value: function() {
                            if (!1 === a(this)) throw T("getWriter");
                            return i(this)
                        }
                    }, {
                        key: "locked",
                        get: function() {
                            if (!1 === a(this)) throw T("locked");
                            return o(this)
                        }
                    }]), e
                }();
            e.exports = {
                AcquireWritableStreamDefaultWriter: i,
                IsWritableStream: a,
                IsWritableStreamLocked: o,
                WritableStream: Y,
                WritableStreamAbort: s,
                WritableStreamDefaultControllerError: k,
                WritableStreamDefaultWriterCloseWithErrorPropagation: function(e) {
                    var t = e._ownerWritableStream;
                    q(void 0 !== t);
                    var n = t._state;
                    return !0 === d(t) || "closed" === n ? Promise.resolve() : "errored" === n ? Promise.reject(t._storedError) : (q("writable" === n || "erroring" === n), m(e))
                },
                WritableStreamDefaultWriterRelease: _,
                WritableStreamDefaultWriterWrite: w,
                WritableStreamCloseQueuedOrInFlight: d
            };
            var Q = function() {
                    function e(t) {
                        if (r(this, e), !1 === a(t)) throw new TypeError("WritableStreamDefaultWriter can only be constructed with a WritableStream instance");
                        if (!0 === o(t)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
                        this._ownerWritableStream = t, t._writer = this;
                        var n = t._state;
                        if ("writable" === n) !1 === d(t) && !0 === t._backpressure ? function(e) {
                            e._readyPromise = new Promise(function(t, n) {
                                e._readyPromise_resolve = t, e._readyPromise_reject = n
                            }), e._readyPromiseState = "pending"
                        }(this) : F(this), R(this);
                        else if ("erroring" === n) I(this, t._storedError), this._readyPromise.catch(function() {}), R(this);
                        else if ("closed" === n) F(this),
                            function(e) {
                                e._closedPromise = Promise.resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved"
                            }(this);
                        else {
                            q("errored" === n, "state must be errored");
                            var i = t._storedError;
                            I(this, i), this._readyPromise.catch(function() {}),
                                function(e, t) {
                                    e._closedPromise = Promise.reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected"
                                }(this, i), this._closedPromise.catch(function() {})
                        }
                    }
                    return O(e, [{
                        key: "abort",
                        value: function(e) {
                            return !1 === g(this) ? Promise.reject(x("abort")) : void 0 === this._ownerWritableStream ? Promise.reject(E("abort")) : function(e, t) {
                                var n = e._ownerWritableStream;
                                return q(void 0 !== n), s(n, t)
                            }(this, e)
                        }
                    }, {
                        key: "close",
                        value: function() {
                            if (!1 === g(this)) return Promise.reject(x("close"));
                            var e = this._ownerWritableStream;
                            return void 0 === e ? Promise.reject(E("close")) : !0 === d(e) ? Promise.reject(new TypeError("cannot close an already-closing stream")) : m(this)
                        }
                    }, {
                        key: "releaseLock",
                        value: function() {
                            if (!1 === g(this)) throw x("releaseLock");
                            var e = this._ownerWritableStream;
                            void 0 !== e && (q(void 0 !== e._writer), _(this))
                        }
                    }, {
                        key: "write",
                        value: function(e) {
                            return !1 === g(this) ? Promise.reject(x("write")) : void 0 === this._ownerWritableStream ? Promise.reject(E("write to")) : w(this, e)
                        }
                    }, {
                        key: "closed",
                        get: function() {
                            return !1 === g(this) ? Promise.reject(x("closed")) : this._closedPromise
                        }
                    }, {
                        key: "desiredSize",
                        get: function() {
                            if (!1 === g(this)) throw x("desiredSize");
                            if (void 0 === this._ownerWritableStream) throw E("desiredSize");
                            return function(e) {
                                var t = e._ownerWritableStream,
                                    n = t._state;
                                return "errored" === n || "erroring" === n ? null : "closed" === n ? 0 : S(t._writableStreamController)
                            }(this)
                        }
                    }, {
                        key: "ready",
                        get: function() {
                            return !1 === g(this) ? Promise.reject(x("ready")) : this._readyPromise
                        }
                    }]), e
                }(),
                K = function() {
                    function e(t, n, i, o) {
                        if (r(this, e), !1 === a(t)) throw new TypeError("WritableStreamDefaultController can only be constructed with a WritableStream instance");
                        if (void 0 !== t._writableStreamController) throw new TypeError("WritableStreamDefaultController instances can only be created by the WritableStream constructor");
                        this._controlledWritableStream = t, this._underlyingSink = n, this._queue = void 0, this._queueTotalSize = void 0, J(this), this._started = !1;
                        var s = j(i, o);
                        this._strategySize = s.size, this._strategyHWM = s.highWaterMark;
                        v(t, C(this))
                    }
                    return O(e, [{
                        key: "error",
                        value: function(e) {
                            if (!1 === function(e) {
                                    return !!V(e) && !!Object.prototype.hasOwnProperty.call(e, "_underlyingSink")
                                }(this)) throw new TypeError("WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController");
                            "writable" === this._controlledWritableStream._state && k(this, e)
                        }
                    }, {
                        key: "__abortSteps",
                        value: function(e) {
                            return B(this._underlyingSink, "abort", [e])
                        }
                    }, {
                        key: "__errorSteps",
                        value: function() {
                            J(this)
                        }
                    }, {
                        key: "__startSteps",
                        value: function() {
                            var e = this,
                                t = M(this._underlyingSink, "start", [this]),
                                n = this._controlledWritableStream;
                            Promise.resolve(t).then(function() {
                                q("writable" === n._state || "erroring" === n._state), e._started = !0, P(e)
                            }, function(t) {
                                q("writable" === n._state || "erroring" === n._state), e._started = !0, l(n, t)
                            }).catch(W)
                        }
                    }]), e
                }()
        }, function(e, t, n) {
            var r = n(0).IsFiniteNonNegativeNumber,
                i = n(1).assert;
            t.DequeueValue = function(e) {
                i("_queue" in e && "_queueTotalSize" in e, "Spec-level failure: DequeueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."), i(e._queue.length > 0, "Spec-level failure: should never dequeue from an empty queue.");
                var t = e._queue.shift();
                return e._queueTotalSize -= t.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t.value
            }, t.EnqueueValueWithSize = function(e, t, n) {
                if (i("_queue" in e && "_queueTotalSize" in e, "Spec-level failure: EnqueueValueWithSize should only be used on containers with [[queue]] and [[queueTotalSize]]."), n = Number(n), !r(n)) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
                e._queue.push({
                    value: t,
                    size: n
                }), e._queueTotalSize += n
            }, t.PeekQueueValue = function(e) {
                i("_queue" in e && "_queueTotalSize" in e, "Spec-level failure: PeekQueueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."), i(e._queue.length > 0, "Spec-level failure: should never peek at an empty queue.");
                return e._queue[0].value
            }, t.ResetQueue = function(e) {
                i("_queue" in e && "_queueTotalSize" in e, "Spec-level failure: ResetQueue should only be used on containers with [[queue]] and [[queueTotalSize]]."), e._queue = [], e._queueTotalSize = 0
            }
        }, function(e, t, n) {
            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e) {
                return new Fe(e)
            }

            function a(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_readableStreamController")
            }

            function o(e) {
                return me(!0 === a(e), "IsReadableStreamLocked should only be used on known readable streams"), void 0 !== e._reader
            }

            function s(e, t) {
                me(!0 === a(e)), me("boolean" == typeof t);
                var n = i(e),
                    r = {
                        closedOrErrored: !1,
                        canceled1: !1,
                        canceled2: !1,
                        reason1: void 0,
                        reason2: void 0
                    };
                r.promise = new Promise(function(e) {
                    r._resolve = e
                });
                var o = function() {
                    function e() {
                        var t = e._branch1,
                            n = e._branch2,
                            r = e._teeState;
                        return A(e._reader).then(function(e) {
                            me(ve(e));
                            var i = e.value,
                                a = e.done;
                            if (me("boolean" == typeof a), !0 === a && !1 === r.closedOrErrored && (!1 === r.canceled1 && T(t), !1 === r.canceled2 && T(n), r.closedOrErrored = !0), !0 !== r.closedOrErrored) {
                                var o = i,
                                    s = i;
                                !1 === r.canceled1 && x(t, o), !1 === r.canceled2 && x(n, s)
                            }
                        })
                    }
                    return e
                }();
                o._reader = n, o._teeState = r, o._cloneForBranch2 = t;
                var s = function() {
                    function e(t) {
                        var n = e._stream,
                            r = e._teeState;
                        if (r.canceled1 = !0, r.reason1 = t, !0 === r.canceled2) {
                            var i = fe([r.reason1, r.reason2]),
                                a = c(n, i);
                            r._resolve(a)
                        }
                        return r.promise
                    }
                    return e
                }();
                s._stream = e, s._teeState = r;
                var l = function() {
                    function e(t) {
                        var n = e._stream,
                            r = e._teeState;
                        if (r.canceled2 = !0, r.reason2 = t, !0 === r.canceled1) {
                            var i = fe([r.reason1, r.reason2]),
                                a = c(n, i);
                            r._resolve(a)
                        }
                        return r.promise
                    }
                    return e
                }();
                l._stream = e, l._teeState = r;
                var u = Object.create(Object.prototype);
                pe(u, "pull", o), pe(u, "cancel", s);
                var h = new Ie(u),
                    d = Object.create(Object.prototype);
                pe(d, "pull", o), pe(d, "cancel", l);
                var f = new Ie(d);
                return o._branch1 = h._readableStreamController, o._branch2 = f._readableStreamController, n._closedPromise.catch(function(e) {
                    !0 !== r.closedOrErrored && (E(o._branch1, e), E(o._branch2, e), r.closedOrErrored = !0)
                }), [h, f]
            }

            function l(e) {
                me(!0 === b(e._reader)), me("readable" === e._state || "closed" === e._state);
                return new Promise(function(t, n) {
                    var r = {
                        _resolve: t,
                        _reject: n
                    };
                    e._reader._readIntoRequests.push(r)
                })
            }

            function u(e) {
                me(!0 === y(e._reader)), me("readable" === e._state);
                return new Promise(function(t, n) {
                    var r = {
                        _resolve: t,
                        _reject: n
                    };
                    e._reader._readRequests.push(r)
                })
            }

            function c(e, t) {
                if (e._disturbed = !0, "closed" === e._state) return Promise.resolve(void 0);
                if ("errored" === e._state) return Promise.reject(e._storedError);
                h(e);
                return e._readableStreamController.__cancelSteps(t).then(function() {})
            }

            function h(e) {
                me("readable" === e._state), e._state = "closed";
                var t = e._reader;
                if (void 0 !== t) {
                    if (!0 === y(t)) {
                        for (var n = 0; n < t._readRequests.length; n++) {
                            (0, t._readRequests[n]._resolve)(ae(void 0, !0))
                        }
                        t._readRequests = []
                    }! function(e) {
                        me(void 0 !== e._closedPromise_resolve), me(void 0 !== e._closedPromise_reject), e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0
                    }(t)
                }
            }

            function d(e, t) {
                me(!0 === a(e), "stream must be ReadableStream"), me("readable" === e._state, "state must be readable"), e._state = "errored", e._storedError = t;
                var n = e._reader;
                if (void 0 !== n) {
                    if (!0 === y(n)) {
                        for (var r = 0; r < n._readRequests.length; r++) {
                            n._readRequests[r]._reject(t)
                        }
                        n._readRequests = []
                    } else {
                        me(b(n), "reader must be ReadableStreamBYOBReader");
                        for (var i = 0; i < n._readIntoRequests.length; i++) {
                            n._readIntoRequests[i]._reject(t)
                        }
                        n._readIntoRequests = []
                    }
                    K(n, t), n._closedPromise.catch(function() {})
                }
            }

            function f(e, t, n) {
                var r = e._reader;
                me(r._readRequests.length > 0);
                r._readRequests.shift()._resolve(ae(t, n))
            }

            function p(e) {
                return e._reader._readIntoRequests.length
            }

            function v(e) {
                return e._reader._readRequests.length
            }

            function g(e) {
                var t = e._reader;
                return void 0 !== t && !1 !== b(t)
            }

            function m(e) {
                var t = e._reader;
                return void 0 !== t && !1 !== y(t)
            }

            function b(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_readIntoRequests")
            }

            function y(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_readRequests")
            }

            function _(e, t) {
                e._ownerReadableStream = t, t._reader = e, "readable" === t._state ? function(e) {
                    e._closedPromise = new Promise(function(t, n) {
                        e._closedPromise_resolve = t, e._closedPromise_reject = n
                    })
                }(e) : "closed" === t._state ? function(e) {
                    e._closedPromise = Promise.resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0
                }(e) : (me("errored" === t._state, "state must be errored"), function(e, t) {
                    e._closedPromise = Promise.reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0
                }(e, t._storedError), e._closedPromise.catch(function() {}))
            }

            function w(e, t) {
                var n = e._ownerReadableStream;
                return me(void 0 !== n), c(n, t)
            }

            function S(e) {
                me(void 0 !== e._ownerReadableStream), me(e._ownerReadableStream._reader === e), "readable" === e._ownerReadableStream._state ? K(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : function(e, t) {
                    me(void 0 === e._closedPromise_resolve), me(void 0 === e._closedPromise_reject), e._closedPromise = Promise.reject(t)
                }(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), e._closedPromise.catch(function() {}), e._ownerReadableStream._reader = void 0, e._ownerReadableStream = void 0
            }

            function P(e, t) {
                var n = e._ownerReadableStream;
                return me(void 0 !== n), n._disturbed = !0, "errored" === n._state ? Promise.reject(n._storedError) : function(e, t) {
                    var n = e._controlledReadableStream,
                        r = 1;
                    t.constructor !== DataView && (r = t.constructor.BYTES_PER_ELEMENT);
                    var i = t.constructor,
                        a = {
                            buffer: t.buffer,
                            byteOffset: t.byteOffset,
                            byteLength: t.byteLength,
                            bytesFilled: 0,
                            elementSize: r,
                            ctor: i,
                            readerType: "byob"
                        };
                    if (e._pendingPullIntos.length > 0) return a.buffer = ue(a.buffer), e._pendingPullIntos.push(a), l(n);
                    if ("closed" === n._state) {
                        var o = new t.constructor(a.buffer, a.byteOffset, 0);
                        return Promise.resolve(ae(o, !0))
                    }
                    if (e._queueTotalSize > 0) {
                        if (!0 === j(e, a)) {
                            var s = M(a);
                            return U(e), Promise.resolve(ae(s, !1))
                        }
                        if (!0 === e._closeRequested) {
                            var u = new TypeError("Insufficient bytes to fill elements in the given buffer");
                            return G(e, u), Promise.reject(u)
                        }
                    }
                    a.buffer = ue(a.buffer), e._pendingPullIntos.push(a);
                    var c = l(n);
                    return D(e), c
                }(n._readableStreamController, t)
            }

            function A(e) {
                var t = e._ownerReadableStream;
                return me(void 0 !== t), t._disturbed = !0, "closed" === t._state ? Promise.resolve(ae(void 0, !0)) : "errored" === t._state ? Promise.reject(t._storedError) : (me("readable" === t._state), t._readableStreamController.__pullSteps())
            }

            function C(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_underlyingSource")
            }

            function k(e) {
                if (!1 !== function(e) {
                        var t = e._controlledReadableStream;
                        if ("closed" === t._state || "errored" === t._state) return !1;
                        if (!0 === e._closeRequested) return !1;
                        if (!1 === e._started) return !1;
                        if (!0 === o(t) && v(t) > 0) return !0;
                        if (L(e) > 0) return !0;
                        return !1
                    }(e))
                    if (!0 !== e._pulling) {
                        me(!1 === e._pullAgain), e._pulling = !0;
                        le(e._underlyingSource, "pull", [e]).then(function() {
                            if (e._pulling = !1, !0 === e._pullAgain) return e._pullAgain = !1, k(e)
                        }, function(t) {
                            R(e, t)
                        }).catch(be)
                    } else e._pullAgain = !0
            }

            function T(e) {
                var t = e._controlledReadableStream;
                me(!1 === e._closeRequested), me("readable" === t._state), e._closeRequested = !0, 0 === e._queue.length && h(t)
            }

            function x(e, t) {
                var n = e._controlledReadableStream;
                if (me(!1 === e._closeRequested), me("readable" === n._state), !0 === o(n) && v(n) > 0) f(n, t, !1);
                else {
                    var r = 1;
                    if (void 0 !== e._strategySize) {
                        var i = e._strategySize;
                        try {
                            r = i(t)
                        } catch (t) {
                            throw R(e, t), t
                        }
                    }
                    try {
                        we(e, t, r)
                    } catch (t) {
                        throw R(e, t), t
                    }
                }
                k(e)
            }

            function E(e, t) {
                var n = e._controlledReadableStream;
                me("readable" === n._state), Se(e), d(n, t)
            }

            function R(e, t) {
                "readable" === e._controlledReadableStream._state && E(e, t)
            }

            function L(e) {
                var t = e._controlledReadableStream._state;
                return "errored" === t ? null : "closed" === t ? 0 : e._strategyHWM - e._queueTotalSize
            }

            function I(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_underlyingByteSource")
            }

            function F(e) {
                return !!ve(e) && !!Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController")
            }

            function D(e) {
                if (!1 !== function(e) {
                        var t = e._controlledReadableStream;
                        if ("readable" !== t._state) return !1;
                        if (!0 === e._closeRequested) return !1;
                        if (!1 === e._started) return !1;
                        if (!0 === m(t) && v(t) > 0) return !0;
                        if (!0 === g(t) && p(t) > 0) return !0;
                        if (X(e) > 0) return !0;
                        return !1
                    }(e))
                    if (!0 !== e._pulling) {
                        me(!1 === e._pullAgain), e._pulling = !0;
                        le(e._underlyingByteSource, "pull", [e]).then(function() {
                            e._pulling = !1, !0 === e._pullAgain && (e._pullAgain = !1, D(e))
                        }, function(t) {
                            "readable" === e._controlledReadableStream._state && G(e, t)
                        }).catch(be)
                    } else e._pullAgain = !0
            }

            function O(e) {
                q(e), e._pendingPullIntos = []
            }

            function N(e, t) {
                me("errored" !== e._state, "state must not be errored");
                var n = !1;
                "closed" === e._state && (me(0 === t.bytesFilled), n = !0);
                var r = M(t);
                "default" === t.readerType ? f(e, r, n) : (me("byob" === t.readerType), function(e, t, n) {
                    var r = e._reader;
                    me(r._readIntoRequests.length > 0), r._readIntoRequests.shift()._resolve(ae(t, n))
                }(e, r, n))
            }

            function M(e) {
                var t = e.bytesFilled,
                    n = e.elementSize;
                return me(t <= e.byteLength), me(t % n == 0), new e.ctor(e.buffer, e.byteOffset, t / n)
            }

            function B(e, t, n, r) {
                e._queue.push({
                    buffer: t,
                    byteOffset: n,
                    byteLength: r
                }), e._queueTotalSize += r
            }

            function j(e, t) {
                var n = t.elementSize,
                    r = t.bytesFilled - t.bytesFilled % n,
                    i = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled),
                    a = t.bytesFilled + i,
                    o = a - a % n,
                    s = i,
                    l = !1;
                o > r && (s = o - t.bytesFilled, l = !0);
                for (var u = e._queue; s > 0;) {
                    var c = u[0],
                        h = Math.min(s, c.byteLength),
                        d = t.byteOffset + t.bytesFilled;
                    ie(t.buffer, d, c.buffer, c.byteOffset, h), c.byteLength === h ? u.shift() : (c.byteOffset += h, c.byteLength -= h), e._queueTotalSize -= h, V(e, h, t), s -= h
                }
                return !1 === l && (me(0 === e._queueTotalSize, "queue must be empty"), me(t.bytesFilled > 0), me(t.bytesFilled < t.elementSize)), l
            }

            function V(e, t, n) {
                me(0 === e._pendingPullIntos.length || e._pendingPullIntos[0] === n), q(e), n.bytesFilled += t
            }

            function U(e) {
                me("readable" === e._controlledReadableStream._state), 0 === e._queueTotalSize && !0 === e._closeRequested ? h(e._controlledReadableStream) : D(e)
            }

            function q(e) {
                void 0 !== e._byobRequest && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = void 0, e._byobRequest = void 0)
            }

            function W(e) {
                for (me(!1 === e._closeRequested); e._pendingPullIntos.length > 0;) {
                    if (0 === e._queueTotalSize) return;
                    var t = e._pendingPullIntos[0];
                    !0 === j(e, t) && (H(e), N(e._controlledReadableStream, t))
                }
            }

            function z(e, t) {
                var n = e._pendingPullIntos[0],
                    r = e._controlledReadableStream;
                if ("closed" === r._state) {
                    if (0 !== t) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
                    ! function(e, t) {
                        t.buffer = ue(t.buffer), me(0 === t.bytesFilled, "bytesFilled must be 0");
                        var n = e._controlledReadableStream;
                        if (!0 === g(n))
                            for (; p(n) > 0;) N(n, H(e))
                    }(e, n)
                } else me("readable" === r._state),
                    function(e, t, n) {
                        if (n.bytesFilled + t > n.byteLength) throw new RangeError("bytesWritten out of range");
                        if (V(e, t, n), !(n.bytesFilled < n.elementSize)) {
                            H(e);
                            var r = n.bytesFilled % n.elementSize;
                            if (r > 0) {
                                var i = n.byteOffset + n.bytesFilled,
                                    a = n.buffer.slice(i - r, i);
                                B(e, a, 0, a.byteLength)
                            }
                            n.buffer = ue(n.buffer), n.bytesFilled -= r, N(e._controlledReadableStream, n), W(e)
                        }
                    }(e, t, n)
            }

            function H(e) {
                var t = e._pendingPullIntos.shift();
                return q(e), t
            }

            function G(e, t) {
                var n = e._controlledReadableStream;
                me("readable" === n._state), O(e), Se(e), d(n, t)
            }

            function X(e) {
                var t = e._controlledReadableStream._state;
                return "errored" === t ? null : "closed" === t ? 0 : e._strategyHWM - e._queueTotalSize
            }

            function J(e) {
                return new TypeError("ReadableStream.prototype." + e + " can only be used on a ReadableStream")
            }

            function Y(e) {
                return new TypeError("Cannot " + e + " a stream using a released reader")
            }

            function Q(e) {
                return new TypeError("ReadableStreamDefaultReader.prototype." + e + " can only be used on a ReadableStreamDefaultReader")
            }

            function K(e, t) {
                me(void 0 !== e._closedPromise_resolve), me(void 0 !== e._closedPromise_reject), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0
            }

            function Z(e) {
                return new TypeError("ReadableStreamBYOBReader.prototype." + e + " can only be used on a ReadableStreamBYOBReader")
            }

            function $(e) {
                return new TypeError("ReadableStreamDefaultController.prototype." + e + " can only be used on a ReadableStreamDefaultController")
            }

            function ee(e) {
                return new TypeError("ReadableStreamBYOBRequest.prototype." + e + " can only be used on a ReadableStreamBYOBRequest")
            }

            function te(e) {
                return new TypeError("ReadableByteStreamController.prototype." + e + " can only be used on a ReadableByteStreamController")
            }
            var ne = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                re = n(0),
                ie = re.ArrayBufferCopy,
                ae = re.CreateIterResultObject,
                oe = re.IsFiniteNonNegativeNumber,
                se = re.InvokeOrNoop,
                le = re.PromiseInvokeOrNoop,
                ue = re.TransferArrayBuffer,
                ce = re.ValidateAndNormalizeQueuingStrategy,
                he = re.ValidateAndNormalizeHighWaterMark,
                de = n(0),
                fe = de.createArrayFromList,
                pe = de.createDataProperty,
                ve = de.typeIsObject,
                ge = n(1),
                me = ge.assert,
                be = ge.rethrowAssertionErrorRejection,
                ye = n(3),
                _e = ye.DequeueValue,
                we = ye.EnqueueValueWithSize,
                Se = ye.ResetQueue,
                Pe = n(2),
                Ae = Pe.AcquireWritableStreamDefaultWriter,
                Ce = Pe.IsWritableStream,
                ke = Pe.IsWritableStreamLocked,
                Te = Pe.WritableStreamAbort,
                xe = Pe.WritableStreamDefaultWriterCloseWithErrorPropagation,
                Ee = Pe.WritableStreamDefaultWriterRelease,
                Re = Pe.WritableStreamDefaultWriterWrite,
                Le = Pe.WritableStreamCloseQueuedOrInFlight,
                Ie = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            i = n.size,
                            a = n.highWaterMark;
                        r(this, e), this._state = "readable", this._reader = void 0, this._storedError = void 0, this._disturbed = !1, this._readableStreamController = void 0;
                        var o = t.type;
                        if ("bytes" === String(o)) void 0 === a && (a = 0), this._readableStreamController = new Me(this, t, a);
                        else {
                            if (void 0 !== o) throw new RangeError("Invalid type is specified");
                            void 0 === a && (a = 1), this._readableStreamController = new Oe(this, t, i, a)
                        }
                    }
                    return ne(e, [{
                        key: "cancel",
                        value: function(e) {
                            return !1 === a(this) ? Promise.reject(J("cancel")) : !0 === o(this) ? Promise.reject(new TypeError("Cannot cancel a stream that already has a reader")) : c(this, e)
                        }
                    }, {
                        key: "getReader",
                        value: function() {
                            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).mode;
                            if (!1 === a(this)) throw J("getReader");
                            if (void 0 === e) return i(this);
                            if ("byob" === (e = String(e))) return function(e) {
                                return new De(e)
                            }(this);
                            throw new RangeError("Invalid mode is specified")
                        }
                    }, {
                        key: "pipeThrough",
                        value: function(e, t) {
                            var n = e.writable,
                                r = e.readable;
                            return function(e) {
                                try {
                                    Promise.prototype.then.call(e, void 0, function() {})
                                } catch (e) {}
                            }(this.pipeTo(n, t)), r
                        }
                    }, {
                        key: "pipeTo",
                        value: function(e) {
                            var t = this,
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                r = n.preventClose,
                                s = n.preventAbort,
                                l = n.preventCancel;
                            if (!1 === a(this)) return Promise.reject(J("pipeTo"));
                            if (!1 === Ce(e)) return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
                            if (r = Boolean(r), s = Boolean(s), l = Boolean(l), !0 === o(this)) return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
                            if (!0 === ke(e)) return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
                            var u = i(this),
                                h = Ae(e),
                                d = !1,
                                f = Promise.resolve();
                            return new Promise(function(n, i) {
                                function a() {
                                    return f = Promise.resolve(), !0 === d ? Promise.resolve() : h._readyPromise.then(function() {
                                        return A(u).then(function(e) {
                                            var t = e.value;
                                            !0 !== e.done && (f = Re(h, t).catch(function() {}))
                                        })
                                    }).then(a)
                                }

                                function o() {
                                    var e = f;
                                    return f.then(function() {
                                        return e !== f ? o() : void 0
                                    })
                                }

                                function p(e, t, n) {
                                    "errored" === e._state ? n(e._storedError) : t.catch(n).catch(be)
                                }

                                function v(t, n, r) {
                                    function i() {
                                        t().then(function() {
                                            return m(n, r)
                                        }, function(e) {
                                            return m(!0, e)
                                        }).catch(be)
                                    }!0 !== d && (d = !0, "writable" === e._state && !1 === Le(e) ? o().then(i) : i())
                                }

                                function g(t, n) {
                                    !0 !== d && (d = !0, "writable" === e._state && !1 === Le(e) ? o().then(function() {
                                        return m(t, n)
                                    }).catch(be) : m(t, n))
                                }

                                function m(e, t) {
                                    Ee(h), S(u), e ? i(t) : n(void 0)
                                }
                                if (p(t, u._closedPromise, function(t) {
                                        !1 === s ? v(function() {
                                            return Te(e, t)
                                        }, !0, t) : g(!0, t)
                                    }), p(e, h._closedPromise, function(e) {
                                        !1 === l ? v(function() {
                                            return c(t, e)
                                        }, !0, e) : g(!0, e)
                                    }), function(e, t, n) {
                                        "closed" === e._state ? n() : t.then(n).catch(be)
                                    }(t, u._closedPromise, function() {
                                        !1 === r ? v(function() {
                                            return xe(h)
                                        }) : g()
                                    }), !0 === Le(e) || "closed" === e._state) {
                                    var b = new TypeError("the destination writable stream closed before all data could be piped to it");
                                    !1 === l ? v(function() {
                                        return c(t, b)
                                    }, !0, b) : g(!0, b)
                                }
                                a().catch(function(e) {
                                    f = Promise.resolve(), be(e)
                                })
                            })
                        }
                    }, {
                        key: "tee",
                        value: function() {
                            if (!1 === a(this)) throw J("tee");
                            var e = s(this, !1);
                            return fe(e)
                        }
                    }, {
                        key: "locked",
                        get: function() {
                            if (!1 === a(this)) throw J("locked");
                            return o(this)
                        }
                    }]), e
                }();
            e.exports = {
                ReadableStream: Ie,
                IsReadableStreamDisturbed: function(e) {
                    return me(!0 === a(e), "IsReadableStreamDisturbed should only be used on known readable streams"), e._disturbed
                },
                ReadableStreamDefaultControllerClose: T,
                ReadableStreamDefaultControllerEnqueue: x,
                ReadableStreamDefaultControllerError: E,
                ReadableStreamDefaultControllerGetDesiredSize: L
            };
            var Fe = function() {
                    function e(t) {
                        if (r(this, e), !1 === a(t)) throw new TypeError("ReadableStreamDefaultReader can only be constructed with a ReadableStream instance");
                        if (!0 === o(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
                        _(this, t), this._readRequests = []
                    }
                    return ne(e, [{
                        key: "cancel",
                        value: function(e) {
                            return !1 === y(this) ? Promise.reject(Q("cancel")) : void 0 === this._ownerReadableStream ? Promise.reject(Y("cancel")) : w(this, e)
                        }
                    }, {
                        key: "read",
                        value: function() {
                            return !1 === y(this) ? Promise.reject(Q("read")) : void 0 === this._ownerReadableStream ? Promise.reject(Y("read from")) : A(this)
                        }
                    }, {
                        key: "releaseLock",
                        value: function() {
                            if (!1 === y(this)) throw Q("releaseLock");
                            if (void 0 !== this._ownerReadableStream) {
                                if (this._readRequests.length > 0) throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
                                S(this)
                            }
                        }
                    }, {
                        key: "closed",
                        get: function() {
                            return !1 === y(this) ? Promise.reject(Q("closed")) : this._closedPromise
                        }
                    }]), e
                }(),
                De = function() {
                    function e(t) {
                        if (r(this, e), !a(t)) throw new TypeError("ReadableStreamBYOBReader can only be constructed with a ReadableStream instance given a byte source");
                        if (!1 === I(t._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
                        if (o(t)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
                        _(this, t), this._readIntoRequests = []
                    }
                    return ne(e, [{
                        key: "cancel",
                        value: function(e) {
                            return b(this) ? void 0 === this._ownerReadableStream ? Promise.reject(Y("cancel")) : w(this, e) : Promise.reject(Z("cancel"))
                        }
                    }, {
                        key: "read",
                        value: function(e) {
                            return b(this) ? void 0 === this._ownerReadableStream ? Promise.reject(Y("read from")) : ArrayBuffer.isView(e) ? 0 === e.byteLength ? Promise.reject(new TypeError("view must have non-zero byteLength")) : P(this, e) : Promise.reject(new TypeError("view must be an array buffer view")) : Promise.reject(Z("read"))
                        }
                    }, {
                        key: "releaseLock",
                        value: function() {
                            if (!b(this)) throw Z("releaseLock");
                            if (void 0 !== this._ownerReadableStream) {
                                if (this._readIntoRequests.length > 0) throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
                                S(this)
                            }
                        }
                    }, {
                        key: "closed",
                        get: function() {
                            return b(this) ? this._closedPromise : Promise.reject(Z("closed"))
                        }
                    }]), e
                }(),
                Oe = function() {
                    function e(t, n, i, o) {
                        if (r(this, e), !1 === a(t)) throw new TypeError("ReadableStreamDefaultController can only be constructed with a ReadableStream instance");
                        if (void 0 !== t._readableStreamController) throw new TypeError("ReadableStreamDefaultController instances can only be created by the ReadableStream constructor");
                        this._controlledReadableStream = t, this._underlyingSource = n, this._queue = void 0, this._queueTotalSize = void 0, Se(this), this._started = !1, this._closeRequested = !1, this._pullAgain = !1, this._pulling = !1;
                        var s = ce(i, o);
                        this._strategySize = s.size, this._strategyHWM = s.highWaterMark;
                        var l = this,
                            u = se(n, "start", [this]);
                        Promise.resolve(u).then(function() {
                            l._started = !0, me(!1 === l._pulling), me(!1 === l._pullAgain), k(l)
                        }, function(e) {
                            R(l, e)
                        }).catch(be)
                    }
                    return ne(e, [{
                        key: "close",
                        value: function() {
                            if (!1 === C(this)) throw $("close");
                            if (!0 === this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
                            var e = this._controlledReadableStream._state;
                            if ("readable" !== e) throw new TypeError("The stream (in " + e + " state) is not in the readable state and cannot be closed");
                            T(this)
                        }
                    }, {
                        key: "enqueue",
                        value: function(e) {
                            if (!1 === C(this)) throw $("enqueue");
                            if (!0 === this._closeRequested) throw new TypeError("stream is closed or draining");
                            var t = this._controlledReadableStream._state;
                            if ("readable" !== t) throw new TypeError("The stream (in " + t + " state) is not in the readable state and cannot be enqueued to");
                            return x(this, e)
                        }
                    }, {
                        key: "error",
                        value: function(e) {
                            if (!1 === C(this)) throw $("error");
                            var t = this._controlledReadableStream;
                            if ("readable" !== t._state) throw new TypeError("The stream is " + t._state + " and so cannot be errored");
                            E(this, e)
                        }
                    }, {
                        key: "__cancelSteps",
                        value: function(e) {
                            return Se(this), le(this._underlyingSource, "cancel", [e])
                        }
                    }, {
                        key: "__pullSteps",
                        value: function() {
                            var e = this._controlledReadableStream;
                            if (this._queue.length > 0) {
                                var t = _e(this);
                                return !0 === this._closeRequested && 0 === this._queue.length ? h(e) : k(this), Promise.resolve(ae(t, !1))
                            }
                            var n = u(e);
                            return k(this), n
                        }
                    }, {
                        key: "desiredSize",
                        get: function() {
                            if (!1 === C(this)) throw $("desiredSize");
                            return L(this)
                        }
                    }]), e
                }(),
                Ne = function() {
                    function e(t, n) {
                        r(this, e), this._associatedReadableByteStreamController = t, this._view = n
                    }
                    return ne(e, [{
                        key: "respond",
                        value: function(e) {
                            if (!1 === F(this)) throw ee("respond");
                            if (void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
                            ! function(e, t) {
                                if (t = Number(t), !1 === oe(t)) throw new RangeError("bytesWritten must be a finite");
                                me(e._pendingPullIntos.length > 0), z(e, t)
                            }(this._associatedReadableByteStreamController, e)
                        }
                    }, {
                        key: "respondWithNewView",
                        value: function(e) {
                            if (!1 === F(this)) throw ee("respond");
                            if (void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
                            if (!ArrayBuffer.isView(e)) throw new TypeError("You can only respond with array buffer views");
                            ! function(e, t) {
                                me(e._pendingPullIntos.length > 0);
                                var n = e._pendingPullIntos[0];
                                if (n.byteOffset + n.bytesFilled !== t.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
                                if (n.byteLength !== t.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
                                n.buffer = t.buffer, z(e, t.byteLength)
                            }(this._associatedReadableByteStreamController, e)
                        }
                    }, {
                        key: "view",
                        get: function() {
                            return this._view
                        }
                    }]), e
                }(),
                Me = function() {
                    function e(t, n, i) {
                        if (r(this, e), !1 === a(t)) throw new TypeError("ReadableByteStreamController can only be constructed with a ReadableStream instance given a byte source");
                        if (void 0 !== t._readableStreamController) throw new TypeError("ReadableByteStreamController instances can only be created by the ReadableStream constructor given a byte source");
                        this._controlledReadableStream = t, this._underlyingByteSource = n, this._pullAgain = !1, this._pulling = !1, O(this), this._queue = this._queueTotalSize = void 0, Se(this), this._closeRequested = !1, this._started = !1, this._strategyHWM = he(i);
                        var o = n.autoAllocateChunkSize;
                        if (void 0 !== o && (!1 === Number.isInteger(o) || o <= 0)) throw new RangeError("autoAllocateChunkSize must be a positive integer");
                        this._autoAllocateChunkSize = o, this._pendingPullIntos = [];
                        var s = this,
                            l = se(n, "start", [this]);
                        Promise.resolve(l).then(function() {
                            s._started = !0, me(!1 === s._pulling), me(!1 === s._pullAgain), D(s)
                        }, function(e) {
                            "readable" === t._state && G(s, e)
                        }).catch(be)
                    }
                    return ne(e, [{
                        key: "close",
                        value: function() {
                            if (!1 === I(this)) throw te("close");
                            if (!0 === this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
                            var e = this._controlledReadableStream._state;
                            if ("readable" !== e) throw new TypeError("The stream (in " + e + " state) is not in the readable state and cannot be closed");
                            ! function(e) {
                                var t = e._controlledReadableStream;
                                if (me(!1 === e._closeRequested), me("readable" === t._state), e._queueTotalSize > 0) e._closeRequested = !0;
                                else {
                                    if (e._pendingPullIntos.length > 0 && e._pendingPullIntos[0].bytesFilled > 0) {
                                        var n = new TypeError("Insufficient bytes to fill elements in the given buffer");
                                        throw G(e, n), n
                                    }
                                    h(t)
                                }
                            }(this)
                        }
                    }, {
                        key: "enqueue",
                        value: function(e) {
                            if (!1 === I(this)) throw te("enqueue");
                            if (!0 === this._closeRequested) throw new TypeError("stream is closed or draining");
                            var t = this._controlledReadableStream._state;
                            if ("readable" !== t) throw new TypeError("The stream (in " + t + " state) is not in the readable state and cannot be enqueued to");
                            if (!ArrayBuffer.isView(e)) throw new TypeError("You can only enqueue array buffer views when using a ReadableByteStreamController");
                            ! function(e, t) {
                                var n = e._controlledReadableStream;
                                me(!1 === e._closeRequested), me("readable" === n._state);
                                var r = t.buffer,
                                    i = t.byteOffset,
                                    a = t.byteLength,
                                    s = ue(r);
                                !0 === m(n) ? 0 === v(n) ? B(e, s, i, a) : (me(0 === e._queue.length), f(n, new Uint8Array(s, i, a), !1)) : !0 === g(n) ? (B(e, s, i, a), W(e)) : (me(!1 === o(n), "stream must not be locked"), B(e, s, i, a))
                            }(this, e)
                        }
                    }, {
                        key: "error",
                        value: function(e) {
                            if (!1 === I(this)) throw te("error");
                            var t = this._controlledReadableStream;
                            if ("readable" !== t._state) throw new TypeError("The stream is " + t._state + " and so cannot be errored");
                            G(this, e)
                        }
                    }, {
                        key: "__cancelSteps",
                        value: function(e) {
                            if (this._pendingPullIntos.length > 0) {
                                this._pendingPullIntos[0].bytesFilled = 0
                            }
                            return Se(this), le(this._underlyingByteSource, "cancel", [e])
                        }
                    }, {
                        key: "__pullSteps",
                        value: function() {
                            var e = this._controlledReadableStream;
                            if (me(!0 === m(e)), this._queueTotalSize > 0) {
                                me(0 === v(e));
                                var t = this._queue.shift();
                                this._queueTotalSize -= t.byteLength, U(this);
                                var n = void 0;
                                try {
                                    n = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
                                } catch (e) {
                                    return Promise.reject(e)
                                }
                                return Promise.resolve(ae(n, !1))
                            }
                            var r = this._autoAllocateChunkSize;
                            if (void 0 !== r) {
                                var i = void 0;
                                try {
                                    i = new ArrayBuffer(r)
                                } catch (e) {
                                    return Promise.reject(e)
                                }
                                var a = {
                                    buffer: i,
                                    byteOffset: 0,
                                    byteLength: r,
                                    bytesFilled: 0,
                                    elementSize: 1,
                                    ctor: Uint8Array,
                                    readerType: "default"
                                };
                                this._pendingPullIntos.push(a)
                            }
                            var o = u(e);
                            return D(this), o
                        }
                    }, {
                        key: "byobRequest",
                        get: function() {
                            if (!1 === I(this)) throw te("byobRequest");
                            if (void 0 === this._byobRequest && this._pendingPullIntos.length > 0) {
                                var e = this._pendingPullIntos[0],
                                    t = new Uint8Array(e.buffer, e.byteOffset + e.bytesFilled, e.byteLength - e.bytesFilled);
                                this._byobRequest = new Ne(this, t)
                            }
                            return this._byobRequest
                        }
                    }, {
                        key: "desiredSize",
                        get: function() {
                            if (!1 === I(this)) throw te("desiredSize");
                            return X(this)
                        }
                    }]), e
                }()
        }, function(e, t, n) {
            var r = n(6),
                i = n(4),
                a = n(2);
            t.TransformStream = r.TransformStream, t.ReadableStream = i.ReadableStream, t.IsReadableStreamDisturbed = i.IsReadableStreamDisturbed, t.ReadableStreamDefaultControllerClose = i.ReadableStreamDefaultControllerClose, t.ReadableStreamDefaultControllerEnqueue = i.ReadableStreamDefaultControllerEnqueue, t.ReadableStreamDefaultControllerError = i.ReadableStreamDefaultControllerError, t.ReadableStreamDefaultControllerGetDesiredSize = i.ReadableStreamDefaultControllerGetDesiredSize, t.AcquireWritableStreamDefaultWriter = a.AcquireWritableStreamDefaultWriter, t.IsWritableStream = a.IsWritableStream, t.IsWritableStreamLocked = a.IsWritableStreamLocked, t.WritableStream = a.WritableStream, t.WritableStreamAbort = a.WritableStreamAbort, t.WritableStreamDefaultControllerError = a.WritableStreamDefaultControllerError, t.WritableStreamDefaultWriterCloseWithErrorPropagation = a.WritableStreamDefaultWriterCloseWithErrorPropagation, t.WritableStreamDefaultWriterRelease = a.WritableStreamDefaultWriterRelease, t.WritableStreamDefaultWriterWrite = a.WritableStreamDefaultWriterWrite
        }, function(e, t, n) {
            function r(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function i(e, t) {
                if (!0 === e._errored) throw new TypeError("TransformStream is already errored");
                if (!0 === e._readableClosed) throw new TypeError("Readable side is already closed");
                var n = e._readableController;
                try {
                    C(n, t)
                } catch (t) {
                    throw e._readableClosed = !0, o(e, t), e._storedError
                }!0 === T(n) <= 0 && !1 === e._backpressure && u(e, !0)
            }

            function a(e) {
                g(!1 === e._errored), g(!1 === e._readableClosed);
                try {
                    A(e._readableController)
                } catch (e) {
                    g(!1)
                }
                e._readableClosed = !0
            }

            function o(e, t) {
                !1 === e._errored && s(e, t)
            }

            function s(e, t) {
                g(!1 === e._errored), e._errored = !0, e._storedError = t, !1 === e._writableDone && R(e._writableController, t), !1 === e._readableClosed && k(e._readableController, t)
            }

            function l(e) {
                return g(void 0 !== e._backpressureChangePromise, "_backpressureChangePromise should have been initialized"), !1 === e._backpressure ? Promise.resolve() : (g(!0 === e._backpressure, "_backpressure should have been initialized"), e._backpressureChangePromise)
            }

            function u(e, t) {
                g(e._backpressure !== t, "TransformStreamSetBackpressure() should be called only when backpressure is changed"), void 0 !== e._backpressureChangePromise && e._backpressureChangePromise_resolve(t), e._backpressureChangePromise = new Promise(function(t) {
                    e._backpressureChangePromise_resolve = t
                }), e._backpressureChangePromise.then(function(e) {
                    g(e !== t, "_backpressureChangePromise should be fulfilled only when backpressure is changed")
                }), e._backpressure = t
            }

            function c(e, t) {
                return i(t._controlledTransformStream, e), Promise.resolve()
            }

            function h(e) {
                return !!w(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream")
            }

            function d(e) {
                return !!w(e) && !!Object.prototype.hasOwnProperty.call(e, "_transformStreamController")
            }

            function f(e) {
                return new TypeError("TransformStreamDefaultController.prototype." + e + " can only be used on a TransformStreamDefaultController")
            }

            function p(e) {
                return new TypeError("TransformStream.prototype." + e + " can only be used on a TransformStream")
            }
            var v = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                g = n(1).assert,
                m = n(0),
                b = m.InvokeOrNoop,
                y = m.PromiseInvokeOrPerformFallback,
                _ = m.PromiseInvokeOrNoop,
                w = m.typeIsObject,
                S = n(4),
                P = S.ReadableStream,
                A = S.ReadableStreamDefaultControllerClose,
                C = S.ReadableStreamDefaultControllerEnqueue,
                k = S.ReadableStreamDefaultControllerError,
                T = S.ReadableStreamDefaultControllerGetDesiredSize,
                x = n(2),
                E = x.WritableStream,
                R = x.WritableStreamDefaultControllerError,
                L = function() {
                    function e(t, n) {
                        r(this, e), this._transformStream = t, this._startPromise = n
                    }
                    return v(e, [{
                        key: "start",
                        value: function(e) {
                            var t = this._transformStream;
                            return t._writableController = e, this._startPromise.then(function() {
                                return l(t)
                            })
                        }
                    }, {
                        key: "write",
                        value: function(e) {
                            return function(e, t) {
                                g(!1 === e._errored), g(!1 === e._transforming), g(!1 === e._backpressure), e._transforming = !0;
                                var n = e._transformer,
                                    r = e._transformStreamController;
                                return y(n, "transform", [t, r], c, [t, r]).then(function() {
                                    return e._transforming = !1, l(e)
                                }, function(t) {
                                    return o(e, t), Promise.reject(t)
                                })
                            }(this._transformStream, e)
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            var e = this._transformStream;
                            e._writableDone = !0, s(e, new TypeError("Writable side aborted"))
                        }
                    }, {
                        key: "close",
                        value: function() {
                            var e = this._transformStream;
                            g(!1 === e._transforming), e._writableDone = !0;
                            return _(e._transformer, "flush", [e._transformStreamController]).then(function() {
                                return !0 === e._errored ? Promise.reject(e._storedError) : (!1 === e._readableClosed && a(e), Promise.resolve())
                            }).catch(function(t) {
                                return o(e, t), Promise.reject(e._storedError)
                            })
                        }
                    }]), e
                }(),
                I = function() {
                    function e(t, n) {
                        r(this, e), this._transformStream = t, this._startPromise = n
                    }
                    return v(e, [{
                        key: "start",
                        value: function(e) {
                            var t = this._transformStream;
                            return t._readableController = e, this._startPromise.then(function() {
                                return g(void 0 !== t._backpressureChangePromise, "_backpressureChangePromise should have been initialized"), !0 === t._backpressure ? Promise.resolve() : (g(!1 === t._backpressure, "_backpressure should have been initialized"), t._backpressureChangePromise)
                            })
                        }
                    }, {
                        key: "pull",
                        value: function() {
                            var e = this._transformStream;
                            return g(!0 === e._backpressure, "pull() should be never called while _backpressure is false"), g(void 0 !== e._backpressureChangePromise, "_backpressureChangePromise should have been initialized"), u(e, !1), e._backpressureChangePromise
                        }
                    }, {
                        key: "cancel",
                        value: function() {
                            var e = this._transformStream;
                            e._readableClosed = !0, s(e, new TypeError("Readable side canceled"))
                        }
                    }]), e
                }(),
                F = function() {
                    function e(t) {
                        if (r(this, e), !1 === d(t)) throw new TypeError("TransformStreamDefaultController can only be constructed with a TransformStream instance");
                        if (void 0 !== t._transformStreamController) throw new TypeError("TransformStreamDefaultController instances can only be created by the TransformStream constructor");
                        this._controlledTransformStream = t
                    }
                    return v(e, [{
                        key: "enqueue",
                        value: function(e) {
                            if (!1 === h(this)) throw f("enqueue");
                            i(this._controlledTransformStream, e)
                        }
                    }, {
                        key: "close",
                        value: function() {
                            if (!1 === h(this)) throw f("close");
                            ! function(e) {
                                if (!0 === e._errored) throw new TypeError("TransformStream is already errored");
                                if (!0 === e._readableClosed) throw new TypeError("Readable side is already closed");
                                a(e)
                            }(this._controlledTransformStream)
                        }
                    }, {
                        key: "error",
                        value: function(e) {
                            if (!1 === h(this)) throw f("error");
                            ! function(e, t) {
                                if (!0 === e._errored) throw new TypeError("TransformStream is already errored");
                                s(e, t)
                            }(this._controlledTransformStream, e)
                        }
                    }, {
                        key: "desiredSize",
                        get: function() {
                            if (!1 === h(this)) throw f("desiredSize");
                            var e = this._controlledTransformStream._readableController;
                            return T(e)
                        }
                    }]), e
                }(),
                D = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        r(this, e), this._transformer = t;
                        var n = t.readableStrategy,
                            i = t.writableStrategy;
                        this._transforming = !1, this._errored = !1, this._storedError = void 0, this._writableController = void 0, this._readableController = void 0, this._transformStreamController = void 0, this._writableDone = !1, this._readableClosed = !1, this._backpressure = void 0, this._backpressureChangePromise = void 0, this._backpressureChangePromise_resolve = void 0, this._transformStreamController = new F(this);
                        var a = void 0,
                            o = new Promise(function(e) {
                                a = e
                            }),
                            s = new I(this, o);
                        this._readable = new P(s, n);
                        var l = new L(this, o);
                        this._writable = new E(l, i), g(void 0 !== this._writableController), g(void 0 !== this._readableController);
                        u(this, T(this._readableController) <= 0);
                        var c = this,
                            h = b(t, "start", [c._transformStreamController]);
                        a(h), o.catch(function(e) {
                            !1 === c._errored && (c._errored = !0, c._storedError = e)
                        })
                    }
                    return v(e, [{
                        key: "readable",
                        get: function() {
                            if (!1 === d(this)) throw p("readable");
                            return this._readable
                        }
                    }, {
                        key: "writable",
                        get: function() {
                            if (!1 === d(this)) throw p("writable");
                            return this._writable
                        }
                    }]), e
                }();
            e.exports = {
                TransformStream: D
            }
        }, function(e, t, n) {
            e.exports = n(5)
        }]))
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PDFJS = t.globalScope = void 0;
        var r = n(69),
            i = n(13),
            a = n(0),
            o = n(72),
            s = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(n(20)),
            l = n(71),
            u = n(73),
            c = n(74);
        s.default.PDFJS || (s.default.PDFJS = {});
        var h = s.default.PDFJS;
        h.version = "1.10.88", h.build = "c62a1938", h.pdfBug = !1, void 0 !== h.verbosity && (0, a.setVerbosityLevel)(h.verbosity), delete h.verbosity, Object.defineProperty(h, "verbosity", {
            get: function() {
                return (0, a.getVerbosityLevel)()
            },
            set: function(e) {
                (0, a.setVerbosityLevel)(e)
            },
            enumerable: !0,
            configurable: !0
        }), h.VERBOSITY_LEVELS = a.VERBOSITY_LEVELS, h.OPS = a.OPS, h.UNSUPPORTED_FEATURES = a.UNSUPPORTED_FEATURES, h.isValidUrl = i.isValidUrl, h.shadow = a.shadow, h.createBlob = a.createBlob, h.createObjectURL = function(e, t) {
            return (0, a.createObjectURL)(e, t, h.disableCreateObjectURL)
        }, Object.defineProperty(h, "isLittleEndian", {
            configurable: !0,
            get: function() {
                return (0, a.shadow)(h, "isLittleEndian", (0, a.isLittleEndian)())
            }
        }), h.removeNullCharacters = a.removeNullCharacters, h.PasswordResponses = a.PasswordResponses, h.PasswordException = a.PasswordException, h.UnknownErrorException = a.UnknownErrorException, h.InvalidPDFException = a.InvalidPDFException, h.MissingPDFException = a.MissingPDFException, h.UnexpectedResponseException = a.UnexpectedResponseException, h.Util = a.Util, h.PageViewport = a.PageViewport, h.createPromiseCapability = a.createPromiseCapability, h.maxImageSize = void 0 === h.maxImageSize ? -1 : h.maxImageSize, h.cMapUrl = void 0 === h.cMapUrl ? null : h.cMapUrl, h.cMapPacked = void 0 !== h.cMapPacked && h.cMapPacked, h.disableFontFace = void 0 !== h.disableFontFace && h.disableFontFace, h.imageResourcesPath = void 0 === h.imageResourcesPath ? "" : h.imageResourcesPath, h.disableWorker = void 0 !== h.disableWorker && h.disableWorker, h.workerSrc = void 0 === h.workerSrc ? null : h.workerSrc, h.workerPort = void 0 === h.workerPort ? null : h.workerPort, h.disableRange = void 0 !== h.disableRange && h.disableRange, h.disableStream = void 0 !== h.disableStream && h.disableStream, h.disableAutoFetch = void 0 !== h.disableAutoFetch && h.disableAutoFetch, h.pdfBug = void 0 !== h.pdfBug && h.pdfBug, h.postMessageTransfers = void 0 === h.postMessageTransfers || h.postMessageTransfers, h.disableCreateObjectURL = void 0 !== h.disableCreateObjectURL && h.disableCreateObjectURL, h.disableWebGL = void 0 === h.disableWebGL || h.disableWebGL, h.externalLinkTarget = void 0 === h.externalLinkTarget ? i.LinkTarget.NONE : h.externalLinkTarget, h.externalLinkRel = void 0 === h.externalLinkRel ? i.DEFAULT_LINK_REL : h.externalLinkRel, h.isEvalSupported = void 0 === h.isEvalSupported || h.isEvalSupported, h.pdfjsNext = void 0 !== h.pdfjsNext && h.pdfjsNext;
        var d = h.openExternalLinksInNewWindow;
        delete h.openExternalLinksInNewWindow, Object.defineProperty(h, "openExternalLinksInNewWindow", {
            get: function() {
                return h.externalLinkTarget === i.LinkTarget.BLANK
            },
            set: function(e) {
                e && (0, a.deprecated)('PDFJS.openExternalLinksInNewWindow, please use "PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.'), h.externalLinkTarget === i.LinkTarget.NONE ? h.externalLinkTarget = e ? i.LinkTarget.BLANK : i.LinkTarget.NONE : (0, a.warn)("PDFJS.externalLinkTarget is already initialized")
            },
            enumerable: !0,
            configurable: !0
        }), d && (h.openExternalLinksInNewWindow = d), h.getDocument = r.getDocument, h.LoopbackPort = r.LoopbackPort, h.PDFDataRangeTransport = r.PDFDataRangeTransport, h.PDFWorker = r.PDFWorker, h.hasCanvasTypedArrays = !0, h.CustomStyle = i.CustomStyle, h.LinkTarget = i.LinkTarget, h.addLinkAttributes = i.addLinkAttributes, h.getFilenameFromUrl = i.getFilenameFromUrl, h.isExternalLinkTargetSet = i.isExternalLinkTargetSet, h.AnnotationLayer = o.AnnotationLayer, h.renderTextLayer = u.renderTextLayer, h.Metadata = l.Metadata, h.SVGGraphics = c.SVGGraphics, h.UnsupportedManager = r._UnsupportedManager, t.globalScope = s.default, t.PDFJS = h
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            this.docId = e, this.styleElement = null, this.nativeFontFaces = [], this.loadTestFontId = 0, this.loadingContext = {
                requests: [],
                nextRequestId: 0
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.FontLoader = t.FontFaceObject = void 0;
        var i = n(0);
        r.prototype = {
            insertRule: function(e) {
                var t = this.styleElement;
                t || ((t = this.styleElement = document.createElement("style")).id = "PDFJS_FONT_STYLE_TAG_" + this.docId, document.documentElement.getElementsByTagName("head")[0].appendChild(t));
                var n = t.sheet;
                n.insertRule(e, n.cssRules.length)
            },
            clear: function() {
                this.styleElement && (this.styleElement.remove(), this.styleElement = null), this.nativeFontFaces.forEach(function(e) {
                    document.fonts.delete(e)
                }), this.nativeFontFaces.length = 0
            }
        };
        Object.defineProperty(r.prototype, "loadTestFont", {
            get: function() {
                return (0, i.shadow)(this, "loadTestFont", atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="))
            },
            configurable: !0
        }), r.prototype.addNativeFontFace = function(e) {
            this.nativeFontFaces.push(e), document.fonts.add(e)
        }, r.prototype.bind = function(e, t) {
            for (var n = [], a = [], o = [], s = function(e) {
                    return e.loaded.catch(function(t) {
                        (0, i.warn)('Failed to load font "' + e.family + '": ' + t)
                    })
                }, l = r.isFontLoadingAPISupported && !r.isSyncFontLoadingSupported, u = 0, c = e.length; u < c; u++) {
                var h = e[u];
                if (!h.attached && !1 !== h.loading)
                    if (h.attached = !0, l) {
                        var d = h.createNativeFontFace();
                        d && (this.addNativeFontFace(d), o.push(s(d)))
                    } else {
                        var f = h.createFontFaceRule();
                        f && (this.insertRule(f), n.push(f), a.push(h))
                    }
            }
            var p = this.queueLoadingCallback(t);
            l ? Promise.all(o).then(function() {
                p.complete()
            }) : n.length > 0 && !r.isSyncFontLoadingSupported ? this.prepareFontLoadEvent(n, a, p) : p.complete()
        }, r.prototype.queueLoadingCallback = function(e) {
            var t = this.loadingContext,
                n = {
                    id: "pdfjs-font-loading-" + t.nextRequestId++,
                    complete: function() {
                        for ((0, i.assert)(!n.end, "completeRequest() cannot be called twice"), n.end = Date.now(); t.requests.length > 0 && t.requests[0].end;) {
                            var e = t.requests.shift();
                            setTimeout(e.callback, 0)
                        }
                    },
                    callback: e,
                    started: Date.now()
                };
            return t.requests.push(n), n
        }, r.prototype.prepareFontLoadEvent = function(e, t, n) {
            function r(e, t) {
                return e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 | e.charCodeAt(t + 2) << 8 | 255 & e.charCodeAt(t + 3)
            }

            function a(e, t, n, r) {
                return e.substr(0, t) + r + e.substr(t + n)
            }

            function o(e, t) {
                if (++h > 30) return (0, i.warn)("Load test font never loaded."), void t();
                c.font = "30px " + e, c.fillText(".", 0, 20);
                c.getImageData(0, 0, 1, 1).data[3] > 0 ? t() : setTimeout(o.bind(null, e, t))
            }
            var s, l, u = document.createElement("canvas");
            u.width = 1, u.height = 1;
            var c = u.getContext("2d"),
                h = 0,
                d = "lt" + Date.now() + this.loadTestFontId++,
                f = this.loadTestFont,
                p = r(f = a(f, 976, d.length, d), 16);
            for (s = 0, l = d.length - 3; s < l; s += 4) p = p - 1482184792 + r(d, s) | 0;
            s < d.length && (p = p - 1482184792 + r(d + "XXX", s) | 0), f = a(f, 16, 4, (0, i.string32)(p));
            var v = '@font-face { font-family:"' + d + '";src:' + ("url(data:font/opentype;base64," + btoa(f) + ");") + "}";
            this.insertRule(v);
            var g = [];
            for (s = 0, l = t.length; s < l; s++) g.push(t[s].loadedName);
            g.push(d);
            var m = document.createElement("div");
            for (m.setAttribute("style", "visibility: hidden;width: 10px; height: 10px;position: absolute; top: 0px; left: 0px;"), s = 0, l = g.length; s < l; ++s) {
                var b = document.createElement("span");
                b.textContent = "Hi", b.style.fontFamily = g[s], m.appendChild(b)
            }
            document.body.appendChild(m), o(d, function() {
                document.body.removeChild(m), n.complete()
            })
        }, r.isFontLoadingAPISupported = "undefined" != typeof document && !!document.fonts;
        Object.defineProperty(r, "isSyncFontLoadingSupported", {
            get: function() {
                return (0, i.shadow)(r, "isSyncFontLoadingSupported", function() {
                    if ("undefined" == typeof navigator) return !0;
                    var e = !1,
                        t = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
                    return t && t[1] >= 14 && (e = !0), e
                }())
            },
            enumerable: !0,
            configurable: !0
        });
        var a = {get value() {
                    return (0, i.shadow)(this, "value", (0, i.isEvalSupported)())
                }
            },
            o = function() {
                function e(e, t) {
                    this.compiledGlyphs = Object.create(null);
                    for (var n in e) this[n] = e[n];
                    this.options = t
                }
                return e.prototype = {
                    createNativeFontFace: function() {
                        if (!this.data) return null;
                        if (this.options.disableFontFace) return this.disableFontFace = !0, null;
                        var e = new FontFace(this.loadedName, this.data, {});
                        return this.options.fontRegistry && this.options.fontRegistry.registerFont(this), e
                    },
                    createFontFaceRule: function() {
                        if (!this.data) return null;
                        if (this.options.disableFontFace) return this.disableFontFace = !0, null;
                        var e = (0, i.bytesToString)(new Uint8Array(this.data)),
                            t = this.loadedName,
                            n = "url(data:" + this.mimetype + ";base64," + btoa(e) + ");",
                            r = '@font-face { font-family:"' + t + '";src:' + n + "}";
                        return this.options.fontRegistry && this.options.fontRegistry.registerFont(this, n), r
                    },
                    getPathGenerator: function(e, t) {
                        if (!(t in this.compiledGlyphs)) {
                            var n, r, i, o = e.get(this.loadedName + "_path_" + t);
                            if (this.options.isEvalSupported && a.value) {
                                var s, l = "";
                                for (r = 0, i = o.length; r < i; r++) s = void 0 !== (n = o[r]).args ? n.args.join(",") : "", l += "c." + n.cmd + "(" + s + ");\n";
                                this.compiledGlyphs[t] = new Function("c", "size", l)
                            } else this.compiledGlyphs[t] = function(e, t) {
                                for (r = 0, i = o.length; r < i; r++) "scale" === (n = o[r]).cmd && (n.args = [t, -t]), e[n.cmd].apply(e, n.args)
                            }
                        }
                        return this.compiledGlyphs[t]
                    }
                }, e
            }();
        t.FontFaceObject = o, t.FontLoader = r
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            e.mozCurrentTransform || (e._originalSave = e.save, e._originalRestore = e.restore, e._originalRotate = e.rotate, e._originalScale = e.scale, e._originalTranslate = e.translate, e._originalTransform = e.transform, e._originalSetTransform = e.setTransform, e._transformMatrix = e._transformMatrix || [1, 0, 0, 1, 0, 0], e._transformStack = [], Object.defineProperty(e, "mozCurrentTransform", {
                get: function() {
                    return this._transformMatrix
                }
            }), Object.defineProperty(e, "mozCurrentTransformInverse", {
                get: function() {
                    var e = this._transformMatrix,
                        t = e[0],
                        n = e[1],
                        r = e[2],
                        i = e[3],
                        a = e[4],
                        o = e[5],
                        s = t * i - n * r,
                        l = n * r - t * i;
                    return [i / s, n / l, r / l, t / s, (i * a - r * o) / l, (n * a - t * o) / s]
                }
            }), e.save = function() {
                var e = this._transformMatrix;
                this._transformStack.push(e), this._transformMatrix = e.slice(0, 6), this._originalSave()
            }, e.restore = function() {
                var e = this._transformStack.pop();
                e && (this._transformMatrix = e, this._originalRestore())
            }, e.translate = function(e, t) {
                var n = this._transformMatrix;
                n[4] = n[0] * e + n[2] * t + n[4], n[5] = n[1] * e + n[3] * t + n[5], this._originalTranslate(e, t)
            }, e.scale = function(e, t) {
                var n = this._transformMatrix;
                n[0] = n[0] * e, n[1] = n[1] * e, n[2] = n[2] * t, n[3] = n[3] * t, this._originalScale(e, t)
            }, e.transform = function(t, n, r, i, a, o) {
                var s = this._transformMatrix;
                this._transformMatrix = [s[0] * t + s[2] * n, s[1] * t + s[3] * n, s[0] * r + s[2] * i, s[1] * r + s[3] * i, s[0] * a + s[2] * o + s[4], s[1] * a + s[3] * o + s[5]], e._originalTransform(t, n, r, i, a, o)
            }, e.setTransform = function(t, n, r, i, a, o) {
                this._transformMatrix = [t, n, r, i, a, o], e._originalSetTransform(t, n, r, i, a, o)
            }, e.rotate = function(e) {
                var t = Math.cos(e),
                    n = Math.sin(e),
                    r = this._transformMatrix;
                this._transformMatrix = [r[0] * t + r[2] * n, r[1] * t + r[3] * n, r[0] * -n + r[2] * t, r[1] * -n + r[3] * t, r[4], r[5]], this._originalRotate(e)
            })
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.CanvasGraphics = void 0;
        var i = n(0),
            a = n(120),
            o = n(70),
            s = 16,
            l = {get value() {
                    return (0, i.shadow)(l, "value", (0, i.isLittleEndian)())
                }
            },
            u = function() {
                function e(e) {
                    this.canvasFactory = e, this.cache = Object.create(null)
                }
                return e.prototype = {
                    getCanvas: function(e, t, n, i) {
                        var a;
                        return void 0 !== this.cache[e] ? (a = this.cache[e], this.canvasFactory.reset(a, t, n), a.context.setTransform(1, 0, 0, 1, 0, 0)) : (a = this.canvasFactory.create(t, n), this.cache[e] = a), i && r(a.context), a
                    },
                    clear: function() {
                        for (var e in this.cache) {
                            var t = this.cache[e];
                            this.canvasFactory.destroy(t), delete this.cache[e]
                        }
                    }
                }, e
            }(),
            c = function() {
                function e() {
                    this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = i.IDENTITY_MATRIX, this.textMatrixScale = 1, this.fontMatrix = i.FONT_IDENTITY_MATRIX, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = i.TextRenderingMode.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.resumeSMaskCtx = null
                }
                return e.prototype = {
                    clone: function() {
                        return Object.create(this)
                    },
                    setCurrentPoint: function(e, t) {
                        this.x = e, this.y = t
                    }
                }, e
            }(),
            h = function() {
                function e(e, t, n, i, a) {
                    this.ctx = e, this.current = new c, this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = t, this.objs = n, this.canvasFactory = i, this.imageLayer = a, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.cachedCanvases = new u(this.canvasFactory), e && r(e), this.cachedGetSinglePixelWidth = null
                }

                function t(e, t) {
                    if ("undefined" != typeof ImageData && t instanceof ImageData) e.putImageData(t, 0, 0);
                    else {
                        var n, r, a, o, u, c = t.height,
                            h = t.width,
                            d = c % s,
                            f = (c - d) / s,
                            p = 0 === d ? f : f + 1,
                            v = e.createImageData(h, s),
                            g = 0,
                            m = t.data,
                            b = v.data;
                        if (t.kind === i.ImageKind.GRAYSCALE_1BPP) {
                            var y = m.byteLength,
                                _ = new Uint32Array(b.buffer, 0, b.byteLength >> 2),
                                w = _.length,
                                S = h + 7 >> 3,
                                P = 4294967295,
                                A = l.value ? 4278190080 : 255;
                            for (r = 0; r < p; r++) {
                                for (o = r < f ? s : d, n = 0, a = 0; a < o; a++) {
                                    for (var C = y - g, k = 0, T = C > S ? h : 8 * C - 7, x = -8 & T, E = 0, R = 0; k < x; k += 8) R = m[g++], _[n++] = 128 & R ? P : A, _[n++] = 64 & R ? P : A, _[n++] = 32 & R ? P : A, _[n++] = 16 & R ? P : A, _[n++] = 8 & R ? P : A, _[n++] = 4 & R ? P : A, _[n++] = 2 & R ? P : A, _[n++] = 1 & R ? P : A;
                                    for (; k < T; k++) 0 === E && (R = m[g++], E = 128), _[n++] = R & E ? P : A, E >>= 1
                                }
                                for (; n < w;) _[n++] = 0;
                                e.putImageData(v, 0, r * s)
                            }
                        } else if (t.kind === i.ImageKind.RGBA_32BPP) {
                            for (a = 0, u = h * s * 4, r = 0; r < f; r++) b.set(m.subarray(g, g + u)), g += u, e.putImageData(v, 0, a), a += s;
                            r < p && (u = h * d * 4, b.set(m.subarray(g, g + u)), e.putImageData(v, 0, a))
                        } else {
                            if (t.kind !== i.ImageKind.RGB_24BPP) throw new Error("bad image kind: " + t.kind);
                            for (u = h * (o = s), r = 0; r < p; r++) {
                                for (r >= f && (u = h * (o = d)), n = 0, a = u; a--;) b[n++] = m[g++], b[n++] = m[g++], b[n++] = m[g++], b[n++] = 255;
                                e.putImageData(v, 0, r * s)
                            }
                        }
                    }
                }

                function n(e, t) {
                    for (var n = t.height, r = t.width, i = n % s, a = (n - i) / s, o = 0 === i ? a : a + 1, l = e.createImageData(r, s), u = 0, c = t.data, h = l.data, d = 0; d < o; d++) {
                        for (var f = d < a ? s : i, p = 3, v = 0; v < f; v++)
                            for (var g = 0, m = 0; m < r; m++) {
                                if (!g) {
                                    var b = c[u++];
                                    g = 128
                                }
                                h[p] = b & g ? 0 : 255, p += 4, g >>= 1
                            }
                        e.putImageData(l, 0, d * s)
                    }
                }

                function h(e, t) {
                    for (var n = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"], r = 0, i = n.length; r < i; r++) {
                        var a = n[r];
                        void 0 !== e[a] && (t[a] = e[a])
                    }
                    void 0 !== e.setLineDash && (t.setLineDash(e.getLineDash()), t.lineDashOffset = e.lineDashOffset)
                }

                function d(e) {
                    e.strokeStyle = "#000000", e.fillStyle = "#000000", e.fillRule = "nonzero", e.globalAlpha = 1, e.lineWidth = 1, e.lineCap = "butt", e.lineJoin = "miter", e.miterLimit = 10, e.globalCompositeOperation = "source-over", e.font = "10px sans-serif", void 0 !== e.setLineDash && (e.setLineDash([]), e.lineDashOffset = 0)
                }

                function f(e, t, n, r) {
                    for (var i = e.length, a = 3; a < i; a += 4) {
                        var o = e[a];
                        if (0 === o) e[a - 3] = t, e[a - 2] = n, e[a - 1] = r;
                        else if (o < 255) {
                            var s = 255 - o;
                            e[a - 3] = e[a - 3] * o + t * s >> 8, e[a - 2] = e[a - 2] * o + n * s >> 8, e[a - 1] = e[a - 1] * o + r * s >> 8
                        }
                    }
                }

                function p(e, t, n) {
                    for (var r = e.length, i = 3; i < r; i += 4) {
                        var a = n ? n[e[i]] : e[i];
                        t[i] = t[i] * a * (1 / 255) | 0
                    }
                }

                function v(e, t, n) {
                    for (var r = e.length, i = 3; i < r; i += 4) {
                        var a = 77 * e[i - 3] + 152 * e[i - 2] + 28 * e[i - 1];
                        t[i] = n ? t[i] * n[a >> 8] >> 8 : t[i] * a >> 16
                    }
                }

                function g(e, t, n) {
                    var r = t.canvas,
                        i = t.context;
                    e.setTransform(t.scaleX, 0, 0, t.scaleY, t.offsetX, t.offsetY);
                    var a = t.backdrop || null;
                    if (!t.transferMap && o.WebGLUtils.isEnabled) {
                        var s = o.WebGLUtils.composeSMask(n.canvas, r, {
                            subtype: t.subtype,
                            backdrop: a
                        });
                        return e.setTransform(1, 0, 0, 1, 0, 0), void e.drawImage(s, t.offsetX, t.offsetY)
                    }! function(e, t, n, r, i, a, o) {
                        var s, l = !!a,
                            u = l ? a[0] : 0,
                            c = l ? a[1] : 0,
                            h = l ? a[2] : 0;
                        s = "Luminosity" === i ? v : p;
                        for (var d = Math.min(r, Math.ceil(1048576 / n)), g = 0; g < r; g += d) {
                            var m = Math.min(d, r - g),
                                b = e.getImageData(0, g, n, m),
                                y = t.getImageData(0, g, n, m);
                            l && f(b.data, u, c, h), s(b.data, y.data, o), e.putImageData(y, 0, g)
                        }
                    }(i, n, r.width, r.height, t.subtype, a, t.transferMap), e.drawImage(r, 0, 0)
                }
                var m = ["butt", "round", "square"],
                    b = ["miter", "round", "bevel"],
                    y = {},
                    _ = {};
                e.prototype = {
                    beginDrawing: function(e) {
                        var t = e.transform,
                            n = e.viewport,
                            r = e.transparency,
                            i = e.background,
                            a = void 0 === i ? null : i,
                            o = this.ctx.canvas.width,
                            s = this.ctx.canvas.height;
                        if (this.ctx.save(), this.ctx.fillStyle = a || "rgb(255, 255, 255)", this.ctx.fillRect(0, 0, o, s), this.ctx.restore(), r) {
                            var l = this.cachedCanvases.getCanvas("transparent", o, s, !0);
                            this.compositeCtx = this.ctx, this.transparentCanvas = l.canvas, this.ctx = l.context, this.ctx.save(), this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform)
                        }
                        this.ctx.save(), d(this.ctx), t && this.ctx.transform.apply(this.ctx, t), this.ctx.transform.apply(this.ctx, n.transform), this.baseTransform = this.ctx.mozCurrentTransform.slice(), this.imageLayer && this.imageLayer.beginLayout()
                    },
                    executeOperatorList: function(e, t, n, r) {
                        var a = e.argsArray,
                            o = e.fnArray,
                            s = t || 0,
                            l = a.length;
                        if (l === s) return s;
                        for (var u, c = l - s > 10 && "function" == typeof n, h = c ? Date.now() + 15 : 0, d = 0, f = this.commonObjs, p = this.objs;;) {
                            if (void 0 !== r && s === r.nextBreakPoint) return r.breakIt(s, n), s;
                            if ((u = o[s]) !== i.OPS.dependency) this[u].apply(this, a[s]);
                            else
                                for (var v = a[s], g = 0, m = v.length; g < m; g++) {
                                    var b = v[g],
                                        y = "g" === b[0] && "_" === b[1] ? f : p;
                                    if (!y.isResolved(b)) return y.get(b, n), s
                                }
                            if (++s === l) return s;
                            if (c && ++d > 10) {
                                if (Date.now() > h) return n(), s;
                                d = 0
                            }
                        }
                    },
                    endDrawing: function() {
                        null !== this.current.activeSMask && this.endSMaskGroup(), this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.transparentCanvas = null), this.cachedCanvases.clear(), o.WebGLUtils.clear(), this.imageLayer && this.imageLayer.endLayout()
                    },
                    setLineWidth: function(e) {
                        this.current.lineWidth = e, this.ctx.lineWidth = e
                    },
                    setLineCap: function(e) {
                        this.ctx.lineCap = m[e]
                    },
                    setLineJoin: function(e) {
                        this.ctx.lineJoin = b[e]
                    },
                    setMiterLimit: function(e) {
                        this.ctx.miterLimit = e
                    },
                    setDash: function(e, t) {
                        var n = this.ctx;
                        void 0 !== n.setLineDash && (n.setLineDash(e), n.lineDashOffset = t)
                    },
                    setRenderingIntent: function(e) {},
                    setFlatness: function(e) {},
                    setGState: function(e) {
                        for (var t = 0, n = e.length; t < n; t++) {
                            var r = e[t],
                                i = r[0],
                                a = r[1];
                            switch (i) {
                                case "LW":
                                    this.setLineWidth(a);
                                    break;
                                case "LC":
                                    this.setLineCap(a);
                                    break;
                                case "LJ":
                                    this.setLineJoin(a);
                                    break;
                                case "ML":
                                    this.setMiterLimit(a);
                                    break;
                                case "D":
                                    this.setDash(a[0], a[1]);
                                    break;
                                case "RI":
                                    this.setRenderingIntent(a);
                                    break;
                                case "FL":
                                    this.setFlatness(a);
                                    break;
                                case "Font":
                                    this.setFont(a[0], a[1]);
                                    break;
                                case "CA":
                                    this.current.strokeAlpha = r[1];
                                    break;
                                case "ca":
                                    this.current.fillAlpha = r[1], this.ctx.globalAlpha = r[1];
                                    break;
                                case "BM":
                                    this.ctx.globalCompositeOperation = a;
                                    break;
                                case "SMask":
                                    this.current.activeSMask && (this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1].activeSMask === this.current.activeSMask ? this.suspendSMaskGroup() : this.endSMaskGroup()), this.current.activeSMask = a ? this.tempSMask : null, this.current.activeSMask && this.beginSMaskGroup(), this.tempSMask = null
                            }
                        }
                    },
                    beginSMaskGroup: function() {
                        var e = this.current.activeSMask,
                            t = e.canvas.width,
                            n = e.canvas.height,
                            r = "smaskGroupAt" + this.groupLevel,
                            i = this.cachedCanvases.getCanvas(r, t, n, !0),
                            a = this.ctx,
                            o = a.mozCurrentTransform;
                        this.ctx.save();
                        var s = i.context;
                        s.scale(1 / e.scaleX, 1 / e.scaleY), s.translate(-e.offsetX, -e.offsetY), s.transform.apply(s, o), e.startTransformInverse = s.mozCurrentTransformInverse, h(a, s), this.ctx = s, this.setGState([
                            ["BM", "source-over"],
                            ["ca", 1],
                            ["CA", 1]
                        ]), this.groupStack.push(a), this.groupLevel++
                    },
                    suspendSMaskGroup: function() {
                        var e = this.ctx;
                        this.groupLevel--, this.ctx = this.groupStack.pop(), g(this.ctx, this.current.activeSMask, e), this.ctx.restore(), this.ctx.save(), h(e, this.ctx), this.current.resumeSMaskCtx = e;
                        var t = i.Util.transform(this.current.activeSMask.startTransformInverse, e.mozCurrentTransform);
                        this.ctx.transform.apply(this.ctx, t), e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.restore()
                    },
                    resumeSMaskGroup: function() {
                        var e = this.current.resumeSMaskCtx,
                            t = this.ctx;
                        this.ctx = e, this.groupStack.push(t), this.groupLevel++
                    },
                    endSMaskGroup: function() {
                        var e = this.ctx;
                        this.groupLevel--, this.ctx = this.groupStack.pop(), g(this.ctx, this.current.activeSMask, e), this.ctx.restore(), h(e, this.ctx);
                        var t = i.Util.transform(this.current.activeSMask.startTransformInverse, e.mozCurrentTransform);
                        this.ctx.transform.apply(this.ctx, t)
                    },
                    save: function() {
                        this.ctx.save();
                        var e = this.current;
                        this.stateStack.push(e), this.current = e.clone(), this.current.resumeSMaskCtx = null
                    },
                    restore: function() {
                        this.current.resumeSMaskCtx && this.resumeSMaskGroup(), null === this.current.activeSMask || 0 !== this.stateStack.length && this.stateStack[this.stateStack.length - 1].activeSMask === this.current.activeSMask || this.endSMaskGroup(), 0 !== this.stateStack.length && (this.current = this.stateStack.pop(), this.ctx.restore(), this.pendingClip = null, this.cachedGetSinglePixelWidth = null)
                    },
                    transform: function(e, t, n, r, i, a) {
                        this.ctx.transform(e, t, n, r, i, a), this.cachedGetSinglePixelWidth = null
                    },
                    constructPath: function(e, t) {
                        for (var n = this.ctx, r = this.current, a = r.x, o = r.y, s = 0, l = 0, u = e.length; s < u; s++) switch (0 | e[s]) {
                            case i.OPS.rectangle:
                                a = t[l++], o = t[l++];
                                var c = t[l++],
                                    h = t[l++];
                                0 === c && (c = this.getSinglePixelWidth()), 0 === h && (h = this.getSinglePixelWidth());
                                var d = a + c,
                                    f = o + h;
                                this.ctx.moveTo(a, o), this.ctx.lineTo(d, o), this.ctx.lineTo(d, f), this.ctx.lineTo(a, f), this.ctx.lineTo(a, o), this.ctx.closePath();
                                break;
                            case i.OPS.moveTo:
                                a = t[l++], o = t[l++], n.moveTo(a, o);
                                break;
                            case i.OPS.lineTo:
                                a = t[l++], o = t[l++], n.lineTo(a, o);
                                break;
                            case i.OPS.curveTo:
                                a = t[l + 4], o = t[l + 5], n.bezierCurveTo(t[l], t[l + 1], t[l + 2], t[l + 3], a, o), l += 6;
                                break;
                            case i.OPS.curveTo2:
                                n.bezierCurveTo(a, o, t[l], t[l + 1], t[l + 2], t[l + 3]), a = t[l + 2], o = t[l + 3], l += 4;
                                break;
                            case i.OPS.curveTo3:
                                a = t[l + 2], o = t[l + 3], n.bezierCurveTo(t[l], t[l + 1], a, o, a, o), l += 4;
                                break;
                            case i.OPS.closePath:
                                n.closePath()
                        }
                        r.setCurrentPoint(a, o)
                    },
                    closePath: function() {
                        this.ctx.closePath()
                    },
                    stroke: function(e) {
                        e = void 0 === e || e;
                        var t = this.ctx,
                            n = this.current.strokeColor;
                        t.lineWidth = Math.max(.65 * this.getSinglePixelWidth(), this.current.lineWidth), t.globalAlpha = this.current.strokeAlpha, n && n.hasOwnProperty("type") && "Pattern" === n.type ? (t.save(), t.strokeStyle = n.getPattern(t, this), t.stroke(), t.restore()) : t.stroke(), e && this.consumePath(), t.globalAlpha = this.current.fillAlpha
                    },
                    closeStroke: function() {
                        this.closePath(), this.stroke()
                    },
                    fill: function(e) {
                        e = void 0 === e || e;
                        var t = this.ctx,
                            n = this.current.fillColor,
                            r = !1;
                        this.current.patternFill && (t.save(), this.baseTransform && t.setTransform.apply(t, this.baseTransform), t.fillStyle = n.getPattern(t, this), r = !0), this.pendingEOFill ? (t.fill("evenodd"), this.pendingEOFill = !1) : t.fill(), r && t.restore(), e && this.consumePath()
                    },
                    eoFill: function() {
                        this.pendingEOFill = !0, this.fill()
                    },
                    fillStroke: function() {
                        this.fill(!1), this.stroke(!1), this.consumePath()
                    },
                    eoFillStroke: function() {
                        this.pendingEOFill = !0, this.fillStroke()
                    },
                    closeFillStroke: function() {
                        this.closePath(), this.fillStroke()
                    },
                    closeEOFillStroke: function() {
                        this.pendingEOFill = !0, this.closePath(), this.fillStroke()
                    },
                    endPath: function() {
                        this.consumePath()
                    },
                    clip: function() {
                        this.pendingClip = y
                    },
                    eoClip: function() {
                        this.pendingClip = _
                    },
                    beginText: function() {
                        this.current.textMatrix = i.IDENTITY_MATRIX, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0
                    },
                    endText: function() {
                        var e = this.pendingTextPaths,
                            t = this.ctx;
                        if (void 0 !== e) {
                            t.save(), t.beginPath();
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                t.setTransform.apply(t, r.transform), t.translate(r.x, r.y), r.addToPath(t, r.fontSize)
                            }
                            t.restore(), t.clip(), t.beginPath(), delete this.pendingTextPaths
                        } else t.beginPath()
                    },
                    setCharSpacing: function(e) {
                        this.current.charSpacing = e
                    },
                    setWordSpacing: function(e) {
                        this.current.wordSpacing = e
                    },
                    setHScale: function(e) {
                        this.current.textHScale = e / 100
                    },
                    setLeading: function(e) {
                        this.current.leading = -e
                    },
                    setFont: function(e, t) {
                        var n = this.commonObjs.get(e),
                            r = this.current;
                        if (!n) throw new Error("Can't find font for " + e);
                        if (r.fontMatrix = n.fontMatrix ? n.fontMatrix : i.FONT_IDENTITY_MATRIX, 0 !== r.fontMatrix[0] && 0 !== r.fontMatrix[3] || (0, i.warn)("Invalid font matrix for font " + e), t < 0 ? (t = -t, r.fontDirection = -1) : r.fontDirection = 1, this.current.font = n, this.current.fontSize = t, !n.isType3Font) {
                            var a = n.loadedName || "sans-serif",
                                o = n.black ? "900" : n.bold ? "bold" : "normal",
                                s = n.italic ? "italic" : "normal",
                                l = '"' + a + '", ' + n.fallbackName,
                                u = t < 16 ? 16 : t > 100 ? 100 : t;
                            this.current.fontSizeScale = t / u;
                            var c = s + " " + o + " " + u + "px " + l;
                            this.ctx.font = c
                        }
                    },
                    setTextRenderingMode: function(e) {
                        this.current.textRenderingMode = e
                    },
                    setTextRise: function(e) {
                        this.current.textRise = e
                    },
                    moveText: function(e, t) {
                        this.current.x = this.current.lineX += e, this.current.y = this.current.lineY += t
                    },
                    setLeadingMoveText: function(e, t) {
                        this.setLeading(-t), this.moveText(e, t)
                    },
                    setTextMatrix: function(e, t, n, r, i, a) {
                        this.current.textMatrix = [e, t, n, r, i, a], this.current.textMatrixScale = Math.sqrt(e * e + t * t), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0
                    },
                    nextLine: function() {
                        this.moveText(0, this.current.leading)
                    },
                    paintChar: function(e, t, n) {
                        var r, a = this.ctx,
                            o = this.current,
                            s = o.font,
                            l = o.textRenderingMode,
                            u = o.fontSize / o.fontSizeScale,
                            c = l & i.TextRenderingMode.FILL_STROKE_MASK,
                            h = !!(l & i.TextRenderingMode.ADD_TO_PATH_FLAG);
                        if ((s.disableFontFace || h) && (r = s.getPathGenerator(this.commonObjs, e)), s.disableFontFace ? (a.save(), a.translate(t, n), a.beginPath(), r(a, u), c !== i.TextRenderingMode.FILL && c !== i.TextRenderingMode.FILL_STROKE || a.fill(), c !== i.TextRenderingMode.STROKE && c !== i.TextRenderingMode.FILL_STROKE || a.stroke(), a.restore()) : (c !== i.TextRenderingMode.FILL && c !== i.TextRenderingMode.FILL_STROKE || a.fillText(e, t, n), c !== i.TextRenderingMode.STROKE && c !== i.TextRenderingMode.FILL_STROKE || a.strokeText(e, t, n)), h) {
                            (this.pendingTextPaths || (this.pendingTextPaths = [])).push({
                                transform: a.mozCurrentTransform,
                                x: t,
                                y: n,
                                fontSize: u,
                                addToPath: r
                            })
                        }
                    },
                    get isFontSubpixelAAEnabled() {
                        var e = this.canvasFactory.create(10, 10).context;
                        e.scale(1.5, 1), e.fillText("I", 0, 10);
                        for (var t = e.getImageData(0, 0, 10, 10).data, n = !1, r = 3; r < t.length; r += 4)
                            if (t[r] > 0 && t[r] < 255) {
                                n = !0;
                                break
                            }
                        return (0, i.shadow)(this, "isFontSubpixelAAEnabled", n)
                    },
                    showText: function(e) {
                        var t = this.current,
                            n = t.font;
                        if (n.isType3Font) return this.showType3Text(e);
                        var r = t.fontSize;
                        if (0 !== r) {
                            var a = this.ctx,
                                o = t.fontSizeScale,
                                s = t.charSpacing,
                                l = t.wordSpacing,
                                u = t.fontDirection,
                                c = t.textHScale * u,
                                h = e.length,
                                d = n.vertical,
                                f = d ? 1 : -1,
                                p = n.defaultVMetrics,
                                v = r * t.fontMatrix[0],
                                g = t.textRenderingMode === i.TextRenderingMode.FILL && !n.disableFontFace;
                            a.save(), a.transform.apply(a, t.textMatrix), a.translate(t.x, t.y + t.textRise), t.patternFill && (a.fillStyle = t.fillColor.getPattern(a, this)), u > 0 ? a.scale(c, -1) : a.scale(c, 1);
                            var m = t.lineWidth,
                                b = t.textMatrixScale;
                            if (0 === b || 0 === m) {
                                var y = t.textRenderingMode & i.TextRenderingMode.FILL_STROKE_MASK;
                                y !== i.TextRenderingMode.STROKE && y !== i.TextRenderingMode.FILL_STROKE || (this.cachedGetSinglePixelWidth = null, m = .65 * this.getSinglePixelWidth())
                            } else m /= b;
                            1 !== o && (a.scale(o, o), m /= o), a.lineWidth = m;
                            var _, w = 0;
                            for (_ = 0; _ < h; ++_) {
                                var S = e[_];
                                if ((0, i.isNum)(S)) w += f * S * r / 1e3;
                                else {
                                    var P, A, C, k, T = !1,
                                        x = (S.isSpace ? l : 0) + s,
                                        E = S.fontChar,
                                        R = S.accent,
                                        L = S.width;
                                    if (d) {
                                        var I, F, D;
                                        I = S.vmetric || p, F = -(F = S.vmetric ? I[1] : .5 * L) * v, D = I[2] * v, L = I ? -I[0] : L, P = F / o, A = (w + D) / o
                                    } else P = w / o, A = 0;
                                    if (n.remeasure && L > 0) {
                                        var O = 1e3 * a.measureText(E).width / r * o;
                                        if (L < O && this.isFontSubpixelAAEnabled) {
                                            var N = L / O;
                                            T = !0, a.save(), a.scale(N, 1), P /= N
                                        } else L !== O && (P += (L - O) / 2e3 * r / o)
                                    }(S.isInFont || n.missingFile) && (g && !R ? a.fillText(E, P, A) : (this.paintChar(E, P, A), R && (C = P + R.offset.x / o, k = A - R.offset.y / o, this.paintChar(R.fontChar, C, k))));
                                    w += L * v + x * u, T && a.restore()
                                }
                            }
                            d ? t.y -= w * c : t.x += w * c, a.restore()
                        }
                    },
                    showType3Text: function(e) {
                        var t, n, r, a, o = this.ctx,
                            s = this.current,
                            l = s.font,
                            u = s.fontSize,
                            c = s.fontDirection,
                            h = l.vertical ? 1 : -1,
                            d = s.charSpacing,
                            f = s.wordSpacing,
                            p = s.textHScale * c,
                            v = s.fontMatrix || i.FONT_IDENTITY_MATRIX,
                            g = e.length;
                        if (!(s.textRenderingMode === i.TextRenderingMode.INVISIBLE) && 0 !== u) {
                            for (this.cachedGetSinglePixelWidth = null, o.save(), o.transform.apply(o, s.textMatrix), o.translate(s.x, s.y), o.scale(p, c), t = 0; t < g; ++t)
                                if (n = e[t], (0, i.isNum)(n)) a = h * n * u / 1e3, this.ctx.translate(a, 0), s.x += a * p;
                                else {
                                    var m = (n.isSpace ? f : 0) + d,
                                        b = l.charProcOperatorList[n.operatorListId];
                                    if (b) {
                                        this.processingType3 = n, this.save(), o.scale(u, u), o.transform.apply(o, v), this.executeOperatorList(b), this.restore();
                                        r = i.Util.applyTransform([n.width, 0], v)[0] * u + m, o.translate(r, 0), s.x += r * p
                                    } else(0, i.warn)('Type3 character "' + n.operatorListId + '" is not available.')
                                }
                            o.restore(), this.processingType3 = null
                        }
                    },
                    setCharWidth: function(e, t) {},
                    setCharWidthAndBounds: function(e, t, n, r, i, a) {
                        this.ctx.rect(n, r, i - n, a - r), this.clip(), this.endPath()
                    },
                    getColorN_Pattern: function(t) {
                        var n, r = this;
                        if ("TilingPattern" === t[0]) {
                            var i = t[1],
                                o = this.baseTransform || this.ctx.mozCurrentTransform.slice(),
                                s = {
                                    createCanvasGraphics: function(t) {
                                        return new e(t, r.commonObjs, r.objs, r.canvasFactory)
                                    }
                                };
                            n = new a.TilingPattern(t, i, this.ctx, s, o)
                        } else n = (0, a.getShadingPatternFromIR)(t);
                        return n
                    },
                    setStrokeColorN: function() {
                        this.current.strokeColor = this.getColorN_Pattern(arguments)
                    },
                    setFillColorN: function() {
                        this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0
                    },
                    setStrokeRGBColor: function(e, t, n) {
                        var r = i.Util.makeCssRgb(e, t, n);
                        this.ctx.strokeStyle = r, this.current.strokeColor = r
                    },
                    setFillRGBColor: function(e, t, n) {
                        var r = i.Util.makeCssRgb(e, t, n);
                        this.ctx.fillStyle = r, this.current.fillColor = r, this.current.patternFill = !1
                    },
                    shadingFill: function(e) {
                        var t = this.ctx;
                        this.save();
                        var n = (0, a.getShadingPatternFromIR)(e);
                        t.fillStyle = n.getPattern(t, this, !0);
                        var r = t.mozCurrentTransformInverse;
                        if (r) {
                            var o = t.canvas,
                                s = o.width,
                                l = o.height,
                                u = i.Util.applyTransform([0, 0], r),
                                c = i.Util.applyTransform([0, l], r),
                                h = i.Util.applyTransform([s, 0], r),
                                d = i.Util.applyTransform([s, l], r),
                                f = Math.min(u[0], c[0], h[0], d[0]),
                                p = Math.min(u[1], c[1], h[1], d[1]),
                                v = Math.max(u[0], c[0], h[0], d[0]),
                                g = Math.max(u[1], c[1], h[1], d[1]);
                            this.ctx.fillRect(f, p, v - f, g - p)
                        } else this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
                        this.restore()
                    },
                    beginInlineImage: function() {
                        throw new Error("Should not call beginInlineImage")
                    },
                    beginImageData: function() {
                        throw new Error("Should not call beginImageData")
                    },
                    paintFormXObjectBegin: function(e, t) {
                        if (this.save(), this.baseTransformStack.push(this.baseTransform), Array.isArray(e) && 6 === e.length && this.transform.apply(this, e), this.baseTransform = this.ctx.mozCurrentTransform, Array.isArray(t) && 4 === t.length) {
                            var n = t[2] - t[0],
                                r = t[3] - t[1];
                            this.ctx.rect(t[0], t[1], n, r), this.clip(), this.endPath()
                        }
                    },
                    paintFormXObjectEnd: function() {
                        this.restore(), this.baseTransform = this.baseTransformStack.pop()
                    },
                    beginGroup: function(e) {
                        this.save();
                        var t = this.ctx;
                        e.isolated || (0, i.info)("TODO: Support non-isolated groups."), e.knockout && (0, i.warn)("Knockout groups not supported.");
                        var n = t.mozCurrentTransform;
                        if (e.matrix && t.transform.apply(t, e.matrix), !e.bbox) throw new Error("Bounding box is required.");
                        var r = i.Util.getAxialAlignedBoundingBox(e.bbox, t.mozCurrentTransform),
                            a = [0, 0, t.canvas.width, t.canvas.height];
                        r = i.Util.intersect(r, a) || [0, 0, 0, 0];
                        var o = Math.floor(r[0]),
                            s = Math.floor(r[1]),
                            l = Math.max(Math.ceil(r[2]) - o, 1),
                            u = Math.max(Math.ceil(r[3]) - s, 1),
                            c = 1,
                            d = 1;
                        l > 4096 && (c = l / 4096, l = 4096), u > 4096 && (d = u / 4096, u = 4096);
                        var f = "groupAt" + this.groupLevel;
                        e.smask && (f += "_smask_" + this.smaskCounter++ % 2);
                        var p = this.cachedCanvases.getCanvas(f, l, u, !0),
                            v = p.context;
                        v.scale(1 / c, 1 / d), v.translate(-o, -s), v.transform.apply(v, n), e.smask ? this.smaskStack.push({
                            canvas: p.canvas,
                            context: v,
                            offsetX: o,
                            offsetY: s,
                            scaleX: c,
                            scaleY: d,
                            subtype: e.smask.subtype,
                            backdrop: e.smask.backdrop,
                            transferMap: e.smask.transferMap || null,
                            startTransformInverse: null
                        }) : (t.setTransform(1, 0, 0, 1, 0, 0), t.translate(o, s), t.scale(c, d)), h(t, v), this.ctx = v, this.setGState([
                            ["BM", "source-over"],
                            ["ca", 1],
                            ["CA", 1]
                        ]), this.groupStack.push(t), this.groupLevel++, this.current.activeSMask = null
                    },
                    endGroup: function(e) {
                        this.groupLevel--;
                        var t = this.ctx;
                        this.ctx = this.groupStack.pop(), void 0 !== this.ctx.imageSmoothingEnabled ? this.ctx.imageSmoothingEnabled = !1 : this.ctx.mozImageSmoothingEnabled = !1, e.smask ? this.tempSMask = this.smaskStack.pop() : this.ctx.drawImage(t.canvas, 0, 0), this.restore()
                    },
                    beginAnnotations: function() {
                        this.save(), this.baseTransform && this.ctx.setTransform.apply(this.ctx, this.baseTransform)
                    },
                    endAnnotations: function() {
                        this.restore()
                    },
                    beginAnnotation: function(e, t, n) {
                        if (this.save(), d(this.ctx), this.current = new c, Array.isArray(e) && 4 === e.length) {
                            var r = e[2] - e[0],
                                i = e[3] - e[1];
                            this.ctx.rect(e[0], e[1], r, i), this.clip(), this.endPath()
                        }
                        this.transform.apply(this, t), this.transform.apply(this, n)
                    },
                    endAnnotation: function() {
                        this.restore()
                    },
                    paintJpegXObject: function(e, t, n) {
                        var r = this.objs.get(e);
                        if (r) {
                            this.save();
                            var a = this.ctx;
                            if (a.scale(1 / t, -1 / n), a.drawImage(r, 0, 0, r.width, r.height, 0, -n, t, n), this.imageLayer) {
                                var o = a.mozCurrentTransformInverse,
                                    s = this.getCanvasPosition(0, 0);
                                this.imageLayer.appendImage({
                                    objId: e,
                                    left: s[0],
                                    top: s[1],
                                    width: t / o[0],
                                    height: n / o[3]
                                })
                            }
                            this.restore()
                        } else(0, i.warn)("Dependent image isn't ready yet")
                    },
                    paintImageMaskXObject: function(e) {
                        var t = this.ctx,
                            r = e.width,
                            i = e.height,
                            a = this.current.fillColor,
                            o = this.current.patternFill,
                            s = this.processingType3;
                        if (s && void 0 === s.compiled && (s.compiled = r <= 1e3 && i <= 1e3 ? function(e) {
                                var t, n, r, i, a = e.width,
                                    o = e.height,
                                    s = a + 1,
                                    l = new Uint8Array(s * (o + 1)),
                                    u = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]),
                                    c = a + 7 & -8,
                                    h = e.data,
                                    d = new Uint8Array(c * o),
                                    f = 0;
                                for (t = 0, i = h.length; t < i; t++)
                                    for (var p = 128, v = h[t]; p > 0;) d[f++] = v & p ? 0 : 255, p >>= 1;
                                var g = 0;
                                for (0 !== d[f = 0] && (l[0] = 1, ++g), n = 1; n < a; n++) d[f] !== d[f + 1] && (l[n] = d[f] ? 2 : 1, ++g), f++;
                                for (0 !== d[f] && (l[n] = 2, ++g), t = 1; t < o; t++) {
                                    r = t * s, d[(f = t * c) - c] !== d[f] && (l[r] = d[f] ? 1 : 8, ++g);
                                    var m = (d[f] ? 4 : 0) + (d[f - c] ? 8 : 0);
                                    for (n = 1; n < a; n++) u[m = (m >> 2) + (d[f + 1] ? 4 : 0) + (d[f - c + 1] ? 8 : 0)] && (l[r + n] = u[m], ++g), f++;
                                    if (d[f - c] !== d[f] && (l[r + n] = d[f] ? 2 : 4, ++g), g > 1e3) return null
                                }
                                for (r = t * s, 0 !== d[f = c * (o - 1)] && (l[r] = 8, ++g), n = 1; n < a; n++) d[f] !== d[f + 1] && (l[r + n] = d[f] ? 4 : 8, ++g), f++;
                                if (0 !== d[f] && (l[r + n] = 4, ++g), g > 1e3) return null;
                                var b = new Int32Array([0, s, -1, 0, -s, 0, 0, 0, 1]),
                                    y = [];
                                for (t = 0; g && t <= o; t++) {
                                    for (var _ = t * s, w = _ + a; _ < w && !l[_];) _++;
                                    if (_ !== w) {
                                        var S, P = [_ % s, t],
                                            A = l[_],
                                            C = _;
                                        do {
                                            var k = b[A];
                                            do {
                                                _ += k
                                            } while (!l[_]);
                                            5 !== (S = l[_]) && 10 !== S ? (A = S, l[_] = 0) : (A = S & 51 * A >> 4, l[_] &= A >> 2 | A << 2), P.push(_ % s), P.push(_ / s | 0), --g
                                        } while (C !== _);
                                        y.push(P), --t
                                    }
                                }
                                return function(e) {
                                    e.save(), e.scale(1 / a, -1 / o), e.translate(0, -o), e.beginPath();
                                    for (var t = 0, n = y.length; t < n; t++) {
                                        var r = y[t];
                                        e.moveTo(r[0], r[1]);
                                        for (var i = 2, s = r.length; i < s; i += 2) e.lineTo(r[i], r[i + 1])
                                    }
                                    e.fill(), e.beginPath(), e.restore()
                                }
                            }({
                                data: e.data,
                                width: r,
                                height: i
                            }) : null), s && s.compiled) s.compiled(t);
                        else {
                            var l = this.cachedCanvases.getCanvas("maskCanvas", r, i),
                                u = l.context;
                            u.save(), n(u, e), u.globalCompositeOperation = "source-in", u.fillStyle = o ? a.getPattern(u, this) : a, u.fillRect(0, 0, r, i), u.restore(), this.paintInlineImageXObject(l.canvas)
                        }
                    },
                    paintImageMaskXObjectRepeat: function(e, t, r, i) {
                        var a = e.width,
                            o = e.height,
                            s = this.current.fillColor,
                            l = this.current.patternFill,
                            u = this.cachedCanvases.getCanvas("maskCanvas", a, o),
                            c = u.context;
                        c.save(), n(c, e), c.globalCompositeOperation = "source-in", c.fillStyle = l ? s.getPattern(c, this) : s, c.fillRect(0, 0, a, o), c.restore();
                        for (var h = this.ctx, d = 0, f = i.length; d < f; d += 2) h.save(), h.transform(t, 0, 0, r, i[d], i[d + 1]), h.scale(1, -1), h.drawImage(u.canvas, 0, 0, a, o, 0, -1, 1, 1), h.restore()
                    },
                    paintImageMaskXObjectGroup: function(e) {
                        for (var t = this.ctx, r = this.current.fillColor, i = this.current.patternFill, a = 0, o = e.length; a < o; a++) {
                            var s = e[a],
                                l = s.width,
                                u = s.height,
                                c = this.cachedCanvases.getCanvas("maskCanvas", l, u),
                                h = c.context;
                            h.save(), n(h, s), h.globalCompositeOperation = "source-in", h.fillStyle = i ? r.getPattern(h, this) : r, h.fillRect(0, 0, l, u), h.restore(), t.save(), t.transform.apply(t, s.transform), t.scale(1, -1), t.drawImage(c.canvas, 0, 0, l, u, 0, -1, 1, 1), t.restore()
                        }
                    },
                    paintImageXObject: function(e) {
                        var t = this.objs.get(e);
                        t ? this.paintInlineImageXObject(t) : (0, i.warn)("Dependent image isn't ready yet")
                    },
                    paintImageXObjectRepeat: function(e, t, n, r) {
                        var a = this.objs.get(e);
                        if (a) {
                            for (var o = a.width, s = a.height, l = [], u = 0, c = r.length; u < c; u += 2) l.push({
                                transform: [t, 0, 0, n, r[u], r[u + 1]],
                                x: 0,
                                y: 0,
                                w: o,
                                h: s
                            });
                            this.paintInlineImageXObjectGroup(a, l)
                        } else(0, i.warn)("Dependent image isn't ready yet")
                    },
                    paintInlineImageXObject: function(e) {
                        var n = e.width,
                            r = e.height,
                            i = this.ctx;
                        this.save(), i.scale(1 / n, -1 / r);
                        var a, o, s = i.mozCurrentTransformInverse,
                            l = s[0],
                            u = s[1],
                            c = Math.max(Math.sqrt(l * l + u * u), 1),
                            h = s[2],
                            d = s[3],
                            f = Math.max(Math.sqrt(h * h + d * d), 1);
                        if (e instanceof HTMLElement || !e.data) a = e;
                        else {
                            var p = (o = this.cachedCanvases.getCanvas("inlineImage", n, r)).context;
                            t(p, e), a = o.canvas
                        }
                        for (var v = n, g = r, m = "prescale1"; c > 2 && v > 1 || f > 2 && g > 1;) {
                            var b = v,
                                y = g;
                            c > 2 && v > 1 && (c /= v / (b = Math.ceil(v / 2))), f > 2 && g > 1 && (f /= g / (y = Math.ceil(g / 2))), (p = (o = this.cachedCanvases.getCanvas(m, b, y)).context).clearRect(0, 0, b, y), p.drawImage(a, 0, 0, v, g, 0, 0, b, y), a = o.canvas, v = b, g = y, m = "prescale1" === m ? "prescale2" : "prescale1"
                        }
                        if (i.drawImage(a, 0, 0, v, g, 0, -r, n, r), this.imageLayer) {
                            var _ = this.getCanvasPosition(0, -r);
                            this.imageLayer.appendImage({
                                imgData: e,
                                left: _[0],
                                top: _[1],
                                width: n / s[0],
                                height: r / s[3]
                            })
                        }
                        this.restore()
                    },
                    paintInlineImageXObjectGroup: function(e, n) {
                        var r = this.ctx,
                            i = e.width,
                            a = e.height,
                            o = this.cachedCanvases.getCanvas("inlineImage", i, a);
                        t(o.context, e);
                        for (var s = 0, l = n.length; s < l; s++) {
                            var u = n[s];
                            if (r.save(), r.transform.apply(r, u.transform), r.scale(1, -1), r.drawImage(o.canvas, u.x, u.y, u.w, u.h, 0, -1, 1, 1), this.imageLayer) {
                                var c = this.getCanvasPosition(u.x, u.y);
                                this.imageLayer.appendImage({
                                    imgData: e,
                                    left: c[0],
                                    top: c[1],
                                    width: i,
                                    height: a
                                })
                            }
                            r.restore()
                        }
                    },
                    paintSolidColorImageMask: function() {
                        this.ctx.fillRect(0, 0, 1, 1)
                    },
                    paintXObject: function() {
                        (0, i.warn)("Unsupported 'paintXObject' command.")
                    },
                    markPoint: function(e) {},
                    markPointProps: function(e, t) {},
                    beginMarkedContent: function(e) {},
                    beginMarkedContentProps: function(e, t) {},
                    endMarkedContent: function() {},
                    beginCompat: function() {},
                    endCompat: function() {},
                    consumePath: function() {
                        var e = this.ctx;
                        this.pendingClip && (this.pendingClip === _ ? e.clip("evenodd") : e.clip(), this.pendingClip = null), e.beginPath()
                    },
                    getSinglePixelWidth: function(e) {
                        if (null === this.cachedGetSinglePixelWidth) {
                            this.ctx.save();
                            var t = this.ctx.mozCurrentTransformInverse;
                            this.ctx.restore(), this.cachedGetSinglePixelWidth = Math.sqrt(Math.max(t[0] * t[0] + t[1] * t[1], t[2] * t[2] + t[3] * t[3]))
                        }
                        return this.cachedGetSinglePixelWidth
                    },
                    getCanvasPosition: function(e, t) {
                        var n = this.ctx.mozCurrentTransform;
                        return [n[0] * e + n[2] * t + n[4], n[1] * e + n[3] * t + n[5]]
                    }
                };
                for (var w in i.OPS) e.prototype[i.OPS[w]] = e.prototype[w];
                return e
            }();
        t.CanvasGraphics = h
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TilingPattern = t.getShadingPatternFromIR = void 0;
        var r = n(0),
            i = n(70),
            a = {};
        a.RadialAxial = {
            fromIR: function(e) {
                var t = e[1],
                    n = e[2],
                    r = e[3],
                    i = e[4],
                    a = e[5],
                    o = e[6];
                return {
                    type: "Pattern",
                    getPattern: function(e) {
                        var s;
                        "axial" === t ? s = e.createLinearGradient(r[0], r[1], i[0], i[1]) : "radial" === t && (s = e.createRadialGradient(r[0], r[1], a, i[0], i[1], o));
                        for (var l = 0, u = n.length; l < u; ++l) {
                            var c = n[l];
                            s.addColorStop(c[0], c[1])
                        }
                        return s
                    }
                }
            }
        };
        var o = function() {
            function e(e, t, n, r, i, a, o, s) {
                var l, u = t.coords,
                    c = t.colors,
                    h = e.data,
                    d = 4 * e.width;
                u[n + 1] > u[r + 1] && (l = n, n = r, r = l, l = a, a = o, o = l), u[r + 1] > u[i + 1] && (l = r, r = i, i = l, l = o, o = s, s = l), u[n + 1] > u[r + 1] && (l = n, n = r, r = l, l = a, a = o, o = l);
                var f = (u[n] + t.offsetX) * t.scaleX,
                    p = (u[n + 1] + t.offsetY) * t.scaleY,
                    v = (u[r] + t.offsetX) * t.scaleX,
                    g = (u[r + 1] + t.offsetY) * t.scaleY,
                    m = (u[i] + t.offsetX) * t.scaleX,
                    b = (u[i + 1] + t.offsetY) * t.scaleY;
                if (!(p >= b))
                    for (var y, _, w, S, P, A, C, k, T, x = c[a], E = c[a + 1], R = c[a + 2], L = c[o], I = c[o + 1], F = c[o + 2], D = c[s], O = c[s + 1], N = c[s + 2], M = Math.round(p), B = Math.round(b), j = M; j <= B; j++) {
                        j < g ? (y = f - (f - v) * (T = j < p ? 0 : p === g ? 1 : (p - j) / (p - g)), _ = x - (x - L) * T, w = E - (E - I) * T, S = R - (R - F) * T) : (y = v - (v - m) * (T = j > b ? 1 : g === b ? 0 : (g - j) / (g - b)), _ = L - (L - D) * T, w = I - (I - O) * T, S = F - (F - N) * T), P = f - (f - m) * (T = j < p ? 0 : j > b ? 1 : (p - j) / (p - b)), A = x - (x - D) * T, C = E - (E - O) * T, k = R - (R - N) * T;
                        for (var V = Math.round(Math.min(y, P)), U = Math.round(Math.max(y, P)), q = d * j + 4 * V, W = V; W <= U; W++) T = (T = (y - W) / (y - P)) < 0 ? 0 : T > 1 ? 1 : T, h[q++] = _ - (_ - A) * T | 0, h[q++] = w - (w - C) * T | 0, h[q++] = S - (S - k) * T | 0, h[q++] = 255
                    }
            }

            function t(t, n, r) {
                var i, a, o = n.coords,
                    s = n.colors;
                switch (n.type) {
                    case "lattice":
                        var l = n.verticesPerRow,
                            u = Math.floor(o.length / l) - 1,
                            c = l - 1;
                        for (i = 0; i < u; i++)
                            for (var h = i * l, d = 0; d < c; d++, h++) e(t, r, o[h], o[h + 1], o[h + l], s[h], s[h + 1], s[h + l]), e(t, r, o[h + l + 1], o[h + 1], o[h + l], s[h + l + 1], s[h + 1], s[h + l]);
                        break;
                    case "triangles":
                        for (i = 0, a = o.length; i < a; i += 3) e(t, r, o[i], o[i + 1], o[i + 2], s[i], s[i + 1], s[i + 2]);
                        break;
                    default:
                        throw new Error("illegal figure")
                }
            }
            return function(e, n, r, a, o, s, l) {
                var u, c, h, d, f = Math.floor(e[0]),
                    p = Math.floor(e[1]),
                    v = Math.ceil(e[2]) - f,
                    g = Math.ceil(e[3]) - p,
                    m = Math.min(Math.ceil(Math.abs(v * n[0] * 1.1)), 3e3),
                    b = Math.min(Math.ceil(Math.abs(g * n[1] * 1.1)), 3e3),
                    y = v / m,
                    _ = g / b,
                    w = {
                        coords: r,
                        colors: a,
                        offsetX: -f,
                        offsetY: -p,
                        scaleX: 1 / y,
                        scaleY: 1 / _
                    },
                    S = m + 4,
                    P = b + 4;
                if (i.WebGLUtils.isEnabled) u = i.WebGLUtils.drawFigures(m, b, s, o, w), (c = l.getCanvas("mesh", S, P, !1)).context.drawImage(u, 2, 2), u = c.canvas;
                else {
                    var A = (c = l.getCanvas("mesh", S, P, !1)).context,
                        C = A.createImageData(m, b);
                    if (s) {
                        var k = C.data;
                        for (h = 0, d = k.length; h < d; h += 4) k[h] = s[0], k[h + 1] = s[1], k[h + 2] = s[2], k[h + 3] = 255
                    }
                    for (h = 0; h < o.length; h++) t(C, o[h], w);
                    A.putImageData(C, 2, 2), u = c.canvas
                }
                return {
                    canvas: u,
                    offsetX: f - 2 * y,
                    offsetY: p - 2 * _,
                    scaleX: y,
                    scaleY: _
                }
            }
        }();
        a.Mesh = {
            fromIR: function(e) {
                var t = e[2],
                    n = e[3],
                    i = e[4],
                    a = e[5],
                    s = e[6],
                    l = e[8];
                return {
                    type: "Pattern",
                    getPattern: function(e, u, c) {
                        var h;
                        if (c) h = r.Util.singularValueDecompose2dScale(e.mozCurrentTransform);
                        else if (h = r.Util.singularValueDecompose2dScale(u.baseTransform), s) {
                            var d = r.Util.singularValueDecompose2dScale(s);
                            h = [h[0] * d[0], h[1] * d[1]]
                        }
                        var f = o(a, h, t, n, i, c ? null : l, u.cachedCanvases);
                        return c || (e.setTransform.apply(e, u.baseTransform), s && e.transform.apply(e, s)), e.translate(f.offsetX, f.offsetY), e.scale(f.scaleX, f.scaleY), e.createPattern(f.canvas, "no-repeat")
                    }
                }
            }
        }, a.Dummy = {
            fromIR: function() {
                return {
                    type: "Pattern",
                    getPattern: function() {
                        return "hotpink"
                    }
                }
            }
        };
        var s = function() {
            function e(e, t, n, r, i) {
                this.operatorList = e[2], this.matrix = e[3] || [1, 0, 0, 1, 0, 0], this.bbox = e[4], this.xstep = e[5], this.ystep = e[6], this.paintType = e[7], this.tilingType = e[8], this.color = t, this.canvasGraphicsFactory = r, this.baseTransform = i, this.type = "Pattern", this.ctx = n
            }
            var t = 1,
                n = 2;
            return e.prototype = {
                createPatternCanvas: function(e) {
                    var t = this.operatorList,
                        n = this.bbox,
                        i = this.xstep,
                        a = this.ystep,
                        o = this.paintType,
                        s = this.tilingType,
                        l = this.color,
                        u = this.canvasGraphicsFactory;
                    (0, r.info)("TilingType: " + s);
                    var c = n[0],
                        h = n[1],
                        d = n[2],
                        f = n[3],
                        p = [c, h],
                        v = [c + i, h + a],
                        g = v[0] - p[0],
                        m = v[1] - p[1],
                        b = r.Util.singularValueDecompose2dScale(this.matrix),
                        y = r.Util.singularValueDecompose2dScale(this.baseTransform),
                        _ = [b[0] * y[0], b[1] * y[1]];
                    g = Math.min(Math.ceil(Math.abs(g * _[0])), 3e3), m = Math.min(Math.ceil(Math.abs(m * _[1])), 3e3);
                    var w = e.cachedCanvases.getCanvas("pattern", g, m, !0),
                        S = w.context,
                        P = u.createCanvasGraphics(S);
                    P.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(P, o, l), this.setScale(g, m, i, a), this.transformToScale(P);
                    var A = [1, 0, 0, 1, -p[0], -p[1]];
                    return P.transform.apply(P, A), this.clipBbox(P, n, c, h, d, f), P.executeOperatorList(t), w.canvas
                },
                setScale: function(e, t, n, r) {
                    this.scale = [e / n, t / r]
                },
                transformToScale: function(e) {
                    var t = this.scale,
                        n = [t[0], 0, 0, t[1], 0, 0];
                    e.transform.apply(e, n)
                },
                scaleToContext: function() {
                    var e = this.scale;
                    this.ctx.scale(1 / e[0], 1 / e[1])
                },
                clipBbox: function(e, t, n, r, i, a) {
                    if (Array.isArray(t) && 4 === t.length) {
                        var o = i - n,
                            s = a - r;
                        e.ctx.rect(n, r, o, s), e.clip(), e.endPath()
                    }
                },
                setFillAndStrokeStyleToContext: function(e, i, a) {
                    var o = e.ctx,
                        s = e.current;
                    switch (i) {
                        case t:
                            var l = this.ctx;
                            o.fillStyle = l.fillStyle, o.strokeStyle = l.strokeStyle, s.fillColor = l.fillStyle, s.strokeColor = l.strokeStyle;
                            break;
                        case n:
                            var u = r.Util.makeCssRgb(a[0], a[1], a[2]);
                            o.fillStyle = u, o.strokeStyle = u, s.fillColor = u, s.strokeColor = u;
                            break;
                        default:
                            throw new r.FormatError("Unsupported paint type: " + i)
                    }
                },
                getPattern: function(e, t) {
                    var n = this.createPatternCanvas(t);
                    return (e = this.ctx).setTransform.apply(e, this.baseTransform), e.transform.apply(e, this.matrix), this.scaleToContext(), e.createPattern(n, "repeat")
                }
            }, e
        }();
        t.getShadingPatternFromIR = function(e) {
            var t = a[e[0]];
            if (!t) throw new Error("Unknown IR type: " + e[0]);
            return t.fromIR(e)
        }, t.TilingPattern = s
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PDFDataTransportStream = void 0;
        var r = n(0),
            i = function() {
                function e(e, t) {
                    var n = this;
                    (0, r.assert)(t), this._queuedChunks = [];
                    var i = e.initialData;
                    if (i && i.length > 0) {
                        var a = new Uint8Array(i).buffer;
                        this._queuedChunks.push(a)
                    }
                    this._pdfDataRangeTransport = t, this._isRangeSupported = !e.disableRange, this._isStreamingSupported = !e.disableStream, this._contentLength = e.length, this._fullRequestReader = null, this._rangeReaders = [], this._pdfDataRangeTransport.addRangeListener(function(e, t) {
                        n._onReceiveData({
                            begin: e,
                            chunk: t
                        })
                    }), this._pdfDataRangeTransport.addProgressListener(function(e) {
                        n._onProgress({
                            loaded: e
                        })
                    }), this._pdfDataRangeTransport.addProgressiveReadListener(function(e) {
                        n._onReceiveData({
                            chunk: e
                        })
                    }), this._pdfDataRangeTransport.transportReady()
                }

                function t(e, t) {
                    this._stream = e, this._done = !1, this._queuedChunks = t || [], this._requests = [], this._headersReady = Promise.resolve(), e._fullRequestReader = this, this.onProgress = null
                }

                function n(e, t, n) {
                    this._stream = e, this._begin = t, this._end = n, this._queuedChunk = null, this._requests = [], this._done = !1, this.onProgress = null
                }
                return e.prototype = {
                    _onReceiveData: function(e) {
                        var t = new Uint8Array(e.chunk).buffer;
                        if (void 0 === e.begin) this._fullRequestReader ? this._fullRequestReader._enqueue(t) : this._queuedChunks.push(t);
                        else {
                            var n = this._rangeReaders.some(function(n) {
                                return n._begin === e.begin && (n._enqueue(t), !0)
                            });
                            (0, r.assert)(n)
                        }
                    },
                    _onProgress: function(e) {
                        if (this._rangeReaders.length > 0) {
                            var t = this._rangeReaders[0];
                            t.onProgress && t.onProgress({
                                loaded: e.loaded
                            })
                        }
                    },
                    _removeRangeReader: function(e) {
                        var t = this._rangeReaders.indexOf(e);
                        t >= 0 && this._rangeReaders.splice(t, 1)
                    },
                    getFullReader: function() {
                        (0, r.assert)(!this._fullRequestReader);
                        var e = this._queuedChunks;
                        return this._queuedChunks = null, new t(this, e)
                    },
                    getRangeReader: function(e, t) {
                        var r = new n(this, e, t);
                        return this._pdfDataRangeTransport.requestDataRange(e, t), this._rangeReaders.push(r), r
                    },
                    cancelAllRequests: function(e) {
                        this._fullRequestReader && this._fullRequestReader.cancel(e);
                        this._rangeReaders.slice(0).forEach(function(t) {
                            t.cancel(e)
                        }), this._pdfDataRangeTransport.abort()
                    }
                }, t.prototype = {
                    _enqueue: function(e) {
                        if (!this._done)
                            if (this._requests.length > 0) {
                                this._requests.shift().resolve({
                                    value: e,
                                    done: !1
                                })
                            } else this._queuedChunks.push(e)
                    },
                    get headersReady() {
                        return this._headersReady
                    },
                    get isRangeSupported() {
                        return this._stream._isRangeSupported
                    },
                    get isStreamingSupported() {
                        return this._stream._isStreamingSupported
                    },
                    get contentLength() {
                        return this._stream._contentLength
                    },
                    read: function() {
                        if (this._queuedChunks.length > 0) {
                            var e = this._queuedChunks.shift();
                            return Promise.resolve({
                                value: e,
                                done: !1
                            })
                        }
                        if (this._done) return Promise.resolve({
                            value: void 0,
                            done: !0
                        });
                        var t = (0, r.createPromiseCapability)();
                        return this._requests.push(t), t.promise
                    },
                    cancel: function(e) {
                        this._done = !0, this._requests.forEach(function(e) {
                            e.resolve({
                                value: void 0,
                                done: !0
                            })
                        }), this._requests = []
                    }
                }, n.prototype = {
                    _enqueue: function(e) {
                        if (!this._done) {
                            if (0 === this._requests.length) this._queuedChunk = e;
                            else {
                                this._requests.shift().resolve({
                                    value: e,
                                    done: !1
                                }), this._requests.forEach(function(e) {
                                    e.resolve({
                                        value: void 0,
                                        done: !0
                                    })
                                }), this._requests = []
                            }
                            this._done = !0, this._stream._removeRangeReader(this)
                        }
                    },
                    get isStreamingSupported() {
                        return !1
                    },
                    read: function() {
                        if (this._queuedChunk) {
                            var e = this._queuedChunk;
                            return this._queuedChunk = null, Promise.resolve({
                                value: e,
                                done: !1
                            })
                        }
                        if (this._done) return Promise.resolve({
                            value: void 0,
                            done: !0
                        });
                        var t = (0, r.createPromiseCapability)();
                        return this._requests.push(t), t.promise
                    },
                    cancel: function(e) {
                        this._done = !0, this._requests.forEach(function(e) {
                            e.resolve({
                                value: void 0,
                                done: !0
                            })
                        }), this._requests = [], this._stream._removeRangeReader(this)
                    }
                }, e
            }();
        t.PDFDataTransportStream = i
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function i(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            return {
                protocol: e.protocol,
                auth: e.auth,
                host: e.hostname,
                port: e.port,
                path: e.path,
                method: "GET",
                headers: t
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PDFNodeStream = void 0;
        var s = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            l = n(0),
            u = n(44),
            c = require("fs"),
            h = require("http"),
            d = require("https"),
            f = require("url"),
            p = function() {
                function e(t) {
                    a(this, e), this.options = t, this.source = t.source, this.url = f.parse(this.source.url), this.isHttp = "http:" === this.url.protocol || "https:" === this.url.protocol, this.isFsUrl = "file:" === this.url.protocol || !this.url.host, this.httpHeaders = this.isHttp && this.source.httpHeaders || {}, this._fullRequest = null, this._rangeRequestReaders = []
                }
                return s(e, [{
                    key: "getFullReader",
                    value: function() {
                        return (0, l.assert)(!this._fullRequest), this._fullRequest = this.isFsUrl ? new y(this) : new m(this), this._fullRequest
                    }
                }, {
                    key: "getRangeReader",
                    value: function(e, t) {
                        var n = this.isFsUrl ? new _(this, e, t) : new b(this, e, t);
                        return this._rangeRequestReaders.push(n), n
                    }
                }, {
                    key: "cancelAllRequests",
                    value: function(e) {
                        this._fullRequest && this._fullRequest.cancel(e);
                        this._rangeRequestReaders.slice(0).forEach(function(t) {
                            t.cancel(e)
                        })
                    }
                }]), e
            }(),
            v = function() {
                function e(t) {
                    a(this, e), this._url = t.url, this._done = !1, this._errored = !1, this._reason = null, this.onProgress = null, this._contentLength = t.source.length, this._loaded = 0, this._disableRange = t.options.disableRange || !1, this._rangeChunkSize = t.source.rangeChunkSize, this._rangeChunkSize || this._disableRange || (this._disableRange = !0), this._isStreamingSupported = !t.source.disableStream, this._isRangeSupported = !t.options.disableRange, this._readableStream = null, this._readCapability = (0, l.createPromiseCapability)(), this._headersCapability = (0, l.createPromiseCapability)()
                }
                return s(e, [{
                    key: "read",
                    value: function() {
                        var e = this;
                        return this._readCapability.promise.then(function() {
                            if (e._done) return Promise.resolve({
                                value: void 0,
                                done: !0
                            });
                            if (e._errored) return Promise.reject(e._reason);
                            var t = e._readableStream.read();
                            if (null === t) return e._readCapability = (0, l.createPromiseCapability)(), e.read();
                            e._loaded += t.length, e.onProgress && e.onProgress({
                                loaded: e._loaded,
                                total: e._contentLength
                            });
                            var n = new Uint8Array(t).buffer;
                            return Promise.resolve({
                                value: n,
                                done: !1
                            })
                        })
                    }
                }, {
                    key: "cancel",
                    value: function(e) {
                        this._readableStream ? this._readableStream.destroy(e) : this._error(e)
                    }
                }, {
                    key: "_error",
                    value: function(e) {
                        this._errored = !0, this._reason = e, this._readCapability.resolve()
                    }
                }, {
                    key: "_setReadableStream",
                    value: function(e) {
                        var t = this;
                        this._readableStream = e, e.on("readable", function() {
                            t._readCapability.resolve()
                        }), e.on("end", function() {
                            e.destroy(), t._done = !0, t._readCapability.resolve()
                        }), e.on("error", function(e) {
                            t._error(e)
                        }), !this._isStreamingSupported && this._isRangeSupported && this._error(new l.AbortException("streaming is disabled")), this._errored && this._readableStream.destroy(this._reason)
                    }
                }, {
                    key: "headersReady",
                    get: function() {
                        return this._headersCapability.promise
                    }
                }, {
                    key: "contentLength",
                    get: function() {
                        return this._contentLength
                    }
                }, {
                    key: "isRangeSupported",
                    get: function() {
                        return this._isRangeSupported
                    }
                }, {
                    key: "isStreamingSupported",
                    get: function() {
                        return this._isStreamingSupported
                    }
                }]), e
            }(),
            g = function() {
                function e(t) {
                    a(this, e), this._url = t.url, this._done = !1, this._errored = !1, this._reason = null, this.onProgress = null, this._loaded = 0, this._readableStream = null, this._readCapability = (0, l.createPromiseCapability)(), this._isStreamingSupported = !t.source.disableStream
                }
                return s(e, [{
                    key: "read",
                    value: function() {
                        var e = this;
                        return this._readCapability.promise.then(function() {
                            if (e._done) return Promise.resolve({
                                value: void 0,
                                done: !0
                            });
                            if (e._errored) return Promise.reject(e._reason);
                            var t = e._readableStream.read();
                            if (null === t) return e._readCapability = (0, l.createPromiseCapability)(), e.read();
                            e._loaded += t.length, e.onProgress && e.onProgress({
                                loaded: e._loaded
                            });
                            var n = new Uint8Array(t).buffer;
                            return Promise.resolve({
                                value: n,
                                done: !1
                            })
                        })
                    }
                }, {
                    key: "cancel",
                    value: function(e) {
                        this._readableStream ? this._readableStream.destroy(e) : this._error(e)
                    }
                }, {
                    key: "_error",
                    value: function(e) {
                        this._errored = !0, this._reason = e, this._readCapability.resolve()
                    }
                }, {
                    key: "_setReadableStream",
                    value: function(e) {
                        var t = this;
                        this._readableStream = e, e.on("readable", function() {
                            t._readCapability.resolve()
                        }), e.on("end", function() {
                            e.destroy(), t._done = !0, t._readCapability.resolve()
                        }), e.on("error", function(e) {
                            t._error(e)
                        }), this._errored && this._readableStream.destroy(this._reason)
                    }
                }, {
                    key: "isStreamingSupported",
                    get: function() {
                        return this._isStreamingSupported
                    }
                }]), e
            }(),
            m = function(e) {
                function t(e) {
                    a(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                        i = function(t) {
                            n._headersCapability.resolve(), n._setReadableStream(t);
                            var r = (0, u.validateRangeRequestCapabilities)({
                                    getResponseHeader: function(e) {
                                        return n._readableStream.headers[e.toLowerCase()]
                                    },
                                    isHttp: e.isHttp,
                                    rangeChunkSize: n._rangeChunkSize,
                                    disableRange: n._disableRange
                                }),
                                i = r.allowRangeRequests,
                                a = r.suggestedLength;
                            i && (n._isRangeSupported = !0), n._contentLength = a
                        };
                    return n._request = null, "http:" === n._url.protocol ? n._request = h.request(o(n._url, e.httpHeaders), i) : n._request = d.request(o(n._url, e.httpHeaders), i), n._request.on("error", function(e) {
                        n._errored = !0, n._reason = e, n._headersCapability.reject(e)
                    }), n._request.end(), n
                }
                return i(t, v), t
            }(),
            b = function(e) {
                function t(e, n, i) {
                    a(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    s._httpHeaders = {};
                    for (var l in e.httpHeaders) {
                        var u = e.httpHeaders[l];
                        void 0 !== u && (s._httpHeaders[l] = u)
                    }
                    return s._httpHeaders.Range = "bytes=" + n + "-" + (i - 1), s._request = null, "http:" === s._url.protocol ? s._request = h.request(o(s._url, s._httpHeaders), function(e) {
                        s._setReadableStream(e)
                    }) : s._request = d.request(o(s._url, s._httpHeaders), function(e) {
                        s._setReadableStream(e)
                    }), s._request.on("error", function(e) {
                        s._errored = !0, s._reason = e
                    }), s._request.end(), s
                }
                return i(t, g), t
            }(),
            y = function(e) {
                function t(e) {
                    a(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)),
                        i = decodeURI(n._url.path);
                    return c.lstat(i, function(e, t) {
                        if (e) return n._errored = !0, n._reason = e, void n._headersCapability.reject(e);
                        n._contentLength = t.size, n._setReadableStream(c.createReadStream(i)), n._headersCapability.resolve()
                    }), n
                }
                return i(t, v), t
            }(),
            _ = function(e) {
                function t(e, n, i) {
                    a(this, t);
                    var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                    return o._setReadableStream(c.createReadStream(decodeURI(o._url.path), {
                        start: n,
                        end: i - 1
                    })), o
                }
                return i(t, g), t
            }();
        t.PDFNodeStream = p
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            return {
                method: "GET",
                headers: e,
                mode: "cors",
                credentials: t ? "include" : "same-origin",
                redirect: "follow"
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PDFFetchStream = void 0;
        var a = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }(),
            o = n(0),
            s = n(44),
            l = function() {
                function e(t) {
                    r(this, e), this.options = t, this.source = t.source, this.isHttp = /^https?:/i.test(this.source.url), this.httpHeaders = this.isHttp && this.source.httpHeaders || {}, this._fullRequestReader = null, this._rangeRequestReaders = []
                }
                return a(e, [{
                    key: "getFullReader",
                    value: function() {
                        return (0, o.assert)(!this._fullRequestReader), this._fullRequestReader = new u(this), this._fullRequestReader
                    }
                }, {
                    key: "getRangeReader",
                    value: function(e, t) {
                        var n = new c(this, e, t);
                        return this._rangeRequestReaders.push(n), n
                    }
                }, {
                    key: "cancelAllRequests",
                    value: function(e) {
                        this._fullRequestReader && this._fullRequestReader.cancel(e);
                        this._rangeRequestReaders.slice(0).forEach(function(t) {
                            t.cancel(e)
                        })
                    }
                }]), e
            }(),
            u = function() {
                function e(t) {
                    var n = this;
                    r(this, e), this._stream = t, this._reader = null, this._loaded = 0, this._withCredentials = t.source.withCredentials, this._contentLength = this._stream.source.length, this._headersCapability = (0, o.createPromiseCapability)(), this._disableRange = this._stream.options.disableRange, this._rangeChunkSize = this._stream.source.rangeChunkSize, this._rangeChunkSize || this._disableRange || (this._disableRange = !0), this._isRangeSupported = !this._stream.options.disableRange, this._isStreamingSupported = !this._stream.source.disableStream, this._headers = new Headers;
                    for (var a in this._stream.httpHeaders) {
                        var l = this._stream.httpHeaders[a];
                        void 0 !== l && this._headers.append(a, l)
                    }
                    var u = this._stream.source.url;
                    fetch(u, i(this._headers, this._withCredentials)).then(function(e) {
                        if (!(0, s.validateResponseStatus)(e.status)) throw (0, s.createResponseStatusError)(e.status, u);
                        n._reader = e.body.getReader(), n._headersCapability.resolve();
                        var t = (0, s.validateRangeRequestCapabilities)({
                                getResponseHeader: function(t) {
                                    return e.headers.get(t)
                                },
                                isHttp: n._stream.isHttp,
                                rangeChunkSize: n._rangeChunkSize,
                                disableRange: n._disableRange
                            }),
                            r = t.allowRangeRequests,
                            i = t.suggestedLength;
                        n._contentLength = i, n._isRangeSupported = r, !n._isStreamingSupported && n._isRangeSupported && n.cancel(new o.AbortException("streaming is disabled"))
                    }).catch(this._headersCapability.reject), this.onProgress = null
                }
                return a(e, [{
                    key: "read",
                    value: function() {
                        var e = this;
                        return this._headersCapability.promise.then(function() {
                            return e._reader.read().then(function(t) {
                                var n = t.value,
                                    r = t.done;
                                if (r) return Promise.resolve({
                                    value: n,
                                    done: r
                                });
                                e._loaded += n.byteLength, e.onProgress && e.onProgress({
                                    loaded: e._loaded,
                                    total: e._contentLength
                                });
                                var i = new Uint8Array(n).buffer;
                                return Promise.resolve({
                                    value: i,
                                    done: !1
                                })
                            })
                        })
                    }
                }, {
                    key: "cancel",
                    value: function(e) {
                        this._reader && this._reader.cancel(e)
                    }
                }, {
                    key: "headersReady",
                    get: function() {
                        return this._headersCapability.promise
                    }
                }, {
                    key: "contentLength",
                    get: function() {
                        return this._contentLength
                    }
                }, {
                    key: "isRangeSupported",
                    get: function() {
                        return this._isRangeSupported
                    }
                }, {
                    key: "isStreamingSupported",
                    get: function() {
                        return this._isStreamingSupported
                    }
                }]), e
            }(),
            c = function() {
                function e(t, n, a) {
                    var l = this;
                    r(this, e), this._stream = t, this._reader = null, this._loaded = 0, this._withCredentials = t.source.withCredentials, this._readCapability = (0, o.createPromiseCapability)(), this._isStreamingSupported = !t.source.disableStream, this._headers = new Headers;
                    for (var u in this._stream.httpHeaders) {
                        var c = this._stream.httpHeaders[u];
                        void 0 !== c && this._headers.append(u, c)
                    }
                    var h = n + "-" + (a - 1);
                    this._headers.append("Range", "bytes=" + h);
                    var d = this._stream.source.url;
                    fetch(d, i(this._headers, this._withCredentials)).then(function(e) {
                        if (!(0, s.validateResponseStatus)(e.status)) throw (0, s.createResponseStatusError)(e.status, d);
                        l._readCapability.resolve(), l._reader = e.body.getReader()
                    }), this.onProgress = null
                }
                return a(e, [{
                    key: "read",
                    value: function() {
                        var e = this;
                        return this._readCapability.promise.then(function() {
                            return e._reader.read().then(function(t) {
                                var n = t.value,
                                    r = t.done;
                                if (r) return Promise.resolve({
                                    value: n,
                                    done: r
                                });
                                e._loaded += n.byteLength, e.onProgress && e.onProgress({
                                    loaded: e._loaded
                                });
                                var i = new Uint8Array(n).buffer;
                                return Promise.resolve({
                                    value: i,
                                    done: !1
                                })
                            })
                        })
                    }
                }, {
                    key: "cancel",
                    value: function(e) {
                        this._reader && this._reader.cancel(e)
                    }
                }, {
                    key: "isStreamingSupported",
                    get: function() {
                        return this._isStreamingSupported
                    }
                }]), e
            }();
        t.PDFFetchStream = l
    }, function(e, t, n) {
        "use strict";

        function r(e, t) {
            this.url = e, t = t || {}, this.isHttp = /^https?:/i.test(e), this.httpHeaders = this.isHttp && t.httpHeaders || {}, this.withCredentials = t.withCredentials || !1, this.getXhr = t.getXhr || function() {
                return new XMLHttpRequest
            }, this.currXhrId = 0, this.pendingRequests = Object.create(null), this.loadedRequests = Object.create(null)
        }

        function i(e) {
            var t = e.response;
            if ("string" != typeof t) return t;
            return (0, l.stringToBytes)(t).buffer
        }

        function a(e) {
            this._options = e;
            var t = e.source;
            this._manager = new r(t.url, {
                httpHeaders: t.httpHeaders,
                withCredentials: t.withCredentials
            }), this._rangeChunkSize = t.rangeChunkSize, this._fullRequestReader = null, this._rangeRequestReaders = []
        }

        function o(e, t) {
            this._manager = e;
            var n = t.source,
                r = {
                    onHeadersReceived: this._onHeadersReceived.bind(this),
                    onProgressiveData: n.disableStream ? null : this._onProgressiveData.bind(this),
                    onDone: this._onDone.bind(this),
                    onError: this._onError.bind(this),
                    onProgress: this._onProgress.bind(this)
                };
            this._url = n.url, this._fullRequestId = e.requestFull(r), this._headersReceivedCapability = (0, l.createPromiseCapability)(), this._disableRange = t.disableRange || !1, this._contentLength = n.length, this._rangeChunkSize = n.rangeChunkSize, this._rangeChunkSize || this._disableRange || (this._disableRange = !0), this._isStreamingSupported = !1, this._isRangeSupported = !1, this._cachedChunks = [], this._requests = [], this._done = !1, this._storedError = void 0, this.onProgress = null
        }

        function s(e, t, n) {
            this._manager = e;
            var r = {
                onDone: this._onDone.bind(this),
                onProgress: this._onProgress.bind(this)
            };
            this._requestId = e.requestRange(t, n, r), this._requests = [], this._queuedChunk = null, this._done = !1, this.onProgress = null, this.onClosed = null
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.NetworkManager = t.PDFNetworkStream = void 0;
        var l = n(0),
            u = n(44),
            c = function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(n(20)),
            h = function() {
                try {
                    var e = new XMLHttpRequest;
                    return e.open("GET", c.default.location.href), e.responseType = "moz-chunked-arraybuffer", "moz-chunked-arraybuffer" === e.responseType
                } catch (e) {
                    return !1
                }
            }();
        r.prototype = {
            requestRange: function(e, t, n) {
                var r = {
                    begin: e,
                    end: t
                };
                for (var i in n) r[i] = n[i];
                return this.request(r)
            },
            requestFull: function(e) {
                return this.request(e)
            },
            request: function(e) {
                var t = this.getXhr(),
                    n = this.currXhrId++,
                    r = this.pendingRequests[n] = {
                        xhr: t
                    };
                t.open("GET", this.url), t.withCredentials = this.withCredentials;
                for (var i in this.httpHeaders) {
                    var a = this.httpHeaders[i];
                    void 0 !== a && t.setRequestHeader(i, a)
                }
                if (this.isHttp && "begin" in e && "end" in e) {
                    var o = e.begin + "-" + (e.end - 1);
                    t.setRequestHeader("Range", "bytes=" + o), r.expectedStatus = 206
                } else r.expectedStatus = 200;
                return h && !!e.onProgressiveData ? (t.responseType = "moz-chunked-arraybuffer", r.onProgressiveData = e.onProgressiveData, r.mozChunked = !0) : t.responseType = "arraybuffer", e.onError && (t.onerror = function(n) {
                    e.onError(t.status)
                }), t.onreadystatechange = this.onStateChange.bind(this, n), t.onprogress = this.onProgress.bind(this, n), r.onHeadersReceived = e.onHeadersReceived, r.onDone = e.onDone, r.onError = e.onError, r.onProgress = e.onProgress, t.send(null), n
            },
            onProgress: function(e, t) {
                var n = this.pendingRequests[e];
                if (n) {
                    if (n.mozChunked) {
                        var r = i(n.xhr);
                        n.onProgressiveData(r)
                    }
                    var a = n.onProgress;
                    a && a(t)
                }
            },
            onStateChange: function(e, t) {
                var n = this.pendingRequests[e];
                if (n) {
                    var r = n.xhr;
                    if (r.readyState >= 2 && n.onHeadersReceived && (n.onHeadersReceived(), delete n.onHeadersReceived), 4 === r.readyState && e in this.pendingRequests)
                        if (delete this.pendingRequests[e], 0 === r.status && this.isHttp) n.onError && n.onError(r.status);
                        else {
                            var a = r.status || 200;
                            if (200 === a && 206 === n.expectedStatus || a === n.expectedStatus) {
                                this.loadedRequests[e] = !0;
                                var o = i(r);
                                if (206 === a) {
                                    var s = r.getResponseHeader("Content-Range"),
                                        l = /bytes (\d+)-(\d+)\/(\d+)/.exec(s),
                                        u = parseInt(l[1], 10);
                                    n.onDone({
                                        begin: u,
                                        chunk: o
                                    })
                                } else n.onProgressiveData ? n.onDone(null) : o ? n.onDone({
                                    begin: 0,
                                    chunk: o
                                }) : n.onError && n.onError(r.status)
                            } else n.onError && n.onError(r.status)
                        }
                }
            },
            hasPendingRequests: function() {
                for (var e in this.pendingRequests) return !0;
                return !1
            },
            getRequestXhr: function(e) {
                return this.pendingRequests[e].xhr
            },
            isStreamingRequest: function(e) {
                return !!this.pendingRequests[e].onProgressiveData
            },
            isPendingRequest: function(e) {
                return e in this.pendingRequests
            },
            isLoadedRequest: function(e) {
                return e in this.loadedRequests
            },
            abortAllRequests: function() {
                for (var e in this.pendingRequests) this.abortRequest(0 | e)
            },
            abortRequest: function(e) {
                var t = this.pendingRequests[e].xhr;
                delete this.pendingRequests[e], t.abort()
            }
        }, a.prototype = {
            _onRangeRequestReaderClosed: function(e) {
                var t = this._rangeRequestReaders.indexOf(e);
                t >= 0 && this._rangeRequestReaders.splice(t, 1)
            },
            getFullReader: function() {
                return (0, l.assert)(!this._fullRequestReader), this._fullRequestReader = new o(this._manager, this._options), this._fullRequestReader
            },
            getRangeReader: function(e, t) {
                var n = new s(this._manager, e, t);
                return n.onClosed = this._onRangeRequestReaderClosed.bind(this), this._rangeRequestReaders.push(n), n
            },
            cancelAllRequests: function(e) {
                this._fullRequestReader && this._fullRequestReader.cancel(e);
                this._rangeRequestReaders.slice(0).forEach(function(t) {
                    t.cancel(e)
                })
            }
        }, o.prototype = {
            _onHeadersReceived: function() {
                var e = this._fullRequestId,
                    t = this._manager.getRequestXhr(e),
                    n = (0, u.validateRangeRequestCapabilities)({
                        getResponseHeader: function(e) {
                            return t.getResponseHeader(e)
                        },
                        isHttp: this._manager.isHttp,
                        rangeChunkSize: this._rangeChunkSize,
                        disableRange: this._disableRange
                    }),
                    r = n.allowRangeRequests,
                    i = n.suggestedLength;
                this._contentLength = i || this._contentLength, r && (this._isRangeSupported = !0);
                var a = this._manager;
                a.isStreamingRequest(e) ? this._isStreamingSupported = !0 : this._isRangeSupported && a.abortRequest(e), this._headersReceivedCapability.resolve()
            },
            _onProgressiveData: function(e) {
                if (this._requests.length > 0) {
                    this._requests.shift().resolve({
                        value: e,
                        done: !1
                    })
                } else this._cachedChunks.push(e)
            },
            _onDone: function(e) {
                e && this._onProgressiveData(e.chunk), this._done = !0, this._cachedChunks.length > 0 || (this._requests.forEach(function(e) {
                    e.resolve({
                        value: void 0,
                        done: !0
                    })
                }), this._requests = [])
            },
            _onError: function(e) {
                var t = this._url,
                    n = (0, u.createResponseStatusError)(e, t);
                this._storedError = n, this._headersReceivedCapability.reject(n), this._requests.forEach(function(e) {
                    e.reject(n)
                }), this._requests = [], this._cachedChunks = []
            },
            _onProgress: function(e) {
                this.onProgress && this.onProgress({
                    loaded: e.loaded,
                    total: e.lengthComputable ? e.total : this._contentLength
                })
            },
            get isRangeSupported() {
                return this._isRangeSupported
            },
            get isStreamingSupported() {
                return this._isStreamingSupported
            },
            get contentLength() {
                return this._contentLength
            },
            get headersReady() {
                return this._headersReceivedCapability.promise
            },
            read: function() {
                if (this._storedError) return Promise.reject(this._storedError);
                if (this._cachedChunks.length > 0) {
                    var e = this._cachedChunks.shift();
                    return Promise.resolve({
                        value: e,
                        done: !1
                    })
                }
                if (this._done) return Promise.resolve({
                    value: void 0,
                    done: !0
                });
                var t = (0, l.createPromiseCapability)();
                return this._requests.push(t), t.promise
            },
            cancel: function(e) {
                this._done = !0, this._headersReceivedCapability.reject(e), this._requests.forEach(function(e) {
                    e.resolve({
                        value: void 0,
                        done: !0
                    })
                }), this._requests = [], this._manager.isPendingRequest(this._fullRequestId) && this._manager.abortRequest(this._fullRequestId), this._fullRequestReader = null
            }
        }, s.prototype = {
            _close: function() {
                this.onClosed && this.onClosed(this)
            },
            _onDone: function(e) {
                var t = e.chunk;
                if (this._requests.length > 0) {
                    this._requests.shift().resolve({
                        value: t,
                        done: !1
                    })
                } else this._queuedChunk = t;
                this._done = !0, this._requests.forEach(function(e) {
                    e.resolve({
                        value: void 0,
                        done: !0
                    })
                }), this._requests = [], this._close()
            },
            _onProgress: function(e) {
                !this.isStreamingSupported && this.onProgress && this.onProgress({
                    loaded: e.loaded
                })
            },
            get isStreamingSupported() {
                return !1
            },
            read: function() {
                if (null !== this._queuedChunk) {
                    var e = this._queuedChunk;
                    return this._queuedChunk = null, Promise.resolve({
                        value: e,
                        done: !1
                    })
                }
                if (this._done) return Promise.resolve({
                    value: void 0,
                    done: !0
                });
                var t = (0, l.createPromiseCapability)();
                return this._requests.push(t), t.promise
            },
            cancel: function(e) {
                this._done = !0, this._requests.forEach(function(e) {
                    e.resolve({
                        value: void 0,
                        done: !0
                    })
                }), this._requests = [], this._manager.isPendingRequest(this._requestId) && this._manager.abortRequest(this._requestId), this._close()
            }
        }, t.PDFNetworkStream = a, t.NetworkManager = r
    }])
}),
function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 8)
}([function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        var n = 0,
            r = e.length - 1;
        if (0 === e.length || !t(e[r])) return e.length;
        if (t(e[n])) return n;
        for (; n < r;) {
            var i = n + r >> 1;
            t(e[i]) ? r = i : n = i + 1
        }
        return n
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.waitOnEventOrTimeout = t.WaitOnType = t.localized = t.animationStarted = t.normalizeWheelEventDelta = t.binarySearchFirstItem = t.watchScroll = t.scrollIntoView = t.getOutputScale = t.approximateFraction = t.roundToDivide = t.getVisibleElements = t.parseQueryString = t.noContextMenuHandler = t.getPDFFileNameFromURL = t.ProgressBar = t.EventBus = t.NullL10n = t.mozL10n = t.RendererType = t.PresentationModeState = t.cloneObj = t.isValidRotation = t.VERTICAL_PADDING = t.SCROLLBAR_PADDING = t.MAX_AUTO_SCALE = t.UNKNOWN_SCALE = t.MAX_SCALE = t.MIN_SCALE = t.DEFAULT_SCALE = t.DEFAULT_SCALE_VALUE = t.CSS_UNITS = void 0;
    var a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        s = n(1),
        l = {
            get: function(e, t, n) {
                return Promise.resolve(function(e, t) {
                    return t ? e.replace(/\{\{\s*(\w+)\s*\}\}/g, function(e, n) {
                        return n in t ? t[n] : "{{" + n + "}}"
                    }) : e
                }(n, t))
            },
            translate: function(e) {
                return Promise.resolve()
            }
        };
    s.PDFJS.disableFullscreen = void 0 !== s.PDFJS.disableFullscreen && s.PDFJS.disableFullscreen, s.PDFJS.useOnlyCssZoom = void 0 !== s.PDFJS.useOnlyCssZoom && s.PDFJS.useOnlyCssZoom, s.PDFJS.maxCanvasPixels = void 0 === s.PDFJS.maxCanvasPixels ? 16777216 : s.PDFJS.maxCanvasPixels, s.PDFJS.disableHistory = void 0 !== s.PDFJS.disableHistory && s.PDFJS.disableHistory, s.PDFJS.disableTextLayer = void 0 !== s.PDFJS.disableTextLayer && s.PDFJS.disableTextLayer, s.PDFJS.ignoreCurrentPositionOnZoom = void 0 !== s.PDFJS.ignoreCurrentPositionOnZoom && s.PDFJS.ignoreCurrentPositionOnZoom, s.PDFJS.locale = void 0 === s.PDFJS.locale && "undefined" != typeof navigator ? navigator.language : s.PDFJS.locale;
    var u = {
            EVENT: "event",
            TIMEOUT: "timeout"
        },
        c = new Promise(function(e) {
            window.requestAnimationFrame(e)
        }),
        h = Promise.resolve(),
        d = function() {
            function e() {
                r(this, e), this._listeners = Object.create(null)
            }
            return a(e, [{
                key: "on",
                value: function(e, t) {
                    var n = this._listeners[e];
                    n || (n = [], this._listeners[e] = n), n.push(t)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    var n = this._listeners[e],
                        r = void 0;
                    !n || (r = n.indexOf(t)) < 0 || n.splice(r, 1)
                }
            }, {
                key: "dispatch",
                value: function(e) {
                    var t = this._listeners[e];
                    if (t && 0 !== t.length) {
                        var n = Array.prototype.slice.call(arguments, 1);
                        t.slice(0).forEach(function(e) {
                            e.apply(null, n)
                        })
                    }
                }
            }]), e
        }(),
        f = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = n.height,
                    a = n.width,
                    o = n.units;
                r(this, e), this.visible = !0, this.div = document.querySelector(t + " .progress"), this.bar = this.div.parentNode, this.height = i || 100, this.width = a || 100, this.units = o || "%", this.div.style.height = this.height + this.units, this.percent = 0
            }
            return a(e, [{
                key: "_updateBar",
                value: function() {
                    if (this._indeterminate) return this.div.classList.add("indeterminate"), void(this.div.style.width = this.width + this.units);
                    this.div.classList.remove("indeterminate");
                    var e = this.width * this._percent / 100;
                    this.div.style.width = e + this.units
                }
            }, {
                key: "setWidth",
                value: function(e) {
                    if (e) {
                        var t = e.parentNode.offsetWidth - e.offsetWidth;
                        t > 0 && this.bar.setAttribute("style", "width: calc(100% - " + t + "px);")
                    }
                }
            }, {
                key: "hide",
                value: function() {
                    this.visible && (this.visible = !1, this.bar.classList.add("hidden"), document.body.classList.remove("loadingInProgress"))
                }
            }, {
                key: "show",
                value: function() {
                    this.visible || (this.visible = !0, document.body.classList.add("loadingInProgress"), this.bar.classList.remove("hidden"))
                }
            }, {
                key: "percent",
                get: function() {
                    return this._percent
                },
                set: function(e) {
                    this._indeterminate = isNaN(e), this._percent = function(e, t, n) {
                        return Math.min(Math.max(e, t), n)
                    }(e, 0, 100), this._updateBar()
                }
            }]), e
        }();
    t.CSS_UNITS = 96 / 72, t.DEFAULT_SCALE_VALUE = "auto", t.DEFAULT_SCALE = 1, t.MIN_SCALE = .25, t.MAX_SCALE = 10, t.UNKNOWN_SCALE = 0, t.MAX_AUTO_SCALE = 1.25, t.SCROLLBAR_PADDING = 40, t.VERTICAL_PADDING = 5, t.isValidRotation = function(e) {
        return Number.isInteger(e) && e % 90 == 0
    }, t.cloneObj = function(e) {
        var t = Object.create(null);
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t
    }, t.PresentationModeState = {
        UNKNOWN: 0,
        NORMAL: 1,
        CHANGING: 2,
        FULLSCREEN: 3
    }, t.RendererType = {
        CANVAS: "canvas",
        SVG: "svg"
    }, t.mozL10n = void 0, t.NullL10n = l, t.EventBus = d, t.ProgressBar = f, t.getPDFFileNameFromURL = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "document.pdf";
        if (function(e) {
                for (var t = 0, n = e.length; t < n && "" === e[t].trim();) t++;
                return "data:" === e.substr(t, 5).toLowerCase()
            }(e)) return console.warn('getPDFFileNameFromURL: ignoring "data:" URL for performance reasons.'), t;
        var n = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i,
            r = /^(?:(?:[^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/.exec(e),
            i = n.exec(r[1]) || n.exec(r[2]) || n.exec(r[3]);
        if (i && -1 !== (i = i[0]).indexOf("%")) try {
            i = n.exec(decodeURIComponent(i))[0]
        } catch (e) {}
        return i || t
    }, t.noContextMenuHandler = function(e) {
        e.preventDefault()
    }, t.parseQueryString = function(e) {
        for (var t = e.split("&"), n = Object.create(null), r = 0, i = t.length; r < i; ++r) {
            var a = t[r].split("="),
                o = a[0].toLowerCase(),
                s = a.length > 1 ? a[1] : null;
            n[decodeURIComponent(o)] = decodeURIComponent(s)
        }
        return n
    }, t.getVisibleElements = function(e, t) {
        for (var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r = e.scrollTop, a = r + e.clientHeight, o = e.scrollLeft, s = o + e.clientWidth, l = [], u = void 0, c = void 0, h = void 0, d = void 0, f = void 0, p = void 0, v = 0 === t.length ? 0 : i(t, function(e) {
                var t = e.div;
                return t.offsetTop + t.clientTop + t.clientHeight > r
            }), g = t.length; v < g && (u = t[v], c = u.div, h = c.offsetTop + c.clientTop, d = c.clientHeight, !(h > a)); v++)(p = c.offsetLeft + c.clientLeft) + c.clientWidth < o || p > s || (f = 100 * (d - (Math.max(0, r - h) + Math.max(0, h + d - a))) / d | 0, l.push({
            id: u.id,
            x: p,
            y: h,
            view: u,
            percent: f
        }));
        var m = l[0],
            b = l[l.length - 1];
        return n && l.sort(function(e, t) {
            var n = e.percent - t.percent;
            return Math.abs(n) > .001 ? -n : e.id - t.id
        }), {
            first: m,
            last: b,
            views: l
        }
    }, t.roundToDivide = function(e, t) {
        var n = e % t;
        return 0 === n ? e : Math.round(e - n + t)
    }, t.approximateFraction = function(e) {
        if (Math.floor(e) === e) return [e, 1];
        var t = 1 / e;
        if (t > 8) return [1, 8];
        if (Math.floor(t) === t) return [1, t];
        for (var n = e > 1 ? t : e, r = 0, i = 1, a = 1, o = 1;;) {
            var s = r + a,
                l = i + o;
            if (l > 8) break;
            n <= s / l ? (a = s, o = l) : (r = s, i = l)
        }
        return n - r / i < a / o - n ? n === e ? [r, i] : [i, r] : n === e ? [a, o] : [o, a]
    }, t.getOutputScale = function(e) {
        var t = (window.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1);
        return {
            sx: t,
            sy: t,
            scaled: 1 !== t
        }
    }, t.scrollIntoView = function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = e.offsetParent;
        if (r) {
            for (var i = e.offsetTop + e.clientTop, a = e.offsetLeft + e.clientLeft; r.clientHeight === r.scrollHeight || n && "hidden" === getComputedStyle(r).overflow;)
                if (r.dataset._scaleY && (i /= r.dataset._scaleY, a /= r.dataset._scaleX), i += r.offsetTop, a += r.offsetLeft, !(r = r.offsetParent)) return;
            t && (void 0 !== t.top && (i += t.top), void 0 !== t.left && (a += t.left, r.scrollLeft = a)), r.scrollTop = i
        } else console.error("offsetParent is not set -- cannot scroll")
    }, t.watchScroll = function(e, t) {
        var n = function(n) {
                i || (i = window.requestAnimationFrame(function() {
                    i = null;
                    var n = e.scrollTop,
                        a = r.lastY;
                    n !== a && (r.down = n > a), r.lastY = n, t(r)
                }))
            },
            r = {
                down: !0,
                lastY: e.scrollTop,
                _eventHandler: n
            },
            i = null;
        return e.addEventListener("scroll", n, !0), r
    }, t.binarySearchFirstItem = i, t.normalizeWheelEventDelta = function(e) {
        var t = Math.sqrt(e.deltaX * e.deltaX + e.deltaY * e.deltaY),
            n = Math.atan2(e.deltaY, e.deltaX);
        return -.25 * Math.PI < n && n < .75 * Math.PI && (t = -t), 0 === e.deltaMode ? t /= 900 : 1 === e.deltaMode && (t /= 30), t
    }, t.animationStarted = c, t.localized = h, t.WaitOnType = u, t.waitOnEventOrTimeout = function(e) {
        function t(e) {
            n instanceof d ? n.off(r, c) : n.removeEventListener(r, c), f && clearTimeout(f), l.resolve(e)
        }
        var n = e.target,
            r = e.name,
            i = e.delay,
            a = void 0 === i ? 0 : i;
        if ("object" !== (void 0 === n ? "undefined" : o(n)) || !r || "string" != typeof r || !(Number.isInteger(a) && a >= 0)) return Promise.reject(new Error("waitOnEventOrTimeout - invalid paramaters."));
        var l = (0, s.createPromiseCapability)(),
            c = t.bind(null, u.EVENT);
        n instanceof d ? n.on(r, c) : n.addEventListener(r, c);
        var h = t.bind(null, u.TIMEOUT),
            f = setTimeout(h, a);
        return l.promise
    }
}, function(e, t, n) {
    "use strict";
    var r;
    r = "undefined" != typeof window && window["pdfjs-dist/build/pdf"] ? window["pdfjs-dist/build/pdf"] : require("../build/pdf.js"), e.exports = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
        e.on("documentload", function() {
            var e = document.createEvent("CustomEvent");
            e.initCustomEvent("documentload", !0, !0, {}), window.dispatchEvent(e)
        }), e.on("pagerendered", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pagerendered", !0, !0, {
                pageNumber: e.pageNumber,
                cssTransform: e.cssTransform
            }), e.source.div.dispatchEvent(t)
        }), e.on("textlayerrendered", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("textlayerrendered", !0, !0, {
                pageNumber: e.pageNumber
            }), e.source.textLayerDiv.dispatchEvent(t)
        }), e.on("pagechange", function(e) {
            var t = document.createEvent("UIEvents");
            t.initUIEvent("pagechange", !0, !0, window, 0), t.pageNumber = e.pageNumber, e.source.container.dispatchEvent(t)
        }), e.on("pagesinit", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pagesinit", !0, !0, null), e.source.container.dispatchEvent(t)
        }), e.on("pagesloaded", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pagesloaded", !0, !0, {
                pagesCount: e.pagesCount
            }), e.source.container.dispatchEvent(t)
        }), e.on("scalechange", function(e) {
            var t = document.createEvent("UIEvents");
            t.initUIEvent("scalechange", !0, !0, window, 0), t.scale = e.scale, t.presetValue = e.presetValue, e.source.container.dispatchEvent(t)
        }), e.on("updateviewarea", function(e) {
            var t = document.createEvent("UIEvents");
            t.initUIEvent("updateviewarea", !0, !0, window, 0), t.location = e.location, e.source.container.dispatchEvent(t)
        }), e.on("find", function(e) {
            if (e.source !== window) {
                var t = document.createEvent("CustomEvent");
                t.initCustomEvent("find" + e.type, !0, !0, {
                    query: e.query,
                    phraseSearch: e.phraseSearch,
                    caseSensitive: e.caseSensitive,
                    highlightAll: e.highlightAll,
                    findPrevious: e.findPrevious
                }), window.dispatchEvent(t)
            }
        }), e.on("attachmentsloaded", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("attachmentsloaded", !0, !0, {
                attachmentsCount: e.attachmentsCount
            }), e.source.container.dispatchEvent(t)
        }), e.on("sidebarviewchanged", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("sidebarviewchanged", !0, !0, {
                view: e.view
            }), e.source.outerContainer.dispatchEvent(t)
        }), e.on("pagemode", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("pagemode", !0, !0, {
                mode: e.mode
            }), e.source.pdfViewer.container.dispatchEvent(t)
        }), e.on("namedaction", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("namedaction", !0, !0, {
                action: e.action
            }), e.source.pdfViewer.container.dispatchEvent(t)
        }), e.on("presentationmodechanged", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("presentationmodechanged", !0, !0, {
                active: e.active,
                switchInProgress: e.switchInProgress
            }), window.dispatchEvent(t)
        }), e.on("outlineloaded", function(e) {
            var t = document.createEvent("CustomEvent");
            t.initCustomEvent("outlineloaded", !0, !0, {
                outlineCount: e.outlineCount
            }), e.source.container.dispatchEvent(t)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getGlobalEventBus = t.attachDOMEventsToEventBus = void 0;
    var i = n(0),
        a = null;
    t.attachDOMEventsToEventBus = r, t.getGlobalEventBus = function() {
        return a || (a = new i.EventBus, r(a), a)
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = {
            INITIAL: 0,
            RUNNING: 1,
            PAUSED: 2,
            FINISHED: 3
        },
        a = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.pdfViewer = null, this.pdfThumbnailViewer = null, this.onIdle = null, this.highestPriorityPage = null, this.idleTimeout = null, this.printing = !1, this.isThumbnailViewEnabled = !1
            }
            return r(e, [{
                key: "setViewer",
                value: function(e) {
                    this.pdfViewer = e
                }
            }, {
                key: "setThumbnailViewer",
                value: function(e) {
                    this.pdfThumbnailViewer = e
                }
            }, {
                key: "isHighestPriority",
                value: function(e) {
                    return this.highestPriorityPage === e.renderingId
                }
            }, {
                key: "renderHighestPriority",
                value: function(e) {
                    this.idleTimeout && (clearTimeout(this.idleTimeout), this.idleTimeout = null), this.pdfViewer.forceRendering(e) || this.pdfThumbnailViewer && this.isThumbnailViewEnabled && this.pdfThumbnailViewer.forceRendering() || this.printing || this.onIdle && (this.idleTimeout = setTimeout(this.onIdle.bind(this), 3e4))
                }
            }, {
                key: "getHighestPriority",
                value: function(e, t, n) {
                    var r = e.views,
                        i = r.length;
                    if (0 === i) return !1;
                    for (var a = 0; a < i; ++a) {
                        var o = r[a].view;
                        if (!this.isViewFinished(o)) return o
                    }
                    if (n) {
                        var s = e.last.id;
                        if (t[s] && !this.isViewFinished(t[s])) return t[s]
                    } else {
                        var l = e.first.id - 2;
                        if (t[l] && !this.isViewFinished(t[l])) return t[l]
                    }
                    return null
                }
            }, {
                key: "isViewFinished",
                value: function(e) {
                    return e.renderingState === i.FINISHED
                }
            }, {
                key: "renderView",
                value: function(e) {
                    var t = this;
                    switch (e.renderingState) {
                        case i.FINISHED:
                            return !1;
                        case i.PAUSED:
                            this.highestPriorityPage = e.renderingId, e.resume();
                            break;
                        case i.RUNNING:
                            this.highestPriorityPage = e.renderingId;
                            break;
                        case i.INITIAL:
                            this.highestPriorityPage = e.renderingId;
                            var n = function() {
                                t.renderHighestPriority()
                            };
                            e.draw().then(n, n)
                    }
                    return !0
                }
            }]), e
        }();
    t.RenderingStates = i, t.PDFRenderingQueue = a
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = ae.appConfig,
            t = void 0,
            n = document.location.search.substring(1),
            zz = window.location.href,
            a = zz.indexOf('#'),
            q = zz.indexOf('?'),
            p = Math.min(a > -1 ? a : zz.length, q > -1 ? q : zz.length),
            r = (0, M.parseQueryString)(n);
        t = "file" in r ? r.file : '/documents/' + zz.substring(zz.lastIndexOf('/') + 1, p) + '.pdf', oe(t);
        var i = [],
            a = document.createElement("input");
        if (a.id = e.openFileInputName, a.className = "fileInput", a.setAttribute("type", "file"), a.oncontextmenu = M.noContextMenuHandler, document.body.appendChild(a), window.File && window.FileReader && window.FileList && window.Blob ? a.value = null : (e.toolbar.openFile.setAttribute("hidden", "true"), e.secondaryToolbar.openFileButton.setAttribute("hidden", "true")), a.addEventListener("change", function(e) {
                var t = e.target.files;
                t && 0 !== t.length && ae.eventBus.dispatch("fileinputchange", {
                    fileInput: e.target
                })
            }), ae.viewerPrefs.pdfBugEnabled) {
            var o = document.location.hash.substring(1),
                s = (0, M.parseQueryString)(o);
            if ("disableworker" in s && (B.PDFJS.disableWorker = "true" === s.disableworker), "disablerange" in s && (B.PDFJS.disableRange = "true" === s.disablerange), "disablestream" in s && (B.PDFJS.disableStream = "true" === s.disablestream), "disableautofetch" in s && (B.PDFJS.disableAutoFetch = "true" === s.disableautofetch), "disablefontface" in s && (B.PDFJS.disableFontFace = "true" === s.disablefontface), "disablehistory" in s && (B.PDFJS.disableHistory = "true" === s.disablehistory), "webgl" in s && (B.PDFJS.disableWebGL = "true" !== s.webgl), "useonlycsszoom" in s && (B.PDFJS.useOnlyCssZoom = "true" === s.useonlycsszoom), "verbosity" in s && (B.PDFJS.verbosity = 0 | s.verbosity), "ignorecurrentpositiononzoom" in s && (B.PDFJS.ignoreCurrentPositionOnZoom = "true" === s.ignorecurrentpositiononzoom), "textlayer" in s) switch (s.textlayer) {
                case "off":
                    B.PDFJS.disableTextLayer = !0;
                    break;
                case "visible":
                case "shadow":
                case "hover":
                    e.viewerContainer.classList.add("textLayer-" + s.textlayer)
            }
            if ("pdfbug" in s) {
                B.PDFJS.pdfBug = !0;
                var l = s.pdfbug.split(",");
                i.push(function(e) {
                    return new Promise(function(t, n) {
                        var r = ae.appConfig,
                            i = document.createElement("script");
                        i.src = r.debuggerScriptPath, i.onload = function() {
                            PDFBug.enable(e), PDFBug.init({
                                PDFJS: B.PDFJS,
                                OPS: B.OPS
                            }, r.mainContainer), t()
                        }, i.onerror = function() {
                            n(new Error("Cannot load debugger at " + i.src))
                        }, (document.getElementsByTagName("head")[0] || document.body).appendChild(i)
                    })
                }(l))
            }
        }
        ae.supportsPrinting || (e.toolbar.print.classList.add("hidden"), e.secondaryToolbar.printButton.classList.add("hidden")), ae.supportsFullscreen || (e.toolbar.presentationModeButton.classList.add("hidden"), e.secondaryToolbar.presentationModeButton.classList.add("hidden")), ae.supportsIntegratedFind && e.toolbar.viewFind.classList.add("hidden"), e.sidebar.mainContainer.addEventListener("transitionend", function(e) {
            e.target === this && ae.eventBus.dispatch("resize")
        }, !0), e.sidebar.toggleButton.addEventListener("click", function() {
            ae.pdfSidebar.toggle()
        }), Promise.all(i).then(function() {
            le(t)
        }).catch(function(e) {
            ae.l10n.get("loading_error", null, "An error occurred while opening.").then(function(t) {
                ae.error(t, e)
            })
        })
    }

    function i(e) {
        var t = e.pageNumber,
            n = t - 1,
            r = ae.pdfViewer.getPageView(n);
        if (t === ae.page && ae.toolbar.updateLoadingIndicatorState(!1), r) {
            if (ae.pdfSidebar.isThumbnailViewVisible) {
                ae.pdfThumbnailViewer.getThumbnail(n).setImage(r)
            }
            B.PDFJS.pdfBug && Stats.enabled && r.stats && Stats.add(t, r.stats), r.error && ae.l10n.get("rendering_error", null, "An error occurred while rendering the page.").then(function(e) {
                ae.error(e, r.error)
            })
        }
    }

    function a(e) {}

    function o(e) {
        var t = e.mode,
            n = void 0;
        switch (t) {
            case "thumbs":
                n = U.SidebarView.THUMBS;
                break;
            case "bookmarks":
            case "outline":
                n = U.SidebarView.OUTLINE;
                break;
            case "attachments":
                n = U.SidebarView.ATTACHMENTS;
                break;
            case "none":
                n = U.SidebarView.NONE;
                break;
            default:
                return void console.error('Invalid "pagemode" hash parameter: ' + t)
        }
        ae.pdfSidebar.switchView(n, !0)
    }

    function s(e) {
        switch (e.action) {
            case "GoToPage":
                ae.appConfig.toolbar.pageNumber.select();
                break;
            case "Find":
                ae.supportsIntegratedFind || ae.findBar.toggle()
        }
    }

    function l(e) {
        var t = e.active,
            n = e.switchInProgress;
        ae.pdfViewer.presentationModeState = n ? M.PresentationModeState.CHANGING : t ? M.PresentationModeState.FULLSCREEN : M.PresentationModeState.NORMAL
    }

    function u(e) {
        ae.pdfRenderingQueue.isThumbnailViewEnabled = ae.pdfSidebar.isThumbnailViewVisible;
        var t = ae.store;
        t && ae.isInitialViewSet && t.set("sidebarView", e.view).catch(function() {})
    }

    function c(e) {
        var t = e.location,
            n = ae.store;
        n && ae.isInitialViewSet && n.setMultiple({
            exists: !0,
            page: t.pageNumber,
            zoom: t.scale,
            scrollLeft: t.left,
            scrollTop: t.top,
            rotation: t.rotation
        }).catch(function() {});
        var r = ae.pdfLinkService.getAnchorUrl(t.pdfOpenParams);
        ae.appConfig.toolbar.viewBookmark.href = r, ae.appConfig.secondaryToolbar.viewBookmarkButton.href = r;
        var i = ae.pdfViewer.getPageView(ae.page - 1).renderingState !== V.RenderingStates.FINISHED;
        ae.toolbar.updateLoadingIndicatorState(i)
    }

    function h() {
        var e = ae.pdfDocument,
            t = ae.pdfViewer;
        if (e) {
            var n = t.currentScaleValue;
            "auto" !== n && "page-fit" !== n && "page-width" !== n || (t.currentScaleValue = n), t.update()
        }
    }

    function d(e) {
        var t = e.hash;
        t && (ae.isInitialViewSet ? ae.pdfHistory.popStateInProgress || ae.pdfLinkService.setHash(t) : ae.initialBookmark = t)
    }

    function f() {
        ae.requestPresentationMode()
    }

    function p() {
        var e = ae.appConfig.openFileInputName;
        document.getElementById(e).click()
    }

    function v() {
        window.print()
    }

    function g() {
        ae.download()
    }

    function m() {
        ae.pdfDocument && (ae.page = 1)
    }

    function b() {
        ae.pdfDocument && (ae.page = ae.pagesCount)
    }

    function y() {
        ae.page++
    }

    function _() {
        ae.page--
    }

    function w() {
        ae.zoomIn()
    }

    function S() {
        ae.zoomOut()
    }

    function P(e) {
        var t = ae.pdfViewer;
        t.currentPageLabel = e.value, e.value !== t.currentPageNumber.toString() && e.value !== t.currentPageLabel && ae.toolbar.setPageNumber(t.currentPageNumber, t.currentPageLabel)
    }

    function A(e) {
        ae.pdfViewer.currentScaleValue = e.value
    }

    function C() {
        ae.rotatePages(90)
    }

    function k() {
        ae.rotatePages(-90)
    }

    function T() {
        ae.pdfDocumentProperties.open()
    }

    function x(e) {
        ae.findController.executeCommand("find" + e.type, {
            query: e.query,
            phraseSearch: e.phraseSearch,
            caseSensitive: e.caseSensitive,
            highlightAll: e.highlightAll,
            findPrevious: e.findPrevious
        })
    }

    function E(e) {
        ae.findController.executeCommand("find", {
            query: e.query,
            phraseSearch: e.phraseSearch,
            caseSensitive: !1,
            highlightAll: !0,
            findPrevious: !1
        })
    }

    function R(e) {
        ae.toolbar.setPageScale(e.presetValue, e.scale), ae.pdfViewer.update()
    }

    function L(e) {
        ae.pdfThumbnailViewer.pagesRotation = e.pagesRotation, ae.forceRendering(), ae.pdfViewer.currentPageNumber = e.pageNumber
    }

    function I(e) {
        var t = e.pageNumber;
        if (ae.toolbar.setPageNumber(t, e.pageLabel || null), ae.secondaryToolbar.setPageNumber(t), ae.pdfSidebar.isThumbnailViewVisible && ae.pdfThumbnailViewer.scrollThumbnailIntoView(t), B.PDFJS.pdfBug && Stats.enabled) {
            var n = ae.pdfViewer.getPageView(t - 1);
            n.stats && Stats.add(t, n.stats)
        }
    }

    function F(e) {
        var t = ae.pdfViewer;
        if (!t.isInPresentationMode)
            if (e.ctrlKey || e.metaKey) {
                var n = ae.supportedMouseWheelZoomModifierKeys;
                if (e.ctrlKey && !n.ctrlKey || e.metaKey && !n.metaKey) return;
                if (e.preventDefault(), ce) return;
                var r = t.currentScale,
                    i = 3 * (0, M.normalizeWheelEventDelta)(e);
                i < 0 ? ae.zoomOut(-i) : ae.zoomIn(i);
                var a = t.currentScale;
                if (r !== a) {
                    var o = a / r - 1,
                        s = t.container.getBoundingClientRect(),
                        l = e.clientX - s.left,
                        u = e.clientY - s.top;
                    t.container.scrollLeft += l * o, t.container.scrollTop += u * o
                }
            } else ce = !0, clearTimeout(he), he = setTimeout(function() {
                ce = !1
            }, 1e3)
    }

    function D(e) {
        if (ae.secondaryToolbar.isOpen) {
            var t = ae.appConfig;
            (ae.pdfViewer.containsElement(e.target) || t.toolbar.container.contains(e.target) && e.target !== t.secondaryToolbar.toggleButton) && ae.secondaryToolbar.close()
        }
    }

    function O(e) {
        if (!ae.overlayManager.active) {
            var t = !1,
                n = !1,
                r = (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0),
                i = ae.pdfViewer,
                a = i && i.isInPresentationMode;
            if (1 === r || 8 === r || 5 === r || 12 === r) switch (e.keyCode) {
                case 70:
                    ae.supportsIntegratedFind || (ae.findBar.open(), t = !0);
                    break;
                case 71:
                    if (!ae.supportsIntegratedFind) {
                        var o = ae.findController.state;
                        o && ae.findController.executeCommand("findagain", {
                            query: o.query,
                            phraseSearch: o.phraseSearch,
                            caseSensitive: o.caseSensitive,
                            highlightAll: o.highlightAll,
                            findPrevious: 5 === r || 12 === r
                        }), t = !0
                    }
                    break;
                case 61:
                case 107:
                case 187:
                case 171:
                    a || ae.zoomIn(), t = !0;
                    break;
                case 173:
                case 109:
                case 189:
                    a || ae.zoomOut(), t = !0;
                    break;
                case 48:
                case 96:
                    a || (setTimeout(function() {
                        i.currentScaleValue = M.DEFAULT_SCALE_VALUE
                    }), t = !1);
                    break;
                case 38:
                    (a || ae.page > 1) && (ae.page = 1, t = !0, n = !0);
                    break;
                case 40:
                    (a || ae.page < ae.pagesCount) && (ae.page = ae.pagesCount, t = !0, n = !0)
            }
            if (1 === r || 8 === r) switch (e.keyCode) {
                case 83:
                    ae.download(), t = !0
            }
            if (3 === r || 10 === r) switch (e.keyCode) {
                case 80:
                    ae.requestPresentationMode(), t = !0;
                    break;
                case 71:
                    ae.appConfig.toolbar.pageNumber.select(), t = !0
            }
            if (t) return n && !a && i.focus(), void e.preventDefault();
            var s = document.activeElement || document.querySelector(":focus"),
                l = s && s.tagName.toUpperCase();
            if ("INPUT" !== l && "TEXTAREA" !== l && "SELECT" !== l || 27 === e.keyCode) {
                if (0 === r) switch (e.keyCode) {
                    case 38:
                    case 33:
                    case 8:
                        if (!a && "page-fit" !== i.currentScaleValue) break;
                    case 37:
                        if (i.isHorizontalScrollbarEnabled) break;
                    case 75:
                    case 80:
                        ae.page > 1 && ae.page--, t = !0;
                        break;
                    case 27:
                        ae.secondaryToolbar.isOpen && (ae.secondaryToolbar.close(), t = !0), !ae.supportsIntegratedFind && ae.findBar.opened && (ae.findBar.close(), t = !0);
                        break;
                    case 40:
                    case 34:
                    case 32:
                        if (!a && "page-fit" !== i.currentScaleValue) break;
                    case 39:
                        if (i.isHorizontalScrollbarEnabled) break;
                    case 74:
                    case 78:
                        ae.page < ae.pagesCount && ae.page++, t = !0;
                        break;
                    case 36:
                        (a || ae.page > 1) && (ae.page = 1, t = !0, n = !0);
                        break;
                    case 35:
                        (a || ae.page < ae.pagesCount) && (ae.page = ae.pagesCount, t = !0, n = !0);
                        break;
                    case 83:
                        ae.pdfCursorTools.switchTool(j.CursorTool.SELECT);
                        break;
                    case 72:
                        ae.pdfCursorTools.switchTool(j.CursorTool.HAND);
                        break;
                    case 82:
                        ae.rotatePages(90)
                }
                if (4 === r) switch (e.keyCode) {
                    case 32:
                        if (!a && "page-fit" !== i.currentScaleValue) break;
                        ae.page > 1 && ae.page--, t = !0;
                        break;
                    case 82:
                        ae.rotatePages(-90)
                }
                t || a || (e.keyCode >= 33 && e.keyCode <= 40 || 32 === e.keyCode && "BUTTON" !== l) && (n = !0), n && !i.containsElement(s) && i.focus(), t && e.preventDefault()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFPrintServiceFactory = t.DefaultExternalServices = t.PDFViewerApplication = void 0;
    var N = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        M = n(0),
        B = n(1),
        j = n(6),
        V = n(3),
        U = n(10),
        q = n(2),
        W = n(11),
        z = n(12),
        H = n(13),
        G = n(14),
        X = n(15),
        J = n(7),
        Y = n(16),
        Q = n(5),
        K = n(17),
        Z = n(18),
        $ = n(19),
        ee = n(21),
        te = n(26),
        ne = n(27),
        re = n(28),
        ie = {
            updateFindControlState: function(e) {},
            initPassiveLoading: function(e) {},
            fallback: function(e, t) {},
            reportTelemetry: function(e) {},
            createDownloadManager: function() {
                throw new Error("Not implemented: createDownloadManager")
            },
            createPreferences: function() {
                throw new Error("Not implemented: createPreferences")
            },
            createL10n: function() {
                throw new Error("Not implemented: createL10n")
            },
            supportsIntegratedFind: !1,
            supportsDocumentFonts: !0,
            supportsDocumentColors: !0,
            supportedMouseWheelZoomModifierKeys: {
                ctrlKey: !0,
                metaKey: !0
            }
        },
        ae = {
            initialBookmark: document.location.hash.substring(1),
            initialized: !1,
            fellback: !1,
            appConfig: null,
            pdfDocument: null,
            pdfLoadingTask: null,
            printService: null,
            pdfViewer: null,
            pdfThumbnailViewer: null,
            pdfRenderingQueue: null,
            pdfPresentationMode: null,
            pdfDocumentProperties: null,
            pdfLinkService: null,
            pdfHistory: null,
            pdfSidebar: null,
            pdfOutlineViewer: null,
            pdfAttachmentViewer: null,
            pdfCursorTools: null,
            store: null,
            downloadManager: null,
            overlayManager: null,
            preferences: null,
            toolbar: null,
            secondaryToolbar: null,
            eventBus: null,
            l10n: null,
            isInitialViewSet: !1,
            downloadComplete: !1,
            viewerPrefs: {
                sidebarViewOnLoad: U.SidebarView.NONE,
                pdfBugEnabled: !1,
                showPreviousViewOnLoad: !0,
                defaultZoomValue: "",
                disablePageMode: !1,
                disablePageLabels: !1,
                renderer: "canvas",
                enhanceTextSelection: !1,
                renderInteractiveForms: !1,
                enablePrintAutoRotate: !1
            },
            isViewerEmbedded: window.parent !== window,
            url: "",
            baseUrl: "",
            externalServices: ie,
            _boundEvents: {},
            initialize: function(e) {
                var t = this;
                return this.preferences = this.externalServices.createPreferences(),
                    function(e) {
                        e.imageResourcesPath = "./images/", e.workerSrc = "../build/pdf.worker.js", e.cMapUrl = "../web/cmaps/", e.cMapPacked = !0
                    }(B.PDFJS), this.appConfig = e, this._readPreferences().then(function() {
                        return t._initializeL10n()
                    }).then(function() {
                        return t._initializeViewerComponents()
                    }).then(function() {
                        t.bindEvents(), t.bindWindowEvents();
                        var n = e.appContainer || document.documentElement;
                        t.l10n.translate(n).then(function() {
                            t.eventBus.dispatch("localized")
                        }), t.isViewerEmbedded && !B.PDFJS.isExternalLinkTargetSet() && (B.PDFJS.externalLinkTarget = B.PDFJS.LinkTarget.TOP), t.initialized = !0
                    })
            },
            _readPreferences: function() {
                var e = this.preferences,
                    t = this.viewerPrefs;
                return Promise.all([e.get("enableWebGL").then(function(e) {
                    B.PDFJS.disableWebGL = !e
                }), e.get("sidebarViewOnLoad").then(function(e) {
                    t.sidebarViewOnLoad = e
                }), e.get("pdfBugEnabled").then(function(e) {
                    t.pdfBugEnabled = e
                }), e.get("showPreviousViewOnLoad").then(function(e) {
                    t.showPreviousViewOnLoad = e
                }), e.get("defaultZoomValue").then(function(e) {
                    t.defaultZoomValue = e
                }), e.get("enhanceTextSelection").then(function(e) {
                    t.enhanceTextSelection = e
                }), e.get("disableTextLayer").then(function(e) {
                    !0 !== B.PDFJS.disableTextLayer && (B.PDFJS.disableTextLayer = e)
                }), e.get("disableRange").then(function(e) {
                    !0 !== B.PDFJS.disableRange && (B.PDFJS.disableRange = e)
                }), e.get("disableStream").then(function(e) {
                    !0 !== B.PDFJS.disableStream && (B.PDFJS.disableStream = e)
                }), e.get("disableAutoFetch").then(function(e) {
                    B.PDFJS.disableAutoFetch = e
                }), e.get("disableFontFace").then(function(e) {
                    !0 !== B.PDFJS.disableFontFace && (B.PDFJS.disableFontFace = e)
                }), e.get("useOnlyCssZoom").then(function(e) {
                    B.PDFJS.useOnlyCssZoom = e
                }), e.get("externalLinkTarget").then(function(e) {
                    B.PDFJS.isExternalLinkTargetSet() || (B.PDFJS.externalLinkTarget = e)
                }), e.get("renderer").then(function(e) {
                    t.renderer = e
                }), e.get("renderInteractiveForms").then(function(e) {
                    t.renderInteractiveForms = e
                }), e.get("disablePageMode").then(function(e) {
                    t.disablePageMode = e
                }), e.get("disablePageLabels").then(function(e) {
                    t.disablePageLabels = e
                }), e.get("enablePrintAutoRotate").then(function(e) {
                    t.enablePrintAutoRotate = e
                })]).catch(function(e) {})
            },
            _initializeL10n: function() {
                if (this.viewerPrefs.pdfBugEnabled) {
                    var e = document.location.hash.substring(1),
                        t = (0, M.parseQueryString)(e);
                    "locale" in t && (B.PDFJS.locale = t.locale)
                }
                return this.l10n = this.externalServices.createL10n(), this.l10n.getDirection().then(function(e) {
                    document.getElementsByTagName("html")[0].dir = e
                })
            },
            _initializeViewerComponents: function() {
                var e = this,
                    t = this.appConfig;
                return new Promise(function(n, r) {
                    e.overlayManager = new W.OverlayManager;
                    var i = t.eventBus || (0, q.getGlobalEventBus)();
                    e.eventBus = i;
                    var a = new V.PDFRenderingQueue;
                    a.onIdle = e.cleanup.bind(e), e.pdfRenderingQueue = a;
                    var o = new Q.PDFLinkService({
                        eventBus: i
                    });
                    e.pdfLinkService = o;
                    var s = e.externalServices.createDownloadManager();
                    e.downloadManager = s;
                    var l = t.mainContainer,
                        u = t.viewerContainer;
                    e.pdfViewer = new ee.PDFViewer({
                        container: l,
                        viewer: u,
                        eventBus: i,
                        renderingQueue: a,
                        linkService: o,
                        downloadManager: s,
                        renderer: e.viewerPrefs.renderer,
                        l10n: e.l10n,
                        enhanceTextSelection: e.viewerPrefs.enhanceTextSelection,
                        renderInteractiveForms: e.viewerPrefs.renderInteractiveForms,
                        enablePrintAutoRotate: e.viewerPrefs.enablePrintAutoRotate
                    }), a.setViewer(e.pdfViewer), o.setViewer(e.pdfViewer);
                    var c = t.sidebar.thumbnailView;
                    e.pdfThumbnailViewer = new $.PDFThumbnailViewer({
                        container: c,
                        renderingQueue: a,
                        linkService: o,
                        l10n: e.l10n
                    }), a.setThumbnailViewer(e.pdfThumbnailViewer), e.pdfHistory = new Y.PDFHistory({
                        linkService: o,
                        eventBus: i
                    }), o.setHistory(e.pdfHistory), e.findController = new J.PDFFindController({
                        pdfViewer: e.pdfViewer
                    }), e.findController.onUpdateResultsCount = function(t) {
                        e.supportsIntegratedFind || e.findBar.updateResultsCount(t)
                    }, e.findController.onUpdateState = function(t, n, r) {
                        e.supportsIntegratedFind ? e.externalServices.updateFindControlState({
                            result: t,
                            findPrevious: n
                        }) : e.findBar.updateUIState(t, n, r)
                    }, e.pdfViewer.setFindController(e.findController);
                    var h = Object.create(t.findBar);
                    h.findController = e.findController, h.eventBus = i, e.findBar = new X.PDFFindBar(h, e.l10n), e.pdfDocumentProperties = new G.PDFDocumentProperties(t.documentProperties, e.overlayManager, e.l10n), e.pdfCursorTools = new j.PDFCursorTools({
                        container: l,
                        eventBus: i,
                        preferences: e.preferences
                    }), e.toolbar = new ne.Toolbar(t.toolbar, l, i, e.l10n), e.secondaryToolbar = new te.SecondaryToolbar(t.secondaryToolbar, l, i), e.supportsFullscreen && (e.pdfPresentationMode = new Z.PDFPresentationMode({
                        container: l,
                        viewer: u,
                        pdfViewer: e.pdfViewer,
                        eventBus: i,
                        contextMenuItems: t.fullscreen
                    })), e.passwordPrompt = new z.PasswordPrompt(t.passwordOverlay, e.overlayManager, e.l10n), e.pdfOutlineViewer = new K.PDFOutlineViewer({
                        container: t.sidebar.outlineView,
                        eventBus: i,
                        linkService: o
                    }), e.pdfAttachmentViewer = new H.PDFAttachmentViewer({
                        container: t.sidebar.attachmentsView,
                        eventBus: i,
                        downloadManager: s
                    });
                    var d = Object.create(t.sidebar);
                    d.pdfViewer = e.pdfViewer, d.pdfThumbnailViewer = e.pdfThumbnailViewer, d.pdfOutlineViewer = e.pdfOutlineViewer, d.eventBus = i, e.pdfSidebar = new U.PDFSidebar(d, e.l10n), e.pdfSidebar.onToggled = e.forceRendering.bind(e), n(void 0)
                })
            },
            run: function(e) {
                this.initialize(e).then(r)
            },
            zoomIn: function(e) {
                var t = this.pdfViewer.currentScale;
                do {
                    t = (1.1 * t).toFixed(2), t = Math.ceil(10 * t) / 10, t = Math.min(M.MAX_SCALE, t)
                } while (--e > 0 && t < M.MAX_SCALE);
                this.pdfViewer.currentScaleValue = t
            },
            zoomOut: function(e) {
                var t = this.pdfViewer.currentScale;
                do {
                    t = (t / 1.1).toFixed(2), t = Math.floor(10 * t) / 10, t = Math.max(M.MIN_SCALE, t)
                } while (--e > 0 && t > M.MIN_SCALE);
                this.pdfViewer.currentScaleValue = t
            },
            get pagesCount() {
                return this.pdfDocument ? this.pdfDocument.numPages : 0
            },
            get pageRotation() {
                return this.pdfViewer.pagesRotation
            },
            set page(e) {
                this.pdfViewer.currentPageNumber = e
            },
            get page() {
                return this.pdfViewer.currentPageNumber
            },
            get printing() {
                return !!this.printService
            },
            get supportsPrinting() {
                return de.instance.supportsPrinting
            },
            get supportsFullscreen() {
                var e = void 0,
                    t = document.documentElement;
                return e = !!(t.requestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullScreen || t.msRequestFullscreen), !1 !== document.fullscreenEnabled && !1 !== document.mozFullScreenEnabled && !1 !== document.webkitFullscreenEnabled && !1 !== document.msFullscreenEnabled || (e = !1), e && !0 === B.PDFJS.disableFullscreen && (e = !1), (0, B.shadow)(this, "supportsFullscreen", e)
            },
            get supportsIntegratedFind() {
                return this.externalServices.supportsIntegratedFind
            },
            get supportsDocumentFonts() {
                return this.externalServices.supportsDocumentFonts
            },
            get supportsDocumentColors() {
                return this.externalServices.supportsDocumentColors
            },
            get loadingBar() {
                var e = new M.ProgressBar("#loadingBar");
                return (0, B.shadow)(this, "loadingBar", e)
            },
            get supportedMouseWheelZoomModifierKeys() {
                return this.externalServices.supportedMouseWheelZoomModifierKeys
            },
            initPassiveLoading: function() {
                throw new Error("Not implemented: initPassiveLoading")
            },
            setTitleUsingUrl: function(e) {
                this.url = e, this.baseUrl = e.split("#")[0];
                var t = (0, M.getPDFFileNameFromURL)(e, "");
                if (!t) try {
                    t = decodeURIComponent((0, B.getFilenameFromUrl)(e)) || e
                } catch (n) {
                    t = e
                }
                this.setTitle(t)
            },
            setTitle: function(e) {
                this.isViewerEmbedded || (document.title = e)
            },
            close: function() {
                if (this.appConfig.errorWrapper.container.setAttribute("hidden", "true"), !this.pdfLoadingTask) return Promise.resolve();
                var e = this.pdfLoadingTask.destroy();
                return this.pdfLoadingTask = null, this.pdfDocument && (this.pdfDocument = null, this.pdfThumbnailViewer.setDocument(null), this.pdfViewer.setDocument(null), this.pdfLinkService.setDocument(null, null), this.pdfDocumentProperties.setDocument(null, null)), this.store = null, this.isInitialViewSet = !1, this.downloadComplete = !1, this.pdfSidebar.reset(), this.pdfOutlineViewer.reset(), this.pdfAttachmentViewer.reset(), this.findController.reset(), this.findBar.reset(), this.toolbar.reset(), this.secondaryToolbar.reset(), "undefined" != typeof PDFBug && PDFBug.cleanup(), e
            },
            open: function(e, t) {
                var n = this;
                if (arguments.length > 2 || "number" == typeof t) return Promise.reject(new Error("Call of open() with obsolete signature."));
                if (this.pdfLoadingTask) return this.close().then(function() {
                    return n.preferences.reload(), n.open(e, t)
                });
                var r = Object.create(null);
                if ("string" == typeof e ? (this.setTitleUsingUrl(e), r.url = e) : e && "byteLength" in e ? r.data = e : e.url && e.originalUrl && (this.setTitleUsingUrl(e.originalUrl), r.url = e.url), t)
                    for (var i in t) B.PDFJS.pdfjsNext || "scale" !== i ? ("length" === i && this.pdfDocumentProperties.setFileSize(t[i]), r[i] = t[i]) : console.error('Call of open() with obsolete "scale" argument, please use the "defaultZoomValue" preference instead.');
                var a = (0, B.getDocument)(r);
                return this.pdfLoadingTask = a, a.onPassword = function(e, t) {
                    n.passwordPrompt.setUpdateCallback(e, t), n.passwordPrompt.open()
                }, a.onProgress = function(e) {
                    var t = e.loaded,
                        r = e.total;
                    n.progress(t / r)
                }, a.onUnsupportedFeature = this.fallback.bind(this), a.promise.then(function(e) {
                    n.load(e)
                }, function(e) {
                    var t = e && e.message;
                    return (e instanceof B.InvalidPDFException ? n.l10n.get("invalid_file_error", null, "Invalid or corrupted PDF file.") : e instanceof B.MissingPDFException ? n.l10n.get("missing_file_error", null, "Missing PDF file.") : e instanceof B.UnexpectedResponseException ? n.l10n.get("unexpected_response_error", null, "Unexpected server response.") : n.l10n.get("loading_error", null, "An error occurred while loading the PDF.")).then(function(e) {
                        throw n.error(e, {
                            message: t
                        }), new Error(e)
                    })
                })
            },
            download: function() {
                function e() {
                    i.downloadUrl(n, r)
                }
                var t = this,
                    n = this.baseUrl,
                    r = (0, M.getPDFFileNameFromURL)(this.url),
                    i = this.downloadManager;
                i.onerror = function(e) {
                    t.error("PDF failed to download: " + e)
                }, this.pdfDocument && this.downloadComplete ? this.pdfDocument.getData().then(function(e) {
                    var t = (0, B.createBlob)(e, "application/pdf");
                    i.download(t, n, r)
                }).catch(e) : e()
            },
            fallback: function(e) {},
            error: function(e, t) {
                var n = [this.l10n.get("error_version_info", {
                    version: B.version || "?",
                    build: B.build || "?"
                }, "PDF.js v{{version}} (build: {{build}})")];
                t && (n.push(this.l10n.get("error_message", {
                    message: t.message
                }, "Message: {{message}}")), t.stack ? n.push(this.l10n.get("error_stack", {
                    stack: t.stack
                }, "Stack: {{stack}}")) : (t.filename && n.push(this.l10n.get("error_file", {
                    file: t.filename
                }, "File: {{file}}")), t.lineNumber && n.push(this.l10n.get("error_line", {
                    line: t.lineNumber
                }, "Line: {{line}}"))));
                var r = this.appConfig.errorWrapper,
                    i = r.container;
                i.removeAttribute("hidden");
                r.errorMessage.textContent = e;
                var a = r.closeButton;
                a.onclick = function() {
                    i.setAttribute("hidden", "true")
                };
                var o = r.errorMoreInfo,
                    s = r.moreInfoButton,
                    l = r.lessInfoButton;
                s.onclick = function() {
                    o.removeAttribute("hidden"), s.setAttribute("hidden", "true"), l.removeAttribute("hidden"), o.style.height = o.scrollHeight + "px"
                }, l.onclick = function() {
                    o.setAttribute("hidden", "true"), s.removeAttribute("hidden"), l.setAttribute("hidden", "true")
                }, s.oncontextmenu = M.noContextMenuHandler, l.oncontextmenu = M.noContextMenuHandler, a.oncontextmenu = M.noContextMenuHandler, s.removeAttribute("hidden"), l.setAttribute("hidden", "true"), Promise.all(n).then(function(e) {
                    o.value = e.join("\n")
                })
            },
            progress: function(e) {
                var t = this;
                if (!this.downloadComplete) {
                    var n = Math.round(100 * e);
                    (n > this.loadingBar.percent || isNaN(n)) && (this.loadingBar.percent = n, B.PDFJS.disableAutoFetch && n && (this.disableAutoFetchLoadingBarTimeout && (clearTimeout(this.disableAutoFetchLoadingBarTimeout), this.disableAutoFetchLoadingBarTimeout = null), this.loadingBar.show(), this.disableAutoFetchLoadingBarTimeout = setTimeout(function() {
                        t.loadingBar.hide(), t.disableAutoFetchLoadingBarTimeout = null
                    }, 5e3)))
                }
            },
            load: function(e) {
                var t = this;
                this.pdfDocument = e, e.getDownloadInfo().then(function() {
                    t.downloadComplete = !0, t.loadingBar.hide(), o.then(function() {
                        t.eventBus.dispatch("documentload", {
                            source: t
                        })
                    })
                });
                var n = e.getPageMode().catch(function() {});
                this.toolbar.setPagesCount(e.numPages, !1), this.secondaryToolbar.setPagesCount(e.numPages);
                var r = this.documentFingerprint = e.fingerprint,
                    i = this.store = new re.ViewHistory(r);
                this.pdfLinkService.setDocument(e, null), this.pdfDocumentProperties.setDocument(e, this.url);
                var a = this.pdfViewer;
                a.setDocument(e);
                var o = a.firstPagePromise,
                    s = a.pagesPromise,
                    l = a.onePageRendered,
                    u = this.pdfThumbnailViewer;
                u.setDocument(e), o.then(function(e) {
                    if (t.loadingBar.setWidth(t.appConfig.viewerContainer), !B.PDFJS.disableHistory && !t.isViewerEmbedded) {
                        var o = !t.viewerPrefs.showPreviousViewOnLoad;
                        t.pdfHistory.initialize(r, o), t.pdfHistory.initialBookmark && (t.initialBookmark = t.pdfHistory.initialBookmark, t.initialRotation = t.pdfHistory.initialRotation)
                    }
                    var l = {
                            bookmark: null,
                            hash: null
                        },
                        u = i.getMultiple({
                            exists: !1,
                            page: "1",
                            zoom: M.DEFAULT_SCALE_VALUE,
                            scrollLeft: "0",
                            scrollTop: "0",
                            rotation: null,
                            sidebarView: U.SidebarView.NONE
                        }).catch(function() {});
                    Promise.all([u, n]).then(function(e) {
                        var n = N(e, 2),
                            r = n[0],
                            i = void 0 === r ? {} : r,
                            a = n[1],
                            o = t.viewerPrefs.defaultZoomValue ? "zoom=" + t.viewerPrefs.defaultZoomValue : null,
                            s = null,
                            l = t.viewerPrefs.sidebarViewOnLoad;
                        return i.exists && t.viewerPrefs.showPreviousViewOnLoad && (o = "page=" + i.page + "&zoom=" + (t.viewerPrefs.defaultZoomValue || i.zoom) + "," + i.scrollLeft + "," + i.scrollTop, s = parseInt(i.rotation, 10), l = l || 0 | i.sidebarView), a && !t.viewerPrefs.disablePageMode && (l = l || function(e) {
                            switch (e) {
                                case "UseNone":
                                    return U.SidebarView.NONE;
                                case "UseThumbs":
                                    return U.SidebarView.THUMBS;
                                case "UseOutlines":
                                    return U.SidebarView.OUTLINE;
                                case "UseAttachments":
                                    return U.SidebarView.ATTACHMENTS
                            }
                            return U.SidebarView.NONE
                        }(a)), {
                            hash: o,
                            rotation: s,
                            sidebarView: l
                        }
                    }).then(function(e) {
                        var n = e.hash,
                            r = e.rotation,
                            i = e.sidebarView;
                        return l.bookmark = t.initialBookmark, l.hash = n, t.setInitialView(n, {
                            rotation: r,
                            sidebarView: i
                        }), t.isViewerEmbedded || a.focus(), s
                    }).then(function() {
                        (l.bookmark || l.hash) && (a.hasEqualPageSizes || (t.initialBookmark = l.bookmark, a.currentScaleValue = a.currentScaleValue, t.setInitialView(l.hash)))
                    }).then(function() {
                        a.update()
                    })
                }), e.getPageLabels().then(function(n) {
                    if (n && !t.viewerPrefs.disablePageLabels) {
                        var r = 0,
                            i = n.length;
                        if (i === t.pagesCount) {
                            for (; r < i && n[r] === (r + 1).toString();) r++;
                            r !== i && (a.setPageLabels(n), u.setPageLabels(n), t.toolbar.setPagesCount(e.numPages, !0), t.toolbar.setPageNumber(a.currentPageNumber, a.currentPageLabel))
                        } else console.error("The number of Page Labels does not match the number of pages in the document.")
                    }
                }), s.then(function() {
                    t.supportsPrinting && e.getJavaScript().then(function(e) {
                        if (0 !== e.length) {
                            e.some(function(e) {
                                return !!e && (console.warn("Warning: JavaScript is not supported"), t.fallback(B.UNSUPPORTED_FEATURES.javaScript), !0)
                            });
                            for (var n = /\bprint\s*\(/, r = 0, i = e.length; r < i; r++) {
                                var a = e[r];
                                if (a && n.test(a)) return void setTimeout(function() {
                                    window.print()
                                })
                            }
                        }
                    })
                }), Promise.all([l, M.animationStarted]).then(function() {
                    e.getOutline().then(function(e) {
                        t.pdfOutlineViewer.render({
                            outline: e
                        })
                    }), e.getAttachments().then(function(e) {
                        t.pdfAttachmentViewer.render({
                            attachments: e
                        })
                    })
                }), e.getMetadata().then(function(n) {
                    var r = n.info,
                        i = n.metadata;
                    t.documentInfo = r, t.metadata = i, console.log("PDF " + e.fingerprint + " [" + r.PDFFormatVersion + " " + (r.Producer || "-").trim() + " / " + (r.Creator || "-").trim() + "] (PDF.js: " + (B.version || "-") + (B.PDFJS.disableWebGL ? "" : " [WebGL]") + ")");
                    var a = void 0;
                    if (i && i.has("dc:title")) {
                        var o = i.get("dc:title");
                        "Untitled" !== o && (a = o)
                    }!a && r && r.Title && (a = r.Title), a && t.setTitle(a + " - " + document.title), r.IsAcroFormPresent && (console.warn("Warning: AcroForm/XFA is not supported"), t.fallback(B.UNSUPPORTED_FEATURES.forms))
                })
            },
            setInitialView: function(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = n.rotation,
                    i = n.sidebarView,
                    a = function(e) {
                        (0, M.isValidRotation)(e) && (t.pdfViewer.pagesRotation = e)
                    };
                this.isInitialViewSet = !0, this.pdfSidebar.setInitialView(i), this.initialBookmark ? (a(this.initialRotation), delete this.initialRotation, this.pdfLinkService.setHash(this.initialBookmark), this.initialBookmark = null) : e && (a(r), this.pdfLinkService.setHash(e)), this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel), this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber), this.pdfViewer.currentScaleValue || (this.pdfViewer.currentScaleValue = M.DEFAULT_SCALE_VALUE)
            },
            cleanup: function() {
                this.pdfDocument && (this.pdfViewer.cleanup(), this.pdfThumbnailViewer.cleanup(), this.pdfViewer.renderer !== M.RendererType.SVG && this.pdfDocument.cleanup())
            },
            forceRendering: function() {
                this.pdfRenderingQueue.printing = this.printing, this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible, this.pdfRenderingQueue.renderHighestPriority()
            },
            beforePrint: function() {
                var e = this;
                if (!this.printService)
                    if (this.supportsPrinting)
                        if (this.pdfViewer.pageViewsReady) {
                            var t = this.pdfViewer.getPagesOverview(),
                                n = this.appConfig.printContainer,
                                r = de.instance.createPrintService(this.pdfDocument, t, n, this.l10n);
                            this.printService = r, this.forceRendering(), r.layout()
                        } else this.l10n.get("printing_not_ready", null, "Warning: The PDF is not fully loaded for printing.").then(function(e) {
                            window.alert(e)
                        });
                else this.l10n.get("printing_not_supported", null, "Warning: Printing is not fully supported by this browser.").then(function(t) {
                    e.error(t)
                })
            },
            afterPrint: function() {
                this.printService && (this.printService.destroy(), this.printService = null), this.forceRendering()
            },
            rotatePages: function(e) {
                if (this.pdfDocument) {
                    var t = (this.pdfViewer.pagesRotation + 360 + e) % 360;
                    this.pdfViewer.pagesRotation = t
                }
            },
            requestPresentationMode: function() {
                this.pdfPresentationMode && this.pdfPresentationMode.request()
            },
            bindEvents: function() {
                var e = this.eventBus,
                    t = this._boundEvents;
                t.beforePrint = this.beforePrint.bind(this), t.afterPrint = this.afterPrint.bind(this), e.on("resize", h), e.on("hashchange", d), e.on("beforeprint", t.beforePrint), e.on("afterprint", t.afterPrint), e.on("pagerendered", i), e.on("textlayerrendered", a), e.on("updateviewarea", c), e.on("pagechanging", I), e.on("scalechanging", R), e.on("rotationchanging", L), e.on("sidebarviewchanged", u), e.on("pagemode", o), e.on("namedaction", s), e.on("presentationmodechanged", l), e.on("presentationmode", f), e.on("openfile", p), e.on("print", v), e.on("download", g), e.on("firstpage", m), e.on("lastpage", b), e.on("nextpage", y), e.on("previouspage", _), e.on("zoomin", w), e.on("zoomout", S), e.on("pagenumberchanged", P), e.on("scalechanged", A), e.on("rotatecw", C), e.on("rotateccw", k), e.on("documentproperties", T), e.on("find", x), e.on("findfromurlhash", E), e.on("fileinputchange", ue)
            },
            bindWindowEvents: function() {
                var e = this.eventBus,
                    t = this._boundEvents;
                t.windowResize = function() {
                    e.dispatch("resize")
                }, t.windowHashChange = function() {
                    e.dispatch("hashchange", {
                        hash: document.location.hash.substring(1)
                    })
                }, t.windowBeforePrint = function() {
                    e.dispatch("beforeprint")
                }, t.windowAfterPrint = function() {
                    e.dispatch("afterprint")
                }, window.addEventListener("wheel", F), window.addEventListener("click", D), window.addEventListener("keydown", O), window.addEventListener("resize", t.windowResize), window.addEventListener("hashchange", t.windowHashChange), window.addEventListener("beforeprint", t.windowBeforePrint), window.addEventListener("afterprint", t.windowAfterPrint)
            },
            unbindEvents: function() {
                var e = this.eventBus,
                    t = this._boundEvents;
                e.off("resize", h), e.off("hashchange", d), e.off("beforeprint", t.beforePrint), e.off("afterprint", t.afterPrint), e.off("pagerendered", i), e.off("textlayerrendered", a), e.off("updateviewarea", c), e.off("pagechanging", I), e.off("scalechanging", R), e.off("rotationchanging", L), e.off("sidebarviewchanged", u), e.off("pagemode", o), e.off("namedaction", s), e.off("presentationmodechanged", l), e.off("presentationmode", f), e.off("openfile", p), e.off("print", v), e.off("download", g), e.off("firstpage", m), e.off("lastpage", b), e.off("nextpage", y), e.off("previouspage", _), e.off("zoomin", w), e.off("zoomout", S), e.off("pagenumberchanged", P), e.off("scalechanged", A), e.off("rotatecw", C), e.off("rotateccw", k), e.off("documentproperties", T), e.off("find", x), e.off("findfromurlhash", E), e.off("fileinputchange", ue), t.beforePrint = null, t.afterPrint = null
            },
            unbindWindowEvents: function() {
                var e = this._boundEvents;
                window.removeEventListener("wheel", F), window.removeEventListener("click", D), window.removeEventListener("keydown", O), window.removeEventListener("resize", e.windowResize), window.removeEventListener("hashchange", e.windowHashChange), window.removeEventListener("beforeprint", e.windowBeforePrint), window.removeEventListener("afterprint", e.windowAfterPrint), e.windowResize = null, e.windowHashChange = null, e.windowBeforePrint = null, e.windowAfterPrint = null
            }
        },
        oe = void 0,
        se = ["null", "http://mozilla.github.io", "https://mozilla.github.io"];
    oe = function(e) {
        if (void 0 !== e) try {
            var t = new URL(window.location.href).origin || "null";
            if (se.indexOf(t) >= 0) return;
            if (new URL(e, window.location.href).origin !== t) throw new Error("file origin does not match viewer's")
        } catch (e) {
            var n = e && e.message;
            throw ae.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function(e) {
                ae.error(e, {
                    message: n
                })
            }), e
        }
    };
    var le = void 0;
    le = function(e) {
        if (e && 0 === e.lastIndexOf("file:", 0)) {
            ae.setTitleUsingUrl(e);
            var t = new XMLHttpRequest;
            t.onload = function() {
                ae.open(new Uint8Array(t.response))
            };
            try {
                t.open("GET", e), t.responseType = "arraybuffer", t.send()
            } catch (e) {
                ae.l10n.get("loading_error", null, "An error occurred while loading the PDF.").then(function(t) {
                    ae.error(t, e)
                })
            }
        } else e && ae.open(e)
    };
    var ue = void 0;
    ue = function(e) {
        var t = e.fileInput.files[0];
        if (!B.PDFJS.disableCreateObjectURL && URL.createObjectURL) ae.open(URL.createObjectURL(t));
        else {
            var n = new FileReader;
            n.onload = function(e) {
                var t = e.target.result;
                ae.open(new Uint8Array(t))
            }, n.readAsArrayBuffer(t)
        }
        ae.setTitleUsingUrl(t.name);
        var r = ae.appConfig;
        r.toolbar.viewBookmark.setAttribute("hidden", "true"), r.secondaryToolbar.viewBookmarkButton.setAttribute("hidden", "true"), r.toolbar.download.setAttribute("hidden", "true"), r.secondaryToolbar.downloadButton.setAttribute("hidden", "true")
    };
    var ce = !1,
        he = void 0,
        de = {
            instance: {
                supportsPrinting: !1,
                createPrintService: function() {
                    throw new Error("Not implemented: createPrintService")
                }
            }
        };
    t.PDFViewerApplication = ae, t.DefaultExternalServices = ie, t.PDFPrintServiceFactory = de
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SimpleLinkService = t.PDFLinkService = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        o = n(2),
        s = n(0),
        l = function() {
            function e() {
                var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).eventBus;
                r(this, e), this.eventBus = t || (0, o.getGlobalEventBus)(), this.baseUrl = null, this.pdfDocument = null, this.pdfViewer = null, this.pdfHistory = null, this._pagesRefCache = null
            }
            return a(e, [{
                key: "setDocument",
                value: function(e, t) {
                    this.baseUrl = t, this.pdfDocument = e, this._pagesRefCache = Object.create(null)
                }
            }, {
                key: "setViewer",
                value: function(e) {
                    this.pdfViewer = e
                }
            }, {
                key: "setHistory",
                value: function(e) {
                    this.pdfHistory = e
                }
            }, {
                key: "navigateTo",
                value: function(e) {
                    var t = this;
                    new Promise(function(n, r) {
                        "string" != typeof e ? n({
                            namedDest: "",
                            explicitDest: e
                        }) : t.pdfDocument.getDestination(e).then(function(t) {
                            n({
                                namedDest: e,
                                explicitDest: t
                            })
                        })
                    }).then(function(n) {
                        n.explicitDest instanceof Array ? function n(r) {
                            var i = r.namedDest,
                                a = r.explicitDest,
                                o = a[0],
                                s = void 0;
                            if (o instanceof Object) {
                                if (null === (s = t._cachedPageNumber(o))) return void t.pdfDocument.getPageIndex(o).then(function(e) {
                                    t.cachePageRef(e + 1, o), n({
                                        namedDest: i,
                                        explicitDest: a
                                    })
                                }).catch(function() {
                                    console.error('PDFLinkService.navigateTo: "' + o + '" is not a valid page reference, for dest="' + e + '".')
                                })
                            } else {
                                if (!Number.isInteger(o)) return void console.error('PDFLinkService.navigateTo: "' + o + '" is not a valid destination reference, for dest="' + e + '".');
                                s = o + 1
                            }!s || s < 1 || s > t.pagesCount ? console.error('PDFLinkService.navigateTo: "' + s + '" is not a valid page number, for dest="' + e + '".') : (t.pdfHistory && (t.pdfHistory.pushCurrentPosition(), t.pdfHistory.push({
                                namedDest: i,
                                explicitDest: a,
                                pageNumber: s
                            })), t.pdfViewer.scrollPageIntoView({
                                pageNumber: s,
                                destArray: a
                            }))
                        }(n) : console.error('PDFLinkService.navigateTo: "' + n.explicitDest + '" is not a valid destination array, for dest="' + e + '".')
                    })
                }
            }, {
                key: "getDestinationHash",
                value: function(e) {
                    if ("string" == typeof e) return this.getAnchorUrl("#" + escape(e));
                    if (e instanceof Array) {
                        var t = JSON.stringify(e);
                        return this.getAnchorUrl("#" + escape(t))
                    }
                    return this.getAnchorUrl("")
                }
            }, {
                key: "getAnchorUrl",
                value: function(e) {
                    return (this.baseUrl || "") + e
                }
            }, {
                key: "setHash",
                value: function(e) {
                    var t = void 0,
                        n = void 0;
                    if (e.indexOf("=") >= 0) {
                        var r = (0, s.parseQueryString)(e);
                        if ("search" in r && this.eventBus.dispatch("findfromurlhash", {
                                source: this,
                                query: r.search.replace(/"/g, ""),
                                phraseSearch: "true" === r.phrase
                            }), "nameddest" in r) return void this.navigateTo(r.nameddest);
                        if ("page" in r && (t = 0 | r.page || 1), "zoom" in r) {
                            var a = r.zoom.split(","),
                                o = a[0],
                                l = parseFloat(o); - 1 === o.indexOf("Fit") ? n = [null, {
                                name: "XYZ"
                            }, a.length > 1 ? 0 | a[1] : null, a.length > 2 ? 0 | a[2] : null, l ? l / 100 : o] : "Fit" === o || "FitB" === o ? n = [null, {
                                name: o
                            }] : "FitH" === o || "FitBH" === o || "FitV" === o || "FitBV" === o ? n = [null, {
                                name: o
                            }, a.length > 1 ? 0 | a[1] : null] : "FitR" === o ? 5 !== a.length ? console.error('PDFLinkService.setHash: Not enough parameters for "FitR".') : n = [null, {
                                name: o
                            }, 0 | a[1], 0 | a[2], 0 | a[3], 0 | a[4]] : console.error('PDFLinkService.setHash: "' + o + '" is not a valid zoom value.')
                        }
                        n ? this.pdfViewer.scrollPageIntoView({
                            pageNumber: t || this.page,
                            destArray: n,
                            allowNegativeOffset: !0
                        }) : t && (this.page = t), "pagemode" in r && this.eventBus.dispatch("pagemode", {
                            source: this,
                            mode: r.pagemode
                        })
                    } else {
                        /^\d+$/.test(e) && e <= this.pagesCount && (console.warn('PDFLinkService_setHash: specifying a page number directly after the hash symbol (#) is deprecated, please use the "#page=' + e + '" form instead.'), this.page = 0 | e), n = unescape(e);
                        try {
                            (n = JSON.parse(n)) instanceof Array || (n = n.toString())
                        } catch (e) {}
                        if ("string" == typeof n || function(e) {
                                if (!(e instanceof Array)) return !1;
                                var t = e.length,
                                    n = !0;
                                if (t < 2) return !1;
                                var r = e[0];
                                if (!("object" === (void 0 === r ? "undefined" : i(r)) && Number.isInteger(r.num) && Number.isInteger(r.gen) || Number.isInteger(r) && r >= 0)) return !1;
                                var a = e[1];
                                if ("object" !== (void 0 === a ? "undefined" : i(a)) || "string" != typeof a.name) return !1;
                                switch (a.name) {
                                    case "XYZ":
                                        if (5 !== t) return !1;
                                        break;
                                    case "Fit":
                                    case "FitB":
                                        return 2 === t;
                                    case "FitH":
                                    case "FitBH":
                                    case "FitV":
                                    case "FitBV":
                                        if (3 !== t) return !1;
                                        break;
                                    case "FitR":
                                        if (6 !== t) return !1;
                                        n = !1;
                                        break;
                                    default:
                                        return !1
                                }
                                for (var o = 2; o < t; o++) {
                                    var s = e[o];
                                    if (!("number" == typeof s || n && null === s)) return !1
                                }
                                return !0
                            }(n)) return void this.navigateTo(n);
                        console.error('PDFLinkService.setHash: "' + unescape(e) + '" is not a valid destination.')
                    }
                }
            }, {
                key: "executeNamedAction",
                value: function(e) {
                    switch (e) {
                        case "GoBack":
                            this.pdfHistory && this.pdfHistory.back();
                            break;
                        case "GoForward":
                            this.pdfHistory && this.pdfHistory.forward();
                            break;
                        case "NextPage":
                            this.page < this.pagesCount && this.page++;
                            break;
                        case "PrevPage":
                            this.page > 1 && this.page--;
                            break;
                        case "LastPage":
                            this.page = this.pagesCount;
                            break;
                        case "FirstPage":
                            this.page = 1
                    }
                    this.eventBus.dispatch("namedaction", {
                        source: this,
                        action: e
                    })
                }
            }, {
                key: "onFileAttachmentAnnotation",
                value: function(e) {
                    var t = e.id,
                        n = e.filename,
                        r = e.content;
                    this.eventBus.dispatch("fileattachmentannotation", {
                        source: this,
                        id: t,
                        filename: n,
                        content: r
                    })
                }
            }, {
                key: "cachePageRef",
                value: function(e, t) {
                    var n = t.num + " " + t.gen + " R";
                    this._pagesRefCache[n] = e
                }
            }, {
                key: "_cachedPageNumber",
                value: function(e) {
                    var t = e.num + " " + e.gen + " R";
                    return this._pagesRefCache && this._pagesRefCache[t] || null
                }
            }, {
                key: "pagesCount",
                get: function() {
                    return this.pdfDocument ? this.pdfDocument.numPages : 0
                }
            }, {
                key: "page",
                get: function() {
                    return this.pdfViewer.currentPageNumber
                },
                set: function(e) {
                    this.pdfViewer.currentPageNumber = e
                }
            }, {
                key: "rotation",
                get: function() {
                    return this.pdfViewer.pagesRotation
                },
                set: function(e) {
                    this.pdfViewer.pagesRotation = e
                }
            }]), e
        }(),
        u = function() {
            function e() {
                r(this, e)
            }
            return a(e, [{
                key: "navigateTo",
                value: function(e) {}
            }, {
                key: "getDestinationHash",
                value: function(e) {
                    return "#"
                }
            }, {
                key: "getAnchorUrl",
                value: function(e) {
                    return "#"
                }
            }, {
                key: "setHash",
                value: function(e) {}
            }, {
                key: "executeNamedAction",
                value: function(e) {}
            }, {
                key: "onFileAttachmentAnnotation",
                value: function(e) {
                    e.id, e.filename, e.content
                }
            }, {
                key: "cachePageRef",
                value: function(e, t) {}
            }, {
                key: "page",
                get: function() {
                    return 0
                },
                set: function(e) {}
            }, {
                key: "rotation",
                get: function() {
                    return 0
                },
                set: function(e) {}
            }]), e
        }();
    t.PDFLinkService = l, t.SimpleLinkService = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFCursorTools = t.CursorTool = void 0;
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(9),
        o = {
            SELECT: 0,
            HAND: 1,
            ZOOM: 2
        },
        s = function() {
            function e(t) {
                var n = this,
                    i = t.container,
                    s = t.eventBus,
                    l = t.preferences;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.container = i, this.eventBus = s, this.active = o.SELECT, this.activeBeforePresentationMode = null, this.handTool = new a.GrabToPan({
                    element: this.container
                }), this._addEventListeners(), Promise.all([l.get("cursorToolOnLoad"), l.get("enableHandToolOnLoad")]).then(function(e) {
                    var t = r(e, 2),
                        i = t[0];
                    !0 === t[1] && (l.set("enableHandToolOnLoad", !1), i === o.SELECT && (i = o.HAND, l.set("cursorToolOnLoad", i).catch(function() {}))), n.switchTool(i)
                }).catch(function() {})
            }
            return i(e, [{
                key: "switchTool",
                value: function(e) {
                    var t = this;
                    if (null === this.activeBeforePresentationMode && e !== this.active) {
                        var n = function() {
                            switch (t.active) {
                                case o.SELECT:
                                    break;
                                case o.HAND:
                                    t.handTool.deactivate();
                                    break;
                                case o.ZOOM:
                            }
                        };
                        switch (e) {
                            case o.SELECT:
                                n();
                                break;
                            case o.HAND:
                                n(), this.handTool.activate();
                                break;
                            case o.ZOOM:
                            default:
                                return void console.error('switchTool: "' + e + '" is an unsupported value.')
                        }
                        this.active = e, this._dispatchEvent()
                    }
                }
            }, {
                key: "_dispatchEvent",
                value: function() {
                    this.eventBus.dispatch("cursortoolchanged", {
                        source: this,
                        tool: this.active
                    })
                }
            }, {
                key: "_addEventListeners",
                value: function() {
                    var e = this;
                    this.eventBus.on("switchcursortool", function(t) {
                        e.switchTool(t.tool)
                    }), this.eventBus.on("presentationmodechanged", function(t) {
                        if (!t.switchInProgress) {
                            var n = void 0;
                            t.active ? (n = e.active, e.switchTool(o.SELECT), e.activeBeforePresentationMode = n) : (n = e.activeBeforePresentationMode, e.activeBeforePresentationMode = null, e.switchTool(n))
                        }
                    })
                }
            }, {
                key: "activeTool",
                get: function() {
                    return this.active
                }
            }]), e
        }();
    t.CursorTool = o, t.PDFCursorTools = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFFindController = t.FindState = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(1),
        a = n(0),
        o = {
            FOUND: 0,
            NOT_FOUND: 1,
            WRAPPED: 2,
            PENDING: 3
        },
        s = {
            "‘": "'",
            "’": "'",
            "‚": "'",
            "‛": "'",
            "“": '"',
            "”": '"',
            "„": '"',
            "‟": '"',
            "¼": "1/4",
            "½": "1/2",
            "¾": "3/4"
        },
        l = function() {
            function e(t) {
                var n = t.pdfViewer;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.pdfViewer = n, this.onUpdateResultsCount = null, this.onUpdateState = null, this.reset();
                var r = Object.keys(s).join("");
                this.normalizationRegex = new RegExp("[" + r + "]", "g")
            }
            return r(e, [{
                key: "reset",
                value: function() {
                    var e = this;
                    this.startedTextExtraction = !1, this.extractTextPromises = [], this.pendingFindMatches = Object.create(null), this.active = !1, this.pageContents = [], this.pageMatches = [], this.pageMatchesLength = null, this.matchCount = 0, this.selected = {
                        pageIdx: -1,
                        matchIdx: -1
                    }, this.offset = {
                        pageIdx: null,
                        matchIdx: null
                    }, this.pagesToSearch = null, this.resumePageIdx = null, this.state = null, this.dirtyMatch = !1, this.findTimeout = null, this._firstPagePromise = new Promise(function(t) {
                        e.resolveFirstPage = t
                    })
                }
            }, {
                key: "normalize",
                value: function(e) {
                    return e.replace(this.normalizationRegex, function(e) {
                        return s[e]
                    })
                }
            }, {
                key: "_prepareMatches",
                value: function(e, t, n) {
                    function r(e, t) {
                        var n = e[t],
                            r = e[t + 1];
                        if (t < e.length - 1 && n.match === r.match) return n.skipped = !0, !0;
                        for (var i = t - 1; i >= 0; i--) {
                            var a = e[i];
                            if (!a.skipped) {
                                if (a.match + a.matchLength < n.match) break;
                                if (a.match + a.matchLength >= n.match + n.matchLength) return n.skipped = !0, !0
                            }
                        }
                        return !1
                    }
                    e.sort(function(e, t) {
                        return e.match === t.match ? e.matchLength - t.matchLength : e.match - t.match
                    });
                    for (var i = 0, a = e.length; i < a; i++) r(e, i) || (t.push(e[i].match), n.push(e[i].matchLength))
                }
            }, {
                key: "calcFindPhraseMatch",
                value: function(e, t, n) {
                    for (var r = [], i = e.length, a = -i;;) {
                        if (-1 === (a = n.indexOf(e, a + i))) break;
                        r.push(a)
                    }
                    this.pageMatches[t] = r
                }
            }, {
                key: "calcFindWordMatch",
                value: function(e, t, n) {
                    for (var r = [], i = e.match(/\S+/g), a = 0, o = i.length; a < o; a++)
                        for (var s = i[a], l = s.length, u = -l;;) {
                            if (-1 === (u = n.indexOf(s, u + l))) break;
                            r.push({
                                match: u,
                                matchLength: l,
                                skipped: !1
                            })
                        }
                    this.pageMatchesLength || (this.pageMatchesLength = []), this.pageMatchesLength[t] = [], this.pageMatches[t] = [], this._prepareMatches(r, this.pageMatches[t], this.pageMatchesLength[t])
                }
            }, {
                key: "calcFindMatch",
                value: function(e) {
                    var t = this.normalize(this.pageContents[e]),
                        n = this.normalize(this.state.query),
                        r = this.state.caseSensitive,
                        i = this.state.phraseSearch;
                    0 !== n.length && (r || (t = t.toLowerCase(), n = n.toLowerCase()), i ? this.calcFindPhraseMatch(n, e, t) : this.calcFindWordMatch(n, e, t), this.updatePage(e), this.resumePageIdx === e && (this.resumePageIdx = null, this.nextPageMatch()), this.pageMatches[e].length > 0 && (this.matchCount += this.pageMatches[e].length, this.updateUIResultsCount()))
                }
            }, {
                key: "extractText",
                value: function() {
                    var e = this;
                    if (!this.startedTextExtraction) {
                        this.startedTextExtraction = !0, this.pageContents.length = 0;
                        for (var t = Promise.resolve(), n = function(n, r) {
                                var a = (0, i.createPromiseCapability)();
                                e.extractTextPromises[n] = a.promise, t = t.then(function() {
                                    return e.pdfViewer.getPageTextContent(n).then(function(t) {
                                        for (var r = t.items, i = [], o = 0, s = r.length; o < s; o++) i.push(r[o].str);
                                        e.pageContents[n] = i.join(""), a.resolve(n)
                                    }, function(t) {
                                        console.error("Unable to get page " + (n + 1) + " text content", t), e.pageContents[n] = "", a.resolve(n)
                                    })
                                })
                            }, r = 0, a = this.pdfViewer.pagesCount; r < a; r++) n(r)
                    }
                }
            }, {
                key: "executeCommand",
                value: function(e, t) {
                    var n = this;
                    null !== this.state && "findagain" === e || (this.dirtyMatch = !0), this.state = t, this.updateUIState(o.PENDING), this._firstPagePromise.then(function() {
                        n.extractText(), clearTimeout(n.findTimeout), "find" === e ? n.findTimeout = setTimeout(n.nextMatch.bind(n), 250) : n.nextMatch()
                    })
                }
            }, {
                key: "updatePage",
                value: function(e) {
                    this.selected.pageIdx === e && (this.pdfViewer.currentPageNumber = e + 1);
                    var t = this.pdfViewer.getPageView(e);
                    t.textLayer && t.textLayer.updateMatches()
                }
            }, {
                key: "nextMatch",
                value: function() {
                    var e = this,
                        t = this.state.findPrevious,
                        n = this.pdfViewer.currentPageNumber - 1,
                        r = this.pdfViewer.pagesCount;
                    if (this.active = !0, this.dirtyMatch) {
                        this.dirtyMatch = !1, this.selected.pageIdx = this.selected.matchIdx = -1, this.offset.pageIdx = n, this.offset.matchIdx = null, this.hadMatch = !1, this.resumePageIdx = null, this.pageMatches = [], this.matchCount = 0, this.pageMatchesLength = null;
                        for (var i = 0; i < r; i++) this.updatePage(i), i in this.pendingFindMatches || (this.pendingFindMatches[i] = !0, this.extractTextPromises[i].then(function(t) {
                            delete e.pendingFindMatches[t], e.calcFindMatch(t)
                        }))
                    }
                    if ("" !== this.state.query) {
                        if (!this.resumePageIdx) {
                            var a = this.offset;
                            if (this.pagesToSearch = r, null !== a.matchIdx) {
                                var s = this.pageMatches[a.pageIdx].length;
                                if (!t && a.matchIdx + 1 < s || t && a.matchIdx > 0) return this.hadMatch = !0, a.matchIdx = t ? a.matchIdx - 1 : a.matchIdx + 1, void this.updateMatch(!0);
                                this.advanceOffsetPage(t)
                            }
                            this.nextPageMatch()
                        }
                    } else this.updateUIState(o.FOUND)
                }
            }, {
                key: "matchesReady",
                value: function(e) {
                    var t = this.offset,
                        n = e.length,
                        r = this.state.findPrevious;
                    return n ? (this.hadMatch = !0, t.matchIdx = r ? n - 1 : 0, this.updateMatch(!0), !0) : (this.advanceOffsetPage(r), !!(t.wrapped && (t.matchIdx = null, this.pagesToSearch < 0)) && (this.updateMatch(!1), !0))
                }
            }, {
                key: "updateMatchPosition",
                value: function(e, t, n, r) {
                    if (this.selected.matchIdx === t && this.selected.pageIdx === e) {
                        var i = {
                            top: -50,
                            left: -400
                        };
                        (0, a.scrollIntoView)(n[r], i, !0)
                    }
                }
            }, {
                key: "nextPageMatch",
                value: function() {
                    null !== this.resumePageIdx && console.error("There can only be one pending page.");
                    var e = null;
                    do {
                        var t = this.offset.pageIdx;
                        if (!(e = this.pageMatches[t])) {
                            this.resumePageIdx = t;
                            break
                        }
                    } while (!this.matchesReady(e))
                }
            }, {
                key: "advanceOffsetPage",
                value: function(e) {
                    var t = this.offset,
                        n = this.extractTextPromises.length;
                    t.pageIdx = e ? t.pageIdx - 1 : t.pageIdx + 1, t.matchIdx = null, this.pagesToSearch--, (t.pageIdx >= n || t.pageIdx < 0) && (t.pageIdx = e ? n - 1 : 0, t.wrapped = !0)
                }
            }, {
                key: "updateMatch",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = o.NOT_FOUND,
                        n = this.offset.wrapped;
                    if (this.offset.wrapped = !1, e) {
                        var r = this.selected.pageIdx;
                        this.selected.pageIdx = this.offset.pageIdx, this.selected.matchIdx = this.offset.matchIdx, t = n ? o.WRAPPED : o.FOUND, -1 !== r && r !== this.selected.pageIdx && this.updatePage(r)
                    }
                    this.updateUIState(t, this.state.findPrevious), -1 !== this.selected.pageIdx && this.updatePage(this.selected.pageIdx)
                }
            }, {
                key: "updateUIResultsCount",
                value: function() {
                    this.onUpdateResultsCount && this.onUpdateResultsCount(this.matchCount)
                }
            }, {
                key: "updateUIState",
                value: function(e, t) {
                    this.onUpdateState && this.onUpdateState(e, t, this.matchCount)
                }
            }]), e
        }();
    t.FindState = o, t.PDFFindController = l
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = {
            appContainer: document.body,
            mainContainer: document.getElementById("viewerContainer"),
            viewerContainer: document.getElementById("viewer"),
            eventBus: null,
            toolbar: {
                container: document.getElementById("toolbarViewer"),
                numPages: document.getElementById("numPages"),
                pageNumber: document.getElementById("pageNumber"),
                scaleSelectContainer: document.getElementById("scaleSelectContainer"),
                scaleSelect: document.getElementById("scaleSelect"),
                customScaleOption: document.getElementById("customScaleOption"),
                previous: document.getElementById("previous"),
                next: document.getElementById("next"),
                zoomIn: document.getElementById("zoomIn"),
                zoomOut: document.getElementById("zoomOut"),
                viewFind: document.getElementById("viewFind"),
                openFile: document.getElementById("openFile"),
                print: document.getElementById("print"),
                presentationModeButton: document.getElementById("presentationMode"),
                download: document.getElementById("download"),
                viewBookmark: document.getElementById("viewBookmark")
            },
            secondaryToolbar: {
                toolbar: document.getElementById("secondaryToolbar"),
                toggleButton: document.getElementById("secondaryToolbarToggle"),
                toolbarButtonContainer: document.getElementById("secondaryToolbarButtonContainer"),
                presentationModeButton: document.getElementById("secondaryPresentationMode"),
                openFileButton: document.getElementById("secondaryOpenFile"),
                printButton: document.getElementById("secondaryPrint"),
                downloadButton: document.getElementById("secondaryDownload"),
                viewBookmarkButton: document.getElementById("secondaryViewBookmark"),
                firstPageButton: document.getElementById("firstPage"),
                lastPageButton: document.getElementById("lastPage"),
                pageRotateCwButton: document.getElementById("pageRotateCw"),
                pageRotateCcwButton: document.getElementById("pageRotateCcw"),
                cursorSelectToolButton: document.getElementById("cursorSelectTool"),
                cursorHandToolButton: document.getElementById("cursorHandTool"),
                documentPropertiesButton: document.getElementById("documentProperties")
            },
            fullscreen: {
                contextFirstPage: document.getElementById("contextFirstPage"),
                contextLastPage: document.getElementById("contextLastPage"),
                contextPageRotateCw: document.getElementById("contextPageRotateCw"),
                contextPageRotateCcw: document.getElementById("contextPageRotateCcw")
            },
            sidebar: {
                mainContainer: document.getElementById("mainContainer"),
                outerContainer: document.getElementById("outerContainer"),
                toggleButton: document.getElementById("sidebarToggle"),
                thumbnailButton: document.getElementById("viewThumbnail"),
                outlineButton: document.getElementById("viewOutline"),
                metadataButton: document.getElementById("viewMetadata"),
                attachmentsButton: document.getElementById("viewAttachments"),
                thumbnailView: document.getElementById("thumbnailView"),
                outlineView: document.getElementById("outlineView"),
                metadataView: document.getElementById("metadataView"),
                attachmentsView: document.getElementById("attachmentsView")
            },
            findBar: {
                bar: document.getElementById("findbar"),
                toggleButton: document.getElementById("viewFind"),
                findField: document.getElementById("findInput"),
                highlightAllCheckbox: document.getElementById("findHighlightAll"),
                caseSensitiveCheckbox: document.getElementById("findMatchCase"),
                findMsg: document.getElementById("findMsg"),
                findResultsCount: document.getElementById("findResultsCount"),
                findStatusIcon: document.getElementById("findStatusIcon"),
                findPreviousButton: document.getElementById("findPrevious"),
                findNextButton: document.getElementById("findNext")
            },
            passwordOverlay: {
                overlayName: "passwordOverlay",
                container: document.getElementById("passwordOverlay"),
                label: document.getElementById("passwordText"),
                input: document.getElementById("password"),
                submitButton: document.getElementById("passwordSubmit"),
                cancelButton: document.getElementById("passwordCancel")
            },
            documentProperties: {
                overlayName: "documentPropertiesOverlay",
                container: document.getElementById("documentPropertiesOverlay"),
                closeButton: document.getElementById("documentPropertiesClose"),
                fields: {
                    fileName: document.getElementById("fileNameField"),
                    fileSize: document.getElementById("fileSizeField"),
                    title: document.getElementById("titleField"),
                    author: document.getElementById("authorField"),
                    subject: document.getElementById("subjectField"),
                    keywords: document.getElementById("keywordsField"),
                    creationDate: document.getElementById("creationDateField"),
                    modificationDate: document.getElementById("modificationDateField"),
                    creator: document.getElementById("creatorField"),
                    producer: document.getElementById("producerField"),
                    version: document.getElementById("versionField"),
                    pageCount: document.getElementById("pageCountField")
                }
            },
            errorWrapper: {
                container: document.getElementById("errorWrapper"),
                errorMessage: document.getElementById("errorMessage"),
                closeButton: document.getElementById("errorClose"),
                errorMoreInfo: document.getElementById("errorMoreInfo"),
                moreInfoButton: document.getElementById("errorShowMore"),
                lessInfoButton: document.getElementById("errorShowLess")
            },
            printContainer: document.getElementById("printContainer"),
            openFileInputName: "fileInput",
            debuggerScriptPath: "./debugger.js",
            defaultUrl: i
        };
        window.PDFViewerApplication = a.PDFViewerApplication, a.PDFViewerApplication.run(e)
    }
    var i = "",
        a = void 0;
    a = n(4), n(29), n(34), "interactive" === document.readyState || "complete" === document.readyState ? r() : document.addEventListener("DOMContentLoaded", r, !0)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        this.element = e.element, this.document = e.element.ownerDocument, "function" == typeof e.ignoreTarget && (this.ignoreTarget = e.ignoreTarget), this.onActiveChanged = e.onActiveChanged, this.activate = this.activate.bind(this), this.deactivate = this.deactivate.bind(this), this.toggle = this.toggle.bind(this), this._onmousedown = this._onmousedown.bind(this), this._onmousemove = this._onmousemove.bind(this), this._endPan = this._endPan.bind(this);
        (this.overlay = document.createElement("div")).className = "grab-to-pan-grabbing"
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.prototype = {
        CSS_CLASS_GRAB: "grab-to-pan-grab",
        activate: function() {
            this.active || (this.active = !0, this.element.addEventListener("mousedown", this._onmousedown, !0), this.element.classList.add(this.CSS_CLASS_GRAB), this.onActiveChanged && this.onActiveChanged(!0))
        },
        deactivate: function() {
            this.active && (this.active = !1, this.element.removeEventListener("mousedown", this._onmousedown, !0), this._endPan(), this.element.classList.remove(this.CSS_CLASS_GRAB), this.onActiveChanged && this.onActiveChanged(!1))
        },
        toggle: function() {
            this.active ? this.deactivate() : this.activate()
        },
        ignoreTarget: function(e) {
            return e[i]("a[href], a[href] *, input, textarea, button, button *, select, option")
        },
        _onmousedown: function(e) {
            if (0 === e.button && !this.ignoreTarget(e.target)) {
                if (e.originalTarget) try {
                    e.originalTarget.tagName
                } catch (e) {
                    return
                }
                this.scrollLeftStart = this.element.scrollLeft, this.scrollTopStart = this.element.scrollTop, this.clientXStart = e.clientX, this.clientYStart = e.clientY, this.document.addEventListener("mousemove", this._onmousemove, !0), this.document.addEventListener("mouseup", this._endPan, !0), this.element.addEventListener("scroll", this._endPan, !0), e.preventDefault(), e.stopPropagation();
                var t = document.activeElement;
                t && !t.contains(e.target) && t.blur()
            }
        },
        _onmousemove: function(e) {
            if (this.element.removeEventListener("scroll", this._endPan, !0), function(e) {
                    return "buttons" in e && a ? !(1 & e.buttons) : s || l ? 0 === e.which : void 0
                }(e)) this._endPan();
            else {
                var t = e.clientX - this.clientXStart,
                    n = e.clientY - this.clientYStart,
                    r = this.scrollTopStart - n,
                    i = this.scrollLeftStart - t;
                this.element.scrollTo ? this.element.scrollTo({
                    top: r,
                    left: i,
                    behavior: "instant"
                }) : (this.element.scrollTop = r, this.element.scrollLeft = i), this.overlay.parentNode || document.body.appendChild(this.overlay)
            }
        },
        _endPan: function() {
            this.element.removeEventListener("scroll", this._endPan, !0), this.document.removeEventListener("mousemove", this._onmousemove, !0), this.document.removeEventListener("mouseup", this._endPan, !0), this.overlay.remove()
        }
    };
    var i;
    ["webkitM", "mozM", "msM", "oM", "m"].some(function(e) {
        var t = e + "atches";
        return t in document.documentElement && (i = t), (t += "Selector") in document.documentElement && (i = t), i
    });
    var a = !document.documentMode || document.documentMode > 9,
        o = window.chrome,
        s = o && (o.webstore || o.app),
        l = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
    t.GrabToPan = r
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFSidebar = t.SidebarView = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = n(3),
        o = "pdfSidebarNotification",
        s = {
            NONE: 0,
            THUMBS: 1,
            OUTLINE: 2,
            ATTACHMENTS: 3,
            METADATA: 4
        },
        l = function() {
            function e(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.NullL10n;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.isOpen = !1, this.active = s.THUMBS, this.isInitialViewSet = !1, this.onToggled = null, this.pdfViewer = t.pdfViewer, this.pdfThumbnailViewer = t.pdfThumbnailViewer, this.pdfOutlineViewer = t.pdfOutlineViewer, this.mainContainer = t.mainContainer, this.outerContainer = t.outerContainer, this.eventBus = t.eventBus, this.toggleButton = t.toggleButton, this.thumbnailButton = t.thumbnailButton, this.outlineButton = t.outlineButton, this.attachmentsButton = t.attachmentsButton, this.metadataButton = t.metadataButton, this.thumbnailView = t.thumbnailView, this.outlineView = t.outlineView, this.attachmentsView = t.attachmentsView, this.metadataView = t.metadataView, this.disableNotification = t.disableNotification || !1, this.l10n = n, this._addEventListeners()
            }
            return r(e, [{
                key: "reset",
                value: function() {
                    this.isInitialViewSet = !1, this._hideUINotification(null), this.switchView(s.THUMBS), this.outlineButton.disabled = !1, this.attachmentsButton.disabled = !1
                }
            }, {
                key: "setInitialView",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s.NONE;
                    if (!this.isInitialViewSet)
                        if (this.isInitialViewSet = !0, this.isOpen && e === s.NONE) this._dispatchEvent();
                        else {
                            var t = e === this.visibleView;
                            this.switchView(e, !0), t && this._dispatchEvent()
                        }
                }
            }, {
                key: "switchView",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (e !== s.NONE) {
                        var n = e !== this.active,
                            r = !1;
                        switch (e) {
                            case s.THUMBS:
                                this.thumbnailButton.classList.add("toggled");
                                this.outlineButton.classList.remove("toggled");
                                this.attachmentsButton.classList.remove("toggled");
                                this.thumbnailView.classList.remove("hidden");
                                this.metadataButton.classList.remove("toggled");
                                this.outlineView.classList.add("hidden");
                                this.attachmentsView.classList.add("hidden");
                                this.metadataView.classList.add("hidden");
                                this.isOpen && n && (this._updateThumbnailViewer(), r = !0);
                                break;
                            case s.OUTLINE:
                                if (this.outlineButton.disabled) return;
                                this.thumbnailButton.classList.remove("toggled");
                                this.outlineButton.classList.add("toggled");
                                this.attachmentsButton.classList.remove("toggled");
                                this.metadataButton.classList.remove("toggled");
                                this.thumbnailView.classList.add("hidden");
                                this.outlineView.classList.remove("hidden");
                                this.attachmentsView.classList.add("hidden");
                                this.metadataView.classList.add("hidden");
                                break;
                            case s.ATTACHMENTS:
                                if (this.attachmentsButton.disabled) return;
                                this.thumbnailButton.classList.remove("toggled");
                                this.outlineButton.classList.remove("toggled");
                                this.attachmentsButton.classList.add("toggled");
                                this.metadataButton.classList.remove("toggled");
                                this.thumbnailView.classList.add("hidden");
                                this.outlineView.classList.add("hidden");
                                this.attachmentsView.classList.remove("hidden");
                                this.metadataView.classList.add("hidden");
                                break;
                            case s.METADATA:
                                // METADATA VIEW
                                this.thumbnailButton.classList.remove("toggled");
                                this.outlineButton.classList.remove("toggled");
                                this.attachmentsButton.classList.remove("toggled");
                                this.metadataButton.classList.add("toggled");
                                this.thumbnailView.classList.add("hidden");
                                this.outlineView.classList.add("hidden");
                                this.attachmentsView.classList.add("hidden");
                                this.metadataView.classList.remove("hidden");
                                break;
                            default:
                                return void console.error('PDFSidebar_switchView: "' + e + '" is an unsupported value.')
                        }
                        this.active = 0 | e, !t || this.isOpen ? (r && this._forceRendering(), n && this._dispatchEvent(), this._hideUINotification(this.active)) : this.open()
                    } else this.close()
                }
            }, {
                key: "open",
                value: function() {
                    this.isOpen || (this.isOpen = !0, this.toggleButton.classList.add("toggled"), this.outerContainer.classList.add("sidebarMoving"), this.outerContainer.classList.add("sidebarOpen"), this.active === s.THUMBS && this._updateThumbnailViewer(), this._forceRendering(), this._dispatchEvent(), this._hideUINotification(this.active))
                }
            }, {
                key: "close",
                value: function() {
                    this.isOpen && (this.isOpen = !1, this.toggleButton.classList.remove("toggled"), this.outerContainer.classList.add("sidebarMoving"), this.outerContainer.classList.remove("sidebarOpen"), this._forceRendering(), this._dispatchEvent())
                }
            }, {
                key: "toggle",
                value: function() {
                    this.isOpen ? this.close() : this.open()
                }
            }, {
                key: "_dispatchEvent",
                value: function() {
                    this.eventBus.dispatch("sidebarviewchanged", {
                        source: this,
                        view: this.visibleView
                    })
                }
            }, {
                key: "_forceRendering",
                value: function() {
                    this.onToggled ? this.onToggled() : (this.pdfViewer.forceRendering(), this.pdfThumbnailViewer.forceRendering())
                }
            }, {
                key: "_updateThumbnailViewer",
                value: function() {
                    for (var e = this.pdfViewer, t = this.pdfThumbnailViewer, n = e.pagesCount, r = 0; r < n; r++) {
                        var i = e.getPageView(r);
                        if (i && i.renderingState === a.RenderingStates.FINISHED) {
                            t.getThumbnail(r).setImage(i)
                        }
                    }
                    t.scrollThumbnailIntoView(e.currentPageNumber)
                }
            }, {
                key: "_showUINotification",
                value: function(e) {
                    var t = this;
                    if (!this.disableNotification) {
                        if (this.l10n.get("toggle_sidebar_notification.title", null, "Toggle Sidebar (document contains outline/attachments)").then(function(e) {
                                t.toggleButton.title = e
                            }), this.isOpen) {
                            if (e === this.active) return
                        } else this.toggleButton.classList.add(o);
                        switch (e) {
                            case s.OUTLINE:
                                this.outlineButton.classList.add(o);
                                break;
                            case s.ATTACHMENTS:
                                this.attachmentsButton.classList.add(o)
                        }
                    }
                }
            }, {
                key: "_hideUINotification",
                value: function(e) {
                    var t = this;
                    if (!this.disableNotification) {
                        var n = function(e) {
                            switch (e) {
                                case s.OUTLINE:
                                    t.outlineButton.classList.remove(o);
                                    break;
                                case s.ATTACHMENTS:
                                    t.attachmentsButton.classList.remove(o)
                            }
                        };
                        if (this.isOpen || null === e)
                            if (this.toggleButton.classList.remove(o), null === e) {
                                for (e in s) n(s[e]);
                                this.l10n.get("toggle_sidebar.title", null, "Toggle Sidebar").then(function(e) {
                                    t.toggleButton.title = e
                                })
                            } else n(e)
                    }
                }
            }, {
                key: "_addEventListeners",
                value: function() {
                    var e = this;
                    this.mainContainer.addEventListener("transitionend", function(t) {
                        t.target === e.mainContainer && e.outerContainer.classList.remove("sidebarMoving")
                    }), this.thumbnailButton.addEventListener("click", function() {
                        e.switchView(s.THUMBS)
                    }), this.outlineButton.addEventListener("click", function() {
                        e.switchView(s.OUTLINE)
                    }), this.outlineButton.addEventListener("dblclick", function() {
                        e.pdfOutlineViewer.toggleOutlineTree()
                    }), this.attachmentsButton.addEventListener("click", function() {
                        e.switchView(s.ATTACHMENTS)
                    }), this.metadataButton.addEventListener("click", function() {
                        e.switchView(s.METADATA)
                    }), this.eventBus.on("outlineloaded", function(t) {
                        var n = t.outlineCount;
                        e.outlineButton.disabled = !n, n ? e._showUINotification(s.OUTLINE) : e.active === s.OUTLINE && e.switchView(s.THUMBS)
                    }), this.eventBus.on("attachmentsloaded", function(t) {
                        if (t.attachmentsCount) return e.attachmentsButton.disabled = !1, void e._showUINotification(s.ATTACHMENTS);
                        Promise.resolve().then(function() {
                            e.attachmentsView.hasChildNodes() || (e.attachmentsButton.disabled = !0, e.active === s.ATTACHMENTS && e.switchView(s.THUMBS))
                        })
                    }), this.eventBus.on("presentationmodechanged", function(t) {
                        t.active || t.switchInProgress || !e.isThumbnailViewVisible || e._updateThumbnailViewer()
                    })
                }
            }, {
                key: "visibleView",
                get: function() {
                    return this.isOpen ? this.active : s.NONE
                }
            }, {
                key: "isThumbnailViewVisible",
                get: function() {
                    return this.isOpen && this.active === s.THUMBS
                }
            }, {
                key: "isOutlineViewVisible",
                get: function() {
                    return this.isOpen && this.active === s.OUTLINE
                }
            }, {
                key: "isAttachmentsViewVisible",
                get: function() {
                    return this.isOpen && this.active === s.ATTACHMENTS
                }
            }]), e
        }();
    t.SidebarView = s, t.PDFSidebar = l
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._overlays = {}, this._active = null, this._keyDownBound = this._keyDown.bind(this)
            }
            return r(e, [{
                key: "register",
                value: function(e, t) {
                    var n = this,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    return new Promise(function(a) {
                        var o = void 0;
                        if (!(e && t && (o = t.parentNode))) throw new Error("Not enough parameters.");
                        if (n._overlays[e]) throw new Error("The overlay is already registered.");
                        n._overlays[e] = {
                            element: t,
                            container: o,
                            callerCloseMethod: r,
                            canForceClose: i
                        }, a()
                    })
                }
            }, {
                key: "unregister",
                value: function(e) {
                    var t = this;
                    return new Promise(function(n) {
                        if (!t._overlays[e]) throw new Error("The overlay does not exist.");
                        if (t._active === e) throw new Error("The overlay cannot be removed while it is active.");
                        delete t._overlays[e], n()
                    })
                }
            }, {
                key: "open",
                value: function(e) {
                    var t = this;
                    return new Promise(function(n) {
                        if (!t._overlays[e]) throw new Error("The overlay does not exist.");
                        if (t._active) {
                            if (!t._overlays[e].canForceClose) throw t._active === e ? new Error("The overlay is already active.") : new Error("Another overlay is currently active.");
                            t._closeThroughCaller()
                        }
                        t._active = e, t._overlays[t._active].element.classList.remove("hidden"), t._overlays[t._active].container.classList.remove("hidden"), window.addEventListener("keydown", t._keyDownBound), n()
                    })
                }
            }, {
                key: "close",
                value: function(e) {
                    var t = this;
                    return new Promise(function(n) {
                        if (!t._overlays[e]) throw new Error("The overlay does not exist.");
                        if (!t._active) throw new Error("The overlay is currently not active.");
                        if (t._active !== e) throw new Error("Another overlay is currently active.");
                        t._overlays[t._active].container.classList.add("hidden"), t._overlays[t._active].element.classList.add("hidden"), t._active = null, window.removeEventListener("keydown", t._keyDownBound), n()
                    })
                }
            }, {
                key: "_keyDown",
                value: function(e) {
                    this._active && 27 === e.keyCode && (this._closeThroughCaller(), e.preventDefault())
                }
            }, {
                key: "_closeThroughCaller",
                value: function() {
                    this._overlays[this._active].callerCloseMethod && this._overlays[this._active].callerCloseMethod(), this._active && this.close(this._active)
                }
            }, {
                key: "active",
                get: function() {
                    return this._active
                }
            }]), e
        }();
    t.OverlayManager = i
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PasswordPrompt = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = n(1),
        o = function() {
            function e(t, n) {
                var r = this,
                    a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.NullL10n;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.overlayName = t.overlayName, this.container = t.container, this.label = t.label, this.input = t.input, this.submitButton = t.submitButton, this.cancelButton = t.cancelButton, this.overlayManager = n, this.l10n = a, this.updateCallback = null, this.reason = null, this.submitButton.addEventListener("click", this.verify.bind(this)), this.cancelButton.addEventListener("click", this.close.bind(this)), this.input.addEventListener("keydown", function(e) {
                    13 === e.keyCode && r.verify()
                }), this.overlayManager.register(this.overlayName, this.container, this.close.bind(this), !0)
            }
            return r(e, [{
                key: "open",
                value: function() {
                    var e = this;
                    this.overlayManager.open(this.overlayName).then(function() {
                        e.input.focus();
                        (e.reason === a.PasswordResponses.INCORRECT_PASSWORD ? e.l10n.get("password_invalid", null, "Invalid password. Please try again.") : e.l10n.get("password_label", null, "Enter the password to open this PDF file.")).then(function(t) {
                            e.label.textContent = t
                        })
                    })
                }
            }, {
                key: "close",
                value: function() {
                    var e = this;
                    this.overlayManager.close(this.overlayName).then(function() {
                        e.input.value = ""
                    })
                }
            }, {
                key: "verify",
                value: function() {
                    var e = this.input.value;
                    if (e && e.length > 0) return this.close(), this.updateCallback(e)
                }
            }, {
                key: "setUpdateCallback",
                value: function(e, t) {
                    this.updateCallback = e, this.reason = t
                }
            }]), e
        }();
    t.PasswordPrompt = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFAttachmentViewer = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(1),
        a = function() {
            function e(t) {
                var n = t.container,
                    r = t.eventBus,
                    i = t.downloadManager;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.container = n, this.eventBus = r, this.downloadManager = i, this.reset(), this.eventBus.on("fileattachmentannotation", this._appendAttachment.bind(this))
            }
            return r(e, [{
                key: "reset",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.attachments = null, this.container.textContent = "", e || (this._renderedCapability = (0, i.createPromiseCapability)())
                }
            }, {
                key: "_dispatchEvent",
                value: function(e) {
                    this._renderedCapability.resolve(), this.eventBus.dispatch("attachmentsloaded", {
                        source: this,
                        attachmentsCount: e
                    })
                }
            }, {
                key: "_bindPdfLink",
                value: function(e, t, n) {
                    if (i.PDFJS.disableCreateObjectURL) throw new Error('bindPdfLink: Unsupported "PDFJS.disableCreateObjectURL" value.');
                    var r = void 0;
                    e.onclick = function() {
                        r || (r = (0, i.createObjectURL)(t, "application/pdf"));
                        var e = void 0;
                        return e = "?file=" + encodeURIComponent(r + "#" + n), window.open(e), !1
                    }
                }
            }, {
                key: "_bindLink",
                value: function(e, t, n) {
                    var r = this;
                    e.onclick = function() {
                        return r.downloadManager.downloadData(t, n, ""), !1
                    }
                }
            }, {
                key: "render",
                value: function(e) {
                    var t = e.attachments,
                        n = e.keepRenderedCapability,
                        r = void 0 !== n && n,
                        a = 0;
                    if (this.attachments && this.reset(!0 === r), this.attachments = t || null, t) {
                        var o = Object.keys(t).sort(function(e, t) {
                            return e.toLowerCase().localeCompare(t.toLowerCase())
                        });
                        a = o.length;
                        for (var s = 0; s < a; s++) {
                            var l = t[o[s]],
                                u = (0, i.removeNullCharacters)((0, i.getFilenameFromUrl)(l.filename)),
                                c = document.createElement("div");
                            c.className = "attachmentsItem";
                            var h = document.createElement("button");
                            h.textContent = u, /\.pdf$/i.test(u) && !i.PDFJS.disableCreateObjectURL ? this._bindPdfLink(h, l.content, u) : this._bindLink(h, l.content, u), c.appendChild(h), this.container.appendChild(c)
                        }
                        this._dispatchEvent(a)
                    } else this._dispatchEvent(a)
                }
            }, {
                key: "_appendAttachment",
                value: function(e) {
                    var t = this,
                        n = e.id,
                        r = e.filename,
                        i = e.content;
                    this._renderedCapability.promise.then(function() {
                        var e = t.attachments;
                        if (e) {
                            for (var a in e)
                                if (n === a) return
                        } else e = Object.create(null);
                        e[n] = {
                            filename: r,
                            content: i
                        }, t.render({
                            attachments: e,
                            keepRenderedCapability: !0
                        })
                    })
                }
            }]), e
        }();
    t.PDFAttachmentViewer = a
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFDocumentProperties = void 0;
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        a = void 0;
                    try {
                        for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        i = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(0),
        o = n(1),
        s = function() {
            function e(t, n) {
                var r = t.overlayName,
                    i = t.fields,
                    o = t.container,
                    s = t.closeButton,
                    l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a.NullL10n;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.overlayName = r, this.fields = i, this.container = o, this.overlayManager = n, this.l10n = l, this._reset(), s && s.addEventListener("click", this.close.bind(this)), this.overlayManager.register(this.overlayName, this.container, this.close.bind(this))
            }
            return i(e, [{
                key: "open",
                value: function() {
                    var e = this,
                        t = function(t) {
                            Object.defineProperty(e, "fieldData", {
                                value: Object.freeze(t),
                                writable: !1,
                                enumerable: !0,
                                configurable: !0
                            })
                        };
                    Promise.all([this.overlayManager.open(this.overlayName), this._dataAvailableCapability.promise]).then(function() {
                        e.fieldData ? e._updateUI() : e.pdfDocument.getMetadata().then(function(t) {
                            var n = t.info,
                                r = t.metadata;
                            return Promise.all([n, r, e._parseFileSize(e.maybeFileSize), e._parseDate(n.CreationDate), e._parseDate(n.ModDate)])
                        }).then(function(n) {
                            var i = r(n, 5),
                                o = i[0],
                                s = (i[1], i[2]),
                                l = i[3],
                                u = i[4];
                            return t({
                                fileName: (0, a.getPDFFileNameFromURL)(e.url),
                                fileSize: s,
                                title: o.Title,
                                author: o.Author,
                                subject: o.Subject,
                                keywords: o.Keywords,
                                creationDate: l,
                                modificationDate: u,
                                creator: o.Creator,
                                producer: o.Producer,
                                version: o.PDFFormatVersion,
                                pageCount: e.pdfDocument.numPages
                            }), e._updateUI(), e.pdfDocument.getDownloadInfo()
                        }).then(function(t) {
                            var n = t.length;
                            return e._parseFileSize(n)
                        }).then(function(n) {
                            var r = (0, a.cloneObj)(e.fieldData);
                            r.fileSize = n, t(r), e._updateUI()
                        })
                    })
                }
            }, {
                key: "close",
                value: function() {
                    this.overlayManager.close(this.overlayName)
                }
            }, {
                key: "setDocument",
                value: function(e, t) {
                    this.pdfDocument && (this._reset(), this._updateUI(!0)), e && (this.pdfDocument = e, this.url = t, this._dataAvailableCapability.resolve())
                }
            }, {
                key: "setFileSize",
                value: function(e) {
                    "number" == typeof e && e > 0 && (this.maybeFileSize = e)
                }
            }, {
                key: "_reset",
                value: function() {
                    this.pdfDocument = null, this.url = null, this.maybeFileSize = 0, delete this.fieldData, this._dataAvailableCapability = (0, o.createPromiseCapability)()
                }
            }, {
                key: "_updateUI",
                value: function() {
                    if (!(arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) && this.fieldData) {
                        if (this.overlayManager.active === this.overlayName)
                            for (var e in this.fields) {
                                var t = this.fieldData[e];
                                this.fields[e].textContent = t || 0 === t ? t : "-"
                            }
                    } else
                        for (var n in this.fields) this.fields[n].textContent = "-"
                }
            }, {
                key: "_parseFileSize",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        t = e / 1024;
                    return t ? t < 1024 ? this.l10n.get("document_properties_kb", {
                        size_kb: (+t.toPrecision(3)).toLocaleString(),
                        size_b: e.toLocaleString()
                    }, "{{size_kb}} KB ({{size_b}} bytes)") : this.l10n.get("document_properties_mb", {
                        size_mb: (+(t / 1024).toPrecision(3)).toLocaleString(),
                        size_b: e.toLocaleString()
                    }, "{{size_mb}} MB ({{size_b}} bytes)") : Promise.resolve(void 0)
                }
            }, {
                key: "_parseDate",
                value: function(e) {
                    if (e) {
                        var t = e;
                        "D:" === t.substring(0, 2) && (t = t.substring(2));
                        var n = parseInt(t.substring(0, 4), 10),
                            r = parseInt(t.substring(4, 6), 10) - 1,
                            i = parseInt(t.substring(6, 8), 10),
                            a = parseInt(t.substring(8, 10), 10),
                            o = parseInt(t.substring(10, 12), 10),
                            s = parseInt(t.substring(12, 14), 10),
                            l = t.substring(14, 15),
                            u = parseInt(t.substring(15, 17), 10),
                            c = parseInt(t.substring(18, 20), 10);
                        "-" === l ? (a += u, o += c) : "+" === l && (a -= u, o -= c);
                        var h = new Date(Date.UTC(n, r, i, a, o, s)),
                            d = h.toLocaleDateString(),
                            f = h.toLocaleTimeString();
                        return this.l10n.get("document_properties_date_string", {
                            date: d,
                            time: f
                        }, "{{date}}, {{time}}")
                    }
                }
            }]), e
        }();
    t.PDFDocumentProperties = s
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFFindBar = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(7),
        a = n(0),
        o = function() {
            function e(t) {
                var n = this,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a.NullL10n;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.opened = !1, this.bar = t.bar || null, this.toggleButton = t.toggleButton || null, this.findField = t.findField || null, this.highlightAll = t.highlightAllCheckbox || null, this.caseSensitive = t.caseSensitiveCheckbox || null, this.findMsg = t.findMsg || null, this.findResultsCount = t.findResultsCount || null, this.findStatusIcon = t.findStatusIcon || null, this.findPreviousButton = t.findPreviousButton || null, this.findNextButton = t.findNextButton || null, this.findController = t.findController || null, this.eventBus = t.eventBus, this.l10n = r, null === this.findController) throw new Error("PDFFindBar cannot be used without a PDFFindController instance.");
                this.toggleButton.addEventListener("click", function() {
                    n.toggle()
                }), this.findField.addEventListener("input", function() {
                    n.dispatchEvent("")
                }), this.bar.addEventListener("keydown", function(e) {
                    switch (e.keyCode) {
                        case 13:
                            e.target === n.findField && n.dispatchEvent("again", e.shiftKey);
                            break;
                        case 27:
                            n.close()
                    }
                }), this.findPreviousButton.addEventListener("click", function() {
                    n.dispatchEvent("again", !0)
                }), this.findNextButton.addEventListener("click", function() {
                    n.dispatchEvent("again", !1)
                }), this.highlightAll.addEventListener("click", function() {
                    n.dispatchEvent("highlightallchange")
                }), this.caseSensitive.addEventListener("click", function() {
                    n.dispatchEvent("casesensitivitychange")
                }), this.eventBus.on("resize", this._adjustWidth.bind(this))
            }
            return r(e, [{
                key: "reset",
                value: function() {
                    this.updateUIState()
                }
            }, {
                key: "dispatchEvent",
                value: function(e, t) {
                    this.eventBus.dispatch("find", {
                        source: this,
                        type: e,
                        query: this.findField.value,
                        caseSensitive: this.caseSensitive.checked,
                        phraseSearch: !0,
                        highlightAll: this.highlightAll.checked,
                        findPrevious: t
                    })
                }
            }, {
                key: "updateUIState",
                value: function(e, t, n) {
                    var r = this,
                        a = !1,
                        o = "",
                        s = "";
                    switch (e) {
                        case i.FindState.FOUND:
                            break;
                        case i.FindState.PENDING:
                            s = "pending";
                            break;
                        case i.FindState.NOT_FOUND:
                            o = this.l10n.get("find_not_found", null, "Phrase not found"), a = !0;
                            break;
                        case i.FindState.WRAPPED:
                            o = t ? this.l10n.get("find_reached_top", null, "Reached top of document, continued from bottom") : this.l10n.get("find_reached_bottom", null, "Reached end of document, continued from top")
                    }
                    a ? this.findField.classList.add("notFound") : this.findField.classList.remove("notFound"), this.findField.setAttribute("data-status", s), Promise.resolve(o).then(function(e) {
                        r.findMsg.textContent = e, r._adjustWidth()
                    }), this.updateResultsCount(n)
                }
            }, {
                key: "updateResultsCount",
                value: function(e) {
                    this.findResultsCount && (e ? (this.findResultsCount.textContent = e.toLocaleString(), this.findResultsCount.classList.remove("hidden")) : (this.findResultsCount.classList.add("hidden"), this.findResultsCount.textContent = ""), this._adjustWidth())
                }
            }, {
                key: "open",
                value: function() {
                    this.opened || (this.opened = !0, this.toggleButton.classList.add("toggled"), this.bar.classList.remove("hidden")), this.findField.select(), this.findField.focus(), this._adjustWidth()
                }
            }, {
                key: "close",
                value: function() {
                    this.opened && (this.opened = !1, this.toggleButton.classList.remove("toggled"), this.bar.classList.add("hidden"), this.findController.active = !1)
                }
            }, {
                key: "toggle",
                value: function() {
                    this.opened ? this.close() : this.open()
                }
            }, {
                key: "_adjustWidth",
                value: function() {
                    if (this.opened) {
                        this.bar.classList.remove("wrapContainers");
                        this.bar.clientHeight > this.bar.firstElementChild.clientHeight && this.bar.classList.add("wrapContainers")
                    }
                }
            }]), e
        }();
    t.PDFFindBar = o
}, function(e, t, n) {
    "use strict";

    function r() {
        return document.location.hash
    }

    function i(e) {
        var t = unescape(r()).substring(1),
            n = 0 | (0, u.parseQueryString)(t).page;
        return Number.isInteger(n) && n > 0 && n <= e.pagesCount || (n = null), {
            hash: t,
            page: n,
            rotation: e.rotation
        }
    }

    function a(e, t) {
        if ("string" != typeof e || "string" != typeof t) return !1;
        if (e === t) return !0;
        return (0, u.parseQueryString)(e).nameddest === t
    }

    function o(e, t) {
        function n(e, t) {
            if ((void 0 === e ? "undefined" : s(e)) !== (void 0 === t ? "undefined" : s(t))) return !1;
            if (e instanceof Array || t instanceof Array) return !1;
            if (null !== e && "object" === (void 0 === e ? "undefined" : s(e)) && null !== t) {
                if (Object.keys(e).length !== Object.keys(t).length) return !1;
                for (var r in e)
                    if (!n(e[r], t[r])) return !1;
                return !0
            }
            return e === t || Number.isNaN(e) && Number.isNaN(t)
        }
        if (!(e instanceof Array && t instanceof Array)) return !1;
        if (e.length !== t.length) return !1;
        for (var r = 0, i = e.length; r < i; r++)
            if (!n(e[r], t[r])) return !1;
        return !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isDestArraysEqual = t.isDestHashesEqual = t.PDFHistory = void 0;
    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        l = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        u = n(0),
        c = n(2),
        h = function() {
            function e(t) {
                var n = this,
                    r = t.linkService,
                    i = t.eventBus;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.linkService = r, this.eventBus = i || (0, c.getGlobalEventBus)(), this.initialized = !1, this.initialBookmark = null, this.initialRotation = null, this._boundEvents = Object.create(null), this._isViewerInPresentationMode = !1, this._isPagesLoaded = !1, this.eventBus.on("presentationmodechanged", function(e) {
                    n._isViewerInPresentationMode = e.active || e.switchInProgress
                }), this.eventBus.on("pagesloaded", function(e) {
                    n._isPagesLoaded = !!e.pagesCount
                })
            }
            return l(e, [{
                key: "initialize",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (e && "string" == typeof e) {
                        var n = this.initialized && this.fingerprint !== e;
                        this.fingerprint = e, this.initialized || this._bindEvents();
                        var a = window.history.state;
                        if (this.initialized = !0, this.initialBookmark = null, this.initialRotation = null, this._popStateInProgress = !1, this._blockHashChange = 0, this._currentHash = r(), this._numPositionUpdates = 0, this._uid = this._maxUid = 0, this._destination = null, this._position = null, !this._isValidState(a) || t) {
                            var o = i(this.linkService),
                                s = o.hash,
                                l = o.page,
                                u = o.rotation;
                            return !s || n || t ? void this._pushOrReplaceState(null, !0) : void this._pushOrReplaceState({
                                hash: s,
                                page: l,
                                rotation: u
                            }, !0)
                        }
                        var c = a.destination;
                        this._updateInternalState(c, a.uid, !0), void 0 !== c.rotation && (this.initialRotation = c.rotation), c.dest ? (this.initialBookmark = JSON.stringify(c.dest), this._destination.page = null) : c.hash ? this.initialBookmark = c.hash : c.page && (this.initialBookmark = "page=" + c.page)
                    } else console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.')
                }
            }, {
                key: "push",
                value: function(e) {
                    var t = this,
                        n = e.namedDest,
                        r = e.explicitDest,
                        i = e.pageNumber;
                    if (this.initialized)
                        if ((!n || "string" == typeof n) && r instanceof Array && Number.isInteger(i) && i > 0 && i <= this.linkService.pagesCount) {
                            var s = n || JSON.stringify(r);
                            if (s) {
                                var l = !1;
                                if (this._destination && (a(this._destination.hash, s) || o(this._destination.dest, r))) {
                                    if (this._destination.page) return;
                                    l = !0
                                }
                                this._popStateInProgress && !l || (this._pushOrReplaceState({
                                    dest: r,
                                    hash: s,
                                    page: i,
                                    rotation: this.linkService.rotation
                                }, l), this._popStateInProgress || (this._popStateInProgress = !0, Promise.resolve().then(function() {
                                    t._popStateInProgress = !1
                                })))
                            }
                        } else console.error("PDFHistory.push: Invalid parameters.")
                }
            }, {
                key: "pushCurrentPosition",
                value: function() {
                    this.initialized && !this._popStateInProgress && this._tryPushCurrentPosition()
                }
            }, {
                key: "back",
                value: function() {
                    if (this.initialized && !this._popStateInProgress) {
                        var e = window.history.state;
                        this._isValidState(e) && e.uid > 0 && window.history.back()
                    }
                }
            }, {
                key: "forward",
                value: function() {
                    if (this.initialized && !this._popStateInProgress) {
                        var e = window.history.state;
                        this._isValidState(e) && e.uid < this._maxUid && window.history.forward()
                    }
                }
            }, {
                key: "_pushOrReplaceState",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || !this._destination,
                        n = {
                            fingerprint: this.fingerprint,
                            uid: t ? this._uid : this._uid + 1,
                            destination: e
                        };
                    this._updateInternalState(e, n.uid), t ? window.history.replaceState(n, "", document.URL) : (this._maxUid = this._uid, window.history.pushState(n, "", document.URL))
                }
            }, {
                key: "_tryPushCurrentPosition",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this._position) {
                        var t = this._position;
                        if (e && ((t = (0, u.cloneObj)(this._position)).temporary = !0), this._destination) {
                            if (this._destination.temporary) this._pushOrReplaceState(t, !0);
                            else if (this._destination.hash !== t.hash && (this._destination.page || !(this._numPositionUpdates <= 50))) {
                                var n = !1;
                                if (this._destination.page === t.first || this._destination.page === t.page) {
                                    if (this._destination.dest || !this._destination.first) return;
                                    n = !0
                                }
                                this._pushOrReplaceState(t, n)
                            }
                        } else this._pushOrReplaceState(t)
                    }
                }
            }, {
                key: "_isValidState",
                value: function(e) {
                    return !!e && (e.fingerprint === this.fingerprint && (!(!Number.isInteger(e.uid) || e.uid < 0) && (null !== e.destination && "object" === s(e.destination))))
                }
            }, {
                key: "_updateInternalState",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    this._updateViewareaTimeout && (clearTimeout(this._updateViewareaTimeout), this._updateViewareaTimeout = null), n && e && e.temporary && delete e.temporary, this._destination = e, this._uid = t, this._numPositionUpdates = 0
                }
            }, {
                key: "_updateViewarea",
                value: function(e) {
                    var t = this,
                        n = e.location;
                    this._updateViewareaTimeout && (clearTimeout(this._updateViewareaTimeout), this._updateViewareaTimeout = null), this._position = {
                        hash: this._isViewerInPresentationMode ? "page=" + n.pageNumber : n.pdfOpenParams.substring(1),
                        page: this.linkService.page,
                        first: n.pageNumber,
                        rotation: n.rotation
                    }, this._popStateInProgress || (this._isPagesLoaded && this._destination && !this._destination.page && this._numPositionUpdates++, this._updateViewareaTimeout = setTimeout(function() {
                        t._popStateInProgress || t._tryPushCurrentPosition(!0), t._updateViewareaTimeout = null
                    }, 1e3))
                }
            }, {
                key: "_popState",
                value: function(e) {
                    var t = this,
                        n = e.state,
                        a = r(),
                        o = this._currentHash !== a;
                    if (this._currentHash = a, n) {
                        if (this._isValidState(n)) {
                            this._popStateInProgress = !0, o && (this._blockHashChange++, (0, u.waitOnEventOrTimeout)({
                                target: window,
                                name: "hashchange",
                                delay: 1e3
                            }).then(function() {
                                t._blockHashChange--
                            }));
                            var s = n.destination;
                            this._updateInternalState(s, n.uid, !0), (0, u.isValidRotation)(s.rotation) && (this.linkService.rotation = s.rotation), s.dest ? this.linkService.navigateTo(s.dest) : s.hash ? this.linkService.setHash(s.hash) : s.page && (this.linkService.page = s.page), Promise.resolve().then(function() {
                                t._popStateInProgress = !1
                            })
                        }
                    } else {
                        this._uid++;
                        var l = i(this.linkService),
                            c = l.hash,
                            h = l.page,
                            d = l.rotation;
                        this._pushOrReplaceState({
                            hash: c,
                            page: h,
                            rotation: d
                        }, !0)
                    }
                }
            }, {
                key: "_bindEvents",
                value: function() {
                    var e = this,
                        t = this._boundEvents,
                        n = this.eventBus;
                    t.updateViewarea = this._updateViewarea.bind(this), t.popState = this._popState.bind(this), t.pageHide = function(t) {
                        e._destination || e._tryPushCurrentPosition()
                    }, n.on("updateviewarea", t.updateViewarea), window.addEventListener("popstate", t.popState), window.addEventListener("pagehide", t.pageHide)
                }
            }, {
                key: "popStateInProgress",
                get: function() {
                    return this.initialized && (this._popStateInProgress || this._blockHashChange > 0)
                }
            }]), e
        }();
    t.PDFHistory = h, t.isDestHashesEqual = a, t.isDestArraysEqual = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFOutlineViewer = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(1),
        a = function() {
            function e(t) {
                var n = t.container,
                    r = t.linkService,
                    i = t.eventBus;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.container = n, this.linkService = r, this.eventBus = i, this.reset()
            }
            return r(e, [{
                key: "reset",
                value: function() {
                    this.outline = null, this.lastToggleIsShow = !0, this.container.textContent = "", this.container.classList.remove("outlineWithDeepNesting")
                }
            }, {
                key: "_dispatchEvent",
                value: function(e) {
                    this.eventBus.dispatch("outlineloaded", {
                        source: this,
                        outlineCount: e
                    })
                }
            }, {
                key: "_bindLink",
                value: function(e, t) {
                    var n = this;
                    if (t.url)(0, i.addLinkAttributes)(e, {
                        url: t.url,
                        target: t.newWindow ? i.PDFJS.LinkTarget.BLANK : void 0
                    });
                    else {
                        var r = t.dest;
                        e.href = this.linkService.getDestinationHash(r), e.onclick = function() {
                            return r && n.linkService.navigateTo(r), !1
                        }
                    }
                }
            }, {
                key: "_setStyles",
                value: function(e, t) {
                    var n = "";
                    t.bold && (n += "font-weight: bold;"), t.italic && (n += "font-style: italic;"), n && e.setAttribute("style", n)
                }
            }, {
                key: "_addToggleButton",
                value: function(e) {
                    var t = this,
                        n = document.createElement("div");
                    n.className = "outlineItemToggler", n.onclick = function(r) {
                        if (r.stopPropagation(), n.classList.toggle("outlineItemsHidden"), r.shiftKey) {
                            var i = !n.classList.contains("outlineItemsHidden");
                            t._toggleOutlineItem(e, i)
                        }
                    }, e.insertBefore(n, e.firstChild)
                }
            }, {
                key: "_toggleOutlineItem",
                value: function(e, t) {
                    this.lastToggleIsShow = t;
                    for (var n = e.querySelectorAll(".outlineItemToggler"), r = 0, i = n.length; r < i; ++r) n[r].classList[t ? "remove" : "add"]("outlineItemsHidden")
                }
            }, {
                key: "toggleOutlineTree",
                value: function() {
                    this.outline && this._toggleOutlineItem(this.container, !this.lastToggleIsShow)
                }
            }, {
                key: "render",
                value: function(e) {
                    var t = e.outline,
                        n = 0;
                    if (this.outline && this.reset(), this.outline = t || null, t) {
                        for (var r = document.createDocumentFragment(), a = [{
                                parent: r,
                                items: this.outline
                            }], o = !1; a.length > 0;)
                            for (var s = a.shift(), l = 0, u = s.items.length; l < u; l++) {
                                var c = s.items[l],
                                    h = document.createElement("div");
                                h.className = "outlineItem";
                                var d = document.createElement("a");
                                if (this._bindLink(d, c), this._setStyles(d, c), d.textContent = (0, i.removeNullCharacters)(c.title) || "–", h.appendChild(d), c.items.length > 0) {
                                    o = !0, this._addToggleButton(h);
                                    var f = document.createElement("div");
                                    f.className = "outlineItems", h.appendChild(f), a.push({
                                        parent: f,
                                        items: c.items
                                    })
                                }
                                s.parent.appendChild(h), n++
                            }
                        o && this.container.classList.add("outlineWithDeepNesting"), this.container.appendChild(r), this._dispatchEvent(n)
                    } else this._dispatchEvent(n)
                }
            }]), e
        }();
    t.PDFOutlineViewer = a
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFPresentationMode = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = "pdfPresentationMode",
        o = "pdfPresentationModeControls",
        s = Math.PI / 6,
        l = function() {
            function e(t) {
                var n = this,
                    r = t.container,
                    i = t.viewer,
                    a = void 0 === i ? null : i,
                    o = t.pdfViewer,
                    s = t.eventBus,
                    l = t.contextMenuItems,
                    u = void 0 === l ? null : l;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.container = r, this.viewer = a || r.firstElementChild, this.pdfViewer = o, this.eventBus = s, this.active = !1, this.args = null, this.contextMenuOpen = !1, this.mouseScrollTimeStamp = 0, this.mouseScrollDelta = 0, this.touchSwipeState = null, u && (u.contextFirstPage.addEventListener("click", function() {
                    n.contextMenuOpen = !1, n.eventBus.dispatch("firstpage")
                }), u.contextLastPage.addEventListener("click", function() {
                    n.contextMenuOpen = !1, n.eventBus.dispatch("lastpage")
                }), u.contextPageRotateCw.addEventListener("click", function() {
                    n.contextMenuOpen = !1, n.eventBus.dispatch("rotatecw")
                }), u.contextPageRotateCcw.addEventListener("click", function() {
                    n.contextMenuOpen = !1, n.eventBus.dispatch("rotateccw")
                }))
            }
            return r(e, [{
                key: "request",
                value: function() {
                    if (this.switchInProgress || this.active || !this.viewer.hasChildNodes()) return !1;
                    if (this._addFullscreenChangeListeners(), this._setSwitchInProgress(), this._notifyStateChange(), this.container.requestFullscreen) this.container.requestFullscreen();
                    else if (this.container.mozRequestFullScreen) this.container.mozRequestFullScreen();
                    else if (this.container.webkitRequestFullscreen) this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    else {
                        if (!this.container.msRequestFullscreen) return !1;
                        this.container.msRequestFullscreen()
                    }
                    return this.args = {
                        page: this.pdfViewer.currentPageNumber,
                        previousScale: this.pdfViewer.currentScaleValue
                    }, !0
                }
            }, {
                key: "_mouseWheel",
                value: function(e) {
                    if (this.active) {
                        e.preventDefault();
                        var t = (0, i.normalizeWheelEventDelta)(e),
                            n = (new Date).getTime(),
                            r = this.mouseScrollTimeStamp;
                        if (!(n > r && n - r < 50) && ((this.mouseScrollDelta > 0 && t < 0 || this.mouseScrollDelta < 0 && t > 0) && this._resetMouseScrollState(), this.mouseScrollDelta += t, Math.abs(this.mouseScrollDelta) >= .1)) {
                            var a = this.mouseScrollDelta;
                            this._resetMouseScrollState();
                            (a > 0 ? this._goToPreviousPage() : this._goToNextPage()) && (this.mouseScrollTimeStamp = n)
                        }
                    }
                }
            }, {
                key: "_goToPreviousPage",
                value: function() {
                    var e = this.pdfViewer.currentPageNumber;
                    return !(e <= 1) && (this.pdfViewer.currentPageNumber = e - 1, !0)
                }
            }, {
                key: "_goToNextPage",
                value: function() {
                    var e = this.pdfViewer.currentPageNumber;
                    return !(e >= this.pdfViewer.pagesCount) && (this.pdfViewer.currentPageNumber = e + 1, !0)
                }
            }, {
                key: "_notifyStateChange",
                value: function() {
                    this.eventBus.dispatch("presentationmodechanged", {
                        source: this,
                        active: this.active,
                        switchInProgress: !!this.switchInProgress
                    })
                }
            }, {
                key: "_setSwitchInProgress",
                value: function() {
                    var e = this;
                    this.switchInProgress && clearTimeout(this.switchInProgress), this.switchInProgress = setTimeout(function() {
                        e._removeFullscreenChangeListeners(), delete e.switchInProgress, e._notifyStateChange()
                    }, 1500)
                }
            }, {
                key: "_resetSwitchInProgress",
                value: function() {
                    this.switchInProgress && (clearTimeout(this.switchInProgress), delete this.switchInProgress)
                }
            }, {
                key: "_enter",
                value: function() {
                    var e = this;
                    this.active = !0, this._resetSwitchInProgress(), this._notifyStateChange(), this.container.classList.add(a), setTimeout(function() {
                        e.pdfViewer.currentPageNumber = e.args.page, e.pdfViewer.currentScaleValue = "page-fit"
                    }, 0), this._addWindowListeners(), this._showControls(), this.contextMenuOpen = !1, this.container.setAttribute("contextmenu", "viewerContextMenu"), window.getSelection().removeAllRanges()
                }
            }, {
                key: "_exit",
                value: function() {
                    var e = this,
                        t = this.pdfViewer.currentPageNumber;
                    this.container.classList.remove(a), setTimeout(function() {
                        e.active = !1, e._removeFullscreenChangeListeners(), e._notifyStateChange(), e.pdfViewer.currentScaleValue = e.args.previousScale, e.pdfViewer.currentPageNumber = t, e.args = null
                    }, 0), this._removeWindowListeners(), this._hideControls(), this._resetMouseScrollState(), this.container.removeAttribute("contextmenu"), this.contextMenuOpen = !1
                }
            }, {
                key: "_mouseDown",
                value: function(e) {
                    if (this.contextMenuOpen) return this.contextMenuOpen = !1, void e.preventDefault();
                    if (0 === e.button) {
                        e.target.href && e.target.classList.contains("internalLink") || (e.preventDefault(), e.shiftKey ? this._goToPreviousPage() : this._goToNextPage())
                    }
                }
            }, {
                key: "_contextMenu",
                value: function() {
                    this.contextMenuOpen = !0
                }
            }, {
                key: "_showControls",
                value: function() {
                    var e = this;
                    this.controlsTimeout ? clearTimeout(this.controlsTimeout) : this.container.classList.add(o), this.controlsTimeout = setTimeout(function() {
                        e.container.classList.remove(o), delete e.controlsTimeout
                    }, 3e3)
                }
            }, {
                key: "_hideControls",
                value: function() {
                    this.controlsTimeout && (clearTimeout(this.controlsTimeout), this.container.classList.remove(o), delete this.controlsTimeout)
                }
            }, {
                key: "_resetMouseScrollState",
                value: function() {
                    this.mouseScrollTimeStamp = 0, this.mouseScrollDelta = 0
                }
            }, {
                key: "_touchSwipe",
                value: function(e) {
                    if (this.active)
                        if (e.touches.length > 1) this.touchSwipeState = null;
                        else switch (e.type) {
                            case "touchstart":
                                this.touchSwipeState = {
                                    startX: e.touches[0].pageX,
                                    startY: e.touches[0].pageY,
                                    endX: e.touches[0].pageX,
                                    endY: e.touches[0].pageY
                                };
                                break;
                            case "touchmove":
                                if (null === this.touchSwipeState) return;
                                this.touchSwipeState.endX = e.touches[0].pageX, this.touchSwipeState.endY = e.touches[0].pageY, e.preventDefault();
                                break;
                            case "touchend":
                                if (null === this.touchSwipeState) return;
                                var t = 0,
                                    n = this.touchSwipeState.endX - this.touchSwipeState.startX,
                                    r = this.touchSwipeState.endY - this.touchSwipeState.startY,
                                    i = Math.abs(Math.atan2(r, n));
                                Math.abs(n) > 50 && (i <= s || i >= Math.PI - s) ? t = n : Math.abs(r) > 50 && Math.abs(i - Math.PI / 2) <= s && (t = r), t > 0 ? this._goToPreviousPage() : t < 0 && this._goToNextPage()
                        }
                }
            }, {
                key: "_addWindowListeners",
                value: function() {
                    this.showControlsBind = this._showControls.bind(this), this.mouseDownBind = this._mouseDown.bind(this), this.mouseWheelBind = this._mouseWheel.bind(this), this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this), this.contextMenuBind = this._contextMenu.bind(this), this.touchSwipeBind = this._touchSwipe.bind(this), window.addEventListener("mousemove", this.showControlsBind), window.addEventListener("mousedown", this.mouseDownBind), window.addEventListener("wheel", this.mouseWheelBind), window.addEventListener("keydown", this.resetMouseScrollStateBind), window.addEventListener("contextmenu", this.contextMenuBind), window.addEventListener("touchstart", this.touchSwipeBind), window.addEventListener("touchmove", this.touchSwipeBind), window.addEventListener("touchend", this.touchSwipeBind)
                }
            }, {
                key: "_removeWindowListeners",
                value: function() {
                    window.removeEventListener("mousemove", this.showControlsBind), window.removeEventListener("mousedown", this.mouseDownBind), window.removeEventListener("wheel", this.mouseWheelBind), window.removeEventListener("keydown", this.resetMouseScrollStateBind), window.removeEventListener("contextmenu", this.contextMenuBind), window.removeEventListener("touchstart", this.touchSwipeBind), window.removeEventListener("touchmove", this.touchSwipeBind), window.removeEventListener("touchend", this.touchSwipeBind), delete this.showControlsBind, delete this.mouseDownBind, delete this.mouseWheelBind, delete this.resetMouseScrollStateBind, delete this.contextMenuBind, delete this.touchSwipeBind
                }
            }, {
                key: "_fullscreenChange",
                value: function() {
                    this.isFullscreen ? this._enter() : this._exit()
                }
            }, {
                key: "_addFullscreenChangeListeners",
                value: function() {
                    this.fullscreenChangeBind = this._fullscreenChange.bind(this), window.addEventListener("fullscreenchange", this.fullscreenChangeBind), window.addEventListener("mozfullscreenchange", this.fullscreenChangeBind), window.addEventListener("webkitfullscreenchange", this.fullscreenChangeBind), window.addEventListener("MSFullscreenChange", this.fullscreenChangeBind)
                }
            }, {
                key: "_removeFullscreenChangeListeners",
                value: function() {
                    window.removeEventListener("fullscreenchange", this.fullscreenChangeBind), window.removeEventListener("mozfullscreenchange", this.fullscreenChangeBind), window.removeEventListener("webkitfullscreenchange", this.fullscreenChangeBind), window.removeEventListener("MSFullscreenChange", this.fullscreenChangeBind), delete this.fullscreenChangeBind
                }
            }, {
                key: "isFullscreen",
                get: function() {
                    return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement)
                }
            }]), e
        }();
    t.PDFPresentationMode = l
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFThumbnailViewer = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = n(20),
        o = function() {
            function e(t) {
                var n = t.container,
                    r = t.linkService,
                    a = t.renderingQueue,
                    o = t.l10n,
                    s = void 0 === o ? i.NullL10n : o;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.container = n, this.linkService = r, this.renderingQueue = a, this.l10n = s, this.scroll = (0, i.watchScroll)(this.container, this._scrollUpdated.bind(this)), this._resetView()
            }
            return r(e, [{
                key: "_scrollUpdated",
                value: function() {
                    this.renderingQueue.renderHighestPriority()
                }
            }, {
                key: "getThumbnail",
                value: function(e) {
                    return this._thumbnails[e]
                }
            }, {
                key: "_getVisibleThumbs",
                value: function() {
                    return (0, i.getVisibleElements)(this.container, this._thumbnails)
                }
            }, {
                key: "scrollThumbnailIntoView",
                value: function(e) {
                    var t = document.querySelector(".thumbnail.selected");
                    t && t.classList.remove("selected");
                    var n = document.querySelector('div.thumbnail[data-page-number="' + e + '"]');
                    n && n.classList.add("selected");
                    var r = this._getVisibleThumbs(),
                        a = r.views.length;
                    if (a > 0) {
                        var o = r.first.id,
                            s = a > 1 ? r.last.id : o;
                        (e <= o || e >= s) && (0, i.scrollIntoView)(n, {
                            top: -19
                        })
                    }
                }
            }, {
                key: "cleanup",
                value: function() {
                    a.PDFThumbnailView.cleanup()
                }
            }, {
                key: "_resetView",
                value: function() {
                    this._thumbnails = [], this._pageLabels = null, this._pagesRotation = 0, this._pagesRequests = [], this.container.textContent = ""
                }
            }, {
                key: "setDocument",
                value: function(e) {
                    var t = this;
                    this.pdfDocument && (this._cancelRendering(), this._resetView()), this.pdfDocument = e, e && e.getPage(1).then(function(n) {
                        for (var r = e.numPages, i = n.getViewport(1), o = 1; o <= r; ++o) {
                            var s = new a.PDFThumbnailView({
                                container: t.container,
                                id: o,
                                defaultViewport: i.clone(),
                                linkService: t.linkService,
                                renderingQueue: t.renderingQueue,
                                disableCanvasToImageConversion: !1,
                                l10n: t.l10n
                            });
                            t._thumbnails.push(s)
                        }
                    }).catch(function(e) {
                        console.error("Unable to initialize thumbnail viewer", e)
                    })
                }
            }, {
                key: "_cancelRendering",
                value: function() {
                    for (var e = 0, t = this._thumbnails.length; e < t; e++) this._thumbnails[e] && this._thumbnails[e].cancelRendering()
                }
            }, {
                key: "setPageLabels",
                value: function(e) {
                    if (this.pdfDocument) {
                        e ? e instanceof Array && this.pdfDocument.numPages === e.length ? this._pageLabels = e : (this._pageLabels = null, console.error("PDFThumbnailViewer_setPageLabels: Invalid page labels.")) : this._pageLabels = null;
                        for (var t = 0, n = this._thumbnails.length; t < n; t++) {
                            var r = this._pageLabels && this._pageLabels[t];
                            this._thumbnails[t].setPageLabel(r)
                        }
                    }
                }
            }, {
                key: "_ensurePdfPageLoaded",
                value: function(e) {
                    var t = this;
                    if (e.pdfPage) return Promise.resolve(e.pdfPage);
                    var n = e.id;
                    if (this._pagesRequests[n]) return this._pagesRequests[n];
                    var r = this.pdfDocument.getPage(n).then(function(r) {
                        return e.setPdfPage(r), t._pagesRequests[n] = null, r
                    }).catch(function(e) {
                        console.error("Unable to get page for thumb view", e), t._pagesRequests[n] = null
                    });
                    return this._pagesRequests[n] = r, r
                }
            }, {
                key: "forceRendering",
                value: function() {
                    var e = this,
                        t = this._getVisibleThumbs(),
                        n = this.renderingQueue.getHighestPriority(t, this._thumbnails, this.scroll.down);
                    return !!n && (this._ensurePdfPageLoaded(n).then(function() {
                        e.renderingQueue.renderView(n)
                    }), !0)
                }
            }, {
                key: "pagesRotation",
                get: function() {
                    return this._pagesRotation
                },
                set: function(e) {
                    if (!(0, i.isValidRotation)(e)) throw new Error("Invalid thumbnails rotation angle.");
                    if (this.pdfDocument && this._pagesRotation !== e) {
                        this._pagesRotation = e;
                        for (var t = 0, n = this._thumbnails.length; t < n; t++) this._thumbnails[t].update(e)
                    }
                }
            }]), e
        }();
    t.PDFThumbnailViewer = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFThumbnailView = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(1),
        a = n(0),
        o = n(3),
        s = 1,
        l = 286,
        u = function() {
            var e = null;
            return {
                getCanvas: function(t, n) {
                    var r = e;
                    r || (r = document.createElement("canvas"), e = r), r.width = t, r.height = n, r.mozOpaque = !0;
                    var i = r.getContext("2d", {
                        alpha: !1
                    });
                    return i.save(), i.fillStyle = "rgb(255, 255, 255)", i.fillRect(0, 0, t, n), i.restore(), r
                },
                destroyCanvas: function() {
                    var t = e;
                    t && (t.width = 0, t.height = 0), e = null
                }
            }
        }(),
        c = function() {
            function e(t) {
                var n = t.container,
                    r = t.id,
                    i = t.defaultViewport,
                    u = t.linkService,
                    c = t.renderingQueue,
                    h = t.disableCanvasToImageConversion,
                    d = void 0 !== h && h,
                    f = t.l10n,
                    p = void 0 === f ? a.NullL10n : f;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.id = r, this.renderingId = "thumbnail" + r, this.pageLabel = null, this.pdfPage = null, this.rotation = 0, this.viewport = i, this.pdfPageRotate = i.rotation, this.linkService = u, this.renderingQueue = c, this.renderTask = null, this.renderingState = o.RenderingStates.INITIAL, this.resume = null, this.disableCanvasToImageConversion = d, this.pageWidth = this.viewport.width, this.pageHeight = this.viewport.height, this.pageRatio = this.pageWidth / this.pageHeight, this.canvasWidth = l, this.canvasHeight = this.canvasWidth / this.pageRatio | 0, this.scale = this.canvasWidth / this.pageWidth, this.l10n = p;
                var v = document.createElement("a");
                v.href = u.getAnchorUrl("#page=" + r), this.l10n.get("thumb_page_title", {
                    page: r
                }, "Page {{page}}").then(function(e) {
                    v.title = e
                }), v.onclick = function() {
                    return u.page = r, !1
                }, this.anchor = v;
                var g = document.createElement("div");
                g.className = "thumbnail", g.setAttribute("data-page-number", this.id), this.div = g, 1 === r && g.classList.add("selected");
                var m = document.createElement("div");
                m.className = "thumbnailSelectionRing";
                var b = 2 * s;
                m.style.width = this.canvasWidth + b + "px", m.style.height = this.canvasHeight + b + "px", this.ring = m, g.appendChild(m), v.appendChild(g), n.appendChild(v)
            }
            return r(e, [{
                key: "setPdfPage",
                value: function(e) {
                    this.pdfPage = e, this.pdfPageRotate = e.rotate;
                    var t = (this.rotation + this.pdfPageRotate) % 360;
                    this.viewport = e.getViewport(1, t), this.reset()
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancelRendering(), this.pageWidth = this.viewport.width, this.pageHeight = this.viewport.height, this.pageRatio = this.pageWidth / this.pageHeight, this.canvasHeight = this.canvasWidth / this.pageRatio | 0, this.scale = this.canvasWidth / this.pageWidth, this.div.removeAttribute("data-loaded");
                    for (var e = this.ring, t = e.childNodes, n = t.length - 1; n >= 0; n--) e.removeChild(t[n]);
                    var r = 2 * s;
                    e.style.width = this.canvasWidth + r + "px", e.style.height = this.canvasHeight + r + "px", this.canvas && (this.canvas.width = 0, this.canvas.height = 0, delete this.canvas), this.image && (this.image.removeAttribute("src"), delete this.image)
                }
            }, {
                key: "update",
                value: function(e) {
                    void 0 !== e && (this.rotation = e);
                    var t = (this.rotation + this.pdfPageRotate) % 360;
                    this.viewport = this.viewport.clone({
                        scale: 1,
                        rotation: t
                    }), this.reset()
                }
            }, {
                key: "cancelRendering",
                value: function() {
                    this.renderTask && (this.renderTask.cancel(), this.renderTask = null), this.renderingState = o.RenderingStates.INITIAL, this.resume = null
                }
            }, {
                key: "_getPageDrawContext",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = document.createElement("canvas");
                    this.canvas = t, t.mozOpaque = !0;
                    var n = t.getContext("2d", {
                            alpha: !1
                        }),
                        r = (0, a.getOutputScale)(n);
                    return t.width = this.canvasWidth * r.sx | 0, t.height = this.canvasHeight * r.sy | 0, t.style.width = this.canvasWidth + "px", t.style.height = this.canvasHeight + "px", !e && r.scaled && n.scale(r.sx, r.sy), n
                }
            }, {
                key: "_convertCanvasToImage",
                value: function() {
                    var e = this;
                    if (this.canvas && this.renderingState === o.RenderingStates.FINISHED) {
                        var t = this.renderingId;
                        if (this.disableCanvasToImageConversion) return this.canvas.id = t, this.canvas.className = "thumbnailImage", this.l10n.get("thumb_page_canvas", {
                            page: this.pageId
                        }, "Thumbnail of Page {{page}}").then(function(t) {
                            e.canvas.setAttribute("aria-label", t)
                        }), this.div.setAttribute("data-loaded", !0), void this.ring.appendChild(this.canvas);
                        var n = document.createElement("img");
                        n.id = t, n.className = "thumbnailImage", this.l10n.get("thumb_page_canvas", {
                            page: this.pageId
                        }, "Thumbnail of Page {{page}}").then(function(e) {
                            n.setAttribute("aria-label", e)
                        }), n.style.width = this.canvasWidth + "px", n.style.height = this.canvasHeight + "px", n.src = this.canvas.toDataURL(), this.image = n, this.div.setAttribute("data-loaded", !0), this.ring.appendChild(n), this.canvas.width = 0, this.canvas.height = 0, delete this.canvas
                    }
                }
            }, {
                key: "draw",
                value: function() {
                    var e = this;
                    if (this.renderingState !== o.RenderingStates.INITIAL) return console.error("Must be in new state before drawing"), Promise.resolve(void 0);
                    this.renderingState = o.RenderingStates.RUNNING;
                    var t = (0, i.createPromiseCapability)(),
                        n = function(n) {
                            a === e.renderTask && (e.renderTask = null), "cancelled" === n || n instanceof i.RenderingCancelledException ? t.resolve(void 0) : (e.renderingState = o.RenderingStates.FINISHED, e._convertCanvasToImage(), n ? t.reject(n) : t.resolve(void 0))
                        },
                        r = {
                            canvasContext: this._getPageDrawContext(),
                            viewport: this.viewport.clone({
                                scale: this.scale
                            })
                        },
                        a = this.renderTask = this.pdfPage.render(r);
                    return a.onContinue = function(t) {
                        if (!e.renderingQueue.isHighestPriority(e)) return e.renderingState = o.RenderingStates.PAUSED, void(e.resume = function() {
                            e.renderingState = o.RenderingStates.RUNNING, t()
                        });
                        t()
                    }, a.promise.then(function() {
                        n(null)
                    }, function(e) {
                        n(e)
                    }), t.promise
                }
            }, {
                key: "setImage",
                value: function(e) {
                    if (this.renderingState === o.RenderingStates.INITIAL) {
                        var t = e.canvas;
                        if (t) {
                            this.pdfPage || this.setPdfPage(e.pdfPage), this.renderingState = o.RenderingStates.FINISHED;
                            var n = this._getPageDrawContext(!0),
                                r = n.canvas;
                            if (t.width <= 2 * r.width) return n.drawImage(t, 0, 0, t.width, t.height, 0, 0, r.width, r.height), void this._convertCanvasToImage();
                            for (var i = r.width << 3, a = r.height << 3, s = u.getCanvas(i, a), l = s.getContext("2d"); i > t.width || a > t.height;) i >>= 1, a >>= 1;
                            for (l.drawImage(t, 0, 0, t.width, t.height, 0, 0, i, a); i > 2 * r.width;) l.drawImage(s, 0, 0, i, a, 0, 0, i >> 1, a >> 1), i >>= 1, a >>= 1;
                            n.drawImage(s, 0, 0, i, a, 0, 0, r.width, r.height), this._convertCanvasToImage()
                        }
                    }
                }
            }, {
                key: "setPageLabel",
                value: function(e) {
                    var t = this;
                    this.pageLabel = "string" == typeof e ? e : null, this.l10n.get("thumb_page_title", {
                        page: this.pageId
                    }, "Page {{page}}").then(function(e) {
                        t.anchor.title = e
                    }), this.renderingState === o.RenderingStates.FINISHED && this.l10n.get("thumb_page_canvas", {
                        page: this.pageId
                    }, "Thumbnail of Page {{page}}").then(function(e) {
                        t.image ? t.image.setAttribute("aria-label", e) : t.disableCanvasToImageConversion && t.canvas && t.canvas.setAttribute("aria-label", e)
                    })
                }
            }, {
                key: "pageId",
                get: function() {
                    return null !== this.pageLabel ? this.pageLabel : this.id
                }
            }], [{
                key: "cleanup",
                value: function() {
                    u.destroyCanvas()
                }
            }]), e
        }();
    t.PDFThumbnailView = c
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFViewer = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = n(22),
        o = n(1),
        s = function(e) {
            function t() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, a.BaseViewer), r(t, [{
                key: "_scrollIntoView",
                value: function(e) {
                    var t = e.pageDiv,
                        n = e.pageSpot,
                        r = void 0 === n ? null : n;
                    (0, i.scrollIntoView)(t, r)
                }
            }, {
                key: "_getVisiblePages",
                value: function() {
                    if (!this.isInPresentationMode) return (0, i.getVisibleElements)(this.container, this._pages, !0);
                    var e = this._pages[this._currentPageNumber - 1];
                    return {
                        first: e,
                        last: e,
                        views: [{
                            id: e.id,
                            view: e
                        }]
                    }
                }
            }, {
                key: "update",
                value: function() {
                    var e = this._getVisiblePages(),
                        t = e.views,
                        n = t.length;
                    if (0 !== n) {
                        this._resizeBuffer(n), this.renderingQueue.renderHighestPriority(e);
                        for (var r = this._currentPageNumber, i = !1, a = 0; a < n; ++a) {
                            var o = t[a];
                            if (o.percent < 100) break;
                            if (o.id === r) {
                                i = !0;
                                break
                            }
                        }
                        i || (r = t[0].id), this.isInPresentationMode || this._setCurrentPageNumber(r), this._updateLocation(e.first), this.eventBus.dispatch("updateviewarea", {
                            source: this,
                            location: this._location
                        })
                    }
                }
            }, {
                key: "_setDocumentViewerElement",
                get: function() {
                    return (0, o.shadow)(this, "_setDocumentViewerElement", this.viewer)
                }
            }]), t
        }();
    t.PDFViewer = s
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e.width <= e.height
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BaseViewer = void 0;
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(1),
        o = n(0),
        s = n(3),
        l = n(23),
        u = n(2),
        c = n(24),
        h = n(5),
        d = n(25),
        f = function() {
            function e(t) {
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.constructor === e) throw new Error("Cannot initialize BaseViewer.");
                this._name = this.constructor.name, this.container = t.container, this.viewer = t.viewer || t.container.firstElementChild, this.eventBus = t.eventBus || (0, u.getGlobalEventBus)(), this.linkService = t.linkService || new h.SimpleLinkService, this.downloadManager = t.downloadManager || null, this.removePageBorders = t.removePageBorders || !1, this.enhanceTextSelection = t.enhanceTextSelection || !1, this.renderInteractiveForms = t.renderInteractiveForms || !1, this.enablePrintAutoRotate = t.enablePrintAutoRotate || !1, this.renderer = t.renderer || o.RendererType.CANVAS, this.l10n = t.l10n || o.NullL10n, this.defaultRenderingQueue = !t.renderingQueue, this.defaultRenderingQueue ? (this.renderingQueue = new s.PDFRenderingQueue, this.renderingQueue.setViewer(this)) : this.renderingQueue = t.renderingQueue, this.scroll = (0, o.watchScroll)(this.container, this._scrollUpdate.bind(this)), this.presentationModeState = o.PresentationModeState.UNKNOWN, this._resetView(), this.removePageBorders && this.viewer.classList.add("removePageBorders")
            }
            return i(e, [{
                key: "getPageView",
                value: function(e) {
                    return this._pages[e]
                }
            }, {
                key: "_setCurrentPageNumber",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (this._currentPageNumber !== e)
                        if (0 < e && e <= this.pagesCount) {
                            var n = {
                                source: this,
                                pageNumber: e,
                                pageLabel: this._pageLabels && this._pageLabels[e - 1]
                            };
                            this._currentPageNumber = e, this.eventBus.dispatch("pagechanging", n), this.eventBus.dispatch("pagechange", n), t && this._resetCurrentPageView()
                        } else console.error(this._name + '._setCurrentPageNumber: "' + e + '" is out of bounds.');
                    else t && this._resetCurrentPageView()
                }
            }, {
                key: "setDocument",
                value: function(e) {
                    var t = this;
                    if (this.pdfDocument && (this._cancelRendering(), this._resetView()), this.pdfDocument = e, e) {
                        var n = e.numPages,
                            r = (0, a.createPromiseCapability)();
                        this.pagesPromise = r.promise, r.promise.then(function() {
                            t._pageViewsReady = !0, t.eventBus.dispatch("pagesloaded", {
                                source: t,
                                pagesCount: n
                            })
                        });
                        var i = !1,
                            s = (0, a.createPromiseCapability)();
                        this.onePageRendered = s.promise;
                        var l = function(e) {
                                e.onBeforeDraw = function() {
                                    t._buffer.push(e)
                                }, e.onAfterDraw = function() {
                                    i || (i = !0, s.resolve())
                                }
                            },
                            u = e.getPage(1);
                        this.firstPagePromise = u, u.then(function(i) {
                            for (var u = t.currentScale, h = i.getViewport(u * o.CSS_UNITS), d = 1; d <= n; ++d) {
                                var f = null;
                                a.PDFJS.disableTextLayer || (f = t);
                                var p = new c.PDFPageView({
                                    container: t._setDocumentViewerElement,
                                    eventBus: t.eventBus,
                                    id: d,
                                    scale: u,
                                    defaultViewport: h.clone(),
                                    renderingQueue: t.renderingQueue,
                                    textLayerFactory: f,
                                    annotationLayerFactory: t,
                                    enhanceTextSelection: t.enhanceTextSelection,
                                    renderInteractiveForms: t.renderInteractiveForms,
                                    renderer: t.renderer,
                                    l10n: t.l10n
                                });
                                l(p), t._pages.push(p)
                            }
                            s.promise.then(function() {
                                if (a.PDFJS.disableAutoFetch) r.resolve();
                                else
                                    for (var i = n, o = function(n) {
                                            e.getPage(n).then(function(e) {
                                                var a = t._pages[n - 1];
                                                a.pdfPage || a.setPdfPage(e), t.linkService.cachePageRef(n, e.ref), 0 == --i && r.resolve()
                                            }, function(e) {
                                                console.error("Unable to get page " + n + " to initialize viewer", e), 0 == --i && r.resolve()
                                            })
                                        }, s = 1; s <= n; ++s) o(s)
                            }), t.eventBus.dispatch("pagesinit", {
                                source: t
                            }), t.defaultRenderingQueue && t.update(), t.findController && t.findController.resolveFirstPage()
                        }).catch(function(e) {
                            console.error("Unable to initialize viewer", e)
                        })
                    }
                }
            }, {
                key: "setPageLabels",
                value: function(e) {
                    if (this.pdfDocument) {
                        e ? e instanceof Array && this.pdfDocument.numPages === e.length ? this._pageLabels = e : (this._pageLabels = null, console.error(this._name + ".setPageLabels: Invalid page labels.")) : this._pageLabels = null;
                        for (var t = 0, n = this._pages.length; t < n; t++) {
                            var r = this._pages[t],
                                i = this._pageLabels && this._pageLabels[t];
                            r.setPageLabel(i)
                        }
                    }
                }
            }, {
                key: "_resetView",
                value: function() {
                    this._pages = [], this._currentPageNumber = 1, this._currentScale = o.UNKNOWN_SCALE, this._currentScaleValue = null, this._pageLabels = null, this._buffer = new function(e) {
                        var t = [];
                        this.push = function(n) {
                            var r = t.indexOf(n);
                            r >= 0 && t.splice(r, 1), t.push(n), t.length > e && t.shift().destroy()
                        }, this.resize = function(n) {
                            for (e = n; t.length > e;) t.shift().destroy()
                        }
                    }(10), this._location = null, this._pagesRotation = 0, this._pagesRequests = [], this._pageViewsReady = !1, this.viewer.textContent = ""
                }
            }, {
                key: "_scrollUpdate",
                value: function() {
                    0 !== this.pagesCount && this.update()
                }
            }, {
                key: "_scrollIntoView",
                value: function(e) {
                    e.pageDiv, e.pageSpot, e.pageNumber;
                    throw new Error("Not implemented: _scrollIntoView")
                }
            }, {
                key: "_setScaleDispatchEvent",
                value: function(e, t) {
                    var n = {
                        source: this,
                        scale: e,
                        presetValue: arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? t : void 0
                    };
                    this.eventBus.dispatch("scalechanging", n), this.eventBus.dispatch("scalechange", n)
                }
            }, {
                key: "_setScaleUpdatePages",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    if (this._currentScaleValue = t.toString(), function(e, t) {
                            return t === e || Math.abs(t - e) < 1e-15
                        }(this._currentScale, e)) r && this._setScaleDispatchEvent(e, t, !0);
                    else {
                        for (var i = 0, o = this._pages.length; i < o; i++) this._pages[i].update(e);
                        if (this._currentScale = e, !n) {
                            var s = this._currentPageNumber,
                                l = void 0;
                            !this._location || a.PDFJS.ignoreCurrentPositionOnZoom || this.isInPresentationMode || this.isChangingPresentationMode || (s = this._location.pageNumber, l = [null, {
                                name: "XYZ"
                            }, this._location.left, this._location.top, null]), this.scrollPageIntoView({
                                pageNumber: s,
                                destArray: l,
                                allowNegativeOffset: !0
                            })
                        }
                        this._setScaleDispatchEvent(e, t, r), this.defaultRenderingQueue && this.update()
                    }
                }
            }, {
                key: "_setScale",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        n = parseFloat(e);
                    if (n > 0) this._setScaleUpdatePages(n, e, t, !1);
                    else {
                        var r = this._pages[this._currentPageNumber - 1];
                        if (!r) return;
                        var i = this.isInPresentationMode || this.removePageBorders ? 0 : o.SCROLLBAR_PADDING,
                            a = this.isInPresentationMode || this.removePageBorders ? 0 : o.VERTICAL_PADDING,
                            s = (this.container.clientWidth - i) / r.width * r.scale,
                            l = (this.container.clientHeight - a) / r.height * r.scale;
                        switch (e) {
                            case "page-actual":
                                n = 1;
                                break;
                            case "page-width":
                                n = s;
                                break;
                            case "page-height":
                                n = l;
                                break;
                            case "page-fit":
                                n = Math.min(s, l);
                                break;
                            case "auto":
                                var u = r.width > r.height ? Math.min(l, s) : s;
                                n = Math.min(o.MAX_AUTO_SCALE, u);
                                break;
                            default:
                                return void console.error(this._name + '._setScale: "' + e + '" is an unknown zoom value.')
                        }
                        this._setScaleUpdatePages(n, e, t, !0)
                    }
                }
            }, {
                key: "_resetCurrentPageView",
                value: function() {
                    this.isInPresentationMode && this._setScale(this._currentScaleValue, !0);
                    var e = this._pages[this._currentPageNumber - 1];
                    this._scrollIntoView({
                        pageDiv: e.div
                    })
                }
            }, {
                key: "scrollPageIntoView",
                value: function(e) {
                    if (arguments.length > 1 || "number" == typeof e) console.error("Call of scrollPageIntoView() with obsolete signature.");
                    else if (this.pdfDocument) {
                        var t = e.pageNumber || 0,
                            n = e.destArray || null,
                            r = e.allowNegativeOffset || !1;
                        if (!this.isInPresentationMode && n) {
                            var i = this._pages[t - 1];
                            if (i) {
                                var a = 0,
                                    s = 0,
                                    l = 0,
                                    u = 0,
                                    c = void 0,
                                    h = void 0,
                                    d = i.rotation % 180 != 0,
                                    f = (d ? i.height : i.width) / i.scale / o.CSS_UNITS,
                                    p = (d ? i.width : i.height) / i.scale / o.CSS_UNITS,
                                    v = 0;
                                switch (n[1].name) {
                                    case "XYZ":
                                        a = n[2], s = n[3], v = n[4], a = null !== a ? a : 0, s = null !== s ? s : p;
                                        break;
                                    case "Fit":
                                    case "FitB":
                                        v = "page-fit";
                                        break;
                                    case "FitH":
                                    case "FitBH":
                                        v = "page-width", null === (s = n[2]) && this._location && (a = this._location.left, s = this._location.top);
                                        break;
                                    case "FitV":
                                    case "FitBV":
                                        a = n[2], l = f, u = p, v = "page-height";
                                        break;
                                    case "FitR":
                                        a = n[2], s = n[3], l = n[4] - a, u = n[5] - s;
                                        var g = this.removePageBorders ? 0 : o.SCROLLBAR_PADDING,
                                            m = this.removePageBorders ? 0 : o.VERTICAL_PADDING;
                                        c = (this.container.clientWidth - g) / l / o.CSS_UNITS, h = (this.container.clientHeight - m) / u / o.CSS_UNITS, v = Math.min(Math.abs(c), Math.abs(h));
                                        break;
                                    default:
                                        return void console.error(this._name + '.scrollPageIntoView: "' + n[1].name + '" is not a valid destination type.')
                                }
                                if (v && v !== this._currentScale ? this.currentScaleValue = v : this._currentScale === o.UNKNOWN_SCALE && (this.currentScaleValue = o.DEFAULT_SCALE_VALUE), "page-fit" !== v || n[4]) {
                                    var b = [i.viewport.convertToViewportPoint(a, s), i.viewport.convertToViewportPoint(a + l, s + u)],
                                        y = Math.min(b[0][0], b[1][0]),
                                        _ = Math.min(b[0][1], b[1][1]);
                                    r || (y = Math.max(y, 0), _ = Math.max(_, 0)), this._scrollIntoView({
                                        pageDiv: i.div,
                                        pageSpot: {
                                            left: y,
                                            top: _
                                        },
                                        pageNumber: t
                                    })
                                } else this._scrollIntoView({
                                    pageDiv: i.div,
                                    pageNumber: t
                                })
                            } else console.error(this._name + '.scrollPageIntoView: Invalid "pageNumber" parameter.')
                        } else this._setCurrentPageNumber(t, !0)
                    }
                }
            }, {
                key: "_resizeBuffer",
                value: function(e) {
                    var t = Math.max(10, 2 * e + 1);
                    this._buffer.resize(t)
                }
            }, {
                key: "_updateLocation",
                value: function(e) {
                    var t = this._currentScale,
                        n = this._currentScaleValue,
                        r = parseFloat(n) === t ? Math.round(1e4 * t) / 100 : n,
                        i = e.id,
                        a = "#page=" + i;
                    a += "&zoom=" + r;
                    var o = this._pages[i - 1],
                        s = this.container,
                        l = o.getPagePoint(s.scrollLeft - e.x, s.scrollTop - e.y),
                        u = Math.round(l[0]),
                        c = Math.round(l[1]);
                    a += "," + u + "," + c, this._location = {
                        pageNumber: i,
                        scale: r,
                        top: c,
                        left: u,
                        rotation: this._pagesRotation,
                        pdfOpenParams: a
                    }
                }
            }, {
                key: "update",
                value: function() {
                    throw new Error("Not implemented: update")
                }
            }, {
                key: "containsElement",
                value: function(e) {
                    return this.container.contains(e)
                }
            }, {
                key: "focus",
                value: function() {
                    this.container.focus()
                }
            }, {
                key: "_getVisiblePages",
                value: function() {
                    throw new Error("Not implemented: _getVisiblePages")
                }
            }, {
                key: "cleanup",
                value: function() {
                    for (var e = 0, t = this._pages.length; e < t; e++) this._pages[e] && this._pages[e].renderingState !== s.RenderingStates.FINISHED && this._pages[e].reset()
                }
            }, {
                key: "_cancelRendering",
                value: function() {
                    for (var e = 0, t = this._pages.length; e < t; e++) this._pages[e] && this._pages[e].cancelRendering()
                }
            }, {
                key: "_ensurePdfPageLoaded",
                value: function(e) {
                    var t = this;
                    if (e.pdfPage) return Promise.resolve(e.pdfPage);
                    var n = e.id;
                    if (this._pagesRequests[n]) return this._pagesRequests[n];
                    var r = this.pdfDocument.getPage(n).then(function(r) {
                        return e.pdfPage || e.setPdfPage(r), t._pagesRequests[n] = null, r
                    }).catch(function(e) {
                        console.error("Unable to get page for page view", e), t._pagesRequests[n] = null
                    });
                    return this._pagesRequests[n] = r, r
                }
            }, {
                key: "forceRendering",
                value: function(e) {
                    var t = this,
                        n = e || this._getVisiblePages(),
                        r = this.renderingQueue.getHighestPriority(n, this._pages, this.scroll.down);
                    return !!r && (this._ensurePdfPageLoaded(r).then(function() {
                        t.renderingQueue.renderView(r)
                    }), !0)
                }
            }, {
                key: "getPageTextContent",
                value: function(e) {
                    return this.pdfDocument.getPage(e + 1).then(function(e) {
                        return e.getTextContent({
                            normalizeWhitespace: !0
                        })
                    })
                }
            }, {
                key: "createTextLayerBuilder",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    return new d.TextLayerBuilder({
                        textLayerDiv: e,
                        eventBus: this.eventBus,
                        pageIndex: t,
                        viewport: n,
                        findController: this.isInPresentationMode ? null : this.findController,
                        enhanceTextSelection: !this.isInPresentationMode && r
                    })
                }
            }, {
                key: "createAnnotationLayerBuilder",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : o.NullL10n;
                    return new l.AnnotationLayerBuilder({
                        pageDiv: e,
                        pdfPage: t,
                        renderInteractiveForms: n,
                        linkService: this.linkService,
                        downloadManager: this.downloadManager,
                        l10n: r
                    })
                }
            }, {
                key: "setFindController",
                value: function(e) {
                    this.findController = e
                }
            }, {
                key: "getPagesOverview",
                value: function() {
                    var e = this._pages.map(function(e) {
                        var t = e.pdfPage.getViewport(1);
                        return {
                            width: t.width,
                            height: t.height,
                            rotation: t.rotation
                        }
                    });
                    if (!this.enablePrintAutoRotate) return e;
                    var t = r(e[0]);
                    return e.map(function(e) {
                        return t === r(e) ? e : {
                            width: e.height,
                            height: e.width,
                            rotation: (e.rotation + 90) % 360
                        }
                    })
                }
            }, {
                key: "pagesCount",
                get: function() {
                    return this._pages.length
                }
            }, {
                key: "pageViewsReady",
                get: function() {
                    return this._pageViewsReady
                }
            }, {
                key: "currentPageNumber",
                get: function() {
                    return this._currentPageNumber
                },
                set: function(e) {
                    if (!Number.isInteger(e)) throw new Error("Invalid page number.");
                    this.pdfDocument && this._setCurrentPageNumber(e, !0)
                }
            }, {
                key: "currentPageLabel",
                get: function() {
                    return this._pageLabels && this._pageLabels[this._currentPageNumber - 1]
                },
                set: function(e) {
                    var t = 0 | e;
                    if (this._pageLabels) {
                        var n = this._pageLabels.indexOf(e);
                        n >= 0 && (t = n + 1)
                    }
                    this.currentPageNumber = t
                }
            }, {
                key: "currentScale",
                get: function() {
                    return this._currentScale !== o.UNKNOWN_SCALE ? this._currentScale : o.DEFAULT_SCALE
                },
                set: function(e) {
                    if (isNaN(e)) throw new Error("Invalid numeric scale");
                    this.pdfDocument && this._setScale(e, !1)
                }
            }, {
                key: "currentScaleValue",
                get: function() {
                    return this._currentScaleValue
                },
                set: function(e) {
                    this.pdfDocument && this._setScale(e, !1)
                }
            }, {
                key: "pagesRotation",
                get: function() {
                    return this._pagesRotation
                },
                set: function(e) {
                    if (!(0, o.isValidRotation)(e)) throw new Error("Invalid pages rotation angle.");
                    if (this.pdfDocument && this._pagesRotation !== e) {
                        this._pagesRotation = e;
                        for (var t = this._currentPageNumber, n = 0, r = this._pages.length; n < r; n++) {
                            var i = this._pages[n];
                            i.update(i.scale, e)
                        }
                        this._currentScaleValue && this._setScale(this._currentScaleValue, !0), this.eventBus.dispatch("rotationchanging", {
                            source: this,
                            pagesRotation: e,
                            pageNumber: t
                        }), this.defaultRenderingQueue && this.update()
                    }
                }
            }, {
                key: "_setDocumentViewerElement",
                get: function() {
                    throw new Error("Not implemented: _setDocumentViewerElement")
                }
            }, {
                key: "isInPresentationMode",
                get: function() {
                    return this.presentationModeState === o.PresentationModeState.FULLSCREEN
                }
            }, {
                key: "isChangingPresentationMode",
                get: function() {
                    return this.presentationModeState === o.PresentationModeState.CHANGING
                }
            }, {
                key: "isHorizontalScrollbarEnabled",
                get: function() {
                    return !this.isInPresentationMode && this.container.scrollWidth > this.container.clientWidth
                }
            }, {
                key: "hasEqualPageSizes",
                get: function() {
                    for (var e = this._pages[0], t = 1, n = this._pages.length; t < n; ++t) {
                        var r = this._pages[t];
                        if (r.width !== e.width || r.height !== e.height) return !1
                    }
                    return !0
                }
            }]), e
        }();
    t.BaseViewer = f
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.DefaultAnnotationLayerFactory = t.AnnotationLayerBuilder = void 0;
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(1),
        o = n(0),
        s = n(5),
        l = function() {
            function e(t) {
                var n = t.pageDiv,
                    i = t.pdfPage,
                    a = t.linkService,
                    s = t.downloadManager,
                    l = t.renderInteractiveForms,
                    u = void 0 !== l && l,
                    c = t.l10n,
                    h = void 0 === c ? o.NullL10n : c;
                r(this, e), this.pageDiv = n, this.pdfPage = i, this.linkService = a, this.downloadManager = s, this.renderInteractiveForms = u, this.l10n = h, this.div = null, this._cancelled = !1
            }
            return i(e, [{
                key: "render",
                value: function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "display";
                    this.pdfPage.getAnnotations({
                        intent: n
                    }).then(function(n) {
                        if (!t._cancelled) {
                            var r = {
                                viewport: e.clone({
                                    dontFlip: !0
                                }),
                                div: t.div,
                                annotations: n,
                                page: t.pdfPage,
                                renderInteractiveForms: t.renderInteractiveForms,
                                linkService: t.linkService,
                                downloadManager: t.downloadManager
                            };
                            if (t.div) a.AnnotationLayer.update(r);
                            else {
                                if (0 === n.length) return;
                                t.div = document.createElement("div"), t.div.className = "annotationLayer", t.pageDiv.appendChild(t.div), r.div = t.div, a.AnnotationLayer.render(r), t.l10n.translate(t.div)
                            }
                        }
                    })
                }
            }, {
                key: "cancel",
                value: function() {
                    this._cancelled = !0
                }
            }, {
                key: "hide",
                value: function() {
                    this.div && this.div.setAttribute("hidden", "true")
                }
            }]), e
        }(),
        u = function() {
            function e() {
                r(this, e)
            }
            return i(e, [{
                key: "createAnnotationLayerBuilder",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : o.NullL10n;
                    return new l({
                        pageDiv: e,
                        pdfPage: t,
                        renderInteractiveForms: n,
                        linkService: new s.SimpleLinkService,
                        l10n: r
                    })
                }
            }]), e
        }();
    t.AnnotationLayerBuilder = l, t.DefaultAnnotationLayerFactory = u
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFPageView = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = n(1),
        o = n(2),
        s = n(3),
        l = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = t.container,
                    r = t.defaultViewport;
                this.id = t.id, this.renderingId = "page" + this.id, this.pdfPage = null, this.pageLabel = null, this.rotation = 0, this.scale = t.scale || i.DEFAULT_SCALE, this.viewport = r, this.pdfPageRotate = r.rotation, this.hasRestrictedScaling = !1, this.enhanceTextSelection = t.enhanceTextSelection || !1, this.renderInteractiveForms = t.renderInteractiveForms || !1, this.eventBus = t.eventBus || (0, o.getGlobalEventBus)(), this.renderingQueue = t.renderingQueue, this.textLayerFactory = t.textLayerFactory, this.annotationLayerFactory = t.annotationLayerFactory, this.renderer = t.renderer || i.RendererType.CANVAS, this.l10n = t.l10n || i.NullL10n, this.paintTask = null, this.paintedViewportMap = new WeakMap, this.renderingState = s.RenderingStates.INITIAL, this.resume = null, this.error = null, this.onBeforeDraw = null, this.onAfterDraw = null, this.annotationLayer = null, this.textLayer = null, this.zoomLayer = null;
                var a = document.createElement("div");
                a.className = "page", a.style.width = Math.floor(this.viewport.width) + "px", a.style.height = Math.floor(this.viewport.height) + "px", a.setAttribute("data-page-number", this.id), this.div = a, n.appendChild(a)
            }
            return r(e, [{
                key: "setPdfPage",
                value: function(e) {
                    this.pdfPage = e, this.pdfPageRotate = e.rotate;
                    var t = (this.rotation + this.pdfPageRotate) % 360;
                    this.viewport = e.getViewport(this.scale * i.CSS_UNITS, t), this.stats = e.stats, this.reset()
                }
            }, {
                key: "destroy",
                value: function() {
                    this.reset(), this.pdfPage && this.pdfPage.cleanup()
                }
            }, {
                key: "_resetZoomLayer",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this.zoomLayer) {
                        var t = this.zoomLayer.firstChild;
                        this.paintedViewportMap.delete(t), t.width = 0, t.height = 0, e && this.zoomLayer.remove(), this.zoomLayer = null
                    }
                }
            }, {
                key: "reset",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.cancelRendering(t);
                    var n = this.div;
                    n.style.width = Math.floor(this.viewport.width) + "px", n.style.height = Math.floor(this.viewport.height) + "px";
                    for (var r = n.childNodes, i = e && this.zoomLayer || null, a = t && this.annotationLayer && this.annotationLayer.div || null, o = r.length - 1; o >= 0; o--) {
                        var s = r[o];
                        i !== s && a !== s && n.removeChild(s)
                    }
                    n.removeAttribute("data-loaded"), a ? this.annotationLayer.hide() : this.annotationLayer && (this.annotationLayer.cancel(), this.annotationLayer = null), i || (this.canvas && (this.paintedViewportMap.delete(this.canvas), this.canvas.width = 0, this.canvas.height = 0, delete this.canvas), this._resetZoomLayer()), this.svg && (this.paintedViewportMap.delete(this.svg), delete this.svg), this.loadingIconDiv = document.createElement("div"), this.loadingIconDiv.className = "loadingIcon", n.appendChild(this.loadingIconDiv)
                }
            }, {
                key: "update",
                value: function(e, t) {
                    this.scale = e || this.scale, void 0 !== t && (this.rotation = t);
                    var n = (this.rotation + this.pdfPageRotate) % 360;
                    if (this.viewport = this.viewport.clone({
                            scale: this.scale * i.CSS_UNITS,
                            rotation: n
                        }), this.svg) return this.cssTransform(this.svg, !0), void this.eventBus.dispatch("pagerendered", {
                        source: this,
                        pageNumber: this.id,
                        cssTransform: !0
                    });
                    var r = !1;
                    if (this.canvas && a.PDFJS.maxCanvasPixels > 0) {
                        var o = this.outputScale;
                        (Math.floor(this.viewport.width) * o.sx | 0) * (Math.floor(this.viewport.height) * o.sy | 0) > a.PDFJS.maxCanvasPixels && (r = !0)
                    }
                    if (this.canvas) {
                        if (a.PDFJS.useOnlyCssZoom || this.hasRestrictedScaling && r) return this.cssTransform(this.canvas, !0), void this.eventBus.dispatch("pagerendered", {
                            source: this,
                            pageNumber: this.id,
                            cssTransform: !0
                        });
                        this.zoomLayer || this.canvas.hasAttribute("hidden") || (this.zoomLayer = this.canvas.parentNode, this.zoomLayer.style.position = "absolute")
                    }
                    this.zoomLayer && this.cssTransform(this.zoomLayer.firstChild), this.reset(!0, !0)
                }
            }, {
                key: "cancelRendering",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.paintTask && (this.paintTask.cancel(), this.paintTask = null), this.renderingState = s.RenderingStates.INITIAL, this.resume = null, this.textLayer && (this.textLayer.cancel(), this.textLayer = null), !e && this.annotationLayer && (this.annotationLayer.cancel(), this.annotationLayer = null)
                }
            }, {
                key: "cssTransform",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        n = this.viewport.width,
                        r = this.viewport.height,
                        i = this.div;
                    e.style.width = e.parentNode.style.width = i.style.width = Math.floor(n) + "px", e.style.height = e.parentNode.style.height = i.style.height = Math.floor(r) + "px";
                    var o = this.viewport.rotation - this.paintedViewportMap.get(e).rotation,
                        s = Math.abs(o),
                        l = 1,
                        u = 1;
                    90 !== s && 270 !== s || (l = r / n, u = n / r);
                    var c = "rotate(" + o + "deg) scale(" + l + "," + u + ")";
                    if (a.CustomStyle.setProp("transform", e, c), this.textLayer) {
                        var h = this.textLayer.viewport,
                            d = this.viewport.rotation - h.rotation,
                            f = Math.abs(d),
                            p = n / h.width;
                        90 !== f && 270 !== f || (p = n / h.height);
                        var v = this.textLayer.textLayerDiv,
                            g = void 0,
                            m = void 0;
                        switch (f) {
                            case 0:
                                g = m = 0;
                                break;
                            case 90:
                                g = 0, m = "-" + v.style.height;
                                break;
                            case 180:
                                g = "-" + v.style.width, m = "-" + v.style.height;
                                break;
                            case 270:
                                g = "-" + v.style.width, m = 0;
                                break;
                            default:
                                console.error("Bad rotation value.")
                        }
                        a.CustomStyle.setProp("transform", v, "rotate(" + f + "deg) scale(" + p + ", " + p + ") translate(" + g + ", " + m + ")"), a.CustomStyle.setProp("transformOrigin", v, "0% 0%")
                    }
                    t && this.annotationLayer && this.annotationLayer.render(this.viewport, "display")
                }
            }, {
                key: "getPagePoint",
                value: function(e, t) {
                    return this.viewport.convertToPdfPoint(e, t)
                }
            }, {
                key: "draw",
                value: function() {
                    var e = this;
                    if (this.renderingState !== s.RenderingStates.INITIAL && (console.error("Must be in new state before drawing"), this.reset()), !this.pdfPage) return this.renderingState = s.RenderingStates.FINISHED, Promise.reject(new Error("Page is not loaded"));
                    this.renderingState = s.RenderingStates.RUNNING;
                    var t = this.pdfPage,
                        n = this.div,
                        r = document.createElement("div");
                    r.style.width = n.style.width, r.style.height = n.style.height, r.classList.add("canvasWrapper"), this.annotationLayer && this.annotationLayer.div ? n.insertBefore(r, this.annotationLayer.div) : n.appendChild(r);
                    var o = null;
                    if (this.textLayerFactory) {
                        var l = document.createElement("div");
                        l.className = "textLayer", l.style.width = r.style.width, l.style.height = r.style.height, this.annotationLayer && this.annotationLayer.div ? n.insertBefore(l, this.annotationLayer.div) : n.appendChild(l), o = this.textLayerFactory.createTextLayerBuilder(l, this.id - 1, this.viewport, this.enhanceTextSelection)
                    }
                    this.textLayer = o;
                    var u = null;
                    this.renderingQueue && (u = function(t) {
                        if (!e.renderingQueue.isHighestPriority(e)) return e.renderingState = s.RenderingStates.PAUSED, void(e.resume = function() {
                            e.renderingState = s.RenderingStates.RUNNING, t()
                        });
                        t()
                    });
                    var c = function(r) {
                            return h === e.paintTask && (e.paintTask = null), "cancelled" === r || r instanceof a.RenderingCancelledException ? (e.error = null, Promise.resolve(void 0)) : (e.renderingState = s.RenderingStates.FINISHED, e.loadingIconDiv && (n.removeChild(e.loadingIconDiv), delete e.loadingIconDiv), e._resetZoomLayer(!0), e.error = r, e.stats = t.stats, e.onAfterDraw && e.onAfterDraw(), e.eventBus.dispatch("pagerendered", {
                                source: e,
                                pageNumber: e.id,
                                cssTransform: !1
                            }), r ? Promise.reject(r) : Promise.resolve(void 0))
                        },
                        h = this.renderer === i.RendererType.SVG ? this.paintOnSvg(r) : this.paintOnCanvas(r);
                    h.onRenderContinue = u, this.paintTask = h;
                    var d = h.promise.then(function() {
                        return c(null).then(function() {
                            if (o) {
                                var e = t.streamTextContent({
                                    normalizeWhitespace: !0
                                });
                                o.setTextContentStream(e), o.render()
                            }
                        })
                    }, function(e) {
                        return c(e)
                    });
                    return this.annotationLayerFactory && (this.annotationLayer || (this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(n, t, this.renderInteractiveForms, this.l10n)), this.annotationLayer.render(this.viewport, "display")), n.setAttribute("data-loaded", !0), this.onBeforeDraw && this.onBeforeDraw(), d
                }
            }, {
                key: "paintOnCanvas",
                value: function(e) {
                    var t = (0, a.createPromiseCapability)(),
                        n = {
                            promise: t.promise,
                            onRenderContinue: function(e) {
                                e()
                            },
                            cancel: function() {
                                m.cancel()
                            }
                        },
                        r = this.viewport,
                        o = document.createElement("canvas");
                    o.id = this.renderingId, o.setAttribute("hidden", "hidden");
                    var s = !0,
                        l = function() {
                            s && (o.removeAttribute("hidden"), s = !1)
                        };
                    e.appendChild(o), this.canvas = o, o.mozOpaque = !0;
                    var u = o.getContext("2d", {
                            alpha: !1
                        }),
                        c = (0, i.getOutputScale)(u);
                    if (this.outputScale = c, a.PDFJS.useOnlyCssZoom) {
                        var h = r.clone({
                            scale: i.CSS_UNITS
                        });
                        c.sx *= h.width / r.width, c.sy *= h.height / r.height, c.scaled = !0
                    }
                    if (a.PDFJS.maxCanvasPixels > 0) {
                        var d = r.width * r.height,
                            f = Math.sqrt(a.PDFJS.maxCanvasPixels / d);
                        c.sx > f || c.sy > f ? (c.sx = f, c.sy = f, c.scaled = !0, this.hasRestrictedScaling = !0) : this.hasRestrictedScaling = !1
                    }
                    var p = (0, i.approximateFraction)(c.sx),
                        v = (0, i.approximateFraction)(c.sy);
                    o.width = (0, i.roundToDivide)(r.width * c.sx, p[0]), o.height = (0, i.roundToDivide)(r.height * c.sy, v[0]), o.style.width = (0, i.roundToDivide)(r.width, p[1]) + "px", o.style.height = (0, i.roundToDivide)(r.height, v[1]) + "px", this.paintedViewportMap.set(o, r);
                    var g = {
                            canvasContext: u,
                            transform: c.scaled ? [c.sx, 0, 0, c.sy, 0, 0] : null,
                            viewport: this.viewport,
                            renderInteractiveForms: this.renderInteractiveForms
                        },
                        m = this.pdfPage.render(g);
                    return m.onContinue = function(e) {
                        l(), n.onRenderContinue ? n.onRenderContinue(e) : e()
                    }, m.promise.then(function() {
                        l(), t.resolve(void 0)
                    }, function(e) {
                        l(), t.reject(e)
                    }), n
                }
            }, {
                key: "paintOnSvg",
                value: function(e) {
                    var t = this,
                        n = !1,
                        r = function() {
                            if (n) throw a.PDFJS.pdfjsNext ? new a.RenderingCancelledException("Rendering cancelled, page " + t.id, "svg") : "cancelled"
                        },
                        o = this.pdfPage,
                        l = this.viewport.clone({
                            scale: i.CSS_UNITS
                        });
                    return {
                        promise: o.getOperatorList().then(function(n) {
                            r();
                            return new a.SVGGraphics(o.commonObjs, o.objs).getSVG(n, l).then(function(n) {
                                r(), t.svg = n, t.paintedViewportMap.set(n, l), n.style.width = e.style.width, n.style.height = e.style.height, t.renderingState = s.RenderingStates.FINISHED, e.appendChild(n)
                            })
                        }),
                        onRenderContinue: function(e) {
                            e()
                        },
                        cancel: function() {
                            n = !0
                        }
                    }
                }
            }, {
                key: "setPageLabel",
                value: function(e) {
                    this.pageLabel = "string" == typeof e ? e : null, null !== this.pageLabel ? this.div.setAttribute("data-page-label", this.pageLabel) : this.div.removeAttribute("data-page-label")
                }
            }, {
                key: "width",
                get: function() {
                    return this.viewport.width
                }
            }, {
                key: "height",
                get: function() {
                    return this.viewport.height
                }
            }]), e
        }();
    t.PDFPageView = l
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.DefaultTextLayerFactory = t.TextLayerBuilder = void 0;
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(2),
        o = n(1),
        s = function() {
            function e(t) {
                var n = t.textLayerDiv,
                    i = t.eventBus,
                    o = t.pageIndex,
                    s = t.viewport,
                    l = t.findController,
                    u = void 0 === l ? null : l,
                    c = t.enhanceTextSelection,
                    h = void 0 !== c && c;
                r(this, e), this.textLayerDiv = n, this.eventBus = i || (0, a.getGlobalEventBus)(), this.textContent = null, this.textContentItemsStr = [], this.textContentStream = null, this.renderingDone = !1, this.pageIdx = o, this.pageNumber = this.pageIdx + 1, this.matches = [], this.viewport = s, this.textDivs = [], this.findController = u, this.textLayerRenderTask = null, this.enhanceTextSelection = h, this._bindMouse()
            }
            return i(e, [{
                key: "_finishRendering",
                value: function() {
                    if (this.renderingDone = !0, !this.enhanceTextSelection) {
                        var e = document.createElement("div");
                        e.className = "endOfContent", this.textLayerDiv.appendChild(e)
                    }
                    this.eventBus.dispatch("textlayerrendered", {
                        source: this,
                        pageNumber: this.pageNumber,
                        numTextDivs: this.textDivs.length
                    })
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    if ((this.textContent || this.textContentStream) && !this.renderingDone) {
                        this.cancel(), this.textDivs = [];
                        var n = document.createDocumentFragment();
                        this.textLayerRenderTask = (0, o.renderTextLayer)({
                            textContent: this.textContent,
                            textContentStream: this.textContentStream,
                            container: n,
                            viewport: this.viewport,
                            textDivs: this.textDivs,
                            textContentItemsStr: this.textContentItemsStr,
                            timeout: t,
                            enhanceTextSelection: this.enhanceTextSelection
                        }), this.textLayerRenderTask.promise.then(function() {
                            e.textLayerDiv.appendChild(n), e._finishRendering(), e.updateMatches()
                        }, function(e) {})
                    }
                }
            }, {
                key: "cancel",
                value: function() {
                    this.textLayerRenderTask && (this.textLayerRenderTask.cancel(), this.textLayerRenderTask = null)
                }
            }, {
                key: "setTextContentStream",
                value: function(e) {
                    this.cancel(), this.textContentStream = e
                }
            }, {
                key: "setTextContent",
                value: function(e) {
                    this.cancel(), this.textContent = e
                }
            }, {
                key: "convertMatches",
                value: function(e, t) {
                    var n = 0,
                        r = 0,
                        i = this.textContentItemsStr,
                        a = i.length - 1,
                        o = null === this.findController ? 0 : this.findController.state.query.length,
                        s = [];
                    if (!e) return s;
                    for (var l = 0, u = e.length; l < u; l++) {
                        for (var c = e[l]; n !== a && c >= r + i[n].length;) r += i[n].length, n++;
                        n === i.length && console.error("Could not find a matching mapping");
                        var h = {
                            begin: {
                                divIdx: n,
                                offset: c - r
                            }
                        };
                        for (c += t ? t[l] : o; n !== a && c > r + i[n].length;) r += i[n].length, n++;
                        h.end = {
                            divIdx: n,
                            offset: c - r
                        }, s.push(h)
                    }
                    return s
                }
            }, {
                key: "renderMatches",
                value: function(e) {
                    function t(e, t) {
                        var r = e.divIdx;
                        i[r].textContent = "", n(r, 0, e.offset, t)
                    }

                    function n(e, t, n, a) {
                        var o = i[e],
                            s = r[e].substring(t, n),
                            l = document.createTextNode(s);
                        if (a) {
                            var u = document.createElement("span");
                            return u.className = a, u.appendChild(l), void o.appendChild(u)
                        }
                        o.appendChild(l)
                    }
                    if (0 !== e.length) {
                        var r = this.textContentItemsStr,
                            i = this.textDivs,
                            a = null,
                            o = this.pageIdx,
                            s = null !== this.findController && o === this.findController.selected.pageIdx,
                            l = null === this.findController ? -1 : this.findController.selected.matchIdx,
                            u = {
                                divIdx: -1,
                                offset: void 0
                            },
                            c = l,
                            h = c + 1;
                        if (null !== this.findController && this.findController.state.highlightAll) c = 0, h = e.length;
                        else if (!s) return;
                        for (var d = c; d < h; d++) {
                            var f = e[d],
                                p = f.begin,
                                v = f.end,
                                g = s && d === l ? " selected" : "";
                            if (this.findController && this.findController.updateMatchPosition(o, d, i, p.divIdx), a && p.divIdx === a.divIdx ? n(a.divIdx, a.offset, p.offset) : (null !== a && n(a.divIdx, a.offset, u.offset), t(p)), p.divIdx === v.divIdx) n(p.divIdx, p.offset, v.offset, "highlight" + g);
                            else {
                                n(p.divIdx, p.offset, u.offset, "highlight begin" + g);
                                for (var m = p.divIdx + 1, b = v.divIdx; m < b; m++) i[m].className = "highlight middle" + g;
                                t(v, "highlight end" + g)
                            }
                            a = v
                        }
                        a && n(a.divIdx, a.offset, u.offset)
                    }
                }
            }, {
                key: "updateMatches",
                value: function() {
                    if (this.renderingDone) {
                        for (var e = this.matches, t = this.textDivs, n = this.textContentItemsStr, r = -1, i = 0, a = e.length; i < a; i++) {
                            for (var o = e[i], s = Math.max(r, o.begin.divIdx), l = o.end.divIdx; s <= l; s++) {
                                var u = t[s];
                                u.textContent = n[s], u.className = ""
                            }
                            r = o.end.divIdx + 1
                        }
                        if (null !== this.findController && this.findController.active) {
                            var c = void 0,
                                h = void 0;
                            null !== this.findController && (c = this.findController.pageMatches[this.pageIdx] || null, h = this.findController.pageMatchesLength ? this.findController.pageMatchesLength[this.pageIdx] || null : null), this.matches = this.convertMatches(c, h), this.renderMatches(this.matches)
                        }
                    }
                }
            }, {
                key: "_bindMouse",
                value: function() {
                    var e = this,
                        t = this.textLayerDiv,
                        n = null;
                    t.addEventListener("mousedown", function(r) {
                        if (e.enhanceTextSelection && e.textLayerRenderTask) return e.textLayerRenderTask.expandTextDivs(!0), void(n && (clearTimeout(n), n = null));
                        var i = t.querySelector(".endOfContent");
                        if (i) {
                            var a = r.target !== t;
                            if (a = a && "none" !== window.getComputedStyle(i).getPropertyValue("-moz-user-select")) {
                                var o = t.getBoundingClientRect(),
                                    s = Math.max(0, (r.pageY - o.top) / o.height);
                                i.style.top = (100 * s).toFixed(2) + "%"
                            }
                            i.classList.add("active")
                        }
                    }), t.addEventListener("mouseup", function() {
                        if (e.enhanceTextSelection && e.textLayerRenderTask) n = setTimeout(function() {
                            e.textLayerRenderTask && e.textLayerRenderTask.expandTextDivs(!1), n = null
                        }, 300);
                        else {
                            var r = t.querySelector(".endOfContent");
                            r && (r.style.top = "", r.classList.remove("active"))
                        }
                    })
                }
            }]), e
        }(),
        l = function() {
            function e() {
                r(this, e)
            }
            return i(e, [{
                key: "createTextLayerBuilder",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    return new s({
                        textLayerDiv: e,
                        pageIndex: t,
                        viewport: n,
                        enhanceTextSelection: r
                    })
                }
            }]), e
        }();
    t.TextLayerBuilder = s, t.DefaultTextLayerFactory = l
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SecondaryToolbar = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(6),
        a = n(0),
        o = function() {
            function e(t, n, r) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.toolbar = t.toolbar, this.toggleButton = t.toggleButton, this.toolbarButtonContainer = t.toolbarButtonContainer, this.buttons = [{
                    element: t.presentationModeButton,
                    eventName: "presentationmode",
                    close: !0
                }, {
                    element: t.openFileButton,
                    eventName: "openfile",
                    close: !0
                }, {
                    element: t.printButton,
                    eventName: "print",
                    close: !0
                }, {
                    element: t.downloadButton,
                    eventName: "download",
                    close: !0
                }, {
                    element: t.viewBookmarkButton,
                    eventName: null,
                    close: !0
                }, {
                    element: t.firstPageButton,
                    eventName: "firstpage",
                    close: !0
                }, {
                    element: t.lastPageButton,
                    eventName: "lastpage",
                    close: !0
                }, {
                    element: t.pageRotateCwButton,
                    eventName: "rotatecw",
                    close: !1
                }, {
                    element: t.pageRotateCcwButton,
                    eventName: "rotateccw",
                    close: !1
                }, {
                    element: t.cursorSelectToolButton,
                    eventName: "switchcursortool",
                    eventDetails: {
                        tool: i.CursorTool.SELECT
                    },
                    close: !0
                }, {
                    element: t.cursorHandToolButton,
                    eventName: "switchcursortool",
                    eventDetails: {
                        tool: i.CursorTool.HAND
                    },
                    close: !0
                }, {
                    element: t.documentPropertiesButton,
                    eventName: "documentproperties",
                    close: !0
                }], this.items = {
                    firstPage: t.firstPageButton,
                    lastPage: t.lastPageButton,
                    pageRotateCw: t.pageRotateCwButton,
                    pageRotateCcw: t.pageRotateCcwButton
                }, this.mainContainer = n, this.eventBus = r, this.opened = !1, this.containerHeight = null, this.previousContainerHeight = null, this.reset(), this._bindClickListeners(), this._bindCursorToolsListener(t), this.eventBus.on("resize", this._setMaxHeight.bind(this))
            }
            return r(e, [{
                key: "setPageNumber",
                value: function(e) {
                    this.pageNumber = e, this._updateUIState()
                }
            }, {
                key: "setPagesCount",
                value: function(e) {
                    this.pagesCount = e, this._updateUIState()
                }
            }, {
                key: "reset",
                value: function() {
                    this.pageNumber = 0, this.pagesCount = 0, this._updateUIState()
                }
            }, {
                key: "_updateUIState",
                value: function() {
                    this.items.firstPage.disabled = this.pageNumber <= 1, this.items.lastPage.disabled = this.pageNumber >= this.pagesCount, this.items.pageRotateCw.disabled = 0 === this.pagesCount, this.items.pageRotateCcw.disabled = 0 === this.pagesCount
                }
            }, {
                key: "_bindClickListeners",
                value: function() {
                    var e = this;
                    this.toggleButton.addEventListener("click", this.toggle.bind(this));
                    var t = function(t) {
                        var n = e.buttons[t],
                            r = n.element,
                            i = n.eventName,
                            a = n.close,
                            o = n.eventDetails;
                        r.addEventListener("click", function(t) {
                            if (null !== i) {
                                var n = {
                                    source: e
                                };
                                for (var r in o) n[r] = o[r];
                                e.eventBus.dispatch(i, n)
                            }
                            a && e.close()
                        })
                    };
                    for (var n in this.buttons) t(n)
                }
            }, {
                key: "_bindCursorToolsListener",
                value: function(e) {
                    this.eventBus.on("cursortoolchanged", function(t) {
                        switch (e.cursorSelectToolButton.classList.remove("toggled"), e.cursorHandToolButton.classList.remove("toggled"), t.tool) {
                            case i.CursorTool.SELECT:
                                e.cursorSelectToolButton.classList.add("toggled");
                                break;
                            case i.CursorTool.HAND:
                                e.cursorHandToolButton.classList.add("toggled")
                        }
                    })
                }
            }, {
                key: "open",
                value: function() {
                    this.opened || (this.opened = !0, this._setMaxHeight(), this.toggleButton.classList.add("toggled"), this.toolbar.classList.remove("hidden"))
                }
            }, {
                key: "close",
                value: function() {
                    this.opened && (this.opened = !1, this.toolbar.classList.add("hidden"), this.toggleButton.classList.remove("toggled"))
                }
            }, {
                key: "toggle",
                value: function() {
                    this.opened ? this.close() : this.open()
                }
            }, {
                key: "_setMaxHeight",
                value: function() {
                    this.opened && (this.containerHeight = this.mainContainer.clientHeight, this.containerHeight !== this.previousContainerHeight && (this.toolbarButtonContainer.setAttribute("style", "max-height: " + (this.containerHeight - a.SCROLLBAR_PADDING) + "px;"), this.previousContainerHeight = this.containerHeight))
                }
            }, {
                key: "isOpen",
                get: function() {
                    return this.opened
                }
            }]), e
        }();
    t.SecondaryToolbar = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.Toolbar = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(0),
        a = "visiblePageIsLoading",
        o = function() {
            function e(t, n, r) {
                var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : i.NullL10n;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.toolbar = t.container, this.mainContainer = n, this.eventBus = r, this.l10n = a, this.items = t, this._wasLocalized = !1, this.reset(), this._bindListeners()
            }
            return r(e, [{
                key: "setPageNumber",
                value: function(e, t) {
                    this.pageNumber = e, this.pageLabel = t, this._updateUIState(!1)
                }
            }, {
                key: "setPagesCount",
                value: function(e, t) {
                    this.pagesCount = e, this.hasPageLabels = t, this._updateUIState(!0)
                }
            }, {
                key: "setPageScale",
                value: function(e, t) {
                    this.pageScaleValue = e, this.pageScale = t, this._updateUIState(!1)
                }
            }, {
                key: "reset",
                value: function() {
                    this.pageNumber = 0, this.pageLabel = null, this.hasPageLabels = !1, this.pagesCount = 0, this.pageScaleValue = i.DEFAULT_SCALE_VALUE, this.pageScale = i.DEFAULT_SCALE, this._updateUIState(!0)
                }
            }, {
                key: "_bindListeners",
                value: function() {
                    var e = this,
                        t = this.eventBus,
                        n = this.items,
                        r = this;
                    n.previous.addEventListener("click", function() {
                        t.dispatch("previouspage")
                    }), n.next.addEventListener("click", function() {
                        t.dispatch("nextpage")
                    }), n.zoomIn.addEventListener("click", function() {
                        t.dispatch("zoomin")
                    }), n.zoomOut.addEventListener("click", function() {
                        t.dispatch("zoomout")
                    }), n.pageNumber.addEventListener("click", function() {
                        this.select()
                    }), n.pageNumber.addEventListener("change", function() {
                        t.dispatch("pagenumberchanged", {
                            source: r,
                            value: this.value
                        })
                    }), n.scaleSelect.addEventListener("change", function() {
                        "custom" !== this.value && t.dispatch("scalechanged", {
                            source: r,
                            value: this.value
                        })
                    }), n.presentationModeButton.addEventListener("click", function() {
                        t.dispatch("presentationmode")
                    }), n.openFile.addEventListener("click", function() {
                        t.dispatch("openfile")
                    }), n.print.addEventListener("click", function() {
                        t.dispatch("print")
                    }), n.download.addEventListener("click", function() {
                        t.dispatch("download")
                    }), n.scaleSelect.oncontextmenu = i.noContextMenuHandler, t.on("localized", function() {
                        e._localized()
                    })
                }
            }, {
                key: "_localized",
                value: function() {
                    this._wasLocalized = !0, this._adjustScaleWidth(), this._updateUIState(!0)
                }
            }, {
                key: "_updateUIState",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (this._wasLocalized) {
                        var t = this.pageNumber,
                            n = this.pagesCount,
                            r = this.items,
                            a = (this.pageScaleValue || this.pageScale).toString(),
                            o = this.pageScale;
                        e && (this.hasPageLabels ? r.pageNumber.type = "text" : (r.pageNumber.type = "number", this.l10n.get("of_pages", {
                            pagesCount: n
                        }, "of {{pagesCount}}").then(function(e) {
                            r.numPages.textContent = e
                        })), r.pageNumber.max = n), this.hasPageLabels ? (r.pageNumber.value = this.pageLabel, this.l10n.get("page_of_pages", {
                            pageNumber: t,
                            pagesCount: n
                        }, "({{pageNumber}} of {{pagesCount}})").then(function(e) {
                            r.numPages.textContent = e
                        })) : r.pageNumber.value = t, r.previous.disabled = t <= 1, r.next.disabled = t >= n, r.zoomOut.disabled = o <= i.MIN_SCALE, r.zoomIn.disabled = o >= i.MAX_SCALE;
                        var s = Math.round(1e4 * o) / 100;
                        this.l10n.get("page_scale_percent", {
                            scale: s
                        }, "{{scale}}%").then(function(e) {
                            for (var t = r.scaleSelect.options, n = !1, i = 0, o = t.length; i < o; i++) {
                                var s = t[i];
                                s.value === a ? (s.selected = !0, n = !0) : s.selected = !1
                            }
                            n || (r.customScaleOption.textContent = e, r.customScaleOption.selected = !0)
                        })
                    }
                }
            }, {
                key: "updateLoadingIndicatorState",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = this.items.pageNumber;
                    e ? t.classList.add(a) : t.classList.remove(a)
                }
            }, {
                key: "_adjustScaleWidth",
                value: function() {
                    var e = this.items.scaleSelectContainer,
                        t = this.items.scaleSelect;
                    i.animationStarted.then(function() {
                        if (0 === e.clientWidth && e.setAttribute("style", "display: inherit;"), e.clientWidth > 0) {
                            t.setAttribute("style", "min-width: inherit;");
                            var n = t.clientWidth + 8;
                            t.setAttribute("style", "min-width: " + (n + 22) + "px;"), e.setAttribute("style", "min-width: " + n + "px; max-width: " + n + "px;")
                        }
                    })
                }
            }]), e
        }();
    t.Toolbar = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = 20,
        a = function() {
            function e(t) {
                var n = this,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i;
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.fingerprint = t, this.cacheSize = r, this._initializedPromise = this._readFromStorage().then(function(e) {
                    var t = JSON.parse(e || "{}");
                    "files" in t || (t.files = []), t.files.length >= n.cacheSize && t.files.shift();
                    for (var r = void 0, i = 0, a = t.files.length; i < a; i++) {
                        if (t.files[i].fingerprint === n.fingerprint) {
                            r = i;
                            break
                        }
                    }
                    "number" != typeof r && (r = t.files.push({
                        fingerprint: n.fingerprint
                    }) - 1), n.file = t.files[r], n.database = t
                })
            }
            return r(e, [{
                key: "_writeToStorage",
                value: function() {
                    var e = this;
                    return new Promise(function(t) {
                        var n = JSON.stringify(e.database);
                        localStorage.setItem("pdfjs.history", n), t()
                    })
                }
            }, {
                key: "_readFromStorage",
                value: function() {
                    return new Promise(function(e) {
                        e(localStorage.getItem("pdfjs.history"))
                    })
                }
            }, {
                key: "set",
                value: function(e, t) {
                    var n = this;
                    return this._initializedPromise.then(function() {
                        return n.file[e] = t, n._writeToStorage()
                    })
                }
            }, {
                key: "setMultiple",
                value: function(e) {
                    var t = this;
                    return this._initializedPromise.then(function() {
                        for (var n in e) t.file[n] = e[n];
                        return t._writeToStorage()
                    })
                }
            }, {
                key: "get",
                value: function(e, t) {
                    var n = this;
                    return this._initializedPromise.then(function() {
                        var r = n.file[e];
                        return void 0 !== r ? r : t
                    })
                }
            }, {
                key: "getMultiple",
                value: function(e) {
                    var t = this;
                    return this._initializedPromise.then(function() {
                        var n = Object.create(null);
                        for (var r in e) {
                            var i = t.file[r];
                            n[r] = void 0 !== i ? i : e[r]
                        }
                        return n
                    })
                }
            }]), e
        }();
    t.ViewHistory = a
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.GenericCom = void 0;
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = n(4),
        a = n(30),
        o = n(31),
        s = n(32),
        l = n(1),
        u = function(e) {
            function t() {
                return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t),
                    function(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, a.BasePreferences), r(t, [{
                key: "_writeToStorage",
                value: function(e) {
                    return new Promise(function(t) {
                        localStorage.setItem("pdfjs.preferences", JSON.stringify(e)), t()
                    })
                }
            }, {
                key: "_readFromStorage",
                value: function(e) {
                    return new Promise(function(e) {
                        e(JSON.parse(localStorage.getItem("pdfjs.preferences")))
                    })
                }
            }]), t
        }(),
        c = Object.create(i.DefaultExternalServices);
    c.createDownloadManager = function() {
        return new o.DownloadManager
    }, c.createPreferences = function() {
        return new u
    }, c.createL10n = function() {
        return new s.GenericL10n(l.PDFJS.locale)
    }, i.PDFViewerApplication.externalServices = c, t.GenericCom = {}
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BasePreferences = void 0;
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(0),
        o = null,
        s = function() {
            function e() {
                var t = this;
                if (function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.constructor === e) throw new Error("Cannot initialize BasePreferences.");
                this.prefs = null, this._initializedPromise = (o || (o = Promise.resolve({
                    showPreviousViewOnLoad: !0,
                    defaultZoomValue: "",
                    sidebarViewOnLoad: 0,
                    enableHandToolOnLoad: !1,
                    cursorToolOnLoad: 0,
                    enableWebGL: !1,
                    pdfBugEnabled: !1,
                    disableRange: !1,
                    disableStream: !1,
                    disableAutoFetch: !1,
                    disableFontFace: !1,
                    disableTextLayer: !1,
                    useOnlyCssZoom: !1,
                    externalLinkTarget: 0,
                    enhanceTextSelection: !1,
                    renderer: "canvas",
                    renderInteractiveForms: !1,
                    enablePrintAutoRotate: !1,
                    disablePageMode: !1,
                    disablePageLabels: !1
                })), o).then(function(e) {
                    return Object.defineProperty(t, "defaults", {
                        value: Object.freeze(e),
                        writable: !1,
                        enumerable: !0,
                        configurable: !1
                    }), t.prefs = (0, a.cloneObj)(e), t._readFromStorage(e)
                }).then(function(e) {
                    e && (t.prefs = e)
                })
            }
            return i(e, [{
                key: "_writeToStorage",
                value: function(e) {
                    return Promise.reject(new Error("Not implemented: _writeToStorage"))
                }
            }, {
                key: "_readFromStorage",
                value: function(e) {
                    return Promise.reject(new Error("Not implemented: _readFromStorage"))
                }
            }, {
                key: "reset",
                value: function() {
                    var e = this;
                    return this._initializedPromise.then(function() {
                        return e.prefs = (0, a.cloneObj)(e.defaults), e._writeToStorage(e.defaults)
                    })
                }
            }, {
                key: "reload",
                value: function() {
                    var e = this;
                    return this._initializedPromise.then(function() {
                        return e._readFromStorage(e.defaults)
                    }).then(function(t) {
                        t && (e.prefs = t)
                    })
                }
            }, {
                key: "set",
                value: function(e, t) {
                    var n = this;
                    return this._initializedPromise.then(function() {
                        if (void 0 === n.defaults[e]) throw new Error('Set preference: "' + e + '" is undefined.');
                        if (void 0 === t) throw new Error("Set preference: no value is specified.");
                        var i = void 0 === t ? "undefined" : r(t),
                            a = r(n.defaults[e]);
                        if (i !== a) {
                            if ("number" !== i || "string" !== a) throw new Error('Set preference: "' + t + '" is a ' + i + ", expected a " + a + ".");
                            t = t.toString()
                        } else if ("number" === i && !Number.isInteger(t)) throw new Error('Set preference: "' + t + '" must be an integer.');
                        return n.prefs[e] = t, n._writeToStorage(n.prefs)
                    })
                }
            }, {
                key: "get",
                value: function(e) {
                    var t = this;
                    return this._initializedPromise.then(function() {
                        var n = t.defaults[e];
                        if (void 0 === n) throw new Error('Get preference: "' + e + '" is undefined.');
                        var r = t.prefs[e];
                        return void 0 !== r ? r : n
                    })
                }
            }]), e
        }();
    t.BasePreferences = s
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = document.createElement("a");
        if (n.click) n.href = e, n.target = "_parent", "download" in n && (n.download = t), (document.body || document.documentElement).appendChild(n), n.click(), n.parentNode.removeChild(n);
        else {
            if (window.top === window && e.split("#")[0] === window.location.href.split("#")[0]) {
                var r = -1 === e.indexOf("?") ? "?" : "&";
                e = e.replace(/#|$/, r + "$&")
            }
            window.open(e, "_parent")
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.DownloadManager = void 0;
    var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        a = n(1),
        o = function() {
            function e() {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return i(e, [{
                key: "downloadUrl",
                value: function(e, t) {
                    (0, a.createValidAbsoluteUrl)(e, "http://example.com") && r(e + "#pdfjs.action=download", t)
                }
            }, {
                key: "downloadData",
                value: function(e, t, n) {
                    if (navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([e], {
                        type: n
                    }), t);
                    r((0, a.createObjectURL)(e, n, a.PDFJS.disableCreateObjectURL), t)
                }
            }, {
                key: "download",
                value: function(e, t, n) {
                    if (navigator.msSaveBlob) navigator.msSaveBlob(e, n) || this.downloadUrl(t, n);
                    else if (a.PDFJS.disableCreateObjectURL) this.downloadUrl(t, n);
                    else {
                        r(URL.createObjectURL(e), n)
                    }
                }
            }]), e
        }();
    t.DownloadManager = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.GenericL10n = void 0;
    var r = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    n(33);
    var i = document.webL10n,
        a = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this._lang = t, this._ready = new Promise(function(e, n) {
                    i.setLanguage(t, function() {
                        e(i)
                    })
                })
            }
            return r(e, [{
                key: "getDirection",
                value: function() {
                    return this._ready.then(function(e) {
                        return e.getDirection()
                    })
                }
            }, {
                key: "get",
                value: function(e, t, n) {
                    return this._ready.then(function(r) {
                        return r.get(e, t, n)
                    })
                }
            }, {
                key: "translate",
                value: function(e) {
                    return this._ready.then(function(t) {
                        return t.translate(e)
                    })
                }
            }]), e
        }();
    t.GenericL10n = a
}, function(e, t, n) {
    "use strict";
    document.webL10n = function(e, t, n) {
        function r(e) {
            var n = t.createEvent("Event");
            n.initEvent("localized", !0, !1), n.language = e, t.dispatchEvent(n)
        }

        function i(e, t, n) {
            t = t || function(e) {}, n = n || function() {};
            var r = new XMLHttpRequest;
            r.open("GET", e, v), r.overrideMimeType && r.overrideMimeType("text/plain; charset=utf-8"), r.onreadystatechange = function() {
                4 == r.readyState && (200 == r.status || 0 === r.status ? t(r.responseText) : n())
            }, r.onerror = n, r.ontimeout = n;
            try {
                r.send(null)
            } catch (e) {
                n()
            }
        }

        function a(e, t, n, r) {
            function a(e) {
                return e.lastIndexOf("\\") < 0 ? e : e.replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\{/g, "{").replace(/\\}/g, "}").replace(/\\"/g, '"').replace(/\\'/g, "'")
            }

            function o(e, n) {
                function r(e, n, f) {
                    function p() {
                        for (;;) {
                            if (!v.length) return void f();
                            var e = v.shift();
                            if (!u.test(e)) {
                                if (n) {
                                    if (y = c.exec(e)) {
                                        g = y[1].toLowerCase(), b = "*" !== g && g !== t && g !== m;
                                        continue
                                    }
                                    if (b) continue;
                                    if (y = h.exec(e)) return void
                                    function(e, t) {
                                        i(e, function(e) {
                                            r(e, !1, t)
                                        }, function() {
                                            console.warn(e + " not found."), t()
                                        })
                                    }(s + y[1], p)
                                }
                                var l = e.match(d);
                                l && 3 == l.length && (o[l[1]] = a(l[2]))
                            }
                        }
                    }
                    var v = e.replace(l, "").split(/[\r\n]+/),
                        g = "*",
                        m = t.split("-", 1)[0],
                        b = !1,
                        y = "";
                    p()
                }
                var o = {},
                    l = /^\s*|\s*$/,
                    u = /^\s*#|^\s*$/,
                    c = /^\s*\[(.*)\]\s*$/,
                    h = /^\s*@import\s+url\((.*)\)\s*$/i,
                    d = /^([^=\s]*)\s*=\s*(.+)$/;
                r(e, !0, function() {
                    n(o)
                })
            }
            var s = e.replace(/[^\/]*$/, "") || "./";
            i(e, function(e) {
                c += e, o(e, function(e) {
                    for (var t in e) {
                        var r, i, a = t.lastIndexOf(".");
                        a > 0 ? (r = t.substring(0, a), i = t.substr(a + 1)) : (r = t, i = h), u[r] || (u[r] = {}), u[r][i] = e[t]
                    }
                    n && n()
                })
            }, r)
        }

        function o(e, n) {
            function i(e) {
                var t = e.href;
                this.load = function(e, n) {
                    a(t, e, n, function() {
                        console.warn(t + " not found."), console.warn('"' + e + '" resource not found'), d = "", n()
                    })
                }
            }
            e && (e = e.toLowerCase()), n = n || function() {}, u = {}, c = "", d = "", d = e;
            var o = t.querySelectorAll('link[type="application/l10n"]'),
                s = o.length;
            if (0 === s) {
                var l = function() {
                    var e = t.querySelector('script[type="application/l10n"]');
                    return e ? JSON.parse(e.innerHTML) : null
                }();
                if (l && l.locales && l.default_locale) {
                    if (console.log("using the embedded JSON directory, early way out"), !(u = l.locales[e])) {
                        var h = l.default_locale.toLowerCase();
                        for (var f in l.locales) {
                            if ((f = f.toLowerCase()) === e) {
                                u = l.locales[e];
                                break
                            }
                            f === h && (u = l.locales[h])
                        }
                    }
                    n()
                } else console.log("no resource to load, early way out");
                return r(e), void(p = "complete")
            }
            var v = null,
                g = 0;
            v = function() {
                ++g >= s && (n(), r(e), p = "complete")
            };
            for (var m = 0; m < s; m++) {
                new i(o[m]).load(e, v)
            }
        }

        function s(e, t, n) {
            var r = u[e];
            if (!r) {
                if (console.warn("#" + e + " is undefined."), !n) return null;
                r = n
            }
            var i = {};
            for (var a in r) {
                var o = r[a];
                o = function(e, t, n) {
                    return e.replace(/\{\{\s*(.+?)\s*\}\}/g, function(e, r) {
                        return t && r in t ? t[r] : r in u ? u[r] : (console.log("argument {{" + r + "}} for #" + n + " is undefined."), e)
                    })
                }(o = function(e, t, n, r) {
                    var i = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/.exec(e);
                    if (!i || !i.length) return e;
                    var a, o = i[1],
                        s = i[2];
                    t && s in t ? a = t[s] : s in u && (a = u[s]);
                    if (o in f) {
                        var l = f[o];
                        e = l(e, a, n, r)
                    }
                    return e
                }(o, t, e, a), t, e), i[a] = o
            }
            return i
        }

        function l(e) {
            var n = function(e) {
                if (!e) return {};
                var t = e.getAttribute("data-l10n-id"),
                    n = e.getAttribute("data-l10n-args"),
                    r = {};
                if (n) try {
                    r = JSON.parse(n)
                } catch (e) {
                    console.warn("could not parse arguments for #" + t)
                }
                return {
                    id: t,
                    args: r
                }
            }(e);
            if (n.id) {
                var r = s(n.id, n.args);
                if (r) {
                    if (r[h]) {
                        if (0 === function(e) {
                                if (e.children) return e.children.length;
                                if (void 0 !== e.childElementCount) return e.childElementCount;
                                for (var t = 0, n = 0; n < e.childNodes.length; n++) t += 1 === e.nodeType ? 1 : 0;
                                return t
                            }(e)) e[h] = r[h];
                        else {
                            for (var i = e.childNodes, a = !1, o = 0, l = i.length; o < l; o++) 3 === i[o].nodeType && /\S/.test(i[o].nodeValue) && (a ? i[o].nodeValue = "" : (i[o].nodeValue = r[h], a = !0));
                            if (!a) {
                                var u = t.createTextNode(r[h]);
                                e.insertBefore(u, e.firstChild)
                            }
                        }
                        delete r[h]
                    }
                    for (var c in r) e[c] = r[c]
                } else console.warn("#" + n.id + " is undefined.")
            }
        }
        var u = {},
            c = "",
            h = "textContent",
            d = "",
            f = {},
            p = "loading",
            v = !0;
        return f.plural = function(e, t, n, r) {
            var i = parseFloat(t);
            if (isNaN(i)) return e;
            if (r != h) return e;
            f._pluralRules || (f._pluralRules = function(e) {
                function t(e, t) {
                    return -1 !== t.indexOf(e)
                }

                function n(e, t, n) {
                    return t <= e && e <= n
                }
                var r = {
                        0: function(e) {
                            return "other"
                        },
                        1: function(e) {
                            return n(e % 100, 3, 10) ? "few" : 0 === e ? "zero" : n(e % 100, 11, 99) ? "many" : 2 == e ? "two" : 1 == e ? "one" : "other"
                        },
                        2: function(e) {
                            return 0 !== e && e % 10 == 0 ? "many" : 2 == e ? "two" : 1 == e ? "one" : "other"
                        },
                        3: function(e) {
                            return 1 == e ? "one" : "other"
                        },
                        4: function(e) {
                            return n(e, 0, 1) ? "one" : "other"
                        },
                        5: function(e) {
                            return n(e, 0, 2) && 2 != e ? "one" : "other"
                        },
                        6: function(e) {
                            return 0 === e ? "zero" : e % 10 == 1 && e % 100 != 11 ? "one" : "other"
                        },
                        7: function(e) {
                            return 2 == e ? "two" : 1 == e ? "one" : "other"
                        },
                        8: function(e) {
                            return n(e, 3, 6) ? "few" : n(e, 7, 10) ? "many" : 2 == e ? "two" : 1 == e ? "one" : "other"
                        },
                        9: function(e) {
                            return 0 === e || 1 != e && n(e % 100, 1, 19) ? "few" : 1 == e ? "one" : "other"
                        },
                        10: function(e) {
                            return n(e % 10, 2, 9) && !n(e % 100, 11, 19) ? "few" : e % 10 != 1 || n(e % 100, 11, 19) ? "other" : "one"
                        },
                        11: function(e) {
                            return n(e % 10, 2, 4) && !n(e % 100, 12, 14) ? "few" : e % 10 == 0 || n(e % 10, 5, 9) || n(e % 100, 11, 14) ? "many" : e % 10 == 1 && e % 100 != 11 ? "one" : "other"
                        },
                        12: function(e) {
                            return n(e, 2, 4) ? "few" : 1 == e ? "one" : "other"
                        },
                        13: function(e) {
                            return n(e % 10, 2, 4) && !n(e % 100, 12, 14) ? "few" : 1 != e && n(e % 10, 0, 1) || n(e % 10, 5, 9) || n(e % 100, 12, 14) ? "many" : 1 == e ? "one" : "other"
                        },
                        14: function(e) {
                            return n(e % 100, 3, 4) ? "few" : e % 100 == 2 ? "two" : e % 100 == 1 ? "one" : "other"
                        },
                        15: function(e) {
                            return 0 === e || n(e % 100, 2, 10) ? "few" : n(e % 100, 11, 19) ? "many" : 1 == e ? "one" : "other"
                        },
                        16: function(e) {
                            return e % 10 == 1 && 11 != e ? "one" : "other"
                        },
                        17: function(e) {
                            return 3 == e ? "few" : 0 === e ? "zero" : 6 == e ? "many" : 2 == e ? "two" : 1 == e ? "one" : "other"
                        },
                        18: function(e) {
                            return 0 === e ? "zero" : n(e, 0, 2) && 0 !== e && 2 != e ? "one" : "other"
                        },
                        19: function(e) {
                            return n(e, 2, 10) ? "few" : n(e, 0, 1) ? "one" : "other"
                        },
                        20: function(e) {
                            return !n(e % 10, 3, 4) && e % 10 != 9 || n(e % 100, 10, 19) || n(e % 100, 70, 79) || n(e % 100, 90, 99) ? e % 1e6 == 0 && 0 !== e ? "many" : e % 10 != 2 || t(e % 100, [12, 72, 92]) ? e % 10 != 1 || t(e % 100, [11, 71, 91]) ? "other" : "one" : "two" : "few"
                        },
                        21: function(e) {
                            return 0 === e ? "zero" : 1 == e ? "one" : "other"
                        },
                        22: function(e) {
                            return n(e, 0, 1) || n(e, 11, 99) ? "one" : "other"
                        },
                        23: function(e) {
                            return n(e % 10, 1, 2) || e % 20 == 0 ? "one" : "other"
                        },
                        24: function(e) {
                            return n(e, 3, 10) || n(e, 13, 19) ? "few" : t(e, [2, 12]) ? "two" : t(e, [1, 11]) ? "one" : "other"
                        }
                    },
                    i = {
                        af: 3,
                        ak: 4,
                        am: 4,
                        ar: 1,
                        asa: 3,
                        az: 0,
                        be: 11,
                        bem: 3,
                        bez: 3,
                        bg: 3,
                        bh: 4,
                        bm: 0,
                        bn: 3,
                        bo: 0,
                        br: 20,
                        brx: 3,
                        bs: 11,
                        ca: 3,
                        cgg: 3,
                        chr: 3,
                        cs: 12,
                        cy: 17,
                        da: 3,
                        de: 3,
                        dv: 3,
                        dz: 0,
                        ee: 3,
                        el: 3,
                        en: 3,
                        eo: 3,
                        es: 3,
                        et: 3,
                        eu: 3,
                        fa: 0,
                        ff: 5,
                        fi: 3,
                        fil: 4,
                        fo: 3,
                        fr: 5,
                        fur: 3,
                        fy: 3,
                        ga: 8,
                        gd: 24,
                        gl: 3,
                        gsw: 3,
                        gu: 3,
                        guw: 4,
                        gv: 23,
                        ha: 3,
                        haw: 3,
                        he: 2,
                        hi: 4,
                        hr: 11,
                        hu: 0,
                        id: 0,
                        ig: 0,
                        ii: 0,
                        is: 3,
                        it: 3,
                        iu: 7,
                        ja: 0,
                        jmc: 3,
                        jv: 0,
                        ka: 0,
                        kab: 5,
                        kaj: 3,
                        kcg: 3,
                        kde: 0,
                        kea: 0,
                        kk: 3,
                        kl: 3,
                        km: 0,
                        kn: 0,
                        ko: 0,
                        ksb: 3,
                        ksh: 21,
                        ku: 3,
                        kw: 7,
                        lag: 18,
                        lb: 3,
                        lg: 3,
                        ln: 4,
                        lo: 0,
                        lt: 10,
                        lv: 6,
                        mas: 3,
                        mg: 4,
                        mk: 16,
                        ml: 3,
                        mn: 3,
                        mo: 9,
                        mr: 3,
                        ms: 0,
                        mt: 15,
                        my: 0,
                        nah: 3,
                        naq: 7,
                        nb: 3,
                        nd: 3,
                        ne: 3,
                        nl: 3,
                        nn: 3,
                        no: 3,
                        nr: 3,
                        nso: 4,
                        ny: 3,
                        nyn: 3,
                        om: 3,
                        or: 3,
                        pa: 3,
                        pap: 3,
                        pl: 13,
                        ps: 3,
                        pt: 3,
                        rm: 3,
                        ro: 9,
                        rof: 3,
                        ru: 11,
                        rwk: 3,
                        sah: 0,
                        saq: 3,
                        se: 7,
                        seh: 3,
                        ses: 0,
                        sg: 0,
                        sh: 11,
                        shi: 19,
                        sk: 12,
                        sl: 14,
                        sma: 7,
                        smi: 7,
                        smj: 7,
                        smn: 7,
                        sms: 7,
                        sn: 3,
                        so: 3,
                        sq: 3,
                        sr: 11,
                        ss: 3,
                        ssy: 3,
                        st: 3,
                        sv: 3,
                        sw: 3,
                        syr: 3,
                        ta: 3,
                        te: 3,
                        teo: 3,
                        th: 0,
                        ti: 4,
                        tig: 3,
                        tk: 3,
                        tl: 4,
                        tn: 3,
                        to: 0,
                        tr: 0,
                        ts: 3,
                        tzm: 22,
                        uk: 11,
                        ur: 3,
                        ve: 3,
                        vi: 0,
                        vun: 3,
                        wa: 4,
                        wae: 3,
                        wo: 0,
                        xh: 3,
                        xog: 3,
                        yo: 0,
                        zh: 0,
                        zu: 3
                    }[e.replace(/-.*$/, "")];
                return i in r ? r[i] : (console.warn("plural form unknown for [" + e + "]"), function() {
                    return "other"
                })
            }(d));
            var a = "[" + f._pluralRules(i) + "]";
            return 0 === i && n + "[zero]" in u ? e = u[n + "[zero]"][r] : 1 == i && n + "[one]" in u ? e = u[n + "[one]"][r] : 2 == i && n + "[two]" in u ? e = u[n + "[two]"][r] : n + a in u ? e = u[n + a][r] : n + "[other]" in u && (e = u[n + "[other]"][r]), e
        }, {
            get: function(e, t, n) {
                var r = e.lastIndexOf("."),
                    i = h;
                r > 0 && (i = e.substr(r + 1), e = e.substring(0, r));
                var a;
                n && ((a = {})[i] = n);
                var o = s(e, t, a);
                return o && i in o ? o[i] : "{{" + e + "}}"
            },
            getData: function() {
                return u
            },
            getText: function() {
                return c
            },
            getLanguage: function() {
                return d
            },
            setLanguage: function(e, t) {
                o(e, function() {
                    t && t()
                })
            },
            getDirection: function() {
                var e = d.split("-", 1)[0];
                return ["ar", "he", "fa", "ps", "ur"].indexOf(e) >= 0 ? "rtl" : "ltr"
            },
            translate: function(e) {
                for (var n = function(e) {
                        return e ? e.querySelectorAll("*[data-l10n-id]") : []
                    }(e = e || t.documentElement), r = n.length, i = 0; i < r; i++) l(n[i]);
                l(e)
            },
            getReadyState: function() {
                return p
            },
            ready: function(n) {
                n && ("complete" == p || "interactive" == p ? e.setTimeout(function() {
                    n()
                }) : t.addEventListener && t.addEventListener("localized", function e() {
                    t.removeEventListener("localized", e), n()
                }))
            }
        }
    }(window, document)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        this.pdfDocument = e, this.pagesOverview = t, this.printContainer = n, this.l10n = r || l.NullL10n, this.currentPage = -1, this.scratchCanvas = document.createElement("canvas")
    }

    function i(e) {
        var t = document.createEvent("CustomEvent");
        t.initCustomEvent(e, !1, !1, "custom"), window.dispatchEvent(t)
    }

    function a() {
        h && (h.destroy(), i("afterprint"))
    }

    function o(e, t, n) {
        var r = document.getElementById("printServiceOverlay"),
            i = Math.round(100 * e / t),
            a = r.querySelector("progress"),
            o = r.querySelector(".relative-progress");
        a.value = i, n.get("print_progress_percent", {
            progress: i
        }, i + "%").then(function(e) {
            o.textContent = e
        })
    }

    function s() {
        if (!g) {
            if (!(d = u.PDFViewerApplication.overlayManager)) throw new Error("The overlay manager has not yet been initialized.");
            g = d.register("printServiceOverlay", document.getElementById("printServiceOverlay"), a, !0), document.getElementById("printCancel").onclick = a
        }
        return g
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.PDFPrintService = void 0;
    var l = n(0),
        u = n(4),
        c = n(1),
        h = null,
        d = null;
    r.prototype = {
        layout: function() {
            this.throwIfInactive();
            var e = document.querySelector("body");
            e.setAttribute("data-pdfjsprinting", !0);
            this.pagesOverview.every(function(e) {
                return e.width === this.pagesOverview[0].width && e.height === this.pagesOverview[0].height
            }, this) || console.warn("Not all pages have the same size. The printed result may be incorrect!"), this.pageStyleSheet = document.createElement("style");
            var t = this.pagesOverview[0];
            this.pageStyleSheet.textContent = "@supports ((size:A4) and (size:1pt 1pt)) {@page { size: " + t.width + "pt " + t.height + "pt;}}", e.appendChild(this.pageStyleSheet)
        },
        destroy: function() {
            h === this && (this.printContainer.textContent = "", this.pageStyleSheet && this.pageStyleSheet.parentNode && (this.pageStyleSheet.parentNode.removeChild(this.pageStyleSheet), this.pageStyleSheet = null), this.scratchCanvas.width = this.scratchCanvas.height = 0, this.scratchCanvas = null, h = null, s().then(function() {
                "printServiceOverlay" === d.active && d.close("printServiceOverlay")
            }))
        },
        renderPages: function() {
            var e = this,
                t = this.pagesOverview.length;
            return new Promise(function n(r, i) {
                if (e.throwIfInactive(), ++e.currentPage >= t) return o(t, t, e.l10n), void r();
                var a = e.currentPage;
                o(a, t, e.l10n),
                    function(e, t, n, r) {
                        var i = h.scratchCanvas;
                        i.width = Math.floor(r.width * (150 / 72)), i.height = Math.floor(r.height * (150 / 72));
                        var a = Math.floor(r.width * l.CSS_UNITS) + "px",
                            o = Math.floor(r.height * l.CSS_UNITS) + "px",
                            s = i.getContext("2d");
                        return s.save(), s.fillStyle = "rgb(255, 255, 255)", s.fillRect(0, 0, i.width, i.height), s.restore(), t.getPage(n).then(function(e) {
                            var t = {
                                canvasContext: s,
                                transform: [150 / 72, 0, 0, 150 / 72, 0, 0],
                                viewport: e.getViewport(1, r.rotation),
                                intent: "print"
                            };
                            return e.render(t).promise
                        }).then(function() {
                            return {
                                width: a,
                                height: o
                            }
                        })
                    }(0, e.pdfDocument, a + 1, e.pagesOverview[a]).then(e.useRenderedPage.bind(e)).then(function() {
                        n(r, i)
                    }, i)
            })
        },
        useRenderedPage: function(e) {
            this.throwIfInactive();
            var t = document.createElement("img");
            t.style.width = e.width, t.style.height = e.height;
            var n = this.scratchCanvas;
            "toBlob" in n && !c.PDFJS.disableCreateObjectURL ? n.toBlob(function(e) {
                t.src = URL.createObjectURL(e)
            }) : t.src = n.toDataURL();
            var r = document.createElement("div");
            return r.appendChild(t), this.printContainer.appendChild(r), new Promise(function(e, n) {
                t.onload = e, t.onerror = n
            })
        },
        performPrint: function() {
            var e = this;
            return this.throwIfInactive(), new Promise(function(t) {
                setTimeout(function() {
                    e.active ? (f.call(window), setTimeout(t, 20)) : t()
                }, 0)
            })
        },
        get active() {
            return this === h
        },
        throwIfInactive: function() {
            if (!this.active) throw new Error("This print request was cancelled or completed.")
        }
    };
    var f = window.print;
    window.print = function() {
        if (h) console.warn("Ignored window.print() because of a pending print job.");
        else {
            s().then(function() {
                h && d.open("printServiceOverlay")
            });
            try {
                i("beforeprint")
            } finally {
                if (!h) return console.error("Expected print service to be initialized."), void s().then(function() {
                    "printServiceOverlay" === d.active && d.close("printServiceOverlay")
                });
                var e = h;
                h.renderPages().then(function() {
                    return e.performPrint()
                }).catch(function() {}).then(function() {
                    e.active && a()
                })
            }
        }
    };
    var p = !!document.attachEvent;
    if (window.addEventListener("keydown", function(e) {
            if (80 === e.keyCode && (e.ctrlKey || e.metaKey) && !e.altKey && (!e.shiftKey || window.chrome || window.opera)) {
                if (window.print(), p) return;
                return e.preventDefault(), void(e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.stopPropagation())
            }
        }, !0), p && document.attachEvent("onkeydown", function(e) {
            if (80 === (e = e || window.event).keyCode && e.ctrlKey) return e.keyCode = 0, !1
        }), "onbeforeprint" in window) {
        var v = function(e) {
            "custom" !== e.detail && e.stopImmediatePropagation && e.stopImmediatePropagation()
        };
        window.addEventListener("beforeprint", v), window.addEventListener("afterprint", v)
    }
    var g = void 0;
    u.PDFPrintServiceFactory.instance = {
        supportsPrinting: !0,
        createPrintService: function(e, t, n, i) {
            if (h) throw new Error("The print service is created and active.");
            return h = new r(e, t, n, i)
        }
    }, t.PDFPrintService = r
}]);
