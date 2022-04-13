/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author thomazio
 */
@Entity
@Table(name = "fazenda")
@SequenceGenerator(name = "seqFazenda", sequenceName = "SEQFAZENDA", allocationSize = 1)
public class Fazenda implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqFazenda")
    private Long id;
    
    @Column
    private String SNCR;
    
    @Column
    private String nome;
    
    @Column
    private String email;
    
    @Column
    private String telefone;

    public Fazenda() {
    }

    public Fazenda(Long id, String SNCR, String nome, String email, String telefone) {
        this.id = id;
        this.SNCR = SNCR;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
    
    public Long getId() {
        return id;
    }

    public String getSNCR() {
        return SNCR;
    }

    public void setSNCR(String SNCR) {
        this.SNCR = SNCR;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 71 * hash + Objects.hashCode(this.id);
        hash = 71 * hash + Objects.hashCode(this.SNCR);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Fazenda other = (Fazenda) obj;
        if (!Objects.equals(this.SNCR, other.SNCR)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ufpel.cs.gadostalker.rest.entity.Fazenda[ id=" + id + " ]";
    }
    
}
