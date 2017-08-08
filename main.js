/*
 *	This file is available under the GNU license. See the LICENSE file in the root directory for details.
 */

//Game Loop
window.setInterval(function(){

	updateVelocity();

	genPos(positivityVelocity.value);

	genPre(pressureVelocity.value);

	genEle(electricityVelocity.value);
}, 1000);
