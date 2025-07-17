using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLN_CRM_Master.model.DTo
{
    public class IDGometaResponseDTO
    {
        [JsonProperty("resultcount")]
        public int ResultCount { get; set; }

        [JsonProperty("results")]
        public ResultadoDTO[] Results { get; set; }
    }
}