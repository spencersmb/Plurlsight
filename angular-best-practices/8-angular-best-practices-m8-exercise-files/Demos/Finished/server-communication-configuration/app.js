var app = angular.module('app', ['ngResource']);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
})

app.controller('scNavBarCtrl', function($scope){

});

app.controller('scNavBarLoginCtrl', function($scope, notifier, users, identity){
  $scope.signin = function(name, password) {
    users.query().$promise.then(function(userCollection) {
      userCollection.forEach(function(user) {
        if(name === user.name && password === user.password) {
          notifier.notify('You have successfully signed in!');
          identity.currentUser = user;
          $scope.authenticated = true;
        }
      });
      if(identity.currentUser === undefined) {
        notifier.notify('Username/Password Combination incorrect');
      }
    });
  }
});

app.controller('scCatalogCtrl', function($scope, notifier, followedInstructors){
  $scope.registerCourse = function(course) {
    course.registered = true;
    course.$save();
    notifier.notify('You have registered for ' + course.name);
  }

  $scope.followInstructor = function(instructorName) {
    var found = false;
    $scope.followedInstructors.forEach(function(instructor) {
      if(instructor.name === instructorName) {
        found = true;
      }
    });
    if(!found) {
      $scope.followedInstructors.push({name: instructorName});
      followedInstructors.save($scope.followedInstructors);
      notifier.notify('You are now following ' + instructorName);
    }
  }
});

app.controller('scScheduleCtrl', function($scope, notifier){
  $scope.unregisterCourse = function(course) {
    course.registered = false;
    course.$save();
    notifier.notify('You have unregistered for ' + course.name);
  }
});

app.controller('scFollowedInstructorsCtrl', function($scope, notifier, followedInstructors){

  $scope.unFollowInstructor = function(instructor) {
    $scope.followedInstructors.splice($scope.followedInstructors.indexOf(instructor), 1);
    followedInstructors.save($scope.followedInstructors);
    notifier.notify('You have unfollowed ' + instructor.name);
  }
});

app.controller('scRegistrationCtrl',function($scope, toastr, catalog, identity, followedInstructors) {
  $scope.identity = identity;
  $scope.catalog = catalog.query();

  var promise = followedInstructors.get().success(function(data) {
    $scope.followedInstructors = data;
  });
});

app.factory('notifier', function(toastr) {
  return {
    notify: function(msg) {
      toastr.success(msg);
      console.log(msg);
    }
  }
})