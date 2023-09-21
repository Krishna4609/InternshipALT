package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.firststep.entity.Posts;

public interface PostRepository extends JpaRepository<Posts, Integer> {
	@Query("SELECT p FROM Posts p WHERE p.user_id = :user_id")
	List<Posts> findByUser_id(@Param("user_id") int user_id);

}
