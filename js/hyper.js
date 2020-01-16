String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}
function updateDate() {
    var date = new Date();
    var month = "";
    switch (date.getMonth()) {
        case 0:
            month = "Jan."
            break;
        case 1:
            month = "Feb."
            break;
        case 2:
            month = "Mar."
            break;
        case 3:
            month = "Apr."
            break;
        case 4:
            month = "May."
            break;
        case 5:
            month = "Jun."
            break;
        case 6:
            month = "Jul."
            break;
        case 7:
            month = "Aug."
            break;
        case 8:
            month = "Sept."
            break;
        case 9:
            month = "Oct."
            break;
        case 10:
            month = "Nov."
            break;
        case 11:
            month = "Dec."
            break;
    }
    document.getElementById("month").innerHTML = month;
    document.getElementById("day").innerHTML = date.getDate();

}
function gaokaoCd() {
    var date = new Date();
    var gaokaoDate = Date.parse("2020-6-7");
    var dateSpan = gaokaoDate - date;
    var dates = Math.floor(dateSpan / (60*60*24*1000));
    document.getElementById('gaokao').innerHTML = dates;

}
function hitokoto() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://api.imjad.cn/hitokoto/", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("hitokoto").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send();
}
function updateSchedule() {
    var date = new Date();
    var kb = '<table class="centered"><tbody><tr><td>{0}</td></tr><tr><td>{1}</td></tr><tr><td>{2}</td></tr><tr><td>{3}</td></tr><tr><td>{4}</td></tr><tr><td>{5}</td></tr><tr><td>{6}</td></tr><tr><td>{7}</td></tr><tr><td>{8}</td></tr><tr><td>{9}</td></tr></tbody></table>';
    switch (date.getDay()) {
        case 1:
            kb = kb.format("语文", "语文", "语文", "数学", "数学", "英语", "物理", "生物", "自习", "班会");
            break;
        case 2:
            kb = kb.format("数学", "数学", "数学", "英语", "英语", "生物", "语文", "语文", "物理", "数学");
            break;
        case 3:
            kb = kb.format("英语", "英语", "英语", "语文", "语文", "数学", "数学", "体育", "精神食粮", "精神食粮");
            break;
        case 4:
            kb = kb.format("语文", "语文", "语文", "数学", "数学", "自习", "英语", "英语", "生物", "物理");
            break;
        case 5:
            kb = kb.format("英语", "英语", "英语", "数学", "物理", "语文", "数学", "数学", "生物", "体育");
            break;
        case 6:
            kb = kb.format("语文", "语文", "英语", "英语", "数学", "数学", "数学", "", "", "");
            break;
    }
    document.getElementById("schedule").innerHTML = kb;
}
function updateHomework(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://127.0.0.1:8308/api/homework", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var obj=JSON.parse (xmlhttp.responseText);
            hw.C=obj.C;
            hw.M=obj['M'];
            hw.E=obj['E'];
            hw.P=obj['P'];
            hw.B=obj['B'];
        }
    }
    xmlhttp.send();
    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", "http://127.0.0.1:8308/api/tmp", true);
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            var obj=JSON.parse (xmlhttp2.responseText);
            hw.wd=obj.wd;
            hw.sd=obj.sd;
        }
    }
    xmlhttp2.send();

}
// function updateNotice() {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", "../notice.html", true);
//     xmlhttp.onreadystatechange = function () {
//         if (xmlhttp.readyState == 4) {
//             document.getElementById("notice").innerHTML = '<pre class="yahei gaokao">' + xmlhttp.responseText + "</pre>";
//         }
//     }
//     xmlhttp.send();
// }
var hw={
    C:"",
    M:"",
    E:"",
    P:"",
    B:"",
    wd:"--",
    sd:"--"
}
var homework = new Vue({
    el: '#homework',
    data: hw
  })
updateDate();
setInterval("updateDate()", 1000 * 60 * 60);
gaokaoCd();
setInterval("gaokaoCd()", 1000);
hitokoto();
setInterval("hitokoto()", 30000);
updateSchedule();
setInterval("updateSchedule()", 1000 * 60 * 60);
updateHomework();
setInterval("updateHomework()", 1000 * 15);
