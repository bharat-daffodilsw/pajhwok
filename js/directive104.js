pajhwokApp.directive('category', ["$compile", function ($compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<div class='categories'>" +
            "<ul ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid}' ng-click='setCategory(cat);loadingMessage=true'>{{cat.en_title}}</span></li></ul>" +
            "<ul ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer'ng-class='{selected_category: cat._id == selectedCategoryid}'  ng-click='setCategory(cat);;loadingMessage=true'>{{cat.dr_title}}</span></li></ul>" +
            "<ul ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid}' ng-click='setCategory(cat);loadingMessage=true'>{{cat.ps_title}}</span></li></ul></div>",
        compile: function () {
            return{
                pre: function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive("manageFlagedNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div ng-switch="flaggedNewsVisible"><alert-popup ng-show="bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record">No Record Found</p><div ng-switch-when="true" ><div   ng-repeat="media in flaggedNews" class="approve-video-1">' +
            "<a href='#/news/{{media._id}}'>" +
            '<div class="only-video">' +
            '<span class="recent-video-thumb">' +
            '<img ng-src="{{media.imgurl}}"></span>' +
            '</span>' +
            '</div>' +
            "</a>" +
            '<div class="recent-lockup-content">' +
            '<h3 class="recent-lockup-title">' +
            '<a class="" a="">' +
            '<p class="popular-small-heading">{{media.title}}</p>' +
            '</a>' +
            '</h3>' +
            '<div class="approve-video-meta">' +
            '<p class="small-meta-info">' +
            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
            '<a class="user-name ng-binding" >{{media["__createdby"]["firstname"]}}</a></span>' +
            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>' +
            '</p>' +
            '<p class="approve-btn">' +
            '<span>' +
            '<button class="video-approve-btn" ng-click="deleteFlaged(media._id,$index)">Delete</button>' +
            '<span class="deemphasized-text ng-binding">{{media["flaggedcount"]}}</span>' +

            '</p>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '<div id="scrollDiv"></div>' +
            '</div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.getFlaggedNews();

                },
                post: function ($scope) {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getMoreFlaggedMedia($scope.cursor);
                            }
                        }
                    });

                    $scope.deleteFlaged = function (mediaid, index) {
                        $scope.flaggedNews.splice([index], 1);
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray = [
                            {"_id": mediaid, "status": "decline"}
                        ];
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {

                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                $scope.alertPopupMsg = "Story delted.";
                                $scope.bShowAlertPopup = true;
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                                $scope.alertPopupMsg = "Inserted.";
                                $scope.bShowAlertPopup = true;
                            }
                            else
                                $scope.alertPopupMsg = "User save fail.";
                            $scope.bShowAlertPopup = true;
                        });

                    }

                    $scope.reject = function () {

                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive('topHeader', [function ($compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="top-header"><alert-popup ng-show="bShowAlertPopup"></alert-popup><span class="language-selector">' +
            '<button ng-repeat="button in uploadSelectedLanguage"  ng-class="{active_language: button._id == selectedTrans}" class="language" ng-click="setLanguage(button._id);changePath()" type="button" role="button">' +
            '{{button.en_name}}</button><span  ng-show="loading.loadingNews" style="color: red">Loading...</span></span><span class="search-news"><form class="search-box" ng-submit="searchData()" >' +
            '<span class="search-span"><input id="searchtextbox" ng-model="searchContent" class="placeholder" placeholder="search for news.." type="text"></span>' +
            '<span class="search-btn-span"><button type="submit" class="search-btn-cover"><img  class="search-btn" src="images/search.png"></button></span>' +
            '</form></span><span class="login"><div class="panel"><div class="user-account"><div ng-show="currentUser" class="welcome"><p> Welcome {{currentUser["firstname"]}}</p><button ng-click="logOut()" class="signout">{{userSelectedLanguage["data"]["signout"]}}</button>' +
            '</div><div  ng-hide="currentUser" class="panel-btn"><a ng-click="showRegister()" id="join_pop">{{userSelectedLanguage["data"]["register"]}}</a>' +
            '<a ng-click="showLoginPopup()" id="login_pop">{{userSelectedLanguage["data"]["login"]}}</a></div></div></div></span></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.searchData = function () {
                        if ($scope.searchContent) {
                            var path = window.location.hash;
                            var condition = path.indexOf('#/map') >= 0 ? true : false;
                            if (condition) {
                                window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + $scope.searchContent;
                            }
                            else {
                                window.location.href = "#/search?q=" + $scope.searchContent;
                            }
                        } else {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Enter search text first";
                        }

                    }
                    $scope.showRegister = function () {
                        $scope.userRegister = true;
                        $scope.userLogin = false;
                    }
                    $scope.showLoginPopup = function () {
                        $scope.userLogin = true;
                        $scope.userRegister = false;
                        $scope.username = "";
                        $scope.password = "";
                    }
                }
            }
        }


    }
}]);
pajhwokApp.directive('banner', [function ($compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<div class='banner'><img ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' src='images/eng.png'>" +
            "<img ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"'  src='images/pashto.png'>" +
            "<img ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"'  src='images/dari.png'></div>"

    }
}]);
pajhwokApp.directive('state', [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<span><select class='select-city' ng-options='o.name for o in states' ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' ng-change='setState()' ng-model='defaultSelected.selectedState'></select>" +
            "<select class='select-city' ng-options='o.dr_name for o in states' ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-change='setState()' ng-model='defaultSelected.selectedState'></select>" +
            "<select class='select-city' ng-options='o.ps_name for o in states' ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-change='setState()' ng-model='defaultSelected.selectedState'></select></span>"
    }
}]);
pajhwokApp.directive('cityUpload', [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<span><select class='select upload-city' ng-options='o.en_fullname for o in uploadCities' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans'ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.dr_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.ps_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-model='newPostCity'></select></span>"
    }
}]);
pajhwokApp.directive('categoryList', [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<span><select class='select' ng-options='o.en_title for o in category' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans' ng-model='newPost.category'></select>" +
            "<select class='select' ng-options='o.dr_title for o in category' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  ng-model='newPost.category'></select>" +
            "<select class='select' ng-options='o.ps_title for o in category' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  ng-model='newPost.category'></select></span>"

    }
}]);
pajhwokApp.directive('languageList', [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<span><select class='select' ng-change='setUploadLanguage(newPostTrans._id)' ng-options='o.en_name for o in uploadSelectedLanguage' ng-model='newPostTrans' ></select>" +
            "</span>"
    }
}]);
pajhwokApp.directive('manageOptions', ["$compile", function ($compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<ul class="sub-menu"><li ng-show="manage.user" class="manage-child"><a href="#/manageuser" >Manage Users</a></li>' +
            '<li class="manage-child"><a href="#/manageflaggednews">Manage Flag</a></li>' +
            '<li class="manage-child"><a href="#/manageunpublishnews">Publish Videos</a></li></ul>'

    }
}]);
pajhwokApp.directive('navBar', ["$compile", function ($compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<div class='nav'><span class='cities'><state></state></span>" +
            "<span class='left-nav'><ul class='menu'>" +
            "<li class='selected-nav nav-menu' ng-click='menuClick(\"home\")'><a class='menu-item selected-nav-anchor'   >{{userSelectedLanguage['data']['home']}}</a></li>" +
            "<li class='nav-menu'><a class='menu-item ' >{{userSelectedLanguage['data']['aboutus']}}</a></li>" +
            "<li class='nav-menu'><a class='menu-item ' >{{userSelectedLanguage['data']['contactus']}}</a></li>" +
            "<li ng-show='manage.opt' class='nav-menu'><a class='menu-item selected-nav-anchor'>Manage</a><manage-options></manage-options></li>" +
            "<li ng-show='manage.mymedia' class='nav-menu'><a class='menu-item' href='#/mymedia' ng-click ='uploadNews = false' >My Uploads</a></li></ul></span>" +
            "<span class='upload-content'><button class='upload' ng-click='clearContent();uploadNews = !uploadNews'>{{userSelectedLanguage['data']['upload']}}</button></span>" +
            "<span class='right-nav'><ul class='view-bar'><a href='#/tileview'><li class='map-view view'><img src='images/1.png '></li></a>" +
            "<li style='cursor: pointer' ng-click='setMapPath()' class='map-view view'><img src='images/3.png '></li></ul></span></div>",
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.menuClick = function (path) {
                        $scope.uploadNews = false;
                        window.location.href = '#/' + path;

                    }
                    $scope.setMapPath = function () {
                        window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;
                    }
                    $scope.getrole = function () {
                        var c_user = $scope.getSession();
                        if (c_user && c_user["roleid"] != GENERAL) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    $scope.getrolemanage = function () {
                        var c_user = $scope.getSession();
                        console.log(c_user)
                        if (c_user) {
                            return true;
                        }
                        else {
                            return false;
                        }

                    }
                }
            }
        }

    }
}]);
pajhwokApp.directive('newsUpload', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="upload-section"><alert-popup ng-show="bShowAlertPopup"></alert-popup><div class="upload-inner"><form>' +
            '<app-file-upload></app-file-upload><p class="upload-div"><language-list></language-list><city-upload></city-upload>' +
            '<category-list></category-list></p>' +
            '<p class="upload-div"><input class="upload-text" type="text" ng-model="title" placeholder="enter title here">' +
            '<textarea ng-model="newPost.description" class="upload-text" placeholder="write description here"></textarea>' +
            '<span ng-show="uploading">Uploading...<img src="images/loading.gif"></span></p>' +
            '<p class="cancel-upload"><button value="" class="upload-btn" ng-click="saveFile()">Upload</button>' +
            '<button value="" class="upload-btn" ng-click="clearContent();uploadNews=false">Cancel</button>' +
            '</p></form></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.title = "";

                    $scope.saveFile = function () {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please login first.";
                            return false;
                        }
                        if (document.getElementById('uploadfile').files.length === 0) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please select media first.";
                            return false;
                        }
                        if ($scope.title.length < 10) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter title first or at least 10 characters.";
                            return false;
                        }
                        if ($scope.newPostCity._id == null) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please select city first.";
                            return false;
                        }
                        if (!$scope.newPost.category) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "please select category first";
                            return false;
                        }
                        if (!$scope.newPostTrans) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please select language first.";
                            return false;
                        }
                        $scope.uploading = true;
                        var current_file = {};
                        current_file.name = $scope.oFile.name;
                        current_file.type = $scope.oFile.type;
                        current_file.contents = $scope.oFile.data;
                        current_file.ask = ASK;
                        current_file.osk = OSK;
                        $scope.loadingStatus = true;
                        $appService.getDataFromJQuery(BAAS_SERVER + '/file/upload', current_file, "POST", "JSON", function (data) {
                            if (data.response) {
                                var query = {};
                                query.table = "News__pajhwok";

                                if (currentSession["roleid"] != GENERAL) {
                                    $scope.newPost["status"] = "approved";
                                } else {
                                    $scope.newPost["status"] = "new";
                                }
                                var file_ext = $scope.getFileExtension(data.response[0].name);
                                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(data.response[0].name)) {
                                    $scope.newPost["image"] = data.response;
                                }
                                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(data.response[0].name)) {
                                    $scope.newPost["media"] = data.response;
                                }
                                $scope.newPost["title"] = $scope.title;
                                $scope.newPost["cityid"] = {"name": $scope.newPostCity.name, "_id": $scope.newPostCity._id};
                                $scope.newPost["location"] = $scope.newPostCity.location;
                                $scope.newPost["transid"] = {"_id": $scope.newPostTrans._id};

                                console.log(JSON.stringify($scope.newPost));
                                query.operations = [$scope.newPost];
                                $scope.uploading = true;
                                $appService.save(query, ASK, OSK, currentSession["usk"], function (callBackData) {
                                    $scope.uploading = false;
                                    $scope.bShowAlertPopup = true;
                                    if (callBackData.insert) {
                                        if ($scope.currentUser["roleid"] == GENERAL) {
                                            $scope.alertPopupMsg = "Please wait while your news is approved for publishing. You can check the same in My Uploads.";
                                        }
                                        else {
                                            $scope.alertPopupMsg = "Successfully uploaded.";
                                        }
                                        $scope.clearContent();

                                    }
                                    else {

                                    }
                                });
                            }
                            else {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Some error has been occurred.";
                                $scope.uploading = false;
                            }
                        }, function (callbackerror) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Some error has been occurred.";
                        });
                    };
                },
                post: function ($scope) {
                }
            }
        }


    }
}]);
pajhwokApp.directive('appFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict: "E",
        replace: true,
//        scope:true,
        template: "<div class='choose-file'><p>" +
            "<input type='file' id='uploadfile' style=' float: left;width: 206px;'>" +
            "<img id='img_thumbnail' ng-show='showimage' ng-src='{{imageData}}' class='thumbnail' style='float: left;height: 190px;width: 270px'>" +
            "<div ng-show='videoAudio' style='float: left;height: 190px;width: 270px'>" +
            "<div id='ova-jwplayer-container-upload'></div></div>" +
            "</p></div>",
        compile: function () {
            return {
                post: function ($scope, iElement) {
                    $scope.loadFile = function (evt) {
                        file = {};
                        file.name = $scope.oFile.name;
                        file.result = evt.target.result;
                        $scope.oFile['data'] = evt.target.result;
                        $scope.showUploadedFile(file);
                    };
                    $scope.showUploadedFile = function (file) {

                        var file_ext = $scope.getFileExtension(file.name);
                        if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(file.name)) {
                            $scope.showimage = true;
                            $scope.videoAudio = false;
                            $scope.imageData = file.result;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }
                        else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(file.name)) {
                            $scope.showimage = false;
                            $scope.videoAudio = true;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            document.getElementById('ova-jwplayer-container-upload').innerHTML = "";
                            jwplayer('ova-jwplayer-container-upload').setup({
                                file: file.result,
                                width: 270,
                                height: 190,
                                type: file_ext
                            });
                        }
                    }
                    iElement.bind('change', function () {
                        $scope.$apply(function () {
                            $scope.oFReader = new FileReader();
                            if (document.getElementById('uploadfile').files.length === 0) {
                                return;
                            }
                            $scope.oFile = document.getElementById('uploadfile').files[0];
                            $scope.oFReader.onload = $scope.loadFile;
                            $scope.oFReader.readAsDataURL($scope.oFile);
                        });
                    });
                }
            }
        }
    }
}]);
pajhwokApp.directive('topStoryMain', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div ng-switch='topNewsVisible'><div ng-switch-when='true' class='bigger'><div class='video-only'><span class='video-thumb'>" +
            "<img class='lazy' id='video-thumb' ng-show='displayType.image'  width='98%' height='310px' data-ng-src='{{displayType.imageFileUrl}}' src='images/loading18.gif'>" +
            "<div ng-show='displayType.videoAudio'><div id='ova-jwplayer-container'></div></div>" +
            "</span></div><div class='bigger-content'><div class='lockup-content'>" +
            "<h3 class='lockup-title'><a href='#/news/{{topNews._id}}'<p class='big-heading'>{{topNews.title}}</p></a></h3>" +
            "<p class='video-meta'><span class='meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a  class='user-name'>{{topNews['__createdby']['firstname']}}</a></span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' class='deemphasized-text ng-binding'>{{topNews['category']['en_title']}}</span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' class='deemphasized-text ng-binding'>{{topNews['category']['dr_title']}}</span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' class='deemphasized-text ng-binding'>{{topNews['category']['ps_title']}}</span><span class='deemphasized-text'>{{topNews['__createdon']}}</span></span></p>" +
            "<p  class='video-description'>{{topNews['description']}}</p></div>" +
            "<div class='comment-container'><span> <button class='new-comment'><img alt='new-comment' src='images/new-comment.png'></button>" +
            "</span><span class='larger-comments'><a id='larger-comments' >{{topNews['commentcount']}}&nbsp;{{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span><button class='more-comments'><img alt='more-comments' src='images/more-comments.png' id='more-comment-arrow'></button></span></div></div></div></div>"

    }
}]);
pajhwokApp.directive('appliedFilter', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div style='display: inline'><span>Applied Filter:</span>" +
            "<span ng-show='labelDetail.visibleCategoryFilter'>{{labelDetail.categoryName}}<span class='cursor-pointer' ng-click='setCategory(null);removeSelectedClass()'>&nbsp;&nbsp;X</span></span>" +
            "</div>"

    }
}]);
pajhwokApp.directive('footer', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div class="Footer"><div class="social-networks"><ul>' +
            '<li><a id="facebook" title=""></a></li>' +
            '<li><a id="linkedin" title=""></a></li>' +
            '<li><a id="twitter" title=""></a></li></ul></div><div class="copyright"><span>	Content Copyrights 2014 pajhwok.com </span>' +
            '</div></div>'
    }
}]);
pajhwokApp.directive('login', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div  ng-show="userLogin"><alert-popup ng-show="bShowAlertPopup"></alert-popup><a class="overlay" id="login_form"></a><div class="popup">' +
            '<h2>Welcome Guest!</h2> <form ng-submit="login()"><p><input ng-model="username"  type="email" id="login" placeholder="Enter your email"></p>' +
            '<p><input type="password" id="password" ng-model="password" placeholder="enter your password"></p><p>' +
            '<input  type="submit" value="Log In" class="log-in-only"></form><a ng-show="false" ng-click="showForgot=false"class="forgot-pass">Forgot Password</a>' +
            '</p><p ng-show="false"><input type="text" ng-model="forgetUserName" placeholder="Enter your user name">' +
            '<input ng-click="submit()" type="button" value="Submit" class="log-in-only"></p><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.username = "";
                    $scope.password = "";
                    $scope.forgetUserName = "";
                    $scope.closePopup = function () {
                        $scope.userRegister = false;
                        $scope.userLogin = false;
                        $scope.username = "";
                        $scope.password = "";
                    }

                }, post: function ($scope) {
                    $scope.login = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#login').val();
                        var pass = $('#password').val();
                        if (regEmail.test(email) == false) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter your username"
                            return false;

                        }
                        else {
                            $scope.username = email;
                        }
                        if (!pass) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter your password";
                            return false;
                        }
                        else {
                            $scope.password = pass;
                        }
                        var params = {};
                        params.username = $scope.username;
                        params.password = $scope.password;
                        params.ask = ASK;
                        params.osk = OSK;
                        $appService.getDataFromJQuery(BAAS_SERVER + "/login", params, "GET", "JSON", function (callBackData) {
                            $scope.loginUserData = callBackData.response;
                            if (callBackData.code==35 &&callBackData.status=="error") {
                                $scope.alertPopupMsg = "User not verified.";
                                $scope.bShowAlertPopup = true;
                                return false;
                            }

                            else if (callBackData.code==3 &&callBackData.status=="error") {
                                $scope.alertPopupMsg = "Username and password didn't match";
                                $scope.bShowAlertPopup = true;
                                return false;
                            }
                            if (callBackData.response && callBackData.response.status==false) {
                                $scope.alertPopupMsg = "Please wait until your account is not activated";
                                $scope.bShowAlertPopup = true;
                                return false;

                            }

                            else {

                                var usk = $scope.loginUserData.usk;
                                if (usk) {
                                    var query = {"table": "Profile__pajhwok"};
                                    query.columns = ["roleid", "userid"];
                                    query.filter = {"userid": "{_CurrentUserId}"};
                                    var params = {"query": JSON.stringify(query), "ask": ASK, "osk": OSK, "usk": usk};
                                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                                        var roleid = callBackData.response.data[0].roleid._id;
                                        var cUserid = callBackData.response.data[0].userid._id;
                                        var firstname = $scope.loginUserData.firstname;
                                        var c_name = "usk";
                                        document.cookie = c_name + "=" + escape(usk);
                                        var c_name = "roleid";
                                        document.cookie = c_name + "=" + escape(roleid);
                                        var c_name = "firstname";
                                        document.cookie = c_name + "=" + escape(firstname);
                                        var c_name = "cuserid";
                                        document.cookie = c_name + "=" + escape(cUserid);
                                        $scope.currentUser = $scope.getSession();
                                        $scope.userLogin = false;
                                        $scope.username = "";
                                        $scope.password = "";
                                        if (!$scope.$$phase) {
                                            $scope.$apply();
                                        }
                                    }, function (err) {

                                    });
                                }
                            }
                            $scope.getSession();
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (jqxhr, error) {
                            if (jqxhr.status == 417) {
                                $scope.alertPopupMsg = "Username and password didn't match";
                                $scope.bShowAlertPopup = true;
                            }
                            else
                                alert(jqxhr.responseText);
                        });
                    }
                    $scope.submit = function () {
                        if ($scope.forgetUserName == "" || $scope.forgetUserName == undefined) {
                            alert("please enter user name first");
                            return false;
                        }
                        var params = {};
                        params.username = $scope.forgetUserName;
                        params.ask = ASK;
                        params.osk = OSK;
                        $appService.getDataFromJQuery(BAAS_SERVER + "/forgotpassword", params, "GET", "JSON", function (callBackData) {
                            $scope.bShowAlertPopup = true;

                        }, function (jqxhr, error) {
                            $scope.bShowAlertPopup = true;
                        });
                    }

                }

            }
        }
    }
}]);
pajhwokApp.directive('sideBar', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div class='small-videos'><ul id='small-videos'><li class='top-small-1' ng-repeat='record in topStoriesDetail' ng-click='setTopNews(record);updateViewCount(record)' >" +
            "<div class='small-video-only'><span class='video-thumb'><img id='small-img' alt='Thumbnail' ng-src='{{record.imgurl}}'></span></div>" +
            "<div class='small-lockup-content'><h3 class='small-lockup-title'><p class='small-heading' >{{record.title}}</p></h3>" +
            "<div class='small-video-meta'><p class='small-meta-info'><span  class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}<a class='user-name'>&nbsp;{{record['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{record['__createdon']}}</span><p class='small-comment'>" +
            "<span class='small-comments-1' ><a class='video-comments' >{{record['commentcount']}}&nbsp;{{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{record['clickcount']}}&nbsp;{{userSelectedLanguage['data']['views']}}</span></p></p></div></div></li></ul></div>",
        compile: function () {
            return{
                pre: function () {

                },
                post: function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive('searchResult', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div ng-show='searchView' class='most-popular' ng-switch='searchedNewsVisible'><div  class='heading'><p ng-show='loadingMessage'>Loading...</p>" +
            "<applied-filter></applied-filter></div><p ng-switch-when='false' class='no-record'>No Record Found</p><div ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='search in searchedNews ' class='popular-video-1'><a ng-click='setCountAndPath(search)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></h3></a>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{search['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div>",
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news/' + data._id;
                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive('customSearch', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div class='most-popular' ng-switch='customSearchDataVisible'><p ng-switch-when='false' class='no-record'>No Record Found</p>" +
            "<div ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='search in customSearchData' class='popular-video-1'><a ng-click='setCountAndPath(search)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></a></h3>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{search['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div></div>",
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news/' + data._id;
                    }
                }
            }
        }

    }

}]);
pajhwokApp.directive('mostPopular', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div class='most-popular' ng-switch='mostPopularVisible'><div class='heading'>{{userSelectedLanguage['data']['mostpopular']}}</div>" +
            "<p ng-switch-when='false' class='no-record' >No Record Found</p><div  ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='mostpopular in mostPopularStoriesDetail ' class='popular-video-1'><a ng-click='setCountAndPath(mostpopular)'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{mostpopular.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p  class='popular-small-heading cursor-pointer''>{{mostpopular.title}}</p></h3></a>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{mostpopular['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{mostpopular['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{mostpopular['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{mostpopular['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>",
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news/' + data._id;
                    }
                }
            }
        }


    }

}]);
pajhwokApp.directive('recentStory', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div class='recently-uploaded' ng-switch='recentStoryVisible'><div  class='heading'>{{userSelectedLanguage['data']['recentlyuploaded']}}</div><p ng-switch-when='false' class='no-record'> No Record Found</p><div ng-switch-when='true' class='recent-videos'>" +
            "<div ng-repeat='recentstory in recentStoriesDetail' class='recent-video-1'><a ng-click='setCountAndPath(recentstory)'><div class='only-video'><span class='recent-video-thumb'><img ng-src='{{recentstory.imgurl}}'></span></div>" +
            "<div class='recent-lockup-content'><h3 class='recent-lockup-title'><p class='popular-small-heading'>{{recentstory.title}}</p></h3></a>" +
            "<div class='recent-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{recentstory['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{recentstory['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{recentstory['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{recentstory['clickcount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>",
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news/' + data._id;
                    }
                }
            }
        }

    }

}]);
pajhwokApp.directive('similarCategory', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div ng-switch="similarCategoryVisible"><div ng-switch-when="true" class="multiple-videos" ><div class="multiple-video-1" ng-repeat="simCat in similarCategory"><div class="only-video">' +
            '<a ng-click="setCountAndPath(simCat)"><span class="multiple-video-thumb"><img ng-src="{{simCat.imgurl}}"></span></a></div><div class="popular-lockup-content"><h3 class="popular-lockup-title"><a href="#/news/{{simCat._id}}" ><p class="popular-small-heading">' +
            '{{simCat.title}}</p></a></h3><div class="popular-video-meta"><p class="small-meta-info"><span class="deemphasized-text-name1">{{userSelectedLanguage["data"]["by"]}}' +
            '<a class="user-name ng-binding" >{{simCat["__createdby"]["firstname"]}}</a></span><span class="deemphasized-text ng-binding">{{simCat["__createdon"]}}</span></p>' +
            '<p class="small-comment"><span><a class="video-comments" >{{simCat["commentcount"]}}{{userSelectedLanguage["data"]["comments"]}}</a></span><span class="video-views">{{simCat["clickcount"]}}' +
            '{{userSelectedLanguage["data"]["views"]}}</span></p></div></div></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.setCountAndPath = function (data) {

                        window.location.href = '#/news/' + data._id;
                    }
                }
            }
        }
    }
}]);

