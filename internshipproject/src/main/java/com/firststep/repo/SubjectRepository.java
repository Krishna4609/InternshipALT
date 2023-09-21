package com.firststep.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Semester;
import com.firststep.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer>{
	Subject findBySubjectName(String name);
}
