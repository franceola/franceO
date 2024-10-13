require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const Stripe = require('stripe') ('sk_test_51Q1J3SFLMaimoIutPpbkXSeajW4dwxWQd8WzkBD0dCfYvI5N2HCXIEnyVXDGDtKiwhj9aDQc6b8wPyNHUi1bxnKg00TujKUpMH');
const bodyParser = require('body-parser');
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: 'Squirrel in the Sunlight',
            },
            unit_amount: 1500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'embedded',
    return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
  });

  res.send({clientSecret: session.client_secret});
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));



// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Nodemailer route to send verification email
app.post('/send-email', (req, res) => {
    const { email, verificationCode } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'france1ola@gmail.com', // Remplacez par votre adresse email Gmail
            pass: 'hpkl dcwg wokn dnqw', // Remplacez par votre mot de passe Gmail ou app password si l'authentification 2FA est activée
        }
    });

    const mailOptions = {
        from: 'france1ola@gmail.com',
        to: email,
        subject: 'Code de vérification',
        text: `Votre code de vérification est : ${verificationCode}`
    };

     // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
});



app.post('/payment-success', (req, res) => {
    const { paymentIntentId } = req.body;

    // Normally, you would verify the PaymentIntent, but for simplicity:
    res.json({
        success: true,
        downloadLinks: {
            "Herens Cow": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Herens%20Cow.tif?...",
            "Blue tit on a branch": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Blue%20tit%20on%20a%20branch.tif?...",
            "Butterfly": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Butterfly.tif?...",
            "Crested tit on branch": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Crested%20tit%20on%20branch.tif?...",
            "Emerald Coil": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Emerald%20Coil.tif?...",
            "Golden Daisies": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Golden%20Daisies.tif?...",
            "Ladybug’s Journey": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Ladybug%27s%20Journey.tif?...",
            "Squirrel in the Sunlight": "https://photosola.s3.eu-central-1.amazonaws.com/photoola/Squirrel%20in%20the%20Sunlight.tif?...",
        }
    });
});

