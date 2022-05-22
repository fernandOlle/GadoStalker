package com.ufpel.cs.gadostalker.transactions;

import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import javax.ejb.Local;

/**
 *
 * @author thouta
 */
@Local
public interface PropTeste {
    Proprietario TestPropDB(String cpf);
}
