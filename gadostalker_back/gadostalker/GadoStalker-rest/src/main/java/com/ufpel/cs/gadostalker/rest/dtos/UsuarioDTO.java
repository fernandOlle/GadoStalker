/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author thouta
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    
    public UsuarioDTO addFazendaDTO(FazendaDTO fazenda) {
        fazendas.add(fazenda);
        
        return this;
    }
    
    public UsuarioDTO removeFazendaDTO(FazendaDTO fazenda) {
        fazendas.remove(fazenda);
        
        return this;
    }
}
