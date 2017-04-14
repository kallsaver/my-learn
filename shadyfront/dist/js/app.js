(function () {
'use strict';

angular
	.module('shady',['ui.router','angular-echarts','ui.bootstrap','ngStorage','ngFileUpload','ngLocale'])
	.config(httpConfig)
	.run(runConfig)
	.constant('address','http://42.96.147.41:8080/shady')
    .constant('globaltimeout', 3000)
    .constant('globalchunksize', 102400)
    .constant('constantpie', {
        itemStyle: {
            normal: {
                label:{position:'outer',
                    show: true,
                    formatter:function (item) {
                        return  item.name + '\n' +item.percent+'%';
                    }
                },
                labelLine:{show:true}
            }
        }
    });

	httpConfig.$inject = ['$httpProvider'];
	function httpConfig($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        /* Override $http service's default transformRequest */
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
        $httpProvider.interceptors.push('interceptor');
        $httpProvider.interceptors.push('timeoutHttpIntercept');
	}

	runConfig.$inject = ['$rootScope','$localStorage','$state','errorService'];
	function runConfig($rootScope,$localStorage,$state,errorService) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
            $rootScope.info = toState.info;
        });

        $rootScope.$on("userIntercepted",function(obj,type) {
            if (type=='notLogin') {
                delete $localStorage.login;
                delete $localStorage.isAdmin;
                delete $localStorage.token;
                delete $localStorage.username;
                delete $localStorage.realName;
                $state.go("login");
            }
            else if (type=="notAdmin"){
                $localStorage.isAdmin = 0;
                errorService.errorModal("非管理员禁用该功能");
            }
        });

        $rootScope.logout = logout;
        function logout() {
            delete $localStorage.login;
            delete $localStorage.isAdmin;
            delete $localStorage.token;
            delete $localStorage.username;
            delete $localStorage.realName;
            $state.go("login");
        }
	}
'use strict';

angular
	.module('shady')
    .factory('errorService',errorService)
    .controller('ModalErrorCtrl', ModalErrorCtrl)
	.factory('timeoutHttpIntercept',timeoutHttpIntercept)
	.factory('interceptor',interceptor)
	.factory('constantService',constantService)
	.filter('statusdesc',statusdesc)
    .filter('activedesc',activedesc)
    .filter('admindesc',admindesc)
    .filter('moneyTypedesc',moneyTypedesc)
    .filter('percentage',percentage)
    .filter('moneydesc',moneydesc)
    .filter('moneydescwithoutunit',moneydescwithoutunit)
	.filter('fundFileUrl',fundFileUrl)
	.filter('projFileUrl',projFileUrl)
	.filter('actionFileUrl',actionFileUrl);
    errorService.$inject = ['$uibModal'];
    function errorService($uibModal) {
        return {
            errorModal : errorModal
        };
        function errorModal (errorMsg) {
            return  $uibModal.open({
                        animation: true,
                        templateUrl: 'tpl/frame/error.html',
                        controller: 'ModalErrorCtrl',
                        size: 'sm',
                        resolve: {
                            errorInfo: function () {
                              return errorMsg;
                            }
                        }
                    });
        }
    }
    ModalErrorCtrl.$inject = ['$scope','$uibModalInstance','$log','errorInfo'];
    function ModalErrorCtrl ($scope,$uibModalInstance,$log,errorInfo) {
        $scope.errorInfo=errorInfo;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

	timeoutHttpIntercept.$inject = ['globaltimeout'];
	function timeoutHttpIntercept(globaltimeout) {
		return {
			'request': function(config) {
				if(!config.timeout) {
					config.timeout = globaltimeout;
				}
				return config;
			}
		};
	}

    interceptor.$inject = ['$rootScope','$localStorage','address'];
    function interceptor($rootScope,$localStorage,address) {
    	return {
	        request: function (req) {
                if (req.url.indexOf(address) > -1) {
                    if(!req.data){
                        req.data={};
                    }                      
                    req.data.token = $localStorage.token;
                }
	            return req;
	        },
	        response: function (resp) {
	        	if(resp.config.method=="POST"){
	        		if (resp.data && resp.data.retCode === 401) {
	        			$rootScope.$emit('userIntercepted','notLogin');
	        		}
                    if (resp.data && resp.data.retCode === 403) {
                        $rootScope.$emit('userIntercepted','notAdmin');
                    }
	        	}
	            return resp;
	        }
		};
    }

    constantService.$inject = ['$http','address'];
    function constantService($http,address) {
    	return {
    		getArea : getArea,
    		getCategory : getCategory,
    		getRound : getRound
    	};
    	function getArea() {
    		return $http.post(address+'/constant/getArea.do',{});
    	}
    	function getCategory() {
    		return $http.post(address+'/constant/getCategory.do',{});
    	}
    	function getRound(roundId) {
    		return $http.post(address+'/constant/getRound.do',{
                'roundId': roundId
            });
    	}
    }

    statusdesc.$inject = [];
    function statusdesc() {
    	return function(status) {
    		if (status === 1) return "新建";
    		if (status === 2) return "跟进";
    		if (status === 3) return "已投";
    		if (status === 4) return "退出";
    		if (status === 5) return "放弃";
    	};
    }

    activedesc.$inject = [];
    function activedesc() {
        return function(isActive) {
            if (isActive === 0) return "冻结";
            else if (isActive === 1) return "激活";
            else return "未知状态";
        };
    }
    admindesc.$inject = [];
    function admindesc() {
        return function(isAdmin) {
            if (isAdmin === 0 ) return "非管理员";
            else if (isAdmin === 1) return "管理员";
            else return "未知角色";
        };
    }

    moneyTypedesc.$inject = [];
    function moneyTypedesc() {
        return function(type) {
            if (type===1) return "人民币";
            else if(type===0) return "美元";
        };
    }

    percentage.$inject = [];
    function percentage() {
        return function(number) {
            var newnum = number * 100;
            return newnum + '%';
        };
    }

    moneydesc.$inject = ['$filter'];
    function moneydesc($filter) {
        return function(money) {
            var newmoney = $filter('number')(money / 10000,2); 
            return newmoney + '万';
        };
    }

    moneydescwithoutunit.$inject = ['$filter'];
    function moneydescwithoutunit($filter) {
        return function(money) {
            var newmoney = $filter('number')(money /10000,2);
            return newmoney;
        };
    }

	fundFileUrl.$inject = ['address','$localStorage'];
	function fundFileUrl(address, $localStorage){
		return function(fundFileId){
			var url=address+"/file/getFundFilebyId.do?fileId="+fundFileId+"&token="+$localStorage.token;
			return url;
		};
	}

	projFileUrl.$inject = ['address','$localStorage'];
	function projFileUrl(address, $localStorage){
		return function(projFileId){
			var url=address+"/file/getProjectFilebyId.do?fileId="+projFileId+"&token="+$localStorage.token;
			return url;
		};
	}

	actionFileUrl.$inject = ['address','$localStorage'];
	function actionFileUrl(address,$localStorage){
		return function(actionId){
			var url = address+"/file/getActionFilebyId.do?actionId="+actionId+"&token="+$localStorage.token;
			return url;
		};
	}




'use strict';

angular
	.module('shady')
	.config(config);
	config.$inject = ['$stateProvider','$urlRouterProvider'];
	function config($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('login',{
			url:'/',
			templateUrl:'tpl/login/login.html'
		})
		.state('main',{
			abstract: true,
			url: '',
			cache: false,
			views: {
				'': {
					templateUrl: 'tpl/frame/main.html'
				},
				'sidebar@main': {
					templateUrl: 'tpl/frame/sidebar.html'
				},
				'top@main': {
					templateUrl: 'tpl/frame/top.html'
				}
			}
		})
			.state('main.dashboard', {
				url: '/dashboard',
				info: {cn:"首页",en:"Dashboard"},
				templateUrl: 'tpl/dashboard/dashboard.html'
			})
			.state('main.fundlist', {
				url: '/fundlist',
				info: {cn:"基金管理",en:"Fund Management"},
				templateUrl: 'tpl/fundmanage/fundlist.html'
			})
			.state('main.funddetail',{
				url:'/fundlist/:fundId',
				info: {cn:"基金详情",en:"Detail of Fund"},
				templateUrl: 'tpl/fundmanage/funddetail.html'
			})
			.state('main.addfund', {
				url: '/addfund',
				info: {cn:"添加基金",en:"Add Fund"},
				templateUrl: 'tpl/fundmanage/addfund.html'
			})

			.state('main.publicproject',{
				url: '/publicproject',
				info: {cn:"公海项目",en:"Public Projects"},
				templateUrl: 'tpl/public/publicproject.html'
			})
			.state('main.addproject',{
				url: '/addproject',
				info: {cn:"添加项目",en:"Add Project"},
				templateUrl: 'tpl/public/addproject.html'
			})
			.state('main.publicprojectdetail',{
				url: '/publicproject/:projectId',
				info: {cn:"公海项目详情",en:"Detail of Public Project"},
				templateUrl: 'tpl/public/publicprojectdetail.html'
			})

			.state('main.privateproject',{
				url: '/privateproject',
				info: {cn:"私海项目",en:"Private Projects"},
				templateUrl: 'tpl/private/privateproject.html'
			})
			.state('main.privateprojectdetail',{
				url: '/privateproject/:projectId',
				info: {cn:"私海项目详情",en:"Detail of Private Project"},
				templateUrl: 'tpl/private/privateprojectdetail.html'
			})

			.state('main.addinvest',{
				url: '/addinvest/:projectId/:roundId',
				info: {cn:"投资",en:"Invest"},
				templateUrl: 'tpl/private/addinvest.html'
			})
			.state('main.addaction',{
				url: '/addinvest/:projectId',
				info: {cn:"添加活动",en:"Add Action"},
				templateUrl: 'tpl/private/addaction.html'
			})
			.state('main.transfer',{
				url: '/transfer/:projectId',
				info: {cn:"转让项目",en:"Transfer Project"},
				templateUrl: 'tpl/private/transfer.html'
			})
			.state('main.share',{
				url: '/share/:projectId',
				info: {cn:"分享项目",en:"Share Project"},
				templateUrl: 'tpl/private/share.html'
			})
			.state('main.quit',{
				url: '/quit/:projectId',
				info: {cn:"退出项目",en:"Quit Project"},
				templateUrl: 'tpl/private/quit.html'
			})

			.state('main.projectmanager',{
				url: '/projectmanager',
				info: {cn:"项目管理",en:"Project Management"},
				templateUrl: 'tpl/projectmanage/projectmanager.html'
			})
			.state('main.projectdetail',{
				url: '/projectdetail/:projectId',
				info: {cn:"项目详情",en:"Detail of Project"},
				templateUrl: 'tpl/projectmanage/projectdetail.html'
			})
			.state('main.dataanalysis',{
				url: '/dataanalysis',
				info: {cn:"数据分析",en:"Data Analysis"},
				templateUrl: 'tpl/dataanalysis/dataanalysis.html'
			})
			.state('main.usermanage', {
				url: '/usermanage',
				info: {cn:"用户管理",en:"User Management"},
				templateUrl: 'tpl/usermanage/manageuser.html'
			})
			.state('main.myaccount', {
				url: '/myaccount',
				info: {cn:"个人用户",en:"My Account"},
				templateUrl: 'tpl/usermanage/myaccount.html'
			})
			;
	}
'use strict';

angular
	.module('shady')
	.controller('dashboardController', dashboardController);
	dashboardController.$inject = ['dashboardService','constantpie','$localStorage','$state'];
	function dashboardController (dashboardService,constantpie,$localStorage,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageNumber = 1;
		vm.pageSize = 2;
		vm.showProject = showProject;
		vm.barconfig = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '50%',
			center:['50%','50%'],
			legend:{show:false}
		};
		vm.pieconfig = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '50%',
			center:['50%','50%'],
			legend:{show:false}
		};

		dashboardService.getWorkforceInfo()
		.success(function(data) {
			if (data.retCode === 1) {
				var datapoints = [];
				for (var item in data.result) {
					datapoints.push({'x':data.result[item].realName,'y':data.result[item].count});
				}
				vm.bardata = [{'datapoints':datapoints}];
			}
		})
		.error(function(error) {
			console.log("error workforce");
		});

		dashboardService.projectStatusStatistics()
		.success(function (data) {
			if (data.retCode === 1) {
				var datapoints = [];
				for (var item in data.result) {
					datapoints.push({'x':item,'y':data.result[item]});
				}
				vm.piedata = [{'datapoints':datapoints}];
			}
		})
		.error(function (error) {
			console.log("status statistics");
		});

		showProject();
		function showProject() {
			return dashboardService.getTrackProject(vm.pageNumber, vm.pageSize)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.list = data.result.list;
				    vm.total = data.result.total;
				    if (vm.total > 0) {
				    	vm.isEmpty = false;
				    }
				    else {
				    	vm.isEmpty = true;
				    }
				}
			})
			.error(function (error) {
				//TODO 为这个错误添加全局的显示错误的方式，而不是简单的前端登出系统
				vm.isEmpty = true;
				console.log("获取数据错误");
			});
		}
	}
