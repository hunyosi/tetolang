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
//%%runtime(labels).
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
//%%runtime(impl).
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
//%% transrate('src/compiler.pro').
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

