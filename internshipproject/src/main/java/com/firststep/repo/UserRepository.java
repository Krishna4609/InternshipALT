package com.firststep.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.UserProfile;

public interface UserRepository extends JpaRepository<UserProfile, Integer>{
	public UserProfile findByUsername(String username);
	public boolean existsByUsername(String username);
	
}
