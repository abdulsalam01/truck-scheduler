/**
 * Calculates all departure dates for a given truck within a month.
 *
 * @param truckNumber     Identifier of the truck (1, 2, 3, …).
 * @param tripDuration    Number of days required for one round trip (operational time).
 * @param maintenanceDays Number of days required for maintenance after returning.
 * @param monthDays       Total days in the month (e.g., 30).
 *
 * A truck may only depart on dates whose parity (odd/even) matches its truckNumber,
 * and successive departures are spaced by (tripDuration + maintenanceDays) days.
 */
export function getDepartureDates(
    truckNumber: number,
    tripDuration: number,
    maintenanceDays: number,
    monthDays: number
): number[] {
    const departures: number[] = [];
    const parity = truckNumber % 2; // 1 = odd, 0 = even

    // Determine this truck’s index among its parity group:
    // - For odd trucks (1, 3, 5, …): index = (truckNumber + 1) / 2
    // - For even trucks (2, 4, 6, …): index = truckNumber / 2
    const groupIndex = parity === 1 ? (truckNumber + 1) / 2 : truckNumber / 2;

    // Initial departure date = 
    //   if odd:  (2 * (groupIndex - 1) + 1)  → 1, 3, 5, …
    //   if even: (2 * (groupIndex - 1) + 2)  → 2, 4, 6, …
    let nextDeparture = parity === 1
        ? 2 * (groupIndex - 1) + 1
        : 2 * (groupIndex - 1) + 2;

    while (nextDeparture <= monthDays) {
        departures.push(nextDeparture);

        // After completing trip + maintenance, compute earliest next departure.
        const nextEarliest = nextDeparture + tripDuration + maintenanceDays;

        // Align nextEarliest to the correct parity.
        nextDeparture = nextEarliest + 1;
        if (nextEarliest % 2 === parity) {
            nextDeparture = nextEarliest;
        }
    }

    return departures;
}