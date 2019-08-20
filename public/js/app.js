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
app.controller('Controller', ['$http', '$rootScope', function($http, $rootScope){

    // ==============
    // INITIAL VALUES
    // ==============
    const controller = this;
    this.indexOfEditFormToShow = 0;

    // ===============
    // RESTFUL ROUTES
    // ===============

    // CREATE NEW STORY (POST)

  this.createStory = function(){
    if (!$rootScope.currentUser){
      alert("You need to sign in to do that.");
    } else if (controller.text.length > 200){
      alert("Brevity is the soul of wit. Please limit your submission to less than 200 characters.")
    } else {
      $http({
        method:'POST',
        url:'/stories',
        data:{
          text: this.text,
          author: $rootScope.currentUser.username,
          date: this.date,
          chapter: this.chapter
        }
      }).then(function(response){
          controller.text = null;
          controller.stories.push(response.data);
          controller.allStories.push(response.data);
          controller.currentStoryIndex = controller.stories.length - 2;
      });
    }
  };

    // EDIT STORY (POST)

  this.editStory = function(story){
    if (!$rootScope.currentUser){
      alert("You need to sign in to do that.")
    } else if ($rootScope.currentUser.username !== story.author){
      alert("You do not have permission to edit this story.");
    } else if (controller.updatedText.length > 200){
      alert("Brevity is the soul of wit. Please limit your submission to less than 200 characters.");
    } else {
      $http({
        method:"PUT",
        url: '/stories/' + story._id,
        data: {
          text: this.updatedText
        }
      }).then(function(response){
        controller.indexOfEditFormToShow = null;
        controller.updatedText = null;

        let indexOfUpdatedStory = controller.stories.findIndex(eachStory => eachStory._id === story._id);
        controller.stories.splice(indexOfUpdatedStory, 1, response.data);

        indexOfUpdatedStory = controller.allStories.findIndex(eachStory => eachStory._id === story._id);
        controller.allStories.splice(indexOfUpdatedStory, 1, response.data);

      });
    }
  };

    // DESTROY STORY (DELETE)
    // See Unit 3 w08d02 angular_delete.md for the solution to this

    this.deleteStory = function(story){
      if (!$rootScope.currentUser){
        alert("You need to sign in to do that.")
      } else if ($rootScope.currentUser.username !== story.author){
        alert("You do not have permission to remove this story.")
      } else {
        $http({
          method: "DELETE",
          url: '/stories/' + story._id
        }).then(function(response){
            controller.currentStoryIndex -= 1;

            let indexOfDeletedStory = controller.stories.findIndex(eachStory => eachStory._id === story._id);
            controller.stories.splice(indexOfDeletedStory, 1);

            indexOfDeletedStory = controller.allStories.findIndex(eachStory => eachStory._id === story._id);
            controller.allStories.splice(indexOfDeletedStory, 1)

            controller.indexOfEditFormToShow = null;
        });
      }
  };

    // SEE ALL STORIES (GET)

    this.getStories = function(){
      $http({
        method:'GET',
        url:'/stories'
      }).then(function(response){
        // Stores ALL stories in an array for later
        controller.allStories = response.data;

        // Sets a random chapter to start with, then stores all chapters
        controller.changeChapter(response.data[0].chapter)
        controller.getChapters();

      }, function(error){
        console.log(error);
      });
    };

    // =================
    // CHAPTER "ROUTES"
    // =================

    // CREATE NEW CHAPTER
    this.createChapter = function(newChapter){
      if (!newChapter || newChapter.length <= 0){
        alert("Please insert a title.")
      } else if (!$rootScope.currentUser)  {
        alert("You need to log in to do that.")
      } else {
        controller.chapter = newChapter;
        controller.chapters.push(newChapter);
        controller.stories = [];
      }
    };

    // EDIT CHAPTER
    this.editChapter = function(chapter){
      if (!controller.updatedChapter || controller.updatedChapter.length <= 0){
        alert("Please insert a title.")
      } else {
        $http({
          method: 'PUT',
          url: '/stories/chapter/' + chapter,
          data: {chapter: controller.updatedChapter}
        }).then(function(response){
          controller.getStories();
          controller.indexOfChapEditToShow = null;
        })
      }
    };

    // DELETE CHAPTER
    this.deleteChapter = function(chapter){
      $http({
        method: 'DELETE',
        url: '/stories/chapter/' + chapter
      }).then(function(response){
        controller.getStories();
      })
    };

    // STORE ALL CHAPTERS (for the chapter select screen)
    this.getChapters = function(){
      let chapterArray = [];
      for (let story of controller.allStories){
        if (!chapterArray.includes(story.chapter)){
          chapterArray.push(story.chapter)
        }
      }
      controller.chapters = chapterArray;
    };

    // GET ONE CHAPTER
    this.changeChapter = function(chapter){

      // Sets the chapter and gets related stories
      controller.chapter = chapter;
      controller.stories = [];
      for (let story of controller.allStories){
        if (story.chapter === chapter){
          controller.stories.push(story)
        }
      }

      // Sorts the stories
      controller.stories.sort((a, b) => {
        if (a.date < b.date){return -1}
        if (a.date > b.date){return 1}
        else{return 0}
      })

      // Starts us off at the first page
      controller.currentStoryIndex = 0;
    };

    // ======================
    //      ON PAGE LOAD
    // ======================
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
  this.showLogin = false;
  this.showSignup = false;
  this.showChapters = false;
  this.showEditChapter = false;
  this.username = null;
  this.password = null;
  this.newUsername = null;
  this.newPassword = null;

  // ==============
  // RESTFUL ROUTES
  // ==============

  // CREATE NEW USER (POST)
  this.signup = function(){
    $http({
      method: "POST",
      url: "/contributors",
      data: {
        username: this.newUsername,
        password: this.newPassword
      }
    }).then(function(response){
      controller.newUsername = null;
      controller.newPassword = null;
      controller.startSession();
    }, function(error){
      alert("ERROR: You probably need to pick another username. Please try again.")
    })
  };

  // CREATE NEW SESSION (POST)
  this.login = function(){
    $http({
      method: "POST",
      url: "/sessions",
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      controller.username = null;
      controller.password = null;
      controller.startSession();
    }, function(error){
      alert("ERROR: Either that username doesn't exist or your password was incorrect. Please try again.")
    })
  };

  // DESTROY SESSION (DELETE)
  this.logout = function(){
    $http({
      method: "DELETE",
      url: "/sessions"
    }).then(function(response){
      $rootScope.currentUser = null;
    }, function(error){
      alert("ERROR: Something must have gone wrong on our end. Refresh the page and try again.")
    })
  };

  // GET SESSION
  this.startSession = function(){
    $http({
      method: "GET",
      url: "/app"
    }).then(function(response){
      $rootScope.currentUser = response.data;
      controller.showLogin = false;
      controller.showSignup = false;
    }, function(error){
      alert("ERROR: Something went wrong. Either try a new username or refresh the page.")
    })
  };

  // =====================
  // APP-SPECIFIC METHODS
  // =====================

  this.toggleModal = function(modal){
    switch (modal){
      case "signup":
        controller.showSignup = !controller.showSignup;
        controller.showLogin = false;
        break;
      case "login":
        controller.showLogin = !controller.showLogin;
        controller.showSignup = false;
        break;
      case "chapters":
        controller.showChapters = !controller.showChapters;
        break;
      default:
        break;
    }
  };

}]);
