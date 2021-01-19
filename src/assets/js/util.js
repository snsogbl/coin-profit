var SIGN_REGEXP = /([yMdhsm])(\1*)/g

function padding (s, len) {
    var le = len - (s + '').length
    for (var i = 0; i < le; i++) { s = '0' + s }
    return s
  };

export default {
    pathname: function () {
        // return location.pathname.split("/")[1]
        return location.hash.split("/")[1]
    },

    //节流 高频点击提交，表单重复提交
    throttle: function (fn, m = 500) {
        let last
        return function () {
            var ctime = new Date().getTime()
            if (!last || ctime - last > m) {
                last = ctime
                fn.apply(this, arguments)
            }
        }
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || 'yyyy-MM-dd';
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        }
    }
}