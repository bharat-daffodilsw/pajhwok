var ASK = "5301e64492f51ed71842a5d1";
var OSK = "530459b8aed74b22457bad37";
var GENERAL = "53181dcc7754938f0ecfd265";
var EDITOR = "53181dcc7754938f0ecfd266";
var ADMIN = "53181dcc7754938f0ecfd267";
var ENGLISH_LANGUAGE = "5304a09a476f9b995eb672f1";
var DARI_LANGUAGE = "5304a0ec476f9b995eb672f3";
var PASHTO_LANGUAGE = "5304a0cb476f9b995eb672f2";
var DEFAULT_CITY_ID = "008e3bc254ff22e1f134d7f58cd3abfc";
var ELECTION_OPINION = "5304a6c3476f9b995eb6732b";
var ELECTION_MONITOR = "5304a6b0476f9b995eb6732a";
var VOTES_FOR_PEACE = "5304a69d476f9b995eb67323";
var SECURITY_INCIDENTS = "5304a323476f9b995eb67308";
var VOILATION_FRAUD = "5304a2af476f9b995eb67307";

var pajhwokApp = angular.module('pajhwokapp', ['ngRoute', '$appstrap.services', 'ui.map', 'ui.event']);
pajhwokApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl:'../mapview',
            controller:'mapCtrl'
        }).when('/news/:newsid', {
                templateUrl:'../news',
                controller:'articleCtrl'
            }).when('/search/category/:catid/city/:cityid/language/:languageid', {
                templateUrl:'../search',
                controller:'searchCtrl'

            }).when('/home', {
                templateUrl:'../home',
                controller:'homeCtrl'
            }).when('/search', {
                templateUrl:'../searchcustom',
                controller:'customSearchCtrl'

            }).when('/mymedia', {
                templateUrl:'../mymedia',
                controller:'myMediaCtrl'

            }).when('/manageunpublishnews', {
                templateUrl:'../manageunpublishnews',
                controller:'manageUnpublishNewsCtrl'

            }).when('/tileview', {
                templateUrl:'../home',
                controller:'homeCtrl'

            }).when('/manageflaggednews', {
                templateUrl:'../manageflagednews',
                controller:'manageFlagedNewsCtrl'

            });
        ;
    }]);

