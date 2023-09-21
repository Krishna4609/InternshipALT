package com.firststep.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.firststep.Exceptions.PasswordNotMatchException;
import com.firststep.Exceptions.UserDoesNotExistException;
import com.firststep.dto.LoginRequest;
import com.firststep.entity.UserProfile;
import com.firststep.repo.UserRepository;

@Service
public class LoginService {
	@Autowired
	private UserRepository userRepository;

	public UserProfile loginUser(LoginRequest loginRequest) {
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();
		
		if(userRepository.existsByUsername(username)) {
			UserProfile user = userRepository.findByUsername(username);
			if(password.equals(user.getPassword())){
				return userRepository.findByUsername(username);
			}
			else
				throw new PasswordNotMatchException("Passoword does not Match");
		}
		else
			throw new UserDoesNotExistException("User Does not exist");
	}
}
