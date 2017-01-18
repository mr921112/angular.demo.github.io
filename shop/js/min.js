var app = angular.module("shop",["customFiler","ngRoute"]);//ngRoute
//配置路由
app.config(['$locationProvider',function($locationProvider){
	$locationProvider.hashPrefix("");
}]);
app.config(function($routeProvider){
	$routeProvider.when("/product",{templateUrl:"product.html"});
	$routeProvider.when("/checkout",{templateUrl:"checkout.html"});
	$routeProvider.otherwise({templateUrl:"product.html"});
})
//配置主界面的控制器
app.controller("productMain",function($scope,$http,$rootScope){
	$http({
		method:"GET",
		url:"http://127.0.0.1/160811/shop/php/product.php"
	}).then(function(response){
		//console.log(response.data);
		//保存商品信息
		$scope.product = response.data;
		$scope.findCategory('全部');
	});
	//处理点击分类的函数(全部)
	$scope.findCategory=function(category){
		$scope.categoryProducts = [];
		$scope.currentCategory = category;
		if(category=="全部"){
			$scope.categoryProducts = $scope.product;
		}else{
			for(var i = 0;i < $scope.product.length;i++){
				if(category==$scope.product[i]['category']){
					$scope.categoryProducts.push($scope.product[i]);
				}
			}
		}
		$scope.numOfPages();
		$scope.productsPerPage(1);
	}
	//处理分类样式的函数
	$scope.classOfCategory = function(category){
		return $scope.currentCategory == category ? "btn-primary":"";
	}
	
	//实现分页,主要返回分页的页数,一数组的形式返回
	$scope.numOfPages = function(){
		var num = $scope.categoryProducts.length / 3;
		$scope.pageArray = [];
		for(var i = 0;i < num; i++){
			$scope.pageArray.push(i+1);
		}
		//return $scope.pageArray == category ? "btn-primary":"";
	}
	//点击分页按钮 显示对应的商品函数
	$scope.productsPerPage = function(page){
		//定义变量 记录当前的页码
		$scope.currentPage = page;
		$scope.pagePerducts = [];
		for (var i = (page - 1)*3; i < page*3 && i < $scope.categoryProducts.length;i++){
			$scope.pagePerducts.push($scope.categoryProducts[i]);
		}
		$scope.classOfPage = function(page){
			return page == $scope.currentPage ? "btn-primary":"";	
		}
	}
	//顶一个数组,用来存放购买的商品
	$rootScope.cars = [];
	//加入购物车
	$scope.addToCar = function(product){
		//cars这个数组里面装载的是我们自定义的对象
		//{goods:product,num:3}
		//循环检测cars 有木有这个商品
		for (var i = 0;i < $rootScope.cars.length ; i++) {
			var aShop = $rootScope.cars[i];
			if (product.id==aShop.goods.id) {
				aShop.num++;
				break;
			}
		};
		if (i==$rootScope.cars.length) {
			$rootScope.cars.push({goods:product,num:1});
		};
		$scope.totalMoney();
	}
	//计算购物车总价和数量的函数
	$rootScope.sumPrice = 0;//总价
	$rootScope.sumNumber = 0; //商品数量
	$scope.totalMoney = function(){
		$rootScope.sumPrice = 0;//总价
		$rootScope.sumNumber = 0; //商品数量
		for (var i = 0;i <$rootScope.cars.length; i++) {
			var aShop = $rootScope.cars[i];
			$rootScope.sumNumber+=aShop.num;
			$rootScope.sumPrice+=Number(aShop.goods.price)*aShop.num;
		};
	}


});
//app.config(["$locationProvider",function($locationProvider){
//	$locationProvider.hashPrefix("");
//}]);
//	
////配置路由信息
//app.config(function($routeProvider){
//	$routeProvider.when("/aaa",{templateUrl:"a.html"});
//	$routeProvider.when("/bbb",{templateUrl:"b.html"});
//	$routeProvider.when("/ccc",{templateUrl:"c.html"});
//	//angularjs1.6.0以上版本需要配置
//	$routeProvider.otherwise({templateUrl:"a.html"});
//
//});
