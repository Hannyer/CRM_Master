using System.Web;
using System.Web.Mvc;

namespace SLN_CRM_Master
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new Filters.Filter());
        }
    }
}
