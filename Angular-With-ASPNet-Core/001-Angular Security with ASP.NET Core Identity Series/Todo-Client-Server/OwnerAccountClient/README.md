# Link guide: https://code-maze.com/net-core-web-development-part7/

# 1. Third-Party Libraries as Part Of Angular Project Preparation
npm install --save bootstrap         //Add css file angular.json
npm install --save @types/bootstrap  //Add in file tsconfig.app.json

# To install the JQuery library, type this command:
npm install --save jquery            //Add js file angular.json
npm install --save @types/jquery     //Add in file tsconfig.app.json

# For the JQueryUI installation, execute:
npm install --save jqueryui
npm install --save @types/jqueryui

# Create service
ng g service shared/services/environment-url --skip-tests
ng g service shared/services/repository --skip--tests

# Create module
ng g module owner

ng g component owner/owner-list --skip-tests

# Create 500 error component
ng g component error-pages/internal-server --skip-tests

ng g service shared/services/error-handler --skip-tests

https://code-maze.com/net-core-web-development-part11/

ng g component shared/modals/error-modal --skip-tests
ng g component shared/modals/success-modal --skip-tests

# Create directive
ng g directive shared/directives/datepicker --skip-tests

ng g component owner/owner-create --skip-tests

# Install auth jwt
npm install @auth0/angular-jwt

# Create guard
ng g guard shared/guards/auth --skip-tests

ng g c forbidden --skip-tests

# https://code-maze.com/angular-password-reset-functionality-with-aspnet-identity/

# Add Email
https://code-maze.com/send-email-with-attachments-aspnetcore-2/

# Series
# https://code-maze.com/angular-security-with-asp-net-core-identity/
# Doc
# https://code-maze.com/ultimate-aspnet-core-web-api/?source=nav

# Install google authen
npm i angularx-social-login --save
