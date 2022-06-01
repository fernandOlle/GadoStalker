package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 *
 * @author thomazio
 */
@Path("/fazenda")
public class FazendaController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;

    public FazendaController() {
    }

    @POST
    @Path("/cadastro/{cpf}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastraFazenda(@PathParam("cpf") String cpf, FazendaDTO fazendaDTO) {

        Proprietario p = em.find(Proprietario.class, cpf);

        Fazenda fazenda = new Fazenda(fazendaDTO);
        fazenda.setProprietario(p);

        try {
            em.persist(fazenda);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.CONFLICT)
                    .build();
        }
        
        return Response
                .status(Response.Status.CREATED)
                .build();

    }

    @POST
    @Path("/modificar/{sncr}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarFazenda(@PathParam("sncr") String sncr, FazendaDTO fazendaDTO) {

        Fazenda fazenda;

        try {
            fazenda = em.find(Fazenda.class, sncr);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        if (fazenda == null)
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();

        fazenda.setNome(fazendaDTO.nome);
        fazenda.setEmail(fazendaDTO.email);
        fazenda.setTelefone(fazendaDTO.telefone);

        em.merge(fazenda);

        return Response
                .ok(new FazendaDTO(fazenda))
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @DELETE
    @Path("/remover/{sncr}")
    @Transactional
    public Response removerFazenda(@PathParam("sncr") String sncr) {

        Fazenda f;
        
        try {
            f = em.find(Fazenda.class, sncr);
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        if (f == null) {
            return Response
                .status(Response.Status.NOT_FOUND)
                .build();
        }

        try {
            em.remove(f);
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
