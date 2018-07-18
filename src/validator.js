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
var validataFunc = function() {
    var validator = new Validator()
    validator.add(registorForm.userName, 'isEmpty', '用户名不能为空')
    validator.add(registorForm.password, 'minLength:6', '密码长度不能少于6位')
    validator.add(registorForm.phoneNumber, 'isMobile', '手机号码格式不正确')
    var errorMsg = validator.start()
    return errorMsg
}
var Validator = function() {
    this.cache = []
}
Validator.prototype.add = function(dom, rule, errorMsg) {
    var ary = rule.split(':')
    this.cache.push(function() {
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        return strategies[strategy].apply(dom, ary)
    })
}
Validator.prototype.start = function() {
    for(var i = 0, validataFunc; validataFunc = this.cache[i++];) {
        var msg = validataFunc()
        if(msg) {
            return msg
        }
    }
}
