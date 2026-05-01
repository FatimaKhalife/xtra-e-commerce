// GoogleLoginButton.tsx
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { API_URL } from "../config";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/google`,
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        window.location.href = '/'; // Redirect after successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;