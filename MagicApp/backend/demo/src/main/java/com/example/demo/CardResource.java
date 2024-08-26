package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class CardResource {
	private final CardService cardService;

	@Autowired
	public CardResource(CardService cardService) {
		this.cardService = cardService;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/")
	public ResponseEntity<List<Card>> index(@RequestParam(required = false) String searchText) {
		Filters filters = new Filters();
		filters.setSearchText(searchText);

		List<Card> cards = this.cardService.getCards(filters);
		return new ResponseEntity<>(cards, HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/")
	public ResponseEntity<String> index(@RequestBody List<Card> cards) {
		this.cardService.insertCards(cards);
		return new ResponseEntity<>("Hello2", HttpStatus.OK);
	}
}