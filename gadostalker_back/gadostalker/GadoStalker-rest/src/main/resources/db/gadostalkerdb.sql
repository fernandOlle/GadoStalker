set foreign_key_checks = 0;

INSERT INTO `fazendas_validas` (`ID`, `SNCR`) VALUES
(1,    '1111111111111'),
(2,    '4268574892923'),
(3,    '0051747018456'),
(4,    '3223516968490'),
(5,    '1753547882098'),
(6,    '5151543642512'),
(7,    '8392025333523'),
(8,    '2975347864503'),
(9,    '2724166469978'),
(10,   '0754678903612'),
(11,   '1149616392534'),
(12,   '0630847958256'),
(13,   '0088247689590'),
(14,   '4535500142378'),
(15,   '3772293136990'),
(16,   '1231231231234'),
(17,   '1723948172893'),
(28,   '1723948172895');

-- proprietários
INSERT INTO `usuario` (`CPF`, `TIPO_USUARIO`, `EMAIL`, `NOME`, `PERGUNTA`, `RESPOSTA`, `SENHA`, `TELEFONE`, `FAZENDA_SNCR`) VALUES
('12312312345',	'PROPRIETARIO',	'alexandre@gmail.com',	'Alexandre', 0, 'Lisane', 'senha123',	'53123456789',	NULL),
('79285518028',	'PROPRIETARIO',	'adolfo@gmail.com',	'Adolfo', 0, 'Lisane', 'senha123',	'53987654321',	NULL);

INSERT INTO `fazenda` (`SNCR`, `EMAIL`, `NOME`, `TELEFONE`, `PROPRIETARIO_CPF`, `ISZAPZAP`) VALUES
-- fazendas do Alexandre
('1723948172893',	'fazendadovale@email.com',	'Fazenda do Vale',	'5384670840',	'12312312345', 1),
('4268574892923',	'fazendadopico@email.com',	'Fazenda do Pico',	'5399542123',	'12312312345', 1),
('0051747018456',	'fazendadoplanalto@email.com','Fazenda do Planalto',	'5199602939',	'12312312345', 1),
-- fazendas do Adolfo
('3223516968490',	'fazendadonorte@email.com',	'Fazenda do Norte',	'5391244357',	'79285518028', 1),
('1753547882098',	'fazendacentral@email.com',	'Fazenda Central',	'5391410792',	'79285518028', 1),
('5151543642512',	'fazendadosul@email.com',	'Fazenda do Sul',		'5391509636',	'79285518028', 1);

-- funcionários. Estão distribuídos entre as fazendas do proprietário Alexandre.
INSERT INTO `usuario` (`CPF`, `TIPO_USUARIO`, `EMAIL`, `NOME`, `PERGUNTA`, `RESPOSTA`, `SENHA`, `TELEFONE`, `FAZENDA_SNCR`) VALUES
('01334896046', 'FUNCIONARIO', 'thouta@gmail.com',	'Thomazio Giacobbe', 0, 'Lisane', 	'senha123', '53123457497',	'1723948172893'),
('18337236000', 'FUNCIONARIO', 'alejandro@gmail.com',	'Alejandro Pereira', 0, 'Lisane', 	'senha123', '53123457494',	'1723948172893'),
('26496138079', 'FUNCIONARIO', 'kevin@gmail.com',	'Kevin Pereira', 0, 'Lisane', 	'senha123', '53123456789',	'4268574892923'),
('57879409033', 'FUNCIONARIO', 'jesus@gmail.com',	'Gustavo Fernandes', 0, 'Lisane', 	'senha123', '53123457496',	'4268574892923'),
('78230236011', 'FUNCIONARIO', 'fefa@gmail.com',	'Fernando Olle', 0, 'Lisane', 	'senha123', '53123457495',	'0051747018456'),
('93086669071', 'FUNCIONARIO', 'joao@gmail.com', 	'Joao Rezende', 0, 'Lisane', 		'senha123', '53123457493', 	'0051747018456');

