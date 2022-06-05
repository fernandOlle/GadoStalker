package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.entities.Imagem;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 *
 * @author thouta
 */
@Path("/upload")
public class UploadController {
    
    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;
    
    @POST
    @Path("/create")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response uploadImagem(
            @FormDataParam("imagem") byte[] file, 
            @FormDataParam("fileName") String fileName) {

        Imagem img = new Imagem(fileName, file);
        
        em.persist(img);
        
        return Response
                .status(Response.Status.CREATED)
                .build();
    }
}