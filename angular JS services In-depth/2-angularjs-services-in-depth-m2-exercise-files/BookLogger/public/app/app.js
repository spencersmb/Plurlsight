(function() {

    //provider example
    var app = angular.module('app', []);

    app.provider( 'books', function(){

        //creates the service using $get
        this.$get = function(){

            var appName = 'Book Logger';
            var appDesc = 'Track which books you read.';

            var version = "1.0";

            if( includeVersionInTitle){
                appName += ' ' + version;
            }

            return{
                //these get returned as properties on the service
                appName: appName,
                appDesc: appDesc
            };

        };

        //xpos config points
        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function(value){
            includeVersionInTitle = value;
        };
    });

    //angular automatically adds provider to the end of your named service
    //shows how to config a service potentially
    app.config(function(booksProvider){
        booksProvider.setIncludeVersionInTitle(true);
    });
}());