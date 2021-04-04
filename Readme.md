# Volca Mute Changer

Use your phone to control your [pajen firmware modded](https://ranzee.com/volca-fm-firmware-1-09-unofficial/) Volca Sample!

![4 buttons labeled L, M, H, X](/volcaMuteChanger.png)
Choose from 4 energy levels: Low, Medium, High, and _*Xtreme*_!

Chrome browser has a built in midi support, allowing us to invent new interfaces with plain web technology and a smartphone.

For my [integrated Arduino based pedalboard midi controller](https://github.com/EvanBurnette/pedalBoardMidiController) I needed to do a bunch of soldering to add this feature to my wah pedal. But I wanted you to use it to, so I added it to the internet!

Each button sends a different mute pattern to the Volca. Just change the cases in the muteState function to change which parts are muted or unmuted for each energy level.

```javascript
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
```

Volca Mute Changer is a proof of concept. It is not a finished product. I think it would be cool to ditch the buttons and use something that is more like an expression pedal.