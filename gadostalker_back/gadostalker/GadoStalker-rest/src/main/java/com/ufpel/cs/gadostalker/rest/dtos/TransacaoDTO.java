package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.math.BigDecimal;
import java.util.Date;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

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
    public Anuncio anuncio;
    
    @XmlElement
    public int quantidade;

    public TransacaoDTO() {
    }

    public TransacaoDTO(Transacao transacao) {
        this.id = transacao.getId();
        this.dataTransacao = transacao.getDataTransacao();
        this.preco = transacao.getPreco();
        this.anuncio = transacao.getAnuncio();
        this.quantidade = transacao.getQuantidade();
    }
    
}
