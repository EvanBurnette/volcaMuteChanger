let midiOutput = null

var buttons = document.getElementsByTagName('button')
for (let i = 0; i < buttons.length; i++){
  buttons[i].onclick = function(){
    muteState(i)}
}

navigator.requestMIDIAccess()
.then(function(midiAccess) {
	midiOutput = Array.from(midiAccess.outputs.values())[0]
})

let wantArray = []
wantArray.length = 10
wantArray.fill(true)

let nowArray = []
nowArray.length = 10
nowArray.fill(true)

muteState = function(energyLevel){
	switch(energyLevel){
  	case 0:
    	wantArray.fill(false)
      wantArray[0] = true //case 0 will mute every part but 0 and 1
      wantArray[1] = true //midi is zero indexed so the count starts at 0 instead of 1
    	break;
    case 1:
    	wantArray.fill(false)
      wantArray[0] = true
      wantArray[1] = true
      wantArray[9] = true //add choke group part (pad 10) (useful for high-hats)
    	break;
    case 2:
    	wantArray.fill(false)
    	wantArray[0] = true
      wantArray[1] = true
      wantArray[8] = true //add choke group part (pad 9)
      wantArray[9] = true 
    	break;
    case 3:
    	wantArray.fill(true) //unmute all parts
    	break;
  }
  for(let i = 0; i < wantArray.length; i++){
  	if (wantArray[i] != nowArray[i]){
      nowArray[i] = wantArray[i]
    	midiOutput.send([0xB0 + i, 58, 127*wantArray[i]]);
    }
  }
}