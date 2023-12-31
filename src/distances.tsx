import { EventInput } from "@fullcalendar/core";

function getDistances(distance: string): number[] {
    const sprintSwimStart = 1;
    const sprintSwimEnd = 750;
    const sprintBikeStart = 1;
    const sprintBikeEnd = 12.5;
    const sprintRunStart = 1;
    const sprintRunEnd = 3.1;

    const olympicSwimStart = sprintSwimEnd;
    const olympicSwimEnd = 1500;
    const olympicBikeStart = sprintBikeEnd;
    const olympicBikeEnd = 25;
    const olympicRunStart = sprintRunEnd;
    const olympicRunEnd = 6.2;

    const halfSwimStart = olympicSwimEnd;
    const halfSwimEnd = 2000;
    const halfBikeStart = olympicBikeEnd;
    const halfBikeEnd = 56;
    const halfRunStart = olympicRunEnd;
    const halfRunEnd = 13.1;

    const fullSwimStart = halfSwimEnd;
    const fullSwimEnd = 4000;
    const fullBikeStart = halfBikeEnd;
    const fullBikeEnd = 112;
    const fullRunStart = halfRunEnd;
    const fullRunEnd = 26.2;

    switch (distance) {
        case "Sprint": return [sprintSwimStart, sprintSwimEnd, sprintBikeStart, sprintBikeEnd, sprintRunStart, sprintRunEnd];
        case "Olympic": return [olympicSwimStart, olympicSwimEnd, olympicBikeStart, olympicBikeEnd, olympicRunStart, olympicRunEnd];
        case "70.3": return [halfSwimStart, halfSwimEnd, halfBikeStart, halfBikeEnd, halfRunStart, halfRunEnd];
        case "140.6": return [fullSwimStart, fullSwimEnd, fullBikeStart, fullBikeEnd, fullRunStart, fullRunEnd];
        default: return [];
    }
}

function calculatePercent(date:Date, distance: string):number{
    let weeks = Math.round((new Date(date).getTime() - Date.now())/(1000*60*60*24*7));
    let taper= distance === "70.3" ? 2 : distance === "140.6" ? 3 : 1;
    let percent = 1/(weeks - (weeks-taper)/4);
    return percent;
}

//track week #? or just if rest week
//track index in tempo and speed arrays for each 
//just say pace per type of race not exact numbers

//called once by each sport, numdays is the number of days each week that sport is done, date is race date
export function setWorkouts(events: EventInput[], distance: string, numDays: number, date: Date, type: string): EventInput[]{
    let dists = getDistances(distance);
    let dist = type === "swim" ? dists[0]: type=== "bike"? dists[2]: dists[4];
    //let end = type === "swim"? dists[1]: type === "bike"? dists[3]: dists[5];

    let week =0;
    let percent = calculatePercent(date, distance);
    // how to get all events in a recurrent event to set titles

    while(week<events.length){
        if(numDays == 1){
            events[week].title = events[week].title + ": " + dist.toString() + (type === "swim" ? " m" : " mi");
        }else {
        }
        dist += dist*percent;
        week+=numDays;
    }
    return events;
}