'use strict';

angular.module('shady')
	.factory('dashboardService',dashboardService)
	.directive('fileList',fileList)
	.directive('commentList',commentList);
	dashboardService.$inject = ['$http','address','$localStorage'];
	function dashboardService($http,address,$localStorage){
		return {
			getTrackProject : getTrackProject,
			getComment : getComment,
			addComment : addComment,
			getWorkforceInfo : getWorkforceInfo,
			projectStatusStatistics : projectStatusStatistics,
			getProjectFile : getProjectFile
		};
		function getTrackProject (pageNumber,pageSize) {
			return $http.post(address+'/project/getTrackProject.do', {
				'pageNumber': pageNumber,
				'pageSize': pageSize
			});
		}
		function getComment (pageNumber, pageSize, projectId) {
			return $http.post(address+'/project/getComment.do', {
				'pageNumber': pageNumber,
				'pageSize': pageSize,
				'projectId': projectId
			});
		}
		function addComment (projectId, content) {
			return $http.post(address+'/project/addComment.do', {
				'projectId': projectId,
				'content': content
			});
		}
		function getWorkforceInfo () {
			return $http.post(address+'/user/getWorkforceInfo2.do', {
			});
		}
		function projectStatusStatistics () {
			return $http.post(address+'/project/projectStatusStatistics.do', {
			});
		}
		function getProjectFile(projectId,pageSize,pageNumber) {
			return $http.post(address+'/file/getProjectFile.do', {
				'projectId' : projectId,
				'pageSize':pageSize,
				'pageNumber':pageNumber
			});
		}
	}

	fileList.$inject = ['dashboardService','projectService','$timeout'];
	function fileList(dashboardService,projectService,$timeout) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				pid:'@'
			},
			/*jshint multistr: true */
			template: '\
				<div class="files">\
					<a title="文件列表" ng-click="mytaggle()" ng-class="{\'a11\':showfile==true,\'a1\':showfile==false}"></a>\
					<div class="fujian" ng-show="showfile">\
						<span class="shanjiao"></span>\
						<span class="zsj"></span>\
						<div class="guanbi" ng-click="close()"></div>\
						<p class="ptitle">文件列表</p>\
						<table class="table table-border">\
							<thead>\
								<tr>\
									<th>文件名</th>\
									<th>描述</th>\
									<th>上传日期</th>\
								</tr>\
							</thead>\
							<tbody>\
								<tr ng-repeat="item in list">\
									<td><a href="{{ item.projectFileId | projFileUrl }}">{{ item.name }}</a></td>\
									<td>{{ item.description}}</td>\
									<td>{{ item.timeAdded}}</td>\
								</tr>\
							</tbody>\
						</table>\
						<div class="tgc">\
							<span>\
								<uib-pagination total-items="total" ng-model="pageNumber" \
									items-per-page="pageSize" max-size="7"  boundary-link-numbers="true" \
									ng-change="fetchProjectFile()" previous-text="上一页" \
									next-text="下一页"></uib-pagination>\
							</span>\
						</div>\
					</div>\
				</div>',
			link: function (scope,elem,attrs) {	
				scope.pageNumber=1;
				scope.pageSize=5;
				scope.newfile = {};
				scope.progress = -1;
				scope.showfile=false;
				scope.close = function() {
					scope.showfile=false;
				};
				scope.mytaggle = function() {
					scope.showfile = !scope.showfile;
					if (scope.showfile) {
						scope.fetchProjectFile(scope.pid);
					}
					else {
						scope.list = [];
					}
				};
				scope.fetchProjectFile = function () {
            		dashboardService.getProjectFile(scope.pid,scope.pageSize,scope.pageNumber)
            		.success(function (data) {
            			if (data.retCode === 1) {
							scope.list =data.result.list;
							scope.total = data.result.total;
            			}
						else if(data.retCode === -1) {
							scope.list = [];
						}
					})
            		.error(function (error) {
            			console.log("error file list");
            		});
            	};
			}
		};
	}

	commentList.$inject = ['dashboardService'];
	function commentList(dashboardService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				pid:'@'
			},
			/*jshint multistr: true */
			template: '\
				<div class="comment-sys down-bord">\
					<div class="pinglun">\
						<div class="con-bottom">\
							<file-list pid="{{ item.projectId }}"></file-list>\
						</div>\
						<div >\
							<p class="ptitle">评论</p>\
							<table class="table table-border" ng-show="showComment">\
								<thead>\
									<tr>\
										<th>评论内容</th>\
										<th>评论人</th>\
										<th>评论时间</th>\
									</tr>\
								</thead>\
								<tbody>\
									<tr ng-repeat="item in list">\
										<td>{{ item.content }}</td>\
										<td>{{ item.realName }}</td>\
										<td>{{ item.timeAdded }}</td>\
									</tr>\
								</tbody>\
							</table>\
							<div class="tgc" ng-show="showComment">\
									<span>\
										<uib-pagination total-items="total" boundary-links="true" previous-text="&lsaquo;" \
											next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"\
											ng-model="pageNumber" items-per-page="pageSize" max-size="7" class="pagination-sm" \
											boundary-link-numbers="true" ng-change="fetchComment()" previous-text="上一页" \
											next-text="下一页"></uib-pagination>\
									</span>\
							</div>\
							<div ng-show="!showComment" class="no-comment">暂无评论</div>\
							<form name="CommentForm" ng-submit="doAdd()">\
								<div class="add-comment">\
									<textarea class="form-control" ng-model="content" placeholder="请填写评论!" rows="2" required name="content"></textarea>\
								</div>\
								<button class="btn1 bgc-ju btnok">评论</button>\
							</form>\
						</div>\
					</div>\
				</div>',
            link: function(scope,elem,attrs) {
            	scope.pageNumber = 1;
            	scope.pageSize = 5;
            	scope.doAdd = function () {
            		dashboardService.addComment(scope.pid,scope.content)
            		.success(function(data) {
            			if (data.retCode === 1) {
            				scope.fetchComment();
            			}
            		})
            		.error(function(error) {
						console.log("error add comment");
            		});
            	};
            	scope.fetchComment = function () {
            		dashboardService.getComment(scope.pageNumber,scope.pageSize,scope.pid)
            		.success(function (data) {
            			if (data.retCode === 1) {
            				if (data.result.total === 0) {
            					scope.showComment = false;
            					scope.total = 0;
            					scope.list = [];
            				}
            				else {
            					scope.showComment = true;
            					scope.total = data.result.total;
            					scope.list = data.result.list;
            				}
            			}
            			scope.content = '';
            		})
            		.error(function (error) {
            			scope.showComment = false;
            			scope.total = 0;
            			scope.list = [];
            		});
            	};
				scope.fetchComment();
            }
		};
	}




'use strict';

