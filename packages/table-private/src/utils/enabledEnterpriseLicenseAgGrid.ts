import { LicenseManager } from '@ag-grid-enterprise/core';

export function enabledEnterpriseLicenseAgGrid() {
  const key =
    'CompanyName=Syssoft LLC_on_behalf_of_Cloud technology Limited (Ltd.) Russia,LicensedGroup=SberCloud,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=6,LicensedProductionInstancesCount=1,AssetReference=AG-019109,ExpiryDate=1_November_2022_[v2]_MTY2NzI2MDgwMDAwMA==b29cb54b103705f43de791c68fb02189';
  LicenseManager.setLicenseKey(key);
}
