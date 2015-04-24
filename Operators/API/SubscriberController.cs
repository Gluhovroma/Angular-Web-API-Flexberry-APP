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
    
    public class SubscriberController : ApiController
    {
        // GET: localhost/api/Subscribe/GetAll
        public IQueryable<Subscriber> GetAll()
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;

            var с = ds.Query<Subscriber>(Subscriber.Views.SubcriberAll);
            return с;
        }

        // GET: api/Subscriber/5
        public Subscriber GetOne(string person)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            Subscriber dd = ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.PhoneNumber == person).FirstOrDefault();
            return dd;
        }
        public IQueryable<Subscriber> GetFiltered(string city, string provider)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            IQueryable<Subscriber> dd = null;
            if (city != "null" && provider != "null"){
              dd= ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.City.Name== city && a.Provider.Name == provider);

            }
            if (city == "null") {
                 dd = ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.Provider.Name == provider);
            }
            if (provider == "null") {
               dd = ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.City.Name == city);
            }
            
            return dd;
        }     

        // POST: api/Subscriber
        public HttpResponseMessage InsertSubscriber([FromBody] Subscriber NewSubscriber)
        {
          var f = NewSubscriber.GetStatus();
          var hh =  NewSubscriber.City.GetStatus();
          var fgh =  NewSubscriber.Provider.GetStatus();
          NewSubscriber.City.SetLoadingState(LoadingState.LightLoaded);
          NewSubscriber.Provider.SetLoadingState(LoadingState.LightLoaded);
          var ee =  NewSubscriber.City.GetStatus();
          var er =   NewSubscriber.Provider.GetStatus();
            var ds = (SQLDataService)DataServiceProvider.DataService;
            if (ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.PhoneNumber == NewSubscriber.PhoneNumber).ToList().Any())
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }
            else {
                DataServiceProvider.DataService.UpdateObject(NewSubscriber);
                return new HttpResponseMessage(HttpStatusCode.Created);
            }            
        }

        // PUT: api/Subscriber/5
        public void UpdateSubscriber([FromBody] Subscriber UpdatedSubscriber)
        {
            UpdatedSubscriber.SetLoadingState(LoadingState.Loaded);
            UpdatedSubscriber.City.SetLoadingState(LoadingState.Loaded);
            UpdatedSubscriber.Provider.SetLoadingState(LoadingState.Loaded);
            var ds = (SQLDataService)DataServiceProvider.DataService;
            DataServiceProvider.DataService.UpdateObject(UpdatedSubscriber);
        }

        // DELETE: api/Subscriber/DeleteSubscriber?person=90123213123
        public void DeleteSubscriber(string person)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            Subscriber deletingsub = ds.Query<Subscriber>(Subscriber.Views.SubcriberAll).Where(a => a.PhoneNumber == person).FirstOrDefault();
            var dd = deletingsub.GetStatus();
            deletingsub.SetStatus(ObjectStatus.Deleted);
            var ss = deletingsub.GetStatus();
            DataServiceProvider.DataService.UpdateObject(deletingsub);
           
        }
    }
}
