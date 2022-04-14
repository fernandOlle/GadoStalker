package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
 * @author fernandOlle
 */
@Entity
@Table(name = "produto")
@SequenceGenerator(name = "seqAnuncio", sequenceName = "SEQANUNCIO", allocationSize = 1)
public class Produto implements Serializable {

    
    public enum TipoProdutoEnum {
        MEL("Mel"),
        OVO("Ovo");
        private final String tipo;

        private TipoProdutoEnum(String tipo) {
            this.tipo = tipo;
        }

        public String getTipo() {
            return tipo;
        }
    };
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqAnuncio")
    private Long id;

    @Column
    private String nome;
    
    @Column
    @Enumerated(EnumType.ORDINAL)
    private TipoProdutoEnum tipo;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAZENDAID", nullable = true, referencedColumnName = "id")
    private Fazenda fazenda;

    @Column
    private BigDecimal quantidade;

    @Column
    @Temporal(TemporalType.DATE)
    private Date dataInicial;
    
    @Column
    @Temporal(TemporalType.DATE)
    private Date dataFinal;

    public Produto() {
    }

    public Produto(Long id, String nome, TipoProdutoEnum tipo, Fazenda fazenda, BigDecimal quantidade, Date dataInicial, Date dataFinal) {
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.fazenda = fazenda;
        this.quantidade = quantidade;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoProdutoEnum getTipo() {
        return tipo;
    }

    public void setTipo(TipoProdutoEnum tipo) {
        this.tipo = tipo;
    }

    public Fazenda getFazenda() {
        return fazenda;
    }

    public void setFazenda(Fazenda fazenda) {
        this.fazenda = fazenda;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public Date getDataInicial() {
        return dataInicial;
    }

    public void setDataInicial(Date dataInicial) {
        this.dataInicial = dataInicial;
    }

    public Date getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(Date dataFinal) {
        this.dataFinal = dataFinal;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
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
        final Produto other = (Produto) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Produto{" + "id=" + id + ", nome=" + nome + ", tipo=" + tipo + ", fazenda=" + fazenda + ", quantidade=" + quantidade + ", dataInicial=" + dataInicial + ", dataFinal=" + dataFinal + '}';
    }

    
}
