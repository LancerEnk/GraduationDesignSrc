	pragma solidity ^0.5.16;

	contract StoreMap{
		// 存储地图信息
		struct one_type
		{	
			int64 minzoom;
			int64 cost;
			bool  oneway;
			bool  building; 
			bytes32 highway;
			bytes32 name;   //名称 
			int64 source;
			int64 target;
			bytes32 gtype;
			uint256 path_num;
			mapping(uint256 => bytes32) path;
		}
		//gid->one_type,store real types
		mapping(uint256 => one_type) types;
		// 区域道路结构体,用于存储区域内的道路信息
		struct  area_types{
			uint256 num;
			// num->gid,store gids of roads in the area
			mapping(uint256 => uint256) types_list;
		}
		// 对称
		mapping(bytes32 => area_types) public geo_maps;

		//-----------------cjz--------------------------------------------------
		//每个邻居节点的结构
		struct adj
		{	
			bytes32 sourceGeohash;
			bytes32 targetGeohash;
			int64 target;
			int64 cost;
			int64 gid;
		}
		//遍历邻居列表能够找到所有邻居
		struct adj_types{
			uint256 adjnum;
			mapping (uint256 => adj) adjs;
		}
		//通过路口geohash找到其邻居列表
		mapping(bytes32 => adj_types) public adjacencyList;

		//参数P
		uint256 P = 1;

		struct pathType{
			uint256 num;
			mapping(uint256 => bytes32) index;
			mapping(bytes32 => bytes32) map;
		}
		struct costSofarType{
			uint256 num;
			mapping(uint256 => bytes32) index;
			mapping(bytes32 => uint256) map;
		}
		//记录每个节点的父节点
		pathType paths;
		//记录起点到当前节点的实际费用
		costSofarType costSofar;
		//-----------------cjz--------------------------------------------------
        uint256 deltaLat10 = 596496069;
        uint256[] deltaLon10 = [1191555127, 1180079800,1157239659,1123254668,1078452120,1023263489,958220271,883948868,801164554,710664587,613320532,510069865,401906947,289873444,175048303,58537350];
        uint256 deltaLat9 = 4771968552;
        uint256[] deltaLon9 = [4766220508,4720319200,4628958636,4493018672,4313808480,4093053956,3832881084,3535795472,3204658216,2842658348,1607627788,1159493776,700193212,234149400];
        uint256 deltaLat8 = 19087874208;
        uint256[] deltaLon8 = [38129764064,37762553600,37031669088,35944149376,34510467840,32744431648,30663048672,28286363776,25637265728,22741266784,19626257024,16322235680,12861022304,9275950208,5601545696,1873195200];
        uint256 deltaLat7 = 152702993664;
        uint256[] deltaLon7 = [152519056256,151050214400,148126676352,143776597504,138041871360,130977726592,122652194688,113145455104,102549062912,90965067136,78505028096,65288942720,51444089216,37103800832,22406182784,7492780800];

		// uint256 deltaLat10 = 596;
        // uint256[] deltaLon10 = [1191, 1180,1157,1123,1078,1023,958,883,801,710,613,510,401,289,175,58];
        // uint256 deltaLat9 = 4771;
        // uint256[] deltaLon9 = [4766,4720,4628,4493,4313,4093,3832,3535,3204,2842,1607,1159,700,234];
        // uint256 deltaLat8 = 19087;
        // uint256[] deltaLon8 = [38129,37762,37031,35944,34510,32744,30663,28286,25637,22741,19626,16322,12861,9275,5601,1873];
        // uint256 deltaLat7 = 152702;
        // uint256[] deltaLon7 = [152519,151050,148126,143776,138041,130977,122652,113145,102549,90965,78505,65288,51444,37103,22406,7492];



		// 获取对应geohash区域内所有道路信息
		function get_types(bytes32 hash) view public returns (int64[] memory feature, bytes32[] memory names, bytes32[] memory highways, bytes32[] memory gtypes, bytes32[] memory path) {
			uint256 num = geo_maps[hash].num;
			uint256 path_num = 0;
			//different parm in different domain may cause duplicate declare error when compile, maybe a bug
			uint256 i;

			if(num > 0){
				feature = new int64[](7 * num);
				names = new bytes32[]( num );
				highways = new bytes32[]( num );
				gtypes = new bytes32[]( num );
				uint256 gid;
				for(i=0; i < num; i++){
					gid = geo_maps[hash].types_list[i]; 
					one_type storage single_type = types[gid];
					uint256 base = i * 7;
					feature[base] = int64(gid);
					feature[base + 1] = single_type.minzoom;
					feature[base + 2] = single_type.cost;
					feature[base + 3] = single_type.source;
					feature[base + 4] = single_type.target;
					if(single_type.oneway){
						feature[base + 5] = 1;
					}
					else{
						feature[base + 5] = 0;
					}
					if(single_type.building){
						feature[base + 6] = 1;
					}
					else{
						feature[base + 6] = 0;
					}
					path_num = path_num + 1 + single_type.path_num;
					names[i] = single_type.name;
					highways[i] = single_type.highway;
					gtypes[i] = single_type.gtype;
				}
				path = new bytes32[](path_num);
				uint256 pos = 0;
				for(i=0; i< num; i++){
					gid = geo_maps[hash].types_list[i];
					//may cause duplicate declare, don't know why
					one_type storage single_type2 = types[gid];
					path[pos++] = bytes32(single_type2.path_num);
					for(uint256 j=0; j< single_type2.path_num; j++){
						path[pos++] = single_type2.path[j];
					}
				}
			}
		}

		// 添加一条
		function add_onetype(uint256 gid, int64 minzoom, int64 cost, int64 source, int64 target, bool oneway, bool building, bytes32 highway, bytes32 name, bytes32 gtype, bytes32[] memory path) public {
			types[gid].minzoom = minzoom;
			types[gid].cost = cost;
			types[gid].source = source;
			types[gid].target = target;
			types[gid].oneway = oneway;
			types[gid].building = building;
			types[gid].highway = highway;
			types[gid].name = name;
			types[gid].gtype = gtype;

			adjacencyList[path[0]].adjs[adjacencyList[path[0]].adjnum].sourceGeohash = path[0];
			adjacencyList[path[0]].adjs[adjacencyList[path[0]].adjnum].targetGeohash = path[path.length - 1];
			adjacencyList[path[0]].adjs[adjacencyList[path[0]].adjnum].target = target;
			adjacencyList[path[0]].adjs[adjacencyList[path[0]].adjnum].cost = cost;
			adjacencyList[path[0]].adjs[adjacencyList[path[0]].adjnum++].gid = int64(gid);

			uint256 num = types[gid].path_num;
			for(uint256 i=0; i< path.length; i++){
				types[gid].path[num++] = path[i];
			}
			types[gid].path_num = num;
		}

		//bind a line to an area 
		function add_area_line(bytes32 hash, uint256 gid) public {
			uint256 num = geo_maps[hash].num++;
			geo_maps[hash].types_list[num] = gid;
		}
		//astar算法主流程逻辑
		function astar(bytes32 startGeohash, bytes32 endGeohash) public returns(bytes32[] memory backwards, uint256 costAll, uint256 searchNum, uint256 u2){
            uint256 u1 = gasleft();
			enqueue(startGeohash, 0);
			costSofar.map[startGeohash] = 0;
			costSofar.index[costSofar.num] = startGeohash;
			costSofar.num++;
			bytes32 currentGeohash;
			uint256 priority;
            searchNum = 0;
			while (frontier.geohashs.length > 1) {
				currentGeohash = top();
				//remove smallest item
				dequeue();
				adj_types storage adjNodes = adjacencyList[currentGeohash];
				if (currentGeohash == endGeohash) {
					costAll = costSofar.map[currentGeohash];
					//处理paths获得最短路径
					bytes32 current = endGeohash;
					backwards = new bytes32[](paths.num + 2);
					uint256 i = 0;
					while(current != startGeohash){
						backwards[i] = current;
						current = paths.map[current];
						i++;
					}
					backwards[i] = startGeohash;
                    u2 = u1 - gasleft();
					//将结构体清空
					for(uint256 j = 0; j < paths.num; j++){
						delete paths.map[paths.index[j]];
						delete paths.index[j];
					}
					paths.num = 0;
					for(uint256 j = 0; j < costSofar.num; j++){
						delete costSofar.map[costSofar.index[j]];
						delete costSofar.index[j];
					}
					costSofar.num = 0;
					while (frontier.geohashs.length > 1){
						dequeue();
					}
					break;
				}

				for (uint256 i = 0; i < adjNodes.adjnum; i++) {
                    searchNum++;
					uint256 newCost = costSofar.map[currentGeohash] + uint256(adjacencyList[currentGeohash].adjs[i].cost);
					if (costSofar.map[adjNodes.adjs[i].targetGeohash] == 0 || newCost < costSofar.map[adjNodes.adjs[i].targetGeohash]) {
						if(costSofar.map[adjNodes.adjs[i].targetGeohash] == 0){
							costSofar.index[costSofar.num] = adjNodes.adjs[i].targetGeohash;
							costSofar.num++;
						}
						costSofar.map[adjNodes.adjs[i].targetGeohash] = newCost;
						priority = newCost * P + manhattan(adjNodes.adjs[i].targetGeohash, endGeohash);
						enqueue(adjNodes.adjs[i].targetGeohash, priority);
						if(paths.map[adjNodes.adjs[i].targetGeohash] == 0x0000000000000000000000000000000000000000000000000000000000000000){
							paths.index[paths.num] = adjNodes.adjs[i].targetGeohash;
							paths.num++;
						}
						paths.map[adjNodes.adjs[i].targetGeohash] = currentGeohash;
					}
				}
			}
		}
		
		
		function manhattan(bytes32 nextGeohash, bytes32 endGeohash) public view returns (uint256){
            if(nextGeohash == endGeohash){
                return 0;
            }
            //数该长度下的geohash对应的格子数

            string memory tenNext;
		    string memory tenEnd;
		
		    (tenNext, tenEnd) = formatGeoHash(nextGeohash, endGeohash);

            uint256 dislat1 = getLatBlock(tenNext);
            uint256 dislat2 = getLatBlock(tenEnd);
            uint256 dislon1 = getLonBlock(tenNext);
            uint256 dislon2 = getLonBlock(tenEnd);
            
            uint256 dislat;
            uint256 dislon;

            uint256 deltaLat = getLatDelta();
            uint256 deltaLon = getLonDelta(nextGeohash);
            if(dislat2 > dislat1){
                dislat = dislat2 - dislat1;
            }else{
                dislat = dislat1 - dislat2;
            }
            if(dislon2 > dislon1){
                dislon = dislon2 - dislon1;
            }else{
                dislon = dislon1 - dislon2;
            }
            return (dislat*deltaLat + dislon*deltaLon);
        }

        function formatGeoHash(bytes32 geohash1, bytes32 geohash2) public pure returns (string memory, string memory){
            uint256 index = 0;
            bytes memory tenGeo1 = new bytes(10);
            bytes memory tenGeo2 = new bytes(10);
            for (uint256 i = 0; i < 10; i++) {
                tenGeo1[index] = geohash1[i];
                tenGeo2[index] = geohash2[i];
                index++;
            }
            return (string(tenGeo1), string(tenGeo2));
        }
		
		//前缀匹配，geohash精度调整为10
		uint256 PRECISION = 10;
		function changePrecision(uint256 newPrecision) public returns (uint256){
			PRECISION = newPrecision;
			return PRECISION;
		}
		
		uint256[] Bits = [16, 8, 4, 2, 1];
		string Base32 = "0123456789bcdefghjkmnpqrstuvwxyz";
		//geohash在纬度上的块数
		function getLatBlock(string memory geohash) public view returns (uint256) {
            //geohash纬度
            bool even = true;
            uint256 lat = 0;
            for (uint256 i = 0; i < bytes(geohash).length; i++) {
                byte c = bytes(geohash)[i];
                uint256 cd;
                for (uint256 j = 0; j < bytes(Base32).length; j++) {
                    if (bytes(Base32)[j] == c) {
                        cd = j;
                        break;
                    }
                }
                for (uint256 j = 0; j < 5; j++) {
                    uint256 mask = Bits[j];
                    if (!even) {
                        lat = lat * 2;
                        if ((cd & mask) != 0) {
                            lat = lat + 1;
                        }
                    }
                    even = !even;
                }
            }
            return lat;
        }
        //geohash在经度上的块数
        function getLonBlock(string memory geohash) public view returns (uint256) {
            //geohash经度
            bool even = true;
            uint256 lon = 0;
            for (uint256 i = 0; i < bytes(geohash).length; i++) {
                byte c = bytes(geohash)[i];
                uint256 cd;
                for (uint256 j = 0; j < bytes(Base32).length; j++) {
                    if (bytes(Base32)[j] == c) {
                        cd = j;
                        break;
                    }
                }
                for (uint256 j = 0; j < 5; j++) {
                    uint256 mask = Bits[j];
                    if (even) {
                        lon = lon * 2;
                        if ((cd & mask) != 0) {
                            lon = lon + 1;
                        }
                    }
                    even = !even;
                }
            }
            return lon;
        }
        uint256 divnum = 4;
        function getLonDelta(bytes32 geohash) public view returns (uint256){
            uint256 index = 0;
            bytes memory geo = new bytes(2);
            for (uint256 i = 0; i < 2; i++) {
                geo[index] = geohash[i];
                index++;
            }
            uint256 lat = getLatBlock(string(geo));
            // lat = lat >> (PRECISION * 5 / 2 - (divnum + 1));
            if ((lat & (1 << divnum)) != (1 << divnum)) {
                lat = (1 << (divnum + 1) - 1) - lat;
            }
            lat = lat - (1 << divnum);
            if(PRECISION == 7){
                return deltaLon7[lat];
            }else if(PRECISION == 8){
                return deltaLon8[lat];
            }else if(PRECISION == 9){
                return deltaLon9[lat];
            }else if(PRECISION == 10){
                return deltaLon10[lat];
            }
            return lat;
        }
        function getLatDelta() public view returns (uint256){
            if(PRECISION == 7){
                return deltaLat7;
            }else if(PRECISION == 8){
                return deltaLat8;
            }else if(PRECISION == 9){
                return deltaLat9;
            }else if(PRECISION == 10){
                return deltaLat10;
            }
        }
		
		//实现优先队列
		struct Heap {
			bytes32[] geohashs;
			mapping(bytes32 => uint256) map;
		}
		//唯一实例
		Heap frontier;
		//判断是否为空
		modifier notEmpty() {
			require(frontier.geohashs.length > 1);
			_;
		}
		//获得头元素
		function top() public view notEmpty() returns(bytes32) {
			return frontier.geohashs[1];
		}
		//出队（直接删除无返回值）
		function dequeue() public notEmpty(){
			require(frontier.geohashs.length > 1);
			
			bytes32 toReturn = top();
			frontier.geohashs[1] = frontier.geohashs[frontier.geohashs.length - 1];
			frontier.geohashs.pop();

			uint256 i = 1;

			while (i * 2 < frontier.geohashs.length) {
				uint256 j = i * 2;

				if (j + 1 < frontier.geohashs.length)
					if (frontier.map[frontier.geohashs[j]] > frontier.map[frontier.geohashs[j + 1]]) 
						j++;
				
				if (frontier.map[frontier.geohashs[i]] < frontier.map[frontier.geohashs[j]])
					break;
				
				(frontier.geohashs[i], frontier.geohashs[j]) = (frontier.geohashs[j], frontier.geohashs[i]);
				i = j;
			}
			delete frontier.map[toReturn];
		}
		//入队
		function enqueue(bytes32 geohash, uint256 cost) public {
			if (frontier.geohashs.length == 0) 
				// initialize
				frontier.geohashs.push(0x0000000000000000000000000000000000000000000000000000000000000000); 
			
			frontier.geohashs.push(geohash);
			frontier.map[geohash] = cost;
			uint256 i = frontier.geohashs.length - 1;
			while (i > 1 && frontier.map[frontier.geohashs[i / 2]] > frontier.map[frontier.geohashs[i]]) {
				(frontier.geohashs[i / 2], frontier.geohashs[i]) = (geohash, frontier.geohashs[i / 2]);
				i /= 2;
			}
		}
	}