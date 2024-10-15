import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    const [loading, setLoading] = useState(true);
    const color = "#ffffff"; // If you don't change this dynamically, you can set it as a constant
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "green",
    };

    return (
        <div style={{marginTop:'150px'}}>
        <div className="sweet-loading text-center">
            <HashLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
        </div>
    );
}

export default Loader;
