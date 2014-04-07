pajhwokApp.directive('category', ["$compile", function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='categories'><h3>{{userSelectedLanguage['data']['categories']}}</h3>" +
            "<ul ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid}' ng-click='setCategory(cat);loadingMessage=true'>{{cat.en_title}}</span></li></ul>" +
            "<ul ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer'ng-class='{selected_category: cat._id == selectedCategoryid}'  ng-click='setCategory(cat);;loadingMessage=true'>{{cat.dr_title}}</span></li></ul>" +
            "<ul ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' id='categories'><li ng-repeat= 'cat in category' ><span class='category-text cursor-pointer' ng-class='{selected_category: cat._id == selectedCategoryid}' ng-click='setCategory(cat);loadingMessage=true'>{{cat.ps_title}}</span></li></ul></div>",
        compile:function () {
            return{
                pre:function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive("manageFlagedNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div ng-switch="flaggedNewsVisible"><p ng-switch-when="false" class="no-record">No Record Found</p><div ng-switch-when="true" ><div   ng-repeat="media in flaggedNews" class="approve-video-1">' +
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
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getFlaggedNews();

                },
                post:function ($scope) {
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
                            {"_id":mediaid, "__type__":"delete"}
                        ];
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.delete) {
                                alert("deleted");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
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
        restrict:"E",
        replace:true,
        template:'<div class="top-header"><span class="language-selector">' +
            '<button ng-repeat="button in uploadSelectedLanguage"  ng-class="{active_language: button._id == selectedTrans}" class="language" ng-click="setLanguage(button._id);changePath()" type="button" role="button">' +
            '{{button.en_name}}</button><span  ng-show="loading.loadingNews" style="color: red">Loading...</span></span><span class="search-news"><form class="search-box" ng-submit="searchData()" >' +
            '<span class="search-span"><input ng-model="searchContent" class="placeholder" placeholder="search for news.." type="text"></span>' +
            '<span class="search-btn-span"><button type="submit" class="search-btn-cover"><img  class="search-btn" src="images/search.png"></button></span>' +
            '</form></span><span class="login"><div class="panel"><div class="user-account"><div ng-show="currentUser" class="welcome"><p> Welcome {{currentUser["firstname"]}}</p><button ng-click="logOut()" class="signout">{{userSelectedLanguage["data"]["signout"]}}</button>' +
            '</div><div  ng-hide="currentUser" class="panel-btn"><a ng-click="showRegister()" id="join_pop">{{userSelectedLanguage["data"]["register"]}}</a>' +
            '<a ng-click="showLoginPopup()" id="login_pop">{{userSelectedLanguage["data"]["login"]}}</a></div></div></div></span></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.searchData = function () {
                        if ($scope.searchContent) {
                            window.location.href = "#/search?q=" + $scope.searchContent;
                        } else {
                            alert("Enter search text first");
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
        restrict:"E",
        replace:true,
        template:'<div class="banner"><img src="images/afghanvotebanner.png"></div>'

    }
}]);
pajhwokApp.directive('city', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select-city' ng-options='o.en_fullname for o in city' ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' ng-change='setCity(defaultSelected.selectedCity._id)' ng-model='defaultSelected.selectedCity'></select>" +
            "<select class='select-city' ng-options='o.dr_fullname for o in city' ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-change='setCity(defaultSelected.selectedCity._id)' ng-model='defaultSelected.selectedCity'></select>" +
            "<select class='select-city' ng-options='o.ps_fullname for o in city' ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-change='setCity(defaultSelected.selectedCity._id)' ng-model='defaultSelected.selectedCity'></select></span>"
    }
}]);
pajhwokApp.directive('cityUpload', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select upload-city' ng-options='o.en_fullname for o in uploadCities' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans'ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.dr_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"' ng-model='newPostCity'></select>" +
            "<select class='select upload-city' ng-options='o.ps_fullname for o in uploadCities' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"' ng-model='newPostCity'></select></span>"
    }
}]);
pajhwokApp.directive('categoryList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-options='o.en_title for o in category' ng-show='\"5304a09a476f9b995eb672f1\"==uploadSelectedTrans' ng-model='newPost.category'></select>" +
            "<select class='select' ng-options='o.dr_title for o in category' ng-show='uploadSelectedTrans == \"5304a0ec476f9b995eb672f3\"'  ng-model='newPost.category'></select>" +
            "<select class='select' ng-options='o.ps_title for o in category' ng-show='uploadSelectedTrans == \"5304a0cb476f9b995eb672f2\"'  ng-model='newPost.category'></select></span>",
        compile:function () {
            return{
                pre:function ($scope) {
                }
            }
        }
    }
}]);
pajhwokApp.directive('languageList', [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<span><select class='select' ng-change='setUploadLanguage(newPostTrans._id)' ng-options='o.en_name for o in uploadSelectedLanguage' ng-model='newPostTrans' ></select>" +
            "</span>"
    }
}]);
pajhwokApp.directive('manageOptions', ["$compile", function ($compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<ul class="sub-menu"><li ng-show="manage.user" class="manage-child"><a  >Manage Users</a></li>' +
            '<li class="manage-child"><a href="#/manageflaggednews">Manage Flag</a></li>' +
            '<li class="manage-child"><a href="#/manageunpublishnews">Publish Videos</a></li></ul>'

    }
}]);
//<p ng-switch-when='false' class='no-record'> No Record Found</p>
pajhwokApp.directive('navBar', ["$compile", function ($compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<div class='nav'><span class='cities'><city></city></span>" +
            "<span class='left-nav'><ul class='menu'>" +
            "<li class='selected-nav nav-menu' ng-click='menuClick(\"home\")'><a class='menu-item selected-nav-anchor'   >{{userSelectedLanguage['data']['home']}}</a></li>" +
            "<li class='nav-menu'><a class='menu-item ' >{{userSelectedLanguage['data']['aboutus']}}</a></li>" +
            "<li class='nav-menu'><a class='menu-item ' >{{userSelectedLanguage['data']['contactus']}}</a></li>" +
            "<li ng-show='manage.opt' class='nav-menu'><a class='menu-item selected-nav-anchor'>Manage</a><manage-options></manage-options></li>" +
            "<li ng-show='manage.mymedia' class='nav-menu'><a class='menu-item' href='#/mymedia'>My Uploads</a></li></ul></span>" +
            "<span class='upload-content'><button class='upload' ng-click='clearContent();uploadNews = !uploadNews'>{{userSelectedLanguage['data']['upload']}}</button></span>" +
            "<span class='right-nav'><ul class='view-bar'><a href='#/tileview'><li class='map-view view'><img src='images/1.png '></li></a>" +
            "<a href='#/'><li class='map-view view'><img src='images/3.png '></li></a></ul></span></div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.menuClick = function (path) {
                        $scope.uploadNews = false;
                        window.location.href = '#/' + path;

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
        restrict:"E",
        replace:true,
        template:'<div class="upload-section"><div class="upload-inner"><form>' +
            '<app-file-upload></app-file-upload><p class="upload-div"><language-list></language-list><city-upload></city-upload>' +
            '<category-list></category-list></p>' +
            '<p class="upload-div"><input class="upload-text" type="text" ng-model="title" placeholder="enter title here">' +
            '<textarea ng-model="newPost.description" class="upload-text" placeholder="write description here"></textarea>' +
            '<span ng-show="uploading">Uploading...<img src="images/loading.gif"></span></p>' +
            '<p class="cancel-upload"><button value="" class="upload-btn" ng-click="saveFile()">Upload</button>' +
            '<button value="" class="upload-btn" ng-click="clearContent();uploadNews=false">Cancel</button>' +
            '</p></form></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.title = "";

                    $scope.saveFile = function () {
                        var currentSession = $scope.getSession();
                        if (!currentSession) {
                            alert("please login first");
                            return false;
                        }
                        if (document.getElementById('uploadfile').files.length === 0) {
                            alert("please select media first");
                            return false;
                        }
                        if ($scope.title.length < 10) {
                            alert("please enter title first or at least 10 characters ");
                            return false;
                        }
                        if (!$scope.newPostCity) {
                            alert("please select city first");
                            return false;
                        }
                        if (!$scope.newPost.category) {
                            alert("please select category first");
                            return false;
                        }
                        if (!$scope.newPostTrans) {
                            alert("please select language first");
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
                            if (data) {
                                var query = {};
                                query.table = "News__pajhwok";

                                if (currentSession["roleid"] != GENERAL) {
                                    $scope.newPost["published"] = true;
                                }
                                var file_ext = $scope.getFileExtension(data[0].name);
                                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(data[0].name)) {
                                    $scope.newPost["image"] = data;
                                }
                                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(data[0].name)) {
                                    $scope.newPost["media"] = data;
                                }
                                $scope.newPost["title"] = $scope.title;
                                $scope.newPost["cityid"] = {"name":$scope.newPostCity.name, "_id":$scope.newPostCity._id};
                                $scope.newPost["location"] = $scope.newPostCity.location;
                                $scope.newPost["transid"] = {"_id":$scope.newPostTrans._id};

                                console.log(JSON.stringify($scope.newPost));
                                query.operations = [$scope.newPost];
                                $scope.uploading = true;
                                $appService.save(query, ASK, OSK, currentSession["usk"], function (callBackData) {
                                    $scope.uploading = false;
                                    if (callBackData.insert) {


                                        var msg = "Successfully Uploaded";
                                        if ($scope.currentUser["roleid"] == GENERAL) {
                                            msg += " Please wait while your news is approved for publishing ";
                                        }

                                        $scope.clearContent();
                                        alert(msg);
                                    }
                                });
                            }
                            else {
                                $scope.uploading = false;
                            }
                        }, function (callbackerror) {
                            alert("error");
                        });
                    };
                },
                post:function ($scope) {
                }
            }
        }


    }
}]);
pajhwokApp.directive('appFileUpload', ['$appService', '$compile', function ($appService, $compile) {
    return {
        restrict:"E",
        replace:true,
//        scope:true,
        template:"<div class='choose-file'><p>" +
            "<input type='file' id='uploadfile' style=' float: left;width: 206px;'>" +
            "<img id='img_thumbnail' ng-show='showimage' ng-src='{{imageData}}' class='thumbnail' style='float: left;height: 190px;width: 270px'>" +
            "<div ng-show='videoAudio' style='float: left;height: 190px;width: 270px'>" +
            "<div id='ova-jwplayer-container-upload'></div></div>" +
            "</p></div>",
        compile:function () {
            return {
                post:function ($scope, iElement) {
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
                                file:file.result,
                                width:270,
                                height:190,
                                type:file_ext
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
        restrict:"E",
        replace:true,
        template:"<div ng-switch='topNewsVisible'><div ng-switch-when='true' class='bigger'><div class='video-only'><span class='video-thumb'>" +
            "<img id='video-thumb' ng-show='displayType.image'  width='98%' height='310px' ng-src='{{displayType.imageFileUrl}}'>" +
            "<div ng-show='displayType.videoAudio'><div id='ova-jwplayer-container'></div></div>" +
            "</span></div><div class='bigger-content'><div class='lockup-content'>" +
            "<h3 class='lockup-title'><a href='#/news/{{topNews._id}}'<p class='big-heading'>{{topNews.title}}</p></a></h3>" +
            "<p class='video-meta'><span class='meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a  class='user-name'>{{topNews['__createdby']['firstname']}}</a></span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='\"5304a09a476f9b995eb672f1\"==selectedTrans' class='deemphasized-text ng-binding'>{{topNews['category']['en_title']}}</span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='selectedTrans == \"5304a0ec476f9b995eb672f3\"' class='deemphasized-text ng-binding'>{{topNews['category']['dr_title']}}</span>" +
            "<span ng-class='{red:boolred,green:boolgreen,blue:boolblue,black:boolblack,yellow:boolyellow}'  ng-show='selectedTrans == \"5304a0cb476f9b995eb672f2\"' class='deemphasized-text ng-binding'>{{topNews['category']['ps_title']}}</span><span class='deemphasized-text'>{{topNews['__createdon']}}</span></span></p>" +
            "<p class='video-description'>{{topNews['description']}}</p></div>" +
            "<div class='comment-container'><span> <button class='new-comment'><img alt='new-comment' src='images/new-comment.png'></button>" +
            "</span><span class='larger-comments'><a id='larger-comments' >{{topNews['commentcount']}}&nbsp;{{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span><button class='more-comments'><img alt='more-comments' src='images/more-comments.png' id='more-comment-arrow'></button></span></div></div></div></div>"

    }
}]);
pajhwokApp.directive('appliedFilter', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div style='display: inline'><span>Applied Filter:</span>" +
            "<span ng-show='labelDetail.visibleCategoryFilter'>{{labelDetail.categoryName}}<span class='cursor-pointer' ng-click='setCategory(null);removeSelectedClass()'>&nbsp;&nbsp;X</span></span>" +
            "</div>"

    }
}]);
pajhwokApp.directive('footer', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div class="Footer"><div class="social-networks"><ul>' +
            '<li><a id="facebook" title=""></a></li>' +
            '<li><a id="linkedin" title=""></a></li>' +
            '<li><a id="twitter" title=""></a></li></ul></div><div class="copyright"><span>	Content Copyrights 2014 pajhwok.com </span>' +
            '</div></div>'
    }
}]);
pajhwokApp.directive('login', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div  ng-show="userLogin"><a class="overlay" id="login_form"></a><div class="popup">' +
            '<h2>Welcome Guest!</h2> <form ng-submit="login()"><p><input ng-model="username"  type="email" id="login" placeholder="Enter your email"></p>' +
            '<p><input type="password" id="password" ng-model="password" placeholder="enter your password"></p><p>' +
            '<input  type="submit" value="Log In" class="log-in-only"></form><a ng-show="false" ng-click="showForgot=false"class="forgot-pass">Forgot Password</a>' +
            '</p><p ng-show="false"><input type="text" ng-model="forgetUserName" placeholder="Enter your user name">' +
            '<input ng-click="submit()" type="button" value="Submit" class="log-in-only"></p><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.username = "";
                    $scope.password = "";
                    $scope.forgetUserName = "";
                    $scope.closePopup = function () {
                        $scope.userRegister = false;
                        $scope.userLogin = false;
                        $scope.username = "";
                        $scope.password = "";
                    }

                }, post:function ($scope) {
                    $scope.login = function () {
                        var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                        var email = $('#login').val();
                        var pass = $('#password').val();
                        if (regEmail.test(email) == false) {
                            alert("please enter valid user name or your email id");
                            return false;
                        }
                        else {
                            $scope.username = email;
                        }
                        if (!pass) {
                            alert("enter your password");
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
                            $scope.loginUserData = callBackData;
                            if (!callBackData.usk) {
                                alert(callBackData);
                            }
                            else {
                                var usk = $scope.loginUserData.usk;
                                if (usk) {
                                    var query = {"table":"Profile__pajhwok"};
                                    query.columns = ["roleid"];
                                    query.filter = {"userid":"{_CurrentUserId}"};
                                    var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":usk};
                                    $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
                                        var roleid = callBackData.data[0].roleid._id;
                                        var firstname = $scope.loginUserData.firstname;
                                        var c_name = "usk";
                                        document.cookie = c_name + "=" + escape(usk);
                                        var c_name = "roleid";
                                        document.cookie = c_name + "=" + escape(roleid);
                                        var c_name = "firstname";
                                        document.cookie = c_name + "=" + escape(firstname);
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
                            alert("please check your email");
                        }, function (jqxhr, error) {
                            alert("user name doesn't exists or blocked user");
                        });
                    }

                }

            }
        }
    }
}]);
pajhwokApp.directive('register', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-show=userRegister><a  class="overlay" id="join_form"></a>' +
            '<div class="popup"><h2>Register</h2><form><p><input ng-model="newUser.emailid" type="email" id="email" placeholder="enter your email" required></p>' +
            '<p><input ng-model="newUser.firstname" type="text" id="firstname" placeholder="enter full name" required></p><p>' +
            '<input type="password" ng-model="newUser.password" id="pass" placeholder="enter your password" required></p><p>' +
            '<input type="password" ng-model="confirmPassword" id="pass" placeholder="confirm password" required></p>' +
            '<p class="terms"><input ng-model="terms" type="checkbox"><span class="term">&nbsp;&nbsp;I agree to the <a >Terms of Service</a> and <a >Privacy Policy</a>' +
            '</span></p><p><span><input ng-click="saveUser()" type="button" value="Register" class="register"></span><span class="login-link" ng-click="userLogin=true;userRegister=false"><a  id="login_pop" class="log-in">Log In</a></span>' +
            '</p></form><a ng-click="closePopup()" class="close">X</a></div></div>',
        compile:function () {
            return{
                pre:function ($scope) {
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
                post:function ($scope) {
                    $scope.saveUser = function () {
                        if ($scope.newUser.emailid == "" || $scope.newUser.emailid == undefined) {
                            alert("please enter a valid email");
                            return false;
                        }
                        if ($scope.newUser.firstname == "" || $scope.newUser.firstname == null || $scope.newUser.firstname == undefined) {
                            alert("please enter fullname");
                            return false;
                        }
                        if (!$scope.newUser.password || $scope.newUser.password != $scope.confirmPassword) {
                            alert("password and confirm password not matched");
                            return false;
                        }
                        if (!$scope.terms) {
                            alert("please agree on  term and condition first ");
                            return false;
                        }
                        $scope.newUser.username = $scope.newUser.emailid;
                        var query = {};
                        query.table = "Profile__pajhwok";
                        query.operations = [
                            {"userid":$scope.newUser, "roleid":{"_id":EDITOR}, "emailid":$scope.newUser.emailid}
                        ];
                        $appService.save(query, ASK, OSK, null, function (callBackData) {

                            if (!callBackData["insert"]) {
                                alert("user name already exists");
                            }
                            else {
                                $scope.userRegister = false;
                                alert("Please check your emailid and verify ");
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
pajhwokApp.directive('sideBar', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div class='small-videos'><ul id='small-videos'><li class='top-small-1' ng-repeat='record in topStoriesDetail' ng-click='setTopNews(record)' >" +
            "<div class='small-video-only'><span class='video-thumb'><img id='small-img' alt='Thumbnail' ng-src='{{record.imgurl}}'></span></div>" +
            "<div class='small-lockup-content'><h3 class='small-lockup-title'><p class='small-heading'>{{record.title}}</p></h3>" +
            "<div class='small-video-meta'><p class='small-meta-info'><span  class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}<a class='user-name'>&nbsp;{{record['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{record['__createdon']}}</span><p class='small-comment'>" +
            "<span class='small-comments-1' ><a class='video-comments' >{{record['commentcount']}}&nbsp;{{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{record['activitycount']}}&nbsp;{{userSelectedLanguage['data']['views']}}</span></p></p></div></div></li></ul></div>"
    }

}]);
pajhwokApp.directive('searchResult', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div ng-show='searchView' class='most-popular' ng-switch='searchedNewsVisible'><div  class='heading'><p ng-show='loadingMessage'>Loading...</p>" +
            "<applied-filter></applied-filter></div><p ng-switch-when='false' class='no-record'>No Record Found</p><div ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='search in searchedNews ' class='popular-video-1'><a href='#/news/{{search._id}}'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></h3></a>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{search['activitycount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div>"
    }
}]);
pajhwokApp.directive('customSearch', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div class='most-popular' ng-switch='customSearchDataVisible'><p ng-switch-when='false' class='no-record'>No Record Found</p>" +
            "<div ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='search in customSearchData' class='popular-video-1'><a href='#/news/{{search._id}}'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{search.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p class='popular-small-heading'>{{search.title}}</p></a></h3>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<span class='user-name cursor-pointer' >{{search['__createdby']['firstname']}}</span></span>" +
            "<span class='deemphasized-text'>{{search['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{search['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{search['activitycount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div></div></div>"

    }

}]);
pajhwokApp.directive('mostPopular', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div class='most-popular' ng-switch='mostPopularVisible'><div class='heading'>{{userSelectedLanguage['data']['mostpopular']}}</div>" +
            "<p ng-switch-when='false' class='no-record' >No Record Found</p><div  ng-switch-when='true' class='popular-videos'>" +
            "<div ng-repeat='mostpopular in mostPopularStoriesDetail ' class='popular-video-1'><a href='#/news/{{mostpopular._id}}'><div class='only-video'><span class='popular-video-thumb'><img ng-src='{{mostpopular.imgurl}}'></span></div>" +
            "<div class='popular-lockup-content'><h3 class='popular-lockup-title'><p  class='popular-small-heading cursor-pointer''>{{mostpopular.title}}</p></h3></a>" +
            "<div class='popular-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{mostpopular['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{mostpopular['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{mostpopular['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{mostpopular['activitycount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>"

    }

}]);
pajhwokApp.directive('recentStory', [function ($scope) {
    return{
        restrict:"E",
        replace:true,
        template:"<div class='recently-uploaded' ng-switch='recentStoryVisible'><div  class='heading'>{{userSelectedLanguage['data']['recentlyuploaded']}}</div><p ng-switch-when='false' class='no-record'> No Record Found</p><div ng-switch-when='true' class='recent-videos'>" +
            "<div ng-repeat='recentstory in recentStoriesDetail' class='recent-video-1'><a href='#/news/{{recentstory._id}}'><div class='only-video'><span class='recent-video-thumb'><img ng-src='{{recentstory.imgurl}}'></span></div>" +
            "<div class='recent-lockup-content'><h3 class='recent-lockup-title'><p class='popular-small-heading'>{{recentstory.title}}</p></h3></a>" +
            "<div class='recent-video-meta'><p class='small-meta-info'><span class='deemphasized-text-name1'>{{userSelectedLanguage['data']['by']}}&nbsp;<a class='user-name'href='#' >{{recentstory['__createdby']['firstname']}}</a></span>" +
            "<span class='deemphasized-text'>{{recentstory['__createdon']}}</span></p><p class='small-comment'><span><a class='video-comments'>{{recentstory['commentcount']}} {{userSelectedLanguage['data']['comments']}}</a></span>" +
            "<span class='video-views'>{{recentstory['activitycount']}} {{userSelectedLanguage['data']['views']}}</span></p></div></div></div></div>"

    }

}]);
pajhwokApp.directive('similarCategory', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-switch="similarCategoryVisible"><div ng-switch-when="true" class="multiple-videos" ><div class="multiple-video-1" ng-repeat="simCat in similarCategory"><div class="only-video">' +
            '<span class="multiple-video-thumb"><img ng-src="{{simCat.imgurl}}"></span></div><div class="popular-lockup-content"><h3 class="popular-lockup-title"><a class="" a="" href="#"><p class="popular-small-heading">' +
            '{{simCat.title}}</p></a></h3><div class="popular-video-meta"><p class="small-meta-info"><span class="deemphasized-text-name1">{{userSelectedLanguage["data"]["by"]}}' +
            '<a class="user-name ng-binding" href="#">{{simCat["__createdby"]["firstname"]}}</a></span><span class="deemphasized-text ng-binding">{{simCat["__createdon"]}}</span></p>' +
            '<p class="small-comment"><span><a class="video-comments" href="#">{{simCat["commentcount"]}}{{userSelectedLanguage["data"]["comments"]}}</a></span><span class="video-views">{{simCat["activitycount"]}}' +
            '{{userSelectedLanguage["data"]["views"]}}</span></p></div></div></div></div>'
    }
}]);
pajhwokApp.directive('userArticle', ['$appService', '$compile', function ($appService, $compile, $scope) {
    return{
        restrict:"E",
        replace:true,
        template:'<div ng-switch="newsVisible"><p ng-switch-when="false" class="no-record">No Record Found</p><div ng-switch-when="true" class="single-video-wrapper"><div class="single-video"><span class="single-video-thumb">' +
            '<img id="video-thumb-img" ng-show="displayType.image"  width="778px" height="500px" ng-src="{{displayType.imageFileUrl}}">' +
            '<div ng-show="displayType.videoAudio"><div id="ova-jwplayer-container"></div></div></span></div>' +
            '<div class="single-video-content"><div class="single-lockup-content"><h3 class="lockup-title"><a class="" a="" href="#">' +
            '<p class="single-heading">{{news[0].title}}</p></a><p ng-hide="news[0].published"><span style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'publish\')">Accept</span>' +
            ' <span  style="cursor: pointer" ng-click="updateStatus(news[0]._id,\'rejected\')">Reject</span> </p></h3><p class="single-meta"><span class="meta-info">' +
            '<span class="deemphasized-text-name-1">{{userSelectedLanguage["data"]["by"]}}&nbsp;<a href="#" class="user-name">' +
            '{{topNews["__createdby"]["firstname"]}}</a></span><span class="video-likes-dislikes"><img src="images/Icon_Like.png" alt="Like" width="20px" height="20px">' +
            '<span class="likes-count">{{news[0].likecount}}</span>&nbsp;&nbsp;&nbsp;<img src="images/Icon_Dislike.png" alt="Dislike" width="20px" height="20px">' +
            '<span class="dislikes-count">{{news[0].dislikecount}}</span></span></span></p></div><div class="sentiment-actions"><div class="watch-action-btn">' +
            '<span class="like-dislike"><button class="like-btn" title="I like this"><span class=""><img src="images/Icon_Like.png"></span></button></span>' +
            '<span class="like-dislike"><button class="like-btn" title="I dislike this" alt="I dislike this"><img src="images/Icon_Dislike.png"></button></span></div>' +
            '<div class="flag"><button class="flag-btn" title="flag this" alt="inappropriate content"><img src="images/flag.jpg" width="30px" height="30px"></button></div>' +
            '</div><div class="more-description"><h5>Published {{news[0]["__createdon"]}}</h5><div class="brief-content"><p class="video-description">{{news[0]["description"]}}' +
            '</p></div><div class="show-more-less"><div class="show-more-btn"><button class="show-more"><span>Show More</span></button></div></div></div>' +
            '<div class="comment-container"><p class="comment-label"><label>Post your comment</label></p><div class="comment-box"><textarea ng-model="commentContent" class="comment-textarea"></textarea></div>' +
            '<div class="comment-user-name"><button class="post-comment" ng-click="postComment()">Post Comment</button></div><h4>ALL COMMENTS <span>({{news[0].commentcount}})</span></h4></div>' +
            '<div class="commenter-info" ng-repeat="cmnt in news[0].comment " ><span class="commenter-name">{{cmnt.__createdby.firstname}}</span><span class="comment-time">{{cmnt.__createdon}}</span>' +
            '<div class="comment-data">{{cmnt.content}}</div></div><div class="show-more-btn"><button class="show-more"><span>Show More</span></button></div>' +
            '</div></div><similar-category></similar-category></div>',
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.commentContent = "";
                    $scope.updateStatus = function (mediaid, result) {
                        var query = {};
                        query.table = "News__pajhwok";
                        if (result == "publish") {
                            var columnArray = [
                                {"_id":mediaid, "published":true}
                            ];
                        }
                        if (result == "rejected") {
                            var columnArray = [
                                {"_id":mediaid, "rejected":true}
                            ];
                        }
                        query.operations = columnArray;
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            $scope.news[0].published = true;
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                alert("updated");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
                        }, function (err) {
                        });

                    }
                },
                post:function ($scope) {

                    $scope.postComment = function () {
                        if (!$scope.commentContent == null || !$scope.commentContent == "") {
                            var cuurentSession = $scope.getSession();
                            if (!cuurentSession) {
                                alert("please login first");
                                return false;
                            }
                            var query = {};
                            query.table = "News__pajhwok";
                            $scope.uploading = true;
                            $scope.newComment = {"_id":$scope.news[0]._id, "$inc":{"commentcount":1}};
                            $scope.newComment['comment'] = [
                                {"content":$scope.commentContent}
                            ];
                            query.operations = [$scope.newComment];
                            $appService.save(query, ASK, OSK, cuurentSession["usk"], function (callBackData) {
                                if (callBackData.update) {
                                    if (!$scope.news[0]['comment']) {
                                        $scope.news[0]['comment'] = [];
                                    }
                                    $scope.news[0]['comment'].push({"__createdby":{"firstname":cuurentSession["firstname"]}, "__createdon":" just now", "content":$scope.commentContent});
                                    $scope.news[0].commentcount++;
                                    $scope.commentContent = "";
                                    if (!$scope.$$phase) {
                                        $scope.$apply();
                                    }
                                }
                            });
                        }
                        else {
                            alert("comment box can't be blank");
                        }
                    }

                }
            }
        }
    }
}]);
pajhwokApp.directive("myMediaPicsData", [function ($scope) {
    return {
        restrict:"E",
        replace:true,
        template:"<a href='#/news/{{media._id}}'>" +
            "<div class='only-video'>" +
            "<span class='popular-video-thumb'><img ng-src='{{media.imgurl}}'></span>" +
            "</div>" +
            "<div class='popular-lockup-content'>" +
            "<h3 class='popular-lockup-title'>" +
            "<p class='popular-small-heading'>{{media.title}}</p>" +
            "</h3>" +
            "</div>" +
            "</a>",

        compile:function ($scope) {
            return{
                pre:function ($scope) {

                },
                post:function ($scope) {

                }
            }
        }
    }
}]);
pajhwokApp.directive("manageUnpublishNews", ['$appService', '$compile', function ($appService, $compile, $scope) {
    return {
        restrict:"E",
        replace:true,
        template:'<div ng-switch="unpublishedNewsVisible"><p ng-switch-when="false" class="no-record"> No Record Found</p><div ng-switch-when="true" ng-repeat="media in unpublishedNews" class="approve-video-1">' +
            "<a href='#/news/{{media._id}}'>" +
            '<div class="only-video">' +
            '<span class="recent-video-thumb">' +
            '<img ng-src="{{media.imgurl}}"></span>' +
            '</span>' +
            '</div>' +
            "</a>" +
            '<div class="recent-lockup-content">' +
            '<h3 class="recent-lockup-title">' +
            '<a href="#/news/{{media._id}}">' +
            '<p class="popular-small-heading">{{media.title}}</p>' +
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
            '</div>',

        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getUnpublishNews();
                },
                post:function ($scope) {
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
                                {"_id":media._id, "published":true}

                            ];
                            media.published = true;
                            media["message"] = "Approved";
                        }
                        if (result == "reject") {
                            var columnArray = [
                                {"_id":media._id, "rejected":true}
                            ];
                            media.rejected = true;
                            media["message"] = "Rejected";
                        }
                        query.operations = columnArray;

                        /*change for appstrap*/
                        $appService.save(query, ASK, OSK, null, function (dataUpdate) {
                            if (dataUpdate.update && dataUpdate.update.length > 0) {
                                alert("updated");
                            }
                            else if (dataUpdate.insert && dataUpdate.insert.length > 0) {
                                alert("inserted");
                            }
                            else
                                alert('User save failed');
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
        restrict:"E",
        replace:true,
        template:"<div ng-switch='myAllMediaVisible'><p ng-switch-when='false' class='no-record' class='no-record'> No Record Found</p><div ng-switch-when='true' class='most-popular'>" +
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
            "<span class='video-views'>{{media['activitycount']}} {{userSelectedLanguage['data']['views']}}</span>" +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div><div id='scrollDiv'></div>" +
            "</div></div>",
        compile:function () {
            return{
                pre:function ($scope) {
                    $scope.getMyMedia();
                },
                post:function ($scope) {
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
