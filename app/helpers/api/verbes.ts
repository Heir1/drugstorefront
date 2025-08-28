// app/helpers/api/verbes.ts
import axiosInstance from './axiosInstance';

// Type pour les erreurs possibles de l'API
export interface ApiErrorResponse {
    
    message: string;
    statusCode: number;
}

// Fonction GET
export const getRequest = async <T>(url: string): Promise<{ data?: T; error?: ApiErrorResponse }> => {
  try {
    const response = await axiosInstance.get<T>(url);
    return { data: response.data }; // Retourner les données de la réponse
  } catch (error) {
    return { error: error as ApiErrorResponse }; // En cas d'erreur, retourner l'erreur
  }
};

// Fonction POST
export const postRequest = async <T>(url: string, data: T): Promise<{ data?: T; error?: ApiErrorResponse }> => {
  try {
    const response = await axiosInstance.post<T>(url, data);
    return { data: response.data }; // Retourner les données de la réponse
  } catch (error) {
    return { error: error as ApiErrorResponse }; // En cas d'erreur, retourner l'erreur
  }
};

// Fonction PUT
export const putRequest = async <T>(url: string, data: T): Promise<{ data?: T; error?: ApiErrorResponse }> => {
  try {
    const response = await axiosInstance.put<T>(url, data);
    return { data: response.data }; // Retourner les données de la réponse
  } catch (error) {
    return { error: error as ApiErrorResponse }; // En cas d'erreur, retourner l'erreur
  }
};

// Fonction DELETE
export const deleteRequest = async (url: string): Promise<{ data?: any; error?: ApiErrorResponse }> => {
  try {
    const response = await axiosInstance.delete(url);
    return { data: response.data }; // Retourner les données de la réponse
  } catch (error) {
    return { error: error as ApiErrorResponse }; // En cas d'erreur, retourner l'erreur
  }
};
