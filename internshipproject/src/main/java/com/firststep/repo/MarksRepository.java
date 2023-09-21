package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Marks;
import com.firststep.entity.UserProfile;

public interface MarksRepository extends JpaRepository<Marks, Integer>{
	public List<Marks> findByUser(UserProfile user);
}
