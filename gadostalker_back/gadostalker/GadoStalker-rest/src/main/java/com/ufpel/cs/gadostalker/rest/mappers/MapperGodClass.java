package com.ufpel.cs.gadostalker.rest.mappers;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import com.ufpel.cs.gadostalker.rest.entities.Usuario;
import org.modelmapper.ModelMapper;

/**
 * TODO: Mudar nome da Classe antes de entregar projeto Final!
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
