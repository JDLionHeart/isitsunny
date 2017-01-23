app.controller('mainCtrl', function($http, $scope){

    $scope.getEpisode = function(select){

        $(document).ready(function(){

            $('#local').click(function(a){
                $('#local').addClass('disabled');
                $('#phili').removeClass('disabled');
            });

            $('#phili').click(function(a){
                $('#local').removeClass('disabled');
                $('#phili').addClass('disabled');
            });


            var date;

            if(select == 'local'){
                //local date/time
                date = new Date();
            }

            else{
                //get current date/time in philadelphia
                date = new Date();
                var utc = date.getTime() + date.getTimezoneOffset() * 60000;
                var phili = utc + (3600000 *- 5);
                date = new Date(phili);
            }


            var data = {params: {date: date}}

            $http.get('/getData', data).then(function(response){

                // console.log(response);

                $scope.done = true;
                var data = response.data;
                var currDate = date;
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
