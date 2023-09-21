package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.PendingRequest;

import jakarta.transaction.Transactional;

public interface PendingRequestRepository extends JpaRepository<PendingRequest, Integer>{
	@Transactional
	List<PendingRequest> findByUserId(int user_id);
	@Transactional
	void deleteByUserId(int user_id);
}
