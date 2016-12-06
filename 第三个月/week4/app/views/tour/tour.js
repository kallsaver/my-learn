/**
 * Created by hxsd on 2016/10/27.
 */
    myapp.controller("tourCtrl",function($scope,$ionicSlideBoxDelegate){
        $scope.config={enter:false}

        $scope.slideChanged=function(){
            var currentIndex=$ionicSlideBoxDelegate.currentIndex()
            var slidesCount=$ionicSlideBoxDelegate.slidesCount()

            if(currentIndex==slidesCount){
                $scope.config.enter=true;
            }
            else{
                $scope.config.enter=false;
            }
        }

    })