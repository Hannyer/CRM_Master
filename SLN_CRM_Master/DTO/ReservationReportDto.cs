﻿using EntityLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SLN_CRM_Master.DTO
{
    public class ReservationReportDto
    {
        public List<ReservationReportE> listReport { get; set; } = new List<ReservationReportE>();
        public bool isClient { get; set; }
    }
}