/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entity.Proprietario;
import javax.ejb.Local;

/**
 *
 * @author thouta
 */
@Local
public interface PropTeste {
    Proprietario TestPropDB(String cpf);
}
