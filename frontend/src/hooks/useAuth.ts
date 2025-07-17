import { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context'; // Import từ file mới

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure your component is wrapped with <AuthProvider>.'
    );
  }
  
  return context;
};

export default useAuth;