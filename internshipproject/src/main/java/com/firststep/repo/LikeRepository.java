package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Likes;

public interface LikeRepository extends JpaRepository<Likes, Integer>{
	List<Likes> findAllByPostId(int post_id);
	Likes findByPostIdAndUserId(int postId, int userId);
}