//work by dhirender

pajhwokApp.directive('alertPopup', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div class="popup-manage">' +
            '<h2 class="h2-popup">Attention</h2>' +
            '<form method="">' +
            '<p class="alert-p">' +
            '{{alertPopupMsg}}' +
            '</p>' +
            '<p class="role-change">' +
            '<input type="button" value="OK" class="alert-ok" ng-click="cancelAlertPopup()">' +
            '</p>' +
            '</form>' +
            '<a class="close" ng-click="cancelAlertPopup()">X</a>' +
            '</div>',
        compile: function () {
            return{
                pre: function ($scope) {

                },
                post: function ($scope) {
                    $scope.cancelAlertPopup = function () {
                        $scope.bShowAlertPopup = false;
                        $scope.alertPopupMsg = "";
                    }
                }
            }
        }
    }
}]);

pajhwokApp.directive('userArticle', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div ng-switch="newsVisible"><alert-popup ng-show="bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record">No Record Found</p><div ng-switch-when="true" class="single-video-wrapper"><div class="single-video"><span class="single-video-thumb">' +
            '<img id="video-thumb-img" ng-show="displayType.image"  width="778px" height="500px" ng-src="{{displayType.imageFileUrl}}">' +
            '<div ng-show="displayType.videoAudio"><div id="ova-jwplayer-container"></div></div></span></div>' +

            '<div class="single-video-content">' +
            '<div class="single-lockup-content">' +
            '<h3 class="lockup-title">' +
            '<a class="" a="" href="#">' +
            '<p class="single-heading">{{news[0].title}}</p>' +
            '</a>' +
            '<p ng-show="news[0].status==\'new\'">' +
            '<span style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'publish\')">Accept</span>' +
            ' <span  style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'rejected\')">Reject</span> </p>' +
            '</h3>' +
            '<p class="single-meta"><span class="meta-info">' +
            '<span class="deemphasized-text-name-1">{{userSelectedLanguage["data"]["by"]}}&nbsp;<a href="#" class="user-name">' +
            '{{topNews["__createdby"]["firstname"]}}</a></span>' +
            '<span class="video-likes-dislikes"><img src="images/Icon_Like.png" alt="Like" width="20px" height="20px">' +
            '<span class="likes-count">{{news[0].likecount}}</span>&nbsp;&nbsp;&nbsp;' +
            '</span>' +
            '</span></p>' +
            '</div>' +
            '<div class="sentiment-actions">' +
            '<div class="watch-action-btn">' +
            '<span class="like-dislike">' +
            '<button  ng-show="news[0].likestatus" class="like-btn" title="I like this"  ng-click="updateLikeCount(news[0],false)">' +
            '<span class=""><img src="images/like-blue.png"></span></button>' +
            '<button ng-hide="news[0].likestatus" class="like-btn" title="I like this"  ng-click="updateLikeCount(news[0],true)">' +
            '<span class=""><img src="images/Icon_Like.png"></span></button></span>' +
            '</div>' +
            '<div class="flag"><button  ng-show="boolflag" class="flag-btn" title="unflag" ng-click="updateFlagCount(news[0],true)"><img src="images/flag-blue.png" width="30px" height="30px"></button>' +
            '<button  ng-hide="boolflag"  class="flag-btn" title="flag" ng-click="updateFlagCount(news[0],false)"><img src="images/flag.jpg" width="30px" height="30px"></button></div>' +
            '</div><div class="more-description"><h5>Published {{news[0]["__createdon"]}}</h5><div id="description" class="brief-content">' +
            '<p class="video-description">{{news[0]["description"]}}</p></div></div>' +
            '<div class="show-more-less"><div class="show-more-btn">' +
            '</div></div>' +
            '<div class="comment-container"><p class="comment-label"><label>Post your comment</label></p><div class="comment-box"><textarea id="commentBox"ng-model="commentContent" class="comment-textarea"></textarea></div>' +
            '<div class="comment-user-name"><button class="post-comment" ng-click="postComment()">Post Comment</button></div><h4>ALL COMMENTS <span>({{news[0].commentcount}})</span></h4></div>' +
            '<div class="commenter-info" ng-repeat="cmnt in news[0].comment " ><span class="commenter-name">{{cmnt.__createdby.firstname}}</span><span class="comment-time">{{cmnt.__createdon}}</span>' +
            '<div class="comment-data">{{cmnt.content}}</div></div><div class="show-more-btn"><button  class="show-more"><span >Show More</span></button></div>' +
            '</div></div><similar-category></similar-category></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.commentContent = "";
                    $scope.getshowmorepost = function () {
                        {
                            $scope.newsdescription = !$scope.newsdescription;
                        }
                    }

                    $scope.showHide = function () {
                        $('#description').slideToggle();
                    }
                    $scope.updateStatus = function (mediaid, result) {
                        var query = {};
                        query.table = "News__pajhwok";
                        if (result == "publish") {
                            var columnArray = [
                                {"_id": mediaid, "status": "approved"}
                            ];
                        }
                        if (result == "rejected") {
                            var columnArray = [
                                {"_id": mediaid, "status": "decline"}
                            ];
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            $scope.news[0].published = true;
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Successfully updated.";
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Successfully inserted.";
                            }
                            else {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "User save failed.";
                            }
                        }, function (err) {
                        });

                    }
                    $scope.updateFlagCount = function (record, flag) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please login first.";
                            return false;
                        }
                        var query = {};
                        query.table = "News__pajhwok";
                        var columnArray
                        if (flag) {
                            columnArray = [
                                {"_id": record._id, "$inc": {"activitycount": -5}, "flaggedby": [
                                    {"_id": currentSession["cuserid"], "__type__": "delete"}
                                ]}
                            ];
                            $scope.boolflag = false;
//                            $('#likeflag').css({"display":"none"});
//                            $('#unlikeflag').css({"display":"inline-block"});
                        }
                        else {
                            columnArray = [
                                {"_id": record._id, "$inc": {"activitycount": 5}, "flaggedby": [
                                    {"_id": currentSession["cuserid"]}
                                ]}
                            ];
                            $scope.boolflag = true;
//                            $('#likeflag').css({"display":"inline-block"});
//                            $('#unlikeflag').css({"display":"none"});
                        }
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                if (record != undefined) {
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {

                            }
                            else {

                            }
                        }, function (err) {
                        });
                    }
                },
                post: function ($scope) {

                    $scope.updateLikeCount = function (post, like) {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please login first.";
                        }
                        else {
                            var query = {};
                            if (like) {
                                query.operations = [
                                    {"_id": post._id, "$inc": {"likecount": 1, "activitycount": 1.5}, "likeby": [
                                        {"_id": currentSession["cuserid"]}
                                    ]}
                                ];

                                $scope.news[0].likestatus = true;
                                post.likecount = post.likecount + 1;
                            }
                            else {
                                query.operations = [
                                    {"_id": post._id, "$inc": {"likecount": -1, "activitycount": -1.5}, "likeby": [
                                        {"_id": currentSession["cuserid"], "__type__": "delete"}
                                    ]}
                                ];
                                $scope.news[0].likestatus = false;
                                post.likecount = post.likecount - 1;
                            }
                            query.table = "News__pajhwok";
                            $appService.save(query, ASK, OSK, currentSession['usk'], function (data) {
                                /*for like*/
                            });
                        }
                    }
                    $scope.postComment = function () {
                        var content = $('#commentBox').val();
                        $scope.commentContent = content;
                        if (!$scope.commentContent == null || !$scope.commentContent == "") {
                            var cuurentSession = $scope.getSession();
                            if (!cuurentSession) {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Please login first."
                                return false;
                            }
                            var query = {};
                            query.table = "News__pajhwok";
                            $scope.uploading = true;
                            $scope.newComment = {"_id": $scope.news[0]._id, "$inc": {"commentcount": 1, "activitycount": 1}};
                            $scope.newComment['comment'] = [
                                {"content": $scope.commentContent}
                            ];
                            query.operations = [$scope.newComment];
                            $appService.save(query, ASK, OSK, cuurentSession["usk"], function (callBackData) {
                                if (callBackData.response.update) {
                                    if (!$scope.news[0]['comment']) {
                                        $scope.news[0]['comment'] = [];
                                    }
                                    $scope.news[0]['comment'].push({"__createdby": {"firstname": cuurentSession["firstname"]}, "__createdon": " just now", "content": $scope.commentContent});
                                    $scope.news[0].commentcount++;
                                    $scope.commentContent = "";
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            });
                        }
                        else {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Comment box can't be blank."
                        }
                    }

                }
            }
        }
    }
}]);

