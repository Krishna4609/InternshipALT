package com.firststep.dto;

import java.sql.Blob;
import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "build")
public class PostRequest {
	@Lob
	private MultipartFile content;
	private String descr;
	private String post_date;
}
