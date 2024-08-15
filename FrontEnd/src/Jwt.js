
function handleSessionTimeout() {
    const token = localStorage.getItem('token'); 
    if (!token || checkSessionExpiry(token)!=0) {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
    }
    else
        return true;
}

function checkSessionExpiry(token){
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlRhbWlsIiwiaWF0IjoxNzEyOTI2NjQwLCJleHAiOjE3MTI5MzAyNDB9.2cTZZrU6A46S9gZW6YCUrm31leHZNeraTvMOBIYOrBY';
const decoded = decodeJWT(token);
const exp_time=decoded.exp;
var current_time=Date.now/1000;
console.log(exp_time);
if(current_time>exp_time){
    return -1;
}
else{
    return 0;
}
}
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'wv6bk73Y7OytrzL70mJzgBFqg7kxkHyQf0YXD5vgkK4=';

function refreshToken(token) {
    try {
        
        const decoded = decodeJWT(token);
        if (!decoded) {
            return null;  
        }

       
        const nowInSeconds = Math.floor(Date.now() / 1000);
        decoded.exp = nowInSeconds;  // Set expiration to current time

       
        Token = jwt.sign({id:decoded.id}, JWT_SECRET, { expiresIn: '5m' });  // Set new expiration for 5 minutes from now
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}

function resetTimeout() {
    const originalToken = localStorage.getItem('token');
    refreshToken(originalToken);
}
window.onload = resetTimeout;  // Reset timeout on page load
document.onmousemove = resetTimeout;
document.onkeydown = resetTimeout;
document.onclick = resetTimeout;
document.onscroll = resetTimeout;
document.onmousedown = resetTimeout;