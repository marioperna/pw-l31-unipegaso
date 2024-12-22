export type Cultivation = {
    nome: string;
    descrizione: string;
    periodoColtivazione: {
        inizio: string;
        fine: string;
    },
    periodoRaccolto: {
        inizio: string;
        fine: string;
    },
    temperaturaOttimale: {
        min: number;
        max: number;
        unitaMisura: string;
    }
    durata: {
        min: number;
        max: number;
        unitaMisura: string;
    };
    quantitaAcqua: {
        min: number;
        max: number;
        unitaMisura: string;
    },
    umiditaSuolo: {
        min: number;
        max: number;
        unitaMisura: string;
    },
    percentualeSole: {
        min: number;
        max: number;
        unitaMisura: string;
    }
} 