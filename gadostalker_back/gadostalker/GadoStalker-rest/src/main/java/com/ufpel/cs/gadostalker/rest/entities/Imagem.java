package com.ufpel.cs.gadostalker.rest.entities;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import java.util.Base64;
import java.util.Objects;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.PostLoad;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thouta
 */
@Entity
@Table(name = "imagem")
@SequenceGenerator(name = "seqImagem", sequenceName = "SEQIMAGEM", allocationSize = 1)
public class Imagem implements Serializable {

    public enum FileFormat {
        PNG("png"),
        JPEG("jpeg"),
        JPG("jpg");

        private final String fileExtension;

        private FileFormat(String fileExtension) {
            this.fileExtension = fileExtension;
        }

        public String getFileExtension() {
            return fileExtension;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "seqImagem")
    private Long id;

    @Column(length = 7)
    @Enumerated(EnumType.STRING)
    private FileFormat fileExtension;

    @Column
    private String fileName;

    @Column
    @Lob
    private byte[] content;

    @Transient
    private byte[] encodedContent;

    public Imagem() {
    }

    @PostLoad
    private void encodeAfterFetch() {
        byte[] header = ("data:image/" + fileExtension.getFileExtension() + ";base64,").getBytes();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            outputStream.write(header);
            outputStream.write(Base64.getEncoder().encode(content));
        } catch (IOException ex) {
            Logger.getLogger(Imagem.class.getName()).log(Level.SEVERE, null, ex);
        }
        encodedContent = outputStream.toByteArray();
    }

    public Imagem(String fileName, byte[] content) {
        String[] file = fileName.split("\\.");
        this.fileName = file[0];
        switch (file[1]) {
            case "png":
                fileExtension = FileFormat.PNG;
                break;
            case "jpg":
                fileExtension = FileFormat.JPG;
                break;
            case "jpeg":
                fileExtension = FileFormat.JPEG;
                break;
            default:
                break;
        }
        this.content = Base64.getDecoder().decode(content);
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
