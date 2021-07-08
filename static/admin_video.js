const sessionId = document.querySelector('#session_id').dataset.name;
const apiKey = document.querySelector('#api_key').dataset.name;
const token = document.querySelector('#token').dataset.name;
const name = document.querySelector('#name').dataset.name;
const v1 = document.getElementById('v1')
const c1 = document.getElementById('c1')
const c2 = document.getElementById('c2')
const c1Ctx = c1.getContext('2d')
const c2Ctx = c2.getContext('2d')

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => { v1.srcObject = stream })


v1.addEventListener('play', () => {
  setInterval(addText, 0)
})


function addText() {
  // User Video
  c1Ctx.drawImage(v1, 0, 0, 320, 240)

  // Rectangle
  c1Ctx.beginPath();
  c1Ctx.fillStyle = "#584fa8";
  c1Ctx.rect(0, 190, 155, 40); // x, y of top-left, width, height
  c1Ctx.fill();

  // Text
  c1Ctx.font = "20px Monospace";
  c1Ctx.fillStyle = "white";
  c1Ctx.fillText(name.replace('(admin)', ''), 10, 215); // x, y of top-left
}


// Initialize session
const session = OT.initSession(apiKey, sessionId)

// Create publisher
const publisher = OT.initPublisher("opentok-publishers", {
  videoSource: c1.captureStream().getVideoTracks()[0],
  width: 320,
  height: 240
})

// Once connected to session, publish the publisher
session.connect(token, () => {
  session.publish(publisher)
})

// Show other users' streams
session.on('streamCreated', event => {
  session.subscribe(event.stream, "opentok-subscribers")
})