using LoggerService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class OwnerRepository
    {
        private readonly AppDbContext dbContext;
        private readonly ILoggerManager loggerManager;

        public OwnerRepository(AppDbContext dbContext, ILoggerManager loggerManager)
        {
            this.dbContext = dbContext;
            this.loggerManager = loggerManager;
        }

        public List<Owner> GetOwners()
        {
            loggerManager.LogInfo($"Get Owner list at time: {DateTime.UtcNow.ToLongTimeString()}");
            return this.dbContext.Owner.ToList();
        }

        public Owner GetOwnerById(int Id)
        {
            return this.dbContext.Owner.FirstOrDefault(item => item.OwnerId == Id);
        }

        public Owner Create(Owner item)
        {
            this.dbContext.Owner.Add(item);
            this.dbContext.SaveChanges();
            return item;
        }

        public int Update(int Id, Owner item)
        {
            if (Id != item.OwnerId) throw new Exception("Id <> OwnerId");
            this.dbContext.Owner.Update(item);
            return this.dbContext.SaveChanges();
        }

        public int Delete(int Id)
        {
            var item = this.dbContext.Owner.Find(Id);
            this.dbContext.Owner.Remove(item);
            return this.dbContext.SaveChanges();
        }
    }
}
