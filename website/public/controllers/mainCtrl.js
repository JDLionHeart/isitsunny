app.controller('mainCtrl', function($http, $scope){

    $scope.getEpisode = function(){

        $http({
            method: "GET",
            url: "/getData"
        }).then(function(response){

            // console.log(response);
            $scope.done = true;
            var data = response.data;

            var currDate = new Date();
            $scope.currTime = currDate.getHours() + ":" + currDate.getMinutes() + " on a " + data.Day;
            $scope.title = data.Title;
            $scope.season = data.Season;
            $scope.episode = data.Episode;
            $scope.time = data.Time + " on a " + data.Day;



        });

    }
});
