package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author gustavo
 */
@Entity
@Table(name = "proprietario")
public class Proprietario extends Usuario implements Serializable {
    
    @OneToMany(cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name="proprietarioid")
    private List<Fazenda> fazendas = new ArrayList<>();

    public Proprietario() {
    }

    public Proprietario(String nome, String telefone, String senha, 
            PerguntaSegurancaEnum pergunta, String resposta, String cpf, 
            String email, List<Fazenda> fazendas) {
        super(nome, telefone, senha, pergunta, resposta, cpf, email);
        this.fazendas = fazendas;
    }

    public List<Fazenda> getFazendas() {
        return fazendas;
    }

    public void setFazendas(List<Fazenda> fazendas) {
        this.fazendas = fazendas;
    }

    public Proprietario addFazenda(Fazenda fazenda) {
        fazendas.add(fazenda);
        
        return this;
    }
    
    public Proprietario removeFazenda(Fazenda fazenda) {
        fazendas.remove(fazenda);
        
        return this;
    }
    
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 83 * hash + Objects.hashCode(this.id);
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
        final Proprietario other = (Proprietario) obj;
        return Objects.equals(this.id, other.id);
    }

}
