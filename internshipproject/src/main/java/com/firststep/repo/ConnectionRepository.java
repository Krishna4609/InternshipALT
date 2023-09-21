package com.firststep.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Connection;

public interface ConnectionRepository extends JpaRepository<Connection, Integer> {
	Connection deleteByUserId(int connected_id);
	List<Connection> findByUserId(int userId);
	List<Connection> findByConnectedId(int connectedId);
}
