package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Produto;
import com.ufpel.cs.gadostalker.rest.entity.Produto.TipoProdutoEnum;
import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author kevin
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement
public class ProdutoDTO {
    
    @XmlElement
    public Long id;
    
    @XmlElement
    public String nome;
    
    @XmlElement
    public TipoProdutoEnum tipo;
    
    @XmlElement
    public Fazenda fazenda;
    
    @XmlElement
    public BigDecimal quantidade;
   
    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.tipo = produto.getTipo();
        this.fazenda = produto.getFazenda();
        this.quantidade = produto.getQuantidade();
    }
}
