export const selectOptions: { [key: string]: any } = {
  choices: {
    cs1: {
      id: 'cs1',
      name: 'United States',
      color: 'blue',
    },
    cs2: {
      id: 'cs2',
      name: 'Russia',
      color: 'cyan',
    },
    cs3: {
      id: 'cs3',
      name: 'Australia',
      color: 'teal',
    },
    cs4: {
      id: 'cs4',
      name: 'Canada',
      color: 'yellow',
    },
    cs5: {
      id: 'cs5',
      name: 'Norway',
      color: 'green',
    },
    cs6: {
      id: 'cs6',
      name: 'China',
      color: 'red',
    },
  },

  choiceOrder: ['cs1', 'cs2', 'cs3', 'cs4', 'cs5'],
};

export const multiSelectOptions: { [key: string]: any } = {
  choices: {
    cs1: {
      id: 'cs1',
      name: 'Swimming',
      color: 'blue',
    },
    cs2: {
      id: 'cs2',
      name: 'Basketball',
      color: 'cyan',
    },
    cs3: {
      id: 'cs3',
      name: 'Running',
      color: 'teal',
    },
    cs4: {
      id: 'cs4',
      name: 'Football',
      color: 'yellow',
    },
    cs5: {
      id: 'cs5',
      name: 'BaseBall',
      color: 'green',
    },
    cs6: {
      id: 'cs6',
      name: 'Tennis',
      color: 'red',
    },
  },

  choiceOrder: ['cs1', 'cs2', 'cs3', 'cs4', 'cs5'],
};

export const fakeData = {
  rowId: 'row1',
  title: 'hahah',
  cells: [
    {
      cellId: 'cell7',
      columnId: 'col7',
      columnName: 'Reference',
      type: 'reference',
      value: [
        {
          foreignRowId: 'row1',
        },
        {
          foreignRowId: 'row2',
        },
        {
          foreignRowId: 'row3',
        },
      ],
      typeOptions: {
        foreignTableId: 'tb1',
      },
    },
    {
      cellId: 'cell8',
      columnId: 'col8',
      columnName: 'Date',
      type: 'date',
      value: null,
      typeOptions: {
        foreignTableId: 'tb1',
      },
    },
    {
      cellId: 'cell1',
      columnId: 'col1',
      columnName: 'Field 1',
      type: 'text',
      value: 'hahah',
    },
    {
      cellId: 'cell2',
      columnId: 'col2',
      columnName: 'Field 2',
      type: 'number',
      value: '1123',
    },
    {
      cellId: 'cell3',
      columnId: 'col3',
      columnName: 'Field 3',
      type: 'multiSelect',
      value: [],
      typeOptions: selectOptions,
    },
    {
      cellId: 'cell4',
      columnId: 'col4',
      columnName: 'Field 4',
      type: 'multilineText',
      value: '',
    },
    {
      cellId: 'cell5',
      columnId: 'col5',
      columnName: 'Field 5',
      type: 'multipleAttachment',
      value: [
        {
          fileId: 'cgGDHeouR9qkdUnhMMX0',
          fileName: 'Screen Shot 2019-03-31 at 4.19.46 PM.png',
          fileType: 'image/png',
          fullThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/cgGDHeouR9qkdUnhMMX0',
          largeThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/cgGDHeouR9qkdUnhMMX0',
          smallThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/cgGDHeouR9qkdUnhMMX0',
          url: 'https://cdn.filestackcontent.com/cgGDHeouR9qkdUnhMMX0',
        },
        {
          fileId: 'c2ZYYTCnQJmPFt8ZMP1w',
          fileName: '2018C3Fall_Production_544673_ITGCJCore+Tunics-P_002_20180503_034536.pdf',
          fileType: 'application/pdf',
          fullThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/c2ZYYTCnQJmPFt8ZMP1w',
          largeThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:350/c2ZYYTCnQJmPFt8ZMP1w',
          smallThumbUrl:
            'https://cdn.filestackcontent.com/output=format:png,density:15,compress:true/resize=height:36/c2ZYYTCnQJmPFt8ZMP1w',
          url: 'https://cdn.filestackcontent.com/c2ZYYTCnQJmPFt8ZMP1w',
        },
      ],
    },
    {
      cellId: 'cell6',
      columnId: 'col6',
      columnName: 'Field 6',
      type: 'select',
      value: '',
      typeOptions: selectOptions,
    },
    {
      cellId: 'cell9',
      columnId: 'col9',
      columnName: 'Field 9',
      type: 'checkbox',
      value: true,
    },
  ],
};
