import { getDepartureDates } from "./departure";

/**
 * Finds the minimum number of trucks needed so that every day in the month
 * (1..monthDays) has at least one truck departure scheduled.
 *
 * It tries with 1 truck, then 2 trucks, and so on, until coverage of all days is achieved.
 */
export function findMinimumTrucks(
    tripDuration: number,
    maintenanceDays: number,
    monthDays: number
  ): { schedules: Record<number, number[]>; totalTrucks: number } {
    for (let numTrucks = 1; numTrucks <= monthDays; numTrucks++) {
      const coverage = new Set<number>();
      const schedules: Record<number, number[]> = {};
  
      // Build departure schedule for each truck 1..numTrucks.
      for (let truck = 1; truck <= numTrucks; truck++) {
        const departures = getDepartureDates(truck, tripDuration, maintenanceDays, monthDays);
        schedules[truck] = departures;
        departures.forEach((date) => coverage.add(date));
      }
  
      // Check if every day 1..monthDays is covered.
      let allCovered = true;
      for (let day = 1; day <= monthDays; day++) {
        if (!coverage.has(day)) {
          allCovered = false;
          break;
        }
      }
  
      if (allCovered) {
        return { schedules, totalTrucks: numTrucks };
      }
    }
  
    // Return empty value if all conditions not meets.
    return { schedules: {}, totalTrucks: 0 };
  }