angular
	.module('shady')
	.controller('dataanalysisController', dataanalysisController);
	dataanalysisController.$inject = ['dataanalysisService','constantpie'];
	function dataanalysisController (dataanalysisService,constantpie) {
		/* jshint validthis: true */
		var vm=this;
		vm.load = load;
		vm.index = 0;
		vm.config = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '45%',
			center:['50%','50%'],
			legend:{show:false},
		};
		vm.config1 = {
			title: {
				text: ''
			},
			pie:constantpie,
			radius : '45%',
			center:['50%','50%'],
			legend:{show:false},
			forceClear: true
		};
		vm.showGlobal = showGlobal;
		vm.showLocal = showLocal;
		vm.search = search;
		function showGlobal () {
			vm.index = 0;
		}
		function showLocal () {
			vm.index = 1;
			dataanalysisService.getFundInfoList()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fundlist = data.result;
					vm.fundId = vm.fundlist[0].fundId;
					vm.search(vm.fundId);
				}
				else {
					vm.fundlist = [];
				}
			})
			.error(function(error) {
				vm.fundlist = [];
			});
		}
		function load() {
			dataanalysisService.globalStatistics()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fundCount = data.result.fundCount;
					vm.managerCount = data.result.managerCount;
					var datapoints1 = [];
					for (var i in data.result.categoryDisList) {
						var item1 = data.result.categoryDisList[i];
						datapoints1.push({'x':item1.category,'y':item1.projectCount});
					}
					vm.bardata1 = [{'datapoints':datapoints1}];
					var datapoints2 = [];
					for (var j in data.result.peopleDisList) {
						var item2 = data.result.peopleDisList[j];
						datapoints2.push({'x':item2.realName,'y':item2.count});
					}
					vm.bardata2 =  [{'datapoints':datapoints2}];
					var datapoints3 = [];
					for (var k in data.result.roundDisList) {
						var item3 = data.result.roundDisList[k];
						datapoints3.push({'x':item3.round,'y':item3.projectCount});
					}				
					vm.bardata3 = [{'datapoints':datapoints3}];
					var datapoints4 = [];
					for (var l in data.result.projectAreaInfo) {
						var item4 = data.result.projectAreaInfo[l];
						datapoints4.push({'x':item4.areaName,'y':item4.projectCount});
					}
					vm.bardata7 = [{'datapoints':datapoints4,'name':'项目数量'}];
				}
				vm.fundCount = data.result.fundCount;
				vm.managerCount = data.result.managerCount;
			})
			.error(function(error) {
				console.log("error");
			});
		}
		function search(fundId) {
			dataanalysisService.fundStatistics(fundId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.money = data.result.money;
					vm.usedmoney = data.result.usedmoney;
					vm.manager = data.result.managerCount;
					var datapoints1 = [];
					for (var i in data.result.categoryDisList) {
						var item1 = data.result.categoryDisList[i];
						datapoints1.push({'x':item1.category,'y':item1.projectCount});
					}
					if (datapoints1.length === 0) {
						datapoints1.push({'x':'空数据','y':0});
					}
					vm.bardata4 = [{'datapoints':datapoints1}];
					var datapoints2 = [];
					for (var j in data.result.peopleDisList) {
						var item2 = data.result.peopleDisList[j];
						datapoints2.push({'x':item2.realName,'y':item2.count});
					}
					if (datapoints2.length === 0) {
						datapoints2.push({'x':'空数据','y':0});
					}
					vm.bardata5 =  [{'datapoints':datapoints2}];
					var datapoints3 = [];
					for (var k in data.result.roundDisList) {
						var item3 = data.result.roundDisList[k];
						datapoints3.push({'x':item3.round,'y':item3.projectCount});
					}
					if (datapoints3.length === 0) {
						datapoints3.push({'x':'空数据','y':0});
					}
					vm.bardata6 = [{'datapoints':datapoints3}];

					var datapoints4 = [];
					for (var l in data.result.projectAreaInfo) {
						var item4 = data.result.projectAreaInfo[l];
						datapoints4.push({'x':item4.areaName,'y':item4.projectCount});
					}
					if (datapoints4.length === 0) {
						datapoints4.push({'x':'空数据','y':0});
					}
					vm.bardata8 = [{'datapoints':datapoints4,'name':'项目数量'}];
				}
				else {

				}
			})
			.error(function(error) {
				console.log("error");
			});
		}

		vm.load();
	}
'use strict';

angular.module('shady')
		.factory('dataanalysisService',dataanalysisService);
		dataanalysisService.$inject = ['$http','address'];
		function dataanalysisService($http,address) {
			return {
				globalStatistics : globalStatistics,
				fundStatistics : fundStatistics,
				getFundInfoList : getFundInfoList
			};
			function globalStatistics() {
				return $http.post(address+'/fund/globalStatistics.do',{});
			}
			function fundStatistics(fundId) {
				return $http.post(address+'/fund/fundStatistics.do',{
					'fundId' : fundId
				});
			}
			function getFundInfoList() {
				return $http.post(address+'/fund/getFundInfoList.do',{});
			}
		}
'use strict';

angular.module('shady')
	.controller('sidenavController',sidenavController);
	sidenavController.$inject = ['$localStorage'];
	function sidenavController ($localStorage) {
		/* jshint validthis: true */
		var vm=this;
		vm.username = $localStorage.username;
		vm.isAdmin	= $localStorage.isAdmin;
		vm.realName = $localStorage.realName;
	}
'use strict';

