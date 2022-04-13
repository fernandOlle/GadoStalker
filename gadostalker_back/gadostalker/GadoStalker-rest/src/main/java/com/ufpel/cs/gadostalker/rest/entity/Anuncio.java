package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author joaolrezende
 */
@Entity
@Table(name = "anuncio")
@SequenceGenerator(name = "seqAnuncio", sequenceName = "SEQANUNCIO", allocationSize = 1)
public class Anuncio implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqAnuncio")
    private Long id;

    @Column
    private String titulo;
    
    @Column
    private String descricao;
    
    @Column
    private BigDecimal preco;
    
    @Column
    private String desconto;
    
    @Column
    @Temporal(TemporalType.DATE)
    private LocalDate dataInicial;
    
    @Column
    @Temporal(TemporalType.DATE)
    private LocalDate dataFinal;

    public Anuncio() {
    }

    public Anuncio(Long id, String titulo, String descricao, BigDecimal preco, String desconto, LocalDate dataInicial, LocalDate dataFinal) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
        this.desconto = desconto;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
    }
    
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getDesconto() {
        return desconto;
    }

    public void setDesconto(String desconto) {
        this.desconto = desconto;
    }

    public LocalDate getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(LocalDate dataInicial) {
        this.dataInicial = dataInicial;
    }

    public LocalDate getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(LocalDate dataFinal) {
        this.dataFinal = dataFinal;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Anuncio)) {
            return false;
        }
        Anuncio other = (Anuncio) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ufpel.cs.gadostalker.rest.entity.Anuncio[ id=" + id + " ]";
    }
    
}
