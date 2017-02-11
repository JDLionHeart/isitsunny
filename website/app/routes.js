
var mainController = require("./controllers/mainController")

module.exports = function(app){

    app.get('/', function(request, response) {
        res.render(__dirname + "/public/index.html");
    });

    app.get('/getData', mainController.getEpisodes);


}
