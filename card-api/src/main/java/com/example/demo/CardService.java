package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CardService {
    public final CardRepo cardRepo;

    @Autowired
    public CardService(CardRepo cardRepo) {
        this.cardRepo = cardRepo;
    }

    @Transactional(readOnly = true) 
    public List<Card> getCards(Filters filters) {
        return this.cardRepo.getUserCards(filters);
    }

    @Transactional
    public void insertCards(List<Card> cards) {
        this.cardRepo.insertUserCards(cards);
    }
}
