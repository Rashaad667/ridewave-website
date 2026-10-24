/**
 * Customer reviews shown in "What Our Customers Say".
 *
 * Only add GENUINE reviews that a customer actually gave RideWave Rentals,
 * in their own words. Up to six are shown; the layout adapts to the count.
 *
 * To add a review, copy the example below into the list:
 *  {
 *    rating: 5,                       // whole number from 1 to 5
 *    title: "Great trip",             // the customer's own heading, or null
 *    quote: "Their exact words here.",
 *    author: null,                    // a name ONLY with the customer's permission
 *    date: null,                      // e.g. "October 2026", or null
 *  },
 *
 * Leave `author` and `date` as null unless you have them; nothing is shown
 * in their place. Never edit a customer's wording beyond fixing obvious typos.
 */

export type Review = {
  rating: 1 | 2 | 3 | 4 | 5;
  title: string | null;
  quote: string;
  author: string | null;
  date: string | null;
};

export const MAX_REVIEWS = 6;

export const reviews: Review[] = [
  {
    // Supplied by RideWave from a customer's feedback, 24 Oct 2026.
    rating: 5,
    title: "Excellent service!",
    quote: "Clean car, good price, on-time. Very friendly owner. Highly recommended!",
    author: null,
    date: null,
  },
];
