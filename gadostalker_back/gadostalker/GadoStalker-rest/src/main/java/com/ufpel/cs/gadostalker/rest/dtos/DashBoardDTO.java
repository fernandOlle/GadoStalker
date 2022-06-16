package com.ufpel.cs.gadostalker.rest.dtos;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */
@XmlRootElement
public class DashBoardDTO {
    
    @XmlElement
    public Long totalAnunciosAtivos;
    
    @XmlElement
    public Long totalVendasUltimoMes;
    
    @XmlElement
    public Long totalFuncionarios;
    
    @XmlElement
    public Long totalProdutosCatalogo;
    
    public DashBoardDTO(){
    }
    
    public DashBoardDTO(Long anuncios, Long vendas, Long funcionarios, Long produtos) {
        totalAnunciosAtivos = anuncios;
        totalVendasUltimoMes = vendas;
        totalFuncionarios = funcionarios;
        totalProdutosCatalogo = produtos;
    }
}
