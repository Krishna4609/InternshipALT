package com.firststep.dto;

import com.firststep.entity.Course;
import com.firststep.entity.Semester;
import com.firststep.entity.Subject;
import com.firststep.entity.UserProfile;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class MarksRequest {
    private int userId;
    private String subjectName;
    private int semesterId;
    private int courseId;
    private int marks;
}
