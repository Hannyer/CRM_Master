namespace CRM_Master_API.Request
{
    public class ConfigurationFilterRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; }
        public string? Sort { get; set; } = "PkConfiguration";
        public string? Order { get; set; } = "desc";


        public short? Estado { get; set; }
        public string? DisplayName { get; set; }
        public string? Key01 { get; set; }
        public string? Key02 { get; set; }
        public string? Key03 { get; set; }
        public string? Key04 { get; set; }
        public string? Key05 { get; set; }
        public string? Key06 { get; set; }
    }
}
