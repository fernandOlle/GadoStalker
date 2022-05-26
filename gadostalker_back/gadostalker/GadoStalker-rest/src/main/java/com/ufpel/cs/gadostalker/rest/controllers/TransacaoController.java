package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author gsutavo
 */
@Path("/transacao")
public class TransacaoController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;

    @GET
    @Path("/listaTransacoes/{idAnuncio}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response listTransacaoByAnuncio(@PathParam("idAnuncio") Long idAnuncio) {

        TypedQuery<Transacao> transacaoQuery = em.createQuery("select t from Transacao t "
                + "inner join Anuncio a "
                + "where t.anuncio = a "
                + "and a.id = :idAnuncio", Transacao.class);

        transacaoQuery.setParameter("idAnuncio", idAnuncio);

        List<Transacao> transacoes;

        try {
            transacoes = transacaoQuery.getResultList();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .build();
        }

        if (transacoes.isEmpty()) {
            return Response
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }
        
        List<TransacaoDTO> transacoesDTO = new ArrayList<>();
        
        transacoes.forEach(transacao -> {
            TransacaoDTO transacaoDTO = new TransacaoDTO(transacao);
            transacoesDTO.add(transacaoDTO);
        });
        
        return Response
                .ok(transacoesDTO)
                .status(Response.Status.OK)
                .build();
    }
}
