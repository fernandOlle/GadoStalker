package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.ProdutoDTO;
import com.ufpel.cs.gadostalker.rest.entity.Produto;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.ArrayList;

/**
 *
 * @author kevin
 */
@Path("/produto")
public class ProdutoController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;

    public ProdutoController() {
    }

    @POST
    @Path("/adicionar")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response adicionarProduto(ProdutoDTO produtoDTO) {

        Produto p = new Produto(produtoDTO);

        try {
            em.persist(p);
        } catch (PersistenceException ex) {
            return Response
                .status(Response.Status.BAD_REQUEST)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
        }

        produtoDTO.id = p.getId();

        return Response
                .ok(produtoDTO)
                .status(Response.Status.CREATED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @GET
    @Path("/consultarPorTipo")
    @Produces({MediaType.APPLICATION_JSON})
    public Response consultarProdutoPorTipo(ProdutoDTO produtoDTO) {
        
        TypedQuery<Produto> p = em.createQuery("select p from Produto p where p.tipo = :tipo and p.fazenda = :fazenda", Produto.class)
                .setParameter("tipo", produtoDTO.tipo)
                .setParameter("fazenda", produtoDTO.fazenda);

        List<Produto> produtos;
        try {
            produtos = p.getResultList();
            
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .build();
        }

        List<ProdutoDTO> produtoDTOs = new ArrayList<>();

        for (Produto produto : produtos) {
            produtoDTOs.add(new ProdutoDTO(produto));
        }

        return Response
                .ok(produtoDTOs)
                .status(Response.Status.FOUND)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }

    @GET
    @Path("/consultar/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response consultarProduto(@PathParam("id") Long id) {

        Produto produto;
        try {
            produto = em.find(Produto.class, (Long) id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .build();
        }

        ProdutoDTO produtoDTO = new ProdutoDTO(produto);

        return Response
                .ok(produtoDTO)
                .status(Response.Status.FOUND)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }

    @POST
    @Path("/editar/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarProduto(ProdutoDTO produtoDTO, @PathParam("id") Long id) {
        Produto p;
        
        try {
            p = em.find(Produto.class, (Long) id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST")
                    .build();
        }
        
        p.setNome(produtoDTO.nome);
        p.setFazenda(produtoDTO.fazenda);
        p.setQuantidade(produtoDTO.quantidade);
        p.setTipo(produtoDTO.tipo);

        em.merge(p);

        return Response
                .ok(new ProdutoDTO(p))
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @GET
    @Path("/remover/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response removerProduto(@PathParam("id") Long id) {
        Produto produto;

        try {
            produto = em.find(Produto.class, (Long) id);
        } catch (Exception e) {
            return Response
                .status(Response.Status.NOT_FOUND)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
        }

        try {
            em.remove(produto);
        } catch (PersistenceException ex) {
            return Response
                .status(Response.Status.BAD_REQUEST)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
        }

        return Response
                .status(Response.Status.ACCEPTED)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .build();
    }
}
