package com.ufpel.cs.gadostalker.rest.entities;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author thomazio
 */
@Entity
@Table(name = "transacao")
@SequenceGenerator(name = "seqTransacao", sequenceName = "SEQTRANSACAO", allocationSize = 1)
public class Transacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqTransacao")
    private Long id;
    
    @Column
    @Temporal(TemporalType.DATE)
    private Date dataTransacao;
    
    @Column
    private BigDecimal preco;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ANUNCIOID", nullable = true, referencedColumnName = "id")
    private Anuncio anuncio;
    
    @Column
    private int quantidade;

    public Transacao() {
    }

    public Transacao(Date data, BigDecimal preco, int quantidade) {
        this.dataTransacao = data;
        this.preco = preco;
        this.quantidade = quantidade;
    }
    
    public Transacao(TransacaoDTO dto) {
        this.preco = dto.preco;
        this.quantidade = dto.quantidade;
    }

    public Long getId() {
        return id;
    }

    public Date getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(Date dataTransacao) {
        this.dataTransacao = dataTransacao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Anuncio getAnuncio() {
        return anuncio;
    }

    public void setAnuncio(Anuncio anuncio) {
        this.anuncio = anuncio;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 17 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Transacao other = (Transacao) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    @Override
    public String toString() {
        return "com.ufpel.cs.gadostalker.rest.entity.Transacao[ id=" + id + " ]";
    }
    
}
