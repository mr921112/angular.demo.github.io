//模块名字
var filters = angular.module("customFiler",[]);
//过滤器名字
filters.filter("unique",function(){
	return function(container,property){
		if(angular.isArray(container)){
			var arr = [];
			for(var i = 0;i < container.length;i++){
				//判断arr里面有没有某个分类
				//取出原数组的每个元素
				var obj1 = container[i];
				for(var j = 0; j < arr.length;j++){
					var obj2 = arr[j];
					if(obj1[property]==obj2[property]){
						break;
					}
				}
				if(j==arr.length){
					arr.push(obj1);
				}	
			}
			return arr;
		}else{
			return;
		}
	}
});
