/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.mapper;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import org.modelmapper.ModelMapper;

/**
 * Mudar nome da Classe antes de entregar projeto Final!
 * 
 * @author folle
 */
public class MapperGodClass {
    private static ModelMapper modelMapper = new ModelMapper();
    
    public static Fazenda convertFazendaDtoToEntity(FazendaDTO fazendaDTO) {
        return modelMapper.map(fazendaDTO, Fazenda.class);
    }
    
    public static Usuario convertUsuarioDtoToEntity(UsuarioDTO usuarioDTO){
        return modelMapper.map(usuarioDTO, Usuario.class);
    }
}