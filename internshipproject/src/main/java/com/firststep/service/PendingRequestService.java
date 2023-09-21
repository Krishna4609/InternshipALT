package com.firststep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.firststep.dto.pendingRequestDto;
import com.firststep.entity.PendingRequest;
import com.firststep.repo.PendingRequestRepository;

@Service
public class PendingRequestService {
	
	@Autowired
	private PendingRequestRepository pendingRequestRepository;
	
	public PendingRequest RequestSent(@RequestBody pendingRequestDto pendingRequestdto) {
		PendingRequest pendingRequest=PendingRequest.build(0, pendingRequestdto.getUserId(), pendingRequestdto.getRequestedUser_id());
		return pendingRequestRepository.save(pendingRequest);
	}
	
	public List<PendingRequest> getPendingRequest(int user_id){
		return pendingRequestRepository.findByUserId(user_id);
	}
	

}
