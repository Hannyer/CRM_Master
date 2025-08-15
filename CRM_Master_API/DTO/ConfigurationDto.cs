namespace CRM_Master_API.DTO
{
    public record class ConfigurationDto
    {
        public long PkConfiguration { get; init; }
        public short? Estado { get; init; }
        public string? Description { get; init; }
        public string? Observacion { get; init; }
        public string? Key01 { get; init; }
        public string? Key02 { get; init; }
        public string? Key03 { get; init; }
        public string? Key04 { get; init; }
        public string? Key05 { get; init; }
        public string? Key06 { get; init; }
        public string? Value { get; init; }
        public string? DisplayName { get; init; }
    }
}
