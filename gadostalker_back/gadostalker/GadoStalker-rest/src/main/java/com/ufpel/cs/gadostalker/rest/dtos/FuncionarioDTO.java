package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author gustavo
 */
@XmlRootElement
public class FuncionarioDTO extends UsuarioDTO {
    
    @XmlElement
    public Fazenda fazenda;

    public FuncionarioDTO() {
    }
    
}
