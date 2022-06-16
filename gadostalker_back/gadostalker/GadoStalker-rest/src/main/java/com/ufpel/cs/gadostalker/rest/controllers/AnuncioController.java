package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.AnuncioDTO;
import com.ufpel.cs.gadostalker.rest.dtos.ProdutoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Imagem;
import com.ufpel.cs.gadostalker.rest.entities.Produto;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
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

        Produto p;
        try {
            p = em.find(Produto.class, anuncio.produto.id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        Anuncio a = new Anuncio(anuncio.titulo, anuncio.descricao, anuncio.preco, anuncio.desconto, p, new Date(), null);

        try {
            em.persist(a);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        anuncio.produto = new ProdutoDTO(p);
        
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

        Anuncio a;
        Produto p;
        

        try {
            a = em.find(Anuncio.class, id);
            p = em.find(Produto.class, anuncio.produto.id);
            
            a.setTitulo(anuncio.titulo);
            a.setDescricao(anuncio.descricao);
            a.setPreco(anuncio.preco);
            a.setDesconto(anuncio.desconto);
            a.setProduto(p);
            
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
    
    @GET
    @Path("getAnuncioID/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response anunciosProprietario(@PathParam("id") Long id) {
        
        Anuncio u;
        
        try {
            u = em.find(Anuncio.class, id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        AnuncioDTO anuncioDTO = new AnuncioDTO(u);
        
        return Response
                .ok(anuncioDTO)
                .status(Response.Status.OK)
                .build();
    }

    @GET
    @Path("getAllAnunciosByProprietarioCPF/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response anunciosProprietario(@PathParam("cpf") String cpf) {

        TypedQuery<Anuncio> anunciosQuery = em.createQuery("SELECT a FROM Anuncio a WHERE a.produto.fazenda.proprietario.cpf = :cpf",
                Anuncio.class);
        anunciosQuery.setParameter("cpf", cpf);

        List<Anuncio> anuncios;

        try {
            anuncios = anunciosQuery.getResultList();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        if (anuncios.isEmpty()) {
            return Response
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }

        List<AnuncioDTO> anuncioDTOs = new ArrayList<>();

        anuncios.forEach(a -> {
            anuncioDTOs.add(new AnuncioDTO(a));
        });

        return Response
                .ok(anuncioDTOs)
                .status(Response.Status.OK)
                .build();
    }

    @GET
    @Path("/pesquisa")
    @Produces({MediaType.APPLICATION_JSON})
    public Response pesquisaAnuncios(@QueryParam("tipo") String tipo,
            @DefaultValue("1") @QueryParam("page") Integer page,
            @DefaultValue("desc") @QueryParam("order") String order,
            @DefaultValue("8") @QueryParam("qnt") Integer quantity,
            @QueryParam("search") String search) {

        if (page < 1) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        switch (order) {
            case "desc":
            case "asc":
                break;

            default:
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
        }

        switch (quantity) {
            case 8:
            case 12:
            case 24:
                break;

            default:
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
        }

        String query = "SELECT a FROM Anuncio a";

        query += " WHERE a.dataFinal IS NULL";

        if (tipo != null) {
            query += " AND a.produto.tipo = :tipo";
        }

        if (search != null) {
            query += " AND UPPER(a.titulo) LIKE CONCAT('%',UPPER(:search),'%')";
        }

        query += (" ORDER BY a.titulo, a.id " + order);

        TypedQuery<Anuncio> anunciosQuery = em.createQuery(query, Anuncio.class);

        if (tipo != null) {
            anunciosQuery.setParameter("tipo", Produto.TipoProdutoEnum.valueOf(tipo));
        }

        if (search != null) {
            anunciosQuery.setParameter("search", search);
        }

        anunciosQuery.setFirstResult(quantity * (page - 1));
        anunciosQuery.setMaxResults(quantity);

        List<Anuncio> anuncios = anunciosQuery.getResultList();

        if (anuncios.isEmpty()) {
            return Response
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }

        List<AnuncioDTO> anuncioDTOs = new ArrayList<>();

        anuncios.forEach(a -> {
            anuncioDTOs.add(new AnuncioDTO(a));
        });

        return Response
                .ok(anuncioDTOs)
                .status(Response.Status.OK)
                .build();
    }

    @GET
    @Path("/setImagemToAnuncio/{idAnuncio}/{idImagem}")
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response setImagemToAnuncio(@PathParam("idAnuncio") Long idAnuncio, @PathParam("idImagem") Long idImagem) {
        Anuncio a = em.find(Anuncio.class, idAnuncio);
        Imagem i = em.find(Imagem.class, idImagem);

        try {
            a.setImagem(i);
            a = em.merge(a);
            em.flush();
        } catch(Exception e) {
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
}
