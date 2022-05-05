package com.ufpel.cs.gadostalker.rest.entity;

import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author thomazio
 */
@Entity(name = "usuario_comum")
@Table(name = "usuario_comum")

// define o DTYPE da classe UsuarioComum como USUARIO_COMUM
@DiscriminatorValue(value = Usuario.TipoUsuario.Tipo.USUARIO_COMUM)
public class UsuarioComum extends Usuario implements Serializable {
    
    public UsuarioComum() {
    }
    
    public UsuarioComum(UsuarioDTO usuarioDTO) {
        super(usuarioDTO);
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
        final UsuarioComum other = (UsuarioComum) obj;
        return Objects.equals(this.cpf, other.cpf);
    }
}
