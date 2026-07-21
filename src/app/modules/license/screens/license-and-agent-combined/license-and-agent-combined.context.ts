import { GridContext } from '../../../../framework/grid';
import { createLicensePlaceholderContext } from '../license-placeholder.context';
import { LicenseAndAgentCombinedDataSource } from './license-and-agent-combined.ds';
import { LicenseAndAgentCombined } from './license-and-agent-combined.model';
import { licenseAndAgentCombinedFilterConfig } from './license-and-agent-combined.filters';

export const licenseAndAgentCombinedContext: GridContext<LicenseAndAgentCombined> = {
  ...createLicensePlaceholderContext(
    'license.license-and-agent-combined',
    'License and Agent Combined',
  ),
  datasource: LicenseAndAgentCombinedDataSource,
  filterConfig: licenseAndAgentCombinedFilterConfig,
};
