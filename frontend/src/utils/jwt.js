export const getJwt = () => localStorage.getItem('appcenter-token');
export const setJwt = (token) => localStorage.setItem('appcenter-token', token);
export const clearJwt = () => localStorage.removeItem('appcenter-token');
