# Project name: admin dashboard
# Created date: 2021-08-21

# Link video: https://www.youtube.com/watch?v=FP7Hs8lTy1k

# 1. First step
1. Install angular material:    ng add @angular/material
2. Install highcharts packages: npm i highcharts-angular --save and npm i highcharts --save
3. Install flex layout package: npm i @angular/flex-layout @angular/cdk --save

# 2. Layout defination
1. Create the first layout
2. Create a Component for the Dashboard page
3. User the first layout as a Parent Route Component in app-routing.module.ts and the Dashboard page as child Component.

todo:
> ng g c layout/default
> ng g module layout/default
> ng g c modules/dashboard

# 3. Shared Modules

Create a Shared Module for the Header, Sidebar, and Footer for better code organization.
Learn more about Shared MOdules here: https://angualar.io/guide/sharing-ngmodules

1. Create your Header, Sidebar, and Footer components
2. Create a Shared Module for it
3. Update the Module and add these Components in the Declaration ad Exports sections.


> ng g c shared/components/header
> ng g c shared/components/footer
> ng g c shared/components/sidebar
> ng g module shared/shared
> ng g module shared
