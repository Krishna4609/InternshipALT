package com.firststep.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Semester;
import java.util.List;


public interface SemesterRepository extends JpaRepository<Semester, Integer> {
	Semester findBySem(int sem);
}
