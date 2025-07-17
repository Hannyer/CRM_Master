using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLN_CRM_Master.model.DTo
{
    public class ResultadoDTO
    {
        [JsonProperty("fullname")]
        public string FullName { get; set; }

        [JsonProperty("firstname1")]
        public string FirstName { get; set; }

        [JsonProperty("firstname2")]
        public string SecondtName { get; set; }

        [JsonProperty("lastname1")]
        public string LastNameOne { get; set; }

        [JsonProperty("lastname2")]
        public string LastNameTwo { get; set; }

        [JsonProperty("firstname")]
        public string CompletName { get; set; }

        [JsonProperty("lastname")]
        public string CompletLastName { get; set; }

        [JsonProperty("cedula")]
        public string Cedula { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("guess_type")]
        public string GuessType { get; set; }

        [JsonProperty("guess_type_num")]
        public string GuessTypeValue { get; set; }
    }
}