//var d = new Date("Thu, 06 Sep 2012 00:00:00 +0000");
var hw2clockcnt = 0;

Date.prototype.utc2local = function()
{
    this.setTime(
        this.getTime()-(this.getTimezoneOffset()*60*1000)
    );
}

function hw2clock() {
	var d = new Date();
	//var faceutc1 = new String("<br><div class=timeface>(O_o)/</div>");
	//var faceutc2 = new String("<br><div class=timeface>(o_O)></div>");
	if (hw2clockcnt == 0) {
		//document.getElementById("Date-Face").innerHTML = faceutc1;
		document.getElementById("Date-UTC").innerHTML = "<div class=nobr style=width:180px;text-align:left;><span class=contents_menu>POU Server-Clock:</span></div><div class=nobr style=width:340px;text-align:left;>" + d.toUTCString() + "<br></div>";
		document.getElementById("Date-Local").innerHTML = "<div class=nobr style=width:180px;text-align:left;><span class=contents_menu>Your Local-Clock:</span></div><div class=nobr style=width:340px;text-align:left;>" + d.toString() + "<br></div>";
		hw2clockcnt = 1;
	} else if (hw2clockcnt == 1) {
		//document.getElementById("Date-Face").innerHTML = faceutc2;
		document.getElementById("Date-UTC").innerHTML = "<div class=nobr style=width:180px;text-align:left;><span class=contents_menu>POU Server-Clock:</span></div><div class=nobr style=width:340px;text-align:left;>" + d.toUTCString() + "<br></div>";
		document.getElementById("Date-Local").innerHTML = "<div class=nobr style=width:180px;text-align:left;><span class=contents_menu>Your Local-Clock:</span></div><div class=nobr style=width:340px;text-align:left;>" + d.toString() + "<br></div>";
		hw2clockcnt = 0;
	}
}

setInterval('hw2clock()', 1000);

