import { HasFormatter } from "../interfaces/HasFormatter";
import { TDetails } from "../types/types";

export class SetWeatherDetails implements HasFormatter {
    constructor(
        readonly node: HTMLDivElement,
        readonly info: TDetails
        ) {}

    format(): void {
        const city = this.info.name;
        const country = this.info.sys.country;
        const { description } = this.info.weather[0];
        const { feels_like, humidity, temp } = this.info.main;

        this.node.querySelector<HTMLSpanElement>('.temp').innerText = Math.floor( temp ).toString();
        this.node.querySelector<HTMLDivElement>('.weather').innerText = description;
        this.node.querySelector<HTMLSpanElement>('.location-text').innerText = `${ city }, ${ country }`;
        this.node.querySelector<HTMLSpanElement>('.feels-num').innerText = Math.floor( feels_like ).toString();
        this.node.querySelector<HTMLSpanElement>('.humidity-num').innerText = `${ humidity }%`;
    }
}