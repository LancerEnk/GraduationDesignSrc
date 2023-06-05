// 经纬度计算的代码
// 输入经纬度，输出结果。
// 经度  Longitude
// 纬度 latitude

// change the data 
var a = 116.22679 ;
var b = 39.729034 ;
var c = 116.225771 ;
var d = 39.739102 ;
// begin to calculate
function getDistanceBtwP(LatA, LonA, LatB, LonB)//根据两点经纬度计算距离(m),X经度，Y纬度
{
    var radLng1 = LatA * Math.PI / 180.0; 
    var radLng2 = LatB * Math.PI / 180.0;
    var a = radLng1 - radLng2;  
    var b = (LonA - LonB) * Math.PI/ 180.0;  
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)+ Math.cos(radLng1) * Math.cos(radLng2) * Math.pow(Math.sin(b / 2), 2))) * 6378.137; //返回单位为公里  
    // console.log("s=",s);			// --msj
    return s * 1000;  
}

var ans = getDistanceBtwP(a,b,c,d);
console.log("distance = ", ans, " m");
