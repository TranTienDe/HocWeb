using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountRepository accountRepository;

        public AccountController(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        [HttpGet]
        public IActionResult GetAccounts()
        {
            try
            {
                //throw new Exception("Lỗi khi lấy data.");
                var result = this.accountRepository.GetAccounts();
                return Ok(result);
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

        [HttpGet("{Id}")]
        public Account GetAccountById(int Id)
        {
            return this.accountRepository.GetAccountById(Id);
        }

        [HttpPost()]
        public Account Post([FromBody] Account item)
        {
            return this.accountRepository.Create(item);
        }

        [HttpPut("{Id}")]
        public int Put(int Id, Account item)
        {
            return this.accountRepository.Update(Id, item);
        }

        [HttpDelete("{Id}")]
        public int Delete(int Id)
        {
            return this.accountRepository.Delete(Id);
        }
    }
}
