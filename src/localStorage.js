import { useSelector } from "react-redux";

//When loading a user, we get the 'user', and 'token' in local storage
export const loadState = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        const serializedToken = localStorage.getItem('token')
        if (serializedUser === null || serializedToken === null) {
            return null;
        }
        return {
            user: JSON.parse(serializedUser),
            token: serializedToken,
        };
    } catch (err) {
        console.log(err);
    }
};

//When saving the state, we setUser nad setToken in local storage
export const saveState = () => {
    try {
        const serializedUser = JSON.stringify(useSelector((state) => state.user.user));
        const serializedToken = useSelector((state) => state.user.token);
        localStorage.setItem('user', serializedUser);
        localStorage.setItem('token', serializedToken);
    } catch (err) {
        console.log(err);
    };
};