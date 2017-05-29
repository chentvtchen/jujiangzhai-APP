//返回登录页面
function backLogin(){
	if (location.href == 'login.html')
		return;
	setTimeout(function() {
			//关闭 splash
			plus.navigator.closeSplashscreen();
			var views = plus.webview.all();
			for (var i = 0; i < views.length; i++) {
					if (views[i].id != 'login.html') {
				plus.webview.close(views[i]);
			}
		}
	}, 600);
	mui.openWindow({
		url: '../login.html',
		preload: true,
		show: {
			aniShow: 'pop-in'
		},
		styles: {
			popGesture: 'hide'
		},
		waiting: {
			autoShow: false
		}
	});	
}
function backLoginI(){
	if (location.href == 'login.html')
		return;
	setTimeout(function() {
			//关闭 splash
			plus.navigator.closeSplashscreen();
			var views = plus.webview.all();
			for (var i = 0; i < views.length; i++) {
					if (views[i].id != 'login.html') {
				plus.webview.close(views[i]);
			}
		}
	}, 600);
	mui.openWindow({
		url: 'login.html',
		preload: true,
		show: {
			aniShow: 'pop-in'
		},
		styles: {
			popGesture: 'hide'
		},
		waiting: {
			autoShow: false
		}
	});	
}
//注册
function register(userName,password) {
	mui.ajax('http://waleslee.cn/Register', {
		data: {
			userName:userName,
			password:password
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(data.status){
				plus.nativeUI.toast('注册成功，请登录！');
				backLogin();
			}else{
				plus.nativeUI.toast('注册失败');
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('注册失败');
		}
	})
}
//登录
function login(userName,password) {
	plus.webview.close(self.id);
	mui.ajax('http://waleslee.cn/Login', {
		data: {
			userName:userName,
			password:password
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(data.status){
//				var wobj = plus.webview.getWebviewById("my.html");
//					wobj.reload(true); 
				plus.nativeUI.toast('登录成功');
				plus.storage.setItem("token",data.token);
				plus.storage.setItem("userName",userName);
			}else{
				plus.nativeUI.toast('登录失败');
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('登录失败');
		}
	})
}
//是否登录
function isLogin(){
	var token = plus.storage.getItem("token");
	if(token){
		return true;
	}else{
		return false;
	}
}
//注销
function logOut() {
	var token = plus.storage.getItem("token");
	plus.storage.removeItem("token");
	mui.ajax('http://waleslee.cn/Logout', {
		data: {
			token: token
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			plus.nativeUI.toast('注销成功');
			backLoginI();
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('注销失败');
		}
	})
}
//获取用户信息
function getUserInfo() {
	var cityDiv = document.getElementById('city'),
		idDiv = document.getElementById('id'),
		nameDiv = document.getElementById('name'),
		phoneDiv = document.getElementById('phone');
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/User', {
		data: {
			action: 'getInfo',
			token: token
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			cityDiv.innerHTML = data.city;
			nameDiv.innerHTML = data.nickName;
			phoneDiv.innerHTML = data.phone;
			idDiv.innerHTML = data.userName;
			
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取用户信息失败');
		}
	})
}
function changePassword(oldPass,newPass) {
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/User', {
		data: {
			action: 'changePwd',
			token: token,
			oldPwd: oldPass,
			newPwd: newPass
		},
		type: 'get',
		success: function(data) {
			plus.nativeUI.toast('修改密码成功，请重新登录');
			backLoginI();
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('修改密码失败');
		}
	})
}
//修改昵称
function changeName(newName) {
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/User', {
		data: {
			action: 'changeNickName',
			token: token,
			newName: newName
		},
		type: 'get',
		success: function(data) {
			plus.nativeUI.toast('修改昵称成功！');
			mui.back();
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('修改昵称失败');
		}
	})
}
//修改城市
function changeCity(city) {
	console.log(city);
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/User', {
		data: {
			action: 'changeCity',
			token: token,
			city: city
		},
		type: 'get',
		success: function(data) {
			plus.nativeUI.toast('修改城市成功！');
			mui.back();
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('修改城市失败');
		}
	})
}
//获取今日推荐
function getTodayList() {
	var todayDiv = document.getElementById('today');
	mui.ajax(url, {
		data: {
			action: 'getRecommended'
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				var div = document.createElement('div');
				div.id = data[i].id;
				
				div.className = 'product';
				div.innerHTML = '<div class="product-img"><img src="http://' + data[i].imgPath + '" /></div><div class="product-name">' + data[i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
					data[i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
					data[i].city + '</span></div>';
				todayDiv.appendChild(div); //把数据插入到页面中
			}
			var div = document.createElement('div');
			div.className = 'mui-clearfix';
			todayDiv.appendChild(div);
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取今日失败');
		}
	})
}
//获取科普文章列表
function getArticle(pullaction) {
	var articleDiv = document.getElementById('article');
	var isEnd = false;
	mui.ajax(url, {
		data: {
			action: 'getArticleList',
			 pageNow:page,
			 pageSize:8
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(data.length == 0){
				if(page == 1){
					shopDiv.innerHTML = '<div class="empty">当前没有数据哦</div>'
				}else{
					plus.nativeUI.toast('已经没有更多科普文章了哦 ^_^');
					isEnd = true;
				}
			}else{			
				if(pullaction=='down')
					articleDiv.innerHTML = '';
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'word-item';
					div.style.background = 'url(http://' + data[i].imgPath+')';
					div.style.backgroundSize = '100% auto';
					div.innerHTML = '<h2>'+data[i].title+'</h2>'
//					div.className = 'article-item';
//					div.innerHTML = '<div class="article-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="article-item-info"><div class="article-item-title"><span class="article-item-type">' + data[i].type + '</span><h4>' + data[i].title + '</h4></div><div class="article-item-intr">' +
//						data[i].description + '</div></div><div class="mui-clearfix"></div>';
					articleDiv.appendChild(div); //把数据插入到页面中
				}
				page++;
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr);
			console.log(type);
			console.log(errorThrown);
			plus.nativeUI.toast('获取科普文章失败');
		},
		complete: function() {
			requestEnd = true;
			if (pullaction == 'up')
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(isEnd);
			else if (pullaction == 'down')
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}
	})
}
//打开科普文章详情页
function openArticleDetail(artid) {
	mui.openWindow({
		id: 'article',
		url: '../home/article.html',
		extras: {
			artid: artid
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
//获取科普文章详情页
function getArticleDetail(id) {
	var articlePageDiv = document.getElementById('article-page');
	var productDiv = document.getElementById('product');
	mui.ajax(url, {
		data: {
			action: 'getArticleDetails',
			id: id
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			articlePageDiv.innerHTML = '<div class="shop-item-info"><h4>' +
				data[0].title + '</h4><span class="mui-pull-right">' + data[0].type + '</span><div class="mui-clearfix"></div></div><div class="product-page-detail">' + data[0].description + '</div>';
			for (var i = 0; i < data[1].length; i++) {
				var div = document.createElement('div');
				div.id = data[1][i].id;
				div.className = 'product';
				div.innerHTML = '<div class="product-img"><img src="http://' + data[1][i].imgPath + '" /></div><div class="product-name">' + data[1][i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
					data[1][i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
					data[1][i].city + '</span></div>';
				productDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取科普文章详情失败');
		}
	})
}
//获取店铺列表
function getShopList(pullaction) {
	var shopDiv = document.getElementById('shop');
	var isEnd = false;
	mui.ajax(url, {
		data: {
			action: 'getShopList',
			 pageNow:page,
			 pageSize:8
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(data.length == 0){
				if(page == 1){
					shopDiv.innerHTML = '<div class="empty">当前没有数据哦</div>'
				}else{
					plus.nativeUI.toast('已经没有更多店铺了哦 ^_^');
					isEnd = true;
				}
			}else{
				if(pullaction=='down')
					shopDiv.innerHTML = '';			
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'shop-item';
					div.innerHTML = '<div class="shop-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[i].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[i].city + '</span><span class="shop-type">' + data[i].businessScope + '</span></div>';
					shopDiv.appendChild(div); //把数据插入到页面中
				}
				page++;				
			}

		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取店铺失败');
		},
		complete: function() {
			requestEnd = true;
			if (pullaction == 'up')
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(isEnd);
			else if (pullaction == 'down')
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}		
	})
}
//通过城市获取店铺列表
function getShopListByCity(city) {
	var shopDiv = document.getElementById('shop');
	mui.ajax(url, {
		data: {
			action: 'getShopByCity',
			city: city
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'shop-item';
					div.innerHTML = '<div class="shop-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[i].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[i].city + '</span><span class="shop-type">' + data[i].businessScope + '</span></div>';
					shopDiv.appendChild(div); //把数据插入到页面中
				}
			} else {
				shopDiv.innerHTML = '<div class="empty">这里是空的哦</div>';
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取店铺失败');
		}
	})
}
//获取附近店铺列表
function getNearShopList(city) {
	var nearShopDiv = document.getElementById('place');
	mui.ajax(url, {
		data: {
			action: 'getShopByCity',
			city: city
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'article-item';
					div.innerHTML = '<div class="article-item-img"><img src="http://'+ data[i].imgPath 
					+ '" /></div><div class="article-item-info"><div class="article-item-title"><h4>'+ data[i].shopName 
					+  '</h4></div><div class="article-item-intr">'+ data[i].description+'</div><div class="article-item-intr"><span class="shop-distance"></span><span class="shop-type">'+
					data[i].businessScope+'</span></div></div><div class="mui-clearfix"></div>';
					nearShopDiv.appendChild(div); //把数据插入到页面中
				}
			} else {
				nearShopDiv.innerHTML = '<div class="empty">你附近还没有店铺哦</div>';
			}			
		}, 
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取附近店铺失败');
		}
	});
}
//获取附近产品列表
function getNearProductList(city) {
	var nearProductDiv = document.getElementById('place');
	mui.ajax(url, {
		data: {
			action: 'getCraftsByCity',
			city: city
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'product';
					div.innerHTML = '<div class="product-img"><img src="http://' + data[i].imgPath + '" /></div><div class="product-name">' + data[i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
						data[i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
						data[i].city + '</span></div>';
					nearProductDiv.appendChild(div); //把数据插入到页面中
				}
			} else {
				nearProductDiv.innerHTML = '<div class="empty">你附近还没有产品哦</div>';
			}			
		}, 
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取附近产品列表失败');
		}
	});
}
//打开店铺详情页面
function openShopDetail(id) {
	mui.openWindow({
		id: 'shop-page',
		url: '../shop/shop-page.html',
		extras: {
			shopid: id
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}

function openShopDetailIndex(id) {
	mui.openWindow({
		id: 'shop-page',
		url: 'shop/shop-page.html',
		extras: {
			shopid: id
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
//获得店铺详情页面
function shopDetail(id) {
	var shopInfoDiv = document.getElementById('shop-info');
	var shopIntrDiv = document.getElementById('shop-intr');
	var productDiv = document.getElementById('product');
	var buyDiv = document.getElementById('buy');
	var goInfo = document.getElementById('go');
	mui.ajax(url, {
		data: {
			action: 'getShopDetails',
			id: id
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			var address = data[0].address.split('$$$');
			var place = address[0];
			var placeDetail = address[1];
			goInfo.innerHTML = '<span>'+placeDetail+'</span>到这儿去';
			var addressInfo = data[0].address
			buyDiv.innerHTML = '<a data-href="' + data[0].shopLink + '">购买</a>';
			shopInfoDiv.innerHTML = '<img src="http://' + data[0].imgPath + '" /><div class=" shop-item-info"><h4>' +
				data[0].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' +
				place + '</span><span class="shop-type">' + data[0].businessScope + '</span></div>';
			shopIntrDiv.innerHTML = data[0].description;
			for (var i = 0; i < data[1].length; i++) {
				var div = document.createElement('div');
				div.id = data[1][i].id;
				div.className = 'product';
				div.innerHTML = '<div class="product-img"><img src="http://' + data[1][i].imgPath + '" /></div><div class="product-name">' + data[1][i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
					data[1][i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
					data[1][i].city + '</span></div>';
				productDiv.appendChild(div); //把数据插入到页面中
			}
			var div = document.createElement('div');
			div.className = 'mui-clearfix';
			productDiv.appendChild(div);
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取店铺详情页面失败');
		}
	});
}
//获取产品列表
function getProductList(pullaction) {
	var productDiv = document.getElementById('product');
	mui.ajax(url, {
		data: {
			action: 'getCraftList'
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if(pullaction=='down'){
				productDiv.innerHTML = '';
			}
			for (var i = 0; i < data.length; i++) {
				var div = document.createElement('div');
				div.id = data[i].id;
				div.className = 'product';
				div.innerHTML = '<div class="product-img"><img src="http://' + data[i].imgPath + '" /></div><div class="product-name">' + data[i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
					data[i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
					data[i].city + '</span></div>';
				productDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品列表失败');
		},
		complete: function() {
			requestEnd = true;
			 if (pullaction == 'down')
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}
	})
}
//获取城市列表
function getCityList() {
	var cityDiv = document.getElementById('city');
	mui.ajax(url, {
		data: {
			action: 'getCraftsCityList'
		},
		type: 'get',
//		dataType: 'json',
		success: function(data) {
			var newString = data.slice(1,(data.length-1));
			console.log(newString);
			var cityList = newString.split(',');
			if (cityList.length) {
				for (var i = 0; i < cityList.length; i++) {
					var div = document.createElement('div');
					div.className = 'city-item';
					div.innerHTML = cityList[i];
					cityDiv.appendChild(div); //把数据插入到页面中
				}
			} else {
				cityDiv.innerHTML = '<div class="empty">这里是空的哦</div>';
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr)
			console.log(type)
			console.log(errorThrown)
			plus.nativeUI.toast('获取城市列表失败');
		}
	})
}
//通过城市获取获取产品列表
function getProductListByCity(city) {
	var productDiv = document.getElementById('product');
	mui.ajax(url, {
		data: {
			action: 'getCraftsByCity',
			city: city
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'product';
					div.innerHTML = '<div class="product-img"><img src="http://' + data[i].imgPath + '" /></div><div class="product-name">' + data[i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
						data[i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
						data[i].city + '</span></div>';
					productDiv.appendChild(div); //把数据插入到页面中
				}
			} else {
				productDiv.innerHTML = '<div class="empty">这里是空的哦</div>';
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品列表失败');
		}
	})
}
//通过分类获取获取产品列表
function getCraftsByType(craft) {
	var productDiv = document.getElementById('product');
	var type = '';
	for(var i=1;i<craft.length;i++){
		type = type + craft[i];
	}
	
	mui.ajax(url, {
		data: {
			action: 'getCraftsByType',
			type: type
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'product';
					div.innerHTML = '<div class="product-img"><img src="http://' + data[i].imgPath + '" /></div><div class="product-name">' + data[i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
						data[i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
						data[i].city + '</span></div>';
					productDiv.appendChild(div); //把数据插入到页面中					
				}
			} else {
				productDiv.innerHTML = '<div class="empty">这里是空的哦</div>';
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品列表失败');
		}
	})
}
//通过分类获取获取店铺列表
function getShopByType(craft) {
	var shopDiv = document.getElementById('shop');
	var type = '';
	for(var i=1;i<craft.length;i++){
		type = type + craft[i];
	}
	mui.ajax(url, {
		data: {
			action: 'getShopByType',
			type: type
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			if (data.length) {
				for (var i = 0; i < data.length; i++) {
					var div = document.createElement('div');
					div.id = data[i].id;
					div.className = 'shop-item';
					div.innerHTML = '<div class="shop-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[i].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[i].city + '</span><span class="shop-type">' + data[i].businessScope + '</span></div>';
					shopDiv.appendChild(div); //把数据插入到页面中
				}				
			} else {
				shopDiv.innerHTML = '<div class="empty">这里是空的哦</div>';
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品列表失败');
		}
	})
}
//打开产品详情页面
function openProductDetail(id) {
	mui.openWindow({
		id: 'product-page',
		url: '../product/product-page.html',
		extras: {
			proid: id
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}

function openProductDetailIndex(id) {
	mui.openWindow({
		id: 'product-page',
		url: 'product/product-page.html',
		extras: {
			proid: id
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
//获取产品详情页
function productDetail(id) {
	var productInfoDiv = document.getElementById('product-detail');
	var discountDiv = document.getElementById('discount');
	var productDiv = document.getElementById('product');
	var thisShopDiv = document.getElementById('this-shop');
	var buyDiv = document.getElementById('buy');
	var goInfo = document.getElementById('go');
	var isCollect = document.getElementById('book');
	mui.ajax(url, {
		data: {
			action: 'getCraftDetails',
			id: id
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			var address = data[0].address.split('$$$');
			var place = address[0];
			var placeDetail = address[1];
			goInfo.innerHTML = '<span>'+placeDetail+'</span>到这儿去';
			var addressInfo = data[0].address			
			buyDiv.innerHTML = '<a data-href="' + data[0].shopLink + '">购买</a>';
			productInfoDiv.innerHTML = '<div class="shop-item-info"><h4>' +
				data[0].name + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' +
				place + '</span><span class="mui-pull-right">' + data[0].views + '</span><span class="mui-icon mui-icon-eye mui-pull-right"></span></div><div class="product-page-detail">' + data[0].description + '</div>';
			discountDiv.innerHTML = '<span>优惠暗号</span>' + data[0].cipher + '<div class="shop-discount-money">优惠金额' + data[0].discount + '</div><span>向店家出示app中的优惠暗号可以优惠</span>';
			if(data[1]){
				thisShopDiv.innerHTML = '<div class="shop-item" id="'+data[1].id+'"><div class="shop-item-img"><img src="http://' + data[1].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[1].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[1].city + '</span><span class="shop-type">' + data[1].businessScope + '</span></div></div>';
			}
			isCollect.innerHTML = '<span class="is-collect">'+data[0].isCollected+'</span>收藏';
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品详情和所属店铺失败');
		}
	});
}
//打开导航详情页面
function openAdress(address) {
	mui.openWindow({
		id: 'navgation',
		url: '../shop/navgation.html',
		extras: {
			address: address
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
//打开网页链接页面
function openBuy(buyUrl) {
	mui.openWindow({
		id: 'buy',
		url: '../shop/buy.html',
		extras: {
			buyUrl: buyUrl
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}

function openBuyI(buyUrl) {
	mui.openWindow({
		id: 'buy',
		url: 'buy.html',
		extras: {
			buyUrl: buyUrl
		},
		show: {
			aniShow: 'pop-in'
		},
		waiting: {
			autoShow: false
		}
	});
}
//打开导航页面
function openGo(goPlace,goPlaceName) {
	mui.openWindow({
		id: 'navgation',
		url: 'navgation.html',
		show: {
			aniShow: 'pop-in'
		},
		extras: {
			goPlace: goPlace,
			goPlaceName: goPlaceName
		},
		waiting: {
			autoShow: false
		}
	});
}
function openGoI(goPlace,goPlaceName) {
	mui.openWindow({
		id: 'navgation',
		url: '../shop/navgation.html',
		show: {
			aniShow: 'pop-in'
		},
		extras: {
			goPlace: goPlace,
			goPlaceName: goPlaceName
		},
		waiting: {
			autoShow: false
		}
	});
}
//收藏物品
function collect(type,id){
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/Collect', {
		data: {
			token:token,
			itemId:id,
			type:type
		},
		type: 'post',
		success: function(data) {
			var str = '';
			for(var i=2;i<data.length;i++){
				str = str + data[i];
			}
			if(data[0]=='1'){
				plus.nativeUI.toast('收藏成功');
			}else{
					plus.nativeUI.toast('收藏失败');
			}
			
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('收藏失败');
		}
	});		
}
//取消收藏
function cancelCollect(type,id){
	var token = plus.storage.getItem("token");
	mui.ajax('http://waleslee.cn/Collect', {
		data: {
			action:'cancel',
			token:token,
			itemId:id,
			type:type
		},
		type: 'post',
		success: function(data) {
			var str = '';
			for(var i=2;i<data.length;i++){
				str = str + data[i];
			}
			if(data[0]=='1'){
				plus.nativeUI.toast('取消收藏成功');
			}else{
					plus.nativeUI.toast('取消收藏失败');
			}
			
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('收藏失败');
		}
	});		
}
//查看我收藏的手工艺品列表
function getMyLike(pullaction){
	var token = plus.storage.getItem("token");
	var productDiv = document.getElementById('product');
	mui.ajax(url, {
		data: {
			action: 'getCollection',
			token: token
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			if(pullaction=='down'){
				productDiv.innerHTML = '';
			}
			console.log(data[0])
			if(data[0]==1){
				for (var i = 0; i < data[1].length; i++) {
					var div = document.createElement('div');
					div.id = data[1][i].id;
					div.className = 'product';
					div.innerHTML = '<div class="product-img"><img src="http://' + data[1][i].imgPath + '" /></div><div class="product-name">' + data[1][i].name + '</div><div class="product-other"><span class="mui-icon mui-icon-eye"></span><span>' +
						data[1][i].views + '</span><span class="mui-icon mui-icon-location"></span><span>' +
						data[1][i].city + '</span></div>';
					productDiv.appendChild(div); //把数据插入到页面中					
				}				
			}else if(data[0]==2){
				productDiv.innerHTML = '<div class="empty">您还没有收藏的产品</div>';
			}else{
				plus.nativeUI.toast('获取我收藏的手工艺品失败');
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr)
			console.log(type)
			console.log(errorThrown)
			plus.nativeUI.toast('获取我收藏的手工艺品失败');
		},
		complete: function() {
			requestEnd = true;
			 if (pullaction == 'down')
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}
	});	
}
//查看我收藏的店铺列表
function getMyLikeShop(pullaction){
	var token = plus.storage.getItem("token");
	console.log(token)
	var shopDiv = document.getElementById('shop');
	mui.ajax(url, {
		data: {
			action: 'getFollowUp',
			token: token
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			if(pullaction=='down'){
				shopDiv.innerHTML = '';
			}			
			if(data[0]==1){
				for (var i = 0; i < data[1].length; i++) {
					var div = document.createElement('div');
					div.id = data[1][i].id;
					div.className = 'shop-item';
					div.innerHTML = '<div class="shop-item-img"><img src="http://' + data[1][i].imgPath 
					+ '" /></div><div class="shop-item-info"><h4>' + data[1][i].shopName
					+ '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[1][i].city
					+ '</span><span class="shop-type">' + data[1][i].businessScope + '</span></div>';
					shopDiv.appendChild(div); //把数据插入到页面中
				}				
			}else if(data[0]==2){
				shopDiv.innerHTML = '<div class="empty">您还没有收藏的店铺</div>';
			}else{
				plus.nativeUI.toast('获取我收藏的店铺失败');
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr)
			console.log(type)
			console.log(errorThrown)
			plus.nativeUI.toast('获取我收藏的店铺失败');
		},
		complete: function() {
			requestEnd = true;
			 if (pullaction == 'down')
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}		
	});	
}
//浏览次数增加
function addView(id){
	mui.ajax('http://waleslee.cn/View', {
		data: {
			type: 'craft',
			itemId: id
		},
		type: 'post',
		success: function(data) {
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('增加浏览次数失败');
		}
	});	
}
