export type TDetails = {
    cod: string,
    name: string,
    sys: {
        country: string,
    },
    weather: [{description: string, id: number}],
    main: {
        feels_like: number,
        humidity: string, 
        temp: number,
    },
}

export type TPosition = {
    coords: {
        latitude: number, 
        longitude: number,
    }
}