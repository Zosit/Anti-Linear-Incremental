/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */




function boostCaps() {
		positivityCap.value *= 10;
		pressureCap.value *= 10;
}

//research functions
function researchNegativity() {
	//if(positivity.value >= 10) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 1;

		negativityUnlocked = 1;
		revealHTML("decNeg");
		revealHTML("incNeg");
		hideHTML("resNeg");
	//}
}

function researchPressure() {
	//if(positivity.value >= 100 && negativity.value >= 1) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 5;

		pressureUnlocked = 1;
		pressureDirection.value = 1;
		revealHTML("decPre");
		revealHTML("incPre");
		hideHTML("resPre");
	//}
}

function researchDynamo() {
	//if(positivity.value >= 1000 && pressure.value >= 1000 && negativity.value >= 5) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 10;

		dynamoUnlocked = 1;
		revealHTML("decBat");
		revealHTML("incBat");
		revealHTML("decElePos");
		revealHTML("incElePos");
		revealHTML("decMult");
		revealHTML("incMult");
		hideHTML("resEle");
	//}
}

function researchMarket() {
	if(positivity.value >= 10000 && pressure.value >= 10000 && negativity.value >= 10) {
		ClearAllResources();
		boostCaps();
		negativityCap.value = 15;

		marketUnlocked = 1;
	}
}
