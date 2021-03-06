package com.ufpel.cs.gadostalker.rest.dtos;

import com.ufpel.cs.gadostalker.rest.entities.Imagem;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author thouta
 */
@XmlRootElement
public class ImagemDTO {
    
    @XmlElement
    public String content;
    
    public ImagemDTO() {
    }
    
    public ImagemDTO(Imagem imagem) {
        this.content = new String(imagem.toBase64());
    }
}
