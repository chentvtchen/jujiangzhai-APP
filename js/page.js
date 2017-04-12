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
	mui.ajax(url, {
		data: {
			action: 'getShopDetails',
			id: id
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			buyDiv.innerHTML = '<a data-href="' + data[0].shopLink + '">购买</a>';
			shopInfoDiv.innerHTML = '<img src="http://' + data[0].imgPath + '" /><div class=" shop-item-info"><h4>' +
				data[0].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' +
				data[0].address + '</span><span class="shop-type">' + data[0].businessScope + '</span></div>';
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
	var type = craft[1] + craft[2];
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
	mui.ajax(url, {
		data: {
			action: 'getCraftDetails',
			id: id
		},
		type: 'post',
		dataType: 'json',
		success: function(data) {
			buyDiv.innerHTML = '<a data-href="' + data[0].shopLink + '">购买</a>';
			productInfoDiv.innerHTML = '<div class="shop-item-info"><h4>' +
				data[0].name + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' +
				data[0].address + '</span><span class="mui-pull-right">' + data[0].views + '</span><span class="mui-icon mui-icon-eye mui-pull-right"></span></div><div class="product-page-detail">' + data[0].description + '</div>';
			discountDiv.innerHTML = '<span>优惠暗号</span>' + data[0].cipher + '<div class="shop-discount-money">优惠金额' + data[0].discount + '</div><span>向店家出示app中的优惠暗号可以优惠</span>';
			thisShopDiv.innerHTML = '<div class="shop-item"><div class="shop-item-img"><img src="http://' + data[1].imgPath + '" /></div><div class="shop-item-info"><h4>' + data[1].shopName + '</h4><span class="mui-icon mui-icon-location"></span><span class="city">' + data[1].city + '</span><span class="shop-type">' + data[1].businessScope + '</span></div></div>';
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
//打开淘宝页面
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