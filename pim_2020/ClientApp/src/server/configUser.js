export const TOKEN = 'token';

export function getLocalUser(localUser) {
    let user = localStorage.getItem(TOKEN);
    if (user == null) {
        return null;
    }
    else {
        return user;
    }
}

export function setLocalUser(localUser) {
    if (localUser == null) {
        localStorage.removeItem(localUser);
    } else {
        localStorage.setItem(TOKEN, localUser);
    }
}

export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;

export const logout = () => {
    localStorage.removeItem(TOKEN);
}

export const getToken = () => localStorage.getItem(TOKEN);