
DROP TABLE IF EXISTS events CASCADE;
DROP SEQUENCE IF EXISTS events_seq CASCADE;

CREATE SEQUENCE IF NOT EXISTS events_seq start 1 increment 1;
CREATE TABLE IF NOT EXISTS events(
    id bigint DEFAULT nextval('events_seq') NOT NULL,
    event_type varchar(8) NOT NULL,
    instant bigint NOT NULL,
    primary_channel bigint NOT NULL,
    secondary_channel bigint,
    user_snowflake bigint NOT NULL,
    PRIMARY KEY (id)
);

ALTER SEQUENCE events_seq OWNED BY events.id;
