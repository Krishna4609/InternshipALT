package com.firststep.repo;




import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.firststep.entity.Address;
import com.firststep.entity.UserProfile;

public interface AddressRepository extends JpaRepository<Address, Integer>{
	List<Address> findAllByUsers(UserProfile user);
}