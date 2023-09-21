package com.firststep.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
@Entity
public class Skill {
	
	@Id
	@GeneratedValue
	private int skill_id;
	private String skillType;
	private String skillName;
	private String Proficiency;
	
	@ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile userProfile;
	
}
