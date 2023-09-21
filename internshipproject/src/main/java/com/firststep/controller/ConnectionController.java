package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.ConnectionRequest;
import com.firststep.entity.Connection;
import com.firststep.service.ConnectionService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/connection")
public class ConnectionController {
	
	@Autowired
	private ConnectionService connectionService;
	
	@PostMapping("/accept")
	public Connection accept(@RequestBody ConnectionRequest connectionRequest) {
		return connectionService.acceptConnection(connectionRequest);
	}
	
	@PostMapping("/decline")
	public String decline(@RequestBody ConnectionRequest connectionRequest)
	{
		return connectionService.declineConnection(connectionRequest);
	}
	
	@GetMapping("/myconnections/{userId}") 
	public List<Connection> getConnection(@PathVariable int userId) {
	    return connectionService.getConnection(userId);
	}
	
	@GetMapping("/myConnection/{connectedId}")
	public List<Connection> getConnections(@PathVariable int connectedId)
	{
		return connectionService.getConnections(connectedId);
	}
	
}
