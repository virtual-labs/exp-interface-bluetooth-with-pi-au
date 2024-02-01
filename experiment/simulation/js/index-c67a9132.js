var te = Object.defineProperty;
var ne = (t, n, e) =>
  n in t
    ? te(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (t[n] = e);
var on = (t, n, e) => (ne(t, typeof n != "symbol" ? n + "" : n, e), e);
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
var ee = { value: () => {} };
function Ut() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new mt(e);
}
function mt(t) {
  this._ = t;
}
function re(t, n) {
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
mt.prototype = Ut.prototype = {
  constructor: mt,
  on: function (t, n) {
    var e = this._,
      r = re(t + "", e),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = ie(e[i], t.name))) return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) e[i] = sn(e[i], t.name, n);
      else if (n == null) for (i in e) e[i] = sn(e[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      n = this._;
    for (var e in n) t[e] = n[e].slice();
    return new mt(t);
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
function ie(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n) return i.value;
}
function sn(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      (t[r] = ee), (t = t.slice(0, r).concat(t.slice(r + 1)));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Rt = "http://www.w3.org/1999/xhtml";
const cn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Rt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Ct(t) {
  var n = (t += ""),
    e = n.indexOf(":");
  return (
    e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)),
    cn.hasOwnProperty(n) ? { space: cn[n], local: t } : t
  );
}
function oe(t) {
  return function () {
    var n = this.ownerDocument,
      e = this.namespaceURI;
    return e === Rt && n.documentElement.namespaceURI === Rt
      ? n.createElement(t)
      : n.createElementNS(e, t);
  };
}
function se(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Cn(t) {
  var n = Ct(t);
  return (n.local ? se : oe)(n);
}
function ce() {}
function zt(t) {
  return t == null
    ? ce
    : function () {
        return this.querySelector(t);
      };
}
function ae(t) {
  typeof t != "function" && (t = zt(t));
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
function le(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ue() {
  return [];
}
function kn(t) {
  return t == null
    ? ue
    : function () {
        return this.querySelectorAll(t);
      };
}
function fe(t) {
  return function () {
    return le(t.apply(this, arguments));
  };
}
function he(t) {
  typeof t == "function" ? (t = fe(t)) : (t = kn(t));
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && (r.push(t.call(a, a.__data__, l, s)), i.push(a));
  return new E(r, i);
}
function An(t) {
  return function () {
    return this.matches(t);
  };
}
function In(t) {
  return function (n) {
    return n.matches(t);
  };
}
var de = Array.prototype.find;
function pe(t) {
  return function () {
    return de.call(this.children, t);
  };
}
function ge() {
  return this.firstElementChild;
}
function _e(t) {
  return this.select(t == null ? ge : pe(typeof t == "function" ? t : In(t)));
}
var me = Array.prototype.filter;
function ye() {
  return Array.from(this.children);
}
function ve(t) {
  return function () {
    return me.call(this.children, t);
  };
}
function we(t) {
  return this.selectAll(
    t == null ? ye : ve(typeof t == "function" ? t : In(t))
  );
}
function xe(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new E(r, this._parents);
}
function Pn(t) {
  return new Array(t.length);
}
function be() {
  return new E(this._enter || this._groups.map(Pn), this._parents);
}
function wt(t, n) {
  (this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = n);
}
wt.prototype = {
  constructor: wt,
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
function Ee(t) {
  return function () {
    return t;
  };
}
function $e(t, n, e, r, i, o) {
  for (var s = 0, c, a = n.length, l = o.length; s < l; ++s)
    (c = n[s]) ? ((c.__data__ = o[s]), (r[s] = c)) : (e[s] = new wt(t, o[s]));
  for (; s < a; ++s) (c = n[s]) && (i[s] = c);
}
function Ne(t, n, e, r, i, o, s) {
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
        : (e[c] = new wt(t, o[c]));
  for (c = 0; c < u; ++c) (a = n[c]) && l.get(f[c]) === a && (i[c] = a);
}
function Ce(t) {
  return t.__data__;
}
function ke(t, n) {
  if (!arguments.length) return Array.from(this, Ce);
  var e = n ? Ne : $e,
    r = this._parents,
    i = this._groups;
  typeof t != "function" && (t = Ee(t));
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
      p = Ae(t.call(u, u && u.__data__, l, r)),
      _ = p.length,
      m = (c[l] = new Array(_)),
      N = (s[l] = new Array(_)),
      U = (a[l] = new Array(f));
    e(u, h, m, N, U, p, n);
    for (var I = 0, P = 0, d, g; I < _; ++I)
      if ((d = m[I])) {
        for (I >= P && (P = I + 1); !(g = N[P]) && ++P < _; );
        d._next = g || null;
      }
  }
  return (s = new E(s, r)), (s._enter = c), (s._exit = a), s;
}
function Ae(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ie() {
  return new E(this._exit || this._groups.map(Pn), this._parents);
}
function Pe(t, n, e) {
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
function Se(t) {
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
      var l = e[a], u = r[a], h = l.length, f = (c[a] = new Array(h)), p, _ = 0;
      _ < h;
      ++_
    )
      (p = l[_] || u[_]) && (f[_] = p);
  for (; a < i; ++a) c[a] = e[a];
  return new E(c, this._parents);
}
function Te() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function Me(t) {
  t || (t = Le);
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
function Le(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function Be() {
  var t = arguments[0];
  return (arguments[0] = this), t.apply(null, arguments), this;
}
function Re() {
  return Array.from(this);
}
function Ge() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function De() {
  let t = 0;
  for (const n of this) ++t;
  return t;
}
function Xe() {
  return !this.node();
}
function He(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, c; o < s; ++o)
      (c = i[o]) && t.call(c, c.__data__, o, i);
  return this;
}
function qe(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Fe(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Oe(t, n) {
  return function () {
    this.setAttribute(t, n);
  };
}
function Ye(t, n) {
  return function () {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ve(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ue(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, e);
  };
}
function ze(t, n) {
  var e = Ct(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each(
    (n == null
      ? e.local
        ? Fe
        : qe
      : typeof n == "function"
      ? e.local
        ? Ue
        : Ve
      : e.local
      ? Ye
      : Oe)(e, n)
  );
}
function Sn(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function Ke(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function We(t, n, e) {
  return function () {
    this.style.setProperty(t, n, e);
  };
}
function Ze(t, n, e) {
  return function () {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Qe(t, n, e) {
  return arguments.length > 1
    ? this.each(
        (n == null ? Ke : typeof n == "function" ? Ze : We)(t, n, e ?? "")
      )
    : Z(this.node(), t);
}
function Z(t, n) {
  return (
    t.style.getPropertyValue(n) ||
    Sn(t).getComputedStyle(t, null).getPropertyValue(n)
  );
}
function Je(t) {
  return function () {
    delete this[t];
  };
}
function je(t, n) {
  return function () {
    this[t] = n;
  };
}
function tr(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : (this[t] = e);
  };
}
function nr(t, n) {
  return arguments.length > 1
    ? this.each((n == null ? Je : typeof n == "function" ? tr : je)(t, n))
    : this.node()[t];
}
function Tn(t) {
  return t.trim().split(/^|\s+/);
}
function Kt(t) {
  return t.classList || new Mn(t);
}
function Mn(t) {
  (this._node = t), (this._names = Tn(t.getAttribute("class") || ""));
}
Mn.prototype = {
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
function Ln(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
}
function Bn(t, n) {
  for (var e = Kt(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
}
function er(t) {
  return function () {
    Ln(this, t);
  };
}
function rr(t) {
  return function () {
    Bn(this, t);
  };
}
function ir(t, n) {
  return function () {
    (n.apply(this, arguments) ? Ln : Bn)(this, t);
  };
}
function or(t, n) {
  var e = Tn(t + "");
  if (arguments.length < 2) {
    for (var r = Kt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i])) return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? ir : n ? er : rr)(e, n));
}
function sr() {
  this.textContent = "";
}
function cr(t) {
  return function () {
    this.textContent = t;
  };
}
function ar(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function lr(t) {
  return arguments.length
    ? this.each(t == null ? sr : (typeof t == "function" ? ar : cr)(t))
    : this.node().textContent;
}
function ur() {
  this.innerHTML = "";
}
function fr(t) {
  return function () {
    this.innerHTML = t;
  };
}
function hr(t) {
  return function () {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function dr(t) {
  return arguments.length
    ? this.each(t == null ? ur : (typeof t == "function" ? hr : fr)(t))
    : this.node().innerHTML;
}
function pr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function gr() {
  return this.each(pr);
}
function _r() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function mr() {
  return this.each(_r);
}
function yr(t) {
  var n = typeof t == "function" ? t : Cn(t);
  return this.select(function () {
    return this.appendChild(n.apply(this, arguments));
  });
}
function vr() {
  return null;
}
function wr(t, n) {
  var e = typeof t == "function" ? t : Cn(t),
    r = n == null ? vr : typeof n == "function" ? n : zt(n);
  return this.select(function () {
    return this.insertBefore(
      e.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function xr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function br() {
  return this.each(xr);
}
function Er() {
  var t = this.cloneNode(!1),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function $r() {
  var t = this.cloneNode(!0),
    n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Nr(t) {
  return this.select(t ? $r : Er);
}
function Cr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function kr(t) {
  return function (n) {
    t.call(this, n, this.__data__);
  };
}
function Ar(t) {
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
function Ir(t) {
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
function Pr(t, n, e) {
  return function () {
    var r = this.__on,
      i,
      o = kr(n);
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
function Sr(t, n, e) {
  var r = Ar(t + ""),
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
  for (c = n ? Pr : Ir, i = 0; i < o; ++i) this.each(c(r[i], n, e));
  return this;
}
function Rn(t, n, e) {
  var r = Sn(t),
    i = r.CustomEvent;
  typeof i == "function"
    ? (i = new i(n, e))
    : ((i = r.document.createEvent("Event")),
      e
        ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
        : i.initEvent(n, !1, !1)),
    t.dispatchEvent(i);
}
function Tr(t, n) {
  return function () {
    return Rn(this, t, n);
  };
}
function Mr(t, n) {
  return function () {
    return Rn(this, t, n.apply(this, arguments));
  };
}
function Lr(t, n) {
  return this.each((typeof n == "function" ? Mr : Tr)(t, n));
}
function* Br() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Gn = [null];
function E(t, n) {
  (this._groups = t), (this._parents = n);
}
function ct() {
  return new E([[document.documentElement]], Gn);
}
function Rr() {
  return this;
}
E.prototype = ct.prototype = {
  constructor: E,
  select: ae,
  selectAll: he,
  selectChild: _e,
  selectChildren: we,
  filter: xe,
  data: ke,
  enter: be,
  exit: Ie,
  join: Pe,
  merge: Se,
  selection: Rr,
  order: Te,
  sort: Me,
  call: Be,
  nodes: Re,
  node: Ge,
  size: De,
  empty: Xe,
  each: He,
  attr: ze,
  style: Qe,
  property: nr,
  classed: or,
  text: lr,
  html: dr,
  raise: gr,
  lower: mr,
  append: yr,
  insert: wr,
  remove: br,
  clone: Nr,
  datum: Cr,
  on: Sr,
  dispatch: Lr,
  [Symbol.iterator]: Br,
};
function G(t) {
  return typeof t == "string"
    ? new E([[document.querySelector(t)]], [document.documentElement])
    : new E([[t]], Gn);
}
function Gr(t) {
  let n;
  for (; (n = t.sourceEvent); ) t = n;
  return t;
}
function an(t, n) {
  if (((t = Gr(t)), n === void 0 && (n = t.currentTarget), n)) {
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
const Dr = { passive: !1 },
  et = { capture: !0, passive: !1 };
function Tt(t) {
  t.stopImmediatePropagation();
}
function K(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Xr(t) {
  var n = t.document.documentElement,
    e = G(t).on("dragstart.drag", K, et);
  "onselectstart" in n
    ? e.on("selectstart.drag", K, et)
    : ((n.__noselect = n.style.MozUserSelect),
      (n.style.MozUserSelect = "none"));
}
function Hr(t, n) {
  var e = t.document.documentElement,
    r = G(t).on("dragstart.drag", null);
  n &&
    (r.on("click.drag", K, et),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in e
      ? r.on("selectstart.drag", null)
      : ((e.style.MozUserSelect = e.__noselect), delete e.__noselect);
}
const ut = (t) => () => t;
function Gt(
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
Gt.prototype.on = function () {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function qr(t) {
  return !t.ctrlKey && !t.button;
}
function Fr() {
  return this.parentNode;
}
function Or(t, n) {
  return n ?? { x: t.x, y: t.y };
}
function Yr() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Vr() {
  var t = qr,
    n = Fr,
    e = Or,
    r = Yr,
    i = {},
    o = Ut("start", "drag", "end"),
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
      .on("touchmove.drag", U, Dr)
      .on("touchend.drag touchcancel.drag", I)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(d, g) {
    if (!(u || !t.call(this, d, g))) {
      var y = P(this, n.call(this, d, g), d, g, "mouse");
      y &&
        (G(d.view).on("mousemove.drag", _, et).on("mouseup.drag", m, et),
        Xr(d.view),
        Tt(d),
        (l = !1),
        (c = d.clientX),
        (a = d.clientY),
        y("start", d));
    }
  }
  function _(d) {
    if ((K(d), !l)) {
      var g = d.clientX - c,
        y = d.clientY - a;
      l = g * g + y * y > h;
    }
    i.mouse("drag", d);
  }
  function m(d) {
    G(d.view).on("mousemove.drag mouseup.drag", null),
      Hr(d.view, l),
      K(d),
      i.mouse("end", d);
  }
  function N(d, g) {
    if (t.call(this, d, g)) {
      var y = d.changedTouches,
        v = n.call(this, d, g),
        $ = y.length,
        X,
        z;
      for (X = 0; X < $; ++X)
        (z = P(this, v, d, g, y[X].identifier, y[X])) &&
          (Tt(d), z("start", d, y[X]));
    }
  }
  function U(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      $;
    for (v = 0; v < y; ++v)
      ($ = i[g[v].identifier]) && (K(d), $("drag", d, g[v]));
  }
  function I(d) {
    var g = d.changedTouches,
      y = g.length,
      v,
      $;
    for (
      u && clearTimeout(u),
        u = setTimeout(function () {
          u = null;
        }, 500),
        v = 0;
      v < y;
      ++v
    )
      ($ = i[g[v].identifier]) && (Tt(d), $("end", d, g[v]));
  }
  function P(d, g, y, v, $, X) {
    var z = o.copy(),
      S = an(X || y, g),
      tn,
      nn,
      lt;
    if (
      (lt = e.call(
        d,
        new Gt("beforestart", {
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
        v
      )) != null
    )
      return (
        (tn = lt.x - S[0] || 0),
        (nn = lt.y - S[1] || 0),
        function Jn(Pt, en, jn) {
          var rn = S,
            St;
          switch (Pt) {
            case "start":
              (i[$] = Jn), (St = s++);
              break;
            case "end":
              delete i[$], --s;
            case "drag":
              (S = an(jn || en, g)), (St = s);
              break;
          }
          z.call(
            Pt,
            d,
            new Gt(Pt, {
              sourceEvent: en,
              subject: lt,
              target: f,
              identifier: $,
              active: St,
              x: S[0] + tn,
              y: S[1] + nn,
              dx: S[0] - rn[0],
              dy: S[1] - rn[1],
              dispatch: z,
            }),
            v
          );
        }
      );
  }
  return (
    (f.filter = function (d) {
      return arguments.length
        ? ((t = typeof d == "function" ? d : ut(!!d)), f)
        : t;
    }),
    (f.container = function (d) {
      return arguments.length
        ? ((n = typeof d == "function" ? d : ut(d)), f)
        : n;
    }),
    (f.subject = function (d) {
      return arguments.length
        ? ((e = typeof d == "function" ? d : ut(d)), f)
        : e;
    }),
    (f.touchable = function (d) {
      return arguments.length
        ? ((r = typeof d == "function" ? d : ut(!!d)), f)
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
function Wt(t, n, e) {
  (t.prototype = n.prototype = e), (e.constructor = t);
}
function Dn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n) e[r] = n[r];
  return e;
}
function at() {}
var rt = 0.7,
  xt = 1 / rt,
  W = "\\s*([+-]?\\d+)\\s*",
  it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  L = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  Ur = /^#([0-9a-f]{3,8})$/,
  zr = new RegExp(`^rgb\\(${W},${W},${W}\\)$`),
  Kr = new RegExp(`^rgb\\(${L},${L},${L}\\)$`),
  Wr = new RegExp(`^rgba\\(${W},${W},${W},${it}\\)$`),
  Zr = new RegExp(`^rgba\\(${L},${L},${L},${it}\\)$`),
  Qr = new RegExp(`^hsl\\(${it},${L},${L}\\)$`),
  Jr = new RegExp(`^hsla\\(${it},${L},${L},${it}\\)$`),
  ln = {
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
Wt(at, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: un,
  formatHex: un,
  formatHex8: jr,
  formatHsl: ti,
  formatRgb: fn,
  toString: fn,
});
function un() {
  return this.rgb().formatHex();
}
function jr() {
  return this.rgb().formatHex8();
}
function ti() {
  return Xn(this).formatHsl();
}
function fn() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return (
    (t = (t + "").trim().toLowerCase()),
    (n = Ur.exec(t))
      ? ((e = n[1].length),
        (n = parseInt(n[1], 16)),
        e === 6
          ? hn(n)
          : e === 3
          ? new x(
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              ((n & 15) << 4) | (n & 15),
              1
            )
          : e === 8
          ? ft(
              (n >> 24) & 255,
              (n >> 16) & 255,
              (n >> 8) & 255,
              (n & 255) / 255
            )
          : e === 4
          ? ft(
              ((n >> 12) & 15) | ((n >> 8) & 240),
              ((n >> 8) & 15) | ((n >> 4) & 240),
              ((n >> 4) & 15) | (n & 240),
              (((n & 15) << 4) | (n & 15)) / 255
            )
          : null)
      : (n = zr.exec(t))
      ? new x(n[1], n[2], n[3], 1)
      : (n = Kr.exec(t))
      ? new x((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, 1)
      : (n = Wr.exec(t))
      ? ft(n[1], n[2], n[3], n[4])
      : (n = Zr.exec(t))
      ? ft((n[1] * 255) / 100, (n[2] * 255) / 100, (n[3] * 255) / 100, n[4])
      : (n = Qr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, 1)
      : (n = Jr.exec(t))
      ? gn(n[1], n[2] / 100, n[3] / 100, n[4])
      : ln.hasOwnProperty(t)
      ? hn(ln[t])
      : t === "transparent"
      ? new x(NaN, NaN, NaN, 0)
      : null
  );
}
function hn(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new x(t, n, e, r);
}
function ni(t) {
  return (
    t instanceof at || (t = ot(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function Dt(t, n, e, r) {
  return arguments.length === 1 ? ni(t) : new x(t, n, e, r ?? 1);
}
function x(t, n, e, r) {
  (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
}
Wt(
  x,
  Dt,
  Dn(at, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
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
      return new x(Y(this.r), Y(this.g), Y(this.b), bt(this.opacity));
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
    hex: dn,
    formatHex: dn,
    formatHex8: ei,
    formatRgb: pn,
    toString: pn,
  })
);
function dn() {
  return `#${O(this.r)}${O(this.g)}${O(this.b)}`;
}
function ei() {
  return `#${O(this.r)}${O(this.g)}${O(this.b)}${O(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function pn() {
  const t = bt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Y(this.r)}, ${Y(this.g)}, ${Y(
    this.b
  )}${t === 1 ? ")" : `, ${t})`}`;
}
function bt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Y(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function O(t) {
  return (t = Y(t)), (t < 16 ? "0" : "") + t.toString(16);
}
function gn(t, n, e, r) {
  return (
    r <= 0
      ? (t = n = e = NaN)
      : e <= 0 || e >= 1
      ? (t = n = NaN)
      : n <= 0 && (t = NaN),
    new C(t, n, e, r)
  );
}
function Xn(t) {
  if (t instanceof C) return new C(t.h, t.s, t.l, t.opacity);
  if ((t instanceof at || (t = ot(t)), !t)) return new C();
  if (t instanceof C) return t;
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
    new C(s, c, a, t.opacity)
  );
}
function ri(t, n, e, r) {
  return arguments.length === 1 ? Xn(t) : new C(t, n, e, r ?? 1);
}
function C(t, n, e, r) {
  (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
}
Wt(
  C,
  ri,
  Dn(at, {
    brighter(t) {
      return (
        (t = t == null ? xt : Math.pow(xt, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? rt : Math.pow(rt, t)),
        new C(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        e = this.l,
        r = e + (e < 0.5 ? e : 1 - e) * n,
        i = 2 * e - r;
      return new x(
        Mt(t >= 240 ? t - 240 : t + 120, i, r),
        Mt(t, i, r),
        Mt(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new C(_n(this.h), ht(this.s), ht(this.l), bt(this.opacity));
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
      const t = bt(this.opacity);
      return `${t === 1 ? "hsl(" : "hsla("}${_n(this.h)}, ${
        ht(this.s) * 100
      }%, ${ht(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
    },
  })
);
function _n(t) {
  return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function ht(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Mt(t, n, e) {
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
const Hn = (t) => () => t;
function ii(t, n) {
  return function (e) {
    return t + e * n;
  };
}
function oi(t, n, e) {
  return (
    (t = Math.pow(t, e)),
    (n = Math.pow(n, e) - t),
    (e = 1 / e),
    function (r) {
      return Math.pow(t + r * n, e);
    }
  );
}
function si(t) {
  return (t = +t) == 1
    ? qn
    : function (n, e) {
        return e - n ? oi(n, e, t) : Hn(isNaN(n) ? e : n);
      };
}
function qn(t, n) {
  var e = n - t;
  return e ? ii(t, e) : Hn(isNaN(t) ? n : t);
}
const mn = (function t(n) {
  var e = si(n);
  function r(i, o) {
    var s = e((i = Dt(i)).r, (o = Dt(o)).r),
      c = e(i.g, o.g),
      a = e(i.b, o.b),
      l = qn(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)), (i.g = c(u)), (i.b = a(u)), (i.opacity = l(u)), i + ""
      );
    };
  }
  return (r.gamma = t), r;
})(1);
function H(t, n) {
  return (
    (t = +t),
    (n = +n),
    function (e) {
      return t * (1 - e) + n * e;
    }
  );
}
var Xt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Lt = new RegExp(Xt.source, "g");
function ci(t) {
  return function () {
    return t;
  };
}
function ai(t) {
  return function (n) {
    return t(n) + "";
  };
}
function li(t, n) {
  var e = (Xt.lastIndex = Lt.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    c = [],
    a = [];
  for (t = t + "", n = n + ""; (r = Xt.exec(t)) && (i = Lt.exec(n)); )
    (o = i.index) > e &&
      ((o = n.slice(e, o)), c[s] ? (c[s] += o) : (c[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? c[s]
          ? (c[s] += i)
          : (c[++s] = i)
        : ((c[++s] = null), a.push({ i: s, x: H(r, i) })),
      (e = Lt.lastIndex);
  return (
    e < n.length && ((o = n.slice(e)), c[s] ? (c[s] += o) : (c[++s] = o)),
    c.length < 2
      ? a[0]
        ? ai(a[0].x)
        : ci(n)
      : ((n = a.length),
        function (l) {
          for (var u = 0, h; u < n; ++u) c[(h = a[u]).i] = h.x(l);
          return c.join("");
        })
  );
}
var yn = 180 / Math.PI,
  Ht = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function Fn(t, n, e, r, i, o) {
  var s, c, a;
  return (
    (s = Math.sqrt(t * t + n * n)) && ((t /= s), (n /= s)),
    (a = t * e + n * r) && ((e -= t * a), (r -= n * a)),
    (c = Math.sqrt(e * e + r * r)) && ((e /= c), (r /= c), (a /= c)),
    t * r < n * e && ((t = -t), (n = -n), (a = -a), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(n, t) * yn,
      skewX: Math.atan(a) * yn,
      scaleX: s,
      scaleY: c,
    }
  );
}
var dt;
function ui(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    t + ""
  );
  return n.isIdentity ? Ht : Fn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function fi(t) {
  return t == null ||
    (dt || (dt = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    dt.setAttribute("transform", t),
    !(t = dt.transform.baseVal.consolidate()))
    ? Ht
    : ((t = t.matrix), Fn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function On(t, n, e, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push("translate(", null, n, null, e);
      _.push({ i: m - 4, x: H(l, h) }, { i: m - 2, x: H(u, f) });
    } else (h || f) && p.push("translate(" + h + n + f + e);
  }
  function s(l, u, h, f) {
    l !== u
      ? (l - u > 180 ? (u += 360) : u - l > 180 && (l += 360),
        f.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: H(l, u) }))
      : u && h.push(i(h) + "rotate(" + u + r);
  }
  function c(l, u, h, f) {
    l !== u
      ? f.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: H(l, u) })
      : u && h.push(i(h) + "skewX(" + u + r);
  }
  function a(l, u, h, f, p, _) {
    if (l !== h || u !== f) {
      var m = p.push(i(p) + "scale(", null, ",", null, ")");
      _.push({ i: m - 4, x: H(l, h) }, { i: m - 2, x: H(u, f) });
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
        for (var _ = -1, m = f.length, N; ++_ < m; ) h[(N = f[_]).i] = N.x(p);
        return h.join("");
      }
    );
  };
}
var hi = On(ui, "px, ", "px)", "deg)"),
  di = On(fi, ", ", ")", ")"),
  Q = 0,
  j = 0,
  J = 0,
  Yn = 1e3,
  Et,
  tt,
  $t = 0,
  V = 0,
  kt = 0,
  st = typeof performance == "object" && performance.now ? performance : Date,
  Vn =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function Zt() {
  return V || (Vn(pi), (V = st.now() + kt));
}
function pi() {
  V = 0;
}
function Nt() {
  this._call = this._time = this._next = null;
}
Nt.prototype = Un.prototype = {
  constructor: Nt,
  restart: function (t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    (e = (e == null ? Zt() : +e) + (n == null ? 0 : +n)),
      !this._next &&
        tt !== this &&
        (tt ? (tt._next = this) : (Et = this), (tt = this)),
      (this._call = t),
      (this._time = e),
      qt();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), qt());
  },
};
function Un(t, n, e) {
  var r = new Nt();
  return r.restart(t, n, e), r;
}
function gi() {
  Zt(), ++Q;
  for (var t = Et, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), (t = t._next);
  --Q;
}
function vn() {
  (V = ($t = st.now()) + kt), (Q = j = 0);
  try {
    gi();
  } finally {
    (Q = 0), mi(), (V = 0);
  }
}
function _i() {
  var t = st.now(),
    n = t - $t;
  n > Yn && ((kt -= n), ($t = t));
}
function mi() {
  for (var t, n = Et, e, r = 1 / 0; n; )
    n._call
      ? (r > n._time && (r = n._time), (t = n), (n = n._next))
      : ((e = n._next), (n._next = null), (n = t ? (t._next = e) : (Et = e)));
  (tt = t), qt(r);
}
function qt(t) {
  if (!Q) {
    j && (j = clearTimeout(j));
    var n = t - V;
    n > 24
      ? (t < 1 / 0 && (j = setTimeout(vn, t - st.now() - kt)),
        J && (J = clearInterval(J)))
      : (J || (($t = st.now()), (J = setInterval(_i, Yn))), (Q = 1), Vn(vn));
  }
}
function wn(t, n, e) {
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
var yi = Ut("start", "end", "cancel", "interrupt"),
  vi = [],
  zn = 0,
  xn = 1,
  Ft = 2,
  yt = 3,
  bn = 4,
  Ot = 5,
  vt = 6;
function At(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (e in s) return;
  wi(t, e, {
    name: n,
    index: r,
    group: i,
    on: yi,
    tween: vi,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: zn,
  });
}
function Qt(t, n) {
  var e = A(t, n);
  if (e.state > zn) throw new Error("too late; already scheduled");
  return e;
}
function B(t, n) {
  var e = A(t, n);
  if (e.state > yt) throw new Error("too late; already running");
  return e;
}
function A(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n])) throw new Error("transition not found");
  return e;
}
function wi(t, n, e) {
  var r = t.__transition,
    i;
  (r[n] = e), (e.timer = Un(o, 0, e.time));
  function o(l) {
    (e.state = xn),
      e.timer.restart(s, e.delay, e.time),
      e.delay <= l && s(l - e.delay);
  }
  function s(l) {
    var u, h, f, p;
    if (e.state !== xn) return a();
    for (u in r)
      if (((p = r[u]), p.name === e.name)) {
        if (p.state === yt) return wn(s);
        p.state === bn
          ? ((p.state = vt),
            p.timer.stop(),
            p.on.call("interrupt", t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < n &&
            ((p.state = vt),
            p.timer.stop(),
            p.on.call("cancel", t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (wn(function () {
        e.state === yt &&
          ((e.state = bn), e.timer.restart(c, e.delay, e.time), c(l));
      }),
      (e.state = Ft),
      e.on.call("start", t, t.__data__, e.index, e.group),
      e.state === Ft)
    ) {
      for (
        e.state = yt, i = new Array((f = e.tween.length)), u = 0, h = -1;
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
            : (e.timer.restart(a), (e.state = Ot), 1),
        h = -1,
        f = i.length;
      ++h < f;

    )
      i[h].call(t, u);
    e.state === Ot && (e.on.call("end", t, t.__data__, e.index, e.group), a());
  }
  function a() {
    (e.state = vt), e.timer.stop(), delete r[n];
    for (var l in r) return;
    delete t.__transition;
  }
}
function xi(t, n) {
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
      (i = r.state > Ft && r.state < Ot),
        (r.state = vt),
        r.timer.stop(),
        r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group),
        delete e[s];
    }
    o && delete t.__transition;
  }
}
function bi(t) {
  return this.each(function () {
    xi(this, t);
  });
}
function Ei(t, n) {
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
function $i(t, n, e) {
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
function Ni(t, n) {
  var e = this._id;
  if (((t += ""), arguments.length < 2)) {
    for (var r = A(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((n == null ? Ei : $i)(e, t, n));
}
function Jt(t, n, e) {
  var r = t._id;
  return (
    t.each(function () {
      var i = B(this, r);
      (i.value || (i.value = {}))[n] = e.apply(this, arguments);
    }),
    function (i) {
      return A(i, r).value[n];
    }
  );
}
function Kn(t, n) {
  var e;
  return (
    typeof n == "number"
      ? H
      : n instanceof ot
      ? mn
      : (e = ot(n))
      ? ((n = e), mn)
      : li
  )(t, n);
}
function Ci(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function ki(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ai(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Ii(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function Pi(t, n, e) {
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
function Si(t, n, e) {
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
function Ti(t, n) {
  var e = Ct(t),
    r = e === "transform" ? di : Kn;
  return this.attrTween(
    t,
    typeof n == "function"
      ? (e.local ? Si : Pi)(e, r, Jt(this, "attr." + t, n))
      : n == null
      ? (e.local ? ki : Ci)(e)
      : (e.local ? Ii : Ai)(e, r, n)
  );
}
function Mi(t, n) {
  return function (e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function Li(t, n) {
  return function (e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function Bi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Li(t, o)), e;
  }
  return (i._value = n), i;
}
function Ri(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && Mi(t, o)), e;
  }
  return (i._value = n), i;
}
function Gi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2) return (e = this.tween(e)) && e._value;
  if (n == null) return this.tween(e, null);
  if (typeof n != "function") throw new Error();
  var r = Ct(t);
  return this.tween(e, (r.local ? Bi : Ri)(r, n));
}
function Di(t, n) {
  return function () {
    Qt(this, t).delay = +n.apply(this, arguments);
  };
}
function Xi(t, n) {
  return (
    (n = +n),
    function () {
      Qt(this, t).delay = n;
    }
  );
}
function Hi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? Di : Xi)(n, t))
    : A(this.node(), n).delay;
}
function qi(t, n) {
  return function () {
    B(this, t).duration = +n.apply(this, arguments);
  };
}
function Fi(t, n) {
  return (
    (n = +n),
    function () {
      B(this, t).duration = n;
    }
  );
}
function Oi(t) {
  var n = this._id;
  return arguments.length
    ? this.each((typeof t == "function" ? qi : Fi)(n, t))
    : A(this.node(), n).duration;
}
function Yi(t, n) {
  if (typeof n != "function") throw new Error();
  return function () {
    B(this, t).ease = n;
  };
}
function Vi(t) {
  var n = this._id;
  return arguments.length ? this.each(Yi(n, t)) : A(this.node(), n).ease;
}
function Ui(t, n) {
  return function () {
    var e = n.apply(this, arguments);
    if (typeof e != "function") throw new Error();
    B(this, t).ease = e;
  };
}
function zi(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Ui(this._id, t));
}
function Ki(t) {
  typeof t != "function" && (t = An(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, c = (r[i] = []), a, l = 0; l < s; ++l)
      (a = o[l]) && t.call(a, a.__data__, l, o) && c.push(a);
  return new D(r, this._parents, this._name, this._id);
}
function Wi(t) {
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
  return new D(s, this._parents, this._name, this._id);
}
function Zi(t) {
  return (t + "")
    .trim()
    .split(/^|\s+/)
    .every(function (n) {
      var e = n.indexOf(".");
      return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
    });
}
function Qi(t, n, e) {
  var r,
    i,
    o = Zi(n) ? Qt : B;
  return function () {
    var s = o(this, t),
      c = s.on;
    c !== r && (i = (r = c).copy()).on(n, e), (s.on = i);
  };
}
function Ji(t, n) {
  var e = this._id;
  return arguments.length < 2
    ? A(this.node(), e).on.on(t)
    : this.each(Qi(e, t, n));
}
function ji(t) {
  return function () {
    var n = this.parentNode;
    for (var e in this.__transition) if (+e !== t) return;
    n && n.removeChild(this);
  };
}
function to() {
  return this.on("end.remove", ji(this._id));
}
function no(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = zt(t));
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
        At(l[f], n, e, f, l, A(u, e)));
  return new D(o, this._parents, n, e);
}
function eo(t) {
  var n = this._name,
    e = this._id;
  typeof t != "function" && (t = kn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], c = 0; c < i; ++c)
    for (var a = r[c], l = a.length, u, h = 0; h < l; ++h)
      if ((u = a[h])) {
        for (
          var f = t.call(u, u.__data__, h, a),
            p,
            _ = A(u, e),
            m = 0,
            N = f.length;
          m < N;
          ++m
        )
          (p = f[m]) && At(p, n, e, m, f, _);
        o.push(f), s.push(u);
      }
  return new D(o, s, n, e);
}
var ro = ct.prototype.constructor;
function io() {
  return new ro(this._groups, this._parents);
}
function oo(t, n) {
  var e, r, i;
  return function () {
    var o = Z(this, t),
      s = (this.style.removeProperty(t), Z(this, t));
    return o === s ? null : o === e && s === r ? i : (i = n((e = o), (r = s)));
  };
}
function Wn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function so(t, n, e) {
  var r,
    i = e + "",
    o;
  return function () {
    var s = Z(this, t);
    return s === i ? null : s === r ? o : (o = n((r = s), e));
  };
}
function co(t, n, e) {
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
function ao(t, n) {
  var e,
    r,
    i,
    o = "style." + n,
    s = "end." + o,
    c;
  return function () {
    var a = B(this, t),
      l = a.on,
      u = a.value[o] == null ? c || (c = Wn(n)) : void 0;
    (l !== e || i !== u) && (r = (e = l).copy()).on(s, (i = u)), (a.on = r);
  };
}
function lo(t, n, e) {
  var r = (t += "") == "transform" ? hi : Kn;
  return n == null
    ? this.styleTween(t, oo(t, r)).on("end.style." + t, Wn(t))
    : typeof n == "function"
    ? this.styleTween(t, co(t, r, Jt(this, "style." + t, n))).each(
        ao(this._id, t)
      )
    : this.styleTween(t, so(t, r, n), e).on("end.style." + t, null);
}
function uo(t, n, e) {
  return function (r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function fo(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && uo(t, s, e)), r;
  }
  return (o._value = n), o;
}
function ho(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (n == null) return this.tween(r, null);
  if (typeof n != "function") throw new Error();
  return this.tween(r, fo(t, n, e ?? ""));
}
function po(t) {
  return function () {
    this.textContent = t;
  };
}
function go(t) {
  return function () {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function _o(t) {
  return this.tween(
    "text",
    typeof t == "function"
      ? go(Jt(this, "text", t))
      : po(t == null ? "" : t + "")
  );
}
function mo(t) {
  return function (n) {
    this.textContent = t.call(this, n);
  };
}
function yo(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && mo(i)), n;
  }
  return (r._value = t), r;
}
function vo(t) {
  var n = "text";
  if (arguments.length < 1) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, yo(t));
}
function wo() {
  for (
    var t = this._name,
      n = this._id,
      e = Zn(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      if ((a = s[l])) {
        var u = A(a, n);
        At(a, t, e, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new D(r, this._parents, t, e);
}
function xo() {
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
var bo = 0;
function D(t, n, e, r) {
  (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
}
function Zn() {
  return ++bo;
}
var R = ct.prototype;
D.prototype = {
  constructor: D,
  select: no,
  selectAll: eo,
  selectChild: R.selectChild,
  selectChildren: R.selectChildren,
  filter: Ki,
  merge: Wi,
  selection: io,
  transition: wo,
  call: R.call,
  nodes: R.nodes,
  node: R.node,
  size: R.size,
  empty: R.empty,
  each: R.each,
  on: Ji,
  attr: Ti,
  attrTween: Gi,
  style: lo,
  styleTween: ho,
  text: _o,
  textTween: vo,
  remove: to,
  tween: Ni,
  delay: Hi,
  duration: Oi,
  ease: Vi,
  easeVarying: zi,
  end: xo,
  [Symbol.iterator]: R[Symbol.iterator],
};
function Eo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var $o = { time: null, delay: 0, duration: 250, ease: Eo };
function No(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
  return e;
}
function Co(t) {
  var n, e;
  t instanceof D
    ? ((n = t._id), (t = t._name))
    : ((n = Zn()), ((e = $o).time = Zt()), (t = t == null ? null : t + ""));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], c = s.length, a, l = 0; l < c; ++l)
      (a = s[l]) && At(a, t, n, l, s, e || No(a, n));
  return new D(r, this._parents, t, n);
}
ct.prototype.interrupt = bi;
ct.prototype.transition = Co;
const Yt = Math.PI,
  Vt = 2 * Yt,
  F = 1e-6,
  ko = Vt - F;
function Qn(t) {
  this._ += t[0];
  for (let n = 1, e = t.length; n < e; ++n) this._ += arguments[n] + t[n];
}
function Ao(t) {
  let n = Math.floor(t);
  if (!(n >= 0)) throw new Error(`invalid digits: ${t}`);
  if (n > 15) return Qn;
  const e = 10 ** n;
  return function (r) {
    this._ += r[0];
    for (let i = 1, o = r.length; i < o; ++i)
      this._ += Math.round(arguments[i] * e) / e + r[i];
  };
}
class Io {
  constructor(n) {
    (this._x0 = this._y0 = this._x1 = this._y1 = null),
      (this._ = ""),
      (this._append = n == null ? Qn : Ao(n));
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
    else if (f > F)
      if (!(Math.abs(h * a - l * u) > F) || !o)
        this._append`L${(this._x1 = n)},${(this._y1 = e)}`;
      else {
        let p = r - s,
          _ = i - c,
          m = a * a + l * l,
          N = p * p + _ * _,
          U = Math.sqrt(m),
          I = Math.sqrt(f),
          P = o * Math.tan((Yt - Math.acos((m + f - N) / (2 * U * I))) / 2),
          d = P / I,
          g = P / U;
        Math.abs(d - 1) > F && this._append`L${n + d * u},${e + d * h}`,
          this._append`A${o},${o},0,0,${+(h * p > u * _)},${(this._x1 =
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
      : (Math.abs(this._x1 - l) > F || Math.abs(this._y1 - u) > F) &&
        this._append`L${l},${u}`,
      r &&
        (f < 0 && (f = (f % Vt) + Vt),
        f > ko
          ? this._append`A${r},${r},0,1,${h},${n - c},${
              e - a
            }A${r},${r},0,1,${h},${(this._x1 = l)},${(this._y1 = u)}`
          : f > F &&
            this._append`A${r},${r},0,${+(f >= Yt)},${h},${(this._x1 =
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
function Po(t) {
  if (!t.ok) throw new Error(t.status + " " + t.statusText);
  return t.text();
}
function So(t, n) {
  return fetch(t, n).then(Po);
}
function To(t) {
  return (n, e) => So(n, e).then((r) => new DOMParser().parseFromString(r, t));
}
const Mo = To("application/xml");
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
class q {
  constructor(n, e, r, i, o, s, c) {
    on(this, "dragged", (n) => {
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
    if (G("#" + this.id).node() != null) return;
    const n = await Mo(this.url);
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
      this.sensor.node().append(G(n.documentElement).node()),
      this.movable &&
        this.sensor.call(
          Vr()
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended)
        );
  }
  dragstarted(n) {
    G(this).raise().classed("active", !0);
  }
  dragended(n) {
    G(this).classed("active", !1);
  }
}
const It = [
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
  Lo = ["1kresistor_pin_1", "1kresistor_pin_2"],
  pt = { "1kresistor_pin_1": "Led cathode", "1kresistor_pin_2": "Led Anode" },
  Bo = ["res_pin1", "res_pin2"],
  gt = { res_pin1: "Resistor pin 1", res_pin2: "Resistor pin 2" },
  Ro = [
    "hc05_key_pin",
    "hc05_vcc_pin",
    "hc05_gnd_pin",
    "hc05_txd_pin",
    "hc05_rxd_pin",
    "hc05_state_pin",
  ],
  _t = {
    hc05_key_pin: "Key",
    hc05_vcc_pin: "Vcc",
    hc05_gnd_pin: "GND",
    hc05_txd_pin: "TXD",
    hc05_rxd_pin: "RXD",
    hc05_state_pin: "State",
  },
  M = {
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
  Go = (t) => {
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
        if (M[r.connector] == "GND") {
          e++, console.log("gnd", e);
          return;
        }
        if (M[r.connector] == "GP0") {
          e++, console.log("GP1", e);
          return;
        }
        if (M[r.connector] == "GP1") {
          e++, console.log("GP2", e);
          return;
        }
        if (M[r.connector] == "VBUS") {
          e++, console.log("VBUS", e);
          return;
        }
        if (It[r.connector] && M[r.connector].includes("GP16")) {
          e++;
          return;
        }
      }),
      console.log(e, "total"),
      e == 12
    );
  };
class Do {
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
      const e = M[this.connections[this.connections.length - 2].connector]
          ? M[this.connections[this.connections.length - 2].connector]
          : pt[this.connections[this.connections.length - 2].connector]
          ? pt[this.connections[this.connections.length - 2].connector]
          : gt[this.connections[this.connections.length - 2].connector]
          ? gt[this.connections[this.connections.length - 2].connector]
          : _t[this.connections[this.connections.length - 2].connector]
          ? _t[this.connections[this.connections.length - 2].connector]
          : this.connections[this.connections.length - 2].connector,
        r = M[this.connections[this.connections.length - 1].connector]
          ? M[this.connections[this.connections.length - 1].connector]
          : pt[this.connections[this.connections.length - 1].connector]
          ? pt[this.connections[this.connections.length - 1].connector]
          : gt[this.connections[this.connections.length - 1].connector]
          ? gt[this.connections[this.connections.length - 1].connector]
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
class Xo {
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
const En = (t, n) => {
    jt.append("path")
      .attr("d", t)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "none")
      .attr("id", n);
  },
  b = G("#svg")
    .append("svg")
    .attr("id", "svgContainer")
    .attr(
      "height",
      window.innerHeight - document.getElementById("svg").offsetTop
    )
    .attr("width", document.getElementById("svg").offsetWidth),
  Ho = new q("raspberry", b, "./images/pico.svg", 0.6, !1, 0, 0),
  qo = new q("ultraSonicsensor", b, "./images/sensor1.svg", 0.45, !1, 400, 0),
  Fo = new q("ledlight", b, "./images/led.svg", 0.25, !1, 400, 100),
  Oo = new q("resistor220", b, "./images/resistor.svg", 0.45, !1, 300, 200),
  Yo = new q("box", b, "./images/box.svg", 0.7, !1, 800, 0),
  Vo = new q("bluetootth", b, "./images/box1.svg", 0.7, !1, 800, 0),
  Uo = new q("phone", b, "./images/ledswitch.svg", 0.7, !1, 800, 0),
  zo = new q("bconnect", b, "./images/start.svg", 0.7, !1, 800, 0),
  jt = b.append("g").attr("id", "pathsGroup"),
  Ko = document.getElementById("rasberryPi"),
  Wo = document.getElementById("sensor"),
  Zo = document.getElementById("led"),
  Qo = document.getElementById("resistor"),
  Jo = document.getElementById("object"),
  jo = document.getElementById("info"),
  ts = document.getElementById("list"),
  $n = (t) =>
    It.includes(t.srcElement.id) ||
    Lo.includes(t.srcElement.id) ||
    Bo.includes(t.srcElement.id) ||
    Ro.includes(t.srcElement.id),
  ns = document.getElementById("displayInfo"),
  es = document.getElementById("codeSubmit");
let Bt = !1;
jo.addEventListener("click", () => {
  (Bt = !Bt), (ts.style.display = Bt ? "block" : "none");
});
Ko.addEventListener("click", async () => await Ho.load());
Zo.addEventListener("click", () => Fo.load());
Wo.addEventListener("click", () => qo.load());
Qo.addEventListener("click", () => Oo.load());
let w;
const k = new Do("connectionLog"),
  Nn = new Xo("errorBox", "errorHeading", "errorText", "closeErrorBox");
let T = 0;
const rs = document.querySelector("#undoButton");
rs.addEventListener("click", () => {
  k.undoLastConnection(), os();
});
const is = (t) => {
  jt.selectAll(`path[id="${t}"]`)
    .nodes()
    .forEach((e) => {
      e.remove();
    });
};
Jo.addEventListener("click", async () => {
  await Uo.load(), await Yo.load(), await Vo.load(), await zo.load();
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
const os = () => {
  if (w) {
    jt
      .selectAll(`path[id^="path${T}"]`)
      .nodes()
      .forEach((n) => n.remove()),
      (w = null),
      (T = 0),
      console.log("Removed all incomplete paths");
    return;
  }
  if (k.connections.length > 0) {
    const n = k.connections[k.connections.length - 1].lineID;
    is(n), k.connections.pop(), console.log(`Removed paths with line ID: ${n}`);
  } else console.warn("No more connections to undo");
};
b.on("dblclick", (t) => {
  if ($n(t) && w == null) {
    (w = new Io()),
      w.moveTo(t.offsetX, t.offsetY),
      k.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: null,
        incomplete: !0,
      }),
      b.style("cursor", "crosshair"),
      console.log("path created 0"),
      console.log(T, "path count");
    return;
  }
  if (t.srcElement.id == "svgContainer" && !It.includes(t.srcElement.id)) {
    w && w.lineTo(t.offsetX, t.offsetY),
      w &&
        k.connections.length > 0 &&
        (k.connections[k.connections.length - 1].connectorEnd = null),
      w &&
        (En(w.toString(), `path${T}`),
        console.log("path created"),
        console.log(T));
    return;
  }
  if ($n(t) && w) {
    w.lineTo(t.offsetX, t.offsetY),
      En(w.toString(), `path${T}`),
      k.addConnection({
        lineID: `path${T}`,
        x: t.offsetX,
        y: t.offsetY,
        connector: t.srcElement.id,
        connectorEnd: t.srcElement.id,
        incomplete: !1,
      }),
      T++,
      b.style("cursor", "default"),
      (w = null),
      console.log("path created 2"),
      console.log(T);
    return;
  }
});
b.on("mouseover", (t) => {
  It.includes(t.srcElement.id) && (ns.innerHTML = M[t.srcElement.id]);
});
es.addEventListener("click", () => {
  const t = Go(k.getConnectionLog());
  t === !0
    ? b.on("click", (n) => {
        if (n.target.id === "ledon") {
          const e = document.getElementById("ledLight");
          e.style.fill = "blue";
        }
        if (n.target.id === "ledoff") {
          const e = document.getElementById("ledLight");
          e.style.fill = "black";
        }
      })
    : t.error
    ? Nn.throw("Error", t.error)
    : Nn.throw(
        "Error",
        "Please connect the components properly. Refer to the connection diagram."
      );
});
