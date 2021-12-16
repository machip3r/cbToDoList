CREATE DATABASE IF NOT EXISTS todolist_db;

USE todolist_db;

CREATE TABLE IF NOT EXISTS user(
    id_user INT UNSIGNED AUTO_INCREMENT,
    u_name VARCHAR(200) NOT NULL,
    u_user VARCHAR(100) NOT NULL,
    u_password VARCHAR(200) NOT NULL,
    PRIMARY KEY (id_user)
);

CREATE TABLE IF NOT EXISTS category(
    id_category TINYINT UNSIGNED AUTO_INCREMENT,
    c_category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_category)
);

CREATE TABLE IF NOT EXISTS task(
	id_task INT UNSIGNED AUTO_INCREMENT,
    id_user INT UNSIGNED,
    id_category TINYINT UNSIGNED,
    t_task VARCHAR(200) NOT NULL,
    t_date DATE NOT NULL,
    t_status CHAR(1) NOT NULL DEFAULT 'a',
    PRIMARY KEY (id_task),
    CONSTRAINT FKUser
		FOREIGN KEY (id_user)
        REFERENCES user (id_user)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT FKCategory
		FOREIGN KEY (id_category)
        REFERENCES category (id_category)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subtask(
	id_subtask TINYINT UNSIGNED AUTO_INCREMENT,
    id_task INT UNSIGNED NOT NULL,
    st_task VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_subtask),
    CONSTRAINT FKTask
		FOREIGN KEY (id_task)
        REFERENCES task (id_task)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO category(c_category) VALUES ("Trabajo"), ("Escuela"), ("Vida Personal"), ("Juegos"), ("Limpieza");
