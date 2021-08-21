using EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSender emailSender;

        public EmailController(IEmailSender emailSender)
        {
            this.emailSender = emailSender;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            try
            {
                var toList = new string[] { "tiende_tran@grobest.com" };
                var subject = "Send test mail";
                var content = "This is the content from our mail!";
                var files = Request.Form.Files.Count > 0 ? Request.Form.Files : new FormFileCollection();

                var message = new Message(toList, subject, content, files);
                await this.emailSender.SendEmailAsync(message);

                return Ok();
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }
    }
}
