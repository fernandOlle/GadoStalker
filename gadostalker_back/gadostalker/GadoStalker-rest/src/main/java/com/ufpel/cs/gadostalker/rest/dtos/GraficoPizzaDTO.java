package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Produto.TipoProdutoEnum;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */
@XmlRootElement
public class GraficoPizzaDTO {
    
    @XmlElement
    public TipoProdutoEnum produto;
    
    @XmlElement
    public Long vendas;
    
    public GraficoPizzaDTO() {
    }
    
    public GraficoPizzaDTO(TipoProdutoEnum p, Long v) {
        produto = p;
        vendas = v;
    }
}
