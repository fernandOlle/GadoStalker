package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
    public Response cadastraFazenda(@PathParam("cpf") String cpf, List<FazendaDTO> fazendas) {
        
        
        return Response
                .status(Response.Status.CREATED)
                .build();
    }
}
