package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Usuario;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */

@XmlRootElement
public class UsuarioDTO {

    @XmlElement
    public String cpf;
    @XmlElement
    public String nome;
    @XmlElement
    public String senha;
    @XmlElement
    public String telefone;
    @XmlElement
    public String email;
    @XmlElement
    public Usuario.PerguntaSegurancaEnum pergunta;
    @XmlElement
    public String resposta;
    @XmlElement
    public List<FazendaDTO> fazendas;
    @XmlElement
    public Usuario.TipoUsuario tipoUsuario;
    
    public UsuarioDTO(){
    }
    
    public UsuarioDTO addFazendaDTO(FazendaDTO fazenda) {
        fazendas.add(fazenda);
        
        return this;
    }
    
    public UsuarioDTO removeFazendaDTO(FazendaDTO fazenda) {
        fazendas.remove(fazenda);
        
        return this;
    }
}
