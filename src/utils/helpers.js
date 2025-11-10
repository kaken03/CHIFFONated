// This file exports utility functions that assist with various tasks throughout the application.

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};