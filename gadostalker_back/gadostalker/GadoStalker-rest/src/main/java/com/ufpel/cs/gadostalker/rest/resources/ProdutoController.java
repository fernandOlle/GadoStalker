package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.dtos.ProdutoDTO;
import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Produto;
import com.ufpel.cs.gadostalker.rest.entity.Produto.TipoProdutoEnum;
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
import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.ws.rs.PUT;

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
            p.setFazenda(em.find(Fazenda.class, produtoDTO.fazenda));
            p = em.merge(p);      
        } catch (PersistenceException ex) {
            return Response
                .status(Response.Status.BAD_REQUEST)
                .build();
        }
        produtoDTO.id = p.getId();

        return Response
                .ok(produtoDTO)
                .status(Response.Status.CREATED)
                .build();
    }
    
    @GET
    @Path("/getAllProdutosFazenda/{sncr}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllProdutosFazenda(@PathParam("sncr") String sncr) {
        TypedQuery<Produto> produtosQuery = em.createNamedQuery("Fazenda.getAllProdutos", Produto.class);
        produtosQuery.setParameter("sncr", sncr);
        
        List<Produto> produtos;
        
        try {
            produtos = produtosQuery.getResultList();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }
        
        if (produtos.isEmpty()) {
            return Response
                    .ok(produtos)
                    .build();
        }
        
        Map<Produto.TipoProdutoEnum, String> mapEnumStringPergunta;

        mapEnumStringPergunta = produtos
                .stream()
                .collect(Collectors.toMap(k -> k.getTipo(), v -> v.getTipo().getTipo(),(k1,k2)->k1));
        
        return Response
                .ok(mapEnumStringPergunta)
                .status(Response.Status.OK)
                .build();
    }

    @GET
    @Path("/consultarPorTipo/{tipo}/{sncr}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response consultarProdutoPorTipo(@PathParam("tipo") TipoProdutoEnum tipo, @PathParam("sncr") String sncr) {
        
        TypedQuery<Produto> p = em.createNamedQuery("Fazenda.getAllProdutosByTipo", Produto.class)
                .setParameter("tipo", tipo)
                .setParameter("sncr", sncr);

        List<Produto> produtos;
        try {
            produtos = p.getResultList();
            
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        if (produtos.isEmpty())
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();

        List<ProdutoDTO> produtoDTOs = new ArrayList<>();

        for (Produto produto : produtos) {
            produtoDTOs.add(new ProdutoDTO(produto));
        }

        return Response
                .ok(produtoDTOs)
                .status(Response.Status.OK)
                .build();
    }

    @GET
    @Path("/consultar/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response consultarProduto(@PathParam("id") Long id) {

        Produto produto;
        try {
            produto = em.find(Produto.class, id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        if (produto == null)
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
            
        ProdutoDTO produtoDTO = new ProdutoDTO(produto);

        return Response
                .ok(produtoDTO)
                .status(Response.Status.OK)
                .build();
    }

    @PUT
    @Path("/editar/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarProduto(ProdutoDTO produtoDTO, @PathParam("id") Long id) {
        Produto p;
        
        try {
            p = em.find(Produto.class, id);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }
        
        p.setNome(produtoDTO.nome);
        p.setFazenda(em.find(Fazenda.class, produtoDTO.fazenda));
        p.setQuantidade(produtoDTO.quantidade);
        p.setTipo(produtoDTO.tipo);

        em.merge(p);

        return Response
                .ok(new ProdutoDTO(p))
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @GET
    @Path("/remover/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response removerProduto(@PathParam("id") Long id) {
        Produto produto;

        try {
            produto = em.find(Produto.class, id);
        } catch (Exception e) {
            return Response
                .status(Response.Status.NOT_FOUND)
                .build();
        }

        try {
            em.remove(produto);
        } catch (PersistenceException ex) {
            return Response
                .status(Response.Status.BAD_REQUEST)
                .build();
        }

        return Response
                .status(Response.Status.ACCEPTED)
                .build();
    }
    
    @GET
    @Path("/getAllTiposProdutos")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllTiposProdutos() {
        Map<Produto.TipoProdutoEnum, String> mapEnumStringPergunta;

        mapEnumStringPergunta = Arrays.asList(Produto.TipoProdutoEnum.values())
                .stream()
                .collect(Collectors.toMap(Function.identity(), v -> v.getTipo()));

        return Response
                .ok(mapEnumStringPergunta)
                .status(Response.Status.ACCEPTED)
                .build();
    }
}
