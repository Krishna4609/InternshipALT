package com.firststep.Exceptions;



public class UserDoesNotExistException extends RuntimeException {
	public UserDoesNotExistException(String message) {
		super(message);
	}
}
