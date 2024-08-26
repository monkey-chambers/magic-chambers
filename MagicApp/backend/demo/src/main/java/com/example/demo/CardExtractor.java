package com.example.demo;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import java.util.List;
import java.util.LinkedHashMap;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class CardExtractor implements ResultSetExtractor<List<Card>> {

    @Override
    public List<Card> extractData(ResultSet rs) throws SQLException, DataAccessException {
        LinkedHashMap<String, Card> cardMap = new LinkedHashMap<>();

        while (rs.next()) {

            final String cardId = rs.getString("id");
            Card card = cardMap.get(cardId);
            if (card == null && cardId != null) {

                card = new Card();
                card.setId(cardId);
                card.setCardName(rs.getString("card_name"));
                card.setScryfallId(rs.getString("scryfall_id"));
                card.setFoil(rs.getBoolean("foil"));
                card.setSetId(rs.getString("set_id"));
                card.setImageUri(rs.getString("image_uri"));
                card.setSetName(rs.getString("set_name"));
                card.setSetUri(rs.getString("set_uri"));
                card.setPrice(rs.getDouble("price"));
                card.setArtist(rs.getString("artist"));
                card.setManaCost(rs.getInt("mana_cost"));
                card.setTcgUri(rs.getString("tcg_uri"));
                card.setCardType(rs.getString("card_type"));

                cardMap.put(card.getId(), card);
            }
        }



        return new ArrayList<>(cardMap.values());
    }
}
