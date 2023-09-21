package com.firststep.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.firststep.dto.AddressRequest;
import com.firststep.entity.Address;
import com.firststep.service.AddressService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/address")
public class AddressController {
	@Autowired
	private AddressService service;
	
	@PostMapping("/{user_id}/addAddress")
	public Address addAddress(@PathVariable int user_id, @RequestBody AddressRequest addressRequest) {
		return service.saveAddress(user_id,addressRequest);
	}
	
	
	@GetMapping("/allAddress")
	public List<Address> findAllAddresses(){
		return service.getAddresses();
	}

	
	@GetMapping("/{address_id}")
	public Address findAddressById(@PathVariable int address_id) {
		return service.getAddressById(address_id);
	}
	
	
	 @GetMapping("/getAddress/{user_id}")
	    public List<Address> getCourseByUserId(@PathVariable int user_id){
	    	return service.getAddressByUserId(user_id);
	    }
	@PutMapping("/update/{address_id}")
	public Address updateCourse(@PathVariable int address_id, @RequestBody AddressRequest AddressRequest) {
        return service.updateAddress(address_id, AddressRequest);
	}
	
	@DeleteMapping("/delete/{address_id}")
	public String deleteAddress(@PathVariable int address_id) {
		return service.deleteAddress(address_id);
	}
}