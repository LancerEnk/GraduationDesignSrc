const { time } = require('console');
let fs=require('fs');
let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));

//Map contract
let mapContractAddress = '0x34261f66636e62cb1297f712857a9d90d43e6bc8';
let mapContractAbi = JSON.parse(fs.readFileSync('./mapAbi_new.json', 'utf-8'));
let mapContract = new web3.eth.Contract(mapContractAbi,mapContractAddress);

//Traffic contract
let trafficContractAddress = '0x16e693e2211f0587ea095464f7d869b0aebfe00e';
let trafficContractAbi = JSON.parse(fs.readFileSync('./trafficAbi.json', 'utf-8'));
let trafficContract = new web3.eth.Contract(trafficContractAbi,trafficContractAddress);

let vehicleIdList=["0x12d0e4381ef94a70a49252e35b9a65fadd3872b9"];
let vehiclePositionList =["wx4erjmbekd"];

let allVehicleMessage = [];

let timeInfo={};
let pathInfo={};
let gasInfo={};
let time_init_1, time_init_2,time_distribute,time_navigate,time_getOn,time_pay,time_reset,time_up;
let allTimeInfo=[];
let astarInfo={};

async function initVehicle(){

    const task = [];
    for(let i = 0; i < vehicleIdList.length; i++){
        task.push(initUnit(vehicleIdList[i], vehiclePositionList[i]));
    }
    Promise.all(task).then((res) => {
        console.log("所有车辆都上传了位置")
    })
}
fs.writeFileSync("./vehicleTimeInfo_new.json","[",{flag:'w',encoding:'utf-8',mode:'0666'},function(err){});
fs.writeFileSync("./wayInfo_new.json","[",{flag:'w',encoding:'utf-8',mode:'0666'},function(err){});
initVehicle();
// deleteVehicle();
// getVehicleIdList();

let countNum = 0;
let systemNum = 50;//系统要测试多少订单


