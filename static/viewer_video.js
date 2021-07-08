const sessionId = document.querySelector('#session_id').dataset.name;
const apiKey = document.querySelector('#api_key').dataset.name;
const token = document.querySelector('#token').dataset.name;

// Initialize session
const session = OT.initSession(apiKey, sessionId)
console.log('session')
console.log(session)

session.on("streamCreated", function (event) {
   console.log("New stream in the session: " + event.stream.streamId);
   session.subscribe(event.stream);
});

session.connect(token);