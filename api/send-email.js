const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify 'https://cross-admin-43785089.figma.site'
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, imageBase64 } = req.body;

        await resend.emails.send({
            from: 'mydatapatch@srividyasuryanarayan.com',
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
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
}
