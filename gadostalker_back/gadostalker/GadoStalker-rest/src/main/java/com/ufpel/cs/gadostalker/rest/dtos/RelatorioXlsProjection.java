package com.ufpel.cs.gadostalker.rest.dtos;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author gsutavo
 */
@XmlRootElement
public class RelatorioXlsProjection {
    
    @XmlElement
    public Long idTransacao;
    
    @XmlElement
    public String nomeAnuncio;
    
    @XmlElement
    public BigDecimal precoTransacao;
    
    @XmlElement
    public int quantidade;
    
    @XmlElement
    public String dataTransacao;

    public RelatorioXlsProjection() {
    }

    public RelatorioXlsProjection(Long idTransacao, String nomeAnuncio, BigDecimal precoTransacao, int quantidade, Date dataTransacao) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        this.idTransacao = idTransacao;
        this.nomeAnuncio = nomeAnuncio;
        this.precoTransacao = precoTransacao;
        this.quantidade = quantidade;
        this.dataTransacao = sdf.format(dataTransacao);
    }
    
    
}
