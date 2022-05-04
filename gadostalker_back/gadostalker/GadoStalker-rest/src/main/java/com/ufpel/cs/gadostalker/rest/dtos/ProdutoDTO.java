/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entity.Fazenda;
import com.ufpel.cs.gadostalker.rest.entity.Produto.TipoProdutoEnum;
import java.math.BigDecimal;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author kevin
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement
public class ProdutoDTO {
    
    @XmlElement
    public String nome;
    
    @XmlElement
    public TipoProdutoEnum tipo;
    
    @XmlElement
    public Fazenda fazenda;
    
    @XmlElement
    public BigDecimal quantidade;
   
}