angular
	.module('shady')
	.controller('addfundController',addfunController);
	addfunController.$inject =  ['fundmanagerService','peopleService','$timeout','$filter','$localStorage','errorService'];
	function addfunController (fundmanagerService,peopleService,$timeout,$filter,$localStorage,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.moneyTypelist = [{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];

		vm.doStep1 = doStep1;
		vm.addgp = addgp;
		vm.addlp = addlp;
		vm.addlpfundlink = addlpfundlink;
		vm.addgpfundlink = addgpfundlink;
		vm.prepare = prepare;
		vm.loadfile1 = loadfile1;
		vm.loadfile2 = loadfile2;
		vm.loadfile3 = loadfile3;
		vm.uploadregulationFile2 = uploadregulationFile2;
		vm.uploadbusinessFile2 = uploadbusinessFile2;
		vm.uploadrecordFile2 = uploadrecordFile2;
		vm.open2 = open2;
		vm.loadpeople = loadpeople;
		vm.loadlp = loadlp;
		vm.loadgp = loadgp;

		vm.regulationFile = {fileType:1,progress:-1};
		vm.businessFile = {fileType:2,progress:-1};
	    vm.recordFile = {fileType:3,progress:-1};

		vm.filelist1=[];
		vm.filelist2=[];
		vm.filelist3=[];

		vm.prepare();
		function prepare() {
			vm.step=1;
			vm.newfund = {};
			vm.newfund.moneyType = 1;
			vm.startDate = "";
		}

		function open2() {
			vm.opened = true;
		}

		function doStep1() {
			vm.newfund.startDate = $filter('date')(vm.startDate,'yyyy-MM-dd');
			vm.newfund.money = vm.newfund.moneynum * 10000;
			fundmanagerService.addFund(vm.newfund)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.step=2;
					vm.currentFundId=data.result.fundId;
				}
				else if(data.retCode === -1) {
					errorService.errorModal(data.retMsg);
				}
 			})
 			.error(function(data) {
 				alert("提交信息有误，请检查输入");
 			});
		}


		function loadpeople() {
			vm.loadlp();
			vm.loadgp();
		}

		function loadlp() {
			fundmanagerService.getFundLp(vm.currentFundId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.lplist = data.result.lp;
				}
				else if (data.retcode === -1) {
					vm.lplist = [];
				}
			})
			.error(function(error){
				vm.lplist = [];
			});
		}

		function loadgp() {
			fundmanagerService.getFundGp(vm.currentFundId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.gplist = data.result.gp;
				}
				else if (data.retCode === -1) {
					vm.gplist =[];
				}
			})
			.error(function(error) {
				vm.gplist =[];
			});
		}

		function addgp(param) {
			fundmanagerService.addGp(param)
			.success(function(data) {
				if(data.retCode === 1) {
					var params = {
						'fundId':vm.currentFundId,
						'peopleId' : data.result.gpId
					};
					vm.addgpfundlink(params);
					vm.newgp = {};
				}
			})
			.error(function(error) {
			});
		}

		function addlp(param) {
			param.money = param.moneynum * 10000;
			fundmanagerService.addLp(param)
			.success(function(data) {
				if(data.retCode === 1) {
					var params = {
						'fundId':vm.currentFundId,
						'peopleId' : data.result.lpId
					};
					vm.addlpfundlink(params);
					vm.newlp = {};
				}
			})
			.error(function(error) {
			});
		}

		function addgpfundlink(people) {
			fundmanagerService.addGpFundLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("gplink添加成功");
					vm.loadgp();
				}
			})
			.error(function(error) {
			});
		}

		function addlpfundlink(people) {
			fundmanagerService.addLpFundLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("lplink添加成功");
					vm.loadlp();
				}
			})
			.error(function(error) {
			});
		}

		function loadfile1() {
			fundmanagerService.getFundFile(vm.currentFundId,1)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist1 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist1 = [];
				}
			})
			.error(function (error) {
				vm.filelist1 = [];
			});
		}

		function loadfile2() {
			fundmanagerService.getFundFile(vm.currentFundId,2)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist2 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist2 = [];
				}
			})
			.error(function (error) {
				vm.filelist2 = [];
			});		
		}

		function loadfile3() {
			fundmanagerService.getFundFile(vm.currentFundId,3)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.filelist3 = data.result;
				} else if (data.retCode === -1) {
					vm.filelist3 = [];
				}
			})
			.error(function (error) {
				vm.filelist3 = [];
			});			
		}
		
		function uploadregulationFile2() {
			fundmanagerService.uploadRegulationFile(vm.regulationFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.regulationFile)
				.then(function(response){
					if(response.data.retCode == 1){
						vm.regulationFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.regulationFile.result = null;
						vm.regulationFile = {fileType:1,progress:-1};
					},1000);
					vm.loadfile1();
				});
			},function (response) {
			},function (evt) {
				vm.regulationFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function uploadbusinessFile2() {
			fundmanagerService.uploadBusinessFile(vm.businessFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.businessFile).then(function(response){
					if(response.data.retCode == 1){
						vm.businessFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.businessFile.result = null;
						vm.businessFile = {fileType:2,progress:-1};
					},1000);
					vm.loadfile2();
				});
			},function (response) {
			},function (evt) {
				vm.businessFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function uploadrecordFile2() {
			fundmanagerService.uploadRecordFile(vm.recordFile)
			.then(function(response) {
				console.log("正在合并文件");
				fundmanagerService.mergeFileRequest(vm.currentFundId, vm.recordFile).then(function(response){
					if(response.data.retCode == 1){
						vm.recordFile.result = response.data;
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					$timeout(function() {
						vm.recordFile.result = null;
						vm.recordFile = {fileType:3,progress:-1};
					},1000);
					vm.loadfile3();
				});
			},function (response) {
			},function (evt) {
				vm.recordFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}				
	}
/**
 * Created by jiangyongwei on 2016/7/20.
 */
'use strict';

angular
    .module('shady')
    .controller('funddetailController', funddetailController);
    funddetailController.$inject = ['fundmanagerService','$localStorage','$timeout','$stateParams'];
    function funddetailController (fundmanagerService,$localStorage,$timeout,$stateParams) {
        /* jshint validthis: true */
        var vm=this;
        vm.detail = detail; 
        vm.show1 = show1;
        vm.show2 = show2;
        vm.show3 = show3;
        vm.show4 = show4;
        vm.deactive = deactive;
        vm.doactive = doactive;
        vm.loaddetail = loaddetail;
        vm.loadpeople = loadpeople;
        vm.loadfile = loadfile;
        vm.search = search;
        vm.updatesave = updatesave;

        vm.loadfile1 = loadfile1;
        vm.loadfile2 = loadfile2;
        vm.loadfile3 = loadfile3;
        vm.uploadregulationFile2 = uploadregulationFile2;
        vm.uploadbusinessFile2 = uploadbusinessFile2;
        vm.uploadrecordFile2 = uploadrecordFile2;

        vm.regulationFile = {fileType:1,progress:-1};
        vm.businessFile = {fileType:2,progress:-1};
        vm.recordFile = {fileType:3,progress:-1};
        vm.index = 0;
        vm.pageSize = 5;
        vm.pageNumber = 1;
        vm.readonly = true;
        vm.isAdmin = $localStorage.isAdmin;
        vm.active = $stateParams.fundId;

        vm.detail();
        function show1 () {
            vm.index = 0;
        }
        function show2 (){
            vm.index = 1;
        }
        function show3 (){
            vm.index = 2;
        }
        function show4 (){
            vm.index = 3;
        }
        function detail () {
            vm.loaddetail();
            vm.loadpeople();
            vm.loadfile();
            vm.search();
        }

        function deactive () {
            fundmanagerService.deactiveFund(vm.active, vm.comment)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.comment = "";
                    vm.loaddetail();
                    alert("冻结成功！");
                }
            })
            .error(function (error) {
                vm.comment = "";
            });
        }

        function doactive () {
            fundmanagerService.activeFund(vm.active, vm.comment)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.comment = "";
                    vm.loaddetail();
                    alert("解冻成功！");
                }
            })
            .error(function (error) {
                vm.comment = "";
            });
        }

        function loaddetail() {
            fundmanagerService.getFundDetail(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.current = data.result;
                }
            })
            .error(function(error) {
            });               
        }

        function loadpeople () {
            fundmanagerService.getFundLp(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.lplist = data.result.lp;
                } else if (data.retCode === -1) {
                    vm.lplist = [];
                }
            })
            .error(function(error) {
                vm.lplist = [];
            });

            fundmanagerService.getFundGp(vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.gplist = data.result.gp;
                } else if (data.retCode === -1) {
                    vm.gplist = [];
                }
            })
            .error(function(error) {
                vm.gplist = [];
            });
        }

        function search () {
            fundmanagerService.getFundProject(vm.pageNumber,vm.pageSize,vm.active)
            .success(function(data) {
                if (data.retCode === 1) {
                    if (data.result.total > 0) {
                        vm.projectList = data.result.list;
                        vm.total = data.result.total;
                    }
                    else {
                        vm.projectList = [];
                        vm.total = 0;
                    }
                }
                else {
                    vm.projectList = [];
                }
            })
            .error(function (error) {
                vm.projectList = [];
            });
        }

        function updatesave(params) {
            fundmanagerService.editFund(params)
                .success(function(data) {
                    if (data.retCode === 1) {
                        vm.readonly = true;
                        alert("保存成功！");
                    }
                })
                .error(function(error) {
                });
        }


        function loadfile () {
            vm.loadfile1();
            vm.loadfile2();
            vm.loadfile3();
        }

        function loadfile1() {
            fundmanagerService.getFundFile(vm.active,1)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist1 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist1 = [];
                }
            })
            .error(function (error) {
                vm.filelist1 = [];
            });
        }

        function loadfile2() {
            fundmanagerService.getFundFile(vm.active,2)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist2 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist2 = [];
                }
            })
            .error(function (error) {
                vm.filelist2 = [];
            });     
        }

        function loadfile3() {
            fundmanagerService.getFundFile(vm.active,3)
            .success(function (data) {
                if (data.retCode === 1) {
                    vm.filelist3 = data.result;
                } else if (data.retCode === -1) {
                    vm.filelist3 = [];
                }
            })
            .error(function (error) {
                vm.filelist3 = [];
            });            
        }

        function uploadregulationFile2() {
            fundmanagerService.uploadRegulationFile(vm.regulationFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.regulationFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.regulationFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.regulationFile.result = null;
                        vm.regulationFile = {fileType:1,progress:-1};
                    },1000);
                    vm.loadfile1();
                });

            },function (response) {
            },function (evt) {
                vm.regulationFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function uploadbusinessFile2() {
            fundmanagerService.uploadBusinessFile(vm.businessFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.businessFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.businessFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.businessFile.result = null;
                        vm.businessFile = {fileType:2,progress:-1};
                    },1000);
                    vm.loadfile2();
                });             
            },function (response) {
            },function (evt) {
                vm.businessFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        function uploadrecordFile2() {
            fundmanagerService.uploadRecordFile(vm.recordFile)
            .then(function(response) {
                console.log("正在合并文件");
                fundmanagerService.mergeFileRequest(vm.active, vm.recordFile)
                .then(function(response){
                    if(response.data){
                        if(response.data.retCode == 1){
                            vm.recordFile.result = response.data;
                            console.log("合并完成");
                        }else if(response.data.retCode == -1){
                            console.log("合并失败");
                        }
                    }
                    $timeout(function() {
                        vm.recordFile.result = null;
                        vm.recordFile = {fileType:3,progress:-1};
                    },1000);
                    vm.loadfile3();
                });     

            },function (response) {
            },function (evt) {
                vm.recordFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }


    }
/**
 * Created by jiangyongwei on 2016/7/20.
 */
'use strict';

angular
    .module('shady')
    .controller('fundlistController', fundlistController);
    fundlistController.$inject = ['fundmanagerService','$localStorage','$timeout','$filter'];
    function fundlistController (fundmanagerService,$localStorage,$timeout,$filter) {
        /* jshint validthis: true */
        var vm=this;
        vm.pageSize = 5;
        vm.newsearch = newsearch;
        vm.search = search;
        vm.keyup = keyup;
        vm.moneyTypelist = [{typeId:-1,typeName:'所有'},{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];
        vm.moneyType = -1;
        vm.isAdmin = $localStorage.isAdmin;
        vm.datelist = [{dateId:0,dateName:'不限'}];
        var nowyear = new Date().getFullYear();
        for (var i=0;i<6;i++) {
            vm.datelist.push({dateId:i+1,dateName:nowyear-i});
        }
        vm.datelist.push({dateId:i+1,dateName:nowyear-i+'以前'});
        vm.startDate = 0;
        vm.newsearch();

        function newsearch() {
        	vm.pageNumber = 1;
        	vm.search();
        }

        function search() {
            if (vm.starttime) {
                vm.startDate = $filter('date')(vm.starttime,'yyyy-MM-dd');
            }
        	fundmanagerService.searchFundInfo(vm.pageNumber,vm.pageSize,vm.fundName,vm.startDate,vm.moneyType)
            .success(function(data) {
                if (data.retCode === 1) {
                    vm.fundlist = data.result.list;
                    vm.total = data.result.total;
                }
                else {
                    vm.fundlist = [];
                    vm.total = 0;
                }
            })
            .error(function(error) {
                vm.fundlist = [];
                vm.total = 0;
            });
        }
        function keyup(event) {
            if(event.keyCode === 13) {
                vm.newsearch();
            }
        }
    }
'use strict';

angular.module('shady')
	.factory('fundmanagerService',fundmanagerService);
	fundmanagerService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function fundmanagerService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			searchFundInfo : searchFundInfo,
			getFundDetail : getFundDetail,
			getFundProject : getFundProject,
			deactiveFund : deactiveFund,
			activeFund : activeFund,
			addFund :  addFund,
			addGp : addGp,
			addLp : addLp,
			addGpFundLink : addGpFundLink,
			addLpFundLink : addLpFundLink,
			getFundLp: getFundLp,
			getFundGp: getFundGp,
			getActiveFundInfoList: getActiveFundInfoList,
			editFund: editFund,
			getFundFile: getFundFile,
			uploadFundFile: uploadFundFile,
			uploadRegulationFile : uploadRegulationFile,
			uploadBusinessFile:uploadBusinessFile,
			uploadRecordFile:uploadRecordFile,
			mergeFileRequest:mergeFileRequest,
			stopUpload:stopUpload

		};
		function searchFundInfo (pageNumber,pageSize,fundName,startDate,moneyType) {
			return $http.post(address+'/fund/searchFundInfo.do',{
				'pageNumber': pageNumber,
				'pageSize': pageSize,
				'fundName': fundName,
				'startDate': startDate,
				'moneyType': moneyType
			});
		}
		function getFundDetail (fundId) {
			return $http.post(address+'/fund/getFundDetail.do',{
				'fundId' : fundId
			});
		}
		function getFundProject (pageNumber,pageSize,fundId) {
			return $http.post(address+'/fund/getFundProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize,
				'fundId' : fundId
			});
		}
		function deactiveFund (fundId,comment) {
			return $http.post(address+'/fund/deactiveFund.do',{
				'fundId' : fundId,
				'comment' : comment
			});
		}
		function activeFund (fundId,comment) {
			return $http.post(address+'/fund/activeFund.do',{
				'fundId' : fundId,
				'comment' : comment
			});
		}
		function addFund(data) {
			return $http.post(address+'/fund/addFund.do',data);
		}
		function addGp(data) {
			return $http.post(address+'/people/addGp.do',data);
		}
		function addLp(data) {
			return $http.post(address+'/people/addLp.do',data);
		}
		function addGpFundLink(data) {
			return $http.post(address+'/people/addGpFundLink.do',data);
		}
		function addLpFundLink(data) {
			return $http.post(address+'/people/addLpFundLink.do',data);
		}
		function getFundLp(fundId) {
			return $http.post(address+'/people/getFundLp.do',{
				'fundId': fundId
			});
		}
		function getFundGp(fundId) {
			return $http.post(address+'/people/getFundGp.do',{
				'fundId': fundId
			});
		}
		function getActiveFundInfoList() {
			return $http.post(address+'/fund/getActiveFundInfoList.do',{});
		}
		function editFund(data) {
			return $http.post(address+'/fund/editFund.do',data);
		}

		function getFundFile(fundId,fileType) {
			return $http.post(address+'/file/getFundFile.do',{
				'fundId' : fundId,
				'fileType' : fileType
			});
		}

		function uploadFundFile(fundId,file) {
			return Upload.upload({
				url: address+'/file/addFundFile.do',
				resumeSizeUrl: null,
				resumeChunkSize: null,
				data : {
					'fundId' : fundId,
					'fileType' : file.fileType,
					'description' : file.description
				},
				file : file.content
			});
		}

		function uploadRegulationFile(file) {
			return Upload.upload({
                url: address+'/file/uploadFundRegulationFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundRegulationFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function uploadBusinessFile(file){
			return Upload.upload({
                url: address+'/file/uploadFundBusinessFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundBusinessFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function uploadRecordFile(file){
			return Upload.upload({
                url: address+'/file/uploadFundRecordFileChunk.do',
                resumeSizeUrl: address+'/file/uploadFundRecordFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });
		}

		function mergeFileRequest(fundId, file){
			return $http.post(address+'/file/uploadFundFileCompleted.do',{
				'fundId':fundId,
				'fileType':file.fileType,
				'fileName':file.content.name,
				'description': file.description
			});
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target':'all'
			});
		}

	}
'use strict';

angular.module('shady')
	.factory('peopleService',peopleService);
	peopleService.$inject = ['$http','address'];
	function peopleService($http,address) {
		return {
			getAllGp: getAllGp,
			getAllLp: getAllLp,
			getAllFounder: getAllFounder,
			addFounder: addFounder,
			addProjectFounderLink: addProjectFounderLink
		};

		function getAllGp() {
			return $http.post(address+'/people/getAllGp.do', {});
		}

		function getAllLp() {
			return $http.post(address+'/people/getAllLp.do', {});
		}

		function getAllFounder() {
			return $http.post(address+'/people/getAllFounder.do',{});
		}

		function addFounder(data) {
			return $http.post(address+'/people/addFounder.do',data);
		}

		function addProjectFounderLink(data) {
			return $http.post(address+'/people/addProjectFounderLink.do',data);
		}
	}
'use strict';

angular
	.module('shady')
	.controller('LoginCtrl', LoginCtrl);
	LoginCtrl.$inject = ['$state','$localStorage','loginService','errorService'];
	function LoginCtrl ($state,$localStorage,loginService,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.login= login;
		function login(data){
			loginService.doLogin(data)
			.success(function(data) {
				if(data.retCode==1){
					$localStorage.login=true;
					$localStorage.isAdmin = data.result.isAdmin;
					$localStorage.token = data.result.token;
					$localStorage.username = data.result.username;
					$localStorage.realName = data.result.realName;
					$state.go("main.dashboard");
				}else{
					errorService.errorModal(data.retMsg);
				}
			})
			.error(function(data){
				errorService.errorModal("网络通讯出错，请检查本地网络或者联系系统管理员");
			});
		}
	}
	
'use strict';

angular.module('shady')
	.factory('loginService',loginService);
	loginService.$inject = ['$http','address'];
	function loginService($http,address){
		return {
			doLogin : doLogin
		};
		function doLogin (data) {
			return $http.post(address+'/user/login.do', data);
		}
	}

'use strict';

angular.module('shady')
	.factory('investService',investService);
	investService.$inject = ['$http','address'];
	function investService($http,address) {
		return {
			getCanFollowInvest: getCanFollowInvest,
			addIntentionInvest: addIntentionInvest,
			updateProjectStatus: updateProjectStatus,
			followInvest: followInvest,
			getInvestFollowInfo: getInvestFollowInfo
		};
		function getCanFollowInvest() {
			return $http.post(address+'/invest/getCanFollowInvest.do',{});
		}
		function addIntentionInvest(data) {
			return $http.post(address+'/invest/addIntentionInvest.do',data);
		}
		function updateProjectStatus(projectId, status) {
			return $http.post(address+'/project/updateProjectStatus.do',{
				'projectId': projectId,
				'status': status
			});
		}
		function followInvest(investId,amount) {
			return $http.post(address+'/invest/followInvest.do',{
				'investId': investId,
				'amount': amount
			});
		}
		function getInvestFollowInfo() {
			return $http.post(address+'/invest/getInvestFollowInfo.do',{});
		}
	}
'use strict';

angular.module('shady')
	.controller('manageController',manageController);
	manageController.$inject = ['constantService','projectService','investService'];
	function manageController(constantService,projectService,investService) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageSize = 5;
		vm.statuslist = [
			{id:0,desc:'所有'},
			{id:1,desc:'新建'},
			{id:2,desc:'跟进'},
			{id:3,desc:'已投'},
			{id:4,desc:'退出'},
			{id:5,desc:'放弃'}
		];
		vm.status = 0;
		vm.areaId = 0;
		vm.categoryId = 0;
		vm.roundId = 0;
		vm.newsearch = newsearch;
		vm.search = search;
		vm.keyup = keyup;
		vm.loaddata = loaddata;
		vm.followinvest = followinvest;

		vm.loaddata();
		constantService.getArea()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.arealist = data.result;
				vm.arealist.unshift({areaId:0,areaName:'所有'});
			}
			else {
				vm.arealist = [];
				vm.areaId = null;
			}
		})
		.error(function(error) {
			vm.arealist = [];
			vm.areaId = null;
		});		

		constantService.getCategory()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.categorylist = data.result;
				vm.categorylist.unshift({categoryId:0,categoryName:'所有'});
			}
			else {
				vm.categorylist = [];
				vm.categoryId = null;
			}
		})
		.error(function(error) {
			vm.categorylist = [];
			vm.categoryId = null;
		});

		constantService.getRound(1)
		.success(function(data) {
			if (data.retCode === 1) {
				vm.roundlist = data.result;
				vm.roundlist.unshift({roundId:0,roundName:'所有'});
			}
			else {
				vm.roundlist = [];
				vm.roundId = null;
			}
		})
		.error(function(error) {
			vm.roundlist = [];
			vm.roundId = null;
		});

		vm.newsearch();
		function newsearch() {
			vm.pageNumber = 1;
			vm.search();
		}

		function search() {
			projectService.searchProject(vm.pageNumber,vm.pageSize,vm.projectName,
				vm.areaId,vm.categoryId,vm.roundId,vm.status)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.projectList = data.result.list;
					vm.total = data.result.total;
				}
				else {
					vm.projectList = [];
					vm.total = 0;
				}
			})
			.error(function (error) {
				vm.projectList = [];
				vm.total = 0;
			});
		}

		function loaddata() {
			investService.getCanFollowInvest()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.investlist = data.result;
				}
				else {
					vm.investlist = [];
				}
			})
			.error(function(error) {
				vm.investlist = [];
			});


			investService.getInvestFollowInfo()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.myfollowlist = data.result;
				}
				else {
					vm.myfollowlist = [];
				}
			})
			.error(function (error) {
				vm.myfollowlist = [];
			});
		}

		function followinvest(param) {
			var amount = param.amountnum * 10000;
			investService.followInvest(param.investId,amount)
			.success(function(data) {
				if (data.retCode === 1) {
					param.amountnum = "";
					vm.loaddata();
				}
			})
			.error(function(error) {
			});
		}

		function keyup(event) {
	        if(event.keyCode === 13) {
	            vm.newsearch();
	        }
    	}
	}
