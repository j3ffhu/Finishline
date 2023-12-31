import { User } from 'shared';
import { fullNamePipe } from './pipes';

/**
 * Construct the autocomplete option that displays user's full name and email
 * @param user the user info to be displayed in autocomplte option
 * @returns the autocomplete option with label and id
 */
export const userToAutocompleteOption = (user: User): { label: string; id: number } => {
  return { label: `${fullNamePipe(user)} (${user.email})`, id: user.userId };
};
