package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.ImagemDTO;
import com.ufpel.cs.gadostalker.rest.entities.Imagem;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
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