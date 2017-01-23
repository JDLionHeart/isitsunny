node_cj = require("node-csv-json");
var _ = require('lodash');

module.exports.getEpisodes = function(req, res){

    var philiDate = new Date(req.query.date);
    var utc = philiDate.getTime() + philiDate.getTimezoneOffset() * 60000;
    var phili = utc + (3600000 *- 5);
    var newDate = new Date(phili);

    node_cj({
        input:  __dirname + "/Data.csv",
        output: null
    }, function(err, result){

        if(err) {
            console.error(err);
        }

        else {

            var episodes = result;

            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var currentTime = new Date(req.query.date);
            var currentHour = currentTime.getHours();
            var currentMin = currentTime.getMinutes();
            var currentDay = days[currentTime.getDay()];

            //filter out episodes on a different day
            episodes = episodes.filter(function(a){
                return a.Day == currentDay;
            });

            if(episodes.length == 1){
                return res.json(episodes[0]);
            }

            else{

                episodes = episodes.sort(function(a, b){
                    return Math.abs(currentHour - parseInt(a.Time.split(":")[0]))
                    - Math.abs(currentHour - parseInt(b.Time.split(":")[0]));
                });

                //take first 2
                episodes = _.take(episodes, 2);

                episodes = episodes.sort(function(a, b){
                    return Math.abs(currentMin - parseInt(a.Time.split(":")[1]))
                    - Math.abs(currentMin - parseInt(b.Time.split(":")[1]));
                })

            }

            return res.json(episodes[0]);
        }

    });



}
