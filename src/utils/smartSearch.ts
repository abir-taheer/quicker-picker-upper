import {
  FindOptions,
  IncludeOptions,
  Model,
  ModelStatic,
  Op,
  WhereOptions,
} from 'sequelize';
import sequelize from './../database/sequelize';

// Every model has an id so we're going to add that as a constraint to the type
interface StandardModel extends Model {
  id: number | string;
}

type ModelAttributes<SpecificModel> = {
  // First filter only keys that are strings
  [Field in keyof SpecificModel]: SpecificModel[Field] extends string
    ? // Of the string based keys, if they are generic to the Model type ignore them
      Field extends keyof Model
      ? never
      : Field
    : never;
}[keyof SpecificModel];

interface CustomIncludeOptions extends IncludeOptions {
  model: ModelStatic<StandardModel>;
  queryFields?: string[];
}

interface FindOptionsWithCustomInclude extends Omit<FindOptions, 'include'> {
  include?: CustomIncludeOptions[];
}

type SmartSearchParams<SpecificModel extends StandardModel> = {
  search: string;
  page: number;
  resultsPerPage: number;
  model: ModelStatic<SpecificModel>;
  fields: ModelAttributes<SpecificModel>[];
  options?: FindOptionsWithCustomInclude;
  where?: WhereOptions;
};

async function smartSearch<SpecificModel extends StandardModel>({
  search,
  page,
  resultsPerPage,
  model,
  fields,
  options = {},
  where = {},
}: SmartSearchParams<SpecificModel>) {
  const offset = (page - 1) * resultsPerPage;
  const dialect = sequelize.getDialect();
  const like = dialect === 'postgres' ? Op.iLike : Op.like;

  const allFields = [...fields] as string[];

  // All of the unique words from the search
  const words = Array.from(
    new Set(
      search
        // Keep everything lowercase for consistency
        .toLowerCase()
        // Remove any non-alphanumeric characters from search keywords
        .replace(/[^a-z0-9 ]/g, '')
        // Split at instances of 1 or more adjacent whitespaces
        .split(/\s+/)
    )
  );

  if (options.include) {
    options.include = options.include.map(
      ({ queryFields, ...otherIncludeOptions }) => {
        queryFields?.forEach((field) =>
          allFields.push(`$${otherIncludeOptions.model}.${field}$`)
        );

        return otherIncludeOptions;
      }
    );
  }

  const wordConditions = words.map((word) => ({
    // For each of the words
    // Generate an `or` condition that queries all of the fields for the word
    // Only one field in the row needs to contain the word for the `or` condition to succeed
    [Op.or]: allFields.map((field) => ({
      [field]: {
        [like]: `%${word}%`,
      },
    })),
  }));

  const data = await model.findAndCountAll({
    where: {
      // For each of the words, there must be one field in the row that contains the word
      [Op.and]: wordConditions,

      // Any other necessary conditions that were passed as a parameter, like "only show rows created after x date"
      ...where,
    },

    // If there's no search query, we can let the database do the limit and offset for us
    limit: search ? undefined : resultsPerPage,
    offset: search ? undefined : offset,

    // Other options
    ...options,
  });
  let total, results;

  const rows: SpecificModel[] = data.rows;
  total = data.count;

  // Without a search query we don't need to sort manually
  // Let the database paginate for us in that situation because there might be too many rows
  if (!search) {
    results = rows;
  } else {
    const scoreMap: { [key: string | number]: number } = {};

    const calculateRowScore = (row: SpecificModel) => {
      if (scoreMap[row.id]) {
        return scoreMap[row.id];
      }

      let score = 0;
      // Remove field values that are not defined or that are not strings because we can't use them for score calculation
      const values = fields
        .map((field) => row[field])
        .filter((a) => !!a && typeof a === 'string');

      words.forEach((word) => {
        values.forEach((value) => {
          if (typeof value === 'string' && value.toLowerCase() === word) {
            score += 1;
          }

          if (
            typeof value === 'string' &&
            value.toLowerCase().startsWith(word)
          ) {
            score += 0.2;
          }
        });
      });

      scoreMap[row.id] = score;

      return score;
    };

    rows.sort((a, b) => calculateRowScore(b) - calculateRowScore(a));
    total = rows.length;
    results = rows.slice(offset, page * resultsPerPage);
  }

  const numPages = Math.ceil(total / resultsPerPage);

  const hasNextPage = page * resultsPerPage < total;
  const hasPreviousPage = offset - resultsPerPage >= 0;

  return {
    id: 'search-' + search,
    page: total ? page : 0,
    total,
    hasNextPage,
    hasPreviousPage,
    numPages,
    resultsPerPage,
    results,
  };
}

export default smartSearch;
