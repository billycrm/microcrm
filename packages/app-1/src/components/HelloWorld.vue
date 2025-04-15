<template>
  <div class="container">
    <div class="row">
      <div class="card">
        <div v-if="isLoading" class="loading-container">
          <div class="spinner"></div>
        </div>
        <div v-else>
          <div v-if="memberships.length">
            <div class="card-title">
              <h2>Membership Information</h2>
            </div>
            <div class="card-content">
              <table class="data-table">
                <thead>
                <tr>
                  <th v-for="header in headers" :key="header.key">{{ header.title }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in memberships" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.membership_type }}</td>
                  <td>{{ new Date(item.start_date).toLocaleDateString() }}</td>
                  <td>{{ new Date(item.end_date).toLocaleDateString() }}</td>
                  <td>{{ item.active ? 'Yes' : 'No' }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else>
            <div class="card-title">
              <h2>Create Membership</h2>
            </div>
            <div class="card-content">
              <form @submit.prevent="createMembership" class="form">
                <div class="form-group">
                  <label for="membership-type">Membership Type</label>
                  <select
                      id="membership-type"
                      v-model="membership_type"
                      required
                      class="form-control"
                  >
                    <option value="" disabled>Select membership type</option>
                    <option v-for="type in membershipTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="start-date">Start Date</label>
                  <input
                      id="start-date"
                      v-model="start_date"
                      type="date"
                      required
                      class="form-control"
                  />
                </div>

                <div class="form-group">
                  <label for="end-date">End Date</label>
                  <input
                      id="end-date"
                      v-model="end_date"
                      type="date"
                      required
                      class="form-control"
                  />
                </div>

                <button type="submit" class="btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Membership',
  data() {
    return {
      isLoading: true,
      membership_type: '',
      start_date: '',
      end_date: '',
      membershipTypes: ['monthly', 'annually'],
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'Membership Type', key: 'membership_type' },
        { title: 'Start Date', key: 'start_date' },
        { title: 'End Date', key: 'end_date' },
        { title: 'Active', key: 'active' }
      ],
      // Мок данных API для тестирования
      mockMemberships: [
        {
          id: 1,
          membership_type: 'monthly',
          start_date: '2023-01-01',
          end_date: '2023-02-01',
          active: true
        },
        {
          id: 2,
          membership_type: 'annually',
          start_date: '2023-02-15',
          end_date: '2024-02-15',
          active: true
        }
      ]
    };
  },
  computed: {
    memberships() {
      // Для тестирования используем моковые данные вместо store
      return this.mockMemberships;
    }
  },
  watch: {
    memberships() {
      console.log('Memberships updated');
      this.isLoading = false;
    }
  },
  created() {
    // Имитация аутентификации и загрузки данных
    setTimeout(() => {
      this.isLoading = false;

      // В реальном приложении здесь бы был запрос к store
      // this.$store.dispatch('getMemberships');
    }, 1000);
  },
  methods: {
    async createMembership() {
      this.isLoading = true;

      // Имитация API запроса
      setTimeout(() => {
        // Создаем новое членство
        const newMembership = {
          id: this.mockMemberships.length + 1,
          membership_type: this.membership_type,
          start_date: this.start_date,
          end_date: this.end_date,
          active: true
        };

        // Добавляем в моковую базу данных
        this.mockMemberships.push(newMembership);

        // Сбрасываем форму
        this.membership_type = '';
        this.start_date = '';
        this.end_date = '';

        this.isLoading = false;

        alert('Membership created successfully!');
      }, 1000);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.row {
  width: 100%;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
}

.card-title {
  text-align: center;
  margin-bottom: 20px;
}

.card-title h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th, .data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>