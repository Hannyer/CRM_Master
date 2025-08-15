namespace CRM_Master_API.DTO
{
    public record PagedResult<T>(IEnumerable<T> Items, int Total);
}
