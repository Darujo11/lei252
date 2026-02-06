// Estrutura completa da Lei Complementar 252/2016 consolidada
export const capitulos = [
  {
    id: 'cap1',
    numero: 'I',
    titulo: 'Da Estrutura do Quadro Geral de Cargos',
    secoes: [
      {
        id: 'sec1-1',
        titulo: 'Disposições Gerais',
        artigos: [
          {
            numero: 1,
            texto: 'Fica instituído o Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé, adotando-se como objetivos a valorização da função pública, a capacitação e o aperfeiçoamento do servidor, bem como a melhoria dos níveis de eficiência do serviço público municipal.',
            fonte: 'lc252'
          },
          {
            numero: 2,
            texto: 'Para efeitos desta Lei Complementar são adotadas as seguintes definições:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Quadro de pessoal é o conjunto de cargos de carreira, cargos de provimento em comissão e funções gratificadas existentes na Câmara Municipal de Macaé;', fonte: 'lc252' },
              { numero: 'II', texto: 'Cargo público é o conjunto de atribuições, deveres e responsabilidades cometidos ao servidor público, criado por lei, com denominação própria, número certo e vencimento a ser pago pelos cofres públicos;', fonte: 'lc252' },
              { numero: 'III', texto: 'Servidor público é toda pessoa física legalmente investida em cargo público, de provimento efetivo ou em comissão;', fonte: 'lc252' },
              { numero: 'IV', texto: 'Classes são os níveis hierárquicos dentro de um cargo, que refletem as possibilidades de avanço funcional do servidor, de acordo com o desenvolvimento de sua carreira no cargo ocupado;', fonte: 'lc355', alterado: true },
              { numero: 'V', texto: 'Carreira refere-se à trajetória de crescimento do servidor dentro do conjunto de classes de um cargo, com base em critérios previamente definidos;', fonte: 'lc355', alterado: true },
              { numero: 'VI', texto: 'Grupo ocupacional é o conjunto de cargos com afinidades entre si quanto à natureza do trabalho ou grau de escolaridade exigido para seu desempenho;', fonte: 'lc252' },
              { numero: 'VII', texto: 'Nível é o símbolo atribuído ao conjunto de cargos equivalentes quanto ao grau de dificuldade, complexidade e responsabilidade das tarefas, servindo para determinar a faixa de vencimentos a eles correspondente;', fonte: 'lc252' },
              { numero: 'VIII', texto: 'Faixa de vencimentos é a escala de padrões de vencimento atribuídos a determinado nível.', fonte: 'lc252' },
              { numero: 'IX', texto: 'Padrão de vencimento é a letra que identifica o vencimento atribuído ao servidor dentro da faixa de vencimentos do cargo que ocupa;', fonte: 'lc252' },
              { numero: 'X', texto: 'Interstício é o lapso de tempo estabelecido como o mínimo necessário para que o servidor se habilite à progressão ou à promoção;', fonte: 'lc252' },
              { numero: 'XI', texto: 'Cargo em comissão é o cargo de confiança de livre nomeação e exoneração, a ser preenchido também por servidor de carreira nos casos, condições e percentuais mínimos estabelecidos em lei.', fonte: 'lc252' },
              { numero: 'XII', texto: 'Função gratificada é preenchida por servidor público efetivo da Câmara Municipal de Macaé nos casos, condições e percentuais mínimos previstos em lei.', fonte: 'lc284', acrescido: true },
              { numero: 'XIII', texto: 'Progressão é a movimentação do servidor público efetivo de um padrão de vencimento para um subsequente, dentro da mesma classe ou faixa de vencimentos do cargo que ocupa, atendidos os requisitos legais;', fonte: 'lc355', acrescido: true },
              { numero: 'XIV', texto: 'Promoção é o ato administrativo que resulta na ascensão do servidor público efetivo a uma classe superior, dentro do mesmo cargo e da mesma carreira, atendidos os requisitos legais.', fonte: 'lc355', acrescido: true },
              { numero: 'XV', texto: 'Enquadramento é o ato de classificação ou reclassificação do servidor público efetivo dentro de sua carreira, com base em critérios legais, podendo envolver alterações na faixa de vencimentos e nas classes do cargo, conforme estabelecido em lei.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'sec1-2',
        titulo: 'Da Composição',
        artigos: [
          {
            numero: 3,
            texto: 'O Plano de Cargos, Carreiras e Vencimentos da Câmara Municipal de Macaé obedece ao regime estatutário, de acordo com a Lei Complementar Municipal nº 011/1998 e alterações, sendo que seu Quadro Geral de Cargos é composto da seguinte forma:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Quadro Permanente, formado por cargos de provimento efetivo, essenciais ao funcionamento regular da Câmara Municipal de Macaé; e', fonte: 'lc252' },
              { numero: 'II', texto: 'Quadro Suplementar, formado por cargos em extinção.', fonte: 'lc252' }
            ],
            paragrafos: [
              { numero: 'único', texto: 'Os cargos, com as respectivas denominações e quantitativos, são os constantes dos Anexos I, I-A, VIII e XI desta Lei Complementar.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: 4,
            texto: 'O Quadro Permanente é composto por cargos de provimento efetivo subdividido nos seguintes Grupos Ocupacionais, conforme Anexo II:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Grupo Ocupacional Fundamental I;', fonte: 'lc252' },
              { numero: 'II', texto: 'Grupo Ocupacional Fundamental II;', fonte: 'lc252' },
              { numero: 'III', texto: 'Grupo Ocupacional Médio I;', fonte: 'lc355', alterado: true },
              { numero: 'IV', texto: 'Grupo Ocupacional Médio II;', fonte: 'lc355', acrescido: true },
              { numero: 'V', texto: 'Grupo Ocupacional Superior.', fonte: 'lc355', alterado: true }
            ],
            paragrafos: [
              { numero: '1º', texto: 'A cada Grupo Ocupacional corresponde uma Tabela de Vencimento, conforme Anexo III.', fonte: 'lc252' },
              { numero: '2º', texto: 'Integram o Grupo Ocupacional Fundamental I os cargos efetivos em que um dos requisitos para a investidura seja ensino fundamental incompleto, conforme atribuição própria especificada no Anexo IV.', fonte: 'lc252' },
              { numero: '3º', texto: 'Integram o Grupo Ocupacional Fundamental II os cargos efetivos em que um dos requisitos para a investidura seja a conclusão do ensino fundamental, conforme atribuição própria especificada no Anexo V.', fonte: 'lc252' },
              { numero: '4º', texto: 'Integram o Grupo Ocupacional Médio I os cargos efetivos em que um dos requisitos de investidura seja a conclusão do ensino médio, conforme atribuição própria especificada no Anexo VI.', fonte: 'lc355', alterado: true },
              { numero: '4º-A', texto: 'Integram o Grupo Ocupacional Médio II os cargos efetivos em que um dos requisitos de investidura seja a conclusão do ensino médio, acrescido de formação técnica específica, conforme atribuição própria especificada no Anexo VI-A.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'Integram o Grupo Ocupacional Superior os cargos efetivos em que um dos requisitos para a investidura seja a conclusão de curso de ensino superior, conforme atribuição própria especificada no Anexo VII.', fonte: 'lc252' }
            ]
          },
          {
            numero: 5,
            texto: 'Os cargos do Quadro Suplementar, constantes nos Anexos I-A, VIII e XI desta Lei Complementar, deverão ser extintos na sua vacância.',
            fonte: 'lc355',
            alterado: true,
            paragrafos: [
              { numero: '1º', texto: 'Os servidores vinculados ao Quadro Suplementar "A" serão remunerados de acordo com a Tabela de Vencimento atribuída ao respectivo Grupo Ocupacional, conforme Anexo III.', fonte: 'lc252' },
              { numero: '2º', texto: 'A partir da publicação desta Lei Complementar fica vedado o provimento dos cargos que integram o Quadro Suplementar.', fonte: 'lc252' },
              { numero: '3º', texto: 'O Anexo XI será atualizado pela Diretoria de Recursos Humanos, que publicará sua versão consolidada para dele fazer constar apenas os cargos remanescentes, ainda não extintos na forma do caput.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'sec1-3',
        titulo: 'Do Ingresso e das Atribuições',
        artigos: [
          {
            numero: 6,
            texto: 'Os cargos constantes no Quadro Permanente serão providos exclusivamente por concurso público de provas ou de provas e títulos e seu ingresso ocorrerá no nível e padrão inicial da carreira.',
            fonte: 'lc252',
            paragrafos: [
              { numero: '1º', texto: 'A aprovação em concurso público não gera direito à nomeação, a qual se dará a exclusivo critério do Poder Legislativo Municipal, dentro do prazo de validade do concurso, em conformidade com o número de vagas constantes no respectivo edital e de acordo com a legislação municipal.', fonte: 'lc252' },
              { numero: '2º', texto: 'Excetua-se das formas de provimento previstas no caput deste artigo a contratação por tempo determinado para atender à necessidade temporária de excepcional interesse público municipal, nos termos do art. 37, inciso IX da Constituição Federal.', fonte: 'lc252' }
            ]
          },
          {
            numero: 7,
            texto: 'O edital do concurso público para ingresso de servidores no quadro de pessoal da Câmara Municipal de Macaé não poderá estipular carga horária, atribuições ou requisitos de ingresso diversos daqueles estabelecidos na presente Lei Complementar.',
            fonte: 'lc252',
            paragrafos: [
              { numero: 'único', texto: 'O Poder Legislativo poderá regulamentar as atribuições dos cargos por meio de Resolução.', fonte: 'lc252' }
            ]
          }
        ]
      },
      {
        id: 'sec1-4',
        titulo: 'Da Remuneração',
        artigos: [
          {
            numero: 8,
            texto: 'O sistema remuneratório é dividido em vencimento e vantagens pecuniárias.',
            fonte: 'lc252'
          },
          {
            numero: 9,
            texto: 'O vencimento, devido mensalmente ao servidor pertencente ao Quadro Geral de Cargos, será pago em razão do exercício regular de suas atribuições e está previsto no Anexo III.',
            fonte: 'lc252',
            paragrafos: [
              { numero: 'único', texto: 'O vencimento inicial dos ocupantes de cargos do provimento efetivo, do quadro suplementar e em comissão da Câmara Municipal de Macaé-RJ, são os constantes das Leis Municipais nº 4116/2015 e 4140/2015.', fonte: 'lc252' }
            ]
          },
          {
            numero: 10,
            texto: 'Os servidores ocupantes de cargos abrangidos por esta Lei Complementar receberão as vantagens pecuniárias previstas no Estatuto dos Servidores do Município e demais legislação que dispuser acerca do assunto.',
            fonte: 'lc252'
          },
          {
            numero: '10-A',
            texto: 'O servidor pertencente ao quadro permanente e suplementar da Câmara Municipal de Macaé fará jus ao adicional por tempo de serviço devido à razão de 5% (cinco por cento) por cada triênio, incidentes sobre o vencimento básico, limitado ao percentual de 55% (cinquenta e cinco por cento).',
            fonte: 'lc294',
            acrescido: true,
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'A apuração do tempo de serviço será feita em dias, cujo número será convertido em ano civil, isto é, 365 (trezentos e sessenta e cinco) dias, sendo levado em conta, para este cômputo, somente o tempo de serviço prestado à municipalidade.', fonte: 'lc294' },
              { numero: '2º', texto: 'O servidor fará jus ao adicional a partir do dia do mês em que completar o triênio.', fonte: 'lc294' }
            ]
          },
          {
            numero: 11,
            texto: 'A maior remuneração, a qualquer título, atribuída aos servidores, obedecerá estritamente ao disposto no artigo 37, inciso XI da Constituição Federal de 1988, sendo imediatamente reduzidos quaisquer valores percebidos em desacordo com a legislação vigente.',
            fonte: 'lc252'
          },
          {
            numero: 12,
            texto: 'Lei específica deverá promover a revisão geral anual dos vencimentos dos servidores públicos abrangidos por esta Lei Complementar, sempre na mesma data e sem distinção de índices, realizada nas seguintes datas:',
            fonte: 'lc355',
            alterado: true,
            incisos: [
              { numero: 'I', texto: 'Abril do ano de 2026;', fonte: 'lc355' },
              { numero: 'II', texto: 'Março do ano de 2027;', fonte: 'lc355' },
              { numero: 'III', texto: 'Sempre no mês de fevereiro, a partir do ano de 2028.', fonte: 'lc355' }
            ],
            paragrafos: [
              { numero: 'único', texto: 'O percentual de revisão geral deverá utilizar como parâmetros os índices inflacionários do período e o limite de despesas com pessoal previsto no artigo 169 da Constituição Federal de 1988.', fonte: 'lc284' }
            ]
          }
        ]
      },
      {
        id: 'sec1-5',
        titulo: 'Da Jornada e Carga Horária',
        artigos: [
          {
            numero: 13,
            texto: 'A jornada de trabalho do servidor será definida de acordo com o Setor ou Diretoria ao qual este estiver vinculado, respeitada a carga horária semanal inerente ao cargo.',
            fonte: 'lc284',
            alterado: true
          },
          {
            numero: 14,
            texto: 'A carga horária inerente a cada cargo é aquela definida nos Anexos I, I-A e VIII desta Lei Complementar.',
            fonte: 'lc355',
            alterado: true,
            paragrafos: [
              { numero: '1º', texto: 'O serviço extraordinário será preferencialmente compensado por meio de banco de horas, na forma de regulamento, e, excepcionalmente, indenizado em pecúnia.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'Na hipótese de conversão em pecúnia prevista no § 1º, as horas extraordinárias realizadas em dias úteis serão remuneradas com acréscimo de 50% (cinquenta por cento) sobre o valor da hora normal, e aquelas prestadas aos sábados, domingos ou feriados, quando o trabalho não integrar a escala regular do servidor, com acréscimo de 100% (cem por cento).', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'O pagamento de horas extraordinárias condiciona-se à autorização prévia das autoridade competente, mediante solicitação fundamentada da chefia imediata, e será calculado com base no registro de ponto que comprove a efetiva prestação do serviço.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '14-A',
            texto: 'A Administração poderá convocar servidores efetivos da Câmara Municipal de Macaé para a prestação de serviço extraordinário, em caráter excepcional e por período estritamente necessário, mediante necessidade de serviço devidamente fundamentada.',
            fonte: 'lc355',
            acrescido: true,
            paragrafos: [
              { numero: '1º', texto: 'O serviço extraordinário de que trata o caput será, a critério da Administração, remunerado por meio de horas extraordinárias ou compensado em banco de horas, na forma do regulamento.', fonte: 'lc355' },
              { numero: '2º', texto: 'Na hipótese de convocação de servidores submetidos a regime de escala, a Administração deverá, preferencialmente, convocar aqueles que não tenham cumprido plantão no dia anterior nem estejam escalados para o dia seguinte.', fonte: 'lc355' }
            ]
          },
          {
            numero: 15,
            texto: 'O servidor efetivo da Câmara Municipal de Macaé, quando designado para o desempenho de atividade de coordenação ou supervisão de setor, na forma do artigo 2º da Lei Municipal nº 4.102/2015, terá regime integral de trabalho, não fazendo jus a qualquer tipo de hora extraordinária.',
            fonte: 'lc252'
          },
          {
            numero: 16,
            texto: 'O acúmulo de cargos públicos somente será autorizado nos casos admitidos pela Constituição Federal e desde que seja comprovada a compatibilidade de jornada e carga horária.',
            fonte: 'lc252'
          }
        ]
      },
      {
        id: 'sec1-6',
        titulo: 'Da Gratificação por Desempenho de Atividade Legislativa (REVOGADO)',
        artigos: [
          {
            numero: 17,
            texto: 'REVOGADO - Os servidores públicos efetivos da Câmara Municipal de Macaé faziam jus à Gratificação por Desempenho de Atividade Legislativa – GAL.',
            fonte: 'lc341',
            revogado: true
          }
        ]
      },
      {
        id: 'sec1-7',
        titulo: 'Do Adicional Especial de Mérito',
        artigos: [
          {
            numero: 18,
            texto: 'Os servidores efetivos da Câmara Municipal de Macaé farão jus a um adicional especial de mérito, no percentual de 5% (cinco por cento) de seu vencimento base, ao completar 15 (quinze) anos de efetivo exercício e fará jus a mais 5% (cinco por cento) ao completar 20 (vinte) anos de efetivo exercício, no limite de 10% (dez por cento), que integrará a remuneração para fins de aposentadoria, desde que cumpridos os seguintes requisitos:',
            fonte: 'lc284',
            alterado: true,
            destaque: true,
            incisos: [
              { numero: 'I', texto: 'estar em efetivo exercício no cargo há pelo menos 15 (quinze) anos;', fonte: 'lc284' },
              { numero: 'II', texto: 'obter média mínima de 80% (oitenta por cento) nas avaliações de desempenho a que se submeter, posteriores à entrada em vigor desta Lei Complementar;', fonte: 'lc355', alterado: true },
              { numero: 'III', texto: '(Revogado).', fonte: 'lc355', revogado: true }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Para fins de contagem do tempo de serviço a que se refere o caput, não serão computados os períodos de licença para tratar de interesse particular, de licença por motivo de afastamento de cônjuge ou companheiro, nem quaisquer outros afastamentos não remunerados definidos em regulamentação específica.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'O prazo previsto no caput será contado a partir da data de entrada em exercício do servidor no cargo efetivo da Câmara Municipal.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'A vantagem pecuniária prevista no caput considera-se fixa e de caráter permanente, na forma do § 6º do art. 38 da Lei Complementar nº 011/1998.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cap2',
    numero: 'II',
    titulo: 'Do Sistema de Avaliação de Desempenho',
    secoes: [
      {
        id: 'sec2-1',
        titulo: 'Disposições Gerais',
        artigos: [
          {
            numero: 19,
            texto: 'Fica instituído o Sistema de Avaliação de Desempenho, que objetiva o aprimoramento dos métodos de gestão, melhoria da eficiência do serviço público e valorização do servidor.',
            fonte: 'lc252',
            paragrafos: [
              { numero: 'único', texto: 'Compete à Câmara Municipal de Macaé a gestão do Sistema de Avaliação de Desempenho, por meio da Comissão de Desenvolvimento Funcional.', fonte: 'lc252' }
            ]
          },
          {
            numero: 20,
            texto: 'O Sistema de Avaliação de Desempenho é composto por:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Avaliação Especial de Desempenho, utilizada para fins de aprovação no estágio probatório, conforme dispõe o art. 41, §4º da Constituição Federal;', fonte: 'lc252' },
              { numero: 'II', texto: 'Avaliação Periódica de Desempenho, realizada semestralmente, com o objetivo de subsidiar a Evolução Funcional e a gestão de pessoal.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: 21,
            texto: 'O Sistema de Avaliação de Desempenho é o conjunto de normas e procedimentos que possibilitam a observação da atuação do servidor público no exercício do cargo que ocupa, baseado na comparação entre resultados alcançados e padrões de desempenho previamente estabelecidos.',
            fonte: 'lc252'
          },
          {
            numero: 22,
            texto: 'O Sistema de Avaliação de Desempenho tem por objetivo aferir a eficiência e a eficácia dos servidores no exercício de suas atribuições e promover:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'a identificação dos problemas que interferem no desempenho do servidor;', fonte: 'lc252' },
              { numero: 'II', texto: 'a orientação e o acompanhamento dos servidores;', fonte: 'lc252' },
              { numero: 'III', texto: 'a consecução das metas estabelecidas;', fonte: 'lc252' },
              { numero: 'IV', texto: 'maior aproximação entre chefes e subordinados;', fonte: 'lc252' },
              { numero: 'V', texto: 'o desenvolvimento da organização;', fonte: 'lc252' },
              { numero: 'VI', texto: 'a melhoria dos serviços;', fonte: 'lc252' },
              { numero: 'VII', texto: 'a excelência no atendimento ao público.', fonte: 'lc252' }
            ]
          }
        ]
      },
      {
        id: 'sec2-2',
        titulo: 'Da Comissão de Desenvolvimento Funcional',
        artigos: [
          {
            numero: 23,
            texto: 'A Comissão de Desenvolvimento Funcional será constituída por 7 (sete) membros, designados pelo Presidente da Câmara Municipal de Macaé, à qual compete, dentre outras atribuições, proceder à avaliação periódica de desempenho, conforme o disposto nesta Lei Complementar e em regulamentação específica.',
            fonte: 'lc355',
            alterado: true,
            paragrafos: [
              { numero: 'único', texto: 'Da Comissão deverá fazer parte:', fonte: 'lc355' }
            ],
            incisos: [
              { numero: 'I', texto: 'O Diretor Geral da Câmara Municipal, como Presidente desta Comissão;', fonte: 'lc355' },
              { numero: 'II', texto: '1 (um) representante da Procuradoria Geral da Câmara Municipal;', fonte: 'lc355' },
              { numero: 'III', texto: '1 (um) representante da Diretoria de Recursos Humanos da Câmara Municipal;', fonte: 'lc355' },
              { numero: 'IV', texto: '1 (um) representante da Diretoria de Contabilidade da Câmara Municipal;', fonte: 'lc355' },
              { numero: 'V', texto: '3 (três) servidores efetivos, representantes, que serão eleitos.', fonte: 'lc355' }
            ]
          },
          {
            numero: 24,
            texto: 'A eleição dos membros representantes dos servidores para composição da Comissão de Desenvolvimento Funcional ocorrerá a cada 2 (dois) anos, preferencialmente no mês de julho, cabendo à Diretoria de Recursos Humanos da Câmara Municipal a organização e realização do processo eleitoral, observadas as disposições desta Lei Complementar.',
            fonte: 'lc355',
            alterado: true,
            paragrafos: [
              { numero: '1º', texto: 'O resultado da eleição será encaminhado ao Diretor-Geral Administrativo-Financeiro da Câmara Municipal, por meio de lista com os 5 (cinco) candidatos mais votados, cabendo ao Presidente da Câmara designar 3 (três) deles para integrar a Comissão, com início do mandato no mês subsequente.', fonte: 'lc355' },
              { numero: '2º', texto: 'Na hipótese de haver menos de 3 (três) candidatos na lista de eleitos, caberá ao Presidente da Câmara designar os representantes restantes dentre os servidores efetivos da Casa.', fonte: 'lc355' },
              { numero: '3º', texto: 'Em caso de impedimento ou vacância no decorrer do mandato, será realizada a substituição do membro, cabendo ao Presidente da Câmara designar o novo representante dentre os remanescentes da lista de que trata o § 1º deste artigo.', fonte: 'lc355' },
              { numero: '4º', texto: 'No caso de impossibilidade de substituição do membro pelo critério previsto no parágrafo anterior, caberá ao Presidente da Câmara a escolha de novo representante dentre os servidores efetivos da Casa.', fonte: 'lc355' },
              { numero: '5º', texto: 'Na hipótese de não realização da eleição no prazo previsto no caput, os representantes em exercício permanecerão, em caráter excepcional e provisório, no desempenho de suas funções, considerando-se válidos e eficazes os atos praticados nesse período.', fonte: 'lc355' }
            ]
          },
          {
            numero: 25,
            texto: 'A Comissão reunir-se-á:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Para coordenar a avaliação de desempenho dos servidores, com base nos fatores constantes no Formulário de Avaliação de Desempenho, objetivando a aplicação dos institutos da progressão e da promoção;', fonte: 'lc252' },
              { numero: 'II', texto: 'Extraordinariamente, quando for necessário.', fonte: 'lc252' }
            ]
          },
          {
            numero: 26,
            texto: 'A Comissão de Desenvolvimento Funcional terá sua forma de funcionamento regulamentada por ato do Presidente da Câmara Municipal de Macaé.',
            fonte: 'lc252'
          },
          {
            numero: 27,
            texto: 'Compete à Comissão de Desenvolvimento Funcional:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Coordenar os processos de Avaliação Especial de Desempenho e Avaliação Periódica de Desempenho;', fonte: 'lc252' },
              { numero: 'II', texto: 'Encaminhar os formulários de avaliação e desempenho;', fonte: 'lc284', alterado: true },
              { numero: 'III', texto: 'Orientar as chefias e os servidores quanto aos objetivos, procedimentos e cuidados relativos às Avaliações de Desempenho;', fonte: 'lc252' },
              { numero: 'IV', texto: 'Receber a pontuação dos servidores avaliados;', fonte: 'lc284', alterado: true },
              { numero: 'V', texto: 'Determinar nova avaliação, quando for o caso;', fonte: 'lc252' },
              { numero: 'VI', texto: 'Elaborar e divulgar a listagem final dos servidores que adquiriram direito à progressão e promoção;', fonte: 'lc252' },
              { numero: 'VII', texto: 'Preparar o relatório final dos trabalhos de cada período de avaliação e encaminhá-lo ao Chefe do Legislativo;', fonte: 'lc252' },
              { numero: 'VIII', texto: 'providenciar os atos que concedem a progressão ou a promoção;', fonte: 'lc355', alterado: true },
              { numero: 'IX', texto: 'Julgar os pedidos de reconsideração contra suas próprias decisões;', fonte: 'lc252' },
              { numero: 'X', texto: 'Solicitar a indicação de servidor público aos Órgãos da Administração Pública, com a finalidade de auxiliar e representar a Comissão em seus respectivos Órgãos;', fonte: 'lc252' },
              { numero: 'XI', texto: 'Utilizar-se de todas as informações existentes sobre o servidor avaliado;', fonte: 'lc252' },
              { numero: 'XII', texto: 'Realizar diligências junto às unidades e chefias, solicitando, se necessário, a revisão das informações, a fim de corrigir erros ou omissões;', fonte: 'lc252' },
              { numero: 'XIII', texto: 'Convocar servidor para prestar informações ou participação opinativa, sem direito a voto;', fonte: 'lc252' },
              { numero: 'XIV', texto: 'Promover a conciliação entre o chefe e seu subordinado;', fonte: 'lc284', alterado: true },
              { numero: 'XV', texto: 'opinar acerca da aquisição ou não da estabilidade do servidor avaliado, conforme dispõe o art. 41, §4° da Constituição Federal de 1988;', fonte: 'lc284' },
              { numero: 'XVI', texto: 'outras atribuições que possam ser criadas por regulamento.', fonte: 'lc284' }
            ],
            paragrafos: [
              { numero: '1º', texto: 'O pedido de reconsideração referido no inciso IX deverá ser apresentado no prazo de até 05 (cinco) dias úteis, a contar da publicação da decisão, devendo indicar os aspectos questionados ou eventual irregularidade, podendo ser anexados documentos que atestem o alegado.', fonte: 'lc252' },
              { numero: '2º', texto: 'A Comissão deverá comunicar ao servidor o deferimento total ou parcial, ou o indeferimento, do pedido de reconsideração.', fonte: 'lc355', alterado: true },
              { numero: '3º', texto: 'As decisões da Comissão serão tomadas por maioria simples dos votos, na presença da maioria absoluta, havendo empate, será desempatado pelo Presidente da Comissão.', fonte: 'lc284', alterado: true },
              { numero: '4º', texto: 'Fica vedado, no âmbito administrativo, a interposição de recurso para rediscutir matéria já apreciada em grau recursal, nos processos de indeferimento parcial ou de pedido de reconsideração.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'sec2-3',
        titulo: 'Do Formulário de Avaliação',
        artigos: [
          {
            numero: 28,
            texto: 'O formulário de avaliação de desempenho será o constante do Anexo IX, que abrange a especificidade de atribuições e responsabilidades de cada cargo.',
            fonte: 'lc252'
          }
        ]
      },
      {
        id: 'sec2-4',
        titulo: 'Da Avaliação Periódica de Desempenho',
        artigos: [
          {
            numero: 29,
            texto: 'A Avaliação Periódica de Desempenho ocorrerá semestralmente, devendo ser avaliados todos os servidores efetivos ainda que em estágio probatório.',
            fonte: 'lc284',
            alterado: true,
            destaque: true
          },
          {
            numero: 30,
            texto: 'A Avaliação Periódica de Desempenho será realizada pela chefia imediata do servidor, referente a cada semestre avaliado, por meio do preenchimento de formulário próprio.',
            fonte: 'lc355',
            alterado: true,
            paragrafos: [
              { numero: '1º', texto: 'O Formulário de Avaliação Funcional será preenchido, preferencialmente, entre os dias 1º e 30 de junho, para o primeiro semestre, e entre os dias 1º e 30 de dezembro, para o segundo semestre.', fonte: 'lc355' },
              { numero: '2º', texto: 'Quando a avaliação for realizada por meio digital, o servidor terá o prazo de 30 (trinta) dias corridos, contados do encerramento do período avaliativo, para registrar ciência do resultado no Sistema.', fonte: 'lc355' },
              { numero: '3º', texto: 'O servidor poderá apresentar recurso fundamentado à Presidência da Câmara Municipal de Macaé, por meio de protocolo, no prazo de 10 (dez) dias corridos, contado da ciência do resultado, caso considere injusta a nota atribuída.', fonte: 'lc355' },
              { numero: '4º', texto: 'A ciência do resultado considerar-se-á tacitamente realizada caso o servidor, no prazo previsto no § 2º deste artigo, não efetue o registro de ciência expressa no sistema, hipótese na qual o prazo recursal previsto no § 3º terá início automaticamente no primeiro dia útil subsequente ao término do prazo assinalado para manifestação expressa.', fonte: 'lc355' },
              { numero: '5º', texto: 'Decorrido o prazo recursal de que trata o § 3º sem manifestação do servidor, operar-se-á a preclusão do seu direito de recorrer, não sendo admitida a reabertura do prazo ou a reconsideração da avaliação.', fonte: 'lc355' }
            ]
          },
          {
            numero: 31,
            texto: 'Os avaliadores deverão:',
            fonte: 'lc355',
            alterado: true,
            incisos: [
              { numero: 'I', texto: 'atribuir ao servidor um conceito para cada fator, de forma motivada e compatível com o desempenho demonstrado no respectivo semestre em avaliação;', fonte: 'lc355' },
              { numero: 'II', texto: 'avaliar cada servidor com objetividade, limitando-se à observação e à análise de seu desempenho durante o semestre avaliado, a fim de eliminar a influência de efeitos emocionais e opiniões pessoais;', fonte: 'lc355' },
              { numero: 'III', texto: 'dar ciência ao servidor acerca do resultado da avaliação, quando esta não for realizada em meio digital.', fonte: 'lc355' }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Na ausência de sistema de avaliação digital, os avaliadores encaminharão os formulários, devidamente preenchidos e assinados pela chefia imediata e pelo servidor, ao Presidente da Comissão de Desenvolvimento Funcional.', fonte: 'lc355' },
              { numero: '2º', texto: 'Em caso de recusa do servidor em apor a assinatura, a chefia certificará a ocorrência no próprio formulário, preferencialmente em seu verso, e colherá, sempre que possível, a assinatura de duas testemunhas, para fins de comprovação da ciência.', fonte: 'lc355' },
              { numero: '3º', texto: 'Havendo interposição de recurso, a Comissão de Desenvolvimento Funcional remeterá os autos da avaliação à Presidência da Câmara Municipal, a quem competirá a designação de uma comissão específica para análise e emissão de parecer.', fonte: 'lc355' },
              { numero: '4º', texto: 'A comissão específica de que trata o § 3º será composta por 3 (três) servidores efetivos, não ocupantes de cargo em comissão, e que não sejam membros da Comissão de Desenvolvimento Funcional.', fonte: 'lc355' },
              { numero: '5º', texto: 'De posse do recurso e do parecer da comissão específica, o Presidente da Câmara Municipal proferirá a decisão final sobre a avaliação, que será irrecorrível na esfera administrativa.', fonte: 'lc355' }
            ]
          }
        ]
      },
      {
        id: 'sec2-5',
        titulo: 'Do Estágio Probatório',
        artigos: [
          {
            numero: 32,
            texto: 'Como condição para aquisição da estabilidade, o servidor nomeado em virtude de Concurso Público para cargo de provimento efetivo deverá ser submetido à Avaliação Especial de Desempenho pela Comissão de Desenvolvimento Funcional nos 6 (seis) meses finais antes de encerrado o prazo de 3 (três) anos de efetivo exercício.',
            fonte: 'lc252',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A Avaliação Especial de Desempenho deverá obedecer ao mesmo procedimento especificado nos artigos 29 e 30 desta Lei Complementar.', fonte: 'lc252' }
            ]
          },
          {
            numero: 33,
            texto: 'A Avaliação Especial de Desempenho do servidor será calculada com base na média das notas atribuídas nas Avaliações Periódicas de Desempenho durante o período do Estágio Probatório, sendo necessária uma nota mínima de 70 (setenta) pontos para aprovação.',
            fonte: 'lc355',
            alterado: true,
            destaque: true
          },
          {
            numero: 34,
            texto: 'Ao final da Avaliação Especial de Desempenho, a Comissão de Desenvolvimento Funcional emitirá parecer favorável ou desfavorável à confirmação do servidor no cargo para o qual foi nomeado.',
            fonte: 'lc252',
            paragrafos: [
              { numero: '1º', texto: 'Se o parecer for favorável à confirmação do servidor, sua estabilidade nos quadros da Câmara Municipal se dará mediante ratificação do Presidente no formulário de avaliação especial.', fonte: 'lc252' },
              { numero: '2º', texto: 'Se o parecer for contrário à confirmação do servidor, o mesmo será intimado pessoalmente para, em querendo, apresentar defesa escrita, no prazo de 10 (dez) dias corridos, a contar da data da intimação.', fonte: 'lc252' },
              { numero: '3º', texto: 'A Comissão encaminhará o parecer, bem como a defesa, quando houver, à Presidência da CMM, o qual designará comissão específica composta por 03 (três) servidores indicados pelo titular da Procuradoria Geral da Câmara Municipal de Macaé - CMM, que deverá emitir parecer sobre o caso.', fonte: 'lc252' },
              { numero: '4º', texto: 'De posse dos documentos mencionados no parágrafo anterior, o Presidente da CMM decidirá sobre a exoneração ou manutenção do servidor.', fonte: 'lc252' },
              { numero: '5º', texto: 'Da decisão proferida pelo Presidente da CMM caberá recurso em âmbito Administrativo.', fonte: 'lc252' },
              { numero: '6º', texto: 'Os servidores indicados no § 3º deste artigo deverão necessariamente ser efetivo de carreira da Câmara Municipal de Macaé e não estejam exercendo cargo comissionado.', fonte: 'lc284', alterado: true }
            ]
          }
        ]
      },
      {
        id: 'sec2-6',
        titulo: 'Da Evolução Funcional',
        artigos: [
          {
            numero: 35,
            texto: 'A Evolução Funcional nos cargos ocorrerá mediante as seguintes formas:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'Progressão Funcional;', fonte: 'lc252' },
              { numero: 'II', texto: 'Promoção (Anexo X).', fonte: 'lc252' }
            ]
          },
          {
            numero: 36,
            texto: 'Os processos de Evolução Funcional ocorrerão em intervalos regulares de 2 (dois) anos para Progressão Funcional e de 5 (cinco) anos para Promoção, cabendo ao servidor protocolar requerimento administrativo junto à Comissão de Desenvolvimento Funcional, responsável por verificar o cumprimento do interstício e dos requisitos previstos em lei e providenciar, se atendidos, a publicação do ato de concessão, com efeitos financeiros retroativos à data do requerimento, se deferido.',
            fonte: 'lc355',
            alterado: true,
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'A habilitação dependerá da pontuação recebida na Avaliação Periódica de Desempenho, disponibilidade financeira e existência de vaga no caso da promoção.', fonte: 'lc252' },
              { numero: '2º', texto: 'Em caso de empate será contemplado o servidor que, sucessivamente: I – estiver há mais tempo sem ter obtido uma Progressão Horizontal; II – tiver obtido a maior nota na Avaliação de Desempenho mais recente; III – tiver maior tempo de efetivo exercício no cargo; IV – tiver maior número de dias efetivamente trabalhados na Câmara Municipal de Macaé.', fonte: 'lc252' },
              { numero: '3º', texto: 'Na ausência de avaliação periódica de desempenho por motivo não imputável ao servidor, esta será considerada realizada com o percentual máximo estabelecido.', fonte: 'lc355', alterado: true },
              { numero: '4º', texto: 'Para a concessão de qualquer evolução funcional, é necessária a aprovação do servidor em estágio probatório, o qual será contado como interstício para a sua primeira progressão funcional, sem que dela decorra concessão automática antes da conclusão do referido estágio.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: 37,
            texto: 'O servidor do quadro efetivo que ocupe ou venha a ocupar função gratificada ou cargo em comissão, fará jus à progressão e/ou promoção na forma estabelecida para o cargo efetivo em que ocupa.',
            fonte: 'lc252'
          }
        ]
      },
      {
        id: 'sec2-7',
        titulo: 'Progressão Funcional',
        artigos: [
          {
            numero: 38,
            texto: 'A Progressão Funcional é horizontal, e é a passagem do servidor de seu padrão de vencimento para outro superior, dentro da faixa de vencimentos do cargo que ocupa, pelo critério de merecimento, observado o interstício de 2 (dois) anos de efetivo exercício, vinculada a disponibilidade financeira e orçamentária.',
            fonte: 'lc284',
            alterado: true,
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'O exercício de cargo em comissão e de mandato classista não interromperá a contagem de interstício aquisitivo.', fonte: 'lc252' },
              { numero: '2º', texto: 'O servidor terá direito à Progressão, desde que satisfaça os seguintes requisitos:', fonte: 'lc252' }
            ],
            incisos: [
              { numero: 'I', texto: 'for servidor estável no serviço público após o cumprimento do estágio probatório, nos termos do art. 41, §4º da Constituição Federal;', fonte: 'lc252' },
              { numero: 'II', texto: 'ter cumprido o interstício de 2 (dois) anos de efetivo exercício;', fonte: 'lc284', alterado: true },
              { numero: 'III', texto: 'não ter mais de cinco faltas injustificadas;', fonte: 'lc252' },
              { numero: 'IV', texto: 'não ter licença não remunerada ou licença para tratamento de saúde superior a 6 (seis) meses consecutivos ou não;', fonte: 'lc252' },
              { numero: 'V', texto: 'não ter faltas, justificadas por atestados médicos, superior a 90 (noventa) dias;', fonte: 'lc252' },
              { numero: 'VI', texto: 'não ter sofrido pena de advertência, suspensão, destituição de cargo em comissão ou de função de confiança mediante processo administrativo disciplinar;', fonte: 'lc252' },
              { numero: 'VII', texto: 'obtiver, no mínimo, a média de 70% (setenta por cento) do total dos pontos das avaliações periódicas de desempenho realizadas no período.', fonte: 'lc252' }
            ]
          },
          {
            numero: 39,
            texto: 'O servidor que tiver concluído curso de ensino médio, graduação, pós-graduação, mestrado ou doutorado, desde que atendidos os requisitos elencados no § 2º do art. 38 desta Lei Complementar, e havendo disponibilidade financeira, será contemplado na progressão, da seguinte forma:',
            fonte: 'lc252',
            incisos: [
              { numero: 'I', texto: 'para 2 (dois) padrões de vencimento imediatamente superiores àquele a que pertence, quando o curso médio concluído;', fonte: 'lc252' },
              { numero: 'II', texto: 'para 4 (quatro) padrões de vencimento imediatamente superiores àquele a que pertence, quando o curso de graduação concluído;', fonte: 'lc252' },
              { numero: 'III', texto: 'para 6 (seis) padrões de vencimento imediatamente superiores àquele a que pertence, quando o curso de pós-graduação concluído lato sensu, com duração mínima de 360h;', fonte: 'lc252' },
              { numero: 'IV', texto: 'para 8 (oito) padrões de vencimento imediatamente superiores àquele a que pertence, quando o curso de pós-graduação concluído for Mestrado;', fonte: 'lc252' },
              { numero: 'V', texto: 'para 10 (dez) padrões de vencimento imediatamente superiores àquele a que pertence, quando o curso de pós-graduação concluído for Doutorado.', fonte: 'lc252' }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Os cursos de graduação e pós-graduação referidos nos incisos I, II, III e IV, concluídos pelos servidores e apresentados à Comissão de Desenvolvimento Funcional para obtenção do benefício previsto no caput, não poderão ser computados cumulativamente para a concessão das progressões.', fonte: 'lc252' },
              { numero: '2º', texto: 'Os cursos de graduação e pós-graduação relacionados nos incisos I, II, III e IV deste artigo só serão considerados para concessão de progressão quando relacionados com o cargo ocupado pelo servidor.', fonte: 'lc252' },
              { numero: '3º', texto: 'Caso a relação entre o cargo ocupado pelo servidor e o curso por ele concluído não seja clara, a Comissão de Desenvolvimento Funcional solicitará informações ao servidor e à chefia imediata que justifiquem sua aceitação.', fonte: 'lc252' },
              { numero: '4º', texto: 'Não será concedida progressão com base no presente artigo quando o curso constituir requisito para ingresso no cargo.', fonte: 'lc252' },
              { numero: '5º', texto: 'O servidor que concluir curso que lhe conceda maior avanço na progressão poderá requerer a substituição do título apresentado fazendo jus à diferença entre o benefício pleiteado e o já contemplado.', fonte: 'lc252' },
              { numero: '6º', texto: 'Sendo o servidor contemplado com o benefício deste artigo e ultrapassando a quantidade máxima de padrões de vencimento a avançar na carreira, será enquadrado no último padrão de vencimento da classe a que pertence.', fonte: 'lc252' },
              { numero: '7º', texto: 'A comprovação da conclusão dos cursos de graduação e pós-graduação se dará mediante a apresentação do respectivo diploma ou certificado emitido pela instituição de ensino, devidamente reconhecido pelo MEC.', fonte: 'lc252' }
            ]
          }
        ]
      },
      {
        id: 'sec2-8',
        titulo: 'Promoção',
        artigos: [
          {
            numero: 40,
            texto: 'A Promoção é vertical, e é a passagem do servidor para a classe imediatamente superior àquela a que pertence, dentro da mesma carreira, observadas as normas estabelecidas nesta Lei Complementar e em regulamento específico.',
            fonte: 'lc284',
            alterado: true,
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'Os servidores da Câmara Municipal de Macaé, promovidos ocuparão o padrão de vencimento inicial correspondente à faixa de vencimento da nova classe.', fonte: 'lc284' }
            ]
          },
          {
            numero: 41,
            texto: 'Poderão concorrer à promoção os servidores ativos desde que preenchidas, cumulativamente, as seguintes condições:',
            fonte: 'lc252',
            destaque: true,
            incisos: [
              { numero: 'I', texto: 'não ter mais de cinco faltas injustificadas;', fonte: 'lc252' },
              { numero: 'II', texto: 'não ter licença não remunerada ou licença para tratamento de saúde superior a 6 (seis) meses consecutivos ou não;', fonte: 'lc252' },
              { numero: 'III', texto: '(Revogado)', fonte: 'lc294', revogado: true },
              { numero: 'IV', texto: 'não ter sofrido pena de advertência, suspensão, destituição de cargo em comissão ou de função de confiança mediante processo administrativo;', fonte: 'lc252' },
              { numero: 'V', texto: 'obter, no mínimo, média de 70% (setenta por cento) do total dos pontos das últimas avaliações periódicas de desempenho realizadas no período;', fonte: 'lc252' },
              { numero: 'VI', texto: 'estar no exercício de seu cargo;', fonte: 'lc252' },
              { numero: 'VII', texto: 'cumprir o interstício de 5 (cinco) anos de efetivo exercício;', fonte: 'lc284', alterado: true },
              { numero: 'VIII', texto: 'Ter vaga disponível na classe a ser ocupada, e disponibilidade financeira e orçamentária.', fonte: 'lc284', acrescido: true }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Considera-se em exercício, para os efeitos de benefício, o tempo de serviço com as exclusões previstas no Estatuto dos Servidores.', fonte: 'lc284', alterado: true },
              { numero: '2º', texto: 'O exercício de cargo em comissão e de mandato classista não interromperá a contagem de interstício aquisitivo.', fonte: 'lc252' },
              { numero: '3º', texto: 'A promoção do servidor dependerá sempre da existência de vaga, bem como de disponibilidade financeira e orçamentária.', fonte: 'lc252' }
            ]
          },
          {
            numero: 42,
            texto: 'O servidor poderá passar para o nível de vencimento seguinte antes de atingido o último padrão de uma classe, desde que observados os critérios estabelecidos nesta Lei Complementar.',
            fonte: 'lc252'
          }
        ]
      }
    ]
  },
  {
    id: 'cap3',
    numero: 'III',
    titulo: 'Do Enquadramento',
    secoes: [
      {
        id: 'sec3-1',
        titulo: 'Do Enquadramento',
        artigos: [
          {
            numero: 43,
            texto: 'A partir da vigência desta Lei Complementar, os servidores serão enquadrados no padrão e nível correspondente ao valor do atual vencimento básico, respeitados os respectivos Grupos Ocupacionais constantes no Anexo III desta Lei Complementar.',
            fonte: 'lc252'
          },
          {
            numero: 44,
            texto: 'A aplicação das disposições desta Lei Complementar não poderá implicar redução do vencimento básico, de proventos ou de pensões.',
            fonte: 'lc252',
            paragrafos: [
              { numero: 'único', texto: 'Não sendo possível realizar o enquadramento do servidor nos moldes do art.43 o mesmo será enquadrado no padrão e nível de vencimento com valor superior mais próximo do atual.', fonte: 'lc284', alterado: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cap4',
    numero: 'IV',
    titulo: 'Disposições Finais',
    secoes: [
      {
        id: 'sec4-1',
        titulo: 'Disposições Finais',
        artigos: [
          {
            numero: 45,
            texto: 'Aplicam-se às aposentadorias concedidas aos servidores integrantes das carreiras abrangidas por esta Lei Complementar e às pensões, no que couber, o disposto nesta Lei Complementar em relação aos servidores que se encontram em atividade.',
            fonte: 'lc252'
          },
          {
            numero: 46,
            texto: 'A Mesa Diretora da Câmara Municipal de Macaé regulamentará, por ato próprio e no que couber, o disposto nesta Lei Complementar.',
            fonte: 'lc252'
          },
          {
            numero: 47,
            texto: 'As despesas resultantes da execução desta Lei Complementar correrão de acordo com as dotações orçamentárias próprias, possibilitando efetivamente a aplicabilidade da progressão e promoção dos servidores que atenderem os requisitos estabelecidos nesta Lei.',
            fonte: 'lc252'
          },
          {
            numero: 48,
            texto: 'Caberá a Comissão de Desenvolvimento Funcional após entrar em vigor a presente Lei Complementar, realizar a avaliação de desempenho dos servidores que já contam com tempo para serem beneficiados com progressão ou promoção.',
            fonte: 'lc284',
            alterado: true
          },
          {
            numero: 49,
            texto: 'Os cargos em Comissão e Funções Gratificadas da Câmara Municipal de Macaé são os constantes na Legislação própria.',
            fonte: 'lc284',
            alterado: true
          },
          {
            numero: 50,
            texto: 'Ficam extintos do quadro permanente da Câmara Municipal de Macaé os cargos de Agente de Pintura, Agente de Manutenção de Instalações Hidráulicas e Técnico Legislativo.',
            fonte: 'lc284',
            alterado: true
          },
          {
            numero: 51,
            texto: 'A estrutura consolidada de vagas do quadro permanente da Câmara Municipal de Macaé é a constante no Anexo I e Anexo I-A desta Lei Complementar (cargos e vagas), extinguindo-se quaisquer vagas excedentes criadas em legislação pretérita.',
            fonte: 'lc284',
            alterado: true
          },
          {
            numero: 52,
            texto: 'Esta Lei Complementar entrará em vigor a partir da data de sua publicação, revogadas as disposições legais em contrário.',
            fonte: 'lc252'
          }
        ]
      }
    ]
  },
  // ============================================
  // LEI COMPLEMENTAR Nº 355/2025
  // ============================================
  {
    id: 'lc355',
    numero: 'LC 355',
    titulo: 'Lei Complementar nº 355/2025 - Altera a LC 252/2016',
    secoes: [
      {
        id: 'lc355-sec1',
        titulo: 'Alterações nas Definições e Estrutura (Arts. 1º a 5º)',
        artigos: [
          {
            numero: '1º (LC 355)',
            texto: 'O art. 2º da Lei Complementar nº 252/2016 passa a vigorar com as seguintes alterações:',
            fonte: 'lc355',
            incisos: [
              { numero: 'IV', texto: 'Classes são os níveis hierárquicos dentro de um cargo, que refletem as possibilidades de avanço funcional do servidor, de acordo com o desenvolvimento de sua carreira no cargo ocupado;', fonte: 'lc355', alterado: true },
              { numero: 'V', texto: 'Carreira refere-se à trajetória de crescimento do servidor dentro do conjunto de classes de um cargo, com base em critérios previamente definidos;', fonte: 'lc355', alterado: true },
              { numero: 'XIII', texto: 'Progressão é a movimentação do servidor público efetivo de um padrão de vencimento para um subsequente, dentro da mesma classe ou faixa de vencimentos do cargo que ocupa, atendidos os requisitos legais;', fonte: 'lc355', acrescido: true },
              { numero: 'XIV', texto: 'Promoção é o ato administrativo que resulta na ascensão do servidor público efetivo a uma classe superior, dentro do mesmo cargo e da mesma carreira, atendidos os requisitos legais;', fonte: 'lc355', acrescido: true },
              { numero: 'XV', texto: 'Enquadramento é o ato de classificação ou reclassificação do servidor público efetivo dentro de sua carreira, com base em critérios legais, podendo envolver alterações na faixa de vencimentos e nas classes do cargo, conforme estabelecido em lei.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '2º (LC 355)',
            texto: 'O parágrafo único do art. 3º da Lei Complementar nº 252/2016 passa a vigorar com a seguinte alteração:',
            fonte: 'lc355',
            paragrafos: [
              { numero: 'único', texto: 'Os cargos, com as respectivas denominações e quantitativos, são os constantes dos Anexos I, I-A, VIII e XI desta Lei Complementar.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: '3º (LC 355)',
            texto: 'O art. 4º da Lei Complementar nº 252/2016 passa a vigorar com as seguintes alterações:',
            fonte: 'lc355',
            incisos: [
              { numero: 'III', texto: 'Grupo Ocupacional Médio I;', fonte: 'lc355', alterado: true },
              { numero: 'IV', texto: 'Grupo Ocupacional Médio II;', fonte: 'lc355', acrescido: true },
              { numero: 'V', texto: 'Grupo Ocupacional Superior.', fonte: 'lc355', alterado: true }
            ],
            paragrafos: [
              { numero: '4º', texto: 'Integram o Grupo Ocupacional Médio I os cargos efetivos em que um dos requisitos de investidura seja a conclusão do ensino médio, conforme atribuição própria especificada no Anexo VI.', fonte: 'lc355', alterado: true },
              { numero: '4º-A', texto: 'Integram o Grupo Ocupacional Médio II os cargos efetivos em que um dos requisitos de investidura seja a conclusão do ensino médio, acrescido de formação técnica específica, conforme atribuição própria especificada no Anexo VI-A.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '4º (LC 355)',
            texto: 'O art. 5º da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação:',
            fonte: 'lc355',
            paragrafos: [
              { numero: 'caput', texto: 'Os cargos do Quadro Suplementar, constantes nos Anexos I-A, VIII e XI desta Lei Complementar, deverão ser extintos na sua vacância.', fonte: 'lc355', alterado: true },
              { numero: '3º', texto: 'O Anexo XI será atualizado pela Diretoria de Recursos Humanos, que publicará sua versão consolidada para dele fazer constar apenas os cargos remanescentes, ainda não extintos na forma do caput.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '5º (LC 355)',
            texto: 'O art. 12 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação: "Lei específica deverá promover a revisão geral anual dos vencimentos dos servidores públicos abrangidos por esta Lei Complementar, sempre na mesma data e sem distinção de índices, realizada nas seguintes datas:"',
            fonte: 'lc355',
            incisos: [
              { numero: 'I', texto: 'Abril do ano de 2026;', fonte: 'lc355', alterado: true },
              { numero: 'II', texto: 'Março do ano de 2027;', fonte: 'lc355', alterado: true },
              { numero: 'III', texto: 'Sempre no mês de fevereiro, a partir do ano de 2028.', fonte: 'lc355', alterado: true }
            ],
            paragrafos: [
              { numero: 'único', texto: 'O percentual de revisão geral deverá utilizar como parâmetros os índices inflacionários do período e o limite de despesas com pessoal previsto no artigo 169 da Constituição Federal de 1988.', fonte: 'lc355', alterado: true }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec2',
        titulo: 'Carga Horária e Serviço Extraordinário (Arts. 6º a 7º)',
        artigos: [
          {
            numero: '6º (LC 355)',
            texto: 'O art. 14 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação: "A carga horária inerente a cada cargo é aquela definida nos Anexos I, I-A e VIII desta Lei Complementar."',
            fonte: 'lc355',
            paragrafos: [
              { numero: '1º', texto: 'O serviço extraordinário será preferencialmente compensado por meio de banco de horas, na forma de regulamento, e, excepcionalmente, indenizado em pecúnia.', fonte: 'lc355', alterado: true },
              { numero: '2º', texto: 'Na hipótese de conversão em pecúnia prevista no § 1º, as horas extraordinárias realizadas em dias úteis serão remuneradas com acréscimo de 50% (cinquenta por cento) sobre o valor da hora normal, e aquelas prestadas aos sábados, domingos ou feriados, quando o trabalho não integrar a escala regular do servidor, com acréscimo de 100% (cem por cento).', fonte: 'lc355', alterado: true },
              { numero: '3º', texto: 'O pagamento de horas extraordinárias condiciona-se à autorização prévia da autoridade competente, mediante solicitação fundamentada da chefia imediata, e será calculado com base no registro de ponto que comprove a efetiva prestação do serviço.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: '7º (LC 355)',
            texto: 'Fica acrescido o art. 14-A à Lei Complementar nº 252/2016: "A Administração poderá convocar servidores efetivos da Câmara Municipal de Macaé para a prestação de serviço extraordinário, em caráter excepcional e por período estritamente necessário, mediante necessidade de serviço devidamente fundamentada."',
            fonte: 'lc355',
            acrescido: true,
            paragrafos: [
              { numero: '1º', texto: 'O serviço extraordinário de que trata o caput será, a critério da Administração, remunerado por meio de horas extraordinárias ou compensado em banco de horas, na forma do regulamento.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'Na hipótese de convocação de servidores submetidos a regime de escala, a Administração deverá, preferencialmente, convocar aqueles que não tenham cumprido plantão no dia anterior nem estejam escalados para o dia seguinte.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec3',
        titulo: 'Mérito, Avaliação de Desempenho e Comissão (Arts. 8º a 15)',
        artigos: [
          {
            numero: '8º (LC 355)',
            texto: 'O art. 18 da Lei Complementar nº 252/2016 passa a vigorar com as seguintes alterações (Gratificação de Mérito):',
            fonte: 'lc355',
            incisos: [
              { numero: 'II', texto: 'Obter média mínima de 80% (oitenta por cento) nas avaliações de desempenho a que se submeter, posteriores à entrada em vigor desta Lei Complementar;', fonte: 'lc355', alterado: true },
              { numero: 'III', texto: '(Revogado).', fonte: 'lc355', revogado: true }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Para fins de contagem do tempo de serviço a que se refere o caput, não serão computados os períodos de licença para tratar de interesse particular, de licença por motivo de afastamento de cônjuge ou companheiro, nem quaisquer outros afastamentos não remunerados definidos em regulamentação específica.', fonte: 'lc355', alterado: true },
              { numero: '2º', texto: 'O prazo previsto no caput será contado a partir da data de entrada em exercício do servidor no cargo efetivo da Câmara Municipal.', fonte: 'lc355', alterado: true },
              { numero: '3º', texto: 'A vantagem pecuniária prevista no caput considera-se fixa e de caráter permanente, na forma do § 6º do art. 38 da Lei Complementar nº 011/1998.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '9º (LC 355)',
            texto: 'O inciso II do art. 20 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte alteração:',
            fonte: 'lc355',
            incisos: [
              { numero: 'II', texto: 'Avaliação Periódica de Desempenho, realizada semestralmente, com o objetivo de subsidiar a Evolução Funcional e a gestão de pessoal.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: '10 (LC 355)',
            texto: 'O art. 23 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação: "A Comissão de Desenvolvimento Funcional será constituída por 7 (sete) membros, designados pelo Presidente da Câmara Municipal de Macaé, à qual compete, dentre outras atribuições, proceder à avaliação periódica de desempenho, conforme o disposto nesta Lei Complementar e em regulamentação específica."',
            fonte: 'lc355',
            paragrafos: [
              { numero: 'único', texto: 'Da Comissão deverá fazer parte: I - o Diretor Geral da Câmara Municipal, como Presidente desta Comissão; II - 1 (um) representante da Procuradoria Geral da Câmara Municipal; III - 1 (um) representante da Diretoria de Recursos Humanos da Câmara Municipal; IV - 1 (um) representante da Diretoria de Contabilidade da Câmara Municipal; V - 3 (três) servidores efetivos, representantes, que serão eleitos.', fonte: 'lc355', alterado: true }
            ]
          },
          {
            numero: '11 (LC 355)',
            texto: 'O art. 24 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação: "A eleição dos membros representantes dos servidores para composição da Comissão de Desenvolvimento Funcional ocorrerá a cada 2 (dois) anos, preferencialmente no mês de julho, cabendo à Diretoria de Recursos Humanos da Câmara Municipal a organização e realização do processo eleitoral."',
            fonte: 'lc355',
            paragrafos: [
              { numero: '1º', texto: 'O resultado da eleição será encaminhado ao Diretor-Geral Administrativo-Financeiro da Câmara Municipal, por meio de lista com os 5 (cinco) candidatos mais votados, cabendo ao Presidente da Câmara designar 3 (três) deles para integrar a Comissão, com início do mandato no mês subsequente.', fonte: 'lc355', alterado: true },
              { numero: '2º', texto: 'Na hipótese de haver menos de 3 (três) candidatos na lista de eleitos, caberá ao Presidente da Câmara designar os representantes restantes dentre os servidores efetivos da Casa.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'Em caso de impedimento ou vacância no decorrer do mandato, será realizada a substituição do membro, cabendo ao Presidente da Câmara designar o novo representante dentre os remanescentes da lista de que trata o § 1º deste artigo.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'No caso de impossibilidade de substituição do membro pelo critério previsto no parágrafo anterior, caberá ao Presidente da Câmara a escolha de novo representante dentre os servidores efetivos da Casa.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'Na hipótese de não realização da eleição no prazo previsto no caput, os representantes em exercício permanecerão, em caráter excepcional e provisório, no desempenho de suas funções, considerando-se válidos e eficazes os atos praticados nesse período.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '12 (LC 355)',
            texto: 'O art. 27 da Lei Complementar nº 252/2016 passa a vigorar com as seguintes alterações:',
            fonte: 'lc355',
            incisos: [
              { numero: 'VIII', texto: 'Providenciar os atos que concedem a progressão ou a promoção;', fonte: 'lc355', alterado: true }
            ],
            paragrafos: [
              { numero: '2º', texto: 'A Comissão deverá comunicar ao servidor o deferimento total ou parcial, ou o indeferimento, do pedido de reconsideração.', fonte: 'lc355', alterado: true },
              { numero: '4º', texto: 'Fica vedado, no âmbito administrativo, a interposição de recurso para rediscutir matéria já apreciada em grau recursal, nos processos de indeferimento parcial ou de pedido de reconsideração.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '13 (LC 355)',
            texto: 'O art. 30 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação: "A Avaliação Periódica de Desempenho será realizada pela chefia imediata do servidor, referente a cada semestre avaliado, por meio do preenchimento de formulário próprio."',
            fonte: 'lc355',
            paragrafos: [
              { numero: '1º', texto: 'O Formulário de Avaliação Funcional será preenchido, preferencialmente, entre os dias 1º e 30 de junho, para o primeiro semestre, e entre os dias 1º e 30 de dezembro, para o segundo semestre.', fonte: 'lc355', alterado: true },
              { numero: '2º', texto: 'Quando a avaliação for realizada por meio digital, o servidor terá o prazo de 30 (trinta) dias corridos, contados do encerramento do período avaliativo, para registrar ciência do resultado no Sistema.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'O servidor poderá apresentar recurso fundamentado à Presidência da Câmara Municipal de Macaé, por meio de protocolo, no prazo de 10 (dez) dias corridos, contado da ciência do resultado, caso considere injusta a nota atribuída.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'A ciência do resultado considerar-se-á tacitamente realizada caso o servidor, no prazo previsto no § 2º deste artigo, não efetue o registro de ciência expressa no sistema, hipótese na qual o prazo recursal previsto no § 3º terá início automaticamente no primeiro dia útil subsequente ao término do prazo assinalado para manifestação expressa.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'Decorrido o prazo recursal de que trata o § 3º sem manifestação do servidor, operar-se-á a preclusão do seu direito de recorrer, não sendo admitida a reabertura do prazo ou a reconsideração da avaliação.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '14 (LC 355)',
            texto: 'O art. 31 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte redação (Deveres dos Avaliadores):',
            fonte: 'lc355',
            incisos: [
              { numero: 'I', texto: 'Atribuir ao servidor um conceito para cada fator, de forma motivada e compatível com o desempenho demonstrado no respectivo semestre em avaliação;', fonte: 'lc355', alterado: true },
              { numero: 'II', texto: 'Avaliar cada servidor com objetividade, limitando-se à observação e à análise de seu desempenho durante o semestre avaliado, a fim de eliminar a influência de efeitos emocionais e opiniões pessoais;', fonte: 'lc355', alterado: true },
              { numero: 'III', texto: 'Dar ciência ao servidor acerca do resultado da avaliação, quando esta não for realizada em meio digital.', fonte: 'lc355', alterado: true }
            ],
            paragrafos: [
              { numero: '1º', texto: 'Na ausência de sistema de avaliação digital, os avaliadores encaminharão os formulários, devidamente preenchidos e assinados pela chefia imediata e pelo servidor, ao Presidente da Comissão de Desenvolvimento Funcional.', fonte: 'lc355', alterado: true },
              { numero: '2º', texto: 'Em caso de recusa do servidor em apor a assinatura, a chefia certificará a ocorrência no próprio formulário, preferencialmente em seu verso, e colherá, sempre que possível, a assinatura de duas testemunhas, para fins de comprovação da ciência.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'Havendo interposição de recurso, a Comissão de Desenvolvimento Funcional remeterá os autos da avaliação à Presidência da Câmara Municipal, a quem competirá a designação de uma comissão específica para análise e emissão de parecer.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'A comissão específica de que trata o § 3º será composta por 3 (três) servidores efetivos, não ocupantes de cargo em comissão, e que não sejam membros da Comissão de Desenvolvimento Funcional.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'De posse do recurso e do parecer da comissão específica, o Presidente da Câmara Municipal proferirá a decisão final sobre a avaliação, que será irrecorrível na esfera administrativa.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '15 (LC 355)',
            texto: 'O caput do art. 33 da Lei Complementar nº 252/2016 passa a vigorar com a seguinte alteração: "A Avaliação Especial de Desempenho do servidor será calculada com base na média das notas atribuídas nas Avaliações Periódicas de Desempenho durante o período do Estágio Probatório, sendo necessária uma nota mínima de 70 (setenta) pontos para aprovação."',
            fonte: 'lc355'
          }
        ]
      },
      {
        id: 'lc355-sec4',
        titulo: 'Evolução Funcional - Progressão e Promoção (Art. 16)',
        artigos: [
          {
            numero: '16 (LC 355)',
            texto: 'O art. 36 da Lei Complementar nº 252/2016 passa a vigorar com as seguintes alterações: "Os processos de Evolução Funcional ocorrerão em intervalos regulares de 2 (dois) anos para Progressão Funcional e de 5 (cinco) anos para Promoção, cabendo ao servidor protocolar requerimento administrativo junto à Comissão de Desenvolvimento Funcional, responsável por verificar o cumprimento do interstício e dos requisitos previstos em lei e providenciar, se atendidos, a publicação do ato de concessão, com efeitos financeiros retroativos à data do requerimento, se deferido."',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: '3º', texto: 'Na ausência de avaliação periódica de desempenho por motivo não imputável ao servidor, esta será considerada realizada com o percentual máximo estabelecido.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'Para a concessão de qualquer evolução funcional, é necessária a aprovação do servidor em estágio probatório, o qual será contado como interstício para a sua primeira progressão funcional, sem que dela decorra concessão automática antes da conclusão do referido estágio.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec5',
        titulo: 'Taquígrafo Legislativo e Agente de Vigilância (Arts. 17 e 18)',
        artigos: [
          {
            numero: '17 (LC 355)',
            texto: 'O item II - Principais Atribuições, do cargo de Taquígrafo Legislativo, constante do Anexo VI da Lei Complementar nº 252/2016 fica acrescido da seguinte atribuição: "Redigir as atas das sessões plenárias - ordinárias, extraordinárias e solenes -, bem como das audiências públicas de iniciativa do Poder Legislativo ou do Poder Executivo, nos termos da legislação aplicável e das determinações da Mesa Diretora; Desempenhar outras atividades afins."',
            fonte: 'lc355',
            acrescido: true
          },
          {
            numero: '18 (LC 355)',
            texto: 'O cargo efetivo de Agente de Vigilância possui carga horária semanal de 40 (quarenta) horas, cumprida ordinariamente em regime especial de escala de 24 (vinte e quatro) horas de trabalho por 72 (setenta e duas) de descanso, apurando-se a jornada com base no equilíbrio médio mensal.',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'Os servidores submetidos ao regime de escala padrão de 24 (vinte e quatro) por 72 (setenta e duas) horas perceberão gratificação de plantão equivalente a 20% (vinte por cento) do vencimento-base do padrão em que estiverem posicionados, destinada a compensar a carga horária que excede a jornada semanal de referência de 40 (quarenta) horas.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'No regime de jornada previsto no § 1º, não será devido pagamento de horas extraordinárias pelo excesso decorrente da própria escala regular, porquanto já abrangido pela gratificação de plantão, admitindo-se remuneração ou compensação apenas quando houver convocação para serviço extraordinário, nos termos da legislação vigente.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'Excepcionalmente, mediante opção formal do servidor e havendo conveniência para a Administração, poderá ser autorizada a adoção da escala de 24 (vinte e quatro) horas de trabalho por 96 (noventa e seis) de descanso, observada a equivalência com a jornada semanal de 40 (quarenta) horas.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'A opção formal de que trata o § 3º, bem como eventual solicitação de retorno ao regime de jornada padrão, observarão o modelo constante do Anexo III desta Lei Complementar.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'O regime de escala previsto neste artigo possui natureza autocompensatória, motivo pelo qual os feriados, coincidindo ou não com dias de plantão, não geram redução de carga horária nem pagamento adicional, pois a compensação correspondente já está abrangida nos períodos de descanso previstos na própria estrutura do regime de revezamento.', fonte: 'lc355', acrescido: true },
              { numero: '6º', texto: 'Para fins de cálculo da jornada e das vantagens previstas neste artigo, não serão consideradas eventuais reduções de carga horária decorrentes de feriados, devendo ser observada a média mensal correspondente à jornada semanal de 40 (quarenta) horas.', fonte: 'lc355', acrescido: true },
              { numero: '7º', texto: 'Para fins de controle de frequência e apuração remuneratória, a carga horária mensal de referência dos servidores submetidos ao regime de escala corresponderá à média mensal equivalente à jornada semanal de 40 (quarenta) horas, conforme parâmetros adotados pelo sistema de folha de pagamento da Câmara Municipal.', fonte: 'lc355', acrescido: true },
              { numero: '8º', texto: 'O servidor no exercício de função gratificada ou designado para cargo em comissão cumprirá expediente diário, de segunda a sexta-feira, sendo admitida, excepcionalmente, sua inclusão em regime de escala, quando o interesse público, devidamente fundamentado, assim o exigir.', fonte: 'lc355', acrescido: true },
              { numero: '9º', texto: 'A modalidade de cumprimento da jornada poderá ser alterada a qualquer tempo, por interesse público devidamente fundamentado, por motivo de saúde do servidor ou, no caso da escala excepcional, mediante revogação da opção pelo próprio servidor, sempre observada a conveniência administrativa.', fonte: 'lc355', acrescido: true },
              { numero: '10', texto: 'As disposições deste artigo poderão ser estendidas, mediante ato da Presidência da Câmara Municipal, a outros cargos efetivos cuja jornada semanal seja de 40 (quarenta) horas e cujas atribuições sejam compatíveis com o regime de escala.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec6',
        titulo: 'Reajuste de Vencimentos e Novos Valores (Arts. 19 a 24)',
        artigos: [
          {
            numero: '19 (LC 355)',
            texto: 'O vencimento-base inicial do cargo de Consultor Jurídico da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 7.030,13 (sete mil e trinta reais e treze centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos do cargo de Consultor Jurídico serão recalculados, observando-se os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '19-A (LC 355)',
            texto: 'O vencimento-base inicial do cargo de Jornalista da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 7.823,62 (sete mil, oitocentos e vinte e três reais e sessenta e dois centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos do cargo de Jornalista serão recalculados, observando-se os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '20 (LC 355)',
            texto: 'O vencimento-base inicial dos cargos de Técnico em Contabilidade e Técnico em Informática da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 5.744,75 (cinco mil, setecentos e quarenta e quatro reais e setenta e cinco centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos dos cargos de Técnico em Contabilidade e Técnico em Informática serão recalculados, observados os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '21 (LC 355)',
            texto: 'O vencimento-base inicial dos cargos de Operador de Multimídia e de Taquígrafo Legislativo da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 5.523,80 (cinco mil, quinhentos e vinte e três reais e oitenta centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos dos cargos de Operador de Multimídia e de Taquígrafo Legislativo serão recalculados, observados os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '22 (LC 355)',
            texto: 'O vencimento-base inicial dos cargos de Fotógrafo e de Assistente Administrativo da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 4.922,43 (quatro mil, novecentos e vinte e dois reais e quarenta e três centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos dos cargos de Fotógrafo e de Assistente Administrativo serão recalculados, observados os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '23 (LC 355)',
            texto: 'O vencimento-base inicial dos cargos de Auxiliar Administrativo e Assistente de Arquivo da Câmara Municipal de Macaé, correspondente ao Padrão A da Classe I do Anexo III da Lei Complementar nº 252/2016, fica fixado em R$ 4.148,99 (quatro mil, cento e quarenta e oito reais e noventa e nove centavos).',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: 'único', texto: 'A partir do valor estabelecido no caput, os demais padrões e classes da Tabela de Vencimentos dos cargos de Auxiliar Administrativo e Assistente de Arquivo serão recalculados, observando-se os percentuais de acréscimo entre os padrões e classes atualmente existentes na tabela de vencimentos constante do Anexo III da Lei Complementar nº 252/2016.', fonte: 'lc355' }
            ]
          },
          {
            numero: '24 (LC 355)',
            texto: 'A carga horária do cargo efetivo de Consultor Jurídico da Câmara Municipal de Macaé é de 20 (vinte) horas semanais.',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'Fica facultado ao servidor ocupante do cargo de que trata o caput optar, mediante requerimento formal e em caráter irretratável, pela alteração da carga horária para 30 (trinta) horas semanais.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'Na hipótese de ser exercitado o direito de opção previsto no § 1º, o vencimento-base do cargo será ajustado proporcionalmente à nova carga horária, mantendo-se os demais direitos e vantagens previstos na legislação aplicável.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'O requerimento de opção deverá ser protocolizado no prazo improrrogável de 30 (trinta) dias corridos, contado da publicação desta Lei Complementar, e observará o modelo constante do Anexo II, produzindo efeitos a partir do ato do Presidente da Câmara Municipal que o autorizar.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'Compete à Diretoria de Recursos Humanos, no prazo de 30 (trinta) dias corridos a contar da publicação desta Lei Complementar, atualizar e publicar a Tabela de Vencimentos para o cargo de Consultor Jurídico, de modo a fazer constar, de forma distinta, os valores de vencimento-base para a carga horária padrão de 20 (vinte) horas e para a carga horária opcional de 30 (trinta) horas semanais.', fonte: 'lc355', acrescido: true }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec7',
        titulo: 'Nova Classe de Promoção e Grupos Ocupacionais (Arts. 25 a 28)',
        artigos: [
          {
            numero: '25 (LC 355)',
            texto: 'Fica criada, para todos os cargos efetivos, uma nova classe de promoção, cujo padrão inicial corresponderá a um acréscimo de oito por cento sobre o valor do último padrão da classe que a antecede, e os padrões subsequentes, em igual número, serão calculados mantendo-se a mesma variação percentual existente entre os padrões das demais classes da carreira, constantes do Anexo III da Lei Complementar nº 252/2016.',
            fonte: 'lc355',
            destaque: true,
            paragrafos: [
              { numero: '1º', texto: 'A nova classe terá número de vagas idêntico ao da classe imediatamente anterior, devendo os Anexos I, I-A e VIII da Lei Complementar nº 252/2016 ser atualizados para refletir o quantitativo correspondente.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'A Comissão de Desenvolvimento Funcional procederá, mediante requerimento do interessado, ao reenquadramento do servidor na nova classe, o que se dará por meio da publicação de ato administrativo competente, após a análise da documentação comprobatória do cumprimento dos requisitos previstos na Lei Complementar nº 252/2016.', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'O reenquadramento de que trata o § 2º poderá ser requerido, de imediato, pelos servidores que, na data de publicação desta Lei Complementar, já tenham cumprido os requisitos legais para a evolução funcional, ficando assegurado aos demais o direito ao reenquadramento à medida que vierem a cumprir tais requisitos.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'Os efeitos financeiros decorrentes do reenquadramento serão devidos exclusivamente a partir da data do requerimento do interessado, observado o disposto na Lei Complementar nº 252/2016, inclusive para os servidores que já tenham implementado os requisitos na data de publicação desta Lei Complementar.', fonte: 'lc355', acrescido: true },
              { numero: '5º', texto: 'Ficam alterados os Anexos I, I-A, III, IV, V, VI, VII, VIII e X da Lei Complementar nº 252/2016 para refletir a criação da nova classe de promoção instituída por este artigo, com as correspondentes alterações relativas ao desenvolvimento funcional dos respectivos cargos.', fonte: 'lc355', acrescido: true },
              { numero: '6º', texto: 'Compete à Diretoria de Recursos Humanos, no prazo de 30 (trinta) dias corridos a contar da publicação desta Lei Complementar, atualizar e publicar a Tabela de Vencimentos (Anexo III), para refletir os reajustes de vencimento-base e a inclusão da nova classe de promoção de que trata esta Lei Complementar.', fonte: 'lc355', acrescido: true },
              { numero: '7º', texto: 'No mesmo prazo, deverão ser atualizados e publicados, de forma consolidada, os Anexos I, I-A, IV, V, VI, VII, VIII e X da Lei Complementar nº 252/2016, com as modificações promovidas por esta Lei Complementar.', fonte: 'lc355', acrescido: true },
              { numero: '8º', texto: 'Os anexos referidos nos §§ 6º e 7º passam a vigorar em conformidade com as disposições deste artigo.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '26 (LC 355)',
            texto: 'O atual Grupo Ocupacional "Médio" da Lei Complementar nº 252/2016 passa a denominar-se "Médio I", permanecendo nele os cargos que exigem, como requisito de investidura, a conclusão do ensino médio completo.',
            fonte: 'lc355'
          },
          {
            numero: '27 (LC 355)',
            texto: 'Fica criado o Grupo Ocupacional "Médio II" na Lei Complementar nº 252/2016, destinado aos cargos de nível médio com exigência expressa de formação técnica específica, ficando realocados para esse novo grupo os cargos de Técnico em Contabilidade e Técnico em Informática, bem como seus respectivos ocupantes na data de publicação desta Lei Complementar.',
            fonte: 'lc355',
            acrescido: true,
            paragrafos: [
              { numero: '1º', texto: 'Em decorrência da criação do Grupo Ocupacional "Médio II", ficam alterados os Anexos I, II, III e VI da Lei Complementar nº 252/2016, para refletir a realocação dos cargos de Técnico em Contabilidade e Técnico em Informática.', fonte: 'lc355', acrescido: true },
              { numero: '2º', texto: 'Fica criado, na Lei Complementar nº 252/2016, o Anexo VI-A, com a denominação de "Atribuições dos Cargos do Grupo Ocupacional por Nível de Escolaridade - Nível Médio II".', fonte: 'lc355', acrescido: true },
              { numero: '3º', texto: 'A realocação dos cargos de Técnico em Contabilidade e Técnico em Informática para o Grupo Ocupacional "Médio II" não implica alteração das respectivas atribuições nem dos requisitos de investidura fixados em lei, que permanecem inalterados.', fonte: 'lc355', acrescido: true },
              { numero: '4º', texto: 'Compete à Diretoria de Recursos Humanos, no prazo de 30 (trinta) dias, a contar da publicação desta Lei Complementar, publicar a versão consolidada dos Anexos I, II, III, VI e X, devidamente atualizados, bem como o novo Anexo VI-A.', fonte: 'lc355', acrescido: true }
            ]
          },
          {
            numero: '28 (LC 355)',
            texto: 'O vencimento-base dos cargos efetivos pertencentes aos Grupos Ocupacionais de Nível Fundamental I e II, Nível Médio I e Nível Superior, constantes do Anexo III da Lei Complementar nº 252/2016, fica reajustado nos seguintes percentuais:',
            fonte: 'lc355',
            destaque: true,
            incisos: [
              { numero: 'I', texto: 'Grupo Ocupacional de Nível Fundamental I: seis por cento;', fonte: 'lc355' },
              { numero: 'II', texto: 'Grupo Ocupacional de Nível Fundamental II: cinco por cento;', fonte: 'lc355' },
              { numero: 'III', texto: 'Grupo Ocupacional de Nível Médio I: quatro por cento;', fonte: 'lc355' },
              { numero: 'IV', texto: 'Grupo Ocupacional de Nível Superior: três por cento.', fonte: 'lc355' }
            ],
            paragrafos: [
              { numero: 'único', texto: 'O reajuste previsto neste artigo não se aplica aos cargos cujo vencimento-base tenha sido expressamente fixado por esta Lei Complementar.', fonte: 'lc355' }
            ]
          }
        ]
      },
      {
        id: 'lc355-sec8',
        titulo: 'Disposições Finais e Transitórias (Arts. 29 a 35)',
        artigos: [
          {
            numero: '29 (LC 355)',
            texto: 'Os servidores integrantes dos quadros da Câmara Municipal de Macaé, quando designados para o exercício de cargo em comissão ou de função gratificada, bem como os servidores públicos de outros entes federativos cedidos a esta Casa Legislativa quando designados para o exercício de cargo em comissão, farão jus, além do vencimento do cargo efetivo, à retribuição correspondente à função ou ao cargo em comissão, observada a legislação vigente.',
            fonte: 'lc355'
          },
          {
            numero: '30 (LC 355)',
            texto: 'Os servidores que possuam avaliações funcionais realizadas em períodos anteriores à publicação desta Lei Complementar, e que ainda se encontrem pendentes de ciência no sistema eletrônico de avaliação, deverão, no prazo de 30 (trinta) dias, contado da data da publicação desta Lei Complementar, registrar ciência do resultado no sistema e, se assim desejarem, apresentar recurso fundamentado, nos termos e prazos previstos no art. 30 da Lei Complementar nº 252/2016, sob pena de preclusão.',
            fonte: 'lc355'
          },
          {
            numero: '31 (LC 355)',
            texto: 'O Anexo I-A da Lei Complementar nº 252/2016 fica atualizado em decorrência da alteração promovida no Anexo VIII da mesma Lei pela Lei Complementar nº 343/2024.',
            fonte: 'lc355',
            paragrafos: [
              { numero: 'único', texto: 'Compete à Diretoria de Recursos Humanos publicar a versão consolidada do referido Anexo, no prazo de 30 (trinta) dias, a contar da publicação desta Lei Complementar, para fins de transparência e publicidade dos atos administrativos.', fonte: 'lc355' }
            ]
          },
          {
            numero: '32 (LC 355)',
            texto: 'O Anexo IX da Lei Complementar nº 252/2016 passa a vigorar com a redação constante do Anexo I desta Lei Complementar (Formulário de Avaliação de Desempenho).',
            fonte: 'lc355'
          },
          {
            numero: '33 (LC 355)',
            texto: 'Ficam revogados os seguintes dispositivos da Lei Complementar nº 252/2016:',
            fonte: 'lc355',
            incisos: [
              { numero: 'I', texto: 'O art. 15;', fonte: 'lc355', revogado: true },
              { numero: 'II', texto: 'O inciso III do art. 18;', fonte: 'lc355', revogado: true },
              { numero: 'III', texto: 'O § 2º do art. 23;', fonte: 'lc355', revogado: true },
              { numero: 'IV', texto: 'O parágrafo único do art. 32.', fonte: 'lc355', revogado: true }
            ]
          },
          {
            numero: '34 (LC 355)',
            texto: 'As despesas decorrentes da aplicação desta Lei Complementar correrão por conta das dotações orçamentárias da Câmara Municipal, ficando autorizada a abertura de créditos adicionais, se necessário.',
            fonte: 'lc355'
          },
          {
            numero: '35 (LC 355)',
            texto: 'Esta Lei Complementar entra em vigor na data de sua publicação, revogadas as disposições em contrário. Câmara Municipal de Macaé, 28 de outubro de 2025. ALAN MANSUR PEREIRA - PRESIDENTE.',
            fonte: 'lc355'
          }
        ]
      }
    ]
  }
];

export default capitulos;
