var strategies = {
    isEmpty: function(value, errorMsg) {
        if(value === '') {
            return errorMsg
        }
    },
    minLength: function(value, length, errorMsg) {
        if(value.length < length) {
            return errorMsg
        }
    },
    isMobile: function(value, errorMsg) {
        if( !/(^1[3|5|8][0-9]{9}$)/.test(value) ) {
            return errorMsg
        }
    }
}

var Validator = function() {
    this.cache = []
}
Validator.prototype.add = function(dom, rules) {
    var self = this
    for(var i = 0, rule; rule = rules[i++];) {
        (function(rule) {
            var strategyAry = rule.strategy.split(':')
            var errorMsg = rule.errorMsg
            self.cache.push(function() {
                var strategy = strategyAry.shift()
                strategyAry.unshift(dom.value)
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
            })
        }) (rule)
    }
}
Validator.prototype.start = function() {
    for(var i = 0, validataFunc; validataFunc = this.cache[i++];) {
        var msg = validataFunc()
        if(msg) {
            return msg
        }
    }
}

Function.prototype.before = function(beforefn) {
    var _self = this
    return function() {
        beforefn.apply(this, arguments)
        return _self.apply(this, arguments)
    }
}

Function.prototype.after = function(afterfn) {
    var _self = this
    return function() {
        var ret = _self.apply(this.arguments)
        afterfn.apply(this, arguments)
        return ret
    }
}