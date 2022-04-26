/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.PersistenceUnit;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpServletResponse;
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

    @GET
    @Path("/login")
    @Produces({MediaType.APPLICATION_JSON})
    public Response login(@Context ContainerRequestContext crc, @Context final HttpServletResponse response) {
        String cpf = null;
        String senha = null;
        TypedQuery<Usuario> u = em.createNamedQuery("Usuario.login", Usuario.class);
        u.setParameter("cpf", cpf);
        u.setParameter("senha", senha);

        Usuario usuarioLogado = u.getSingleResult();

        if (usuarioLogado == null) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .build();
        }

        return Response
                .ok(usuarioLogado)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }

    @POST
    @Path("/cadastro")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response cadastro(@Context ContainerRequestContext crc, @Context final HttpServletResponse response) {
        
        Usuario usuarioNovo;
        
        try
        {
            usuarioNovo = new Usuario(/* todos os params (exceto id) */);
            //ou usar abaixo
            //
//            usuarioNovo.setCpf(/* param */);
//            usuarioNovo.setNome(/* param */);
//            usuarioNovo.setPergunta(/* param */);
//            usuarioNovo.setResposta(/* param */);
//            usuarioNovo.setSenha(/* param */);
//            usuarioNovo.setTelefone(/* param */);
            
            em.persist(usuarioNovo);
        }
        catch(PersistenceException ex)
        {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .build();
        }
        
        
        return Response
                .ok(usuarioNovo)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }
}
