import { findMinimumTrucks } from "./src/truck";

function main(monthDays: number = 30, tripDuration: number = 3, maintenanceDays: number = 1) {    
    // Compute schedules and minimum number of trucks.
    const { schedules, totalTrucks } = findMinimumTrucks(tripDuration, maintenanceDays, monthDays);
    
    // Output the schedule for each truck and the total number of trucks needed.
    for (let truck = 1; truck <= totalTrucks; truck++) {
      console.log(`Truck ${truck}: ${schedules[truck].join(', ')}`);
    }

    console.log(`TOTAL Trucks: ${totalTrucks}`);
}

main(30, 3, 1);