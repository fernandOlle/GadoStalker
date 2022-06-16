/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import java.math.BigDecimal;
import java.util.Date;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author joaolrezende
 */
@XmlRootElement
public class AnuncioDTO {
    
    @XmlElement
    public Long id;
    
    @XmlElement
    public String titulo;
    
    @XmlElement
    public String descricao;
    
    @XmlElement
    public BigDecimal preco;
    
    @XmlElement
    public int desconto;
    
    @XmlElement
    public ProdutoDTO produto;
    
    @XmlElement
    public Date dataInicial;
    
    @XmlElement
    public Date dataFinal;
    
    @XmlElement
    public Long imagemId;
    
    public AnuncioDTO() {
        
    }
    
    public AnuncioDTO(Anuncio a) {
        this.id = a.getId();
        this.titulo = a.getTitulo();
        this.descricao = a.getDescricao();
        this.preco = a.getPreco();
        this.desconto = a.getDesconto();
        this.produto = new ProdutoDTO(a.getProduto());
        this.dataInicial = a.getDataInicial();
        this.dataFinal = a.getDataFinal();
        this.imagemId = a.getImagem() != null ? a.getImagem().getId() : null;
    }
}
