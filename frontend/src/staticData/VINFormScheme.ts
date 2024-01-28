import { VINFormSchemeItem } from 'shared/types/form';


export const VINFormScheme: VINFormSchemeItem[] = [
    { "type": "number", "field": "version", "name": "Version" },
    { "type": "select", "field": "equipmentCode", "name": "Equipment Code", "options": [
        { "value": "000", "name": "000 - Base platform" },
        { "value": "014", "name": "014 - Bumper" },
        { "value": "037", "name": "037 - Drum Mulcher" },
        { "value": "036", "name": "036 - Side Trimmer" },
        { "value": "038", "name": "038 - Sprayer" },
        { "value": "027", "name": "027 - Lawn Mower" }
    ] },
    { "type": "number", "field": "issueYear", "name": "Issue Year" },
    { "type": "number", "field": "serialNumber", "name": "Serial Number" },
    { "type": "select", "field": "productionPlace", "name": "Production Place", "options": [
        { "value": "00", "name": "00 - Slovenia" },
        { "value": "01", "name": "01 - Turkey" }
    ] }
];
