var ce = Object.defineProperty;
var ae = (t, n, e) =>
  n in t
    ? ce(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var cn = (t, n, e) => (ae(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var le = { value: () => {} };
function Kt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new wt(e);
}
function wt(t) {
  this._ = t;
}
function ue(t, n) {
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
wt.prototype = Kt.prototype = {
  constructor: wt,
  on: function (t, n) {
    var e = this._,
      r = ue(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = fe(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = an(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = an(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new wt(t);
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
function fe(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function an(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = le), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Gt = "http://www.w3.org/1999/xhtml";
const ln = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Gt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Pt(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    ln.hasOwnProperty(n) ? { space: ln[n], local: t } : t
  );
}
function he(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Gt && n.documentElement.namespaceURI === Gt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function de(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Pn(t) {
  var n = Pt(t);
  return (n.local ? de : he)(n);
}
function pe() {}
function Wt(t) {
  return t == null
    ? pe
    : function () {
        return this.querySelector(t);
      };
}
function ge(t) {
  typeof t != "function" && (t = Wt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (
      var o = n[i], s = o.length, c = (r[i] = new Array(s)), a, l, u = 0;
      u < s;
      ++u
    )
      (a = o[u]) &&
        (l = t.call(a, a.__data__, u, o)) &&
        ("__data__" in a && (l.__data__ = a.__data__), (c[u] = l));
  return new E(r, this._parents);
}
function me(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function _e() {
  return [];
}
function An(t) {
  return t == null
    ? _e
    : function () {
        return this.querySelectorAll(t);
      };
}
function ye(t) {
  return function () {
    return me(t.apply(this, arguments));
  };
}
function we(t) {
  typeof t == "function" ? (t = ye(t)) : (t = An(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new E(r, i);
}
function In(t) {
  return function () {
    return this.matches(t);
  };
}
function Sn(t) {
  return function (n) {
    return n.matches(t);
  };
}
var ve = Array.prototype.find;
function xe(t) {
  return function () {
    return ve.call(this.children, t);
  };
}
function be() {
  return this.firstElementChild;
}
function Ee(t) {
  return this.select(t == null ? be : xe(typeof t == "function" ? t : Sn(t)));
}
var $e = Array.prototype.filter;
function Ce() {
  return Array.from(this.children);
}
function ke(t) {
  return function () {
    return $e.call(this.children, t);
  };
}
function Ne(t) {
  return this.selectAll(
    t == null ? Ce : ke(typeof t == "function" ? t : Sn(t))
  );
}
function Pe(t) {
  typeof t != "function" && (t = In(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new E(r, this._parents);
}
function Tn(t) {
  return new Array(t.length);
}
function Ae() {
  return new E(this._enter || this._groups.map(Tn), this._parents);
}
function bt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
bt.prototype = {
  constructor: bt,
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
function Ie(t) {
  return function () {
    return t;
  };
}
function Se(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new bt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Te(t, n, e, r, i, o, s) {
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
        : (e[c] = new bt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Le(t) {
  return t.__data__;
}
function Me(t, n) {
  if (!arguments.length) return Array.from(this, Le);
  var e = n ? Te : Se,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ie(t));
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
      p = De(t.call(u, u && u.__data__, l, r)),
      m = p.length,
      _ = (c[l] = new Array(m)),
      k = (s[l] = new Array(m)),
      U = (a[l] = new Array(f));
    e(u, h, _, k, U, p, n);
    for (var A = 0, I = 0, d, g; A < m; ++A)
      if ((d = _[A])) {
        for (A >= I && (I = A + 1); !(g = k[I]) && ++I < m; );
        d._next = g || null;
      }
  }
  return (s = new E(s, r)), (s._enter = c), (s._exit = a), s;
}
function De(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Be() {
  return new E(this._exit || this._groups.map(Tn), this._parents);
}
function Re(t, n, e) {
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
function Ge(t) {
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
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, m = 0;
      m < h;
      ++m
    )
      (p = l[m] || u[m]) && (f[m] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new E(c, this._parents);
}
function He() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Xe(t) {
  t || (t = qe);
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
  return new E(i, this._parents).order();
}
function qe(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Fe() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Oe() {
  return Array.from(this);
}
function Ve() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ye() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Ue() {
  return !this.node();
}
function ze(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function Ke(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function We(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ze(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Qe(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function je(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function tr(t, n) {
  var e = Pt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? We
        : Ke
      : typeof n == "function"
      ? e.local
        ? je
        : Je
      : e.local
      ? Qe
      : Ze)(e, n)
  );
}
function Ln(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function nr(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function er(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function rr(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function ir(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? nr : typeof n == "function" ? rr : er)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Ln(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function or(t) {
  return function () {
    delete this[t];
  };
}
function sr(t, n) {
  return function () {
    this[t] = n;
  };
}
function cr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function ar(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? or : typeof n == "function" ? cr : sr)(t, n))
    : this.node()[t];
}
function Mn(t) {
  return t.trim().split(/^|\s+/);
}
function Zt(t) {
  return t.classList || new Dn(t);
}
function Dn(t) {
  (this._node = t), (this._names = Mn(t.getAttribute("class") || ""));
}
Dn.prototype = {
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
function Bn(t, n) {
  for (var e = Zt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Rn(t, n) {
  for (var e = Zt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function lr(t) {
  return function () {
    Bn(this, t);
  };
}
function ur(t) {
  return function () {
    Rn(this, t);
  };
}
function fr(t, n) {
  return function () {
    (n.apply(this, arguments) ? Bn : Rn)(this, t);
  };
}
function hr(t, n) {
  var e = Mn(t + "");
  if (arguments.length < 2) {
    for (var r = Zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? fr : n ? lr : ur)(e, n));
}
function dr() {
  this.textContent = "";
}
function pr(t) {
  return function () {
    this.textContent = t;
  };
}
function gr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function mr(t) {
  return arguments.length
    ? this.each(t == null ? dr : (typeof t == "function" ? gr : pr)(t))
    : this.node().textContent;
}
function _r() {
  this.innerHTML = "";
}
function yr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function wr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function vr(t) {
  return arguments.length
    ? this.each(t == null ? _r : (typeof t == "function" ? wr : yr)(t))
    : this.node().innerHTML;
}
function xr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function br() {
  return this.each(xr);
}
function Er() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $r() {
  return this.each(Er);
}
function Cr(t) {
  var n = typeof t == "function" ? t : Pn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function kr() {
  return null;
}
function Nr(t, n) {
  var e = typeof t == "function" ? t : Pn(t),
    r = n == null ? kr : typeof n == "function" ? n : Wt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Pr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Ar() {
  return this.each(Pr);
}
function Ir() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Sr() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Tr(t) {
  return this.select(t ? Sr : Ir);
}
function Lr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Mr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Dr(t) {
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
function Br(t) {
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
function Rr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = Mr(n);
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
function Gr(t, n, e) {
  var r = Dr(t + ""),
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
  for (c = n ? Rr : Br, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Gn(t, n, e) {
  var r = Ln(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Hr(t, n) {
  return function () {
    return Gn(this, t, n);
  };
}
function Xr(t, n) {
  return function () {
    return Gn(this, t, n.apply(this, arguments));
  };
}
function qr(t, n) {
  return this.each((typeof n == "function" ? Xr : Hr)(t, n));
}
function* Fr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Hn = [null];
function E(t, n) {
  (this._groups = t), (this._parents = n);
}
function ct() {
  return new E([[document.documentElement]], Hn);
}
function Or() {
  return this;
}
E.prototype = ct.prototype = {
  constructor: E,
  select: ge,
  selectAll: we,
  selectChild: Ee,
  selectChildren: Ne,
  filter: Pe,
  data: Me,
  enter: Ae,
  exit: Be,
  join: Re,
  merge: Ge,
  selection: Or,
  order: He,
  sort: Xe,
  call: Fe,
  nodes: Oe,
  node: Ve,
  size: Ye,
  empty: Ue,
  each: ze,
  attr: tr,
  style: ir,
  property: ar,
  classed: hr,
  text: mr,
  html: vr,
  raise: br,
  lower: $r,
  append: Cr,
  insert: Nr,
  remove: Ar,
  clone: Tr,
  datum: Lr,
  on: Gr,
  dispatch: qr,
  [Symbol.iterator]: Fr,
};
function v(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Hn);
}
function Vr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function un(t, n) {
  if (((t = Vr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Yr = { passive: !1 },
  et = { capture: !0, passive: !1 };
function Mt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Ur(t) {
  var n = t.document.documentElement,
    e = v(t).on("dragstart.drag", K, et);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, et)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function zr(t, n) {
  var e = t.document.documentElement,
    r = v(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, et),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ft = (t) => () => t;
function Ht(
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
Ht.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Kr(t) {
  return !t.ctrlKey && !t.button;
}
function Wr() {
  return this.parentNode;
}
function Zr(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Qr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Jr() {
  var t = Kr,
    n = Wr,
    e = Zr,
    r = Qr,
    i = {},
    o = Kt("start", "drag", "end"),
    s = 0,
    c,
    a,
    l,
    u,
    h = 0;
  function f(d) {
    d.on("mousedown.drag", p)
      .filter(r)
      .on("touchstart.drag", k)
      .on("touchmove.drag", U, Yr)
      .on("touchend.drag touchcancel.drag", A)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = I(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (v(d.view).on("mousemove.drag", m, et).on("mouseup.drag", _, et),
        Ur(d.view),
        Mt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function m(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function _(d) {
    v(d.view).on("mousemove.drag mouseup.drag", null),
      zr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function k(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        w = n.call(this, d, g),
        $ = y.length,
        R,
        z;
      for (R = 0; R < $; ++R)
        (z = I(this, w, d, g, y[R].identifier, y[R])) &&
          (Mt(d), z("start", d, y[R]));
    }
  }
  function U(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      $;
    for (w = 0; w < y; ++w)
      ($ = i[g[w].identifier]) && (K(d), $("drag", d, g[w]));
  }
  function A(d) {
    var g = d.changedTouches,
      y = g.length,
      w,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        w = 0;
      w < y;
      ++w
    )
      ($ = i[g[w].identifier]) && (Mt(d), $("end", d, g[w]));
  }
  function I(d, g, y, w, $, R) {
    var z = o.copy(),
      S = un(R || y, g),
      en,
      rn,
      ut;
    if (
      (ut = e.call(
        d,
        new Ht("beforestart", {
          sourceEvent: y,
          target: f,
          identifier: $,
          active: s,
          x: S[0],
          y: S[1],
          dx: 0,
          dy: 0,
          dispatch: z,
        }),
        w
      )) != null
    )
      return (
        (en = ut.x - S[0] || 0),
        (rn = ut.y - S[1] || 0),
        function oe(Tt, on, se) {
          var sn = S,
            Lt;
          switch (Tt) {
            case "start":
              (i[$] = oe), (Lt = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (S = un(se || on, g)), (Lt = s);
              break;
          }
          z.call(
            Tt,
            d,
            new Ht(Tt, {
              sourceEvent: on,
              subject: ut,
              target: f,
              identifier: $,
              active: Lt,
              x: S[0] + en,
              y: S[1] + rn,
              dx: S[0] - sn[0],
              dy: S[1] - sn[1],
              dispatch: z,
            }),
            w
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ft(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ft(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ft(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ft(!!d)), f)
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
function Qt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Xn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function at() {}
var rt = 0.7,
  Et = 1 / rt,
  W = "\\s*([+-]?\\d+)\\s*",
  it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  L = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  jr = /^#([0-9a-f]{3,8})$/,
  ti = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  ni = new RegExp(`^rgb\\(${L},${L},${L}\\)$`),
  ei = new RegExp(`^rgba\\(${W},${W},${W},${it}\\)$`),
  ri = new RegExp(`^rgba\\(${L},${L},${L},${it}\\)$`),
  ii = new RegExp(`^hsl\\(${it},${L},${L}\\)$`),
  oi = new RegExp(`^hsla\\(${it},${L},${L},${it}\\)$`),
  fn = {
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
Qt(at, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: hn,
  formatHex: hn,
  formatHex8: si,
  formatHsl: ci,
  formatRgb: dn,
  toString: dn,
});
function hn() {
  return this.rgb().formatHex();
}
function si() {
  return this.rgb().formatHex8();
}
function ci() {
  return qn(this).formatHsl();
}
function dn() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = jr.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? pn(n)
          : e === 3
          ? new x(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ht(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ht(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = ti.exec(t))
      ? new x(n[1], n[2], n[3], 1)
      : (n = ni.exec(t))
      ? new x((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = ei.exec(t))
      ? ht(n[1], n[2], n[3], n[4])
      : (n = ri.exec(t))
      ? ht((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = ii.exec(t))
      ? _n(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = oi.exec(t))
      ? _n(n[1], n[2] / 100, n[3] / 100, n[4])
      : fn.hasOwnProperty(t)
      ? pn(fn[t])
      : t === "transparent"
      ? new x(NaN, NaN, NaN, 0)
      : null
  );
}
function pn(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ht(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new x(t, n, e, r);
}
function ai(t) {
  return (
    t instanceof at || (t = ot(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function Xt(t, n, e, r) {
  return arguments.length === 1 ? ai(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Qt(
  x,
  Xt,
  Xn(at, {
    brighter(t) {
      return (
        (t = t == null ? Et : Math.pow(Et, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new x(V(this.r), V(this.g), V(this.b), $t(this.opacity));
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
    hex: gn,
    formatHex: gn,
    formatHex8: li,
    formatRgb: mn,
    toString: mn,
  })
);
function gn() {
  return `#${O(this.r)}${O(this.g)}${O(this.b)}`;
}
function li() {
  return `#${O(this.r)}${O(this.g)}${O(this.b)}${O(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function mn() {
  const t = $t(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${V(this.r)}, ${V(this.g)}, ${V(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function $t(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function V(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function O(t) {
  return (t = V(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function _n(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new N(t, n, e, r)
  );
}
function qn(t) {
  if (t instanceof N) return new N(t.h, t.s, t.l, t.opacity);
  if ((t instanceof at || (t = ot(t)), !t)) return new N();
  if (t instanceof N) return t;
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
    new N(s, c, a, t.opacity)
  );
}
function ui(t, n, e, r) {
  return arguments.length === 1 ? qn(t) : new N(t, n, e, r ?? 1);
}
function N(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Qt(
  N,
  ui,
  Xn(at, {
    brighter(t) {
      return (
        (t = t == null ? Et : Math.pow(Et, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new N(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new x(
        Dt(t >= 240 ? t - 240 : t + 120, i, r),
        Dt(t, i, r),
        Dt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new N(yn(this.h), dt(this.s), dt(this.l), $t(this.opacity));
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
      const t = $t(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${yn(this.h)}, ${
        dt(this.s) * 100
      }%, ${dt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function yn(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function dt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Dt(t, n, e) {
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
const Fn = (t) => () => t;
function fi(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function hi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function di(t) {
  return (t = +t) == 1
    ? On
    : function (n, e) {
        return e - n ? hi(n, e, t) : Fn(isNaN(n) ? e : n);
      };
}
function On(t, n) {
  var e = n - t;
  return e ? fi(t, e) : Fn(isNaN(t) ? n : t);
}
const wn = (function t(n) {
  var e = di(n);
  function r(i, o) {
    var s = e((i = Xt(i)).r, (o = Xt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = On(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function G(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Bt = new RegExp(qt.source, "g");
function pi(t) {
  return function () {
    return t;
  };
}
function gi(t) {
  return function (n) {
    return t(n) + "";
  };
}
function mi(t, n) {
  var e = (qt.lastIndex = Bt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = qt.exec(t)) && (i = Bt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: G(r, i) })),
      (e = Bt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? gi(a[0].x)
        : pi(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var vn = 180 / Math.PI,
  Ft = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Vn(t, n, e, r, i, o) {
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
var pt;
function _i(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Ft : Vn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function yi(t) {
  return t == null ||
    (pt || (pt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    pt.setAttribute("transform", t),
    !(t = pt.transform.baseVal.consolidate()))
    ? Ft
    : ((t = t.matrix), Vn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Yn(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push("translate(", null, n, null, e);
      m.push({ i: _ - 4, x: G(l, h) }, { i: _ - 2, x: G(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: G(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: G(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, m) {
    if (l !== h || u !== f) {
      var _ = p.push(i(p) + "scale(", null, ",", null, ")");
      m.push({ i: _ - 4, x: G(l, h) }, { i: _ - 2, x: G(u, f) });
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
        for (var m = -1, _ = f.length, k; ++m < _; ) h[(k = f[m]).i] = k.x(p);
        return h.join("");
      }
    );
  };
}
var wi = Yn(_i, "px, ", "px)", "deg)"),
  vi = Yn(yi, ", ", ")", ")"),
  Q = 0,
  j = 0,
  J = 0,
  Un = 1e3,
  Ct,
  tt,
  kt = 0,
  Y = 0,
  At = 0,
  st = typeof performance == "object" && performance.now ? performance : Date,
  zn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Jt() {
  return Y || (zn(xi), (Y = st.now() + At));
}
function xi() {
  Y = 0;
}
function Nt() {
  this._call = this._time = this._next = null;
}
Nt.prototype = Kn.prototype = {
  constructor: Nt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Jt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : (Ct = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      Ot();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), Ot());
  },
};
function Kn(t, n, e) {
  var r = new Nt();
  return r.restart(t, n, e), r;
}
function bi() {
  Jt(), ++Q;
  for (var t = Ct, n; t; )
    (n = Y - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function xn() {
  (Y = (kt = st.now()) + At), (Q = j = 0);
  try {
    bi();
  } finally {
    (Q = 0), $i(), (Y = 0);
  }
}
function Ei() {
  var t = st.now(),
    n = t - kt;
  n > Un && ((At -= n), (kt = t));
}
function $i() {
  for (var t, n = Ct, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Ct = e)));
  (tt = t), Ot(r);
}
function Ot(t) {
  if (!Q) {
    j && (j = clearTimeout(j));
    var n = t - Y;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout(xn, t - st.now() - At)),
        J && (J = clearInterval(J)))
      : (J || ((kt = st.now()), (J = setInterval(Ei, Un))), (Q = 1), zn(xn));
  }
}
function bn(t, n, e) {
  var r = new Nt();
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
var Ci = Kt("start", "end", "cancel", "interrupt"),
  ki = [],
  Wn = 0,
  En = 1,
  Vt = 2,
  vt = 3,
  $n = 4,
  Yt = 5,
  xt = 6;
function It(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  Ni(t, e, {
    name: n,
    index: r,
    group: i,
    on: Ci,
    tween: ki,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Wn,
  });
}
function jt(t, n) {
  var e = P(t, n);
  if (e.state > Wn) throw new Error("too late; already scheduled");
  return e;
}
function M(t, n) {
  var e = P(t, n);
  if (e.state > vt) throw new Error("too late; already running");
  return e;
}
function P(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function Ni(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Kn(o, 0, e.time));
  function o(l) {
    (e.state = En),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== En) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === vt) return bn(s);
        p.state === $n
          ? ((p.state = xt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = xt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (bn(function () {
        e.state === vt &&
          ((e.state = $n), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Vt),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Vt)
    ) {
      for (
        e.state = vt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Yt), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Yt && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = xt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function Pi(t, n) {
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
      (i = r.state > Vt && r.state < Yt),
        (r.state = xt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function Ai(t) {
  return this.each(function () {
    Pi(this, t);
  });
}
function Ii(t, n) {
  var e, r;
  return function () {
    var i = M(this, t),
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
function Si(t, n, e) {
  var r, i;
  if (typeof e != "function") throw new Error();
  return function () {
    var o = M(this, t),
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
function Ti(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = P(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ii : Si)(e, t, n));
}
function tn(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = M(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return P(i, r).value[n];
    }
  );
}
function Zn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? G
      : n instanceof ot
      ? wn
      : (e = ot(n))
      ? ((n = e), wn)
      : mi
  )(t, n);
}
function Li(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Mi(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Di(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Bi(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ri(t, n, e) {
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
function Gi(t, n, e) {
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
function Hi(t, n) {
  var e = Pt(t),
    r = e === "transform" ? vi : Zn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Gi : Ri)(e, r, tn(this, "attr." + t, n))
      : n == null
      ? (e.local ? Mi : Li)(e)
      : (e.local ? Bi : Di)(e, r, n)
  );
}
function Xi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function qi(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Fi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && qi(t, o)), e;
  }
  return (i._value = n), i;
}
function Oi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Xi(t, o)), e;
  }
  return (i._value = n), i;
}
function Vi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Pt(t);
  return this.tween(e, (r.local ? Fi : Oi)(r, n));
}
function Yi(t, n) {
  return function () {
    jt(this, t).delay = +n.apply(this, arguments);
  };
}
function Ui(t, n) {
  return (
    (n = +n),
    function () {
      jt(this, t).delay = n;
    }
  );
}
function zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Yi : Ui)(n, t))
    : P(this.node(), n).delay;
}
function Ki(t, n) {
  return function () {
    M(this, t).duration = +n.apply(this, arguments);
  };
}
function Wi(t, n) {
  return (
    (n = +n),
    function () {
      M(this, t).duration = n;
    }
  );
}
function Zi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Ki : Wi)(n, t))
    : P(this.node(), n).duration;
}
function Qi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    M(this, t).ease = n;
  };
}
function Ji(t) {
  var n = this._id;
  return arguments.length ? this.each(Qi(n, t)) : P(this.node(), n).ease;
}
function ji(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    M(this, t).ease = e;
  };
}
function to(t) {
  if (typeof t != "function") throw new Error();
  return this.each(ji(this._id, t));
}
function no(t) {
  typeof t != "function" && (t = In(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new B(r, this._parents, this._name, this._id);
}
function eo(t) {
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
  return new B(s, this._parents, this._name, this._id);
}
function ro(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function io(t, n, e) {
  var r,
    i,
    o = ro(n) ? jt : M;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function oo(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? P(this.node(), e).on.on(t)
    : this.each(io(e, t, n));
}
function so(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function co() {
  return this.on("end.remove", so(this._id));
}
function ao(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = Wt(t));
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
        It(l[f], n, e, f, l, P(u, e)));
  return new B(o, this._parents, n, e);
}
function lo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = An(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            m = P(u, e),
            _ = 0,
            k = f.length;
          _ < k;
          ++_
        )
          (p = f[_]) && It(p, n, e, _, f, m);
        o.push(f), s.push(u);
      }
  return new B(o, s, n, e);
}
var uo = ct.prototype.constructor;
function fo() {
  return new uo(this._groups, this._parents);
}
function ho(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Qn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function po(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function go(t, n, e) {
  var r, i, o;
  return function () {
    var s = Z(this, t),
      c = e(this),
      a = c + "";
    return (
      c == null && (a = c = (this.style.removeProperty(t), Z(this, t))),
      s === a ? null : s === r && a === i ? o : ((i = a), (o = n((r = s), c)))
    );
  };
}
function mo(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = M(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Qn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function _o(t, n, e) {
  var r = (t += "") == "transform" ? wi : Zn;
  return n == null
    ? this.styleTween(t, ho(t, r)).on("end.style." + t, Qn(t))
    : typeof n == "function"
    ? this.styleTween(t, go(t, r, tn(this, "style." + t, n))).each(
        mo(this._id, t)
      )
    : this.styleTween(t, po(t, r, n), e).on("end.style." + t, null);
}
function yo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function wo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && yo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function vo(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, wo(t, n, e ?? ""));
}
function xo(t) {
  return function () {
    this.textContent = t;
  };
}
function bo(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Eo(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? bo(tn(this, "text", t))
      : xo(t == null ? "" : t + "")
  );
}
function $o(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function Co(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && $o(i)), n;
  }
  return (r._value = t), r;
}
function ko(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Co(t));
}
function No() {
  for (
    var t = this._name,
      n = this._id,
      e = Jn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = P(a, n);
        It(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new B(r, this._parents, t, e);
}
function Po() {
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
      var l = M(this, r),
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
var Ao = 0;
function B(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Jn() {
  return ++Ao;
}
var D = ct.prototype;
B.prototype = {
  constructor: B,
  select: ao,
  selectAll: lo,
  selectChild: D.selectChild,
  selectChildren: D.selectChildren,
  filter: no,
  merge: eo,
  selection: fo,
  transition: No,
  call: D.call,
  nodes: D.nodes,
  node: D.node,
  size: D.size,
  empty: D.empty,
  each: D.each,
  on: oo,
  attr: Hi,
  attrTween: Vi,
  style: _o,
  styleTween: vo,
  text: Eo,
  textTween: ko,
  remove: co,
  tween: Ti,
  delay: zi,
  duration: Zi,
  ease: Ji,
  easeVarying: to,
  end: Po,
  [Symbol.iterator]: D[Symbol.iterator],
};
function Io(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var So = { time: null, delay: 0, duration: 250, ease: Io };
function To(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Lo(t) {
  var n, e;
  t instanceof B
    ? ((n = t._id), (t = t._name))
    : ((n = Jn()), ((e = So).time = Jt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && It(a, t, n, l, s, e || To(a, n));
  return new B(r, this._parents, t, n);
}
ct.prototype.interrupt = Ai;
ct.prototype.transition = Lo;
const Ut = Math.PI,
  zt = 2 * Ut,
  q = 1e-6,
  Mo = zt - q;
function jn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Do(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return jn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Bo {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? jn : Do(n));
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
    else if (f > q)
      if (!(Math.abs(h * a - l * u) > q) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          m = i - c,
          _ = a * a + l * l,
          k = p * p + m * m,
          U = Math.sqrt(_),
          A = Math.sqrt(f),
          I = o * Math.tan((Ut - Math.acos((_ + f - k) / (2 * U * A))) / 2),
          d = I / A,
          g = I / U;
        Math.abs(d - 1) > q && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * m)},${(this._x1 =
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
      : (Math.abs(this._x1 - l) > q || Math.abs(this._y1 - u) > q) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % zt) + zt),
        f > Mo
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > q &&
            this._append`A${r},${r},0,${+(f >= Ut)},${h},${(this._x1 =
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
function Ro(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function Go(t, n) {
  return fetch(t, n).then(Ro);
}
function Ho(t) {
  return (n, e) => Go(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Xo = Ho("application/xml");
function nt(t, n, e) {
  (this.k = t), (this.x = n), (this.y = e);
}
nt.prototype = {
  constructor: nt,
  scale: function (t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function (t, n) {
    return (t === 0) & (n === 0)
      ? this
      : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
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
nt.prototype;
class X {
  constructor(n, e, r, i, o, s, c) {
    cn(this, "dragged", (n) => {
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
    if (v("#" + this.id).node() != null) return;
    const n = await Xo(this.url);
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
      this.sensor.node().append(v(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Jr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    v(this).raise().classed("active", !0);
  }
  dragended(n) {
    v(this).classed("active", !1);
  }
}
const St = [
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
  qo = ["1kresistor_pin_1", "1kresistor_pin_2"],
  gt = { "1kresistor_pin_1": "Led cathode", "1kresistor_pin_2": "Led Anode" },
  Fo = ["res_pin1", "res_pin2"],
  mt = { res_pin1: "Resistor pin 1", res_pin2: "Resistor pin 2" },
  Oo = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  _t = {
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
  Vo = (t) => {
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
        if (St[r.connector] && T[r.connector].includes("GP19")) {
          e++;
          return;
        }
      }),
      console.log(e, "total"),
      e == 12
    );
  };
class Yo {
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
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : mt[this.connections[this.connections.length - 2].connector]
          ? mt[this.connections[this.connections.length - 2].connector]
          : _t[this.connections[this.connections.length - 2].connector]
          ? _t[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = T[this.connections[this.connections.length - 1].connector]
          ? `${
              T[this.connections[this.connections.length - 1].connector]
            } pin of Raspberry Pi`
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
          : mt[this.connections[this.connections.length - 1].connector]
          ? mt[this.connections[this.connections.length - 1].connector]
          : _t[this.connections[this.connections.length - 1].connector]
          ? _t[this.connections[this.connections.length - 1].connector]
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
class Uo {
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
    nn.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  b = v("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  zo = new X("raspberry", b, "images/pico.svg", 0.6, !1, 0, 0),
  Ko = new X("ultraSonicsensor", b, "images/sensor1.svg", 0.45, !1, 400, 0),
  Wo = new X("ledlight", b, "images/led.svg", 0.25, !1, 400, 100),
  Zo = new X("resistor220", b, "images/resistor.svg", 0.45, !1, 300, 200),
  Qo = new X("box", b, "images/box.svg", 0.6, !1, 800, 50),
  Jo = new X("bluetootth", b, "images/box1.svg", 0.6, !1, 800, 50),
  jo = new X("phone", b, "images/Group11.svg", 0.6, !1, 810, 50),
  ts = new X("bconnect", b, "images/start.svg", 0.6, !1, 800, 50),
  nn = b.append("g").attr("id", "pathsGroup"),
  te = document.getElementById("rasberryPi"),
  ne = document.getElementById("sensor"),
  ee = document.getElementById("led"),
  re = document.getElementById("resistor"),
  ie = document.getElementById("object"),
  ns = document.getElementById("displayInfo"),
  yt = document.getElementById("componentDescription"),
  es = document.getElementById("info"),
  rs = document.getElementById("list"),
  kn = (t) =>
    St.includes(t.srcElement.id) ||
    qo.includes(t.srcElement.id) ||
    Fo.includes(t.srcElement.id) ||
    Oo.includes(t.srcElement.id),
  H = new Yo("connectionLog"),
  Nn = new Uo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let C,
  F = 0,
  Rt = !1;
es.addEventListener("click", () => {
  (Rt = !Rt), (rs.style.display = Rt ? "block" : "none");
});
te.addEventListener("click", async () => await zo.load());
ne.addEventListener("click", () => Ko.load());
ee.addEventListener("click", () => {
  Wo.load();
  const t = document.getElementById("ledLight");
  t && (t.style.fill = "black");
});
re.addEventListener("click", () => Zo.load());
ie.addEventListener("click", async () => {
  await jo.load(), await Qo.load(), await Jo.load(), await ts.load();
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
const lt = (t, n) => {
    t.addEventListener("mouseover", () => {
      (yt.innerHTML = n), (yt.style.display = "block");
    }),
      t.addEventListener("mouseout", () => {
        (yt.style.display = "none"), (yt.innerHTML = "");
      });
  },
  is =
    "Raspberry Pi Pico: A microcontroller board for low-cost, high-performance projects. It powers and controls the circuit, with VBUS providing 5V to the HC-05, GP0 and GP1 handling Bluetooth communication, and GP19 driving the LED via the resistor.",
  os =
    "HC-05: A Bluetooth module for wireless communication with devices. It connects to the Raspberry Pi Pico via VCC to VBUS for power, TX to GP0 and RX to GP1 for data transfer, and GND to ground, enabling smartphone control of the LED.",
  ss =
    "Resistor: Limits current flow to protect the LED in the circuit. It connects between the LED’s positive terminal and GP19 on the Raspberry Pi Pico to regulate current, preventing damage to the LED.",
  cs =
    "LED: A light-emitting diode that lights up when powered. Its positive terminal connects to the resistor (linked to GP19) for current control, and its negative terminal connects to GND on the Raspberry Pi Pico. Shows light yellow when turned on initially, then supports multiple colors (blue, green, yellow, red) via different control buttons.",
  as =
    "Smartphone: Used to control the LED via Bluetooth connection. It pairs with the HC-05 module (connected to the Pico) to send commands, turning the LED on or off wirelessly after Bluetooth is enabled and the Raspberry Pi is selected.";
lt(te, is);
lt(ne, os);
lt(re, ss);
lt(ee, cs);
lt(ie, as);
const ls = document.querySelector("#undoButton");
ls.addEventListener("click", () => {
  H.undoLastConnection(), fs();
});
const us = (t) => {
    nn.selectAll(`path[id="${t}"]`)
      .nodes()
      .forEach((e) => e.remove());
  },
  fs = () => {
    if (C) {
      nn
        .selectAll(`path[id^="path${F}"]`)
        .nodes()
        .forEach((n) => n.remove()),
        (C = null),
        (F = 0),
        console.log("Removed all incomplete paths");
      return;
    }
    if (H.connections.length > 0) {
      const n = H.connections[H.connections.length - 1].lineID;
      us(n),
        H.connections.pop(),
        console.log(`Removed paths with line ID: ${n}`);
    } else console.warn("No more connections to undo");
  };
b.on("dblclick", (t) => {
  if (kn(t) && !C) {
    (C = new Bo()),
      C.moveTo(t.offsetX, t.offsetY),
      H.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      b.style("cursor", "crosshair"),
      console.log("path created 0");
    return;
  }
  if (t.srcElement.id === "svgContainer" && !St.includes(t.srcElement.id)) {
    C &&
      (C.lineTo(t.offsetX, t.offsetY),
      Cn(C.toString(), `path${F}`),
      console.log("path created"));
    return;
  }
  if (kn(t) && C) {
    C.lineTo(t.offsetX, t.offsetY),
      Cn(C.toString(), `path${F}`),
      H.addConnection({
        lineID: `path${F}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      F++,
      b.style("cursor", "default"),
      (C = null),
      console.log("path created 2");
    return;
  }
});
b.on("mouseover", (t) => {
  St.includes(t.srcElement.id) && (ns.innerHTML = T[t.srcElement.id]);
});
document.getElementById("codeSubmit").addEventListener("click", () => {
  const t = Vo(H.getConnectionLog());
  t === !0
    ? b.on("click", (n) => {
        const e = document.getElementById("ledLight");
        if (!e) {
          console.error("LED element not found");
          return;
        }
        switch ((v(e).interrupt(), n.target.id)) {
          case "ledon":
            v(e)
              .style("fill", "lightyellow")
              .style("animation", "blink 1s infinite");
            break;
          case "ledoff":
            v(e).style("fill", "black").style("animation", "none");
            break;
          case "greenlight":
            v(e).style("fill", "green").style("animation", "blink 1s infinite");
            break;
          case "yellowlight":
            v(e)
              .style("fill", "yellow")
              .style("animation", "blink 1s infinite");
            break;
          case "redlight":
            v(e).style("fill", "red").style("animation", "blink 1s infinite");
            break;
          case "bluelight":
            v(e).style("fill", "blue").style("animation", "blink 1s infinite");
            break;
        }
      })
    : t.error
    ? Nn.throw("Error", t.error)
    : Nn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
