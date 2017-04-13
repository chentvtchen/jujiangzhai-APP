//返回登录页面
function backLogin(){
	if (location.href == 'login.html')
		return;
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
function getArticle() {
	var articleDiv = document.getElementById('article');
	mui.ajax(url, {
		data: {
			action: 'getArticleList'
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				var div = document.createElement('div');
				div.id = data[i].id;
				div.className = 'article-item';
				div.innerHTML = '<div class="article-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="article-item-info"><div class="article-item-title"><span class="article-item-type">' + data[i].type + '</span><h4>' + data[i].title + '</h4></div><div class="article-item-intr">' +
					data[i].description + '</div></div><div class="mui-clearfix"></div>';
				articleDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取科普文章失败');
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
function getShopList() {
	var shopDiv = document.getElementById('shop');
	mui.ajax(url, {
		data: {
			action: 'getShopList'
		},
		type: 'get',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				var div = document.createElement('div');
				div.id = data[i].id;
				div.className = 'shop-item';
				div.innerHTML = '<div class="shop-item-img"><img src="http://' + data[i].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[i].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[i].city + '</span><span class="shop-type">' + data[i].businessScope + '</span></div>';
				shopDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取店铺失败');
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
function getNearShopList() {
	var nearShopDiv = document.getElementById('near-shop');
	mui.ajax(url, {
		data: {
			action: 'getShopList'
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				var div = document.createElement('div');
				div.id = data[i].id;
				div.className = 'article-item';
				div.innerHTML = '';

				nearShopDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取店铺失败');
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
function getProductList() {
	var productDiv = document.getElementById('product');
	mui.ajax(url, {
		data: {
			action: 'getCraftList'
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
				productDiv.appendChild(div); //把数据插入到页面中
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.toast('获取产品列表失败');
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
	console.log(token);
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
			console.log(str);
			if(data[0]=='1'){
				plus.nativeUI.toast('收藏成功');
			}else{
					plus.nativeUI.toast('收藏失败');
			}
			
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr);
			console.log(type);
			console.log(errorThrown);
			
			plus.nativeUI.toast('收藏失败');
		}
	});		
}
//查看我收藏的手工艺品列表
function getMyLike(){
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
			plus.nativeUI.toast('获取我收藏的手工艺品失败');
		}
	});	
}
//查看我收藏的店铺列表
function getMyLikeShop(){
	var token = plus.storage.getItem("token");
	var shopDiv = document.getElementById('shop');
	mui.ajax(url, {
		data: {
			action: 'getFollowUp',
			token: token
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
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
			plus.nativeUI.toast('获取我收藏的店铺失败');
		}
	});	
}