window.onload = function () {
	xmlhttp_notrans_init('main', 'post', './index.php', 'mode=get&action=motd', 'motd');
	xmlhttp_notrans_init('menu_login', 'post', './index.php', 'mode=get&action=login', 'nobutton');
}
function menubutton_disable() {
	document.getElementById("menubutton1").disabled = true;
	document.getElementById("menubutton2").disabled = true;
	document.getElementById("menubutton3").disabled = true;
	document.getElementById("menubutton4").disabled = true;
	document.getElementById("menubutton5").disabled = true;
	document.getElementById("menubutton6").disabled = true;
	document.getElementById("menubutton7").disabled = true;
	document.getElementById("menubutton8").disabled = true;
	//document.getElementById("menubutton9").disabled = true;
}
function menubutton_enable() {
	document.getElementById("menubutton1").disabled = false;
	document.getElementById("menubutton2").disabled = false;
	document.getElementById("menubutton3").disabled = false;
	document.getElementById("menubutton4").disabled = false;
	document.getElementById("menubutton5").disabled = false;
	document.getElementById("menubutton6").disabled = false;
	document.getElementById("menubutton7").disabled = false;
	document.getElementById("menubutton8").disabled = false;
	//document.getElementById("menubutton9").disabled = false;
}
// ページ切り替え処理
function load(target, howto, action, param, param2) {
	if (target == null) {target = "main";}
	if (howto == null) {howto = "post";}
	if (action == null) {action = "null";}
	if (param == null) {param = "null";}
	if (param2 == null) {param2 = "null";}
	if (action == "login") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=login&passwd=' + md5(document.loginform.passwd.value) + '&loginid=' + document.loginform.loginid.value, 'nobutton');
		xmlhttp_loading(target, 'small');
	}
	if (action == "reload") {
		xmlhttp_notrans_init('main', 'post', './index.php', 'mode=get&action=motd', 'motd');
		xmlhttp_notrans_init('menu_login', 'post', './index.php', 'mode=get&action=login');
		xmlhttp_loading('main');
		xmlhttp_loading('menu_login', 'small');
	}
	if (action == "status") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=login_detail');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "motd") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=motd', 'motd');
		xmlhttp_loading(target);
	}
	if (action == "inv") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=inv&filter=' + param2 + '&page=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "auction") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=auction&filter=' + param2 + '&page=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "logout") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=logout', 'logout');
		xmlhttp_loading(target, 'small');
	}
	if (action == "reforge") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=reforge&param=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "sell") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=sell&param=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "aucbuy") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=aucbuy&param=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "aucset") {
		var chkparam = document.getElementById('aucpt_' + param).value;
		if (chkparam.match(/[^0-9]/)) {
			var main = document.getElementById("aucset_" + param);
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1;
			main.style.opacity = 1;
			main.innerHTML = "<b>Invalid parameter!</b>";
			return;
		} else {
			xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=aucset&param=' + param + '&param2=' + chkparam);
			xmlhttp_loading(target);
			menubutton_disable();
		}
	}
	if (action == "equip") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=equip&param=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "ranking") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=ranking');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "reserve") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=reserve');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "reserveset") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=reserve&param=' + param);
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "fujidraw") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=fujidraw', 'fujidraw');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "fujitranslog") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=get&action=fujitranslog');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "fuji_makedepoaddr") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=fuji_makedepoaddr');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "fujideposit") {
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=fujideposit');
		xmlhttp_loading(target);
		menubutton_disable();
	}
	if (action == "fujitrade") {
		var chkparam = document.fujitrade.amount.value;
		if (chkparam == "" || chkparam.match(/[^0-9]/) || chkparam == "0") {
			var main = document.getElementById("infomess");
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1;
			main.style.opacity = 1;
			main.innerHTML = "<img src=./img/login/info.svg width=30 align=left>&nbsp;Invalid trade amount. Only allow number and 1 more than higher.<br clear=left>";
			return;
		}
		xmlhttp_notrans_init(target, 'post', './index.php' + '', 'mode=set&action=fujitrade&param=' + chkparam);
		xmlhttp_loading(target);
	}
	if (action == "nanodeposit_start") {
		var chkparam = document.nanodeposit_form.amount.value;
		var chkrate = document.nanodeposit_form.rate.value;
		if (chkparam == "" || chkparam.match(/[^0-9]/) || chkparam == "0") {
			var main = document.getElementById("infomess");
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1;
			main.style.opacity = 1;
			main.innerHTML = "<img src=./img/login/info.svg width=30 align=left>&nbsp;Invalid trade amount. Only allow number and 1 more than higher.<br clear=left>";
			return;
		}
		nano_deposit_zone.innerHTML = "<div id=nano-button></div>";
		brainblocks.Button.render({
			// Pass in payment options
			payment: {
				destination: 'xrb_3cyq4d4k9kircqg146ppwq7aiet6gxbcjwzrq8yp7kp43n57ktw8ubxzcrot',
				currency:    'rai',
				amount:      ((chkrate*chkparam)*1000000)
			},
			// Handle successful payments
			onPayment: function(data) {
				console.log('Payment successful!', data.token);
				xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=nanodeposit&param=' + data.token);
				xmlhttp_loading('main');
				menubutton_disable();
			}
		}, '#nano-button');
	}
	if (action == "settings") {
		menubutton_disable();
		if (param == "setpw") {
			var chkpw = document.changepasswd.passwd.value;
			var chkrepw = document.changepasswd.repasswd.value;
			if (chkpw != chkrepw || chkpw == "" || chkrepw == "" || chkpw.match(/[^a-zA-Z0-9!?]/) || chkpw.length < 4 || chkpw.length > 15) {
				var main = document.getElementById("infomess");
				main.style.filter = 'alpha(opacity=100)';
				main.style.MozOpacity = 1;
				main.style.opacity = 1;
				main.innerHTML = "<img src=./img/login/info.svg width=30 align=left>&nbsp;Some PW input invalid. Please check.<br clear=left>";
				return;
			}
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=settings&param=changepw&param2=' + md5(chkpw));
			xmlhttp_loading("main");
		} else if (param == "setfujicoin") {
			var chkparam = document.changefujicoin.fujicoinaddr.value;
			if (chkparam == "" || chkparam.match(/[^a-zA-Z0-9!?]/) || chkparam.length < 20 || chkparam.length > 40) {
				var main = document.getElementById("infomess");
				main.style.filter = 'alpha(opacity=100)';
				main.style.MozOpacity = 1;
				main.style.opacity = 1;
				main.innerHTML = "<img src=./img/login/info.svg width=30 align=left>&nbsp;FujiCoin Address invalid. Please check.<br clear=left>";
				return;
			}
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=settings&param=changefujicoin&param2=' + chkparam);
			xmlhttp_loading("main");
		} else if (param == "sethomepage") {
			var chkparam = document.changehomepage.homepageaddr.value;
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=settings&param=changehomepage&param2=' + chkparam);
			xmlhttp_loading("main");
		} else if (param == "sendxferxp") {
			var chkparam = document.xferxp.acctname.value;
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=settings&param=sendxferxp&param2=' + chkparam);
			xmlhttp_loading("main");
		} else if (param == "getxferxp") {
			var chkparam = document.xferxp.acctname.value;
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=set&action=settings&param=getxferxp&param2=' + chkparam);
			xmlhttp_loading("main");
		} else if (param == "uploadimg") {
			xmlhttp_notrans_uploadimg('main', 'post', './index.php', 'uploadimg');
			xmlhttp_loading("main");
		} else {
			xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=get&action=settings');
			xmlhttp_loading("main");
		}
	}
	if (action == "ver") {
		xmlhttp_notrans_init('main', 'post', './index.php' + '', 'mode=get&action=ver', 'nobutton');
		xmlhttp_loading("main");
	}
}
function reforge_ask(target) {
	if (target == null) {target = "reforge_1";}
	var main = document.getElementById("reforge_" + target);
	main.style.filter = 'alpha(opacity=100)';
	main.style.MozOpacity = 1;
	main.style.opacity = 1;
	main.innerHTML = "<b>Continue?</b> <input type=button value='REFORGE!' onclick=load('main','post','reforge','" + target + "'); style=font-size:9px;></input>";
}
function sell_ask(target) {
	if (target == null) {target = "sell_1";}
	var main = document.getElementById("sell_" + target);
	main.style.filter = 'alpha(opacity=100)';
	main.style.MozOpacity = 1;
	main.style.opacity = 1;
	main.innerHTML = "<b>Continue?</b> <input type=button value='SELL!' onclick=load('main','post','sell','" + target + "'); style=font-size:9px;></input>";
}
function aucbuy_ask(target) {
	if (target == null) {target = "aucbuy_1";}
	var main = document.getElementById("aucbuy_" + target);
	main.style.filter = 'alpha(opacity=100)';
	main.style.MozOpacity = 1;
	main.style.opacity = 1;
	main.innerHTML = "<b>Continue?</b> <input type=button value='BUY!' onclick=load('main','post','aucbuy','" + target + "'); style=font-size:12px;></input>";
}
function aucset_ask(target) {
	if (target == null) {target = "aucset_1";}
	var main = document.getElementById("aucset_" + target);
	main.style.filter = 'alpha(opacity=100)';
	main.style.MozOpacity = 1;
	main.style.opacity = 1;
	main.innerHTML = "<b>Continue?</b> <input type=button value='SET!' onclick=load('main','post','aucset','" + target + "'); style=font-size:9px;></input>";
}
function xmlhttp_loading(target, param) {
	if (target == null) {target = "main";}
	var main = document.getElementById(target);
	main.style.filter = 'alpha(opacity=100)';
	main.style.MozOpacity = 1;
	main.style.opacity = 1;
	if (param == "small") {
		main.innerHTML = "<img id='loading' width=100 />";
		ajaxloadimg= document.getElementById("loading");
		ajaxloadimg.src = "./img/ajax-loader2.gif";
	} else {
		main.innerHTML = "<div class=center><br><div class='loading_blink'></div>Loading...<br><br><div class='loading'></div></div>";
	}
}

