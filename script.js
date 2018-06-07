var app=angular.module('myApp',['ui.router']);
let fs = require('fs')
let filename = 'books'
let sno = 0

app.config(['$stateProvider',function($stateProvider){

    $stateProvider
    .state('addBook',{
      url:'/add-book',
      templateUrl:'add-book.html',
      controller:'addCtrl'
    })
    .state('listBooks',{
        url:'/list-books',
        templateUrl:'list-books.html',
        controller:'listCtrl'
      });
    
  }]);

  app.controller('addCtrl',function($scope){

    $scope.AddBook=function(){

        fs.appendFile(filename, $scope.Name + ',' + $scope.Author +',' + $scope.Price + '\n')

    }

  });

  app.controller('listCtrl',function($scope){

    if(fs.existsSync(filename)) {
         let data = fs.readFileSync(filename, 'utf8').split('\n')

         data.forEach((book, index) => {
            let [ name, author,price ] = book.split(',')

            $scope.list=AddEntry(name,author,price);
            
            var myEl = angular.element( document.querySelector( '#table' ) );
            myEl.append($scope.list); 
            
         })
     } 

  });

  function AddEntry(name,author,price) {
    if(name && author && price) {
       sno++
       let updateString = '<tr><td>'+sno + '</td><td>'+ name +'</td><td>' 
          + author +'</td><td>'+price+'</td></tr>';
        return updateString
    }
 }
 