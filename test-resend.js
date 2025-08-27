const { Resend } = require('resend');
require('dotenv').config();

console.log('🧪 Testing Resend API...');
console.log('🔑 API Key:', process.env.RESEND_API_KEY ? 'Configured ✅' : 'Missing ❌');

async function testResendAPI() {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        console.log('📧 Sending test email via Resend...');
        
        const data = await resend.emails.send({
            from: 'Gmailify <onboarding@resend.dev>',
            to: ['nocturnallad4@gmail.com'],
            subject: '🎉 Resend API Test - Gmailify Working!',
            html: `
                <h1>✅ Success! Resend API is Working</h1>
                <p>Your Gmailify app can now send emails through Railway!</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Status:</strong> Railway deployment ready 🚀</p>
            `
        });
        
        console.log('✅ Email sent successfully!');
        console.log('📧 Message ID:', data.id);
        console.log('🎯 Check your inbox: nocturnallad4@gmail.com');
        
    } catch (error) {
        console.log('❌ Resend API failed:', error.message);
        console.log('🔧 Check your API key:', process.env.RESEND_API_KEY);
    }
}

testResendAPI();