'use strict';

angular.module('shady')
	.controller('projectdetailController',projectdetailController);
	projectdetailController.$inject = ['$stateParams','privateService','investService','projectService','$state','dashboardService'];
	function projectdetailController($stateParams,privateService,investService,projectService,$state,dashboardService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly=true;
		vm.projectId = $stateParams.projectId;
		vm.loaddetail = loaddetail;
		vm.showProjectFile = showProjectFile;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		vm.show1 = show1;
		vm.show2 = show2;
		vm.show3 = show3;
		vm.show4 = show4;
		vm.index = 0;
		function show1 () {
			vm.index = 0;
		}
		function show2(){
			vm.index = 1;
		}
		function show3(){
			vm.index = 2;
		}
		function show4(){
			vm.index = 3;
		}

		function loaddetail() {
			privateService.getDetail(vm.projectId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.project = data.result;
					if(vm.project.tag){
						vm.tags = vm.project.tag.split(";");
					}
				}
			})
			.error(function(error) {
			});

			projectService.getSharedUser(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.ownerlist = data.result;
				}
			})
			.error(function(error) {
				vm.ownerlist = [];
			});

			projectService.getProjectFounder(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.founderlist = data.result.founder;
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});

			projectService.getIntentionInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.intentioninvest = data.result;
				}
			})
			.error(function(error) {
			});

			privateService.getProjectInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.investlist = data.result;
				}
				else {
					vm.investlist = [];
				}
 			})
			.error(function(error) {
				vm.investlist = [];
			});

			privateService.getProjectAction(vm.projectId)
			.success(function(data) {

				if (data.retCode === 1) {
					vm.actionlist = data.result;
				}
				else {
					vm.actionlist = [];
				}
			})
			.error(function(error) {
				vm.actionlist = [];
				console.log(error);
			});

			privateService.canTransfer(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.cantransfer = true;
				} else if (data.retCode === -1) {
					vm.cantransfer = false;
				}
			})
			.error(function(error) {
			});


			privateService.getProjectGain(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.payback = data.result.payback;
					vm.comment = data.result.comment;
					vm.timeAdded = data.result.timeAdded;
				}
			})
			.error(function(error) {
			});

			vm.showProjectFile();
		}


		function showProjectFile() {
			dashboardService.getProjectFile(vm.projectId,vm.pageSize,vm.pageNumber)
    		.success(function (data) {
    			if (data.retCode === 1) {
					vm.filelist =data.result.list;
					vm.total = data.result.total;
    			}
				else if(data.retCode === -1) {
					vm.list = [];
				}
			})
    		.error(function (error) {
    		});
		}

	}
'use strict';

angular.module('shady')
	.controller('addActionController',addActionController);
	addActionController.$inject = ['$stateParams','privateService','$state','$timeout'];
	function addActionController($stateParams,privateService,$state,$timeout) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.addAction = addAction;
		vm.uploadActionFile = uploadActionFile;
		vm.stopUpload = stopUpload;
		vm.newaction = {};
		function addAction(params) {
			if(vm.progress > 0){
				vm.uploadActionFile();
			}else{
				vm.stopUpload();
				params.projectId = vm.projectId;
				privateService.addAction(vm.projectId,params.title,params.content)
				.success(function(data) {
					vm.newaction.actionId = data.result.actionId;
					if (data.retCode === 1) {
						if(!vm.newaction.file){
							$timeout(function(){
								$state.go('main.privateprojectdetail',{'projectId': vm.projectId});
							},1000);
						}else{
							vm.uploadActionFile();
						}
						
					}
				})
				.error(function(error) {

				});
			}			
		}
		
		function uploadActionFile() {
			if(!vm.newaction.actionId){
				alert("创建action时出错，请刷新页面");
			}
			privateService.uploadActionFile(vm.newaction.file)
			.then(function(response){
				privateService.mergeFileRequest(vm.newaction.actionId,vm.newaction.file)
				.success(function(data) {
					if (data.retCode === 1) {
						$timeout(function(){
							$state.go('main.privateprojectdetail',{'projectId': vm.projectId});
						},1000);
					}
				})
				.error(function(error) {

				});
			},function(resoponse) {

			},function(evt) {
				vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function stopUpload() {
			privateService.stopUpload()
			.success(function(data){
				if(data.retCode===1){
					vm.progress = -1;
					return true;
				}
				return false;			
			})
			.error(function(error){
				return false;
			});
		}
	}
'use strict';
angular.module('shady')
	.controller('addInvestController',addInvestController);
	addInvestController.$inject = ['$scope','$state','$stateParams','privateService','constantService','fundmanagerService'];
	function addInvestController($scope,$state,$stateParams,privateService,constantService,fundmanagerService) {
		/* jshint validthis: true */
		var vm=this;
		vm.load = load;
		vm.addInvest = addInvest;
		vm.projectId = $stateParams.projectId;
		vm.roundId = $stateParams.roundId;
		vm.newinvest = {};
		vm.newinvest.moneyType = 1;
		vm.fundlist=[];
		
		$scope.$watch('vm.newinvest.fundId',function(newValue){			
			vm.fundlist.forEach(function(ele){
				if(ele.fundId===newValue){
					vm.newinvest.moneyType=ele.moneyType;
				}
			});
		});

		function load () {
			constantService.getRound(vm.roundId)
			.success(function(data) {
				vm.roundlist = data.result;
				vm.newinvest.roundId = vm.roundlist[0].roundId;
			})
			.error(function(error) {
				vm.roundlist = [];
			});

			fundmanagerService.getActiveFundInfoList()
			.success(function(data) {
				vm.fundlist = data.result;
				vm.newinvest.fundId = vm.fundlist[0].fundId;
			})
			.error(function(error) {
				vm.fundlist = [];
			});
		}

		function addInvest(params) {
			params.projectId = vm.projectId;
			params.money = params.moneynum * 10000;
			params.percentage = params.percentagenum / 100;
			params.follow = params.follownum * 10000;
			params.value = 1000000 * vm.newinvest.moneynum / vm.newinvest.percentagenum;
			privateService.addInvest(params)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("投资记录添加成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
				}
				else if(data.retCode === -1) {
					alert("投资失败");
				}
			})
			.error(function(error) {
			});
		}
	}
