package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.math.BigDecimal;
import java.util.Date;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author gsutavo 
 */
@XmlRootElement
public class TransacaoDTO {
    
    @XmlElement
    public Long id;
    
    @XmlElement
    public Date dataTransacao;
    
    @XmlElement
    public BigDecimal preco;
    
    @XmlElement
    public AnuncioDTO anuncioDTO;
    
    @XmlElement
    public int quantidade;

    public TransacaoDTO() {
    }

    public TransacaoDTO(Transacao transacao) {
        this.dataTransacao = transacao.getDataTransacao();
        this.preco = transacao.getPreco();
        this.quantidade = transacao.getQuantidade();
    }
    
}
