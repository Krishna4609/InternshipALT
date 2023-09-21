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

import com.firststep.dto.SubjectRequest;
import com.firststep.entity.Subject;
import com.firststep.service.SubjectService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/subject")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	
	@GetMapping("/getAllSubjects")
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{subjectId}")
    public Subject getSubjectById(@PathVariable int subjectId) {
        return subjectService.getSubjectById(subjectId);
    }

    @PostMapping("/{semester_id}/addSubject")
    public Subject addSubject(@PathVariable int semester_id,@RequestBody SubjectRequest subjectRequest) {
        return subjectService.addSubject(semester_id,subjectRequest);
    }

    @PutMapping("/{subjectId}")
    public Subject updateSubject(@PathVariable int subjectId, @RequestBody SubjectRequest subjectRequest) {
        return subjectService.updateSubject(subjectId, subjectRequest);
    }

    @DeleteMapping("/{subjectId}")
    public void deleteSubject(@PathVariable int subjectId) {
        subjectService.deleteSubject(subjectId);
    }
}
