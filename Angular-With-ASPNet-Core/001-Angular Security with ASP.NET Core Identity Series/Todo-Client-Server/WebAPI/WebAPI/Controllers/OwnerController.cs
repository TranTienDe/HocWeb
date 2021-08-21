using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly OwnerRepository ownerRepository;

        public OwnerController(OwnerRepository ownerRepository)
        {
            this.ownerRepository = ownerRepository;
        }
     
        [HttpGet]     
        public IActionResult GetOwners()
        {          
            var result = this.ownerRepository.GetOwners();
            return Ok(result);
        }

        [HttpGet("{Id}")]
        public Owner GetOwnerById(int Id)
        {
            return this.ownerRepository.GetOwnerById(Id);
        }

        [HttpPost()]
        public Owner Post([FromBody] Owner item)
        {
            return this.ownerRepository.Create(item);
        }

        [HttpPut("{Id}")]
        public int Put(int Id, Owner item)
        {
            return this.ownerRepository.Update(Id, item);
        }

        [HttpDelete("{Id}")]
        public int Delete(int Id)
        {
            return this.ownerRepository.Delete(Id);
        }
    }
}
