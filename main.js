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
      wantArray[0] = true
      wantArray[1] = true
    	break;
    case 1:
    	wantArray.fill(false)
      wantArray[0] = true
      wantArray[1] = true
      wantArray[9] = true
    	break;
    case 2:
    	wantArray.fill(false)
    	wantArray[0] = true
      wantArray[1] = true
      wantArray[8] = true
      wantArray[9] = true
    	break;
    case 3:
    	wantArray.fill(true)
    	break;
  }
  for(let i = 0; i < wantArray.length; i++){
  	if (wantArray[i] != nowArray[i]){
      nowArray[i] = wantArray[i]
    	midiOutput.send([0xB0 + i, 58, 127*wantArray[i]]);
    }
  }
}