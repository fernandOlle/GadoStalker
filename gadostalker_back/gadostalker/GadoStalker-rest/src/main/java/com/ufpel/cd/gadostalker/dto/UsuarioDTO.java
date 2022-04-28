/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cd.gadostalker.dto;

import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */

@XmlRootElement
public class UsuarioDTO {
    @XmlElement public String cpf;
    @XmlElement public String nome;
    @XmlElement public String senha;
    @XmlElement public String telefone;
    @XmlElement public String email;
    @XmlElement public Usuario.PerguntaSegurancaEnum pergunta;
    @XmlElement public String resposta;
    
    public UsuarioDTO(){
    }
    
    public UsuarioDTO(Usuario u) {
        cpf = u.getCpf();
        nome = u.getNome();
        senha = u.getSenha();
        telefone = u.getTelefone();
        email = u.getEmail();
        pergunta = u.getPergunta();
        resposta = u.getResposta();
    }
}
