using MovieAPI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData;
using System.Web.Script.Serialization;

namespace MovieApp.Controllers
{
    public class MoviesController : ApiController
    {
        [HttpGet]
        [EnableQuery]
        public IEnumerable<Movie> Get()
        {
            //WebRequest req = WebRequest.Create("http://tcmtestapi.azurewebsites.net/api/movie");
            //HttpWebResponse response = (HttpWebResponse)req.GetResponse();
            //Stream datastream = response.GetResponseStream();
            //StreamReader read = new StreamReader(datastream);
            //string responseFromApi = read.ReadToEnd();

            //JavaScriptSerializer oJS = new JavaScriptSerializer();
            //var list = new List<Movie>();
            //list.Add(oJS.Deserialize<Movie>(responseFromApi));

            //return list;

            return Movie.GetDummyMovies();
        }
    }
}
