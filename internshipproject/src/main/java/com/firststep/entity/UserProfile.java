package com.firststep.entity;


import java.sql.Blob;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
@Data
@Entity
@Table(name ="profile")
public class UserProfile {
	
	@Id
	@GeneratedValue
	private int user_id;
	private String username;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private long contact;
	private String dob;
	@Column(columnDefinition = "LONGTEXT")
	private String picture;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinTable(name = "user_address_mapping",
	joinColumns = {
			@JoinColumn(name = "user_id",referencedColumnName = "user_id")
	},
	inverseJoinColumns = {
			@JoinColumn(name = "address_id", referencedColumnName = "address_id")
	}
			)
	private Set<Address> addresses = new HashSet<>();
	
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "course_enrollment",
        joinColumns = {@JoinColumn(name = "user_id",referencedColumnName = "user_id")},
        inverseJoinColumns = { @JoinColumn(name = "course_id",referencedColumnName = "course_id")}
    )
    private Set<Course> courses = new HashSet<>();
	
	@OneToMany(mappedBy = "user")
    private Set<Marks> marks = new HashSet<>();
	
}
