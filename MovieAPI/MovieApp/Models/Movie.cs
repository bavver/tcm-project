using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MovieAPI.Models
{
    public class Movie
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Image { get; set; }
        public int Year { get; set; }
        public string Actors { get; set; }
        public string Writer { get; set; }

        public string Director { get; set; }

        public string Description { get; set; }
        public string Category { get; set; }


        public string SearchTerm
        {
            get
            {
                return String.Concat(Title, Director, Actors);
            }
        }



        public static List<Movie> GetDummyMovies()
        {
            var list = new List<Movie>();
            list.Add(new Movie { Id = 1, Image = "aaa", Title = "The Lord of The Rings", Year = 1999, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Peter Jackson", Actors = "Gollum Lenolas Gandalf", Writer = "Peter Jackson", Category = "Movie" });
            list.Add(new Movie { Id = 2, Image = "aaa", Title = "The Hangover", Year = 2005, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Todd Philips", Actors = "Zach Galifianakis", Writer = "Daniel Goldbberg", Category = "Series" });
            list.Add(new Movie { Id = 3, Image = "aaa", Title = "Intouchables", Year = 2012, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Olivier Nakache", Actors = "Omar Sy Olivier Cluz et", Writer = "Eric Toledano", Category = "Episode" });
            list.Add(new Movie { Id = 4, Image = "aaa", Title = "Ekşi Elmalar", Year = 1993, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Yılmaz Erdoğan", Actors = "Fatih Artman Şükran Ovalı", Writer = "Yılmaz Erdoğan", Category = "Movie" });
            list.Add(new Movie { Id = 5, Image = "aaa", Title = "Matrix", Year = 2014, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Lana Wachowski", Actors = "Keanu Reeves", Writer = "Lilly Wachowski", Category = "Series" });
            list.Add(new Movie { Id = 6, Image = "aaa", Title = "Karabela", Year = 2000, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Burak Aksak", Actors = "Cengiz Bozkurt", Writer = "Burak Aksak", Category = "Episode" });
            list.Add(new Movie { Id = 7, Image = "aaa", Title = "The Hobbit", Year = 1997, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Peter Jackson", Actors = "Howard Shore", Writer = "Peter Jackosn", Category = "Movie" });
            list.Add(new Movie { Id = 8, Image = "aaa", Title = "The Grand Budapest Hotel", Year = 2013, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Was Anderson", Actors = "Douglas Aibel", Writer = "Was Anderson", Category = "Series" });
            list.Add(new Movie { Id = 9, Image = "aaa", Title = "The Imıtatiton Game", Year = 2004, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Morten Tlydum", Actors = "Benedict Cumberbach", Writer = "Morten Tlydum", Category = "Episode" });
            list.Add(new Movie { Id = 10, Image = "aaa", Title = "Vizontele", Year = 1996, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Yılmaz Erdoğan", Actors = "Cem Yılmaz", Writer = "Yılmaz Erdoğan", Category = "Movie" });
            list.Add(new Movie { Id = 11, Image = "aaa", Title = "I'm Legend", Year = 2017, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Francis Lawrence", Actors = "Will Smith", Writer = "Francis Lawrence", Category = "Series" });
            list.Add(new Movie { Id = 12, Image = "aaa", Title = "Snowden", Year = 2009, Description = "This is the movie that played in 1999 at the end of the 20th century. Very good movie.", Director = "Moritz Borman", Actors = "Joseph Gordon", Writer = "John Wick", Category = "Episode" });

            return list;
        }

    }
}
