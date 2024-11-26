
// index.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do body-parser para ler dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota GET para renderizar o formulário
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Formulário de Contato</title>
        </head>
        <body>
            <h1>Formulário de Contato</h1>
            <form action="/send-email" method="POST">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>
                <br><br>
                <label for="message">Mensagem:</label>
                <textarea id="message" name="message" rows="4" cols="50" required></textarea>
                <br><br>
                <button type="submit">Enviar E-mail</button>
            </form>
        </body>
        </html>
    `);
});

// Rota POST para lidar com o envio do e-mail
app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    // Configuração do nodemailer (substitua com suas próprias credenciais de e-mail)
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'multijardim2022@gmail.com', // Seu e-mail aqui
            pass: 'Multi50202580.' // Sua senha aqui (use variáveis de ambiente em produção)
        }
    });

    // Configurações do e-mail a ser enviado
    let mailOptions = {
        from: 'multijardim2022@gmail.com',
        to: email,
        subject: 'Mensagem do Formulário de Contato',
        text: message
    };

    try {
        // Envio do e-mail
        let info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
        res.send('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Houve um erro ao enviar o e-mail. Por favor, tente novamente.');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});