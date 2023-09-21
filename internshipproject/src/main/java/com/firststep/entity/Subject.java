package com.firststep.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subjectId;

    private String subjectName; // Example: Operating System, Database Management, etc.
    
    @ManyToMany(mappedBy = "subjects")
    private Set<Semester> semesters = new HashSet<>();
    
    @OneToMany(mappedBy = "subject")
    private Set<Marks> marks = new HashSet<>();
}