-- compradores
INSERT INTO `usuario` (`CPF`, `TIPO_USUARIO`, `EMAIL`, `NOME`, `PERGUNTA`, `RESPOSTA`, `SENHA`, `TELEFONE`, `FAZENDA_SNCR`) VALUES
('12312312365', 'USUARIO_COMUM', 'joaocomprador@gmail.com.br', 	'João Comprador', 0,	'Lisane', 'senha123', '53123456789',	NULL),
('35768683054', 'USUARIO_COMUM', 'mariacompradora@gmail.com.br',	'Maria Compradora', 0, 	'Lisane', 'senha123',	'53123456790',	NULL);

INSERT INTO `produto` (`ID`, `NOME`, `QUANTIDADE`, `TIPO`, `FAZENDA_SNCR`) VALUES
-- Fazenda do Vale
(1,	'Feijão Tropeiro',	50,	3,	'1723948172893'),
(2,	'Feijão Preto',		45,	3,	'1723948172893'),
(3,	'Feijão Vermelho',	32,	3,	'1723948172893'),
(4,	'Milho Verde',		32,	5,	'1723948172893'),
(33,	'Arroz branco',		56,	9,	'1723948172893'),
(35,	'Geleia de morango',	27,	12,	'1723948172893'),
(41,	'Laranja-pera',		22,	13,	'1723948172893'),
(42,	'Laranja-lima',		15,	13,	'1723948172893'),
-- Fazenda do Pico
(5,	'Milho Amarelo',		32,	5,	'4268574892923'),
(6,	'Mel de Abelha',		32,	0,	'4268574892923'),
(7,	'Mel de Zangão',		65,	0,	'4268574892923'),
(8,	'Leite de Vaca',		44,	4,	'4268574892923'),
(36,	'Arroz integral',		33,	9,	'4268574892923'),
(37,	'Queijo colonial',	19,	11,	'4268574892923'),
(38,	'Geleia de amora',	27,	12,	'1723948172893'),
(43,	'Uva merlot',		25,	14,	'1723948172893'),
(44,	'Uva malbec',		17,	14,	'1723948172893'),
-- Fazenda do Planalto
(9,	'Leite de Cabra',		48,	4,	'0051747018456'),
(10,	'Feijão Branco',		49,	3,	'0051747018456'),
(11,	'Feijão Carioca',		30,	3,	'0051747018456'),
(12,	'Ovo de galinha',		20,	1,	'0051747018456'),
(13,	'Ovo de codorna',		30,	1,	'0051747018456'),
(40,	'Queijo canastra',	12,	11,	'4268574892923'),
(45,	'Banana-ouro',		9,	10,	'4268574892923'),
(46,	'Banana-prata',		5,	10,	'4268574892923'),
-- Fazenda do Norte
(14, 	'Alface americana',	15,	2,	'3223516968490'),
(15, 	'Alface crespa',		12,	2,	'3223516968490'),
(16, 	'Alface frisée',		3,	2,	'3223516968490'),
(17, 	'Alface lisa',		6,	2,	'3223516968490'),
-- Fazenda Central
(18, 	'Alface mimosa',		10,	2,	'1753547882098'),
(19, 	'Alface romana',		23,	2,	'1753547882098'),
(20, 	'Alface roxa',		20,	2,	'1753547882098'),
(21, 	'Soja amarela',		36,	6,	'1753547882098'),
-- Fazenda do Sul
(22, 	'Soja preta',		16,	6,	'5151543642512'),
(23, 	'Tomate Longa Vida',	20,	7,	'5151543642512'),
(24, 	'Tomate Cereja',		15,	7,	'5151543642512'),
(25, 	'Vagem Macarrão',		11,	8,	'5151543642512'),
(26, 	'Vagem holandesa',	8,	8,	'5151543642512');

