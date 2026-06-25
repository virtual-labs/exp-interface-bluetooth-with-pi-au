var $e = Object.defineProperty;
var Ce = (t, n, e) =>
  n in t
    ? $e(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var kn = (t, n, e) => (Ce(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var Ne = { value: () => {} };
function hn() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new Mt(e);
}
function Mt(t) {
  this._ = t;
}
function Ie(t, n) {
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
Mt.prototype = hn.prototype = {
  constructor: Mt,
  on: function (t, n) {
    var e = this._,
      r = Ie(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Pe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = $n(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = $n(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new Mt(t);
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
function Pe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function $n(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = Ne), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var tn = "http://www.w3.org/1999/xhtml";
const Cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: tn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Yt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    Cn.hasOwnProperty(n) ? { space: Cn[n], local: t } : t
  );
}
function Ae(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === tn && n.documentElement.namespaceURI === tn
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function Me(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Kn(t) {
  var n = Yt(t);
  return (n.local ? Me : Ae)(n);
}
function Le() {}
function dn(t) {
  return t == null
    ? Le
    : function () {
        return this.querySelector(t);
      };
}
function Se(t) {
  typeof t != "function" && (t = dn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), l, a, u = 0;
      u < s;
      ++u
    )
      (l = o[u]) &&
        (a = t.call(l, l.__data__, u, o)) &&
        ("__data__" in l && (a.__data__ = l.__data__), (c[u] = a));
  return new k(r, this._parents);
}
function Te(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Be() {
  return [];
}
function Wn(t) {
  return t == null
    ? Be
    : function () {
        return this.querySelectorAll(t);
      };
}
function Re(t) {
  return function () {
    return Te(t.apply(this, arguments));
  };
}
function De(t) {
  typeof t == "function" ? (t = Re(t)) : (t = Wn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, l, a = 0; a < c; ++a)
      (l = s[a]) && (r.push(t.call(l, l.__data__, a, s)), i.push(l));
  return new k(r, i);
}
function Zn(t) {
  return function () {
    return this.matches(t);
  };
}
function Qn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var Ge = Array.prototype.find;
function He(t) {
  return function () {
    return Ge.call(this.children, t);
  };
}
function Xe() {
  return this.firstElementChild;
}
function Oe(t) {
  return this.select(t == null ? Xe : He(typeof t == "function" ? t : Qn(t)));
}
var Ve = Array.prototype.filter;
function Ye() {
  return Array.from(this.children);
}
function Fe(t) {
  return function () {
    return Ve.call(this.children, t);
  };
}
function qe(t) {
  return this.selectAll(
    t == null ? Ye : Fe(typeof t == "function" ? t : Qn(t))
  );
}
function Ue(t) {
  typeof t != "function" && (t = Zn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), l, a = 0; a < s; ++a)
      (l = o[a]) && t.call(l, l.__data__, a, o) && c.push(l);
  return new k(r, this._parents);
}
function Jn(t) {
  return new Array(t.length);
}
function ze() {
  return new k(this._enter || this._groups.map(Jn), this._parents);
}
function Dt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
Dt.prototype = {
  constructor: Dt,
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
function Ke(t) {
  return function () {
    return t;
  };
}
function We(t, n, e, r, i, o) {
  for (var s = 0, c, l = n.length, a = o.length; s < a; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new Dt(t, o[s]));
  for (; s < l; ++s) (c = n[s]) && (i[s] = c);
}
function Ze(t, n, e, r, i, o, s) {
  var c,
    l,
    a = new Map(),
    u = n.length,
    h = o.length,
    f = new Array(u),
    g;
  for (c = 0; c < u; ++c)
    (l = n[c]) &&
      ((f[c] = g = s.call(l, l.__data__, c, n) + ""),
      a.has(g) ? (i[c] = l) : a.set(g, l));
  for (c = 0; c < h; ++c)
    (g = s.call(t, o[c], c, o) + ""),
      (l = a.get(g))
        ? ((r[c] = l), (l.__data__ = o[c]), a.delete(g))
        : (e[c] = new Dt(t, o[c]));
  for (c = 0; c < u; ++c) (l = n[c]) && a.get(f[c]) === l && (i[c] = l);
}
function Qe(t) {
  return t.__data__;
}
function Je(t, n) {
  if (!arguments.length) return Array.from(this, Qe);
  var e = n ? Ze : We,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ke(t));
  for (
    var o = i.length,
      s = new Array(o),
      c = new Array(o),
      l = new Array(o),
      a = 0;
    a < o;
    ++a
  ) {
    var u = r[a],
      h = i[a],
      f = h.length,
      g = je(t.call(u, u && u.__data__, a, r)),
      m = g.length,
      _ = (c[a] = new Array(m)),
      I = (s[a] = new Array(m)),
      Z = (l[a] = new Array(f));
    e(u, h, _, I, Z, g, n);
    for (var M = 0, L = 0, d, y; M < m; ++M)
      if ((d = _[M])) {
        for (M >= L && (L = M + 1); !(y = I[L]) && ++L < m; );
        d._next = y || null;
      }
  }
  return (s = new k(s, r)), (s._enter = c), (s._exit = l), s;
}
function je(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function tr() {
  return new k(this._exit || this._groups.map(Jn), this._parents);
}
function nr(t, n, e) {
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
function er(t) {
  for (
    var n = t.selection ? t.selection() : t,
      e = this._groups,
      r = n._groups,
      i = e.length,
      o = r.length,
      s = Math.min(i, o),
      c = new Array(i),
      l = 0;
    l < s;
    ++l
  )
    for (
      var a = e[l], u = r[l], h = a.length, f = (c[l] = new Array(h)), g, m = 0;
      m < h;
      ++m
    )
      (g = a[m] || u[m]) && (f[m] = g);
  for (; l < i; ++l) c[l] = e[l];
  return new k(c, this._parents);
}
function rr() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function ir(t) {
  t || (t = or);
  function n(h, f) {
    return h && f ? t(h.__data__, f.__data__) : !h - !f;
  }
  for (
    var e = this._groups, r = e.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = e[o], c = s.length, l = (i[o] = new Array(c)), a, u = 0;
      u < c;
      ++u
    )
      (a = s[u]) && (l[u] = a);
    l.sort(n);
  }
  return new k(i, this._parents).order();
}
function or(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function sr() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function cr() {
  return Array.from(this);
}
function lr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function ar() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function ur() {
  return !this.node();
}
function fr(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function hr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function dr(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function pr(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function gr(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function yr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function mr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function _r(t, n) {
  var e = Yt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? dr
        : hr
      : typeof n == "function"
      ? e.local
        ? mr
        : yr
      : e.local
      ? gr
      : pr)(e, n)
  );
}
function jn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function xr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function wr(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function vr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function br(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? xr : typeof n == "function" ? vr : wr)(t, n, e ?? "")
      )
    : nt(this.node(), t);
}
function nt(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    jn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Er(t) {
  return function () {
    delete this[t];
  };
}
function kr(t, n) {
  return function () {
    this[t] = n;
  };
}
function $r(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function Cr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Er : typeof n == "function" ? $r : kr)(t, n))
    : this.node()[t];
}
function te(t) {
  return t.trim().split(/^|\s+/);
}
function pn(t) {
  return t.classList || new ne(t);
}
function ne(t) {
  (this._node = t), (this._names = te(t.getAttribute("class") || ""));
}
ne.prototype = {
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
function ee(t, n) {
  for (var e = pn(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function re(t, n) {
  for (var e = pn(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function Nr(t) {
  return function () {
    ee(this, t);
  };
}
function Ir(t) {
  return function () {
    re(this, t);
  };
}
function Pr(t, n) {
  return function () {
    (n.apply(this, arguments) ? ee : re)(this, t);
  };
}
function Ar(t, n) {
  var e = te(t + "");
  if (arguments.length < 2) {
    for (var r = pn(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Pr : n ? Nr : Ir)(e, n));
}
function Mr() {
  this.textContent = "";
}
function Lr(t) {
  return function () {
    this.textContent = t;
  };
}
function Sr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Tr(t) {
  return arguments.length
    ? this.each(t == null ? Mr : (typeof t == "function" ? Sr : Lr)(t))
    : this.node().textContent;
}
function Br() {
  this.innerHTML = "";
}
function Rr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Dr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Gr(t) {
  return arguments.length
    ? this.each(t == null ? Br : (typeof t == "function" ? Dr : Rr)(t))
    : this.node().innerHTML;
}
function Hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Xr() {
  return this.each(Hr);
}
function Or() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Vr() {
  return this.each(Or);
}
function Yr(t) {
  var n = typeof t == "function" ? t : Kn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Fr() {
  return null;
}
function qr(t, n) {
  var e = typeof t == "function" ? t : Kn(t),
    r = n == null ? Fr : typeof n == "function" ? n : dn(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Ur() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function zr() {
  return this.each(Ur);
}
function Kr() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Wr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Zr(t) {
  return this.select(t ? Wr : Kr);
}
function Qr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Jr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function jr(t) {
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
function ti(t) {
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
function ni(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Jr(n);
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
function ei(t, n, e) {
  var r = jr(t + ""),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var l = 0, a = c.length, u; l < a; ++l)
        for (i = 0, u = c[l]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (c = n ? ni : ti, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function ie(t, n, e) {
  var r = jn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function ri(t, n) {
  return function () {
    return ie(this, t, n);
  };
}
function ii(t, n) {
  return function () {
    return ie(this, t, n.apply(this, arguments));
  };
}
function oi(t, n) {
  return this.each((typeof n == "function" ? ii : ri)(t, n));
}
function* si() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var oe = [null];
function k(t, n) {
  (this._groups = t), (this._parents = n);
}
function _t() {
  return new k([[document.documentElement]], oe);
}
function ci() {
  return this;
}
k.prototype = _t.prototype = {
  constructor: k,
  select: Se,
  selectAll: De,
  selectChild: Oe,
  selectChildren: qe,
  filter: Ue,
  data: Je,
  enter: ze,
  exit: tr,
  join: nr,
  merge: er,
  selection: ci,
  order: rr,
  sort: ir,
  call: sr,
  nodes: cr,
  node: lr,
  size: ar,
  empty: ur,
  each: fr,
  attr: _r,
  style: br,
  property: Cr,
  classed: Ar,
  text: Tr,
  html: Gr,
  raise: Xr,
  lower: Vr,
  append: Yr,
  insert: qr,
  remove: zr,
  clone: Zr,
  datum: Qr,
  on: ei,
  dispatch: oi,
  [Symbol.iterator]: si,
};
function x(t) {
  return typeof t == "string"
    ? new k([[document.querySelector(t)]], [document.documentElement])
    : new k([[t]], oe);
}
function li(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function Nn(t, n) {
  if (((t = li(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const ai = { passive: !1 },
  ht = { capture: !0, passive: !1 };
function Kt(t) {
  t.stopImmediatePropagation();
}
function j(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function ui(t) {
  var n = t.document.documentElement,
    e = x(t).on("dragstart.drag", j, ht);
  "onselectstart" in n
    ? e.on("selectstart.drag", j, ht)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function fi(t, n) {
  var e = t.document.documentElement,
    r = x(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", j, ht),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const Et = (t) => () => t;
function nn(
  t,
  {
    sourceEvent: n,
    subject: e,
    target: r,
    identifier: i,
    active: o,
    x: s,
    y: c,
    dx: l,
    dy: a,
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
    dx: { value: l, enumerable: !0, configurable: !0 },
    dy: { value: a, enumerable: !0, configurable: !0 },
    _: { value: u },
  });
}
nn.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function hi(t) {
  return !t.ctrlKey && !t.button;
}
function di() {
  return this.parentNode;
}
function pi(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function gi() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function yi() {
  var t = hi,
    n = di,
    e = pi,
    r = gi,
    i = {},
    o = hn("start", "drag", "end"),
    s = 0,
    c,
    l,
    a,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", g)
      .filter(r)
      .on("touchstart.drag", I)
      .on("touchmove.drag", Z, ai)
      .on("touchend.drag touchcancel.drag", M)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function g(d, y) {
    if (!(u || !t.call(this, d, y))) {
      var v = L(this, n.call(this, d, y), d, y, "mouse");
      v &&
        (x(d.view).on("mousemove.drag", m, ht).on("mouseup.drag", _, ht),
        ui(d.view),
        Kt(d),
        (a = !1),
        (c = d.clientX),
        (l = d.clientY),
        v("start", d));
    }
  }
  function m(d) {
    if ((j(d), !a)) {
      var y = d.clientX - c,
        v = d.clientY - l;
      a = y * y + v * v > h;
    }
    i.mouse("drag", d);
  }
  function _(d) {
    x(d.view).on("mousemove.drag mouseup.drag", null),
      fi(d.view, a),
      j(d),
      i.mouse("end", d);
  }
  function I(d, y) {
    if (t.call(this, d, y)) {
      var v = d.changedTouches,
        b = n.call(this, d, y),
        $ = v.length,
        O,
        Q;
      for (O = 0; O < $; ++O)
        (Q = L(this, b, d, y, v[O].identifier, v[O])) &&
          (Kt(d), Q("start", d, v[O]));
    }
  }
  function Z(d) {
    var y = d.changedTouches,
      v = y.length,
      b,
      $;
    for (b = 0; b < v; ++b)
      ($ = i[y[b].identifier]) && (j(d), $("drag", d, y[b]));
  }
  function M(d) {
    var y = d.changedTouches,
      v = y.length,
      b,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        b = 0;
      b < v;
      ++b
    )
      ($ = i[y[b].identifier]) && (Kt(d), $("end", d, y[b]));
  }
  function L(d, y, v, b, $, O) {
    var Q = o.copy(),
      S = Nn(O || v, y),
      wn,
      vn,
      bt;
    if (
      (bt = e.call(
        d,
        new nn("beforestart", {
          sourceEvent: v,
          target: f,
          identifier: $,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: Q,
        }),
        b
      )) != null
    )
      return (
        (wn = bt.x - S[0] || 0),
        (vn = bt.y - S[1] || 0),
        function Ee(Ut, bn, ke) {
          var En = S,
            zt;
          switch (Ut) {
            case "start":
              (i[$] = Ee), (zt = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (S = Nn(ke || bn, y)), (zt = s);
              break;
          }
          Q.call(
            Ut,
            d,
            new nn(Ut, {
              sourceEvent: bn,
              subject: bt,
              target: f,
              identifier: $,
              active: zt,
              x: S[0] + wn,
              y: S[1] + vn,
              dx: S[0] - En[0],
              dy: S[1] - En[1],
              dispatch: Q,
            }),
            b
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : Et(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : Et(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : Et(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : Et(!!d)), f)
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
function gn(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function se(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function xt() {}
var dt = 0.7,
  Gt = 1 / dt,
  tt = "\\s*([+-]?\\d+)\\s*",
  pt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  B = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  mi = /^#([0-9a-f]{3,8})$/,
  _i = new RegExp(`^rgb\\(${tt},${tt},${tt}\\)$`),
  xi = new RegExp(`^rgb\\(${B},${B},${B}\\)$`),
  wi = new RegExp(`^rgba\\(${tt},${tt},${tt},${pt}\\)$`),
  vi = new RegExp(`^rgba\\(${B},${B},${B},${pt}\\)$`),
  bi = new RegExp(`^hsl\\(${pt},${B},${B}\\)$`),
  Ei = new RegExp(`^hsla\\(${pt},${B},${B},${pt}\\)$`),
  In = {
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
gn(xt, gt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Pn,
  formatHex: Pn,
  formatHex8: ki,
  formatHsl: $i,
  formatRgb: An,
  toString: An,
});
function Pn() {
  return this.rgb().formatHex();
}
function ki() {
  return this.rgb().formatHex8();
}
function $i() {
  return ce(this).formatHsl();
}
function An() {
  return this.rgb().formatRgb();
}
function gt(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = mi.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? Mn(n)
          : e === 3
          ? new E(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? kt(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? kt(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = _i.exec(t))
      ? new E(n[1], n[2], n[3], 1)
      : (n = xi.exec(t))
      ? new E((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = wi.exec(t))
      ? kt(n[1], n[2], n[3], n[4])
      : (n = vi.exec(t))
      ? kt((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = bi.exec(t))
      ? Tn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Ei.exec(t))
      ? Tn(n[1], n[2] / 100, n[3] / 100, n[4])
      : In.hasOwnProperty(t)
      ? Mn(In[t])
      : t === "transparent"
      ? new E(NaN, NaN, NaN, 0)
      : null
  );
}
function Mn(t) {
  return new E((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function kt(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new E(t, n, e, r);
}
function Ci(t) {
  return (
    t instanceof xt || (t = gt(t)),
    t ? ((t = t.rgb()), new E(t.r, t.g, t.b, t.opacity)) : new E()
  );
}
function en(t, n, e, r) {
  return arguments.length === 1 ? Ci(t) : new E(t, n, e, r ?? 1);
}
function E(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
gn(
  E,
  en,
  se(xt, {
    brighter(t) {
      return (
        (t = t == null ? Gt : Math.pow(Gt, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? dt : Math.pow(dt, t)),
        new E(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new E(K(this.r), K(this.g), K(this.b), Ht(this.opacity));
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
    hex: Ln,
    formatHex: Ln,
    formatHex8: Ni,
    formatRgb: Sn,
    toString: Sn,
  })
);
function Ln() {
  return `#${z(this.r)}${z(this.g)}${z(this.b)}`;
}
function Ni() {
  return `#${z(this.r)}${z(this.g)}${z(this.b)}${z(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function Sn() {
  const t = Ht(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${K(this.r)}, ${K(this.g)}, ${K(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function Ht(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function K(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function z(t) {
  return (t = K(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function Tn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new P(t, n, e, r)
  );
}
function ce(t) {
  if (t instanceof P) return new P(t.h, t.s, t.l, t.opacity);
  if ((t instanceof xt || (t = gt(t)), !t)) return new P();
  if (t instanceof P) return t;
  t = t.rgb();
  var n = t.r / 255,
    e = t.g / 255,
    r = t.b / 255,
    i = Math.min(n, e, r),
    o = Math.max(n, e, r),
    s = NaN,
    c = o - i,
    l = (o + i) / 2;
  return (
    c
      ? (n === o
          ? (s = (e - r) / c + (e < r) * 6)
          : e === o
          ? (s = (r - n) / c + 2)
          : (s = (n - e) / c + 4),
        (c /= l < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (c = l > 0 && l < 1 ? 0 : s),
    new P(s, c, l, t.opacity)
  );
}
function Ii(t, n, e, r) {
  return arguments.length === 1 ? ce(t) : new P(t, n, e, r ?? 1);
}
function P(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
gn(
  P,
  Ii,
  se(xt, {
    brighter(t) {
      return (
        (t = t == null ? Gt : Math.pow(Gt, t)),
        new P(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? dt : Math.pow(dt, t)),
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
        Wt(t >= 240 ? t - 240 : t + 120, i, r),
        Wt(t, i, r),
        Wt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new P(Bn(this.h), $t(this.s), $t(this.l), Ht(this.opacity));
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
      const t = Ht(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${Bn(this.h)}, ${
        $t(this.s) * 100
      }%, ${$t(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function Bn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function $t(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Wt(t, n, e) {
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
const le = (t) => () => t;
function Pi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function Ai(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function Mi(t) {
  return (t = +t) == 1
    ? ae
    : function (n, e) {
        return e - n ? Ai(n, e, t) : le(isNaN(n) ? e : n);
      };
}
function ae(t, n) {
  var e = n - t;
  return e ? Pi(t, e) : le(isNaN(t) ? n : t);
}
const Rn = (function t(n) {
  var e = Mi(n);
  function r(i, o) {
    var s = e((i = en(i)).r, (o = en(o)).r),
      c = e(i.g, o.g),
      l = e(i.b, o.b),
      a = ae(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = l(u)), (i.opacity = a(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function V(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var rn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Zt = new RegExp(rn.source, "g");
function Li(t) {
  return function () {
    return t;
  };
}
function Si(t) {
  return function (n) {
    return t(n) + "";
  };
}
function Ti(t, n) {
  var e = (rn.lastIndex = Zt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    l = [];
  for (t = t + "", n = n + ""; (r = rn.exec(t)) && (i = Zt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), l.push({ i: s, x: V(r, i) })),
      (e = Zt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? l[0]
        ? Si(l[0].x)
        : Li(n)
      : ((n = l.length),
        function (a) {
          for (var u = 0, h; u < n; ++u) c[(h = l[u]).i] = h.x(a);
          return c.join("");
        })
  );
}
var Dn = 180 / Math.PI,
  on = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function ue(t, n, e, r, i, o) {
  var s, c, l;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (l = t * e + n * r) && ((e -= t * l), (r -= n * l)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (l /= c)),
    t * r < n * e && ((t = -t), (n = -n), (l = -l), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * Dn,
      skewX: Math.atan(l) * Dn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var Ct;
function Bi(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? on : ue(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Ri(t) {
  return t == null ||
    (Ct || (Ct = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    Ct.setAttribute("transform", t),
    !(t = Ct.transform.baseVal.consolidate()))
    ? on
    : ((t = t.matrix), ue(t.a, t.b, t.c, t.d, t.e, t.f));
}
function fe(t, n, e, r) {
  function i(a) {
    return a.length ? a.pop() + " " : "";
  }
  function o(a, u, h, f, g, m) {
    if (a !== h || u !== f) {
      var _ = g.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: V(a, h) }, { i: _ - 2, x: V(u, f) });
    } else (h || f) && g.push("translate(" + h + n + f + e);
  }
  function s(a, u, h, f) {
    a !== u
      ? (a - u > 180 ? (u += 360) : u - a > 180 && (a += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: V(a, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(a, u, h, f) {
    a !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: V(a, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function l(a, u, h, f, g, m) {
    if (a !== h || u !== f) {
      var _ = g.push(i(g) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: V(a, h) }, { i: _ - 2, x: V(u, f) });
    } else (h !== 1 || f !== 1) && g.push(i(g) + "scale(" + h + "," + f + ")");
  }
  return function (a, u) {
    var h = [],
      f = [];
    return (
      (a = t(a)),
      (u = t(u)),
      o(a.translateX, a.translateY, u.translateX, u.translateY, h, f),
      s(a.rotate, u.rotate, h, f),
      c(a.skewX, u.skewX, h, f),
      l(a.scaleX, a.scaleY, u.scaleX, u.scaleY, h, f),
      (a = u = null),
      function (g) {
        for (var m = -1, _ = f.length, I; ++m < _; ) h[(I = f[m]).i] = I.x(g);
        return h.join("");
      }
    );
  };
}
var Di = fe(Bi, "px, ", "px)", "deg)"),
  Gi = fe(Ri, ", ", ")", ")"),
  et = 0,
  it = 0,
  rt = 0,
  he = 1e3,
  Xt,
  ot,
  Ot = 0,
  W = 0,
  Ft = 0,
  yt = typeof performance == "object" && performance.now ? performance : Date,
  de =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function yn() {
  return W || (de(Hi), (W = yt.now() + Ft));
}
function Hi() {
  W = 0;
}
function Vt() {
  this._call = this._time = this._next = null;
}
Vt.prototype = pe.prototype = {
  constructor: Vt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? yn() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        ot !== this &&
        (ot ? (ot._next = this) : (Xt = this), (ot = this)),
      (this._call = t),
      (this._time = e),
      sn();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), sn());
  },
};
function pe(t, n, e) {
  var r = new Vt();
  return r.restart(t, n, e), r;
}
function Xi() {
  yn(), ++et;
  for (var t = Xt, n; t; )
    (n = W - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --et;
}
function Gn() {
  (W = (Ot = yt.now()) + Ft), (et = it = 0);
  try {
    Xi();
  } finally {
    (et = 0), Vi(), (W = 0);
  }
}
function Oi() {
  var t = yt.now(),
    n = t - Ot;
  n > he && ((Ft -= n), (Ot = t));
}
function Vi() {
  for (var t, n = Xt, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Xt = e)));
  (ot = t), sn(r);
}
function sn(t) {
  if (!et) {
    it && (it = clearTimeout(it));
    var n = t - W;
    n > 24
      ? (t < 1 / 0 && (it = setTimeout(Gn, t - yt.now() - Ft)),
        rt && (rt = clearInterval(rt)))
      : (rt || ((Ot = yt.now()), (rt = setInterval(Oi, he))), (et = 1), de(Gn));
  }
}
function Hn(t, n, e) {
  var r = new Vt();
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
var Yi = hn("start", "end", "cancel", "interrupt"),
  Fi = [],
  ge = 0,
  Xn = 1,
  cn = 2,
  Lt = 3,
  On = 4,
  ln = 5,
  St = 6;
function qt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  qi(t, e, {
    name: n,
    index: r,
    group: i,
    on: Yi,
    tween: Fi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ge,
  });
}
function mn(t, n) {
  var e = A(t, n);
  if (e.state > ge) throw new Error("too late; already scheduled");
  return e;
}
function R(t, n) {
  var e = A(t, n);
  if (e.state > Lt) throw new Error("too late; already running");
  return e;
}
function A(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function qi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = pe(o, 0, e.time));
  function o(a) {
    (e.state = Xn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= a && s(a - e.delay);
  }
  function s(a) {
    var u, h, f, g;
    if (e.state !== Xn) return l();
    for (u in r)
      if (((g = r[u]), g.name === e.name)) {
        if (g.state === Lt) return Hn(s);
        g.state === On
          ? ((g.state = St),
            g.timer.stop(),
            g.on.call("interrupt", t, t.__data__, g.index, g.group),
            delete r[u])
          : +u < n &&
            ((g.state = St),
            g.timer.stop(),
            g.on.call("cancel", t, t.__data__, g.index, g.group),
            delete r[u]);
      }
    if (
      (Hn(function () {
        e.state === Lt &&
          ((e.state = On), e.timer.restart(c, e.delay, e.time), c(a));
      }),
      (e.state = cn),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === cn)
    ) {
      for (
        e.state = Lt, i = new Array((f = e.tween.length)), u = 0, h = -1;
        u < f;
        ++u
      )
        (g = e.tween[u].value.call(t, t.__data__, e.index, e.group)) &&
          (i[++h] = g);
      i.length = h + 1;
    }
  }
  function c(a) {
    for (
      var u =
          a < e.duration
            ? e.ease.call(null, a / e.duration)
            : (e.timer.restart(l), (e.state = ln), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === ln && (e.on.call("end", t, t.__data__, e.index, e.group), l());
  }
  function l() {
    (e.state = St), e.timer.stop(), delete r[n];
    for (var a in r) return;
    delete t.__transition;
  }
}
function Ui(t, n) {
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
      (i = r.state > cn && r.state < ln),
        (r.state = St),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function zi(t) {
  return this.each(function () {
    Ui(this, t);
  });
}
function Ki(t, n) {
  var e, r;
  return function () {
    var i = R(this, t),
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
function Wi(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = R(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var c = { name: n, value: e }, l = 0, a = i.length; l < a; ++l)
        if (i[l].name === n) {
          i[l] = c;
          break;
        }
      l === a && i.push(c);
    }
    o.tween = i;
  };
}
function Zi(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = A(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ki : Wi)(e, t, n));
}
function _n(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = R(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return A(i, r).value[n];
    }
  );
}
function ye(t, n) {
  var e;
  return (
    typeof n == "number"
      ? V
      : n instanceof gt
      ? Rn
      : (e = gt(n))
      ? ((n = e), Rn)
      : Ti
  )(t, n);
}
function Qi(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Ji(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ji(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function to(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function no(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      l;
    return c == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (l = c + ""),
        s === l
          ? null
          : s === r && l === i
          ? o
          : ((i = l), (o = n((r = s), c))));
  };
}
function eo(t, n, e) {
  var r, i, o;
  return function () {
    var s,
      c = e(this),
      l;
    return c == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (l = c + ""),
        s === l
          ? null
          : s === r && l === i
          ? o
          : ((i = l), (o = n((r = s), c))));
  };
}
function ro(t, n) {
  var e = Yt(t),
    r = e === "transform" ? Gi : ye;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? eo : no)(e, r, _n(this, "attr." + t, n))
      : n == null
      ? (e.local ? Ji : Qi)(e)
      : (e.local ? to : ji)(e, r, n)
  );
}
function io(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function oo(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function so(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && oo(t, o)), e;
  }
  return (i._value = n), i;
}
function co(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && io(t, o)), e;
  }
  return (i._value = n), i;
}
function lo(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Yt(t);
  return this.tween(e, (r.local ? so : co)(r, n));
}
function ao(t, n) {
  return function () {
    mn(this, t).delay = +n.apply(this, arguments);
  };
}
function uo(t, n) {
  return (
    (n = +n),
    function () {
      mn(this, t).delay = n;
    }
  );
}
function fo(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ao : uo)(n, t))
    : A(this.node(), n).delay;
}
function ho(t, n) {
  return function () {
    R(this, t).duration = +n.apply(this, arguments);
  };
}
function po(t, n) {
  return (
    (n = +n),
    function () {
      R(this, t).duration = n;
    }
  );
}
function go(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? ho : po)(n, t))
    : A(this.node(), n).duration;
}
function yo(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    R(this, t).ease = n;
  };
}
function mo(t) {
  var n = this._id;
  return arguments.length ? this.each(yo(n, t)) : A(this.node(), n).ease;
}
function _o(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    R(this, t).ease = e;
  };
}
function xo(t) {
  if (typeof t != "function") throw new Error();
  return this.each(_o(this._id, t));
}
function wo(t) {
  typeof t != "function" && (t = Zn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), l, a = 0; a < s; ++a)
      (l = o[a]) && t.call(l, l.__data__, a, o) && c.push(l);
  return new X(r, this._parents, this._name, this._id);
}
function vo(t) {
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
      var l = n[c], a = e[c], u = l.length, h = (s[c] = new Array(u)), f, g = 0;
      g < u;
      ++g
    )
      (f = l[g] || a[g]) && (h[g] = f);
  for (; c < r; ++c) s[c] = n[c];
  return new X(s, this._parents, this._name, this._id);
}
function bo(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Eo(t, n, e) {
  var r,
    i,
    o = bo(n) ? mn : R;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function ko(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? A(this.node(), e).on.on(t)
    : this.each(Eo(e, t, n));
}
function $o(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function Co() {
  return this.on("end.remove", $o(this._id));
}
function No(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = dn(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var c = r[s], l = c.length, a = (o[s] = new Array(l)), u, h, f = 0;
      f < l;
      ++f
    )
      (u = c[f]) &&
        (h = t.call(u, u.__data__, f, c)) &&
        ("__data__" in u && (h.__data__ = u.__data__),
        (a[f] = h),
        qt(a[f], n, e, f, a, A(u, e)));
  return new X(o, this._parents, n, e);
}
function Io(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Wn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var l = r[c], a = l.length, u, h = 0; h < a; ++h)
      if ((u = l[h])) {
        for (
          var f = t.call(u, u.__data__, h, l),
            g,
            m = A(u, e),
            _ = 0,
            I = f.length;
          _ < I;
          ++_
        )
          (g = f[_]) && qt(g, n, e, _, f, m);
        o.push(f), s.push(u);
      }
  return new X(o, s, n, e);
}
var Po = _t.prototype.constructor;
function Ao() {
  return new Po(this._groups, this._parents);
}
function Mo(t, n) {
  var e, r, i;
  return function () {
    var o = nt(this, t),
      s = (this.style.removeProperty(t), nt(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function me(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function Lo(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = nt(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function So(t, n, e) {
  var r, i, o;
  return function () {
    var s = nt(this, t),
      c = e(this),
      l = c + "";
    return (
      c == null && (l = c = (this.style.removeProperty(t), nt(this, t))),
      s === l ? null : s === r && l === i ? o : ((i = l), (o = n((r = s), c)))
    );
  };
}
function To(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var l = R(this, t),
      a = l.on,
      u = l.value[o] == null ? c || (c = me(n)) : void 0;
    (a !== e || i !== u) && (r = (e = a).copy()).on(s, (i = u)), (l.on = r);
  };
}
function Bo(t, n, e) {
  var r = (t += "") == "transform" ? Di : ye;
  return n == null
    ? this.styleTween(t, Mo(t, r)).on("end.style." + t, me(t))
    : typeof n == "function"
    ? this.styleTween(t, So(t, r, _n(this, "style." + t, n))).each(
        To(this._id, t)
      )
    : this.styleTween(t, Lo(t, r, n), e).on("end.style." + t, null);
}
function Ro(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Do(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Ro(t, s, e)), r;
  }
  return (o._value = n), o;
}
function Go(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, Do(t, n, e ?? ""));
}
function Ho(t) {
  return function () {
    this.textContent = t;
  };
}
function Xo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Oo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? Xo(_n(this, "text", t))
      : Ho(t == null ? "" : t + "")
  );
}
function Vo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Yo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Vo(i)), n;
  }
  return (r._value = t), r;
}
function Fo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Yo(t));
}
function qo() {
  for (
    var t = this._name,
      n = this._id,
      e = _e(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, l, a = 0; a < c; ++a)
      if ((l = s[a])) {
        var u = A(l, n);
        qt(l, t, e, a, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new X(r, this._parents, t, e);
}
function Uo() {
  var t,
    n,
    e = this,
    r = e._id,
    i = e.size();
  return new Promise(function (o, s) {
    var c = { value: s },
      l = {
        value: function () {
          --i === 0 && o();
        },
      };
    e.each(function () {
      var a = R(this, r),
        u = a.on;
      u !== t &&
        ((n = (t = u).copy()),
        n._.cancel.push(c),
        n._.interrupt.push(c),
        n._.end.push(l)),
        (a.on = n);
    }),
      i === 0 && o();
  });
}
var zo = 0;
function X(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function _e() {
  return ++zo;
}
var D = _t.prototype;
X.prototype = {
  constructor: X,
  select: No,
  selectAll: Io,
  selectChild: D.selectChild,
  selectChildren: D.selectChildren,
  filter: wo,
  merge: vo,
  selection: Ao,
  transition: qo,
  call: D.call,
  nodes: D.nodes,
  node: D.node,
  size: D.size,
  empty: D.empty,
  each: D.each,
  on: ko,
  attr: ro,
  attrTween: lo,
  style: Bo,
  styleTween: Go,
  text: Oo,
  textTween: Fo,
  remove: Co,
  tween: Zi,
  delay: fo,
  duration: go,
  ease: mo,
  easeVarying: xo,
  end: Uo,
  [Symbol.iterator]: D[Symbol.iterator],
};
function Ko(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wo = { time: null, delay: 0, duration: 250, ease: Ko };
function Zo(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Qo(t) {
  var n, e;
  t instanceof X
    ? ((n = t._id), (t = t._name))
    : ((n = _e()), ((e = Wo).time = yn()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, l, a = 0; a < c; ++a)
      (l = s[a]) && qt(l, t, n, a, s, e || Zo(l, n));
  return new X(r, this._parents, t, n);
}
_t.prototype.interrupt = zi;
_t.prototype.transition = Qo;
const an = Math.PI,
  un = 2 * an,
  U = 1e-6,
  Jo = un - U;
function xe(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function jo(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return xe;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class ts {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? xe : jo(n));
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
      l = r - n,
      a = i - e,
      u = s - n,
      h = c - e,
      f = u * u + h * h;
    if (this._x1 === null) this._append`M${(this._x1 = n)},${(this._y1 = e)}`;
    else if (f > U)
      if (!(Math.abs(h * l - a * u) > U) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let g = r - s,
          m = i - c,
          _ = l * l + a * a,
          I = g * g + m * m,
          Z = Math.sqrt(_),
          M = Math.sqrt(f),
          L = o * Math.tan((an - Math.acos((_ + f - I) / (2 * Z * M))) / 2),
          d = L / M,
          y = L / Z;
        Math.abs(d - 1) > U && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * g > u * m)},${(this._x1 =
            n + y * l)},${(this._y1 = e + y * a)}`;
      }
  }
  arc(n, e, r, i, o, s) {
    if (((n = +n), (e = +e), (r = +r), (s = !!s), r < 0))
      throw new Error(`negative radius: ${r}`);
    let c = r * Math.cos(i),
      l = r * Math.sin(i),
      a = n + c,
      u = e + l,
      h = 1 ^ s,
      f = s ? i - o : o - i;
    this._x1 === null
      ? this._append`M${a},${u}`
      : (Math.abs(this._x1 - a) > U || Math.abs(this._y1 - u) > U) &&
        this._append`L${a},${u}`,
      r &&
        (f < 0 && (f = (f % un) + un),
        f > Jo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - l
            }A${r},${r},0,1,${h},${(this._x1 = a)},${(this._y1 = u)}`
          : f > U &&
            this._append`A${r},${r},0,${+(f >= an)},${h},${(this._x1 =
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
function ns(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function es(t, n) {
  return fetch(t, n).then(ns);
}
function rs(t) {
  return (n, e) => es(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const is = rs("application/xml");
function st(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
st.prototype = {
  constructor: st,
  scale: function (t) {
    return t === 1 ? this : new st(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new st(this.k, this.x + this.k * t, this.y + this.k * n);
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
st.prototype;
class q {
  constructor(n, e, r, i, o, s, c) {
    kn(this, "dragged", (n) => {
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
    if (x("#" + this.id).node() != null) return;
    const n = await is(this.url);
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
      this.sensor.node().append(x(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          yi()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    x(this).raise().classed("active", !0);
  }
  dragended(n) {
    x(this).classed("active", !1);
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
  we = ["1kresistor_pin_1", "1kresistor_pin_2"],
  Nt = { "1kresistor_pin_1": "Led cathode", "1kresistor_pin_2": "Led Anode" },
  ve = ["res_pin1", "res_pin2"],
  It = { res_pin1: "Resistor pin 1", res_pin2: "Resistor pin 2" },
  be = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  Pt = {
    hc05_key_pin: "Key pin of HC-05",
    hc05_vcc_pin: "Vcc pin of HC-05",
    hc05_gnd_pin: "GND pin of HC-05",
    hc05_txd_pin: "TXD pin of HC-05",
    hc05_rxd_pin: "RXD pin of HC-05",
    hc05_state_pin: "State pin of HC-05",
  },
  T = {
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
  os = (t) => {
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
        if (T[r.connector] == "GND") {
          e++, console.log("gnd", e);
          return;
        }
        if (T[r.connector] == "GP0") {
          e++, console.log("GP1", e);
          return;
        }
        if (T[r.connector] == "GP1") {
          e++, console.log("GP2", e);
          return;
        }
        if (T[r.connector] == "VBUS") {
          e++, console.log("VBUS", e);
          return;
        }
        if (H[r.connector] && T[r.connector].includes("GP19")) {
          e++;
          return;
        }
      }),
      console.log(e, "total"),
      e == 12
    );
  };
class ss {
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
      const e = T[this.connections[this.connections.length - 2].connector]
          ? `${
              T[this.connections[this.connections.length - 2].connector]
            } pin of Raspberry Pi`
          : Nt[this.connections[this.connections.length - 2].connector]
          ? Nt[this.connections[this.connections.length - 2].connector]
          : It[this.connections[this.connections.length - 2].connector]
          ? It[this.connections[this.connections.length - 2].connector]
          : Pt[this.connections[this.connections.length - 2].connector]
          ? Pt[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = T[this.connections[this.connections.length - 1].connector]
          ? `${
              T[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : Nt[this.connections[this.connections.length - 1].connector]
          ? Nt[this.connections[this.connections.length - 1].connector]
          : It[this.connections[this.connections.length - 1].connector]
          ? It[this.connections[this.connections.length - 1].connector]
          : Pt[this.connections[this.connections.length - 1].connector]
          ? Pt[this.connections[this.connections.length - 1].connector]
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
class cs {
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
const Y = document.getElementById("svg");
Y || console.error("SVG container not found");
const G = (Y == null ? void 0 : Y.offsetWidth) || window.innerWidth,
  ls =
    (Y != null && Y.offsetTop
      ? window.innerHeight - Y.offsetTop
      : window.innerHeight) || 400,
  as = window.innerWidth < 850,
  Vn = {
    desktop: {
      raspberry: { scale: 0.6, x: 0, y: 0 },
      sensor: { scale: 0.45, x: 400, y: 0 },
      led: { scale: 0.25, x: 400, y: 100 },
      resistor: { scale: 0.45, x: 300, y: 200 },
      object: { scale: 0.5, x: 800, y: 0 },
      bluetooth: { scale: 0.5, x: 800, y: 0 },
      phone: { scale: 0.5, x: 800, y: 0 },
      bconnect: { scale: 0.5, x: 800, y: 0 },
    },
    mobile: {
      raspberry: { scale: 0.15, x: G * 0.1, y: 10 },
      sensor: { scale: 0.15, x: G * 0.3, y: 10 },
      led: { scale: 0.15, x: G * 0.3, y: 60 },
      resistor: { scale: 0.15, x: G * 0.2, y: 90 },
      object: { scale: 0.15, x: G * 0.5, y: 20 },
      bluetooth: { scale: 0.15, x: G * 0.5, y: 20 },
      phone: { scale: 0.15, x: G * 0.5, y: 20 },
      bconnect: { scale: 0.15, x: G * 0.5, y: 20 },
    },
  },
  p = as ? Vn.mobile : Vn.desktop,
  us = Math.max(
    p.raspberry.x + 400 * p.raspberry.scale,
    p.sensor.x + 200 * p.sensor.scale,
    p.led.x + 100 * p.led.scale,
    p.resistor.x + 100 * p.resistor.scale,
    p.object.x + 100 * p.object.scale,
    p.bluetooth.x + 100 * p.bluetooth.scale,
    p.phone.x + 100 * p.phone.scale,
    p.bconnect.x + 100 * p.bconnect.scale
  ),
  fs = Math.max(
    p.raspberry.y + 200 * p.raspberry.scale,
    p.sensor.y + 100 * p.sensor.scale,
    p.led.y + 100 * p.led.scale,
    p.resistor.y + 100 * p.resistor.scale,
    p.object.y + 100 * p.object.scale,
    p.bluetooth.y + 100 * p.bluetooth.scale,
    p.phone.y + 100 * p.phone.scale,
    p.bconnect.y + 100 * p.bconnect.scale
  ),
  hs = Math.max(G, us + 50),
  ds = Math.max(ls, fs + 50),
  w = x("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr("viewBox", `0 0 ${hs} ${ds}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto"),
  Yn = (t, n) => {
    xn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  Fn = (t, n, e) => {
    w.append("circle")
      .attr("cx", t)
      .attr("cy", n)
      .attr("r", 3)
      .attr("fill", "black")
      .attr("id", e);
  },
  ps = new q(
    "raspberry",
    w,
    "images/pico.svg",
    p.raspberry.scale,
    !1,
    p.raspberry.x,
    p.raspberry.y
  ),
  gs = new q(
    "ultraSonicsensor",
    w,
    "images/sensor1.svg",
    p.sensor.scale,
    !1,
    p.sensor.x,
    p.sensor.y
  ),
  ys = new q(
    "ledlight",
    w,
    "images/led.svg",
    p.led.scale,
    !1,
    p.led.x,
    p.led.y
  ),
  ms = new q(
    "resistor220",
    w,
    "images/resistor.svg",
    p.resistor.scale,
    !1,
    p.resistor.x,
    p.resistor.y
  ),
  _s = new q(
    "box",
    w,
    "images/box.svg",
    p.object.scale,
    !1,
    p.object.x,
    p.object.y
  ),
  xs = new q(
    "bluetooth",
    w,
    "images/box1.svg",
    p.bluetooth.scale,
    !1,
    p.bluetooth.x,
    p.bluetooth.y
  ),
  ws = new q(
    "phone",
    w,
    "images/Group11.svg",
    p.phone.scale,
    !1,
    p.phone.x,
    p.phone.y
  ),
  vs = new q(
    "bconnect",
    w,
    "images/start.svg",
    p.bconnect.scale,
    !1,
    p.bconnect.x,
    p.bconnect.y
  ),
  xn = w.append("g").attr("id", "pathsGroup"),
  wt = {
    rasberryPi:
      "Raspberry Pi Pico: A microcontroller board for low-cost, high-performance projects. It powers and controls the circuit, with VBUS providing 5V to the HC-05, GP0 and GP1 handling Bluetooth communication, and GP19 driving the LED via the resistor.",
    sensor:
      "HC-05 Bluetooth Module: Enables wireless communication with devices. It connects to the Raspberry Pi Pico via VCC to VBUS for power, TX to GP0 and RX to GP1 for data transfer, and GND to ground, enabling smartphone control of the LED.",
    resistor:
      "Resistor: Limits current flow to protect the LED in the circuit. It connects between the LED’s positive terminal and GP19 on the Raspberry Pi Pico to regulate current, preventing damage to the LED.",
    led: "LED: A light-emitting diode that lights up when powered. Its positive terminal connects to the resistor (linked to GP19) for current control, and its negative terminal connects to GND on the Raspberry Pi Pico. Supports multiple colors via control buttons.",
    object:
      "Smartphone: Used to control the LED via Bluetooth connection. It pairs with the HC-05 module (connected to the Pico) to send commands, changing LED colors wirelessly after Bluetooth is enabled and the Raspberry Pi is selected.",
  },
  ct = document.getElementById("rasberryPi"),
  lt = document.getElementById("sensor"),
  at = document.getElementById("led"),
  ut = document.getElementById("resistor"),
  ft = document.getElementById("object"),
  Tt = document.getElementById("info"),
  fn = document.getElementById("list"),
  mt = document.getElementById("displayInfo"),
  Bt = document.getElementById("codeSubmit"),
  J = document.getElementById("componentDescription"),
  Rt = document.getElementById("undoButton"),
  Qt = document.getElementById("closeCodeDrawer"),
  Jt = document.getElementById("codeButton"),
  jt = document.getElementById("resetButton");
ct || console.error("Raspberry Pi component not found");
lt || console.error("Sensor component not found");
at || console.error("LED component not found");
ut || console.error("Resistor component not found");
ft || console.error("Object component not found");
Tt || console.error("Info button not found");
fn || console.error("List element not found");
mt || console.error("Display info element not found");
Bt || console.error("Code submit button not found");
Rt || console.error("Undo button not found");
ct == null ||
  ct.addEventListener("click", async () => {
    console.log("Raspberry Pi clicked"), await ps.load();
  });
lt == null ||
  lt.addEventListener("click", () => {
    console.log("Sensor clicked"), gs.load();
  });
at == null ||
  at.addEventListener("click", () => {
    console.log("LED clicked"), ys.load();
    const t = document.getElementById("ledLight");
    t && (t.style.fill = "black");
  });
ut == null ||
  ut.addEventListener("click", () => {
    console.log("Resistor clicked"), ms.load();
  });
ft == null ||
  ft.addEventListener("click", async () => {
    var r;
    console.log("Object clicked"),
      await ws.load(),
      await _s.load(),
      await xs.load(),
      await vs.load();
    const t = document.getElementById("hide"),
      n = document.getElementById("devices"),
      e = document.getElementById("device");
    t && (t.style.display = "none"),
      n && (n.style.display = "none"),
      e && (e.style.display = "none"),
      (r = document.getElementById("svgContainer")) == null ||
        r.addEventListener("click", (i) => {
          if (
            (console.log("SVG container clicked, target ID:", i.target.id),
            i.target.id === "buttonIdInSvg")
          ) {
            const o = document.getElementById("box");
            o && (o.style.display = "none");
          }
          if (i.target.id === "icon") {
            const o = document.getElementById("bconnect");
            o && (o.style.display = "none");
          }
          if (i.target.id === "on") {
            const o = document.getElementById("on"),
              s = document.getElementById("off");
            o && (o.style.fill = "green"),
              s && (s.style.display = "none"),
              t && (t.style.display = ""),
              n && (n.style.display = ""),
              e && (e.style.display = "");
          }
          if (i.target.id === "devices") {
            const o = document.getElementById("bluetooth");
            o && (o.style.display = "none");
          }
        });
  });
const vt = (t, n) => {
  t == null ||
    t.addEventListener("mouseover", () => {
      console.log("Hovering over component:", n),
        J && ((J.textContent = n), (J.style.display = "block"));
    }),
    t == null ||
      t.addEventListener("mouseout", () => {
        console.log("Mouse out from component"),
          J &&
            ((J.textContent = "Hover over a component to see its description."),
            (J.style.display = "none"));
      });
};
vt(ct, wt.rasberryPi);
vt(lt, wt.sensor);
vt(at, wt.led);
vt(ut, wt.resistor);
vt(ft, wt.object);
let At = !1;
Tt == null ||
  Tt.addEventListener("click", () => {
    console.log("Info button clicked, showList:", At),
      (At = !At),
      fn && (fn.style.display = At ? "block" : "none");
  });
Jt == null ||
  Jt.addEventListener("click", () => {
    console.log("Code button clicked");
    const t = document.getElementById("my-drawer-4");
    t && (t.checked = !0);
  });
jt == null ||
  jt.addEventListener("click", () => {
    console.log("Reset button clicked"),
      (window.location.href = window.location.href);
  });
Rt == null ||
  Rt.addEventListener("click", () => {
    console.log("Undo button clicked"), F.undoLastConnection(), Es();
  });
Qt == null ||
  Qt.addEventListener("click", () => {
    console.log("Close code drawer button clicked");
    const t = document.getElementById("my-drawer-4");
    t && (t.checked = !1);
  });
Bt == null ||
  Bt.addEventListener("click", () => {
    console.log("Code submit button clicked");
    const t = os(F.getConnectionLog());
    if (t === !0) {
      const n = document.getElementById("ledLight");
      if (!n) {
        console.error("LED element not found");
        return;
      }
      w.on("click", (e) => {
        switch ((x(n).interrupt(), e.target.id)) {
          case "ledon":
            x(n)
              .style("fill", "lightyellow")
              .style("animation", "blink 1s infinite");
            break;
          case "ledoff":
            x(n).style("fill", "black").style("animation", "none");
            break;
          case "greenlight":
            x(n).style("fill", "green").style("animation", "blink 1s infinite");
            break;
          case "yellowlight":
            x(n)
              .style("fill", "yellow")
              .style("animation", "blink 1s infinite");
            break;
          case "redlight":
            x(n).style("fill", "red").style("animation", "blink 1s infinite");
            break;
          case "bluelight":
            x(n).style("fill", "blue").style("animation", "blink 1s infinite");
            break;
        }
      });
    } else
      t.error
        ? Un.throw("Error", t.error)
        : Un.throw(
            "Error",
            "Please connect the components properly. Refer to the connection diagram."
          );
  });
const qn = (t) =>
  H.includes(t.srcElement.id) ||
  we.includes(t.srcElement.id) ||
  ve.includes(t.srcElement.id) ||
  be.includes(t.srcElement.id);
let C;
const F = new ss("connectionLog"),
  Un = new cs("errorBox", "errorHeading", "errorText", "closeErrorBox");
let N = 0;
const bs = (t) => {
    xn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  Es = () => {
    if (C) {
      xn.selectAll(`path[id^="path${N}"]`)
        .nodes()
        .forEach((e) => e.remove());
      const n = w.select(`#marker-start-${N}`);
      n.empty() || n.remove(),
        (C = null),
        console.log("Removed all incomplete paths and markers");
      return;
    }
    if (F.connections.length > 0) {
      const t = F.connections[F.connections.length - 1],
        n = t.lineID,
        e = parseInt(n.replace("path", ""));
      bs(n);
      const r = w.select(`#marker-start-${e}`);
      r.empty() || r.remove();
      const i = w.select(`#marker-end-${e}`);
      i.empty() || i.remove(),
        H.includes(t.connector) &&
          x(`#${t.connector}`).style("fill", "#9a916c"),
        t.connectorEnd &&
          H.includes(t.connectorEnd) &&
          x(`#${t.connectorEnd}`).style("fill", "#9a916c"),
        F.connections.pop(),
        console.log(`Removed paths and markers with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
w.on("dblclick", (t) => {
  if (
    (console.log("SVG double-clicked, target ID:", t.srcElement.id),
    qn(t) && !C)
  ) {
    (C = new ts()),
      C.moveTo(t.offsetX, t.offsetY),
      H.includes(t.srcElement.id)
        ? x(`#${t.srcElement.id}`).style("fill", "black")
        : Fn(t.offsetX, t.offsetY, `marker-start-${N}`),
      F.addConnection({
        lineID: `path${N}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      w.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(N, "path count");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !H.includes(t.srcElement.id)) {
    C &&
      (C.lineTo(t.offsetX, t.offsetY),
      Yn(C.toString(), `path${N}`),
      console.log("path created"),
      console.log(N));
    return;
  }
  if (qn(t) && C) {
    C.lineTo(t.offsetX, t.offsetY),
      Yn(C.toString(), `path${N}`),
      H.includes(t.srcElement.id)
        ? x(`#${t.srcElement.id}`).style("fill", "black")
        : Fn(t.offsetX, t.offsetY, `marker-end-${N}`),
      F.addConnection({
        lineID: `path${N}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      N++,
      w.style("cursor", "default"),
      (C = null),
      console.log("path created 2"),
      console.log(N);
    return;
  }
});
w.on("mouseover", (t) => {
  H.includes(t.srcElement.id) &&
    (console.log("Mouseover connector:", t.srcElement.id),
    mt && (mt.innerHTML = T[t.srcElement.id]));
});
w.on("mouseout", (t) => {
  (H.includes(t.srcElement.id) ||
    we.includes(t.srcElement.id) ||
    ve.includes(t.srcElement.id) ||
    be.includes(t.srcElement.id)) &&
    (console.log("Mouseout connector"),
    mt && (mt.innerHTML = "CONNECTOR INFO"));
});
var zn;
(zn = document.getElementById("backButton")) == null ||
  zn.addEventListener("click", function () {
    console.log("Back button clicked"),
      (document.getElementById("my-drawer-4").checked = !1);
  });
