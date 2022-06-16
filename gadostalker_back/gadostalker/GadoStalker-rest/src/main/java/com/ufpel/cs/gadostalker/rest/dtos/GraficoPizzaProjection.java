package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Produto.TipoProdutoEnum;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */
@XmlRootElement
public class GraficoPizzaProjection {
    
    @XmlElement
    public String produto;
    
    @XmlElement
    public Long vendas;
    
    public GraficoPizzaProjection() {
    }
    
    public GraficoPizzaProjection(TipoProdutoEnum p, Long v) {
        produto = p.getTipo();
        vendas = v;
    }
}
