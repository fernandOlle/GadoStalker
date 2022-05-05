package com.ufpel.cs.gadostalker.rest.dtos;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author folle
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
}
