/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */



//MetaResource Updates
function updateVelocity(){



	//calculate expected pressure change
	//calculate missing positivity needed
	//reduce by missing

	//base positivity value
	var basePositivityVelocity = positivityGen.value;
	//multiply by gens
	if(dynamoUnlocked == 1) {
		if(electricityRatioMult.value == 1) {
			basePositivityVelocity *= 10;
		}
	}

	//reduce positivity by negativity %
	var negativePositivityVelocity = -(negativity.value / 100.0) * positivityCap.value;

	//Check positivity caps and limit velocity
	positivityVelocity.value = basePositivityVelocity + negativePositivityVelocity;
	var positivityVelocityLimit = positivityVelocity.value;
	if(-positivityVelocityLimit > positivity.value) {
		positivityVelocityLimit = -positivity.value;
	}
	if(positivityVelocityLimit + positivity.value > positivityCap.value) {
		positivityVelocityLimit = positivityCap.value - positivity.value;
	}
	positivityVelocity.value = positivityVelocityLimit;


	//base pressure value
	var basePressureVelocity = (pressureGen.value / 100) * pressureCap.value * pressureDirection.value;

	//Check pressure caps and limit velocity
	pressureVelocity.value = basePressureVelocity;
	var pressureVelocityLimit = pressureVelocity.value;
	if(pressureVelocityLimit + pressure.value < 0) {
		pressureVelocityLimit = -pressure.value;
	}
	if(pressureVelocityLimit + pressure.value > pressureCap.value) {
		pressureVelocityLimit = pressureCap.value - pressure.value;
	}
	//case where there is not enough positivity for pressure change
	if(pressureVelocityLimit > positivity.value + positivityVelocity.value && pressureDirection.value == 1) {
		pressureVelocityLimit = positivity.value  + positivityVelocity.value;
	}
	pressureVelocity.value = pressureVelocityLimit;

	//pressure affects positivity
	var pressurePositivityVelocity = -pressureVelocity.value;
	positivityVelocity.value += pressurePositivityVelocity;

	//lastly pull from negativity if needed
	var roundedPressureVelocity = 0;
	if(positivityVelocity.value == -positivity.value && pressureDirection.value == 1) {
		negativePressureVelocity = negativity.value;
	} else {
		negativePressureVelocity = 0;
	}

	pressureVelocity.value += negativePressureVelocity;

	//electricity 
	var roundedPositivityVelocity = 0;
	var roundedPressureVelocity = 0;
	var electricityPositivityVelocity = 0;
	if(dynamoUnlocked == 1) {
		//generate
		roundedPositivityVelocity = Math.abs(Math.round(positivityVelocity.value * 10) / 10);
		roundedPressureVelocity = Math.abs(Math.round(pressureVelocity.value * 10) / 10);
		electricityVelocity.value = (roundedPositivityVelocity + roundedPressureVelocity);
		electricityVelocity.value = Math.round(electricityVelocity.value * 10) / 10;

		//update electricitycap
		electricityCap.value = positivityCap.value * electricityRatioBattery.value;

		//find available charge
		var availableCharge = (electricity.value + electricityVelocity.value) - electricityCap.value
		//check for battery
		if(availableCharge > 0) {
			
			//pos gen
			electricityPositivityVelocity = availableCharge * (electricityRatioPosGen.value)
			electricityPositivityVelocity = Math.round(electricityPositivityVelocity * 10) / 10;
			var positiveElectricity = electricityPositivityVelocity;



			positivityVelocity.value += positiveElectricity;


			//Drain to battery cap
			electricityVelocity.value -= availableCharge;

			electricityVelocity.value = Math.round(electricityVelocity.value * 10) / 10;
		}
	} else {
		electricity.value = 0;
	}
	ResourceScreenUpdate (electricity, "electricity");


	//Check positivity caps and limit velocity
	var positivityVelocityLimit2 = positivityVelocity.value;
	if(-positivityVelocityLimit2 > positivity.value) {
		positivityVelocityLimit2 = -positivity.value;
	}
	if(positivityVelocity.value + positivity.value > positivityCap.value) {
		positivityVelocityLimit2 = positivityCap.value - positivity.value;
	}
	positivityVelocity.value = positivityVelocityLimit2;

	ResourceDropdownPositivityUpdate(basePositivityVelocity, negativePositivityVelocity, positivityVelocityLimit, pressurePositivityVelocity, electricityPositivityVelocity, positivityVelocityLimit2, "positivity");
	ResourceDropdownPressureUpdate (pressureGen.value, basePressureVelocity, pressureVelocityLimit, negativePressureVelocity, "pressure");
	ResourceDropdownElectricityUpdate(roundedPositivityVelocity, roundedPressureVelocity, electricityVelocity.value, "electricity");
}

//pressureDir Update
function FlipPreDir(){
	pressureDirection.value = -pressureDirection.value
}

