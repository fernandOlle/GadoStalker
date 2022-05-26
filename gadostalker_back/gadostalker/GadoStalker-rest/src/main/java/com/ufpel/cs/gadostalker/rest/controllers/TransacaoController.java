package com.ufpel.cs.gadostalker.rest.controllers;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Path;

/**
 *
 * @author gsutavo
 */
@Path("/transacao")
public class TransacaoController {
    
    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
}
