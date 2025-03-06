import { ResponseObject } from "../common/common";
import { geminiApi } from "../geminiApi";

export interface MovieRecParams{
  genres: string[];
  mood: string;
  decade?: string;
  maxRuntime?: number;
  minRating?: number;
  excludeGenres?: string[];
  directors?: string;
  actors?: string;
  similarTo?: string;
  streamingServices?: string[];
}

export async function generateMovieRec(params:MovieRecParams):Promise<ResponseObject>{
  const prompt:string = `I am looking for movie recommendations based on the following preferences. Please provide your response in JSON format, including the movie title, release year, runtime, rating, and a brief description for each recommendation. Here are my parameters:

Genres: ["Action", "Sci-Fi", "Thriller"]

Mood: "Exciting"

Decade: "2010s"

Max Runtime: 150 minutes

Min Rating: 8.0

Exclude Genres: ["Horror"]

Directors: "Christopher Nolan"

Actors: "Leonardo DiCaprio"

Similar To: "Inception"

Streaming Services: ["Netflix", "Amazon Prime"]

Please ensure the response is in the following JSON format:

json
Copy
{
  "recommendations": [
    {
      "title": "Movie Title",
      "releaseYear": "Year",
      "runtime": "Runtime in minutes",
      "rating": "Rating out of 10",
      "description": "Brief description of the movie"
    },
    {
      "title": "Movie Title",
      "releaseYear": "Year",
      "runtime": "Runtime in minutes",
      "rating": "Rating out of 10",
      "description": "Brief description of the movie"
    }
  ]
}
Thank you!


  `;
  return geminiApi(prompt);
}