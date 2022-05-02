package com.ufpel.cs.gadostalker.rest.entity;

import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

// DiscriminatorColumn -> permite fazer a juncao da coluna DTYPE gerada pelo JPA com o enum de tipo de usuario
// a annotation nao permite enum como tipo, entao precisa fazer uns esqueminhas
// o uso dessa annotation nao muda em nada o uso dos endpoints, todos os endpoints criados ate entao continuam funcionando igualmente
@DiscriminatorColumn(name = "TIPO_USUARIO", discriminatorType = DiscriminatorType.STRING)

// Inheritance -> descomentar essa linha vai fazer com que cada entidade tenha sua propria tabela,
// porem sem duplicar as colunas da entidade usuario,
// parte das informacoes de uma subclasse estarao na classe usuario, parte fica na tabela propria da subclasse
//@Inheritance(strategy = InheritanceType.JOINED)
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

    // pra conseguir fazer a juncao da tabela DTYPE com o enum de tipo é necessario criar constantes,
    // ja que apenas constantes sao permitidas como DTYPE
    // a classe Tipo dentro do enum encapsula essas constantes
    public enum TipoUsuario {
        PROPRIETARIO(Tipo.PROPRIETARIO),
        FUNCIONARIO(Tipo.FUNCIONARIO),
        USUARIO_COMUM(Tipo.USUARIO_COMUM);

        private TipoUsuario(String val) {
            if (!this.name().equals(val)) {
                throw new IllegalArgumentException("Valor do Enum deve ser igual ao da constante");
            }
        }

        public static class Tipo {

            public static final String PROPRIETARIO = "PROPRIETARIO";
            public static final String FUNCIONARIO = "FUNCIONARIO";
            public static final String USUARIO_COMUM = "USUARIO_COMUM";
        }
    }

    @Id
    @Column(unique = true)
    @XmlElement
    protected String cpf;

    @Column
    @XmlElement
    protected String nome;

    @Column
    @XmlElement
    protected String telefone;

    @Column
    @XmlElement
    protected String senha;

    @Column
    @Enumerated(EnumType.ORDINAL)
    @XmlElement
    protected PerguntaSegurancaEnum pergunta;

    @Column
    @XmlElement
    protected String resposta;

    @Column(unique = true)
    @XmlElement
    protected String email;

    // tipo do enum precisa ser string
    @Column(name = "tipo_usuario", nullable = false, insertable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    @XmlElement
    protected TipoUsuario tipoUsuario;

    public Usuario(String nome, String telefone, String senha, PerguntaSegurancaEnum pergunta, String resposta, String cpf, String email, TipoUsuario tipoUsuario) {
        this.nome = nome;
        this.telefone = telefone;
        this.senha = senha;
        this.pergunta = pergunta;
        this.resposta = resposta;
        this.cpf = cpf;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    public Usuario(UsuarioDTO usuarioDTO) {
        this.nome = usuarioDTO.nome;
        this.telefone = usuarioDTO.telefone;
        this.senha = usuarioDTO.senha;
        this.pergunta = usuarioDTO.pergunta;
        this.resposta = usuarioDTO.resposta;
        this.cpf = usuarioDTO.cpf;
        this.email = usuarioDTO.email;
        this.tipoUsuario = usuarioDTO.tipoUsuario;
    }

    public Usuario() {
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

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 41 * hash + Objects.hashCode(this.cpf);
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
        return Objects.equals(this.cpf, other.cpf);
    }
}
