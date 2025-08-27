const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Testing Gmail SMTP Configuration...');
console.log('📧 Sender Email:', process.env.SENDER_EMAIL);
console.log('🔐 Password Length:', process.env.SENDER_PASSWORD?.length);
console.log('📬 Receiver Email:', process.env.RECEIVER_EMAIL);

async function testEmail() {
    try {
        console.log('\n1️⃣ Creating Gmail transporter...');
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD
            },
            debug: true, // Enable debug output
            logger: true // Log to console
        });

        console.log('2️⃣ Verifying transporter...');
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully!');

        console.log('3️⃣ Sending test email...');
        const info = await transporter.sendMail({
            from: `"Gmailify Test" <${process.env.SENDER_EMAIL}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: '🧪 Email Test from Gmailify',
            text: 'This is a test email to verify email delivery is working.',
            html: '<h1>✅ Email Test Successful!</h1><p>If you received this, email delivery is working properly.</p>'
        });

        console.log('✅ Email sent successfully!');
        console.log('📧 Message ID:', info.messageId);
        console.log('📬 Response:', info.response);

    } catch (error) {
        console.log('❌ Email test failed!');
        console.log('🔥 Error details:');
        console.log('   Code:', error.code);
        console.log('   Message:', error.message);
        console.log('   Command:', error.command);
        
        if (error.code === 'EAUTH') {
            console.log('\n🔧 AUTHENTICATION ISSUE - Possible solutions:');
            console.log('   1. Check if 2-factor authentication is enabled');
            console.log('   2. Generate a new App Password');
            console.log('   3. Make sure "Less secure app access" is disabled (use App Password instead)');
        }
        
        if (error.code === 'ECONNECTION') {
            console.log('\n🔧 CONNECTION ISSUE - Possible solutions:');
            console.log('   1. Check your internet connection');
            console.log('   2. Check firewall settings');
            console.log('   3. Try different SMTP settings');
        }
    }
}

testEmail();
