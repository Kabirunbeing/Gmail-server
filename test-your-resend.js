const { Resend } = require('resend');

const resend = new Resend('re_bqARbCzv_2eDUXnJ8XUepkJ7wZciBpJts');

async function testYourCode() {
    try {
        console.log('🧪 Testing your Resend code...');
        
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'kab6168@gmail.com',
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });
        
        console.log('✅ Email sent successfully!');
        console.log('📧 Result:', result);
        console.log('🎯 Check your inbox: kab6168@gmail.com');
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        console.log('📋 Full error:', error);
    }
}

testYourCode();
