package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.CourseRequest;
import com.firststep.entity.Course;
import com.firststep.service.CourseService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/course")
public class CourseController {
	
	@Autowired
	private CourseService courseService;
	
	@GetMapping("/getAllCourses")	
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{courseId}")
    public Course getCourseById(@PathVariable int courseId) {
        return courseService.getCourseById(courseId);
    }
    
    @GetMapping("/getCourse/{user_id}")
    public List<Course> getCourseByUserId(@PathVariable int user_id){
    	return courseService.getCourseByUserId(user_id);
    }

    @PostMapping("/{user_id}/addCourse")
    public Course addCourse(@PathVariable int user_id,@RequestBody CourseRequest courseRequest) {
        return courseService.addCourse(user_id,courseRequest);
    }

    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable int courseId, @RequestBody CourseRequest courseRequest) {
        return courseService.updateCourse(courseId, courseRequest);
    }

    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable int courseId) {
        courseService.deleteCourse(courseId);
    }
}
