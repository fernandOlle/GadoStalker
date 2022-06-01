package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
