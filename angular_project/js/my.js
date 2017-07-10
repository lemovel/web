angular.module('myModule',['ng','ngRoute','ngAnimate']).
  controller('startCtrl',function($scope,$location){
  $scope.load=function(){
    var timeout=$timeout(function(){
      $location.path("/main.html");
    },3000);
  }
}).
run(function($http){
  $http.defaults.headers.post=
  {'Content-Type':'application/x-www-form-urlencoded'}
}).
  controller('mainCtrl',function($scope,$http){
  $scope.isLoading=true;
  $scope.hasMore=true;
  $http.get('data/dish_listbypage.php?start=0').
    success(function(data){
    $scope.dishList=data; //把服务器返回的数据设置为Model
    $scope.isLoading=false;
  });
  $scope.loadMore=function(){
    $scope.isLoading=true;
    $http.get('data/dish_listbypage.php?start='+$scope.dishList.length).
      success(function(data){
      if (data.length<5){
        $scope.hasMore=false;
      }
      $scope.dishlist=$scope.dishList.concat(data);
      $scope.isLoading = false;
    })
  }

  //监视model数据的改变
  $scope.$watch('kw',function(){
    if (!$scope.kw){
      return;
    }
    $scope.isLoading= true;
    $http.get('data/dish_listbykw.php?kw='+$scope.kw).
      success(function(data){
      $scope.dishList=data;
      $scope.isLoading=false;
    });

  });
}).
  controller('detailCtrl',function($scope,$routeParams,$http){
  $http.get('data/dish_listbydid.php?did='+$routeParams.did).
    success(function (data) {
    $scope.dish=data;
  })

}).
  controller('orderCtrl',function($scope,$routeParams,$http){
    var isLoading=false;
    var str = jQuery.param($scope.order);
  $http.post('data/order_add.php',str).
    success(function (data){
    console.log('提交成功');
    isLoading=true;
    $scope.fk=data;
  })
}).
  controller('myoderCtrl',function($scope,$http){
  $
  $http.get('data/order_listbyphone.php').
  success()
}).
  config(function($routeProvider){
    $routeProvider.
      when('/start',{
      templateUrl:'tpl/start.html',
      controller:'startCtrl'
    }).
    when('/main',{
      templateUrl:'tpl/main.html',
      controller:'mainCtrl'
    }).
    when('/detail/:did',{///+:表示路由参数，为变量
      templateUrl:'tpl/detail.html',
      controller:'detailCtrl'
    }).
      when('/myorder',{
      templateUrl:'tpl/myorder.html',
      controller:'myorder.html'
    }).
    when('/order/:did',{
      templateUrl:'tpl/order.html',
      controller:'order.html'
    }).otherwise({
		redirectTo:'/main'
	})
});