async function initUnit(vehicleId, vehiclePosition){
    let vehicleMessage = {};

    //event
	trafficContract.events.Myevent(function(error, event){
		if(error != null){
			console.log("Myevent_error: ",error);
		}
		//whether to pick up the passenger
		if(event.returnValues.vehicleId.slice(0,42) == vehicleId.toLowerCase()){
			// console.log(event);
            time_distribute=Date.now();

			let passengerId = event.returnValues.passengerId;
			let passengerGeohash = web3.utils.hexToAscii(event.returnValues.passengerGeohash).slice(0,11);
            console.log(vehicleId,"接到了订单,乘客位置: ", passengerGeohash);
            console.log("乘客id: ", passengerId);
            
            vehicleMessage.passengerId = passengerId;
            vehicleMessage.passengerGeohash = passengerGeohash;
			timeInfo.distribute=time_distribute-time_init_2;

			pickUp(vehicleId, vehiclePosition, passengerId, passengerGeohash, vehicleMessage);
		}
	})
    //监听乘客付款事件
	trafficContract.events.payEvent(function(error, event){
		if(error != null){
			console.log("payEvent_error: ",error);
		}
		if(event.returnValues.vehicleId.slice(0,42) == vehicleId.toLowerCase()){
			// console.log("payEvent: " + vehicleId + "乘客已付款");
			time_pay=Date.now();
			timeInfo.pay=time_pay-time_navigate;

            trafficContract.methods.initVehicle(vehicleId, web3.utils.asciiToHex(vehicleMessage.endGeohash)).send({from: vehicleId, gas: 500000,position: vehicleMessage.endGeohash, txtime:Date.now()}).then(function(result){
                console.log("置状态为空车");
                vehiclePosition = vehicleMessage.endGeohash;
                allVehicleMessage.push(vehicleMessage);

				time_reset=Date.now();
				timeInfo.reset=time_reset-time_pay;
				time_init_2=Date.now();
				allTimeInfo.push(timeInfo);
                countNum++;
				console.log("count: " +countNum)
				console.log(timeInfo);
				console.log(pathInfo);
				fs.writeFileSync("./vehicleTimeInfo_new.json",JSON.stringify(gasInfo),{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				fs.writeFileSync("./vehicleTimeInfo_new.json",",",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				fs.writeFileSync("./vehicleTimeInfo_new.json",JSON.stringify(pathInfo),{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				fs.writeFileSync("./vehicleTimeInfo_new.json",",",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				fs.writeFileSync("./vehicleTimeInfo_new.json",JSON.stringify(timeInfo),{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				fs.writeFileSync("./wayInfo_new.json",JSON.stringify(astarInfo),{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
                if(countNum == systemNum){
					console.log("finish");
					fs.writeFileSync("./vehicleTimeInfo_new.json","]",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
					fs.writeFileSync("./wayInfo_new.json","]",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
					// process.exit(1);
				}else{
					fs.writeFileSync("./vehicleTimeInfo_new.json",",",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
					fs.writeFileSync("./wayInfo_new.json",",",{flag:'a',encoding:'utf-8',mode:'0666'},function(err){});
				}
            })
		}
	})

	//监听乘客上车事件
	trafficContract.events.boardEvent(function(error, event){
		if(error != null){
			console.log("boardEvent_error: ",error);
		}
		if(event.returnValues.vehicleId.slice(0,42) == vehicleId.toLowerCase()){
			console.log("boardEvent: " + vehicleId + ",乘客已上车");
			console.log("执行了调度算法,车辆到达乘客所在位置");
			time_getOn=Date.now();
			timeInfo.getOn=time_getOn-time_distribute;
			// the question? test the param of manageToEnd():
    		console.log("vehicleID:",vehicleId,",vehicleMessage.passengerId:",vehicleMessage.passengerId,",vehicleMessage.passengerGeohash:",vehicleMessage.passengerGeohash,",vehicleMessage:",vehicleMessage);
			manageToEnd(vehiclePosition, vehicleId, vehicleMessage.passengerId, vehicleMessage.passengerGeohash, vehicleMessage);
		}
	})

	time_init_1=Date.now();
    return await trafficContract.methods.initVehicle(vehicleId, web3.utils.asciiToHex(vehiclePosition)).send({from: vehicleId, gas: 500000,position: vehiclePosition, txtime:Date.now()}).then(()=>{
		time_init_2=Date.now();
		timeInfo.init=time_init_2-time_init_1;
	});
}

async function deleteVehicle(){
    const task = [];
    for(let i = 0; i < vehicleIdList.length; i++){
        task.push(deleteUnit(vehicleIdList[i]));
    }
    Promise.all(task).then((res) => {
        console.log("所有车辆都注销了")
    })
}
async function deleteUnit(vehicleId){
    return await trafficContract.methods.deleteVehicle(vehicleId).send({from: vehicleId, gas: 50000000,position: "wx411111111111", txtime:Date.now()});
}

//确认接乘客
async function pickUp(vehicleId, vehiclePosition, passengerId, passengerGeohash, vehicleMessage){
	
	if(vehiclePosition == passengerGeohash){
		// store route
		trafficContract.methods.storeRoutes(0,vehicleId, passengerId, []).send({ from: vehicleId, gas: 8000000,position: vehiclePosition, txtime:Date.now()}).then(function(result){
			vehicleGroup = L.layerGroup(vehicleLayers);
			map.addLayer(vehicleGroup);
			console.log("存储路径成功");
		},function(error){
			console.log("存储路径失败:",error);
		});
		time_navigate=Date.now();
		timeInfo.navigateToStart=time_navigate-time_distribute;

        vehicleMessage.emptyAstarTime = 0;
        vehicleMessage.emptyRoute = [];
        vehicleMessage.emptyRouteTime = 0;
        vehicleMessage.countFrag = 0;//经过的路口数量
		astarInfo.pickUp = [];
	}else{
		let astarTime1 = Date.now();
		mapContract.methods.astar(web3.utils.asciiToHex(vehiclePosition), web3.utils.asciiToHex(passengerGeohash)).call({ from: vehicleId, gas: 50000000000}).then(function(result){
			let astarTime2 = Date.now() - astarTime1;
			let countFrag = 0;
			for(let i = 0; i < result[0].length; i++){
				if(result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000"){
					countFrag++;
				}
			}
            let astarOriginRoute = result[0];
			let routeLength = Number(result[1]);
			let gasCost = Number(result[2]);

            trafficContract.methods.storeRoutes(routeLength,vehicleId, passengerId, astarOriginRoute).send({ from: vehicleId, gas: 5000000, position: vehiclePosition, txtime:Date.now()}).then(function(result){
	
				console.log("存储路径成功");
				
			});

			let astarRoute = [];
			for(let i = 0; i < result[0].length; i++){
				if(result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000"){
					let temp = web3.utils.hexToAscii(result[0][i]).slice(0, 11)
					astarRoute.push(temp)
				}
			}
			astarRoute.reverse();

			time_navigate=Date.now();
			timeInfo.navigateToStart=time_navigate-time_distribute;

            vehicleMessage.emptyAstarTime = astarTime2;//获取导航结果的时间
            vehicleMessage.emptyRoute = astarRoute;//导航结果
            vehicleMessage.emptyRouteTime = Math.floor(routeLength / 6000000);//按此导航结果开车的行驶时间,emptyRouteTime单位：毫秒
            vehicleMessage.countFrag = countFrag;//经过的路口数量
			astarInfo.pickUpcostAll = routeLength;
			astarInfo.pickUp = astarRoute;
			gasInfo.gasUsage = gasCost;
			
		}, function(err){
			pickUp(vehicleId, vehiclePosition, passengerId, passengerGeohash, vehicleMessage);
		})
	}
}

async function manageToEnd(vehiclePosition, vehicleId, passengerId, passengerGeohash, vehicleMessage){
	
	//车辆接到乘客后通过合约获得其目的地
	trafficContract.methods.getPassengerEnd(passengerId).call({ from: vehicleId, gas: 50000000}).then(function(result){
		let endGeohash = web3.utils.hexToAscii(result).slice(0, 11);
		console.log("目的地坐标:", endGeohash);

        let astarTime1 = Date.now()
		mapContract.methods.astar(web3.utils.asciiToHex(passengerGeohash), web3.utils.asciiToHex(endGeohash)).call({ from: vehicleId, gas: 50000000000}).then(function(result){
			let astarTime2 = Date.now() - astarTime1;
			let countFrag = 0;
			for(let i = 0; i < result[0].length; i++){
				if(result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000"){
					countFrag++;
				}
			}
			let astarOriginRoute = result[0];
			let routeLength = Number(result[1]);
			trafficContract.methods.storeRoutes(routeLength,vehicleId, passengerId, astarOriginRoute).send({ from: vehicleId, gas: 5000000,position: "wx411111111",txtime:Date.now()}).then(function(result){
				console.log("存储路径成功");
				time_navigate=Date.now();
				timeInfo.navigateToEnd=time_navigate-time_getOn;
	
			});
			let astarRoute = []
			for(let i = 0; i < result[0].length; i++){
				if(result[0][i].toString() != "0x0000000000000000000000000000000000000000000000000000000000000000"){
					let temp = web3.utils.hexToAscii(result[0][i]).slice(0, 11)
					astarRoute.push(temp)
				}
			}
			astarRoute.reverse();

			// --msj to add updatePathSituation()
			let uptime1 = Date.now();
			let debugaroute = [];
			for(let i=0;i<astarRoute.length;i++){
					var str1 = "0x";
					var str2 = "000000000000000000000000000000000000000000";
					let temp = web3.utils.asciiToHex(astarRoute[i]);
					for(let j=2;j<24;j++){
						str1 = str1 + temp[j];
					}
					str1 = str1 + str2;
					debugaroute.push(str1);
			}
			mapContract.methods.printfactspeed(debugaroute).call({from: vehicleId, gas:50000000000}).then(function(result){
				pathInfo.vh=result[0];
				pathInfo.vc=result[1];
				pathInfo.vf=result[2];
				pathInfo.vd=result[3];
			});
			mapContract.methods.updatePathSituation(debugaroute).send({from: vehicleId, gas: 5000000, position: vehiclePosition, txtime: Date.now() }).then(function(result){
				console.log("Update Path Situation");
			},function(error){
				console.log("manageToEnd() - error:",error);
			});
			let uptime = Date.now()-uptime1;
			timeInfo.update = uptime;
			// --msj
            vehicleMessage.endGeohash = endGeohash;
            vehicleMessage.loadAstarTime = astarTime2;//获取导航结果的时间
            vehicleMessage.loadRoute = astarRoute;//导航结果
            vehicleMessage.loadRouteTime = Math.floor(routeLength / 6000000);//按此导航结果开车的行驶时间,emptyRouteTime单位：毫秒
            vehicleMessage.countFrag = countFrag;//经过的路口数量
						astarInfo.manageToEndcostAll = routeLength;
						astarInfo.manageToEnd = astarRoute;
						
		}, function(err){
			console.error("astarErr: ", err);
			manageToEnd(vehiclePosition, vehicleId, vehicleMessage.passengerId, vehicleMessage.passengerGeohash, vehicleMessage);
		})
	})   
}
