package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import jakarta.ejb.Local;

/**
 *
 * @author thouta
 */
@Local
public interface PropTeste {
    Proprietario TestPropDB(String cpf);
}
