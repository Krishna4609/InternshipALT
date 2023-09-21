package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Course;
import com.firststep.entity.UserProfile;

public interface CourseRepository extends JpaRepository<Course, Integer> {
	Course findByCourseName(String name);
	Course existsByCourseName(String name);
	
	List<Course> findAllByUsers(UserProfile user);
}
