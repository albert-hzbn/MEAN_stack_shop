app.controller("shopCategoiresCtrl", function ($scope, $http, $location, $window, $routeParams) {

    var config = {
        headers: {
            'Content-Type': 'application/json;'
        }
    };

    $scope.categoryId;
    $scope.categoiesProducts = function (categoryId, categoryName) {
        // $location.path("/categoriesproducts/" + categoryId);
        console.log(categoryId, categoryName)
        $scope.categoryId = categoryId;
        $scope.categoryName = categoryName;
        $http.post('/api/categories', { "category_id": categoryId })
            .success(function (response) {
                if (categoryId == 0)
                    $scope.parentCategoriesArr = response.categories;
                else
                    $scope.categoiesProductsArr = response;
                console.log(response);
            });
    };



    console.log($location.path());
    if ($location.path() == '/categoriesproducts/0')
        $scope.categoiesProducts(0);

    else
        $scope.categoiesProducts($routeParams.category);


    /*  window.addEventListener("hashchange", function (e) {
         console.log(e);
     },false) */
    /*  $http.get('/admin/categories/getproducts')
           .then(function (response) {
               console.log(response);
           }); */
});