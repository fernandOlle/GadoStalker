/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    public String desconto;
    
    @XmlElement
    public List<ProdutoDTO> produtos;
    
    @XmlElement
    public Date dataInicial;
    
    @XmlElement
    public Date dataFinal;
    
    public AnuncioDTO() {
        
    }
    
    public AnuncioDTO(Anuncio a) {
        this.titulo = a.getTitulo();
        this.descricao = a.getDescricao();
        this.preco = a.getPreco();
        this.desconto = a.getDesconto();
        this.produtos = new ArrayList<>();
        a.getProdutos().forEach(p -> this.produtos.add(new ProdutoDTO(p)));
        this.dataInicial = a.getDataInicial();
        this.dataFinal = a.getDataFinal();
    }
}
