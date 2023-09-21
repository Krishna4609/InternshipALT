package com.firststep.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.LikeRequest;
import com.firststep.entity.Likes;
import com.firststep.repo.LikeRepository;
import com.firststep.service.LikeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<Likes> likeOrUnlikePost(@RequestBody LikeRequest likeRequest) {
        int postId = likeRequest.getPost_id();
        int userId = likeRequest.getUser_id();

        // Check if the like already exists
        Likes existingLike = likeRepository.findByPostIdAndUserId(postId, userId);
        if (existingLike != null) {
            // If it exists, remove the like
            likeRepository.delete(existingLike);
        } else {
            // If it doesn't exist, add the like
            likeRepository.save(Likes.build(0, postId, userId));
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{post_id}/totalLikes")
    public ResponseEntity<Integer> totalLikes(@PathVariable int post_id) {
        return ResponseEntity.ok(likeService.totalLikes(post_id));
    }
}
