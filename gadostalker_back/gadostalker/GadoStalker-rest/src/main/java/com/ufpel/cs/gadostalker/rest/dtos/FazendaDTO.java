package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author folle
 */

@XmlRootElement
public class FazendaDTO {

    @XmlElement
    public String SNCR;
    @XmlElement
    public String nome;
    @XmlElement
    public String email;
    @XmlElement
    public String telefone;
    @XmlElement
    public List<UsuarioDTO> funcionarios;
    @XmlElement
    public Boolean isZapZap;
    
    public FazendaDTO() {
    }
    
    public FazendaDTO(Fazenda fazenda) {
        this.isZapZap = fazenda.isZapZap();
        this.SNCR = fazenda.getSNCR();
        this.nome = fazenda.getNome();
        this.email = fazenda.getEmail();
        this.telefone = fazenda.getTelefone();
    }
    
}
