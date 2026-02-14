(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a.prototype = f2.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a, k2, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$1 = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e2) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e2) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e2;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e2, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e2 = "", null != a && (e2 = a.replace(P$1, "$&/") + "/"), R$1(c, b, e2, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e2 + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e2, f2, c);
  }
  else if (f2 = A$1(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e2, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e2) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e2, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e2) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e2);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r$1;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e2) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e2;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e2) {
  return U$1.current.useImperativeHandle(a, b, e2);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e2) {
  return U$1.current.useReducer(a, b, e2);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e2) {
  return U$1.current.useSyncExternalStore(a, b, e2);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React$6 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e2 = null, h = null;
  void 0 !== g && (e2 = "" + g);
  void 0 !== a.key && (e2 = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e2, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e2 = a[d];
      if (0 < g(e2, b)) a[d] = b, a[c] = e2, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e2 = a.length, w2 = e2 >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e2 && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e2 && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports$1.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d(v2.expirationTime <= b);
          b = exports$1.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports$1.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports$1.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports$1.unstable_now());
    }, b);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports$1.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports$1.unstable_scheduleCallback = function(a, b, c) {
    var d = exports$1.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c + e2;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e2, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e2, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e2, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e2;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e2 = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e2 ? 0 !== e2.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e2, d) && (c = null), d || null === e2 ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e2.mustUseProperty ? a[e2.propertyName] = null === c ? 3 === e2.type ? false : "" : c : (b = e2.attributeName, d = e2.attributeNamespace, null === c ? a.removeAttribute(b) : (e2 = e2.type, c = 3 === e2 || 4 === e2 && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e2.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e2[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e2[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e2[g] !== f2[h]) {
              var k2 = "\n" + e2[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e2 = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e2 = 0; e2 < c.length; e2++) b["$" + c[e2]] = true;
    for (c = 0; c < a.length; c++) e2 = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e2 && (a[c].selected = e2), e2 && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e2 = 0; e2 < a.length; e2++) {
      if (a[e2].value === c) {
        a[e2].selected = true;
        d && (a[e2].defaultSelected = true);
        return;
      }
      null !== b || a[e2].disabled || (b = a[e2]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e2);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e2 = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e2) : a[c] = e2;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e2, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e2, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e2, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e2 = c.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d = e2.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c) return Xb(e2), a;
        if (f2 === d) return Xb(e2), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e2, d = f2;
    else {
      for (var g = false, h = e2.child; h; ) {
        if (h === c) {
          g = true;
          c = e2;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e2;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e2;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e2;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e2 = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e2;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e2, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e2) && (e2 = d & -d, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e2 = 1 << c, d |= a[c], b &= ~e2;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e2 = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e2[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e2[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e2 = 31 - oc(c), f2 = 1 << e2;
    b[e2] = 0;
    d[e2] = -1;
    a[e2] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e2 = 1 << d;
    e2 & b | a[d] & b && (a[d] |= b);
    c &= ~e2;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e2, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
  return a;
}
function Uc(a, b, c, d, e2) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e2)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e2 = Yc(a, b, c, d);
    if (null === e2) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e2, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a = 0; a < c && b[a] === e2[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e2[f2 - d]; d++) ;
  return md = e2.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e2, f2, g) {
    this._reactName = b2;
    this._targetInst = e2;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e2 = c[d];
    if (!ja.call(b, e2) || !He(a[e2], b[e2])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e2 = c.textContent.length, f2 = Math.min(d.start, e2);
        d = void 0 === d.end ? f2 : Math.min(d.end, e2);
        !a.extend && f2 > d && (e2 = d, d = f2, f2 = e2);
        e2 = Ke(c, f2);
        var g = Ke(
          c,
          d
        );
        e2 && g && (1 !== a.rangeCount || a.anchorNode !== e2.node || a.anchorOffset !== e2.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e2 = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c = e2.bind(null, b, c, a);
  e2 = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
  d ? void 0 !== e2 ? a.addEventListener(b, c, { capture: true, passive: e2 }) : a.addEventListener(b, c, true) : void 0 !== e2 ? a.addEventListener(b, c, { passive: e2 }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e2) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e2 || 8 === h.nodeType && h.parentNode === e2) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e3 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e3), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e3.window === e3 ? e3 : (h2 = e3.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e3);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e3);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e3);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e3);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e3), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c, e3), g2.push({ event: e3, listeners: d2 }), e3.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e2 = a, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e2)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e2)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e2) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e2 ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e2 || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e2 = c.nextSibling;
    a.removeChild(c);
    if (e2 && 8 === e2.nodeType) if (c = e2.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e2);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e2;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c) e2[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e2 in d) if (!(e2 in b)) throw Error(p(108, Ra(a) || "Unknown", e2));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e2;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e2 = 32 - oc(d) - 1;
  d &= ~(1 << e2);
  c += 1;
  var f2 = 32 - oc(b) + e2;
  if (30 < f2) {
    var g = e2 - e2 % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e2 -= g;
    rg = 1 << 32 - oc(b) + e2 | c << e2 | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e2 | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e2 = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e2.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e2(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e2(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e2(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e2(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e3 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e3 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e3 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e3 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e3 = c2._init, r2(
            a2,
            b2,
            e3(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e3 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e3) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e3);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e3);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e3);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e3);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e3, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e3, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e3, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e3, u2), I && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e3, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e3, w2);
      return l3;
    }
    for (u2 = d(e3, u2); w2 < h2.length; w2++) x2 = y2(u2, e3, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function t2(e3, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e3, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e3,
      m3
    ), I && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e3, w2);
      return l3;
    }
    for (m3 = d(e3, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e2(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e2(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e2(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e2(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e2 = b.interleaved;
  null === e2 ? (c.next = c, gh(b)) : (c.next = e2.next, e2.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e2 = d.pending;
    null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e2 = d.interleaved;
  null === e2 ? (b.next = b, gh(d)) : (b.next = e2.next, e2.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e2 = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e2 = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e2 = f2 = b : f2 = f2.next = b;
    } else e2 = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e2 = a.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h = e2.shared.pending;
  if (null !== h) {
    e2.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e2.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b = e2.shared.interleaved;
    if (null !== b) {
      e2 = b;
      do
        g |= e2.lane, e2 = e2.next;
      while (e2 !== b);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e2 = d.callback;
    if (null !== e2) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e2) throw Error(p(191, e2));
      e2.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e2, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e2 = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g = e2.next;
      e2.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e2 = f2;
    c.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e2 = a;
    do
      f2 = e2.lane, M.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a);
  } else null === e2 && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e2 = c.pending, f2 = b.memoizedState;
  if (null !== e2) {
    c.pending = null;
    var g = e2 = e2.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e2);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e2 = b(), f2 = !He(d.memoizedState, e2);
  f2 && (d.memoizedState = e2, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e2, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e2);
  }
  return e2;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e2 = Th();
  M.flags |= a;
  e2.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e2 = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e2.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e2.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e2 = R();
    gi(c, a, d, e2);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e2 = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e2);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e2.hasEagerState = true;
      e2.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
        b.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e2, d);
    null !== c && (e2 = R(), gi(c, a, d, e2), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e2 = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e2.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e2 = yi(a), f2 = mh(d, e2);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e2);
  null !== b && (gi(b, a, e2, d), oh(b, a, e2));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e2 = mh(c, d);
  e2.tag = 2;
  void 0 !== b && null !== b && (e2.callback = b);
  b = nh(a, e2, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e2, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e2, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e2 = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e2) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e2, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e2 = a.stateNode;
  e2.props = c;
  e2.state = a.memoizedState;
  e2.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e2.context = Yf(a, f2));
  e2.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e2.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a, c, e2, d), e2.state = a.memoizedState);
  "function" === typeof e2.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e2 = c;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e2, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e2 = b.value;
    c.payload = function() {
      return d(e2);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d.set(b, e2);
  } else e2 = d.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d.set(b, e2));
  e2.has(c) || (e2.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e2) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e2;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e2) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e2);
  d = Nh(a, b, c, d, f2, e2);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e2);
  return b.child;
}
function $i(a, b, c, d, e2) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e2);
    a = Rg(c.type, null, d, b, b.mode, e2);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e2)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e2);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e2) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e2)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e2);
  }
  return cj(a, b, c, d, e2);
}
function dj(a, b, c) {
  var d = b.pendingProps, e2 = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e2, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e2) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e2);
  c = Nh(a, b, c, d, f2, e2);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e2, Zi(a, b, e2);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e2);
  return b.child;
}
function hj(a, b, c, d, e2) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e2);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e2), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e2);
}
function jj(a, b, c, d, e2, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e2 && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e2 && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e2) {
  Ig();
  Jg(e2);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e2 = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e2 & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e2 |= 1;
  G(L, e2 & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e2 = a.memoizedState;
  if (null !== e2 && (h = e2.dehydrated, null !== h)) return rj(a, b, g, d, h, e2, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e2 = a.child;
    h = e2.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e2 ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e2, k2), d.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e2, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e2 = b.mode;
    d = pj({ mode: "visible", children: d.children }, e2, 0, null);
    f2 = Tg(f2, e2, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e2.data) {
    d = e2.nextSibling && e2.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d.suspendedLanes | g)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a, e2), gi(d, a, e2, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e2.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e2._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e2) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e2);
}
function xj(a, b, c) {
  var d = b.pendingProps, e2 = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c = b.child;
      for (e2 = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e2 = c), c = c.sibling;
      c = e2;
      null === c ? (e2 = b.child, b.child = null) : (e2 = c.sibling, c.sibling = null);
      wj(b, false, e2, c, f2);
      break;
    case "backwards":
      c = null;
      e2 = b.child;
      for (b.child = null; null !== e2; ) {
        a = e2.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e2;
          break;
        }
        a = e2.sibling;
        e2.sibling = c;
        c = e2;
        e2 = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e2 = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e2;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e2 = b.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e2 = a.memoizedProps;
  if (e2 !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e2 = Ya(a, e2);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e2 = A({}, e2, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a, e2);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e2) if (!d.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h = e2[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e2 ? e2[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e2 = a.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags & 14680064, d |= e2.flags & 14680064, e2.return = a, e2 = e2.sibling;
  else for (e2 = a.child; null !== e2; ) c |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags, d |= e2.flags, e2.return = a, e2 = e2.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e2 = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e2), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e2 = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e2 = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e2 = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e2;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e2 = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e2 = d;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D(lf[e2], a);
                e2 = d;
                break;
              case "source":
                D("error", a);
                e2 = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e2 = d;
                break;
              case "details":
                D("toggle", a);
                e2 = d;
                break;
              case "input":
                Za(a, d);
                e2 = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e2 = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e2 = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e2 = gb(a, d);
                D("invalid", a);
                break;
              default:
                e2 = d;
            }
            ub(c, e2);
            h = e2;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e2 = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e2 && 3 !== q2.nodeType || (h = g + e2);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e2 && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e2 = d = d.next;
    do {
      if ((e2.tag & a) === a) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e2 = e2.next;
    } while (e2 !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e2 = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e2;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e2 = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e2 = d = d.next;
        do {
          var f2 = e2, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e2 = e2.next;
        } while (e2 !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e2 = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f2, g, e2);
      X = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W(e2, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e2 = a.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e2 = a.stateNode, null != e2)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e2 = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e2 = a.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e2 = d.stateNode;
          d.flags & 32 && (ob(e2, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e2);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e2 = V, f2 = e2.child;
    if (22 === e2.tag && d) {
      var g = null !== e2.memoizedState || Jj;
      if (!g) {
        var h = e2.alternate, k2 = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k2) && !l2) for (V = e2; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g, V = k2) : jk(e2);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e2;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e2 = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e2, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e2 = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W(b, e2, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W(b, g, k2);
          }
      }
    } catch (k2) {
      W(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e2 = xc(a), 0 !== e2 && (d = e2, b = Nk(a, e2)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e2 = a.current.alternate;
      if (0 === (d & 30) && !Ok(e2) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e2;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e2 = a.suspendedLanes;
            if ((e2 & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e2;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e2 = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e2 && (e2 = g);
            d &= ~f2;
          }
          d = e2;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e2 = c[d], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e2 = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e2;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e2 = d.queue;
          null !== e2 && (e2.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a, e2);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e2 = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e2, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e2 = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e2);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e2 = b[c], d(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e2 = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e2 = a.memoizedState;
      null !== e2 && (c = e2.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e2 = Yf(b, H.current);
      ch(b, c);
      e2 = Nh(null, b, d, a, e2, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e2, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e2 = d._init;
        d = e2(d._payload);
        b.type = d;
        e2 = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e2) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), cj(a, b, d, e2, c);
    case 1:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), hj(a, b, d, e2, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e2 = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e2 = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e2);
          break a;
        } else if (d !== e2) {
          e2 = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e2);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e2) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e2 = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e2.children, Ef(d, e2) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), Yi(a, b, d, e2, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e2 = b.pendingProps;
        f2 = b.memoizedProps;
        g = e2.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e2.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e2.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e2 = b.type, d = b.pendingProps.children, ch(b, c), e2 = eh(e2), d = d(e2), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e2 = Ci(d, b.pendingProps), e2 = Ci(d.type, e2), $i(a, b, d, e2, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e2), Ii(b, d, e2, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e2, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e2, f2, b);
    case za:
      g = 8;
      e2 |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e2 | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e2), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e2), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e2, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e2);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e2) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e2, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e2, f2, g, h, k2) {
  a = bl(c, d, true, a, e2, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e2 = yi(c);
  f2 = mh(d, e2);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e2);
  a.current.lanes = e2;
  Ac(a, e2, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e2 = b.current, f2 = R(), g = yi(e2);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e2, b, g);
  null !== a && (gi(a, e2, g, f2), oh(a, e2, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e2) {
  if (e2) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e2 = a.lastChild; ) a.removeChild(e2);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e2) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e2) {
      var h = e2;
      e2 = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e2);
  } else g = ql(c, b, a, e2, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e2 = Db(d);
            if (!e2) throw Error(p(90));
            Wa(d);
            bb(d, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e2 = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e2);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e2 = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e2 = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e2, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e2 = c._getVersion, e2 = e2(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e2] : b.mutableSourceEagerHydrationData.push(
    c,
    e2
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
var reactGridLayout = { exports: {} };
var ReactGridLayout$1 = {};
var fastEquals = { exports: {} };
(function(module, exports$1) {
  (function(global2, factory) {
    factory(exports$1);
  })(commonjsGlobal, function(exports$12) {
    function createDefaultIsNestedEqual(comparator) {
      return function isEqual(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, meta) {
        return comparator(a, b, meta);
      };
    }
    function createIsCircular(areItemsEqual) {
      return function isCircular(a, b, isEqual, cache) {
        if (!a || !b || typeof a !== "object" || typeof b !== "object") {
          return areItemsEqual(a, b, isEqual, cache);
        }
        var cachedA = cache.get(a);
        var cachedB = cache.get(b);
        if (cachedA && cachedB) {
          return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        var result = areItemsEqual(a, b, isEqual, cache);
        cache.delete(a);
        cache.delete(b);
        return result;
      };
    }
    function merge(a, b) {
      var merged = {};
      for (var key in a) {
        merged[key] = a[key];
      }
      for (var key in b) {
        merged[key] = b[key];
      }
      return merged;
    }
    function isPlainObject(value) {
      return value.constructor === Object || value.constructor == null;
    }
    function isPromiseLike(value) {
      return typeof value.then === "function";
    }
    function sameValueZeroEqual(a, b) {
      return a === b || a !== a && b !== b;
    }
    var ARGUMENTS_TAG = "[object Arguments]";
    var BOOLEAN_TAG = "[object Boolean]";
    var DATE_TAG = "[object Date]";
    var REG_EXP_TAG = "[object RegExp]";
    var MAP_TAG = "[object Map]";
    var NUMBER_TAG = "[object Number]";
    var OBJECT_TAG = "[object Object]";
    var SET_TAG = "[object Set]";
    var STRING_TAG = "[object String]";
    var toString = Object.prototype.toString;
    function createComparator(_a) {
      var areArraysEqual2 = _a.areArraysEqual, areDatesEqual2 = _a.areDatesEqual, areMapsEqual2 = _a.areMapsEqual, areObjectsEqual2 = _a.areObjectsEqual, areRegExpsEqual2 = _a.areRegExpsEqual, areSetsEqual2 = _a.areSetsEqual, createIsNestedEqual = _a.createIsNestedEqual;
      var isEqual = createIsNestedEqual(comparator);
      function comparator(a, b, meta) {
        if (a === b) {
          return true;
        }
        if (!a || !b || typeof a !== "object" || typeof b !== "object") {
          return a !== a && b !== b;
        }
        if (isPlainObject(a) && isPlainObject(b)) {
          return areObjectsEqual2(a, b, isEqual, meta);
        }
        var aArray = Array.isArray(a);
        var bArray = Array.isArray(b);
        if (aArray || bArray) {
          return aArray === bArray && areArraysEqual2(a, b, isEqual, meta);
        }
        var aTag = toString.call(a);
        if (aTag !== toString.call(b)) {
          return false;
        }
        if (aTag === DATE_TAG) {
          return areDatesEqual2(a, b, isEqual, meta);
        }
        if (aTag === REG_EXP_TAG) {
          return areRegExpsEqual2(a, b, isEqual, meta);
        }
        if (aTag === MAP_TAG) {
          return areMapsEqual2(a, b, isEqual, meta);
        }
        if (aTag === SET_TAG) {
          return areSetsEqual2(a, b, isEqual, meta);
        }
        if (aTag === OBJECT_TAG || aTag === ARGUMENTS_TAG) {
          return isPromiseLike(a) || isPromiseLike(b) ? false : areObjectsEqual2(a, b, isEqual, meta);
        }
        if (aTag === BOOLEAN_TAG || aTag === NUMBER_TAG || aTag === STRING_TAG) {
          return sameValueZeroEqual(a.valueOf(), b.valueOf());
        }
        return false;
      }
      return comparator;
    }
    function areArraysEqual(a, b, isEqual, meta) {
      var index2 = a.length;
      if (b.length !== index2) {
        return false;
      }
      while (index2-- > 0) {
        if (!isEqual(a[index2], b[index2], index2, index2, a, b, meta)) {
          return false;
        }
      }
      return true;
    }
    var areArraysEqualCircular = createIsCircular(areArraysEqual);
    function areDatesEqual(a, b) {
      return sameValueZeroEqual(a.valueOf(), b.valueOf());
    }
    function areMapsEqual(a, b, isEqual, meta) {
      var isValueEqual = a.size === b.size;
      if (!isValueEqual) {
        return false;
      }
      if (!a.size) {
        return true;
      }
      var matchedIndices = {};
      var indexA = 0;
      a.forEach(function(aValue, aKey) {
        if (!isValueEqual) {
          return;
        }
        var hasMatch = false;
        var matchIndexB = 0;
        b.forEach(function(bValue, bKey) {
          if (!hasMatch && !matchedIndices[matchIndexB] && (hasMatch = isEqual(aKey, bKey, indexA, matchIndexB, a, b, meta) && isEqual(aValue, bValue, aKey, bKey, a, b, meta))) {
            matchedIndices[matchIndexB] = true;
          }
          matchIndexB++;
        });
        indexA++;
        isValueEqual = hasMatch;
      });
      return isValueEqual;
    }
    var areMapsEqualCircular = createIsCircular(areMapsEqual);
    var OWNER = "_owner";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function areObjectsEqual(a, b, isEqual, meta) {
      var keysA = Object.keys(a);
      var index2 = keysA.length;
      if (Object.keys(b).length !== index2) {
        return false;
      }
      var key;
      while (index2-- > 0) {
        key = keysA[index2];
        if (key === OWNER) {
          var reactElementA = !!a.$$typeof;
          var reactElementB = !!b.$$typeof;
          if ((reactElementA || reactElementB) && reactElementA !== reactElementB) {
            return false;
          }
        }
        if (!hasOwnProperty.call(b, key) || !isEqual(a[key], b[key], key, key, a, b, meta)) {
          return false;
        }
      }
      return true;
    }
    var areObjectsEqualCircular = createIsCircular(areObjectsEqual);
    function areRegExpsEqual(a, b) {
      return a.source === b.source && a.flags === b.flags;
    }
    function areSetsEqual(a, b, isEqual, meta) {
      var isValueEqual = a.size === b.size;
      if (!isValueEqual) {
        return false;
      }
      if (!a.size) {
        return true;
      }
      var matchedIndices = {};
      a.forEach(function(aValue, aKey) {
        if (!isValueEqual) {
          return;
        }
        var hasMatch = false;
        var matchIndex = 0;
        b.forEach(function(bValue, bKey) {
          if (!hasMatch && !matchedIndices[matchIndex] && (hasMatch = isEqual(aValue, bValue, aKey, bKey, a, b, meta))) {
            matchedIndices[matchIndex] = true;
          }
          matchIndex++;
        });
        isValueEqual = hasMatch;
      });
      return isValueEqual;
    }
    var areSetsEqualCircular = createIsCircular(areSetsEqual);
    var DEFAULT_CONFIG = Object.freeze({
      areArraysEqual,
      areDatesEqual,
      areMapsEqual,
      areObjectsEqual,
      areRegExpsEqual,
      areSetsEqual,
      createIsNestedEqual: createDefaultIsNestedEqual
    });
    var DEFAULT_CIRCULAR_CONFIG = Object.freeze({
      areArraysEqual: areArraysEqualCircular,
      areDatesEqual,
      areMapsEqual: areMapsEqualCircular,
      areObjectsEqual: areObjectsEqualCircular,
      areRegExpsEqual,
      areSetsEqual: areSetsEqualCircular,
      createIsNestedEqual: createDefaultIsNestedEqual
    });
    var isDeepEqual = createComparator(DEFAULT_CONFIG);
    function deepEqual(a, b) {
      return isDeepEqual(a, b, void 0);
    }
    var isShallowEqual = createComparator(merge(DEFAULT_CONFIG, { createIsNestedEqual: function() {
      return sameValueZeroEqual;
    } }));
    function shallowEqual(a, b) {
      return isShallowEqual(a, b, void 0);
    }
    var isCircularDeepEqual = createComparator(DEFAULT_CIRCULAR_CONFIG);
    function circularDeepEqual(a, b) {
      return isCircularDeepEqual(a, b, /* @__PURE__ */ new WeakMap());
    }
    var isCircularShallowEqual = createComparator(merge(DEFAULT_CIRCULAR_CONFIG, {
      createIsNestedEqual: function() {
        return sameValueZeroEqual;
      }
    }));
    function circularShallowEqual(a, b) {
      return isCircularShallowEqual(a, b, /* @__PURE__ */ new WeakMap());
    }
    function createCustomEqual(getComparatorOptions) {
      return createComparator(merge(DEFAULT_CONFIG, getComparatorOptions(DEFAULT_CONFIG)));
    }
    function createCustomCircularEqual(getComparatorOptions) {
      var comparator = createComparator(merge(DEFAULT_CIRCULAR_CONFIG, getComparatorOptions(DEFAULT_CIRCULAR_CONFIG)));
      return function(a, b, meta) {
        if (meta === void 0) {
          meta = /* @__PURE__ */ new WeakMap();
        }
        return comparator(a, b, meta);
      };
    }
    exports$12.circularDeepEqual = circularDeepEqual;
    exports$12.circularShallowEqual = circularShallowEqual;
    exports$12.createCustomCircularEqual = createCustomCircularEqual;
    exports$12.createCustomEqual = createCustomEqual;
    exports$12.deepEqual = deepEqual;
    exports$12.sameValueZeroEqual = sameValueZeroEqual;
    exports$12.shallowEqual = shallowEqual;
    Object.defineProperty(exports$12, "__esModule", { value: true });
  });
})(fastEquals, fastEquals.exports);
var fastEqualsExports = fastEquals.exports;
var clsx = { exports: {} };
function r(e2) {
  var o, t2, f2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) f2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var n2 = e2.length;
    for (o = 0; o < n2; o++) e2[o] && (t2 = r(e2[o])) && (f2 && (f2 += " "), f2 += t2);
  } else for (t2 in e2) e2[t2] && (f2 && (f2 += " "), f2 += t2);
  return f2;
}
function e() {
  for (var e2, o, t2 = 0, f2 = "", n2 = arguments.length; t2 < n2; t2++) (e2 = arguments[t2]) && (o = r(e2)) && (f2 && (f2 += " "), f2 += o);
  return f2;
}
clsx.exports = e, clsx.exports.clsx = e;
var clsxExports = clsx.exports;
var utils$1 = {};
var fastRGLPropsEqual = function fastRGLPropsEqual2(a, b, isEqualImpl) {
  if (a === b) return true;
  return a.className === b.className && isEqualImpl(a.style, b.style) && a.width === b.width && a.autoSize === b.autoSize && a.cols === b.cols && a.draggableCancel === b.draggableCancel && a.draggableHandle === b.draggableHandle && isEqualImpl(a.verticalCompact, b.verticalCompact) && isEqualImpl(a.compactType, b.compactType) && isEqualImpl(a.layout, b.layout) && isEqualImpl(a.margin, b.margin) && isEqualImpl(a.containerPadding, b.containerPadding) && a.rowHeight === b.rowHeight && a.maxRows === b.maxRows && a.isBounded === b.isBounded && a.isDraggable === b.isDraggable && a.isResizable === b.isResizable && a.allowOverlap === b.allowOverlap && a.preventCollision === b.preventCollision && a.useCSSTransforms === b.useCSSTransforms && a.transformScale === b.transformScale && a.isDroppable === b.isDroppable && isEqualImpl(a.resizeHandles, b.resizeHandles) && isEqualImpl(a.resizeHandle, b.resizeHandle) && a.onLayoutChange === b.onLayoutChange && a.onDragStart === b.onDragStart && a.onDrag === b.onDrag && a.onDragStop === b.onDragStop && a.onResizeStart === b.onResizeStart && a.onResize === b.onResize && a.onResizeStop === b.onResizeStop && a.onDrop === b.onDrop && isEqualImpl(a.droppingItem, b.droppingItem) && isEqualImpl(a.innerRef, b.innerRef);
};
Object.defineProperty(utils$1, "__esModule", {
  value: true
});
utils$1.bottom = bottom;
utils$1.childrenEqual = childrenEqual;
utils$1.cloneLayout = cloneLayout;
utils$1.cloneLayoutItem = cloneLayoutItem;
utils$1.collides = collides;
utils$1.compact = compact;
utils$1.compactItem = compactItem;
utils$1.compactType = compactType;
utils$1.correctBounds = correctBounds;
utils$1.fastPositionEqual = fastPositionEqual;
utils$1.fastRGLPropsEqual = void 0;
utils$1.getAllCollisions = getAllCollisions;
utils$1.getFirstCollision = getFirstCollision;
utils$1.getLayoutItem = getLayoutItem;
utils$1.getStatics = getStatics;
utils$1.modifyLayout = modifyLayout;
utils$1.moveElement = moveElement;
utils$1.moveElementAwayFromCollision = moveElementAwayFromCollision;
utils$1.noop = void 0;
utils$1.perc = perc;
utils$1.resizeItemInDirection = resizeItemInDirection;
utils$1.setTopLeft = setTopLeft;
utils$1.setTransform = setTransform;
utils$1.sortLayoutItems = sortLayoutItems;
utils$1.sortLayoutItemsByColRow = sortLayoutItemsByColRow;
utils$1.sortLayoutItemsByRowCol = sortLayoutItemsByRowCol;
utils$1.synchronizeLayoutWithChildren = synchronizeLayoutWithChildren;
utils$1.validateLayout = validateLayout;
utils$1.withLayoutItem = withLayoutItem;
var _fastEquals$2 = fastEqualsExports;
var _react$3 = _interopRequireDefault$9(reactExports);
function _interopRequireDefault$9(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function ownKeys$6(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e2, r22).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$6(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$6(Object(t2), true).forEach(function(r22) {
      _defineProperty$8(e2, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$6(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e2, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e2;
}
function _defineProperty$8(e2, r2, t2) {
  return (r2 = _toPropertyKey$8(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$8(t2) {
  var i = _toPrimitive$8(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function bottom(layout) {
  let max = 0, bottomY;
  for (let i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }
  return max;
}
function cloneLayout(layout) {
  const newLayout = Array(layout.length);
  for (let i = 0, len = layout.length; i < len; i++) {
    newLayout[i] = cloneLayoutItem(layout[i]);
  }
  return newLayout;
}
function modifyLayout(layout, layoutItem) {
  const newLayout = Array(layout.length);
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layoutItem.i === layout[i].i) {
      newLayout[i] = layoutItem;
    } else {
      newLayout[i] = layout[i];
    }
  }
  return newLayout;
}
function withLayoutItem(layout, itemKey, cb2) {
  let item = getLayoutItem(layout, itemKey);
  if (!item) return [layout, null];
  item = cb2(cloneLayoutItem(item));
  layout = modifyLayout(layout, item);
  return [layout, item];
}
function cloneLayoutItem(layoutItem) {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null/undefined
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable,
    resizeHandles: layoutItem.resizeHandles,
    isBounded: layoutItem.isBounded
  };
}
function childrenEqual(a, b) {
  return (0, _fastEquals$2.deepEqual)(_react$3.default.Children.map(a, (c) => c === null || c === void 0 ? void 0 : c.key), _react$3.default.Children.map(b, (c) => c === null || c === void 0 ? void 0 : c.key)) && (0, _fastEquals$2.deepEqual)(_react$3.default.Children.map(a, (c) => c === null || c === void 0 ? void 0 : c.props["data-grid"]), _react$3.default.Children.map(b, (c) => c === null || c === void 0 ? void 0 : c.props["data-grid"]));
}
utils$1.fastRGLPropsEqual = fastRGLPropsEqual;
function fastPositionEqual(a, b) {
  return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;
}
function collides(l1, l2) {
  if (l1.i === l2.i) return false;
  if (l1.x + l1.w <= l2.x) return false;
  if (l1.x >= l2.x + l2.w) return false;
  if (l1.y + l1.h <= l2.y) return false;
  if (l1.y >= l2.y + l2.h) return false;
  return true;
}
function compact(layout, compactType2, cols, allowOverlap) {
  const compareWith = getStatics(layout);
  let b = bottom(compareWith);
  const sorted = sortLayoutItems(layout, compactType2);
  const out = Array(layout.length);
  for (let i = 0, len = sorted.length; i < len; i++) {
    let l2 = cloneLayoutItem(sorted[i]);
    if (!l2.static) {
      l2 = compactItem(compareWith, l2, compactType2, cols, sorted, allowOverlap, b);
      b = Math.max(b, l2.y + l2.h);
      compareWith.push(l2);
    }
    out[layout.indexOf(sorted[i])] = l2;
    l2.moved = false;
  }
  return out;
}
const heightWidth = {
  x: "w",
  y: "h"
};
function resolveCompactionCollision(layout, item, moveToCoord, axis) {
  const sizeProp = heightWidth[axis];
  item[axis] += 1;
  const itemIndex = layout.map((layoutItem) => {
    return layoutItem.i;
  }).indexOf(item.i);
  for (let i = itemIndex + 1; i < layout.length; i++) {
    const otherItem = layout[i];
    if (otherItem.static) continue;
    if (otherItem.y > item.y + item.h) break;
    if (collides(item, otherItem)) {
      resolveCompactionCollision(layout, otherItem, moveToCoord + item[sizeProp], axis);
    }
  }
  item[axis] = moveToCoord;
}
function compactItem(compareWith, l2, compactType2, cols, fullLayout, allowOverlap, b) {
  const compactV = compactType2 === "vertical";
  const compactH = compactType2 === "horizontal";
  if (compactV) {
    if (typeof b === "number") {
      l2.y = Math.min(b, l2.y);
    } else {
      l2.y = Math.min(bottom(compareWith), l2.y);
    }
    while (l2.y > 0 && !getFirstCollision(compareWith, l2)) {
      l2.y--;
    }
  } else if (compactH) {
    while (l2.x > 0 && !getFirstCollision(compareWith, l2)) {
      l2.x--;
    }
  }
  let collides2;
  while ((collides2 = getFirstCollision(compareWith, l2)) && !(compactType2 === null && allowOverlap)) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l2, collides2.x + collides2.w, "x");
    } else {
      resolveCompactionCollision(fullLayout, l2, collides2.y + collides2.h, "y");
    }
    if (compactH && l2.x + l2.w > cols) {
      l2.x = cols - l2.w;
      l2.y++;
      while (l2.x > 0 && !getFirstCollision(compareWith, l2)) {
        l2.x--;
      }
    }
  }
  l2.y = Math.max(l2.y, 0);
  l2.x = Math.max(l2.x, 0);
  return l2;
}
function correctBounds(layout, bounds) {
  const collidesWith = getStatics(layout);
  for (let i = 0, len = layout.length; i < len; i++) {
    const l2 = layout[i];
    if (l2.x + l2.w > bounds.cols) l2.x = bounds.cols - l2.w;
    if (l2.x < 0) {
      l2.x = 0;
      l2.w = bounds.cols;
    }
    if (!l2.static) collidesWith.push(l2);
    else {
      while (getFirstCollision(collidesWith, l2)) {
        l2.y++;
      }
    }
  }
  return layout;
}
function getLayoutItem(layout, id2) {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id2) return layout[i];
  }
}
function getFirstCollision(layout, layoutItem) {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}
function getAllCollisions(layout, layoutItem) {
  return layout.filter((l2) => collides(l2, layoutItem));
}
function getStatics(layout) {
  return layout.filter((l2) => l2.static);
}
function moveElement(layout, l2, x2, y2, isUserAction, preventCollision, compactType2, cols, allowOverlap) {
  if (l2.static && l2.isDraggable !== true) return layout;
  if (l2.y === y2 && l2.x === x2) return layout;
  log$2("Moving element ".concat(l2.i, " to [").concat(String(x2), ",").concat(String(y2), "] from [").concat(l2.x, ",").concat(l2.y, "]"));
  const oldX = l2.x;
  const oldY = l2.y;
  if (typeof x2 === "number") l2.x = x2;
  if (typeof y2 === "number") l2.y = y2;
  l2.moved = true;
  let sorted = sortLayoutItems(layout, compactType2);
  const movingUp = compactType2 === "vertical" && typeof y2 === "number" ? oldY >= y2 : compactType2 === "horizontal" && typeof x2 === "number" ? oldX >= x2 : false;
  if (movingUp) sorted = sorted.reverse();
  const collisions = getAllCollisions(sorted, l2);
  const hasCollisions = collisions.length > 0;
  if (hasCollisions && allowOverlap) {
    return cloneLayout(layout);
  } else if (hasCollisions && preventCollision) {
    log$2("Collision prevented on ".concat(l2.i, ", reverting."));
    l2.x = oldX;
    l2.y = oldY;
    l2.moved = false;
    return layout;
  }
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i];
    log$2("Resolving collision between ".concat(l2.i, " at [").concat(l2.x, ",").concat(l2.y, "] and ").concat(collision.i, " at [").concat(collision.x, ",").concat(collision.y, "]"));
    if (collision.moved) continue;
    if (collision.static) {
      layout = moveElementAwayFromCollision(layout, collision, l2, isUserAction, compactType2);
    } else {
      layout = moveElementAwayFromCollision(layout, l2, collision, isUserAction, compactType2);
    }
  }
  return layout;
}
function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction, compactType2, cols) {
  const compactH = compactType2 === "horizontal";
  const compactV = compactType2 === "vertical";
  const preventCollision = collidesWith.static;
  if (isUserAction) {
    isUserAction = false;
    const fakeItem = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: "-1"
    };
    const firstCollision = getFirstCollision(layout, fakeItem);
    const collisionNorth = firstCollision && firstCollision.y + firstCollision.h > collidesWith.y;
    const collisionWest = firstCollision && collidesWith.x + collidesWith.w > firstCollision.x;
    if (!firstCollision) {
      log$2("Doing reverse collision on ".concat(itemToMove.i, " up to [").concat(fakeItem.x, ",").concat(fakeItem.y, "]."));
      return moveElement(layout, itemToMove, compactH ? fakeItem.x : void 0, compactV ? fakeItem.y : void 0, isUserAction, preventCollision, compactType2);
    } else if (collisionNorth && compactV) {
      return moveElement(layout, itemToMove, void 0, itemToMove.y + 1, isUserAction, preventCollision, compactType2);
    } else if (collisionNorth && compactType2 == null) {
      collidesWith.y = itemToMove.y;
      itemToMove.y = itemToMove.y + itemToMove.h;
      return layout;
    } else if (collisionWest && compactH) {
      return moveElement(layout, collidesWith, itemToMove.x, void 0, isUserAction, preventCollision, compactType2);
    }
  }
  const newX = compactH ? itemToMove.x + 1 : void 0;
  const newY = compactV ? itemToMove.y + 1 : void 0;
  if (newX == null && newY == null) {
    return layout;
  }
  return moveElement(layout, itemToMove, compactH ? itemToMove.x + 1 : void 0, compactV ? itemToMove.y + 1 : void 0, isUserAction, preventCollision, compactType2);
}
function perc(num) {
  return num * 100 + "%";
}
const constrainWidth = (left, currentWidth, newWidth, containerWidth) => {
  return left + newWidth > containerWidth ? currentWidth : newWidth;
};
const constrainHeight = (top, currentHeight, newHeight) => {
  return top < 0 ? currentHeight : newHeight;
};
const constrainLeft = (left) => Math.max(0, left);
const constrainTop = (top) => Math.max(0, top);
const resizeNorth = (currentSize, _ref, _containerWidth) => {
  let {
    left,
    height,
    width
  } = _ref;
  const top = currentSize.top - (height - currentSize.height);
  return {
    left,
    width,
    height: constrainHeight(top, currentSize.height, height),
    top: constrainTop(top)
  };
};
const resizeEast = (currentSize, _ref2, containerWidth) => {
  let {
    top,
    left,
    height,
    width
  } = _ref2;
  return {
    top,
    height,
    width: constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
    left: constrainLeft(left)
  };
};
const resizeWest = (currentSize, _ref3, containerWidth) => {
  let {
    top,
    height,
    width
  } = _ref3;
  const left = currentSize.left - (width - currentSize.width);
  return {
    height,
    width: left < 0 ? currentSize.width : constrainWidth(currentSize.left, currentSize.width, width, containerWidth),
    top: constrainTop(top),
    left: constrainLeft(left)
  };
};
const resizeSouth = (currentSize, _ref4, containerWidth) => {
  let {
    top,
    left,
    height,
    width
  } = _ref4;
  return {
    width,
    left,
    height: constrainHeight(top, currentSize.height, height),
    top: constrainTop(top)
  };
};
const resizeNorthEast = function() {
  return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments));
};
const resizeNorthWest = function() {
  return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments));
};
const resizeSouthEast = function() {
  return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments));
};
const resizeSouthWest = function() {
  return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments));
};
const ordinalResizeHandlerMap = {
  n: resizeNorth,
  ne: resizeNorthEast,
  e: resizeEast,
  se: resizeSouthEast,
  s: resizeSouth,
  sw: resizeSouthWest,
  w: resizeWest,
  nw: resizeNorthWest
};
function resizeItemInDirection(direction, currentSize, newSize, containerWidth) {
  const ordinalHandler = ordinalResizeHandlerMap[direction];
  if (!ordinalHandler) return newSize;
  return ordinalHandler(currentSize, _objectSpread$6(_objectSpread$6({}, currentSize), newSize), containerWidth);
}
function setTransform(_ref5) {
  let {
    top,
    left,
    width,
    height
  } = _ref5;
  const translate = "translate(".concat(left, "px,").concat(top, "px)");
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    position: "absolute"
  };
}
function setTopLeft(_ref6) {
  let {
    top,
    left,
    width,
    height
  } = _ref6;
  return {
    top: "".concat(top, "px"),
    left: "".concat(left, "px"),
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    position: "absolute"
  };
}
function sortLayoutItems(layout, compactType2) {
  if (compactType2 === "horizontal") return sortLayoutItemsByColRow(layout);
  if (compactType2 === "vertical") return sortLayoutItemsByRowCol(layout);
  else return layout;
}
function sortLayoutItemsByRowCol(layout) {
  return layout.slice(0).sort(function(a, b) {
    if (a.y > b.y || a.y === b.y && a.x > b.x) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      return 0;
    }
    return -1;
  });
}
function sortLayoutItemsByColRow(layout) {
  return layout.slice(0).sort(function(a, b) {
    if (a.x > b.x || a.x === b.x && a.y > b.y) {
      return 1;
    }
    return -1;
  });
}
function synchronizeLayoutWithChildren(initialLayout, children, cols, compactType2, allowOverlap) {
  initialLayout = initialLayout || [];
  const layout = [];
  _react$3.default.Children.forEach(children, (child) => {
    if ((child === null || child === void 0 ? void 0 : child.key) == null) return;
    const exists = getLayoutItem(initialLayout, String(child.key));
    const g = child.props["data-grid"];
    if (exists && g == null) {
      layout.push(cloneLayoutItem(exists));
    } else {
      if (g) {
        layout.push(cloneLayoutItem(_objectSpread$6(_objectSpread$6({}, g), {}, {
          i: child.key
        })));
      } else {
        layout.push(cloneLayoutItem({
          w: 1,
          h: 1,
          x: 0,
          y: bottom(layout),
          i: String(child.key)
        }));
      }
    }
  });
  const correctedLayout = correctBounds(layout, {
    cols
  });
  return allowOverlap ? correctedLayout : compact(correctedLayout, compactType2, cols);
}
function validateLayout(layout) {
  let contextName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Layout";
  const subProps = ["x", "y", "w", "h"];
  if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");
  for (let i = 0, len = layout.length; i < len; i++) {
    const item = layout[i];
    for (let j = 0; j < subProps.length; j++) {
      const key = subProps[j];
      const value = item[key];
      if (typeof value !== "number" || Number.isNaN(value)) {
        throw new Error("ReactGridLayout: ".concat(contextName, "[").concat(i, "].").concat(key, " must be a number! Received: ").concat(value, " (").concat(typeof value, ")"));
      }
    }
    if (typeof item.i !== "undefined" && typeof item.i !== "string") {
      throw new Error("ReactGridLayout: ".concat(contextName, "[").concat(i, "].i must be a string! Received: ").concat(item.i, " (").concat(typeof item.i, ")"));
    }
  }
}
function compactType(props) {
  const {
    verticalCompact,
    compactType: compactType2
  } = props || {};
  return verticalCompact === false ? null : compactType2;
}
function log$2() {
  return;
}
const noop = () => {
};
utils$1.noop = noop;
var calculateUtils = {};
Object.defineProperty(calculateUtils, "__esModule", {
  value: true
});
calculateUtils.calcGridColWidth = calcGridColWidth;
calculateUtils.calcGridItemPosition = calcGridItemPosition;
calculateUtils.calcGridItemWHPx = calcGridItemWHPx;
calculateUtils.calcWH = calcWH;
calculateUtils.calcXY = calcXY;
calculateUtils.clamp = clamp;
function calcGridColWidth(positionParams) {
  const {
    margin,
    containerPadding,
    containerWidth,
    cols
  } = positionParams;
  return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
}
function calcGridItemWHPx(gridUnits, colOrRowSize, marginPx) {
  if (!Number.isFinite(gridUnits)) return gridUnits;
  return Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
}
function calcGridItemPosition(positionParams, x2, y2, w2, h, state) {
  const {
    margin,
    containerPadding,
    rowHeight
  } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  const out = {};
  if (state && state.resizing) {
    out.width = Math.round(state.resizing.width);
    out.height = Math.round(state.resizing.height);
  } else {
    out.width = calcGridItemWHPx(w2, colWidth, margin[0]);
    out.height = calcGridItemWHPx(h, rowHeight, margin[1]);
  }
  if (state && state.dragging) {
    out.top = Math.round(state.dragging.top);
    out.left = Math.round(state.dragging.left);
  } else if (state && state.resizing && typeof state.resizing.top === "number" && typeof state.resizing.left === "number") {
    out.top = Math.round(state.resizing.top);
    out.left = Math.round(state.resizing.left);
  } else {
    out.top = Math.round((rowHeight + margin[1]) * y2 + containerPadding[1]);
    out.left = Math.round((colWidth + margin[0]) * x2 + containerPadding[0]);
  }
  return out;
}
function calcXY(positionParams, top, left, w2, h) {
  const {
    margin,
    containerPadding,
    cols,
    rowHeight,
    maxRows
  } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  let x2 = Math.round((left - containerPadding[0]) / (colWidth + margin[0]));
  let y2 = Math.round((top - containerPadding[1]) / (rowHeight + margin[1]));
  x2 = clamp(x2, 0, cols - w2);
  y2 = clamp(y2, 0, maxRows - h);
  return {
    x: x2,
    y: y2
  };
}
function calcWH(positionParams, width, height, x2, y2, handle) {
  const {
    margin,
    maxRows,
    cols,
    rowHeight
  } = positionParams;
  const colWidth = calcGridColWidth(positionParams);
  let w2 = Math.round((width + margin[0]) / (colWidth + margin[0]));
  let h = Math.round((height + margin[1]) / (rowHeight + margin[1]));
  let _w = clamp(w2, 0, cols - x2);
  let _h = clamp(h, 0, maxRows - y2);
  if (["sw", "w", "nw"].indexOf(handle) !== -1) {
    _w = clamp(w2, 0, cols);
  }
  if (["nw", "n", "ne"].indexOf(handle) !== -1) {
    _h = clamp(h, 0, maxRows);
  }
  return {
    w: _w,
    h: _h
  };
}
function clamp(num, lowerBound, upperBound) {
  return Math.max(Math.min(num, upperBound), lowerBound);
}
var GridItem$1 = {};
var propTypes$1 = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes$1.exports = factoryWithThrowingShims();
}
var propTypesExports = propTypes$1.exports;
var cjs = { exports: {} };
var Draggable$1 = {};
var domFns = {};
var shims = {};
Object.defineProperty(shims, "__esModule", {
  value: true
});
shims.dontSetMe = dontSetMe;
shims.findInArray = findInArray;
shims.int = int;
shims.isFunction = isFunction;
shims.isNum = isNum;
function findInArray(array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
function isFunction(func) {
  return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
}
function isNum(num) {
  return typeof num === "number" && !isNaN(num);
}
function int(a) {
  return parseInt(a, 10);
}
function dontSetMe(props, propName, componentName) {
  if (props[propName]) {
    return new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}
var getPrefix$1 = {};
Object.defineProperty(getPrefix$1, "__esModule", {
  value: true
});
getPrefix$1.browserPrefixToKey = browserPrefixToKey;
getPrefix$1.browserPrefixToStyle = browserPrefixToStyle;
getPrefix$1.default = void 0;
getPrefix$1.getPrefix = getPrefix;
const prefixes = ["Moz", "Webkit", "O", "ms"];
function getPrefix() {
  var _a, _b;
  let prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
  if (typeof window === "undefined") return "";
  const style = (_b = (_a = window.document) == null ? void 0 : _a.documentElement) == null ? void 0 : _b.style;
  if (!style) return "";
  if (prop in style) return "";
  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }
  return "";
}
function browserPrefixToKey(prop, prefix) {
  return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
}
function browserPrefixToStyle(prop, prefix) {
  return prefix ? `-${prefix.toLowerCase()}-${prop}` : prop;
}
function kebabToTitleCase(str) {
  let out = "";
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === "-") {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}
getPrefix$1.default = getPrefix();
Object.defineProperty(domFns, "__esModule", {
  value: true
});
domFns.addClassName = addClassName;
domFns.addEvent = addEvent;
domFns.addUserSelectStyles = addUserSelectStyles;
domFns.createCSSTransform = createCSSTransform;
domFns.createSVGTransform = createSVGTransform;
domFns.getTouch = getTouch;
domFns.getTouchIdentifier = getTouchIdentifier;
domFns.getTranslation = getTranslation;
domFns.innerHeight = innerHeight;
domFns.innerWidth = innerWidth;
domFns.matchesSelector = matchesSelector;
domFns.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
domFns.offsetXYFromParent = offsetXYFromParent;
domFns.outerHeight = outerHeight;
domFns.outerWidth = outerWidth;
domFns.removeClassName = removeClassName;
domFns.removeEvent = removeEvent;
domFns.scheduleRemoveUserSelectStyles = scheduleRemoveUserSelectStyles;
var _shims$2 = shims;
var _getPrefix = _interopRequireWildcard$6(getPrefix$1);
function _interopRequireWildcard$6(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$6 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
let matchesSelectorFunc = "";
function matchesSelector(el2, selector) {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims$2.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(method) {
      return (0, _shims$2.isFunction)(el2[method]);
    });
  }
  if (!(0, _shims$2.isFunction)(el2[matchesSelectorFunc])) return false;
  return el2[matchesSelectorFunc](selector);
}
function matchesSelectorAndParentsTo(el2, selector, baseNode) {
  let node = el2;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);
  return false;
}
function addEvent(el2, event, handler, inputOptions) {
  if (!el2) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  if (el2.addEventListener) {
    el2.addEventListener(event, handler, options);
  } else if (el2.attachEvent) {
    el2.attachEvent("on" + event, handler);
  } else {
    el2["on" + event] = handler;
  }
}
function removeEvent(el2, event, handler, inputOptions) {
  if (!el2) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  if (el2.removeEventListener) {
    el2.removeEventListener(event, handler, options);
  } else if (el2.detachEvent) {
    el2.detachEvent("on" + event, handler);
  } else {
    el2["on" + event] = null;
  }
}
function outerHeight(node) {
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims$2.int)(computedStyle.borderTopWidth);
  height += (0, _shims$2.int)(computedStyle.borderBottomWidth);
  return height;
}
function outerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims$2.int)(computedStyle.borderLeftWidth);
  width += (0, _shims$2.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node) {
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims$2.int)(computedStyle.paddingTop);
  height -= (0, _shims$2.int)(computedStyle.paddingBottom);
  return height;
}
function innerWidth(node) {
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims$2.int)(computedStyle.paddingLeft);
  width -= (0, _shims$2.int)(computedStyle.paddingRight);
  return width;
}
function offsetXYFromParent(evt, offsetParent, scale) {
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  const x2 = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y2 = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return {
    x: x2,
    y: y2
  };
}
function createCSSTransform(controlPos, positionOffset) {
  const translation = getTranslation(controlPos, positionOffset, "px");
  return {
    [(0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default)]: translation
  };
}
function createSVGTransform(controlPos, positionOffset) {
  const translation = getTranslation(controlPos, positionOffset, "");
  return translation;
}
function getTranslation(_ref, positionOffset, unitSuffix) {
  let {
    x: x2,
    y: y2
  } = _ref;
  let translation = `translate(${x2}${unitSuffix},${y2}${unitSuffix})`;
  if (positionOffset) {
    const defaultX = `${typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix}`;
    const defaultY = `${typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix}`;
    translation = `translate(${defaultX}, ${defaultY})` + translation;
  }
  return translation;
}
function getTouch(e2, identifier) {
  return e2.targetTouches && (0, _shims$2.findInArray)(e2.targetTouches, (t2) => identifier === t2.identifier) || e2.changedTouches && (0, _shims$2.findInArray)(e2.changedTouches, (t2) => identifier === t2.identifier);
}
function getTouchIdentifier(e2) {
  if (e2.targetTouches && e2.targetTouches[0]) return e2.targetTouches[0].identifier;
  if (e2.changedTouches && e2.changedTouches[0]) return e2.changedTouches[0].identifier;
}
function addUserSelectStyles(doc) {
  if (!doc) return;
  let styleEl = doc.getElementById("react-draggable-style-el");
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.type = "text/css";
    styleEl.id = "react-draggable-style-el";
    styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
    styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, "react-draggable-transparent-selection");
}
function scheduleRemoveUserSelectStyles(doc) {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      removeUserSelectStyles(doc);
    });
  } else {
    removeUserSelectStyles(doc);
  }
}
function removeUserSelectStyles(doc) {
  if (!doc) return;
  try {
    if (doc.body) removeClassName(doc.body, "react-draggable-transparent-selection");
    if (doc.selection) {
      doc.selection.empty();
    } else {
      const selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== "Caret") {
        selection.removeAllRanges();
      }
    }
  } catch (e2) {
  }
}
function addClassName(el2, className) {
  if (el2.classList) {
    el2.classList.add(className);
  } else {
    if (!el2.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
      el2.className += ` ${className}`;
    }
  }
}
function removeClassName(el2, className) {
  if (el2.classList) {
    el2.classList.remove(className);
  } else {
    el2.className = el2.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, "g"), "");
  }
}
var positionFns = {};
Object.defineProperty(positionFns, "__esModule", {
  value: true
});
positionFns.canDragX = canDragX;
positionFns.canDragY = canDragY;
positionFns.createCoreData = createCoreData;
positionFns.createDraggableData = createDraggableData;
positionFns.getBoundPosition = getBoundPosition;
positionFns.getControlPosition = getControlPosition;
positionFns.snapToGrid = snapToGrid;
var _shims$1 = shims;
var _domFns$1 = domFns;
function getBoundPosition(draggable, x2, y2) {
  if (!draggable.props.bounds) return [x2, y2];
  let {
    bounds
  } = draggable.props;
  bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
  const node = findDOMNode(draggable);
  if (typeof bounds === "string") {
    const {
      ownerDocument
    } = node;
    const ownerWindow = ownerDocument.defaultView;
    let boundNode;
    if (bounds === "parent") {
      boundNode = node.parentNode;
    } else {
      const rootNode = node.getRootNode();
      boundNode = rootNode.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const boundNodeEl = boundNode;
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    bounds = {
      left: -node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingLeft) + (0, _shims$1.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingTop) + (0, _shims$1.int)(nodeStyle.marginTop),
      right: (0, _domFns$1.innerWidth)(boundNodeEl) - (0, _domFns$1.outerWidth)(node) - node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingRight) - (0, _shims$1.int)(nodeStyle.marginRight),
      bottom: (0, _domFns$1.innerHeight)(boundNodeEl) - (0, _domFns$1.outerHeight)(node) - node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingBottom) - (0, _shims$1.int)(nodeStyle.marginBottom)
    };
  }
  if ((0, _shims$1.isNum)(bounds.right)) x2 = Math.min(x2, bounds.right);
  if ((0, _shims$1.isNum)(bounds.bottom)) y2 = Math.min(y2, bounds.bottom);
  if ((0, _shims$1.isNum)(bounds.left)) x2 = Math.max(x2, bounds.left);
  if ((0, _shims$1.isNum)(bounds.top)) y2 = Math.max(y2, bounds.top);
  return [x2, y2];
}
function snapToGrid(grid, pendingX, pendingY) {
  const x2 = Math.round(pendingX / grid[0]) * grid[0];
  const y2 = Math.round(pendingY / grid[1]) * grid[1];
  return [x2, y2];
}
function canDragX(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "x";
}
function canDragY(draggable) {
  return draggable.props.axis === "both" || draggable.props.axis === "y";
}
function getControlPosition(e2, touchIdentifier, draggableCore) {
  const touchObj = typeof touchIdentifier === "number" ? (0, _domFns$1.getTouch)(e2, touchIdentifier) : null;
  if (typeof touchIdentifier === "number" && !touchObj) return null;
  const node = findDOMNode(draggableCore);
  const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns$1.offsetXYFromParent)(touchObj || e2, offsetParent, draggableCore.props.scale);
}
function createCoreData(draggable, x2, y2) {
  const isStart = !(0, _shims$1.isNum)(draggable.lastX);
  const node = findDOMNode(draggable);
  if (isStart) {
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x2,
      lastY: y2,
      x: x2,
      y: y2
    };
  } else {
    return {
      node,
      deltaX: x2 - draggable.lastX,
      deltaY: y2 - draggable.lastY,
      lastX: draggable.lastX,
      lastY: draggable.lastY,
      x: x2,
      y: y2
    };
  }
}
function createDraggableData(draggable, coreData) {
  const scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}
