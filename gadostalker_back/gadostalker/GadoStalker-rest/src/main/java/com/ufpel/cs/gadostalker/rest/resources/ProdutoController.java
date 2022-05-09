package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.ProdutoDTO;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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

        return Response
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @GET
    @Path("/consultar/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response consultarProduto(ProdutoDTO produtoDTO, @PathParam("id") Long id) {

        return Response
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @POST
    @Path("/editar")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarProduto(ProdutoDTO produtoDTO) {

        return Response
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }

    @GET
    @Path("/remover/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response removerProduto(ProdutoDTO produtoDTO, @PathParam("id") Long id) {

        return Response
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST")
                .build();
    }
}
