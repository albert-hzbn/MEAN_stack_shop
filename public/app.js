var app = angular.module("shoppingApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/categoriesproducts/:category", {
            templateUrl: "shop/view/categoriesproducts.html",
            controller: "shopCategoiresCtrl"
        })
        .when("/admin", {
            templateUrl: "admin/view/home.html",
            controller: "adminCtrl"
        })
        .when("/admin/categories", {
            templateUrl: "admin/view/categories.html",
            controller: "adminCtrl"
        })
});