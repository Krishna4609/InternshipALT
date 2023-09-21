package com.firststep.service;

import java.util.List;

import javax.management.RuntimeErrorException;
import javax.xml.stream.events.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.firststep.dto.CommentRequest;
import com.firststep.entity.Comments;
import com.firststep.repo.CommentRepository;

@Service
public class CommentsService {
	@Autowired
	private CommentRepository commentRepository;
	
	//to save a comment
	public Comments saveComment(int user_id,CommentRequest commentRequest) {
		try {
			Comments comment = Comments.build(0, commentRequest.getPost_id(), user_id, commentRequest.getComment_text());
			return commentRepository.save(comment);
		}catch (Exception e) {
			throw new RuntimeException("Comment not posted");
		}
	}
	
	public List<Comments> getAllComments(){
		return commentRepository.findAll();
	}
}
