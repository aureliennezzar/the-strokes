const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
/**
* Here we're using Gmail to send 
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.ponctual@gmail.com',
        pass: 't2)G96f<Rw%C5,Ky2'
    }
});

function sendEmailTrigger(email) {

    const mailOptions = {
        from: 'Lab201 (The Strokes) <noreply.ponctual@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: email,
        subject: 'Vous êtes bien inscrit à la newsletter de The Strokes (non-officiel)', // email subject
        html: `Hello ! Tu vas bientôt recevoir des actualités inédites à propos de ton groupe favori !
        Are you ready ? Rock it !
        ( <button>Se désabonner</button> )`
    }
    // 6. Process the sending of this email via nodemailer
    return transporter.sendMail(mailOptions)
        .then(() => {
            console.log('Email sent ! ')
        })
        .catch(e => {
            console.log('Error sending email!')
        });
};


exports.sendMail = functions.firestore
    .document('tempoSendEmail/{tempoId}')
    .onCreate((snap, context) => {
        const email = snap.data().email
        return sendEmailTrigger(email);
    });