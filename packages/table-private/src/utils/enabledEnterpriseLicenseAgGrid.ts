import { LicenseManager } from '@ag-grid-enterprise/all-modules';

export function enabledEnterpriseLicenseAgGrid() {
  const key =
    'CompanyName=Compuwave GmbH_on_behalf_of_Cloud technology Limited (Ltd.) Russia,LicensedGroup=SberCloud,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=3,LicensedProductionInstancesCount=0,AssetReference=AG-011358,ExpiryDate=22_October_2021_[v2]_MTYzNDg1NzIwMDAwMA==2d94c41c7316c6080ab74e7b281a374f';
  LicenseManager.setLicenseKey(key);
}
