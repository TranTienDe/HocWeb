using AutoMapper;
using EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Entities.Models;
using WebAPI.JwtFeatures;
using WebAPI.Models;
using WebAPI.Models.Entities;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext appDbContext;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;
        private readonly JwtHandler jwtHandler;
        private readonly IEmailSender emailSender;

        public UserController(AppDbContext appDbContext, UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler, IEmailSender emailSender)
        {
            this.appDbContext = appDbContext;
            this.userManager = userManager;
            this.mapper = mapper;
            this.jwtHandler = jwtHandler;
            this.emailSender = emailSender;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistration userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            var user = mapper.Map<User>(userForRegistration);

            var result = await userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponse { Errors = errors });
            }

            // Confirm email.
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };
            var callback = QueryHelpers.AddQueryString(userForRegistration.ClientURI, param);
            var message = new Message(new string[] { user.Email }, "Email Confirmation token", callback, null);
            await emailSender.SendEmailAsync(message);

            // Add role is Viewer.
            await userManager.AddToRoleAsync(user, "Viewer");

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthentication userForAuthentication)
        {
            try
            {
                var user = await userManager.FindByNameAsync(userForAuthentication.Email);
                if (user == null) return BadRequest("Email chưa đúng!");

                if (!await userManager.IsEmailConfirmedAsync(user)) // Kiểm tra email đã confirm chưa.
                    return Unauthorized(new AuthResponse { ErrorMessage = "Email is not confirmed" });

                // Check password and lockout user, chuyển sang màn hình forgot passwprd.
                if (!await userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                {
                    await userManager.AccessFailedAsync(user); // Tăng biến đếm failed.

                    if (await userManager.IsLockedOutAsync(user))
                    {
                        var content = $"Your account is locked out. To reset the password click this link: {userForAuthentication.clientURI}";
                        var message = new Message(new string[] { userForAuthentication.Email }, "Locked out account information", content, null);
                        await emailSender.SendEmailAsync(message);

                        return Unauthorized(new AuthResponse { ErrorMessage = "The account is locked out" });
                    }

                    return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });
                }

                // 2-Factor.
                if (await userManager.GetTwoFactorEnabledAsync(user))
                    return await GenerateOTPFor2StepVerification(user);

                // Tạo token
                var token = await jwtHandler.GenerateToken(user);

                // Đăng nhập thành công thì reset lại lockout count = 0.
                await userManager.ResetAccessFailedCountAsync(user);

                return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword forgotPassword)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(forgotPassword.Email);
            if (user == null) return BadRequest("Invalid Request");

            // Reset password
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", forgotPassword.Email }
            };

            var callback = QueryHelpers.AddQueryString(forgotPassword.ClientURI, param);

            var message = new Message(new string[] { "de.trantien@gmail.com" }, "Reset password token", callback, null);
            await emailSender.SendEmailAsync(message);

            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassword resetPassword)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(resetPassword.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var resetPassResult = await userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);

                return BadRequest(new { Errors = errors });
            }

            // reset lại date lockout.
            await userManager.SetLockoutEndDateAsync(user, new DateTime(2000, 1, 1));

            return Ok();
        }

        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await userManager.ConfirmEmailAsync(user, token); //Xác nhận email mới login dc.
            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");

            var twoFactorResult = await userManager.SetTwoFactorEnabledAsync(user, true); //Xác thực 2 bước.
            if (!twoFactorResult.Succeeded)
            {
                var errors = twoFactorResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }

            return Ok();
        }

        [HttpPost("TwoStepVerification")]
        public async Task<IActionResult> TwoStepVerification([FromBody] TwoFactor twoFactorDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await userManager.FindByEmailAsync(twoFactorDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var validVerification = await userManager.VerifyTwoFactorTokenAsync(user, twoFactorDto.Provider, twoFactorDto.Token);
            if (!validVerification)
                return BadRequest("Invalid Token Verification");

            var token = await jwtHandler.GenerateToken(user);
            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }

        private async Task<IActionResult> GenerateOTPFor2StepVerification(User user)
        {
            var providers = await userManager.GetValidTwoFactorProvidersAsync(user);
            if (!providers.Contains("Email"))
            {
                return Unauthorized(new AuthResponse { ErrorMessage = "Invalid 2-Step Verification Provider." });
            }

            var token = await userManager.GenerateTwoFactorTokenAsync(user, "Email");
            var message = new Message(new string[] { user.Email }, "Authentication token", token, null);
            await emailSender.SendEmailAsync(message);

            return Ok(new AuthResponse { Is2StepVerificationRequired = true, Provider = "Email" });
        }

        [HttpPost("ExternalLogin")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuth externalAuth)
        {
            try
            {
                var payload = await jwtHandler.VerifyGoogleToken(externalAuth);
                if (payload == null)
                    return BadRequest("Invalid External Authentication.");

                var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

                var user = await userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
                if (user == null)
                {
                    user = await userManager.FindByEmailAsync(payload.Email);

                    if (user == null)
                    {
                        user = new User { Email = payload.Email, UserName = payload.Email };
                        await userManager.CreateAsync(user);

                        //prepare and send an email for the email confirmation

                        await userManager.AddToRoleAsync(user, "Viewer");
                        await userManager.AddLoginAsync(user, info);
                    }
                    else
                    {
                        await userManager.AddLoginAsync(user, info);
                    }
                }

                if (user == null)
                    return BadRequest("Invalid External Authentication.");

                //check for the Locked out account

                var token = await jwtHandler.GenerateToken(user);
                return Ok(new AuthResponse { Token = token, IsAuthSuccessful = true });
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

    }
}
