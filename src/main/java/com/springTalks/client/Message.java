package com.springTalks.client;

public class Message {

	// User details to enter into chat-room
		private String username;
		private String message;
		
		public Message(String username, String message) {
			super();
			this.username = username;
			this.message = message;
		}
		
		public String getUsername() {
			return username;
		}
		
		public void setUsername(String username) {
			this.username = username;
		
		}
		public String getMessage() {
			return message;
		}
		
		public void setMessage(String message) {
			this.message = message;
		}
		
		
}
