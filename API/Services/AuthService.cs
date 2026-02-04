using API.Data;
using API.DTOs;
using API.Models;
using API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public interface IAuthService
{
    Task<TokenResponse?> LoginAsync(LoginRequest request);
    Task<TokenResponse?> RefreshTokenAsync(string refreshToken);
    Task<bool> LogoutAsync(string refreshToken);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUserRepository userRepository, 
        ITokenService tokenService,
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _context = context;
        _configuration = configuration;
    }

    public async Task<TokenResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByUsernameAsync(request.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return null;
        }

        // Revoke all existing refresh tokens for this user
        var existingTokens = await _context.RefreshTokens
            .Where(rt => rt.UserId == user.Id && rt.Revoked == null)
            .ToListAsync();

        foreach (var token in existingTokens)
        {
            token.Revoked = DateTime.UtcNow;
        }

        var accessToken = _tokenService.GenerateAccessToken(user.Id, user.Username, user.Role.ToString());
        var refreshToken = _tokenService.GenerateRefreshToken();

        var refreshTokenExpirationDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"]!);
        
        var newRefreshToken = new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            Created = DateTime.UtcNow,
            Expires = DateTime.UtcNow.AddDays(refreshTokenExpirationDays)
        };

        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        return new TokenResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<TokenResponse?> RefreshTokenAsync(string refreshToken)
    {
        var storedToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (storedToken == null || !storedToken.IsActive)
        {
            return null;
        }

        // Revoke old refresh token
        storedToken.Revoked = DateTime.UtcNow;

        var accessToken = _tokenService.GenerateAccessToken(
            storedToken.User.Id, 
            storedToken.User.Username, 
            storedToken.User.Role.ToString());
        
        var newRefreshToken = _tokenService.GenerateRefreshToken();
        var refreshTokenExpirationDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpirationDays"]!);

        var newToken = new RefreshToken
        {
            Token = newRefreshToken,
            UserId = storedToken.UserId,
            Created = DateTime.UtcNow,
            Expires = DateTime.UtcNow.AddDays(refreshTokenExpirationDays)
        };

        _context.RefreshTokens.Add(newToken);
        await _context.SaveChangesAsync();

        return new TokenResponse
        {
            AccessToken = accessToken,
            RefreshToken = newRefreshToken
        };
    }

    public async Task<bool> LogoutAsync(string refreshToken)
    {
        var storedToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (storedToken == null)
        {
            return false;
        }

        storedToken.Revoked = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }
}
