angular.module("starter.controllers",[])
angular.module("starter.services",[])

angular.module("starter",["ionic","starter.controllers","starter.services"])

angular.module("starter")

.controller("myCtrl",function(){})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider,$urlRouterProvider){
	
	$stateProvider
	.state("tour",{
		url:"/tour",
		templateUrl:"templates/tour.html"
	})
	
	.state("home",{
		url:"/home",
		templateUrl:"templates/home.html",
		controller:"HomeCtrl"
	})
	.state('category', {
    url: '/category',
    templateUrl: 'templates/category.html',
    controller: 'CategoryCtrl'
  })	
	.state("detail",{
		url:"/detail",
		templateUrl:"templates/detail.html",
		controller:"DetailCtrl"
	})
	.state("cart",{
		url:"/cart",
		templateUrl:"templates/cart.html"
	})
	.state("checkout_address",{
		url:"/checkout/address",
		templateUrl:"templates/checkout-address.html",
		
	})
	.state("checkout_shipping",{
		url:"/checkout/shipping",
		templateUrl:"templates/checkout-shipping.html"
	})
	.state("checkout_payment",{
		url:"/checkout/payment",
		templateUrl:"templates/checkout-payment.html"
	})
	.state("login",{
		url:"/login",
		templateUrl:"templates/login.html",
		controller:"AuthCtrl"
	})
	
	$urlRouterProvider.otherwise("/tour")
})

