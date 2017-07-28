app.controller("adminCtrl", function ($scope, $http, $location, $window, $routeParams) {

    var config = {
        headers: {
            'Content-Type': 'application/json;'
        }
    };


    function getProducts() {
        $http.get('/admin/categories/getproducts')
            .then(function (response) {
                $scope.categoresArr = response.data;
                console.log(response.data);
            });
    }


    if ($location.path() == "/admin/categories") {
        getProducts();
    }


    $scope.categorySelected = function (category) {
        $scope.category = category;
    };

    $scope.updateCategory = function (category) {
        console.log(category)
        $http.post('/admin/categories/updatecategory', category)
            .success(function (response) {
                console.log(response);
                $scope.updatedMessage = response.message;
            });
        getProducts();
    };

    const DEFAULT_IMGPATH = "image path";

    $scope.addCategory = function (newCategory) {
        if (!newCategory.image)
            newCategory.image = DEFAULT_IMGPATH;
        $http.post('/admin/categories/addcategory', newCategory)
            .success(function (response) {
                console.log(response);
                $scope.addCategoryMessage = response.message;
            });
        getProducts();
    }

    $scope.removeCategory = function (id) {
        var data = {
            "_id": id
        }
        $http.post('/admin/categories/removecategory', data)
            .success(function (response) {
                console.log(response);
                $scope.removeCategoryMessage = response.message;
            });
        getProducts();
    }
}); 