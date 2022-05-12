package com.ufpel.cs.gadostalker.rest.dtos;

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

    public FazendaDTO() {
    }
    
}
