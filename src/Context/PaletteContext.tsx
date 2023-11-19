import {createContext, ReactNode, useContext, useState} from 'react';

export type Palette = {
    uiBackground: string;
    primaryColor: string;
    secondaryColor: string;
    crossingColor: string;
    label: string;
};

export type Palettes = {
    contrast1: Palette;
    contrast2: Palette;
    contrast3: Palette;
    contrast4: Palette;
};

type PaletteContextType = {
    activePalette: Palette;
    setActivePalette: (palette: Palette) => void;
};

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    const defaultContrast = {
        uiBackground: '#3a415b',
        primaryColor: '#c2c7c7',
        secondaryColor: '#035ca4',
        crossingColor: '#b04d4d',
        label: 'Default'
    };

    const [activePalette, setActivePalette] = useState<Palette>(defaultContrast);

    const value: PaletteContextType = {
        activePalette,
        setActivePalette,
    };

    return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
};

export const usePalette = () => {
    const context = useContext(PaletteContext);
    if (!context) {
        throw new Error('usePalette must be used within a PaletteProvider');
    }
    return context;
};