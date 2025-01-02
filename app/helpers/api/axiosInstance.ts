import axios from 'axios';

// Créez une instance Axios avec une configuration par défaut
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Remplacez avec l'URL de votre API
  timeout: 10000, // Le délai d'attente (10 secondes)
  headers: {
    'Content-Type': 'application/json',
    // Vous pouvez ajouter d'autres en-têtes comme Authorization, etc.
    // 'Authorization': `Bearer ${token}`
  },
});

// Intercepteur pour gérer les erreurs globalement
axiosInstance.interceptors.response.use(
  (response) => response, // Retourner la réponse si tout va bien
  (error) => {
    // Traiter les erreurs globalement
    if (error.response) {
      // Si l'API répond avec une erreur (code HTTP différent de 2xx)
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Si la requête a été envoyée mais qu'il n'y a pas de réponse
      return Promise.reject('Aucune réponse de l\'API');
    } else {
      // Autres erreurs (erreurs de configuration, etc.)
      return Promise.reject(error.message);
    }
  }
);

export default axiosInstance;