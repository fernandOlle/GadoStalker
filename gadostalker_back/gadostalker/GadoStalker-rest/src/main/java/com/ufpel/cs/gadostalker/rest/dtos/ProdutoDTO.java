package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entity.Produto;
import com.ufpel.cs.gadostalker.rest.entity.Produto.TipoProdutoEnum;
import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kevin
 */

@XmlRootElement
public class ProdutoDTO {
    
    @XmlElement
    public Long id;
    
    @XmlElement
    public String nome;
    
    @XmlElement
    public TipoProdutoEnum tipo;
    
    @XmlElement
    public String fazenda;
    
    @XmlElement
    public BigDecimal quantidade;
   
    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.tipo = produto.getTipo();
        this.fazenda = produto.getFazenda().getSNCR();
        this.quantidade = produto.getQuantidade();
    }
}
