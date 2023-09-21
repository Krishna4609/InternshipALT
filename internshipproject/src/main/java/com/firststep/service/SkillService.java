package com.firststep.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.firststep.dto.SkillRequest;
import com.firststep.entity.Skill;
import com.firststep.entity.UserProfile;
import com.firststep.repo.SkillRepository;
import com.firststep.repo.UserRepository;

@Service
public class SkillService {

    @Autowired
    public SkillRepository skillRepository;
    @Autowired
    public UserRepository userRepository;
    public Skill saveSkill(int user_id,SkillRequest skillRequest) {
		UserProfile user = userRepository.findById(user_id).orElse(null);
		if(user!= null) { 
		Skill skill = Skill.build(0,skillRequest.getSkillType(), skillRequest.getSkillName(), skillRequest.getProficiency(),user);
		
		return skillRepository.save(skill);
		}
		return null;
	}
  
    public Skill getSkillById(int skill_id) {
    	return skillRepository.findById(skill_id).orElse(null);
    }
    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }
    
    public List<Skill> getSkillByUser(int user_id){
    	UserProfile user = userRepository.findById(user_id).orElse(null);
    	return skillRepository.findAllByUserProfile(user);
    }

    public String deleteSkill(int skill_id) {
        skillRepository.deleteById(skill_id);
        return "Skill Removed!!" + skill_id;
    }

    public Skill updateSkill(int skill_id, SkillRequest skillRequest) {
        Skill existingSkill = skillRepository.findById(skill_id).orElse(null);
        
        if (existingSkill != null) {
            existingSkill.setSkillType(skillRequest.getSkillType());
            existingSkill.setSkillName(skillRequest.getSkillName());
            existingSkill.setProficiency(skillRequest.getProficiency());
            return skillRepository.save(existingSkill);
        } else {
            
            return null;
        }
    }
}