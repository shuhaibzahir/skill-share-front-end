const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const ENPDPOINTS = {
    // API URL
    USER_SIGNING_UP: `${API_URL}/auth/register`,
    USER_SIGNING_IN: `${API_URL}/auth/login`,
}
export default ENPDPOINTS;