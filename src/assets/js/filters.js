/**
 * Created by Administrator on 2016/12/9.
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,  //month
    "d+": this.getDate(),     //day
    "h+": this.getHours(),    //hour
    "m+": this.getMinutes(),  //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(format)){
    format = format.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/**
 *js中更改日期
 * y年， m月， d日， h小时， n分钟，s秒
 */
Date.prototype.add = function (part, value) {
  value *= 1;
  if (isNaN(value)) {
    value = 0;
  }
  switch (part) {
    case "y":
      this.setFullYear(this.getFullYear() + value);
      break;
    case "m":
      this.setMonth(this.getMonth() + value);
      break;
    case "d":
      this.setDate(this.getDate() + value);
      break;
    case "h":
      this.setHours(this.getHours() + value);
      break;
    case "n":
      this.setMinutes(this.getMinutes() + value);
      break;
    case "s":
      this.setSeconds(this.getSeconds() + value);
      break;
    default:

  }
  return this
}

//alert(new Date().add("m", -1).format('yyyy-MM-dd hh:mm:ss')); //时间格式化使用方法


exports.setstate = (value) => {
  let mess='';
  switch(value){
    case 0: mess='空闲中'; break;
    case 1: mess='临时还车'; break;
    case 2: mess='租借中'; break;
    case 3: mess='维护中'; break;
    case 4: mess='锁定中'; break;
  }
  return mess;
}
exports.link = (val,url) =>{
  return '/'+url+'/'+val
}

exports.datetime= (val,mess) => {
  if(val==null){return mess;};
  return new Date(val).format('yyyy-MM-dd hh:mm');
}


