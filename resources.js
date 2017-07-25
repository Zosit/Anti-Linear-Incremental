/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */

//Resources
class resource {
	constructor(value) {
		this.value = value
		this.initialValue = value;
	}
};


var positivity = new resource(0);
var positivityCap = new resource(10);
var positivityGen = new resource(0);
var positivityGenCost = new resource(10);
var positivityVelocity = new resource(0);

var negativityUnlocked = 0;
var negativity = new resource(0);
var negativityCap = new resource(10);

var pressureUnlocked = 0;
var pressure = new resource(0);
var pressureCap = new resource(10);
var pressureGen = new resource(0);
var pressureVelocity = new resource(0);
var pressureDirection = new resource(0);

var dynamoUnlocked = 0;
var electricity = new resource(0);
var electricityVelocity = new resource(0);
var electricityRatioIdle = new resource(40);
var electricityRatioPosGen = new resource(50);
var electricityRatioBattery = new resource(10);
var electricityCap = new resource(0);
