package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import com.ufpel.cs.gadostalker.transactions.PropTeste;
import javax.ejb.EJB;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author gsutavo
 */
@Path("rest")
public class JakartaEE8Resource {

    @EJB
    PropTeste propTeste;

    @GET
    @Transactional
    public Response ping() {

        //teste
        Proprietario p = propTeste.TestPropDB("12312312332");

        return Response
                .ok(p)
                .build();
    }
}