-- anúncios. A data inicial de todos é '2021-06-01' porque esse é o mês de início das transações (inseridas mais abaixo).
INSERT INTO anuncio (id, datafinal, datainicial, desconto, descricao, preco, titulo, produtoid, imagemid)
VALUES  (1, NULL, '2022-06-08', 10, 'Clássico da culinária popular brasileira, o feijão tropeiro é gostoso, nutritivo, fácil de fazer e ainda serve de opção para dar uma cara nova àquele feijão que está esquecido na geladeira.', 9.90, 'Feijão Tropeiro', 1, 25),
        (2, NULL, '2021-06-01', 15, 'Feijão preto tradicional, nativo da América.', 11.50, 'Feijão Preto', 2, 10),
        (3, NULL, '2021-06-01', 5, 'Feijão vermelho tem grãos avermelhados, pequenos e arredondados. É um pouco mais suave e sutilmente mais adocicado. Seu  preparo é similar ao do feijão carioca.', 11.45, 'Feijão Vermelho', 3, 11),
        (5, NULL, '2021-06-01', 0, 'O milho verde é um ingrediente bastante versátil que pode ser usado em receitas de doces, salgados e até sucos. Também é ótimo para ser consumido puro, seja assado ou cozido.', 17.90, 'Milho Verde', 4, 16),
        (33, NULL, '2021-06-01', 5, 'Também conhecido como arroz polido ou arroz agulhinha, este é o tipo de arroz mais consumido no mundo. Ele passa por um processo de remoção da casca para deixá-lo completamente branco e mais fácil de cozinhar.', 7.90, 'Arroz branco', 33, 26),
        (35, NULL, '2021-06-01', 3, 'Apenas três ingredientes são usados para preparar esta receita: morangos, chia e tâmaras. O último é usado como substituto do açúcar.', 41.90, 'Geleia de morango', 35, 27),
        (41, NULL, '2021-06-01', 3, 'A laranja-pera é ideal para sucos e para consumo in natura. Ela é pequena, ligeiramente alongada e tem poucas sementes.', 6.35, 'Laranja-pera', 41, 28),
        (42, NULL, '2021-06-01', 0, 'A laranja-lima é a opção menos ácida entre as variedades dessa fruta cítrica. Possui sabor doce e suave.', 7.99, 'Laranja-lima', 42, 29),
        (6, NULL, '2021-06-01', 15, 'Milho amarelo é excepcionalmente nutritivo, devido aos seus valores de carotenoides mais elevados.', 11.90, 'Milho Amarelo', 5, 15),
        (8, NULL, '2021-06-01', 20, 'O mel mais tradicional.', 24.90, 'Mel de Abelha', 6, 13),
        (9, NULL, '2021-06-01', 20, 'Mel produzido pelo macho da abelha!', 25.90, 'Mel de Zangão', 7, 14),
        (14, NULL, '2021-06-01', 10, 'Leite tradicional.', 4.90, 'Leite de Vaca', 8, 12),
        (36, NULL, '2021-06-01', 0, 'O arroz integral, ao contrário do arroz branco, não passa pelo processo tradicional de remoção de casca.', 8.90, 'Arroz integral', 36, 30),
        (37, NULL, '2021-06-01', 30, 'O queijo colonial é um dos ícones da gastronomia gaúcha. É feito mediante produção artesanal.', 73.10, 'Queijo colonial', 37, 31),
        (38, NULL, '2021-06-01', 0, 'Uma receita feita apenas com água, açúcar e amoras. O resultado é um doce com um toque azedinho.', 69.55, 'Geleia de amora', 38, 32),
        (43, NULL, '2021-06-01', 0, 'A uva merlot nasceu na França. É uma das uvas mais cultivadas ao redor do mundo, especialmente pelo fato de se adaptar a diferentes terroirs e amadurecer mais cedo que a outras castas tintas.', 14.99, 'Uva merlot', 43, 33),
        (44, NULL, '2021-06-01', 0, 'A uva malbec é originária da França.', 15.99, 'Uva malbec', 44, 34),
        (15, NULL, '2021-06-01', 25, 'Leite produzido por cabras domésticas.', 9.99, 'Leite de Cabra', 9, 35),
        (16, NULL, '2021-06-01', 0, 'O feijão branco é uma variedade de feijão (Phaseolus vulgaris) nativo da América. Tem formato oval, ligeiramente achatado. Diferente da maioria dos vegetais, os feijões brancos mantêm seu valor nutritivo quando enlatados.', 12.20, 'Feijão Branco', 10, 8),
        (17, NULL, '2021-06-01', 0, 'Feijão carioca é uma variedade do feijão comum. Diferentemente da crença popular, o nome não tem relação com o estado do Rio de Janeiro, mas com uma raça de porcos de semelhante coloração.', 9.99, 'Feijão Carioca', 11, 9),
        (18, NULL, '2021-06-01', 40, 'Diz-se que o ovo da galinha é um dos alimentos mais nutritivos do mundo', 9.99, 'Ovo de galinha', 12, 17),
        (19, NULL, '2021-06-01', 0, 'Ovos de codorna são mais densos em proteína e cálcio que ovos de galinha.', 18.80, 'Ovo de codorna', 13, 18),
        (40, NULL, '2021-06-01', 0, 'O Queijo canastra é um tipo de queijo brasileiro, de origem e produção de Minas Gerais, na região da Serra da Canastra. É produzido há mais de duzentos anos.', 55.55, 'Queijo canastra', 40, 36),
        (20, NULL, '2021-06-01', 20, 'A alface americana se chama assim porque seus primeiros cultivos foram realizados nos Estados Unidos. Ela é densa, crocante e repolhuda.', 19.99, 'Alface americana', 14, 1),
        (21, NULL, '2021-06-01', 0, 'A alface crespa é o que gostamos de chamar de “alface tradicional”. É um dos tipos de alface que você sempre vê nas saladas de restaurantes ou nas casas de família.', 21.99, 'Alface crespa', 15, 2),
        (22, NULL, '2021-06-01', 15, 'Alface frisée é um tipo de alface que é menos popular, mas é muito elegante e saborosa, com sabor levemente mais amargo.', 20.50, 'Alface frisée', 16, 3),
        (23, NULL, '2021-06-01', 0, 'Alface lisa tem folhas soltas que não formam cabeças repolhudas, e textura macia e suave.', 20.99, 'Alface lisa', 17, 4),
        (24, NULL, '2021-06-01', 0, 'Alface mimosa tem folhas pequenas e arredondadas.', 25.00, 'Alface mimosa', 18, 5),
        (25, NULL, '2021-06-01', 5, 'Alface romana tem folhas longas e crespas. É ideal para receitas com molho.', 25.99, 'Alface romana', 19, 6),
        (26, NULL, '2021-06-01', 25, 'Alface roxa é alface, mas é roxa.', 19.00, 'Alface roxa', 20, 7),
        (27, NULL, '2021-06-01', 0, 'A soja amarela é o tipo de soja mais famoso e cultivado.' , 9.99, 'Soja amarela', 21, 20),
        (28, NULL, '2021-06-01', 10, 'O grão da soja preta possui cinco a sete vezes mais antioxidantes que o da soja amarela. O pigmento preto que reveste esta soja forma uma espécie de casca em torno do grão, que ajuda a conservar melhor os seus nutrientes.', 12.99, 'Soja preta', 22, 21),
        (29, NULL, '2021-06-01', 0, 'O Tomate Longa Vida é chamado assim porque dura bastante. É bom para fazer salada. Mas, por ser muito aguado, não é o ideal para molhos. É o mais comercializado no Brasil.', 9.39, 'Tomate Longa Vida', 23, 23),
        (30, NULL, '2021-06-01', 15, 'Um mini tomate bem adocicado, aguado e refrescante, ideal para fazer saladinhas, e também para colocar em canapés e espetinhos.', 22.99, 'Tomate Cereja', 24, 22),
        (31, NULL, '2021-06-01', 0, 'É o tipo mais comum de vagem. Também é chamada de feijão vagem. Cilíndrica e crocante, tem tonalidade verde-clara. O cozimento no vapor preserva sua cor e sabor.', 24.99, 'Vagem Macarrão', 25, 24),
        (32, NULL, '2021-06-01', 40, 'Também conhecida como vagem francesa, é fina e verde escura quando madura e pouco fibrosa, o que a torna perfeita para cozimentos rápidos.', 27.99, 'Vagem holandesa', 26, 37),
        (45, NULL, '2021-06-01', 1, 'A banana-ouro é uma fruta de sobremesa que tem formato pequeno, casca fina com coloração amarela ao amadurecer e uma polpa de textura macia e muito doce.', 4.99, 'Banana-ouro', 45, 38),
        (46, NULL, '2021-06-01', 0, 'A banana-prata é uma fruta de sobremesa que tem formato alongado e levemente curvado, possui casca fina com coloração amarela ao amadurecer e uma polpa de textura macia, adocicada e levemente ácida.', 5.99, 'Banana-prata', 46, 39);

