/**
 * Arquivo de ambiente para configurações específicas de desenvolvimento.
 * 
 * Neste arquivo, você pode definir variáveis de ambiente para o ambiente de desenvolvimento local.
 */

export const environment = {
    /**
     * Define se o aplicativo está em modo de produção.
     * 
     * Altere para true quando estiver em produção para otimizar o aplicativo.
     */
    production: false,
  
    /**
     * URL da API para conexão com o backend local.
     * 
     * Certifique-se de alterar para a URL correta do seu backend local.
     * Exemplo: 'http://localhost:3000/api'
     */
    apiUrl: 'http://localhost:3000/api',
};