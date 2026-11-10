const DEMO_USERNAME = '220408027@st.biruni.edu.tr';
const DEMO_PASSWORD = 'demo123456';
export function login(username, password) {
  return new Promise((resolve, reject) => window.setTimeout(() => username === DEMO_USERNAME && password === DEMO_PASSWORD ? resolve({ username }) : reject(new Error('Invalid credentials')), 500));
}
