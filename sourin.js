// Generated by CoffeeScript 1.3.3

/*
Sourin - NativeObject2SourceCode converter for objects that contains functions.
@copyright Yamanov Andrey <tenphi@gmail.com>
@version 0.1
*/


(function() {
  var isArray, isBoolean, isFunction, isNumber, isObject, isString, serializeArray, serializeObject, serializeValue, type, types, uglify;

  uglify = require('uglify-js');

  types = 'Boolean Number String Function Array Date Regexp Undefined Null'.split(' ');

  type = (function() {
    var classToType, name, _i, _len;
    classToType = {};
    for (_i = 0, _len = types.length; _i < _len; _i++) {
      name = types[_i];
      classToType['[object ' + name + ']'] = name.toLowerCase();
    }
    return function(obj) {
      return classToType[Object.prototype.toString.call(obj)] || 'object';
    };
  })();

  isArray = function(arr) {
    return type(arr) === 'array';
  };

  isObject = function(obj) {
    return type(obj) === 'object';
  };

  isFunction = function(func) {
    return type(func) === 'function';
  };

  isString = function(str) {
    return type(str) === 'string';
  };

  isBoolean = function(bool) {
    return type(bool) === 'boolean';
  };

  isNumber = function(number) {
    return type(number) === 'number';
  };

  module.exports = function(obj, min) {
    var ret;
    if (isArray(obj)) {
      ret = serializeArray(obj);
    } else if (isObject(obj)) {
      ret = serializeObject(obj);
    } else {
      ret = serializeValue(obj);
    }
    if (min) {
      return uglify(ret);
    } else {
      return ret;
    }
  };

  serializeArray = function(obj) {
    var out, val, value, _i, _len;
    out = '[';
    for (_i = 0, _len = obj.length; _i < _len; _i++) {
      val = obj[_i];
      if (value) {
        out += ',';
      }
      value = serializeValue(val);
      out += value;
    }
    return out += ']';
  };

  serializeObject = function(obj) {
    var key, out, value;
    out = '{';
    for (key in obj) {
      if (value) {
        out += ',';
      }
      value = serializeValue(obj[key]);
      out += '"' + key + '":' + value;
    }
    return out += '}';
  };

  serializeValue = function(value) {
    if (isFunction(value)) {
      return value.toString();
    } else if (isString(value)) {
      return JSON.stringify(value);
    } else if (isArray(value)) {
      return serializeArray(value);
    } else if (isObject(value)) {
      return serializeObject(value);
    } else if (isBoolean(value)) {
      if (value) {
        return 'true';
      } else {
        return 'false';
      }
    } else if (isNumber(value)) {
      return value;
    }
    return void 0;
  };

}).call(this);