pajhwokApp.controller('mapCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {


    $scope.mapOptions = {
        center:new google.maps.LatLng(34.52846, 68.3424),
        zoom:4,
        options:{
            streetViewControl:false,
            disableDoubleClickZoom:false,
            draggable:true,
            panControl:false,
            maxZoom:20,
            minZoom:7
        },
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var citymap1 = {};
    citymap1['chicago'] = {
        center:new google.maps.LatLng(34.878113, 67.629798),
        population:2842518
    };

    var citymap2 = {};
    citymap2['chicago'] = {
        center:new google.maps.LatLng(32.878113, 65.629798),
        population:3844829
    };
    $scope.mycircle1 = [];
    $scope.mycircle2 = [];
    $scope.mycircle3 = [];
    $scope.mycircle4 = [];
    $scope.mylevel1 = [];
    $scope.mylevel2 = [];
    $scope.mylevel3 = [];
    $scope.mylevel4 = [];
    $scope.heratarray = [];
    $scope.kabularray = [];

    $scope.showinfo = function (centerval, labeltext1) {
        var labelText = labeltext1;
        $scope.mylabeloption = {
            content:labelText,
            map:$scope.myMap,
            boxStyle:{
                textAlign:"center",
                fontSize:"15pt",
                width:"20px"
            },
            disableAutoPan:true,
            pixelOffset:new google.maps.Size(-10, -10),
            position:centerval,
            closeBoxURL:"",
            isHidden:false,
            pane:"mapPane",
            enableEventPropagation:true
        };
        $scope.ibLabel = new InfoBox($scope.mylabeloption);
        $scope.ibLabel.open($scope.myMap);

    }

    $scope.onmapidl = function () {
        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
                map:$scope.myMap,
                geodesic:true,
                fillColor:'white',
                strokeColor:'white',
                strokeOpacity:1.0,
                strokeWeight:0.2,
                title:5,
                center:citymap1[city].center,
                radius:citymap1[city].population / 10000000000000000000000000
            }));
        }
        if ($scope.myMap.getZoom() == 7) {
            $scope.myMarkers = $scope.mycircle2;
            $scope.showMarkers();
            $scope.myMarkers = $scope.mylevel2;
            $scope.showMarkers();
        }
    };

    $scope.onmycal = function () {
        $scope.managemarker();
        for (var city in citymap1) {
            $scope.mycircle1.push(new google.maps.Circle({
                map:$scope.myMap,
                geodesic:true,
                fillColor:'#CC0000',
                strokeColor:'white',
                strokeOpacity:1.0,
                strokeWeight:2,
                title:5,
                center:citymap1[city].center,
                radius:citymap1[city].population / 1000000000000000
            }));
        }
    }
    $scope.setAllMap = function (map) {
        for (var i = 0; i < $scope.myMarkers.length; i++) {
            $scope.myMarkers[i].setMap(map);
        }
    }
    $scope.setdeletemap = function (map) {
        for (var i = 0; i < $scope.deletemarkerarray.length; i++) {
            $scope.deletemarkerarray[i].setMap(map);
        }
    }

    $scope.clearMarkers = function () {
        $scope.setdeletemap(null);
    }

    $scope.deleteMarkers = function () {
        $scope.clearMarkers();
        $scope.mycircle1 = [];
    }

    $scope.showMarkers = function () {
        $scope.setAllMap($scope.myMap);
    }
    $scope.setZoomMessage = function (zoomvalue) {
        if ((zoomvalue == 6)) {
            $scope.myMarkers = $scope.mycircle1;
            $scope.showMarkers();
            $scope.myMarkers = $scope.mylevel1;
            $scope.showMarkers();
            $scope.deletemarkerarray = $scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel4;
            $scope.deleteMarkers();
        }

        if ((zoomvalue == 7)) {
            $scope.myMarkers = $scope.mycircle2;
            $scope.showMarkers();
            $scope.myMarkers = $scope.mylevel2;
            $scope.showMarkers();
            $scope.deletemarkerarray = $scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel4;
            $scope.deleteMarkers();
        }

        if ((zoomvalue == 8)) {
            $scope.managemarker();
            $scope.myMarkers = $scope.mycircle3;
            console.log($scope.myMarkers);
            $scope.showMarkers();
            $scope.myMarkers = $scope.mylevel3;
            $scope.showMarkers();
            $scope.deletemarkerarray = $scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle4;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel4;
            $scope.deleteMarkers();
        }
        if ((zoomvalue == 9)) {
            $scope.managemarker();
            $scope.myMarkers = $scope.mylevel4;
            $scope.showMarkers();
            $scope.deletemarkerarray = $scope.mycircle2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel2;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel1;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mycircle3;
            $scope.deleteMarkers();
            $scope.deletemarkerarray = $scope.mylevel3;
            $scope.deleteMarkers();
        }
    };

    $scope.managemarker = function () {
        var query = {};
        var citymap4 = {};
        query.table = "News__pajhwok";
        query.columns = ["_id", "title", "media", "location", "commentcount", "cityid", "cityid.location"];
        var queryParams = {query:JSON.stringify(query), "ask":"5301e64492f51ed71842a5d1", "osk":"530459b8aed74b22457bad37"};
        var serviceURL = "rest/data";
        var citymap3 = {};
        var citywiseresult = {};
        var locationwisetitle = {};
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (markerreturn) {
            $scope.markerreturnvalue = markerreturn.data;

            for (var i = 0; i < $scope.markerreturnvalue.length; i++) {
                var row = $scope.markerreturnvalue[i];
                var cityloc = row.cityid.location;
                var citynews = citywiseresult[cityloc];

                if (!citynews) {
                    citynews = [];
                    citywiseresult[cityloc] = citynews;
                }
                citynews.push(row);
                locationwisetitle[row.location] = row.title;
                titlekeys = Object.keys(locationwisetitle);
            }
            if ($scope.myMap.getZoom() == 7) {
                for (var city in citymap2) {
                    $scope.mycircle2.push(new google.maps.Circle({
                        map:$scope.myMap,
                        geodesic:true,
                        fillColor:'#CC0000',
                        strokeColor:'white',
                        strokeOpacity:1.0,
                        strokeWeight:2,
                        title:5,
                        center:citymap2[city].center,
                        radius:citymap2[city].population / 150
                    }));
                    $scope.showinfo(citymap2[city].center, $scope.markerreturnvalue.length);
                    $scope.mylevel2.push($scope.ibLabel);
                }
            }
            if ($scope.myMap.getZoom() == 8) {
                mapkeys = Object.keys(citywiseresult);
                for (var i = 0; i < mapkeys.length; i++) {
                    var data_array = mapkeys[i].split(',');
                    citymap3[i] = {
                        center:new google.maps.LatLng(data_array[0], data_array[1]),
                        population:3844829
                    };

                    $scope.mycircle3.push(new google.maps.Circle({
                        map:$scope.myMap,
                        geodesic:true,
                        fillColor:'#CC0000',
                        strokeColor:'white',
                        strokeOpacity:1.0,
                        strokeWeight:2,
                        title:5,
                        center:citymap3[i].center,
                        radius:citymap3[i].population / 400
                    }));

                    $scope.showinfo(citymap3[i].center, citywiseresult[mapkeys[i]].length);
                    $scope.mylevel3.push($scope.ibLabel);
                }
            }
            if ($scope.myMap.getZoom() == 9) {
                for (var i = 0; i < titlekeys.length; i++) {
                    var datatitle_array = titlekeys[i].split(',');
                    citymap4[$scope.markerreturnvalue[i].title] = {
                        center:new google.maps.LatLng(datatitle_array[0], datatitle_array[1])
                    };
                }

                for (var c in citymap4) {
                    $scope.mycircle4.push(new google.maps.Marker({
                        map:$scope.myMap,
                        visible:true,
                        position:citymap4[c].center
                    }));
                }
                $scope.myMarkers = $scope.mycircle4;
                $scope.showMarkers();
            }
        }, function (jqxhr, error) {
            alert("error");
        });
    }
});
pajhwokApp.controller('customSearchCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.getCustomSearchNews = function (transid, searchContent) {
        $scope.searchView = true;
        $scope.loadingMessage = true;
        $scope.searchResultMessage = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.filter = {"published":true};
        if (transid != null && transid != undefined && transid != "null") {
            query.filter["transid"] = transid;
        }
        if (searchContent != null || searchContent != undefined || searchContent != "null") {
            query.filter["title"] = {"$regex":"\\b" + searchContent + "\\b", "$options":"-i"}
        }
        query.orders = {"__createdon":"desc"};
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (categoryData) {
            $scope.customSearchData = categoryData.data;
            $scope.loadingMessage = false;
            $scope.customSearchDataVisible = "";
            if ($scope.customSearchData.length) {
                $scope.searchResultMessage = false;
                $scope.customSearchDataVisible = "true";
            }
            else {
                $scope.searchResultMessage = true;
                $scope.customSearchDataVisible = "false";
            }
            for (var i = 0; i < $scope.customSearchData.length; i++) {
                if ($scope.customSearchData[i]["image"]) {
                    $scope.customSearchData[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.customSearchData[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                } else {
                    /*for default image*/
                    $scope.customSearchData[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getCustomSearchNews($scope.selectedTrans, $routeParams.q);
});
pajhwokApp.controller('searchCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $(".selected_category").removeClass("selected_category");
    $scope.getSearchNews = function (category, city, language, user, search, max_row, cursor) {
        $scope.searchView = true;
        $scope.loadingMessage = true;
        $scope.searchResultMessage = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.filter = {"published":true};
        if (category != null && category != undefined && category != "null") {
            query.filter["category"] = category;
        }
        if (city != null && city != undefined && city != "null") {
            query.filter["cityid"] = city;
        }
        if (language != null && language != undefined && language != "null") {
            query.filter["transid"] = language;
        }

//        if (search != null || search != undefined || search != "null") {
//            query.filter["title"] = {"$regex":"\\b" + search + "\\b", "$options":"-i"}
//        }
        if (max_row) {
            query.max_rows = max_row;
        }
        if (cursor) {
            query.cursor = cursor;
        }
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (categoryData) {
            $scope.searchedNews = categoryData.data;
            $scope.loadingMessage = false;
            $scope.searchedNewsVisible = "";
            if ($scope.searchedNews.length) {
                $scope.searchResultMessage = false;
                $scope.searchedNewsVisible = "true";
            }
            else {
                $scope.searchResultMessage = true;
                $scope.searchedNewsVisible = "false";
            }
            for (var i = 0; i < $scope.searchedNews.length; i++) {
                if ($scope.searchedNews[i]["image"]) {
                    $scope.searchedNews[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.searchedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                } else {
                    /*for default image*/
                    $scope.searchedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.getSearchNews($routeParams.catid, $routeParams.cityid, $routeParams.languageid);
});
pajhwokApp.controller('articleCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.getArticleNews = function () {
        if (true) {
            var query = {"table":"News__pajhwok"};
            query.columns = ["_id", "title", "media", "category", "published", "description", "commentcount", {"expression":"comment", "columns":["content", "__createdby.firstname", {"expression":"__createdon", "format":"fromnow"}]}, "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
            query.filter = {"_id":$routeParams.newsid}
            var currentSession = $scope.getSession();
            if (!currentSession || currentSession["roleid"] == GENERAL) {
                query.filter["published"] = true;
            }

            //query.orders = {
            //    "comment.__createdon":"desc"
            //}
            //query.unwindcolumns = {
            //    "comment":1
            //};

            var timeZone = new Date().getTimezoneOffset();
            timeZone = timeZone * 60000;
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
                $scope.news = topStoriesData.data;
                $scope.newsVisible = "";
                if ($scope.news.length) {
                    $scope.newsVisible = "true";
                }
                else {
                    $scope.newsVisible = "false";
                }
                for (var i = 0; i < $scope.news.length; i++) {
                    if ($scope.news[i]["image"]) {
                        $scope.news[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.news[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                    } else {
                        /*for default image*/
                        $scope.news[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                    }
                }

                $scope.getSimilarCategory(5, $scope.news[0]['category']['_id'], $routeParams.newsid);
                if ($scope.news.length) {

                    $scope.setTopNews($scope.news[0], true, 779, 500);
                }
            }, function (jqxhr, error) {
            })
        }
    }
    $scope.getArticleNews();

});
pajhwokApp.controller('myMediaCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.currentSession = $scope.getSession();
    if ($scope.currentSession) {
        $scope.cursor = "";
        $scope.loadingMedia = false;
        $scope.maxRows = null;
        $scope.rows = 3;
        $scope.getMyMedia = function () {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            var query = {};
            query.table = "News__pajhwok";
            var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
            query.columns = columnArray;
            query.$count = 1;
            query.filter = {"__createdby":"{_CurrentUserId}"};
            query.max_rows = $scope.rows;

            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
                $scope.myAllMedia = mediaData.data;
                $scope.cursor = mediaData.cursor;
                $scope.maxRows = mediaData.$count;
                $scope.myAllMediaVisible = "";
                if ($scope.myAllMedia.length) {
                    $scope.myAllMediaVisible = "true";
                }
                else {
                    $scope.myAllMediaVisible = "false";
                }
                for (var i = 0; i < $scope.myAllMedia.length; i++) {
                    if ($scope.myAllMedia[i]["image"]) {
                        $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                    } else {
                        /*for default image*/
                        $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                    }
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            }, function (jqxhr, error) {
            })
        }

        $scope.getMoreMedia = function (cursor) {
            if ($scope.loadingMedia == true) {
                return;
            }
            $scope.loadingMedia = true;
            if ($scope.cursor + $scope.rows > $scope.maxRows) {
                var rows = $scope.cursor + $scope.rows - $scope.maxRows;
            }
            else {
                var rows = $scope.rows;
            }

            var query = {};
            query.table = "News__pajhwok";
            var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
            query.filter = {"__createdby":"{_CurrentUserId}"};
            query.max_rows = rows;
            query.cursor = cursor;
            query.columns = columnArray;
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":$scope.currentSession["usk"]};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mediaData) {
                $scope.loadingMedia = false;
                for (var i = 0; i < mediaData.data.length; i++) {
                    $scope.myAllMedia.push(mediaData.data[i]);
                }
                for (var i = $scope.cursor; i < mediaData.data.length + $scope.cursor; i++) {
                    if ($scope.myAllMedia[i]["image"]) {
                        $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.myAllMedia[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                    } else {
                        /*for default image*/
                        $scope.myAllMedia[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                    }
                }
                $scope.cursor = mediaData.cursor;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (jqxhr, error) {
            })
        };
    } else {
        alert("Need to login first");
    }

})
pajhwokApp.controller('manageUnpublishNewsCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getUnpublishNews = function () {
        if ($scope.getSession()) {
            var query = {};
            query.table = "News__pajhwok";
            var columnArray = ["_id", "title", "media", "published", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
            query.columns = columnArray;
            query.$count = 1;
            query.filter = {"published":{$ne:true}, "rejected":{$ne:true}};
            query.max_rows = $scope.rows;
            var currentSession = $scope.getSession();
            var currentSession = $scope.getSession();
            if (!currentSession) {
                alert("please login first");
                window.location.href = "/";
                return;
            }
            if (currentSession["roleid"] == GENERAL) {
                $scope.flaggedNewsVisible = "false";
                alert("You don't have permission to access this page ");
                return;
            }
            var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
            var serviceURL = "/rest/data";
            $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
                $scope.unpublishedNews = unpublishedData.data;
                $scope.unpublishedNewsVisible = "";
                if ($scope.unpublishedNews.length) {
                    $scope.unpublishedNewsVisible = "true";
                }
                else {
                    $scope.unpublishedNewsVisible = "false";
                }
                $scope.cursor = unpublishedData.cursor;
                $scope.maxRows = unpublishedData.$count;
                for (var i = 0; i < $scope.unpublishedNews.length; i++) {
                    if ($scope.unpublishedNews[i]["image"]) {
                        $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                    } else {
                        /*for default image*/
                        $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                    }
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            }, function (jqxhr, error) {
            })


            $scope.getMoreMedia = function (cursor) {
                if ($scope.loadingMedia == true) {
                    return;
                }
                $scope.loadingMedia = true;
                if ($scope.cursor + $scope.rows > $scope.maxRows) {
                    var rows = $scope.cursor + $scope.rows - $scope.maxRows;
                }
                else {
                    var rows = $scope.rows;
                }

                var query = {};
                query.table = "News__pajhwok";
                var columnArray = ["_id", "title", "media", "commentcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
                query.filter = {"published":{$ne:true}, "rejected":{$ne:true}};
                query.max_rows = rows;
                query.cursor = cursor;
                query.columns = columnArray;
                var currentSession = $scope.getSession();
                var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
                var serviceURL = "/rest/data";
                $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (unpublishedData) {
                    console.log(unpublishedData);
                    $scope.loadingMedia = false;
                    for (var i = 0; i < unpublishedData.data.length; i++) {
                        $scope.unpublishedNews.push(unpublishedData.data[i]);
                    }
                    for (var i = $scope.cursor; i < unpublishedData.data.length + $scope.cursor; i++) {
                        if ($scope.unpublishedNews[i]["image"]) {
                            $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.unpublishedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                        } else {
                            /*for default image*/
                            $scope.unpublishedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                        }
                    }
                    $scope.cursor = unpublishedData.cursor;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }, function (jqxhr, error) {
                })
            };
        }
        else {
            alert("you need to login first ");
        }

    }


})
pajhwokApp.controller('manageFlagedNewsCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope, $routeParams) {
    $scope.cursor = "";
    $scope.loadingMedia = false;
    $scope.maxRows = null;
    $scope.rows = 3;
    $scope.getFlaggedNews = function () {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "flaggedcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        query.$count = 1;
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = $scope.rows;
        var currentSession = $scope.getSession();
        if (!currentSession) {
            alert("please login first");
            window.location.href = "/";
            return;
        }
        if (currentSession["roleid"] == GENERAL) {
            $scope.flaggedNewsVisible = "false";
            alert("You don't have permission to access this page ");
            return;
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            $scope.flaggedNews = flaggedData.data;
            $scope.cursor = flaggedData.cursor;
            $scope.maxRows = flaggedData.$count;
            $scope.flaggedNewsVisible = "";
            if ($scope.flaggedNews.length) {
                $scope.flaggedNewsVisible = "true";
            }
            else {
                $scope.flaggedNewsVisible = "false";
            }
            $scope.flaggedResult = $scope.flaggedNews.length ? false : true;
            for (var i = 0; i < $scope.flaggedNews.length; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }, function (jqxhr, error) {
        })
    };

    $scope.getMoreFlaggedMedia = function (cursor) {
        if ($scope.loadingMedia == true) {
            return;
        }
        $scope.loadingMedia = true;
        if ($scope.cursor + $scope.rows > $scope.maxRows) {
            var rows = $scope.cursor + $scope.rows - $scope.maxRows;
        }
        else {
            var rows = $scope.rows;
        }

        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "commentcount", "flaggedcount", "category", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.filter = {"flaggedcount":{$gt:0}};
        query.max_rows = rows;
        query.cursor = cursor;
        query.columns = columnArray;
        var currentSession = $scope.getSession();
        if (!currentSession) {
            alert("please login first");
            return;
        }
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "usk":currentSession["usk"]};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (flaggedData) {
            $scope.loadingMedia = false;
            for (var i = 0; i < flaggedData.data.length; i++) {
                $scope.flaggedNews.push(flaggedData.data[i]);
            }
            for (var i = $scope.cursor; i < flaggedData.data.length + $scope.cursor; i++) {
                if ($scope.flaggedNews[i]["image"]) {
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=" + $scope.flaggedNews[i]["image"][0]["key"] + '&ask=' + "5301e64492f51ed71842a5d1" + '&osk=' + "530459b8aed74b22457bad37";
                } else {
                    /*for default image*/
                    $scope.flaggedNews[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + "5301e64492f51ed71842a5d1" + "&osk=" + "530459b8aed74b22457bad37";
                }
            }
            $scope.cursor = flaggedData.cursor;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    };


});
pajhwokApp.controller('homeCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.selectedCategoryid = null;
    $scope.uploadNews = false;
    $(".selected_category").removeClass("selected_category");
    if (!$scope.$$phase) {
        $scope.$apply();
    }
    $scope.getAllNews();
});
pajhwokApp.controller('pajhwokCtrl', function ($scope, $compile, $http, $location, $appService, $rootScope) {
    $scope.oFile = {};
    $scope.oFReader = {};
    $scope.displayType = {};
    $scope.topNews = {};
    $scope.searchedNews = [];
    $scope.topStoriesDetail = [];
    $scope.loading = {"loadingNews":false};
    $scope.defaultSelected = {"selectedCity":{"_id":DEFAULT_CITY_ID}};
    $scope.searchResultMessage = false;
    $scope.selectedCategoryid = null;
    $scope.selectedLanguageid = null;
    $scope.selectedUserid = null;
    $scope.selectedTrans = ENGLISH_LANGUAGE;
    $scope.uploadSelectedTrans = ENGLISH_LANGUAGE;
    $scope.labelDetail = {};
    $scope.city = [];
    $scope.uploadCities = [];
    $scope.availableLanguages = [];
    $scope.userSelectedLanguage = {};
    $scope.selectedCityLanguage = "";
    $scope.defaultSelectedCategory = {};
    $scope.newPost = {};
    $scope.currentUser = {};
    $scope.uploadNews = false;
    $scope.getSession = function () {
        var currentSession = {};
        if (!$appService.getCookie("usk")) {
            return null;
        }
        currentSession["usk"] = $appService.getCookie("usk");
        currentSession["roleid"] = $appService.getCookie("roleid");
        currentSession["firstname"] = $appService.getCookie("firstname");

        if (currentSession["roleid"] == ADMIN || currentSession["roleid"] == EDITOR) {
            $scope.manage["opt"] = true;
        }
        else {
            $scope.manage["opt"] = false;
        }
        if (currentSession["roleid"] == ADMIN) {
            $scope.manage["user"] = true;
        }
        else {
            $scope.manage["user"] = false;
        }
        if (currentSession["usk"]) {
            $scope.manage["mymedia"] = true;
        }
        else {
            $scope.manage["mymedia"] = false;
        }
        return currentSession;

    }
    $scope.clearContent = function () {
        $scope.title = "";
        $scope.newPost.description = "";
        $('#uploadfile').val('').clone(true);
        $scope.showimage = false;
        $scope.videoAudio = false;
        if (!$scope.$$phase) {
            $scope.$apply();
        }

    }
    $scope.manage = {};
    $scope.currentUser = $scope.getSession();

    $scope.logOut = function () {
        $appService.delete_cookie("usk");
        $appService.delete_cookie("roleid");
        console.log("role" + $appService.getCookie("roleid"));
        $appService.delete_cookie("firstname");
        $scope.currentUser = $scope.getSession();
        $scope.manage = {};
    }
    $scope.getTrans = function () {
        var query = {"table":"Trans__pajhwok"};
        query.columns = ["en_name"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.uploadSelectedLanguage = callBackData.data;
            $scope.fetchCommonLabel();
        }, function (err) {
        });

    }

    $scope.getTrans();
    $scope.fetchCommonLabel = function () {
        var query = {"table":"CommanLabel__pajhwok"};
        query.columns = ["identifier", "en_label", "ps_label", "dr_label"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.availableLanguages = callBackData.data;
            $scope.userSelectedLanguage.data = {};
            $scope.setLanguage(ENGLISH_LANGUAGE);
        }, function (err) {
        });

    }
    $scope.setUploadLanguage = function (id) {
        $scope.uploadSelectedTrans = id;
    }
    $scope.setLanguage = function (id) {
        if (id == ENGLISH_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["en_label"];
            }

            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == ENGLISH_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        else if (id == DARI_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["dr_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == DARI_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        else if (id == PASHTO_LANGUAGE) {
            for (var i = 0; i < $scope.availableLanguages.length; i++) {
                $scope.userSelectedLanguage.data[$scope.availableLanguages[i]["identifier"]] = $scope.availableLanguages[i]["ps_label"];
            }
            for (var i = 0; i < $scope.uploadSelectedLanguage.length; i++) {
                if ($scope.uploadSelectedLanguage[i]._id == PASHTO_LANGUAGE) {
                    $scope.newPostTrans = $scope.uploadSelectedLanguage[i];
                    break;
                }
            }
        }
        $scope.selectedTrans = id;
        $scope.uploadSelectedTrans = $scope.selectedTrans;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    }
    $scope.changePath = function () {
        var path = window.location.hash;
        if (path != "#/home") {
            window.location.href = "#/home";
        }
        else {
            $scope.getAllNews();
        }
    }
    $scope.getCategories = function () {
        var query = {"table":"Category__pajhwok"};
        query.columns = ["en_title", "id", "dr_title", "ps_title"];
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.category = callBackData.data;
            $scope.newPost['category'] = $scope.category[0];
        }, function (err) {
        });
    }
    $scope.getCities = function () {
        var query = {"table":"City__pajhwok"};
        query.columns = ["name", "en_fullname", "dr_fullname", "ps_fullname", "location"];
        query.orders = {"name":"asc"};
        var params = {"query":JSON.stringify(query), "ask":ASK, "osk":OSK};
        $appService.getDataFromJQuery("/rest/data", params, "GET", "JSON", function (callBackData) {
            $scope.city = callBackData.data;
            $scope.uploadCities = angular.copy($scope.city);
            $scope.newPostCity = $scope.uploadCities[0];

            $scope.city.splice(0, 0, {"name":"All", "en_fullname":"All", "dr_fullname":"dr_All", "ps_fullname":"ps_All", "_id":null, "location":[]});
            $scope.defaultSelected.selectedCity = $scope.city[0];
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (err) {
            alert(err.message);
        });
    }
    $scope.getTopStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "description", "category", "commentcount", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.filter = {"published":true, "transid":$scope.selectedTrans,"topstory":true};
        if ($scope.defaultSelected.selectedCity._id && $scope.defaultSelected.selectedCity._id != null) {
            query.filter["cityid"] = $scope.defaultSelected.selectedCity._id;
        }
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
            $scope.topStoriesDetail = topStoriesData.data;

            for (var i = 0; i < $scope.topStoriesDetail.length; i++) {
                if ($scope.topStoriesDetail[i]["image"]) {
                    $scope.topStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.topStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                } else {
                    /*for default image*/
                    $scope.topStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
            $scope.setTopNews($scope.topStoriesDetail[0], false);
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getRecentStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "image", "commentcount", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.orders = {"__createdon":"desc"};
        query.filter = {"published":true, "transid":$scope.selectedTrans};
        if ($scope.defaultSelected.selectedCity._id && $scope.defaultSelected.selectedCity._id != null) {
            query.filter["cityid"] = $scope.defaultSelected.selectedCity._id;
        }
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (recentStoriesData) {
            $scope.loading.loadingNews = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $scope.recentStoriesDetail = recentStoriesData.data;

            $scope.recentStoryVisible = "";
            if ($scope.recentStoriesDetail.length) {
                $scope.recentStoryVisible = "true";
            }
            else {
                $scope.recentStoryVisible = "false";
            }

            for (var i = 0; i < $scope.recentStoriesDetail.length; i++) {
                if ($scope.recentStoriesDetail[i]["image"]) {
                    $scope.recentStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.recentStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                }
                else {
                    /*for default image*/
                    $scope.recentStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }

        }, function (jqxhr, error) {
        })
    }
    $scope.mostPopularStories = function (max_rows) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "image", "__createdby.firstname", "commentcount", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.orders = {"__createdon":"desc"};
        query.filter = {"published":true, "transid":$scope.selectedTrans};
        if ($scope.defaultSelected.selectedCity._id && $scope.defaultSelected.selectedCity._id != null) {
            query.filter["cityid"] = $scope.defaultSelected.selectedCity._id;
        }
        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (mostPopularStoriesData) {
            $scope.mostPopularStoriesDetail = mostPopularStoriesData.data;
            $scope.mostPopularVisible = "";
            if ($scope.mostPopularStoriesDetail.length) {
                $scope.mostPopularVisible = "true";
            }
            else {
                $scope.mostPopularVisible = "false";
            }

            for (var i = 0; i < $scope.mostPopularStoriesDetail.length; i++) {
                if ($scope.mostPopularStoriesDetail[i]["image"]) {
                    $scope.mostPopularStoriesDetail[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.mostPopularStoriesDetail[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                }
                else {
                    /*for default image*/
                    $scope.mostPopularStoriesDetail[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }, function (jqxhr, error) {
        })
    }
    $scope.getAllNews = function () {
        $scope.loading.loadingNews = true;
        $scope.getTopStories(5);
        $scope.mostPopularStories(6);
        $scope.getRecentStories(3);
    }
    $scope.getCities();
    /*get cities  and cites */
    $scope.getCategories();
    $scope.getFileExtension = function (filename) {
        var ext = /^.+\.([^.]+)$/.exec(filename);
        return ext == null ? "" : ext[1];
    }
    $scope.showFile = function (renderfile, thumbnail, auto_start, w, h) {
        var width, height;
        if (w && h) {
            width = w;
            height = h;
        }
        else {
            width = 629;
            height = 310;
        }
        if (renderfile && renderfile.length > 0) {
            if (thumbnail) {
                var file_ext = $scope.getFileExtension(renderfile[0].name);
                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = true;
                    $scope.displayType.videoAudio = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK;
                }
                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = false;
                    $scope.displayType.videoAudio = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    var imgUrl = "/rest/file/render?filekey=" + thumbnail[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    document.getElementById('ova-jwplayer-container').innerHTML = "";
                    jwplayer('ova-jwplayer-container').setup({
                        image:imgUrl,
                        file:fileUrl,
                        width:width,
                        height:height,
                        autostart:auto_start,
                        type:file_ext
                    });
                }
            } else {
                var file_ext = $scope.getFileExtension(renderfile[0].name);
                if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = true;
                    $scope.displayType.videoAudio = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + renderfile[0].key + '&ask=' + ASK + '&osk=' + OSK;
                }
                else if ((/\.(flv|mov|mp4|m4v|f4v|aac|m4a|f4a|mp3|ogg|oga)$/gi).test(renderfile[0].name)) {
                    $scope.displayType.image = false;
                    $scope.displayType.videoAudio = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    var fileUrl = "/rest/file/render?filekey=" + renderfile[0].key + "&ask=" + ASK + "&osk=" + OSK;
                    var imgUrl = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                    document.getElementById('ova-jwplayer-container').innerHTML = "";
                    jwplayer('ova-jwplayer-container').setup({
                        image:imgUrl,
                        file:fileUrl,
                        width:width,
                        height:height,
                        autostart:auto_start,
                        type:file_ext
                    });
                }
            }

        } else if (thumbnail) {
            if ((/\.(gif|jpg|jpeg|tiff|png|bmp)$/gi).test(thumbnail[0].name)) {
                $scope.displayType.image = true;
                $scope.displayType.videoAudio = false;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                $scope.displayType.imageFileUrl = "/rest/file/render?filekey=" + thumbnail[0].key + '&ask=' + ASK + '&osk=' + OSK;
            }

        }
    }
    $scope.removeSelectedClass = function () {
        $('.selected_category').removeClass('selected_category');
    }
    $scope.setTopNews = function (newsData, auto_start, width, height) {
        $scope.topNews = newsData;
        $scope.boolred = false;
        $scope.boolgreen = false;
        $scope.boolblue = false;
        $scope.boolblack = false;
        $scope.boolyellow = false;
        if ($scope.topNews) {
            if ($scope.topNews['category']._id == SECURITY_INCIDENTS) {
                $scope.boolred = true;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == VOTES_FOR_PEACE) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == ELECTION_OPINION) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = true;
                $scope.boolblack = false;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == VOILATION_FRAUD) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = true;
                $scope.boolyellow = false;
            }
            if ($scope.topNews['category']._id == ELECTION_MONITOR) {
                $scope.boolred = false;
                $scope.boolgreen = false;
                $scope.boolblue = false;
                $scope.boolblack = false;
                $scope.boolyellow = true;
            }
        }

        $scope.topNewsVisible = "";
        if ($scope.topNews) {
            $scope.topNewsVisible = "true";
            $scope.showFile($scope.topNews['media'], $scope.topNews['image'], auto_start, width, height);
        } else {
            $scope.topNewsVisible = "false";
        }


    };
    $scope.setCategory = function (categoryData) {
        if (categoryData) {
            $scope.selectedCategoryid = categoryData._id;
            $scope.labelDetail.visibleCategoryFilter = true;
            if ($scope.selectedTrans == ENGLISH_LANGUAGE) {
                $scope.labelDetail.categoryName = categoryData['en_title'];
            }
            else if ($scope.selectedTrans == DARI_LANGUAGE) {
                $scope.labelDetail.categoryName = categoryData['dr_title'];
            }
            else if ($scope.selectedTrans == PASHTO_LANGUAGE) {
                $scope.labelDetail.categoryName = categoryData['ps_title'];
            }
        }
        else {
            $scope.selectedCategoryid = null;
            $scope.labelDetail.categoryName = "";
            $scope.labelDetail.visibleCategoryFilter = false;

        }
        $scope.uploadNews = false;
        window.location.href = "#/search/category/" + $scope.selectedCategoryid + "/city/" + $scope.defaultSelected.selectedCity._id + "/language/" + $scope.selectedTrans;
    };
    $scope.setCity = function (cityId) {
        $scope.selectedCityid = cityId;
        $scope.changePath();

    }
    $scope.getSimilarCategory = function (max_rows, filterData, newsid) {
        var query = {};
        query.table = "News__pajhwok";
        var columnArray = ["_id", "title", "media", "description", "commentcount", "image", "__createdby.firstname", "activitycount", {"expression":"__createdon", "format":"fromnow"}];
        query.columns = columnArray;
        if (typeof max_rows == "undefined") {
//            query.max_rows = $scope.topstories.length;
        }
        else {
            query.max_rows = max_rows;
        }
        query.cursor = 0;
        query.filter = {"category":{"_id":filterData}, "_id":{"$ne":newsid}};
        query.orders = {"__createdon":"desc"};

        var timeZone = new Date().getTimezoneOffset();
        timeZone = timeZone * 60000;
        var queryParams = {query:JSON.stringify(query), "ask":ASK, "osk":OSK, "state":JSON.stringify({"timezone":timeZone})};
        var serviceURL = "/rest/data";
        $appService.getDataFromJQuery(serviceURL, queryParams, "GET", "JSON", function (topStoriesData) {
            $scope.similarCategory = topStoriesData.data;
            $scope.similarCategoryVisible = "";
            if ($scope.similarCategory.length) {
                $scope.similarCategoryVisible = "true";
            }
            else {
                $scope.similarCategoryVisible = "false";
            }

            for (var i = 0; i < $scope.similarCategory.length; i++) {
                if ($scope.similarCategory[i]["image"]) {
                    $scope.similarCategory[i]["imgurl"] = BAAS_SERVER + "/file/render?filekey=" + $scope.similarCategory[i]["image"][0]["key"] + '&ask=' + ASK + '&osk=' + OSK;
                } else {
                    /*for default image*/
                    $scope.similarCategory[i]["imgurl"] = "/rest/file/render?filekey=530835834b43556925e9b1ee&ask=" + ASK + "&osk=" + OSK;
                }
            }
        }, function (jqxhr, error) {
        })
    }
});





















