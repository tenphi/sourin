sourin = require './sourin.coffee'

module.exports =
    convertObject: (test) ->
        obj =
            func: -> @
            number: 5
            string: 'string'
            boolean: true
            array: []
        expect = '({func:function(){return this},number:5,string:"string","boolean":!0,array:[]})';
        result = sourin obj, true
        test.strictEqual result, expect, 'Object convertion'
        do test.done
    convertArray: (test) ->
        arr = [
            -> @
            5
            'string'
            true
            {}
        ]
        expect = '[function(){return this},5,"string",!0,{}]'
        result = sourin arr, true
        test.strictEqual result, expect, 'Array convertion'
        do test.done