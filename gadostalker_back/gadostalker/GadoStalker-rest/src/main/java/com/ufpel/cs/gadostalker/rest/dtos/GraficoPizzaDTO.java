package com.ufpel.cs.gadostalker.rest.dtos;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */
@XmlRootElement
public class GraficoPizzaDTO {
    
    @XmlElement
    public String produto;
    
    @XmlElement
    public Long vendas;
    
    public GraficoPizzaDTO() {
    }
    
    public GraficoPizzaDTO(String p, Long v) {
        produto = p;
        vendas = v;
    }
}
