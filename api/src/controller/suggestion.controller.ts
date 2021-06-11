import { PER_PAGE } from '../lib/constant';
import { Op } from '../lib/sequelize';
import { suggestion, suggestionAttributes } from '../models/suggestion';
import { user } from '../models/user';

export async function getSuggestionList(cursor: number): Promise<suggestion[]> {
  const suggestionList = suggestion.findAll({
    order: [['suggestion_id', 'DESC']],
    where: {
      suggestion_id: {
        [Op.lt]: cursor,
      },
    },
    include: [
      {
        association: 'user',
        attributes: {
          exclude: ['password', 'date_create'],
        },
      },
    ],
    limit: PER_PAGE,
  });
  return suggestionList;
}

export async function enrollSuggestion(
  suggestionModel: suggestionAttributes
): Promise<suggestion | string> {
  const enrolledSuggestion = await suggestion.create(suggestionModel);
  if (!enrolledSuggestion) {
    return 'suggestion create fail';
  }
  return await getSuggestionById(enrolledSuggestion.suggestion_id!);
}

export async function getSuggestionById(
  suggestion_id: number
): Promise<suggestion | string> {
  const theSuggestion = await suggestion.findOne({
    where: {
      suggestion_id,
    },
  });
  if (!theSuggestion) {
    return 'suggestion not founded';
  }
  return theSuggestion;
}
