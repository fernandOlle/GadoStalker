package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 *
 * @author kevin
 */

@Entity
@Table(name = "usuario")
@SequenceGenerator(name = "seqUsuario", sequenceName = "SEQUSUARIO", allocationSize = 1)
@NamedQuery(name = "Usuario.login", query = "SELECT u FROM Usuario u WHERE u.cpf = :cpf AND u.senha = :senha")
public class Usuario implements Serializable {

    public enum PerguntaSegurancaEnum {
        PROFESSORA("Nome primeira professora?"),
        COMIDA("Qual é a sua comida favorita?"),
        ANIMAL("Nome do seu primeiro animal de estimação?"),
        AMIGO("Nome do seu melhor amigo de infância?");
        private final String pergunta;

        private PerguntaSegurancaEnum(String pergunta) {
            this.pergunta = pergunta;
        }

        public String getPergunta() {
            return pergunta;
        }
        
        
//        Usuario.PerguntaSegurancaEnum tipo = Usuario.PerguntaSegurancaEnum.PROFESSORA;
//        
//        switch(tipo)
//        {
//            case AMIGO:
//                break;
//            case ANIMAL:
//                break;
//            case COMIDA:
//                break;
//            case PROFESSORA:
//                break;
//        }
        
    };
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqUsuario")
    protected Long id;
    @Column
    private String nome;
    @Column
    private String telefone;
    @Column
    private String senha;
    @Column
    @Enumerated(EnumType.ORDINAL)
    private PerguntaSegurancaEnum pergunta;
    @Column
    private String resposta;
    @Column(unique=true)
    private String cpf;

    public Usuario(String nome, String telefone, String senha, PerguntaSegurancaEnum pergunta, String resposta, String cpf) {
        this.nome = nome;
        this.telefone = telefone;
        this.senha = senha;
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.cpf = cpf;
    }

    public Usuario() {
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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public PerguntaSegurancaEnum getPergunta() {
        return pergunta;
    }

    public void setPergunta(PerguntaSegurancaEnum pergunta) {
        this.pergunta = pergunta;
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.id);
        hash = 41 * hash + Objects.hashCode(this.cpf);
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
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.cpf, other.cpf)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    
}
