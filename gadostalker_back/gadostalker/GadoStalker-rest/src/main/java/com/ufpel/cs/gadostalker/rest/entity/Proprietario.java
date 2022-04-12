package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author gustavo
 */
@Entity
@Table(name = "proprietario")
@SequenceGenerator(name = "seqProprietario", sequenceName = "SEQPROPRIETARIO", allocationSize = 1)
public class Proprietario extends Usuario implements Serializable {

    @Id
    private Long id;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAZENDAID", referencedColumnName="ID", nullable = true)
    private List<Fazenda> fazendas;

    public Proprietario() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Fazenda> getFazendas() {
        return fazendas;
    }

    public void setFazendas(List<Fazenda> fazendas) {
        this.fazendas = fazendas;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 83 * hash + Objects.hashCode(this.id);
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
        final Proprietario other = (Proprietario) obj;
        return Objects.equals(this.id, other.id);
    }

}
