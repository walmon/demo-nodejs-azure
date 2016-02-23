(function () {
    var app = angular.module('demo', []);


    app.controller('demoCtrl', ctrl);


    function ctrl($scope, $http) {
        $scope.items = [];

        $scope.insert = insert;

        loadItems();
        function loadItems() {
            $http.get('/users').then(ok);
            function ok(items){
                $scope.items = items.data;
            }
        }
        function insert(item) {
            if (!item)
                return;

            $http.post('/users', item).then(ok, err);

            function ok(result) {
                $scope.items.push(item);
            }
        }
        function err(error) {
            console.log(error);
        }
    }
})();