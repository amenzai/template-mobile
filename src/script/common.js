//	这是开发环境下的
var config = window.config || {};
var utils = window.utils || {};
config.env = 'dev';
config.host = 'https://owner.test.kucdn.cn';
config.apiBase = '/api/v1/owner/'; 
;
(function (window, document, $) {
  var validate = {
    //  6~20位，至少一个数字，小写字母或大写字母。
    password: /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/,
    // 手机号
    mobile: /^1[3456789]{10}$/,
    qq: /^\d{4,}$/,
    url: /^(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]$)|([0-9a-zA-Z_!~*'()-]+\.)*([0-9a-zA-Z][0-9a-z-]{0,61})?[0-9a-zA-Z]\.[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/
  }

  window.config.validate = validate;

})(window, document, jQuery)
;
(function (window, document, $) {
  var constant = {
    preUrl: '//www.yuntask.com'
  }

  window.config.constant = constant;

})(window, document, jQuery)
;
(function(window) {
  var dictionary = {
    optimizeLogType: {
      description: '优化日志类型',
      options: [
        { value: 1, label: '关键词布局' },
        { value: 2, label: '站内优化' },
        { value: 3, label: '站外优化' },
        { value: 4, label: '分析报告' },
        { value: 5, label: '外链' },
        { value: 6, label: '原创内容' },
        { value: 7, label: '月度总结(含下月计划)' },
        { value: 0, label: '其他' }
      ]
    }
  }
  window.config.dictionary = dictionary;
})(window)

;
(function(window, document, $) {
  //  所有的公共方法都写在这里
  var utils = {
    getLabel: function(value, name) { // 字典查找
      var dictionary = window.config.dictionary;
      if (arguments.length === 1) return dictionary[value].options || []; //  如果参数只有一个，获取对应的arr
      var arr = dictionary[name] ? dictionary[name].options : [];
      var length = arr.length
      for (var i = 0; i < length; i++) {
        if (arr[i].value == value) {
          return arr[i].label
        }
      }
      return '';
    },
    seeLabel: function(value, arr) { // 字典查找
      var length = arr.length
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == value) {
          return arr[i].label
        }
      }
      return '';
    },
    getQQ: function(qq) {
      var v = $.isArray(qq) ? qq[Math.floor(Math.random() * qq.length)] : qq;
      window.open("http://wpa.qq.com/msgrd?v=3&uin=" + v + "&site=qq&menu=yes");
    },
    currency: function(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      if (!s && s !== 0) {
        return '';
      }
      s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
      var l = s.split('.')[0],
        r = s.split('.')[1];
      return '\u00a5' + ' ' + l + '.' + r;
    },
    getQs: function(name) {
      var str = window.location.search.slice(1);
      var arr = str ? str.split('&') : [];
      for (var i = 0; i < arr.length; i++) {
        var cur = arr[i].split('=');
        if (name === cur[0]) {
          return cur[1];
        }
      }
      return undefined;
    },
    jump: function(url, query, type) {
      var result = '';
      if (query === undefined) {
        window.location.href = url;
        return;
      }
      query = query || {};
      for (var k in query) {
        result += '&' + k + '=' + encodeURIComponent(query[k])
      }
      result = url + '?' + result.slice(1);
      if (type) {
        window.open(result, '_blank')
      } else {
        window.location.href = result;
      }
    },
    dateFmt: function(date, format) {
      if (!date) return '';
      date = new Date(date);
      var paddNum = function(num) {
          num += ''
          return num.replace(/^(\d)$/, '0$1')
        }
        // 指定格式字符
      var cfg = {
        yyyy: date.getFullYear(),
        yy: date.getFullYear().toString().substring(2),
        M: date.getMonth() + 1,
        MM: paddNum(date.getMonth() + 1),
        d: date.getDate(),
        dd: paddNum(date.getDate()),
        hh: paddNum(date.getHours()),
        mm: paddNum(date.getMinutes()),
        ss: paddNum(date.getSeconds())
      }
      format || (format = 'yyyy-MM-dd hh:mm:ss')
      return format.replace(/([a-z])(\1)*/ig, function(m) {
        return cfg[m]
      })
    },
    trimObject: function(data) {
      var obj = JSON.parse(JSON.stringify(data));
      for (var k in obj) {
        if (typeof obj[k] === 'string' && obj[k].trim() === '') {
          delete obj[k];
        }
      }
      return obj;
    },
    setCookie: function(name, value, exdays) {
      exdays = exdays || 1;
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires;
    },
    getCookie: function(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
      } else {
        return null;
      }
    },
    delCookie: function(name) {
      this.setCookie(name, "", -1);
    },
    uniqueArr: function(arr) {
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
          res.push(arr[i]);
        }
      }
      return res;
    },
    validateMobile: function(str) {
      return /^1[3|4|5|7|8|9][0-9]{9}$/.test(str);
    },
    validateEmail: function(str) {
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    },
    isDisabled: function(el, bool) { // el 为jquery元素  bool:布尔值
      el.prop('disabled', bool);
    }
  }
  window.utils = utils;
  window.$getLabel = utils.getLabel;

})(window, document, jQuery)

;
(function(window, document, $) {
  /**
   * method: post/get
   * url: 'api/v1/...'
   * cb: 成功回调
   * ecb: 失败回调
   */
  var http = function(method, url, params, cb, ecb) {
    if (cb === undefined && typeof params == 'function') {
      cb = params;
      params = undefined;
    }
    if (typeof params == 'function' && typeof cb == 'function' && ecb === undefined) {
      cb = params;
      ecb = cb;
      params = undefined;
    }
    url = config.apiBase + url;
    $.ajax({
      url: url,
      type: method,
      cache: false,
      async: true,
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json',
      data: params,
      timeout: 5000,
      traditional: true, //如果你想要用传统的方式来序列化数据，那么就设置为true
      xhrFields: {
        withCredentials: true
      },
      error: function(jqXHR, textStatus, errorMsg) {
        layui.layer.msg('请求超时或网络有问题', { icon: 5 });
      },
      success: function(data, textStatus, jqXHR) {
        if (data.code === 200) {
          cb && cb(data);
        } else if (data.code === 401) {
          window.location.href = '/timeout.html'
        } else {
          layui.layer.msg(data.message || '服务端报错', { icon: 5 });
          ecb && ecb(data);
        }
      }
    })
  }

  http.get = function(url, params, cb, ecb) {
    return http('GET', url, params, cb, ecb)
  }
  http.post = function(url, params, cb, ecb) {
    return http('POST', url, params, cb, ecb)
  }
  window.$http = http;

})(window, document, jQuery)
