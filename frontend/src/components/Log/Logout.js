import React from "react";

function Logout() {

    const logout = () => {
        localStorage.removeItem("token");
        window.location = "/";
    }

    return (
        <button className="btn btn-primary text-light mx-2" onClick={logout}>Se déconnecter
        </button>
    )
}

export default Logout