function xmlhttp_notrans_init(target, howto, pagelink, send, param) {
	// XMLHttpRequest実装
	var xmlhttp = false;
	//IE・FF他判定
	if (typeof ActiveXObject != "undefined") {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != "undefined") {	
		xmlhttp = new XMLHttpRequest();
	}
	//
	xmlhttp.open(howto, pagelink);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var main = document.getElementById(target);
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1.0;
			main.style.opacity = 1.0;
			main.innerHTML = xmlhttp.responseText;
			if (param == "motd") {
				//xmlhttp_notrans_init('c-jp1', 'get', 'https://www.hw2.click:8443/jp1', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-jp2', 'get', 'https://www.hw2.click:8443/jp2', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-jp3', 'get', 'https://www.hw2.click:8443/jp3', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-jp4', 'get', 'https://www.hw2.click:8443/jp4', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-us1', 'get', 'https://www.hw2.click:8443/us1', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-us2', 'get', 'https://www.hw2.click:8443/us2', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-us3', 'get', 'https://www.hw2.click:8443/us3', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-us4', 'get', 'https://www.hw2.click:8443/us4', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-eu1', 'get', 'https://www.hw2.click:8443/eu1', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-eu2', 'get', 'https://www.hw2.click:8443/eu2', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-au1', 'get', 'https://www.hw2.click:8443/au1', 'null', 'nobutton');
				//xmlhttp_notrans_init('c-au2', 'get', 'https://www.hw2.click:8443/au2', 'null', 'nobutton');
				xmlhttp_notrans_init('ranking', 'post', './index.php', 'mode=get&action=ranking&filter=motd', 'nobutton');
				//xmlhttp_fuji_info();
			} else if (param == "nobutton") {
			} else if (param == "logout") {
				xmlhttp_notrans_init('main', 'post', './index.php', 'mode=get&action=motd', 'motd');
				xmlhttp_loading('main');
			} else {
				menubutton_enable();
			}
		}
	}
	//ヘッダーのセット - ブラウザ互換
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(send);
}
function xmlhttp_notrans_uploadimg(target, howto, pagelink, param) {
	// XMLHttpRequest実装
	var xmlhttp = false;
	var formdata = new FormData(document.getElementById(param));
	formdata.append('mode', 'set');
	formdata.append('action', 'settings');
	formdata.append('param', 'uploadimg');
	//IE・FF他判定
	if (typeof ActiveXObject != "undefined") {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != "undefined") {	
		xmlhttp = new XMLHttpRequest();
	}
	//
	xmlhttp.open(howto, pagelink, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var main = document.getElementById(target);
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1.0;
			main.style.opacity = 1.0;
			main.innerHTML = xmlhttp.responseText;
			menubutton_enable();
		}
	}
	xmlhttp.send(formdata);
}