'use strict';

angular.module('shady')
    .controller('privateController', privateController)
    .directive('projectList', projectList);
privateController.$inject = ['projectService', 'constantService'];
function privateController(projectService, constantService) {
    /* jshint validthis: true */
    var vm = this;
    vm.pageSize = 5;
    vm.statuslist = [
        {id: 0, desc: '所有'},
        {id: 2, desc: '跟进'},
        {id: 3, desc: '已投'},
        {id: 4, desc: '退出'},
        {id: 5, desc: '放弃'}
    ];
    vm.status = 0;
    vm.newsearch = newsearch;
    vm.search = search;
    vm.keyup = keyup;
    vm.show1 = show1;
    vm.show2 = show2;
    vm.show3 = show3;
    vm.show4 = show4;
    vm.index = 0;
    vm.areaId = 0;
    vm.categoryId = 0;
    vm.roundId = 0;
    function show1 () {
        vm.index = 0;
    }
    function show2(){
        vm.index = 1;
    }
    function show3(){
        vm.index = 2;
    }
    function show4(){
        vm.index = 3;
    }
    constantService.getArea()
    .success(function (data) {
        if (data.retCode === 1) {
            vm.arealist = data.result;
            vm.arealist.unshift({areaId: 0, areaName: '所有'});
        }
        else {
            vm.arealist = [];
            vm.areaId = null;
        }
    })
    .error(function (error) {
        vm.arealist = [];
        vm.areaId = null;
    });

    constantService.getCategory()
    .success(function (data) {
        if (data.retCode === 1) {
            vm.categorylist = data.result;
            vm.categorylist.unshift({categoryId: 0, categoryName: '所有'});
        }
        else {
            vm.categorylist = [];
            vm.categoryId = null;
        }
    })
    .error(function (error) {
        vm.categorylist = [];
        vm.categoryId = null;
    });

    constantService.getRound(1)
    .success(function (data) {
        if (data.retCode === 1) {
            vm.roundlist = data.result;
            vm.roundlist.unshift({roundId: 0, roundName: '所有'});
        }
        else {
            vm.roundlist = [];
            vm.roundId = null;
        }
    })
    .error(function (error) {
        vm.roundlist = [];
        vm.roundId = null;
    });

    vm.newsearch();

    function newsearch() {
        vm.pageNumber = 1;
        vm.search();
    }

    function search() {
        projectService.searchPrivateProject(vm.pageNumber, vm.pageSize, vm.projectName,
            vm.areaId, vm.categoryId, vm.roundId, vm.status)
        .success(function (data) {
            if (data.retCode === 1) {
                vm.projectList = data.result.list;
                vm.total = data.result.total;
            }
            else {
                vm.projectList = [];
                vm.total = 0;
            }
        })
        .error(function (error) {
            vm.projectList = [];
            vm.total = 0;
        });
    }

    function keyup(event) {
        if(event.keyCode === 13) {
            vm.newsearch();
        }
    }
}


projectList.$inject = ['projectService'];
function projectList(projectService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            status: '@'
        },
        /*jshint multistr: true */
        template: '\
				<div>\
			        <div class="project-followbox">\
			        	<table  class="table table-border">\
			                <thead>\
	                            <tr>\
		                            <th>项目名称</th>\
                                    <th>项目简介</th>\
		                            <th>所属行业</th>\
		                            <th>地域</th>\
		                            <th>当前轮次</th>\
		                            <th>备注</th>\
		                        </tr>\
		                    </thead>\
		                    <tbody>\
		                        <tr ng-repeat="project in projectList">\
			                	    <td>{{ project.projectName }}</td>\
                                    <td>{{ project.description }}</td>\
			                	    <td>{{ project.categoryName }}</td>\
			                	    <td>{{ project.areaName }}</td>\
			                	    <td>{{ project.roundName }}</td>\
			                	    <td><button ui-sref="main.privateprojectdetail({\'projectId\': project.projectId})" class="btn1 bgc-lv">详情</bu></td>\
			                    </tr>\
			                </tbody>\
		                    </table>\
			        </div>\
			        <div class="tgr">\
			            <span>\
			                <uib-pagination class="pagination-sm" total-items="total" ng-model="pageNumber" items-per-page="pageSize" max-size="7"  boundary-link-numbers="true" ng-change="search()" previous-text="&laquo;" next-text="&raquo;"></uib-pagination>\
			            </span>\
			        </div>\
		        <div>',
        link: function (scope, elem, attrs) {
            scope.pageNumber = 1;
            scope.pageSize = 5;
            scope.search = function () {
                projectService.searchPrivateProject(scope.pageNumber, scope.pageSize, null, 0, 0, 0, scope.status)
                    .success(function (data) {
                        if (data.retCode === 1) {
                            scope.total = data.result.total;
                            scope.projectList = data.result.list;
                        }
                        else {
                            scope.projectList = [];
                            scope.total = 0;
                        }
                    })
                    .error(function (error) {
                        scope.projectList = [];
                        scope.total = 0;
                    });
            };
            scope.search();
        }
    };
}

























'use strict';

angular.module('shady')
	.factory('privateService',privateService);
	privateService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function privateService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			getDetail: getDetail,
			editProject: editProject,
			getProjectInvest: getProjectInvest,
			getProjectAction: getProjectAction,
			addInvest: addInvest,
			addAction: addAction,
			uploadActionFile : uploadActionFile,
			stopUpload : stopUpload,
			mergeFileRequest: mergeFileRequest,
			canTransfer: canTransfer,
			getUserNotJoinProject: getUserNotJoinProject,
			getProjectGain: getProjectGain			
		};

		function getDetail(projectId) {
			return $http.post(address+'/project/getDetail.do',{
				'projectId': projectId
			});
		}

		function editProject(data) {
			return $http.post(address+'/project/editProject.do',data);
		}

		function getProjectInvest(projectId) {
			return $http.post(address+'/invest/getProjectInvest.do',{
				'projectId': projectId
			});
		}

		function getProjectAction(projectId) {
			return $http.post(address+'/project/getProjectAction.do',{
				'projectId': projectId
			});
		}

		function addInvest(data) {
			return $http.post(address+'/invest/addInvest.do',data);
		}

		function addAction(projectId,title,content,file) {
			return $http.post(address+'/project/addAction.do',{
				'projectId':projectId,
				'title':title,
				'content': content
			});	
		}

		function uploadActionFile(file){
			return Upload.upload({
                url: address+'/file/uploadActionFileChunk.do',
                resumeSizeUrl: address+'/file/uploadActionFileChunk.do?token='+$localStorage.token,
                resumeChunkSize: globalchunksize,
                data: {
				},
				file : file
            });			
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target' : 'action'
			});
		}

		function mergeFileRequest(actionId, file){
			return $http.post(address+'/file/uploadActionFileCompleted.do',{
				'actionId':actionId,
				'fileName':file.name
			});
		}

		function canTransfer(projectId) {
			return $http.post(address+'/project/canTransfer.do',{
				'projectId': projectId
			});
		}

		function getUserNotJoinProject(projectId) {
			return $http.post(address+'/user/getUserNotJoinProject.do',{
				'projectId': projectId
			});
		}

		function getProjectGain(projectId) {
			return $http.post(address+'/project/getProjectGain.do',{
				'projectId': projectId
			});
		}		
	}

'use strict';

angular.module('shady')
	.controller('privatedetailController',privatedetailController);
	privatedetailController.$inject = ['$stateParams','privateService','investService','projectService','$state','dashboardService'];
	function privatedetailController($stateParams,privateService,investService,projectService,$state,dashboardService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly=true;
		vm.projectId = $stateParams.projectId;
		vm.changeEditabled = changeEditabled;
		vm.loaddetail = loaddetail;
		vm.editProject = editProject;
		vm.showProjectFile = showProjectFile;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		vm.abort = abort;
		vm.clone = clone;
		vm.show1 = show1;
		vm.show2 = show2;
		vm.show3 = show3;
		vm.show4 = show4;
		vm.index = 0;
		function show1 () {
			vm.index = 0;
		}
		function show2(){
			vm.index = 1;
		}
		function show3(){
			vm.index = 2;
		}
		function show4(){
			vm.index = 3;
		}
		function changeEditabled() {
			vm.readonly = !vm.readonly;
		}

		function loaddetail() {
			privateService.getDetail(vm.projectId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.project = data.result;
					if (vm.project.tag) {
						vm.tags = vm.project.tag.split(";");
					}
				}
			})
			.error(function(error) {
			});

			projectService.getSharedUser(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.ownerlist = data.result;
				}
			})
			.error(function(error) {
				vm.ownerlist = [];
			});

			projectService.getProjectFounder(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.founderlist = data.result.founder;
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});

			projectService.getIntentionInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.intentioninvest = data.result;
				}
			})
			.error(function(error) {
			});

			privateService.getProjectInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.investlist = data.result;
				}
				else {
					vm.investlist = [];
				}
 			})
			.error(function(error) {
				vm.investlist = [];
			});

			privateService.getProjectAction(vm.projectId)
			.success(function(data) {

				if (data.retCode === 1) {
					vm.actionlist = data.result;
				}
				else {
					vm.actionlist = [];
				}
			})
			.error(function(error) {
				vm.actionlist = [];
				console.log(error);
			});

			privateService.canTransfer(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.cantransfer = true;
				} else if (data.retCode === -1) {
					vm.cantransfer = false;
				}
			})
			.error(function(error) {
			});


			privateService.getProjectGain(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.payback = data.result.payback;
					vm.comment = data.result.comment;
					vm.timeAdded = data.result.timeAdded;
				}
			})
			.error(function(error) {
			});

			vm.showProjectFile();
		}

		function editProject(params) {
			params.projectId = vm.projectId;
			privateService.editProject(params)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("更新成功");
					vm.loaddetail();
					vm.readonly = true;
				} else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function showProjectFile() {
			dashboardService.getProjectFile(vm.projectId,vm.pageSize,vm.pageNumber)
    		.success(function (data) {
    			if (data.retCode === 1) {
					vm.filelist =data.result.list;
					vm.total = data.result.total;
    			}
				else if(data.retCode === -1) {
					vm.filelist = [];
				}
			})
    		.error(function (error) {
    		});
		}

		function abort(projectId) {
			investService.updateProjectStatus(projectId, 5)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("项目已放弃");
					vm.loaddetail();
					vm.readonly = true;
				}
			})
			.error(function(error) {
			});
		}

		function clone(projectId) {
			projectService.cloneProject(projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("克隆项目成功");
					$state.go("main.publicproject");
				}
			})
			.error(function (error) {
			});
		}



	}
