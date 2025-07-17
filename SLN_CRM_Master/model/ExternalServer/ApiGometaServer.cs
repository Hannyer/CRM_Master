using Newtonsoft.Json;
using SLN_CRM_Master.model.DTo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;

namespace SLN_CRM_Master.model.ExternalServer
{
    public class ApiGometaServer
    {
        private static readonly HttpClient client = new HttpClient();

        public static async Task<IDGometaResponseDTO> SeachClient(string ID) {
            try
            {
                string url = $"https://apis.gometa.org/cedulas/{ID}";
          
                HttpResponseMessage response = await client.GetAsync(url);

                
                if (response.IsSuccessStatusCode)
                {
                    string jsonResponse = await response.Content.ReadAsStringAsync();

                    var resultado = JsonConvert.DeserializeObject<IDGometaResponseDTO>(jsonResponse);


                    return resultado;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}