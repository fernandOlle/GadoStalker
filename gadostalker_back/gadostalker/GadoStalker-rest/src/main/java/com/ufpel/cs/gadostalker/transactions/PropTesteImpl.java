/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
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
