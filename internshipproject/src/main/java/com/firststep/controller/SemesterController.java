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

import com.firststep.dto.SemesterRequest;
import com.firststep.entity.Semester;
import com.firststep.service.SemesterService;



@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/semester")
public class SemesterController {
	@Autowired
	private SemesterService semesterService;
	
	 @GetMapping("/getAllSemester")
	    public List<Semester> getAllSemesters() {
	        return semesterService.getAllSemesters();
	    }

	    @GetMapping("/{semesterId}")
	    public Semester getSemesterById(@PathVariable int semesterId) {
	        return semesterService.getSemesterById(semesterId);
	    }

	    @PostMapping("/{course_id}/addSemester")
	    public Semester addSemester(@PathVariable int course_id ,@RequestBody SemesterRequest semesterRequest) {
	        return semesterService.addSemester(course_id,semesterRequest);
	    }
	    
	    @PostMapping("/addAllSemesters")
	    public List<Semester> addAllSemesters(@RequestBody SemesterRequest semesterRequest){
	    	return semesterService.addAllSemesters(semesterRequest);
	    }

	    @PutMapping("/{semesterId}")
	    public Semester updateSemester(@PathVariable int semesterId, @RequestBody SemesterRequest semesterRequest) {
	        return semesterService.updateSemester(semesterId, semesterRequest);
	    }

	    @DeleteMapping("/{semesterId}")
	    public void deleteSemester(@PathVariable int semesterId) {
	        semesterService.deleteSemester(semesterId);
	    }
}
