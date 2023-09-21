package com.firststep.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.firststep.dto.LikeRequest;
import com.firststep.entity.Likes;
import com.firststep.repo.LikeRepository;

@Service
public class LikeService {
	@Autowired
	private LikeRepository likeRepository;
	
	public Likes likePost(LikeRequest likeRequest) {
		Likes like = Likes.build(0, likeRequest.getPost_id(), likeRequest.getUser_id());
		return likeRepository.save(like);
	}
	
	public int totalLikes(int post_id) {
		List<Likes> likes = likeRepository.findAllByPostId(post_id);
		return likes.size();
	}
}
