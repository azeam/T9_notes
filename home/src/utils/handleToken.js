import history from "./history";

export const tokenCheck = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken === null) {
        history.push("/login"); // go to login page
        return false;
    }
    return true;
}

export const logout = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken !== null) {
        localStorage.removeItem("AuthToken");
    }
    history.push("/login");
}