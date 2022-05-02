/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ufpel.cs.gadostalker.rest.entity;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import java.util.Base64;
import java.util.Objects;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.PostLoad;
import javax.persistence.Transient;

/**
 *
 * @author thouta
 */
@Entity
@Table(name = "imagem")
public class Imagem implements Serializable {
    
    public enum FileFormat {
        PNG(".png"),
        JPEG(".jpeg");
        
        private final String fileExtension;
        
        private FileFormat(String fileExtension) {
            this.fileExtension = fileExtension;
        }
        
        public String getFileExtension() {
            return fileExtension;
        }
    }
    
    @Id
    @Column(name = "anuncio_id")
    private Long id;
    
    @Column(length = 7)
    @Enumerated(EnumType.STRING)
    private FileFormat fileExtension;
    
    @Column
    private String fileName;
    
    @OneToOne
    @MapsId
    @JoinColumn(name = "anuncio_id")
    private Anuncio Anuncio;
    
    @Column
    @Lob
    private byte[] content;
    
    @Transient
    private byte[] encodedContent;
    
    @PostLoad
    private void encodeAfterFetch() {
        encodedContent = Base64.getEncoder().encode(content);
    }
    
    public byte[] toBase64() {
        return encodedContent;
    }
    
    public byte[] decodeBase64() {
        return Base64.getDecoder().decode(content);
    }

    public Long getId() {
        return id;
    }

    public FileFormat getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(FileFormat fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public Anuncio getAnuncio() {
        return Anuncio;
    }

    public void setAnuncio(Anuncio Anuncio) {
        this.Anuncio = Anuncio;
    }
    
    @Override
    public int hashCode() {
        int hash = 7;
        hash = 47 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Imagem other = (Imagem) obj;
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {
        return new String(content, StandardCharsets.UTF_8);
    }
}
