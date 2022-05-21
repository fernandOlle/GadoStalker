package com.ufpel.cs.gadostalker.rest.entity;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thomazio
 */
@Entity
@Table(name = "fazenda")
@SequenceGenerator(name = "seqFazenda", sequenceName = "SEQFAZENDA", allocationSize = 1)
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Fazenda.getAllProdutos", query = "SELECT p FROM Fazenda f INNER JOIN f.produtos p WHERE f.SNCR = :sncr"),
    @NamedQuery(name = "Fazenda.getAllProdutosByTipo", query = "SELECT p FROM Fazenda f INNER JOIN f.produtos p where f.SNCR = :sncr and p.tipo = :tipo")
})
public class Fazenda implements Serializable {

    @Id
    private String SNCR;

    @Column
    private String nome;

    @Column
    private String email;

    @Column
    private String telefone;
    
    @OneToMany(mappedBy = "fazenda", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "FAZENDA_SNCR")
    private List<Produto> produtos;
    
    @ManyToOne(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    private Proprietario proprietario;

    public Fazenda() {
    }
    
    public Fazenda(FazendaDTO fazendaDTO) {
        this.SNCR = fazendaDTO.SNCR;
        this.nome = fazendaDTO.nome;
        this.email = fazendaDTO.email;
        this.telefone = fazendaDTO.telefone;
    }

    public Fazenda(String SNCR, String nome, String email, String telefone) {
        this.SNCR = SNCR;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    public String getSNCR() {
        return SNCR;
    }

    public void setSNCR(String SNCR) {
        this.SNCR = SNCR;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Proprietario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }
    
    public List<Produto> getProdutos() {
        return produtos;
    }
    
    public void addProduto(Produto produto) {
        produtos.add(produto);
    }
    
    public void removeProduto(Produto produto) {
        produtos.remove(produto);
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 71 * hash + Objects.hashCode(this.SNCR);
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
        final Fazenda other = (Fazenda) obj;
        if (!Objects.equals(this.SNCR, other.SNCR)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.ufpel.cs.gadostalker.rest.entity.Fazenda[ SNCR=" + SNCR + " ]";
    }
}
