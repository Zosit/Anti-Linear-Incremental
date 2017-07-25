/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */







//Resource Generation
function ClearAllResources() {
	genPos(-positivity.value);
	genPosGen(-positivityGen.value);
	negativity.value = 0;
	genPre(-pressure.value);
	genPreGen(-pressureGen.value);
}

function genPos(num) {
	var oldVal = positivity.value;
	positivity.value += num;
	if(positivity.value < 0) {
		positivity.value = 0;
	}
	if(positivity.value > positivityCap.value) {
		positivity.value = positivityCap.value;
	}
	ResourceScreenUpdate(positivity, "positivity");
	ResourceCapScreenUpdate(positivityCap, "positivity");
}

function genPosGen(num) {
	positivityGen.value += num;
	ResourceScreenUpdate(positivityGen, "positivityGenerator");
	posGenCostUpdate();
}

function genNeg(num) {
	if(negativityUnlocked == 1) {


		negativity.value += num;
		if(negativity.value < 0) {
			negativity.value = 0;
		}
		if(negativity.value > negativityCap.value) {
			negativity.value = negativityCap.value;
		}
		var oldNeg = negativity.value;
		ClearAllResources();
		negativity.value = oldNeg;
	
		ResourceScreenUpdate(negativity, "negativity");
		ResourceCapScreenUpdate(negativityCap, "negativity");
	}
}

function genPre(num) {

	//not enough positivity
	if(pressureUnlocked == 1) {
		pressure.value += num;
		
		if(pressure.value <= 0) {
			pressure.value = 0;
			pressureDirection.value = 1;
		}
		if(pressure.value >= pressureCap.value) {
			pressure.value = pressureCap.value;
			pressureDirection.value = -1;
		}
		ResourceScreenUpdate(pressure, "pressure");
		ResourceCapScreenUpdate(pressureCap, "pressure");
	}
}

function genEle(num) {

	//not enough positivity
	if(dynamoUnlocked == 1) {
		electricity.value += num;
		

		ResourceScreenUpdate(electricity, "electricity");
		ResourceCapScreenUpdate(electricityCap, "electricity");
	}
}


function genPreGen(num) {
	pressureGen.value += num;
	if(pressureGen.value <= 0) {
		pressureGen.value = 0;
	}

	/*if(pressureGen.value >= pressureGenCap.value) {
		pressureGen.value = pressureGenCap.value;
	}*/
}
