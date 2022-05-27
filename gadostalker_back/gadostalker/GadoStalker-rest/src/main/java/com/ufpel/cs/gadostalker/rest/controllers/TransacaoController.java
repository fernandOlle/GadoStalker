package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
