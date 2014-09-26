angular.module('starter.controllers', ['toaster'])
  .factory('socket', function ($rootScope) {
    var socket = io.connect('desolate-chamber-7892.herokuapp.com:80');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    }
  })

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location,$window,toaster, socket, $rootScope) {


    socket.on('sendchatclient',function(msg){
      toaster.pop('info', msg.user, msg.message);
      $rootScope.messages.push({
        userId: '54321',
        text: msg.message,
        user:msg.user
      });


    });



  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    $scope.goToPres = function(value,url){

      if(value==1){
        $window.location.href = 'viewerjs/index.html'+url;

      }else{
        $location.path('/app/presentationsecond');
      }

    }

})

.directive('input', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        'returnClose': '=',
        'onReturn': '&',
        'onFocus': '&',
        'onBlur': '&'
      },
      link: function(scope, element, attr) {
        element.bind('focus', function(e) {
          if (scope.onFocus) {
            $timeout(function() {
              scope.onFocus();
            });
          }
        });
        element.bind('blur', function(e) {
          if (scope.onBlur) {
            $timeout(function() {
              scope.onBlur();
            });
          }
        });
        element.bind('keydown', function(e) {
          if (e.which == 13) {
            if (scope.returnClose) element[0].blur();
            if (scope.onReturn) {
              $timeout(function() {
                scope.onReturn();
              });
            }
          }
        });
      }
    }
  })


  .controller('Messages', function($scope, $timeout, $ionicScrollDelegate, socket, $rootScope) {

    var alternate,
      isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    var user = localStorage.getItem("chatname");
    if(!user){
      socket.emit('adduser', prompt("¿Cuál es tu nombre?"));
    }else{
      socket.emit('adduser', localStorage.getItem("chatname"));
    }

    socket.on('storename', function (username) {
      localStorage.setItem("chatname",username);
    });



    $scope.sendMessage = function() {
      alternate = !alternate;
      console.log($scope.data.message);
      $rootScope.messages.push({
        userId: '12345',
        text: $scope.data.message,
        user:'Me'
      });
      socket.emit('sendchat',$scope.data.message);
      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom(true);




    }

    $scope.inputUp = function() {
      $scope.data.keyboardHeight = 216;
      $timeout(function() {
        $ionicScrollDelegate.scrollBottom(false);
      }, 300);

    }
    $scope.inputDown = function() {

      $scope.data.keyboardHeight = 0;
      $ionicScrollDelegate.resize();
    }

    $scope.data = {};
    $scope.myId = '12345';


  });