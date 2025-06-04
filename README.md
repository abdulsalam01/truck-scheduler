## by Abdul Salam
# Truck Scheduling Calculator

This repository contains a TypeScript solution to determine how many trucks are needed to ensure daily deliveries over a 30-day month, given each truck’s trip duration, maintenance time, and an odd/even departure rule.

## Overview

* **Trip Duration** (`tripDuration`): Number of days for a truck to complete one round trip (depart, deliver, return).
* **Maintenance Days** (`maintenanceDays`): Number of days required for maintenance before the truck can depart again.
* **Month Days** (`monthDays`): Total days in the month (default is 30).
* **Parity Rule**:

  * Trucks with odd numbers (1, 3, 5, …) can only depart on odd dates (1, 3, 5, …).
  * Trucks with even numbers (2, 4, 6, …) can only depart on even dates (2, 4, 6, …).

Built with two main functions:

1. **`getDepartureDates(truckNumber, tripDuration, maintenanceDays, monthDays): number[]`**
   Calculates all valid departure dates for a single truck, based on its number and the given durations.

2. **`findMinimumTrucks(tripDuration, maintenanceDays, monthDays): { schedules: Record<number, number[]>; totalTrucks: number }`**
   Iterates from 1 truck up to `monthDays` trucks to find the minimum count such that there’s at least one departure scheduled on every day of the month. Returns:

   * `schedules`: A map of each truck number → its array of departure dates.
   * `totalTrucks`: The smallest number of trucks required to cover all days.

## Files

* **`index.ts`**
  Contains `getDepartureDates`, `findMinimumTrucks`, and a `main()` function that prints out each truck’s schedule and the total count.

* **`tsconfig.json`**
  TypeScript configuration file (compile targets, module format, etc.).

* **`package.json`**
  Defines scripts and devDependencies for TypeScript.

## Installation

1. Clone this repository (or copy the files) into your local machine.
2. Make sure you have Node.js (≥ 14) and npm installed.
3. Run:

   ```bash
   npm install
   ```

   This installs TypeScript as a dev dependency.

## How to Run

All code is written in TypeScript. Before running, compile to JavaScript and then execute the output.

1. **Build**
   Compiles TypeScript to JavaScript (`dist/` folder):

   ```bash
   npm run build
   ```

   This invokes `tsc`, which reads `tsconfig.json` and emits compiled files to `dist/`.

2. **Start**
   Compile and run in one step:

   ```bash
   npm start
   ```

   Under the hood, `npm start` does:

   * `tsc` → compiles `src/index.ts` to `dist/index.js`
   * `node dist/index.js` → runs the compiled code

3. **Test**
   A placeholder script that simply prints “Test Completed”:

   ```bash
   npm test
   ```

### `package.json` Scripts

```json
{
  "scripts": {
    "install": "npm i -D typescript",
    "build": "tsc",
    "start": "tsc && node dist/index.js",
    "test": "echo \"Test Completed\" && exit 0"
  },
  "devDependencies": {
    "typescript": "^5.8.3"
  }
}
```

* **`npm run install`** installs TypeScript locally.
* **`npm run build`** runs the TypeScript compiler (`tsc`).
* **`npm start`** compiles and then executes the output.
* **`npm test`** is a stub that always succeeds.

## Configuration

You can adjust the key parameters directly in `index.ts` inside the `main()` call:

```ts
function main(monthDays: number = 30, tripDuration: number = 3, maintenanceDays: number = 1) {
  // ...
}

main(30, 3, 1);
```

* **`monthDays`**: total days in the month (default 30)
* **`tripDuration`**: days per round trip (default 3)
* **`maintenanceDays`**: days for maintenance (default 1)

Change these values and rerun `npm start` to see how the required number of trucks and departure schedules adjust.

## Example Output

With defaults `(monthDays = 30, tripDuration = 3, maintenanceDays = 1)`, running `npm start` yields:

```
Truck 1: 1, 5, 9, 13, 17, 21, 25, 29
Truck 2: 2, 6, 10, 14, 18, 22, 26, 30
Truck 3: 3, 7, 11, 15, 19, 23, 27
Truck 4: 4, 8, 12, 16, 20, 24, 28
TOTAL Trucks: 4
```

Here, four trucks are enough to guarantee at least one departure on every date from 1 to 30.

## How It Works (Technical Summary)

1. **Parity-Based Scheduling**
   Each truck is assigned an index within its parity group:

   * Odd trucks: 1 → date 1; 3 → date 3; 5 → date 5; …
   * Even trucks: 2 → date 2; 4 → date 4; 6 → date 6; …

2. **Departure Loop**

   * Start at the truck’s initial departure date (based on parity and index).
   * After each departure, compute `nextEarliest = currentDeparture + tripDuration + maintenanceDays`.
   * If `nextEarliest` matches truck parity (odd/even), depart that day; otherwise, depart the following day (`nextEarliest + 1`).

3. **Coverage Check**

   * For each candidate number of trucks `n`, gather all departure dates of trucks `1..n`.
   * Build a `Set<number>` of covered days.
   * If all days `1..monthDays` are present in that set, `n` is the minimum required.