package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    public Response cadastraFazenda(@PathParam("cpf") String cpf, List<FazendaDTO> fazendaDTOs) {

        Proprietario p = em.find(Proprietario.class, cpf);

        List<Fazenda> fazendas = new ArrayList<>();

        fazendaDTOs.forEach(f -> {
            Fazenda fazenda = new Fazenda(f);
            fazenda.setProprietario(p);
            fazendas.add(fazenda);
        });

        try {
            fazendas.forEach(f -> {
                em.persist(f);
            });
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
        
        Fazenda f = em.find(Fazenda.class, sncr);
        
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
