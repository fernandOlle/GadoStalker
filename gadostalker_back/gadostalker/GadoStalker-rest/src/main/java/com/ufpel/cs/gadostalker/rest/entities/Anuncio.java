package com.ufpel.cs.gadostalker.rest.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

/**
 *
 * @author joaolrezende
 */
@Entity
@Table(name = "anuncio")
@SequenceGenerator(name = "seqAnuncio", sequenceName = "SEQANUNCIO", allocationSize = 1)
@NamedQuery(name = "Anuncio.getAllAnunciosQueContemProduto", query = "SELECT a FROM Anuncio a INNER JOIN a.produtos p "
        + "WHERE EXISTS (SELECT p2 FROM Produto p2 WHERE p2.tipo = :tipo)")
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
    
    //@ManyToOne(fetch = FetchType.LAZY)
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "PRODUTOID", nullable = true, referencedColumnName = "id")
    private List<Produto> produtos;
    
    @Column
    @Temporal(TemporalType.DATE)
    private Date dataInicial;
    
    @Column
    @Temporal(TemporalType.DATE)
    private Date dataFinal;
    
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "Anuncio")
    @JoinColumn(name = "imagem_id")
    @PrimaryKeyJoinColumn
    private Imagem imagem;

    public Anuncio() {
    }

    public Anuncio(String titulo, String descricao, BigDecimal preco, String desconto, List<Produto> produto, Date dataInicial, Date dataFinal) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
        this.desconto = desconto;
        this.produtos = produto;
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

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void addProduto(Produto produto) {
        produtos.add(produto);
    }
    
    public void removeProdto(Produto produto) {
        produtos.remove(produto);
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

    public Imagem getImagem() {
        return imagem;
    }

    public void setImagem(Imagem imagem) {
        this.imagem = imagem;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.id);
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
        final Anuncio other = (Anuncio) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return "com.ufpel.cs.gadostalker.rest.entity.Anuncio[ id=" + id + " ]";
    }
    
}
