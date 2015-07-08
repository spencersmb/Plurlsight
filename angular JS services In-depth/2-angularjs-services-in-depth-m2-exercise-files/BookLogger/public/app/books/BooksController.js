(function() {

    angular.module('app')
        .controller('BooksController', BooksController);

    //initially the author seperates his functions outside of the modules
    function BooksController(books, dataService, logger) {

        //vm = view model
        var vm = this;

        //books.appName is defined in the service
        vm.appName = books.appName;

        //call the books to make available to scope from our dataService
        vm.allBooks = dataService.getAllBooks();

        //uses the prototypal inheritence method from a service.
        logger.output('BooksController has been created');
    }


}());