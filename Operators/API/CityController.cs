using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ICSSoft.STORMNET;
using ICSSoft.STORMNET.Business;
using ICSSoft.STORMNET.Business.LINQProvider;
using ICSSoft.STORMNET.Web.Tools;
using ICSSoft.STORMNET.Web;
using ICSSoft.STORMNET.FunctionalLanguage;
using ICSSoft.STORMNET.FunctionalLanguage.SQLWhere;
using IIS.Providers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Threading.Tasks;
using System.Web.Http.Description;
namespace Operators.Controllers
{
    
    public class CityController : ApiController
    {
        // GET: api/City/GetAll
        public IEnumerable<City> GetAll()
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;            
            var с = ds.Query<City>(City.Views.Cities);       
            return с;
        }
        // POST: api/City/InsertCity
        public HttpResponseMessage InsertCity([FromBody] City city)
        {
            
            var ds = (SQLDataService)DataServiceProvider.DataService;
            if (ds.Query<City>(City.Views.Cities).Where(a => a.Name == city.Name).ToList().Any())
            {
                 return new HttpResponseMessage(HttpStatusCode.Conflict);
            }            
            else
            {
                DataServiceProvider.DataService.UpdateObject(city);
                return new HttpResponseMessage(HttpStatusCode.Created);
            }            
        }
        // DELETE: api/City/DeleteCity?city=
        public void DeleteCity(string city)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            City deletingCity = ds.Query<City>(City.Views.Cities).Where(a => a.Name == city).FirstOrDefault();
            deletingCity.SetStatus(ObjectStatus.Deleted);
            DataServiceProvider.DataService.UpdateObject(deletingCity);
        }  
    }
}
