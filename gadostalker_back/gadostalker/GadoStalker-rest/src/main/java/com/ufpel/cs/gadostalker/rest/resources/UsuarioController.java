/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cd.gadostalker.dto.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import com.ufpel.cs.gadostalker.rest.entity.UsuarioComum;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.PersistenceUnit;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author kevin
 */
@Path("/usuario")
public class UsuarioController {

    @PersistenceUnit(name = "gadostalker")
    private EntityManagerFactory emf;

    @PersistenceContext
    private EntityManager em;

    public UsuarioController() {
    }

    @POST
    @Path("/login")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response login(@Context ContainerRequestContext crc, @Context final HttpServletResponse response, UsuarioDTO usuarioDTO) {

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

        usuarioDTO.telefone = usuarioLogado.getTelefone();
        usuarioDTO.nome = usuarioLogado.getNome();
        usuarioDTO.cpf = usuarioLogado.getCpf();
        usuarioDTO.senha = null;

        return Response
                .ok(usuarioDTO)
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @POST
    @Path("/cadastro")
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastro(@Context ContainerRequestContext crc, @Context final HttpServletResponse response, UsuarioComum usuario) {

        try {
            em.persist(usuario);
        } catch (PersistenceException ex) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .build();
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
}