function xmlhttp_fuji_info() {
	// XMLHttpRequest実装
	var xmlhttp = false;
	//IE・FF他判定
	if (typeof ActiveXObject != "undefined") {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch(e) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest != "undefined") {	
		xmlhttp = new XMLHttpRequest();
	}
	//
	xmlhttp.open('GET', 'https://api.coinmarketcap.com/v1/ticker/fujicoin/');
	xmlhttp.responseType = 'json';
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var main = document.getElementById('fuji_price_usd');
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1.0;
			main.style.opacity = 1.0;
			if (xmlhttp.response[0]["percent_change_24h"] < 0.0) { main.innerHTML = "" + xmlhttp.response[0]["price_usd"] + " ( <span style='color:#ff3c49;'>" + xmlhttp.response[0]["percent_change_24h"] + "%</span> (24h) )"; }
			if (xmlhttp.response[0]["percent_change_24h"] >= 0.0) { main.innerHTML = "" + xmlhttp.response[0]["price_usd"] + " ( <span style='color:#3fee3e;'>" + xmlhttp.response[0]["percent_change_24h"] + "%</span> (24h) )"; }
			var main = document.getElementById('fuji_price_btc');
			main.style.filter = 'alpha(opacity=100)';
			main.style.MozOpacity = 1.0;
			main.style.opacity = 1.0;
			main.innerHTML = "" + xmlhttp.response[0]["price_btc"];
		}
	}
	//ヘッダーのセット - ブラウザ互換
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send('null');
}

