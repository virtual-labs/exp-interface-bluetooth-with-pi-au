var ue = Object.defineProperty;
var fe = (t, n, e) =>
  n in t
    ? ue(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var an = (t, n, e) => (fe(t, typeof n != "symbol" ? n + "" : n, e), e);
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = e(i);
    fetch(i.href, o);
  }
})();
var he = { value: () => {} };
function Wt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new vt(e);
}
function vt(t) {
  this._ = t;
}
function de(t, n) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var r = "",
        i = e.indexOf(".");
      if (
        (i >= 0 && ((r = e.slice(i + 1)), (e = e.slice(0, i))),
        e && !n.hasOwnProperty(e))
      )
        throw new Error("unknown type: " + e);
      return { type: e, name: r };
    });
}
vt.prototype = Wt.prototype = {
  constructor: vt,
  on: function (t, n) {
    var e = this._,
      r = de(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = pe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = ln(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = ln(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new vt(t);
  },
  call: function (t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(n, e);
  },
  apply: function (t, n, e) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  },
};
function pe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function ln(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = he), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Ht = "http://www.w3.org/1999/xhtml";
const un = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ht,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function At(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    un.hasOwnProperty(n) ? { space: un[n], local: t } : t
  );
}
function ge(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Ht && n.documentElement.namespaceURI === Ht
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function ye(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Sn(t) {
  var n = At(t);
  return (n.local ? ye : ge)(n);
}
function me() {}
function Zt(t) {
  return t == null
    ? me
    : function () {
        return this.querySelector(t);
      };
}
function _e(t) {
  typeof t != "function" && (t = Zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new $(r, this._parents);
}
function xe(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function we() {
  return [];
}
function Tn(t) {
  return t == null
    ? we
    : function () {
        return this.querySelectorAll(t);
      };
}
function ve(t) {
  return function () {
    return xe(t.apply(this, arguments));
  };
}
function be(t) {
  typeof t == "function" ? (t = ve(t)) : (t = Tn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new $(r, i);
}
function Mn(t) {
  return function () {
    return this.matches(t);
  };
}
function Ln(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ee = Array.prototype.find;
function $e(t) {
  return function () {
    return Ee.call(this.children, t);
  };
}
function ke() {
  return this.firstElementChild;
}
function Ce(t) {
  return this.select(t == null ? ke : $e(typeof t == "function" ? t : Ln(t)));
}
var Ne = Array.prototype.filter;
function Pe() {
  return Array.from(this.children);
}
function Ie(t) {
  return function () {
    return Ne.call(this.children, t);
  };
}
function Ae(t) {
  return this.selectAll(
    t == null ? Pe : Ie(typeof t == "function" ? t : Ln(t))
  );
}
function Se(t) {
  typeof t != "function" && (t = Mn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new $(r, this._parents);
}
function Dn(t) {
  return new Array(t.length);
}
function Te() {
  return new $(this._enter || this._groups.map(Dn), this._parents);
}
function $t(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
$t.prototype = {
  constructor: $t,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Me(t) {
  return function () {
    return t;
  };
}
function Le(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new $t(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function De(t, n, e, r, i, o, s) {
  var c,
    a,
    l = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    p;
  for (c = 0; c < u; ++c)
    (a = n[c]) &&
      ((f[c] = p = s.call(a, a.__data__, c, n) + ""),
      l.has(p) ? (i[c] = a) : l.set(p, a));
  for (c = 0; c < h; ++c)
    (p = s.call(t, o[c], c, o) + ""),
      (a = l.get(p))
        ? ((r[c] = a), (a.__data__ = o[c]), l.delete(p))
        : (e[c] = new $t(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Be(t) {
  return t.__data__;
}
function Re(t, n) {
  if (!arguments.length) return Array.from(this, Be);
  var e = n ? De : Le,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Me(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      a = new Array(o),
      l = 0;
    l < o;
    ++l
  ) {
    var u = r[l],
      h = i[l],
      f = h.length,
      p = Ge(t.call(u, u && u.__data__, l, r)),
      y = p.length,
      x = (c[l] = new Array(y)),
      N = (s[l] = new Array(y)),
      K = (a[l] = new Array(f));
    e(u, h, x, N, K, p, n);
    for (var A = 0, S = 0, d, g; A < y; ++A)
      if ((d = x[A])) {
        for (A >= S && (S = A + 1); !(g = N[S]) && ++S < y; );
        d._next = g || null;
      }
  }
  return (s = new $(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ge(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function He() {
  return new $(this._exit || this._groups.map(Dn), this._parents);
}
function Xe(t, n, e) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == "function"
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + "")),
    n != null && ((i = n(i)), i && (i = i.selection())),
    e == null ? o.remove() : e(o),
    r && i ? r.merge(i).order() : i
  );
}
function qe(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      a = 0;
    a < s;
    ++a
  )
    for (
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, y = 0;
      y < h;
      ++y
    )
      (p = l[y] || u[y]) && (f[y] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new $(c, this._parents);
}
function Fe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Oe(t) {
  t || (t = Ve);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, a = (i[o] = new Array(c)), l, u = 0;
      u < c;
      ++u
    )
      (l = s[u]) && (a[u] = l);
    a.sort(n);
  }
  return new $(i, this._parents).order();
}
function Ve(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Ye() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Ue() {
  return Array.from(this);
}
function ze() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ke() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function We() {
  return !this.node();
}
function Ze(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Qe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Je(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function je(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function tr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function nr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function er(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function rr(t, n) {
  var e = At(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Je
        : Qe
      : typeof n == "function"
      ? e.local
        ? er
        : nr
      : e.local
      ? tr
      : je)(e, n)
  );
}
function Bn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function ir(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function or(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function sr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function cr(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? ir : typeof n == "function" ? sr : or)(t, n, e ?? "")
      )
    : J(this.node(), t);
}
function J(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Bn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function ar(t) {
  return function () {
    delete this[t];
  };
}
function lr(t, n) {
  return function () {
    this[t] = n;
  };
}
function ur(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function fr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? ar : typeof n == "function" ? ur : lr)(t, n))
    : this.node()[t];
}
function Rn(t) {
  return t.trim().split(/^|\s+/);
}
function Qt(t) {
  return t.classList || new Gn(t);
}
function Gn(t) {
  (this._node = t), (this._names = Rn(t.getAttribute("class") || ""));
}
Gn.prototype = {
  add: function (t) {
    var n = this._names.indexOf(t);
    n < 0 &&
      (this._names.push(t),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (t) {
    var n = this._names.indexOf(t);
    n >= 0 &&
      (this._names.splice(n, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function Hn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Xn(t, n) {
  for (var e = Qt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function hr(t) {
  return function () {
    Hn(this, t);
  };
}
function dr(t) {
  return function () {
    Xn(this, t);
  };
}
function pr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Hn : Xn)(this, t);
  };
}
function gr(t, n) {
  var e = Rn(t + "");
  if (arguments.length < 2) {
    for (var r = Qt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? pr : n ? hr : dr)(e, n));
}
function yr() {
  this.textContent = "";
}
function mr(t) {
  return function () {
    this.textContent = t;
  };
}
function _r(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function xr(t) {
  return arguments.length
    ? this.each(t == null ? yr : (typeof t == "function" ? _r : mr)(t))
    : this.node().textContent;
}
function wr() {
  this.innerHTML = "";
}
function vr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function br(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Er(t) {
  return arguments.length
    ? this.each(t == null ? wr : (typeof t == "function" ? br : vr)(t))
    : this.node().innerHTML;
}
function $r() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function kr() {
  return this.each($r);
}
function Cr() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Nr() {
  return this.each(Cr);
}
function Pr(t) {
  var n = typeof t == "function" ? t : Sn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Ir() {
  return null;
}
function Ar(t, n) {
  var e = typeof t == "function" ? t : Sn(t),
    r = n == null ? Ir : typeof n == "function" ? n : Zt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Sr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Tr() {
  return this.each(Sr);
}
function Mr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Lr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Dr(t) {
  return this.select(t ? Lr : Mr);
}
function Br(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Rr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Gr(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var e = "",
        r = n.indexOf(".");
      return (
        r >= 0 && ((e = n.slice(r + 1)), (n = n.slice(0, r))),
        { type: n, name: e }
      );
    });
}
function Hr(t) {
  return function () {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        (o = n[e]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (n[++r] = o);
      ++r ? (n.length = r) : delete this.__on;
    }
  };
}
function Xr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Rr(n);
    if (r) {
      for (var s = 0, c = r.length; s < c; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = e)),
            (i.value = n);
          return;
        }
    }
    this.addEventListener(t.type, o, e),
      (i = { type: t.type, name: t.name, value: n, listener: o, options: e }),
      r ? r.push(i) : (this.__on = [i]);
  };
}
function qr(t, n, e) {
  var r = Gr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var a = 0, l = c.length, u; a < l; ++a)
        for (i = 0, u = c[a]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? Xr : Hr, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function qn(t, n, e) {
  var r = Bn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Fr(t, n) {
  return function () {
    return qn(this, t, n);
  };
}
function Or(t, n) {
  return function () {
    return qn(this, t, n.apply(this, arguments));
  };
}
function Vr(t, n) {
  return this.each((typeof n == "function" ? Or : Fr)(t, n));
}
function* Yr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Fn = [null];
function $(t, n) {
  (this._groups = t), (this._parents = n);
}
function lt() {
  return new $([[document.documentElement]], Fn);
}
function Ur() {
  return this;
}
$.prototype = lt.prototype = {
  constructor: $,
  select: _e,
  selectAll: be,
  selectChild: Ce,
  selectChildren: Ae,
  filter: Se,
  data: Re,
  enter: Te,
  exit: He,
  join: Xe,
  merge: qe,
  selection: Ur,
  order: Fe,
  sort: Oe,
  call: Ye,
  nodes: Ue,
  node: ze,
  size: Ke,
  empty: We,
  each: Ze,
  attr: rr,
  style: cr,
  property: fr,
  classed: gr,
  text: xr,
  html: Er,
  raise: kr,
  lower: Nr,
  append: Pr,
  insert: Ar,
  remove: Tr,
  clone: Dr,
  datum: Br,
  on: qr,
  dispatch: Vr,
  [Symbol.iterator]: Yr,
};
function _(t) {
  return typeof t == "string"
    ? new $([[document.querySelector(t)]], [document.documentElement])
    : new $([[t]], Fn);
}
function zr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function fn(t, n) {
  if (((t = zr(t)), n === void 0 && (n = t.currentTarget), n)) {
    var e = n.ownerSVGElement || n;
    if (e.createSVGPoint) {
      var r = e.createSVGPoint();
      return (
        (r.x = t.clientX),
        (r.y = t.clientY),
        (r = r.matrixTransform(n.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (n.getBoundingClientRect) {
      var i = n.getBoundingClientRect();
      return [
        t.clientX - i.left - n.clientLeft,
        t.clientY - i.top - n.clientTop,
      ];
    }
  }
  return [t.pageX, t.pageY];
}
const Kr = { passive: !1 },
  it = { capture: !0, passive: !1 };
function Dt(t) {
  t.stopImmediatePropagation();
}
function Z(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Wr(t) {
  var n = t.document.documentElement,
    e = _(t).on("dragstart.drag", Z, it);
  "onselectstart" in n
    ? e.on("selectstart.drag", Z, it)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Zr(t, n) {
  var e = t.document.documentElement,
    r = _(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", Z, it),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const dt = (t) => () => t;
function Xt(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: a,
    dy: l,
    dispatch: u,
  }
) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: n, enumerable: !0, configurable: !0 },
    subject: { value: e, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
Xt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Qr(t) {
  return !t.ctrlKey && !t.button;
}
function Jr() {
  return this.parentNode;
}
function jr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function ti() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ni() {
  var t = Qr,
    n = Jr,
    e = jr,
    r = ti,
    i = {},
    o = Wt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", N)
      .on("touchmove.drag", K, Kr)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var v = S(this, n.call(this, d, g), d, g, "mouse");
      v &&
        (_(d.view).on("mousemove.drag", y, it).on("mouseup.drag", x, it),
        Wr(d.view),
        Dt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        v("start", d));
    }
  }
  function y(d) {
    if ((Z(d), !l)) {
      var g = d.clientX - c,
        v = d.clientY - a;
      l = g * g + v * v > h;
    }
    i.mouse("drag", d);
  }
  function x(d) {
    _(d.view).on("mousemove.drag mouseup.drag", null),
      Zr(d.view, l),
      Z(d),
      i.mouse("end", d);
  }
  function N(d, g) {
    if (t.call(this, d, g)) {
      var v = d.changedTouches,
        b = n.call(this, d, g),
        k = v.length,
        q,
        W;
      for (q = 0; q < k; ++q)
        (W = S(this, b, d, g, v[q].identifier, v[q])) &&
          (Dt(d), W("start", d, v[q]));
    }
  }
  function K(d) {
    var g = d.changedTouches,
      v = g.length,
      b,
      k;
    for (b = 0; b < v; ++b)
      (k = i[g[b].identifier]) && (Z(d), k("drag", d, g[b]));
  }
  function A(d) {
    var g = d.changedTouches,
      v = g.length,
      b,
      k;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        b = 0;
      b < v;
      ++b
    )
      (k = i[g[b].identifier]) && (Dt(d), k("end", d, g[b]));
  }
  function S(d, g, v, b, k, q) {
    var W = o.copy(),
      T = fn(q || v, g),
      rn,
      on,
      ht;
    if (
      (ht = e.call(
        d,
        new Xt("beforestart", {
          sourceEvent: v,
          target: f,
          identifier: k,
          active: s,
          x: T[0],
          y: T[1],
          dx: 0,
          dy: 0,
          dispatch: W,
        }),
        b
      )) != null
    )
      return (
        (rn = ht.x - T[0] || 0),
        (on = ht.y - T[1] || 0),
        function ae(Mt, sn, le) {
          var cn = T,
            Lt;
          switch (Mt) {
            case "start":
              (i[k] = ae), (Lt = s++);
              break;
            case "end":
              delete i[k], --s;
            case "drag":
              (T = fn(le || sn, g)), (Lt = s);
              break;
          }
          W.call(
            Mt,
            d,
            new Xt(Mt, {
              sourceEvent: sn,
              subject: ht,
              target: f,
              identifier: k,
              active: Lt,
              x: T[0] + rn,
              y: T[1] + on,
              dx: T[0] - cn[0],
              dy: T[1] - cn[1],
              dispatch: W,
            }),
            b
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : dt(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : dt(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : dt(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : dt(!!d)), f)
        : r;
    }),
    (f.on = function () {
      var d = o.on.apply(o, arguments);
      return d === o ? f : d;
    }),
    (f.clickDistance = function (d) {
      return arguments.length ? ((h = (d = +d) * d), f) : Math.sqrt(h);
    }),
    f
  );
}
function Jt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function On(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function ut() {}
var ot = 0.7,
  kt = 1 / ot,
  Q = "\\s*([+-]?\\d+)\\s*",
  st = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  D = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  ei = /^#([0-9a-f]{3,8})$/,
  ri = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`),
  ii = new RegExp(`^rgb\\(${D},${D},${D}\\)$`),
  oi = new RegExp(`^rgba\\(${Q},${Q},${Q},${st}\\)$`),
  si = new RegExp(`^rgba\\(${D},${D},${D},${st}\\)$`),
  ci = new RegExp(`^hsl\\(${st},${D},${D}\\)$`),
  ai = new RegExp(`^hsla\\(${st},${D},${D},${st}\\)$`),
  hn = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
Jt(ut, ct, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: dn,
  formatHex: dn,
  formatHex8: li,
  formatHsl: ui,
  formatRgb: pn,
  toString: pn,
});
function dn() {
  return this.rgb().formatHex();
}
function li() {
  return this.rgb().formatHex8();
}
function ui() {
  return Vn(this).formatHsl();
}
function pn() {
  return this.rgb().formatRgb();
}
function ct(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = ei.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? gn(n)
          : e === 3
          ? new E(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? pt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? pt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ri.exec(t))
      ? new E(n[1], n[2], n[3], 1)
      : (n = ii.exec(t))
      ? new E((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = oi.exec(t))
      ? pt(n[1], n[2], n[3], n[4])
      : (n = si.exec(t))
      ? pt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ci.exec(t))
      ? _n(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = ai.exec(t))
      ? _n(n[1], n[2] / 100, n[3] / 100, n[4])
      : hn.hasOwnProperty(t)
      ? gn(hn[t])
      : t === "transparent"
      ? new E(NaN, NaN, NaN, 0)
      : null
  );
}
function gn(t) {
  return new E((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function pt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new E(t, n, e, r);
}
function fi(t) {
  return (
    t instanceof ut || (t = ct(t)),
    t ? ((t = t.rgb()), new E(t.r, t.g, t.b, t.opacity)) : new E()
  );
}
function qt(t, n, e, r) {
  return arguments.length === 1 ? fi(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Jt(
  E,
  qt,
  On(ut, {
    brighter(t) {
      return (
        (t = t == null ? kt : Math.pow(kt, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new E(U(this.r), U(this.g), U(this.b), Ct(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: yn,
    formatHex: yn,
    formatHex8: hi,
    formatRgb: mn,
    toString: mn,
  })
);
function yn() {
  return `#${Y(this.r)}${Y(this.g)}${Y(this.b)}`;
}
function hi() {
  return `#${Y(this.r)}${Y(this.g)}${Y(this.b)}${Y(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function mn() {
  const t = Ct(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${U(this.r)}, ${U(this.g)}, ${U(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Ct(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function U(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Y(t) {
  return (t = U(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function _n(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new P(t, n, e, r)
  );
}
function Vn(t) {
  if (t instanceof P) return new P(t.h, t.s, t.l, t.opacity);
  if ((t instanceof ut || (t = ct(t)), !t)) return new P();
  if (t instanceof P) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    a = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= a < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = a > 0 && a < 1 ? 0 : s),
    new P(s, c, a, t.opacity)
  );
}
function di(t, n, e, r) {
  return arguments.length === 1 ? Vn(t) : new P(t, n, e, r ?? 1);
}
function P(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Jt(
  P,
  di,
  On(ut, {
    brighter(t) {
      return (
        (t = t == null ? kt : Math.pow(kt, t)),
        new P(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? ot : Math.pow(ot, t)),
        new P(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new E(
        Bt(t >= 240 ? t - 240 : t + 120, i, r),
        Bt(t, i, r),
        Bt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new P(xn(this.h), gt(this.s), gt(this.l), Ct(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = Ct(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${xn(this.h)}, ${
        gt(this.s) * 100
      }%, ${gt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function xn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function gt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Bt(t, n, e) {
  return (
    (t < 60
      ? n + ((e - n) * t) / 60
      : t < 180
      ? e
      : t < 240
      ? n + ((e - n) * (240 - t)) / 60
      : n) * 255
  );
}
const Yn = (t) => () => t;
function pi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function gi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function yi(t) {
  return (t = +t) == 1
    ? Un
    : function (n, e) {
        return e - n ? gi(n, e, t) : Yn(isNaN(n) ? e : n);
      };
}
function Un(t, n) {
  var e = n - t;
  return e ? pi(t, e) : Yn(isNaN(t) ? n : t);
}
const wn = (function t(n) {
  var e = yi(n);
  function r(i, o) {
    var s = e((i = qt(i)).r, (o = qt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = Un(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function F(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Ft = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Rt = new RegExp(Ft.source, "g");
function mi(t) {
  return function () {
    return t;
  };
}
function _i(t) {
  return function (n) {
    return t(n) + "";
  };
}
function xi(t, n) {
  var e = (Ft.lastIndex = Rt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Ft.exec(t)) && (i = Rt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: F(r, i) })),
      (e = Rt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? _i(a[0].x)
        : mi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var vn = 180 / Math.PI,
  Ot = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function zn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * vn,
      skewX: Math.atan(a) * vn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var yt;
function wi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Ot : zn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function vi(t) {
  return t == null ||
    (yt || (yt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    yt.setAttribute("transform", t),
    !(t = yt.transform.baseVal.consolidate()))
    ? Ot
    : ((t = t.matrix), zn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Kn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var x = p.push("translate(", null, n, null, e);
      y.push({ i: x - 4, x: F(l, h) }, { i: x - 2, x: F(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: F(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: F(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, y) {
    if (l !== h || u !== f) {
      var x = p.push(i(p) + "scale(", null, ",", null, ")");
      y.push({ i: x - 4, x: F(l, h) }, { i: x - 2, x: F(u, f) });
    } else (h !== 1 || f !== 1) && p.push(i(p) + "scale(" + h + "," + f + ")");
  }
  return function (l, u) {
    var h = [],
      f = [];
    return (
      (l = t(l)),
      (u = t(u)),
      o(l.translateX, l.translateY, u.translateX, u.translateY, h, f),
      s(l.rotate, u.rotate, h, f),
      c(l.skewX, u.skewX, h, f),
      a(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, f),
      (l = u = null),
      function (p) {
        for (var y = -1, x = f.length, N; ++y < x; ) h[(N = f[y]).i] = N.x(p);
        return h.join("");
      }
    );
  };
}
var bi = Kn(wi, "px, ", "px)", "deg)"),
  Ei = Kn(vi, ", ", ")", ")"),
  j = 0,
  nt = 0,
  tt = 0,
  Wn = 1e3,
  Nt,
  et,
  Pt = 0,
  z = 0,
  St = 0,
  at = typeof performance == "object" && performance.now ? performance : Date,
  Zn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function jt() {
  return z || (Zn($i), (z = at.now() + St));
}
function $i() {
  z = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = Qn.prototype = {
  constructor: It,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? jt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        et !== this &&
        (et ? (et._next = this) : (Nt = this), (et = this)),
      (this._call = t),
      (this._time = e),
      Vt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Vt());
  },
};
function Qn(t, n, e) {
  var r = new It();
  return r.restart(t, n, e), r;
}
function ki() {
  jt(), ++j;
  for (var t = Nt, n; t; )
    (n = z - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --j;
}
function bn() {
  (z = (Pt = at.now()) + St), (j = nt = 0);
  try {
    ki();
  } finally {
    (j = 0), Ni(), (z = 0);
  }
}
function Ci() {
  var t = at.now(),
    n = t - Pt;
  n > Wn && ((St -= n), (Pt = t));
}
function Ni() {
  for (var t, n = Nt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Nt = e)));
  (et = t), Vt(r);
}
function Vt(t) {
  if (!j) {
    nt && (nt = clearTimeout(nt));
    var n = t - z;
    n > 24
      ? (t < 1 / 0 && (nt = setTimeout(bn, t - at.now() - St)),
        tt && (tt = clearInterval(tt)))
      : (tt || ((Pt = at.now()), (tt = setInterval(Ci, Wn))), (j = 1), Zn(bn));
  }
}
function En(t, n, e) {
  var r = new It();
  return (
    (n = n == null ? 0 : +n),
    r.restart(
      (i) => {
        r.stop(), t(i + n);
      },
      n,
      e
    ),
    r
  );
}
var Pi = Wt("start", "end", "cancel", "interrupt"),
  Ii = [],
  Jn = 0,
  $n = 1,
  Yt = 2,
  bt = 3,
  kn = 4,
  Ut = 5,
  Et = 6;
function Tt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ai(t, e, {
    name: n,
    index: r,
    group: i,
    on: Pi,
    tween: Ii,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Jn,
  });
}
function tn(t, n) {
  var e = I(t, n);
  if (e.state > Jn) throw new Error("too late; already scheduled");
  return e;
}
function B(t, n) {
  var e = I(t, n);
  if (e.state > bt) throw new Error("too late; already running");
  return e;
}
function I(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ai(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Qn(o, 0, e.time));
  function o(l) {
    (e.state = $n),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== $n) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === bt) return En(s);
        p.state === kn
          ? ((p.state = Et),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = Et),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (En(function () {
        e.state === bt &&
          ((e.state = kn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Yt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Yt)
    ) {
      for (
        e.state = bt, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (p = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = p);
      i.length = h + 1;
    }
  }
  function c(l) {
    for (
      var u =
          l < e.duration
            ? e.ease.call(null, l / e.duration)
            : (e.timer.restart(a), (e.state = Ut), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ut && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = Et), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Si(t, n) {
  var e = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      (i = r.state > Yt && r.state < Ut),
        (r.state = Et),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ti(t) {
  return this.each(function () {
    Si(this, t);
  });
}
function Mi(t, n) {
  var e, r;
  return function () {
    var i = B(this, t),
      o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, c = r.length; s < c; ++s)
        if (r[s].name === n) {
          (r = r.slice()), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Li(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = B(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, a = 0, l = i.length; a < l; ++a)
        if (i[a].name === n) {
          i[a] = c;
          break;
        }
      a === l && i.push(c);
    }
    o.tween = i;
  };
}
function Di(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = I(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Mi : Li)(e, t, n));
}
function nn(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = B(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return I(i, r).value[n];
    }
  );
}
function jn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? F
      : n instanceof ct
      ? wn
      : (e = ct(n))
      ? ((n = e), wn)
      : xi
  )(t, n);
}
function Bi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ri(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Gi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Hi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Xi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function qi(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      a;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (a = c + ""),
        s === a
          ? null
          : s === r && a === i
          ? o
          : ((i = a), (o = n((r = s), c))));
  };
}
function Fi(t, n) {
  var e = At(t),
    r = e === "transform" ? Ei : jn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? qi : Xi)(e, r, nn(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ri : Bi)(e)
      : (e.local ? Hi : Gi)(e, r, n)
  );
}
function Oi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Vi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Yi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Vi(t, o)), e;
  }
  return (i._value = n), i;
}
function Ui(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Oi(t, o)), e;
  }
  return (i._value = n), i;
}
function zi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = At(t);
  return this.tween(e, (r.local ? Yi : Ui)(r, n));
}
function Ki(t, n) {
  return function () {
    tn(this, t).delay = +n.apply(this, arguments);
  };
}
function Wi(t, n) {
  return (
    (n = +n),
    function () {
      tn(this, t).delay = n;
    }
  );
}
function Zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ki : Wi)(n, t))
    : I(this.node(), n).delay;
}
function Qi(t, n) {
  return function () {
    B(this, t).duration = +n.apply(this, arguments);
  };
}
function Ji(t, n) {
  return (
    (n = +n),
    function () {
      B(this, t).duration = n;
    }
  );
}
function ji(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Qi : Ji)(n, t))
    : I(this.node(), n).duration;
}
function to(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    B(this, t).ease = n;
  };
}
function no(t) {
  var n = this._id;
  return arguments.length ? this.each(to(n, t)) : I(this.node(), n).ease;
}
function eo(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    B(this, t).ease = e;
  };
}
function ro(t) {
  if (typeof t != "function") throw new Error();
  return this.each(eo(this._id, t));
}
function io(t) {
  typeof t != "function" && (t = Mn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new X(r, this._parents, this._name, this._id);
}
function oo(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var n = this._groups,
      e = t._groups,
      r = n.length,
      i = e.length,
      o = Math.min(r, i),
      s = new Array(r),
      c = 0;
    c < o;
    ++c
  )
    for (
      var a = n[c], l = e[c], u = a.length, h = (s[c] = new Array(u)), f, p = 0;
      p < u;
      ++p
    )
      (f = a[p] || l[p]) && (h[p] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new X(s, this._parents, this._name, this._id);
}
function so(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function co(t, n, e) {
  var r,
    i,
    o = so(n) ? tn : B;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function ao(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? I(this.node(), e).on.on(t)
    : this.each(co(e, t, n));
}
function lo(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function uo() {
  return this.on("end.remove", lo(this._id));
}
function fo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Zt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], a = c.length, l = (o[s] = new Array(a)), u, h, f = 0;
      f < a;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (l[f] = h),
        Tt(l[f], n, e, f, l, I(u, e)));
  return new X(o, this._parents, n, e);
}
function ho(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Tn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            y = I(u, e),
            x = 0,
            N = f.length;
          x < N;
          ++x
        )
          (p = f[x]) && Tt(p, n, e, x, f, y);
        o.push(f), s.push(u);
      }
  return new X(o, s, n, e);
}
var po = lt.prototype.constructor;
function go() {
  return new po(this._groups, this._parents);
}
function yo(t, n) {
  var e, r, i;
  return function () {
    var o = J(this, t),
      s = (this.style.removeProperty(t), J(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function te(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function mo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = J(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function _o(t, n, e) {
  var r, i, o;
  return function () {
    var s = J(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), J(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function xo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = B(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = te(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function wo(t, n, e) {
  var r = (t += "") == "transform" ? bi : jn;
  return n == null
    ? this.styleTween(t, yo(t, r)).on("end.style." + t, te(t))
    : typeof n == "function"
    ? this.styleTween(t, _o(t, r, nn(this, "style." + t, n))).each(
        xo(this._id, t)
      )
    : this.styleTween(t, mo(t, r, n), e).on("end.style." + t, null);
}
function vo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function bo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && vo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Eo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, bo(t, n, e ?? ""));
}
function $o(t) {
  return function () {
    this.textContent = t;
  };
}
function ko(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Co(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? ko(nn(this, "text", t))
      : $o(t == null ? "" : t + "")
  );
}
function No(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Po(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && No(i)), n;
  }
  return (r._value = t), r;
}
function Io(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Po(t));
}
function Ao() {
  for (
    var t = this._name,
      n = this._id,
      e = ne(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = I(a, n);
        Tt(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new X(r, this._parents, t, e);
}
function So() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      a = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var l = B(this, r),
        u = l.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(a)),
        (l.on = n);
    }),
      i === 0 && o();
  });
}
var To = 0;
function X(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function ne() {
  return ++To;
}
var R = lt.prototype;
X.prototype = {
  constructor: X,
  select: fo,
  selectAll: ho,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: io,
  merge: oo,
  selection: go,
  transition: Ao,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: ao,
  attr: Fi,
  attrTween: zi,
  style: wo,
  styleTween: Eo,
  text: Co,
  textTween: Io,
  remove: uo,
  tween: Di,
  delay: Zi,
  duration: ji,
  ease: no,
  easeVarying: ro,
  end: So,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Mo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Lo = { time: null, delay: 0, duration: 250, ease: Mo };
function Do(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Bo(t) {
  var n, e;
  t instanceof X
    ? ((n = t._id), (t = t._name))
    : ((n = ne()), ((e = Lo).time = jt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && Tt(a, t, n, l, s, e || Do(a, n));
  return new X(r, this._parents, t, n);
}
lt.prototype.interrupt = Ti;
lt.prototype.transition = Bo;
const zt = Math.PI,
  Kt = 2 * zt,
  V = 1e-6,
  Ro = Kt - V;
function ee(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Go(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return ee;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Ho {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? ee : Go(n));
  }
  moveTo(n, e) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 = +e)}`;
  }
  closePath() {
    this._x1 !== null &&
      ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
  }
  lineTo(n, e) {
    this._append`L${(this._x1 = +n)},${(this._y1 = +e)}`;
  }
  quadraticCurveTo(n, e, r, i) {
    this._append`Q${+n},${+e},${(this._x1 = +r)},${(this._y1 = +i)}`;
  }
  bezierCurveTo(n, e, r, i, o, s) {
    this._append`C${+n},${+e},${+r},${+i},${(this._x1 = +o)},${(this._y1 =
      +s)}`;
  }
  arcTo(n, e, r, i, o) {
    if (((n = +n), (e = +e), (r = +r), (i = +i), (o = +o), o < 0))
      throw new Error(`negative radius: ${o}`);
    let s = this._x1,
      c = this._y1,
      a = r - n,
      l = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > V)
      if (!(Math.abs(h * a - l * u) > V) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          y = i - c,
          x = a * a + l * l,
          N = p * p + y * y,
          K = Math.sqrt(x),
          A = Math.sqrt(f),
          S = o * Math.tan((zt - Math.acos((x + f - N) / (2 * K * A))) / 2),
          d = S / A,
          g = S / K;
        Math.abs(d - 1) > V && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * y)},${(this._x1 =
            n + g * a)},${(this._y1 = e + g * l)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      a = r * Math.sin(i),
      l = n + c,
      u = e + a,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${l},${u}`
      : (Math.abs(this._x1 - l) > V || Math.abs(this._y1 - u) > V) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Kt) + Kt),
        f > Ro
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > V &&
            this._append`A${r},${r},0,${+(f >= zt)},${h},${(this._x1 =
              n + r * Math.cos(o))},${(this._y1 = e + r * Math.sin(o))}`);
  }
  rect(n, e, r, i) {
    this._append`M${(this._x0 = this._x1 = +n)},${(this._y0 = this._y1 =
      +e)}h${(r = +r)}v${+i}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function Xo(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function qo(t, n) {
  return fetch(t, n).then(Xo);
}
function Fo(t) {
  return (n, e) => qo(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Oo = Fo("application/xml");
function rt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
rt.prototype = {
  constructor: rt,
  scale: function (t) {
    return t === 1 ? this : new rt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new rt(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  },
};
rt.prototype;
class O {
  constructor(n, e, r, i, o, s, c) {
    an(this, "dragged", (n) => {
      this.sensor.attr(
        "transform",
        "translate(" +
          [n.sourceEvent.offsetX, n.sourceEvent.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      );
    });
    (this.id = n),
      (this.svgContainer = e),
      (this.url = r),
      this.sensor,
      (this.scale = i),
      (this.offsetX = s),
      (this.offsetY = c),
      (this.movable = o),
      console.log("Component created: " + this.id),
      console.log("url: " + this.url),
      console.log("scale: " + this.scale);
  }
  async load() {
    if (_("#" + this.id).node() != null) return;
    const n = await Oo(this.url);
    (this.sensor = this.svgContainer
      .append("g")
      .attr(
        "transform",
        "translate(" +
          [this.offsetX, this.offsetY] +
          ") scale(" +
          this.scale +
          ")"
      )
      .attr("id", this.id)),
      this.sensor.node().append(_(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          ni()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    _(this).raise().classed("active", !0);
  }
  dragended(n) {
    _(this).classed("active", !1);
  }
}
const H = [
    "connector0pin-0",
    "connector1pin-1",
    "connector2pin-3",
    "connector3pin-7",
    "connector4pin-4",
    "connector5pin-1",
    "connector6pin-1",
    "connector7pin-3",
    "connector8pin-0",
    "connector9pin-3",
    "connector10pin-2",
    "connector11pin-1",
    "connector12pin-7",
    "connector13pin-5",
    "connector14pin-6",
    "connector15pin-5",
    "connector16pin-4",
    "connector17pin-2",
    "connector18pin-2",
    "connector19pin-1",
    "connector20pin-7",
    "connector21pin-2",
    "connector22pin-4",
    "connector23pin-1",
    "connector24pin-6",
    "connector25pin-5",
    "connector26pin-7",
    "connector27pin-8",
    "connector28pin-5",
    "connector29pin-9",
    "connector30pin-2",
    "connector31pin-7",
    "connector32pin-3",
    "connector33pin-6",
    "connector34pin-4",
    "connector35pin-7",
    "connector36pin-9",
    "connector37pin-7",
    "connector38pin-2",
    "connector39pin-2",
  ],
  Vo = ["1kresistor_pin_1", "1kresistor_pin_2"],
  mt = { "1kresistor_pin_1": "Led cathode", "1kresistor_pin_2": "Led Anode" },
  Yo = ["res_pin1", "res_pin2"],
  _t = { res_pin1: "Resistor pin 1", res_pin2: "Resistor pin 2" },
  Uo = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  xt = {
    hc05_key_pin: "Key pin of HC-05",
    hc05_vcc_pin: "Vcc pin of HC-05",
    hc05_gnd_pin: "GND pin of HC-05",
    hc05_txd_pin: "TXD pin of HC-05",
    hc05_rxd_pin: "RXD pin of HC-05",
    hc05_state_pin: "State pin of HC-05",
  },
  L = {
    "connector0pin-0": "GPO",
    "connector1pin-1": "GP1",
    "connector2pin-3": "GND",
    "connector3pin-7": "GP2",
    "connector4pin-4": "GP3",
    "connector5pin-1": "GP4",
    "connector6pin-1": "GP5",
    "connector7pin-3": "GND",
    "connector8pin-0": "GP6",
    "connector9pin-3": "GP7",
    "connector10pin-2": "GP8",
    "connector11pin-1": "GP9",
    "connector12pin-7": "GND",
    "connector13pin-5": "GP10",
    "connector14pin-6": "GP11",
    "connector15pin-5": "GP12",
    "connector16pin-4": "GP13",
    "connector17pin-2": "GND",
    "connector18pin-2": "GP14",
    "connector19pin-1": "GP15",
    "connector20pin-7": "GP16",
    "connector21pin-2": "GP17",
    "connector22pin-4": "GND",
    "connector23pin-1": "GP18",
    "connector24pin-6": "GP19",
    "connector25pin-5": "GP20",
    "connector26pin-7": "GP21",
    "connector27pin-8": "GND",
    "connector28pin-5": "GP22",
    "connector29pin-9": "RUN",
    "connector30pin-2": "GP26/A0",
    "connector31pin-7": "GP27/A1",
    "connector32pin-3": "ADC GND",
    "connector33pin-6": "GP28/A2",
    "connector34pin-4": "ADC VRef",
    "connector35pin-7": "3V4 OUT",
    "connector36pin-9": "3V3 EN",
    "connector37pin-7": "GND",
    "connector38pin-2": "VSYS",
    "connector39pin-2": "VBUS",
  },
  zo = (t) => {
    if (t.length == 0) return { error: "No connection found" };
    const n = [
      "1kresistor_pin_1",
      "1kresistor_pin_2",
      "res_pin1",
      "res_pin2",
      "hc05_vcc_pin",
      "hc05_gnd_pin",
      "hc05_txd_pin",
      "hc05_rxd_pin",
    ];
    let e = 0;
    return (
      t.forEach((r) => {
        if (n.find((i) => i == r.connector)) {
          e++, console.log("req", e);
          return;
        }
        if (L[r.connector] == "GND") {
          e++, console.log("gnd", e);
          return;
        }
        if (L[r.connector] == "GP0") {
          e++, console.log("GP1", e);
          return;
        }
        if (L[r.connector] == "GP1") {
          e++, console.log("GP2", e);
          return;
        }
        if (L[r.connector] == "VBUS") {
          e++, console.log("VBUS", e);
          return;
        }
        if (H[r.connector] && L[r.connector].includes("GP19")) {
          e++;
          return;
        }
      }),
      console.log(e, "total"),
      e == 10
    );
  };
class Ko {
  constructor(n) {
    (this.logLocationId = n), (this.connections = []);
  }
  addConnection(n) {
    this.connections.push(n), this.logConnectionsToHtml();
  }
  undoLastConnection() {
    if (this.connections.length) {
      const n = this.connections.pop(),
        e = document.getElementById(this.logLocationId),
        r = e.lastChild;
      e.removeChild(r),
        this.logConnectionsToHtml(),
        console.log("Removed connection:", n);
    } else console.warn("No more connections to undo");
  }
  logConnectionsToHtml() {
    if (this.connections.length % 2 === 0) {
      let n = document.createElement("li");
      const e = L[this.connections[this.connections.length - 2].connector]
          ? `${
              L[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : mt[this.connections[this.connections.length - 2].connector]
          ? mt[this.connections[this.connections.length - 2].connector]
          : _t[this.connections[this.connections.length - 2].connector]
          ? _t[this.connections[this.connections.length - 2].connector]
          : xt[this.connections[this.connections.length - 2].connector]
          ? xt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = L[this.connections[this.connections.length - 1].connector]
          ? `${
              L[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : mt[this.connections[this.connections.length - 1].connector]
          ? mt[this.connections[this.connections.length - 1].connector]
          : _t[this.connections[this.connections.length - 1].connector]
          ? _t[this.connections[this.connections.length - 1].connector]
          : xt[this.connections[this.connections.length - 1].connector]
          ? xt[this.connections[this.connections.length - 1].connector]
          : this.connections[this.connections.length - 1].connector;
      (n.innerHTML = `Connection no. ${
        this.connections.length / 2
      }: ${e} to ${r}`),
        document.getElementById(this.logLocationId).appendChild(n);
      return;
    }
  }
  getConnectionLog() {
    return this.connections;
  }
}
class Wo {
  constructor(n, e, r, i) {
    (this.id = n),
      (this.headingId = e),
      (this.textId = r),
      (this.closeButtonId = i),
      document
        .getElementById(this.closeButtonId)
        .addEventListener("click", () => {
          document.getElementById(this.id).style.display = "none";
        });
  }
  throw(n, e) {
    (document.getElementById(this.id).style.display = "flex"),
      (document.getElementById(this.headingId).innerHTML = n),
      (document.getElementById(this.textId).innerHTML = e);
  }
}
const Cn = (t, n) => {
    en.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  Nn = (t, n, e) => {
    w.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  w = _("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Zo = window.innerWidth < 850,
  Pn = {
    desktop: {
      raspberry: { scale: 0.6, x: 0, y: 0 },
      sensor: { scale: 0.45, x: 400, y: 0 },
      led: { scale: 0.25, x: 400, y: 100 },
      resistor: { scale: 0.45, x: 300, y: 200 },
      object: { scale: 0.6, x: 800, y: 50 },
      bluetootth: { scale: 0.6, x: 800, y: 50 },
      phone: { scale: 0.6, x: 810, y: 50 },
      bconnect: { scale: 0.6, x: 800, y: 50 },
    },
    mobile: {
      raspberry: { scale: 0.15, x: 10, y: 10 },
      sensor: { scale: 0.15, x: 120, y: 10 },
      led: { scale: 0.15, x: 120, y: 60 },
      resistor: { scale: 0.15, x: 80, y: 90 },
      object: { scale: 0.15, x: 180, y: 20 },
      bluetootth: { scale: 0.15, x: 180, y: 20 },
      phone: { scale: 0.15, x: 185, y: 20 },
      bconnect: { scale: 0.15, x: 180, y: 20 },
    },
  },
  m = Zo ? Pn.mobile : Pn.desktop,
  Qo = new O(
    "raspberry",
    w,
    "images/pico.svg",
    m.raspberry.scale,
    !1,
    m.raspberry.x,
    m.raspberry.y
  ),
  Jo = new O(
    "ultraSonicsensor",
    w,
    "images/sensor1.svg",
    m.sensor.scale,
    !1,
    m.sensor.x,
    m.sensor.y
  ),
  jo = new O(
    "ledlight",
    w,
    "images/led.svg",
    m.led.scale,
    !1,
    m.led.x,
    m.led.y
  ),
  ts = new O(
    "resistor220",
    w,
    "images/resistor.svg",
    m.resistor.scale,
    !1,
    m.resistor.x,
    m.resistor.y
  ),
  ns = new O(
    "box",
    w,
    "images/box.svg",
    m.object.scale,
    !1,
    m.object.x,
    m.object.y
  ),
  es = new O(
    "bluetootth",
    w,
    "images/box1.svg",
    m.bluetootth.scale,
    !1,
    m.bluetootth.x,
    m.bluetootth.y
  ),
  rs = new O(
    "phone",
    w,
    "images/Group11.svg",
    m.phone.scale,
    !1,
    m.phone.x,
    m.phone.y
  ),
  is = new O(
    "bconnect",
    w,
    "images/start.svg",
    m.bconnect.scale,
    !1,
    m.bconnect.x,
    m.bconnect.y
  ),
  en = w.append("g").attr("id", "pathsGroup"),
  re = document.getElementById("rasberryPi"),
  ie = document.getElementById("sensor"),
  oe = document.getElementById("led"),
  se = document.getElementById("resistor"),
  ce = document.getElementById("object"),
  os = document.getElementById("displayInfo"),
  wt = document.getElementById("componentDescription"),
  ss = document.getElementById("info"),
  cs = document.getElementById("list"),
  In = (t) =>
    H.includes(t.srcElement.id) ||
    Vo.includes(t.srcElement.id) ||
    Yo.includes(t.srcElement.id) ||
    Uo.includes(t.srcElement.id),
  M = new Ko("connectionLog"),
  An = new Wo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let C,
  G = 0,
  Gt = !1;
ss.addEventListener("click", () => {
  (Gt = !Gt), (cs.style.display = Gt ? "block" : "none");
});
re.addEventListener("click", async () => await Qo.load());
ie.addEventListener("click", () => Jo.load());
oe.addEventListener("click", () => {
  jo.load();
  const t = document.getElementById("ledLight");
  t && (t.style.fill = "black");
});
se.addEventListener("click", () => ts.load());
ce.addEventListener("click", async () => {
  await rs.load(), await ns.load(), await es.load(), await is.load();
  const t = document.getElementById("hide");
  t.style.display = "none";
  const n = document.getElementById("devices");
  n.style.display = "none";
  const e = document.getElementById("device");
  (e.style.display = "none"),
    document.getElementById("svgContainer").addEventListener("click", (r) => {
      if (r.target.id === "buttonIdInSvg") {
        const i = document.getElementById("box");
        i.style.display = "none";
      }
      if (r.target.id === "icon") {
        const i = document.getElementById("bconnect");
        i.style.display = "none";
      }
      if (r.target.id === "on") {
        const i = document.getElementById("on");
        i.style.fill = "blue";
        const o = document.getElementById("off");
        (o.style.display = "none"),
          (t.style.display = ""),
          (n.style.display = ""),
          (e.style.display = "");
      }
      if (r.target.id === "devices") {
        const i = document.getElementById("bluetootth");
        i.style.display = "none";
      }
    });
});
const ft = (t, n) => {
    t.addEventListener("mouseover", () => {
      (wt.innerHTML = n), (wt.style.display = "block");
    }),
      t.addEventListener("mouseout", () => {
        (wt.style.display = "none"), (wt.innerHTML = "");
      });
  },
  as =
    "Raspberry Pi Pico: A microcontroller board for low-cost, high-performance projects. It powers and controls the circuit, with VBUS providing 5V to the HC-05, GP0 and GP1 handling Bluetooth communication, and GP19 driving the LED via the resistor.",
  ls =
    "HC-05: A Bluetooth module for wireless communication with devices. It connects to the Raspberry Pi Pico via VCC to VBUS for power, TX to GP0 and RX to GP1 for data transfer, and GND to ground, enabling smartphone control of the LED.",
  us =
    "Resistor: Limits current flow to protect the LED in the circuit. It connects between the LED’s positive terminal and GP19 on the Raspberry Pi Pico to regulate current, preventing damage to the LED.",
  fs =
    "LED: A light-emitting diode that lights up when powered. Its positive terminal connects to the resistor (linked to GP19) for current control, and its negative terminal connects to GND on the Raspberry Pi Pico. Shows light yellow when turned on initially, then supports multiple colors (blue, green, yellow, red) via different control buttons.",
  hs =
    "Smartphone: Used to control the LED via Bluetooth connection. It pairs with the HC-05 module (connected to the Pico) to send commands, turning the LED on or off wirelessly after Bluetooth is enabled and the Raspberry Pi is selected.";
ft(re, as);
ft(ie, ls);
ft(se, us);
ft(oe, fs);
ft(ce, hs);
const ds = document.querySelector("#undoButton");
ds.addEventListener("click", () => {
  gs(), M.undoLastConnection();
});
const ps = (t) => {
    en.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  gs = () => {
    if (C) {
      en.selectAll(`path[id^="path${G}"]`)
        .nodes()
        .forEach((r) => r.remove());
      const n = w.select(`#marker-start-${G}`);
      n.empty() || n.remove();
      const e = M.connections[M.connections.length - 1];
      H.includes(e.connector) && _(`#${e.connector}`).style("fill", "#9a916c"),
        (C = null),
        console.log("Removed all incomplete paths");
      return;
    }
    if (M.connections.length > 0) {
      const t = M.connections[M.connections.length - 1],
        n = t.lineID,
        e = parseInt(n.replace("path", ""));
      ps(n);
      const r = w.select(`#marker-start-${e}`);
      r.empty() || r.remove();
      const i = w.select(`#marker-end-${e}`);
      i.empty() || i.remove();
      const o = M.connections.find((s) => s.lineID === n && s.incomplete);
      o &&
        H.includes(o.connector) &&
        _(`#${o.connector}`).style("fill", "#9a916c"),
        H.includes(t.connector) &&
          _(`#${t.connector}`).style("fill", "#9a916c"),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
w.on("dblclick", (t) => {
  if (In(t) && !C) {
    (C = new Ho()),
      C.moveTo(t.offsetX, t.offsetY),
      H.includes(t.srcElement.id)
        ? _(`#${t.srcElement.id}`).style("fill", "black")
        : Nn(t.offsetX, t.offsetY, `marker-start-${G}`),
      M.addConnection({
        lineID: `path${G}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      w.style("cursor", "crosshair"),
      console.log("path created 0");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !H.includes(t.srcElement.id)) {
    C &&
      (C.lineTo(t.offsetX, t.offsetY),
      Cn(C.toString(), `path${G}`),
      console.log("path created"));
    return;
  }
  if (In(t) && C) {
    C.lineTo(t.offsetX, t.offsetY),
      Cn(C.toString(), `path${G}`),
      H.includes(t.srcElement.id)
        ? _(`#${t.srcElement.id}`).style("fill", "black")
        : Nn(t.offsetX, t.offsetY, `marker-end-${G}`),
      M.addConnection({
        lineID: `path${G}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      G++,
      w.style("cursor", "default"),
      (C = null),
      console.log("path created 2");
    return;
  }
});
w.on("mouseover", (t) => {
  H.includes(t.srcElement.id) && (os.innerHTML = L[t.srcElement.id]);
});
document.getElementById("codeSubmit").addEventListener("click", () => {
  const t = zo(M.getConnectionLog());
  t === !0
    ? w.on("click", (n) => {
        const e = document.getElementById("ledLight");
        if (!e) {
          console.error("LED element not found");
          return;
        }
        switch ((_(e).interrupt(), n.target.id)) {
          case "ledon":
            _(e)
              .style("fill", "lightyellow")
              .style("animation", "blink 1s infinite");
            break;
          case "ledoff":
            _(e).style("fill", "black").style("animation", "none");
            break;
          case "greenlight":
            _(e).style("fill", "green").style("animation", "blink 1s infinite");
            break;
          case "yellowlight":
            _(e)
              .style("fill", "yellow")
              .style("animation", "blink 1s infinite");
            break;
          case "redlight":
            _(e).style("fill", "red").style("animation", "blink 1s infinite");
            break;
          case "bluelight":
            _(e).style("fill", "blue").style("animation", "blink 1s infinite");
            break;
        }
      })
    : t.error
    ? An.throw("Error", t.error)
    : An.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
