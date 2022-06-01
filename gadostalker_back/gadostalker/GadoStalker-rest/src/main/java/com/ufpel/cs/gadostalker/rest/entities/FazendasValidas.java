/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.entities;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

/**
 *
 * @author thouta
 */
@Entity
@Table(name = "fazendas_validas")
@SequenceGenerator(name = "seqFazendasValidas", sequenceName = "SEQFAZENDASVALIDAS", allocationSize = 1)
public class FazendasValidas implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqFazendasValidas")
    private Long id;
    
    @Column(unique = true)
    private String SNCR;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSNCR() {
        return SNCR;
    }

    public void setSNCR(String SNCR) {
        this.SNCR = SNCR;
    }
}
