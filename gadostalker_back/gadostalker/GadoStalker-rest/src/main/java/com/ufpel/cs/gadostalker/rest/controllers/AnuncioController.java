package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.AnuncioDTO;
import com.ufpel.cs.gadostalker.rest.dtos.ProdutoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Produto;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author thomazio
 */
@Path("/anuncio")
public class AnuncioController {
    
    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
    @POST
    @Path("/cadastrar")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastraAnuncio(AnuncioDTO anuncio) {
        
        List<Produto> produtos = new ArrayList<>();
        
        anuncio.produtos.forEach(p -> {
            Produto produto = em.find(Produto.class, p.id);
            produtos.add(produto);
        });
        
        Anuncio a = new Anuncio(anuncio.titulo, anuncio.descricao, anuncio.preco, anuncio.desconto, produtos, new Date(), null);
        
        try {   
            em.persist(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        anuncio.produtos = new ArrayList<>();
        
        a.getProdutos().forEach(p -> {
            anuncio.produtos.add(new ProdutoDTO(p));
        });
        anuncio.id = a.getId();
        anuncio.dataInicial = a.getDataInicial();
        
        return Response
                .ok(anuncio)
                .status(Response.Status.CREATED)
                .build();
    }
    
    @PUT
    @Path("/editar/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarAnuncio(@PathParam("id") Long id, AnuncioDTO anuncio) {
        
        Anuncio a = em.find(Anuncio.class, id);
        
        try {
            a.setTitulo(anuncio.titulo);
            a.setDescricao(anuncio.descricao);
            a.setPreco(anuncio.preco);
            a.setDesconto(anuncio.desconto);
            
            a = em.merge(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        anuncio = new AnuncioDTO(a);
        
        return Response
                .ok(anuncio)
                .status(Response.Status.ACCEPTED)
                .build();
    }
    
    @PUT
    @Path("/encerra/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response encerraAnuncio(@PathParam("id") Long id) {
        
        Anuncio a = em.find(Anuncio.class, id);
        
        try {
            a.setDataFinal(new Date());
            a = em.merge(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        AnuncioDTO anuncio = new AnuncioDTO(a);
        
        return Response
                .ok(anuncio)
                .status(Response.Status.ACCEPTED)
                .build();
    }
    
    @PUT
    @Path("/reabre/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response reabreAnuncio(@PathParam("id") Long id) {
        
        Anuncio a = em.find(Anuncio.class, id);
        
        try {
            a.setDataInicial(new Date());
            a.setDataFinal(null);
            a = em.merge(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        AnuncioDTO anuncio = new AnuncioDTO(a);
        
        return Response
                .ok(anuncio)
                .status(Response.Status.ACCEPTED)
                .build();
    }
    
    @DELETE
    @Path("/deleta/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response deletaAnuncio(@PathParam("id") Long id) {
        
        Anuncio a = em.find(Anuncio.class, id);
        
        try {
            em.remove(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        return Response
                .status(Response.Status.ACCEPTED)
                .build();
    }
}