'use strict';

angular.module('shady')
	.controller('quitController',quitController);
	quitController.$inject = ['$stateParams','projectService','$state'];
	function quitController($stateParams,projectService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.doquit = doquit;
		function doquit() {
			vm.newgain.projectId = vm.projectId;
			vm.newgain.money = vm.newgain.moneynum * 10000;
			projectService.quitProject(vm.newgain)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("退出记录添加成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
				}
			})
			.error(function(error) {
				console.log("error");
			});
		}
	}
'use strict';

angular.module('shady')
	.controller('shareController',shareController);
	shareController.$inject = ['$stateParams','projectService','privateService','$state'];
	function shareController($stateParams,projectService,privateService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.doshare = doshare;
		vm.loaduser = loaduser;
		function doshare() {
			projectService.shareProject(vm.projectId,vm.sharedUserId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("分享成功");
					$state.go("main.privateprojectdetail",{'projectId': vm.projectId});
				}
			})
			.error(function(error) {
			});
		}

		function loaduser() {
			privateService.getUserNotJoinProject(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result;
					vm.sharedUserId = vm.userlist[0].userId;
				} else if (data.retCode === -1) {
					vm.userlist = [];
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}
	}
'use strict';

angular.module('shady')
	.controller('transferController',transferController);
	transferController.$inject = ['$stateParams','projectService','privateService','$state'];
	function transferController($stateParams,projectService,privateService,$state) {
		/* jshint validthis: true */
		var vm=this;
		vm.projectId = $stateParams.projectId;
		vm.dotransfer = dotransfer;
		vm.loaduser = loaduser;
		function dotransfer() {
			projectService.transferProject(vm.projectId,vm.transferUserId)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("转让成功");
					$state.go("main.privateproject");
				}
			})
			.error(function(error) {
			});
		}

		function loaduser() {
			privateService.getUserNotJoinProject(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result;
					vm.transferUserId = vm.userlist[0].userId;
				} else if (data.retCode === -1) {
					vm.userlist = [];
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}
	}
'use strict';

angular.module('shady')
	.controller('addprojectController',addprojectController);
	addprojectController.$inject = ['projectService','constantService','peopleService','investService','$timeout','dashboardService'];
	function addprojectController(projectService,constantService,peopleService,investService,$timeout,dashboardService) {
		/* jshint validthis: true */
		var vm = this;
		vm.step=1;
		vm.addtag =  addtag;
		vm.removetag = removetag;
		vm.doStep1 = doStep1;
		vm.addprojectfounderlink = addprojectfounderlink;
		vm.addfounder = addfounder;
		vm.loadfounder = loadfounder;
		vm.newproject = {};
		vm.moneyTypelist = [{typeId:0,typeName:'美元'},{typeId:1,typeName:'人民币'}];
		vm.initstep3 = initstep3;
		vm.finishstep3 = finishstep3;
		vm.upload = upload;
		vm.loadFile = loadFile;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		vm.tags = [];

		constantService.getCategory()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.categorylist = data.result;
				vm.newproject.categoryId = vm.categorylist[0].categoryId;
			}
			else {
				vm.categorylist = [];
				vm.newproject.categoryId = null;
			}
		})
		.error(function(error) {
			vm.categorylist = [];
			vm.newproject.categoryId = null;
		});

		constantService.getArea()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.arealist = data.result;
				vm.newproject.areaId = vm.arealist[0].areaId;
			}
			else {
				vm.arealist = [];
				vm.newproject.areaId = null;
			}
		})
		.error(function(error) {
			vm.arealist = [];
			vm.newproject.areaId = null;
		});

		constantService.getRound(1)
		.success(function(data) {
			if (data.retCode === 1) {
				vm.roundlist = data.result;
				vm.newproject.currentRoundId = vm.roundlist[0].roundId;
			}
			else {
				vm.roundlist = [];
				vm.newproject.currentRoundId = null;
			}
		})
		.error(function(error) {
			vm.roundlist = [];
			vm.newproject.currentRoundId = null;
		});

		function addtag() {
			if (vm.ctag) {
	 			vm.tags.push(vm.ctag);
				vm.ctag = '';
			}
		}

		function removetag(index) {
			vm.tags.splice(index,1);
		}

		function addprojectfounderlink(people) {
			peopleService.addProjectFounderLink(people)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("project founder link 添加成功");
					vm.loadfounder();
				}
			})
			.error(function(error) {
			});
		}

		function addfounder(param) {
			peopleService.addFounder(param)
			.success(function(data) {
				if (data.retCode === 1) {
					var params = {
						'projectId': vm.currentProjectId,
						'peopleId': data.result.founderId,
					};
					vm.addprojectfounderlink(params);
					vm.newfounder = {};
				}
			})
			.error(function(error) {
			});
		}

		function loadfounder() {
			projectService.getProjectFounder(vm.currentProjectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.fouderlist = data.result.founder;
				}
				else if (data.retCode === -1) {
					vm.founderlist = [];
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});
		}

		function doStep1() {
			if (vm.tags.length === 0) {
				vm.newproject.tag = null;
			}
			else {
				vm.newproject.tag = vm.tags.join(';');
			}
			projectService.addProject(vm.newproject)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.step=2;
					vm.currentProjectId=data.result.projectId;
					vm.newfounder = {};
				}
			})
			.error(function(error) {
				console.log("创建项目失败");
			});
		}

		function initstep3() {
			vm.step = 3;
			vm.newIntentionInvest = {};
			vm.newIntentionInvest.roundId = vm.newproject.currentRoundId;
			vm.roundlist.forEach(function(ele) {
				if (ele.roundId == vm.newIntentionInvest.roundId) {
					vm.roundName = ele.roundName;
				}
			});
			vm.newIntentionInvest.moneyType = 1;
			vm.newIntentionInvest.projectId = vm.currentProjectId;
		}

		function finishstep3() {
			vm.newIntentionInvest.money = vm.newIntentionInvest.moneynum * 10000;
			vm.newIntentionInvest.percentage = vm.newIntentionInvest.percentagenum / 100;
			vm.newIntentionInvest.value = 1000000 * vm.newIntentionInvest.moneynum / vm.newIntentionInvest.percentagenum;

			investService.addIntentionInvest(vm.newIntentionInvest)
			.success(function(data) {
				if (data.retCode === 1) {
					alert("融资意向创建成功");
					vm.step = 4;
				}
			})
			.error(function(data) {
			});
		}

		function upload() {			
			projectService.addProjectFile2(vm.newfile.file)
			.then(function(response) {
				projectService.mergeFileRequest(vm.currentProjectId, vm.newfile)
				.then(function(response){
					if(response.data.retCode == 1){
						console.log("合并完成");
						$timeout(function() {
							vm.progress = -1;
							vm.newfile = {};
							vm.tags = [];
						},1000);
					}else if(response.data.retCode == -1){
						console.log("合并失败");
					}
					vm.loadFile();
				});
			},function (response) {
			},function (evt) {
				vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
		}

		function loadFile(){
			dashboardService.getProjectFile(vm.currentProjectId,vm.pageSize,vm.pageNumber)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.filelist = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function(error) {
				vm.filelist = [];
				vm.total = 0;
			});
		}
	}
'use strict';

angular.module('shady')
	.controller('projectController',projectController);
	projectController.$inject = ['projectService','constantService'];
	function projectController (projectService,constantService) {
		/* jshint validthis: true */
		var vm=this;
		vm.pageSize = 5;
		vm.areaId = 0;
		vm.categoryId = 0;
		vm.roundId = 0;
		vm.newsearch = newsearch;
		vm.search = search;
		vm.keyup = keyup;
		vm.ownProject = ownProject;
		constantService.getArea()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.arealist = data.result;
				vm.arealist.unshift({areaId:0,areaName:'所有'});	
			}
			else {
				vm.arealist = [];
				vm.areaId = null;
			}
		})
		.error(function(error) {
			vm.arealist = [];
			vm.areaId = null;
		});

		constantService.getCategory()
		.success(function(data) {
			if (data.retCode === 1) {
				vm.categorylist = data.result;
				vm.categorylist.unshift({categoryId:0,categoryName:'所有'});
			}
			else {
				vm.categorylist = [];
				vm.categoryId = null;
			}
		})
		.error(function(error) {
			vm.categorylist = [];
			vm.categoryId = null;
		});

		constantService.getRound(1)
		.success(function(data) {
			if (data.retCode === 1) {
				vm.roundlist = data.result;
				vm.roundlist.unshift({roundId:0,roundName:'所有'});
			}
			else {
				vm.roundlist = [];
				vm.roundId = null;
			}
		})
		.error(function(error) {
			vm.roundlist = [];
			vm.roundId = null;
		});

		vm.newsearch();
		
		function newsearch() {
			vm.pageNumber = 1;
			vm.search();
		}

		function search() {
			projectService.searchPublicProject(vm.pageNumber,vm.pageSize,vm.projectName,vm.areaId,vm.categoryId,vm.roundId) 
			.success(function (data) {
				if (data.retCode === 1) {
					vm.projectList = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function (error) {
				console.log("error");
			});
		}
		
		function ownProject(id) {
			projectService.ownProject(id)
			.success(function (data) {
				if (data.retCode === 1) {
					vm.newsearch();
				}
				else {
					console.log(data);
				}
			})
			.error(function (error) {

			});
		}

		function keyup(event) {
	        if(event.keyCode === 13) {
	            vm.newsearch();
	        }
    	}
 	}
'use strict';

angular.module('shady')
	.factory('projectService',projectService);
	projectService.$inject = ['$http','address','Upload','$localStorage','globalchunksize'];
	function projectService($http,address,Upload,$localStorage,globalchunksize) {
		return {
			addProject : addProject,
			addProjectFile : addProjectFile,
			addProjectFile2 : addProjectFile2,
			searchPublicProject : searchPublicProject,
			searchPrivateProject : searchPrivateProject,
			searchProject : searchProject,
			getProjectDetail : getProjectDetail,
			ownProject : ownProject,
			shareProject : shareProject,
			transferProject : transferProject,
			quitProject :  quitProject,
			cloneProject : cloneProject,
			stopUpload : stopUpload,
			mergeFileRequest : mergeFileRequest,
			getProjectFounder : getProjectFounder,
			getIntentionInvest : getIntentionInvest,
			getSharedUser : getSharedUser
		};
		function addProject(data) {
			return $http.post(address+'/project/addProject.do',data);
		}

		function addProjectFile(projectId,description,file) {
			return Upload.upload({
				'url': address+'/file/addProjectFile.do',
				'resumeSizeUrl': null,
				'resumeChunkSize': null,
				'data' : {
					'projectId' : projectId,
					'description' : description
				},
				'file' : file
			});
		}

		function addProjectFile2(file) {
			return Upload.upload({
				'url': address+'/file/uploadProjectFileChunk.do',
				'resumeSizeUrl': address+'/file/uploadProjectFileChunk.do?token='+$localStorage.token,
				'resumeChunkSize': globalchunksize,
				'data' : {
				},
				'file' : file
			});
		}

		function mergeFileRequest(projectId, file) {
			return $http.post(address+'/file/uploadProjectFileCompleted.do',{
				'projectId':projectId,
				'description':file.description,
				'fileName':file.file.name
			});
		}

		function stopUpload() {
			return $http.post(address+'/file/stopUpload.do',{
				'target':'all'
			});
		}

		function searchPublicProject(pageNumber,pageSize,name,areaId,categoryId,roundId) {
			return $http.post(address+'/project/searchPublicProject.do',{
				'pageNumber' :  pageNumber,
				'pageSize' :  pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId
			});
		}
		function searchPrivateProject(pageNumber,pageSize,name,areaId,categoryId,roundId,status) {
			return $http.post(address+'/project/searchPrivateProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' :  pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId,
				'status' : status
			});
		}
		function searchProject(pageNumber,pageSize,name,areaId,categoryId,roundId,status) {
			return $http.post(address+'/project/searchProject.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize,
				'name' : name,
				'areaId' : areaId,
				'categoryId' : categoryId,
				'roundId' : roundId,
				'status' : status
			});
		}

		function getProjectDetail(projectId) {
			return $http.post(address+'/project/getDetail.do',{
				'projectId' : projectId
			});
		}

		function ownProject(projectId) {
			return $http.post(address+'/user/ownProject.do',{
				'projectId' : projectId
			});
		}

		function shareProject(projectId, sharedUserId) {
			return $http.post(address+'/user/shareProject.do',{
				'projectId' : projectId,
				'sharedUserId' : sharedUserId
			});
		}

		function transferProject(projectId, transferUserId) {
			return $http.post(address+'/user/transferProject.do',{
				'projectId' : projectId,
				'transferUserId' : transferUserId
			});
		}

		function quitProject(data) {
			return $http.post(address+'/invest/quit.do',data);
		}

		function cloneProject(projectId) {
			return $http.post(address+'/project/copyProject.do',{
				'projectId' : projectId
			});
		}

		function getProjectFounder(projectId) {
			return $http.post(address+'/people/getProjectFounder.do',{
				'projectId' : projectId
			});
		}

		function getIntentionInvest(projectId) {
			return $http.post(address+'/invest/getIntentionInvest.do', {
				'projectId' : projectId
			});
		}

		function getSharedUser(projectId) {
			return $http.post(address+'/project/getSharedUser.do',{
				'projectId' : projectId
			});
		}

	}
