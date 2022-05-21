package com.ufpel.cs.gadostalker.rest.resources;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Path;

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
    
    
    
}
