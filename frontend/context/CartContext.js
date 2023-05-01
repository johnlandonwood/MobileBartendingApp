import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const context = useMemo(() => ({
        cart,
        setCart
    }), [cart]);

    const addToCart = (item, qty, additionalNotes) => {
        let found = cart.filter(x => x._id === item._id);
        if(found.length == 0){
            setCart([...cart, {...item, qty, additionalNotes}]);
        }
        else{
            const other_items = cart.filter(x => x._id !== item._id);
            setCart([...other_items, {...found[0], qty: found[0].qty + qty, additionalNotes}]);
        }
    };


    return <CartContext.Provider 
        value={{
            context,
            addToCart
        }}>
        {children}
    </CartContext.Provider>

};

