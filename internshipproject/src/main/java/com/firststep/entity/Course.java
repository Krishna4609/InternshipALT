package com.firststep.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class Course {
	@Id
	@GeneratedValue
	private int course_id;
	private String courseName;
	private int no_of_semesters;
		
	 @ManyToMany(mappedBy = "courses")
	  private Set<UserProfile> users = new HashSet<>();
	 
	 @OneToMany(mappedBy = "course")
	 private Set<Semester> semesters = new HashSet<>();
	 
	 @OneToMany(mappedBy = "course")
	 private Set<Marks> marks = new HashSet<>();
	
}
