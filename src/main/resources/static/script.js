
// We will use STOMP over websocket which is a Simple Text Oriented Text Protocol using which we can perform Send & Receive like operations
var stompClient = null;

// Connect - Connection establishment with websocket
function connect() {
	
	// Connect socket with server
	let socket = new SockJS("/server-two-eight");
	
	
	stompClient = Stomp.over(socket);
	stompClient.connect( {}, function(frame) {
		console.log("Connected : ", frame);
		
		$("#login-form").addClass('d-none');
		$("#chatting-panel").removeClass('d-none');
		
		// subscription URL
		stompClient.subscribe("/topic/return-to", function(response) {
			showMessage(JSON.parse(response.body));
		});
		
	});
}

// Display messages into chat room
function showMessage(message) {
	$("#msg-container").append(`<tr><td><b>${message.username} : </b> ${message.message}</td></tr>`);
	document.getElementById('messageContent').value = '';
}

// Send message
function send() {
	let jsonObject = {
		username : localStorage.getItem("Name"),
		message : $("#messageContent").val()
	}
	
	// Restrick blank messages to be sent
	if(jsonObject.message.toString() !== "") {
		stompClient.send("/app/message", {}, JSON.stringify(jsonObject));
	}
}

// Clear input fields after message is sent
function clean() {
	document.getElementById("messageContent").value() = "";
}


// Action listeners
$(document).ready(() => {
	
	// Login / Get-Started
	$("#login").click( () => {
		 
		let name = $("#username").val();
		localStorage.setItem("Name" , name);	// Store name to localstorage which gets cleared when page is refreshed
		
		connect();
	})
	 
	// Send
	$("#send").click( () => {
		send();
	})
	
	// Logout - Close the chatroom window are remove STOMP client set value to false
	$("#logout").click( () => {
		localStorage.removeItem("name");
		
		if(stompClient!==null) {
			stompClient.disconnect();
				
			$("#login-form").removeClass('d-none');
			$("#chatting-panel").addClass('d-none');
			
			console.log(stompClient);
			clean();
		}
	})
})
 