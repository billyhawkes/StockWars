// Imports
import React from "react";

const Buy = () => {
    return (
        <form>
            <label>
                Stock
                <input type="text" name="stock" />
            </label>
            <input type="submit" value="Buy" />
        </form>
    );
};

export default Buy;
