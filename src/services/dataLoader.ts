import { Region, Advisory, Helpline, Portal, IncidentMapping } from '../types';

import finlandAdvisories from '../data/finland/advisories.json';
import finlandHelplines from '../data/finland/helplines.json';
import finlandPortals from '../data/finland/portals.json';

import usaAdvisories from '../data/usa/advisories.json';
import usaHelplines from '../data/usa/helplines.json';
import usaPortals from '../data/usa/portals.json';

import mappingData from '../data/mapping.json';

export function getAdvisories(region: Region): Advisory[] {
  return (region === 'finland' ? finlandAdvisories : usaAdvisories) as Advisory[];
}

export function getHelplines(region: Region): Helpline[] {
  return (region === 'finland' ? finlandHelplines : usaHelplines) as Helpline[];
}

export function getPortals(region: Region): Portal[] {
  return (region === 'finland' ? finlandPortals : usaPortals) as Portal[];
}

export function getIncidentMappings(region: Region): IncidentMapping[] {
  const data = mappingData as Record<Region, IncidentMapping[]>;
  return data[region] || [];
}

export function getPortalById(region: Region, portalId: string): Portal | undefined {
  const portals = getPortals(region);
  return portals.find(p => p.id === portalId);
}

export function getPortalsForIncidentType(region: Region, incidentType: string): Portal[] {
  const portals = getPortals(region);
  return portals.filter(portal =>
    portal.incidentTypes.includes(incidentType)
  );
}

export function getMappingForIncidentType(region: Region, incidentType: string): IncidentMapping | undefined {
  const mappings = getIncidentMappings(region);
  return mappings.find(m => m.incidentType === incidentType);
}
