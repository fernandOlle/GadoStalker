package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.TransacaoDTO;
import java.util.ArrayList;
import java.util.List;
import com.ufpel.cs.gadostalker.rest.entities.Anuncio;
import com.ufpel.cs.gadostalker.rest.entities.Transacao;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Collections;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.GET;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Date;
import javax.ws.rs.PathParam;

/**
 *
 * @author gsutavo
 */
@Path("/transacao")
public class TransacaoController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;

    @GET
    @Path("/listaTransacoes/{idAnuncio}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response listTransacaoByAnuncio(@PathParam("idAnuncio") Long idAnuncio) {

        TypedQuery<Transacao> transacaoQuery = em.createQuery("select t from Transacao t "
                + "inner join Anuncio a "
                + "where t.anuncio = a "
                + "and a.id = :idAnuncio", Transacao.class);

        transacaoQuery.setParameter("idAnuncio", idAnuncio);

        List<Transacao> transacoes;

        try {
            transacoes = transacaoQuery.getResultList();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .build();
        }

        if (transacoes.isEmpty()) {
            return Response
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }

        List<TransacaoDTO> transacoesDTO = new ArrayList<>();

        transacoes.forEach(transacao -> {
            TransacaoDTO transacaoDTO = new TransacaoDTO(transacao);
            transacoesDTO.add(transacaoDTO);
        });

        return Response
                .ok(transacoesDTO)
                .status(Response.Status.OK)
                .build();
    }

    @POST
    @Path("/registrar/{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response registraTransacao(TransacaoDTO transacaoDTO, @PathParam("id") Long id) {
        Anuncio a = em.find(Anuncio.class, id);
        
        if (a.getProduto().getQuantidade().doubleValue() < (double) transacaoDTO.quantidade) {
            return Response
                    .ok(null)
                    .status(Response.Status.OK)
                    .build();
        }
        
        a.getProduto().setQuantidade(new BigDecimal(a.getProduto().getQuantidade().doubleValue() - (double) transacaoDTO.quantidade));
        
        Transacao t = new Transacao(transacaoDTO);
        t.setAnuncio(a);
        t.setDataTransacao(new Date());

        try {
            em.persist(t);
            em.flush();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        transacaoDTO.dataTransacao = t.getDataTransacao();
        transacaoDTO.id = t.getId();

        return Response
                .ok(transacaoDTO)
                .status(Response.Status.CREATED)
                .build();
    }

    @GET
    @Path("/numVendasUltimosMeses/{numMeses}/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getNumVendasUltimosMeses(@PathParam("numMeses") int numMeses, @PathParam("cpf") String cpf) {
        List<Long> arrayVendas = new ArrayList<>();

        TypedQuery<Long> query = em.createQuery("select count(t) from Transacao t "
                + "inner join t.anuncio a "
                + "inner join a.produto p "
                + "inner join p.fazenda f "
                + "inner join f.proprietario u "
                + "where u.cpf = :cpf and "
                + "t.dataTransacao >= :dataInicial and "
                + "t.dataTransacao <= :dataFinal",
                Long.class);
        query.setParameter("cpf", cpf);

        Date hoje = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(hoje);
        for (int i = 0; i < numMeses; i++) {
            int lastDay = c.getActualMaximum(Calendar.DATE);
            int year = c.get(Calendar.YEAR);
            int month = c.get(Calendar.MONTH);
            c.set(year, month, lastDay);
            Date dataFinal = c.getTime();
            query.setParameter("dataFinal", dataFinal);
            c.set(year, month, 1);
            Date dataInicial = c.getTime();
            query.setParameter("dataInicial", dataInicial);
            Long numVendasMesAtual = 0L;
            try {
                numVendasMesAtual = query.getSingleResult();
            } catch (Exception e) {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
            arrayVendas.add(numVendasMesAtual);
            c.add(Calendar.MONTH, -1);
        }
        
        Collections.reverse(arrayVendas);

        return Response
                .ok(arrayVendas)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @GET
    @Path("/lucroVendasUltimosMeses/{numMeses}/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getLucroVendasUltimosMeses(@PathParam("numMeses") int numMeses, @PathParam("cpf") String cpf) {
        List<BigDecimal> arrayVendas = new ArrayList<>();

        TypedQuery<BigDecimal> query = em.createQuery("select sum(t.preco) from Transacao t "
                + "inner join t.anuncio a "
                + "inner join a.produto p "
                + "inner join p.fazenda f "
                + "inner join f.proprietario u "
                + "where u.cpf = :cpf and "
                + "t.dataTransacao >= :dataInicial and "
                + "t.dataTransacao <= :dataFinal",
                BigDecimal.class);
        query.setParameter("cpf", cpf);

        Date hoje = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(hoje);
        for (int i = 0; i < numMeses; i++) {
            int lastDay = c.getActualMaximum(Calendar.DATE);
            int year = c.get(Calendar.YEAR);
            int month = c.get(Calendar.MONTH);
            c.set(year, month, lastDay);
            Date dataFinal = c.getTime();
            query.setParameter("dataFinal", dataFinal);
            c.set(year, month, 1);
            Date dataInicial = c.getTime();
            query.setParameter("dataInicial", dataInicial);
            BigDecimal lucroMesAtual = BigDecimal.ZERO;
            try {
                lucroMesAtual = query.getSingleResult();
            } catch (Exception e) {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
            arrayVendas.add(lucroMesAtual != null ? lucroMesAtual : BigDecimal.ZERO);
            c.add(Calendar.MONTH, -1);
        }

        Collections.reverse(arrayVendas);
        
        return Response
                .ok(arrayVendas)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @GET
    @Path("/lucroGeralByCpf/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getLucroGeralByCpf(@PathParam("cpf") String cpf) {
        TypedQuery<BigDecimal> query = em.createQuery("select sum(t.preco) from Transacao t "
                + "inner join t.anuncio a "
                + "inner join a.produto p "
                + "inner join p.fazenda f "
                + "inner join f.proprietario u "
                + "where u.cpf = :cpf",
                BigDecimal.class);
        query.setParameter("cpf", cpf);

        BigDecimal lucroGeral = BigDecimal.ZERO;

        try {
            lucroGeral = query.getSingleResult();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }

        return Response
                .ok(lucroGeral)
                .status(Response.Status.ACCEPTED)
                .build();
    }

}
