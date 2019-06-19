import Moment, { Moment as IMoment } from 'moment';

import { COLUMN_GROUP_LIMIT, DEFAULT_WIDTH, LEEWAY, TIME_CONFIG } from '@app/renderer/constants/timeline';

// Put this in shared file afterwards
interface IRow {
  [key: string]:
    | string
    | {
        [key: string]: string;
      };
}

interface IDef {
  [key: string]: any;
}

/**
 * We need to get the proper times and group times.
 * 1. First go through all the rows to find the highest and lowest dates
 * 2. We might as well inject the span data as well to loop through only once
 */
export const transformRowDataAndGetTimelineMeta = (
  rowData: IRow[],
  timeMeasure: string,
  startId: string,
  endId: string,
) => {
  let minDateTime: any;
  let maxDateTime: any;

  const finalData = rowData.map((row: IRow) => {
    const startDateTime = !!row[startId] && Moment(row[startId]);
    const endDateTime = !!row[endId] && Moment(row[endId]);

    if (!!startDateTime && !!endDateTime) {
      // For the first pass, the min max date is null so just make it equal.
      if (!minDateTime || !maxDateTime) {
        minDateTime = startDateTime;
        maxDateTime = endDateTime;
      }

      // Comparison for min date
      if (startDateTime < minDateTime) minDateTime = startDateTime;
      if (endDateTime > maxDateTime) maxDateTime = endDateTime;
    }
    return { ...row, ...getRowColTimeData(startDateTime, endDateTime, timeMeasure) };
  });
  minDateTime = getFallbackStartDate(minDateTime, maxDateTime, timeMeasure);
  maxDateTime = getFallbackEndDate(minDateTime, maxDateTime, timeMeasure);

  return { minDateTime, maxDateTime, formattedRowData: finalData };
};

/**
 * Config the column data, but this also depends on the min and max data retrieved from row data.
 * @param defs
 */
export const configureTimeColumns = (
  defs: IDef[],
  minDateTime: IMoment,
  maxDateTime: IMoment,
  timeMeasure: string,
) => {
  const { minDateTimeWithLeeway, maxDateTimeWithLeeway } = getLeewayTimes(
    minDateTime,
    maxDateTime,
    timeMeasure,
  );

  const timeCols = getColDefsInTimeMeasurement(
    minDateTimeWithLeeway,
    maxDateTimeWithLeeway,
    timeMeasure,
  );
  // Temporary, lets cut the columns so its just the first 3 columns.
  return defs.concat(timeCols);
};

/**
 *
 * @param start Comes in a Moment format. There is a chance it does not exist, or is false
 * @param end Comes in a Moment format. There is a chance it is false.
 */
const getRowColTimeData = (start: IMoment, end: IMoment, timeMeasure: string) => {
  if (!start || !end) return {};
  const parsedId = getParsedTimeId(start, timeMeasure);
  return {
    col_timeline_data: {
      span: end.diff(start, timeMeasure),
      matchId: parsedId,
    },
  };
};

/**
 * Add the leeway times to start time and end time to give some visual space for the user.
 * @param minDateTime
 * @param maxDateTime
 * @param timeMeasure
 */
const getLeewayTimes = (minDateTime: IMoment, maxDateTime: IMoment, timeMeasure: string) => {
  const minDateTimeWithLeeway = minDateTime.clone().subtract(LEEWAY, timeMeasure);
  const maxDateTimeWithLeeway = maxDateTime.clone().add(LEEWAY, timeMeasure);

  return { minDateTimeWithLeeway, maxDateTimeWithLeeway };
};

/**
 * 1. We need to check if for reason, the maxDateTime is below minDateTime, then all there data is pretty much messed up.
 * 2. If we have minDateTime already, then no need for a fallback
 * 3. We then need to check if we have a maxDateTime. If we do, just return a date thats behind it. If not, lets make a new date.
 */
const getFallbackStartDate = (minDateTime: IMoment, maxDateTime: IMoment, timeMeasure: string) => {
  if (!!minDateTime) return minDateTime;
  if (maxDateTime && minDateTime.clone().isAfter(maxDateTime.clone())) {
    return maxDateTime.clone().subtract(20, timeMeasure);
  }
  return maxDateTime ? maxDateTime.clone().subtract(20, timeMeasure) : Moment();
};

