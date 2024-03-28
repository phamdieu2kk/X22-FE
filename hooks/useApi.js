import { useState } from 'react';
const useApi = () => {
  const postData = async (endpoint, data) => {
    try {
      const response = await fetch(`http://localhost:3001/api${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  };

  return { postData };
};

export { useApi };