pajhwokApp.directive("myMediaPicsData", [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<a href='#/news/{{media._id}}'>" +
            "<div class='only-video'>" +
            "<span class='popular-video-thumb'><img ng-src='{{media.imgurl}}'></span>" +
            "</div>" +
            "<div class='popular-lockup-content'>" +
            "<h3 class='popular-lockup-title'>" +
            "<p class='popular-small-heading'>{{media.title}}</p>" +
            "</h3>" +
            "</div>" +
            "</a>",

        compile: function ($scope) {
            return{
                pre: function ($scope) {

                },
                post: function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive("manageUnpublishNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div ng-switch="unpublishedNewsVisible">' +
            '<alert-popup ng-show="bShowAlertPopup"></alert-popup><p ng-switch-when="false" class="no-record"> No Record Found</p>' +
            '<div ng-switch-when="true" ><div  ng-repeat="media in unpublishedNews" class="approve-video-1">' +
            "<a href='#/news/{{media._id}}'>" +
            '<div class="only-video">' +
            '<span class="recent-video-thumb">' +
            '<img ng-src="{{media.imgurl}}"></span>' +
            '</div>' +
            "</a>" +
            '<div class="recent-lockup-content">' +
            '<h3 class="recent-lockup-title">' +
            '<a href="#/news/{{media._id}}">' +
            '<p class="popular-small-heading" ng-bind="media.title">{{media.title}}</p>' +
            '</a>' +
            '</h3>' +
            '<div class="approve-video-meta">' +
            '<p class="small-meta-info">' +
            '<span class="deemphasized-text-name">{{userSelectedLanguage["data"]["by"]}}&nbsp;' +
            '<span class="user-name ng-binding" >{{media["__createdby"]["firstname"]}}</span></span>' +
            '<span class="deemphasized-text ng-binding">{{media["__createdon"]}}</span>' +
            '</p>' +
            '<p class="approve-btn">' +
            '<button class="video-approve-btn" ng-click="updateStatus(media,\'publish\')" ng-hide="media.published || media.rejected">Approve</button>' +
//            '<label class="video-reject-hide-btn" ng-show="media.published || media.rejected">{{media.message}}</label>	 ' +
            '<button class="video-reject-btn" ng-click="updateStatus(media,\'reject\')" ng-hide="media.published || media.rejected">Reject</button>' +
            '</p>' +
            '<p>' +
            '<label class="video-reject-hide-btn" ng-show="media.published || media.rejected">{{media.message}}</label> ' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="scrollDiv"></div>' +
            '</div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.getUnpublishNews();


                },
                post: function ($scope) {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getMoreMedia($scope.cursor);
                            }
                        }
                    });
                    $scope.updateStatus = function (media, result) {
                        var query = {};
                        query.table = "News__pajhwok";
                        if (result == "publish") {
                            var columnArray = [
                                {"_id": media._id, "status": "approved"}

                            ];
                            media.published = true;
                            media["message"] = "Approved";
                        }
                        if (result == "reject") {
                            var columnArray = [
                                {"_id": media._id, "status": "decline"}
                            ];
                            media.rejected = true;
                            media["message"] = "Rejected";
                        }
                        query.operations = columnArray;

                        /*change for appstrap*/
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.response.update && dataUpdate.response.update.length > 0) {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Successfully updated.";
                            }
                            else if (dataUpdate.response.insert && dataUpdate.response.insert.length > 0) {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Successfully inserted.";
                            }
                            else {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "User save failed.";
                            }
                        });

                    }
                }
            }
        }
    }
}
]);
pajhwokApp.directive("myMedia", [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<div ng-switch='myAllMediaVisible'><alert-popup ng-show='bShowAlertPopup'></alert-popup><p ng-switch-when='false' class='no-record' class='no-record'> No Record Found</p><div ng-switch-when='true' class='most-popular'>" +
            "<div class='heading'>My Uploads</div>" +
            "<div class='popular-videos'>" +
            "<div ng-repeat='media in myAllMedia ' class='popular-video-1'>" +
            "<my-media-pics-data></my-media-pics-data>" +
            "<div class='popular-video-meta'>" +
            "<p class='small-meta-info'>" +
            "<span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;" +
            "<span class='user-name cursor-pointer' >{{media['__createdby']['firstname']}}</span>" +
            "</span>" +
            "<span class='deemphasized-text'>{{media['__createdon']}}</span>" +
            "</p>" +
            "<p class='small-comment'>" +
            "<span>" +
            "<a class='video-comments'>{{media['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a>" +
            "</span>" +
            "<span class='video-views'>{{media['clickcount']}} {{userSelectedLanguage['data']['views']}}</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div></div>",
        compile: function () {
            return{
                pre: function ($scope) {

                },
                post: function ($scope) {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getMoreMedia($scope.cursor);
                            }
                        }
                    });
                }
            }
        }
    }
}]);
pajhwokApp.directive("myUnpublishMedia", [function ($scope) {
    return {
        restrict: "E",
        replace: true,
        template: "<div ng-switch='myunpublishAllMediaVisible'><alert-popup ng-show='bShowAlertPopup'></alert-popup><p ng-switch-when='false' class='no-record' class='no-record'> No Record Found</p><div ng-switch-when='true' class='most-popular'>" +
            "<div class='heading'>My Uploads</div>" +
            "<div class='popular-videos'>" +
            "<div ng-repeat='media in myunpublishAllMedia ' class='popular-video-1'>" +
            "<my-media-pics-data></my-media-pics-data>" +
            "<div class='popular-video-meta'>" +
            "<p class='small-meta-info'>" +
            "<span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;" +
            "<span class='user-name cursor-pointer' >{{media['__createdby']['firstname']}}</span>" +
            "</span>" +
            "<span class='deemphasized-text'>{{media['__createdon']}}</span>" +
            "</p>" +
            "<p class='small-comment'>" +
            "<span>" +
            "<a class='video-comments'>{{media['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a>" +
            "</span>" +
            "<span class='video-views'>{{media['clickcount']}} {{userSelectedLanguage['data']['views']}}</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div></div>",
        compile: function () {
            return{
                pre: function ($scope) {

                },
                post: function ($scope) {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getMoreMedia($scope.cursor);
                            }
                        }
                    });
                }
            }
        }
    }
}]);
pajhwokApp.directive('register', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict: "E",
        replace: true,
        template: '<div ng-show=userRegister><alert-popup ng-show="bShowAlertPopup"></alert-popup><a  class="overlay" id="join_form"></a>' +
            '<div class="popup"><h2>Register</h2><form><p><input ng-model="newUser.emailid" type="email" id="email" placeholder="enter your email" required></p>' +
            '<p><input ng-model="newUser.firstname" type="text" id="firstname" placeholder="enter full name" required></p><p>' +
            '<input type="password" ng-model="newUser.password" id="pass" placeholder="enter your password" required></p><p>' +
            '<input type="password" ng-model="confirmPassword" id="confirmPass" placeholder="confirm password" required></p>' +
            '<p class="terms"><input ng-model="terms" type="checkbox"><span class="term">&nbsp;&nbsp;I agree to the <a >Terms of Service</a> and <a >Privacy Policy</a>' +
            '</span></p><p><span><input ng-click="saveUser()" type="button" value="Register" class="register"></span><span class="login-link" ng-click="userLogin=true;userRegister=false"><a  id="login_pop" class="log-in">Log In</a></span>' +
            '</p></form><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.newUser = {};
                    $scope.confirmPassword = "";
                    $scope.terms = true;
                    $scope.closePopup = function () {
                        $scope.userRegister = false;
                        $scope.userLogin = false;
                        $scope.newUser.firstname = "";
                        $scope.newUser.password = "";
                        $scope.confirmPassword = "";
                    }

                },
                post: function ($scope) {
                    $scope.saveUser = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#email').val();

                        if (regEmail.test(email) == false) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter a valid email.";
                            return false;
                        }
                        else {

                            $scope.newUser.emailid = email;
                        }
                        $scope.newUser.firstname = $('#firstname').val();
                        if ($scope.newUser.firstname == null || $scope.newUser.firstname == undefined || $scope.newUser.firstname == "") {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter your full name.";
                            return false;
                        }
                        $scope.newUser.password = $('#pass').val();
                        $scope.confirmPassword = $('#confirmPass').val();
                        if (!$scope.newUser.password || $scope.newUser.password != $scope.confirmPassword) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Password and confirm password not matched.";
                            return false;
                        }
                        if (!$scope.terms) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please agree on  term and condition first.";
                            return false;
                        }
                        $scope.newUser.username = $scope.newUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        query.operations = [
                            {"userid": $scope.newUser, "roleid": {"_id": EDITOR}, "emailid": $scope.newUser.emailid}
                        ];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.status==0 && callBackData.statusText=="error") {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "User already exists.";
                            }
                            else {
                                $scope.userRegister = false;
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Please check your emailid and verify.";
                                $scope.newUser = {};
                                $scope.confirmPassword = "";
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        });
                    }

                }
            }

        }

    }
}]);
pajhwokApp.directive("addUser", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="popup">' +
            '<h2>Add New User</h2>' +
            '<form method="">' +
            '<p>' +
            '<input type="text" id="adduseremail" placeholder="enter users email" ng-model="addUser.emailid">' +
            '</p>' +
            '<p>' +
            '<input type="text" id="adduserfirstname" placeholder="enter full name" ng-model="adduser.firstname">' +
            '</p>' +
            '<p>' +
            '<input type="password" id="adduserpass" placeholder="set password" ng-model="adduser.password">' +
            '</p>' +
            '<p>' +
            '<input type="password" id="adduserconfirmpass" placeholder="confirm password">' +
            '</p>' +
            '<p class="user-role">' +
            '<span><label>Select Role</label></span>' +
            '<span>' +
            '<select class="select-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole1" style="float: right;"></select>' +
            '</span>' +
            '</p>' +
            '<p>' +
            '<span><input type="button" value="Add User" class="register" ng-click="saveUser()"></span>' +
            '<span class="login-link" ng-click="closeAddUserPopup()">	<a id="login_pop" class="log-in">Cancel</a></span>' +
            '</p>' +
            '</form>' +
            '<a class="close" ng-click="closeAddUserPopup()">X</a>' +
            '</div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.closeAddUserPopup = function () {
                        $scope.manageUserDisplay.baddUser=false;
                    }
                    $scope.saveUser = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#adduseremail').val();
                        if (regEmail.test(email) == false) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please enter a valid email.";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;

                        }
                        else {
                            $scope.addUser.emailid = email;
                        }
                        $scope.addUser.firstname = $('#adduserfirstname').val();
                        if ($scope.addUser.firstname == "" || $scope.addUser.firstname == null || $scope.addUser.firstname == undefined) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Enter first name first";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        $scope.addUser.password = $('#adduserpass').val();
                        if ($scope.addUser.password == "" || $scope.addUser.password == null || $scope.addUser.password == undefined) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "password field can't be blank";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        var confirmPassword = $('#adduserconfirmpass').val();
                        if (!$scope.addUser.password || $scope.addUser.password != confirmPassword) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "password or confirm password did't match";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        if (!($scope.selectedRole1._id && $scope.selectedRole1.name)) {
                            $scope.bShowAlertPopup = true;
                            $scope.alertPopupMsg = "Please select role first";
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                            return false;
                        }
                        $scope.addUser.username = $scope.addUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        delete $scope.addUser["userid"];
                        delete $scope.addUser["roleid"];
                        $scope.addUser["status"] = true;
                        query.operations = [
                            {"userid": $scope.addUser, "roleid": $scope.selectedRole1, "emailid": $scope.addUser.emailid}
                        ];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {
                            if (callBackData.status==0 && callBackData.statusText=="error") {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "User already exist";

                            }
                            else {
                                $scope.userRegister = false;
                                $scope.addUser = {};
                                $scope.baddUser = false;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Please check your email for verification";
                            }

                        });
                    }
                }
            }
        }
    }
}]);
pajhwokApp.directive("changeUserStatus", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div class="popup-manage">' +
            '<h2 class="h2-popup">Change Role</h2>' +
            '<form method="">' +
            '<p>' +
            '<span class="describe-name">' +
            '<select class="change-role" ng-options="o.name for o in roleOptions" ng-model="selectedRole" style="float: right;"></select>' +
            '</span>' +
            '</p>' +
            '<p class="role-change">' +
            '<input type="button" value="Change" class="change-role-p" ng-click="saveManageUsers()">' +
            '</form>' +
            '<a class="close" ng-click="cancelChanges()">x</a>' +
            '</div>',
        compile: function () {
            return{
                pre: function ($scope) {
                    $scope.saveManageUsers = function () {
                        $scope.userData.roleid = $scope.selectedRole;
                        for (i = 0; i < $scope.userList.length; i++) {
                            if ($scope.userList[i].userid.username == $scope.userData.userid.username) {
                                $scope.userList[i].roleid = angular.copy($scope.userData.roleid);
                            }
                        }
                        var query = {};
                        query.table = "Profile__pajhwok";
                        var columnArray = $scope.userData;
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "Updated";
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }


                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
//
                                $scope.manageUserDisplay.bChangeRole = false;
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "inserted";
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            else {
                                $scope.bShowAlertPopup = true;
                                $scope.alertPopupMsg = "User save failed";
                            }
                        }, function (err) {
                            alert("An error has accurd");
                        });

                    }

                },
                post: function ($scope) {


                }
            }
        }
    }
}]);
pajhwokApp.directive("manageUser", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict: "E",
        replace: true,
        template: '<div><div ng-switch="visibleUserList"><p ng-switch-when="false" class="no-record" class="no-record"> No Record Found</p>' +
            '<div ng-switch-when="true"><add-user ng-show="manageUserDisplay.baddUser"></add-user>' +
            '<change-user-status ng-show="manageUserDisplay.bChangeRole"></change-user-status><alert-popup ng-show="bShowAlertPopup"></alert-popup>' +
            '<div class="manage-users-wrapper">' +
            '<div class="info-data-wrapper">' +
            '<div class="action-list">' +
            '<div class="add-delete-user">' +
            '<span class="change-role"><button class="user-btn" ng-click="fnAdduser()">Add New User</button></span>' +
            '</div>' +
            '</div><div class="user-title-bar">' +
            '<ul class="table-headings">' +
            '<li class="heading-element">' +
            '<span><label>Name</label></span>' +
            '<span><a class="upper-arrow">' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow">' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '<li class="mail-element">' +
            '<span>' +
            '<label>Email</label></span>' +
            '<span>' +
            '<a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow" >' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '<li class="heading-element">' +
            '<span><label>Role</label></span>' +
            '<span><a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow">' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '<li class="heading-element">' +
            '<span><label>Creted On</label></span>' +
            '<span><a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow">' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li>' +
            '<li class="heading-element">' +
            '<span><label>Status</label></span>' +
            '<span><a class="upper-arrow" >' +
            '<img src="images/w_arw_up.png"></a>' +
            '<a class="lower-arrow">' +
            '<img src="images/w_arw_dwn.png"></a>' +
            '</span>' +
            '</li></ul>' +
            '</div>' +
            '<div class="user-info-div">' +
            '<ul class="data-headings" ng-repeat="user in userList">' +
            '<li class="data-element"><label>{{user.userid.firstname}}</label></li>' +
            '<li class="email-element"><label>{{user.userid.emailid}}</label></li>' +
            '<li class="data-element"><label>{{user.roleid.name}}</label>' +
            '<button class="change-role-btn" ng-click="changeUserRole(user)">Change</button>' +
            '</li>' +
            '<li class="data-element"><label class="date-created">{{user.__createdon}}</label></li>' +
            '<li class="data-element"><button class=" block-buttons"  ng-hide="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Activate</button>' +
            '<button class="block-buttons"   ng-show="user.userid.status" ng-click="changeStatus($index,user.userid._id)">Deactivate</button>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            "<div id='scrollDiv'></div>" +
            '</div></div></div>',
        compile: function () {
            return{
                pre: function ($scope) {
                },
                post: function ($scope) {
                    $(window).scroll(function () {
                        if ($(window).scrollTop() + $(window).height() > $("#scrollDiv").offset().top) {
                            if ($scope.cursor != "" && $scope.cursor != undefined) {
                                $scope.getMoreUsersList($scope.cursor);
                            }
                        }
                    });
                    $scope.searchUsers = function () {
                        var text = $("#searchText").val();
                        $scope.getUsersList(text);
                    }

                }
            }
        }
    }
}]);
pajhwokApp.directive('mapAppliedFilter', [function ($scope) {
    return{
        restrict: "E",
        replace: true,
        template: "<div style='display: inline'><span>Applied Filter:</span>" +
            "<span ng-show='labelDetail.mapVisibleCategoryFilter'>Category:&nbsp;&nbsp;{{mapSearchCategory}}<span class='cursor-pointer' ng-click='setCategory(null);removeSelectedClass()'>&nbsp;&nbsp;X</span>" +
            "<span>&nbsp;&nbsp;Search Text&nbsp;&nbsp;{{mapSearchText}}<span style='cursor: pointer' ng-click='removeSearchText()' >&nbsp;&nbsp;X</span></span></span>" +
            "</div>",
        compile:function(){
            return{
                pre:function($scope){
                     $scope.removeSearchText=function(){
                         $('#searchtextbox').val("");
                         window.location.href = '#/map/category/' + $scope.selectedCategoryid + '/language/' + $scope.selectedTrans + '/search?q=' + null;
                     }
                }
            }
        }

    }
}]);



