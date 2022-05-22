package com.ufpel.cs.gadostalker.rest.entities;

import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author gustavo
 */
@Entity
@Table(name = "funcionario")

// define o DTYPE da classe Funcionario como FUNCIONARIO
@DiscriminatorValue(value = Usuario.TipoUsuario.Tipo.FUNCIONARIO)
public class Funcionario extends Usuario implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAZENDA_SNCR", nullable = true, referencedColumnName = "SNCR")
    private Fazenda fazenda;

    public Funcionario() {
    }
    
    public Funcionario(UsuarioDTO usuarioDTO, Fazenda fazenda) {
        super(usuarioDTO);
        this.fazenda = fazenda;
    }

    public Fazenda getFazenda() {
        return fazenda;
    }

    public void setFazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + Objects.hashCode(this.cpf);
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
        final Funcionario other = (Funcionario) obj;
        return Objects.equals(this.cpf, other.cpf);
    }

}
