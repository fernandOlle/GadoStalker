package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.entity.Usuario;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author 
 */
@Path("rest")
public class JakartaEE8Resource {
    
    @PersistenceUnit
    private EntityManagerFactory emf;

    @PersistenceContext
    private EntityManager em; 
    
    
    @GET
    @Transactional
    public Response ping(){
        emf = Persistence.createEntityManagerFactory("gadostalker");
        em = emf.createEntityManager();  
        Usuario u = em.find(Usuario.class, 1L);
        
        em.close();
        return Response
                .ok(u)
                .build();
    }
}
