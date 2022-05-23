package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 *
 * @author thomazio
 */
@Stateless
public class PropTesteImpl implements PropTeste {
    
    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em; 
   
    @Override
    @Transactional
    public Proprietario TestPropDB(String cpf) {

        Proprietario p = new Proprietario();
        p.setCpf(cpf);
        em.persist(p);
      
        return p;
    }
}
