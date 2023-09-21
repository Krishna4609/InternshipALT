package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.SkillRequest;
import com.firststep.entity.Posts;
import com.firststep.entity.Skill;
import com.firststep.service.SkillService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/skill")
public class SkillController {
	@Autowired
	private SkillService service;

	@PostMapping("/{user_id}/addSkill")
	public Skill addSkill(@PathVariable int user_id, @RequestBody SkillRequest skillRequest) {
		return service.saveSkill(user_id, skillRequest);
	}

	@GetMapping("/allSkill")
	public List<Skill> findAllSkilles() {
		return service.getSkills();
	}
	
	@GetMapping("/getSkill")
	public Skill getSkill1(@PathVariable int skill_id) {
		return service.getSkillById(skill_id);
	}
	
	@GetMapping("/{user_id}/getSkill")
	public List<Skill> getSkillByUser(@PathVariable int user_id){
		return service.getSkillByUser(user_id);
	}
	
	@GetMapping("/getSkill/{skill_id}")
	public Skill getSkill(@PathVariable int skill_id) {
	    return service.getSkillById(skill_id);
	}

	@PutMapping("/update/{skill_id}")
	public Skill updateSkill(@PathVariable int skill_id, @RequestBody SkillRequest skillRequest) {
	    return service.updateSkill(skill_id, skillRequest);
	}
	
	@DeleteMapping("/delete/{skill_id}")
	public String deleteSkill(@PathVariable int skill_id) {
	    return service.deleteSkill(skill_id);
	}

}