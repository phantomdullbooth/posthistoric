const app = angular.module('App', [])

// =====================================================================
//                          PARENT CONTROLLER
// =====================================================================
// * ATTACHED TO: <body> tag
// * Contains the properties for the $rootScope (see google doc for details)
app.controller('ParentController', ['$http', '$rootScope', function($http, $rootScope){

  // ==============
  // INITIAL VALUES
  // ==============
  $rootScope.currentUser = null;




}]);

// =====================================================================
//                            MAIN CONTROLLER
// =====================================================================
// * ATTACHED TO: <div class="container"> tag
// * Contains the main functionality for the app
app.controller('Controller', function($http){

    // ==============
    // INITIAL VALUES
    // ==============
    const controller = this;
    this.indexOfEditFormToShow = 0;

    // ==============
    // RESTFUL ROUTES
    // ==============

    // CREATE NEW STORY (POST)

  this.createStory = function(){
    $http({
      method:'POST',
      url:'/stories',
      data:{
        text: this.text,
        author: this.author,
        date: this.date
      }
    }).then(function(){
        controller.getStories();
    });
  };

    // EDIT STORY (POST)

  this.editStory = function(story){
    $http({
      method:"PUT",
      url: '/stories/' + story._id,
      data: {
        text: this.updatedText,
        author: this.updatedAuthor,
        date: this.updatedDate
      }
    }).then(function(){
      controller.getStories();
      controller.indexOfEditFormToShow = null;
    });
  };

    // DESTROY STORY (DELETE)

    this.deleteStory = function(story){
    $http({
      method: "DELETE",
      url: '/stories/' + story._id
    }).then(function(){
        controller.getStories();
    });
  };

    // SEE ALL STORIES (GET)

    this.getStories = function(){
      $http({
        method:'GET',
        url:'/stories'
      }).then(function(response){
        controller.stories = response.data;
      }, function(error){
        console.log(error);
      });
    };

    this.getStories();
}]);

// =====================================================================
//                        AUTHORIZATION CONTROLLER
// =====================================================================
// * ATTACHED TO: <header> tag
// * Contains the functionality for logging in/logging out/signing up
app.controller('AuthController', ['$http', '$rootScope', function($http, $rootScope){

  // ==============
  // INITIAL VALUES
  // ==============
  const controller = this;
  this.username = null;
  this.password = null;
  this.newUsername = null;
  this.newPassword = null;

  // ==============
  // RESTFUL ROUTES
  // ==============

  // CREATE NEW USER (POST)

  // CREATE NEW SESSION (POST)

  // DESTROY SESSION (DELETE)

  // GET SESSION


}]);
