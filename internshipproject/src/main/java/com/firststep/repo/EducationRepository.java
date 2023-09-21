package com.firststep.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Education;

public interface EducationRepository extends JpaRepository<Education,Integer> {
	public Education findByUserId(int userId);
}