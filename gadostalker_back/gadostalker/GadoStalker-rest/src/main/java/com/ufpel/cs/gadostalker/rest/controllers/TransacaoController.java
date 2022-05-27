package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.util.ArrayList;
import java.util.List;
import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.GET;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import javax.ws.rs.PathParam;

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
    
    @POST
    @Path("/registrar/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response registraTransacao(TransacaoDTO transacaoDTO, @PathParam("id") Long id) {       
        Anuncio a = em.find(Anuncio.class, id);
        Transacao t = new Transacao(transacaoDTO);
        t.setAnuncio(a);
	t.setDataTransacao(new Date());
	
        try {
            em.persist(t);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        transacaoDTO.dataTransacao = t.getDataTransacao();
        transacaoDTO.id = t.getId();
        
        return Response
                .ok(transacaoDTO)
                .status(Response.Status.CREATED)
                .build();
    }
    
}
