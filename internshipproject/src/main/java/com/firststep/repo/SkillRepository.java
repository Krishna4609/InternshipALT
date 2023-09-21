package com.firststep.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Skill;
import com.firststep.entity.UserProfile;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
	public List<Skill> findAllByUserProfile(UserProfile user);
}