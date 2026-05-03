import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, imageBase64 } = req.body;

    await resend.emails.send({
        from: 'mydatapatch@srividyasuryanarayan.com', // replace with your verified Resend sender email
        to: email,
        subject: 'Your data patch',
        html: '<p>Here is your personalised image from the survey!</p>',
        attachments: [
            {
                filename: 'your-result.png',
                content: imageBase64,
                encoding: 'base64',
            },
        ],
    });

    res.status(200).json({ success: true });
}