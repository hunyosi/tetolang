/*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TetoTetoProlog
written by ASAKURA, Hunyosi.

This software is made available under
the Creative Commons CC0 1.0 Universal Public Domain Dedication.
See "LICENSE" file.
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/

var TetoTetoProlog = (function () {
 'use strict';




  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Impoerts  
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//

 var global = Function('return this').call(null);

 var fp = Function.prototype;
 var call = fp.call;
 var apply = fp.apply;
 var bind = fp.bind;

 var defProp = Object.defineProperty;
 var defProps = Object.defineProperties;
 var propDesc = Object.getOwnPropertyDescriptor;
 var protoOf = Object.getPrototypeOf;
 var keys = Object.keys;
 var create = Object.create;
 var op = Object.prototype;
 var hasProp = call.bind(op.hasOwnProperty);
 var propNames = call.bind(op.getOwnPropertyNames);

// array
 var ap = Array.prototype;

 var join = call.bind(ap.join);
 var reverse = call.bind(ap.reverse);
 var push = call.bind(ap.push);
 var pop = call.bind(ap.pop);
 var shift = call.bind(ap.shift);
 var unshift = call.bind(ap.unshift);
 var splice = call.bind(ap.splice);
 var forEach = call.bind(ap.forEach);
 var map = call.bind(ap.map);
 var reduce = call.bind(ap.reduce);
 var reduceRight = call.bind(ap.reduceRight);
 var filter = call.bind(ap.filter);
 var some = call.bind(ap.some);
 var every = call.bind(ap.every);

 var concatA = call.bind(ap.concat);
 var sliceA = call.bind(ap.slice);
 var indexOfA = call.bind(ap.indexOf);
 var lastIndexOfA = call.bind(ap.lastIndexOf);

// string
 var sp = String.prototype;
 var quote = call.bind(sp.quote);
 var substring = call.bind(sp.substring);
 var toLowerCase = call.bind(sp.substring);
 var toUpperCase = call.bind(sp.toUpperCase);
 var charAt = call.bind(sp.charAt);
 var charCodeAt = call.bind(sp.charCodeAt);
 var startsWith = call.bind(sp.startsWith);
 var endsWith = call.bind(sp.endsWith);
 var trim = call.bind(sp.trim);
 var trimLeft = call.bind(sp.trimLeft);
 var trimRight = call.bind(sp.trimRight);
 var toLocaleLowerCase = call.bind(sp.toLocaleLowerCase);
 var toLocaleUpperCase = call.bind(sp.toLocaleUpperCase);
 var localeCompare = call.bind(sp.localeCompare);
 var split = call.bind(sp.split);
 var match = call.bind(sp.match);
 var search = call.bind(sp.search);
 var replace = call.bind(sp.replace);
 var substr = call.bind(sp.substr);
 var fromCharCode = call.bind(sp.fromCharCode);

 var indexOfS = call.bind(sp.indexOf);
 var lastIndexOfS = call.bind(sp.lastIndexOf);
 var concatS = call.bind(sp.concat);
 var sliceS = call.bind(sp.slice);

 function isString(o) {
  return o.constructor === String;
 }

 function concat() {
  return (isString(arguments[0]) ?
    concatS : concatA).apply(null, arguments);
 }

 function indexOf() {
  return (isString(arguments[0]) ?
    indexOfS : indexOfA).apply(null, arguments);
 }

 function lastIndexOf() {
  return (isString(arguments[0]) ?
    lastIndexOfS : lastIndexOfA).apply(null, arguments);
 }

 function slice() {
  return (isString(arguments[0]) ? 
    sliceS : sliceA).apply(null, arguments);
 }

 function append(ary, ary2) {
  ap.push.apply(ary, ary2);
  return ary;
 }




  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Print utilities
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//


 function DocumentStream(document) {
  var undefined;

  function getCurPrintElement() {
   var div = document.getElementById('_x_println');
   if (div == null) {
    var body = document.getElementsByTagName('body').item(0);
    div = document.createElement('div');
    div.id = '_x_println';
    body.appendChild(div);
   }
   return div;
  }

  function println(str) {
   str = str + '';
   var div = getCurPrintElement();
   var line, lines = str.split(/\r\n|\n|\r/);
   var i1, z1;
   for (i1 = 0, z1 = lines.length; i1 < z1; ++ i1) {
    line = lines[i1].replace(/ /g, '\u00A0');
    div.appendChild(document.createTextNode(line));
    div.appendChild(document.createElement('br'));
   }
  }

  function print(str) {
   str = str + '';
   var div = getCurPrintElement();
   var line, lines = str.split(/\r\n|\n|\r/);
   var i1, z1 = lines.length;
   if (0 < z1) {
    line = lines[0].replace(/ /g, '\u00A0');
    div.appendChild(document.createTextNode(line));
   }
   for (i1 = 1; i1 < z1; ++ i1) {
    line = lines[i1].replace(/ /g, '\u00A0');
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode(line));
   }
  }

  function nl() {
   var div = getCurPrintElement();
   div.appendChild(document.createElement('br'));
  }

  this.println = println;
  this.print = print;
  this.nl = nl;
  this.getCurPrintElement = getCurPrintElement;
 }

 function println(str) {
  ttp.out.println(str);
 }

 function print(str) {
  ttp.out.print(str);
 }

 function nl() {
  ttp.out.nl();
 }

 function pp() {
  var i1, z1 = arguments.length;
  for (i1 = 0; i1 < z1; ++ i1) {
   print(arguments[i1]);
  }
  nl();
 }




  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Exceptios  
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//

 function TtpError(){
  return construct(this, TtpError, arguments,
    function(msg){
     callSuper(this, msg);
     this.name = 'TtpError';
    });
 }
 TtpError.prototype = create(Error.prototype);

 function TtpArgumentError(){
  return construct(this, TtpArgumentError, arguments,
    function(msg){
     callSuper(this, msg);
     this.name = 'TtpArgumentError';
    });
 }
 TtpArgumentError.prototype = create(TtpError.prototype);

 function TtpTypeError(){
  return construct(this, TtpTypeError, arguments,
    function(msg){
     callSuper(this, msg);
     this.name = 'TtpTypeError';
    });
 }
 TtpTypeError.prototype = create(TtpError.prototype);




  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Object-oriented programming support utilities
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//


 function isEmpty(o) {
  var u;
  if (o === u || o === null) {
   return true;
  }
  o = Object(o);
  if ('isEmpty' in o && o.isEmpty instanceof Function) {
   return o.isEmpty()
  }
  if ('length' in o && o.length === 0) {
   return true;
  }
  if (keys(o).length === 0) {
   return true;
  }
  return false;
 }

 function isZero(o) {
  return (o === 0 || o === false) ? true : isEmpty(o);
 }


 function getName(o) {
  var u;
  var n = 'name';
  if (n in o) {
   return o[n];
  }
  if (o instanceof Function) {
   var s = (o + '');
   var re = /^\s*function\s+([^ \t\(]+)\(/.exec(s);
   if (re) {
    return re[1];
   }
  }
  return u;
 }


 function setKeys(o, keyLst, v) {
  var i, z;
  for (i = 0, z = keyLst.length; i < z; ++ i) {
   o[keyLst[i]] = v;
  }
  return o;
 }


 function copy(o, o2) {
  var k;
  for (k in o2) {
   o[k] = o2[k];
  }
  return o;
 }


 function newObj(cons, args, kv) {
  var o = create(cons.prototype);
  cons.apply(o, args);
  if (kv) {
   copy(o, kv);
  }
  return o;
 }


 function prop(o, name, vOpts, v) {
  var desc;
  switch (arguments.length) {
  case 2:
   return propDesc(o, name);
  case 3:
   if (hasProp(o, name)) {
    o[name] = vOpts;
   } else {
    defProp(o, name, {value: vOpts, writable: true});
   }
   return o;
  case 4:
   if (hasProp(o, name)) {
    desc = {value: v};
   } else {
    desc = {value: v, writable: true};
   }
   defProp(o, name, copy(desc, vOpts));
   return o;
  default:
   throw new ArgumentError();
  }
 }

 function props(o, kvOpts, kv) {
  var descs = {}, k, keys, i, z, desc;
  switch (arguments.length) {
  case 1:
   keys =  propNames(o);
   for (i = 0, z = keys.length; i < z; ++ i) {
    k = keys[i];
    descs[k] = propDesc(o, k); 
   }
   return descs;
  case 2:
   for (k in kvOpts) {
    if (hasProp(o, k)) {
     o[k] = kvOpts[k];
    } else{
     descs[k] = {value: kvOpts[k], writable: true};
    }
   }
   break;
  case 3:
   for (k in kv) {
    if (hasProp(o, k)) {
     desc = {value: kv[k]};
    } else {
     desc = {value: kv[k], writable: true};
    }
    descs[k] = copy(desc, kvOpts);
   }
   break;
  default:
   throw new ArgumentError();
  }

  if (! isEmpty(descs)) {
   defProps(o, name, descs);
  }
 }

 function def(o, name, vOpts, v) {
  switch (arguments.length) {
  case 3:
   return defProp(o, name, {value: vOpts});
  case 4:
   return defProp(o, name, copy({value: v}, vOpts));
   default:
    throw new Error();
  }
 }

 function defs(o, kvOpts, kv) {
  var descs = {}, k;
  switch (arguments.length) {
  case 2:
   for (k in kvOpts) {
    descs[k] = {value: kvOpts[k]};
   }
   break;
  case 3:
   for (k in kv) {
    descs[k] = copy({value: kv[k]}, kvOpts);
   }
   break;
  default:
   throw new Error();
  }

  defProps(o, descs);
 }

 function accessor(o, name, gOpts, gs, s) {
  switch (arguments.length) {
  case 3:
   return defProp(o, name, {get: gOpts});
  case 4:
   if (gOpts instanceof Function) {
    return defProp(o, name, {get: gOtps, set: gs});
   } else if (! gOpts) {
    return defProp(o, name, {set: gs});
   }
   return defProp(o, name, copy({get: gs}, gOpts));
  case 5:
   if (! gs) {
    return defProp(o, name, copy({set: s}, gOpts));
   }
   return defProp(o, name, copy({get: gs, set: s}, gOpts));
   default:
    throw new Error();
  }
 }

 function accessors(o, kvOpts, kv) {
  var descs, k;
  switch (arguments.length) {
  case 2:
   descs = kvOpts;
   break;
  case 3:
   descs = {};
   for (k in kv) {
    descs[k] = copy(copy({}, kv[k]), kvOpts);
   }
   break;
  default:
   throw new Error();
  }

  defProps(o, descs);
 }


 function makeDescs(propLst){
  var u, desc = {}, i1, z1, e1, c1, e1z, k, d, words = [];
  if (propLst === u || propLst === null) {
   return desc;
  }
  if (! (Object(propLst) instanceof Array)) {
   throw new TtpTypeError();
  }
  if (propLst.length === 0) {
   return desc;
  }
  for (i1 = 0, z1 = propLst.length; i1 < z1; ++ i1) {
   e1 = propLst[i1];
   c1 = e1.constructor;
   switch (c1) {
   case String:
    e1 = e1.trim();
    if (0 < e1.length) {
     words = e1.split(/\s+/);
    } else {
     words = []; 
    }
    break;
   case Function:
    d = setKeys({}, words, true);
    d.value = e1;
    desc[getName(e1)] = d;
    break;
   case Array:
    e1z = e1.length;
    if (e1z === 2 || e1z === 3) {
     d = setKeys({}, words, true);
     d[getName(e1[1])] = e1[1];
     if (e1z === 3) {
      d[getName(e1[2])] = e1[2];
     }
     desc[e1[0]] = d;
    }
    break;
   case Object:
    for (k in e1) {
     d = setKeys({}, words, true);
     d.value = e1[k];
     desc[k] = d;
    }
    break;
   }
  }
  return desc;
 }

 function defineProps(o, propLst) {
  defProps(o, makeDescs(propLst));
  return o;
 }

 function makeObj(proto, propLst) {
  create(proto, makeDescs(propLst));
  return o;
 }

 function callSuper(o) {
  protoOf(o.constructor.prototype).
    constructor.apply(o, sliceA(arguments, 1));
 }

 function applySuper(o, args) {
  protoOf(o.constructor.prototype).
    constructor.apply(o, args);
 }

 function construct(o, cons, args, init) {
  var sc, res, rt;
  if (! (o instanceof cons)) {
   o = create(cons.prototype);
  }
  if (! init) {
   sc = protoOf(cons.prototype).constructor;
   if (sc instanceof Function && sc !== Object) {
    res = sc.apply(o, args);
   }
  } else {
   res = init.apply(o, args);
  }
  rt = typeof res;
  if (res && rt !== 'boolean' && rt !== 'number' && rt !== 'string') {
   return res;
  }
  return o;
 }


 function matchArgs(args, offset, paramLst) {
  var u, ia, ip, za, zp, ea, ep, oa, kp, ikp, zkp, np, vp,
    o, f, ps = {}, ko, iko, zko, nko;
  ia = offset;
  za = args.length;
  ip = 0;
  zp = paramLst.length;

  ea = args[ia];
  oa = Object(ea);
  ep = paramLst[ip];
  kp = keys(ep);

  if (ia < za && ip < zp) {
   for (;;) {
    f = false;
    for (ikp = 0, zkp = kp.length; ikp < zkp; ++ ikp) {
     np = kp[ikp];
     vp = ep[np];

     o = Object(vp);
     if ((vp === u || vp === null) &&
       (ea === u || ea === null)) {
      f = true;
      break;

     } else if (o.constructor === Object &&
       oa.constructor === Object) {
      nko = 0;
      ko = keys(o);
      zko = ko.length;
      for (iko = 0; iko < zko; ++ iko) {
       if (hasProp(oa, ko[iko])) {
        ++ nko;
       }
      }
      if (nko === zko) {
       f = true;
      }
      break;

     } else if (vp instanceof Function &&
       hasProp(vp, 'prototype') &&
       (ea === u || ea === null || oa instanceof vp)) {
      f = true;
      break;

     } else if (o instanceof RegExp &&
       oa instanceof String &&
       o.test(ea)){
      f = true;
      break;

     } else if ((o instanceof String ||
       o instanceof Number ||
       o instanceof Boolean) && v === ea){
      f = true;
      break;

     }
    }

    if (f) {
     ps[np] = ea;
     ++ ia;
     if (za <= ia) {
      break;
     }
     ea = args[ia];
     oa = Object(ea);
    }

    ++ ip;
    if (zp <= ip) {
     break;
    }
    ep = paramLst[ip];
    kp = keys(ep);
   }
  }

  ps.arguments = sliceA(args, ia);

  return ps;
 }

 function makeClass(name) {
  name = name + '';
  var params = matchArgs(arguments, 1, [
   {superClass: Function},
   {options: {}},
   {propLst1: Array},
   {propLst2: Array}
  ]);

  var sc = params['superClass'],
    opts = params['options'],
    cPropLst,
    iPropLst;

  if (params['propLst2']) {
   cPropLst = params['propLst1'];
   iPropLst = params['propLst2'];
  } else if (params['propLst1']) {
   iPropLst = params['propLst1'];
  }

  var cdescs, idescs, consDesc, initFunc;

  idescs = makeDescs(iPropLst);

  if (hasProp(idescs, 'constructor')) {
   consDesc = Object(idescs['constructor']);
   if (consDesc instanceof Object &&
     'value' in consDesc && 
     consDesc['value'] instanceof Function) {
    initFunc = consDesc['value'];
   } else {
    throw new TtpTypeError();
   }
   delete idescs['constructor'];
  }

  var c = Function('construct', 'init',
   'return function '+name+'(){'+
    'return construct(this,'+name+',arguments,init);'+
   '}'
  ).call(null, construct, initFunc);

  if (sc) {
   idescs.constructor = {value: c};
   c.prototype = Object.create(sc.prototype, idescs);
  } else {
   defProps(c.prototype, idescs);
  }

  if (cPropLst) {
   defineProps(c, cPropLst);
  }

  if (opts &&
   'extension' in  opts && ! opts['extension']) { 
   Object.preventExtension(c);
  }

  return c;
 }


 var Module = makeClass('Module', [

  function constructor(propLst) {
   if (propLst) {
    defineProps(this, propLst);
   }
  },

  function def (name, vOpts, v) {
   switch (arguments.length) {
    case 2: def(this, name, vOpts); return this;
    case 3: def(this, name, vOpts, v); return this;
   }
   throw new TtpArgumentError();
  },

  function defClass (name, plOpts, propLst) {
   return this.def(name, makeClass.apply(null, arguments));
  }

 ]);



  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Asynchronous programming support utilities
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//


 var async = (function() {
  if (typeof setTimeout === 'function') {
   return function async(f) {
    setTimeout(f, 0)
   };
  }
  return function async(f) {
   f();
  };
 })();



 function _deferredPushFunc(d, t, func) {
  if (d._funcs === null) {
   prop(d, '_funcs', []);
  }
  d._funcs.push({t: t, f: func});
  return d;
 }


 function _deferredApplyFuncs(s, o, args, funcs) {
  var s1 = s, args2, i, z;

  if (! funcs || funcs.length < 1) {
   return;
  }

  i = 0;
  z = funcs.length;

  async(applyFuncs);
  function applyFuncs() {
   var u, s2 = s1, c = false, r, f, t, e;

   if (s === 3) {
    s = 4;
    args2 = args;
    args = null;
   }

   try {
    f = funcs[i];
    t = f.t;
    if (
      (s2 === 1 && (t === 1 || t === 4)) ||
      (s2 === 2 && (t === 2 || t === 4)) ||
      (s2 === 0 && t === 0) ||
      (s2 === 4 && t === 4)
      ) {
     r = f.f.apply(o, args);
     if (r === u || r === null) {
      args = null;
     } else {
      args = [r];
     }
    } else if (s2 === 3) {
     if (c && t !== 3) {
      s2 = s1;
      args2 = null;
     } else if (t === 3) {
      c = true;
      f.f.apply(o, args2);
     }
    }
   } catch (e) {
    s2 = 3;
    c = false;
    if (args2) {
     args2 = unshift(args2, e);
    } else {
     args2 = concatA([e], args);
    }
   }

   ++ i;
   if (i < z) {
    async(applyFuncs);
   }
  }
 }


 function _deferredThenFunc(d, defFunc, errFunc, func){
  return function() {
   var u, p, e;
   try {
    if (func instanceof Promise) {
     func.done(function(){ d.resolve.apply(d, arguments); });
     func.fail(function(){ d.reject.apply(d, arguments); });
     func.progress(function(){ d.notify.apply(d, arguments); });
     func.rescue(function(){ d.raise.apply(d, arguments); });
     func.apply(this, arguments);
     return;
    }
 
    if (func) {
     p = func.apply(this, arguments);
    }
    if (p === u || p === null) {
     defFunc.apply(d, arguments);
     return;
    }
    p = Object(p);
    if ('promise' in p) {
     p = p.promise();
     p.done(function(){ d.resolve.apply(d, arguments); });
     p.fail(function(){ d.reject.apply(d, arguments); });
     p.progress(function(){ d.notify.apply(d, arguments); });
     if ('rescue' in p) {
      p.rescue(function(){ d.raise.apply(d, arguments); });
     }
    } else if ('then' in p) {
     p.then(d.resolve.bind(d), d.reject.bind(d),
       d.notify.bind(d), d.raise.bind(d));
    } else {
     defFunc.apply(d, arguments);
    }
   } catch (e) {
    errFunc.apply(d, concatA([e], arguments));
   }
  };
 }


 var Deferred = makeClass('Deferred', [
  {
   _state: 0,
   _funcs: null,
   _contextObj: null
  },

  function constructor (fn) {
   if (fn instanceof Function) {
    var r = fn.apply(this.context(), [this]);
    if (r instanceof Object) {
     this.context(r);
    }
   }
  },

  function resolve() {
   if (this._state === 0) {
    prop(this, '_state', 1);
    return _deferredApplyFuncs(
      1, this.context(), arguments, this._funcs);
   }
  },

  function resolveWith(o) {
   if (this._state === 0) {
    prop(this, '_state', 1);
    return _deferredApplyFuncs(
      1, o, arguments, this._funcs);
   }
  },

  function reject() {
   if (this._state === 0) {
    prop(this, '_state', 2);
    return _deferredApplyFuncs(
      2, this.context(), arguments, this._funcs);
   }
  },

  function rejectWith(o) {
   if (this._state === 0) {
    prop(this, '_state', 2);
    return _deferredApplyFuncs(
      2, o, arguments, this._funcs);
   }
  },

  function notify() {
   if (this._state === 0) {
    return _deferredApplyFuncs(
      0, this.context(), arguments, this._funcs);
   }
  },

  function notifyWith(o) {
   if (this._state === 0) {
    return _deferredApplyFuncs(
      0, o, arguments, this._funcs);
   }
  },

  function raise(e) {
   if (this._state === 0) {
    return _deferredApplyFuncs(
      3, this.context(), [e], this._funcs);
   }
  },

  function raiseWith(o, e) {
   if (this._state === 0) {
    return _deferredApplyFuncs(
      3, o, [e], this._funcs);
   }
  },

  function context(o) {
   if (! o) {
    if (this._contextObj === null) {
     prop(this, '_contextObj', {});
    }
    return this._contextObj;
   } else {
    prop(this, '_contextObj', o);
   }
  },

  function fulfiller(o, writable) {
   if (! o) {
    o = {};
   }
   var d = this;
   var dcp = d.constructor.prototype;
   var ps = {
    context: dcp.context.bind(d),
    state: dcp.state.bind(d),
    isResolved: dcp.isResolved.bind(d),
    isRejected: dcp.isRejected.bind(d),
    resolve: dcp.resolve.bind(d),
    resolveWith: dcp.resolveWith.bind(d),
    reject: dcp.reject.bind(d),
    rejectWith: dcp.rejectWith.bind(d),
    notify: dcp.notify.bind(d),
    notifyWith: dcp.notifyWith.bind(d),
    raise: dcp.raise.bind(d),
    raiseWith: dcp.raiseWith.bind(d)
   };
   var df = def, k;
   if (arguments.length < 2 || writable) {
    df = prop;
   }
   for (k in ps) {
    if (! (k in o)) {
     df(o, k, ps[k]);
    }
   }
   return o;
  },

  function promise(o, writable) {
   if (! o) {
    o = {};
   }
   var d = this;
   var dcp = d.constructor.prototype;
   var ps = {
    context: function(){ return d.context(); },
    promise: function(){ return this; },
    state: dcp.state.bind(d),
    isResolved: dcp.isResolved.bind(d),
    isRejected: dcp.isRejected.bind(d),
    done: function(){ dcp.done.apply(d, arguments); return this; },
    fail: function(){ dcp.fail.apply(d, arguments); return this; },
    progress: function(){ dcp.progress.apply(d, arguments); return this; },
    rescue: function(){ dcp.rescue.apply(d, arguments); return this; },
    always: function(){ dcp.always.apply(d, arguments); return this; },
    then: function(){ return dcp.then.apply(this, arguments); }
   };
   var df = def, k;
   if (arguments.length < 2 || writable) {
    df = prop;
   }
   for (k in ps) {
    if (! (k in o)) {
     df(o, k, ps[k]);
    }
   }
   return o;
  },

  function state() {
   switch (this._state) {
    case 0: return 'pending';
    case 1: return 'resolved';
    case 2: return 'rejected';
   }
  },

  function isResolved() {
   return this._state === 1;
  },

  function isRejected() {
   return this._state === 2;
  },

  function done(func) {
   return _deferredPushFunc(this, 1, func);
  },

  function fail(func) {
   return _deferredPushFunc(this, 2, func);
  },

  function progress(func) {
   return _deferredPushFunc(this, 0, func);
  },

  function rescue(func) {
   return _deferredPushFunc(this, 3, func);
  },

  function always(func) {
   return _deferredPushFunc(this, 4, func);
  },

  function then(doneFunc, failFunc, progressFunc, rescueFunc) {
   var d = Deferred();
   d.context(this.context());

   this.done(_deferredThenFunc(d, d.resolve, d.reject, doneFunc));
   this.fail(_deferredThenFunc(d, d.reject, d.reject, failFunc));
   this.progress(_deferredThenFunc(d, d.notify, d.raise, progressFunc));
   this.rescue(_deferredThenFunc(d, d.raise, d.raise, rescueFunc));

   return d.promise();
  }
 ]);



 var Promise = makeClass('Promise', [
  {
   _prev: null,
   _func: null,
  },

  function constructor(o) {
   var d = Deferred();
   d.promise(this, false);
   prop(this, '_deferredObj', d);
   if (o) {
    if (o instanceof Promise) {
     prop(this, '_prev', o);
     d.context(o.context());
    } else {
     prop(this, '_func', o);
    }
   }
  },

  function promise() {
   return this;
  },

  function then(doneFunc, failFunc, progressFunc, rescueFunc) {
   var p = Promise(this);
   var d = p._deferredObj;

   this.done(_deferredThenFunc(d, d.resolve, d.reject, doneFunc));
   this.fail(_deferredThenFunc(d, d.reject, d.reject, failFunc));
   this.progress(_deferredThenFunc(d, d.notify, d.raise, progressFunc));
   this.rescue(_deferredThenFunc(d, d.raise, d.raise, rescueFunc));

   return p;
  },

  function call(o) {
   return this.apply(o, sliceA(arguments, 1));
  },

  function apply(o, args) {
   var u, r, d, e, f, p = this;
   while (p._prev !== null) {
    p = p._prev;
   }
   d = p._deferredObj;
   f = d.fulfiller();
   try {
    if (o === u || o === null) {
     o = d.context();
    } else {
     d.context(o);
    }
    if (p._func) {
     r = p._func.apply(o, concatA([f], args));
     if (r instanceof Object) { 
      d.context(r);
     }
    } else {
     d.resolve.apply(d, args);
    }
   } catch(e) {
    d.reject.apply(d, concatA([e], args));
   }
   return this;
  }
 ]);


 function when() {
  var d = Deferred(), i, z, p, cnt;

  function doneFunc() {
   -- cnt;
   if (cnt === 0) {
    d.resolveWith.apply(d, concatA([this], arguments));
   }
  }

  function failFunc() {
   d.rejectWith.apply(d, concatA([this], arguments));
  }

  function progressFunc() {
   d.notifyWith.apply(d, concatA([this], arguments));
  }

  cnt = arguments.length;
  for (i = 0, z = cnt; i < z; ++ i) {
   p = arguments[i];
   p.done(doneFunc);
   p.fail(failFunc);
   p.progress(progressFunc);
  }

  return d.promise();
 }




  //_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//
 // Prolog Engine
//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//_//


 function PFailure() {
  return construct(this, PFailure);
 }
 def(PFailure.prototype, 'toString', function(){
  return 'PFailure';
 });


 function toPVal(v, e) {
  var u, t, i, o;
  if (v instanceof PVar) {
   v = v.deref(e);
  }
  if (v instanceof PObj) {
   return v;
  }
  if (v === null || v === u) {
   return pNil;
  }
  t = typeof v; 
  if (t === 'string' || v instanceof String) {
   return PAtom(v);
  }
  if (t === 'number' || v instanceof Number) {
   return PFloat(v);
  }
  if (v instanceof Object && 'length' in v) {
   o = pNil;
   for (i = v.length; 0 < i; -- i) {
    o = PCell(v[i], o);
   }
   return o;
  }
  throw new TtpTypeError();
 }


 function toPLst(v, rest) {
  var i, o;
  if (!v) {
   return pNil;
  }
  if (Object(v) instanceof String) {
   return PStr(v);
  }
  o = (rest ? rest : pNil);
  for (i = v.length - 1; 0 <= i; -- i) {
   o = PCell(v[i], o);
  }
  return o;
 }


 function toNVal(v, e) {
  if (! (v instanceof PObj)) {
   return v;
  }
  if (v instanceof PVar) {
   v = v.val(e);
  }
  if (v instanceof PAtomic) {
   return v.val;
  }
  throw new TtpTypeError();
 }


 var PEnv = makeClass('PEnv', [
  function constructor() {
   prop(this, 'length', 0);
   prop(this, 'baseLength', 0);
  },

  function bind(v, o) {
   this[this.length] = v;
   ++ this.length;
   this[this.length] = o;
   ++ this.length;
  },

  function unbind(e) {
   var b, i, z;
   if (e) {
    b = e.length;
   } else {
    b = this.baseLength;
   }
   i　= b + 1;
   z = this.length;
   for (; i < z; i += 2) {
    this[i].unbind();
   }
  }
 ]);

 function makePEnv(e) {
  var u, o;
  if (e === null || e === u) {
   e = PEnv();
  }
  o = create(e);
  prop(o, 'baseLength', e.length);
  prop(o, 'length', e.length);
  return o;
 }


 var PVarMap = makeClass('PVarMap', [
  function constructor(env) {
   def(this, 'env', (env ? env : null));
   def(this, 'tnmap', {});
   def(this, 'nmap', {});
   def(this, 'nvmap', {});
  }
 ]);


 var PObj = makeClass('PObj', [
  function unify(v, e) {
   if (this !== v) {
    throw new PFailure;
   }
  },

  function clone(m) {
   throw new PFailure;
  }
 ]);


 var PAtomic = makeClass('PAtomic', PObj, [
  function constructor(v) {
   def(this, 'val', v);
  },

  function unify(o, e) {
   o = toPVal(o, e);
   if (this === o) {
    return;
   }
   if (o instanceof PAtomic){
    if (this.constructor === o.constructor &&
      this.val === o.val) {
     return;
    }
    throw new PFailure;
   }
   if (o instanceof PVar) {
    return o.unify(this, e);
   }
   throw new PFailure;
  },

  function clone(m) {
   return this;
  },

  function toString() {
   return this.val + '';
  }
 ]);

 var PNil = makeClass('PNil', PAtomic, [
  function toString() {
   return '[]';
  }
 ]);
 var pNil = PNil(null);

 var PAtom = makeClass('PAtom', PAtomic, [
 ]);

 var PFloat = makeClass('PFloat', PAtomic, [
 ]);


 var varIdCnt = 0;

 var PVar = makeClass('PVar', PObj, [
  function constructor(name) {
   var u;
   ++ varIdCnt;
   prop(this, 'id', varIdCnt);
   prop(this, 'name', null);
   if (name && name !== '_') {
    prop(this, 'tmpName', name);
   }
  },

  function val(e){
   var o;
   o = this;
   while (o instanceof PVar) {
    if (o['name'] === null) {
     return null;
    }
    o = e[o['name']];
   }
   return o;
  },

  function deref(e){
   var o;
   o = this;
   while (o instanceof PVar) {
    if (o['name'] === null) {
     return o;
    }
    o = e[o['name']];
   }
   return o;
  },

  function unify(v, e){
   var o, p;
   v = toPVal(v, e); 
   o = this;
   while (o['name'] !== null) {
    p = e[o['name']];
    if (! (p instanceof PVar)) {
     p.unify(v, e);
     return;
    }
    o = p;
   }
   o['name'] = e.length + '';
   e.bind(v, o);
  },

  function unbind() {
   this['name'] = null;
  },

  function clone(varMap) {
   var o, n,
     m = varMap.tnmap,
     nm = varMap.nmap,
     nvm = varMap.nvmap,
     e = varMap.env;

   if (e !== null && this['name'] !== null) {
    n = nm[this['name']];
    if (! n) {
     throw 'Unsupported function!';
    }
    if (! (n in nvm)) {
     nvm[n] = e[n].clone(varMap)
    }
    return nvm[n];
   } 

   if (hasProp(this, 'tmpName')) {
    n = this.tmpName;
    if (n in　m) {
     return m[n];
    }
    o = PVar(n);
    m[n] = o;
    return o;
   }

   return PVar();
  },

  function toString(e) {
   var v;
   if (e) {
    v = this.val(e);
    if (v !== null) {
     return v.toString(e);
    }
   }
   return '_' + this.id;
  }
 ]);


 var PTerm = makeClass('PTerm', PObj, [
  {
   length: 0
  },

  function constructor() {
   var u, args, i, z;
   switch (arguments.length) {
   case 0:
    throw new TtpArgumentError();
    return;

   case 1:
    args = arguments[0];
    if (args === u || args === null) {
     throw new TtpTypeError();
    } else {
     args = Object(args);
     if (args instanceof String) {
      def(this, 'name', args);
      return;
     } else if (! ('length' in args)) {
      throw new TtpTypeError();
     } 
    }
    break;

   default:
    args = arguments;
    break;
   }

   def(this, 'name', args[0].toString());
   z = args.length;
   def(this, 'length', z - 1);
   for (i = 1; i < z; ++ i) {
    def(this, (i - 1)+'', toPVal(args[i]));
   }
  },

  function unify(o, e){
   var i, z, r;
   o = toPVal(o, e);
   if (o instanceof PTerm) {
    if (this.name !== o.name) {
     throw new PFailure;
    }
    if (this.length !== o.length) {
     throw new PFailure;
    }
    for (i = 0, z = this.length; i < z; ++ i) {
     this[i].unify(o[i], e);
    }
    return;
   }
   if (o instanceof PVar) {
    o.unify(this, e);
    return;
   }
   throw new PFailure;
  },

  function clone(m) {
   var a = [], i, z = this.length;
   a.push(this.name);
   for (i = 0; i < z; ++ i) {
    a.push(this[i].clone(m));
   }
   return PTerm.apply(null, a);
  },

  function toString(e) {
   var b, s, i, z;
   b = this.name;
   z = this.length;
   if (0 < z) {
    s = '('
    for (i = 0; i < z; ++ i) {
     b += s + this[i].toString(e);
     s = ',';
    }
    b += ')';
   }
   return b;
  }
 ]);


 var PCell = makeClass('PCell', PTerm, [
  {
   name: '.',
   length: 2
  },

  function constructor(l, r) {
   def(this, '0', toPVal(l));
   def(this, '1', toPVal(r));
  },

  function clone(m) {
   return PCell(this['0'].clone(m), this['1'].clone(m));
  }
 ]);


 var PStr = makeClass('PStr', PCell, [
  [
   '1',
   function get() { 
    var str = this['str'], pos = this['pos'] + 1;

    if (0 <= pos && pos < str.length) {
     return PStr(str, pos);
    }
    return pNil;
   }
  ],

  function constructor(str, pos) {
   var c, n;
   if (!pos) {
    pos = 0;
   }
   c = str.charCodeAt(pos);
   if (0xD800 <= c && c <= 0xDBFF) {
    n = str.charCodeAt(pos + 1);
    if (0xDC00 <= n && n <= 0xDFFF) {
     ++ pos;
     c = ((c - 0xD800) << 10) + (n - 0xDC00) + 0x10000;
    }
   }

   def(this, 'str', str);
   def(this, 'pos', pos);
   def(this, '0', toPVal(c));
  },

  function clone(m) {
   return PCell(this['str'], this['pos']);
  }
 ]);


 var PStream = makeClass('PStream', PObj, [
  function constructor(in_flag) {
   def(this, 'is_input', in_flag);
  },

  function unify(o, e) {
   o = toPVal(o, e);
   if (this === o) {
    return;
   }
   if (o instanceof PVar) {
    return o.unify(this, e);
   }
   throw new PFailure;
  },

  function clone(m) {
   return this;
  },

  function toString(e) {
   return '';
  },

  function at_end_of_stream() {
   return;
  },

  function get_code() {
   return PFloat(-1);
  },

  function peek_code() {
   return PFloat(-1);
  },

  function print(str) {
  },

  function nl(str) {
  }

 ]);


 var PStrStream = makeClass('PStrStream', PStream, [
  function constructor(str, offset, end){
   if (str) {
    callSuper(this, true);
    prop(this, 'str', str);
    prop(this, 'pos', (offset ? offset : 0));
    prop(this, 'end', (end ? end : str.length));
   } else {
    callSuper(this, false);
    prop(this, 'str', "");
   }
  },

  function toString() {
   if (this.is_input) {
    return this.str.substring(this.pos, this.end);
   } else {
    return this.str;
   }
  },

  function at_end_of_stream() {
   if (this.is_input && this.pos < this.end) {
    return;
   }
   throw new PFailure;
  },

  function get_code() {
   if (this.is_input && this.pos < this.end) {
    var c = this.str.charCodeAt(this.pos);
    ++ this.pos;
    return PFloat(c);
   }
   return PFloat(-1);
  },

  function peek_code() {
   if (this.is_input && this.pos < this.end) {
    var c = this.str.charCodeAt(this.pos);
    return PFloat(c);
   }
   return PFloat(-1);
  },

  function print(str) {
   if (! this.is_input) {
    this.str += str;
   }
  },

  function nl(str) {
   if (! this.is_input) {
    this.str += "¥n";
   }
  }

 ]);



 function doPEnv(e, f) {
  var e2 = makePEnv(e);
  try {
   f(e2);
   return e2;
  } catch (PFailure) {
   e2.unbind();
   return;
  }
 }


 function atom_codes(atom, codes, e) {
  var str = "", p;
  atom = toPVar(atom, e);
  codes = toPVar(codes, e);
  if (codes instanceof PTerm && p.name === '.') {
   for (p = codes; !(p instanceof PTerm && p.name === '.'); p = p[1]) {
    str += String.fromCharCode(toNVal(p[0], e));
   }
   atom.unify(PAtom(str), e);
  } else if (atom instanceof PAtom && codes instanceof PVar) {
   codes.unify(toPLst(atom.val), e);
  } else {
   throw new TtpTypeError;
  }
 }


 function number_codes(number, codes, e) {
  var str = "", p, m, n = null;
  number = toPVar(number, e);
  codes = toPVar(codes, e);
  if (codes instanceof PTerm && p.name === '.') {
   for (p = codes; !(p instanceof PTerm && p.name === '.'); p = p[1]) {
    str += String.fromCharCode(toNVal(p[0], e));
   }
   if (m = /^0'\\?(.)$/.exec(str)) {
    n = m[1].charCodeAt(0);
   } else if (m = /^0b([01]+)$/.exec(str)) {
    n = parseInt(m[1], 2);
   } else if (m = /^0o([0-7]+)$/.exec(str)) {
    n = parseInt(m[1], 8);
   } else if (m = /^0x([0-9A-Fa-f]+)$/.exec(str)) {
    n = parseInt(m[1], 16);
   } else if (m = /^([0-9]+)$/.exec(str)) {
    n = parseInt(m[1], 10);
   } else {
    throw new PFailure;
   }
  } else if (number instanceof PFloat && codes instanceof PVar) {
   codes.unify(toPLst(number + ''), e);
  } else {
   throw new TtpTypeError;
  }
 }


 var PCore = makeClass('PCore', PTerm, [
  {
   clauses: {},
   config: {trace: false, seqSteps: 100}
  },

  function constructor() {
   var ctx = this;

   prop(this, 'out', ttp.out);

//==== %%runtime(labels). ====
ctx.addPred(',', 2, 0);
ctx.addPred(';', 2, 2);
ctx.addPred('!', 0, 4);
ctx.addPred('true', 0, 5);
ctx.addPred('fail', 0, 6);
ctx.addPred('->', 2, 7);
ctx.addPred('=', 2, 9);
ctx.addPred('is', 2, 10);
ctx.addPred('==', 2, 12);
ctx.addPred('=:=', 2, 14);
ctx.addPred('=\\=', 2, 20);
ctx.addPred('<', 2, 26);
ctx.addPred('=<', 2, 32);
ctx.addPred('>', 2, 38);
ctx.addPred('>=', 2, 44);
ctx.addPred('-', 1, 50);
ctx.addPred('+', 2, 53);
ctx.addPred('-', 2, 58);
ctx.addPred('*', 2, 63);
ctx.addPred('/', 2, 68);
ctx.addPred('/\\', 2, 73);
ctx.addPred('\\/', 2, 78);
ctx.addPred('<<', 2, 83);
ctx.addPred('>>', 2, 88);
ctx.addPred('write', 1, 93);
ctx.addPred('nl', 0, 94);
ctx.addPred('write', 2, 95);
ctx.addPred('nl', 1, 96);
ctx.addPred('get_code', 2, 97);
ctx.addPred('peek_code', 2, 98);
ctx.addPred('at_end_of_stream', 2, 99);
ctx.addPred('atom_codes', 2, 100);
ctx.addPred('number_codes', 2, 101);
//==== %%runtime(labels). ====

  },


  function trace(flag) {
   var u, old = this.config.trace;
   if (flag === true || flag === false) {
    this.config.trace = flag;
   }
   return old;
  },


  function addPred(name, arity, no) {
    var clauses = this.clauses;
    if (!(name in clauses)) {
     clauses[name] = {};
    }
    clauses[name][arity] = no;
  },


  function assertz(clause) {
    var clauses = this.clauses, name, arity, head, body;

    if (clause instanceof PTerm) {
     name = clause.name;
     arity = clause.length;
     if (name === ':-') {
      if (arity === 2) {
       head = clause[0];
       body = clause[1];
       if (head instanceof PTerm) {
        name = head.name;
        arity = head.length;
       } else if (head instanceof PAtom) {
        name = clause.val;
        arity = 0;
       } else {
        throw new TtpTypeError();
       }
      } else {
       throw new TtpTypeError();
      }
     } else {
      head = clause;
      body = PAtom('true');
     }
    } else if (clause instanceof PAtom) {
     name = clause.val;
     arity = 0;
     head = clause;
     body = PAtom('true');
    } else {
     throw new TtpTypeError();
    }

    if (!(name in clauses)) {
     clauses[name] = {};
    }
    if (!(arity in clauses[name])) {
     clauses[name][arity] = [];
    }
    clauses[name][arity].push({head: head, body: body});
  },


  function getClauses(name, arity) {
    var clauses = this.clauses;
    if (!(name in clauses)) {
     return null;
    }
    if (!(arity in clauses[name])) {
     return null;
    }
    return clauses[name][arity];
  },


  function query(st){
   var u, ctx=this, x, p=null, s=0, v=null, e=makePEnv(),
     n={s:null,c:null,v:null,n:null},
     b=null, c=b,
     t=this.config.trace, ss=this.config.seqSteps,
     d, d2,
     out = ctx.out;

   function setTerm(term) {
    var f, a, o;

    if (t) { ttp.pp('[trace] call: ' + term.toString(e)); }

    if (term instanceof PVar) {
     term = term.val(e);
    }

    if (term instanceof PTerm) {
     f = term.name;
     a = term.length;
     p = term;
    } else if (term instanceof PAtom) {
     f = term.val;
     a = 0;
     p = [];
    } else {
     throw new TtpTypeError;
    }

    o = ctx.getClauses(f, a);
    if (o === u || o === null) {
      throw 'not found clause: ' + f + '/' + a;
    }
    if (typeof o === 'number') {
     s = o;
     v = {};
    } else {
     s = -1;
     v = {clauses: o, cidx: 0, param: term};
    }
   }

   function backtrack() {
    if (b === null) {
     d.reject(new PFailure);
     return false;
    }
    e.unbind(b.e);
    s=b.s;v=b.v;n=b.n;p=b.p;e=b.e;b=b.b;
    if (s === null) {
     d.reject(new PFailure);
     return false;
    }
    return true;
   }

   function mainLoop() {
    var i=ss;
    for(; 0 < i; -- i){
     try {
      for(; 0 < i; -- i){
       if (s === null) {
        if (b === null) {
         d2 = null;
        } else {
         d2 = Promise(function(dfd){
          d = dfd;
          if (! backtrack()) {
           return;
          }
          async(mainLoop);
         });
        }
        d.resolve(e, d2);
        return;
       }

       switch (s) {
       case -1:
        c=b;
       case -2:
        v.m = PVarMap();
        v.head = v.clauses[v.cidx].head.clone(v.m);
        v.body = v.clauses[v.cidx].body.clone(v.m);
        ++ v.cidx;
        if (v.cidx < v.clauses.length) {
         b={s:-2,n:n,v:v,p:p,e:e,b:b};e=makePEnv(e);
        }
        if (t) { ttp.pp('[trace] try: pattern=' + v.head.toString(e) + ', target=' + p.toString(e)); }
        v.head.unify(p, e);
        if (t) { ttp.pp('[trace] matched: pattern=' + v.head.toString(e) + ', target=' + p.toString(e)); }
        setTerm(v.body);continue;

//==== %%runtime(impl). ====
case 0: // pred: ','/2
v[0]=p[1];
n={s:1,c:c,v:v,n:n};setTerm(p[0]);continue;
case 1:
setTerm(v[0]);continue;
case 2: // pred: ';'/2
v[0]=p[1];
b={s: /* at(;2) */ 3,n:n,v:v,p:p,e:e,b:b};e=makePEnv(e);
setTerm(p[0]);continue;
case 3: // label: ;2
setTerm(v[0]);continue;
case 4: // pred: '!'/0
b=c;
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 5: // pred: 'true'/0
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 6: // pred: 'fail'/0
throw new PFailure;
case 7: // pred: '->'/2
v[0]=p[1];
n={s:8,c:c,v:v,n:n};setTerm(p[0]);continue;
case 8:
b=c;
setTerm(v[0]);continue;
case 9: // pred: '='/2
(p[0]).unify(p[1],e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 10: // pred: 'is'/2
v[0]=p[0];
n={s:11,c:c,v:v,n:n};setTerm(p[1]);continue;
case 11:
(v[0]).unify(p,e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 12: // pred: '=='/2
if(toNVal(p[0],e)===toNVal(p[1],e)){s= /* at(==2) */ 13;continue;}
throw new PFailure;
case 13: // label: ==2
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 14: // pred: '=:='/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(=:=2) */ 16;continue;}
n={s:15,c:c,v:v,n:n};setTerm(v[0]);continue;
case 15:
v[0]=p;
case 16: // label: =:=2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(=:=3) */ 18;continue;}
n={s:17,c:c,v:v,n:n};setTerm(v[1]);continue;
case 17:
v[1]=p;
case 18: // label: =:=3
if(toNVal(v[0],e)===toNVal(v[1],e)){s= /* at(=:=4) */ 19;continue;}
throw new PFailure;
case 19: // label: =:=4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 20: // pred: '=\\='/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(=\=2) */ 22;continue;}
n={s:21,c:c,v:v,n:n};setTerm(v[0]);continue;
case 21:
v[0]=p;
case 22: // label: =\=2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(=\=3) */ 24;continue;}
n={s:23,c:c,v:v,n:n};setTerm(v[1]);continue;
case 23:
v[1]=p;
case 24: // label: =\=3
if(toNVal(v[0],e)!==toNVal(v[1],e)){s= /* at(=\=4) */ 25;continue;}
throw new PFailure;
case 25: // label: =\=4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 26: // pred: '<'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(<2) */ 28;continue;}
n={s:27,c:c,v:v,n:n};setTerm(v[0]);continue;
case 27:
v[0]=p;
case 28: // label: <2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(<3) */ 30;continue;}
n={s:29,c:c,v:v,n:n};setTerm(v[1]);continue;
case 29:
v[1]=p;
case 30: // label: <3
if(toNVal(v[0],e)<toNVal(v[1],e)){s= /* at(<4) */ 31;continue;}
throw new PFailure;
case 31: // label: <4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 32: // pred: '=<'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(=<2) */ 34;continue;}
n={s:33,c:c,v:v,n:n};setTerm(v[0]);continue;
case 33:
v[0]=p;
case 34: // label: =<2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(=<3) */ 36;continue;}
n={s:35,c:c,v:v,n:n};setTerm(v[1]);continue;
case 35:
v[1]=p;
case 36: // label: =<3
if(toNVal(v[0],e)<=toNVal(v[1],e)){s= /* at(=<4) */ 37;continue;}
throw new PFailure;
case 37: // label: =<4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 38: // pred: '>'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(>2) */ 40;continue;}
n={s:39,c:c,v:v,n:n};setTerm(v[0]);continue;
case 39:
v[0]=p;
case 40: // label: >2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(>3) */ 42;continue;}
n={s:41,c:c,v:v,n:n};setTerm(v[1]);continue;
case 41:
v[1]=p;
case 42: // label: >3
if(toNVal(v[0],e)>toNVal(v[1],e)){s= /* at(>4) */ 43;continue;}
throw new PFailure;
case 43: // label: >4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 44: // pred: '>='/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(>=2) */ 46;continue;}
n={s:45,c:c,v:v,n:n};setTerm(v[0]);continue;
case 45:
v[0]=p;
case 46: // label: >=2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(>=3) */ 48;continue;}
n={s:47,c:c,v:v,n:n};setTerm(v[1]);continue;
case 47:
v[1]=p;
case 48: // label: >=3
if(toNVal(v[0],e)>=toNVal(v[1],e)){s= /* at(>=4) */ 49;continue;}
throw new PFailure;
case 49: // label: >=4
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 50: // pred: '-'/1
v[0]=p[0];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(-A) */ 52;continue;}
n={s:51,c:c,v:v,n:n};setTerm(v[0]);continue;
case 51:
v[0]=p;
case 52: // label: -A
p=toPVal(-toNVal(v[0],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 53: // pred: '+'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(+2) */ 55;continue;}
n={s:54,c:c,v:v,n:n};setTerm(v[0]);continue;
case 54:
v[0]=p;
case 55: // label: +2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(+3) */ 57;continue;}
n={s:56,c:c,v:v,n:n};setTerm(v[1]);continue;
case 56:
v[1]=p;
case 57: // label: +3
p=toPVal(toNVal(v[0],e)+toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 58: // pred: '-'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(-2) */ 60;continue;}
n={s:59,c:c,v:v,n:n};setTerm(v[0]);continue;
case 59:
v[0]=p;
case 60: // label: -2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(-3) */ 62;continue;}
n={s:61,c:c,v:v,n:n};setTerm(v[1]);continue;
case 61:
v[1]=p;
case 62: // label: -3
p=toPVal(toNVal(v[0],e)-toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 63: // pred: '*'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(*2) */ 65;continue;}
n={s:64,c:c,v:v,n:n};setTerm(v[0]);continue;
case 64:
v[0]=p;
case 65: // label: *2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(*3) */ 67;continue;}
n={s:66,c:c,v:v,n:n};setTerm(v[1]);continue;
case 66:
v[1]=p;
case 67: // label: *3
p=toPVal(toNVal(v[0],e)*toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 68: // pred: '/'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(/2) */ 70;continue;}
n={s:69,c:c,v:v,n:n};setTerm(v[0]);continue;
case 69:
v[0]=p;
case 70: // label: /2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(/3) */ 72;continue;}
n={s:71,c:c,v:v,n:n};setTerm(v[1]);continue;
case 71:
v[1]=p;
case 72: // label: /3
p=toPVal(toNVal(v[0],e)/toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 73: // pred: '/\\'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(/\2) */ 75;continue;}
n={s:74,c:c,v:v,n:n};setTerm(v[0]);continue;
case 74:
v[0]=p;
case 75: // label: /\2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(/\3) */ 77;continue;}
n={s:76,c:c,v:v,n:n};setTerm(v[1]);continue;
case 76:
v[1]=p;
case 77: // label: /\3
p=toPVal(toNVal(v[0],e)&toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 78: // pred: '\\/'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(\/2) */ 80;continue;}
n={s:79,c:c,v:v,n:n};setTerm(v[0]);continue;
case 79:
v[0]=p;
case 80: // label: \/2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(\/3) */ 82;continue;}
n={s:81,c:c,v:v,n:n};setTerm(v[1]);continue;
case 81:
v[1]=p;
case 82: // label: \/3
p=toPVal(toNVal(v[0],e)|toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 83: // pred: '<<'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(<<2) */ 85;continue;}
n={s:84,c:c,v:v,n:n};setTerm(v[0]);continue;
case 84:
v[0]=p;
case 85: // label: <<2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(<<3) */ 87;continue;}
n={s:86,c:c,v:v,n:n};setTerm(v[1]);continue;
case 86:
v[1]=p;
case 87: // label: <<3
p=toPVal(toNVal(v[0],e)>>toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 88: // pred: '>>'/2
v[0]=p[0];
v[1]=p[1];
if(toPVal(v[0],e) instanceof PFloat){s= /* at(>>2) */ 90;continue;}
n={s:89,c:c,v:v,n:n};setTerm(v[0]);continue;
case 89:
v[0]=p;
case 90: // label: >>2
if(toPVal(v[1],e) instanceof PFloat){s= /* at(>>3) */ 92;continue;}
n={s:91,c:c,v:v,n:n};setTerm(v[1]);continue;
case 91:
v[1]=p;
case 92: // label: >>3
p=toPVal(toNVal(v[0],e)|toNVal(v[1],e));s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 93: // pred: 'write'/1
out.print(p[0].toString(e));
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 94: // pred: 'nl'/0
out.nl();
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 95: // pred: 'write'/2
toPVal(p[0],e).print(p[1].toString(e));
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 96: // pred: 'nl'/1
toPVal(p[0],e).nl();
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 97: // pred: 'get_code'/2
p[1].unify(toPVal(p[0],e).get_code(),e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 98: // pred: 'peek_code'/2
p[1].unify(toPVal(p[0],e).peek_code(),e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 99: // pred: 'at_end_of_stream'/2
toPVal(p[0],e).at_end_of_stream();
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 100: // pred: 'atom_codes'/2
atom_codes(p[0],p[1],e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
case 101: // pred: 'number_codes'/2
number_codes(p[0],p[1],e);
p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;
//==== %%runtime(impl). ====

       }
      }
     } catch (x) {
      if (t) { ttp.pp('[trace] failed: ' + x); }
      if (backtrack()) {
       continue;
      }
      return;
     }
    }
    async(mainLoop);
   }

   if (!st) {
    return Promise(function(dfd){
     dfd.reject('argument error');
    });
   }

   setTerm(toPVal(st));

   return Promise(function(dfd){
    d = dfd;
    async(mainLoop);
   });
  }
 ]);

 var TetoProlog = makeClass('TetoProlog', PCore, [
  function constructor() {
   var ctx = this;

   callSuper(this);

//==== %%transrate('src/compiler.pro'). ====
// src/compiler.pro(0-17):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_add'), toPLst(null), PVar('Y'), PVar('Y')), PAtom('!')));
// src/compiler.pro(17-18):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_add'), toPLst([PVar('X')], PVar('Xt')), PVar('Y'), toPLst([PVar('X')], PVar('Zt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lst_add'), PVar('Xt'), PVar('Y'), PVar('Zt')))));
// src/compiler.pro(18-24):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_len'), toPLst(null), PFloat(0)), PAtom('!')));
// src/compiler.pro(24-25):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_len'), PVar('Lst'), PVar('Len')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lst_len'), PVar('Lst'), PFloat(0), PVar('Len')))));
// src/compiler.pro(25-27):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_len'), toPLst(null), PVar('Len'), PVar('Len')), PAtom('!')));
// src/compiler.pro(27-32):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lst_len'), toPLst([PVar('_')], PVar('T')), PVar('InLen'), PVar('OutLen')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Len2'), PTerm(PAtom('+'), PVar('InLen'), PFloat(1))), PTerm(PAtom('ttp_lst_len'), PVar('T'), PVar('Len2'), PVar('OutLen'))))));
// src/compiler.pro(32-43):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_atom'), PVar('InAtom'), PVar('OutAtom')), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('InAtom'), PVar('AC')), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_str'), PVar('AC'), PVar('AC2')), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('OutAtom'), PVar('AC2')), PAtom('!'))))));
// src/compiler.pro(43-49):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_str'), PVar('InStr'), PVar('OutStr')), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_str_impl'), PVar('InStr'), PVar('OutStr'), PVar('OutStr'), PVar('OutStr'), toPLst(null)), PAtom('!'))));
// src/compiler.pro(49-51):
ctx.assertz(PTerm(PAtom('ttp_escape_str_impl'), toPLst(null), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrT')));
// src/compiler.pro(51-58):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_str_impl'), toPLst([PVar('InStrH')], PVar('InStrT')), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_char'), PVar('InStrH'), PVar('C1'), PVar('C2')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('StrT'), toPLst([PVar('C1'), PVar('C2')], PVar('StrT2'))), PTerm(PAtom('ttp_escape_str_impl'), PVar('InStrT'), PVar('Str'), PVar('StrT2'), PVar('Str'), PVar('StrTn')))))));
// src/compiler.pro(58-69):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_str_impl'), toPLst([PVar('InStrH')], PVar('InStrT')), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PTerm(PAtom('<'), PFloat(65535), PVar('InStrH')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('C2'), PTerm(PAtom('-'), PVar('InStrH'), PFloat(65536))), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('CH'), PTerm(PAtom('+'), PTerm(PAtom('>>'), PVar('C2'), PFloat(10)), PFloat(55296))), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('CL'), PTerm(PAtom('+'), PTerm(PAtom('/\\'), PVar('C2'), PFloat(1023)), PFloat(56320))), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_char_hex'), PVar('CH'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrT2')), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_char_hex'), PVar('CL'), PVar('Str'), PVar('StrT2'), PVar('Str'), PVar('StrT3')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_escape_str_impl'), PVar('InStrT'), PVar('Str'), PVar('StrT3'), PVar('Str'), PVar('StrTn')))))))))));
// src/compiler.pro(69-76):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_str_impl'), toPLst([PVar('InStrH')], PVar('InStrT')), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('=<'), PVar('InStrH'), PFloat(32)), PTerm(PAtom('=<'), PFloat(127), PVar('InStrH'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_char_hex'), PVar('InStrH'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrT2')), PTerm(PAtom('ttp_escape_str_impl'), PVar('InStrT'), PVar('Str'), PVar('StrT2'), PVar('Str'), PVar('StrTn')))))));
// src/compiler.pro(76-81):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_str_impl'), toPLst([PVar('InStrH')], PVar('InStrT')), PVar('Str'), toPLst([PVar('InStrH')], PVar('StrT')), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_escape_str_impl'), PVar('InStrT'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')))));
// src/compiler.pro(81-84):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(92), PFloat(92), PFloat(92)));
// src/compiler.pro(84-85):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(39), PFloat(92), PFloat(39)));
// src/compiler.pro(85-86):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(34), PFloat(92), PFloat(34)));
// src/compiler.pro(86-87):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(10), PFloat(92), PFloat(110)));
// src/compiler.pro(87-88):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(13), PFloat(92), PFloat(114)));
// src/compiler.pro(88-89):
ctx.assertz(PTerm(PAtom('ttp_escape_char'), PFloat(9), PFloat(92), PFloat(116)));
// src/compiler.pro(89-96):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_char_hex'), PVar('Code'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('StrT'), toPLst([PFloat(92), PFloat(117)], PVar('StrT2'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_escape_char_hex_body'), PVar('Code'), PFloat(0), PVar('Str'), PVar('StrT2'), PVar('Str'), PVar('StrTn'))))));
// src/compiler.pro(96-98):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_char_hex_body'), PFloat(0), PVar('Cnt'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrT')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(4), PVar('Cnt')), PAtom('!'))));
// src/compiler.pro(98-107):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_escape_char_hex_body'), PVar('Val'), PVar('Cnt'), PVar('Str'), PVar('StrT'), PVar('Str'), PVar('StrTn')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Val1'), PTerm(PAtom('/\\'), PVar('Val'), PFloat(15))), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_hex_to_chr'), PVar('Val1'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Val2'), PTerm(PAtom('>>'), PVar('Val'), PFloat(4))), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))), PTerm(PAtom('ttp_escape_char_hex_body'), PVar('Val2'), PVar('Cnt2'), PVar('Str'), PVar('StrT'), PVar('Str'), toPLst([PVar('Chr')], PVar('StrTn'))))))))));
// src/compiler.pro(107-109):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(0), PFloat(48)));
// src/compiler.pro(109-110):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(1), PFloat(49)));
// src/compiler.pro(110-111):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(2), PFloat(50)));
// src/compiler.pro(111-112):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(3), PFloat(51)));
// src/compiler.pro(112-113):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(4), PFloat(52)));
// src/compiler.pro(113-114):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(5), PFloat(53)));
// src/compiler.pro(114-115):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(6), PFloat(54)));
// src/compiler.pro(115-116):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(7), PFloat(55)));
// src/compiler.pro(116-117):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(8), PFloat(56)));
// src/compiler.pro(117-118):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(9), PFloat(57)));
// src/compiler.pro(118-119):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(10), PFloat(65)));
// src/compiler.pro(119-120):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(11), PFloat(66)));
// src/compiler.pro(120-121):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(12), PFloat(67)));
// src/compiler.pro(121-122):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(13), PFloat(68)));
// src/compiler.pro(122-123):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(14), PFloat(69)));
// src/compiler.pro(123-124):
ctx.assertz(PTerm(PAtom('ttp_escape_hex_to_chr'), PFloat(15), PFloat(70)));
// src/compiler.pro(124-139):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_put_error_impl'), PVar('SErr'), PVar('InFName'), PVar('LineNo'), PVar('Msg')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SErr'), PAtom('Error:\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SErr'), PVar('InFName')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SErr'), PAtom('\u0020(')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SErr'), PVar('LineNo')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SErr'), PAtom('):\u0020')), PTerm(PAtom('write'), PVar('SErr'), PVar('Msg'))))))))));
// src/compiler.pro(139-145):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo'), PVar('Msg')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_put_error_impl'), PVar('SErr'), PVar('InFName'), PVar('LineNo'), PVar('Msg')), PTerm(PAtom('nl'), PVar('SErr'))))));
// src/compiler.pro(145-153):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo'), PVar('Msg'), PVar('Param')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_put_error_impl'), PVar('SErr'), PVar('InFName'), PVar('LineNo'), PVar('Msg')), PTerm(PAtom(','), PTerm(PAtom('write'), PAtom(':\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('Param')), PTerm(PAtom('nl'), PVar('SErr'))))))));
// src/compiler.pro(153-159):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_reverse'), toPLst(null), toPLst(null)), PAtom('!')));
// src/compiler.pro(159-160):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_reverse'), toPLst([PVar('H')], PVar('T')), PVar('OutLst')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_reverse_impl'), PVar('T'), PVar('H'), toPLst(null), PVar('OutLst')))));
// src/compiler.pro(160-162):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_reverse_impl'), toPLst(null), PVar('OutH'), PVar('OutT'), toPLst([PVar('OutH')], PVar('OutT'))), PAtom('!')));
// src/compiler.pro(162-163):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_reverse_impl'), toPLst([PVar('H')], PVar('T')), PVar('OutH'), PVar('OutTn'), PVar('OutLst')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_reverse_impl'), PVar('T'), PVar('H'), toPLst([PVar('OutH')], PVar('OutTn')), PVar('OutLst')))));
// src/compiler.pro(163-169):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_cut_lst'), toPLst(null), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(169-170):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_cut_lst'), toPLst([PVar('H')], PVar('_')), PVar('H'), toPLst(null)), PAtom('!')));
// src/compiler.pro(170-171):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_cut_lst'), toPLst([PVar('H')], PVar('T')), PVar('E'), toPLst([PVar('H')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_cut_lst'), PVar('T'), PVar('E'), PVar('To')))));
// src/compiler.pro(171-177):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_replace'), toPLst(null), PVar('_'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(177-178):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_replace'), toPLst([PVar('Ei')], PVar('Ti')), PVar('Ei'), PVar('Eo'), toPLst([PVar('Eo')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_replace'), PVar('Ti'), PVar('Ei'), PVar('Eo'), PVar('To')))));
// src/compiler.pro(178-179):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_replace'), toPLst([PVar('Hi')], PVar('Ti')), PVar('Ei'), PVar('Eo'), toPLst([PVar('Hi')], PVar('To'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_replace'), PVar('Ti'), PVar('Ei'), PVar('Eo'), PVar('To')))));
// src/compiler.pro(179-190):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_file_name'), PVar('Path'), PVar('FileName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('Path'), PVar('PathStr')), PTerm(PAtom(','), PTerm(PAtom('ttp_file_name_str'), PVar('PathStr'), PVar('FileNameStr')), PTerm(PAtom('atom_codes'), PVar('FileName'), PVar('FileNameStr')))))));
// src/compiler.pro(190-198):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_file_name_str'), PVar('Path'), PVar('FileName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_replace'), PVar('Path'), PFloat(92), PFloat(47), PVar('NPath')), PTerm(PAtom(','), PTerm(PAtom('ttp_reverse'), PVar('NPath'), PVar('RPath')), PTerm(PAtom(','), PTerm(PAtom('ttp_cut_lst'), PVar('RPath'), PFloat(47), PVar('RFileName')), PTerm(PAtom('ttp_reverse'), PVar('RFileName'), PVar('FileName'))))))));
// src/compiler.pro(198-209):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_base_name'), PVar('Path'), PVar('BaseName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('Path'), PVar('PathStr')), PTerm(PAtom(','), PTerm(PAtom('ttp_base_name_str'), PVar('PathStr'), PVar('BaseNameStr')), PTerm(PAtom('atom_codes'), PVar('BaseName'), PVar('BaseNameStr')))))));
// src/compiler.pro(209-215):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_base_name_str'), PVar('Path'), PVar('BaseName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_file_name_str'), PVar('Path'), PVar('FileName')), PTerm(PAtom('ttp_cut_lst'), PVar('FileName'), PFloat(46), PVar('BaseName'))))));
// src/compiler.pro(215-226):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_tokens'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_tokens_impl'), PVar('Xb'), PVar('Xt'), PVar('Y'), PVar('Y'), PVar('Y'), toPLst(null)))));
// src/compiler.pro(226-232):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_tokens_impl'), PVar('Xb'), toPLst(null), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_line_end'), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(232-238):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_tokens_impl'), PVar('Xb'), PVar('Xt'), PVar('Yb'), toPLst([PVar('Y')], PVar('Yt2')), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_token'), PVar('Xb'), PVar('Xb2'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_tokens_impl'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn'))))));
// src/compiler.pro(238-240):
ctx.assertz(PTerm(PAtom('ttp_lex_tokens_impl'), PVar('Xt'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(240-249):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_punct'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_integer'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_variable'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_name'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom('ttp_lex_double_quoted_list'), PVar('Xb'), PVar('Xt'), PVar('Y'))))))));
// src/compiler.pro(249-255):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_name'), PVar('Xb'), PVar('Xt'), PTerm(PAtom('name'), PVar('Y'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom('ttp_lex_name_token'), PVar('Xb2'), PVar('Xt'), PVar('Y')))));
// src/compiler.pro(255-261):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_variable'), PVar('Xb'), PVar('Xt'), PTerm(PAtom('var'), PVar('Y'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom('ttp_lex_variable_token'), PVar('Xb2'), PVar('Xt'), PVar('Y')))));
// src/compiler.pro(261-267):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_integer'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom('ttp_lex_integer_token'), PVar('Xb2'), PVar('Xt'), PVar('Y')))));
// src/compiler.pro(267-273):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_list'), PVar('Xb'), PVar('Xt'), PTerm(PAtom('str'), PVar('Y'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom('ttp_lex_double_quoted_list_token'), PVar('Xb2'), PVar('Xt'), PVar('Y')))));
// src/compiler.pro(273-283):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_punct'), PVar('Xb'), PVar('Xt'), PVar('Z')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PVar('Xb3')], PVar('Xt')), PVar('Xb2')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Xb3'), PFloat(46)), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_or_end'), PVar('Xt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('atom_codes'), PVar('Z'), toPLst([PVar('Xb3')])))))))));
// src/compiler.pro(283-289):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_punct'), PVar('Xb'), PVar('Xt'), PAtom('_(')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence2'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PFloat(40)], PVar('Xt')), PVar('Xb2')), PAtom('!')))));
// src/compiler.pro(289-295):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_punct'), PVar('Xb'), PVar('Xt'), PAtom('(')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PFloat(40)], PVar('Xt')), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(295-303):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_punct'), PVar('Xb'), PVar('Xt'), PVar('Z')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PVar('Xb3')], PVar('Xt')), PVar('Xb2')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_punct_char'), PVar('Xb3')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('atom_codes'), PVar('Z'), toPLst([PVar('Xb3')]))))))));
// src/compiler.pro(303-305):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(41)));
// src/compiler.pro(305-306):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(91)));
// src/compiler.pro(306-307):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(93)));
// src/compiler.pro(307-308):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(123)));
// src/compiler.pro(308-309):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(125)));
// src/compiler.pro(309-310):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(124)));
// src/compiler.pro(310-311):
ctx.assertz(PTerm(PAtom('ttp_lex_punct_char'), PFloat(44)));
// src/compiler.pro(311-316):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_line_end'), PVar('Xb')), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), toPLst(null))));
// src/compiler.pro(316-324):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text_sequence'), PVar('Xb'), PVar('Xt')), PTerm(PAtom('ttp_lex_layout_text_rep'), PVar('Xb'), PVar('Xt'))));
// src/compiler.pro(324-330):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text_sequence2'), PVar('Xb'), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_layout_text_rep'), PVar('Xb2'), PVar('Xt'))))));
// src/compiler.pro(330-337):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text_rep'), PVar('Xb'), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text'), PVar('Xb'), PVar('Xb2')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_layout_text_rep'), PVar('Xb2'), PVar('Xt'))))));
// src/compiler.pro(337-338):
ctx.assertz(PTerm(PAtom('ttp_lex_layout_text_rep'), PVar('Xb'), PVar('Xb')));
// src/compiler.pro(338-343):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text_or_end'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_text'), PVar('Xb'), PVar('_')), PAtom('!'))));
// src/compiler.pro(343-344):
ctx.assertz(PTerm(PAtom('ttp_lex_layout_text_or_end'), toPLst(null)));
// src/compiler.pro(344-350):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text'), PVar('Xb'), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_single_line_comment'), PVar('Xb'), PVar('Xt')), PAtom('!'))));
// src/compiler.pro(350-354):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text'), PVar('Xb'), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_bracketed_comment'), PVar('Xb'), PVar('Xt')), PAtom('!'))));
// src/compiler.pro(354-359):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_text'), toPLst([PVar('Xb')], PVar('Xb2')), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_layout_chars'), PVar('Xb2'), PVar('Xt'))))));
// src/compiler.pro(359-366):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_chars'), toPLst([PVar('Xb')], PVar('Xb2')), PVar('Xt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_layout_chars'), PVar('Xb2'), PVar('Xt'))))));
// src/compiler.pro(366-368):
ctx.assertz(PTerm(PAtom('ttp_lex_layout_chars'), PVar('Xb'), PVar('Xb')));
// src/compiler.pro(368-374):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_line_comment'), toPLst([PFloat(37)], PVar('Xb2')), PVar('Xt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_single_line_comment_rep'), PVar('Xb2'), PVar('Xt')))));
// src/compiler.pro(374-376):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_line_comment_rep'), toPLst([PFloat(10)], PVar('Xt')), PVar('Xt')), PAtom('!')));
// src/compiler.pro(376-378):
ctx.assertz(PTerm(PAtom('ttp_lex_single_line_comment_rep'), toPLst(null), toPLst(null)));
// src/compiler.pro(378-383):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_line_comment_rep'), toPLst([PVar('_')], PVar('Xb')), PVar('Xt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_single_line_comment_rep'), PVar('Xb'), PVar('Xt')))));
// src/compiler.pro(383-389):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_bracketed_comment'), toPLst([PFloat(47), PFloat(42)], PVar('Xb')), PVar('Xt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_bracketed_comment_rep'), PVar('Xb'), PVar('Xt')))));
// src/compiler.pro(389-391):
ctx.assertz(PTerm(PAtom('ttp_lex_bracketed_comment_rep'), toPLst([PFloat(42), PFloat(47)], PVar('Xt')), PVar('Xt')));
// src/compiler.pro(391-395):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_bracketed_comment_rep'), toPLst([PVar('_')], PVar('Xb')), PVar('Xt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_bracketed_comment_rep'), PVar('Xb'), PVar('Xt')))));
// src/compiler.pro(395-407):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_name_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_letter_digit_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_graphic_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_quoted_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_semicolon_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom('ttp_lex_cut_token'), PVar('Xb'), PVar('Xt'), PVar('Y'))))))));
// src/compiler.pro(407-416):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_letter_digit_token'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_small_letter_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_letter_digit_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('atom_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(416-423):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_letter_digit_token_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_alphanumeric_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_letter_digit_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(423-424):
ctx.assertz(PTerm(PAtom('ttp_lex_letter_digit_token_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(424-433):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_token'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_graphic_token_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_graphic_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('atom_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(433-440):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_token_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_graphic_token_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_graphic_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(440-441):
ctx.assertz(PTerm(PAtom('ttp_lex_graphic_token_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(441-443):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_token_char'), PFloat(92)), PAtom('!')));
// src/compiler.pro(443-444):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_token_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_graphic_char'), PVar('Chr')), PAtom('!'))));
// src/compiler.pro(444-451):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_quoted_token'), toPLst([PFloat(39)], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_quoted_token_rep'), PVar('Xb2'), toPLst([PFloat(39)], PVar('Xt')), PVar('Yb'), PVar('Yb'), PVar('Yb'), toPLst(null)), PTerm(PAtom('atom_codes'), PVar('Y'), PVar('Yb'))))));
// src/compiler.pro(451-457):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_quoted_token_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_single_quoted_item'), PVar('Xb'), PVar('Xb2'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt2')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_quoted_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn'))))));
// src/compiler.pro(457-458):
ctx.assertz(PTerm(PAtom('ttp_lex_quoted_token_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(458-463):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_quoted_item'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_single_quoted_character'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom('ttp_lex_contenuation_escape_sequence'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')))));
// src/compiler.pro(463-465):
ctx.assertz(PTerm(PAtom('ttp_lex_contenuation_escape_sequence'), toPLst([PFloat(92), PFloat(10)], PVar('Xt')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(465-467):
ctx.assertz(PTerm(PAtom('ttp_lex_semicolon_token'), toPLst([PFloat(59)], PVar('Xt')), PVar('Xt'), PAtom(';')));
// src/compiler.pro(467-469):
ctx.assertz(PTerm(PAtom('ttp_lex_cut_token'), toPLst([PFloat(33)], PVar('Xt')), PVar('Xt'), PAtom('!')));
// src/compiler.pro(469-476):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_quoted_character'), toPLst([PFloat(39), PFloat(39)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(39)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(476-477):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_quoted_character'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_non_quote_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PAtom('!'))));
// src/compiler.pro(477-478):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_quoted_character'), toPLst([PFloat(34)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(34)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(478-479):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_single_quoted_character'), toPLst([PFloat(96)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(96)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(479-481):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_character'), toPLst([PFloat(34), PFloat(34)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(34)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(481-482):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_character'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_non_quote_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PAtom('!'))));
// src/compiler.pro(482-483):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_character'), toPLst([PFloat(39)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(39)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(483-484):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_character'), toPLst([PFloat(96)], PVar('Xt')), PVar('Xt'), PVar('Yb'), toPLst([PFloat(96)], PVar('Yt')), PVar('Yb'), PVar('Yt')), PAtom('!')));
// src/compiler.pro(484-493):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_non_quote_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_hexadecimal_escape_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_octal_escape_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_control_escape_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_meta_escape_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom('ttp_lex_non_meta_char'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn'))))))));
// src/compiler.pro(493-502):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_hexadecimal_escape_char'), toPLst([PFloat(92), PFloat(120), PVar('Chr')], PVar('Xb')), PVar('Xt'), PVar('Yb'), toPLst([PVar('Y')], PVar('Yt')), PVar('Yb'), PVar('Yt')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Zb'), toPLst([PVar('Chr')], PVar('Zt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_escape_char_rep'), PVar('Xb'), toPLst([PFloat(92)], PVar('Xt')), PVar('Zb'), PVar('Zt'), PVar('Zb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), toPLst([PFloat(48), PFloat(120)], PVar('Zb')))))))));
// src/compiler.pro(502-509):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_hexadecimal_escape_char_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_hexadecimal_escape_char_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(509-510):
ctx.assertz(PTerm(PAtom('ttp_lex_hexadecimal_escape_char_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(510-519):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_octal_escape_char'), toPLst([PFloat(92), PVar('Chr')], PVar('Xb3')), PVar('Xt'), PVar('Yb'), toPLst([PVar('Y')], PVar('Yt')), PVar('Yb'), PVar('Yt')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Zb'), toPLst([PVar('Chr')], PVar('Zt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_escape_char_rep'), PVar('Xb3'), toPLst([PFloat(92)], PVar('Xt')), PVar('Zb'), PVar('Zt'), PVar('Zb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), toPLst([PFloat(48), PFloat(111)], PVar('Zb')))))))));
// src/compiler.pro(519-526):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_octal_escape_char_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_octal_escape_char_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(526-527):
ctx.assertz(PTerm(PAtom('ttp_lex_octal_escape_char_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(527-534):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_control_escape_char'), toPLst([PFloat(92), PVar('Chr')], PVar('Xt')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_symbolic_control_char'), PVar('Chr'), PVar('ChrN')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('ChrN')], PVar('Ytn')))))));
// src/compiler.pro(534-536):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(110), PFloat(10)), PAtom('!')));
// src/compiler.pro(536-537):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(116), PFloat(9)), PAtom('!')));
// src/compiler.pro(537-538):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(114), PFloat(13)), PAtom('!')));
// src/compiler.pro(538-539):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(98), PFloat(8)), PAtom('!')));
// src/compiler.pro(539-540):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(97), PFloat(7)), PAtom('!')));
// src/compiler.pro(540-541):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(102), PFloat(12)), PAtom('!')));
// src/compiler.pro(541-542):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_symbolic_control_char'), PFloat(118), PFloat(11)), PAtom('!')));
// src/compiler.pro(542-549):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_meta_escape_char'), toPLst([PFloat(92), PVar('Chr')], PVar('Xt')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_meta_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Ytn')))))));
// src/compiler.pro(549-556):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_non_meta_char'), toPLst([PVar('Chr')], PVar('Xt')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_meta_char'), PVar('Chr'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Ytn')))))));
// src/compiler.pro(556-568):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_variable_token'), toPLst([PFloat(95)], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PFloat(95)], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_named_variable_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('atom_codes'), PVar('Y'), PVar('Yb')))))));
// src/compiler.pro(568-576):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_variable_token'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_capital_letter_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_named_variable_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('atom_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(576-583):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_named_variable_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_alphanumeric_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_named_variable_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(583-584):
ctx.assertz(PTerm(PAtom('ttp_lex_named_variable_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(584-597):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_integer_token'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_character_code_constant'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_hexadecimal_constant'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_binary_constant'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_octal_constant'), PVar('Xb'), PVar('Xt'), PVar('Y')), PTerm(PAtom('ttp_lex_integer_constant'), PVar('Xb'), PVar('Xt'), PVar('Y'))))))));
// src/compiler.pro(597-605):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_integer_constant'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_integer_constant_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), PVar('Yb')))))));
// src/compiler.pro(605-612):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_integer_constant_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_integer_constant_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(612-613):
ctx.assertz(PTerm(PAtom('ttp_lex_integer_constant_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(613-622):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_binary_constant'), toPLst([PFloat(48), PFloat(98), PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_binary_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PFloat(48), PFloat(98), PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_binary_constant_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(622-629):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_binary_constant_rep'), toPLst([PVar('Chr')], PVar('Xb2')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_binary_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_binary_constant_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(629-630):
ctx.assertz(PTerm(PAtom('ttp_lex_binary_constant_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(630-639):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_octal_constant'), toPLst([PFloat(48), PFloat(111), PVar('Chr')], PVar('Xb')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PFloat(48), PFloat(111), PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_constant_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(639-646):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_octal_constant_rep'), toPLst([PVar('Chr')], PVar('Xb')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_octal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_octal_constant_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(646-647):
ctx.assertz(PTerm(PAtom('ttp_lex_octal_constant_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(647-656):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_hexadecimal_constant'), toPLst([PFloat(48), PFloat(120), PVar('Chr')], PVar('Xb')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yb'), toPLst([PFloat(48), PFloat(120), PVar('Chr')], PVar('Yt'))), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_constant_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), toPLst(null)), PTerm(PAtom('number_codes'), PVar('Y'), PVar('Yb'))))))));
// src/compiler.pro(656-663):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_hexadecimal_constant_rep'), toPLst([PVar('Chr')], PVar('Xb')), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_hexadecimal_digit_char'), PVar('Chr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Yt'), toPLst([PVar('Chr')], PVar('Yt2'))), PTerm(PAtom('ttp_lex_hexadecimal_constant_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn')))))));
// src/compiler.pro(663-664):
ctx.assertz(PTerm(PAtom('ttp_lex_hexadecimal_constant_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(664-671):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_character_code_constant'), toPLst([PFloat(48), PFloat(39)], PVar('Xb')), PVar('Xt'), PVar('Y')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_single_quoted_character'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yb'), PVar('Yb'), toPLst(null)), PTerm(PAtom('='), toPLst([PVar('Y')], toPLst(null)), PVar('Yb'))))));
// src/compiler.pro(671-684):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_list_token'), toPLst([PFloat(34)], PVar('Xb2')), PVar('Xt'), PVar('Y')), PTerm(PAtom('ttp_lex_double_quoted_list_token_rep'), PVar('Xb2'), toPLst([PFloat(34)], PVar('Xt')), PVar('Y'), PVar('Y'), PVar('Y'), toPLst(null))));
// src/compiler.pro(684-690):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_list_token_rep'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_double_quoted_item'), PVar('Xb'), PVar('Xb2'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt2')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_lex_double_quoted_list_token_rep'), PVar('Xb2'), PVar('Xt'), PVar('Yb'), PVar('Yt2'), PVar('Yb'), PVar('Ytn'))))));
// src/compiler.pro(690-691):
ctx.assertz(PTerm(PAtom('ttp_lex_double_quoted_list_token_rep'), PVar('Xb'), PVar('Xb'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Yt')));
// src/compiler.pro(691-696):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_double_quoted_item'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom(';'), PTerm(PAtom('ttp_lex_double_quoted_character'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')), PTerm(PAtom('ttp_lex_contenuation_escape_sequence'), PVar('Xb'), PVar('Xt'), PVar('Yb'), PVar('Yt'), PVar('Yb'), PVar('Ytn')))));
// src/compiler.pro(696-701):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(35)), PAtom('!')));
// src/compiler.pro(701-702):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(36)), PAtom('!')));
// src/compiler.pro(702-703):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(38)), PAtom('!')));
// src/compiler.pro(703-704):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(42)), PAtom('!')));
// src/compiler.pro(704-705):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(43)), PAtom('!')));
// src/compiler.pro(705-706):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(45)), PAtom('!')));
// src/compiler.pro(706-707):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(46)), PAtom('!')));
// src/compiler.pro(707-708):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(47)), PAtom('!')));
// src/compiler.pro(708-709):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(58)), PAtom('!')));
// src/compiler.pro(709-710):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(60)), PAtom('!')));
// src/compiler.pro(710-711):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(61)), PAtom('!')));
// src/compiler.pro(711-712):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(62)), PAtom('!')));
// src/compiler.pro(712-713):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(63)), PAtom('!')));
// src/compiler.pro(713-714):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(64)), PAtom('!')));
// src/compiler.pro(714-715):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(94)), PAtom('!')));
// src/compiler.pro(715-716):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_graphic_char'), PFloat(126)), PAtom('!')));
// src/compiler.pro(716-721):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_alphanumeric_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_alpha_char'), PVar('X')), PAtom('!'))));
// src/compiler.pro(721-722):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_alphanumeric_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('X')), PAtom('!'))));
// src/compiler.pro(722-724):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_alpha_char'), PFloat(95)), PAtom('!')));
// src/compiler.pro(724-725):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_alpha_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_letter_char'), PVar('X')), PAtom('!'))));
// src/compiler.pro(725-733):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_letter_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_layout_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_graphic_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_solo_char'), PVar('X'))), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_meta_char'), PVar('X')))))))));
// src/compiler.pro(733-743):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_small_letter_char'), PVar('X')), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(97), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(122))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_capital_letter_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_layout_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_graphic_char'), PVar('X'))), PTerm(PAtom(','), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_solo_char'), PVar('X'))), PTerm(PAtom('\\+'), PTerm(PAtom('ttp_lex_meta_char'), PVar('X')))))))))));
// src/compiler.pro(743-747):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_capital_letter_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(65), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(90)))));
// src/compiler.pro(747-751):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_decimal_digit_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(48), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(57)))));
// src/compiler.pro(751-754):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_binary_digit_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(48), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(49)))));
// src/compiler.pro(754-757):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_octal_digit_char'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(48), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(55)))));
// src/compiler.pro(757-762):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_hexadecimal_digit_char'), PVar('X')), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(48), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(57))), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(65), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(70))), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(97), PVar('X')), PTerm(PAtom('=<'), PVar('X'), PFloat(102)))))));
// src/compiler.pro(762-767):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(33)), PAtom('!')));
// src/compiler.pro(767-768):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(40)), PAtom('!')));
// src/compiler.pro(768-769):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(41)), PAtom('!')));
// src/compiler.pro(769-770):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(44)), PAtom('!')));
// src/compiler.pro(770-771):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(59)), PAtom('!')));
// src/compiler.pro(771-772):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(91)), PAtom('!')));
// src/compiler.pro(772-773):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(93)), PAtom('!')));
// src/compiler.pro(773-774):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(91)), PAtom('!')));
// src/compiler.pro(774-775):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(93)), PAtom('!')));
// src/compiler.pro(775-776):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(124)), PAtom('!')));
// src/compiler.pro(776-777):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(37)), PAtom('!')));
// src/compiler.pro(777-778):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_solo_char'), PFloat(46)), PAtom('!')));
// src/compiler.pro(778-783):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(0), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PVar('Xb'), PFloat(32)), PAtom('!')))));
// src/compiler.pro(783-784):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(127), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PVar('Xb'), PFloat(160)), PAtom('!')))));
// src/compiler.pro(784-785):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(173), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(785-786):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(5760), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(786-787):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(6158), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(787-788):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PFloat(8192), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=<'), PVar('Xb'), PFloat(8203)), PAtom('!')))));
// src/compiler.pro(788-789):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(8239), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(789-790):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(8287), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(790-791):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(12288), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(791-792):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_layout_char'), PVar('Xb')), PTerm(PAtom(','), PTerm(PAtom('=:='), PFloat(65279), PVar('Xb')), PAtom('!'))));
// src/compiler.pro(792-797):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_meta_char'), PFloat(92)), PAtom('!')));
// src/compiler.pro(797-798):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_meta_char'), PFloat(39)), PAtom('!')));
// src/compiler.pro(798-799):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_meta_char'), PFloat(34)), PAtom('!')));
// src/compiler.pro(799-800):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_lex_meta_char'), PFloat(96)), PAtom('!')));
// src/compiler.pro(800-808):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1200), PAtom('xfx'), PAtom(':-'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(808-809):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1200), PAtom('xfx'), PAtom('-->'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(809-810):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1200), PAtom('fx'), PAtom(':-'), PAtom('prefix'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(810-811):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1200), PAtom('fx'), PAtom('?-'), PAtom('prefix'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(811-812):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1100), PAtom('xfy'), PAtom(';'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(812-813):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1050), PAtom('xfy'), PAtom('->'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(813-814):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(1000), PAtom('xfy'), PAtom(','), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(814-815):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(900), PAtom('fy'), PAtom('\\+'), PAtom('prefix'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(815-816):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(816-817):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('\\='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(817-818):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('=='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(818-819):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('\\=='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(819-820):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('@<'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(820-821):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('@=<'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(821-822):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('@>'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(822-823):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('@>='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(823-824):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('=..'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(824-825):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('is'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(825-826):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('=:='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(826-827):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('=\\='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(827-828):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('<'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(828-829):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('=<'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(829-830):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('>'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(830-831):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(700), PAtom('xfx'), PAtom('>='), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(831-832):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(500), PAtom('yfx'), PAtom('+'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(832-833):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(500), PAtom('yfx'), PAtom('-'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(833-834):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(500), PAtom('yfx'), PAtom('/\\'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(834-835):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(500), PAtom('yfx'), PAtom('\\/'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(835-836):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('*'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(836-837):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('/'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(837-838):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('//'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(838-839):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('rem'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(839-840):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('mod'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(840-841):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('<<'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(841-842):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(400), PAtom('yfx'), PAtom('>>'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')));
// src/compiler.pro(842-843):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(200), PAtom('xfx'), PAtom('**'), PAtom('notpre'), PAtom('notpost'), PAtom('n'), PAtom('n')));
// src/compiler.pro(843-844):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(200), PAtom('xfy'), PAtom('^'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(844-845):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(200), PAtom('fy'), PAtom('-'), PAtom('prefix'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(845-846):
ctx.assertz(PTerm(PAtom('ttp_op_tbl'), PFloat(200), PAtom('fy'), PAtom('\\'), PAtom('prefix'), PAtom('notpost'), PAtom('a'), PAtom('r')));
// src/compiler.pro(846-852):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_op_info'), PVar('P'), PVar('Pn'), PVar('S'), PVar('Op'), PVar('Pre'), PVar('Post'), PVar('A'), PVar('D')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_tbl'), PVar('P'), PVar('S'), PVar('Op'), PVar('Pre'), PVar('Post'), PVar('A'), PVar('D')), PTerm(PAtom('='), PVar('P'), PVar('Pn')))));
// src/compiler.pro(852-857):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_op_info'), PFloat(0), PVar('_'), PVar('_'), PVar('_'), PVar('_'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PAtom('!'), PAtom('fail'))));
// src/compiler.pro(857-863):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_op_info'), PVar('P'), PVar('Pn'), PVar('Op'), PVar('S'), PVar('Pre'), PVar('Post'), PVar('A'), PVar('D')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P2'), PTerm(PAtom('-'), PVar('P'), PFloat(1))), PTerm(PAtom('ttp_op_info'), PVar('P2'), PVar('Pn'), PVar('Op'), PVar('S'), PVar('Pre'), PVar('Post'), PVar('A'), PVar('D'))))));
// src/compiler.pro(863-872):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_top_level_expr'), PVar('Ai'), PVar('Ao'), toPLst(null), toPLst([PTerm(PAtom('punc'), PAtom('.')), PTerm(PAtom('term'), PVar('X'))])), PAtom('!'))));
// src/compiler.pro(872-878):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_top_level_expr'), PVar('Ai'), PVar('Ao'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PFloat(1201), PVar('Bi'), PVar('Bo')), PAtom('!'))));
// src/compiler.pro(878-883):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_inner_expr'), PVar('Ai'), PVar('Ao'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PFloat(999), PVar('Bi'), PVar('Bo')), PAtom('!'))));
// src/compiler.pro(883-892):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('(')), PTerm(PAtom('term'), PVar('X'))], PVar('_')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('atom'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_inner_expr'), PVar('A2'), PVar('A3'), toPLst([PVar('A')], PVar('Bi')), PVar('Bi2')), PTerm(PAtom('ttp_stx_expr'), PVar('A3'), PVar('Ao'), PVar('P'), PVar('Bi2'), PVar('Bo')))))));
// src/compiler.pro(892-898):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('['))], PVar('_')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_inner_expr'), PVar('A2'), PVar('A3'), toPLst([PVar('A')], PVar('Bi')), PVar('Bi2')), PTerm(PAtom('ttp_stx_expr'), PVar('A3'), PVar('Ao'), PVar('P'), PVar('Bi2'), PVar('Bo'))))));
// src/compiler.pro(898-904):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('_('))], PVar('_')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_top_level_expr'), PVar('A2'), PVar('A3'), toPLst([PVar('A')], PVar('Bi')), PVar('Bi2')), PTerm(PAtom('ttp_stx_expr'), PVar('A3'), PVar('Ao'), PVar('P'), PVar('Bi2'), PVar('Bo'))))));
// src/compiler.pro(904-910):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('('))], PVar('_')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_top_level_expr'), PVar('A2'), PVar('A3'), toPLst([PVar('A')], PVar('Bi')), PVar('Bi2')), PTerm(PAtom('ttp_stx_expr'), PVar('A3'), PVar('Ao'), PVar('P'), PVar('Bi2'), PVar('Bo'))))));
// src/compiler.pro(910-916):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('{'))], PVar('_')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_top_level_expr'), PVar('A2'), PVar('A3'), toPLst([PVar('A')], PVar('Bi')), PVar('Bi2')), PTerm(PAtom('ttp_stx_expr'), PVar('A3'), PVar('Ao'), PVar('P'), PVar('Bi2'), PVar('Bo'))))));
// src/compiler.pro(916-927):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('Y')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PTerm(PAtom('-'), PVar('P2'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('notpre'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X'), PVar('Y')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(927-934):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('Y')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P2'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('notpre'), PAtom('notpost'), PAtom('a'), PAtom('l')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X'), PVar('Y')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo')))))));
// src/compiler.pro(934-940):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('Y')), PTerm(PAtom('op'), PVar('Op')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('_'), PVar('_'), PVar('Op'), PAtom('notpre'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op'), PVar('X'), PVar('Y')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo'))))));
// src/compiler.pro(940-951):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PTerm(PAtom('-'), PVar('P2'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('notpre'), PAtom('postfix'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(951-959):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PAtom('a'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PTerm(PAtom('-'), PVar('P2'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('notpre'), PAtom('postfix'), PAtom('a'), PAtom('l')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(959-965):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('notpre'), PAtom('postfix'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('T'))], PVar('Bt')), PVar('Bo'))))));
// src/compiler.pro(965-976):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X'), PVar('Y'), PVar('Z')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('number'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('='), PTerm(PAtom('op'), PAtom('-')), PVar('Y')), PTerm(PAtom('='), PTerm(PAtom('term'), PAtom('-')), PVar('Y'))), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('='), PTerm(PAtom('op'), PVar('_')), PVar('Z')), PTerm(PAtom('='), PTerm(PAtom('punc'), PVar('_')), PVar('Z'))), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('X2'), PTerm(PAtom('-'), PVar('X'))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X2')), PVar('Z')], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(976-983):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X'), PVar('Y')]), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('number'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('='), PTerm(PAtom('op'), PAtom('-')), PVar('Y')), PTerm(PAtom('='), PTerm(PAtom('term'), PAtom('-')), PVar('Y'))), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('X2'), PTerm(PAtom('-'), PVar('X'))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X2'))]), PVar('Bo')))))));
// src/compiler.pro(983-993):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op3')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P3'), PVar('_'), PVar('Op3'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P1'), PVar('_'), PVar('Op1'), PVar('_'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom('<'), PVar('P1'), PVar('P3')), PTerm(PAtom('is'), PVar('P2s'), PTerm(PAtom('-'), PVar('P1'), PFloat(1)))), PTerm(PAtom('is'), PVar('P2s'), PTerm(PAtom('-'), PVar('P3'), PFloat(1)))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P2s'), PVar('_'), PVar('_'), PVar('Op2'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op2'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op3')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')))))))));
// src/compiler.pro(993-1001):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P1'), PVar('_'), PVar('Op1'), PVar('_'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P2s'), PTerm(PAtom('-'), PVar('P1'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P2s'), PVar('_'), PVar('_'), PVar('Op2'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op2'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(1001-1010):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op3')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P3'), PVar('_'), PVar('Op3'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PTerm(PAtom('-'), PVar('P3'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('P1'), PVar('_'), PVar('Op1'), PVar('_'), PAtom('notpost'), PAtom('a'), PAtom('r')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1'), PVar('_'), PVar('_'), PVar('Op2'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op2'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op3')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')))))))));
// src/compiler.pro(1010-1017):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P1'), PVar('_'), PVar('Op1'), PVar('_'), PAtom('notpost'), PAtom('a'), PAtom('r')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1'), PVar('_'), PVar('_'), PVar('Op2'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op2'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('op'), PVar('Op1'))], PVar('Bt')), PVar('Bo')))))));
// src/compiler.pro(1017-1026):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op1')), PTerm(PAtom('punc'), PVar('M'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PTerm(PAtom('-'), PVar('P2'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('punc'), PVar('M'))], PVar('Bt')), PVar('Bo'))))))));
// src/compiler.pro(1026-1032):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M2')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op')), PTerm(PAtom('punc'), PVar('M1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('_'), PVar('_'), PVar('Op'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M2')), PTerm(PAtom('term'), PVar('T')), PTerm(PAtom('punc'), PVar('M1'))], PVar('Bt')), PVar('Bo'))))));
// src/compiler.pro(1032-1040):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op1'))]), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('P2'), PVar('_'), PVar('Op2'), PAtom('notpre'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('P1s'), PVar('P2')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P1s'), PVar('_'), PVar('_'), PVar('Op1'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op1'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('op'), PVar('Op2')), PTerm(PAtom('term'), PVar('T'))]), PVar('Bo'))))))));
// src/compiler.pro(1040-1046):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('op'), PVar('Op'))]), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('_'), PVar('_'), PVar('Op'), PAtom('prefix'), PAtom('notpost'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('Op'), PVar('X')]))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('punc'), PVar('M')), PTerm(PAtom('term'), PVar('T'))]), PVar('Bo'))))));
// src/compiler.pro(1046-1057):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), PFloat(999), PVar('P')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PVar('Close'), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_close_punc'), PVar('Close')), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), toPLst([PVar('Close'), PTerm(PAtom('args'), toPLst([PVar('X')]))], PVar('Bt')), PVar('Bo')))))));
// src/compiler.pro(1057-1064):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), PFloat(999), PVar('P')), PTerm(PAtom(','), PTerm(PAtom('='), toPLst([PVar('Close'), PTerm(PAtom('args'), PVar('X2')), PTerm(PAtom('punc'), PAtom(',')), PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bi')), PTerm(PAtom(','), PTerm(PAtom('ttp_close_punc'), PVar('Close')), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), toPLst([PVar('Close'), PTerm(PAtom('args'), toPLst([PVar('X')], PVar('X2')))], PVar('Bt')), PVar('Bo')))))));
// src/compiler.pro(1064-1072):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(')')), PTerm(PAtom('args'), PVar('X2')), PTerm(PAtom('punc'), PAtom('(')), PTerm(PAtom('term'), PVar('X1'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('atom'), PVar('X1')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('Ao'), PVar('Ai')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('T'), PTerm(PAtom('pred'), toPLst([PVar('X1')], PVar('X2')))), PTerm(PAtom('='), PVar('Bo'), toPLst([PTerm(PAtom('term'), PVar('T'))], PVar('Bt'))))))));
// src/compiler.pro(1072-1077):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(']')), PTerm(PAtom('args'), toPLst([PVar('X2')])), PTerm(PAtom('punc'), PAtom('|')), PTerm(PAtom('args'), PVar('X1')), PTerm(PAtom('punc'), PAtom('['))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_lst_add'), PVar('X1'), PVar('X2'), PVar('T')), PTerm(PAtom('='), PVar('Bo'), toPLst([PTerm(PAtom('term'), PTerm(PAtom('list'), PVar('T')))], PVar('Bt'))))));
// src/compiler.pro(1077-1079):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(']')), PTerm(PAtom('punc'), PAtom('['))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PTerm(PAtom('list'), toPLst(null)))], PVar('Bt'))));
// src/compiler.pro(1079-1081):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(']')), PTerm(PAtom('args'), PVar('X')), PTerm(PAtom('punc'), PAtom('['))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PTerm(PAtom('list'), PVar('X')))], PVar('Bt'))));
// src/compiler.pro(1081-1083):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(')')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('punc'), PAtom('_('))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt'))));
// src/compiler.pro(1083-1085):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom(')')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('punc'), PAtom('('))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt'))));
// src/compiler.pro(1085-1087):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom('}')), PTerm(PAtom('punc'), PAtom('{'))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PAtom('{}'))], PVar('Bt'))));
// src/compiler.pro(1087-1089):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), toPLst([PTerm(PAtom('punc'), PAtom('}')), PTerm(PAtom('term'), PVar('X')), PTerm(PAtom('punc'), PAtom('{'))], PVar('Bt')), toPLst([PTerm(PAtom('term'), PTerm(PAtom('pred'), toPLst([PAtom('{}'), PVar('X')])))], PVar('Bt'))));
// src/compiler.pro(1089-1096):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), toPLst([PVar('Close'), PTerm(PAtom('op'), PVar('X')), PVar('Open')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('ttp_open_punc'), PVar('Open')), PTerm(PAtom('ttp_sep_punc'), PVar('Open'))), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('ttp_close_punc'), PVar('Close')), PTerm(PAtom('ttp_sep_punc'), PVar('Close'))), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('Ao'), PVar('P'), toPLst([PVar('Close'), PTerm(PAtom('term'), PVar('X')), PVar('Open')], PVar('Bt')), PVar('Bo'))))));
// src/compiler.pro(1096-1103):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), toPLst([PTerm(PAtom('name'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('Ph'), PVar('_'), PVar('_'), PVar('X'), PVar('_'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('B2'), toPLst([PTerm(PAtom('op'), PVar('X'))], PVar('Bt'))), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('Ph'), PVar('B2'), PVar('Bo'))))));
// src/compiler.pro(1103-1109):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('atomic'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('ttp_op_info'), PVar('P'), PVar('_'), PVar('_'), PVar('X'), PVar('_'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('op'), PVar('X'))], PVar('Bt')), PVar('Bo'))))));
// src/compiler.pro(1109-1113):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('name'), PVar('X'))], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1113-1118):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('var'), PVar('_')), PVar('X')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')))));
// src/compiler.pro(1118-1123):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('str'), PVar('_')), PVar('X')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')))));
// src/compiler.pro(1123-1125):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('.')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('.'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1125-1126):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('_(')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('_('))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1126-1127):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('(')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('('))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1127-1128):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom(')')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom(')'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1128-1129):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('[')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('['))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1129-1130):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom(']')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom(']'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1130-1131):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('{')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('{'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1131-1132):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('}')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('}'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1132-1133):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom(',')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom(','))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1133-1134):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PAtom('|')], PVar('Bt')), PVar('Bo')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('punc'), PAtom('|'))], PVar('Bt')), PVar('Bo'))));
// src/compiler.pro(1134-1139):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PVar('X')], PVar('Bt')), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('atomic'), PVar('X')), PTerm(PAtom('ttp_stx_expr'), PVar('Ai'), PVar('Ao'), PVar('P'), toPLst([PTerm(PAtom('term'), PVar('X'))], PVar('Bt')), PVar('Bo')))));
// src/compiler.pro(1139-1143):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), PVar('A'), PVar('A'), PVar('_'), PVar('X'), PVar('X')), PTerm(PAtom('='), toPLst([PTerm(PAtom('punc'), PAtom('.')), PTerm(PAtom('term'), PVar('_'))]), PVar('X'))));
// src/compiler.pro(1143-1145):
ctx.assertz(PTerm(PAtom('ttp_stx_expr'), toPLst(null), toPLst(null), PVar('_'), PVar('Bi'), PVar('Bi')));
// src/compiler.pro(1145-1150):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_stx_expr'), toPLst([PVar('A')], PVar('A2')), PVar('Ao'), PVar('P'), PVar('Bi'), PVar('Bo')), PTerm(PAtom(','), PTerm(PAtom('='), PVar('B2'), toPLst([PVar('A')], PVar('Bi'))), PTerm(PAtom('ttp_stx_expr'), PVar('A2'), PVar('Ao'), PVar('P'), PVar('B2'), PVar('Bo')))));
// src/compiler.pro(1150-1153):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_sep_punc'), PTerm(PAtom('punc'), PVar('C'))), PTerm(PAtom('ttp_sep_punc_char'), PVar('C'))));
// src/compiler.pro(1153-1154):
ctx.assertz(PTerm(PAtom('ttp_sep_punc_char'), PAtom(',')));
// src/compiler.pro(1154-1155):
ctx.assertz(PTerm(PAtom('ttp_sep_punc_char'), PAtom(';')));
// src/compiler.pro(1155-1156):
ctx.assertz(PTerm(PAtom('ttp_sep_punc_char'), PAtom('|')));
// src/compiler.pro(1156-1157):
ctx.assertz(PTerm(PAtom('ttp_sep_punc_char'), PAtom('.')));
// src/compiler.pro(1157-1159):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_open_punc'), PTerm(PAtom('punc'), PVar('C'))), PTerm(PAtom('ttp_open_punc_char'), PVar('C'))));
// src/compiler.pro(1159-1160):
ctx.assertz(PTerm(PAtom('ttp_open_punc_char'), PAtom('(')));
// src/compiler.pro(1160-1161):
ctx.assertz(PTerm(PAtom('ttp_open_punc_char'), PAtom('_(')));
// src/compiler.pro(1161-1162):
ctx.assertz(PTerm(PAtom('ttp_open_punc_char'), PAtom('[')));
// src/compiler.pro(1162-1163):
ctx.assertz(PTerm(PAtom('ttp_open_punc_char'), PAtom('{')));
// src/compiler.pro(1163-1165):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_close_punc'), PTerm(PAtom('punc'), PVar('C'))), PTerm(PAtom('ttp_close_punc_char'), PVar('C'))));
// src/compiler.pro(1165-1166):
ctx.assertz(PTerm(PAtom('ttp_close_punc_char'), PAtom('|')));
// src/compiler.pro(1166-1167):
ctx.assertz(PTerm(PAtom('ttp_close_punc_char'), PAtom(')')));
// src/compiler.pro(1167-1168):
ctx.assertz(PTerm(PAtom('ttp_close_punc_char'), PAtom(']')));
// src/compiler.pro(1168-1169):
ctx.assertz(PTerm(PAtom('ttp_close_punc_char'), PAtom('}')));
// src/compiler.pro(1169-1184):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_top'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('pred'), toPLst([PAtom(':-'), PVar('_'), PVar('_')])), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('ctx.assertz(')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');')), PTerm(PAtom('nl'), PVar('SOut')))))))));
// src/compiler.pro(1184-1189):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_top'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('pred'), toPLst([PAtom(':-'), PVar('_')])), PVar('X')), PAtom('!'))));
// src/compiler.pro(1189-1197):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_top'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('pred'), PVar('_')), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('ctx.assertz(')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');')), PTerm(PAtom('nl'), PVar('SOut')))))))));
// src/compiler.pro(1197-1205):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_top'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('atom'), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('ctx.assertz(')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');')), PTerm(PAtom('nl'), PVar('SOut')))))))));
// src/compiler.pro(1205-1216):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PTerm(PAtom('pred'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('PTerm(')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_args'), PVar('SOut'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(')')))))));
// src/compiler.pro(1216-1223):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PTerm(PAtom('list'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPLst(')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_list'), PVar('SOut'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(')')))))));
// src/compiler.pro(1223-1231):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PTerm(PAtom('var'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('PVar(\'')), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_atom'), PVar('X'), PVar('EX')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('EX')), PTerm(PAtom('write'), PVar('SOut'), PAtom('\')'))))))));
// src/compiler.pro(1231-1240):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PTerm(PAtom('str'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_str'), PVar('X'), PVar('EX')), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('A'), PVar('EX')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('PStr(\'')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('A')), PTerm(PAtom('write'), PVar('SOut'), PAtom('\')')))))))));
// src/compiler.pro(1240-1248):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('number'), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('PFloat(')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(')'))))))));
// src/compiler.pro(1248-1257):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('atom'), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_atom'), PVar('X'), PVar('EX')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('PAtom(\'')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('EX')), PTerm(PAtom('write'), PVar('SOut'), PAtom('\')')))))))));
// src/compiler.pro(1257-1262):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_args'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(1262-1267):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_args'), PVar('SOut'), toPLst([PVar('X')], PVar('Xt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom('ttp_translate_to_js_args2'), PVar('SOut'), PVar('Xt'))))));
// src/compiler.pro(1267-1269):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_args2'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(1269-1275):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_args2'), PVar('SOut'), toPLst([PVar('X')], PVar('Xt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',\u0020')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom('ttp_translate_to_js_args2'), PVar('SOut'), PVar('Xt')))))));
// src/compiler.pro(1275-1280):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_list'), PVar('SOut'), toPLst(null)), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('write'), PVar('SOut'), PAtom('null')))));
// src/compiler.pro(1280-1286):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_list'), PVar('SOut'), toPLst([PVar('X')], PVar('Xt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('[')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom('ttp_translate_to_js_list2'), PVar('SOut'), PVar('Xt')))))));
// src/compiler.pro(1286-1288):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_list2'), PVar('SOut'), toPLst(null)), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('write'), PVar('SOut'), PAtom(']')))));
// src/compiler.pro(1288-1294):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_list2'), PVar('SOut'), toPLst([PVar('X')], PVar('Xt'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',\u0020')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X')), PTerm(PAtom('ttp_translate_to_js_list2'), PVar('SOut'), PVar('Xt')))))));
// src/compiler.pro(1294-1299):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_to_js_list2'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('],\u0020')), PTerm(PAtom('ttp_translate_to_js_pred'), PVar('SOut'), PVar('X'))))));
// src/compiler.pro(1299-1308):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line')), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line'), PVar('Line'), PVar('Line'), toPLst(null))));
// src/compiler.pro(1308-1313):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line'), PVar('LineT'), PVar('Line'), PVar('LineT')), PTerm(PAtom(','), PTerm(PAtom('at_end_of_stream'), PVar('SIn')), PAtom('!'))));
// src/compiler.pro(1313-1325):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line'), PVar('LineT'), PVar('Line'), PVar('LineTn')), PTerm(PAtom(','), PTerm(PAtom('get_code'), PVar('SIn'), PVar('Chr')), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom(';'), PTerm(PAtom('<'), PVar('Chr'), PFloat(0)), PTerm(PAtom('ttp_is_new_line'), PVar('SIn'), PVar('Chr'))), PTerm(PAtom(','), PTerm(PAtom('='), PVar('LineT'), toPLst([PFloat(10)], PVar('LineTn'))), PAtom('!'))), PTerm(PAtom(','), PTerm(PAtom('='), PVar('LineT'), toPLst([PVar('Chr')], PVar('LineT2'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line'), PVar('LineT2'), PVar('Line'), PVar('LineTn'))))))));
// src/compiler.pro(1325-1330):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_is_new_line'), PVar('SIn'), PFloat(13)), PTerm(PAtom(','), PTerm(PAtom('peek_code'), PVar('SIn'), PFloat(10)), PTerm(PAtom('get_code'), PVar('SIn'), PVar('_')))));
// src/compiler.pro(1330-1332):
ctx.assertz(PTerm(PAtom('ttp_is_new_line'), PVar('_'), PFloat(13)));
// src/compiler.pro(1332-1334):
ctx.assertz(PTerm(PAtom('ttp_is_new_line'), PVar('_'), PFloat(10)));
// src/compiler.pro(1334-1342):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_exists'), PVar('Elm'), toPLst([PVar('ListH')], PVar('_'))), PTerm(PAtom(','), PTerm(PAtom('=='), PVar('Elm'), PVar('ListH')), PAtom('!'))));
// src/compiler.pro(1342-1347):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_exists'), PVar('_'), toPLst(null)), PTerm(PAtom(','), PAtom('!'), PAtom('fail'))));
// src/compiler.pro(1347-1352):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_exists'), PVar('Elm'), toPLst([PVar('_')], PVar('ListT'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_exists'), PVar('Elm'), PVar('ListT')))));
// src/compiler.pro(1352-1357):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_exists_end'), PVar('Tokens')), PTerm(PAtom('ttp_exists'), PAtom('.'), PVar('Tokens'))));
// src/compiler.pro(1357-1364):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_sentence'), PVar('List'), PVar('S'), PVar('R')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_get_sentence_impl'), PVar('List'), PVar('S'), PVar('S'), PVar('S'), toPLst(null), PVar('R')))));
// src/compiler.pro(1364-1370):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_sentence_impl'), toPLst([PVar('ListH')], PVar('R')), PVar('S'), PVar('St'), PVar('S'), PVar('Stn'), PVar('R')), PTerm(PAtom(','), PTerm(PAtom('=='), PAtom('.'), PVar('ListH')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('='), PVar('St'), toPLst([PVar('ListH')], PVar('Stn')))))));
// src/compiler.pro(1370-1375):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_sentence_impl'), toPLst(null), PVar('_'), PVar('_'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PAtom('!'), PAtom('fail'))));
// src/compiler.pro(1375-1381):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_sentence_impl'), toPLst([PVar('ListH')], PVar('ListT')), PVar('S'), PVar('St'), PVar('S'), PVar('Stn'), PVar('R')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('St'), toPLst([PVar('ListH')], PVar('St2'))), PTerm(PAtom('ttp_get_sentence_impl'), PVar('ListT'), PVar('S'), PVar('St2'), PVar('S'), PVar('Stn'), PVar('R'))))));
// src/compiler.pro(1381-1389):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_sentence'), PVar('SIn'), PVar('S'), PVar('InLineNo'), PVar('OutLineNo')), PTerm(PAtom('ttp_read_sentence_impl'), PVar('SIn'), toPLst(null), PVar('S'), PVar('InLineNo'), PVar('OutLineNo'))));
// src/compiler.pro(1389-1395):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_sentence_impl'), PVar('SIn'), PVar('_'), toPLst(null), PVar('OutLineNo'), PVar('OutLineNo')), PTerm(PAtom(','), PTerm(PAtom('at_end_of_stream'), PVar('SIn')), PAtom('!'))));
// src/compiler.pro(1395-1412):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_read_sentence_impl'), PVar('SIn'), PVar('InLine'), PVar('S'), PVar('InLineNo'), PVar('OutLineNo')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('LineN')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('InLineNo2'), PTerm(PAtom('+'), PVar('InLineNo'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('ttp_lst_add'), PVar('InLine'), PVar('LineN'), PVar('Line')), PTerm(PAtom(','), PTerm(PAtom('ttp_lex_tokens'), PVar('Line'), PVar('Rest'), PVar('Tokens')), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom(','), PTerm(PAtom('=='), PVar('Rest'), toPLst(null)), PTerm(PAtom('ttp_exists_end'), PVar('Tokens'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PVar('S'), PVar('Tokens')), PTerm(PAtom('='), PVar('OutLineNo'), PVar('InLineNo2'))))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_read_sentence_impl'), PVar('SIn'), PVar('Line'), PVar('S'), PVar('InLineNo2'), PVar('OutLineNo')))))))))));
// src/compiler.pro(1412-1421):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_repl_main'), PVar('SIn'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('at_end_of_stream'), PVar('SIn')), PAtom('!'))));
// src/compiler.pro(1421-1430):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_repl_main'), PVar('SIn'), PVar('SOut'), PVar('Prev')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PAtom('TP\u0020?-\u0020')), PTerm(PAtom(','), PTerm(PAtom('ttp_read_sentence'), PVar('SIn'), PVar('Next'), PFloat(0), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('ttp_lst_add'), PVar('Prev'), PVar('Next'), PVar('Tokens')), PTerm(PAtom(','), PTerm(PAtom('ttp_repl_eval'), PVar('SOut'), PVar('Tokens'), PVar('Rest')), PTerm(PAtom('ttp_repl_main'), PVar('SIn'), PVar('SOut'), PVar('Rest')))))))));
// src/compiler.pro(1430-1439):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_repl_eval'), PVar('SOut'), PVar('Tokens'), PVar('Rest')), PTerm(PAtom(','), PTerm(PAtom('ttp_get_sentence'), PVar('Tokens'), PVar('S'), PVar('R')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_expr'), PVar('S'), PVar('_'), PVar('Ast')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_top'), PVar('SOut'), PVar('Ast')), PTerm(PAtom('ttp_repl_eval'), PVar('SOut'), PVar('R'), PVar('Rest'))))))));
// src/compiler.pro(1439-1441):
ctx.assertz(PTerm(PAtom('ttp_repl_eval'), PVar('_'), PVar('Rest'), PVar('Rest')));
// src/compiler.pro(1441-1449):
ctx.assertz(PTerm(PAtom(':-'), PAtom('ttp_repl'), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('current_input'), PVar('SIn')), PTerm(PAtom(','), PTerm(PAtom('current_output'), PVar('SOut')), PTerm(PAtom('ttp_repl_main'), PVar('SIn'), PVar('SOut'), toPLst(null)))))));
// src/compiler.pro(1449-1469):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_per_sentence'), PVar('SOut'), PVar('Tokens'), PVar('Rest')), PTerm(PAtom(','), PTerm(PAtom('ttp_get_sentence'), PVar('Tokens'), PVar('S'), PVar('R')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('ttp_stx_expr'), PVar('S'), PVar('_'), PVar('Ast')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_to_js_top'), PVar('SOut'), PVar('Ast')), PAtom('fail'))), PAtom('true')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_translate_per_sentence'), PVar('SOut'), PVar('R'), PVar('Rest'))))))));
// src/compiler.pro(1469-1471):
ctx.assertz(PTerm(PAtom('ttp_translate_per_sentence'), PVar('_'), PVar('Rest'), PVar('Rest')));
// src/compiler.pro(1471-1477):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_stream_impl'), PVar('SIn'), PVar('_'), PVar('_'), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PTerm(PAtom('at_end_of_stream'), PVar('SIn')), PAtom('!'))));
// src/compiler.pro(1477-1494):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_stream_impl'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('InFName'), PVar('Prev'), PVar('LineNo')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_read_sentence'), PVar('SIn'), PVar('Next'), PVar('LineNo'), PVar('LineNo2')), PTerm(PAtom(','), PTerm(PAtom('ttp_lst_add'), PVar('Prev'), PVar('Next'), PVar('Tokens')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('//\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('InFName')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('(')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('LineNo')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('-')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('LineNo2')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('):')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_per_sentence'), PVar('SOut'), PVar('Tokens'), PVar('Rest')), PAtom('!')))))))))), PTerm(PAtom(','), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo2'), PAtom('syntax\u0020error')), PTerm(PAtom(','), PAtom('!'), PAtom('fail')))), PTerm(PAtom('ttp_translate_stream_impl'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('InFName'), PVar('Rest'), PVar('LineNo2'))))))));
// src/compiler.pro(1494-1500):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_translate_stream'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('InFName')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_translate_stream_impl'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('InFName'), toPLst(null), PFloat(0)))));
// src/compiler.pro(1500-1798):
ctx.assertz(PTerm(PAtom('ttp_runtime'), toPLst([PTerm(PAtom('predLabel'), PAtom(','), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('goSub'), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('goTo'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('predLabel'), PAtom(';'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('pushBTP'), PTerm(PAtom('at'), PAtom(';2'))), PTerm(PAtom('goTo'), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('label'), PAtom(';2')), PTerm(PAtom('goTo'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('predLabel'), PAtom('!'), PFloat(0)), PAtom('cutBT'), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('true'), PFloat(0)), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('fail'), PFloat(0)), PAtom('fail'), PTerm(PAtom('predLabel'), PAtom('->'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('goSub'), PTerm(PAtom('getParam'), PFloat(0))), PAtom('cutBT'), PTerm(PAtom('goTo'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('predLabel'), PAtom('='), PFloat(2)), PTerm(PAtom('unify'), PTerm(PAtom('getParam'), PFloat(0)), PTerm(PAtom('getParam'), PFloat(1))), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('is'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('goSub'), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('unify'), PTerm(PAtom('getLocal'), PFloat(0)), PAtom('getParam')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('=='), PFloat(2)), PTerm(PAtom('jmpIf'), PTerm(PAtom('eq'), PTerm(PAtom('getParam'), PFloat(0)), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('at'), PAtom('==2'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('==2')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('=:='), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('=:=2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=:=2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=:=3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=:=3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('eq'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=:=4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('=:=4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('=\\='), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('=\\=2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=\\=2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=\\=3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=\\=3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('ne'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=\\=4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('=\\=4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('<'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('<2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('<2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('<3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('<3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('lt'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('<4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('<4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('=<'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('=<2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=<2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=<3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('=<3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('lte'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('=<4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('=<4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('>'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('>2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('>3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('gt'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('>4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('>4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('>='), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('>=2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>=2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('>=3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>=3')), PTerm(PAtom('jmpIf'), PTerm(PAtom('gte'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('>=4'))), PAtom('fail'), PTerm(PAtom('label'), PAtom('>=4')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('-'), PFloat(1)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('-A'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('-A')), PTerm(PAtom('ret'), PTerm(PAtom('neg'), PTerm(PAtom('getLocal'), PFloat(0)))), PTerm(PAtom('predLabel'), PAtom('+'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('+2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('+2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('+3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('+3')), PTerm(PAtom('ret'), PTerm(PAtom('add'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('-'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('-2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('-2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('-3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('-3')), PTerm(PAtom('ret'), PTerm(PAtom('sub'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('*'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('*2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('*2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('*3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('*3')), PTerm(PAtom('ret'), PTerm(PAtom('mul'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('/'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('/2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('/2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('/3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('/3')), PTerm(PAtom('ret'), PTerm(PAtom('div'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('/\\'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('/\\2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('/\\2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('/\\3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('/\\3')), PTerm(PAtom('ret'), PTerm(PAtom('bitAnd'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('\\/'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('\\/2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('\\/2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('\\/3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('\\/3')), PTerm(PAtom('ret'), PTerm(PAtom('bitOr'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('<<'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('<<2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('<<2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('<<3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('<<3')), PTerm(PAtom('ret'), PTerm(PAtom('shr'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('>>'), PFloat(2)), PTerm(PAtom('setLocal'), PFloat(0), PTerm(PAtom('getParam'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(1), PTerm(PAtom('getParam'), PFloat(1))), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('at'), PAtom('>>2'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(0))), PTerm(PAtom('setLocal'), PFloat(0), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>>2')), PTerm(PAtom('jmpIf'), PTerm(PAtom('isNumber'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('at'), PAtom('>>3'))), PTerm(PAtom('goSub'), PTerm(PAtom('getLocal'), PFloat(1))), PTerm(PAtom('setLocal'), PFloat(1), PAtom('getParam')), PTerm(PAtom('label'), PAtom('>>3')), PTerm(PAtom('ret'), PTerm(PAtom('bitOr'), PTerm(PAtom('getLocal'), PFloat(0)), PTerm(PAtom('getLocal'), PFloat(1)))), PTerm(PAtom('predLabel'), PAtom('write'), PFloat(1)), PTerm(PAtom('raw'), PAtom('out.print(p[0].toString(e));')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('nl'), PFloat(0)), PTerm(PAtom('raw'), PAtom('out.nl();')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('write'), PFloat(2)), PTerm(PAtom('raw'), PAtom('toPVal(p[0],e).print(p[1].toString(e));')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('nl'), PFloat(1)), PTerm(PAtom('raw'), PAtom('toPVal(p[0],e).nl();')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('get_code'), PFloat(2)), PTerm(PAtom('raw'), PAtom('p[1].unify(toPVal(p[0],e).get_code(),e);')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('peek_code'), PFloat(2)), PTerm(PAtom('raw'), PAtom('p[1].unify(toPVal(p[0],e).peek_code(),e);')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('at_end_of_stream'), PFloat(2)), PTerm(PAtom('raw'), PAtom('toPVal(p[0],e).at_end_of_stream();')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('atom_codes'), PFloat(2)), PTerm(PAtom('raw'), PAtom('atom_codes(p[0],p[1],e);')), PAtom('ret'), PTerm(PAtom('predLabel'), PAtom('number_codes'), PFloat(2)), PTerm(PAtom('raw'), PAtom('number_codes(p[0],p[1],e);')), PAtom('ret'), PAtom('dummy')])));
// src/compiler.pro(1798-1804):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count'), PVar('X'), PVar('Labels')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_label_gosub_count_impl'), PVar('X'), PFloat(0), PVar('Labels'), PVar('Labels')))));
// src/compiler.pro(1804-1811):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count_impl'), toPLst(null), PVar('_'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(1811-1820):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count_impl'), toPLst([PTerm(PAtom('predLabel'), PVar('N'), PVar('A'))], PVar('T')), PVar('Cnt'), PVar('Labels'), toPLst([PTerm(PAtom('label'), PVar('N'), PVar('A'), PVar('Cnt'), PAtom('public'))], PVar('LabelsT'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))), PTerm(PAtom('ttp_label_gosub_count_impl'), PVar('T'), PVar('Cnt2'), PVar('Labels'), PVar('LabelsT'))))));
// src/compiler.pro(1820-1829):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count_impl'), toPLst([PTerm(PAtom('label'), PVar('N'))], PVar('T')), PVar('Cnt'), PVar('Labels'), toPLst([PTerm(PAtom('label'), PVar('N'), PFloat(0), PVar('Cnt'), PAtom('private'))], PVar('LabelsT'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))), PTerm(PAtom('ttp_label_gosub_count_impl'), PVar('T'), PVar('Cnt2'), PVar('Labels'), PVar('LabelsT'))))));
// src/compiler.pro(1829-1838):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count_impl'), toPLst([PTerm(PAtom('goSub'), PVar('_'))], PVar('T')), PVar('Cnt'), PVar('Labels'), PVar('LabelsT')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))), PTerm(PAtom('ttp_label_gosub_count_impl'), PVar('T'), PVar('Cnt2'), PVar('Labels'), PVar('LabelsT'))))));
// src/compiler.pro(1838-1846):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_gosub_count_impl'), toPLst([PVar('_')], PVar('T')), PVar('Cnt'), PVar('Labels'), PVar('LabelsT')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_label_gosub_count_impl'), PVar('T'), PVar('Cnt'), PVar('Labels'), PVar('LabelsT')))));
// src/compiler.pro(1846-1849):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_map_to_js'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(1849-1863):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_map_to_js'), PVar('SOut'), toPLst([PTerm(PAtom('label'), PVar('Name'), PVar('A'), PVar('No'), PAtom('public'))], PVar('T'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_atom'), PVar('Name'), PVar('Name2')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('ctx.addPred(\'')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Name2')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('\',\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('A')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('No')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom('ttp_label_map_to_js'), PVar('SOut'), PVar('T'))))))))))))));
// src/compiler.pro(1863-1868):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_label_map_to_js'), PVar('SOut'), toPLst([PVar('_')], PVar('T'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_label_map_to_js'), PVar('SOut'), PVar('T')))));
// src/compiler.pro(1868-1871):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_label_no'), toPLst(null), PVar('_'), PVar('_'), PVar('_')), PTerm(PAtom(','), PAtom('!'), PAtom('fail'))));
// src/compiler.pro(1871-1873):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_label_no'), toPLst([PTerm(PAtom('label'), PVar('Label'), PVar('A'), PVar('No'), PVar('_'))], PVar('_')), PVar('Label'), PVar('A'), PVar('No')), PAtom('!')));
// src/compiler.pro(1873-1878):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_get_label_no'), toPLst([PVar('_')], PVar('T')), PVar('Label'), PVar('A'), PVar('No')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_get_label_no'), PVar('T'), PVar('Label'), PVar('A'), PVar('No')))));
// src/compiler.pro(1878-1889):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PTerm(PAtom('stat'), PVar('Cnt'), PVar('Labels')), PTerm(PAtom('stat'), PVar('Cnt2'), PVar('Labels')), PTerm(PAtom('predLabel'), PVar('N'), PVar('A'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_escape_atom'), PVar('N'), PVar('N2')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('case\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Cnt')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(':')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('\u0020//\u0020pred:\u0020\'')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('N2')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('\'/')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('A')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1)))))))))))))));
// src/compiler.pro(1889-1898):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PTerm(PAtom('stat'), PVar('Cnt'), PVar('Labels')), PTerm(PAtom('stat'), PVar('Cnt2'), PVar('Labels')), PTerm(PAtom('label'), PVar('N'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('case\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Cnt')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(':')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('\u0020//\u0020label:\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('N')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))))))))))));
// src/compiler.pro(1898-1910):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PTerm(PAtom('stat'), PVar('Cnt'), PVar('Labels')), PVar('StatN'), PTerm(PAtom('goSub'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('Cnt2'), PTerm(PAtom('+'), PVar('Cnt'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('n={s:')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Cnt')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',c:c,v:v,n:n};setTerm(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PTerm(PAtom('stat'), PVar('Cnt2'), PVar('Labels')), PVar('StatN'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');continue;')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('case\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Cnt')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(':')), PTerm(PAtom('nl'), PVar('SOut')))))))))))))));
// src/compiler.pro(1910-1918):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PTerm(PAtom('goTo'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('setTerm(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(');continue;')), PTerm(PAtom('nl'), PVar('SOut'))))))));
// src/compiler.pro(1918-1926):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PTerm(PAtom('pushBTP'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('b={s:')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',n:n,v:v,p:p,e:e,b:b};e=makePEnv(e);')), PTerm(PAtom('nl'), PVar('SOut'))))))));
// src/compiler.pro(1926-1934):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PTerm(PAtom('setLocal'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('v[')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(']=')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('StatN'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(';')), PTerm(PAtom('nl'), PVar('SOut'))))))))));
// src/compiler.pro(1934-1939):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PAtom('setCutP')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('c=b;')), PTerm(PAtom('nl'), PVar('SOut'))))));
// src/compiler.pro(1939-1944):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PAtom('cutBT')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('b=c;')), PTerm(PAtom('nl'), PVar('SOut'))))));
// src/compiler.pro(1944-1949):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PAtom('fail')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('throw\u0020new\u0020PFailure;')), PTerm(PAtom('nl'), PVar('SOut'))))));
// src/compiler.pro(1949-1955):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PAtom('ret')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('p=pNil;s=n.s;c=n.c;v=n.v;n=n.n;continue;')), PTerm(PAtom('nl'), PVar('SOut'))))));
// src/compiler.pro(1955-1963):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('ret'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('p=')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(';s=n.s;c=n.c;v=n.v;n=n.n;continue;')), PTerm(PAtom('nl'), PVar('SOut'))))))));
// src/compiler.pro(1963-1974):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('jmpIf'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('if(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('){')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('s=')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(';continue;}')), PTerm(PAtom('nl'), PVar('SOut')))))))))));
// src/compiler.pro(1974-1984):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('unify'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(').unify(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e);')), PTerm(PAtom('nl'), PVar('SOut'))))))))));
// src/compiler.pro(1984-1991):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('neg'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(-toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))));
// src/compiler.pro(1991-2000):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('add'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)+toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2000-2009):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('sub'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)-toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2009-2018):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('mul'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)*toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2018-2027):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('div'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)/toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2027-2036):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('bitAnd'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)&toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2036-2045):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('bitOr'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)|toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2045-2054):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('shl'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)<<toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2054-2063):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('shr'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)>>toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e))')))))))));
// src/compiler.pro(2063-2070):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('isAtom'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)\u0020instanceof\u0020PAtom')))))));
// src/compiler.pro(2070-2077):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('isNumber'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toPVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)\u0020instanceof\u0020PFloat')))))));
// src/compiler.pro(2077-2086):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('eq'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)===toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2086-2095):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('ne'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)!==toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2095-2104):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('lt'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)<toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2104-2113):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('lte'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)<=toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2113-2122):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('lt'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)<toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2122-2131):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('gt'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)>toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2131-2140):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('gte'), PVar('X'), PVar('Y'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('X')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)>=toNVal(')), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('_'), PVar('Y')), PTerm(PAtom('write'), PVar('SOut'), PAtom(',e)')))))))));
// src/compiler.pro(2140-2148):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('at'), PVar('Name'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('='), PTerm(PAtom('stat'), PVar('_'), PVar('Labels')), PVar('Stat')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('\u0020/*\u0020at(')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Name')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom(')\u0020*/\u0020')), PTerm(PAtom(','), PTerm(PAtom('ttp_get_label_no'), PVar('Labels'), PVar('Name'), PFloat(0), PVar('No')), PTerm(PAtom('write'), PVar('SOut'), PVar('No'))))))))));
// src/compiler.pro(2148-2153):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('getLocal'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('v[')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(']')))))));
// src/compiler.pro(2153-2158):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('getParam'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('p[')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom('write'), PVar('SOut'), PAtom(']')))))));
// src/compiler.pro(2158-2163):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PAtom('getParam')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('write'), PVar('SOut'), PAtom('p')))));
// src/compiler.pro(2163-2168):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PTerm(PAtom('raw'), PVar('X'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom('nl'), PVar('SOut'))))));
// src/compiler.pro(2168-2172):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('_'), PVar('Stat'), PVar('Stat'), PAtom('dummy')), PAtom('!')));
// src/compiler.pro(2172-2177):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat'), PVar('X')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('//\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('X')), PTerm(PAtom('nl'), PVar('SOut')))))));
// src/compiler.pro(2177-2180):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instructions_to_js'), PVar('_'), PVar('_'), toPLst(null)), PAtom('!')));
// src/compiler.pro(2180-2186):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_instructions_to_js'), PVar('SOut'), PVar('Stat'), toPLst([PVar('H')], PVar('T'))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_instruction_to_js'), PVar('SOut'), PVar('Stat'), PVar('Stat2'), PVar('H')), PTerm(PAtom('ttp_instructions_to_js'), PVar('SOut'), PVar('Stat2'), PVar('T'))))));
// src/compiler.pro(2186-2197):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_do_templ_cmd'), PVar('SOut'), PVar('_'), PTerm(PAtom('pred'), toPLst([PAtom('runtime'), PAtom('labels')]))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_runtime'), PVar('Insts')), PTerm(PAtom(','), PTerm(PAtom('ttp_label_gosub_count'), PVar('Insts'), PVar('Labels')), PTerm(PAtom('ttp_label_map_to_js'), PVar('SOut'), PVar('Labels')))))));
// src/compiler.pro(2197-2204):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_do_templ_cmd'), PVar('SOut'), PVar('_'), PTerm(PAtom('pred'), toPLst([PAtom('runtime'), PAtom('impl')]))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_runtime'), PVar('Insts')), PTerm(PAtom(','), PTerm(PAtom('ttp_label_gosub_count'), PVar('Insts'), PVar('Labels')), PTerm(PAtom('ttp_instructions_to_js'), PVar('SOut'), PTerm(PAtom('stat'), PFloat(0), PVar('Labels')), PVar('Insts')))))));
// src/compiler.pro(2204-2216):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_do_templ_cmd'), PVar('SOut'), PVar('SErr'), PTerm(PAtom('pred'), toPLst([PAtom('transrate'), PVar('InFName')]))), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('open'), PVar('InFName'), PAtom('read'), PVar('SIn')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_stream'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('InFName')), PAtom('!')), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PAtom('-'), PAtom('transrate\u0020error'))), PTerm(PAtom('close'), PVar('SIn')))))));
// src/compiler.pro(2216-2222):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_appl_templ_impl'), PVar('_'), PVar('SIn'), PVar('_'), PVar('_'), PVar('LineNo'), PVar('LineNo')), PTerm(PAtom(','), PTerm(PAtom('at_end_of_stream'), PVar('SIn')), PAtom('!'))));
// src/compiler.pro(2222-2248):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_appl_templ_impl'), PVar('InFName'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('LineNo'), PVar('LineNoN')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_read_line'), PVar('SIn'), PVar('Line')), PTerm(PAtom(','), PTerm(PAtom('is'), PVar('LineNo2'), PTerm(PAtom('+'), PVar('LineNo'), PFloat(1))), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom('='), PVar('Line'), toPLst([PFloat(47), PFloat(47), PFloat(37), PFloat(37)], PVar('LineBody'))), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom('ttp_lex_tokens'), PVar('LineBody'), toPLst(null), PVar('Tokens')), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom('ttp_get_sentence'), PVar('Tokens'), PVar('S'), toPLst(null)), PTerm(PAtom(';'), PTerm(PAtom('->'), PTerm(PAtom('ttp_stx_expr'), PVar('S'), toPLst(null), PVar('Ast')), PTerm(PAtom('ttp_do_templ_cmd'), PVar('SOut'), PVar('SErr'), PVar('Ast'))), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo2'), PAtom('error3')))), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo2'), PAtom('error2')))), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PVar('LineNo2'), PAtom('error1')))), PTerm(PAtom(','), PTerm(PAtom('atom_codes'), PVar('LineAtom'), PVar('Line')), PTerm(PAtom('write'), PVar('SOut'), PVar('LineAtom')))), PTerm(PAtom('ttp_appl_templ_impl'), PVar('InFName'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('LineNo2'), PVar('LineNoN'))))))));
// src/compiler.pro(2248-2254):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_apply_template_stream'), PVar('InFName'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('LineNo')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_appl_templ_impl'), PVar('InFName'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PFloat(0), PVar('LineNo')))));
// src/compiler.pro(2254-2270):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_apply_template'), PVar('InFName'), PVar('OutFName'), PVar('LineNo')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('current_output'), PVar('SErr')), PTerm(PAtom(','), PTerm(PAtom('open'), PVar('InFName'), PAtom('read'), PVar('SIn')), PTerm(PAtom(','), PTerm(PAtom('open'), PVar('OutFName'), PAtom('write'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('ttp_apply_template_stream'), PVar('InFName'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('LineNo')), PAtom('!')), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('InFName'), PAtom('-'), PAtom('error:\u0020ttp_apply_template_stream'))), PTerm(PAtom(','), PTerm(PAtom('close'), PVar('SOut')), PTerm(PAtom('close'), PVar('SIn'))))))))));
// src/compiler.pro(2270-2278):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_build_js_library'), PVar('SrcFile'), PVar('DstFile')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_apply_template'), PVar('SrcFile'), PVar('DstFile'), PVar('LineNo')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('LineNo')), PTerm(PAtom(','), PTerm(PAtom('write'), PAtom('\u0020line(s)')), PTerm(PAtom(','), PAtom('nl'), PAtom('halt'))))))));
// src/compiler.pro(2278-2284):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_compile_stream'), PVar('SIn'), PVar('SOut'), PVar('SErr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom('ttp_compile_stream'), PAtom(''), PVar('SIn'), PVar('SOut'), PVar('SErr')))));
// src/compiler.pro(2284-2291):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_compile_stream'), PVar('SrcFile'), PVar('SIn'), PVar('SOut'), PVar('SErr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('var\u0020ctx=ttp(),PAtom=ttp.PAtom,PFloat=ttp.PFloat,PVar=ttp.PVar,PTerm=ttp.PTerm,PStr=ttp.PStr,toPLst=ttp.toPLst;')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('ttp_translate_stream'), PVar('SIn'), PVar('SOut'), PVar('SErr'), PVar('SrcFile')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('return\u0020ctx;')), PTerm(PAtom('nl'), PVar('SOut')))))))));
// src/compiler.pro(2291-2311):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttp_compile'), PVar('SrcFile'), PVar('DstFile')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('current_output'), PVar('SErr')), PTerm(PAtom(','), PTerm(PAtom('open'), PVar('SrcFile'), PAtom('read'), PVar('SIn')), PTerm(PAtom(','), PTerm(PAtom('open'), PVar('DstFile'), PAtom('write'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('ttp_base_name'), PVar('DstFile'), PVar('Namespace')), PTerm(PAtom(','), PTerm(PAtom(';'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('var\u0020')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PVar('Namespace')), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('=(function(ttp){')), PTerm(PAtom(','), PTerm(PAtom('nl'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('ttp_compile_stream'), PVar('SrcFile'), PVar('SIn'), PVar('SOut'), PVar('SErr')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('write'), PVar('SOut'), PAtom('})(TetoTetoProlog);')), PTerm(PAtom('nl'), PVar('SOut'))))))))), PTerm(PAtom('ttp_put_error'), PVar('SErr'), PVar('SrcFile'), PAtom('-'), PAtom('transrate\u0020error'))), PTerm(PAtom(','), PTerm(PAtom('close'), PVar('SOut')), PTerm(PAtom(','), PTerm(PAtom('close'), PVar('SIn')), PAtom('halt')))))))))));
// src/compiler.pro(2311-2313):
ctx.assertz(PTerm(PAtom(':-'), PTerm(PAtom('ttpc'), PVar('SrcFile'), PVar('DstFile')), PTerm(PAtom(','), PAtom('!'), PTerm(PAtom(','), PTerm(PAtom('ttp_compile'), PVar('SrcFile'), PVar('DstFile')), PAtom('!')))));
// src/compiler.pro(2313-2314):
//==== %%transrate('src/compiler.pro'). ====

  }
 ]);

 function ttp() {
  if (arguments.length === 0) {
   return new TetoProlog();
  }
  return toPVal(arguments[0]);
 }
 ttp.TetoTetoProlog = TetoTetoProlog;
 ttp.PObj = PObj;
 ttp.PAtomic = PAtomic;
 ttp.PAtom = PAtom;
 ttp.PFloat = PFloat;
 ttp.PVar = PVar;
 ttp.PTerm = PTerm;
 ttp.PCell = PCell;
 ttp.PStr = PStr;
 ttp.toPVal = toPVal;
 ttp.toPLst = toPLst;
 ttp.pNil = pNil;
 ttp.PFailure = PFailure;
 ttp.PStrStream = PStrStream;

 ttp.Promise = Promise;
 ttp.when = when;

 ttp.out = new DocumentStream(document);
 ttp.nl = nl;
 ttp.pp = pp;

 return ttp;
})();

var ttp = TetoTetoProlog;

