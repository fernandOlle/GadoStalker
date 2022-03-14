package com.ufpel.cs.gadostalker.ejb;

import javax.persistence.*;

@Entity
@Table(name= "user")
@SequenceGenerator(name= "secUser", sequenceName = "sequenceUser", allocationSize = 1)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "secUser")
    private Long id;
}