function cloneBounds(bounds) {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}
function findDOMNode(draggable) {
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error("<DraggableCore>: Unmounted during event!");
  }
  return node;
}
var DraggableCore$2 = {};
var log$1 = {};
Object.defineProperty(log$1, "__esModule", {
  value: true
});
log$1.default = log;
function log() {
}
Object.defineProperty(DraggableCore$2, "__esModule", {
  value: true
});
DraggableCore$2.default = void 0;
var React$5 = _interopRequireWildcard$5(reactExports);
var _propTypes$7 = _interopRequireDefault$8(propTypesExports);
var _reactDom$1 = _interopRequireDefault$8(reactDomExports);
var _domFns = domFns;
var _positionFns = positionFns;
var _shims = shims;
var _log = _interopRequireDefault$8(log$1);
function _interopRequireDefault$8(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function _interopRequireWildcard$5(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$5 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function _defineProperty$7(e2, r2, t2) {
  return (r2 = _toPropertyKey$7(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$7(t2) {
  var i = _toPrimitive$7(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
const eventsFor = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};
let dragEventFor = eventsFor.mouse;
let DraggableCore$1 = class DraggableCore extends React$5.Component {
  constructor() {
    super(...arguments);
    _defineProperty$7(this, "dragging", false);
    _defineProperty$7(this, "lastX", NaN);
    _defineProperty$7(this, "lastY", NaN);
    _defineProperty$7(this, "touchIdentifier", null);
    _defineProperty$7(this, "mounted", false);
    _defineProperty$7(this, "handleDragStart", (e2) => {
      this.props.onMouseDown(e2);
      if (!this.props.allowAnyClick && typeof e2.button === "number" && e2.button !== 0) return false;
      const thisNode = this.findDOMNode();
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error("<DraggableCore> not mounted on DragStart!");
      }
      const {
        ownerDocument
      } = thisNode;
      if (this.props.disabled || !(e2.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e2.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e2.target, this.props.cancel, thisNode)) {
        return;
      }
      if (e2.type === "touchstart" && !this.props.allowMobileScroll) e2.preventDefault();
      const touchIdentifier = (0, _domFns.getTouchIdentifier)(e2);
      this.touchIdentifier = touchIdentifier;
      const position = (0, _positionFns.getControlPosition)(e2, touchIdentifier, this);
      if (position == null) return;
      const {
        x: x2,
        y: y2
      } = position;
      const coreEvent = (0, _positionFns.createCoreData)(this, x2, y2);
      (0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
      (0, _log.default)("calling", this.props.onStart);
      const shouldUpdate = this.props.onStart(e2, coreEvent);
      if (shouldUpdate === false || this.mounted === false) return;
      if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);
      this.dragging = true;
      this.lastX = x2;
      this.lastY = y2;
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
    });
    _defineProperty$7(this, "handleDrag", (e2) => {
      const position = (0, _positionFns.getControlPosition)(e2, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x: x2,
        y: y2
      } = position;
      if (Array.isArray(this.props.grid)) {
        let deltaX = x2 - this.lastX, deltaY = y2 - this.lastY;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        if (!deltaX && !deltaY) return;
        x2 = this.lastX + deltaX, y2 = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x2, y2);
      (0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
      const shouldUpdate = this.props.onDrag(e2, coreEvent);
      if (shouldUpdate === false || this.mounted === false) {
        try {
          this.handleDragStop(new MouseEvent("mouseup"));
        } catch (err) {
          const event = document.createEvent("MouseEvents");
          event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          this.handleDragStop(event);
        }
        return;
      }
      this.lastX = x2;
      this.lastY = y2;
    });
    _defineProperty$7(this, "handleDragStop", (e2) => {
      if (!this.dragging) return;
      const position = (0, _positionFns.getControlPosition)(e2, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x: x2,
        y: y2
      } = position;
      if (Array.isArray(this.props.grid)) {
        let deltaX = x2 - this.lastX || 0;
        let deltaY = y2 - this.lastY || 0;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        x2 = this.lastX + deltaX, y2 = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x2, y2);
      const shouldContinue = this.props.onStop(e2, coreEvent);
      if (shouldContinue === false || this.mounted === false) return false;
      const thisNode = this.findDOMNode();
      if (thisNode) {
        if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(thisNode.ownerDocument);
      }
      (0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
      this.dragging = false;
      this.lastX = NaN;
      this.lastY = NaN;
      if (thisNode) {
        (0, _log.default)("DraggableCore: Removing handlers");
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
      }
    });
    _defineProperty$7(this, "onMouseDown", (e2) => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStart(e2);
    });
    _defineProperty$7(this, "onMouseUp", (e2) => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStop(e2);
    });
    _defineProperty$7(this, "onTouchStart", (e2) => {
      dragEventFor = eventsFor.touch;
      return this.handleDragStart(e2);
    });
    _defineProperty$7(this, "onTouchEnd", (e2) => {
      dragEventFor = eventsFor.touch;
      return this.handleDragStop(e2);
    });
  }
  componentDidMount() {
    this.mounted = true;
    const thisNode = this.findDOMNode();
    if (thisNode) {
      (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const {
        ownerDocument
      } = thisNode;
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
      if (this.props.enableUserSelectHack) (0, _domFns.scheduleRemoveUserSelectStyles)(ownerDocument);
    }
  }
  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode() {
    var _a, _b, _c;
    return ((_a = this.props) == null ? void 0 : _a.nodeRef) ? (_c = (_b = this.props) == null ? void 0 : _b.nodeRef) == null ? void 0 : _c.current : _reactDom$1.default.findDOMNode(this);
  }
  render() {
    return /* @__PURE__ */ React$5.cloneElement(React$5.Children.only(this.props.children), {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    });
  }
};
DraggableCore$2.default = DraggableCore$1;
_defineProperty$7(DraggableCore$1, "displayName", "DraggableCore");
_defineProperty$7(DraggableCore$1, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes$7.default.bool,
  /**
   * `allowMobileScroll` turns off cancellation of the 'touchstart' event
   * on mobile devices. Only enable this if you are having trouble with click
   * events. Prefer using 'handle' / 'cancel' instead.
   *
   * Defaults to `false`.
   */
  allowMobileScroll: _propTypes$7.default.bool,
  children: _propTypes$7.default.node.isRequired,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes$7.default.bool,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes$7.default.bool,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function(props, propName) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error("Draggable's offsetParent must be a DOM Node.");
    }
  },
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes$7.default.arrayOf(_propTypes$7.default.number),
  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes$7.default.string,
  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes$7.default.string,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: _propTypes$7.default.object,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes$7.default.func,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes$7.default.func,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes$7.default.func,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes$7.default.func,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: _propTypes$7.default.number,
  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
_defineProperty$7(DraggableCore$1, "defaultProps", {
  allowAnyClick: false,
  // by default only accept left click
  allowMobileScroll: false,
  disabled: false,
  enableUserSelectHack: true,
  onStart: function() {
  },
  onDrag: function() {
  },
  onStop: function() {
  },
  onMouseDown: function() {
  },
  scale: 1
});
(function(exports$1) {
  Object.defineProperty(exports$1, "__esModule", {
    value: true
  });
  Object.defineProperty(exports$1, "DraggableCore", {
    enumerable: true,
    get: function() {
      return _DraggableCore.default;
    }
  });
  exports$1.default = void 0;
  var React2 = _interopRequireWildcard2(reactExports);
  var _propTypes3 = _interopRequireDefault2(propTypesExports);
  var _reactDom2 = _interopRequireDefault2(reactDomExports);
  var _clsx2 = clsxExports;
  var _domFns2 = domFns;
  var _positionFns2 = positionFns;
  var _shims2 = shims;
  var _DraggableCore = _interopRequireDefault2(DraggableCore$2);
  var _log2 = _interopRequireDefault2(log$1);
  function _interopRequireDefault2(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }
  function _interopRequireWildcard2(e2, t2) {
    if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
    return (_interopRequireWildcard2 = function(e3, t3) {
      if (!t3 && e3 && e3.__esModule) return e3;
      var o, i, f2 = { __proto__: null, default: e3 };
      if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
      if (o = t3 ? n2 : r2) {
        if (o.has(e3)) return o.get(e3);
        o.set(e3, f2);
      }
      for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
      return f2;
    })(e2, t2);
  }
  function _extends2() {
    return _extends2 = Object.assign ? Object.assign.bind() : function(n2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var t2 = arguments[e2];
        for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
      }
      return n2;
    }, _extends2.apply(null, arguments);
  }
  function _defineProperty2(e2, r2, t2) {
    return (r2 = _toPropertyKey2(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
  }
  function _toPropertyKey2(t2) {
    var i = _toPrimitive2(t2, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toPrimitive2(t2, r2) {
    if ("object" != typeof t2 || !t2) return t2;
    var e2 = t2[Symbol.toPrimitive];
    if (void 0 !== e2) {
      var i = e2.call(t2, r2);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r2 ? String : Number)(t2);
  }
  class Draggable2 extends React2.Component {
    // React 16.3+
    // Arity (props, state)
    static getDerivedStateFromProps(_ref, _ref2) {
      let {
        position
      } = _ref;
      let {
        prevPropsPosition
      } = _ref2;
      if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
        (0, _log2.default)("Draggable: getDerivedStateFromProps %j", {
          position,
          prevPropsPosition
        });
        return {
          x: position.x,
          y: position.y,
          prevPropsPosition: {
            ...position
          }
        };
      }
      return null;
    }
    constructor(props) {
      super(props);
      _defineProperty2(this, "onDragStart", (e2, coreData) => {
        (0, _log2.default)("Draggable: onDragStart: %j", coreData);
        const shouldStart = this.props.onStart(e2, (0, _positionFns2.createDraggableData)(this, coreData));
        if (shouldStart === false) return false;
        this.setState({
          dragging: true,
          dragged: true
        });
      });
      _defineProperty2(this, "onDrag", (e2, coreData) => {
        if (!this.state.dragging) return false;
        (0, _log2.default)("Draggable: onDrag: %j", coreData);
        const uiData = (0, _positionFns2.createDraggableData)(this, coreData);
        const newState = {
          x: uiData.x,
          y: uiData.y,
          slackX: 0,
          slackY: 0
        };
        if (this.props.bounds) {
          const {
            x: x2,
            y: y2
          } = newState;
          newState.x += this.state.slackX;
          newState.y += this.state.slackY;
          const [newStateX, newStateY] = (0, _positionFns2.getBoundPosition)(this, newState.x, newState.y);
          newState.x = newStateX;
          newState.y = newStateY;
          newState.slackX = this.state.slackX + (x2 - newState.x);
          newState.slackY = this.state.slackY + (y2 - newState.y);
          uiData.x = newState.x;
          uiData.y = newState.y;
          uiData.deltaX = newState.x - this.state.x;
          uiData.deltaY = newState.y - this.state.y;
        }
        const shouldUpdate = this.props.onDrag(e2, uiData);
        if (shouldUpdate === false) return false;
        this.setState(newState);
      });
      _defineProperty2(this, "onDragStop", (e2, coreData) => {
        if (!this.state.dragging) return false;
        const shouldContinue = this.props.onStop(e2, (0, _positionFns2.createDraggableData)(this, coreData));
        if (shouldContinue === false) return false;
        (0, _log2.default)("Draggable: onDragStop: %j", coreData);
        const newState = {
          dragging: false,
          slackX: 0,
          slackY: 0
        };
        const controlled = Boolean(this.props.position);
        if (controlled) {
          const {
            x: x2,
            y: y2
          } = this.props.position;
          newState.x = x2;
          newState.y = y2;
        }
        this.setState(newState);
      });
      this.state = {
        // Whether or not we are currently dragging.
        dragging: false,
        // Whether or not we have been dragged before.
        dragged: false,
        // Current transform x and y.
        x: props.position ? props.position.x : props.defaultPosition.x,
        y: props.position ? props.position.y : props.defaultPosition.y,
        prevPropsPosition: {
          ...props.position
        },
        // Used for compensating for out-of-bounds drags
        slackX: 0,
        slackY: 0,
        // Can only determine if SVG after mounting
        isElementSVG: false
      };
      if (props.position && !(props.onDrag || props.onStop)) {
        console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
      }
    }
    componentDidMount() {
      if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) {
        this.setState({
          isElementSVG: true
        });
      }
    }
    componentWillUnmount() {
      if (this.state.dragging) {
        this.setState({
          dragging: false
        });
      }
    }
    // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.
    findDOMNode() {
      var _a, _b;
      return ((_b = (_a = this.props) == null ? void 0 : _a.nodeRef) == null ? void 0 : _b.current) ?? _reactDom2.default.findDOMNode(this);
    }
    render() {
      const {
        axis,
        bounds,
        children,
        defaultPosition,
        defaultClassName,
        defaultClassNameDragging,
        defaultClassNameDragged,
        position,
        positionOffset,
        scale,
        ...draggableCoreProps
      } = this.props;
      let style = {};
      let svgTransform = null;
      const controlled = Boolean(position);
      const draggable = !controlled || this.state.dragging;
      const validPosition = position || defaultPosition;
      const transformOpts = {
        // Set left if horizontal drag is enabled
        x: (0, _positionFns2.canDragX)(this) && draggable ? this.state.x : validPosition.x,
        // Set top if vertical drag is enabled
        y: (0, _positionFns2.canDragY)(this) && draggable ? this.state.y : validPosition.y
      };
      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns2.createSVGTransform)(transformOpts, positionOffset);
      } else {
        style = (0, _domFns2.createCSSTransform)(transformOpts, positionOffset);
      }
      const className = (0, _clsx2.clsx)(children.props.className || "", defaultClassName, {
        [defaultClassNameDragging]: this.state.dragging,
        [defaultClassNameDragged]: this.state.dragged
      });
      return /* @__PURE__ */ React2.createElement(_DraggableCore.default, _extends2({}, draggableCoreProps, {
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop
      }), /* @__PURE__ */ React2.cloneElement(React2.Children.only(children), {
        className,
        style: {
          ...children.props.style,
          ...style
        },
        transform: svgTransform
      }));
    }
  }
  exports$1.default = Draggable2;
  _defineProperty2(Draggable2, "displayName", "Draggable");
  _defineProperty2(Draggable2, "propTypes", {
    // Accepts all props <DraggableCore> accepts.
    ..._DraggableCore.default.propTypes,
    /**
     * `axis` determines which axis the draggable can move.
     *
     *  Note that all callbacks will still return data as normal. This only
     *  controls flushing to the DOM.
     *
     * 'both' allows movement horizontally and vertically.
     * 'x' limits movement to horizontal axis.
     * 'y' limits movement to vertical axis.
     * 'none' limits all movement.
     *
     * Defaults to 'both'.
     */
    axis: _propTypes3.default.oneOf(["both", "x", "y", "none"]),
    /**
     * `bounds` determines the range of movement available to the element.
     * Available values are:
     *
     * 'parent' restricts movement within the Draggable's parent node.
     *
     * Alternatively, pass an object with the following properties, all of which are optional:
     *
     * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
     *
     * All values are in px.
     *
     * Example:
     *
     * ```jsx
     *   let App = React.createClass({
     *       render: function () {
     *         return (
     *            <Draggable bounds={{right: 300, bottom: 300}}>
     *              <div>Content</div>
     *           </Draggable>
     *         );
     *       }
     *   });
     * ```
     */
    bounds: _propTypes3.default.oneOfType([_propTypes3.default.shape({
      left: _propTypes3.default.number,
      right: _propTypes3.default.number,
      top: _propTypes3.default.number,
      bottom: _propTypes3.default.number
    }), _propTypes3.default.string, _propTypes3.default.oneOf([false])]),
    defaultClassName: _propTypes3.default.string,
    defaultClassNameDragging: _propTypes3.default.string,
    defaultClassNameDragged: _propTypes3.default.string,
    /**
     * `defaultPosition` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable defaultPosition={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    defaultPosition: _propTypes3.default.shape({
      x: _propTypes3.default.number,
      y: _propTypes3.default.number
    }),
    positionOffset: _propTypes3.default.shape({
      x: _propTypes3.default.oneOfType([_propTypes3.default.number, _propTypes3.default.string]),
      y: _propTypes3.default.oneOfType([_propTypes3.default.number, _propTypes3.default.string])
    }),
    /**
     * `position`, if present, defines the current position of the element.
     *
     *  This is similar to how form elements in React work - if no `position` is supplied, the component
     *  is uncontrolled.
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable position={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    position: _propTypes3.default.shape({
      x: _propTypes3.default.number,
      y: _propTypes3.default.number
    }),
    /**
     * These properties should be defined on the child, not here.
     */
    className: _shims2.dontSetMe,
    style: _shims2.dontSetMe,
    transform: _shims2.dontSetMe
  });
  _defineProperty2(Draggable2, "defaultProps", {
    ..._DraggableCore.default.defaultProps,
    axis: "both",
    bounds: false,
    defaultClassName: "react-draggable",
    defaultClassNameDragging: "react-draggable-dragging",
    defaultClassNameDragged: "react-draggable-dragged",
    defaultPosition: {
      x: 0,
      y: 0
    },
    scale: 1
  });
})(Draggable$1);
const {
  default: Draggable,
  DraggableCore: DraggableCore2
} = Draggable$1;
cjs.exports = Draggable;
cjs.exports.default = Draggable;
cjs.exports.DraggableCore = DraggableCore2;
var cjsExports = cjs.exports;
var reactResizable = { exports: {} };
var Resizable$1 = {};
var utils = {};
utils.__esModule = true;
utils.cloneElement = cloneElement;
var _react$2 = _interopRequireDefault$7(reactExports);
function _interopRequireDefault$7(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function ownKeys$5(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$5(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$5(Object(t2), true).forEach(function(r3) {
      _defineProperty$6(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$5(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$6(e2, r2, t2) {
  return (r2 = _toPropertyKey$6(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$6(t2) {
  var i = _toPrimitive$6(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function cloneElement(element, props) {
  if (props.style && element.props.style) {
    props.style = _objectSpread$5(_objectSpread$5({}, element.props.style), props.style);
  }
  if (props.className && element.props.className) {
    props.className = `${element.props.className} ${props.className}`;
  }
  return /* @__PURE__ */ _react$2.default.cloneElement(element, props);
}
var propTypes = {};
propTypes.__esModule = true;
propTypes.resizableProps = void 0;
var _propTypes$6 = _interopRequireDefault$6(propTypesExports);
function _interopRequireDefault$6(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
propTypes.resizableProps = {
  /*
  * Restricts resizing to a particular axis (default: 'both')
  * 'both' - allows resizing by width or height
  * 'x' - only allows the width to be changed
  * 'y' - only allows the height to be changed
  * 'none' - disables resizing altogether
  * */
  axis: _propTypes$6.default.oneOf(["both", "x", "y", "none"]),
  className: _propTypes$6.default.string,
  /*
  * Require that one and only one child be present.
  * */
  children: _propTypes$6.default.element.isRequired,
  /*
  * These will be passed wholesale to react-draggable's DraggableCore
  * */
  draggableOpts: _propTypes$6.default.shape({
    allowAnyClick: _propTypes$6.default.bool,
    cancel: _propTypes$6.default.string,
    children: _propTypes$6.default.node,
    disabled: _propTypes$6.default.bool,
    enableUserSelectHack: _propTypes$6.default.bool,
    // #251: Check for Element to support SSR environments where DOM globals don't exist
    offsetParent: typeof Element !== "undefined" ? _propTypes$6.default.instanceOf(Element) : _propTypes$6.default.any,
    grid: _propTypes$6.default.arrayOf(_propTypes$6.default.number),
    handle: _propTypes$6.default.string,
    nodeRef: _propTypes$6.default.object,
    onStart: _propTypes$6.default.func,
    onDrag: _propTypes$6.default.func,
    onStop: _propTypes$6.default.func,
    onMouseDown: _propTypes$6.default.func,
    scale: _propTypes$6.default.number
  }),
  /*
  * Initial height
  * */
  height: function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const [props] = args;
    if (props.axis === "both" || props.axis === "y") {
      return _propTypes$6.default.number.isRequired(...args);
    }
    return _propTypes$6.default.number(...args);
  },
  /*
  * Customize cursor resize handle
  * */
  handle: _propTypes$6.default.oneOfType([_propTypes$6.default.node, _propTypes$6.default.func]),
  /*
  * If you change this, be sure to update your css
  * */
  handleSize: _propTypes$6.default.arrayOf(_propTypes$6.default.number),
  lockAspectRatio: _propTypes$6.default.bool,
  /*
  * Max X & Y measure
  * */
  maxConstraints: _propTypes$6.default.arrayOf(_propTypes$6.default.number),
  /*
  * Min X & Y measure
  * */
  minConstraints: _propTypes$6.default.arrayOf(_propTypes$6.default.number),
  /*
  * Called on stop resize event
  * */
  onResizeStop: _propTypes$6.default.func,
  /*
  * Called on start resize event
  * */
  onResizeStart: _propTypes$6.default.func,
  /*
  * Called on resize event
  * */
  onResize: _propTypes$6.default.func,
  /*
  * Defines which resize handles should be rendered (default: 'se')
  * 's' - South handle (bottom-center)
  * 'w' - West handle (left-center)
  * 'e' - East handle (right-center)
  * 'n' - North handle (top-center)
  * 'sw' - Southwest handle (bottom-left)
  * 'nw' - Northwest handle (top-left)
  * 'se' - Southeast handle (bottom-right)
  * 'ne' - Northeast handle (top-center)
  * */
  resizeHandles: _propTypes$6.default.arrayOf(_propTypes$6.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"])),
  /*
  * If `transform: scale(n)` is set on the parent, this should be set to `n`.
  * */
  transformScale: _propTypes$6.default.number,
  /*
   * Initial width
   */
  width: function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    const [props] = args;
    if (props.axis === "both" || props.axis === "x") {
      return _propTypes$6.default.number.isRequired(...args);
    }
    return _propTypes$6.default.number(...args);
  }
};
Resizable$1.__esModule = true;
Resizable$1.default = void 0;
var React$4 = _interopRequireWildcard$4(reactExports);
var _reactDraggable$1 = cjsExports;
var _utils$4 = utils;
var _propTypes$5 = propTypes;
const _excluded$3 = ["children", "className", "draggableOpts", "width", "height", "handle", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"];
function _interopRequireWildcard$4(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$4 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$3(e2, t2) {
  if (null == e2) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$3(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e2, o) && (i[o] = e2[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$3(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e2.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function ownKeys$4(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$4(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$4(Object(t2), true).forEach(function(r3) {
      _defineProperty$5(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$4(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$5(e2, r2, t2) {
  return (r2 = _toPropertyKey$5(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$5(t2) {
  var i = _toPrimitive$5(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class Resizable extends React$4.Component {
  constructor() {
    super(...arguments);
    this.handleRefs = {};
    this.lastHandleRect = null;
    this.slack = null;
    this.lastSize = null;
  }
  componentWillUnmount() {
    this.resetData();
  }
  resetData() {
    this.lastHandleRect = this.slack = this.lastSize = null;
  }
  // Clamp width and height within provided constraints
  runConstraints(width, height) {
    const {
      minConstraints,
      maxConstraints,
      lockAspectRatio
    } = this.props;
    if (!minConstraints && !maxConstraints && !lockAspectRatio) return [width, height];
    if (lockAspectRatio) {
      const ratio = this.props.width / this.props.height;
      const deltaW = width - this.props.width;
      const deltaH = height - this.props.height;
      if (Math.abs(deltaW) > Math.abs(deltaH * ratio)) {
        height = width / ratio;
      } else {
        width = height * ratio;
      }
    }
    const [oldW, oldH] = [width, height];
    let [slackW, slackH] = this.slack || [0, 0];
    width += slackW;
    height += slackH;
    if (minConstraints) {
      width = Math.max(minConstraints[0], width);
      height = Math.max(minConstraints[1], height);
    }
    if (maxConstraints) {
      width = Math.min(maxConstraints[0], width);
      height = Math.min(maxConstraints[1], height);
    }
    this.slack = [slackW + (oldW - width), slackH + (oldH - height)];
    return [width, height];
  }
  /**
   * Wrapper around drag events to provide more useful data.
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  resizeHandler(handlerName, axis) {
    return (e2, _ref) => {
      var _a;
      let {
        node,
        deltaX,
        deltaY
      } = _ref;
      if (handlerName === "onResizeStart") this.resetData();
      const canDragX2 = (this.props.axis === "both" || this.props.axis === "x") && axis !== "n" && axis !== "s";
      const canDragY2 = (this.props.axis === "both" || this.props.axis === "y") && axis !== "e" && axis !== "w";
      if (!canDragX2 && !canDragY2) return;
      const axisV = axis[0];
      const axisH = axis[axis.length - 1];
      const handleRect = node.getBoundingClientRect();
      if (this.lastHandleRect != null) {
        if (axisH === "w") {
          const deltaLeftSinceLast = handleRect.left - this.lastHandleRect.left;
          deltaX += deltaLeftSinceLast;
        }
        if (axisV === "n") {
          const deltaTopSinceLast = handleRect.top - this.lastHandleRect.top;
          deltaY += deltaTopSinceLast;
        }
      }
      this.lastHandleRect = handleRect;
      if (axisH === "w") deltaX = -deltaX;
      if (axisV === "n") deltaY = -deltaY;
      let width = this.props.width + (canDragX2 ? deltaX / this.props.transformScale : 0);
      let height = this.props.height + (canDragY2 ? deltaY / this.props.transformScale : 0);
      [width, height] = this.runConstraints(width, height);
      if (handlerName === "onResizeStop" && this.lastSize) {
        ({
          width,
          height
        } = this.lastSize);
      }
      const dimensionsChanged = width !== this.props.width || height !== this.props.height;
      if (handlerName !== "onResizeStop") {
        this.lastSize = {
          width,
          height
        };
      }
      const cb2 = typeof this.props[handlerName] === "function" ? this.props[handlerName] : null;
      const shouldSkipCb = handlerName === "onResize" && !dimensionsChanged;
      if (cb2 && !shouldSkipCb) {
        (_a = e2.persist) == null ? void 0 : _a.call(e2);
        cb2(e2, {
          node,
          size: {
            width,
            height
          },
          handle: axis
        });
      }
      if (handlerName === "onResizeStop") this.resetData();
    };
  }
  // Render a resize handle given an axis & DOM ref. Ref *must* be attached for
  // the underlying draggable library to work properly.
  renderResizeHandle(handleAxis, ref) {
    const {
      handle
    } = this.props;
    if (!handle) {
      return /* @__PURE__ */ React$4.createElement("span", {
        className: `react-resizable-handle react-resizable-handle-${handleAxis}`,
        ref
      });
    }
    if (typeof handle === "function") {
      return handle(handleAxis, ref);
    }
    const isDOMElement = typeof handle.type === "string";
    const props = _objectSpread$4({
      ref
    }, isDOMElement ? {} : {
      handleAxis
    });
    return /* @__PURE__ */ React$4.cloneElement(handle, props);
  }
  render() {
    const _this$props = this.props, {
      children,
      className,
      draggableOpts,
      width,
      height,
      handle,
      handleSize,
      lockAspectRatio,
      axis,
      minConstraints,
      maxConstraints,
      onResize,
      onResizeStop,
      onResizeStart,
      resizeHandles,
      transformScale
    } = _this$props, p2 = _objectWithoutProperties$3(_this$props, _excluded$3);
    return (0, _utils$4.cloneElement)(children, _objectSpread$4(_objectSpread$4({}, p2), {}, {
      className: `${className ? `${className} ` : ""}react-resizable`,
      children: [...React$4.Children.toArray(children.props.children), ...resizeHandles.map((handleAxis) => {
        const ref = this.handleRefs[handleAxis] ?? (this.handleRefs[handleAxis] = /* @__PURE__ */ React$4.createRef());
        return /* @__PURE__ */ React$4.createElement(_reactDraggable$1.DraggableCore, _extends$3({}, draggableOpts, {
          nodeRef: ref,
          key: `resizableHandle-${handleAxis}`,
          onStop: this.resizeHandler("onResizeStop", handleAxis),
          onStart: this.resizeHandler("onResizeStart", handleAxis),
          onDrag: this.resizeHandler("onResize", handleAxis)
        }), this.renderResizeHandle(handleAxis, ref));
      })]
    }));
  }
}
Resizable$1.default = Resizable;
Resizable.propTypes = _propTypes$5.resizableProps;
Resizable.defaultProps = {
  axis: "both",
  handleSize: [20, 20],
  lockAspectRatio: false,
  minConstraints: [20, 20],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ["se"],
  transformScale: 1
};
var ResizableBox$1 = {};
ResizableBox$1.__esModule = true;
ResizableBox$1.default = void 0;
var React$3 = _interopRequireWildcard$3(reactExports);
var _propTypes$4 = _interopRequireDefault$5(propTypesExports);
var _Resizable = _interopRequireDefault$5(Resizable$1);
var _propTypes2 = propTypes;
const _excluded$2 = ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles", "style", "transformScale"];
function _interopRequireDefault$5(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function _interopRequireWildcard$3(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$3 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$2.apply(null, arguments);
}
function ownKeys$3(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$3(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$3(Object(t2), true).forEach(function(r3) {
      _defineProperty$4(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$3(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$4(e2, r2, t2) {
  return (r2 = _toPropertyKey$4(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$4(t2) {
  var i = _toPrimitive$4(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$2(e2, t2) {
  if (null == e2) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$2(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e2, o) && (i[o] = e2[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$2(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e2.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
class ResizableBox extends React$3.Component {
  constructor() {
    super(...arguments);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      propsWidth: this.props.width,
      propsHeight: this.props.height
    };
    this.onResize = (e2, data) => {
      var _a;
      const {
        size
      } = data;
      if (this.props.onResize) {
        (_a = e2.persist) == null ? void 0 : _a.call(e2);
        this.setState(size, () => this.props.onResize && this.props.onResize(e2, data));
      } else {
        this.setState(size);
      }
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.propsWidth !== props.width || state.propsHeight !== props.height) {
      return {
        width: props.width,
        height: props.height,
        propsWidth: props.width,
        propsHeight: props.height
      };
    }
    return null;
  }
  render() {
    const _this$props = this.props, {
      handle,
      handleSize,
      onResize,
      onResizeStart,
      onResizeStop,
      draggableOpts,
      minConstraints,
      maxConstraints,
      lockAspectRatio,
      axis,
      width,
      height,
      resizeHandles,
      style,
      transformScale
    } = _this$props, props = _objectWithoutProperties$2(_this$props, _excluded$2);
    return /* @__PURE__ */ React$3.createElement(_Resizable.default, {
      axis,
      draggableOpts,
      handle,
      handleSize,
      height: this.state.height,
      lockAspectRatio,
      maxConstraints,
      minConstraints,
      onResizeStart,
      onResize: this.onResize,
      onResizeStop,
      resizeHandles,
      transformScale,
      width: this.state.width
    }, /* @__PURE__ */ React$3.createElement("div", _extends$2({}, props, {
      style: _objectSpread$3(_objectSpread$3({}, style), {}, {
        width: this.state.width + "px",
        height: this.state.height + "px"
      })
    })));
  }
}
ResizableBox$1.default = ResizableBox;
ResizableBox.propTypes = _objectSpread$3(_objectSpread$3({}, _propTypes2.resizableProps), {}, {
  children: _propTypes$4.default.element
});
reactResizable.exports = function() {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
};
reactResizable.exports.Resizable = Resizable$1.default;
reactResizable.exports.ResizableBox = ResizableBox$1.default;
var reactResizableExports = reactResizable.exports;
var ReactGridLayoutPropTypes = {};
Object.defineProperty(ReactGridLayoutPropTypes, "__esModule", {
  value: true
});
ReactGridLayoutPropTypes.resizeHandleType = ReactGridLayoutPropTypes.resizeHandleAxesType = ReactGridLayoutPropTypes.default = void 0;
var _propTypes$3 = _interopRequireDefault$4(propTypesExports);
var _react$1 = _interopRequireDefault$4(reactExports);
function _interopRequireDefault$4(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
const resizeHandleAxesType = ReactGridLayoutPropTypes.resizeHandleAxesType = _propTypes$3.default.arrayOf(_propTypes$3.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"]));
const resizeHandleType = ReactGridLayoutPropTypes.resizeHandleType = _propTypes$3.default.oneOfType([_propTypes$3.default.node, _propTypes$3.default.func]);
ReactGridLayoutPropTypes.default = {
  //
  // Basic props
  //
  className: _propTypes$3.default.string,
  style: _propTypes$3.default.object,
  // This can be set explicitly. If it is not set, it will automatically
  // be set to the container width. Note that resizes will *not* cause this to adjust.
  // If you need that behavior, use WidthProvider.
  width: _propTypes$3.default.number,
  // If true, the container height swells and contracts to fit contents
  autoSize: _propTypes$3.default.bool,
  // # of cols.
  cols: _propTypes$3.default.number,
  // A selector that will not be draggable.
  draggableCancel: _propTypes$3.default.string,
  // A selector for the draggable handler
  draggableHandle: _propTypes$3.default.string,
  // Deprecated
  verticalCompact: function(props) {
    if (props.verticalCompact === false && false) ;
  },
  // Choose vertical or hotizontal compaction
  compactType: _propTypes$3.default.oneOf(["vertical", "horizontal"]),
  // layout is an array of object with the format:
  // {x: Number, y: Number, w: Number, h: Number, i: String}
  layout: function(props) {
    var layout = props.layout;
    if (layout === void 0) return;
    utils$1.validateLayout(layout, "layout");
  },
  //
  // Grid Dimensions
  //
  // Margin between items [x, y] in px
  margin: _propTypes$3.default.arrayOf(_propTypes$3.default.number),
  // Padding inside the container [x, y] in px
  containerPadding: _propTypes$3.default.arrayOf(_propTypes$3.default.number),
  // Rows have a static height, but you can change this based on breakpoints if you like
  rowHeight: _propTypes$3.default.number,
  // Default Infinity, but you can specify a max here if you like.
  // Note that this isn't fully fleshed out and won't error if you specify a layout that
  // extends beyond the row capacity. It will, however, not allow users to drag/resize
  // an item past the barrier. They can push items beyond the barrier, though.
  // Intentionally not documented for this reason.
  maxRows: _propTypes$3.default.number,
  //
  // Flags
  //
  isBounded: _propTypes$3.default.bool,
  isDraggable: _propTypes$3.default.bool,
  isResizable: _propTypes$3.default.bool,
  // If true, grid can be placed one over the other.
  allowOverlap: _propTypes$3.default.bool,
  // If true, grid items won't change position when being dragged over.
  preventCollision: _propTypes$3.default.bool,
  // Use CSS transforms instead of top/left
  useCSSTransforms: _propTypes$3.default.bool,
  // parent layout transform scale
  transformScale: _propTypes$3.default.number,
  // If true, an external element can trigger onDrop callback with a specific grid position as a parameter
  isDroppable: _propTypes$3.default.bool,
  // Resize handle options
  resizeHandles: resizeHandleAxesType,
  resizeHandle: resizeHandleType,
  //
  // Callbacks
  //
  // Callback so you can save the layout. Calls after each drag & resize stops.
  onLayoutChange: _propTypes$3.default.func,
  // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e, ?node).
  // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
  onDragStart: _propTypes$3.default.func,
  // Calls on each drag movement.
  onDrag: _propTypes$3.default.func,
  // Calls when drag is complete.
  onDragStop: _propTypes$3.default.func,
  //Calls when resize starts.
  onResizeStart: _propTypes$3.default.func,
  // Calls when resize movement happens.
  onResize: _propTypes$3.default.func,
  // Calls when resize is complete.
  onResizeStop: _propTypes$3.default.func,
  // Calls when some element is dropped.
  onDrop: _propTypes$3.default.func,
  //
  // Other validations
  //
  droppingItem: _propTypes$3.default.shape({
    i: _propTypes$3.default.string.isRequired,
    w: _propTypes$3.default.number.isRequired,
    h: _propTypes$3.default.number.isRequired
  }),
  // Children must not have duplicate keys.
  children: function(props, propName) {
    const children = props[propName];
    const keys = {};
    _react$1.default.Children.forEach(children, function(child) {
      if ((child === null || child === void 0 ? void 0 : child.key) == null) return;
      if (keys[child.key]) {
        throw new Error('Duplicate child key "' + child.key + '" found! This will cause problems in ReactGridLayout.');
      }
      keys[child.key] = true;
    });
  },
  // Optional ref for getting a reference for the wrapping div.
  innerRef: _propTypes$3.default.any
};
Object.defineProperty(GridItem$1, "__esModule", {
  value: true
});
GridItem$1.default = void 0;
var _react = _interopRequireDefault$3(reactExports);
var _reactDom = reactDomExports;
var _propTypes$2 = _interopRequireDefault$3(propTypesExports);
var _reactDraggable = cjsExports;
var _reactResizable = reactResizableExports;
var _utils$3 = utils$1;
var _calculateUtils$1 = calculateUtils;
var _ReactGridLayoutPropTypes$1 = ReactGridLayoutPropTypes;
var _clsx$2 = _interopRequireDefault$3(clsxExports);
function _interopRequireDefault$3(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function ownKeys$2(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$2(Object(t2), true).forEach(function(r3) {
      _defineProperty$3(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$2(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$3(e2, r2, t2) {
  return (r2 = _toPropertyKey$3(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$3(t2) {
  var i = _toPrimitive$3(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class GridItem extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty$3(this, "state", {
      resizing: null,
      dragging: null,
      className: ""
    });
    _defineProperty$3(this, "elementRef", /* @__PURE__ */ _react.default.createRef());
    _defineProperty$3(this, "onDragStart", (e2, _ref) => {
      let {
        node
      } = _ref;
      const {
        onDragStart,
        transformScale
      } = this.props;
      if (!onDragStart) return;
      const newPosition = {
        top: 0,
        left: 0
      };
      const {
        offsetParent
      } = node;
      if (!offsetParent) return;
      const parentRect = offsetParent.getBoundingClientRect();
      const clientRect = node.getBoundingClientRect();
      const cLeft = clientRect.left / transformScale;
      const pLeft = parentRect.left / transformScale;
      const cTop = clientRect.top / transformScale;
      const pTop = parentRect.top / transformScale;
      newPosition.left = cLeft - pLeft + offsetParent.scrollLeft;
      newPosition.top = cTop - pTop + offsetParent.scrollTop;
      this.setState({
        dragging: newPosition
      });
      const {
        x: x2,
        y: y2
      } = (0, _calculateUtils$1.calcXY)(this.getPositionParams(), newPosition.top, newPosition.left, this.props.w, this.props.h);
      return onDragStart.call(this, this.props.i, x2, y2, {
        e: e2,
        node,
        newPosition
      });
    });
    _defineProperty$3(this, "onDrag", (e2, _ref2, dontFlush) => {
      let {
        node,
        deltaX,
        deltaY
      } = _ref2;
      const {
        onDrag
      } = this.props;
      if (!onDrag) return;
      if (!this.state.dragging) {
        throw new Error("onDrag called before onDragStart.");
      }
      let top = this.state.dragging.top + deltaY;
      let left = this.state.dragging.left + deltaX;
      const {
        isBounded,
        i,
        w: w2,
        h,
        containerWidth
      } = this.props;
      const positionParams = this.getPositionParams();
      if (isBounded) {
        const {
          offsetParent
        } = node;
        if (offsetParent) {
          const {
            margin,
            rowHeight
          } = this.props;
          const bottomBoundary = offsetParent.clientHeight - (0, _calculateUtils$1.calcGridItemWHPx)(h, rowHeight, margin[1]);
          top = (0, _calculateUtils$1.clamp)(top, 0, bottomBoundary);
          const colWidth = (0, _calculateUtils$1.calcGridColWidth)(positionParams);
          const rightBoundary = containerWidth - (0, _calculateUtils$1.calcGridItemWHPx)(w2, colWidth, margin[0]);
          left = (0, _calculateUtils$1.clamp)(left, 0, rightBoundary);
        }
      }
      const newPosition = {
        top,
        left
      };
      if (dontFlush) {
        this.setState({
          dragging: newPosition
        });
      } else {
        (0, _reactDom.flushSync)(() => {
          this.setState({
            dragging: newPosition
          });
        });
      }
      const {
        x: x2,
        y: y2
      } = (0, _calculateUtils$1.calcXY)(positionParams, top, left, w2, h);
      return onDrag.call(this, i, x2, y2, {
        e: e2,
        node,
        newPosition
      });
    });
    _defineProperty$3(this, "onDragStop", (e2, _ref3) => {
      let {
        node
      } = _ref3;
      const {
        onDragStop
      } = this.props;
      if (!onDragStop) return;
      if (!this.state.dragging) {
        throw new Error("onDragEnd called before onDragStart.");
      }
      const {
        w: w2,
        h,
        i
      } = this.props;
      const {
        left,
        top
      } = this.state.dragging;
      const newPosition = {
        top,
        left
      };
      this.setState({
        dragging: null
      });
      const {
        x: x2,
        y: y2
      } = (0, _calculateUtils$1.calcXY)(this.getPositionParams(), top, left, w2, h);
      return onDragStop.call(this, i, x2, y2, {
        e: e2,
        node,
        newPosition
      });
    });
    _defineProperty$3(this, "onResizeStop", (e2, callbackData, position) => this.onResizeHandler(e2, callbackData, position, "onResizeStop"));
    _defineProperty$3(this, "onResizeStart", (e2, callbackData, position) => this.onResizeHandler(e2, callbackData, position, "onResizeStart"));
    _defineProperty$3(this, "onResize", (e2, callbackData, position) => this.onResizeHandler(e2, callbackData, position, "onResize"));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.children !== nextProps.children) return true;
    if (this.props.droppingPosition !== nextProps.droppingPosition) return true;
    const oldPosition = (0, _calculateUtils$1.calcGridItemPosition)(this.getPositionParams(this.props), this.props.x, this.props.y, this.props.w, this.props.h, this.state);
    const newPosition = (0, _calculateUtils$1.calcGridItemPosition)(this.getPositionParams(nextProps), nextProps.x, nextProps.y, nextProps.w, nextProps.h, nextState);
    return !(0, _utils$3.fastPositionEqual)(oldPosition, newPosition) || this.props.useCSSTransforms !== nextProps.useCSSTransforms;
  }
  componentDidMount() {
    this.moveDroppingItem({});
  }
  componentDidUpdate(prevProps) {
    this.moveDroppingItem(prevProps);
  }
  // When a droppingPosition is present, this means we should fire a move event, as if we had moved
  // this element by `x, y` pixels.
  moveDroppingItem(prevProps) {
    const {
      droppingPosition
    } = this.props;
    if (!droppingPosition) return;
    const node = this.elementRef.current;
    if (!node) return;
    const prevDroppingPosition = prevProps.droppingPosition || {
      left: 0,
      top: 0
    };
    const {
      dragging
    } = this.state;
    const shouldDrag = dragging && droppingPosition.left !== prevDroppingPosition.left || droppingPosition.top !== prevDroppingPosition.top;
    if (!dragging) {
      this.onDragStart(droppingPosition.e, {
        node,
        deltaX: droppingPosition.left,
        deltaY: droppingPosition.top
      });
    } else if (shouldDrag) {
      const deltaX = droppingPosition.left - dragging.left;
      const deltaY = droppingPosition.top - dragging.top;
      this.onDrag(
        droppingPosition.e,
        {
          node,
          deltaX,
          deltaY
        },
        true
        // dontFLush: avoid flushSync to temper warnings
      );
    }
  }
  getPositionParams() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
    return {
      cols: props.cols,
      containerPadding: props.containerPadding,
      containerWidth: props.containerWidth,
      margin: props.margin,
      maxRows: props.maxRows,
      rowHeight: props.rowHeight
    };
  }
  /**
   * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
   * well when server rendering, and the only way to do that properly is to use percentage width/left because
   * we don't know exactly what the browser viewport is.
   * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
   * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
   *
   * @param  {Object} pos Position object with width, height, left, top.
   * @return {Object}     Style object.
   */
  createStyle(pos) {
    const {
      usePercentages,
      containerWidth,
      useCSSTransforms
    } = this.props;
    let style;
    if (useCSSTransforms) {
      style = (0, _utils$3.setTransform)(pos);
    } else {
      style = (0, _utils$3.setTopLeft)(pos);
      if (usePercentages) {
        style.left = (0, _utils$3.perc)(pos.left / containerWidth);
        style.width = (0, _utils$3.perc)(pos.width / containerWidth);
      }
    }
    return style;
  }
  /**
   * Mix a Draggable instance into a child.
   * @param  {Element} child    Child element.
   * @return {Element}          Child wrapped in Draggable.
   */
  mixinDraggable(child, isDraggable) {
    return /* @__PURE__ */ _react.default.createElement(_reactDraggable.DraggableCore, {
      disabled: !isDraggable,
      onStart: this.onDragStart,
      onDrag: this.onDrag,
      onStop: this.onDragStop,
      handle: this.props.handle,
      cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : ""),
      scale: this.props.transformScale,
      nodeRef: this.elementRef
    }, child);
  }
  /**
   * Utility function to setup callback handler definitions for
   * similarily structured resize events.
   */
  curryResizeHandler(position, handler) {
    return (e2, data) => (
      /*: Function*/
      handler(e2, data, position)
    );
  }
  /**
   * Mix a Resizable instance into a child.
   * @param  {Element} child    Child element.
   * @param  {Object} position  Position object (pixel values)
   * @return {Element}          Child wrapped in Resizable.
   */
  mixinResizable(child, position, isResizable) {
    const {
      cols,
      minW,
      minH,
      maxW,
      maxH,
      transformScale,
      resizeHandles,
      resizeHandle
    } = this.props;
    const positionParams = this.getPositionParams();
    const maxWidth = (0, _calculateUtils$1.calcGridItemPosition)(positionParams, 0, 0, cols, 0).width;
    const mins = (0, _calculateUtils$1.calcGridItemPosition)(positionParams, 0, 0, minW, minH);
    const maxes = (0, _calculateUtils$1.calcGridItemPosition)(positionParams, 0, 0, maxW, maxH);
    const minConstraints = [mins.width, mins.height];
    const maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
    return /* @__PURE__ */ _react.default.createElement(
      _reactResizable.Resizable,
      {
        draggableOpts: {
          disabled: !isResizable
        },
        className: isResizable ? void 0 : "react-resizable-hide",
        width: position.width,
        height: position.height,
        minConstraints,
        maxConstraints,
        onResizeStop: this.curryResizeHandler(position, this.onResizeStop),
        onResizeStart: this.curryResizeHandler(position, this.onResizeStart),
        onResize: this.curryResizeHandler(position, this.onResize),
        transformScale,
        resizeHandles,
        handle: resizeHandle
      },
      child
    );
  }
  /**
   * Wrapper around resize events to provide more useful data.
   */
  onResizeHandler(e2, _ref4, position, handlerName) {
    let {
      node,
      size,
      handle
    } = _ref4;
    const handler = this.props[handlerName];
    if (!handler) return;
    const {
      x: x2,
      y: y2,
      i,
      maxH,
      minH,
      containerWidth
    } = this.props;
    const {
      minW,
      maxW
    } = this.props;
    let updatedSize = size;
    if (node) {
      updatedSize = (0, _utils$3.resizeItemInDirection)(handle, position, size, containerWidth);
      (0, _reactDom.flushSync)(() => {
        this.setState({
          resizing: handlerName === "onResizeStop" ? null : updatedSize
        });
      });
    }
    let {
      w: w2,
      h
    } = (0, _calculateUtils$1.calcWH)(this.getPositionParams(), updatedSize.width, updatedSize.height, x2, y2, handle);
    w2 = (0, _calculateUtils$1.clamp)(w2, Math.max(minW, 1), maxW);
    h = (0, _calculateUtils$1.clamp)(h, minH, maxH);
    handler.call(this, i, w2, h, {
      e: e2,
      node,
      size: updatedSize,
      handle
    });
  }
  render() {
    const {
      x: x2,
      y: y2,
      w: w2,
      h,
      isDraggable,
      isResizable,
      droppingPosition,
      useCSSTransforms
    } = this.props;
    const pos = (0, _calculateUtils$1.calcGridItemPosition)(this.getPositionParams(), x2, y2, w2, h, this.state);
    const child = _react.default.Children.only(this.props.children);
    let newChild = /* @__PURE__ */ _react.default.cloneElement(child, {
      ref: this.elementRef,
      className: (0, _clsx$2.default)("react-grid-item", child.props.className, this.props.className, {
        static: this.props.static,
        resizing: Boolean(this.state.resizing),
        "react-draggable": isDraggable,
        "react-draggable-dragging": Boolean(this.state.dragging),
        dropping: Boolean(droppingPosition),
        cssTransforms: useCSSTransforms
      }),
      // We can set the width and height on the child, but unfortunately we can't set the position.
      style: _objectSpread$2(_objectSpread$2(_objectSpread$2({}, this.props.style), child.props.style), this.createStyle(pos))
    });
    newChild = this.mixinResizable(newChild, pos, isResizable);
    newChild = this.mixinDraggable(newChild, isDraggable);
    return newChild;
  }
}
GridItem$1.default = GridItem;
_defineProperty$3(GridItem, "propTypes", {
  // Children must be only a single element
  children: _propTypes$2.default.element,
  // General grid attributes
  cols: _propTypes$2.default.number.isRequired,
  containerWidth: _propTypes$2.default.number.isRequired,
  rowHeight: _propTypes$2.default.number.isRequired,
  margin: _propTypes$2.default.array.isRequired,
  maxRows: _propTypes$2.default.number.isRequired,
  containerPadding: _propTypes$2.default.array.isRequired,
  // These are all in grid units
  x: _propTypes$2.default.number.isRequired,
  y: _propTypes$2.default.number.isRequired,
  w: _propTypes$2.default.number.isRequired,
  h: _propTypes$2.default.number.isRequired,
  // All optional
  minW: function(props, propName) {
    const value = props[propName];
    if (typeof value !== "number") return new Error("minWidth not Number");
    if (value > props.w || value > props.maxW) return new Error("minWidth larger than item width/maxWidth");
  },
  maxW: function(props, propName) {
    const value = props[propName];
    if (typeof value !== "number") return new Error("maxWidth not Number");
    if (value < props.w || value < props.minW) return new Error("maxWidth smaller than item width/minWidth");
  },
  minH: function(props, propName) {
    const value = props[propName];
    if (typeof value !== "number") return new Error("minHeight not Number");
    if (value > props.h || value > props.maxH) return new Error("minHeight larger than item height/maxHeight");
  },
  maxH: function(props, propName) {
    const value = props[propName];
    if (typeof value !== "number") return new Error("maxHeight not Number");
    if (value < props.h || value < props.minH) return new Error("maxHeight smaller than item height/minHeight");
  },
  // ID is nice to have for callbacks
  i: _propTypes$2.default.string.isRequired,
  // Resize handle options
  resizeHandles: _ReactGridLayoutPropTypes$1.resizeHandleAxesType,
  resizeHandle: _ReactGridLayoutPropTypes$1.resizeHandleType,
  // Functions
  onDragStop: _propTypes$2.default.func,
  onDragStart: _propTypes$2.default.func,
  onDrag: _propTypes$2.default.func,
  onResizeStop: _propTypes$2.default.func,
  onResizeStart: _propTypes$2.default.func,
  onResize: _propTypes$2.default.func,
  // Flags
  isDraggable: _propTypes$2.default.bool.isRequired,
  isResizable: _propTypes$2.default.bool.isRequired,
  isBounded: _propTypes$2.default.bool.isRequired,
  static: _propTypes$2.default.bool,
  // Use CSS transforms instead of top/left
  useCSSTransforms: _propTypes$2.default.bool.isRequired,
  transformScale: _propTypes$2.default.number,
  // Others
  className: _propTypes$2.default.string,
  // Selector for draggable handle
  handle: _propTypes$2.default.string,
  // Selector for draggable cancel (see react-draggable)
  cancel: _propTypes$2.default.string,
  // Current position of a dropping element
  droppingPosition: _propTypes$2.default.shape({
    e: _propTypes$2.default.object.isRequired,
    left: _propTypes$2.default.number.isRequired,
    top: _propTypes$2.default.number.isRequired
  })
});
_defineProperty$3(GridItem, "defaultProps", {
  className: "",
  cancel: "",
  handle: "",
  minH: 1,
  minW: 1,
  maxH: Infinity,
  maxW: Infinity,
  transformScale: 1
});
Object.defineProperty(ReactGridLayout$1, "__esModule", {
  value: true
});
ReactGridLayout$1.default = void 0;
var React$2 = _interopRequireWildcard$2(reactExports);
var _fastEquals$1 = fastEqualsExports;
var _clsx$1 = _interopRequireDefault$2(clsxExports);
var _utils$2 = utils$1;
var _calculateUtils = calculateUtils;
var _GridItem = _interopRequireDefault$2(GridItem$1);
var _ReactGridLayoutPropTypes = _interopRequireDefault$2(ReactGridLayoutPropTypes);
function _interopRequireDefault$2(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function _interopRequireWildcard$2(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$2 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function ownKeys$1(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$1(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$2(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$2(e2, r2, t2) {
  return (r2 = _toPropertyKey$2(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$2(t2) {
  var i = _toPrimitive$2(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
const layoutClassName$1 = "react-grid-layout";
let isFirefox = false;
try {
  isFirefox = /firefox/i.test(navigator.userAgent);
} catch (e2) {
}
class ReactGridLayout extends React$2.Component {
  constructor() {
    super(...arguments);
    _defineProperty$2(this, "state", {
      activeDrag: null,
      layout: (0, _utils$2.synchronizeLayoutWithChildren)(
        this.props.layout,
        this.props.children,
        this.props.cols,
        // Legacy support for verticalCompact: false
        (0, _utils$2.compactType)(this.props),
        this.props.allowOverlap
      ),
      mounted: false,
      oldDragItem: null,
      oldLayout: null,
      oldResizeItem: null,
      resizing: false,
      droppingDOMNode: null,
      children: []
    });
    _defineProperty$2(this, "dragEnterCounter", 0);
    _defineProperty$2(this, "onDragStart", (i, x2, y2, _ref) => {
      let {
        e: e2,
        node
      } = _ref;
      const {
        layout
      } = this.state;
      const l2 = (0, _utils$2.getLayoutItem)(layout, i);
      if (!l2) return;
      const placeholder = {
        w: l2.w,
        h: l2.h,
        x: l2.x,
        y: l2.y,
        placeholder: true,
        i
      };
      this.setState({
        oldDragItem: (0, _utils$2.cloneLayoutItem)(l2),
        oldLayout: layout,
        activeDrag: placeholder
      });
      return this.props.onDragStart(layout, l2, l2, null, e2, node);
    });
    _defineProperty$2(this, "onDrag", (i, x2, y2, _ref2) => {
      let {
        e: e2,
        node
      } = _ref2;
      const {
        oldDragItem
      } = this.state;
      let {
        layout
      } = this.state;
      const {
        cols,
        allowOverlap,
        preventCollision
      } = this.props;
      const l2 = (0, _utils$2.getLayoutItem)(layout, i);
      if (!l2) return;
      const placeholder = {
        w: l2.w,
        h: l2.h,
        x: l2.x,
        y: l2.y,
        placeholder: true,
        i
      };
      const isUserAction = true;
      layout = (0, _utils$2.moveElement)(layout, l2, x2, y2, isUserAction, preventCollision, (0, _utils$2.compactType)(this.props), cols, allowOverlap);
      this.props.onDrag(layout, oldDragItem, l2, placeholder, e2, node);
      this.setState({
        layout: allowOverlap ? layout : (0, _utils$2.compact)(layout, (0, _utils$2.compactType)(this.props), cols),
        activeDrag: placeholder
      });
    });
    _defineProperty$2(this, "onDragStop", (i, x2, y2, _ref3) => {
      let {
        e: e2,
        node
      } = _ref3;
      if (!this.state.activeDrag) return;
      const {
        oldDragItem
      } = this.state;
      let {
        layout
      } = this.state;
      const {
        cols,
        preventCollision,
        allowOverlap
      } = this.props;
      const l2 = (0, _utils$2.getLayoutItem)(layout, i);
      if (!l2) return;
      const isUserAction = true;
      layout = (0, _utils$2.moveElement)(layout, l2, x2, y2, isUserAction, preventCollision, (0, _utils$2.compactType)(this.props), cols, allowOverlap);
      const newLayout = allowOverlap ? layout : (0, _utils$2.compact)(layout, (0, _utils$2.compactType)(this.props), cols);
      this.props.onDragStop(newLayout, oldDragItem, l2, null, e2, node);
      const {
        oldLayout
      } = this.state;
      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldDragItem: null,
        oldLayout: null
      });
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    });
    _defineProperty$2(this, "onResizeStart", (i, w2, h, _ref4) => {
      let {
        e: e2,
        node
      } = _ref4;
      const {
        layout
      } = this.state;
      const l2 = (0, _utils$2.getLayoutItem)(layout, i);
      if (!l2) return;
      this.setState({
        oldResizeItem: (0, _utils$2.cloneLayoutItem)(l2),
        oldLayout: this.state.layout,
        resizing: true
      });
      this.props.onResizeStart(layout, l2, l2, null, e2, node);
    });
    _defineProperty$2(this, "onResize", (i, w2, h, _ref5) => {
      let {
        e: e2,
        node,
        size,
        handle
      } = _ref5;
      const {
        oldResizeItem
      } = this.state;
      const {
        layout
      } = this.state;
      const {
        cols,
        preventCollision,
        allowOverlap
      } = this.props;
      let shouldMoveItem = false;
      let finalLayout;
      let x2;
      let y2;
      const [newLayout, l2] = (0, _utils$2.withLayoutItem)(layout, i, (l3) => {
        let hasCollisions;
        x2 = l3.x;
        y2 = l3.y;
        if (["sw", "w", "nw", "n", "ne"].indexOf(handle) !== -1) {
          if (["sw", "nw", "w"].indexOf(handle) !== -1) {
            x2 = l3.x + (l3.w - w2);
            w2 = l3.x !== x2 && x2 < 0 ? l3.w : w2;
            x2 = x2 < 0 ? 0 : x2;
          }
          if (["ne", "n", "nw"].indexOf(handle) !== -1) {
            y2 = l3.y + (l3.h - h);
            h = l3.y !== y2 && y2 < 0 ? l3.h : h;
            y2 = y2 < 0 ? 0 : y2;
          }
          shouldMoveItem = true;
        }
        if (preventCollision && !allowOverlap) {
          const collisions = (0, _utils$2.getAllCollisions)(layout, _objectSpread$1(_objectSpread$1({}, l3), {}, {
            w: w2,
            h,
            x: x2,
            y: y2
          })).filter((layoutItem) => layoutItem.i !== l3.i);
          hasCollisions = collisions.length > 0;
          if (hasCollisions) {
            y2 = l3.y;
            h = l3.h;
            x2 = l3.x;
            w2 = l3.w;
            shouldMoveItem = false;
          }
        }
        l3.w = w2;
        l3.h = h;
        return l3;
      });
      if (!l2) return;
      finalLayout = newLayout;
      if (shouldMoveItem) {
        const isUserAction = true;
        finalLayout = (0, _utils$2.moveElement)(newLayout, l2, x2, y2, isUserAction, this.props.preventCollision, (0, _utils$2.compactType)(this.props), cols, allowOverlap);
      }
      const placeholder = {
        w: l2.w,
        h: l2.h,
        x: l2.x,
        y: l2.y,
        static: true,
        i
      };
      this.props.onResize(finalLayout, oldResizeItem, l2, placeholder, e2, node);
      this.setState({
        layout: allowOverlap ? finalLayout : (0, _utils$2.compact)(finalLayout, (0, _utils$2.compactType)(this.props), cols),
        activeDrag: placeholder
      });
    });
    _defineProperty$2(this, "onResizeStop", (i, w2, h, _ref6) => {
      let {
        e: e2,
        node
      } = _ref6;
      const {
        layout,
        oldResizeItem
      } = this.state;
      const {
        cols,
        allowOverlap
      } = this.props;
      const l2 = (0, _utils$2.getLayoutItem)(layout, i);
      const newLayout = allowOverlap ? layout : (0, _utils$2.compact)(layout, (0, _utils$2.compactType)(this.props), cols);
      this.props.onResizeStop(newLayout, oldResizeItem, l2, null, e2, node);
      const {
        oldLayout
      } = this.state;
      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldResizeItem: null,
        oldLayout: null,
        resizing: false
      });
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    });
    _defineProperty$2(this, "onDragOver", (e2) => {
      var _e$nativeEvent$target;
      e2.preventDefault();
      e2.stopPropagation();
      if (isFirefox && // $FlowIgnore can't figure this out
      !((_e$nativeEvent$target = e2.nativeEvent.target) !== null && _e$nativeEvent$target !== void 0 && _e$nativeEvent$target.classList.contains(layoutClassName$1))) {
        return false;
      }
      const {
        droppingItem,
        onDropDragOver,
        margin,
        cols,
        rowHeight,
        maxRows,
        width,
        containerPadding,
        transformScale
      } = this.props;
      const onDragOverResult = onDropDragOver === null || onDropDragOver === void 0 ? void 0 : onDropDragOver(e2);
      if (onDragOverResult === false) {
        if (this.state.droppingDOMNode) {
          this.removeDroppingPlaceholder();
        }
        return false;
      }
      const finalDroppingItem = _objectSpread$1(_objectSpread$1({}, droppingItem), onDragOverResult);
      const {
        layout
      } = this.state;
      const gridRect = e2.currentTarget.getBoundingClientRect();
      const layerX = e2.clientX - gridRect.left;
      const layerY = e2.clientY - gridRect.top;
      const droppingPosition = {
        left: layerX / transformScale,
        top: layerY / transformScale,
        e: e2
      };
      if (!this.state.droppingDOMNode) {
        const positionParams = {
          cols,
          margin,
          maxRows,
          rowHeight,
          containerWidth: width,
          containerPadding: containerPadding || margin
        };
        const calculatedPosition = (0, _calculateUtils.calcXY)(positionParams, layerY, layerX, finalDroppingItem.w, finalDroppingItem.h);
        this.setState({
          droppingDOMNode: /* @__PURE__ */ React$2.createElement("div", {
            key: finalDroppingItem.i
          }),
          droppingPosition,
          layout: [...layout, _objectSpread$1(_objectSpread$1({}, finalDroppingItem), {}, {
            x: calculatedPosition.x,
            y: calculatedPosition.y,
            static: false,
            isDraggable: true
          })]
        });
      } else if (this.state.droppingPosition) {
        const {
          left,
          top
        } = this.state.droppingPosition;
        const shouldUpdatePosition = left != layerX || top != layerY;
        if (shouldUpdatePosition) {
          this.setState({
            droppingPosition
          });
        }
      }
    });
    _defineProperty$2(this, "removeDroppingPlaceholder", () => {
      const {
        droppingItem,
        cols
      } = this.props;
      const {
        layout
      } = this.state;
      const newLayout = (0, _utils$2.compact)(layout.filter((l2) => l2.i !== droppingItem.i), (0, _utils$2.compactType)(this.props), cols, this.props.allowOverlap);
      this.setState({
        layout: newLayout,
        droppingDOMNode: null,
        activeDrag: null,
        droppingPosition: void 0
      });
    });
    _defineProperty$2(this, "onDragLeave", (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      this.dragEnterCounter--;
      if (this.dragEnterCounter === 0) {
        this.removeDroppingPlaceholder();
      }
    });
    _defineProperty$2(this, "onDragEnter", (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      this.dragEnterCounter++;
    });
    _defineProperty$2(this, "onDrop", (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      const {
        droppingItem
      } = this.props;
      const {
        layout
      } = this.state;
      const item = layout.find((l2) => l2.i === droppingItem.i);
      this.dragEnterCounter = 0;
      this.removeDroppingPlaceholder();
      this.props.onDrop(layout, item, e2);
    });
  }
  componentDidMount() {
    this.setState({
      mounted: true
    });
    this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let newLayoutBase;
    if (prevState.activeDrag) {
      return null;
    }
    if (!(0, _fastEquals$1.deepEqual)(nextProps.layout, prevState.propsLayout) || nextProps.compactType !== prevState.compactType) {
      newLayoutBase = nextProps.layout;
    } else if (!(0, _utils$2.childrenEqual)(nextProps.children, prevState.children)) {
      newLayoutBase = prevState.layout;
    }
    if (newLayoutBase) {
      const newLayout = (0, _utils$2.synchronizeLayoutWithChildren)(newLayoutBase, nextProps.children, nextProps.cols, (0, _utils$2.compactType)(nextProps), nextProps.allowOverlap);
      return {
        layout: newLayout,
        // We need to save these props to state for using
        // getDerivedStateFromProps instead of componentDidMount (in which we would get extra rerender)
        compactType: nextProps.compactType,
        children: nextProps.children,
        propsLayout: nextProps.layout
      };
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      // NOTE: this is almost always unequal. Therefore the only way to get better performance
      // from SCU is if the user intentionally memoizes children. If they do, and they can
      // handle changes properly, performance will increase.
      this.props.children !== nextProps.children || !(0, _utils$2.fastRGLPropsEqual)(this.props, nextProps, _fastEquals$1.deepEqual) || this.state.activeDrag !== nextState.activeDrag || this.state.mounted !== nextState.mounted || this.state.droppingPosition !== nextState.droppingPosition
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.activeDrag) {
      const newLayout = this.state.layout;
      const oldLayout = prevState.layout;
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }
  /**
   * Calculates a pixel value for the container.
   * @return {String} Container height in pixels.
   */
  containerHeight() {
    if (!this.props.autoSize) return;
    const nbRow = (0, _utils$2.bottom)(this.state.layout);
    const containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
    return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + "px";
  }
  onLayoutMaybeChanged(newLayout, oldLayout) {
    if (!oldLayout) oldLayout = this.state.layout;
    if (!(0, _fastEquals$1.deepEqual)(oldLayout, newLayout)) {
      this.props.onLayoutChange(newLayout);
    }
  }
  /**
   * Create a placeholder object.
   * @return {Element} Placeholder div.
   */
  placeholder() {
    const {
      activeDrag
    } = this.state;
    if (!activeDrag) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      useCSSTransforms,
      transformScale
    } = this.props;
    return /* @__PURE__ */ React$2.createElement(_GridItem.default, {
      w: activeDrag.w,
      h: activeDrag.h,
      x: activeDrag.x,
      y: activeDrag.y,
      i: activeDrag.i,
      className: "react-grid-placeholder ".concat(this.state.resizing ? "placeholder-resizing" : ""),
      containerWidth: width,
      cols,
      margin,
      containerPadding: containerPadding || margin,
      maxRows,
      rowHeight,
      isDraggable: false,
      isResizable: false,
      isBounded: false,
      useCSSTransforms,
      transformScale
    }, /* @__PURE__ */ React$2.createElement("div", null));
  }
  /**
   * Given a grid item, set its style attributes & surround in a <Draggable>.
   * @param  {Element} child React element.
   * @return {Element}       Element wrapped in draggable and properly placed.
   */
  processGridItem(child, isDroppingItem) {
    if (!child || !child.key) return;
    const l2 = (0, _utils$2.getLayoutItem)(this.state.layout, String(child.key));
    if (!l2) return null;
    const {
      width,
      cols,
      margin,
      containerPadding,
      rowHeight,
      maxRows,
      isDraggable,
      isResizable,
      isBounded,
      useCSSTransforms,
      transformScale,
      draggableCancel,
      draggableHandle,
      resizeHandles,
      resizeHandle
    } = this.props;
    const {
      mounted,
      droppingPosition
    } = this.state;
    const draggable = typeof l2.isDraggable === "boolean" ? l2.isDraggable : !l2.static && isDraggable;
    const resizable = typeof l2.isResizable === "boolean" ? l2.isResizable : !l2.static && isResizable;
    const resizeHandlesOptions = l2.resizeHandles || resizeHandles;
    const bounded = draggable && isBounded && l2.isBounded !== false;
    return /* @__PURE__ */ React$2.createElement(_GridItem.default, {
      containerWidth: width,
      cols,
      margin,
      containerPadding: containerPadding || margin,
      maxRows,
      rowHeight,
      cancel: draggableCancel,
      handle: draggableHandle,
      onDragStop: this.onDragStop,
      onDragStart: this.onDragStart,
      onDrag: this.onDrag,
      onResizeStart: this.onResizeStart,
      onResize: this.onResize,
      onResizeStop: this.onResizeStop,
      isDraggable: draggable,
      isResizable: resizable,
      isBounded: bounded,
      useCSSTransforms: useCSSTransforms && mounted,
      usePercentages: !mounted,
      transformScale,
      w: l2.w,
      h: l2.h,
      x: l2.x,
      y: l2.y,
      i: l2.i,
      minH: l2.minH,
      minW: l2.minW,
      maxH: l2.maxH,
      maxW: l2.maxW,
      static: l2.static,
      droppingPosition: isDroppingItem ? droppingPosition : void 0,
      resizeHandles: resizeHandlesOptions,
      resizeHandle
    }, child);
  }
  render() {
    const {
      className,
      style,
      isDroppable,
      innerRef
    } = this.props;
    const mergedClassName = (0, _clsx$1.default)(layoutClassName$1, className);
    const mergedStyle = _objectSpread$1({
      height: this.containerHeight()
    }, style);
    return /* @__PURE__ */ React$2.createElement("div", {
      ref: innerRef,
      className: mergedClassName,
      style: mergedStyle,
      onDrop: isDroppable ? this.onDrop : _utils$2.noop,
      onDragLeave: isDroppable ? this.onDragLeave : _utils$2.noop,
      onDragEnter: isDroppable ? this.onDragEnter : _utils$2.noop,
      onDragOver: isDroppable ? this.onDragOver : _utils$2.noop
    }, React$2.Children.map(this.props.children, (child) => this.processGridItem(child)), isDroppable && this.state.droppingDOMNode && this.processGridItem(this.state.droppingDOMNode, true), this.placeholder());
  }
}
ReactGridLayout$1.default = ReactGridLayout;
_defineProperty$2(ReactGridLayout, "displayName", "ReactGridLayout");
_defineProperty$2(ReactGridLayout, "propTypes", _ReactGridLayoutPropTypes.default);
_defineProperty$2(ReactGridLayout, "defaultProps", {
  autoSize: true,
  cols: 12,
  className: "",
  style: {},
  draggableHandle: "",
  draggableCancel: "",
  containerPadding: null,
  rowHeight: 150,
  maxRows: Infinity,
  // infinite vertical growth
  layout: [],
  margin: [10, 10],
  isBounded: false,
  isDraggable: true,
  isResizable: true,
  allowOverlap: false,
  isDroppable: false,
  useCSSTransforms: true,
  transformScale: 1,
  verticalCompact: true,
  compactType: "vertical",
  preventCollision: false,
  droppingItem: {
    i: "__dropping-elem__",
    h: 1,
    w: 1
  },
  resizeHandles: ["se"],
  onLayoutChange: _utils$2.noop,
  onDragStart: _utils$2.noop,
  onDrag: _utils$2.noop,
  onDragStop: _utils$2.noop,
  onResizeStart: _utils$2.noop,
  onResize: _utils$2.noop,
  onResizeStop: _utils$2.noop,
  onDrop: _utils$2.noop,
  onDropDragOver: _utils$2.noop
});
var ResponsiveReactGridLayout$1 = {};
var responsiveUtils = {};
Object.defineProperty(responsiveUtils, "__esModule", {
  value: true
});
responsiveUtils.findOrGenerateResponsiveLayout = findOrGenerateResponsiveLayout;
responsiveUtils.getBreakpointFromWidth = getBreakpointFromWidth;
responsiveUtils.getColsFromBreakpoint = getColsFromBreakpoint;
responsiveUtils.sortBreakpoints = sortBreakpoints;
var _utils$1 = utils$1;
function getBreakpointFromWidth(breakpoints, width) {
  const sorted = sortBreakpoints(breakpoints);
  let matching = sorted[0];
  for (let i = 1, len = sorted.length; i < len; i++) {
    const breakpointName = sorted[i];
    if (width > breakpoints[breakpointName]) matching = breakpointName;
  }
  return matching;
}
function getColsFromBreakpoint(breakpoint, cols) {
  if (!cols[breakpoint]) {
    throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
  }
  return cols[breakpoint];
}
function findOrGenerateResponsiveLayout(layouts, breakpoints, breakpoint, lastBreakpoint, cols, compactType2) {
  if (layouts[breakpoint]) return (0, _utils$1.cloneLayout)(layouts[breakpoint]);
  let layout = layouts[lastBreakpoint];
  const breakpointsSorted = sortBreakpoints(breakpoints);
  const breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
  for (let i = 0, len = breakpointsAbove.length; i < len; i++) {
    const b = breakpointsAbove[i];
    if (layouts[b]) {
      layout = layouts[b];
      break;
    }
  }
  layout = (0, _utils$1.cloneLayout)(layout || []);
  return (0, _utils$1.compact)((0, _utils$1.correctBounds)(layout, {
    cols
  }), compactType2, cols);
}
function sortBreakpoints(breakpoints) {
  const keys = Object.keys(breakpoints);
  return keys.sort(function(a, b) {
    return breakpoints[a] - breakpoints[b];
  });
}
Object.defineProperty(ResponsiveReactGridLayout$1, "__esModule", {
  value: true
});
ResponsiveReactGridLayout$1.default = void 0;
var React$1 = _interopRequireWildcard$1(reactExports);
var _propTypes$1 = _interopRequireDefault$1(propTypesExports);
var _fastEquals = fastEqualsExports;
var _utils = utils$1;
var _responsiveUtils = responsiveUtils;
var _ReactGridLayout = _interopRequireDefault$1(ReactGridLayout$1);
const _excluded$1 = ["breakpoint", "breakpoints", "cols", "layouts", "margin", "containerPadding", "onBreakpointChange", "onLayoutChange", "onWidthChange"];
function _interopRequireDefault$1(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function _interopRequireWildcard$1(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard$1 = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$1.apply(null, arguments);
}
function _objectWithoutProperties$1(e2, t2) {
  if (null == e2) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$1(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e2, o) && (i[o] = e2[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$1(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e2.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty$1(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
function _defineProperty$1(e2, r2, t2) {
  return (r2 = _toPropertyKey$1(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey$1(t2) {
  var i = _toPrimitive$1(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
const type = (obj) => Object.prototype.toString.call(obj);
function getIndentationValue(param, breakpoint) {
  if (param == null) return null;
  return Array.isArray(param) ? param : param[breakpoint];
}
class ResponsiveReactGridLayout extends React$1.Component {
  constructor() {
    super(...arguments);
    _defineProperty$1(this, "state", this.generateInitialState());
    _defineProperty$1(this, "onLayoutChange", (layout) => {
      this.props.onLayoutChange(layout, _objectSpread(_objectSpread({}, this.props.layouts), {}, {
        [this.state.breakpoint]: layout
      }));
    });
  }
  generateInitialState() {
    const {
      width,
      breakpoints,
      layouts,
      cols
    } = this.props;
    const breakpoint = (0, _responsiveUtils.getBreakpointFromWidth)(breakpoints, width);
    const colNo = (0, _responsiveUtils.getColsFromBreakpoint)(breakpoint, cols);
    const compactType2 = this.props.verticalCompact === false ? null : this.props.compactType;
    const initialLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(layouts, breakpoints, breakpoint, breakpoint, colNo, compactType2);
    return {
      layout: initialLayout,
      breakpoint,
      cols: colNo
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!(0, _fastEquals.deepEqual)(nextProps.layouts, prevState.layouts)) {
      const {
        breakpoint,
        cols
      } = prevState;
      const newLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(nextProps.layouts, nextProps.breakpoints, breakpoint, breakpoint, cols, nextProps.compactType);
      return {
        layout: newLayout,
        layouts: nextProps.layouts
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.width != prevProps.width || this.props.breakpoint !== prevProps.breakpoint || !(0, _fastEquals.deepEqual)(this.props.breakpoints, prevProps.breakpoints) || !(0, _fastEquals.deepEqual)(this.props.cols, prevProps.cols)) {
      this.onWidthChange(prevProps);
    }
  }
  /**
   * When the width changes work through breakpoints and reset state with the new width & breakpoint.
   * Width changes are necessary to figure out the widget widths.
   */
  onWidthChange(prevProps) {
    const {
      breakpoints,
      cols,
      layouts,
      compactType: compactType2
    } = this.props;
    const newBreakpoint = this.props.breakpoint || (0, _responsiveUtils.getBreakpointFromWidth)(this.props.breakpoints, this.props.width);
    const lastBreakpoint = this.state.breakpoint;
    const newCols = (0, _responsiveUtils.getColsFromBreakpoint)(newBreakpoint, cols);
    const newLayouts = _objectSpread({}, layouts);
    if (lastBreakpoint !== newBreakpoint || prevProps.breakpoints !== breakpoints || prevProps.cols !== cols) {
      if (!(lastBreakpoint in newLayouts)) newLayouts[lastBreakpoint] = (0, _utils.cloneLayout)(this.state.layout);
      let layout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(newLayouts, breakpoints, newBreakpoint, lastBreakpoint, newCols, compactType2);
      layout = (0, _utils.synchronizeLayoutWithChildren)(layout, this.props.children, newCols, compactType2, this.props.allowOverlap);
      newLayouts[newBreakpoint] = layout;
      this.props.onBreakpointChange(newBreakpoint, newCols);
      this.props.onLayoutChange(layout, newLayouts);
      this.setState({
        breakpoint: newBreakpoint,
        layout,
        cols: newCols
      });
    }
    const margin = getIndentationValue(this.props.margin, newBreakpoint);
    const containerPadding = getIndentationValue(this.props.containerPadding, newBreakpoint);
    this.props.onWidthChange(this.props.width, margin, newCols, containerPadding);
  }
  render() {
    const _this$props = this.props, {
      breakpoint,
      breakpoints,
      cols,
      layouts,
      margin,
      containerPadding,
      onBreakpointChange,
      onLayoutChange,
      onWidthChange
    } = _this$props, other = _objectWithoutProperties$1(_this$props, _excluded$1);
    return /* @__PURE__ */ React$1.createElement(_ReactGridLayout.default, _extends$1({}, other, {
      // $FlowIgnore should allow nullable here due to DefaultProps
      margin: getIndentationValue(margin, this.state.breakpoint),
      containerPadding: getIndentationValue(containerPadding, this.state.breakpoint),
      onLayoutChange: this.onLayoutChange,
      layout: this.state.layout,
      cols: this.state.cols
    }));
  }
}
ResponsiveReactGridLayout$1.default = ResponsiveReactGridLayout;
_defineProperty$1(ResponsiveReactGridLayout, "propTypes", {
  //
  // Basic props
  //
  // Optional, but if you are managing width yourself you may want to set the breakpoint
  // yourself as well.
  breakpoint: _propTypes$1.default.string,
  // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
  breakpoints: _propTypes$1.default.object,
  allowOverlap: _propTypes$1.default.bool,
  // # of cols. This is a breakpoint -> cols map
  cols: _propTypes$1.default.object,
  // # of margin. This is a breakpoint -> margin map
  // e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
  // Margin between items [x, y] in px
  // e.g. [10, 10]
  margin: _propTypes$1.default.oneOfType([_propTypes$1.default.array, _propTypes$1.default.object]),
  // # of containerPadding. This is a breakpoint -> containerPadding map
  // e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
  // Padding inside the container [x, y] in px
  // e.g. [10, 10]
  containerPadding: _propTypes$1.default.oneOfType([_propTypes$1.default.array, _propTypes$1.default.object]),
  // layouts is an object mapping breakpoints to layouts.
  // e.g. {lg: Layout, md: Layout, ...}
  layouts(props, propName) {
    if (type(props[propName]) !== "[object Object]") {
      throw new Error("Layout property must be an object. Received: " + type(props[propName]));
    }
    Object.keys(props[propName]).forEach((key) => {
      if (!(key in props.breakpoints)) {
        throw new Error("Each key in layouts must align with a key in breakpoints.");
      }
      (0, _utils.validateLayout)(props.layouts[key], "layouts." + key);
    });
  },
  // The width of this component.
  // Required in this propTypes stanza because generateInitialState() will fail without it.
  width: _propTypes$1.default.number.isRequired,
  //
  // Callbacks
  //
  // Calls back with breakpoint and new # cols
  onBreakpointChange: _propTypes$1.default.func,
  // Callback so you can save the layout.
  // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
  onLayoutChange: _propTypes$1.default.func,
  // Calls back with (containerWidth, margin, cols, containerPadding)
  onWidthChange: _propTypes$1.default.func
});
_defineProperty$1(ResponsiveReactGridLayout, "defaultProps", {
  breakpoints: {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0
  },
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
  },
  containerPadding: {
    lg: null,
    md: null,
    sm: null,
    xs: null,
    xxs: null
  },
  layouts: {},
  margin: [10, 10],
  allowOverlap: false,
  onBreakpointChange: _utils.noop,
  onLayoutChange: _utils.noop,
  onWidthChange: _utils.noop
});
var WidthProvider = {};
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x2 = _a.x, y2 = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x: x2,
    y: y2,
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: height + y2,
    left: x2
  });
  return rect;
}
function createRectInit(x2, y2, width, height) {
  return { x: x2, y: y2, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver$1 = (
  /** @class */
  /* @__PURE__ */ function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver$1.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver$1;
}();
const ResizeObserver_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(ResizeObserver_es);
Object.defineProperty(WidthProvider, "__esModule", {
  value: true
});
WidthProvider.default = WidthProvideRGL;
var React = _interopRequireWildcard(reactExports);
var _propTypes = _interopRequireDefault(propTypesExports);
var _resizeObserverPolyfill = _interopRequireDefault(require$$2);
var _clsx = _interopRequireDefault(clsxExports);
const _excluded = ["measureBeforeMount"];
function _interopRequireDefault(e2) {
  return e2 && e2.__esModule ? e2 : { default: e2 };
}
function _interopRequireWildcard(e2, t2) {
  if ("function" == typeof WeakMap) var r2 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
  return (_interopRequireWildcard = function(e3, t3) {
    if (!t3 && e3 && e3.__esModule) return e3;
    var o, i, f2 = { __proto__: null, default: e3 };
    if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return f2;
    if (o = t3 ? n2 : r2) {
      if (o.has(e3)) return o.get(e3);
      o.set(e3, f2);
    }
    for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (i.get || i.set) ? o(f2, t4, i) : f2[t4] = e3[t4]);
    return f2;
  })(e2, t2);
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e2, t2) {
  if (null == e2) return {};
  var o, r2, i = _objectWithoutPropertiesLoose(e2, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e2, o) && (i[o] = e2[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r2, e2) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e2.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _defineProperty(e2, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r2] = t2, e2;
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i = e2.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
const layoutClassName = "react-grid-layout";
function WidthProvideRGL(ComposedComponent) {
  var _WidthProvider;
  return _WidthProvider = class WidthProvider extends React.Component {
    constructor() {
      super(...arguments);
      _defineProperty(this, "state", {
        width: 1280
      });
      _defineProperty(this, "elementRef", /* @__PURE__ */ React.createRef());
      _defineProperty(this, "mounted", false);
      _defineProperty(this, "resizeObserver", void 0);
    }
    componentDidMount() {
      this.mounted = true;
      this.resizeObserver = new _resizeObserverPolyfill.default((entries) => {
        const node2 = this.elementRef.current;
        if (node2 instanceof HTMLElement) {
          const width = entries[0].contentRect.width;
          this.setState({
            width
          });
        }
      });
      const node = this.elementRef.current;
      if (node instanceof HTMLElement) {
        this.resizeObserver.observe(node);
      }
    }
    componentWillUnmount() {
      this.mounted = false;
      const node = this.elementRef.current;
      if (node instanceof HTMLElement) {
        this.resizeObserver.unobserve(node);
      }
      this.resizeObserver.disconnect();
    }
    render() {
      const _this$props = this.props, {
        measureBeforeMount
      } = _this$props, rest = _objectWithoutProperties(_this$props, _excluded);
      if (measureBeforeMount && !this.mounted) {
        return /* @__PURE__ */ React.createElement("div", {
          className: (0, _clsx.default)(this.props.className, layoutClassName),
          style: this.props.style,
          ref: this.elementRef
        });
      }
      return /* @__PURE__ */ React.createElement(ComposedComponent, _extends({
        innerRef: this.elementRef
      }, rest, this.state));
    }
  }, _defineProperty(_WidthProvider, "defaultProps", {
    measureBeforeMount: false
  }), _defineProperty(_WidthProvider, "propTypes", {
    // If true, will not render children until mounted. Useful for getting the exact width before
    // rendering, to prevent any unsightly resizing.
    measureBeforeMount: _propTypes.default.bool
  }), _WidthProvider;
}
(function(module) {
  module.exports = ReactGridLayout$1.default;
  module.exports.utils = utils$1;
  module.exports.calculateUtils = calculateUtils;
  module.exports.Responsive = ResponsiveReactGridLayout$1.default;
  module.exports.Responsive.utils = responsiveUtils;
  module.exports.WidthProvider = WidthProvider.default;
})(reactGridLayout);
var reactGridLayoutExports = reactGridLayout.exports;
const TuiBox = reactExports.forwardRef(({ title, className = "", children, showTitle = true, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `border border-[var(--color-border)] bg-[var(--color-bg)] relative flex flex-col widget-rounded ${className}`,
      style: { ...props.style },
      ...props,
      children: [
        showTitle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "ml-3 w-max bg-[var(--color-bg)] px-2 text-[var(--color-muted)] text-sm lowercase font-bold select-none cursor-move drag-handle z-20",
            style: { lineHeight: "1.2rem", marginTop: "-0.6rem" },
            children: title
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-full h-4 z-20 cursor-move drag-handle",
            title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 min-w-0 w-full relative pt-1 px-2 pb-2 overflow-hidden", children })
      ]
    }
  );
});
TuiBox.displayName = "TuiBox";
const DateTimeWidget = () => {
  const [date, setDate] = reactExports.useState(/* @__PURE__ */ new Date());
  const containerRef = reactExports.useRef(null);
  const [layout, setLayout] = reactExports.useState("horizontal");
  const [timeFontSize, setTimeFontSize] = reactExports.useState(40);
  const [dateFontSize, setDateFontSize] = reactExports.useState(12);
  reactExports.useEffect(() => {
    const timer = setInterval(() => setDate(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    if (!containerRef.current) return;
    const calculateSize = () => {
      if (!containerRef.current) return;
      const { clientWidth: w2, clientHeight: h } = containerRef.current;
      const isVertical = h > w2 * 0.55;
      setLayout(isVertical ? "vertical" : "horizontal");
      const CHAR_ASPECT = 0.55;
      const TIME_CHARS_H = 11;
      const TIME_CHARS_V_TOP = 8;
      let newTimeFS = 0;
      let newDateFS = 0;
      if (isVertical) {
        const widthConstrainedFS = w2 * 0.85 / (TIME_CHARS_V_TOP * CHAR_ASPECT);
        const totalHeightEm = 1 + 0.4 + 0.5;
        const heightConstrainedFS = h * 0.6 / totalHeightEm;
        newTimeFS = Math.min(widthConstrainedFS, heightConstrainedFS);
        newDateFS = Math.max(10, Math.min(16, w2 * 0.08));
      } else {
        const widthConstrainedFS = w2 * 0.9 / (TIME_CHARS_H * CHAR_ASPECT);
        const heightConstrainedFS = h * 0.55;
        newTimeFS = Math.min(widthConstrainedFS, heightConstrainedFS);
        newDateFS = Math.max(10, Math.min(16, h * 0.2));
      }
      setTimeFontSize(Math.max(20, Math.floor(newTimeFS)));
      setDateFontSize(Math.floor(newDateFS));
    };
    const observer = new ResizeObserver(calculateSize);
    observer.observe(containerRef.current);
    const timeout = setTimeout(calculateSize, 0);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);
  const timeStringFull = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  const [timePart, ampmPart] = timeStringFull.split(" ");
  const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };
  const dateString = date.toLocaleDateString("en-US", dateOptions).toLowerCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full flex flex-col items-center justify-center overflow-hidden", children: layout === "vertical" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-0 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "font-digital text-[var(--color-fg)] leading-none text-center",
        style: { fontSize: `${timeFontSize}px` },
        children: timePart
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "font-digital text-[var(--color-fg)] leading-none opacity-80 mt-1",
        style: { fontSize: `${timeFontSize * 0.4}px` },
        children: ampmPart
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-[var(--color-muted)] font-mono text-center leading-tight mt-3 px-1 w-full truncate",
        style: { fontSize: `${dateFontSize}px` },
        children: dateString
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "font-digital text-[var(--color-fg)] leading-none whitespace-nowrap",
        style: { fontSize: `${timeFontSize}px` },
        children: timeStringFull
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-[var(--color-muted)] font-mono mt-1 whitespace-nowrap",
        style: { fontSize: `${dateFontSize}px` },
        children: dateString
      }
    )
  ] }) });
};
const Sparkline = ({ data, color = "var(--color-accent)", max: fixedMax, min: fixedMin }) => {
  if (data.length < 2) return null;
  const width = 100;
  const height = 100;
  const values = data;
  const min = fixedMin ?? Math.min(...values);
  const max = fixedMax ?? Math.max(...values, min + 1);
  const range = max - min;
  const points = values.map((v2, i) => {
    const x2 = i / (values.length - 1) * width;
    const normalizedY = (v2 - min) / (range || 1);
    const y2 = height - normalizedY * height;
    return `${x2},${y2}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: `0 0 ${width} ${height}`, className: "w-full h-full opacity-80", preserveAspectRatio: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "polyline",
    {
      fill: "none",
      stroke: color,
      strokeWidth: "1.5",
      points,
      vectorEffect: "non-scaling-stroke"
    }
  ) });
};
const StatsWidget = ({ mode = "text" }) => {
  const [fps, setFps] = reactExports.useState(0);
  const [ping, setPing] = reactExports.useState(0);
  const [res, setRes] = reactExports.useState(`${typeof window !== "undefined" ? window.screen.width : 1920} x ${typeof window !== "undefined" ? window.screen.height : 1080}`);
  const HISTORY_LENGTH = 30;
  const [history, setHistory] = reactExports.useState({
    fps: new Array(HISTORY_LENGTH).fill(0),
    ping: new Array(HISTORY_LENGTH).fill(0)
  });
  const [realStats, setRealStats] = reactExports.useState({
    os: "Unknown",
    browser: "Unknown",
    gpu: "Unknown",
    cores: navigator.hardwareConcurrency || 0,
    memoryGB: navigator.deviceMemory || null,
    network: { type: "unknown", downlink: null }
  });
  const pingRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const measurePing = async () => {
      const start = performance.now();
      try {
        if (!navigator.onLine) {
          throw new Error("Offline");
        }
        await fetch(`https://www.google.com?_=${Date.now()}`, {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store"
        });
        const end = performance.now();
        const latency = Math.round(end - start);
        setPing(latency);
        pingRef.current = latency;
      } catch (e2) {
        setPing(0);
        pingRef.current = 0;
      }
    };
    measurePing();
    const interval = setInterval(measurePing, 2e3);
    return () => clearInterval(interval);
  }, []);
  reactExports.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId;
    const loop = (currentTime) => {
      frameCount++;
      const delta = currentTime - lastTime;
      if (delta >= 1e3) {
        const currentFps = frameCount;
        setFps(currentFps);
        setHistory((prev) => ({
          fps: [...prev.fps.slice(1), currentFps],
          ping: [...prev.ping.slice(1), pingRef.current]
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  reactExports.useEffect(() => {
    const handleResize = () => {
      setRes(`${window.screen.width} x ${window.screen.height}`);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "detailed") return;
    let os = "Unknown";
    if (navigator.userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (navigator.userAgent.indexOf("Mac") !== -1) os = "MacOS";
    else if (navigator.userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (navigator.userAgent.indexOf("Android") !== -1) os = "Android";
    else if (navigator.userAgent.indexOf("iOS") !== -1) os = "iOS";
    let browser = "Unknown";
    if (navigator.userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (navigator.userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (navigator.userAgent.indexOf("Safari") !== -1) browser = "Safari";
    let gpu = "Unknown GPU";
    try {
      const canvas = document.createElement("canvas");
      const gl2 = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl2) {
        const debugInfo = gl2.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          gpu = gl2.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          gpu = gpu.replace(/ANGLE \((.*)\)/, "$1").replace(/Direct3D11 vs_.* ps_.*/, "");
        }
      }
    } catch (e2) {
    }
    setRealStats((prev) => ({ ...prev, os, browser, gpu }));
    if (navigator.connection) {
      const conn = navigator.connection;
      setRealStats((prev) => ({
        ...prev,
        network: { type: conn.effectiveType, downlink: conn.downlink }
      }));
    }
  }, [mode]);
  const Row = ({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1 text-sm font-mono leading-tight", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-xs", children: label.toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-bold", children: value })
  ] });
  if (mode === "graph") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full justify-between py-1 px-1 overflow-hidden select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-0 border-b border-[var(--color-border)] border-opacity-30 mb-1 pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[var(--color-muted)]", children: "FPS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[var(--color-fg)]", children: fps })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full min-h-0 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: history.fps, min: 0, max: Math.max(60, ...history.fps) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-h-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[var(--color-muted)]", children: "PING (ms)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-[var(--color-fg)]", children: ping === 0 ? "<1" : ping })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full min-h-0 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: history.ping, min: 0 }) })
      ] })
    ] });
  }
  if (mode === "detailed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full font-mono text-xs overflow-hidden select-none justify-between py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto custom-scrollbar pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-[var(--color-border)] pb-2 mb-2 opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-bold", children: "SYSTEM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-muted)]", children: [
              realStats.os,
              " / ",
              realStats.browser
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-[var(--color-muted)] truncate", title: realStats.gpu, children: [
            "GPU: ",
            realStats.gpu
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-2 border-b border-[var(--color-border)] border-opacity-30 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-muted)] text-[10px]", children: "CORES" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-fg)]", children: realStats.cores })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-muted)] text-[10px]", children: "RAM (EST)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-fg)]", children: realStats.memoryGB ? `${realStats.memoryGB} GB` : "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-muted)] text-[10px]", children: "NETWORK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[var(--color-fg)]", children: [
            realStats.network.type ? realStats.network.type.toUpperCase() : "UNKNOWN",
            realStats.network.downlink ? ` (${realStats.network.downlink} Mbps)` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-2 border-t border-[var(--color-border)] text-[10px] text-[var(--color-muted)] flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: res }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          fps,
          " FPS"
        ] })
      ] })
    ] });
  }
  if (mode === "minimal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center h-full w-full p-2 select-none overflow-hidden space-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold font-mono text-[var(--color-fg)] tracking-tighter", children: fps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[var(--color-muted)]", children: "FPS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 opacity-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${ping > 100 ? "bg-red-500" : ping > 50 ? "bg-yellow-500" : "bg-green-500"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-[var(--color-muted)]", children: [
          ping === 0 ? "<1" : ping,
          "ms"
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center h-full px-2 py-1 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "fps", value: `${fps}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "ping", value: `${ping === 0 ? "<1" : ping}ms` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "res", value: res })
  ] });
};
const getIconClass = (code, isDay) => {
  switch (code) {
    case 0:
      return isDay ? "wi-day-sunny" : "wi-night-clear";
    case 1:
      return isDay ? "wi-day-sunny-overcast" : "wi-night-alt-partly-cloudy";
    case 2:
      return isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy";
    case 3:
      return "wi-cloudy";
    case 45:
      return isDay ? "wi-day-fog" : "wi-night-fog";
    case 48:
      return isDay ? "wi-day-fog" : "wi-night-fog";
    case 51:
      return isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle";
    case 53:
      return isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle";
    case 55:
      return isDay ? "wi-day-sprinkle" : "wi-night-alt-sprinkle";
    case 56:
      return isDay ? "wi-day-sleet" : "wi-night-alt-sleet";
    case 57:
      return isDay ? "wi-day-sleet" : "wi-night-alt-sleet";
    case 61:
      return isDay ? "wi-day-showers" : "wi-night-alt-showers";
    case 63:
      return isDay ? "wi-day-rain" : "wi-night-alt-rain";
    case 65:
      return isDay ? "wi-day-rain" : "wi-night-alt-rain";
    case 66:
      return isDay ? "wi-day-rain-mix" : "wi-night-alt-rain-mix";
    case 67:
      return isDay ? "wi-day-rain-mix" : "wi-night-alt-rain-mix";
    case 71:
      return isDay ? "wi-day-snow" : "wi-night-alt-snow";
    case 73:
      return isDay ? "wi-day-snow" : "wi-night-alt-snow";
    case 75:
      return isDay ? "wi-day-snow" : "wi-night-alt-snow";
    case 77:
      return isDay ? "wi-day-hail" : "wi-night-alt-hail";
    case 80:
      return isDay ? "wi-day-showers" : "wi-night-alt-showers";
    case 81:
      return isDay ? "wi-day-showers" : "wi-night-alt-showers";
    case 82:
      return isDay ? "wi-day-showers" : "wi-night-alt-showers";
    case 85:
      return isDay ? "wi-day-snow" : "wi-night-alt-snow";
    case 86:
      return isDay ? "wi-day-snow" : "wi-night-alt-snow";
    case 95:
      return isDay ? "wi-day-thunderstorm" : "wi-night-alt-thunderstorm";
    case 96:
      return isDay ? "wi-day-storm-showers" : "wi-night-alt-storm-showers";
    case 99:
      return isDay ? "wi-day-storm-showers" : "wi-night-alt-storm-showers";
    default:
      return "wi-na";
  }
};
const WeatherIcon = ({ code, isDay }) => {
  const iconClass = getIconClass(code, isDay === 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: `wi ${iconClass}` }) });
};
const convertTemp = (tempF, unit) => {
  if (unit === "F") return tempF;
  return Math.round((tempF - 32) * 5 / 9);
};
const getWeatherCondition = (code, isDay = 1) => {
  if (code === 0) return isDay ? "Sunny" : "Clear Sky";
  if (code === 1) return isDay ? "Mainly Sunny" : "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Unknown";
};
const WeatherWidget = ({ mode = "standard", unit = "C" }) => {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const containerRef = reactExports.useRef(null);
  const [visibleForecastCount, setVisibleForecastCount] = reactExports.useState(2);
  reactExports.useEffect(() => {
    const cached = localStorage.getItem("tui-weather-cache");
    let hasCache = false;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed) {
          setData(parsed);
          setLoading(false);
          hasCache = true;
        }
      } catch (e2) {
        console.error("Weather cache parse error", e2);
      }
    }
    if (!navigator.geolocation) {
      if (!hasCache) {
        setError("no geo support");
        setLoading(false);
      }
      return;
    }
    const fetchWeather = async (lat, lon, defaultCity) => {
      try {
        let city = defaultCity || "Unknown";
        if (!defaultCity) {
          try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const geoData = await geoRes.json();
            if (geoData.city) city = geoData.city;
            else if (geoData.locality) city = geoData.locality;
          } catch (e2) {
          }
        }
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,visibility&hourly=temperature_2m,weather_code,precipitation_probability&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
        );
        if (!response.ok) throw new Error("API Error");
        const result = await response.json();
        const now = /* @__PURE__ */ new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hour = String(now.getHours()).padStart(2, "0");
        const currentHourIso = `${year}-${month}-${day}T${hour}`;
        let hourIndex = 0;
        const resultTimeIndex = result.hourly.time.findIndex((t2) => t2.startsWith(currentHourIso));
        if (resultTimeIndex !== -1) hourIndex = resultTimeIndex;
        const currentData = {
          temp: Math.round(result.current.temperature_2m),
          condition: getWeatherCondition(result.current.weather_code, result.current.is_day),
          weatherCode: result.current.weather_code,
          humidity: result.current.relative_humidity_2m,
          windSpeed: Math.round(result.current.wind_speed_10m),
          feelsLike: Math.round(result.current.apparent_temperature),
          precipProb: result.hourly.precipitation_probability[hourIndex] || 0,
          precipAmt: result.current.precipitation,
          visKm: (result.current.visibility || 0) / 1e3,
          isDay: result.current.is_day
        };
        const nextHours = result.hourly.time.slice(hourIndex + 1, hourIndex + 4);
        const standardForecast = nextHours.map((_, i) => {
          const actualIndex = hourIndex + 1 + i;
          const safeIndex = Math.min(actualIndex, result.hourly.temperature_2m.length - 1);
          const dateObj = new Date(result.hourly.time[safeIndex]);
          const hours = dateObj.getHours();
          const ampm = hours >= 12 ? "pm" : "am";
          const hours12 = hours % 12 || 12;
          const displayTime = `${hours12} ${ampm}`;
          const isDayForecast = hours >= 6 && hours < 20 ? 1 : 0;
          return {
            time: displayTime.padStart(5, " "),
            temp: Math.round(result.hourly.temperature_2m[safeIndex]),
            condition: getWeatherCondition(result.hourly.weather_code[safeIndex], isDayForecast),
            weatherCode: result.hourly.weather_code[safeIndex],
            isDay: isDayForecast
          };
        });
        const newData = {
          locationName: city,
          current: currentData,
          forecast: standardForecast
        };
        setData(newData);
        setLoading(false);
        setError(null);
        localStorage.setItem("tui-weather-cache", JSON.stringify(newData));
      } catch (err) {
        console.error(err);
        if (!hasCache) {
          setError("fetch failed");
          setLoading(false);
        }
      }
    };
    const delay = hasCache ? 1e3 : 0;
    const timer = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Geolocation Error:", err);
          if (!hasCache) {
            setError(err.message || "loc error");
            setLoading(false);
          }
        },
        { enableHighAccuracy: false, timeout: 5e3, maximumAge: 6e4 }
      );
    }, delay);
    return () => clearTimeout(timer);
  }, []);
  reactExports.useEffect(() => {
    if (!containerRef.current || mode === "icon") return;
    const handleResize = (entries) => {
      for (let entry of entries) {
        const h = entry.contentRect.height;
        if (h < 200) {
          setVisibleForecastCount(0);
        } else if (h < 300) {
          setVisibleForecastCount(2);
        } else {
          setVisibleForecastCount(4);
        }
      }
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mode]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center gap-2 text-[var(--color-muted)] select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex space-x-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse", style: { animationDelay: "0ms" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse", style: { animationDelay: "150ms" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-[var(--color-muted)] rounded-full animate-pulse", style: { animationDelay: "300ms" } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono opacity-50", children: "loading.." })
    ] });
  }
  if (error || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center gap-2 text-[var(--color-muted)] select-none px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono text-[var(--color-accent)]", children: "⚠" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono opacity-70 text-center", children: error || "no data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono opacity-40", children: "check location permissions" })
    ] });
  }
  if (mode === "icon") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "h-full w-full select-none overflow-hidden bg-[var(--color-bg)] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 grid-rows-[auto_1fr_auto] gap-2 h-full w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-bold text-2xl tracking-tight truncate w-full text-right", title: data.locationName, children: data.locationName }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center min-w-0 min-h-0 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[var(--color-fg)] font-bold text-4xl leading-none z-10 mb-2", children: [
          convertTemp(data.current.temp, unit),
          "°",
          unit
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center flex-1 w-full", style: { fontSize: "clamp(50px, 10vw, 100px)", lineHeight: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[var(--color-accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherIcon, { code: data.current.weatherCode, isDay: data.current.isDay }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center font-mono text-sm gap-1 text-[var(--color-muted)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] text-lg font-medium opacity-90 capitalize leading-none truncate w-full text-right mb-2", children: data.current.condition }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest opacity-70", children: "HUM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-bold text-right text-[var(--color-fg)]", children: [
            data.current.humidity,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest opacity-70", children: "WIND" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-bold text-right text-[var(--color-fg)]", children: [
            data.current.windSpeed,
            " mph"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest opacity-70", children: "VIS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-bold text-right text-[var(--color-fg)]", children: [
            data.current.visKm,
            " km"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest opacity-70", children: "FEELS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-bold text-right text-[var(--color-fg)]", children: [
            convertTemp(data.current.feelsLike, unit),
            "°"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex items-center justify-between border-t border-[var(--color-border)] pt-2 mt-1", children: data.forecast.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 w-1/3 text-[var(--color-fg)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono opacity-50", children: item.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
          convertTemp(item.temp, unit),
          "°"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.2rem", lineHeight: 1 }, className: "opacity-80 text-[var(--color-accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherIcon, { code: item.weatherCode || 0, isDay: item.isDay ?? 1 }) })
      ] }, i)) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "h-full flex flex-col p-3 select-none overflow-hidden relative", style: { fontFamily: "inherit" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-light text-[var(--color-fg)] leading-none", children: [
        convertTemp(data.current.temp, unit),
        "°"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-muted)] text-xl mt-1 opacity-80 lowercase", children: data.current.condition })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-2 gap-y-1 text-sm font-mono flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] w-8", children: "humi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-fg)]", children: [
          data.current.humidity,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] w-8", children: "wind" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-fg)]", children: [
          data.current.windSpeed,
          " mph"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] w-8", children: "prec" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-fg)]", children: [
          data.current.precipProb,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] w-8", children: "feel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-fg)]", children: [
          convertTemp(data.current.feelsLike, unit),
          "°"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0" }),
    visibleForecastCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 flex flex-col gap-1 border-t border-[var(--color-border)] border-opacity-30 pt-2 mt-2", children: data.forecast.slice(0, visibleForecastCount).map((f2, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] w-12 text-right mr-4", children: f2.time }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[var(--color-fg)] w-8", children: [
        convertTemp(f2.temp, unit),
        "°"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] opacity-70 ml-2 truncate lowercase", children: f2.condition })
    ] }, i)) })
  ] });
};
const TodoWidget = ({ tasks, setTasks }) => {
  const [newTaskText, setNewTaskText] = reactExports.useState("");
  const toggleTask = (id2) => {
    setTasks(tasks.map((t2) => t2.id === id2 ? { ...t2, done: !t2.done } : t2));
  };
  const removeTask = (e2, id2) => {
    e2.stopPropagation();
    setTasks(tasks.filter((t2) => t2.id !== id2));
  };
  const extractTime = (str) => {
    const timeRegex = /\b((?:1[0-2]|0?[1-9])(?::[0-5][0-9])?\s*(?:[aA][mM]|[pP][mM])|(?:2[0-3]|[01]?[0-9]):[0-5][0-9])\b/;
    const match = str.match(timeRegex);
    if (match) {
      const due = match[0];
      const safeDue = due.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const cleanText = str.replace(new RegExp(`\\b(at\\s+)?${safeDue}\\b`, "i"), "").replace(/\s+/g, " ").trim();
      return { text: cleanText || "Task", due };
    }
    return { text: str.trim() };
  };
  const addTask = (e2) => {
    e2.preventDefault();
    if (!newTaskText.trim()) return;
    const { text, due } = extractTime(newTaskText);
    const newTask = {
      id: Date.now(),
      text,
      done: false,
      due
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };
  const doneCount = tasks.filter((t2) => t2.done).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[var(--color-muted)] mb-2 text-xs flex justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        tasks.length - doneCount,
        " remaining"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        doneCount,
        " done"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0", children: [
      tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-[var(--color-muted)] italic text-sm py-2 text-center opacity-50", children: "empty list..." }),
      tasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          onClick: () => toggleTask(task.id),
          className: `
                            group mb-1 flex items-center justify-between cursor-pointer transition-colors duration-200 py-1
                            ${task.done ? "text-[var(--color-muted)]" : "text-[var(--color-fg)] hover:text-[var(--color-accent)]"}
                        `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0 mr-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono shrink-0 select-none", children: task.done ? "[x]" : "[ ]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `truncate ${task.done ? "line-through" : ""}`, children: task.text }),
              task.due && !task.done && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] border border-[var(--color-muted)] px-1.5 py-0.5 rounded text-[var(--color-accent)] opacity-80 whitespace-nowrap", children: [
                "due ",
                task.due
              ] }),
              task.due && task.done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[10px] opacity-50 whitespace-nowrap", children: task.due })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e2) => removeTask(e2, task.id),
                className: "opacity-0 group-hover:opacity-100 text-[var(--color-muted)] hover:text-red-500 px-2 shrink-0",
                children: "x"
              }
            )
          ]
        },
        task.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: addTask, className: "mt-2 pt-2 border-t border-[var(--color-border)] flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-accent)] font-bold", children: ">" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: newTaskText,
          onChange: (e2) => setNewTaskText(e2.target.value),
          placeholder: "add task (e.g. 'meet john 2pm')",
          className: "w-full bg-transparent border-none outline-none text-[var(--color-fg)] placeholder-[var(--color-muted)] text-sm select-text"
        }
      )
    ] })
  ] });
};
const LinksWidget = ({ groups, openInNewTab = true }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6 h-full overflow-y-auto custom-scrollbar pr-2", children: [
    groups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[var(--color-muted)] text-xs font-bold uppercase mb-1 tracking-wider border-b border-[var(--color-border)] pb-1 w-max", children: group.category }),
      group.links.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-xs italic opacity-50", children: "empty" }),
      group.links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: link.url,
          target: openInNewTab ? "_blank" : "_self",
          rel: "noopener noreferrer",
          className: "text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:text-shadow-glow transition-all duration-[20ms] text-sm truncate block",
          title: link.url,
          children: [
            "> ",
            link.label
          ]
        },
        `${link.label}-${link.url}`
      ))
    ] }, group.category)),
    groups.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full flex items-center justify-center text-[var(--color-muted)]", children: "No shortcuts configured. Open settings (top right) to add some." })
  ] });
};
const ENGINES = [
  { id: "google", label: "google", url: "https://www.google.com/search?q=" },
  { id: "ddg", label: "duckduckgo", url: "https://duckduckgo.com/?q=" },
  { id: "bing", label: "bing", url: "https://www.bing.com/search?q=" },
  { id: "youtube", label: "youtube", url: "https://www.youtube.com/results?search_query=" },
  { id: "reddit", label: "reddit", url: "https://www.reddit.com/search/?q=" },
  { id: "github", label: "github", url: "https://github.com/search?q=" }
];
const SearchWidget = () => {
  const [query, setQuery] = reactExports.useState("");
  const [engineIndex, setEngineIndex] = reactExports.useState(0);
  const [history, setHistory] = reactExports.useState([]);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const savedEngine = localStorage.getItem("tui-search-engine");
    if (savedEngine) {
      const index2 = ENGINES.findIndex((e2) => e2.id === savedEngine);
      if (index2 !== -1) setEngineIndex(index2);
    }
    try {
      const savedHistory = localStorage.getItem("tui-search-history");
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e2) {
    }
  }, []);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const cycleEngine = () => {
    var _a;
    const nextIndex = (engineIndex + 1) % ENGINES.length;
    setEngineIndex(nextIndex);
    localStorage.setItem("tui-search-engine", ENGINES[nextIndex].id);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const saveToHistory = (q2) => {
    const clean = q2.trim();
    if (!clean) return;
    setHistory((prev) => {
      const next = [clean, ...prev.filter((x2) => x2 !== clean)].slice(0, 8);
      localStorage.setItem("tui-search-history", JSON.stringify(next));
      return next;
    });
  };
  const clearHistory = (e2) => {
    var _a;
    e2.stopPropagation();
    setHistory([]);
    localStorage.removeItem("tui-search-history");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handleSearch = (e2) => {
    var _a;
    e2.preventDefault();
    if (!query.trim()) return;
    saveToHistory(query);
    const currentEngine2 = ENGINES[engineIndex];
    window.open(currentEngine2.url + encodeURIComponent(query), "_blank");
    setQuery("");
    setShowHistory(false);
    (_a = inputRef.current) == null ? void 0 : _a.blur();
  };
  const handleSelectHistory = (item) => {
    var _a;
    setQuery(item);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const currentEngine = ENGINES[engineIndex];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "h-full flex flex-col justify-center px-2 relative",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearch, className: "flex items-center gap-2 w-full z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: cycleEngine,
              className: "shrink-0 text-[var(--color-accent)] hover:text-[var(--color-fg)] font-bold font-mono transition-colors select-none",
              title: "Click to switch search engine",
              children: [
                "[",
                currentEngine.label,
                "]"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-muted)] font-bold pointer-events-none", children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: query,
                onChange: (e2) => setQuery(e2.target.value),
                onFocus: () => setShowHistory(true),
                className: "w-full bg-transparent border-none outline-none text-[var(--color-fg)] placeholder-[var(--color-muted)] font-mono pl-4 focus:placeholder-opacity-50 h-full py-1",
                placeholder: "search...",
                autoComplete: "off"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "text-[var(--color-muted)] hover:text-[var(--color-fg)] text-xs font-mono",
              children: "[ENTER]"
            }
          )
        ] }),
        showHistory && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[70%] left-0 w-full z-30 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[var(--color-bg)] border border-[var(--color-border)] shadow-xl animate-in fade-in slide-in-from-top-2 duration-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-2 py-1 border-b border-[var(--color-border)] bg-[var(--color-hover)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[var(--color-muted)] font-mono uppercase", children: "History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: clearHistory,
                className: "text-[10px] text-[var(--color-accent)] hover:text-red-500 font-mono",
                children: "[CLEAR]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[120px] overflow-y-auto custom-scrollbar", children: history.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              onClick: () => handleSelectHistory(item),
              className: "px-2 py-1.5 text-xs text-[var(--color-fg)] hover:bg-[var(--color-hover)] hover:text-[var(--color-accent)] cursor-pointer truncate font-mono border-b border-[var(--color-border)] border-opacity-10 last:border-0",
              children: item
            },
            i
          )) })
        ] }) })
      ]
    }
  );
};
const DonutWidget = ({ speed = 50 }) => {
  const preRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const [scale, setScale] = reactExports.useState(1);
  reactExports.useEffect(() => {
    let A2 = 0, B2 = 0;
    let intervalId;
    const renderDonut = () => {
      if (!preRef.current) return;
      let b = [];
      let z2 = [];
      A2 += 0.07;
      B2 += 0.03;
      let cA = Math.cos(A2), sA = Math.sin(A2), cB = Math.cos(B2), sB = Math.sin(B2);
      for (let k2 = 0; k2 < 1760; k2++) {
        b[k2] = k2 % 80 === 79 ? "\n" : " ";
        z2[k2] = 0;
      }
      for (let j = 0; j < 6.28; j += 0.07) {
        let ct = Math.cos(j), st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          let sp = Math.sin(i), cp = Math.cos(i), h = ct + 2, D2 = 1 / (sp * h * sA + st * cA + 5), t2 = sp * h * cA - st * sA;
          let x2 = 0 | 40 + 30 * D2 * (cp * h * cB - t2 * sB), y2 = 0 | 12 + 15 * D2 * (cp * h * sB + t2 * cB), o = x2 + 80 * y2, N2 = 0 | 8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB);
          if (y2 < 22 && y2 >= 0 && x2 >= 0 && x2 < 79 && D2 > z2[o]) {
            z2[o] = D2;
            b[o] = ".,-~:;=!*#$@"[N2 > 0 ? N2 : 0];
          }
        }
      }
      preRef.current.innerText = b.join("");
    };
    const intervalDelay = Math.max(10, 200 - speed * 2);
    intervalId = window.setInterval(renderDonut, intervalDelay);
    return () => clearInterval(intervalId);
  }, [speed]);
  reactExports.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const COLS = 80;
        const ROWS = 22;
        const CHAR_W = 7.22;
        const CHAR_H = 12;
        const textBlockWidth = COLS * CHAR_W;
        const textBlockHeight = ROWS * CHAR_H;
        const scaleX = clientWidth / textBlockWidth;
        const scaleY = clientHeight / textBlockHeight;
        const newScale = Math.min(scaleX, scaleY) * 0.95;
        setScale(newScale);
      }
    };
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    setTimeout(handleResize, 100);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full flex items-center justify-center overflow-hidden bg-[var(--color-bg)] rounded text-[var(--color-accent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "pre",
    {
      ref: preRef,
      className: "font-mono whitespace-pre select-none origin-center transition-transform duration-75 ease-out",
      style: {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: "12px",
        lineHeight: "12px",
        transform: `scale(${scale})`
      }
    }
  ) });
};
const MatrixWidget = ({ options, speed = 50 }) => {
  const activeSpeed = (options == null ? void 0 : options.speed) ?? speed;
  const charMode = (options == null ? void 0 : options.charSet) ?? "mixed";
  const fade = (options == null ? void 0 : options.fade) ?? 0.05;
  const glow = (options == null ? void 0 : options.glow) ?? true;
  const fontSize = (options == null ? void 0 : options.fontSize) ?? 16;
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const matrixRef = reactExports.useRef([]);
  const lengthRef = reactExports.useRef([]);
  const spacesRef = reactExports.useRef([]);
  const updatesRef = reactExports.useRef([]);
  const countRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const colWidth = fontSize;
    let cols = Math.floor(width / colWidth);
    let rows = Math.floor(height / fontSize);
    const trailMultiplier = Math.max(0.3, 1 - fade * 3);
    const getChar = () => {
      if (charMode === "numbers") {
        return String.fromCharCode(48 + Math.floor(Math.random() * 10));
      } else if (charMode === "latin") {
        const set = Math.random() < 0.5 ? 65 : 97;
        return String.fromCharCode(set + Math.floor(Math.random() * 26));
      }
      const r2 = Math.random();
      if (r2 < 0.5) {
        return String.fromCharCode(48 + Math.floor(Math.random() * 10));
      } else {
        const set = Math.random() < 0.5 ? 65 : 97;
        return String.fromCharCode(set + Math.floor(Math.random() * 26));
      }
    };
    const initMatrix = () => {
      const newMatrix = [];
      for (let r2 = 0; r2 < rows; r2++) {
        const rowCells = [];
        for (let c = 0; c < cols; c++) {
          rowCells.push({ val: " ", isHead: false });
        }
        newMatrix.push(rowCells);
      }
      matrixRef.current = newMatrix;
      const newLength = [];
      const newSpaces = [];
      const newUpdates = [];
      for (let j = 0; j < cols; j++) {
        newSpaces[j] = Math.floor(Math.random() * rows) + 1;
        newLength[j] = Math.floor((Math.random() * (rows - 3) + 3) * trailMultiplier);
        newUpdates[j] = Math.floor(Math.random() * 3) + 1;
      }
      lengthRef.current = newLength;
      spacesRef.current = newSpaces;
      updatesRef.current = newUpdates;
    };
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const newCols = Math.floor(width / colWidth);
      const newRows = Math.floor(height / fontSize);
      if (newCols !== cols || newRows !== rows) {
        cols = newCols;
        rows = newRows;
        initMatrix();
      }
    });
    resizeObserver.observe(container);
    initMatrix();
    let animationId;
    let lastTime = 0;
    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      return {
        bg: style.getPropertyValue("--color-bg").trim() || "#000",
        fg: style.getPropertyValue("--color-fg").trim() || "#fff",
        accent: style.getPropertyValue("--color-accent").trim() || "#0f0"
      };
    };
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const dt = timestamp - lastTime;
      const interval = Math.max(20, 120 - activeSpeed);
      if (dt < interval) return;
      lastTime = timestamp;
      const matrix = matrixRef.current;
      const length = lengthRef.current;
      const spaces = spacesRef.current;
      const updates = updatesRef.current;
      if (!matrix.length || rows < 2) return;
      countRef.current++;
      if (countRef.current > 4) countRef.current = 1;
      for (let j = 0; j < cols; j++) {
        if (countRef.current > updates[j]) {
          for (let r2 = rows - 1; r2 > 0; r2--) {
            matrix[r2][j] = { ...matrix[r2 - 1][j] };
          }
          if (spaces[j] > 0) {
            matrix[0][j] = { val: " ", isHead: false };
            spaces[j]--;
          } else {
            if (length[j] > 0) {
              matrix[0][j] = { val: getChar(), isHead: false };
              length[j]--;
            } else {
              matrix[0][j] = { val: " ", isHead: false };
              spaces[j] = Math.floor(Math.random() * rows) + 1;
              length[j] = Math.floor((Math.random() * (rows - 3) + 3) * trailMultiplier);
            }
          }
          for (let r2 = rows - 1; r2 >= 0; r2--) {
            const cell = matrix[r2][j];
            if (cell.val !== " ") {
              const below = r2 + 1 < rows ? matrix[r2 + 1][j] : { val: " " };
              cell.isHead = below.val === " ";
              if (!cell.isHead && Math.random() < 0.05) {
                cell.val = getChar();
              }
            }
          }
        }
      }
      const { bg: bg2, fg: fg2, accent } = getColors();
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = bg2;
      ctx.fillRect(0, 0, width, height);
      for (let r2 = 0; r2 < rows; r2++) {
        for (let c = 0; c < cols; c++) {
          const cell = matrix[r2][c];
          if (cell.val !== " ") {
            const x2 = c * colWidth;
            const y2 = r2 * fontSize;
            if (cell.isHead) {
              ctx.fillStyle = fg2;
            } else {
              ctx.fillStyle = accent;
              if (glow && Math.random() < 0.15) {
                ctx.shadowBlur = 6;
                ctx.shadowColor = accent;
              }
            }
            ctx.fillText(cell.val, x2, y2);
            ctx.shadowBlur = 0;
          }
        }
      }
    };
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [activeSpeed, charMode, fade, glow, fontSize]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "block w-full h-full" }) });
};
const PIPE_H = "━";
const PIPE_V = "┃";
const CORNER_TL = "┏";
const CORNER_TR = "┓";
const CORNER_BL = "┗";
const CORNER_BR = "┛";
const getPipeChar = (oldDir, newDir) => {
  if (oldDir === newDir) {
    return oldDir === 0 || oldDir === 2 ? PIPE_V : PIPE_H;
  }
  if (oldDir === 0 && newDir === 1 || oldDir === 3 && newDir === 2) return CORNER_TL;
  if (oldDir === 0 && newDir === 3 || oldDir === 1 && newDir === 2) return CORNER_TR;
  if (oldDir === 2 && newDir === 1 || oldDir === 3 && newDir === 0) return CORNER_BL;
  if (oldDir === 2 && newDir === 3 || oldDir === 1 && newDir === 0) return CORNER_BR;
  return PIPE_V;
};
const PipesWidget = ({ options, speed = 50 }) => {
  const activeSpeed = (options == null ? void 0 : options.speed) ?? speed;
  const fade = (options == null ? void 0 : options.fade) ?? 0.1;
  const pipeCount = Math.min((options == null ? void 0 : options.count) ?? 3, 10);
  const fontSize = (options == null ? void 0 : options.fontSize) ?? 16;
  const lifetime = (options == null ? void 0 : options.lifetime) ?? 80;
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const fontSize2 = (options == null ? void 0 : options.fontSize) ?? 16;
    const rowHeight = fontSize2;
    ctx.font = `${fontSize2}px "JetBrains Mono", monospace`;
    const colWidth = ctx.measureText("━").width || fontSize2;
    let cols = Math.floor(width / colWidth);
    let rows = Math.floor(height / rowHeight);
    const getThemeColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return [
        root2.getPropertyValue("--color-accent").trim(),
        root2.getPropertyValue("--color-muted").trim()
      ].filter(Boolean);
    };
    let currentColors = getThemeColors();
    const initPipe = () => ({
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
      dir: Math.floor(Math.random() * 4),
      color: currentColors[Math.floor(Math.random() * currentColors.length)] || "#888"
    });
    const pipes = [];
    for (let i = 0; i < pipeCount; i++) {
      pipes.push(initPipe());
    }
    const steps = new Array(pipeCount).fill(0);
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / colWidth);
      rows = Math.floor(height / rowHeight);
      const bg22 = getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
      ctx.fillStyle = bg22;
      ctx.fillRect(0, 0, width, height);
      pipes.length = 0;
      steps.length = 0;
      for (let i = 0; i < pipeCount; i++) {
        pipes.push(initPipe());
        steps.push(0);
      }
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    let fadeTimer = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(20, 200 - activeSpeed * 2);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
      fadeTimer++;
      if (fadeTimer % 3 === 0) {
        ctx.fillStyle = bgColor;
        ctx.globalAlpha = fade;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }
      ctx.font = `${fontSize2}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      if (Math.random() < 0.02) currentColors = getThemeColors();
      pipes.forEach((p2, index2) => {
        let newDir = p2.dir;
        if (Math.random() > 0.75) {
          newDir = (p2.dir + (Math.random() > 0.5 ? 1 : 3)) % 4;
        }
        const char = getPipeChar(p2.dir, newDir);
        ctx.fillStyle = p2.color;
        ctx.fillText(char, p2.x * colWidth, p2.y * rowHeight);
        p2.dir = newDir;
        if (newDir === 0) p2.y--;
        else if (newDir === 1) p2.x++;
        else if (newDir === 2) p2.y++;
        else if (newDir === 3) p2.x--;
        if (p2.x >= cols) p2.x = 0;
        if (p2.x < 0) p2.x = cols - 1;
        if (p2.y >= rows) p2.y = 0;
        if (p2.y < 0) p2.y = rows - 1;
        steps[index2]++;
        if (steps[index2] > lifetime + Math.random() * (lifetime * 0.3)) {
          pipes[index2] = initPipe();
          pipes[index2].color = currentColors[Math.floor(Math.random() * currentColors.length)] || "#888";
          steps[index2] = 0;
        }
      });
    };
    const bg2 = getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim();
    ctx.fillStyle = bg2;
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [activeSpeed, fade, pipeCount, fontSize, lifetime]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "block w-full h-full" }) });
};
const SnakeWidget = ({ speed = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const cellSize = 10;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        fg: root2.getPropertyValue("--color-fg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim(),
        border: root2.getPropertyValue("--color-border").trim()
      };
    };
    let snake = [];
    let food = { x: 0, y: 0 };
    let dir = { x: 1, y: 0 };
    let score = 0;
    const placeFood = () => {
      food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      };
      while (snake.some((s) => s.x === food.x && s.y === food.y)) {
        food.x = Math.floor(Math.random() * cols);
        food.y = Math.floor(Math.random() * rows);
      }
    };
    const initGame = () => {
      const startX = Math.floor(cols / 2);
      const startY = Math.floor(rows / 2);
      snake = [];
      for (let i = 0; i < 4; i++) {
        snake.push({ x: startX - i, y: startY });
      }
      dir = { x: 1, y: 0 };
      score = 0;
      placeFood();
    };
    initGame();
    const getAIDirection = () => {
      const head = snake[0];
      const possibleDirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
      ].filter((d) => !(d.x === -dir.x && d.y === -dir.y));
      const safeDirs = possibleDirs.filter((d) => {
        const nx = (head.x + d.x + cols) % cols;
        const ny = (head.y + d.y + rows) % rows;
        return !snake.some((s, i) => i > 0 && s.x === nx && s.y === ny);
      });
      if (safeDirs.length === 0) return dir;
      safeDirs.sort((a, b) => {
        const ax = (head.x + a.x + cols) % cols;
        const ay = (head.y + a.y + rows) % rows;
        const bx = (head.x + b.x + cols) % cols;
        const by = (head.y + b.y + rows) % rows;
        const aDist = Math.abs(ax - food.x) + Math.abs(ay - food.y);
        const bDist = Math.abs(bx - food.x) + Math.abs(by - food.y);
        return aDist - bDist;
      });
      if (Math.random() < 0.08 && safeDirs.length > 1) {
        return safeDirs[1];
      }
      return safeDirs[0];
    };
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / cellSize);
      rows = Math.floor(height / cellSize);
      initGame();
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(40, 220 - speed * 2);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      const colors = getColors();
      dir = getAIDirection();
      const head = snake[0];
      const newHead = {
        x: (head.x + dir.x + cols) % cols,
        y: (head.y + dir.y + rows) % rows
      };
      if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        initGame();
        return;
      }
      snake.unshift(newHead);
      if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        placeFood();
      } else {
        snake.pop();
      }
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = colors.border;
      ctx.globalAlpha = 0.1;
      for (let x2 = 0; x2 <= cols; x2++) {
        ctx.beginPath();
        ctx.moveTo(x2 * cellSize, 0);
        ctx.lineTo(x2 * cellSize, rows * cellSize);
        ctx.stroke();
      }
      for (let y2 = 0; y2 <= rows; y2++) {
        ctx.beginPath();
        ctx.moveTo(0, y2 * cellSize);
        ctx.lineTo(cols * cellSize, y2 * cellSize);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      snake.forEach((seg, i) => {
        const px = seg.x * cellSize;
        const py = seg.y * cellSize;
        const inset = i === 0 ? 1 : 2;
        if (i === 0) {
          ctx.fillStyle = colors.fg;
          ctx.fillRect(px + inset, py + inset, cellSize - inset * 2, cellSize - inset * 2);
        } else {
          const alpha = Math.max(0.25, 1 - i / snake.length * 0.75);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = colors.accent;
          ctx.fillRect(px + inset, py + inset, cellSize - inset * 2, cellSize - inset * 2);
          ctx.globalAlpha = 1;
        }
      });
      const pulse = 0.7 + Math.sin(timestamp * 5e-3) * 0.3;
      ctx.globalAlpha = pulse;
      ctx.fillStyle = colors.accent;
      const foodInset = 2;
      ctx.fillRect(
        food.x * cellSize + foodInset,
        food.y * cellSize + foodInset,
        cellSize - foodInset * 2,
        cellSize - foodInset * 2
      );
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.muted;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textBaseline = "top";
      ctx.fillText(`score: ${score}`, 4, height - 14);
    };
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const GameOfLifeWidget = ({ speed = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const cellSize = 8;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim()
      };
    };
    let grid = [];
    let generation = 0;
    let staleCount = 0;
    let prevLiveCells = 0;
    const randomize = () => {
      grid = [];
      for (let y2 = 0; y2 < rows; y2++) {
        grid[y2] = [];
        for (let x2 = 0; x2 < cols; x2++) {
          grid[y2][x2] = Math.random() < 0.3;
        }
      }
      generation = 0;
      staleCount = 0;
    };
    randomize();
    const countNeighbors = (x2, y2) => {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const ny = (y2 + dy + rows) % rows;
          const nx = (x2 + dx + cols) % cols;
          if (grid[ny][nx]) count++;
        }
      }
      return count;
    };
    const step = () => {
      const next = [];
      let liveCells = 0;
      for (let y2 = 0; y2 < rows; y2++) {
        next[y2] = [];
        for (let x2 = 0; x2 < cols; x2++) {
          const n2 = countNeighbors(x2, y2);
          if (grid[y2][x2]) {
            next[y2][x2] = n2 === 2 || n2 === 3;
          } else {
            next[y2][x2] = n2 === 3;
          }
          if (next[y2][x2]) liveCells++;
        }
      }
      grid = next;
      generation++;
      if (Math.abs(liveCells - prevLiveCells) < 3) {
        staleCount++;
      } else {
        staleCount = 0;
      }
      prevLiveCells = liveCells;
      if (staleCount > 30 || liveCells < 5) {
        randomize();
      }
    };
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.floor(width / cellSize);
      rows = Math.floor(height / cellSize);
      randomize();
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(30, 300 - speed * 3);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      step();
      const colors = getColors();
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      for (let y2 = 0; y2 < rows; y2++) {
        for (let x2 = 0; x2 < cols; x2++) {
          if (grid[y2][x2]) {
            const n2 = countNeighbors(x2, y2);
            if (n2 === 3) {
              ctx.fillStyle = colors.accent;
              ctx.globalAlpha = 1;
            } else {
              ctx.fillStyle = colors.accent;
              ctx.globalAlpha = 0.5;
            }
            ctx.fillRect(x2 * cellSize + 1, y2 * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.muted;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textBaseline = "top";
      ctx.fillText(`gen: ${generation}`, 4, height - 14);
    };
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const FireworksWidget = ({ speed = 50, explosionSize = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        fg: root2.getPropertyValue("--color-fg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim()
      };
    };
    const sparkChars = ["*", "·", "✦", "✧", "+", "•", "°", "¤"];
    let particles = [];
    let rockets = [];
    const explode = (x2, y2, color) => {
      const count = 10 + Math.floor(Math.random() * 8);
      const minDim = Math.min(width, height);
      const velScale = minDim * 0.012 * (explosionSize / 50);
      for (let i = 0; i < count; i++) {
        const angle = Math.PI * 2 * i / count + (Math.random() - 0.5) * 0.3;
        const vel = (0.5 + Math.random() * 1.5) * velScale;
        particles.push({
          x: x2,
          y: y2,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          char: sparkChars[Math.floor(Math.random() * sparkChars.length)],
          color
        });
      }
    };
    const launchRocket = () => {
      const colors = getColors();
      const rocketSpeed = height * 0.015;
      rockets.push({
        x: width * 0.1 + Math.random() * width * 0.8,
        // keep within 10-90% of width
        y: height,
        vy: -(rocketSpeed + Math.random() * rocketSpeed),
        targetY: height * (0.15 + Math.random() * 0.35),
        color: Math.random() > 0.5 ? colors.accent : colors.fg
      });
    };
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    let launchTimer = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(16, 60 - speed * 0.5);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      const colors = getColors();
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      launchTimer++;
      const launchInterval = Math.max(20, 80 - speed * 0.5);
      if (launchTimer >= launchInterval) {
        launchRocket();
        launchTimer = 0;
      }
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textBaseline = "top";
      rockets = rockets.filter((r2) => {
        r2.y += r2.vy;
        if (r2.y <= r2.targetY) {
          explode(r2.x, r2.y, r2.color);
          return false;
        }
        ctx.fillStyle = r2.color;
        ctx.fillText("│", r2.x, r2.y);
        return true;
      });
      particles = particles.filter((p2) => {
        p2.x += p2.vx;
        p2.y += p2.vy;
        p2.vy += 0.05;
        p2.vx *= 0.98;
        p2.life++;
        if (p2.life >= p2.maxLife) return false;
        const alpha = Math.max(0, 1 - p2.life / p2.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p2.color;
        ctx.fillText(p2.char, p2.x, p2.y);
        ctx.globalAlpha = 1;
        return true;
      });
    };
    const bg2 = getColors().bg;
    ctx.fillStyle = bg2;
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed, explosionSize]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const StarfieldWidget = ({ speed = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        fg: root2.getPropertyValue("--color-fg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim()
      };
    };
    const starChars = [".", "·", "∗", "✦", "•", "°"];
    let stars = [];
    const initStar = (z2) => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: z2 ?? Math.random() * width,
      pz: 0
    });
    const populateStars = () => {
      const area = width * height;
      const count = Math.min(300, Math.max(20, Math.floor(area / 4e3)));
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push(initStar());
      }
    };
    populateStars();
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      populateStars();
    });
    resizeObserver.observe(container);
    let animationId;
    const render = () => {
      animationId = requestAnimationFrame(render);
      const colors = getColors();
      const spd = speed * 0.15;
      ctx.globalAlpha = 1;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      ctx.textBaseline = "middle";
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= spd;
        if (s.z <= 0) {
          Object.assign(s, initStar(width));
          s.pz = s.z;
          continue;
        }
        const sx = s.x / s.z * (width / 4) + cx;
        const sy = s.y / s.z * (height / 4) + cy;
        if (sx < 0 || sx >= width || sy < 0 || sy >= height) {
          Object.assign(s, initStar(width));
          s.pz = s.z;
          continue;
        }
        const r2 = Math.max(0, 1 - s.z / width);
        const charIndex = Math.min(starChars.length - 1, Math.floor(r2 * starChars.length));
        const fontSize = 8 + r2 * 10;
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.globalAlpha = 0.3 + r2 * 0.7;
        if (r2 > 0.7) {
          ctx.fillStyle = colors.accent;
        } else if (r2 > 0.4) {
          ctx.fillStyle = colors.fg;
        } else {
          ctx.fillStyle = colors.muted;
        }
        ctx.fillText(starChars[charIndex], sx, sy);
        if (r2 > 0.5 && spd > 2) {
          const psx = s.x / s.pz * (width / 4) + cx;
          const psy = s.y / s.pz * (height / 4) + cy;
          ctx.beginPath();
          ctx.moveTo(psx, psy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = colors.accent;
          ctx.globalAlpha = r2 * 0.3;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    };
    ctx.fillStyle = getColors().bg;
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const RainWidget = ({ speed = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        fg: root2.getPropertyValue("--color-fg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim()
      };
    };
    const dropChars = ["│", "┃", "|", "¦"];
    const splashChars = ["·", ".", "∙", "˙", "°"];
    let drops = [];
    let splashes = [];
    const initDrop = (startTop) => ({
      x: Math.random() * width,
      y: startTop ? -20 : Math.random() * height * -1,
      speed: 2 + Math.random() * 4,
      char: dropChars[Math.floor(Math.random() * dropChars.length)],
      length: 2 + Math.floor(Math.random() * 4)
    });
    const dropCount = Math.floor(width / 8);
    for (let i = 0; i < dropCount; i++) {
      drops.push(initDrop());
    }
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(16, 50 - speed * 0.4);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      const colors = getColors();
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.textBaseline = "top";
      drops.forEach((d, i) => {
        d.y += d.speed * (speed / 50);
        for (let j = 0; j < d.length; j++) {
          const trailY = d.y - j * 10;
          if (trailY < 0 || trailY > height) continue;
          const alpha = Math.max(0.1, 1 - j / d.length);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = j === 0 ? colors.fg : colors.muted;
          ctx.font = `${10 + (d.length - j)}px "JetBrains Mono", monospace`;
          ctx.fillText(d.char, d.x, trailY);
        }
        ctx.globalAlpha = 1;
        if (d.y > height) {
          splashes.push({
            x: d.x,
            y: height - 8,
            life: 0,
            maxLife: 10 + Math.random() * 10
          });
          drops[i] = initDrop(true);
        }
      });
      ctx.font = '8px "JetBrains Mono", monospace';
      splashes = splashes.filter((s) => {
        s.life++;
        if (s.life >= s.maxLife) return false;
        const alpha = 1 - s.life / s.maxLife;
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = colors.accent;
        const spread = s.life * 1.5;
        for (let i = -2; i <= 2; i++) {
          const char = splashChars[Math.floor(Math.random() * splashChars.length)];
          ctx.fillText(char, s.x + i * spread, s.y - s.life * 0.5);
        }
        ctx.globalAlpha = 1;
        return true;
      });
    };
    ctx.fillStyle = getColors().bg;
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const BEST_TIME_KEY = "tui-maze-best-time";
const MazeWidget = ({ speed = 50 }) => {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const cellSize = 12;
    let mazeCols = Math.floor(width / cellSize / 2) * 2 + 1;
    let mazeRows = Math.floor(height / cellSize / 2) * 2 + 1;
    if (mazeCols < 5) mazeCols = 5;
    if (mazeRows < 5) mazeRows = 5;
    const getColors = () => {
      const root2 = getComputedStyle(document.documentElement);
      return {
        bg: root2.getPropertyValue("--color-bg").trim(),
        fg: root2.getPropertyValue("--color-fg").trim(),
        accent: root2.getPropertyValue("--color-accent").trim(),
        muted: root2.getPropertyValue("--color-muted").trim(),
        border: root2.getPropertyValue("--color-border").trim()
      };
    };
    let maze = [];
    let stack = [];
    let phase = "generating";
    let pauseStartTime = 0;
    let pauseDuration = 0;
    let pauseNextAction = "solve";
    let solvePath = [];
    let solveVisited = [];
    let solveStartTime = 0;
    let solveElapsedMs = 0;
    let solveFrozen = false;
    let bestTimeMs = null;
    try {
      const stored = localStorage.getItem(BEST_TIME_KEY);
      if (stored) bestTimeMs = parseFloat(stored);
    } catch {
    }
    const formatTime = (ms) => {
      const s = ms / 1e3;
      if (s < 10) return s.toFixed(2) + "s";
      if (s < 60) return s.toFixed(1) + "s";
      const mins = Math.floor(s / 60);
      const secs = (s % 60).toFixed(0).padStart(2, "0");
      return `${mins}:${secs}`;
    };
    const initMaze = () => {
      maze = [];
      for (let y2 = 0; y2 < mazeRows; y2++) {
        maze[y2] = [];
        for (let x2 = 0; x2 < mazeCols; x2++) {
          maze[y2][x2] = 0;
        }
      }
      maze[1][1] = 1;
      stack = [{ x: 1, y: 1 }];
      phase = "generating";
      pauseStartTime = 0;
      pauseDuration = 0;
      solvePath = [];
      solveVisited = [];
      solveStartTime = 0;
      solveElapsedMs = 0;
      solveFrozen = false;
    };
    const initSolve = () => {
      solveVisited = [];
      for (let y2 = 0; y2 < mazeRows; y2++) {
        solveVisited[y2] = new Array(mazeCols).fill(false);
      }
      solvePath = [{ x: 1, y: 1 }];
      solveVisited[1][1] = true;
      phase = "solving";
      solveStartTime = performance.now();
      solveElapsedMs = 0;
      solveFrozen = false;
    };
    initMaze();
    const getNeighbors = (x2, y2) => {
      const dirs = [
        { dx: 0, dy: -2 },
        { dx: 2, dy: 0 },
        { dx: 0, dy: 2 },
        { dx: -2, dy: 0 }
      ];
      return dirs.filter((d) => {
        const nx = x2 + d.dx;
        const ny = y2 + d.dy;
        return nx > 0 && nx < mazeCols - 1 && ny > 0 && ny < mazeRows - 1 && maze[ny][nx] === 0;
      });
    };
    const getSolveNeighbors = (x2, y2) => {
      const dirs = [
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 }
      ];
      return dirs.filter((d) => {
        const nx = x2 + d.dx;
        const ny = y2 + d.dy;
        return nx >= 0 && nx < mazeCols && ny >= 0 && ny < mazeRows && maze[ny][nx] === 1 && !solveVisited[ny][nx];
      });
    };
    const resizeObserver = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      mazeCols = Math.floor(width / cellSize / 2) * 2 + 1;
      mazeRows = Math.floor(height / cellSize / 2) * 2 + 1;
      if (mazeCols < 5) mazeCols = 5;
      if (mazeRows < 5) mazeRows = 5;
      initMaze();
    });
    resizeObserver.observe(container);
    let animationId;
    let lastTime = 0;
    const render = (timestamp) => {
      animationId = requestAnimationFrame(render);
      const interval = Math.max(10, 80 - speed);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      const colors = getColors();
      const stepsPerFrame = Math.max(1, Math.floor(speed / 15));
      if (phase === "solving" && !solveFrozen) {
        solveElapsedMs = performance.now() - solveStartTime;
      }
      if (phase === "generating") {
        for (let s = 0; s < stepsPerFrame && stack.length > 0; s++) {
          const current = stack[stack.length - 1];
          const neighbors = getNeighbors(current.x, current.y);
          if (neighbors.length > 0) {
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            const wallX = current.x + chosen.dx / 2;
            const wallY = current.y + chosen.dy / 2;
            maze[wallY][wallX] = 1;
            maze[current.y + chosen.dy][current.x + chosen.dx] = 1;
            stack.push({ x: current.x + chosen.dx, y: current.y + chosen.dy });
          } else {
            stack.pop();
          }
        }
        if (stack.length === 0) {
          phase = "pausing";
          pauseStartTime = timestamp;
          pauseDuration = 1e3 + Math.random() * 1e3;
          pauseNextAction = "solve";
        }
      } else if (phase === "pausing") {
        if (timestamp - pauseStartTime >= pauseDuration) {
          if (pauseNextAction === "solve") {
            initSolve();
          } else {
            initMaze();
          }
        }
      } else if (phase === "solving") {
        for (let s = 0; s < stepsPerFrame && solvePath.length > 0; s++) {
          const current = solvePath[solvePath.length - 1];
          if (current.x === mazeCols - 2 && current.y === mazeRows - 2) {
            solveFrozen = true;
            solveElapsedMs = performance.now() - solveStartTime;
            if (bestTimeMs === null || solveElapsedMs < bestTimeMs) {
              bestTimeMs = solveElapsedMs;
              try {
                localStorage.setItem(BEST_TIME_KEY, String(bestTimeMs));
              } catch {
              }
            }
            phase = "pausing";
            pauseStartTime = timestamp;
            pauseDuration = 1500 + Math.random() * 2e3;
            pauseNextAction = "restart";
            break;
          }
          const neighbors = getSolveNeighbors(current.x, current.y);
          if (neighbors.length > 0) {
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            const next = { x: current.x + chosen.dx, y: current.y + chosen.dy };
            solveVisited[next.y][next.x] = true;
            solvePath.push(next);
          } else {
            solvePath.pop();
          }
        }
        if (solvePath.length === 0 && phase === "solving") {
          solveFrozen = true;
          phase = "pausing";
          pauseStartTime = timestamp;
          pauseDuration = 1e3 + Math.random() * 2e3;
          pauseNextAction = "restart";
        }
      }
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
      for (let y2 = 0; y2 < mazeRows; y2++) {
        for (let x2 = 0; x2 < mazeCols; x2++) {
          const px = x2 * cellSize;
          const py = y2 * cellSize;
          if (maze[y2][x2] === 0) {
            ctx.fillStyle = colors.border;
            ctx.globalAlpha = 0.4;
            ctx.fillRect(px, py, cellSize, cellSize);
            ctx.globalAlpha = 1;
          }
        }
      }
      if (phase === "solving" || phase === "pausing" && solvePath.length > 0) {
        solvePath.forEach((p2, i) => {
          ctx.fillStyle = colors.accent;
          ctx.globalAlpha = 0.3 + i / solvePath.length * 0.7;
          ctx.fillRect(p2.x * cellSize + 2, p2.y * cellSize + 2, cellSize - 4, cellSize - 4);
        });
        ctx.globalAlpha = 1;
      }
      if (phase === "generating" && stack.length > 0) {
        const head = stack[stack.length - 1];
        ctx.fillStyle = colors.accent;
        ctx.fillRect(head.x * cellSize, head.y * cellSize, cellSize, cellSize);
        stack.forEach((p2, i) => {
          if (i === stack.length - 1) return;
          ctx.fillStyle = colors.accent;
          ctx.globalAlpha = 0.15;
          ctx.fillRect(p2.x * cellSize + 1, p2.y * cellSize + 1, cellSize - 2, cellSize - 2);
        });
        ctx.globalAlpha = 1;
      }
      const showTimer = phase === "solving" || phase === "pausing" && solveFrozen && solvePath.length > 0;
      if (showTimer || bestTimeMs !== null) {
        ctx.save();
        const fontSize = Math.max(10, Math.min(14, Math.floor(width / 30)));
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.textBaseline = "bottom";
        const padding = 6;
        const bottomY = height - padding;
        if (showTimer) {
          const timeStr = formatTime(solveElapsedMs);
          ctx.fillStyle = colors.bg;
          ctx.globalAlpha = 0.7;
          const tw = ctx.measureText(timeStr).width;
          ctx.fillRect(padding - 2, bottomY - fontSize - 2, tw + 4, fontSize + 4);
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.accent;
          ctx.textAlign = "left";
          ctx.fillText(timeStr, padding, bottomY);
        }
        if (bestTimeMs !== null) {
          const bestStr = "★ " + formatTime(bestTimeMs);
          ctx.fillStyle = colors.bg;
          ctx.globalAlpha = 0.7;
          ctx.textAlign = "right";
          const bw = ctx.measureText(bestStr).width;
          ctx.fillRect(width - padding - bw - 2, bottomY - fontSize - 2, bw + 4, fontSize + 4);
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.muted;
          ctx.fillText(bestStr, width - padding, bottomY);
        }
        ctx.restore();
      }
    };
    ctx.fillStyle = getColors().bg;
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full" }) });
};
const THEMES = {
  darkish: {
    name: "darkish",
    colors: {
      bg: "#0d0d0d",
      fg: "#e0e0e0",
      muted: "#777777",
      border: "#333333",
      accent: "#ffffff",
      hover: "#222222"
    }
  },
  nord: {
    name: "nord",
    colors: {
      bg: "#2e3440",
      fg: "#d8dee9",
      muted: "#4c566a",
      border: "#434c5e",
      accent: "#88c0d0",
      hover: "#3b4252"
    }
  },
  blossom: {
    name: "blossom",
    colors: {
      bg: "#2d2024",
      fg: "#f5c2e7",
      muted: "#5c404b",
      border: "#5c404b",
      accent: "#f5e0dc",
      hover: "#3e2e34"
    }
  },
  lavender: {
    name: "lavender",
    colors: {
      bg: "#232136",
      fg: "#e0def4",
      muted: "#908caa",
      border: "#44415a",
      accent: "#c4a7e7",
      hover: "#2a273f"
    }
  },
  crimson: {
    name: "crimson",
    colors: {
      bg: "#1a0b0c",
      fg: "#e8c0c2",
      muted: "#5e2a2e",
      border: "#4a1a1e",
      accent: "#ff4455",
      hover: "#2d1315"
    }
  },
  oled: {
    name: "oled",
    colors: {
      bg: "#000000",
      fg: "#ffffff",
      muted: "#666666",
      border: "#333333",
      accent: "#00ff00",
      hover: "#111111"
    }
  },
  evergreen: {
    name: "evergreen",
    colors: {
      bg: "#0f1f1c",
      fg: "#d1e8e2",
      muted: "#2c5248",
      border: "#1f423a",
      accent: "#2bcb97",
      hover: "#162e29"
    }
  },
  greyish: {
    name: "greyish",
    colors: {
      bg: "#222222",
      fg: "#aaaaaa",
      muted: "#555555",
      border: "#444444",
      accent: "#dddddd",
      hover: "#333333"
    }
  },
  lightish: {
    name: "lightish",
    colors: {
      bg: "#f0f0f0",
      fg: "#222222",
      muted: "#888888",
      border: "#cccccc",
      accent: "#000000",
      hover: "#e0e0e0"
    }
  },
  solarDark: {
    name: "solar dark",
    colors: {
      bg: "#002b36",
      fg: "#839496",
      muted: "#586e75",
      border: "#073642",
      accent: "#b58900",
      hover: "#073642"
    }
  },
  solarLight: {
    name: "solar light",
    colors: {
      bg: "#fdf6e3",
      fg: "#657b83",
      muted: "#93a1a1",
      border: "#eee8d5",
      accent: "#cb4b16",
      hover: "#eee8d5"
    }
  },
  mix: {
    name: "mix",
    colors: {
      bg: "#191919",
      fg: "#f0f0f0",
      muted: "#ff00ff",
      border: "#00ffff",
      accent: "#ffff00",
      hover: "#2a2a2a"
    }
  },
  crt: {
    name: "crt",
    colors: {
      bg: "#050505",
      fg: "#33ff33",
      muted: "#1b5e20",
      border: "#2e7d32",
      accent: "#69f0ae",
      hover: "#0a1a0b"
    }
  },
  dracula: {
    name: "dracula",
    colors: {
      bg: "#282a36",
      fg: "#f8f8f2",
      muted: "#6272a4",
      border: "#44475a",
      accent: "#bd93f9",
      hover: "#44475a"
    }
  },
  gruvbox: {
    name: "gruvbox",
    colors: {
      bg: "#282828",
      fg: "#ebdbb2",
      muted: "#928374",
      border: "#504945",
      accent: "#fabd2f",
      hover: "#3c3836"
    }
  },
  monokai: {
    name: "monokai",
    colors: {
      bg: "#272822",
      fg: "#f8f8f2",
      muted: "#75715e",
      border: "#49483e",
      accent: "#a6e22e",
      hover: "#3e3d32"
    }
  },
  cyberpunk: {
    name: "cyberpunk",
    colors: {
      bg: "#000b1e",
      fg: "#00f3ff",
      muted: "#054863",
      border: "#003a5c",
      accent: "#ff003c",
      hover: "#001a3d"
    }
  },
  toxic: {
    name: "toxic",
    colors: {
      bg: "#121212",
      fg: "#e0e0e0",
      muted: "#333333",
      border: "#1f1f1f",
      accent: "#00ff41",
      hover: "#1a1a1a"
    }
  },
  synthwave: {
    name: "synthwave",
    colors: {
      bg: "#2b213a",
      fg: "#fff",
      muted: "#534b62",
      border: "#463c57",
      accent: "#ff71ce",
      hover: "#382e4a"
    }
  },
  nightowl: {
    name: "nightowl",
    colors: {
      bg: "#011627",
      fg: "#d6deeb",
      muted: "#637777",
      border: "#5f7e97",
      accent: "#82aaff",
      hover: "#0b2942"
    }
  },
  coffee: {
    name: "coffee",
    colors: {
      bg: "#201a1a",
      fg: "#d0c0c0",
      muted: "#5c4b4b",
      border: "#3c3030",
      accent: "#c0a080",
      hover: "#2d2424"
    }
  },
  oceanic: {
    name: "oceanic",
    colors: {
      bg: "#1b2b34",
      fg: "#d8dee9",
      muted: "#4f5b66",
      border: "#343d46",
      accent: "#6699cc",
      hover: "#23343f"
    }
  }
};
const LINKS_DATA = [
  {
    category: "work",
    links: [
      { label: "gmail", url: "https://gmail.com" },
      { label: "calendar", url: "https://calendar.google.com" },
      { label: "drive", url: "https://drive.google.com" },
      { label: "docs", url: "https://docs.google.com" }
    ]
  },
  {
    category: "dev",
    links: [
      { label: "github", url: "https://github.com" },
      { label: "slack", url: "https://slack.com" },
      { label: "keep", url: "https://keep.google.com" },
      { label: "leetcode", url: "https://leetcode.com" }
    ]
  },
  {
    category: "ai",
    links: [
      { label: "perplexity", url: "https://perplexity.ai" },
      { label: "claude", url: "https://claude.ai" },
      { label: "aistudio", url: "https://aistudio.google.com" },
      { label: "chatgpt", url: "https://chat.openai.com" }
    ]
  },
  {
    category: "social",
    links: [
      { label: "youtube", url: "https://youtube.com" },
      { label: "reddit", url: "https://reddit.com" },
      { label: "twitter", url: "https://twitter.com" },
      { label: "feedly", url: "https://feedly.com" }
    ]
  }
];
const WidgetToggle = ({ id: id2, label, isActive, onToggle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "div",
  {
    onClick: () => onToggle(id2),
    className: "flex items-center justify-between border border-[var(--color-border)] p-3 cursor-pointer hover:bg-[var(--color-hover)] select-none group no-radius",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold group-hover:text-shadow-glow", children: isActive ? "[x]" : "[ ]" })
    ]
  }
);
const AsciiSlider = ({ label, value, min, max, step = 1, displayValue, onChange, hint }) => {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const sliderRef = reactExports.useRef(null);
  const computeValue = (clientX) => {
    var _a;
    const track = (_a = sliderRef.current) == null ? void 0 : _a.querySelector("[data-track]");
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    const x2 = clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x2 / rect.width));
    const raw = min + pct * (max - min);
    const snapped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, snapped));
  };
  const handleMouseDown = (e2) => {
    e2.preventDefault();
    onChange(computeValue(e2.clientX));
    const handleMouseMove = (ev) => {
      onChange(computeValue(ev.clientX));
    };
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleWheel = (e2) => {
    e2.preventDefault();
    const dir = e2.deltaY < 0 ? 1 : -1;
    const newVal = Math.max(min, Math.min(max, value + dir * step));
    onChange(newVal);
  };
  const handleKeyDown = (e2) => {
    let newVal = value;
    if (e2.key === "ArrowRight" || e2.key === "ArrowUp") {
      newVal = Math.min(max, value + step);
      e2.preventDefault();
    } else if (e2.key === "ArrowLeft" || e2.key === "ArrowDown") {
      newVal = Math.max(min, value - step);
      e2.preventDefault();
    }
    if (newVal !== value) onChange(newVal);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-accent)] font-mono", children: displayValue ?? value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: sliderRef,
        className: "flex items-center gap-0 cursor-pointer select-none outline-none focus:ring-1 focus:ring-[var(--color-accent)] rounded-sm",
        onMouseDown: handleMouseDown,
        onWheel: handleWheel,
        onKeyDown: handleKeyDown,
        tabIndex: 0,
        role: "slider",
        "aria-label": label,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value,
        "aria-valuetext": displayValue ?? String(value),
        title: `${label}: ${displayValue ?? value}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] font-mono text-xs leading-none", children: "[" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-track": true, className: "flex-1 h-[6px] bg-[var(--color-border)] relative overflow-hidden", style: { borderRadius: "1px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-[var(--color-accent)] transition-[width] duration-75",
              style: { width: `${ratio * 100}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] font-mono text-xs leading-none", children: "]" })
        ]
      }
    ),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[var(--color-muted)] mt-1", children: hint })
  ] });
};
const Settings = ({
  currentTheme,
  onThemeChange,
  linkGroups,
  onUpdateLinks,
  customCss,
  onCustomCssChange,
  statsMode,
  onStatsModeChange,
  weatherMode,
  onWeatherModeChange,
  tempUnit,
  onTempUnitChange,
  isLayoutLocked,
  onToggleLayoutLock,
  isResizingEnabled,
  onToggleResizing,
  onResetLayout,
  activeWidgets = {},
  onToggleWidget,
  showWidgetTitles,
  onToggleWidgetTitles,
  customFont,
  onCustomFontChange,
  reserveSettingsSpace,
  onToggleReserveSettings,
  customThemes = {},
  onDeleteCustomTheme,
  onOpenThemeMaker,
  funOptions,
  onFunOptionsChange,
  presets,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  widgetRadius = 4,
  onWidgetRadiusChange,
  openInNewTab,
  onToggleOpenInNewTab
}) => {
  const [isButtonVisible, setIsButtonVisible] = reactExports.useState(false);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("themes");
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const dragStartPos = reactExports.useRef({ x: 0, y: 0 });
  const [size, setSize] = reactExports.useState({ width: 640, height: 500 });
  const [isResizing, setIsResizing] = reactExports.useState(false);
  const resizeStart = reactExports.useRef({ x: 0, y: 0, w: 0, h: 0 });
  const [newCatName, setNewCatName] = reactExports.useState("");
  const [newLinkInputs, setNewLinkInputs] = reactExports.useState({});
  const [newPresetName, setNewPresetName] = reactExports.useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setPosition({ x: 0, y: 0 });
    }
  };
  const handleMouseDown = (e2) => {
    if (e2.target !== e2.currentTarget) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e2.clientX - position.x,
      y: e2.clientY - position.y
    };
  };
  const handleResizeMouseDown = (e2) => {
    e2.stopPropagation();
    e2.preventDefault();
    setIsResizing(true);
    resizeStart.current = {
      x: e2.clientX,
      y: e2.clientY,
      w: size.width,
      h: size.height
    };
  };
  reactExports.useEffect(() => {
    const handleMouseMove = (e2) => {
      if (isDragging) {
        const newX = Math.round(e2.clientX - dragStartPos.current.x);
        const newY = Math.round(e2.clientY - dragStartPos.current.y);
        setPosition({ x: newX, y: newY });
      }
      if (isResizing) {
        const deltaX = e2.clientX - resizeStart.current.x;
        const deltaY = e2.clientY - resizeStart.current.y;
        setSize({
          width: Math.max(400, resizeStart.current.w + deltaX),
          height: Math.max(350, resizeStart.current.h + deltaY)
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);
  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    onUpdateLinks([...linkGroups, { category: newCatName, links: [] }]);
    setNewCatName("");
  };
  const handleDeleteCategory = (catIndex) => {
    const newGroups = [...linkGroups];
    newGroups.splice(catIndex, 1);
    onUpdateLinks(newGroups);
  };
  const handleAddLink = (catIndex) => {
    const catName = linkGroups[catIndex].category;
    const input = newLinkInputs[catName] || { label: "", url: "" };
    if (!input.label.trim() || !input.url.trim()) return;
    const newGroups = [...linkGroups];
    newGroups[catIndex].links.push({ ...input });
    onUpdateLinks(newGroups);
    setNewLinkInputs({
      ...newLinkInputs,
      [catName]: { label: "", url: "" }
    });
  };
  const handleDeleteLink = (catIndex, linkIndex) => {
    const newGroups = [...linkGroups];
    newGroups[catIndex].links.splice(linkIndex, 1);
    onUpdateLinks(newGroups);
  };
  const updateLinkInput = (catName, field, value) => {
    setNewLinkInputs({
      ...newLinkInputs,
      [catName]: {
        ...newLinkInputs[catName] || { label: "", url: "" },
        [field]: value
      }
    });
  };
  const handleSavePresetClick = () => {
    if (!newPresetName.trim()) return;
    onSavePreset(newPresetName);
    setNewPresetName("");
  };
  const CoreWidgets = ["search", "datetime", "stats", "weather", "todo", "links"];
  const FunWidgets = ["donut", "matrix", "pipes", "snake", "life", "fireworks", "starfield", "rain", "maze"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-4 right-4 z-40 p-2 cursor-pointer",
        onMouseEnter: () => setIsButtonVisible(true),
        onMouseLeave: () => setIsButtonVisible(false),
        onClick: toggleModal,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[var(--color-muted)] transition-opacity duration-200 ${isButtonVisible || isModalOpen ? "opacity-100" : "opacity-0"}`, children: "( settings )" })
      }
    ),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl flex flex-col pointer-events-auto relative p-[2px] overflow-hidden",
        style: {
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          maxWidth: "95vw",
          maxHeight: "95vh"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-hover)] select-none cursor-move group shrink-0",
              onMouseDown: handleMouseDown,
              title: "Drag to move",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-bold text-xs", children: "user@tui-dashboard:~/settings" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 text-[var(--color-muted)] font-mono text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e2) => {
                  e2.stopPropagation();
                  setIsModalOpen(false);
                }, className: "hover:text-[var(--color-accent)]", children: "[x]" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-[var(--color-border)] px-2 pt-2 gap-2 bg-[var(--color-bg)] flex-wrap shrink-0", children: ["themes", "shortcuts", "widgets", "presets", "advanced"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setActiveTab(tab),
              className: `px-4 py-1 text-sm rounded-t-sm border-t border-l border-r ${activeTab === tab ? "border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-accent)] -mb-[1px] pb-2 font-bold" : "border-transparent text-[var(--color-muted)] hover:text-[var(--color-fg)]"}`,
              children: tab
            },
            tab
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 overflow-y-auto custom-scrollbar flex-1 bg-[var(--color-bg)] min-h-0", children: [
            activeTab === "themes" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: onOpenThemeMaker,
                  className: "border border-[var(--color-accent)] border-dashed p-2 cursor-pointer hover:bg-[var(--color-hover)] flex flex-col items-center justify-center gap-2 text-center group min-h-[80px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-[var(--color-accent)] group-hover:scale-110 transition-transform", children: "+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-[var(--color-accent)]", children: "CREATE NEW" })
                  ]
                }
              ),
              Object.entries(customThemes).map(([key, theme]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => onThemeChange(key),
                  className: `
                                                border p-2 cursor-pointer transition-all relative overflow-hidden group min-h-[80px] flex flex-col justify-between
                                                ${currentTheme === key ? "border-[var(--color-accent)] bg-[var(--color-hover)]" : "border-[var(--color-border)] hover:border-[var(--color-muted)]"}
                                            `,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-1 mb-2 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-hidden w-full pr-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase truncate text-[var(--color-accent)]", children: theme.name }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full h-8 gap-0 mt-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: theme.colors.bg } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: theme.colors.fg } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: theme.colors.accent } })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        onClick: (e2) => {
                          e2.stopPropagation();
                          onDeleteCustomTheme == null ? void 0 : onDeleteCustomTheme(key);
                        },
                        className: "absolute top-0 right-0 bg-[var(--color-bg)] border-l border-b border-[var(--color-border)] px-2 py-0.5 cursor-pointer hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all z-10",
                        title: "Delete Theme",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block group-hover:hidden text-[10px] text-[var(--color-accent)] font-bold", children: "CUSTOM" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden group-hover:block text-[10px] font-bold text-[var(--color-accent)]", children: "[x]" })
                        ]
                      }
                    )
                  ]
                },
                key
              )),
              Object.keys(THEMES).map((themeKey) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => onThemeChange(themeKey),
                  className: `
                                                border p-2 cursor-pointer transition-all relative overflow-hidden group min-h-[80px] flex flex-col justify-between
                                                ${currentTheme === themeKey ? "border-[var(--color-accent)] bg-[var(--color-hover)]" : "border-[var(--color-border)] hover:border-[var(--color-muted)]"}
                                            `,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-1 mb-2 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-hidden w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase truncate text-[var(--color-accent)]", children: THEMES[themeKey].name }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full h-8 gap-0 mt-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: THEMES[themeKey].colors.bg } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: THEMES[themeKey].colors.fg } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-full", style: { backgroundColor: THEMES[themeKey].colors.accent } })
                    ] })
                  ]
                },
                themeKey
              ))
            ] }),
            activeTab === "widgets" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-4 border-b border-[var(--color-border)] pb-2", children: "Core Widgets" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: CoreWidgets.map((w2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WidgetToggle,
                  {
                    id: w2,
                    label: w2,
                    isActive: !!activeWidgets[w2],
                    onToggle: onToggleWidget
                  },
                  w2
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-4 border-b border-[var(--color-border)] pb-2", children: "Visual / Extras" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: FunWidgets.map((w2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WidgetToggle,
                  {
                    id: w2,
                    label: w2,
                    isActive: !!activeWidgets[w2],
                    onToggle: onToggleWidget
                  },
                  w2
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[var(--color-muted)] text-xs mt-4", children: "Note: Toggling widgets may reset their position to the bottom of the grid." })
            ] }),
            activeTab === "shortcuts" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              linkGroups.map((group, groupIdx) => {
                var _a, _b;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 relative no-radius", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: group.category }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleDeleteCategory(groupIdx),
                        className: "text-[var(--color-muted)] hover:text-red-500 text-xs",
                        children: "[delete group]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-4", children: group.links.map((link, linkIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-[var(--color-hover)] p-2 px-3 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-bold min-w-[80px]", children: link.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] truncate text-xs", children: link.url })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleDeleteLink(groupIdx, linkIdx),
                        className: "text-[var(--color-muted)] hover:text-red-500 ml-2",
                        children: "x"
                      }
                    )
                  ] }, linkIdx)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-2 pt-2 border-t border-[var(--color-border)] border-dashed", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "label",
                        className: "bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none w-full sm:w-1/4 select-text no-radius",
                        value: ((_a = newLinkInputs[group.category]) == null ? void 0 : _a.label) || "",
                        onChange: (e2) => updateLinkInput(group.category, "label", e2.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "url (https://...)",
                        className: "bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none flex-1 select-text no-radius",
                        value: ((_b = newLinkInputs[group.category]) == null ? void 0 : _b.url) || "",
                        onChange: (e2) => updateLinkInput(group.category, "url", e2.target.value),
                        onKeyDown: (e2) => e2.key === "Enter" && handleAddLink(groupIdx)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleAddLink(groupIdx),
                        className: "border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:border-[var(--color-fg)] px-3 py-1 text-sm no-radius",
                        children: "add"
                      }
                    )
                  ] })
                ] }, groupIdx);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center mt-6 p-4 border border-[var(--color-border)] border-dashed opacity-70 hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-sm", children: "New Category:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "category name",
                    className: "bg-[var(--color-bg)] border-b border-[var(--color-muted)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none select-text",
                    value: newCatName,
                    onChange: (e2) => setNewCatName(e2.target.value),
                    onKeyDown: (e2) => e2.key === "Enter" && handleAddCategory()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleAddCategory,
                    className: "text-[var(--color-fg)] hover:text-[var(--color-accent)] text-sm font-bold",
                    children: "[ + ]"
                  }
                )
              ] })
            ] }),
            activeTab === "presets" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-3", children: "Save Current Config" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "preset name (e.g. Work Mode)",
                      className: "bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-3 py-1 text-sm focus:border-[var(--color-accent)] outline-none flex-1 select-text no-radius",
                      value: newPresetName,
                      onChange: (e2) => setNewPresetName(e2.target.value),
                      onKeyDown: (e2) => e2.key === "Enter" && handleSavePresetClick()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: handleSavePresetClick,
                      className: "bg-[var(--color-hover)] text-[var(--color-fg)] px-4 py-1 text-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] no-radius",
                      children: "[ SAVE ]"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[var(--color-border)] pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-4", children: "Saved Presets" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  presets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--color-muted)] italic text-sm", children: "No saved presets." }),
                  presets.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border border-[var(--color-border)] p-3 hover:bg-[var(--color-hover)] no-radius", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] font-mono", children: preset.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onLoadPreset(preset),
                          className: "text-[var(--color-accent)] hover:underline text-xs",
                          children: "[ LOAD ]"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => onDeletePreset(preset.id),
                          className: "text-[var(--color-muted)] hover:text-red-500 text-xs",
                          children: "[ x ]"
                        }
                      )
                    ] })
                  ] }, preset.id))
                ] })
              ] })
            ] }),
            activeTab === "advanced" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Appearance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: onToggleWidgetTitles,
                      className: "flex items-center gap-2 cursor-pointer select-none group",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: showWidgetTitles ? "[x]" : "[ ]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] text-sm group-hover:text-[var(--color-fg)]", children: "Show Widget Titles" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: onToggleReserveSettings,
                      className: "flex items-center gap-2 cursor-pointer select-none group mt-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: reserveSettingsSpace ? "[x]" : "[ ]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] text-sm group-hover:text-[var(--color-fg)]", children: "Reserve Settings Space" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-xs", children: "Custom Font Family" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "e.g. Comic Sans MS, Arial",
                        className: "bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 text-sm focus:border-[var(--color-accent)] outline-none w-full select-text font-sans",
                        value: customFont,
                        onChange: (e2) => onCustomFontChange(e2.target.value)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-[10px] opacity-60", children: "Press enter or click away to apply." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 mt-2 border-t border-[var(--color-border)] pt-2 border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AsciiSlider,
                    {
                      label: "Widget Roundness",
                      value: widgetRadius,
                      min: 0,
                      max: 24,
                      displayValue: `${widgetRadius}px`,
                      onChange: (v2) => onWidgetRadiusChange == null ? void 0 : onWidgetRadiusChange(v2),
                      hint: "0 = sharp corners, 24 = very round"
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Layout" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: onToggleLayoutLock,
                        className: `px-3 py-1 border text-xs font-mono transition-colors no-radius ${isLayoutLocked ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"}`,
                        children: [
                          "[",
                          isLayoutLocked ? "LOCKED" : "UNLOCKED",
                          "]"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: onResetLayout,
                        className: "px-3 py-1 border border-[var(--color-border)] text-[var(--color-muted)] hover:text-red-500 hover:border-red-500 text-xs font-mono no-radius",
                        children: "[RESET TO DEFAULT]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: onToggleResizing,
                      className: "flex items-center gap-2 cursor-pointer mt-2 group text-xs font-mono text-left select-none",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[var(--color-accent)] font-bold`, children: isResizingEnabled ? "[x]" : "[ ]" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${isResizingEnabled ? "text-[var(--color-fg)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-fg)]"}`, children: "Enable Resizing (Experimental)" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Stats Widget Style" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onStatsModeChange("text"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: statsMode === "text" ? "[x]" : "[ ]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Text" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onStatsModeChange("graph"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: statsMode === "graph" ? "[x]" : "[ ]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Graphs" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onStatsModeChange("detailed"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: statsMode === "detailed" ? "[x]" : "[ ]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Detailed" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onStatsModeChange("minimal"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: statsMode === "minimal" ? "[x]" : "[ ]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Compact" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Weather Style" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onWeatherModeChange("standard"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: weatherMode === "standard" ? "[x]" : "[ ]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Standard" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onWeatherModeChange("icon"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: weatherMode === "icon" ? "[x]" : "[ ]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Icon Mode" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 border-t border-[var(--color-border)] pt-2 border-dashed", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-muted)] text-sm", children: "Units:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onTempUnitChange("C"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: tempUnit === "C" ? "[x]" : "[ ]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Celsius (°C)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onTempUnitChange("F"), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: tempUnit === "F" ? "[x]" : "[ ]" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Fahrenheit (°F)" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Link Behavior" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => onToggleOpenInNewTab == null ? void 0 : onToggleOpenInNewTab(), className: "flex items-center gap-2 cursor-pointer select-none group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[var(--color-accent)] font-bold", children: openInNewTab ? "[x]" : "[ ]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-fg)] group-hover:text-[var(--color-accent)]", children: "Open Links in New Tab" })
                ] })
              ] }),
              activeWidgets["matrix"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Matrix Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Drop Speed",
                    value: funOptions.matrix.speed,
                    min: 5,
                    max: 200,
                    displayValue: `${funOptions.matrix.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, speed: v2 } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Trail Fade",
                    value: funOptions.matrix.fade,
                    min: 0.01,
                    max: 0.3,
                    step: 0.01,
                    displayValue: `${Math.round((1 - funOptions.matrix.fade * 3.33) * 100)}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, fade: v2 } }),
                    hint: "Lower = longer trails"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Letter Size",
                    value: funOptions.matrix.fontSize,
                    min: 8,
                    max: 32,
                    displayValue: `${funOptions.matrix.fontSize}px`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, fontSize: v2 } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-fg)]", children: "Glow Letters" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      onClick: () => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, glow: !funOptions.matrix.glow } }),
                      className: "cursor-pointer text-xs font-mono text-[var(--color-accent)] hover:text-[var(--color-fg)] transition-colors select-none",
                      children: funOptions.matrix.glow ? "[x]" : "[ ]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[var(--color-fg)] mb-2", children: "Character Set" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 text-xs", children: ["mixed", "numbers", "latin"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      onClick: () => onFunOptionsChange({ ...funOptions, matrix: { ...funOptions.matrix, charSet: mode } }),
                      className: `cursor-pointer px-2 py-1 border ${funOptions.matrix.charSet === mode ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-border)] text-[var(--color-muted)]"}`,
                      children: mode.charAt(0).toUpperCase() + mode.slice(1)
                    },
                    mode
                  )) })
                ] })
              ] }),
              activeWidgets["pipes"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Pipes Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Draw Speed",
                    value: funOptions.pipes.speed,
                    min: 5,
                    max: 200,
                    displayValue: `${funOptions.pipes.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, speed: v2 } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Trail Length",
                    value: funOptions.pipes.fade,
                    min: 0.01,
                    max: 0.5,
                    step: 0.01,
                    displayValue: `${Math.round((1 - funOptions.pipes.fade * 2) * 100)}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, fade: v2 } }),
                    hint: "Lower = longer trails"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Lifetime",
                    value: funOptions.pipes.lifetime,
                    min: 20,
                    max: 300,
                    step: 5,
                    displayValue: `${funOptions.pipes.lifetime} steps`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, lifetime: v2 } }),
                    hint: "How long before a pipe resets"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Pipe Count",
                    value: funOptions.pipes.count,
                    min: 1,
                    max: 10,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, count: v2 } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Pipe Size",
                    value: funOptions.pipes.fontSize,
                    min: 8,
                    max: 32,
                    displayValue: `${funOptions.pipes.fontSize}px`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, pipes: { ...funOptions.pipes, fontSize: v2 } })
                  }
                )
              ] }),
              activeWidgets["donut"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Donut Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Spin Speed",
                    value: funOptions.donut.speed,
                    min: 5,
                    max: 200,
                    displayValue: `${funOptions.donut.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, donut: { ...funOptions.donut, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["snake"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Snake Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Speed",
                    value: funOptions.snake.speed,
                    min: 5,
                    max: 100,
                    displayValue: `${funOptions.snake.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, snake: { ...funOptions.snake, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["life"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Conway's Life Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Speed",
                    value: funOptions.life.speed,
                    min: 5,
                    max: 100,
                    displayValue: `${funOptions.life.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, life: { ...funOptions.life, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["fireworks"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Fireworks Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Explosion Size",
                    value: funOptions.fireworks.explosionSize ?? 50,
                    min: 10,
                    max: 200,
                    displayValue: `${funOptions.fireworks.explosionSize ?? 50}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, fireworks: { ...funOptions.fireworks, explosionSize: v2 } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Frequency",
                    value: funOptions.fireworks.speed,
                    min: 55,
                    max: 400,
                    displayValue: `${funOptions.fireworks.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, fireworks: { ...funOptions.fireworks, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["starfield"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Starfield Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Warp Speed",
                    value: funOptions.starfield.speed,
                    min: 5,
                    max: 100,
                    displayValue: `${funOptions.starfield.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, starfield: { ...funOptions.starfield, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["rain"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Rain Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Intensity",
                    value: funOptions.rain.speed,
                    min: 5,
                    max: 100,
                    displayValue: `${funOptions.rain.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, rain: { ...funOptions.rain, speed: v2 } })
                  }
                )
              ] }),
              activeWidgets["maze"] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold", children: "⬡ Maze Widget" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AsciiSlider,
                  {
                    label: "Generation Speed",
                    value: funOptions.maze.speed,
                    min: 5,
                    max: 100,
                    displayValue: `${funOptions.maze.speed}%`,
                    onChange: (v2) => onFunOptionsChange({ ...funOptions, maze: { ...funOptions.maze, speed: v2 } })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Custom CSS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[var(--color-muted)] text-xs mb-2", children: "Override theme styles. Saved locally." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    className: "w-full h-40 bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] p-2 font-mono text-xs focus:border-[var(--color-accent)] outline-none select-text",
                    placeholder: ".tui-box { border-radius: 10px; }",
                    value: customCss,
                    onChange: (e2) => onCustomCssChange(e2.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[var(--color-border)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[var(--color-accent)] font-bold mb-2", children: "Export / Import Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[var(--color-muted)] text-xs mb-3", children: "Backup all settings to a JSON file, or restore from a previous backup." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        const data = {};
                        for (let i = 0; i < localStorage.length; i++) {
                          const key = localStorage.key(i);
                          if (key && key.startsWith("tui-")) {
                            try {
                              data[key] = JSON.parse(localStorage.getItem(key));
                            } catch {
                              data[key] = localStorage.getItem(key);
                            }
                          }
                        }
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `tui-dashboard-settings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                      },
                      className: "px-4 py-1 border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-xs font-mono no-radius transition-colors",
                      children: "[ EXPORT ]"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = ".json";
                        input.onchange = (e2) => {
                          var _a;
                          const file = (_a = e2.target.files) == null ? void 0 : _a[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            var _a2;
                            try {
                              const data = JSON.parse((_a2 = ev.target) == null ? void 0 : _a2.result);
                              if (typeof data !== "object" || data === null) {
                                alert("Invalid settings file.");
                                return;
                              }
                              Object.entries(data).forEach(([key, value]) => {
                                if (key.startsWith("tui-")) {
                                  localStorage.setItem(key, JSON.stringify(value));
                                }
                              });
                              window.location.reload();
                            } catch {
                              alert("Failed to parse settings file.");
                            }
                          };
                          reader.readAsText(file);
                        };
                        input.click();
                      },
                      className: "px-4 py-1 border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-xs font-mono no-radius transition-colors",
                      children: "[ IMPORT ]"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-[var(--color-muted)] mt-6 text-center opacity-50 font-mono", children: "v2.1" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50 flex items-end justify-end text-[var(--color-accent)] opacity-50 hover:opacity-100 select-none",
              onMouseDown: handleResizeMouseDown,
              title: "Resize",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 10 10", fill: "currentColor", className: "pointer-events-none mb-[2px] mr-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 10 L0 10 L10 0 Z" }) })
            }
          )
        ]
      }
    ) })
  ] });
};
const hexToHsv = (hex) => {
  let r2 = 0, g = 0, b = 0;
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    r2 = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r2 = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  r2 /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r2, g, b), min = Math.min(r2, g, b);
  let h = 0, s = 0, v2 = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r2:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r2) / d + 2;
        break;
      case b:
        h = (r2 - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, v: v2 * 100 };
};
const hsvToHex = (h, s, v2) => {
  let r2 = 0, g = 0, b = 0;
  const i = Math.floor(h / 60);
  const f2 = h / 60 - i;
  const p2 = v2 / 100 * (1 - s / 100);
  const q2 = v2 / 100 * (1 - f2 * s / 100);
  const t2 = v2 / 100 * (1 - (1 - f2) * s / 100);
  const val = v2 / 100;
  switch (i % 6) {
    case 0:
      r2 = val;
      g = t2;
      b = p2;
      break;
    case 1:
      r2 = q2;
      g = val;
      b = p2;
      break;
    case 2:
      r2 = p2;
      g = val;
      b = t2;
      break;
    case 3:
      r2 = p2;
      g = q2;
      b = val;
      break;
    case 4:
      r2 = t2;
      g = p2;
      b = val;
      break;
    case 5:
      r2 = val;
      g = p2;
      b = q2;
      break;
  }
  const toHex = (n2) => {
    const hex = Math.round(n2 * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r2)}${toHex(g)}${toHex(b)}`;
};
const SatValBox = ({ hsv, onChange }) => {
  const boxRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleMove = reactExports.useCallback((e2) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x2 = Math.max(0, Math.min(1, (e2.clientX - rect.left) / rect.width));
    const y2 = Math.max(0, Math.min(1, (e2.clientY - rect.top) / rect.height));
    onChange({ ...hsv, s: x2 * 100, v: (1 - y2) * 100 });
  }, [hsv, onChange]);
  reactExports.useEffect(() => {
    const up = () => setIsDragging(false);
    const move = (e2) => {
      if (isDragging) handleMove(e2);
    };
    if (isDragging) {
      window.addEventListener("mouseup", up);
      window.addEventListener("mousemove", move);
    }
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
    };
  }, [isDragging, handleMove]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: boxRef,
      className: "w-full h-32 relative cursor-crosshair border border-[var(--color-border)] mb-2",
      style: {
        backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
        backgroundImage: "linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent)"
      },
      onMouseDown: (e2) => {
        setIsDragging(true);
        handleMove(e2.nativeEvent);
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute w-3 h-3 border-2 border-black bg-white rounded-full -ml-1.5 -mt-1.5 shadow-sm pointer-events-none mix-blend-difference",
          style: {
            left: `${hsv.s}%`,
            top: `${100 - hsv.v}%`
          }
        }
      )
    }
  );
};
const HueSlider = ({ hsv, onChange }) => {
  const sliderRef = reactExports.useRef(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleMove = reactExports.useCallback((e2) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x2 = Math.max(0, Math.min(1, (e2.clientX - rect.left) / rect.width));
    onChange({ ...hsv, h: x2 * 360 });
  }, [hsv, onChange]);
  reactExports.useEffect(() => {
    const up = () => setIsDragging(false);
    const move = (e2) => {
      if (isDragging) handleMove(e2);
    };
    if (isDragging) {
      window.addEventListener("mouseup", up);
      window.addEventListener("mousemove", move);
    }
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", move);
    };
  }, [isDragging, handleMove]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: sliderRef,
      className: "w-full h-4 relative cursor-crosshair mb-2",
      style: {
        background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
        borderRadius: "var(--widget-radius)"
      },
      onMouseDown: (e2) => {
        setIsDragging(true);
        handleMove(e2.nativeEvent);
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute w-2 h-full bg-white border border-black -ml-1 pointer-events-none",
          style: { left: `${hsv.h / 360 * 100}%` }
        }
      )
    }
  );
};
const TuiColorPicker = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [hsv, setHsv] = reactExports.useState(hexToHsv(value));
  const wrapperRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setHsv(hexToHsv(value));
  }, [value]);
  reactExports.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  const handleHsvChange = (newHsv) => {
    setHsv(newHsv);
    onChange(hsvToHex(newHsv.h, newHsv.s, newHsv.v));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 p-2 border-b border-[var(--color-border)] last:border-0 border-opacity-30 relative", ref: wrapperRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm uppercase text-[var(--color-accent)]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value,
            onChange: (e2) => {
              onChange(e2.target.value);
              setHsv(hexToHsv(e2.target.value));
            },
            className: "bg-transparent border-b border-[var(--color-muted)] text-[var(--color-fg)] font-mono text-xs w-20 px-1 focus:border-[var(--color-accent)] outline-none text-right"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "w-6 h-6 border border-[var(--color-border)] cursor-pointer hover:border-[var(--color-accent)]",
            style: { backgroundColor: value }
          }
        )
      ] })
    ] }),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-full right-0 mt-1 p-3 bg-[var(--color-bg)] border border-[var(--color-accent)] z-50 w-64 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SatValBox, { hsv, onChange: handleHsvChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HueSlider, { hsv, onChange: handleHsvChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-[10px] text-[var(--color-muted)] tracking-widest uppercase", children: [
        "H:",
        Math.round(hsv.h),
        " S:",
        Math.round(hsv.s),
        " V:",
        Math.round(hsv.v)
      ] })
    ] })
  ] });
};
const ThemeMaker = ({ onSave, onClose, initialTheme }) => {
  const [state, setState] = reactExports.useState({
    name: (initialTheme == null ? void 0 : initialTheme.name) || "",
    bg: (initialTheme == null ? void 0 : initialTheme.colors.bg) || "#0d0d0d",
    fg: (initialTheme == null ? void 0 : initialTheme.colors.fg) || "#e0e0e0",
    accent: (initialTheme == null ? void 0 : initialTheme.colors.accent) || "#ffffff",
    muted: (initialTheme == null ? void 0 : initialTheme.colors.muted) || "#777777",
    border: (initialTheme == null ? void 0 : initialTheme.colors.border) || "#333333",
    hover: (initialTheme == null ? void 0 : initialTheme.colors.hover) || "#222222"
  });
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const dragStartPos = reactExports.useRef({ x: 0, y: 0 });
  const containerRef = reactExports.useRef(null);
  const handleSave = () => {
    if (!state.name.trim()) return;
    const newTheme = {
      name: state.name.trim(),
      colors: {
        bg: state.bg,
        fg: state.fg,
        accent: state.accent,
        muted: state.muted,
        border: state.border,
        hover: state.hover
      }
    };
    onSave(newTheme);
  };
  reactExports.useEffect(() => {
    const handleMouseMove = (e2) => {
      if (isDragging) {
        const newX = e2.clientX - dragStartPos.current.x;
        const newY = e2.clientY - dragStartPos.current.y;
        setPosition({ x: newX, y: newY });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  const handleMouseDown = (e2) => {
    const target = e2.target;
    if (target.closest("[data-drag-handle]")) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e2.clientX - position.x,
        y: e2.clientY - position.y
      };
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      style: {
        transform: `translate(${position.x}px, ${position.y}px)`
      },
      className: "fixed top-1/2 left-1/2 -ml-[300px] -mt-[250px] w-[600px] h-[550px] bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl z-50 flex flex-col font-mono text-[var(--color-accent)] modal-rounded overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-drag-handle": true,
            onMouseDown: handleMouseDown,
            className: "flex justify-between items-center p-2 border-b border-[var(--color-border)] bg-[var(--color-hover)] cursor-move select-none",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--color-accent)] font-bold", children: "⬡" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[var(--color-accent)]", children: "theme_maker.exe" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors px-2",
                  children: "[x]"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/2 border-r border-[var(--color-border)] p-4 overflow-y-auto space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase text-[var(--color-accent)] font-bold", children: "Theme Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: state.name,
                  onChange: (e2) => setState({ ...state, name: e2.target.value }),
                  placeholder: "my_cool_theme",
                  className: "w-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-fg)] px-2 py-1 outline-none focus:border-[var(--color-accent)] font-mono"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 border border-[var(--color-border)]", style: { borderRadius: "var(--widget-radius)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Background", value: state.bg, onChange: (v2) => setState((prev) => ({ ...prev, bg: v2 })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Foreground", value: state.fg, onChange: (v2) => setState((prev) => ({ ...prev, fg: v2 })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Accent", value: state.accent, onChange: (v2) => setState((prev) => ({ ...prev, accent: v2 })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Muted", value: state.muted, onChange: (v2) => setState((prev) => ({ ...prev, muted: v2 })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Border", value: state.border, onChange: (v2) => setState((prev) => ({ ...prev, border: v2 })) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TuiColorPicker, { label: "Hover", value: state.hover, onChange: (v2) => setState((prev) => ({ ...prev, hover: v2 })) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleSave,
                  disabled: !state.name.trim(),
                  className: "flex-1 bg-[var(--color-accent)] text-[var(--color-bg)] font-bold py-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                  children: "SAVE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "flex-1 border border-[var(--color-border)] text-[var(--color-fg)] py-2 hover:bg-[var(--color-hover)]",
                  children: "CANCEL"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-1/2 p-4 flex flex-col gap-4 relative",
              style: {
                backgroundColor: state.bg,
                color: state.fg,
                borderColor: state.border
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none border-2 border-dashed border-white opacity-20 m-2 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-black text-white px-2 py-1 text-xs", children: "PREVIEW AREA" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "z-10 flex flex-col gap-4 h-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b", style: { borderColor: state.border, paddingBottom: "0.5rem" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: state.accent, fontWeight: "bold" }, children: "user@terminal:~$" }),
                    " list"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border", style: { borderColor: state.border, backgroundColor: state.hover }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: state.accent }, children: "Box 1 (Hover)" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border", style: { borderColor: state.border }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Box 2" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CPU Usage" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: state.accent }, children: "42%" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 overflow-hidden", style: { backgroundColor: state.border, borderRadius: "var(--widget-radius)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-[42%]", style: { backgroundColor: state.accent } }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-4 border-t", style: { borderColor: state.border, color: state.muted }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "System status: ONLINE" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Last login: Today" })
                  ] })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
};
const ResponsiveGridLayout = reactGridLayoutExports.WidthProvider(reactGridLayoutExports.Responsive);
const DEFAULT_LAYOUTS = {
  lg: [
    { i: "settings-guard", x: 11, y: 0, w: 1, h: 1, static: true },
    { i: "search", x: 2, y: 0, w: 7, h: 2, minW: 1, minH: 2 },
    { i: "datetime", x: 6, y: 2, w: 3, h: 3, minW: 1, minH: 2 },
    { i: "stats", x: 5, y: 2, w: 1, h: 3, minW: 1, minH: 2 },
    { i: "weather", x: 2, y: 2, w: 3, h: 9, minW: 1, minH: 2 },
    { i: "todo", x: 5, y: 5, w: 4, h: 6, minW: 1, minH: 2 },
    { i: "links", x: 2, y: 11, w: 7, h: 5, minW: 1, minH: 2 },
    { i: "snake", x: 2, y: 16, w: 7, h: 2, minW: 1, minH: 2 }
  ],
  md: [
    { i: "search", x: 0, y: 0, w: 11, h: 2, minW: 2, minH: 2 },
    { i: "settings-guard", x: 11, y: 0, w: 1, h: 1, static: true },
    { i: "datetime", x: 0, y: 2, w: 8, h: 4, minW: 2, minH: 2 },
    { i: "stats", x: 8, y: 2, w: 4, h: 4, minW: 2, minH: 2 },
    { i: "weather", x: 0, y: 6, w: 4, h: 6, minW: 2, minH: 2 },
    { i: "todo", x: 4, y: 6, w: 8, h: 6, minW: 2, minH: 2 },
    { i: "links", x: 0, y: 12, w: 12, h: 4, minW: 2, minH: 2 },
    { i: "snake", x: 0, y: 44, w: 2, h: 4, minW: 1, minH: 2 }
  ],
  sm: [
    { i: "settings-guard", x: 5, y: 0, w: 1, h: 1, static: true },
    { i: "search", x: 0, y: 0, w: 5, h: 2, minW: 2, minH: 2 },
    { i: "datetime", x: 0, y: 2, w: 6, h: 4, minW: 2, minH: 2 },
    { i: "stats", x: 0, y: 6, w: 6, h: 3, minW: 2, minH: 2 },
    { i: "weather", x: 0, y: 9, w: 6, h: 4, minW: 2, minH: 2 },
    { i: "todo", x: 0, y: 13, w: 6, h: 5, minW: 2, minH: 2 },
    { i: "links", x: 0, y: 18, w: 6, h: 4, minW: 2, minH: 2 },
    { i: "snake", x: 0, y: 22, w: 2, h: 4, minW: 1, minH: 2 }
  ]
};
function useStickyState(defaultValue, key) {
  const [value, setValue] = reactExports.useState(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (e2) {
      console.warn("Error reading local storage", e2);
      return defaultValue;
    }
  });
  reactExports.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e2) {
      console.warn("Error writing local storage", e2);
    }
  }, [key, value]);
  return [value, setValue];
}
function App() {
  const [currentTheme, setCurrentTheme] = useStickyState("greyish", "tui-theme");
  const [customThemes, setCustomThemes] = useStickyState({}, "tui-custom-themes");
  const [isThemeMakerOpen, setIsThemeMakerOpen] = reactExports.useState(false);
  const [todos, setTodos] = useStickyState([], "tui-todos");
  const [linkGroups, setLinkGroups] = useStickyState(LINKS_DATA, "tui-links");
  const [customCss, setCustomCss] = useStickyState("", "tui-custom-css");
  const [statsMode, setStatsMode] = useStickyState("minimal", "tui-stats-mode");
  const [weatherMode, setWeatherMode] = useStickyState("standard", "tui-weather-mode");
  const [layouts, setLayouts] = useStickyState(DEFAULT_LAYOUTS, "tui-layouts-v4");
  const [tempUnit, setTempUnit] = useStickyState("C", "tui-temp-unit");
  const [widgetRadius, setWidgetRadius] = useStickyState(0, "tui-widget-radius");
  const [openInNewTab, setOpenInNewTab] = useStickyState(false, "tui-open-new-tab");
  const [showWidgetTitles, setShowWidgetTitles] = useStickyState(true, "tui-show-titles");
  const [reserveSettingsSpace, setReserveSettingsSpace] = useStickyState(true, "tui-reserve-settings");
  const [customFont, setCustomFont] = useStickyState("", "tui-custom-font");
  const funDefaults = {
    matrix: { speed: 50, fade: 0.05, charSet: "mixed", charFlux: 30, glow: true, fontSize: 16 },
    pipes: { speed: 50, fade: 0.1, count: 5, fontSize: 16, lifetime: 80 },
    donut: { speed: 50 },
    snake: { speed: 100 },
    life: { speed: 50 },
    fireworks: { speed: 50, explosionSize: 50 },
    starfield: { speed: 25 },
    rain: { speed: 48 },
    maze: { speed: 50 }
  };
  const [funOptionsRaw, setFunOptions] = useStickyState(funDefaults, "tui-fun-options-v3");
  reactExports.useEffect(() => {
    if (reserveSettingsSpace) {
      setLayouts((prevLayouts) => {
        const nextLayouts = { ...prevLayouts };
        let hasChanges = false;
        ["lg", "md", "sm", "xs", "xxs"].forEach((bp) => {
          if (!nextLayouts[bp]) return;
          const layout = [...nextLayouts[bp]];
          const guardIndex = layout.findIndex((item) => item.i === "settings-guard");
          let targetX = 0;
          if (bp === "lg" || bp === "md") targetX = 11;
          else if (bp === "sm") targetX = 5;
          else if (bp === "xs") targetX = 3;
          else if (bp === "xxs") targetX = 1;
          const guardItem = { i: "settings-guard", x: targetX, y: 0, w: 1, h: 1, static: true };
          if (guardIndex === -1) {
            layout.push(guardItem);
            nextLayouts[bp] = layout;
            hasChanges = true;
          } else {
            const current = layout[guardIndex];
            if (current.x !== targetX || current.y !== 0 || !current.static || current.w !== 1 || current.h !== 1) {
              layout[guardIndex] = { ...current, ...guardItem };
              nextLayouts[bp] = layout;
              hasChanges = true;
            }
          }
        });
        return hasChanges ? nextLayouts : prevLayouts;
      });
    }
  }, [reserveSettingsSpace, setLayouts]);
  const funOptions = {
    matrix: { ...funDefaults.matrix, ...funOptionsRaw == null ? void 0 : funOptionsRaw.matrix },
    pipes: { ...funDefaults.pipes, ...funOptionsRaw == null ? void 0 : funOptionsRaw.pipes },
    donut: { ...funDefaults.donut, ...funOptionsRaw == null ? void 0 : funOptionsRaw.donut },
    snake: { ...funDefaults.snake, ...funOptionsRaw == null ? void 0 : funOptionsRaw.snake },
    life: { ...funDefaults.life, ...funOptionsRaw == null ? void 0 : funOptionsRaw.life },
    fireworks: { ...funDefaults.fireworks, ...funOptionsRaw == null ? void 0 : funOptionsRaw.fireworks },
    starfield: { ...funDefaults.starfield, ...funOptionsRaw == null ? void 0 : funOptionsRaw.starfield },
    rain: { ...funDefaults.rain, ...funOptionsRaw == null ? void 0 : funOptionsRaw.rain },
    maze: { ...funDefaults.maze, ...funOptionsRaw == null ? void 0 : funOptionsRaw.maze }
  };
  const [activeWidgets, setActiveWidgets] = useStickyState({
    search: true,
    datetime: true,
    stats: true,
    weather: true,
    todo: true,
    links: true,
    donut: false,
    matrix: false,
    pipes: false,
    snake: true,
    life: false,
    fireworks: false,
    starfield: false,
    rain: false,
    maze: false
  }, "tui-active-widgets-v4");
  const [isLayoutLocked, setIsLayoutLocked] = useStickyState(true, "tui-layout-locked-v2");
  const [isResizingEnabled, setIsResizingEnabled] = useStickyState(false, "tui-resizing-enabled");
  const [presets, setPresets] = useStickyState([], "tui-presets");
  reactExports.useEffect(() => {
    if (currentTheme === "vss") {
      setCurrentTheme("crt");
    }
    if (currentTheme === "lavander") {
      setCurrentTheme("lavender");
    }
    if (weatherMode === "ascii") {
      setWeatherMode("icon");
    }
  }, [currentTheme, setCurrentTheme, weatherMode, setWeatherMode]);
  const allThemes = { ...THEMES, ...customThemes };
  reactExports.useEffect(() => {
    const theme = allThemes[currentTheme] || THEMES["greyish"];
    const root2 = document.documentElement;
    root2.style.setProperty("--color-bg", theme.colors.bg);
    root2.style.setProperty("--color-fg", theme.colors.fg);
    root2.style.setProperty("--color-muted", theme.colors.muted);
    root2.style.setProperty("--color-border", theme.colors.border);
    root2.style.setProperty("--color-accent", theme.colors.accent);
    root2.style.setProperty("--color-hover", theme.colors.hover);
    document.body.style.backgroundColor = theme.colors.bg;
  }, [currentTheme]);
  reactExports.useEffect(() => {
    const root2 = document.documentElement;
    root2.style.setProperty("--widget-radius", `${widgetRadius}px`);
  }, [widgetRadius]);
  reactExports.useEffect(() => {
    const styleId = "tui-user-custom-css";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = customCss;
  }, [customCss]);
  const handleSaveCustomTheme = (newTheme) => {
    setCustomThemes((prev) => ({
      ...prev,
      [newTheme.name]: newTheme
    }));
    setCurrentTheme(newTheme.name);
    setIsThemeMakerOpen(false);
  };
  const handleDeleteCustomTheme = (name) => {
    const newThemes = { ...customThemes };
    delete newThemes[name];
    setCustomThemes(newThemes);
    if (currentTheme === name) {
      setCurrentTheme("greyish");
    }
  };
  const isCrt = currentTheme === "crt";
  const onLayoutChange = (_, allLayouts) => {
    setLayouts(allLayouts);
  };
  const resetLayout = () => {
    setLayouts(DEFAULT_LAYOUTS);
    setActiveWidgets({
      search: true,
      datetime: true,
      stats: true,
      weather: true,
      todo: true,
      links: true,
      donut: false,
      matrix: false,
      pipes: false,
      snake: true,
      life: false,
      fireworks: false,
      starfield: false,
      rain: false,
      maze: false
    });
    setShowWidgetTitles(true);
    setCustomFont("");
    setStatsMode("minimal");
    setWeatherMode("standard");
    setTempUnit("C");
    setWidgetRadius(0);
    setFunOptions(funDefaults);
  };
  const toggleWidget = (key) => {
    const willBeActive = !activeWidgets[key];
    setActiveWidgets((prev) => ({
      ...prev,
      [key]: willBeActive
    }));
    if (willBeActive) {
      setLayouts((prev) => {
        const nextLayouts = { ...prev };
        Object.keys(nextLayouts).forEach((bp) => {
          const currentList = nextLayouts[bp] || [];
          if (!currentList.find((item) => item.i === key)) {
            let maxY = 0;
            currentList.forEach((item) => {
              maxY = Math.max(maxY, item.y + item.h);
            });
            nextLayouts[bp] = [
              ...currentList,
              { i: key, x: 0, y: maxY, w: 2, h: 4, minW: 1, minH: 2 }
            ];
          }
        });
        return nextLayouts;
      });
    }
  };
  const handleSavePreset = (name) => {
    const newPreset = {
      id: Date.now(),
      name,
      data: {
        currentTheme,
        todos,
        linkGroups,
        customCss,
        statsMode,
        weatherMode,
        tempUnit,
        layouts,
        activeWidgets,
        showWidgetTitles,
        customFont,
        funOptions,
        widgetRadius,
        openInNewTab
      }
    };
    setPresets([...presets, newPreset]);
  };
  const handleLoadPreset = (preset) => {
    if (!preset || !preset.data) return;
    const d = preset.data;
    if (d.currentTheme) setCurrentTheme(d.currentTheme);
    if (d.todos) setTodos(d.todos);
    if (d.linkGroups) setLinkGroups(d.linkGroups);
    if (d.customCss !== void 0) setCustomCss(d.customCss);
    if (d.statsMode) setStatsMode(d.statsMode);
    if (d.weatherMode) setWeatherMode(d.weatherMode);
    if (d.tempUnit) setTempUnit(d.tempUnit);
    if (d.layouts) setLayouts(d.layouts);
    if (d.activeWidgets) setActiveWidgets(d.activeWidgets);
    if (d.showWidgetTitles !== void 0) setShowWidgetTitles(d.showWidgetTitles);
    if (d.customFont !== void 0) setCustomFont(d.customFont);
    if (d.funOptions) setFunOptions(d.funOptions);
    if (d.widgetRadius !== void 0) setWidgetRadius(d.widgetRadius);
    if (d.openInNewTab !== void 0) setOpenInNewTab(d.openInNewTab);
  };
  const handleDeletePreset = (id2) => {
    setPresets(presets.filter((p2) => p2.id !== id2));
  };
  const showHandles = isResizingEnabled && !isLayoutLocked;
  const appStyle = {
    fontFamily: customFont ? customFont : '"JetBrains Mono", monospace'
  };
  const [gridReady, setGridReady] = reactExports.useState(false);
  const [isFirstLoad, setIsFirstLoad] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const showTimer = setTimeout(() => setGridReady(true), 150);
    const animTimer = setTimeout(() => setIsFirstLoad(false), 3e3);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(animTimer);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `min-h-screen w-full p-2 text-sm bg-[var(--color-bg)] relative overflow-hidden select-none ${isCrt ? "theme-crt" : ""}`,
      style: appStyle,
      children: [
        isCrt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crt-curve-container" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crt-scanlines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crt-noise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crt-flicker" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Settings,
          {
            currentTheme,
            onThemeChange: setCurrentTheme,
            customThemes,
            onDeleteCustomTheme: handleDeleteCustomTheme,
            onOpenThemeMaker: () => setIsThemeMakerOpen(true),
            linkGroups,
            onUpdateLinks: setLinkGroups,
            customCss,
            onCustomCssChange: setCustomCss,
            statsMode,
            onStatsModeChange: setStatsMode,
            weatherMode,
            onWeatherModeChange: setWeatherMode,
            tempUnit,
            onTempUnitChange: setTempUnit,
            isLayoutLocked,
            onToggleLayoutLock: () => setIsLayoutLocked(!isLayoutLocked),
            isResizingEnabled,
            onToggleResizing: () => setIsResizingEnabled(!isResizingEnabled),
            onResetLayout: resetLayout,
            activeWidgets,
            onToggleWidget: toggleWidget,
            showWidgetTitles,
            onToggleWidgetTitles: () => setShowWidgetTitles(!showWidgetTitles),
            customFont,
            onCustomFontChange: setCustomFont,
            reserveSettingsSpace,
            onToggleReserveSettings: () => setReserveSettingsSpace(!reserveSettingsSpace),
            funOptions,
            onFunOptionsChange: setFunOptions,
            presets,
            onSavePreset: handleSavePreset,
            onLoadPreset: handleLoadPreset,
            onDeletePreset: handleDeletePreset,
            widgetRadius,
            onWidgetRadiusChange: setWidgetRadius,
            openInNewTab,
            onToggleOpenInNewTab: () => setOpenInNewTab(!openInNewTab)
          }
        ),
        isThemeMakerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ThemeMaker,
          {
            onSave: handleSaveCustomTheme,
            onClose: () => setIsThemeMakerOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full z-10 relative px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          ResponsiveGridLayout,
          {
            className: `layout ${showHandles ? "" : "hide-handles"} ${!gridReady ? "grid-hidden" : ""} ${isFirstLoad ? "no-animate" : ""}`,
            layouts,
            breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
            cols: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
            rowHeight: 30,
            onLayoutChange,
            draggableHandle: ".drag-handle",
            margin: [10, 10],
            isResizable: showHandles,
            isDraggable: !isLayoutLocked,
            useCSSTransforms: true,
            resizeHandles: ["se", "sw", "ne", "nw"],
            children: [
              reserveSettingsSpace && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "settings-guard-item pointer-events-none" }, "settings-guard"),
              activeWidgets["search"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "web_search", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchWidget, {}) }, "search"),
              activeWidgets["datetime"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "datetime", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimeWidget, {}) }, "datetime"),
              activeWidgets["stats"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "stats", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsWidget, { mode: statsMode }) }, "stats"),
              activeWidgets["weather"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "weather", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, { mode: weatherMode, unit: tempUnit }) }, "weather"),
              activeWidgets["todo"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "todo-list", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TodoWidget, { tasks: todos, setTasks: setTodos }) }, "todo"),
              activeWidgets["links"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "links", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LinksWidget, { groups: linkGroups, openInNewTab }) }, "links"),
              activeWidgets["donut"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "donut.c", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DonutWidget, { speed: funOptions.donut.speed }) }, "donut"),
              activeWidgets["matrix"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "matrix", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatrixWidget, { options: funOptions.matrix }) }, "matrix"),
              activeWidgets["pipes"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "pipes.scr", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PipesWidget, { options: funOptions.pipes }) }, "pipes"),
              activeWidgets["snake"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "snake.exe", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SnakeWidget, { speed: funOptions.snake.speed }) }, "snake"),
              activeWidgets["life"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "conway.life", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameOfLifeWidget, { speed: funOptions.life.speed }) }, "life"),
              activeWidgets["fireworks"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "fireworks.py", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FireworksWidget, { speed: funOptions.fireworks.speed, explosionSize: funOptions.fireworks.explosionSize }) }, "fireworks"),
              activeWidgets["starfield"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "starfield.scr", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarfieldWidget, { speed: funOptions.starfield.speed }) }, "starfield"),
              activeWidgets["rain"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "rain.sh", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RainWidget, { speed: funOptions.rain.speed }) }, "rain"),
              activeWidgets["maze"] && /* @__PURE__ */ jsxRuntimeExports.jsx(TuiBox, { title: "maze.gen", showTitle: showWidgetTitles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MazeWidget, { speed: funOptions.maze.speed }) }, "maze")
            ]
          }
        ) })
      ]
    }
  );
}
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = client.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$6.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
