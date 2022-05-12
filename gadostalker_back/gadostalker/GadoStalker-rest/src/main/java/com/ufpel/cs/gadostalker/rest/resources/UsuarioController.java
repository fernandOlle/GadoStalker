package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Funcionario;
import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import com.ufpel.cs.gadostalker.rest.entity.UsuarioComum;
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

/**
 *
 * @author kevin
 */
@Path("/usuario")
public class UsuarioController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
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

        UsuarioDTO usuarioDto = new UsuarioDTO(); 
        usuarioDto.cpf = usuarioLogado.getCpf();
        
        return Response
                .ok(usuarioDto)
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @POST
    @Path("/cadastro/{tipo}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastro(UsuarioDTO usuarioDTO, @PathParam("tipo") String tipo) {
                
        switch (tipo) {
            //Proprietario
            case "prop":
                try {
                    usuarioDTO.tipoUsuario=(Usuario.TipoUsuario.PROPRIETARIO);
                    Proprietario proprietario = new Proprietario(usuarioDTO);
                    
                    em.persist(proprietario);
                } catch (PersistenceException ex) {
                    return Response
                            .ok()
                            .status(Response.Status.BAD_REQUEST)
                            .build();
                }
                break;
                
            //Funcionario
            case "func":
                try {
                    Fazenda fazenda;
                    TypedQuery<Fazenda> query = em.createQuery("select f from Fazenda f where f.SNCR = :sncr", Fazenda.class)
                            .setParameter("sncr", usuarioDTO.fazendas.get(0).SNCR);
                    fazenda = query.getSingleResult();
                    usuarioDTO.tipoUsuario = (Usuario.TipoUsuario.FUNCIONARIO);
                    Funcionario funcionario = new Funcionario(usuarioDTO, fazenda);
                    em.persist(funcionario);
                } catch (PersistenceException ex) {
                    return Response
                            .status(Response.Status.BAD_REQUEST)
                            .build();
                }
                break;
                
            //UsuarioComum
            case "uc":
                try {
                    usuarioDTO.tipoUsuario = (Usuario.TipoUsuario.USUARIO_COMUM);
                    UsuarioComum uc = new UsuarioComum(usuarioDTO);
                    em.persist(uc);
                } catch (PersistenceException ex) {
                    return Response
                            .status(Response.Status.BAD_REQUEST)
                            .build();
                }
                break;
                
            default:
                //TODO;
        }


        return Response
                .status(Response.Status.CREATED)
                
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
