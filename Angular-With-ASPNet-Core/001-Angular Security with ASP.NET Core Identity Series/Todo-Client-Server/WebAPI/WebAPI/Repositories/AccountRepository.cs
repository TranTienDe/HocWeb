using LoggerService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class AccountRepository
    {
        private readonly AppDbContext dbContext;
        private readonly ILoggerManager loggerManager;

        public AccountRepository(AppDbContext dbContext, ILoggerManager loggerManager)
        {
            this.dbContext = dbContext;
            this.loggerManager = loggerManager;
        }

        public List<Account> GetAccounts()
        {
            loggerManager.LogInfo($"Get account list at time: {DateTime.UtcNow.ToLongTimeString()}");
            return this.dbContext.Account.ToList();
        }

        public Account GetAccountById(int Id)
        {
            return this.dbContext.Account.FirstOrDefault(item=>item.AccountId == Id);
        }

        public Account Create(Account item)
        {
            this.dbContext.Account.Add(item);
            this.dbContext.SaveChanges();
            return item;
        }

        public int Update(int Id, Account item)
        {
            if (Id != item.AccountId) throw new Exception("Id <> AccountId");
            this.dbContext.Account.Update(item);
            return this.dbContext.SaveChanges();
        }

        public int Delete(int Id)
        {
            var item = this.dbContext.Account.Find(Id);
            this.dbContext.Account.Remove(item);
            return this.dbContext.SaveChanges();
        }
    }
}
