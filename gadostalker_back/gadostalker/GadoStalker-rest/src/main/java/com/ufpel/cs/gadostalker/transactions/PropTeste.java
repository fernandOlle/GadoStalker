/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.transaction.Transactional;

/**
 *
 * @author thomazio
 */
public class PropTeste {
    @PersistenceUnit
    private EntityManagerFactory emf;

    @PersistenceContext
    private EntityManager em; 
   
    @Transactional
    public Proprietario TestPropDB(String cpf) {
        emf = Persistence.createEntityManagerFactory("gadostalker");
        em = emf.createEntityManager();

        Proprietario p = new Proprietario();
        p.setCpf(cpf);
        em.persist(p);
        
        em.close();
        
        return p;
    }
}
