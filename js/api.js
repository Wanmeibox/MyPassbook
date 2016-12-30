//缓存设置   s秒 m分 h时 d天 w周 M月 y年。规则：正整数+字母缩写
var cache_time_general = '10m';
var cache_time_general_long = '2h';
var cache_time_general_short = '2s';
var cache_time_radio = '1d';
var cache_time_album = '1d';

var api_url = 'http://127.0.0.1:8888/api/';

function api_ajax(action, para, success, error) {
    $.ajax({
        type : para.type || 'POST',
        url : api_url + action,
        dataType : 'json',
        contentType : para.contentType,
        async : para.async,
        data : para.data,
        processData : para.processData,
        beforeSend : function(xhr) {
            if (para.progress) {
                var xhr = this.xhr();
                if (xhr instanceof window.XMLHttpRequest) {
                    xhr.upload.addEventListener('progress', para.progress,
                            false);
                    this.xhr = function() {
                        return xhr;
                    }
                }
            }
        },
        success : function(res) {
            if (success)
                success(res);
        },
        error : function(res) {
            if (error) {
                error(res);
            }
        }
    });
}

function ajax_general(action, para, success, error) {
    if (para.cache) {
        var data = _GET_DATA(action + JSON.stringify(para.data));
        if (data) {
            console.log(data, 'from cache');
            success(data);
            return;
        }
    }
    if (para.async == undefined) {
        para.async = true;
    }
    if(para.spinner){
        //showLoadding();
    }
    
    api_ajax(action,para,function(res) {
        if(para.spinner){
            //hideLoadding();
        }
        if (para.cache) {
            _SET_DATA(action + JSON.stringify(para.data), res,para.cache);
        }
        console.log(res);
        success && success(res);
    }, function(res){
        if(para.spinner){
            //hideLoadding();
        }
        error && error(res);
    });
}

function api_get(success,error){
    var url = 'user/get';
    
    var username = 1;
    var password = 1;
    var timestamp = new Date().getTime();
    var md5 = hex_md5(username + '' + password + '' + timestamp);

    ajax_general(url, {
        data : {username:username,md5:md5,timestamp:timestamp},
        cache : false,
        spinner : true
    }, function(res) {
        if (success) {
            success(res);
        }
    }, error);
}


function api_set(data,success,error){
    var url = 'user/set';
    
    var username = 1;
    var password = 1;
    var timestamp = new Date().getTime();
    var md5 = hex_md5(username + '' + password + '' + timestamp);

    ajax_general(url, {
        data : {username:username,md5:md5,timestamp:timestamp,data:data},
        cache : false,
        spinner : true
    }, function(res) {
        if (success) {
            success(res);
        }
    }, error);
}

