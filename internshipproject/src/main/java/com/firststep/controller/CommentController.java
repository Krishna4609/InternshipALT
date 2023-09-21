package com.firststep.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.CommentRequest;
import com.firststep.entity.Comments;
import com.firststep.service.CommentsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/post")
public class CommentController {
	@Autowired
	private CommentsService commentService;
	
	@PostMapping("/{user_id}/postComment")
	public ResponseEntity<Comments> saveComment(@PathVariable int user_id,@RequestBody CommentRequest commentRequest){
		return new ResponseEntity<>(commentService.saveComment(user_id, commentRequest),HttpStatus.CREATED);
	}
	
	@GetMapping("/getComments")
	public ResponseEntity<List<Comments>> getComments(){
		return ResponseEntity.ok(commentService.getAllComments());
	}
}
