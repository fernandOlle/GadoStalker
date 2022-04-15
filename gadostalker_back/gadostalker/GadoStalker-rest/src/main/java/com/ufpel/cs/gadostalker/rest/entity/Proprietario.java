package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author gustavo
 */
@Entity
@Table(name = "proprietario")
public class Proprietario extends Usuario implements Serializable {

    public Proprietario() {
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
