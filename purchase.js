/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */



//Resource Purchase
function buyPosGen(num) {
	if(positivity.value >= positivityGenCost.value) {
		genPos(-positivityGenCost.value);
		genPosGen(num);
	}
	ResourceScreenUpdate(positivityGenCost, "buyPositivityGenerator");
}

//Cost Calculations
function posGenCostUpdate(num) {
	positivityGenCost.value = Math.round(2 * Math.pow(1.05, positivityGen.value));
}
