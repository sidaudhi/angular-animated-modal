/**
 * @license angular-circular-timepicker  version: 0.1.0
 * Copyright 2016 sidaudhigithub.io, Inc. http://sidaudhi.github.io
 * License: MIT
 *
 * @author        Siddharth Audhinarayanan
 * @since         2016-Mar-26
 */

 var app = angular.module('angular.animated.modal',[]);
 app.service('$animatedModal',['$compile','$rootScope','$document',function($compile,$rootScope,$document){
   var $scope = $rootScope.$new();
   return {
     open: function(modalParams){
       $scope.data = modalParams.data;
       $scope.close = function(){
         angular.element(document.getElementById('modal-container')).removeClass('visible');
         setTimeout(function(){
           angular.element(document.getElementById('modal-container')).remove();
           var bodyStyles = {'height':'auto','overflow':'auto'};
           angular.element(document).find('html').css(bodyStyles);
           angular.element(document).find('body').css(bodyStyles);
         },500)
       }
       var html = '<div id="modal-container" class="'+modalParams.theme+'">'
                +     '<a class="anim-modal-close" ng-click="close()">&#x2716;</a>'
                +     '<div id="modal-container-wrapper" class="anim-modal-wrapper">'
                +       document.getElementById(modalParams.templateUrl).innerHTML
                +     '</div>'
                + '</div>';
       var compiledHtml = $compile(html)($scope);
       angular.element(document).find('body').append(compiledHtml);
       angular.element(document.getElementById('modal-container')).css({'transform-origin':''+modalParams.coords[0]+'px '+modalParams.coords[1]+'px'});
       setTimeout(function(){
         angular.element(document.getElementById('modal-container')).addClass('visible');
         var modalHeight = document.getElementById('modal-container-wrapper').offsetHeight+80;
         var documentHeight = (window.innerHeight);
         var heightRequired;
         if(modalHeight > documentHeight){
           heightRequired = modalHeight +'px';
         }else{
           heightRequired = documentHeight + 'px';
         }
         angular.element(document.getElementById('modal-container')).css({'height':heightRequired});
         var bodyStyles = {'height':heightRequired,'overflow':'hidden'};
         var htmlStyles = {'height':heightRequired,'overflow':'auto'};
         angular.element(document).find('html').css(htmlStyles);
         angular.element(document).find('body').css(bodyStyles);
         if(modalHeight > documentHeight){
           angular.element(document.getElementById('modal-container-wrapper')).addClass('larger-than-window');
         }
       },300)
     },
     close: $scope.close
   }
 }]);
