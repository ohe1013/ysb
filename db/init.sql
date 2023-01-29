GRANT ALL PRIVILEGES ON DATABASE ysb TO postgres;

CREATE TABLE users (
    id text PRIMARY KEY, -- backend 에서 uuid 로 넣어주기
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    chip integer DEFAULT 0,
    promises text[]
);
-- INSERT INTO users(id, email, password, name, chip, promises) VALUES('abcd', 'abc', '1234', 'abcd', 100, ARRAY ['a', 'b']);

CREATE TABLE promises (
    id text PRIMARY KEY,
    organizer text NOT NULL,
    loc_x decimal,
    loc_y decimal,
    promise_time timestamp,
    participants text[]
);
