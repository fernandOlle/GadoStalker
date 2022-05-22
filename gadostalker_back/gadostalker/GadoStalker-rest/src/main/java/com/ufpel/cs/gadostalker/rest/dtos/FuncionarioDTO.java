package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

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
