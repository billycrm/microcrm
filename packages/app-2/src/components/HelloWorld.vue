<template>
  <div class="gym-application">
    <!-- Application Form -->
    <div v-if="!submitted" class="application-form">
      <h1>Gym Membership Application</h1>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="fullName">Full Name *</label>
          <input
              id="fullName"
              v-model="fullName"
              type="text"
              required
              :class="{ 'error': errors.fullName }"
          >
          <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email Address *</label>
          <input
              id="email"
              v-model="email"
              type="email"
              required
              :class="{ 'error': errors.email }"
          >
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input
              id="phone"
              v-model="phone"
              type="tel"
              required
              :class="{ 'error': errors.phone }"
          >
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>

        <div class="form-group">
          <label>Membership Type *</label>
          <div class="radio-group">
            <div class="radio-option">
              <input
                  id="monthly"
                  v-model="membershipType"
                  type="radio"
                  value="monthly"
                  required
              >
              <label for="monthly">Monthly ($49.99/month)</label>
            </div>
            <div class="radio-option">
              <input
                  id="quarterly"
                  v-model="membershipType"
                  type="radio"
                  value="quarterly"
              >
              <label for="quarterly">Quarterly ($129.99/3 months)</label>
            </div>
            <div class="radio-option">
              <input
                  id="annual"
                  v-model="membershipType"
                  type="radio"
                  value="annual"
              >
              <label for="annual">Annual ($499.99/year)</label>
            </div>
          </div>
          <span v-if="errors.membershipType" class="error-message">{{ errors.membershipType }}</span>
        </div>

        <div class="form-group">
          <div class="checkbox-option">
            <input
                id="terms"
                v-model="agreeTerms"
                type="checkbox"
                required
                :class="{ 'error': errors.agreeTerms }"
            >
            <label for="terms">I agree to the gym's terms and conditions *</label>
          </div>
          <span v-if="errors.agreeTerms" class="error-message">{{ errors.agreeTerms }}</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button">Submit Application</button>
        </div>
      </form>
    </div>

    <!-- Success Page -->
    <div v-else class="success-page">
      <div class="success-icon">✓</div>
      <h1>Application Submitted Successfully!</h1>
      <p>
        Thank you for applying for a membership at our gym. We have received your application and
        our team will process it shortly. You will receive a confirmation email at {{ email }}
        with further instructions.
      </p>
      <p class="membership-id">
        Your membership ID: <strong>{{ membershipId }}</strong>
      </p>
      <button class="reset-button" @click="resetForm">Submit Another Application</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GymMembershipApplication',
  data() {
    return {
      // Form fields
      fullName: '',
      email: '',
      phone: '',
      membershipType: '',
      agreeTerms: false,

      // Form state
      submitted: false,
      membershipId: '',
      errors: {
        fullName: '',
        email: '',
        phone: '',
        membershipType: '',
        agreeTerms: ''
      }
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.clearErrors();

      // Validate full name
      if (!this.fullName.trim()) {
        this.errors.fullName = 'Full name is required';
        isValid = false;
      } else if (this.fullName.trim().length < 3) {
        this.errors.fullName = 'Full name must be at least 3 characters';
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }

      // Validate phone
      const phoneRegex = /^[0-9+-\s()]{10,15}$/;
      if (!this.phone.trim()) {
        this.errors.phone = 'Phone number is required';
        isValid = false;
      } else if (!phoneRegex.test(this.phone)) {
        this.errors.phone = 'Please enter a valid phone number';
        isValid = false;
      }

      // Validate membership type
      if (!this.membershipType) {
        this.errors.membershipType = 'Please select a membership type';
        isValid = false;
      }

      // Validate terms agreement
      if (!this.agreeTerms) {
        this.errors.agreeTerms = 'You must agree to the terms and conditions';
        isValid = false;
      }

      return isValid;
    },

    clearErrors() {
      this.errors = {
        fullName: '',
        email: '',
        phone: '',
        membershipType: '',
        agreeTerms: ''
      };
    },

    submitForm() {
      if (this.validateForm()) {
        // In a real application, you would send this data to your backend
        console.log('Submitting form data:', {
          fullName: this.fullName,
          email: this.email,
          phone: this.phone,
          membershipType: this.membershipType
        });

        // Generate a random membership ID
        this.membershipId = 'GYM-' + Math.floor(100000 + Math.random() * 900000);

        // Set submitted to true to show success page
        this.submitted = true;
      }
    },

    resetForm() {
      this.fullName = '';
      this.email = '';
      this.phone = '';
      this.membershipType = '';
      this.agreeTerms = false;
      this.submitted = false;
      this.clearErrors();
    }
  }
};
</script>

<style scoped>
.gym-application {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.radio-group {
  margin-top: 5px;
}

.radio-option,
.checkbox-option {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.radio-option input,
.checkbox-option input {
  margin-right: 10px;
}

.error {
  border-color: #ff5252;
}

.error-message {
  color: #ff5252;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.form-actions {
  margin-top: 30px;
  text-align: center;
}

.submit-button,
.reset-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
}

.submit-button:hover,
.reset-button:hover {
  background-color: #45a049;
}

/* Success Page Styles */
.success-page {
  text-align: center;
  padding: 30px;
}

.success-icon {
  font-size: 60px;
  color: #4caf50;
  background-color: #e8f5e9;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  line-height: 100px;
  margin: 0 auto 30px;
}

.membership-id {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
  font-size: 18px;
}

.reset-button {
  margin-top: 20px;
}
</style>