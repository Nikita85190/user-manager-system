namespace API.Services
{
    public interface ICloudinaryService
    {
        Task<string> UploadImageAsync(IFormFile file, CancellationToken cancellationToken = default);
        Task<bool> DeleteImageAsync(string publicId, CancellationToken cancellationToken = default);
    }
}
