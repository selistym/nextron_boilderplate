export enum BudType {
  EXTRACTION,
  FAKE,
}

export const AVAILABLE_BUDS = {
  [BudType.EXTRACTION]: {
    // http://develop.treelab.io/core/wsp0a40e1fe050d0618/cre0a40e5be4c8e4e06/tbl0a41291447023e7c/viw0a412a9c3f886497
    // Extraction
    name: 'Extraction',
    budInstance: {
      coreId: 'cre5139f8282808f1dd',
      tableId: 'tbl513a05975b8f2ca9',
      workspaceId: 'wsp36126cbe130d70df',
      column: {
        budInstanceId: 'col513df76eb301e980',
        coreId: 'col513aa4560384e7b2',
        workspaceId: 'col513a6e2d948b5ceb',
        name: 'col513a0597de039103',
        rules: 'col513b62f9ff0f7966',
      },
    },
    instance: {
      coreId: 'cre5139f8282808f1dd',
      tableId: 'tbl5372a19800888add',
      workspaceId: 'wsp36126cbe130d70df',
      column: {
        budInstance: 'col5376637e1d097ae9',
        attachment: 'col5372d1a3388c248f',
        rules: 'col53774f33310a1484',
        active: 'col5377a175ba875382',
      },
    },
  },
};
