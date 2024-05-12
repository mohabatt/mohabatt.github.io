(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };
  var composeFlipped = function(dictSemigroupoid) {
    var compose12 = compose(dictSemigroupoid);
    return function(f) {
      return function(g) {
        return compose12(g)(f);
      };
    };
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };
  var apply = function(f) {
    return function(x) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map112(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map112($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return function(x) {
      return map112($$const(x));
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply2 = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply12 = apply2(dictApply);
    var map28 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply12(map28($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply12 = apply2(dictApply);
    var map28 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply12(map28(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure18 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure18(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply6 = apply2(dictApplicative.Apply0());
    var pure18 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply6(pure18(f))(a);
      };
    };
  };
  var applicativeArray = {
    pure: function(x) {
      return [x];
    },
    Apply0: function() {
      return applyArray;
    }
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped1 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a) {
          return bindFlipped1(f)(g(a));
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var ifM = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(cond) {
      return function(t) {
        return function(f) {
          return bind13(cond)(function(cond$prime) {
            if (cond$prime) {
              return t;
            }
            ;
            return f;
          });
        };
      };
    };
  };
  var join = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(m) {
      return bind13(m)(identity3);
    };
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count2, value12) {
    if (count2 < 1) {
      return [];
    }
    var result = new Array(count2);
    return result.fill(value12);
  };
  var replicatePolyfill = function(count2, value12) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count2; i++) {
      result[n++] = value12;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just, nothing, xs, i) {
    return i < 0 || i >= xs.length ? nothing : just(xs[i]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i = 0, l = xs.length; i < l; i++) {
      if (f(xs[i]))
        return just(i);
    }
    return nothing;
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var partitionImpl = function(f, xs) {
    var yes = [];
    var no = [];
    for (var i = 0; i < xs.length; i++) {
      var x = xs[i];
      if (f(x))
        yes.push(x);
      else
        no.push(x);
    }
    return { yes, no };
  };
  var sortByImpl = /* @__PURE__ */ function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind8(f)(function(f$prime) {
          return bind8(a)(function(a$prime) {
            return pure9(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var comparing = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f) {
      return function(x) {
        return function(y) {
          return compare3(f(x))(f(y));
        };
      };
    };
  };
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };

  // output/Data.Show/foreign.js
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i + 1;
        var empty10 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty10;
      }
    ) + '"';
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i = 0, l = xs.length; i < l; i++) {
        ss[i] = f(xs[i]);
      }
      return "[" + ss.join(",") + "]";
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var showMaybe = function(dictShow) {
    var show3 = show(dictShow);
    return {
      show: function(v) {
        if (v instanceof Just) {
          return "(Just " + (show3(v.value0) + ")");
        }
        ;
        if (v instanceof Nothing) {
          return "Nothing";
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 223, column 1 - line 225, column 28): " + [v.constructor.name]);
      }
    };
  };
  var maybe$prime = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v(unit);
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 250, column 1 - line 250, column 62): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe$prime = function(a) {
    return maybe$prime(a)(identity4);
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();
  var altMaybe = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var plusMaybe = /* @__PURE__ */ function() {
    return {
      empty: Nothing.value,
      Alt0: function() {
        return altMaybe;
      }
    };
  }();

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  var foreachE = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do8() {
          var r = bindFlipped2($$new)(f(a))();
          (function() {
            while (!function __do9() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map3(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  function newSTRef(val) {
    return function() {
      return { value: val };
    };
  }
  var read2 = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl2 = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write2 = function(a) {
    return function(ref) {
      return function() {
        return ref.value = a;
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var modify$prime = modifyImpl2;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });
  var applyST = /* @__PURE__ */ $lazy_applyST(47);

  // output/Data.Array.ST/foreign.js
  function newSTArray() {
    return [];
  }
  var pushAllImpl = function(as, xs) {
    return xs.push.apply(xs, as);
  };
  var shiftImpl = function(just, nothing, xs) {
    return xs.length > 0 ? just(xs.shift()) : nothing;
  };
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var freezeImpl = copyImpl;
  var thawImpl = copyImpl;
  var pushImpl = function(a, xs) {
    return xs.push(a);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };
  var runSTFn3 = function runSTFn32(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function() {
            return fn(a, b, c);
          };
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var bind2 = /* @__PURE__ */ bind(bindST);
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do8() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var shift = /* @__PURE__ */ function() {
    return runSTFn3(shiftImpl)(Just.create)(Nothing.value);
  }();
  var run2 = function(st) {
    return bind2(st)(unsafeFreeze)();
  };
  var pushAll = /* @__PURE__ */ runSTFn2(pushAllImpl);
  var push = /* @__PURE__ */ runSTFn2(pushImpl);
  var freeze = /* @__PURE__ */ runSTFn1(freezeImpl);

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b) {
    return !b;
  };

  // output/Data.HeytingAlgebra/index.js
  var not = function(dict) {
    return dict.not;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a) {
      return function(b) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };

  // output/Data.Array.ST.Iterator/index.js
  var map4 = /* @__PURE__ */ map(functorST);
  var not2 = /* @__PURE__ */ not(heytingAlgebraBoolean);
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var Iterator = /* @__PURE__ */ function() {
    function Iterator2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Iterator2.create = function(value0) {
      return function(value1) {
        return new Iterator2(value0, value1);
      };
    };
    return Iterator2;
  }();
  var next = function(v) {
    return function __do8() {
      var i = read2(v.value1)();
      modify(function(v1) {
        return v1 + 1 | 0;
      })(v.value1)();
      return v.value0(i);
    };
  };
  var iterator = function(f) {
    return map4(Iterator.create(f))(newSTRef(0));
  };
  var iterate = function(iter) {
    return function(f) {
      return function __do8() {
        var $$break = newSTRef(false)();
        while (map4(not2)(read2($$break))()) {
          (function __do9() {
            var mx = next(iter)();
            if (mx instanceof Just) {
              return f(mx.value0)();
            }
            ;
            if (mx instanceof Nothing) {
              return $$void2(write2(true)($$break))();
            }
            ;
            throw new Error("Failed pattern match at Data.Array.ST.Iterator (line 42, column 5 - line 44, column 47): " + [mx.constructor.name]);
          })();
        }
        ;
        return {};
      };
    };
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Data.Bifunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity5);
    };
  };
  var bifunctorTuple = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return new Tuple(f(v.value0), g(v.value1));
        };
      };
    }
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      return foldr22(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var oneOfMap = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      var alt9 = alt(dictPlus.Alt0());
      var empty10 = empty(dictPlus);
      return function(f) {
        return foldr22(function($453) {
          return alt9(f($453));
        })(empty10);
      };
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure9 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure9(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty4 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty4;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append7(f(x))(acc);
          };
        })(mempty4);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a) {
      return function(b) {
        return fn(a, b);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.Functor.Compose/index.js
  var functorCompose = function(dictFunctor) {
    var map28 = map(dictFunctor);
    return function(dictFunctor1) {
      var map112 = map(dictFunctor1);
      return {
        map: function(f) {
          return function(v) {
            return map28(map112(f))(v);
          };
        }
      };
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply6) {
      return function(map28) {
        return function(pure9) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure9([]);
                  case 1:
                    return map28(array1)(f(array[bot]));
                  case 2:
                    return apply6(map28(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply6(apply6(map28(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply6(map28(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity6);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply2(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Array/index.js
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var sortBy = function(comp) {
    return runFn3(sortByImpl)(comp)(function(v) {
      if (v instanceof GT) {
        return 1;
      }
      ;
      if (v instanceof EQ) {
        return 0;
      }
      ;
      if (v instanceof LT) {
        return -1 | 0;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 897, column 38 - line 900, column 11): " + [v.constructor.name]);
    });
  };
  var sortWith = function(dictOrd) {
    var comparing2 = comparing(dictOrd);
    return function(f) {
      return sortBy(comparing2(f));
    };
  };
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var singleton2 = function(a) {
    return [a];
  };
  var partition = /* @__PURE__ */ runFn2(partitionImpl);
  var $$null = function(xs) {
    return length(xs) === 0;
  };
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var drop = function(n) {
    return function(xs) {
      var $173 = n < 1;
      if ($173) {
        return xs;
      }
      ;
      return slice(n)(length(xs))(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe = function(f) {
    return concatMap(function() {
      var $189 = maybe([])(singleton2);
      return function($190) {
        return $189(f($190));
      };
    }());
  };

  // output/Control.Monad.ST.Global/index.js
  var toEffect = unsafeCoerce2;

  // output/Control.Monad.ST.Class/index.js
  var monadSTST = {
    liftST: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadST;
    }
  };
  var monadSTEffect = {
    liftST: toEffect,
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftST = function(dict) {
    return dict.liftST;
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton3 = function(dictPlus) {
    var empty10 = empty(dictPlus);
    return function(a) {
      return new NonEmpty(a, empty10);
    };
  };
  var functorNonEmpty = function(dictFunctor) {
    var map28 = map(dictFunctor);
    return {
      map: function(f) {
        return function(m) {
          return new NonEmpty(f(m.value0), map28(f)(m.value1));
        };
      }
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty4 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty4);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $280 = l.value0 > r.value0;
          if ($280) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
  };
  var singleton4 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton4(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
    };
  }();
  var insert = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton4(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare3(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable = function(dictOrd) {
    var insert1 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert1(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };

  // output/Data.Compactable/index.js
  var $$void3 = /* @__PURE__ */ $$void(functorST);
  var pure1 = /* @__PURE__ */ pure(applicativeST);
  var apply3 = /* @__PURE__ */ apply2(applyST);
  var map5 = /* @__PURE__ */ map(functorST);
  var compactableArray = {
    compact: function(xs) {
      return function __do8() {
        var result = newSTArray();
        var iter = iterator(function(v) {
          return index(xs)(v);
        })();
        iterate(iter)(function($108) {
          return $$void3(function(v) {
            if (v instanceof Nothing) {
              return pure1(0);
            }
            ;
            if (v instanceof Just) {
              return push(v.value0)(result);
            }
            ;
            throw new Error("Failed pattern match at Data.Compactable (line 111, column 34 - line 113, column 35): " + [v.constructor.name]);
          }($108));
        })();
        return unsafeFreeze(result)();
      }();
    },
    separate: function(xs) {
      return function __do8() {
        var ls = newSTArray();
        var rs = newSTArray();
        var iter = iterator(function(v) {
          return index(xs)(v);
        })();
        iterate(iter)(function($109) {
          return $$void3(function(v) {
            if (v instanceof Left) {
              return push(v.value0)(ls);
            }
            ;
            if (v instanceof Right) {
              return push(v.value0)(rs);
            }
            ;
            throw new Error("Failed pattern match at Data.Compactable (line 122, column 34 - line 124, column 31): " + [v.constructor.name]);
          }($109));
        })();
        return apply3(map5(function(v) {
          return function(v1) {
            return {
              left: v,
              right: v1
            };
          };
        })(unsafeFreeze(ls)))(unsafeFreeze(rs))();
      }();
    }
  };
  var compact = function(dict) {
    return dict.compact;
  };

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Deku.Do/index.js
  var bind3 = function(f) {
    return function(a) {
      return f(a);
    };
  };

  // output/Deku.JSWeakRef/foreign.js
  var weakRef = (value12) => new WeakRef(value12);
  var deref = (value12) => {
    const i = value12.deref();
    return i === void 0 ? null : i;
  };

  // output/Effect.Uncurried/foreign.js
  var mkEffectFn1 = function mkEffectFn12(fn) {
    return function(x) {
      return fn(x)();
    };
  };
  var mkEffectFn3 = function mkEffectFn32(fn) {
    return function(a, b, c) {
      return fn(a)(b)(c)();
    };
  };
  var mkEffectFn5 = function mkEffectFn52(fn) {
    return function(a, b, c, d, e) {
      return fn(a)(b)(c)(d)(e)();
    };
  };
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };
  var runEffectFn2 = function runEffectFn22(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };

  // output/Effect.Uncurried/index.js
  var semigroupEffectFn1 = function(dictSemigroup) {
    var append7 = append(semigroupEffect(dictSemigroup));
    return {
      append: function(f1) {
        return function(f2) {
          return mkEffectFn1(function(a) {
            return append7(runEffectFn1(f1)(a))(runEffectFn1(f2)(a));
          });
        };
      }
    };
  };
  var monoidEffectFn1 = function(dictMonoid) {
    var mempty4 = mempty(monoidEffect(dictMonoid));
    var semigroupEffectFn11 = semigroupEffectFn1(dictMonoid.Semigroup0());
    return {
      mempty: mkEffectFn1(function(v) {
        return mempty4;
      }),
      Semigroup0: function() {
        return semigroupEffectFn11;
      }
    };
  };

  // output/FRP.Event/foreign.js
  var fastForeachThunkST = (as) => {
    for (var i = 0, l = as.length; i < l; i++) {
      as[i]();
    }
  };
  var fastForeachE = (as, f) => {
    for (var i = 0, l = as.length; i < l; i++) {
      f(as[i]);
    }
  };
  var objHack = (tag) => () => {
    return { r: false, q: [], m: [{}], tag };
  };
  var insertObjHack = (k, v, o) => {
    o.m[o.m.length - 1][k] = v;
  };
  var deleteObjHack = (k, o) => {
    for (const m of o.m) {
      if (delete m[k]) {
        return true;
      }
    }
    return false;
  };
  var run3 = (o, M, f, i) => {
    o.m.push({});
    for (const kv of Object.entries(o.m[i])) {
      const k = kv[0];
      const v = kv[1];
      f(v);
      if (Object.keys(o.m[i + 1]).length)
        run3(o, M, f, i + 1);
      o.m[i + 1] = {};
      o.m.length = i + 1 + 1;
      M[k] = v;
    }
  };
  var fastForeachOhE = (o, ff2) => {
    let f = ff2;
    while (true) {
      if (o.r) {
        o.q.push(f);
        return;
      }
      o.r = true;
      const M = {};
      run3(o, M, f, 0);
      o.m.length = 0;
      o.m.push(M);
      o.r = false;
      f = o.q.shift();
      if (f == void 0) {
        break;
      }
    }
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc2 = function(v) {
    return function(a) {
      return new CatQueue(v.value0, new Cons(a, v.value1));
    };
  };
  var $$null2 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty3 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc2(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b) {
      return function(q) {
        var foldl4 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl4(function(x) {
                  return function(i) {
                    return i(x);
                  };
                })(b)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q)(Nil.value);
      };
    };
  };
  var uncons2 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null2(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty4 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append2 = link;
  var semigroupCatList = {
    append: append2
  };
  var snoc3 = function(cat) {
    return function(a) {
      return append2(cat)(new CatCons(a, empty3));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy3 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var append3 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append3(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons2(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a) {
          return concatF(v.value0.value1(a))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var resume$prime = function(k) {
    return function(j) {
      return function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return j(v.value0);
        }
        ;
        if (v instanceof Bind) {
          return k(v.value0)(v.value1);
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 213, column 17 - line 215, column 20): " + [v.constructor.name]);
      };
    };
  };
  var resume = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return resume$prime(function(g) {
      return function(i) {
        return new Left(map112(i)(g));
      };
    })(Right.create);
  };
  var fromView = function(f) {
    return new Free(f, empty4);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc3(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy3("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure2 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure2($192);
    }));
  };

  // output/Data.Filterable/index.js
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var foldl2 = /* @__PURE__ */ foldl(foldableArray);
  var maybeBool = function(p) {
    return function(x) {
      var $66 = p(x);
      if ($66) {
        return new Just(x);
      }
      ;
      return Nothing.value;
    };
  };
  var filterableArray = {
    partitionMap: function(p) {
      var go2 = function(acc) {
        return function(x) {
          var v = p(x);
          if (v instanceof Left) {
            return {
              right: acc.right,
              left: append4(acc.left)([v.value0])
            };
          }
          ;
          if (v instanceof Right) {
            return {
              left: acc.left,
              right: append4(acc.right)([v.value0])
            };
          }
          ;
          throw new Error("Failed pattern match at Data.Filterable (line 149, column 16 - line 151, column 50): " + [v.constructor.name]);
        };
      };
      return foldl2(go2)({
        left: [],
        right: []
      });
    },
    partition,
    filterMap: mapMaybe,
    filter,
    Compactable0: function() {
      return compactableArray;
    },
    Functor1: function() {
      return functorArray;
    }
  };
  var filterMap = function(dict) {
    return dict.filterMap;
  };
  var eitherBool = function(p) {
    return function(x) {
      var $84 = p(x);
      if ($84) {
        return new Right(x);
      }
      ;
      return new Left(x);
    };
  };

  // output/FRP.Event.Class/index.js
  var map6 = /* @__PURE__ */ map(functorTuple);
  var pure3 = /* @__PURE__ */ pure(applicativeMaybe);
  var sampleOnRight = function(dict) {
    return dict.sampleOnRight;
  };
  var sampleOnRightOp = function(dictIsEvent) {
    var sampleOnRight12 = sampleOnRight(dictIsEvent);
    var map112 = map(dictIsEvent.Filterable2().Functor1());
    return function(ef) {
      return function(ea) {
        return sampleOnRight12(ef)(map112(applyFlipped)(ea));
      };
    };
  };
  var sampleOnLeft = function(dict) {
    return dict.sampleOnLeft;
  };
  var once = function(dict) {
    return dict.once;
  };
  var keepLatest = function(dict) {
    return dict.keepLatest;
  };
  var fix = function(dict) {
    return dict.fix;
  };
  var fold2 = function(dictIsEvent) {
    var fix12 = fix(dictIsEvent);
    var sampleOnRight12 = sampleOnRight(dictIsEvent);
    var alt9 = alt(dictIsEvent.Alt1());
    var Functor1 = dictIsEvent.Filterable2().Functor1();
    var voidLeft4 = voidLeft(Functor1);
    var once13 = once(dictIsEvent);
    var map112 = map(Functor1);
    return function(f) {
      return function(b) {
        return function(e) {
          return fix12(function(i) {
            return sampleOnRight12(alt9(i)(voidLeft4(once13(e))(b)))(map112(flip(f))(e));
          });
        };
      };
    };
  };
  var mapAccum = function(dictIsEvent) {
    var filterMap6 = filterMap(dictIsEvent.Filterable2());
    var fold12 = fold2(dictIsEvent);
    return function(f) {
      return function(acc) {
        return function(xs) {
          return filterMap6(snd)(fold12(function(v) {
            return function(b) {
              return map6(pure3)(f(v.value0)(b));
            };
          })(new Tuple(acc, Nothing.value))(xs));
        };
      };
    };
  };

  // output/Foreign.Object.ST/foreign.js
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/FRP.Event/index.js
  var liftST2 = /* @__PURE__ */ liftST(monadSTEffect);
  var map7 = /* @__PURE__ */ map(functorST);
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var pure4 = /* @__PURE__ */ pure(applicativeST);
  var void1 = /* @__PURE__ */ $$void(functorST);
  var join2 = /* @__PURE__ */ join(bindST);
  var pure12 = /* @__PURE__ */ pure(applicativeEffect);
  var liftST1 = /* @__PURE__ */ liftST(monadSTST);
  var resume2 = /* @__PURE__ */ resume(/* @__PURE__ */ functorCompose(functorST)(functorTuple));
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var mempty2 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffectFn1(monoidUnit));
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorST);
  var apply4 = /* @__PURE__ */ apply2(applyST);
  var subscribeO = function(v, k) {
    return liftST2(map7(liftST2)(function() {
      return v(k);
    }))();
  };
  var subscribe = function(v) {
    return function(k) {
      return liftST2(map7(liftST2)(function() {
        return v(mkEffectFn1(k));
      }));
    };
  };
  var sampleOnRight2 = function(v) {
    return function(v1) {
      return function(k) {
        var latest = newSTRef(Nothing.value)();
        var c1 = v(function(a) {
          return $$void4(liftST2(write2(new Just(a))(latest)))();
        });
        var c2 = v1(function(f) {
          var o = liftST2(read2(latest))();
          return for_2(o)(function(a) {
            return function() {
              return k(f(a));
            };
          })();
        });
        return function __do8() {
          c1();
          return c2();
        };
      };
    };
  };
  var sampleOnLeft2 = function(v) {
    return function(v1) {
      return function(k) {
        var latest = newSTRef(Nothing.value)();
        var c1 = v(function(a) {
          var o = liftST2(read2(latest))();
          return for_2(o)(function(f) {
            return function() {
              return k(f(a));
            };
          })();
        });
        var c2 = v1(function(f) {
          return liftST2(void1(write2(new Just(f))(latest)))();
        });
        return function __do8() {
          c1();
          return c2();
        };
      };
    };
  };
  var once2 = function(v) {
    return function(k) {
      var latest = newSTRef(Nothing.value)();
      var u = newSTRef(pure4(unit))();
      var c = v(function(a) {
        var o2 = liftST2(read2(latest))();
        if (o2 instanceof Nothing) {
          $$void4(liftST2(write2(new Just(a))(latest)))();
          k(a);
          return liftST2(join2(read2(u)))();
        }
        ;
        if (o2 instanceof Just) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at FRP.Event (line 189, column 9 - line 195, column 30): " + [o2.constructor.name]);
      });
      void1(write2(c)(u))();
      var o = liftST1(read2(latest))();
      (function() {
        if (o instanceof Just) {
          return c();
        }
        ;
        return unit;
      })();
      return c;
    };
  };
  var makeEvent = function(i) {
    return function(k) {
      return i(function(v) {
        return function(kx) {
          return function __do8() {
            var c = v(function(ii) {
              var go2 = function($159) {
                return function(v1) {
                  if (v1 instanceof Right) {
                    return pure12(new Done(unit));
                  }
                  ;
                  if (v1 instanceof Left) {
                    return function __do9() {
                      var v2 = liftST2(v1.value0)();
                      fastForeachE(v2.value0, k);
                      return new Loop(v2.value1);
                    };
                  }
                  ;
                  throw new Error("Failed pattern match at FRP.Event (line 347, column 25 - line 352, column 29): " + [v1.constructor.name]);
                }(resume2($159));
              };
              return tailRecM3(go2)(kx(ii))();
            });
            return c;
          };
        };
      })();
    };
  };
  var keepLatest2 = function(v) {
    return function(k) {
      var cancelInner = newSTRef(pure4(unit))();
      var cancelOuter = v(function(v1) {
        return liftST2(function __do8() {
          var ci = read2(cancelInner)();
          ci();
          var c = v1(k);
          return void1(liftST1(write2(c)(cancelInner)))();
        })();
      });
      return function __do8() {
        var ci = read2(cancelInner)();
        ci();
        return cancelOuter();
      };
    };
  };
  var justOneM = function(a) {
    return liftF(mapFlipped2(a)(function(a$prime) {
      return new Tuple([a$prime], unit);
    }));
  };
  var justOne = function(a) {
    return liftF(pure4(new Tuple([a], unit)));
  };
  var justNone = function(st) {
    return liftF(mapFlipped2(st)(function(st$prime) {
      return new Tuple([], st$prime);
    }));
  };
  var justManyM = function(a) {
    return liftF(mapFlipped2(a)(function(a$prime) {
      return new Tuple(a$prime, unit);
    }));
  };
  var justMany = function(a) {
    return liftF(pure4(new Tuple(a, unit)));
  };
  var functorEvent = {
    map: function(f) {
      return function(v) {
        return function(k) {
          return v(function(a) {
            return k(f(a));
          });
        };
      };
    }
  };
  var map1 = /* @__PURE__ */ map(functorEvent);
  var filter3 = function(p) {
    return function(v) {
      return function(k) {
        return v(function(a) {
          var v1 = p(a);
          if (v1 instanceof Just) {
            return k(v1.value0);
          }
          ;
          if (v1 instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 210, column 31 - line 212, column 35): " + [v1.constructor.name]);
        });
      };
    };
  };
  var filter$prime = function(f) {
    return filter3(function(a) {
      var v = f(a);
      if (v) {
        return new Just(a);
      }
      ;
      if (!v) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at FRP.Event (line 116, column 13 - line 118, column 25): " + [v.constructor.name]);
    });
  };
  var fastForeachThunkE = fastForeachThunkST;
  var fastForeachST = fastForeachE;
  var merge = function(f) {
    return function(k) {
      var a = newSTArray();
      fastForeachST(f, function(v) {
        var u = v(k);
        return void1(liftST1(push(u)(a)))();
      });
      return function __do8() {
        var o = liftST1(freeze(a))();
        return fastForeachThunkST(o);
      };
    };
  };
  var mergeMap = function(f0) {
    return function(f) {
      return function(k) {
        var a = newSTArray();
        fastForeachST(f, function(x) {
          var v = f0(x);
          var u = v(k);
          return void1(liftST1(push(u)(a)))();
        });
        return function __do8() {
          var o = liftST1(freeze(a))();
          return fastForeachThunkST(o);
        };
      };
    };
  };
  var create_ = function(tag) {
    return function __do8() {
      var subscribers = objHack(tag)();
      var idx = newSTRef(0)();
      return {
        event: function(k) {
          var rk = newSTRef(k)();
          var ix = read2(idx)();
          insertObjHack(ix, rk, subscribers);
          void1(modify(function(v) {
            return v + 1 | 0;
          })(idx))();
          return function __do9() {
            void1(write2(mempty2)(rk))();
            deleteObjHack(ix, subscribers);
            return unit;
          };
        },
        push: function(a) {
          return function() {
            return fastForeachOhE(subscribers, function(rk) {
              var k = liftST2(read2(rk))();
              return k(a);
            });
          };
        }
      };
    };
  };
  var createPure = /* @__PURE__ */ create_("");
  var create = /* @__PURE__ */ create_("");
  var fix2 = function(f) {
    return function(k) {
      var v = create();
      var v1 = f(v.event);
      var c2 = v.event(k);
      var c1 = v1(mkEffectFn1(v.push));
      return function __do8() {
        c1();
        return c2();
      };
    };
  };
  var memoize = function(e) {
    return function __do8() {
      var v = liftST2(create)();
      var unsubscribe = subscribe(e)(v.push)();
      return {
        event: v.event,
        unsubscribe
      };
    };
  };
  var compactableEvent = {
    compact: /* @__PURE__ */ filter3(/* @__PURE__ */ identity(categoryFn)),
    separate: function(xs) {
      return {
        left: filter3(function(v) {
          if (v instanceof Left) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Right) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 99, column 13 - line 101, column 33): " + [v.constructor.name]);
        })(xs),
        right: filter3(function(v) {
          if (v instanceof Right) {
            return new Just(v.value0);
          }
          ;
          if (v instanceof Left) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at FRP.Event (line 106, column 13 - line 108, column 32): " + [v.constructor.name]);
        })(xs)
      };
    }
  };
  var filterableEvent = {
    filter: filter$prime,
    filterMap: filter3,
    partition: function(p) {
      return function(xs) {
        return {
          yes: filter$prime(p)(xs),
          no: filter$prime(function($160) {
            return !p($160);
          })(xs)
        };
      };
    },
    partitionMap: function(f) {
      return function(xs) {
        return {
          left: filterMap(filterableEvent)(function() {
            var $161 = either(Just.create)($$const(Nothing.value));
            return function($162) {
              return $161(f($162));
            };
          }())(xs),
          right: filterMap(filterableEvent)(function($163) {
            return hush(f($163));
          })(xs)
        };
      };
    },
    Compactable0: function() {
      return compactableEvent;
    },
    Functor1: function() {
      return functorEvent;
    }
  };
  var biSampleOn = function(v) {
    return function(v1) {
      return function(k) {
        var latest1 = newSTRef(Nothing.value)();
        var latest2 = newSTRef(Nothing.value)();
        var c1 = v(function(a) {
          $$void4(liftST2(write2(new Just(a))(latest1)))();
          var res = liftST2(read2(latest2))();
          return for_2(res)(function(f) {
            return function() {
              return k(f(a));
            };
          })();
        });
        var c2 = v1(function(f) {
          $$void4(liftST2(write2(new Just(f))(latest2)))();
          var res = liftST2(read2(latest1))();
          return for_2(res)(function(a) {
            return function() {
              return k(f(a));
            };
          })();
        });
        return function __do8() {
          c1();
          return c2();
        };
      };
    };
  };
  var applyEvent = {
    apply: function(a) {
      return function(b) {
        return biSampleOn(a)(map1(applyFlipped)(b));
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var altEvent = {
    alt: function(v) {
      return function(v1) {
        return function(k) {
          return apply4(map7(function(v2) {
            return function(v3) {
              return function __do8() {
                v2();
                return v3();
              };
            };
          })(function() {
            return v(k);
          }))(function() {
            return v1(k);
          })();
        };
      };
    },
    Functor0: function() {
      return functorEvent;
    }
  };
  var plusEvent = {
    empty: function(v) {
      return pure4(unit);
    },
    Alt0: function() {
      return altEvent;
    }
  };
  var eventIsEvent = {
    keepLatest: keepLatest2,
    sampleOnRight: sampleOnRight2,
    sampleOnLeft: sampleOnLeft2,
    fix: fix2,
    once: once2,
    Plus0: function() {
      return plusEvent;
    },
    Alt1: function() {
      return altEvent;
    },
    Filterable2: function() {
      return filterableEvent;
    }
  };

  // output/Data.Profunctor/index.js
  var profunctorFn = {
    dimap: function(a2b) {
      return function(c2d) {
        return function(b2c) {
          return function($18) {
            return c2d(b2c(a2b($18)));
          };
        };
      };
    }
  };
  var dimap = function(dict) {
    return dict.dimap;
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value12) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value12 instanceof ty) {
        return just(value12);
      }
    }
    var obj = value12;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value12);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value12) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value12);
    };
  };

  // output/Web.HTML.HTMLButtonElement/foreign.js
  function setDisabled(disabled10) {
    return function(button) {
      return function() {
        button.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLButtonElement/index.js
  var fromElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLButtonElement");

  // output/Web.HTML.HTMLDocument/foreign.js
  function _body(doc) {
    return doc.body;
  }

  // output/Web.HTML.HTMLDocument/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var toDocument = unsafeCoerce2;
  var body = function(doc) {
    return map8(toMaybe)(function() {
      return _body(doc);
    });
  };

  // output/Web.HTML.HTMLElement/index.js
  var toElement = unsafeCoerce2;

  // output/Web.HTML.HTMLFieldSetElement/foreign.js
  function setDisabled2(disabled10) {
    return function(fieldset) {
      return function() {
        fieldset.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLFieldSetElement/index.js
  var fromElement2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLFieldSetElement");

  // output/Web.HTML.HTMLInputElement/foreign.js
  function setChecked(checked2) {
    return function(input) {
      return function() {
        input.checked = checked2;
      };
    };
  }
  function setDisabled3(disabled10) {
    return function(input) {
      return function() {
        input.disabled = disabled10;
      };
    };
  }
  function setValue3(value12) {
    return function(input) {
      return function() {
        input.value = value12;
      };
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var fromElement3 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.HTML.HTMLKeygenElement/foreign.js
  function setDisabled4(disabled10) {
    return function(keygen) {
      return function() {
        keygen.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLKeygenElement/index.js
  var fromElement4 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLKeygenElement");

  // output/Web.HTML.HTMLLinkElement/foreign.js
  function setDisabled5(disabled10) {
    return function(link2) {
      return function() {
        link2.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLLinkElement/index.js
  var fromElement5 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLLinkElement");

  // output/Web.HTML.HTMLOptGroupElement/foreign.js
  function setDisabled6(disabled10) {
    return function(optgroup) {
      return function() {
        optgroup.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLOptGroupElement/index.js
  var fromElement6 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLOptGroupElement");

  // output/Web.HTML.HTMLOptionElement/foreign.js
  function setDisabled7(disabled10) {
    return function(option) {
      return function() {
        option.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLOptionElement/index.js
  var fromElement7 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLOptionElement");

  // output/Web.HTML.HTMLSelectElement/foreign.js
  function setDisabled8(disabled10) {
    return function(select3) {
      return function() {
        select3.disabled = disabled10;
      };
    };
  }

  // output/Web.HTML.HTMLSelectElement/index.js
  var fromElement8 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLSelectElement");

  // output/Web.HTML.HTMLTextAreaElement/foreign.js
  function setDisabled9(disabled10) {
    return function(textarea) {
      return function() {
        textarea.disabled = disabled10;
      };
    };
  }
  function setValue11(value12) {
    return function(textarea) {
      return function() {
        textarea.value = value12;
      };
    };
  }

  // output/Web.HTML.HTMLTextAreaElement/index.js
  var fromElement9 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTextAreaElement");

  // output/Web.HTML.Location/foreign.js
  function origin(location2) {
    return function() {
      return location2.origin;
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }
  function location(window2) {
    return function() {
      return window2.location;
    };
  }

  // output/FRP.Poll.Unoptimized/index.js
  var pure5 = /* @__PURE__ */ pure(applicativeST);
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var oneOf2 = /* @__PURE__ */ oneOf(foldableArray);
  var empty5 = /* @__PURE__ */ empty(plusMaybe);
  var join3 = /* @__PURE__ */ join(bindST);
  var when2 = /* @__PURE__ */ when(applicativeST);
  var once1 = /* @__PURE__ */ once(eventIsEvent);
  var $$void5 = /* @__PURE__ */ $$void(functorST);
  var sampleOnRightOp2 = /* @__PURE__ */ sampleOnRightOp(eventIsEvent);
  var composeFlipped2 = /* @__PURE__ */ composeFlipped(semigroupoidFn);
  var map12 = /* @__PURE__ */ map(functorMaybe);
  var liftST3 = /* @__PURE__ */ liftST(monadSTST);
  var map22 = /* @__PURE__ */ map(functorArray);
  var APoll = function(x) {
    return x;
  };
  var KeepLatestStart = /* @__PURE__ */ function() {
    function KeepLatestStart2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    KeepLatestStart2.create = function(value0) {
      return function(value1) {
        return new KeepLatestStart2(value0, value1);
      };
    };
    return KeepLatestStart2;
  }();
  var KeepLatestLast = /* @__PURE__ */ function() {
    function KeepLatestLast2(value0) {
      this.value0 = value0;
    }
    ;
    KeepLatestLast2.create = function(value0) {
      return new KeepLatestLast2(value0);
    };
    return KeepLatestLast2;
  }();
  var pollable = function(dictIsEvent) {
    return {
      sample: function(v) {
        return function(ab) {
          return v(ab);
        };
      }
    };
  };
  var pollable1 = /* @__PURE__ */ pollable(eventIsEvent);
  var sample = function(dict) {
    return dict.sample;
  };
  var sample1 = /* @__PURE__ */ sample(pollable1);
  var poll = APoll;
  var sham = function(dictIsEvent) {
    var sampleOnLeft12 = sampleOnLeft(dictIsEvent);
    return function(i) {
      return poll(function(e) {
        return sampleOnLeft12(i)(e);
      });
    };
  };
  var stToPoll = function(r) {
    return poll(function(e) {
      return makeEvent(function(s) {
        return s(e)(function(f) {
          return justOneM(function __do8() {
            var i = r();
            return f(i);
          });
        });
      });
    });
  };
  var once3 = function(dictPollable) {
    var sample23 = sample(dictPollable);
    return function(dictIsEvent) {
      var once22 = once(dictIsEvent);
      return function(a) {
        return poll(function(e) {
          return once22(sample23(a)(e));
        });
      };
    };
  };
  var merge2 = function(a) {
    return function(e) {
      return mergeMap(flip(sample1)(e))(a);
    };
  };
  var functorAPoll = function(dictFunctor) {
    var map33 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(e) {
            return v(map33(function(v1) {
              return function($472) {
                return v1(f($472));
              };
            })(e));
          };
        };
      }
    };
  };
  var sampleBy = function(dictPollable) {
    var sample23 = sample(dictPollable);
    return function(dictFunctor) {
      var map33 = map(functorAPoll(dictFunctor));
      return function(dictFunctor1) {
        var map43 = map(dictFunctor1);
        return function(f) {
          return function(b) {
            return function(e) {
              return sample23(map33(f)(b))(map43(applyFlipped)(e));
            };
          };
        };
      };
    };
  };
  var keepLatest3 = function(dictFilterable) {
    var filterMap12 = filterMap(dictFilterable);
    var Functor1 = dictFilterable.Functor1();
    return function(dictIsEvent) {
      var fix12 = fix(dictIsEvent);
      var oneOf1 = oneOf2(dictIsEvent.Plus0());
      var keepLatest1 = keepLatest(dictIsEvent);
      var once22 = once(dictIsEvent);
      return function(dictPollable) {
        var sampleBy12 = sampleBy(dictPollable)(Functor1)(Functor1);
        return function(a) {
          return function(e) {
            return filterMap12(function(v) {
              if (v instanceof KeepLatestLast) {
                return new Just(v.value0);
              }
              ;
              return Nothing.value;
            })(fix12(function(ie) {
              return oneOf1([sampleBy12(KeepLatestStart.create)(a)(e), keepLatest1(flip(filterMap12)(ie)(function(v) {
                if (v instanceof KeepLatestStart) {
                  return new Just(sampleBy12(function(bb) {
                    return function(v1) {
                      return new KeepLatestLast(v.value1(bb));
                    };
                  })(v.value0)(once22(ie)));
                }
                ;
                return empty5;
              }))]);
            }));
          };
        };
      };
    };
  };
  var sample_ = function(dictPollable) {
    var sampleBy12 = sampleBy(dictPollable);
    return function(dictFunctor) {
      var sampleBy2 = sampleBy12(dictFunctor);
      return function(dictFunctor1) {
        return sampleBy2(dictFunctor1)($$const);
      };
    };
  };
  var sample_1 = /* @__PURE__ */ sample_(pollable1)(functorEvent)(functorEvent);
  var rant = function(a) {
    return function __do8() {
      var ep = createPure();
      var started = newSTRef(false)();
      var unsub = newSTRef(pure5(unit))();
      return {
        unsubscribe: join3(read2(unsub)),
        poll: poll(function(e) {
          return makeEvent(function(s) {
            return function __do9() {
              var st = read2(started)();
              when2(!st)(function __do10() {
                var unsubscribe = s(sample_1(a)(once1(e)))(function(i) {
                  return justNone(ep.push(i));
                })();
                $$void5(write2(true)(started))();
                return $$void5(flip(write2)(unsub)(unsubscribe))();
              })();
              var u3 = s(sampleOnRightOp2(e)(ep.event))(justOne)();
              return u3;
            };
          });
        })
      };
    };
  };
  var sampleOnLeft3 = function(dictPollable) {
    var sample_2 = sample_(dictPollable);
    var sampleBy12 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var sampleOnLeft12 = sampleOnLeft(dictIsEvent);
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var sample_3 = sample_2(Functor1)(Functor1);
      var sampleBy2 = sampleBy12(Functor1)(Functor1);
      return function(a) {
        return function(b) {
          return poll(function(e) {
            return sampleOnLeft12(sample_3(a)(e))(sampleBy2(composeFlipped2)(b)(e));
          });
        };
      };
    };
  };
  var sampleOnRight3 = function(dictPollable) {
    var sample_2 = sample_(dictPollable);
    var sampleBy12 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var sampleOnRight12 = sampleOnRight(dictIsEvent);
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var sample_3 = sample_2(Functor1)(Functor1);
      var sampleBy2 = sampleBy12(Functor1)(Functor1);
      return function(a) {
        return function(b) {
          return poll(function(e) {
            return sampleOnRight12(sample_3(a)(e))(sampleBy2(composeFlipped2)(b)(e));
          });
        };
      };
    };
  };
  var altAPoll = function(dictAlt) {
    var alt9 = alt(dictAlt);
    var functorAPoll1 = functorAPoll(dictAlt.Functor0());
    return {
      alt: function(v) {
        return function(v1) {
          return function(e) {
            return alt9(v(e))(v1(e));
          };
        };
      },
      Functor0: function() {
        return functorAPoll1;
      }
    };
  };
  var plusAPoll = function(dictPlus) {
    var empty12 = empty(dictPlus);
    var altAPoll1 = altAPoll(dictPlus.Alt0());
    return {
      empty: function(v) {
        return empty12;
      },
      Alt0: function() {
        return altAPoll1;
      }
    };
  };
  var fix3 = function(dictPollable) {
    var sampleBy12 = sampleBy(dictPollable);
    return function(dictIsEvent) {
      var Functor1 = dictIsEvent.Filterable2().Functor1();
      var map33 = map(Functor1);
      var fix12 = fix(dictIsEvent);
      var sampleBy2 = sampleBy12(Functor1)(Functor1);
      var sham22 = sham(dictIsEvent);
      return function(f) {
        return poll(function(e) {
          return map33(function(v) {
            return v.value1(v.value0);
          })(fix12(function(ee) {
            return sampleBy2(Tuple.create)(f(sham22(map33(fst)(ee))))(e);
          }));
        });
      };
    };
  };
  var filterMap2 = function(dictCompactable) {
    var compact2 = compact(dictCompactable);
    return function(dictPollable) {
      var sampleBy12 = sampleBy(dictPollable);
      return function(dictFunctor) {
        var sampleBy2 = sampleBy12(dictFunctor)(dictFunctor);
        return function(f) {
          return function(b) {
            return poll(function(e) {
              return compact2(sampleBy2(function(a) {
                return function(ff2) {
                  return map12(ff2)(f(a));
                };
              })(b)(e));
            });
          };
        };
      };
    };
  };
  var partitionMap = function(dictPollable) {
    return function(dictCompactable) {
      var filterMap12 = filterMap2(dictCompactable)(dictPollable);
      return function(dictFunctor) {
        var map33 = map(functorAPoll(dictFunctor));
        var filterMap23 = filterMap12(dictFunctor);
        return function(f) {
          return function(b) {
            var fb = map33(f)(b);
            return {
              left: filterMap23(either(Just.create)($$const(Nothing.value)))(fb),
              right: filterMap23(either($$const(Nothing.value))(Just.create))(fb)
            };
          };
        };
      };
    };
  };
  var compactableAPoll = function(dictFunctor) {
    return function(dictCompactable) {
      var filterMap12 = filterMap2(dictCompactable);
      return function(dictPollable) {
        return {
          compact: filterMap12(dictPollable)(dictFunctor)(identity7),
          separate: partitionMap(dictPollable)(dictCompactable)(dictFunctor)(identity7)
        };
      };
    };
  };
  var filterableAPoll = function(dictFunctor) {
    var compactableAPoll1 = compactableAPoll(dictFunctor);
    var functorAPoll1 = functorAPoll(dictFunctor);
    return function(dictCompactable) {
      var filterMap12 = filterMap2(dictCompactable);
      var compactableAPoll2 = compactableAPoll1(dictCompactable);
      return function(dictPollable) {
        var filterMap23 = filterMap12(dictPollable)(dictFunctor);
        var partitionMap1 = partitionMap(dictPollable)(dictCompactable)(dictFunctor);
        var compactableAPoll3 = compactableAPoll2(dictPollable);
        return {
          filterMap: filterMap23,
          filter: function($473) {
            return filterMap23(maybeBool($473));
          },
          partitionMap: partitionMap1,
          partition: function(p) {
            return function(xs) {
              var o = partitionMap1(eitherBool(p))(xs);
              return {
                no: o.left,
                yes: o.right
              };
            };
          },
          Compactable0: function() {
            return compactableAPoll3;
          },
          Functor1: function() {
            return functorAPoll1;
          }
        };
      };
    };
  };
  var isEventAPoll = function(dictIsEvent) {
    var Filterable2 = dictIsEvent.Filterable2();
    var keepLatest1 = keepLatest3(Filterable2)(dictIsEvent);
    var plusAPoll1 = plusAPoll(dictIsEvent.Plus0());
    var altAPoll1 = altAPoll(dictIsEvent.Alt1());
    var filterableAPoll1 = filterableAPoll(Filterable2.Functor1())(Filterable2.Compactable0());
    return function(dictPlus) {
      return function(dictPollable) {
        var filterableAPoll2 = filterableAPoll1(dictPollable);
        return {
          sampleOnRight: sampleOnRight3(dictPollable)(dictIsEvent),
          sampleOnLeft: sampleOnLeft3(dictPollable)(dictIsEvent),
          keepLatest: keepLatest1(dictPollable),
          fix: fix3(dictPollable)(dictIsEvent),
          once: once3(dictPollable)(dictIsEvent),
          Plus0: function() {
            return plusAPoll1;
          },
          Alt1: function() {
            return altAPoll1;
          },
          Filterable2: function() {
            return filterableAPoll2;
          }
        };
      };
    };
  };
  var deflect = function(a) {
    return function __do8() {
      var ep = newSTRef([])();
      var started = newSTRef(false)();
      var unsub = newSTRef(pure5(unit))();
      return poll(function(e) {
        return makeEvent(function(s) {
          return function __do9() {
            var st = read2(started)();
            when2(!st)(function __do10() {
              var unsubscribe = s(sample_1(a)(once1(e)))(function(i) {
                return justNone($$void5(liftST3(flip(modify)(ep)(flip(snoc)(i)))));
              })();
              $$void5(write2(true)(started))();
              return $$void5(write2(unsubscribe)(unsub))();
            })();
            var u3 = s(e)(function(f) {
              return justManyM(function __do10() {
                join3(read2(unsub))();
                var r = read2(ep)();
                return map22(f)(r);
              });
            })();
            return u3;
          };
        });
      });
    };
  };
  var applyAPoll = function(dictApply) {
    var apply6 = apply2(dictApply);
    var Functor0 = dictApply.Functor0();
    var map33 = map(Functor0);
    var voidLeft4 = voidLeft(Functor0);
    var functorAPoll1 = functorAPoll(Functor0);
    return {
      apply: function(v) {
        return function(v1) {
          return function(e) {
            return apply6(map33(function(ff2) {
              return function(v2) {
                return v2.value0(ff2(v2.value1));
              };
            })(v(voidLeft4(e)(identity7))))(v1(map33(Tuple.create)(e)));
          };
        };
      },
      Functor0: function() {
        return functorAPoll1;
      }
    };
  };
  var applicativeAPoll = function(dictApply) {
    var map33 = map(dictApply.Functor0());
    var applyAPoll1 = applyAPoll(dictApply);
    return {
      pure: function(a) {
        return function(e) {
          return map33(applyFlipped(a))(e);
        };
      },
      Apply0: function() {
        return applyAPoll1;
      }
    };
  };

  // output/FRP.Poll/index.js
  var $runtime_lazy4 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var map9 = /* @__PURE__ */ map(functorArray);
  var alt5 = /* @__PURE__ */ alt(altEvent);
  var pollable2 = /* @__PURE__ */ pollable(eventIsEvent);
  var sample12 = /* @__PURE__ */ sample(pollable2);
  var sampleOnLeft1 = /* @__PURE__ */ sampleOnLeft(eventIsEvent);
  var alt1 = /* @__PURE__ */ alt(/* @__PURE__ */ altAPoll(altEvent));
  var oneOfMap2 = /* @__PURE__ */ oneOfMap(foldableArray)(/* @__PURE__ */ plusAPoll(plusEvent));
  var pure6 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeAPoll(applyEvent));
  var sham1 = /* @__PURE__ */ sham(eventIsEvent);
  var sampleOnRight1 = /* @__PURE__ */ sampleOnRight(eventIsEvent);
  var isEventAPoll2 = /* @__PURE__ */ isEventAPoll(eventIsEvent)(plusEvent)(pollable2);
  var sampleOnLeft22 = /* @__PURE__ */ sampleOnLeft(isEventAPoll2);
  var sampleOnRight22 = /* @__PURE__ */ sampleOnRight(isEventAPoll2);
  var once12 = /* @__PURE__ */ once(isEventAPoll2);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var pure13 = /* @__PURE__ */ pure(applicativeST);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard2(freeBind);
  var $$void6 = /* @__PURE__ */ $$void(functorST);
  var liftST4 = /* @__PURE__ */ liftST(monadSTST);
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var map23 = /* @__PURE__ */ map(/* @__PURE__ */ functorAPoll(functorEvent));
  var map32 = /* @__PURE__ */ map(functorEvent);
  var unsafeIndex2 = /* @__PURE__ */ unsafeIndex();
  var sampleBy1 = /* @__PURE__ */ sampleBy(pollable2)(functorEvent)(functorEvent);
  var fix1 = /* @__PURE__ */ fix(eventIsEvent);
  var filterMap1 = /* @__PURE__ */ filterMap(filterableArray);
  var filterMap22 = /* @__PURE__ */ filterMap(/* @__PURE__ */ filterableAPoll(functorEvent)(compactableEvent)(pollable2));
  var filterMap3 = /* @__PURE__ */ filterMap(filterableEvent);
  var empty6 = /* @__PURE__ */ empty(plusEvent);
  var dimap2 = /* @__PURE__ */ dimap(profunctorFn);
  var fix22 = /* @__PURE__ */ fix(isEventAPoll2);
  var map42 = /* @__PURE__ */ map(functorST);
  var apply5 = /* @__PURE__ */ apply2(applyEvent);
  var apply1 = /* @__PURE__ */ apply2(/* @__PURE__ */ applyAPoll(applyEvent));
  var OnlyPure = /* @__PURE__ */ function() {
    function OnlyPure2(value0) {
      this.value0 = value0;
    }
    ;
    OnlyPure2.create = function(value0) {
      return new OnlyPure2(value0);
    };
    return OnlyPure2;
  }();
  var OnlyPoll = /* @__PURE__ */ function() {
    function OnlyPoll2(value0) {
      this.value0 = value0;
    }
    ;
    OnlyPoll2.create = function(value0) {
      return new OnlyPoll2(value0);
    };
    return OnlyPoll2;
  }();
  var OnlyEvent = /* @__PURE__ */ function() {
    function OnlyEvent2(value0) {
      this.value0 = value0;
    }
    ;
    OnlyEvent2.create = function(value0) {
      return new OnlyEvent2(value0);
    };
    return OnlyEvent2;
  }();
  var PureAndEvent = /* @__PURE__ */ function() {
    function PureAndEvent2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PureAndEvent2.create = function(value0) {
      return function(value1) {
        return new PureAndEvent2(value0, value1);
      };
    };
    return PureAndEvent2;
  }();
  var PureAndPoll = /* @__PURE__ */ function() {
    function PureAndPoll2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    PureAndPoll2.create = function(value0) {
      return function(value1) {
        return new PureAndPoll2(value0, value1);
      };
    };
    return PureAndPoll2;
  }();
  var pollableEvent = {
    sample: function(v) {
      return function(v1) {
        if (v instanceof PureAndPoll) {
          var e = makeEvent(function(s) {
            return s(v1)(function(f) {
              return justMany(map9(f)(v.value0));
            });
          });
          return alt5(e)(sample12(v.value1)(v1));
        }
        ;
        if (v instanceof PureAndEvent) {
          var e = makeEvent(function(s) {
            return s(v1)(function(f) {
              return justMany(map9(f)(v.value0));
            });
          });
          return alt5(e)(sampleOnLeft1(v.value1)(v1));
        }
        ;
        if (v instanceof OnlyEvent) {
          return sampleOnLeft1(v.value0)(v1);
        }
        ;
        if (v instanceof OnlyPoll) {
          return sample12(v.value0)(v1);
        }
        ;
        if (v instanceof OnlyPure) {
          var e = makeEvent(function(s) {
            return s(v1)(function(f) {
              return justMany(map9(f)(v.value0));
            });
          });
          return e;
        }
        ;
        throw new Error("Failed pattern match at FRP.Poll (line 638, column 1 - line 649, column 54): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var toPoll = function(v) {
    if (v instanceof PureAndPoll) {
      return alt1(oneOfMap2(pure6)(v.value0))(v.value1);
    }
    ;
    if (v instanceof PureAndEvent) {
      return alt1(oneOfMap2(pure6)(v.value0))(sham1(v.value1));
    }
    ;
    if (v instanceof OnlyEvent) {
      return sham1(v.value0);
    }
    ;
    if (v instanceof OnlyPure) {
      return oneOfMap2(pure6)(v.value0);
    }
    ;
    if (v instanceof OnlyPoll) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at FRP.Poll (line 141, column 1 - line 141, column 28): " + [v.constructor.name]);
  };
  var sample2 = function(dict) {
    return dict.sample;
  };
  var sample22 = /* @__PURE__ */ sample2(pollableEvent);
  var pollFromPoll = function(i) {
    return new OnlyPoll(i);
  };
  var sampleOnLeft4 = function(v) {
    return function(v1) {
      if (v instanceof OnlyEvent && v1 instanceof OnlyEvent) {
        return new OnlyEvent(sampleOnLeft1(v.value0)(v1.value0));
      }
      ;
      return pollFromPoll(sampleOnLeft22(toPoll(v))(toPoll(v1)));
    };
  };
  var sampleOnRight4 = function(v) {
    return function(v1) {
      if (v instanceof OnlyEvent && v1 instanceof OnlyEvent) {
        return new OnlyEvent(sampleOnRight1(v.value0)(v1.value0));
      }
      ;
      return pollFromPoll(sampleOnRight22(toPoll(v))(toPoll(v1)));
    };
  };
  var stToPoll2 = function(r) {
    return pollFromPoll(stToPoll(r));
  };
  var pollFromEvent = /* @__PURE__ */ function() {
    return OnlyEvent.create;
  }();
  var sham2 = pollFromEvent;
  var once4 = function(i) {
    return pollFromPoll(once12(toPoll(i)));
  };
  var merge3 = function(a) {
    var go2 = function(v2) {
      return function(v1) {
        if (v2 instanceof OnlyPure) {
          return {
            l: append5(v2.value0)(v1.l),
            m: v1.m,
            r: v1.r
          };
        }
        ;
        if (v2 instanceof OnlyEvent) {
          return {
            l: v1.l,
            m: append5([v2.value0])(v1.m),
            r: v1.r
          };
        }
        ;
        if (v2 instanceof PureAndEvent) {
          return {
            l: append5(v2.value0)(v1.l),
            m: append5([v2.value1])(v1.m),
            r: v1.r
          };
        }
        ;
        if (v2 instanceof OnlyPoll) {
          return {
            l: v1.l,
            m: v1.m,
            r: append5([v2.value0])(v1.r)
          };
        }
        ;
        if (v2 instanceof PureAndPoll) {
          return {
            l: append5(v2.value0)(v1.l),
            m: v1.m,
            r: append5([v2.value1])(v1.r)
          };
        }
        ;
        throw new Error("Failed pattern match at FRP.Poll (line 204, column 3 - line 204, column 52): " + [v2.constructor.name, v1.constructor.name]);
      };
    };
    var v = foldr4(go2)({
      l: [],
      m: [],
      r: []
    })(a);
    if (v.m.length === 0 && v.r.length === 0) {
      return new OnlyPure(v.l);
    }
    ;
    if (v.l.length === 0 && v.r.length === 0) {
      return new OnlyEvent(merge(v.m));
    }
    ;
    if (v.l.length === 0 && v.m.length === 0) {
      return new OnlyPoll(merge2(v.r));
    }
    ;
    return new PureAndPoll(v.l, alt1(sham1(merge(v.m)))(merge2(v.r)));
  };
  var keepLatest$prime = function(e) {
    return makeEvent(function(s) {
      return function __do8() {
        var cancelInner = newSTRef(pure13(unit))();
        var onPure = function(p) {
          return discard1(justNone($$void6(liftST4(write2(pure13(unit))(cancelInner)))))(function() {
            return justMany(p);
          });
        };
        var onPoll = function(p) {
          return justNone(function __do9() {
            var ep = createPure();
            var c = s(sample12(p)(ep.event))(justOne)();
            ep.push(identity8)();
            return $$void6(liftST4(write2(c)(cancelInner)))();
          });
        };
        var onEvent = function(ev) {
          return justNone(function __do9() {
            var c = s(ev)(justOne)();
            return $$void6(liftST4(write2(c)(cancelInner)))();
          });
        };
        var treatMe = function(i) {
          if (i instanceof OnlyPure) {
            return onPure(i.value0);
          }
          ;
          if (i instanceof OnlyEvent) {
            return onEvent(i.value0);
          }
          ;
          if (i instanceof OnlyPoll) {
            return onPoll(i.value0);
          }
          ;
          if (i instanceof PureAndEvent) {
            return discard1(onPure(i.value0))(function() {
              return onEvent(i.value1);
            });
          }
          ;
          if (i instanceof PureAndPoll) {
            return discard1(onPure(i.value0))(function() {
              return onPoll(i.value1);
            });
          }
          ;
          throw new Error("Failed pattern match at FRP.Poll (line 577, column 17 - line 586, column 17): " + [i.constructor.name]);
        };
        var cancelOuter = s(e)(function(i) {
          return discard1(justNone(function __do9() {
            var ci = read2(cancelInner)();
            return ci();
          }))(function() {
            return treatMe(i);
          });
        })();
        return function __do9() {
          var ci = read2(cancelInner)();
          ci();
          return cancelOuter();
        };
      };
    });
  };
  var functorAPoll2 = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof PureAndPoll) {
          return new PureAndPoll(map9(v)(v1.value0), map23(v)(v1.value1));
        }
        ;
        if (v1 instanceof PureAndEvent) {
          return new PureAndEvent(map9(v)(v1.value0), map32(v)(v1.value1));
        }
        ;
        if (v1 instanceof OnlyPure) {
          return new OnlyPure(map9(v)(v1.value0));
        }
        ;
        if (v1 instanceof OnlyEvent) {
          return new OnlyEvent(map32(v)(v1.value0));
        }
        ;
        if (v1 instanceof OnlyPoll) {
          return new OnlyPoll(map23(v)(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at FRP.Poll (line 84, column 1 - line 89, column 42): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var map52 = /* @__PURE__ */ map(functorAPoll2);
  var altPoll = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof OnlyPure && v1 instanceof OnlyPure) {
          return new OnlyPure(append5(v.value0)(v1.value0));
        }
        ;
        if (v instanceof OnlyPure && v1 instanceof OnlyEvent) {
          return new PureAndPoll(v.value0, sham1(v1.value0));
        }
        ;
        if (v instanceof OnlyPure && v1 instanceof OnlyPoll) {
          return new PureAndPoll(v.value0, v1.value0);
        }
        ;
        if (v instanceof OnlyPure && v1 instanceof PureAndEvent) {
          return new PureAndEvent(append5(v.value0)(v1.value0), v1.value1);
        }
        ;
        if (v instanceof OnlyPure && v1 instanceof PureAndPoll) {
          return new PureAndPoll(append5(v.value0)(v1.value0), v1.value1);
        }
        ;
        if (v instanceof OnlyEvent && v1 instanceof OnlyPure) {
          return new PureAndPoll(v1.value0, sham1(v.value0));
        }
        ;
        if (v instanceof OnlyEvent && v1 instanceof OnlyEvent) {
          return new OnlyEvent(alt5(v.value0)(v1.value0));
        }
        ;
        if (v instanceof OnlyEvent && v1 instanceof OnlyPoll) {
          return new OnlyPoll(alt1(sham1(v.value0))(v1.value0));
        }
        ;
        if (v instanceof OnlyEvent && v1 instanceof PureAndEvent) {
          return new PureAndEvent(v1.value0, alt5(v.value0)(v1.value1));
        }
        ;
        if (v instanceof OnlyEvent && v1 instanceof PureAndPoll) {
          return new PureAndPoll(v1.value0, alt1(sham1(v.value0))(v1.value1));
        }
        ;
        if (v instanceof OnlyPoll && v1 instanceof OnlyPure) {
          return new PureAndPoll(v1.value0, v.value0);
        }
        ;
        if (v instanceof OnlyPoll && v1 instanceof OnlyEvent) {
          return new OnlyPoll(alt1(v.value0)(sham1(v1.value0)));
        }
        ;
        if (v instanceof OnlyPoll && v1 instanceof OnlyPoll) {
          return new OnlyPoll(alt1(v.value0)(v1.value0));
        }
        ;
        if (v instanceof OnlyPoll && v1 instanceof PureAndEvent) {
          return new PureAndPoll(v1.value0, alt1(v.value0)(sham1(v1.value1)));
        }
        ;
        if (v instanceof OnlyPoll && v1 instanceof PureAndPoll) {
          return new PureAndPoll(v1.value0, alt1(v.value0)(v1.value1));
        }
        ;
        if (v instanceof PureAndEvent && v1 instanceof OnlyPure) {
          return new PureAndEvent(append5(v.value0)(v1.value0), v.value1);
        }
        ;
        if (v instanceof PureAndEvent && v1 instanceof OnlyEvent) {
          return new PureAndEvent(v.value0, alt5(v.value1)(v1.value0));
        }
        ;
        if (v instanceof PureAndEvent && v1 instanceof OnlyPoll) {
          return new PureAndPoll(v.value0, alt1(sham1(v.value1))(v1.value0));
        }
        ;
        if (v instanceof PureAndEvent && v1 instanceof PureAndEvent) {
          return new PureAndEvent(append5(v.value0)(v1.value0), alt5(v.value1)(v1.value1));
        }
        ;
        if (v instanceof PureAndEvent && v1 instanceof PureAndPoll) {
          return new PureAndPoll(append5(v.value0)(v1.value0), alt1(sham1(v.value1))(v1.value1));
        }
        ;
        if (v instanceof PureAndPoll && v1 instanceof OnlyPure) {
          return new PureAndPoll(append5(v.value0)(v1.value0), v.value1);
        }
        ;
        if (v instanceof PureAndPoll && v1 instanceof OnlyEvent) {
          return new PureAndPoll(v.value0, alt1(v.value1)(sham1(v1.value0)));
        }
        ;
        if (v instanceof PureAndPoll && v1 instanceof OnlyPoll) {
          return new PureAndPoll(v.value0, alt1(v.value1)(v1.value0));
        }
        ;
        if (v instanceof PureAndPoll && v1 instanceof PureAndEvent) {
          return new PureAndPoll(append5(v.value0)(v1.value0), alt1(v.value1)(sham1(v1.value1)));
        }
        ;
        if (v instanceof PureAndPoll && v1 instanceof PureAndPoll) {
          return new PureAndPoll(append5(v.value0)(v1.value0), alt1(v.value1)(v1.value1));
        }
        ;
        throw new Error("Failed pattern match at FRP.Poll (line 159, column 1 - line 188, column 75): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorAPoll2;
    }
  };
  var plusPoll = /* @__PURE__ */ function() {
    return {
      empty: new OnlyPure([]),
      Alt0: function() {
        return altPoll;
      }
    };
  }();
  var empty1 = /* @__PURE__ */ empty(plusPoll);
  var rant2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v instanceof PureAndPoll) {
        $copy_v = new OnlyPoll(v.value1);
        return;
      }
      ;
      if (v instanceof PureAndEvent) {
        $copy_v = new OnlyEvent(v.value1);
        return;
      }
      ;
      if (v instanceof OnlyEvent) {
        $tco_done = true;
        return function __do8() {
          var v1 = memoize(v.value0)();
          return {
            poll: new OnlyEvent(v1.event),
            unsubscribe: v1.unsubscribe
          };
        };
      }
      ;
      if (v instanceof OnlyPoll) {
        $tco_done = true;
        return function __do8() {
          var v1 = rant(v.value0)();
          return {
            poll: new OnlyPoll(v1.poll),
            unsubscribe: v1.unsubscribe
          };
        };
      }
      ;
      if (v instanceof OnlyPure) {
        $tco_done = true;
        return pure13({
          poll: empty1,
          unsubscribe: pure13(unit)
        });
      }
      ;
      throw new Error("Failed pattern match at FRP.Poll (line 525, column 1 - line 528, column 65): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var foldlArr = function(bc) {
    return function(arf) {
      return function(bb) {
        return function(arr) {
          var go2 = function($copy_i) {
            return function($copy_b) {
              var $tco_var_i = $copy_i;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(i, b) {
                if (i === length(arr)) {
                  $tco_done = true;
                  return bc(b);
                }
                ;
                if (otherwise) {
                  var v = arf(b)(unsafeIndex2(arr)(i))((i + 1 | 0) === length(arr))(function(v1) {
                    return drop(i + 1 | 0)(arr);
                  });
                  if (v instanceof Left) {
                    $tco_var_i = i + 1 | 0;
                    $copy_b = v.value0;
                    return;
                  }
                  ;
                  if (v instanceof Right) {
                    $tco_done = true;
                    return v.value0;
                  }
                  ;
                  throw new Error("Failed pattern match at FRP.Poll (line 603, column 19 - line 605, column 21): " + [v.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at FRP.Poll (line 601, column 3 - line 605, column 21): " + [i.constructor.name, b.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_i, $copy_b);
              }
              ;
              return $tco_result;
            };
          };
          return go2(0)(bb);
        };
      };
    };
  };
  var $lazy_replayPollsForKeepLatest = /* @__PURE__ */ $runtime_lazy4("replayPollsForKeepLatest", "FRP.Poll", function() {
    var cnt = function(isLast) {
      return function(pl) {
        return function(x) {
          return poll(function(e) {
            return makeEvent(function(sub2) {
              return function __do8() {
                var dfl = function() {
                  if (isLast) {
                    return pure13;
                  }
                  ;
                  return deflect;
                }()(pl)();
                return sub2(alt5(sample12(dfl)(e))(sample22($lazy_replayPollsForKeepLatest(622)(x(unit)))(e)))(justOne)();
              };
            });
          });
        };
      };
    };
    return foldlArr(OnlyPure.create)(function(b) {
      return function(a) {
        return function(isLast) {
          return function(x) {
            if (a instanceof OnlyPure) {
              return new Left(append5(b)(a.value0));
            }
            ;
            if (a instanceof OnlyEvent) {
              return new Left(b);
            }
            ;
            if (a instanceof PureAndEvent) {
              return new Left(append5(b)(a.value0));
            }
            ;
            if (a instanceof OnlyPoll) {
              return new Right(new PureAndPoll(b, cnt(isLast)(a.value0)(x)));
            }
            ;
            if (a instanceof PureAndPoll) {
              return new Right(new PureAndPoll(append5(b)(a.value0), cnt(isLast)(a.value1)(x)));
            }
            ;
            throw new Error("Failed pattern match at FRP.Poll (line 609, column 22 - line 616, column 75): " + [a.constructor.name]);
          };
        };
      };
    })([]);
  });
  var replayPollsForKeepLatest = /* @__PURE__ */ $lazy_replayPollsForKeepLatest(607);
  var keepLatest4 = function(v) {
    if (v instanceof OnlyPure) {
      return replayPollsForKeepLatest(v.value0);
    }
    ;
    if (v instanceof OnlyEvent) {
      return new OnlyEvent(keepLatest$prime(v.value0));
    }
    ;
    if (v instanceof OnlyPoll) {
      return new OnlyPoll(poll(function(e) {
        return map32(uncurry(apply))(keepLatest$prime(sampleBy1(function(pl) {
          return function(ff2) {
            return map52(Tuple.create(ff2))(pl);
          };
        })(v.value0)(e)));
      }));
    }
    ;
    if (v instanceof PureAndEvent) {
      return replayPollsForKeepLatest(append5(v.value0)([new OnlyEvent(keepLatest$prime(v.value1))]));
    }
    ;
    if (v instanceof PureAndPoll) {
      return replayPollsForKeepLatest(append5(v.value0)([keepLatest4(new OnlyPoll(v.value1))]));
    }
    ;
    throw new Error("Failed pattern match at FRP.Poll (line 624, column 1 - line 627, column 12): " + [v.constructor.name]);
  };
  var filterMap4 = function(v) {
    return function(v1) {
      if (v1 instanceof PureAndPoll) {
        return new PureAndPoll(filterMap1(v)(v1.value0), filterMap22(v)(v1.value1));
      }
      ;
      if (v1 instanceof PureAndEvent) {
        return new PureAndEvent(filterMap1(v)(v1.value0), filterMap3(v)(v1.value1));
      }
      ;
      if (v1 instanceof OnlyPure) {
        return new OnlyPure(filterMap1(v)(v1.value0));
      }
      ;
      if (v1 instanceof OnlyEvent) {
        return new OnlyEvent(filterMap3(v)(v1.value0));
      }
      ;
      if (v1 instanceof OnlyPoll) {
        return new OnlyPoll(filterMap22(v)(v1.value0));
      }
      ;
      throw new Error("Failed pattern match at FRP.Poll (line 418, column 1 - line 422, column 12): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var partitionMap2 = function(f) {
    return function(b) {
      var fb = map52(f)(b);
      return {
        left: filterMap4(either(Just.create)($$const(Nothing.value)))(fb),
        right: filterMap4(either($$const(Nothing.value))(Just.create))(fb)
      };
    };
  };
  var compactablePoll = {
    compact: /* @__PURE__ */ filterMap4(identity8),
    separate: /* @__PURE__ */ partitionMap2(identity8)
  };
  var filterablePoll = {
    filterMap: filterMap4,
    filter: function($449) {
      return filterMap4(maybeBool($449));
    },
    partitionMap: partitionMap2,
    partition: function(p) {
      return function(xs) {
        var o = partitionMap2(eitherBool(p))(xs);
        return {
          no: o.left,
          yes: o.right
        };
      };
    },
    Compactable0: function() {
      return compactablePoll;
    },
    Functor1: function() {
      return functorAPoll2;
    }
  };
  var eventOrBust = function(v) {
    if (v instanceof OnlyEvent) {
      return v.value0;
    }
    ;
    return empty6;
  };
  var fix4 = function(f) {
    var o = f(empty1);
    if (o instanceof OnlyEvent) {
      return pollFromEvent(fix1(dimap2(pollFromEvent)(eventOrBust)(f)));
    }
    ;
    return pollFromPoll(fix22(dimap2(pollFromPoll)(toPoll)(f)));
  };
  var isEventPoll = {
    sampleOnRight: sampleOnRight4,
    sampleOnLeft: sampleOnLeft4,
    keepLatest: keepLatest4,
    fix: fix4,
    once: once4,
    Plus0: function() {
      return plusPoll;
    },
    Alt1: function() {
      return altPoll;
    },
    Filterable2: function() {
      return filterablePoll;
    }
  };
  var deflect2 = function(v) {
    if (v instanceof PureAndPoll) {
      return map42(PureAndPoll.create(v.value0))(deflect(v.value1));
    }
    ;
    if (v instanceof PureAndEvent) {
      return pure13(new OnlyPure(v.value0));
    }
    ;
    if (v instanceof OnlyPoll) {
      return map42(OnlyPoll.create)(deflect(v.value0));
    }
    ;
    if (v instanceof OnlyEvent) {
      return pure13(new OnlyPure([]));
    }
    ;
    if (v instanceof OnlyPure) {
      return pure13(new OnlyPure(v.value0));
    }
    ;
    throw new Error("Failed pattern match at FRP.Poll (line 550, column 1 - line 553, column 24): " + [v.constructor.name]);
  };
  var create4 = function __do() {
    var v = create();
    var v1 = rant2(sham2(v.event))();
    return {
      poll: v1.poll,
      push: v.push
    };
  };
  var applyAPoll2 = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof OnlyEvent && v1 instanceof OnlyEvent) {
          return new OnlyEvent(apply5(v.value0)(v1.value0));
        }
        ;
        return pollFromPoll(apply1(toPoll(v))(toPoll(v1)));
      };
    },
    Functor0: function() {
      return functorAPoll2;
    }
  };
  var applicativeAPoll2 = {
    pure: function(a) {
      return new OnlyPure([a]);
    },
    Apply0: function() {
      return applyAPoll2;
    }
  };

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty7 = {};
  function runST(f) {
    return f();
  }
  function _foldM(bind8) {
    return function(f) {
      return function(mz) {
        return function(m) {
          var acc = mz;
          function g(k2) {
            return function(z) {
              return f(z)(k2)(m[k2]);
            };
          }
          for (var k in m) {
            if (hasOwnProperty.call(m, k)) {
              acc = bind8(acc)(g(k));
            }
          }
          return acc;
        };
      };
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var foldr5 = /* @__PURE__ */ foldr(foldableArray);
  var values = /* @__PURE__ */ toArrayWithKey(function(v) {
    return function(v1) {
      return v1;
    };
  });
  var thawST = _copyST;
  var mutate = function(f) {
    return function(m) {
      return runST(function __do8() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var lookup2 = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var insert2 = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };
  var fold3 = /* @__PURE__ */ _foldM(applyFlipped);
  var foldMap2 = function(dictMonoid) {
    var append12 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(f) {
      return fold3(function(acc) {
        return function(k) {
          return function(v) {
            return append12(acc)(f(k)(v));
          };
        };
      })(mempty4);
    };
  };
  var foldableObject = {
    foldl: function(f) {
      return fold3(function(z) {
        return function(v) {
          return f(z);
        };
      });
    },
    foldr: function(f) {
      return function(z) {
        return function(m) {
          return foldr5(f)(z)(values(m));
        };
      };
    },
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        return foldMap12($$const(f));
      };
    }
  };
  var foldableWithIndexObject = {
    foldlWithIndex: function(f) {
      return fold3(flip(f));
    },
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m) {
          return foldr5(uncurry(f))(z)(toArrayWithKey(Tuple.create)(m));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMap2(dictMonoid);
    },
    Foldable0: function() {
      return foldableObject;
    }
  };

  // output/Deku.Core/index.js
  var liftST5 = /* @__PURE__ */ liftST(monadSTEffect);
  var pure7 = /* @__PURE__ */ pure(applicativeAPoll2);
  var sample3 = /* @__PURE__ */ sample2(pollableEvent);
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var coerce3 = /* @__PURE__ */ coerce();
  var applySecond2 = /* @__PURE__ */ applySecond(applyEffect);
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var map10 = /* @__PURE__ */ map(functorAPoll2);
  var sample13 = /* @__PURE__ */ sample(/* @__PURE__ */ pollable(eventIsEvent));
  var bind1 = /* @__PURE__ */ bind(bindMaybe);
  var pure14 = /* @__PURE__ */ pure(applicativeMaybe);
  var empty8 = /* @__PURE__ */ empty(plusPoll);
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var for_3 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var map13 = /* @__PURE__ */ map(functorMaybe);
  var map24 = /* @__PURE__ */ map(functorArray);
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorAPoll2);
  var Namespace = function(x) {
    return x;
  };
  var DekuSendToPos = /* @__PURE__ */ function() {
    function DekuSendToPos2(value0) {
      this.value0 = value0;
    }
    ;
    DekuSendToPos2.create = function(value0) {
      return new DekuSendToPos2(value0);
    };
    return DekuSendToPos2;
  }();
  var DekuRemove = /* @__PURE__ */ function() {
    function DekuRemove2() {
    }
    ;
    DekuRemove2.value = new DekuRemove2();
    return DekuRemove2;
  }();
  var DekuElementOutcome = /* @__PURE__ */ function() {
    function DekuElementOutcome2(value0) {
      this.value0 = value0;
    }
    ;
    DekuElementOutcome2.create = function(value0) {
      return new DekuElementOutcome2(value0);
    };
    return DekuElementOutcome2;
  }();
  var DekuTextOutcome = /* @__PURE__ */ function() {
    function DekuTextOutcome2(value0) {
      this.value0 = value0;
    }
    ;
    DekuTextOutcome2.create = function(value0) {
      return new DekuTextOutcome2(value0);
    };
    return DekuTextOutcome2;
  }();
  var DekuBeaconOutcome = /* @__PURE__ */ function() {
    function DekuBeaconOutcome2(value0) {
      this.value0 = value0;
    }
    ;
    DekuBeaconOutcome2.create = function(value0) {
      return new DekuBeaconOutcome2(value0);
    };
    return DekuBeaconOutcome2;
  }();
  var NoOutcome = /* @__PURE__ */ function() {
    function NoOutcome2() {
    }
    ;
    NoOutcome2.value = new NoOutcome2();
    return NoOutcome2;
  }();
  var PXAttr = /* @__PURE__ */ function() {
    function PXAttr2(value0) {
      this.value0 = value0;
    }
    ;
    PXAttr2.create = function(value0) {
      return new PXAttr2(value0);
    };
    return PXAttr2;
  }();
  var PXStr = /* @__PURE__ */ function() {
    function PXStr2(value0) {
      this.value0 = value0;
    }
    ;
    PXStr2.create = function(value0) {
      return new PXStr2(value0);
    };
    return PXStr2;
  }();
  var PXNut = /* @__PURE__ */ function() {
    function PXNut2(value0) {
      this.value0 = value0;
    }
    ;
    PXNut2.create = function(value0) {
      return new PXNut2(value0);
    };
    return PXNut2;
  }();
  var Attribute = function(x) {
    return x;
  };
  var withUnsub = function(u) {
    return function(v) {
      return {
        parent: v.parent,
        fromPortal: v.fromPortal,
        beacon: v.beacon,
        unsubs: snoc(v.unsubs)(u)
      };
    };
  };
  var useSplit = function(e) {
    return function(f) {
      return function(psr, di) {
        var v = liftST5(rant2(e))();
        var p0 = liftST5(create4)();
        var p1 = liftST5(create4)();
        var e0 = liftST5(create)();
        var o = subscribe(sample3(v.poll)(e0.event))(function(i) {
          return function __do8() {
            p0.push(i)();
            return p1.push(i)();
          };
        })();
        e0.push(identity9)();
        return coerce3(f({
          first: p0.poll,
          second: p1.poll
        }))(withUnsub(applySecond2(o)(liftST5(v.unsubscribe)))(psr), di);
      };
    };
  };
  var useDeflect = function(e) {
    return function(f) {
      return function(psr, di) {
        var d = liftST5(deflect2(e))();
        return coerce3(f(d))(psr, di);
      };
    };
  };
  var unsafeUnAttribute = coerce3;
  var unsafeAttribute = Attribute;
  var toDekuText = unsafeCoerce2;
  var toDekuElement = unsafeCoerce2;
  var toDekuBeacon = unsafeCoerce2;
  var thunker = function(unsubs) {
    return function __do8() {
      var unsubsX = liftST5(unsafeFreeze(unsubs))();
      return fastForeachThunkE(unsubsX);
    };
  };
  var textAttribution = /* @__PURE__ */ mkEffectFn3(function(v) {
    return function(v1) {
      return function(txt) {
        if (v.beacon instanceof Nothing) {
          return function() {
            return v1.attributeTextParent(txt, v.parent);
          };
        }
        ;
        if (v.beacon instanceof Just) {
          return function() {
            return v1.attributeDynParentForText(v.beacon.value0.lucky, txt, v.beacon.value0.start, v.beacon.value0.end, Nothing.value);
          };
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 1071, column 3 - line 1078, column 16): " + [v.beacon.constructor.name]);
      };
    };
  });
  var runListener = function(oh$primehi) {
    return function(associations) {
      var handleEvent = function(y) {
        return function __do8() {
          var uu = subscribeO(y, oh$primehi);
          return $$void7(liftST5(push(uu)(associations)))();
        };
      };
      var go2 = function(v) {
        if (v instanceof OnlyEvent) {
          return handleEvent(v.value0);
        }
        ;
        if (v instanceof OnlyPure) {
          return function() {
            return fastForeachE(v.value0, oh$primehi);
          };
        }
        ;
        if (v instanceof OnlyPoll) {
          return function __do8() {
            var pump = liftST5(create)();
            handleEvent(sample13(v.value0)(pump.event))();
            return pump.push(identity9)();
          };
        }
        ;
        if (v instanceof PureAndEvent) {
          return function __do8() {
            go2(new OnlyPure(v.value0))();
            return go2(new OnlyEvent(v.value1))();
          };
        }
        ;
        if (v instanceof PureAndPoll) {
          return function __do8() {
            go2(new OnlyPure(v.value0))();
            return go2(new OnlyPoll(v.value1))();
          };
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 478, column 8 - line 490, column 22): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var pureOrBust = function(v) {
    if (v instanceof OnlyPure) {
      return new Just(v.value0);
    }
    ;
    if (v instanceof PureAndPoll) {
      return new Just(v.value0);
    }
    ;
    return Nothing.value;
  };
  var prop$prime = function(k) {
    return function(v) {
      return function(e, v1) {
        return v1.setProp(toDekuElement(e), k, v);
      };
    };
  };
  var pollOrBust = function(v) {
    if (v instanceof OnlyPoll) {
      return new Just(v.value0);
    }
    ;
    if (v instanceof PureAndPoll) {
      return new Just(v.value1);
    }
    ;
    return Nothing.value;
  };
  var notLucky = /* @__PURE__ */ write(false);
  var getLifecycle = function(mb) {
    return bind1(mb)(function(m) {
      return bind1(m.lifecycle)(function(l) {
        return pure14({
          l,
          s: m.start,
          e: m.end,
          lucky: m.lucky
        });
      });
    });
  };
  var fromDekuText = unsafeCoerce2;
  var fromDekuElement = unsafeCoerce2;
  var handleAtts = function(di) {
    return function(elt) {
      return function(unsubs) {
        return function(atts) {
          var handleAttrEvent = function(y) {
            return function __do8() {
              var wr = weakRef(elt);
              var uu = subscribe(y)(function(x) {
                return function __do9() {
                  var drf = deref(wr);
                  var v = toMaybe(drf);
                  if (v instanceof Just) {
                    return x(fromDekuElement(v.value0), di);
                  }
                  ;
                  if (v instanceof Nothing) {
                    return thunker(unsubs)();
                  }
                  ;
                  throw new Error("Failed pattern match at Deku.Core (line 998, column 11 - line 1000, column 38): " + [v.constructor.name]);
                };
              })();
              return $$void7(liftST5(push(uu)(unsubs)))();
            };
          };
          var handleAttrPoll = function(y) {
            return function __do8() {
              var pump = liftST5(create)();
              handleAttrEvent(sample13(y)(pump.event))();
              return pump.push(identity9)();
            };
          };
          var go2 = function(ii) {
            if (ii instanceof OnlyPure) {
              return foreachE(ii.value0)(function(x$prime) {
                return function() {
                  return x$prime(fromDekuElement(elt), di);
                };
              });
            }
            ;
            if (ii instanceof OnlyEvent) {
              return handleAttrEvent(ii.value0);
            }
            ;
            if (ii instanceof OnlyPoll) {
              return handleAttrPoll(ii.value0);
            }
            ;
            if (ii instanceof PureAndEvent) {
              return function __do8() {
                foreachE(ii.value0)(function(x$prime) {
                  return function() {
                    return x$prime(fromDekuElement(elt), di);
                  };
                })();
                return handleAttrEvent(ii.value1)();
              };
            }
            ;
            if (ii instanceof PureAndPoll) {
              return function __do8() {
                foreachE(ii.value0)(function(x$prime) {
                  return function() {
                    return x$prime(fromDekuElement(elt), di);
                  };
                })();
                return handleAttrPoll(ii.value1)();
              };
            }
            ;
            throw new Error("Failed pattern match at Deku.Core (line 1007, column 15 - line 1019, column 27): " + [ii.constructor.name]);
          };
          return foreachE(atts)(function(ii) {
            return go2(ii);
          });
        };
      };
    };
  };
  var fromDekuBeacon = unsafeCoerce2;
  var eventOrBust2 = function(v) {
    if (v instanceof OnlyEvent) {
      return new Just(v.value0);
    }
    ;
    return Nothing.value;
  };
  var eltAttribution = /* @__PURE__ */ mkEffectFn3(function(v) {
    return function(v1) {
      return function(elt) {
        if (v.beacon instanceof Nothing) {
          return function() {
            return v1.attributeElementParent(elt, v.parent);
          };
        }
        ;
        if (v.beacon instanceof Just) {
          return function() {
            return v1.attributeDynParentForElement(v.beacon.value0.lucky, elt, v.beacon.value0.start, v.beacon.value0.end, v.beacon.value0.pos);
          };
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 975, column 11 - line 983, column 14): " + [v.beacon.constructor.name]);
      };
    };
  });
  var dynOptions = {
    sendTo: function(v) {
      return empty8;
    },
    remove: function(v) {
      return empty8;
    }
  };
  var actOnLifecycleForText = function(fromPortal, lucky, associations, p, v, txt$prime, startAnchor$prime, endAnchor$prime) {
    var txtWr = weakRef(txt$prime);
    var startAnchorWr = weakRef(startAnchor$prime);
    var endAnchorWr = weakRef(endAnchor$prime);
    var oh$primehi = function(x) {
      var txtX = deref(txtWr);
      var startAnchorX = deref(startAnchorWr);
      var endAnchorX = deref(endAnchorWr);
      var v1 = toMaybe(endAnchorX);
      var v2 = toMaybe(startAnchorX);
      var v3 = toMaybe(txtX);
      if (v3 instanceof Just && (v2 instanceof Just && v1 instanceof Just)) {
        if (x instanceof DekuSendToPos) {
          return v.sendToPosForText(lucky, x.value0, v3.value0, v2.value0, v1.value0);
        }
        ;
        if (x instanceof DekuRemove) {
          return v.removeForText(fromPortal, v3.value0);
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 866, column 13 - line 870, column 70): " + [x.constructor.name]);
      }
      ;
      return thunker(associations)();
    };
    return runListener(oh$primehi)(associations)(p)();
  };
  var text5 = function(p) {
    return function(v, v1) {
      var this$prime = pureOrBust(p);
      var those$prime = eventOrBust2(p);
      var that$prime = pollOrBust(p);
      var txt = v1.makeText(bind1(this$prime)(last));
      var unsubs = liftST5(newSTArray)();
      when3(!$$null(v.unsubs))($$void7(liftST5(pushAll(v.unsubs)(unsubs))))();
      textAttribution(v, v1, txt);
      var handleEvent = function(y) {
        return function __do8() {
          var wr = weakRef(txt);
          var uu = subscribe(y)(function(yy) {
            return function __do9() {
              var drf = deref(wr);
              var v2 = toMaybe(drf);
              if (v2 instanceof Just) {
                return v1.setText(v2.value0, yy);
              }
              ;
              if (v2 instanceof Nothing) {
                return thunker(unsubs)();
              }
              ;
              throw new Error("Failed pattern match at Deku.Core (line 1107, column 13 - line 1109, column 40): " + [v2.constructor.name]);
            };
          })();
          return $$void7(liftST5(push(uu)(unsubs)))();
        };
      };
      for_3(those$prime)(handleEvent)();
      for_3(that$prime)(function(y) {
        return function __do8() {
          var pump = liftST5(create)();
          handleEvent(sample13(y)(pump.event))();
          return pump.push(identity9)();
        };
      })();
      for_3(getLifecycle(v.beacon))(function(v2) {
        return function() {
          return actOnLifecycleForText(v.fromPortal, v2.lucky, unsubs, v2.l, v1, txt, v2.s, v2.e);
        };
      })();
      return new DekuTextOutcome(txt);
    };
  };
  var text_ = function($336) {
    return text5(pure7($336));
  };
  var actOnLifecycleForElement = function(fromPortal, lucky, associations, p, v, elt$prime, startAnchor$prime, endAnchor$prime) {
    var eltWr = weakRef(elt$prime);
    var startAnchorWr = weakRef(startAnchor$prime);
    var endAnchorWr = weakRef(endAnchor$prime);
    var oh$primehi = function(x) {
      var eltX = deref(eltWr);
      var startAnchorX = deref(startAnchorWr);
      var endAnchorX = deref(endAnchorWr);
      var v1 = toMaybe(endAnchorX);
      var v2 = toMaybe(startAnchorX);
      var v3 = toMaybe(eltX);
      if (v3 instanceof Just && (v2 instanceof Just && v1 instanceof Just)) {
        if (x instanceof DekuSendToPos) {
          return v.sendToPosForElement(lucky, x.value0, v3.value0, v2.value0, v1.value0);
        }
        ;
        if (x instanceof DekuRemove) {
          return v.removeForElement(fromPortal, v3.value0);
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 961, column 13 - line 965, column 73): " + [x.constructor.name]);
      }
      ;
      return thunker(associations)();
    };
    return runListener(oh$primehi)(associations)(p)();
  };
  var elementify = function(ns) {
    return function(tag) {
      return function(atts) {
        return function(nuts) {
          return function(v, v1) {
            var elt = v1.makeElement(map13(Namespace)(ns), tag);
            var unsubs = liftST5(newSTArray)();
            when3(!$$null(v.unsubs))($$void7(liftST5(pushAll(v.unsubs)(unsubs))))();
            eltAttribution(v, v1, elt);
            handleAtts(v1)(elt)(unsubs)(map24(map10(unsafeUnAttribute))(atts))();
            var oh$primehi = function(v2) {
              return $$void7(function() {
                return v2({
                  beacon: Nothing.value,
                  parent: elt,
                  unsubs: [],
                  fromPortal: false
                }, v1);
              })();
            };
            fastForeachE(nuts, oh$primehi);
            for_3(getLifecycle(v.beacon))(function(v2) {
              return function() {
                return actOnLifecycleForElement(v.fromPortal, v2.lucky, unsubs, v2.l, v1, elt, v2.s, v2.e);
              };
            })();
            return new DekuElementOutcome(elt);
          };
        };
      };
    };
  };
  var actOnLifecycleForDyn = function(fromPortal, associations, p, v, dbStart$prime, dbEnd$prime, startAnchor$prime, endAnchor$prime) {
    var dbStartWr = weakRef(dbStart$prime);
    var dbEndWr = weakRef(dbEnd$prime);
    var startAnchorWr = weakRef(startAnchor$prime);
    var endAnchorWr = weakRef(endAnchor$prime);
    var oh$primehi = function(x) {
      var dbStartX = deref(dbStartWr);
      var dbEndX = deref(dbEndWr);
      var startAnchorX = deref(startAnchorWr);
      var endAnchorX = deref(endAnchorWr);
      var v1 = toMaybe(endAnchorX);
      var v2 = toMaybe(startAnchorX);
      var v3 = toMaybe(dbEndX);
      var v4 = toMaybe(dbStartX);
      if (v4 instanceof Just && (v3 instanceof Just && (v2 instanceof Just && v1 instanceof Just))) {
        if (x instanceof DekuSendToPos) {
          return v.sendToPosForDyn(x.value0, v4.value0, v3.value0, v2.value0, v1.value0);
        }
        ;
        if (x instanceof DekuRemove) {
          return v.removeForDyn(fromPortal, v4.value0, v3.value0);
        }
        ;
        throw new Error("Failed pattern match at Deku.Core (line 913, column 13 - line 920, column 22): " + [x.constructor.name]);
      }
      ;
      return thunker(associations)();
    };
    return runListener(oh$primehi)(associations)(p)();
  };
  var useDynWith = function(p) {
    return function(d) {
      return function(f) {
        return function(v, v1) {
          var lucky = $$new(true)();
          for_3(v.beacon)(function($338) {
            return notLucky(function(v2) {
              return v2.lucky;
            }($338));
          })();
          var dbStart = v1.makeOpenBeacon();
          var unsubs = liftST5(newSTArray)();
          when3(!$$null(v.unsubs))($$void7(liftST5(pushAll(v.unsubs)(unsubs))))();
          var dbEnd = v1.makeCloseBeacon();
          (function() {
            if (v.beacon instanceof Nothing) {
              v1.attributeBeaconParent(dbStart, v.parent);
              return v1.attributeBeaconParent(dbEnd, v.parent);
            }
            ;
            if (v.beacon instanceof Just) {
              return v1.attributeDynParentForBeacons(dbStart, dbEnd, v.beacon.value0.start, v.beacon.value0.end, Nothing.value);
            }
            ;
            throw new Error("Failed pattern match at Deku.Core (line 758, column 7 - line 766, column 20): " + [v.beacon.constructor.name]);
          })();
          var this$prime = pureOrBust(p);
          var those$prime = eventOrBust2(p);
          var that$prime = pollOrBust(p);
          var oh$primehi = function(sstaaarrrrrt) {
            return function(eeeeeennnnd) {
              return function(v2) {
                var sendTo = d.sendTo(v2.value1);
                var remove2 = d.remove(v2.value1);
                var sendTo$prime = liftST5(create4)();
                var remove$prime = liftST5(create4)();
                var v3 = f({
                  value: v2.value1,
                  remove: remove$prime.push(DekuRemove.value),
                  sendTo: function($339) {
                    return sendTo$prime.push(DekuSendToPos.create($339));
                  }
                });
                return $$void7(function() {
                  return v3({
                    parent: v.parent,
                    unsubs: [],
                    fromPortal: false,
                    beacon: new Just({
                      start: sstaaarrrrrt,
                      end: eeeeeennnnd,
                      pos: v2.value0,
                      lucky,
                      lifecycle: new Just(merge3([map10(DekuSendToPos.create)(sendTo), sendTo$prime.poll, voidLeft2(remove2)(DekuRemove.value), remove$prime.poll]))
                    })
                  }, v1);
                })();
              };
            };
          };
          for_3(this$prime)(function(t) {
            return function() {
              return fastForeachE(t, oh$primehi(dbStart)(dbEnd));
            };
          })();
          var handleEvent = function(t) {
            return function __do8() {
              var wrStart = weakRef(dbStart);
              var wrEnd = weakRef(dbEnd);
              var uu = subscribe(t)(function(yy) {
                return function __do9() {
                  var drStart = deref(wrStart);
                  var drEnd = deref(wrEnd);
                  var v2 = toMaybe(drEnd);
                  var v3 = toMaybe(drStart);
                  if (v3 instanceof Just && v2 instanceof Just) {
                    return oh$primehi(v3.value0)(v2.value0)(yy);
                  }
                  ;
                  return thunker(unsubs)();
                };
              })();
              return $$void7(liftST5(push(uu)(unsubs)))();
            };
          };
          for_3(those$prime)(handleEvent)();
          for_3(that$prime)(function(t) {
            return function __do8() {
              var pump = liftST5(create)();
              handleEvent(sample13(t)(pump.event))();
              return pump.push(identity9)();
            };
          })();
          for_3(getLifecycle(v.beacon))(function(v2) {
            return function() {
              return actOnLifecycleForDyn(v.fromPortal, unsubs, v2.l, v1, dbStart, dbEnd, v2.s, v2.e);
            };
          })();
          return new DekuBeaconOutcome(dbStart);
        };
      };
    };
  };
  var useDynAtBeginningWith = function(e) {
    return useDynWith(map10(function(v) {
      return new Tuple(new Just(0), v);
    })(e));
  };

  // output/Deku.DOM/index.js
  var footer = /* @__PURE__ */ function() {
    return elementify(Nothing.value)("footer");
  }();
  var div2 = /* @__PURE__ */ function() {
    return elementify(Nothing.value)("div");
  }();
  var div_ = /* @__PURE__ */ div2([]);

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error3) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error3) {
        setTimeout(function() {
          throw error3;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error3) {
        return left(error3);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error3) {
        k(left(error3))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size4 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size4 !== 0) {
          size4--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb2) {
          var i, tmp;
          if (size4 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size4) % limit] = cb2;
          size4++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count2 = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count2--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count2++;
        },
        isEmpty: function() {
          return count2 === 0;
        },
        killAll: function(killError, cb2) {
          return function() {
            if (count2 === 0) {
              return cb2();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb2();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count2 = 0;
            return function(error3) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status2 = SUSPENDED;
      var step2 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run4(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status2) {
            case STEP_BIND:
              status2 = CONTINUE;
              try {
                step2 = bhead(step2);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status2 = RETURN;
                fail2 = util.left(e);
                step2 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step2)) {
                status2 = RETURN;
                fail2 = step2;
                step2 = null;
              } else if (bhead === null) {
                status2 = RETURN;
              } else {
                status2 = STEP_BIND;
                step2 = util.fromRight(step2);
              }
              break;
            case CONTINUE:
              switch (step2.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step2._2;
                  status2 = CONTINUE;
                  step2 = step2._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status2 = RETURN;
                    step2 = util.right(step2._1);
                  } else {
                    status2 = STEP_BIND;
                    step2 = step2._1;
                  }
                  break;
                case SYNC:
                  status2 = STEP_RESULT;
                  step2 = runSync(util.left, util.right, step2._1);
                  break;
                case ASYNC:
                  status2 = PENDING;
                  step2 = runAsync(util.left, step2._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status2 = STEP_RESULT;
                        step2 = result2;
                        run4(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status2 = RETURN;
                  fail2 = util.left(step2._1);
                  step2 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step2 = step2._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status2 = CONTINUE;
                  step2 = step2._1;
                  break;
                case FORK:
                  status2 = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step2._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step2._1) {
                    tmp.run();
                  }
                  step2 = util.right(tmp);
                  break;
                case SEQ:
                  status2 = CONTINUE;
                  step2 = sequential2(util, supervisor, step2._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status2 = COMPLETED;
                step2 = interrupt || fail2 || step2;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status2 = RETURN;
                    } else if (fail2) {
                      status2 = CONTINUE;
                      step2 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status2 = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status2 = STEP_BIND;
                      step2 = util.fromRight(step2);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step2);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status2 = CONTINUE;
                        step2 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step2 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail2), attempts, interrupt);
                    status2 = CONTINUE;
                    step2 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status2 = RETURN;
                    step2 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step2));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step2) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step2);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status2 = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join5) {
        return function() {
          if (status2 === COMPLETED) {
            rethrow = rethrow && join5.rethrow;
            join5.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join5;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error3, cb2) {
        return function() {
          if (status2 === COMPLETED) {
            cb2(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb2(util.right(void 0));
            }
          })();
          switch (status2) {
            case SUSPENDED:
              interrupt = util.left(error3);
              status2 = COMPLETED;
              step2 = interrupt;
              run4(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                if (status2 === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error3)), attempts, interrupt);
                }
                status2 = RETURN;
                step2 = null;
                fail2 = null;
                run4(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error3);
              }
              if (bracketCount === 0) {
                status2 = RETURN;
                step2 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join4(cb2) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb2
          })();
          if (status2 === SUSPENDED) {
            run4(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join4,
        onComplete,
        isSuspended: function() {
          return status2 === SUSPENDED;
        },
        run: function() {
          if (status2 === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run4(runTick);
              });
            } else {
              run4(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb2) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error3, par2, cb3) {
        var step2 = par2;
        var head3 = null;
        var tail3 = null;
        var count2 = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step2.tag) {
              case FORKED:
                if (step2._3 === EMPTY) {
                  tmp = fibers[step2._1];
                  kills2[count2++] = tmp.kill(error3, function(result) {
                    return function() {
                      count2--;
                      if (count2 === 0) {
                        cb3(result)();
                      }
                    };
                  });
                }
                if (head3 === null) {
                  break loop;
                }
                step2 = head3._2;
                if (tail3 === null) {
                  head3 = null;
                } else {
                  head3 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head3) {
                  tail3 = new Aff2(CONS, head3, tail3);
                }
                head3 = step2;
                step2 = step2._1;
                break;
            }
          }
        if (count2 === 0) {
          cb3(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count2;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join4(result, head3, tail3) {
        var fail2, step2, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step2 = null;
        } else {
          step2 = result;
          fail2 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head3 === null) {
              cb2(fail2 || step2)();
              return;
            }
            if (head3._3 !== EMPTY) {
              return;
            }
            switch (head3.tag) {
              case MAP:
                if (fail2 === null) {
                  head3._3 = util.right(head3._1(util.fromRight(step2)));
                  step2 = head3._3;
                } else {
                  head3._3 = fail2;
                }
                break;
              case APPLY:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (fail2) {
                  head3._3 = fail2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail2 === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(fail2, null, null);
                      } else {
                        join4(fail2, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head3._3 = step2;
                }
                break;
              case ALT:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail2 = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head3._3 = fail2;
                } else {
                  head3._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(step2, null, null);
                      } else {
                        join4(step2, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head3 = null;
            } else {
              head3 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve5(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join4(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run4() {
        var status2 = CONTINUE;
        var step2 = par;
        var head3 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status2) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head3) {
                      tail3 = new Aff2(CONS, head3, tail3);
                    }
                    head3 = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status2 = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head3, tail3), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve5(step2)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head3 === null) {
                  break loop;
                }
                if (head3._1 === EMPTY) {
                  head3._1 = step2;
                  status2 = CONTINUE;
                  step2 = head3._2;
                  head3._2 = EMPTY;
                } else {
                  head3._2 = step2;
                  step2 = head3;
                  if (tail3 === null) {
                    head3 = null;
                  } else {
                    head3 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root = step2;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error3, cb3) {
        interrupt = util.left(error3);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error3, root, cb3);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run4();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb2) {
        return function() {
          return runPar(util, supervisor, par, cb2);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Effect.Class/index.js
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map11 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var withExceptT = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return function(f) {
      return function(v) {
        var mapLeft = function(v1) {
          return function(v2) {
            if (v2 instanceof Right) {
              return new Right(v2.value0);
            }
            ;
            if (v2 instanceof Left) {
              return new Left(v1(v2.value0));
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [v1.constructor.name, v2.constructor.name]);
          };
        };
        return map112(mapLeft(f))(v);
      };
    };
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map112 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map112(map11(f)));
      }
    };
  };
  var except = function(dictApplicative) {
    var $185 = pure(dictApplicative);
    return function($186) {
      return ExceptT($185($186));
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind8(v)(either(function($187) {
            return pure9(Left.create($187));
          })(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential2 = sequential(dictParallel);
    var parallel3 = parallel(dictParallel);
    return function(dictApplicative) {
      var traverse_2 = traverse_(dictApplicative);
      return function(dictFoldable) {
        var traverse_1 = traverse_2(dictFoldable);
        return function(f) {
          var $51 = traverse_1(function($53) {
            return parallel3(f($53));
          });
          return function($52) {
            return sequential2($51($52));
          };
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictApplicative) {
      var parTraverse_2 = parTraverse_1(dictApplicative);
      return function(dictFoldable) {
        return parTraverse_2(dictFoldable)(identity10);
      };
    };
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy5 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void8 = /* @__PURE__ */ $$void(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do8() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($75) {
    return $$void8(launchAff($75));
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy5("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Apply0: function() {
      return applyAff;
    },
    Apply1: function() {
      return applyParAff;
    }
  };
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var applicativeParAff = {
    pure: function($76) {
      return parallel2(pure22($76));
    },
    Apply0: function() {
      return applyParAff;
    }
  };
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v(err), v1(err)]);
        };
      };
    }
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($77) {
    return Canceler($$const(liftEffect2($77)));
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Web.Event.Event/index.js
  var target5 = function($3) {
    return toMaybe(_target($3));
  };

  // output/Deku.DOM.Attributes/index.js
  var klass = function(dictFunctor) {
    return map(dictFunctor)(function() {
      var $2636 = prop$prime("class");
      return function($2637) {
        return unsafeAttribute($2636($2637));
      };
    }());
  };
  var klass_ = function(dictApplicative) {
    var $2638 = klass(dictApplicative.Apply0().Functor0());
    var $2639 = pure(dictApplicative);
    return function($2640) {
      return $2638($2639($2640));
    };
  };

  // output/Deku.Effect/index.js
  var liftST6 = /* @__PURE__ */ liftST(monadSTEffect);
  var alt6 = /* @__PURE__ */ alt(altPoll);
  var pure15 = /* @__PURE__ */ pure(applicativeAPoll2);
  var sample4 = /* @__PURE__ */ sample2(pollableEvent);
  var $$void9 = /* @__PURE__ */ $$void(functorST);
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var useState$prime = function __do2() {
    var v = liftST6(create4)();
    return new Tuple(v.push, v.poll);
  };
  var useState = function(a) {
    return function __do8() {
      var v = useState$prime();
      return new Tuple(v.value0, alt6(pure15(a))(v.value1));
    };
  };
  var useRefST = function(a) {
    return function(e) {
      return function __do8() {
        var r = liftST6(newSTRef(a))();
        var ep = liftST6(create)();
        var u = subscribe(sample4(e)(ep.event))(function(aa) {
          return liftST6($$void9(write2(aa)(r)));
        })();
        ep.push(identity11)();
        return new Tuple(u, read2(r));
      };
    };
  };
  var useHot = function(a) {
    return function __do8() {
      var v = useState$prime();
      var v1 = useRefST(a)(v.value1)();
      return new Tuple(v1.value0, new Tuple(v.value0, alt6(stToPoll2(v1.value1))(v.value1)));
    };
  };

  // output/Deku.Hooks/index.js
  var mapAccum2 = /* @__PURE__ */ mapAccum(isEventPoll);
  var alt7 = /* @__PURE__ */ alt(altPoll);
  var filterMap5 = /* @__PURE__ */ filterMap(filterablePoll);
  var switcher = function(f) {
    return function(poll2) {
      var counter = function() {
        var fn = function(a) {
          return function(b) {
            return new Tuple(a + 1 | 0, new Tuple(a, b));
          };
        };
        return mapAccum2(fn)(0);
      }();
      return bind3(useSplit(counter(poll2)))(function(v) {
        return bind3(useDeflect(counter(poll2)))(function(dctr) {
          return bind3(useDynAtBeginningWith(alt7(v.second)(dctr))({
            sendTo: dynOptions.sendTo,
            remove: function(v2) {
              return filterMap5(function(v3) {
                var $17 = v3.value0 === (v2.value0 + 1 | 0);
                if ($17) {
                  return new Just(unit);
                }
                ;
                return Nothing.value;
              })(v.first);
            }
          }))(function(v1) {
            return f(snd(v1.value));
          });
        });
      });
    };
  };
  var switcherFlipped = function(a) {
    return function(b) {
      return switcher(b)(a);
    };
  };

  // output/Deku.Interpret/foreign.js
  var getPreviousCb = (s, e) => {
    return e[`$$${s}`] ? e[`$$${s}`] : null;
  };
  var deletePreviousCb = (s, e) => {
    delete e[`$$${s}`];
  };
  var setPreviousCb = (s, cb2, e) => {
    e[`$$${s}`] = cb2;
  };

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.String.Common/foreign.js
  var replace2 = function(s1) {
    return function(s2) {
      return function(s3) {
        return s3.replace(s1, s2);
      };
    };
  };
  var toLower = function(s) {
    return s.toLowerCase();
  };

  // output/Deku.JSMap/foreign.js
  var getImpl = (k, m) => m.get(k);

  // output/Deku.UnsafeDOM/foreign.js
  var unsafeParentNode = (e) => e.parentNode;
  var createElement = (t) => document.createElement(t);
  var createElementNS = (ns, t) => document.createElementNS(ns, t);
  var insertBefore = (node1, node2, parent2) => parent2.insertBefore(node1, node2);
  var appendChild = (node, parent2) => parent2.appendChild(node);
  var toTemplate = (s) => {
    const template = document.createElement("template");
    template.innerHTML = s;
    return template;
  };
  var cloneTemplate = (template) => template.content.cloneNode(true).firstChild;
  var outerHTML = (e) => e.outerHTML;
  var setTextContent = (value12, node) => node.textContent = value12;
  var addEventListener = (type, listener, useCapture, target6) => target6.addEventListener(type, listener, useCapture);
  var removeEventListener = (type, listener, useCapture, target6) => target6.removeEventListener(type, listener, useCapture);
  var eventListener = (fn) => fn;

  // output/Effect.Console/foreign.js
  var error2 = function(s) {
    return function() {
      console.error(s);
    };
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Foreign/foreign.js
  function typeOf(value12) {
    return typeof value12;
  }
  function tagOf(value12) {
    return Object.prototype.toString.call(value12).slice(8, -1);
  }
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Data.List.NonEmpty/index.js
  var singleton6 = /* @__PURE__ */ function() {
    var $200 = singleton3(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();

  // output/Foreign/index.js
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton6($154));
    };
  };
  var readArray = function(dictMonad) {
    var pure18 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(value12) {
      if (isArray(value12)) {
        return pure18(unsafeFromForeign(value12));
      }
      ;
      if (otherwise) {
        return fail1(new TypeMismatch("array", tagOf(value12)));
      }
      ;
      throw new Error("Failed pattern match at Foreign (line 164, column 1 - line 164, column 99): " + [value12.constructor.name]);
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure18 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value12) {
        if (tagOf(value12) === tag) {
          return pure18(unsafeFromForeign(value12));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value12)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value12.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Untagged.TypeCheck/index.js
  var hasRuntimeType = function(dict) {
    return dict.hasRuntimeType;
  };
  var hasJsType = function(name15) {
    return function(x) {
      return typeOf(x) === name15;
    };
  };
  var hasRuntimeTypeUndefined = {
    hasRuntimeType: function(v) {
      return hasJsType("undefined");
    }
  };

  // output/Untagged.Union/index.js
  var withOneOf = function(dictHasRuntimeType) {
    var hasRuntimeType2 = hasRuntimeType(dictHasRuntimeType);
    return function(f) {
      return function(g) {
        return function(o) {
          var isTypeA = hasRuntimeType2($$Proxy.value);
          var $42 = isTypeA(unsafeToForeign(o));
          if ($42) {
            return f(o);
          }
          ;
          return g(o);
        };
      };
    };
  };
  var toEither1 = function(dictHasRuntimeType) {
    return withOneOf(dictHasRuntimeType)(Left.create)(Right.create);
  };

  // output/Web.DOM.ChildNode/foreign.js
  function remove(node) {
    return function() {
      return node.remove();
    };
  }

  // output/Web.DOM.Comment/index.js
  var toNode = unsafeCoerce2;

  // output/Web.DOM.Document/foreign.js
  var getEffProp = function(name15) {
    return function(doc) {
      return function() {
        return doc[name15];
      };
    };
  };
  var url = getEffProp("URL");
  var documentURI = getEffProp("documentURI");
  var origin2 = getEffProp("origin");
  var compatMode = getEffProp("compatMode");
  var characterSet = getEffProp("characterSet");
  var contentType = getEffProp("contentType");
  var _documentElement2 = getEffProp("documentElement");
  function createTextNode(data) {
    return function(doc) {
      return function() {
        return doc.createTextNode(data);
      };
    };
  }
  function createComment(data) {
    return function(doc) {
      return function() {
        return doc.createComment(data);
      };
    };
  }

  // output/Web.DOM.Document/index.js
  var toNonElementParentNode = unsafeCoerce2;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");
  function setAttribute(name15) {
    return function(value12) {
      return function(element) {
        return function() {
          element.setAttribute(name15, value12);
        };
      };
    };
  }
  function _getAttribute(name15) {
    return function(element) {
      return function() {
        return element.getAttribute(name15);
      };
    };
  }
  function removeAttribute(name15) {
    return function(element) {
      return function() {
        element.removeAttribute(name15);
      };
    };
  }

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp2("children");
  var _firstElementChild = getEffProp2("firstElementChild");
  var _lastElementChild = getEffProp2("lastElementChild");
  var childElementCount = getEffProp2("childElementCount");
  function querySelectorAll(selector) {
    return function(node) {
      return function() {
        return node.querySelectorAll(selector);
      };
    };
  }

  // output/Web.DOM.Element/index.js
  var map14 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toNode2 = unsafeCoerce2;
  var toEventTarget = unsafeCoerce2;
  var toChildNode = unsafeCoerce2;
  var getAttribute = function(attr) {
    var $6 = map14(toMaybe);
    var $7 = _getAttribute(attr);
    return function($8) {
      return $6($7($8));
    };
  };
  var fromNode = /* @__PURE__ */ unsafeReadProtoTagged("Element");
  var fromEventTarget2 = /* @__PURE__ */ unsafeReadProtoTagged("Element");

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  function nodeTypeIndex(node) {
    return node.nodeType;
  }
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function replaceChild(newChild) {
    return function(oldChild) {
      return function(parent2) {
        return function() {
          parent2.replaceChild(newChild, oldChild);
        };
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map15 = /* @__PURE__ */ map(functorEffect);
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map15(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();
  var lastChild = /* @__PURE__ */ function() {
    var $23 = map15(toMaybe);
    return function($24) {
      return $23(_lastChild($24));
    };
  }();
  var firstChild = /* @__PURE__ */ function() {
    var $25 = map15(toMaybe);
    return function($26) {
      return $25(_firstChild($26));
    };
  }();

  // output/Web.DOM.NodeList/foreign.js
  function toArray(list) {
    return function() {
      return [].slice.call(list);
    };
  }

  // output/Web.DOM.Text/index.js
  var toNode3 = unsafeCoerce2;
  var toChildNode2 = unsafeCoerce2;

  // output/Deku.Interpret/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var for_4 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var bind12 = /* @__PURE__ */ bind(bindMaybe);
  var toEither12 = /* @__PURE__ */ toEither1(hasRuntimeTypeUndefined);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void10 = /* @__PURE__ */ $$void(functorEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorMaybe);
  var coerce4 = /* @__PURE__ */ coerce();
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorMaybe);
  var max6 = /* @__PURE__ */ max(ordInt);
  var ifM2 = /* @__PURE__ */ ifM(bindEffect);
  var voidLeft1 = /* @__PURE__ */ voidLeft(functorEffect);
  var map16 = /* @__PURE__ */ map(functorEffect);
  var tailRecM4 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexObject);
  var liftST7 = /* @__PURE__ */ liftST(monadSTEffect);
  var show2 = /* @__PURE__ */ show(/* @__PURE__ */ showMaybe(showString));
  var show1 = /* @__PURE__ */ show(/* @__PURE__ */ showArray(showString));
  var unwrap2 = /* @__PURE__ */ unwrap();
  var unsetAttributeEffect = function(elt$prime, v) {
    var l = getPreviousCb(v, elt$prime);
    var asElt = fromDekuElement(elt$prime);
    var eventTarget = toEventTarget(asElt);
    for_4(toMaybe(l))(function(toRemove) {
      return function __do8() {
        removeEventListener(v, toRemove, false, eventTarget);
        return deletePreviousCb(v, elt$prime);
      };
    })();
    return removeAttribute(v)(asElt)();
  };
  var uk3D = "ul3D";
  var setTextEffect = function(txt$prime, str) {
    var txt = fromDekuText(txt$prime);
    return setTextContent(str, toNode3(txt));
  };
  var setDelegateCbEffect = /* @__PURE__ */ mkEffectFn3(function(elt$prime) {
    return function(v) {
      return function(mp) {
        var eventTarget = toEventTarget(fromDekuElement(elt$prime));
        return function __do8() {
          var nl = eventListener(function(ev) {
            return for_4(bind12(target5(ev))(fromEventTarget2))(function(t) {
              return function __do9() {
                var oo = getImpl(t, mp);
                var v1 = toEither12(oo);
                if (v1 instanceof Left) {
                  return unit;
                }
                ;
                if (v1 instanceof Right) {
                  var v2 = lookup2(v)(v1.value0);
                  if (v2 instanceof Just) {
                    return $$void10(v2.value0(ev))();
                  }
                  ;
                  if (v2 instanceof Nothing) {
                    return unit;
                  }
                  ;
                  throw new Error("Failed pattern match at Deku.Interpret (line 445, column 24 - line 447, column 33): " + [v2.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at Deku.Interpret (line 443, column 9 - line 447, column 33): " + [v1.constructor.name]);
              };
            })();
          });
          return addEventListener(v, nl, false, eventTarget);
        };
      };
    };
  });
  var setCbEffect = function(elt$prime, v, v1) {
    var $96 = v === "@self@";
    if ($96) {
      return $$void10(v1(elt$prime))();
    }
    ;
    var l = getPreviousCb(v, elt$prime);
    var eventTarget = toEventTarget(fromDekuElement(elt$prime));
    for_4(toMaybe(l))(function(toRemove) {
      return function() {
        return removeEventListener(v, toRemove, false, eventTarget);
      };
    })();
    var nl = eventListener(mkEffectFn1(v1));
    addEventListener(v, nl, false, eventTarget);
    return setPreviousCb(v, nl, elt$prime);
  };
  var removeForTextEffect = function(v, t) {
    return remove(toChildNode2(fromDekuText(t)))();
  };
  var removeForElementEffect = function(v, e) {
    return remove(toChildNode(fromDekuElement(e)))();
  };
  var queryAttrWithParent = function(att, me) {
    var nl = querySelectorAll("[" + (att + "]"))(toParentNode(me))();
    var hasAttr = getAttribute(att)(me)();
    var arr = toArray(nl)();
    return maybe(arr)(snoc(arr))(voidLeft3(hasAttr)(toNode2(me)));
  };
  var makeTextEffect = function(mstr) {
    var doc = bind4(windowImpl)(document2)();
    var txt = createTextNode(fromMaybe("")(mstr))(toDocument(doc))();
    return toDekuText(txt);
  };
  var makeElementEffect = function(ns, tag) {
    var elt = function() {
      var v = coerce4(ns);
      if (v instanceof Nothing) {
        return createElement(coerce4(tag));
      }
      ;
      if (v instanceof Just) {
        return createElementNS(coerce4(v.value0), coerce4(tag));
      }
      ;
      throw new Error("Failed pattern match at Deku.Interpret (line 74, column 10 - line 76, column 71): " + [v.constructor.name]);
    }();
    return toDekuElement(elt);
  };
  var makeCloseBeaconEffect = function __do3() {
    var doc = bind4(windowImpl)(document2)();
    var cm = createComment(uk3D)(toDocument(doc))();
    return toDekuBeacon(cm);
  };
  var getDisableable = function(elt) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        var v1 = function(v2) {
          if (v instanceof Cons) {
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Deku.Interpret (line 401, column 1 - line 401, column 69): " + [v.constructor.name]);
        };
        if (v instanceof Cons) {
          var $110 = runExists(function(v2) {
            return mapFlipped3(v2.e(elt))(function(e$prime) {
              return mkExists({
                f: v2.f,
                e: e$prime
              });
            });
          })(v.value0);
          if ($110 instanceof Just) {
            $tco_done = true;
            return new Just($110.value0);
          }
          ;
          return v1(true);
        }
        ;
        return v1(true);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return go2;
  };
  var doInsertAtEnd$prime = function(nd) {
    return function(end) {
      return function __do8() {
        var x = unsafeParentNode(toNode(fromDekuBeacon(end)));
        return insertBefore(nd, toNode(fromDekuBeacon(end)), x);
      };
    };
  };
  var disableables = /* @__PURE__ */ function() {
    return new Cons(mkExists({
      e: fromElement,
      f: setDisabled
    }), new Cons(mkExists({
      e: fromElement3,
      f: setDisabled3
    }), new Cons(mkExists({
      e: fromElement2,
      f: setDisabled2
    }), new Cons(mkExists({
      e: fromElement4,
      f: setDisabled4
    }), new Cons(mkExists({
      e: fromElement5,
      f: setDisabled5
    }), new Cons(mkExists({
      e: fromElement6,
      f: setDisabled6
    }), new Cons(mkExists({
      e: fromElement7,
      f: setDisabled7
    }), new Cons(mkExists({
      e: fromElement8,
      f: setDisabled8
    }), new Cons(mkExists({
      e: fromElement9,
      f: setDisabled9
    }), Nil.value)))))))));
  }();
  var setPropEffect = function(elt$prime, v, v1) {
    var elt = fromDekuElement(elt$prime);
    var o = function() {
      var v3 = function(v4) {
        var v5 = function(v6) {
          var v7 = function(v8) {
            var v9 = function(v10) {
              if (otherwise) {
                return setAttribute(v)(v1)(elt);
              }
              ;
              throw new Error("Failed pattern match at Deku.Interpret (line 412, column 1 - line 412, column 30): ");
            };
            var $116 = v === "disabled";
            if ($116) {
              var $117 = getDisableable(elt)(disableables);
              if ($117 instanceof Just) {
                return runExists(function(v10) {
                  return v10.f(v1 === "true")(v10.e);
                })($117.value0);
              }
              ;
              return v9(true);
            }
            ;
            return v9(true);
          };
          var $122 = v === "checked";
          if ($122) {
            var $123 = fromElement3(elt);
            if ($123 instanceof Just) {
              return setChecked(v1 === "true")($123.value0);
            }
            ;
            return v7(true);
          }
          ;
          return v7(true);
        };
        var $125 = v === "value";
        if ($125) {
          var $126 = fromElement9(elt);
          if ($126 instanceof Just) {
            return setValue11(v1)($126.value0);
          }
          ;
          return v5(true);
        }
        ;
        return v5(true);
      };
      var $128 = v === "value";
      if ($128) {
        var $129 = fromElement3(elt);
        if ($129 instanceof Just) {
          return setValue3(v1)($129.value0);
        }
        ;
        return v3(true);
      }
      ;
      return v3(true);
    }();
    return o();
  };
  var d3kU = "d3kU";
  var ffwd = function(v) {
    return function __do8() {
      var nxt = nextSibling(v.node)();
      var v2 = nodeTypeIndex(v.node);
      if (nxt instanceof Nothing) {
        return new Done({
          cpos: v.cpos,
          sb: Nothing.value
        });
      }
      ;
      if (nxt instanceof Just && (v2 === 1 && v.n === 0)) {
        return new Done({
          cpos: v.cpos,
          sb: new Just(nxt.value0)
        });
      }
      ;
      if (nxt instanceof Just && (v2 === 3 && v.n === 0)) {
        return new Done({
          cpos: v.cpos,
          sb: new Just(nxt.value0)
        });
      }
      ;
      if (nxt instanceof Just && v2 === 8) {
        var ctext = textContent(v.node)();
        if (ctext === d3kU) {
          return new Loop({
            n: v.n + 1 | 0,
            node: nxt.value0,
            cpos: v.cpos
          });
        }
        ;
        if (ctext === uk3D && v.n === 1) {
          return new Done({
            cpos: v.cpos,
            sb: new Just(nxt.value0)
          });
        }
        ;
        if (ctext === uk3D) {
          return new Loop({
            n: v.n - 1 | 0,
            node: nxt.value0,
            cpos: v.cpos
          });
        }
        ;
        if (otherwise) {
          return new Loop({
            n: v.n,
            node: nxt.value0,
            cpos: v.cpos
          });
        }
        ;
        throw new Error("Failed pattern match at Deku.Interpret (line 99, column 7 - line 109, column 59): " + [ctext.constructor.name]);
      }
      ;
      if (nxt instanceof Just) {
        return new Loop({
          n: v.n,
          node: nxt.value0,
          cpos: v.cpos
        });
      }
      ;
      throw new Error("Failed pattern match at Deku.Interpret (line 91, column 3 - line 111, column 55): " + [nxt.constructor.name, v2.constructor.name, v.n.constructor.name]);
    };
  };
  var makeOpenBeaconEffect = function __do4() {
    var doc = bind4(windowImpl)(document2)();
    var cm = createComment(d3kU)(toDocument(doc))();
    return toDekuBeacon(cm);
  };
  var attributeTextParentEffect = function(txt, v) {
    return appendChild(toNode3(fromDekuText(txt)), toNode2(fromDekuElement(v)));
  };
  var attributeElementParentEffect = function(v, v1) {
    return appendChild(toNode2(fromDekuElement(v)), toNode2(fromDekuElement(v1)));
  };
  var attributeDynParentForNodeEffectLucky = function(nd, start2, end, mpos) {
    var startNode = toNode(fromDekuBeacon(start2));
    var endNode = toNode(fromDekuBeacon(end));
    var doInsertAtEnd = doInsertAtEnd$prime(nd)(end);
    var par = unsafeParentNode(startNode);
    if (mpos instanceof Just) {
      var cn = childNodes(par)();
      var asArr = toArray(cn)();
      var startIx$prime = findIndex(unsafeRefEq(startNode))(asArr);
      var endIx$prime = findIndex(unsafeRefEq(endNode))(asArr);
      return for_4(startIx$prime)(function(startIx) {
        return for_4(endIx$prime)(function(endIx) {
          var $147 = mpos.value0 >= (endIx - startIx | 0);
          if ($147) {
            return doInsertAtEnd;
          }
          ;
          return for_4(index(asArr)((startIx + 1 | 0) + max6(mpos.value0)(0) | 0))(function(nn) {
            return function() {
              return insertBefore(nd, nn, par);
            };
          });
        });
      })();
    }
    ;
    return doInsertAtEnd();
  };
  var attributeDynParentForNodeEffect = function(nd, start2, end, mpos) {
    var doInsertAtEnd = doInsertAtEnd$prime(nd)(end);
    if (mpos instanceof Just) {
      var go2 = function(v) {
        if (v instanceof Left) {
          var $151 = v.value0.cpos >= mpos.value0;
          if ($151) {
            return function __do8() {
              var x = unsafeParentNode(v.value0.curSib);
              insertBefore(nd, v.value0.curSib, x);
              return new Done(unit);
            };
          }
          ;
          return ifM2(function() {
            var $152 = nodeTypeIndex(v.value0.curSib) !== 8;
            if ($152) {
              return pure8(false);
            }
            ;
            return function __do8() {
              var ctext = textContent(v.value0.curSib)();
              return ctext === uk3D;
            };
          }())(voidLeft1(doInsertAtEnd)(new Done(unit)))(map16(function($220) {
            return Loop.create(Right.create($220));
          })(ffwd({
            n: 0,
            node: v.value0.curSib,
            cpos: v.value0.cpos
          })));
        }
        ;
        if (v instanceof Right && v.value0 instanceof Loop) {
          return map16(function($221) {
            return Loop.create(Right.create($221));
          })(ffwd(v.value0.value0));
        }
        ;
        if (v instanceof Right && v.value0 instanceof Done) {
          if (v.value0.value0.sb instanceof Just) {
            return pure8(new Loop(new Left({
              curSib: v.value0.value0.sb.value0,
              cpos: v.value0.value0.cpos + 1 | 0
            })));
          }
          ;
          if (v.value0.value0.sb instanceof Nothing) {
            return voidLeft1(doInsertAtEnd)(new Done(unit));
          }
          ;
          throw new Error("Failed pattern match at Deku.Interpret (line 153, column 13 - line 156, column 52): " + [v.value0.value0.sb.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Deku.Interpret (line 132, column 11 - line 150, column 71): " + [v.constructor.name]);
      };
      var firstOrEnd = nextSibling(toNode(fromDekuBeacon(start2)))();
      if (firstOrEnd instanceof Just) {
        return tailRecM4(go2)(new Left({
          cpos: 0,
          curSib: firstOrEnd.value0
        }))();
      }
      ;
      if (firstOrEnd instanceof Nothing) {
        return error2("Programming error: no boundary found in attributeDynParentForNodeEffect")();
      }
      ;
      throw new Error("Failed pattern match at Deku.Interpret (line 158, column 9 - line 161, column 86): " + [firstOrEnd.constructor.name]);
    }
    ;
    if (mpos instanceof Nothing) {
      return doInsertAtEnd();
    }
    ;
    throw new Error("Failed pattern match at Deku.Interpret (line 129, column 5 - line 162, column 31): " + [mpos.constructor.name]);
  };
  var attributeDynParentForTextEffect = function(lucky, txt, start2, end, mpos) {
    var l = read(lucky)();
    if (l) {
      return attributeDynParentForNodeEffectLucky(toNode3(fromDekuText(txt)), start2, end, mpos);
    }
    ;
    return attributeDynParentForNodeEffect(toNode3(fromDekuText(txt)), start2, end, mpos);
  };
  var sendToPosForTextEffect = function(lucky, i, b, st, ed) {
    removeForTextEffect(true, b);
    return attributeDynParentForTextEffect(lucky, b, st, ed, new Just(i));
  };
  var attributeDynParentForElementEffect = function(lucky, v, start2, end, mpos) {
    var l = read(lucky)();
    if (l) {
      return attributeDynParentForNodeEffectLucky(toNode2(fromDekuElement(v)), start2, end, mpos);
    }
    ;
    return attributeDynParentForNodeEffect(toNode2(fromDekuElement(v)), start2, end, mpos);
  };
  var sendToPosForElementEffect = function(lucky, i, b, st, ed) {
    removeForElementEffect(true, b);
    return attributeDynParentForElementEffect(lucky, b, st, ed, new Just(i));
  };
  var attributeDynParentForBeaconsEffect = function(i, o, start2, end, mpos) {
    var oo = toNode(fromDekuBeacon(o));
    var ii = toNode(fromDekuBeacon(i));
    attributeDynParentForNodeEffect(oo, start2, end, mpos);
    var x = unsafeParentNode(oo);
    return insertBefore(ii, oo, x);
  };
  var attributeBeaconParentEffect = function(beacon, v) {
    return appendChild(toNode(fromDekuBeacon(beacon)), toNode2(fromDekuElement(v)));
  };
  var attributeBeaconFullRangeParentProto = function(skipFirst, mover, initial) {
    var go2 = function(v) {
      return function __do8() {
        var nxt = nextSibling(v.node)();
        mover(v.node)();
        if (nxt instanceof Nothing) {
          error2("Programming error: attributeBeaconFullRangeParentProto out of range")();
          return new Done(unit);
        }
        ;
        if (nxt instanceof Just) {
          var v1 = nodeTypeIndex(nxt.value0);
          if (v1 === 8) {
            var ctext = textContent(nxt.value0)();
            if (ctext === d3kU) {
              return new Loop({
                n: v.n + 1 | 0,
                node: nxt.value0
              });
            }
            ;
            if (ctext === uk3D && v.n === 0) {
              mover(nxt.value0)();
              return new Done(unit);
            }
            ;
            if (ctext === uk3D) {
              return new Loop({
                n: v.n - 1 | 0,
                node: nxt.value0
              });
            }
            ;
            if (otherwise) {
              return new Loop({
                n: v.n,
                node: nxt.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Deku.Interpret (line 277, column 17 - line 286, column 63): " + [ctext.constructor.name]);
          }
          ;
          return new Loop({
            n: v.n,
            node: nxt.value0
          });
        }
        ;
        throw new Error("Failed pattern match at Deku.Interpret (line 269, column 11 - line 287, column 47): " + [nxt.constructor.name]);
      };
    };
    var n = function() {
      var $178 = !skipFirst;
      if ($178) {
        return 0;
      }
      ;
      var v = nodeTypeIndex(initial);
      if (v === 8) {
        var ctext = textContent(initial)();
        if (ctext === d3kU) {
          return 1;
        }
        ;
        if (otherwise) {
          return 0;
        }
        ;
        throw new Error("Failed pattern match at Deku.Interpret (line 294, column 15 - line 297, column 40): " + [ctext.constructor.name]);
      }
      ;
      return 0;
    }();
    return tailRecM4(go2)({
      n,
      node: initial
    })();
  };
  var attributeDynParentForBeaconFullRangeEffect = function(stBeacon, leftB, rightB, mpos) {
    var nsOld = nextSibling(toNode(fromDekuBeacon(stBeacon)))();
    attributeDynParentForNodeEffect(toNode(fromDekuBeacon(stBeacon)), leftB, rightB, mpos);
    var par$prime = unsafeParentNode(toNode(fromDekuBeacon(stBeacon)));
    var ns = nextSibling(toNode(fromDekuBeacon(stBeacon)))();
    if (ns instanceof Just && nsOld instanceof Just) {
      return attributeBeaconFullRangeParentProto(true, function(i) {
        return function() {
          return insertBefore(i, ns.value0, par$prime);
        };
      }, nsOld.value0);
    }
    ;
    return error2("Programming error: attributeDynParentForBeaconFullRangeEffect cannot find parent")();
  };
  var makePursxEffect = /* @__PURE__ */ mkEffectFn5(function(v) {
    return function(v1) {
      return function(replacements) {
        return function(ps) {
          return function(di) {
            var v2 = foldrWithIndex2(function(i) {
              return function(v3) {
                return function(r) {
                  if (v3 instanceof PXNut) {
                    return {
                      atts: r.atts,
                      foldedHtml: replace2(v1 + (i + v1))('<span data-deku-elt-internal="' + (i + '"></span>'))(r.foldedHtml),
                      nuts: insert2(i)(v3.value0)(r.nuts)
                    };
                  }
                  ;
                  if (v3 instanceof PXAttr) {
                    return {
                      nuts: r.nuts,
                      foldedHtml: replace2(v1 + (i + v1))('data-deku-attr-internal="' + (i + '"'))(r.foldedHtml),
                      atts: insert2(i)(v3.value0)(r.atts)
                    };
                  }
                  ;
                  if (v3 instanceof PXStr) {
                    return {
                      atts: r.atts,
                      nuts: r.nuts,
                      foldedHtml: replace2(v1 + (i + v1))(v3.value0)(r.foldedHtml)
                    };
                  }
                  ;
                  throw new Error("Failed pattern match at Deku.Interpret (line 569, column 21 - line 593, column 16): " + [v3.constructor.name]);
                };
              };
            })({
              atts: empty7,
              nuts: empty7,
              foldedHtml: v
            })(replacements);
            return function __do8() {
              var eltX = toTemplate(v2.foldedHtml);
              var elt = cloneTemplate(eltX);
              eltAttribution(ps, di, toDekuElement(elt));
              var arr = queryAttrWithParent("data-deku-attr-internal", elt);
              foreachE(arr)(function(nd) {
                var v3 = fromNode(nd);
                if (v3 instanceof Just) {
                  return function __do9() {
                    var attTag = getAttribute("data-deku-attr-internal")(v3.value0)();
                    var v4 = bind12(attTag)(flip(lookup2)(v2.atts));
                    if (v4 instanceof Just) {
                      var star = liftST7(newSTArray)();
                      return handleAtts(di)(toDekuElement(v3.value0))(star)([v4.value0])();
                    }
                    ;
                    if (v4 instanceof Nothing) {
                      return error2("Programming error: att not found in pursx " + (show2(attTag) + (" " + show1(keys(v2.atts)))))();
                    }
                    ;
                    throw new Error("Failed pattern match at Deku.Interpret (line 605, column 11 - line 616, column 18): " + [v4.constructor.name]);
                  };
                }
                ;
                if (v3 instanceof Nothing) {
                  return error2("Programming error: non-element with attr-internal tag");
                }
                ;
                throw new Error("Failed pattern match at Deku.Interpret (line 602, column 7 - line 619, column 68): " + [v3.constructor.name]);
              })();
              var arrrrrr = queryAttrWithParent("data-deku-elt-internal", elt);
              foreachE(arrrrrr)(function(nd) {
                var v3 = fromNode(nd);
                if (v3 instanceof Just) {
                  return function __do9() {
                    var eltTag = getAttribute("data-deku-elt-internal")(v3.value0)();
                    var v4 = bind12(eltTag)(flip(lookup2)(v2.nuts));
                    if (v4 instanceof Just) {
                      var x$prime = unsafeParentNode(toNode2(v3.value0));
                      var v5 = fromNode(x$prime);
                      if (v5 instanceof Nothing) {
                        return error2("Programming error: could not find parent for pursx element")();
                      }
                      ;
                      if (v5 instanceof Just) {
                        var myNut = v4.value0({
                          parent: toDekuElement(v5.value0),
                          fromPortal: false,
                          unsubs: [],
                          beacon: Nothing.value
                        }, di);
                        if (myNut instanceof DekuElementOutcome) {
                          return replaceChild(toNode2(fromDekuElement(myNut.value0)))(toNode2(v3.value0))(toNode2(v5.value0))();
                        }
                        ;
                        if (myNut instanceof DekuTextOutcome) {
                          return replaceChild(toNode3(fromDekuText(myNut.value0)))(toNode2(v3.value0))(toNode2(v5.value0))();
                        }
                        ;
                        if (myNut instanceof DekuBeaconOutcome) {
                          attributeBeaconFullRangeParentProto(false, function(i) {
                            return function() {
                              return insertBefore(i, toNode2(v3.value0), toNode2(v5.value0));
                            };
                          }, toNode(fromDekuBeacon(myNut.value0)));
                          return remove(toChildNode(v3.value0))();
                        }
                        ;
                        if (myNut instanceof NoOutcome) {
                          return unit;
                        }
                        ;
                        throw new Error("Failed pattern match at Deku.Interpret (line 643, column 19 - line 662, column 43): " + [myNut.constructor.name]);
                      }
                      ;
                      throw new Error("Failed pattern match at Deku.Interpret (line 629, column 15 - line 662, column 43): " + [v5.constructor.name]);
                    }
                    ;
                    if (v4 instanceof Nothing) {
                      var ohtml = outerHTML(v3.value0);
                      var parhtml = outerHTML(fromDekuElement(unwrap2(ps).parent));
                      return error2("Programming error: nut not found in pursx " + (show2(eltTag) + (" " + (v + (show1(keys(v2.atts)) + (" " + (show1(keys(v2.nuts)) + (" " + (ohtml + (" @@ " + parhtml))))))))))();
                    }
                    ;
                    throw new Error("Failed pattern match at Deku.Interpret (line 625, column 11 - line 678, column 18): " + [v4.constructor.name]);
                  };
                }
                ;
                if (v3 instanceof Nothing) {
                  return error2("Programming error: non-element with attr-internal tag");
                }
                ;
                throw new Error("Failed pattern match at Deku.Interpret (line 622, column 7 - line 681, column 68): " + [v3.constructor.name]);
              })();
              return toDekuElement(elt);
            };
          };
        };
      };
    };
  });
  var attributeBeaconFullRangeParentEffect = function(stBeacon, v) {
    return attributeBeaconFullRangeParentProto(false, function(i) {
      return function() {
        return appendChild(i, toNode2(fromDekuElement(v)));
      };
    }, toNode(fromDekuBeacon(stBeacon)));
  };
  var removeForDynEffect = function(fromPortal, l, ee) {
    var pn = unsafeParentNode(toNode(fromDekuBeacon(l)));
    var cond = function() {
      if (fromPortal) {
        return pure8(false);
      }
      ;
      return function __do8() {
        var cn = childNodes(pn)();
        var nl = toArray(cn)();
        var v = index(nl)(length(nl) - 2 | 0);
        var v1 = index(nl)(1);
        if (v1 instanceof Just && v instanceof Just) {
          return unsafeRefEq(v1.value0)(toNode(fromDekuBeacon(l))) && unsafeRefEq(v.value0)(toNode(fromDekuBeacon(ee)));
        }
        ;
        return false;
      };
    }();
    var a = function __do8() {
      var fc = firstChild(pn)();
      var lc = lastChild(pn)();
      if (fc instanceof Just && lc instanceof Just) {
        setTextContent("", pn);
        appendChild(fc.value0, pn);
        return appendChild(lc.value0, pn);
      }
      ;
      return error2("Programming error: dyn underfull")();
    };
    var b = function __do8() {
      var e = makeElementEffect(Nothing.value, "div");
      return attributeBeaconFullRangeParentEffect(l, e);
    };
    return ifM2(cond)(a)(b)();
  };
  var sendToPosForDynEffect = function(i, b, e, st, ed) {
    removeForDynEffect(true, b, e);
    return attributeDynParentForBeaconFullRangeEffect(b, st, ed, new Just(i));
  };

  // output/Deku.FullDOMInterpret/index.js
  var fullDOMInterpret = {
    makeElement: makeElementEffect,
    setProp: setPropEffect,
    setCb: setCbEffect,
    setDelegateCb: setDelegateCbEffect,
    unsetAttribute: unsetAttributeEffect,
    attributeElementParent: attributeElementParentEffect,
    attributeDynParentForElement: attributeDynParentForElementEffect,
    sendToPosForElement: sendToPosForElementEffect,
    removeForElement: removeForElementEffect,
    makeOpenBeacon: makeOpenBeaconEffect,
    makeCloseBeacon: makeCloseBeaconEffect,
    attributeBeaconParent: attributeBeaconParentEffect,
    attributeDynParentForBeacons: attributeDynParentForBeaconsEffect,
    attributeBeaconFullRangeParent: attributeBeaconFullRangeParentEffect,
    attributeDynParentForBeaconFullRange: attributeDynParentForBeaconFullRangeEffect,
    sendToPosForDyn: sendToPosForDynEffect,
    removeForDyn: removeForDynEffect,
    makeText: makeTextEffect,
    setText: setTextEffect,
    attributeTextParent: attributeTextParentEffect,
    attributeDynParentForText: attributeDynParentForTextEffect,
    sendToPosForText: sendToPosForTextEffect,
    removeForText: removeForTextEffect,
    makePursx: makePursxEffect
  };

  // output/Deku.Toplevel/index.js
  var $$void11 = /* @__PURE__ */ $$void(functorEffect);
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var map17 = /* @__PURE__ */ map(functorMaybe);
  var runInElement = function(elt) {
    return function(v) {
      return $$void11(function() {
        return v({
          parent: toDekuElement(elt),
          fromPortal: false,
          unsubs: [],
          beacon: Nothing.value
        }, fullDOMInterpret);
      });
    };
  };
  var runInBody = function(elt) {
    return function __do8() {
      var b$prime = bind5(bind5(windowImpl)(document2))(body)();
      return maybe(throwException(error("Could not find element")))(flip(runInElement)(elt))(map17(toElement)(b$prime))();
    };
  };

  // output/Effect.Random/foreign.js
  var random = Math.random;

  // output/Effect.Timer/foreign.js
  function setIntervalImpl(ms) {
    return function(fn) {
      return function() {
        return setInterval(fn, ms);
      };
    };
  }

  // output/Effect.Timer/index.js
  var setInterval2 = setIntervalImpl;

  // output/Data.String.CaseInsensitive/index.js
  var compare2 = /* @__PURE__ */ compare(ordString);
  var CaseInsensitiveString = function(x) {
    return x;
  };
  var eqCaseInsensitiveString = {
    eq: function(v) {
      return function(v1) {
        return toLower(v) === toLower(v1);
      };
    }
  };
  var ordCaseInsensitiveString = {
    compare: function(v) {
      return function(v1) {
        return compare2(toLower(v))(toLower(v1));
      };
    },
    Eq0: function() {
      return eqCaseInsensitiveString;
    }
  };

  // output/JS.Fetch.Headers/foreign.js
  function _toArray(tuple, headers2) {
    return Array.from(headers2.entries(), function(pair) {
      return tuple(pair[0])(pair[1]);
    });
  }

  // output/JS.Fetch.Headers/index.js
  var toArray3 = /* @__PURE__ */ function() {
    return runFn2(_toArray)(Tuple.create);
  }();

  // output/Fetch.Internal.Headers/index.js
  var toHeaders = /* @__PURE__ */ function() {
    var $7 = fromFoldable(ordCaseInsensitiveString)(foldableArray);
    var $8 = map(functorArray)(lmap(bifunctorTuple)(CaseInsensitiveString));
    return function($9) {
      return $7($8(toArray3($9)));
    };
  }();

  // output/JS.Fetch.Request/foreign.js
  function _unsafeNew(url3, options2) {
    try {
      return new Request(url3, options2);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  // output/Fetch.Internal.Request/index.js
  var toCoreRequestOptionsHelpe = {
    convertHelper: function(v) {
      return function(v1) {
        return {};
      };
    }
  };
  var $$new2 = function() {
    return function(url3) {
      return function(options2) {
        return function() {
          return _unsafeNew(url3, options2);
        };
      };
    };
  };
  var convertHelper = function(dict) {
    return dict.convertHelper;
  };
  var toCoreRequestOptionsRowRo = function() {
    return function() {
      return function(dictToCoreRequestOptionsHelper) {
        return {
          convert: convertHelper(dictToCoreRequestOptionsHelper)($$Proxy.value)
        };
      };
    };
  };
  var convert = function(dict) {
    return dict.convert;
  };

  // output/JS.Fetch.Response/foreign.js
  function headers(resp) {
    return resp.headers;
  }
  function ok(resp) {
    return resp.ok;
  }
  function redirected(resp) {
    return resp.redirected;
  }
  function status(resp) {
    return resp.status;
  }
  function statusText(resp) {
    return resp.statusText;
  }
  function url2(resp) {
    return resp.url;
  }
  function body2(resp) {
    return function() {
      return resp.body;
    };
  }
  function arrayBuffer(resp) {
    return function() {
      return resp.arrayBuffer();
    };
  }
  function blob(resp) {
    return function() {
      return resp.blob();
    };
  }
  function text6(resp) {
    return function() {
      return resp.text();
    };
  }
  function json(resp) {
    return function() {
      return resp.json();
    };
  }

  // output/Control.Monad.Except/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var withExcept = /* @__PURE__ */ withExceptT(functorIdentity);
  var runExcept = function($3) {
    return unwrap3(runExceptT($3));
  };

  // output/Promise.Internal/foreign.js
  function thenOrCatch(k, c, p) {
    return p.then(k, c);
  }
  function resolve(a) {
    return Promise.resolve(a);
  }

  // output/Promise.Rejection/foreign.js
  function _toError(just, nothing, ref) {
    if (ref instanceof Error) {
      return just(ref);
    }
    return nothing;
  }

  // output/Promise.Rejection/index.js
  var toError = /* @__PURE__ */ function() {
    return runFn3(_toError)(Just.create)(Nothing.value);
  }();

  // output/Promise/index.js
  var thenOrCatch2 = function() {
    return function(k) {
      return function(c) {
        return function(p) {
          return function() {
            return thenOrCatch(mkEffectFn1(k), mkEffectFn1(c), p);
          };
        };
      };
    };
  };
  var resolve2 = function() {
    return resolve;
  };

  // output/Promise.Aff/index.js
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var mempty3 = /* @__PURE__ */ mempty(monoidCanceler);
  var thenOrCatch3 = /* @__PURE__ */ thenOrCatch2();
  var map18 = /* @__PURE__ */ map(functorEffect);
  var resolve3 = /* @__PURE__ */ resolve2();
  var alt8 = /* @__PURE__ */ alt(altMaybe);
  var map19 = /* @__PURE__ */ map(functorMaybe);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var bind6 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var toAff$prime = function(customCoerce) {
    return function(p) {
      return makeAff(function(cb2) {
        return voidRight2(mempty3)(thenOrCatch3(function(a) {
          return map18(resolve3)(cb2(new Right(a)));
        })(function(e) {
          return map18(resolve3)(cb2(new Left(customCoerce(e))));
        })(p));
      });
    };
  };
  var coerce5 = function(rej) {
    return fromMaybe$prime(function(v) {
      return error("Promise failed, couldn't extract JS Error or String");
    })(alt8(toError(rej))(map19(error)(hush(runExcept(readString2(unsafeToForeign(rej)))))));
  };
  var toAff = /* @__PURE__ */ toAff$prime(coerce5);
  var toAffE = function(f) {
    return bind6(liftEffect3(f))(toAff);
  };

  // output/Fetch.Internal.Response/index.js
  var text7 = function(response) {
    return toAffE(text6(response));
  };
  var json2 = function(response) {
    return toAffE(json(response));
  };
  var blob2 = function(response) {
    return toAffE(blob(response));
  };
  var arrayBuffer2 = function(response) {
    return toAffE(arrayBuffer(response));
  };
  var convert2 = function(response) {
    return {
      headers: toHeaders(headers(response)),
      ok: ok(response),
      redirected: redirected(response),
      status: status(response),
      statusText: statusText(response),
      url: url2(response),
      text: text7(response),
      json: json2(response),
      body: body2(response),
      arrayBuffer: arrayBuffer2(response),
      blob: blob2(response)
    };
  };

  // output/JS.Fetch/foreign.js
  function _fetch(a, b) {
    return fetch(a, b);
  }

  // output/JS.Fetch/index.js
  var fetchWithOptions = function() {
    return runEffectFn2(_fetch);
  };

  // output/JS.Fetch.AbortController/foreign.js
  var newImpl4 = function() {
    return new AbortController();
  };
  function abort(controller) {
    return function() {
      return controller.abort();
    };
  }
  function signal(controller) {
    return controller.signal;
  }

  // output/Fetch/index.js
  var $$void12 = /* @__PURE__ */ $$void(functorEffect);
  var thenOrCatch4 = /* @__PURE__ */ thenOrCatch2();
  var map20 = /* @__PURE__ */ map(functorEffect);
  var resolve4 = /* @__PURE__ */ resolve2();
  var bind7 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var $$new4 = /* @__PURE__ */ $$new2();
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var fetchWithOptions2 = /* @__PURE__ */ fetchWithOptions();
  var pure16 = /* @__PURE__ */ pure(applicativeAff);
  var toAbortableAff = function(abortController) {
    return function(p) {
      return makeAff(function(cb2) {
        return function __do8() {
          $$void12(thenOrCatch4(function(a) {
            return map20(resolve4)(cb2(new Right(a)));
          })(function(e) {
            return map20(resolve4)(cb2(new Left(coerce5(e))));
          })(p))();
          return effectCanceler(abort(abortController));
        };
      });
    };
  };
  var fetch2 = function() {
    return function() {
      return function(dictToCoreRequestOptions) {
        var convert3 = convert(dictToCoreRequestOptions);
        return function(url3) {
          return function(r) {
            return bind7(liftEffect4($$new4(url3)(convert3(r))))(function(request) {
              return bind7(liftEffect4(newImpl4))(function(abortController) {
                var signal2 = signal(abortController);
                return bind7(bindFlipped3(toAbortableAff(abortController))(liftEffect4(fetchWithOptions2(request)({
                  signal: signal2
                }))))(function(cResponse) {
                  return pure16(convert2(cResponse));
                });
              });
            });
          };
        };
      };
    };
  };

  // output/Web.DOM.NonElementParentNode/foreign.js
  function _getElementById(id2) {
    return function(node) {
      return function() {
        return node.getElementById(id2);
      };
    };
  }

  // output/Web.DOM.NonElementParentNode/index.js
  var map21 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map21(toMaybe);
    var $3 = _getElementById(eid);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key, value12) {
    return value12 == null ? f : s(value12[key]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail2 = fail(dictMonad);
    var pure9 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value12) {
        return unsafeReadPropImpl(fail2(new TypeMismatch("object", typeOf(value12))), pure9, k, value12);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Record.Builder/foreign.js
  function copyRecord(rec) {
    var copy = {};
    for (var key in rec) {
      if ({}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }
    return copy;
  }
  function unsafeInsert(l) {
    return function(a) {
      return function(rec) {
        rec[l] = a;
        return rec;
      };
    };
  }

  // output/Record.Builder/index.js
  var semigroupoidBuilder = semigroupoidFn;
  var insert5 = function() {
    return function() {
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        return function(l) {
          return function(a) {
            return function(r1) {
              return unsafeInsert(reflectSymbol2(l))(a)(r1);
            };
          };
        };
      };
    };
  };
  var categoryBuilder = categoryFn;
  var build = function(v) {
    return function(r1) {
      return v(copyRecord(r1));
    };
  };

  // output/Yoga.JSON/index.js
  var identity12 = /* @__PURE__ */ identity(categoryBuilder);
  var readString3 = /* @__PURE__ */ readString(monadIdentity);
  var bindExceptT2 = /* @__PURE__ */ bindExceptT(monadIdentity);
  var except2 = /* @__PURE__ */ except(applicativeIdentity);
  var applicativeExceptT2 = /* @__PURE__ */ applicativeExceptT(monadIdentity);
  var pure17 = /* @__PURE__ */ pure(applicativeExceptT2);
  var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
  var insert6 = /* @__PURE__ */ insert5()();
  var append6 = /* @__PURE__ */ append(semigroupNonEmptyList);
  var functorExceptT2 = /* @__PURE__ */ functorExceptT(functorIdentity);
  var map110 = /* @__PURE__ */ map(functorExceptT2);
  var map25 = /* @__PURE__ */ map(functorNonEmptyList);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindExceptT2);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindExceptT2);
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var readArray2 = /* @__PURE__ */ readArray(monadIdentity);
  var readForeignString = {
    readImpl: readString3
  };
  var readForeignFieldsNilRowRo = {
    getFields: function(v) {
      return function(v1) {
        return pure17(identity12);
      };
    }
  };
  var sequenceCombining = function(dictMonoid) {
    var append22 = append(dictMonoid.Semigroup0());
    var mempty4 = mempty(dictMonoid);
    return function(dictFoldable) {
      var foldl4 = foldl(dictFoldable);
      return function(dictApplicative) {
        var pure24 = pure(dictApplicative);
        var fn = function(acc) {
          return function(elem3) {
            var v = runExcept(elem3);
            if (acc instanceof Left && v instanceof Left) {
              return new Left(append6(acc.value0)(v.value0));
            }
            ;
            if (acc instanceof Left && v instanceof Right) {
              return new Left(acc.value0);
            }
            ;
            if (acc instanceof Right && v instanceof Right) {
              return new Right(append22(acc.value0)(pure24(v.value0)));
            }
            ;
            if (acc instanceof Right && v instanceof Left) {
              return new Left(v.value0);
            }
            ;
            throw new Error("Failed pattern match at Yoga.JSON (line 653, column 5 - line 657, column 37): " + [acc.constructor.name, v.constructor.name]);
          };
        };
        var $505 = foldl4(fn)(new Right(mempty4));
        return function($506) {
          return except2($505($506));
        };
      };
    };
  };
  var sequenceCombining1 = /* @__PURE__ */ sequenceCombining(monoidArray)(foldableArray)(applicativeArray);
  var readImpl = function(dict) {
    return dict.readImpl;
  };
  var readAtIdx = function(dictReadForeign) {
    var readImpl5 = readImpl(dictReadForeign);
    return function(i) {
      return function(f) {
        return withExcept(map25(ErrorAtIndex.create(i)))(readImpl5(f));
      };
    };
  };
  var readForeignArray = function(dictReadForeign) {
    return {
      readImpl: composeKleisliFlipped2(function() {
        var $542 = mapWithIndex3(readAtIdx(dictReadForeign));
        return function($543) {
          return sequenceCombining1($542($543));
        };
      }())(readArray2)
    };
  };
  var read3 = function(dictReadForeign) {
    var $544 = readImpl(dictReadForeign);
    return function($545) {
      return runExcept($544($545));
    };
  };
  var read_ = function(dictReadForeign) {
    var $546 = read3(dictReadForeign);
    return function($547) {
      return hush($546($547));
    };
  };
  var getFields = function(dict) {
    return dict.getFields;
  };
  var readForeignFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    var insert42 = insert6(dictIsSymbol);
    return function(dictReadForeign) {
      var readImpl5 = readImpl(dictReadForeign);
      return function(dictReadForeignFields) {
        var getFields1 = getFields(dictReadForeignFields);
        return function() {
          return function() {
            return {
              getFields: function(v) {
                return function(obj) {
                  var rest = getFields1($$Proxy.value)(obj);
                  var name15 = reflectSymbol2($$Proxy.value);
                  var enrichErrorWithPropName = withExcept(map25(ErrorAtProperty.create(name15)));
                  var value12 = enrichErrorWithPropName(bindFlipped4(readImpl5)(readProp2(name15)(obj)));
                  var first = map110(insert42($$Proxy.value))(value12);
                  return except2(function() {
                    var v1 = runExcept(rest);
                    var v2 = runExcept(first);
                    if (v2 instanceof Right && v1 instanceof Right) {
                      return new Right(compose1(v2.value0)(v1.value0));
                    }
                    ;
                    if (v2 instanceof Left && v1 instanceof Left) {
                      return new Left(append6(v2.value0)(v1.value0));
                    }
                    ;
                    if (v2 instanceof Right && v1 instanceof Left) {
                      return new Left(v1.value0);
                    }
                    ;
                    if (v2 instanceof Left && v1 instanceof Right) {
                      return new Left(v2.value0);
                    }
                    ;
                    throw new Error("Failed pattern match at Yoga.JSON (line 360, column 5 - line 364, column 33): " + [v2.constructor.name, v1.constructor.name]);
                  }());
                };
              }
            };
          };
        };
      };
    };
  };
  var readForeignRecord = function() {
    return function(dictReadForeignFields) {
      var getFields1 = getFields(dictReadForeignFields);
      return {
        readImpl: function(o) {
          return map110(flip(build)({}))(getFields1($$Proxy.value)(o));
        }
      };
    };
  };

  // output/Main/index.js
  var map26 = /* @__PURE__ */ map(functorEffect);
  var map111 = /* @__PURE__ */ map(functorArray);
  var sortWith2 = /* @__PURE__ */ sortWith(ordNumber);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeEffect);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var bind22 = /* @__PURE__ */ bind(bindAff);
  var fetch3 = /* @__PURE__ */ fetch2()()(/* @__PURE__ */ toCoreRequestOptionsRowRo()()(toCoreRequestOptionsHelpe));
  var map27 = /* @__PURE__ */ map(functorAff);
  var read_2 = /* @__PURE__ */ read_(/* @__PURE__ */ readForeignArray(/* @__PURE__ */ readForeignRecord()(/* @__PURE__ */ readForeignFieldsCons({
    reflectSymbol: function() {
      return "message";
    }
  })(readForeignString)(/* @__PURE__ */ readForeignFieldsCons({
    reflectSymbol: function() {
      return "name";
    }
  })(readForeignString)(readForeignFieldsNilRowRo)()())()())));
  var pure23 = /* @__PURE__ */ pure(applicativeAff);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard22 = /* @__PURE__ */ discard3(bindAff);
  var klass_2 = /* @__PURE__ */ klass_(applicativeAPoll2);
  var klass2 = /* @__PURE__ */ klass(functorAPoll2);
  var shuffle = function(xs) {
    return map26(function() {
      var $92 = map111(fst);
      var $93 = sortWith2(snd);
      return function($94) {
        return $92($93($94));
      };
    }())(traverse2(function(x) {
      return map26(Tuple.create(x))(random);
    })(xs));
  };
  var popAndPush = function(arr) {
    return run2(function __do8() {
      var mutArr = thaw(arr)();
      var mfst = shift(mutArr)();
      if (mfst instanceof Nothing) {
        return mutArr;
      }
      ;
      if (mfst instanceof Just) {
        push(mfst.value0)(mutArr)();
        return mutArr;
      }
      ;
      throw new Error("Failed pattern match at Main (line 126, column 5 - line 130, column 20): " + [mfst.constructor.name]);
    });
  };
  var messageElement = function __do5() {
    var win = windowImpl();
    var htmlDoc = document2(win)();
    return getElementById("messages")(toNonElementParentNode(toDocument(htmlDoc)))();
  };
  var interval = function(v) {
    return setInterval2(1e3)(function __do8() {
      var counter = read(v.counterRef)();
      (function() {
        var $58 = counter === 0;
        if ($58) {
          return v.setFadeClass("text-show")();
        }
        ;
        return unit;
      })();
      (function() {
        var $59 = counter === 29;
        if ($59) {
          return v.setFadeClass("text-fade")();
        }
        ;
        return unit;
      })();
      var nextCounter = mod2(counter + 1 | 0)(30);
      write(nextCounter)(v.counterRef)();
      v.setCounter(nextCounter)();
      var $60 = nextCounter !== 0;
      if ($60) {
        return unit;
      }
      ;
      var messages = read(v.messagesRef)();
      var updatedMessages = popAndPush(messages);
      write(updatedMessages)(v.messagesRef)();
      var v1 = head(updatedMessages);
      if (v1 instanceof Nothing) {
        return unit;
      }
      ;
      if (v1 instanceof Just) {
        return v.setActiveMessage(v1.value0)();
      }
      ;
      throw new Error("Failed pattern match at Main (line 115, column 7 - line 117, column 41): " + [v1.constructor.name]);
    });
  };
  var eMessagesURL = function __do6() {
    var win = windowImpl();
    var loc = location(win)();
    var ori = origin(loc)();
    return ori + "/messages.json";
  };
  var getMessages = function(setMessages) {
    return function(setActiveMessage) {
      return function __do8() {
        var messagesURL = eMessagesURL();
        return launchAff_(bind22(fetch3(messagesURL)({}))(function(v) {
          return bind22(map27(read_2)(v.json))(function(v1) {
            if (v1 instanceof Nothing) {
              return pure23(unit);
            }
            ;
            if (v1 instanceof Just) {
              return bind22(liftEffect5(shuffle(v1.value0)))(function(shuffledMessages) {
                return discard22(liftEffect5(setMessages(shuffledMessages)))(function() {
                  var v2 = head(shuffledMessages);
                  if (v2 instanceof Nothing) {
                    return pure23(unit);
                  }
                  ;
                  if (v2 instanceof Just) {
                    return liftEffect5(setActiveMessage(v2.value0));
                  }
                  ;
                  throw new Error("Failed pattern match at Main (line 63, column 9 - line 65, column 56): " + [v2.constructor.name]);
                });
              });
            }
            ;
            throw new Error("Failed pattern match at Main (line 58, column 5 - line 65, column 56): " + [v1.constructor.name]);
          });
        }))();
      };
    };
  };
  var cardMaker = function(activeMessage) {
    return function(showClass) {
      return div2([klass_2("card")])([switcherFlipped(activeMessage)(function(v) {
        if (v instanceof Nothing) {
          return text_("No message");
        }
        ;
        if (v instanceof Just) {
          return div2([klass2(showClass)])([text_(v.value0.message), footer([klass_2("card-footer")])([text_(v.value0.name)])]);
        }
        ;
        throw new Error("Failed pattern match at Main (line 85, column 7 - line 91, column 12): " + [v.constructor.name]);
      })]);
    };
  };
  var main = function __do7() {
    var mElem = messageElement();
    var runInFunc = function() {
      if (mElem instanceof Nothing) {
        return runInBody;
      }
      ;
      if (mElem instanceof Just) {
        return runInElement(mElem.value0);
      }
      ;
      throw new Error("Failed pattern match at Main (line 137, column 9 - line 139, column 41): " + [mElem.constructor.name]);
    }();
    var counterRef = $$new(0)();
    var messagesRef = $$new([])();
    var v = useHot(0)();
    var v1 = useState(Nothing.value)();
    var v2 = useHot("text-show")();
    getMessages(function(msgs) {
      return write(msgs)(messagesRef);
    })(function($95) {
      return v1.value0(Just.create($95));
    })();
    interval({
      setActiveMessage: function($96) {
        return v1.value0(Just.create($96));
      },
      messagesRef,
      setCounter: v.value1.value0,
      counterRef,
      setFadeClass: v2.value1.value0
    })();
    return runInFunc(div_([cardMaker(v1.value1)(v2.value1.value1)]))();
  };

  // <stdin>
  main();
})();
