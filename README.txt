# André & Leandro — página digital

## Estrutura

- `index.html` — estrutura da página
- `style.css` — visual, tipografia e responsividade
- `script.js` — contador, música, rolagem e interações
- `assets/imagem01.jpg` até `assets/imagem08.jpg` — fotos
- `assets/eu-te-amo-sem-culpa.mp3` — música local

## Como usar

1. Coloque 8 fotos na pasta `assets/` usando exatamente:
   - imagem01.jpg
   - imagem02.jpg
   - imagem03.jpg
   - imagem04.jpg
   - imagem05.jpg
   - imagem06.jpg
   - imagem07.jpg
   - imagem08.jpg

2. Coloque o arquivo de áudio que você possui/licenciou para uso na página como:
   `assets/eu-te-amo-sem-culpa.mp3`

3. Abra `index.html` no navegador.

## Importante sobre a música

A página já está preparada para tocar a faixa localmente, mas o arquivo da música não é incluído no pacote. Use uma cópia que você tenha direito de utilizar. Além disso, navegadores costumam bloquear reprodução automática; por isso existe o botão "Tocar nossa música".

## Alterar a data

A data está configurada em `script.js` como:
13 de setembro de 2026 às 20:00, horário de Brasília.

Se a data for de outro ano, altere somente:
`const relationshipStart = new Date("2026-09-13T20:00:00-03:00");`
