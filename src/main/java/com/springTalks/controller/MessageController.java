package com.springTalks.controller;

import com.springTalks.client.*;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
	
	@MessageMapping("/message")
	@SendTo("/topic/return-to")
	public Message getMessage(@RequestBody Message msg) {
		
		try {
			Thread.sleep(1000);		// wait 1s
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}
		
		return msg;
	}
	
}
