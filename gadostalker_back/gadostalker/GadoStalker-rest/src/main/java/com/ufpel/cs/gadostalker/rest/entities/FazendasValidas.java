package com.ufpel.cs.gadostalker.rest.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

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