-- transações. Há uma transação para cada anúncio. As transações estão distribuídas entre os meses de junho de 2021 até junho de 2021.
INSERT INTO `transacao` (`ID`, `ANUNCIOID`, `DATATRANSACAO`, `QUANTIDADE`, `PRECO`) VALUES
-- vendas de produtos de fazendas do Alexandre
(1,	1,	'2021-06-01',	3,	3 * 9.90),
(2,	2,	'2021-07-01',	2,	2 * 11.50),
(3,	3,	'2021-08-01',	4,	4 * 11.45),
(4,	5,	'2021-09-01',	3,	3 * 17.90),
(33,	33,	'2021-09-01',	2,	2 * 7.90),
(35,	35,	'2021-10-01',	2,	1 * 41.90),
(5,	6,	'2021-10-01',	1,	1 * 11.90),
(6,	8,	'2021-11-01',	1,	1 * 24.90),
(7,	9,	'2021-12-01',	1,	1 * 25.90),
(8,	14,	'2022-01-01',	3,	3 * 4.90),
(36,	36,	'2022-01-01',	3,	3 * 8.90),
(37,	37,	'2022-02-01',	1,	1 * 73.10),
(38,	38,	'2022-02-01',	1,	1 * 69.55),
(9,	15,	'2022-02-01',	3,	3 * 9.99),
(10,	16,	'2022-03-01',	2,	2 * 12.20),
(11,	17,	'2022-04-01',	1,	1 * 9.99),
(12,	18,	'2022-05-01',	1,	1 * 9.99),
(13,	19,	'2022-06-01',	2,	2 * 18.80),
(40,	40,	'2022-06-01',	2,	2 * 55.55),
(41,	41,	'2022-06-01',	2,	2 * 6.35),
(42,	42,	'2022-05-01',	2,	2 * 7.99),
(43,	43,	'2022-01-01',	2,	2 * 14.99),
(44,	44,	'2022-01-01',	3,	3 * 15.99),
(45,	45,	'2021-06-01',	3,	3 * 4.99),
(46,	46,	'2021-07-01',	3,	3 * 5.99),
-- vendas de produtos de fazendas do Adolfo
(14,	20,	'2021-06-01',	1,	1 * 19.99),
(15,	21,	'2021-07-01',	2,	2 * 21.99),
(16,	22,	'2021-08-01',	5,	5 * 20.50),
(17,	23,	'2021-09-01',	4,	4 * 20.99),
(18,	24,	'2021-10-01',	4,	4 * 25.00),
(19,	25,	'2021-11-01',	6,	6 * 25.99),
(20,	26,	'2021-12-01',	2,	2 * 19.00),
(21,	27,	'2022-01-01',	1,	1 * 9.99),
(22,	28,	'2022-02-01',	1,	1 * 12.99),
(23,	29,	'2022-03-01',	3,	3 * 9.39),
(24,	30,	'2022-04-01',	2,	2 * 22.99),
(25,	31,	'2022-05-01',	4,	4 * 24.99),
(26,	32,	'2022-06-01',	6,	6 * 27.99);


set foreign_key_checks = 1;


