package com.ufpel.cs.gadostalker.rest.controllers;

import com.ufpel.cs.gadostalker.rest.dtos.FazendaDTO;
import com.ufpel.cs.gadostalker.rest.dtos.UsuarioDTO;
import com.ufpel.cs.gadostalker.rest.entities.Fazenda;
import com.ufpel.cs.gadostalker.rest.entities.FazendasValidas;
import com.ufpel.cs.gadostalker.rest.entities.Funcionario;
import com.ufpel.cs.gadostalker.rest.entities.Produto;
import com.ufpel.cs.gadostalker.rest.entities.Proprietario;
import com.ufpel.cs.gadostalker.rest.entities.Usuario;
import com.ufpel.cs.gadostalker.rest.entities.UsuarioComum;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author kevin
 */
@Path("/usuario")
public class UsuarioController {

    @PersistenceContext(unitName = "gadostalker")
    private EntityManager em;

    public UsuarioController() {
    }

    @POST
    @Path("/login")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response login(UsuarioDTO usuarioDTO) {

        TypedQuery<Usuario> u = em.createNamedQuery("Usuario.login", Usuario.class);
        u.setParameter("email", usuarioDTO.email);
        u.setParameter("senha", usuarioDTO.senha);

        Usuario usuarioLogado;

        try {
            usuarioLogado = u.getSingleResult();
        } catch (PersistenceException ex) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        UsuarioDTO usuarioDto = new UsuarioDTO();
        usuarioDto.cpf = usuarioLogado.getCpf();
        usuarioDto.tipoUsuario = usuarioLogado.getTipoUsuario();
        usuarioDto.nome = usuarioLogado.getNome();
        usuarioDto.email = usuarioLogado.getEmail();
        usuarioDto.telefone = usuarioLogado.getTelefone(); 
        return Response
                .ok(usuarioDto)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @GET
    @Path("/getFazendasProprietario/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response getFazendasProprietario(@PathParam("cpf") String cpf) {
        TypedQuery<Fazenda> fazendasQuery = em.createQuery("select f from Proprietario p "
                + "inner join p.fazendas f where p.cpf = :cpf", Fazenda.class);
        fazendasQuery.setParameter("cpf", cpf);

        List<Fazenda> fazendas;

        try {
            fazendas = fazendasQuery.getResultList();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        if (fazendas.isEmpty()) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        List<FazendaDTO> fazendaDTOs = new ArrayList<>();

        fazendas.forEach(f -> {
            FazendaDTO fdtos = new FazendaDTO();
            fdtos.SNCR = f.getSNCR();
            fdtos.nome = f.getNome();
            fazendaDTOs.add(fdtos);
        });

        return Response
                .ok(fazendaDTOs)
                .status(Response.Status.OK)
                .build();
    }
    
    @GET
    @Path("cadastro/valida/{sncr}")
    public Response fazendaIsValida(@PathParam("sncr") String SNCR) {
        TypedQuery<FazendasValidas> fazendaQuery = em.createQuery("SELECT f FROM FazendasValidas f "
                + "where f.SNCR = :sncr", FazendasValidas.class);
        fazendaQuery.setParameter("sncr", SNCR);
        
        return Response
                .ok(fazendaQuery.getSingleResult() != null)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @POST
    @Path("/cadastro/{tipo}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response cadastro(UsuarioDTO usuarioDTO, @PathParam("tipo") String tipo) {

        switch (tipo) {
            //Proprietario
            case "prop":
                try {
                usuarioDTO.tipoUsuario = (Usuario.TipoUsuario.PROPRIETARIO);
                Proprietario proprietario = new Proprietario(usuarioDTO);
                proprietario.setFazendas(Arrays.asList(new Fazenda(usuarioDTO.fazendas.get(0))));
                em.persist(proprietario);
                Fazenda f = proprietario.getFazendas().get(0);
                f.setProprietario(proprietario);
                em.merge(f);
            } catch (PersistenceException ex) {
                return Response
                        .ok()
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
            break;

            //Funcionario
            case "func":
                try {
                Fazenda fazenda;
                TypedQuery<Fazenda> query = em.createQuery("select f from Fazenda f "
                        + "where f.SNCR = :sncr", Fazenda.class)
                        .setParameter("sncr", usuarioDTO.fazendas.get(0).SNCR);
                fazenda = query.getSingleResult();
                usuarioDTO.tipoUsuario = (Usuario.TipoUsuario.FUNCIONARIO);
                Funcionario funcionario = new Funcionario(usuarioDTO, fazenda);
                em.persist(funcionario);
                em.flush();
                fazenda.addFuncionario(funcionario);
                em.merge(fazenda);
            } catch (PersistenceException ex) {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
            break;

            //UsuarioComum
            case "uc":
                try {
                usuarioDTO.tipoUsuario = (Usuario.TipoUsuario.USUARIO_COMUM);
                UsuarioComum uc = new UsuarioComum(usuarioDTO);
                em.persist(uc);
            } catch (PersistenceException ex) {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
            }
            break;

            default:
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .build();
        }

        return Response
                .ok(true)
                .status(Response.Status.CREATED)
                .build();
    }
    
    @PUT
    @Path("/cadastro/editar/{cpf}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response editarUsuario(UsuarioDTO usuario, @PathParam("cpf") String cpf) {
        
        Usuario u = em.find(Usuario.class, cpf);
        
        u.setEmail(usuario.email);
        u.setNome(usuario.nome);
        u.setTelefone(usuario.telefone);
        
        try {
            em.merge(u);
        } catch (PersistenceException ex) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        return Response
                .ok(usuario)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @Path("/getAllPerguntas")
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllPerguntas() {

        Map<Usuario.PerguntaSegurancaEnum, String> mapEnumStringPergunta;

        mapEnumStringPergunta = Arrays.asList(Usuario.PerguntaSegurancaEnum.values())
                .stream()
                .collect(Collectors.toMap(Function.identity(), v -> v.getPergunta()));

        return Response
                .ok(mapEnumStringPergunta)
                .status(Response.Status.ACCEPTED)
                .build();
    }

    @Path("/recuperarSenha")
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Transactional
    public Response recuperarSenha(UsuarioDTO usuarioRecuperaSenha) {

        TypedQuery<Usuario> u = em.createQuery("select u from Usuario u "
                + "where u.email = :email", Usuario.class)
                .setParameter("email", usuarioRecuperaSenha.email);
        Usuario usuario;
        try {
            usuario = u.getSingleResult();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.NOT_FOUND)
                    .build();
        }

        if (usuarioRecuperaSenha.pergunta == usuario.getPergunta()) {
            if (usuarioRecuperaSenha.resposta.toLowerCase().equals(usuario.getResposta().toLowerCase())) {
                usuario.setSenha(usuarioRecuperaSenha.senha);

                em.merge(usuario);

                return Response
                        .status(Response.Status.ACCEPTED)
                        .build();
            }
        }

        return Response
                .status(Response.Status.UNAUTHORIZED)
                .build();
    }
    
    @GET
    @Path("/listFuncionarios/{cpf}")
    @Produces({MediaType.APPLICATION_JSON})
    public Response listaFuncionarios(@PathParam("cpf") String cpf) {
        
        TypedQuery<Funcionario> funcionarioQuery = em.createQuery("SELECT fu FROM Proprietario p "
                + "INNER JOIN p.fazendas f INNER JOIN f.funcionarios fu WHERE p.cpf = :cpf", Funcionario.class);
        
        funcionarioQuery.setParameter("cpf", cpf);
        
        
        List<Funcionario> funcionarios;
        
        try {
            funcionarios = funcionarioQuery.getResultList();
        } catch(Exception e) {
            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .build();
        }
        
        if (funcionarios.isEmpty()) {
            return Response
                    .status(Response.Status.NO_CONTENT)
                    .build();
        }
        
        List<UsuarioDTO> funcionariosDTO = new ArrayList<>();
        
        funcionarios.forEach(f -> {
            UsuarioDTO u = new UsuarioDTO();
            u.cpf = f.getCpf();
            u.nome = f.getNome();
            u.email = f.getEmail();
            u.telefone = f.getTelefone();
            funcionariosDTO.add(u);
        });
        
        return Response
                .ok(funcionariosDTO)
                .status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Path("/funcionario/trocaFazenda")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Transactional
    public Response trocaFazendaFuncionario(UsuarioDTO usuario) {
        
        Funcionario funcionario = em.find(Funcionario.class, usuario.cpf);
        Fazenda fazenda = em.find(Fazenda.class, usuario.fazendas.get(0).SNCR);
        
        funcionario.setFazenda(fazenda);
        
        try {
            em.merge(funcionario);
        } catch (Exception e) {
            System.err.println(e);
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .build();
        }
        
        UsuarioDTO u = new UsuarioDTO();
        
        u.cpf = funcionario.getCpf();
        u.email = funcionario.getEmail();
        u.addFazendaDTO(new FazendaDTO(funcionario.getFazenda()));
        u.nome = funcionario.getNome();
        u.telefone = funcionario.getTelefone();
        u.tipoUsuario = funcionario.getTipoUsuario();
        
        return Response
                .ok(u)
                .status(Response.Status.ACCEPTED)
                .build();
    }
}
