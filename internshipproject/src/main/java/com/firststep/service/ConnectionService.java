package com.firststep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.firststep.dto.ConnectionRequest;
import com.firststep.entity.Connection;
import com.firststep.repo.ConnectionRepository;
import com.firststep.repo.PendingRequestRepository;

@Service
public class ConnectionService {
	@Autowired
	private ConnectionRepository connectionRepository;
	@Autowired
	private PendingRequestRepository pendingRequestRepository;
	
	public Connection acceptConnection(ConnectionRequest connectionRequest){
		pendingRequestRepository.deleteByUserId(connectionRequest.getUserId());
		Connection connection = Connection.build(0, connectionRequest.getUserId(), connectionRequest.getConnected_id());
		return connectionRepository.save(connection);
	}
	
	public String declineConnection(ConnectionRequest connectionRequest) {
		pendingRequestRepository.deleteByUserId(connectionRequest.getUserId());
		return "Declined";
	}
	
	public List<Connection> getConnection() {
		return connectionRepository.findAll();
	}
	
	public String deleteConnection(int connected_id) {
		connectionRepository.deleteByUserId(connected_id);
		return "Removed";
	}
	
	public List<Connection> getConnection(int userId) {
	    return connectionRepository.findByUserId(userId);
	}
	
	public List<Connection> getConnections(int connectedId){
		return connectionRepository.findByConnectedId(connectedId);
	}
}
