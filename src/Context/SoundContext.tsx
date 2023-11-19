import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SoundContextProps {
    isSoundEnabled: boolean;
    toggleSound: () => void;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

interface SoundProviderProps {
    children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
    const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
        const storedSoundSetting = localStorage.getItem('isSoundEnabled');
        return storedSoundSetting ? JSON.parse(storedSoundSetting) : true;
    });

    const toggleSound = () => {
        setIsSoundEnabled((prev: boolean) => !prev);
    };

    useEffect(() => {
        localStorage.setItem('isSoundEnabled', JSON.stringify(isSoundEnabled));
    }, [isSoundEnabled]);

    return (
        <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = (): SoundContextProps => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
