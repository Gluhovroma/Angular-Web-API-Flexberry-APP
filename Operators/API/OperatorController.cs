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
    public class OperatorController : ApiController
    {
        // GET: api/Operator
        public IEnumerable<Provider> GetAll()
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            var с = ds.Query<Provider>(Provider.Views.Providers);
            return с;
        }
        public HttpResponseMessage InsertOperator([FromBody] Provider provider)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            if (ds.Query<Provider>(Provider.Views.Providers).Where(a => a.Name == provider.Name).ToList().Any())
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }
            else
            {
                DataServiceProvider.DataService.UpdateObject(provider);
                return new HttpResponseMessage(HttpStatusCode.Created);
            }       
        }
         public void DeleteOperator(string provider)
        {
            var ds = (SQLDataService)DataServiceProvider.DataService;
            Provider deletingProvider = ds.Query<Provider>(Provider.Views.Providers).Where(a => a.Name == provider).FirstOrDefault();
            deletingProvider.SetStatus(ObjectStatus.Deleted);
            DataServiceProvider.DataService.UpdateObject(deletingProvider);
        }
        
        
    }
}
