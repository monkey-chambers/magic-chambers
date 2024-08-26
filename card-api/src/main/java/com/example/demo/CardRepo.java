package com.example.demo;
import java.util.List;

public interface CardRepo {
    void insertUserCards(List<Card> cards);
    List<Card> getUserCards(Filters filters);
    void setColorIdentities(List<String> colors, String id);
}
