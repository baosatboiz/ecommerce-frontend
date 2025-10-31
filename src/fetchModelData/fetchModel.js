function logout(){
    localStorage.removeItem('token');
    window.location.href = '/login';
}
function getAccessToken(){
    return localStorage.getItem('token');
}
export default async function fetchModel(endpoint,option={}){
    const token = getAccessToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`,{
        headers:{'Content-Type':'application/json',...(token?{'Authorization':`Bearer ${token}`}:{})},
        ...option
    });
    if (res.status === 403){
        logout();
        return null;
    }
    return await res.json();
}