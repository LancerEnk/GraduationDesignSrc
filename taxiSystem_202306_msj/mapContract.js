//var mapContractAddress = "0xc7941e7d6da833bc5634d5184bf417042560b9fa";
// geth1
// var mapContractAddress = "0x4a2a01f30a7214a694479f3ecc10faca8fa86e8d";
// geth-tree
var mapContractAddress = "0x3ae00d288251ffaddc2380019ffcb04d6db839a6";
var mapContractServer = 'http://localhost:8545';//of no use
var mapContractAbi = 
// to get data of new A*
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "add_area_line",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			},
			{
				"internalType": "int32",
				"name": "minzoom",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "cost",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "source",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "target",
				"type": "int32"
			},
			{
				"internalType": "bool",
				"name": "oneway",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "building",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "highway",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "gtype",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"name": "add_onetype",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "adjacencyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "adjnum",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "startGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "astar",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "backwards",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "costAll",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gasCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "times",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calPathCostToAdd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calPathSituation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vSpeed",
				"type": "uint256"
			}
		],
		"name": "calPathSpeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "calVehicleSpeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newP",
				"type": "uint256"
			}
		],
		"name": "changeP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrecision",
				"type": "uint256"
			}
		],
		"name": "changePrecision",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "dequeue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "enqueue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "geo_maps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLatBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLonBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "get_types",
		"outputs": [
			{
				"internalType": "int32[]",
				"name": "feature",
				"type": "int32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "names",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "highways",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "gtypes",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nextGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "manhattan",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "printfactspeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vh",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vc",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vf",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vd",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "printgeotogid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "len",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gids",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash1",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash2",
				"type": "bytes32"
			}
		],
		"name": "sliceGeoHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "testgeo",
				"type": "bytes32"
			}
		],
		"name": "testsGtG",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "testgid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "top",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "updatePathSituation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
/* // to get data of old A*
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "add_area_line",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			},
			{
				"internalType": "int32",
				"name": "minzoom",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "cost",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "source",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "target",
				"type": "int32"
			},
			{
				"internalType": "bool",
				"name": "oneway",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "building",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "highway",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "gtype",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"name": "add_onetype",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "adjacencyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "adjnum",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "startGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "astar",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "backwards",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "costAll",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gasCost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newP",
				"type": "uint256"
			}
		],
		"name": "changeP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrecision",
				"type": "uint256"
			}
		],
		"name": "changePrecision",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "dequeue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "enqueue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "geo_maps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLatBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLonBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "get_types",
		"outputs": [
			{
				"internalType": "int32[]",
				"name": "feature",
				"type": "int32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "names",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "highways",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "gtypes",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nextGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "manhattan",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash1",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash2",
				"type": "bytes32"
			}
		],
		"name": "sliceGeoHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "top",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
*/
/* // can use, the new A* without experiment data
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "add_area_line",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			},
			{
				"internalType": "int32",
				"name": "minzoom",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "cost",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "source",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "target",
				"type": "int32"
			},
			{
				"internalType": "bool",
				"name": "oneway",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "building",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "highway",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "gtype",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"name": "add_onetype",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "adjacencyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "adjnum",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "startGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "astar",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "backwards",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "costAll",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "psCost",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "times",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calPathCostToAdd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calPathSituation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vSpeed",
				"type": "uint256"
			}
		],
		"name": "calPathSpeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "calVehicleSpeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newP",
				"type": "uint256"
			}
		],
		"name": "changeP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrecision",
				"type": "uint256"
			}
		],
		"name": "changePrecision",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "dequeue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "enqueue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "geo_maps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLatBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLonBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "get_types",
		"outputs": [
			{
				"internalType": "int32[]",
				"name": "feature",
				"type": "int32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "names",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "highways",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "gtypes",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nextGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "manhattan",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "printfactspeed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vh",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vc",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vf",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vd",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "printgeotogid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "len",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "gids",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash1",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash2",
				"type": "bytes32"
			}
		],
		"name": "sliceGeoHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "testgeo",
				"type": "bytes32"
			}
		],
		"name": "testsGtG",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "testgid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "top",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "astarOriginRoute",
				"type": "bytes32[]"
			}
		],
		"name": "updatePathSituation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
*/
// the old sol_abi
/*
[
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "adjacencyList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "adjnum",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "geo_maps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "get_types",
      "outputs": [
        {
          "internalType": "int32[]",
          "name": "feature",
          "type": "int32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "names",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "highways",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "gtypes",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "path",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gid",
          "type": "uint256"
        },
        {
          "internalType": "int32",
          "name": "minzoom",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "cost",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "source",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "target",
          "type": "int32"
        },
        {
          "internalType": "bool",
          "name": "oneway",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "building",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "highway",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "name",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "gtype",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32[]",
          "name": "path",
          "type": "bytes32[]"
        }
      ],
      "name": "add_onetype",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "hash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "gid",
          "type": "uint256"
        }
      ],
      "name": "add_area_line",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "startGeohash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "endGeohash",
          "type": "bytes32"
        }
      ],
      "name": "astar",
      "outputs": [
        {
          "internalType": "bytes32[]",
          "name": "backwards",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint256",
          "name": "costAll",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "nextGeohash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "endGeohash",
          "type": "bytes32"
        }
      ],
      "name": "manhattan",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newPrecision",
          "type": "uint256"
        }
      ],
      "name": "changePrecision",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newP",
          "type": "uint256"
        }
      ],
      "name": "changeP",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash1",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "geohash2",
          "type": "bytes32"
        }
      ],
      "name": "sliceGeoHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "geohash",
          "type": "string"
        }
      ],
      "name": "getLatBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "geohash",
          "type": "string"
        }
      ],
      "name": "getLonBlock",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "top",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "dequeue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "geohash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        }
      ],
      "name": "enqueue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
*/