'use strict';

angular.module('shady')
	.controller('publicdetailController',publicdetailController);
	publicdetailController.$inject = ['$stateParams','privateService','projectService','$state','dashboardService'];
	function publicdetailController($stateParams,privateService,projectService,$state,dashboardService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly=true;
		vm.projectId = $stateParams.projectId;
		vm.loaddetail = loaddetail;
		vm.ownProject = ownProject;
		vm.show1 = show1;
		vm.show2 = show2;
		vm.show3 = show3;
		vm.show4 = show4;
		vm.showfile = showfile;
		vm.index = 0;
		vm.pageSize = 5;
		vm.pageNumber = 1;
		function show1 () {
			vm.index = 0;
		}
		function show2(){
			vm.index = 1;
		}
		function show3(){
			vm.index = 2;
		}
		function show4(){
			vm.index = 3;
		}
		function showfile() {
			dashboardService.getProjectFile(vm.projectId,vm.pageSize,vm.pageNumber)
			.success(function(data) {
				if (data.retCode === 1) {
					console.log(data);
					vm.filelist = data.result.list;
					vm.total = data.result.total;
				}
			})
			.error(function(error) {
				vm.filelist = [];
				vm.total = 0;
			});
		}

		function loaddetail() {
			privateService.getDetail(vm.projectId)
			.success(function(data) {
				if(data.retCode === 1) {
					vm.project = data.result;
					if (vm.project.tag) {
						vm.tags = vm.project.tag.split(";");
					}	
				}
			})
			.error(function(error) {
			});

			projectService.getProjectFounder(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.founderlist = data.result.founder;
				}
			})
			.error(function(error) {
				vm.founderlist = [];
			});

			projectService.getIntentionInvest(vm.projectId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.intentioninvest = data.result;
				}
			})
			.error(function(error) {
			});

			vm.showfile();
		}

		function ownProject() {
			projectService.ownProject(vm.projectId)
			.success(function (data) {
				if (data.retCode === 1) {
					$state.go("main.publicproject");
				}
				else {
				}
			})
			.error(function (error) {
			});
		}


	}
'use strict';

angular
	.module('shady')
	.controller('myaccountController', myaccountController);
	myaccountController.$inject = ['usermanageService','errorService'];
	function myaccountController (usermanageService,errorService) {
		/* jshint validthis: true */
		var vm=this;
		vm.readonly = true;
		vm.taggle = taggle;
		vm.load = load;
		vm.save = save;
		vm.load();
		function load() {
			usermanageService.getUserProfile()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.realName = data.result.realName;
					vm.position = data.result.position;
				}
			})
			.error(function(error) {
			});

		}
		function taggle (){
			vm.readonly = !vm.readonly;
		}

		function save() {
			var param = {};
			param.position = vm.position;
			param.realName = vm.realName;
			if (vm.password !== "") {
				param.password = vm.password;
			}
			usermanageService.editUserProfile(param)
			.success(function(data) {
				if (data.retCode === 1) {
					errorService.errorModal("更新成功");
					vm.password = "";
				}
			})
			.error(function(error) {
			});
		}
	}
'use strict';

angular
	.module('shady')
	.controller('manageuserController', manageuserController);
	manageuserController.$inject = ['$scope','usermanageService','$timeout','constantService'];
	function manageuserController ($scope,usermanageService,$timeout,constantService) {
		/* jshint validthis: true */
		var vm=this;
		vm.showindex = 1;
		vm.show = show;
		vm.msg = "";
		vm.changePass = changePass;
		vm.addUser = addUser;
		vm.addCategory = addCategory;
		vm.pageNumber = 1;
		vm.pageSize = 10;
		vm.activeUser = activeUser;
		vm.deactiveUser = deactiveUser;
		vm.upUser = upUser;
		vm.downUser = downUser;
		vm.showUser = showUser;
		vm.showCategory = showCategory;
		vm.loadselect = loadselect;
		vm.show(1);
		function show(index) {
			vm.showindex = index;
			if (index === 1) {
				vm.loadselect();
			}
			if (index === 3) {
				vm.showUser();
			}
			if (index ===4) {
				vm.showCategory();
			}
		}

		function changePass(password) {
			usermanageService.changePassword(password)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.msg = data.retMsg;
				}
				else if(data.retCode === -1){
					vm.msg = data.retMsg;
				}
				$timeout(function() {
					vm.msg = "";
				},1000);


			})
			.error(function(error) {
				console.log("error");
			});
		}

		function addUser(user) {
			usermanageService.addUser(user)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.user = {};
					vm.addMsg = data.retMsg;
				}
				else {
					vm.addMsg = data.retMsg;
				}
				$timeout(function() {
					vm.addMsg = "";
				},1000);
			})
			.error(function(error) {
				console.log("error");
			});
		}
			
		function addCategory(categoryName){
			usermanageService.addCategory(categoryName)
			.success(function(data) {
				if(data.retCode===1){
					vm.categoryName = "";
					vm.categoryMsg=data.retMsg;
					vm.showCategory();			
				}
				else{
					vm.categoryMsg=data.retMsg;
				}
				$timeout(function() {
					vm.categoryMsg = "";
				},1000);
			});
		}

		function deactiveUser(userId) {
			usermanageService.deactiveUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function activeUser(userId) {
			usermanageService.activeUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function upUser(userId) {
			usermanageService.upUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function(error) {
			});
		}

		function downUser(userId) {
			usermanageService.downUser(userId)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.showUser();
				}
				else if (data.retCode === -1) {
				}
			})
			.error(function (error){
			});
		}

		function loadselect() {
			usermanageService.getAllUserInfo()
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result;
					vm.targetUserId = vm.userlist[0].userId;
				}
			})
			.error(function(error) {
				vm.userlist = [];
			});
		}

		function showUser() {
			usermanageService.getUserList(vm.pageNumber,vm.pageSize)
			.success(function(data) {
				if (data.retCode === 1) {
					vm.userlist = data.result.list;
					vm.total = data.result.total;
				}
				else {
					vm.userlist = [];
					vm.total = 0;
				}

			})
			.error(function(error) {
				vm.userlist = [];
				vm.total = 0;
			});
		}

		function showCategory() {
			constantService.getCategory()
			.success(function(data) {
				if (data.retCode  === 1) {
					vm.categorylist = data.result;
				}
			})
			.error(function() {
				vm.categorylist = [];
			});
		}

	}
'use strict';

angular.module('shady')
	.factory('usermanageService',usermanageService);
	usermanageService.$inject = ['$http','address'];
	function usermanageService($http,address) {
		return {
			changePassword : changePassword,
			modifyPassword : modifyPassword,
			addUser : addUser,
			addCategory : addCategory,
			getUserList : getUserList,
			activeUser : activeUser,
			deactiveUser :  deactiveUser,
			upUser: upUser,
			downUser: downUser,
			getAllUserInfo : getAllUserInfo,
			getUserProfile : getUserProfile,
			editUserProfile : editUserProfile
		};

		function changePassword(newPassword) {
			return $http.post(address+'/user/changePassword.do', {
				'newPassword' : newPassword
			});
		}
		function modifyPassword(userId, newPassword) {
			return $http.post(address+'/user/modifyPassword.do',{
				'userId' : userId,
				'newPassword' : newPassword
			});
		}
		function addUser(user) {
			return $http.post(address+'/user/addUser.do',user);
		}
		function addCategory(categoryName) {
			return $http.post(address+'/constant/addCategory.do', {
				'categoryName' : categoryName
			});
		}
		function getUserList(pageNumber,pageSize) {
			return $http.post(address+'/user/getUserList.do',{
				'pageNumber' : pageNumber,
				'pageSize' : pageSize
			});
		}
		function activeUser(userId) {
			return $http.post(address+'/user/activeUser.do',{
				'userId' :  userId
			});
		}
		function deactiveUser(userId) {
			return $http.post(address+'/user/deactiveUser.do',{
				'userId' :  userId
			});
		}
		function upUser(userId) {
			return $http.post(address+'/user/upUser.do',{
				'userId': userId
			});
		}
		function downUser(userId) {
			return $http.post(address+'/user/downUser.do',{
				'userId': userId
			});
		}
		function getAllUserInfo() {
			return $http.post(address+'/user/getAllUserInfo.do',{});
		}
		function getUserProfile() {
			return $http.post(address+'/user/getUserProfile.do',{});
		}
		function editUserProfile(param) {
			return $http.post(address+'/user/editUserProfile.do',param);
		}
	}})();