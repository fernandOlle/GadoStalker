package com.ufpel.cs.gadostalker.rest.entity;

import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
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
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author kevin
 */
@Entity
@Table(name = "usuario")
@SequenceGenerator(name = "seqUsuario", sequenceName = "SEQUSUARIO", allocationSize = 1)
@NamedQuery(name = "Usuario.login", query = "SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha")
@XmlRootElement
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
    };

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqUsuario")
    protected Long id;

    @Column
    @XmlElement
    private String nome;

    @Column
    @XmlElement
    private String telefone;

    @Column
    @XmlElement
    private String senha;

    @Column
    @Enumerated(EnumType.ORDINAL)
    @XmlElement
    private PerguntaSegurancaEnum pergunta;

    @Column
    @XmlElement
    private String resposta;

    @Column(unique = true)
    @XmlElement
    private String cpf;

    @Column(unique = true)
    @XmlElement
    private String email;

    public Usuario(String nome, String telefone, String senha, PerguntaSegurancaEnum pergunta, String resposta, String cpf, String email) {
        this.nome = nome;
        this.telefone = telefone;
        this.senha = senha;
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.cpf = cpf;
        this.email = email;
    }

    public Usuario(UsuarioDTO usuarioDTO) {
        this.nome = usuarioDTO.nome;
        this.telefone = usuarioDTO.telefone;
        this.senha = usuarioDTO.senha;
        this.pergunta = usuarioDTO.pergunta;
        this.resposta = usuarioDTO.resposta;
        this.cpf = usuarioDTO.cpf;
        this.email = usuarioDTO.email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
