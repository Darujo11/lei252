// Dados das leis originais com links para os PDFs
// Os arquivos PDF devem estar na pasta: public/pdfs/

export const leisOriginais = {
  lc252: {
    id: 'lc252',
    nome: 'LC 252/2016',
    nomeCompleto: 'Lei Complementar nº 252/2016',
    cor: 'lei-252',
    arquivo: 'https://transparencia.cmmacae.rj.gov.br/arquivos/2557/LEI%20COMPLEMENTAR_252_2016_0000001.pdf',
    desc: 'Lei original - Estruturação do PCCV',
    data: '30/03/2016',
    ementa: 'Dispõe sobre a estruturação do Plano de Cargos, Carreiras e Vencimentos dos Servidores da Câmara Municipal de Macaé.'
  },
  lc284: {
    id: 'lc284',
    nome: 'LC 284/2019',
    nomeCompleto: 'Lei Complementar nº 284/2019',
    cor: 'lei-284',
    arquivo: 'https://sapl.macae.rj.leg.br/media/sapl/public/normajuridica/2019/1897/lc_284-2019_pesquisavel.pdf',
    desc: 'Alterações 2019 - Comissão, Função Gratificada, Mérito',
    data: '2019',
    ementa: 'Altera a LC 252/2016 - Comissão 7 membros, Função Gratificada, Mérito 15/20 anos.'
  },
  lc294: {
    id: 'lc294',
    nome: 'LC 294/2020',
    nomeCompleto: 'Lei Complementar nº 294/2020',
    cor: 'lei-294',
    arquivo: 'https://sapl.macae.rj.leg.br/media/sapl/public/normajuridica/2020/147/lei_complementar_294_de_2020.pdf',
    desc: 'Institui o Triênio (5% a cada 3 anos)',
    data: '2020',
    ementa: 'Institui o adicional por tempo de serviço (triênio) de 5% a cada 3 anos, limite 55%.'
  },
  lc341: {
    id: 'lc341',
    nome: 'LC 341/2024',
    nomeCompleto: 'Lei Complementar nº 341/2024',
    cor: 'lei-341',
    arquivo: 'https://sapl.macae.rj.leg.br/media/sapl/public/normajuridica/2024/6540/lei_complementar_no_341_2024.pdf',
    desc: 'Revoga o Art. 17 (GAL)',
    data: '2024',
    ementa: 'Revoga o art. 17 da Lei Complementar Municipal nº 252/2016 (Gratificação por Atividade Legislativa).'
  },
  lc343: {
    id: 'lc343',
    nome: 'LC 343/2024',
    nomeCompleto: 'Lei Complementar nº 343/2024',
    cor: 'lei-343',
    arquivo: 'https://sapl.macae.rj.leg.br/media/sapl/public/normajuridica/2024/6686/autografo_plc_nol-005-2024lc343.pdf',
    desc: 'Cargos em extinção',
    data: '01/07/2024',
    ementa: 'Dispõe sobre o acréscimo de cargos públicos no quadro de extinção.'
  },
  lc355: {
    id: 'lc355',
    nome: 'LC 355/2025',
    nomeCompleto: 'Lei Complementar nº 355/2025',
    cor: 'lei-355',
    arquivo: 'https://sapl.macae.rj.leg.br/media/sapl/public/normajuridica/2025/7400/lei_complementar_no_355_2025.pdf',
    desc: 'Última alteração - Grupos ocupacionais, avaliação',
    data: '2025',
    ementa: 'Altera a LC 252/2016 - Novos grupos ocupacionais, definições, avaliação de desempenho.'
  },
};

export const getLeiInfo = (leiId) => leisOriginais[leiId] || null;

export const leisOrdemCronologica = [
  leisOriginais.lc252,
  leisOriginais.lc284,
  leisOriginais.lc294,
  leisOriginais.lc341,
  leisOriginais.lc343,
  leisOriginais.lc355,
];
