// alert("begin");

var vehicles = [
    {
        "vehicleId": "0xb7a500a91521c642bd7e6a8a9ec3d9d933411101",
        "vehiclePosition": "wx4erxhzekd"
    }
]

var gotPosition = [
    "wx4erxhzekd0",
    "wx4erxhzekd1",
    "wx4erxhzekd2",
    "wx4erxhzekd3",
    "wx4erxhzekd4",
]

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}

console.log("begin");
console.log("VP0=",vehicles[0].vehiclePosition);

for(var i=0;i<5;++i){    
    sleep(1000);
    console.log("i=",i);
    vehicles[0].vehiclePosition = gotPosition[i];
    console.log("VP1=",vehicles[0].vehiclePosition);
}

console.log("VP2=",vehicles[0].vehiclePosition);

console.log("end");

// alert("end");
// Implemented automated modification of location in this JSfile  --msj
// To run this JSfile, you should open the terminal, and input:
// 'mmm@myLinux:~/investigation-cjzhuang2020/cjz_underg_2021_09$ node vehicles_msj.js'