const getFallbackEndDate = (minDateTime: IMoment, maxDateTime: IMoment, timeMeasure: string) => {
  if (!!maxDateTime) return maxDateTime;
  return minDateTime.clone().add(20, timeMeasure);
};

/**
 * Can maybe optimized later here... but we are pretty much trying to generate colDefs based on the measurements 'hours'
 * I am trying to create something like this for hours
 * _______05/11/2018________|______05/12/2018_______|
 * 0 | 1 | 2 | 3 | 4 |....  | 0 | 1 | 2 | 3 | 4 |...|
 * The JSON format is [{ headerName: '05/11/2018', children: [{ field: 'col_time_5_11_0' }]}]
 *
 * Or something like this for days
 * ___________Nov___________|__________Dec__________|
 * 1 | 2 | 3 | 4 | .... |30 | 0 | 1 | 2 | 3 | 4 |...|
 * The JSON format is [{ headerName: '05/11/2018', children: [{ field: 'col_time_5_11_0' }]}]
 * @param startDT
 * @param endDT
 *
 * Nomenclature:
 * units is the time measurement count. For example, count of hours, or days
 * startsWithinUnitGroup means that if I am using hours, it is the 1, 2, 3, 4... 24 within a specific dat
 * Note:
 * The time will end at the very end of the last group. For example, even if the endDT time is 10 hours, it will end on 23 hours
 */
const getColDefsInTimeMeasurement = (startDT: IMoment, endDT: IMoment, timeMeasure: string) => {
  const start = startDT.clone();
  const colDefs = [];

  // Loop through the start time (with leeway) all the way to end time (with leeway);
  while (start < endDT && colDefs.length <= COLUMN_GROUP_LIMIT) {
    let unitsToAdd = 0;

    // Push the header group
    colDefs.push({
      headerClass: 'header-timeline header-group-timeline',
      headerName: start.format(TIME_CONFIG[timeMeasure].groupDisplayFormat),
      children: (() => {
        let units = 0;
        const accum = [];
        const startWithinUnitGroup = start.clone();
        const endWithinUnitGroup = start.clone().endOf(TIME_CONFIG[timeMeasure].parent);

        // Start a new group right away, and loop through until another group needs to start next. The key here is to use Moment.endOf
        while (startWithinUnitGroup <= endWithinUnitGroup) {
          const parsedId = getParsedTimeId(startWithinUnitGroup, timeMeasure);
          accum.push({
            width: DEFAULT_WIDTH,
            field: parsedId,
            cellClass: 'cell-timeline no-focus',
            editable: false,
            focusable: false,
            headerName: startWithinUnitGroup.format(
              TIME_CONFIG[timeMeasure].groupSubheaderDisplayFormat,
            ),
            headerClass: 'header-timeline',
            headerComponent: null,
            suppressNavigable: true,
            suppressMovable: true,
            suppressSizeToFit: true,
            suppressMenu: true,
            resizable: false,
            cellRendererSelector: ({ data: { col_timeline_data }, colDef }) =>
              col_timeline_data && colDef.field === col_timeline_data.matchId
                ? { component: 'timelineCellRenderer' }
                : null,
            colSpan: ({ data: { col_timeline_data }, colDef }) =>
              col_timeline_data && colDef.field === col_timeline_data.matchId
                ? col_timeline_data.span
                : 1,
          });

          // Add one to the subheader group to move onto to the next subheader group.
          startWithinUnitGroup.add(1, timeMeasure);
          units = units + 1;
        }

        // Add the total units to the group column count.
        unitsToAdd = unitsToAdd + units;
        return accum;
      })(),
    });

    start.add(unitsToAdd, timeMeasure);
  }

  return colDefs;
};

/**
 * These are the ids that are going to be used to match the cell, with the column. We need to do this because
 * if the matching depends on how specific the time measure is.
 * @param dateTime
 * @param measure 'days', 'hours', etc
 */
const getParsedTimeId = (dateTime: IMoment, measure: string) => {
  switch (measure) {
    case 'days':
      return `col_time_${dateTime.format('YYYY')}_${dateTime.format('M')}_${dateTime.format('D')}`;
    default:
      return `col_time_${dateTime.format('YYYY')}_${dateTime.format('M')}_${dateTime.format(
        'D',
      )}_${dateTime.format('H')}`;
  }
};
