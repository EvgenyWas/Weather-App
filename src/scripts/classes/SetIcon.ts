import { HasFormatter } from "../interfaces/HasFormatter";
import { clear, storm, snow, haze, cloud, rain } from "../requires";

export class SetIcon implements HasFormatter {
    constructor(
        private node: HTMLImageElement,
        public id: number
    ) {};

    format(): void {
        if(this.id == 800){
            this.node.src = clear;
        }else if(this.id >= 200 && this.id <= 232){
            this.node.src = storm;  
        }else if(this.id >= 600 && this.id <= 622){
            this.node.src = snow;
        }else if(this.id >= 701 && this.id <= 781){
            this.node.src = haze;
        }else if(this.id >= 801 && this.id <= 804){
            this.node.src = cloud;
        }else if((this.id >= 500 && this.id <= 531) || (this.id >= 300 && this.id <= 321)){
            this.node.src = rain;
        }
    }
};