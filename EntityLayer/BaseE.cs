using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityLayer
{
    public class BaseE
    {
        public int Opcion { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string Search { get; set; }
        public string Sort { get; set; } = "PkConfiguration";
        public string Order { get; set; } = "desc";

    
    }
}
