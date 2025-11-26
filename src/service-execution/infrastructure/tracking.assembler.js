import {Delivery} from "@/service-execution/domain/model/tracking.entity.js";

export class TrackingAssembler{

    static ToEntityFromResource(resource){
        return new Delivery({...resource});
    }

    static ToEntitiesFromResponse(response){
        if(response.status !== 200){

            console.error(`${response.status}: ${response.statusText}`);

            return [];
        }
        let resources = response.data instanceof Array ? response.data: response.data['deliveries'];

        return resources.map((resource) => TrackingAssembler.ToEntityFromResource(resource));
    }
}