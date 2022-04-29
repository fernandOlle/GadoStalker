/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Funcionario;
import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import com.ufpel.cs.gadostalker.rest.entity.UsuarioComum;
import com.ufpel.cs.gadostalker.rest.mapper.MapperGodClass;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.modelmapper.ModelMapper;

/**
 *
 * @author kevin
 */
@Path("/usuario")
public class UsuarioController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
    private ModelMapper modelMapper = new ModelMapper();

    public UsuarioController() {
    }

    @POST
    @Path("/login")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response login(UsuarioDTO usuarioDTO) {

        TypedQuery<Usuario> u = em.createNamedQuery("Usuario.login", Usuario.class);
        u.setParameter("email", usuarioDTO.email);
        u.setParameter("senha", usuarioDTO.senha);

        Usuario usuarioLogado;

        try {
            usuarioLogado = u.getSingleResult();
        } catch (PersistenceException ex) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .build();
        }

        return Response
                .ok(UsuarioDTO.builder()
                        .telefone(usuarioLogado.getTelefone())
                        .nome(usuarioLogado.getNome())
                        .cpf(usuarioLogado.getCpf())
                        .email(usuarioLogado.getEmail())
                        .build())
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @POST
    @Path("/cadastro?t={tipo}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastro(UsuarioDTO usuarioDTO, @PathParam("tipo") Integer tipo) {
        
        Usuario usuario = new Usuario(usuarioDTO);
        
        switch (tipo) {
            //Proprietario
            case 0:
                try {
                    Proprietario proprietario = (Proprietario) usuario;
                    proprietario.addFazenda(MapperGodClass
                            .convertFazendaDtoToEntity(usuarioDTO.fazendas.get(0)));
                    
                    em.persist(proprietario);
                } catch (PersistenceException ex) {
                    return Response
                            .ok()
                            .status(Response.Status.BAD_REQUEST)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Access-Control-Allow-Methods", "POST")
                            .build();
                }
                break;
                
            //Funcionario
            case 1:
                try {
                    em.persist((Funcionario) usuario);
                } catch (PersistenceException ex) {
                    return Response
                            .status(Response.Status.BAD_REQUEST)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Access-Control-Allow-Methods", "POST")
                            .build();
                }
                break;
                
            //UsuarioComum
            case 2:
                try {
                    em.persist((UsuarioComum) usuario);
                } catch (PersistenceException ex) {
                    return Response
                            .status(Response.Status.BAD_REQUEST)
                            .header("Access-Control-Allow-Origin", "*")
                            .header("Access-Control-Allow-Methods", "POST")
                            .build();
                }
                break;
                
            default:
                //TODO;
        }


        return Response
                .status(Response.Status.CREATED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @Path("/getAllPerguntas")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllPerguntas() {

        Map<Usuario.PerguntaSegurancaEnum, String> mapEnumStringPergunta = new HashMap<>();

        Arrays.asList(Usuario.PerguntaSegurancaEnum.values())
                .stream()
                .forEach(valueEnum -> {
                    mapEnumStringPergunta.put(valueEnum, valueEnum.getPergunta());
                });

        return Response
                .ok(mapEnumStringPergunta)
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }

    @Path("/recuperarSenha")
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response recuperarSenha(UsuarioDTO usuarioRecuperaSenha) {

        TypedQuery<Usuario> u = em.createQuery("select u from Usuario u where u.email = :email", Usuario.class)
                .setParameter("email", usuarioRecuperaSenha.email);
        Usuario usuario;
        try {
            usuario = u.getSingleResult();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .build();
        }

        if (usuarioRecuperaSenha.pergunta == usuario.getPergunta()) {
            if (usuarioRecuperaSenha.resposta.toLowerCase().equals(usuario.getResposta().toLowerCase())) {
                usuario.setSenha(usuarioRecuperaSenha.senha);

                em.merge(usuario);

                return Response
                        .status(Response.Status.ACCEPTED)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Methods", "POST")
                        .build();
            }
        }

        return Response
                .status(Response.Status.UNAUTHORIZED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }
}
