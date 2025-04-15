import React, { createContext } from 'react';


interface ChatContextProps {
  issidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}


export const cartifycontext = createContext<ChatContextProps | undefined>(undefined);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const[issidebarOpen, setSidebarOpen] = React.useState(true);
 

  
    return (
        <cartifycontext.Provider
          value={{ 
             issidebarOpen, 
            setSidebarOpen ,
           
          }}
        >
          {children}
        </cartifycontext.Provider>
    )
}

export default ContextProvider;
