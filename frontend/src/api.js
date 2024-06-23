const apiUrl = process.env.REACT_APP_API_URL;

export const fetchItems = async () => {
  const response = await fetch(`${apiUrl}/items`);
  const data = await response.json();
  return data;
};

export const fetchUser = async (userId) => {
  const response = await fetch(`${apiUrl}/users/${userId}`);
  const data = await response.json();
  return data;
};

// Add other API functions as needed
