
geohash1 = "wx4enbr8jh1";
geohash2 = "wx4dyzz9ttg";

// geohash1: the lat and lon is [116.3227718,39.9037387]
// geohash2: the lat and lon is [116.3227968,39.9012597]

var Bits = [16, 8, 4, 2, 1];
var Base32 = "0123456789bcdefghjkmnpqrstuvwxyz".split("");
var ans = new Array(new Array,new Array);
var pickUpcoord1 = [];
pickUpcoord1 = decode_geohash(geohash1);
var pickUpgeo1 = [];
pickUpgeo1[0] = (pickUpcoord1[0]+pickUpcoord1[1])/2;
pickUpgeo1[1] = (pickUpcoord1[2]+pickUpcoord1[3])/2;
var pickUpcoord2 = [];
pickUpcoord2 = decode_geohash(geohash2);
var pickUpgeo2 = [];
pickUpgeo2[0] = (pickUpcoord2[0]+pickUpcoord2[1])/2;
pickUpgeo2[1] = (pickUpcoord2[2]+pickUpcoord2[3])/2;
ans[0] = pickUpgeo1;
ans[1] = pickUpgeo2;
console.log(ans);

function RefineInterval(interval, cd, mask)
{
	if ((cd & mask) != 0)
	{
		interval[0] = (interval[0] + interval[1])/2;
	}
	else
	{
		interval[1] = (interval[0] + interval[1])/2;
	}
}

function decode_geohash(geohash)
{
	var even = true;
    var lat = [-90,90];
	var lon = [-180,180];

	for(var i=0; i< geohash.length; i++)
	{
		var c= geohash[i];
		var cd = Base32.indexOf(c);
		for (var j = 0; j < 5; j++)
		{
			var mask = Bits[j];
			if (even)
			{
				RefineInterval(lon, cd, mask);
			}
			else
			{
				RefineInterval(lat, cd, mask);
			}
			even = !even;
		}
	}

	return new Array(lat[0], lat[1], lon[0], lon[1]);
}
