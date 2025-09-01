import { contextData } from '@/context/AuthContext';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const { user } = contextData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setSuccessMessage('');
    setServerError('');
  };

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setSuccessMessage('');
    setServerError('');

    try {
      const response = await fetch(`${url}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          id: user._id,
        }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || 'Something went wrong');

      setSuccessMessage('Password updated successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-100 w-fit mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 p-4">
      <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">
        Change Password
      </h2>

      <div className="max-w-md">
        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        <InputField
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          error={errors.currentPassword}
          onChange={handleChange}
          type={passwordVisibility.currentPassword ? 'text' : 'password'}
          onToggleVisibility={() => togglePasswordVisibility('currentPassword')}
          showPassword={passwordVisibility.currentPassword}
        />
        <InputField
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          error={errors.newPassword}
          onChange={handleChange}
          type={passwordVisibility.newPassword ? 'text' : 'password'}
          onToggleVisibility={() => togglePasswordVisibility('newPassword')}
          showPassword={passwordVisibility.newPassword}
        />
        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          type={passwordVisibility.confirmPassword ? 'text' : 'password'}
          onToggleVisibility={() => togglePasswordVisibility('confirmPassword')}
          showPassword={passwordVisibility.confirmPassword}
        />

        <div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />{' '}
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Updated input field component with password toggle
function InputField({
  label,
  name,
  value,
  error,
  onChange,
  type,
  onToggleVisibility,
  showPassword,
}: {
  label: string;
  name: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  onToggleVisibility: () => void;
  showPassword: boolean;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md text-white pr-10`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={onToggleVisibility}
        >
          {showPassword ? (
            <EyeOff size={18} className="text-gray-400" />
          ) : (
            <Eye size={18} className="text-gray-400" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
