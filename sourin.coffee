###
Sourin - NativeObject2SourceCode converter for objects that contains functions.
@copyright Yamanov Andrey <tenphi@gmail.com>
@version 0.0.2
###

uglify = require 'uglify-js'
beautify = require('js-beautify').js_beautify

type = do ->
    classToType = {}
    for name in 'Boolean Number String Function Array Date Regexp Undefined Null'.split(' ')
        classToType['[object ' + name + ']'] = name.toLowerCase()

    (obj) ->
        classToType[Object::toString.call(obj)] or 'object'

isArray = (arr) ->
    type(arr) is 'array'

isObject = (obj) ->
    type(obj) is 'object'

isFunction = (func) ->
    type(func) is 'function'

isString = (str) ->
    type(str) is 'string'

isBoolean = (bool) ->
    type(bool) is 'boolean'

isNumber = (number) ->
    type(number) is 'number'

module.exports = (obj, min) ->
    if isArray obj
        ret = serializeArray obj
    else if isObject obj
        ret = serializeObject obj
    else
        ret = serializeValue obj
    ret = '(' + ret + ')'
    if min is true 
        return uglify(ret)
    else if min is false 
        return beautify ret
    else
        return ret

serializeArray = (obj) ->
    out = '['
    for val in obj
        if (value)
            out += ','
        value = serializeValue val
        out += value
    out += ']'

serializeObject = (obj) ->
    out = '{'
    for key of obj
        if (value)
            out += ','
        value = serializeValue obj[key]
        key = JSON.stringify(key);
        out += '' + key + ':' + value
    out += '}'

serializeValue = (value) ->
    if isFunction value
        return value.toString()
    else if isString value
        return JSON.stringify(value)
    else if isArray value
        return serializeArray value
    else if isObject value
        return serializeObject value
    else if isBoolean value
        return if value then 'true' else 'false'
    else if isNumber value
        return value
    return undefined