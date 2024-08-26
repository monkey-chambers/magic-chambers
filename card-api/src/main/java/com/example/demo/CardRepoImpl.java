package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;
import java.sql.Types;
import java.util.UUID;

@Repository
public class CardRepoImpl implements CardRepo {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public CardRepoImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void insertUserCards(List<Card> cards) {
        List<MapSqlParameterSource> params = new ArrayList<>();

        for (int i = 0; i < cards.size(); i++) {
            MapSqlParameterSource paramsMap = new MapSqlParameterSource();
            paramsMap.addValue("id", UUID.randomUUID().toString(), Types.VARCHAR)
            .addValue("cardName", cards.get(i).getCardName(), Types.VARCHAR)
            .addValue("scryfallId", cards.get(i).getScryfallId(), Types.VARCHAR)
            .addValue("foil", cards.get(i).getFoil(), Types.BOOLEAN)
            .addValue("imageUri", cards.get(i).getImageUri(), Types.VARCHAR)
            .addValue("setId", cards.get(i).getSetId(), Types.VARCHAR)
            .addValue("setName", cards.get(i).getSetName(), Types.VARCHAR)
            .addValue("setUri", cards.get(i).getSetUri(), Types.VARCHAR)
            .addValue("price", cards.get(i).getPrice(), Types.FLOAT)
            .addValue("artist", cards.get(i).getArtist(), Types.VARCHAR)
            .addValue("manaCost", cards.get(i).getManaCost(), Types.INTEGER)
            .addValue("tcgUri", cards.get(i).getTcgUri(), Types.VARCHAR)
            .addValue("cardType", cards.get(i).getCardType(), Types.VARCHAR);

            params.add(paramsMap);
        }

        final String sql = "INSERT INTO user_cards (id, card_name, scryfall_id, foil, image_uri, set_id, set_name, set_uri, price, artist, mana_cost, tcg_uri, card_type) " + 
        " VALUES(:id, :cardName, :scryfallId, :foil, :imageUri, :setId, :setName, :setUri, :price, :artist, :manaCost, :tcgUri, :cardType)";

        this.jdbcTemplate.batchUpdate(sql, params.toArray(new MapSqlParameterSource[0]));
    }

    @Override
    public List<Card> getUserCards(Filters filters) {
        MapSqlParameterSource params = new MapSqlParameterSource();
        String sql = "SELECT * FROM user_cards";

        if (filters.getSearchText() != null) {
            sql += " WHERE card_name LIKE :searchText";
            params.addValue("searchText", "%" + filters.getSearchText() + "%", Types.VARCHAR);
        }

        sql += " ORDER BY card_name ASC";

        return this.jdbcTemplate.query(sql, params, new CardExtractor());
    }

    @Override 
    public void setColorIdentities(List<String> colors, String id) {
        List<MapSqlParameterSource> params = new ArrayList<>();

        for (int i = 0; i < colors.size(); i++) {
            MapSqlParameterSource paramsMap = new MapSqlParameterSource();
            paramsMap.addValue("cardId", id, Types.VARCHAR)
            .addValue("color", colors.get(i), Types.VARCHAR);

            params.add(paramsMap);
        }

        String sql = "INSERT INTO card_color_identity (card_id, color) VALUES (:cardId, :color)";
        this.jdbcTemplate.batchUpdate(sql, params.toArray(new MapSqlParameterSource[0]));
    }

}
