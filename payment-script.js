document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const proceedBtn = document.getElementById('proceedBtn');
    const modal = document.getElementById('paymentModal');
    const loadingText = document.getElementById('loadingText');
    const loadingSubtext = document.getElementById('loadingSubtext');
    const progressFill = document.getElementById('progressFill');
    const errorMessage = document.getElementById('errorMessage');
    const paymentLoader = document.querySelector('.payment-loader');
    const errorTimestamp = document.getElementById('errorTimestamp');
    
    let selectedMethod = null;
    let paymentTimeout = null;
    let progressInterval = null;
    let stepInterval = null;
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove selection from all methods
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Add selection to clicked method
            this.classList.add('selected');
            selectedMethod = this.dataset.method;
            
            // Enable proceed button
            proceedBtn.disabled = false;
        });
    });
    
    // Proceed to payment
    proceedBtn.addEventListener('click', function() {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }
        
        startPaymentProcess();
    });
    
    function startPaymentProcess() {
        // Show modal
        modal.classList.add('show');
        
        // Reset states
        paymentLoader.style.display = 'block';
        errorMessage.classList.add('hidden');
        progressFill.style.width = '0%';
        
        // Set initial loading text
        loadingText.textContent = 'Initializing payment gateway...';
        loadingSubtext.textContent = 'Please wait while we establish a secure connection';
        
        // Start progress animation
        animateProgress();
        
        // Start step animation
        animateSteps();
        
        // Set timeout for fake network error (10-15 seconds)
        const errorDelay = Math.random() * 5000 + 10000; // 10-15 seconds
        paymentTimeout = setTimeout(showNetworkError, errorDelay);
    }
    
    function animateProgress() {
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += Math.random() * 2;
            if (progress > 95) progress = 95; // Don't complete
            
            progressFill.style.width = progress + '%';
            
            // Update loading text based on progress
            if (progress > 20 && progress <= 40) {
                loadingText.textContent = 'Connecting to payment gateway...';
                loadingSubtext.textContent = 'Establishing secure SSL connection';
            } else if (progress > 40 && progress <= 60) {
                loadingText.textContent = 'Verifying payment details...';
                loadingSubtext.textContent = 'Please wait while we validate your information';
            } else if (progress > 60 && progress <= 80) {
                loadingText.textContent = 'Processing transaction...';
                loadingSubtext.textContent = 'Your payment is being processed securely';
            } else if (progress > 80) {
                loadingText.textContent = 'Finalizing payment...';
                loadingSubtext.textContent = 'Almost done, please wait a moment';
            }
        }, 200);
    }
    
    function animateSteps() {
        const steps = document.querySelectorAll('.step');
        let currentStep = 0;
        
        stepInterval = setInterval(() => {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                if (currentStep > 0) {
                    steps[currentStep - 1].classList.remove('active');
                    steps[currentStep - 1].classList.add('completed');
                }
                currentStep++;
            }
        }, 3000);
    }
    
    function showNetworkError() {
        // Clear intervals
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(paymentTimeout);
        
        // Hide loading, show error
        paymentLoader.style.display = 'none';
        errorMessage.classList.remove('hidden');
        
        // Set error timestamp
        const now = new Date();
        errorTimestamp.textContent = now.toLocaleString();
    }
    
    // Retry payment function
    window.retryPayment = function() {
        // Reset and start again
        paymentLoader.style.display = 'block';
        errorMessage.classList.add('hidden');
        
        // Reset steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === 0) step.classList.add('active');
        });
        
        startPaymentProcess();
    };
    
    // Cancel payment function
    window.cancelPayment = function() {
        modal.classList.remove('show');
        
        // Clear any running intervals/timeouts
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(paymentTimeout);
        
        // Reset selection
        paymentMethods.forEach(m => m.classList.remove('selected'));
        selectedMethod = null;
        proceedBtn.disabled = true;
    };
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            window.cancelPayment();
        }
    });
    
    // Add some random loading messages for variety
    const loadingMessages = [
        {
            title: 'Connecting to secure server...',
            subtitle: 'Establishing encrypted connection'
        },
        {
            title: 'Authenticating payment gateway...',
            subtitle: 'Verifying merchant credentials'
        },
        {
            title: 'Processing payment request...',
            subtitle: 'Your transaction is being processed'
        },
        {
            title: 'Validating payment information...',
            subtitle: 'Checking payment details for security'
        },
        {
            title: 'Finalizing transaction...',
            subtitle: 'Almost complete, please wait'
        }
    ];
    
    function getRandomLoadingMessage() {
        return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    }
    
    // Simulate network fluctuations
    function simulateNetworkFluctuations() {
        if (progressInterval) {
            const randomMessage = getRandomLoadingMessage();
            loadingText.textContent = randomMessage.title;
            loadingSubtext.textContent = randomMessage.subtitle;
        }
    }
    
    // Add some visual effects
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.payment-method');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                card.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });
});
