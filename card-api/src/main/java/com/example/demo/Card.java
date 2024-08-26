package com.example.demo;

import java.util.List;

public class Card {
    private String id;
    private String cardName;
    private String scryfallId;
    private boolean foil;
    private String imageUri;
    private String setId;
    private String setName;
    private String setUri;
    private Double price;
    private String artist;
    private int manaCost;
    private String tcgUri;
    private String cardType;
    private List<String> colors;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getScryfallId() {
        return scryfallId;
    }

    public void setScryfallId(String scryfallId) {
        this.scryfallId = scryfallId;
    }

    public boolean isFoil() {
        return this.foil;
    }

    public boolean getFoil() {
        return this.foil;
    }

    public void setFoil(boolean foil) {
        this.foil = foil;
    }

    public String getImageUri() {
        return this.imageUri;
    }

    public void setImageUri(String imageUri) {
        this.imageUri = imageUri;
    }

    public String getSetId() {
        return this.setId;
    }

    public void setSetId(String setId) {
        this.setId = setId;
    }

    public String getSetName() {
        return this.setName;
    }

    public void setSetName(String setName) {
        this.setName = setName;
    }

    public String getSetUri() {
        return this.setUri;
    }

    public void setSetUri(String setUri) {
        this.setUri = setUri;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getArtist() {
        return this.artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public int getManaCost() {
        return this.manaCost;
    }

    public void setManaCost(int manaCost) {
        this.manaCost = manaCost;
    }

    public String getTcgUri() {
        return this.tcgUri;
    }

    public void setTcgUri(String tcgUri) {
        this.tcgUri = tcgUri;
    }

    public String getCardType() {
        return this.cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public List<String> getColors() {
        return this.colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

}
