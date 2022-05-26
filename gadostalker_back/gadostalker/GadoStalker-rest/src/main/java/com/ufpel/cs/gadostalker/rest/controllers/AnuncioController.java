package com.ufpel.cs.gadostalker.rest.controllers;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Path;

/**
 *
 * @author thomazio
 */
@Path("/anuncio")
public class AnuncioController {
    
    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
    
}
