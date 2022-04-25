package com.ufpel.cs.gadostalker.rest.resources;

import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import com.ufpel.cs.gadostalker.transactions.PropTeste;
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
  
    PropTeste propTeste = new PropTeste();
    
    @GET
    @Transactional
    public Response ping(){
   
        //teste
        Proprietario p = propTeste.TestPropDB("12312312332");
        
        return Response
                .ok(p)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .build();
    }
}
