package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

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
