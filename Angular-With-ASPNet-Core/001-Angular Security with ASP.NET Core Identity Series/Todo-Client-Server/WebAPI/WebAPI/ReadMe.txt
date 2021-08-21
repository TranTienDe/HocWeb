# Cài đặt tool
1. Install-Package Microsoft.EntityFrameworkCore.Tools
1. Install-Package Microsoft.EntityFrameworkCore.Design
2. Install-Package Microsoft.EntityFrameworkCore
3. Install-Package Microsoft.EntityFrameworkCore.SqlServer

# 2. Cài Swagger
Install-Package Swashbuckle.AspNetCore

# 3. Cài external Identity provider configuration google
Install-Package Microsoft.AspNetCore.Authentication.Google

Add-Migration InitTable
Update-Database

# Series about angular
https://code-maze.com/angular-series/

# Angular authen
https://code-maze.com/angular-security-with-asp-net-core-identity/

https://code-maze.com/angular-authentication-aspnet-identity/

# https://code-maze.com/angular-authentication-aspnet-identity/

# authen
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer