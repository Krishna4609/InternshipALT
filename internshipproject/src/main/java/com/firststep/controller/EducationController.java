package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.EducationRequest;
import com.firststep.entity.Education;
import com.firststep.service.EducationService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/education")
public class EducationController {
	
	
		@Autowired
		private EducationService service;
		
		@PostMapping("/addEducation")
		public Education addEducation(@RequestBody EducationRequest educationRequest) {
			return service.save(educationRequest);
		}
	
		
		@GetMapping("/educationByUserId/{userId}")
		public Education findEducationByUserId(@PathVariable int userId) {
			return service.getEducationByUserId(userId);
		}
		
		
		@PutMapping("/update/{education_id}")
		public Education updateEducation(@PathVariable int education_id,@RequestBody EducationRequest educationRequest) {
			return service.updateEducation(education_id,educationRequest);
		}
		
		@DeleteMapping("/delete/{education_id}")
		public String deleteEducation(@PathVariable int education_id) {
			return service.deleteEducation(education_id);
		}
	}