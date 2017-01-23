app.controller('mainCtrl', function($http, $scope){

    $scope.getEpisode = function(){

        $(document).ready(function(){

            var data = {params: {date: new Date()}}

            $http.get('/getData', data).then(function(response){

                // console.log(response);

                $scope.done = true;
                var data = response.data;
                var currDate = new Date();
                var currentHour = currDate.getHours();
                var currentMin = currDate.getMinutes();

                if(currentMin < 10){
                    currentMin = "0" + currentMin;
                }

                $scope.currTime = currentHour + ":" + currentMin + " on a " + data.Day;
                $scope.title = data.Title;
                $scope.season = data.Season;
                $scope.episode = data.Episode;
                $scope.time = data.Time + " on a " + data.Day;

                $('#results').fadeIn(1000);

            });
        });
    }
});
