export const TestData = {
  randomUsername: () => `QA${Date.now().toString().slice(-6)}`,
  password: 'Test@12345',
  invalidPassword: 'wrongPassword123',
  checkout: {
    name: 'John Doe',
    country: 'Germany',
    city: 'Berlin',
    card: '4111111111111111',
    month: '12',
    year: '2026',
  },
}
