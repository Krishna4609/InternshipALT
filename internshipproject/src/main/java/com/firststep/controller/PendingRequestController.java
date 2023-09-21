package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.pendingRequestDto;
import com.firststep.entity.PendingRequest;
import com.firststep.service.PendingRequestService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/connection")
public class PendingRequestController {
	@Autowired
	private PendingRequestService pendingRequestService;
	
	@PostMapping("/send")
	public PendingRequest addPendingRequest(@RequestBody pendingRequestDto pendingRequestdto) {
		return pendingRequestService.RequestSent(pendingRequestdto);
	}
	
	@GetMapping("/getRequest/{user_id}")
	public List<PendingRequest> getRequestByUserId(@PathVariable int user_id){
		return pendingRequestService.getPendingRequest(user_id);
	}

}
