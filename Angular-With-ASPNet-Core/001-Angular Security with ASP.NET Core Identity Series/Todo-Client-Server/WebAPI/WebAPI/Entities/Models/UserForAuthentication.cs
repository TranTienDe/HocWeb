using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities.Models
{
    public class UserForAuthentication
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string clientURI { get; set; }
    }
}
