package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.ImagemDTO;
import com.ufpel.cs.gadostalker.rest.entities.Imagem;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
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
        em.flush();
        
        return Response
                .ok(img.getId())
                .status(Response.Status.CREATED)
                .build();
    }
    
    @GET
    @Path("/get/{id}")
    @Produces({MediaType.TEXT_PLAIN})
    public Response getImagem(@PathParam("id") Long id) {
        
        ImagemDTO imagem;
        
        try {
            imagem = new ImagemDTO(em.find(Imagem.class, id));
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        if (imagem.content == null) {
            return Response
                    .ok(imagem)
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }
        
        return Response
                .ok(imagem.content)
                .status(Response.Status.ACCEPTED)
                .build();
    }
}