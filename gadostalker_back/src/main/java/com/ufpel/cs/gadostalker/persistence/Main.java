package com.ufpel.cs.gadostalker.persistence;
import org.flywaydb.core.Flyway;

public class Main {
    public static void main(String[] args) {
        Flyway flyway = Flyway.configure().dataSource("jdbc:postgresql://localhost:5432/gadostalkerdb", "stalker", "admin").load();
        flyway.migrate();
    }
}
