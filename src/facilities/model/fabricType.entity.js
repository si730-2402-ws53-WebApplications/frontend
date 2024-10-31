import {Temperature} from "./temperature.entity.js";
import {Humidity} from "./humidity.entity.js";

export class FabricType{
    constructor(
        {

            name = '',
            temperature= new Temperature({}),
            humidity = new Humidity({}),


        }
    ) {

        this.name = name;
        this.temperature=temperature;
        this.humidity=humidity;
    }
}