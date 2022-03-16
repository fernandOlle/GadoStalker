package com.ufpel.cs.gadostalker.persistence;
import org.flywaydb.core.Flyway;

public class Main {
    public static void main(String[] args) {
        Flyway flyway = Flyway.configure().dataSource("url", "user", "password").load();
        flyway.migrate();
    }
}
