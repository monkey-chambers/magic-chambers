CREATE TABLE IF NOT EXISTS user_cards (
    id VARCHAR(255) NOT NULL,
    card_name VARCHAR(255) NOT NULL,
    foil boolean default FALSE,
    scryfall_id varchar(255),
    image_uri varchar(255),
    set_id varchar(255),
    set_name varchar(255),
    set_uri varchar(255),
    price FLOAT(36, 2),
    artist varchar(255),
    mana_cost int(36),
    tcg_uri varchar(255),
    card_type varchar(255),
    quantity int(36)
)