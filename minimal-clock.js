var fullPageURL = 'https://codepen.io/hchiam/full/Pjdvgq/';

function setFillertextByUrlDetection() { // for codepen
    let thisUrl = document.URL;
    if (thisUrl.indexOf('full') === -1) {
        document.getElementById('fillertext').innerHTML = 'CodePen Version: ';
        let aTag = document.createElement('a');
        aTag.setAttribute('href',fullPageURL);
        aTag.setAttribute('target','_blank'); // open in new window
        aTag.innerHTML = fullPageURL;
        document.getElementById('fillertext').appendChild(aTag);
    }
}

setFillertextByUrlDetection();

runTimer();

function runTimer() {
  setInterval(timerAction, 1000);
}

function timerAction() {
  var dt = new Date();
  document.getElementById("digital-clock-24").innerHTML = dt.toLocaleTimeString([], {hour12: false});
  var crdnts = getCoordinates(dt.getHours());
  setCoordinates(1,crdnts);
  var crdnts = getCoordinates(dt.getMinutes(),shift=400);
  setCoordinates(2,crdnts);
  var crdnts = getCoordinates(dt.getSeconds(),shift=800);
  setCoordinates(3,crdnts);
}

function getCoordinates(dt,shift=0) {
  var digit1 = getDigit1(dt);
  var digit2 = getDigit2(dt);
  var x1,y1,x2,y2;
  var c1 = getSector(digit1,shift);
  x1 = c1[0];
  y1 = c1[1];
  var c2 = getSector(digit2,shift);
  x2 = c2[0];
  y2 = c2[1];
  return [x1,y1,x2,y2];
}

function getDigit1(number) {
  if (number > 9) return parseInt(String(number)[0]);
  return 0;
}

function getDigit2(number) {
  if (number < 10) return parseInt(number);
  return parseInt(String(number)[1]);
}

function getSector(digit,shift=0,scale=0.5) {
  // failsafe to 1 digit
  digit = parseInt(String(digit)[0]);
  switch(digit) {
    case 0: x = 200; y = 325; break;
    case 1: x = 100; y = 50; break;
    case 2: x = 200; y = 50; break;
    case 3: x = 300; y = 50; break;
    case 4: x = 100; y = 150; break;
    case 5: x = 200; y = 150; break;
    case 6: x = 300; y = 150; break;
    case 7: x = 100; y = 250; break;
    case 8: x = 200; y = 250; break;
    case 9: x = 300; y = 250; break;
  }
  return [(x+shift)*scale,y*scale];
}

function setCoordinates(id,crdnts) {
  var x1 = crdnts[0];
  var y1 = crdnts[1];
  var x2 = crdnts[2];
  var y2 = crdnts[3];
  document.getElementById('crcl'+id).setAttribute('cx',x1);
  document.getElementById('crcl'+id).setAttribute('cy',y1);
  document.getElementById('ln'+id).setAttribute('points', x1+','+y1 + ' ' + x2+','+y2);
}

// // override to customize gesture-detection functions from https://rawgit.com/hchiam/webApp_MachineLearning_Gesture/master/detect-gesture-import.js:
// specialAction_UpDown();
// specialAction_LeftRight();
// specialAction_ClockWise();

function specialAction_UpDown() {
  var clr = 'yellow';
  gesture_signal.style.color = clr;
  gesture_signal.innerHTML = "&#8597;";
  updateClockColour(clr);
}

function specialAction_LeftRight() {
  var clr = 'lightblue';
  gesture_signal.style.color = clr;
  gesture_signal.innerHTML = "&#8596;";
  updateClockColour(clr);
}

function specialAction_ClockWise() {
  var clr = 'green';
  gesture_signal.style.color = clr;
  gesture_signal.innerHTML = "&#8635;";
  updateClockColour(clr);
}

function updateClockColour(colour) {
  for (i=1; i<=3; i++) {
    document.getElementById('crcl' + i).setAttribute('style','fill:'+colour);
    document.getElementById('ln' + i).setAttribute('style','fill:none;stroke:'+colour+';stroke-width:10');
    document.getElementById('frame' + i).setAttribute('style','fill:none;stroke:'+colour+';stroke-width:10');
  }
  document.getElementById('digital-clock-24').setAttribute('style','color:'+colour)
}
